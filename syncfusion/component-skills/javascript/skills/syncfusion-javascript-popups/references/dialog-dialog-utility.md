# Dialog Utility Functions — Syncfusion TypeScript Dialog

## Table of Contents
- [Overview](#overview)
- [Utility Options Reference](#utility-options-reference)
- [Alert Dialog](#alert-dialog)
- [Alert Dialog with Options](#alert-dialog-with-options)
- [Confirm Dialog](#confirm-dialog)
- [Confirm Dialog with Options](#confirm-dialog-with-options)
- [Close Utility Dialogs Programmatically](#close-utility-dialogs-programmatically)

---

## Overview

`DialogUtility` provides static methods `alert()` and `confirm()` to create standard dialog boxes with minimal code — no need to instantiate and configure a full `Dialog` object.

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';
```

**When to use DialogUtility:**
- Simple informational alerts ("File saved successfully")
- Quick confirm/cancel prompts ("Are you sure?")
- When minimal setup is preferred over full Dialog configuration

**When to use `Dialog` instead:**
- Complex layouts with custom templates
- Form dialogs with input fields
- Dialogs needing fine-grained event control

---

## Utility Options Reference

Both `alert()` and `confirm()` accept an options object with these fields:

| Option | Type | Description |
|--------|------|-------------|
| `title` | string | Dialog title (like `header`) |
| `content` | string | Dialog body content |
| `isModal` | boolean | Show as modal with overlay |
| `position` | `{ X, Y }` | Position within document |
| `showCloseIcon` | boolean | Show × button |
| `closeOnEscape` | boolean | Close on Esc key |
| `animationSettings` | AnimationSettingsModel | Open/close animation |
| `cssClass` | string | Custom CSS class |
| `zIndex` | number | Stack order |
| `isDraggable` | boolean | Allow dragging |
| `okButton` | `{ text?, icon?, cssClass?, click? }` | OK button config |
| `cancelButton` | `{ text?, icon?, cssClass?, click? }` | Cancel button config (confirm only) |
| `open` | Function | Triggered after dialog opens |
| `close` | Function | Triggered after dialog closes |

---

## Alert Dialog

A simple alert with a single OK button. Pass a string for a minimal alert:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

document.getElementById('targetButton').onclick = (): void => {
    DialogUtility.alert('This is an Alert Dialog!');
};
```

---

## Alert Dialog with Options

Customize the alert with title, custom button text, animations, and click handlers:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

document.getElementById('targetButton').onclick = (): void => {
    DialogUtility.alert({
        title: 'Alert Dialog',
        content: 'This is an Alert Dialog!',
        okButton: {
            text: 'OK',
            click: okClick.bind(this)
        },
        showCloseIcon: true,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' }
    });
};

function okClick(): void {
    alert('You clicked OK');
}
```

---

## Confirm Dialog

A simple confirm with OK and Cancel buttons:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

document.getElementById('targetButton').onclick = (): void => {
    DialogUtility.confirm('This is a Confirmation Dialog!');
};
```

---

## Confirm Dialog with Options

Customize button labels, actions, and appearance:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

document.getElementById('targetButton').onclick = (): void => {
    DialogUtility.confirm({
        title: 'Confirmation Dialog',
        content: 'This is a Confirmation Dialog!',
        okButton: {
            text: 'OK',
            click: okClick.bind(this)
        },
        cancelButton: {
            text: 'Cancel',
            click: cancelClick.bind(this)
        },
        showCloseIcon: true,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' }
    });
};

function okClick(): void {
    alert('You clicked OK');
}

function cancelClick(): void {
    alert('You clicked Cancel');
}
```

---

## Close Utility Dialogs Programmatically

`DialogUtility.alert()` and `DialogUtility.confirm()` return a dialog instance. Call `hide()` on the instance to close it programmatically:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any;

document.getElementById('targetButton').onclick = (): void => {
    dialogObj = DialogUtility.confirm({
        title: 'Confirmation Dialog',
        content: 'This is a Confirmation Dialog!',
        okButton: {
            text: 'OK',
            click: okClick.bind(this)
        },
        cancelButton: {
            text: 'Cancel',
            click: cancelClick.bind(this)
        },
        showCloseIcon: true,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' }
    });
};

function okClick(): void {
    alert('You clicked OK');
}

function cancelClick(): void {
    dialogObj.hide();  // close programmatically on cancel
}
```

**Other ways to close utility dialogs:**
- Press **Esc** key (when `closeOnEscape: true`)
- Click the × button (when `showCloseIcon: true`)
- Call `dialogObj.hide()` on the returned instance
