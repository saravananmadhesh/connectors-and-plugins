# Syncfusion EJ2 Sankey Chart - Complete API reference for the **Syncfusion Sankey** component based on the class.

**Component:** Syncfusion Sankey Chart for ASP.NET MVC  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Base API Documentation:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html)

> **Default value rule used below:** if the linked API explicitly exposes a default value, it is included. If the linked API does not explicitly expose a default value for that member, the default is shown as `-`.

---

## Table of Contents

- [Sankey Class API](#sankey-class-api)
  - [Constructor](#constructor)
  - [Core Properties](#core-properties)
  - [Container and Display](#container-and-display)
  - [Data Configuration](#data-configuration)
  - [Node and Link Styling](#node-and-link-styling)
  - [Label Configuration](#label-configuration)
  - [Legend Configuration](#legend-configuration)
  - [Tooltip Configuration](#tooltip-configuration)
  - [Title and Subtitle](#title-and-subtitle)
  - [Layout and Appearance](#layout-and-appearance)
  - [Accessibility and Localization](#accessibility-and-localization)
  - [Export and Persistence](#export-and-persistence)
  - [Events](#events)
- [Node Configuration Class](#node-configuration-class)
  - [Example](#example)
- [Link Configuration Class](#link-configuration-class)
  - [Example](#example-1)
- [Label Configuration Class](#label-configuration-class)
  - [Example](#example-2)
- [Legend Settings Class](#legend-settings-class)
  - [Example](#example-3)
- [Tooltip Settings Class](#tooltip-settings-class)
  - [Example](#example-4)
- [Margin Configuration Class](#margin-configuration-class)
  - [Example](#example-5)
- [Border Configuration Class](#border-configuration-class)
  - [Example](#example-6)
- [Related Classes and Direct Links](#related-classes-and-direct-links)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic Sankey Diagram](#basic-sankey-diagram)
  - [Customized Nodes and Links](#customized-nodes-and-links)
  - [Sankey with Legend and Tooltip](#sankey-with-legend-and-tooltip)
  - [Vertical Sankey Diagram](#vertical-sankey-diagram)
  - [Sankey with Title, Subtitle, and Background](#sankey-with-title-subtitle-and-background)
  - [Interactive Sankey with Events](#interactive-sankey-with-events)
  - [Sankey with RTL Support](#sankey-with-rtl-support)
  - [Sankey with Print and Export Hooks](#sankey-with-print-and-export-hooks)
- [Future reference](#future-reference)
- [Additional Resources](#additional-resources)

---

## Sankey Class API

**Primary component class for rendering flow diagrams with weighted node relationships.**

**Namespace:** `Syncfusion.EJ2.Charts`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.charts.sankey.html)**

### Constructor

```csharp
public Sankey()
```

Creates a new Sankey component instance.

### Core Properties

### Container and Display

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Width` | `string` | `null` | Width of the Sankey diagram such as `100%` or `800px` | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Width) |
| `Height` | `string` | `null` | Height of the Sankey diagram such as `500px` | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Height) |
| `HtmlAttributes` | `object` | `-` | Additional HTML attributes for the rendered element | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_HtmlAttributes) |

### Data Configuration

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Nodes` | `List<SankeyNode>` | `null` | Node collection used by the diagram | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Nodes) |
| `Links` | `List<SankeyLink>` | `null` | Link collection used by the diagram | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Links) |

### Node and Link Styling

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `NodeStyle` | `SankeyChartNodeSettings` | `null` | Global node appearance settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeStyle) |
| `LinkStyle` | `SankeyChartLinkSettings` | `null` | Global link appearance settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkStyle) |
| `NodeRendering` | `string` | `null` | Event fired before each node renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeRendering) |
| `LinkRendering` | `string` | `null` | Event fired before each link renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkRendering) |
| `NodeClick` | `string` | `null` | Event fired when a node is clicked | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeClick) |
| `NodeEnter` | `string` | `null` | Event fired when the pointer enters a node | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeEnter) |
| `NodeLeave` | `string` | `null` | Event fired when the pointer leaves a node | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_NodeLeave) |
| `LinkClick` | `string` | `null` | Event fired when a link is clicked | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkClick) |
| `LinkEnter` | `string` | `null` | Event fired when the pointer enters a link | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkEnter) |
| `LinkLeave` | `string` | `null` | Event fired when the pointer leaves a link | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LinkLeave) |

### Label Configuration

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `LabelSettings` | `SankeyChartLabelSettings` | `null` | Global label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LabelSettings) |
| `LabelRendering` | `string` | `null` | Event fired before each label renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LabelRendering) |

### Legend Configuration

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `LegendSettings` | `SankeyChartLegendSettings` | `null` | Legend appearance and placement | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LegendSettings) |
| `LegendItemRendering` | `string` | `null` | Event fired before a legend item renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LegendItemRendering) |
| `LegendItemHover` | `string` | `null` | Event fired when a legend item is hovered | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_LegendItemHover) |

### Tooltip Configuration

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Tooltip` | `SankeyChartTooltipSettings` | `null` | Tooltip configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Tooltip) |
| `TooltipRendering` | `string` | `null` | Event fired before tooltip text is rendered | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_TooltipRendering) |

### Title and Subtitle

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Title` | `string` | `""` | Main title text | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Title) |
| `TitleStyle` | `SankeySankeyTitleStyle` | `null` | Title styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_TitleStyle) |
| `SubTitle` | `string` | `""` | Subtitle text | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_SubTitle) |
| `SubTitleStyle` | `SankeySankeyTitleStyle` | `null` | Subtitle styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_SubTitleStyle) |

### Layout and Appearance

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Orientation` | `Orientation` | `Orientation.Horizontal` | Horizontal or vertical layout | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Orientation) |
| `Background` | `string` | `null` | Background color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Background) |
| `BackgroundImage` | `string` | `null` | Background image URL | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_BackgroundImage) |
| `Border` | `SankeyBorder` | `null` | Outer border | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Border) |
| `Margin` | `SankeyMargin` | `null` | Outer margin around the diagram | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Margin) |
| `Theme` | `ChartTheme` | `ChartTheme.Material` | Built-in chart theme | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Theme) |

### Accessibility and Localization

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Accessibility` | `object` | `null` | Accessibility options | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Accessibility) |
| `EnableRtl` | `bool` | `false` | Right-to-left rendering | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableRtl) |
| `Locale` | `string` | `""` | Localization code | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Locale) |
| `FocusBorderColor` | `string` | `null` | Focus border color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_FocusBorderColor) |
| `FocusBorderWidth` | `double` | `1.5` | Focus border width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_FocusBorderWidth) |
| `FocusBorderMargin` | `double` | `0` | Focus border margin | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_FocusBorderMargin) |

### Export and Persistence

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `EnablePersistence` | `bool` | `false` | Persists component state | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnablePersistence) |
| `EnableExport` | `bool` | `true` | Enables export support | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_EnableExport) |
| `AllowExport` | `bool` | `false` | Export support for selected scenarios | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_AllowExport) |
| `BeforeExport` | `string` | `null` | Event fired before export starts | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_BeforeExport) |
| `AfterExport` | `string` | `null` | Event fired after export completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_AfterExport) |
| `ExportCompleted` | `string` | `null` | Event fired when export is completed | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_ExportCompleted) |
| `BeforePrint` | `string` | `null` | Event fired before print starts | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_BeforePrint) |

### Events

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Load` | `string` | `null` | Fired before the component loads | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Load) |
| `Loaded` | `string` | `null` | Fired after the component has loaded | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_Loaded) |
| `SizeChanged` | `string` | `null` | Fired when the component size changes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Sankey.html#Syncfusion_EJ2_Charts_Sankey_SizeChanged) |

---

## Node Configuration Class

**Class:** `SankeyNode`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyNode.html)

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Id` | `string` | `null` | Unique node identifier | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Id) |
| `Color` | `string` | `null` | Node fill color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Color) |
| `Label` | `SankeyChartDataLabel` | `null` | Per-node label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Label) |
| `Offset` | `double` | `0` | Custom layout offset for the node | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyNode.html#Syncfusion_EJ2_Charts_SankeyNode_Offset) |

### Example

```csharp
new SankeyNode
{
    Id = "Product A",
    Color = "#FF6B6B",
    Label = new SankeyChartDataLabel { Text = "Product A" },
    Offset = 0
}
```

---

## Link Configuration Class

**Class:** `SankeyLink`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyLink.html)

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `SourceId` | `string` | `null` | Source node ID | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_SourceId) |
| `TargetId` | `string` | `null` | Target node ID | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_TargetId) |
| `Value` | `double` | `Double.NaN` | Link weight used for thickness | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyLink.html#Syncfusion_EJ2_Charts_SankeyLink_Value) |

### Example

```csharp
new SankeyLink
{
    SourceId = "Product A",
    TargetId = "Online",
    Value = 500
}
```

---

## Label Configuration Class

**Class:** `SankeyChartLabelSettings`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html)

**Common members available in ASP.NET MVC:**

| Member | Type | Default | Description | Direct Member Link |
|--------|------|---------|-------------|--------------------|
| `Color` | `string` | `""` | Sets text color for labels | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Color) |
| `ContentTemplate` | `MvcTemplate<object>` | `-` | To get or set value for `ContentTemplate` | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_ContentTemplate) |
| `FontFamily` | `string` | `null` | Applies a specific font family to labels | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontFamily) |
| `FontSize` | `string` | `"12px"` | Controls label size | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontSize) |
| `FontStyle` | `string` | `"normal"` | Enables text styles such as italic | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontStyle) |
| `FontWeight` | `string` | `"400"` | Sets text weight, for example `400` for normal or `700` for bold | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_FontWeight) |
| `Padding` | `double` | `10` | Adds space around text for better placement | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Padding) |
| `Visible` | `bool` | `true` | Shows or hides labels | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html#Syncfusion_EJ2_Charts_SankeyChartLabelSettings_Visible) |

### Example

```cshtml
@Html.EJS().Sankey("sankey").LabelSettings(
        ls => ls
        .Visible(true)
        .Color("#333333")
        .FontFamily("Segoe UI")
        .FontSize("12px")
        .FontStyle("normal")
        .FontWeight("400")
        .Padding(10)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

```

---

## Legend Settings Class

**Class:** `SankeyChartLegendSettings`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html)

| Property / Builder Member | Type | Default | Description | Direct Member Link |
|---------------------------|------|---------|-------------|--------------------|
| `Visible` | `bool` | `true` | Shows or hides the legend | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Visible) |
| `Position` | `LegendPosition` | `LegendPosition.Auto` | Sets the legend position | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Position) |
| `Width` | `string` | `null` | Sets legend width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Width) |
| `Height` | `string` | `null` | Sets legend height | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Height) |
| `Background` | `string` | `"transparent"` | Sets legend background | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Background) |
| `Opacity` | `double` | `1` | Sets legend opacity | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Opacity) |
| `ItemPadding` | `double` | `null` | Sets spacing between legend items | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ItemPadding) |
| `EnableHighlight` | `bool` | `true` | Enables legend highlight behavior | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_EnableHighlight) |
| `IsInversed` | `bool` | `false` | Inverts legend layout | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_IsInversed) |
| `Location` | `SankeyLocation` | `-` | Used with custom positioning | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Location) |
| `Border` | `SankeyLegendBorder` | `-` | Configures legend border settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Border) |
| `Margin` | `SankeyLegendMargin` | `-` | Configures legend margin settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Margin) |
| `Padding` | `double` | `8` | Sets padding around the legend container | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Padding) |
| `Reverse` | `bool` | `-` | Displays legend items in reverse order | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Reverse) |
| `ShapeHeight` | `double` | `10` | Sets legend shape height | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ShapeHeight) |
| `ShapePadding` | `double` | `8` | Sets spacing between the legend shape and text | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ShapePadding) |
| `ShapeWidth` | `double` | `10` | Sets legend shape width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_ShapeWidth) |
| `TextStyle` | `SankeyFont` | `-` | Sets text styling for legend labels | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_TextStyle) |
| `Title` | `string` | `null` | Sets legend title text | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_Title) |
| `TitleStyle` | `SankeyLegendTitleStyle` | `-` | Sets font styling for legend title | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html#Syncfusion_EJ2_Charts_SankeyChartLegendSettings_TitleStyle) |
### Example

```cshtml
@Html.EJS().Sankey("sankey").LegendSettings(
        l => l
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
        .Background("#FFFFFF")
        .ItemPadding(8)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Tooltip Settings Class

**Class:** `SankeyChartTooltipSettings`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html)

**Common ASP.NET MVC usage pattern:**

| Member | Default | Description | Direct Member Link |
|--------|---------|-------------|--------------------|
| `ContentTemplate` | `-` | Template content support for tooltip rendering | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_ContentTemplate) |
| `Duration` | `300` | Duration of the tooltip show animation in milliseconds | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Duration) |
| `Enable(bool)` | `true` | Enables or disables tooltip display | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Enable) |
| `EnableAnimation` | `true` | Enables or disables tooltip animation | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_EnableAnimation) |
| `FadeOutDuration` | `1000` | Duration of the tooltip fade-out animation in milliseconds | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_FadeOutDuration) |
| `FadeOutMode` | `SankeyTooltipFadeOutMode.Move` | Specifies the mode for the fade-out animation when hiding the tooltip | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_FadeOutMode) |
| `Fill` | `null` | Background fill color of the tooltip | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Fill) |
| `LinkFormat` | `"$start.name $start.value → $target.name $target.value"` | Format string for link tooltips | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_LinkFormat) |
| `LinkTemplate` | `null` | Custom template or rendering function for link tooltips | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_LinkTemplate) |
| `NodeFormat` | `"$name : $value"` | Format string for node tooltips | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_NodeFormat) |
| `NodeTemplate` | `null` | Custom template or rendering function for node tooltips | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_NodeTemplate) |
| `Opacity` | `1` | Opacity of the tooltip container | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_Opacity) |
| `TextStyle` | `null` | Text style used within the tooltip | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html#Syncfusion_EJ2_Charts_SankeyChartTooltipSettings_TextStyle) |

**Dynamic tooltip text is typically handled through `TooltipRendering(...)`.**

### Example

```cshtml
@Html.EJS().Sankey("sankey").Tooltip(
        t => t.Enable(true)
    ).TooltipRendering("onTooltipRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onTooltipRendering(args) {
        if (!args || !args.node) {
            return;
        }

        var nodeId = args.node.id || "";
        args.text = nodeId + " | Incoming: 500 | Outgoing: 700";
    }
</script>
```

---

## Margin Configuration Class

**Class:** `SankeyMargin`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyMargin.html)

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Left` | `double` | `10` | Left margin | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Left) |
| `Right` | `double` | `10` | Right margin | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Right) |
| `Top` | `double` | `10` | Top margin | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Top) |
| `Bottom` | `double` | `10` | Bottom margin | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyMargin.html#Syncfusion_EJ2_Charts_SankeyMargin_Bottom) |

### Example

```cshtml
@Html.EJS().Sankey("sankey").Margin(
        m => m.Left(10).Right(10).Top(10).Bottom(10)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Border Configuration Class

**Class:** `SankeyBorder`  
**Direct Link:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyBorder.html)

| Property | Type | Default | Description | Direct Member Link |
|----------|------|---------|-------------|--------------------|
| `Color` | `string` | `""` | Border color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_Color) |
| `DashArray` | `string` | `""` | Border color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_DashArray) |
| `Width` | `double` | `1` | Border width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyBorder.html#Syncfusion_EJ2_Charts_SankeyBorder_Width) |

### Example

```cshtml
@Html.EJS().Sankey("sankey").Border(
        b => b.Color("#D0D0D0").Width(1)
    ).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

---

## Related Classes and Direct Links

- `SankeyNode`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyNode.html)

- `SankeyLink`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyLink.html)

- `SankeyChartNodeSettings`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartNodeSettings.html)

- `SankeyChartLinkSettings`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLinkSettings.html)

- `SankeyChartLabelSettings`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLabelSettings.html)

- `SankeyChartLegendSettings`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartLegendSettings.html)

- `SankeyChartTooltipSettings`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyChartTooltipSettings.html)

- `SankeySankeyTitleStyle`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeySankeyTitleStyle.html)

- `SankeyMargin`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyMargin.html)

- `SankeyBorder`  
  [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SankeyBorder.html)

---

## Common Usage Patterns

### Basic Sankey Diagram

```cshtml
@Html.EJS().Sankey("sankey").Title("Product Sales Flow").Width("100%").Height("500px").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Customized Nodes and Links

```cshtml
@Html.EJS().Sankey("sankey").NodeStyle(ns => ns.Width(50).Opacity(0.9)).LinkStyle(ls => ls.Opacity(0.5).Curvature(0.4)).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Sankey with Legend and Tooltip

```cshtml
@Html.EJS().Sankey("sankey").LegendSettings(l => l.Visible(true).Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)).Tooltip(t => t.Enable(true)).TooltipRendering("onTooltipRendering").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onTooltipRendering(args) {
        if (!args) {
            return;
        }

        if (args.node) {
            var nodeId = args.node.id || "";
            args.text = "Node: " + nodeId;
        }
    }
</script>
```

### Vertical Sankey Diagram

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("600px").Orientation(Syncfusion.EJ2.Charts.Orientation.Vertical).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Sankey with Title, Subtitle, and Background

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Title("Revenue Flow").SubTitle("Quarterly summary").Background("#F5F5F5").LabelSettings(ls => ls.Visible(true).Color("#333333").FontSize("12px")).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Interactive Sankey with Events

```cshtml
@Html.EJS().Sankey("sankey").Loaded("onSankeyLoaded").NodeClick("onNodeClick").LinkClick("onLinkClick").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function onSankeyLoaded(args) {
        console.log("Sankey loaded", args);
    }

    function onNodeClick(args) {
        var node = args.node || args.data || {};
        console.log("Selected node: " + (node.id || "Unknown node"));
    }

    function onLinkClick(args) {
        var link = args.link || args.data || {};
        var source = link.sourceId || link.SourceId || "Unknown source";
        var target = link.targetId || link.TargetId || "Unknown target";
        console.log("Selected link: " + source + " to " + target);
    }
</script>
```

### Sankey with RTL Support

```cshtml
@Html.EJS().Sankey("sankey").EnableRtl(true).Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()
```

### Sankey with Print and Export Hooks

```cshtml
@Html.EJS().Sankey("sankey").Width("100%").Height("500px").Tooltip(t => t.Enable(true)).LegendSettings(l => l.Visible(true)).BeforeExport("onBeforeExport").ExportCompleted("onExportCompleted").BeforePrint("onBeforePrint").Nodes(Model.SankeyNodes).Links(Model.SankeyLinks).Render()

<script>
    function getSankeyInstance() {
        var el = document.getElementById("sankey");
        return el && el.ej2_instances ? el.ej2_instances[0] : null;
    }

    function exportPNG() {
        var sankey = getSankeyInstance();
        if (!sankey) {
            return;
        }

        sankey.export("PNG", "sankey-chart");
    }

    function printSankey() {
        var sankey = getSankeyInstance();
        if (!sankey) {
            return;
        }

        sankey.print();
    }

    function onBeforeExport(args) {
        console.log("Before export", args);
    }

    function onExportCompleted(args) {
        console.log("Export completed", args);
    }

    function onBeforePrint(args) {
        console.log("Before print", args);
    }
</script>
```

---

## Future reference

- `SankeyNode` uses `Id`, `Color`, `Label`, and `Offset`; it does not use the older `Name`, `X`, `Y`, `Width`, or `Height` property pattern in the current ASP.NET MVC EJ2 Sankey API.
- `SankeyLink` uses `SourceId`, `TargetId`, and `Value`.
- Label customization in ASP.NET MVC Sankey is handled through `LabelSettings(...)` and `LabelRendering(...)`.
- Tooltip text is usually safest when assigned through `TooltipRendering(...)`.
- Where a row already represented a valid current member, the direct deep-member URL has been added without removing the original content.
- Where the linked API did not explicitly expose a default value for that row, the default has been kept as `-`.

## Additional Resources
- **Official Documentation:** [Link](https://ej2.syncfusion.com/aspnetmvc/documentation/sankey-chart/)
- **API Reference:** [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/syncfusion.ej2.charts.sankey.html)
