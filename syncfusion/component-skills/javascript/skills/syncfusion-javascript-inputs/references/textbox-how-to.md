# How-To Guides – Syncfusion TypeScript TextBox

## Table of Contents

1. [Add TextBox Programmatically](#1-add-textbox-programmatically)
2. [Add Floating Label Programmatically](#2-add-floating-label-programmatically)
3. [Add Floating Label to Read-Only TextBox](#3-add-floating-label-to-read-only-textbox)
4. [Set Disabled State](#4-set-disabled-state)
5. [Set Read-Only State](#5-set-read-only-state)
6. [Set Rounded Corner](#6-set-rounded-corner)
7. [Change Floating Label Color for Validation States](#7-change-floating-label-color-for-validation-states)
8. [Change TextBox Color Based on Value](#8-change-textbox-color-based-on-value)
9. [Customize Background and Text Color](#9-customize-background-and-text-color)

---

## 1. Add TextBox Programmatically

Use `Input.createInput()` from `@syncfusion/ej2-inputs` to create a TextBox without directly instantiating the `TextBox` class. Pass a dynamically created `<input>` element along with optional properties.

```ts
import { Input, InputObject } from '@syncfusion/ej2-inputs';

// Create basic input
let element: HTMLInputElement = document.createElement('input') as HTMLInputElement;
document.getElementById('input-container').appendChild(element);
Input.createInput({
  element: element,
  properties: {
    placeholder: 'Enter Name'
  }
});

// Create input with icon button
let element2: HTMLInputElement = document.createElement('input') as HTMLInputElement;
document.getElementById('input-container').appendChild(element2);
Input.createInput({
  element: element2,
  buttons: ['e-input-group-icon e-input-down'],
  properties: {
    placeholder: 'Enter Value'
  }
});
```

---

## 2. Add Floating Label Programmatically

Pass `floatLabelType` to `Input.createInput()` to create a floating label TextBox without using the `TextBox` component class directly.

| floatLabelType | Behavior |
|---|---|
| `"Auto"` | Label floats when focused or when value is entered |
| `"Always"` | Label is always floated above the input |
| `"Never"` | Label never floats (acts as static placeholder) |

```ts
import { Input } from '@syncfusion/ej2-inputs';

// Auto float label
let el1: HTMLInputElement = document.createElement('input') as HTMLInputElement;
document.getElementById('container1').appendChild(el1);
Input.createInput({
  element: el1,
  floatLabelType: 'Auto',
  properties: { placeholder: 'Enter Name' }
});

// Always float label
let el2: HTMLInputElement = document.createElement('input') as HTMLInputElement;
document.getElementById('container2').appendChild(el2);
Input.createInput({
  element: el2,
  floatLabelType: 'Always',
  properties: { placeholder: 'Enter Name' }
});

// Float label with icon
let el3: HTMLInputElement = document.createElement('input') as HTMLInputElement;
document.getElementById('container3').appendChild(el3);
Input.createInput({
  element: el3,
  floatLabelType: 'Auto',
  buttons: ['e-input-group-icon e-input-down'],
  properties: { placeholder: 'Enter Value' }
});
```

---

## 3. Add Floating Label to Read-Only TextBox

Set `readonly: true` and `floatLabelType: 'Auto'`. Update `value` programmatically to trigger the label to float.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let readonlyTextBox: TextBox = new TextBox({
  placeholder: 'Readonly Textbox',
  readonly: true,
  floatLabelType: 'Auto'
});
readonlyTextBox.appendTo('#readonly');

// Set value to float the label
document.getElementById('setValueButton').addEventListener('click', function () {
  readonlyTextBox.value = 'Sample Text';
});

// Clear value to lower the label
document.getElementById('clearValueButton').addEventListener('click', function () {
  readonlyTextBox.value = '';
});
```

---

## 4. Set Disabled State

Set `enabled: false` to render a non-interactive, disabled TextBox. The input will appear grayed out and cannot be focused or edited.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let disabledTextBox: TextBox = new TextBox({
  placeholder: 'Disabled TextBox',
  enabled: false
});
disabledTextBox.appendTo('#disable');
```

---

## 5. Set Read-Only State

Set `readonly: true` to render a TextBox that displays its value but cannot be edited by the user. Unlike `disabled`, a read-only TextBox remains focusable.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let readonlyTextBox: TextBox = new TextBox({
  placeholder: 'Read-Only TextBox',
  readonly: true
});
readonlyTextBox.appendTo('#readonly');
```

---

## 6. Set Rounded Corner

Add `e-corner` to `cssClass` to apply rounded borders to the TextBox.

> Rounded corners are visible only in the **box model** input (i.e., when the TextBox is rendered as a box/outlined style, not as an underline-only style).

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let roundedTextBox: TextBox = new TextBox({
  placeholder: 'Rounded Corner',
  cssClass: 'e-corner'
});
roundedTextBox.appendTo('#rounded');
```

---

## 7. Change Floating Label Color for Validation States

Override the floating label color for `e-warning` and `e-success` states using CSS:

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let warningTextBox: TextBox = new TextBox({
  placeholder: 'Warning',
  cssClass: 'e-warning',
  floatLabelType: 'Auto'
});
warningTextBox.appendTo('#warning');

let successTextBox: TextBox = new TextBox({
  placeholder: 'Success',
  cssClass: 'e-success',
  floatLabelType: 'Auto'
});
successTextBox.appendTo('#success');
```

```css
/* Success state floating label */
.e-float-input.e-success label.e-float-text,
.e-float-input.e-success input:focus ~ label.e-float-text,
.e-float-input.e-success input:valid ~ label.e-float-text {
  color: #22b24b;
}

/* Warning state floating label */
.e-float-input.e-warning label.e-float-text,
.e-float-input.e-warning input:focus ~ label.e-float-text,
.e-float-input.e-warning input:valid ~ label.e-float-text {
  color: #ffca1c;
}
```

---

## 8. Change TextBox Color Based on Value

Use a `keyup` event listener with a regular expression to validate the input in real-time and toggle `e-error` on the parent element. This gives instant visual feedback without a full form validation.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let dynamicTextBox: TextBox = new TextBox({
  placeholder: 'Enter numeric value',
  floatLabelType: 'Auto'
});
dynamicTextBox.appendTo('#dynamic');

// Attach keyup validation
document.getElementById('dynamic').addEventListener('keyup', function (e: Event) {
  const inputEl = e.target as HTMLInputElement;
  const str = inputEl.value.match(/^[0-9]+$/);
  if (!(str && str.length > 0) && inputEl.value.length) {
    inputEl.parentElement.classList.add('e-error');
  } else {
    inputEl.parentElement.classList.remove('e-error');
  }
});
```

---

## 9. Customize Background and Text Color

Override default EJ2 CSS variables to change the background and text color of TextBoxes. Use `cssClass` to scope overrides to a specific instance.

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let normalTextBox: TextBox = new TextBox({
  placeholder: 'First Name',
  cssClass: 'custom-bg'
});
normalTextBox.appendTo('#normal');

let floatTextBox: TextBox = new TextBox({
  placeholder: 'Last Name',
  floatLabelType: 'Auto',
  cssClass: 'custom-bg'
});
floatTextBox.appendTo('#float');
```

```css
/* Custom background for normal and float input */
.custom-bg.e-input-group input.e-input,
.custom-bg.e-float-input input {
  background: #fffde7;
  color: #5d4037;
}

/* Override floating label color */
.custom-bg.e-float-input label.e-float-text {
  color: #5d4037;
}
```
