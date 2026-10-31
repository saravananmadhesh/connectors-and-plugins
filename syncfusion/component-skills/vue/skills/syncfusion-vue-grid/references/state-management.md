# State Management

## Table of Contents
- [When to Use](#when-to-use)
- [Grid State](#grid-state)
- [Save State](#save-state)
- [Restore State](#restore-state)
- [Local Storage Persistence](#local-storage-persistence)
- [Immutable Mode](#immutable-mode)

## When to Use

Use this reference when you need to:
- Save and restore grid state (sorting, filtering, grouping)
- Persist grid settings to local storage
- Implement state persistence across sessions
- Use immutable mode for performance
- Reset grid state
- Programmatically manage grid state

## Grid State

Grid state includes sorting, filtering, grouping, selection, paging, and column settings.

### Get Grid State
```javascript
// Get current grid state
const gridState = gridInstance.getPersistData();
console.log(gridState);
```

## Save State

### Manual Save
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.
```vue
<template>
  <div>
    <button @click="saveGridState" class="btn btn-primary">Save State</button>
    <ejs-grid ref="gridRef" :dataSource="data">
      <!-- columns -->
    </ejs-grid>
  </div>
</template>

<script setup>
const saveGridState = () => {
  const state = gridRef.value.ej2Instances.getPersistData();
  localStorage.setItem('gridState', JSON.stringify(state));
};
</script>
```

## Restore State

### Manual Restore
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.
```vue
<script setup>
const restoreGridState = () => {
  const savedState = localStorage.getItem('gridState');
  if (savedState) {
    gridRef.value.ej2Instances.seterPersist(JSON.parse(savedState));
  }
};

onMounted(() => {
  restoreGridState();
});
</script>
```

## Local Storage Persistence

### Auto-save State with enablePersistence
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enablePersistence="true"
    persistID="gridSettings">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
      <e-column field="Freight" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
// enablePersistence automatically saves/restores grid state
// State is stored in localStorage with key: persistID_gridstate
// Available automatically on page reload
</script>
```

**State Persisted Properties:**
- Sorting configuration
- Filtering settings
- Grouping columns
- Column order and width
- Column visibility
- Paging state
- Selection state
- Row height

### Get Persist Data
```javascript
// Get all grid state data
const gridState = gridInstance.getPersistData();
console.log(gridState);
// Returns: {sorting, filtering, grouping, columns, paging, etc.}
```

### Add Custom Persist Data

Use `addOnPersist` to include custom properties in state:

```javascript
// Add custom data to persistence
gridInstance.addOnPersist(['customProperty1', 'customProperty2']);

// Custom properties will be persisted along with grid state
```

### Prevent Column from Persisting
```javascript
// Use dataBound event to prevent specific columns from persisting
const handleDataBound = () => {
  // Modify column visibility after persistence restored
  const column = gridInstance.getColumnByField('SensitiveData');
  if (column) {
    column.visible = false;
  }
};
```

### Clear Persisted State
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.
```javascript
// Remove saved state from localStorage
localStorage.removeItem('gridSettings_gridstate');

// Or reload grid without persisted state
gridInstance.seterPersist({});  // Clear persistence
```

## Immutable Mode

### Enable Immutable Mode
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableImmutableMode="true">
    <e-columns>
      <e-column field="OrderID" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

### Benefits of Immutable Mode
- Improves performance with large datasets
- Maintains data immutability
- Better change detection
- Faster rendering updates

### Immutable Mode with Batch Edit
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :enableImmutableMode="true"
    :editSettings="editSettings"
    :toolbar="toolbar">
    <e-columns>
      <e-column field="OrderID" :isPrimaryKey="true" width="100"></e-column>
      <e-column field="CustomerID" width="120"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const editSettings = {
  mode: 'Batch',
  allowEditing: true,
  allowAdding: true,
  allowDeleting: true
};

const toolbar = ['Add', 'Delete', 'Update', 'Cancel'];
</script>
```

## Practical Example
> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```vue
<template>
  <div>
    <div class="button-group">
      <button @click="saveGridState" class="btn btn-success">Save</button>
      <button @click="loadGridState" class="btn btn-info">Load</button>
      <button @click="resetGridState" class="btn btn-warning">Reset</button>
    </div>
    <ejs-grid 
      ref="gridRef"
      :dataSource="data"
      :enablePersistence="true"
      :enableImmutableMode="true"
      :allowSorting="true"
      :allowFiltering="true"
      :allowGrouping="true"
      :allowPaging="true">
      <e-columns>
        <e-column field="OrderID" width="100"></e-column>
        <e-column field="CustomerID" width="120"></e-column>
        <e-column field="Freight" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const gridRef = ref(null);

const saveGridState = () => {
  const state = gridRef.value.ej2Instances.getPersistData();
  localStorage.setItem('gridState', JSON.stringify(state));
  alert('Grid state saved');
};

const loadGridState = () => {
  const savedState = localStorage.getItem('gridState');
  if (savedState) {
    gridRef.value.ej2Instances.setPersistData(JSON.parse(savedState));
    alert('Grid state restored');
  }
};

const resetGridState = () => {
  localStorage.removeItem('gridState');
  location.reload();
};

onMounted(() => {
  // Auto-restore on mount
  const savedState = localStorage.getItem('gridState');
  if (savedState) {
    gridRef.value.ej2Instances.setPersistData(JSON.parse(savedState));
  }
});
</script>
```
