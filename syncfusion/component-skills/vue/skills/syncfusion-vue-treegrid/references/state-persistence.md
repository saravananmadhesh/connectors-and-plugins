# State Persistence

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Enable State Persistence](#enable-state-persistence)
- [Persisted State Properties](#persisted-state-properties)
- [Get Set State from localStorage](#get-set-state-from-localstorage)

## When to Use

Use state persistence when you need to:
- **Remember user preferences** - Sort, filter, layout choices
- **Session continuity** - Return to same view after refresh
- **Bookmarkable states** - Share grid state via URL
- **Multi-tab scenarios** - Restore specific view in new tab
- **Workflow continuity** - Resume long operations
- **Save-as-you-go** - Auto-save user configuration
- **Audit trail** - Track what users were viewing
- **Collaborative context** - Share view with team

## Mandatory Rules

Before implementing state persistence:
- ✓ **enablePersistence**: Set `:enablePersistence="true"` on TreeGrid
- ✓ **id Property**: TreeGrid MUST have unique `:id` attribute (stored as key prefix)
- ✓ **Storage Key Format**: Stored as `treegrid<id>` in localStorage (e.g., "treegridMyGrid")
- ✓ **localStorage API**: Use `window.localStorage.getItem()` and `setItem()`
- ✓ **Clear State**: Provide option to reset using localStorage.removeItem()

## Enable State Persistence

State persistence stores TreeGrid's model object in browser's localStorage automatically:

```vue
<template>
  <div>
    <button @click="clearState">Reset Grid State</button>

    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1"
      childMapping="subtasks"
      :enablePersistence="true"
      id="taskGrid"
      :allowSorting="true"
      :allowFiltering="true">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', priority: 'High', subtasks: [] },
  { taskID: 2, taskName: 'Development', priority: 'Medium', subtasks: [] }
]);

const clearState = () => {
  // Storage key format: treegrid<id> (e.g., "treegridtaskGrid")
  localStorage.removeItem('treegridtaskGrid');
  window.location.reload();
};

provide('treegrid', []);
</script>
```

**Storage Key Format:**
- TreeGrid with `id="taskGrid"` → stored as `"treegridtaskGrid"` in localStorage
- TreeGrid with `id="myTreeGrid"` → stored as `"treegridmyTreeGrid"` in localStorage
- Key pattern: `treegrid` + `<id>` (component name + id)

## Persisted State Properties

When `enablePersistence="true"`, TreeGrid stores its complete model object:

```vue
<template>
  <ejs-treegrid 
    ref="gridInstance"
    :dataSource="data" 
    :treeColumnIndex="1"
    :enablePersistence="true"
    id="dataGrid"
    :allowSorting="true"
    :allowFiltering="true"
    :enableColumnMenu="true"
    :allowResizing="true">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';

const gridInstance = ref(null);
const data = ref([...]);

// Persisted state automatically includes:
// ✓ Sort columns and direction
// ✓ Filter settings and values
// ✓ Column widths (after resize)
// ✓ Column order (after reorder)
// ✓ Frozen columns
// ✓ Page number (if paging enabled)
// ✓ Column visibility
// ✓ Grouping

provide('treegrid', []);
</script>
```

**Storage Location:** `localStorage["treegrid<id>"]` contains complete model as JSON string

**Example Stored Data:**
```javascript
{
  sortSettings: [{ field: 'priority', direction: 'Ascending' }],
  filterSettings: [{ field: 'status', operator: 'equal', value: 'Open' }],
  columns: [{ field: 'taskID', width: 100 }, ...],
  pageSettings: { pageSize: 10, currentPage: 2 },
  scrollSettings: { horizontalOffset: 0, verticalOffset: 0 }
}
```

## Get Set State from localStorage

Access and modify persisted state using window.localStorage:

```vue
<template>
  <div>
    <button @click="saveState">Save State Manually</button>
    <button @click="loadState">Load State from Storage</button>
    <button @click="clearState">Clear State</button>
    <p>{{ statusMessage }}</p>

    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data" 
      :treeColumnIndex="1"
      :enablePersistence="true"
      id="myGrid"
      :allowSorting="true"
      :allowFiltering="true">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';

const gridInstance = ref(null);
const data = ref([...]);
const statusMessage = ref('');

// Get current model from localStorage
const getStoredModel = () => {
  // Storage key: treegrid + <id> (lowercase)
  const storageKey = 'treegridmyGrid';  // treegrid + "myGrid"
  const storedValue = window.localStorage.getItem(storageKey);
  return storedValue ? JSON.parse(storedValue) : null;
};

// Set model to localStorage
const setStoredModel = (model) => {
  const storageKey = 'treegridmyGrid';
  window.localStorage.setItem(storageKey, JSON.stringify(model));
};

const saveState = () => {
  try {
    const currentModel = getStoredModel();
    if (currentModel) {
      setStoredModel(currentModel);
      statusMessage.value = 'State saved to localStorage';
    }
  } catch (error) {
    statusMessage.value = 'Error saving state: ' + error.message;
  }
};

const loadState = () => {
  try {
    const model = getStoredModel();
    if (model) {
      statusMessage.value = 'State loaded from storage';
      console.log('Retrieved model:', model);
    } else {
      statusMessage.value = 'No saved state found';
    }
  } catch (error) {
    statusMessage.value = 'Error loading state: ' + error.message;
  }
};

const clearState = () => {
  const storageKey = 'treegridmyGrid';
  window.localStorage.removeItem(storageKey);
  statusMessage.value = 'State cleared from storage';
};

provide('treegrid', []);
</script>
```

**Storage Key Pattern:**
- Component name: `treegrid` (fixed prefix)
- Grid ID: Must match `:id` attribute exactly (case-sensitive)
- Example: `id="myGrid"` → key is `"treegridmyGrid"`
- Example: `id="TaskGrid"` → key is `"treegridTaskGrid"`

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.