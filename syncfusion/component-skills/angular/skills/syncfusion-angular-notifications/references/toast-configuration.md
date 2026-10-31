# Configuration — Syncfusion Angular Toast

## Table of Contents
- [Title and Content](#title-and-content)
- [Custom Target Container](#custom-target-container)
- [Close Button](#close-button)
- [Progress Bar](#progress-bar)
- [Newest On Top](#newest-on-top)
- [Width and Height](#width-and-height)
- [Icon](#icon)
- [CSS Classes for Semantic Types](#css-classes-for-semantic-types)
- [RTL and Locale](#rtl-and-locale)
- [HTML Sanitizer](#html-sanitizer)
- [Combined Configuration Example](#combined-configuration-example)

---

## Title and Content

The `title` and `content` properties accept strings, HTML strings, element IDs, or HTML elements. These render inside the toast message container.

```typescript
// String values
@Component({
  template: `<ejs-toast [title]="title" [content]="content"></ejs-toast>`
})
export class App {
  title = 'Download Complete';
  content = 'Your file has been saved to Downloads.';
}
```

```html
<!-- HTML string content -->
<ejs-toast 
  title="<b>Alert</b>" 
  content="<i>This is important</i>">
</ejs-toast>
```

```html
<!-- Using ng-template (preferred for Angular) -->
<ejs-toast>
  <ng-template #title>
    <div class="custom-title">Download Complete</div>
  </ng-template>
  <ng-template #content>
    <div>Your file has been saved.</div>
  </ng-template>
</ejs-toast>
```

> `ng-template` with `#title` and `#content` takes precedence over the property binding approach. For dynamic HTML, prefer `ng-template` to ensure Angular change detection works properly.

---

## Custom Target Container

By default the toast renders into `document.body`. Use `target` to render it inside a specific container (e.g., a panel, sidebar, or modal).

```typescript
public target: string = '#notification-panel';
// or pass an HTMLElement reference
public target: HTMLElement = document.getElementById('panel')!;
```

```html
<div id="notification-panel" style="position: relative; height: 400px;">
  <ejs-toast [target]="target" [position]="{ X: 'Right', Y: 'Top' }">
  </ejs-toast>
</div>
```

> When `target` is set, `position` values are relative to that container element, not the viewport.

---

## Close Button

`showCloseButton` displays an × button that lets the user dismiss the toast manually before it auto-expires.

```html
<ejs-toast [showCloseButton]="true"></ejs-toast>
```

```typescript
// Combine with timeOut: 0 for a toast that only closes on user action
@Component({
  template: `<ejs-toast [showCloseButton]="true" [timeOut]="0"></ejs-toast>`
})
```

---

## Progress Bar

`showProgressBar` renders a visual countdown bar that depletes as the toast approaches its `timeOut`.

```html
<ejs-toast [showProgressBar]="true" [timeOut]="5000"></ejs-toast>
```

**Progress direction** — controls whether the bar depletes left-to-right or right-to-left:

```typescript
// Default: 'Rtl' (right to left — bar shrinks from right)
// 'Ltr' — bar shrinks from left
public progressDir: string = 'Ltr';
```

```html
<ejs-toast [showProgressBar]="true" [progressDirection]="'Ltr'"></ejs-toast>
```

> The progress bar only appears when `timeOut > 0`. For static toasts (`timeOut: 0`) it has no visual effect.

---

## Newest On Top

By default, new toasts are inserted **before** existing ones (newestOnTop defaults to `true`). Set to `false` to append new toasts after existing ones.

```html
<!-- New toasts appear above older ones (default) -->
<ejs-toast [newestOnTop]="true"></ejs-toast>

<!-- New toasts stack below older ones -->
<ejs-toast [newestOnTop]="false"></ejs-toast>
```

> Position updates take effect only after all existing toasts are removed. The order property only affects stacking within the same toast container.

---

## Width and Height

Default width is `300px`. On mobile, the width automatically becomes `100%`. Height defaults to `'auto'`.

```html
<!-- Fixed pixel dimensions -->
<ejs-toast [width]="400" [height]="100"></ejs-toast>

<!-- Percentage width -->
<ejs-toast width="50%" height="auto"></ejs-toast>

<!-- Full-width toast (stacks at top or bottom based on Y position) -->
<ejs-toast width="100%" [position]="{ X: 'Center', Y: 'Bottom' }"></ejs-toast>
```

> Setting `width: '100%'` overrides X position — the toast spans the full container width. Use with `Y: 'Top'` or `Y: 'Bottom'` for banner-style notifications.

---

## Icon

Display an icon at the top-left corner of the toast using CSS class names from the Syncfusion icon font or custom icon libraries:

```typescript
public icon: string = 'e-icons e-check-circle';
```

```html
<ejs-toast [icon]="icon" [title]="'Success'" [content]="'Record saved.'"></ejs-toast>
```

> Use Syncfusion's built-in `e-icons` classes or provide any CSS icon class (FontAwesome, Material Icons, etc.) as the `icon` value.

---

## CSS Classes for Semantic Types

Use the `cssClass` property to apply predefined semantic styles:

| CSS Class | Semantic Meaning | Use Case |
|---|---|---|
| `e-toast-success` | Positive outcome | Save succeeded, upload complete |
| `e-toast-info` | Neutral information | Update available, reminder |
| `e-toast-warning` | Caution / potential issue | Low storage, approaching limit |
| `e-toast-danger` | Error / failure | Save failed, invalid input |

```typescript
// Apply via property binding
this.toast.show({ content: 'File saved!', cssClass: 'e-toast-success' });
this.toast.show({ content: 'Upload failed.', cssClass: 'e-toast-danger' });
this.toast.show({ content: 'Low disk space.', cssClass: 'e-toast-warning' });
this.toast.show({ content: 'Update available.', cssClass: 'e-toast-info' });
```

```html
<!-- Static via template binding -->
<ejs-toast cssClass="e-toast-success" title="Done" content="Record saved."></ejs-toast>
```

> These classes rely on the Syncfusion theme CSS. Ensure the full CSS import chain is in place. For custom brand colors, override via the CSS customization patterns in the styles reference.

---

## RTL and Locale

Enable right-to-left rendering for RTL languages:

```html
<ejs-toast [enableRtl]="true"></ejs-toast>
```

Override the locale (default `'en-US'`):

```html
<ejs-toast locale="ar"></ejs-toast>
```

---

## HTML Sanitizer

`enableHtmlSanitizer` is `true` by default, protecting against XSS when rendering HTML content. Only disable it if content is from a fully trusted source:

```html
<!-- Sanitizer enabled (default) — safe for user-generated content -->
<ejs-toast [enableHtmlSanitizer]="true"></ejs-toast>

<!-- Disable only for trusted internal HTML -->
<ejs-toast [enableHtmlSanitizer]="false"></ejs-toast>
```

Listen to `beforeSanitizeHtml` if you need to customize sanitization behavior:
```typescript
public onBeforeSanitize(args: BeforeSanitizeHtmlArgs): void {
  // Modify args.selectors to allow specific tags/attributes
}
```

---

## Combined Configuration Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast
      [showCloseButton]="true"
      [showProgressBar]="true"
      progressDirection="Ltr"
      [newestOnTop]="true"
      [timeOut]="4000"
      [extendedTimeout]="2000"
      [position]="position"
      width="350"
      cssClass="e-toast-info">
      <ng-template #title><div>System Notice</div></ng-template>
      <ng-template #content><div>Your session will expire in 5 minutes.</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Notify</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;
  public position = { X: 'Right', Y: 'Top' };
}
```

## See Also
- [Timeout and Events](./timeout-and-events.md) — `timeOut`, `extendedTimeout`, events
- [Position and Animation](./position-and-animation.md) — Positioning details
- [How-To: Customize Progress Bar](./how-to.md#customize-progress-bar-theme-and-sizing)
