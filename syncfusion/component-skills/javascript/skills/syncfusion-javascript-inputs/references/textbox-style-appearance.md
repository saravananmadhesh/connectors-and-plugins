# Style and Appearance – Syncfusion TypeScript TextBox

## Overview

The TextBox appearance is customized using the `cssClass` property (for scoped changes) or global CSS overrides. The component supports **Filled** and **Outlined** style variants in addition to the default style.

> **Note:** Filled and Outlined modes are only available with the **Material** theme.

---

## Default Style

No extra `cssClass` needed. The TextBox renders with the theme's default underline/border style.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let defaultTextBox: TextBox = new TextBox({
  placeholder: 'Default Style',
  floatLabelType: 'Auto'
});
defaultTextBox.appendTo('#defaultTextBox');
```

---

## Filled Mode

Use `cssClass: 'e-filled'` to enable the Material filled input style (solid background, no border on sides or top).

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let filledTextBox: TextBox = new TextBox({
  placeholder: 'Filled Mode',
  floatLabelType: 'Auto',
  cssClass: 'e-filled'
});
filledTextBox.appendTo('#filledTextBox');
```

---

## Outlined Mode

Use `cssClass: 'e-outline'` to enable the Material outlined input style (full surrounding border, no fill).

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let outlinedTextBox: TextBox = new TextBox({
  placeholder: 'Outlined Mode',
  floatLabelType: 'Auto',
  cssClass: 'e-outline'
});
outlinedTextBox.appendTo('#outlinedTextBox');
```

---

## Custom Background and Text Color

Use CSS to override background and text color. Apply a scoped class via `cssClass` so styles don't bleed into other components.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let customTextBox: TextBox = new TextBox({
  value: 'Custom Colors',
  cssClass: 'custom-textbox'
});
customTextBox.appendTo('#customTextBox');
```

```css
/* Scoped custom color for input */
.custom-textbox.e-input-group input.e-input,
.custom-textbox.e-float-input input {
  background: #f5f0ff;
  color: #4a00b4;
}

/* Optionally style the wrapper */
.custom-textbox.e-input-group,
.custom-textbox.e-float-input {
  border-color: #4a00b4;
}
```

---

## Rounded Corner

Add `e-corner` via `cssClass` to apply rounded corners to the TextBox border.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let roundedTextBox: TextBox = new TextBox({
  placeholder: 'Rounded Corner',
  cssClass: 'e-corner'
});
roundedTextBox.appendTo('#roundedTextBox');
```

---

## Scoped vs Global Styles

| Approach | When to Use |
|---|---|
| `cssClass` on the component | Target a single instance without affecting others |
| Global CSS override | Apply uniform style changes to all TextBoxes on the page |

When applying global styles (no `cssClass`), target the standard EJ2 CSS selectors directly:

```css
/* Global background change for all TextBox inputs */
.e-input-group input.e-input,
.e-float-input input {
  background: #f9f9f9;
}
```
