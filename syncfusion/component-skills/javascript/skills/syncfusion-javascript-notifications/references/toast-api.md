# Toast API Reference

Complete API reference for the Syncfusion EJ2 JavaScript Toast component.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces](#interfaces)
- [Enumerations](#enumerations)
- [Type Definitions](#type-definitions)
- [ToastUtility Methods](#toastutility-methods)

---

## Properties

### title

Gets or sets the title of the toast.

| | |
|---|---|
| **Type** | `string \| HTMLElement` |
| **Default** | `''` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Success!'
});
```

### content

Gets or sets the content of the toast.

| | |
|---|---|
| **Type** | `string \| HTMLElement` |
| **Default** | `''` |

```typescript
let toastObj: Toast = new Toast({
  content: 'Your changes have been saved.'
});
```

### position

Gets or sets the position of the toast.

| | |
|---|---|
| **Type** | `ToastPosition` |
| **Default** | `{ X: 'Left', Y: 'Top' }` |

```typescript
let toastObj: Toast = new Toast({
  position: { X: 'Right', Y: 'Bottom' }
});
```

### target

Gets or sets the target container for the toast.

| | |
|---|---|
| **Type** | `string \| HTMLElement` |
| **Default** | `'body'` |

```typescript
let toastObj: Toast = new Toast({
  target: '#toast-container'
});
```

### width

Gets or sets the width of the toast.

| | |
|---|---|
| **Type** | `number \| string` |
| **Default** | `'auto'` |

```typescript
let toastObj: Toast = new Toast({
  width: 400  // or '50%'
});
```

### height

Gets or sets the height of the toast.

| | |
|---|---|
| **Type** | `number \| string` |
| **Default** | `'auto'` |

```typescript
let toastObj: Toast = new Toast({
  height: 100  // or 'auto'
});
```

### timeOut

Gets or sets the auto-dismiss timeout in milliseconds. Set to 0 for persistent toast.

| | |
|---|---|
| **Type** | `number` |
| **Default** | `5000` |

```typescript
let toastObj: Toast = new Toast({
  timeOut: 0  // Persistent
});
```

### extendedTimeout

Gets or sets the extended timeout on hover in milliseconds.

| | |
|---|---|
| **Type** | `number` |
| **Default** | `1000` |

```typescript
let toastObj: Toast = new Toast({
  extendedTimeout: 2000
});
```

### showCloseButton

Gets or sets whether to show the close button.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let toastObj: Toast = new Toast({
  showCloseButton: true
});
```

### showProgressBar

Gets or sets whether to show the progress bar.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let toastObj: Toast = new Toast({
  showProgressBar: true
});
```

### progressDirection

Gets or sets the progress bar direction.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Ltr'` |
| **Values** | `'Ltr' \| 'Rtl'` |

```typescript
let toastObj: Toast = new Toast({
  showProgressBar: true,
  progressDirection: 'Rtl'
});
```

### newestOnTop

Gets or sets whether new toasts appear on top.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let toastObj: Toast = new Toast({
  newestOnTop: true
});
```

### template

Gets or sets the custom template for the toast.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let toastObj: Toast = new Toast({
  template: '<div class="custom-toast">Custom content</div>'
});
```

### cssClass

Gets or sets custom CSS classes.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let toastObj: Toast = new Toast({
  cssClass: 'custom-toast'
});
```

### icon

Gets or sets the icon class.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let toastObj: Toast = new Toast({
  icon: 'e-success'
});
```

### animation

Gets or sets the animation settings.

| | |
|---|---|
| **Type** | `ToastAnimationSettingsModel` |
| **Default** | `{ show: { effect: 'FadeIn' }, hide: { effect: 'FadeOut' } }` |

```typescript
let toastObj: Toast = new Toast({
  animation: {
    show: { effect: 'SlideBottomIn', duration: 500 },
    hide: { effect: 'FadeOut', duration: 300 }
  }
});
```

### buttons

Gets or sets the action buttons.

| | |
|---|---|
| **Type** | `ButtonPropsModel[]` |
| **Default** | `[]` |

```typescript
let toastObj: Toast = new Toast({
  buttons: [
    {
      model: { content: 'OK' },
      click: () => toastObj.hide()
    }
  ]
});
```

### enableRtl

Gets or sets whether to enable right-to-left layout.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let toastObj: Toast = new Toast({
  enableRtl: true
});
```

### enablePersistence

Gets or sets whether to enable state persistence.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let toastObj: Toast = new Toast({
  enablePersistence: true
});
```

### locale

Gets or sets the locale for internationalization.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'en-US'` |

```typescript
let toastObj: Toast = new Toast({
  locale: 'fr-FR'
});
```

---

## Methods

### show()

Shows the toast.

| | |
|---|---|
| **Returns** | `void` |
| **Parameters** | `toastModel?: ToastModel` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content'
});
toastObj.appendTo('#toast');
toastObj.show();

// Show with dynamic content
toastObj.show({
  title: 'Dynamic',
  content: 'Updated content'
});
```

### hide()

Hides the toast.

| | |
|---|---|
| **Returns** | `void` |

```typescript
toastObj.hide();
```

### destroy()

Destroys the toast component.

| | |
|---|---|
| **Returns** | `void` |

```typescript
toastObj.destroy();
```

---

## Events

### beforeOpen

Triggered before the toast opens.

| | |
|---|---|
| **Event Args** | `ToastBeforeOpenArgs` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    console.log('Toast about to open');
    if (args.cancel) {
      console.log('Open was cancelled');
    }
  }
});
```

### open

Triggered after the toast opens.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  open: () => {
    console.log('Toast opened');
  }
});
```

### click

Triggered when the toast is clicked.

| | |
|---|---|
| **Event Args** | `ToastClickEventArgs` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  click: (args: ToastClickEventArgs) => {
    console.log('Toast clicked');
    if (args.clickToClose) {
      toastObj.hide();
    }
  }
});
```

### beforeClose

Triggered before the toast closes.

| | |
|---|---|
| **Event Args** | `ToastBeforeCloseArgs` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  beforeClose: (args: ToastBeforeCloseArgs) => {
    console.log('Toast about to close');
  }
});
```

### close

Triggered after the toast closes.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  close: () => {
    console.log('Toast closed');
  }
});
```

### created

Triggered after the component is created.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  created: () => {
    console.log('Toast created');
  }
});
```

### destroyed

Triggered after the component is destroyed.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: 'Content',
  destroyed: () => {
    console.log('Toast destroyed');
  }
});
```

### beforeSanitizeHtml

Triggered before HTML is sanitized.

| | |
|---|---|
| **Event Args** | `ToastBeforeSanitizeHtmlArgs` |

```typescript
let toastObj: Toast = new Toast({
  title: 'Toast',
  content: '<script>alert("xss")</script>',
  beforeSanitizeHtml: (args: ToastBeforeSanitizeHtmlArgs) => {
    console.log('Sanitizing HTML:', args.html);
  }
});
```

---

## Interfaces

### ToastPosition

```typescript
interface ToastPosition {
  X: 'Left' | 'Center' | 'Right' | number | string;
  Y: 'Top' | 'Middle' | 'Bottom' | number | string;
}
```

### ToastBeforeOpenArgs

```typescript
interface ToastBeforeOpenArgs {
  cancel: boolean;
  element: HTMLElement;
  event?: Event;
}
```

### ToastClickEventArgs

```typescript
interface ToastClickEventArgs {
  clickToClose: boolean;
  element: HTMLElement;
  event: Event;
  originalEvent: MouseEvent;
  target: HTMLElement;
}
```

### ToastBeforeCloseArgs

```typescript
interface ToastBeforeCloseArgs {
  cancel: boolean;
  element: HTMLElement;
  event?: Event;
}
```

### ToastBeforeSanitizeHtmlArgs

```typescript
interface ToastBeforeSanitizeHtmlArgs {
  html: string;
  selector?: string;
}
```

### ButtonPropsModel

```typescript
interface ButtonPropsModel {
  model: ButtonModel;
  click?: (args: Event) => void;
}
```

### ToastAnimationSettingsModel

```typescript
interface ToastAnimationSettingsModel {
  show?: ToastAnimationEffect;
  hide?: ToastAnimationEffect;
}

interface ToastAnimationEffect {
  effect?: string;
  duration?: number;
  delay?: number;
}
```

### ToastModel

```typescript
interface ToastModel {
  title?: string | HTMLElement;
  content?: string | HTMLElement;
  position?: ToastPosition;
  target?: string | HTMLElement;
  width?: number | string;
  height?: number | string;
  timeOut?: number;
  extendedTimeout?: number;
  showCloseButton?: boolean;
  showProgressBar?: boolean;
  progressDirection?: 'Ltr' | 'Rtl';
  newestOnTop?: boolean;
  template?: string;
  cssClass?: string;
  icon?: string;
  animation?: ToastAnimationSettingsModel;
  buttons?: ButtonPropsModel[];
  enableRtl?: boolean;
  enablePersistence?: boolean;
  locale?: string;
}
```

---

## Enumerations

### Predefined Toast Types (for ToastUtility)

| Value | Description |
|-------|-------------|
| `'Success'` | Success message with checkmark icon |
| `'Information'` | Info message with info icon |
| `'Error'` | Error message with error icon |
| `'Warning'` | Warning message with warning icon |

---

## ToastUtility Methods

### ToastUtility.show()

Shows a toast instantly without creating a component instance.

| | |
|---|---|
| **Overloads** | Multiple signatures available |

```typescript
// Signature 1: content, title, timeout
ToastUtility.show(content: string, title?: string, timeout?: number): void

// Signature 2: ToastModel
ToastUtility.show(toastModel: ToastModel): void
```

**Examples:**

```typescript
import { ToastUtility } from '@syncfusion/ej2-notifications';

// Quick success toast
ToastUtility.show('File saved', 'Success', 3000);

// Quick error toast
ToastUtility.show('Connection failed', 'Error', 5000);

// Quick info toast
ToastUtility.show('New update available', 'Information', 4000);

// Persistent warning toast
ToastUtility.show('Disk space low', 'Warning', 0);

// With full model
ToastUtility.show({
  title: 'Custom',
  content: 'Full configuration',
  position: { X: 'Right', Y: 'Top' },
  timeOut: 5000
});
```

---

## Complete Example

```typescript
import { Toast, ToastBeforeOpenArgs, ToastClickEventArgs, ButtonPropsModel } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Complete Toast',
  content: 'All properties configured',
  position: { X: 'Right', Y: 'Bottom' },
  target: 'body',
  width: 350,
  height: 'auto',
  timeOut: 5000,
  extendedTimeout: 1000,
  showCloseButton: true,
  showProgressBar: true,
  progressDirection: 'Ltr',
  newestOnTop: true,
  cssClass: 'e-toast-success',
  icon: 'e-success',
  animation: {
    show: { effect: 'SlideBottomIn', duration: 400 },
    hide: { effect: 'FadeOut', duration: 300 }
  },
  buttons: [
    {
      model: { content: 'View', isPrimary: true },
      click: () => console.log('View clicked')
    }
  ],
  enableRtl: false,
  locale: 'en-US',
  beforeOpen: (args: ToastBeforeOpenArgs) => {
    console.log('Opening');
  },
  open: () => {
    console.log('Opened');
  },
  click: (args: ToastClickEventArgs) => {
    console.log('Clicked');
  },
  beforeClose: (args) => {
    console.log('Closing');
  },
  close: () => {
    console.log('Closed');
  },
  created: () => {
    console.log('Created');
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## See Also

- [toast-getting-started.md](./toast-getting-started.md) - Setup and installation
- [toast-configuration.md](./toast-configuration.md) - Configuration options
- [toast-position.md](./toast-position.md) - Positioning
- [toast-timeout-and-dismissal.md](./toast-timeout-and-dismissal.md) - Timeout and dismissal
- [toast-templates-and-styling.md](./toast-templates-and-styling.md) - Templates and styling
- [toast-animation.md](./toast-animation.md) - Animation effects
- [toast-services.md](./toast-services.md) - ToastUtility and advanced patterns
- [toast-accessibility.md](./toast-accessibility.md) - Accessibility guidelines
