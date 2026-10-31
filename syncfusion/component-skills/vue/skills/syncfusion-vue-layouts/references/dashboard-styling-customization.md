# Dashboard Layout Styling & Customization (Vue 3)

## Table of Contents
- [CSS Selectors](#css-selectors)
- [Resize Handle Directions](#resize-handle-directions)
- [Theme Integration](#theme-integration)
- [Header and Content Styling](#header-and-content-styling)
- [Dragging State and Placeholder Styling](#dragging-state-and-placeholder-styling)
- [Custom CSS Classes per Panel](#custom-css-classes-per-panel)

## CSS Selectors

### Core Selectors

| Selector | Description |
|----------|-------------|
| `.e-dashboardlayout` | Root dashboard container |
| `.e-panel` | Individual panel |
| `.e-panel-header` | Panel header section |
| `.e-panel-content` | Panel content area |
| `.e-panel-container` | Draggable panel wrapper |
| `.e-resize-handle` | Resize handle element |
| `.e-placeholder` | Drop placeholder during drag |
| `.e-dragging` | Panel being dragged |

### Basic Customization Example

```css
/* Style the dashboard root */
.e-dashboardlayout {
  background: #f5f7fa;
  padding: 16px;
  border-radius: 8px;
}

/* Style all panels */
.e-panel {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e4e8;
}

/* Style panel headers */
.e-panel-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 12px 16px;
}

/* Style panel content */
.e-panel-content {
  padding: 16px;
  color: #333;
  line-height: 1.6;
}
```

## Resize Handle Directions

### Available Handles

| Class | Direction |
|-------|-----------|
| `.e-south-east` | Bottom-right corner (default) |
| `.e-south-west` | Bottom-left corner |
| `.e-north-east` | Top-right corner |
| `.e-north-west` | Top-left corner |
| `.e-east` | Right edge |
| `.e-west` | Left edge |
| `.e-south` | Bottom edge |
| `.e-north` | Top edge |

### Styling Resize Handles

```css
/* Style the default south-east handle */
.e-resize-handle.e-south-east {
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, transparent 50%, #667eea 50%);
  border-bottom-right-radius: 6px;
}

/* Style all edges */
.e-resize-handle.e-east,
.e-resize-handle.e-west,
.e-resize-handle.e-south,
.e-resize-handle.e-north {
  background: rgba(102, 126, 234, 0.4);
  transition: background 0.2s;
}

.e-resize-handle.e-east:hover,
.e-resize-handle.e-west:hover {
  background: rgba(102, 126, 234, 0.7);
}
```

## Theme Integration

### Tailwind CSS Theme

```vue
<template>
  <DashboardLayoutComponent :panels="panels" class="tailwind-dashboard" />
</template>

<style>
.tailwind-dashboard .e-panel {
  @apply bg-white rounded-lg shadow-md border border-gray-200;
}
.tailwind-dashboard .e-panel-header {
  @apply bg-blue-600 text-white font-semibold px-4 py-3;
}
</style>
```

### Bootstrap Theme

```vue
<style>
.bootstrap-dashboard .e-panel {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  background: #fff;
}
.bootstrap-dashboard .e-panel-header {
  background: #0d6efd;
  color: white;
  padding: 0.75rem 1rem;
  font-weight: 500;
}
</style>
```

### Material Design Theme

```vue
<style>
.material-dashboard .e-panel {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
}
.material-dashboard .e-panel-header {
  background: #1976d2;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 500;
}
</style>
```

### Fluent UI Theme

```vue
<style>
.fluent-dashboard .e-panel {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1.6px 3.6px rgba(0,0,0,0.132), 0 0.3px 0.9px rgba(0,0,0,0.108);
}
.fluent-dashboard .e-panel-header {
  background: #0078d4;
  color: white;
  padding: 8px 12px;
  font-weight: 600;
}
</style>
```

## Header and Content Styling

### Custom Header Style

```css
.e-panel-header.custom-header {
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.e-panel-header.custom-header .panel-icon {
  margin-right: 8px;
  font-size: 18px;
}
```

### Content Area Customization

```css
.e-panel-content.custom-content {
  padding: 20px;
  background: #fafbfc;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  min-height: 100px;
}
```

## Dragging State and Placeholder Styling

### Dragging Visual Feedback

```css
/* Panel being dragged */
.e-panel.e-dragging {
  opacity: 0.7;
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  cursor: grabbing;
}

/* Placeholder showing drop position */
.e-placeholder {
  background: rgba(102, 126, 234, 0.2);
  border: 2px dashed #667eea;
  border-radius: 6px;
  transition: background 0.2s, border 0.2s;
}

.e-placeholder.e-drag-hover {
  background: rgba(102, 126, 234, 0.35);
  border-color: #4c5fc6;
}
```

## Custom CSS Classes per Panel

### Per-Panel Styling with cssClass Property

```vue
<script setup>
const panels = ref([
  {
    id: 'alert',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Alerts',
    content: 'Critical alerts panel',
    cssClass: 'panel-alert'
  },
  {
    id: 'success',
    row: 0,
    col: 2,
    sizeX: 2,
    sizeY: 1,
    header: 'Success',
    content: 'Success messages',
    cssClass: 'panel-success'
  }
]);
</script>

<style>
/* Alert panel - red theme */
.panel-alert .e-panel-header {
  background: #dc3545;
  color: white;
}
.panel-alert {
  border: 2px solid #dc3545;
}

/* Success panel - green theme */
.panel-success .e-panel-header {
  background: #28a745;
  color: white;
}
.panel-success {
  border: 2px solid #28a745;
}
</style>
```

### Dynamic Per-Panel Theming

```vue
<script setup>
import { ref, computed } from 'vue';

const theme = ref('light');

const panels = computed(() => [
  {
    id: 'themed',
    row: 0,
    col: 0,
    sizeX: 2,
    sizeY: 1,
    header: 'Themed Panel',
    content: 'Content adapts to theme',
    cssClass: theme.value === 'light' ? 'panel-light' : 'panel-dark'
  }
]);
</script>
```

## CSS Custom Properties for Theming

```vue
<style>
:root {
  --panel-bg: #ffffff;
  --panel-border: #e1e4e8;
  --panel-header-bg: #667eea;
  --panel-header-color: #ffffff;
  --panel-radius: 6px;
  --panel-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] {
  --panel-bg: #1a1a1a;
  --panel-border: #333;
  --panel-header-bg: #4c5fc6;
  --panel-header-color: #f0f0f0;
  --panel-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.e-panel {
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  border-radius: var(--panel-radius);
  box-shadow: var(--panel-shadow);
}

.e-panel-header {
  background: var(--panel-header-bg);
  color: var(--panel-header-color);
}
</style>
```

**Next:** Learn about [dragging behavior](dashboard-dragging-behavior.md) for events and customization.
