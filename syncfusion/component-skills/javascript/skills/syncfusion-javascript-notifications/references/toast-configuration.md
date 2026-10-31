# Toast Configuration and Layout

The Syncfusion EJ2 JavaScript Toast component supports extensive configuration options for title, content, target, dimensions, and layout.

## Table of Contents
- [Title and Content](#title-and-content)
- [Custom Target Container](#custom-target-container)
- [Close Button](#close-button)
- [Progress Bar](#progress-bar)
- [Stacking Order](#stacking-order)
- [Width and Height](#width-and-height)
- [Action Buttons](#action-buttons)

---

## Title and Content

The `title` and `content` properties define the toast's headline and body text.

### Plain Text

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Success!',
  content: 'Your changes have been saved.'
});
toastObj.appendTo('#toast');
toastObj.show();
```

### HTML Content

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: '<strong>Build Successful</strong>',
  content: '<p>All 42 tests passed.</p><a href="#">View Details</a>'
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Element Content

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

const contentElement: HTMLElement = document.createElement('div');
contentElement.innerHTML = '<h4>Custom Content</h4><p>This is a custom element.</p>';

let toastObj: Toast = new Toast({
  title: 'Notification',
  content: contentElement
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Only Title (No Content)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Quick notification'
  // No content
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Only Content (No Title)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  content: 'This toast has no title, just a message.'
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Custom Target Container

By default, Toast renders in `document.body`. Use the `target` property to render inside a specific container.

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Scoped Toast',
  content: 'Rendered inside a custom container',
  target: '#toast-container',
  position: { X: 'Right', Y: 'Bottom' }
});
toastObj.appendTo('#toast-container');
toastObj.show();
```

**HTML:**

```html
<div id="toast-container" style="width: 400px; height: 300px; border: 1px solid #ccc; position: relative;"></div>
```

**Use Cases:**
- Modals and dialogs
- Side panels
- Scoped notification areas
- Embedded forms

---

## Close Button

Display a close (X) button using the `showCloseButton` property.

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Dismissible Toast',
  content: 'Click the X to close',
  showCloseButton: true
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Default:** `showCloseButton: false`

---

## Progress Bar

Display a progress bar that shows the remaining time before auto-dismissal.

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Auto-dismissing',
  content: 'This toast will dismiss in 5 seconds',
  timeOut: 5000,
  showProgressBar: true,
  progressDirection: 'Ltr'  // or 'Rtl'
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Progress Bar Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showProgressBar` | `boolean` | `false` | Shows/hides progress bar |
| `progressDirection` | `string` | `'Ltr'` | Progress direction: `Ltr` or `Rtl` |

---

## Stacking Order

Control the stacking order of multiple toasts using the `newestOnTop` property.

### Newest on Top

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Toast 1',
  content: 'First toast',
  newestOnTop: true,  // New toasts appear on top
  position: { X: 'Right', Y: 'Top' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Newest on Bottom (Default)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Toast 1',
  content: 'First toast',
  newestOnTop: false,  // New toasts appear at bottom
  position: { X: 'Right', Y: 'Top' }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Width and Height

Set custom dimensions using `width` and `height` properties.

### Pixel Dimensions

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Custom Size',
  content: 'This toast has custom dimensions',
  width: 400,
  height: 100
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Percentage Dimensions

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Responsive Toast',
  content: 'This toast adapts to container',
  width: '50%',
  height: 'auto'
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Auto Dimensions (Default)

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Auto Size',
  content: 'Dimensions adjust to content',
  width: 'auto',
  height: 'auto'
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Dimension Values:**

| Value | Description |
|-------|-------------|
| `auto` | Adjusts to content |
| `number` | Pixels |
| `string` | CSS value (e.g., `'50%'`, `'400px'`) |

---

## Action Buttons

Add action buttons to toasts using the `buttons` property.

### Single Button

```typescript
import { Toast, ToastClickEventArgs } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Confirm Action',
  content: 'Do you want to proceed?',
  showCloseButton: true,
  buttons: [{
    model: { content: 'Yes' },
    click: () => {
      console.log('User clicked Yes');
      toastObj.hide();
    }
  }]
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Multiple Buttons

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Delete File',
  content: 'Are you sure you want to delete this file?',
  showCloseButton: true,
  buttons: [
    {
      model: { content: 'Delete', cssClass: 'e-danger' },
      click: () => {
        console.log('File deleted');
        toastObj.hide();
      }
    },
    {
      model: { content: 'Cancel' },
      click: () => {
        console.log('Action cancelled');
        toastObj.hide();
      }
    }
  ]
});
toastObj.appendTo('#toast');
toastObj.show();
```

### Button with Custom Click Handler

```typescript
import { Toast, ButtonPropsModel } from '@syncfusion/ej2-notifications';

const undoButton: ButtonPropsModel = {
  model: { content: 'Undo', isPrimary: true },
  click: () => {
    console.log('Undo clicked');
    toastObj.hide();
  }
};

let toastObj: Toast = new Toast({
  title: 'Item Deleted',
  content: 'The item has been removed',
  showCloseButton: false,
  buttons: [undoButton],
  timeOut: 10000
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Complete Configuration Example

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Complete Configuration',
  content: 'This toast demonstrates all configuration options',
  position: { X: 'Right', Y: 'Top' },
  target: 'body',
  width: 350,
  height: 'auto',
  showCloseButton: true,
  showProgressBar: true,
  progressDirection: 'Ltr',
  newestOnTop: true,
  timeOut: 5000,
  extendedTimeout: 1000,
  cssClass: 'custom-toast',
  buttons: [
    {
      model: { content: 'View', isPrimary: true },
      click: () => console.log('View clicked')
    },
    {
      model: { content: 'Dismiss' },
      click: () => toastObj.hide()
    }
  ]
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string \| HTMLElement` | `''` | Toast title |
| `content` | `string \| HTMLElement` | `''` | Toast content |
| `target` | `string \| HTMLElement` | `'body'` | Target container |
| `showCloseButton` | `boolean` | `false` | Shows close button |
| `showProgressBar` | `boolean` | `false` | Shows progress bar |
| `progressDirection` | `string` | `'Ltr'` | Progress direction |
| `newestOnTop` | `boolean` | `false` | New toasts on top |
| `width` | `number \| string` | `'auto'` | Toast width |
| `height` | `number \| string` | `'auto'` | Toast height |
| `buttons` | `ButtonPropsModel[]` | `[]` | Action buttons |

For complete API details, see [toast-api.md](./toast-api.md).
