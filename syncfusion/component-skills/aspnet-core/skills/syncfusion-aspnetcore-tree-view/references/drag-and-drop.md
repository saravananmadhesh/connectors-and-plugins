---
name: drag-and-drop
description: Implement TreeView drag and drop with validation, visual feedback, events, and copy/move operations.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Drag and Drop

## Table of Contents

- [Overview](#overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Basic Drag and Drop](#basic-drag-and-drop)
- [Drag and Drop Events](#drag-and-drop-events)
- [Drop Validation](#drop-validation)
- [Copy vs Move Operations](#copy-vs-move-operations)
- [Multiple Node Dragging](#multiple-node-dragging)
- [Drop Zones](#drop-zones)
- [Visual Feedback](#visual-feedback)
- [Child Restrictions](#child-restrictions)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView drag and drop enables:
- **Basic Dragging**: Move nodes within tree
- **Validation**: Control where nodes can drop
- **Copy/Move**: Duplicate or relocate nodes
- **Events**: Fire during drag, drop, and drop actions
- **Feedback**: Show drop position and restrictions
- **Zones**: Define drop areas

## Enabling Drag and Drop

### Basic Enable

**C# (TreeViewController.cs)**:
```csharp
public IActionResult BasicDragDrop()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Folder A",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "File A1" },
            new { id = 12, name = "File A2" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Folder B",
        hasChild = true,
        child = new object[] {
            new { id = 21, name = "File B1" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeDragDrop" allowDragAndDrop="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" 
        child="child" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

### Enable with Multiselect Drag

**Razor View**:
```html
<ejs-treeview id="treeMultiDrag" allowDragAndDrop="true" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

## Basic Drag and Drop

### Folder Structure Example

**Razor View**:
```html
<div style="padding: 20px; background: #f5f5f5;">
    <h3>Drag items between folders</h3>
    <ejs-treeview id="treeFolders" allowDragAndDrop="true">
        <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
    </ejs-treeview>
</div>

<button onclick="getTreeStructure()">Show Structure</button>
<div id="structure" style="margin-top: 20px; padding: 10px; background: #efefef;"></div>

<script>
    function getTreeStructure() {
        var treeObj = document.getElementById('treeFolders').ej2_instances[0];
        var data = treeObj.treeData;
        var structure = JSON.stringify(data, null, 2);
        document.getElementById('structure').textContent = structure;
    }
</script>
```

## Drag and Drop Events

### Node Dragging Event

**Razor View**:
```html
<ejs-treeview id="treeDragging" allowDragAndDrop="true" nodeDragging="onNodeDragging">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeDragging(args) {
        console.log('Dragging node:', args.draggedNode.textContent);
        console.log('Drop target:', args.dropTarget);
        console.log('Drag position:', args.dropPosition);  // Before, Inside, After
    }
</script>
```

### Node Dropped Event

**Razor View**:
```html
<ejs-treeview id="treeDropped" allowDragAndDrop="true" nodeDropped="onNodeDropped">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeDropped(args) {
        console.log('Dropped node:', args.draggedNode);
        console.log('Drop target:', args.droppedNode);
        console.log('Drop position:', args.dropPosition);
        
        // Log new tree structure
        var treeObj = document.getElementById('treeDropped').ej2_instances[0];
        console.log('New structure:', treeObj.treeData);
    }
</script>
```

### Drag Start Event

**Razor View**:
```html
<ejs-treeview id="treeDragStart" allowDragAndDrop="true" nodeDragStart="onDragStart">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onDragStart(args) {
        console.log('Start dragging:', args.draggedNode.textContent);
        // Can cancel drag by setting args.cancel = true
    }
</script>
```

## Drop Validation

### Prevent Drop on Specific Nodes

**Razor View**:
```html
<ejs-treeview id="treeValidate" allowDragAndDrop="true" nodeDragging="validateDrop">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function validateDrop(args) {
        var restrictedIds = [2];  // Cannot drop onto node 2
        
        var dropElement = args.dropTarget;
        var dropId = parseInt(dropElement.getAttribute('data-uid'));
        
        if (restrictedIds.indexOf(dropId) >= 0) {
            args.cancel = true;
            console.log('Drop not allowed on this node');
        }
    }
</script>
```

### Prevent Drop on Leaf Nodes

**Razor View**:
```html
<ejs-treeview id="treeLeafValidate" allowDragAndDrop="true" nodeDragging="preventDropOnLeaves">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" 
        child="child" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function preventDropOnLeaves(args) {
        var dropElement = args.dropTarget;
        
        // Check if target has children
        if (!dropElement.closest('[data-uid]').classList.contains('e-hasChild')) {
            args.cancel = true;
        }
    }
</script>
```

### Validate Based on Drop Position

**Razor View**:
```html
<ejs-treeview id="treePositionValidate" allowDragAndDrop="true" nodeDragging="validatePosition">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function validatePosition(args) {
        // Only allow dropping INSIDE (not Before/After)
        if (args.dropPosition !== 'Inside') {
            args.cancel = true;
        }
    }
</script>
```

## Copy vs Move Operations

### Move Operation (Default)

**Razor View**:
```html
<ejs-treeview id="treeMove" allowDragAndDrop="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<!-- Default behavior: nodes are moved (removed from source, added to target) -->
```

### Copy Operation with Ctrl+Drag

**Razor View**:
```html
<ejs-treeview id="treeCopy" allowDragAndDrop="true" nodeDragging="handleCopyDrag">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function handleCopyDrag(args) {
        // Check if Ctrl key is pressed
        if (args.originalEvent && args.originalEvent.ctrlKey) {
            // This will copy the node
            // Implementation depends on custom logic
            console.log('Copy drag detected');
        }
    }
</script>
```

## Multiple Node Dragging

### Drag Multiple Selected Nodes

**Razor View**:
```html
<ejs-treeview id="treeMultiNode" allowDragAndDrop="true" allowMultiSelection="true" 
    nodeDropped="onMultiNodeDropped">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onMultiNodeDropped(args) {
        var treeObj = document.getElementById('treeMultiNode').ej2_instances[0];
        var selected = treeObj.selectedNodes;
        console.log('Multiple nodes dropped. Selected count:', selected.length);
    }
</script>
```

## Drop Zones

### Define Drop Zone Container

**Razor View**:
```html
<div style="display: flex; gap: 20px;">
    <!-- Source TreeView -->
    <div id="sourceZone" style="border: 1px solid #ccc; padding: 10px; flex: 1;">
        <h3>Source</h3>
        <ejs-treeview id="treeSource" allowDragAndDrop="true">
            <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
        </ejs-treeview>
    </div>
    
    <!-- Target Zone -->
    <div id="targetZone" style="border: 1px solid #ccc; padding: 10px; flex: 1; background: #f9f9f9;">
        <h3>Drop Zone</h3>
        <ejs-treeview id="treeTarget" allowDragAndDrop="true">
            <e-treeview-fields dataSource="@(new List<object> { })" id="id" text="name" child="child"></e-treeview-fields>
        </ejs-treeview>
    </div>
</div>

<script>
    function setupDropZones() {
        var sourceTree = document.getElementById('treeSource').ej2_instances[0];
        var targetTree = document.getElementById('treeTarget').ej2_instances[0];
        
        // Configure drop zones if needed
        console.log('Drop zones configured');
    }
    
    window.addEventListener('load', setupDropZones);
</script>
```

## Visual Feedback

### Highlight Drop Target

**Razor View**:
```html
<ejs-treeview id="treeHighlight" allowDragAndDrop="true" nodeDragging="highlightDropTarget">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<style>
    .drop-target-highlight {
        background-color: #e3f2fd !important;
        border-left: 3px solid #2196f3 !important;
    }
</style>

<script>
    function highlightDropTarget(args) {
        var dropElement = args.dropTarget;
        
        // Remove previous highlights
        document.querySelectorAll('.drop-target-highlight').forEach(function(el) {
            el.classList.remove('drop-target-highlight');
        });
        
        // Add highlight to current drop target
        if (dropElement) {
            dropElement.classList.add('drop-target-highlight');
        }
    }
</script>
```

### Show Drag Count

**Razor View**:
```html
<div id="dragInfo" style="padding: 10px; background: #fff3cd; border-radius: 4px; margin-bottom: 10px;">
    Dragging: <span id="dragCount">0</span> item(s)
</div>

<ejs-treeview id="treeDragCount" allowDragAndDrop="true" allowMultiSelection="true" 
    nodeDragStart="updateDragCount">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function updateDragCount(args) {
        var treeObj = document.getElementById('treeDragCount').ej2_instances[0];
        var count = treeObj.selectedNodes.length || 1;
        document.getElementById('dragCount').textContent = count;
    }
</script>
```

## Child Restrictions

### Prevent Moving to Child Nodes

**C# (TreeViewController.cs)**:
```csharp
public IActionResult PreventCyclicMove()
{
    // Data with parent-child relationships
    List<object> treeData = new List<object>();
    // ... hierarchical data ...
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeCyclic" allowDragAndDrop="true" nodeDragging="preventCyclicDrop">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function preventCyclicDrop(args) {
        var treeObj = document.getElementById('treeCyclic').ej2_instances[0];
        
        var draggedId = parseInt(args.draggedNode.getAttribute('data-uid'));
        var targetId = parseInt(args.dropTarget.getAttribute('data-uid'));
        
        // Check if target is descendant of dragged node
        if (isDescendant(draggedId, targetId, treeObj)) {
            args.cancel = true;
            console.log('Cannot move node to its own child');
        }
    }
    
    function isDescendant(parentId, childId, treeObj) {
        // Implementation to check parent-child relationship
        return false;  // Placeholder
    }
</script>
```

## Advanced Patterns

### Pattern: Drag with Server Sync

**Razor View**:
```html
<ejs-treeview id="treeSync" allowDragAndDrop="true" nodeDropped="syncDragDrop">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function syncDragDrop(args) {
        var treeObj = document.getElementById('treeSync').ej2_instances[0];
        
        // Send update to server
        var draggedId = parseInt(args.draggedNode.getAttribute('data-uid'));
        var targetId = parseInt(args.dropTarget.getAttribute('data-uid'));
        var position = args.dropPosition;
        
        fetch('/TreeView/UpdateNodePosition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                draggedNodeId: draggedId,
                targetNodeId: targetId,
                position: position
            })
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            console.log('Server sync completed');
        });
    }
</script>
```

### Pattern: Undo/Redo Drag

**Razor View**:
```html
<button onclick="undoLastDrag()">Undo</button>
<button onclick="redoLastDrag()">Redo</button>

<ejs-treeview id="treeUndoRedo" allowDragAndDrop="true" nodeDropped="recordDragState">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var dragHistory = [];
    var historyIndex = 0;
    
    function recordDragState(args) {
        var treeObj = document.getElementById('treeUndoRedo').ej2_instances[0];
        var currentState = JSON.parse(JSON.stringify(treeObj.treeData));
        
        dragHistory = dragHistory.slice(0, historyIndex + 1);
        dragHistory.push(currentState);
        historyIndex++;
    }
    
    function undoLastDrag() {
        if (historyIndex > 0) {
            historyIndex--;
            restoreState(dragHistory[historyIndex]);
        }
    }
    
    function redoLastDrag() {
        if (historyIndex < dragHistory.length - 1) {
            historyIndex++;
            restoreState(dragHistory[historyIndex]);
        }
    }
    
    function restoreState(state) {
        var treeObj = document.getElementById('treeUndoRedo').ej2_instances[0];
        treeObj.treeData = state;
    }
</script>
```

## Troubleshooting

### Issue: Drag and Drop Not Working

**Problem**: Nodes cannot be dragged

**Solutions**:
1. Verify `allowDragAndDrop="true"` is set
2. Check data has hierarchical structure (parent-child)
3. Ensure no JavaScript errors in console
4. Check CSS is not blocking drag handlers

**Debug**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('allowDragAndDrop:', treeObj.allowDragAndDrop);
    console.log('Data:', treeObj.treeData);
</script>
```

### Issue: Drop Always Cancelled

**Problem**: Drops fail with no error message

**Solutions**:
1. Check nodeDragging event for args.cancel
2. Verify drop target is valid node
3. Check drop validation logic

---

**Next Steps**: Explore related features:
- [Node Selection](node-selection.md) - Select multiple drag nodes
- [Node Expansion](node-expansion.md) - Expand during drag
- [Node Manipulation](node-manipulation.md) - Programmatic node movement
