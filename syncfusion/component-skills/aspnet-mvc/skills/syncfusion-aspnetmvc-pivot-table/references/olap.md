# OLAP in ASP.NET MVC Pivot Table

## ⚠️ SECURITY NOTICE

**All OLAP connections MUST use authenticated, configuration-based endpoints.** Never hardcode OLAP server URLs or use untrusted data sources.

✅ **Required Security Controls:**
- Configuration-based URLs (Web.config, ConfigurationManager)
- Windows Authentication or OAuth for OLAP connections
- HTTPS/SSL for all OLAP server connections
- Network-level access control (VPN, firewall rules)
- Role-based access control on OLAP server

## Table of Contents
- [Overview](#overview)
- [OLAP Conceptual Model](#olap-conceptual-model)
- [Prerequisites & Setup](#prerequisites--setup)
- [Connecting to OLAP Cube](#connecting-to-olap-cube)
- [OLAP Cube Elements](#olap-cube-elements)
- [Configuring OLAP Fields](#configuring-olap-fields)
- [Formatting OLAP Measures](#formatting-olap-measures)
- [Hierarchical Drilling & Navigation](#hierarchical-drilling--navigation)
- [Grouping Bar with OLAP](#grouping-bar-with-olap)
- [Field List with OLAP](#field-list-with-olap)
- [Filter Axis Usage](#filter-axis-usage)
- [Calculated Fields](#calculated-fields)
- [Common Use Cases](#common-use-cases)

## Overview

OLAP (Online Analytical Processing) enables multi-dimensional analysis of large datasets through hierarchical dimensions, pre-aggregated measures, and fast query performance. The Syncfusion Pivot Table supports connections to OLAP data sources (Microsoft Analysis Services, Mondrian) for enterprise data warehouse analysis.

**Why OLAP:** OLAP cubes provide pre-aggregated data, supporting rapid analysis across multiple dimensions. Ideal for financial reporting, sales analysis, and complex business intelligence scenarios.

## OLAP Conceptual Model

OLAP data is organized into multi-dimensional cubes with the following hierarchy:

```
Cube
  ├── Dimensions
  │   ├── Geography
  │   │   ├── Country
  │   │   │   ├── Region
  │   │   │   └── City
  │   │   └── Customer
  │   ├── Time
  │   │   ├── Year
  │   │   ├── Quarter
  │   │   └── Month
  │   └── Product
  │       ├── Category
  │       ├── Subcategory
  │       └── Product
  └── Measures
      ├── Sales Amount
      ├── Quantity Sold
      └── Profit
```

### Key Components

- **Dimensions**: Categorical attributes organizing data hierarchically
- **Hierarchies**: Organized levels within dimensions
- **Levels**: Individual steps in a hierarchy
- **Members**: Individual values at each level
- **Measures**: Numerical values to aggregate
- **Named Sets**: Pre-defined collections of members
- **Calculated Members**: Custom dimension members based on expressions
- **Calculated Measures**: Custom measures based on existing measures

## Prerequisites & Setup

### Required NuGet Packages

```bash
Install-Package Syncfusion.EJ2.MVC5 -Version 24.1.41
Install-Package Syncfusion.EJ2.MVC5.PivotView -Version 24.1.41
```

### Web.config Configuration

Add Syncfusion namespace and assembly binding:

```xml
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <dependentAssembly>
        <assemblyIdentity name="Syncfusion.EJ2" publicKeyToken="36ee7e232fa18e0f" />
        <bindingRedirect oldVersion="0.0.0.0-24.1.41.0" newVersion="24.1.41.0" />
      </dependentAssembly>
    </assemblyBinding>
  </runtime>
</configuration>
```

### Supported OLAP Providers

- **Microsoft Analysis Services**: SQL Server OLAP engine
- **Mondrian**: Open-source OLAP server
- **Other compatible OLAP providers** with compatible XMLA protocol

## Connecting to OLAP Cube

> **⚠️ SECURITY:** Use configuration-based OLAP URLs with authentication. See security notice at top of document.

### Basic OLAP Connection Pattern

Use the fluent API to specify OLAP connection details with the required `ProviderType` property:

**Web.config:**
```xml
<appSettings>
  <add key="OLAP:ServerUrl" value="https://your-olap-server.company.com/olap/msmdpump.dll" />
  <add key="OLAP:Catalog" value="Adventure Works DW 2008 SE" />
  <add key="OLAP:Cube" value="Adventure Works" />
</appSettings>
```

**Controller:**
```csharp
public ActionResult Index()
{
    ViewBag.OlapUrl = ConfigurationManager.AppSettings["OLAP:ServerUrl"];
    ViewBag.OlapCatalog = ConfigurationManager.AppSettings["OLAP:Catalog"];
    ViewBag.OlapCube = ConfigurationManager.AppSettings["OLAP:Cube"];
    return View();
}
```

**View:**
```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url((string)ViewBag.OlapUrl)                                   // OLAP server endpoint from config
        .Catalog((string)ViewBag.OlapCatalog)                          // Database/catalog name from config
        .Cube((string)ViewBag.OlapCube)                                // Cube name from config
        .ProviderType(ProviderType.SSAS)                               // ⭐ REQUIRED: Specify provider type
        .Rows(rows =>
        {
            rows.Name("[Customer].[Customer Geography]")
                .Caption("Customer Geography").Add();
        })
        .Columns(columns =>
        {
            columns.Name("[Product].[Product Categories]")
                   .Caption("Product Categories").Add();
            columns.Name("[Measures]").Caption("Measures").Add();
        })
        .Values(values =>
        {
            values.Name("[Measures].[Customer Count]")
                  .Caption("Customer Count").Add();
            values.Name("[Measures].[Internet Sales Amount]")
                  .Caption("Internet Sales Amount").Add();
        })
        .Filters(filters =>
        {
            filters.Name("[Date].[Fiscal]").Caption("Date Fiscal").Add();
        })).ShowFieldList(true).ShowGroupingBar(true).Height("600").Width("100%").Render()
```

### Connection Parameters & Requirements

| Parameter | Description | Example | Required |
|-----------|-------------|---------|----------|
| **Url** | OLAP server endpoint (XMLA protocol) | `https://your-olap-server.company.com/olap/msmdpump.dll` | Yes |
| **Catalog** | Database/catalog name on the server | `Adventure Works DW 2008 SE` | Yes |
| **Cube** | Cube name within the catalog | `Adventure Works` | Yes |
| **ProviderType** | OLAP provider (SSAS/Mondrian) | `ProviderType.SSAS` | ✅ CRITICAL |
| **EnableSorting** | Enable sorting operations | `true` | No |

### Supported OLAP Providers

- **SSAS (SQL Server Analysis Services)**: `ProviderType.SSAS`
- **Mondrian**: Compatible with XMLA protocol

### Specifying OLAP Cube Elements with Name Property

When adding OLAP cube elements to axes, use the `.Name()` property with the **exact unique name** from the cube (bracket notation with dimension/hierarchy names):

```csharp
// CORRECT: Using bracket notation with unique names
.Rows(rows => { 
    rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add(); 
})

// INCORRECT: Don't use literal values
// rows.Name("Customer Geography").Add();   ❌
```

### Field Binding Best Practices

- **Use bracket notation**: `[Dimension].[Hierarchy]`
- **For measures**: `[Measures].[MeasureName]`
- **Caption is optional**: Display name for UI (if omitted, Name is displayed)
- **Always call .Add()**: Completes field configuration

## OLAP Cube Elements

### Hierarchies

Hierarchies organize dimension members in levels:

```csharp
// Geography dimension hierarchy: Country → State → City
.Rows(r => r
    .Add("[Geography].[Geography].Children"))
```

### Named Sets

Pre-defined collections of members:

```csharp
// Pre-defined set of top 10 products
.Rows(r => r
    .Add("[Product].[Top 10 Products]"))
```

### Calculated Members & Measures

Custom members and measures based on expressions:

```csharp
.Values(v => {
    v.Name("[Measures].[Profit Margin]").Add();  // Calculated measure
    v.Name("[Measures].[Sales Amount]").Add();
})
```

### Measures

Numerical values in the cube:

```csharp
.Values(v => {
    v.Name("[Measures].[Sales Amount]").Type(SummaryTypes.Sum).Add();
    v.Name("[Measures].[Quantity]").Type(SummaryTypes.Sum).Add();
    v.Name("[Measures].[Profit]").Type(SummaryTypes.Sum).Add();
})
```

## Configuring OLAP Fields

### Name Property - Critical for OLAP Fields

The `.Name()` property MUST contain the unique name from the OLAP cube using bracket notation:

```csharp
// ✅ CORRECT: Bracket notation with dimension/hierarchy names
.Rows(rows => { 
    rows.Name("[Customer].[Customer Geography]")
        .Caption("Customer Geography")
        .Add(); 
})

// ❌ INCORRECT: Literal values without bracket notation
rows.Name("Customer Geography").Add();

// ❌ INCORRECT: Using .Add(string) overload for OLAP
rows.Add("[Geography].[Geography]");  // Don't use this pattern for OLAP
```

### Complete Field Configuration Pattern

All OLAP fields require three methods:

```csharp
rows.Name("[Customer].[Customer Geography]")     // Unique name (required)
    .Caption("Customer Geography")                // Display label (optional)
    .Add();
```

### Placing Fields on All Axes

**Rows Axis** - Row dimensions:
```csharp
.Rows(rows => { 
    rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add(); 
    rows.Name("[Product].[Product]").Caption("Product").Add();
})
```

**Columns Axis** - Column dimensions and measures container:
```csharp
.Columns(columns => { 
    columns.Name("[Product].[Product Categories]").Caption("Product Categories").Add(); 
    columns.Name("[Measures]").Caption("Measures").Add();
})
```

**Values Axis** - Measures to aggregate:
```csharp
.Values(values => { 
    values.Name("[Measures].[Customer Count]").Caption("Customer Count").Add(); 
    values.Name("[Measures].[Internet Sales Amount]").Caption("Internet Sales Amount").Add(); 
})
```

**Filters Axis** - Master filter dimensions:
```csharp
.Filters(filters => { 
    filters.Name("[Date].[Fiscal]").Caption("Date Fiscal").Add(); 
    filters.Name("[Organization].[Department]").Caption("Department").Add();
})
```

### Unique Name Format Rules

| Element Type | Format | Example |
|-------------|--------|---------|
| Dimension | `[Dimension]` | `[Customer]` |
| Hierarchy | `[Dimension].[Hierarchy]` | `[Customer].[Customer Geography]` |
| Measure | `[Measures].[MeasureName]` | `[Measures].[Internet Sales Amount]` |
| Measures Container | `[Measures]` | `[Measures]` |
| Named Set | `[Dimension].[NamedSetName]` | `[Product].[Top 10 Products]` |
| Level | `[Dimension].[Hierarchy].&[Member]` | `[Geography].[Country].&[United States]` |

## Formatting OLAP Measures

### FormatSettings for OLAP Measures

Apply display formatting to OLAP measure values using `FormatSettings`:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows =>
        {
            rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add();
        })
        .Columns(columns =>
        {
            columns.Name("[Product].[Product Categories]").Caption("Product Categories").Add();
            columns.Name("[Measures]").Caption("Measures").Add();
        })
        .Values(values =>
        {
            values.Name("[Measures].[Customer Count]").Caption("Customer Count").Add();
            values.Name("[Measures].[Internet Sales Amount]").Caption("Internet Sales Amount").Add();
        })
        .FormatSettings(formatSettings =>
        {
            formatSettings.Name("[Measures].[Internet Sales Amount]")
                         .Format("C0")        // Currency with no decimals
                         .Add();
            formatSettings.Name("[Measures].[Customer Count]")
                         .Format("0,0")       // Number with thousand separator
                         .Add();
        })).Height("600").Width("100%").Render()
```

### Common Format Strings for OLAP Measures

| Format | Output | Use Case |
|--------|--------|----------|
| `C` or `C0` | $1,234 | Currency (whole numbers) |
| `C2` | $1,234.56 | Currency (2 decimal places) |
| `N` or `N0` | 1,234 | Number (whole) |
| `N2` | 1,234.57 | Number (2 decimals) |
| `0,0` | 1,234 | Number with thousand separator |
| `P` or `P0` | 50% | Percentage |
| `P2` | 50.12% | Percentage (2 decimals) |
| `E` | 1.23E+03 | Scientific notation |
| `0.00` | 1234.56 | Fixed decimal places |

### Important Notes

- Only fields from the **Values** axis with numeric data can be formatted
- OLAP measures are identified by `[Measures].[MeasureName]` in FormatSettings
- Format property uses .NET format strings
- Multiple format settings can be applied in one configuration

## Hierarchical Drilling & Navigation

OLAP hierarchies support drill-down and drill-up:

```csharp
.Rows(r => r
    .Add("[Geography].[Geography].Children"))
```

**Drill Operations:**
- **Expand (+)**: Drill down one level
- **Collapse (−)**: Roll up to parent level
- **Hierarchical Analysis**: Navigate from year → quarter → month

## Grouping Bar with OLAP

Enable field rearrangement:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows =>
        {
            rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add();
        })
        .Columns(columns =>
        {
            columns.Name("[Product].[Product Categories]").Caption("Product Categories").Add();
            columns.Name("[Measures]").Caption("Measures").Add();
        })
        .Values(values =>
        {
            values.Name("[Measures].[Customer Count]").Caption("Customer Count").Add();
            values.Name("[Measures].[Internet Sales Amount]").Caption("Internet Sales Amount").Add();
        })).ShowGroupingBar(true).Height("600").Width("100%").Render()
```

## Field List with OLAP

Enable runtime configuration with field list for drag-and-drop rearrangement:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows =>
        {
            rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add();
        })
        .Columns(columns =>
        {
            columns.Name("[Product].[Product Categories]").Caption("Product Categories").Add();
            columns.Name("[Measures]").Caption("Measures").Add();
        })
        .Values(values =>
        {
            values.Name("[Measures].[Customer Count]").Caption("Customer Count").Add();
            values.Name("[Measures].[Internet Sales Amount]").Caption("Internet Sales Amount").Add();
        })).ShowFieldList(true).Height("600").Width("100%").Render()
```

## Filter Axis Usage

Master filters to refine displayed data by placing dimensions in the Filters axis:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows => { 
            rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add(); 
        })
        .Columns(columns => { 
            columns.Name("[Product].[Product Categories]").Caption("Product Categories").Add(); 
            columns.Name("[Measures]").Caption("Measures").Add(); 
        })
        .Values(values => { 
            values.Name("[Measures].[Customer Count]").Caption("Customer Count").Add(); 
            values.Name("[Measures].[Internet Sales Amount]").Caption("Internet Sales Amount").Add(); 
        })
        .Filters(filters => { 
            filters.Name("[Date].[Fiscal]").Caption("Date Fiscal").Add(); 
        })).Height("600").Width("100%").Render()
```

## Calculated Fields

Create custom calculated fields for analysis based on existing measures:

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows => { 
            rows.Name("[Customer].[Customer Geography]").Caption("Customer Geography").Add(); 
        })
        .Columns(columns => { 
            columns.Name("[Product].[Product Categories]").Caption("Product Categories").Add(); 
            columns.Name("[Measures]").Caption("Measures").Add(); 
        })
        .Values(values => { 
            values.Name("[Measures].[Customer Count]").Caption("Customer Count").Add(); 
            values.Name("[Measures].[Internet Sales Amount]").Caption("Internet Sales Amount").Add(); 
        })).AllowCalculatedField(true).Height("600").Width("100%").Render()
```

### Important Notes for Calculated Fields

- **Calculation on Server**: OLAP calculated fields use MDX expressions on the analysis server
- **Real-time Updates**: Changes to source measures automatically update calculated fields
- **Performance**: Server-side calculation is efficient even with large datasets
- **Formula Syntax**: Supported MDX operators and functions (reference Microsoft SSAS documentation)

## Common Use Cases

### 1. Executive Sales Dashboard

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows => { 
            rows.Name("[Customer].[Customer Geography]").Caption("Geography").Add(); 
        })
        .Columns(columns => { 
            columns.Name("[Date].[Fiscal Quarter]").Caption("Quarter").Add(); 
            columns.Name("[Measures]").Caption("Measures").Add(); 
        })
        .Values(values => { 
            values.Name("[Measures].[Internet Sales Amount]").Caption("Sales").Add(); 
            values.Name("[Measures].[Internet Order Quantity]").Caption("Quantity").Add(); 
        })
        .Filters(filters => { 
            filters.Name("[Product].[Product Categories]").Caption("Product Category").Add(); 
        })).ShowGroupingBar(true).Height("600").Width("100%").Render()
```

### 2. Financial Analysis with Multiple Hierarchies

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows =>
        {
            rows.Name("[Reseller].[Reseller Geography]").Caption("Reseller Region").Add();
        })
        .Columns(columns =>
        {
            columns.Name("[Date].[Fiscal Year]").Caption("Year").Add();
            columns.Name("[Measures]").Caption("Measures").Add();
        })
        .Values(values =>
        {
            values.Name("[Measures].[Reseller Sales Amount]").Caption("Sales").Add();
            values.Name("[Measures].[Reseller Order Quantity]").Caption("Orders").Add();
        })).Height("600").Width("100%").Render()
```

### 3. Dimensional Drill Analysis

Users can drill down through hierarchies to analyze data at multiple detail levels:

```csharp
@using Syncfusion.EJ2.PivotView

// Start with high-level view
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .EnableSorting(true)
        .Url("https://bi.syncfusion.com/olap/msmdpump.dll")
        .Catalog("Adventure Works DW 2008 SE")
        .Cube("Adventure Works")
        .ProviderType(ProviderType.SSAS)
        .Rows(rows => { 
            rows.Name("[Date].[Fiscal Year]").Caption("Year").Add();
        })
        .Columns(columns => { 
            columns.Name("[Measures]").Caption("Measures").Add(); 
        })
        .Values(values => { 
            values.Name("[Measures].[Internet Sales Amount]").Caption("Sales").Add(); 
        })).ShowGroupingBar(true).Height("600").Width("100%").Render()

// Users can then drag [Date].[Month] to Rows axis to drill down
```

