# Splitter Style Customization (Vue 3)

## Table of Contents
- [CSS Customization](#css-customization)
- [Theme Variables](#theme-variables)
- [Gripper and Separator Styling](#gripper-and-separator-styling)
- [Responsive Design Patterns](#responsive-design-patterns)
- [Dark Mode and Theme Switching](#dark-mode-and-theme-switching)

## CSS Customization

### Core Selectors

| Selector | Description |
|----------|-------------|
| `.e-splitter` | Root splitter container |
| `.e-pane` | Individual pane |
| `.e-split-bar` | Separator bar between panes |
| `.e-split-bar.e-hover` | Separator on hover |
| `.e-split-bar.e-active` | Separator during drag |
| `.e-collapsed` | Collapsed pane |

### Basic Customization

```css
/* Root splitter */
.e-splitter {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
}

/* All panes */
.e-pane {
  background: #fafafa;
  padding: 16px;
}

/* Specific pane */
.e-splitter .e-pane:nth-child(1) {
  background: #f5f5f5;
}

.e-splitter .e-pane:nth-child(2) {
  background: #ffffff;
}
```

## Theme Variables

### CSS Custom Properties

```css
:root {
  --splitter-bg: #ffffff;
  --splitter-border: #e0e0e0;
  --splitter-bar-bg: #cccccc;
  --splitter-bar-hover: #2196f3;
  --splitter-bar-active: #1976d2;
  --pane-bg-1: #f5f5f5;
  --pane-bg-2: #ffffff;
}

[data-theme="dark"] {
  --splitter-bg: #1e1e1e;
  --splitter-border: #333333;
  --splitter-bar-bg: #444444;
  --splitter-bar-hover: #4d9fff;
  --splitter-bar-active: #2196f3;
  --pane-bg-1: #2a2a2a;
  --pane-bg-2: #1e1e1e;
}

.e-splitter {
  background: var(--splitter-bg);
  border: 1px solid var(--splitter-border);
}

.e-splitter .e-pane:nth-child(1) {
  background: var(--pane-bg-1);
}

.e-splitter .e-pane:nth-child(2) {
  background: var(--pane-bg-2);
}

.e-splitter .e-split-bar {
  background: var(--splitter-bar-bg);
}
```

## Gripper and Separator Styling

### Default Gripper

```css
.e-splitter .e-split-bar {
  background: #ccc;
  position: relative;
}

.e-splitter.e-horizontal .e-split-bar::before {
  content: '⋮';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 14px;
  user-select: none;
}

.e-splitter.e-vertical .e-split-bar::before {
  content: '⋯';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 14px;
  user-select: none;
}
```

### Custom Gripper with Dots

```css
.e-splitter.e-horizontal .e-split-bar {
  background: #ddd;
  width: 8px;
  position: relative;
}

.e-splitter.e-horizontal .e-split-bar::before {
  content: '⋮';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
```

### Animated Gripper

```css
.e-splitter .e-split-bar {
  position: relative;
  transition: background 0.2s;
}

.e-splitter .e-split-bar::before {
  content: '⋮';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 16px;
  transition: color 0.2s, transform 0.2s;
}

.e-splitter .e-split-bar:hover {
  background: #4d9fff;
}

.e-splitter .e-split-bar:hover::before {
  color: white;
  transform: translate(-50%, -50%) scale(1.2);
}
```

### Modern Gripper Style

```css
.e-splitter .e-split-bar {
  background: transparent;
  position: relative;
}

.e-splitter .e-split-bar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 30px;
  background: linear-gradient(180deg, transparent, #999, transparent);
  border-radius: 2px;
  transition: background 0.2s;
}

.e-splitter .e-split-bar:hover::before {
  background: linear-gradient(180deg, transparent, #4d9fff, transparent);
  width: 4px;
  height: 40px;
}
```

## Responsive Design Patterns

### Mobile-First

```vue
<template>
  <SplitterComponent
    height="100vh"
    width="100%"
    :orientation="orientation"
  >
    <e-panes>
      <e-pane v-if="showSidebar" size="200px">
        <div>Sidebar</div>
      </e-pane>
      <e-pane>
        <div>Main</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const screenWidth = ref(window.innerWidth);
const updateWidth = () => { screenWidth.value = window.innerWidth; };
onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
onUnmounted(() => window.removeEventListener('resize', updateWidth));

const orientation = computed(() => screenWidth.value < 768 ? 'Vertical' : 'Horizontal');
const showSidebar = computed(() => screenWidth.value >= 480);
</script>
```

### Responsive Separator Size

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :separatorSize="separatorSize"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const screenWidth = ref(window.innerWidth);
const updateWidth = () => { screenWidth.value = window.innerWidth; };
onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
onUnmounted(() => window.removeEventListener('resize', updateWidth));

const separatorSize = computed(() => screenWidth.value < 768 ? 12 : 4);
</script>
```

## Dark Mode and Theme Switching

### Theme-Aware Styles

```vue
<template>
  <div :data-theme="theme">
    <button @click="toggleTheme">Toggle Theme</button>
    <SplitterComponent
      height="400px"
      width="100%"
      cssClass="themed-splitter"
    >
      <e-panes>
        <e-pane size="200px"><div>Pane 1</div></e-pane>
        <e-pane><div>Pane 2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const theme = ref(localStorage.getItem('theme') || 'light');

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

watch(theme, (newTheme) => {
  localStorage.setItem('theme', newTheme);
});
</script>

<style>
[data-theme="light"] .themed-splitter {
  --splitter-bg: #ffffff;
  --splitter-bar: #cccccc;
  --pane-1-bg: #f5f5f5;
  --pane-2-bg: #ffffff;
}

[data-theme="dark"] .themed-splitter {
  --splitter-bg: #1e1e1e;
  --splitter-bar: #444444;
  --pane-1-bg: #2a2a2a;
  --pane-2-bg: #1e1e1e;
}

.themed-splitter {
  background: var(--splitter-bg);
}

.themed-splitter .e-pane:nth-child(1) {
  background: var(--pane-1-bg);
}

.themed-splitter .e-pane:nth-child(2) {
  background: var(--pane-2-bg);
}

.themed-splitter .e-split-bar {
  background: var(--splitter-bar);
}
</style>
```

### Material Design Theme

```vue
<style>
.material-splitter .e-split-bar {
  background: #e0e0e0;
  position: relative;
  transition: background 0.2s;
}

.material-splitter .e-split-bar:hover {
  background: #2196f3;
}

.material-splitter .e-pane {
  background: #ffffff;
  padding: 16px;
  font-family: 'Roboto', sans-serif;
}
</style>
```

### Bootstrap-Style Theme

```vue
<style>
.bootstrap-splitter {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.bootstrap-splitter .e-pane {
  background: #ffffff;
  padding: 1rem;
}

.bootstrap-splitter .e-split-bar {
  background: #dee2e6;
  position: relative;
  transition: background 0.15s;
}

.bootstrap-splitter .e-split-bar:hover {
  background: #adb5bd;
}
</style>
```

## Best Practices

1. **Use CSS variables**: For maintainable theming

2. **Test across themes**: Verify styles work in all themes

3. **Use semantic class names**: For themable selectors

4. **Animate interactions**: Smooth transitions for hover/active states

5. **Consider touch devices**: Larger separators on mobile

6. **Avoid inline styles**: Use scoped styles instead

7. **Provide visual feedback**: Clear hover and active states

8. **Test responsive behavior**: Verify on multiple screen sizes

**Next:** Return to the [SKILL.md](../SKILL.md#splitter) for the complete Splitter overview.
