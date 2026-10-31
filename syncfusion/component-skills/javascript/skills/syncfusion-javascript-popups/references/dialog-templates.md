# Templates — Syncfusion TypeScript Dialog

## Table of Contents
- [Overview](#overview)
- [Header Template](#header-template)
- [Content Template](#content-template)
- [Footer Template vs Buttons](#footer-template-vs-buttons)
- [Full Template Example](#full-template-example)
- [RTE Inside Modal Dialog](#rte-inside-modal-dialog)

---

## Overview

The Dialog supports templates for three sections:

| Section | Property | Accepts |
|---------|----------|---------|
| Header | `header` | string (text or HTML) |
| Content | `content` | string, HTMLElement, or Function |
| Footer | `footerTemplate` | string or HTML — **OR** use `buttons` for built-in buttons |

> `buttons` and `footerTemplate` are mutually exclusive — use one or the other.

---

## Header Template

Pass an HTML string to the `header` property to render rich header content (icons, images, custom markup):

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let headerImg: string = '<img class="img2" style="display: inline-block;" src="avatar.png" alt="User">';

let dialog: Dialog = new Dialog({
    header: headerImg + '<div class="dlg-template">Nancy</div>',
    showCloseIcon: true,
    content: 'Dialog with HTML header',
    target: document.getElementById('container'),
    width: '400px'
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```

---

## Content Template

Pass a DOM element as `content` to use existing HTML content in the dialog body. Use the `beforeOpen` event to make hidden elements visible before rendering.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// HTML: <div id="dlgContent" style="visibility:hidden">
//           <p>This is rich HTML content</p>
//       </div>

let dialog: Dialog = new Dialog({
    header: 'Dialog',
    content: document.getElementById('dlgContent'),
    showCloseIcon: true,
    target: document.getElementById('container'),
    width: '400px',
    height: '250px',
    beforeOpen: onBeforeOpen
});
dialog.appendTo('#dialog');

function onBeforeOpen(): void {
    document.getElementById('dlgContent').style.visibility = 'visible';
}

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```

> Elements passed as `content` are moved into the dialog. Set them to `visibility: hidden` initially to avoid a flash, then show them in `beforeOpen`.

---

## Footer Template vs Buttons

### Using `buttons` (recommended for simple action buttons)

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialog: Dialog = new Dialog({
    header: 'Confirm',
    content: 'Do you want to save changes?',
    buttons: [
        {
            buttonModel: { content: 'Save', isPrimary: true },
            click: () => { /* save */ dialog.hide(); }
        },
        {
            buttonModel: { content: 'Discard', cssClass: 'e-flat' },
            click: () => { dialog.hide(); }
        }
    ],
    width: '300px',
    target: document.body
});
dialog.appendTo('#dialog');
```

### Using `footerTemplate` (for custom footer HTML)

Use `footerTemplate` when you need full control over the footer layout — for example, including input fields alongside buttons.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let iconTemplate: string =
    '<button id="sendButton" class="e-control e-btn e-primary" data-ripple="true">Send</button>';

let dialog: Dialog = new Dialog({
    header: 'Chat',
    footerTemplate:
        '<input id="msgInput" class="e-input" type="text" placeholder="Enter message..."/>' +
        iconTemplate,
    content: document.getElementById('dlgContent'),
    showCloseIcon: true,
    target: document.getElementById('container'),
    width: '400px',
    height: '250px',
    beforeOpen: onBeforeOpen
});
dialog.appendTo('#dialog');

function onBeforeOpen(): void {
    document.getElementById('dlgContent').style.visibility = 'visible';
}

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};

document.getElementById('sendButton').onclick = (): void => {
    const input = document.getElementById('msgInput') as HTMLInputElement;
    console.log('Message:', input.value);
    input.value = '';
};
```

> When `footerTemplate` is set, the `buttons` property is ignored.

---

## Full Template Example

Complete dialog with HTML header, DOM element content, and custom footer:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

// HTML:
// <div id="dlgContent" style="visibility:hidden">
//   <div class="dialogContent">
//     <span class="dialogText">Hello!</span>
//   </div>
// </div>

let headerImg: string =
    '<img class="img2" style="display: inline-block;" src="https://ej2.syncfusion.com/products/typescript/dialog/template/images/1.png" alt="header image">';

let iconTemplate: string =
    '<button id="sendButton" class="e-control e-btn e-primary" data-ripple="true">Send</button>';

let dialog: Dialog = new Dialog({
    header: headerImg + '<div class="dlg-template" title="Nancy">Nancy</div>',
    footerTemplate:
        '<input id="inVal" class="e-input" type="text" placeholder="Enter your message here!"/>' +
        iconTemplate,
    content: document.getElementById('dlgContent'),
    showCloseIcon: true,
    target: document.getElementById('container'),
    width: '400px',
    height: '250px',
    beforeOpen: onBeforeOpen
});
dialog.appendTo('#dialog');

let sendButton: Button = new Button();
sendButton.appendTo('#sendButton');

function onBeforeOpen(): void {
    document.getElementById('dlgContent').style.visibility = 'visible';
}

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};

document.getElementById('sendButton').onclick = (): void => {
    updateTextValue();
};

(document.getElementById('inVal') as HTMLElement).onkeydown = (e: any): void => {
    if (e.keyCode === 13) { updateTextValue(); }
};

function updateTextValue(): void {
    const enteredVal = document.getElementById('inVal') as HTMLInputElement;
    const dialogText = document.getElementsByClassName('dialogText')[0] as HTMLElement;
    if (enteredVal.value !== '') {
        dialogText.innerHTML = enteredVal.value;
        enteredVal.value = '';
    }
}
```

---

## RTE Inside Modal Dialog

When a Rich Text Editor (RTE) is placed inside a modal dialog, call `rte.refreshUI()` in the dialog's `open` event to fix toolbar offset rendering after the dialog opens.

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';

RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

// HTML: <div id="defaultRTE"></div>

let defaultRTE: RichTextEditor = new RichTextEditor();
defaultRTE.appendTo('#defaultRTE');

let dialog: Dialog = new Dialog({
    isModal: true,
    content: document.getElementById('defaultRTE'),
    target: document.getElementById('container'),
    width: '500px',
    overlayClick: () => { dialog.hide(); },
    open: () => { defaultRTE.refreshUI(); }  // required to fix toolbar rendering
});
dialog.appendTo('#dialog');

document.getElementById('targetButton').onclick = (): void => {
    dialog.show();
};
```
