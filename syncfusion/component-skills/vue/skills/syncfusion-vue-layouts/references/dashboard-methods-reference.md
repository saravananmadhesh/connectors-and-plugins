# Dashboard Layout Methods Reference (Vue 3)

## Table of Contents
- [Panel Management Methods](#panel-management-methods)
- [Positioning Methods](#positioning-methods)
- [Layout Methods](#layout-methods)
- [Utility Methods](#utility-methods)
- [Complete API Table](#complete-api-table)

## Panel Management Methods

### addPanel(panel)

Adds a new panel to the dashboard.

```vue
<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const addNewPanel = () => {
  dashboardRef.value?.addPanel({
    id: `panel-${Date.now()}`,
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'New Panel',
    content: 'Newly added panel'
  });
};
</script>

<template>
  <div>
    <button @click="addNewPanel">Add Panel</button>
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
  </div>
</template>
```

### removePanel(id)

Removes a panel by ID.

```vue
<script setup>
const removePanelById = (id) => {
  dashboardRef.value?.removePanel(id);
};
</script>
```

### removeAll()

Removes all panels from the dashboard.

```vue
<script setup>
const clearDashboard = () => {
  dashboardRef.value?.removeAll();
};
</script>
```

### updatePanel(panel)

Updates an existing panel's properties.

```vue
<script setup>
const updatePanelContent = (id, newContent) => {
  dashboardRef.value?.updatePanel({
    id,
    content: newContent
  });
};

const updatePanelHeader = (id, newHeader) => {
  dashboardRef.value?.updatePanel({
    id,
    header: newHeader
  });
};
</script>
```

## Positioning Methods

### movePanel(id, row, col)

Moves a panel to a specific cell position.

```vue
<script setup>
const moveToTopLeft = (panelId) => {
  dashboardRef.value?.movePanel(panelId, 0, 0);
};

const moveToSpecific = (panelId, row, col) => {
  dashboardRef.value?.movePanel(panelId, row, col);
};
</script>
```

### resizePanel(id, sizeX, sizeY)

Resizes a panel to specific dimensions in cells.

```vue
<script setup>
const expandPanel = (panelId) => {
  dashboardRef.value?.resizePanel(panelId, 4, 2);
};

const shrinkPanel = (panelId) => {
  dashboardRef.value?.resizePanel(panelId, 1, 1);
};
</script>
```

## Layout Methods

### serialize()

Returns the current layout as an array of `PanelModel` objects.

```vue
<script setup>
const exportLayout = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) {
    const json = JSON.stringify(layout, null, 2);
    console.log(json);
    return layout;
  }
  return null;
};
</script>
```

**Output example:**

```json
[
  { "id": "p1", "row": 0, "col": 0, "sizeX": 2, "sizeY": 2 },
  { "id": "p2", "row": 0, "col": 2, "sizeX": 2, "sizeY": 1 }
]
```

### refreshDraggableHandle()

Refreshes the draggable handle configuration. Useful when dynamically changing the `draggableHandle` selector.

```vue
<script setup>
import { ref } from 'vue';

const handle = ref('.e-panel-header');
const dashboardRef = ref(null);

const changeHandle = () => {
  handle.value = '.custom-drag-handle';
  // Component won't pick up the new handle until refresh is called
  dashboardRef.value?.refreshDraggableHandle();
};
</script>

<template>
  <div>
    <button @click="changeHandle">Change Handle</button>
    <DashboardLayoutComponent
      ref="dashboardRef"
      :draggableHandle="handle"
      :panels="panels"
    />
  </div>
</template>
```

### destroy()

Destroys the component and cleans up event listeners. The component cannot be used after destroy.

```vue
<script setup>
const destroyDashboard = () => {
  dashboardRef.value?.destroy();
  // Component is now unusable
};
</script>
```

## Utility Methods

### Get Panel State

While there's no direct `getPanel(id)` method, use `serialize()` and filter:

```vue
<script setup>
const getPanel = (id) => {
  const layout = dashboardRef.value?.serialize() || [];
  return layout.find(p => p.id === id);
};

const getPanelContent = (id) => {
  const panel = getPanel(id);
  return panel?.content;
};
</script>
```

### Check Panel Exists

```vue
<script setup>
const hasPanel = (id) => {
  const layout = dashboardRef.value?.serialize() || [];
  return layout.some(p => p.id === id);
};
</script>
```

### Count Panels

```vue
<script setup>
const panelCount = computed(() => {
  return (dashboardRef.value?.serialize() || []).length;
});
</script>
```

## Complete API Table

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `addPanel(panel)` | `PanelModel` | void | Add a new panel |
| `removePanel(id)` | `string` | void | Remove panel by ID |
| `removeAll()` | - | void | Remove all panels |
| `updatePanel(panel)` | `PanelModel` | void | Update panel properties |
| `movePanel(id, row, col)` | `string, number, number` | void | Move panel to position |
| `resizePanel(id, sizeX, sizeY)` | `string, number, number` | void | Resize panel |
| `serialize()` | - | `PanelModel[]` | Get current layout |
| `refreshDraggableHandle()` | - | void | Refresh drag handle config |
| `destroy()` | - | void | Destroy component |

## Common Use Cases

### Use Case 1: Add/Remove Panels

```vue
<template>
  <div>
    <button @click="addPanel">Add Panel</button>
    <button @click="removeLast">Remove Last</button>
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);
const counter = ref(0);

const addPanel = () => {
  counter.value++;
  dashboardRef.value?.addPanel({
    id: `dynamic-${counter.value}`,
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: `Panel ${counter.value}`,
    content: `Content of panel ${counter.value}`
  });
};

const removeLast = () => {
  const layout = dashboardRef.value?.serialize() || [];
  const last = layout[layout.length - 1];
  if (last) dashboardRef.value?.removePanel(last.id);
};
</script>
```

### Use Case 2: Bulk Update

```vue
<script setup>
const updateAllHeaders = (prefix) => {
  const layout = dashboardRef.value?.serialize() || [];
  layout.forEach(p => {
    dashboardRef.value?.updatePanel({
      id: p.id,
      header: `${prefix} - ${p.header || 'Untitled'}`
    });
  });
};
</script>
```

### Use Case 3: Export/Import Layout

```vue
<script setup>
const exportLayout = () => {
  const layout = dashboardRef.value?.serialize();
  if (!layout) return;

  const blob = new Blob([JSON.stringify(layout, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dashboard-layout-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const importLayout = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const layout = JSON.parse(e.target.result);
      if (dashboardRef.value && Array.isArray(layout)) {
        dashboardRef.value.removeAll();
        layout.forEach(p => dashboardRef.value.addPanel(p));
      }
    } catch (err) {
      console.error('Invalid layout file:', err);
    }
  };
  reader.readAsText(file);
};
</script>
```

### Use Case 4: Conditional Panel Visibility

```vue
<script setup>
import { ref, computed } from 'vue';

const showOptional = ref(true);

const panels = computed(() => {
  const base = [
    { id: 'main', row: 0, col: 0, sizeX: 3, sizeY: 2, header: 'Main' },
    { id: 'side', row: 0, col: 3, sizeX: 2, sizeY: 1, header: 'Sidebar' }
  ];
  if (showOptional.value) {
    base.push({ id: 'optional', row: 1, col: 3, sizeX: 2, sizeY: 1, header: 'Optional' });
  }
  return base;
});
</script>
```

**Next:** Learn about the [events reference](dashboard-events-reference.md) for complete event handling.
