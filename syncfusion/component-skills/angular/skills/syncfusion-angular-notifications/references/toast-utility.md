# Toast Utility Service — Syncfusion Angular Toast

## Table of Contents
- [Overview](#overview)
- [When to Use ToastUtility vs ejs-toast Component](#when-to-use-toastutility-vs-ejs-toast-component)
- [Show Toast with Predefined Types](#show-toast-with-predefined-types)
- [Show Toast with ToastModel](#show-toast-with-toastmodel)
- [Hiding a Utility Toast Programmatically](#hiding-a-utility-toast-programmatically)
- [ToastUtility Patterns](#toastutility-patterns)

---

## Overview

`ToastUtility.show()` is a static utility function that renders a toast notification without needing to declare an `<ejs-toast>` element in the component template. It programmatically creates the toast container in `document.body` and removes it after the toast closes.

**Import:**
```typescript
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';
```

---

## When to Use ToastUtility vs ejs-toast Component

| Scenario | Recommendation |
|---|---|
| Quick, simple notifications from a service | `ToastUtility.show()` |
| Repeated toasts from many components | `ToastUtility.show()` (no template needed) |
| Custom templates, ng-template content | `<ejs-toast>` component |
| Complex event handling (beforeOpen, click, etc.) | `<ejs-toast>` component |
| Notifications with action buttons | `<ejs-toast>` or `ToastUtility` with `ToastModel` |
| Target-specific container placement | `<ejs-toast>` with `target` property |
| Static persistent notifications | `<ejs-toast>` with `timeOut: 0` |

---

## Show Toast with Predefined Types

Call `ToastUtility.show(content, type, timeOut)` with one of four built-in type strings:

| Type Argument | Visual Style | Use Case |
|---|---|---|
| `'Information'` | Blue info styling | Neutral updates, availability notices |
| `'Success'` | Green success styling | Operation completed, file saved |
| `'Error'` | Red danger styling | Failures, errors, validation issues |
| `'Warning'` | Orange/yellow styling | Caution messages, low resources |

```typescript
import { Component } from '@angular/core';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="showSuccess()">Success</button>
    <button (click)="showError()">Error</button>
    <button (click)="showWarning()">Warning</button>
    <button (click)="showInfo()">Info</button>
  `
})
export class App {
  showSuccess(): void {
    ToastUtility.show('File saved successfully.', 'Success', 3000);
  }

  showError(): void {
    ToastUtility.show('Failed to connect to server.', 'Error', 5000);
  }

  showWarning(): void {
    ToastUtility.show('Storage is running low.', 'Warning', 4000);
  }

  showInfo(): void {
    ToastUtility.show('New update available.', 'Information', 3000);
  }
}
```

**Method signature:**
```typescript
ToastUtility.show(content: string, type: string, timeOut: number): ToastModel
```

> `ToastUtility.show()` returns the created `ToastModel` instance. Store this reference if you need to hide the toast programmatically before it auto-expires.

---

## Show Toast with ToastModel

Pass a `ToastModel` object as the single argument to access all toast properties — position, buttons, events, animation, etc.:

```typescript
import { ToastUtility, ToastModel } from '@syncfusion/ej2-angular-notifications';

export class App {
  showFullToast(): void {
    ToastUtility.show({
      title: 'Download Complete',
      content: 'report_q4.pdf (2.4 MB) has been downloaded.',
      timeOut: 5000,
      position: { X: 'Right', Y: 'Bottom' },
      showCloseButton: true,
      showProgressBar: true,
      cssClass: 'e-toast-success',
      buttons: [
        {
          model: { content: 'Open File', cssClass: 'e-primary' },
          click: () => { window.open('/downloads/report_q4.pdf'); }
        }
      ],
      open: (args) => { console.log('Utility toast opened'); },
      close: (args) => { console.log('Utility toast closed'); }
    } as ToastModel);
  }
}
```

**Available `ToastModel` properties:**

All standard toast properties work — `title`, `content`, `timeOut`, `extendedTimeout`, `position`, `showCloseButton`, `showProgressBar`, `progressDirection`, `newestOnTop`, `cssClass`, `icon`, `width`, `height`, `target`, `animation`, `buttons`, `enableRtl`, `locale`.

**Available `ToastModel` events:**
`open`, `close`, `click`, `beforeOpen`, `beforeClose`, `created`, `destroyed`, `beforeSanitizeHtml`

---

## Hiding a Utility Toast Programmatically

Store the return value of `ToastUtility.show()` to hide it before its timeout:

```typescript
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

export class NotificationService {
  private activeToast: any;

  showProcessingToast(): void {
    this.activeToast = ToastUtility.show({
      content: 'Processing your request...',
      timeOut: 0,         // Static — stays until we hide it
      showProgressBar: false
    });
  }

  hideProcessingToast(): void {
    if (this.activeToast) {
      // Call hide() on the returned toast model object
      (this.activeToast as any).hide('All');
      this.activeToast = null;
    }
  }
}
```

---

## ToastUtility Patterns

### Using ToastUtility in an Angular Service

Encapsulate notification logic in a reusable service:

```typescript
// notification.service.ts
import { Injectable } from '@angular/core';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(message: string, duration = 3000): void {
    ToastUtility.show(message, 'Success', duration);
  }

  error(message: string, duration = 5000): void {
    ToastUtility.show(message, 'Error', duration);
  }

  warn(message: string, duration = 4000): void {
    ToastUtility.show(message, 'Warning', duration);
  }

  info(message: string, duration = 3000): void {
    ToastUtility.show(message, 'Information', duration);
  }

  custom(model: object): void {
    ToastUtility.show(model as any);
  }
}
```

**Usage in any component:**
```typescript
constructor(private notify: NotificationService) {}

save(): void {
  this.dataService.save(this.form.value).subscribe({
    next: () => this.notify.success('Record saved successfully.'),
    error: (err) => this.notify.error(`Save failed: ${err.message}`)
  });
}
```

### Show notification from HTTP interceptor
```typescript
// http-error.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      ToastUtility.show(`Request failed: ${error.status}`, 'Error', 5000);
      return throwError(() => error);
    })
  );
};
```

## See Also
- [How-To: Show Different Types of Toast](./how-to.md#show-different-types-of-toast)
- [Configuration](./configuration.md) — Full property listing
- [API Reference](./api.md) — `ToastModel` interface
