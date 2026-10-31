# Chip Drag and Drop

## Table of Contents
- [Overview](#overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Restricting the Drag Area](#restricting-the-drag-area)
- [Cross-Container Drag and Drop](#cross-container-drag-and-drop)
- [Drag and Drop Events](#drag-and-drop-events)
- [Preventing Drag or Drop](#preventing-drag-or-drop)
- [Customizing the Drag Clone](#customizing-the-drag-clone)

---

## Overview

The Chips component supports drag-and-drop reordering. Users can pick up a chip and drop it at a new position within the same `ChipListComponent` or move it across multiple `ChipListComponent` containers.

A visual indicator line appears between chips during dragging to show the insertion point.

---

## Enabling Drag and Drop

Set `[allowDragAndDrop]="true"` on `ejs-chiplist`:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-draggable-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist id="draggable-chips" [allowDragAndDrop]="true">
      <e-chips>
        <e-chip text="Report" cssClass="e-info"></e-chip>
        <e-chip text="Meeting" cssClass="e-warning"></e-chip>
        <e-chip text="Review" cssClass="e-warning"></e-chip>
        <e-chip text="Budget" cssClass="e-danger"></e-chip>
        <e-chip text="Design" cssClass="e-primary"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class DraggableChipsComponent {}
```

- `[allowDragAndDrop]="true"` — enables drag-and-drop reordering within the chip list.
- Default is `false`.

---

## Restricting the Drag Area

Use `dragArea` to confine dragging within a specific container. Accepts a CSS selector string or an `HTMLElement`.

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-bounded-drag-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <div id="drag-boundary" style="border: 2px dashed #ccc; padding: 16px;">
      <ejs-chiplist
        id="bounded-chips"
        [allowDragAndDrop]="true"
        dragArea="#drag-boundary"
      >
        <e-chips>
          <e-chip text="Task A"></e-chip>
          <e-chip text="Task B"></e-chip>
          <e-chip text="Task C"></e-chip>
        </e-chips>
      </ejs-chiplist>
    </div>
  `
})
export class BoundedDragChipsComponent {}
```

- `dragArea` — accepts an element ID (`"#drag-boundary"`), a CSS class (`.my-container"`), or an `HTMLElement` reference.
- By default, `dragArea` is `null` (no boundary restriction — chips can be dragged anywhere on the page).

---

## Cross-Container Drag and Drop

Enable drag and drop across multiple `ejs-chiplist` instances by enabling `[allowDragAndDrop]="true"` on all participating containers:

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-cross-container-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <div id="chip-workspace" style="display: flex; gap: 24px;">
      <div>
        <h4>To-Do</h4>
        <ejs-chiplist id="todo-list" [allowDragAndDrop]="true">
          <e-chips>
            <e-chip text="Report" cssClass="e-info"></e-chip>
            <e-chip text="Meeting" cssClass="e-warning"></e-chip>
            <e-chip text="Review" cssClass="e-warning"></e-chip>
            <e-chip text="Budget" cssClass="e-danger"></e-chip>
            <e-chip text="Design" cssClass="e-primary"></e-chip>
            <e-chip text="Presentation" cssClass="e-success"></e-chip>
          </e-chips>
        </ejs-chiplist>
      </div>

      <div>
        <h4>Done</h4>
        <ejs-chiplist id="done-list" [allowDragAndDrop]="true"></ejs-chiplist>
      </div>
    </div>
  `
})
export class CrossContainerChipsComponent {}
```

- Both containers must have `[allowDragAndDrop]="true"`.
- Chips dragged from one list drop into the other seamlessly.
- The empty `ejs-chiplist` acts as a drop target.

---

## Drag and Drop Events

Three events fire during the drag lifecycle:

| Event | When it fires | Use case |
|-------|--------------|----------|
| `dragStart` | User begins dragging a chip | Prevent drag for specific chips |
| `dragging` | Chip is being dragged (continuous) | Customize the drag clone appearance |
| `dragStop` | Drag operation ends (chip dropped) | Prevent drop, run post-drop logic |

```typescript
import { Component } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  selector: 'app-drag-event-chips',
  standalone: true,
  imports: [ChipListModule],
  template: `
    <ejs-chiplist
      id="event-chips"
      [allowDragAndDrop]="true"
      (dragStart)="onDragStart($event)"
      (dragging)="onDragging($event)"
      (dragStop)="onDragStop($event)"
    >
      <e-chips>
        <e-chip text="Report" cssClass="e-info"></e-chip>
        <e-chip text="Meeting" cssClass="e-warning"></e-chip>
        <e-chip text="Review" cssClass="e-primary"></e-chip>
        <e-chip text="Budget" cssClass="e-danger"></e-chip>
      </e-chips>
    </ejs-chiplist>
  `
})
export class DragEventChipsComponent {
  onDragStart(args: any) {
    console.log('Drag started:', args);
    // args.cancel = true; // Prevent dragging this chip
  }

  onDragging(args: any) {
    console.log('Dragging...', args);
    // Customize clone appearance here
  }

  onDragStop(args: any) {
    console.log('Drag stopped:', args);
    // args.cancel = true; // Prevent the drop
  }
}
```

Each event receives a `DragAndDropEventArgs` object.

---

## Preventing Drag or Drop

To block drag-and-drop for specific chips (e.g., locked items), use the `(dragStart)` or `(dragStop)` event and set `args.cancel = true`:

```typescript
onDragStart(args: any) {
  // Prevent dragging chips with "e-danger" class
  if (args.element && args.element.classList.contains('e-danger')) {
    args.cancel = true;
  }
}
```

To block dropping into a specific container, use `(dragStop)`:

```typescript
onDragStop(args: any) {
  // Prevent drop into the "done-list"
  if (args.droppedElement && args.droppedElement.id === 'done-list') {
    args.cancel = true;
  }
}
```

---

## Customizing the Drag Clone

During the drag, the component creates a visual clone of the chip. Use the `(dragging)` event to customize its appearance:

```typescript
onDragging(args: any) {
  if (args.clonedElement) {
    args.clonedElement.style.opacity = '0.5';
    args.clonedElement.style.transform = 'rotate(3deg)';
  }
}
```
