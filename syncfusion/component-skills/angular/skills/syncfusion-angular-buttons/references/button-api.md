# API Reference — Syncfusion Angular Button

Source: https://ej2.syncfusion.com/angular/documentation/api/button/index-default

## Table of Contents
- [Import](#import)
- [Directive](#directive)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Usage Examples](#usage-examples)

---

## Import

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
// For ViewChild / programmatic access:
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';
```

---

## Directive

Apply `ejs-button` as an attribute directive on a native `<button>` HTML element:

```html
<button ejs-button>Button</button>
```

---

## Properties

### `content` — `string`

Defines the text content rendered inside the button element.

- **Default:** `""`
- Text can also be placed as inner content of the `<button>` tag. When both inner text and `content` are present, `content` takes precedence.

```html
<button ejs-button content="Save"></button>
<!-- Or via property binding -->
<button ejs-button [content]="buttonLabel"></button>
```

---

### `cssClass` — `string`

Defines one or more CSS classes (space-separated) to apply to the button element. Controls button type, color style, size, and custom appearance.

- **Default:** `""`
- **Built-in values:** `e-primary`, `e-success`, `e-info`, `e-warning`, `e-danger`, `e-link`, `e-flat`, `e-outline`, `e-round`, `e-small`, `e-block`

```html
<button ejs-button cssClass="e-primary">Primary</button>
<button ejs-button cssClass="e-small e-outline">Small Outline</button>
<button ejs-button [cssClass]="dynamicClass">Dynamic</button>
```

---

### `disabled` — `boolean`

Specifies whether the button is disabled. A disabled button is non-interactive, cannot receive focus, and does not fire click events.

- **Default:** `false`

```html
<button ejs-button [disabled]="true">Disabled</button>
<button ejs-button [disabled]="isFormInvalid">Submit</button>
```

---

### `enableHtmlSanitizer` — `boolean`

When `true`, the component sanitizes untrusted HTML strings and scripts in the `content` property before rendering, preventing XSS vulnerabilities.

- **Default:** `true`

```html
<!-- Default (sanitizer on) — safe for user-provided content -->
<button ejs-button [enableHtmlSanitizer]="true" content="<b>Bold</b>"></button>

<!-- Sanitizer off — only use with fully trusted content -->
<button ejs-button [enableHtmlSanitizer]="false" content="<b>Bold Label</b>"></button>
```

> Keep this as `true` (default) unless you need to render trusted HTML markup in the button label. Disabling it without proper validation introduces a security risk.

---

### `enablePersistence` — `boolean`

When `true`, the component's state is persisted across page reloads using the browser's local storage.

- **Default:** `false`

```html
<button ejs-button [enablePersistence]="true" [isToggle]="true">Toggle</button>
```

---

### `enableRtl` — `boolean`

When `true`, renders the component in right-to-left (RTL) direction. Useful for Arabic, Hebrew, and other RTL scripts.

- **Default:** `false`

```html
<button ejs-button [enableRtl]="true" iconCss="e-btn-icons e-setting-icon">Settings</button>
```

---

### `iconCss` — `string`

Defines one or more CSS classes (space-separated) for an icon to display within the button. Supports Syncfusion built-in icons (`e-icons` class prefix) and third-party icon libraries.

- **Default:** `""`

```html
<!-- Syncfusion built-in icon -->
<button ejs-button iconCss="e-icons e-save">Save</button>

<!-- Third-party icon (e.g., Font Awesome) -->
<button ejs-button iconCss="fa fa-home">Home</button>
```

---

### `iconPosition` — `string | IconPosition`

Controls where the icon appears relative to the button text.

- **Default:** `"Left"` (`IconPosition.Left`)
- **Accepted values:** `"Left"` | `"Right"`

```html
<!-- Icon on the left (default) -->
<button ejs-button iconCss="e-icons e-save">Save</button>

<!-- Icon on the right -->
<button ejs-button iconCss="e-icons e-send" iconPosition="Right">Send</button>
```

---

### `isPrimary` — `boolean`

Enhances the visual appearance of the button with a primary/emphasized style when set to `true`.

- **Default:** `false`
- Functionally equivalent to `cssClass="e-primary"`.

```html
<button ejs-button [isPrimary]="true">Primary</button>
```

> Prefer `cssClass="e-primary"` for consistency with other color style classes unless you specifically need the boolean `isPrimary` property binding.

---

### `isToggle` — `boolean`

Makes the button a toggle button. When clicked, the state changes between normal and active. In the active state, Syncfusion applies the `e-active` CSS class to the element.

- **Default:** `false`

```html
<button #toggleBtn ejs-button [isToggle]="true" cssClass="e-flat" content="Play"></button>
```

---

## Methods

Methods are accessed via `@ViewChild` on a `ButtonComponent` reference.

### `click()` — `void`

Programmatically triggers the button's native click action.

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button #btn ejs-button>Action</button>
    <button (click)="triggerClick()">Trigger Programmatically</button>
  `
})
export class AppComponent {
  @ViewChild('btn') btnRef: ButtonComponent | any;

  triggerClick(): void {
    this.btnRef.click();
  }
}
```

---

### `focusIn()` — `void`

Programmatically sets focus to the button element (native focus).

```typescript
@ViewChild('btn') btnRef: ButtonComponent | any;

focusButton(): void {
  this.btnRef.focusIn();
}
```

---

### `destroy()` — `void`

Destroys the `ButtonComponent` instance and cleans up event listeners and DOM modifications.

```typescript
@ViewChild('btn') btnRef: ButtonComponent | any;

cleanup(): void {
  this.btnRef.destroy();
}
```

> In Angular, `destroy()` is rarely needed — Angular's component lifecycle handles cleanup automatically via `ngOnDestroy`. Use it only in advanced scenarios where you control the button lifecycle outside Angular's component tree.

---

## Events

### `created` — `EmitType<Event>`

Fires once after the component has fully rendered. Use it for post-render DOM operations, such as setting native attributes or programmatic focus.

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button #btn ejs-button [isPrimary]="true" (created)="onCreated()">Submit</button>
  `
})
export class AppComponent {
  @ViewChild('btn') private btn: ButtonComponent | any;

  onCreated(): void {
    this.btn.element.setAttribute('title', 'Click to submit the form');
  }
}
```

---

## Usage Examples

### All properties in one component

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button ejs-button
      content="Save"
      cssClass="e-primary"
      [disabled]="false"
      [enableHtmlSanitizer]="true"
      [enablePersistence]="false"
      [enableRtl]="false"
      iconCss="e-icons e-save"
      iconPosition="Left"
      [isPrimary]="false"
      [isToggle]="false"
      (created)="onCreated()">
    </button>
  `
})
export class AppComponent {
  onCreated() {
    console.log('Button rendered');
  }
}
```

### Toggle button with state management

```typescript
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild, HostListener } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button #togglebtn ejs-button cssClass="e-flat"
      iconCss="e-icons e-play"
      [isToggle]="true"
      content="Play">
    </button>
  `
})
export class AppComponent {
  @ViewChild('togglebtn') togglebtn: ButtonComponent | any;

  @HostListener('click', ['togglebtn'])
  btnClick() {
    if (this.togglebtn.element.classList.contains('e-active')) {
      this.togglebtn.content = 'Pause';
      this.togglebtn.iconCss = 'e-icons e-pause';
    } else {
      this.togglebtn.content = 'Play';
      this.togglebtn.iconCss = 'e-icons e-play';
    }
  }
}
```

### Dynamic disabled state

```typescript
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button ejs-button [disabled]="!agreed" cssClass="e-primary">Proceed</button>
    <label>
      <input type="checkbox" [(ngModel)]="agreed"> I agree to the terms
    </label>
  `
})
export class AppComponent {
  agreed = false;
}
```
