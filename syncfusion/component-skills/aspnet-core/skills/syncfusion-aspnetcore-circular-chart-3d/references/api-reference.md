# CircularChart3D API Reference

Complete API reference for the Syncfusion ASP.NET Core 3D Circular Chart (`Syncfusion.EJ2.Charts.CircularChart3D`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents

- [CircularChart3D Class](#circularchart3d-class)
  - [Constructor](#constructor)
  - [Core Properties](#core-properties)
    - [Basic Configuration Properties](#basic-configuration-properties)
    - [3D Configuration Properties](#3d-configuration-properties)
    - [Appearance Properties](#appearance-properties)
    - [Data Binding & Series Properties](#data-binding--series-properties)
    - [Interaction & Selection Properties](#interaction--selection-properties)
    - [Legend & Tooltip Properties](#legend--tooltip-properties)
    - [Localization & Persistence Properties](#localization--persistence-properties)
    - [HTML Attributes](#html-attributes)
- [Events](#events)
- [Child Configuration APIs](#child-configuration-apis)
- [Complete Class Reference](#complete-class-reference)
  - [Core Configuration Classes](#core-configuration-classes)
  - [Series & Data Classes](#series--data-classes)
  - [Layout & Positioning Classes](#layout--positioning-classes)
  - [Appearance & Styling Classes](#appearance--styling-classes)
  - [Legend & Tooltip Classes](#legend--tooltip-classes)
  - [Selection & Data Label Classes](#selection--data-label-classes)
  - [Animation Classes](#animation-classes)
- [Enumerations](#enumerations)
  - [CircularChart3DHighlightMode](#circularchart3dhighlightmode-enum)
  - [CircularChart3DSelectionMode](#circularchart3dselectionmode-enum)
  - [SelectionPattern](#selectionpattern-enum)
  - [CircularChart3DTheme](#circularchart3dtheme-enum)
  - [CircularChart3DLabelPosition](#circularchart3dlabelposition-enum)
  - [LegendPosition](#legendposition-enum)
- [Namespace and Assembly](#namespace-and-assembly)
- [Additional Resources](#additional-resources)
- [Important Notes](#important-notes)

---

## CircularChart3D Class

The main 3D circular chart component class for rendering 3D pie and donut visualizations with interactive features.

**Official API Reference:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html

**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `CircularChart3D`

---

### Constructor

```csharp
public CircularChart3D()
```

Creates a new instance of the CircularChart3D component.

---

## Core Properties

### Basic Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Title` | `string` | null | Title of the circular 3D chart | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Title) |
| `SubTitle` | `string` | null | Subtitle of the circular 3D chart | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_SubTitle) |
| `Height` | `string` | null | Chart height (e.g., "450px", "100%") | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Height) |
| `Width` | `string` | null | Chart width (e.g., "100%", "800px") | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Width) |
| `DataSource` | `object` | null | Chart data collection (array of objects or DataManager) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_DataSource) |
| `Background` | `string` | null | Background color (hex or rgba format) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Background) |

### 3D Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Depth` | `double` | 50 | Depth of the 3D circular chart | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Depth) |
| `Rotation` | `double` | 0 | Rotation angle of 3D circular chart (degrees) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Rotation) |
| `Tilt` | `double` | 0 | Tilt/slope angle of 3D circular chart (degrees) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Tilt) |
| `EnableRotation` | `bool` | false | Enable interactive 3D rotation | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_EnableRotation) |

### Appearance Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Theme` | `CircularChart3DTheme` | Material | Visual theme (Material, Bootstrap5, Fluent, etc.) | [CircularChart3DTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTheme.html) |
| `BackgroundImage` | `string` | null | Background image URL | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_BackgroundImage) |
| `TitleStyle` | `CircularChart3DFont` | null | Title font and styling | [CircularChart3DFont](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DFont.html) |
| `SubTitleStyle` | `CircularChart3DFont` | null | Subtitle font and styling | [CircularChart3DFont](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DFont.html) |
| `Border` | `CircularChart3DContainerBorder` | null | Chart border configuration | [CircularChart3DContainerBorder](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DContainerBorder.html) |

### Data Binding & Series Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Series` | `List<CircularChart3DSeries>` | null | Collection of circular 3D series | [CircularChart3DSeries](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSeries.html) |

### Interaction & Selection Properties

| Property | Type | Default | Allowed Values | Description | API Link |
|----------|------|---------|-------|-------------|----------|
| `HighlightMode` | `CircularChart3DHighlightMode` | None | None, Point | Mode for highlighting data points | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_HighlightMode) |
| `HighlightColor` | `string` | "" | Hex/RGBA color | Color for highlighted data points | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_HighlightColor) |
| `HighlightPattern` | `SelectionPattern` | None | See SelectionPattern values | Highlight pattern for visualization | [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html) |
| `SelectionMode` | `CircularChart3DSelectionMode` | None | None, Point | Mode for selecting data points | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_SelectionMode) |
| `SelectionPattern` | `SelectionPattern` | None | See SelectionPattern values | Selection pattern for visualization | [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html) |
| `SelectedDataIndexes` | `List<CircularChart3DSelectedDataIndex>` | null | Index array | Pre-selected data point indexes | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_SelectedDataIndexes) |
| `IsMultiSelect` | `bool` | false | true/false | Enable multiple data point selection | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_IsMultiSelect) |

### Legend & Tooltip Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `LegendSettings` | `CircularChart3DLegendSettings` | null | Legend configuration and styling | [CircularChart3DLegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettings.html) |
| `Tooltip` | `CircularChart3DTooltipSettings` | null | Tooltip configuration and styling | [CircularChart3DTooltipSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipSettings.html) |

### Localization & Persistence Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Locale` | `string` | "en-US" | Culture/locale for localization | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Locale) |
| `EnablePersistence` | `bool` | false | Persist state between page reloads | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_EnablePersistence) |
| `EnableRtl` | `bool` | false | Enable right-to-left rendering | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_EnableRtl) |
| `UseGroupingSeparator` | `bool` | false | Use thousands separator in numbers | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_UseGroupingSeparator) |

### HTML Attributes

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `HtmlAttributes` | `object` | null | Additional HTML attributes (title, name, etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_HtmlAttributes) |

---

## Events

| Event | Type | Triggered When | Handler Signature | API Link |
|-------|------|---|----------|----------|
| `Load` | `string` | Before the circular 3D chart is loaded | `function(args: ICircularChart3DEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Load) |
| `Loaded` | `string` | After the circular 3D chart is loaded | `function(args: ICircularChart3DEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Loaded) |
| `BeforeResize` | `string` | Before the chart is resized | `function(args: ICircularChart3DResizeEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_BeforeResize) |
| `Resized` | `string` | After the chart is resized | `function(args: ICircularChart3DResizeEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_Resized) |
| `SeriesRender` | `string` | Before a series is rendered | `function(args: ICircularChart3DSeriesRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_SeriesRender) |
| `PointRender` | `string` | Before each data point is rendered | `function(args: ICircularChart3DPointRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_PointRender) |
| `TextRender` | `string` | Before data labels are rendered | `function(args: ICircularChart3DTextRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_TextRender) |
| `LegendRender` | `string` | Before legend items are rendered | `function(args: ICircularChart3DLegendRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_LegendRender) |
| `TooltipRender` | `string` | Before tooltip is rendered | `function(args: ICircularChart3DTooltipRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_TooltipRender) |
| `CircularChart3DMouseClick` | `string` | When user clicks on the circular 3D chart | `function(args: ICircularChart3DMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_CircularChart3DMouseClick) |
| `CircularChart3DMouseDown` | `string` | When mouse button is pressed on chart | `function(args: ICircularChart3DMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_CircularChart3DMouseDown) |
| `CircularChart3DMouseUp` | `string` | When mouse button is released on chart | `function(args: ICircularChart3DMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_CircularChart3DMouseUp) |
| `CircularChart3DMouseMove` | `string` | When user hovers over the chart | `function(args: ICircularChart3DMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_CircularChart3DMouseMove) |
| `CircularChart3DMouseLeave` | `string` | When cursor leaves the chart | `function(args: ICircularChart3DMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_CircularChart3DMouseLeave) |
| `PointClick` | `string` | When user clicks on a data point | `function(args: ICircularChart3DPointClickEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_PointClick) |
| `PointMove` | `string` | When user hovers over a data point | `function(args: ICircularChart3DPointMoveEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_PointMove) |
| `LegendClick` | `string` | When user clicks on legend item | `function(args: ICircularChart3DLegendClickEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_LegendClick) |
| `SelectionComplete` | `string` | After data point selection is completed | `function(args: ICircularChart3DSelectionCompleteEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_SelectionComplete) |
| `BeforeExport` | `string` | Before export starts | `function(args: ICircularChart3DExportEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_BeforeExport) |
| `AfterExport` | `string` | After export is completed | `function(args: ICircularChart3DExportEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_AfterExport) |
| `BeforePrint` | `string` | Before printing starts | `function(args: ICircularChart3DPrintEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html#Syncfusion_EJ2_Charts_CircularChart3D_BeforePrint) |

---

## Child Configuration APIs

### Core Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3D` | N/A | Main 3D circular chart component | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html) |
| `CircularChart3DSeries` | `CircularChart3DSeriesBuilder` | Individual series configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSeries.html) |
| `CircularChart3DSeriesCollection` | N/A | Collection of series | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSeriesCollection.html) |
| `CircularChart3DAnimation` | `CircularChart3DAnimationBuilder` | Chart animation settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DAnimation.html) |

### Layout & Positioning Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DMargin` | `CircularChart3DMarginBuilder` | Chart margin configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DMargin.html) |
| `CircularChart3DLocation` | `CircularChart3DLocationBuilder` | Location positioning | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLocation.html) |
| `CircularChart3DContainerPadding` | `CircularChart3DContainerPaddingBuilder` | Container padding settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DContainerPadding.html) |

### Appearance & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DContainerBorder` | N/A | Border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DContainerBorder.html) |
| `CircularChart3DFont` | `CircularChart3DFontBuilder` | Font properties | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DFont.html) |
| `CircularChart3DSubTitleStyleCircularChart3D` | N/A | Subtitle styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSubTitleStyleCircularChart3D.html) |

### Legend & Tooltip Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DLegendSettings` | `CircularChart3DLegendSettingsBuilder` | Legend configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettings.html) |
| `CircularChart3DLegendSettingsTextStyleLegendSettings` | N/A | Legend text styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsTextStyleLegendSettings.html) |
| `CircularChart3DLegendSettingsTitleStyleLegendSettings` | N/A | Legend title styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsTitleStyleLegendSettings.html) |
| `CircularChart3DLegendSettingsBorderLegendSettings` | N/A | Legend border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsBorderLegendSettings.html) |
| `CircularChart3DLegendSettingsMarginLegendSettings` | N/A | Legend margin settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsMarginLegendSettings.html) |
| `CircularChart3DTooltipSettings` | `CircularChart3DTooltipSettingsBuilder` | Tooltip configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipSettings.html) |
| `CircularChart3DTooltipBorder` | N/A | Tooltip border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipBorder.html) |
| `CircularChart3DTooltipTextStyle` | N/A | Tooltip text styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipTextStyle.html) |
| `CircularChart3DTooltipSettingsLocationTooltip` | N/A | Tooltip location settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipSettingsLocationTooltip.html) |

### Selection & Data Label Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DSelectedDataIndex` | `CircularChart3DSelectedDataIndexBuilder` | Individual selected data index | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSelectedDataIndex.html) |
| `CircularChart3DSelectedDataIndexes` | N/A | Collection of selected indexes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSelectedDataIndexes.html) |
| `CircularChart3DDataLabelSettings` | `CircularChart3DDataLabelSettingsBuilder` | Data label configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DDataLabelSettings.html) |
| `CircularChart3DDataLabelFont` | `CircularChart3DDataLabelFontBuilder` | Data label font styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DDataLabelFont.html) |
| `CircularChart3DEmptyPointSettings` | `CircularChart3DEmptyPointSettingsBuilder` | Empty point handling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DEmptyPointSettings.html) |
| `CircularChart3DConnector` | `CircularChart3DConnectorBuilder` | Data label connector line | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DConnector.html) |

---

## Complete Class Reference

### Core Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3D` | N/A | Main 3D circular chart component | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html) |
| `CircularChart3DSeries` | `CircularChart3DSeriesBuilder` | Individual series configuration for pie/donut | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSeries.html) |
| `CircularChart3DSeriesCollection` | N/A | Collection of circular 3D series | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSeriesCollection.html) |
| `CircularChart3DAnimation` | `CircularChart3DAnimationBuilder` | Chart animation settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DAnimation.html) |

### Layout & Positioning Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DMargin` | `CircularChart3DMarginBuilder` | Chart margin configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DMargin.html) |
| `CircularChart3DLocation` | `CircularChart3DLocationBuilder` | Location positioning for elements | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLocation.html) |
| `CircularChart3DContainerPadding` | `CircularChart3DContainerPaddingBuilder` | Container padding settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DContainerPadding.html) |

### Appearance & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DContainerBorder` | N/A | Border styling for container | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DContainerBorder.html) |
| `CircularChart3DFont` | `CircularChart3DFontBuilder` | Font properties for text | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DFont.html) |
| `CircularChart3DSubTitleStyleCircularChart3D` | N/A | Subtitle styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSubTitleStyleCircularChart3D.html) |

### Legend & Tooltip Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DLegendSettings` | `CircularChart3DLegendSettingsBuilder` | Legend configuration and appearance | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettings.html) |
| `CircularChart3DLegendSettingsTextStyleLegendSettings` | N/A | Legend text styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsTextStyleLegendSettings.html) |
| `CircularChart3DLegendSettingsTitleStyleLegendSettings` | N/A | Legend title styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsTitleStyleLegendSettings.html) |
| `CircularChart3DLegendSettingsBorderLegendSettings` | N/A | Legend border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsBorderLegendSettings.html) |
| `CircularChart3DLegendSettingsMarginLegendSettings` | N/A | Legend margin settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLegendSettingsMarginLegendSettings.html) |
| `CircularChart3DTooltipSettings` | `CircularChart3DTooltipSettingsBuilder` | Tooltip configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipSettings.html) |
| `CircularChart3DTooltipBorder` | N/A | Tooltip border styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipBorder.html) |
| `CircularChart3DTooltipTextStyle` | N/A | Tooltip text styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipTextStyle.html) |
| `CircularChart3DTooltipSettingsLocationTooltip` | N/A | Tooltip location settings | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTooltipSettingsLocationTooltip.html) |

### Selection & Data Label Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularChart3DSelectedDataIndex` | `CircularChart3DSelectedDataIndexBuilder` | Individual selected data index | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSelectedDataIndex.html) |
| `CircularChart3DSelectedDataIndexes` | N/A | Collection of selected indexes | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSelectedDataIndexes.html) |
| `CircularChart3DDataLabelSettings` | `CircularChart3DDataLabelSettingsBuilder` | Data label configuration | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DDataLabelSettings.html) |
| `CircularChart3DDataLabelFont` | `CircularChart3DDataLabelFontBuilder` | Data label font styling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DDataLabelFont.html) |
| `CircularChart3DEmptyPointSettings` | `CircularChart3DEmptyPointSettingsBuilder` | Empty point handling | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DEmptyPointSettings.html) |
| `CircularChart3DConnector` | `CircularChart3DConnectorBuilder` | Data label connector line | Syncfusion.EJ2.Charts | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DConnector.html) |

---

## Enumerations

### CircularChart3DHighlightMode Enum

**API Reference:** [CircularChart3DHighlightMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DHighlightMode.html)

Available highlight modes for data point interaction:

- `None` - No highlighting
- `Point` - Highlight individual point

### CircularChart3DSelectionMode Enum

**API Reference:** [CircularChart3DSelectionMode](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DSelectionMode.html)

Available selection modes for data interaction:

- `None` - No selection enabled
- `Point` - Select individual point

### SelectionPattern Enum

**API Reference:** [SelectionPattern](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SelectionPattern.html)

Patterns for highlighting and selection visualization:

- `None`, `Chessboard`, `Dots`, `DiagonalForward`, `Crosshatch`, `Pacman`
- `DiagonalBackward`, `Grid`, `Turquoise`, `Star`, `Triangle`, `Circle`
- `Tile`, `HorizontalDash`, `VerticalDash`, `Rectangle`, `Box`
- `VerticalStripe`, `HorizontalStripe`, `Bubble`

### CircularChart3DTheme Enum

**API Reference:** [CircularChart3DTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DTheme.html)

Available visual themes for chart styling:

- `Material` (default)
- `Fabric`
- `Bootstrap`
- `Bootstrap5`
- `Fluent`
- `Tailwind`
- `HighContrast`

### CircularChart3DLabelPosition Enum

**API Reference:** [CircularChart3DLabelPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3DLabelPosition.html)

Defines the data label position relative to data points:

- `Inside` - Position label inside the slice
- `Outside` - Position label outside the slice

### LegendPosition Enum

**API Reference:** [LegendPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.LegendPosition.html)

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

- [Official Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/circular-chart-3d/getting-started)
- [Live Demos](https://ej2.syncfusion.com/aspnetcore/circular-chart-3d/pie/)
- [GitHub Examples](https://github.com/SyncfusionExamples/ASP-NET-Core-Getting-Started-Examples/tree/main/CircularChart3D)
- [Pie Series Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/circular-chart-3d/pie-dount/)
- [Data Labels Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-chart-3d/data-labels/)
- [Legend & Tooltip Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-chart-3d/legend/)
- [API Documentation - CircularChart3D](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.CircularChart3D.html)

---

## Important Notes

- **3D Visualization:** The CircularChart3D component supports pie and donut chart visualization in 3D perspective with customizable rotation, tilt, and depth parameters.
- **Event Handlers:** All event handlers are triggered in JavaScript context within ASP.NET Core tag helper syntax.
- **Default Theme:** Default theme is `CircularChart3DTheme.Material`. Available themes include Bootstrap5, Fluent, Tailwind, and more.
- **Data Binding:** The component supports data binding through both array of objects and DataManager instances.
- **Interactive Features:** Selection and highlighting modes support Point mode only for circular charts.
- **3D Rotation:** The 3D rotation feature requires `EnableRotation` property to be set to `true` for user-triggered rotation.
- **Series Types:** Circular 3D charts primarily support Pie series. Set `InnerRadius` to create donut effects.
- **Data Labels:** Data labels can be positioned inside or outside the pie slices with connector lines.
- **Empty Points:** Configure `EmptyPointSettings` to handle null or missing data values appropriately.
- **Export Support:** Enable export feature with `EnableExport="true"` to support PNG, JPEG, SVG, and PDF formats.
- **Dimensions:** Width and height can be specified in pixels ('100px') or percentage ('100%') values.
- **Platform Specific:** This API reference is exclusively for Syncfusion ASP.NET Core. For other platforms (JavaScript, Vue, React, Angular, Blazor), refer to platform-specific documentation.

---
