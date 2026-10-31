# API Reference — Syncfusion Angular Switch

> **Source:** [https://ej2.syncfusion.com/angular/documentation/api/switch/index-default](https://ej2.syncfusion.com/angular/documentation/api/switch/index-default)
>
> Component selector: `<ejs-switch></ejs-switch>`

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Interfaces](#event-argument-interfaces)

---

## Properties

### checked
```typescript
checked: boolean
```
Specifies whether the Switch is in a checked (ON) state.
- **Default:** `false`
- **Usage:** `<ejs-switch [checked]="true"></ejs-switch>`

---

### cssClass
```typescript
cssClass: string
```
Adds custom CSS classes to the Switch root element for styling customization.
- **Default:** `''`
- **Usage:** `<ejs-switch cssClass="e-small my-class"></ejs-switch>`
- Use `'e-small'` for the small size variant.

---

### disabled
```typescript
disabled: boolean
```
When `true`, the Switch is rendered in a disabled (non-interactive) state.
- **Default:** `false`
- **Usage:** `<ejs-switch [disabled]="true"></ejs-switch>`
- Disabled Switches do not submit their value in form POSTs.

---

### enablePersistence
```typescript
enablePersistence: boolean
```
When `true`, persists the Switch's checked state across page reloads using browser local storage.
- **Default:** `false`
- **Usage:** `<ejs-switch [enablePersistence]="true"></ejs-switch>`
- Assign an explicit `id` attribute to ensure reliable state persistence.

---

### enableRtl
```typescript
enableRtl: boolean
```
Enables right-to-left rendering of the component. The Switch bar and handle are visually mirrored.
- **Default:** `false`
- **Usage:** `<ejs-switch [enableRtl]="true"></ejs-switch>`

---

### htmlAttributes
```typescript
htmlAttributes: { [key: string]: string }
```
Passes additional HTML attributes (e.g., `aria-label`, `data-*`, `tabindex`) to the underlying `<input>` element.
- **Default:** `{}`
- **Usage:**
  ```html
  <ejs-switch [htmlAttributes]="{'aria-label': 'Wi-Fi toggle', 'data-id': 'wifi'}"></ejs-switch>
  ```
- If both `htmlAttributes` and a dedicated property (e.g., `disabled`) set the same attribute, the **component property takes precedence**.

---

### locale
```typescript
locale: string
```
Overrides the global culture/localization value for this component instance.
- **Default:** `'en-US'`
- **Usage:** `<ejs-switch locale="fr-FR"></ejs-switch>`

---

### name
```typescript
name: string
```
Defines the `name` attribute for the Switch's underlying `<input>` element. Used as the form field key on form submission.
- **Default:** `''`
- **Usage:** `<ejs-switch name="wifi"></ejs-switch>`
- Only checked, non-disabled Switches submit their `name`/`value` pair on form submit.

---

### offLabel
```typescript
offLabel: string
```
Specifies the text label displayed inside the Switch bar when it is in the unchecked (OFF) state.
- **Default:** `''`
- **Usage:** `<ejs-switch offLabel="OFF"></ejs-switch>`
- **Note:** Labels are not shown in Material themes. Long text will be clipped.

---

### onLabel
```typescript
onLabel: string
```
Specifies the text label displayed inside the Switch bar when it is in the checked (ON) state.
- **Default:** `''`
- **Usage:** `<ejs-switch onLabel="ON"></ejs-switch>`
- **Note:** Labels are not shown in Material themes. Long text will be clipped.

---

### value
```typescript
value: string
```
Defines the `value` attribute for the Switch's underlying `<input>` element. This value is submitted to the server as form data when the Switch is checked.
- **Default:** `''`
- **Usage:** `<ejs-switch name="wifi" value="enabled"></ejs-switch>`
- Unchecked or disabled Switch values are **not** submitted.

---

## Methods

### toggle()
```typescript
toggle(): void
```
Toggles the Switch state between checked and unchecked programmatically.
- Fires the `change` event after toggling.
- Use `beforeChange` to intercept and cancel if needed.

```typescript
@ViewChild('sw') sw!: SwitchComponent;
this.sw.toggle();
```

---

### click()
```typescript
click(): void
```
Simulates a native DOM click on the Switch element.
- Flips the checked state via a click event.
- Prefer `toggle()` for most programmatic use cases.

```typescript
this.sw.click();
```

---

### focusIn()
```typescript
focusIn(): void
```
Sets keyboard focus to the Switch element.
- After calling `focusIn()`, the user can press `Space` to toggle.

```typescript
this.sw.focusIn();
```

---

### destroy()
```typescript
destroy(): void
```
Destroys the Switch widget — removes event listeners, cleans up DOM references, and releases memory.
- Angular handles destruction automatically via `ngOnDestroy`. Only call this explicitly in non-Angular contexts.

```typescript
this.sw.destroy();
```

---

## Events

### change
```typescript
change: EmitType<ChangeEventArgs>
```
Fires when the Switch state is changed by **user interaction** or a programmatic `toggle()` / `click()` call.

```html
<ejs-switch (change)="onChange($event)"></ejs-switch>
```

```typescript
onChange(args: ChangeEventArgs): void {
  console.log('New state:', args.checked);
}
```

---

### beforeChange
```typescript
beforeChange: EmitType<BeforeChangeEventArgs>
```
Fires **before** the Switch state is changed. Set `args.cancel = true` to prevent the state change from being applied.

```html
<ejs-switch (beforeChange)="onBeforeChange($event)"></ejs-switch>
```

```typescript
onBeforeChange(args: BeforeChangeEventArgs): void {
  if (!this.allowToggle) {
    args.cancel = true;
  }
}
```

---

### created
```typescript
created: EmitType<Event>
```
Fires once after the Switch component has finished rendering. Safe to call methods like `toggle()` and `focusIn()` from this handler.

```html
<ejs-switch (created)="onCreated($event)"></ejs-switch>
```

```typescript
onCreated(event: Event): void {
  console.log('Switch is ready');
}
```

---

## Event Argument Interfaces

### ChangeEventArgs
```typescript
interface ChangeEventArgs {
  checked: boolean;  // The new checked state after the change
  event: Event;      // The native DOM event that triggered the change
}
```

### BeforeChangeEventArgs
```typescript
interface BeforeChangeEventArgs {
  checked: boolean;  // The state the switch is attempting to change to
  cancel: boolean;   // Set to true to prevent the state change
  event: Event;      // The native DOM event
}
```

---

## Full Usage Summary

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  SwitchModule,
  SwitchComponent,
  ChangeEventArgs,
  BeforeChangeEventArgs
} from '@syncfusion/ej2-angular-buttons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [SwitchModule, FormsModule],
  selector: 'app-root',
  template: `
    <ejs-switch
      #sw
      name="feature"
      value="enabled"
      [checked]="isOn"
      [disabled]="isDisabled"
      [enableRtl]="false"
      [enablePersistence]="true"
      [cssClass]="'e-small'"
      onLabel="ON"
      offLabel="OFF"
      [htmlAttributes]="{'aria-label': 'Feature toggle'}"
      [(ngModel)]="isOn"
      (change)="onChange($event)"
      (beforeChange)="onBeforeChange($event)"
      (created)="onCreated($event)">
    </ejs-switch>
  `
})
export class AppComponent {
  @ViewChild('sw') sw!: SwitchComponent;

  isOn = true;
  isDisabled = false;

  onChange(args: ChangeEventArgs): void {
    console.log('Checked:', args.checked);
  }

  onBeforeChange(args: BeforeChangeEventArgs): void {
    // args.cancel = true; // Uncomment to prevent change
  }

  onCreated(event: Event): void {
    console.log('Ready');
  }
}
```
