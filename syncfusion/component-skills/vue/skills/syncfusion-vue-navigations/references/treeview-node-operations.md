# Node Operations and Manipulation in Vue 3 TreeView

## Table of Contents

1. [Overview](#overview)
2. [Adding Nodes](#adding-nodes)
3. [Removing Nodes](#removing-nodes)
4. [Updating Node Data](#updating-node-data)
5. [Moving Nodes](#moving-nodes)
6. [Refreshing Nodes](#refreshing-nodes)
7. [Getting Node Information](#getting-node-information)
8. [Expanding and Collapsing](#expanding-and-collapsing)
9. [Advanced Operations](#advanced-operations)
10. [Troubleshooting](#troubleshooting)

## Overview

Dynamic node operations allow programmatic control over TreeView with Vue 3 refs:
- Create new nodes (addNodes)
- Delete existing nodes (removeNodes)
- Modify node data (updateNode)
- Move nodes between parents (moveNodes)
- Refresh node data from backend (refreshNode)
- Retrieve node information (getNode, getTreeData)

## Adding Nodes

### Add as Child Node

```vue
<script setup>
import { ref } from 'vue';

const treeviewRef = ref(null);
const data = ref([
  {
    id: 1,
    name: 'Parent 1',
    child: [
      { id: 2, name: 'Child 1.1' }
    ]
  }
]);

const addNode = () => {
  // Method: Use component reference
  if (treeviewRef.value) {
    const newNode = { id: 3, name: 'Child 1.2' };
    treeviewRef.value.addNodes([newNode], '1'); // Add as child of node 1
  }
};
</script>

<template>
  <div>
    <button @click="addNode">Add Child to Parent 1</button>
    <ejs-treeview
      ref="treeviewRef"
      :fields="{
        dataSource: data,
        id: 'id',
        text: 'name',
        child: 'child'
      }"
    />
  </div>
</template>
```

### Add Multiple Nodes

```vue
const addMultipleNodes = () => {
  const newNodes = [
    { id: 4, name: 'New Child 1' },
    { id: 5, name: 'New Child 2' },
    { id: 6, name: 'New Child 3' }
  ];
  
  if (treeviewRef.value) {
    treeviewRef.value.addNodes(newNodes, '1'); // All as children of node 1
  }
};
```

### Add with Specific Index

```vue
const addAtIndex = () => {
  const newNode = { id: 7, name: 'Inserted at Start' };
  
  if (treeviewRef.value) {
    // addNodes(nodeArray, targetId, index)
    treeviewRef.value.addNodes([newNode], '1', 0); // Insert at index 0
  }
};
```

### Add as Sibling

```vue
const addSibling = (targetNodeId) => {
  const newNode = { id: 8, name: 'Sibling', pid: targetNodeId };
  
  if (treeviewRef.value) {
    // Get parent ID from target node's parent
    const treeData = treeviewRef.value.getTreeData();
    
    const findParentId = (nodes) => {
      for (let node of nodes) {
        if (node.id === targetNodeId) return null; // Root node
        if (node.child) {
          const found = node.child.find(n => n.id === targetNodeId);
          if (found) return node.id;
          const result = findParentId(node.child);
          if (result) return result;
        }
      }
      return null;
    };
    
    const parentId = findParentId(treeData) || null;
    treeviewRef.value.addNodes([newNode], parentId);
  }
};
```

## Removing Nodes

### Remove Single Node

```vue
const removeNode = (nodeId) => {
  if (treeviewRef.value) {
    treeviewRef.value.removeNodes([nodeId]);
  }
};

// Usage
<button @click="() => removeNode('2')">Remove Node 2</button>
```

### Remove Multiple Nodes

```vue
const removeMultipleNodes = () => {
  const nodeIds = ['2', '3', '4'];
  
  if (treeviewRef.value) {
    treeviewRef.value.removeNodes(nodeIds);
  }
};
```

### Remove with Confirmation

```vue
const removeNodeSafe = async (nodeId) => {
  const confirmed = window.confirm('Are you sure you want to delete this node?');
  
  if (confirmed && treeviewRef.value) {
    treeviewRef.value.removeNodes([nodeId]);
  }
};
```

## Updating Node Data

### Change Node Text

```vue
const updateNodeText = (nodeId, newText) => {
  if (treeviewRef.value) {
    treeviewRef.value.updateNode(nodeId, newText);
  }
};

// Usage
<button @click="() => updateNodeText('2', 'Updated Name')">
  Update Node 2
</button>
```

### Update Node with New Data

```vue
const updateNodeData = (nodeId, newData) => {
  // updateNode only changes text
  // For other properties, update source data and refresh
  
  const updateInData = (nodes) => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, ...newData };
      }
      if (node.child) {
        node.child = updateInData(node.child);
      }
      return node;
    });
  };

  // Update source data
  data.value = updateInData(data.value);
  
  // Update display
  if (treeviewRef.value) {
    treeviewRef.value.updateNode(nodeId, newData.name);
  }
};
```

## Moving Nodes

### Move Node to Different Parent

```vue
const moveNode = (nodeId, newParentId, position = -1) => {
  if (treeviewRef.value) {
    // moveNodes(nodeIds, targetId, index)
    treeviewRef.value.moveNodes([nodeId], newParentId, position);
  }
};

// Move node 5 to be child of node 3, at position 0
<button @click="() => moveNode('5', '3', 0)">
  Move to Different Parent
</button>
```

### Reorder Siblings

```vue
const moveNodeBefore = (nodeId, beforeNodeId) => {
  if (treeviewRef.value) {
    const treeData = treeviewRef.value.getTreeData();
    
    // Find parent of beforeNode
    const getParentId = (nodes) => {
      for (let node of nodes) {
        if (node.child) {
          const index = node.child.findIndex(n => n.id === beforeNodeId);
          if (index >= 0) return node.id;
          const found = getParentId(node.child);
          if (found) return found;
        }
      }
      return null;
    };

    const parentId = getParentId(treeData);
    if (parentId) {
      treeviewRef.value.moveNodes([nodeId], parentId, 0);
    }
  }
};
```

## Refreshing Nodes

### Refresh Single Node from Backend

```vue
const refreshNode = async (nodeId) => {
  try {
    // Fetch fresh data from server
    const response = await fetch(`/api/nodes/${nodeId}`);
    const freshData = await response.json();

    // Update TreeView
    if (treeviewRef.value) {
      treeviewRef.value.refreshNode(nodeId, freshData);
    }
  } catch (error) {
    console.error('Error refreshing node:', error);
  }
};
```

### Refresh Children on Expand

```vue
const handleNodeExpanding = async (args) => {
  if (args.nodeData.hasChildren && !args.nodeData.child) {
    try {
      // Children not loaded, fetch from backend
      const response = await fetch(`/api/nodes/${args.nodeData.id}/children`);
      const children = await response.json();
      args.nodeData.child = children;
      
      // Refresh display
      if (treeviewRef.value) {
        treeviewRef.value.refreshNode(args.nodeData.id, args.nodeData);
      }
    } catch (error) {
      console.error('Error loading children:', error);
    }
  }
};
```

## Getting Node Information

### Get Node by Element

```vue
const getNodeInfo = (element) => {
  if (treeviewRef.value) {
    const node = treeviewRef.value.getNode(element);
    console.log('Node ID:', node.id);
    console.log('Node Text:', node.text);
  }
};
```

### Get All Tree Data

```vue
const getAllData = () => {
  if (treeviewRef.value) {
    const allData = treeviewRef.value.getTreeData();
    console.log('All tree data:', allData);
    return allData;
  }
};
```

### Get Specific Node Data

```vue
const getNodeData = (nodeId) => {
  if (!treeviewRef.value) return null;
  
  const allData = treeviewRef.value.getTreeData();
  
  const find = (nodes) => {
    for (let node of nodes) {
      if (node.id === nodeId) return node;
      if (node.child) {
        const found = find(node.child);
        if (found) return found;
      }
    }
    return null;
  };

  return find(allData);
};
```

### Get Selected Nodes

```vue
const getSelectedNodeIds = () => {
  if (treeviewRef.value) {
    const selectedIds = treeviewRef.value.selectedNodes;
    console.log('Selected IDs:', selectedIds);
    return selectedIds;
  }
};

// Get selected node data
const getSelectedNodeData = () => {
  if (!treeviewRef.value) return [];
  
  const selectedIds = treeviewRef.value.selectedNodes;
  const allData = treeviewRef.value.getTreeData();
  
  const selected = [];
  const findNodes = (nodes) => {
    nodes.forEach(node => {
      if (selectedIds.includes(node.id.toString())) {
        selected.push(node);
      }
      if (node.child) findNodes(node.child);
    });
  };
  
  findNodes(allData);
  return selected;
};
```

### Get Checked Nodes

```vue
const getCheckedNodeIds = () => {
  if (treeviewRef.value) {
    return treeviewRef.value.checkedNodes;
  }
  return [];
};

const getCheckedNodeData = () => {
  if (!treeviewRef.value) return [];
  
  const checkedIds = treeviewRef.value.checkedNodes;
  const allData = treeviewRef.value.getTreeData();
  
  const checked = [];
  const findNodes = (nodes) => {
    nodes.forEach(node => {
      if (checkedIds.includes(node.id.toString())) {
        checked.push(node);
      }
      if (node.child) findNodes(node.child);
    });
  };
  
  findNodes(allData);
  return checked;
};
```

## Expanding and Collapsing

### Expand All Nodes

```vue
const expandAll = () => {
  if (treeviewRef.value) {
    treeviewRef.value.expandAll();
  }
};
```

### Collapse All Nodes

```vue
const collapseAll = () => {
  if (treeviewRef.value) {
    treeviewRef.value.collapseAll();
  }
};
```

### Expand Specific Nodes

```vue
const expandNodes = (nodeIds) => {
  if (treeviewRef.value) {
    treeviewRef.value.expandAll(nodeIds);
  }
};

// Expand nodes with IDs 1 and 3
<button @click="() => expandNodes(['1', '3'])">
  Expand Selected
</button>
```

### Expand Only Parent Nodes

```vue
const expandParentNodesOnly = () => {
  if (!treeviewRef.value) return;
  
  const allData = treeviewRef.value.getTreeData();
  const parentIds = [];
  
  const findParents = (nodes) => {
    nodes.forEach(node => {
      if (node.child && node.child.length > 0) {
        parentIds.push(node.id.toString());
      }
      if (node.child) findParents(node.child);
    });
  };
  
  findParents(allData);
  treeviewRef.value.expandAll(parentIds);
};
```

## Advanced Operations

### Bulk Operations

```vue
const bulkAddNodes = async (parentId, count) => {
  const newNodes = [];
  for (let i = 0; i < count; i++) {
    newNodes.push({
      id: Date.now() + i,
      name: `New Node ${i + 1}`
    });
  }
  
  if (treeviewRef.value) {
    treeviewRef.value.addNodes(newNodes, parentId);
  }
};

// Add 100 nodes
<button @click="() => bulkAddNodes('1', 100)">
  Add 100 Nodes
</button>
```

### Transaction-like Operations

```vue
const performOperations = (operations) => {
  if (!treeviewRef.value) return;
  
  // operations = [
  //   { action: 'add', data: [...], parentId: '1' },
  //   { action: 'remove', nodeIds: ['2', '3'] },
  //   { action: 'update', nodeId: '4', data: {...} }
  // ]

  operations.forEach(op => {
    switch (op.action) {
      case 'add':
        treeviewRef.value.addNodes(op.data, op.parentId);
        break;
      case 'remove':
        treeviewRef.value.removeNodes(op.nodeIds);
        break;
      case 'update':
        treeviewRef.value.updateNode(op.nodeId, op.data.name);
        break;
    }
  });
};
```

### Undo/Redo Operations

```vue
<script setup>
import { ref } from 'vue';

class TreeOperationHistory {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }

  addOperation(operation) {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(operation);
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

const history = ref(new TreeOperationHistory());

const addWithHistory = (nodes, parentId) => {
  if (treeviewRef.value) {
    treeviewRef.value.addNodes(nodes, parentId);
    history.value.addOperation({ action: 'add', nodes, parentId });
  }
};

const handleUndo = () => {
  const op = history.value.undo();
  if (op) {
    console.log('Undo:', op);
    // Reverse the operation
  }
};

const handleRedo = () => {
  const op = history.value.redo();
  if (op) {
    console.log('Redo:', op);
    // Re-apply the operation
  }
};
</script>

<template>
  <div>
    <button @click="handleUndo">Undo</button>
    <button @click="handleRedo">Redo</button>
  </div>
</template>
```

## Troubleshooting

### Nodes Not Adding

```vue
// ❌ Wrong - ref might not be initialized
if (treeviewRef.value) {
  treeviewRef.value.addNodes([newNode], '1');
} else {
  console.error('TreeView ref not initialized');
}

// ✅ Better - Use optional chaining
treeviewRef.value?.addNodes([newNode], '1');
```

### Move Not Working

```vue
// ❌ Wrong - NodeID as number
treeviewRef.value.moveNodes([5], 3); // IDs should be strings

// ✅ Correct - String IDs
treeviewRef.value.moveNodes(['5'], '3');
```

### Update Not Persisting

```vue
// ✅ Update both TreeView and source data
const updateNodeWithPersist = (nodeId, newText) => {
  // Update display
  if (treeviewRef.value) {
    treeviewRef.value.updateNode(nodeId, newText);
  }
  
  // Update source data
  const updateInData = (nodes) => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, name: newText };
      }
      if (node.child) {
        node.child = updateInData(node.child);
      }
      return node;
    });
  };
  
  data.value = updateInData(data.value);
  
  // Optionally save to backend
  saveNodeToServer(nodeId, newText);
};
```

---

**Key Takeaways:**
- ✅ Use `treeviewRef.value.addNodes()` to create nodes dynamically
- ✅ Use `treeviewRef.value.removeNodes()` to delete nodes
- ✅ Use `treeviewRef.value.updateNode()` for text changes
- ✅ Use `treeviewRef.value.moveNodes()` to reorder or move nodes
- ✅ Use `treeviewRef.value.refreshNode()` for backend data updates
- ✅ Always check if ref exists before calling methods
- ✅ Keep source data in sync with TreeView for proper reactivity
- ✅ Use string IDs for consistency with TreeView API
