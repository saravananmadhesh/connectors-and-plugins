# Predefined Dialog Dimension

The Syncfusion Predefined Dialog supports custom dimensions for width, height, and CSS class-based constraints.

## Table of Contents
- [Width and Height](#width-and-height)
- [Width Examples](#width-examples)
- [Height Examples](#height-examples)
- [CSS Class for Constraints](#css-class-for-constraints)
- [Alert Dimension Examples](#alert-dimension-examples)
- [Confirm Dimension Examples](#confirm-dimension-examples)
- [Prompt Dimension Examples](#prompt-dimension-examples)

---

## Width and Height

The `width` and `height` properties accept:

| Type | Description | Example |
|------|-------------|---------|
| `number` | Pixel value | `400` |
| `string` | CSS value | `'400px'`, `'50%'`, `'auto'` |

**Defaults:**
- `width`: `'auto'` (adapts to content)
- `height`: `'auto'` (adapts to content)

---

## Width Examples

### Fixed Width (Pixels)

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Fixed Width',
  content: 'This dialog is 400px wide',
  width: 400,
  okButton: { click: () => dialogObj.hide() }
});
```

### Percentage Width

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Responsive Width',
  content: 'Takes 50% of viewport width',
  width: '50%',
  okButton: { click: () => dialogObj.hide() }
});
```

### String Width

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Custom Width',
  content: '350px width',
  width: '350px',
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Height Examples

### Fixed Height

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Fixed Height',
  content: 'This dialog has fixed height',
  width: 400,
  height: 250,
  okButton: { click: () => dialogObj.hide() }
});
```

### Auto Height (Default)

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Auto Height',
  content: 'Height adjusts to content',
  width: 400,
  height: 'auto',
  okButton: { click: () => dialogObj.hide() }
});
```

---

## CSS Class for Constraints

Use the `cssClass` property to apply max-width, min-width, or other constraints:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Bounded Width',
  content: 'Width is between 300px and 600px',
  width: '90%',
  cssClass: 'bounded-dialog',
  okButton: { click: () => dialogObj.hide() }
});
```

```css
/* Constrain max and min width */
.bounded-dialog {
  max-width: 600px;
  min-width: 300px;
}

/* Responsive constraints */
.bounded-dialog {
  max-width: 90vw;
  min-width: 280px;
}
```

---

## Alert Dimension Examples

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Small alert
let smallAlert: any = DialogUtility.alert({
  title: 'Quick Notice',
  content: 'Short message',
  width: '250px',
  okButton: { click: () => smallAlert.hide() }
});

// Medium alert
let mediumAlert: any = DialogUtility.alert({
  title: 'Information',
  content: 'This is a medium-sized alert dialog with moderate content.',
  width: 400,
  height: 'auto',
  okButton: { click: () => mediumAlert.hide() }
});

// Large alert
let largeAlert: any = DialogUtility.alert({
  title: 'Detailed Information',
  content: 'This is a larger alert dialog for displaying more detailed information to the user.',
  width: '600px',
  height: 300,
  okButton: { click: () => largeAlert.hide() }
});
```

---

## Confirm Dimension Examples

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Compact confirm
let compactConfirm: any = DialogUtility.confirm({
  title: 'Delete?',
  content: 'Are you sure?',
  width: '280px',
  okButton: { text: 'Yes', click: () => compactConfirm.hide() },
  cancelButton: { text: 'No', click: () => compactConfirm.hide() }
});

// Standard confirm
let standardConfirm: any = DialogUtility.confirm({
  title: 'Confirm Action',
  content: 'This action will affect multiple items in your workspace.',
  width: 400,
  okButton: { text: 'Confirm', click: () => standardConfirm.hide() },
  cancelButton: { text: 'Cancel', click: () => standardConfirm.hide() }
});

// Large confirm with constraints
let largeConfirm: any = DialogUtility.confirm({
  title: 'Important Decision',
  content: 'Please review carefully before proceeding with this action.',
  width: '90%',
  cssClass: 'large-confirm',
  okButton: { text: 'I Understand', click: () => largeConfirm.hide() },
  cancelButton: { text: 'Cancel', click: () => largeConfirm.hide() }
});
```

```css
.large-confirm {
  max-width: 600px;
  min-width: 320px;
}
```

---

## Prompt Dimension Examples

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Compact prompt
let compactPrompt: any = DialogUtility.confirm({
  title: 'Quick Input',
  content: '<input id="input1" class="e-input" placeholder="Type..." />',
  width: '280px',
  okButton: { text: 'OK', click: () => compactPrompt.hide() }
});

// Standard prompt
let standardPrompt: any = DialogUtility.confirm({
  title: 'Enter Your Name',
  content: '<input id="nameInput" class="e-input" placeholder="Your name" />',
  width: 350,
  okButton: {
    text: 'Submit',
    click: () => {
      const name: string = (document.getElementById('nameInput') as HTMLInputElement).value;
      console.log(name);
      standardPrompt.hide();
    }
  }
});

// Multi-field prompt
let multiPrompt: any = DialogUtility.confirm({
  title: 'User Information',
  content: `
    <div style="padding: 10px 0;">
      <label>Name: <input id="nameField" class="e-input" style="width: 100%; margin-bottom: 10px;" /></label>
      <label>Email: <input id="emailField" class="e-input" style="width: 100%; margin-bottom: 10px;" /></label>
      <label>Phone: <input id="phoneField" class="e-input" style="width: 100%;" /></label>
    </div>
  `,
  width: 450,
  height: 300,
  okButton: {
    text: 'Save',
    click: () => {
      const name: string = (document.getElementById('nameField') as HTMLInputElement).value;
      const email: string = (document.getElementById('emailField') as HTMLInputElement).value;
      const phone: string = (document.getElementById('phoneField') as HTMLInputElement).value;
      console.log({ name, email, phone });
      multiPrompt.hide();
    }
  }
});
```

---

## Responsive Dialog Pattern

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

function isMobile(): boolean {
  return window.innerWidth < 768;
}

let dialogObj: any = DialogUtility.alert({
  title: 'Responsive Dialog',
  content: 'Adapts to screen size',
  width: isMobile() ? '95%' : '500px',
  cssClass: isMobile() ? 'mobile-dialog' : 'desktop-dialog',
  okButton: { click: () => dialogObj.hide() }
});
```

```css
.mobile-dialog {
  max-width: 95vw;
  margin: 0 auto;
}

.desktop-dialog {
  max-width: 500px;
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `number \| string` | `'auto'` | Dialog width |
| `height` | `number \| string` | `'auto'` | Dialog height |
| `cssClass` | `string` | `''` | Custom CSS class |

For complete API details, see [predefineddialog-api.md](./predefineddialog-api.md).
