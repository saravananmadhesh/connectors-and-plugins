# Syncfusion EJ2 Chart - Complete API Reference

**Component:** Syncfusion Chart for ASP.NET MVC  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Version:** 27.1.48+  
**Official Documentation:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html

---

## Table of Contents

- [Chart Class API](#chart-class-api)
  - [Constructor](#constructor)
  - [Properties (100+ Total)](#properties-100-total)
    - [Container & Display Properties](#container--display-properties)
    - [Positioning & Layout Properties](#positioning--layout-properties)
    - [Styling & Theme Properties](#styling--theme-properties)
    - [Data & Series Configuration](#data--series-configuration)
    - [Axes Configuration](#axes-configuration)
    - [Legend & Tooltip Properties](#legend--tooltip-properties)
    - [Zoom & Pan Properties](#zoom--pan-properties)
    - [Selection & Interaction Properties](#selection--interaction-properties)
    - [Advanced Features Properties](#advanced-features-properties)
    - [WebMCP Properties](#webmcp-properties)
    - [Export & Print Properties](#export--print-properties)
    - [Localization & Accessibility](#localization--accessibility)
    - [State Management](#state-management)
    - [Title Properties](#title-properties)
	- [Additional Properties](#additional-properties)
- [ChartSeries Configuration](#chartseries-configuration)
  - [Core Series Properties](#core-series-properties)
  - [Common Series Configuration Properties](#common-series-configuration-properties)
- [ChartAxis Configuration](#chartaxis-configuration)
- [Events Reference](#events-reference)
  - [Lifecycle Events](#lifecycle-events)
  - [Series & Point Events](#series--point-events)
  - [Axis Events](#axis-events)
  - [Legend Events](#legend-events)
  - [Tooltip & Label Events](#tooltip--label-events)
  - [Selection & Interaction Events](#selection--interaction-events)
  - [Mouse Events](#mouse-events)
  - [Zoom & Scroll Events](#zoom--scroll-events)
  - [Export & Print Events](#export--print-events)
  - [Other Events](#other-events)
- [Enumerations](#enumerations)
- [Related Classes](#related-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Additional Resources](#additional-resources)

---

## Chart Class API

**Primary component class for rendering interactive charts with multiple visualization types.**

**Namespace:** `Syncfusion.EJ2.Charts`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html)**

### Constructor

```csharp
public Chart()
```

Creates a new instance of the Chart component.

### Properties (100+ Total)

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Width | string | null | Width of chart container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Width) |
| Height | string | null | Height of chart container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Height) |
| Background | string | null | Background color of chart (hex, rgba) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Background) |
| BackgroundImage | string | null | Background image URL for chart | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_BackgroundImage) |
| TabIndex | double | 1 | Tab index for keyboard navigation | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_TabIndex) |

#### Positioning & Layout Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Margin | ChartMargin | null | Chart margin settings (top, bottom, left, right) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Margin) |
| ChartArea | ChartArea | null | Plot area configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartArea) |
| Rows | List<ChartRow> | null | Horizontal panes (panes) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Rows) |
| Columns | List<ChartColumn> | null | Vertical panes (panes) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Columns) |

#### Styling & Theme Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Theme | ChartTheme | Material | Chart theme (Material, Bootstrap, Fluent, Tailwind) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Theme) |
| Border | ChartBorder | null | Border styling for chart (width, color, opacity) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Border) |
| Palettes | string[] | null | Custom palette colors | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Palettes) |

#### Data & Series Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| DataSource | object | null | Data source for the chart | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_DataSource) |
| Series | List<ChartSeries> | null | Collection of series | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Series) |
| EnableSideBySidePlacement | bool | true | Enables side-by-side placement for column/bar series | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableSideBySidePlacement) |

#### Axes Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| PrimaryXAxis | ChartAxis | null | Primary X-axis configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_PrimaryXAxis) |
| PrimaryYAxis | ChartAxis | null | Primary Y-axis configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_PrimaryYAxis) |
| Axes | List<ChartAxis> | null | Additional axes collection | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Axes) |
| IsTransposed | bool | false | Transposes X and Y axes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_IsTransposed) |
| EnableAutoIntervalOnBothAxis | bool | false | Auto interval calculation during zooming | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableAutoIntervalOnBothAxis) |

#### Legend & Tooltip Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| LegendSettings | ChartLegendSettings | null | Legend configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_LegendSettings) |
| Tooltip | ChartTooltipSettings | null | Tooltip configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Tooltip) |

#### Zoom & Pan Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| ZoomSettings | ChartZoomSettings | null | Zoom and pan behavior settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ZoomSettings) |

#### Selection & Interaction Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| SelectionMode | SelectionMode | None | Selection mode | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SelectionMode) |
| HighlightMode | HighlightMode | None | Highlight mode | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_HighlightMode) |
| HighlightColor | string | "" | Highlight color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_HighlightColor) |
| SelectionPattern | SelectionPattern | None | Selection pattern | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SelectionPattern) |
| HighlightPattern | SelectionPattern | None | Highlight pattern | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_HighlightPattern) |
| IsMultiSelect | bool | false | Enables multi-selection | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_IsMultiSelect) |
| SelectedDataIndexes | List<ChartSelectedDataIndex> | null | Preselected point indexes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SelectedDataIndexes) |
| Crosshair | ChartCrosshairSettings | null | Crosshair settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Crosshair) |
| DragSettings | ChartDragSettings | null | Drag interaction settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_DragSettings) |

#### WebMCP Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| EnableWebMcp | bool | false | Enables WebMCP integration and automatic registration of Chart tools after rendering | [Chart.EnableWebMcp](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableWebMcp) |
| WebMcpSettings | ChartWebMcpSettings | null | Configures the WebMCP registration name, selected or custom tools, and permitted model contexts | [Chart.WebMcpSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_WebMcpSettings) |

##### `ChartWebMcpSettings`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| Name | string | null | Prefix for registered tool names. When null or empty, the Chart element ID is used. |
| Tools | object or tool-name collection | null | Built-in allowlist or custom tool definitions. Omit to register every built-in tool. An empty collection clears prior registrations. |
| ExposedTo | string[] | null | Model contexts or origins permitted to access the registered tools. |

##### Fluent-builder methods

| Method | Description |
|--------|-------------|
| `EnableWebMcp(bool enableWebMcp = true)` | Enables or disables WebMCP integration and returns the current `ChartBuilder`. |
| `WebMcpSettings(...)` | Configures the registration name, tools, and exposure settings and returns the current `ChartBuilder`. |

```cshtml
@Html.EJS().Chart("salesChart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings
        .Name("salesChart")
        .Tools(new[] { "inspectChart", "getSeriesData", "getChartAxes" })
        .ExposedTo(new[] { "assistant" }))
    .Render()
```

When all built-in tools are required, omit `Tools`:

```cshtml
@Html.EJS().Chart("salesChart")
    .EnableWebMcp(true)
    .WebMcpSettings(settings => settings.Name("salesChart"))
    .Render()
```

#### Advanced Features Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Annotations | List<ChartAnnotation> | null | Chart annotations | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Annotations) |
| Indicators | List<ChartIndicator> | null | Technical indicators | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Indicators) |
| RangeColorSettings | List<ChartRangeColorSetting> | null | Range-based color mapping | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_RangeColorSettings) |
| StackLabels | ChartStackLabelSettings | null | Stack label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_StackLabels) |
| EnableAnimation | bool | true | Enables chart animation | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableAnimation) |
| EnableCanvas | bool | false | Renders chart using canvas | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableCanvas) |
| EnableHtmlSanitizer | bool | true | Enables HTML sanitization for chart HTML content/templates to help prevent unsafe HTML or script rendering. | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableHtmlSanitizer) |

#### Export & Print Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| EnableExport | bool | false | Enables export support | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableExport) |
| AllowExport | bool | false | Export feature for Blazor charts | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AllowExport) |

#### Localization & Accessibility

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Locale | string | "" | Language locale code for i18n | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Locale) |
| EnableRtl | bool | false | Right-to-left language support | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnableRtl) |
| Description | string | null | Accessibility description for screen readers | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Description) |
| Accessibility | ChartBaseAccessibility | null | Accessibility configuration options | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Accessibility) |
| UseGroupingSeparator | bool | false | Enable thousands separator in numbers | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_UseGroupingSeparator) |
| FocusBorderColor | string | null | Custom focus border color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_FocusBorderColor) |
| FocusBorderWidth | double | 1.5 | Focus border width for accessibility | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_FocusBorderWidth) |
| FocusBorderMargin | double | 0 | Focus border margin | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_FocusBorderMargin) |

#### State Management

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| EnablePersistence | bool | false | Persists component state | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_EnablePersistence) |

#### Title Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Title | string | "" | Main chart title | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Title) |
| SubTitle | string | "" | Chart subtitle | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SubTitle) |
| TitleStyle | ChartTitleSettings | null | Title styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_TitleStyle) |
| SubTitleStyle | ChartTitleSettings | null | Subtitle styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SubTitleStyle) |

#### Additional Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| NoDataTemplate | object | null | Template displayed when chart has no data | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_NoDataTemplate) |

---

## ChartSeries Configuration

**Defines an individual data series, including its type, data binding, appearance, markers, labels, and other series-level options.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html)**

### Core Series Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Type | ChartSeriesType | Required | Series type (Line, Column, Bar, Area, etc.) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Type) |
| Name | string | null | Series name shown in legend | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Name) |
| DataSource | IEnumerable<object> | null | Data source for the series | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_DataSource) |
| XName | string | null | X-value field name | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_XName) |
| YName | string | null | Y-value field name | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_YName) |
| Fill | string | null | Series fill color | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Fill) |
| Width | double | 2 | Series line/border width | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Width) |
| Opacity | double | 1 | Series opacity | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Opacity) |
| DashArray | string | null | Dash pattern for line-based series | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_DashArray) |
| Visible | bool | true | Controls series visibility | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Visible) |

### Common Series Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Marker | ChartMarkerSettings | null | Marker configuration for data points | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Marker) |
| DataLabel | ChartDataLabelSettings | null | Data label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_DataLabel) |
| Border | ChartBorder | null | Series border settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Border) |
| Animation | ChartAnimation | null | Series animation configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Animation) |
| EmptyPointSettings | ChartEmptyPointSettings | null | Empty point rendering behavior | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_EmptyPointSettings) |
| Trendlines | List<ChartTrendline> | null | Trendline configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Trendlines) |
| Segments | List<ChartSegment> | null | Segment-specific styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html#Syncfusion_EJ2_Charts_ChartSeries_Segments) |

---

## ChartAxis Configuration

**Defines axis behavior, labels, ranges, tick marks, grid lines, titles, and positioning for chart axes.**

**[Official API Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html)**

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| ValueType | ValueType | Category | Axis type (Category, DateTime, Numeric, Logarithmic, etc.) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_ValueType) |
| Title | string | null | Axis title | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_Title) |
| LabelFormat | string | null | Format string for axis labels | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_LabelFormat) |
| Minimum | double | null | Minimum visible value | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_Minimum) |
| Maximum | double | null | Maximum visible value | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_Maximum) |
| Interval | double | null | Axis interval | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_Interval) |
| OpposedPosition | bool | false | Places axis on opposite side | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_OpposedPosition) |
| Visible | bool | true | Controls axis visibility | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_Visible) |
| MajorGridLines | ChartMajorGridLines | null | Major grid line settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_MajorGridLines) |
| MinorGridLines | ChartMinorGridLines | null | Minor grid line settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_MinorGridLines) |
| MajorTickLines | ChartMajorTickLines | null | Major tick settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_MajorTickLines) |
| MinorTickLines | ChartMinorTickLines | null | Minor tick settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_MinorTickLines) |
| LabelStyle | ChartFont | null | Label style settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_LabelStyle) |
| TitleStyle | ChartFont | null | Axis title style settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_TitleStyle) |
| CrosshairTooltip | ChartCrosshairTooltip | null | Crosshair tooltip settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_CrosshairTooltip) |
| MultiLevelLabels | List<ChartMultiLevelLabel> | null | Multi-level label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_MultiLevelLabels) |
| ScrollbarSettings | ChartScrollbarSettings | null | Axis scrollbar settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html#Syncfusion_EJ2_Charts_ChartAxis_ScrollbarSettings) |

---

## Events Reference

### Lifecycle Events

| Event | Description | API Link |
|-------|-------------|----------|
| Load | Before chart loads | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Load) |
| Loaded | After chart renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Loaded) |
| BeforeResize | Before chart resize | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_BeforeResize) |
| Resized | After resize completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Resized) |

### Series & Point Events

| Event | Description | API Link |
|-------|-------------|----------|
| SeriesRender | Before series renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SeriesRender) |
| PointRender | Before point renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_PointRender) |
| PointClick | When a point is clicked | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_PointClick) |
| PointDoubleClick | When a point is double-clicked | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_PointDoubleClick) |
| PointMove | When mouse moves over a point | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_PointMove) |
| AnimationComplete | After animation completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AnimationComplete) |

### Axis Events

| Event | Description | API Link |
|-------|-------------|----------|
| AxisLabelRender | Before axis label renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AxisLabelRender) |
| AxisLabelClick | When axis label is clicked | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AxisLabelClick) |
| AxisMultiLabelRender | Before multi-level axis label renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AxisMultiLabelRender) |
| AxisRangeCalculated | When axis range is calculated | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AxisRangeCalculated) |

### Legend Events

| Event | Description | API Link |
|-------|-------------|----------|
| LegendClick | When legend item is clicked | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_LegendClick) |
| LegendRender | Before legend renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_LegendRender) |

### Tooltip & Label Events

| Event | Description | API Link |
|-------|-------------|----------|
| TooltipRender | Before tooltip renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_TooltipRender) |
| SharedTooltipRender | Before shared tooltip renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SharedTooltipRender) |
| TextRender | Before data label text renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_TextRender) |
| CrosshairLabelRender | Before crosshair label renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_CrosshairLabelRender) |

### Selection & Interaction Events

| Event | Description | API Link |
|-------|-------------|----------|
| SelectionComplete | After selection completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_SelectionComplete) |
| DragStart | Drag starts | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_DragStart) |
| Drag | During drag | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_Drag) |
| DragEnd | Drag ends | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_DragEnd) |
| DragComplete | Drag/selection operation completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_DragComplete) |

### Mouse Events

| Event | Description | API Link |
|-------|-------------|----------|
| ChartMouseClick | Chart mouse click | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartMouseClick) |
| ChartDoubleClick | Chart double click | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartDoubleClick) |
| ChartMouseDown | Mouse down | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartMouseDown) |
| ChartMouseUp | Mouse up | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartMouseUp) |
| ChartMouseMove | Mouse move | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartMouseMove) |
| ChartMouseLeave | Mouse leave | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ChartMouseLeave) |

### Zoom & Scroll Events

| Event | Description | API Link |
|-------|-------------|----------|
| OnZooming | During zoom | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_OnZooming) |
| ZoomComplete | After zoom completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ZoomComplete) |
| ScrollStart | Scroll start | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ScrollStart) |
| ScrollChanged | During scroll | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ScrollChanged) |
| ScrollEnd | Scroll end | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_ScrollEnd) |

### Export & Print Events

| Event | Description | API Link |
|-------|-------------|----------|
| BeforeExport | Before export begins | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_BeforeExport) |
| AfterExport | After export completes | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AfterExport) |
| BeforePrint | Before print begins | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_BeforePrint) |

### Other Events

| Event | Description | API Link |
|-------|-------------|----------|
| AnnotationRender | Before annotation renders | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_AnnotationRender) |
| MultiLevelLabelClick | Multi-level label click | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html#Syncfusion_EJ2_Charts_Chart_MultiLevelLabelClick) |

---

## Enumerations

### ChartTheme

```csharp
public enum ChartTheme
{
    Material,
    MaterialDark,
    Bootstrap4,
    Bootstrap5,
    Bootstrap5Dark,
    Fluent,
    FluentDark,
    Tailwind,
    TailwindDark,
    Fabric,
    FabricDark,
    HighContrast,
    HighContrastLight
}
```

### ChartSeriesType

```csharp
public enum ChartSeriesType
{
    Line, Column, Bar, Area, Scatter, SplineArea, StepArea,
    StackingColumn, StackingBar, StackingArea, StepLine, Spline,
    StackingColumn100, StackingBar100, StackingArea100,
    Bubble, Candle, HiLo, HiLoOpenClose, Ohlc,
    RangeColumn, RangeArea, BoxAndWhisker, Waterfall,
    ErrorBar, Polar, Radar, Histogram, Pareto
}
```

### SelectionMode

```csharp
public enum SelectionMode
{
    None,
    Point,
    Series,
    Cluster,
    DragXY,
    DragX,
    DragY,
    Lasso
}
```

### HighlightMode

```csharp
public enum HighlightMode
{
    None,
    Series,
    Point,
    Cluster
}
```

### ValueType

```csharp
public enum ValueType
{
    Category,
    DateTime,
    Numeric,
    Logarithmic
}
```

### SelectionPattern

```csharp
public enum SelectionPattern
{
    None, Chessboard, Dots, DiagonalForward, Crosshatch,
    Pacman, DiagonalBackward, Grid, Turquoise, Star,
    Triangle, Circle, Tile, HorizontalDash, VerticalDash,
    Rectangle, Box, VerticalStripe, HorizontalStripe, Bubble
}
```

### ZoomMode

```csharp
public enum ZoomMode
{
    X,
    Y,
    XY
}
```

### LegendPosition

```csharp
public enum LegendPosition
{
    Top,
    Bottom,
    Left,
    Right,
    Custom
}
```

---

## Related Classes

| Class | Purpose | API Link |
|-------|---------|----------|
| ChartAxis | Axis configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html) |
| ChartSeries | Series configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html) |
| ChartLegendSettings | Legend configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartLegendSettings.html) |
| ChartTooltipSettings | Tooltip configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartTooltipSettings.html) |
| ChartZoomSettings | Zoom configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartZoomSettings.html) |
| ChartCrosshairSettings | Crosshair configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartCrosshairSettings.html) |
| ChartAnnotation | Chart annotations | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAnnotation.html) |
| ChartIndicator | Technical indicators | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartIndicator.html) |
| ChartBorder | Border styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartBorder.html) |
| ChartDataLabelSettings | Data label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartDataLabelSettings.html) |
| ChartMarkerSettings | Data point marker settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartMarkerSettings.html) |
| ChartMargin | Chart margin settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartMargin.html) |
| ChartArea | Chart plotting area | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartArea.html) |
| ChartTitleSettings | Title style settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartTitleSettings.html) |
| ChartDragSettings | Drag interaction settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartDragSettings.html) |
| ChartStackLabelSettings | Stack label settings | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartStackLabelSettings.html) |
| ChartRangeColorSetting | Range color mapping | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartRangeColorSetting.html) |

---

## Common Usage Patterns

### Basic Column Chart

```csharp
@Html.EJS().Chart("chart")
    .PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category))
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(data)
              .XName("Month")
              .YName("Sales")
              .Add();
    })
    .Render()
```

### Multi-Series Chart

```csharp
@Html.EJS().Chart("chart")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(data1)
              .XName("X")
              .YName("Y")
              .Name("Series 1")
              .Add();

        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(data2)
              .XName("X")
              .YName("Y")
              .Name("Series 2")
              .Add();
    })
    .Render()
```

### Chart with Events

```csharp
@Html.EJS().Chart("chart")
    .Load("onLoad")
    .Loaded("onLoaded")
    .PointClick("onPointClick")
    .Render()
```

---

## Namespace Information

**Primary Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Required Using Statements:**

```csharp
using Syncfusion.EJ2;
using Syncfusion.EJ2.Charts;
```

---

## Additional Resources

- **Official Documentation:** https://ej2.syncfusion.com/aspnetmvc/documentation/chart/
- **Chart API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html
- **WebMCP APIs:** `Chart.EnableWebMcp`, `Chart.WebMcpSettings`, `Chart.BeforeWebMcpToolExecute`, and their `ChartBuilder` methods
- **ChartSeries API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartSeries.html
- **ChartAxis API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.ChartAxis.html
- **ASP.NET MVC Chart Demos:** https://ej2.syncfusion.com/aspnetmvc/chart/overview
- **GitHub Examples:** https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/Chart
- **Release Notes:** https://www.syncfusion.com/downloads/support/directdownload/release-notes/aspnet-mvc
