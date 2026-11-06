# Field Mapping & Custom Data Structures

## Table of Contents

- [FieldsModel Overview](#fieldsmodel-overview)
- [Core Fields](#core-fields)
- [Node State Fields](#node-state-fields)
- [Display Enhancement Fields](#display-enhancement-fields)
- [Remote Data Fields](#remote-data-fields)
- [Complete Field Mapping Examples](#complete-field-mapping-examples)

## FieldsModel Overview

The `:fields` property is an object that maps your data structure to the Dropdown Tree component. It tells the component which properties to use for different purposes.

### Basic FieldsModel Structure

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
const fields = {
  // Core mapping
  dataSource: data,           // Data array or DataManager
  value: 'id',                // Unique identifier field
  text: 'name',               // Display text field
  
  // Hierarchy
  child: 'children',          // Child items field (hierarchical)
  // OR
  parentValue: 'parentId',    // Parent reference field (self-referential)
  
  // Optional enhancements
  expanded: 'isExpanded',     // Initial expand state
  hasChildren: 'hasChild',    // Indicates if node has children
  selectable: 'canSelect',    // Whether node can be selected
  selected: 'isSelected',     // Pre-selected nodes
  iconCss: 'icon',            // CSS class for icon
  imageUrl: 'image',          // Image URL for node
  htmlAttributes: 'attrs'     // HTML attributes object
};
</script>
```

## Core Fields

### dataSource

Specifies the data array or DataManager instance to populate the tree.

```vue
<script setup>
// Local array
const fields = {
  dataSource: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ],
  value: 'id',
  text: 'name'
};

// Remote DataManager
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/data',
    adaptor: new ODataV4Adaptor()
  }),
  value: 'id',
  text: 'name'
};
</script>
```

### value

Field name containing the unique identifier for each node. Used for selection tracking and event data.

```vue
<script setup>
const data = [
  { itemId: 1, name: 'Item 1' },
  { itemId: 2, name: 'Item 2' }
];

const fields = {
  dataSource: data,
  value: 'itemId',  // Custom identifier field
  text: 'name'
};
</script>
```

**Important:** The `value` field must be unique across all nodes.

### text

Field name containing the display text for each node in the dropdown tree.

```vue
<script setup>
const data = [
  { id: 1, label: 'Electronics' },
  { id: 2, label: 'Computers' }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'label'  // Custom text field
};
</script>
```

## Hierarchy Fields

### child (Hierarchical Data)

Field name containing child items array for nested hierarchies. Use this for data where children are nested within parents.

```vue
<script setup>
const hierarchicalData = [
  {
    id: 1,
    name: 'Fruits',
    children: [
      { id: 2, name: 'Apple', children: [] },
      { id: 3, name: 'Orange', children: [] }
    ]
  },
  {
    id: 4,
    name: 'Vegetables',
    children: [
      { id: 5, name: 'Carrot', children: [] }
    ]
  }
];

const fields = {
  dataSource: hierarchicalData,
  value: 'id',
  text: 'name',
  child: 'children'  // Nested children array
};
</script>
```

### parentValue (Self-Referential Data)

Field name containing the parent's identifier. Use this for flat arrays where each child references its parent.

```vue
<script setup>
const selfReferentialData = [
  { id: 1, name: 'Fruits', parentId: null },
  { id: 2, name: 'Apple', parentId: 1 },
  { id: 3, name: 'Orange', parentId: 1 },
  { id: 4, name: 'Vegetables', parentId: null },
  { id: 5, name: 'Carrot', parentId: 4 }
];

const fields = {
  dataSource: selfReferentialData,
  value: 'id',
  text: 'name',
  parentValue: 'parentId'  // Reference to parent
};
</script>
```

## Node State Fields

### expanded

Field name indicating whether a node should be initially expanded or collapsed.

```vue
<script setup>
const data = [
  { id: 1, name: 'Category 1', isExpanded: true },
  { id: 2, name: 'Item 1.1', parentId: 1, isExpanded: false }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  expanded: 'isExpanded',  // Boolean field
  parentValue: 'parentId'
};
</script>
```

### hasChildren

Field name indicating whether a node has children (used for optimization and lazy loading).

```vue
<script setup>
const data = [
  { id: 1, name: 'Parent', hasChild: true },
  { id: 2, name: 'Child', hasChild: false, parentId: 1 }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  hasChildren: 'hasChild',  // Boolean field
  parentValue: 'parentId'
};
</script>
```

### selectable

Field name indicating whether a node can be selected. Set to false for non-selectable nodes (like category headers).

```vue
<script setup>
const data = [
  { id: 1, name: 'Electronics', canSelect: false, hasChild: true },
  { id: 2, name: 'Laptops', canSelect: true, parentId: 1 },
  { id: 3, name: 'Phones', canSelect: true, parentId: 1 }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  selectable: 'canSelect',  // Boolean field
  parentValue: 'parentId'
};
</script>
```

### selected

Field name indicating whether a node should be pre-selected.

```vue
<script setup>
const data = [
  { id: 1, name: 'Item 1', isSelected: true },
  { id: 2, name: 'Item 2', isSelected: false }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  selected: 'isSelected'  // Boolean field
};
</script>
```

## Display Enhancement Fields

### iconCss

Field name containing CSS class names for icons to display before item text.

```vue
<script setup>
const data = [
  { id: 1, name: 'Favorites', icon: 'e-icons e-star' },
  { id: 2, name: 'Recent', icon: 'e-icons e-clock' },
  { id: 3, name: 'Deleted', icon: 'e-icons e-trash' }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  iconCss: 'icon'  // CSS class field
};
</script>
```

### imageUrl

Field name containing URLs to images displayed before item text.

```vue
<script setup>
const data = [
  { id: 1, name: 'Alice', image: '/images/alice.jpg' },
  { id: 2, name: 'Bob', image: '/images/bob.jpg' }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  imageUrl: 'image'  // Image URL field
};
</script>
```

### htmlAttributes

Field name containing HTML attributes as an object to apply to item elements.

```vue
<script setup>
const data = [
  { 
    id: 1, 
    name: 'Item 1', 
    attrs: { class: 'custom-item', 'data-category': 'A' }
  },
  { 
    id: 2, 
    name: 'Item 2', 
    attrs: { class: 'custom-item', 'data-category': 'B' }
  }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  htmlAttributes: 'attrs'  // HTML attributes object field
};
</script>
```

## Remote Data Fields

### query

Query configuration for filtering/selecting data from remote sources.

```vue
<script setup>
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const query = new Query()
  .from('Employees')
  .select('EmployeeID,FirstName,ReportsTo')
  .take(10);

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/odata',
    adaptor: new ODataV4Adaptor()
  }),
  value: 'EmployeeID',
  text: 'FirstName',
  query: query
};
</script>
```

### tableName

Table or resource name in the remote data source (for database-backed APIs).

```vue
<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/api/employees',
    adaptor: new WebApiAdaptor()
  }),
  value: 'id',
  text: 'name',
  tableName: 'employees'  // Remote table/resource name
};
</script>
```

## Complete Field Mapping Examples

### Example 1: Simple Hierarchical Data

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
const data = [
  {
    code: 'Electronics',
    name: 'Electronics',
    children: [
      { code: 'Laptops', name: 'Laptops' },
      { code: 'Phones', name: 'Phones' }
    ]
  }
];

const fields = {
  dataSource: data,
  value: 'code',
  text: 'name',
  child: 'children'
};
</script>
```

### Example 2: Self-Referential with All Features

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
const data = [
  {
    id: 1,
    text: 'CEO',
    parentId: null,
    hasChild: true,
    expanded: true,
    selectable: true,
    selected: false
  },
  {
    id: 2,
    text: 'VP Engineering',
    parentId: 1,
    hasChild: true,
    expanded: false,
    selectable: true,
    selected: false
  },
  {
    id: 3,
    text: 'Software Engineer',
    parentId: 2,
    hasChild: false,
    expanded: false,
    selectable: true,
    selected: true,
    iconCss: 'e-icons e-user'
  }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'text',
  parentValue: 'parentId',
  hasChildren: 'hasChild',
  expanded: 'expanded',
  selectable: 'selectable',
  selected: 'selected',
  iconCss: 'iconCss'
};
</script>
```

### Example 3: Remote Data with Query

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const employeeQuery = new Query()
  .from('Employees')
  .select('EmployeeID,FirstName,ReportsTo')
  .where('ReportsTo', 'equal', null);

const orderQuery = new Query()
  .from('Orders')
  .select('OrderID,EmployeeID,ShipName');

const fields = {
  dataSource: new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  }),
  value: 'EmployeeID',
  text: 'FirstName',
  query: employeeQuery,
  hasChildren: 'EmployeeID',
  child: {
    dataSource: new DataManager({
      url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
      adaptor: new ODataV4Adaptor(),
      crossDomain: true
    }),
    value: 'OrderID',
    parentValue: 'EmployeeID',
    text: 'ShipName',
    query: orderQuery
  }
};
</script>
```

### Example 4: Complex Hierarchical with Enhanced Display

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
const data = [
  {
    id: 1,
    name: 'Departments',
    children: [
      {
        id: 2,
        name: 'Engineering',
        dept_icon: 'e-icons e-settings',
        children: [
          {
            id: 3,
            name: 'John Doe',
            emp_image: '/avatars/john.jpg',
            canSelect: true
          },
          {
            id: 4,
            name: 'Jane Smith',
            emp_image: '/avatars/jane.jpg',
            canSelect: true
          }
        ]
      },
      {
        id: 5,
        name: 'Sales',
        dept_icon: 'e-icons e-cart',
        children: [
          {
            id: 6,
            name: 'Bob Johnson',
            emp_image: '/avatars/bob.jpg',
            canSelect: true
          }
        ]
      }
    ]
  }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  child: 'children',
  iconCss: 'dept_icon',
  imageUrl: 'emp_image',
  selectable: 'canSelect'
};
</script>
```
