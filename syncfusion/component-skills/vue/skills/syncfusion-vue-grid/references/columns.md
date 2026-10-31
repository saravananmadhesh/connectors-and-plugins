# Columns

## Table of Contents
- [When to Use](#when-to-use)
- [Column Data Types](#column-data-types)
- [Column Width](#column-width)
- [Column Formatting](#column-formatting)
- [Field Mapping](#field-mapping)
- [Column Rendering](#column-rendering)
- [Column Templates](#column-templates)
- [Column Headers](#column-headers)
- [Foreign Key Columns](#foreign-key-columns)
- [Column Chooser](#column-chooser)
- [Column Menu](#column-menu)
- [Column Reordering](#column-reordering)
- [Column Resizing](#column-resizing)
- [Row and Column Spanning](#row--column-spanning)

## When to Use

Use this reference when:
- **Defining columns** with specific data types, formatting, and width
- **Binding columns** to data fields, including nested properties
- **Creating custom column experiences** with templates and rendering
- **Managing column visibility** with column chooser or menu
- **Organizing columns** through reordering and resizing
- **Spanning cells** across multiple columns or rows
- **Displaying related data** with foreign key columns

## Column Data Types

Specify column data types to determine filter UI, editing behavior, and formatting:

```vue
<!-- String (default): text content -->
<e-column field="CustomerID" headerText="Customer ID" type="string" width="120"></e-column>

<!-- Number: format with C2 (currency), N0 (integer), N2 (2 decimals), P (percentage), e (scientific) -->
<e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>

<!-- Date: format codes - yMd (3/15/2023), dd/MM/yyyy (15/03/2023), MMM d, y (Mar 15, 2023) -->
<e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>

<!-- Boolean: renders checkbox in display and edit modes -->
<e-column field="IsActive" headerText="Active" type="boolean" width="80"></e-column>

<!-- Checkbox: for row selection (use with :allowSelection="true") -->
<e-column type="checkbox" width="50"></e-column>
```

## Column Width

```vue
<!-- Pixel (100), Percentage (25%), or Auto -->
<e-column field="OrderID" headerText="Order ID" width="100"></e-column>
<e-column field="CustomerID" headerText="Customer ID" width="25%"></e-column>
<e-column field="OrderID" headerText="Order ID" width="auto"></e-column>

<!-- With constraints -->
<e-column field="Description" headerText="Description" width="200" :minWidth="100" :maxWidth="400"></e-column>
```

## Column Formatting

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <!-- Number formats: C2 (currency), P (percentage), N0 (integer), N2 (decimals) -->
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="Discount" headerText="Discount" type="number" format="P" width="100"></e-column>
      
      <!-- Date formats: yMd, dd/MM/yyyy, MMM d, y -->
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      <e-column field="DeliveryDate" headerText="Delivery" type="date" format="MMM d, y" width="140"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

## Field Mapping

### Basic Field Binding
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerName" headerText="Customer" width="150"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const data = [
  { OrderID: 10248, CustomerName: 'Vinet', Freight: 32.38 },
  { OrderID: 10249, CustomerName: 'Toms', Freight: 11.61 }
];
</script>
```

### Nested Data Mapping
Use dot notation (`Customer.Name`) to access nested properties:
```vue
<e-column field="Customer.Name" headerText="Customer Name" width="150"></e-column>
<e-column field="Customer.City" headerText="City" width="130"></e-column>
```
Data structure: `{ OrderID: 10248, Customer: { Name: 'Vinet Inc.', City: 'Paris' } }`

## Column Rendering

### Manual Column Declaration
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Auto-Generated Columns
Omit `<e-columns>` to auto-generate from data: `<ejs-grid :dataSource="data"></ejs-grid>`

### V-For Rendering
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column 
        v-for="col in columns" 
        :key="col.field"
        :field="col.field"
        :headerText="col.headerText"
        :width="col.width"
        :type="col.type"
        :format="col.format">
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const data = ref([
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
]);

const columns = ref([
  { field: 'OrderID', headerText: 'Order ID', width: 100 },
  { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
  { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 100 }
]);
</script>
```

Useful for dynamic column configuration.

### Value Accessors
Compute dynamic values from complex data:
```vue
<e-column headerText="Total" width="100" valueAccessor="getTotalPrice"></e-column>

<script setup>
const getTotalPrice = (field, data) => {
  return data.Items.reduce((sum, item) => sum + item.Price, 0);
};
</script>
```

## Column Templates

### Component Template
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="Status" headerText="Status" width="150">
        <template v-slot:default="{ data }">
          <StatusBadge :status="data.Status" />
        </template>
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue';
</script>
```

### Header & Edit Templates
```vue
<!-- Custom header -->
<e-column field="OrderID" width="100">
  <template v-slot:headerTemplate>
    <div style="display: flex; gap: 8px;"><span>📋</span><span>Order ID</span></div>
  </template>
</e-column>

<!-- Custom edit template with dropdown -->
<e-column field="Status" headerText="Status" width="100">
  <template v-slot:editTemplate="{ data }">
    <ejs-dropdownlist v-model="data.Status" :dataSource="statusOptions" fields="text,value"></ejs-dropdownlist>
  </template>
</e-column>
```

## Column Headers

### Basic & Header Alignment
```vue
<!-- Alignment: Left, Right, Center, Justify -->
<e-column field="OrderID" headerText="Order ID" width="100" headerTextAlign="Center"></e-column>
<e-column field="CustomerID" headerText="Customer ID" width="120" headerTextAlign="Left"></e-column>
```

### Stacked Headers
```vue
<template>
  <ejs-grid :dataSource="data">
    <e-column-group headerText="Order Details">
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" width="130" type="date"></e-column>
    </e-column-group>
    
    <e-column-group headerText="Shipping">
      <e-column field="ShipCity" headerText="Ship City" width="130"></e-column>
      <e-column field="ShipCountry" headerText="Country" width="100"></e-column>
    </e-column-group>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnGroupDirective as EColumnGroup, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-grids';
</script>
```

### Dynamic Header Updates
```vue
<template>
  <ejs-grid ref="gridRef" :dataSource="data" :actionComplete="onActionComplete">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" :headerText="customerHeaderText" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const gridRef = ref(null);
const customerHeaderText = ref('Customer ID');
const onActionComplete = () => {
  customerHeaderText.value = 'Customer';
};
</script>
```

## Foreign Key Columns

Display lookup values from a separate datasource:

### Basic Foreign Key
```vue
<template>
  <ejs-grid :dataSource="ordersData">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column 
        field="CustomerID" 
        headerText="Customer"
        :dataSource="customersData"
        displayField="CustomerName"
        valueField="CustomerID"
        width="150">
      </e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const ordersData = ref([
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
]);

const customersData = ref([
  { CustomerID: 'VINET', CustomerName: 'Vinet Inc.' },
  { CustomerID: 'TOMSP', CustomerName: 'Toms Spices' },
  { CustomerID: 'HANAR', CustomerName: 'Hanari Carnes' }
]);
</script>
```

### Remote Data
For remote data, use DataManager with UrlAdaptor:
```vue
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
const employeeDataManager = new DataManager({ url: 'api/employees', adaptor: new UrlAdaptor() });
<!-- Then use :dataSource="employeeDataManager" in column -->
```

### Foreign Key Edit Template
```vue
<template>
  <ejs-grid :dataSource="data" :editSettings="editSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" :allowEditing="false"></e-column>
      <e-column 
        field="CustomerID" 
        headerText="Customer"
        :dataSource="customersData"
        displayField="CustomerName"
        valueField="CustomerID"
        width="150">
        <template v-slot:editTemplate="{ data }">
          <ejs-dropdownlist 
            v-model="data.CustomerID"
            :dataSource="customersData"
            fields="CustomerID,CustomerName"
            displayFields="CustomerName">
          </ejs-dropdownlist>
        </template>
      </e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownListComponent as EjsDropdownlist } from '@syncfusion/ej2-vue-dropdowns';

const editSettings = ref({ allowEditing: true, mode: 'Dialog' });
const customersData = ref([
  { CustomerID: 'VINET', CustomerName: 'Vinet Inc.' },
  { CustomerID: 'TOMSP', CustomerName: 'Toms Spices' }
]);
</script>
```

## Column Chooser

Show/hide columns dynamically using column chooser:

### Enable Column Chooser
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :toolbar="toolbar">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="ShipAddress" headerText="Ship Address" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

const toolbar = ref(['ColumnChooser']);
provide('grid', [Toolbar]);
</script>
```

### Context Menu Integration
```vue
:contextMenuItems="['ColumnChooser']"    <!-- Add ColumnChooser to context menu -->
```

### Programmatic Column Control
```vue
<template>
  <div>
    <button @click="showCustomerColumn">Show Customer</button>
    <button @click="hideFreightColumn">Hide Freight</button>
    
    <ejs-grid ref="gridRef" :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const gridRef = ref(null);

const showCustomerColumn = () => {
  gridRef.value?.showColumns('CustomerID');
};

const hideFreightColumn = () => {
  gridRef.value?.hideColumns('Freight');
};
</script>
```

## Column Menu

Customize column context menu with default and custom items:

### Default Column Menu
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :showColumnMenu="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" :showColumnMenu="true"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120" :showColumnMenu="true"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100" :showColumnMenu="true"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, ColumnMenu } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

provide('grid', [ColumnMenu]);
</script>
```

Default menu items: Sort, Group, Filter, Search, Column Chooser, Edit, Delete, Export, PDF Export

### Custom Column Menu Items
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :showColumnMenu="true"
    :columnMenuItems="columnMenuItems"
    :columnMenuClick="onColumnMenuClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" :showColumnMenu="true"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120" :showColumnMenu="true"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100" :showColumnMenu="true"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const columnMenuItems = ref([
  'SortAscending',
  'SortDescending',
  { text: 'Highlight', target: '.e-gridcontent', id: 'highlight' },
  { text: 'Clear Highlight', id: 'clearHighlight' }
]);

const onColumnMenuClick = (args) => {
  if (args.item.id === 'highlight') {
    // Custom highlight logic
    console.log('Highlight column:', args.column.field);
  }
};
</script>
```

### Nested Menu Items
```vue
const columnMenuItems = [
  'Sort', 'Filter',
  { text: 'Format', items: [
      { text: 'Currency', id: 'format-currency' },
      { text: 'Percentage', id: 'format-percentage' }
    ]
  }
];
```

## Column Reordering

Rearrange columns by dragging and dropping:

### Enable Reordering
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowReordering="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
      <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      <e-column field="ShipAddress" headerText="Ship Address" width="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Reorder } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

provide('grid', [Reorder]);
</script>
```

### Programmatic Reordering
```vue
<template>
  <div>
    <button @click="reorderColumns">Reorder Columns</button>
    
    <ejs-grid ref="gridRef" :dataSource="data" :allowReordering="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const gridRef = ref(null);

const reorderColumns = () => {
  // Move columns to specific positions
  gridRef.value?.reorderColumns(['Freight', 'OrderID', 'CustomerID']);
};
</script>
```

### Reorder Events
```vue
:columnDragStart="onColumnDragStart"
:columnDrop="onColumnDrop"

// Event handlers
const onColumnDragStart = (args) => console.log('Dragging:', args.column?.field);
const onColumnDrop = (args) => console.log('Dropped at index:', args.dropIndex);
```

## Column Resizing

Adjust column width interactively:

### Enable Resizing
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :allowResizing="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" :minWidth="80" :maxWidth="150"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="120" :minWidth="100" :maxWidth="200"></e-column>
      <e-column field="ShipAddress" headerText="Address" width="200" :minWidth="150"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Resize } from '@syncfusion/ej2-vue-grids';
import { provide } from 'vue';

provide('grid', [Resize]);
</script>
```

### Resize Modes
Set resize behavior with `:resizeSettings="{ mode: 'Normal' }"`
- `Normal`: drag to resize
- `Auto`: auto-fit

### Auto-Fit Columns
```vue
<template>
  <div>
    <button @click="autoFitColumns">Auto Fit All</button>
    <button @click="autoFitSelected">Auto Fit Selected</button>
    
    <ejs-grid ref="gridRef" :dataSource="data">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="120"></e-column>
        <e-column field="ShipAddress" headerText="Address" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const gridRef = ref(null);

const autoFitColumns = () => {
  gridRef.value?.autoFitColumns();  // Fit all columns
};

const autoFitSelected = () => {
  gridRef.value?.autoFitColumns(['OrderID', 'CustomerID']);  // Fit specific columns
};
</script>
```

### Resize Events
```vue
:resizeStart="(args) => console.log('Started:', args.column?.field)"
:resizeStop="(args) => console.log('New width:', args.width)"
```

## Row & Column Spanning
Use `queryCellInfo` to merge cells:
```vue
:queryCellInfo="(args) => {
  // Column span: merge first 2 columns in row 0
  if (args.rowIndex === 0 && args.columnIndex === 0) args.colSpan = 2;
  // Row span: merge first column rows 0-1
  if (args.columnIndex === 0 && args.rowIndex < 2) args.rowSpan = 2;
}"
```
