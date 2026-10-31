# API Reference — Syncfusion Angular CheckBox

Full API reference for the `ejs-checkbox` component from `@syncfusion/ej2-angular-buttons`.

**Source:** [Official API Documentation](https://ej2.syncfusion.com/angular/documentation/api/check-box/index-default)

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [ChangeEventArgs Interface](#changeeventargs-interface)
- [Quick Reference Table](#quick-reference-table)

---

## Import

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
```

---

## Properties

### checked
**Type:** `boolean` | **Default:** `false`

Specifies whether the CheckBox is in the checked state. When `true`, a tick mark appears in the checkbox frame.

```html
<ejs-checkbox label="Option" [checked]="true"></ejs-checkbox>
```

---

### cssClass
**Type:** `string` | **Default:** `''`

Defines one or more CSS class names (space-separated) applied to the CheckBox element. Use this to add custom styles or size variants.

```html
<!-- Small size -->
<ejs-checkbox label="Small" cssClass="e-small"></ejs-checkbox>

<!-- Multiple classes -->
<ejs-checkbox label="Custom" cssClass="e-primary e-small"></ejs-checkbox>
```

Common built-in value: `'e-small'` (small size)

---

### disabled
**Type:** `boolean` | **Default:** `false`

Specifies whether the CheckBox is in the disabled state. When `true`, the checkbox is non-interactive and visually dimmed. Disabled checkboxes are **not submitted** in form data.

```html
<ejs-checkbox label="Disabled" [disabled]="true"></ejs-checkbox>
```

---

### enableHtmlSanitizer
**Type:** `boolean` | **Default:** `true`

Specifies whether to sanitize untrusted HTML strings before rendering them in the CheckBox (e.g., HTML in the `label` property). When `true`, suspected scripts and unsafe HTML are sanitized. Set to `false` only for trusted, controlled content.

```html
<ejs-checkbox label="<b>Bold Label</b>" [enableHtmlSanitizer]="false"></ejs-checkbox>
```

---

### enablePersistence
**Type:** `boolean` | **Default:** `false`

Enables persisting the component's state (checked/unchecked) between page reloads using browser `localStorage`.

```html
<ejs-checkbox label="Remember Me" [enablePersistence]="true"></ejs-checkbox>
```

---

### enableRtl
**Type:** `boolean` | **Default:** `false`

Enables right-to-left rendering of the CheckBox component. When `true`, the layout mirrors horizontally for RTL locales (Arabic, Hebrew, etc.).

```html
<ejs-checkbox label="خيار" [enableRtl]="true"></ejs-checkbox>
```

---

### htmlAttributes
**Type:** `{ [key: string]: string }` | **Default:** `{}`

Adds additional HTML attributes to the underlying `<input>` element. If the same attribute is set both via `htmlAttributes` and a direct property, the **property value takes precedence**.

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-checkbox label="Required" [htmlAttributes]="attrs"></ejs-checkbox>`
})
export class AppComponent {
  public attrs: { [key: string]: string } = {
    required: 'required',
    'data-id': 'cb-001'
  };
}
```

---

### indeterminate
**Type:** `boolean` | **Default:** `false`

Specifies whether the CheckBox is in the indeterminate state. When `true`, neither fully checked nor unchecked — visually shows a dash. **Cannot be set by user interaction; must be set programmatically.**

```html
<ejs-checkbox label="Select All" [indeterminate]="true"></ejs-checkbox>
```

---

### label
**Type:** `string` | **Default:** `''`

Defines the caption text displayed next to the CheckBox, describing its purpose. Eliminates the need for a separate `<label>` HTML element.

```html
<ejs-checkbox label="Accept Terms and Conditions"></ejs-checkbox>
```

---

### labelPosition
**Type:** `'Before' | 'After'` | **Default:** `'After'`

Controls the position of the label relative to the checkbox frame.

- `'After'` — Label appears to the **right** of the checkbox (default)
- `'Before'` — Label appears to the **left** of the checkbox

```html
<ejs-checkbox label="Label on Left" labelPosition="Before"></ejs-checkbox>
<ejs-checkbox label="Label on Right" labelPosition="After"></ejs-checkbox>
```

---

### locale
**Type:** `string` | **Default:** `''`

Overrides the global culture and localization value for this component. When empty, inherits the global culture (`'en-US'`).

```html
<ejs-checkbox label="Option" locale="fr-FR"></ejs-checkbox>
```

---

### name
**Type:** `string` | **Default:** `''`

Defines the `name` attribute for the checkbox `<input>` element. Used to group checkboxes in a form and to reference submitted data by name. Only checked, non-disabled checkboxes with a `name` send their `value` on form submit.

```html
<ejs-checkbox name="hobbies" value="reading" label="Reading"></ejs-checkbox>
```

---

### value
**Type:** `string` | **Default:** `''`

Defines the `value` attribute for the checkbox `<input>` element. This value is submitted as form data when the checkbox is checked.

```html
<ejs-checkbox name="hobbies" value="reading" label="Reading" [checked]="true"></ejs-checkbox>
```

---

## Methods

Access methods via Angular's `@ViewChild`:

```typescript
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-checkbox #cb label="Option"></ejs-checkbox>`
})
export class AppComponent {
  @ViewChild('cb') public checkbox!: CheckBoxComponent;
}
```

### click()
**Returns:** `void`

Programmatically triggers a click on the CheckBox element (native method). Toggles the checked state as if the user clicked it.

```typescript
this.checkbox.click();
```

---

### destroy()
**Returns:** `void`

Destroys the CheckBox component and cleans up event listeners and DOM modifications.

```typescript
this.checkbox.destroy();
```

---

### focusIn()
**Returns:** `void`

Sets focus to the CheckBox element (native method). Useful for programmatic focus management in forms.

```typescript
this.checkbox.focusIn();
```

---

## Events

### change
**Type:** `EmitType<ChangeEventArgs>`

Triggers when the CheckBox state is changed by **user interaction** (click or Space key). Provides a `ChangeEventArgs` object.

```typescript
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-checkbox label="Toggle" (change)="onChange($event)"></ejs-checkbox>`
})
export class AppComponent {
  onChange(args: ChangeEventArgs): void {
    console.log('New checked state:', args.checked);
  }
}
```

---

### created
**Type:** `EmitType<Event>`

Triggers once the component has finished rendering. Use this for post-render initialization logic.

```typescript
@Component({
  imports: [CheckBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-checkbox label="Option" (created)="onCreated()"></ejs-checkbox>`
})
export class AppComponent {
  onCreated(): void {
    console.log('CheckBox component rendered');
  }
}
```

---

## ChangeEventArgs Interface

The `change` event callback receives a `ChangeEventArgs` object:

| Property | Type | Description |
|----------|------|-------------|
| `checked` | `boolean` | The new checked state after the change |
| `event` | `Event` | The original DOM event |

```typescript
onChange(args: ChangeEventArgs): void {
  if (args.checked) {
    console.log('Checkbox is now checked');
  } else {
    console.log('Checkbox is now unchecked');
  }
}
```

---

## Quick Reference Table

| API | Type | Default | Category |
|-----|------|---------|----------|
| `checked` | `boolean` | `false` | Property |
| `cssClass` | `string` | `''` | Property |
| `disabled` | `boolean` | `false` | Property |
| `enableHtmlSanitizer` | `boolean` | `true` | Property |
| `enablePersistence` | `boolean` | `false` | Property |
| `enableRtl` | `boolean` | `false` | Property |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Property |
| `indeterminate` | `boolean` | `false` | Property |
| `label` | `string` | `''` | Property |
| `labelPosition` | `'Before' \| 'After'` | `'After'` | Property |
| `locale` | `string` | `''` | Property |
| `name` | `string` | `''` | Property |
| `value` | `string` | `''` | Property |
| `click()` | `void` | — | Method |
| `destroy()` | `void` | — | Method |
| `focusIn()` | `void` | — | Method |
| `change` | `ChangeEventArgs` | — | Event |
| `created` | `Event` | — | Event |
