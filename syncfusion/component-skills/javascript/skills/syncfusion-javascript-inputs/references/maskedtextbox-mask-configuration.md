# Mask Configuration — Syncfusion TypeScript MaskedTextBox

## Table of Contents
- [Standard Mask Elements](#standard-mask-elements)
- [Using Standard Masks](#using-standard-masks)
- [Custom Characters](#custom-characters)
- [Regular Expression Masks](#regular-expression-masks)
- [Prompt Character](#prompt-character)

---

## Standard Mask Elements

The mask is a string combining these elements. Each character in the mask defines what input is accepted at that position.

| Element | Description |
|---|---|
| `0` | Digit required (0–9) |
| `9` | Digit or space, optional |
| `#` | Digit, space, `+`, or `-`, optional |
| `L` | Letter required (a–z, A–Z) |
| `?` | Letter or space, optional |
| `&` | Any character required (letter, digit, or special character) |
| `C` | Any character or space, optional |
| `A` | Alphanumeric required (A–Z, a–z, 0–9) |
| `a` | Alphanumeric or space, optional |
| `<` | Shift down — converts all following characters to lowercase |
| `>` | Shift up — converts all following characters to uppercase |
| `\|` | Disables previous `<` or `>` shift |
| `\\` | Escape — turns the next mask character into a literal |
| All other characters | Literals — appear as-is in the input |

> When `mask` is empty, the MaskedTextBox behaves as a plain text input with no restrictions.

---

## Using Standard Masks

### Digits only

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

// Phone: 000-000-0000 accepts exactly 10 digits
let phoneMask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Phone Number (ex: 800-123-4567)',
    floatLabelType: 'Always'
});
phoneMask.appendTo('#mask1');
```

### Letters only

```typescript
// LLLLLL accepts exactly 6 letters
let letterMask: MaskedTextBox = new MaskedTextBox({
    mask: 'LLLLLL',
    placeholder: 'Letters only (ex: Sample)',
    floatLabelType: 'Always'
});
letterMask.appendTo('#mask2');
```

### Optional digit or space

```typescript
// ##### accepts digits, spaces, +, or - signs
let optMask: MaskedTextBox = new MaskedTextBox({
    mask: '#####',
    placeholder: 'Mask ##### (ex: 012+-)',
    floatLabelType: 'Always'
});
optMask.appendTo('#mask3');
```

### Case conversion

```typescript
// >LLL<LLL — first 3 forced uppercase, next 3 forced lowercase
let caseMask: MaskedTextBox = new MaskedTextBox({
    mask: '>LLL<LLL',
    placeholder: '>LLL<LLL (ex: SAMple)',
    floatLabelType: 'Always'
});
caseMask.appendTo('#mask4');
```

### Escaped literal character

```typescript
// \\A999 — the 'A' is a literal character, then 3 required digits
let escapeMask: MaskedTextBox = new MaskedTextBox({
    mask: '\\A999',
    placeholder: '\\A999 (ex: A321)',
    floatLabelType: 'Always'
});
escapeMask.appendTo('#mask5');
```

---

## Custom Characters

Use `customCharacters` to define your own mask elements. Any non-standard character in the mask can be mapped to a set of accepted values.

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

// 'P' accepts P, A, p, a
// 'M' accepts M, m
let timeMask: MaskedTextBox = new MaskedTextBox({
    customCharacters: {
        P: 'P,A,a,p',
        M: 'M,m'
    },
    mask: '00:00 >PM',
    placeholder: 'Time (ex: 10:00 PM, 10:00 AM)',
    floatLabelType: 'Always'
});
timeMask.appendTo('#mask');
```

**How it works:**
- Define a key (a single character used in the `mask`)
- Map it to a comma-separated string of accepted characters
- The mask character then only accepts those listed characters

---

## Regular Expression Masks

Wrap a regular expression in square brackets `[regex]` to define a custom rule for a single input position.

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

// IP address: each octet position validated by [0-2][0-9][0-9]
let ipMask: MaskedTextBox = new MaskedTextBox({
    placeholder: 'IP Address (ex: 212.212.111.222)',
    floatLabelType: 'Always',
    mask: '[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9]'
});
ipMask.appendTo('#mask');
```

Each `[...]` in the mask corresponds to a single input character position validated by that regex.

---

## Prompt Character

The prompt character fills empty mask positions to show where input is expected. Default is `_`.

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

// Change the prompt symbol to '#'
let mask: MaskedTextBox = new MaskedTextBox({
    promptChar: '#',
    mask: '999-999-9999'
});
mask.appendTo('#mask');
```

**Use cases:**
- Change `_` to `*` for password-like appearance
- Change to a space `' '` for a cleaner look
- The prompt char appears where no input has been entered yet

**Checking if user completed the mask:**

```typescript
// Check if input is complete (no prompt chars remain in displayed value)
const maskedVal = mask.getMaskedValue();
const isComplete = maskedVal.indexOf(mask.promptChar) === -1;
```
