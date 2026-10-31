# Node Manipulation (CRUD Operations)

Dynamically add, remove, update, and manage TreeView nodes using built-in methods.

## Table of Contents

1. [Adding Nodes](#adding-nodes)
   - 1.1 [Add Root-Level Node](#add-root-level-node)
   - 1.2 [Add Child Node to Parent](#add-child-node-to-parent)
   - 1.3 [Add at Specific Position](#add-at-specific-position)
2. [Removing Nodes](#removing-nodes)
3. [Updating/Refreshing Nodes](#updatingrefreshing-nodes)
4. [Moving Nodes](#moving-nodes)
5. [Getting Node Data](#getting-node-data)
6. [Bulk Operations](#bulk-operations)
7. [Best Practices](#best-practices)

---

## Adding Nodes

The `addNodes()` method allows you to insert new nodes at designated positions within the TreeView.

### Add Root-Level Node

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let countries = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' }
];

let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
});

treeObj.appendTo('#tree');

// Add new root node
document.getElementById('addButton').onclick = () => {
    treeObj.addNodes([
        { id: 26, name: 'New Parent' },
        { id: 27, pid: 26, name: 'New Child 1' }
    ]);
};
```

### Add Child Node to Parent

```typescript
// Add child node to existing parent (id: 21)
treeObj.addNodes(
    [{ id: 28, name: 'New Child', pid: 21 }],
    '21'  // Parent ID
);

// Add at specific position (index 0 = beginning)
treeObj.addNodes(
    [{ id: 29, name: 'Another Child', pid: 21 }],
    '21',  // Parent ID
    0      // Position/Index
);
```

### Add Multiple Nodes

```typescript
let newNodes = [
    { id: 100, name: 'Parent 1', hasChild: true },
    { id: 101, pid: 100, name: 'Child 1-1' },
    { id: 102, pid: 100, name: 'Child 1-2' },
    { id: 103, name: 'Parent 2' }
];

treeObj.addNodes(newNodes);
```

## Removing Nodes

The `removeNodes()` method removes one or multiple nodes by providing their IDs.

### Remove Single Node

```typescript
// Remove node with id: 21
treeObj.removeNodes(['21']);
```

### Remove Multiple Nodes

```typescript
// Remove nodes with ids: 3 and 4
treeObj.removeNodes(['3', '4']);
```

### Remove All Child Nodes

```typescript
function removeChildren(parentId: string): void {
    let allData = treeObj.getTreeData('');
    let childIds = allData
        .filter(node => node.pid === parentId)
        .map(node => node.id.toString());
    
    if (childIds.length > 0) {
        treeObj.removeNodes(childIds);
    }
}

// Remove all children of node 21
removeChildren('21');
```

## Updating Nodes

The `updateNode()` method modifies node data while keeping the same ID.

### Update Single Node

```typescript
let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
});

treeObj.appendTo('#tree');

// Update node text
let updatedData = { id: 2, name: 'Updated Name' };
treeObj.updateNode(['2'], updatedData);
```

### Update Multiple Nodes

```typescript
let updates = [
    { id: 2, name: 'NSW Updated' },
    { id: 3, name: 'Victoria Updated' }
];

updates.forEach(update => {
    treeObj.updateNode([update.id.toString()], update);
});
```

## Refreshing Nodes

The `refreshNode()` method updates the display of specific nodes without modifying the underlying data.

```typescript
// Refresh single node
treeObj.refreshNode('21');

// Refresh multiple nodes
treeObj.refreshNode(['21', '22', '23']);
```

## Moving Nodes

The `moveNodes()` method relocates nodes to a different parent or position.

### Move to Different Parent

```typescript
// Move node 5 to become child of node 1
treeObj.moveNodes(['5'], '1', 0);

// Move node 5 to root level (null parent)
treeObj.moveNodes(['5'], null, 0);

// Move multiple nodes
treeObj.moveNodes(['5', '6', '7'], '1', 0);
```

### Move with Index Position

```typescript
// Move node 5 to be child of node 1 at position 0 (beginning)
treeObj.moveNodes(['5'], '1', 0);

// Move node 5 to be child of node 1 at position 2 (after first 2 children)
treeObj.moveNodes(['5'], '1', 2);
```

## Getting Node Data

### Get Single Node Data

```typescript
// Get node data by ID
let nodeData = treeObj.getTreeData('21');
if (nodeData && nodeData.length > 0) {
    console.log('Node name:', nodeData[0].name);
}
```

### Get Node Element

```typescript
// Get DOM element for a node
let nodeElement = treeObj.getNode('21');
if (nodeElement) {
    console.log('Node element:', nodeElement);
}
```

### Get All Child Nodes

```typescript
// Get all children of node 1
let childData = treeObj.getTreeData('1');
console.log('Children count:', childData.length);
childData.forEach(child => {
    console.log('Child:', child.name);
});
```

### Get All Tree Data

```typescript
// Get flat array of all nodes
let allData = treeObj.getTreeData('');
console.log('Total nodes:', allData.length);
```

### Get All Nodes of Specific Level

```typescript
function getNodesByLevel(level: number): any[] {
    let allData = treeObj.getTreeData('');
    
    function getLevel(nodeId: any): number {
        let node = allData.find(n => n.id === nodeId);
        if (!node || !node.pid) return 1;
        return 1 + getLevel(node.pid);
    }
    
    return allData.filter(node => getLevel(node.id) === level);
}

// Get all level-2 nodes
let level2Nodes = getNodesByLevel(2);
console.log('Level 2 nodes:', level2Nodes);
```

## Practical Examples

### Dynamic Add/Remove with User Input

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
});

treeObj.appendTo('#tree');

let nodeCount = 100;

// Add node
document.getElementById('addBtn').onclick = () => {
    let nodeName = (document.getElementById('nodeName') as HTMLInputElement).value;
    if (nodeName.trim()) {
        treeObj.addNodes([{ id: nodeCount++, name: nodeName }]);
        (document.getElementById('nodeName') as HTMLInputElement).value = '';
    }
};

// Remove selected node
document.getElementById('removeBtn').onclick = () => {
    let selectedNode = treeObj.selectedNode;
    if (selectedNode) {
        treeObj.removeNodes([selectedNode]);
    }
};
```

### Duplicate Node

```typescript
function duplicateNode(nodeId: string): void {
    let nodeData = treeObj.getTreeData(nodeId);
    if (nodeData && nodeData.length > 0) {
        let original = nodeData[0];
        let duplicate = {
            ...original,
            id: Math.random().toString(36),  // New unique ID
            name: original.name + ' (Copy)'
        };
        
        // Add duplicate next to original
        if (original.pid) {
            treeObj.addNodes([duplicate], original.pid.toString());
        } else {
            treeObj.addNodes([duplicate]);
        }
    }
}
```

### Batch Operations

```typescript
// Add, update, and remove in sequence
function batchUpdate(additions: any[], updates: any[], removals: string[]): void {
    // Add new nodes
    if (additions.length > 0) {
        treeObj.addNodes(additions);
    }
    
    // Update existing nodes
    updates.forEach(update => {
        treeObj.updateNode([update.id.toString()], update);
    });
    
    // Remove nodes
    if (removals.length > 0) {
        treeObj.removeNodes(removals);
    }
}

// Example usage
batchUpdate(
    [{ id: 200, name: 'New Node' }],
    [{ id: 2, name: 'Updated NSW' }],
    ['99', '100']
);
```

## Method Summary

| Method | Parameters | Purpose |
|--------|-----------|---------|
| `addNodes(nodes, parentId?, index?)` | Array of nodes, parent ID, position | Add new nodes |
| `removeNodes(nodeIds)` | Array of node IDs | Delete nodes |
| `updateNode(nodeIds, nodeData)` | Array of IDs, data object | Modify node properties |
| `refreshNode(nodeIds)` | Array of node IDs | Update display |
| `moveNodes(nodeIds, parentId, index?)` | Array of IDs, new parent, position | Relocate nodes |
| `getTreeData(id)` | Node ID or '' for all | Retrieve node data |
| `getNode(id)` | Node ID | Get DOM element |
