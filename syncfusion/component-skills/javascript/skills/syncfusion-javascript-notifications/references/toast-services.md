# Toast Services and Advanced Patterns

The Syncfusion EJ2 JavaScript Toast component provides `ToastUtility` for quick toasts and advanced patterns for managing multiple toasts.

## Table of Contents
- [ToastUtility.show()](#toastutilityshow)
- [Predefined Types](#predefined-types)
- [Full ToastModel with ToastUtility](#full-toastmodel-with-toastutility)
- [Playing Audio on BeforeOpen](#playing-audio-on-beforeopen)
- [Restricting Maximum Toasts](#restricting-maximum-toasts)
- [Preventing Duplicate Toasts](#preventing-duplicate-toasts)
- [Advanced Patterns](#advanced-patterns)

---

## ToastUtility.show()

`ToastUtility.show()` displays a toast instantly without creating a component instance. This is the quickest way to show simple toasts.

### Basic Usage

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

// Show with title, content, and timeout
ToastUtility.show('File saved successfully', 'Success', 3000);

// Show with only content
ToastUtility.show('Quick notification');

// Show with content and timeout
ToastUtility.show('Connection lost', 5000);
```

**Method Signature:**

```typescript
ToastUtility.show(content: string, title?: string, timeout?: number): void
```

---

## Predefined Types

The `title` parameter accepts predefined type names that automatically apply semantic styling:

| Type | CSS Class | Icon | Use Case |
|------|-----------|------|----------|
| `'Success'` | `e-toast-success` | Check icon | Successful operations |
| `'Information'` | `e-toast-info` | Info icon | General information |
| `'Error'` | `e-toast-danger` | Error icon | Failed operations |
| `'Warning'` | `e-toast-warning` | Warning icon | Cautionary messages |

### Success Toast

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

ToastUtility.show('File saved successfully', 'Success', 3000);
```

### Information Toast

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

ToastUtility.show('New update available', 'Information', 4000);
```

### Error Toast

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

ToastUtility.show('Connection failed', 'Error', 5000);
```

### Warning Toast

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

ToastUtility.show('Disk space low', 'Warning', 0);  // Persistent
```

---

## Full ToastModel with ToastUtility

Pass a complete `ToastModel` to `ToastUtility.show()` for advanced configuration:

```typescript
import { ToastUtility, ToastModel } from '@syncfusion/ej2-notifications';

const toastModel: ToastModel = {
  title: 'Custom Toast',
  content: 'This toast uses a full model',
  position: { X: 'Right', Y: 'Top' },
  timeOut: 5000,
  showCloseButton: true,
  showProgressBar: true,
  cssClass: 'e-toast-success',
  icon: 'e-success'
};

ToastUtility.show(toastModel);
```

---

## Playing Audio on BeforeOpen

Play a sound when a toast appears using the `beforeOpen` event:

```typescript
import { Toast, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';

let audio: HTMLAudioElement = new Audio('notification.mp3');

let toastObj: Toast = new Toast({
  title: 'Audio Notification',
  content: 'Plays a sound when shown',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    audio.play().catch(err => console.error('Audio play failed:', err));
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Different Sounds for Different Toasts

```typescript
import { Toast, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';

const successSound: HTMLAudioElement = new Audio('success.mp3');
const errorSound: HTMLAudioElement = new Audio('error.mp3');
const warningSound: HTMLAudioElement = new Audio('warning.mp3');

function showToastWithSound(type: string, message: string): void {
  const toastObj: Toast = new Toast({
    title: type,
    content: message,
    cssClass: `e-toast-${type.toLowerCase()}`,
    beforeOpen: (args: ToastBeforeOpenArgs) => {
      switch (type) {
        case 'Success':
          successSound.play().catch(() => {});
          break;
        case 'Error':
          errorSound.play().catch(() => {});
          break;
        case 'Warning':
          warningSound.play().catch(() => {});
          break;
      }
    }
  });
  toastObj.appendTo('#toast');
  toastObj.show();
}

// Usage
showToastWithSound('Success', 'File saved');
showToastWithSound('Error', 'Connection failed');
showToastWithSound('Warning', 'Disk space low');
```

---

## Restricting Maximum Toasts

Limit the number of simultaneous toasts using the `beforeOpen` event:

```typescript
import { Toast, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';

const MAX_TOASTS: number = 3;

let toastObj: Toast = new Toast({
  title: 'Limited Toast',
  content: 'Maximum 3 toasts at a time',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    const container: HTMLElement = toastObj.element.parentElement!;
    if (container.childElementCount > MAX_TOASTS) {
      args.cancel = true;
    }
  }
});
toastObj.appendTo('#toast-container');
```

### Dynamic Limit

```typescript
import { Toast, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';

let maxToasts: number = 5;
let activeToasts: number = 0;

let toastObj: Toast = new Toast({
  title: 'Dynamic Limit',
  content: 'Adjusts max toasts dynamically',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    if (activeToasts >= maxToasts) {
      args.cancel = true;
    } else {
      activeToasts++;
    }
  },
  close: () => {
    activeToasts--;
  }
});
toastObj.appendTo('#toast-container');
```

---

## Preventing Duplicate Toasts

Prevent showing duplicate toasts using the `beforeOpen` event:

```typescript
import { Toast, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';

let recentToasts: Set<string> = new Set();

let toastObj: Toast = new Toast({
  title: 'Duplicate Prevention',
  content: 'Prevents duplicate toasts',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    const key: string = toastObj.content as string;
    if (recentToasts.has(key)) {
      args.cancel = true;
    } else {
      recentToasts.add(key);
      // Remove from set after 5 seconds
      setTimeout(() => recentToasts.delete(key), 5000);
    }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Time-Based Duplicate Prevention

```typescript
import { Toast, ToastBeforeOpenArgs } from '@syncfusion/ej2-notifications';

let lastToastTime: { [key: string]: number } = {};
const DUPLICATE_THRESHOLD: number = 3000; // 3 seconds

let toastObj: Toast = new Toast({
  title: 'Time-Based Prevention',
  content: 'Prevents duplicates within 3 seconds',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    const key: string = toastObj.content as string;
    const now: number = Date.now();
    
    if (lastToastTime[key] && (now - lastToastTime[key]) < DUPLICATE_THRESHOLD) {
      args.cancel = true;
    } else {
      lastToastTime[key] = now;
    }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Advanced Patterns

### Toast Queue System

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

interface QueuedToast {
  title: string;
  content: string;
  type: string;
}

let toastQueue: QueuedToast[] = [];
let isShowing: boolean = false;

function enqueueToast(toast: QueuedToast): void {
  toastQueue.push(toast);
  processQueue();
}

function processQueue(): void {
  if (isShowing || toastQueue.length === 0) return;
  
  isShowing = true;
  const toast: QueuedToast = toastQueue.shift()!;
  
  const toastObj: Toast = new Toast({
    title: toast.title,
    content: toast.content,
    cssClass: `e-toast-${toast.type.toLowerCase()}`,
    timeOut: 3000,
    close: () => {
      isShowing = false;
      processQueue();
    }
  });
  toastObj.appendTo('#toast');
  toastObj.show();
}

// Usage
enqueueToast({ title: 'First', content: 'First toast', type: 'Success' });
enqueueToast({ title: 'Second', content: 'Second toast', type: 'Info' });
enqueueToast({ title: 'Third', content: 'Third toast', type: 'Warning' });
```

### Toast with Action Callback

```typescript
import { Toast, ButtonPropsModel } from '@syncfusion/ej2-notifications';

function showConfirmToast(message: string, onConfirm: () => void, onCancel: () => void): void {
  const toastObj: Toast = new Toast({
    title: 'Confirm Action',
    content: message,
    showCloseButton: true,
    timeOut: 0,
    buttons: [
      {
        model: { content: 'Confirm', isPrimary: true },
        click: () => {
          onConfirm();
          toastObj.hide();
        }
      },
      {
        model: { content: 'Cancel' },
        click: () => {
          onCancel();
          toastObj.hide();
        }
      }
    ]
  });
  toastObj.appendTo('#toast');
  toastObj.show();
}

// Usage
showConfirmToast(
  'Delete this file?',
  () => console.log('Confirmed'),
  () => console.log('Cancelled')
);
```

---

## API Reference

| Method | Description |
|--------|-------------|
| `ToastUtility.show()` | Shows a toast instantly |
| `Toast.show()` | Shows the toast instance |
| `Toast.hide()` | Hides the toast instance |

For complete API details, see [toast-api.md](./toast-api.md).
