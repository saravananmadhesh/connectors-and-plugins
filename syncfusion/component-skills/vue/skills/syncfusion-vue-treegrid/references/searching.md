# Searching

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Search with Toolbar](#basic-search-with-toolbar)
- [Initial Search](#initial-search)
- [Search Operators](#search-operators)
- [Column-Specific Search](#column-specific-search)
- [Search Configuration](#search-configuration)
- [Search Methods](#search-methods)

## When to Use

Use search functionality when you need to:

| Use Case | Description | Example |
|----------|-------------|---------|
| **Quick Lookup** | Users find specific records rapidly | Search for task name "Planning" |
| **Filter Multiple Columns** | Search across multiple fields at once | Search "test" in taskName and assignee |
| **Specific Field Search** | Search only certain columns for precision | Search in taskName only |
| **Initial Filtering** | Load grid with pre-filtered results | Pre-search for completed tasks |
| **Keyword Matching** | Flexible search patterns (starts with, ends with, contains) | Find tasks starting with "Dev" |
| **Case-Insensitive** | User expects "planning" = "Planning" | Reduce user confusion |
| **Hierarchical Search** | Find matches in parent OR child rows | Find subtask in deep hierarchy |
| **Real-Time Results** | See results as user types | Live filtering while typing |

## Mandatory Rules

Before implementing search:
- ✓ **Toolbar 'Search' Item**: Include 'Search' in toolbar array for built-in search box
- ✓ **searchSettings**: Configure search behavior

## Basic Search with Toolbar

Default search box in toolbar searches all columns:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="['Search']"
    height="270px">
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Filter, Toolbar, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', startDate: '03/02/2024', duration: 5, subtasks: [] },
]);

// Users type in toolbar search box
// Grid searches all visible columns automatically

provide('treegrid', [Filter, Toolbar]);
</script>
```

### Search by External Button

Trigger search from custom button or input:

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <input 
        v-model="searchText" 
        type="text"
        placeholder="Enter search text"
        style="padding: 8px; width: 200px; border: 1px solid #ccc;">
      <button @click="performSearch" style="padding: 8px 16px; margin-left: 5px; background: #0070c0; color: white; border: none; cursor: pointer;">
        Search
      </button>
      <button @click="clearSearch" style="padding: 8px 16px; margin-left: 5px; background: #70ad47; color: white; border: none; cursor: pointer;">
        Clear
      </button>
    </div>

    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      childMapping="subtasks"
      :treeColumnIndex="1"
      height="220px">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Filter, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const searchText = ref('');
const data = ref([...]);

const performSearch = () => {
  gridInstance.value.search(searchText.value);
};

const clearSearch = () => {
  searchText.value = '';
  gridInstance.value.search('');
};

provide('treegrid', [Filter]);
</script>
```

**Method:** `treegrid.search(searchText)`

## Initial Search

Apply search criteria when TreeGrid loads:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="['Search']"
    :searchSettings="searchSettings"
    height="270px">
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Filter, Toolbar, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

const searchSettings = ref({
  fields: ['taskName'],      // Search only taskName column
  operator: 'contains',      // Match substring anywhere
  key: 'plan',               // Initial search text
  ignoreCase: true           // Case-insensitive match
});

// TreeGrid loads with search results visible
// Matches: "Planning", "plan", "PLAN" all highlighted

provide('treegrid', [Filter, Toolbar]);
</script>
```

## Search Operators

Configure how search matches text:

| Operator | Behavior | Example |
|----------|----------|---------|
| **contains** | Match substring anywhere (DEFAULT) | "Dev" matches "Development", "DevTest" |
| **startsWith** | Match at beginning of text | "Dev" matches "Development" NOT "ReDevision" |
| **endsWith** | Match at end of text | "ment" matches "Development" NOT "Mental" |
| **equal** | Exact match only | "Development" matches "Development" NOT "Development Plan" |
| **notEqual** | Exclude exact match | "Testing" matches all except "Testing" |

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    childMapping="subtasks"
    :treeColumnIndex="1"
    :toolbar="['Search']"
    :searchSettings="searchSettings">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width="160"></e-column>
      <e-column field="duration" headerText="Duration" width="80" textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide, ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, Filter, Toolbar, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([...]);

// Different operators for different use cases
const searchSettings = ref({
  fields: ['taskName'],
  operator: 'startsWith',    // Look at beginning only
  ignoreCase: true
});

provide('treegrid', [Filter, Toolbar]);
</script>
```

**Default Operator:** If not specified, 'contains' is used automatically.

## Column-Specific Search

Limit search to certain fields for precision:

```vue
const searchSettings = ref({
  fields: ['taskName', 'duration'],  // Search ONLY these columns
  ignoreCase: true
});
```

**Empty fields array:** Searches all visible columns (default behavior)

```javascript
const searchSettings = {
  fields: []  // This means search every column
};
```


## Search Configuration

Complete searchSettings object:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **fields** | string[] | Columns to search (empty = all) | `['taskName', 'assignee']` |
| **operator** | string | Match type: contains, startsWith, endsWith, equal, notEqual | `'contains'` |
| **key** | string | Initial search text | `'Development'` |
| **ignoreCase** | boolean | Case-insensitive matching | `true` |

```javascript
const searchSettings = {
  fields: ['taskName'],           // Search these columns
  operator: 'contains',           // How to match
  key: 'Development',             // What to search for
  ignoreCase: true                // Ignore case differences
};
```

## Search Methods

### search(key)
Search TreeGrid with given key:

```javascript
treegrid.value.search('Development');
```

### clearSearch()
Clear search results:

```javascript
treegrid.value.search('');  // Empty string = clear search
```
