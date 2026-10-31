# Columns in JavaScript Grid

## Table of Contents
- [Column Definition](#column-definition)
- [Column Types](#column-types)
- [Column Width](#column-width)
- [Column Templates](#column-templates)
- [Column Customization](#column-customization)
- [Advanced Column Features](#advanced-column-features)

## When to Use This Reference

- Define and configure grid column structure
- Set column data types and formatting options
- Create custom column templates and headers
- Control column width, visibility, and resizing behavior
- Configure column-specific features like sorting and filtering

## Column Definition

Columns are defined using column objects within the `columns` property. Each column maps to a field in your data source.

### Basic Column Setup

```ts
import { Grid } from '@syncfusion/ej2-grids';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', OrderDate: new Date(1996, 6, 4), Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', OrderDate: new Date(1996, 6, 5), Freight: 11.61 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', format: 'yMd' },
    { field: 'Freight', headerText: 'Freight', width: 120, type: 'number', format: 'C2' }
  ]
});

grid.appendTo('#grid');
```

### Key Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `field` | string | Maps to data source field (required) | `field: 'OrderID'` |
| `headerText` | string | Column header label | `headerText: 'Order ID'` |
| `width` | string \| number | Column width | `width: 100` or `width: '20%'` |
| `type` | string | Data type for formatting | `type: 'date'` |
| `format` | string | Number/date format | `format: 'C2'` |
| `textAlign` | string | Text alignment | `textAlign: 'Right'` |
| `allowSorting` | boolean | Enable sorting | `allowSorting: true` |
| `allowFiltering` | boolean | Enable filtering | `allowFiltering: true` |
| `isPrimaryKey` | boolean | Mark as primary key | `isPrimaryKey: true` |
| `visible` | boolean | Show/hide column | `visible: true` |
| `allowGrouping` | boolean | Enable grouping | `allowGrouping: true` |

## Column Types

### String Type

Text values (default):

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'CustomerName', headerText: 'Customer Name', type: 'string', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Number Type

Numeric values:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 100 },
    { field: 'Quantity', headerText: 'Quantity', type: 'number', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Date Type

Date values:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', format: 'yMd', width: 130 }
  ]
});

grid.appendTo('#grid');
```

### DateTime Type

Date and time values:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderDate', headerText: 'Order Date', type: 'datetime', format: 'yMd H:mm', width: 160 }
  ]
});

grid.appendTo('#grid');
```

### Boolean Type

True/false values:

```ts
const data = [
  { OrderID: 10248, IsShipped: true },
  { OrderID: 10249, IsShipped: false }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'IsShipped', headerText: 'Shipped', type: 'boolean', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Checkbox Type

Selection checkboxes:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { type: 'checkbox', width: 50 },
    { field: 'OrderID', headerText: 'Order ID', width: 100 }
  ]
});

grid.appendTo('#grid');
```

## Column Width

### Fixed Width

Fixed width in pixels:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Percentage Width

Responsive width as percentage:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: '20%' },
    { field: 'CustomerName', headerText: 'Customer Name', width: '30%' },
    { field: 'Freight', headerText: 'Freight', width: '25%' },
    { field: 'ShipCity', headerText: 'Ship City', width: '25%' }
  ]
});

grid.appendTo('#grid');
```

### Auto Width

Automatically sized based on content:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 'auto' },
    { field: 'CustomerName', headerText: 'Customer Name', width: 'auto' }
  ]
});

grid.appendTo('#grid');
```

### Allow Column Resizing

Allow users to resize columns:

```ts
import { Grid, Resize } from '@syncfusion/ej2-grids';

Grid.Inject(Resize);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, allowResizing: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, allowResizing: true }
  ],
  allowResizing: true
});

grid.appendTo('#grid');
```

### Min and Max Width

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, minWidth: 50, maxWidth: 200 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, minWidth: 100, maxWidth: 300 }
  ]
});

grid.appendTo('#grid');
```

### Auto-Fit Columns

Automatically adjust width based on content:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID' },
    { field: 'CustomerName', headerText: 'Customer Name' },
    { field: 'Amount', headerText: 'Amount', type: 'number' }
  ]
});

grid.appendTo('#grid');

// Auto-fit after render
grid.autoFitColumns();
```

## Column Templates

### Cell Template

Customize cell content with HTML:

```ts
import { Grid } from '@syncfusion/ej2-grids';

const data = [
  { OrderID: 10248, CustomerName: 'VINET', Status: 'Shipped' },
  { OrderID: 10249, CustomerName: 'TOMSP', Status: 'Pending' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    {
      field: 'Status',
      headerText: 'Status',
      template: '<span class="badge ${Status === "Shipped" ? "success" : "warning"}">${Status}</span>',
      width: 130
    }
  ]
});

grid.appendTo('#grid');
```

### Header Template

Customize header appearance:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Amount',
      headerTemplate: '<div><span>Amount</span><br/><span style="font-size:12px">(USD)</span></div>',
      width: 120,
      type: 'number'
    },
    {
      field: 'CustomerName',
      headerTemplate: '<div style="text-align:center"><i class="icon-user"></i><br/>Customer</div>',
      width: 150
    }
  ]
});

grid.appendTo('#grid');
```

### Edit Template

Custom editor for inline editing:

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    {
      field: 'Status',
      headerText: 'Status',
      editTemplate: '<select id="status"><option>Pending</option><option>Shipped</option></select>',
      template: '${Status}',
      width: 130
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true }
});

grid.appendTo('#grid');
```

## Column Customization

### Column Reordering

Allow users to reorder columns via drag-and-drop:

```ts
import { Grid, Reorder } from '@syncfusion/ej2-grids';

Grid.Inject(Reorder);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, allowReordering: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, allowReordering: true },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date', allowReordering: true },
    { field: 'Freight', headerText: 'Freight', width: 120, allowReordering: true }
  ],
  allowReordering: true
});

grid.appendTo('#grid');
```

### Programmatic Column Reordering

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ]
});

grid.appendTo('#grid');

// Reorder columns
grid.reorderColumns('OrderID', 'Freight');
```

### Column Chooser

Allow users to show/hide columns dynamically:

```ts
import { Grid, ColumnChooser, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(ColumnChooser, Toolbar);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 120 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
  ],
  toolbar: ['ColumnChooser'],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Programmatic Column Toggle

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

// Hide column
grid.hideColumns(['Freight']);

// Show column
grid.showColumns(['Freight']);

// Toggle visibility
grid.columns[1].visible = false;
grid.refresh();
```

### Column Styling

Apply custom CSS classes and styling:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    {
      field: 'Freight',
      headerText: 'Freight',
      cssClass: 'freight-column',
      customClass: 'high-value-cell',
      width: 120
    }
  ]
});

grid.appendTo('#grid');

// CSS
const style = document.createElement('style');
style.textContent = `
  .freight-column {
    background-color: #f0f0f0;
  }
  
  .high-value-cell {
    color: green;
    font-weight: bold;
  }
`;
document.head.appendChild(style);
```

### Header Text Alignment

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', headerTextAlign: 'Center', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', headerTextAlign: 'Left', width: 150 },
    { field: 'Amount', headerText: 'Amount', headerTextAlign: 'Right', width: 120 }
  ]
});

grid.appendTo('#grid');
```

### Format Columns

Apply number and date formatting:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    // Currency format
    { field: 'Freight', headerText: 'Freight', format: 'C2', type: 'number', width: 120 },
    // Date format
    { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', type: 'date', width: 130 },
    // Percent format
    { field: 'Percentage', headerText: 'Percentage', format: 'P2', type: 'number', width: 120 },
    // Custom number format
    { field: 'Quantity', headerText: 'Quantity', format: 'N3', type: 'number', width: 120 }
  ]
});

grid.appendTo('#grid');
```

## Advanced Column Features

### Foreign Key Column

Display related data from another datasource:

```ts
import { Grid, ForeignKey } from '@syncfusion/ej2-grids';

Grid.Inject(ForeignKey);

const orderData = [
  { OrderID: 10248, CustomerID: 1, Amount: 1000 },
  { OrderID: 10249, CustomerID: 2, Amount: 2000 }
];

const customerData = [
  { CustomerID: 1, CustomerName: 'VINET' },
  { CustomerID: 2, CustomerName: 'TOMSP' }
];

const grid = new Grid({
  dataSource: orderData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    {
      field: 'CustomerID',
      headerText: 'Customer Name',
      foreignKeyData: customerData,
      foreignKeyField: 'CustomerID',
      textField: 'CustomerName',
      width: 150
    },
    { field: 'Amount', headerText: 'Amount', width: 120, type: 'number' }
  ]
});

grid.appendTo('#grid');
```

### Foreign Key with Editing

```ts
import { Grid, ForeignKey, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(ForeignKey, Edit, Toolbar);

const grid = new Grid({
  dataSource: orderData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    {
      field: 'CustomerID',
      headerText: 'Customer',
      foreignKeyData: customerData,
      foreignKeyField: 'CustomerID',
      textField: 'CustomerName',
      type: 'dropdown',
      width: 150
    }
  ],
  toolbar: ['Add', 'Edit', 'Delete', 'Save', 'Cancel'],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true }
});

grid.appendTo('#grid');
```

### Frozen Columns

Keep columns visible while scrolling horizontally:

```ts
import { Grid, Freeze } from '@syncfusion/ej2-grids';

Grid.Inject(Freeze);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', City: 'Reims', Amount: 32.38, Details: 'Order details...' },
  { OrderID: 10249, CustomerName: 'TOMSP', City: 'München', Amount: 11.61, Details: 'More details...' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isFrozen: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, isFrozen: true },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Amount', headerText: 'Amount', width: 200 },
    { field: 'Details', headerText: 'Details', width: 300 }
  ],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Freeze Right Columns

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Amount', headerText: 'Amount', width: 200, isFrozen: true },
    { field: 'Status', headerText: 'Status', width: 150, isFrozen: true }
  ]
});

grid.appendTo('#grid');
```

### Column Spanning

Merge header columns using multi-level headers:

```ts
const data = [
  { OrderID: 10248, CustomerName: 'VINET', Q1Sales: 1000, Q2Sales: 1200, Q3Sales: 900, Q4Sales: 1500 }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    {
      headerText: 'Sales by Quarter',
      columns: [
        { field: 'Q1Sales', headerText: 'Q1', width: 100, type: 'number' },
        { field: 'Q2Sales', headerText: 'Q2', width: 100, type: 'number' },
        { field: 'Q3Sales', headerText: 'Q3', width: 100, type: 'number' },
        { field: 'Q4Sales', headerText: 'Q4', width: 100, type: 'number' }
      ]
    }
  ]
});

grid.appendTo('#grid');
```

### Nested Property Binding

For nested objects in data:

```ts
const data = [
  { OrderID: 10248, Customer: { Name: 'VINET', City: 'Reims' } },
  { OrderID: 10249, Customer: { Name: 'TOMSP', City: 'München' } }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'Customer.Name', headerText: 'Customer Name', width: 150 },
    { field: 'Customer.City', headerText: 'City', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Column Menu

Show context menu for column operations:

```ts
import { Grid, ColumnMenu, Sort, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(ColumnMenu, Sort, Filter);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  columnMenuItems: ['SortAscending', 'SortDescending', 'Filter', 'Copy', 'ExcelExport', 'CsvExport'],
  allowSorting: true,
  allowFiltering: true
});

grid.appendTo('#grid');
```

### Custom Menu Items

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 }
  ],
  columnMenuItems: [
    'SortAscending',
    'SortDescending',
    'Filter',
    { text: 'Custom Action', id: 'customaction' }
  ],
  columnMenuClick: (args: any) => {
    if (args.item.id === 'customaction') {
      console.log('Custom menu item clicked for column:', args.column.field);
    }
  }
});

grid.appendTo('#grid');
```

### Column Validation

Validate column data during editing:

```ts
import { Grid, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'OrderID',
      headerText: 'Order ID',
      isPrimaryKey: true,
      validationRules: { required: true },
      width: 100
    },
    {
      field: 'Freight',
      headerText: 'Freight',
      validationRules: { min: 0, max: 10000, required: true },
      width: 120
    },
    {
      field: 'CustomerID',
      headerText: 'Customer',
      validationRules: { required: true, minLength: 3, maxLength: 5 },
      width: 150
    }
  ],
  editSettings: { mode: 'Dialog', allowEditing: true }
});

grid.appendTo('#grid');
```
