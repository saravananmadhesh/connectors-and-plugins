# Timeout and Events — Syncfusion Angular Toast

## Table of Contents
- [Timeout Property](#timeout-property)
- [Extended Timeout on Hover](#extended-timeout-on-hover)
- [Static Toast](#static-toast)
- [Events Overview](#events-overview)
- [created Event](#created-event)
- [open Event](#open-event)
- [close Event](#close-event)
- [click Event](#click-event)
- [beforeOpen Event](#beforeopen-event)
- [beforeClose Event](#beforeclose-event)
- [beforeSanitizeHtml Event](#beforesanitizehtml-event)
- [destroyed Event](#destroyed-event)
- [Event-Based Patterns](#event-based-patterns)

---

## Timeout Property

`timeOut` controls how long (in milliseconds) the toast remains visible before auto-dismissing. Default is `5000` (5 seconds).

```html
<!-- 3-second timeout -->
<ejs-toast [timeOut]="3000"></ejs-toast>

<!-- 10-second timeout -->
<ejs-toast [timeOut]="10000"></ejs-toast>
```

- Toast is removed from the DOM once `timeOut` elapses (unless the user is hovering — see `extendedTimeout`)
- Progress bar (if enabled) depletes proportionally to `timeOut`

---

## Extended Timeout on Hover

`extendedTimeout` specifies additional display time (ms) granted after the user starts hovering over the toast. Default is `1000` (1 second).

```html
<!-- Give 3 extra seconds when user hovers -->
<ejs-toast [timeOut]="4000" [extendedTimeout]="3000"></ejs-toast>
```

**Behavior sequence:**
1. Toast appears, `timeOut` countdown begins
2. User hovers — countdown pauses
3. User moves away — `extendedTimeout` countdown begins
4. Toast dismisses after `extendedTimeout` elapses

> Set `extendedTimeout: 0` to dismiss the toast immediately when the user stops hovering, with no grace period.

---

## Static Toast

Set `timeOut: 0` to create a toast that persists until explicitly closed by the user or code. Always pair with `showCloseButton: true` or action buttons so the user can dismiss it.

```html
<ejs-toast [timeOut]="0" [showCloseButton]="true">
  <ng-template #title><div>Maintenance Window</div></ng-template>
  <ng-template #content><div>Scheduled downtime tonight 2–4 AM. <a href="#">Details</a></div></ng-template>
</ejs-toast>
```

**Programmatic hide for static toasts:**
```typescript
// Hide a specific toast element
this.toast.hide(toastElement);

// Hide all visible toasts
this.toast.hide('All');
```

---

## Events Overview

| Event | Fires When | Can Cancel? |
|---|---|---|
| `created` | Component finishes initialization | No |
| `open` | Toast becomes visible on screen | No |
| `close` | Toast finishes hiding | No |
| `click` | User clicks anywhere on the toast | No (but can trigger `hide`) |
| `beforeOpen` | Before the toast is shown | Yes — set `args.cancel = true` |
| `beforeClose` | Before the toast starts hiding | Yes — set `args.cancel = true` |
| `beforeSanitizeHtml` | Before HTML content is sanitized | No (modify selectors) |
| `destroyed` | Component is destroyed | No |

---

## created Event

Fires once after the component finishes initialization. Use it to auto-show a toast or initialize state:

```typescript
@Component({
  template: `<ejs-toast #toast (created)="onCreated()"></ejs-toast>`
})
export class App {
  @ViewChild('toast') toast!: ToastComponent;

  onCreated(): void {
    // Safe to call show() here — component is fully initialized
    this.toast.show({ title: 'Welcome', content: 'App loaded successfully.' });
  }
}
```

---

## open Event

Fires after the toast is shown on screen. Use to trigger side effects after display:

```typescript
import { ToastOpenArgs } from '@syncfusion/ej2-angular-notifications';

public onOpen(args: ToastOpenArgs): void {
  console.log('Toast is now visible', args.element);
  // args.element: HTMLElement — the toast DOM node
  // args.toastObj: ToastComponent reference
}
```

```html
<ejs-toast (open)="onOpen($event)"></ejs-toast>
```

**Example: Play audio after toast appears:**
```typescript
public onOpen(args: ToastOpenArgs): void {
  const audio = new Audio('notification.mp3');
  audio.play();
}
```

---

## close Event

Fires after the toast finishes hiding (after dismiss animation completes):

```typescript
import { ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';

public onClose(args: ToastCloseArgs): void {
  console.log('Toast dismissed');
  // args.toastObj: component reference
  // args.element: the toast element that was closed
}
```

```html
<ejs-toast (close)="onClose($event)"></ejs-toast>
```

---

## click Event

Fires when the user clicks anywhere on the toast body. Use `clickToClose` to dismiss the toast on click:

```typescript
import { ToastClickEventArgs } from '@syncfusion/ej2-angular-notifications';

public onClick(args: ToastClickEventArgs): void {
  // Set clickToClose to true to dismiss the toast on click
  args.clickToClose = true;
}
```

```html
<ejs-toast (click)="onClick($event)" [timeOut]="0"></ejs-toast>
```

> This is the correct way to implement "click to close" behavior. The `clickToClose` property on the event args controls whether the toast dismisses when clicked.

---

## beforeOpen Event

Fires just before the toast becomes visible. **Setting `args.cancel = true` prevents the toast from showing.** Use this for:
- Preventing duplicate toasts
- Restricting the maximum number of visible toasts
- Customizing progress bar styles programmatically
- Playing audio before display

```typescript
import { ToastBeforeOpenArgs } from '@syncfusion/ej2-angular-notifications';

public onBeforeOpen(args: ToastBeforeOpenArgs): void {
  // Cancel if same title already visible
  const existing = document.querySelectorAll('.e-toast-container .e-toast');
  for (const el of Array.from(existing)) {
    const titleEl = el.querySelector('.e-toast-title');
    if (titleEl && titleEl.textContent === args.toastObj.title) {
      args.cancel = true;  // Prevent duplicate
      return;
    }
  }
}
```

**Restrict max toast count:**
```typescript
public maxCount: number = 3;

public onBeforeOpen(args: ToastBeforeOpenArgs): void {
  const currentCount = document.querySelectorAll('.e-toast').length;
  if (currentCount >= this.maxCount) {
    args.cancel = true;
  }
}
```

**Customize progress bar via beforeOpen:**
```typescript
public onBeforeOpen(args: ToastBeforeOpenArgs): void {
  // Access the progress bar element for styling
  const progressBar = args.element.querySelector('.e-toast-progress') as HTMLElement;
  if (progressBar) {
    progressBar.style.height = '8px';
    progressBar.style.background = '#4caf50';
  }
}
```

```html
<ejs-toast (beforeOpen)="onBeforeOpen($event)" [showProgressBar]="true"></ejs-toast>
```

---

## beforeClose Event

Fires just before the toast starts its hide animation. **Setting `args.cancel = true` prevents the toast from closing.** Use this to:
- Prevent swipe-to-dismiss on mobile
- Confirm before closing critical alerts

```typescript
import { ToastBeforeCloseArgs } from '@syncfusion/ej2-angular-notifications';

public onBeforeClose(args: ToastBeforeCloseArgs): void {
  // Prevent swipe dismiss on mobile (type === 'swipe')
  if (args.type === 'swipe') {
    args.cancel = true;
  }
}
```

```html
<ejs-toast (beforeClose)="onBeforeClose($event)"></ejs-toast>
```

> The `args.type` value indicates what triggered the close: `'timeout'`, `'swipe'`, `'close button'`, or `'hide method'`. Use this to selectively prevent only certain close types.

---

## beforeSanitizeHtml Event

Fires before HTML content is sanitized. Use it to customize which HTML tags/attributes are allowed:

```typescript
import { BeforeSanitizeHtmlArgs } from '@syncfusion/ej2-angular-notifications';

public onBeforeSanitize(args: BeforeSanitizeHtmlArgs): void {
  // Allow additional tags/attributes
  args.selectors = { tags: ['a', 'strong', 'em'], attributes: ['href', 'class'] };
}
```

```html
<ejs-toast (beforeSanitizeHtml)="onBeforeSanitize($event)"></ejs-toast>
```

---

## destroyed Event

Fires after `destroy()` is called and the component is removed from the DOM:

```typescript
public onDestroyed(): void {
  console.log('Toast component destroyed');
  // Clean up references, subscriptions, etc.
}
```

```html
<ejs-toast (destroyed)="onDestroyed()"></ejs-toast>
```

---

## Event-Based Patterns

### Auto-play audio before toast shows
```typescript
public onBeforeOpen(args: ToastBeforeOpenArgs): void {
  const audio = new Audio('notification-sound.mp3');
  audio.play().catch(() => {}); // Catch autoplay policy errors
}
```

### Track analytics on toast open
```typescript
public onOpen(args: ToastOpenArgs): void {
  this.analyticsService.track('notification_shown', {
    title: this.toast.title
  });
}
```

### Clean up state after close
```typescript
public onClose(args: ToastCloseArgs): void {
  this.pendingNotification = null;
  this.changeDetector.detectChanges();
}
```

## See Also
- [How-To: Close Toast on Click](./how-to.md#close-toast-on-click-tap)
- [How-To: Prevent Duplicate Toasts](./how-to.md#prevent-duplicate-toast-display)
- [How-To: Restrict Maximum Toasts](./how-to.md#restrict-the-maximum-toast-to-show)
- [How-To: Prevent Mobile Swipe Close](./how-to.md#prevent-toast-close-with-mobile-swipe)
- [Configuration](./configuration.md) — `showProgressBar`, `showCloseButton`
- [API Reference](./api.md) — Full event argument types
