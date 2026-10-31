# Getting Started — Syncfusion Angular Predefined Dialogs

## Table of Contents
- [Overview](#overview)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Alert Dialog](#alert-dialog)
- [Confirm Dialog](#confirm-dialog)
- [Prompt Dialog](#prompt-dialog)
- [DialogUtility Options Reference](#dialogutility-options-reference)

---

## Overview

Syncfusion Angular Predefined Dialogs use `DialogUtility` — a static utility class from `@syncfusion/ej2-popups` — to show alert, confirm, and prompt dialogs without writing any dialog template markup. You import one class and call one function.

**Package:** `@syncfusion/ej2-angular-popups`  
**Import:** `import { DialogUtility } from '@syncfusion/ej2-popups';`

---

## Dependencies

```
@syncfusion/ej2-popups
  ├── @syncfusion/ej2-base
  └── @syncfusion/ej2-buttons
```

---

## Installation

```bash
ng add @syncfusion/ej2-angular-popups
```

This command automatically:
- Adds `@syncfusion/ej2-angular-popups` and peer dependencies to `package.json`
- Imports the Dialog module in your application
- Registers the default Syncfusion Material theme in `angular.json`

For legacy Angular (≤15) without Ivy:
```bash
npm add @syncfusion/ej2-angular-popups@32.1.19-ngcc
```

---

## CSS Setup

The Material theme is auto-registered when using `ng add`. To import styles manually for only the Dialog component:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/dialog/index.css";
```

> Import order matters — follow the dependency chain (base → icons → buttons → popups).

---

## Alert Dialog

An alert dialog displays errors, warnings, or information with a single **OK** button. When the user clicks OK, the dialog closes automatically.

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button cssClass="e-danger" (click)="alertBtnClick()">Alert</button>
             <span id="statusText"></span>`
})
export class AppComponent {
  public dialogObj: any;

  public alertBtnClick = (): void => {
    document.getElementById('statusText')!.style.display = 'none';
    this.dialogObj = DialogUtility.alert({
      title: 'Low Battery',
      content: '10% of battery remaining',
      width: '250px',
      okButton: { click: this.alertOkAction.bind(this) }
    });
  };

  private alertOkAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText')!.innerHTML = 'The user closed the Alert dialog.';
    document.getElementById('statusText')!.style.display = 'block';
  }
}
```

**When to use alert:**
- Notify the user of a warning, error, or important information
- Situations requiring acknowledgment before continuing
- No decision needed — just awareness

---

## Confirm Dialog

A confirm dialog shows a message with **OK** and **Cancel** buttons. Use it before destructive or irreversible actions.

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button cssClass="e-success" (click)="confirmBtnClick()">Confirm</button>
             <span id="statusText"></span>`
})
export class AppComponent {
  public dialogObj: any;

  public confirmBtnClick = (): void => {
    document.getElementById('statusText')!.style.display = 'none';
    this.dialogObj = DialogUtility.confirm({
      title: 'Delete Multiple Items',
      content: 'Are you sure you want to permanently delete these items?',
      width: '300px',
      okButton: { click: this.confirmOkAction.bind(this) },
      cancelButton: { click: this.confirmCancelAction.bind(this) }
    });
  };

  private confirmOkAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText')!.innerHTML = 'The user confirmed the dialog box';
    document.getElementById('statusText')!.style.display = 'block';
  }

  private confirmCancelAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText')!.innerHTML = 'The user canceled the dialog box.';
    document.getElementById('statusText')!.style.display = 'block';
  }
}
```

**When to use confirm:**
- Deleting records
- Submitting forms with irreversible effects
- Overwriting files
- Logging out or discarding unsaved changes

---

## Prompt Dialog

A prompt dialog collects text input from the user. Angular's `DialogUtility` has no separate `prompt()` method — use `DialogUtility.confirm()` with an HTML `<input>` in the `content` property.

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `<button ejs-button [isPrimary]="true" (click)="promptBtnClick()">Prompt</button>
             <span id="statusText"></span>`
})
export class AppComponent {
  public dialogObj: any;

  public promptBtnClick = (): void => {
    document.getElementById('statusText')!.style.display = 'none';
    this.dialogObj = DialogUtility.confirm({
      title: 'Join Chat Group',
      width: '300px',
      content: '<p>Enter your name:</p><input id="inputEle" type="text" class="e-input" placeholder="Type here..." />',
      okButton: { click: this.promptOkAction.bind(this) },
      cancelButton: { click: this.promptCancelAction.bind(this) }
    });
  };

  private promptOkAction(): void {
    const value = (document.getElementById('inputEle') as HTMLInputElement).value;
    this.dialogObj.hide();
    document.getElementById('statusText')!.innerHTML = `User input: "${value}"`;
    document.getElementById('statusText')!.style.display = 'block';
  }

  private promptCancelAction(): void {
    this.dialogObj.hide();
    document.getElementById('statusText')!.innerHTML = 'The user canceled the prompt dialog';
    document.getElementById('statusText')!.style.display = 'block';
  }
}
```

**Key pattern:** Always store the return value of `DialogUtility.confirm()` in a variable so you can call `.hide()` in the button click handlers.

---

## DialogUtility Options Reference

These options apply to both `DialogUtility.alert()` and `DialogUtility.confirm()`:

| Option | Type | Description |
|--------|------|-------------|
| `title` | `string` | Dialog header text |
| `content` | `string` | Body text or HTML string |
| `isModal` | `boolean` | Display as modal (with overlay). Default: `false` |
| `position` | `{ X, Y }` | Dialog position. Default: `{ X: 'center', Y: 'center' }` |
| `okButton` | `ButtonArgs` | OK button config: `{ text, icon, cssClass, click }` |
| `cancelButton` | `ButtonArgs` | Cancel button config: `{ text, icon, cssClass, click }` |
| `isDraggable` | `boolean` | Allow drag by header. Default: `false` |
| `showCloseIcon` | `boolean` | Show × close icon. Default: `false` |
| `closeOnEscape` | `boolean` | Close on ESC key. Default: `false` |
| `animationSettings` | `AnimationSettingsModel` | `{ effect, duration, delay }` |
| `cssClass` | `string` | Custom CSS class on dialog root |
| `zIndex` | `number` | Z-order. Default: `1000` |
| `open` | `function` | Triggered after dialog opens |
| `close` | `function` | Triggered after dialog closes |

> `cancelButton` is only applicable to `DialogUtility.confirm()`, not `DialogUtility.alert()`.
