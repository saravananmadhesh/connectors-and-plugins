# Data Binding and Sources in Vue 3 TreeView

## Table of Contents

1. [Overview](#overview)
2. [Hierarchical Data Binding](#hierarchical-data-binding)
3. [Self-Referential Data Binding](#self-referential-data-binding)
4. [DataManager Integration](#datamanager-integration)
5. [Remote Data with OData](#remote-data-with-odata)
6. [Remote Data with Web API](#remote-data-with-web-api)
7. [Load-on-Demand Binding](#load-on-demand-binding)
8. [Data Binding Events](#data-binding-events)
9. [Field Mapping Reference](#field-mapping-reference)
10. [Troubleshooting](#troubleshooting)

## Overview

TreeView supports 5 primary data binding approaches in Vue 3:

| Method | Use Case | Performance | Complexity |
|--------|----------|-------------|-----------|
| Hierarchical | Nested arrays in memory | Good | Simple |
| Self-Referential | Flat arrays with parentID | Good | Simple |
| OData | Standardized remote API | Better | Medium |
| Web API | Custom backend API | Better | Medium |
| Load-on-Demand | Large datasets, lazy load | Best | Complex |

Choose based on data structure and size:
- **<1000 nodes:** Hierarchical or Self-Referential
- **1000-10000 nodes:** Web API with load-on-demand
- **10000+ nodes:** Load-on-demand with caching

## Hierarchical Data Binding

Data organized as nested arrays with `child` property:

### Basic Hierarchical Example

```vue
<script setup>
import { ref } from 'vue';
import { TreeViewComponent } from '@syncfusion/ej2-vue-navigations';

const hierarchicalData = ref([
  {
    id: 1,
    name: 'Syncfusion',
    expanded: true,
    child: [
      { id: 2, name: 'React Components' },
      { id: 3, name: 'Angular Components' },
      { id: 4, name: 'Vue Components' }
    ]
  },
  {
    id: 5,
    name: 'Essential Studio',
    expanded: false,
    child: [
      { id: 6, name: 'Web' },
      { id: 7, name: 'Desktop' }
    ]
  }
]);
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: hierarchicalData,
      id: 'id',
      text: 'name',
      child: 'child',
      expanded: 'expanded'
    }"
  />
</template>
```

### Multi-Level Nesting

```vue
const deepData = ref([
  {
    id: 1,
    name: 'Level 0',
    child: [
      {
        id: 2,
        name: 'Level 1.1',
        child: [
          { id: 3, name: 'Level 2.1' },
          { id: 4, name: 'Level 2.2' }
        ]
      },
      {
        id: 5,
        name: 'Level 1.2',
        child: [
          { id: 6, name: 'Level 2.3' }
        ]
      }
    ]
  }
]);

<ejs-treeview
  :fields="{
    dataSource: deepData,
    id: 'id',
    text: 'name',
    child: 'child'
  }"
/>
```

### Fields Configuration

```vue
const fields = {
  dataSource: data,           // Array of data
  id: 'id',                   // Unique identifier property
  text: 'name',               // Display text property
  child: 'child',             // Children array property
  expanded: 'expanded',       // Initial expand state (optional)
  selected: 'selected',       // Initial selection (optional)
  iconCss: 'icon',            // Icon CSS class (optional)
  imageUrl: 'image',          // Image URL (optional)
  tooltip: 'tooltip',         // Tooltip text (optional)
  htmlAttributes: 'attr'      // HTML attributes (optional)
};
```

## Self-Referential Data Binding

Flat array with parent-child relationship via IDs:

### Basic Self-Referential Example

```vue
<script setup>
import { ref } from 'vue';

const selfRefData = ref([
  { id: 1, pid: null, name: 'Syncfusion', hasChild: true },
  { id: 2, pid: 1, name: 'React Components' },
  { id: 3, pid: 1, name: 'Angular Components' },
  { id: 4, pid: 1, name: 'Vue Components' },
  { id: 5, pid: null, name: 'Essential Studio', hasChild: true },
  { id: 6, pid: 5, name: 'Web' },
  { id: 7, pid: 5, name: 'Desktop' }
]);
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: selfRefData,
      id: 'id',
      parentID: 'pid',
      text: 'name',
      hasChildren: 'hasChild'
    }"
  />
</template>
```

### Self-Referential Fields

```vue
const fields = {
  dataSource: data,
  id: 'id',              // Unique ID
  parentID: 'pid',       // Parent ID (null = root node)
  text: 'name',          // Display text
  hasChildren: 'hasChild' // Boolean: has children?
};
```

### When to Use Self-Referential

- ✅ Data from database query (flat result set)
- ✅ Load-on-demand (children loaded separately)
- ✅ Dynamically adding/removing nodes
- ✅ Large datasets (better DB query support)
- ❌ Not recommended for pre-loaded hierarchical data

## DataManager Integration

DataManager handles remote data and querying with Vue 3:

### Basic DataManager Example

```vue
<script setup>
import { ref } from 'vue';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

const data = ref(new DataManager({
  url: 'https://api.example.com/odata/v4/items',
  adaptor: new ODataV4Adaptor()
}));

const query = new Query()
  .select(['id', 'name', 'parentID'])
  .take(100);
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: data,
      id: 'id',
      text: 'name',
      parentID: 'parentID',
      query: query
    }"
  />
</template>
```

## Remote Data with OData

Standard OData v4 service integration:

### OData Setup

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

const data = ref(new DataManager({
  url: 'https://api.example.com/odata/v4/employees',
  adaptor: new ODataV4Adaptor()
}));

const query = new Query()
  .select(['id', 'name', 'designation', 'reportsTo'])
  .filter('status', 'equal', 'active')
  .take(500);

onMounted(() => {
  console.log('OData TreeView initialized');
});
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: data,
      id: 'id',
      parentID: 'reportsTo',
      text: 'name',
      query: query
    }"
  />
</template>
```

## Remote Data with Web API

Custom Web API integration:

### Web API Setup

```vue
<script setup>
import { ref } from 'vue';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

const data = ref(new DataManager({
  url: 'https://api.example.com/api/items',
  adaptor: new WebApiAdaptor()
}));

const query = new Query()
  .select(['id', 'text', 'parentID', 'hasChildren'])
  .addParams('pageSize', 100);
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: data,
      id: 'id',
      parentID: 'parentID',
      text: 'text',
      query: query,
      hasChildren: 'hasChildren'
    }"
    :loadOnDemand="true"
  />
</template>
```

### Server Response Format

Expected JSON response:

```json
{
  "result": [
    { "id": 1, "text": "Parent 1", "parentID": null, "hasChildren": true },
    { "id": 2, "text": "Child 1.1", "parentID": 1, "hasChildren": false },
    { "id": 3, "text": "Child 1.2", "parentID": 1, "hasChildren": true }
  ],
  "count": 3
}
```

## Load-on-Demand Binding

Lazy load children when parent expands - best for large datasets:

### Basic Load-on-Demand

```vue
<script setup>
import { ref } from 'vue';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

const data = ref(new DataManager({
  url: 'https://api.example.com/api/items',
  adaptor: new WebApiAdaptor()
}));

const query = new Query()
  .select(['id', 'text', 'parentID', 'hasChildren'])
  .where('parentID', 'equal', null); // Load only root nodes initially

const handleNodeExpanding = async (args) => {
  // When node expands, query for its children
  if (args.nodeData.hasChildren && !args.nodeData.child) {
    const childQuery = new Query()
      .select(['id', 'text', 'parentID', 'hasChildren'])
      .where('parentID', 'equal', args.nodeData.id);
    
    try {
      const result = await data.value.executeQuery(childQuery);
      args.nodeData.child = result.result;
    } catch (error) {
      console.error('Failed to load children:', error);
    }
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{
      dataSource: data,
      id: 'id',
      parentID: 'parentID',
      text: 'text',
      query: query,
      hasChildren: 'hasChildren'
    }"
    :loadOnDemand="true"
    @nodeExpanding="handleNodeExpanding"
  />
</template>
```

### Load-on-Demand with Caching

```vue
<script setup>
import { ref, reactive } from 'vue';

const cache = reactive({});
const data = ref(new DataManager({...}));

const handleNodeExpanding = async (args) => {
  const nodeId = args.nodeData.id;

  // Check cache first
  if (cache[nodeId]) {
    args.nodeData.child = cache[nodeId];
    return;
  }

  // Fetch from server
  if (args.nodeData.hasChildren && !args.nodeData.child) {
    const query = new Query()
      .where('parentID', 'equal', nodeId);
    
    try {
      const result = await data.value.executeQuery(query);
      
      // Cache the result
      cache[nodeId] = result.result;
      args.nodeData.child = result.result;
    } catch (error) {
      console.error('Error loading children:', error);
    }
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'text' }"
    :loadOnDemand="true"
    @nodeExpanding="handleNodeExpanding"
  />
</template>
```

## Data Binding Events

### created Event

Fires when TreeView initializes:

```vue
<script setup>
const handleCreated = () => {
  console.log('TreeView created');
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
    @created="handleCreated"
  />
</template>
```

### dataBound Event

Fires after data binding completes:

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);

const handleDataBound = () => {
  console.log('Data binding complete');
  // Expand all nodes
  if (treeviewRef.value) {
    treeviewRef.value.expandAll();
  }
};
</script>

<template>
  <ejs-treeview
    ref="treeviewRef"
    :fields="{ dataSource: data, id: 'id', text: 'name' }"
    @dataBound="handleDataBound"
  />
</template>
```

### Using Events for Data Operations

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const loadingState = ref(false);

const handleDataBound = async () => {
  loadingState.value = false;
  console.log('Tree rendered with data');
  
  // Perform operations after data loads
  if (treeviewRef.value) {
    treeviewRef.value.expandAll();
    const allNodes = treeviewRef.value.getTreeData();
    console.log('Total nodes:', allNodes.length);
  }
};

const loadData = () => {
  loadingState.value = true;
};
</script>

<template>
  <div>
    <button @click="loadData" :disabled="loadingState">
      {{ loadingState ? 'Loading...' : 'Load Data' }}
    </button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name' }"
      @dataBound="handleDataBound"
    />
  </div>
</template>
```

## Field Mapping Reference

### Complete Fields Object

```vue
const fields = {
  // Data source
  dataSource: ref([]) | DataManager,    // Data array or DataManager instance
  query: Query,                         // Query for DataManager
  
  // Identification
  id: 'id',                             // Unique identifier property
  text: 'name',                         // Display text property
  
  // Hierarchy
  child: 'child',                       // Children array (hierarchical)
  parentID: 'pid',                      // Parent ID reference (self-referential)
  hasChildren: 'hasChild',              // Boolean: has children?
  
  // State
  expanded: 'expanded',                 // Initial expand state
  selected: 'selected',                 // Initial selection
  isChecked: 'isChecked',              // Initial checked state
  
  // Appearance
  iconCss: 'icon',                      // Icon CSS class
  imageUrl: 'image',                    // Image URL
  tooltip: 'tooltip',                   // Tooltip text
  htmlAttributes: 'attr'                // HTML attributes object
};
```

### Field Property Mapping Examples

```vue
// Employee data structure
const employees = ref([
  {
    empId: 101,
    empName: 'John Doe',
    reportsTo: null,
    designation: 'Manager',
    department: 'IT',
    profileImage: 'john.jpg',
    isManager: true
  }
]);

// Field mapping
const fields = {
  dataSource: employees,
  id: 'empId',                    // Maps to empId
  parentID: 'reportsTo',          // Maps to reportsTo
  text: 'empName',                // Maps to empName
  hasChildren: 'isManager',       // Maps to isManager
  imageUrl: 'profileImage',       // Maps to profileImage
  tooltip: 'designation'          // Maps to designation
};
```

### Reactive Field Changes

```vue
<script setup>
import { ref, reactive } from 'vue';

const currentFields = reactive({
  dataSource: ref([]),
  id: 'id',
  text: 'name',
  child: 'child'
});

const switchDataSource = (newData) => {
  currentFields.dataSource = ref(newData);
};

const changeTextField = (newField) => {
  currentFields.text = newField;
};
</script>

<template>
  <ejs-treeview :fields="currentFields" />
</template>
```

## Troubleshooting

### Data Not Displaying

```vue
// ❌ Wrong - Field names don't match data properties
const data = ref([{ id: 1, name: 'Item', children: [] }]);
<ejs-treeview
  :fields="{
    dataSource: data,
    id: 'id',
    text: 'name',
    child: 'child'  // Wrong - data has 'children' not 'child'
  }"
/>

// ✅ Correct
<ejs-treeview
  :fields="{
    dataSource: data,
    id: 'id',
    text: 'name',
    child: 'children'  // Correct property name
  }"
/>
```

### Load-on-Demand Not Triggering

```vue
// ✅ Required for load-on-demand
<ejs-treeview
  :loadOnDemand="true"  // Enable lazy loading
  @nodeExpanding="handleExpand"
/>

// ✅ In self-referential data, set hasChildren on parent nodes
const data = ref([
  { id: 1, pid: null, name: 'Parent', hasChild: true },  // hasChild=true
  { id: 2, pid: 1, name: 'Child' }
]);
```

### DataManager Query Not Working

```vue
// ✅ Correct Query syntax
const query = new Query()
  .select(['id', 'text'])           // Select specific properties
  .where('status', 'equal', 'active') // Filter
  .take(100);                       // Limit results

// ❌ Wrong - property not selected
const query = new Query()
  .where('status', 'equal', 'active')
  // Missing .select() - might not return needed properties
```

### Data Ref Not Updating TreeView

```vue
// ✅ Correct - Trigger reactivity
const data = ref([...]);

const updateData = () => {
  // Create new reference
  data.value = [
    ...data.value,
    { id: 10, name: 'New Item' }
  ];
};

// Or modify directly (Vue tracks this)
const addItem = () => {
  data.value.push({ id: 10, name: 'New Item' });
};
```

---

**Key Takeaways:**
- ✅ Use hierarchical for pre-loaded data
- ✅ Use self-referential for database queries
- ✅ Use DataManager for remote data
- ✅ Use load-on-demand for 10000+ nodes
- ✅ Map fields correctly to data properties
- ✅ Set hasChildren on parent nodes for load-on-demand
- ✅ Wrap data in `ref()` for reactivity in Composition API
- ✅ Use caching for better performance with load-on-demand
