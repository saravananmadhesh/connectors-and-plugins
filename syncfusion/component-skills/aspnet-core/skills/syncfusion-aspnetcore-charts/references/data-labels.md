# Data Labels Configuration

This guide covers comprehensive data label configuration in Syncfusion ASP.NET Core Charts, including positioning, templates, formatting, smart arrangement, and customization options.

## Table of Contents

- [Basic Data Labels](#basic-data-labels)
  - [Enable Data Labels](#enable-data-labels)
  - [Data Labels for Multiple Series](#data-labels-for-multiple-series)
- [Label Positioning](#label-positioning)
  - [Top Position](#top-position)
  - [Middle Position](#middle-position)
  - [Bottom Position](#bottom-position)
  - [Outer Position for Pie Chart](#outer-position-for-pie-chart)
  - [Custom Alignment](#custom-alignment)
- [Label Templates](#label-templates)
  - [Basic Template](#basic-template)
  - [Rich Template with Icons](#rich-template-with-icons)
  - [Conditional Template](#conditional-template)
  - [Multi-Line Template](#multi-line-template)
- [Label Formatting](#label-formatting)
  - [Currency Format](#currency-format)
  - [Percentage Format](#percentage-format)
  - [Custom Format](#custom-format)
  - [Decimal Format](#decimal-format)
- [Text Mapping](#text-mapping)
  - [Map Custom Text](#map-custom-text)
- [Smart Label Arrangement](#smart-label-arrangement)
  - [Auto Smart Labels](#auto-smart-labels)
  - [Prevent Label Overlap](#prevent-label-overlap)
  - [Handling Overlapping Data Labels](#handling-overlapping-data-labels)
- [Label Customization](#label-customization)
  - [Font Customization](#font-customization)
  - [Background and Border](#background-and-border)
  - [Rounded Corners](#rounded-corners)
- [Connector Lines](#connector-lines)
  - [Basic Connectors](#basic-connectors)
  - [Styled Connectors](#styled-connectors)
  - [Curved Connectors](#curved-connectors)
- [When to Use](#when-to-use)

## Basic Data Labels

### Enable Data Labels

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
public class ChartController : Controller
{
    public IActionResult Index()
    {
        ViewBag.ChartData = new[]
        {
            new { Month = "Jan", Sales = 35 },
            new { Month = "Feb", Sales = 28 },
            new { Month = "Mar", Sales = 34 },
            new { Month = "Apr", Sales = 32 },
            new { Month = "May", Sales = 40 }
        };
        return View();
    }
}
```

### Data Labels for Multiple Series

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.Sales2023" 
                  xName="Month" 
                  yName="Sales" 
                  name="2023"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true"></e-series-datalabel>
            </e-series-marker>
        </e-series>
        <e-series dataSource="@ViewBag.Sales2024" 
                  xName="Month" 
                  yName="Sales" 
                  name="2024"
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Label Positioning

### Top Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Top"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Middle Position

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Middle">
                    <e-font color="#ffffff" fontweight="600"></e-font>
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Bottom Position

```cshtml
@{
    var margin = new { left = 15, right = 15, bottom = 15, top = 15 };
 }
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Bottom" margin="margin">
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Outer Position for Pie Chart

```cshtml
<ejs-accumulationchart id="pie-chart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.PieData" 
                              xName="Category" 
                              yName="Value">
            <e-accumulationseries-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Outside" name="Text">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

```csharp
// Controller
ViewBag.PieData = new[]
{
    new { Category = "Product A", Value = 35, Text = "Product A: 35%" },
    new { Category = "Product B", Value = 28, Text = "Product B: 28%" },
    new { Category = "Product C", Value = 37, Text = "Product C: 37%" }
};
```

### Custom Alignment

```cshtml
@{
    var margin = new { top = 5 };
 }
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Top" alignment="@Syncfusion.EJ2.Charts.Alignment.Center" margin="margin">
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Label Templates

### Basic Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" template="#template">
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
<script id="template">
    <div style="background:#f5f5f5; border: 1px solid black; padding: 3px 3px 3px 3px">
        <div>${point.x}</div>
        <div>${point.y}</div>
    </div>
</script>
```

### Rich Template with Icons

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Product" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" template="#template">
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
<script id="template">
    <div style='text-align:center'><img src='/images/${point.x}.png' style='width:20px;height:20px'/><br/><b>${point.y}</b></div>
</script>
```

### Conditional Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" template="#template">
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
<script id="template">
    <div style='background:${point.y > 35 ? '#107C10' : '#E74856'};color:white;padding:3px 8px;border-radius:3px;font-weight:bold'>${point.y}</div>
</script>
```

### Multi-Line Template

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.DetailedData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" template="#template">
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
<script id="template">
    <div style='text-align:center;background:#f8f9fa;padding:5px;border:1px solid #dee2e6;border-radius:3px'><div style='font-weight:bold;color:#0078D4'>${point.y}</div><div style='font-size:10px;color:#666'>${point.text}</div></div>
</script>
```

```csharp
// Controller
ViewBag.DetailedData = new[]
{
    new { Month = "Jan", Sales = 35, text = "Target: 40" },
    new { Month = "Feb", Sales = 42, text = "Target: 40" },
    new { Month = "Mar", Sales = 38, text = "Target: 40" }
};
```

## Label Formatting

### Currency Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.RevenueData" 
                  xName="Month" 
                  yName="Revenue" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" format="c1"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.RevenueData = new[]
{
    new { Month = "Jan", Revenue = 35000 },
    new { Month = "Feb", Revenue = 42000 },
    new { Month = "Mar", Revenue = 38000 }
};
```

### Percentage Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.GrowthData" 
                  xName="Quarter" 
                  yName="Growth" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Line">
            <e-series-marker visible="true" width="10" height="10">
                <e-series-datalabel visible="true" format="p1"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Custom Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Product" 
                  yName="Units" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" format="{value} units"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Decimal Format

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.RatingData" 
                  xName="Product" 
                  yName="Rating" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" format="n2"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Text Mapping

### Map Custom Text

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.MappedData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" name="Label"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.MappedData = new[]
{
    new { Month = "Jan", Sales = 35, Label = "Good" },
    new { Month = "Feb", Sales = 28, Label = "Fair" },
    new { Month = "Mar", Sales = 42, Label = "Excellent" },
    new { Month = "Apr", Sales = 32, Label = "Good" }
};
```

## Smart Label Arrangement

### Auto Smart Labels

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.DenseData" 
                  xName="X" 
                  yName="Y" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" enableRotation="true" angle="-45"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Prevent Label Overlap

```cshtml
<ejs-accumulationchart id="pie-chart" enableSmartLabels="true">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.PieData" 
                              xName="Category" 
                              yName="Value">
            <e-accumulationseries-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Outside">
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Handling Overlapping Data Labels

Use the `labelIntersectAction` property to specify how overlapping data labels are handled.

The following options are available:

- `None`: Displays all data labels without changing their positions, even when they overlap.
- `Hide`: Hides data labels that overlap.
- `Rotate90`: Rotates overlapping data labels by 90 degrees.
- `RelocateVertically`: Relocates overlapping data labels vertically.
- `RelocateHorizontally`: Relocates overlapping data labels horizontally.

The `RelocateVertically` and `RelocateHorizontally` options enable the Smart Data Label feature and are supported only for the following series types:

- `StackingColumn`
- `StackingColumn100`
- `StackingBar`
- `StackingBar100`

These options improve readability by relocating overlapping data labels and connecting them to their corresponding data points using connector lines.

Use the `smartLabelSettings` property to customize the appearance and position of relocated data labels. The following settings are available:

- `background`: Specifies the background color of the relocated data label.
- `pointerShape`: Specifies the pointer shape of the relocated data label.
- `border`: Customizes the color, width, and dash array of the relocated data label border.
- `connectorLineStyle`: Customizes the color and width of the connector line.
- `offset`: Specifies the distance by which the data label is relocated. This property is applicable only when `labelIntersectAction` is set to `RelocateVertically`.

The following example demonstrates how to relocate overlapping data labels vertically in a stacking column chart:

```cshtml
@{
    var marker = new
    {
        dataLabel = new
        {
            visible = true,
            position = "Middle",
            format = "Value: {value}",
            font = new
            {
                size = "14px"
            },
            labelIntersectAction = "RelocateVertically",
            smartLabelSettings = new
            {
                background = "#ffffff",
                pointerShape = "Arrow",
                border = new
                {
                    color = "#808080",
                    width = 1,
                    dashArray = "2,2"
                },
                connectorLineStyle = new
                {
                    color = "#808080",
                    width = 1
                },
                offset = 10
            }
        }
    };
}
<ejs-chart id="container" title="Quarterly Sales" height="260px">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category" title="Quarter"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis title="Sales" minimum="0" maximum="8" interval="1"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="@ViewBag.ChartData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn" xName="Quarter" yName="ProductA" name="Product A" marker="marker"></e-series>
        <e-series dataSource="@ViewBag.ChartData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn" xName="Quarter" yName="ProductB" name="Product B" marker="marker"></e-series>
        <e-series dataSource="@ViewBag.ChartData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn" xName="Quarter" yName="ProductC" name="Product C" marker="marker"></e-series>
        <e-series dataSource="@ViewBag.ChartData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn" xName="Quarter" yName="ProductD" name="Product D" marker="marker"></e-series>
        <e-series dataSource="@ViewBag.ChartData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn" xName="Quarter" yName="ProductE" name="Product E" marker="marker"></e-series>
        <e-series dataSource="@ViewBag.ChartData" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn" xName="Quarter" yName="ProductF" name="Product F" marker="marker"></e-series>
    </e-series-collection>
</ejs-chart>
```

Use the following controller data:

```csharp
public IActionResult Index()
{
    List<ChartData> chartData = new List<ChartData>
    {
        new ChartData { Quarter = "Q1", ProductA = 1.1, ProductB = 1.2, ProductC = 1.1, ProductD = 1.2, ProductE = 1.1, ProductF = 1.2 },
        new ChartData { Quarter = "Q2", ProductA = 1.2, ProductB = 1.1, ProductC = 1.2, ProductD = 1.1, ProductE = 1.2, ProductF = 1.1 },
        new ChartData { Quarter = "Q3", ProductA = 1.1, ProductB = 1.1, ProductC = 1.2, ProductD = 1.2, ProductE = 1.1, ProductF = 1.2 },
        new ChartData { Quarter = "Q4", ProductA = 1.2, ProductB = 1.2, ProductC = 1.1, ProductD = 1.1, ProductE = 1.2, ProductF = 1.1 }
    };
    ViewBag.ChartData = chartData;
    return View();
}

public class ChartData
{
    public string Quarter { get; set; }
    public double ProductA { get; set; }
    public double ProductB { get; set; }
    public double ProductC { get; set; }
    public double ProductD { get; set; }
    public double ProductE { get; set; }
    public double ProductF { get; set; }
}
```

To relocate overlapping data labels horizontally, set `labelIntersectAction` to `RelocateHorizontally`. The `offset` property is not required for horizontal relocation.

```cshtml
@{
    var horizontalMarker = new
    {
        dataLabel = new
        {
            visible = true,
            position = "Middle",
            labelIntersectAction = "RelocateHorizontally",
            smartLabelSettings = new
            {
                background = "#ffffff",
                pointerShape = "Arrow",
                border = new
                {
                    color = "#808080",
                    width = 1,
                    dashArray = "2,2"
                },
                connectorLineStyle = new
                {
                    color = "#808080",
                    width = 1
                }
            }
        }
    };
}
```

> **Note:** Smart data labels are supported only for the `StackingColumn`, `StackingColumn100`, `StackingBar`, and `StackingBar100` series. The `offset` property is applicable only when `labelIntersectAction` is set to `RelocateVertically`.

### Stack Labels and Zero-Value Stacks

Bind `stackLabels` on `<ejs-chart>`. Point data labels render individual segment values; `stackLabels` renders aggregate totals.

```cshtml
@{
    var stackLabels = new
    {
        visible = true,
        format = "{value}",
        position = "Top",
        alignment = "Center",
        fill = "#FFFFFF",
        border = new { color = "#64748B", width = 1 },
        font = new { color = "#0F172A", size = "12px", fontWeight = "600" },
        margin = new { left = 5, right = 5, top = 3, bottom = 3 }
    };
}
<ejs-chart id="stackLabelChart" stackLabels="stackLabels" textRender="stackLabelTextRender">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis minimum="-20" maximum="80" interval="20"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.Hardware" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn"
                  xName="Quarter" yName="Value" name="Hardware"></e-series>
        <e-series dataSource="ViewBag.Software" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn"
                  xName="Quarter" yName="Value" name="Software"></e-series>
    </e-series-collection>
</ejs-chart>
<script>
    function stackLabelTextRender(args) {
        if (args.text === '0') { args.text = 'No total'; }
    }
</script>
```

Positive and negative stacks use their resolved aggregate positions. Zero totals render at the value-axis baseline, including positive and negative values that cancel. Null and undefined values must not produce an invalid total.

```csharp
using Microsoft.AspNetCore.Mvc;

public class ChartController : Controller
{
    public IActionResult StackLabels()
    {
        ViewBag.Hardware = new[]
        {
            new { Quarter = "Q1", Value = (double?)30 },
            new { Quarter = "Q2", Value = (double?)0 },
            new { Quarter = "Q3", Value = (double?)null },
            new { Quarter = "Q4", Value = (double?)10 }
        };
        ViewBag.Software = new[]
        {
            new { Quarter = "Q1", Value = (double?)22 },
            new { Quarter = "Q2", Value = (double?)0 },
            new { Quarter = "Q3", Value = (double?)null },
            new { Quarter = "Q4", Value = (double?)-10 }
        };
        return View();
    }
}
```


`stackLabels` is a Chart-level configuration that displays the total for each visible stack. It differs from `marker.dataLabel`, which displays individual segment values. A stack that resolves to zero now renders a stack label at the value-axis baseline. This includes all-zero stacks, null or undefined values normalized to zero, and positive and negative values that cancel to zero.

```cshtml
@{
    var stackLabels = new
    {
        visible = true,
        format = "{value}",
        font = new { color = "#111827", size = "12px", fontWeight = "600" },
        fill = "#FFFFFF",
        border = new { color = "#6B7280", width = 1 },
        margin = new { left = 5, right = 5, top = 3, bottom = 3 }
    };
}
<ejs-chart id="stackLabelChart" title="Stack Totals and Zero-Value Labels" stackLabels="stackLabels">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-chart-primaryyaxis minimum="-20" maximum="80" interval="20"></e-chart-primaryyaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.Hardware" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn"
                  xName="Quarter" yName="Value" name="Hardware" stackingGroup="Sales"></e-series>
        <e-series dataSource="ViewBag.Software" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn"
                  xName="Quarter" yName="Value" name="Software" stackingGroup="Sales"></e-series>
        <e-series dataSource="ViewBag.Services" type="@Syncfusion.EJ2.Charts.ChartSeriesType.StackingColumn"
                  xName="Quarter" yName="Value" name="Services" stackingGroup="Sales"></e-series>
    </e-series-collection>
</ejs-chart>
```

```csharp
// Controller
ViewBag.Hardware = new[]
{
    new { Quarter = "Q1", Value = (double?)30 }, new { Quarter = "Q2", Value = (double?)0 },
    new { Quarter = "Q3", Value = (double?)null }, new { Quarter = "Q4", Value = (double?)18 },
    new { Quarter = "Q5", Value = (double?)10 }
};
ViewBag.Software = new[]
{
    new { Quarter = "Q1", Value = (double?)22 }, new { Quarter = "Q2", Value = (double?)0 },
    new { Quarter = "Q3", Value = (double?)null }, new { Quarter = "Q4", Value = (double?)15 },
    new { Quarter = "Q5", Value = (double?)-10 }
};
ViewBag.Services = new[]
{
    new { Quarter = "Q1", Value = (double?)18 }, new { Quarter = "Q2", Value = (double?)0 },
    new { Quarter = "Q3", Value = (double?)0 }, new { Quarter = "Q4", Value = (double?)12 },
    new { Quarter = "Q5", Value = (double?)0 }
};
```

## Label Customization

### Font Customization

```cshtml
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true">
                    <e-font fontFamily="Arial" size="14px" fontWeight="600" color="#0078D4"></e-font>
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Background and Border

```cshtml
@{
    var border = new { width = 2, color = "red" };
    var margin = new { left = 15, right = 15, bottom = 15, top = 15 };
 }
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Category" 
                  yName="Value" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" fill="#FFE5B4" border="border" margin="margin"></e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

### Rounded Corners

```cshtml
@{
    var margin = new { left = 15, right = 15, bottom = 15, top = 15 };
 }
<ejs-chart id="chart">
    <e-chart-primaryxaxis valueType="@Syncfusion.EJ2.Charts.ValueType.Category"></e-chart-primaryxaxis>
    <e-series-collection>
        <e-series dataSource="ViewBag.ChartData" 
                  xName="Month" 
                  yName="Sales" 
                  type="@Syncfusion.EJ2.Charts.ChartSeriesType.Column">
            <e-series-marker>
                <e-series-datalabel visible="true" fill="#0078D4" rx="5" ry="5" margin="margin">
                    <e-font color="#ffffff" fontWeight="600"></e-font>
                </e-series-datalabel>
            </e-series-marker>
        </e-series>
    </e-series-collection>
</ejs-chart>
```

## Connector Lines

### Basic Connectors

```cshtml
<ejs-accumulationchart id="pie-chart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.PieData" 
                              xName="Category" 
                              yName="Value">
            <e-accumulationseries-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Outside">
                <e-connectorstyle type="@Syncfusion.EJ2.Charts.ConnectorType.Curve" length="20px"></e-connectorstyle>
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Styled Connectors

```cshtml
<ejs-accumulationchart id="pie-chart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.PieData" 
                              xName="Category" 
                              yName="Value">
            <e-accumulationseries-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Outside">
                <e-connectorstyle type="@Syncfusion.EJ2.Charts.ConnectorType.Line" length="20px" width="2" color="#0078D4" dashArray="5,3"></e-connectorstyle>
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

### Curved Connectors

```cshtml
<ejs-accumulationchart id="pie-chart">
    <e-accumulation-series-collection>
        <e-accumulation-series dataSource="ViewBag.PieData" 
                              xName="Category" 
                              yName="Value">
            <e-accumulationseries-datalabel visible="true" position="@Syncfusion.EJ2.Charts.LabelPosition.Outside">
                <e-connector type="@Syncfusion.EJ2.Charts.ConnectorType.Curve" length="20px" width="1.5" color="#666"></e-connector>
            </e-accumulationseries-datalabel>
        </e-accumulation-series>
    </e-accumulation-series-collection>
</ejs-accumulationchart>
```

## When to Use

**Basic Data Labels**: Use to display exact values on chart points when precision is more important than visual estimation.

**Label Positioning**: Use appropriate positions based on chart type and data density - Top for positive values, Middle for better visibility in columns.

**Label Templates**: Use when you need rich formatting, icons, images, or complex HTML layouts beyond simple text labels.

**Label Formatting**: Use to format numbers, currency, percentages, or dates according to locale and business requirements.

**Text Mapping**: Use to display custom descriptive text instead of raw numeric values for better context and readability.

**Smart Arrangement**: Use when dealing with many data points or overlapping labels to automatically adjust label positions and prevent collisions.

**Customization**: Use to match brand guidelines, create visual hierarchy, or highlight important data points with colors and borders.

**Connector Lines**: Use in pie/doughnut charts when labels are positioned outside to clearly connect labels to their respective segments.

Choose data label configuration based on data density, chart type, readability requirements, and the level of detail your audience needs.
