# API Reference

Complete API documentation for Syncfusion Sparkline component.

## Table of Contents
- [Component Properties](#component-properties)
  - [Core Properties](#core-properties)
  - [Size Properties](#size-properties)
  - [Theme and Appearance](#theme-and-appearance)
- [Data Binding Properties](#data-binding-properties)
  - [Data Source Configuration](#data-source-configuration)
- [Series and Appearance Properties](#series-and-appearance-properties)
  - [Line Series Properties](#line-series-properties)
  - [Fill and Color Properties](#fill-and-color-properties)
  - [Value Range Properties](#value-range-properties)
- [Marker Properties](#marker-properties)
  - [Marker Configuration](#marker-configuration)
  - [Special Point Markers](#special-point-markers)
- [Range Band Properties](#range-band-properties)
  - [Range Band Configuration](#range-band-configuration)
  - [Multiple Range Bands](#multiple-range-bands)
- [Data Label Properties](#data-label-properties)
  - [Data Label Configuration](#data-label-configuration)
  - [Label Styling](#label-styling)
  - [Label Offset](#label-offset)
- [Tooltip Properties](#tooltip-properties)
  - [Tooltip Configuration](#tooltip-configuration)
  - [Tooltip Styling](#tooltip-styling)
  - [Tooltip Template](#tooltip-template)
- [Track Line Properties](#track-line-properties)
  - [Track Line Configuration](#track-line-configuration)
  - [Track Line Use Cases](#track-line-use-cases)
- [Container Properties](#container-properties)
  - [Container Area Configuration](#container-area-configuration)
  - [Border Configuration](#border-configuration)
  - [Padding Configuration](#padding-configuration)
- [Events](#events)
  - [Lifecycle Events](#lifecycle-events)
  - [Interaction Events](#interaction-events)
  - [Event Usage Example](#event-usage-example)
- [Methods](#methods)
  - [Sparkline Methods](#sparkline-methods)
  - [Method Usage Examples](#method-usage-examples)
- [Enumerations](#enumerations)
  - [SparklineType](#sparklinetype)
  - [SparklineValueType](#sparklinevaluetype)
  - [SparklineTheme](#sparklinetheme)
- [Complete Examples](#complete-examples)
  - [Line Sparkline Example](#line-sparkline-example)
  - [Column Sparkline with Range Band](#column-sparkline-with-range-band)
  - [Area Sparkline with Data Labels](#area-sparkline-with-data-labels)
  - [Pie Sparkline](#pie-sparkline)
  - [Win-Loss Sparkline](#win-loss-sparkline)
- [Related Topics](#related-topics)

---

## Component Properties

### Core Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **DataSource** | object | null | Array of data objects for the sparkline | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_DataSource) |
| **XName** | string | null | Name of the X-axis data property | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_XName) |
| **YName** | string | null | Name of the Y-axis data property | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_YName) |
| **Width** | string | null | Width of sparkline (px, %, or auto) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Width) |
| **Height** | string | null | Height of sparkline (px or %) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Height) |
| **Type** | [SparklineType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineType.html) | Line | Type of sparkline visualization (Line, Column, Area, Pie, WinLoss) |  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Type) |

### Size Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **ContainerArea** | [SparklineContainerArea](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineContainerArea.html) | null | Container area configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_ContainerArea) |
| **Padding** | [SparklinePadding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklinePadding.html) | null | Padding around sparkline content | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Padding) |

### Theme and Appearance

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **Theme** | [SparklineTheme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineTheme.html) | Material | Theme (Material, Fabric, Bootstrap, Bootstrap4, Highcontrast) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Theme) |
| **Locale** | string | "" | Locale for formatting and display | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Locale) |
| **EnableRtl** | bool | false | Enable right-to-left rendering | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_EnableRtl) |

---

## Data Binding Properties

### Data Source Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **DataSource** | Object | null | List of data objects | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_DataSource) |
| **Query** | string | null | Query string for remote data binding | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Query) |
| **XName** | string | null | Data field for X-axis values | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_XName) |
| **YName** | string | null | Data field for Y-axis values | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_YName) |
| **ValueType** | [SparklineValueType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineValueType.html) | Numeric | Data type for values (Numeric, Category, DateTime) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_ValueType) |

---

## Series and Appearance Properties

### Line Series Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **LineWidth** | double | 1 | Width of line in line type sparklines | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_LineWidth) |
| **DashArray** | string | "" | Dash pattern for line (e.g., "5,5") | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineLineSettings.html#Syncfusion_EJ2_Charts_SparklineLineSettings_DashArray) |

### Fill and Color Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **Fill** | string | "#00bdae" | Color of sparkline series | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Fill) |
| **Opacity** | double | 1 | Opacity of sparkline (0-1) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Opacity) |
| **NegativePointColor** | string | "" | Color for negative values | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_NegativePointColor) |

### Value Range Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Min** | double | null | Minimum Y-axis value |
| **Max** | double | null | Maximum Y-axis value |
| **MaxPointRadius** | double | 1 | Maximum radius for data points |
| **MinPointRadius** | double | 1 | Minimum radius for data points |

---

## Marker Properties

### Marker Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **MarkerSettings** | [SparklineSparklineMarkerSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html) | null | Marker configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_MarkerSettings) |
| **Visible** | object | null | Visible markers (All, Start, End, High, Low, Negative) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html#Syncfusion_EJ2_Charts_SparklineSparklineMarkerSettings_Visible) |
| **Size** | double | 8 | Size of marker in pixels | | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html#Syncfusion_EJ2_Charts_SparklineSparklineMarkerSettings_Size) |
| **Border** | [SparklineSparklineBorder](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineBorder.html) | null | Border configuration for markers | | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html#Syncfusion_EJ2_Charts_SparklineSparklineMarkerSettings_Border) |
| **Border.Color** | string | null | Marker border color | | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineBorder.html#Syncfusion_EJ2_Charts_SparklineSparklineBorder_Color) |
| **Border.Width** | double | null | Marker border width | | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineBorder.html#Syncfusion_EJ2_Charts_SparklineSparklineBorder_Width) |
| **Fill** | string | "#00bdae" | Marker fill color | | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html#Syncfusion_EJ2_Charts_SparklineSparklineMarkerSettings_Fill) |
| **Opacity** | double | 1 | Marker opacity (0-1) | | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html#Syncfusion_EJ2_Charts_SparklineSparklineMarkerSettings_Opacity) |

### Special Point Markers

| Marker Type | Description | Use Case |
|-------------|-------------|----------|
| **All** | Display marker for all data points | Highlighting every value |
| **Start** | Marker on first data point | Identifying start of series |
| **End** | Marker on last data point | Identifying end of series |
| **High** | Marker on highest value | Showing peak performance |
| **Low** | Marker on lowest value | Identifying minimum point |
| **Negative** | Marker on negative values | Highlighting losses or negative trends |

---

## Range Band Properties

### Range Band Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| **RangeBandSettings** | List<[SparklineRangeBandSetting](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineRangeBandSetting.html)> | null | Collection of range bands | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_RangeBandSettings) |
| **StartRange** | double | null | Start value for the range band | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineRangeBandSetting.html#Syncfusion_EJ2_Charts_SparklineRangeBandSetting_StartRange) |
| **EndRange** | double | null | End value for the range band | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineRangeBandSetting.html#Syncfusion_EJ2_Charts_SparklineRangeBandSetting_EndRange) |
| **Color** | string | null | Fill color of range band | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineRangeBandSetting.html#Syncfusion_EJ2_Charts_SparklineRangeBandSetting_Color) |
| **Opacity** | double | 1 | Opacity of range band (0-1) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineRangeBandSetting.html#Syncfusion_EJ2_Charts_SparklineRangeBandSetting_Opacity) |

### Multiple Range Bands

You can define multiple range bands to highlight different regions:

```csharp
rangeBandSettings: [
    { StartRange: 0, EndRange: 2, Color: "red", Opacity: 0.3 },    // Low range
    { StartRange: 2, EndRange: 4, Color: "yellow", Opacity: 0.3 },  // Medium range
    { StartRange: 4, EndRange: 6, Color: "green", Opacity: 0.3 }    // High range
]
```

---

## Data Label Properties

### Data Label Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **DataLabelSettings** | [SparklineSparklineDataLabelSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineDataLabelSettings.html) | null | Data label configuration |
| **Visible** | object | null | Visible labels (All, Start, End, High, Low, Negative) |
| **Format** | string | "" | Format string for labels (e.g., "{value}%") |
| **EdgeLabelMode** | EdgeLabelMode | None | Placement for edge labels |
| **Border** | [SparklineSparklineBorder](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineBorder.html) | null | To configure Sparkline dataLabel border color and width |
| **Opacity** | double | 1 | To configure the dataLabel opacity |
| **Offset** | [SparklineLabelOffset](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineLabelOffset.html) | null | To configure Sparkline dataLabel offset |

### Label Styling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Fill** | string | "transparent" | Label background fill color |
| **TextStyle** | [SparklineSparklineFont](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineFont.html) | null | Label text style configuration |
| **TextStyle.Size** | string | null | Font size for labels |
| **TextStyle.FontFamily** | string | null | Font family for labels |
| **TextStyle.Color** | string | null | Text color |
| **TextStyle.FontWeight** | string | null | Font weight (400-700) |
| **TextStyle.Opacity** | double | 1 | Text opacity |

### Label Offset

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Offset** | [SparklineLabelOffset](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineLabelOffset.html) | null | Label offset configuration |
| **Offset.X** | double | null | Horizontal offset in pixels |
| **Offset.Y** | double | null | Vertical offset in pixels |

---

## Tooltip Properties

### Tooltip Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **TooltipSettings** | [SparklineSparklineTooltipSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineTooltipSettings.html) | null | Tooltip configuration |
| **Visible** | bool | false | Enable/disable tooltips |
| **Format** | string | null | Tooltip content format |
| **Fill** | string | null | Tooltip background color |
| **TrackLineSettings** | [SparklineTrackLineSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineTrackLineSettings.html) | null | To configure the tracker line options |

### Tooltip Styling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Border** | [SparklineSparklineBorder](SparklineSparklineBorder) | null | Tooltip border configuration |
| **TextStyle** | [SparklineSparklineFont](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineFont.html) | null | Tooltip text styling |
| **TextStyle.Size** | string | null | Font size |
| **TextStyle.Color** | string | null | Text color |
| **TextStyle.FontFamily** | string | null | Font family |

### Tooltip Template

```cshtml
.TooltipSettings(ts => ts
        .Visible(true)
        .Format("Date: ${xval}, Revenue: $${yval}K")
)
```

---

## Track Line Properties

### Track Line Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **TrackLineSettings** | [SparklineTrackLineSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineTrackLineSettings.html) | null | Track line configuration |
| **Visible** | bool | false | Enable/disable track line |
| **Color** | string | null | Color of track line |
| **Width** | double | 1 | Width of track line in pixels |

### Track Line Use Cases

- **Real-time monitoring**: Display current value as user moves cursor
- **Data point inspection**: Quickly identify exact values at specific points
- **Comparative analysis**: Align cursor across multiple sparklines

---

## Container Properties

### Container Area Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **ContainerArea** | [SparklineContainerArea](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineContainerArea.html) | null | Container configuration |
| **Background** | string | "transparent" | Container background color |
| **Border** | Object | null | Border configuration |

### Border Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Border** | [SparklineSparklineBorder](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineSparklineBorder.html) | null | Border |
| **Color** | string | null | Border color |
| **Width** | double | null | Border width in pixels |

### Padding Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Padding** | [SparklinePadding](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklinePadding.html) | null | Internal padding |
| **Left** | double | 5 | Left padding in pixels |
| **Right** | double | 5 | Right padding in pixels |
| **Top** | double | 5 | Top padding in pixels |
| **Bottom** | double | 5 | Bottom padding in pixels |

---

## Events

### Lifecycle Events

| Event | Description | Parameters | API Link |
|-------|-------------|-----------|-----------|
| **Load** | Fires before sparkline initializes | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Load) |
| **Loaded** | Fires after sparkline renders | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Loaded) |
| **Resize** | Fires when sparkline is resized | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Resize) |

### Interaction Events

| Event | Description | Parameters | API Link |
|-------|-------------|------------|----------|
| **PointRendering** | Fires before each point renders | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_PointRendering) |
| **SeriesRendering** | Fires before series renders | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_SeriesRendering) |
| **TooltipInitialize** | Fires before tooltip initializes | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_TooltipInitialize) |
| **PointRegionMouseMove** | Fires on mouse movement over sparkline | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_PointRegionMouseMove) |
| **PointRegionMouseClick** | Triggers while mouse click on the sparkline point region | sparklineInstance, args | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_PointRegionMouseClick) |

### Event Usage Example

```cshtml
// View
@Html.EJS().Sparkline("sparkline")
    .Load("onLoad")
    .Loaded("onLoaded")
    .TooltipInitialize("onTooltipInit")
    .Render();

// JavaScript handlers
<script>
function onLoad(args) {
    console.log("Sparkline loading", args);
}

function onLoaded(args) {
    console.log("Sparkline loaded successfully", args);
}

function onTooltipInit(args) {
    console.log("Tooltip initializing", args);
}
</script>
```

---

## Methods

### Sparkline Methods

Public methods available on the Sparkline component instance:

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| **refresh** | - | void | Redraw sparkline with updated data |
| **destroy** | - | void | Clean up and remove sparkline instance |
| **print** | - | void | Print the sparkline |
| **export** | type, fileName, orientation | void | Export sparkline (PNG/JPG/PDF/SVG) |

### Method Usage Examples

```javascript
// Get sparkline instance
var sparkline = document.getElementById("sparkline").ej2_instances[0];

// Refresh sparkline
sparkline.refresh();

// Print sparkline
sparkline.print();

// Export as PNG
sparkline.export("PNG", "sparkline");

// Export as PDF
sparkline.export("PDF", "sparkline", "Portrait");

// Export as SVG
sparkline.export("SVG", "sparkline");

// Destroy sparkline
sparkline.destroy();
```

---

## Enumerations

### [SparklineType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineType.html)

Defines visualization types for sparklines:

```csharp
public enum SparklineType
{
    Line,       // Line chart - shows trends with connected points
    Column,     // Column chart - shows discrete values as vertical bars
    Area,       // Area chart - filled area under line
    Pie,        // Pie chart - proportional segments for composition
    WinLoss     // Win-Loss chart - binary positive/negative values
}
```

**Reference**: [SparklineType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineType.html)

### [SparklineValueType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineValueType.html)

Defines data types for sparkline values:

```csharp
public enum SparklineValueType
{
    Numeric,    // Numeric values
    DateTime,   // DateTime values
    Category    // Category/string values
}
```

**Reference**: [SparklineValueType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineValueType.html)

### [SparklineTheme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineTheme.html)

Defines visual themes for sparklines:

```csharp
public enum SparklineTheme
{
    Material,       // Material Design theme (default)
    Fabric,         // Fabric Design theme
    Bootstrap,      // Bootstrap theme
    Bootstrap4,     // Bootstrap 4 theme
    Highcontrast    // High contrast theme for accessibility
}
```

**Reference**: [SparklineTheme Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SparklineTheme.html)

---

## Complete Examples

### Line Sparkline Example

```csharp
// Controller
public class HomeController : Controller
{
    public ActionResult Index()
    {
        List<SparkData> data = new List<SparkData>
        {
            new SparkData { Month = "Jan", Sales = 2000 },
            new SparkData { Month = "Feb", Sales = 2500 },
            new SparkData { Month = "Mar", Sales = 2200 },
            new SparkData { Month = "Apr", Sales = 3000 }
        };
        return View(data);
    }
}

public class SparkData
{
    public string Month { get; set; }
    public int Sales { get; set; }
}
```

```cshtml
<!-- View -->
@Html.EJS().Sparkline("lineSparkline")
    .DataSource(Model)
    .XName("Month")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .Width("150")
    .Height("50")
    .LineWidth(2)
    .MarkerSettings(m => m.Visible("All"))
    .TooltipSettings(t => t.Visible(true).Format("${yval}"))
    .Render()
```

### Column Sparkline with Range Band

```cshtml
@Html.EJS().Sparkline("columnSparkline")
    .DataSource(Model)
    .XName("Month")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Width("120")
    .Height("50")
    .RangeBandSettings(rb =>
    {
        rb.Add(new Syncfusion.EJ2.Charts.SparklineRangeBandSetting 
        { 
            StartRange = 1000, 
            EndRange = 3000, 
            Color = "green", 
            Opacity = 0.3 
        });
    })
    .Render()
```

### Area Sparkline with Data Labels

```cshtml
@Html.EJS().Sparkline("areaSparkline")
    .DataSource(Model)
    .XName("Month")
    .YName("Sales")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    .Width("120")
    .Height("50")
    .Fill("blue")
    .Opacity(0.6)
    .DataLabelSettings(d => d.Visible(new string[] { "High", "Low" }))
    .Render()
```

### Pie Sparkline

```cshtml
@Html.EJS().Sparkline("pieSparkline")
    .DataSource(Model)
    .XName("Category")
    .YName("Value")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Pie)
    .Width("100")
    .Height("100")
    .TooltipSettings(t => t.Visible(true).Format("${xval}: ${yval}%"))
    .Render()
```

### Win-Loss Sparkline

```cshtml
@Html.EJS().Sparkline("winlossSparkline")
    .DataSource(Model)
    .XName("Day")
    .YName("Result")
    .Type(Syncfusion.EJ2.Charts.SparklineType.WinLoss)
    .Width("120")
    .Height("30")
    .Render()
```

---

## Related Topics

- [Getting Started](getting-started.md)
- [Sparkline Types](sparkline-types.md)
- [Markers Configuration](markers-configuration.md)
- [Range Bands](range-bands.md)
- [Data Labels](data-labels.md)
- [Appearance Customization](appearance-customization.md)
- [User Interaction](user-interaction.md)
- [Localization & Accessibility](localization-accessibility-sizing.md)
- [EJ1 Migration](ej1-migration.md)
