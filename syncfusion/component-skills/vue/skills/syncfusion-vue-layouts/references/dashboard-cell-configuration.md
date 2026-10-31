# Dashboard Layout Cell Configuration (Vue 3)

## Table of Contents
- [Grid Columns](#grid-columns)
- [Cell Sizing](#cell-sizing)
- [Cell Aspect Ratio](#cell-aspect-ratio)
- [Cell Spacing](#cell-spacing)
- [Cell Calculation Examples](#cell-calculation-examples)
- [Responsive Cell Configuration](#responsive-cell-configuration)
- [Advanced Grid Patterns](#advanced-grid-patterns)

## Grid Columns

### Basic Column Setup

```vue
<template>
  <DashboardLayoutComponent :columns="5" :panels="panels" />
</template>
```

### Common Column Counts

| Columns | Use Case |
|---------|----------|
| 1 | Single column layout (mobile) |
| 3 | Three-column grid |
| 5 | Standard dashboard (default) |
| 6 | Dense data display |
| 12 | Bootstrap-style grid |

### Column Distribution

```vue
<script setup>
const columns = ref(window.innerWidth < 768 ? 1 : 5);
window.addEventListener('resize', () => {
  columns.value = window.innerWidth < 768 ? 1 : 5;
});
</script>

<template>
  <DashboardLayoutComponent :columns="columns" :panels="panels" />
</template>
```

## Cell Sizing

### sizeX (Width in Cells)

```vue
<script setup>
const panels = ref([
  { id: 'p1', row: 0, col: 0, sizeX: 1, sizeY: 1, header: 'Small', content: '1 cell wide' },
  { id: 'p2', row: 0, col: 1, sizeX: 2, sizeY: 1, header: 'Medium', content: '2 cells wide' },
  { id: 'p3', row: 0, col: 3, sizeX: 3, sizeY: 1, header: 'Large', content: '3 cells wide' }
]);
</script>
```

### sizeY (Height in Cells)

```vue
<script setup>
const panels = ref([
  { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 1, header: 'Short' },
  { id: 'p2', row: 1, col: 0, sizeX: 2, sizeY: 2, header: 'Tall' },
  { id: 'p3', row: 3, col: 0, sizeX: 2, sizeY: 3, header: 'Extra Tall' }
]);
</script>
```

### Default Values

- `sizeX` default: `1`
- `sizeY` default: `1`

## Cell Aspect Ratio

The `cellAspectRatio` controls the visual height-to-width ratio of cells.

### Common Ratios

| Value | Description | Use Case |
|-------|-------------|----------|
| 0.5 | Short cells | Data tables, lists |
| 1 | Square cells | Default, balanced |
| 1.5 | Tall cells | Charts with detail |
| 2 | Very tall | Long content |

### Apply Aspect Ratio

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    :cellAspectRatio="1.5"
    :panels="panels"
  />
</template>
```

### Dynamic Aspect Ratio

```vue
<script setup>
import { ref, computed } from 'vue';

const orientation = ref('landscape');

const aspectRatio = computed(() => orientation.value === 'landscape' ? 1 : 1.5);
</script>
```

## Cell Spacing

### Horizontal and Vertical Spacing

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    :cellSpacing="[10, 10]"
    :panels="panels"
  />
</template>
```

### Asymmetric Spacing

```vue
<script setup>
// [horizontal, vertical]
const spacing = ref([15, 8]);
</script>
```

### Responsive Spacing

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const spacing = ref([10, 10]);

const onResize = () => {
  spacing.value = window.innerWidth < 768 ? [5, 5] : [15, 15];
};

onMounted(() => {
  onResize();
  window.addEventListener('resize', onResize);
});
onUnmounted(() => window.removeEventListener('resize', onResize));
</script>
```

## Cell Calculation Examples

### Example 1: 2x2 Grid

```vue
<script setup>
const panels = ref([
  { id: 'tl', row: 0, col: 0, sizeX: 1, sizeY: 1, header: 'Top Left' },
  { id: 'tr', row: 0, col: 1, sizeX: 1, sizeY: 1, header: 'Top Right' },
  { id: 'bl', row: 1, col: 0, sizeX: 1, sizeY: 1, header: 'Bottom Left' },
  { id: 'br', row: 1, col: 1, sizeX: 1, sizeY: 1, header: 'Bottom Right' }
]);
</script>
```

### Example 2: Hero + Sidebar

```vue
<script setup>
const panels = ref([
  { id: 'hero', row: 0, col: 0, sizeX: 3, sizeY: 2, header: 'Hero' },
  { id: 'side1', row: 0, col: 3, sizeX: 2, sizeY: 1, header: 'Side 1' },
  { id: 'side2', row: 1, col: 3, sizeX: 2, sizeY: 1, header: 'Side 2' }
]);
</script>
```

### Example 3: Magazine Layout

```vue
<script setup>
const panels = ref([
  { id: 'header', row: 0, col: 0, sizeX: 5, sizeY: 1, header: 'Header' },
  { id: 'feature', row: 1, col: 0, sizeX: 3, sizeY: 3, header: 'Feature' },
  { id: 's1', row: 1, col: 3, sizeX: 2, sizeY: 1, header: 'Side 1' },
  { id: 's2', row: 2, col: 3, sizeX: 2, sizeY: 1, header: 'Side 2' },
  { id: 's3', row: 3, col: 3, sizeX: 2, sizeY: 1, header: 'Side 3' }
]);
</script>
```

## Responsive Cell Configuration

### Mobile-First Approach

```vue
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const screenWidth = ref(window.innerWidth);

const onResize = () => { screenWidth.value = window.innerWidth; };
onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));

const columns = computed(() => {
  if (screenWidth.value < 600) return 1;
  if (screenWidth.value < 900) return 3;
  return 5;
});

const panels = computed(() => {
  if (screenWidth.value < 600) {
    return [
      { id: 'p1', row: 0, col: 0, sizeX: 1, sizeY: 1, header: 'Panel 1' },
      { id: 'p2', row: 1, col: 0, sizeX: 1, sizeY: 1, header: 'Panel 2' },
      { id: 'p3', row: 2, col: 0, sizeX: 1, sizeY: 1, header: 'Panel 3' }
    ];
  }
  return [
    { id: 'p1', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'Panel 1' },
    { id: 'p2', row: 0, col: 2, sizeX: 3, sizeY: 1, header: 'Panel 2' },
    { id: 'p3', row: 1, col: 2, sizeX: 3, sizeY: 1, header: 'Panel 3' }
  ];
});
</script>

<template>
  <DashboardLayoutComponent :columns="columns" :panels="panels" />
</template>
```

### CSS Media Query Approach

```vue
<template>
  <DashboardLayoutComponent
    :columns="5"
    mediaQuery="max-width: 768px"
    :panels="panels"
  />
</template>
```

## Advanced Grid Patterns

### Pattern 1: Bento Grid

```vue
<script setup>
const panels = ref([
  { id: 'a', row: 0, col: 0, sizeX: 2, sizeY: 2, header: 'A' },
  { id: 'b', row: 0, col: 2, sizeX: 1, sizeY: 1, header: 'B' },
  { id: 'c', row: 0, col: 3, sizeX: 1, sizeY: 1, header: 'C' },
  { id: 'd', row: 1, col: 2, sizeX: 1, sizeY: 1, header: 'D' },
  { id: 'e', row: 1, col: 3, sizeX: 1, sizeY: 1, header: 'E' }
]);
</script>
```

### Pattern 2: Asymmetric Magazine

```vue
<script setup>
const panels = ref([
  { id: 'feature', row: 0, col: 0, sizeX: 3, sizeY: 3, header: 'Feature' },
  { id: 'a', row: 0, col: 3, sizeX: 2, sizeY: 1, header: 'A' },
  { id: 'b', row: 0, col: 5, sizeX: 1, sizeY: 1, header: 'B' },
  { id: 'c', row: 1, col: 3, sizeX: 3, sizeY: 1, header: 'C' },
  { id: 'd', row: 2, col: 3, sizeX: 3, sizeY: 1, header: 'D' },
  { id: 'footer', row: 3, col: 0, sizeX: 6, sizeY: 1, header: 'Footer' }
]);
</script>
```

### Pattern 3: Sidebar + Main

```vue
<script setup>
const panels = ref([
  { id: 'sidebar', row: 0, col: 0, sizeX: 1, sizeY: 4, header: 'Sidebar' },
  { id: 'main', row: 0, col: 1, sizeX: 4, sizeY: 2, header: 'Main' },
  { id: 'aside', row: 0, col: 5, sizeX: 1, sizeY: 4, header: 'Aside' },
  { id: 'bottom', row: 2, col: 1, sizeX: 4, sizeY: 2, header: 'Bottom' }
]);
</script>
```

**Next:** Learn about [responsive design](dashboard-responsive-design.md) for breakpoint-based behavior.
