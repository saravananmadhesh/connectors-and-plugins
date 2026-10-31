# API Reference — Syncfusion TypeScript Dialog

> **Source:** https://ej2.syncfusion.com/documentation/api/dialog/index-default
>
> All code must use only the APIs documented here. Do not reference properties, methods, or events not listed in this document.

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [AnimationSettingsModel](#animationsettingsmodel)
- [ButtonPropsModel](#buttonpropsmodel)
- [Methods](#methods)
- [Events](#events)

---

## Import

```typescript
import { Dialog, DialogUtility } from '@syncfusion/ej2-popups';
```

---

## Properties

### allowDragging `boolean`

Specifies whether the dialog can be dragged by the end-user. Dragging is done by selecting the header and moving it to reposition the dialog.

- **Defaults to:** `false`
- **Requires:** `header` to be set for dragging to work

```typescript
let dialog: Dialog = new Dialog({
    header: 'dialog',
    content: 'Dialog sample',
    allowDragging: true,
    width: '300px'
});
dialog.appendTo('#dialog');
```

---

### animationSettings `AnimationSettingsModel`

Specifies the animation settings for open and close actions. Configurable via `effect`, `duration`, and `delay`.

- **Defaults to:** `{ effect: 'Fade', duration: 400, delay: 0 }`

```typescript
let dialog: Dialog = new Dialog({
    content: 'dialog',
    width: '300px',
    animationSettings: { effect: 'FadeZoom', duration: 400 }
});
dialog.appendTo('#dialog');
```

---

### buttons `ButtonPropsModel[]`

Configures the action buttons in the dialog footer with button properties and click events. One or more buttons can be configured.

- **Defaults to:** `[{}]`

```typescript
let dialog: Dialog = new Dialog({
    content: 'dialog',
    width: '300px',
    buttons: [{ buttonModel: { content: 'OK', isPrimary: true } }]
});
dialog.appendTo('#dialog');
```

---

### closeOnEscape `boolean`

Specifies whether the dialog can be closed using the Escape key.

- **Defaults to:** `true`

---

### content `string | HTMLElement | Function`

Specifies the content to display in the dialog's content area. Accepts text, HTML strings, DOM elements, or functions.

- **Defaults to:** `''`

---

### cssClass `string`

Specifies one or more CSS class names to append to the dialog root element.

- **Defaults to:** `''`

---

### enableHtmlSanitizer `boolean`

Defines whether to sanitize HTML content to prevent cross-site scripting (XSS). When `true`, HTML content is sanitized.

- **Defaults to:** `true`

---

### enablePersistence `boolean`

Enables or disables saving the dialog's dimensions and position state between page reloads.

- **Defaults to:** `false`

---

### enableResize `boolean`

Specifies whether the dialog can be resized by the end-user. When `true`, a grip handle is shown for diagonal resize. Configure resize directions with `resizeHandles`.

- **Defaults to:** `false`

---

### enableRtl `boolean`

Enables or disables right-to-left rendering.

- **Defaults to:** `false`

---

### footerTemplate `HTMLElement | string | Function`

Specifies a custom template for the dialog footer area. Use when the footer needs information or components beyond simple action buttons.

- **Defaults to:** `''`
- **Note:** Cannot be used together with `buttons`. If `footerTemplate` is set, `buttons` is disabled.

---

### header `string | HTMLElement | Function`

Specifies the dialog title. Accepts plain text or HTML. If `null`, the dialog renders without a header.

- **Defaults to:** `''`

---

### height `string | number`

Specifies the height of the dialog.

- **Defaults to:** `'auto'`

---

### isModal `boolean`

Specifies whether the dialog is modal or modeless.

- **Modal:** Creates an overlay that disables interaction with the parent application until the user responds.
- **Modeless:** Does not prevent user interaction with the parent application.
- **Defaults to:** `false`

```typescript
let dialog: Dialog = new Dialog({
    content: 'dialog',
    width: '300px',
    position: { X: 'center', Y: 'center' }
});
dialog.appendTo('#dialog');
```

---

### locale `string`

Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

- **Defaults to:** `''`

---

### minHeight `string | number`

Specifies the minimum height of the dialog.

- **Defaults to:** `''`

---

### position `PositionDataModel`

Specifies where the dialog is positioned within the document or target container. Accepts pre-configured positions or specific X/Y values.

- **X values:** `'left'`, `'center'`, `'right'`, or a numeric offset
- **Y values:** `'top'`, `'center'`, `'bottom'`, or a numeric offset
- **Defaults to:** `{ X: 'center', Y: 'center' }`

```typescript
let dialog: Dialog = new Dialog({
    content: 'dialog',
    width: '300px',
    position: { X: 'center', Y: 'center' }
});
dialog.appendTo('#dialog');
```

---

### resizeHandles `ResizeDirections[]`

Specifies the directions in which the dialog can be resized. Requires `enableResize: true`.

- **Defaults to:** `['South-East']`
- **Valid values:** `'North'`, `'South'`, `'East'`, `'West'`, `'South-East'`, `'South-West'`, `'North-East'`, `'North-West'`, `'All'`

---

### showCloseIcon `boolean`

Specifies whether to show the close icon (×) button in the dialog header.

- **Defaults to:** `false`

---

### target `HTMLElement | string`

Specifies the target element in which to display the dialog. When `null`, renders in `document.body`.

- **Defaults to:** `null`

---

### visible `boolean`

Specifies whether the dialog component is visible on initialization.

- **Defaults to:** `true`

---

### width `string | number`

Specifies the width of the dialog.

- **Defaults to:** `'100%'`

---

### zIndex `number`

Specifies the z-order for the dialog rendering. Higher values appear in front of lower values.

- **Defaults to:** `1000`

---

## AnimationSettingsModel

Sub-properties of the `animationSettings` property:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `delay` | number | `0` | Delay in milliseconds before animation begins |
| `duration` | number | `400` | Duration in milliseconds for one animation cycle |
| `effect` | string | `'Fade'` | Animation effect name |

**Supported effects:**
`'Fade'` | `'FadeZoom'` | `'FlipLeftDown'` | `'FlipLeftUp'` | `'FlipRightDown'` | `'FlipRightUp'` | `'FlipXDown'` | `'FlipXUp'` | `'FlipYLeft'` | `'FlipYRight'` | `'SlideBottom'` | `'SlideLeft'` | `'SlideRight'` | `'SlideTop'` | `'Zoom'` | `'None'`

> When `effect: 'Fade'` is set, the dialog opens with `FadeIn` and closes with `FadeOut`.

---

## ButtonPropsModel

Sub-properties of each entry in the `buttons` array:

| Property | Type | Description |
|----------|------|-------------|
| `buttonModel` | ButtonModel | Button component properties (content, isPrimary, iconCss, cssClass, etc.) |
| `click` | Function | Click event handler for the button |

```typescript
buttons: [
    {
        buttonModel: {
            content: 'OK',
            isPrimary: true,
            iconCss: 'e-icons e-ok-icon'
        },
        click: () => { dialog.hide(); }
    }
]
```

---

## Methods

### show(isFullScreen?: boolean): void

Opens the dialog if it is in a hidden state. Pass `true` to open in fullscreen mode.

```typescript
dialog.show();          // normal open
dialog.show(true);      // fullscreen open
dialog.show(false);     // restore from fullscreen
```

---

### hide(event?: Event): void

Closes the dialog if it is in a visible state.

```typescript
dialog.hide();
```

---

### dataBind(): void

Applies all pending property changes immediately to the component. Use after programmatically updating properties like `position`, `content`, or `cssClass`.

```typescript
dialog.position = { X: 'center', Y: 'bottom' };
dialog.dataBind();
```

---

### refresh(): void

Applies all pending property changes and re-renders the component.

```typescript
dialog.refresh();
```

---

### refreshPosition(): void

Recomputes the dialog's position. Use after dynamically changing the header or footer height/width.

```typescript
dialog.refreshPosition();
```

---

### getButtons(index?: number): Button[] | Button

Returns dialog button instances. Use to dynamically change button states after initialization.

```typescript
const allButtons = dialog.getButtons();          // returns Button[]
const firstButton = dialog.getButtons(0);        // returns Button
```

---

### getDimension(): DialogDimension

Returns the current width and height of the dialog.

```typescript
const dimensions = dialog.getDimension();
console.log(dimensions.width, dimensions.height);
```

---

### getRootElement(): HTMLElement

Returns the root element of the component.

```typescript
const rootEl: HTMLElement = dialog.getRootElement();
```

---

### destroy(): void

Destroys the dialog widget and cleans up event listeners and DOM modifications.

```typescript
dialog.destroy();
```

---

### appendTo(selector?: string | HTMLElement): void

Appends the control within the specified HTML element or selector.

```typescript
dialog.appendTo('#dialog');
dialog.appendTo(document.getElementById('dialog'));
```

---

### addEventListener(eventName: string, handler: Function): void

Adds a handler to the given event listener.

```typescript
dialog.addEventListener('open', () => { console.log('opened'); });
```

---

### removeEventListener(eventName: string, handler: Function): void

Removes a handler from the given event listener.

```typescript
dialog.removeEventListener('open', myHandler);
```

---

## Events

### beforeOpen `EmitType<BeforeOpenEventArgs>`

Triggers when the dialog is being opened. Set `args.cancel = true` to keep the dialog closed. Set `args.maxHeight` to limit dialog height.

```typescript
let dialog: Dialog = new Dialog({
    beforeOpen: (args) => {
        args.cancel = true;         // prevent opening
        args.maxHeight = '300px';   // set max height
    }
});
```

---

### open `EmitType<Object>`

Triggers after the dialog has been opened. Use `args.preventFocus = true` (via `OpenEventArgs`) to prevent auto-focus on the first focusable element.

```typescript
import { Dialog, OpenEventArgs } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    open: (args: OpenEventArgs) => {
        args.preventFocus = true;
    }
});
```

---

### beforeClose `EmitType<BeforeCloseEventArgs>`

Triggers before the dialog is closed. Set `args.cancel = true` to keep the dialog open. Set `args.preventFocus = true` to prevent focus from returning to the previously focused element.

```typescript
let dialog: Dialog = new Dialog({
    beforeClose: (args) => {
        args.cancel = true;         // prevent closing
        args.preventFocus = true;   // don't return focus to previous element
    }
});
```

---

### close `EmitType<Object>`

Triggers after the dialog has been closed.

```typescript
let dialog: Dialog = new Dialog({
    close: () => { console.log('Dialog closed'); }
});
```

---

### created `EmitType<Object>`

Triggers when the dialog is created.

```typescript
let dialog: Dialog = new Dialog({
    created: () => { dialog.refreshPosition(); }
});
```

---

### destroyed `EmitType<Event>`

Triggers when the dialog is destroyed.

```typescript
let dialog: Dialog = new Dialog({
    destroyed: () => { console.log('Destroyed'); }
});
```

---

### overlayClick `EmitType<Object>`

Triggers when the overlay of a modal dialog is clicked.

```typescript
let dialog: Dialog = new Dialog({
    isModal: true,
    overlayClick: () => { dialog.hide(); }
});
```

---

### drag `EmitType<Object>`

Triggers while the user is dragging the dialog. Requires `allowDragging: true`.

---

### dragStart `EmitType<Object>`

Triggers when the user begins dragging the dialog.

---

### dragStop `EmitType<Object>`

Triggers when the user stops dragging the dialog.

---

### resizeStart `EmitType<Object>`

Triggers when the user begins resizing the dialog. Requires `enableResize: true`.

---

### resizing `EmitType<Object>`

Triggers while the user is resizing the dialog.

---

### resizeStop `EmitType<Object>`

Triggers when the user stops resizing the dialog.

---

### beforeSanitizeHtml `EmitType<BeforeSanitizeHtmlArgs>`

Triggers before HTML content is sanitized (when `enableHtmlSanitizer: true`).
