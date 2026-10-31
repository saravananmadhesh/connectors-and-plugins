# Splitter Resize Behavior (Vue 3)

## Table of Contents
- [Resize Events and Lifecycle](#resize-events-and-lifecycle)
- [Preventing Resize on Specific Panes](#preventing-resize-on-specific-panes)
- [Dynamic Resize Configuration](#dynamic-resize-configuration)
- [Resize Constraints and Validation](#resize-constraints-and-validation)

## Resize Events and Lifecycle

### resizeStart

Fired when the user starts dragging the separator:

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizeStart="onResizeStart"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onResizeStart = (args) => {
  // args.event - the mouse/touch event
  // args.pane - the pane being resized
  // args.index - pane index
  // args.element - splitter element
  // args.cancel - set true to prevent

  console.log('Resize started for pane:', args.index);
};
</script>
```

### resizing

Fired continuously during resize:

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizing="onResizing"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onResizing = (args) => {
  // Use sparingly - fires very frequently
  const rect = args.pane.getBoundingClientRect();
  console.log(`Current: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
};
</script>
```

### resizeStop

Fired when resize ends:

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizeStop="onResizeStop"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onResizeStop = (args) => {
  console.log('Resize ended for pane:', args.index);
  // Save layout
};
</script>
```

## Preventing Resize on Specific Panes

### Disable Resize on a Pane

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :resizable="false">
        <div>Fixed size</div>
      </e-pane>
      <e-pane><div>Resizable</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Disable All Resizing

```vue
<template>
  <SplitterComponent height="400px" width="100%" :resizable="false">
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Conditional Resize Prevention

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizeStart="validateResize"
  >
    <e-panes>
      <e-pane size="200px" :resizable="true"><div>1</div></e-pane>
      <e-pane size="200px" :resizable="true"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';

const allowResize = ref(true);

const validateResize = (args) => {
  if (!allowResize.value) {
    args.cancel = true;
  }
};
</script>
```

## Dynamic Resize Configuration

### Toggle Resize on Click

```vue
<template>
  <div>
    <button @click="toggleResize">
      {{ resizable ? 'Lock' : 'Unlock' }} Panes
    </button>
    <SplitterComponent height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" :resizable="resizable"><div>1</div></e-pane>
        <e-pane :resizable="resizable"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const resizable = ref(true);
const toggleResize = () => { resizable.value = !resizable.value; };
</script>
```

### Update Min/Max Dynamically

```vue
<template>
  <div>
    <button @click="expandConstraints">Expand Range</button>
    <button @click="shrinkConstraints">Shrink Range</button>
    <SplitterComponent height="400px" width="100%">
      <e-panes>
        <e-pane
          size="200px"
          :min="minSize"
          :max="maxSize"
        >
          <div>Constrained: {{ minSize }} to {{ maxSize }}</div>
        </e-pane>
        <e-pane><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const minSize = ref('100px');
const maxSize = ref('400px');

const expandConstraints = () => {
  minSize.value = '50px';
  maxSize.value = '600px';
};

const shrinkConstraints = () => {
  minSize.value = '150px';
  maxSize.value = '300px';
};
</script>
```

## Resize Constraints and Validation

### Enforce Min Size in Handler

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizing="validateMinSize"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const MIN_SIZE = 100; // pixels

const validateMinSize = (args) => {
  const rect = args.pane.getBoundingClientRect();
  if (rect.width < MIN_SIZE) {
    args.pane.style.flexBasis = `${MIN_SIZE}px`;
  }
};
</script>
```

### Log All Resize Events

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizeStart="(e) => logEvent('start', e)"
    :resizing="(e) => logEvent('resizing', e)"
    :resizeStop="(e) => logEvent('stop', e)"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const logEvent = (type, args) => {
  console.log(`[${new Date().toISOString()}] resize${type}`, {
    index: args.index,
    size: args.pane.style.flexBasis
  });
};
</script>
```

### Save Layout on Resize Stop

```vue
<template>
  <SplitterComponent
    ref="splitterRef"
    id="save-on-resize"
    height="400px"
    width="100%"
    :resizeStop="saveLayout"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);

const saveLayout = () => {
  const panes = document.querySelectorAll('#save-on-resize .e-pane');
  const sizes = Array.from(panes).map(p => p.style.flexBasis);
  localStorage.setItem('splitterLayout', JSON.stringify(sizes));
};
</script>
```

### Restore Layout on Mount

```vue
<template>
  <SplitterComponent
    ref="splitterRef"
    id="restore-splitter"
    height="400px"
    width="100%"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);

onMounted(async () => {
  await nextTick();
  const saved = localStorage.getItem('splitterLayout');
  if (saved) {
    const sizes = JSON.parse(saved);
    const panes = document.querySelectorAll('#restore-splitter .e-pane');
    panes.forEach((pane, idx) => {
      if (sizes[idx]) pane.style.flexBasis = sizes[idx];
    });
  }
});
</script>
```

## Best Practices

1. **Debounce save operations**: Avoid excessive localStorage writes

2. **Use resizeStop for save**: resizing fires too frequently

3. **Validate in resizeStart**: Cancel early if resize shouldn't happen

4. **Use min/max for bounds**: Don't rely solely on event validation

5. **Provide visual feedback**: Show resize handles clearly

6. **Test touch behavior**: Verify mobile drag works

7. **Log sparingly**: Use resizing only when necessary

**Next:** Learn about [pane content and styling](splitter-pane-content-and-styling.md).
