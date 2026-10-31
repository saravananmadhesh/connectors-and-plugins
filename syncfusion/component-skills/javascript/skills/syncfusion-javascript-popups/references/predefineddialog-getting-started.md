# Getting Started — Syncfusion TypeScript Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [CSS Reference](#css-reference)
- [Alert Dialog](#alert-dialog)
- [Confirm Dialog](#confirm-dialog)
- [Prompt Dialog](#prompt-dialog)

---

## Overview

Syncfusion Predefined Dialogs are opened using the **`DialogUtility`** utility class from
`@syncfusion/ej2-popups`. All three dialog types (alert, confirm, prompt) are invoked imperatively.

---

## Installation

```bash
npm install @syncfusion/ej2-popups@33.x.x --save
```

---

## CSS Reference

Add the following CSS imports in your global stylesheet:

```css
/* src/styles.css */
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/fluent2.css";
```

Then import the stylesheet in your entry file:

```typescript
// src/main.ts
import './styles.css';
```

Other available themes: `material.css`, `bootstrap5.css`, `fluent.css`, `fabric.css`

---

## Alert Dialog

An alert dialog displays a message with an **OK** button. Use `DialogUtility.alert()`.

```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
import './styles.css';

let dialogObj: any;

function alertOkAction(): void {
  dialogObj.hide();
  const statusText: HTMLElement = document.getElementById('statusText')!;
  statusText.innerHTML = 'The user closed the Alert dialog.';
  statusText.style.display = 'block';
}

let alertBtn: Button = new Button({
  cssClass: 'e-danger',
  content: 'Alert',
  click: () => {
    const statusText: HTMLElement = document.getElementById('statusText')!;
    statusText.style.display = 'none';
    dialogObj = DialogUtility.alert({
      title: 'Low Battery',
      width: '250px',
      content: '10% of battery remaining',
      okButton: { click: alertOkAction }
    });
  }
});
alertBtn.appendTo('#alertBtn');
```

**HTML:**

```html
<div id="dialog-target">
  <button id="alertBtn"></button>
  <span id="statusText"></span>
</div>
```

---

## Confirm Dialog

A confirm dialog displays a message with **OK** and **Cancel** buttons. Use `DialogUtility.confirm()`.

```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
import './styles.css';

let dialogObj: any;

function confirmOkAction(): void {
  dialogObj.hide();
  const statusText: HTMLElement = document.getElementById('statusText')!;
  statusText.innerHTML = 'The user confirmed the dialog box.';
  statusText.style.display = 'block';
}

function confirmCancelAction(): void {
  dialogObj.hide();
  const statusText: HTMLElement = document.getElementById('statusText')!;
  statusText.innerHTML = 'The user canceled the dialog box.';
  statusText.style.display = 'block';
}

let confirmBtn: Button = new Button({
  cssClass: 'e-success',
  content: 'Confirm',
  click: () => {
    const statusText: HTMLElement = document.getElementById('statusText')!;
    statusText.style.display = 'none';
    dialogObj = DialogUtility.confirm({
      title: 'Delete Multiple Items',
      content: 'Are you sure you want to permanently delete these items?',
      width: '300px',
      okButton: { click: confirmOkAction },
      cancelButton: { click: confirmCancelAction }
    });
  }
});
confirmBtn.appendTo('#confirmBtn');
```

---

## Prompt Dialog

A prompt dialog collects input from the user. Use `DialogUtility.confirm()` with an `<input>` element in `content`.

```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
import './styles.css';

let dialogObj: any;

function promptOkAction(): void {
  const value: string = (document.getElementById('inputEle') as HTMLInputElement).value;
  dialogObj.hide();
  const statusText: HTMLElement = document.getElementById('statusText')!;
  statusText.innerHTML = value === '' 
    ? "The user's input is returned as \"\"" 
    : `The user's input is returned as ${value}`;
  statusText.style.display = 'block';
}

function promptCancelAction(): void {
  dialogObj.hide();
  const statusText: HTMLElement = document.getElementById('statusText')!;
  statusText.innerHTML = 'The user canceled the prompt dialog.';
  statusText.style.display = 'block';
}

let promptBtn: Button = new Button({
  isPrimary: true,
  content: 'Prompt',
  click: () => {
    const statusText: HTMLElement = document.getElementById('statusText')!;
    statusText.style.display = 'none';
    dialogObj = DialogUtility.confirm({
      title: 'Join Chat Group',
      width: '300px',
      content: '<p>Enter your name:</p> <input id="inputEle" type="text" class="e-input" placeholder="Type here.." />',
      okButton: { click: promptOkAction },
      cancelButton: { click: promptCancelAction }
    });
  }
});
promptBtn.appendTo('#promptBtn');
```

> **Note:** The return value of `DialogUtility.alert()` / `DialogUtility.confirm()` is a dialog instance.
> Call `.hide()` on it to close the dialog programmatically.

---

## Complete Working Example

```typescript
// src/main.ts
import { Button } from '@syncfusion/ej2-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';
import './styles.css';

let alertDialog: any;
let confirmDialog: any;
let promptDialog: any;

// Alert button
let alertBtn: Button = new Button({
  cssClass: 'e-danger',
  content: 'Show Alert',
  click: () => {
    alertDialog = DialogUtility.alert({
      title: 'Low Battery',
      content: '10% of battery remaining',
      okButton: { click: () => alertDialog.hide() }
    });
  }
});
alertBtn.appendTo('#alert-btn');

// Confirm button
let confirmBtn: Button = new Button({
  cssClass: 'e-success',
  content: 'Show Confirm',
  click: () => {
    confirmDialog = DialogUtility.confirm({
      title: 'Confirm Action',
      content: 'Are you sure?',
      okButton: { 
        text: 'Yes',
        click: () => {
          console.log('User confirmed');
          confirmDialog.hide();
        }
      },
      cancelButton: { 
        text: 'No',
        click: () => confirmDialog.hide() 
      }
    });
  }
});
confirmBtn.appendTo('#confirm-btn');

// Prompt button
let promptBtn: Button = new Button({
  isPrimary: true,
  content: 'Show Prompt',
  click: () => {
    promptDialog = DialogUtility.confirm({
      title: 'Enter Name',
      content: '<input id="nameInput" class="e-input" placeholder="Your name" />',
      okButton: {
        text: 'Submit',
        click: () => {
          const name: string = (document.getElementById('nameInput') as HTMLInputElement).value;
          console.log('Name:', name);
          promptDialog.hide();
        }
      }
    });
  }
});
promptBtn.appendTo('#prompt-btn');
```

---

## Gotchas

- **Imperative only**: Predefined dialogs are not component-based. Use `DialogUtility.alert()` or `DialogUtility.confirm()` to invoke them.
- **Return value**: Both methods return a dialog instance. Store the reference to call `.hide()` programmatically.
- **Prompt pattern**: Use `DialogUtility.confirm()` with `<input>` in `content` for prompt dialogs.
- **CSS required**: All four CSS files (base, buttons, popups) must be imported for proper rendering.

---

## See Also

- [predefineddialog-animation.md](./predefineddialog-animation.md) - Animation effects
- [predefineddialog-position.md](./predefineddialog-position.md) - Positioning
- [predefineddialog-dimension.md](./predefineddialog-dimension.md) - Width and height
- [predefineddialog-draggable.md](./predefineddialog-draggable.md) - Draggable dialogs
- [predefineddialog-customization.md](./predefineddialog-customization.md) - Button customization
- [predefineddialog-api.md](./predefineddialog-api.md) - Complete API reference
