# Predefined Dialog Position

The Syncfusion Predefined Dialog supports flexible positioning using the `position` property.

## Table of Contents
- [Position Property](#position-property)
- [Predefined Positions](#predefined-positions)
- [Custom Pixel Position](#custom-pixel-position)
- [Alert Position Examples](#alert-position-examples)
- [Confirm Position Examples](#confirm-position-examples)
- [Prompt Position Examples](#prompt-position-examples)

---

## Position Property

The `position` property accepts an object with `X` and `Y` coordinates:

```typescript
interface PositionData {
  X: 'Left' | 'Center' | 'Right' | number;
  Y: 'Top' | 'Center' | 'Bottom' | number;
}
```

**Default:** `{ X: 'Center', Y: 'Center' }`

---

## Predefined Positions

### TopLeft

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Top Left',
  content: 'Positioned at top-left',
  position: { X: 'Left', Y: 'Top' },
  okButton: { click: () => dialogObj.hide() }
});
```

### TopCenter

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Top Center',
  content: 'Positioned at top-center',
  position: { X: 'Center', Y: 'Top' },
  okButton: { click: () => dialogObj.hide() }
});
```

### TopRight

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Top Right',
  content: 'Positioned at top-right',
  position: { X: 'Right', Y: 'Top' },
  okButton: { click: () => dialogObj.hide() }
});
```

### CenterLeft

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Center Left',
  content: 'Positioned at center-left',
  position: { X: 'Left', Y: 'Center' },
  okButton: { click: () => dialogObj.hide() }
});
```

### Center (Default)

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Center',
  content: 'Positioned at center',
  position: { X: 'Center', Y: 'Center' },
  okButton: { click: () => dialogObj.hide() }
});
```

### CenterRight

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Center Right',
  content: 'Positioned at center-right',
  position: { X: 'Right', Y: 'Center' },
  okButton: { click: () => dialogObj.hide() }
});
```

### BottomLeft

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Bottom Left',
  content: 'Positioned at bottom-left',
  position: { X: 'Left', Y: 'Bottom' },
  okButton: { click: () => dialogObj.hide() }
});
```

### BottomCenter

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Bottom Center',
  content: 'Positioned at bottom-center',
  position: { X: 'Center', Y: 'Bottom' },
  okButton: { click: () => dialogObj.hide() }
});
```

### BottomRight

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Bottom Right',
  content: 'Positioned at bottom-right',
  position: { X: 'Right', Y: 'Bottom' },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Custom Pixel Position

Position the dialog at specific pixel coordinates:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Custom Position',
  content: 'Positioned at 200px from left, 150px from top',
  position: { X: 200, Y: 150 },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Alert Position Examples

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Top-right alert (most common)
let topRightAlert: any = DialogUtility.alert({
  title: 'Notification',
  content: 'New message received',
  position: { X: 'Right', Y: 'Top' },
  okButton: { click: () => topRightAlert.hide() }
});

// Bottom-center alert
let bottomAlert: any = DialogUtility.alert({
  title: 'Info',
  content: 'Auto-saved',
  position: { X: 'Center', Y: 'Bottom' },
  okButton: { click: () => bottomAlert.hide() }
});
```

---

## Confirm Position Examples

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Centered confirm (default)
let centerConfirm: any = DialogUtility.confirm({
  title: 'Confirm',
  content: 'Proceed with this action?',
  position: { X: 'Center', Y: 'Center' },
  okButton: { text: 'Yes', click: () => centerConfirm.hide() },
  cancelButton: { text: 'No', click: () => centerConfirm.hide() }
});

// Top-right confirm
let topConfirm: any = DialogUtility.confirm({
  title: 'Delete?',
  content: 'This cannot be undone',
  position: { X: 'Right', Y: 'Top' },
  okButton: { text: 'Delete', click: () => topConfirm.hide() },
  cancelButton: { text: 'Cancel', click: () => topConfirm.hide() }
});
```

---

## Prompt Position Examples

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

// Centered prompt
let centerPrompt: any = DialogUtility.confirm({
  title: 'Enter Name',
  content: '<input id="nameInput" class="e-input" />',
  position: { X: 'Center', Y: 'Center' },
  okButton: {
    text: 'Submit',
    click: () => {
      const name: string = (document.getElementById('nameInput') as HTMLInputElement).value;
      console.log(name);
      centerPrompt.hide();
    }
  }
});

// Custom position prompt
let customPrompt: any = DialogUtility.confirm({
  title: 'Quick Input',
  content: '<input id="quickInput" class="e-input" />',
  position: { X: 100, Y: 200 },
  okButton: {
    text: 'OK',
    click: () => customPrompt.hide()
  }
});
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `PositionData` | `{ X: 'Center', Y: 'Center' }` | Dialog position |

**PositionData Interface:**

```typescript
interface PositionData {
  X: 'Left' | 'Center' | 'Right' | number;
  Y: 'Top' | 'Center' | 'Bottom' | number;
}
```

For complete API details, see [predefineddialog-api.md](./predefineddialog-api.md).
