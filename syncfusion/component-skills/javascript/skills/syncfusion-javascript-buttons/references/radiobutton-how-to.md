# How-To Scenarios — Syncfusion JavaScript RadioButton

## Table of Contents
- [Set the Disabled State](#set-the-disabled-state)
- [Enable Right-to-Left (RTL)](#enable-right-to-left-rtl)
- [Use Name and Value in Form Submission](#use-name-and-value-in-form-submission)
- [Customize RadioButton Appearance](#customize-radiobutton-appearance)

---

## Set the Disabled State

Use the `disabled` property to prevent user interaction with a RadioButton. A disabled RadioButton is grayed out and non-interactive.

```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Active option (checked by default)
let rb1: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'default',
  checked: true,
  change: onChange
});
rb1.appendTo('#element1');

// Disabled option — cannot be selected by the user
let rb2: RadioButton = new RadioButton({
  label: 'Option 2',
  name: 'default',
  disabled: true,
  change: onChange
});
rb2.appendTo('#element2');

// Regular option
let rb3: RadioButton = new RadioButton({
  label: 'Option 3',
  name: 'default',
  change: onChange
});
rb3.appendTo('#element3');

function onChange(args: ChangeEventArgs): void {
  document.getElementById('text')!.innerText = 'Selected: ' + (args.event.target as HTMLInputElement).value;
}
```

```html
<input id="element1" type="radio" />
<input id="element2" type="radio" />
<input id="element3" type="radio" />
<span id="text"></span>
```



> **Note:** The `value` of a disabled RadioButton is **not submitted** to the server in a form post.

---

## Enable Right-to-Left (RTL)

Set `enableRtl: true` to render the RadioButton with a right-to-left text and layout direction. Useful for Arabic, Hebrew, or other RTL languages.

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let rb1: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'default',
  enableRtl: true
});
rb1.appendTo('#element1');

let rb2: RadioButton = new RadioButton({
  label: 'Option 2',
  name: 'default',
  enableRtl: true,
  checked: true
});
rb2.appendTo('#element2');
```

```html
<input id="element1" type="radio" />
<input id="element2" type="radio" />
```



---

## Use Name and Value in Form Submission

The `name` attribute groups RadioButtons so only one can be selected at a time. The `value` attribute defines what data gets submitted to the server when the form is submitted.

When the form is submitted, only the `value` of the **checked** RadioButton in each `name` group is sent. **Disabled** RadioButton values are excluded from form submission.

```typescript
import { Button, RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Payment method group — "Credit/Debit Card" is pre-selected
let rb1: RadioButton = new RadioButton({
  label: 'Credit/Debit Card',
  name: 'payment',
  value: 'credit/debit',
  checked: true
});
rb1.appendTo('#radiobutton1');

let rb2: RadioButton = new RadioButton({
  label: 'Net Banking',
  name: 'payment',
  value: 'netbanking'
});
rb2.appendTo('#radiobutton2');

let rb3: RadioButton = new RadioButton({
  label: 'Cash on Delivery',
  name: 'payment',
  value: 'cashondelivery'
});
rb3.appendTo('#radiobutton3');

let rb4: RadioButton = new RadioButton({
  label: 'Others',
  name: 'payment',
  value: 'others'
});
rb4.appendTo('#radiobutton4');

// Submit button
let submitBtn: Button = new Button({ isPrimary: true });
submitBtn.appendTo('#btnElement');
```

```html
<form>
  <input id="radiobutton1" type="radio" />
  <input id="radiobutton2" type="radio" />
  <input id="radiobutton3" type="radio" />
  <input id="radiobutton4" type="radio" />
  <button id="btnElement" type="submit">Submit</button>
</form>
```



> **Key rules:**
> - All RadioButtons in the same group must share the same `name` attribute.
> - Only the `value` of the checked option is sent on form submit.
> - Disabled RadioButton values are never sent.

---

## Customize RadioButton Appearance

Use the `cssClass` property to apply custom CSS classes to the RadioButton. You can define semantic color styles (primary, success, info, warning, danger) to match your application's design system.

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';

// Primary style
let rb1: RadioButton = new RadioButton({ label: 'Primary', name: 'custom', cssClass: 'e-primary' });
rb1.appendTo('#radiobutton1');

// Success style
let rb2: RadioButton = new RadioButton({ label: 'Success', name: 'custom', cssClass: 'e-success' });
rb2.appendTo('#radiobutton2');

// Info style (checked)
let rb3: RadioButton = new RadioButton({ label: 'Info', name: 'custom', cssClass: 'e-info', checked: true });
rb3.appendTo('#radiobutton3');

// Warning style
let rb4: RadioButton = new RadioButton({ label: 'Warning', name: 'custom', cssClass: 'e-warning' });
rb4.appendTo('#radiobutton4');

// Danger style
let rb5: RadioButton = new RadioButton({ label: 'Danger', name: 'custom', cssClass: 'e-danger' });
rb5.appendTo('#radiobutton5');
```

```html
<input id="radiobutton1" type="radio" />
<input id="radiobutton2" type="radio" />
<input id="radiobutton3" type="radio" />
<input id="radiobutton4" type="radio" />
<input id="radiobutton5" type="radio" />
```

Define the custom CSS in your stylesheet to set background/border colors:

```css
/* e-primary: blue */
.e-radio-wrapper.e-primary .e-radio:checked + .e-label::before {
  background-color: #e3165b;
  border-color: #e3165b;
}

/* e-success: green */
.e-radio-wrapper.e-success .e-radio:checked + .e-label::before {
  background-color: #4caf50;
  border-color: #4caf50;
}

/* e-info: cyan */
.e-radio-wrapper.e-info .e-radio:checked + .e-label::before {
  background-color: #00bcd4;
  border-color: #00bcd4;
}

/* e-warning: orange */
.e-radio-wrapper.e-warning .e-radio:checked + .e-label::before {
  background-color: #ff9800;
  border-color: #ff9800;
}

/* e-danger: red */
.e-radio-wrapper.e-danger .e-radio:checked + .e-label::before {
  background-color: #f44336;
  border-color: #f44336;
}
```



> **Tip:** Multiple classes can be applied using space separation: `cssClass: 'e-small e-primary'`.
