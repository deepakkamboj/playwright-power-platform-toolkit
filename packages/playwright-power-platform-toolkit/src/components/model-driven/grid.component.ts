/**
 * GridComponent
 * Handles all grid/list view operations for Model-Driven Apps
 *
 * @example
 * ```typescript
 * const modelDrivenApp = new ModelDrivenAppPage(page);
 *
 * // Open first record
 * await modelDrivenApp.grid.openRecord({ rowNumber: 0 });
 *
 * // Get cell value
 * const orderNumber = await modelDrivenApp.grid.getCellValue(0, 'Order Number');
 *
 * // Select row
 * await modelDrivenApp.grid.selectRow(0);
 * ```
 */

import { Page, Locator } from '@playwright/test';
import { GridRecordOptions } from './types';

export class GridComponent {
  constructor(
    private page: Page,
    private gridLocators: any // ModelDrivenAppLocators.Runtime.Content.Grid
  ) {}

  /**
   * Open a record from the grid
   * Supports opening by row number or by searching for column value
   *
   * @param options - Record selection options
   *
   * @example
   * ```typescript
   * // Open first record
   * await grid.openRecord({ rowNumber: 0 });
   *
   * // Open record by column value
   * await grid.openRecord({
   *   columnValue: 'TEST-123',
   *   columnName: 'Order Number'
   * });
   * ```
   */
  async openRecord(options: GridRecordOptions): Promise<void> {
    if (options.rowNumber !== undefined) {
      await this.openRecordByRowNumber(options.rowNumber);
    } else if (options.columnValue && options.columnName) {
      await this.openRecordByColumnValue(options.columnName, options.columnValue);
    } else {
      throw new Error('Must provide either rowNumber or (columnValue + columnName)');
    }
  }

  /**
   * Open record by clicking row at specific index
   * Uses multiple fallback strategies: link click, double-click, context menu
   */
  private async openRecordByRowNumber(rowNumber: number): Promise<void> {
    const row = this.page.locator(this.gridLocators.RowByIndex(rowNumber));
    await row.waitFor({ state: 'visible', timeout: 30000 });

    // Strategy 1: Try clicking link in first cell
    try {
      const link = row.locator(this.gridLocators.LinkCell).first();
      await link.click({ timeout: 5000 });
      console.log(`[GridComponent] Opened record via link click`);
      return;
    } catch {
      console.log('[GridComponent] Link click failed, trying double-click');
    }

    // Strategy 2: Try double-clicking row
    try {
      await row.dblclick({ timeout: 5000 });
      console.log(`[GridComponent] Opened record via double-click`);
      return;
    } catch {
      throw new Error(`Failed to open record at row ${rowNumber}`);
    }
  }

  /**
   * Open record by finding row with matching column value
   */
  private async openRecordByColumnValue(columnName: string, value: string): Promise<void> {
    const rowCount = await this.getRowCount();

    for (let i = 0; i < rowCount; i++) {
      const cellValue = await this.getCellValue(i, columnName);
      if (cellValue.includes(value)) {
        await this.openRecordByRowNumber(i);
        return;
      }
    }

    throw new Error(`Record not found with ${columnName}="${value}"`);
  }

  /**
   * Select a single row by index
   * Uses checkbox selection if available, otherwise clicks row
   *
   * @param rowNumber - Row index (0-based)
   */
  async selectRow(rowNumber: number): Promise<void> {
    const row = this.page.locator(this.gridLocators.RowByIndex(rowNumber));
    await row.waitFor({ state: 'visible', timeout: 30000 });

    // Try checkbox selection first
    const checkbox = row.locator(this.gridLocators.CheckboxCell);
    const hasCheckbox = await checkbox.isVisible().catch(() => false);

    if (hasCheckbox) {
      await checkbox.click();
      console.log(`[GridComponent] Selected row ${rowNumber} via checkbox`);
    } else {
      await row.click();
      console.log(`[GridComponent] Selected row ${rowNumber} via click`);
    }
  }

  /**
   * Select multiple rows
   *
   * @param rowNumbers - Array of row indices to select
   */
  async selectRows(rowNumbers: number[]): Promise<void> {
    for (const rowNumber of rowNumbers) {
      await this.selectRow(rowNumber);
    }
  }

  /**
   * Get cell value at specific row and column
   *
   * @param row - Row index (0-based)
   * @param column - Column name (matches column header aria-label)
   * @returns Cell text content
   */
  async getCellValue(row: number, column: string): Promise<string> {
    // Get column index by finding column header
    const columnHeaders = this.page.locator('[role="columnheader"]');
    const columnCount = await columnHeaders.count();

    let columnIndex = -1;

    for (let i = 0; i < columnCount; i++) {
      const header = columnHeaders.nth(i);

      // Try aria-label first
      const ariaLabel = await header.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.includes(column)) {
        columnIndex = i;
        break;
      }

      // Fallback to text content if aria-label not found
      const textContent = await header.textContent();
      const cleanText = textContent?.trim() || '';

      if (cleanText && cleanText.includes(column)) {
        columnIndex = i;
        break;
      }
    }

    if (columnIndex === -1) {
      throw new Error(`Column "${column}" not found in grid`);
    }

    // Get cell at row and column index
    const cell = this.page.locator(this.gridLocators.CellByRowAndColumn(row, columnIndex));
    const cellText = await cell.textContent();
    return cellText?.trim() || '';
  }

  /**
   * Get total number of rows in the grid (excluding header)
   *
   * @returns Number of data rows
   */
  async getRowCount(): Promise<number> {
    const rows = this.page.locator(this.gridLocators.Row);
    const count = await rows.count();
    return count - 1; // Subtract header row
  }

  /**
   * Sort grid by column
   *
   * @param columnName - Column name to sort by
   * @param direction - Sort direction ('asc' or 'desc')
   */
  async sortByColumn(columnName: string, direction: 'asc' | 'desc' = 'asc'): Promise<void> {
    const header = this.page.locator(this.gridLocators.ColumnHeader(columnName));
    await header.waitFor({ state: 'visible', timeout: 10000 });

    // Check current sort state
    const ariaSort = await header.getAttribute('aria-sort');

    if (direction === 'asc' && ariaSort !== 'ascending') {
      await header.click();
      if (ariaSort === 'descending') {
        await header.click(); // Click again to toggle
      }
    } else if (direction === 'desc' && ariaSort !== 'descending') {
      await header.click();
      if (ariaSort === 'ascending') {
        await header.click(); // Click again to toggle
      }
    }

    // Wait for grid to re-render
    await this.page.waitForTimeout(1000);
    console.log(`[GridComponent] Sorted by ${columnName} ${direction}`);
  }

  /**
   * Wait for grid to fully load
   * Waits for grid container to be visible and loading indicator to disappear
   */
  async waitForGridLoad(): Promise<void> {
    const grid = this.page.locator(this.gridLocators.Container);
    await grid.waitFor({ state: 'visible', timeout: 30000 });

    // Wait for loading indicator to disappear
    const loadingIndicator = this.page.locator(this.gridLocators.LoadingIndicator);
    await loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {
      console.log('[GridComponent] Loading indicator not found or already hidden');
    });

    console.log('[GridComponent] Grid loaded');
  }

  /**
   * Check if grid is empty (has no data rows)
   *
   * @returns true if grid has no records
   */
  async isGridEmpty(): Promise<boolean> {
    const rowCount = await this.getRowCount();
    return rowCount === 0;
  }

  /**
   * Filter grid by keyword using the search box
   * Uses the "Filter by keyword" search box in the grid toolbar
   *
   * @param keyword - The keyword to search for
   */
  async filterByKeyword(keyword: string): Promise<void> {
    // Find the filter by keyword search box
    const searchBox = this.page.locator(
      'input[aria-label*="Filter by keyword"], input[placeholder*="Filter by keyword"]'
    );
    await searchBox.waitFor({ state: 'visible', timeout: 10000 });

    // Clear any existing search text
    await searchBox.clear();

    // Type the keyword
    await searchBox.fill(keyword);

    // Press Enter to trigger the search
    await searchBox.press('Enter');

    // Wait a moment for the grid to filter
    await this.page.waitForTimeout(2000);

    console.log(`[GridComponent] Filtered by keyword: "${keyword}"`);
  }

  /**
   * Get the grid locator
   * Low-level method for custom operations
   *
   * @returns Grid container locator
   */
  getGrid(): Locator {
    return this.page.locator(this.gridLocators.Container);
  }
}
