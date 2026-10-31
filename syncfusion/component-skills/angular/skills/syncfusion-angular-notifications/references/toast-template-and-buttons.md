# Templates and Action Buttons — Syncfusion Angular Toast

## Table of Contents
- [Template Property Approaches](#template-property-approaches)
- [Angular ng-template Approach](#angular-ng-template-approach)
- [Dynamic Templates via show()](#dynamic-templates-via-show)
- [Title and Content ng-template](#title-and-content-ng-template)
- [Action Buttons](#action-buttons)
- [Button Click Handlers](#button-click-handlers)
- [Combined Example](#combined-example)

---

## Template Property Approaches

The `template` property overrides the built-in `title`/`content` rendering with a fully custom layout. It accepts:

**1. HTML string:**
```typescript
public template: string = '<div class="custom-toast"><span class="icon">✓</span><p>Operation complete</p></div>';
```

**2. Element ID (CSS selector string):**
```html
<!-- Define template in the DOM -->
<div id="toastTemplate" style="display:none">
  <div class="custom-body">Custom Toast Body</div>
</div>
```
```typescript
public template: string = '#toastTemplate';
```

> When `template` is set, the `title` and `content` properties are ignored — the full layout is controlled by the template.

---

## Angular ng-template Approach

The preferred Angular pattern uses `ng-template` with the `#template` attribute inside the `<ejs-toast>` tag. This avoids manual DOM queries and integrates with Angular's template engine:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (created)="toast.show()">
      <ng-template #template>
        <div class="custom-toast-layout">
          <span class="e-icons e-check-circle toast-icon"></span>
          <div class="toast-message">
            <strong>Upload Complete</strong>
            <p>3 files have been uploaded successfully.</p>
          </div>
        </div>
      </ng-template>
    </ejs-toast>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;
}
```

> Use `#template` (not `#content`) inside `<ejs-toast>` to render a fully custom layout. The `#template` reference tells the Toast component to use this ng-template as the complete toast body.

---

## Title and Content ng-template

For the common title + content pattern, use separate `#title` and `#content` ng-templates (without setting the `template` property):

```typescript
@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (created)="toast.show()">
      <ng-template #title>
        <div style="font-weight: bold; color: #3f51b5;">System Update</div>
      </ng-template>
      <ng-template #content>
        <div>
          Version 2.1.0 is available.
          <a href="/updates" target="_blank">View changelog</a>
        </div>
      </ng-template>
    </ejs-toast>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;
}
```

> `#title` and `#content` templates work together with `showCloseButton`, `showProgressBar`, and `buttons`. Use `#template` only when you want to completely replace the layout.

---

## Dynamic Templates via show()

Pass a `ToastModel` object to `show()` to change the template at runtime — useful for displaying different messages from a single toast instance:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast></ejs-toast>
    <button (click)="showSuccess()">Success</button>
    <button (click)="showError()">Error</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  showSuccess(): void {
    this.toast.show({
      title: 'Success',
      content: 'Your changes have been saved.',
      cssClass: 'e-toast-success',
      icon: 'e-icons e-check-circle'
    });
  }

  showError(): void {
    this.toast.show({
      title: 'Error',
      content: 'Failed to save changes. Please try again.',
      cssClass: 'e-toast-danger'
    });
  }
}
```

> Any `ToastModel` property can be passed to `show()` — title, content, cssClass, template, buttons, timeOut, etc. Properties passed here override the component's bound properties for that individual toast instance.

---

## Action Buttons

The `buttons` property renders clickable action buttons inside the toast. Each item in the array uses `ButtonModelPropsModel`:

```typescript
import { ButtonModelPropsModel } from '@syncfusion/ej2-angular-buttons';

public buttons: ButtonModelPropsModel[] = [
  {
    model: { content: 'View', cssClass: 'e-primary' }
  },
  {
    model: { content: 'Dismiss' }
  }
];
```

```html
<ejs-toast [buttons]="buttons"></ejs-toast>
```

**`ButtonModelPropsModel` structure:**
```typescript
{
  model: {
    content: string,       // Button label text
    cssClass: string,      // CSS classes (e.g., 'e-primary', 'e-flat')
    isPrimary: boolean,    // Primary button style
    disabled: boolean,     // Disabled state
    iconCss: string        // Icon CSS class
  },
  click: EventCallback     // Click event handler function
}
```

---

## Button Click Handlers

Attach click handlers directly in the button configuration:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { ButtonModelPropsModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast [buttons]="buttons" [timeOut]="0" [showCloseButton]="true">
      <ng-template #title><div>File Deleted</div></ng-template>
      <ng-template #content><div>document.pdf has been moved to trash.</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Delete File</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  public buttons: ButtonModelPropsModel[] = [
    {
      model: { content: 'Undo', cssClass: 'e-primary' },
      click: () => {
        console.log('Undo clicked — restore file');
        this.toast.hide('All');
      }
    },
    {
      model: { content: 'Dismiss' },
      click: () => {
        this.toast.hide('All');
      }
    }
  ];
}
```

> Use `timeOut: 0` with action buttons to prevent the toast from auto-dismissing before the user acts. Provide a `Dismiss` button or `showCloseButton: true` as the manual close mechanism.

---

## Combined Example

Toast with custom ng-template, action buttons, and a close button:

```typescript
@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast [buttons]="buttons" [timeOut]="0" [showCloseButton]="true"
               [position]="{ X: 'Right', Y: 'Bottom' }">
      <ng-template #template>
        <div style="display:flex; align-items:center; gap:12px; padding:4px 0;">
          <span class="e-icons e-upload-1" style="font-size:24px; color:#4caf50;"></span>
          <div>
            <strong>Upload Complete</strong>
            <div>report_final.pdf (2.4 MB)</div>
          </div>
        </div>
      </ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Upload</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  public buttons: ButtonModelPropsModel[] = [
    {
      model: { content: 'View File', cssClass: 'e-primary e-flat' },
      click: () => window.open('/files/report_final.pdf', '_blank')
    }
  ];
}
```

## See Also
- [How-To: Add Dynamic Template](./how-to.md#add-dynamic-template)
- [How-To: Render ng-template](./how-to.md#render-template-in-toast-using-angular-template)
- [API Reference](./api.md) — `buttons`, `template`, `ButtonModelPropsModel`
