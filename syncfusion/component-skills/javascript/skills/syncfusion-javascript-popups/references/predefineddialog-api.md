# Predefined Dialog API Reference

Complete API reference for Syncfusion TypeScript Predefined Dialogs (`DialogUtility`).

## Table of Contents
- [DialogUtility.alert()](#dialogutilityalert)
- [DialogUtility.confirm()](#dialogutilityconfirm)
- [Common Options](#common-options)
- [Button Options](#button-options)
- [Type Definitions](#type-definitions)
- [Complete Example](#complete-example)

---

## DialogUtility.alert()

Displays an alert dialog with an OK button.

### Signature

```typescript
DialogUtility.alert(options: AlertDialogOptions): Dialog
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `AlertDialogOptions` | Dialog configuration options |

### Returns

`Dialog` - The dialog instance. Call `.hide()` to close programmatically.

### Simple Alert

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: Dialog = DialogUtility.alert('Operation completed successfully!');
```

### Alert with Options

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: Dialog = DialogUtility.alert({
  title: 'Success',
  content: 'Your changes have been saved',
  width: '300px',
  okButton: {
    text: 'OK',
    click: () => dialogObj.hide()
  }
});
```

---

## DialogUtility.confirm()

Displays a confirm dialog with OK and Cancel buttons, or a prompt dialog with custom content.

### Signature

```typescript
DialogUtility.confirm(options: ConfirmDialogOptions): Dialog
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `ConfirmDialogOptions` | Dialog configuration options |

### Returns

`Dialog` - The dialog instance.

### Simple Confirm

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: Dialog = DialogUtility.confirm('Are you sure?');
```

### Confirm with Options

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: Dialog = DialogUtility.confirm({
  title: 'Delete File',
  content: 'This action cannot be undone',
  width: '350px',
  okButton: {
    text: 'Delete',
    click: () => {
      console.log('Deleted');
      dialogObj.hide();
    }
  },
  cancelButton: {
    text: 'Cancel',
    click: () => dialogObj.hide()
  }
});
```

### Prompt Dialog

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: Dialog = DialogUtility.confirm({
  title: 'Enter Name',
  content: '<input id="nameInput" class="e-input" />',
  okButton: {
    text: 'Submit',
    click: () => {
      const name: string = (document.getElementById('nameInput') as HTMLInputElement).value;
      console.log(name);
      dialogObj.hide();
    }
  }
});
```

---

## Common Options

All options available for `DialogUtility.alert()` and `DialogUtility.confirm()`:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | `''` | Dialog title |
| `content` | `string \| HTMLElement` | `''` | Dialog content |
| `width` | `number \| string` | `'auto'` | Dialog width |
| `height` | `number \| string` | `'auto'` | Dialog height |
| `position` | `PositionData` | `{ X: 'Center', Y: 'Center' }` | Dialog position |
| `animationSettings` | `AnimationSettingsModel` | - | Animation configuration |
| `isDraggable` | `boolean` | `false` | Enable drag functionality |
| `showCloseIcon` | `boolean` | `false` | Show close icon |
| `closeOnEscape` | `boolean` | `false` | Close on Escape key |
| `cssClass` | `string` | `''` | Custom CSS class |
| `okButton` | `ButtonOptions` | - | OK button configuration |
| `cancelButton` | `ButtonOptions` | - | Cancel button configuration (confirm only) |

---

## Button Options

The `okButton` and `cancelButton` properties accept a `ButtonOptions` object:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | `'OK'` / `'Cancel'` | Button text |
| `icon` | `string` | `''` | Button icon CSS class |
| `click` | `Function` | - | Click event handler |
| `isPrimary` | `boolean` | `false` | Apply primary style |

### Button Examples

```typescript
// Text only
okButton: { text: 'Save' }

// With icon
okButton: { text: 'Save', icon: 'e-icons e-save' }

// With click handler
okButton: { 
  text: 'Confirm',
  click: () => { /* action */ }
}

// Primary button
okButton: {
  text: 'Submit',
  isPrimary: true,
  click: () => { /* action */ }
}
```

---

## Type Definitions

### AlertDialogOptions

```typescript
interface AlertDialogOptions {
  title?: string;
  content?: string | HTMLElement;
  width?: number | string;
  height?: number | string;
  position?: PositionData;
  animationSettings?: AnimationSettingsModel;
  isDraggable?: boolean;
  showCloseIcon?: boolean;
  closeOnEscape?: boolean;
  cssClass?: string;
  okButton?: ButtonOptions;
}
```

### ConfirmDialogOptions

```typescript
interface ConfirmDialogOptions {
  title?: string;
  content?: string | HTMLElement;
  width?: number | string;
  height?: number | string;
  position?: PositionData;
  animationSettings?: AnimationSettingsModel;
  isDraggable?: boolean;
  showCloseIcon?: boolean;
  closeOnEscape?: boolean;
  cssClass?: string;
  okButton?: ButtonOptions;
  cancelButton?: ButtonOptions;
}
```

### ButtonOptions

```typescript
interface ButtonOptions {
  text?: string;
  icon?: string;
  click?: (event?: Event) => void;
  isPrimary?: boolean;
}
```

### PositionData

```typescript
interface PositionData {
  X: 'Left' | 'Center' | 'Right' | number;
  Y: 'Top' | 'Center' | 'Bottom' | number;
}
```

### AnimationSettingsModel

```typescript
interface AnimationSettingsModel {
  effect?: string;
  duration?: number;
  delay?: number;
}
```

---

## Return Value

Both `DialogUtility.alert()` and `DialogUtility.confirm()` return a `Dialog` instance:

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

let dialogObj: Dialog = DialogUtility.alert({
  title: 'Info',
  content: 'Hello'
});

// Dialog instance methods
dialogObj.hide();
dialogObj.show();
dialogObj.destroy();
```

---

## Complete Example

```typescript
import { DialogUtility, Dialog } from '@syncfusion/ej2-popups';
import './styles.css';

// Alert with all options
let alertDialog: Dialog = DialogUtility.alert({
  title: 'Alert Title',
  content: 'This is an alert message',
  width: '350px',
  height: 'auto',
  position: { X: 'Center', Y: 'Center' },
  showCloseIcon: true,
  closeOnEscape: true,
  isDraggable: true,
  cssClass: 'custom-alert',
  animationSettings: {
    effect: 'FadeIn',
    duration: 400,
    delay: 0
  },
  okButton: {
    text: 'Got It',
    icon: 'e-icons e-check',
    isPrimary: true,
    click: () => {
      console.log('OK clicked');
      alertDialog.hide();
    }
  }
});

// Confirm with all options
let confirmDialog: Dialog = DialogUtility.confirm({
  title: 'Confirm Title',
  content: 'Are you sure?',
  width: '400px',
  height: 'auto',
  position: { X: 'Center', Y: 'Center' },
  showCloseIcon: true,
  closeOnEscape: true,
  isDraggable: false,
  cssClass: 'custom-confirm',
  animationSettings: {
    effect: 'ZoomIn',
    duration: 500
  },
  okButton: {
    text: 'Yes',
    icon: 'e-icons e-check',
    isPrimary: true,
    click: () => {
      console.log('Confirmed');
      confirmDialog.hide();
    }
  },
  cancelButton: {
    text: 'No',
    icon: 'e-icons e-close',
    click: () => {
      console.log('Cancelled');
      confirmDialog.hide();
    }
  }
});

// Prompt with input
let promptDialog: Dialog = DialogUtility.confirm({
  title: 'Enter Information',
  content: `
    <div style="padding: 10px 0;">
      <input id="userInput" class="e-input" placeholder="Type here..." style="width: 100%;" />
    </div>
  `,
  width: 350,
  height: 200,
  showCloseIcon: true,
  okButton: {
    text: 'Submit',
    isPrimary: true,
    click: () => {
      const value: string = (document.getElementById('userInput') as HTMLInputElement).value;
      console.log('Input value:', value);
      promptDialog.hide();
    }
  },
  cancelButton: {
    text: 'Cancel',
    click: () => promptDialog.hide()
  }
});
```

---

## See Also

- [predefineddialog-getting-started.md](./predefineddialog-getting-started.md) - Setup and basic usage
- [predefineddialog-animation.md](./predefineddialog-animation.md) - Animation effects
- [predefineddialog-position.md](./predefineddialog-position.md) - Positioning
- [predefineddialog-dimension.md](./predefineddialog-dimension.md) - Width and height
- [predefineddialog-draggable.md](./predefineddialog-draggable.md) - Draggable dialogs
- [predefineddialog-customization.md](./predefineddialog-customization.md) - Button customization
