# Hierarchy & Nested Data in JavaScript Grid

## Table of Contents
- [Rules](#rules)
- [Overview](#overview)
- [Child Grid (childGrid Property)](#child-grid-childgrid-property)
- [Master-Detail Structure](#master-detail-structure)
- [Nested Grid](#nested-grid)
- [Expand/Collapse](#expandcollapse)

## When to Use This Reference

- Create expandable master-detail grid relationships
- Display hierarchical data structures
- Configure detail grid templates and layouts
- Handle expand/collapse events and state
- Implement nested data relationships in grids

## Rules

> ⚠️ Use either `childGrid` or `detailTemplate` — not both at the same time.

> ⚠️ `queryString` must match the field name that exists in **both** parent and child data sources.

## Overview

Hierarchy grids display parent-child relationships by expanding detail rows to show related data. Two approaches:

1. **`childGrid`** - Automatic parent-child linking via queryString (recommended)
2. **`detailTemplate`** - Custom JSX-like templates for detailed control

---

## Enabling Hierarchy (DetailRow)

To enable master-detail (hierarchy) behavior, inject the `DetailRow` module:

```ts
import { Grid, DetailRow, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow);

const grid = new Grid({
  dataSource: masterData,
  detailTemplate: detailTemplate,
  columns: [...]
});

grid.appendTo('#grid');
```

---

## Child Grid (childGrid Property)

The preferred way to configure a hierarchy grid is via the `childGrid` property. This uses a plain options object and automatically handles parent-child linking via `queryString`.

### Basic Setup

```ts
import { Grid, DetailRow, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow);

const employeeData = [
  { EmployeeID: 1, FirstName: 'Nancy', City: 'Seattle', Country: 'USA' },
  { EmployeeID: 2, FirstName: 'Andrew', City: 'Tacoma', Country: 'USA' },
  { EmployeeID: 3, FirstName: 'Janet', City: 'Kirkland', Country: 'USA' }
];

const orderData = [
  { OrderID: 10248, EmployeeID: 1, CustomerID: 'VINET', ShipCity: 'Reims' },
  { OrderID: 10249, EmployeeID: 2, CustomerID: 'TOMSP', ShipCity: 'Münster' },
  { OrderID: 10250, EmployeeID: 1, CustomerID: 'HANAR', ShipCity: 'Rio de Janeiro' }
];

const childGridOptions = {
  dataSource: orderData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 },
    { field: 'ShipName', headerText: 'Ship Name', width: 150 }
  ],
  queryString: 'EmployeeID'  // Links parent EmployeeID to child EmployeeID
};

const grid = new Grid({
  dataSource: employeeData,
  childGrid: childGridOptions,
  height: 315,
  columns: [
    { field: 'EmployeeID', headerText: 'Employee ID', width: 120, textAlign: 'Right' },
    { field: 'FirstName', headerText: 'First Name', width: 150 },
    { field: 'City', headerText: 'City', width: 150 },
    { field: 'Country', headerText: 'Country', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### Different Field Names in Parent and Child

When parent and child use different key field names, use the child grid's `load` event:

```ts
const childGridOptions = {
  dataSource: childData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 }
  ],
  queryString: 'ID',  // field name in child
  load: function() {
    // Map parent's EmployeeID to child's ID field
    this.parentDetails.parentKeyFieldValue = 
      this.parentDetails.parentRowData['EmployeeID'];
  }
};
```

### Aggregates in Child Grid

```ts
import { Grid, DetailRow, Aggregate, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow, Aggregate);

const childGridOptions = {
  dataSource: orderData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2', textAlign: 'Right' }
  ],
  queryString: 'EmployeeID',
  aggregates: [
    {
      columns: [
        {
          type: 'Sum',
          field: 'Freight',
          format: 'C2',
          footerTemplate: 'Sum: ${Sum}'
        }
      ]
    },
    {
      columns: [
        {
          type: 'Max',
          field: 'Freight',
          format: 'C2',
          footerTemplate: 'Max: ${Max}'
        }
      ]
    }
  ]
};
```

### Adding Records in Child Grid

To preserve the parent-child relationship when adding records, assign the `queryString` value via `actionBegin`:

```ts
import { Grid, DetailRow, Edit, Toolbar, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow, Edit, Toolbar);

const childGridOptions = {
  dataSource: orderData,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true, width: 120 },
    { field: 'EmployeeID', headerText: 'Employee ID', allowEditing: false, width: 120 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
  ],
  queryString: 'EmployeeID',
  editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  actionBegin: function(args: any) {
    if (args.requestType === 'add') {
      // Assign parent key value to new child record
      args.data['EmployeeID'] = this.parentDetails.parentKeyFieldValue;
    }
  }
};
```

### Accessing Parent Details in Child Grid

Use the child grid's `created` event to access parent row data:

```ts
const childGridOptions = {
  dataSource: orderData,
  columns: [...],
  queryString: 'EmployeeID',
  created: function() {
    const parentRowData = this.parentDetails.parentRowData;
    console.log('Parent EmployeeID:', parentRowData.EmployeeID);
    console.log('Parent FirstName:', parentRowData.FirstName);
  }
};
```

### Dynamic Data Binding via detailDataBound

For more control, bind child data dynamically using `detailDataBound`:

```ts
import { Grid, DetailRow, Inject } from '@syncfusion/ej2-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';

Grid.Inject(DetailRow);

let gridInstance: Grid;

const detailDataBound = (args: any) => {
  const empId = args.childGrid.parentDetails.parentRowData.EmployeeID;
  
  // Filter child data based on parent key
  const matched = new DataManager(orderData).executeLocal(
    new Query().where('EmployeeID', 'equal', empId, true)
  );
  
  args.childGrid.dataSource = matched;
};

const grid = new Grid({
  dataSource: employeeData,
  childGrid: childGridOptions,
  detailDataBound: detailDataBound,
  columns: [...]
});

grid.appendTo('#grid');
gridInstance = grid;
```

### Expand/Collapse All Programmatically

```ts
let gridInstance: Grid;

const grid = new Grid({
  dataSource: employeeData,
  childGrid: childGridOptions,
  columns: [...]
});

grid.appendTo('#grid');
gridInstance = grid;

// Expand all child grids
function expandAllDetails() {
  gridInstance.detailRowModule.expandAll();
}

// Collapse all child grids
function collapseAllDetails() {
  gridInstance.detailRowModule.collapseAll();
}

// Expand specific rows by index
function expandRowDetails(rowIndexes: number[]) {
  gridInstance.detailRowModule.expand(rowIndexes);
}

// Collapse specific rows by index  
function collapseRowDetails(rowIndexes: number[]) {
  gridInstance.detailRowModule.collapse(rowIndexes);
}
```

> ⚠️ `expandAll()` and `collapseAll()` are not recommended for large datasets — they can be slow due to UI updates.

### Expand Child Grid Initially

```ts
let gridInstance: Grid;

const grid = new Grid({
  dataSource: employeeData,
  childGrid: childGridOptions,
  dataBound: () => {
    // Expand 3rd row (index 2) when grid loads
    if (gridInstance.detailRowModule) {
      gridInstance.detailRowModule.expand(2);
    }
  },
  columns: [...]
});

grid.appendTo('#grid');
gridInstance = grid;
```

### Prevent Expand/Collapse via Events

```ts
const detailExpand = (args: any) => {
  // Prevent expand for specific conditions
  if (args.rowData.FirstName === 'Nancy') {
    args.cancel = true; // prevent expand
  }
};

const detailCollapse = (args: any) => {
  // Prevent collapse for specific conditions
  if (args.rowData.FirstName === 'Andrew') {
    args.cancel = true; // prevent collapse
  }
};

const grid = new Grid({
  dataSource: employeeData,
  childGrid: childGridOptions,
  detailExpand: detailExpand,
  detailCollapse: detailCollapse,
  columns: [...]
});

grid.appendTo('#grid');
```

---

## Master-Detail Structure

### Basic Hierarchy with detailTemplate

Using `detailTemplate` for custom child grid rendering:

```ts
import { Grid, DetailRow, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow);

const masterData = [
  { OrderID: 10248, CustomerID: 'VINET', ShipCity: 'Reims' },
  { OrderID: 10249, CustomerID: 'TOMSP', ShipCity: 'Münster' },
  { OrderID: 10250, CustomerID: 'HANAR', ShipCity: 'Rio de Janeiro' }
];

const detailData: any = {
  10248: [
    { ProductID: 1, ProductName: 'Chai', Quantity: 5, Price: 18.00 },
    { ProductID: 2, ProductName: 'Chang', Quantity: 15, Price: 19.00 }
  ],
  10249: [
    { ProductID: 3, ProductName: 'Aniseed Syrup', Quantity: 6, Price: 10.00 }
  ],
  10250: [
    { ProductID: 4, ProductName: 'Chef Anton\'s Cajun Seasoning', Quantity: 2, Price: 22.00 },
    { ProductID: 5, ProductName: 'Chef Anton\'s Gumbo Mix', Quantity: 10, Price: 21.35 }
  ]
};

const detailTemplate = (data: any) => {
  const childData = detailData[data.OrderID] || [];
  
  return `
    <div style="padding: 10px; background: #f0f0f0;">
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${childData.map((item: any) => `
            <tr>
              <td>${item.ProductID}</td>
              <td>${item.ProductName}</td>
              <td>${item.Quantity}</td>
              <td>$${item.Price.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
};

const grid = new Grid({
  dataSource: masterData,
  detailTemplate: detailTemplate,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'ShipCity', headerText: 'Ship City', width: 120 }
  ]
});

grid.appendTo('#grid');
```

---

## Nested Grid

### Multi-Level Hierarchy (Three Levels)

```ts
import { Grid, DetailRow, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow);

const masterData = [
  { OrderID: 10248, CustomerID: 'VINET' },
  { OrderID: 10249, CustomerID: 'TOMSP' }
];

const level2Data = [
  { OrderID: 10248, DetailID: 1, DetailName: 'Item A', OrderID_FK: 10248 },
  { OrderID: 10248, DetailID: 2, DetailName: 'Item B', OrderID_FK: 10248 },
  { OrderID: 10249, DetailID: 3, DetailName: 'Item C', OrderID_FK: 10249 }
];

const level3Data = [
  { DetailID: 1, ItemID: 101, ItemName: 'Sub-Item A1', Amount: 100 },
  { DetailID: 1, ItemID: 102, ItemName: 'Sub-Item A2', Amount: 200 },
  { DetailID: 2, ItemID: 103, ItemName: 'Sub-Item B1', Amount: 150 },
  { DetailID: 3, ItemID: 104, ItemName: 'Sub-Item C1', Amount: 250 }
];

// Level 3 child grid configuration
const level3ChildGrid = {
  dataSource: level3Data,
  columns: [
    { field: 'ItemID', headerText: 'Item ID', width: 100 },
    { field: 'ItemName', headerText: 'Item Name', width: 150 },
    { field: 'Amount', headerText: 'Amount', width: 100, format: 'C2' }
  ],
  queryString: 'DetailID'
};

// Level 2 child grid configuration with Level 3 nested grid
const level2ChildGrid = {
  dataSource: level2Data,
  childGrid: level3ChildGrid,
  columns: [
    { field: 'DetailID', headerText: 'Detail ID', width: 100 },
    { field: 'DetailName', headerText: 'Detail Name', width: 150 }
  ],
  queryString: 'OrderID'
};

// Master grid with Level 2 nested grid
const grid = new Grid({
  dataSource: masterData,
  childGrid: level2ChildGrid,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 }
  ]
});

grid.appendTo('#grid');
```

---

## Expand/Collapse

### Programmatic Control

```ts
let gridInstance: Grid;

const grid = new Grid({
  dataSource: masterData,
  childGrid: childGridOptions,
  columns: [...]
});

grid.appendTo('#grid');
gridInstance = grid;

// Button click handlers
document.getElementById('expandAll').onclick = () => {
  gridInstance.detailRowModule.expandAll();
};

document.getElementById('collapseAll').onclick = () => {
  gridInstance.detailRowModule.collapseAll();
};

document.getElementById('expandRow1').onclick = () => {
  gridInstance.detailRowModule.expand([0]); // expand first row
};

document.getElementById('expandRow2').onclick = () => {
  gridInstance.detailRowModule.expand([1]); // expand second row
};
```

### Detail Expand/Collapse Events

```ts
const detailDataBound = (args: any) => {
  console.log('Detail row data bound:', args.data);
};

const detailExpand = (args: any) => {
  console.log('Expanding row:', args.rowIndex);
  console.log('Row data:', args.rowData);
};

const detailCollapse = (args: any) => {
  console.log('Collapsing row:', args.rowIndex);
};

const grid = new Grid({
  dataSource: masterData,
  childGrid: childGridOptions,
  detailDataBound: detailDataBound,
  detailExpand: detailExpand,
  detailCollapse: detailCollapse,
  columns: [...]
});

grid.appendTo('#grid');
```

### Load Detail Data on Demand

For performance, load child data only when detail row expands:

```ts
import { Grid, DetailRow, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(DetailRow);

const childGridOptions = {
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'ShipCity', headerText: 'Ship City', width: 150 }
  ],
  queryString: 'EmployeeID'
};

const detailDataBound = async (args: any) => {
  const empId = args.childGrid.parentDetails.parentRowData.EmployeeID;
  
  // Simulate async data fetch
  const data = await fetchOrdersByEmployee(empId);
  args.childGrid.dataSource = data;
};

const grid = new Grid({
  dataSource: employeeData,
  childGrid: childGridOptions,
  detailDataBound: detailDataBound,
  columns: [
    { field: 'EmployeeID', headerText: 'Employee ID', width: 100 },
    { field: 'FirstName', headerText: 'First Name', width: 150 }
  ]
});

grid.appendTo('#grid');

// Mock async function
async function fetchOrdersByEmployee(empId: number) {
  // In real app, this would call an API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { OrderID: 10248, EmployeeID: empId, CustomerID: 'VINET', ShipCity: 'Reims' },
        { OrderID: 10249, EmployeeID: empId, CustomerID: 'TOMSP', ShipCity: 'Münster' }
      ]);
    }, 500);
  });
}
```

---

## Key Concepts

### Parent-Child Relationship
- **Parent Grid**: Master data (e.g., Employees)
- **Child Grid**: Related data (e.g., Orders for each Employee)
- **queryString**: Field that links parent and child (e.g., 'EmployeeID')

### When to Use Which Approach
- **`childGrid`**: When you have structured child data and want automatic linking
- **`detailTemplate`**: When you need custom HTML rendering or complex templating

### Performance Tips
- ✅ Use `queryString` for automatic filtering (more efficient)
- ✅ Load child data on demand with `detailDataBound`
- ✅ Avoid `expandAll()` with large datasets
- ✅ Use `rowDataBound` to conditionally hide expand icons

### Hierarchy Limitations
- Maximum 3-4 levels recommended for performance
- Large datasets in all levels can impact performance
- Deep nesting increases DOM size significantly
