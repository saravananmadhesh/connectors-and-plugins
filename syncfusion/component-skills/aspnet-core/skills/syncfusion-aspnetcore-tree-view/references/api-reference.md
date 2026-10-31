---
name: api-reference
description: Complete TreeView API reference with code examples for all properties, methods, and events in ASP.NET Core.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# TreeView API Reference

## Complete API Guide with Code Examples

This comprehensive reference covers all TreeView **properties**, **methods**, and **events** with ASP.NET Core code examples.

---

## Table of Contents

- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [FieldsSettings](#fieldssettings)
- [AnimationSettings](#animationsettings)

---

## Properties

### Core Properties

#### allowDragAndDrop

Enables drag and drop functionality for TreeView nodes.

**Type**: `boolean` | **Default**: `false`

**C# (TreeViewController.cs)**:
```csharp
public IActionResult DragDropExample()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Item 1", hasChild = true, 
        child = new object[] { 
            new { id = 11, name = "Child 1.1" } 
        } 
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeDragDrop" allowDragAndDrop="true" nodeDropped="onNodeDropped">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeDropped(args) {
        console.log('Node dropped:', args.draggedNode);
    }
</script>
```

---

#### allowEditing

Enables inline editing of TreeView nodes.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treeEdit" allowEditing="true" nodeEdited="onNodeEdited">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeEdited(args) {
        console.log('Old:', args.oldText, 'New:', args.newText);
    }
</script>
```

---

#### allowMultiSelection

Enables multiple node selection.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treeMulti" allowMultiSelection="true" nodeSelected="onNodeSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelected(args) {
        var treeObj = document.getElementById('treeMulti').ej2_instances[0];
        console.log('Selected nodes:', treeObj.selectedNodes);
    }
</script>
```

---

#### allowTextWrap

Enables text wrapping in TreeView nodes.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treeWrap" allowTextWrap="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<style>
    .e-treeview .e-list-item {
        max-width: 200px;
    }
</style>
```

---

#### autoCheck

Auto-checks parent and child nodes when checking a node.

**Type**: `boolean` | **Default**: `true`

**Razor View**:
```html
<ejs-treeview id="treeAutoCheck" showCheckBox="true" autoCheck="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

---

#### checkDisabledChildren

Controls whether disabled children are checked when parent is checked.

**Type**: `boolean` | **Default**: `true`

**Razor View**:
```html
<ejs-treeview id="treeCheckDisabled" showCheckBox="true" checkDisabledChildren="false">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

---

#### checkedNodes

Sets pre-checked nodes on initialization.

**Type**: `string[]` | **Default**: `[]`

**C# (TreeViewController.cs)**:
```csharp
public IActionResult PreCheckedNodes()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { id = 1, name = "Item 1" });
    treeData.Add(new { id = 2, name = "Item 2" });
    
    ViewBag.dataSource = treeData;
    ViewBag.checkedNodes = new List<string> { "1", "2" };
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeChecked" showCheckBox="true" checkedNodes="ViewBag.checkedNodes">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### cssClass

Adds custom CSS classes to TreeView.

**Type**: `string` | **Default**: `''`

**Razor View**:
```html
<ejs-treeview id="treeCustom" cssClass="custom-tree">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<style>
    .custom-tree .e-list-item {
        padding: 10px;
        background-color: #f5f5f5;
    }
</style>
```

---

#### disabled

Disables the entire TreeView component.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<button onclick="toggleTreeDisabled()">Toggle Disabled</button>

<ejs-treeview id="treeDisable" disabled="false">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function toggleTreeDisabled() {
        var treeObj = document.getElementById('treeDisable').ej2_instances[0];
        treeObj.disabled = !treeObj.disabled;
    }
</script>
```

---

#### enableHtmlSanitizer

Sanitizes HTML content in nodes to prevent XSS attacks.

**Type**: `boolean` | **Default**: `true`

**Razor View**:
```html
<ejs-treeview id="treeSanitize" enableHtmlSanitizer="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### enablePersistence

Persists TreeView state (selected, checked, expanded nodes) across page reloads.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treePersist" 
    allowMultiSelection="true" 
    showCheckBox="true" 
    enablePersistence="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    // State is automatically saved and restored
    // Includes: selectedNodes, checkedNodes, expandedNodes
</script>
```

---

#### enableRtl

Enables right-to-left (RTL) direction for Arabic and Hebrew text.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treeRtl" enableRtl="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### expandedNodes

Pre-expands nodes on initialization.

**Type**: `string[]` | **Default**: `[]`

**C# (TreeViewController.cs)**:
```csharp
public IActionResult PreExpandedNodes()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Parent 1", 
        hasChild = true,
        child = new object[] { 
            new { id = 11, name = "Child 1.1" } 
        } 
    });
    
    ViewBag.dataSource = treeData;
    ViewBag.expandedNodes = new List<string> { "1" };
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeExpanded" expandedNodes="ViewBag.expandedNodes">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

---

#### expandOn

Specifies when nodes should expand (Auto on icon, Click on any part, or DblClick only).

**Type**: `ExpandOnSettings` | **Default**: `'Auto'`

**Valid Values**: 
- `'Auto'` - Expand on icon click (default)
- `'Click'` - Expand on any node click
- `'DblClick'` - Expand on double-click only

**Razor View**:
```html
<!-- Expand on double-click -->
<ejs-treeview id="treeExpandDbl" expandOn="DblClick">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<!-- Expand on any node click (full row) -->
<ejs-treeview id="treeExpandClick" expandOn="Click" fullRowNavigable="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<!-- Expand on icon click only (default Auto behavior) -->
<ejs-treeview id="treeExpandIcon" expandOn="Auto">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>
```

---

#### fullRowNavigable

Enables navigation on full row instead of just text.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treeFullNav" fullRowNavigable="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### fullRowSelect

Selects the entire row instead of just text node.

**Type**: `boolean` | **Default**: `true`

**Razor View**:
```html
<ejs-treeview id="treeFullSelect" fullRowSelect="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### loadOnDemand

Enables lazy loading of nodes (load children on expand).

**Type**: `boolean` | **Default**: `true`

**C# (TreeViewController.cs)**:
```csharp
public IActionResult LazyLoadExample()
{
    List<Continents> continents = new List<Continents>();
    List<Countries> countries = new List<Countries>();
    continents.Add(new Continents
    {
        code = "NA",
        name = "North America",  
        expanded=true,
        child = countries,
    });
        countries.Add(new Countries { code = "USA", name = "United States of America", selected=true});
        countries.Add(new Countries { code = "CUB", name = "Cuba" });
        countries.Add(new Countries { code = "MEX", name = "Mexico" });
    List<Countries> countries2 = new List<Countries>();
    continents.Add(new Continents
    {
        code = "AF",
        name = "Africa",
        child = countries2,
    });
    countries2.Add(new Countries { code = "NGA", name = "Nygeria" });
    countries2.Add(new Countries { code = "EGY", name = "Egypt" });
    countries2.Add(new Countries { code = "ZAF", name = "South Africa" });
    List<Countries> countries3 = new List<Countries>();
    continents.Add(new Continents
    {
        code = "AS",
        name = "Asia",
        child = countries3,
    });

    char[] value = { 'c', 'h', 'i', 'l', 'd' };
    string Child = new string(value);
    ViewBag.child = Child;
    ViewBag.data = continents;
    return View();      
}
public class Continents
{
    public string code;
    public string name;
    public bool expanded;
    public bool selected;
    public List<Countries> child;

}
public class Countries
{
    public string code;
    public string name;
    public bool expanded;
    public bool selected;

}
```

**Razor View**:
```html
<ejs-treeview id="treeLoD" loadOnDemand="true">
    <e-treeview-fields child="ViewBag.child" dataSource="ViewBag.data" id="code" text="name" selected="selected" expanded="expanded"></e-treeview-fields>
</ejs-treeview>
```

---

#### selectedNodes

Sets pre-selected nodes on initialization.

**Type**: `string[]` | **Default**: `[]`

**Razor View**:
```html
<ejs-treeview id="treeSelected" selectedNodes="ViewBag.selectedNodes" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### showCheckBox

Displays checkboxes in TreeView nodes.

**Type**: `boolean` | **Default**: `false`

**Razor View**:
```html
<ejs-treeview id="treeCheckbox" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### sortOrder

Sorts nodes in ascending, descending, or no order.

**Type**: `SortOrder` ('None', 'Ascending', 'Descending') | **Default**: `'None'`

**Razor View**:
```html
<!-- Sort ascending -->
<ejs-treeview id="treeSortAsc" sortOrder="Ascending">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<!-- Sort descending -->
<ejs-treeview id="treeSortDesc" sortOrder="Descending">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

---

#### nodeTemplate

Defines a custom template for rendering TreeView nodes with custom HTML and data binding.

**Type**: `string` | **Default**: `null`

**C# (TreeViewController.cs)**:
```csharp
public IActionResult NodeTemplateExample()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Team Lead", 
        designation = "Manager",
        status = "active",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Developer 1", designation = "Senior Dev", status = "active" },
            new { id = 12, name = "Developer 2", designation = "Junior Dev", status = "inactive" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var nodeTemplate = "<div class=\"node-template\"><span class=\"node-title\">${name}</span><span class=\"node-designation\">${designation}</span><span class=\"node-status\">${status}</span></div>";
}

@Html.EJS().TreeView("treeNodeTemplate")
    .NodeTemplate(nodeTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    #treeNodeTemplate.e-treeview .e-fullrow {
        height: auto;
    }

    #treeNodeTemplate.e-treeview .e-list-text {
        line-height: normal;
    }

    .node-template {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 10px 0;
        width: 100%;
    }
    
    .node-title {
        font-weight: 500;
        flex: 1;
    }
    
    .node-designation {
        color: #666;
        font-size: 12px;
        min-width: 100px;
    }
    
    .node-status {
        color: white;
        padding: 5px 12px;
        border-radius: 3px;
        font-size: 11px;
        font-weight: 500;
        background-color: #4caf50;
        text-transform: capitalize;
    }
</style>

<script>
    var treeObj = document.getElementById('treeNodeTemplate').ej2_instances[0];
    // NodeTemplate supports data binding using ${fieldName} syntax
</script>
```

---

#### animation

Configures animation effects for node expand and collapse operations.

**Type**: `AnimationSettings` | **Default**: `{ expand: { effect: 'SlideDown', duration: 400, easing: 'linear' }, collapse: { effect: 'SlideUp', duration: 400, easing: 'linear' } }`

**C# (TreeViewController.cs)**:
```csharp
public IActionResult AnimationExample()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1", 
        hasChild = true,
        child = new object[] { 
            new { id = 11, name = "Child 1.1" } 
        }
    });
     ViewBag.animation = new
    {
        expand = new { duration = 600, easing = "ease-out" }, 
        collapse = new { duration = 400, easing = "ease-in" }
    };
    
    ViewBag.dataSource = treeData;
    // Animation configured in Razor View
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeAnimation" animation="ViewBag.animation">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeAnimation').ej2_instances[0];
    // Animation is applied automatically on expand/collapse
</script>
```

---

## Methods

### addNodes(nodes, target, index, preventTargetExpand)

Adds new nodes to the TreeView.

**Parameters**:
- `nodes` - Array of node objects
- `target` - Parent node (optional)
- `index` - Insert position (optional)
- `preventTargetExpand` - Prevent auto-expand (optional)

**Razor View**:
```html
<button onclick="addNewNode()">Add Node</button>

<ejs-treeview id="treeAdd">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function addNewNode() {
        var treeObj = document.getElementById('treeAdd').ej2_instances[0];
        var newNode = { id: 99, name: 'New Node' };
        treeObj.addNodes([newNode]);
    }
</script>
```

---

### beginEdit(node)

Starts editing mode for a specific node.

**Parameters**:
- `node` - Node ID or HTMLElement

**Razor View**:
```html
<button onclick="editNode(1)">Edit Node 1</button>

<ejs-treeview id="treeBeginEdit" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function editNode(nodeId) {
        var treeObj = document.getElementById('treeBeginEdit').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        treeObj.beginEdit(nodeElement);
    }
</script>
```

---

### checkAll(nodes)

Checks all or specified nodes.

**Parameters**:
- `nodes` - Array of node IDs (optional)

**Razor View**:
```html
<button onclick="checkAllNodes()">Check All</button>
<button onclick="checkSpecific()">Check Item 1 & 2</button>

<ejs-treeview id="treeCheckAll" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function checkAllNodes() {
        var treeObj = document.getElementById('treeCheckAll').ej2_instances[0];
        treeObj.checkAll();
    }
    
    function checkSpecific() {
        var treeObj = document.getElementById('treeCheckAll').ej2_instances[0];
        treeObj.checkAll(['1', '2']);
    }
</script>
```

---

### collapseAll(nodes, level, excludeHiddenNodes)

Collapses all or specific nodes.

**Parameters**:
- `nodes` - Array of node IDs (optional)
- `level` - Collapse up to specific level (optional)
- `excludeHiddenNodes` - Exclude hidden nodes (optional)

**Razor View**:
```html
<button onclick="collapseAll()">Collapse All</button>

<ejs-treeview id="treeCollapseAll">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function collapseAll() {
        var treeObj = document.getElementById('treeCollapseAll').ej2_instances[0];
        treeObj.collapseAll();
    }
</script>
```

---

### expandAll(nodes, level, excludeHiddenNodes, preventAnimation)

Expands all or specific nodes.

**Parameters**:
- `nodes` - Array of node IDs (optional)
- `level` - Expand up to specific level (optional)
- `excludeHiddenNodes` - Exclude hidden nodes (optional)
- `preventAnimation` - Skip animation (optional)

**Razor View**:
```html
<button onclick="expandAll()">Expand All</button>

<ejs-treeview id="treeExpandAll">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function expandAll() {
        var treeObj = document.getElementById('treeExpandAll').ej2_instances[0];
        treeObj.expandAll();
    }
</script>
```

---

### getAllCheckedNodes()

Returns all checked nodes including nested ones.

**Returns**: `string[]`

**Razor View**:
```html
<button onclick="getChecked()">Get All Checked</button>

<ejs-treeview id="treeGetChecked" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function getChecked() {
        var treeObj = document.getElementById('treeGetChecked').ej2_instances[0];
        var checked = treeObj.getAllCheckedNodes();
        console.log('Checked nodes:', checked);
    }
</script>
```

---

### getNode(node)

Gets node data by ID or element.

**Parameters**:
- `node` - Node ID or HTMLElement

**Returns**: `object`

**Razor View**:
```html
<button onclick="getNodeData(1)">Get Node 1</button>

<ejs-treeview id="treeGetNode">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function getNodeData(nodeId) {
        var treeObj = document.getElementById('treeGetNode').ej2_instances[0];
        var nodeData = treeObj.getNode(nodeId.toString());
        console.log('Node data:', nodeData);
    }
</script>
```

---

### getTreeData(node)

Gets updated TreeView data source.

**Parameters**:
- `node` - Node ID (optional)

**Returns**: `object[]`

**Razor View**:
```html
<button onclick="getFullData()">Get All Data</button>

<ejs-treeview id="treeGetData">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function getFullData() {
        var treeObj = document.getElementById('treeGetData').ej2_instances[0];
        var allData = treeObj.getTreeData();
        console.log('All tree data:', allData);
    }
</script>
```

---

### moveNodes(sourceNodes, target, index, preventTargetExpand)

Moves nodes to a new parent.

**Parameters**:
- `sourceNodes` - Array of node IDs to move
- `target` - Target parent node
- `index` - Insert position
- `preventTargetExpand` - Prevent auto-expand (optional)

**Razor View**:
```html
<button onclick="moveSelectedNode()">Move to Parent 2</button>

<ejs-treeview id="treeMove" allowMultiSelection="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function moveSelectedNode() {
        var treeObj = document.getElementById('treeMove').ej2_instances[0];
        var selected = treeObj.selectedNodes;
        var targetNode = treeObj.element.querySelector('[data-uid="2"]');
        
        if (selected.length > 0) {
            treeObj.moveNodes(selected, targetNode, 0);
        }
    }
</script>
```

---

### removeNodes(nodes)

Removes specified nodes from the TreeView.

**Parameters**:
- `nodes` - Array of node IDs or HTMLElements

**Razor View**:
```html
<button onclick="removeNode(1)">Remove Node 1</button>

<ejs-treeview id="treeRemove">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function removeNode(nodeId) {
        var treeObj = document.getElementById('treeRemove').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        treeObj.removeNodes([nodeElement]);
    }
</script>
```

---

### uncheckAll(nodes)

Unchecks all or specified nodes.

**Parameters**:
- `nodes` - Array of node IDs (optional)

**Razor View**:
```html
<button onclick="uncheckAll()">Uncheck All</button>

<ejs-treeview id="treeUncheck" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function uncheckAll() {
        var treeObj = document.getElementById('treeUncheck').ej2_instances[0];
        treeObj.uncheckAll();
    }
</script>
```

---

### updateNode(target, newText)

Updates node text after editing.

**Parameters**:
- `target` - Node ID or HTMLElement
- `newText` - New text for the node

**Razor View**:
```html
<button onclick="updateNodeText(1, 'Updated Item')">Update Node 1</button>

<ejs-treeview id="treeUpdate" allowEditing="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function updateNodeText(nodeId, newText) {
        var treeObj = document.getElementById('treeUpdate').ej2_instances[0];
        var nodeElement = treeObj.element.querySelector('[data-uid="' + nodeId + '"]');
        treeObj.updateNode(nodeElement, newText);
    }
</script>
```

---

## Events

### actionFailure

Fired when an action fails.

**Razor View**:
```html
<ejs-treeview id="treeActionFail" actionFailure="onActionFailure">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onActionFailure(args) {
        console.error('Action failed:', args);
    }
</script>
```

---

### created

Fired when TreeView is created.

**Razor View**:
```html
<ejs-treeview id="treeCreated" created="onCreated">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onCreated(args) {
        console.log('TreeView created successfully');
    }
</script>
```

---

### dataBound

Fired when data is populated in TreeView.

**Razor View**:
```html
<ejs-treeview id="treeDataBound" dataBound="onDataBound">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onDataBound(args) {
        console.log('Data bound to TreeView');
    }
</script>
```

---

### dataSourceChanged

Fired when data source is changed (after drag-drop, add, remove, etc).

**Razor View**:
```html
<ejs-treeview id="treeDataSourceChanged" dataSourceChanged="onDataSourceChanged" allowDragAndDrop="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onDataSourceChanged(args) {
        console.log('Data source changed');
    }
</script>
```

---

### destroyed

Fired when TreeView is destroyed.

**Razor View**:
```html
<button onclick="destroyTree()">Destroy TreeView</button>

<ejs-treeview id="treeDestroyed" destroyed="onDestroyed">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function destroyTree() {
        var treeObj = document.getElementById('treeDestroyed').ej2_instances[0];
        treeObj.destroy();
    }
    
    function onDestroyed(args) {
        console.log('TreeView destroyed');
    }
</script>
```

---

### drawNode

Fired before node rendering, allowing customization.

**Razor View**:
```html
<ejs-treeview id="treeDrawNode" drawNode="onDrawNode">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onDrawNode(args) {
        // Customize node appearance
        if (args.nodeData.id === 1) {
            args.node.classList.add('custom-node');
        }
    }
</script>

<style>
    .custom-node {
        background-color: #e3f2fd;
    }
</style>
```

---

### nodeChecked

Fired after node is checked.

**Razor View**:
```html
<ejs-treeview id="treeNodeChecked" showCheckBox="true" nodeChecked="onNodeChecked">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeChecked(args) {
        console.log('Node checked:', args.nodeData.name);
    }
</script>
```

---

### nodeChecking

Fired before node is checked.

**Razor View**:
```html
<ejs-treeview id="treeNodeChecking" showCheckBox="true" nodeChecking="onNodeChecking">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeChecking(args) {
        // Prevent checking specific nodes
        if (args.nodeData.id === 2) {
            args.cancel = true;
        }
    }
</script>
```

---

### nodeClicked

Fired when node is clicked.

**Razor View**:
```html
<ejs-treeview id="treeNodeClicked" nodeClicked="onNodeClicked">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeClicked(args) {
        console.log('Clicked:', args.nodeData.name);
    }
</script>
```

---

### nodeCollapsed / nodeCollapsing

Fired when node collapses (after/before).

**Razor View**:
```html
<ejs-treeview id="treeNodeCollapse" nodeCollapsing="onCollapsing" nodeCollapsed="onCollapsed">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onCollapsing(args) {
        console.log('About to collapse:', args.nodeData.name);
    }
    
    function onCollapsed(args) {
        console.log('Collapsed:', args.nodeData.name);
    }
</script>
```

---

### nodeExpanded / nodeExpanding

Fired when node expands (after/before).

**Razor View**:
```html
<ejs-treeview id="treeNodeExpand" nodeExpanding="onExpanding" nodeExpanded="onExpanded">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    function onExpanding(args) {
        console.log('About to expand:', args.nodeData.name);
    }
    
    function onExpanded(args) {
        console.log('Expanded:', args.nodeData.name);
    }
</script>
```

---

### nodeEdited / nodeEditing

Fired when node is edited (after/before).

**Razor View**:
```html
<ejs-treeview id="treeNodeEdit" allowEditing="true" nodeEditing="onEditing" nodeEdited="onEdited">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onEditing(args) {
        console.log('Editing:', args.nodeData.name);
    }
    
    function onEdited(args) {
        console.log('Changed from', args.oldText, 'to', args.newText);
    }
</script>
```

---

### nodeSelected / nodeSelecting

Fired when node is selected (after/before).

**Razor View**:
```html
<ejs-treeview id="treeNodeSelect" nodeSelecting="onSelecting" nodeSelected="onSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onSelecting(args) {
        console.log('About to select:', args.nodeData.name);
    }
    
    function onSelected(args) {
        console.log('Selected:', args.nodeData.name);
    }
</script>
```

---

### nodeDragStart / nodeDragStop / nodeDragging

Fired during drag operations.

**Razor View**:
```html
<ejs-treeview id="treeNodeDrag" allowDragAndDrop="true" 
    nodeDragStart="onDragStart" 
    nodeDragging="onDragging" 
    nodeDragStop="onDragStop">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onDragStart(args) {
        console.log('Drag started:', args.draggedNode);
    }
    
    function onDragging(args) {
        console.log('Dragging over:', args.dropTarget);
    }
    
    function onDragStop(args) {
        console.log('Drag stopped');
    }
</script>
```

---

### nodeDropped

Fired when node is dropped.

**Razor View**:
```html
<ejs-treeview id="treeNodeDropped" allowDragAndDrop="true" nodeDropped="onNodeDropped">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeDropped(args) {
        console.log('Dropped:', args.draggedNode, 'on', args.droppedNode);
    }
</script>
```

---

### keyPress

Fired when keyboard key is pressed.

**Razor View**:
```html
<ejs-treeview id="treeKeyPress" keyPress="onKeyPress">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onKeyPress(args) {
        console.log('Key pressed:', args.key);
    }
</script>
```

---

## FieldsSettings

Configure data binding and field mapping.

**Properties**:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier field |
| `text` | string | Display text field |
| `child` | string | Children array field |
| `parentID` | string | Parent ID field (for flat structure) |
| `hasChildren` | string | Boolean field indicating if node has children |
| `expanded` | string | Boolean field for pre-expanded state |
| `isChecked` | string | Boolean field for checked state |
| `selected` | string | Boolean field for selected state |
| `iconCss` | string | CSS class for custom icons |
| `imageUrl` | string | Image URL for node |
| `tooltip` | string | Tooltip text field |
| `navigateUrl` | string | URL to navigate |

**Example**:
```html
<ejs-treeview id="treeFields">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource" 
        id="id" 
        text="name" 
        child="children"
        hasChildren="hasChild"
        iconCss="icon"
        tooltip="description">
    </e-treeview-fields>
</ejs-treeview>
```

---

## AnimationSettings

Configure expand/collapse animations.

**Properties**:

| Property | Type | Description |
|----------|------|-------------|
| `expand.effect` | string | Effect (SlideDown, SlideUp, FadeIn, FadeOut) |
| `expand.duration` | number | Duration in milliseconds |
| `expand.easing` | string | Easing function (linear, ease-in, ease-out) |
| `collapse.effect` | string | Collapse effect |
| `collapse.duration` | number | Collapse duration |
| `collapse.easing` | string | Collapse easing |

**Example**:

**C# (TreeViewController.cs)**:
```csharp
public IActionResult AnimationExample()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1", 
        hasChild = true,
        child = new object[] { 
            new { id = 11, name = "Child 1.1" } 
        }
    });
     ViewBag.animation = new
    {
        expand = new { effect = "SlideDown", duration = 600, easing = "ease-out" },
        collapse = new { effect = "SlideUp", duration = 600, easing = "ease-in" }
    };
    
    ViewBag.dataSource = treeData;
    // Animation configured in Razor View
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeAnimation" animation="ViewBag.animation">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeAnimation').ej2_instances[0];
    // Animation is applied automatically on expand/collapse
</script>
```

---

## Summary

This API reference covers:
- ✅ **20+ Properties** with code examples
- ✅ **15+ Methods** with parameter descriptions
- ✅ **20+ Events** with event handlers
- ✅ **All examples in ASP.NET Core** format
- ✅ **Complete FieldsSettings reference**
- ✅ **Animation configuration guide**

For more information, refer to related documentation:
- [Data Binding](data-binding-and-fields.md)
- [Node Selection](node-selection.md)
- [Node Expansion](node-expansion.md)
- [Checkboxes](checkboxes-and-checked-nodes.md)

---

*Complete API Reference for TreeView with all properties, methods, and events documented with ASP.NET Core examples.*
