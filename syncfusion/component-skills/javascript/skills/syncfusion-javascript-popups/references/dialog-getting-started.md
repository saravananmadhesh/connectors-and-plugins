# Getting Started — Syncfusion TypeScript Dialog

## Table of Contents
- [Dependencies](#dependencies)
- [Installation and Setup](#installation-and-setup)
- [CSS Imports and Themes](#css-imports-and-themes)
- [HTML Structure](#html-structure)
- [Basic Dialog](#basic-dialog)
- [Modal Dialog](#modal-dialog)
- [Enable Header and Close Icon](#enable-header-and-close-icon)
- [Configure Action Buttons](#configure-action-buttons)
- [Draggable Dialog](#draggable-dialog)
- [Dialog Positioning](#dialog-positioning)
- [Show and Hide Programmatically](#show-and-hide-programmatically)

---

## Dependencies

The Dialog component requires the following packages:

```
@syncfusion/ej2-popups
  ├── @syncfusion/ej2-base
  └── @syncfusion/ej2-buttons
```

---

## Installation and Setup

Clone the EJ2 quickstart project and install dependencies:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

Or install the popups package directly:

```bash
npm install @syncfusion/ej2-popups
```

Run the application:

```bash
npm start
```

---

## CSS Imports and Themes

Import the required CSS files in `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/dialog/index.css";
```

Replace `material` with your preferred theme: `bootstrap5`, `bootstrap4`, `fabric`, `tailwind`, `fluent`.

---

## HTML Structure

Add a `div` element as the Dialog target and a button to open it:

```html
<!-- index.html -->
<body>
    <button class="e-control e-btn" id="targetButton" role="button">Open Dialog</button>
    <div id="dialog"></div>
</body>
```

---

## Basic Dialog

Minimal dialog with content rendered inside a target container:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    content: 'This is a Dialog with content',
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```

> If the `target` property is not set, `document.body` is used. To ensure proper height rendering, add `min-height` to the target element. If the dialog is rendered inside `body`, add:
> ```css
> html, body { height: 100%; }
> ```

---

## Modal Dialog

A modal dialog creates an overlay that prevents interaction with the rest of the page until the user responds.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    isModal: true,
    content: 'This is a modal dialog',
    overlayClick: onOverlayClick,
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};

function onOverlayClick(): void {
    dialog.hide();
}
```

> When a modal dialog is open, scrolling on the target is disabled. Scrolling re-enables after the dialog closes.

---

## Enable Header and Close Icon

Use `header` to set the title and `showCloseIcon` to display the × button:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    showCloseIcon: true,
    content: 'This is a dialog with header',
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```

> The `header` property accepts plain text or HTML strings.

---

## Configure Action Buttons

Use the `buttons` property to add footer action buttons. The first `isPrimary: true` button receives focus when the dialog opens.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'This is a Dialog with action buttons',
    buttons: [
        {
            click: () => { dialog.hide(); },
            buttonModel: {
                isPrimary: true,
                content: 'OK'
            }
        },
        {
            click: () => { dialog.hide(); },
            buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat'
            }
        }
    ],
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```

> `buttons` and `footerTemplate` cannot be used together. Choose one.

> When multiple primary buttons are configured, the first one receives focus.

---

## Draggable Dialog

Enable `allowDragging` to let users reposition the dialog by dragging the header. The header must be set for dragging to work.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let dialog: Dialog = new Dialog({
    allowDragging: true,
    header: 'Dialog',
    content: 'This is a Dialog with drag enabled',
    buttons: [
        {
            click: () => { dialog.hide(); },
            buttonModel: { isPrimary: true, content: 'OK' }
        },
        {
            click: () => { dialog.hide(); },
            buttonModel: { content: 'Cancel', cssClass: 'e-flat' }
        }
    ],
    target: document.getElementById('container'),
    width: '250px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```

> Draggable support for modal dialogs is available from version `16.2.x` onwards.

---

## Dialog Positioning

Use the `position` property to place the dialog at a predefined or custom location within its `target`.

- **X values:** `'left'`, `'center'`, `'right'`, or a numeric offset
- **Y values:** `'top'`, `'center'`, `'bottom'`, or a numeric offset

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// Center dialog (default)
let dialog: Dialog = new Dialog({
    position: { X: 'center', Y: 'center' },
    header: 'Centered Dialog',
    content: 'Dialog at center position',
    width: '300px',
    target: document.getElementById('container')
});
dialog.appendTo('#dialog');

// Custom numeric position
let dialog2: Dialog = new Dialog({
    position: { X: 420, Y: 14 },
    header: 'Custom Position Dialog',
    content: 'Dialog at X:420, Y:14',
    width: '360px',
    target: document.getElementById('container'),
    animationSettings: { effect: 'None' }
});
dialog2.appendTo('#dialog2');
```

---

## Show and Hide Programmatically

Use `show()` to open the dialog and `hide()` to close it. Pass `true` to `show()` for fullscreen mode.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'Dialog content here',
    visible: false,  // start hidden
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');

// Open normally
dialog.show();

// Open fullscreen
dialog.show(true);

// Close
dialog.hide();
```

> Set `visible: false` to initialize the dialog in a hidden state and open it programmatically later.
