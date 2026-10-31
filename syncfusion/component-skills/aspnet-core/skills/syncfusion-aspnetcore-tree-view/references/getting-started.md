---
name: getting-started
description: Complete setup guide for ASP.NET Core TreeView with installation, configuration, and first working examples.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Getting Started

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Basic TreeView Example](#basic-treeview-example)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [Self-Referential Data Binding](#self-referential-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [First Interaction](#first-interaction)
- [Complete Configuration Example](#complete-configuration-example)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **.NET Core Version**: .NET 6.0 or higher
- **Package Manager**: NuGet
- **Visual Studio**: Visual Studio 2022 or later (or VS Code)
- **Browser**: Modern browser supporting ES2020+

### Project Requirements

- ASP.NET Core project (Web App with Razor Pages or MVC)
- NuGet package access
- License key for production use

## Installation

### Step 1: Add NuGet Package

Install the Syncfusion EJ2 ASP.NET Core package via NuGet Package Manager:

**Package Manager Console**:
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

**Or via .csproj file**:
```xml
<PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="25.1.39" />
```

**Or via .NET CLI**:
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

### Step 2: Verify Dependencies

The package automatically includes:
- `Newtonsoft.Json` - JSON serialization
- `Syncfusion.Licensing` - License validation

### Step 3: Register License Key

Add license key to your application:

**In Program.cs (Minimal API)**:
```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Add Syncfusion license
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

builder.Services.AddControllersWithViews();
var app = builder.Build();
app.Run();
```

## Project Setup

### Step 1: Add TagHelper

Open `~/Pages/_ViewImports.cshtml` (or `Views/Web.config` for MVC):

```html
@addTagHelper *, Syncfusion.EJ2
```

### Step 2: Add Styles and Scripts

In `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Syncfusion ASP.NET Core styles -->
    <link rel="stylesheet" href="url" />
    
    <title>TreeView Application</title>
</head>

<body>
    <!-- Page content here -->
    
    <!-- Syncfusion ASP.NET Core scripts -->
    <script src="url"></script>
    
    <!-- Script manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Step 3: Verify Installation

Create a test page to verify setup is complete.

## Basic TreeView Example

### Controller Code

**C# (TreeViewController.cs)**:
```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

public class TreeViewController : Controller
{
    public IActionResult Index()
    {
        // Create sample data
        List<object> treeData = new List<object>();
        treeData.Add(new { id = 1, name = "Documents", hasChild = true });
        treeData.Add(new { id = 2, pid = 1, name = "Reports" });
        treeData.Add(new { id = 3, pid = 1, name = "Proposals" });
        treeData.Add(new { id = 4, name = "Downloads", hasChild = true });
        treeData.Add(new { id = 5, pid = 4, name = "Software" });
        
        ViewBag.dataSource = treeData;
        return View();
    }
}
```

### Razor View Code

**HTML (Index.cshtml)**:
```html
@page "/treeview"

<h1>Basic TreeView</h1>

<ejs-treeview id="treeview">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

**Result**: Displays expandable tree with 2 root nodes (Documents, Downloads) and their children

## Hierarchical Data Binding

### Controller with Hierarchical Data

**C# (TreeViewController.cs)**:
```csharp
public IActionResult HierarchicalData()
{
    List<object> organData = new List<object>();
    
    organData.Add(new { 
        id = 1, 
        name = "CEO",
        children = new List<object> 
        {
            new { id = 2, name = "Manager" },
            new { id = 3, name = "Developer" }
        }
    });
    
    organData.Add(new { 
        id = 4, 
        name = "VP",
        children = new List<object> 
        {
            new { id = 5, name = "Finance Lead" }
        }
    });
    
    ViewBag.dataSource = organData;
    return View();
}
```

### Razor View with Hierarchical Fields

```html
<ejs-treeview id="treeHierarchical">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="children"></e-treeview-fields>
</ejs-treeview>
```

**Note**: Use `child="children"` for nested array property instead of `parentId`

## Self-Referential Data Binding

### Controller with Self-Referential Data

**C# (TreeViewController.cs)**:
```csharp
public IActionResult SelfReferentialData()
{
    List<object> employeeData = new List<object>();
    
    // Root level employees (parentID = null)
    employeeData.Add(new { id = 1, name = "Andrew Fuller", pid = null, hasChild = true });
    employeeData.Add(new { id = 9, name = "Janet Leverling", pid = null, hasChild = true });
    
    // Children of Andrew Fuller
    employeeData.Add(new { id = 2, name = "Nancy Davolio", pid = 1 });
    employeeData.Add(new { id = 3, name = "Margaret Hamilt", pid = 1 });
    
    // Children of Janet Leverling
    employeeData.Add(new { id = 10, name = "Robert King", pid = 9 });
    employeeData.Add(new { id = 11, name = "Michael Suyama", pid = 9 });
    
    ViewBag.dataSource = employeeData;
    return View();
}
```

### Razor View with Self-Referential Mapping

```html
<ejs-treeview id="treeSelfRef">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>
```

**Key Points**:
- `parentId="pid"` - Maps to parent ID field
- `hasChildren="hasChild"` - Optional: indicates if node has children

## Remote Data Binding

### OData V4 Binding

**Controller**:
```csharp
public IActionResult ODataBinding()
{
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeOData">
    <e-treeview-fields 
        dataSource="url"
        id="EmployeeID"
        text="FirstName"
        hasChildren="Reports">
    </e-treeview-fields>
</ejs-treeview>
```

### Web API Binding

**Controller**:
```csharp
public IActionResult WebApiBinding()
{
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeWebApi">
    <e-treeview-fields 
        id="id"
        parentId="parentId"
        text="name"
        hasChildren="hasChild">
        <e-datamanager url="url" adaptor="WebAPIAdaptor"></e-datamanager>
    </e-treeview-fields>
</ejs-treeview>
```

**Web API Endpoint Example**:
```csharp
[ApiController]
[Route("api/[controller]")]
public class TreeDataController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var data = new List<object>
        {
            new { id = 1, name = "Item 1", hasChild = true },
            new { id = 2, pid = 1, name = "Child 1" }
        };
        return Ok(data);
    }
}
```

## First Interaction

### Add Selection Event Handling

**Razor View**:
```html
<ejs-treeview id="treeview" nodeSelected="onNodeSelected">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" parentId="pid" text="name" hasChildren="hasChild"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelected(args) {
        console.log('Selected node:', args.nodeData.name);
        alert('Selected: ' + args.nodeData.name);
    }
</script>
```

### Programmatic Access

**Script in View**:
```html
<button onclick="expandAll()">Expand All</button>

<script>
    function expandAll() {
        var treeObj = document.getElementById('treeview').ej2_instances[0];
        
        // Get all node IDs
        var nodes = [];
        treeObj.element.querySelectorAll('li[data-uid]').forEach(function(li) {
            var id = li.getAttribute('data-uid');
            if (id) nodes.push(parseInt(id));
        });
        
        // Set expanded nodes
        treeObj.expandedNodes = nodes;
    }
</script>
```

## Complete Configuration Example

### Full Controller Implementation

**C# (TreeViewController.cs)**:
```csharp
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

public class TreeViewController : Controller
{
    public IActionResult Complete()
    {
        // Create hierarchical data with multiple properties
        List<object> treeData = new List<object>();
        
        treeData.Add(new 
        { 
            id = 1, 
            name = "Project Alpha", 
            iconCss = "e-icons e-folder",
            expanded = true,
            children = new List<object>
            {
                new { id = 2, name = "Design", iconCss = "e-icons e-folder" },
                new { id = 3, name = "Development", iconCss = "e-icons e-folder" }
            }
        });
        
        treeData.Add(new 
        { 
            id = 4, 
            name = "Project Beta", 
            iconCss = "e-icons e-folder",
            children = new List<object>
            {
                new { id = 5, name = "Testing", iconCss = "e-icons e-folder" }
            }
        });
        
        ViewBag.dataSource = treeData;
        ViewBag.expandedNodes = new List<int> { 1, 4 };
        
        return View();
    }
}
```

### Full Razor View Implementation

```html
@page "/treeview-complete"

<style>
    .treeview-container {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 10px;
        max-width: 400px;
    }
</style>

<div class="treeview-container">
    <h2>Project Structure</h2>
    
    <ejs-treeview id="treeComplete" 
        expandedNodes="ViewBag.expandedNodes"
        nodeSelected="onNodeSelected"
        nodeExpanded="onNodeExpanded">
        <e-treeview-fields dataSource="ViewBag.dataSource" 
            id="id" 
            text="name" 
            child="children"
            iconCss="iconCss"
            expanded="expanded">
        </e-treeview-fields>
    </ejs-treeview>
</div>

<p>
    <button class="btn btn-primary" onclick="getSelectedNode()">Get Selected</button>
    <button class="btn btn-secondary" onclick="expandAll()">Expand All</button>
</p>

<script>
    function onNodeSelected(args) {
        console.log('Selected:', args.nodeData.name);
    }
    
    function onNodeExpanded(args) {
        console.log('Expanded:', args.nodeData.name);
    }
    
    function getSelectedNode() {
        var treeObj = document.getElementById('treeComplete').ej2_instances[0];
        if (treeObj.selectedNode) {
            var data = treeObj.getTreeData(treeObj.selectedNode.getAttribute('data-uid'));
            alert('Selected node: ' + data.name);
        } else {
            alert('No node selected');
        }
    }
    
    function expandAll() {
        var treeObj = document.getElementById('treeComplete').ej2_instances[0];
        var allNodes = [];
        
        treeObj.element.querySelectorAll('li[data-uid]').forEach(function(li) {
            var id = li.getAttribute('data-uid');
            if (id) allNodes.push(parseInt(id));
        });
        
        treeObj.expandedNodes = allNodes;
    }
</script>
```

## Troubleshooting

### Issue: TreeView Not Rendering

**Problem**: Empty page or error

**Solutions**:
1. **Verify TagHelper Registration**:
   - Check `_ViewImports.cshtml` has `@addTagHelper *, Syncfusion.EJ2`
   - Verify `Syncfusion.EJ2.AspNet.Core` package is installed

2. **Check CSS/JS Loaded**:
   - Verify CDN URLs in `_Layout.cshtml`
   - Check browser console for 404 errors
   - Verify `<ejs-scripts></ejs-scripts>` is present

3. **Verify Data Source**:
   - Ensure `ViewBag.dataSource` is not null
   - Check controller is returning data

**Debug Script**:
```html
<script>
    window.addEventListener('load', function() {
        var element = document.getElementById('treeview');
        if (element && element.ej2_instances) {
            console.log('TreeView initialized successfully');
            console.log('Data source:', element.ej2_instances[0].localizedTexts);
        } else {
            console.error('TreeView not initialized');
        }
    });
</script>
```

### Issue: Data Not Loading

**Problem**: TreeView displays but no nodes appear

**Solutions**:
1. **Check Data Format**:
   ```csharp
   // Must have at least id and text/name
   var data = new { id = 1, name = "Item" };
   ```

2. **Verify Field Mapping**:
   ```html
   <!-- id and text attributes must match data properties -->
   <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
   ```

3. **Debug Data**:
   ```html
   <script>
       var treeObj = document.getElementById('treeview').ej2_instances[0];
       console.log('TreeView data:', treeObj.localizedTexts);
   </script>
   ```

### Issue: License Key Error

**Problem**: License validation error in console

**Solutions**:
1. Register valid license key in `Program.cs`
2. For trial: License auto-activates for 30 days
3. Check key format and expiration

```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

### Issue: Events Not Firing

**Problem**: nodeSelected, nodeExpanded not executing

**Solutions**:
1. Verify event attribute uses correct casing: `nodeSelected="onNodeSelected"`
2. Define JavaScript function in same view or global scope
3. Check for JavaScript errors in console

```html
<ejs-treeview id="treeview" nodeSelected="onNodeSelected">
    <!-- correct: camelCase attribute, matching function name -->
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    function onNodeSelected(args) {
        console.log('Event fired!');
    }
</script>
```

---

**Next Steps**: Explore related features:
- [Data Binding](data-binding-and-fields.md) - Complete data binding guide
- [Node Selection](node-selection.md) - Selection features
- [Checkboxes](checkboxes-and-checked-nodes.md) - Multi-select with checkboxes
