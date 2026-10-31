# Drag and Drop Reordering

## Table of Contents
- [Enable Drag and Drop](#enable-drag-and-drop)
- [Drag Events](#drag-events)
- [Drag Constraints](#drag-constraints)
- [Tab Reordering Logic](#tab-reordering-logic)
- [Multi-Container Transfers](#multi-container-transfers)
- [Advanced Scenarios](#advanced-scenarios)

## Enable Drag and Drop

### Basic Drag and Drop Setup

Enable drag-and-drop functionality using the `allowDragAndDrop` property:

```vue
<template>
  <ejs-tab :allowDragAndDrop="true">
    <e-tab-items>
      <e-tab-item :header="{ text: 'Tab 1' }">
        <template #content>Drag this tab to reorder</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 2' }">
        <template #content>You can reorder tabs freely</template>
      </e-tab-item>
      <e-tab-item :header="{ text: 'Tab 3' }">
        <template #content>Drop to rearrange order</template>
      </e-tab-item>
    </e-tab-items>
  </ejs-tab>
</template>

<script setup>
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

**When to use**: Task management apps, customizable interfaces, user preference layouts

### Disable and Enable Dynamically

```vue
<template>
  <div>
    <button @click="toggleDragDrop">{{ dragEnabled ? 'Disable' : 'Enable' }} Drag & Drop</button>
    <p v-if="dragEnabled" style="color: green">✓ Drag and drop is enabled</p>
    <p v-else style="color: red">✗ Drag and drop is disabled</p>
    
    <ejs-tab :allowDragAndDrop="dragEnabled">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>Tab 1 content</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>Tab 2 content</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>Tab 3 content</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const dragEnabled = ref(false);

const toggleDragDrop = () => {
  dragEnabled.value = !dragEnabled.value;
};
</script>
```

## Drag Events

### Event Lifecycle

Tab drag-and-drop emits three events during the drag operation:

| Event | Fired | Arguments |
|-------|-------|-----------|
| `@dragStart` | When drag begins | tabIndex, draggedElement |
| `@dragging` | During drag movement | tabIndex, draggedElement |
| `@dragged` | When dropped | draggedIndex, droppedIndex |

### Drag Start Event

Fired when a user starts dragging a tab:

```vue
<template>
  <div>
    <p>Last drag started from: <strong>{{ dragStartInfo }}</strong></p>
    
    <ejs-tab :allowDragAndDrop="true" @dragStart="handleDragStart">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Draggable 1' }">
          <template #content>Content 1</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Draggable 2' }">
          <template #content>Content 2</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Draggable 3' }">
          <template #content>Content 3</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const dragStartInfo = ref('None');

const handleDragStart = (args) => {
  dragStartInfo.value = `Tab ${args.tabIndex + 1} started dragging`;
  console.log('Drag started:', args);
};
</script>
```

### Dragging Event

Fired continuously during drag movement:

```vue
<template>
  <div>
    <p>Currently dragging: <strong>{{ draggingInfo }}</strong></p>
    
    <ejs-tab :allowDragAndDrop="true" @dragging="handleDragging">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab A' }">
          <template #content>Content A</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab B' }">
          <template #content>Content B</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab C' }">
          <template #content>Content C</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const draggingInfo = ref('Waiting...');

const handleDragging = (args) => {
  draggingInfo.value = `Moving Tab ${args.tabIndex + 1}`;
};
</script>
```

### Dragged Event

Fired when tab is successfully dropped:

```vue
<template>
  <div>
    <p>Last action: <strong>{{ dragResult }}</strong></p>
    
    <ejs-tab :allowDragAndDrop="true" @dragged="handleDragged">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Position 1' }">
          <template #content>First position</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Position 2' }">
          <template #content>Second position</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Position 3' }">
          <template #content>Third position</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const dragResult = ref('Ready');

const handleDragged = (args) => {
  dragResult.value = `Tab moved from position ${args.draggedIndex + 1} to position ${args.droppedIndex + 1}`;
  console.log('Drag completed:', args);
};
</script>
```

## Drag Constraints

### Prevent Specific Tabs from Being Dragged

```vue
<template>
  <div>
    <p>The "Home" tab (first) cannot be dragged - it's fixed</p>
    
    <ejs-tab :allowDragAndDrop="true" @dragStart="handleDragStart">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Home' }">
          <template #content>Home tab is locked in place</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'About' }">
          <template #content>Draggable tab</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Services' }">
          <template #content>Draggable tab</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Contact' }">
          <template #content>Contact tab is locked</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const lockedTabs = [0, 3]; // Indices of tabs that cannot be dragged

const handleDragStart = (args) => {
  if (lockedTabs.includes(args.tabIndex)) {
    args.cancel = true; // Cancel the drag operation
    console.log(`Tab ${args.tabIndex} is locked and cannot be dragged`);
  }
};
</script>
```

### Prevent Dropping into Specific Areas

```vue
<template>
  <div>
    <p>Tabs can only be reordered within a safe zone (middle tabs)</p>
    
    <ejs-tab :allowDragAndDrop="true" @dragged="handleDragged">
      <e-tab-items>
        <e-tab-item :header="{ text: 'Overview' }">
          <template #content>Must stay first</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Flexible A' }">
          <template #content>Can move freely</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Flexible B' }">
          <template #content>Can move freely</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Help' }">
          <template #content>Must stay last</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const handleDragged = (args) => {
  const totalTabs = 4;
  const firstLocked = 0;
  const lastLocked = totalTabs - 1;
  
  if (args.droppedIndex === firstLocked || args.droppedIndex === lastLocked) {
    console.log('Cannot drop on boundary tabs');
    // Revert the change or show notification
  }
};
</script>
```

## Tab Reordering Logic

### Track Tab Order Changes

```vue
<template>
  <div>
    <h3>Current Tab Order</h3>
    <ol>
      <li v-for="(tab, index) in tabOrder" :key="index">{{ tab }}</li>
    </ol>
    
    <h3>Reorderable Tabs</h3>
    <ejs-tab :allowDragAndDrop="true" @dragged="handleTabReorder">
      <e-tab-items>
        <e-tab-item 
          v-for="(tab, index) in tabOrder" 
          :key="index"
          :header="{ text: tab }"
        >
          <template #content>{{ tab }} content</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const tabOrder = ref(['Dashboard', 'Analytics', 'Reports', 'Settings']);

const handleTabReorder = (args) => {
  // Create a copy and reorder
  const newOrder = [...tabOrder.value];
  const [removed] = newOrder.splice(args.draggedIndex, 1);
  newOrder.splice(args.droppedIndex, 0, removed);
  tabOrder.value = newOrder;
  
  console.log('New order:', tabOrder.value);
};
</script>
```

### Persist Order to Local Storage

```vue
<template>
  <div>
    <button @click="resetOrder">Reset to Default</button>
    <button @click="saveOrder">Save Order</button>
    
    <ejs-tab :allowDragAndDrop="true" @dragged="handleTabReorder">
      <e-tab-items>
        <e-tab-item 
          v-for="(tab, index) in tabOrder" 
          :key="index"
          :header="{ text: tab }"
        >
          <template #content>{{ tab }} content - Order position: {{ index + 1 }}</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const defaultOrder = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];
const tabOrder = ref([...defaultOrder]);

const handleTabReorder = (args) => {
  const newOrder = [...tabOrder.value];
  const [removed] = newOrder.splice(args.draggedIndex, 1);
  newOrder.splice(args.droppedIndex, 0, removed);
  tabOrder.value = newOrder;
};

const saveOrder = () => {
  localStorage.setItem('tabOrder', JSON.stringify(tabOrder.value));
  alert('Tab order saved!');
};

const resetOrder = () => {
  tabOrder.value = [...defaultOrder];
  localStorage.removeItem('tabOrder');
};

onMounted(() => {
  const saved = localStorage.getItem('tabOrder');
  if (saved) {
    tabOrder.value = JSON.parse(saved);
  }
});
</script>
```

## Multi-Container Transfers

### Drag Between Two Tab Components

```vue
<template>
  <div style="display: flex; gap: 20px">
    <div style="flex: 1">
      <h3>Source Tabs</h3>
      <ejs-tab :allowDragAndDrop="true" @dragged="handleSourceDrag">
        <e-tab-items>
          <e-tab-item 
            v-for="(tab, index) in sourceTabs" 
            :key="index"
            :header="{ text: tab }"
          >
            <template #content>{{ tab }} from source</template>
          </e-tab-item>
        </e-tab-items>
      </ejs-tab>
    </div>
    
    <div style="flex: 1">
      <h3>Destination Tabs</h3>
      <ejs-tab :allowDragAndDrop="true" @dragged="handleDestDrag">
        <e-tab-items>
          <e-tab-item 
            v-for="(tab, index) in destTabs" 
            :key="index"
            :header="{ text: tab }"
          >
            <template #content>{{ tab }} in destination</template>
          </e-tab-item>
        </e-tab-items>
      </ejs-tab>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const sourceTabs = ref(['Item A', 'Item B', 'Item C']);
const destTabs = ref(['Item 1', 'Item 2']);

const handleSourceDrag = (args) => {
  // Could move tab from source to destination
  console.log('Dragged from source:', args);
};

const handleDestDrag = (args) => {
  // Could move tab within destination
  console.log('Dragged in destination:', args);
};
</script>
```

## Advanced Scenarios

### Drag with Preview

```vue
<template>
  <div>
    <div v-if="dragPreview" class="drag-preview">
      {{ dragPreview }}
    </div>
    
    <ejs-tab 
      :allowDragAndDrop="true" 
      @dragStart="handleDragStart"
      @dragging="handleDragging"
      @dragged="handleDragged"
    >
      <e-tab-items>
        <e-tab-item :header="{ text: 'Tab 1' }">
          <template #content>Content 1</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 2' }">
          <template #content>Content 2</template>
        </e-tab-item>
        <e-tab-item :header="{ text: 'Tab 3' }">
          <template #content>Content 3</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const dragPreview = ref('');

const handleDragStart = (args) => {
  dragPreview.value = `Dragging: Tab ${args.tabIndex + 1}`;
};

const handleDragging = (args) => {
  // Keep preview visible while dragging
};

const handleDragged = (args) => {
  dragPreview.value = '';
};
</script>

<style scoped>
.drag-preview {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1000;
  top: 10px;
  right: 10px;
}
</style>
```

### Drag with Undo/Redo

```vue
<template>
  <div>
    <div style="margin-bottom: 10px">
      <button @click="undo" :disabled="!canUndo">Undo</button>
      <button @click="redo" :disabled="!canRedo">Redo</button>
    </div>
    
    <ejs-tab :allowDragAndDrop="true" @dragged="handleDragged">
      <e-tab-items>
        <e-tab-item 
          v-for="(tab, index) in currentOrder" 
          :key="index"
          :header="{ text: tab }"
        >
          <template #content>{{ tab }} content</template>
        </e-tab-item>
      </e-tab-items>
    </ejs-tab>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-vue-navigations';

const defaultOrder = ['Tab A', 'Tab B', 'Tab C', 'Tab D'];
const history = ref([[...defaultOrder]]);
const historyIndex = ref(0);

const currentOrder = computed(() => history.value[historyIndex.value]);
const canUndo = computed(() => historyIndex.value > 0);
const canRedo = computed(() => historyIndex.value < history.value.length - 1);

const handleDragged = (args) => {
  const newOrder = [...currentOrder.value];
  const [removed] = newOrder.splice(args.draggedIndex, 1);
  newOrder.splice(args.droppedIndex, 0, removed);
  
  // Clear redo history
  history.value = history.value.slice(0, historyIndex.value + 1);
  
  // Add new state
  history.value.push(newOrder);
  historyIndex.value++;
};

const undo = () => {
  if (canUndo.value) {
    historyIndex.value--;
  }
};

const redo = () => {
  if (canRedo.value) {
    historyIndex.value++;
  }
};
</script>
```

## Best Practices

1. **Provide visual feedback**: Show which tab is being dragged or where it will be dropped
2. **Prevent invalid drops**: Use drag constraints to prevent reordering of critical tabs
3. **Persist changes**: Save tab order to local storage or backend database
4. **Test on touch devices**: Drag-and-drop should work smoothly on mobile and tablets
5. **Show indicators**: Highlight drop zones or use insertion indicators
6. **Provide undo/redo**: Allow users to revert accidental reorderings
7. **Document restrictions**: Make clear which tabs can be dragged and where
8. **Performance**: For many tabs, consider virtual scrolling with drag-and-drop
