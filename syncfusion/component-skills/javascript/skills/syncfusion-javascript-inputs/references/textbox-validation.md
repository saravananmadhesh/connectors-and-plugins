# Validation – Syncfusion TypeScript TextBox

## Table of Contents
- [Validation State Classes](#validation-state-classes)
- [Change Floating Label Color for Validation States](#change-floating-label-color-for-validation-states)
- [Change TextBox Color Based on Value](#change-textbox-color-based-on-value)

---

## Validation State Classes

The TextBox supports three built-in visual validation states applied via the `cssClass` property:

| State | Class | Visual effect |
|---|---|---|
| Warning | `e-warning` | Yellow/amber styling |
| Error | `e-error` | Red styling |
| Success | `e-success` | Green styling |

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let warningTextBox: TextBox = new TextBox({
  placeholder: 'Input with warning',
  cssClass: 'e-warning'
});
warningTextBox.appendTo('#warning');

let errorTextBox: TextBox = new TextBox({
  placeholder: 'Input with error',
  cssClass: 'e-error'
});
errorTextBox.appendTo('#error');

let successTextBox: TextBox = new TextBox({
  placeholder: 'Input with success',
  cssClass: 'e-success'
});
successTextBox.appendTo('#success');
```

**Switching state dynamically** – update `cssClass` and call `dataBind()`:
```ts
errorTextBox.cssClass = 'e-success';
errorTextBox.dataBind();
```

---

## Change Floating Label Color for Validation States

Override the floating label text color for `e-success` and `e-warning` states using CSS:

```css
/* Success state – floating label color */
.e-float-input.e-success label.e-float-text,
.e-float-input.e-success input:focus ~ label.e-float-text,
.e-float-input.e-success input:valid ~ label.e-float-text {
  color: #22b24b;
}

/* Warning state – floating label color */
.e-float-input.e-warning label.e-float-text,
.e-float-input.e-warning input:focus ~ label.e-float-text,
.e-float-input.e-warning input:valid ~ label.e-float-text {
  color: #ffca1c;
}
```

```ts
import { TextBox } from '@syncfusion/ej2-inputs';

let warningFloatTextBox: TextBox = new TextBox({
  placeholder: 'Warning',
  cssClass: 'e-warning',
  floatLabelType: 'Auto'
});
warningFloatTextBox.appendTo('#warning');

let successIconTextBox: TextBox = new TextBox({
  placeholder: 'Success',
  cssClass: 'e-success',
  floatLabelType: 'Auto'
});
successIconTextBox.appendTo('#success');
```

---

## Change TextBox Color Based on Value

Dynamically add or remove the `e-error` class on the TextBox wrapper based on user input — for example, to flag non-numeric characters in a field that expects only numbers.

```ts
function onKeyup(e: any): void {
  const str = e.value.match(/^[0-9]+$/);
  if (!str && e.value.length) {
    e.parentElement.classList.add('e-error');
  } else {
    e.parentElement.classList.remove('e-error');
  }
}
```

Wire the function to the `keyup` DOM event on the input element:

```html
<input id="textbox" onkeyup="onKeyup(this)" />
```

This approach works without the TextBox component's TypeScript events because it reads the raw DOM input value directly. It is ideal for lightweight real-time pattern validation.
