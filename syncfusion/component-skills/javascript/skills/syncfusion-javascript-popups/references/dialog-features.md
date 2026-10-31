# Features and Configuration — Syncfusion TypeScript Dialog

## Table of Contents
- [Animation Settings](#animation-settings)
- [Resize](#resize)
- [Localization](#localization)
- [RTL Support](#rtl-support)
- [CSS Class Customization](#css-class-customization)
- [Fullscreen Dialog](#fullscreen-dialog)
- [Setting Max Height](#setting-max-height)
- [Fixed Position on Scroll](#fixed-position-on-scroll)
- [Nested Dialogs](#nested-dialogs)
- [Enable Persistence](#enable-persistence)
- [Z-Index Control](#z-index-control)
- [Style Customization Reference](#style-customization-reference)

---

## Animation Settings

Configure open/close animation using `animationSettings` with `effect`, `duration`, and `delay` properties.

**Available effects:**
`'Fade'` | `'FadeZoom'` | `'FlipLeftDown'` | `'FlipLeftUp'` | `'FlipRightDown'` | `'FlipRightUp'` | `'FlipXDown'` | `'FlipXUp'` | `'FlipYLeft'` | `'FlipYRight'` | `'SlideBottom'` | `'SlideLeft'` | `'SlideRight'` | `'SlideTop'` | `'Zoom'` | `'None'`

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    animationSettings: {
        effect: 'Zoom',
        duration: 400,
        delay: 0
    },
    header: 'Dialog',
    content: 'Dialog enabled with Zoom effect',
    buttons: [
        { click: () => { dialog.hide(); }, buttonModel: { content: 'OK', isPrimary: true } },
        { click: () => { dialog.hide(); }, buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }
    ],
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

> When `effect: 'Fade'` is set, the dialog opens with `FadeIn` and closes with `FadeOut`.
> Use `effect: 'None'` to disable animation entirely.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `effect` | string | `'Fade'` | Animation effect name |
| `duration` | number | `400` | Duration in milliseconds for one animation cycle |
| `delay` | number | `0` | Delay in milliseconds before animation begins |

---

## Resize

Enable `enableResize` to allow users to resize the dialog by dragging its edges or corners. Configure `resizeHandles` to restrict resize directions.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    allowDragging: true,
    enableResize: true,
    resizeHandles: ['All'],  // resize in all directions
    header: 'Resizable Dialog',
    content: 'This dialog can be resized in all directions',
    buttons: [
        { click: () => { dialog.hide(); }, buttonModel: { isPrimary: true, content: 'OK' } },
        { click: () => { dialog.hide(); }, buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }
    ],
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

**`resizeHandles` values:** `'North'` | `'South'` | `'East'` | `'West'` | `'South-East'` | `'South-West'` | `'North-East'` | `'North-West'` | `'All'`

> Default is `['South-East']`. Setting `target` along with `enableResize` confines resize within the target container.

---

## Localization

Use `locale` with `L10n.load()` to translate built-in text (currently the close button tooltip).

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { L10n, enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

L10n.load({
    'fr-BE': {
        'dialog': {
            'close': 'Fermer'
        }
    }
});

let dialog: Dialog = new Dialog({
    locale: 'fr-BE',
    header: 'Dialogue',
    showCloseIcon: true,
    content: 'Dialogue avec la culture française',
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

| Locale Key | Default (en-US) |
|-----------|----------------|
| `close` | Close |

---

## RTL Support

Enable right-to-left rendering with `enableRtl: true`:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    enableRtl: true,
    header: 'RTL Dialog',
    content: 'This dialog renders right-to-left',
    showCloseIcon: true,
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

---

## CSS Class Customization

Add one or more custom CSS classes via `cssClass`:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    cssClass: 'custom-dialog warning-dialog',
    header: 'Warning',
    content: 'A custom-styled dialog',
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

```css
/* Custom styles applied via cssClass */
.custom-dialog .e-dlg-header {
    color: #d9534f;
}
.warning-dialog .e-dlg-content {
    background-color: #fff3cd;
}
```

---

## Fullscreen Dialog

Pass `true` to `show()` to open the dialog in fullscreen mode:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Fullscreen Dialog',
    content: 'This dialog fills the screen',
    buttons: [
        { click: () => { dialog.hide(); }, buttonModel: { isPrimary: true, cssClass: 'e-flat', content: 'OK' } },
        { click: () => { dialog.hide(); }, buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }
    ],
    target: document.getElementById('container'),
    width: '250px',
    visible: false
});
dialog.appendTo('#dialog');

// Open in fullscreen
document.getElementById('targetButton').onclick = (): void => { dialog.show(true); };
```

---

## Setting Max Height

Set a maximum height for dialog content via `args.maxHeight` in the `beforeOpen` event. Use `refreshPosition()` in the `created` event to recompute position after content adjustments.

```typescript
import { Dialog, BeforeOpenEventArgs } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    width: '800px',
    showCloseIcon: true,
    position: { X: 'center', Y: 'center' },
    header: 'Dialog',
    visible: false,
    target: document.getElementById('container'),
    created: onCreated,
    beforeOpen: onBeforeOpen
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };

function onCreated(): void {
    dialog.refreshPosition();
}

function onBeforeOpen(args: BeforeOpenEventArgs): void {
    args.maxHeight = '300px';
}
```

---

## Fixed Position on Scroll

Keep the dialog fixed at its position when the user scrolls the page by setting `cssClass: 'e-fixed'`:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: document.getElementById('dlgContent'),
    closeOnEscape: false,
    target: document.getElementById('container'),
    width: '250px',
    beforeOpen: () => {
        document.getElementById('dlgContent').style.visibility = 'visible';
    }
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.cssClass = 'e-fixed';
    dialog.show();
};
```

---

## Nested Dialogs

Create a dialog inside another dialog by setting the inner dialog's `target` to the outer dialog's element:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// Outer dialog
let outerDialog: Dialog = new Dialog({
    header: 'Outer Dialog',
    showCloseIcon: true,
    content: document.getElementById('dlgContent'),
    target: document.getElementById('container'),
    height: '300px',
    width: '400px',
    animationSettings: { effect: 'None' },
    closeOnEscape: false,
    beforeOpen: () => {
        document.getElementById('dlgContent').style.visibility = 'visible';
    }
});
outerDialog.appendTo('#dialog');

// Inner dialog — targets the outer dialog element
let innerDialog: Dialog = new Dialog({
    header: 'Inner Dialog',
    showCloseIcon: true,
    content: 'This is a Nested Dialog',
    target: document.getElementById('dialog'),  // outer dialog element
    height: '150px',
    width: '250px',
    animationSettings: { effect: 'None' },
    closeOnEscape: false
});
innerDialog.appendTo('#innerDialog');

document.getElementById('innerButton').onclick = (): void => { innerDialog.show(); };
```

---

## Enable Persistence

Save and restore dialog dimensions and position across page reloads:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    enablePersistence: true,
    header: 'Persistent Dialog',
    content: 'Dialog position is saved between reloads',
    enableResize: true,
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

---

## Z-Index Control

Control dialog stacking order with `zIndex`. Higher values appear in front:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    zIndex: 2000,
    header: 'High Priority Dialog',
    content: 'This dialog appears above other elements',
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

Default is `1000`.

---

## Style Customization Reference

Use these CSS selectors to customize Dialog appearance:

```css
/* Dialog header */
.e-dialog .e-dlg-header {
    color: green;
    font-size: 20px;
    font-weight: normal;
}

/* Dialog content */
.e-dialog .e-dlg-content {
    color: red;
    font-size: 10px;
    font-weight: normal;
    line-height: normal;
}

/* Modal overlay */
.e-dlg-overlay {
    background-color: slategray;
    opacity: 0.6;
}

/* Resize icon */
.e-dialog .e-south-east::before,
.e-dialog .e-south-west::before {
    content: '\f047';
}
.e-dialog .e-resize-handle {
    font: normal normal normal 14px/1 FontAwesome;
}

/* Close button */
.e-dialog .e-btn .e-btn-icon.e-icon-dlg-close {
    font-size: 12px;
    color: red;
}

/* Footer buttons */
.e-btn.e-flat.e-primary,
.e-css.e-btn.e-flat.e-primary {
    background-color: transparent;
    border-color: transparent;
    color: blue;
}
```
