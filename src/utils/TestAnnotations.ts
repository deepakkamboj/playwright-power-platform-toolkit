/*!
 * Test Annotations Utilities
 * Helpers for adding metadata to tests
 */

/**
 * Team names for test ownership
 */
export enum Team {
  Frontend = 'Frontend',
  Backend = 'Backend',
  QA = 'QA',
  DevOps = 'DevOps',
  FullStack = 'FullStack',
  Platform = 'Platform',
  PowerApps = 'PowerApps',
  Integration = 'Integration',
}

/**
 * Create a team annotation for a test
 * @param team - The team responsible for the test
 * @returns Annotation object for Playwright test
 * 
 * @example
 * ```typescript
 * test('My test', teamAnnotation(Team.Frontend), async ({ page }) => {
 *   // test code
 * });
 * ```
 */
export function teamAnnotation(team: Team | string) {
  return {
    annotation: {
      type: 'team',
      description: team,
    },
  };
}

/**
 * Create a priority annotation for a test
 * @param priority - Priority level (P0, P1, P2, etc.)
 * @returns Annotation object for Playwright test
 */
export function priorityAnnotation(priority: string) {
  return {
    annotation: {
      type: 'priority',
      description: priority,
    },
  };
}

/**
 * Create a custom annotation for a test
 * @param type - Annotation type
 * @param description - Annotation description
 * @returns Annotation object for Playwright test
 */
export function customAnnotation(type: string, description: string) {
  return {
    annotation: {
      type,
      description,
    },
  };
}

/**
 * Combine multiple annotations
 * @param annotations - Array of annotation objects
 * @returns Combined annotation object
 * 
 * @example
 * ```typescript
 * test('My test', 
 *   combineAnnotations([
 *     teamAnnotation(Team.Frontend),
 *     priorityAnnotation('P0')
 *   ]), 
 *   async ({ page }) => {
 *     // test code
 *   }
 * );
 * ```
 */
export function combineAnnotations(annotations: Array<{ annotation: { type: string; description: string } }>) {
  return {
    annotation: annotations.map(a => a.annotation),
  };
}
