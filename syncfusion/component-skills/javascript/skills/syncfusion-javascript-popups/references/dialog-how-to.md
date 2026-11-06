# How-To — Syncfusion TypeScript Dialog

## Table of Contents
- [Add Minimize/Maximize Buttons](#add-minimizemaximize-buttons)
- [Add Icons to Dialog Buttons](#add-icons-to-dialog-buttons)
- [Close Dialog on Click Outside](#close-dialog-on-click-outside)
- [Create Nested Dialogs](#create-nested-dialogs)
- [Customize Dialog Appearance](#customize-dialog-appearance)
- [Display Dialog at Custom Position](#display-dialog-at-custom-position)
- [Load Dialog Content Using AJAX](#load-dialog-content-using-ajax)
- [Prevent Focus on First Element](#prevent-focus-on-first-element)
- [Prevent Focus Return After Close](#prevent-focus-return-after-close)
- [Read Form Values on Button Click](#read-form-values-on-button-click)
- [Render Dialog Without Header](#render-dialog-without-header)
- [Show Dialog in Fullscreen](#show-dialog-in-fullscreen)

---

## Add Minimize/Maximize Buttons

Add custom minimize/maximize controls to the dialog header using inline HTML in the `header` property. Toggle fullscreen via `dialog.show(true)` and restore via `dialog.show(false)`. Update position programmatically using `dialog.position` + `dialog.dataBind()`.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: `<span class='title'>Dialog</span>
          <span class='e-icons sf-icon-Maximize' id='max-btn' title='Maximize'></span>
          <span class='e-icons sf-icon-Minimize' id='min-btn' title='Minimize'></span>`,
    content: 'This dialog has minimize and maximize buttons',
    showCloseIcon: true,
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Yes', iconCss: 'e-icons e-ok-icon' }, click: () => { dialog.hide(); } },
        { buttonModel: { content: 'No', iconCss: 'e-icons e-close-icon' }, click: () => { dialog.hide(); } }
    ],
    target: document.body,
    height: 'auto',
    width: '300px',
    animationSettings: { effect: 'Zoom' },
    closeOnEscape: true
});
dialog.appendTo('#dialog');

let isFullScreen: boolean = false;
let dialogOldPositions: { X: string | number, Y: string | number };

document.getElementById('max-btn').addEventListener('click', () => {
    if (!dialog.element.classList.contains('dialog-maximized')) {
        dialog.element.classList.add('dialog-maximized');
        dialog.show(true);
        isFullScreen = true;
    } else {
        dialog.element.classList.remove('dialog-maximized');
        dialog.show(false);
        dialog.position = dialogOldPositions;
        dialog.dataBind();
        isFullScreen = false;
    }
});

document.getElementById('min-btn').addEventListener('click', () => {
    if (!dialog.element.classList.contains('dialog-minimized')) {
        dialogOldPositions = { X: dialog.position.X, Y: dialog.position.Y };
        dialog.element.classList.add('dialog-minimized');
        dialog.element.querySelector('.e-dlg-content').classList.add('hide-content');
        dialog.position = { X: 'center', Y: 'bottom' };
        dialog.dataBind();
    } else {
        dialog.element.classList.remove('dialog-minimized');
        dialog.element.querySelector('.e-dlg-content').classList.remove('hide-content');
        dialog.position = dialogOldPositions;
        dialog.dataBind();
    }
});
```

> `dataBind()` applies pending property changes immediately after updating `dialog.position` programmatically.

---

## Add Icons to Dialog Buttons

### Using `buttons` with `iconCss`

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Delete Multiple Items',
    content: 'Are you sure you want to permanently delete all of these items?',
    showCloseIcon: true,
    buttons: [
        {
            buttonModel: { isPrimary: true, content: 'Yes', iconCss: 'e-icons e-ok-icon' },
            click: () => { dialog.hide(); }
        },
        {
            buttonModel: { content: 'No', iconCss: 'e-icons e-close-icon' },
            click: () => { dialog.hide(); }
        }
    ],
    target: document.body,
    width: '300px',
    animationSettings: { effect: 'Zoom' }
});
dialog.appendTo('#dialog');
```

### Using `footerTemplate` for icon buttons

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Delete Multiple Items',
    content: 'Are you sure you want to permanently delete all of these items?',
    showCloseIcon: true,
    footerTemplate:
        '<button id="btn1" class="e-control e-btn e-primary e-flat" data-ripple="true">' +
        '<span class="e-btn-icon e-icons e-ok-icon e-icon-left"></span>Yes</button>' +
        '<button id="btn2" class="e-control e-btn e-flat" data-ripple="true">' +
        '<span class="e-btn-icon e-icons e-close-icon e-icon-left"></span>No</button>',
    target: document.body,
    width: '300px',
    animationSettings: { effect: 'Zoom' }
});
dialog.appendTo('#dialog');

document.getElementById('btn1').onclick = (): void => { dialog.hide(); };
document.getElementById('btn2').onclick = (): void => { dialog.hide(); };
```

---

## Close Dialog on Click Outside

For non-modal dialogs, use a `document.onclick` handler to close the dialog when clicking outside it:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'Click outside this dialog to close it.',
    showCloseIcon: true,
    buttons: [
        { buttonModel: { isPrimary: true, content: 'OK' }, click: () => { dialog.hide(); } }
    ],
    target: document.body,
    width: '300px',
    closeOnEscape: true
});
dialog.appendTo('#dialog');

document.onclick = (args: MouseEvent): void => {
    if ((args.target as HTMLElement).id === 'target') {
        dialog.hide();
    }
};
```

> For modal dialogs, use `overlayClick` event instead to close on overlay click.

---

## Create Nested Dialogs

Set the inner dialog's `target` to the outer dialog's DOM element to nest dialogs:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// HTML: <div id="dialog"></div>
//       <div id="innerDialog"></div>
//       <div id="dlgContent" style="visibility:hidden">
//           <button id="innerButton">Open Inner Dialog</button>
//       </div>

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

let innerDialog: Dialog = new Dialog({
    header: 'Inner Dialog',
    showCloseIcon: true,
    content: 'This is a Nested Dialog',
    target: document.getElementById('dialog'),  // outer dialog as target
    height: '150px',
    width: '250px',
    animationSettings: { effect: 'None' },
    closeOnEscape: false
});
innerDialog.appendTo('#innerDialog');

document.getElementById('innerButton').onclick = (): void => { innerDialog.show(); };
```

---

## Customize Dialog Appearance

Pass a DOM element as `content` with custom HTML structure to create specialized dialog looks (e.g., error dialogs, styled notifications):

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// HTML: <div id="dlgContent" style="visibility:hidden">
//   <div class="error-content">
//     <span class="e-icons e-error"></span>
//     <p>Cannot rename 'New Folder' because a file or folder with this name already exists.</p>
//   </div>
// </div>

let dialog: Dialog = new Dialog({
    header: 'File and Folder Rename',
    content: document.getElementById('dlgContent'),
    showCloseIcon: true,
    visible: false,
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Close' }, click: function() { this.hide(); } }
    ],
    target: document.querySelector('body'),
    width: '400px',
    animationSettings: { effect: 'Zoom' },
    beforeOpen: () => {
        document.getElementById('dlgContent').style.visibility = 'visible';
    }
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

---

## Display Dialog at Custom Position

Set numeric or string X/Y values in `position` to precisely place dialogs:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// Two dialogs at specific coordinates
let firstDialog: Dialog = new Dialog({
    header: 'Position-01',
    content: 'Dialog at X: 420, Y: 14',
    target: document.getElementById('container'),
    height: '120px',
    width: '360px',
    position: { X: 420, Y: 14 },
    animationSettings: { effect: 'None' }
});
firstDialog.appendTo('#firstDialog');

let secondDialog: Dialog = new Dialog({
    header: 'Position-02',
    content: 'Dialog at X: 420, Y: 240',
    target: document.getElementById('container'),
    height: '120px',
    width: '360px',
    position: { X: 420, Y: 240 },
    animationSettings: { effect: 'None' }
});
secondDialog.appendTo('#secondDialog');
```

---

## Load Dialog Content Using AJAX

Update dialog `content` dynamically in an AJAX success callback. Use `dialog.dataBind()` or reassign `dialog.content` to apply changes.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Ajax Content',
    content: 'Loading...',
    showCloseIcon: true,
    width: '400px',
    target: document.body
});
dialog.appendTo('#dialog');

// Example: Update content after an async fetch
document.getElementById('loadBtn').onclick = (): void => {
    fetch('/api/dialog-content')
        .then(response => response.text())
        .then(html => {
            dialog.content = html;
            dialog.dataBind();
            dialog.show();
        });
};
```

> `dataBind()` applies all pending property changes immediately to the component.

---

## Prevent Focus on First Element

By default, the first focusable element receives focus when the dialog opens. Prevent this using `args.preventFocus = true` in the `open` event:

```typescript
import { Dialog, OpenEventArgs } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Sign In',
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Submit' }, click: () => { dialog.hide(); } },
        { buttonModel: { content: 'Cancel' }, click: () => { dialog.hide(); } }
    ],
    target: document.getElementById('container'),
    width: '300px',
    open: (args: OpenEventArgs) => {
        args.preventFocus = true;
    }
});
dialog.appendTo('#dialog');
```

---

## Prevent Focus Return After Close

When a dialog closes, focus normally returns to the element that was focused before. Prevent this with `args.preventFocus = true` in `beforeClose`:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Delete Items',
    content: 'Permanently delete selected items?',
    showCloseIcon: true,
    buttons: [
        { buttonModel: { isPrimary: true, content: 'Yes' }, click: () => { dialog.hide(); } },
        { buttonModel: { content: 'No' }, click: () => { dialog.hide(); } }
    ],
    target: document.body,
    width: '300px',
    animationSettings: { effect: 'Zoom' },
    beforeClose: (args) => {
        args.preventFocus = true;
    }
});
dialog.appendTo('#dialog');
```

---

## Read Form Values on Button Click

Access form field values from dialog content in the button click handler:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// HTML: <div id="dlgContent" style="visibility:hidden">
//   <input id="name" type="text" placeholder="Name">
//   <input id="email" type="email" placeholder="Email">
// </div>

let dialog: Dialog = new Dialog({
    header: 'User Details',
    content: document.getElementById('dlgContent'),
    showCloseIcon: true,
    visible: false,
    target: document.querySelector('body'),
    width: '400px',
    animationSettings: { effect: 'Zoom' },
    beforeOpen: () => {
        document.getElementById('dlgContent').style.visibility = 'visible';
    },
    buttons: [
        {
            buttonModel: { isPrimary: true, content: 'Submit' },
            click: () => {
                const name = (document.getElementById('name') as HTMLInputElement).value;
                const email = (document.getElementById('email') as HTMLInputElement).value;
                console.log('Name:', name, 'Email:', email);
                dialog.hide();
                showConfirmation(name, email);
            }
        }
    ]
});
dialog.appendTo('#dialog');

function showConfirmation(name: string, email: string): void {
    let confirmDialog: Dialog = new Dialog({
        header: 'Confirm Details',
        content: `<p>Name: ${name}</p><p>Email: ${email}</p>`,
        isModal: true,
        visible: true,
        width: '400px',
        target: document.body,
        buttons: [
            { buttonModel: { isPrimary: true, content: 'Yes' }, click: () => { confirmDialog.hide(); } },
            { buttonModel: { content: 'No' }, click: () => { confirmDialog.hide(); dialog.show(); } }
        ]
    });
    confirmDialog.appendTo('#confirmDialog');
}

document.getElementById('targetButton').onclick = (): void => { dialog.show(); };
```

---

## Render Dialog Without Header

Omit the `header` property to render a dialog with no title bar:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    content: 'This is a dialog without a header.',
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

> Without a header, `allowDragging` has no effect since there is no drag handle.

---

## Show Dialog in Fullscreen

Pass `true` to `show()` to display the dialog at full width and height:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: 'This dialog is displayed in fullscreen mode.',
    buttons: [
        { click: () => { dialog.hide(); }, buttonModel: { isPrimary: true, cssClass: 'e-flat', content: 'OK' } },
        { click: () => { dialog.hide(); }, buttonModel: { content: 'Cancel', cssClass: 'e-flat' } }
    ],
    target: document.getElementById('container'),
    width: '250px',
    visible: false
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => { dialog.show(true); };
```

> To restore to normal size after fullscreen, call `dialog.show(false)` or `dialog.hide()`.
