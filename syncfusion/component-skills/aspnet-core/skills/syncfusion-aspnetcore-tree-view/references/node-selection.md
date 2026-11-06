---
name: node-selection
description: Master TreeView node selection with single/multi-selection, keyboard shortcuts, programmatic control, and selection events.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Node Selection

## Table of Contents

- [Overview](#overview)
- [Single Node Selection](#single-node-selection)
- [Multi-Selection with Keyboard](#multi-selection-with-keyboard)
- [Programmatic Selection](#programmatic-selection)
- [Selected Nodes Property](#selected-nodes-property)
- [Selection Events](#selection-events)
- [Preventing Selection](#preventing-selection)
- [Full Row Selection](#full-row-selection)
- [Selection Persistence](#selection-persistence)
- [Advanced Patterns](#advanced-patterns)
- [Keyboard Navigation](#keyboard-navigation)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView supports flexible node selection:
- **Single Selection**: Click to select (default)
- **Multi-Selection**: Ctrl+Click or Shift+Click
- **Programmatic**: Set via selectedNodes property
- **Events**: Fire before (nodeSelecting) and after (nodeSelected)
- **Persistence**: Save/restore selection state

## Single Node Selection

### Basic Single Selection

**C# (TreeViewController.cs)**:
```csharp
public IActionResult SingleSelection()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Item 1" });
    treeData.Add(new { id = 2, name = "Item 2" });
    treeData.Add(new { id = 3, name = "Item 3" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeSingle" nodeSelected="onNodeSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelected(args) {
        console.log('Selected node:', args.nodeData.name);
    }
</script>
```

### Pre-Select Node

**C# (TreeViewController.cs)**:
```csharp
public IActionResult PreSelected()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Item 1", selected = false });
    treeData.Add(new { id = 2, name = "Item 2", selected = true });  // Pre-selected
    treeData.Add(new { id = 3, name = "Item 3", selected = false });
    
    ViewBag.dataSource = treeData;
    ViewBag.selectedNodes = new List<int> { 2 };
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treePreSelected" selectedNodes="ViewBag.selectedNodes">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" selected="selected"></e-treeview-fields>
</ejs-treeview>
```

## Multi-Selection with Keyboard

### Enable Multi-Selection

**C# (TreeViewController.cs)**:
```csharp
public IActionResult MultiSelection()
{
    List<object> treeData = new List<object>();
    for (int i = 1; i <= 5; i++)
    {
        treeData.Add(new { id = i, name = "Item " + i });
    }
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeMulti" allowMultiSelection="true" nodeSelected="onNodeSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelected(args) {
        var treeObj = document.getElementById('treeMulti').ej2_instances[0];
        console.log('Currently selected:', treeObj.selectedNodes);
    }
</script>
```

### Multi-Select with Checkboxes Alternative

**Razor View**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<button onclick="getSelectedItems()">Get Selected</button>

<script>
    function getSelectedItems() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        console.log('Checked nodes:', treeObj.checkedNodes);
    }
</script>
```

## Programmatic Selection

### Select Single Node

**Razor View**:
```html
<button onclick="selectNode(2)">Select Item 2</button>

<ejs-treeview id="treeProgrammatic">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function selectNode(nodeId) {
        var treeObj = document.getElementById('treeProgrammatic').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        if (nodeElement) {
            treeObj.selectNode(nodeElement);
        }
    }
</script>
```

### Select Multiple Nodes

**Razor View**:
```html
<button onclick="selectMultiple()">Select Items 1, 2, 3</button>

<ejs-treeview id="treeMultiSelect" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function selectMultiple() {
        var treeObj = document.getElementById('treeMultiSelect').ej2_instances[0];
        var nodeIds = [1, 2, 3];
        
        nodeIds.forEach(function(id) {
            var nodeElement = treeObj.element.querySelector('[data-uid="' + id + '"]');
            if (nodeElement) {
                treeObj.selectNode(nodeElement);
            }
        });
    }
</script>
```

### Deselect Nodes

**Razor View**:
```html
<button onclick="clearSelection()">Clear Selection</button>

<ejs-treeview id="treeDeselect" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function clearSelection() {
        var treeObj = document.getElementById('treeDeselect').ej2_instances[0];
        var selectedElements = treeObj.element.querySelectorAll('.e-active');
        selectedElements.forEach(function(el) {
            treeObj.unselectNode(el);
        });
    }
</script>
```

## Selected Nodes Property

### Get Selected Nodes

**Razor View**:
```html
<button onclick="getSelected()">Get Selected Nodes</button>

<ejs-treeview id="treeGet" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function getSelected() {
        var treeObj = document.getElementById('treeGet').ej2_instances[0];
        var selectedIds = treeObj.selectedNodes;
        console.log('Selected node IDs:', selectedIds);
        
        // Get full data of selected nodes
        var selectedData = selectedIds.map(function(id) {
            return treeObj.getTreeData(id);
        });
        console.log('Selected data:', selectedData);
    }
</script>
```

### Set Selected Nodes Dynamically

**Razor View**:
```html
<button onclick="setSelection()">Select Nodes 1 and 3</button>

<ejs-treeview id="treeSet" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function setSelection() {
        var treeObj = document.getElementById('treeSet').ej2_instances[0];
        treeObj.selectedNodes = [1, 3];  // Set specific nodes as selected
    }
</script>
```

## Selection Events

### Node Selecting Event (Before)

**Razor View**:
```html
<ejs-treeview id="treeSelecting" nodeSelecting="onNodeSelecting">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelecting(args) {
        console.log('About to select:', args.nodeData.name);
        
        // Prevent selection if needed
        if (args.nodeData.id === 4) {
            args.cancel = true;
            console.log('Selection prevented for Item 4');
        }
    }
</script>
```

### Node Selected Event (After)

**Razor View**:
```html
<ejs-treeview id="treeSelected" nodeSelected="onNodeSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelected(args) {
        console.log('Node selected:', args.nodeData.name);
        console.log('Is user interaction:', args.isInteracted);
        
        // Update UI or save state
        updateSelectionDisplay(args.nodeData);
    }
    
    function updateSelectionDisplay(nodeData) {
        var display = document.getElementById('selectionDisplay');
        if (display) {
            display.textContent = 'Selected: ' + nodeData.name;
        }
    }
</script>
```

### Event Arguments Reference

**Razor/Script**:
```html
<ejs-treeview id="treeEvents" nodeSelecting="onNodeSelecting">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelecting(args) {
        console.log('cancel:', args.cancel);                    // Can cancel selection
        console.log('isInteracted:', args.isInteracted);        // User clicked
        console.log('node:', args.node);                        // HTMLElement
        console.log('nodeData:', args.nodeData);                // Node data object
        console.log('nodeData.id:', args.nodeData.id);
        console.log('nodeData.name:', args.nodeData.name);
    }
</script>
```

## Preventing Selection

### Prevent Specific Nodes from Selection

**Razor View**:
```html
<ejs-treeview id="treePrevent" nodeSelecting="preventRestrictedSelection">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function preventRestrictedSelection(args) {
        var restrictedIds = [2, 4];  // Cannot select these nodes
        
        if (restrictedIds.indexOf(args.nodeData.id) >= 0) {
            args.cancel = true;
            alert('Cannot select this item');
        }
    }
</script>
```

### Use selectable Field

**C# (TreeViewController.cs)**:
```csharp
public IActionResult SelectableField()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Selectable Item", selectable = true });
    treeData.Add(new { id = 2, name = "Disabled Item", selectable = false });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeSelectable">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" selectable="selectable"></e-treeview-fields>
</ejs-treeview>
```

## Full Row Selection

### Enable Full Row Select

**Razor View**:
```html
<ejs-treeview id="treeFullRow" fullRowSelect="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

### Full Row Navigation

**Razor View**:
```html
<ejs-treeview id="treeFullNav" fullRowSelect="true" fullRowNavigable="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

## Selection Persistence

### Save to LocalStorage

**Razor View**:
```html
<button onclick="saveSelection()">Save</button>
<button onclick="loadSelection()">Load</button>

<ejs-treeview id="treePersist" allowMultiSelection="true" nodeSelected="onSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onSelected(args) {
        // Auto-save on selection
        saveSelection();
    }
    
    function saveSelection() {
        var treeObj = document.getElementById('treePersist').ej2_instances[0];
        var selected = treeObj.selectedNodes;
        localStorage.setItem('treeSelection', JSON.stringify(selected));
        console.log('Selection saved');
    }
    
    function loadSelection() {
        var treeObj = document.getElementById('treePersist').ej2_instances[0];
        var saved = localStorage.getItem('treeSelection');
        if (saved) {
            treeObj.selectedNodes = JSON.parse(saved);
            console.log('Selection restored');
        }
    }
    
    // Load on page load
    window.addEventListener('load', loadSelection);
</script>
```

## Advanced Patterns

### Pattern: Selection with Context Menu

**Razor View**:
```html
<ejs-treeview id="treeContext" nodeSelected="onNodeSelected" nodeClicked="onNodeRightClick">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<div id="contextMenu" style="display:none; position:absolute; border:1px solid #ccc; background:white;">
    <button onclick="performAction('delete')">Delete</button>
    <button onclick="performAction('edit')">Edit</button>
    <button onclick="performAction('copy')">Copy</button>
</div>

<script>
    function onNodeSelected(args) {
        console.log('Node selected:', args.nodeData.id);
    }
    
    function performAction(action) {
        var treeObj = document.getElementById('treeContext').ej2_instances[0];
        var selected = treeObj.selectedNodes;
        console.log(action + ' on nodes:', selected);
    }
</script>
```

### Pattern: Selection Statistics

**Razor View**:
```html
<div id="stats">Selected: <span id="count">0</span></div>

<ejs-treeview id="treeStats" allowMultiSelection="true" nodeSelected="updateStats">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function updateStats() {
        var treeObj = document.getElementById('treeStats').ej2_instances[0];
        var count = treeObj.selectedNodes.length;
        document.getElementById('count').textContent = count;
    }
</script>
```

## Keyboard Navigation

### Selection with Arrow Keys

**Razor View**:
```html
<ejs-treeview id="treeKeyboard" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<!-- Keyboard help -->
<div style="margin-top: 20px; padding: 10px; background: #f0f0f0;">
    <strong>Keyboard:</strong><br/>
    Arrow Up/Down: Navigate<br/>
    Ctrl+Click: Multi-select<br/>
    Space: Select/Deselect<br/>
</div>
```

## Troubleshooting

### Issue: Multi-Selection Not Working

**Problem**: Ctrl+Click doesn't select multiple nodes

**Solutions**:
1. Verify `allowMultiSelection="true"` is set
2. Check browser console for errors
3. Ensure event handlers don't prevent default behavior

**Debug**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('allowMultiSelection:', treeObj.allowMultiSelection);
    console.log('selectedNodes:', treeObj.selectedNodes);
</script>
```

### Issue: Selection Events Not Firing

**Problem**: nodeSelected event not executing

**Solutions**:
1. Verify event attribute: `nodeSelected="onNodeSelected"`
2. Check function is defined in script
3. Look for JavaScript errors in console

---

**Next Steps**: Explore related features:
- [Checkboxes](checkboxes-and-checked-nodes.md) - Checkbox selection
- [Node Expansion](node-expansion.md) - Expand/collapse
- [Drag and Drop](drag-and-drop.md) - Move selected nodes
