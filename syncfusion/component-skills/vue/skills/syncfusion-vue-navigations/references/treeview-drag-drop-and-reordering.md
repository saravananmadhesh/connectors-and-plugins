# Drag-Drop and Reordering in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Enabling Drag and Drop](#enabling-drag-and-drop)
3. [Single Node Drag](#single-node-drag)
4. [Multi-Node Drag](#multi-node-drag)
5. [Drop Zones and Restrictions](#drop-zones-and-restrictions)
6. [Drag Validation](#drag-validation)
7. [Drop Prevention](#drop-prevention)
8. [Visual Feedback](#visual-feedback)
9. [Programmatic Dragging](#programmatic-dragging)
10. [Real-World Scenarios](#real-world-scenarios)
11. [Troubleshooting](#troubleshooting)

## Overview

TreeView drag-and-drop functionality allows users to reorganize tree structure by dragging nodes to new positions. Vue 3 TreeView provides events for validation, preventing operations, and custom handling of drop scenarios.

## Enabling Drag and Drop

### Basic Drag-Drop Setup

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Downloads', parentID: '01' },
  { id: '04', name: 'Music', parentID: '01' },
  { id: '05', name: 'Resume.docx', parentID: '02' },
  { id: '06', name: 'Software.exe', parentID: '03' }
]);

const handleNodeDropped = (args) => {
  console.log('Dropped:', args.draggedNodeData.name);
  console.log('On:', args.droppedNodeData.name);
  console.log('Position:', args.dropIndicator);
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowDragAndDrop="true"
    @nodeDropped="handleNodeDropped"
  />
</template>
```

### Disable Drag-Drop by Default

```vue
<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowDragAndDrop="false"  <!-- Drag-drop disabled -->
  />
</template>
```

## Single Node Drag

### Standard Single Node Dragging

```vue
<script setup>
import { ref } from 'vue';

const fileData = ref([
  { id: '01', name: 'src', type: 'folder' },
  { id: '02', name: 'components', parentID: '01', type: 'folder' },
  { id: '03', name: 'App.vue', parentID: '02', type: 'file' },
  { id: '04', name: 'utils', parentID: '01', type: 'folder' },
  { id: '05', name: 'helpers.ts', parentID: '04', type: 'file' }
]);

const dragLog = ref([]);

const handleNodeDragStart = (args) => {
  dragLog.value.unshift({
    action: 'Drag started',
    node: args.draggedNodeData.name,
    time: new Date().toLocaleTimeString()
  });
};

const handleNodeDropped = (args) => {
  dragLog.value.unshift({
    action: 'Dropped',
    from: args.draggedNodeData.name,
    to: args.droppedNodeData?.name || 'root',
    time: new Date().toLocaleTimeString()
  });
};

const handleNodeDragStop = (args) => {
  dragLog.value.unshift({
    action: 'Drag stopped',
    reason: args.cancelable ? 'Cancelled' : 'Completed',
    time: new Date().toLocaleTimeString()
  });
};
</script>

<template>
  <div>
    <div class="drag-log">
      <h3>Drag Activity Log</h3>
      <ul>
        <li v-for="(log, idx) in dragLog" :key="idx">
          [{{ log.time }}] {{ log.action }} - {{ log.node || log.from }}
        </li>
      </ul>
    </div>
    <ejs-treeview
      :fields="{ dataSource: fileData, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowDragAndDrop="true"
      @nodeDragStart="handleNodeDragStart"
      @nodeDropped="handleNodeDropped"
      @nodeDragStop="handleNodeDragStop"
    />
  </div>
</template>
```

## Multi-Node Drag

### Dragging Multiple Selected Nodes

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'src', type: 'folder' },
  { id: '02', name: 'components', parentID: '01', type: 'folder' },
  { id: '03', name: 'dialogs', parentID: '01', type: 'folder' },
  { id: '04', name: 'Button.vue', parentID: '02', type: 'file' },
  { id: '05', name: 'Input.vue', parentID: '02', type: 'file' },
  { id: '06', name: 'Modal.vue', parentID: '03', type: 'file' }
]);

const treeviewRef = ref(null);

const handleMultiNodeDrag = (args) => {
  // When dragging, all selected nodes are moved together
  if (!treeviewRef.value) return;

  const selectedNodes = treeviewRef.value.selectedNodes || [];
  console.log('Dragging nodes:', selectedNodes.length);
  console.log('Dragged node:', args.draggedNodeData.id);
};

const handleMultiNodeDrop = (args) => {
  console.log('Multi-node drop completed');
  console.log('Dropped node:', args.draggedNodeData.name);
  // All selected nodes are moved to new location
};
</script>

<template>
  <div>
    <p>Select multiple nodes with Ctrl+Click, then drag to move all</p>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowDragAndDrop="true"
      :allowMultiSelection="true"
      @nodeDragStart="handleMultiNodeDrag"
      @nodeDropped="handleMultiNodeDrop"
    />
  </div>
</template>
```

## Drop Zones and Restrictions

### Allow Drop Only on Specific Nodes

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Projects', type: 'root', allowDrop: true },
  { id: '02', name: 'Active Projects', parentID: '01', type: 'category', allowDrop: true },
  { id: '03', name: 'Archived Projects', parentID: '01', type: 'category', allowDrop: false },
  { id: '04', name: 'Project A', parentID: '02', type: 'project', allowDrop: false },
  { id: '05', name: 'Project B', parentID: '02', type: 'project', allowDrop: false }
]);

const handleNodeDropping = (args) => {
  const targetNode = data.value.find(n => n.id === args.droppedNodeData?.id);

  // Prevent drop on nodes where allowDrop is false
  if (targetNode && !targetNode.allowDrop) {
    args.cancel = true;
    console.log('Cannot drop on:', targetNode.name);
  }
};
</script>

<template>
  <div>
    <p>Try dragging projects - only drop zones allow it</p>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowDragAndDrop="true"
      @nodeDropping="handleNodeDropping"
    />
  </div>
</template>
```

### Restrict Drag from Certain Nodes

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'System', canDrag: false },
  { id: '02', name: 'Users', parentID: '01', canDrag: false },
  { id: '03', name: 'Documents', parentID: '01', canDrag: true },
  { id: '04', name: 'Desktop', parentID: '01', canDrag: true }
]);

const handleNodeDragStart = (args) => {
  const sourceNode = data.value.find(n => n.id === args.draggedNodeData.id);

  if (sourceNode && !sourceNode.canDrag) {
    args.cancel = true;
    console.log('Cannot drag system node:', sourceNode.name);
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowDragAndDrop="true"
    @nodeDragStart="handleNodeDragStart"
  />
</template>
```

## Drag Validation

### Validate Drop Location

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Backup', type: 'backup' },
  { id: '02', name: 'Photos', parentID: '01', type: 'folder' },
  { id: '03', name: 'Documents', parentID: '01', type: 'folder' },
  { id: '04', name: 'Vacation.jpg', parentID: '02', type: 'image' },
  { id: '05', name: 'Contract.docx', parentID: '03', type: 'document' }
]);

const handleNodeDropping = (args) => {
  const draggedNode = data.value.find(n => n.id === args.draggedNodeData.id);
  const droppedNode = data.value.find(n => n.id === args.droppedNodeData?.id);

  // Validate: Cannot move images to document folder
  if (draggedNode?.type === 'image' && droppedNode?.type === 'document-folder') {
    args.cancel = true;
    alert('Cannot move images to document folders');
    return;
  }

  // Validate: Cannot move documents to image folder
  if (draggedNode?.type === 'document' && droppedNode?.type === 'image-folder') {
    args.cancel = true;
    alert('Cannot move documents to image folders');
    return;
  }

  // Validate: Cannot move to same parent
  if (draggedNode?.parentID === droppedNode?.id) {
    args.cancel = true;
    alert('Already in this folder');
    return;
  }

  console.log('Drop validated successfully');
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowDragAndDrop="true"
    @nodeDropping="handleNodeDropping"
  />
</template>
```

## Drop Prevention

### Cancel Drop with Confirmation

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Important Files', type: 'system' },
  { id: '02', name: 'User Files', type: 'user' },
  { id: '03', name: 'Config.ini', parentID: '01', type: 'config' },
  { id: '04', name: 'README.txt', parentID: '02', type: 'text' }
]);

const handleNodeDropping = async (args) => {
  const draggedNode = data.value.find(n => n.id === args.draggedNodeData.id);
  const targetNode = data.value.find(n => n.id === args.droppedNodeData?.id);

  // Confirm before moving system files
  if (draggedNode?.type === 'config') {
    const confirmed = await new Promise(resolve => {
      const answer = confirm(
        `Move "${draggedNode.name}" to "${targetNode?.name || 'root'}"? This may affect system stability.`
      );
      resolve(answer);
    });

    if (!confirmed) {
      args.cancel = true;
    }
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowDragAndDrop="true"
    @nodeDropping="handleNodeDropping"
  />
</template>
```

## Visual Feedback

### Custom Drag Over Styling

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Target A' },
  { id: '02', name: 'Target B' },
  { id: '03', name: 'Item 1', parentID: '01' },
  { id: '04', name: 'Item 2', parentID: '02' }
]);

const dragOverElement = ref(null);

const handleNodeDragStart = (args) => {
  args.node.classList.add('dragging');
};

const handleNodeDragStop = (args) => {
  args.node.classList.remove('dragging');
  if (dragOverElement.value) {
    dragOverElement.value.classList.remove('drag-over');
    dragOverElement.value = null;
  }
};

const handleNodeDragEnter = (args) => {
  args.node.classList.add('drag-over');
  dragOverElement.value = args.node;
};

const handleNodeDragLeave = (args) => {
  args.node.classList.remove('drag-over');
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowDragAndDrop="true"
    @nodeDragStart="handleNodeDragStart"
    @nodeDragStop="handleNodeDragStop"
    @nodeDragEnter="handleNodeDragEnter"
    @nodeDragLeave="handleNodeDragLeave"
  />
</template>

<style scoped>
:deep(.e-treeview .e-list-item.dragging) {
  opacity: 0.5;
  background-color: #f0f0f0;
}

:deep(.e-treeview .e-list-item.drag-over) {
  background-color: #e3f2fd;
  border-left: 3px solid #2196f3;
}

:deep(.e-treeview .e-list-item.drag-over::before) {
  content: '✓ Can drop here';
  position: absolute;
  left: 0;
  color: #2196f3;
  font-weight: bold;
}
</style>
```

## Programmatic Dragging

### Simulate Drag-Drop via Code

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);

const data = ref([
  { id: '01', name: 'Source Folder' },
  { id: '02', name: 'Target Folder' },
  { id: '03', name: 'File 1', parentID: '01' },
  { id: '04', name: 'File 2', parentID: '01' }
]);

const moveNodeProgrammatically = () => {
  if (!treeviewRef.value) return;

  // Get the nodes to move and target
  const nodeToMove = data.value.find(n => n.id === '03');
  const targetParent = data.value.find(n => n.id === '02');

  if (nodeToMove && targetParent) {
    // Update parent ID
    nodeToMove.parentID = targetParent.id;

    // Trigger change detection
    data.value = [...data.value];

    console.log(`Moved ${nodeToMove.name} to ${targetParent.name}`);
  }
};

const swapNodes = () => {
  if (!treeviewRef.value) return;

  const node1 = data.value.find(n => n.id === '03');
  const node2 = data.value.find(n => n.id === '04');

  if (node1 && node2) {
    [node1.parentID, node2.parentID] = [node2.parentID, node1.parentID];
    data.value = [...data.value];
    console.log('Nodes swapped');
  }
};
</script>

<template>
  <div>
    <button @click="moveNodeProgrammatically">Move File 1 to Target</button>
    <button @click="swapNodes">Swap Files</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowDragAndDrop="true"
    />
  </div>
</template>
```

## Real-World Scenarios

### Kanban-Style Task Management

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'To Do', type: 'column', status: 'todo' },
  { id: '02', name: 'In Progress', type: 'column', status: 'inprogress' },
  { id: '03', name: 'Done', type: 'column', status: 'done' },
  { id: '04', name: 'Task 1', parentID: '01', type: 'task', priority: 'high' },
  { id: '05', name: 'Task 2', parentID: '01', type: 'task', priority: 'normal' },
  { id: '06', name: 'Task 3', parentID: '02', type: 'task', priority: 'high' }
]);

const treeviewRef = ref(null);
const taskLog = ref([]);

const handleNodeDropped = (args) => {
  const task = data.value.find(n => n.id === args.draggedNodeData.id);
  const newStatus = data.value.find(n => n.id === args.droppedNodeData?.id)?.status;

  if (task && newStatus) {
    task.status = newStatus;
    taskLog.value.unshift({
      task: task.name,
      status: newStatus,
      time: new Date().toLocaleTimeString()
    });
  }
};

const getStatusColor = (status) => {
  const colors = {
    todo: '#FF6B6B',
    inprogress: '#FFA500',
    done: '#4CAF50'
  };
  return colors[status] || '#999';
};
</script>

<template>
  <div class="kanban-container">
    <div class="kanban-board">
      <ejs-treeview
        ref="treeviewRef"
        :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
        :allowDragAndDrop="true"
        @nodeDropped="handleNodeDropped"
      >
        <template v-slot:nodeTemplate="{ data: node }">
          <div v-if="node.type === 'column'" class="kanban-column">
            {{ node.name }}
          </div>
          <div v-else class="kanban-task" :style="{ borderLeftColor: getStatusColor(node.status) }">
            <div class="task-priority">
              <span v-if="node.priority === 'high'" class="priority-badge-high">HIGH</span>
              <span v-else class="priority-badge-normal">NORMAL</span>
            </div>
            <div class="task-name">{{ node.name }}</div>
          </div>
        </template>
      </ejs-treeview>
    </div>

    <div class="task-log">
      <h3>Recent Moves</h3>
      <ul>
        <li v-for="(log, idx) in taskLog" :key="idx">
          {{ log.task }} → {{ log.status }} ({{ log.time }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.kanban-container {
  display: flex;
  gap: 20px;
}

.kanban-board {
  flex: 1;
}

.kanban-column {
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: bold;
  margin: 8px 0;
}

.kanban-task {
  background-color: #fff;
  border-left: 3px solid;
  padding: 8px 12px;
  margin: 8px 0 8px 16px;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: move;
}

.task-priority {
  min-width: 50px;
}

.priority-badge-high {
  background-color: #f44336;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7em;
}

.priority-badge-normal {
  background-color: #ff9800;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.7em;
}

.task-name {
  flex: 1;
}

.task-log {
  width: 250px;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}

.task-log h3 {
  margin-top: 0;
}

.task-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-log li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9em;
}
</style>
```

## Troubleshooting

### Issue: Drag not working

**Solution:** Ensure `:allowDragAndDrop="true"`

```vue
<!-- ❌ Wrong: -->
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
/>

<!-- ✅ Correct: -->
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  :allowDragAndDrop="true"
/>
```

### Issue: Drops not prevented even with cancel

**Solution:** Set `args.cancel = true` in `@nodeDropping` (not `@nodeDropped`)

```vue
<!-- ❌ Won't work: -->
@nodeDropped="(args) => { args.cancel = true; }"

<!-- ✅ Works: -->
@nodeDropping="(args) => { args.cancel = true; }"
```

### Issue: Drop data not updating

**Solution:** Trigger reactivity by reassigning data

```vue
// After modifying data:
data.value = [...data.value]; // Force reactivity
```

---

**Key Takeaways:**
- ✅ Enable with `:allowDragAndDrop="true"`
- ✅ Use `@nodeDragStart` to validate source node
- ✅ Use `@nodeDropping` to validate drop and prevent if needed
- ✅ Use `@nodeDropped` to handle successful drops
- ✅ Multi-node drag supported with `:allowMultiSelection="true"`
- ✅ Validate node types and restrictions in events
- ✅ Update data and trigger reactivity with spread operator
