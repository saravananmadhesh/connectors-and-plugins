# Style & Appearance – Syncfusion TypeScript NumericTextBox

## Table of Contents
- [Customizing the Wrapper Element](#customizing-the-wrapper-element)
- [Customizing Spin Button Icons via CSS](#customizing-spin-button-icons-via-css)
- [Applying a Custom CSS Class](#applying-a-custom-css-class)
- [Overriding Spin Up / Down Arrow Icons](#overriding-spin-up--down-arrow-icons)

---

## Customizing the Wrapper Element

Use the following CSS selector to change the height and font size of the NumericTextBox input:

```css
/* Customize wrapper element height and font size */
.e-input-group input.e-input,
.e-input-group.e-control-wrapper input.e-input,
.e-input-group textarea.e-input,
.e-input-group.e-control-wrapper textarea.e-input {
  height: 40px;
  font-size: 20px;
}
```

Apply this in your component's stylesheet or a global CSS file.

---

## Customizing Spin Button Icons via CSS

To change the visual appearance of the spin button icon container (font size, background color):

```css
/* Customize spin button icon size and background */
.e-numeric.e-control-wrapper.e-input-group .e-input-group-icon {
  font-size: 20px;
  background-color: beige;
}
```

---

## Applying a Custom CSS Class

Use the `cssClass` property to attach one or more custom CSS classes to the NumericTextBox root element. This lets you scope your custom styles precisely.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  value: 10,
  placeholder: 'Enter value',
  floatLabelType: 'Always',
  cssClass: 'e-style'
});

numeric.appendTo('#numeric1');
```

Then define the styles scoped to `.e-style`:

```css
/* Example: custom border color and background */
.e-style.e-control-wrapper.e-numeric {
  border-color: #6200ee;
  background-color: #f3e5f5;
}
```

---

## Overriding Spin Up / Down Arrow Icons

The spin up and down buttons use icon fonts. Override the glyph by targeting the `::before` pseudo-element of the `.e-spin-up` and `.e-spin-down` classes:

```css
/* Replace default spin-up icon */
.e-numeric .e-input-group-icon.e-spin-up:before {
  content: "\e823";
  color: rgba(0, 0, 0, 0.54);
}

/* Replace default spin-down icon */
.e-numeric .e-input-group-icon.e-spin-down:before {
  content: "\e934";
  color: rgba(0, 0, 0, 0.54);
}
```

The component initialization remains the same – no TypeScript changes needed:

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  value: 10
});

numeric.appendTo('#numeric');
```

**Tip:** The icon font codes (`\e823`, `\e934`) correspond to glyphs in the Syncfusion icon font (`@syncfusion/ej2-icons`). Refer to the Syncfusion icon documentation to find the correct code for your desired icon.
