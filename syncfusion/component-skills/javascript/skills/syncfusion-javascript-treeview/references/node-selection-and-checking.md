# Node Selection & Checking

## Table of Contents

1. [Overview](#overview)
2. [Multiple Selection](#multiple-selection)
3. [Checkbox Selection](#checkbox-selection)
4. [Auto-Check Behavior](#auto-check-behavior)
5. [Getting Selected/Checked Nodes](#getting-selectedchecked-nodes)
6. [Selection Events](#selection-events)
7. [Checkbox Events](#checkbox-events)
8. [Disabling Selection](#disabling-selection)

---

## Overview

The TreeView provides flexible selection capabilities:
- **Single Selection** - Select one node at a time (default)
- **Multiple Selection** - Select multiple nodes with keyboard modifiers
- **Checkbox Selection** - Visual checkboxes for explicit multi-selection

## Multiple Selection

Enable multiple node selection using the `allowMultiSelection` property:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    { id: '01', name: 'Local Disk (C:)', expanded: true },
    { id: '01-01', pid: '01', name: 'Program Files' },
    { id: '01-02', pid: '01', name: 'Users' },
    { id: '01-02-01', pid: '01-02', name: 'Public' },
    { id: '01-02-02', pid: '01-02', name: 'Smith' }
];

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    allowMultiSelection: true
});

treeView.appendTo('#tree');
```

### Keyboard Navigation for Multi-Select

- **Ctrl+Click** (Cmd+Click on Mac) - Toggle individual node selection
- **Shift+Click** - Select range from current to clicked node
- **Ctrl+A** - Select all nodes

### Pre-Select Nodes

Set nodes as pre-selected using the `isSelected` field in your data:

```typescript
let data = [
    { id: '1', name: 'Item 1', isSelected: true },  // Pre-selected
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3', isSelected: true }   // Pre-selected
];

let treeView = new TreeView({
    fields: {
        dataSource: data,
        id: 'id',
        text: 'name',
        selected: 'isSelected'  // Map to isSelected field
    },
    allowMultiSelection: true
});

treeView.appendTo('#tree');
```

### Access Selected Nodes

```typescript
// Get all selected node IDs
let selectedNodes: string[] = treeView.selectedNodes;
console.log('Selected:', selectedNodes);

// Get data for each selected node
selectedNodes.forEach((nodeId: string) => {
    let nodeData = treeView.getTreeData(nodeId);
    if (nodeData && nodeData.length > 0) {
        console.log('Selected Node:', nodeData[0].name);
    }
});
```

## Checkbox Selection

Enable checkboxes using the `showCheckBox` property:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    { id: '1', name: 'Option 1', isChecked: true },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3', isChecked: true },
    { id: '4', name: 'Option 4' },
    { id: '5', name: 'Option 5' }
];

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', isChecked: 'isChecked' },
    showCheckBox: true
});

treeView.appendTo('#tree');
```

### Get Checked Nodes

```typescript
// Get array of checked node IDs
let checkedNodeIds: string[] = treeView.checkedNodes;
console.log('Checked nodes:', checkedNodeIds);

// Get the data for each checked node
checkedNodeIds.forEach((nodeId: string) => {
    let nodeData = treeView.getTreeData(nodeId);
    console.log('Checked:', nodeData[0].name);
});
```

### Check/Uncheck All Nodes

Use the `checkAll()` and `uncheckAll()` methods:

```typescript
// Get all nodes
let allNodes = document.querySelectorAll('#tree .e-list-item');

// Check all nodes
let nodeArray = Array.from(allNodes);
treeView.checkAll(nodeArray);

// Uncheck all nodes
treeView.uncheckAll(nodeArray);
```

### Auto-Check Parent/Child Nodes

The `autoCheck` property (default: **true**) automatically checks/unchecks parent and child nodes:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    {
        id: 1, name: 'Parent Node', expanded: true,
        child: [
            { id: 2, name: 'Child 1' },
            { id: 3, name: 'Child 2' }
        ]
    }
];

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', child: 'child' },
    showCheckBox: true,
    autoCheck: true  // Parent and child checks are synchronized
});

treeView.appendTo('#tree');
```

**Behavior with `autoCheck: true`:**
- Check parent → all children auto-checked
- Check all children → parent auto-checked  
- Uncheck any child → parent unchecked
- Partial child check → parent shows indeterminate state

### Disable Auto-Check

```typescript
let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', child: 'child' },
    showCheckBox: true,
    autoCheck: false  // Each node has independent state
});

treeView.appendTo('#tree');
```

### Disable Checkbox for Specific Nodes

Use the data initialization with a custom property to conditionally display checkboxes:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let countries = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 4, pid: 1, name: 'South Australia' },
    { id: 6, pid: 1, name: 'Western Australia' }
];

let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    showCheckBox: true
});

treeObj.appendTo('#tree');

// To disable checkboxes for specific nodes, use CSS classes
// The TreeView applies level-based classes like .e-level-1, .e-level-2, etc.
```

## Selection Events

### Node Selected Event

The `nodeSelected` event is triggered when a node is selected:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    { id: 1, name: 'Item 1', expanded: true },
    { id: 2, pid: 1, name: 'Item 1-1' },
    { id: 3, pid: 1, name: 'Item 1-2' }
];

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    allowMultiSelection: true,
    nodeSelected: onNodeSelected
});

treeView.appendTo('#tree');

function onNodeSelected(args: NodeSelectEventArgs): void {
    console.log('Node selected:', args.nodeData.name);
    console.log('All selected nodes:', treeView.selectedNodes);
}
```

### Node Checking/Checked Events

Use `nodeChecking` and `nodeChecked` events to handle checkbox interactions:

```typescript
let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name' },
    showCheckBox: true,
    nodeChecking: (args) => {
        console.log('Node checking:', args.nodeData.name);
    },
    nodeChecked: (args) => {
        console.log('Node checked:', args.nodeData.name);
    }
});

treeView.appendTo('#tree');
```

## Remove Parent Checkbox

Use the `showCheckBox` property to display checkboxes. To hide checkboxes for parent nodes, use CSS classes:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    {
        id: 1, name: 'Parent', expanded: true,
        child: [
            { id: 2, name: 'Child 1' },
            { id: 3, name: 'Child 2' }
        ]
    }
];

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', child: 'child', parentID: 'pid' },
    showCheckBox: true
});

treeView.appendTo('#tree');
```

To hide checkboxes for parent nodes, use CSS:

```css
/* Hide checkboxes for root-level (parent) nodes */
#tree > .e-list-item .e-checkbox-wrapper {
    display: none;
}

/* Hide checkboxes for level 1 nodes */
.e-level-1 .e-checkbox-wrapper {
    display: none;
}
```

## Check/Uncheck on Text Click

You can check or uncheck nodes by clicking the node text instead of the checkbox. Use the `nodeClicked` event:

```typescript
import { enableRipple, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { TreeView, NodeClickEventArgs, NodeKeyPressEventArgs } from '@syncfusion/ej2-navigations';

enableRipple(true);

let countries = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 4, pid: 1, name: 'South Australia' }
];

let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    showCheckBox: true,
    nodeClicked: nodeCheck,
    keyPress: nodeCheck
});

treeObj.appendTo('#tree');

function nodeCheck(args: NodeClickEventArgs | NodeKeyPressEventArgs): void {
    let checkedNode: any = [args.node];
    
    // Check if target is fullrow (clicking on text) or Enter key pressed
    if ((args.event.target as HTMLElement).classList.contains('e-fullrow') || 
        (args.event as KeyboardEventArgs).key == "Enter") {
        
        let getNodeDetails: any = treeObj.getNode(args.node);
        
        if (getNodeDetails.isChecked == 'true') {
            treeObj.uncheckAll(checkedNode);
        } else {
            treeObj.checkAll(checkedNode);
        }
    }
}
```

This allows users to check/uncheck by clicking the node text or pressing Enter.

## Selection Methods Summary

| Method | Purpose |
|--------|---------|
| `checkAll(nodes)` | Check specific nodes |
| `uncheckAll(nodes)` | Uncheck specific nodes |
| `getTreeData(id)` | Get node data |
| `getNode(id)` | Get node element |
| `selectedNode` | Get/set single selected node |
| `selectedNodes` | Get/set multiple selected nodes |
| `checkedNodes` | Get/set checked nodes |

## Common Issues

**Auto-check not working?**
- Ensure `autoCheck: true` (default)
- Verify parent-child IDs are correct
- Check parent-child relationship in data

**Cannot uncheck parent?**
- With `autoCheck: true`, parent unchecks when all children unchecked
- Set `autoCheck: false` for independent state
