# Hierarchical Binding

## Table of Contents
- [When to Use](#when-to-use)
- [Master-Detail Grid](#master-detail-grid)
- [Child Grid Configuration](#child-grid-configuration)
- [Detail Templates](#detail-templates)
- [Expand-Collapse](#expand-collapse)
- [Hierarchy Events](#hierarchy-events)

## When to Use

Use this reference when you need to:
- Display master-detail relationships in grids
- Create nested grids with parent-child data
- Show related records when expanding rows
- Configure child grid templates
- Handle expand/collapse events
- Implement drill-down data exploration

## Master-Detail Grid

Display related data in hierarchical structure:

```vue
<template>
  <ejs-grid 
    :dataSource="masterData"
    :childGrid="childGridOptions">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";

const masterData = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const childGridOptions = {
  dataSource: childData,
  columns: [
    { field: 'ItemID', headerText: 'Item ID', width: 80 },
    { field: 'ItemName', headerText: 'Item Name', width: 150 },
    { field: 'Quantity', headerText: 'Qty', width: 80 }
  ],
  queryString: 'OrderID'  // Foreign key relation
};

const childData = [
  { ItemID: 1, OrderID: 10248, ItemName: 'Widget A', Quantity: 5 },
  { ItemID: 2, OrderID: 10248, ItemName: 'Widget B', Quantity: 3 },
  { ItemID: 3, OrderID: 10249, ItemName: 'Gadget X', Quantity: 2 }
];
</script>
```

## Child Grid Configuration

### QueryString - Foreign Key Relation
Define the relationship between parent and child grids:

```javascript
const childGridOptions = {
  dataSource: childData,
  queryString: 'OrderID',  // Child links to parent's OrderID
  columns: [...]
};
```

The `queryString` specifies which parent field to use for filtering child records.

### Multiple Child Grids (Nested Hierarchy)
```javascript
const childGridOptions = {
  dataSource: childData,
  queryString: 'OrderID',
  columns: [...],
  childGrid: {  // Third level hierarchy
    dataSource: grandchildData,
    queryString: 'ItemID',
    columns: [...]
  }
};
```

### Child Grid with Features
```javascript
const childGridOptions = {
  dataSource: childData,
  queryString: 'OrderID',
  allowPaging: true,
  pageSettings: { pageSize: 5 },
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  allowEditing: true,
  editSettings: { mode: 'Inline' },
  columns: [...]
};
```

### Dynamic Child Data Binding
Load child data based on parent row:

```vue
<template>
  <ejs-grid 
    :dataSource="masterData"
    :detailDataBound="handleDetailDataBound"
    :childGrid="childGridOptions">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleDetailDataBound = (args) => {
  // Access parent row data
  const parentData = args.parentRow.data;
  
  // Load child data based on parent
  const filteredChild = allChildData.filter(c => c.OrderID === parentData.OrderID);
  args.childGrid.dataSource = filteredChild;
};
</script>
```

## Detail Templates

### Custom Detail Template
```vue
<template>
  <ejs-grid 
    :dataSource="masterData"
    :detailTemplate="'detailTemplate'">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
    
    <template v-slot:detailTemplate="{ data }">
      <div class="detail-grid-container">
        <h5>Order #{{ data.OrderID }} Details</h5>
        <p><strong>Customer:</strong> {{ data.CustomerID }}</p>
        <p><strong>Freight:</strong> {{ formatCurrency(data.Freight) }}</p>
        <p><strong>Order Date:</strong> {{ formatDate(data.OrderDate) }}</p>
      </div>
    </template>
  </ejs-grid>
</template>

<script setup>
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style>
.detail-grid-container {
  padding: 16px;
  background-color: #f5f5f5;
  border-left: 4px solid #0078d4;
}
</style>
```

## Expand-Collapse

### Detail Row Events
```vue
<template>
  <ejs-grid 
    :dataSource="masterData"
    :detailExpand="handleDetailExpand"
    :detailCollapse="handleDetailCollapse"
    :childGrid="childGridOptions">
    <!-- columns -->
  </ejs-grid>
</template>

<script setup>
const handleDetailExpand = (args) => {
  console.log('Row expanded:', args.data.OrderID);
  // Load data when row expands
};

const handleDetailCollapse = (args) => {
  console.log('Row collapsed:', args.data.OrderID);
  // Cleanup resources
};
</script>
```

### Programmatic Control
```javascript
// Expand specific row by index
gridInstance.expandRow(0);

// Collapse specific row by index
gridInstance.collapseRow(0);

// Expand all rows
gridInstance.expandRows();

// Collapse all rows
gridInstance.collapseRows();
```

## Hierarchy Events

### Detail Row Events
- **detailExpand** - Triggered when detail row expands
- **detailCollapse** - Triggered when detail row collapses
- **detailDataBound** - Triggered when child grid data binds

### Accessing Parent Data in Child
```javascript
const handleDetailDataBound = (args) => {
  // args.parentRow contains parent row element
  // args.data contains parent row data
  const parentOrderID = args.data.OrderID;
};
```

## Practical Example

```vue
<template>
  <ejs-grid 
    :dataSource="orders"
    :childGrid="ordersChildGrid">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="80"></e-column>
      <e-column field="CustomerName" headerText="Customer" width="150"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="120"></e-column>
      <e-column field="TotalAmount" headerText="Total" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const orders = [
  { OrderID: 10248, CustomerName: 'Vinet', OrderDate: '2023-01-15', TotalAmount: 325.00 },
  { OrderID: 10249, CustomerName: 'Tomsp', OrderDate: '2023-01-16', TotalAmount: 112.55 }
];

const ordersChildGrid = {
  dataSource: orderItems,
  columns: [
    { field: 'ItemID', headerText: 'Item', width: 80 },
    { field: 'ProductName', headerText: 'Product', width: 150 },
    { field: 'Quantity', headerText: 'Qty', width: 80 },
    { field: 'Price', headerText: 'Price', format: 'C2', width: 100 }
  ],
  queryString: 'OrderID'
};
</script>
```
