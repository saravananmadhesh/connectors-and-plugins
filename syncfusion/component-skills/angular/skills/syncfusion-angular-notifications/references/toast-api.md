# API Reference — Syncfusion Angular Toast

**Source:** https://ej2.syncfusion.com/angular/documentation/api/toast/index-default  
**Component:** `ToastComponent` (`<ejs-toast>`)  
**Package:** `@syncfusion/ej2-angular-notifications`

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Model Interfaces](#model-interfaces)

---

## Import

```typescript
import {
  ToastModule,
  ToastComponent,
  ToastAnimationSettingsModel,
  ToastPositionModel,
  ToastModel,
  ToastBeforeOpenArgs,
  ToastBeforeCloseArgs,
  ToastOpenArgs,
  ToastCloseArgs,
  ToastClickEventArgs,
  BeforeSanitizeHtmlArgs,
  ToastUtility
} from '@syncfusion/ej2-angular-notifications';

import { ButtonModelPropsModel } from '@syncfusion/ej2-angular-buttons';
```

---

## Properties

### animation
**Type:** `ToastAnimationSettingsModel`  
**Default:** `{ show: { effect: 'FadeIn', duration: 600, easing: 'linear' }, hide: { effect: 'FadeOut', duration: 600, easing: 'linear' } }`

Specifies the animation configuration settings for showing and hiding the Toast.

```typescript
public showAnimation: ToastAnimationSettingsModel = {
  show: { effect: 'FadeIn', duration: 600, easing: 'linear' },
  hide: { effect: 'FadeOut', duration: 600, easing: 'linear' }
};
```
```html
<ejs-toast [animation]="showAnimation"></ejs-toast>
```

---

### buttons
**Type:** `ButtonModelPropsModel[]`  
**Default:** `[{}]`

Specifies the collection of Toast action buttons rendered with `ButtonModelPropsModel` properties and click handlers.

```typescript
import { ButtonModelPropsModel } from '@syncfusion/ej2-angular-buttons';

public buttons: ButtonModelPropsModel[] = [
  {
    model: { content: 'Undo', cssClass: 'e-primary' },
    click: () => { console.log('Undo clicked'); }
  },
  {
    model: { content: 'Dismiss' }
  }
];
```
```html
<ejs-toast [buttons]="buttons"></ejs-toast>
```

---

### content
**Type:** `any`  
**Default:** `null`

Specifies the content to be displayed on the Toast. Accepts selectors, string values, and HTML elements.

```html
<ejs-toast content="Your file has been saved."></ejs-toast>
```
```typescript
// Or via ng-template (preferred in Angular)
// <ng-template #content><div>Custom content</div></ng-template>
```

---

### cssClass
**Type:** `string`  
**Default:** `null`

Defines one or more CSS classes (space-separated) for customization. Use predefined semantic classes or custom ones.

| Predefined Value | Effect |
|---|---|
| `e-toast-success` | Green success styling |
| `e-toast-info` | Blue info styling |
| `e-toast-warning` | Orange warning styling |
| `e-toast-danger` | Red danger/error styling |

```html
<ejs-toast cssClass="e-toast-success"></ejs-toast>
<ejs-toast cssClass="my-custom-toast e-toast-info"></ejs-toast>
```

---

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`

Defines whether to sanitize cross-site scripting (XSS) in HTML content. Set to `false` only for fully trusted content.

```html
<ejs-toast [enableHtmlSanitizer]="true"></ejs-toast>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting the component's state between page reloads.

```html
<ejs-toast [enablePersistence]="false"></ejs-toast>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enable or disable rendering the component in right-to-left direction.

```html
<ejs-toast [enableRtl]="true"></ejs-toast>
```

---

### extendedTimeout
**Type:** `number`  
**Default:** `1000`

Specifies the Toast display time duration (in milliseconds) after the user interacts with (hovers over) the Toast.

```html
<ejs-toast [extendedTimeout]="3000"></ejs-toast>
```

---

### height
**Type:** `string | number`  
**Default:** `'auto'`

Specifies the height of the Toast in pixels, number, or percentage. A number value is treated as pixels.

```html
<ejs-toast height="120"></ejs-toast>
<ejs-toast height="auto"></ejs-toast>
```

---

### icon
**Type:** `string`  
**Default:** `null`

Defines CSS classes to specify an icon displayed at the top-left corner of the Toast.

```html
<ejs-toast icon="e-icons e-check-circle"></ejs-toast>
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

```html
<ejs-toast locale="ar"></ejs-toast>
```

---

### newestOnTop
**Type:** `boolean`  
**Default:** `true`

Specifies whether newly created Toast messages display before existing ones (`true`) or after (`false`).

```html
<!-- Newest toast appears above older ones (default) -->
<ejs-toast [newestOnTop]="true"></ejs-toast>
```

---

### position
**Type:** `ToastPositionModel`  
**Default:** `{ X: 'Left', Y: 'Top' }`

Specifies the position of the Toast message within the target container.

- **X values:** `'Left'` | `'Center'` | `'Right'` | pixel/percent string
- **Y values:** `'Top'` | `'Bottom'` | pixel/percent string

> Position updates only take effect after all currently visible toasts are removed.

```typescript
public position: ToastPositionModel = { X: 'Right', Y: 'Top' };
```
```html
<ejs-toast [position]="position"></ejs-toast>
```

---

### progressDirection
**Type:** `ProgressDirectionType` (`'Ltr'` | `'Rtl'`)  
**Default:** `'Rtl'`

Specifies the progress bar fill direction.
- `'Rtl'` — bar shrinks from right to left (default)
- `'Ltr'` — bar shrinks from left to right

```html
<ejs-toast [showProgressBar]="true" progressDirection="Ltr"></ejs-toast>
```

---

### showCloseButton
**Type:** `boolean`  
**Default:** `false`

Specifies whether to show a close (×) button to manually dismiss the Toast.

```html
<ejs-toast [showCloseButton]="true"></ejs-toast>
```

---

### showProgressBar
**Type:** `boolean`  
**Default:** `false`

Specifies whether to show a progress bar indicating the remaining display time. Requires `timeOut > 0`.

```html
<ejs-toast [showProgressBar]="true" [timeOut]="5000"></ejs-toast>
```

---

### target
**Type:** `HTMLElement | Element | string`  
**Default:** `null` (renders in `document.body`)

Specifies the target container where the Toast renders. When set, positions are relative to this container.

```typescript
public target: string = '#notification-area';
```
```html
<ejs-toast [target]="target"></ejs-toast>
```

---

### template
**Type:** `any`  
**Default:** `null`

Specifies an HTML element, element ID selector string, or `ng-template` reference as the complete Toast layout. When set, `title` and `content` properties are ignored.

```typescript
// HTML string
public template: string = '<div class="custom">Custom Toast</div>';
// Element ID selector
public template: string = '#myToastTemplate';
```
```html
<!-- Or via ng-template inside <ejs-toast> -->
<ejs-toast>
  <ng-template #template>
    <div>Custom layout here</div>
  </ng-template>
</ejs-toast>
```

---

### timeOut
**Type:** `number`  
**Default:** `5000`

Specifies the Toast display duration in milliseconds. Set to `0` for a static toast that persists until manually closed.

```html
<ejs-toast [timeOut]="3000"></ejs-toast>
<!-- Static toast -->
<ejs-toast [timeOut]="0" [showCloseButton]="true"></ejs-toast>
```

---

### title
**Type:** `any`  
**Default:** `null`

Specifies the title to be displayed on the Toast. Accepts selectors, string values, and HTML elements.

```html
<ejs-toast title="Upload Complete"></ejs-toast>
```
```html
<!-- Or via ng-template -->
<ejs-toast>
  <ng-template #title><div>Upload Complete</div></ng-template>
</ejs-toast>
```

---

### width
**Type:** `string | number`  
**Default:** `'300'`

Specifies the width of the Toast in pixels, number, or percentage. Number values are treated as pixels. On mobile, default width is `100%`.

```html
<ejs-toast width="400"></ejs-toast>
<ejs-toast width="100%"></ejs-toast>
<ejs-toast width="50%"></ejs-toast>
```

> When `width` is `'100%'`, the X position has no effect. Use with `Y: 'Top'` or `Y: 'Bottom'` for banner toasts.

---

## Methods

### show()
**Signature:** `show(toastObj?: ToastModel): void`

Shows the Toast element on the document. Optionally pass a `ToastModel` to override properties for this specific toast instance.

```typescript
// Show with component's bound properties
this.toast.show();

// Show with overridden properties
this.toast.show({
  title: 'Success',
  content: 'Record saved.',
  cssClass: 'e-toast-success',
  timeOut: 3000
});
```

---

### hide()
**Signature:** `hide(element?: HTMLElement | Element | string): void`

Hides Toast elements from the document.

```typescript
// Hide a specific toast element
this.toast.hide(toastElement);

// Hide all currently visible toasts
this.toast.hide('All');
```

---

### destroy()
**Signature:** `destroy(): void`

Removes the component from the DOM and detaches all related event handlers, attributes, and classes.

```typescript
this.toast.destroy();
```

---

## Events

### beforeClose
**Type:** `EmitType<ToastBeforeCloseArgs>`

Triggers before the toast begins its hide animation. Set `args.cancel = true` to prevent closing.

```typescript
import { ToastBeforeCloseArgs } from '@syncfusion/ej2-angular-notifications';

onBeforeClose(args: ToastBeforeCloseArgs): void {
  if (args.type === 'swipe') {
    args.cancel = true; // Prevent swipe-to-dismiss
  }
}
```
```html
<ejs-toast (beforeClose)="onBeforeClose($event)"></ejs-toast>
```

**`ToastBeforeCloseArgs` properties:**
| Property | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to `true` to cancel the close |
| `type` | `string` | Close trigger: `'timeout'`, `'swipe'`, `'close button'`, `'hide method'` |
| `element` | `HTMLElement` | The toast DOM element |
| `toastObj` | `ToastComponent` | Component reference |

---

### beforeOpen
**Type:** `EmitType<ToastBeforeOpenArgs>`

Triggers before the toast is shown. Set `args.cancel = true` to prevent the toast from displaying.

```typescript
import { ToastBeforeOpenArgs } from '@syncfusion/ej2-angular-notifications';

onBeforeOpen(args: ToastBeforeOpenArgs): void {
  // Prevent showing based on custom condition
  if (this.shouldBlock()) {
    args.cancel = true;
  }
}
```
```html
<ejs-toast (beforeOpen)="onBeforeOpen($event)"></ejs-toast>
```

**`ToastBeforeOpenArgs` properties:**
| Property | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Set to `true` to cancel showing |
| `element` | `HTMLElement` | The toast DOM element |
| `toastObj` | `ToastComponent` | Component reference |

---

### beforeSanitizeHtml
**Type:** `EmitType<BeforeSanitizeHtmlArgs>`

Triggers before the HTML value is sanitized. Use to customize allowed tags and attributes.

```typescript
import { BeforeSanitizeHtmlArgs } from '@syncfusion/ej2-angular-notifications';

onBeforeSanitize(args: BeforeSanitizeHtmlArgs): void {
  args.selectors = { tags: ['a', 'strong'], attributes: ['href'] };
}
```
```html
<ejs-toast (beforeSanitizeHtml)="onBeforeSanitize($event)"></ejs-toast>
```

---

### click
**Type:** `EmitType<ToastClickEventArgs>`

Fires when the user clicks on the Toast body. Set `args.clickToClose = true` to dismiss on click.

```typescript
import { ToastClickEventArgs } from '@syncfusion/ej2-angular-notifications';

onClick(args: ToastClickEventArgs): void {
  args.clickToClose = true;
}
```
```html
<ejs-toast (click)="onClick($event)"></ejs-toast>
```

**`ToastClickEventArgs` properties:**
| Property | Type | Description |
|---|---|---|
| `clickToClose` | `boolean` | Set to `true` to close toast on click |
| `element` | `HTMLElement` | The toast DOM element |
| `originalEvent` | `MouseEvent` | The original click event |
| `toastObj` | `ToastComponent` | Component reference |

---

### close
**Type:** `EmitType<ToastCloseArgs>`

Triggers after the Toast finishes hiding (after the hide animation completes).

```typescript
import { ToastCloseArgs } from '@syncfusion/ej2-angular-notifications';

onClose(args: ToastCloseArgs): void {
  console.log('Toast dismissed', args.element);
}
```
```html
<ejs-toast (close)="onClose($event)"></ejs-toast>
```

---

### created
**Type:** `EmitType<Event>`

Triggers after the Toast component is created and initialized. Safe to call `show()` here.

```typescript
onCreated(): void {
  this.toast.show();
}
```
```html
<ejs-toast (created)="onCreated()"></ejs-toast>
```

---

### destroyed
**Type:** `EmitType<Event>`

Triggers after the Toast component is destroyed via `destroy()`.

```typescript
onDestroyed(): void {
  console.log('Toast destroyed — clean up references');
}
```
```html
<ejs-toast (destroyed)="onDestroyed()"></ejs-toast>
```

---

### open
**Type:** `EmitType<ToastOpenArgs>`

Triggers after the Toast is shown and fully visible on the target container.

```typescript
import { ToastOpenArgs } from '@syncfusion/ej2-angular-notifications';

onOpen(args: ToastOpenArgs): void {
  console.log('Toast visible', args.element);
}
```
```html
<ejs-toast (open)="onOpen($event)"></ejs-toast>
```

---

## Model Interfaces

### ToastAnimationSettingsModel
```typescript
{
  show?: {
    effect?: string;    // Animation effect name (e.g., 'FadeIn', 'SlideRightIn')
    duration?: number;  // Duration in ms (default: 600)
    easing?: string;    // CSS easing (default: 'linear')
  };
  hide?: {
    effect?: string;    // Animation effect name (e.g., 'FadeOut', 'SlideRightOut')
    duration?: number;
    easing?: string;
  };
}
```

### ToastPositionModel
```typescript
{
  X?: 'Left' | 'Center' | 'Right' | string | number;  // Default: 'Left'
  Y?: 'Top' | 'Bottom' | string | number;              // Default: 'Top'
}
```

### ButtonModelPropsModel
```typescript
{
  model?: {
    content?: string;
    cssClass?: string;
    isPrimary?: boolean;
    disabled?: boolean;
    iconCss?: string;
    iconPosition?: string;
  };
  click?: EmitType<Event>;
}
```

### ToastModel (for show() and ToastUtility)
All component properties are available as `ToastModel` fields when passing to `show()` or `ToastUtility.show()`:
```typescript
{
  title?: any;
  content?: any;
  template?: any;
  timeOut?: number;
  extendedTimeout?: number;
  position?: ToastPositionModel;
  showCloseButton?: boolean;
  showProgressBar?: boolean;
  progressDirection?: 'Ltr' | 'Rtl';
  newestOnTop?: boolean;
  cssClass?: string;
  icon?: string;
  target?: HTMLElement | Element | string;
  width?: string | number;
  height?: string | number;
  buttons?: ButtonModelPropsModel[];
  animation?: ToastAnimationSettingsModel;
  enableRtl?: boolean;
  locale?: string;
  enableHtmlSanitizer?: boolean;
  // Events
  created?: EmitType<Event>;
  open?: EmitType<ToastOpenArgs>;
  close?: EmitType<ToastCloseArgs>;
  click?: EmitType<ToastClickEventArgs>;
  beforeOpen?: EmitType<ToastBeforeOpenArgs>;
  beforeClose?: EmitType<ToastBeforeCloseArgs>;
  beforeSanitizeHtml?: EmitType<BeforeSanitizeHtmlArgs>;
  destroyed?: EmitType<Event>;
}
```

---

## ToastUtility

Static utility class for displaying toasts without a component template.

```typescript
import { ToastUtility } from '@syncfusion/ej2-angular-notifications';

// Predefined type
ToastUtility.show(content: string, type: 'Information' | 'Success' | 'Error' | 'Warning', timeOut: number): ToastModel

// Full ToastModel
ToastUtility.show(toastModel: ToastModel): ToastModel
```

**Examples:**
```typescript
// Quick typed notifications
ToastUtility.show('Saved!', 'Success', 3000);
ToastUtility.show('Network error.', 'Error', 5000);
ToastUtility.show('Low storage.', 'Warning', 4000);
ToastUtility.show('Update ready.', 'Information', 3000);

// Full model
const toastRef = ToastUtility.show({
  title: 'Custom',
  content: 'Full model toast',
  position: { X: 'Right', Y: 'Bottom' },
  timeOut: 5000,
  showCloseButton: true
});

// Hide programmatically
(toastRef as any).hide('All');
```
