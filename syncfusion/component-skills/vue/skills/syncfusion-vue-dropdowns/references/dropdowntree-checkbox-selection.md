# Checkbox & Multi-Selection

## Table of Contents

- [Basic Checkbox Support](#basic-checkbox-support)
- [Multi-Selection Workflow](#multi-selection-workflow)
- [Auto-Check Hierarchy](#auto-check-hierarchy)
- [Select All Feature](#select-all-feature)
- [Getting Selected Values](#getting-selected-values)
- [Clearing Selection](#clearing-selection)

## Basic Checkbox Support

Enable checkboxes for multi-selection by setting `:showCheckBox` property to true.

### Enable Checkboxes

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :showCheckBox="true"
    placeholder="Select multiple items"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
};
</script>
```

**What happens when enabled:**
- Checkbox appears before each item text
- Multiple items can be selected simultaneously
- Selected items remain checked even when popup closes
- Display shows selected items (or count if many)

### Example - Product Selection

```vue
<template>
  <DropDownTreeComponent
    id="productTree"
    :fields="fields"
    :showCheckBox="true"
    placeholder="Select products"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const products = [
  { id: '1', name: 'Electronics', expanded: true },
  { id: '2', name: 'Laptops', parentId: '1' },
  { id: '3', name: 'Desktops', parentId: '1' },
  { id: '4', name: 'Phones', parentId: '1' },
  { id: '5', name: 'Appliances' },
  { id: '6', name: 'Refrigerators', parentId: '5' },
];

const fields = {
  dataSource: products,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
};
</script>
```

## Multi-Selection Workflow

### User Interactions

1. **Click dropdown** → Opens tree with checkboxes
2. **Check items** → Click checkbox or item to select
3. **Expand/collapse** → Click arrow to show/hide children
4. **Multiple selections** → Check multiple items at different levels
5. **Close popup** → Selection persists and displays in input

### Display Behavior

**Single selection:** Shows the item text
```
Selected: "Laptops"
```

**Multiple selections:** Shows item count or comma-separated list
```
Selected: "Laptops, Desktops, Phones" 
// or
Selected: "+2 more.." (if many items)
```

### Access Selected Values with ref()

Use the `ref()` to access component instance and listen to `change` event:

```vue
<template>
  <div>
    <DropDownTreeComponent
      ref="dropdownTreeRef"
      :fields="fields"
      :showCheckBox="true"
      @change="handleChange"
      placeholder="Select items"
    />
    <button @click="logSelected">Get Selected</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const dropdownTreeRef = ref(null);
const selectedNodes = ref([]);

const handleChange = (event) => {
  // event.value contains the array of selected values
  selectedNodes.value = event.value || [];
  console.log('Selected:', selectedNodes.value);
};

const logSelected = () => {
  console.log('Selected:', selectedNodes.value);
};

// ... rest of component code
</script>
```

## Auto-Check Hierarchy

Enable hierarchical parent-child checkbox synchronization with `:autoCheck` property via treeSettings.

### Without Auto-Check (Default)

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    placeholder="Select items"
  />
</template>

<script setup>
// Parent and child checkboxes are independent
</script>
```

Parent and child checkboxes work independently:
- Checking parent does NOT check children
- Checking child does NOT affect parent
- User must manually manage relationships

### With Auto-Check

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    :treeSettings="treeSettings"
    placeholder="Select with hierarchy sync"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeSettings = {
  autoCheck: true,
};
</script>
```

**Auto-Check Rules:**

1. **Check parent → All children checked**
   ```
   ✓ Electronics
     ✓ Laptops
     ✓ Phones
     ✓ Tablets
   ```

2. **Uncheck parent → All children unchecked**
   ```
   ☐ Electronics
     ☐ Laptops
     ☐ Phones
     ☐ Tablets
   ```

3. **Some children checked → Parent shows intermediate state**
   ```
   ◐ Electronics (partially checked)
     ✓ Laptops (checked)
     ☐ Phones (unchecked)
     ✓ Tablets (checked)
   ```

4. **All children checked → Parent automatically checked**
   ```
   ✓ Electronics
     ✓ Laptops
     ✓ Phones
     ✓ Tablets
   ```

### Complete Example

```vue
<template>
  <div>
    <DropDownTreeComponent
      id="categoryTree"
      :fields="fields"
      :showCheckBox="true"
      :treeSettings="treeSettings"
      @change="handleChange"
      placeholder="Select categories"
    />
    <div v-if="checkedItems.length > 0">
      <h3>Selected Items:</h3>
      <ul>
        <li v-for="item in checkedItems" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const categoryData = [
  { id: '1', name: 'Electronics', expanded: true },
  { id: '2', name: 'Laptops', parentId: '1' },
  { id: '3', name: 'HP', parentId: '2' },
  { id: '4', name: 'Dell', parentId: '2' },
  { id: '5', name: 'Phones', parentId: '1' },
  { id: '6', name: 'iPhone', parentId: '5' },
  { id: '7', name: 'Samsung', parentId: '5' },
];

const checkedItems = ref([]);

const fields = {
  dataSource: categoryData,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
};

const treeSettings = {
  autoCheck: true,
};

const handleChange = (event) => {
  checkedItems.value = event.value || [];
};
</script>
```

## Select All Feature

Enable a Select All checkbox that controls all items in the tree.

### Basic Select All

```vue
<template>
  <DropDownTreeComponent
    id="selectAllTree"
    :fields="fields"
    :showCheckBox="true"
    :showSelectAll="true"
    placeholder="Select items with Select All"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'parentId',
};
</script>
```

### Custom Select All Labels

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    :showSelectAll="true"
    selectAllText="Check All Items"
    unSelectAllText="Uncheck All Items"
    placeholder="Select items"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Behavior:**
- When "Select All" is checked: All items become checked
- When "Select All" is unchecked: All items become unchecked
- If some items are manually checked: Select All shows intermediate state
- Labels are customizable for localization

### Select All with Auto-Check

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    :showSelectAll="true"
    :treeSettings="treeSettings"
    :selectAllText="selectAllText"
    @change="onSelectionChange"
    placeholder="Select items"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedCount = ref(0);
const selectAllText = ref('Select All Items');

const treeSettings = {
  autoCheck: true,
};

const onSelectionChange = (event) => {
  selectedCount.value = (event.value || []).length;
};
</script>
```

## Getting Selected Values

### Method 1: Using change Event (Recommended)

```vue
<template>
  <DropDownTreeComponent
    ref="treeRef"
    :fields="fields"
    :showCheckBox="true"
    @change="handleSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedValues = ref([]);

const handleSelectionChange = (event) => {
  selectedValues.value = event.value || [];
  console.log('Current selection:', selectedValues.value);
};
</script>
```

### Method 2: Using Component Reference

```vue
<template>
  <div>
    <DropDownTreeComponent
      ref="treeRef"
      :fields="fields"
      :showCheckBox="true"
    />
    <button @click="getSelectedNodes">Get Checked Nodes</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeRef = ref(null);

const getSelectedNodes = () => {
  const checkedNodes = treeRef.value?.getCheckedNodes();
  console.log('Checked nodes:', checkedNodes);
  return checkedNodes;
};
</script>
```

### Method 3: Combining Both Methods

```vue
<template>
  <div>
    <DropDownTreeComponent
      ref="treeRef"
      :fields="fields"
      :showCheckBox="true"
      @change="handleChange"
      placeholder="Select items"
    />
    <div v-if="selectedValues.length > 0">
      <h3>Selected Items: {{ selectedValues.length }}</h3>
      <button @click="programmaticallySet">Set Selection Programmatically</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeRef = ref(null);
const selectedValues = ref([]);

const handleChange = (event) => {
  selectedValues.value = event.value || [];
};

const programmaticallySet = () => {
  // Set checked nodes using component method
  if (treeRef.value) {
    treeRef.value.setCheckedNodes(['2', '4', '6']);
  }
};
</script>
```

## Clearing Selection

### Clear All Selections

```vue
<template>
  <div>
    <DropDownTreeComponent
      ref="treeRef"
      :fields="fields"
      :showCheckBox="true"
      @change="handleChange"
      placeholder="Select items"
    />
    <button @click="clearSelection">Clear All</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeRef = ref(null);

const clearSelection = () => {
  if (treeRef.value) {
    treeRef.value.setCheckedNodes([]); // Clear all checked items
  }
};
</script>
```

### Programmatic Selection Control

```vue
<template>
  <div>
    <DropDownTreeComponent
      ref="treeRef"
      :fields="fields"
      :showCheckBox="true"
    />
    <div>
      <button @click="selectParents">Select All Parents</button>
      <button @click="selectChildren">Select All Children</button>
      <button @click="toggleSelection">Toggle Selection</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeRef = ref(null);
const data = ref([
  { id: '1', name: 'Parent1', parentId: null },
  { id: '2', name: 'Child1', parentId: '1' },
  { id: '3', name: 'Parent2', parentId: null },
  { id: '4', name: 'Child2', parentId: '3' },
]);

const selectParents = () => {
  const parentIds = data.value
    .filter(item => item.parentId === null)
    .map(item => item.id);
  treeRef.value?.setCheckedNodes(parentIds);
};

const selectChildren = () => {
  const childIds = data.value
    .filter(item => item.parentId !== null)
    .map(item => item.id);
  treeRef.value?.setCheckedNodes(childIds);
};

const toggleSelection = () => {
  const current = treeRef.value?.getCheckedNodes() || [];
  const allIds = data.value.map(item => item.id);
  const newSelection = allIds.filter(id => !current.includes(id));
  treeRef.value?.setCheckedNodes(newSelection);
};
</script>
```
