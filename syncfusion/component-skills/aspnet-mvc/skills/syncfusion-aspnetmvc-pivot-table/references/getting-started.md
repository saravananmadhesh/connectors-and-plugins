# Getting Started with ASP.NET MVC Pivot Table

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Basic Initialization](#basic-initialization)
- [Configure Axes](#configure-axes)
- [Enable UI Features](#enable-ui-features)
- [Key Properties](#key-properties)

## Prerequisites

Before starting with Syncfusion ASP.NET MVC Pivot Table:

- **Visual Studio** 2015 or newer
- **ASP.NET MVC** version 5 or higher
- **.NET Framework** 4.5+
- Supported browser: Chrome, Firefox, Edge, Safari (latest versions)

## Installation

### NuGet Package Installation

Install via NuGet Package Manager:

**Package Manager Console:**

```
Install-Package Syncfusion.EJ2.MVC5 -Version 33.1.44
```

**NuGet Package Manager UI:**

1. Right-click project → Manage NuGet Packages
2. Search: `Syncfusion.EJ2.MVC5`
3. Click Install

**Auto-dependencies installed:**
- Syncfusion.Licensing
- Newtonsoft.Json (for serialization)

## Setup

### 1. Add Namespace to Web.config

File: `~/Views/Web.config`

```xml
<configuration>
  <appSettings>
    <add key="webpages:Version" value="3.0.0.0" />
  </appSettings>
  
  <system.web.webPages.razor>
    <host factoryType="System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, ..." />
    <pages
      pageBaseType="System.Web.Mvc.WebViewPage">
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="Syncfusion.EJ2" />
      </namespaces>
    </pages>
  </system.web.webPages.razor>
</configuration>
```

### 2. Add Stylesheets and Scripts

File: `~/Views/Shared/_Layout.cshtml`

Add in `<head>` section:

```html
<head>
    <!-- Syncfusion Essential JS 2 CSS (choose one theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    
    <!-- Syncfusion Essential JS 2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**Theme Options:**
- `material.css` - Material Design (recommended)
- `bootstrap5.css` - Bootstrap 5
- `fluent.css` - Microsoft Fluent
- `tailwind3.css` - Tailwind CSS
- `bootstrap.css` - Bootstrap 4
- `high-contrast.css` - Accessibility

### 3. Register Script Manager

File: `~/Views/Shared/_Layout.cshtml`

Add at end of `<body>` section:

```html
<body>
    <!-- Your content here -->
    
    @Html.EJS().ScriptManager()  <!-- REQUIRED for all Syncfusion controls -->
</body>
```

## Basic Initialization

### Minimal Example

View: `~/Views/Home/Index.cshtml`

```html
@using Syncfusion.EJ2.PivotView
@model IEnumerable<dynamic>

@Html.EJS().PivotView("pivotview").DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).Height("450").Width("100%").Render()
```

Controller: `~/Controllers/HomeController.cs`

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View(GetSalesData());
    }

    private List<dynamic> GetSalesData()
    {
        return new List<dynamic>
        {
            new { Country = "USA", Year = "2023", Sales = 45000 },
            new { Country = "USA", Year = "2024", Sales = 52000 },
            new { Country = "UK", Year = "2023", Sales = 38000 },
            new { Country = "UK", Year = "2024", Sales = 41000 },
            new { Country = "Canada", Year = "2023", Sales = 22000 },
            new { Country = "Canada", Year = "2024", Sales = 25000 }
        };
    }
}
```

## Configure Axes

Use fluent API pattern: `.Name().Add()` for all field configurations.

**Multiple Fields in Each Axis:**

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => {
            rows.Name("Country").Add();
            rows.Name("Region").Add();
        })
        .Columns(columns => {
            columns.Name("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values => {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Caption("Total Sales").Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Caption("Units Sold").Add();
        })
        .Filters(filters => {
            filters.Name("Status").Add();
        })).Height("450").Width("100%").Render()
```

**IMPORTANT API Pattern:**
- Use `.Name("FieldName")` to identify the field
- Use `.Type(Syncfusion.EJ2.PivotView.SummaryTypes.XXX)` for value aggregation
- Use `.Caption()` for display name
- Always chain with `.Add()` to complete definition
- Field names are **case-sensitive** and must match data exactly

## Enable UI Features

### Field List Panel

Users can drag/drop fields to reshape pivot table:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowFieldList(true).Height("450").Width("100%").Render()
```

### Grouping Bar

Users can reorder fields and control sorting/filtering:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

### Both Field List and Grouping Bar

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowFieldList(true).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| **DataSource** | IEnumerable | Data collection to display |
| **Rows** | IEnumerable | Row label fields |
| **Columns** | IEnumerable | Column label fields |
| **Values** | IEnumerable | Fields to aggregate (Sum, Avg, Count, etc.) |
| **Filters** | IEnumerable | Filter dimensions (not displayed as axes) |
| **ShowFieldList** | Boolean | Display field list panel |
| **ShowGroupingBar** | Boolean | Display grouping bar |
| **Height** | String | Table height (e.g., "450", "100%") |
| **Width** | String | Table width (e.g., "100%") |
| **AllowCalculatedField** | Boolean | Enable custom calculated fields |
| **AllowDeferLayoutUpdate** | Boolean | Defer rendering until ready |

## Common Configuration Patterns

**Basic Sales Summary:**

```html
.Rows(rows => { rows.Name("Country").Add(); })
.Columns(columns => { columns.Name("Product").Add(); })
.Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
```

**Multi-level Row Hierarchy:**

```html
.Rows(rows => {
    rows.Name("Year").Add();
    rows.Name("Country").Add();
    rows.Name("Product").Add();
})
```

**Multiple Aggregations:**

```html
.Values(values => {
    values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Caption("Total").Add();
    values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Avg).Caption("Average").Add();
    values.Name("Count").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Count).Caption("Transactions").Add();
})
```