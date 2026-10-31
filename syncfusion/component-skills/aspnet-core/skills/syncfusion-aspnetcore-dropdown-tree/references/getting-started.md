---
name: getting-started-dropdown-tree
---

# Getting Started with Syncfusion DropDownTree Component

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [Platform Setup](#platform-setup)
  - [ASP.NET Core Setup](#aspnet-core-setup)
  - [ASP.NET MVC Setup](#aspnet-mvc-setup)
- [Basic Implementation](#basic-implementation)
- [Data Binding Methods](#data-binding-methods)
- [First Rendering Example](#first-rendering-example)
- [Troubleshooting](#troubleshooting)

## Overview

The Syncfusion DropDownTree component provides a dropdown interface with hierarchical tree structure support. This comprehensive guide walks through the complete setup process, from package installation through first component rendering. Whether you're building an ASP.NET Core or ASP.NET MVC application, this guide covers all the necessary steps to get the component working in your project.

The DropDownTree component is part of the Syncfusion Essential JS 2 library and integrates seamlessly with both tag helper and Razor syntax approaches. It supports various data sources including local arrays, remote services via DataManager adaptors, and provides extensive customization options for templates, styles, and interactions.

## Prerequisites

Before implementing the Syncfusion DropDownTree component, your development environment should meet the following requirements:

### System Requirements

- **Operating System**: Windows 10 or later, macOS 10.12 or later, or Ubuntu 16.04 or later
- **RAM**: Minimum 4 GB (8 GB recommended for optimal performance)
- **.NET Framework**: 
  - For ASP.NET Core: .NET 6.0, 7.0, 8.0, or later
  - For ASP.NET MVC: .NET Framework 4.6.2 or higher
- **Browser Support**: IE 11, Edge, Chrome (latest), Firefox (latest), Safari (latest)

### Required Software

1. **Visual Studio**: 
   - Visual Studio 2022 (Recommended) or Visual Studio 2019 with latest updates
   - Community, Professional, or Enterprise editions all supported
   - Installation should include ".NET desktop development" workload

2. **Node.js and npm** (optional but recommended for additional build tools):
   - Node.js 14.x or later
   - npm 6.x or later
   - Verify installation: `npm --version`

3. **Git** (optional but recommended):
   - For cloning sample projects and managing version control

4. **Development Tools**:
   - Internet access for NuGet package downloads
   - Appropriate Visual Studio extensions for Syncfusion (optional)

### Knowledge Prerequisites

- Basic understanding of HTML, CSS, and JavaScript
- Familiarity with C# and ASP.NET concepts
- Understanding of data binding and MVC patterns
- Basic knowledge of tag helpers (for ASP.NET Core)

## Installation Steps

### Step 1: Create or Open Your ASP.NET Core/MVC Project

**For ASP.NET Core with Visual Studio:**

1. Open Visual Studio
2. Click "Create a new project"
3. Select "ASP.NET Core Web App (Model-View-Controller)" template
4. Click "Next"
5. Enter project name (e.g., "SyncfusionDropDownTreeApp")
6. Choose location for your project
7. Select target framework (.NET 7.0 or .NET 8.0 recommended)
8. Click "Create"

**For ASP.NET MVC:**

1. Open Visual Studio
2. Click "Create a new project"
3. Select "ASP.NET Web Application (.NET Framework)"
4. Click "Next"
5. Choose "MVC" template and click "Create"

### Step 2: Install Syncfusion NuGet Package

The Syncfusion DropDownTree component is available through the Syncfusion.EJ2.AspNet.Core NuGet package for both ASP.NET Core and ASP.NET MVC.

**Installation Method 1: Package Manager Console**

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 24.1.41
```

**Installation Method 2: Visual Studio NuGet Package Manager**

1. Right-click your project in Solution Explorer
2. Select "Manage NuGet Packages..."
3. Click the "Browse" tab
4. Search for "Syncfusion.EJ2.AspNet.Core"
5. Click "Syncfusion.EJ2.AspNet.Core" in the results
6. Click "Install" button
7. Accept license agreements if prompted
8. Wait for installation to complete

**Installation Method 3: .NET CLI**

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**Important Notes:**

- The NuGet package has dependencies: `Newtonsoft.Json` and `Syncfusion.Licensing`
- These will be automatically installed as required dependencies
- Administrative privileges may be required for package installation
- Ensure your internet connection is stable during installation

### Step 3: Configure Tag Helper (For ASP.NET Core)

Open the `~/Pages/_ViewImports.cshtml` file (for Razor Pages) or `~/Views/Web.config` file and add the Syncfusion tag helper directive:

**For Razor Pages (~/Pages/_ViewImports.cshtml):**

```csharp
@addTagHelper *, Syncfusion.EJ2
```

**For MVC Views:**

Add to your `~/Views/Web.config`:

```xml
<system.web.webServer>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <!-- Add here -->
    </assemblyBinding>
  </runtime>
</system.web.webServer>
```

For MVC, you can also add this to individual view files:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

## Platform Setup

### ASP.NET Core Setup

#### Add Stylesheet and Script References

Open your `~/Pages/Shared/_Layout.cshtml` file and add the required Syncfusion stylesheets and scripts:

**In the `<head>` section, add stylesheets:**

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syncfusion DropDownTree</title>
    
    <!-- Syncfusion EJ2 Fluent Theme Stylesheet -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.1.41/fluent.css" />
    
    <!-- Alternative themes: bootstrap5.css, tailwind.css, fabric.css, etc. -->
    <!-- <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.1.41/bootstrap5.css" /> -->
</head>
```

**Before the closing `</body>` tag, add scripts:**

```html
<body>
    @RenderBody()
    
    <!-- Syncfusion EJ2 Core Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2.min.js"></script>
    
    <!-- Script Manager (Required for ASP.NET Core) -->
    <ejs-scripts></ejs-scripts>
</body>
```

#### Script Manager Registration

The `<ejs-scripts>` tag is a script manager that should be placed at the end of your layout page. This register component declarations and ensures proper script initialization.

**In ~/.Pages/Shared/_Layout.cshtml (before closing body tag):**

```html
</div>
<!-- Syncfusion Script Manager (Required) -->
<ejs-scripts></ejs-scripts>
</body>
</html>
```

#### Available Themes

The Syncfusion library supports multiple themes. Choose one based on your application design:

- **fluent.css** - Microsoft Fluent Design theme
- **bootstrap5.css** - Bootstrap 5 compatible theme
- **tailwind.css** - Tailwind CSS compatible theme
- **fabric.css** - Microsoft Fabric Design theme
- **material.css** - Material Design theme
- **highcontrast.css** - High contrast accessible theme

Include only one theme stylesheet to avoid conflicts.

### ASP.NET MVC Setup

#### Add Stylesheet and Script References

Open your `~/Views/Shared/_Layout.cshtml` file and add the required Syncfusion stylesheets and scripts:

**In the `<head>` section:**

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syncfusion DropDownTree</title>
    
    <!-- Bootstrap CSS (optional, for basic styling) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.1.41/bootstrap5.css" />
</head>
```

**Before closing `</body>` tag:**

```html
<body>
    @RenderBody()
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2.min.js"></script>
    
    <!-- Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## Basic Implementation

### Minimal DropDownTree Example

Create a basic DropDownTree component with the simplest possible configuration:

**ASP.NET Core (Razor):**

```html
<!-- ~/Pages/Index.cshtml or any Razor view -->
@page
@model IndexModel

<h1>DropDownTree Example</h1>

@{
    var dropDownData = new List<TreeNode>
    {
        new TreeNode { Id = "1", Text = "Item 1" },
        new TreeNode { Id = "2", Text = "Item 2" },
        new TreeNode { Id = "3", Text = "Item 3" }
    };
}

<ejs-dropdowntree id="basicTree" placeholder="Select an item">
    <e-dropdowntree-fields dataSource="@dropDownData" text="Text" value="Id"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

**Model Definition:**

```csharp
// Models/TreeNode.cs
using System.Collections.Generic;

public class TreeNode
{
    public string Id { get; set; }
    public string Text { get; set; }
    public List<TreeNode> Children { get; set; }
}
```

### Component Parts Explanation

The minimal example shows the core components needed:

1. **`<ejs-dropdowntree>`** - Main component tag
2. **`id="basicTree"`** - Unique component identifier required for JavaScript access
3. **`placeholder`** - Watermark text displayed when no item selected
4. **`fields`** - Mapping configuration connecting data properties to component properties
5. **Data Source** - The hierarchical data array containing tree items

## Data Binding Methods

### Method 1: Local Array Binding

Bind a C# collection to the component:

```csharp
// Controller action
public IActionResult Index()
{
    var data = new List<TreeNode>
    {
        new TreeNode 
        { 
            Id = "1", 
            Text = "Folder", 
            Children = new List<TreeNode>
            {
                new TreeNode { Id = "2", Text = "File1.txt" },
                new TreeNode { Id = "3", Text = "File2.txt" }
            }
        }
    };
    
    return View(data);
}
```

**In View:**

```html
@model List<TreeNode>

<ejs-dropdowntree id="treeLocal">
    <e-dropdowntree-fields dataSource="@Model" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Method 2: Remote Service Binding

Bind data from a remote API endpoint:

```html
<ejs-dropdowntree id="treeRemote">
    <e-dropdowntree-fields child="ViewBag.child" query="new ej.data.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5)" value="EmployeeID" text="FirstName" hasChildren="EmployeeID">
        <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc" adaptor="ODataV4Adaptor" crossDomain="true"></e-data-manager>
    </e-dropdowntree-fields>
```

**API Controller Example:**

```csharp
public ActionResult RemoteData()
{
    DropDownTreeFields parentData = new DropDownTreeFields();
    DropDownTreeFields childData = new DropDownTreeFields();
    object data = new DataManager
    {
        Url = "https://services.odata.org/V4/Northwind/Northwind.svc",
        Adaptor = "ODataV4Adaptor",
        CrossDomain = true
    };
    // Parent data mapping
    parentData.Query = "new ej.data.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5)";
    parentData.Value = "EmployeeID";
    parentData.Text = "FirstName";
    parentData.HasChildren = "EmployeeID";
    parentData.Child = childData;
    parentData.DataSource = data;
    // Child data mapping  
    childData.Query = "new ej.data.Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5)";
    childData.Value = "OrderID";
    childData.Text = "ShipName";
    childData.ParentValue = "EmployeeID";
    childData.DataSource = data;
    ViewBag.remoteFields = parentData;
    return View();
}
```

## First Rendering Example

Here's a complete working example with data, styling, and event handling:

**HTML (Razor markup):**

```html
@page
@model DropDownTreeModel
@{
    ViewData["Title"] = "DropDownTree Demo";
}

<div class="container mt-5">
    <h2>Syncfusion DropDownTree Component</h2>
    
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Select a Department</h5>
                    
                    <ejs-dropdowntree id="departmentTree" placeholder="Choose Department" allowFiltering="true" change="change">
                        <e-dropdowntree-fields dataSource="@Model.Departments" text="DepartmentName" value="DepartmentId" child="Teams"></e-dropdowntree-fields>
                    </ejs-dropdowntree>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Display selected value -->
    <div class="row mt-3">
        <div class="col-md-6">
            <p>Selected Value: <strong id="selectedValue">None</strong></p>
        </div>
    </div>
</div>

<script>
    // Handle value change
    function change(e) {
        document.getElementById("selectedValue").textContent = e.value;
    }
</script>
```

**Model (C#):**

```csharp
public class DropDownTreeModel
{
    public List<Department> Departments { get; set; }
}

public class Department
{
    public string DepartmentId { get; set; }
    public string DepartmentName { get; set; }
    public List<Team> Teams { get; set; }
}

public class Team
{
    public string TeamId { get; set; }
    public string TeamName { get; set; }
}
```

**Page Load Data (in Controller or PageModel):**

```csharp
public void OnGet()
{
    Model.Departments = new List<Department>
    {
        new Department 
        { 
            DepartmentId = "dept1",
            DepartmentName = "Engineering",
            Teams = new List<Team>
            {
                new Team { TeamId = "t1", TeamName = "Frontend" },
                new Team { TeamId = "t2", TeamName = "Backend" },
                new Team { TeamId = "t3", TeamName = "DevOps" }
            }
        },
        new Department 
        { 
            DepartmentId = "dept2",
            DepartmentName = "Sales",
            Teams = new List<Team>
            {
                new Team { TeamId = "t4", TeamName = "Enterprise" },
                new Team { TeamId = "t5", TeamName = "SMB" }
            }
        },
        new Department 
        { 
            DepartmentId = "dept3",
            DepartmentName = "HR",
            Teams = new List<Team>
            {
                new Team { TeamId = "t6", TeamName = "Recruitment" }
            }
        }
    };
}
```

## Troubleshooting

### Problem: Component Not Rendering

**Symptom**: DropDownTree component tag appears as HTML instead of rendered component

**Solutions**:
1. Verify `@addTagHelper *, Syncfusion.EJ2` directive is in `_ViewImports.cshtml`
2. Confirm `Syncfusion.EJ2.AspNet.Core` NuGet package is installed
3. Check that `<ejs-scripts></ejs-scripts>` tag is present before closing `</body>`
4. Verify stylesheet and script CDN links are correct and accessible
5. Check browser console for JavaScript errors

### Problem: Data Not Displaying

**Symptom**: Component renders but no data appears in dropdown

**Solutions**:
1. Verify field mappings match your data structure properties
2. Check that `dataSource` is not null and contains valid data
3. Ensure `text` and `value` field names match data model properties
4. For nested data, verify `child` field name is correct
5. In browser console, check for binding errors

### Problem: Styles Not Loading

**Symptom**: Component appears unstyled or misaligned

**Solutions**:
1. Verify stylesheet CDN URL is correct and accessible
2. Check browser network tab for 404 errors on CSS file
3. Ensure only one theme CSS file is referenced
4. Clear browser cache (Ctrl+Shift+Delete) and refresh
5. Verify internet connection for CDN access

### Problem: JavaScript Errors

**Symptom**: Browser console shows "ej2 is not defined" or similar errors

**Solutions**:
1. Confirm script CDN link is placed before `<ejs-scripts>` tag
2. Verify script sources load successfully (check Network tab)
3. Ensure scripts are loaded in correct order (ej2.min.js before components)
4. Check that browser supports required JavaScript features
5. Check for conflicting libraries or duplicate script references

---

**Next Steps**: Now that your DropDownTree component is set up and rendering, proceed to explore data binding methods in `data-binding.md` or selection features in `checkbox-and-selection.md` based on your requirements.
