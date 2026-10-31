# API Reference — Syncfusion Angular RadioButton

> **Source:** [https://ej2.syncfusion.com/angular/documentation/api/radio-button/index-default](https://ej2.syncfusion.com/angular/documentation/api/radio-button/index-default)
>
> Component selector: `<ejs-radiobutton></ejs-radiobutton>`

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)
- [Full Usage Summary](#full-usage-summary)

---

## Properties

### checked
```typescript
checked: boolean
```
Specifies whether the RadioButton is in a checked state. When `true`, the RadioButton is selected (an inner circle is rendered inside the button).
- **Default:** `false`
- **Usage:** `<ejs-radiobutton [checked]="true"></ejs-radiobutton>`
- Only one button per `name` group can be checked at a time.

---

### cssClass
```typescript
cssClass: string
```
Adds custom CSS classes to the RadioButton wrapper element for styling customization. Separate multiple classes with spaces.
- **Default:** `''`
- **Usage:** `<ejs-radiobutton cssClass="e-small my-class"></ejs-radiobutton>`
- Use `'e-small'` for the small size variant.

---

### disabled
```typescript
disabled: boolean
```
When `true`, the RadioButton is rendered in a non-interactive, greyed-out state.
- **Default:** `false`
- **Usage:** `<ejs-radiobutton [disabled]="true"></ejs-radiobutton>`
- Disabled RadioButtons — even if checked — do **not** submit their value in forms.

---

### enableHtmlSanitizer
```typescript
enableHtmlSanitizer: boolean
```
When `true`, sanitizes untrusted HTML values in the `label` property before rendering, preventing XSS injection.
- **Default:** `true`
- **Usage:** `<ejs-radiobutton [enableHtmlSanitizer]="false" [label]="trustedHtml"></ejs-radiobutton>`
- Keep `true` in production unless label content is fully controlled.

---

### enablePersistence
```typescript
enablePersistence: boolean
```
When `true`, persists the RadioButton's `checked` state across page reloads using browser local storage.
- **Default:** `false`
- **Usage:** `<ejs-radiobutton id="rb1" [enablePersistence]="true"></ejs-radiobutton>`
- Assign a unique `id` attribute to ensure reliable state persistence.

---

### enableRtl
```typescript
enableRtl: boolean
```
Enables right-to-left rendering of the component. The label and radio circle are visually mirrored.
- **Default:** `false`
- **Usage:** `<ejs-radiobutton [enableRtl]="true"></ejs-radiobutton>`

---

### htmlAttributes
```typescript
htmlAttributes: { [key: string]: string }
```
Passes additional HTML attributes (e.g., `aria-*`, `data-*`, `tabindex`) to the underlying `<input>` element.
- **Default:** `{}`
- **Usage:**
  ```html
  <ejs-radiobutton [htmlAttributes]="{'aria-describedby': 'hint', 'data-id': 'rb1'}"></ejs-radiobutton>
  ```
- If both `htmlAttributes` and a dedicated component property (e.g., `disabled`) address the same attribute, the **component property takes precedence**.

---

### label
```typescript
label: string
```
Defines the caption text displayed alongside the RadioButton. Eliminates the need for a separate `<label>` element.
- **Default:** `''`
- **Usage:** `<ejs-radiobutton label="Option A"></ejs-radiobutton>`

---

### labelPosition
```typescript
labelPosition: RadioLabelPosition
```
Positions the label relative to the RadioButton circle.
- **Values:**
  - `'Before'` — label is placed to the **left** of the RadioButton
  - `'After'` — label is placed to the **right** of the RadioButton
- **Default:** `'After'`
- **Usage:** `<ejs-radiobutton labelPosition="Before"></ejs-radiobutton>`

---

### locale
```typescript
locale: string
```
Overrides the global culture and localization value for this specific component instance.
- **Default:** `''` (inherits global `'en-US'`)
- **Usage:** `<ejs-radiobutton locale="fr-FR"></ejs-radiobutton>`

---

### name
```typescript
name: string
```
Defines the `name` attribute for the RadioButton's underlying `<input>` element. All RadioButtons with the same `name` form a mutually exclusive group.
- **Default:** `''`
- **Usage:** `<ejs-radiobutton name="payment"></ejs-radiobutton>`
- The checked button's `value` is submitted under this `name` key on form submission.

---

### value
```typescript
value: string
```
Defines the `value` attribute for the RadioButton. This value is submitted as form data when the RadioButton is checked and the form is submitted.
- **Default:** `''`
- **Usage:** `<ejs-radiobutton name="payment" value="credit"></ejs-radiobutton>`
- Unchecked and disabled RadioButton values are **not** submitted.

---

## Methods

Access methods via `@ViewChild` reference to `RadioButtonComponent`.

### click()
```typescript
click(): void
```
Simulates a native DOM click on the RadioButton element. If the button is unchecked, this checks it and fires the `change` event.

```typescript
@ViewChild('rb') rb!: RadioButtonComponent;
this.rb.click();
```

---

### destroy()
```typescript
destroy(): void
```
Destroys the RadioButton widget — removes event listeners, cleans up DOM references, and releases memory.
- Angular handles component destruction automatically via `ngOnDestroy`. Call this explicitly only in non-Angular rendering contexts.

```typescript
this.rb.destroy();
```

---

### focusIn()
```typescript
focusIn(): void
```
Sets keyboard focus to the RadioButton element. After focusing, the user can press arrow keys to navigate within the group.

```typescript
this.rb.focusIn();
```

---

### getSelectedValue()
```typescript
getSelectedValue(): string
```
Returns the `value` of the currently selected (checked) RadioButton within the same `name` group.

```typescript
const selected: string = this.rb.getSelectedValue();
console.log('Currently selected:', selected);
```

---

## Events

### change
```typescript
change: EmitType<ChangeArgs>
```
Fires when the RadioButton's checked state is changed by user interaction.

```html
<ejs-radiobutton (change)="onChange($event)"></ejs-radiobutton>
```

```typescript
import { ChangeArgs } from '@syncfusion/ej2-angular-buttons';

onChange(args: ChangeArgs): void {
  console.log('New value:', args.value);   // value of the newly checked button
  console.log('Event:', args.event);       // native DOM event
}
```

---

### created
```typescript
created: EmitType<Event>
```
Fires once after the RadioButton component has finished rendering. Safe to call methods like `focusIn()` or `getSelectedValue()` from this handler.

```html
<ejs-radiobutton (created)="onCreated()"></ejs-radiobutton>
```

```typescript
onCreated(): void {
  console.log('RadioButton is ready');
}
```

---

## Event Argument Interfaces

### ChangeArgs
```typescript
interface ChangeArgs {
  value: string;  // The value attribute of the newly checked RadioButton
  event: Event;   // The native DOM event that triggered the change
}
```

---

## Full Usage Summary

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  RadioButtonModule,
  RadioButtonComponent,
  ChangeArgs
} from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RadioButtonModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-radiobutton
      #rb
      id="rb-credit"
      label="Credit Card"
      name="payment"
      value="credit"
      [checked]="true"
      [disabled]="false"
      [enableRtl]="false"
      [enablePersistence]="false"
      [enableHtmlSanitizer]="true"
      cssClass="e-primary"
      labelPosition="After"
      [htmlAttributes]="{'aria-describedby': 'payment-hint'}"
      [(ngModel)]="selectedPayment"
      (change)="onChange($event)"
      (created)="onCreated()">
    </ejs-radiobutton>

    <ejs-radiobutton
      label="Debit Card"
      name="payment"
      value="debit"
      [(ngModel)]="selectedPayment"
      (change)="onChange($event)">
    </ejs-radiobutton>

    <button (click)="readSelected()">Get Selected</button>
    <p id="payment-hint">Choose your payment method</p>
    <p>Selected: {{ selectedPayment }}</p>
  `
})
export class AppComponent {
  @ViewChild('rb') rb!: RadioButtonComponent;

  selectedPayment = 'credit';

  onChange(args: ChangeArgs): void {
    console.log('Selected payment:', args.value);
  }

  onCreated(): void {
    console.log('RadioButton ready');
  }

  readSelected(): void {
    console.log('Currently selected:', this.rb.getSelectedValue());
  }
}
```
