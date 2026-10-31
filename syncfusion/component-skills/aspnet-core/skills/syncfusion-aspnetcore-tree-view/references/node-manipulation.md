---
name: node-manipulation
description: Dynamically add, remove, update, and move TreeView nodes programmatically with validation and server sync.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Node Manipulation

## Table of Contents

- [Overview](#overview)
- [Adding Nodes](#adding-nodes)
- [Removing Nodes](#removing-nodes)
- [Updating Nodes](#updating-nodes)
- [Moving Nodes](#moving-nodes)
- [Batch Operations](#batch-operations)
- [Node Collection Methods](#node-collection-methods)
- [Validation](#validation)
- [Server Synchronization](#server-synchronization)
- [Tree Structure Queries](#tree-structure-queries)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView node manipulation includes:
- **Add**: Insert new nodes at any position
- **Remove**: Delete single or multiple nodes
- **Update**: Modify existing node properties
- **Move**: Relocate nodes between parents
- **Batch**: Perform multiple operations efficiently
- **Query**: Find nodes and traverse tree

## Adding Nodes

### Add Single Node

**Razor View**:
```html
<input type="text" id="nodeText" placeholder="Enter node name" />
<button onclick="addNewNode()">Add Node</button>

<ejs-treeview id="treeAdd">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function addNewNode() {
        var treeObj = document.getElementById('treeAdd').ej2_instances[0];
        var text = document.getElementById('nodeText').value;
        
        if (text.trim() === '') {
            alert('Please enter node name');
            return;
        }
        
        var newNode = {
            id: Math.max(...treeObj.treeData.map(n => n.id), 0) + 1,
            name: text
        };
        
        treeObj.addNodes([newNode]);
        document.getElementById('nodeText').value = '';
    }
</script>
```

### Add as Child of Selected Node

**Razor View**:
```html
<button onclick="addChildNode()">Add Child</button>

<ejs-treeview id="treeAddChild" allowMultiSelection="false" nodeSelected="onNodeSelect">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var selectedNodeId = null;
    
    function onNodeSelect(args) {
        selectedNodeId = parseInt(args.node.getAttribute('data-uid'));
    }
    
    function addChildNode() {
        if (!selectedNodeId) {
            alert('Please select a parent node');
            return;
        }
        
        var treeObj = document.getElementById('treeAddChild').ej2_instances[0];
        var parentNode = treeObj.element.querySelector('[data-uid="' + selectedNodeId + '"]');
        
        var childNode = {
            id: Math.random() * 10000,
            name: 'New Child',
            pid: selectedNodeId
        };
        
        treeObj.addNodes([childNode], parentNode);
    }
</script>
```

### Add Multiple Nodes

**Razor View**:
```html
<button onclick="addMultipleNodes()">Add Multiple</button>

<ejs-treeview id="treeMultiAdd">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function addMultipleNodes() {
        var treeObj = document.getElementById('treeMultiAdd').ej2_instances[0];
        
        var newNodes = [];
        for (var i = 1; i <= 5; i++) {
            newNodes.push({
                id: Math.random() * 10000,
                name: 'Batch Item ' + i
            });
        }
        
        treeObj.addNodes(newNodes);
        console.log('Added ' + newNodes.length + ' nodes');
    }
</script>
```

## Removing Nodes

### Remove Single Node

**Razor View**:
```html
<button onclick="removeSelectedNode()">Remove Selected</button>

<ejs-treeview id="treeRemove" nodeSelected="onNodeSelect">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var selectedNode = null;
    
    function onNodeSelect(args) {
        selectedNode = args.node;
    }
    
    function removeSelectedNode() {
        if (!selectedNode) {
            alert('Please select a node');
            return;
        }
        
        var treeObj = document.getElementById('treeRemove').ej2_instances[0];
        treeObj.removeNodes([selectedNode]);
        selectedNode = null;
    }
</script>
```

### Remove with Confirmation

**Razor View**:
```html
<button onclick="removeWithConfirm()">Delete Node</button>

<ejs-treeview id="treeRemoveConfirm" nodeSelected="storeNode">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var nodeToDelete = null;
    
    function storeNode(args) {
        nodeToDelete = args.node;
    }
    
    function removeWithConfirm() {
        if (!nodeToDelete) {
            alert('Select a node first');
            return;
        }
        
        var nodeName = nodeToDelete.querySelector('.e-node-text').textContent;
        
        if (confirm('Delete "' + nodeName + '"?')) {
            var treeObj = document.getElementById('treeRemoveConfirm').ej2_instances[0];
            treeObj.removeNodes([nodeToDelete]);
            console.log('Node deleted');
        }
    }
</script>
```

### Remove Multiple Nodes

**Razor View**:
```html
<button onclick="removeSelected()">Delete Selected</button>

<ejs-treeview id="treeRemoveMulti" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function removeSelected() {
        var treeObj = document.getElementById('treeRemoveMulti').ej2_instances[0];
        var selectedElements = treeObj.element.querySelectorAll('.e-active');
        
        if (selectedElements.length === 0) {
            alert('Select nodes to delete');
            return;
        }
        
        treeObj.removeNodes(Array.from(selectedElements));
        console.log('Deleted ' + selectedElements.length + ' nodes');
    }
</script>
```

## Updating Nodes

### Update Node Text

**Razor View**:
```html
<input type="text" id="newText" placeholder="New text" />
<button onclick="updateNodeText()">Update</button>

<ejs-treeview id="treeUpdate" nodeSelected="storeSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var selectedElement = null;
    
    function storeSelected(args) {
        selectedElement = args.node;
    }
    
    function updateNodeText() {
        if (!selectedElement) {
            alert('Select a node');
            return;
        }
        
        var treeObj = document.getElementById('treeUpdate').ej2_instances[0];
        var newText = document.getElementById('newText').value;
        
        if (newText.trim()) {
            var nodeId = parseInt(selectedElement.getAttribute('data-uid'));
            var nodeData = treeObj.getTreeData(nodeId)[0];
            nodeData.name = newText;
            
            treeObj.updateNode(selectedElement, nodeData);
            document.getElementById('newText').value = '';
        }
    }
</script>
```

### Update Multiple Properties

**Razor View**:
```html
<button onclick="updateProperties()">Update Properties</button>

<ejs-treeview id="treeUpdateProp" nodeSelected="onSelect">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var current = null;
    
    function onSelect(args) {
        current = args.node;
    }
    
    function updateProperties() {
        if (!current) return;
        
        var treeObj = document.getElementById('treeUpdateProp').ej2_instances[0];
        var nodeId = parseInt(current.getAttribute('data-uid'));
        var nodeData = treeObj.getTreeData(nodeId)[0];
        
        // Update multiple properties
        nodeData.name = 'Updated ' + nodeData.name;
        nodeData.description = 'Updated description';
        nodeData.status = 'active';
        
        treeObj.updateNode(current, nodeData);
    }
</script>
```

## Moving Nodes

### Move Node to New Parent

**Razor View**:
```html
<button onclick="moveToParent()">Move to Selected Parent</button>

<ejs-treeview id="treeMove" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var nodeToMove = null;
    var targetParent = null;
    var clickCount = 0;
    
    document.getElementById('treeMove').addEventListener('click', function(e) {
        if (e.target.closest('.e-node-content')) {
            clickCount++;
            if (clickCount % 2 === 1) {
                nodeToMove = e.target.closest('.e-node');
                console.log('Node selected for moving');
            } else {
                targetParent = e.target.closest('.e-node');
                console.log('Target parent selected');
            }
        }
    });
    
    function moveToParent() {
        if (!nodeToMove || !targetParent) {
            alert('Select node to move and target parent');
            return;
        }
        
        var treeObj = document.getElementById('treeMove').ej2_instances[0];
        
        // Remove from current location
        treeObj.removeNodes([nodeToMove]);
        
        // Add to new parent
        var nodeData = treeObj.treeData[0];  // Get node data
        treeObj.addNodes([nodeData], targetParent);
    }
</script>
```

## Batch Operations

### Batch Add and Remove

**Razor View**:
```html
<button onclick="batchOperation()">Batch Operation</button>

<ejs-treeview id="treeBatch">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function batchOperation() {
        var treeObj = document.getElementById('treeBatch').ej2_instances[0];
        
        // Add multiple nodes
        var nodesToAdd = [
            { id: 101, name: 'Batch 1' },
            { id: 102, name: 'Batch 2' },
            { id: 103, name: 'Batch 3' }
        ];
        treeObj.addNodes(nodesToAdd);
        
        // Remove first 2 original nodes
        var firstNodes = treeObj.element.querySelectorAll('.e-node')[0];
        if (firstNodes) {
            treeObj.removeNodes([firstNodes]);
        }
        
        console.log('Batch operation completed');
    }
</script>
```

## Node Collection Methods

### Get All Nodes

**Razor View**:
```html
<button onclick="getAllNodes()">Get All</button>
<div id="nodeList" style="margin-top: 10px; padding: 10px; background: #f5f5f5;"></div>

<ejs-treeview id="treeGetAll">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function getAllNodes() {
        var treeObj = document.getElementById('treeGetAll').ej2_instances[0];
        var allNodes = treeObj.treeData;
        
        var html = '<strong>Total Nodes: ' + allNodes.length + '</strong><ul>';
        allNodes.forEach(function(node) {
            html += '<li>' + node.name + '</li>';
        });
        html += '</ul>';
        
        document.getElementById('nodeList').innerHTML = html;
    }
</script>
```

### Find Node by ID

**Razor View**:
```html
<input type="number" id="searchId" placeholder="Enter ID" />
<button onclick="findNodeById()">Find</button>

<ejs-treeview id="treeFindId">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function findNodeById() {
        var treeObj = document.getElementById('treeFindId').ej2_instances[0];
        var searchId = parseInt(document.getElementById('searchId').value);
        
        var result = treeObj.getTreeData(searchId);
        if (result && result.length > 0) {
            alert('Found: ' + result[0].name);
            // Scroll to node
            var element = treeObj.element.querySelector('[data-uid="' + searchId + '"]');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            alert('Node not found');
        }
    }
</script>
```

### Get Children of Node

**Razor View**:
```html
<ejs-treeview id="treeChildren" nodeSelected="showChildren">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<div id="childrenList" style="margin-top: 10px; padding: 10px; background: #f5f5f5;"></div>

<script>
    function showChildren(args) {
        var treeObj = document.getElementById('treeChildren').ej2_instances[0];
        var nodeId = parseInt(args.node.getAttribute('data-uid'));
        var nodeData = treeObj.getTreeData(nodeId)[0];
        
        if (nodeData && nodeData.child) {
            var html = '<strong>Children of ' + nodeData.name + ':</strong><ul>';
            nodeData.child.forEach(function(child) {
                html += '<li>' + child.name + '</li>';
            });
            html += '</ul>';
            
            document.getElementById('childrenList').innerHTML = html;
        }
    }
</script>
```

## Validation

### Validate Before Add

**Razor View**:
```html
<ejs-treeview id="treeValidateAdd">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function validateAndAdd(nodeData) {
        // Validate node data
        if (!nodeData.name || nodeData.name.trim() === '') {
            console.error('Node name is required');
            return false;
        }
        
        if (nodeData.name.length > 50) {
            console.error('Node name too long');
            return false;
        }
        
        // Check for duplicates
        var treeObj = document.getElementById('treeValidateAdd').ej2_instances[0];
        var exists = treeObj.treeData.some(function(n) {
            return n.name === nodeData.name;
        });
        
        if (exists) {
            console.error('Node with this name already exists');
            return false;
        }
        
        return true;
    }
</script>
```

## Server Synchronization

### Sync Add Operation

**Razor View**:
```html
<button onclick="addAndSync()">Add Node</button>

<ejs-treeview id="treeSyncAdd">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function addAndSync() {
        var treeObj = document.getElementById('treeSyncAdd').ej2_instances[0];
        
        var newNode = {
            id: Math.random() * 10000,
            name: 'New Node'
        };
        
        // First, add to UI
        treeObj.addNodes([newNode]);
        
        // Then sync with server
        fetch('/TreeView/AddNode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNode)
        })
        .then(function(response) { return response.json(); })
        .then(function(result) {
            if (result.success) {
                newNode.id = result.id;  // Update with server ID
                console.log('Node synced with server');
            } else {
                // Revert if sync fails
                treeObj.removeNodes([treeObj.element.querySelector('[data-uid]')]);
            }
        });
    }
</script>
```

## Tree Structure Queries

### Get Tree Path

**Razor View**:
```html
<ejs-treeview id="treeGetPath" nodeSelected="showPath">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<div id="pathDisplay" style="margin-top: 10px; padding: 10px; background: #f5f5f5;"></div>

<script>
    function showPath(args) {
        var path = [];
        var element = args.node;
        
        while (element && element.className.includes('e-node')) {
            var textElement = element.querySelector('.e-node-text');
            if (textElement) {
                path.unshift(textElement.textContent);
            }
            element = element.parentElement;
        }
        
        document.getElementById('pathDisplay').innerHTML = 
            '<strong>Path:</strong> ' + path.join(' > ');
    }
</script>
```

## Advanced Patterns

### Pattern: Undo/Redo Operations

**Razor View**:
```html
<button onclick="undo()">Undo</button>
<button onclick="redo()">Redo</button>

<ejs-treeview id="treeUndoRedo">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var operationHistory = [];
    var historyIndex = -1;
    
    function recordOperation(type, data) {
        historyIndex++;
        operationHistory = operationHistory.slice(0, historyIndex);
        operationHistory.push({ type: type, data: data });
    }
    
    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            applyOperation(operationHistory[historyIndex]);
        }
    }
    
    function redo() {
        if (historyIndex < operationHistory.length - 1) {
            historyIndex++;
            applyOperation(operationHistory[historyIndex]);
        }
    }
    
    function applyOperation(op) {
        // Apply operation logic
        console.log('Applied:', op);
    }
</script>
```

## Troubleshooting

### Issue: Node Not Added

**Problem**: addNodes() has no effect

**Solutions**:
1. Verify node has required ID
2. Check parent node exists (if using child)
3. Ensure tree data is mutable
4. Check browser console for errors

**Debug**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('Tree data before:', treeObj.treeData);
    treeObj.addNodes([{ id: 999, name: 'Test' }]);
    console.log('Tree data after:', treeObj.treeData);
</script>
```

### Issue: Update Not Reflecting

**Problem**: updateNode() doesn't update UI

**Solutions**:
1. Verify node element is found
2. Check updated data has same ID
3. Refresh tree if needed: `treeObj.refresh()`

---

**Next Steps**: Explore related features:
- [Drag and Drop](drag-and-drop.md) - Move nodes
- [Node Selection](node-selection.md) - Select before manipulation
- [Getting Started](getting-started.md) - Basic setup
