# How-To Guides — Syncfusion Angular Toast

## Table of Contents
- [Close Toast on Click/Tap](#close-toast-on-clicktap)
- [Prevent Duplicate Toast Display](#prevent-duplicate-toast-display)
- [Restrict the Maximum Toast to Show](#restrict-the-maximum-toast-to-show)
- [Add Dynamic Template](#add-dynamic-template)
- [Render Template in Toast Using Angular ng-template](#render-template-in-toast-using-angular-ng-template)
- [Show Multiple Toasts in Various Positions](#show-multiple-toasts-in-various-positions)
- [Customize Progress Bar Theme and Sizing](#customize-progress-bar-theme-and-sizing)
- [Play an Audio Before Toast Opens](#play-an-audio-before-toast-opens)
- [Prevent Toast Close with Mobile Swipe](#prevent-toast-close-with-mobile-swipe)
- [Show Different Types of Toast](#show-different-types-of-toast)

---

## Close Toast on Click/Tap

By default, toast closes only after `timeOut` elapses. To enable click/tap-to-close, use a static toast (`timeOut: 0`) and handle the `click` event with `args.clickToClose = true`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent, ToastClickEventArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast [timeOut]="0" (click)="onClick($event)">
      <ng-template #title><div>Click to Dismiss</div></ng-template>
      <ng-template #content><div>Click anywhere on this toast to close it.</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Show</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  onClick(args: ToastClickEventArgs): void {
    args.clickToClose = true;
  }
}
```

> Setting `args.clickToClose = true` in the `click` event handler is the documented API for this behavior. This works in combination with `timeOut: 0` (static toast) so the toast doesn't expire on its own.

---

## Prevent Duplicate Toast Display

Cancel the `beforeOpen` event when a toast with the same title is already visible:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent, ToastBeforeOpenArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (beforeOpen)="onBeforeOpen($event)">
      <ng-template #title><div>Notification</div></ng-template>
      <ng-template #content><div>This will not duplicate.</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Show</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  onBeforeOpen(args: ToastBeforeOpenArgs): void {
    const existingToasts = document.querySelectorAll('.e-toast-container .e-toast');
    for (const el of Array.from(existingToasts)) {
      const titleEl = el.querySelector('.e-toast-title');
      if (titleEl && titleEl.textContent?.trim() === 'Notification') {
        args.cancel = true;  // Prevent showing duplicate
        return;
      }
    }
  }
}
```

> Match the title text in the check to the specific toast you want to deduplicate. For more robust deduplication, compare the `content` or a unique ID stored in a component property.

---

## Restrict the Maximum Toast to Show

Limit the number of concurrently visible toasts by canceling `beforeOpen` when the count is at the maximum:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent, ToastBeforeOpenArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (beforeOpen)="onBeforeOpen($event)">
      <ng-template #title><div>Alert</div></ng-template>
      <ng-template #content><div>Toast message</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Add Toast</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;
  private maxToasts = 3;

  onBeforeOpen(args: ToastBeforeOpenArgs): void {
    const currentCount = document.querySelectorAll('.e-toast').length;
    if (currentCount >= this.maxToasts) {
      args.cancel = true;
    }
  }
}
```

> Adjust `maxToasts` to any limit you need. You can also queue cancelled toasts in an array and show them as existing ones close (by showing the next in queue inside the `close` event handler).

---

## Add Dynamic Template

Pass different `ToastModel` arguments to `show()` to change the toast content dynamically from a single component instance:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast></ejs-toast>
    <button (click)="showTemplate1()">Upload Toast</button>
    <button (click)="showTemplate2()">Delete Toast</button>
    <button (click)="showTemplate3()">Error Toast</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  showTemplate1(): void {
    this.toast.show({
      title: 'Upload Complete',
      content: '<div>3 files uploaded successfully.</div>',
      cssClass: 'e-toast-success',
      timeOut: 4000
    });
  }

  showTemplate2(): void {
    this.toast.show({
      title: 'File Deleted',
      content: '<div>document.pdf moved to trash.</div>',
      cssClass: 'e-toast-warning',
      timeOut: 5000
    });
  }

  showTemplate3(): void {
    this.toast.show({
      title: 'Connection Error',
      content: '<div>Failed to reach server. Retrying...</div>',
      cssClass: 'e-toast-danger',
      timeOut: 0,
      showCloseButton: true
    });
  }
}
```

> Any property supported by `ToastModel` can be passed to `show()`. Properties provided here override the component's bound properties for that specific toast instance only.

---

## Render Template in Toast Using Angular ng-template

Use `ng-template` with the `#template` reference inside `<ejs-toast>` to render rich Angular template content:

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
        <div class="toast-custom-layout" style="display: flex; align-items: center; gap: 12px;">
          <div class="toast-avatar" style="width:40px;height:40px;border-radius:50%;background:#4caf50;color:#fff;display:flex;align-items:center;justify-content:center;">
            JD
          </div>
          <div>
            <div style="font-weight:600;">John Doe</div>
            <div style="font-size:13px;color:#666;">Shared a document with you</div>
            <div style="font-size:11px;color:#999;margin-top:4px;">Just now</div>
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

> `<ng-template #template>` inside `<ejs-toast>` is the correct syntax. The `#template` reference name is **mandatory** — it must be exactly `#template`. When this is present, you do not need to set the `template` property on the component.

---

## Show Multiple Toasts in Various Positions

Because toast position only changes after all existing toasts in an instance are cleared, use **separate `ejs-toast` instances** for different positions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #topRightToast [position]="topRight" cssClass="e-toast-info">
      <ng-template #title><div>Top Right</div></ng-template>
      <ng-template #content><div>Notification in top-right corner.</div></ng-template>
    </ejs-toast>

    <ejs-toast #bottomCenterToast [position]="bottomCenter" cssClass="e-toast-success">
      <ng-template #title><div>Bottom Center</div></ng-template>
      <ng-template #content><div>Action completed.</div></ng-template>
    </ejs-toast>

    <ejs-toast #topLeftToast [position]="topLeft" cssClass="e-toast-warning">
      <ng-template #title><div>Top Left</div></ng-template>
      <ng-template #content><div>Warning message.</div></ng-template>
    </ejs-toast>

    <button (click)="topRightToast.show()">Top Right</button>
    <button (click)="bottomCenterToast.show()">Bottom Center</button>
    <button (click)="topLeftToast.show()">Top Left</button>
  `
})
export class App {
  @ViewChild('topRightToast') topRightToast!: ToastComponent;
  @ViewChild('bottomCenterToast') bottomCenterToast!: ToastComponent;
  @ViewChild('topLeftToast') topLeftToast!: ToastComponent;

  public topRight = { X: 'Right', Y: 'Top' };
  public bottomCenter = { X: 'Center', Y: 'Bottom' };
  public topLeft = { X: 'Left', Y: 'Top' };
}
```

---

## Customize Progress Bar Theme and Sizing

Access the progress bar DOM element in the `beforeOpen` event and apply custom styles:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent, ToastBeforeOpenArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast [showProgressBar]="true" [timeOut]="5000"
               (beforeOpen)="onBeforeOpen($event)">
      <ng-template #title><div>Processing</div></ng-template>
      <ng-template #content><div>Please wait...</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Show</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  onBeforeOpen(args: ToastBeforeOpenArgs): void {
    // Customize the progress bar after it's rendered in the DOM
    setTimeout(() => {
      const progressBar = args.element.querySelector('.e-toast-progress') as HTMLElement;
      if (progressBar) {
        progressBar.style.height = '6px';
        progressBar.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a)';
        progressBar.style.borderRadius = '3px';
      }
    }, 0);
  }
}
```

**CSS-based customization (alternative):**
```css
/* Customize globally in styles.css */
.e-toast-container .e-toast .e-toast-progress {
  height: 6px;
  background: linear-gradient(90deg, #2196f3, #03a9f4);
  border-radius: 3px;
}
```

---

## Play an Audio Before Toast Opens

Use the `beforeOpen` event to play an audio file before the toast displays. Use the `open` event to stop it after the toast is shown:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent, ToastBeforeOpenArgs, ToastOpenArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (beforeOpen)="onBeforeOpen($event)" (open)="onOpen($event)">
      <ng-template #title><div>Incoming Message</div></ng-template>
      <ng-template #content><div>You have a new message.</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Notify</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;
  private audio: HTMLAudioElement = new Audio('notification.mp3');

  onBeforeOpen(args: ToastBeforeOpenArgs): void {
    this.audio.play().catch(() => {
      // Browser autoplay policy may block — handle gracefully
      console.log('Audio autoplay blocked by browser policy');
    });
  }

  onOpen(args: ToastOpenArgs): void {
    // Stop audio once toast is visible (optional)
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
```

> Browsers enforce autoplay policies that may prevent audio from playing without prior user interaction. Always catch the promise rejection from `audio.play()`.

---

## Prevent Toast Close with Mobile Swipe

Check the `args.type` value in `beforeClose` and cancel when type is `'swipe'`:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent, ToastBeforeCloseArgs } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast (beforeClose)="onBeforeClose($event)" [showCloseButton]="true">
      <ng-template #title><div>Persistent Alert</div></ng-template>
      <ng-template #content><div>This toast cannot be swiped away on mobile.</div></ng-template>
    </ejs-toast>
    <button (click)="toast.show()">Show</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  onBeforeClose(args: ToastBeforeCloseArgs): void {
    if (args.type === 'swipe') {
      args.cancel = true;  // Prevent swipe dismiss
    }
    // All other close types (timeout, close button, hide()) proceed normally
  }
}
```

> `args.type` values: `'timeout'` (auto-expired), `'swipe'` (mobile swipe gesture), `'close button'` (× button clicked), `'hide method'` (`.hide()` called programmatically). Cancel only `'swipe'` to preserve other close mechanisms.

---

## Show Different Types of Toast

Use the `cssClass` property with predefined semantic class names or `ToastUtility.show()` with type strings:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ToastModule, ToastComponent } from '@syncfusion/ej2-angular-notifications';
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

@Component({
  imports: [ToastModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-toast #toast></ejs-toast>
    <button (click)="showSuccess()">Success</button>
    <button (click)="showInfo()">Info</button>
    <button (click)="showWarning()">Warning</button>
    <button (click)="showDanger()">Danger</button>
    <button (click)="useUtility()">Via Utility</button>
  `
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  // Using cssClass on the ejs-toast component
  showSuccess(): void {
    this.toast.show({ title: 'Success', content: 'Operation completed.', cssClass: 'e-toast-success' });
  }

  showInfo(): void {
    this.toast.show({ title: 'Info', content: 'Update available.', cssClass: 'e-toast-info' });
  }

  showWarning(): void {
    this.toast.show({ title: 'Warning', content: 'Low storage.', cssClass: 'e-toast-warning' });
  }

  showDanger(): void {
    this.toast.show({ title: 'Error', content: 'Save failed.', cssClass: 'e-toast-danger' });
  }

  // Using ToastUtility for quick notifications (no template needed)
  useUtility(): void {
    ToastUtility.show('Quick success message via utility!', 'Success', 3000);
  }
}
```

**Predefined CSS classes summary:**

| Class | Visual | Meaning |
|---|---|---|
| `e-toast-success` | Green | Positive outcome |
| `e-toast-info` | Blue | Informational |
| `e-toast-warning` | Orange/Yellow | Caution |
| `e-toast-danger` | Red | Error/Failure |

> These classes use the Syncfusion theme's semantic color palette. Ensure the full CSS import chain is in `styles.css`. For fully custom colors, override via CSS as shown in the style reference.

## See Also
- [Timeout and Events](./timeout-and-events.md) — Full event API
- [Templates and Buttons](./template-and-buttons.md) — Custom layouts
- [Toast Utility](./toast-utility.md) — `ToastUtility.show()` details
- [Position and Animation](./position-and-animation.md) — Multiple positions
