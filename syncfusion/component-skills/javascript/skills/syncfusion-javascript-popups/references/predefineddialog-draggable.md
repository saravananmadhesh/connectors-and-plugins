# Predefined Dialog Draggable

The Syncfusion Predefined Dialog supports dragging functionality, allowing users to move the dialog around the screen.

## Table of Contents
- [isDraggable Property](#isdraggable-property)
- [Alert with Drag](#alert-with-drag)
- [Confirm with Drag](#confirm-with-drag)
- [Prompt with Drag](#prompt-with-drag)
- [Drag Constraints](#drag-constraints)

---

## isDraggable Property

The `isDraggable` property enables drag functionality on the predefined dialog.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isDraggable` | `boolean` | `false` | Enables drag functionality |

When enabled, users can click and drag the dialog header to reposition it on the screen.

---

## Alert with Drag

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Draggable Alert',
  content: 'You can drag this dialog by its header',
  width: '300px',
  isDraggable: true,
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Confirm with Drag

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Draggable Confirm',
  content: 'Drag me around the screen',
  width: '350px',
  isDraggable: true,
  okButton: { 
    text: 'Yes',
    click: () => dialogObj.hide() 
  },
  cancelButton: { 
    text: 'No',
    click: () => dialogObj.hide() 
  }
});
```

---

## Prompt with Drag

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.confirm({
  title: 'Draggable Prompt',
  content: '<input id="nameInput" class="e-input" placeholder="Your name" />',
  width: '300px',
  isDraggable: true,
  okButton: {
    text: 'Submit',
    click: () => {
      const name: string = (document.getElementById('nameInput') as HTMLInputElement).value;
      console.log('Name:', name);
      dialogObj.hide();
    }
  },
  cancelButton: { click: () => dialogObj.hide() }
});
```

---

## Draggable with Position

Combine `isDraggable` with a custom `position`:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Custom Position + Draggable',
  content: 'Starts at custom position, can be dragged',
  position: { X: 200, Y: 150 },
  isDraggable: true,
  okButton: { click: () => dialogObj.hide() }
});
```

---

## Drag Constraints

The dialog can be dragged anywhere within the viewport. To add custom constraints, use CSS:

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Constrained Draggable',
  content: 'Drag within container bounds',
  cssClass: 'constrained-drag',
  isDraggable: true,
  okButton: { click: () => dialogObj.hide() }
});
```

```css
/* Optional: Add visual feedback for drag */
.constrained-drag .e-dlg-header {
  cursor: move;
  user-select: none;
}

.constrained-drag .e-dlg-header:hover {
  background-color: #f0f0f0;
}
```

---

## Common Pattern: Non-Modal Draggable Dialog

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

let dialogObj: any = DialogUtility.alert({
  title: 'Floating Alert',
  content: 'Non-blocking draggable dialog',
  width: '280px',
  isDraggable: true,
  position: { X: 'Right', Y: 'Top' },
  animationSettings: {
    effect: 'SlideRightIn',
    duration: 400
  },
  okButton: { click: () => dialogObj.hide() }
});
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isDraggable` | `boolean` | `false` | Enables drag functionality |

For complete API details, see [predefineddialog-api.md](./predefineddialog-api.md).
