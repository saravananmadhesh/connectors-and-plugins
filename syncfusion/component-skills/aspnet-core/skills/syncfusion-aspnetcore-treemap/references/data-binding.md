# Data Binding in Syncfusion TreeMap

Comprehensive guide to populating the Syncfusion TreeMap component with data using flat collections, grouped flat data, and hierarchical-style field mappings in ASP.NET Core Razor Pages.

## Table of Contents
- [Overview](#overview)
- [Flat Collection Data Binding](#flat-collection-data-binding)
  - [When to Use Flat Collections](#when-to-use-flat-collections)
  - [Basic Flat Collection Example](#basic-flat-collection-example)
  - [Mapping Custom Fields](#mapping-custom-fields)
- [Hierarchical Collection Data Binding](#hierarchical-collection-data-binding)
  - [When to Use Hierarchical Collections](#when-to-use-hierarchical-collections)
  - [Example Multi-Level Hierarchy](#example-multi-level-hierarchy)
  - [Understanding groupPath](#understanding-grouppath)
- [Field Mapping Best Practices](#field-mapping-best-practices)
  - [Required Field weightValuePath](#required-field-weightvaluepath)
  - [Optional Field labelPath](#optional-field-labelpath)
  - [Optional Field rangeColorValuePath](#optional-field-rangecolorvaluepath)
  - [Optional Field equalColorValuePath](#optional-field-equalcolorvaluepath)
- [Data Source Patterns](#data-source-patterns)
  - [Pattern 1 From Database Query](#pattern-1-from-database-query)
  - [Pattern 2 From JSON or API Response](#pattern-2-from-json-or-api-response)
  - [Pattern 3 Filtered or Grouped Data](#pattern-3-filtered-or-grouped-data)
  - [Pattern 4 Pre-computed Hierarchical Data](#pattern-4-pre-computed-hierarchical-data)
- [Common Data Binding Scenarios](#common-data-binding-scenarios)
  - [Scenario Dynamic Data Loading](#scenario-dynamic-data-loading)
  - [Scenario Time-Series Data](#scenario-time-series-data)
  - [Scenario Multiple Data Sources](#scenario-multiple-data-sources)
- [Data Binding Troubleshooting](#data-binding-troubleshooting)

---

## Overview

The TreeMap `dataSource` property accepts collection values as input. In ASP.NET Core Razor Pages, the recommended approach is to expose a strongly typed property from `Index.cshtml.cs` and bind it directly in the Razor view.

You can bind:

- **Flat collections** - A simple list where each item becomes a TreeMap leaf item.
- **Grouped flat collections** - A flat list grouped visually through `groupPath`.
- **Hierarchical-style field mappings** - Multiple grouping fields such as `Continent`, `Country`, and `Region`.

The data determines visualization through field mapping:

- **`weightValuePath`** - Numeric field used to calculate rectangle size.
- **`labelPath`** - Field used for displaying text inside leaf items.
- **`rangeColorValuePath`** - Numeric field used for range-based color mapping.
- **`equalColorValuePath`** - Field used for category-based color mapping.
- **`groupPath`** - Field used to create grouping levels.

---

## Flat Collection Data Binding

### When to Use Flat Collections

Flat collections are ideal when:

- You have a single list of items.
- All items are at the same level.
- There is no required parent-child visual grouping.
- Data comes pre-sorted, filtered, or aggregated.
- Each record should appear as one rectangle in the TreeMap.

### Basic Flat Collection Example

Define the model and data in `Index.cshtml.cs`.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<ProductSales> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<ProductSales>
        {
            new ProductSales { Product = "Laptop", Sales = 5000, Revenue = 150000, Category = "Electronics" },
            new ProductSales { Product = "Phone", Sales = 8000, Revenue = 200000, Category = "Electronics" },
            new ProductSales { Product = "Chair", Sales = 3000, Revenue = 60000, Category = "Furniture" },
            new ProductSales { Product = "Desk", Sales = 4000, Revenue = 120000, Category = "Furniture" },
            new ProductSales { Product = "Monitor", Sales = 6000, Revenue = 180000, Category = "Electronics" }
        };
    }

    public class ProductSales
    {
        public string Product { get; set; } = string.Empty;
        public double Sales { get; set; }
        public double Revenue { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}
```

Bind the strongly typed data in `Index.cshtml`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

In this example:

- Each item in `TreeMapData` becomes a rectangle.
- Rectangle size is proportional to the `Sales` value.
- Product name displays inside each rectangle through `labelPath="Product"`.

### Mapping Custom Fields

For complex data structures, explicitly map the fields used by the TreeMap.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<ComplexData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<ComplexData>
        {
            new ComplexData { DisplayName = "Alpha", ItemSize = 120, Ranking = 1 },
            new ComplexData { DisplayName = "Beta", ItemSize = 90, Ranking = 2 },
            new ComplexData { DisplayName = "Gamma", ItemSize = 60, Ranking = 3 }
        };
    }

    public class ComplexData
    {
        public string DisplayName { get; set; } = string.Empty;
        public int ItemSize { get; set; }
        public int Ranking { get; set; }
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="ItemSize"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="DisplayName">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

---

## Hierarchical Collection Data Binding

### When to Use Hierarchical Collections

Hierarchical or grouped data binding is ideal when:

- Data has natural grouping fields.
- You need multiple visual levels.
- Drill-down exploration is required.
- Data represents organizational, geographic, category, or directory-style structures.
- Parent groups should be visually separated from leaf items.

### Example Multi-Level Hierarchy

Define a flat dataset with hierarchy fields in `Index.cshtml.cs`.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<RegionData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<RegionData>
        {
            new RegionData { Continent = "Asia", Country = "India", Region = "North", Population = 500000000 },
            new RegionData { Continent = "Asia", Country = "India", Region = "South", Population = 300000000 },
            new RegionData { Continent = "Asia", Country = "China", Region = "East", Population = 800000000 },
            new RegionData { Continent = "Asia", Country = "China", Region = "West", Population = 400000000 },

            new RegionData { Continent = "Europe", Country = "France", Region = "North", Population = 50000000 },
            new RegionData { Continent = "Europe", Country = "France", Region = "South", Population = 20000000 },
            new RegionData { Continent = "Europe", Country = "Germany", Region = "East", Population = 60000000 },
            new RegionData { Continent = "Europe", Country = "Germany", Region = "West", Population = 40000000 }
        };
    }

    public class RegionData
    {
        public string Continent { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public long Population { get; set; }
    }
}
```

Configure hierarchy with `groupPath` in `Index.cshtml`.

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Population"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}"
                             fill='@("#336699")'>
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="${Country}"
                             fill='@("#0066CC")'>
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Region">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

In this example:

- **Level 1** groups by `Continent`.
- **Level 2** groups by `Country`.
- Leaf items display `Region`.
- Rectangle size is based on `Population`.
- Group headers are configured with `headerFormat`.

### Understanding groupPath

The `groupPath` property specifies which data field creates a grouping level.

```cshtml
<e-treemap-level groupPath="Continent">
</e-treemap-level>
```

This groups all records by the `Continent` field.

```cshtml
<e-treemap-level groupPath="Country">
</e-treemap-level>
```

This further groups records by the `Country` field within each continent group.

Best practices for `groupPath`:

- Use fields that exist in every data item.
- Avoid empty or null group values.
- Use `headerFormat` to show group text clearly.
- Keep leaf labels in `leafItemSettings`, not in the final level.

---

## Field Mapping Best Practices

### Required Field weightValuePath

Always specify `weightValuePath`. It determines rectangle size and must point to a numeric field.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales">
</ejs-treemap>
```

Without a valid numeric `weightValuePath`, TreeMap rectangles may not render as expected.

### Optional Field labelPath

Specify `labelPath` in `leafItemSettings` to display text inside rectangles.

```cshtml
<e-treemap-leafitemsettings labelPath="ProductName">
</e-treemap-leafitemsettings>
```

If labels are not needed, disable them explicitly.

```cshtml
<e-treemap-leafitemsettings labelPath="ProductName"
                            showLabels="false">
</e-treemap-leafitemsettings>
```

### Optional Field rangeColorValuePath

Use `rangeColorValuePath` for range-based color mapping.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             rangeColorValuePath="Revenue">
    <e-treemap-leafitemsettings labelPath="Product">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping from="0"
                                             to="100000"
                                             color='@("#66BB6A")'
                                             label="Low">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping from="100000"
                                             to="250000"
                                             color='@("#FDD835")'
                                             label="Medium">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

`rangeColorValuePath` can be the same as `weightValuePath` or a different numeric field.

### Optional Field equalColorValuePath

Use `equalColorValuePath` for category-based colors.

```cshtml
<ejs-treemap id="treemap"
             dataSource="Model.TreeMapData"
             weightValuePath="Sales"
             equalColorValuePath="Category">
    <e-treemap-leafitemsettings labelPath="Product">
        <e-leafitemsettings-colormappings>
            <e-leafitemsettings-colormapping value="Electronics"
                                             color='@("#336699")'
                                             label="Electronics">
            </e-leafitemsettings-colormapping>
            <e-leafitemsettings-colormapping value="Furniture"
                                             color='@("#FF6B6B")'
                                             label="Furniture">
            </e-leafitemsettings-colormapping>
        </e-leafitemsettings-colormappings>
    </e-treemap-leafitemsettings>
</ejs-treemap>
```

---

## Data Source Patterns

### Pattern 1 From Database Query

Use this pattern when data comes from a database. The database context must be injected into the Razor Page model.

```csharp
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public IndexModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = _context.Sales
            .Select(item => new SalesData
            {
                Name = item.ProductName,
                Sales = item.Quantity,
                Revenue = item.Amount,
                Category = item.ProductCategory
            })
            .ToList();
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
        public double Revenue { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### Pattern 2 From JSON or API Response

Use `System.Text.Json` for JSON deserialization in ASP.NET Core.

```csharp
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        var jsonData = """
        [
            { "Name": "A", "Sales": 100 },
            { "Name": "B", "Sales": 200 },
            { "Name": "C", "Sales": 300 }
        ]
        """;

        TreeMapData = JsonSerializer.Deserialize<List<SalesData>>(jsonData) ?? new List<SalesData>();
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### Pattern 3 Filtered or Grouped Data

Filter and project data before binding it to the TreeMap.

```csharp
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public IndexModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = _context.Sales
            .Where(item => item.Year == 2024)
            .GroupBy(item => item.Category)
            .Select(group => new SalesData
            {
                Category = group.Key,
                Name = group.Key,
                Sales = group.Sum(item => item.Sales)
            })
            .ToList();
    }

    public class SalesData
    {
        public string Category { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

### Pattern 4 Pre-computed Hierarchical Data

For large datasets, aggregate data server-side before binding.

```csharp
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public IndexModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<RegionSalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = _context.Sales
            .GroupBy(item => new
            {
                item.Continent,
                item.Country,
                item.Region
            })
            .Select(group => new RegionSalesData
            {
                Continent = group.Key.Continent,
                Country = group.Key.Country,
                Region = group.Key.Region,
                Sales = group.Sum(item => item.Sales)
            })
            .ToList();
    }

    public class RegionSalesData
    {
        public string Continent { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Region { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Continent"
                             headerFormat="${Continent}">
            </e-treemap-level>
            <e-treemap-level groupPath="Country"
                             headerFormat="${Country}">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Region">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

---

## Common Data Binding Scenarios

### Scenario Dynamic Data Loading

Use a Razor Page handler to return JSON data and update the TreeMap instance on the client side.

```csharp
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<SalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = GetSalesData();
    }

    public JsonResult OnGetCategoryData(string category)
    {
        var data = GetSalesData()
            .Where(item => string.IsNullOrWhiteSpace(category) || item.Category == category)
            .ToList();

        return new JsonResult(data, new JsonSerializerOptions
        {
            PropertyNamingPolicy = null
        });
    }

    private List<SalesData> GetSalesData()
    {
        return new List<SalesData>
        {
            new SalesData { Name = "Laptop", Category = "Electronics", Sales = 450000 },
            new SalesData { Name = "Phone", Category = "Electronics", Sales = 380000 },
            new SalesData { Name = "Table", Category = "Furniture", Sales = 220000 },
            new SalesData { Name = "Chair", Category = "Furniture", Sales = 180000 }
        };
    }

    public class SalesData
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

```cshtml
@page
@model IndexModel

<select onchange="loadCategoryData(this.value)">
    <option value="">All</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
</select>

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>

<script>
    window.loadCategoryData = function (category) {
        var url = category
            ? '?handler=CategoryData&category=' + encodeURIComponent(category)
            : '?handler=CategoryData';

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var treemapElement = document.getElementById('treemap');

                if (!treemapElement || !treemapElement.ej2_instances || treemapElement.ej2_instances.length === 0) {
                    return;
                }

                var treemap = treemapElement.ej2_instances[0];
                treemap.dataSource = data;
                treemap.refresh();
            });
    };
</script>
```

### Scenario Time-Series Data

Visualize data changes over time by grouping the TreeMap by year.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    public List<YearlySalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        TreeMapData = new List<YearlySalesData>
        {
            new YearlySalesData { Year = "2020", Product = "Laptop", Sales = 3000 },
            new YearlySalesData { Year = "2020", Product = "Phone", Sales = 4200 },
            new YearlySalesData { Year = "2021", Product = "Laptop", Sales = 5200 },
            new YearlySalesData { Year = "2021", Product = "Phone", Sales = 6100 },
            new YearlySalesData { Year = "2022", Product = "Laptop", Sales = 7000 },
            new YearlySalesData { Year = "2022", Product = "Phone", Sales = 7600 }
        };
    }

    public class YearlySalesData
    {
        public string Year { get; set; } = string.Empty;
        public string Product { get; set; } = string.Empty;
        public double Sales { get; set; }
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 layoutType="Squarified">
        <e-treemap-levels>
            <e-treemap-level groupPath="Year"
                             headerFormat="${Year}">
            </e-treemap-level>
        </e-treemap-levels>

        <e-treemap-leafitemsettings labelPath="Product">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

### Scenario Multiple Data Sources

Combine data from different sources before binding to the TreeMap.

```csharp
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AspNetCoreWebApp.Pages;

public class IndexModel : PageModel
{
    private readonly ProductDbContext _productContext;
    private readonly SalesDbContext _salesContext;

    public IndexModel(ProductDbContext productContext, SalesDbContext salesContext)
    {
        _productContext = productContext;
        _salesContext = salesContext;
    }

    public List<CombinedSalesData> TreeMapData { get; set; } = new();

    public void OnGet()
    {
        var productData = _productContext.Products.ToList();
        var salesData = _salesContext.Sales.ToList();

        TreeMapData = productData
            .Join(
                salesData,
                product => product.ProductId,
                sale => sale.ProductId,
                (product, sale) => new CombinedSalesData
                {
                    Name = product.Name,
                    Category = product.Category,
                    Sales = sale.Sales,
                    Revenue = sale.Revenue
                })
            .ToList();
    }

    public class CombinedSalesData
    {
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public double Sales { get; set; }
        public double Revenue { get; set; }
    }
}
```

```cshtml
@page
@model IndexModel

<div style="height: 500px; width: 100%;">
    <ejs-treemap id="treemap"
                 dataSource="Model.TreeMapData"
                 weightValuePath="Sales"
                 equalColorValuePath="Category"
                 layoutType="Squarified">
        <e-treemap-leafitemsettings labelPath="Name">
        </e-treemap-leafitemsettings>
    </ejs-treemap>
</div>
```

---

## Data Binding Troubleshooting

**Issue: TreeMap is not rendering**

- Verify `dataSource` is set.
- Verify the data collection is not empty.
- Verify `weightValuePath` matches an existing numeric field.
- Ensure the TreeMap container has a visible height.
- Ensure Syncfusion TagHelpers are registered in `_ViewImports.cshtml`.

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**Issue: Labels are not showing**

- Verify `labelPath` is specified in `leafItemSettings`.
- Verify the label field exists in your model.
- Check whether `showLabels="false"` is configured.
- Ensure rectangles are large enough to display labels.

**Issue: Incorrect sizing**

- Verify `weightValuePath` contains numeric values.
- Avoid null, zero, or negative values for size calculations.
- Ensure field names match exactly, including casing.
- If data is loaded through JSON, preserve property casing or update field paths.

**Issue: Hierarchy is not grouping correctly**

- Verify each `groupPath` matches an actual data field.
- Ensure grouping fields contain valid non-empty values.
- Configure `headerFormat` to clearly display group names.
- Keep final leaf text in `leafItemSettings`.

**Issue: Dynamic refresh renders blank**

- Ensure the refreshed JSON property names match `weightValuePath` and `labelPath`.
- If using `weightValuePath="Sales"`, returned JSON must contain `Sales`, not `sales`.
- Preserve PascalCase JSON if needed.

```csharp
return new JsonResult(data, new JsonSerializerOptions
{
    PropertyNamingPolicy = null
});
```

**Issue: Database examples fail with `_context` not found**

- Inject the database context through the PageModel constructor.
- Do not use `_context` in sample code unless it is declared.
- For standalone examples, use a local `GetSalesData()` method.

---
