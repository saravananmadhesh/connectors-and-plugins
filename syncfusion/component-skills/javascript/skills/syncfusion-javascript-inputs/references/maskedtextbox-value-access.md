# Value Access and Programmatic Control — Syncfusion TypeScript MaskedTextBox

## Table of Contents
- [value vs getMaskedValue](#value-vs-getmaskedvalue)
- [Pre-filling a Value](#pre-filling-a-value)
- [Reading Value Programmatically](#reading-value-programmatically)
- [Setting Value Programmatically](#setting-value-programmatically)
- [focusIn and focusOut Methods](#focusin-and-focusout-methods)
- [getMaskedValue Method](#getmaskedvalue-method)

---

## value vs getMaskedValue

The MaskedTextBox has two ways to get the current input:

| Access | Returns | Example for mask `(000) 000-0000` with input `8001234567` |
|---|---|---|
| `mask.value` | Raw value — digits/letters only, no literals or prompt chars | `"8001234567"` |
| `mask.getMaskedValue()` | Formatted value — with mask literals included | `"(800) 123-4567"` |

Use `value` when you need to store or submit the clean data. Use `getMaskedValue()` when you need the display format.

---

## Pre-filling a Value

Set `value` with raw input (no literals or prompt characters):

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '(999) 9999-999',
    value: '8674321756',       // raw digits only — no parens or dashes
    placeholder: 'Mobile Number',
    floatLabelType: 'Auto'
});
mask.appendTo('#mask');
```

The component automatically places the raw digits into the correct mask positions.

---

## Reading Value Programmatically

After the component is initialized:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    value: '8001234567'
});
mask.appendTo('#mask');

// Raw value (no mask characters):
console.log(mask.value);             // "8001234567"

// Formatted value (with mask characters):
console.log(mask.getMaskedValue());  // "800-123-4567"
```

---

## Setting Value Programmatically

Assign `value` directly or use `dataBind()` after changing properties:

```typescript
// Direct assignment
mask.value = '9995551234';
mask.dataBind();   // applies pending property changes immediately
```

Or use `refresh()` to re-render after changes:

```typescript
mask.value = '9995551234';
mask.refresh();
```

---

## focusIn and focusOut Methods

Use `focusIn()` to set keyboard focus on the component programmatically:

```typescript
mask.focusIn();   // sets focus to the MaskedTextBox
mask.focusOut();  // removes focus from the MaskedTextBox
```

This is useful when programmatically guiding the user to an input after an action.

---

## getMaskedValue Method

Returns the current value with mask literals included:

```typescript
const formatted: string = mask.getMaskedValue();
// For mask '(000) 000-0000' with value '8001234567':
// Returns: "(800) 123-4567"
```

**Check for complete input:**

```typescript
// Input is complete when no prompt characters remain
const isComplete = mask.getMaskedValue().indexOf(mask.promptChar) === -1;

// Also check the value isn't empty
const hasInput = mask.value !== null && mask.value.length > 0;
```

**Checking in a submit handler:**

```typescript
document.getElementById('submit').addEventListener('click', () => {
    const inputEl = document.getElementById('mask') as HTMLInputElement;
    if (inputEl.value !== '' && inputEl.value.indexOf(mask.promptChar) === -1) {
        console.log('Complete input:', mask.value);
    } else {
        console.log('Incomplete or empty input');
    }
});
```
