# How-To Recipes – Syncfusion TypeScript NumericTextBox

## Table of Contents
- [Customize Spin Button Up/Down Arrow Icons](#customize-spin-button-updown-arrow-icons)
- [Customize Step Value and Hide Spin Buttons](#customize-step-value-and-hide-spin-buttons)
- [Customize UI Appearance with cssClass](#customize-ui-appearance-with-cssclass)
- [Maintain Trailing Zeros While Focused](#maintain-trailing-zeros-while-focused)
- [Perform Custom Validation Using FormValidator](#perform-custom-validation-using-formvalidator)
- [Prevent Nullable Input](#prevent-nullable-input)

---

## Customize Spin Button Up/Down Arrow Icons

Override the `e-spin-up` and `e-spin-down` icon glyphs using CSS `::before` pseudo-elements. No TypeScript changes are needed.

```css
.e-numeric .e-input-group-icon.e-spin-up:before {
  content: "\e823";
  color: rgba(0, 0, 0, 0.54);
}

.e-numeric .e-input-group-icon.e-spin-down:before {
  content: "\e934";
  color: rgba(0, 0, 0, 0.54);
}
```

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  value: 10
});

numeric.appendTo('#numeric');
```

---

## Customize Step Value and Hide Spin Buttons

Set `step` to control the increment/decrement amount per spin click. Set `showSpinButton: false` to hide the spin buttons entirely (useful when you want keyboard-only or custom icon controls).

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  step: 2,              // increment/decrement by 2 per click
  showSpinButton: false, // hide the spin buttons
  min: 10,
  max: 100,
  value: 16
});

numeric.appendTo('#numeric');
```

---

## Customize UI Appearance with cssClass

Add a custom CSS class via the `cssClass` property and define scoped styles to override the default look.

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

```css
/* Custom styles scoped to .e-style */
.e-style.e-control-wrapper.e-numeric {
  border-color: #6200ee;
  background: #f3e5f5;
}
```

---

## Maintain Trailing Zeros While Focused

By default, trailing zeros disappear when the NumericTextBox receives focus. To preserve them, use the `formattedValue` method inside a focus event handler combined with the `change` event.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

// Format value with trailing zeros on focus
function numericFocus(this: any): void {
  const numericObj = this.ej2_instances ? this.ej2_instances[0] : this;
  numericObj.element.value = numericObj.formattedValue(numericObj.decimals, +numericObj.element.value);
}

let numeric: NumericTextBox = new NumericTextBox({
  value: 10,
  decimals: 2,
  format: 'n2',
  placeholder: 'NumericTextbox',
  floatLabelType: 'Always',
  change: numericFocus
});

numeric.appendTo('#numeric');
document.getElementById('numeric').addEventListener('focus', numericFocus);
```

**How it works:** On focus, `formattedValue(decimals, value)` is called to reformat the raw input value with the specified number of decimal places, keeping trailing zeros visible.

---

## Perform Custom Validation Using FormValidator

Integrate NumericTextBox with the EJ2 `FormValidator` to apply custom validation rules and display inline error messages.

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

let numeric: NumericTextBox = new NumericTextBox({
  min: 10,
  max: 100,
  strictMode: false,
  placeholder: 'NumericTextbox',
  floatLabelType: 'Always',
  change: function () {
    if (numeric.value != null) {
      formObject.validate('numericRange');
    }
  }
});
numeric.appendTo('#numeric1');

let button: Button = new Button();
button.appendTo('#submit_btn');

// Custom validation function
const customFn = (args: { [key: string]: string }): boolean => {
  return numeric.value >= 10 && numeric.value <= 100;
};

// FormValidator setup
const options: FormValidatorModel = {
  rules: {
    'numericRange': { required: [true, 'Number is required'] }
  }
};
let formObject: FormValidator = new FormValidator('#form-element', options);
formObject.addRules('numericRange', {
  range: [customFn, 'Please enter a number between 10 and 100']
});

// Place error label outside the NumericTextBox wrapper
formObject.customPlacement = (element: HTMLElement, error: HTMLElement) => {
  element.parentNode.parentNode.appendChild(error);
};

document.getElementById('submit_btn').onclick = () => {
  formObject.validate('numericRange');
  const ele = document.getElementById('numeric1') as HTMLInputElement;
  if (ele.value !== '' && Number(ele.value) >= 10 && Number(ele.value) <= 100) {
    alert('Submitted');
  }
};
```

**Key points:**
- Import `FormValidator` and `FormValidatorModel` from `@syncfusion/ej2-inputs`.
- Use `addRules` to append custom validation rules after initial setup.
- Use `customPlacement` to control where error labels are injected into the DOM.
- Trigger `formObject.validate('fieldName')` on `change` for live validation feedback.

---

## Prevent Nullable Input

By default, an empty NumericTextBox has `value = null`. To prevent null and default to `0`, handle both the `created` event (for initialization) and the `blur` event (when the user clears the field).

```ts
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let numeric: NumericTextBox = new NumericTextBox({
  placeholder: 'NumericTextbox',
  floatLabelType: 'Always',
  created: function () {
    // Set default value of 0 if no value provided at creation
    if (this.value == null) {
      this.value = 0;
    }
  },
  blur: function (args) {
    // Prevent null when user clears the field
    if (args.value == null) {
      numeric.value = 0;
    }
  }
});

numeric.appendTo('#numeric1');
```

**Key points:**
- The `created` event fires once after the component renders. Use it to set an initial default.
- The `blur` event fires when focus leaves the component. `args.value` is `null` if the field was cleared.
- Use `this.value` inside `created` (arrow functions lose `this` context here, so use `function()`).
