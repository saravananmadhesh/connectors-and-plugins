# Accessibility & Advanced Features

Advanced TreeView features including drag-and-drop, context menus, filtering, keyboard navigation, and accessibility.

## Table of Contents

1. [Drag and Drop](#drag-and-drop)
   - 1.1 [Drop Indicators](#drop-indicators)
   - 1.2 [Multiple Node Drag and Drop](#multiple-node-drag-and-drop)
   - 1.3 [Drag and Drop Events](#drag-and-drop-events)
2. [Filtering & Searching](#filtering--searching)
3. [Sorting](#sorting)
4. [Context Menu](#context-menu)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Accessibility Features](#accessibility-features)
7. [Performance Optimization](#performance-optimization)
8. [Advanced Scenarios](#advanced-scenarios)

---

## Drag and Drop

Enable node dragging and dropping using the `allowDragAndDrop` property:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let productTeam = [
    {
        id: 1, name: 'ASP.NET MVC Team', expanded: true,
        child: [
            { id: 2, pid: 1, name: 'Smith' },
            { id: 3, pid: 1, name: 'Johnson', isSelected: true },
            { id: 4, pid: 1, name: 'Anderson' },
        ]
    },
    {
        id: 5, name: 'Windows Team',
        child: [
            { id: 6, pid: 5, name: 'Clark' },
            { id: 7, pid: 5, name: 'Wright' },
            { id: 8, pid: 5, name: 'Lopez' },
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: productTeam, id: 'id', text: 'name', child: 'child', selected: 'isSelected' },
    allowDragAndDrop: true
});

treeObj.appendTo('#tree');
```

### Drop Indicators

The drag-and-drop interface shows indicator icons to show where nodes will be dropped:

| Icon | Meaning |
|------|---------|
| **Plus icon** | Indicates the dragged node will be added as a **child** of the target node |
| **Minus/Restrict icon** | Indicates the dragged node **cannot be dropped** at the hovered region |
| **In-between icon** | Indicates the dragged node will be added as a **sibling** of the hovered node |

### Multiple Node Drag and Drop

Enable `allowMultiSelection` along with `allowDragAndDrop` to drag multiple nodes:

```typescript
let treeObj = new TreeView({
    fields: { dataSource: productTeam, id: 'id', text: 'name', child: 'child', selected: 'isSelected' },
    allowDragAndDrop: true,
    allowMultiSelection: true  // Enable multi-select for drag-drop
});

treeObj.appendTo('#tree');
```

### Drag and Drop Events

The TreeView provides events to control drag-and-drop behavior:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let treeObj = new TreeView({
    fields: { dataSource: productTeam, id: 'id', text: 'name', child: 'child' },
    allowDragAndDrop: true,
    nodeDragStart: onDragStart,   // Fired when drag starts
    nodeDragging: onDragging,     // Fired while dragging
    nodeDragStop: onDragStop,     // Fired when drag ends
    nodeDropped: onDropped        // Fired when node is dropped
});

treeObj.appendTo('#tree');

function onDragStart(args: DragAndDropEventArgs): void {
    console.log('Drag started for:', args.nodeData.name);
}

function onDragging(args: DragAndDropEventArgs): void {
    console.log('Dragging...');
}

function onDragStop(args: DragAndDropEventArgs): void {
    console.log('Drag stopped');
}

function onDropped(args: DragAndDropEventArgs): void {
    console.log('Dropped on:', args.droppedNode);
}
```

### Restrict Drag and Drop for Specific Nodes

Use the `nodeDragStop` and `nodeDragging` events to control drag-drop behavior:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let fileData = [
    {
        nodeId: '01', nodeText: 'Music', icon: 'folder',
        nodeChild: [
            { nodeId: '01-01', nodeText: 'Song.mp3', icon: 'audio' }
        ]
    },
    {
        nodeId: '02', nodeText: 'Videos', icon: 'folder',
        nodeChild: [
            { nodeId: '02-01', nodeText: 'Video.mp4', icon: 'video' }
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: fileData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon' },
    allowDragAndDrop: true,
    nodeDragStop: dragStop,
    nodeDragging: nodeDrag
});

treeObj.appendTo('#tree');

function nodeDrag(args: DragAndDropEventArgs): void {
    // Check if target node is a folder (has folder icon)
    if (args.droppedNode != null && 
        args.droppedNode.getElementsByClassName('folder') && 
        args.droppedNode.getElementsByClassName('folder').length === 0) {
        
        // Set drop indicator to restrict
        args.dropIndicator = 'e-no-drop';
    }
}

function dragStop(args: DragAndDropEventArgs): void {
    // Prevent dropping on non-folder nodes
    if (args.droppedNode != null && 
        args.droppedNode.getElementsByClassName('folder') && 
        args.droppedNode.getElementsByClassName('folder').length === 0) {
        
        args.cancel = true;  // Cancel the drop operation
    }
}
```

## Keyboard Navigation

TreeView supports standard keyboard shortcuts for navigation and interaction:

| Key | Action |
|-----|--------|
| **Arrow Up/Down** | Navigate between nodes |
| **Arrow Left** | Collapse node / Move to parent |
| **Arrow Right** | Expand node / Move to first child |
| **Enter** | Select/Click node or start editing |
| **Space** | Toggle checkbox (if enabled) |
| **F2** | Start inline editing (if enabled) |
| **Escape** | Cancel editing / Close expanded node |
| **Ctrl+A** | Select all nodes (multi-select mode) |

## Expand/Collapse Features

### Auto-Expand on Selection

Use the `expandOn` property to control when nodes expand:

```typescript
let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', child: 'child' },
    expandOn: 'Click'  // 'DblClick' or 'Click'
});

treeObj.appendTo('#tree');
```

### Programmatic Expand/Collapse

```typescript
// Expand a node
let nodeElement = treeObj.getNode('nodeId');
if (nodeElement) {
    treeObj.expandNode(nodeElement);
}

// Collapse a node
treeObj.collapseNode(nodeElement);

// Expand all nodes
treeObj.expandAll();

// Collapse all nodes
treeObj.collapseAll();
```

## Node Manipulation Methods

### Getting Node Information

```typescript
// Get node element by ID
let nodeElement = treeObj.getNode('nodeId');

// Get node data
let nodeData = treeObj.getTreeData('nodeId');

// Get all child nodes
let childData = treeObj.getTreeData('parentId');

// Get all tree data
let allData = treeObj.getTreeData('');
```

### Modifying Nodes

```typescript
// Add new nodes
treeObj.addNodes([
    { id: 'new1', name: 'New Item 1' },
    { id: 'new2', name: 'New Item 2' }
], 'parentId');

// Remove nodes
treeObj.removeNodes(['nodeId1', 'nodeId2']);

// Update node data
let nodeData = { id: 'nodeId', name: 'Updated Name' };
treeObj.updateNode(['nodeId'], nodeData);

// Refresh node display
treeObj.refreshNode('nodeId');

// Move nodes
treeObj.moveNodes(['nodeId1', 'nodeId2'], 'targetParentId', 0);
```

## Accessibility Features

### ARIA Labels and Roles

TreeView automatically includes accessibility attributes:
- Proper ARIA roles (`treeitem`, `group`)
- ARIA labels for expanded/collapsed states
- Keyboard navigation support
- Focus management

### Focus Management

```typescript
// Set focus to a node
let nodeElement = treeObj.getNode('nodeId');
if (nodeElement) {
    nodeElement.focus();
}
```

### Screen Reader Support

- Node text is properly announced by screen readers
- Expand/collapse state changes are announced
- Checkbox state changes are announced
- Selection changes are announced with `aria-selected`

## Advanced Event Handling

### Node Expand/Collapse Events

```typescript
let treeObj = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'name', child: 'child' },
    nodeExpanding: onExpanding,  // Before expand
    nodeExpanded: onExpanded,    // After expand
    nodeCollapsing: onCollapsing, // Before collapse
    nodeCollapsed: onCollapsed   // After collapse
});

function onExpanding(args): void {
    console.log('Expanding node:', args.nodeData.name);
}

function onExpanded(args): void {
    console.log('Expanded node:', args.nodeData.name);
}

function onCollapsing(args): void {
    console.log('Collapsing node:', args.nodeData.name);
}

function onCollapsed(args): void {
    console.log('Collapsed node:', args.nodeData.name);
}
```

## Filtering and Searching

Filter tree nodes based on search criteria:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
import { TextBox } from '@syncfusion/ej2-inputs';
import { DataManager, Query } from '@syncfusion/ej2-data';
enableRipple(true);

let localData = [
    { id: 1, name: "Australia", hasChild: true },
    { id: 2, pid: 1, name: "New South Wales" },
    { id: 3, pid: 1, name: "Victoria" },
    { id: 7, name: "Brazil", hasChild: true },
    { id: 8, pid: 7, name: "Paraná" }
];

let treeObj = new TreeView({
    fields: { dataSource: localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' }
});

treeObj.appendTo('#treeView');

let searchBox = new TextBox({
    placeholder: "Search nodes...",
    change: filterNodes
});

searchBox.appendTo('#search');

function filterNodes(args: any) {
    const searchText = args.value.trim().toLowerCase();
    
    if (searchText === "") {
        treeObj.fields.dataSource = localData;
        return;
    }
    
    // Filter data where name contains search text
    const filtered = new DataManager(localData)
        .executeLocal(new Query().where('name', 'contains', searchText, true));
    
    // Get all parent nodes needed for filtered items
    const result = getFilteredWithParents(filtered, localData);
    treeObj.fields.dataSource = result;
}

function getFilteredWithParents(filteredList: any, originalData: any): any {
    let result: any = [];
    let parentIds: any = {};
    
    filteredList.forEach((item: any) => {
        result.push(item);
        let parent = item;
        while (parent.pid) {
            parentIds[parent.pid] = true;
            parent = originalData.find((d: any) => d.id === parent.pid);
        }
    });
    
    originalData.forEach((item: any) => {
        if (parentIds[item.id] && !result.find((r: any) => r.id === item.id)) {
            result.push(item);
        }
    });
    
    return result;
}
```

## Level-Wise Sorting

Sort tree nodes at each level independently:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeExpandEventArgs } from '@syncfusion/ej2-navigations';
import { DataManager, Query } from '@syncfusion/ej2-data';
enableRipple(true);

let countries = [
    { id: 1, name: 'India', hasChild: true },
    { id: 2, pid: 1, name: 'Assam' },
    { id: 3, pid: 1, name: 'Bihar' },
    { id: 7, name: 'Brazil', hasChild: true },
    { id: 8, pid: 7, name: 'Paraná' }
];

let treeObj = new TreeView({
    fields: { dataSource: countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    created: onCreate,
    nodeExpanding: onNodeExpand
});

treeObj.appendTo('#tree');

function onCreate() {
    // Sort root level nodes
    let rootData = new DataManager(treeObj.getTreeData()).executeLocal(
        new Query().where(treeObj.fields.parentID, 'equal', null, false)
    );
    
    let sortedData = rootData.sort((a: any, b: any) => 
        a.name.localeCompare(b.name)
    );
    
    treeObj.dataBind();
}

function onNodeExpand(args: NodeExpandEventArgs) {
    if (args.isInteracted && args.node.querySelector('li') === null) {
        let childList: any = [];
        for (let item of args.node.childNodes) {
            if (item.nodeType === 1) {
                childList.push({
                    element: item,
                    text: item.innerText
                });
            }
        }
        
        childList.sort((a: any, b: any) => 
            a.text.localeCompare(b.text)
        );
        
        childList.forEach((item: any) => {
            args.node.appendChild(item.element);
        });
    }
}
```

## Select One Child at a Time

Restrict to selecting only one child node per parent:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView, NodeSelectEventArgs } from '@syncfusion/ej2-navigations';
enableRipple(true);

let localData = [
    { id: 1, name: 'Parent 1', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Child 1' },
    { id: 3, pid: 1, name: 'Child 2' },
    { id: 7, name: 'Parent 2', hasChild: true, expanded: true },
    { id: 8, pid: 7, name: 'Child 1' }
];

let treeObj = new TreeView({
    fields: { dataSource: localData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' },
    allowMultiSelection: true,
    nodeSelecting: onNodeSelecting
});

treeObj.appendTo('#tree');

let parent: any = null;
let child: any = null;
let count: boolean = false;
let childCount: boolean = false;

function onNodeSelecting(args: NodeSelectEventArgs) {
    let id = args.nodeData.pid;
    
    if (!count) {
        parent = id;
        count = true;
    }
    
    if (!childCount) {
        child = args.nodeData.id;
        childCount = true;
    }
    
    if (id != null && id === parent) {
        let element = treeObj.element.querySelector('[data-uid="' + id + '"]');
        if (element) {
            let liElements = element.querySelectorAll('ul li');
            for (let i = 0; i < liElements.length; i++) {
                let nodeData = treeObj.getNode(liElements[i]);
                if (nodeData.selected && args.action === "select" && child !== args.nodeData.id) {
                    args.cancel = true;
                }
            }
        }
    } else if (id !== parent && id !== null) {
        if (args.action == "select") {
            args.cancel = true;
        }
    }
}
```

## Getting Child Nodes

Retrieve all child nodes for a given parent:

```typescript
import { enableRipple } from '@syncfusion/ej2-base';
import { TreeView } from '@syncfusion/ej2-navigations';
enableRipple(true);

let hierarchicalData = [
    {
        code: "AF", name: "Africa", countries: [
            { code: "NGA", name: "Nigeria" },
            { code: "EGY", name: "Egypt" }
        ]
    },
    {
        code: "AS", name: "Asia", countries: [
            { code: "CHN", name: "China" }
        ]
    }
];

let treeObj = new TreeView({
    fields: { dataSource: hierarchicalData, id: 'code', text: 'name', child: 'countries' },
    loadOnDemand: false,
    created: onCreate
});

treeObj.appendTo('#tree');

function onCreate() {
    document.getElementById("btn")?.addEventListener("click", () => {
        let parentId = (document.getElementById('nodeId') as HTMLInputElement).value;
        let element = treeObj.element.querySelector('[data-uid="' + parentId + '"]');
        
        if (element) {
            let childElements = element.querySelectorAll('ul li');
            let childArray: any = [];
            
            for (let i = 0; i < childElements.length; i++) {
                let nodeData = treeObj.getNode(childElements[i]);
                childArray.push(nodeData);
            }
            
            console.log('Child nodes:', childArray);
        }
    });
}
```

## Summary of Advanced Features

| Feature | Method/Property | Purpose |
|---------|-----------------|---------|
| **Drag and Drop** | `allowDragAndDrop: true` | Enable node dragging and dropping |
| **Multi-Select Drag** | `allowMultiSelection: true` | Drag multiple nodes at once |
| **Restrict Drop** | `DragAndDropEventArgs.dropIndicator = 'e-no-drop'` | Prevent dropping on certain nodes |
| **Expand All** | `treeObj.expandAll()` | Expand all nodes |
| **Collapse All** | `treeObj.collapseAll()` | Collapse all nodes |
| **Add Nodes** | `treeObj.addNodes(nodes, parentId)` | Add new nodes programmatically |
| **Remove Nodes** | `treeObj.removeNodes(nodeIds)` | Remove nodes |
| **Move Nodes** | `treeObj.moveNodes(sourceNodes: string[] | Element[], target: string | Element, index: number, preventTargetExpand?: boolean)` | Reorder nodes |
| **Update Node** | `treeObj.updateNode(nodeIds, data)` | Modify node properties |
| **Get Node Data** | `treeObj.getTreeData(id)` | Retrieve node information |
| **Filter Nodes** | Custom filtering | Search and filter nodes dynamically |
| **Level Sorting** | Custom sort logic | Sort nodes at each level independently |
| **Single Child Selection** | `nodeSelecting` event | Allow one child selection per parent |
| **Get Child Nodes** | DOM traversal | Retrieve all child nodes for a parent |
