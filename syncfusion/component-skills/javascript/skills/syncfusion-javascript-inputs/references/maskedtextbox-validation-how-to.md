# Validation and How-To — Syncfusion TypeScript MaskedTextBox

## Table of Contents
- [FormValidator Integration](#formvalidator-integration)
- [Checking for Complete Input](#checking-for-complete-input)
- [Numeric Keypad on Mobile](#numeric-keypad-on-mobile)
- [Accessibility](#accessibility)

---

## FormValidator Integration

Use `FormValidator` from `@syncfusion/ej2-inputs` alongside the MaskedTextBox to enforce validation rules.

### Custom validation: mobile number length

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

// Initialize MaskedTextBox
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    placeholder: 'Mobile Number',
    floatLabelType: 'Always'
});
mask.appendTo('#mask1');

// Initialize submit button
let button: Button = new Button();
button.appendTo('#submit_btn');

// Custom rule: value must be 10 digits when present
let customFn = (args: { [key: string]: string }) => {
    let len: number = args.element.ej2_instances[0].value.length;
    if (len !== 0) {
        return len >= 10;
    }
    return true;   // empty is allowed (use 'required' rule separately if needed)
};

// Custom rule for empty check
let customEmpty = (args: { [key: string]: string }) => {
    let len: number = args.element.ej2_instances[0].value.length;
    return len === 0 ? 0 : len;
};

// FormValidator rules
let options: FormValidatorModel = {
    rules: {
        'mask_value': {
            numberValue: [customFn, 'Enter a valid mobile number']
        }
    }
};

let formObject: FormValidator = new FormValidator('#form-element', options);
formObject.addRules('mask_value', {
    maxLength: [customEmpty, 'Please enter a mobile number']
});

// Place error label outside MaskedTextBox wrapper
formObject.customPlacement = (element: HTMLElement, error: HTMLElement) => {
    document.querySelector('.form-group').appendChild(error);
};

// Validate on submit
document.getElementById('submit_btn').addEventListener('click', () => {
    formObject.validate('mask_value');
    let inputEl = document.getElementById('mask1') as HTMLInputElement;
    if (inputEl.value !== '' && inputEl.value.indexOf(mask.promptChar) === -1) {
        alert('Submitted successfully');
    }
});
```

**HTML structure needed:**

```html
<form id="form-element">
    <div class="form-group">
        <input id="mask1" name="mask_value" type="text" />
    </div>
    <button id="submit_btn">Submit</button>
</form>
```

**Key patterns for FormValidator + MaskedTextBox:**
- Access the MaskedTextBox instance via `args.element.ej2_instances[0]`
- Use `.value` on the instance (not the DOM element) for the raw unmasked value
- Use `promptChar` to detect incomplete input: `inputEl.value.indexOf(mask.promptChar) === -1`

---

## Checking for Complete Input

Detect whether the user has filled all required positions:

```typescript
// Check via getMaskedValue — no prompt chars means fully filled
const isComplete = mask.getMaskedValue().indexOf(mask.promptChar) === -1;

// Check both non-empty and complete
const isValidInput = mask.value && mask.value.length > 0 && isComplete;
```

**In a submit handler:**

```typescript
document.getElementById('submit').addEventListener('click', () => {
    const maskedDisplay = mask.getMaskedValue();
    if (mask.value && maskedDisplay.indexOf(mask.promptChar) === -1) {
        console.log('Valid input:', mask.value);
        // proceed with form submission
    } else {
        console.log('Incomplete input — show error');
    }
});
```

---

## Numeric Keypad on Mobile

By default, MaskedTextBox shows an alphanumeric keyboard on mobile. For number-only inputs, trigger the telephone numeric keypad using `htmlAttributes`:

```typescript
import { MaskedTextBox } from '@syncfusion/ej2-inputs';

let mask: MaskedTextBox = new MaskedTextBox({
    mask: '999-99999',
    value: '342-45432',
    htmlAttributes: { type: 'tel' }   // numeric keypad on mobile
});
mask.appendTo('#mask');
```

> Setting `type: 'tel'` does not change validation behavior — the mask still controls what characters are accepted. It only hints to the device to show a number pad.

---

## Accessibility

The MaskedTextBox is fully accessible and supports WCAG 2.2, Section 508, and WAI-ARIA standards.

### ARIA Attributes

The component automatically applies these ARIA attributes:

| Attribute | Purpose |
|---|---|
| `role="textbox"` | Identifies the element as a text input |
| `aria-live` | Priority of live region updates |
| `aria-disabled` | Indicates disabled state |
| `aria-valuenow` | Current value |
| `aria-invalid` | Marks input as invalid when applicable |
| `aria-placeholder` | Hint text when no value entered |
| `aria-labelledby` | Links to the floating label element |

### Accessibility compliance

- ✅ WCAG 2.2
- ✅ Section 508
- ✅ Screen reader support
- ✅ Right-to-left support
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Mobile device support

### RTL support

```typescript
let mask: MaskedTextBox = new MaskedTextBox({
    mask: '000-000-0000',
    enableRtl: true
});
mask.appendTo('#mask');
```

### Keyboard navigation

- **Tab** / **Shift+Tab**: Move focus in/out
- **Arrow keys**: Move within the input
- **Delete** / **Backspace**: Clear characters (replaced by prompt char)
- The mask enforces valid characters — invalid keystrokes are ignored automatically
