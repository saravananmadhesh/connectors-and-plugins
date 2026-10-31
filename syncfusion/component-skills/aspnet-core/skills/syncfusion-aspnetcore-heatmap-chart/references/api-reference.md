# HeatMap Chart API Reference

Complete API reference for the Syncfusion ASP.NET Core HeatMap (`Syncfusion.EJ2.HeatMap.HeatMap`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html
- **Namespace:** `Syncfusion.EJ2.HeatMap`
- **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents

- [HeatMap Class](#heatmap-class)
  - [Constructor](#constructor)
  - [Core Properties](#core-properties)
    - [Basic Configuration Properties](#basic-configuration-properties)
    - [Dimension Properties](#dimension-properties)
    - [Data Binding Properties](#data-binding-properties)
    - [Cell & Rendering Properties](#cell--rendering-properties)
    - [Appearance Properties](#appearance-properties)
    - [Interaction Properties](#interaction-properties)
    - [Legend & Palette Properties](#legend--palette-properties)
    - [Tooltip Properties](#tooltip-properties)
    - [Localization Properties](#localization-properties)
    - [State & Persistence Properties](#state--persistence-properties)
    - [HTML Attributes](#html-attributes)
- [Events](#events)
- [Child Configuration APIs](#child-configuration-apis)
- [Complete Class Reference](#complete-class-reference)
  - [Axis Configuration Classes](#axis-configuration-classes)
  - [Cell & Data Classes](#cell--data-classes)
  - [Palette & Color Classes](#palette--color-classes)
  - [Legend Configuration Classes](#legend-configuration-classes)
  - [Tooltip Configuration Classes](#tooltip-configuration-classes)
  - [Layout & Styling Classes](#layout--styling-classes)
  - [Bubble & Advanced Classes](#bubble--advanced-classes)
  - [Title Configuration Classes](#title-configuration-classes)
- [Enumerations](#enumerations)
  - [ValueType](#valuetype-enum)
  - [DrawType](#drawtype-enum)
  - [BubbleType](#bubbletype-enum)
  - [AdaptorType](#adaptortype-enum)
  - [PaletteType](#palettetype-enum)
  - [LegendPosition](#legendposition-enum)
  - [CellType](#celltype-enum)
  - [LabelIntersectAction](#labelintersectaction-enum)
  - [HeatMapTheme](#heatmaptheme-enum)
- [Namespace and Assembly](#namespace-and-assembly)
- [Additional Resources](#additional-resources)
- [Important Notes](#important-notes)

---

## HeatMap Class

The main heatmap component class for rendering two-dimensional data visualization with color-coded cells, axes, legends, and tooltips.

**Official API Reference:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html

**Namespace:** `Syncfusion.EJ2.HeatMap`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `HeatMap`

---

### Constructor

```csharp
public HeatMap()
```

Creates a new instance of the HeatMap component.

---

## Core Properties

### Basic Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Title` | `string` | null | HeatMap title (via TitleSettings) | [HeatMapTitle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTitle.html) |
| `DataSource` | `object` | null | Data collection (array, JSON, or strongly-typed collection) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_DataSource) |
| `BackgroundColor` | `string` | null | Background color of entire heatmap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_BackgroundColor) |
| `Theme` | `HeatMapTheme` | Material | Visual theme (Material, Bootstrap, Fabric, etc.) | [HeatMapTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTheme.html) |

### Dimension Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Width` | `string` | null | HeatMap width ("100px", "100%", etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Width) |
| `Height` | `string` | null | HeatMap height ("100px", "100%", etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Height) |

### Data Binding Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `DataSourceSettings` | `HeatMapData` | null | Data mapping configuration (adaptor, x/y mapping) | [HeatMapData](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapData.html) |
| `XAxis` | `HeatMapAxis` | null | Horizontal axis configuration | [HeatMapAxis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapAxis.html) |
| `YAxis` | `HeatMapAxis` | null | Vertical axis configuration | [HeatMapAxis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapAxis.html) |

### Cell & Rendering Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `CellSettings` | `HeatMapCellSettings` | null | Cell appearance and styling | [HeatMapCellSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapCellSettings.html) |
| `RenderingMode` | `DrawType` | SVG | Rendering mode (SVG, Canvas, Auto) | [DrawType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.DrawType.html) |

### Appearance Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `TitleSettings` | `HeatMapTitle` | null | Title configuration and styling | [HeatMapTitle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTitle.html) |
| `Margin` | `HeatMapMargin` | null | Left, right, top, bottom margins | [HeatMapMargin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapMargin.html) |

### Interaction Properties

| Property | Type | Default | Allowed Values | Description | API Link |
|----------|------|---------|-------|-------------|----------|
| `AllowSelection` | `bool` | false | true/false | Enable cell selection | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_AllowSelection) |
| `EnableMultiSelect` | `bool` | true | true/false | Enable multiple cell selection | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_EnableMultiSelect) |
| `ShowTooltip` | `bool` | true | true/false | Show tooltip on hover | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_ShowTooltip) |

### Legend & Palette Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `LegendSettings` | `HeatMapLegendSettings` | null | Legend configuration and display | [HeatMapLegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapLegendSettings.html) |
| `PaletteSettings` | `HeatMapPaletteSettings` | null | Palette and color mapping configuration | [HeatMapPaletteSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapPaletteSettings.html) |

### Tooltip Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `TooltipSettings` | `HeatMapTooltipSettings` | null | Tooltip configuration and styling | [HeatMapTooltipSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTooltipSettings.html) |

### Localization Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Locale` | `string` | "en-US" | Culture/locale for number and text formatting | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Locale) |
| `EnableRtl` | `bool` | false | Enable right-to-left rendering | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_EnableRtl) |

### State & Persistence Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `EnablePersistence` | `bool` | false | Persist component state between page reloads | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_EnablePersistence) |
| `EnableHtmlSanitizer` | `bool` | false | Sanitize untrusted HTML in content | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_EnableHtmlSanitizer) |

### HTML Attributes

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `HtmlAttributes` | `object` | null | Additional HTML attributes (title, name, etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_HtmlAttributes) |

---

## Events

| Event | Type | Triggered When | Handler Signature | API Link |
|-------|------|---|----------|----------|
| `Load` | `string` | Before heatmap is loaded | `function(args: IHeatMapEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Load) |
| `Loaded` | `string` | After heatmap is loaded | `function(args: IHeatMapEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Loaded) |
| `Created` | `string` | After heatmap rendering is complete | `function(args: IHeatMapEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Created) |
| `CellRender` | `string` | Before each cell is rendered | `function(args: ICellRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_CellRender) |
| `CellClick` | `string` | When cell is clicked | `function(args: ICellClickEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_CellClick) |
| `CellDoubleClick` | `string` | When cell is double-clicked | `function(args: ICellDoubleClickEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_CellDoubleClick) |
| `CellSelected` | `string` | When cell is selected | `function(args: ICellSelectedEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_CellSelected) |
| `TooltipRender` | `string` | Before tooltip is rendered | `function(args: ITooltipRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_TooltipRender) |
| `LegendRender` | `string` | Before legend is rendered | `function(args: ILegendRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_LegendRender) |
| `Resized` | `string` | When window is resized | `function(args: IResizeEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html#Syncfusion_EJ2_HeatMap_HeatMap_Resized) |

---

## Child Configuration APIs

### Axis Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapAxis` | `HeatMapAxisBuilder` | Axis configuration (X/Y axes) | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapAxis.html) |
| `HeatMapAxisLabelBorder` | `HeatMapAxisLabelBorderBuilder` | Axis label border styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapAxisLabelBorder.html) |
| `HeatMapMultiLevelLabel` | `HeatMapMultiLevelLabelBuilder` | Multi-level label configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapMultiLevelLabel.html) |

### Cell & Data Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapCellSettings` | `HeatMapCellSettingsBuilder` | Cell appearance and labeling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapCellSettings.html) |
| `HeatMapData` | `HeatMapDataBuilder` | Data mapping configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapData.html) |
| `HeatMapBubbleData` | `HeatMapBubbleDataBuilder` | Bubble heatmap data mapping | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapBubbleData.html) |
| `HeatMapBubbleSize` | `HeatMapBubbleSizeBuilder` | Bubble size configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapBubbleSize.html) |

### Palette & Color Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapPaletteSettings` | `HeatMapPaletteSettingsBuilder` | Palette and color mapping | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapPaletteSettings.html) |
| `HeatMapPalette` | `HeatMapPaletteBuilder` | Individual palette item | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapPalette.html) |
| `HeatMapFillColor` | `HeatMapFillColorBuilder` | Fill color configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapFillColor.html) |

### Legend Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapLegendSettings` | `HeatMapLegendSettingsBuilder` | Legend configuration and display | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapLegendSettings.html) |
| `LegendSettingsTitleLegendSettings` | N/A | Legend title settings | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.LegendSettingsTitleLegendSettings.html) |

### Tooltip Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapTooltipSettings` | `HeatMapTooltipSettingsBuilder` | Tooltip configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTooltipSettings.html) |
| `HeatMapTooltipBorder` | `HeatMapTooltipBorderBuilder` | Tooltip border styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTooltipBorder.html) |

### Layout & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapMargin` | `HeatMapMarginBuilder` | Margin configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapMargin.html) |
| `HeatMapFont` | `HeatMapFontBuilder` | Font properties and styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapFont.html) |

### Bubble & Advanced Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapBubbleData` | `HeatMapBubbleDataBuilder` | Bubble heatmap configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapBubbleData.html) |
| `HeatMapBubbleSize` | `HeatMapBubbleSizeBuilder` | Bubble size settings | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapBubbleSize.html) |

### Title Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapTitle` | `HeatMapTitleBuilder` | Title configuration and styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTitle.html) |

---

## Complete Class Reference

### Axis Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapAxis` | `HeatMapAxisBuilder` | Horizontal/vertical axis configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapAxis.html) |
| `HeatMapAxisLabelBorder` | `HeatMapAxisLabelBorderBuilder` | Axis label border styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapAxisLabelBorder.html) |
| `HeatMapMultiLevelLabel` | `HeatMapMultiLevelLabelBuilder` | Multi-level label grouping | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapMultiLevelLabel.html) |

### Cell & Data Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapCellSettings` | `HeatMapCellSettingsBuilder` | Cell rendering, labels, borders | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapCellSettings.html) |
| `HeatMapData` | `HeatMapDataBuilder` | Data adaptor and field mapping | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapData.html) |
| `HeatMapBubbleData` | `HeatMapBubbleDataBuilder` | Bubble size and color mapping | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapBubbleData.html) |
| `HeatMapBubbleSize` | `HeatMapBubbleSizeBuilder` | Bubble size min/max values | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapBubbleSize.html) |

### Palette & Color Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapPaletteSettings` | `HeatMapPaletteSettingsBuilder` | Color palette type and configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapPaletteSettings.html) |
| `HeatMapPalette` | `HeatMapPaletteBuilder` | Individual color palette item | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapPalette.html) |
| `HeatMapFillColor` | `HeatMapFillColorBuilder` | Fill color for special values | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapFillColor.html) |

### Legend Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapLegendSettings` | `HeatMapLegendSettingsBuilder` | Legend display and positioning | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapLegendSettings.html) |
| `LegendSettingsTitleLegendSettings` | N/A | Legend title styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.LegendSettingsTitleLegendSettings.html) |

### Tooltip Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapTooltipSettings` | `HeatMapTooltipSettingsBuilder` | Tooltip appearance and format | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTooltipSettings.html) |
| `HeatMapTooltipBorder` | `HeatMapTooltipBorderBuilder` | Tooltip border styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTooltipBorder.html) |

### Layout & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapMargin` | `HeatMapMarginBuilder` | Margin spacing configuration | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapMargin.html) |
| `HeatMapFont` | `HeatMapFontBuilder` | Font styling for text elements | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapFont.html) |

### Title Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `HeatMapTitle` | `HeatMapTitleBuilder` | Title text and styling | Syncfusion.EJ2.HeatMap | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTitle.html) |

---

## Enumerations

### ValueType Enum

**API Reference:** [ValueType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.ValueType.html)

Axis value types:

- `Category` - Category-based axis (text labels)
- `Numeric` - Numeric values or index-based axis
- `DateTime` - Date-time values axis

### DrawType Enum

**API Reference:** [DrawType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.DrawType.html)

Rendering modes:

- `SVG` (default) - SVG rendering for small/medium datasets
- `Canvas` - Canvas rendering for large datasets
- `Auto` - Automatic selection based on data size

### BubbleType Enum

**API Reference:** [BubbleType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.BubbleType.html)

Bubble visualization types:

- `Size` - Bubble size represents data value
- `Color` - Bubble color represents data value
- `Sector` - Bubble sector represents data value
- `SizeAndColor` - Both size and color represent values

### AdaptorType Enum

**API Reference:** [AdaptorType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.AdaptorType.html)

Data adaptor types for processing different data source structures:

- `Cell` - Adaptor processes cell type data source (individual x, y, value records)
- `Table` - Adaptor processes table type data source (columns/rows structure)
- `None` - No adaptor type will be used for the data source

### PaletteType Enum

**API Reference:** [PaletteType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.PaletteType.html)

Color palette types:

- `Gradient` - Continuous gradient palette for value ranges
- `Fixed` - Fixed color categories for classification

### LegendPosition Enum

**API Reference:** [LegendPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.LegendPosition.html)

Legend positioning:

- `Right` (default) - Display on right side
- `Left` - Display on left side
- `Top` - Display at top
- `Bottom` - Display at bottom

### CellType Enum

**API Reference:** [CellType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.CellType.html)

Cell tile types:

- `Rect` (default) - Rectangular cells
- `Bubble` - Bubble-shaped cells

### LabelIntersectAction Enum

**API Reference:** [LabelIntersectAction](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.LabelIntersectAction.html)

Actions when axis labels intersect with each other:

- `None` - Shows all the labels
- `Trim` - Trims the label when label text intersects with other labels
- `Rotate45` - Rotates the label to 45 degrees when it intersects other labels
- `MultipleRows` - Shows all the labels as multiple rows when it intersects other labels

### HeatMapTheme Enum

**API Reference:** [HeatMapTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMapTheme.html)

Visual themes for component appearance:

- `Material` - Material design theme
- `MaterialDark` - Material design dark theme
- `Material3` - Material Design 3 theme
- `Material3Dark` - Material Design 3 dark theme
- `Fabric` - Fabric design theme
- `FabricDark` - Fabric design dark theme
- `Bootstrap` - Bootstrap design theme
- `Bootstrap4` - Bootstrap 4 design theme
- `Bootstrap5` - Bootstrap 5 design theme
- `BootstrapDark` - Bootstrap dark theme
- `Bootstrap5Dark` - Bootstrap 5 dark theme
- `Fluent` - Microsoft Fluent design theme
- `FluentDark` - Microsoft Fluent dark theme
- `Fluent2` - Microsoft Fluent 2 design theme
- `Fluent2Dark` - Microsoft Fluent 2 dark theme
- `Fluent2HighContrast` - Microsoft Fluent 2 high contrast theme
- `Tailwind` - Tailwind CSS design theme
- `TailwindDark` - Tailwind CSS dark theme
- `Tailwind3` - Tailwind CSS 3 design theme
- `Tailwind3Dark` - Tailwind CSS 3 dark theme
- `HighContrast` - High contrast theme for accessibility
- `HighContrastLight` - High contrast light theme for accessibility

---

## Namespace and Assembly

**Namespace:** `Syncfusion.EJ2.HeatMap`

**Assembly:** `Syncfusion.EJ2.dll`

**Version:** Compatible with Syncfusion EJ2 ASP.NET Core (v18.4.0 and later)

### Using Statement

```csharp
using Syncfusion.EJ2.HeatMap;
```

### NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.3
```

---

## Additional Resources

- [Official Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/getting-started/)
- [Live Demos](https://ej2.syncfusion.com/aspnetcore/heatmap/default/)
- [GitHub Examples](https://github.com/SyncfusionExamples/ASP-NET-Core-Getting-Started-Examples/tree/main/HeatMap)
- [Data Binding Guide](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/data-binding-rendering/)
- [Axes Configuration Guide](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/axis-configuration/)
- [Appearance & Styling Guide](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/appearance-styling/)
- [Legend & Palette Guide](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/legend-palette/)
- [Tooltips & Selection Guide](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/tooltips-selection/)
- [Bubble HeatMap Guide](https://ej2.syncfusion.com/aspnetcore/documentation/heatmap/bubble-heatmap/)
- [API Documentation - HeatMap](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.HeatMap.HeatMap.html)

---

## Important Notes

- **Data Binding:** HeatMap supports array, JSON cell data, and strongly-typed C# collections. Use `DataSourceSettings` to configure mapping.
- **Axis Types:** Choose appropriate axis type - Category for labels, Numeric for indices, DateTime for time-based data.
- **Rendering Modes:** Use SVG for small datasets, Canvas for large datasets, or Auto for automatic selection.
- **Palette Types:** Use Gradient for continuous value ranges, Fixed for classification/categorization.
- **Cell Settings:** Configure labels, borders, borders, and tile types through `CellSettings`.
- **Legend:** Configure position (Right, Left, Top, Bottom), visibility, and label display.
- **Tooltip:** Enable with `ShowTooltip`, customize format and styling through `TooltipSettings`.
- **Selection:** Enable cell selection with `AllowSelection`, multiple selection with `EnableMultiSelect`.
- **Events:** Use CellRender for custom cell styling, CellClick/CellSelected for interaction, TooltipRender for custom tooltips.
- **Performance:** For very large datasets (5000+ cells), use Canvas rendering and disable cell labels.
- **Multi-Level Labels:** Create hierarchical axis labels using `HeatMapMultiLevelLabel` for grouped categories.
- **Bubble HeatMap:** Use bubble tile type to represent additional dimensions of data through bubble size and color.
- **Themes:** Available themes include Material (default), Bootstrap, Fluent, Tailwind with light and dark variants.
- **Localization:** Configure `Locale` for culture-specific number formatting and axis label display.
- **RTL Support:** Enable `EnableRtl` for right-to-left language rendering.
- **Responsive:** Width and height accept pixels ('450px') or percentages ('100%') for responsive layout.
- **DatetimeAxis:** Use `LabelFormat` property to customize date-time label display (e.g., 'MMM', 'yyyy-MM-dd').

---

**Last Updated:** June 3, 2026  
**Component Version:** Syncfusion EJ2 ASP.NET Core  
**Platform:** ASP.NET Core Only  
**API Reference Version:** v33.2.3 and later
