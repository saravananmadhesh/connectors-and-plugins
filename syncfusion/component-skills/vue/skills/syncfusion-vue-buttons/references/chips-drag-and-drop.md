# Chips Drag and Drop

> Enable drag and drop functionality for chips with sorting and cross-container operations.

---

## Table of Contents

1. [Basic Drag and Drop](#basic-drag-and-drop)
2. [Restrict Drop Area](#restrict-drop-area)
3. [Drag and Drop Events](#drag-and-drop-events)
4. [Cross-Container Drag](#cross-container-drag)
5. [Custom Drag Behavior](#custom-drag-behavior)

---

## Basic Drag and Drop

Enable drag and drop to reorder chips:

```vue
<template>
  <div class="example-section">
    <h2>Drag and Drop Chips</h2>
    <p>Drag chips to reorder them:</p>
    
    <ejs-chiplist id="chip1"
      :data-source="dragChips"
      :enable-delete="true"
      @drag="onChipDrag"
      @drop="onChipDrop"
    ></ejs-chiplist>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const dragChips = ref([
  { text: 'Drag me 1' },
  { text: 'Drag me 2' },
  { text: 'Drag me 3' },
  { text: 'Drag me 4' }
]);

const onChipDrag = (args) => {
  console.log('Dragging chip:', args.text);
};

const onChipDrop = (args) => {
  console.log('Dropped chip:', args.text);
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

p {
  margin-bottom: 15px;
  color: #666;
}
</style>
```

---

## Restrict Drop Area

Limit where chips can be dropped:

```vue
<template>
  <div class="example-section">
    <h2>Restricted Drop Area</h2>
    
    <div class="container">
      <div class="source-zone">
        <h3>Source</h3>
        <ejs-chiplist id="chip2"
          ref="sourceChips"
          :data-source="sourceItems"
          @drag="onSourceDrag"
          @drop="onSourceDrop"
        />
      </div>
      
      <div class="target-zone">
        <h3>Drop Target</h3>
        <ejs-chiplist id="chip3"
          ref="targetChips"
          :data-source="targetItems"
          @drag-enter="onDragEnter"
          @drag-leave="onDragLeave"
          @drop="onTargetDrop"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const sourceChips = ref(null);
const targetChips = ref(null);

const sourceItems = ref([
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' }
]);

const targetItems = ref([]);

const onSourceDrag = (args) => {
  console.log('Source drag:', args.text);
};

const onSourceDrop = (args) => {
  // Prevent drop in source if already has max items
  if (sourceItems.value.length > 2) {
    args.cancel = true;
  }
};

const onDragEnter = (args) => {
  // Only allow specific chips
  if (args.text && args.text.includes('Item')) {
    args.dataTransfer.dropEffect = 'copy';
  }
};

const onDragLeave = (args) => {
  console.log('Drag left target zone');
};

const onTargetDrop = (args) => {
  // Move item from source to target
  const index = sourceItems.value.findIndex(item => item.text === args.text);
  if (index !== -1) {
    const [item] = sourceItems.value.splice(index, 1);
    targetItems.value.push(item);
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.container {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.source-zone,
.target-zone {
  flex: 1;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #fafafa;
  min-height: 150px;
}

.target-zone {
  background-color: #f0f7ff;
  border-color: #1976d2;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
}
</style>
```

---

## Drag and Drop Events

Handle drag and drop events:

```vue
<template>
  <div class="example-section">
    <h2>Drag and Drop Events</h2>
    
    <ejs-chiplist id="chip4"
      :data-source="eventChips"
      @drag-start="onDragStart"
      @drag-over="onDragOver"
      @drag-end="onDragEnd"
      @drop="onDrop"
    />
    
    <div class="event-log">
      <h3>Event Log:</h3>
      <div v-for="(log, index) in eventLogs" :key="index" class="log-entry">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const eventChips = ref([
  { text: 'Chip 1' },
  { text: 'Chip 2' },
  { text: 'Chip 3' }
]);

const eventLogs = ref([]);

const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLogs.value.push(`[${timestamp}] ${message}`);
  if (eventLogs.value.length > 10) {
    eventLogs.value.shift();
  }
};

const onDragStart = (args) => {
  addLog(`Drag started: ${args.text}`);
};

const onDragOver = (args) => {
  // Allow drop
  args.dataTransfer.dropEffect = 'move';
};

const onDragEnd = (args) => {
  addLog(`Drag ended: ${args.text}`);
};

const onDrop = (args) => {
  addLog(`Dropped: ${args.text}`);
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.event-log {
  margin-top: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.log-entry {
  padding: 4px 0;
  font-size: 12px;
  font-family: monospace;
  color: #333;
  border-bottom: 1px solid #eee;
}

.log-entry:last-child {
  border-bottom: none;
}
</style>
```

---

## Cross-Container Drag

Move chips between multiple containers:

```vue
<template>
  <div class="example-section">
    <h2>Cross-Container Drag and Drop</h2>
    
    <div class="containers">
      <div class="chip-container">
        <h3>All Technologies</h3>
        <ejs-chiplist id="chip5"
          :data-source="allTechs"
          @drop="moveToCategory"
        />
      </div>
      
      <div class="chip-container">
        <h3>Frontend</h3>
        <ejs-chiplist id="chip6"
          :data-source="frontendTechs"
          @drop="moveToCategoryFrontend"
        />
      </div>
      
      <div class="chip-container">
        <h3>Backend</h3>
        <ejs-chiplist id="chip7"
          :data-source="backendTechs"
          @drop="moveToCategoryBackend"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const allTechs = ref([
  { text: 'React', category: 'frontend' },
  { text: 'Vue', category: 'frontend' },
  { text: 'Node.js', category: 'backend' },
  { text: 'Python', category: 'backend' },
  { text: 'Unassigned', category: null }
]);

const frontendTechs = ref([]);
const backendTechs = ref([]);

const moveToCategory = (args) => {
  // This would be handled by custom drag implementation
};

const moveToCategoryFrontend = (args) => {
  const index = allTechs.value.findIndex(item => item.text === args.text);
  if (index !== -1) {
    const [item] = allTechs.value.splice(index, 1);
    item.category = 'frontend';
    frontendTechs.value.push(item);
  }
};

const moveToCategoryBackend = (args) => {
  const index = allTechs.value.findIndex(item => item.text === args.text);
  if (index !== -1) {
    const [item] = allTechs.value.splice(index, 1);
    item.category = 'backend';
    backendTechs.value.push(item);
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.containers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.chip-container {
  padding: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.chip-container h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.chip-container:nth-child(2) {
  border-color: #2196f3;
  background-color: #f0f7ff;
}

.chip-container:nth-child(3) {
  border-color: #4caf50;
  background-color: #f0f7ff;
}
</style>
```

---

## Custom Drag Behavior

Implement custom drag and drop logic:

```vue
<template>
  <div class="example-section">
    <h2>Custom Drag Behavior</h2>
    
    <ejs-chiplist id="chip8"
      ref="customDragChips"
      :data-source="customChips"
      @drag-start="customDragStart"
      @drag-over="customDragOver"
      @drop="customDrop"
    />
    
    <div class="drag-info">
      <p v-if="draggedChip">Currently dragging: <strong>{{ draggedChip.text }}</strong></p>
      <p v-if="draggedChip">Position: <strong>{{ dragPosition }}</strong></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const customDragChips = ref(null);
const customChips = ref([
  { text: 'Custom 1', id: 1 },
  { text: 'Custom 2', id: 2 },
  { text: 'Custom 3', id: 3 },
  { text: 'Custom 4', id: 4 }
]);

const draggedChip = ref(null);
const dragPosition = ref(null);

const customDragStart = (args) => {
  draggedChip.value = args;
  dragPosition.value = 'started';
};

const customDragOver = (args) => {
  dragPosition.value = 'over target';
  args.dataTransfer.dropEffect = 'move';
};

const customDrop = (args) => {
  if (draggedChip.value) {
    const draggedIndex = customChips.value.findIndex(
      chip => chip.id === draggedChip.value.id
    );
    const targetIndex = customChips.value.findIndex(
      chip => chip.text === args.text
    );
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Swap positions
      [customChips.value[draggedIndex], customChips.value[targetIndex]] = 
      [customChips.value[targetIndex], customChips.value[draggedIndex]];
    }
  }
  
  draggedChip.value = null;
  dragPosition.value = null;
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.drag-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #e3f2fd;
  border-left: 4px solid #1976d2;
  border-radius: 4px;
}

.drag-info p {
  margin: 5px 0;
  color: #333;
}

.drag-info strong {
  color: #1976d2;
}
</style>
```

---

## Next Steps

- Learn styling in [chips-style.md](chips-style.md)
- Check accessibility in [chips-accessibility.md](chips-accessibility.md)
- View complete API in [chips-api.md](chips-api.md)
- Go back to [chips-customization.md](chips-customization.md) for templates
