# Splitter Pane Sizing & Separation (Vue 3)

## Table of Contents
- [Fixed and Percentage-Based Sizing](#fixed-and-percentage-based-sizing)
- [Min and Max Size Constraints](#min-and-max-size-constraints)
- [Separator Styling and Customization](#separator-styling-and-customization)
- [Dynamic Size Adjustments](#dynamic-size-adjustments)

## Fixed and Percentage-Based Sizing

### Fixed Pixel Sizes

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px"><div>Left</div></e-pane>
      <e-pane size="300px"><div>Center</div></e-pane>
      <e-pane size="150px"><div>Right</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Percentage-Based Sizes

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="25%"><div>Sidebar</div></e-pane>
      <e-pane size="50%"><div>Main</div></e-pane>
      <e-pane size="25%"><div>Aside</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Mixed Sizing

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="250px"><div>Fixed Sidebar</div></e-pane>
      <e-pane size="60%"><div>Flexible Main</div></e-pane>
      <e-pane size="200px"><div>Fixed Aside</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Auto-Sized Panes

Use `size="auto"` to make the pane take remaining space:

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px"><div>Fixed</div></e-pane>
      <e-pane size="auto"><div>Fills remaining</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Min and Max Size Constraints

### Basic Constraints

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="50%" min="200px" max="500px">
        <div>Constrained between 200px and 500px</div>
      </e-pane>
      <e-pane size="50%"><div>Other</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Percentage-Based Constraints

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="30%" min="20%" max="50%">
        <div>Min 20%, Max 50%</div>
      </e-pane>
      <e-pane><div>Other</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Locked Pane Size

Set min and max equal to lock the pane size:

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" min="200px" max="200px">
        <div>Locked at 200px</div>
      </e-pane>
      <e-pane><div>Resizable</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Separator Styling and Customization

### Custom Separator Size

```vue
<template>
  <SplitterComponent height="400px" width="100%" :separatorSize="8">
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Custom Separator Color

```vue
<style>
.e-splitter .e-split-bar {
  background-color: #4a90e2;
  border-radius: 4px;
}
</style>
```

### Styled Separator with Gripper

```vue
<style>
.e-splitter .e-split-bar {
  background: linear-gradient(to right, #f0f0f0, #ccc, #f0f0f0);
  position: relative;
}

.e-splitter .e-split-bar::before {
  content: '⋮';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 16px;
  user-select: none;
}
</style>
```

### Vertical Splitter Gripper

```vue
<style>
.e-splitter.e-vertical .e-split-bar::before {
  content: '⋯';
}
</style>
```

### Hover State

```vue
<style>
.e-splitter .e-split-bar {
  transition: background-color 0.2s;
}

.e-splitter .e-split-bar:hover {
  background-color: #2196f3;
}
</style>
```

## Dynamic Size Adjustments

### Responsive Sizes Based on Screen

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane :size="sidebarSize">
        <div>Sidebar</div>
      </e-pane>
      <e-pane><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const screenWidth = ref(window.innerWidth);

const updateWidth = () => { screenWidth.value = window.innerWidth; };
onMounted(() => {
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
onUnmounted(() => window.removeEventListener('resize', updateWidth));

const sidebarSize = computed(() => screenWidth.value < 768 ? '150px' : '280px');
</script>
```

### Programmatically Update Pane Size

```vue
<template>
  <div>
    <button @click="resizeFirst">Resize First</button>
    <SplitterComponent ref="splitterRef" id="dynamic-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane :size="firstSize"><div>1</div></e-pane>
        <e-pane><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const firstSize = ref('200px');

const resizeFirst = () => {
  firstSize.value = firstSize.value === '200px' ? '400px' : '200px';
};
</script>
```

### Animate Size Changes

```vue
<style>
.e-pane {
  transition: flex-basis 0.3s ease;
}
</style>
```

## Best Practices

1. **Use percentage for responsive layouts**: Adapts to container size

2. **Always set min/max**: Prevents extreme resize behavior

3. **Style separators consistently**: Use the same visual language across app

4. **Test resize boundaries**: Verify behavior at min and max sizes

5. **Consider touch targets**: Make separators at least 16px for touch

6. **Animate size changes**: Smooth transitions improve UX

7. **Provide visual feedback**: Highlight separator on hover

**Next:** Learn about [expand and collapse functionality](splitter-expand-collapse-functionality.md).
