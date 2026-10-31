# Getting Started — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install NuGet Package](#install-nuget-package)
- [Register Tag Helper](#register-tag-helper)
- [Add Stylesheet and Script](#add-stylesheet-and-script)
- [Register Script Manager](#register-script-manager)
- [Add Grid Tag Helper](#add-grid-tag-helper)
- [Bind Row Data](#bind-row-data)
- [Define Columns](#define-columns)
- [Enable Paging](#enable-paging)
- [Enable Sorting](#enable-sorting)
- [Enable Filtering](#enable-filtering)
- [Enable Grouping](#enable-grouping)

## When to Use This

- Set up Syncfusion ASP.NET Core Grid in your project
- Learn basic grid configuration
- Install required NuGet packages
- Register tag helpers
- Create your first grid in minutes

## Prerequisites

- .NET 6.0 or later (supports up to .NET 10.0)
- Visual Studio 2022 or Visual Studio Code
- ASP.NET Core Web App (Razor Pages) or MVC project

## Install NuGet Package

Install `Syncfusion.EJ2.AspNet.Core` via NuGet Package Manager or CLI:

```bash
# .NET CLI
dotnet add package Syncfusion.EJ2.AspNet.Core

# Package Manager Console
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

## Register Tag Helper

Open `~/Pages/_ViewImports.cshtml` (Razor Pages) or `~/Views/_ViewImports.cshtml` (MVC) and add:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

## Add Stylesheet and Script

In `~/Pages/Shared/_Layout.cshtml`, add inside `<head>`:

```cshtml
<!-- Syncfusion ASP.NET Core controls styles -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent2.css" />
<!-- Syncfusion ASP.NET Core controls scripts -->
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```

## Register Script Manager

At the bottom of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    <ejs-scripts></ejs-scripts>
</body>
```

## Add Grid Tag Helper

In `~/Pages/Index.cshtml`:

```cshtml
<ejs-grid id="Grid">

</ejs-grid>
```

## Bind Row Data

Pass data from the controller/page model via `ViewBag` or `Model`:

```csharp
// CSHTML.cs (PageModel) or Controller
public class OrdersDetails
{
    public int? OrderID { get; set; }
    public string CustomerID { get; set; }
    public int? EmployeeID { get; set; }
    public double? Freight { get; set; }
    public string ShipCity { get; set; }
    public bool Verified { get; set; }
    public DateTime OrderDate { get; set; }
    public string ShipName { get; set; }
    public string ShipCountry { get; set; }
    public DateTime ShippedDate { get; set; }
    public string ShipAddress { get; set; }
}
```

Assign in controller/page model:
```csharp
ViewBag.DataSource = OrdersDetails.GetAllRecords();
```

## Define Columns

Use `<e-grid-columns>` and `<e-grid-column>` tag helpers. Key properties:
- `field` — maps to model property name
- `headerText` — column header label
- `textAlign` — alignment (`Left`, `Right`, `Center`)
- `format` — number/date format (e.g., `C2`, `yMd`)
- `width` — column width in pixels

```cshtml
<ejs-grid id="Grid" dataSource="@order">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID"  width="150"></e-grid-column> 
    </e-grid-columns>
</ejs-grid>
```

## Enable Paging

Set `allowPaging="true"` and configure `<e-grid-pagesettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@order" allwPaging="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID"  width="150"></e-grid-column> 
    </e-grid-columns>
</ejs-grid>
```

## Enable Sorting

Set `allowSorting="true"` and optionally configure `<e-grid-sortsettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@order" allwPaging="true" allowSorting="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID"  width="150"></e-grid-column> 
    </e-grid-columns>
</ejs-grid>
```

## Enable Filtering

Set `allowFiltering="true"` and optionally configure `<e-grid-filtersettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@order" allwPaging="true" allowFiltering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID"  width="150"></e-grid-column> 
    </e-grid-columns>
</ejs-grid>
```

## Enable Grouping

Set `allowGrouping="true"` and optionally configure `<e-grid-groupsettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@order" allwPaging="true" allowGrouping="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID"  width="150"></e-grid-column> 
    </e-grid-columns>
</ejs-grid>
```

> **Tip:** Combine all features in one grid declaration. The order of tag helpers inside `<ejs-grid>` does not matter — each settings tag is independent.
