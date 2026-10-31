# Node Editing & User Interactions

Enable inline node editing with validation, handle click events, and programmatically control editing.

## Table of Contents

1. [Node Editing Overview](#node-editing-overview)
   - 1.1 [Enable Editing](#enable-editing)
   - 1.2 [Programmatic Editing](#programmatic-editing)
2. [Edit Events](#edit-events)
   - 2.1 [Node Editing Event](#node-editing-event)
   - 2.2 [Node Edited Event](#node-edited-event)
3. [Validation](#validation)
4. [Click Events](#click-events)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Advanced Interactions](#advanced-interactions)

---

## Node Editing Overview

The TreeView allows you to edit nodes by setting the `allowEditing` property to **true**. To edit nodes directly in place:
- **Double-click** the TreeView node
- **Select** the node and press the **F2** key

When editing is completed by losing focus or pressing **Enter**, the modified node's text is saved automatically. Press **Escape** to cancel editing without saving.

### Enable Editing

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let data = [
    { id: '01', name: 'Local Disk (C:)', expanded: true },
    { id: '01-01', pid: '01', name: 'Program Files' },
    { id: '01-02', pid: '01', name: 'Users' }
];

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    allowEditing: true
});

treeView.appendTo('#tree');
```

### Programmatic Editing

Start editing a node using the `beginEdit()` method:

```typescript
// Get the node element and start editing
let nodeElement = treeView.getNode('01-01');
if (nodeElement) {
    treeView.beginEdit(nodeElement);
}
```

## Edit Events

### Node Editing Event

The `nodeEditing` event is triggered before the TreeView node is renamed. Use this to prevent editing for specific nodes:

```typescript
let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name', child: 'child' },
    allowEditing: true,
    nodeEditing: (args) => {
        // Prevent editing root level nodes (first level)
        if (args.node.parentNode.parentNode.nodeName !== "LI") {
            args.cancel = true;
        }
    }
});
```

### Node Edited Event

The `nodeEdited` event is triggered when the TreeView node is successfully renamed:

```typescript
nodeEdited: (args) => {
    console.log('Old text:', args.oldText);
    console.log('New text:', args.newText);
    console.log('Node:', args.nodeData.name);
}
```Empty Values

Use the [`nodeEdited`](../api/treeview#nodeedited) event to validate and prevent empty values:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeEditEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let treeData = [
    {
        id: 1, name: 'Discover Music', expanded: true,
        child: [
            { id: 2, name: 'Hot Singles' },
            { id: 3, name: 'Rising Artists' },
            { id: 4, name: 'Live Music' }
        ]
    },
    {
        id: 7, name: 'Sales and Events',
        child: [
            { id: 8, name: '100 Albums - $5 Each' },
            { id: 9, name: 'Hip-Hop and R&B Sale' }
        ]
    }
];

let treeView = new TreeView({
    fields: { dataSource: treeData, id: 'id', text: 'name', child: 'child' },
    allowEditing: true,
    nodeEdited: onNodeEdited
});

treeView.appendTo('#tree');

function onNodeEdited(args: NodeEditEventArgs): void {
    let displayContent: string = "";
    
    // Check for empty text
    if (args.newText.trim() == "") {
        args.cancel = true;
        displayContent = "TreeView item text should not be empty";
    }
    else if (args.newText != args.oldText) {
        displayContent = "TreeView item text edited successfully";
    }
    
    // Display message
    const displayElement = document.getElementById("display");
    if (displayElement) {
        displayElement.innerHTML = displayContentart with letter
    if (!/^[a-zA-Z]/.test(newText)) {
        alert('Name must start with a letter');
        args.cancel = true;
        return;
    }
}
```

## Check/Uncheck on Text Click

You can check and uncheck checkboxes by clicking the tree node text using the [`nodeClicked`](../api/treeview#nodeclicked) event:

```typescript
import { enableRipple, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { TreeView, NodeClickEventArgs, NodeKeyPressEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let countries = [
    { id: 1, name: 'Australia', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 4, pid: 1, name: 'South Australia' },
    { id: 6, pid: 1, name: 'Western Australia' }
];

let treeView = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    showCheckBox: true,
    nodeClicked: nodeCheck,
    keyPress: nodeCheck
});

treeView.appendTo('#tree');

function nodeCheck(args: NodeKeyPressEventArgs | NodeClickEventArgs): void {
    let checkedNode: any = [args.node];
    
    // Check if clicking on fullrow or pressing Enter
    if ((args.event.target as HTMLElement).classList.contains('e-fullrow') || 
        (args.event as KeyboardEventArgs).key == "Enter") {
        
        let getNodeDetails: any = treeView.getNode(args.node);
        
        if (getNodeDetails.isChecked == 'true') {
            treeView.uncheckAll(checkedNode);
        } else {
            treeView.checkAll(checkedNode);
        }
    }
}
```

### Key Interaction Methods
Keyboard Navigation & F2 Editing

The TreeView supports keyboard shortcuts for editing:
- **F2** - Start editing selected node
- **Enter** - Save edited text
- **Escape** - Cancel editing

```typescript
let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    allowEditing: true
});

treeView.appendTo('#tree');

// User can:
// 1. Select a node
// 2. Press F2 to enter edit mode
// 3. Type new text
// 4. Press Enter to save or Escape to cancel     // Prevent expanding certain nodes
        if (args.nodeData.restricted) {
            args.cancel = true;
        }
```

## Keyboard Navigation

### Built-in Keyboard Support

TreeView supports standard keyboard shortcuts by default:

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate between nodes |
| `Restricting Node Editing

Use the `nodeEditing` event to prevent editing for certain nodes based on level:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeEditEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let hierarchicalData = [
    {
        id: '01', name: 'Local Disk (C:)', expanded: true,
        subChild: [
            {
                id: '01-01', name: 'Program Files',
                subChild: [
                    { id: '01-01-01', name: '7-Zip' },
                    { id: '01-01-02', name: 'Git' }
                ]
            },
            {
                id: '01-02', name: 'Users', expanded: true,
                subChild: [
                    { id: '01-02-01', name: 'Smith' },
                    { id: '01-02-02', name: 'Admin' }
                ]
            }
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: hierarchicalData, id: 'id', text: 'name', child: 'subChild' },
    allowEditing: true,
    nodeEditing: editing
});

treeObj.appendTo('#tree');

function editing(args: NodeEditEventArgs) {
    // Check if node is root level (prevents editing root only)
    if (args.node.parentNode.parentNode.nodeName !== "LI") {
        args.cancel = true;
    }
}
```

This example prevents editing of first-level nodes while allowing child nodes to be edited. 

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeEditEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    allowEditing: true,
    nodeClicked: (args) => {
        if (args.event.detail === 2) {  // Double-click
            let nodeElement = treeView.getNode(args.nodeData.id);
            treeView.beginEdit(nodeElement);
        }
    },
    nodeEditStop: (args) => {
        // Auto-save on Enter or blur
        console.log('Node updated:', args.newText);
    }
});
```

### Pattern 2: Quick Actions on Click

Perform actions based on click position:

```typescript
let treeView = new TreeView({
    fields: { dataSource: data, id: 'id', parentID: 'pid', text: 'name' },
    nodeClicked: (args) => {
        let clickTarget = args.event.target;
        let nodeId = args.nodeData.id;
        
        // Click on icon = expand/collapse
        if (clickTarget.classList.contains('e-icon-expandable')) {
            // Already handled by TreeView
        }
        
        // Click on text = select
        if (clickTarget.classList.contains('e-list-text')) {
            treeView.selectedNode = nodeId;
        }
        
        // Right-click = context menu
        if (args.event.button === 2) {
            showContextMenu(nodeId, args.event);
        }
    }
});
```

### Pattern 3: Confirm Before Delete

```typescript
function deleteNode(nodeId) {
    let nodeData = treeView.getTreeData(nodeId);
    if (nodeData && nodeData.length > 0) {
        let confirmed = confirm(`Delete "${nodeData[0].name}"?`);
        if (confirmed) {
            treeView.removeNodes([nodeId]);
            console.log('Node deleted');
        }
    }
}

// Bind to button or shortcut

1. **Always validate** user input before saving
2. **Provide feedback** - success/error messages
3. **Prevent duplicate names** at same level
4. **Support keyboard shortcuts** for power users
5. **Confirm destructive actions** (delete)
6. **Sync changes** with backend server
7. **Handle errors gracefully** with try-catch
8. **Debounce rapid changes** to avoid conflicts
