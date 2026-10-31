# Drag and Drop in Angular Kanban

## Table of Contents
- [Overview](#overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Column to Column Movement](#column-to-column-movement)
- [Within Column Reordering](#within-column-reordering)
- [Drag Events](#drag-events)
- [WIP Limits](#wip-limits)
- [Transition Columns](#transition-columns)
- [Preventing Drag](#preventing-drag)

## Overview

Drag-and-drop is the core interaction in Kanban. It allows users to:
- Move cards between columns (change status)
- Reorder cards within a column
- Organize tasks based on workflow progress

**Drag-and-drop is enabled by default** via the `allowDragAndDrop` property.

## Enabling Drag and Drop

### Default Behavior (Enabled)

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="data"
      [allowDragAndDrop]="true">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ];
}
```

### Disable Drag and Drop

```typescript
<ejs-kanban 
  [allowDragAndDrop]="false"
  keyField="Status">
</ejs-kanban>
```

When disabled, cards cannot be moved by users (but can be updated via API).

## Column to Column Movement

Move cards between columns to change their status:

```typescript
// Visual representation
┌──────────────┐    ┌─────────────┐    ┌────────────┐
│   To Do      │    │ In Progress │    │    Done    │
├──────────────┤    ├─────────────┤    ├────────────┤
│ Task 1 ──────┼───→│ Task 1      │    │            │
│ Task 2       │    │ Task 3 ─────┼───→│ Task 3     │
│ Task 4       │    │             │    │ Task 5     │
└──────────────┘    └─────────────┘    └────────────┘
```

**When a card moves:**
1. User drags card from "To Do" to "In Progress"
2. Kanban updates the Status field to "InProgress"
3. Card is removed from "To Do" column
4. Card appears in "In Progress" column
5. dragStop event fires with updated data

### Example Data Update

```typescript
// Before drag
{ Id: 1, Status: 'Open', Summary: 'Task 1' }

// After dragging to In Progress column
{ Id: 1, Status: 'InProgress', Summary: 'Task 1' }
```

## Within Column Reordering

Reorder cards within the same column (change card order):

```typescript
// Drag card within To Do column
┌──────────────┐
│   To Do      │
├──────────────┤
│ Task 2 ↑     │
│ Task 1 ↓  (drag Task 1 up)
│ Task 4       │
│ Task 3       │
└──────────────┘

// After reordering
┌──────────────┐
│   To Do      │
├──────────────┤
│ Task 1       │  (moved up)
│ Task 2       │  (moved down)
│ Task 4       │
│ Task 3       │
└──────────────┘
```

The RankId field (if present) may be updated to reflect new order.

## Drag Events

Listen to drag lifecycle events:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DragEventArgs } from '@syncfusion/ej2-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="data"
      (beforeDragStart)="onBeforeDragStart($event)"
      (dragStart)="onDragStart($event)"
      (dragStop)="onDragStop($event)">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ];

  onBeforeDragStart(args: DragEventArgs): void {
    console.log('Drag starting:', args.data);
    // Can cancel drag by setting args.cancel = true
  }

  onDragStart(args: DragEventArgs): void {
    console.log('Dragging card:', args.data);
    // Can show visual feedback here
  }

  onDragStop(args: DragEventArgs): void {
    console.log('Drag completed:', args.data);
    console.log('New status:', args.data.Status);
    // Save to backend here
  }
}
```

### DragEventArgs Properties

| Property | Type | Purpose |
|----------|------|---------|
| `data` | Object | Card being dragged |
| `element` | HTMLElement | Card DOM element |
| `event` | MouseEvent | Mouse event details |
| `cancel` | boolean | Set to true to cancel drag |
| `target` | HTMLElement | Drop target element |
| `clonedElement` | HTMLElement | Visual clone during drag |

## WIP Limits

Enforce Work-In-Progress limits to restrict card counts per column:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status" [dataSource]="data">
      <e-columns>
        <e-column 
          headerText="To Do" 
          keyField="Open"
          minCount="1"
          maxCount="5">
        </e-column>
        <e-column 
          headerText="In Progress" 
          keyField="InProgress"
          minCount="0"
          maxCount="3">
        </e-column>
        <e-column 
          headerText="Done" 
          keyField="Close"
          minCount="0"
          maxCount="10">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'Open', Summary: 'Task 2' }
  ];
}
```

### Limit Behavior

**minCount=0, maxCount=3** means:
- Column can have 0-3 cards
- If column has 3 cards, new cards cannot be dropped (user gets error)
- If column has 0 cards, warning indicator appears
- Helps prevent bottlenecks in workflow

**Example validation:**
```
┌─────────────────┐
│ In Progress     │
│ (3/3 max)       │ ← Full! Cannot add more
├─────────────────┤
│ [Task 1]        │
│ [Task 2]        │
│ [Task 3]        │
└─────────────────┘
```

### WIP with Swimlanes

Enforce WIP per swimlane within each column:

```typescript
swimlaneSettings: {
  keyField: 'Assignee'
}

columns: [
  {
    headerText: 'In Progress',
    keyField: 'InProgress',
    minCount: 0,
    maxCount: 2  // Each person: max 2 tasks in progress
  }
]
```

## Transition Columns

Restrict which columns can accept cards from other columns using the `transitionColumns` property. This enforces workflow rules and prevents invalid state transitions.

### Basic Transition Control

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="data">
      <e-columns>
        <e-column 
          headerText="To Do" 
          keyField="Open"
          [transitionColumns]="['InProgress']">
        </e-column>
        <e-column 
          headerText="In Progress" 
          keyField="InProgress"
          [transitionColumns]="['Testing', 'Close']">
        </e-column>
        <e-column 
          headerText="Testing" 
          keyField="Testing"
          [transitionColumns]="['Close', 'Open']">
        </e-column>
        <e-column 
          headerText="Done" 
          keyField="Close">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ];
}
```

**Effect:**
- "To Do" cards can only move to "In Progress"
- "In Progress" cards can move to "Testing" or "Done"
- "Testing" cards can move to "Done" or back to "To Do" (if bugs found)
- "Done" cards cannot be moved (no transitionColumns specified)

### Linear Workflow (No Skipping Steps)

Enforce a strict sequential workflow where each step must be completed in order:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status" [dataSource]="data">
      <e-columns>
        <e-column 
          headerText="Analysis" 
          keyField="Analysis"
          [transitionColumns]="['Design']">
        </e-column>
        <e-column 
          headerText="Design" 
          keyField="Design"
          [transitionColumns]="['Development']">
        </e-column>
        <e-column 
          headerText="Development" 
          keyField="Development"
          [transitionColumns]="['Testing']">
        </e-column>
        <e-column 
          headerText="Testing" 
          keyField="Testing"
          [transitionColumns]="['Deployed']">
        </e-column>
        <e-column 
          headerText="Deployed" 
          keyField="Deployed"
          [allowDrag]="false">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Analysis', Summary: 'Feature A' },
    { Id: 2, Status: 'Development', Summary: 'Feature B' }
  ];
}
```

**Effect:**
- Cards must progress through: Analysis → Design → Development → Testing → Deployed
- No skipping steps allowed
- No moving backwards
- Final "Deployed" column is locked (cannot drag out)

### Approval Flow with Multiple Paths

Allow different paths for different approval levels:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status" [dataSource]="data">
      <e-columns>
        <e-column 
          headerText="Submitted" 
          keyField="Open"
          [transitionColumns]="['Review']">
        </e-column>
        <e-column 
          headerText="Under Review" 
          keyField="Review"
          [transitionColumns]="['Approved', 'Rejected', 'Open']">
        </e-column>
        <e-column 
          headerText="Approved" 
          keyField="Approved"
          [transitionColumns]="['Deployed']">
        </e-column>
        <e-column 
          headerText="Rejected" 
          keyField="Rejected"
          [transitionColumns]="['Open']">
        </e-column>
        <e-column 
          headerText="Deployed" 
          keyField="Deployed"
          [allowDrag]="false">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Change Request 1' },
    { Id: 2, Status: 'Review', Summary: 'Change Request 2' }
  ];
}
```

### Per-Column Drag and Drop Control

Combine `transitionColumns` with `allowDrag` and `allowDrop`:

```typescript
<e-columns>
  <e-column 
    headerText="Archive" 
    keyField="Archive"
    [allowDrag]="true"       // Can restore from archive
    [allowDrop]="true"       // Can archive items
    [transitionColumns]="['Open']">  // Can only restore to Open
  </e-column>
  
  <e-column 
    headerText="Open" 
    keyField="Open"
    [allowDrag]="true"
    [allowDrop]="true"
    [transitionColumns]="['InProgress', 'Archive']">
  </e-column>
  
  <e-column 
    headerText="Locked" 
    keyField="Locked"
    [allowDrag]="false"      // Cannot move once locked
    [allowDrop]="true"
    [transitionColumns]="[]">  // No outbound transitions
  </e-column>
</e-columns>
```

**Effect:**
- Archive column allows restoring items back to Open
- Open items can move to InProgress or be archived
- Locked column is a one-way trap (items cannot be moved out)

## Preventing Drag

### Cancel Drag in Event

```typescript
onBeforeDragStart(args: DragEventArgs): void {
  // Don't allow dragging cards with Critical priority
  if (args.data.Priority === 'Critical') {
    args.cancel = true;
    alert('Cannot move critical tasks');
  }
}
```

### Disable for Specific Cards

```typescript
// Add a read-only flag to data
{ Id: 1, Status: 'Open', Summary: 'Task 1', readOnly: true }

// Check in event
onBeforeDragStart(args: DragEventArgs): void {
  if (args.data.readOnly) {
    args.cancel = true;
  }
}
```

### Keyboard Shortcuts During Drag

- **Arrow Keys** - Navigate to adjacent cards
- **Escape** - Cancel drag operation
- **Enter** - Confirm drop (if using custom drop zones)

## Advanced Drag Scenarios

### Multi-Select and Drag

When multiple cards are selected, dragging one moves all:

```typescript
cardSettings: {
  selectionType: 'Multiple'
}

// Select multiple cards (Ctrl+Click or Shift+Click)
// Then drag one → all selected cards move
```

### Drag to External Target

Listen to drag events to handle drops outside Kanban:

```typescript
onDragStop(args: DragEventArgs): void {
  if (args.target && args.target.id === 'external-zone') {
    // Handle external drop
    console.log('Dropped outside Kanban:', args.data);
  }
}
```

### Drag Validation

```typescript
onDragStop(args: DragEventArgs): void {
  // Example: Prevent moving to Done without approval
  if (args.data.Status === 'Close' && !args.data.ApprovedBy) {
    alert('Card must be approved before closing');
    // Need to revert status (reload data)
  }
}
```

## Performance Tips for Drag and Drop

- **Virtual scrolling** - For 1000+ cards, enable virtual scrolling
- **Minimize event handlers** - Keep onDragStop logic fast
- **Batch updates** - Group multiple drag operations
- **Debounce saves** - Wait 500ms after drag before saving to backend
