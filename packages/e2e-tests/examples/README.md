# Playwright Power Platform Toolkit - Examples

This folder contains example files demonstrating how to use various features of the Playwright Power Platform Toolkit.

## 📋 Available Examples

### [form-context-example.ts](./form-context-example.ts)

Comprehensive examples for working with **Model-Driven App formContext API**.

**What it demonstrates:**

- Reading form context information (entity name, ID, attributes)
- Getting individual attribute values
- Setting attribute values (text, number, date, lookup, boolean)
- Getting all form data at once
- Saving forms with different options
- Checking form state (dirty, valid)
- Refreshing form data
- Executing custom JavaScript with Xrm access
- Complete form automation workflows

**Run the examples:**

```bash
cd packages/e2e-tests

# Run all formContext examples
npm test -- examples/form-context-example.ts

# Run in headed mode to see the automation
npm test -- examples/form-context-example.ts -- --headed
```

**Note:** You need to update the example with your actual Model-Driven App URL before running.

## 🚀 How to Use These Examples

### 1. Install Dependencies

```bash
cd packages/e2e-tests
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in `packages/e2e-tests/`:

```bash
# Model-Driven App Configuration
BASE_APP_URL=https://your-org.crm.dynamics.com/main.aspx?appid=your-app-id

# MSAL Authentication
MS_AUTH_TENANT_ID=your-tenant-id
MS_AUTH_CLIENT_ID=your-client-id
MS_AUTH_USERNAME=your-username@domain.com
MS_AUTH_PASSWORD=your-password
```

### 3. Authenticate

```bash
cd packages/e2e-tests
npm run auth
```

### 4. Run Examples

```bash
# Run specific example
npm test -- examples/form-context-example.ts

# Run with visible browser
npm test -- examples/form-context-example.ts -- --headed

# Run with debug mode
npm test -- examples/form-context-example.ts -- --debug
```

## 📚 FormContext API Examples

### Example 1: Get Form Information

```typescript
import { getFormContext } from 'playwright-power-platform-toolkit';

const formContext = await getFormContext(page);
console.log('Entity:', formContext.entityName);
console.log('Record ID:', formContext.entityId);
console.log('Fields:', formContext.attributeNames);
```

### Example 2: Read Field Values

```typescript
import { getEntityAttribute } from 'playwright-power-platform-toolkit';

// Get text field
const orderNumber = await getEntityAttribute(page, 'nwind_ordernumber');

// Get number field
const amount = await getEntityAttribute(page, 'nwind_orderamount');

// Get lookup field
const customer = await getEntityAttribute(page, 'customerid');
```

### Example 3: Update Field Values

```typescript
import { setEntityAttribute } from 'playwright-power-platform-toolkit';

// Set text field
await setEntityAttribute(page, 'nwind_ordernumber', 'TEST-12345');

// Set number field
await setEntityAttribute(page, 'nwind_orderamount', 1500.5);

// Set date field
await setEntityAttribute(page, 'nwind_orderdate', new Date());
```

### Example 4: Save Form

```typescript
import { saveForm, isFormValid, isFormDirty } from 'playwright-power-platform-toolkit';

// Check if form is valid
const isValid = await isFormValid(page);

if (isValid) {
  // Save and stay on form
  await saveForm(page);

  // Or save and close
  // await saveForm(page, { saveMode: 'saveandclose' });
}
```

### Example 5: Get All Form Data

```typescript
import { getAllEntityAttributes } from 'playwright-power-platform-toolkit';

const allData = await getAllEntityAttributes(page);
console.log('All form data:', JSON.stringify(allData, null, 2));
```

### Example 6: Execute Custom Xrm Code

```typescript
import { executeInFormContext } from 'playwright-power-platform-toolkit';

// Get current user info
const userInfo = await executeInFormContext(page, (Xrm) => {
  const userSettings = Xrm.Utility.getGlobalContext().userSettings;
  return {
    userId: userSettings.userId,
    userName: userSettings.userName,
  };
});

console.log('Current user:', userInfo.userName);
```

## 🔧 Adapting Examples to Your App

### Update URLs

Replace the example URLs with your actual Model-Driven App URLs:

```typescript
// Update this in the example files
await page.goto('https://your-org.crm.dynamics.com/main.aspx?appid=your-app-id');
```

### Update Field Names

Replace the example field names with your entity's field names:

```typescript
// Change 'nwind_ordernumber' to your field name
const value = await getEntityAttribute(page, 'your_fieldname');
```

### Find Your Field Names

To find the logical names of fields in your entity:

1. Navigate to your Model-Driven App form
2. Open browser DevTools (F12)
3. Run in console:
   ```javascript
   Xrm.Page.data.entity.attributes.get().map((a) => a.getName());
   ```

## 📖 Related Documentation

- **Full FormContext Guide**: [FORMCONTEXT.md](../../packages/playwright-power-platform-toolkit/docs/tutorials/FORMCONTEXT.md)
- **API Reference**: [form-context-helper.ts](../../packages/playwright-power-platform-toolkit/src/utils/form-context-helper.ts)
- **Microsoft Docs**: [formContext API](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-data)

## 💡 Tips

1. **Wait for Page Load**: Always wait for the form to fully load before calling formContext methods

   ```typescript
   await page.waitForLoadState('networkidle');
   await page.waitForTimeout(2000);
   ```

2. **Use Logical Names**: Use field logical names (schema names), not display names

3. **Check Validity**: Always check if the form is valid before saving

   ```typescript
   const isValid = await isFormValid(page);
   if (!isValid) {
     console.log('Form has validation errors');
   }
   ```

4. **Handle Errors**: Wrap formContext calls in try-catch blocks

   ```typescript
   try {
     const value = await getEntityAttribute(page, 'fieldname');
   } catch (error) {
     console.error('Field not found:', error);
   }
   ```

5. **Debug with Screenshots**: Take screenshots when operations fail
   ```typescript
   await page.screenshot({ path: 'debug.png' });
   ```

## 🐛 Troubleshooting

### formContext Not Available

If you see `formContext not available` error:

- Ensure you're on a form page (not grid/list view)
- Wait longer for Xrm to initialize
- Check that URL includes `main.aspx`

### Field Not Found

If you see `Attribute "xyz" not found` error:

- Verify you're using the logical name, not display name
- Check if the field is on the form
- List all available fields:
  ```typescript
  const formContext = await getFormContext(page);
  console.log('Available fields:', formContext.attributeNames);
  ```

### Save Not Working

If save doesn't persist changes:

- Check form validity: `await isFormValid(page)`
- Increase wait time after save
- Verify form is not dirty after save: `await isFormDirty(page)`

## 📧 Support

For questions or issues:

- Check [Main E2E Tests README](../README.md)
- Review [FORMCONTEXT.md](../../packages/playwright-power-platform-toolkit/docs/tutorials/FORMCONTEXT.md)
- Open an issue on GitHub
