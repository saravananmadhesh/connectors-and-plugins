# State Persistence

## Table of Contents
- [Overview](#overview)
- [Enable Persistence](#enable-persistence)
- [Local Storage](#local-storage)
- [Programmatic Save/Load](#programmatic-saveload)
- [User Sessions](#user-sessions)

## Overview

State persistence automatically saves and restores the PivotView layout across user sessions. Users can refresh the browser or navigate away, then return to the same configuration. Property: [`enablePersistence`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotViewModel#enablepersistence)

**Saved State Includes:**
- Field axes configuration (rows, columns, values, filters)
- Field order
- Expand/collapse states
- Filter selections
- Sorted fields
- Calculated fields

## Enable Persistence

### Basic Persistence Setup
```vue
<template>
  <ejs-pivotview 
    :dataSourceSettings="dataSourceSettings" 
    :enablePersistence="enablePersistence"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const enablePersistence = true;  // Enable persistence to localStorage
const height = 350;
</script>
```

**Result:**
- Automatically saves to browser localStorage
- Default key: Component's ID in localStorage
- Restores on page reload automatically

## Local Storage

### How Local Storage Works

PivotView automatically manages localStorage when `enablePersistence: true`:

```vue
<script setup>
// Behind the scenes:
localStorage.setItem('ej2_PivotView_persist', {
  'layout': {
    'rows': [...],
    'columns': [...],
    'values': [...],
    'filters': [...]
  },
  'expandedMembers': [...],
  'selectedCells': [...]
});
</script>
```

### View Saved State
```vue
<script setup>
// Access persisted data programmatically
const savedState = localStorage.getItem('ej2_PivotView_persist');
console.log(JSON.parse(savedState));
</script>
```

### Clear Persisted Data
```vue
<script setup>
// Remove all persisted data
localStorage.removeItem('ej2_PivotView_persist');

// Clear entire localStorage
localStorage.clear();
</script>
```

## Programmatic Save/Load

### Manual Save to Local Storage
```vue
<template>
  <div id="app">
    <button @click="saveLayout">💾 Save Layout</button>
    <button @click="loadLayout">📂 Load Layout</button>
    <button @click="resetLayout">🔄 Reset</button>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :showFieldList="showFieldList"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { provide } from 'vue';

const pivot = ref(null);

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};

const showFieldList = true;
const height = 350;

// Save current configuration
const saveLayout = () => {
  const pivotObj = pivot.value.ej2_instances[0];
  const persistData = pivotObj.getPersistData();
  localStorage.setItem('myCustomLayout', persistData);
  alert('Layout saved!');
};

// Load saved configuration
const loadLayout = () => {
  const pivotObj = pivot.value.ej2_instances[0];
  const savedData = localStorage.getItem('myCustomLayout');
  if (savedData) {
    pivotObj.loadPersistData(savedData);
    alert('Layout restored!');
  } else {
    alert('No saved layout found');
  }
};

// Reset to default
const resetLayout = () => {
  localStorage.removeItem('myCustomLayout');
  window.location.reload();
};

provide('pivotview', [FieldList]);
</script>
```

### Get Persist Data
```vue
<script setup>
const pivotObj = pivot.value.ej2_instances[0];

// Get current state as JSON string
const currentState = pivotObj.getPersistData();

// Save with custom key
localStorage.setItem('pivotLayout_v2', currentState);

// Later: restore
const saved = localStorage.getItem('pivotLayout_v2');
pivotObj.loadPersistData(saved);
</script>
```

## User Sessions

### Save Multiple User Configurations
```vue
<template>
  <ejs-pivotview 
    ref="pivot"
    :dataSourceSettings="dataSourceSettings" 
    :enablePersistence="enablePersistence"
    :created="onCreated">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const pivot = ref(null);
const userId = 'user_123';  // From authentication

const dataSourceSettings = { /* ...config... */ };
const enablePersistence = true;

const onCreated = () => {
  // Use user-specific localStorage key
  const storageKey = `pivot_layout_${userId}`;
  
  // Load user's saved layout if exists
  const userLayout = localStorage.getItem(storageKey);
  if (userLayout) {
    pivot.value.ej2_instances[0].loadPersistData(userLayout);
  }
};

// Save on layout change
const saveUserLayout = () => {
  const storageKey = `pivot_layout_${userId}`;
  const currentLayout = pivot.value.ej2_instances[0].getPersistData();
  localStorage.setItem(storageKey, currentLayout);
};
</script>
```

### Session Management Pattern
```vue
<script setup>
// Per-user persistence pattern:
const storageKey = `pivot_${userId}_${reportId}`;

// Save different layouts per user/report
localStorage.setItem(storageKey, pivotLayout);

// Restore on login
const userLayout = localStorage.getItem(storageKey);
if (userLayout) {
  pivotView.loadPersistData(userLayout);
}
</script>
```

### Complete Persistence Example
```vue
<template>
  <div id="app">
    <div class="controls">
      <input v-model="layoutName" placeholder="Layout name..." />
      <button @click="saveAsNamed">Save As</button>
      
      <select @change="loadNamed">
        <option value="">Load Saved Layout...</option>
        <option v-for="name in savedLayouts" :key="name" :value="name">
          {{ name }}
        </option>
      </select>
      
      <button @click="deleteNamed">Delete</button>
    </div>
    
    <ejs-pivotview 
      ref="pivot"
      :dataSourceSettings="dataSourceSettings" 
      :showFieldList="showFieldList"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { provide } from 'vue';

const pivot = ref(null);
const layoutName = ref('');
const selectedLayout = ref('');

const dataSourceSettings = { /* ...config... */ };
const showFieldList = true;
const height = 350;

// Get list of saved layouts
const savedLayouts = computed(() => {
  const layouts = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('pivot_layout_')) {
      layouts.push(key.replace('pivot_layout_', ''));
    }
  }
  return layouts;
});

// Save layout with custom name
const saveAsNamed = () => {
  if (!layoutName.value.trim()) {
    alert('Enter layout name');
    return;
  }
  const pivotObj = pivot.value.ej2_instances[0];
  const persistData = pivotObj.getPersistData();
  localStorage.setItem(`pivot_layout_${layoutName.value}`, persistData);
  alert(`Layout "${layoutName.value}" saved!`);
};

// Load saved layout
const loadNamed = (event) => {
  const name = event.target.value;
  if (!name) return;
  
  selectedLayout.value = name;
  const pivotObj = pivot.value.ej2_instances[0];
  const savedData = localStorage.getItem(`pivot_layout_${name}`);
  if (savedData) {
    pivotObj.loadPersistData(savedData);
  }
};

// Delete saved layout
const deleteNamed = () => {
  if (!selectedLayout.value) {
    alert('Select layout to delete');
    return;
  }
  localStorage.removeItem(`pivot_layout_${selectedLayout.value}`);
  selectedLayout.value = '';
  alert('Layout deleted!');
};

provide('pivotview', [FieldList]);
</script>

<style scoped>
.controls {
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}

input, select, button {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
```

### Browser Storage Limits
- **LocalStorage Limit:** ~5-10MB per domain (browser dependent)
- **Typical Pivot State:** 5-50KB (varies with field count)
- **Recommendation:** Save important layouts to server backup

### Best Practices
1. **User-Specific Keys:** Include userId in storage key
2. **Version Tracking:** Track layout version for compatibility
3. **Server Backup:** Store critical layouts on server
4. **Clear Old Data:** Remove outdated layouts periodically
5. **Error Handling:** Check localStorage availability

