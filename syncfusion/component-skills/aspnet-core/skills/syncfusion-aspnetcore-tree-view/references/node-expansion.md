---
name: node-expansion
description: Control TreeView node expansion with expandedNodes, expandOn behavior, load-on-demand, animations, and keyboard navigation.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Node Expansion

## Table of Contents

- [Overview](#overview)
- [Enabling Node Expansion](#enabling-node-expansion)
- [ExpandedNodes Property](#expandednodes-property)
- [ExpandOn Behavior](#expandon-behavior)
- [Programmatic Expansion](#programmatic-expansion)
- [Expansion Events](#expansion-events)
- [Load on Demand](#load-on-demand)
- [Animations](#animations)
- [Keyboard Expansion](#keyboard-expansion)
- [Parent-Child Expansion](#parent-child-expansion)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView expansion features:
- **Expand/Collapse**: Toggle node children visibility
- **ExpandedNodes**: Pre-expand nodes on load
- **ExpandOn**: Trigger expansion by click or double-click
- **Load-on-Demand**: Lazy-load children when expanded
- **Events**: Fire before (nodeExpanding) and after (nodeExpanded)
- **Animations**: Smooth expand/collapse transitions

## Enabling Node Expansion

### Basic Hierarchical Data

**C# (TreeViewController.cs)**:
```csharp
public IActionResult BasicExpansion()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Parent 1", 
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Child 1.1" },
            new { id = 12, name = "Child 1.2" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Parent 2",
        hasChild = true,
        child = new object[] {
            new { id = 21, name = "Child 2.1" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeBasic">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" 
        child="child" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

## ExpandedNodes Property

### Pre-Expand Nodes on Load

**C# (TreeViewController.cs)**:
```csharp
public IActionResult PreExpanded()
{
    // ... treeData setup ...
    ViewBag.dataSource = treeData;
    ViewBag.expandedNodes = new List<int> { 1, 2 };  // Expand nodes 1 and 2
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treePreExpand" expandedNodes="ViewBag.expandedNodes">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

### Get Currently Expanded Nodes

**Razor View**:
```html
<button onclick="getExpanded()">Get Expanded Nodes</button>

<ejs-treeview id="treeGet">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function getExpanded() {
        var treeObj = document.getElementById('treeGet').ej2_instances[0];
        var expanded = treeObj.expandedNodes;
        console.log('Expanded nodes:', expanded);
    }
</script>
```

### Dynamically Update Expanded Nodes

**Razor View**:
```html
<button onclick="expandAll()">Expand All</button>
<button onclick="collapseAll()">Collapse All</button>

<ejs-treeview id="treeUpdate">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function expandAll() {
        var treeObj = document.getElementById('treeUpdate').ej2_instances[0];
        var allNodes = treeObj.element.querySelectorAll('[data-uid]');
        allNodes.forEach(function(node) {
            treeObj.expandNode(node);
        });
    }
    
    function collapseAll() {
        var treeObj = document.getElementById('treeUpdate').ej2_instances[0];
        var allNodes = treeObj.element.querySelectorAll('[data-uid]');
        allNodes.forEach(function(node) {
            treeObj.collapseNode(node);
        });
    }
</script>
```

## ExpandOn Behavior

### Expand on Double-Click

**C# (TreeViewController.cs)**:
```csharp
public IActionResult ExpandOnDoubleClick()
{
    // ... hierarchical data setup ...
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeDoubleClick" expandOn="DoubleClick">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

### Expand on Single Click (Default)

**Razor View**:
```html
<ejs-treeview id="treeSingleClick" expandOn="Click">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

### Expand on Icon Click Only

**Razor View**:
```html
<ejs-treeview id="treeIconClick" expandOn="Icon">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

## Programmatic Expansion

### Expand Single Node

**Razor View**:
```html
<button onclick="expandNode(1)">Expand Node 1</button>

<ejs-treeview id="treeExpand">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function expandNode(nodeId) {
        var treeObj = document.getElementById('treeExpand').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        if (nodeElement) {
            treeObj.expandNode(nodeElement);
        }
    }
</script>
```

### Collapse Node

**Razor View**:
```html
<button onclick="collapseNode(1)">Collapse Node 1</button>

<ejs-treeview id="treeCollapse">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function collapseNode(nodeId) {
        var treeObj = document.getElementById('treeCollapse').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        if (nodeElement) {
            treeObj.collapseNode(nodeElement);
        }
    }
</script>
```

### Toggle Node State

**Razor View**:
```html
<button onclick="toggleNode(1)">Toggle Node 1</button>

<ejs-treeview id="treeToggle">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function toggleNode(nodeId) {
        var treeObj = document.getElementById('treeToggle').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        if (nodeElement && nodeElement.classList.contains('e-expanded')) {
            treeObj.collapseNode(nodeElement);
        } else if (nodeElement) {
            treeObj.expandNode(nodeElement);
        }
    }
</script>
```

## Expansion Events

### Node Expanding Event (Before)

**Razor View**:
```html
<ejs-treeview id="treeExpanding" nodeExpanding="onNodeExpanding">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeExpanding(args) {
        console.log('Expanding node:', args.nodeData.name);
        
        // Prevent expansion if needed
        if (args.nodeData.level > 2) {
            args.cancel = true;  // Don't expand beyond level 2
        }
    }
</script>
```

### Node Expanded Event (After)

**Razor View**:
```html
<ejs-treeview id="treeExpanded" nodeExpanded="onNodeExpanded">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeExpanded(args) {
        console.log('Node expanded:', args.nodeData.name);
        console.log('Expanded nodes:', args.expandedNodes);
    }
</script>
```

### Event Arguments

**Reference**:
```html
<script>
    function onNodeExpanding(args) {
        console.log('cancel:', args.cancel);                    // Can cancel expansion
        console.log('isInteracted:', args.isInteracted);        // User initiated
        console.log('node:', args.node);                        // HTMLElement
        console.log('nodeData:', args.nodeData);                // Node data
        console.log('nodeData.id:', args.nodeData.id);
        console.log('expandedNodes:', args.expandedNodes);      // All expanded
    }
</script>
```

## Load on Demand

### Basic Load-on-Demand Setup

**C# (TreeViewController.cs)**:
```csharp
public IActionResult LoadOnDemand()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Parent 1", 
        hasChild = true  // No child array - will load on expand
    });
    treeData.Add(new { 
        id = 2, 
        name = "Parent 2", 
        hasChild = true 
    });
    
    ViewBag.dataSource = treeData;
    return View();
}

// Endpoint for loading children
public IActionResult GetChildren(int id)
{
    List<object> children = new List<object>();
    
    if (id == 1) {
        children.Add(new { id = 11, name = "Child 1.1" });
        children.Add(new { id = 12, name = "Child 1.2" });
    }
    else if (id == 2) {
        children.Add(new { id = 21, name = "Child 2.1" });
    }
    
    return Json(children);
}
```

**Razor View**:
```html
<ejs-treeview id="treeLoD">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" 
        hasChildren="hasChild" 
        child="@Url.Action("GetChildren", "TreeView")"></e-treeview-fields>
</ejs-treeview>
```

### Load-on-Demand with Custom Loading

**Razor View**:
```html
<ejs-treeview id="treeLoDCustom" nodeExpanding="loadChildren">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function loadChildren(args) {
        var treeObj = document.getElementById('treeLoDCustom').ej2_instances[0];
        
        if (!args.nodeData.children && args.nodeData.hasChild) {
            // Show loading indicator
            var node = args.node;
            node.classList.add('e-loading');
            
            // Fetch children from server
            fetch('/TreeView/GetChildren?id=' + args.nodeData.id)
                .then(function(response) { return response.json(); })
                .then(function(children) {
                    treeObj.addNodes(children, null, 0);
                    node.classList.remove('e-loading');
                })
                .catch(function(error) {
                    console.error('Error loading children:', error);
                    node.classList.remove('e-loading');
                });
        }
    }
</script>
```

## Animations

### Enable/Disable Animations

**Razor View**:
```html
<!-- With animations (default) -->
<ejs-treeview id="treeAnimated" animation="@(new { collapse = new { duration = 400 }, expand = new { duration = 400 } })">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<!-- Disable animations -->
<ejs-treeview id="treeNoAnimation" animation="@(new { collapse = new { duration = 0 }, expand = new { duration = 0 } })">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

### Custom Animation Configuration

**Razor View**:
```html
<ejs-treeview id="treeCustomAnim" 
    animation="@(new { 
        collapse = new { duration = 600, easing = "ease-in" }, 
        expand = new { duration = 600, easing = "ease-out" } 
    })">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

## Keyboard Expansion

### Expand with Keyboard

**Razor View**:
```html
<ejs-treeview id="treeKeyboard">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<!-- Keyboard help -->
<div style="margin-top: 20px; padding: 10px; background: #f0f0f0;">
    <strong>Keyboard Navigation:</strong><br/>
    Right Arrow: Expand node (or move to first child)<br/>
    Left Arrow: Collapse node (or move to parent)<br/>
    Down Arrow: Next sibling<br/>
    Up Arrow: Previous sibling<br/>
</div>
```

## Parent-Child Expansion

### Expand Parent When Child Exists

**C# (TreeViewController.cs)**:
```csharp
public IActionResult ParentChildExpand()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Parent", 
        expanded = true,  // Parent expanded
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Child", expanded = true }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeParentChild">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" 
        child="child" expanded="expanded"></e-treeview-fields>
</ejs-treeview>
```

## Advanced Patterns

### Pattern: Lazy Expand All

**Razor View**:
```html
<button onclick="expandAllLazy()">Expand All (Lazy)</button>

<ejs-treeview id="treeLazy">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function expandAllLazy() {
        var treeObj = document.getElementById('treeLazy').ej2_instances[0];
        var parentNodes = treeObj.element.querySelectorAll('[data-uid][class*="e-hasChild"]');
        
        var index = 0;
        function expandNext() {
            if (index < parentNodes.length) {
                treeObj.expandNode(parentNodes[index]);
                index++;
                setTimeout(expandNext, 200);  // 200ms delay between expansions
            }
        }
        expandNext();
    }
</script>
```

### Pattern: Expansion Level Limit

**Razor View**:
```html
<ejs-treeview id="treeLimit" nodeExpanding="limitExpansionDepth">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function limitExpansionDepth(args) {
        var maxDepth = 2;  // Allow expansion up to depth 2
        
        var depth = 0;
        var parent = args.node.parentElement;
        while (parent && parent.className.includes('e-treeview')) {
            depth++;
            parent = parent.parentElement;
        }
        
        if (depth > maxDepth) {
            args.cancel = true;
        }
    }
</script>
```

## Troubleshooting

### Issue: Nodes Not Expanding

**Problem**: Click on expand icon has no effect

**Solutions**:
1. Verify hierarchical structure with `child` property
2. Check `hasChildren` property is set correctly
3. Ensure `expandedNodes` uses correct node IDs
4. Check browser console for errors

**Debug**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('Data source:', treeObj.fields.dataSource);
    console.log('Child property:', treeObj.fields.child);
    console.log('Expanded nodes:', treeObj.expandedNodes);
</script>
```

### Issue: Load-on-Demand Not Working

**Problem**: Children not loading when expanding

**Solutions**:
1. Check AJAX URL is correct
2. Verify server returns valid JSON
3. Check browser Network tab for failed requests
4. Ensure node has `hasChild: true`

---

**Next Steps**: Explore related features:
- [Node Selection](node-selection.md) - Select expanded nodes
- [Drag and Drop](drag-and-drop.md) - Move expanded nodes
- [Data Binding](data-binding-and-fields.md) - Configure hierarchical data
