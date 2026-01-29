[**Playwright Power Platform Toolkit v0.0.4**](../README.md)

---

[Playwright Power Platform Toolkit](../README.md) / TestLogger

# Class: TestLogger

Defined in: utils/logger.ts:26

## Constructors

### Constructor

> **new TestLogger**(): `TestLogger`

#### Returns

`TestLogger`

## Methods

### info()

> `static` **info**(`message`): `void`

Defined in: utils/logger.ts:41

Log informational message in gray color

#### Parameters

##### message

`string`

#### Returns

`void`

---

### debug()

> `static` **debug**(`message`): `void`

Defined in: utils/logger.ts:48

Log debug message in gray color

#### Parameters

##### message

`string`

#### Returns

`void`

---

### step()

> `static` **step**(`stepNumber`, `message`): `void`

Defined in: utils/logger.ts:55

Log test step in gray with step indicator

#### Parameters

##### stepNumber

`number`

##### message

`string`

#### Returns

`void`

---

### success()

> `static` **success**(`message`): `void`

Defined in: utils/logger.ts:62

Log success message in gray

#### Parameters

##### message

`string`

#### Returns

`void`

---

### warning()

> `static` **warning**(`message`): `void`

Defined in: utils/logger.ts:69

Log warning message in gray

#### Parameters

##### message

`string`

#### Returns

`void`

---

### error()

> `static` **error**(`message`, `error?`): `void`

Defined in: utils/logger.ts:76

Log error message in red

#### Parameters

##### message

`string`

##### error?

`Error`

#### Returns

`void`

---

### log()

> `static` **log**(`message`): `void`

Defined in: utils/logger.ts:89

Log a simple gray message without any prefix

#### Parameters

##### message

`string`

#### Returns

`void`

---

### section()

> `static` **section**(`title`): `void`

Defined in: utils/logger.ts:96

Log a test section header

#### Parameters

##### title

`string`

#### Returns

`void`

---

### data()

> `static` **data**(`label`, `value`): `void`

Defined in: utils/logger.ts:105

Log data in a formatted way

#### Parameters

##### label

`string`

##### value

`any`

#### Returns

`void`

---

### timing()

> `static` **timing**(`label`, `milliseconds`): `void`

Defined in: utils/logger.ts:114

Log timing information

#### Parameters

##### label

`string`

##### milliseconds

`number`

#### Returns

`void`
