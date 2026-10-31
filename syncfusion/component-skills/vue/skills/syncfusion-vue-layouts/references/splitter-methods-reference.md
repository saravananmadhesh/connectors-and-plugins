# Splitter Methods Reference (Vue 3)

## Table of Contents
- [addPane](#addpane)
- [removePane](#removepane)
- [collapse](#collapse)
- [expand](#expand)
- [destroy](#destroy)
- [Real-World Examples](#real-world-examples)

## addPane

Dynamically add a new pane to the splitter.

```vue
<template>
  <div>
    <button @click="addNewPane">Add Pane</button>
    <SplitterComponent ref="splitterRef" id="dynamic-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px"><div>First Pane</div></e-pane>
        <e-pane size="200px"><div>Second Pane</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent, PaneDirective, PanesDirective } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
let counter = 0;

const addNewPane = () => {
  counter++;
  splitterRef.value?.addPane({
    size: '200px',
    content: `<div>Pane ${counter + 2}</div>`,
    min: '50px',
    resizable: true
  });
};
</script>
```

## removePane

Remove a pane by index.

```vue
<template>
  <div>
    <button @click="addPane">Add</button>
    <button @click="removeLastPane">Remove Last</button>
    <SplitterComponent ref="splitterRef" id="removable-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px"><div>1</div></e-pane>
        <e-pane size="200px"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);

const addPane = () => {
  splitterRef.value?.addPane({ size: '200px', content: '<div>New</div>' });
};

const removeLastPane = () => {
  // Get total pane count
  const paneElements = document.querySelectorAll('#removable-splitter .e-pane');
  const count = paneElements.length;
  if (count > 1) {
    splitterRef.value?.removePane(count - 1);
  }
};
</script>
```

## collapse

Programmatically collapse a pane by index.

```vue
<template>
  <div>
    <button @click="collapseFirst">Collapse First</button>
    <button @click="expandFirst">Expand First</button>
    <SplitterComponent ref="splitterRef" id="collapsible-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" :collapsible="true"><div>Collapsible</div></e-pane>
        <e-pane size="200px"><div>Other</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);

const collapseFirst = () => splitterRef.value?.collapse(0);
const expandFirst = () => splitterRef.value?.expand(0);
</script>
```

## expand

Programmatically expand a previously collapsed pane.

```vue
<script setup>
const togglePane = (index) => {
  // Get current state
  const pane = document.querySelectorAll('#my-splitter .e-pane')[index];
  if (pane.classList.contains('e-collapsed')) {
    splitterRef.value?.expand(index);
  } else {
    splitterRef.value?.collapse(index);
  }
};
</script>
```

## destroy

Destroy the splitter component and clean up resources.

```vue
<template>
  <div>
    <button @click="recreate">Recreate Splitter</button>
    <button @click="destroy">Destroy</button>
    <SplitterComponent v-if="!destroyed" ref="splitterRef" id="destroyable-splitter" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px"><div>1</div></e-pane>
        <e-pane size="200px"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const destroyed = ref(false);

const destroy = () => {
  splitterRef.value?.destroy();
  destroyed.value = true;
};

const recreate = () => {
  destroyed.value = false;
};
</script>
```

## Real-World Examples

### Example 1: Dynamic Tabbed Sidebar

```vue
<template>
  <div>
    <div class="toolbar">
      <button @click="addTab">+ Add Tab</button>
    </div>
    <SplitterComponent ref="splitterRef" id="tabbed-splitter" height="500px" width="100%">
      <e-panes>
        <e-pane v-for="(tab, idx) in tabs" :key="tab.id" size="200px" :resizable="idx === 0">
          <div class="tab-pane">
            <span>{{ tab.title }}</span>
            <button v-if="idx > 0" @click="removeTab(idx)">×</button>
          </div>
        </e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent, PaneDirective, PanesDirective } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const tabs = ref([
  { id: 1, title: 'Main' }
]);

const addTab = () => {
  const newTab = { id: Date.now(), title: `Tab ${tabs.value.length + 1}` };
  tabs.value.push(newTab);
  splitterRef.value?.addPane({
    size: '200px',
    content: `<div class="tab-pane"><span>${newTab.title}</span><button onclick="removeTab(${tabs.value.length - 1})">×</button></div>`,
    resizable: true
  });
};

const removeTab = (index) => {
  if (index === 0) return;
  tabs.value.splice(index, 1);
  splitterRef.value?.removePane(index);
};
</script>

<style scoped>
.tab-pane {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

### Example 2: Save/Restore Pane Sizes

```vue
<template>
  <div>
    <button @click="saveLayout">Save Layout</button>
    <button @click="restoreLayout">Restore</button>
    <SplitterComponent
      ref="splitterRef"
      id="persistent-splitter"
      height="400px"
      width="100%"
    >
      <e-panes>
        <e-pane size="200px"><div>Left</div></e-pane>
        <e-pane size="200px"><div>Right</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const STORAGE_KEY = 'splitterLayout';

const saveLayout = () => {
  const panes = document.querySelectorAll('#persistent-splitter .e-pane');
  const sizes = Array.from(panes).map(p => p.style.flexBasis);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sizes));
};

const restoreLayout = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const sizes = JSON.parse(saved);
  const panes = document.querySelectorAll('#persistent-splitter .e-pane');
  panes.forEach((pane, idx) => {
    if (sizes[idx]) pane.style.flexBasis = sizes[idx];
  });
};
</script>
```

### Example 3: Conditional Pane Visibility

```vue
<template>
  <div>
    <label>
      <input type="checkbox" v-model="showSidebar" />
      Show Sidebar
    </label>
    <SplitterComponent height="400px" width="100%">
      <e-panes>
        <e-pane v-if="showSidebar" size="200px">
          <div>Sidebar</div>
        </e-pane>
        <e-pane>
          <div>Main Content</div>
        </e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent, PaneDirective, PanesDirective } from '@syncfusion/ej2-vue-layouts';

const showSidebar = ref(true);
</script>
```

### Example 4: Programmatic Layout Switching

```vue
<template>
  <div>
    <button @click="setHorizontal">Horizontal</button>
    <button @click="setVertical">Vertical</button>
    <SplitterComponent
      ref="splitterRef"
      :orientation="orientation"
      height="400px"
      width="100%"
    >
      <e-panes>
        <e-pane size="200px"><div>1</div></e-pane>
        <e-pane size="200px"><div>2</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SplitterComponent } from '@syncfusion/ej2-vue-layouts';

const splitterRef = ref(null);
const orientation = ref('Horizontal');

const setHorizontal = () => { orientation.value = 'Horizontal'; };
const setVertical = () => { orientation.value = 'Vertical'; };
</script>
```

## Best Practices

1. **Check method availability**: Always use optional chaining (`?.`) when calling methods

2. **Validate pane count**: Don't allow remove below 1 pane

3. **Clean up on unmount**: Splitter handles its own cleanup, but check for memory leaks

4. **Use for dynamic UIs**: Add/remove panes based on user actions

5. **Provide visual feedback**: Show loading state when adding complex panes

6. **Save state when possible**: Persist pane sizes for better UX

7. **Test with all orientations**: Verify methods work for horizontal and vertical

**Next:** Learn about [events reference](splitter-events-reference.md) for event handling.
