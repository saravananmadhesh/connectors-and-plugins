# Multi-Selection & Filtering

## Table of Contents

- [Multi-Selection with Ctrl/Shift Keys](#multi-selection-with-ctrlshift-keys)
- [Display Modes](#display-modes)
- [Enabling Filtering](#enabling-filtering)
- [Filter Types](#filter-types)
- [Filter Configuration Options](#filter-configuration-options)
- [Custom Filtering](#custom-filtering)

## Multi-Selection with Ctrl/Shift Keys

The Dropdown Tree supports multi-selection using keyboard modifiers without requiring checkboxes. This is distinct from checkbox-based selection and allows users to select multiple items by:
- **Ctrl+Click** to toggle individual selections
- **Shift+Click** to select a range of items

### Enable Multi-Selection

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowMultiSelection="true"
    placeholder="Select multiple items with Ctrl/Shift"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const data = [
  { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
  { id: 2, pid: 1, name: 'Hot Singles' },
  { id: 3, pid: 1, name: 'Rising Artists' },
  { id: 4, pid: 1, name: 'Live Music' },
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'pid',
  hasChildren: 'hasChild'
};
</script>
```

**Key Differences from Checkboxes:**
- No visible checkboxes
- Selection via Ctrl/Shift keys only
- More subtle UI, suitable for minimal interfaces
- Cannot show all selections in input (limited to mode setting)

## Display Modes

The `:mode` property controls how selected items are displayed in the input field. Combined with `:allowMultiSelection` or `:showCheckBox`, it provides different visual representations.

### Mode: Default

Shows all selected item values separated by a delimiter character (default: comma and space).

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowMultiSelection="true"
    mode="Default"
    :delimiterChar="', '"
    placeholder="Select multiple items"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Display Example:** `"Hot Singles, Rising Artists, Live Music"`

### Mode: Delimiter

Displays selected items with a custom delimiter. Similar to Default but emphasizes custom formatting.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :showCheckBox="true"
    mode="Delimiter"
    :delimiterChar="' | '"
    placeholder="Select items"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Display Example:** `"Hot Singles | Rising Artists | Live Music"`

### Mode: Custom

Displays a custom template instead of showing all selected values. Useful for space-constrained UIs or custom display logic.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :showCheckBox="true"
    mode="Custom"
    customTemplate="${value.length} item(s) selected"
    placeholder="Select items"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Display Example:** `"3 item(s) selected"`

### Custom Template Syntax

The `:customTemplate` property supports variable interpolation:

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    mode="Custom"
    :customTemplate="customTemplate"
  />
</template>

<script setup>
import { computed } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

// Template with count
const customTemplate = '${value.length} item(s) selected';

// Or use function format
const customTemplateFunc = (value) => {
  return value.length > 3 
    ? `${value.length} items selected` 
    : value.join(', ');
};
</script>
```

## Enabling Filtering

The filter feature allows users to search through tree items as they type. Enable it with the `:allowFiltering` property.

### Basic Filtering

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    filterBarPlaceholder="Search items..."
    placeholder="Select an item"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Result:**
- Filter bar appears above the tree items
- User types to search
- Items matching the filter remain visible
- Non-matching items are hidden

### Filtering with Custom Placeholder

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    filterBarPlaceholder="Type to find..."
    placeholder="Select from dropdown"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Filter Types

The `:filterType` property determines the matching strategy for search queries.

### StartsWith (Default)

Matches items that start with the search text.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    :filterType="'StartsWith'"
    placeholder="Search by starting text"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Example:**
- Search: "Hot" → Matches: "Hot Singles"
- Search: "Singles" → No match

### EndsWith

Matches items that end with the search text.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    :filterType="'EndsWith'"
    placeholder="Search by ending text"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Example:**
- Search: "Singles" → Matches: "Hot Singles"
- Search: "Hot" → No match

### Contains

Matches items containing the search text anywhere in the item.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    :filterType="'Contains'"
    placeholder="Search anywhere in item"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Example:**
- Search: "ing" → Matches: "Rising Artists", "Live Music", "Hot Singles"
- Search: "Live" → Matches: "Live Music"

## Filter Configuration Options

### Case-Sensitive Filtering

By default, filtering is case-insensitive. Enable case sensitivity with `:ignoreCase="false"`.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    :ignoreCase="false"
    :filterType="'Contains'"
    placeholder="Case-sensitive search"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

**Example:**
- Search: "hot" → No match (requires "Hot")
- Search: "Hot" → Matches: "Hot Singles"

### Ignore Diacritics/Accents

By default, diacritics are considered. Set `:ignoreAccent="true"` to ignore them.

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :allowFiltering="true"
    :ignoreAccent="true"
    placeholder="Ignore accents"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const data = [
  { id: 1, name: 'Café' },
  { id: 2, name: 'Naïve' },
  { id: 3, name: 'Résumé' },
];
</script>
```

**Example:**
- Search: "cafe" → Matches: "Café"
- Search: "naive" → Matches: "Naïve"

## Complete Filtering Example

```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <label style="display: block; margin-bottom: 5px;">Filter Type:</label>
      <select v-model="currentFilterType" style="padding: 5px;">
        <option value="StartsWith">Starts With</option>
        <option value="EndsWith">Ends With</option>
        <option value="Contains">Contains</option>
      </select>
    </div>

    <DropDownTreeComponent
      id="dropdowntree"
      :fields="fields"
      :allowFiltering="true"
      :filterType="currentFilterType"
      :ignoreCase="ignoreCase"
      :ignoreAccent="ignoreAccent"
      :showCheckBox="true"
      @filtering="handleFiltering"
      placeholder="Search and select items"
    />

    <div style="margin-top: 20px;">
      <label>
        <input v-model="ignoreCase" type="checkbox" />
        Ignore Case
      </label>
      <label style="margin-left: 15px;">
        <input v-model="ignoreAccent" type="checkbox" />
        Ignore Accents
      </label>
    </div>

    <div v-if="filterInfo" style="margin-top: 15px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
      <strong>Last Filter:</strong> {{ filterInfo }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const currentFilterType = ref('StartsWith');
const ignoreCase = ref(true);
const ignoreAccent = ref(false);
const filterInfo = ref('');

const data = [
  { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
  { id: 2, pid: 1, name: 'Hot Singles' },
  { id: 3, pid: 1, name: 'Rising Artists' },
  { id: 4, pid: 1, name: 'Live Music' },
  { id: 5, pid: 1, name: 'Café Music' },
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'pid',
  hasChildren: 'hasChild'
};

const handleFiltering = (event) => {
  filterInfo.value = `Searched: "${event.text}" (${currentFilterType.value})`;
};
</script>
```

## Custom Filtering

Implement custom filtering logic by handling the `@filtering` event:

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :allowFiltering="true"
    @filtering="handleCustomFilter"
    placeholder="Custom filter applied"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const data = [
  { id: 1, name: 'Item 1', category: 'A' },
  { id: 2, name: 'Item 2', category: 'B' },
  { id: 3, name: 'Item 3', category: 'A' },
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
};

const handleCustomFilter = (event) => {
  // Custom filter logic
  const searchText = event.text.toLowerCase();
  
  // Filter items based on custom logic
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchText) ||
    item.category.toLowerCase().includes(searchText)
  );
  
  console.log('Filtered results:', filteredData);
};
</script>
```
