# Inline Editing in Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Enabling Inline Editing](#enabling-inline-editing)
3. [Edit Modes](#edit-modes)
4. [Starting Edit Mode](#starting-edit-mode)
5. [Edit Validation](#edit-validation)
6. [Edit Events](#edit-events)
7. [Programmatic Editing](#programmatic-editing)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Custom Edit Templates](#custom-edit-templates)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

## Overview

Inline editing allows users to modify node text directly in the tree. Vue 3 TreeView supports multiple editing modes, validation, and customizable edit fields.

## Enabling Inline Editing

### Basic Inline Editing

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Resume.docx', parentID: '02' },
  { id: '04', name: 'CoverLetter.docx', parentID: '02' }
]);

const handleNodeEdited = (args) => {
  console.log('Node edited:', args.nodeData.name);
  // Updated data is automatically saved to the data array
};
</script>

<template>
  <div>
    <p>Double-click a node to edit, or select and press F2</p>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowEditing="true"
      @nodeEdited="handleNodeEdited"
    />
  </div>
</template>
```

### Disable Editing for Specific Nodes

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'System (Read-Only)', type: 'system' },
  { id: '02', name: 'Documents', type: 'editable', parentID: '01' },
  { id: '03', name: 'Resume.docx', type: 'editable', parentID: '02' },
  { id: '04', name: 'Config.ini', type: 'system', parentID: '01' }
]);

const handleNodeEditing = (args) => {
  const nodeData = data.value.find(n => n.id === args.nodeData.id);

  // Prevent editing of system nodes
  if (nodeData?.type === 'system') {
    args.cancel = true;
    console.log('Cannot edit system node');
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowEditing="true"
    @nodeEditing="handleNodeEditing"
  />
</template>
```

## Edit Modes

### How to Enter Edit Mode

TreeView supports multiple ways to enter edit mode:

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);

const data = ref([
  { id: '01', name: 'Item 1' },
  { id: '02', name: 'Item 2', parentID: '01' },
  { id: '03', name: 'Item 3', parentID: '01' }
]);

// Method 1: Double-click on node (automatic)
// Method 2: Press F2 on selected node (automatic)
// Method 3: Call beginEdit programmatically (see below)
</script>

<template>
  <ejs-treeview
    ref="treeviewRef"
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowEditing="true"
  />
</template>
```

## Starting Edit Mode

### Programmatic Edit Start

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);

const data = ref([
  { id: '01', name: 'Item 1' },
  { id: '02', name: 'Item 2', parentID: '01' },
  { id: '03', name: 'Item 3', parentID: '01' }
]);

const beginEditingNode = (nodeId) => {
  if (!treeviewRef.value) return;

  // Find the node element
  const nodeElement = document.querySelector(`[data-id="${nodeId}"]`);
  if (nodeElement) {
    // Double-click to trigger edit
    nodeElement.dispatchEvent(new Event('dblclick', { bubbles: true }));
  }
};

const editFirstNode = () => {
  beginEditingNode('01');
};

const editSelectedNode = () => {
  if (!treeviewRef.value) return;
  const selectedNodes = treeviewRef.value.selectedNodes || [];
  if (selectedNodes.length > 0) {
    beginEditingNode(selectedNodes[0]);
  }
};
</script>

<template>
  <div>
    <button @click="editFirstNode">Edit First Node</button>
    <button @click="editSelectedNode">Edit Selected</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowEditing="true"
      :allowMultiSelection="true"
    />
  </div>
</template>
```

## Edit Validation

### Text Content Validation

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Documents' },
  { id: '02', name: 'Files', parentID: '01' },
  { id: '03', name: 'ReadMe.txt', parentID: '02' }
]);

const handleNodeEditing = (args) => {
  // Prevent editing empty names
  if (!args.nodeData.name || args.nodeData.name.trim() === '') {
    args.cancel = true;
    alert('Node name cannot be empty');
    return;
  }

  console.log('Edit allowed for:', args.nodeData.name);
};

const handleNodeEdited = (args) => {
  const newName = args.nodeData.name;

  // Validate after editing
  if (newName.length < 3) {
    alert('Name must be at least 3 characters');
    // Revert to original name
    args.nodeData.name = args.previousNodeData.name;
  } else if (newName.length > 50) {
    alert('Name cannot exceed 50 characters');
    args.nodeData.name = args.previousNodeData.name;
  } else {
    console.log('Name updated to:', newName);
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowEditing="true"
    @nodeEditing="handleNodeEditing"
    @nodeEdited="handleNodeEdited"
  />
</template>
```

### Validation with Regex Pattern

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Documents' },
  { id: '02', name: 'ProjectA', parentID: '01', type: 'project' },
  { id: '03', name: 'ProjectB', parentID: '01', type: 'project' }
]);

const validateFileName = (name) => {
  // Only alphanumeric, spaces, and hyphens
  const validFileNamePattern = /^[a-zA-Z0-9\s\-_.()]+$/;
  return validFileNamePattern.test(name);
};

const validateProjectName = (name) => {
  // Must start with "Project"
  return name.startsWith('Project');
};

const handleNodeEdited = (args) => {
  const nodeData = data.value.find(n => n.id === args.nodeData.id);

  if (nodeData?.type === 'project') {
    if (!validateProjectName(args.nodeData.name)) {
      alert('Project name must start with "Project"');
      args.nodeData.name = args.previousNodeData.name;
      return;
    }
  }

  if (!validateFileName(args.nodeData.name)) {
    alert('Invalid characters in name');
    args.nodeData.name = args.previousNodeData.name;
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowEditing="true"
    @nodeEdited="handleNodeEdited"
  />
</template>
```

### Check for Duplicate Names

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Folder 1' },
  { id: '02', name: 'Folder 2', parentID: '01' },
  { id: '03', name: 'File 1', parentID: '02' },
  { id: '04', name: 'File 2', parentID: '02' }
]);

const isDuplicateName = (newName, nodeId, parentId) => {
  return data.value.some(
    node => node.name === newName && node.id !== nodeId && node.parentID === parentId
  );
};

const handleNodeEdited = (args) => {
  const nodeData = data.value.find(n => n.id === args.nodeData.id);

  if (isDuplicateName(args.nodeData.name, args.nodeData.id, nodeData?.parentID)) {
    alert(`"${args.nodeData.name}" already exists in this folder`);
    args.nodeData.name = args.previousNodeData.name;
  }
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowEditing="true"
    @nodeEdited="handleNodeEdited"
  />
</template>
```

## Edit Events

### Event Lifecycle

```vue
<script setup>
import { ref } from 'vue';

const eventLog = ref([]);

const data = ref([
  { id: '01', name: 'Item 1' },
  { id: '02', name: 'Item 2', parentID: '01' }
]);

const logEvent = (eventName, nodeData) => {
  eventLog.value.unshift({
    event: eventName,
    node: nodeData.name,
    time: new Date().toLocaleTimeString()
  });
};

const handleNodeEditing = (args) => {
  logEvent('nodeEditing', args.nodeData);
  // At this point, edit can be prevented
};

const handleNodeEditStart = (args) => {
  logEvent('nodeEditStart', args.nodeData);
  // Edit UI is rendered
};

const handleNodeEdited = (args) => {
  logEvent('nodeEdited', args.nodeData);
  // Edit completed, data updated
};

const handleNodeEditStop = (args) => {
  logEvent('nodeEditStop', args.nodeData);
  // Edit UI removed
};
</script>

<template>
  <div>
    <div class="event-log">
      <h3>Event Log</h3>
      <ul>
        <li v-for="(evt, idx) in eventLog" :key="idx">
          [{{ evt.time }}] {{ evt.event }} - {{ evt.node }}
        </li>
      </ul>
    </div>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowEditing="true"
      @nodeEditing="handleNodeEditing"
      @nodeEditStart="handleNodeEditStart"
      @nodeEdited="handleNodeEdited"
      @nodeEditStop="handleNodeEditStop"
    />
  </div>
</template>

<style scoped>
.event-log {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.event-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-log li {
  padding: 4px 0;
  font-size: 0.9em;
  border-bottom: 1px solid #ddd;
}
</style>
```

## Programmatic Editing

### Save Changes Programmatically

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const editingNode = ref(null);

const data = ref([
  { id: '01', name: 'Folder 1' },
  { id: '02', name: 'Folder 2', parentID: '01' },
  { id: '03', name: 'File.txt', parentID: '02' }
]);

const handleNodeEditStart = (args) => {
  editingNode.value = {
    id: args.nodeData.id,
    originalName: args.nodeData.name
  };
};

const saveEditedName = (newName) => {
  if (!editingNode.value) return;

  const nodeData = data.value.find(n => n.id === editingNode.value.id);
  if (nodeData) {
    nodeData.name = newName;
    editingNode.value = null;
    console.log('Saved:', newName);
  }
};

const cancelEditing = () => {
  if (editingNode.value && treeviewRef.value) {
    const nodeData = data.value.find(n => n.id === editingNode.value.id);
    if (nodeData) {
      nodeData.name = editingNode.value.originalName;
      editingNode.value = null;
    }
  }
};
</script>

<template>
  <div>
    <div v-if="editingNode" class="edit-toolbar">
      <input 
        v-model="editingNodeText" 
        @keyup.enter="saveEditedName(editingNodeText)"
        @keyup.escape="cancelEditing"
        placeholder="Enter new name"
      />
      <button @click="saveEditedName(editingNodeText)">Save</button>
      <button @click="cancelEditing">Cancel</button>
    </div>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowEditing="true"
      @nodeEditStart="handleNodeEditStart"
    />
  </div>
</template>

<style scoped>
.edit-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.edit-toolbar input {
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.edit-toolbar button {
  padding: 6px 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.edit-toolbar button:hover {
  background-color: #1976D2;
}
</style>
```

## Keyboard Shortcuts

### Standard Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F2 | Start editing selected node |
| Enter | Save changes |
| Escape | Cancel editing |
| Tab | Move to next field (if multiple fields) |

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Item 1' },
  { id: '02', name: 'Item 2', parentID: '01' },
  { id: '03', name: 'Item 3', parentID: '01' }
]);

const treeviewRef = ref(null);

const handleKeyDown = (args) => {
  if (!treeviewRef.value) return;

  const selectedNodes = treeviewRef.value.selectedNodes || [];
  if (selectedNodes.length === 0) return;

  // Custom shortcuts
  if (args.key === 'Delete') {
    const confirmed = confirm('Delete selected item?');
    if (confirmed) {
      // Handle deletion
      console.log('Deleting:', selectedNodes[0]);
    }
  }
  // F2 is handled automatically
};
</script>

<template>
  <div @keydown="handleKeyDown">
    <p>Select a node and press F2 to edit, Enter to save, Escape to cancel</p>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowEditing="true"
      :allowMultiSelection="true"
      tabindex="0"
    />
  </div>
</template>
```

## Custom Edit Templates

### Custom Edit Field

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Task 1', priority: 'high', dueDate: '2024-01-31' },
  { id: '02', name: 'Task 2', priority: 'normal', dueDate: '2024-02-15', parentID: '01' }
]);

const editingNodeId = ref(null);

const handleNodeEditing = (args) => {
  editingNodeId.value = args.nodeData.id;
};

const handleNodeEdited = (args) => {
  editingNodeId.value = null;
};
</script>

<template>
  <ejs-treeview
    :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    :allowEditing="true"
    @nodeEditing="handleNodeEditing"
    @nodeEdited="handleNodeEdited"
  >
    <template v-slot:nodeTemplate="{ data: node }">
      <div v-if="editingNodeId === node.id" class="custom-edit">
        <input 
          v-model="node.name"
          class="edit-field"
          @keyup.enter="handleNodeEdited({ nodeData: node })"
        />
        <select v-model="node.priority" class="edit-field">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <div v-else class="node-display">
        <strong>{{ node.name }}</strong>
        <span class="priority-label">{{ node.priority }}</span>
      </div>
    </template>
  </ejs-treeview>
</template>

<style scoped>
.custom-edit {
  display: flex;
  gap: 8px;
}

.edit-field {
  padding: 4px 8px;
  border: 1px solid #2196F3;
  border-radius: 3px;
  font-size: 0.95em;
}

.node-display {
  display: flex;
  gap: 8px;
  align-items: center;
}

.priority-label {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.85em;
}
</style>
```

## Best Practices

### Best Practices for Inline Editing

1. **Always validate input** - Check length, format, and uniqueness
2. **Provide clear feedback** - Show validation errors clearly
3. **Support keyboard shortcuts** - F2 to edit, Enter to save, Escape to cancel
4. **Prevent editing on protected nodes** - Use `@nodeEditing` event
5. **Save to backend** - Persist changes after validation
6. **Show edit indicators** - Make it clear when in edit mode

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  { id: '01', name: 'Protected', type: 'system' },
  { id: '02', name: 'Editable', type: 'user' }
]);

const editingNode = ref(null);
const validationError = ref(null);

const handleNodeEditing = (args) => {
  const nodeData = data.value.find(n => n.id === args.nodeData.id);
  
  if (nodeData?.type === 'system') {
    args.cancel = true;
    validationError.value = 'System nodes cannot be edited';
    return;
  }

  validationError.value = null;
  editingNode.value = args.nodeData.id;
};

const handleNodeEdited = async (args) => {
  // Validate
  if (args.nodeData.name.length < 3) {
    validationError.value = 'Name must be at least 3 characters';
    args.nodeData.name = args.previousNodeData.name;
    return;
  }

  // Save to backend
  try {
    // await api.updateNode(args.nodeData);
    validationError.value = null;
  } catch (error) {
    validationError.value = 'Failed to save changes';
    args.nodeData.name = args.previousNodeData.name;
  }

  editingNode.value = null;
};
</script>

<template>
  <div>
    <div v-if="validationError" class="error-message">
      ⚠️ {{ validationError }}
    </div>
    <ejs-treeview
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      :allowEditing="true"
      @nodeEditing="handleNodeEditing"
      @nodeEdited="handleNodeEdited"
    />
  </div>
</template>

<style scoped>
.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  border-left: 3px solid #c62828;
}
</style>
```

## Troubleshooting

### Issue: Editing not working

**Solution:** Ensure `:allowEditing="true"`

```vue
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  :allowEditing="true"  <!-- Required -->
/>
```

### Issue: F2 not starting edit

**Solution:** Ensure node is selected first

```vue
<ejs-treeview
  :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
  :allowEditing="true"
/>
<!-- Select a node, then press F2 -->
```

### Issue: Changes not saved

**Solution:** Update data directly in nodeEdited event

```vue
const handleNodeEdited = (args) => {
  // args.nodeData is already updated
  // Just validate and persist if needed
};
```

---

**Key Takeaways:**
- ✅ Enable with `:allowEditing="true"`
- ✅ Edit via double-click or F2 keyboard shortcut
- ✅ Use `@nodeEditing` to prevent editing (return `args.cancel = true`)
- ✅ Use `@nodeEdited` to validate and persist changes
- ✅ Support keyboard shortcuts: Enter (save), Escape (cancel)
- ✅ Always validate input length, format, and uniqueness
- ✅ Show clear error messages for validation failures
