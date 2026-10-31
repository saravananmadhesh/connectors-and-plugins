# Advanced Features & API Reference

## Table of Contents

- [All Component Properties](#all-component-properties)
- [Property Examples](#property-examples)
- [Methods & Public APIs](#methods--public-apis)
- [Events & Event Arguments](#events--event-arguments)
- [Performance Optimization](#performance-optimization)
- [CSS Customization](#css-customization)

## All Component Properties

### Essential Properties

| Property | Type | Default | Description | Example |
|----------|------|---------|-------------|---------|
| `id` | string | - | Unique component identifier | `id="dropdowntree"` |
| `placeholder` | string | "" | Input placeholder text | `:placeholder="'Select item'"` |
| `enabled` | boolean | true | Enable/disable component | `:enabled="true"` |
| `width` | string \| number | "100%" | Component width | `:width="'300px'"` |

### Selection Properties

| Property | Type | Default | Description | Example |
|----------|------|---------|-------------|---------|
| `showCheckBox` | boolean | false | Show checkboxes for multi-select | `:showCheckBox="true"` |
| `showSelectAll` | boolean | false | Show Select All checkbox | `:showSelectAll="true"` |
| `selectAllText` | string | "Select All" | Select All label | `:selectAllText="'Check All'"` |
| `unSelectAllText` | string | "Unselect All" | Unselect All label | `:unSelectAllText="'Uncheck All'"` |
| `allowMultiSelection` | boolean | false | Enable Ctrl/Shift multi-select | `:allowMultiSelection="true"` |

### Template Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `itemTemplate` | String \| Slot | null | Custom item rendering |
| `valueTemplate` | String \| Slot | null | Custom selected value display |
| `headerTemplate` | String \| Slot | null | Custom header |
| `footerTemplate` | String \| Slot | null | Custom footer |
| `noRecordsTemplate` | String \| Slot | null | Empty state template |
| `actionFailureTemplate` | String \| Slot | null | Error state template |

### Filtering Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowFiltering` | boolean | false | Enable search/filter bar |
| `filterType` | "StartsWith" \| "EndsWith" \| "Contains" | "StartsWith" | Filter matching type |
| `filterBarPlaceholder` | string | "" | Filter bar placeholder |
| `ignoreCase` | boolean | true | Case-insensitive filtering |
| `ignoreAccent` | boolean | false | Ignore diacritics |

### Display Mode Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | "Default" \| "Delimiter" \| "Custom" | "Default" | Display mode for selections |
| `delimiterChar` | string | ", " | Delimiter for selected items |
| `customTemplate` | string | "${value.length} item(s) selected" | Custom template for selections |

### Localization & RTL Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `locale` | string | "en" | Culture/locale code |
| `enableRtl` | boolean | false | Enable right-to-left layout |
| `enablePersistence` | boolean | false | Persist state in localStorage |

### Data Binding Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fields` | Object | - | Data source and field mapping |
| `sortOrder` | "Ascending" \| "Descending" \| "None" | "None" | Item sorting order |

### Popup & Animation Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `popupHeight` | string \| number | "300px" | Dropdown popup height |
| `popupWidth` | string \| number | "100%" | Dropdown popup width |
| `destroyPopupOnHide` | boolean | true | Destroy popup on close |

### Styling Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | string | "" | Custom CSS classes |
| `htmlAttributes` | object | {} | HTML attributes |

## Property Examples

### Essential Properties Examples

**Basic Component Setup**
```vue
<template>
  <DropDownTreeComponent
    id="myDropdownTree"
    :placeholder="'Select an item'"
    :enabled="true"
    :width="'300px'"
    :fields="fields"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Selection Properties Examples

**Checkboxes with Select All**
```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :showCheckBox="true"
    :showSelectAll="true"
    :selectAllText="'Select All Items'"
    :unSelectAllText="'Unselect All'"
    :fields="fields"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Multi-Selection with Ctrl/Shift**
```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :allowMultiSelection="true"
    :fields="fields"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### Filtering Properties Examples

**Enable Filtering with Options**
```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :allowFiltering="true"
    :filterType="'Contains'"
    :filterBarPlaceholder="'Search...'"
    :ignoreCase="true"
    :ignoreAccent="false"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Methods & Public APIs

### getSelectedNodes()

Returns array of selected node values.

```vue
<template>
  <div>
    <DropDownTreeComponent
      ref="treeRef"
      :fields="fields"
      :showCheckBox="true"
    />
    <button @click="getSelected">Get Selected</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeRef = ref(null);

const getSelected = () => {
  const nodes = treeRef.value?.getSelectedNodes();
  console.log('Selected nodes:', nodes);
};
</script>
```

### getCheckedNodes()

Returns array of checked node values (for checkbox mode).

```vue
<script setup>
const getChecked = () => {
  const nodes = treeRef.value?.getCheckedNodes();
  console.log('Checked nodes:', nodes);
};
</script>
```

### setCheckedNodes(nodeIds)

Programmatically set checked nodes.

```vue
<script setup>
const setChecked = () => {
  treeRef.value?.setCheckedNodes(['1', '2', '3']);
};
</script>
```

### expandAll()

Expand all parent nodes.

```vue
<script setup>
const expandAll = () => {
  treeRef.value?.expandAll();
};
</script>
```

### collapseAll()

Collapse all parent nodes.

```vue
<script setup>
const collapseAll = () => {
  treeRef.value?.collapseAll();
};
</script>
```

### refresh()

Refresh component data.

```vue
<script setup>
const refresh = () => {
  treeRef.value?.refresh();
};
</script>
```

## Events & Event Arguments

### change Event

Fired when selection changes.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    @change="handleChange"
  />
</template>

<script setup>
const handleChange = (event) => {
  console.log('Selected values:', event.value);
  console.log('Text:', event.text);
  console.log('Item data:', event.itemData);
};
</script>
```

### select Event

Fired when an item is selected.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    @select="handleSelect"
  />
</template>

<script setup>
const handleSelect = (event) => {
  console.log('Selected item:', event.itemData);
  console.log('Action:', event.action); // 'select' or 'unselect'
};
</script>
```

### filtering Event

Fired during filter operation.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :allowFiltering="true"
    @filtering="handleFiltering"
  />
</template>

<script setup>
const handleFiltering = (event) => {
  console.log('Filter text:', event.text);
  console.log('Filtered data:', event.data);
};
</script>
```

### beforeOpen Event

Fired before popup opens.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    @beforeOpen="handleBeforeOpen"
  />
</template>

<script setup>
const handleBeforeOpen = (event) => {
  console.log('Popup opening');
  // event.cancel = true; // Prevent opening
};
</script>
```

### dataBound Event

Fired after data binding completes.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    @dataBound="handleDataBound"
  />
</template>

<script setup>
const handleDataBound = (event) => {
  console.log('Data bound successfully');
  console.log('Data source:', event.data);
};
</script>
```

### focus Event

Fired when component receives focus.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    @focus="handleFocus"
  />
</template>

<script setup>
const handleFocus = (event) => {
  console.log('Component focused');
};
</script>
```

### keyPress Event

Fired when a key is pressed.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    @keyPress="handleKeyPress"
  />
</template>

<script setup>
const handleKeyPress = (event) => {
  console.log('Key pressed:', event.keyCode);
};
</script>
```

## Performance Optimization

### 1. Lazy Loading for Large Datasets

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :treeSettings="{ loadOnDemand: true }"
  />
</template>

<script setup>
// Only loads root items initially
// Children loaded on expand
</script>
```

### 2. Virtual Scrolling

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :enableVirtualization="true"
    :popupHeight="'300px'"
  />
</template>

<script setup>
// Renders only visible items
// Improves performance with 1000+ items
</script>
```

### 3. hasChildren Optimization

```vue
<script setup>
const data = [
  { id: 1, name: 'Parent', hasChild: true },  // Prevents unnecessary child checks
  { id: 2, name: 'Leaf', hasChild: false }
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  hasChildren: 'hasChild'  // Helps component optimize rendering
};
</script>
```

## CSS Customization

### Custom CSS Classes

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    cssClass="custom-tree"
  />
</template>

<style scoped>
.custom-tree :deep(.e-list-item) {
  padding: 10px 15px;
  font-size: 14px;
}

.custom-tree :deep(.e-checkbox-wrapper) {
  margin-right: 10px;
}

.custom-tree :deep(.e-list-item:hover) {
  background-color: #f0f0f0;
}
</style>
```

### Theme Integration

```vue
<template>
  <DropDownTreeComponent :fields="fields" />
</template>

<script setup>
// Material theme (default)
import '@syncfusion/ej2-dropdowns/styles/material.css';

// Or Bootstrap theme
// import '@syncfusion/ej2-dropdowns/styles/bootstrap.css';

// Or Tailwind theme
// import '@syncfusion/ej2-dropdowns/styles/tailwind.css';

// Or Fluent theme
// import '@syncfusion/ej2-dropdowns/styles/fluent.css';
</script>
```

### Styling Selected Items

```vue
<style>
/* Customize selected items display */
.e-dropdowntree .e-dropdown-selected {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

/* Customize checked items */
.e-dropdowntree .e-check {
  accent-color: #1976d2;
}

/* Customize popup */
.e-dropdowntree .e-popup {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
```
