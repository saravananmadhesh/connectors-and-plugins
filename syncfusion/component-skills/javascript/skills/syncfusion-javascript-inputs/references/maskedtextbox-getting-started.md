# Getting Started — Syncfusion TypeScript MaskedTextBox

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [HTML Setup](#html-setup)
- [Basic Initialization](#basic-initialization)
- [Setting the Mask](#setting-the-mask)
- [Placeholder and Float Label](#placeholder-and-float-label)
- [Full Working Example](#full-working-example)
- [Gotchas](#gotchas)

---

## Installation

```bash
npm install @syncfusion/ej2-inputs
```

**Dependencies** (automatically installed with `@syncfusion/ej2-inputs`):
```
@syncfusion/ej2-inputs
  └── @syncfusion/ej2-base
```

---

## CSS Imports

Include the following CSS in your `styles.css` (Material theme shown — swap `material` for `bootstrap`, `fabric`, `highcontrast`, `fluent`, `fluent2`, etc.):

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
```

> Minimum required: `@syncfusion/ej2-base` and `@syncfusion/ej2-inputs` styles. The others are optional but prevent style gaps if you use Syncfusion buttons or popups alongside.

---

## HTML Setup

Add an `<input>` element that will be converted into the MaskedTextBox:

```html
<!-- index.html -->
<input id="mask" type="text" />
```

The MaskedTextBox wraps this element with its own container — all configuration is done in TypeScript, not in the HTML.

---

## Basic Initialization

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox();
mask.appendTo('#mask');
```

Without a `mask` property set, the component behaves as a plain text input. Add a mask to enable validation.

---

## Setting the Mask

The `mask` property defines what input is accepted at each position. This is the most important configuration:

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000'  // accepts: digit 0-9 at each '0' position
});
mask.appendTo('#mask');
```

Each mask character represents a constraint:
- `0` — required digit (0–9)
- `9` — optional digit or space
- `L` — required letter (a–z, A–Z)
- `A` — required alphanumeric (A–Z, a–z, 0–9)
- Other characters (like `-`, `(`, `)`, `/`) appear as literals

See `references/mask-configuration.md` for the full mask elements table.

---

## Placeholder and Float Label

Use `placeholder` to show hint text, and `floatLabelType` to control its behavior:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Phone Number',
    floatLabelType: 'Always'   // 'Never' | 'Always' | 'Auto'
});
mask.appendTo('#mask');
```

| `floatLabelType` | Behavior |
|---|---|
| `'Never'` | Default. Placeholder stays inside field (like normal placeholder). |
| `'Always'` | Label always floats above the input. |
| `'Auto'` | Label floats above when input is focused or has a value. |

---

## Full Working Example

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Mobile Number',
    floatLabelType: 'Always',
    value: '8001234567',       // pre-filled value (raw digits only)
    promptChar: '_',           // default prompt symbol
    created: () => {
        console.log('MaskedTextBox ready');
    }
});
mask.appendTo('#mask');
```

---

## Gotchas

| Issue | Cause | Fix |
|---|---|---|
| No mask applied | Forgot `mask` property | Set `mask: '...'` explicitly |
| Float label not showing | Missing CSS or wrong `floatLabelType` | Import CSS, set `floatLabelType: 'Always'` or `'Auto'` |
| `value` includes prompt chars | Used `getMaskedValue()` instead of `value` | Use `mask.value` for raw digits/letters |
| Input accepts any character | Empty or missing `mask` | Always set `mask` property when validation is needed |
| CSS not applying | Wrong import path | Verify path: `@syncfusion/ej2-inputs/styles/material.css` |
