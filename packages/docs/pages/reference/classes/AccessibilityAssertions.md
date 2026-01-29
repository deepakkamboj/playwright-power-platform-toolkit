[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

***

[Playwright Power Platform Toolkit](../README.md) / AccessibilityAssertions

# Class: AccessibilityAssertions

Defined in: utils/accessibility.ts:251

Common accessibility assertions

## Constructors

### Constructor

> **new AccessibilityAssertions**(): `AccessibilityAssertions`

#### Returns

`AccessibilityAssertions`

## Methods

### assertKeyboardAccessible()

> `static` **assertKeyboardAccessible**(`locator`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:255

Assert element is keyboard accessible

#### Parameters

##### locator

`Locator`

#### Returns

`Promise`\<`void`\>

***

### assertAriaRole()

> `static` **assertAriaRole**(`locator`, `role`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:263

Assert element has proper ARIA role

#### Parameters

##### locator

`Locator`

##### role

`string`

#### Returns

`Promise`\<`void`\>

***

### assertNotInTabOrder()

> `static` **assertNotInTabOrder**(`locator`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:271

Assert element is not in tab order (tabindex=-1)

#### Parameters

##### locator

`Locator`

#### Returns

`Promise`\<`void`\>

***

### assertScreenReaderText()

> `static` **assertScreenReaderText**(`locator`): `Promise`\<`void`\>

Defined in: utils/accessibility.ts:279

Assert element is announced to screen readers

#### Parameters

##### locator

`Locator`

#### Returns

`Promise`\<`void`\>
