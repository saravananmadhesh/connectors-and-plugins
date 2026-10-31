# Rows

## Table of Contents
- [When to Use](#when-to-use)
- [Row Data Types](#row-data-types)
- [Row Styling](#row-styling)
- [Row Height](#row-height)
- [Row Templates](#row-templates)
- [Detail Templates](#detail-templates)
- [Row Drag-Drop](#row-drag-drop)
- [Row Spanning](#row-spanning)
- [Row Pinning](#row-pinning)
- [Row Selection](#row-selection)

## When to Use

Use this reference when:
- **Customizing row appearance** with styles, heights, and hover effects
- **Creating row templates** to display custom content
- **Expanding rows** with detail templates
- **Enabling drag-drop** for rows within or between grids
- **Merging cells** across rows
- **Pinning rows** to keep them visible
- **Managing row selection** and grouping

## Row Data Types

### Understanding Row Structure
```vue
<script setup>
const data = ref([
  {
    OrderID: 10248,
    CustomerID: 'VINET',
    Freight: 32.38,
    OrderDate: new Date(2023, 2, 15)
  },
  {
    OrderID: 10249,
    CustomerID: 'TOMSP',
    Freight: 11.61,
    OrderDate: new Date(2023, 2, 16)
  }
]);
</script>

<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

## Row Styling

### Alternating Row Colors
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="handleQueryCellInfo">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleQueryCellInfo = (args) => {
  // Apply zebra striping
  if (args.rowIndex % 2 !== 0) {
    args.cellElement.classList.add('zebra-row');
  }
};
</script>

<style scoped>
:deep(.zebra-row) {
  background-color: #f5f5f5;
}
</style>
```

### Highlight Specific Rows
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="handleQueryCellInfo">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleQueryCellInfo = (args) => {
  // Highlight high freight values
  if (args.data.Freight > 100) {
    args.rowElement.classList.add('high-freight');
  }
  
  // Highlight pending status
  if (args.data.Status === 'Pending') {
    args.rowElement.classList.add('pending-row');
  }
};
</script>

<style scoped>
:deep(.high-freight) {
  background-color: #fff3cd;
}

:deep(.pending-row) {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
```

### Hover Effect
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :rowDataBound="onRowDataBound">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const onRowDataBound = (args) => {
  args.row.addEventListener('mouseenter', () => {
    args.row.classList.add('hover-highlight');
  });
  args.row.addEventListener('mouseleave', () => {
    args.row.classList.remove('hover-highlight');
  });
};
</script>

<style scoped>
:deep(.hover-highlight) {
  background-color: #e7f3ff;
  box-shadow: inset 2px 0 0 #2196F3;
}
</style>
```

## Row Height

### Fixed Row Height
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :rowHeight="40">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Adaptive Row Height
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :rowHeight="'auto'">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Description" headerText="Description" width="200"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Variable Row Heights
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :rowDataBound="onRowDataBound">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Description" headerText="Description" width="250" :allowTextWrap="true"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const onRowDataBound = (args) => {
  // Taller rows for important items
  if (args.data.Priority === 'High') {
    args.row.style.height = '60px';
  }
};
</script>
```

## Row Templates

### Custom Row Template
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    rowTemplate="rowTemplate">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
    
    <template v-slot:rowTemplate="{ data }">
      <tr>
        <td style="padding: 10px;">
          <strong>Order #{{ data.OrderID }}</strong>
        </td>
        <td style="padding: 10px;">
          <span>{{ data.CustomerID }} - {{ data.CustomerName }}</span>
        </td>
        <td style="padding: 10px;">
          <span class="amount">{{ formatCurrency(data.Freight) }}</span>
        </td>
      </tr>
    </template>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(value);
};
</script>

<style scoped>
:deep(.amount) {
  color: #28a745;
  font-weight: bold;
}
</style>
```

### Row Template with Components
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    rowTemplate="rowTemplate">
    <e-columns>
      <e-column field="OrderID" width="300"></e-column>
    </e-columns>
    
    <template v-slot:rowTemplate="{ data }">
      <tr>
        <td style="padding: 10px; width: 100%;">
          <OrderCard :order="data" @edit="editOrder" @delete="deleteOrder" />
        </td>
      </tr>
    </template>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import OrderCard from './OrderCard.vue';

const editOrder = (order) => {
  console.log('Edit:', order.OrderID);
};

const deleteOrder = (order) => {
  console.log('Delete:', order.OrderID);
};
</script>
```

### Synchronized Row Template and Columns
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    rowTemplate="rowTemplate">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
      <e-column field="Freight" width="100"></e-column>
    </e-columns>
    
    <template v-slot:rowTemplate="{ data }">
      <tr style="background: #f9f9f9;">
        <td style="padding: 10px; width: 100px; text-align: center;">
          <strong>{{ data.OrderID }}</strong>
        </td>
        <td style="padding: 10px; width: 120px;">
          {{ data.CustomerID }}
        </td>
        <td style="padding: 10px; width: 100px; text-align: right;">
          ${{ data.Freight.toFixed(2) }}
        </td>
      </tr>
    </template>
  </ejs-grid>
</template>
```

## Detail Templates

### Basic Detail Template
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :detailTemplate="detailTemplate"
    :childGrid="childGridSettings">
    <e-columns>
      <e-column type="expand" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
    
    <template v-slot:detailTemplate="{ data }">
      <div style="padding: 20px;">
        <h4>Order Details</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div><strong>Order Date:</strong> {{ formatDate(data.OrderDate) }}</div>
          <div><strong>Ship Name:</strong> {{ data.ShipName }}</div>
          <div><strong>Ship City:</strong> {{ data.ShipCity }}</div>
          <div><strong>Ship Country:</strong> {{ data.ShipCountry }}</div>
        </div>
      </div>
    </template>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>
```

### Child Grid in Detail Template
```vue
<template>
  <ejs-grid 
    :dataSource="ordersData"
    :detailTemplate="detailTemplate">
    <e-columns>
      <e-column type="expand" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
    
    <template v-slot:detailTemplate="{ data }">
      <div style="padding: 20px;">
        <h4>Order Items for Order #{{ data.OrderID }}</h4>
        <ejs-grid 
          :dataSource="getOrderItems(data.OrderID)"
          :allowSorting="true"
          :allowPaging="false">
          <e-columns>
            <e-column field="ProductID" headerText="Product ID" width="100"></e-column>
            <e-column field="ProductName" headerText="Product Name" width="150"></e-column>
            <e-column field="Quantity" headerText="Qty" type="number" width="80"></e-column>
            <e-column field="UnitPrice" headerText="Unit Price" type="number" format="C2" width="100"></e-column>
          </e-columns>
        </ejs-grid>
      </div>
    </template>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-grids';

const getOrderItems = (orderId) => {
  // Fetch order details from API or data
  return [
    { ProductID: 1, ProductName: 'Widget A', Quantity: 5, UnitPrice: 19.99 },
    { ProductID: 2, ProductName: 'Widget B', Quantity: 3, UnitPrice: 29.99 }
  ];
};
</script>
```

## Row Drag-Drop

### Enable Row Drag-Drop
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowRowDragAndDrop="true"
    :rowDrop="onRowDrop">
    <e-columns>
      <e-column type="drag" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, RowDD } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

const onRowDrop = (args) => {
  console.log('Rows reordered:', args);
};

provide('grid', [RowDD]);
</script>
```

### Drag Rows Between Grids
```vue
<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <h3>Available Orders</h3>
      <ejs-grid 
        ref="sourceGrid"
        :dataSource="sourceData"
        :allowRowDragAndDrop="true"
        :rowDrop="onRowDrop">
        <e-columns>
          <e-column type="drag" width="50"></e-column>
          <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
          <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
    
    <div>
      <h3>Selected Orders</h3>
      <ejs-grid 
        ref="targetGrid"
        :dataSource="targetData"
        :allowRowDragAndDrop="true">
        <e-columns>
          <e-column type="drag" width="50"></e-column>
          <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
          <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sourceData = ref([
  { OrderID: 10248, CustomerID: 'VINET' },
  { OrderID: 10249, CustomerID: 'TOMSP' }
]);

const targetData = ref([]);

const onRowDrop = (args) => {
  // Move row to target grid
  if (args.dropIndex !== undefined) {
    targetData.value.push(args.data[0]);
    sourceData.value = sourceData.value.filter(o => o.OrderID !== args.data[0].OrderID);
  }
};
</script>
```

## Row Spanning

### Column Spanning Across Rows
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :queryCellInfo="handleQueryCellInfo">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Status" headerText="Status" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const handleQueryCellInfo = (args) => {
  // Merge status column for rows with same value
  if (args.columnIndex === 2) {
    if (args.rowIndex === 0 || args.rowIndex === 1) {
      if (args.data.Status === 'Pending') {
        if (args.rowIndex === 0) {
          args.rowSpan = 2;
        } else {
          return;  // Skip rendering (part of span)
        }
      }
    }
  }
};
</script>
```

## Row Pinning

### Pin Rows to Top
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :rowRenderingMode="'Virtual'"
    :recordDoubleClick="onRecordDoubleClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Priority" headerText="Priority" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const onRecordDoubleClick = (args) => {
  // Pin row on double-click
  if (args.data.Priority === 'High') {
    args.row.style.position = 'sticky';
    args.row.style.top = '0';
    args.row.style.backgroundColor = '#fff3cd';
    args.row.style.zIndex = '10';
  }
};
</script>
```

### Dynamic Row Pinning with isRowPinned
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :isRowPinned="isRowPinned"
    :childGrid="childGridSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Priority" headerText="Priority" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const isRowPinned = (args) => {
  // Pin high-priority rows
  return args.data.Priority === 'High' || args.data.Status === 'Critical';
};
</script>
```

## Row Selection

### Single Row Selection
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowSelection="true"
    selectionSettings="{ type: 'Single' }"
    :recordClick="onRecordClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const onRecordClick = (args) => {
  console.log('Selected row:', args.rowData);
};
</script>
```

### Multiple Row Selection
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowSelection="true"
    selectionSettings="{ type: 'Multiple' }"
    :rowSelecting="onRowSelecting">
    <e-columns>
      <e-column type="checkbox" width="50"></e-column>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const onRowSelecting = (args) => {
  console.log('Selecting rows:', args.data);
};
</script>
```
