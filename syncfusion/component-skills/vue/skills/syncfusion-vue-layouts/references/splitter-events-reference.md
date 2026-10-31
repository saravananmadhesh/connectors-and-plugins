# Splitter Events Reference (Vue 3)

## Table of Contents
- [created Event](#created-event)
- [beforeCollapse / collapsed Events](#beforecollapse--collapsed-events)
- [beforeExpand / expanded Events](#beforeexpand--expanded-events)
- [resizeStart / resizing / resizeStop Events](#resizestart--resizing--resizestop-events)
- [Event Handling Patterns](#event-handling-patterns)

## created Event

Fired when the splitter component is initialized.

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :created="onCreated"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onCreated = () => {
  console.log('Splitter initialized');
  // Initialize defaults, fetch data, etc.
};
</script>
```

## beforeCollapse / collapsed Events

### beforeCollapse

Fired before a pane collapses. Can be cancelled.

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :beforeCollapse="onBeforeCollapse"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onBeforeCollapse = (args) => {
  // args.pane - pane element
  // args.index - pane index
  // args.element - splitter element
  // args.cancel - set to true to prevent

  console.log('Before collapse:', args.index);

  // Example: prevent collapse if unsaved changes
  if (hasUnsavedChanges.value) {
    const confirm = window.confirm('Discard changes?');
    if (!confirm) {
      args.cancel = true;
    }
  }
};

const hasUnsavedChanges = ref(false);
</script>
```

### collapsed

Fired after a pane is collapsed.

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :collapsed="onCollapsed"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onCollapsed = (args) => {
  console.log('Pane collapsed:', args.index);
  // Update UI, save state, etc.
};
</script>
```

## beforeExpand / expanded Events

### beforeExpand

Fired before a pane expands. Useful for lazy loading.

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :beforeExpand="onBeforeExpand"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true" :collapsed="true">
        <div>Lazy Loaded</div>
      </e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

const onBeforeExpand = async (args) => {
  loading.value = true;
  // Load content for the pane
  await loadPaneContent(args.index);
  loading.value = false;
};

const loadPaneContent = async (index) => {
  // Simulate async load
  return new Promise(resolve => setTimeout(resolve, 500));
};
</script>
```

### expanded

Fired after a pane expands.

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :expanded="onExpanded"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onExpanded = (args) => {
  console.log('Pane expanded:', args.index);
  // Update UI state
};
</script>
```

## resizeStart / resizing / resizeStop Events

### resizeStart

Fired when resizing begins.

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
  // args.event - mouse/touch event
  // args.pane - pane element
  // args.index - pane index
  // args.element - splitter element
  // args.cancel - set to true to prevent

  console.log('Resize started for pane:', args.index);
};
</script>
```

### resizing

Fired continuously during resize.

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
  // Get current size from pane element
  const rect = args.pane.getBoundingClientRect();
  console.log('Current size:', rect.width, 'x', rect.height);
};
</script>
```

### resizeStop

Fired when resizing ends.

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    id="saving-splitter"
    :resizeStop="onResizeStop"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';

const splitterRef = ref(null);

const onResizeStop = () => {
  // Save the new layout
  const panes = document.querySelectorAll('#saving-splitter .e-pane');
  const sizes = Array.from(panes).map(p => p.style.flexBasis);
  localStorage.setItem('splitterSizes', JSON.stringify(sizes));
};
</script>
```

## Event Handling Patterns

### Pattern 1: Debounced Save

```vue
<template>
  <SplitterComponent
    ref="splitterRef"
    id="debounced-splitter"
    height="400px"
    width="100%"
    :resizeStop="debouncedSave"
  >
    <e-panes>
      <e-pane size="200px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const splitterRef = ref(null);
let saveTimer = null;

const debouncedSave = () => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const panes = document.querySelectorAll('#debounced-splitter .e-pane');
    const sizes = Array.from(panes).map(p => p.style.flexBasis);
    localStorage.setItem('layout', JSON.stringify(sizes));
  }, 500);
};

onUnmounted(() => {
  if (saveTimer) clearTimeout(saveTimer);
});
</script>
```

### Pattern 2: Track All Events for Logging

```vue
<template>
  <SplitterComponent
    id="logged-splitter"
    height="400px"
    width="100%"
    :created="(e) => log('created', e)"
    :resizeStart="(e) => log('resizeStart', e)"
    :resizeStop="(e) => log('resizeStop', e)"
    :beforeCollapse="(e) => log('beforeCollapse', e)"
    :collapsed="(e) => log('collapsed', e)"
    :beforeExpand="(e) => log('beforeExpand', e)"
    :expanded="(e) => log('expanded', e)"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const log = (event, args) => {
  console.log(`[${new Date().toISOString()}] ${event}`, args);
};
</script>
```

### Pattern 3: Validate Resize Against Min/Max

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :resizeStart="validateResize"
  >
    <e-panes>
      <e-pane size="200px" min="100px" max="400px"><div>1</div></e-pane>
      <e-pane size="200px"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const validateResize = (args) => {
  // Custom validation logic
  console.log('Validating resize for pane:', args.index);
  // args.cancel = true if invalid
};
</script>
```

### Pattern 4: Async Data Loading on Expand

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :beforeExpand="onBeforeExpand"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true" :collapsed="true">
        <div v-if="!loaded">Loading...</div>
        <div v-else>{{ content }}</div>
      </e-pane>
      <e-pane size="200px"><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';

const loaded = ref(false);
const content = ref('');

const onBeforeExpand = async (args) => {
  if (!loaded.value) {
    // Simulate API call
    await new Promise(r => setTimeout(r, 800));
    content.value = 'Loaded dynamically!';
    loaded.value = true;
  }
};
</script>
```

## Complete Event Reference Table

| Event | Fired When | Cancellable | Args |
|-------|-----------|-------------|------|
| `created` | Component initialized | No | - |
| `beforeCollapse` | Before pane collapses | Yes | `CollapseEventArgs` |
| `collapsed` | After pane collapses | No | `CollapseEventArgs` |
| `beforeExpand` | Before pane expands | Yes | `ExpandEventArgs` |
| `expanded` | After pane expands | No | `ExpandEventArgs` |
| `resizeStart` | Resize begins | Yes | `ResizeEventArgs` |
| `resizing` | During resize | No | `ResizeEventArgs` |
| `resizeStop` | Resize ends | No | `ResizeEventArgs` |

## Event Argument Types

```typescript
interface CollapseEventArgs {
  pane: HTMLElement;
  index: number;
  element: HTMLElement;
  cancel: boolean;
}

interface ExpandEventArgs {
  pane: HTMLElement;
  index: number;
  element: HTMLElement;
  cancel: boolean;
}

interface ResizeEventArgs {
  pane: HTMLElement;
  index: number;
  element: HTMLElement;
  event: MouseEvent | TouchEvent;
  cancel: boolean;
}
```

**Next:** Learn about [pane layout configuration](splitter-pane-layout-configuration.md) for layout patterns.
