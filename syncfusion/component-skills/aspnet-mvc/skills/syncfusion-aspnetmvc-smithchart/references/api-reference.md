# Smith Chart API Reference

Complete API reference for the Syncfusion ASP.NET Core Smith Chart ([`Syncfusion.EJ2.Charts.Smithchart`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html)) component.

- **Base API Documentation:** [Smith Chart](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`
- **Version:** 27.1.48+

---

## Table of Contents

- [smithchart-class-api](#smithchart-class-api)
  - [constructor](#constructor)
  - [core-component-properties](#core-component-properties)
    - [container--display-properties](#container--display-properties)
    - [title--subtitle-properties](#title--subtitle-properties)
    - [series-configuration](#series-configuration)
    - [axis-configuration](#axis-configuration)
    - [legend-properties](#legend-properties)
    - [grid-lines-properties](#grid-lines-properties)
    - [styling--appearance-properties](#styling--appearance-properties)
  - [events-reference](#events-reference)
- [related-settings-classes](#related-settings-classes)
  - [title--subtitle-classes](#title--subtitle-classes)
  - [appearance--styling-classes](#appearance--styling-classes)
  - [layout-classes](#layout-classes)
  - [grid-line-classes](#grid-line-classes)
  - [axis-configuration-classes](#axis-configuration-classes)
  - [legend-classes](#legend-classes)
  - [series-configuration-classes](#series-configuration-classes)
    - [series-base-classes](#series-base-classes)
    - [marker-configuration-classes](#marker-configuration-classes)
    - [data-label-classes](#data-label-classes)
    - [tooltip-classes](#tooltip-classes)
  - [collection-classes](#collection-classes)
- [enumerations](#enumerations)
  - [smithcharttheme](#smithcharttheme)
  - [smithchartalignment](#smithchartalignment)
  - [smithchartlabelintersectaction](#smithchartlabelintersectaction)
  - [rendertype](#rendertype)
- [common-usage-patterns](#common-usage-patterns)
- [notes](#notes)
- [ai-skill-definition--code-generation-guidelines](#ai-skill-definition--code-generation-guidelines)
  - [component-capability-skill](#component-capability-skill)
  - [code-blueprint](#code-blueprint)
  - [strict-implementation-notes](#strict-implementation-notes)
- [additional-resources](#additional-resources)

---

## Smithchart Class API

**Primary component class for rendering Smith Charts with impedance and admittance visualization.**

**Namespace:** `Syncfusion.EJ2.Charts`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html)**

### Constructor

```csharp
public Smithchart()
```

Creates a new instance of the Smithchart component.

### Core Component Properties

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`Width`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Width) | `string` | "" | Width of the Smithchart container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Width) |
| [`Height`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Height) | `string` | "" | Height of the Smithchart container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Height) |
| [`Background`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Background) | `string` | null | Background color of the Smithchart (hex, rgba) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Background) |
| [`HtmlAttributes`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_HtmlAttributes) | `object` | - | Custom HTML attributes (title, data-*, etc.) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_HtmlAttributes) |

#### Title & Subtitle Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`Title`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Title) | `SmithchartTitle` | null | Main chart title configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Title) |
| [`Subtitle`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_Subtitle) | `SmithchartSubtitle` | null | Chart subtitle configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_Subtitle) |

#### Series Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`Series`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Series) | `List<SmithchartSmithchartSeries>` | null | Collection of data series for the chart | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Series) |

#### Axis Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`HorizontalAxis`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_HorizontalAxis) | `SmithchartSmithchartAxis` | null | Horizontal (resistance) axis configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_HorizontalAxis) |
| [`RadialAxis`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_RadialAxis) | `SmithchartSmithchartAxis` | null | Radial (reactance) axis configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_RadialAxis) |

#### Legend Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`LegendSettings`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_LegendSettings) | `SmithchartSmithchartLegendSettings` | null | Legend position, alignment, and styling | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_LegendSettings) |

#### Grid Lines Properties

Grid lines are configured under HorizontalAxis and RadialAxis:

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`MajorGridLines`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_MajorGridLines) | `SmithchartSmithchartMajorGridLines` | null | Major grid lines styling and configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_MajorGridLines) |
| [`MinorGridLines`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_MinorGridLines) | `SmithchartSmithchartMinorGridLines` | null | Minor grid lines styling and configuration | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_MinorGridLines) |

#### Styling & Appearance Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| [`Theme`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Theme) | `SmithchartTheme` | Material | Predefined theme (Fluent, Material, HighContrast, Bootstrap) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Theme) |
| [`Border`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Border) | `SmithchartSmithchartBorder` | null | Chart border styling (width, color, opacity) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Border) |
| [`Margin`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Margin) | `SmithchartSmithchartMargin` | null | Chart margins (top, bottom, left, right) | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Margin) |
| [`Font`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Font) | `SmithchartSmithchartFont` | null | Default font configuration for chart text | [Link](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Font) |

### Events Reference

```csharp
public string Load { get; set; }              // Before Smithchart loads
public string Loaded { get; set; }            // After Smithchart fully loads
public string SubtitleRender { get; set; }    // Triggers before the sub-title is rendered
public string TextRender { get; set; }        // Triggers before the datalabel text is rendered.
public string SeriesRender { get; set; }      // Before series renders
public string TitleRender { get; set; }       // Triggers before the title is rendered
public string LegendRender { get; set; }      // Before legend renders
public string TooltipRender { get; set; }     // Before tooltip renders
```

---

## Related Settings Classes

### Title & Subtitle Classes

- **[`SmithchartTitle`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html)** - Configuration class for chart title
- **[`SmithchartTitleBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartTitleBuilder.html)** - Fluent builder for SmithchartTitle
- **[`SmithchartSubtitle`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html)** - Configuration class for chart subtitle
- **[`SmithchartSubtitleBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSubtitleBuilder.html)** - Fluent builder for SmithchartSubtitle

### Appearance & Styling Classes

- **[`SmithchartSmithchartBorder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartBorder.html)** - Configuration class for chart border styling
- **[`SmithchartSmithchartBorderBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartBorderBuilder.html)** - Fluent builder for SmithchartSmithchartBorder
- **[`SmithchartSmithchartFont`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html)** - Configuration class for font styling
- **[`SmithchartSmithchartFontBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFontBuilder.html)** - Fluent builder for SmithchartSmithchartFont

### Layout Classes

- **[`SmithchartSmithchartMargin`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMargin.html)** - Configuration class for chart margins
- **[`SmithchartSmithchartMarginBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMarginBuilder.html)** - Fluent builder for SmithchartSmithchartMargin

### Grid Line Classes

- **[`SmithchartSmithchartMajorGridLines`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html)** - Configuration class for major grid lines
- **[`SmithchartSmithchartMajorGridLinesBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLinesBuilder.html)** - Fluent builder for SmithchartSmithchartMajorGridLines
- **[`SmithchartSmithchartMinorGridLines`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html)** - Configuration class for minor grid lines
- **[`SmithchartSmithchartMinorGridLinesBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLinesBuilder.html)** - Fluent builder for SmithchartSmithchartMinorGridLines

### Axis Configuration Classes

- **[`SmithchartSmithchartAxis`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html)** - Configuration class for axis properties
- **[`SmithchartSmithchartAxisBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisBuilder.html)** - Fluent builder for SmithchartSmithchartAxis
- **[`SmithchartSmithchartAxisLine`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLine.html)** - Configuration class for axis line styling
- **[`SmithchartSmithchartAxisLineBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLineBuilder.html)** - Fluent builder for SmithchartSmithchartAxisLine

### Legend Classes

- **[`SmithchartSmithchartLegendSettings`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html)** - Configuration class for legend settings
- **[`SmithchartSmithchartLegendSettingsBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettingsBuilder.html)** - Fluent builder for SmithchartSmithchartLegendSettings
- **[`SmithchartLegendBorder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendBorder.html)** - Configuration class for legend border
- **[`SmithchartLegendBorderBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendBorderBuilder.html)** - Fluent builder for SmithchartLegendBorder
- **[`SmithchartLegendLocation`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendLocation.html)** - Configuration class for legend location
- **[`SmithchartLegendLocationBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendLocationBuilder.html)** - Fluent builder for SmithchartLegendLocation
- **[`SmithchartLegendTitle`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendTitle.html)** - Configuration class for legend title
- **[`SmithchartLegendTitleBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendTitleBuilder.html)** - Fluent builder for SmithchartLegendTitle
- **[`SmithchartLegendItemStyle`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendItemStyle.html)** - Configuration class for legend item styling
- **[`SmithchartLegendItemStyleBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartLegendItemStyleBuilder.html)** - Fluent builder for SmithchartLegendItemStyle

### Series Configuration Classes

#### Series Base Classes

- **[`SmithchartSmithchartSeries`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html)** - Configuration class for series properties
- **[`SmithchartSmithchartSeriesBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeriesBuilder.html)** - Fluent builder for SmithchartSmithchartSeries

#### Marker Configuration Classes

- **[`SmithchartSeriesMarker`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html)** - Configuration class for series markers
- **[`SmithchartSeriesMarkerBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerBuilder.html)** - Fluent builder for SmithchartSeriesMarker
- **[`SmithchartSeriesMarkerBorder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerBorder.html)** - Configuration class for marker border
- **[`SmithchartSeriesMarkerBorderBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerBorderBuilder.html)** - Fluent builder for SmithchartSeriesMarkerBorder

#### Data Label Classes

- **[`SmithchartSeriesMarkerDataLabel`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html)** - Configuration class for data labels
- **[`SmithchartSeriesMarkerDataLabelBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabelBuilder.html)** - Fluent builder for SmithchartSeriesMarkerDataLabel
- **[`SmithchartSeriesMarkerDataLabelBorder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabelBorder.html)** - Configuration class for data label border
- **[`SmithchartSeriesMarkerDataLabelBorderBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabelBorderBuilder.html)** - Fluent builder for SmithchartSeriesMarkerDataLabelBorder
- **[`SmithchartSeriesMarkerDataLabelConnectorLine`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabelConnectorLine.html)** - Configuration class for data label connector line
- **[`SmithchartSeriesMarkerDataLabelConnectorLineBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabelConnectorLineBuilder.html)** - Fluent builder for SmithchartSeriesMarkerDataLabelConnectorLine

#### Tooltip Classes

- **[`SmithchartSeriesTooltip`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html)** - Configuration class for series tooltip
- **[`SmithchartSeriesTooltipBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltipBuilder.html)** - Fluent builder for SmithchartSeriesTooltip
- **[`SmithchartSeriesTooltipBorder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltipBorder.html)** - Configuration class for tooltip border
- **[`SmithchartSeriesTooltipBorderBuilder`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltipBorderBuilder.html)** - Fluent builder for SmithchartSeriesTooltipBorder

### Collection Classes

- **[`SmithchartSmithchartSeriesCollection`](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeriesCollection.html)** - Collection management class for multiple series

---

## Enumerations

### SmithchartTheme

```csharp
public enum SmithchartTheme
{
    Fluent,           
    FluentDark,
    Material,           // Default
    MaterialDark,
    Bootstrap4,
    Bootstrap5,
    Bootstrap5Dark,
    HighContrast,
    HighContrastLight
}
```

### SmithchartAlignment

```csharp
public enum SmithchartAlignment
{
    Near,     // Align to the near edge
    Center,   // Center alignment
    Far       // Align to the far edge
}
```

### SmithchartLabelIntersectAction

```csharp
public enum SmithchartLabelIntersectAction
{
    None,     // No action on intersection
    Hide,     // Hide intersecting labels
}
```

### RenderType

```csharp
public enum RenderType
{
    Impedance,  // Impedance representation
    Admittance  // Admittance representation
}
```

---

## Common Usage Patterns

- **Basic Smith Chart with Series Data:** Bind impedance and reactance data to the chart with `Resistance` and `Reactance` properties on series objects.
- **Styling with Themes:** Apply predefined themes (Fluent, Material, Bootstrap, HighContrast) via the `Theme` property for consistent visual appearance.
- **Customizing Grid Lines:** Configure major and minor grid lines via `MajorGridLines` and `MinorGridLines` settings for enhanced readability.
- **Axis Configuration:** Set horizontal (resistance) and radial (reactance) axis labels, ranges, and intersection actions via `HorizontalAxis` and `RadialAxis` properties.
- **Legend Positioning:** Place and style legends using `LegendSettings` with configurable location, border, and item styling.
- **Series Markers & Labels:** Add visual markers to data points and enable data labels with `Marker` and `DataLabel` sub-properties on series.
- **Tooltip Customization:** Enable interactive tooltips on series points via `Tooltip` property with customizable borders and visibility behavior.
- **Responsive Sizing:** Set container dimensions with `Width` and `Height` properties supporting pixel (px) and percentage (%) units for flexible layouts.

---

## Notes

- The Smith Chart is specialized for electrical impedance and admittance visualization in RF and microwave engineering.
- Data mapping requires `Resistance` (horizontal) and `Reactance` (radial) properties on series for proper chart rendering.
- Builder classes enable fluent API configuration chains for more readable code: `.Series(s => s.Marker(m => m.Visible(true)).Add())`.
- Default theme is Material with support for dark variants for accessibility and modern UI standards.
- All styling properties (borders, fonts, colors) follow Syncfusion EJ2 standards for consistency across components.

---

## AI Skill Definition & Code Generation Guidelines

### Component Capability (Skill)

**Objective:** Enable an AI agent to programmatically generate C# and Razor markup for Syncfusion Smith Chart setups with impedance/admittance data visualization.

**Rules for Generation:**

1. **Data Mapping Enforcement:** Always map series data with `Resistance` and `Reactance` properties mapping to the underlying data object properties representing impedance components.
2. **Default Dimensions:** If unspecified, use `Width: "100%"` and `Height: "420px"` for standard responsive layouts without hardcoded pixel dimensions unless explicitly requested.
3. **Theme Consistency:** Default to `Theme: SmithchartTheme.Fluent` unless the user specifies an alternative; dark variants (`FluentDark`, `MaterialDark`, `Bootstrap5Dark`) should be used when dark mode is requested.
4. **Series Initialization:** Every series must include at least `Name`, `DataSource`, `Resistance`, and `Reactance` properties; optional properties (markers, labels, tooltips) should only be added if requested.
5. **Axis Configuration:** Horizontal axis defaults to resistance range (e.g., 0-5 ohms) and radial axis to reactance range (e.g., -5 to +5 ohms); adjust ranges based on data scale if needed.
6. **Fallback CSS Scale:** If responsive constraints conflict with explicit sizing, generate CSS media queries with breakpoints (320px mobile, 768px tablet, 1024px desktop) for graceful scaling.

### Code Blueprint

```cshtml
@Html.EJS().Smithchart("smithchart")
    .Width("100%")
    .Height("420px")
    .Theme(SmithchartTheme.Fluent)
    .HorizontalAxis(h => h
        .MajorGridLines(mg => mg
            .Visible(true)
            .Width(1)
            .DashArray("")
            .Opacity(1)))
    .Title(t => t.Text("Impedance Smith Chart"))
    .Series(series =>
    {
        series
            .DataSource(impedanceData)
            .Name("Network Data")
            .Resistance("Resistance")
            .Reactance("Reactance")
            .Marker(m => m.Visible(true))
            .Tooltip(tp => tp.Visible(true))
            .Add();
    })
    .LegendSettings(l => l.Visible(true))
    .Loaded("onLoaded")
    .Render()

<script>
function onLoaded(args) {
    console.log("Smith Chart loaded successfully");
}
</script>
```

### Strict Implementation Notes

1. Always include the `@Html.EJS()` tag helper and close with `.Render()` for proper ASP.NET MVC integration.
2. Use builder method chaining (`.Build()`) on nested configuration objects for fluent API readability.
3. Event handlers (e.g., `Loaded`) should reference JavaScript function names without parentheses.
4. Series `DataSource` should be a C# object collection or ActionResult returning JSON; validate that data structure matches mapped properties.
5. If multiple series are needed, call `.Add()` after each series configuration to append to the collection.
6. Test responsiveness by verifying that `.Width("100%")` adapts to container changes without horizontal scrolling.
7. Ensure axis labels and legend text are human-readable and localized if required by the use case.

---

## Additional Resources

- **Official Documentation:** https://ej2.syncfusion.com/aspnetmvc/documentation/smithchart/getting-started
- **API Reference:** https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Smithchart.html
- **Component Demos:** https://ej2.syncfusion.com/aspnetmvc/smithchart/default#/fluent2
- **GitHub Examples:** https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/SmithChart/
