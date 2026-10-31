# Tree Settings & Configuration

## Table of Contents

- [TreeSettings Overview](#treesettings-overview)
- [Auto Check Behavior](#auto-check-behavior)
- [Load On Demand (Lazy Loading)](#load-on-demand-lazy-loading)
- [Expand On Behavior](#expand-on-behavior)
- [Check Disabled Children](#check-disabled-children)
- [Complete Configuration Examples](#complete-configuration-examples)

## TreeSettings Overview

The `:treeSettings` property is an object that configures advanced tree behavior. It allows fine-tuning how the tree expands, collapses, checks items, and loads data.

### Basic TreeSettings Configuration

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :treeSettings="treeSettings"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeSettings = {
  autoCheck: true,           // Synchronize parent-child checkbox states
  loadOnDemand: false,       // Load all data upfront
  expandOn: 'Auto',          // Expand on double-click or tap
  checkDisabledChildren: false // Don't check disabled child nodes
};
</script>
```

## Auto Check Behavior

When `:autoCheck` is enabled in treeSettings, checking a parent automatically checks all children, and unchecking a parent unchecks all children. This creates hierarchical checkbox synchronization.

### Enable Auto Check

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :showCheckBox="true"
    :treeSettings="treeSettings"
    placeholder="Select with hierarchy sync"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeSettings = {
  autoCheck: true
};
</script>
```

### Auto Check States

The Dropdown Tree implements three checkbox states:

1. **Checked** - Parent is checked, all children are checked
2. **Unchecked** - Parent is unchecked, all children are unchecked
3. **Intermediate** - Parent has mixed state (some children checked, some unchecked)

### Complete Auto-Check Example

```vue
<template>
  <div>
    <DropDownTreeComponent
      id="dropdowntree"
      :fields="fields"
      :showCheckBox="true"
      :treeSettings="treeSettings"
      @select="handleSelect"
      placeholder="Select items"
    />
    <div v-if="selectedItem" style="margin-top: 15px; padding: 10px; background: #f5f5f5;">
      <strong>Selected:</strong> {{ selectedItem.name }}
      <span>Action: {{ selectedAction }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const selectedItem = ref(null);
const selectedAction = ref('');

const data = [
  { id: 1, name: 'Fruits', hasChild: true, expanded: true },
  { id: 2, pid: 1, name: 'Apple' },
  { id: 3, pid: 1, name: 'Orange' },
  { id: 4, pid: 1, name: 'Banana' },
  { id: 5, name: 'Vegetables', hasChild: true },
  { id: 6, pid: 5, name: 'Carrot' },
  { id: 7, pid: 5, name: 'Cucumber' },
];

const fields = {
  dataSource: data,
  value: 'id',
  text: 'name',
  parentValue: 'pid',
  hasChildren: 'hasChild'
};

const treeSettings = {
  autoCheck: true
};

const handleSelect = (args) => {
  selectedItem.value = args.itemData;
  selectedAction.value = args.action;
};
</script>
```

### Auto Check Workflow

1. User checks parent "Fruits" → All children (Apple, Orange, Banana) automatically checked
2. User unchecks child "Apple" → Parent "Fruits" becomes intermediate state
3. User checks "Apple" again → Parent "Fruits" returns to fully checked
4. All children checked → Parent automatically becomes checked

### Disable Auto Check for Specific Nodes

To prevent auto-check on specific nodes, use the `selectable` field:

```vue
<script setup>
const data = [
  { id: 1, name: 'Fruits', hasChild: true, expanded: true },
  { id: 2, pid: 1, name: 'Apple' },
  { id: 3, pid: 1, name: 'Orange', selectable: false }, // Cannot be checked
];
</script>
```

## Load On Demand (Lazy Loading)

Load on demand improves performance by loading only parent nodes initially and fetching child nodes when the parent is expanded.

### Enable Load On Demand

```vue
<template>
  <DropDownTreeComponent
    id="dropdowntree"
    :fields="fields"
    :treeSettings="treeSettings"
    placeholder="Data loads as you expand"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeSettings = {
  loadOnDemand: true
};
</script>
```

### How Lazy Loading Works

1. **Initial load**: Only root-level items displayed
2. **User expands a parent**: Child items fetched from data source
3. **Child level expanded**: Next-level children fetched (if applicable)
4. **Repeated**: Process continues for deeper hierarchy levels

### Performance Considerations

- **Reduce initial payload**: Only first-level items loaded
- **Faster initial render**: Component displays quicker
- **Network requests**: Additional requests made when expanding nodes
- **Caching**: Expanded nodes cached, no re-fetch on re-expand
- **Best for**: 1000+ items, deeply nested hierarchies, remote data

## Expand On Behavior

The `:expandOn` property controls which user action triggers expand/collapse of parent nodes.

### ExpandOn: Auto (Default)

Expands on any click or double-click depending on device type.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :treeSettings="{ expandOn: 'Auto' }"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### ExpandOn: Click

Expands/collapses on single click (requires careful UI positioning).

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :treeSettings="{ expandOn: 'Click' }"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### ExpandOn: DblClick

Expands/collapses on double-click only. Prevents accidental expansion.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :treeSettings="{ expandOn: 'DblClick' }"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

### ExpandOn: None

No automatic expansion. Manual expansion only via expand/collapse arrows.

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :treeSettings="{ expandOn: 'None' }"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

## Check Disabled Children

Controls whether disabled child nodes are checked when their parent is checked.

### Disabled Children NOT Checked

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    :treeSettings="{ checkDisabledChildren: false }"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const data = [
  { id: 1, name: 'Parent', hasChild: true },
  { id: 2, pid: 1, name: 'Active Child' },
  { id: 3, pid: 1, name: 'Disabled Child', selectable: false },
];
</script>
```

When parent is checked, only active children are checked. Disabled children remain unchecked.

### Disabled Children ARE Checked

```vue
<template>
  <DropDownTreeComponent
    :fields="fields"
    :showCheckBox="true"
    :treeSettings="{ checkDisabledChildren: true }"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';
</script>
```

When parent is checked, all children (including disabled ones) are checked.

## Complete Configuration Examples

### Example 1: Basic Multi-Select with Auto-Check

```vue
<template>
  <DropDownTreeComponent
    id="basicTree"
    :fields="fields"
    :showCheckBox="true"
    :treeSettings="treeSettings"
    placeholder="Select items"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeSettings = {
  autoCheck: true,
  expandOn: 'Auto',
  checkDisabledChildren: false
};
</script>
```

### Example 2: Large Data with Lazy Loading

```vue
<template>
  <DropDownTreeComponent
    id="lazyTree"
    :fields="fields"
    :treeSettings="treeSettings"
    placeholder="Expand to load children"
  />
</template>

<script setup>
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const dataManager = new DataManager({
  url: 'https://api.example.com/employees',
  adaptor: new ODataV4Adaptor()
});

const fields = {
  dataSource: dataManager,
  value: 'EmployeeID',
  text: 'FirstName',
  hasChildren: 'EmployeeID',
  child: {
    dataSource: new DataManager({
      url: 'https://api.example.com/orders',
      adaptor: new ODataV4Adaptor()
    }),
    value: 'OrderID',
    parentValue: 'EmployeeID',
    text: 'ShipName'
  }
};

const treeSettings = {
  loadOnDemand: true,
  expandOn: 'Click'
};
</script>
```

### Example 3: Read-Only Navigation

```vue
<template>
  <DropDownTreeComponent
    id="readOnlyTree"
    :fields="fields"
    :treeSettings="treeSettings"
    placeholder="Navigate only"
  />
</template>

<script setup>
import { DropDownTreeComponent } from '@syncfusion/ej2-vue-dropdowns';

const treeSettings = {
  expandOn: 'DblClick',
  loadOnDemand: false,
  autoCheck: false
};
</script>
```
