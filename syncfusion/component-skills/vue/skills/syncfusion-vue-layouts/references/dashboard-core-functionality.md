# Dashboard Layout Core Functionality (Vue 3)

## Table of Contents
- [Panel Management](#panel-management)
- [Dragging & Positioning](#dragging--positioning)
- [Resizing](#resizing)
- [Floating & Auto-Arrangement](#floating--auto-arrangement)
- [Grid Configuration](#grid-configuration)
- [Responsive Behavior](#responsive-behavior)
- [State Persistence](#state-persistence)

## Panel Management

### Creating Panels

Define panels with the `PanelModel` interface:

```typescript
interface PanelModel {
  id: string;              // Unique identifier (required)
  row: number;             // Row position (required)
  col: number;             // Column position (required)
  sizeX: number;           // Width in cells (default: 1)
  sizeY: number;           // Height in cells (default: 1)
  header?: string | HTMLElement | Function;  // Panel header
  content?: string | HTMLElement | Function; // Panel content
  cssClass?: string;       // Custom CSS classes
  enabled?: boolean;       // Enable/disable panel (default: true)
  minSizeX?: number;       // Minimum width (default: 1)
  minSizeY?: number;       // Minimum height (default: 1)
  maxSizeX?: number;       // Maximum width (default: null)
  maxSizeY?: number;       // Maximum height (default: null)
  zIndex?: number;         // Z-index stacking (default: 1000)
}
```

### Panel Configuration Example

```vue
<script setup>
const panels = ref([
  {
    id: 'analytics-panel',
    row: 0,
    col: 0,
    sizeX: 3,
    sizeY: 2,
    header: 'Analytics Dashboard',
    content: '<div>Chart content here</div>',
    minSizeX: 2,
    minSizeY: 1,
    maxSizeX: 4,
    maxSizeY: 3,
    cssClass: 'custom-analytics'
  },
  {
    id: 'reports-panel',
    row: 0,
    col: 3,
    sizeX: 2,
    sizeY: 2,
    header: 'Reports',
    content: '<div>Report content here</div>',
    enabled: true
  }
]);
</script>
```

### Disable Specific Panels

```vue
<script setup>
const disabledPanel = {
  id: 'read-only-panel',
  row: 0,
  col: 0,
  sizeX: 2,
  sizeY: 1,
  header: 'Read Only',
  content: 'This panel is locked',
  enabled: false  // Panel won't respond to drag/resize
};
</script>
```

### Panel Size Constraints

```vue
<script setup>
const constrainedPanel = {
  id: 'constrained-panel',
  row: 0,
  col: 0,
  sizeX: 2,
  sizeY: 1,
  minSizeX: 1,  // Cannot be smaller than 1 cell width
  minSizeY: 1,  // Cannot be smaller than 1 cell height
  maxSizeX: 4,  // Cannot exceed 4 cells width
  maxSizeY: 3   // Cannot exceed 3 cells height
};
</script>
```

## Dragging & Positioning

### Enable Dragging

Dragging is enabled by default. Control it with `allowDragging` property:

```vue
<template>
  <DashboardLayoutComponent
    :allowDragging="true"
    :panels="panels"
  />
</template>
```

### Draggable Handle

Restrict dragging to specific elements using `draggableHandle`:

```vue
<template>
  <DashboardLayoutComponent
    :allowDragging="true"
    draggableHandle=".e-panel-header"
    :panels="panels"
  />
</template>
```

### Programmatic Panel Movement

Move panels using the `movePanel()` method:

```vue
<script setup>
import { ref } from 'vue';
import { DashboardLayoutComponent } from '@syncfusion/ej2-vue-layouts';

const dashboardRef = ref(null);

const handleMovePanel = () => {
  // Move panel to specific position
  dashboardRef.value?.movePanel('panel1', 1, 2);  // row: 1, col: 2
};
</script>
```

## Resizing

### Enable Resizing

Enable resizing with the `allowResizing` property:

```vue
<template>
  <DashboardLayoutComponent
    :allowResizing="true"
    :resizableHandles="['e-south-east', 'e-south', 'e-east']"
    :panels="panels"
  />
</template>
```

### Programmatic Resizing

Resize panels using the `resizePanel()` method:

```vue
<script setup>
const handleResizePanel = () => {
  // Resize panel to 3 columns wide x 2 rows high
  dashboardRef.value?.resizePanel('panel1', 3, 2);
};
</script>
```

## Floating & Auto-Arrangement

### Enable Floating

When enabled, panels automatically move upward to fill empty spaces:

```vue
<template>
  <DashboardLayoutComponent
    :allowFloating="true"
    :panels="panels"
  />
</template>
```

**Behavior:**
- When a panel is dragged or resized, others automatically move to fill empty cells
- Creates compact layout without gaps
- Improves space utilization

## Grid Configuration

### Column Layout

Configure the number of columns in the dashboard:

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    :panels="panels"
  />
</template>
```

### Cell Spacing

Control horizontal and vertical spacing between panels:

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    :cellSpacing="[10, 10]"
    :panels="panels"
  />
</template>
```

### Cell Aspect Ratio

Control the height-to-width ratio of grid cells:

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    :cellAspectRatio="1"
    :panels="panels"
  />
</template>
```

## Responsive Behavior

### Media Query Configuration

Automatically adjust layout on different screen sizes:

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    mediaQuery="max-width: 768px"
    :panels="panels"
  />
</template>
```

## State Persistence

### Enable Persistence

Save and restore dashboard layout across sessions:

```vue
<template>
  <DashboardLayoutComponent
    id="my-dashboard"
    :enablePersistence="true"
    :panels="panels"
  />
</template>
```

### Manual Save & Restore

Programmatically save and restore layout:

```vue
<script setup>
const saveLayout = () => {
  const layout = dashboardRef.value?.serialize();
  localStorage.setItem('customLayout', JSON.stringify(layout));
};

const restoreLayout = () => {
  const savedLayout = localStorage.getItem('customLayout');
  if (savedLayout) {
    const layout = JSON.parse(savedLayout);
    dashboardRef.value?.removeAll();
    layout.forEach(panel => {
      dashboardRef.value?.addPanel(panel);
    });
  }
};
</script>
```

**Next:** Learn about the [properties reference](dashboard-properties-reference.md) for complete configuration options.
