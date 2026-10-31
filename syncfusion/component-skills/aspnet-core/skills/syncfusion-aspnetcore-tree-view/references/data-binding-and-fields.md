---
name: data-binding-and-fields
description: Complete guide to TreeView data binding with FieldsSettings configuration, local and remote data sources, and DataManager integration.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Data Binding and Fields

## Table of Contents

- [Overview](#overview)
- [FieldsSettings Configuration](#fieldssettings-configuration)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [Self-Referential Data Binding](#self-referential-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Configuration](#datamanager-configuration)
- [Field Mapping Reference](#field-mapping-reference)
- [Load-on-Demand Optimization](#load-on-demand-optimization)
- [Dynamic Data Updates](#dynamic-data-updates)
- [Error Handling](#error-handling)
- [Advanced Scenarios](#advanced-scenarios)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView supports multiple data binding approaches:
- **Local Data**: Arrays from server (hierarchical or self-referential)
- **Remote Data**: OData, Web API, or custom services
- **Dynamic Loading**: Lazy load on demand
- **Live Updates**: Real-time data refresh

## FieldsSettings Configuration

### All Available Field Properties

**C# (TreeViewController.cs)**:
```csharp
public IActionResult FieldsExample()
{
    List<object> treeData = new List<object>();
    treeData.Add(new 
    { 
        id = 1,
        name = "Documents",
        parentId = null,
        hasChildren = true,
        iconCss = "e-icons e-folder",
        imageUrl = "~/images/folder.png",
        tooltip = "Click to expand",
        navigateUrl = "#documents",
        expanded = true,
        selected = false,
        isChecked = false,
        disabled = false,
        htmlAttributes = "data-type='folder'"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeFields">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource"
        id="id"
        parentId="parentId"
        text="name"
        hasChildren="hasChildren"
        iconCss="iconCss"
        imageUrl="imageUrl"
        tooltip="tooltip"
        navigateUrl="navigateUrl"
        expanded="expanded"
        isChecked="isChecked"
        selected="selected"
        disabled="disabled">
    </e-treeview-fields>
</ejs-treeview>
```

### Core Field Properties Table

| Property | Type | Description |
|----------|------|-------------|
| dataSource | array | Data collection |
| id | string | Unique identifier |
| text | string | Display text |
| parentId | string | Parent node reference |
| child | string | Nested children array property |
| hasChildren | string | Boolean property indicating children |
| expanded | string | Pre-expanded state |
| selected | string | Pre-selected state |
| isChecked | string | Pre-checked state |
| iconCss | string | CSS class for icon |
| imageUrl | string | Image URL |
| tooltip | string | Tooltip text |
| navigateUrl | string | Navigation link |
| disabled | string | Disabled state |

## Hierarchical Data Binding

### Local Hierarchical Data (Nested Arrays)

**C# (TreeViewController.cs)**:
```csharp
public IActionResult HierarchicalBinding()
{
    List<object> organData = new List<object>();
    
    organData.Add(new 
    { 
        id = 1,
        name = "CEO",
        expanded = true,
        children = new List<object>
        {
            new { id = 2, name = "HR Manager" },
            new { id = 3, name = "Finance Manager" }
        }
    });
    
    organData.Add(new 
    { 
        id = 4,
        name = "Board Members",
        children = new List<object>
        {
            new { id = 5, name = "Board Chair" },
            new { id = 6, name = "Vice Chair" }
        }
    });
    
    ViewBag.dataSource = organData;
    return View();
}
```

**Razor (ASP.NET Core View)**:
```html
<ejs-treeview id="treeHierarchical" expandedNodes="ViewBag.expandedNodes">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource"
        id="id"
        text="name"
        child="children"
        expanded="expanded">
    </e-treeview-fields>
</ejs-treeview>
```

### Multi-Level Hierarchical Data

**C# (TreeViewController.cs)**:
```csharp
public IActionResult MultiLevelData()
{
    List<object> data = new List<object>();
    
    data.Add(new 
    { 
        id = 1,
        name = "Root",
        expanded = true,
        children = new List<object>
        {
            new 
            { 
                id = 2, 
                name = "Level 1 - Node 1",
                children = new List<object>
                {
                    new { id = 3, name = "Level 2 - Node 1" },
                    new { id = 4, name = "Level 2 - Node 2" }
                }
            },
            new { id = 5, name = "Level 1 - Node 2" }
        }
    });
    
    ViewBag.dataSource = data;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeMultiLevel">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="children"></e-treeview-fields>
</ejs-treeview>
```

## Self-Referential Data Binding

### Flat Array with Parent ID

**C# (TreeViewController.cs)**:
```csharp
public IActionResult SelfReferentialBinding()
{
    List<object> employeeData = new List<object>();
    
    // Root employees (parentID = null or not specified)
    employeeData.Add(new { id = 1, name = "Andrew Fuller", pid = null, hasChild = true });
    employeeData.Add(new { id = 9, name = "Janet Leverling", pid = null, hasChild = true });
    
    // Children of Andrew Fuller (id = 1)
    employeeData.Add(new { id = 2, name = "Nancy Davolio", pid = 1 });
    employeeData.Add(new { id = 3, name = "Margaret Hamilton", pid = 1 });
    
    // Children of Janet Leverling (id = 9)
    employeeData.Add(new { id = 10, name = "Robert King", pid = 9 });
    employeeData.Add(new { id = 11, name = "Michael Suyama", pid = 9 });
    
    ViewBag.dataSource = employeeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeSelfRef">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource"
        id="id"
        parentId="pid"
        text="name"
        hasChildren="hasChild">
    </e-treeview-fields>
</ejs-treeview>
```

### Comparison: Hierarchical vs Self-Referential

| Aspect | Hierarchical | Self-Referential |
|--------|-------------|------------------|
| Structure | Nested children property | Flat array with parentID |
| Performance | Better for small datasets | Better for large datasets |
| Database | Requires JOIN operations | Single table query |
| Flexibility | Less flexible | More flexible |
| Child Property | Use `child="children"` | Use `parentId="pid"` |

## Remote Data Binding

### OData V4 Service

**C# (TreeViewController.cs)**:
```csharp
public IActionResult RemoteData()
{
    TreeViewFieldsSettings childData = new TreeViewFieldsSettings();
    childData.Query = "new ej.data.Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5)";
    childData.Id = "OrderID";
    childData.Text = "ShipName";
    childData.ParentID = "EmployeeID";
    childData.DataSource = new DataManager
    {
        Url = "https://services.odata.org/V4/Northwind/Northwind.svc",
        Adaptor = "ODataV4Adaptor",
        CrossDomain = true
    };
    ViewBag.child = childData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="tree">
  <e-treeview-fields child="ViewBag.child" query="new ej.data.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5)" id="EmployeeID" text="FirstName" hasChildren="EmployeeID">
       <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc" adaptor="ODataV4Adaptor" crossDomain="true"></e-data-manager>
  </e-treeview-fields>
</ejs-treeview>
```

## DataManager Configuration

### DataManager with URL Adaptor

**Razor View**:
```html
<ejs-treeview id="treeDataManager">
    <e-treeview-fields id="id" text="name" parentId="pid" hasChildren="hasChild">
        <e-datamanager url="url" adaptor="UrlAdaptor"></e-datamanager>
    </e-treeview-fields>
</ejs-treeview>
```

### DataManager with OData Adaptor

**Razor View**:
```html
<ejs-treeview id="treeODataManager">
    <e-treeview-fields id="EmployeeID" text="FirstName" parentId="ReportsTo" hasChildren="Reports">
        <e-datamanager url="url" adaptor="ODataV4Adaptor"></e-datamanager>
    </e-treeview-fields>
</ejs-treeview>
```

### DataManager with Query Filtering

**Razor View with Query**:
```html
<ejs-treeview id="treeQuery">
    <e-treeview-fields id="OrderID" text="ShipName">
        <e-datamanager url="url" adaptor="ODataV4Adaptor">
            <e-query where="new ej2.data.Predicate('ShipCity', 'equal', 'London')" expand="Customer"></e-query>
        </e-datamanager>
    </e-treeview-fields>
</ejs-treeview>
```

## Field Mapping Reference

### Text Field with Custom Function

**C# (TreeViewController.cs)**:
```csharp
public IActionResult CustomTextField()
{
    List<object> treeData = new List<object>();
    treeData.Add(new 
    { 
        id = 1, 
        firstName = "John", 
        lastName = "Doe",
        title = "Manager"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View with Custom Text**:
```html
<ejs-treeview id="treeCustomText">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource"
        id="id"
        text="title">
    </e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeCustomText').ej2_instances[0];
    
    // Apply custom formatting after binding
    treeObj.addEventListener('dataBound', function() {
        treeObj.element.querySelectorAll('li').forEach(function(li) {
            var data = treeObj.getTreeData(li.getAttribute('data-uid'));
            li.querySelector('.e-list-text').textContent = data.firstName + ' ' + data.lastName;
        });
    });
</script>
```

## Load-on-Demand Optimization

### Enable Load-on-Demand

**C# (TreeViewController.cs)**:
```csharp
public IActionResult LoadOnDemand()
{
    List<object> treeData = new List<object>();
    
    // Only root level nodes initially
    treeData.Add(new { id = 1, name = "Folder 1", hasChild = true });
    treeData.Add(new { id = 2, name = "Folder 2", hasChild = true });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View (Load-on-Demand enabled by default)**:
```html
<ejs-treeview id="treeLoadOnDemand" loadOnDemand="true">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource"
        id="id"
        parentId="pid"
        text="name"
        hasChildren="hasChild">
    </e-treeview-fields>
</ejs-treeview>
```

### Disable Load-on-Demand (Load All)

**Razor View**:
```html
<ejs-treeview id="treeLoadAll" loadOnDemand="false">
    <e-treeview-fields 
        dataSource="ViewBag.dataSource"
        id="id"
        parentId="pid"
        text="name"
        hasChildren="hasChild">
    </e-treeview-fields>
</ejs-treeview>
```

## Dynamic Data Updates

### Refresh Data

**Razor View with Refresh Button**:
```html
<button onclick="refreshData()">Refresh Data</button>

<ejs-treeview id="treeRefresh">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function refreshData() {
        var treeObj = document.getElementById('treeRefresh').ej2_instances[0];
        treeObj.refresh();
    }
</script>
```

### Update Specific Node Data

**Razor View**:
```html
<button onclick="updateNodeData()">Update Node</button>

<ejs-treeview id="treeUpdate">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function updateNodeData() {
        var treeObj = document.getElementById('treeUpdate').ej2_instances[0];
        var nodeData = treeObj.getTreeData(1);
        nodeData.name = 'Updated Name';
        treeObj.updateNode(nodeData);
    }
</script>
```

## Error Handling

### Handle Data Binding Errors

**Razor View with Error Handler**:
```html
<ejs-treeview id="treeError" actionFailure="onActionFailure">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onActionFailure(args) {
        console.error('Data binding error:', args);
        alert('Failed to load data: ' + args.error.message);
    }
</script>
```

### Validate Data Before Binding

**C# (TreeViewController.cs)**:
```csharp
public IActionResult ValidateData()
{
    List<object> treeData = new List<object>();
    
    try
    {
        // Validate data
        var dataSource = GetDataFromService();
        if (dataSource == null || dataSource.Count == 0)
        {
            throw new Exception("No data available");
        }
        
        ViewBag.dataSource = dataSource;
    }
    catch (Exception ex)
    {
        ViewBag.error = ex.Message;
        ViewBag.dataSource = new List<object>();
    }
    
    return View();
}

private List<object> GetDataFromService()
{
    // Your data retrieval logic
    return new List<object>();
}
```

## Advanced Scenarios

### Scenario 1: Multi-Source Data Merging

**C# (TreeViewController.cs)**:
```csharp
public IActionResult MergedDataSources()
{
    var localData = GetLocalData();
    var remoteData = GetRemoteData();
    
    var mergedData = localData.Concat(remoteData).ToList();
    ViewBag.dataSource = mergedData;
    
    return View();
}
```

### Scenario 2: Hierarchical with Custom Properties

**C# (TreeViewController.cs)**:
```csharp
public IActionResult CustomProperties()
{
    List<object> treeData = new List<object>();
    
    treeData.Add(new 
    { 
        id = 1,
        name = "File.pdf",
        type = "file",
        size = 2048,
        modified = DateTime.Now,
        owner = "admin@example.com",
        hasChild = false,
        iconCss = "e-icons e-file"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

## Troubleshooting

### Issue: Data Not Loading

**Symptoms**: Empty tree or no nodes visible

**Solutions**:
1. Verify field mapping matches data properties
2. Check ViewBag.dataSource is populated
3. Verify id and text fields are present

**Debug Script**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('Data:', treeObj.localizedTexts);
    console.log('Fields:', treeObj.fields);
</script>
```

### Issue: Remote Data Not Loading

**Symptoms**: No nodes from OData/WebAPI

**Solutions**:
1. Verify URL is correct and accessible
2. Check CORS headers if cross-domain
3. Verify adaptor matches service type (OData, WebAPI, etc.)
4. Check browser console for network errors

**Debug Remote**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    treeObj.addEventListener('actionFailure', function(args) {
        console.error('Remote data error:', args);
    });
</script>
```

### Issue: Parent-Child Relationship Broken

**Symptoms**: All nodes show as root level

**Solutions**:
1. For hierarchical: Ensure `child="children"` property exists
2. For self-ref: Ensure all parent IDs exist in data
3. For self-ref: Root nodes should have `pid = null`

---

**Next Steps**: Explore related features:
- [Getting Started](getting-started.md) - Initial setup
- [Node Selection](node-selection.md) - Selection features
- [Node Manipulation](node-manipulation.md) - Add/remove nodes
