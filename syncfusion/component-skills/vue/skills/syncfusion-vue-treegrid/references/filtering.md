# Filtering

Filtering allows you to view specific or related records based on filter criteria. To enable filtering in the TreeGrid, set the `allowFiltering` property to `true`. Filtering options can be configured through `filterSettings`.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Filter Types Comparison](#filter-types-comparison)
- [FilterBar](#filterbar)
- [Filter Menu](#filter-menu)
- [Excel like Filter](#excel-like-filter)
- [Filter Hierarchy Modes](#filter-hierarchy-modes)
- [Filter Operators](#filter-operators)
- [Initial Filter](#initial-filter)
- [Per-Column Filter Configuration](#per-column-filter-configuration)
- [Diacritics](#diacritics)
- [Filter Events](#filter-events)

## When to Use

Use filtering when you need to:
- **Allow users to find specific rows** - text search, value matching on single/multiple columns
- **Support complex queries** - multiple conditions with various operators (>, <, contains, startswith, etc.)
- **Provide different filter UI options** - filter bar for quick search, menu for operators, Excel-style for advanced
- **Enable hierarchical filtering** - control whether filtered results show parents, children, both, or neither
- **Implement advanced search** - multiple column conditions with AND/OR logic and initial filters
- **Save filter preferences** - persist user filters across sessions
- **Filter on remote server** - large dataset optimization with server-side filtering
- **Support hierarchical row relationships** - filter affects parent/child visibility based on hierarchy mode
- **Handle special characters** - diacritic-aware filtering with accent ignorance

## Mandatory Rules

Before implementing filtering:
- ✓ **Filter Module**: Must provide `Filter` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **Import Filter**: `import { Filter } from '@syncfusion/ej2-vue-treegrid'`
- ✓ **Provide Module**: `provide('treegrid', [Filter])` in script setup
- ✓ **allowFiltering Property**: Set `:allowFiltering="true"` on TreeGrid component
- ✓ **Column Field Matching**: Filter `field` properties must exactly match data object keys
- ✓ **Data Type**: Specify `type` property (string, number, date, boolean) for proper filter operator selection
- ✓ **Filter Type**: Set one of: 'FilterBar' (default), 'Menu', or 'Excel' in filterSettings.type
- ✓ **Hierarchy Mode**: Specify 'Parent' (default), 'Child', 'Both', or 'None' for hierarchical filtering behavior

## Filter Types Comparison

| Type | UI | When Best | Features |
|------|----|-----------| |
| **FilterBar** (Default) | Text input row below header | Quick inline search, text matching | Simple text entry, manual operators (=, !=, >, <, >=, <=, *, %), applies immediately |
| **Menu** | Dropdown with filter operators | Complex conditions with operators | Operator dropdown, multiple conditions per column, date/numeric specific operators |
| **Excel** | Rich dropdown with checkboxes | Advanced filtering, large datasets | Checkbox selection, sorting within filter, search within values, sub-menu for complex conditions |

## FilterBar

FilterBar is enabled by default when you set `:allowFiltering="true"`:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    childMapping="subtasks"
    :allowFiltering="true">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Filter } from '@syncfusion/ej2-vue-treegrid';
import { sampleData } from './datasource.js';

const data = sampleData;

// Provide Filter module
provide('treegrid', [Filter]);
</script>
```

**FilterBar Behavior:** Type in filter row below headers → Rows update automatically matching text



### FilterBar Expressions (Manual Operators)

Users can type expressions manually in filter row:

| Operator | Example | Meaning | Data Type |
|----------|---------|---------|----------|
| = | =100 | Equal to value | Number |
| != | !=100 | Not equal to value | Number |
| > | >100 | Greater than value | Number |
| < | <100 | Less than value | Number |
| >= | >=100 | Greater than or equal | Number |
| <= | <=100 | Less than or equal | Number |
| * | *task | Starts with (wildcard) | String |
| % | %task% | Contains (wildcard) | String |
| N/A | (exact match) | Equal - Always used for Date | Date |
| N/A | (exact match) | Equal - Always used for Boolean | Boolean |

**User Interaction:** Click filter row below header → Type value or expression → Tab to apply

## Filter Menu

Dropdown with filter operators and conditions:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowFiltering="true"
    :filterSettings="filterSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const data = sampleData;

const filterSettings = {
  type: 'Menu' // Enable Menu filter
};

provide('treegrid', [Filter]);
</script>
```

### Menu Filter Features

- Dropdown appears when clicking column header icon
- UI renders based on column data type (string, number, date, boolean)
- Operator selection from dropdown (startswith, contains, equal, etc.)
- Compare value input field
- AND/OR logic for combining multiple conditions
- Required: `allowFiltering` must be true

**User Interaction:** Click header dropdown → Select operator → Enter value → Click Apply

## Excel like Filter

Advanced filtering with checkboxes, sorting, and search:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowFiltering="true"
    :filterSettings="filterSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const data = sampleData;

const filterSettings = {
  type: 'Excel' // Enable Excel-like filter
};

provide('treegrid', [Filter]);
</script>
```

### Excel Filter Features

- Rich dropdown menu similar to Microsoft Excel
- **Checkboxes:** Select/deselect individual values to include/exclude
- **Search:** Search within filter values list
- **Sorting:** Sort values ascending/descending
- **Advanced:** Submenu for complex conditions with operators
- **Clear Filter:** Quick option to remove active filters
- Row count indicator showing filtered results

**User Interaction:** Click header filter icon → Check/uncheck values → OK to apply

## Filter Hierarchy Modes

Control how filtered results display in parent-child relationships:

### Parent Mode (Default)

Show matching rows + all their children (parent visible):

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowFiltering="true"
    :filterSettings="filterSettings">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=160></e-column>
    </e-columns>
  </ejs-treegrid>

  <div>
    <label>
      <input type="radio" v-model="hierarchyMode" value="Parent">
      Parent
    </label>
    <label>
      <input type="radio" v-model="hierarchyMode" value="Child">
      Child
    </label>
    <label>
      <input type="radio" v-model="hierarchyMode" value="Both">
      Both
    </label>
    <label>
      <input type="radio" v-model="hierarchyMode" value="None">
      None
    </label>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const data = sampleData;
const hierarchyMode = ref('Parent');

const filterSettings = computed(() => ({
  type: 'FilterBar',
  hierarchyMode: hierarchyMode.value
}));

const change = (mode) => {
  // Update filterSettings when hierarchy mode changes
  treegrid.value.ej2Instances.filterSettings.hierarchyMode = mode;
  treegrid.value.ej2Instances.clearFiltering();
};

provide('treegrid', [Filter]);
</script>
```

### Hierarchy Mode Behaviors

| Mode | Display Logic | Example |
|------|---------------|----------|
| **Parent** (Default) | Show matching rows + all their child rows. If no parent, show child only. | Filter taskName='Build' → Shows 'Build' task + all subtasks within it |
| **Child** | Show matching rows + all their parent/ancestor rows. If no parent, show row only. | Filter status='Complete' → Shows 'Complete' row + all parent tasks up to root |
| **Both** | Show matching rows + both parent and child relationships preserved. | Filter priority='High' → Shows 'High' row + parents + all descendants |
| **None** | Show only matching rows, no parent/child relationships. | Filter duration>10 → Shows only rows with duration>10, no hierarchy |

### Dynamic Hierarchy Mode Change

Programmatically change hierarchy mode:

```vue
<script setup>
const treegrid = ref(null);

const changeHierarchyMode = (mode) => {
  treegrid.value.ej2Instances.filterSettings.hierarchyMode = mode;
  treegrid.value.ej2Instances.clearFiltering();
};
</script>
```

## Filter Operators

Operators available depend on column data type. Set via `filterSettings.columns.operator` or menu selection:

### String Operators

| Operator | Description | FilterBar Expression |
|----------|-------------|----------------------|
| `startswith` | Begins with specified value | * (asterisk prefix) |
| `endswith` | Ends with specified value | % (percent suffix) |
| `contains` | Contains specified text | (no prefix/suffix) |
| `equal` | Exact match to value | = |
| `notequal` | Does not equal value | != |

### Numeric Operators

| Operator | Description | FilterBar Expression |
|----------|-------------|----------------------|
| `equal` | Equals specified number | = |
| `notequal` | Does not equal number | != |
| `greaterthan` | Greater than value | > |
| `lessthan` | Less than value | < |
| `greaterthanorequal` | Greater than or equal to | >= |
| `lessthanorequal` | Less than or equal to | <= |

### Date Operators

| Operator | Description | FilterBar Expression |
|----------|-------------|----------------------|
| `equal` | On specified date | = (only operator) |
| `greaterthan` | After specified date | (not supported in FilterBar) |
| `lessthan` | Before specified date | (not supported in FilterBar) |

### Boolean Operators

| Operator | Description |
|----------|-------------||
| `equal` | Only operator available |

### Default Operators

By default:
- **String columns:** `startswith`
- **Numeric columns:** `equal`
- **Date columns:** `equal`
- **Boolean columns:** `equal`

## Initial Filter 

Apply predefined filters when TreeGrid first loads:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowFiltering="true"
    :filterSettings="filterSettings">
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const data = sampleData;

const filterSettings = {
  columns: [
    {
      field: 'taskName',
      matchCase: false,
      operator: 'startswith',
      predicate: 'and',
      value: 'plan'
    },
    {
      field: 'duration',
      matchCase: false,
      operator: 'equal',
      predicate: 'and',
      value: 5
    }
  ]
};

provide('treegrid', [Filter]);
</script>
```

**Result:** Grid loads with taskName containing 'plan' AND duration equal to 5

## Per-Column Filter Configuration

Enable/disable filtering or change filter type per column:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :allowFiltering="true"
    :filterSettings="filterSettings">
    <e-columns>
      <!-- Disable filter for ID column -->
      <e-column field="taskID" headerText="Task ID" width=90 :allowFiltering="false" textAlign="Right"></e-column>
      
      <!-- Menu filter for Name (overrides default) -->
      <e-column field="taskName" headerText="Task Name" width=160 :filter="menuFilter"></e-column>
      
      <!-- Default FilterBar for Status -->
      <e-column field="status" headerText="Status" width=120></e-column>
      
      <!-- Excel filter for Priority (overrides default) -->
      <e-column field="priority" headerText="Priority" width=100 :filter="excelFilter"></e-column>
      
      <!-- Numeric column with type specified -->
      <e-column field="duration" headerText="Duration" type="number" width=80 textAlign="Right"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const data = sampleData;

// Default to Menu filter
const filterSettings = {
  type: 'Menu'
};

// Override specific columns
const menuFilter = { type: 'Menu' };
const excelFilter = { type: 'Excel' };

provide('treegrid', [Filter]);
</script>
```

### Column-Level Properties

- `:allowFiltering="false"` - Disable filter for column (header icon won't appear)
- `:filter="{ type: 'Excel' }"` - Override grid default filter type for this column only
- `type="string|number|date|boolean"` - Enables correct operators for that data type

## Diacritics 

By default, TreeGrid ignores diacritic characters (accents) while filtering. To include them:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="0"
    :allowFiltering="true"
    :filterSettings="filterSettings">
    <e-columns>
      <e-column field="empID" headerText="Employee ID" width=90 textAlign="Right"></e-column>
      <e-column field="name" headerText="Name" width=110>
        <!-- Search for 'aero' will match 'Aéronautique' -->
      </e-column>
      <e-column field="department" headerText="Department" width=90></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const data = diacriticsData;

const filterSettings = {
  ignoreAccent: true // Set to true to include diacritics in filter matching
};

provide('treegrid', [Filter]);
</script>
```

**ignoreAccent Behaviors:**
- `true` (default): 'aero' matches 'aero', 'àero', 'áero', etc.
- `false`: Only exact character match accepted

## Filter Events

Monitor filtering operations:

```vue
<template>
  <div>
    <p>Filter Status: {{ filterStatus }}</p>
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      :allowFiltering="true"
      @actionBegin="onActionBegin"
      @actionComplete="onActionComplete">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-treegrid';

const filterStatus = ref('Ready');
const data = sampleData;

const onActionBegin = (args) => {
  if (args.requestType === 'filtering') {
  }
};

const onActionComplete = (args) => {
  if (args.requestType === 'filtering') {
  }
};

provide('treegrid', [Filter]);
</script>
```

### Filter Events Details

| Event | requestType | When Fired | Purpose |
|-------|-------------|-----------|----------|
| `actionBegin` | 'filtering' | Before filter applied | Validate/modify filter criteria |
| `actionComplete` | 'filtering' | After filter applied | Update UI, count results |
| `actionBegin` | 'filtersearchbegin' | Search in Excel filter | Change default operator |

**Common args properties:**
- `args.columnName` - Column being filtered
- `args.operator` - Filter operator being used
- `args.value` - Filter value entered
- `args.data` - Filtered result set
