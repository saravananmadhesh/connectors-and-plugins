# Getting Started – Syncfusion TypeScript NumericTextBox

## Table of Contents
- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [Add CSS Styles](#add-css-styles)
- [Basic Initialization](#basic-initialization)
- [Range Validation](#range-validation)
- [Formatting the Value](#formatting-the-value)
- [Decimal Precision](#decimal-precision)

---

## Dependencies

The NumericTextBox only requires `@syncfusion/ej2-inputs` (which depends on `@syncfusion/ej2-base`).

```
|-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-base
```

Install via npm:
```bash
npm install @syncfusion/ej2-inputs
```

---

## Project Setup

Use the Syncfusion webpack quickstart for the fastest setup:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

Add an `<input>` element as the mount point in `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>EJ2 NumericTextBox</title>
  <meta charset="utf-8" />
</head>
<body>
  <input id="numeric" type="text" />
</body>
</html>
```

---

## Add CSS Styles

Import the CSS theme in `src/styles/styles.css`. The Material theme is the recommended default:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/numerictextbox/index.css";
```

Other available themes: `bootstrap4`, `bootstrap5`, `fluent`, `tailwind`, `highcontrast`.

---

## Basic Initialization

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  value: 10
});

numeric.appendTo('#numeric');
```

Run the application:
```bash
npm run start
```

### With Float Label and Placeholder

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  value: 10,
  placeholder: 'Enter a number',
  floatLabelType: 'Auto'   // 'Never' | 'Always' | 'Auto'
});

numeric.appendTo('#numeric');
```

`floatLabelType` options:
- `'Never'` – placeholder never floats (default)
- `'Always'` – label always floats above the input
- `'Auto'` – label floats after the user focuses or types a value

---

## Range Validation

Use `min` and `max` to constrain allowed values. `step` controls how much the value changes per spin button click.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  min: 10,
  max: 20,
  value: 16,
  step: 2
});

numeric.appendTo('#numeric');
```

### Strict Mode (default: true)

When `strictMode` is `true` (default), the entered value is clamped to `[min, max]` on blur.

When `strictMode` is `false`, out-of-range values are allowed but the component adds an error CSS class to highlight invalid input.

```ts
let numeric: NumericTextBox = new NumericTextBox({
  strictMode: false,
  min: 10,
  max: 20,
  value: 25   // allowed, but error class applied
});
numeric.appendTo('#numeric');
```

---

## Formatting the Value

The `format` property controls how the value is displayed when the component is unfocused. Defaults to `'n2'`.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let currency: NumericTextBox = new NumericTextBox({
  format: 'c2',   // currency with 2 decimal places
  value: 10
});
currency.appendTo('#numeric');
```

Common format strings:
- `'n2'` – number with 2 decimals (default)
- `'c2'` – currency with 2 decimals
- `'p2'` – percentage with 2 decimals (value 0.5 → "50.00%")
- `'###.##'` – custom format with `#` specifier
- `'000.00'` – custom format with `0` specifier (pads with zeros)

---

## Decimal Precision

Use `decimals` to restrict the number of decimal places shown when the component is focused. Use `validateDecimalOnType` to enforce this restriction *while typing*.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

// Restrict to 3 decimal places while typing
let numeric: NumericTextBox = new NumericTextBox({
  validateDecimalOnType: true,
  decimals: 3,
  format: 'n3',
  value: 10,
  placeholder: 'ValidateDecimalOnType enabled',
  floatLabelType: 'Auto'
});
numeric.appendTo('#strict');

// Allow display of 3 decimals, but not restricted while typing
let numeric1: NumericTextBox = new NumericTextBox({
  decimals: 3,
  format: 'n3',
  value: 10,
  placeholder: 'ValidateDecimalOnType disabled',
  floatLabelType: 'Auto'
});
numeric1.appendTo('#allow');
```

**Key distinction:**
- `decimals` – limits decimal places *displayed* when the component is focused
- `validateDecimalOnType: true` – prevents entering more decimal digits than `decimals` allows while typing
