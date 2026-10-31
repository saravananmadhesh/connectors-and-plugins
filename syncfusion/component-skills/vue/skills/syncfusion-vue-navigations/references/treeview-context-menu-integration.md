# Context Menu Integration with Vue 3 TreeView

## Table of Contents
1. [Overview](#overview)
2. [Basic Context Menu Setup](#basic-context-menu-setup)
3. [TreeView and ContextMenu Integration](#treeview-and-contextmenu-integration)
4. [Node Operations via Menu](#node-operations-via-menu)
5. [Conditional Menu Items](#conditional-menu-items)
6. [Dynamic Menu Visibility](#dynamic-menu-visibility)
7. [Menu Item State](#menu-item-state)
8. [Real-World File Manager](#real-world-file-manager)
9. [Advanced Patterns](#advanced-patterns)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

## Overview

TreeView integrates seamlessly with Syncfusion ContextMenu for right-click operations. This enables powerful node management without cluttering the UI with buttons.

## Basic Context Menu Setup

### Install Dependencies

```bash
npm install @syncfusion/ej2-vue-popups
```

### Import ContextMenu

```vue
<script setup>
import { ContextMenuComponent } from '@syncfusion/ej2-vue-popups';
</script>

<template>
  <ejs-contextmenu
    id="contextmenu"
    :items="menuItems"
    @beforeOpen="onBeforeOpen"
    @select="onSelect"
  />
</template>
```

## TreeView and ContextMenu Integration

### Complete Integration Setup

```vue
<script setup>
import { ref } from 'vue';
import { ContextMenuComponent } from '@syncfusion/ej2-vue-popups';

const treeviewRef = ref(null);
const contextMenuRef = ref(null);
const selectedNode = ref(null);

const data = ref([
  { id: '01', name: 'Desktop' },
  { id: '02', name: 'Documents', parentID: '01' },
  { id: '03', name: 'Report.pdf', parentID: '02' },
  { id: '04', name: 'Downloads', parentID: '01' }
]);

const menuItems = ref([
  { text: 'New Folder', iconCss: 'e-icons e-folder-new', id: 'new' },
  { text: 'Rename', iconCss: 'e-icons e-rename', id: 'rename' },
  { separator: true },
  { text: 'Cut', iconCss: 'e-icons e-cut', id: 'cut' },
  { text: 'Copy', iconCss: 'e-icons e-copy', id: 'copy' },
  { text: 'Paste', iconCss: 'e-icons e-paste', id: 'paste' },
  { separator: true },
  { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' },
  { separator: true },
  { text: 'Properties', iconCss: 'e-icons e-properties', id: 'properties' }
]);

const onBeforeOpen = (args) => {
  // Get target element and corresponding TreeView node
  const treeElement = treeviewRef.value?.$el;
  if (args.event && args.event.target.closest('.e-list-item')) {
    selectedNode.value = args.event.target.closest('.e-list-item');
  }
};

const onSelect = (args) => {
  switch(args.item.id) {
    case 'new':
      handleNewFolder();
      break;
    case 'rename':
      handleRename();
      break;
    case 'cut':
      handleCut();
      break;
    case 'copy':
      handleCopy();
      break;
    case 'paste':
      handlePaste();
      break;
    case 'delete':
      handleDelete();
      break;
    case 'properties':
      handleProperties();
      break;
  }
};

const handleNewFolder = () => {
  console.log('Creating new folder...');
};

const handleRename = () => {
  console.log('Renaming node...');
  if (treeviewRef.value && selectedNode.value) {
    const nodeData = getNodeDataFromElement(selectedNode.value);
    treeviewRef.value.beginEdit(nodeData);
  }
};

const handleCut = () => {
  console.log('Cutting node...');
};

const handleCopy = () => {
  console.log('Copying node...');
};

const handlePaste = () => {
  console.log('Pasting node...');
};

const handleDelete = () => {
  console.log('Deleting node...');
  if (treeviewRef.value && selectedNode.value) {
    const nodeData = getNodeDataFromElement(selectedNode.value);
    treeviewRef.value.removeNodes([nodeData.id]);
  }
};

const handleProperties = () => {
  console.log('Showing properties...');
};

const getNodeDataFromElement = (element) => {
  // This would normally extract node data from the element
  // In practice, you'd maintain a mapping of elements to nodes
  return { id: '01', name: 'Desktop' };
};
</script>

<template>
  <div>
    <ejs-contextmenu
      ref="contextMenuRef"
      id="contextmenu"
      :items="menuItems"
      target=".e-treeview"
      @beforeOpen="onBeforeOpen"
      @select="onSelect"
    />
    
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
:deep(.e-contextmenu) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

:deep(.e-contextmenu .e-menu-item:hover) {
  background-color: #e3f2fd;
}
</style>
```

## Node Operations via Menu

### Add Node from Menu

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const dialogVisible = ref(false);
const newNodeName = ref('');

const data = ref([
  { id: '01', name: 'Folder 1' },
  { id: '02', name: 'File 1.txt', parentID: '01' }
]);

const addNodeUnderSelected = () => {
  if (!treeviewRef.value || !newNodeName.value) return;

  const selectedNodes = treeviewRef.value.getSelectedNodes();
  const parentId = selectedNodes[0] || '01';

  const newNode = {
    id: `${Date.now()}`,
    name: newNodeName.value,
    parentID: parentId
  };

  // Add to TreeView
  treeviewRef.value.addNodes([newNode], parentId, 0);
  newNodeName.value = '';
  dialogVisible.value = false;
};

const menuItems = ref([
  { text: 'New Folder', id: 'new_folder' },
  { text: 'New File', id: 'new_file' }
]);

const handleMenuSelect = (args) => {
  if (args.item.id === 'new_folder' || args.item.id === 'new_file') {
    dialogVisible.value = true;
  }
};
</script>

<template>
  <div>
    <!-- Dialog for new node -->
    <div v-if="dialogVisible" class="dialog-overlay">
      <div class="dialog">
        <h2>New Item</h2>
        <input 
          v-model="newNodeName"
          type="text"
          placeholder="Enter name..."
          @keyup.enter="addNodeUnderSelected"
        />
        <div class="dialog-buttons">
          <button @click="addNodeUnderSelected">Create</button>
          <button @click="dialogVisible = false">Cancel</button>
        </div>
      </div>
    </div>

    <ejs-contextmenu
      id="contextmenu"
      :items="menuItems"
      target=".e-treeview"
      @select="handleMenuSelect"
    />
    
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  min-width: 300px;
}

.dialog h2 {
  margin-top: 0;
}

.dialog input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.dialog-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.dialog-buttons button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
}

.dialog-buttons button:first-child {
  background-color: #2196f3;
  color: white;
  border-color: #2196f3;
}
</style>
```

## Conditional Menu Items

### Show Menu Items Based on Node Type

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const contextMenuRef = ref(null);
const selectedNodeData = ref(null);

const data = ref([
  { id: '01', name: 'Folder 1', type: 'folder' },
  { id: '02', name: 'Document.pdf', parentID: '01', type: 'file' },
  { id: '03', name: 'Image.jpg', parentID: '01', type: 'file' }
]);

const menuItems = ref([
  { text: 'Open', iconCss: 'e-icons e-open', id: 'open' },
  { text: 'Download', iconCss: 'e-icons e-download', id: 'download' },
  { separator: true },
  { text: 'Delete', iconCss: 'e-icons e-delete', id: 'delete' }
]);

const onBeforeOpen = (args) => {
  const target = args.event?.target;
  if (!target) return;

  const element = target.closest('.e-list-item');
  if (element) {
    // Get node data from element
    const nodes = treeviewRef.value?.getNode(element);
    selectedNodeData.value = nodes?.data;

    // Dynamically update menu items
    updateMenuItems(selectedNodeData.value);
  }
};

const updateMenuItems = (nodeData) => {
  if (!nodeData) return;

  if (nodeData.type === 'folder') {
    menuItems.value = [
      { text: 'New File', id: 'new_file' },
      { text: 'New Folder', id: 'new_folder' },
      { separator: true },
      { text: 'Rename', id: 'rename' },
      { separator: true },
      { text: 'Delete', id: 'delete' }
    ];
  } else {
    menuItems.value = [
      { text: 'Open', id: 'open' },
      { text: 'Download', id: 'download' },
      { text: 'Edit', id: 'edit' },
      { separator: true },
      { text: 'Delete', id: 'delete' }
    ];
  }
};

const handleMenuSelect = (args) => {
  console.log(`Selected: ${args.item.text} for ${selectedNodeData.value?.name}`);
};
</script>

<template>
  <div>
    <ejs-contextmenu
      ref="contextMenuRef"
      id="contextmenu"
      :items="menuItems"
      target=".e-treeview"
      @beforeOpen="onBeforeOpen"
      @select="handleMenuSelect"
    />
    
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>
```

## Dynamic Menu Visibility

### Disable Menu Items Conditionally

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const selectedNodeData = ref(null);
const clipboard = ref(null);

const data = ref([
  { id: '01', name: 'Root', locked: false },
  { id: '02', name: 'System', parentID: '01', locked: true },
  { id: '03', name: 'User File', parentID: '01', locked: false }
]);

const menuItems = ref([
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  { text: 'Delete', id: 'delete' }
]);

const beforeMenuItemRender = (args) => {
  if (!selectedNodeData.value) return;

  // Disable delete for locked items
  if (args.item.id === 'delete' && selectedNodeData.value.locked) {
    args.element.classList.add('e-disabled');
    args.item.disabled = true;
  }

  // Disable paste if nothing in clipboard
  if (args.item.id === 'paste' && !clipboard.value) {
    args.element.classList.add('e-disabled');
    args.item.disabled = true;
  }
};

const handleMenuSelect = (args) => {
  if (args.item.id === 'cut' || args.item.id === 'copy') {
    clipboard.value = selectedNodeData.value;
  } else if (args.item.id === 'paste' && clipboard.value) {
    // Perform paste
    console.log(`Pasted ${clipboard.value.name}`);
    clipboard.value = null;
  }
};

const onBeforeOpen = (args) => {
  const element = args.event?.target?.closest('.e-list-item');
  if (element) {
    const nodes = treeviewRef.value?.getNode(element);
    selectedNodeData.value = nodes?.data;
  }
};
</script>

<template>
  <div>
    <ejs-contextmenu
      id="contextmenu"
      :items="menuItems"
      target=".e-treeview"
      @beforeOpen="onBeforeOpen"
      @select="handleMenuSelect"
      @beforeItemRender="beforeMenuItemRender"
    />
    
    <ejs-treeview
      ref="treeviewRef"
      :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
:deep(.e-menu-item.e-disabled) {
  opacity: 0.5;
  pointer-events: none;
}
</style>
```

## Menu Item State

### Track Menu Item Actions

```vue
<script setup>
import { ref } from 'vue';

const actionHistory = ref([]);
const selectedNodeName = ref('');

const menuItems = ref([
  { text: 'View', id: 'view' },
  { text: 'Edit', id: 'edit' },
  { text: 'Delete', id: 'delete' }
]);

const handleMenuSelect = (args) => {
  const action = {
    item: args.item.text,
    node: selectedNodeName.value,
    timestamp: new Date().toLocaleTimeString(),
    status: 'completed'
  };

  actionHistory.value.unshift(action);

  // Keep only last 10 actions
  if (actionHistory.value.length > 10) {
    actionHistory.value.pop();
  }
};

const onBeforeOpen = (args) => {
  const element = args.event?.target?.closest('.e-list-item');
  if (element) {
    selectedNodeName.value = element.textContent.trim();
  }
};
</script>

<template>
  <div>
    <div class="action-history">
      <h3>Recent Actions</h3>
      <div v-if="actionHistory.length === 0" class="empty">No actions yet</div>
      <div v-for="action in actionHistory" :key="action.timestamp" class="action-item">
        <span class="action-item-text">
          {{ action.item }} on "{{ action.node }}"
        </span>
        <span class="action-item-time">{{ action.timestamp }}</span>
      </div>
    </div>

    <ejs-contextmenu
      id="contextmenu"
      :items="menuItems"
      target=".e-treeview"
      @beforeOpen="onBeforeOpen"
      @select="handleMenuSelect"
    />
    
    <ejs-treeview
      :fields="{ dataSource: [], id: 'id', text: 'name', parentID: 'parentID' }"
    />
  </div>
</template>

<style scoped>
.action-history {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.action-history h3 {
  margin-top: 0;
  margin-bottom: 8px;
}

.action-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #ddd;
  font-size: 0.9em;
}

.action-item:last-child {
  border-bottom: none;
}

.action-item-text {
  flex: 1;
}

.action-item-time {
  color: #999;
  font-size: 0.85em;
  margin-left: 8px;
  white-space: nowrap;
}

.empty {
  color: #999;
  font-style: italic;
}
</style>
```

## Real-World File Manager

### Complete File Manager with Context Menu

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const selectedNode = ref(null);
const clipboard = ref(null);

const data = ref([
  { id: '01', name: 'Desktop', type: 'folder' },
  { id: '02', name: 'Documents', parentID: '01', type: 'folder' },
  { id: '03', name: 'Report.pdf', parentID: '02', type: 'file' },
  { id: '04', name: 'Budget.xlsx', parentID: '02', type: 'file' },
  { id: '05', name: 'Pictures', parentID: '01', type: 'folder' },
  { id: '06', name: 'Vacation.jpg', parentID: '05', type: 'image' }
]);

const menuItems = ref([
  { text: 'Open', id: 'open' },
  { separator: true },
  { text: 'New Folder', id: 'new_folder' },
  { text: 'New File', id: 'new_file' },
  { separator: true },
  { text: 'Cut', id: 'cut' },
  { text: 'Copy', id: 'copy' },
  { text: 'Paste', id: 'paste' },
  { separator: true },
  { text: 'Rename', id: 'rename' },
  { text: 'Delete', id: 'delete' },
  { separator: true },
  { text: 'Properties', id: 'properties' }
]);

const onBeforeOpen = (args) => {
  const element = args.event?.target?.closest('.e-list-item');
  if (element) {
    const nodeElement = treeviewRef.value?.$el?.querySelector('[data-id]');
    const nodeData = Array.from(data.value).find(n => n.name === element.textContent.trim());
    selectedNode.value = nodeData;
  }
};

const onSelect = (args) => {
  if (!selectedNode.value) return;

  switch(args.item.id) {
    case 'open':
      console.log(`Opening: ${selectedNode.value.name}`);
      break;
    case 'cut':
      clipboard.value = { ...selectedNode.value, operation: 'cut' };
      break;
    case 'copy':
      clipboard.value = { ...selectedNode.value, operation: 'copy' };
      break;
    case 'paste':
      if (clipboard.value && selectedNode.value.type === 'folder') {
        const newNode = { ...clipboard.value };
        delete newNode.operation;
        newNode.parentID = selectedNode.value.id;
        if (clipboard.value.operation === 'cut') {
          treeviewRef.value.removeNodes([clipboard.value.id]);
        }
        treeviewRef.value.addNodes([newNode]);
        clipboard.value = null;
      }
      break;
    case 'delete':
      treeviewRef.value.removeNodes([selectedNode.value.id]);
      break;
    case 'rename':
      treeviewRef.value.beginEdit(selectedNode.value);
      break;
  }
};
</script>

<template>
  <div>
    <div class="file-manager">
      <div class="status-bar">
        Selected: {{ selectedNode?.name || 'None' }}
        <span v-if="clipboard" class="clipboard-indicator">
          (Clipboard: {{ clipboard.name }})
        </span>
      </div>

      <ejs-contextmenu
        id="contextmenu"
        :items="menuItems"
        target=".e-treeview"
        @beforeOpen="onBeforeOpen"
        @select="onSelect"
      />
      
      <ejs-treeview
        ref="treeviewRef"
        :fields="{ dataSource: data, id: 'id', text: 'name', parentID: 'parentID' }"
      />
    </div>
  </div>
</template>

<style scoped>
.file-manager {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.status-bar {
  background-color: #f5f5f5;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  font-size: 0.9em;
}

.clipboard-indicator {
  color: #f57c00;
  font-weight: bold;
  margin-left: 8px;
}
</style>
```

## Advanced Patterns

### Hierarchical Context Menu

```vue
<script setup>
import { ref } from 'vue';

const menuItems = ref([
  { text: 'File', id: 'file', items: [
    { text: 'New', id: 'new' },
    { text: 'Open', id: 'open' },
    { text: 'Save', id: 'save' }
  ]},
  { separator: true },
  { text: 'Edit', id: 'edit', items: [
    { text: 'Cut', id: 'cut' },
    { text: 'Copy', id: 'copy' },
    { text: 'Paste', id: 'paste' }
  ]}
]);
</script>

<template>
  <ejs-contextmenu
    id="contextmenu"
    :items="menuItems"
    target=".e-treeview"
  />
</template>
```

## Best Practices

### Do's and Don'ts

```vue
<script setup>
// ✓ DO: Keep context menus focused
const goodMenuItems = [
  { text: 'Open', id: 'open' },
  { text: 'Rename', id: 'rename' },
  { text: 'Delete', id: 'delete' }
];

// ✗ DON'T: Include too many items
const badMenuItems = [
  { text: 'Item 1', id: '1' },
  { text: 'Item 2', id: '2' },
  { text: 'Item 3', id: '3' },
  { text: 'Item 4', id: '4' },
  { text: 'Item 5', id: '5' },
  // ... 15 more items
];

// ✓ DO: Disable unavailable actions
const handleBeforeItemRender = (args) => {
  if (!selectedNode.value || selectedNode.value.locked) {
    if (args.item.id === 'delete') {
      args.item.disabled = true;
    }
  }
};

// ✓ DO: Provide keyboard alternatives
// Users can press Delete key instead of using menu
const handleKeyDown = (event) => {
  if (event.key === 'Delete') {
    handleDelete();
  }
};

// ✓ DO: Show confirmation dialogs for destructive actions
const handleDelete = () => {
  if (confirm(`Delete ${selectedNode.value?.name}?`)) {
    treeviewRef.value.removeNodes([selectedNode.value.id]);
  }
};
</script>
```

## Troubleshooting

### Issue: Context menu not appearing

**Solution:** Ensure target selector matches TreeView structure

```vue
<ejs-contextmenu
  id="contextmenu"
  target=".e-treeview"  <!-- Must target TreeView container -->
  :items="menuItems"
/>
```

### Issue: Selected node not available in menu event

**Solution:** Store node reference in onBeforeOpen

```vue
const onBeforeOpen = (args) => {
  const element = args.event?.target?.closest('.e-list-item');
  if (element) {
    selectedNodeData.value = getNodeFromElement(element);
  }
};
```

### Issue: Menu items not updating

**Solution:** Update items array directly (not object properties)

```vue
// ✓ Correct - Vue will detect the change
menuItems.value = newMenuItemsArray;

// ✗ Wrong - Vue won't detect property changes
menuItems.value[0].text = 'New Text';
```

---

**Key Takeaways:**
- ✅ Use `target=".e-treeview"` to attach context menu to TreeView
- ✅ Store selected node in `onBeforeOpen` event
- ✅ Disable items conditionally based on node type/state
- ✅ Provide confirmation dialogs for destructive operations
- ✅ Maintain clipboard state for cut/copy/paste
- ✅ Keep menu items focused (5-10 items max)
- ✅ Support keyboard alternatives to menu actions
- ✅ Use hierarchical menus for complex operations
