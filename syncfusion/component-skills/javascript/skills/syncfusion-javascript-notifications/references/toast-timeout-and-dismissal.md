# Toast Timeout and Dismissal

The Syncfusion EJ2 JavaScript Toast component supports auto-dismissal timeouts, extended timeouts on hover, and manual dismissal patterns.

## Table of Contents
- [Auto-Dismiss Timeout](#auto-dismiss-timeout)
- [Extended Timeout on Hover](#extended-timeout-on-hover)
- [Static/Persistent Toasts](#staticpersistent-toasts)
- [Click-to-Close](#click-to-close)
- [Preventing Mobile Swipe Dismissal](#preventing-mobile-swipe-dismissal)
- [Manual Show/Hide](#manual-showhide)

---

## Auto-Dismiss Timeout

The `timeOut` property controls how long (in milliseconds) the toast remains visible before auto-dismissing.

### Default Timeout (5000ms)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Default Timeout',
  content: 'Auto-dismisses after 5 seconds',
  timeOut: 5000
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Short Timeout (3 seconds)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Quick Notification',
  content: 'Disappears quickly',
  timeOut: 3000
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Long Timeout (10 seconds)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Long Notification',
  content: 'Stays visible longer',
  timeOut: 10000
});
toastObj.appendTo('#toast');
toastObj.show();
```

### No Timeout (Persistent)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Persistent Toast',
  content: 'Does not auto-dismiss',
  timeOut: 0  // 0 = no auto-dismiss
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Extended Timeout on Hover

The `extendedTimeout` property extends the timeout when the user hovers over the toast, giving them time to interact.

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Hover to Extend',
  content: 'Hover over this toast to extend the timeout',
  timeOut: 3000,
  extendedTimeout: 2000  // Extends 2 seconds on hover
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Behavior:**
- Toast auto-dismisses after `timeOut` milliseconds
- When user hovers, countdown pauses
- After `extendedTimeout` milliseconds of hover, countdown resumes
- If user moves away before extended timeout, full timeout resets

**Default:** `extendedTimeout: 1000`

**Use Cases:**
- Action-required toasts
- Toasts with clickable content
- Toasts users need time to read

---

## Static/Persistent Toasts

Create toasts that don't auto-dismiss and require manual closure.

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Important Notice',
  content: 'Please review and dismiss manually',
  timeOut: 0,  // No auto-dismiss
  showCloseButton: true,  // Show close button
  position: { X: 'Center', Y: 'Top' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Use Cases:**
- Critical notifications
- Action-required messages
- Terms acceptance prompts
- Error messages that need acknowledgment

---

## Click-to-Close

Enable click-to-close functionality using the `clickToClose` property in the `click` event.

```typescript
import { Toast, ToastClickEventArgs } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Click to Close',
  content: 'Click anywhere on this toast to close it',
  click: (args: ToastClickEventArgs) => {
    if (args.clickToClose) {
      toastObj.hide();
    }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Behavior:**
- User clicks anywhere on the toast
- `click` event fires
- If `args.clickToClose` is true, toast dismisses
- If false, custom logic runs

---

## Conditional Click-to-Close

Implement conditional click-to-close based on user interaction:

```typescript
import { Toast, ToastClickEventArgs } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Conditional Close',
  content: 'Click the close button or the toast itself',
  showCloseButton: true,
  click: (args: ToastClickEventArgs) => {
    // Close only if user clicks the toast body, not buttons
    if (args.event.target === args.element) {
      toastObj.hide();
    }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Preventing Mobile Swipe Dismissal

On mobile devices, users can swipe to dismiss toasts. Use the `beforeClose` event to prevent this when needed.

```typescript
import { Toast, ToastBeforeCloseArgs } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Important',
  content: 'This toast cannot be swipe-dismissed on mobile',
  beforeClose: (args: ToastBeforeCloseArgs) => {
    // Prevent swipe dismissal on mobile
    if (args.event && args.event.type === 'touchend') {
      args.cancel = true;
    }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Use Cases:**
- Critical notifications
- Action-required messages
- Toasts with time-sensitive information

---

## Manual Show/Hide

Programmatically control toast visibility:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Manual Control',
  content: 'Use buttons to show/hide',
  timeOut: 0  // Don't auto-dismiss
});
toastObj.appendTo('#toast');

// Show toast
document.getElementById('show-btn')!.addEventListener('click', () => {
  toastObj.show();
});

// Hide toast
document.getElementById('hide-btn')!.addEventListener('click', () => {
  toastObj.hide();
});
```

---

## Conditional Timeout

Different timeouts based on content type:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

function showToast(severity: string, message: string): void {
  let timeout: number;
  
  switch (severity) {
    case 'Error':
      timeout = 0;  // Errors don't auto-dismiss
      break;
    case 'Warning':
      timeout = 7000;  // Warnings stay longer
      break;
    case 'Success':
      timeout = 3000;  // Success dismisses quickly
      break;
    default:
      timeout = 5000;  // Default
  }
  
  const toastObj: Toast = new Toast({
    title: severity,
    content: message,
    timeOut: timeout,
    showCloseButton: timeout === 0
  });
  toastObj.appendTo('#toast');
  toastObj.show();
}

// Usage
showToast('Success', 'File saved');
showToast('Error', 'Connection failed');
showToast('Warning', 'Disk space low');
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `timeOut` | `number` | `5000` | Auto-dismiss timeout in milliseconds (0 = no auto-dismiss) |
| `extendedTimeout` | `number` | `1000` | Extended timeout on hover in milliseconds |
| `showCloseButton` | `boolean` | `false` | Shows close button |
| `clickToClose` | `boolean` | `false` | Click toast to close |

| Method | Description |
|--------|-------------|
| `show()` | Shows the toast |
| `hide()` | Hides the toast |

For complete API details, see [toast-api.md](./toast-api.md).
