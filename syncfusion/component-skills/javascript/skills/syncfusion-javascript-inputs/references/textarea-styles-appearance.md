# Styles and Appearance in TextArea

## Table of Contents
- [Sizing Classes](#sizing-classes)
- [Filled and Outline Modes](#filled-and-outline-modes)
- [Custom Styling with cssClass](#custom-styling-with-cssclass)
- [Disabled State](#disabled-state)
- [Read-Only TextArea](#read-only-textarea)
- [Rounded Corners](#rounded-corners)
- [Clear Button and Static Clear](#clear-button-and-static-clear)
- [Background and Text Color Customization](#background-and-text-color-customization)
- [Floating Label Color for Validation States](#floating-label-color-for-validation-states)
- [Mandatory Asterisk on Placeholder](#mandatory-asterisk-on-placeholder)

---

## Sizing Classes

Adjust TextArea size by adding classes to the element or its container:

| Class | Effect |
|---|---|
| `e-small` | Renders a smaller-sized TextArea |
| `e-bigger` | Renders a larger-sized TextArea |

Apply via the `cssClass` property:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let smallTextarea: TextArea = new TextArea({
    placeholder: 'Small textarea',
    cssClass: 'e-small'
});
smallTextarea.appendTo('#default');
```

Or apply directly on the container element in HTML:

```html
<div class="e-bigger">
    <textarea id="default"></textarea>
</div>
```

---

## Filled and Outline Modes

Use `e-filled` or `e-outline` in the `cssClass` property to switch visual modes:

> **Note:** Filled and Outline modes are only available with **Material** themes.

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

// Filled mode
let filledTextarea: TextArea = new TextArea({
    placeholder: 'Filled',
    cssClass: 'e-filled',
    floatLabelType: 'Auto'
});
filledTextarea.appendTo('#filled');

// Outline mode
let outlineTextarea: TextArea = new TextArea({
    placeholder: 'Outlined',
    cssClass: 'e-outline',
    floatLabelType: 'Auto'
});
outlineTextarea.appendTo('#outlined');
```

---

## Custom Styling with cssClass

The `cssClass` property adds a custom CSS class to the TextArea wrapper, enabling full control over appearance:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    cssClass: 'custom-textarea',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

Then define `.custom-textarea` styles in your CSS:

```css
.custom-textarea .e-textarea {
    border-color: #4a90e2;
    border-radius: 8px;
}
```

---

## Disabled State

Set `enabled: false` to prevent all user interaction:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    value: 'This content is read-only',
    enabled: false
});
textareaObj.appendTo('#default');
```

---

## Read-Only TextArea

Set `readonly: true` to display content that users cannot edit (but can still select/copy):

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    value: 'Readonly content',
    readonly: true
});
textareaObj.appendTo('#default');
```

**Disabled vs Read-only:**
- `enabled: false` — visually disabled, no interaction, value excluded from form submission.
- `readonly: true` — visually normal, not editable, value IS included in form submission.

---

## Rounded Corners

Add the `e-corner` class to the input parent element in HTML for rounded corners. This is visible only in box model inputs:

```html
<div class="e-input-group e-corner">
    <textarea class="e-input" placeholder="Enter your comments"></textarea>
</div>
```

---

## Clear Button and Static Clear

Show a clear button inside the TextArea using `showClearButton`:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    showClearButton: true
});
textareaObj.appendTo('#default');
```

To make the clear button always visible (even when the TextArea is not focused), add `e-static-clear` to `cssClass`:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    showClearButton: true,
    cssClass: 'e-static-clear'
});
textareaObj.appendTo('#default');
```

---

## Background and Text Color Customization

Override default styles via CSS to customize background color, text color, and border:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```

```css
/* Custom background and text color */
#default {
    background-color: #f0f4ff;
    color: #333;
}
```

---

## Floating Label Color for Validation States

Change the floating label color for success or warning states using CSS:

```css
/* Success state */
.e-float-input.e-success label.e-float-text,
.e-float-input.e-success input:focus ~ label.e-float-text,
.e-float-input.e-success input:valid ~ label.e-float-text {
    color: #22b24b;
}

/* Warning state */
.e-float-input.e-warning label.e-float-text,
.e-float-input.e-warning input:focus ~ label.e-float-text,
.e-float-input.e-warning input:valid ~ label.e-float-text {
    color: #ffca1c;
}
```

Apply the state class via `cssClass`:

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

// Success state
let successTextarea: TextArea = new TextArea({
    placeholder: 'Valid feedback',
    cssClass: 'e-success',
    floatLabelType: 'Auto'
});
successTextarea.appendTo('#default1');

// Warning state
let warningTextarea: TextArea = new TextArea({
    placeholder: 'Review needed',
    cssClass: 'e-warning',
    floatLabelType: 'Auto'
});
warningTextarea.appendTo('#default2');
```

---

## Mandatory Asterisk on Placeholder

Add a required asterisk after the floating label using CSS:

```css
/* Add asterisk after float label */
.e-float-input.e-control-wrapper .e-float-text::after {
    content: '*';
    color: red;
}
```

```typescript
import { TextArea } from '@syncfusion/ej2-inputs';

let textareaObj: TextArea = new TextArea({
    placeholder: 'Enter your comments',
    floatLabelType: 'Auto'
});
textareaObj.appendTo('#default');
```
