# Chart3D API Reference

Complete API reference for the Syncfusion ASP.NET Core 3D Chart (`Syncfusion.EJ2.Charts.Chart3D`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents

- [Chart3D Class](#chart3d-class)
  - [Constructor](#constructor)
  - [Core Properties](#core-properties)
    - [Basic Configuration Properties](#basic-configuration-properties)
    - [3D Configuration Properties](#3d-configuration-properties)
    - [Appearance Properties](#appearance-properties)
    - [Data Binding & Series Properties](#data-binding--series-properties)
    - [Axis Configuration Properties](#axis-configuration-properties)
    - [Interaction & Selection Properties](#interaction--selection-properties)
    - [Layout & Positioning Properties](#layout--positioning-properties)
    - [Advanced Configuration Properties](#advanced-configuration-properties)
    - [Export & Print Properties](#export--print-properties)
    - [Localization & Persistence Properties](#localization--persistence-properties)
    - [Accessibility Properties](#accessibility-properties)
    - [HTML Attributes](#html-attributes)
- [Events](#events)
- [Child Configuration APIs](#child-configuration-apis)
- [Complete Class Reference](#complete-class-reference)
  - [Core Configuration Classes](#core-configuration-classes)
  - [Axis Configuration Classes](#axis-configuration-classes)
  - [Axis Label & Tick Line Classes](#axis-label--tick-line-classes)
  - [Grid & Tick Line Classes](#grid--tick-line-classes)
  - [Layout & Positioning Classes](#layout--positioning-classes)
  - [Appearance & Styling Classes](#appearance--styling-classes)
  - [Legend & Tooltip Classes](#legend--tooltip-classes)
  - [Selection & Data Label Classes](#selection--data-label-classes)
- [Enumerations](#enumerations)
  - [HighlightMode](#highlightmode-enum)
  - [Chart3DSelectionMode](#chart3dselectionmode-enum)
  - [SelectionPattern](#selectionpattern-enum)
  - [ChartTheme](#charttheme-enum)
  - [Chart3DSeriesType](#chart3dseriestype-enum)
  - [Chart3DDataLabelPosition](#chart3ddatalabelposition-enum)
  - [Chart3DFadeOutMode](#chart3dfadeoutmode-enum)
  - [Chart3DLegendMode](#chart3dlegendmode-enum)
  - [Chart3DLegendLocation](#chart3dlegendlocation-enum)
- [Namespace and Assembly](#namespace-and-assembly)
- [Additional Resources](#additional-resources)
- [Important Notes](#important-notes)

---

## Chart3D Class

The main 3D chart component class for rendering 3D bar, column, and area visualizations.

**Official API Reference:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html

**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `Chart3D`

---

### Constructor

```csharp
public Chart3D()
```

Creates a new instance of the Chart3D component.

---

## Core Properties

### Basic Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Title` | `string` | "" | Title of the chart | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Title) |
| `SubTitle` | `string` | "" | Subtitle of the chart | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_SubTitle) |
| `Description` | `string` | null | Description for chart | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Description) |
| `Height` | `string` | null | Chart height (e.g., "450px", "100%") | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Height) |
| `Width` | `string` | null | Chart width (e.g., "100%", "800px") | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Width) |
| `DataSource` | `object` | null | Chart data collection (array of objects or DataManager) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_DataSource) |

### 3D Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Depth` | `double` | 50 | Depth from front series to back wall | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Depth) |
| `Rotation` | `double` | 0 | 3D chart rotation angle (degrees) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Rotation) |
| `Tilt` | `double` | 0 | 3D chart tilt/slope angle (degrees) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Tilt) |
| `PerspectiveAngle` | `double` | 90 | Perspective angle for 3D rendering | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_PerspectiveAngle) |
| `EnableRotation` | `bool` | false | Enable interactive 3D rotation | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_EnableRotation) |
| `WallColor` | `string` | null | 3D wall background color (hex/rgba) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_WallColor) |
| `WallSize` | `double` | 2 | Width of 3D chart wall | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_WallSize) |

### Appearance Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Background` | `string` | null | Background color (hex or rgba format) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Background) |
| `BackgroundImage` | `string` | null | Background image URL | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_BackgroundImage) |
| `Palettes` | `string[]` | null | Color palette for series (hex colors) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Palettes) |
| `Theme` | `ChartTheme` | Bootstrap5 | Visual theme (Material, Bootstrap5, Fluent, etc.) | [ChartTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartTheme.html) |
| `Border` | `Chart3DBorder` | null | Chart border configuration | [Chart3DBorder](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DBorder.html) |

### Data Binding & Series Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Series` | `List<Chart3DSeries>` | null | Collection of chart series | [Chart3DSeries](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSeries.html) |
| `Columns` | `List<Chart3DColumn>` | null | Split chart vertically into columns | [Chart3DColumn](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DColumn.html) |
| `Rows` | `List<Chart3DRow>` | null | Split chart horizontally into rows | [Chart3DRow](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DRow.html) |

### Axis Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `PrimaryXAxis` | `Chart3DPrimaryXAxis` | null | Primary X-axis configuration | [Chart3DPrimaryXAxis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DPrimaryXAxis.html) |
| `PrimaryYAxis` | `Chart3DPrimaryYAxis` | null | Primary Y-axis configuration | [Chart3DPrimaryYAxis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DPrimaryYAxis.html) |
| `Axes` | `List<Chart3DAxis>` | null | Secondary axis collection | [Chart3DAxis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxis.html) |

### Interaction & Selection Properties

| Property | Type | Default | Description | Allowed Values | API Link |
|----------|------|---------|-------------|----------------|----------|
| `HighlightMode` | `HighlightMode` | None | Highlight mode on hover | None, Series, Point, Cluster | [HighlightMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.HighlightMode.html) |
| `HighlightColor` | `string` | "" | Highlight color (hex/rgba) | - | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_HighlightColor) |
| `HighlightPattern` | `SelectionPattern` | None | Highlight pattern style | See SelectionPattern enum | [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html) |
| `SelectionMode` | `Chart3DSelectionMode` | None | Selection mode | None, Series, Point, Cluster | [Chart3DSelectionMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectionMode.html) |
| `SelectionPattern` | `SelectionPattern` | None | Selection pattern style | See SelectionPattern enum | [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html) |
| `SelectedDataIndexes` | `List<Chart3DSelectedDataIndex>` | null | Initial selected point indexes | - | [Chart3DSelectedDataIndex](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectedDataIndex.html) |
| `IsMultiSelect` | `bool` | false | Enable multiple point selection | - | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_IsMultiSelect) |

### Layout & Positioning Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Margin` | `Chart3DMargin` | null | Chart margins (left, right, top, bottom) | [Chart3DMargin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMargin.html) |
| `LegendSettings` | `Chart3DLegendSettings` | null | Legend configuration | [Chart3DLegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendSettings.html) |
| `TitleStyle` | `Chart3DTitleSettings` | null | Title font and styling | [Chart3DTitleSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTitleSettings.html) |
| `SubTitleStyle` | `Chart3DTitleSettings` | null | Subtitle font and styling | [Chart3DTitleSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTitleSettings.html) |
| `Tooltip` | `Chart3DTooltipSettings` | null | Tooltip configuration | [Chart3DTooltipSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTooltipSettings.html) |

### Advanced Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `IsTransposed` | `bool` | false | Render chart in transposed manner | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_IsTransposed) |
| `EnableSideBySidePlacement` | `bool` | true | Side-by-side placement for column series | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_EnableSideBySidePlacement) |

### Export & Print Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `EnableExport` | `bool` | false | Enable export (PNG, JPEG, SVG, PDF) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_EnableExport) |

### Localization & Persistence Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Locale` | `string` | "" | Culture/localization override | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Locale) |
| `EnablePersistence` | `bool` | false | Persist state across page reloads | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_EnablePersistence) |
| `EnableRtl` | `bool` | false | Enable right-to-left rendering | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_EnableRtl) |
| `UseGroupingSeparator` | `bool` | false | Use thousand separator for numbers | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_UseGroupingSeparator) |

### Accessibility Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `EnableHtmlSanitizer` | `bool` | false | Sanitize untrusted HTML content | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_EnableHtmlSanitizer) |

### HTML Attributes

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `HtmlAttributes` | `object` | null | Additional HTML attributes (title, name, etc.) |

---

## Events

| Event | Type | Triggered When | Handler Signature | API Link |
|-------|------|---|---|---|
| `Load` | `string` | Before the chart is loaded | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Load) |
| `Loaded` | `string` | After the chart is loaded | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Loaded) |
| `BeforeResize` | `string` | Before chart resize event | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_BeforeResize) |
| `Resized` | `string` | After chart resize completes | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Resized) |
| `AxisLabelRender` | `string` | Before each axis label renders | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_AxisLabelRender) |
| `SeriesRender` | `string` | Before series renders on screen | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_SeriesRender) |
| `PointRender` | `string` | Before data point renders | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_PointRender) |
| `LegendRender` | `string` | Before legend renders on screen | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_LegendRender) |
| `TextRender` | `string` | Before data label renders | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_TextRender) |
| `TooltipRender` | `string` | Before tooltip renders on screen | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_TooltipRender) |
| `Chart3DMouseClick` | `string` | When user clicks on 3D chart | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Chart3DMouseClick) |
| `Chart3DMouseDown` | `string` | When mouse button pressed on chart | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Chart3DMouseDown) |
| `Chart3DMouseUp` | `string` | When mouse button released on chart | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Chart3DMouseUp) |
| `Chart3DMouseMove` | `string` | When user hovers over chart | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Chart3DMouseMove) |
| `Chart3DMouseLeave` | `string` | When cursor leaves chart | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_Chart3DMouseLeave) |
| `PointClick` | `string` | When user clicks on data points | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_PointClick) |
| `PointMove` | `string` | When user hovers over data points | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_PointMove) |
| `LegendClick` | `string` | When user clicks on legend | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_LegendClick) |
| `SelectionComplete` | `string` | After selection completes | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_SelectionComplete) |
| `BeforeExport` | `string` | Before export starts | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_BeforeExport) |
| `AfterExport` | `string` | After export completes | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_AfterExport) |
| `BeforePrint` | `string` | Before print starts | `function(args)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html#Syncfusion_EJ2_Charts_Chart3D_BeforePrint) |

---

## Child Configuration APIs

The following child configuration classes are available within the `Syncfusion.EJ2.Charts` namespace for advanced customization:

### Core Configuration Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| **Chart3DSeries** | Configure individual series visualization | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSeries.html) |
| **Chart3DPrimaryXAxis** | Configure horizontal axis properties | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DPrimaryXAxis.html) |
| **Chart3DPrimaryYAxis** | Configure vertical axis properties | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DPrimaryYAxis.html) |
| **Chart3DAxis** | Configuration for secondary axes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxis.html) |

### Layout & Positioning Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| **Chart3DMargin** | Customize chart margins | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMargin.html) |
| **Chart3DColumn** | Define column-based chart split | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DColumn.html) |
| **Chart3DRow** | Define row-based chart split | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DRow.html) |

### Appearance & Styling Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| **Chart3DBorder** | Customize chart border appearance | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DBorder.html) |
| **Chart3DTitleSettings** | Customize title and subtitle styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTitleSettings.html) |

### Legend & Tooltip Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| **Chart3DLegendSettings** | Configure legend behavior and appearance | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendSettings.html) |
| **Chart3DTooltipSettings** | Configure tooltip behavior and styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTooltipSettings.html) |

### Interaction & Selection Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| **Chart3DSelectedDataIndex** | Specify selected data point indexes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectedDataIndex.html) |

### Animation Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| **Chart3DAnimation** | Configure chart animation settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAnimation.html) |

---

## Enumerations

### HighlightMode Enum

**API Reference:** [HighlightMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.HighlightMode.html)

Available highlight modes for data point interaction:

- `None` - No highlighting
- `Series` - Highlight entire series
- `Point` - Highlight individual point
- `Cluster` - Highlight cluster of points

### Chart3DSelectionMode Enum

**API Reference:** [Chart3DSelectionMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectionMode.html)

Available selection modes for data interaction:

- `None` - No selection enabled
- `Series` - Select entire series
- `Point` - Select individual point
- `Cluster` - Select cluster of points

### SelectionPattern Enum

**API Reference:** [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html)

Patterns for highlighting and selection visualization:

- `None`
- `Chessboard`
- `Dots`
- `DiagonalForward`
- `Crosshatch`
- `Pacman`
- `DiagonalBackward`
- `Grid`
- `Turquoise`
- `Star`
- `Triangle`
- `Circle`
- `Tile`
- `HorizontalDash`
- `VerticalDash`
- `Rectangle`
- `Box`
- `VerticalStripe`
- `HorizontalStripe`
- `Bubble`

### ChartTheme Enum

**API Reference:** [ChartTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartTheme.html)

Available visual themes for chart styling:

- `Fabric`
- `FabricDark`
- `Bootstrap4`
- `Bootstrap`
- `BootstrapDark`
- `HighContrastLight`
- `HighContrast`
- `Tailwind`
- `TailwindDark`
- `Bootstrap5` (default)
- `Bootstrap5Dark`
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `Fluent2HighContrast`
- `Material`
- `MaterialDark`
- `Material3`
- `Material3Dark`

---

## Complete Class Reference

### Core Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3D` | N/A | Main 3D chart component | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html) |
| `Chart3DSeries` | `Chart3DSeriesBuilder` | Individual series configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSeries.html) |
| `Chart3DSeriesCollection` | N/A | Collection of series | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSeriesCollection.html) |
| `Chart3DAnimation` | `Chart3DAnimationBuilder` | Chart animation settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAnimation.html) |

### Axis Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3DPrimaryXAxis` | N/A | Primary horizontal axis | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DPrimaryXAxis.html) |
| `Chart3DPrimaryYAxis` | N/A | Primary vertical axis | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DPrimaryYAxis.html) |
| `Chart3DAxis` | `Chart3DAxisBuilder` | Secondary axis configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxis.html) |
| `Chart3DAxes` | N/A | Collection of axes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxes.html) |

### Axis Label & Tick Line Classes

| Class | Purpose | Namespace | API Link |
|-------|---------|-----------|----------|
| `Chart3DAxisLabelStyleAxes` | Label styling for secondary axes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisLabelStyleAxes.html) |
| `Chart3DAxisLabelStylePrimaryXAxis` | Label styling for X axis | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisLabelStylePrimaryXAxis.html) |
| `Chart3DAxisLabelStylePrimaryYAxis` | Label styling for Y axis | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisLabelStylePrimaryYAxis.html) |
| `Chart3DAxisTitleStyleAxes` | Title styling for secondary axes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisTitleStyleAxes.html) |
| `Chart3DAxisTitleStylePrimaryXAxis` | Title styling for X axis | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisTitleStylePrimaryXAxis.html) |
| `Chart3DAxisTitleStylePrimaryYAxis` | Title styling for Y axis | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisTitleStylePrimaryYAxis.html) |

### Grid & Tick Line Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3DMajorGridLines` | `Chart3DMajorGridLinesBuilder` | Major gridline configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMajorGridLines.html) |
| `Chart3DMinorGridLines` | `Chart3DMinorGridLinesBuilder` | Minor gridline configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMinorGridLines.html) |
| `Chart3DMajorTickLines` | `Chart3DMajorTickLinesBuilder` | Major tick mark configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMajorTickLines.html) |
| `Chart3DMinorTickLines` | `Chart3DMinorTickLinesBuilder` | Minor tick mark configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMinorTickLines.html) |
| `Chart3DAxisMajorGridLinesPrimaryXAxis` | N/A | Primary X axis major gridlines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMajorGridLinesPrimaryXAxis.html) |
| `Chart3DAxisMajorGridLinesPrimaryYAxis` | N/A | Primary Y axis major gridlines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMajorGridLinesPrimaryYAxis.html) |
| `Chart3DAxisMinorGridLinesPrimaryXAxis` | N/A | Primary X axis minor gridlines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMinorGridLinesPrimaryXAxis.html) |
| `Chart3DAxisMinorGridLinesPrimaryYAxis` | N/A | Primary Y axis minor gridlines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMinorGridLinesPrimaryYAxis.html) |
| `Chart3DAxisMajorTickLinesPrimaryXAxis` | N/A | Primary X axis major tick lines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMajorTickLinesPrimaryXAxis.html) |
| `Chart3DAxisMajorTickLinesPrimaryYAxis` | N/A | Primary Y axis major tick lines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMajorTickLinesPrimaryYAxis.html) |
| `Chart3DAxisMinorTickLinesPrimaryXAxis` | N/A | Primary X axis minor tick lines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMinorTickLinesPrimaryXAxis.html) |
| `Chart3DAxisMinorTickLinesPrimaryYAxis` | N/A | Primary Y axis minor tick lines | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DAxisMinorTickLinesPrimaryYAxis.html) |

### Layout & Positioning Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3DMargin` | `Chart3DMarginBuilder` | Chart margin configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMargin.html) |
| `Chart3DMarginChart3D` | N/A | Chart3D specific margins | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DMarginChart3D.html) |
| `Chart3DColumn` | `Chart3DColumnBuilder` | Column-based chart split | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DColumn.html) |
| `Chart3DRow` | `Chart3DRowBuilder` | Row-based chart split | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DRow.html) |
| `Chart3DRows` | N/A | Collection of rows | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DRows.html) |
| `Chart3DLocation` | `Chart3DLocationBuilder` | Location positioning | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLocation.html) |
| `Chart3DContainerPadding` | `Chart3DContainerPaddingBuilder` | Container padding settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DContainerPadding.html) |

### Appearance & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3DBorder` | `Chart3DBorderBuilder` | Border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DBorder.html) |
| `Chart3DBorderChart3D` | N/A | Chart3D specific border | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DBorderChart3D.html) |
| `Chart3DTitleSettings` | `Chart3DTitleSettingsBuilder` | Title configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTitleSettings.html) |
| `Chart3DSubTitleStyleChart3D` | N/A | Subtitle styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSubTitleStyleChart3D.html) |
| `Chart3DFont` | `Chart3DFontBuilder` | Font properties | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DFont.html) |
| `Chart3DTextFont` | `Chart3DTextFontBuilder` | Text font styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTextFont.html) |

### Legend & Tooltip Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3DLegendSettings` | `Chart3DLegendSettingsBuilder` | Legend configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendSettings.html) |
| `Chart3DLegendTextStyle` | N/A | Legend text styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendTextStyle.html) |
| `Chart3DLegendTitleStyle` | N/A | Legend title styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendTitleStyle.html) |
| `Chart3DLegendBorder` | N/A | Legend border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendBorder.html) |
| `Chart3DLegendMargin` | N/A | Legend margin settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendMargin.html) |
| `Chart3DTooltipSettings` | `Chart3DTooltipSettingsBuilder` | Tooltip configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTooltipSettings.html) |
| `Chart3DTooltipBorder` | N/A | Tooltip border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTooltipBorder.html) |
| `Chart3DTitleBorder` | `Chart3DTitleBorderBuilder` | Title border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DTitleBorder.html) |

### Selection & Data Label Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `Chart3DSelectedDataIndex` | `Chart3DSelectedDataIndexBuilder` | Individual selected data index | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectedDataIndex.html) |
| `Chart3DSelectedDataIndexes` | N/A | Collection of selected indexes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectedDataIndexes.html) |
| `Chart3DDataLabelSettings` | `Chart3DDataLabelSettingsBuilder` | Data label configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DDataLabelSettings.html) |
| `Chart3DEmptyPointSettings` | `Chart3DEmptyPointSettingsBuilder` | Empty point handling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DEmptyPointSettings.html) |

---

## Enumerations

### HighlightMode Enum

**API Reference:** [HighlightMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.HighlightMode.html)

Available highlight modes for data point interaction:

- `None` - No highlighting
- `Series` - Highlight entire series
- `Point` - Highlight individual point
- `Cluster` - Highlight cluster of points

### Chart3DSelectionMode Enum

**API Reference:** [Chart3DSelectionMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSelectionMode.html)

Available selection modes for data interaction:

- `None` - No selection enabled
- `Series` - Select entire series
- `Point` - Select individual point
- `Cluster` - Select cluster of points

### SelectionPattern Enum

**API Reference:** [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html)

Patterns for highlighting and selection visualization:

- `None`
- `Chessboard`
- `Dots`
- `DiagonalForward`
- `Crosshatch`
- `Pacman`
- `DiagonalBackward`
- `Grid`
- `Turquoise`
- `Star`
- `Triangle`
- `Circle`
- `Tile`
- `HorizontalDash`
- `VerticalDash`
- `Rectangle`
- `Box`
- `VerticalStripe`
- `HorizontalStripe`
- `Bubble`

### ChartTheme Enum

**API Reference:** [ChartTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.ChartTheme.html)

Available visual themes for chart styling:

- `Fabric`
- `FabricDark`
- `Bootstrap4`
- `Bootstrap`
- `BootstrapDark`
- `HighContrastLight`
- `HighContrast`
- `Tailwind`
- `TailwindDark`
- `Bootstrap5` (default)
- `Bootstrap5Dark`
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `Fluent2HighContrast`
- `Material`
- `MaterialDark`
- `Material3`
- `Material3Dark`

### Chart3DSeriesType Enum

**API Reference:** [Chart3DSeriesType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSeriesType.html)

Supported series types for 3D visualization:

- `Column` - 3D column chart visualization
- `Bar` - 3D bar chart visualization
- `Area` - 3D area chart visualization
- `StackingColumn` - 3D stacked column chart
- `StackingBar` - 3D stacked bar chart
- `StackingColumn100` - 3D 100% stacked column chart
- `StackingBar100` - 3D 100% stacked bar chart

### Chart3DDataLabelPosition Enum

**API Reference:** [Chart3DDataLabelPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DDataLabelPosition.html)

Defines the data label position relative to data points:

- `Top` - Position the label on top of the point
- `Bottom` - Position the label on bottom of the point
- `Middle` - Position the label to middle of the point

### Chart3DFadeOutMode Enum

**API Reference:** [Chart3DFadeOutMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DFadeOutMode.html)

Defines the tooltip fade out behavior:

- `Click` - Remove tooltip on click
- `Move` - Remove tooltip with some delay when mouse moves

### Chart3DLegendMode Enum

**API Reference:** [Chart3DLegendMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendMode.html)

Defines the mode for rendering legend items:

- `Series` - Render legend items based on visible series
- `Point` - Render legend items based on points

### Chart3DLegendLocation Enum

**API Reference:** [Chart3DLegendLocation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DLegendLocation.html)

Defines the position where the legend will be placed:

- `Bottom` - Display legend at bottom of chart
- `Top` - Display legend at top of chart
- `Left` - Display legend on left side of chart
- `Right` - Display legend on right side of chart
- `Custom` - Display legend at custom location

---

## Namespace and Assembly

**Namespace:** `Syncfusion.EJ2.Charts`

**Assembly:** `Syncfusion.EJ2.dll`

**Version:** Compatible with Syncfusion EJ2 ASP.NET Core (v18.4.0 and later)

### Using Statement

```csharp
using Syncfusion.EJ2.Charts;
```

### NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.1.44
```

---

## Additional Resources

- [Official Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/chart3d/getting-started)
- [Live Demos](https://ej2.syncfusion.com/aspnetcore/chart3d/default/)
- [GitHub Examples](https://github.com/SyncfusionExamples/ASP-NET-Core-Getting-Started-Examples/tree/main/Chart3D)
- [Supported Series Types](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3DSeriesType.html)
- [Data Binding Guide](https://ej2.syncfusion.com/aspnetcore/documentation/chart3d/data-binding)
- [API Documentation - Chart3D](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Chart3D.html)

---

## Important Notes

- **3D Rendering:** The Chart3D component supports multiple series visualization in a 3D perspective with customizable rotation, tilt, and depth parameters.
- **Event Handlers:** All event handlers are triggered in JavaScript context within ASP.NET Core tag helper syntax.
- **Default Theme:** Default theme is `ChartTheme.Bootstrap5`. Available themes include Material, Fabric, Bootstrap4, Bootstrap5, Fluent, and Tailwind.
- **Data Binding:** The component supports data binding through both array of objects and DataManager instances.
- **Interactive Features:** Selection and highlighting modes support Point, Series, and Cluster options for interactive data visualization.
- **3D Rotation:** The 3D rotation feature requires `EnableRotation` property to be set to `true` for user-triggered rotation.
- **Property Configuration:** Child configuration classes use builder pattern for fluent property configuration in ASP.NET Core tag helpers.
- **Color Formats:** All color properties accept both hex (#RRGGBB) and RGBA color formats as valid CSS color strings.
- **Dimensions:** Width and height can be specified in pixels ('100px') or percentage ('100%') values.
- **Axis Configuration:** Always configure axes (PrimaryXAxis, PrimaryYAxis) based on data type (Category, Numeric, DateTime, etc.).
- **Series Type:** Supported 3D series types include Column, Bar, and Area. Choose based on visualization requirements.
- **Export Support:** Enable export feature with `EnableExport="true"` to support PNG, JPEG, SVG, and PDF formats.
- **Platform Specific:** This API reference is exclusively for Syncfusion ASP.NET Core. For other platforms (JavaScript, Vue, React, Angular, Blazor), refer to platform-specific documentation.
