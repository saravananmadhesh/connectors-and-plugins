# Dashboard Layout Dragging Behavior (Vue 3)

## Table of Contents
- [Drag Events](#drag-events)
- [Collision Detection](#collision-detection)
- [Custom Drag Handles](#custom-drag-handles)
- [Disabling Specific Panels](#disabling-specific-panels)
- [Visual Feedback](#visual-feedback)
- [Programmatic Panel Movement](#programmatic-panel-movement)

## Drag Events

### dragStart Event

Fired when dragging begins. Use to validate, log, or cancel.

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :dragStart="onDragStart"
  />
</template>

<script setup>
const onDragStart = (args) => {
  console.log('Drag started for panel:', args.element.id);
  // args.element - the panel DOM element
  // args.event - the original mouse/touch event
};
</script>
```

### drag Event

Fired continuously during dragging.

```vue
<script setup>
const onDrag = (args) => {
  console.log('Dragging:', args.element.id);
  console.log('Position:', args.event.clientX, args.event.clientY);
};
</script>
```

### dragStop Event

Fired when dragging ends. Use to persist the new layout.

```vue
<script setup>
import { ref } from 'vue';

const dashboardRef = ref(null);

const onDragStop = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) {
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    console.log('Layout saved');
  }
};
</script>

<template>
  <DashboardLayoutComponent
    ref="dashboardRef"
    :panels="panels"
    :dragStop="onDragStop"
  />
</template>
```

## Collision Detection

### Push Panels on Collision

By default, when a panel is dragged over another, the underlying panel is pushed to make space.

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :allowDragging="true"
  />
</template>
```

This is the default behavior - no additional configuration needed.

### Custom Collision Logic

```vue
<script setup>
const onDragStart = (args) => {
  const panelId = args.element.id;
  // Prevent dragging certain panels
  if (panelId === 'locked-panel') {
    args.cancel = true;
  }
};
</script>
```

## Custom Drag Handles

### Header-Only Dragging

Restrict dragging to the panel header.

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :allowDragging="true"
    draggableHandle=".e-panel-header"
  />
</template>
```

### Icon-Only Dragging

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :allowDragging="true"
    draggableHandle=".drag-handle-icon"
  />
</template>

<style>
.drag-handle-icon {
  cursor: move;
  padding: 4px 8px;
  margin-right: 8px;
  user-select: none;
}
</style>
```

### Multiple Drag Handles

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    :allowDragging="true"
    draggableHandle=".e-panel-header, .panel-drag-icon"
  />
</template>
```

## Disabling Specific Panels

### Per-Panel Disable

```vue
<script setup>
const panels = ref([
  { id: 'movable', row: 0, col: 0, sizeX: 2, sizeY: 1, content: 'Movable' },
  { id: 'locked', row: 0, col: 2, sizeX: 2, sizeY: 1, content: 'Locked', enabled: false }
]);
</script>
```

### Conditional Disable in dragStart

```vue
<script setup>
const onDragStart = (args) => {
  // Lock specific panel during certain conditions
  if (args.element.id === 'p1' && !isUserAdmin.value) {
    args.cancel = true;
  }
};

const isUserAdmin = ref(false);
</script>
```

## Visual Feedback

### Default Dragging Styles

```css
.e-panel.e-dragging {
  opacity: 0.8;
  z-index: 10000;
  cursor: grabbing;
}

.e-placeholder {
  background-color: rgba(102, 126, 234, 0.15);
  border: 2px dashed #667eea;
  border-radius: 6px;
}
```

### Custom Drag Preview

```vue
<script setup>
const onDrag = (args) => {
  const el = args.element;
  el.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
  el.style.transform = 'rotate(2deg)';
};

const onDragStop = (args) => {
  const el = args.element;
  el.style.boxShadow = '';
  el.style.transform = '';
};
</script>
```

## Programmatic Panel Movement

### Move Panel to Specific Cell

```vue
<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const moveToTopLeft = () => {
  // Move 'p1' to row 0, col 0
  dashboardRef.value?.movePanel('p1', 0, 0);
};

const moveToBottom = () => {
  dashboardRef.value?.movePanel('p1', 4, 2);
};
</script>

<template>
  <div>
    <button @click="moveToTopLeft">Top Left</button>
    <button @click="moveToBottom">Bottom</button>
    <DashboardLayoutComponent ref="dashboardRef" :panels="panels" />
  </div>
</template>
```

### Move Panel with Validation

```vue
<script setup>
const movePanelSafely = (panelId, row, col) => {
  const panels = dashboardRef.value?.serialize() || [];
  const target = { row, col };
  const conflict = panels.some(p =>
    p.id !== panelId && p.row === target.row && p.col === target.col
  );
  if (conflict) {
    console.warn(`Cannot move ${panelId}: position occupied`);
    return false;
  }
  dashboardRef.value?.movePanel(panelId, row, col);
  return true;
};
</script>
```

### Swap Two Panels

```vue
<script setup>
const swapPanels = (idA, idB) => {
  const panels = dashboardRef.value?.serialize() || [];
  const a = panels.find(p => p.id === idA);
  const b = panels.find(p => p.id === idB);
  if (a && b) {
    dashboardRef.value?.movePanel(idA, b.row, b.col);
    dashboardRef.value?.movePanel(idB, a.row, a.col);
  }
};
</script>
```

## Complete Drag Example

```vue
<template>
  <div>
    <div class="dashboard-controls">
      <button @click="resetLayout">Reset</button>
      <button @click="saveLayout">Save</button>
    </div>
    <DashboardLayoutComponent
      ref="dashboardRef"
      id="draggable-dashboard"
      :columns="5"
      :cellSpacing="[10, 10]"
      :panels="panels"
      :allowDragging="true"
      :dragStart="onDragStart"
      :drag="onDrag"
      :dragStop="onDragStop"
      draggableHandle=".e-panel-header"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const panels = ref([
  { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'Panel 1', content: 'Content 1' },
  { id: 'p2', row: 0, col: 2, sizeX: 2, sizeY: 1, header: 'Panel 2', content: 'Content 2' },
  { id: 'p3', row: 1, col: 2, sizeX: 1, sizeY: 1, header: 'Panel 3', content: 'Content 3' }
]);

const onDragStart = (args) => {
  console.log('Started dragging:', args.element.id);
};

const onDrag = (args) => {
  // Optional: track drag progress
};

const onDragStop = () => {
  const layout = dashboardRef.value?.serialize();
  if (layout) localStorage.setItem('dashboardLayout', JSON.stringify(layout));
};

const resetLayout = () => {
  localStorage.removeItem('dashboardLayout');
  location.reload();
};

const saveLayout = onDragStop;
</script>
```

**Next:** Learn about [resizing and floating behavior](dashboard-resizing-floating.md).
