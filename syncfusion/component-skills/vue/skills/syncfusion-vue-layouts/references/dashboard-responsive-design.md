# Dashboard Layout Responsive Design (Vue 3)

## Table of Contents
- [Built-in Responsive Behavior](#built-in-responsive-behavior)
- [mediaQuery Property](#mediaquery-property)
- [Standard Breakpoint System](#standard-breakpoint-system)
- [Adaptive Layouts](#adaptive-layouts)
- [Mobile-First Approach](#mobile-first-approach)
- [Touch Device Support](#touch-device-support)

## Built-in Responsive Behavior

By default, the Dashboard Layout responds to screen sizes below 600px and switches to mobile mode.

```vue
<template>
  <DashboardLayoutComponent :panels="panels" />
</template>
```

**Default behavior:**
- Above 600px: Standard multi-column grid
- Below 600px: Single column, panels stack vertically

## mediaQuery Property

### Custom Breakpoint

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    mediaQuery="max-width: 768px"
  />
</template>
```

### Multiple Conditions

```vue
<template>
  <DashboardLayoutComponent
    :panels="panels"
    mediaQuery="(max-width: 768px) and (orientation: portrait)"
  />
</template>
```

### Common Breakpoint Values

| Breakpoint | Devices |
|------------|---------|
| `max-width: 480px` | Small phones |
| `max-width: 768px` | Tablets and phones |
| `max-width: 1024px` | Small desktops, large tablets |
| `max-width: 1280px` | Standard desktops |

## Standard Breakpoint System

### Bootstrap-Style Breakpoints

```vue
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const screenWidth = ref(0);

const updateWidth = () => { screenWidth.value = window.innerWidth; };
onMounted(() => { updateWidth(); window.addEventListener('resize', updateWidth); });
onUnmounted(() => window.removeEventListener('resize', updateWidth));

const breakpoint = computed(() => {
  if (screenWidth.value < 576) return 'xs';
  if (screenWidth.value < 768) return 'sm';
  if (screenWidth.value < 992) return 'md';
  if (screenWidth.value < 1200) return 'lg';
  if (screenWidth.value < 1400) return 'xl';
  return 'xxl';
});
</script>
```

### Apply Per-Breakpoint Configuration

```vue
<script setup>
const config = computed(() => {
  switch (breakpoint.value) {
    case 'xs': return { columns: 1, cellAspectRatio: 1 };
    case 'sm': return { columns: 2, cellAspectRatio: 1 };
    case 'md': return { columns: 3, cellAspectRatio: 1 };
    case 'lg': return { columns: 5, cellAspectRatio: 1 };
    default: return { columns: 6, cellAspectRatio: 1.2 };
  }
});
</script>

<template>
  <DashboardLayoutComponent
    :columns="config.columns"
    :cellAspectRatio="config.cellAspectRatio"
    :panels="panels"
  />
</template>
```

## Adaptive Layouts

### Different Panel Sets per Breakpoint

```vue
<script setup>
const panels = computed(() => {
  const bp = breakpoint.value;

  if (bp === 'xs' || bp === 'sm') {
    return [
      { id: 'p1', row: 0, col: 0, sizeX: 1, sizeY: 1, header: 'Hero' },
      { id: 'p2', row: 1, col: 0, sizeX: 1, sizeY: 1, header: 'Stats' },
      { id: 'p3', row: 2, col: 0, sizeX: 1, sizeY: 1, header: 'List' }
    ];
  }

  if (bp === 'md') {
    return [
      { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'Hero' },
      { id: 'p2', row: 0, col: 2, sizeX: 1, sizeY: 1, header: 'Stats' },
      { id: 'p3', row: 1, col: 2, sizeX: 1, sizeY: 1, header: 'List' }
    ];
  }

  return [
    { id: 'p1', row: 0, col: 0, sizeX: 3, sizeY: 2, header: 'Hero' },
    { id: 'p2', row: 0, col: 3, sizeX: 2, sizeY: 1, header: 'Stats' },
    { id: 'p3', row: 1, col: 3, sizeX: 2, sizeY: 1, header: 'List' },
    { id: 'p4', row: 2, col: 0, sizeX: 5, sizeY: 1, header: 'Footer' }
  ];
});
</script>
```

### Hide Panels on Mobile

```vue
<script setup>
import { ref, computed } from 'vue';

const isMobile = computed(() => window.innerWidth < 768);

const panels = computed(() => {
  const all = [
    { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'Main' },
    { id: 'p2', row: 0, col: 2, sizeX: 2, sizeY: 1, header: 'Side' },
    { id: 'p3', row: 1, col: 2, sizeX: 2, sizeY: 1, header: 'Optional' }
  ];
  return isMobile.value ? all.filter(p => p.id !== 'p3') : all;
});
</script>
```

## Mobile-First Approach

### Start with Mobile Layout

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const columns = ref(1);
const aspectRatio = ref(1.2);

const updateLayout = () => {
  const w = window.innerWidth;
  if (w < 600) {
    columns.value = 1;
    aspectRatio.value = 1.2;
  } else if (w < 1024) {
    columns.value = 3;
    aspectRatio.value = 1;
  } else {
    columns.value = 5;
    aspectRatio.value = 1;
  }
};

onMounted(() => {
  updateLayout();
  window.addEventListener('resize', updateLayout);
});
onUnmounted(() => window.removeEventListener('resize', updateLayout));
</script>

<template>
  <DashboardLayoutComponent
    :columns="columns"
    :cellAspectRatio="aspectRatio"
    :panels="panels"
  />
</template>
```

### Mobile-Specific Panel Sizing

```vue
<script setup>
const isMobile = ref(window.innerWidth < 768);

const mobilePanels = [
  { id: 'p1', row: 0, col: 0, sizeX: 1, sizeY: 1, header: 'A' },
  { id: 'p2', row: 1, col: 0, sizeX: 1, sizeY: 1, header: 'B' }
];

const desktopPanels = [
  { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'A' },
  { id: 'p2', row: 0, col: 2, sizeX: 3, sizeY: 1, header: 'B' }
];

const panels = computed(() => isMobile.value ? mobilePanels : desktopPanels);
</script>
```

## Touch Device Support

### Touch-Optimized Sizing

```vue
<style>
/* Larger touch targets for mobile */
@media (max-width: 768px) {
  .e-resize-handle {
    width: 24px !important;
    height: 24px !important;
  }
  .e-panel-header {
    padding: 16px !important;
    font-size: 16px !important;
  }
}
</style>
```

### Disable Dragging on Mobile

```vue
<script setup>
import { computed } from 'vue';

const isTouchDevice = computed(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0);
</script>

<template>
  <DashboardLayoutComponent
    :allowDragging="!isTouchDevice"
    :allowResizing="!isTouchDevice"
    :panels="panels"
  />
</template>
```

### Touch-Friendly Drag Handles

```vue
<style>
@media (max-width: 768px) {
  .e-panel-header::before {
    content: '⋮⋮';
    margin-right: 8px;
    cursor: grab;
    font-size: 18px;
  }
}
</style>
```

## Best Practices

1. **Test on real devices**: Emulators don't always reflect actual touch behavior

2. **Use media queries over JS**: Let the browser handle breakpoint detection

3. **Provide minimum touch target sizes**: 44x44px minimum for touch interaction

4. **Reduce columns on mobile**: Single column is easiest to navigate on small screens

5. **Consider disabling complex interactions on touch**: Drag-resize can be frustrating on touch

6. **Optimize cell aspect ratio for content**: Charts need taller cells, lists need shorter cells

7. **Pre-load layout data**: Don't wait for resize to fetch breakpoint-specific data

**Next:** Learn about [state persistence](dashboard-state-persistence.md) for save/restore patterns.
