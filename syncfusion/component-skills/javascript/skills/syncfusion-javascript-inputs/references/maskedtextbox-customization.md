# Customization and Appearance — Syncfusion TypeScript MaskedTextBox

## Table of Contents
- [cssClass](#cssclass)
- [floatLabelType](#floatlabeltype)
- [placeholder](#placeholder)
- [width](#width)
- [enabled and readonly](#enabled-and-readonly)
- [showClearButton](#showclearbutton)
- [enableRtl](#enablertl)
- [enablePersistence](#enablepersistence)
- [htmlAttributes](#htmlattributes)
- [CSS Customization](#css-customization)

---

## cssClass

Add one or more CSS class names to the root element for custom styling:

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '00000',
    cssClass: 'e-style',       // custom CSS class
    placeholder: 'Enter User ID',
    floatLabelType: 'Always'
});
mask.appendTo('#mask');
```

Then define your styles:

```css
.e-style .e-mask {
    color: blue;
    font-weight: bold;
}
```

---

## floatLabelType

Controls how the placeholder behaves:

```typescript
// 'Never' — stays in field (default)
let mask1: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Phone',
    floatLabelType: 'Never'
});

// 'Always' — always floats above the input
let mask2: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Phone',
    floatLabelType: 'Always'
});

// 'Auto' — floats when focused or when the field has a value
let mask3: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Phone',
    floatLabelType: 'Auto'
});
```

---

## placeholder

Hint text displayed inside the input (acts as a label with `floatLabelType`):

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '00/00/0000',
    placeholder: 'Date (MM/DD/YYYY)',
    floatLabelType: 'Auto'
});
mask.appendTo('#mask');
```

---

## width

Set a fixed width using a number (pixels) or string (`'250px'`, `'50%'`):

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    width: 300          // 300px
    // or: width: '50%'
});
mask.appendTo('#mask');
```

---

## enabled and readonly

```typescript
// Disabled: user cannot interact with the field
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    enabled: false
});

// Readonly: shows the value but prevents changes
let maskReadonly: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    value: '8001234567',
    readonly: true
});
```

Toggle dynamically:

```typescript
mask.enabled = false;
mask.dataBind();

// Re-enable later:
mask.enabled = true;
mask.dataBind();
```

---

## showClearButton

Adds an X icon that clears the input value:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    showClearButton: true
});
mask.appendTo('#mask');
```

---

## enableRtl

Renders the component in right-to-left direction (for RTL languages):

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    enableRtl: true
});
mask.appendTo('#mask');
```

---

## enablePersistence

Saves the `value` state in browser local storage across page reloads:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    enablePersistence: true
});
mask.appendTo('#mask');
```

---

## htmlAttributes

Pass additional HTML attributes to the input element:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000',
    value: '6000021',
    htmlAttributes: {
        name: 'phonenumber',
        tabindex: '-1',
        readonly: 'readonly'
    }
});
mask.appendTo('#mask');
```

> If both a property (e.g., `readonly`) and an equivalent HTML attribute are set, the component-level property takes precedence.

### Numeric keypad on mobile

Use `htmlAttributes` to trigger the telephone keypad on mobile devices:

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '999-99999',
    value: '342-45432',
    htmlAttributes: { type: 'tel' }    // shows numeric keypad on mobile
});
mask.appendTo('#mask');
```

---

## CSS Customization

### Customize the wrapper element (height, font, border)

```css
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input {
    font-size: 20px;
    border-color: red;
    height: 40px;
    border: 2px solid;
}
```

### Customize on hover

```css
.e-input-group input.e-input:hover:not(.e-success):not(.e-warning):not(.e-error):not([disabled]):not(:focus),
.e-input-group.e-control-wrapper input.e-input:hover:not(.e-success):not(.e-warning):not(.e-error):not([disabled]):not(:focus) {
    border: 3px solid red;
}
```
