# Data Binding and Rendering Modes

- [Array Data Binding](#array-data-binding)
  - [Array with Table Adaptor](#array-with-table-adaptor)
  - [Array with Cell Adaptor](#array-with-cell-adaptor)
- [JSON Data Binding](#json-data-binding)
  - [JSON with Table Adaptor](#json-with-table-adaptor)
  - [JSON with Cell Adaptor](#json-with-cell-adaptor)
- [Rendering Modes](#rendering-modes)
  - [SVG Rendering](#svg-rendering)
  - [Canvas Rendering](#canvas-rendering)
  - [Automatic Mode Default](#automatic-mode-default)
- [Performance Considerations](#performance-considerations)
  - [Optimizing for Large Datasets](#optimizing-for-large-datasets)
  - [Memory Management](#memory-management)
- [Remote Data Sources](#remote-data-sources)
  - [Using OData Service](#using-odata-service)
  - [Using Custom HTTP Service](#using-custom-http-service)
- [Data Format Specifications](#data-format-specifications)
  - [Required Properties for Cell Adaptor](#required-properties-for-cell-adaptor)
  - [Optional Properties for Customization](#optional-properties-for-customization)
  - [Data Type Specifications](#data-type-specifications)
  - [Handling Missing or Null Values](#handling-missing-or-null-values)
- [Examples](#examples)
  - [Complete Data Binding Example](#complete-data-binding-example)
  - [Large Dataset Handling](#large-dataset-handling)

## Array Data Binding

Array data binding is useful when the HeatMap values are already available as matrix-style numeric data.

For ASP.NET Core Razor Pages, the recommended structure is:

- Keep HeatMap markup in `Pages/Index.cshtml`.
- Keep data generation and reusable configuration in `Pages/Index.cshtml.cs`.
- Use real Razor tags in `.cshtml` files, not encoded tags.
- Use `@Model.PropertyName` instead of `ViewBag`.

### Array with Table Adaptor

Use array table binding when your data is a complete matrix and every row/column position has a value.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="arrayTableHeatmap"
    dataSource="@Model.ArrayTableData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.ArrayTableXLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.ArrayTableYLabels">
    </e-heatmap-yaxis>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public int[,] ArrayTableData { get; set; } =
        {
            { 10, 20, 30 },
            { 40, 50, 60 },
            { 70, 80, 90 }
        };

        public string[] ArrayTableXLabels { get; set; } =
        {
            "Week 1", "Week 2", "Week 3"
        };

        public string[] ArrayTableYLabels { get; set; } =
        {
            "Jan", "Feb", "Mar"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
        }
    }
}
```

Use this approach when:

- The data is naturally matrix-based.
- Every X/Y combination has a value.
- You do not need custom field mapping.
- The row and column counts are predictable.

### Array with Cell Adaptor

Use cell-style object binding when each data point explicitly defines its X position, Y position, and value. This approach is more flexible than a raw matrix because it supports sparse cells and named fields.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="arrayCellHeatmap"
    dataSource="@Model.ArrayCellData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="2"
        interval="1">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="2"
        interval="1">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public List<NumericHeatMapDataPoint> ArrayCellData { get; set; } = new List<NumericHeatMapDataPoint>
{
    new NumericHeatMapDataPoint { XValue = 0, YValue = 0, Value = 10 },
    new NumericHeatMapDataPoint { XValue = 0, YValue = 1, Value = 20 },
    new NumericHeatMapDataPoint { XValue = 0, YValue = 2, Value = 30 },
    new NumericHeatMapDataPoint { XValue = 1, YValue = 0, Value = 40 },
    new NumericHeatMapDataPoint { XValue = 1, YValue = 1, Value = 50 },
    new NumericHeatMapDataPoint { XValue = 1, YValue = 2, Value = 60 },
    new NumericHeatMapDataPoint { XValue = 2, YValue = 0, Value = 70 },
    new NumericHeatMapDataPoint { XValue = 2, YValue = 1, Value = 80 },
    new NumericHeatMapDataPoint { XValue = 2, YValue = 2, Value = 90 }
};

public class NumericHeatMapDataPoint
{
    public double XValue { get; set; }

    public double YValue { get; set; }

    public double Value { get; set; }
}
```

Advantages of cell-style object binding:

- Explicit X/Y positioning.
- Better for sparse data.
- Easier to map database results.
- Easier to debug because each object has named fields.
- Works well with `e-heatmap-datasourcesettings`.

## JSON Data Binding

JSON-style object binding is the recommended pattern for most ASP.NET Core Razor Pages HeatMap scenarios because it works cleanly with strongly typed C# models.

### JSON with Table Adaptor

Use JSON table-style binding when each object represents a row and each field represents a column.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="jsonTableHeatmap"
    dataSource="@Model.JsonTableData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.JsonTableXLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.JsonTableYLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Table"
        xDataMapping="Month">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public string[] JsonTableXLabels { get; set; } =
{
    "Week1", "Week2", "Week3"
};

public string[] JsonTableYLabels { get; set; } =
{
    "Jan", "Feb", "Mar"
};

public List<MonthlyWeekData> JsonTableData { get; set; } = new List<MonthlyWeekData>
{
    new MonthlyWeekData { Month = "Jan", Week1 = 10, Week2 = 20, Week3 = 30 },
    new MonthlyWeekData { Month = "Feb", Week1 = 40, Week2 = 50, Week3 = 60 },
    new MonthlyWeekData { Month = "Mar", Week1 = 70, Week2 = 80, Week3 = 90 }
};

public class MonthlyWeekData
{
    public string Month { get; set; } = string.Empty;

    public double Week1 { get; set; }

    public double Week2 { get; set; }

    public double Week3 { get; set; }
}
```

Use JSON table binding when:

- Data naturally comes as rows and columns.
- Each row has the same set of value fields.
- The first field identifies the row.
- The remaining fields represent matrix values.

### JSON with Cell Adaptor

Use JSON cell binding when each object represents one cell in the HeatMap. This is the safest and most flexible pattern for ASP.NET Core Razor Pages.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="jsonCellHeatmap"
    dataSource="@Model.JsonCellData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.ProductLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.DepartmentLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Product"
        yDataMapping="Department"
        valueMapping="Revenue">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
public string[] ProductLabels { get; set; } =
{
    "A", "B"
};

public string[] DepartmentLabels { get; set; } =
{
    "Sales", "Marketing"
};

public List<DepartmentProductRevenue> JsonCellData { get; set; } = new List<DepartmentProductRevenue>
{
    new DepartmentProductRevenue { Department = "Sales", Product = "A", Revenue = 15000 },
    new DepartmentProductRevenue { Department = "Sales", Product = "B", Revenue = 12000 },
    new DepartmentProductRevenue { Department = "Marketing", Product = "A", Revenue = 8000 },
    new DepartmentProductRevenue { Department = "Marketing", Product = "B", Revenue = 9500 }
};

public class DepartmentProductRevenue
{
    public string Department { get; set; } = string.Empty;

    public string Product { get; set; } = string.Empty;

    public double Revenue { get; set; }
}
```

Data mapping properties:

- `xDataMapping`: Maps the source field used for the X-axis value.
- `yDataMapping`: Maps the source field used for the Y-axis value.
- `valueMapping`: Maps the source field used for the HeatMap cell value.

## Rendering Modes

Rendering mode controls whether the HeatMap is drawn using SVG or Canvas.

### SVG Rendering

SVG rendering is suitable for small to medium datasets where interaction and visual clarity are important.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="svgHeatmap"
    dataSource="@Model.JsonCellData"
    renderingMode="SVG"
    showTooltip="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Product"
        yDataMapping="Department"
        valueMapping="Revenue">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

SVG rendering is useful when:

- Dataset size is small or moderate.
- You need tooltips and hover interaction.
- You need better vector clarity.
- You need labels inside cells.

### Canvas Rendering

Canvas rendering is suitable for large datasets where performance is more important than per-element SVG interaction.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="canvasHeatmap"
    dataSource="@Model.LargeData"
    renderingMode="Canvas"
    showTooltip="false">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

Canvas rendering is useful when:

- Dataset size is large.
- You need faster rendering.
- Labels are not required.
- Tooltip interaction is not required for every cell.
- Browser memory usage must be reduced.

### Automatic Mode Default

Use `renderingMode="Auto"` when the component should choose a suitable rendering mode based on the rendered data volume.

```cshtml
<ejs-heatmap
    id="autoHeatmap"
    dataSource="@Model.JsonCellData"
    renderingMode="Auto"
    showTooltip="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Product"
        yDataMapping="Department"
        valueMapping="Revenue">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Use automatic mode when:

- The dataset size can vary.
- You want a balance between interactivity and performance.
- The same page may render small and large datasets.

## Performance Considerations

### Optimizing for Large Datasets

For large datasets, use Canvas rendering, disable labels, disable unnecessary tooltips, and reduce the amount of data sent to the browser.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="largeHeatmap"
    dataSource="@Model.LargeData"
    renderingMode="@Model.RenderingMode"
    showTooltip="false"
    width="100%"
    height="600px">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="199"
        interval="20">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="199"
        interval="20">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<NumericHeatMapDataPoint> LargeData { get; set; } = new List<NumericHeatMapDataPoint>();

        public string RenderingMode { get; set; } = "Canvas";

        public void OnGet()
        {
            LargeData = GenerateLargeData(200, 200);
            RenderingMode = LargeData.Count > 5000 ? "Canvas" : "SVG";
        }

        private List<NumericHeatMapDataPoint> GenerateLargeData(int xCount, int yCount)
        {
            List<NumericHeatMapDataPoint> data = new List<NumericHeatMapDataPoint>();

            for (int x = 0; x < xCount; x++)
            {
                for (int y = 0; y < yCount; y++)
                {
                    data.Add(new NumericHeatMapDataPoint
                    {
                        XValue = x,
                        YValue = y,
                        Value = (x * y) % 100
                    });
                }
            }

            return data;
        }
    }

    public class NumericHeatMapDataPoint
    {
        public double XValue { get; set; }

        public double YValue { get; set; }

        public double Value { get; set; }
    }
}
```

Optimization checklist:

1. Use `renderingMode="Canvas"` for very large datasets.
2. Set `showTooltip="false"` when detailed hover information is not needed.
3. Set `showLabel="false"` for high-density cells.
4. Reduce axis label density using `interval`.
5. Aggregate or filter data server-side before binding.
6. Avoid creating a new `Random` instance inside tight loops.
7. Avoid sending unused fields to the browser.

### Memory Management

Recommended memory practices:

- Do not load unnecessary historical records if only a filtered range is needed.
- Aggregate data on the server before binding.
- Use paging or range-based data loading for very large matrices.
- Avoid binding huge object graphs with unused properties.
- Prefer lightweight DTO classes for HeatMap data.
- Disable labels and tooltips when rendering thousands of cells.
- Monitor browser memory and JavaScript performance when testing large datasets.

## Remote Data Sources

Remote data can be used when the HeatMap data is fetched from a service endpoint instead of being fully rendered on initial page load.

For Razor Pages, a reliable pattern is:

1. Render the HeatMap with an empty or initial datasource.
2. Fetch data from a Razor Page handler.
3. Assign the returned JSON to the HeatMap instance.
4. Refresh the HeatMap.

### Using OData Service

If the remote endpoint returns OData-shaped data, fetch the endpoint using JavaScript, normalize the result into HeatMap cell objects, and assign it to the HeatMap datasource.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="loadODataHeatMapData()">Load OData Data</button>

<ejs-heatmap
    id="odataHeatmap"
    dataSource="@Model.RemoteInitialData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.RemoteXLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RemoteYLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>

<script>
    function loadODataHeatMapData() {
        fetch('?handler=ODataHeatMapData')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var heatmap = document.getElementById('odataHeatmap').ej2_instances[0];
                heatmap.dataSource = data;
                heatmap.refresh();
            });
    }
</script>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<HeatMapDataPoint> RemoteInitialData { get; set; } = new List<HeatMapDataPoint>();

        public string[] RemoteXLabels { get; set; } =
        {
            "Q1", "Q2"
        };

        public string[] RemoteYLabels { get; set; } =
        {
            "North", "South"
        };

        public void OnGet()
        {
        }

        public JsonResult OnGetODataHeatMapData()
        {
            List<HeatMapDataPoint> data = new List<HeatMapDataPoint>
            {
                new HeatMapDataPoint { XValue = "Q1", YValue = "North", Value = 72 },
                new HeatMapDataPoint { XValue = "Q2", YValue = "North", Value = 84 },
                new HeatMapDataPoint { XValue = "Q1", YValue = "South", Value = 65 },
                new HeatMapDataPoint { XValue = "Q2", YValue = "South", Value = 91 }
            };

            return new JsonResult(data);
        }
    }

    public class HeatMapDataPoint
    {
        public string XValue { get; set; } = string.Empty;

        public string YValue { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

### Using Custom HTTP Service

Use a custom Razor Page handler when the HeatMap data is generated from a database, API, or filtered server-side query.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<button type="button" onclick="loadServerData()">Load Server Data</button>

<ejs-heatmap
    id="customHttpHeatmap"
    dataSource="@Model.RemoteInitialData"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>

<script>
    function loadServerData() {
        fetch('?handler=HeatMapData&skip=0&take=100')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var heatmap = document.getElementById('customHttpHeatmap').ej2_instances[0];
                heatmap.dataSource = data;
                heatmap.refresh();
            });
    }
</script>
```

#### Pages/Index.cshtml.cs

```csharp
public JsonResult OnGetHeatMapData(int skip = 0, int take = 100)
{
    List<HeatMapDataPoint> allData = GetServerHeatMapData();

    List<HeatMapDataPoint> result = allData
        .Skip(skip)
        .Take(take)
        .ToList();

    return new JsonResult(result);
}

private List<HeatMapDataPoint> GetServerHeatMapData()
{
    List<HeatMapDataPoint> data = new List<HeatMapDataPoint>();

    for (int x = 0; x < 20; x++)
    {
        for (int y = 0; y < 20; y++)
        {
            data.Add(new HeatMapDataPoint
            {
                XValue = "X" + x,
                YValue = "Y" + y,
                Value = (x + y) % 100
            });
        }
    }

    return data;
}
```

## Data Format Specifications

### Required Properties for Cell Adaptor

For cell-style object binding, every object should contain:

- One field for the X value.
- One field for the Y value.
- One numeric field for the cell value.

Example model:

```csharp
public class HeatMapDataPoint
{
    public string XValue { get; set; } = string.Empty;

    public string YValue { get; set; } = string.Empty;

    public double Value { get; set; }
}
```

Matching mapping configuration:

```cshtml
<e-heatmap-datasourcesettings
    isJsonData="true"
    adaptorType="Cell"
    xDataMapping="XValue"
    yDataMapping="YValue"
    valueMapping="Value">
</e-heatmap-datasourcesettings>
```

### Optional Properties for Customization

Additional properties can be included for custom tooltip text, filtering, grouping, or client-side logic.

```csharp
public class AdvancedHeatMapData
{
    public string XValue { get; set; } = string.Empty;

    public string YValue { get; set; } = string.Empty;

    public double Value { get; set; }

    public string Category { get; set; } = string.Empty;

    public string CustomLabel { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}
```

Use optional fields when:

- A tooltip template needs additional details.
- A client-side event needs metadata.
- Data must be filtered or grouped before binding.
- You need to preserve source context for selected cells.

### Data Type Specifications

| Property | Recommended Type | Notes |
|----------|------------------|-------|
| X field | `string`, `double`, or `DateTime` | Must match the X-axis `valueType`. |
| Y field | `string`, `double`, or `DateTime` | Must match the Y-axis `valueType`. |
| Value field | `double`, `int`, or nullable numeric after cleanup | Used for color and label rendering. |
| Custom metadata | `string`, `bool`, numeric, or date types | Used only for custom logic. |

### Handling Missing or Null Values

Clean null values before assigning data to the HeatMap.

#### Exclude Null Values

```csharp
List<NullableHeatMapDataPoint> validData = sourceData
    .Where(item => item.Value.HasValue)
    .ToList();
```

#### Replace Null Values with a Default

```csharp
List<HeatMapDataPoint> cleanData = sourceData
    .Select(item => new HeatMapDataPoint
    {
        XValue = item.XValue,
        YValue = item.YValue,
        Value = item.Value ?? 0
    })
    .ToList();
```

#### Use Sparse Cell Data

```csharp
List<HeatMapDataPoint> sparseData = sourceData
    .Where(item => item.Value.HasValue)
    .Select(item => new HeatMapDataPoint
    {
        XValue = item.XValue,
        YValue = item.YValue,
        Value = item.Value.Value
    })
    .ToList();
```

Example nullable model:

```csharp
public class NullableHeatMapDataPoint
{
    public string XValue { get; set; } = string.Empty;

    public string YValue { get; set; } = string.Empty;

    public double? Value { get; set; }
}
```

## Examples

### Complete Data Binding Example

This example demonstrates a complete strongly typed JSON cell binding implementation.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="completeDataBindingHeatmap"
    dataSource="@Model.SalesMetrics"
    showTooltip="true"
    renderingMode="Auto">

    <e-heatmap-titlesettings
        text="Q1 Sales Metrics"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.SalesProductLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.SalesDepartmentLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Product"
        yDataMapping="Department"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public string[] SalesProductLabels { get; set; } =
        {
            "Product A", "Product B", "Product C"
        };

        public string[] SalesDepartmentLabels { get; set; } =
        {
            "Sales", "Marketing", "Operations"
        };

        public List<SalesMetric> SalesMetrics { get; set; } = new List<SalesMetric>();

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "18px",
            Color = "#222222"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 10000, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 20000, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
            SalesMetrics = new List<SalesMetric>
            {
                new SalesMetric { Department = "Sales", Product = "Product A", Sales = 15000 },
                new SalesMetric { Department = "Sales", Product = "Product B", Sales = 12000 },
                new SalesMetric { Department = "Sales", Product = "Product C", Sales = 18000 },
                new SalesMetric { Department = "Marketing", Product = "Product A", Sales = 8000 },
                new SalesMetric { Department = "Marketing", Product = "Product B", Sales = 9500 },
                new SalesMetric { Department = "Marketing", Product = "Product C", Sales = 11000 },
                new SalesMetric { Department = "Operations", Product = "Product A", Sales = 13000 },
                new SalesMetric { Department = "Operations", Product = "Product B", Sales = 16000 },
                new SalesMetric { Department = "Operations", Product = "Product C", Sales = 20000 }
            };
        }
    }

    public class SalesMetric
    {
        public string Department { get; set; } = string.Empty;

        public string Product { get; set; } = string.Empty;

        public double Sales { get; set; }
    }
}
```

### Large Dataset Handling

This example demonstrates Canvas rendering with a generated large dataset.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="largeDatasetHeatmap"
    dataSource="@Model.LargeData"
    renderingMode="Canvas"
    showTooltip="false"
    width="100%"
    height="650px">

    <e-heatmap-xaxis
        valueType="Numeric"
        minimum="0"
        maximum="199"
        interval="25">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Numeric"
        minimum="0"
        maximum="199"
        interval="25">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<NumericHeatMapDataPoint> LargeData { get; set; } = new List<NumericHeatMapDataPoint>();

        public void OnGet()
        {
            LargeData = new List<NumericHeatMapDataPoint>();

            for (int x = 0; x < 200; x++)
            {
                for (int y = 0; y < 200; y++)
                {
                    LargeData.Add(new NumericHeatMapDataPoint
                    {
                        XValue = x,
                        YValue = y,
                        Value = (x + y) % 100
                    });
                }
            }
        }
    }

    public class NumericHeatMapDataPoint
    {
        public double XValue { get; set; }

        public double YValue { get; set; }

        public double Value { get; set; }
    }
}
```
