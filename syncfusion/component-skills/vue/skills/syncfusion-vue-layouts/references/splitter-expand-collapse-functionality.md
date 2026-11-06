# Splitter Expand & Collapse Functionality (Vue 3)

## Table of Contents
- [Collapsed State Initialization](#collapsed-state-initialization)
- [Button Integration for Expand/Collapse](#button-integration-for-expandcollapse)
- [User-Driven vs. Programmatic Collapse](#user-driven-vs-programmatic-collapse)
- [Event Handling Patterns](#event-handling-patterns)

## Collapsed State Initialization

### Initial Collapsed State

Set the `collapsed` property to render a pane in collapsed state:

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsed="true">
        <div>Initially collapsed</div>
      </e-pane>
      <e-pane>
        <div>Main content</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### All Panes Collapsed

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsed="true"><div>1</div></e-pane>
      <e-pane :collapsed="true"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Button Integration for Expand/Collapse

### Toggle Button for Pane

```vue
<template>
  <div>
    <button @click="toggleFirst">{{ isCollapsed ? 'Show' : 'Hide' }} Sidebar</button>
    <SplitterComponent ref="splitterRef" id="toggle-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" :collapsible="true" :collapsed="isCollapsed">
          <div>Sidebar content</div>
        </e-pane>
        <e-pane><div>Main content</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const isCollapsed = ref(false);

const toggleFirst = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>
```

### Imperative Collapse/Expand

```vue
<template>
  <div>
    <button @click="collapsePane(0)">Collapse First</button>
    <button @click="expandPane(0)">Expand First</button>
    <button @click="togglePane(0)">Toggle First</button>
    <SplitterComponent ref="splitterRef" id="imperative-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
        <e-pane><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);

const collapsePane = (index) => splitterRef.value?.collapse(index);
const expandPane = (index) => splitterRef.value?.expand(index);

const togglePane = (index) => {
  const pane = document.querySelectorAll('#imperative-splitter .e-pane')[index];
  if (pane.classList.contains('e-collapsed')) {
    splitterRef.value?.expand(index);
  } else {
    splitterRef.value?.collapse(index);
  }
};
</script>
```

## User-Driven vs. Programmatic Collapse

### User-Driven (Default Click Behavior)

Users can click the separator to collapse/expand when `collapsible: true`:

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsible="true">
        <div>Click separator to collapse me</div>
      </e-pane>
      <e-pane><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

### Programmatic-Only Collapse

```vue
<template>
  <div>
    <button @click="showPanel">Show Sidebar</button>
    <button @click="hidePanel">Hide Sidebar</button>
    <SplitterComponent ref="splitterRef" id="program-only" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" :collapsible="true">
          <div>Sidebar</div>
        </e-pane>
        <e-pane><div>Main</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const showPanel = () => splitterRef.value?.expand(0);
const hidePanel = () => splitterRef.value?.collapse(0);
</script>
```

### Disable User Collapse

```vue
<template>
  <SplitterComponent height="400px" width="100%">
    <e-panes>
      <e-pane size="200px" :collapsible="false">
        <div>Cannot be user-collapsed</div>
      </e-pane>
      <e-pane><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>
```

## Event Handling Patterns

### Confirm Before Collapse

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :beforeCollapse="onBeforeCollapse"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
      <e-pane><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
const onBeforeCollapse = (args) => {
  if (!confirm('Collapse this pane?')) {
    args.cancel = true;
  }
};
</script>
```

### Lazy Load on Expand

```vue
<template>
  <SplitterComponent
    height="400px"
    width="100%"
    :beforeExpand="onBeforeExpand"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true" :collapsed="true">
        <div>{{ content || 'Click expand to load' }}</div>
      </e-pane>
      <e-pane><div>Main</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('');
const onBeforeExpand = async (args) => {
  if (!content.value) {
    // Simulate API call
    await new Promise(r => setTimeout(r, 500));
    content.value = 'Loaded content';
  }
};
</script>
```

### Track Collapse State

```vue
<template>
  <div>
    <p>Pane 0: {{ pane0State }}</p>
    <p>Pane 1: {{ pane1State }}</p>
    <SplitterComponent
      ref="splitterRef"
      id="tracked-splitter"
      height="400px"
      width="100%"
      :collapsed="onCollapsed"
      :expanded="onExpanded"
    >
      <e-panes>
        <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
        <e-pane :collapsible="true"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const pane0State = ref('expanded');
const pane1State = ref('expanded');

const onCollapsed = (args) => {
  if (args.index === 0) pane0State.value = 'collapsed';
  if (args.index === 1) pane1State.value = 'collapsed';
};

const onExpanded = (args) => {
  if (args.index === 0) pane0State.value = 'expanded';
  if (args.index === 1) pane1State.value = 'expanded';
};
</script>
```

### Save Collapse State to LocalStorage

```vue
<template>
  <SplitterComponent
    ref="splitterRef"
    id="persistent-collapsed"
    height="400px"
    width="100%"
    :collapsed="onCollapsed"
    :expanded="onExpanded"
  >
    <e-panes>
      <e-pane size="200px" :collapsible="true"><div>1</div></e-pane>
      <e-pane :collapsible="true"><div>2</div></e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);

onMounted(() => {
  // Restore collapsed state
  const saved = localStorage.getItem('collapsedState');
  if (saved) {
    const states = JSON.parse(saved);
    states.forEach((collapsed, index) => {
      if (collapsed) splitterRef.value?.collapse(index);
    });
  }
});

const onCollapsed = (args) => saveState();
const onExpanded = (args) => saveState();

const saveState = () => {
  const states = [];
  for (let i = 0; i < 2; i++) {
    const pane = document.querySelectorAll('#persistent-collapsed .e-pane')[i];
    states.push(pane?.classList.contains('e-collapsed') || false);
  }
  localStorage.setItem('collapsedState', JSON.stringify(states));
};
</script>
```

## Best Practices

1. **Use collapsed for initial state**: Set true if pane should start hidden

2. **Combine programmatic and user collapse**: Allow both interaction models

3. **Lazy load content**: Use `beforeExpand` to defer expensive operations

4. **Persist collapse state**: Save user preferences across sessions

5. **Provide visual feedback**: Show clear expanded/collapsed indicators

6. **Consider accessibility**: Support keyboard collapse/expand

7. **Confirm destructive collapses**: Warn users if collapse loses work

**Next:** Learn about [resize behavior](splitter-resize-behavior.md).
