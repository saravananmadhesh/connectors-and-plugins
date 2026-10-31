# Syncfusion EJ2 Sparkline - Complete API Reference

**Component:** Syncfusion Sparkline for ASP.NET Core  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Version:** 27.1.48+  
**Official Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html

---

## Table of Contents

- [Sparkline Class API](#sparkline-class-api)
  - [Constructor](#constructor)
  - [Properties (40+ Total)](#properties-40-total)
    - [Container & Display Properties](#container--display-properties)
    - [Data & Binding Properties](#data--binding-properties)
    - [Series Configuration Properties](#series-configuration-properties)
    - [Color & Styling Properties](#color--styling-properties)
    - [Marker & Point Properties](#marker--point-properties)
    - [Tooltip & Interaction Properties](#tooltip--interaction-properties)
    - [Data Label Properties](#data-label-properties)
    - [Axis Properties](#axis-properties)
    - [Localization & Accessibility](#localization--accessibility)
- [Configuration Classes](#configuration-classes)
  - [SparklineAxisSettings](#sparklineaxissettings)
  - [SparklineContainerArea](#sparklinecontainerarea)
  - [SparklinePadding](#sparklinepadding)
  - [SparklineSparklineBorder](#sparklinesparklineborder)
  - [SparklineSparklineMarkerSettings](#sparklinesparklinemarkersettings)
  - [SparklineSparklineDataLabelSettings](#sparklinesparklinedatalabelsettings)
  - [SparklineSparklineTooltipSettings](#sparklinesparklinetooltipsettings)
  - [SparklineRangeBandSetting](#sparklinerangebandsetting)
  - [SparklineTrackLineSettings](#sparklinetracklines)
- [Events Reference](#events-reference)
  - [Rendering Lifecycle Events](#rendering-lifecycle-events)
  - [User Interaction Events](#user-interaction-events)
  - [Data Rendering Events](#data-rendering-events)
- [Enumerations](#enumerations)
  - [SparklineType](#sparklinetype)
  - [SparklineValueType](#sparklinevaluetype)
  - [SparklineTheme](#sparklinetheme)
  - [SparklineRangePadding](#sparklinerangepadding)
- [Related Classes and Namespaces](#related-classes-and-namespaces)
  - [Supporting Classes](#supporting-classes)
  - [Font & Styling Classes](#font--styling-classes)
  - [Built-in Themes & Palettes](#built-in-themes--palettes)
- [Usage Patterns](#usage-patterns)
  - [Basic Line Sparkline](#basic-line-sparkline)
  - [Column Sparkline with Markers](#column-sparkline-with-markers)
  - [Win-Loss Sparkline](#win-loss-sparkline)
  - [Pie Sparkline](#pie-sparkline)
  - [Sparkline with Tooltips](#sparkline-with-tooltips)
- [Namespace Information](#namespace-information)
- [Additional Resources](#additional-resources)

---

## Sparkline Class API

**Primary component class for rendering compact data visualizations with minimal space consumption.**

**Namespace:** `Syncfusion.EJ2.Charts`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html)**

### Constructor

```csharp
public Sparkline()
```

### Properties (40+ Total)

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Width | string | null | Width of sparkline container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Width) |
| Height | string | null | Height of sparkline container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Height) |
| HtmlAttributes | object | null | Custom HTML attributes (title, data-*, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_HtmlAttributes) |
| ContainerArea | SparklineContainerArea | null | Container area background and border settings | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_ContainerArea) |
| Padding | SparklinePadding | null | Padding around sparkline area | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Padding) |

#### Data & Binding Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| DataSource | object | null | Data source for sparkline series | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_DataSource) |
| XName | string | null | Data property name for X-axis values | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_XName) |
| YName | string | null | Data property name for Y-axis values | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_YName) |
| Query | string | null | Query for filtering the data | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Query) |
| ValueType | SparklineValueType | Numeric | Data value type (Numeric, Category, DateTime) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_ValueType) |

#### Series Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Type | SparklineType | Line | Sparkline chart type (Line, Column, Area, Win-Loss, Pie) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Type) |
| Fill | string | "#00bdae" | Series fill color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Fill) |
| Opacity | double | 1 | Series opacity (0-1) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Opacity) |
| LineWidth | double | 1 | Line width for line type sparkline | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_LineWidth) |
| Palette | string[] | null | Color palette for column/pie series | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Palette) |
| RangePadding | SparklineRangePadding | None | Range padding for axis | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_RangePadding) |
| RangeBandSettings | List<SparklineRangeBandSetting> | null | Range band configurations | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_RangeBandSettings) |

#### Color & Styling Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| HighPointColor | string | "" | Color for highest Y-value point | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_HighPointColor) |
| LowPointColor | string | "" | Color for lowest Y-value point | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_LowPointColor) |
| StartPointColor | string | "" | Color for first X-value point | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_StartPointColor) |
| EndPointColor | string | "" | Color for last X-value point | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_EndPointColor) |
| NegativePointColor | string | "" | Color for negative Y-value points | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_NegativePointColor) |
| TiePointColor | string | "" | Color for tie points in win-loss sparkline | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_TiePointColor) |
| Border | SparklineSparklineBorder | null | Border configuration for sparkline | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Border) |
| Theme | SparklineTheme | Material | Color theme (Material, Fabric, Bootstrap, HighContrast) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Theme) |

#### Marker & Point Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| MarkerSettings | SparklineSparklineMarkerSettings | null | Marker configuration and visibility | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_MarkerSettings) |

#### Tooltip & Interaction Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| TooltipSettings | SparklineSparklineTooltipSettings | null | Tooltip configuration and behavior | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_TooltipSettings) |

#### Data Label Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| DataLabelSettings | SparklineSparklineDataLabelSettings | null | Data label configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_DataLabelSettings) |

#### Axis Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| AxisSettings | SparklineAxisSettings | null | Axis configuration (min/max values) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_AxisSettings) |

#### Localization & Accessibility

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Locale | string | "" | Language locale code for internationalization | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Locale) |
| Format | string | null | Format string for data formatting | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Format) |
| EnableRtl | bool | false | Enable right-to-left rendering for RTL languages | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_EnableRtl) |
| EnablePersistence | bool | false | Persist component state across page reloads | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_EnablePersistence) |
| UseGroupingSeparator | bool | false | Enable thousands separator in formatted numbers | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_UseGroupingSeparator) |

---

## Configuration Classes

### SparklineAxisSettings

Controls the axis ranges and configuration for sparkline.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineAxisSettings.html)**

```csharp
public class SparklineAxisSettings
{
    public double? MinX { get; set; }                // Minimum X-axis value
    public double? MaxX { get; set; }                // Maximum X-axis value
    public double? MinY { get; set; }                // Minimum Y-axis value
    public double? MaxY { get; set; }                // Maximum Y-axis value
}
```

**Usage:**
```csharp
<e-sparkline-axissettings minY="0" maxY="100"></e-sparkline-axissettings>
```

---

### SparklineContainerArea

Configures the container area background and border.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineContainerArea.html)**

```csharp
public class SparklineContainerArea
{
    public string BackgroundColor { get; set; }      // Container background color
    public SparklineSparklineBorder Border { get; set; } // Border configuration
}
```

---

### SparklinePadding

Sets padding around the sparkline.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklinePadding.html)**

```csharp
public class SparklinePadding
{
    public double Left { get; set; }                 // Left padding (px)
    public double Right { get; set; }                // Right padding (px)
    public double Top { get; set; }                  // Top padding (px)
    public double Bottom { get; set; }               // Bottom padding (px)
}
```

---

### SparklineSparklineBorder

Configures border styling.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineSparklineBorder.html)**

```csharp
public class SparklineSparklineBorder
{
    public string Color { get; set; }                // Border color
    public double Width { get; set; }                // Border width (px)
}
```

---

### SparklineSparklineMarkerSettings

Configures marker display and styling.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineSparklineMarkerSettings.html)**

```csharp
public class SparklineSparklineMarkerSettings
{
    public string Visible { get; set; }              // Visibility (All, Start, End, High, Low, Negative)
    public string Fill { get; set; }                 // Marker fill color
    public double Opacity { get; set; }              // Marker opacity (0-1)
    public SparklineSparklineBorder Border { get; set; } // Border settings
}
```

**Visible Options:**
- `All` - Show markers at all data points
- `Start` - Show marker at first point
- `End` - Show marker at last point
- `High` - Show marker at highest point
- `Low` - Show marker at lowest point
- `Negative` - Show marker at negative points

---

### SparklineSparklineDataLabelSettings

Configures data label display.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineSparklineDataLabelSettings.html)**

```csharp
public class SparklineSparklineDataLabelSettings
{
    public string Visible { get; set; }              // Visibility (All, Start, End, High, Low, Negative)
    public string Fill { get; set; }                 // Background color
    public SparklineSparklineFont TextStyle { get; set; } // Font styling
    public SparklineSparklineBorder Border { get; set; } // Border
    public SparklineLabelOffset Offset { get; set; } // Offset from point
}
```

---

### SparklineSparklineTooltipSettings

Configures tooltip behavior.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineSparklineTooltipSettings.html)**

```csharp
public class SparklineSparklineTooltipSettings
{
    public bool Visible { get; set; }                // Show/hide tooltip
    public string Template { get; set; }             // Tooltip HTML template
    public string Fill { get; set; }                 // Background color
    public SparklineSparklineFont TextStyle { get; set; } // Font styling
    public SparklineSparklineBorder Border { get; set; }          // Border 
}
```

---

### SparklineRangeBandSetting

Defines range band highlighting specific value ranges.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineRangeBandSetting.html)**

```csharp
public class SparklineRangeBandSetting
{
    public double StartRange { get; set; }           // Range start value
    public double EndRange { get; set; }             // Range end value
    public string Color { get; set; }                // Band background color
    public double Opacity { get; set; }              // Opacity (0-1)
}
```

---

### SparklineTrackLineSettings

Configures track line display.

**[Official API Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineTrackLineSettings.html)**

```csharp
public class SparklineTrackLineSettings
{
    public bool Visible { get; set; }                // Show/hide track line
    public string Color { get; set; }            // Track line color
    public double Width { get; set; }            // Track line width (px)
}
```

---

## Events Reference

**All Sparkline events provide event argument objects with context-specific data.**

### Rendering Lifecycle Events

| Event | Handler Signature | Description | API Link |
|-------|-------------------|-------------|----------|
| Load | void(ILoadEventArgs args) | Before sparkline initialization | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Load) |
| Loaded | void(ILoadedEventArgs args) | After sparkline initialization complete | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Loaded) |
| AxisRendering | void(IAxisRenderingEventArgs args) | Before axis renders | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_AxisRendering) |
| SeriesRendering | void(ISeriesRenderingEventArgs args) | Before series renders | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_SeriesRendering) |

### User Interaction Events

| Event | Handler Signature | Description | API Link |
|-------|-------------------|-------------|----------|
| SparklineMouseClick | void(ISparklineMouseClickEventArgs args) | When clicking on sparkline | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_SparklineMouseClick) |
| SparklineMouseMove | void(ISparklineMouseMoveEventArgs args) | When moving mouse over sparkline | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_SparklineMouseMove) |
| PointRegionMouseClick | void(IPointRegionMouseClickEventArgs args) | When clicking point region | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_PointRegionMouseClick) |
| PointRegionMouseMove | void(IPointRegionMouseMoveEventArgs args) | When moving mouse over point region | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_PointRegionMouseMove) |

### Data Rendering Events

| Event | Handler Signature | Description | API Link |
|-------|-------------------|-------------|----------|
| PointRendering | void(IPointRenderingEventArgs args) | Before point element renders | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_PointRendering) |
| MarkerRendering | void(IMarkerRenderingEventArgs args) | Before marker renders | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_MarkerRendering) |
| DataLabelRendering | void(IDataLabelRenderingEventArgs args) | Before data label renders | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_DataLabelRendering) |
| TooltipInitialize | void(ITooltipInitializeEventArgs args) | Before tooltip initializes | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_TooltipInitialize) |
| Resize | void(IResizeEventArgs args) | When sparkline container resizes | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html#Syncfusion_EJ2_Charts_Sparkline_Resize) |

---

## Enumerations

### SparklineType

Specifies the sparkline chart type.

```csharp
public enum SparklineType
{
    Line,       // Line sparkline (default)
    Column,     // Column/Bar sparkline
    Area,       // Area sparkline
    WinLoss,    // Win/Loss sparkline
    Pie         // Pie sparkline
}
```

**Usage:**
```csharp
type="Line"    // or Column, Area, WinLoss, Pie
```

---

### SparklineValueType

Specifies the data value types.

```csharp
public enum SparklineValueType
{
    Numeric,    // Numeric data (default)
    Category,   // Category data
    DateTime    // DateTime data
}
```

---

### SparklineTheme

Predefined theme styles.

```csharp
public enum SparklineTheme
{
    Material,       // Material Design (default)
    Fabric,         // Fabric Design
    Bootstrap,      // Bootstrap Theme
    HighContrast    // High Contrast
}
```

---

### SparklineRangePadding

Range padding for axis.

```csharp
public enum SparklineRangePadding
{
    None,           // No padding (default)
    Normal,         // Standard padding
    Additional,     // Adds interval as padding
}
```

---

## Related Classes and Namespaces

### Supporting Classes

| Class | Namespace | Purpose | API Link |
|-------|-----------|---------|----------|
| SparklineSparklineFont | Syncfusion.EJ2.Charts | Font configuration (family, size, weight, color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineSparklineFont.html) |
| SparklineLabelOffset | Syncfusion.EJ2.Charts | Label offset configuration (x, y values) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineLabelOffset.html) |
| SparklineLineSettings | Syncfusion.EJ2.Charts | Line-specific settings | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineLineSettings.html) |

### Font & Styling Classes

| Class | Namespace | Purpose | API Link |
|-------|-----------|---------|----------|
| SparklineMarkerSettingsBorderMarkerSettings | Syncfusion.EJ2.Charts | Marker border configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineMarkerSettingsBorderMarkerSettings.html) |
| SparklineDataLabelSettingsBorderDataLabelSettings | Syncfusion.EJ2.Charts | Data label border configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineDataLabelSettingsBorderDataLabelSettings.html) |
| SparklineDataLabelSettingsTextStyleDataLabelSettings | Syncfusion.EJ2.Charts | Data label font configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SparklineDataLabelSettingsTextStyleDataLabelSettings.html) |

### Built-in Themes & Palettes

**Theme Colors:**
- Material (Default)
- Fabric
- Bootstrap
- HighContrast

**Color Palettes for Series:**
- Default Material palette
- Custom color arrays can be specified

---

## Usage Patterns

### Basic Line Sparkline

Render a simple line sparkline with minimal data.

```csharp
@{
    List<SparklineData> lineData = new List<SparklineData>
    {
        new SparklineData { x = 1, yval = 2000 },
        new SparklineData { x = 2, yval = 3000 },
        new SparklineData { x = 3, yval = 2500 },
        new SparklineData { x = 4, yval = 4000 }
    };
}

<ejs-sparkline id="sparkline" 
    type="Line" 
    width="200px"
    height="100px"
    dataSource="@lineData"
    xName="x"
    yName="yval">
</ejs-sparkline>
```

---

### Column Sparkline with Markers

Render a column sparkline with marker highlighting.

```csharp
<ejs-sparkline id="columnSparkline" 
    type="Column" 
    width="200px"
    height="100px"
    dataSource="@columnData"
    xName="x"
    yName="yval"
    highPointColor="green"
    lowPointColor="red"
    negativePointColor="orange">
    <e-sparkline-markersettings visible="All">
    </e-sparkline-markersettings>
</ejs-sparkline>
```

---

### Win-Loss Sparkline

Render a win-loss sparkline for binary data.

```csharp
@{
    List<SparklineData> winLossData = new List<SparklineData>
    {
        new SparklineData { x = 1, yval = 1 },      // Win
        new SparklineData { x = 2, yval = -1 },     // Loss
        new SparklineData { x = 3, yval = 1 },      // Win
        new SparklineData { x = 4, yval = 0 }       // Tie
    };
}

<ejs-sparkline id="winLossSparkline" 
    type="WinLoss" 
    dataSource="@winLossData"
    xName="x"
    yName="yval"
    highPointColor="green"
    lowPointColor="red"
    tiePointColor="yellow">
</ejs-sparkline>
```

---

### Pie Sparkline

Render a pie sparkline for proportion data.

```csharp
<ejs-sparkline id="pieSparkline" 
    type="Pie" 
    width="150px"
    height="150px"
    dataSource="@pieData"
    xName="x"
    yName="yval"
    palette='new string[] { "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A" }'>
</ejs-sparkline>
```

---

### Sparkline with Tooltips

Render a sparkline with tooltip enabled.

```csharp
<ejs-sparkline id="tooltipSparkline" 
    type="Area" 
    width="300px"
    height="150px"
    dataSource="@areaData"
    xName="x"
    yName="yval"
    fill="#00bdae">
    <e-sparkline-tooltipsettings visible="true">
    </e-sparkline-tooltipsettings>
</ejs-sparkline>
```

---

## Namespace Information

**Primary Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Version:** 27.1.48+  
**Supported .NET Versions:** 3.1, 5.0, 6.0, 7.0, 8.0

---

## Additional Resources

- **Official Documentation:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/getting-started
- **API Reference (Complete):** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Sparkline.html
- **Getting Started:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/getting-started
- **Sparkline Types:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/sparkline-types
- **Data Labels:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/data-labels
- **Markers:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/marker
- **Tooltips & Interaction:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/user-interaction
- **Accessibility:** https://ej2.syncfusion.com/aspnetcore/documentation/sparkline/accessibility
