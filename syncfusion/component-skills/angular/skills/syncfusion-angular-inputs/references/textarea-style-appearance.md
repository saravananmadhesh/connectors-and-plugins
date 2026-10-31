# Style & Appearance — Syncfusion Angular TextArea

## Table of Contents
- [Size Variants](#size-variants)
- [Filled and Outline Modes](#filled-and-outline-modes)
- [Custom CSS with cssClass](#custom-css-with-cssclass)
- [Disabled State](#disabled-state)
- [Read-Only State](#read-only-state)
- [Clear Button](#clear-button)
- [Static Clear Button](#static-clear-button)
- [Rounded Corners](#rounded-corners)
- [RTL Support](#rtl-support)
- [Custom Background and Text Color](#custom-background-and-text-color)
- [Floating Label Color for Validation States](#floating-label-color-for-validation-states)
- [Mandatory Asterisk on Placeholder](#mandatory-asterisk-on-placeholder)

---

## Size Variants

Apply CSS classes via `cssClass` to adjust the TextArea size:

| Class | Result |
|---|---|
| `e-small` | Smaller-sized TextArea |
| `e-bigger` | Larger-sized TextArea |

```html
<!-- Small -->
<ejs-textarea id="small" cssClass="e-small" placeholder="Small textarea"></ejs-textarea>

<!-- Bigger -->
<ejs-textarea id="big" cssClass="e-bigger" placeholder="Bigger textarea"></ejs-textarea>
```

---

## Filled and Outline Modes

Apply `e-filled` or `e-outline` via `cssClass` to switch the visual appearance:

```html
<!-- Filled mode -->
<ejs-textarea id="filled" cssClass="e-filled" placeholder="Filled" floatLabelType="Auto"></ejs-textarea>

<!-- Outline mode -->
<ejs-textarea id="outline" cssClass="e-outline" placeholder="Outline" floatLabelType="Auto"></ejs-textarea>
```

> **Note:** Filled and Outline modes are available **only with Material themes** (`material.css`, `material3.css`). They have no effect with Bootstrap or Fabric themes.

---

## Custom CSS with cssClass

Use `cssClass` to attach your own CSS class to the TextArea wrapper element. This enables full control over borders, padding, backgrounds, and more:

```html
<ejs-textarea id="custom" cssClass="my-textarea" placeholder="Custom styled"></ejs-textarea>
```

```css
/* Component styles */
.my-textarea .e-textarea {
  border: 2px solid #6200ea;
  border-radius: 8px;
  padding: 8px;
}

.my-textarea .e-textarea:focus {
  border-color: #3700b3;
  box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.2);
}
```

---

## Disabled State

Set `enabled` to `false` to prevent user interaction. The textarea renders as grayed out and non-editable:

```html
<ejs-textarea id="disabled" [enabled]="false" value="This content is read-only"></ejs-textarea>
```

Or bind dynamically:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea id="dynamic" [enabled]="isEnabled" value="Controlled state"></ejs-textarea>
    <button (click)="toggle()">Toggle</button>
  `
})
export class App {
  isEnabled = true;
  toggle() { this.isEnabled = !this.isEnabled; }
}
```

---

## Read-Only State

Set `readonly` to `true` to display the content but prevent editing. Unlike `disabled`, read-only textareas are still focusable and selectable:

```html
<ejs-textarea id="readonly" [readonly]="true" value="Read-only content"></ejs-textarea>
```

> **`disabled` vs `readonly`:**
> - `enabled: false` — not focusable, visually dimmed, excluded from form submission
> - `readonly: true` — focusable, text selectable, included in form submission

---

## Clear Button

Show a clear button (×) that appears when the textarea has a value by setting `showClearButton` to `true`:

```html
<ejs-textarea id="clearable" [showClearButton]="true" placeholder="Type to see clear button"></ejs-textarea>
```

The clear button appears on hover/focus when the textarea has content.

---

## Static Clear Button

To show the clear button **always** (even without focus), add `e-static-clear` to `cssClass`:

```html
<ejs-textarea
  id="static-clear"
  cssClass="e-static-clear"
  [showClearButton]="true"
  placeholder="Always shows clear button">
</ejs-textarea>
```

---

## Rounded Corners

Add the `e-corner` CSS class directly to the input group container for rounded corners. This applies only in box model mode:

```html
<div class="e-input-group e-corner">
  <textarea class="e-input" placeholder="Rounded corners textarea"></textarea>
</div>
```

> **Note:** Rounded corners are visible **only in box model** textarea components.

---

## RTL Support

Enable right-to-left layout using `enableRtl`:

```html
<ejs-textarea id="rtl" [enableRtl]="true" placeholder="نص هنا" [rows]="4"></ejs-textarea>
```

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="rtl" [enableRtl]="true" placeholder="أدخل النص" [rows]="4"></ejs-textarea>`
})
export class App {}
```

---

## Custom Background and Text Color

Override styles using CSS targeting the inner `.e-textarea` element:

```html
<ejs-textarea id="colored" cssClass="custom-colors" placeholder="Custom colors" [rows]="4"></ejs-textarea>
```

```css
.custom-colors .e-textarea {
  background-color: #e8f5e9;
  color: #1b5e20;
  border-color: #4caf50;
}

.custom-colors .e-textarea:focus {
  background-color: #f1f8e9;
  border-color: #2e7d32;
}
```

---

## Floating Label Color for Validation States

Customize the floating label color for success and warning validation states:

```css
/* Success state */
.e-float-input.e-success label.e-float-text,
.e-float-input.e-success textarea:focus ~ label.e-float-text,
.e-float-input.e-success textarea:valid ~ label.e-float-text {
  color: #22b24b;
}

/* Warning state */
.e-float-input.e-warning label.e-float-text,
.e-float-input.e-warning textarea:focus ~ label.e-float-text,
.e-float-input.e-warning textarea:valid ~ label.e-float-text {
  color: #ffca1c;
}
```

Apply by adding the state class to the parent container:

```html
<div class="e-float-input e-success">
  <ejs-textarea id="success" floatLabelType="Auto" placeholder="Valid input"></ejs-textarea>
</div>
```

---

## Mandatory Asterisk on Placeholder

To append a red asterisk to the floating label placeholder, use CSS:

```css
/* Adds asterisk after the float label text */
.e-float-input.e-control-wrapper .e-float-text::after {
  content: ' *';
  color: red;
}
```

```html
<ejs-textarea
  id="required-field"
  cssClass="e-float-input e-control-wrapper"
  floatLabelType="Auto"
  placeholder="Description">
</ejs-textarea>
```
