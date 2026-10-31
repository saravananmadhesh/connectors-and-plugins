# Getting Started with ASP.NET Core Pivot Table

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Basic Initialization](#basic-initialization)
- [Configure Axes](#configure-axes)
- [Enable UI Features](#enable-ui-features)
- [Key Properties](#key-properties)
- [Common Configuration Patterns](#common-configuration-patterns)

## Prerequisites

Before starting with Syncfusion ASP.NET Core Pivot Table:

- **Visual Studio** 2022 or newer
- **ASP.NET Core** version 6.0 or higher
- **.NET SDK** 6.0+
- Supported browsers: Chrome, Firefox, Edge, Safari (latest versions)

## Installation

### NuGet Package Installation

Install via NuGet Package Manager:

**Package Manager Console:**

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.1.44
```

**NuGet Package Manager UI:**

1. Right-click project → Manage NuGet Packages
2. Search: `Syncfusion.EJ2.AspNet.Core`
3. Click Install

**Auto-dependencies installed:**
- Syncfusion.Licensing
- Newtonsoft.Json (for serialization)

## Setup

### 1. Register Syncfusion Services (For ASP.NET Core 6.0+)

File: `~/Program.cs`

```csharp
using Syncfusion.Licensing;

// IMPORTANT: Set your Syncfusion license key
// Get your license key from: https://help.syncfusion.com/common/essential-studio/licensing/overview
// For trial users: You can leave this commented out but will see a watermark
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY_HERE");

var builder = WebApplication.CreateBuilder(args);

// Add Syncfusion services
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapRazorPages();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.Run();
```

> **License Key Setup**: 
> - **Community License Users**: Get your free license key from the [Syncfusion Community License](https://www.syncfusion.com/products/communitylicense) page
> - **Trial Users**: Download trial license from the [Syncfusion Trial](https://www.syncfusion.com/downloads/aspnetcore) page
> - **Commercial License Users**: Retrieve your license key from the [Syncfusion License Keys](https://help.syncfusion.com/common/essential-studio/licensing/license-key) page
> - Without a valid license key, a watermark will appear on the pivot table

### 2. Add TagHelper Namespace

File: `~/Pages/_ViewImports.cshtml`

```html
@using YourProjectName
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

### 3. Add Stylesheets and Scripts

File: `~/Pages/Shared/_Layout.cshtml`

Add in `<head>` section:

```html
<head>
    <!-- Syncfusion Essential JS 2 CSS (choose one theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind3.css" />
    
    <!-- Your other stylesheets -->
    <title>Pivot Table Application</title>
</head>
```

**Theme Options:**
- `fluent2.css` - Modern Fluent 2 design (recommended)
- `bootstrap5.css` - Bootstrap 5
- `material3.css` - Material Design 3
- `tailwind3.css` - Tailwind CSS

Add in `<body>` section (at the end):

```html
<body>
    <!-- Your content here -->
    
    <!-- Syncfusion Essential JS 2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
    
    <!-- Script Manager - REQUIRED for all Syncfusion controls -->
    <ejs-scripts></ejs-scripts>
</body>
```
## Basic Initialization

### Step 1: Create Data Model

File: `~/Models/PivotData.cs`

```csharp
public class PivotData
{
    public int Sold { get; set; }
    public double Amount { get; set; }
    public string Country { get; set; }
    public string Products { get; set; }
    public string Year { get; set; }
    public string Quarter { get; set; }
}
```

### Step 2: Prepare Sample Data

File: `~/Pages/Index.cshtml.cs`

```csharp
using YourProjectName.Models;

public class IndexModel : PageModel
{
    public List<PivotData> DataSource { get; set; }
    
    public void OnGet()
    {
        DataSource = GetPivotData();
        ViewBag.DataSource = DataSource;
    }
    
    private List<PivotData> GetPivotData()
    {
        List<PivotData> pivotData = new List<PivotData>();
        pivotData.Add(new PivotData { Sold = 31, Amount = 52824, Country = "France", Products = "Mountain Bikes", Year = "FY 2015", Quarter = "Q1" });
        pivotData.Add(new PivotData { Sold = 51, Amount = 86904, Country = "France", Products = "Mountain Bikes", Year = "FY 2015", Quarter = "Q2" });
        pivotData.Add(new PivotData { Sold = 90, Amount = 153360, Country = "France", Products = "Mountain Bikes", Year = "FY 2015", Quarter = "Q3" });
        pivotData.Add(new PivotData { Sold = 25, Amount = 42600, Country = "France", Products = "Mountain Bikes", Year = "FY 2015", Quarter = "Q4" });
        pivotData.Add(new PivotData { Sold = 27, Amount = 46008, Country = "France", Products = "Mountain Bikes", Year = "FY 2016", Quarter = "Q1" });
        // Add more data records...
        return pivotData;
    }
}
```

### Step 3: Add Pivot Table to View

File: `~/Pages/Index.cshtml`

```html
@page

<div style="margin: 20px;">
    <h1>Sales Analysis - Pivot Table</h1>
    
    <ejs-pivotview id="PivotView" height="450" width="100%">
        <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
            <e-rows>
                <e-field name="Country"></e-field>
            </e-rows>
            <e-columns>
                <e-field name="Year"></e-field>
            </e-columns>
            <e-values>
                <e-field name="Amount" caption="Sales Amount" type="Sum"></e-field>
                <e-field name="Sold" caption="Units Sold" type="Sum"></e-field>
            </e-values>
        </e-datasourcesettings>
    </ejs-pivotview>
</div>
```

## Configure Axes

The pivot table uses four primary axes to organize data:

**Axis Types:**
- `<e-rows>` - Fields displayed as row headers
- `<e-columns>` - Fields displayed as column headers
- `<e-values>` - Aggregated numeric fields
- `<e-filters>` - Fields that filter all data across rows, columns, and values

### Multiple Fields in Each Axis

```html
<ejs-pivotview id="PivotView" height="450" width="100%">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country" caption="Country"></e-field>
            <e-field name="Products" caption="Product Category"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Fiscal Year"></e-field>
            <e-field name="Quarter" caption="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Total Sales" type="Sum"></e-field>
            <e-field name="Sold" caption="Units Sold" type="Sum"></e-field>
        </e-values>
        <e-filters>
            <e-field name="Region" caption="Sales Region"></e-field>
        </e-filters>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Important Field Configuration:**
- `name` - Field name from data model (case-sensitive, must match exactly)
- `caption` - Display name shown in UI and Field List
- `summaryType` - Aggregation method: Sum, Avg, Product, Count, Min, Max, StdDev, Var, DistinctCount, Index, PopulationStdDev, PopulationVar

## Enable UI Features

### Field List Panel

Allow users to drag and drop fields to reshape the pivot table:

```html
<ejs-pivotview id="PivotView" height="450" width="100%" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Grouping Bar

Enable drag-drop interface above the pivot table:

```html
<ejs-pivotview id="PivotView" height="450" width="100%" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Both Field List and Grouping Bar

```html
<ejs-pivotview id="PivotView" height="450" width="100%" showFieldList="true" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| **height** | String | Table height (e.g., "450", "100%") |
| **width** | String | Table width (e.g., "100%") |
| **showFieldList** | Boolean | Display field configuration panel |
| **showGroupingBar** | Boolean | Display grouping bar for drag-drop |
| **showToolbar** | Boolean | Display export and feature toolbar |
| **showTooltip** | Boolean | Display cell data tooltips |
| **allowCalculatedField** | Boolean | Enable custom calculated fields |
| **allowDeferLayoutUpdate** | Boolean | Defer rendering until user clicks Apply |
| **allowExcelExport** | Boolean | Enable Excel export feature |
| **allowPdfExport** | Boolean | Enable PDF export feature |

## Common Configuration Patterns

**Basic Sales Summary:**

```html
<e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
    <e-rows>
        <e-field name="Country"></e-field>
    </e-rows>
    <e-columns>
        <e-field name="Year"></e-field>
    </e-columns>
    <e-values>
        <e-field name="Amount" type="Sum"></e-field>
    </e-values>
</e-datasourcesettings>
```

**Multi-level Row Hierarchy:**

```html
<e-rows>
    <e-field name="Year"></e-field>
    <e-field name="Country"></e-field>
    <e-field name="Products"></e-field>
</e-rows>
```

**Multiple Aggregations:**

```html
<e-values>
    <e-field name="Amount" caption="Total Sales" type="Sum"></e-field>
    <e-field name="Amount" caption="Average Sales" type="Avg"></e-field>
    <e-field name="Quantity" caption="Total Count" type="Count"></e-field>
</e-values>
```

**With Formatting:**

```html
<e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
    <e-formatsettings>
        <e-field name="Amount" format="C2" useGrouping="true"></e-field>
        <e-field name="Sold" format="N0"></e-field>
    </e-formatsettings>
    <e-rows>
        <e-field name="Country"></e-field>
    </e-rows>
    <e-columns>
        <e-field name="Year"></e-field>
    </e-columns>
    <e-values>
        <e-field name="Amount" type="Sum"></e-field>
        <e-field name="Sold" type="Sum"></e-field>
    </e-values>
</e-datasourcesettings>
```
```
```

Show Grouping Bar

Enable drag-drop field arrangement:

```html
<ejs-pivotview id="PivotView" showGroupingBar="true">
```

### Enable Toolbar

Add export and feature buttons:

```html
<ejs-pivotview id="PivotView" showToolbar="true">
```

### Set Dimensions

Configure display size:

```html
<ejs-pivotview id="PivotView" width="100%" height="600">
```

## Troubleshooting

### Component Not Displaying

✓ Verify script manager is registered: `<ejs-scripts></ejs-scripts>`
✓ Check stylesheet link is included
✓ Ensure data source is properly bound

### Data Not Loading

✓ Verify `ViewBag.DataSource` is populated
✓ Check field names match your model exactly
✓ Ensure data is not null or empty

### Styles Not Applied

✓ Clear browser cache (Ctrl+Shift+Delete)
✓ Verify CSS file URL in _Layout.cshtml
✓ Check CDN availability

### TagHelper Not Recognized

✓ Verify `@addTagHelper *, Syncfusion.EJ2` in _ViewImports.cshtml
✓ Rebuild solution
✓ Check NuGet package installation

## Next Steps

After basic setup, explore:

1. **Data Shaping** - Master filtering, sorting, grouping
2. **Export Features** - Export to Excel, PDF, CSV
3. **Customization** - Conditional formatting, calculated fields
4. **Performance** - Virtual scrolling, paging for large datasets  
5. **Advanced Features** - Drill-down, state persistence
6. **API Integration** - Remote data sources and real-time updates

See other reference files for detailed configuration of each feature.
