---
name: cell-operations
description: 'Cell operations in Syncfusion Grid: selection, manipulation, formatting, events, and data access.'
---

# Cell Operations

## Table of Contents
- [Cell Selection](#cell-selection)
- [Cell Data Access](#cell-data-access)
- [Cell Formatting](#cell-formatting)
- [Cell Templates](#cell-templates)
- [Cell Events](#cell-events)

## When to Use This Reference

- Get or set cell values programmatically
- Apply custom styles and formatting to cells
- Implement cell-level validation and data formatting
- Update cell content dynamically without refreshing
- Access cell data and metadata during user interactions

## Cell Selection

### Get Selected Cells

```ts
import { Grid, CellSelection, Page } from '@syncfusion/ej2-grids';

Grid.Inject(CellSelection, Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  selectionSettings: { type: 'Multiple', mode: 'Cell' },
  allowPaging: true
});

grid.appendTo('#grid');

// Get selected cells
const selectedCells = grid.getSelectedCellIndexes();
console.log('Selected cells:', selectedCells);

// Get selected cell data
const activeCell = grid.getCurrentViewRecords()[grid.selectedRowIndex];
console.log('Active row data:', activeCell);
```

### Cell Selection by Index

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  selectionSettings: { type: 'Multiple', mode: 'Cell' }
});

grid.appendTo('#grid');

// Select specific cell by row and column index
grid.selectCell({ rowIndex: 0, cellIndex: 1 }, false);

// Select range of cells
grid.selectCell([{ rowIndex: 0, cellIndex: 0 }, { rowIndex: 1, cellIndex: 2 }], false);
```

### Cell Range Selection

```ts
import { Grid, Selection, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Selection, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  selectionSettings: { type: 'Multiple', mode: 'Cell' },
  cellSelected: (args: any) => {
    console.log('Cell selected:', args.data);
  },
  cellDeselected: (args: any) => {
    console.log('Cell deselected:', args.data);
  }
});

grid.appendTo('#grid');
```

## Cell Data Access

### Get Cell Value

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');

// Get cell value by row and field
const cellValue = grid.getCellFromIndex(0, 1);
console.log('Cell value:', cellValue.textContent);

// Get value from specific row
const rowData = grid.getCurrentViewRecords()[0];
const freight = rowData.Freight;
console.log('Freight value:', freight);
```


## Cell Formatting

### Cell Text Formatting

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      width: 120, 
      type: 'number', 
      format: 'C2',  // Currency format
      textAlign: 'Right'
    }
  ]
});

grid.appendTo('#grid');
```

### Conditional Cell Styling

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  recordRender: (args: any) => {
    // Color cells based on value
    const freight = args.data.Freight;
    if (freight > 50) {
      args.rowElement.cells[2].style.backgroundColor = '#90EE90';
      args.rowElement.cells[2].style.color = '#000';
    } else if (freight < 20) {
      args.rowElement.cells[2].style.backgroundColor = '#FFB6C1';
      args.rowElement.cells[2].style.color = '#000';
    }
  }
});

grid.appendTo('#grid');
```

### Cell Alignment and Styling

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { 
      field: 'OrderID', 
      headerText: 'Order ID', 
      width: 100,
      textAlign: 'Center'
    },
    { 
      field: 'CustomerName', 
      headerText: 'Customer Name', 
      width: 150,
      textAlign: 'Left'
    },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      width: 120,
      textAlign: 'Right',
      cssClass: 'freight-cell'  // Custom CSS class
    }
  ]
});

grid.appendTo('#grid');
```

## Cell Templates

### Cell Template

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', Status: 'Active', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', Status: 'Inactive', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: 120,
      template: '<span class="badge">${Status}</span>'
    },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      width: 120,
      template: '<span style="color: green;">$${Freight}</span>'
    }
  ],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Cell Template with HTML

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { 
      field: 'CustomerName', 
      headerText: 'Customer', 
      width: 150,
      template: '<div><strong>${CustomerName}</strong><br/><small>${OrderID}</small></div>'
    },
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: 120,
      template: (props: any) => {
        const statusClass = props.Status === 'Active' ? 'status-active' : 'status-inactive';
        return `<span class="${statusClass}">${props.Status}</span>`;
      }
    }
  ]
});

grid.appendTo('#grid');
```

### Function-Based Cell Template

```ts
const statusTemplate = (props: any) => {
  return `<div class="status-indicator">
            <span class="status-${props.Status.toLowerCase()}">${props.Status}</span>
            <i class="icon-${props.Status.toLowerCase()}"></i>
          </div>`;
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: 120,
      template: statusTemplate
    }
  ]
});

grid.appendTo('#grid');
```

## Cell Events

### Cell Click and Double Click

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  recordDoubleClick: (args: any) => {
    console.log('Double clicked on:', args.rowData);
    console.log('Cell index:', args.columnIndex);
  },
  cellClick: (args: any) => {
    if (args.column) {
      console.log('Cell clicked:', args.column.field, args.data);
    }
  }
});

grid.appendTo('#grid');
```

### Cell Selection Event

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  selectionSettings: { type: 'Multiple', mode: 'Cell' },
  cellSelected: (args: any) => {
    console.log('Cell selected:', {
      rowIndex: args.rowIndex,
      cellIndex: args.cellIndex,
      data: args.data
    });
  },
  cellDeselected: (args: any) => {
    console.log('Cell deselected:', args);
  }
});

grid.appendTo('#grid');
```

### Cell Focus Event

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  cellFocused: (args: any) => {
    console.log('Cell focused:', args);
    // Add focus indicator
    const cellElement = args.cellElement as HTMLElement;
    cellElement.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
  }
});

grid.appendTo('#grid');
```

### Cell Edit Event

```ts
import { Grid, Edit, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  editSettings: { mode: 'Inline', allowEditing: true },
  cellEdit: (args: any) => {
    console.log('Cell value before edit:', args.data);
    // Validate before update
    if (args.columnName === 'Freight' && args.value < 0) {
      args.cancel = true; // Cancel the edit
      alert('Freight cannot be negative');
    }
  }
});

grid.appendTo('#grid');
```

### Action Complete Event

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  actionComplete: (args: any) => {
    if (args.requestType === 'cellUpdate') {
      console.log('Cell update completed:', args.data);
    } else if (args.requestType === 'cellSave') {
      console.log('Cell value saved:', args.data);
    }
  }
});

grid.appendTo('#grid');
```

## Common Cell Operations Patterns

### Pattern 1: Bulk Cell Update

```ts
const updateMultipleCells = (grid: Grid, updates: any[]) => {
  updates.forEach(update => {
    grid.setCellValue(update.rowIndex, update.field, update.value);
  });
};

// Usage
updateMultipleCells(grid, [
  { rowIndex: 0, field: 'Freight', value: 100 },
  { rowIndex: 1, field: 'CustomerName', value: 'New Name' }
]);
```

### Pattern 2: Cell Validation

```ts
const validateCellValue = (column: string, value: any): boolean => {
  if (column === 'Freight') {
    return value > 0 && value < 1000;
  }
  if (column === 'CustomerName') {
    return value && value.length > 0 && value.length <= 100;
  }
  return true;
};
```

### Pattern 3: Cell Highlight

```ts
const highlightCell = (grid: Grid, rowIndex: number, cellIndex: number, color: string) => {
  const cellElement = grid.getCellFromIndex(rowIndex, cellIndex) as HTMLElement;
  if (cellElement) {
    cellElement.style.backgroundColor = color;
    cellElement.style.fontWeight = 'bold';
  }
};
```
