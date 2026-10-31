# API Reference — Syncfusion Angular Predefined Dialogs

## Table of Contents
- [DialogUtility Methods](#dialogutility-methods)
- [AlertArgs Properties](#alertargs-properties)
- [ConfirmArgs Properties](#confirmargs-properties)
- [ButtonArgs Properties](#buttonargs-properties)
- [AnimationSettingsModel](#animationsettingsmodel)
- [PositionDataModel](#positiondatamodel)
- [DialogComponent Properties](#dialogcomponent-properties)
- [DialogComponent Methods](#dialogcomponent-methods)
- [DialogComponent Events](#dialogcomponent-events)

---

## DialogUtility Methods

### `DialogUtility.alert(options: AlertArgs): Dialog`

Renders a predefined **alert** dialog with a single OK button.

**Import:**
```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';
```

**Usage:**
```typescript
const dlg = DialogUtility.alert({
  title: 'Warning',
  content: 'An error occurred.',
  width: '300px'
});
```

**Returns:** A `Dialog` component instance. Call `.hide()` on it to close the dialog programmatically.

---

### `DialogUtility.confirm(options: ConfirmArgs): Dialog`

Renders a predefined **confirm** dialog with OK and Cancel buttons. Also used as the basis for **prompt** dialogs (embed `<input>` in the `content` property).

**Import:**
```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';
```

**Usage:**
```typescript
const dlg = DialogUtility.confirm({
  title: 'Confirm Delete',
  content: 'Are you sure?',
  width: '300px',
  okButton: { click: () => dlg.hide() },
  cancelButton: { click: () => dlg.hide() }
});
```

**Returns:** A `Dialog` component instance.

---

## AlertArgs Properties

Options passed to `DialogUtility.alert()`:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | — | Dialog header text |
| `content` | `string` | — | Body content — plain text or HTML string |
| `width` | `string \| number` | `'100%'` | Dialog width (e.g., `'300px'`, `'50%'`) |
| `isModal` | `boolean` | `false` | Display with overlay blocking background interactions |
| `position` | `PositionDataModel` | `{ X: 'center', Y: 'center' }` | Dialog position on screen |
| `okButton` | `ButtonArgs` | — | OK button configuration |
| `isDraggable` | `boolean` | `false` | Allow repositioning by dragging the header |
| `showCloseIcon` | `boolean` | `false` | Show × close icon in the header |
| `closeOnEscape` | `boolean` | `false` | Close dialog when ESC key is pressed |
| `animationSettings` | `AnimationSettingsModel` | `{ effect: 'Fade', duration: 400, delay: 0 }` | Open/close animation settings |
| `cssClass` | `string` | `''` | Custom CSS class appended to the dialog root element |
| `zIndex` | `number` | `1000` | Stacking order (higher appears in front) |
| `open` | `() => void` | — | Callback triggered after the dialog opens |
| `close` | `() => void` | — | Callback triggered after the dialog closes |

> `cancelButton` is **not** available on `AlertArgs` — it is only supported in `ConfirmArgs`.

---

## ConfirmArgs Properties

Options passed to `DialogUtility.confirm()`. Extends `AlertArgs` with:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | — | Dialog header text |
| `content` | `string` | — | Body content — plain text or HTML string |
| `width` | `string \| number` | `'100%'` | Dialog width |
| `isModal` | `boolean` | `false` | Display as modal with background overlay |
| `position` | `PositionDataModel` | `{ X: 'center', Y: 'center' }` | Dialog position |
| `okButton` | `ButtonArgs` | — | OK button configuration |
| `cancelButton` | `ButtonArgs` | — | Cancel button configuration |
| `isDraggable` | `boolean` | `false` | Enable header dragging |
| `showCloseIcon` | `boolean` | `false` | Show × close icon |
| `closeOnEscape` | `boolean` | `false` | Close on ESC key |
| `animationSettings` | `AnimationSettingsModel` | `{ effect: 'Fade', duration: 400, delay: 0 }` | Animation settings |
| `cssClass` | `string` | `''` | Custom CSS class |
| `zIndex` | `number` | `1000` | Z-order |
| `open` | `() => void` | — | Callback after dialog opens |
| `close` | `() => void` | — | Callback after dialog closes |

---

## ButtonArgs Properties

Used for both `okButton` and `cancelButton` configuration:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | `'OK'` / `'Cancel'` | Button label text |
| `icon` | `string` | — | CSS icon class (e.g., `'e-icons e-check'`) |
| `cssClass` | `string` | — | Custom CSS class on the button element |
| `click` | `() => void` | — | Click event handler for the button |

**Examples:**

```typescript
// OK button with custom text and icon
okButton: {
  text: 'Yes',
  icon: 'e-icons e-check',
  cssClass: 'e-success',
  click: () => { dlg.hide(); }
}

// Cancel button with custom text
cancelButton: {
  text: 'No',
  icon: 'e-icons e-close',
  click: () => { dlg.hide(); }
}
```

---

## AnimationSettingsModel

Configures the open/close animation behavior of the dialog.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `effect` | `string` | `'Fade'` | Animation effect. Values: `'Fade'`, `'FadeZoom'`, `'Zoom'`, `'None'` |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `delay` | `number` | `0` | Delay before animation begins in milliseconds |

**Examples:**

```typescript
// Zoom effect
animationSettings: { effect: 'Zoom' }

// FadeZoom with custom duration
animationSettings: { effect: 'FadeZoom', duration: 600, delay: 100 }

// Disable animation
animationSettings: { effect: 'None' }
```

---

## PositionDataModel

Configures the dialog's position on screen.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `X` | `string \| number` | `'center'` | Horizontal position. Values: `'left'`, `'center'`, `'right'`, or a numeric pixel offset |
| `Y` | `string \| number` | `'center'` | Vertical position. Values: `'top'`, `'center'`, `'bottom'`, or a numeric pixel offset |

**Examples:**

```typescript
// Centered
position: { X: 'center', Y: 'center' }

// Top-right corner
position: { X: 'right', Y: 'top' }

// Custom pixel offset (100px from left, 50px from top)
position: { X: 100, Y: 50 }
```

---

## DialogComponent Properties

The `Dialog` instance returned by `DialogUtility.alert()` and `DialogUtility.confirm()` exposes the full `DialogComponent` API:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowDragging` | `boolean` | `false` | Enable drag repositioning by header |
| `animationSettings` | `AnimationSettingsModel` | `{ effect: 'Fade', duration: 400, delay: 0 }` | Open/close animation |
| `buttons` | `ButtonPropsModel[]` | `[{}]` | Action button configurations |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key press |
| `content` | `any` | `''` | Dialog body content |
| `cssClass` | `string` | `''` | Custom CSS class on root element |
| `enableHtmlSanitizer` | `boolean` | `true` | Sanitize HTML content (XSS protection) |
| `enablePersistence` | `boolean` | `false` | Persist dimension/position between reloads |
| `enableResize` | `boolean` | `false` | Allow user resizing |
| `enableRtl` | `boolean` | `false` | Right-to-left rendering |
| `footerTemplate` | `any` | `''` | Custom footer template (overrides action buttons) |
| `header` | `any` | `''` | Dialog title content |
| `height` | `string \| number` | `'auto'` | Dialog height |
| `isModal` | `boolean` | `false` | Modal (with overlay) or modeless |
| `locale` | `string` | `''` | Locale override (default: `'en-US'`) |
| `minHeight` | `string \| number` | `''` | Minimum dialog height |
| `position` | `PositionDataModel` | `{ X: 'center', Y: 'center' }` | Dialog screen position |
| `resizeHandles` | `ResizeDirections[]` | `['South-East']` | Resize handle directions |
| `showCloseIcon` | `boolean` | `false` | Show × close icon |
| `target` | `HTMLElement \| string` | `null` (document.body) | Container element |
| `visible` | `boolean` | `true` | Dialog visibility state |
| `width` | `string \| number` | `'100%'` | Dialog width |
| `zIndex` | `number` | `1000` | Stacking order |

---

## DialogComponent Methods

Methods available on the returned `Dialog` instance:

| Method | Signature | Description |
|--------|-----------|-------------|
| `hide` | `hide(event?: Event): void` | Closes the dialog if visible |
| `show` | `show(isFullScreen?: boolean): void` | Opens the dialog if hidden; pass `true` for full-screen |
| `destroy` | `destroy(): void` | Destroys the dialog widget and releases resources |
| `getButtons` | `getButtons(index?: number): Button[] \| Button` | Returns the dialog button instances for dynamic manipulation |
| `getDimension` | `getDimension(): DialogDimension` | Returns current `{ width, height }` |
| `refreshPosition` | `refreshPosition(): void` | Recalculates position after dynamic header/footer changes |

**Common usage patterns:**

```typescript
// Close dialog
dlg.hide();

// Open dialog after hiding
dlg.show();

// Get button instance and change state
const okBtn = dlg.getButtons(0);  // 0-indexed

// Refresh after changing content
dlg.refreshPosition();
```

---

## DialogComponent Events

Events available on the `Dialog` component instance (these fire at the component level, not the `DialogUtility` utility options):

| Event | Type | Description |
|-------|------|-------------|
| `beforeClose` | `EmitType<BeforeCloseEventArgs>` | Fires before closing. Set `cancel: true` to prevent close |
| `beforeOpen` | `EmitType<BeforeOpenEventArgs>` | Fires before opening. Set `cancel: true` to prevent open |
| `beforeSanitizeHtml` | `EmitType<BeforeSanitizeHtmlArgs>` | Fires before HTML sanitization |
| `close` | `EmitType<Object>` | Fires after dialog is closed |
| `created` | `EmitType<Object>` | Fires when dialog is created |
| `destroyed` | `EmitType<Event>` | Fires when dialog is destroyed |
| `drag` | `EmitType<Object>` | Fires while user is dragging the dialog |
| `dragStart` | `EmitType<Object>` | Fires when user starts dragging |
| `dragStop` | `EmitType<Object>` | Fires when user stops dragging |
| `open` | `EmitType<Object>` | Fires when dialog is opened |
| `overlayClick` | `EmitType<Object>` | Fires when the modal overlay is clicked |
| `resizeStart` | `EmitType<Object>` | Fires when user starts resizing |
| `resizeStop` | `EmitType<Object>` | Fires when user stops resizing |
| `resizing` | `EmitType<Object>` | Fires during resize |

> For predefined dialogs created via `DialogUtility`, use the `open` and `close` callback options in the utility arguments (not Angular event bindings) to handle open/close events.
