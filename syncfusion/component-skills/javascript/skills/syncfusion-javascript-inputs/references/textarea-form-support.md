# Form Support in TextArea

## Table of Contents
- [HTML Form Integration](#html-form-integration)
- [FormValidator Integration](#formvalidator-integration)
- [Common Validation Rules](#common-validation-rules)
- [Custom Error Placement](#custom-error-placement)

---

## HTML Form Integration

The TextArea integrates directly with HTML `<form>` elements. When placed inside a form, its value is included in the form's data on submission.

**HTML:**
```html
<form id="myForm" method="post">
    <textarea id="comments" name="comments"></textarea>
    <button type="submit">Submit</button>
</form>
```

**TypeScript:**
```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#comments');
```

The TextArea's `value` is submitted as a form field with the name specified on the `<textarea>` element.

---

## FormValidator Integration

Integrate TextArea with the `FormValidator` component to enforce validation rules on the textarea input.

**HTML:**
```html
<form id="formId">
    <div class="form-group">
        <textarea id="comments" name="comments"></textarea>
    </div>
    <button type="submit">Submit</button>
</form>
```

**TypeScript:**
```typescript
import { TextArea, FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#comments');

// Configure validation rules
let formOptions: FormValidatorModel = {
    rules: {
        comments: {
            required: true,
            minLength: [10, 'Please enter at least 10 characters'],
            maxLength: [500, 'Maximum 500 characters allowed']
        }
    },
    customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
        inputElement.parentElement?.appendChild(errorElement);
    }
};

let formValidator: FormValidator = new FormValidator('#formId', formOptions);
```

---

## Common Validation Rules

| Rule | Example | Description |
|---|---|---|
| Required | `required: true` | Field must not be empty |
| Min length | `minLength: [10, 'Min 10 chars']` | Minimum character count |
| Max length | `maxLength: [500, 'Max 500 chars']` | Maximum character count |
| Regex pattern | `regex: ['^[a-zA-Z ]+$', 'Letters only']` | Pattern matching |

Full example with multiple rules:

```typescript
import { TextArea, FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#comments');

let formOptions: FormValidatorModel = {
    rules: {
        comments: {
            required: [true, 'Comments are required'],
            minLength: [20, 'Please provide more detail (min 20 characters)']
        }
    }
};

let formValidator: FormValidator = new FormValidator('#formId', formOptions);

// Validate on submit
document.getElementById('submitBtn').onclick = function (e: Event) {
    e.preventDefault();
    if (formValidator.validate()) {
        console.log('Form is valid, value:', textareaObj.value);
    }
};
```

---

## Custom Error Placement

By default, error messages are placed after the input element. Use `customPlacement` to control where the error message appears:

```typescript
import { TextArea, FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments'
});
textareaObj.appendTo('#comments');

let formOptions: FormValidatorModel = {
    rules: {
        comments: { required: true }
    },
    customPlacement: (inputElement: HTMLElement, errorElement: HTMLElement) => {
        // Append error message to the input's parent element
        inputElement.parentElement?.appendChild(errorElement);
    }
};

let formValidator: FormValidator = new FormValidator('#formId', formOptions);
```

---

## Notes

- The `name` attribute on the `<textarea>` HTML element is required for `FormValidator` rule mapping and for form submission.
- `FormValidator` is part of `@syncfusion/ej2-inputs` — no separate package is needed.
- `readonly: true` and `enabled: false` affect form behavior: a disabled TextArea's value is **not** submitted with the form; a readonly TextArea's value **is** submitted.
- Use `maxLength` on the TextArea component for client-side length enforcement, and combine with `FormValidator` rules for user-visible error messages.
