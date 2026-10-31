# Dashboard Layout Resizing & Floating (Vue 3)

## Table of Contents
- [Resize Handle Directions](#resize-handle-directions)
- [Size Constraints](#size-constraints)
- [Resize Events](#resize-events)
- [Floating Behavior](#floating-behavior)
- [Programmatic Resizing](#programmatic-resizing)
- [Lock Panel Size](#lock-panel-size)

## Resize Handle Directions

### Multiple Handle Configuration

```vue
<template>
  <DashboardLayoutComponent
    :allowResizing="true"
    :resizableHandles="['e-south-east', 'e-east', 'e-south', 'south-west']"
    :panels="panels"
  />
</template>
```

### Available Handles

| Class | Position |
|-------|----------|
| `e-south-east` | Bottom-right (default) |
| `e-south-west` | Bottom-left |
| `e-north-east` | Top-right |
| `e-north-west` | Top-left |
| `e-east` | Right edge |
| `e-west` | Left edge |
| `e-south` | Bottom edge |
| `e-north` | Top edge |

### All Directions Example

```vue
<script setup>
const allHandles = [
  'e-south-east',
  'e-south-west',
  'e-north-east',
  'e-north-west',
  'e-east',
  'e-west',
  'e-south',
  'e-north'
];
</script>

<template>
  <DashboardLayoutComponent :resizableHandles="allHandles" :panels="panels" />
</template>
```

## Size Constraints

### Per-Panel Constraints

```vue
<script setup>
const panels = ref([
  {
    id: 'constrained-panel',
    row: 0,
    col: 0,
    sizeX: 3,
    sizeY: 2,
    minSizeX: 2,   // Cannot shrink below 2 cells
    minSizeY: 1,   // Cannot shrink below 1 cell
    maxSizeX: 4,   // Cannot grow beyond 4 cells
    maxSizeY: 3,   // Cannot grow beyond 3 cells
    header: 'Constrained',
    content: 'Content'
  }
]);
</script>
```

### Lock to Fixed Size

```vue
<script setup>
const lockedPanel = {
  id: 'fixed',
  row: 0,
  col: 0,
  sizeX: 2,
  sizeY: 1,
  // Set min = max to lock the size
  minSizeX: 2,
  minSizeY: 1,
  maxSizeX: 2,
  maxSizeY: 1,
  header: 'Fixed Size',
  content: 'Cannot resize'
};
</script>
```

## Resize Events

### resizeStart Event

Fired when resize begins.

```vue
<script setup>
const onResizeStart = (args) => {
  console.log('Resize started:', args.element.id);
  // args.element - panel DOM element
  // args.event - original event
};
</script>

<template>
  <DashboardLayoutComponent :resizeStart="onResizeStart" :panels="panels" />
</template>
```

### resize Event

Fired continuously during resize.

```vue
<script setup>
const onResize = (args) => {
  const rect = args.element.getBoundingClientRect();
  console.log('Current size:', rect.width, 'x', rect.height);
};
</script>
```

### resizeStop Event

Fired when resize ends.

```vue
<script setup>
import { ref } from 'vue';

const dashboardRef = ref(null);

const onResizeStop = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('dashboardSizes', JSON.stringify(layout));
};
</script>
```

## Floating Behavior

### Enable Floating

When enabled, panels automatically move upward to fill gaps.

```vue
<template>
  <DashboardLayoutComponent
    :allowFloating="true"
    :panels="panels"
  />
</template>
```

### Disable Floating

```vue
<template>
  <DashboardLayoutComponent
    :allowFloating="false"
    :panels="panels"
  />
</template>
```

### When to Use Floating

**Use floating when:**
- Building dense dashboards where space utilization matters
- You want automatic gap filling
- Panels should re-arrange optimally

**Don't use floating when:**
- Users have specific layout expectations
- Panel order matters semantically (e.g., time-series)
- Predictable positioning is required

## Programmatic Resizing

### Resize a Single Panel

```vue
<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const expandPanel = () => {
  // Resize 'p1' to 4 cells wide, 2 cells tall
  dashboardRef.value?.resizePanel('p1', 4, 2);
};

const shrinkPanel = () => {
  dashboardRef.value?.resizePanel('p1', 1, 1);
};
</script>

<template>
  <div>
    <button @click="expandPanel">Expand p1</button>
    <button @click="shrinkPanel">Shrink p1</button>
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
  </div>
</template>
```

### Resize All Panels Equally

```vue
<script setup>
const resizeAll = (sizeX, sizeY) => {
  const panels = dashboardRef.value?.serialize() || [];
  panels.forEach(p => {
    dashboardRef.value?.resizePanel(p.id, sizeX, sizeY);
  });
};
</script>
```

### Resize with Constraint Checking

```vue
<script setup>
const safeResize = (panelId, newSizeX, newSizeY) => {
  const panels = dashboardRef.value?.serialize() || [];
  const panel = panels.find(p => p.id === panelId);
  if (!panel) return false;

  if (panel.minSizeX && newSizeX < panel.minSizeX) newSizeX = panel.minSizeX;
  if (panel.maxSizeX && newSizeX > panel.maxSizeX) newSizeX = panel.maxSizeX;
  if (panel.minSizeY && newSizeY < panel.minSizeY) newSizeY = panel.minSizeY;
  if (panel.maxSizeY && newSizeY > panel.maxSizeY) newSizeY = panel.maxSizeY;

  dashboardRef.value?.resizePanel(panelId, newSizeX, newSizeY);
  return true;
};
</script>
```

## Lock Panel Size

### Lock a Single Panel

```vue
<script setup>
const panels = ref([
  {
    id: 'free',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Free Resize',
    content: 'Can be resized'
  },
  {
    id: 'locked',
    row: 0,
    col: 2,
    sizeX: 2,
    sizeY: 1,
    minSizeX: 2,
    minSizeY: 1,
    maxSizeX: 2,
    maxSizeY: 1,
    header: 'Locked',
    content: 'Cannot be resized'
  }
]);
</script>
```

### Disable Resize Globally

```vue
<template>
  <DashboardLayoutComponent :allowResizing="false" :panels="panels" />
</template>
```

### Disable Resize per Panel in Handler

```vue
<script setup>
const onResizeStart = (args) => {
  // Cancel resize for locked panels
  if (args.element.classList.contains('locked-panel')) {
    args.cancel = true;
  }
};
</script>
```

## Complete Example with All Features

```vue
<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    id="resizable-dashboard"
    :columns="6"
    :cellSpacing="[8, 8]"
    :panels="panels"
    :allowDragging="true"
    :allowResizing="true"
    :allowFloating="true"
    :resizableHandles="['e-south-east', 'e-east', 'e-south']"
    :resizeStart="onResizeStart"
    :resizeStop="onResizeStop"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const panels = ref([
  {
    id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2,
    minSizeX: 1, minSizeY: 1, maxSizeX: 4, maxSizeY: 3,
    header: 'Resizable 1', content: 'Drag and resize me'
  },
  {
    id: 'p2', row: 0, col: 2, sizeX: 2, sizeY: 1,
    header: 'Resizable 2', content: 'Me too'
  },
  {
    id: 'p3', row: 1, col: 2, sizeX: 2, sizeY: 1,
    minSizeX: 2, minSizeY: 1, maxSizeX: 2, maxSizeY: 1,
    header: 'Locked Size', content: 'I cannot be resized'
  }
]);

const onResizeStart = (args) => {
  console.log('Resize:', args.element.id);
};

const onResizeStop = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('sizes', JSON.stringify(layout));
};
</script>
```

**Next:** Learn about [cell configuration](dashboard-cell-configuration.md) for grid sizing details.
