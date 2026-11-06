# Methods Reference for Angular Kanban

## Table of Contents
- [Card Operations](#card-operations)
- [Column Operations](#column-operations)
- [Selection Operations](#selection-operations)
- [Dialog and UI Operations](#dialog-and-ui-operations)
- [Data and Query Operations](#data-and-query-operations)
- [Lifecycle Methods](#lifecycle-methods)

## Card Operations

### addCard(cardData: Record | Record[], index?: number): void

Add one or multiple cards to the Kanban.

```typescript
import { Component, ViewChild } from '@angular/core';
import { KanbanComponent } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <button (click)="addSingleCard()">Add Card</button>
    <button (click)="addMultipleCards()">Add Multiple</button>
    <ejs-kanban #kanban keyField="Status" [dataSource]="data"></ejs-kanban>
  `
})
export class KanbanComponent {
  @ViewChild('kanban') kanban: KanbanComponent;

  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];

  addSingleCard(): void {
    this.kanban.addCard({
      Id: 2,
      Status: 'Open',
      Summary: 'New task'
    });
  }

  addMultipleCards(): void {
    this.kanban.addCard([
      { Id: 3, Status: 'Open', Summary: 'Task 3' },
      { Id: 4, Status: 'InProgress', Summary: 'Task 4' }
    ]);
  }

  // Add at specific position within column
  addCardAtIndex(): void {
    this.kanban.addCard({
      Id: 5,
      Status: 'Open',
      Summary: 'Task at index 1'
    }, 1);  // Position 1 in column
  }
}
```

### deleteCard(cardData: string | number | Record | Record[]): void

Remove card(s) from Kanban.

```typescript
// Delete by ID
deleteCard(id: string | number): void {
  this.kanban.deleteCard(1);
}

// Delete by object
deleteCard(): void {
  this.kanban.deleteCard({ Id: 1, Status: 'Open' });
}

// Delete multiple
deleteMultiple(): void {
  this.kanban.deleteCard([1, 2, 3]);
}
```

### updateCard(cardData: Record, index?: number): void

Update an existing card's data.

```typescript
updateCard(): void {
  this.kanban.updateCard({
    Id: 1,
    Status: 'InProgress',  // Changed from 'Open'
    Summary: 'Updated task description'
  });
}

// Update at specific position
updateCardAtIndex(): void {
  this.kanban.updateCard({
    Id: 1,
    Status: 'Close',
    Summary: 'Completed'
  }, 0);
}
```

### getCardCount(key?: string): number

Get count of cards in a column or total cards.

```typescript
// Total cards in board
getTotalCards(): void {
  const total = this.kanban.getCardCount();
  console.log('Total cards:', total);
}

// Cards in specific column
getColumnCardCount(): void {
  const count = this.kanban.getCardCount('InProgress');
  console.log('In Progress cards:', count);
}
```

## Column Operations

### addColumn(columnOptions: ColumnsModel, index: number): void

Add a new column to the Kanban.

```typescript
import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';

addColumn(): void {
  const newColumn: ColumnsModel = {
    headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    maxCount: 5
  };
  this.kanban.addColumn(newColumn, 2);  // Insert at position 2
}
```

### removeColumn(key: string | number): void

Remove a column from the Kanban.

```typescript
removeColumn(): void {
  this.kanban.removeColumn('Testing');  // Remove by keyField
}
```

### hideColumn(key: string | number): void

Hide a column without removing it.

```typescript
hideColumn(): void {
  this.kanban.hideColumn('Close');
}
```

### showColumn(key: string | number): void

Show a previously hidden column.

```typescript
showColumn(): void {
  this.kanban.showColumn('Close');
}
```

### toggleColumnCollapse(key: string | number): void

Collapse or expand a column.

```typescript
toggleColumn(): void {
  this.kanban.toggleColumnCollapse('InProgress');
}
```

## Selection Operations

### getSelectedCards(): HTMLElement[]

Get all currently selected card elements.

```typescript
getSelected(): void {
  const selectedCards = this.kanban.getSelectedCards();
  console.log('Selected card count:', selectedCards.length);
  selectedCards.forEach(card => {
    console.log('Card ID:', card.id);
  });
}
```

### selectCard(cardId: string | number): void

Programmatically select a card.

```typescript
selectCard(): void {
  this.kanban.selectCard(1);
}

// Select multiple
selectMultiple(): void {
  this.kanban.selectCard(1);
  this.kanban.selectCard(2, true);  // true = add to selection
}
```

### deselectCard(cardId: string | number): void

Deselect a card.

```typescript
deselectCard(): void {
  this.kanban.deselectCard(1);
}
```

## Dialog and UI Operations

### openDialog(data?: Record, action?: string): void

Open add/edit dialog programmatically.

```typescript
// Open new card dialog
openNewCardDialog(): void {
  this.kanban.openDialog();
}

// Open edit dialog for existing card
openEditDialog(): void {
  this.kanban.openDialog({
    Id: 1,
    Status: 'Open',
    Summary: 'Task to edit'
  }, 'Edit');
}

// Pre-fill new card dialog
openWithDefaults(): void {
  this.kanban.openDialog({
    Status: 'Open',  // Pre-select status
    Priority: 'High'  // Pre-select priority
  });
}
```

### closeDialog(): void

Close currently open dialog.

```typescript
closeCurrentDialog(): void {
  this.kanban.closeDialog();
}
```

### refresh(): void

Refresh/redraw the entire Kanban board.

```typescript
refreshBoard(): void {
  this.kanban.refresh();
}
```

### print(): void

Print the Kanban board.

```typescript
printBoard(): void {
  this.kanban.print();
}
```

## Data and Query Operations

### getSwimlaneData(key: string): Record[]

Get all cards in a swimlane by key.

```typescript
getSwimlaneCards(): void {
  const nancyCards = this.kanban.getSwimlaneData('Nancy');
  console.log('Nancy\'s tasks:', nancyCards);
  console.log('Task count:', nancyCards.length);
}
```

### search(searchString: string): void

Search cards by string.

```typescript
searchCards(): void {
  this.kanban.search('authentication');  // Find cards with 'authentication'
}

// Search with input
onSearchInput(searchTerm: string): void {
  this.kanban.search(searchTerm);
}
```

### filter(predicateFn: Function | string, value?: string): void

Filter cards with predicate function.

```typescript
// Filter by field value
filterByPriority(): void {
  this.kanban.filter('Priority', 'High');
}

// Filter with predicate
filterByCondition(): void {
  this.kanban.filter((card) => {
    return card.Priority === 'High' && card.Assignee === 'Nancy';
  });
}
```

### sort(predicateFn: Function | string, direction?: 'Ascending' | 'Descending'): void

Sort cards in columns.

```typescript
// Sort by field
sortByPriority(): void {
  this.kanban.sort('Priority', 'Descending');
}

// Sort with custom function
sortCustom(): void {
  this.kanban.sort((a, b) => {
    return b.Estimate - a.Estimate;  // Descending by estimate
  });
}
```

## Lifecycle Methods

### getDataManager(): DataManager

Get the DataManager instance.

```typescript
getManager(): void {
  const dataManager = this.kanban.getDataManager();
  console.log('DataManager:', dataManager);
}
```

### destroy(): void

Destroy Kanban instance and cleanup.

```typescript
ngOnDestroy(): void {
  if (this.kanban) {
    this.kanban.destroy();
  }
}
```

---

## Complete Methods Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { KanbanComponent, KanbanModule, ColumnsModel } from '@syncfusion/ej2-angular-kanban';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-kanban-methods',
  standalone: true,
  imports: [CommonModule, FormsModule, KanbanModule],
  template: `
    <div style="margin-bottom: 20px;">
      <h3>Card Operations</h3>
      <button (click)="addNewCard()">Add Card</button>
      <button (click)="updateSelectedCard()">Update Selected</button>
      <button (click)="deleteSelectedCard()">Delete Selected</button>
      <button (click)="printBoard()">Print</button>
    </div>

    <div style="margin-bottom: 20px;">
      <h3>Column Operations</h3>
      <button (click)="addTestingColumn()">Add Testing Column</button>
      <button (click)="hideClosedColumn()">Hide Closed</button>
      <button (click)="showClosedColumn()">Show Closed</button>
    </div>

    <div style="margin-bottom: 20px;">
      <h3>Search and Filter</h3>
      <input 
        [(ngModel)]="searchTerm" 
        placeholder="Search cards"
        (input)="performSearch()">
      <button (click)="clearSearch()">Clear</button>
    </div>

    <ejs-kanban
      #kanban
      keyField="Status"
      [dataSource]="data">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanMethodsComponent {
  @ViewChild('kanban') kanban: KanbanComponent;
  searchTerm: string = '';

  data = [
    { Id: 1, Status: 'Open', Summary: 'Design homepage' },
    { Id: 2, Status: 'Open', Summary: 'Setup database' },
    { Id: 3, Status: 'InProgress', Summary: 'API development' },
    { Id: 4, Status: 'Close', Summary: 'Deploy app' }
  ];

  addNewCard(): void {
    this.kanban.addCard({
      Id: 5,
      Status: 'Open',
      Summary: 'New task'
    });
  }

  updateSelectedCard(): void {
    this.kanban.updateCard({
      Id: 1,
      Status: 'InProgress',
      Summary: 'Design complete - moving to development'
    });
  }

  deleteSelectedCard(): void {
    this.kanban.deleteCard(1);
  }

  addTestingColumn(): void {
    this.kanban.addColumn({
      headerText: 'Testing',
      keyField: 'Testing'
    }, 2);
  }

  hideClosedColumn(): void {
    this.kanban.hideColumn('Close');
  }

  showClosedColumn(): void {
    this.kanban.showColumn('Close');
  }

  performSearch(): void {
    if (this.searchTerm) {
      this.kanban.search(this.searchTerm);
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.kanban.search('');
  }

  printBoard(): void {
    this.kanban.print();
  }
}
```
