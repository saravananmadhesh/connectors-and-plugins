---
name: row
description: 'Row operations: detail templates, drag-drop, pinning, spanning, custom rendering.'
---

# Row Operations

## Table of Contents
- [Detail Row Template](#detail-row-template)
- [Row Drag and Drop](#row-drag-and-drop)
- [Row Pinning](#row-pinning)
- [Row Spanning](#row-spanning)
- [Row Template](#row-template)

## When to Use This Reference

- Get or update row data programmatically
- Apply custom styles and formatting to rows
- Implement row-level validation and state
- Select, highlight, or disable specific rows
- Handle row click and interaction events

## Detail Row Template

### Enable Detail Template

```ts
import { Grid, DetailRow, Page } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow, Page);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims' },
  { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
  ],
  detailTemplate: '<div><p>Order Details for ${OrderID}</p></div>',
  allowPaging: true
});

grid.appendTo('#grid');
```

### Detail with Complex Content

```ts
const detailTemplate = `
  <div style="padding:20px">
    <h3>Order Details - ${OrderID}</h3>
    <p>Customer: ${CustomerName}</p>
    <p>City: ${ShipCity}</p>
    <div id="detailGrid-${OrderID}"></div>
  </div>
`;

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  detailTemplate: detailTemplate,
  detailDataBound: (args: any) => {
    // Initialize nested grid or other components
    console.log('Detail row rendered for:', args.data.OrderID);
  }
});

grid.appendTo('#grid');
```

## Row Drag and Drop

### Enable Row Drag-and-Drop

```ts
import { Grid, RowDD } from '@syncfusion/ej2-grids';

Grid.Inject(RowDD);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'ShipCity', headerText: 'City', width: 150 }
  ],
  allowRowDragAndDrop: true,
  rowDragStart: (args: any) => {
    console.log('Drag started:', args.data);
  },
  rowDropped: (args: any) => {
    console.log('Row dropped at index:', args.dropIndex);
  }
});

grid.appendTo('#grid');
```

## Row Pinning

### Freeze Rows

```ts
import { Grid, RowPinning, Page } from '@syncfusion/ej2-grids';

Grid.Inject(RowPinning, Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'ShipCity', headerText: 'City', width: 150 }
  ],
  pageSettings: { pageSize: 10 }
});

grid.appendTo('#grid');

// Pin first row
grid.rowPinningModule.pinRow(0, 'Top');

// Unpin row
grid.rowPinningModule.unpinRow(0);
```

## Row Spanning

### Span Rows

```ts
const data = [
  { OrderID: 10248, Group: 'A', CustomerName: 'VINET' },
  { OrderID: 10249, Group: 'A', CustomerName: 'TOMSP' },
  { OrderID: 10250, Group: 'B', CustomerName: 'HANAR' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Group', headerText: 'Group', width: 100, rowSpan: (args: any) => {
      // Return span count based on data
      return 2;
    }},
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

## Row Template

### Custom Row Template

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const rowTemplate = `
  <tr>
    <td>\${OrderID}</td>
    <td>\${CustomerName}</td>
    <td><span class="status-\${Status}">\${Status}</span></td>
    <td>\${Freight}</td>
  </tr>
`;

const data = [
  { OrderID: 10248, CustomerName: 'VINET', Status: 'Shipped', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'TOMSP', Status: 'Pending', Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Status', headerText: 'Status', width: 100 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  rowTemplate: rowTemplate,
  allowPaging: true
});

grid.appendTo('#grid');
```

### Row Height

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  rowHeight: 40  // Set custom row height
});

grid.appendTo('#grid');
```

### Alternating Row Colors

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  recordDoubleClick: (args: any) => {
    // Alternate row colors
    if (args.rowIndex % 2 === 0) {
      args.row?.classList.add('e-striped-row');
    }
  }
});

grid.appendTo('#grid');
```

