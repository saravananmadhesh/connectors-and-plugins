# Getting Started with Tree Grid

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [First Application](#first-application)
- [Troubleshooting](#troubleshooting)

## Overview

The Syncfusion EJ2 ASP.NET Core MVC Tree Grid is a powerful data visualization component designed to display self-referential hierarchical data in a tabular format. It supports interactive features like editing, filtering, sorting, paging, and exporting while maintaining performance with large datasets.

**Use Tree Grid when you need:**
- Display parent-child data relationships (organizational hierarchies, file systems, categories)
- Interactive table with expandable/collapsible rows
- Data operations (search, sort, filter, paginate) on hierarchical data
- Edit, add, delete records in tree structure
- Export hierarchical data to Excel/PDF

## Prerequisites

Before implementing Tree Grid, ensure you have:
- **Visual Studio 2019** or later
- **ASP.NET Core 3.1** or later runtime
- **NuGet Package Manager** for package installation
- Basic knowledge of **C#, HTML, Razor syntax**
- Syncfusion EJ2 ASP.NET Core MVC license

## Installation

### Step 1: Create ASP.NET Core MVC Project

```bash
# Using .NET CLI
dotnet new mvc -n TreeGridSample

# Navigate to project
cd TreeGridSample
```

### Step 2: Install Syncfusion NuGet Packages

```bash
# Install via Package Manager Console
Install-Package Syncfusion.EJ2.AspNet.Core

# OR using dotnet CLI
dotnet add package Syncfusion.EJ2.AspNet.Core
```

### Step 3: Configure Syncfusion in Startup

**Program.cs (ASP.NET Core 6+):**
```csharp
using Syncfusion.Licensing;

// Add license
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();

var app = builder.Build();
app.UseRouting();
app.UseEndpoints(endpoints => {
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.Run();
```

### Step 4: Add Client Resources

**_Layout.cshtml:**
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/ej2.min.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/material.css">
</head>
<body>
    @RenderBody()
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/latest/ej2.min.js"></script>
</body>
</html>
```

## Basic Setup

### Minimal Tree Grid Configuration

**View (CSHTML):**
```html
@using Syncfusion.EJ2;
@using Syncfusion.EJ2.TreeGrid;

<div id="TreeGrid">
    @Html.EJS().TreeGrid("TreeGrid")
        .DataSource(ViewBag.DataSource)
        .ChildMapping("Children")
        .Columns(col =>
        {
            col.Field("TaskID").HeaderText("Task ID").Width("80").Add();
            col.Field("TaskName").HeaderText("Task Name").Width("200").Add();
            col.Field("Duration").HeaderText("Duration").Width("100").Add();
        })
        .Render()
</div>
```

**Controller (C#):**
```csharp
using Syncfusion.EJ2.TreeGrid;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        List<TreeData> data = new List<TreeData>();
        
        // Root level
        data.Add(new TreeData { TaskID = 1, TaskName = "Parent Task", Duration = 30 });
        
        // Child level
        List<TreeData> children = new List<TreeData>();
        children.Add(new TreeData { TaskID = 2, TaskName = "Child Task 1", Duration = 10 });
        children.Add(new TreeData { TaskID = 3, TaskName = "Child Task 2", Duration = 20 });
        
        data[0].Children = children;
        
        ViewBag.DataSource = data;
        return View();
    }
}
```

**Data Model:**
```csharp
public class TreeData
{
    public int TaskID { get; set; }
    public string TaskName { get; set; }
    public int Duration { get; set; }
    public List<TreeData> Children { get; set; }
}
```

## First Application

### Complete Example: Employee Hierarchy

**1. Create Data Model (Models/Employee.cs):**
```csharp
public class Employee
{
    public int EmployeeID { get; set; }
    public string EmployeeName { get; set; }
    public string Designation { get; set; }
    public int? ReportingTo { get; set; }
    public string Department { get; set; }
    public List<Employee> ReportingEmployees { get; set; }
}
```

**2. Create Controller (Controllers/TreeGridController.cs):**
```csharp
using Syncfusion.EJ2.TreeGrid;

public class TreeGridController : Controller
{
    public IActionResult EmployeeHierarchy()
    {
        var employees = GetEmployeeData();
        return View(employees);
    }

    private List<Employee> GetEmployeeData()
    {
        var employees = new List<Employee>();

        var manager = new Employee
        {
            EmployeeID = 1,
            EmployeeName = "John Smith",
            Designation = "Manager",
            Department = "Engineering",
            ReportingEmployees = new List<Employee>()
        };

        manager.ReportingEmployees.Add(new Employee
        {
            EmployeeID = 2,
            EmployeeName = "Mike Johnson",
            Designation = "Developer",
            Department = "Engineering",
            ReportingTo = 1
        });

        employees.Add(manager);
        return employees;
    }
}
```

**3. Create View (Views/TreeGrid/EmployeeHierarchy.cshtml):**
```html
@model List<Employee>
@using Syncfusion.EJ2;
@using Syncfusion.EJ2.TreeGrid;

<h2>Employee Hierarchy</h2>

@Html.EJS().TreeGrid("EmployeeGrid")
    .DataSource(Model)
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(10))
    .ChildMapping("ReportingEmployees")
    .Columns(col =>
    {
        col.Field("EmployeeID").HeaderText("ID").Width("80").Add();
        col.Field("EmployeeName").HeaderText("Name").Width("150").Add();
        col.Field("Designation").HeaderText("Designation").Width("150").Add();
        col.Field("Department").HeaderText("Department").Width("150").Add();
    })
    .Render()
```

## Troubleshooting

**Issue: License key error**
- Solution: Ensure license key is set before using any Syncfusion components
- Add at program startup: `SyncfusionLicenseProvider.RegisterLicense("KEY");`

**Issue: Columns not displaying**
- Solution: Verify `ChildMapping` property matches your data structure property name
- Check data model has public properties matching column `Field` names

**Issue: Data not loading**
- Solution: Verify data source binding in controller and view
- Check browser console for JavaScript errors using DevTools

**Issue: Styles not applied**
- Solution: Ensure Syncfusion CSS files are loaded before content
- Verify theme CSS (material, bootstrap, fabric) is loaded
