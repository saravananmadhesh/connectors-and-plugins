# Predefined Dialog Customization

The Syncfusion Predefined Dialog supports extensive customization for buttons, icons, close behavior, and content.

## Table of Contents
- [OK Button Customization](#ok-button-customization)
- [Cancel Button Customization](#cancel-button-customization)
- [Show Close Icon](#show-close-icon)
- [Close on Escape](#close-on-escape)
- [Custom Content for Prompts](#custom-content-for-prompts)
- [Custom CSS Classes](#custom-css-classes)

---

## OK Button Customization

The `okButton` property accepts an object with custom text, icon, and click handler:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Custom OK Button',
  content: 'This alert has a custom OK button',
  okButton: {
    text: 'Got It!',
    icon: 'e-icons e-check',
    click: () => {
      console.log('OK clicked');
      dialogObj.hide();
    }
  }
});
```

### Button Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | Button text |
| `icon` | `string` | Button icon (CSS class) |
| `click` | `Function` | Click event handler |

### Alert with Custom OK

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Success',
  content: 'Your changes have been saved',
  okButton: {
    text: 'Continue',
    click: () => {
      console.log('User continued');
      dialogObj.hide();
    }
  }
});
```

---

## Cancel Button Customization

The `cancelButton` property is used with `DialogUtility.confirm()`:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Delete File',
  content: 'This action cannot be undone',
  okButton: {
    text: 'Delete',
    icon: 'e-icons e-trash',
    click: () => {
      console.log('File deleted');
      dialogObj.hide();
    }
  },
  cancelButton: {
    text: 'Keep It',
    icon: 'e-icons e-close',
    click: () => {
      console.log('Cancelled');
      dialogObj.hide();
    }
  }
});
```

---

## Show Close Icon

Display a close (X) icon in the dialog header:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'With Close Icon',
  content: 'Click the X to close',
  showCloseIcon: true,
  okButton: { click: () => dialogObj.hide() }
});
```

### With Close Callback

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Close Icon Example',
  content: 'Close icon is visible',
  showCloseIcon: true,
  closeOnEscape: true,
  okButton: { text: 'OK', click: () => dialogObj.hide() },
  cancelButton: { text: 'Cancel', click: () => dialogObj.hide() }
});
```

---

## Close on Escape

Enable closing the dialog by pressing the Escape key:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Press Escape to Close',
  content: 'Try pressing the Escape key',
  closeOnEscape: true,
  okButton: { click: () => dialogObj.hide() }
});
```

**Default:** `closeOnEscape: false`

---

## Custom Content for Prompts

Create prompts with custom HTML content:

### Single Input

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Enter Email',
  content: '<input id="emailInput" class="e-input" placeholder="your@email.com" />',
  okButton: {
    text: 'Submit',
    click: () => {
      const email: string = (document.getElementById('emailInput') as HTMLInputElement).value;
      console.log('Email:', email);
      dialogObj.hide();
    }
  },
  cancelButton: { text: 'Cancel', click: () => dialogObj.hide() }
});
```

### Multiple Inputs

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Registration',
  content: `
    <div style="padding: 10px 0;">
      <input id="firstName" class="e-input" placeholder="First Name" style="margin-bottom: 8px; width: 100%;" />
      <input id="lastName" class="e-input" placeholder="Last Name" style="margin-bottom: 8px; width: 100%;" />
      <input id="email" class="e-input" placeholder="Email" style="width: 100%;" />
    </div>
  `,
  width: 350,
  okButton: {
    text: 'Register',
    click: () => {
      const firstName: string = (document.getElementById('firstName') as HTMLInputElement).value;
      const lastName: string = (document.getElementById('lastName') as HTMLInputElement).value;
      const email: string = (document.getElementById('email') as HTMLInputElement).value;
      console.log({ firstName, lastName, email });
      dialogObj.hide();
    }
  },
  cancelButton: { text: 'Cancel', click: () => dialogObj.hide() }
});
```

### Textarea

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Feedback',
  content: '<textarea id="feedback" class="e-input" placeholder="Your feedback..." style="width: 100%; min-height: 100px;"></textarea>',
  width: 400,
  okButton: {
    text: 'Submit',
    click: () => {
      const feedback: string = (document.getElementById('feedback') as HTMLTextAreaElement).value;
      console.log('Feedback:', feedback);
      dialogObj.hide();
    }
  }
});
```

---

## Custom CSS Classes

Apply custom CSS for theming:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Custom Theme',
  content: 'Styled with custom CSS',
  cssClass: 'custom-themed-dialog',
  okButton: { click: () => dialogObj.hide() }
});
```

```css
/* Custom dialog theme */
.custom-themed-dialog {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.custom-themed-dialog .e-dlg-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.custom-themed-dialog .e-btn.e-primary {
  background-color: #667eea;
  border-color: #667eea;
}
```

---

## Complete Customization Example

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Save Changes',
  content: 'You have unsaved changes. What would you like to do?',
  width: 400,
  showCloseIcon: true,
  closeOnEscape: true,
  isDraggable: true,
  cssClass: 'custom-save-dialog',
  animationSettings: {
    effect: 'FadeIn',
    duration: 300
  },
  position: { X: 'Center', Y: 'Center' },
  okButton: {
    text: 'Save',
    icon: 'e-icons e-save',
    click: () => {
      console.log('Save clicked');
      dialogObj.hide();
    }
  },
  cancelButton: {
    text: 'Discard',
    icon: 'e-icons e-trash',
    click: () => {
      console.log('Discard clicked');
      dialogObj.hide();
    }
  }
});
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `okButton.text` | `string` | `'OK'` | OK button text |
| `okButton.icon` | `string` | `''` | OK button icon |
| `okButton.click` | `Function` | - | OK button click handler |
| `cancelButton.text` | `string` | `'Cancel'` | Cancel button text |
| `cancelButton.icon` | `string` | `''` | Cancel button icon |
| `cancelButton.click` | `Function` | - | Cancel button click handler |
| `showCloseIcon` | `boolean` | `false` | Show close icon |
| `closeOnEscape` | `boolean` | `false` | Close on Escape key |
| `cssClass` | `string` | `''` | Custom CSS class |

For complete API details, see [predefineddialog-api.md](./predefineddialog-api.md).
