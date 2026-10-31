---
name: checkboxes-and-checked-nodes
description: Master TreeView checkboxes with showCheckBox property, checkedNodes tracking, parent-child dependencies, autoCheck functionality, and checkbox events.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Checkboxes and Checked Nodes

## Table of Contents

- [Overview](#overview)
- [Enabling Checkboxes](#enabling-checkboxes)
- [Checked Nodes Property](#checked-nodes-property)
- [Parent-Child Checkbox Dependencies](#parent-child-checkbox-dependencies)
- [Auto-Check Functionality](#auto-check-functionality)
- [Checkbox Events](#checkbox-events)
- [Programmatic Checkbox Control](#programmatic-checkbox-control)
- [Three-State Checkboxes](#three-state-checkboxes)
- [Check Disabled Children](#check-disabled-children)
- [Advanced Checkbox Patterns](#advanced-checkbox-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

Checkboxes provide an alternative selection mechanism that allows users to select multiple nodes without relying on keyboard modifiers. They are particularly useful on touch devices and for permission/role selection scenarios.

### Key Concepts

- **showCheckBox**: Boolean to display checkboxes
- **checkedNodes**: Array of checked node IDs
- **autoCheck**: Automatically check/uncheck parent and children
- **Three-State Checkbox**: Parent shows indeterminate state when some children are checked
- **checkDisabledChildren**: Control whether disabled children are checked

## Enabling Checkboxes

### Basic Checkbox Setup

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult CheckBox()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Folder 1", hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Item 1" });
    treeData.Add(new { id = 3, pid = 1, name = "Item 2" });
    treeData.Add(new { id = 4, name = "Folder 2", hasChild = true });
    treeData.Add(new { id = 5, pid = 4, name = "Item 3" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

**Visual Result**: Checkbox appears to the left of each node's expand icon

### Combining Checkboxes with Other Features

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult CheckBoxAdvanced()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Documents", hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Report.pdf" });
    treeData.Add(new { id = 3, pid = 1, name = "Summary.doc" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeAdvanced" showCheckBox="true" 
    allowMultiSelection="true" allowDragAndDrop="true" allowEditing="true"
    nodeChecked="onNodeChecked">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeChecked(args) {
        var treeObj = document.getElementById('treeAdvanced').ej2_instances[0];
        console.log('Checked nodes:', treeObj.checkedNodes);
    }
</script>
```

## Checked Nodes Property

### Getting Checked Nodes

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name"></e-treeview-fields>
</ejs-treeview>

<button onclick="getCheckedNodes()">Get Checked</button>

<script>
    function getCheckedNodes() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var checkedIds = treeObj.checkedNodes;
        console.log('Checked node IDs:', checkedIds);
        alert('Checked nodes: ' + checkedIds.join(', '));
    }
</script>
```

### Setting Checked Nodes

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult PreCheckedNodes()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Permission A" });
    treeData.Add(new { id = 2, name = "Permission B" });
    treeData.Add(new { id = 3, name = "Permission C" });
    
    ViewBag.dataSource = treeData;
    ViewBag.checkedNodes = new List<int> { 1, 2 };  // Pre-check nodes 1 and 2
    
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" checkedNodes="ViewBag.checkedNodes">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<button onclick="updateCheckedNodes()">Update Checked</button>

<script>
    function updateCheckedNodes() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        treeObj.checkedNodes = [2, 3];  // Dynamically update
    }
</script>
```

### Using isChecked Field in Data

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult CheckedField()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Permission A", isChecked = true, hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Read", isChecked = true });
    treeData.Add(new { id = 3, pid = 1, name = "Write", isChecked = false });
    treeData.Add(new { id = 4, name = "Permission B", isChecked = false, hasChild = true });
    treeData.Add(new { id = 5, pid = 4, name = "Delete", isChecked = false });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" 
        hasChildren="hasChild" isChecked="isChecked"></e-treeview-fields>
</ejs-treeview>
```

## Parent-Child Checkbox Dependencies

### Default Parent-Child Behavior

By default, when `autoCheck` is disabled, parent and child checkboxes are dependent:

- **Child Unchecked**: If any child is unchecked, parent shows indeterminate state
- **All Children Checked**: Parent becomes checked
- **All Children Unchecked**: Parent becomes unchecked
- **Parent Checked**: All children become checked
- **Parent Unchecked**: All children become unchecked

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult ParentChildDependency()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Folder A", hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Document 1" });
    treeData.Add(new { id = 3, pid = 1, name = "Document 2" });
    treeData.Add(new { id = 4, pid = 1, name = "Document 3" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" autoCheck="false">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

### Visual Feedback for Partial Selection

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function checkIndeterminate() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var elements = treeObj.element.querySelectorAll('.e-checkbox-wrapper input');
        
        elements.forEach(function(elem) {
            if (elem.indeterminate) {
                console.log('Parent has partial selection');
            }
        });
    }
</script>
```

## Auto-Check Functionality

### Enable Auto-Check

With `autoCheck: true`, checking a parent automatically checks all children, and vice versa:

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult AutoCheck()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Roles", hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Admin" });
    treeData.Add(new { id = 3, pid = 1, name = "User" });
    treeData.Add(new { id = 4, pid = 1, name = "Guest" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" autoCheck="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

**Behavior**:
- Check parent → All children automatically checked
- Check all children → Parent automatically checked
- Uncheck parent → All children automatically unchecked
- Uncheck any child → Parent automatically unchecked

## Checkbox Events

### Node Checking Event (Before)

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult CheckboxEvents()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Allow Editing" });
    treeData.Add(new { id = 2, name = "Restricted Permission" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" nodeChecking="onNodeChecking">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeChecking(args) {
        console.log('About to check:', args.nodeData.name);
        
        // Prevent checking restricted permissions
        if (args.nodeData.id === 2 && args.isChecked) {
            args.cancel = true;
            alert('Cannot check this permission');
        }
    }
</script>
```

### Node Checked Event (After)

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" nodeChecked="onNodeChecked">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeChecked(args) {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        console.log('Node checked:', args.nodeData.name);
        console.log('Current checked nodes:', treeObj.checkedNodes);
    }
</script>
```

### Event Argument Properties

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" nodeChecking="onNodeChecking">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeChecking(args) {
        console.log('cancel:', args.cancel);               // Prevent check action
        console.log('isChecked:', args.isChecked);         // true if checking
        console.log('isInteracted:', args.isInteracted);   // User interaction
        console.log('node:', args.node);                   // HTMLElement
        console.log('nodeData:', args.nodeData);           // Node data object
    }
</script>
```

## Programmatic Checkbox Control

### Check Single Node

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<button onclick="checkNode(1)">Check Node 1</button>
<button onclick="uncheckNode(1)">Uncheck Node 1</button>

<script>
    function checkNode(nodeId) {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var current = treeObj.checkedNodes;
        if (current.indexOf(nodeId) === -1) {
            current.push(nodeId);
            treeObj.checkedNodes = current;
        }
    }
    
    function uncheckNode(nodeId) {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        treeObj.checkedNodes = treeObj.checkedNodes.filter(function(id) { 
            return id !== nodeId; 
        });
    }
</script>
```

### Check All Nodes

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<button onclick="checkAllNodes()">Check All</button>
<button onclick="uncheckAllNodes()">Uncheck All</button>

<script>
    function checkAllNodes() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var allNodeIds = [];
        
        treeObj.element.querySelectorAll('li[data-uid]').forEach(function(li) {
            var id = li.getAttribute('data-uid');
            if (id) allNodeIds.push(parseInt(id));
        });
        
        treeObj.checkedNodes = allNodeIds;
    }
    
    function uncheckAllNodes() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        treeObj.checkedNodes = [];
    }
</script>
```

### Check by Filter

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<button onclick="checkFiltered('Read')">Check 'Read' Permissions</button>

<script>
    function checkFiltered(filter) {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var toCheck = [];
        
        treeObj.element.querySelectorAll('li[data-uid]').forEach(function(li) {
            var id = li.getAttribute('data-uid');
            var data = treeObj.getTreeData(id);
            
            if (data && data.name && data.name.includes(filter)) {
                toCheck.push(parseInt(id));
            }
        });
        
        treeObj.checkedNodes = toCheck;
    }
</script>
```

## Three-State Checkboxes

### Understanding Three States

**State 1: Unchecked (☐)**
- Node is unchecked
- All children are unchecked

**State 2: Checked (☑)**
- Node is checked
- All children are checked (when autoCheck enabled)

**State 3: Indeterminate (☑ with dash)**
- Some children are checked, some are unchecked
- Parent cannot be checked without checking all children first

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function detectThreeState() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var elements = treeObj.element.querySelectorAll('.e-checkbox-wrapper input');
        
        elements.forEach(function(checkbox) {
            if (checkbox.indeterminate) {
                console.log('Partial selection detected');
            }
        });
    }
</script>
```

## Check Disabled Children

### Control Checking of Disabled Children

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult CheckDisabledChildren()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Permissions", hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Read", disabled = false });
    treeData.Add(new { id = 3, pid = 1, name = "Delete", disabled = true });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" checkDisabledChildren="false">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" disabled="disabled"></e-treeview-fields>
</ejs-treeview>
```

**With `checkDisabledChildren: false` (default)**:
- When parent is checked, disabled children are NOT checked
- Disabled child checkboxes remain unchecked

**With `checkDisabledChildren: true`**:
- When parent is checked, disabled children ARE also checked
- Disabled children participate in parent-child dependency

## Advanced Checkbox Patterns

### Pattern 1: Permission Matrix

**C# (ASP.NET Core Controller)**:
```csharp
public IActionResult PermissionMatrix()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Files", hasChild = true });
    treeData.Add(new { id = 2, pid = 1, name = "Read" });
    treeData.Add(new { id = 3, pid = 1, name = "Write" });
    treeData.Add(new { id = 4, name = "Users", hasChild = true });
    treeData.Add(new { id = 5, pid = 4, name = "Read" });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" nodeChecked="onPermissionChange">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function onPermissionChange(args) {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        var permissions = {};
        
        treeObj.checkedNodes.forEach(function(id) {
            var data = treeObj.getTreeData(id);
            console.log('Checked:', data.name);
        });
    }
</script>
```

### Pattern 2: Validation Rules

**Razor/Script**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" nodeChecking="validatePermissions">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function validatePermissions(args) {
        // Rule: If Delete is checked, Read must be checked
        if (args.nodeData.action === 'delete' && args.isChecked) {
            var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
            var hasRead = false;
            
            treeObj.element.querySelectorAll('li[data-uid]').forEach(function(li) {
                var id = li.getAttribute('data-uid');
                var data = treeObj.getTreeData(id);
                if (data.action === 'read' && treeObj.checkedNodes.indexOf(parseInt(id)) >= 0) {
                    hasRead = true;
                }
            });
            
            if (!hasRead) {
                args.cancel = true;
                alert('Read permission required for Delete');
            }
        }
    }
</script>
```

## Troubleshooting

### Issue: Checkboxes Not Appearing

**Solutions**:
1. Verify `showCheckBox="true"` is set
2. Check CSS is loaded
3. Verify data has valid structure

**Razor/Debug**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function debugCheckboxes() {
        var treeObj = document.getElementById('treeCheckbox').ej2_instances[0];
        console.log('showCheckBox:', treeObj.showCheckBox);
        console.log('Checkbox count:', treeObj.element.querySelectorAll('.e-checkbox-wrapper').length);
    }
</script>
```

### Issue: autoCheck Not Working

**Problem**: Parent not auto-checking when children are checked

**Solutions**:
1. Verify `autoCheck="true"` is set
2. Ensure parent-child relationship is properly mapped
3. Check data doesn't have initial inconsistent state

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true" autoCheck="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

---

**Next Steps**: Explore related features:
- [Node Selection](node-selection.md) - Alternative selection method
- [Drag and Drop](drag-and-drop.md) - Move checked nodes
- [Node Editing](node-editing.md) - Edit with checkboxes
