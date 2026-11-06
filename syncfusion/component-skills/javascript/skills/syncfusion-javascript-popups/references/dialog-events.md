# Events — Syncfusion TypeScript Dialog

## Table of Contents
- [Event Overview](#event-overview)
- [beforeOpen — Prevent Opening / Set Max Height](#beforeopen--prevent-opening--set-max-height)
- [beforeClose — Prevent Closing / Prevent Focus Return](#beforeclose--prevent-closing--prevent-focus-return)
- [open — Post-Open Actions / Prevent Focus on First Element](#open--post-open-actions--prevent-focus-on-first-element)
- [close — Post-Close Actions](#close--post-close-actions)
- [overlayClick — Close Modal on Overlay Click](#overlayclick--close-modal-on-overlay-click)
- [created and destroyed](#created-and-destroyed)
- [Drag Events](#drag-events)
- [Resize Events](#resize-events)

---

## Event Overview

| Event | Trigger Moment | Cancel Support |
|-------|---------------|----------------|
| `beforeOpen` | Before dialog opens | ✅ `args.cancel = true` |
| `open` | After dialog opens | ❌ |
| `beforeClose` | Before dialog closes | ✅ `args.cancel = true` |
| `close` | After dialog closes | ❌ |
| `overlayClick` | When modal overlay is clicked | ❌ |
| `created` | After dialog is created | ❌ |
| `destroyed` | After dialog is destroyed | ❌ |
| `drag` | While dragging | ❌ |
| `dragStart` | Drag begins | ❌ |
| `dragStop` | Drag ends | ❌ |
| `resizeStart` | Resize begins | ❌ |
| `resizing` | During resize | ❌ |
| `resizeStop` | Resize ends | ❌ |

---

## beforeOpen — Prevent Opening / Set Max Height

Use `beforeOpen` to:
- Validate input before showing the dialog (`args.cancel = true` prevents opening)
- Set a maximum height for the dialog via `args.maxHeight`
- Make hidden content elements visible before dialog renders

### Prevent Opening (Validation)

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Login Success',
    content: 'Congratulations! Login successful.',
    isModal: true,
    visible: false,
    width: '280px',
    target: document.getElementById('container'),
    beforeOpen: (args) => {
        const username = (document.getElementById('textvalue') as HTMLInputElement).value;
        const password = (document.getElementById('textvalue2') as HTMLInputElement).value;

        if (!username && !password) {
            args.cancel = true;
            alert('Enter username and password');
        } else if (!username) {
            args.cancel = true;
            alert('Enter the username');
        } else if (!password) {
            args.cancel = true;
            alert('Enter the password');
        } else if (username.length < 4) {
            args.cancel = true;
            alert('Username must be minimum 4 characters');
        }
        // args.cancel = false (default) allows the dialog to open
    },
    buttons: [
        { click: () => { dialog.hide(); }, buttonModel: { isPrimary: true, cssClass: 'e-flat', content: 'Dismiss' } }
    ]
});
dialog.appendTo('#dialog');
```

### Set Max Height

```typescript
import { Dialog, BeforeOpenEventArgs } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    showCloseIcon: true,
    visible: false,
    width: '800px',
    position: { X: 'center', Y: 'center' },
    target: document.getElementById('container'),
    beforeOpen: (args: BeforeOpenEventArgs) => {
        args.maxHeight = '300px';
    },
    created: () => {
        dialog.refreshPosition();
    }
});
dialog.appendTo('#dialog');
```

---

## beforeClose — Prevent Closing / Prevent Focus Return

Use `beforeClose` to:
- Validate form data before allowing the dialog to close (`args.cancel = true`)
- Prevent focus from returning to the previously focused element after close (`args.preventFocus = true`)

### Prevent Closing (Form Validation)

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Sign In',
    content: document.getElementById('dlgContent'),
    isModal: true,
    width: '300px',
    target: document.getElementById('container'),
    beforeClose: (args) => {
        const username = (document.getElementById('textvalue') as HTMLInputElement).value;
        const password = (document.getElementById('textvalue2') as HTMLInputElement).value;

        if (!username && !password) {
            args.cancel = true;
            alert('Enter username and password');
        } else if (!username) {
            args.cancel = true;
            alert('Enter the username');
        } else if (!password) {
            args.cancel = true;
            alert('Enter the password');
        } else if (username.length < 4) {
            args.cancel = true;
            alert('Username must be minimum 4 characters');
        }
    },
    beforeOpen: () => {
        document.getElementById('dlgContent').style.visibility = 'visible';
    },
    buttons: [
        { click: () => { dialog.hide(); }, buttonModel: { isPrimary: true, content: 'Log in', cssClass: 'e-primary' } }
    ]
});
dialog.appendTo('#dialog');
```

### Prevent Focus Returning to Previous Element

After a dialog closes, focus normally returns to the element that was focused before the dialog opened. Prevent this with `args.preventFocus = true`:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Delete Items',
    content: 'Are you sure you want to delete?',
    showCloseIcon: true,
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Yes' }, click: () => { dialog.hide(); } },
        { buttonModel: { content: 'No' }, click: () => { dialog.hide(); } }
    ],
    target: document.body,
    width: '300px',
    animationSettings: { effect: 'Zoom' },
    beforeClose: (args) => {
        args.preventFocus = true;  // focus won't return to previous element
    }
});
dialog.appendTo('#dialog');
```

---

## open — Post-Open Actions / Prevent Focus on First Element

Use `open` to run logic after the dialog is fully visible, such as:
- Refreshing a component inside the dialog (e.g., RTE toolbar)
- Preventing auto-focus on the first focusable element

### Prevent Auto-Focus on First Element

By default, the first focusable element in the dialog receives focus when it opens. Suppress this with `args.preventFocus = true` in the `open` event:

```typescript
import { Dialog, OpenEventArgs } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Sign In',
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Yes' }, click: () => { dialog.hide(); } },
        { buttonModel: { content: 'No' }, click: () => { dialog.hide(); } }
    ],
    target: document.getElementById('container'),
    width: '300px',
    open: (args: OpenEventArgs) => {
        args.preventFocus = true;
    }
});
dialog.appendTo('#dialog');
```

### Post-Open Actions (RTE Refresh)

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { RichTextEditor } from '@syncfusion/ej2-richtexteditor';

let rte: RichTextEditor = new RichTextEditor();
rte.appendTo('#defaultRTE');

let dialog: Dialog = new Dialog({
    isModal: true,
    content: document.getElementById('defaultRTE'),
    width: '500px',
    target: document.getElementById('container'),
    open: () => {
        rte.refreshUI();  // fix toolbar offset after dialog transition
    },
    overlayClick: () => { dialog.hide(); }
});
dialog.appendTo('#dialog');
```

---

## close — Post-Close Actions

Use `close` to run logic after the dialog has fully closed (e.g., reset form, update UI state):

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'Content here',
    showCloseIcon: true,
    width: '300px',
    target: document.body,
    close: () => {
        console.log('Dialog closed');
        // Reset form, update state, etc.
    }
});
dialog.appendTo('#dialog');
```

---

## overlayClick — Close Modal on Overlay Click

For modal dialogs, handle `overlayClick` to close the dialog when the user clicks the overlay background:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    isModal: true,
    content: 'Click the overlay to close',
    target: document.getElementById('container'),
    width: '250px',
    overlayClick: () => { dialog.hide(); }
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

---

## created and destroyed

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'Content',
    width: '300px',
    target: document.body,
    created: () => {
        console.log('Dialog instance created');
        dialog.refreshPosition();
    },
    destroyed: () => {
        console.log('Dialog instance destroyed');
    }
});
dialog.appendTo('#dialog');
```

---

## Drag Events

Available when `allowDragging: true`. Header must be set for dragging to work.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    allowDragging: true,
    header: 'Draggable Dialog',
    content: 'Drag me by the header',
    width: '300px',
    target: document.body,
    drag: (args) => { console.log('Dragging:', args); },
    dragStart: (args) => { console.log('Drag started'); },
    dragStop: (args) => { console.log('Drag stopped'); }
});
dialog.appendTo('#dialog');
```

---

## Resize Events

Available when `enableResize: true`.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    enableResize: true,
    resizeHandles: ['All'],
    header: 'Resizable Dialog',
    content: 'Resize me',
    width: '300px',
    target: document.body,
    resizeStart: (args) => { console.log('Resize started'); },
    resizing: (args) => { console.log('Resizing'); },
    resizeStop: (args) => { console.log('Resize stopped'); }
});
dialog.appendTo('#dialog');
```
