# Data Binding

## Table of Contents

- [Local Data Binding](#local-data-binding)
- [Hierarchical Data](#hierarchical-data)
- [Self-Referential Data](#self-referential-data)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Adaptors](#datamanager-adaptors)
- [Load on Demand](#load-on-demand)
- [Prevent Node Selection](#prevent-node-selection)

## Local Data Binding

Dropdown Tree supports local JavaScript arrays as data source. The component requires three essential field mappings to render hierarchical data: **value** (unique identifier), **text** (display text), and **parentValue** or **child** (hierarchy relationship).

### Field Mapping

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
const data = [
  { id: 1, name: 'Parent', children: [...] },
  { id: 2, name: 'Child', parentId: 1 },
];

const fields = {
  dataSource: data,
  value: 'id',        // Unique identifier
  text: 'name',       // Display text
  parentValue: 'parentId',  // For self-referential
  child: 'children'   // For hierarchical (nested)
};
</script>
```

**Default mappings** (if not specified):
- value: 'id'
- text: 'text'
- parentValue: null

## Hierarchical Data

Hierarchical data contains nested arrays of objects representing parent-child relationships through nesting.

### Example - Product Categories

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select a category"
  />
</template>

<script setup>
const hierarchicalData = [
  {
    code: 'Electronics',
    name: 'Electronics',
    expanded: true,
    children: [
      {
        code: 'Laptops',
        name: 'Laptops',
        children: [
          { code: 'HP', name: 'HP Laptop' },
          { code: 'Dell', name: 'Dell Laptop' },
        ],
      },
      {
        code: 'Phones',
        name: 'Mobile Phones',
        children: [
          { code: 'iPhone', name: 'Apple iPhone' },
          { code: 'Samsung', name: 'Samsung Galaxy' },
        ],
      },
    ],
  },
  {
    code: 'Furniture',
    name: 'Furniture',
    children: [
      { code: 'Chairs', name: 'Chairs' },
      { code: 'Tables', name: 'Tables' },
    ],
  },
];

const fields = {
  dataSource: hierarchicalData,
  value: 'code',
  text: 'name',
  child: 'children',
};
</script>
```

**Key points:**
- Nesting depth is unlimited
- `expanded` property controls initial expansion state
- Map the nested array field to `child` property

## Self-Referential Data

Self-referential data uses parent-child references within a flat array structure.

### Example - Organizational Structure

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select employee"
  />
</template>

<script setup>
const selfReferentialData = [
  { id: 1, pid: null, name: 'CEO', hasChild: true },
  { id: 2, pid: 1, name: 'Manager', hasChild: true },
  { id: 3, pid: 1, name: 'Developer', hasChild: false },
  { id: 4, pid: 2, name: 'Team Lead', hasChild: false },
  { id: 5, pid: 2, name: 'Engineer', hasChild: false },
];

const fields = {
  dataSource: selfReferentialData,
  value: 'id',
  text: 'name',
  parentValue: 'pid',
  hasChildren: 'hasChild', // Optional: indicates if item has children
};
</script>
```

**Key points:**
- Root items have `pid: null` or undefined
- Each item references parent by `pid`
- `hasChildren` helps optimize rendering (optional)
- Flat structure easier to manage than nested

### Field Properties

| Property | Type | Purpose |
|----------|------|---------|
| `value` | String | Unique identifier |
| `text` | String | Display text in dropdown |
| `parentValue` | String | Parent reference (self-referential) |
| `child` | String | Children array (hierarchical) |
| `hasChildren` | String | Boolean flag for parent nodes |
| `selectable` | String | Boolean - disable selection for specific nodes |
| `expanded` | String | Boolean - initial expand state |

## Remote Data Binding

Bind Dropdown Tree to remote data services using DataManager for dynamic, large-scale datasets.

### Basic Remote Binding

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select employee"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'https://api.example.com/employees',
  adaptor: new ODataV4Adaptor(),
});

const fields = ref({
  dataSource: dataManager,
  value: 'EmployeeID',
  text: 'FirstName',
  hasChildren: 'EmployeeID', // Or check for children
});
</script>
```

### Nested Remote - Two Level Binding

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select employee and order"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'https://api.example.com/employees',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true,
});

const fields = ref({
  dataSource: dataManager,
  value: 'EmployeeID',
  text: 'FirstName',
  child: {
    dataSource: new DataManager({
      url: 'https://api.example.com/orders',
      adaptor: new ODataV4Adaptor(),
      crossDomain: true,
    }),
    value: 'OrderID',
    parentValue: 'EmployeeID',
    text: 'ShipName',
  },
});
</script>
```

**Key configuration:**
- `dataManager`: Points to parent data endpoint
- `child.dataSource`: Points to child data endpoint
- `child.parentValue`: Links children to parent by this field
- `crossDomain`: Required for external APIs

## DataManager Adaptors

### OData Adaptor

Connects to standard OData services:

```vue
<script setup>
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/odata/Employees',
    adaptor: new ODataAdaptor(),
  }),
  value: 'EmployeeID',
  text: 'FirstName',
};
</script>
```

### OData V4 Adaptor

Connects to OData V4 services (recommended):

```vue
<script setup>
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/odata/v4/Employees',
    adaptor: new ODataV4Adaptor(),
  }),
  value: 'EmployeeID',
  text: 'FirstName',
};
</script>
```

### WebAPI Adaptor

Connects to custom Web API endpoints:

```vue
<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/api/employees',
    adaptor: new WebApiAdaptor(),
  }),
  value: 'id',
  text: 'name',
};
</script>
```

### URL Adaptor

Connects to JSON endpoints without adaptor specification:

```vue
<script setup>
import { DataManager } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/data.json',
    // Defaults to URL adaptor
  }),
  value: 'id',
  text: 'name',
};
</script>
```

## Load on Demand

Load on demand (lazy loading) improves performance by loading only parent nodes initially and fetching child nodes when the parent is expanded.

### Enable with Remote Data

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :treeSettings="treeSettings"
    placeholder="Data loads as you expand"
  />
</template>

<script setup>
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const fields = {
  dataSource: new DataManager({
    url: 'https://api.example.com/employees',
    adaptor: new ODataV4Adaptor(),
  }),
  value: 'EmployeeID',
  text: 'FirstName',
  hasChildren: 'EmployeeID',
  child: {
    dataSource: new DataManager({
      url: 'https://api.example.com/orders',
      adaptor: new ODataV4Adaptor(),
    }),
    value: 'OrderID',
    parentValue: 'EmployeeID',
    text: 'ShipName',
  },
};

const treeSettings = {
  loadOnDemand: true,
};
</script>
```

### How Lazy Loading Works

1. **Initial load**: Only root-level items displayed
2. **User expands a parent**: Child items fetched from data source
3. **Child level expanded**: Next-level children fetched (if applicable)
4. **Repeated**: Process continues for deeper hierarchy levels

### Performance Considerations

- **Reduce initial payload**: Only first-level items loaded
- **Faster initial render**: Component displays quicker
- **Network requests**: Additional requests made when expanding nodes
- **Caching**: Expanded nodes cached, no re-fetch on re-expand
- **Best for**: 1000+ items, deeply nested hierarchies, remote data

## Prevent Node Selection

Disable selection for specific nodes using the `selectable` field.

### Example - Non-Selectable Parents

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select leaf items only"
  />
</template>

<script setup>
const data = [
  { id: 1, name: 'Electronics', selectable: false, hasChild: true, expanded: true },
  { id: 2, pid: 1, name: 'Laptops', selectable: true },
  { id: 3, pid: 1, name: 'Phones', selectable: true },
  { id: 4, name: 'Appliances', selectable: false, hasChild: true },
  { id: 5, pid: 4, name: 'Refrigerators', selectable: true },
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'pid',
  hasChildren: 'hasChild',
  selectable: 'selectable', // Field indicating if node can be selected
};
</script>
```

**Behavior with selectable = false:**
- Node cannot be clicked to select
- Node remains visible in tree
- Node can still be expanded/collapsed
- Useful for category headers or disabled items

### Dynamic Selection Control

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    placeholder="Select items"
  />
</template>

<script setup>
const data = [
  { id: 1, name: 'Parent', hasChild: true },
  { id: 2, pid: 1, name: 'Child', selectable: false }, // Cannot select
  { id: 3, pid: 1, name: 'Other Child', selectable: true }, // Can select
];

// Selectable field can be a boolean or come from computed logic
const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'pid',
  selectable: 'selectable',
};
</script>
```
