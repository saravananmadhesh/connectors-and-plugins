# Syncfusion EJ2 Smith Chart - Complete API Reference

**Component:** Syncfusion Smith Chart for ASP.NET Core  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Official Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.charts.smithchart.html

---

## Table of Contents

- [SmithChart Class API](#smithchart-class-api)
  - [Constructor](#constructor)
  - [Properties (30 Total)](#properties-30-total)
    - [Container & Display Properties](#container--display-properties)
    - [Positioning & Layout Properties](#positioning--layout-properties)
    - [Styling & Theme Properties](#styling--theme-properties)
    - [Chart Configuration Properties](#chart-configuration-properties)
    - [UI Elements Configuration](#ui-elements-configuration)
    - [Localization](#localization)
- [Series Configuration](#series-configuration)
  - [SmithchartSmithchartSeries Properties](#smithchartsmithchartseries-properties)
  - [SmithchartSmithchartMarker Properties](#smithchartsmithchartmarker-properties)
  - [SmithchartDataLabel Properties](#smithchartdatalabel-properties)
- [Axis Configuration](#axis-configuration)
  - [SmithchartSmithchartAxis Properties](#smithchartsmithchartaxis-properties)
  - [SmithchartSmithchartMajorGridLines Properties](#smithchartsmithchartmajorgridlines-properties)
  - [SmithchartSmithchartMinorGridLines Properties](#smithchartsmithchartminorgridlines-properties)
  - [SmithchartAxisLine Properties](#smithchartaxisline-properties)
- [Styling and Appearance Classes](#styling-and-appearance-classes)
  - [SmithchartTitle Properties](#smithcharttitle-properties)
  - [SmithchartSubtitle Properties](#smithchartsubtitle-properties)
  - [SmithchartSmithchartFont Properties](#smithchartsmithchartfont-properties)
  - [SmithchartSmithchartMargin Properties](#smithchartsmithchartmargin-properties)
  - [SmithchartSmithchartBorder Properties](#smithchartsmithchartborder-properties)
- [Legend and Tooltip](#legend-and-tooltip)
  - [SmithchartSmithchartLegendSettings Properties](#smithchartsmithchartlegendsettings-properties)
  - [SmithchartSeriesTooltip Properties](#smithchartseriestooltip-properties)
- [Events Reference](#events-reference)
  - [Lifecycle Events](#lifecycle-events)
  - [Rendering Events](#rendering-events)
  - [Title and Legend Events](#title-and-legend-events)
  - [Interaction Events](#interaction-events)
  - [Output Events](#output-events)
- [Data Structure](#data-structure)
  - [Required Data Format](#required-data-format)
  - [Point Structure](#point-structure)
- [Common Usage Patterns](#common-usage-patterns)
  - [Basic Smith Chart with Series](#basic-smith-chart-with-series)
  - [Smith Chart with Legend and Tooltip](#smith-chart-with-legend-and-tooltip)
  - [Smith Chart with Title and Subtitle](#smith-chart-with-title-and-subtitle)
  - [Admittance Render Type](#admittance-render-type)
  - [Multiple Series with Different Styles](#multiple-series-with-different-styles)
- [Common Property Combinations](#common-property-combinations)
- [Notes](#notes)

---

## SmithChart Class API

**Primary component class for rendering Smith Charts for RF and transmission line analysis.**

**Namespace:** `Syncfusion.EJ2.Charts`  
**Inheritance:** EJTagHelper  
**[Full API Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html)**

### Constructor

```csharp
public Smithchart()
```

### Properties (30 Total)

#### Container & Display Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Width | string | "" | Width of Smith Chart container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Width) |
| Height | string | "" | Height of Smith Chart container (px, %, em) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Height) |
| Background | string | null | Background color of chart container | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Background) |
| HtmlAttributes | object | null | Custom HTML attributes (title, data-*, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_HtmlAttributes) |

#### Positioning & Layout Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Margin | SmithchartSmithchartMargin | null | Chart margins (top, bottom, left, right) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Margin) |
| Border | SmithchartSmithchartBorder | null | Border styling (width, color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Border) |
| ElementSpacing | double | 10 | Spacing between elements | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_ElementSpacing) |
| Radius | double | 1 | Radius of Smith Chart | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Radius) |

#### Styling & Theme Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Theme | SmithchartTheme | Material | Color theme (Material, Fabric, HighContrast, Bootstrap5, etc.) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Theme) |
| Font | SmithchartSmithchartFont | null | Font styling for labels (family, size, style, weight, color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Font) |

#### Chart Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Series | List<SmithchartSmithchartSeries> | null | Collection of series data for visualization | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Series) |
| HorizontalAxis | SmithchartSmithchartAxis | null | Horizontal axis configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_HorizontalAxis) |
| RadialAxis | SmithchartSmithchartAxis | null | Radial (vertical) axis configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_RadialAxis) |
| RenderType | RenderType | Impedance | Chart render type: Impedance or Admittance | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_RenderType) |

#### UI Elements Configuration

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Title | SmithchartTitle | null | Title configuration (text, subtitle, styling) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Title) |
| LegendSettings | SmithchartSmithchartLegendSettings | null | Legend configuration (position, alignment, visibility) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_LegendSettings) |

#### Localization

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Locale | string | "" | Locale for internationalization (e.g., 'en-US', 'de-DE') | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Locale) |
| EnableRtl | bool | false | Enable right-to-left rendering for RTL languages | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_EnableRtl) |
| EnablePersistence | bool | false | Persist component state between page reloads | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_EnablePersistence) |

---

## Series Configuration

**Configuration for data series in the Smith Chart**

### SmithchartSmithchartSeries Properties

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| Name | string | Series name for legend and identification | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Name) |
| DataSource | object | Array of data objects with resistance/reactance fields | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_DataSource) |
| Points | object | Direct array of point values (alternative to dataSource) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Points) |
| Reactance | string | Field name for reactance values | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Reactance) |
| Resistance | string | Field name for resistance values | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Resistance) |
| Fill | string | Series line/fill color (hex or CSS color) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Fill) |
| Width | double | Series line width | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Width) |
| Opacity | double | Series opacity (0-1) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Opacity) |
| Marker | SmithchartSeriesMarker | Marker styling for data points | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Marker) |
| EnableSmartLabels | bool | Enable smart label positioning | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_EnableSmartLabels) |
| Tooltip | SmithchartSeriesTooltip | Tooltip configuration for series | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Tooltip) |
| Visibility | string | Series visibility toggle | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartSeries.html#Syncfusion_EJ2_Charts_SmithchartSmithchartSeries_Visibility) |

### SmithchartSmithchartMarker Properties

| Property  | Type| Default | Description | API Link |
|-----------|---------------|-------------|----------|
| Visible | bool | false | Enable/disable marker visibility | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Visible) |
| Fill | string | "" | Marker fill color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Fill) |
| Opacity | double | 1 | Marker opacity (0-1) | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Opacity) |
| Border | SmithchartSeriesMarkerBorder | null | Marker border styling| [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Border) |
| Height | double | 6 | Marker height in pixels | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Height) |
| Width | double | 6 | Marker width in pixels | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Width) |
| Shape | string | "circle" | Marker shape: Circle, Diamond, Triangle, Rectangle, Star, Cross, HorizontalLine, VerticalLine, InvertedTriangle, Image | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_Shape) |
| DataLabel | SmithchartSeriesMarkerDataLabel | null | options for customizing marker data label | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_DataLabel) |
| ImageUrl | string | "" | Url for the image that is to be displayed as marker | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarker.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarker_ImageUrl) |


### SmithchartDataLabel Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Visible | bool | false | Show/hide data labels | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarkerDataLabel_Visible) |
| Fill | string | null | Label background color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarkerDataLabel_Fill) |
| Opacity | double | 1 | Label opacity | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarkerDataLabel_Opacity) |
| Border | SmithchartSeriesMarkerDataLabelBorder | null | Label border styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarkerDataLabel_Border) |
| Template | string | "" | showing template for data label template | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarkerDataLabel_Template) |
| TextStyle | object | null | options for customizing font | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesMarkerDataLabel.html#Syncfusion_EJ2_Charts_SmithchartSeriesMarkerDataLabel_TextStyle) |

---

## Axis Configuration

**Configuration for horizontal and radial axes**

### SmithchartSmithchartAxis Properties

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| LabelPosition | LabelPosition | Label position: Inside or Outside | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_LabelPosition) |
| LabelIntersectAction | SmithchartLabelIntersectAction | Action when labels intersect: Hide or None | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_LabelIntersectAction) |
| MajorGridLines | SmithchartSmithchartMajorGridLines | Major grid line configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_MajorGridLines) |
| MinorGridLines | SmithchartSmithchartMinorGridLines | Minor grid line configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_MinorGridLines) |
| AxisLine | SmithchartSmithchartAxisLine | Axis line styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_AxisLine) |
| Visible | bool | Show/hide axis | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxis.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxis_Visible) |

### SmithchartSmithchartMajorGridLines Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Color | string | null | Major grid line color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMajorGridLines_Color) |
| Width | double | 1 | Line width | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMajorGridLines_Width) |
| DashArray | string | "" | Dash array pattern | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMajorGridLines_DashArray) |
| Opacity | double | 1 | Opacity of major grid lines | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMajorGridLines_Opacity) |
| Visible | bool | true | Visibility of major grid lines | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMajorGridLines_Visible) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMajorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMajorGridLines_ContentTemplate) |

### SmithchartSmithchartMinorGridLines Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Color | string | null | Minor grid line color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMinorGridLines_Color) |
| Width | double | 1 | Line width | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMinorGridLines_Width) |
| DashArray | string | "" | Dash array pattern | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMinorGridLines_DashArray) |
| Count | double | 8 | Number of minor grid lines | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMinorGridLines_Count) |
| Visible | bool | false | Visibility of minor grid lines | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMinorGridLines_Visible) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMinorGridLines.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMinorGridLines_ContentTemplate) |

### SmithchartAxisLine Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Visible | bool | true | Show/hide axis line | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLine.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxisLine_Visible) |
| Color | string | null | Line color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLine.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxisLine_Color) |
| Width | double | 1 | Line width | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLine.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxisLine_Width) |
| DashArray | string | "" | Dash array pattern | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLine.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxisLine_DashArray) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartAxisLine.html#Syncfusion_EJ2_Charts_SmithchartSmithchartAxisLine_ContentTemplate) |

---

## Styling and Appearance Classes

### SmithchartTitle Properties

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| Text | string | Title text content | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_Text) |
| Subtitle | SmithchartSubtitle | Subtitle configuration | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_Subtitle) |
| Visible | bool | Title visibility | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_Visible) |
| Font | SmithchartSmithchartFont | Title font styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_Font) |
| TextAlignment | SmithchartAlignment | Title alignment: Near, Center, Far | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_TextAlignment) |
| EnableTrim | bool | Enable text trimming for space constraints | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartTitle.html#Syncfusion_EJ2_Charts_SmithchartTitle_EnableTrim) |

### SmithchartSubtitle Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Text | string | "" | Subtitle text content | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_Text) |
| Visible | bool | true | Subtitle visibility | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_Visible) |
| TextStyle | SmithchartSmithchartFont | null | Subtitle font styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_TextStyle) |
| TextAlignment | SmithchartAlignment | Far | Subtitle alignment: Near, Center, Far | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_TextAlignment) |
| Description | string | "" | description for sub title | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_Description) |
| EnableTrim | bool | true | trim the sub title | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_EnableTrim) |
| MaximumWidth | double | Double.NaN | maximum width of the sub title | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_MaximumWidth) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSubtitle.html#Syncfusion_EJ2_Charts_SmithchartSubtitle_ContentTemplate) |

### SmithchartSmithchartFont Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| FontFamily | string | null | font family for text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_FontFamily) |
| Size | string | "12px" | font size for text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_Size) |
| FontStyle | string | "Normal" | font style for text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_FontStyle) |
| FontWeight | string | "Regular" | font weight for text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_FontWeight) |
| Color | string | "" | Color for the text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_Color) |
| Opacity | double | 1 | font opacity for text | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_Opacity) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartFont.html#Syncfusion_EJ2_Charts_SmithchartSmithchartFont_ContentTemplate) |

### SmithchartSmithchartMargin Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Left | double | 10 | Left margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMargin.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMargin_Left) |
| Right | double | 10 | Right margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMargin.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMargin_Right) |
| Top | double | 10 | Top margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMargin.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMargin_Top) |
| Bottom | double | 10 | Bottom margin | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMargin.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMargin_Bottom) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartMargin.html#Syncfusion_EJ2_Charts_SmithchartSmithchartMargin_ContentTemplate) |

### SmithchartSmithchartBorder Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Color | string | "transparent" | Border color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartBorder.html#Syncfusion_EJ2_Charts_SmithchartSmithchartBorder_Color) |
| Border width | double | 0 | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartBorder.html#Syncfusion_EJ2_Charts_SmithchartSmithchartBorder_Width) |
| Opacity | double | 1 | Border opacity | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartBorder.html#Syncfusion_EJ2_Charts_SmithchartSmithchartBorder_Opacity) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartBorder.html#Syncfusion_EJ2_Charts_SmithchartSmithchartBorder_ContentTemplate) |

---

## Legend and Tooltip

### SmithchartSmithchartLegendSettings Properties

| Property | Type | Description | API Link |
|----------|------|-------------|----------|
| Visible | bool | Show/hide legend | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_Visible) |
| Position | string | Legend position: Top, Bottom, Left, Right, Custom | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_Position) |
| Alignment | SmithchartAlignment | Legend alignment: Near, Center, Far | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_Alignment) |
| ToggleVisibility | bool | Enable series visibility toggling via legend | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_ToggleVisibility) |
| Height | double | Legend shape height | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_Height) |
| Width | double | Legend shape width | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_Width) |
| Border | SmithchartLegendBorder | Legend border styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSmithchartLegendSettings.html#Syncfusion_EJ2_Charts_SmithchartSmithchartLegendSettings_Border) |

### SmithchartSeriesTooltip Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| Visible | bool | false | Show/hide tooltip | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html#Syncfusion_EJ2_Charts_SmithchartSeriesTooltip_Visible) |
| Fill | string | null | Tooltip background color | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html#Syncfusion_EJ2_Charts_SmithchartSeriesTooltip_Fill) |
| Opacity | double | 0.75 | Tooltip opacity | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html#Syncfusion_EJ2_Charts_SmithchartSeriesTooltip_Opacity) |
| Border | SmithchartSeriesTooltipBorder | null | Tooltip border styling | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html#Syncfusion_EJ2_Charts_SmithchartSeriesTooltip_Border) |
| Template | string | "" | Tooltip template string | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html#Syncfusion_EJ2_Charts_SmithchartSeriesTooltip_Template) |
| ContentTemplate | object | - | To get or set value for ContentTemplate | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.SmithchartSeriesTooltip.html#Syncfusion_EJ2_Charts_SmithchartSeriesTooltip_ContentTemplate) |

---

## Events Reference

### Lifecycle Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| Load | string | Triggers before Smith Chart is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Load) |
| Loaded | string | Triggers after Smith Chart is fully rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_Loaded) |

### Rendering Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| SeriesRender | string | Before series is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_SeriesRender) |
| AxisLabelRender | string | Before axis label is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_AxisLabelRender) |
| TextRender | string | Before data label text is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_TextRender) |

### Title and Legend Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| TitleRender | string | Before title is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_TitleRender) |
| SubtitleRender | string | Before subtitle is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_SubtitleRender) |
| LegendRender | string | Before legend is rendered | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_LegendRender) |

### Interaction Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| TooltipRender | string | Before tooltip rendering | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_TooltipRender) |
| AnimationComplete | string | After animation completed | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_AnimationComplete) |

### Output Events

| Event | Type | Trigger Condition | API Link |
|-------|------|-------------------|----------|
| BeforePrint | string | Before print operation starts | [Link](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Charts.Smithchart.html#Syncfusion_EJ2_Charts_Smithchart_BeforePrint) |

---

## Data Structure

### Required Data Format

Smith Chart requires data with **resistance** and **reactance** fields:

```csharp
public class TransmissionData
{
    public double Resistance { get; set; }
    public double Reactance { get; set; }
}

// Example data
var data = new List<TransmissionData>
{
    new TransmissionData { Resistance = 20, Reactance = -50 },
    new TransmissionData { Resistance = 50, Reactance = 0 },
    new TransmissionData { Resistance = 100, Reactance = 50 }
};
```

### Point Structure

Alternative point-based approach:

```csharp
public class SmithchartSmithchartPoint
{
    public double Resistance { get; set; }
    public double Reactance { get; set; }
}
```

---

## Common Usage Patterns

### Basic Smith Chart with Series

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="420px">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="@ViewBag.TransmissionData" 
                  name="Transmission 1" 
                  resistance="Resistance" 
                  reactance="Reactance">
            <e-smithchartseries-marker visible="true">
                <e-series-marker-datalabel visible="true"></e-series-marker-datalabel>
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Smith Chart with Legend and Tooltip

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="420px">
    <e-smithchart-legendsettings visible="true" position="Bottom">
    </e-smithchart-legendsettings>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="@ViewBag.TransmissionData" 
                  name="Series 1" 
                  resistance="Resistance" 
                  reactance="Reactance">
            <e-smithchartseries-tooltip visible="true"></e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Smith Chart with Title and Subtitle

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="420px">
    <e-smithchart-title text="Transmission Line Analysis">
        <e-title-subtitle text="Impedance Matching"></e-title-subtitle>
    </e-smithchart-title>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="@ViewBag.TransmissionData" 
                  name="Line 1" 
                  resistance="Resistance" 
                  reactance="Reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Admittance Render Type

```cshtml
<ejs-smithchart id="smithchart" 
    width="100%" 
    height="420px" 
    renderType="Admittance">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="@ViewBag.AdmittanceData" 
                  name="Admittance" 
                  resistance="Resistance" 
                  reactance="Reactance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Multiple Series with Different Styles

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="420px">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="@ViewBag.Data1" 
                  name="Series 1" 
                  fill="#3DB6E6" 
                  width="2">
        </e-smithchart-smithchartseries>
        <e-smithchart-smithchartseries dataSource="@ViewBag.Data2" 
                  name="Series 2" 
                  fill="#FF6B6B" 
                  width="2">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

---

## Common Property Combinations

- **With Markers and Labels:** Set `marker.visible = true` + `dataLabel.visible = true`
- **With Legend:** Set `legendSettings.visible = true` + `legendSettings.position`
- **Admittance Chart:** Set `renderType = RenderType.Admittance`
- **Smart Labels:** Set `series.enableSmartLabel = true`
- **Custom Axis:** Configure `horizontalAxis` and `radialAxis` properties
- **Interactive Legend:** Set `legendSettings.toggleVisibility = true`
- **RTL Support:** Set `enableRtl = true` + appropriate locale

---

## Notes

- Smith Charts are specifically designed for RF and transmission line analysis
- Data must contain **Resistance** and **Reactance** fields
- RenderType can be set to Impedance (default) or Admittance
- Marker and DataLabel visibility can be toggled per series
- Legend items can toggle series visibility when `toggleVisibility = true`
- Theme must be set during initialization; changing at runtime requires component refresh
- RTL support requires both `enableRtl = true` and proper locale setting
- For complete method signatures and examples, see the official documentation linked at the top

