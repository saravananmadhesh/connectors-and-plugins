# Events Reference for Angular Kanban

## Table of Contents
- [Action Events](#action-events)
- [Card Events](#card-events)
- [Drag Events](#drag-events)
- [Dialog Events](#dialog-events)
- [Selection Events](#selection-events)
- [Column and Swimlane Events](#column-and-swimlane-events)
- [Complete Events Example](#complete-events-example)

## Action Events

### actionBegin: EmitType<ActionEventArgs>

Fires at the beginning of every Kanban action.

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ActionEventArgs } from '@syncfusion/ej2-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="data"
      (actionBegin)="onActionBegin($event)">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];

  onActionBegin(args: ActionEventArgs): void {
    console.log('Action starting:', args.requestType);
    // requestType: 'Save', 'Delete', 'Drag', 'Add', etc.
    
    // Example: Prevent deletion
    if (args.requestType === 'Delete') {
      if (confirm('Are you sure?')) {
        args.cancel = false;
      } else {
        args.cancel = true;
      }
    }
  }
}
```

### ActionEventArgs Properties

| Property | Type | Purpose |
|----------|------|---------|
| `requestType` | string | Action type ('Add', 'Delete', 'Save', 'Drag', etc.) |
| `data` | Object \| Object[] | Current card data |
| `cancel` | boolean | Set to true to cancel action |
| `addedRecords` | Object[] | Cards being added |
| `changedRecords` | Object[] | Cards being modified |
| `deletedRecords` | Object[] | Cards being deleted |
| `columnData` | Object[] | Column information |
| `cardData` | Object | Current card object |

### actionComplete: EmitType<ActionEventArgs>

Fires after action completes successfully.

```typescript
onActionComplete(args: ActionEventArgs): void {
  console.log('Action completed:', args.requestType);
  if (args.requestType === 'Save') {
    console.log('Card saved:', args.data);
    // Refresh UI or show notification
  }
}
```

### actionFailure: EmitType<ActionEventArgs>

Fires when an action fails.

```typescript
onActionFailure(args: ActionEventArgs): void {
  console.error('Action failed:', args.requestType);
  console.error('Error:', args.error);
  // Show error message to user
}
```

## Card Events

### cardClick: EmitType<CardClickEventArgs>

Fires when a card is clicked.

```typescript
import { CardClickEventArgs } from '@syncfusion/ej2-kanban';

(cardClick)="onCardClick($event)"

onCardClick(args: CardClickEventArgs): void {
  console.log('Card clicked:', args.data);
  console.log('Card element:', args.element);
  
  // Example: Show card details
  this.showCardDetails(args.data);
}
```

### cardDoubleClick: EmitType<CardClickEventArgs>

Fires when a card is double-clicked.

```typescript
(cardDoubleClick)="onCardDoubleClick($event)"

onCardDoubleClick(args: CardClickEventArgs): void {
  console.log('Card double-clicked:', args.data);
  // Open edit dialog
  this.kanban.openDialog(args.data, 'Edit');
}
```

### CardClickEventArgs Properties

| Property | Type | Purpose |
|----------|------|---------|
| `data` | Object | Card data object |
| `element` | HTMLElement | Card DOM element |
| `event` | MouseEvent | Mouse event details |
| `cancel` | boolean | Set to true to cancel |

## Drag Events

### dragStart: EmitType<DragEventArgs>

Fires when card drag starts.

```typescript
import { DragEventArgs } from '@syncfusion/ej2-kanban';

(dragStart)="onDragStart($event)"

onDragStart(args: DragEventArgs): void {
  console.log('Dragging card:', args.data);
  // Show visual feedback
  args.clonedElement.style.opacity = '0.7';
}
```

### dragStop: EmitType<DragEventArgs>

Fires when card drag completes.

```typescript
(dragStop)="onDragStop($event)"

onDragStop(args: DragEventArgs): void {
  console.log('Drag complete');
  console.log('Old Status:', args.data.Status);
  console.log('New Status:', args.data.Status);  // Updated
  
  // Save to backend
  this.saveCardStatus(args.data);
}
```

### beforeDragStart: EmitType<DragEventArgs>

Fires before drag starts (for validation).

```typescript
(beforeDragStart)="onBeforeDragStart($event)"

onBeforeDragStart(args: DragEventArgs): void {
  // Prevent dragging cards with critical priority
  if (args.data.Priority === 'Critical') {
    args.cancel = true;
    alert('Cannot move critical items');
  }
}
```

### DragEventArgs Properties

| Property | Type | Purpose |
|----------|------|---------|
| `data` | Object | Card being dragged |
| `element` | HTMLElement | Card DOM element |
| `clonedElement` | HTMLElement | Visual clone during drag |
| `event` | MouseEvent | Mouse event |
| `target` | HTMLElement | Drop target |
| `cancel` | boolean | Set to true to cancel |

## Dialog Events

### dialogOpen: EmitType<DialogEventArgs>

Fires when add/edit dialog opens.

```typescript
import { DialogEventArgs } from '@syncfusion/ej2-kanban';

(dialogOpen)="onDialogOpen($event)"

onDialogOpen(args: DialogEventArgs): void {
  console.log('Dialog action:', args.action);  // 'Add' or 'Edit'
  console.log('Dialog data:', args.data);
  
  // Set default values for new cards
  if (args.action === 'Add') {
    args.data.Status = 'Open';
    args.data.Priority = 'Medium';
  }
}
```

### dialogClose: EmitType<DialogEventArgs>

Fires when add/edit dialog closes.

```typescript
(dialogClose)="onDialogClose($event)"

onDialogClose(args: DialogEventArgs): void {
  console.log('Dialog closing');
  if (args.action === 'Cancel') {
    console.log('User cancelled');
  } else if (args.action === 'Save') {
    console.log('Card saved:', args.data);
  }
}
```

### DialogEventArgs Properties

| Property | Type | Purpose |
|----------|------|---------|
| `action` | string | 'Add', 'Edit', 'Cancel', 'Save' |
| `data` | Object | Card data from form |
| `cancel` | boolean | Set to true to cancel |

## Selection Events

### cardSelection: EmitType<CardSelectionEventArgs>

Fires when card is selected/deselected.

```typescript
(cardSelection)="onCardSelection($event)"

onCardSelection(args: CardSelectionEventArgs): void {
  console.log('Selection changed');
  console.log('Selected:', args.selectedCards);
  console.log('Deselected:', args.deselectedCards);
}
```

### CardSelectionEventArgs Properties

| Property | Type | Purpose |
|----------|------|---------|
| `selectedCards` | Object[] | Currently selected cards |
| `deselectedCards` | Object[] | Recently deselected cards |

## Column and Swimlane Events

### columnClick: EmitType<ColumnClickEventArgs>

Fires when column header is clicked.

```typescript
(columnClick)="onColumnClick($event)"

onColumnClick(args: ColumnClickEventArgs): void {
  console.log('Column clicked:', args.columnData);
}
```

### swimlaneClick: EmitType<SwimlaneClickEventArgs>

Fires when swimlane header is clicked.

```typescript
(swimlaneClick)="onSwimlaneClick($event)"

onSwimlaneClick(args: SwimlaneClickEventArgs): void {
  console.log('Swimlane clicked:', args.swimlaneData);
}
```

## Complete Events Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { KanbanComponent, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import {
  ActionEventArgs,
  CardClickEventArgs,
  DragEventArgs,
  DialogEventArgs,
  CardSelectionEventArgs
} from '@syncfusion/ej2-kanban';

@Component({
  selector: 'app-kanban-events',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <div style="padding: 20px;">
      <h2>Kanban Events Demo</h2>
      <p>{{ eventLog }}</p>
    </div>

    <ejs-kanban
      #kanban
      keyField="Status"
      [dataSource]="data"
      (actionBegin)="onActionBegin($event)"
      (actionComplete)="onActionComplete($event)"
      (actionFailure)="onActionFailure($event)"
      (cardClick)="onCardClick($event)"
      (cardDoubleClick)="onCardDoubleClick($event)"
      (dragStart)="onDragStart($event)"
      (dragStop)="onDragStop($event)"
      (beforeDragStart)="onBeforeDragStart($event)"
      (dialogOpen)="onDialogOpen($event)"
      (dialogClose)="onDialogClose($event)"
      (cardSelection)="onCardSelection($event)">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanEventsComponent {
  @ViewChild('kanban') kanban: KanbanComponent;
  eventLog: string = 'Events log...';

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Priority: 'High' },
    { Id: 2, Status: 'Open', Summary: 'Task 2', Priority: 'Medium' },
    { Id: 3, Status: 'InProgress', Summary: 'Task 3', Priority: 'Low' }
  ];

  log(message: string): void {
    this.eventLog = `${new Date().toLocaleTimeString()}: ${message}`;
    console.log(message);
  }

  onActionBegin(args: ActionEventArgs): void {
    this.log(`Action Begin: ${args.requestType}`);
  }

  onActionComplete(args: ActionEventArgs): void {
    this.log(`Action Complete: ${args.requestType}`);
  }

  onActionFailure(args: ActionEventArgs): void {
    this.log(`Action Failure: ${args.requestType}`);
  }

  onCardClick(args: CardClickEventArgs): void {
    this.log(`Card Clicked: ID=${args.data.Id}, Status=${args.data.Status}`);
  }

  onCardDoubleClick(args: CardClickEventArgs): void {
    this.log(`Card Double-Clicked: ID=${args.data.Id}`);
  }

  onDragStart(args: DragEventArgs): void {
    this.log(`Drag Start: Card=${args.data.Id}`);
  }

  onDragStop(args: DragEventArgs): void {
    this.log(`Drag Stop: Card=${args.data.Id}, New Status=${args.data.Status}`);
  }

  onBeforeDragStart(args: DragEventArgs): void {
    this.log(`Before Drag Start: Card=${args.data.Id}`);
  }

  onDialogOpen(args: DialogEventArgs): void {
    this.log(`Dialog Open: Action=${args.action}`);
  }

  onDialogClose(args: DialogEventArgs): void {
    this.log(`Dialog Close: Action=${args.action}`);
  }

  onCardSelection(args: CardSelectionEventArgs): void {
    this.log(`Selection Changed: ${args.selectedCards.length} selected`);
  }
}
```

## Event Handling Patterns

### Pattern 1: Validation on Action Begin

```typescript
onActionBegin(args: ActionEventArgs): void {
  if (args.requestType === 'Delete') {
    if (!confirm('Delete this card?')) {
      args.cancel = true;
    }
  }
}
```

### Pattern 2: Save After Drag

```typescript
onDragStop(args: DragEventArgs): void {
  // Save card status change to backend
  this.api.updateCard(args.data).subscribe(
    () => this.log('Card saved'),
    (error) => this.log('Save failed')
  );
}
```

### Pattern 3: Load Card Details on Click

```typescript
onCardClick(args: CardClickEventArgs): void {
  // Load full card details
  this.api.getCardDetails(args.data.Id).subscribe(
    (fullCard) => {
      this.showDetailPanel(fullCard);
    }
  );
}
```

### Pattern 4: Pre-fill Dialog

```typescript
onDialogOpen(args: DialogEventArgs): void {
  if (args.action === 'Add') {
    // Set defaults for new cards
    args.data.Status = 'Open';
    args.data.Priority = 'Medium';
    args.data.Assignee = this.currentUser;
  }
}
```
