# Grid Component - Events Reference

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Events Overview](#events-overview)
- [Data Events](#data-events)
- [Interaction Events](#interaction-events)
- [Editing Events](#editing-events)
- [Query Cell Info Event](#query-cell-info-event)
- [Column Events](#column-events)
- [Practical Examples](#practical-examples)

## When to Use This Skill

Use this skill when you need to:
- **Handle data events** — Respond to data binding and loading events
- **Track user interactions** — Monitor row selection, cell clicks, scrolling
- **Edit event handling** — Hook into edit lifecycle (start, end, save)
- **Customize cell content** — Use QueryCellInfo to style cells dynamically
- **Column operations** — Handle column resize, reorder events
- **Custom workflows** — Implement multi-step processes via events
- **Performance monitoring** — Track and log grid operations
- **Data validation** — Validate changes before committing to data source

## Events Overview

The Grid component provides 65+ events. Here are the most commonly used ones.

---

## Data Events

### beforeDataBound
**Arguments:** `BeforeDataBoundArgs`  
**Description:** Triggers before data is bound to grid

```typescript
@Component({
  selector: 'app-grid-beforedatabound',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (beforeDataBound)="onBeforeDataBound($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridBeforeDataBoundComponent {
  data: any[] = [];

  onBeforeDataBound(args: any): void {
    console.log('Before data binding:', args);
  }
}
```

### dataBound
**Arguments:** `Object`  
**Description:** Triggers when data source is populated

```typescript
@Component({
  selector: 'app-grid-databound',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (dataBound)="onDataBound($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridDataBoundComponent {
  data: any[] = [];

  onDataBound(args: any): void {
    console.log('Data bound completed');
  }
}
```

### dataSourceChanged
**Arguments:** `DataSourceChangedEventArgs`  
**Description:** Triggers when grid data is added/deleted/updated

```typescript
@Component({
  selector: 'app-grid-datasourcechanged',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (dataSourceChanged)="onDataSourceChanged($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridDataSourceChangedComponent {
  data: any[] = [];

  onDataSourceChanged(args: any): void {
    console.log('Data source changed:', args.action);
    console.log('Data:', args.data);
  }
}
```

---

## Interaction Events

### rowSelecting
**Arguments:** `RowSelectingEventArgs`  
**Description:** Triggers before row selection

```typescript
@Component({
  selector: 'app-grid-rowselecting',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (rowSelecting)="onRowSelecting($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridRowSelectingComponent {
  data: any[] = [];

  onRowSelecting(args: any): void {
    console.log('Row index:', args.rowIndex);
    if (args.rowIndex === 0) {
      args.cancel = true;  // Prevent selection
    }
  }
}
```

### rowSelected
**Arguments:** `RowSelectedEventArgs`  
**Description:** Triggers after row selection

```typescript
@Component({
  selector: 'app-grid-rowselected',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (rowSelected)="onRowSelected($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridRowSelectedComponent {
  data: any[] = [];

  onRowSelected(args: any): void {
    console.log('Selected row data:', args.data);
  }
}
```

### rowDeselecting
**Arguments:** `RowDeselectingEventArgs`  
**Description:** Triggers before row deselection

```typescript
@Component({
  selector: 'app-grid-rowdeselecting',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (rowDeselecting)="onRowDeselecting($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridRowDeselectingComponent {
  data: any[] = [];

  onRowDeselecting(args: any): void {
    console.log('Deselecting row:', args.rowIndex);
  }
}
```

### rowDeselected
**Arguments:** `RowDeselectedEventArgs`  
**Description:** Triggers after row deselection

```typescript
@Component({
  selector: 'app-grid-rowdeselected',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (rowDeselected)="onRowDeselected($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridRowDeselectedComponent {
  data: any[] = [];

  onRowDeselected(args: any): void {
    console.log('Deselected row data:', args.data);
  }
}
```

### cellSelecting
**Arguments:** `CellSelectingEventArgs`  
**Description:** Triggers before cell selection

```typescript
@Component({
  selector: 'app-grid-cellselecting',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (cellSelecting)="onCellSelecting($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridCellSelectingComponent {
  data: any[] = [];

  onCellSelecting(args: any): void {
    console.log('Selecting cell at:', args.cellIndex);
  }
}
```

### cellSelected
**Arguments:** `CellSelectedEventArgs`  
**Description:** Triggers after cell selection

```typescript
@Component({
  selector: 'app-grid-cellselected',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (cellSelected)="onCellSelected($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridCellSelectedComponent {
  data: any[] = [];

  onCellSelected(args: any): void {
    console.log('Selected cell value:', args.value);
  }
}
```

---

## Editing Events

### actionBegin
**Arguments:** `ActionEventArgs`  
**Description:** Triggers before grid action begins (add, edit, delete, sort, filter, etc.)

```typescript
@Component({
  selector: 'app-grid-actionbegin',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (actionBegin)="onActionBegin($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridActionBeginComponent {
  data: any[] = [];

  onActionBegin(args: any): void {
    console.log('Action type:', args.requestType);
    // requestType can be: 'save', 'cancel', 'delete', 'add', etc.
  }
}
```

### actionComplete
**Arguments:** `ActionEventArgs`  
**Description:** Triggers after grid action completes

```typescript
@Component({
  selector: 'app-grid-actioncomplete',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (actionComplete)="onActionComplete($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridActionCompleteComponent {
  data: any[] = [];

  onActionComplete(args: any): void {
    if (args.requestType === 'save') {
      console.log('Save completed');
      console.log('New data:', args.data);
    }
  }
}
```

### actionFailure
**Arguments:** `FailureEventArgs`  
**Description:** Triggers when grid action fails

```typescript
@Component({
  selector: 'app-grid-actionfailure',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (actionFailure)="onActionFailure($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridActionFailureComponent {
  data: any[] = [];

  onActionFailure(args: any): void {
    console.error('Action failed:', args.error);
  }
}
```

### beginEdit
**Arguments:** `BeginEditEventArgs`  
**Description:** Triggers after entering edit mode

```typescript
@Component({
  selector: 'app-grid-beginedit',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (beginEdit)="onBeginEdit($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridBeginEditComponent {
  data: any[] = [];

  onBeginEdit(args: any): void {
    console.log('Now in edit mode for:', args.data);
  }
}
```

---

## Query Cell Info Event

### queryCellInfo
**Arguments:** `QueryCellInfoEventArgs`  
**Description:** Triggers for each cell rendering

```typescript
@Component({
  selector: 'app-grid-querycellinfo',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (queryCellInfo)="onQueryCellInfo($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridQueryCellInfoComponent {
  data: any[] = [];

  onQueryCellInfo(args: any): void {
    // Highlight cells based on value
    if (args.cell?.index === 0 && args.data?.Freight > 100) {
      args.cell.classList.add('high-freight');
    }
  }
}
```

---

## Column Events

### columnSelecting
**Arguments:** `ColumnSelectingEventArgs`  
**Description:** Triggers before column selection

```typescript
@Component({
  selector: 'app-grid-columnselecting',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (columnSelecting)="onColumnSelecting($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridColumnSelectingComponent {
  data: any[] = [];

  onColumnSelecting(args: any): void {
    console.log('Selecting column:', args.column?.field);
  }
}
```

### columnSelected
**Arguments:** `ColumnSelectedEventArgs`  
**Description:** Triggers after column selection

```typescript
@Component({
  selector: 'app-grid-columnselected',
  standalone: true,
  imports: [GridModule],
  template: `
    <ejs-grid [dataSource]="data" (columnSelected)="onColumnSelected($event)">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridColumnSelectedComponent {
  data: any[] = [];

  onColumnSelected(args: any): void {
    console.log('Selected column:', args.column?.field);
  }
}
```

---

## Practical Examples

### Complete CRUD Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent, GridModule, PageService, SortService, FilterService, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid-crud',
  standalone: true,
  imports: [GridModule, CommonModule],
  providers: [PageService, SortService, FilterService, EditService, ToolbarService],
  template: `
    <div>
      <div style="margin-bottom: 10px;">
        <button (click)="handleAddRecord()">Add New Record</button>
        <button (click)="handleUpdateSelected()">Update Selected</button>
        <button (click)="handleDeleteSelected()">Delete Selected</button>
      </div>

      <ejs-grid #grid
        [dataSource]="data"
        [allowPaging]="true"
        [allowSorting]="true"
        [allowFiltering]="true"
        [editSettings]="editSettings"
        [selectionSettings]="selectionSettings"
      >
        <e-columns>
          <e-column field="OrderID" headerText="Order ID" width="100" [isPrimaryKey]="true"></e-column>
          <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
          <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
          <e-column field="ShipCity" headerText="Ship City" width="120"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class GridCRUDExample {
  @ViewChild('grid') gridComponent!: GridComponent;

  data = [
    { OrderID: 10001, CustomerID: 'ALFKI', Freight: 32.38, ShipCity: 'Berlin' },
    { OrderID: 10002, CustomerID: 'ANATR', Freight: 11.61, ShipCity: 'Madrid' },
    { OrderID: 10003, CustomerID: 'ANTON', Freight: 65.10, ShipCity: 'Marseille' },
  ];

  editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Dialog'
  };

  selectionSettings = {
    type: 'Single',
    mode: 'Row'
  };

  handleAddRecord(): void {
    const newRecord = {
      OrderID: Math.max(...this.data.map(d => d.OrderID)) + 1,
      CustomerID: 'NEWCUST',
      Freight: 50.00,
      ShipCity: 'Paris'
    };
    this.gridComponent.addRecord(newRecord);
  }

  handleUpdateSelected(): void {
    const selected = this.gridComponent.getSelectedRecords();
    if (selected.length > 0) {
      this.gridComponent.setCellValue(selected[0].OrderID, 'Freight', 99.99);
    }
  }

  handleDeleteSelected(): void {
    const selected = this.gridComponent.getSelectedRecords();
    if (selected.length > 0) {
      this.gridComponent.deleteRecord('OrderID', selected[0]);
    }
  }
}
```

### Grid with Custom Events

```typescript
@Component({
  selector: 'app-grid-events',
  standalone: true,
  imports: [GridModule],
  providers: [PageService, EditService],
  template: `
    <ejs-grid #grid
      [dataSource]="data"
      [allowPaging]="true"
      [editSettings]="editSettings"
      (actionBegin)="onActionBegin($event)"
      (actionComplete)="onActionComplete($event)"
      (rowSelected)="onRowSelected($event)"
      (queryCellInfo)="onQueryCellInfo($event)"
    >
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridWithEvents {
  @ViewChild('grid') gridComponent!: GridComponent;

  data: any[] = [];
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };

  onActionBegin(args: any): void {
    console.log(`Action started: ${args.requestType}`);
  }

  onActionComplete(args: any): void {
    console.log(`Action completed: ${args.requestType}`);
    if (args.requestType === 'save') {
      console.log('Data saved:', args.data);
    }
  }

  onRowSelected(args: any): void {
    console.log('Row selected:', args.data);
  }

  onQueryCellInfo(args: any): void {
    if (args.column?.field === 'Freight' && args.data?.Freight > 50) {
      args.cell.style.backgroundColor = '#ffcccc';
    }
  }
}
```

### Dynamic Column Management

```typescript
@Component({
  selector: 'app-grid-dynamic-columns',
  standalone: true,
  imports: [GridModule, CommonModule],
  template: `
    <div>
      <div style="margin-bottom: 10px;">
        <button (click)="handleHideFreight()">Hide Freight</button>
        <button (click)="handleShowFreight()">Show Freight</button>
        <button (click)="handleAutoFit()">Auto Fit</button>
        <button (click)="handleReorder()">Reorder Columns</button>
      </div>

      <ejs-grid #grid [dataSource]="data">
        <e-columns>
          <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
          <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
          <e-column field="Freight" headerText="Freight" width="100"></e-column>
          <e-column field="ShipCity" headerText="City" width="120"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class GridWithDynamicColumns {
  @ViewChild('grid') gridComponent!: GridComponent;

  data = [
    { OrderID: 10001, CustomerID: 'ALFKI', Freight: 32.38, ShipCity: 'Berlin' },
    { OrderID: 10002, CustomerID: 'ANATR', Freight: 11.61, ShipCity: 'Madrid' },
    { OrderID: 10003, CustomerID: 'ANTON', Freight: 65.10, ShipCity: 'Paris' }
  ];

  handleHideFreight(): void {
    this.gridComponent.hideColumns('Freight');
  }

  handleShowFreight(): void {
    this.gridComponent.showColumns('Freight');
  }

  handleAutoFit(): void {
    this.gridComponent.autoFitColumns();
  }

  handleReorder(): void {
    this.gridComponent.reorderColumns('OrderID', 'Freight');
  }
}
```
