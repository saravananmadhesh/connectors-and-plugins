# Data Handling and Binding

Data binding is the foundation of TreeGrid functionality. TreeGrid uses `DataManager` which supports both RESTful JSON data services binding and local JavaScript object array binding. The `dataSource` property can be assigned with either a `DataManager` instance or a JavaScript object array.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Local Data Binding - Hierarchical (childMapping)](#local-data-binding---hierarchical-childmapping)
- [Local Data Binding - Self-Referential (idMapping)](#local-data-binding---self-referential-idmapping)
- [Remote Data Binding - DataManager with REST API](#remote-data-binding---datamanager-with-rest-api)
- [Remote Data Binding Options](#remote-data-binding-options)
- [AJAX Data Binding](#ajax-data-binding)
- [Expand State Mapping](#expand-state-mapping)
- [Load Child on Demand Mapping](#load-child-on-demand-mapping)
- [Reserved Properties](#reserved-properties)

## When to Use

Use data binding when you need to:
- **Display hierarchical data** - parent-child relationships in tree structure
- **Bind local arrays** - static data or data loaded from application memory
- **Fetch from remote endpoints** - REST APIs, Web services, or data endpoints
- **Update data dynamically** - add/edit/delete rows reactively with UI updates
- **Access nested properties** - complex object structures with dot notation
- **Handle batch updates** - modify multiple rows efficiently with state management
- **Load data on demand** - lazy load child records when parent rows expand

## Mandatory Rules

Before implementing data binding:
- ✓ **Data Structure**: Array of objects format `[{ taskID: 1, taskName: 'Task' }, ...]`
- ✓ **Column Field Mapping**: Column `field` must match data properties exactly (case-sensitive)
- ✓ **Binding Method Selection**: Choose either Local (childMapping or idMapping) OR Remote (DataManager)
- ✓ **Tree Column Index**: Specify `:treeColumnIndex="0"` to show expand/collapse in that column
- ✓ **Module Imports**: Import TreeGrid components and DataManager from '@syncfusion/ej2-data'
- ✓ **Vue Reactivity**: Use `ref()` for reactive data in Composition API
- ✓ **Unique Identifiers**: For self-referential data, ensure unique ID values
- ✓ **Parent-Child Relationship**: Define via `childMapping` (nested) or `parentIdMapping` (flat)

## Local Data Binding - Hierarchical (childMapping)

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks">
    <e-columns>
      <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=90 textAlign="Right"></e-column>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { 
    taskID: 1, 
    taskName: 'Project Planning', 
    duration: 10,
    startDate: new Date(2023, 2, 1),
    subtasks: [
      { taskID: 2, taskName: 'Analysis', duration: 3, startDate: new Date(2023, 2, 2) },
      { taskID: 3, taskName: 'Design', duration: 5, startDate: new Date(2023, 2, 5) }
    ]
  },
]);

provide('treegrid', [Page]);
</script>
```

**When to use Hierarchical:**
- Data is naturally nested (has parent-child structure in code)
- Frontend data structures with embedded child arrays
- API responses return nested objects
- Small to medium datasets (10,000+ rows use flat structure for performance)

**Key Properties:**
- `childMapping`: Maps the property name containing child records
- `dataSource`: Direct array assignment (not DataManager)
- `:treeColumnIndex`: Column index showing expand/collapse icon

## Local Data Binding - Self-Referential (idMapping)

```vue
<template>
  <ejs-treegrid 
    :dataSource="flatData" 
    :treeColumnIndex="1"
    idMapping="taskID"
    parentIdMapping="parentID">
    <e-columns>
      <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=90 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page } from '@syncfusion/ej2-vue-treegrid';

const flatData = ref([
  { taskID: 1, parentID: null, taskName: 'Planning', duration: 10, startDate: new Date(2023, 2, 1) },
  { taskID: 2, parentID: 1, taskName: 'Analysis', duration: 3, startDate: new Date(2023, 2, 2) },
  { taskID: 3, parentID: 1, taskName: 'Design', duration: 5, startDate: new Date(2023, 2, 5) },
  { taskID: 4, parentID: null, taskName: 'Implementation', duration: 15, startDate: new Date(2023, 2, 10) },
  { taskID: 5, parentID: 4, taskName: 'Development', duration: 10, startDate: new Date(2023, 2, 10) },
  { taskID: 6, parentID: 4, taskName: 'Testing', duration: 5, startDate: new Date(2023, 2, 20) }
]);

provide('treegrid', [Page]);
</script>
```

**Key Properties:**
- `idMapping`: Property name containing unique identifiers (e.g., "taskID")
- `parentIdMapping`: Property name containing parent identifiers (e.g., "parentID")
- Root records have `null` or undefined parent ID
- Child records have parent's ID as their parent ID value

**When to use Self-Referential:**
- Data comes from flat database queries
- Large datasets (better virtualization performance than hierarchical)
- Backend returns self-referential structure
- Dynamic data where nesting level varies
- Easier server-side data management

## Remote Data Binding - DataManager with REST API

Fetch data from remote endpoints using `DataManager`. **Remote data binding supports only Self-Referential data** (idMapping + parentIdMapping):

```vue
<template>
  <ejs-treegrid 
    :dataSource="dataSource" 
    :treeColumnIndex="1"
    idMapping="taskID"
    parentIdMapping="parentID"
    :allowPaging="true">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page } from '@syncfusion/ej2-vue-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

// Remote service URL
const SERVICE_URI = 'url';

const dataSource = ref(new DataManager({
  url: SERVICE_URI,
  adaptor: new WebApiAdaptor(),
  crossDomain: true
}));

provide('treegrid', [Page]);
</script>
```

## Remote Data Binding Options

### Custom Adaptor

Extend built-in adaptors to customize data processing:

```vue
<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

class CustomAdaptor extends WebApiAdaptor {
  processResponse() {
    let i = 0;
    let original = super.processResponse.apply(this, arguments);
    // Add serial number to each record
    original.forEach((item) => item['serialNumber'] = ++i);
    return original;
  }
}

const SERVICE_URI = 'url';

const dataSource = new DataManager({
  url: SERVICE_URI,
  adaptor: new CustomAdaptor(),
  offline: true
});
</script>
```

### Offline Mode

Load all data on initialization and process actions client-side:

```vue
<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataSource = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  offline: true  // All actions processed client-side
});
</script>
```

### Query Parameters

Send additional parameters to server:

```vue
<template>
  <ejs-treegrid 
    :dataSource="dataSource" 
    :query="query"
    idMapping="taskID"
    parentIdMapping="parentID">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

const dataSource = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Add custom parameters
const query = new Query().addParams('ej2treegrid', 'true').addParams('userId', '123');
</script>
```

### Error Handling

Capture and handle server errors via `actionFailure` event:

```vue
<template>
  <ejs-treegrid 
    :dataSource="dataSource" 
    idMapping="taskID"
    parentIdMapping="parentID"
    @actionFailure="onActionFailure">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataSource = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

const onActionFailure = (args) => {
  console.error('Server error:', args);
};
</script>
```

## AJAX Data Binding

Bind data from fetch requests and manually trigger DataSource updates:

```vue
<template>
  <div>
    <button @click="bindData">Load from AJAX</button>
    <button @click="refreshData">Refresh</button>
    
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      idMapping="taskID"
      parentIdMapping="parentID"
      :treeColumnIndex="1">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Fetch } from '@syncfusion/ej2-base';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const data = ref({});

const bindData = () => {
  if (!gridInstance.value) return;
  
  gridInstance.value.showSpinner();
  
  const fetch = new Fetch('url', 'GET');
  fetch.send();
  
  fetch.onSuccess = (result) => {
    gridInstance.value.hideSpinner();
    data.value = result;  // Bind fetched data to grid
  };
  
  fetch.onFailure = (error) => {
    gridInstance.value.hideSpinner();
    console.error('AJAX Error:', error);
  };
};

const refreshData = async () => {
  try {
    const response = await fetch('url');
    const newData = await response.json();
    data.value = newData;
  } catch (error) {
    console.error('Refresh error:', error);
  }
};
</script>
```

**Note:** AJAX-bound data acts as local datasource - server-side CRUD operations are not performed.

## Expand State Mapping

Control initial expand/collapse state of parent rows using `expandStateMapping`:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    idMapping="taskID"
    parentIdMapping="parentID"
    expandStateMapping="isExpanded"
    :treeColumnIndex="1">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
      <e-column field="isExpanded" headerText="Expanded" width=100 type="boolean"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  { taskID: 1, parentID: null, taskName: 'Planning', isExpanded: true },
  { taskID: 2, parentID: 1, taskName: 'Analysis', isExpanded: false },
  { taskID: 3, parentID: 1, taskName: 'Design', isExpanded: false },
  { taskID: 4, parentID: null, taskName: 'Implementation', isExpanded: true },
  { taskID: 5, parentID: 4, taskName: 'Development', isExpanded: false }
]);
</script>
```

**Key Property:**
- `expandStateMapping`: Maps to boolean field in data (true = expanded, false = collapsed)
- Initial state determined by data source values
- User can override via UI

## Load Child on Demand Mapping

Use `hasChildMapping` to indicate which records have child records (reduces expand icon rendering):

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    idMapping="taskID"
    parentIdMapping="parentID"
    hasChildMapping="hasChildren"
    :loadChildOnDemand="true"
    :treeColumnIndex="1">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=200></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref } from 'vue';

const data = ref([
  { taskID: 1, parentID: null, taskName: 'Planning', hasChildren: true },
  { taskID: 2, parentID: 1, taskName: 'Analysis', hasChildren: false },
  { taskID: 3, parentID: 1, taskName: 'Design', hasChildren: true },
  { taskID: 4, parentID: null, taskName: 'Implementation', hasChildren: true }
]);
</script>
```

**Key Property:**
- `hasChildMapping`: Boolean field indicating child record existence
- Useful for remote data with load on demand
- Internally optimizes expand icon visibility
- Important for performance with large datasets


## Reserved Properties

TreeGrid uses certain reserved properties internally. Avoid using these property names in your data arrays:

| Property | Purpose |
|----------|---------|
| `childRecords` | Specifies child records of a parent record |
| `hasChildRecords` | Indicates whether record contains child records (boolean) |
| `hasFilteredChildRecords` | Indicates whether filtered child records exist |
| `expanded` | Specifies expand/collapse state of children |
| `parentItem` | Reference to parent record object |
| `index` | Sequential index of current record |
| `level` | Hierarchy level (0 = root, 1 = first child, etc.) |
| `filterLevel` | Hierarchy level in filtered view |
| `parentIdMapping` | Parent ID value (auto-set from mapping) |
| `uniqueID` | Auto-generated unique identifier |
| `parentUniqueID` | Parent's unique ID |
| `checkboxState` | Checkbox selection state |
| `isSummaryRow` | Whether record is aggregate summary |
| `taskData` | Original data object reference |
| `primaryParent` | Reference to primary parent |

**Important:** Do not use these property names in your data arrays to avoid conflicts.
