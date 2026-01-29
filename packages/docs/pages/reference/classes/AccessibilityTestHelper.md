[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / AccessibilityTestHelper

# Class: AccessibilityTestHelper

Defined in: utils/accessibility.ts:48

Accessibility Test Helper

## Constructors

### Constructor

> **new AccessibilityTestHelper**(`page`): `AccessibilityTestHelper`

Defined in: utils/accessibility.ts:51

#### Parameters

##### page

`Page`

#### Returns

`AccessibilityTestHelper`

## Methods

### scanPage()

> **scanPage**(`options?`): `Promise`\<`any`\>

Defined in: utils/accessibility.ts:58

Run full accessibility scan on the page

#### Parameters

##### options?

###### wcagLevel?

[`WCAGLevel`](../enumerations/WCAGLevel.md)

###### rules?

`string`[]

###### disableRules?

`string`[]

#### Returns

`Promise`\<`any`\>

---

### scanElement()

> **scanElement**(`selector`, `options?`): `Promise`\<`any`\>

Defined in: utils/accessibility.ts:84

Scan specific element for accessibility issues

#### Parameters

##### selector

`string`

##### options?

###### wcagLevel?

[`WCAGLevel`](../enumerations/WCAGLevel.md)

#### Returns

`Promise`\<`any`\>

---

### assertNoViolations()

> **assertNoViolations**(`results`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:103

Assert no accessibility violations

#### Parameters

##### results

`any`

#### Returns

`Promise`\<`void`\>

---

### assertNoCriticalViolations()

> **assertNoCriticalViolations**(`results`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:110

Assert no critical violations (allows warnings)

#### Parameters

##### results

`any`

#### Returns

`Promise`\<`void`\>

---

### testKeyboardNavigation()

> **testKeyboardNavigation**(`elements`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:120

Check keyboard navigation

#### Parameters

##### elements

`string`[]

#### Returns

`Promise`\<`void`\>

---

### testTabOrder()

> **testTabOrder**(`expectedSelectors`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:131

Test tab order

#### Parameters

##### expectedSelectors

`string`[]

#### Returns

`Promise`\<`void`\>

---

### assertAriaLabel()

> **assertAriaLabel**(`locator`, `expectedLabel`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:146

Check ARIA labels

#### Parameters

##### locator

`Locator`

##### expectedLabel

`string`

#### Returns

`Promise`\<`void`\>

---

### assertAccessibleName()

> **assertAccessibleName**(`locator`, `expectedName`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:154

Check element is accessible by screen reader

#### Parameters

##### locator

`Locator`

##### expectedName

`string`

#### Returns

`Promise`\<`void`\>

---

### checkColorContrast()

> **checkColorContrast**(`selector`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:165

Check color contrast ratio

#### Parameters

##### selector

`string`

#### Returns

`Promise`\<`void`\>

---

### testKeyboardShortcut()

> **testKeyboardShortcut**(`keys`, `expectedAction`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:177

Test keyboard shortcuts

#### Parameters

##### keys

`string`

##### expectedAction

() => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

---

### assertHeadingHierarchy()

> **assertHeadingHierarchy**(): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:185

Check for proper heading hierarchy

#### Returns

`Promise`\<`void`\>

---

### assertImagesHaveAltText()

> **assertImagesHaveAltText**(): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:196

Check all images have alt text

#### Returns

`Promise`\<`void`\>

---

### assertFormFieldsLabeled()

> **assertFormFieldsLabeled**(): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:207

Check form fields have labels

#### Returns

`Promise`\<`void`\>

---

### generateReport()

> **generateReport**(`results`): `string`

Defined in: utils/accessibility.ts:218

Generate accessibility report

#### Parameters

##### results

`any`

#### Returns

`string`

---

### saveReport()

> **saveReport**(`results`, `filePath`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:241

Save accessibility report to file

#### Parameters

##### results

`any`

##### filePath

`string`

#### Returns

`Promise`\<`void`\>
