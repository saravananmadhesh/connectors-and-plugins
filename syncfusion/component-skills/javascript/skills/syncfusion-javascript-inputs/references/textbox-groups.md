# Groups, Icons & Clear Button – Syncfusion TypeScript TextBox

## Table of Contents
- [Adding Icons with addIcon()](#adding-icons-with-addicon)
- [Icon with Floating Label](#icon-with-floating-label)
- [Show Clear Button](#show-clear-button)
- [Floating Label Without Required Attribute](#floating-label-without-required-attribute)
- [Multi-line Input with Floating Label](#multi-line-input-with-floating-label)

---

## Adding Icons with addIcon()

Use the `addIcon(position, iconClass)` method inside the `created` event to attach icon spans to the TextBox. The icon becomes part of the input group wrapper.

- `'append'` – places the icon after the input
- `'prepend'` – places the icon before the input

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

// Icon appended (right side)
let textIconAppend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  created: () => {
    textIconAppend.addIcon('append', 'e-date-icon');
  }
});
textIconAppend.appendTo('#textIconAppend');

// Icon prepended (left side)
let textIconPrepend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  created: () => {
    textIconPrepend.addIcon('prepend', 'e-date-icon');
  }
});
textIconPrepend.appendTo('#textIconPrepend');

// Icons on both sides
let textIconAppendPrepend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  created: () => {
    textIconAppendPrepend.addIcon('prepend', 'e-date-icon');
    textIconAppendPrepend.addIcon('append', 'e-chevron-down-fill');
  }
});
textIconAppendPrepend.appendTo('#textIconAppendPrepend');
```

---

## Icon with Floating Label

`addIcon()` works seamlessly with `floatLabelType`. The icon is positioned relative to the input and label floats correctly.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

// Floating label + appended icon
let textFloatIconAppend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  floatLabelType: 'Auto',
  created: () => {
    textFloatIconAppend.addIcon('append', 'e-date-icon');
  }
});
textFloatIconAppend.appendTo('#textFloatIconAppend');

// Floating label + prepended icon
let textFloatIconPrepend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  floatLabelType: 'Auto',
  created: () => {
    textFloatIconPrepend.addIcon('prepend', 'e-date-icon');
  }
});
textFloatIconPrepend.appendTo('#textFloatIconPrepend');

// Floating label + icons on both sides
let textFloatIconAppendPrepend: TextBox = new TextBox({
  placeholder: 'Enter Date',
  floatLabelType: 'Auto',
  created: () => {
    textFloatIconAppendPrepend.addIcon('prepend', 'e-date-icon');
    textFloatIconAppendPrepend.addIcon('append', 'e-chevron-down-fill');
  }
});
textFloatIconAppendPrepend.appendTo('#textFloatIconAppendPrepend');
```

> To place an icon on the left side of a floating label TextBox, wrap the input in a `<div class="e-input-in-wrap">` and add the `e-float-icon-left` class to the outer wrapper.

---

## Show Clear Button

Enable `showClearButton` to add a built-in clear (×) button. The button appears only when the input has a value and disappears when the field is empty.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let inputobj: TextBox = new TextBox({
  placeholder: 'First Name',
  floatLabelType: 'Never',
  showClearButton: true
});
inputobj.appendTo('#firstName');

let inputobj1: TextBox = new TextBox({
  placeholder: 'Last Name',
  floatLabelType: 'Auto',
  showClearButton: true
});
inputobj1.appendTo('#lastName');
```

---

## Floating Label Without Required Attribute

By default, floating label relies on the `:valid` CSS pseudo-class, which requires the `required` attribute. To float the label without it, manually handle focus and blur events and toggle the CSS classes `e-label-top` (floated) and `e-label-bottom` (placeholder position) on the label element.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let inputObj: TextBox = new TextBox({
  placeholder: 'Enter the name',
  floatLabelType: 'Auto'
});
inputObj.appendTo('#input1');
```

CSS class reference for manual float control:

| Class | Effect |
|---|---|
| `e-label-top` | Floats the label above the TextBox |
| `e-label-bottom` | Positions the label as a placeholder |

---

## Multi-line Input with Floating Label

A `<textarea>` element can also use floating labels when rendered as a TextBox with `multiline: true`.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let textBoxObj: TextBox = new TextBox({
  placeholder: 'Enter address',
  multiline: true
});
textBoxObj.appendTo('#input1');
```
