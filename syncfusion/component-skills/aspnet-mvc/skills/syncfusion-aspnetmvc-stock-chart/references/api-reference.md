# MVC StockChart API Reference

Base URL: [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html)

Complete API reference for the **Syncfusion ASP.NET MVC EJ2 StockChart** component.

**Component:** Syncfusion ASP.NET MVC EJ2 StockChart  
**Class:** `StockChart`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

> **Default value rule used below**
> - If the API explicitly provides a default value, it is shown exactly.
> - If the API does **not** explicitly provide a default value, the default is shown as `-`.

---

## Table of Contents

- [StockChart Class](#stockchart-class)
  - [Inheritance](#inheritance)
  - [Syntax](#syntax)
- [Constructors](#constructors)
  - [StockChart()](#stockchart)
- [Properties](#properties)
- [Event Properties](#event-properties)
- [Event Usage Example](#event-usage-example)
- [StockChartAnnotationSettings Class](#stockchartannotationsettings-class)
  - [Inheritance](#inheritance-1)
  - [Syntax](#syntax-1)
  - [Constructors](#constructors-1)
    - [StockChartAnnotationSettings()](#stockchartannotationsettings)
- [StockChartAnimation Class](#stockchartanimation-class)
  - [Inheritance](#inheritance-2)
  - [Syntax](#syntax-2)
  - [Constructors](#constructors-2)
    - [StockChartAnimation()](#stockchartanimation)
  - [Properties](#properties-1)
- [StockChartChartArea Class](#stockchartchartarea-class)
  - [Inheritance](#inheritance-3)
  - [Syntax](#syntax-3)
  - [Constructors](#constructors-3)
    - [StockChartChartArea()](#stockchartchartarea)
  - [Properties](#properties-2)
- [StockChartChartAreaBorder Class](#stockchartchartareaborder-class)
  - [Inheritance](#inheritance-4)
  - [Syntax](#syntax-4)
  - [Constructors](#constructors-4)
    - [StockChartChartAreaBorder()](#stockchartchartareaborder)
  - [Inherited Members](#inherited-members)
- [StockChartChartBorder Class](#stockchartchartborder-class)
  - [Inheritance](#inheritance-5)
  - [Syntax](#syntax-5)
  - [Constructors](#constructors-5)
    - [StockChartChartBorder()](#stockchartchartborder)
  - [Inherited Members](#inherited-members-1)
- [StockChartChartMargin Class](#stockchartchartmargin-class)
  - [Inheritance](#inheritance-6)
  - [Syntax](#syntax-6)
  - [Constructors](#constructors-6)
    - [StockChartChartMargin()](#stockchartchartmargin)
  - [Inherited Members](#inherited-members-2)
- [StockChartStockChartAxis Class](#stockchartstockchartaxis-class)
  - [Inheritance](#inheritance-7)
  - [Syntax](#syntax-7)
  - [Constructors](#constructors-7)
    - [StockChartStockChartAxis()](#stockchartstockchartaxis)
  - [Properties](#properties-3)
- [StockChartPrimaryXAxis Class](#stockchartprimaryxaxis-class)
  - [Inheritance](#inheritance-8)
  - [Syntax](#syntax-8)
  - [Constructors](#constructors-8)
    - [StockChartPrimaryXAxis()](#stockchartprimaryxaxis)
- [StockChartPrimaryYAxis Class](#stockchartprimaryyaxis-class)
  - [Inheritance](#inheritance-9)
  - [Syntax](#syntax-9)
  - [Constructors](#constructors-9)
    - [StockChartPrimaryYAxis()](#stockchartprimaryyaxis)
- [StockChartCrosshairSettings Class](#stockchartcrosshairsettings-class)
  - [Inheritance](#inheritance-10)
  - [Syntax](#syntax-10)
  - [Constructors](#constructors-10)
    - [StockChartCrosshairSettings()](#stockchartcrosshairsettings)
  - [Properties](#properties-4)
- [StockChartCrosshairLine Class](#stockchartcrosshairline-class)
  - [Inheritance](#inheritance-11)
  - [Syntax](#syntax-11)
  - [Constructors](#constructors-11)
    - [StockChartCrosshairLine()](#stockchartcrosshairline)
- [StockChartCrosshairTooltip Class](#stockchartcrosshairtooltip-class)
  - [Inheritance](#inheritance-12)
  - [Syntax](#syntax-12)
  - [Constructors](#constructors-12)
    - [StockChartCrosshairTooltip()](#stockchartcrosshairtooltip)
  - [Properties](#properties-5)
- [StockChartZoomSettings Class](#stockchartzoomsettings-class)
  - [Inheritance](#inheritance-13)
  - [Syntax](#syntax-13)
  - [Constructors](#constructors-13)
    - [StockChartZoomSettings()](#stockchartzoomsettings)
  - [Properties](#properties-6)
- [StockChartConnector Class](#stockchartconnector-class)
  - [Inheritance](#inheritance-14)
  - [Syntax](#syntax-14)
  - [Constructors](#constructors-14)
    - [StockChartConnector()](#stockchartconnector)
  - [Properties](#properties-7)
- [StockChartLowerLine Class](#stockchartlowerline-class)
  - [Inheritance](#inheritance-15)
  - [Syntax](#syntax-15)
  - [Constructors](#constructors-15)
    - [StockChartLowerLine()](#stockchartlowerline)
- [StockChartUpperLine Class](#stockchartupperline-class)
  - [Inheritance](#inheritance-16)
  - [Syntax](#syntax-16)
  - [Constructors](#constructors-16)
    - [StockChartUpperLine()](#stockchartupperline)
- [StockChartPeriodLine Class](#stockchartperiodline-class)
  - [Inheritance](#inheritance-17)
  - [Syntax](#syntax-17)
  - [Constructors](#constructors-17)
    - [StockChartPeriodLine()](#stockchartperiodline)
- [StockChartStockChartSeries Class](#stockchartstockchartseries-class)
  - [Inheritance](#inheritance-18)
  - [Syntax](#syntax-18)
  - [Constructors](#constructors-18)
    - [StockChartStockChartSeries()](#stockchartstockchartseries)
  - [Properties](#properties-8)
- [StockChartSeriesBorder Class](#stockchartseriesborder-class)
  - [Inheritance](#inheritance-19)
  - [Syntax](#syntax-19)
  - [Constructors](#constructors-19)
    - [StockChartSeriesBorder()](#stockchartseriesborder)
  - [Inherited Members](#inherited-members-3)
- [StockChartMarkerSettings Class](#stockchartmarkersettings-class)
  - [Inheritance](#inheritance-20)
  - [Syntax](#syntax-20)
  - [Constructors](#constructors-20)
    - [StockChartMarkerSettings()](#stockchartmarkersettings)
  - [Properties](#properties-9)
- [StockChartSeriesMarker Class](#stockchartseriesmarker-class)
  - [Inheritance](#inheritance-21)
  - [Syntax](#syntax-21)
  - [Constructors](#constructors-21)
    - [StockChartSeriesMarker()](#stockchartseriesmarker)
- [StockChartStockChartIndicator Class](#stockchartstockchartindicator-class)
  - [Inheritance](#inheritance-22)
  - [Syntax](#syntax-22)
  - [Constructors](#constructors-22)
    - [StockChartStockChartIndicator()](#stockchartstockchartindicator)
  - [Properties](#properties-10)
- [StockChartTrendlines Class](#stockcharttrendlines-class)
  - [Inheritance](#inheritance-23)
  - [Syntax](#syntax-23)
  - [Constructors](#constructors-23)
    - [StockChartTrendlines()](#stockcharttrendlines)
  - [Properties](#properties-11)
- [StockChartStockTooltipSettings Class](#stockchartstocktooltipsettings-class)
  - [Inheritance](#inheritance-24)
  - [Syntax](#syntax-24)
  - [Constructors](#constructors-24)
    - [StockChartStockTooltipSettings()](#stockchartstocktooltipsettings)
  - [Properties](#properties-12)
- [StockChartStockChartLegendSettings Class](#stockchartstockchartlegendsettings-class)
  - [Inheritance](#inheritance-25)
  - [Syntax](#syntax-25)
  - [Constructors](#constructors-25)
    - [StockChartStockChartLegendSettings()](#stockchartstockchartlegendsettings)
  - [Properties](#properties-13)
- [StockChartLegendBorder Class](#stockchartlegendborder-class)
  - [Inheritance](#inheritance-26)
  - [Syntax](#syntax-26)
  - [Constructors](#constructors-26)
    - [StockChartLegendBorder()](#stockchartlegendborder)
  - [Inherited Members](#inherited-members-4)
- [StockChartLegendTextStyle Class](#stockchartlegendtextstyle-class)
  - [Inheritance](#inheritance-27)
  - [Syntax](#syntax-27)
  - [Constructors](#constructors-27)
    - [StockChartLegendTextStyle()](#stockchartlegendtextstyle)
  - [Inherited Members](#inherited-members-5)
- [StockChartLegendTitleStyle Class](#stockchartlegendtitlestyle-class)
  - [Inheritance](#inheritance-28)
  - [Syntax](#syntax-28)
  - [Constructors](#constructors-28)
    - [StockChartLegendTitleStyle()](#stockchartlegendtitlestyle)
  - [Inherited Members](#inherited-members-6)
- [StockChartLastValueLabelSettings Class](#stockchartlastvaluelabelsettings-class)
  - [Inheritance](#inheritance-29)
  - [Syntax](#syntax-29)
  - [Constructors](#constructors-29)
    - [StockChartLastValueLabelSettings()](#stockchartlastvaluelabelsettings)
  - [Properties](#properties-14)
- [StockChartStockChartPeriod Class](#stockchartstockchartperiod-class)
  - [Inheritance](#inheritance-30)
  - [Syntax](#syntax-30)
  - [Constructors](#constructors-30)
    - [StockChartStockChartPeriod()](#stockchartstockchartperiod)
  - [Properties](#properties-15)
- [StockChartStockChartRow Class](#stockchartstockchartrow-class)
  - [Inheritance](#inheritance-31)
  - [Syntax](#syntax-31)
  - [Constructors](#constructors-31)
    - [StockChartStockChartRow()](#stockchartstockchartrow)
  - [Properties](#properties-16)
- [StockChartStockChartSelectedDataIndex Class](#stockchartstockchartselecteddataindex-class)
  - [Inheritance](#inheritance-32)
  - [Syntax](#syntax-32)
  - [Constructors](#constructors-32)
    - [StockChartStockChartSelectedDataIndex()](#stockchartstockchartselecteddataindex)
  - [Properties](#properties-17)
- [StockEvent Class](#stockevent-class)
  - [Inheritance](#inheritance-33)
  - [Syntax](#syntax-33)
  - [Constructors](#constructors-33)
    - [StockEvent()](#stockevent)
  - [Properties](#properties-18)
- [StockChartStockEvents Class](#stockchartstockevents-class)
  - [Inheritance](#inheritance-34)
  - [Syntax](#syntax-34)
  - [Constructors](#constructors-34)
    - [StockChartStockEvents()](#stockchartstockevents)
- [StockChartStockEventsBorder Class](#stockchartstockeventsborder-class)
  - [Inheritance](#inheritance-35)
  - [Syntax](#syntax-35)
  - [Constructors](#constructors-35)
    - [StockChartStockEventsBorder()](#stockchartstockeventsborder)
- [StockChartStockEventsTextStyle Class](#stockchartstockeventstextstyle-class)
  - [Inheritance](#inheritance-36)
  - [Syntax](#syntax-36)
  - [Constructors](#constructors-36)
    - [StockChartStockEventsTextStyle()](#stockchartstockeventstextstyle)
- [Wrapper / Collection Classes](#wrapper--collection-classes)
  - [1) StockChartStockChartAnnotations](#1-stockchartstockchartannotations)
  - [2) StockChartStockChartAxes](#2-stockchartstockchartaxes)
  - [3) StockChartStockChartIndicators](#3-stockchartstockchartindicators)
  - [4) StockChartStockChartPeriods](#4-stockchartstockchartperiods)
  - [5) StockChartStockChartRows](#5-stockchartstockchartrows)
  - [6) StockChartStockChartSelectedDataIndexes](#6-stockchartstockchartselecteddataindexes)
  - [7) StockChartStockChartSeriesCollection](#7-stockchartstockchartseriescollection)
  - [8) StockChartStockChartTrendlines](#8-stockchartstockcharttrendlines)
  - [Wrapper-Class Note](#wrapper-class-note)
- [Builder Classes](#builder-classes)
  - [StockChartStockChartAxisBuilder](#stockchartstockchartaxisbuilder)
  - [StockChartStockChartIndicatorBuilder](#stockchartstockchartindicatorbuilder)
  - [StockChartStockChartLegendSettingsBuilder](#stockchartstockchartlegendsettingsbuilder)
  - [StockChartStockChartPeriodBuilder](#stockchartstockchartperiodbuilder)
  - [StockChartStockChartRowBuilder](#stockchartstockchartrowbuilder)
  - [StockChartStockChartSelectedDataIndexBuilder](#stockchartstockchartselecteddataindexbuilder)
  - [StockChartStockChartSeriesBuilder](#stockchartstockchartseriesbuilder)
  - [StockChartStockTooltipSettingsBuilder](#stockchartstocktooltipsettingsbuilder)
  - [StockChartStockEventBuilder](#stockchartstockeventbuilder)
  - [StockChartTrendlinesBuilder](#stockcharttrendlinesbuilder)
  - [StockChartZoomSettingsBuilder](#stockchartzoomsettingsbuilder)
  - [StockChartSeriesLabelSettingsBuilder](#stockchartserieslabelsettingsbuilder)
- [Final Completion Note](#final-completion-note)

---

## StockChart Class

**Class:** `StockChart`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

Represents the ASP.NET MVC StockChart wrapper used to render financial charts with selector, period selector, technical indicators, multiple axes, multiple rows, legend, tooltip, crosshair, zooming, annotations, and interactive events.

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChart`

### Syntax

```csharp
public class StockChart : EJTagHelper
```

---

## Constructors

### `StockChart()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart__ctor)

---

## Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Annotations` | `List<StockChartAnnotationSettings>` | `null` | The configuration for annotation in chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Annotations](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Annotations) |
| `Axes` | `List<StockChartStockChartAxis>` | `null` | Secondary axis collection for the stockChart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Axes](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Axes) |
| `AxisLabelRender` | `string` | `null` | Triggers before each axis label is rendered. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_AxisLabelRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_AxisLabelRender) |
| `Background` | `string` | `null` | The background color of the stockChart that accepts value in hex and rgba as a valid CSS color string. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Background](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Background) |
| `BeforeExport` | `string` | `null` | Triggers before the export process begins. This event allows for the customization of export settings before the chart is exported. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_BeforeExport](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_BeforeExport) |
| `Border` | `StockChartChartBorder` | `null` | Options for customizing the color and width of the stockChart border. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Border) |
| `ChartArea` | `StockChartChartArea` | `null` | Options for configuring the border and background of the stockChart area. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ChartArea](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ChartArea) |
| `Crosshair` | `StockChartCrosshairSettings` | `null` | Options for customizing the crosshair of the chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Crosshair](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Crosshair) |
| `DataSource` | `object` | `null` | Specifies the DataSource for the stockChart. It can be an array of JSON objects or an instance of DataManager. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_DataSource](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_DataSource) |
| `EnableCustomRange` | `bool` | `true` | Custom range support for the stockChart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableCustomRange](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableCustomRange) |
| `EnablePeriodSelector` | `bool` | `true` | It specifies whether the periodSelector is rendered in financial chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnablePeriodSelector](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnablePeriodSelector) |
| `EnablePersistence` | `bool` | `false` | Enable or disable persisting component state between page reloads. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnablePersistence](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnablePersistence) |
| `EnableRtl` | `bool` | `false` | Enable or disable rendering component in right to left direction. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableRtl](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableRtl) |
| `EnableSelector` | `bool` | `true` | It specifies whether the range navigator / selector is rendered in financial chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableSelector](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_EnableSelector) |
| `ExportType` | `object` | `null` | It specifies the types of export types in financial chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ExportType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_ExportType) |
| `Height` | `string` | `null` | The height of the stockChart as a string accepts input both as `100px` or `100%`. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Height](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Height) |
| `HtmlAttributes` | `object` | `-` | Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_HtmlAttributes](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_HtmlAttributes) |
| `Indicators` | `List<StockChartStockChartIndicator>` | `null` | Defines the collection of technical indicators, that are used in financial markets. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Indicators](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Indicators) |
| `IndicatorType` | `object` | `null` | It specifies the types of indicators in financial chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IndicatorType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IndicatorType) |
| `IsMultiSelect` | `bool` | `false` | If set true, enables the multi selection in chart. It requires selectionMode to be Point \| Series \| or Cluster. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsMultiSelect](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsMultiSelect) |
| `IsSelect` | `bool` | `false` | If set true, enables the selection state in chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsSelect](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsSelect) |
| `IsTransposed` | `bool` | `false` | It specifies whether the stockChart should be rendered in transposed manner or not. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsTransposed](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_IsTransposed) |
| `LegendClick` | `string` | `null` | Triggers after click on legend. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendClick) |
| `LegendRender` | `string` | `null` | Triggers before the legend is rendered. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendRender) |
| `LegendSettings` | `StockChartStockChartLegendSettings` | `null` | Options for customizing the legend of the stockChart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendSettings) |
| `Load` | `string` | `null` | Triggers before the range navigator rendering. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Load](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Load) |
| `Loaded` | `string` | `null` | Triggers after the range navigator rendering. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Loaded](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Loaded) |
| `Locale` | `string` | `""` | Overrides the global culture and localization value for this component. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Locale](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Locale) |
| `Margin` | `StockChartChartMargin` | `null` | Options to customize left, right, top and bottom margins of the stockChart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Margin](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Margin) |
| `NoDataTemplate` | `object` | `null` | Specifies the template to be displayed when the chart has no data. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_NoDataTemplate](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_NoDataTemplate) |
| `OnZooming` | `string` | `null` | Triggers after the zoom selection is completed. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_OnZooming](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_OnZooming) |
| `Periods` | `List<StockChartStockChartPeriod>` | `null` | To configure period selector options. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Periods](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Periods) |
| `PointClick` | `string` | `null` | Triggers on point click. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointClick) |
| `PointMove` | `string` | `null` | Triggers on point move. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointMove) |
| `PrimaryXAxis` | `StockChartPrimaryXAxis` | `null` | Options to configure the horizontal axis. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PrimaryXAxis](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PrimaryXAxis) |
| `PrimaryYAxis` | `StockChartPrimaryYAxis` | `null` | Options to configure the vertical axis. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PrimaryYAxis](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PrimaryYAxis) |
| `RangeChange` | `string` | `null` | Triggers if the range is changed. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_RangeChange](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_RangeChange) |
| `Rows` | `List<StockChartStockChartRow>` | `null` | Options to split stockChart into multiple plotting areas horizontally. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Rows](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Rows) |
| `SelectedDataIndexes` | `List<StockChartStockChartSelectedDataIndex>` | `null` | Specifies the point indexes to be selected while loading a chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectedDataIndexes](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectedDataIndexes) |
| `SelectionMode` | `SelectionMode` | `SelectionMode.None` | Specifies whether series or data point has to be selected. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectionMode](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectionMode) |
| `SelectorRender` | `string` | `null` | Triggers before render the selector. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectorRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectorRender) |
| `Series` | `List<StockChartStockChartSeries>` | `null` | The configuration for series in the stockChart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Series](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Series) |
| `SeriesRender` | `string` | `null` | Triggers before the series is rendered. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesRender) |
| `SeriesType` | `object` | `null` | It specifies the types of series in financial chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesType) |
| `StockChartMouseClick` | `string` | `null` | Triggers on clicking the stock chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseClick) |
| `StockChartMouseDown` | `string` | `null` | Triggers on mouse down. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseDown](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseDown) |
| `StockChartMouseLeave` | `string` | `null` | Triggers when cursor leaves the chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseLeave](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseLeave) |
| `StockChartMouseMove` | `string` | `null` | Triggers on hovering the stock chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseMove) |

---

## Event Properties

| Name | Type | Default |  Description  | Direct Link |
|------|------|---------|---------------|-------------|
| `AxisLabelRender` | `string` | `null` | Triggers before each axis label is rendered. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_AxisLabelRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_AxisLabelRender) |
| `BeforeExport` | `string` | `null` | Triggers before the export process begins. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_BeforeExport](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_BeforeExport) |
| `LegendClick` | `string` | `null` | Triggers after click on legend. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendClick) |
| `LegendRender` | `string` | `null` | Triggers before the legend is rendered. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_LegendRender) |
| `Load` | `string` | `null` | Triggers before the stockChart / range navigator rendering. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Load](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Load) |
| `Loaded` | `string` | `null` | Triggers after the stockChart / range navigator rendering. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Loaded](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_Loaded) |
| `OnZooming` | `string` | `null` | Triggers after the zoom selection is completed. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_OnZooming](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_OnZooming) |
| `PointClick` | `string` | `null` | Triggers on point click. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointClick) |
| `PointMove` | `string` | `null` | Triggers on point move. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_PointMove) |
| `RangeChange` | `string` | `null` | Triggers if the range is changed. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_RangeChange](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_RangeChange) |
| `SelectorRender` | `string` | `null` | Triggers before render the selector. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectorRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SelectorRender) |
| `SeriesRender` | `string` | `null` | Triggers before the series is rendered. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesRender](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_SeriesRender) |
| `StockChartMouseClick` | `string` | `null` | Triggers on clicking the stock chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseClick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseClick) |
| `StockChartMouseDown` | `string` | `null` | Triggers on mouse down. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseDown](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseDown) |
| `StockChartMouseLeave` | `string` | `null` | Triggers when cursor leaves the chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseLeave](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseLeave) |
| `StockChartMouseMove` | `string` | `null` | Triggers on hovering the stock chart. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseMove](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChart.html#Syncfusion_EJ2_Charts_StockChart_StockChartMouseMove) |

---

## Event Usage Example

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Charts

@{
    var stockData = new[]
    {
        new { Date = new DateTime(2024, 1, 1), Open = 182.0, High = 186.5, Low = 180.2, Close = 185.4, Volume = 1200000 },
        new { Date = new DateTime(2024, 1, 2), Open = 185.4, High = 188.1, Low = 184.7, Close = 187.6, Volume = 1320000 },
        new { Date = new DateTime(2024, 1, 3), Open = 187.6, High = 189.4, Low = 186.1, Close = 188.8, Volume = 1410000 },
        new { Date = new DateTime(2024, 1, 4), Open = 188.8, High = 190.0, Low = 185.9, Close = 186.3, Volume = 1510000 },
        new { Date = new DateTime(2024, 1, 5), Open = 186.3, High = 191.2, Low = 185.5, Close = 190.7, Volume = 1670000 }
    };
}

<div class="control-section">
    @Html.EJS().StockChart("stockchart-events").Title("MVC StockChart Event Example").Load("onLoad").Loaded("onLoaded").PointClick("onPointClick").RangeChange("onRangeChange").BeforeExport("onBeforeExport").LegendClick("onLegendClick").StockChartMouseMove("onMouseMove").EnableSelector(true).EnablePeriodSelector(true).PrimaryXAxis(
        px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)
    ).PrimaryYAxis(
        py => py.LabelFormat("${value}")
    ).Crosshair(ch => ch.Enable(true)
    ).Tooltip(tp => tp.Enable(true)
    ).Series(series =>
        {
            series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
                  .XName("Date")
                  .Open("Open")
                  .High("High")
                  .Low("Low")
                  .Close("Close")
                  .Volume("Volume")
                  .Name("AAPL")
                  .DataSource(stockData)
                  .Add();
        }
    ).Periods(periods =>
        {
            periods.Interval(1).IntervalType(RangeIntervalType.Months).Text("1M").Add();
            periods.Interval(3).IntervalType(RangeIntervalType.Months).Text("3M").Add();
            periods.Interval(6).IntervalType(RangeIntervalType.Months).Text("6M").Add();
            periods.Interval(1).IntervalType(RangeIntervalType.Years).Text("1Y").Add();
            periods.Text("YTD").Selected(true).Add();
            periods.Text("All").Add();
        }
    ).Render()
</div>

<div id="event-log" style="margin-top:12px;padding:12px;border:1px solid #d1d5db;border-radius:8px;">
    Last event: <span id="last-event">None</span>
</div>

<script>
    function setLastEvent(name) {
        document.getElementById('last-event').textContent = name;
        console.log(name);
    }

    function onLoad(args) {
        setLastEvent('Load');
        console.log('Load', args);
    }

    function onLoaded(args) {
        setLastEvent('Loaded');
        console.log('Loaded', args);
    }

    function onPointClick(args) {
        setLastEvent('PointClick');
        console.log('PointClick', args);
    }

    function onRangeChange(args) {
        setLastEvent('RangeChange');
        console.log('RangeChange', args);
    }

    function onBeforeExport(args) {
        setLastEvent('BeforeExport');
        console.log('BeforeExport', args);
    }

    function onLegendClick(args) {
        setLastEvent('LegendClick');
        console.log('LegendClick', args);
    }

    function onMouseMove(args) {
        setLastEvent('StockChartMouseMove');
        console.log('StockChartMouseMove', args);
    }
</script>
```

---

## StockChartAnnotationSettings Class

**Class:** `StockChartAnnotationSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnnotationSettings.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnnotationSettings.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartAnnotationSettings`

### Syntax

```csharp
public class StockChartAnnotationSettings : EJTagHelper
```

### Constructors

#### `StockChartAnnotationSettings()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnnotationSettings.html#Syncfusion_EJ2_Charts_StockChartAnnotationSettings__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnnotationSettings.html#Syncfusion_EJ2_Charts_StockChartAnnotationSettings__ctor)

---

## StockChartAnimation Class

**Class:** `StockChartAnimation`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartAnimation`

### Syntax

```csharp
public class StockChartAnimation : EJTagHelper
```

### Constructors

#### `StockChartAnimation()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation__ctor)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Delay` | `double` | `0` | The option to delay animation of the series. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation_Delay](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation_Delay) |
| `Duration` | `double` | `1000` | The duration of animation in milliseconds. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation_Duration](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation_Duration) |
| `Enable` | `bool` | `true` | If set to true, series gets animated on initial loading. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation_Enable](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartAnimation.html#Syncfusion_EJ2_Charts_StockChartAnimation_Enable) |

---

## StockChartChartArea Class

**Class:** `StockChartChartArea`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartChartArea`

### Syntax

```csharp
public class StockChartChartArea : EJTagHelper
```

### Constructors

#### `StockChartChartArea()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea__ctor)

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Background` | `string` | `"transparent"` | The background property accepts both hex color codes and rgba color values for customizing the chart area's background. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Background](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Background) |
| `BackgroundImage` | `string` | `null` | The background image of the chart area, specified as a URL or local image path. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_BackgroundImage](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_BackgroundImage) |
| `Border` | `StockChartChartAreaBorder` | `null` | Options to customize the border of the chart area. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Border](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Border) |
| `Margin` | `object` | `null` | Defines the margin options for the chart area, specifying the space between the chart container and the chart area. The margin object can customize the left, right, top, and bottom margins. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Margin](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Margin) |
| `Opacity` | `double` | `1` | The opacity property controls the transparency of the background of the chart area. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Opacity](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Opacity) |
| `Width` | `string` | `null` | Defines the width of the chart area element. Accepts values in percentage or pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Width](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartArea.html#Syncfusion_EJ2_Charts_StockChartChartArea_Width) |

---

## StockChartChartAreaBorder Class

**Class:** `StockChartChartAreaBorder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartAreaBorder.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartAreaBorder.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartBorder`
- `StockChartChartAreaBorder`

### Syntax

```csharp
public class StockChartChartAreaBorder : StockChartBorder
```

### Constructors

#### `StockChartChartAreaBorder()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartAreaBorder.html#Syncfusion_EJ2_Charts_StockChartChartAreaBorder__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartAreaBorder.html#Syncfusion_EJ2_Charts_StockChartChartAreaBorder__ctor)

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `""` | Specifies the color of the border, accepting values in hex or RGBA as valid CSS color strings. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color) |
| `DashArray` | `string` | `""` | Sets the length of dashes in the stroke of border. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray) |
| `Width` | `double` | `1` | The width of the border in pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width) |

---

## StockChartChartBorder Class

**Class:** `StockChartChartBorder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartBorder.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartBorder.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartBorder`
- `StockChartChartBorder`

### Syntax

```csharp
public class StockChartChartBorder : StockChartBorder
```

### Constructors

#### `StockChartChartBorder()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartBorder.html#Syncfusion_EJ2_Charts_StockChartChartBorder__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartBorder.html#Syncfusion_EJ2_Charts_StockChartChartBorder__ctor)

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `""` | Specifies the color of the border, accepting values in hex or RGBA as valid CSS color strings. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color) |
| `DashArray` | `string` | `""` | Sets the length of dashes in the stroke of border. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray) |
| `Width` | `double` | `1` | The width of the border in pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width) |

---

## StockChartChartMargin Class

**Class:** `StockChartChartMargin`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartMargin.html](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartMargin.html)

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartMargin`
- `StockChartChartMargin`

### Syntax

```csharp
public class StockChartChartMargin : StockChartMargin
```

### Constructors

#### `StockChartChartMargin()`

- **Direct Link:** [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartMargin.html#Syncfusion_EJ2_Charts_StockChartChartMargin__ctor](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartChartMargin.html#Syncfusion_EJ2_Charts_StockChartChartMargin__ctor)

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Bottom` | `double` | `10` | Bottom margin in pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Bottom](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Bottom) |
| `Left` | `double` | `10` | Left margin in pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Left](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Left) |
| `Right` | `double` | `10` | Right margin in pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Right](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Right) |
| `Top` | `double` | `10` | Top margin in pixels. | [https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Top](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMargin.html#Syncfusion_EJ2_Charts_StockChartMargin_Top) |

---

## StockChartStockChartAxis Class

**Class:** `StockChartStockChartAxis`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartAxis`

### Syntax

```csharp
public class StockChartStockChartAxis : EJTagHelper
```

### Constructors

#### `StockChartStockChartAxis()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Name` | `string` | `""` | Unique identifier of an axis. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_Name |
| `RowIndex` | `double` | `0` | Specifies the index of the row where the axis is associated. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_RowIndex |
| `OpposedPosition` | `bool` | `false` | Renders the axis on the opposite side of its default position. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_OpposedPosition |
| `IsInversed` | `bool` | `false` | Inverts the axis direction. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_IsInversed |
| `LabelFormat` | `string` | `""` | Used to format the axis labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_LabelFormat |
| `LabelRotation` | `double` | `0` | Angle in degrees to rotate the axis labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_LabelRotation |
| `LabelStyle` | `StockChartFont` | `null` | Options to customize the axis label style. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_LabelStyle |
| `LineStyle` | `StockChartAxisLine` | `null` | Options to customize axis line appearance. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_LineStyle |
| `MajorGridLines` | `StockChartMajorGridLines` | `null` | Options to customize major grid lines. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_MajorGridLines |
| `MajorTickLines` | `StockChartMajorTickLines` | `null` | Options to customize major tick lines. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_MajorTickLines |
| `MinorGridLines` | `StockChartMinorGridLines` | `null` | Options to customize minor grid lines. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_MinorGridLines |
| `MinorTickLines` | `StockChartMinorTickLines` | `null` | Options to customize minor tick lines. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_MinorTickLines |
| `Minimum` | `object` | `null` | Minimum value of the axis range. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_Minimum |
| `Maximum` | `object` | `null` | Maximum value of the axis range. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_Maximum |
| `Interval` | `double` | `Double.NaN` | Interval value for the axis. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_Interval |
| `IntervalType` | `IntervalType` | `IntervalType.Auto` | Interval type for DateTime axis. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_IntervalType |
| `CrosshairTooltip` | `StockChartCrosshairTooltip` | `null` | Options to customize crosshair tooltip for the axis. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxis.html#Syncfusion_EJ2_Charts_StockChartStockChartAxis_CrosshairTooltip |

---

## StockChartPrimaryXAxis Class

**Class:** `StockChartPrimaryXAxis`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartPrimaryXAxis.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartAxis`
- `StockChartPrimaryXAxis`

### Syntax

```csharp
public class StockChartPrimaryXAxis : StockChartStockChartAxis
```

### Constructors

#### `StockChartPrimaryXAxis()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartPrimaryXAxis.html#Syncfusion_EJ2_Charts_StockChartPrimaryXAxis__ctor

---

## StockChartPrimaryYAxis Class

**Class:** `StockChartPrimaryYAxis`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartPrimaryYAxis.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartAxis`
- `StockChartPrimaryYAxis`

### Syntax

```csharp
public class StockChartPrimaryYAxis : StockChartStockChartAxis
```

### Constructors

#### `StockChartPrimaryYAxis()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartPrimaryYAxis.html#Syncfusion_EJ2_Charts_StockChartPrimaryYAxis__ctor

---

## StockChartCrosshairSettings Class

**Class:** `StockChartCrosshairSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartCrosshairSettings`

### Syntax

```csharp
public class StockChartCrosshairSettings : EJTagHelper
```

### Constructors

#### `StockChartCrosshairSettings()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Enable` | `bool` | `false` | Enables or disables the crosshair. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_Enable |
| `LineType` | `LineType` | `LineType.Both` | Specifies whether the crosshair line is vertical, horizontal, or both. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_LineType |
| `Line` | `StockChartCrosshairLine` | `null` | Customizes the appearance of the crosshair line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_Line |
| `DashArray` | `string` | `""` | Dash pattern for the crosshair line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_DashArray |
| `Opacity` | `double` | `1` | Opacity of the crosshair line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_Opacity |
| `SnapToData` | `bool` | `false` | Snaps the crosshair to the nearest data point. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairSettings.html#Syncfusion_EJ2_Charts_StockChartCrosshairSettings_SnapToData |

---

## StockChartCrosshairLine Class

**Class:** `StockChartCrosshairLine`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairLine.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartBorder`
- `StockChartCrosshairLine`

### Syntax

```csharp
public class StockChartCrosshairLine : StockChartBorder
```

### Constructors

#### `StockChartCrosshairLine()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairLine.html#Syncfusion_EJ2_Charts_StockChartCrosshairLine__ctor

---

## StockChartCrosshairTooltip Class

**Class:** `StockChartCrosshairTooltip`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairTooltip.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartCrosshairTooltip`

### Syntax

```csharp
public class StockChartCrosshairTooltip : EJTagHelper
```

### Constructors

#### `StockChartCrosshairTooltip()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairTooltip.html#Syncfusion_EJ2_Charts_StockChartCrosshairTooltip__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Enable` | `bool` | `false` | Enables or disables the crosshair tooltip. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairTooltip.html#Syncfusion_EJ2_Charts_StockChartCrosshairTooltip_Enable |
| `Fill` | `string` | `null` | Background color of the tooltip. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairTooltip.html#Syncfusion_EJ2_Charts_StockChartCrosshairTooltip_Fill |
| `Format` | `string` | `null` | Format string for tooltip text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartCrosshairTooltip.html#Syncfusion_EJ2_Charts_StockChartCrosshairTooltip_Format |

---

## StockChartZoomSettings Class

**Class:** `StockChartZoomSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartZoomSettings`

### Syntax

```csharp
public class StockChartZoomSettings : EJTagHelper
```

### Constructors

#### `StockChartZoomSettings()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `EnableSelectionZooming` | `bool` | `false` | Enables rectangular selection zooming. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnableSelectionZooming |
| `EnableMouseWheelZooming` | `bool` | `false` | Enables zooming using the mouse wheel. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnableMouseWheelZooming |
| `EnablePinchZooming` | `bool` | `false` | Enables pinch zooming on touch devices. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnablePinchZooming |
| `EnablePan` | `bool` | `false` | Enables panning of the chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_EnablePan |
| `Mode` | `ZoomMode` | `ZoomMode.XY` | Specifies the zooming direction. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettings.html#Syncfusion_EJ2_Charts_StockChartZoomSettings_Mode |

---

## StockChartConnector Class

**Class:** `StockChartConnector`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartConnector.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartConnector`

### Syntax

```csharp
public class StockChartConnector : EJTagHelper
```

### Constructors

#### `StockChartConnector()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartConnector.html#Syncfusion_EJ2_Charts_StockChartConnector__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `null` | Color of the connector line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartConnector.html#Syncfusion_EJ2_Charts_StockChartConnector_Color |
| `Width` | `double` | `1` | Width of the connector line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartConnector.html#Syncfusion_EJ2_Charts_StockChartConnector_Width |
| `DashArray` | `string` | `""` | Dash pattern of the connector line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartConnector.html#Syncfusion_EJ2_Charts_StockChartConnector_DashArray |
| `Type` | `ConnectorType` | `ConnectorType.Line` | Type of connector. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartConnector.html#Syncfusion_EJ2_Charts_StockChartConnector_Type |

---

## StockChartLowerLine Class

**Class:** `StockChartLowerLine`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLowerLine.html

### Inheritance

- `StockChartConnector`
- `StockChartLowerLine`

### Syntax

```csharp
public class StockChartLowerLine : StockChartConnector
```

### Constructors

#### `StockChartLowerLine()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLowerLine.html#Syncfusion_EJ2_Charts_StockChartLowerLine__ctor

---

## StockChartUpperLine Class

**Class:** `StockChartUpperLine`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartUpperLine.html

### Inheritance

- `StockChartConnector`
- `StockChartUpperLine`

### Syntax

```csharp
public class StockChartUpperLine : StockChartConnector
```

### Constructors

#### `StockChartUpperLine()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartUpperLine.html#Syncfusion_EJ2_Charts_StockChartUpperLine__ctor

---

## StockChartPeriodLine Class

**Class:** `StockChartPeriodLine`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartPeriodLine.html

### Inheritance

- `StockChartConnector`
- `StockChartPeriodLine`

### Syntax

```csharp
public class StockChartPeriodLine : StockChartConnector
```

### Constructors

#### `StockChartPeriodLine()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartPeriodLine.html#Syncfusion_EJ2_Charts_StockChartPeriodLine__ctor

---

## StockChartStockChartSeries Class

**Class:** `StockChartStockChartSeries`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartSeries`

### Syntax

```csharp
public class StockChartStockChartSeries : EJTagHelper
```

### Constructors

#### `StockChartStockChartSeries()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Animation` | `StockChartAnimation` | `null` | Options for customizing animation for the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Animation |
| `BearFillColor` | `string` | `"#2ecd71"` | Color of the candle or point when the opening price is less than the closing price. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_BearFillColor |
| `Border` | `StockChartSeriesBorder` | `null` | Options for customizing the border of the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Border |
| `BullFillColor` | `string` | `"#e74c3d"` | Color of the candle or point when the opening price is higher than the closing price. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_BullFillColor |
| `CardinalSplineTension` | `double` | `0.5` | Tension parameter for cardinal spline series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_CardinalSplineTension |
| `Close` | `string` | `""` | Data source field that contains the close value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Close |
| `ColumnSpacing` | `double` | `0` | Spacing between column series points. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_ColumnSpacing |
| `ColumnWidth` | `double` | `Double.NaN` | Width of the column series points. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_ColumnWidth |
| `CornerRadius` | `StockChartCornerRadius` | `null` | Rounded corner options for the column series points. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_CornerRadius |
| `DashArray` | `string` | `"0"` | Pattern of dashes and gaps used to stroke the series line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_DashArray |
| `DataSource` | `object` | `null` | Specifies the data source for the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_DataSource |
| `EmptyPointSettings` | `StockChartEmptyPointSettings` | `null` | Options to handle empty points in the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_EmptyPointSettings |
| `EnableTooltip` | `bool` | `true` | Enables or disables tooltip for the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_EnableTooltip |
| `Fill` | `string` | `null` | Fill color of the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Fill |
| `High` | `string` | `""` | Data source field that contains the high value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_High |
| `Low` | `string` | `""` | Data source field that contains the low value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Low |
| `Open` | `string` | `""` | Data source field that contains the open value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Open |
| `Volume` | `string` | `""` | Data source field that contains the volume value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Volume |
| `XName` | `string` | `""` | Data source field that contains the x-value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_XName |
| `YName` | `string` | `""` | Data source field that contains the y-value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_YName |
| `Name` | `string` | `""` | Name of the series that appears in the legend. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Name |
| `Marker` | `StockChartMarkerSettings` | `null` | Marker configuration for the series points. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Marker |
| `Trendlines` | `List<StockChartTrendlines>` | `null` | Collection of trendlines associated with the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Trendlines |
| `Type` | `ChartSeriesType` | `ChartSeriesType.Line` | Specifies the type of series to render. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Type |
| `Width` | `double` | `1` | Width of the series stroke. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeries.html#Syncfusion_EJ2_Charts_StockChartStockChartSeries_Width |

---

## StockChartSeriesBorder Class

**Class:** `StockChartSeriesBorder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartSeriesBorder.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartBorder`
- `StockChartSeriesBorder`

### Syntax

```csharp
public class StockChartSeriesBorder : StockChartBorder
```

### Constructors

#### `StockChartSeriesBorder()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartSeriesBorder.html#Syncfusion_EJ2_Charts_StockChartSeriesBorder__ctor

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `""` | Specifies the color of the border, accepting values in hex or RGBA as valid CSS color strings. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color |
| `DashArray` | `string` | `""` | Sets the length of dashes in the border stroke. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray |
| `Width` | `double` | `1` | Width of the border in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width |

---

## StockChartMarkerSettings Class

**Class:** `StockChartMarkerSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartMarkerSettings`

### Syntax

```csharp
public class StockChartMarkerSettings : EJTagHelper
```

### Constructors

#### `StockChartMarkerSettings()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `AllowHighlight` | `bool` | `true` | Enables or disables marker highlight behavior while moving the mouse or trackball. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_AllowHighlight |
| `Border` | `StockChartBorder` | `null` | Options for customizing the border of a marker. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Border |
| `DataLabel` | `StockChartDataLabelSettings` | `null` | Data label settings for the marker. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_DataLabel |
| `Fill` | `string` | `null` | Fill color of the marker. By default, it takes the series color. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Fill |
| `Height` | `double` | `5` | Height of the marker in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Height |
| `ImageUrl` | `string` | `""` | URL for the image displayed as a marker. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_ImageUrl |
| `IsFilled` | `bool` | `false` | Specifies whether the marker is filled with the series color. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_IsFilled |
| `Offset` | `object` | `null` | Options for customizing the marker position. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Offset |
| `Opacity` | `double` | `1` | Opacity of the marker. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Opacity |
| `Shape` | `ChartShape` | `null` | Shape of the marker. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Shape |
| `Visible` | `bool` | `false` | Specifies whether the marker is rendered. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Visible |
| `Width` | `double` | `5` | Width of the marker in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartMarkerSettings.html#Syncfusion_EJ2_Charts_StockChartMarkerSettings_Width |

---

## StockChartSeriesMarker Class

**Class:** `StockChartSeriesMarker`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartSeriesMarker.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartMarkerSettings`
- `StockChartSeriesMarker`

### Syntax

```csharp
public class StockChartSeriesMarker : StockChartMarkerSettings
```

### Constructors

#### `StockChartSeriesMarker()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartSeriesMarker.html#Syncfusion_EJ2_Charts_StockChartSeriesMarker__ctor

---

## StockChartStockChartIndicator Class

**Class:** `StockChartStockChartIndicator`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartIndicator`

### Syntax

```csharp
public class StockChartStockChartIndicator : EJTagHelper
```

### Constructors

#### `StockChartStockChartIndicator()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Animation` | `StockChartAnimation` | `null` | Options for customizing animation for the indicator. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_Animation |
| `BandColor` | `string` | `"rgba (211,211,211,0.25)"` | Color of the Bollinger Band region. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_BandColor |
| `Close` | `string` | `""` | Data source field that contains the close value. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_Close |
| `DashArray` | `string` | `"0"` | Pattern of dashes and gaps used to stroke the indicator line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_DashArray |
| `DataSource` | `object` | `null` | Data source for the indicator. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_DataSource |
| `DPeriod` | `double` | `3` | Period used to calculate the `%D` value in stochastic indicators. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_DPeriod |
| `FastPeriod` | `double` | `26` | Fast period used to define the MACD line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_FastPeriod |
| `Field` | `FinancialDataFields` | `FinancialDataFields.Close` | Defines the field used to compare the current value with previous values. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_Field |
| `Fill` | `string` | `blue` | Fill color of the indicator line or signal line. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicator.html#Syncfusion_EJ2_Charts_StockChartStockChartIndicator_Fill |

---

## StockChartTrendlines Class

**Class:** `StockChartTrendlines`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartTrendlines`

### Syntax

```csharp
public class StockChartTrendlines : EJTagHelper
```

### Constructors

#### `StockChartTrendlines()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Animation` | `object` | `null` | Options to customize the animation for trendlines. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Animation |
| `BackwardForecast` | `double` | `0` | Defines the period by which the trend is backward forecasted. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_BackwardForecast |
| `EnableTooltip` | `bool` | `true` | Enables or disables tooltip for trendlines. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_EnableTooltip |
| `Fill` | `string` | `""` | Fill color of the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Fill |
| `ForwardForecast` | `double` | `0` | Defines the period by which the trend is forward forecasted. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_ForwardForecast |
| `Intercept` | `double` | `Double.NaN` | Defines the intercept of the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Intercept |
| `LegendShape` | `LegendShape` | `LegendShape.SeriesType` | Legend shape used to represent the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_LegendShape |
| `Marker` | `StockChartMarkerSettings` | `null` | Marker settings for the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Marker |
| `Name` | `string` | `""` | Name of the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Name |
| `Period` | `double` | `2` | Period considered to predict the moving average trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Period |
| `PolynomialOrder` | `double` | `2` | Polynomial order of the polynomial trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_PolynomialOrder |
| `Type` | `TrendlineTypes` | `TrendlineTypes.Linear` | Type of the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Type |
| `Width` | `double` | `1` | Width of the trendline. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlines.html#Syncfusion_EJ2_Charts_StockChartTrendlines_Width |

---

## StockChartStockTooltipSettings Class

**Class:** `StockChartStockTooltipSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockTooltipSettings`

### Syntax

```csharp
public class StockChartStockTooltipSettings : EJTagHelper
```

### Constructors

#### `StockChartStockTooltipSettings()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Border` | `StockChartBorder` | `null` | Options to customize tooltip borders. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Border |
| `Duration` | `double` | `300` | Duration for the ToolTip animation. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Duration |
| `Enable` | `bool` | `false` | Enables / Disables the visibility of the tooltip. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Enable |
| `EnableAnimation` | `bool` | `true` | If set to true, ToolTip will animate while moving from one point to another. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_EnableAnimation |
| `EnableMarker` | `bool` | `true` | Enables / Disables the visibility of the marker. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_EnableMarker |
| `EnableTextWrap` | `bool` | `false` | To wrap the tooltip long text based on available space. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_EnableTextWrap |
| `FadeOutDuration` | `double` | `1000` | Fade Out duration for the ToolTip hide. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_FadeOutDuration |
| `FadeOutMode` | `FadeOutMode` | `FadeOutMode.Move` | Fade Out duration for the Tooltip hide. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_FadeOutMode |
| `Fill` | `string` | `null` | The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Fill |
| `Format` | `string` | `null` | Format the ToolTip content. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Format |
| `Header` | `string` | `null` | Header for tooltip. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Header |
| `Opacity` | `double` | `0.75` | The fill color of the tooltip that accepts value in hex and rgba as a valid CSS color string. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Opacity |
| `Position` | `TooltipPosition` | `TooltipPosition.Fixed` | Specifies the tooltip position. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Position |
| `Shared` | `bool` | `false` | If set to true, a single ToolTip will be displayed for every index. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Shared |
| `ShowNearestPoint` | `bool` | `true` | By default, the nearest points will be included in the shared tooltip. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_ShowNearestPoint |
| `Template` | `string` | `null` | Custom template to format the ToolTip content. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_Template |
| `TextStyle` | `StockChartFont` | `null` | Options to customize the ToolTip text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettings.html#Syncfusion_EJ2_Charts_StockChartStockTooltipSettings_TextStyle |

---

## StockChartStockChartLegendSettings Class

**Class:** `StockChartStockChartLegendSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartLegendSettings`

### Syntax

```csharp
public class StockChartStockChartLegendSettings : EJTagHelper
```

### Constructors

#### `StockChartStockChartLegendSettings()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Alignment` | `Alignment` | `Alignment.Center` | Legend in stock chart can be aligned as Near, Center, or Far. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Alignment |
| `Background` | `string` | `"transparent"` | The background color of the legend. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Background |
| `Border` | `StockChartLegendBorder` | `null` | Options to customize the border of the legend. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Border |
| `ContainerPadding` | `StockChartContainerPadding` | `null` | Options to customize left, right, top and bottom padding for legend container. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ContainerPadding |
| `Description` | `string` | `null` | Description for legends in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Description |
| `EnablePages` | `bool` | `true` | If set to true, legend will be visible using pages in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_EnablePages |
| `Height` | `string` | `null` | The height of the legend in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Height |
| `IsInversed` | `bool` | `false` | If set to true, legend will be reversed in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_IsInversed |
| `ItemPadding` | `double` | `Double.NaN` | Option to customize the padding between legend items. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ItemPadding |
| `Location` | `StockChartLocation` | `null` | Specifies the location of the legend, relative to the Stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Location |
| `Margin` | `StockChartMargin` | `null` | Options to customize left, right, top and bottom margins of the stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Margin |
| `MaximumTitleWidth` | `double` | `100` | Maximum width for the legend title in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_MaximumTitleWidth |
| `Mode` | `LegendMode` | `null` | Mode of legend items. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Mode |
| `Opacity` | `double` | `1` | Opacity of the legend in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Opacity |
| `Padding` | `double` | `8` | Option to customize the padding around the legend items. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Padding |
| `Position` | `LegendPosition` | `LegendPosition.Auto` | Position of the legend in the stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Position |
| `ShapeHeight` | `double` | `10` | Shape height of the legend in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ShapeHeight |
| `ShapePadding` | `double` | `8` | Padding between the legend shape and text in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ShapePadding |
| `ShapeWidth` | `double` | `10` | Shape width of the legend in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ShapeWidth |
| `TabIndex` | `double` | `3` | TabIndex value for the legend in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_TabIndex |
| `TextStyle` | `StockChartLegendTextStyle` | `null` | Options to customize the legend text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_TextStyle |
| `Title` | `string` | `null` | Title for legends in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Title |
| `TitlePosition` | `LegendTitlePosition` | `LegendTitlePosition.Top` | Legend title position in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_TitlePosition |
| `TitleStyle` | `StockChartLegendTitleStyle` | `null` | Options to customize the legend title in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_TitleStyle |
| `ToggleVisibility` | `bool` | `true` | If set to true, series visibility collapses based on the legend visibility in stock chart. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_ToggleVisibility |
| `Visible` | `bool` | `false` | If set to true, legend will be visible. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Visible |
| `Width` | `string` | `null` | The width of the legend in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettings.html#Syncfusion_EJ2_Charts_StockChartStockChartLegendSettings_Width |

---

## StockChartLegendBorder Class

**Class:** `StockChartLegendBorder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLegendBorder.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartBorder`
- `StockChartLegendBorder`

### Syntax

```csharp
public class StockChartLegendBorder : StockChartBorder
```

### Constructors

#### `StockChartLegendBorder()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLegendBorder.html#Syncfusion_EJ2_Charts_StockChartLegendBorder__ctor

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `""` | Specifies the color of the border, accepting values in hex or RGBA as valid CSS color strings. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Color |
| `DashArray` | `string` | `""` | Sets the length of dashes in the stroke of border. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_DashArray |
| `Width` | `double` | `1` | The width of the border in pixels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartBorder.html#Syncfusion_EJ2_Charts_StockChartBorder_Width |

---

## StockChartLegendTextStyle Class

**Class:** `StockChartLegendTextStyle`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLegendTextStyle.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartFont`
- `StockChartLegendTextStyle`

### Syntax

```csharp
public class StockChartLegendTextStyle : StockChartFont
```

### Constructors

#### `StockChartLegendTextStyle()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLegendTextStyle.html#Syncfusion_EJ2_Charts_StockChartLegendTextStyle__ctor

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `""` | Color for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Color |
| `FontFamily` | `string` | `null` | FontFamily for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontFamily |
| `FontStyle` | `string` | `"Normal"` | FontStyle for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontStyle |
| `FontWeight` | `string` | `"Normal"` | FontWeight for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontWeight |
| `Opacity` | `double` | `1` | Opacity for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Opacity |
| `Size` | `string` | `"16px"` | Font size for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Size |
| `TextAlignment` | `Alignment` | `Alignment.Center` | Text alignment. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_TextAlignment |
| `TextOverflow` | `TextOverflow` | `TextOverflow.Wrap` | Specifies the chart title text overflow. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_TextOverflow |

---

## StockChartLegendTitleStyle Class

**Class:** `StockChartLegendTitleStyle`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLegendTitleStyle.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartFont`
- `StockChartLegendTitleStyle`

### Syntax

```csharp
public class StockChartLegendTitleStyle : StockChartFont
```

### Constructors

#### `StockChartLegendTitleStyle()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLegendTitleStyle.html#Syncfusion_EJ2_Charts_StockChartLegendTitleStyle__ctor

### Inherited Members

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Color` | `string` | `""` | Color for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Color |
| `FontFamily` | `string` | `null` | FontFamily for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontFamily |
| `FontStyle` | `string` | `"Normal"` | FontStyle for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontStyle |
| `FontWeight` | `string` | `"Normal"` | FontWeight for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_FontWeight |
| `Opacity` | `double` | `1` | Opacity for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Opacity |
| `Size` | `string` | `"16px"` | Font size for the text. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_Size |
| `TextAlignment` | `Alignment` | `Alignment.Center` | Text alignment. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_TextAlignment |
| `TextOverflow` | `TextOverflow` | `TextOverflow.Wrap` | Specifies the chart title text overflow. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartFont.html#Syncfusion_EJ2_Charts_StockChartFont_TextOverflow |

---

## StockChartLastValueLabelSettings Class

**Class:** `StockChartLastValueLabelSettings`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartLastValueLabelSettings`

### Syntax

```csharp
public class StockChartLastValueLabelSettings : EJTagHelper
```

### Constructors

#### `StockChartLastValueLabelSettings()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Background` | `string` | `null` | The background color for the label. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_Background |
| `Border` | `StockChartLastValueLabelBorder` | `null` | The border properties for the label. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_Border |
| `DashArray` | `string` | `""` | The dash array of the grid lines behind the labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_DashArray |
| `Enable` | `bool` | `false` | Enables or disables the display of the last value labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_Enable |
| `Font` | `StockChartLastValueLabelStyle` | `null` | The font properties of the last value labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_Font |
| `LineColor` | `string` | `""` | The line color for grid lines behind the labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_LineColor |
| `LineWidth` | `double` | `1` | The width of the grid lines behind the labels. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_LineWidth |
| `Rx` | `double` | `-` | `-` | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_Rx |
| `Ry` | `double` | `-` | `-` | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartLastValueLabelSettings.html#Syncfusion_EJ2_Charts_StockChartLastValueLabelSettings_Ry |

---

## StockChartStockChartPeriod Class 



**Class:** `StockChartStockChartPeriod` 

  
**Namespace:** `Syncfusion.EJ2.Charts` 

  
**Assembly:** `Syncfusion.EJ2.dll` 


**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriod.html 



### Inheritance 



- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartPeriod` 



### Syntax 


```csharp
public class StockChartStockChartPeriod : EJTagHelper
```

### Constructors 



#### `StockChartStockChartPeriod()` 



https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriod.html#Syncfusion_EJ2_Charts_StockChartStockChartPeriod__ctor 



### Properties 


| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Interval` | `double` | `1` | Count value for the button. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriod.html#Syncfusion_EJ2_Charts_StockChartStockChartPeriod_Interval 
 |
| `IntervalType` | `RangeIntervalType` | ` RangeIntervalType.Years` | IntervalType of button. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriod.html#Syncfusion_EJ2_Charts_StockChartStockChartPeriod_IntervalType 
 |
| `Selected` | `bool` | `false` | To select the default period. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriod.html#Syncfusion_EJ2_Charts_StockChartStockChartPeriod_Selected 
 |
| `Text` | `string` | `null` | Text to be displayed on the button. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriod.html#Syncfusion_EJ2_Charts_StockChartStockChartPeriod_Text 
 |

---

## StockChartStockChartRow Class 



**Class:** `StockChartStockChartRow` 

  
**Namespace:** `Syncfusion.EJ2.Charts` 

  
**Assembly:** `Syncfusion.EJ2.dll` 


**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartRow.html 



### Inheritance 



- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartRow` 



### Syntax 


```csharp
public class StockChartStockChartRow : EJTagHelper
```

### Constructors 


#### `StockChartStockChartRow()` 


https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartRow.html#Syncfusion_EJ2_Charts_StockChartStockChartRow__ctor 


### Properties 


| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Border` | `object` | `null` | Options to customize the border of the rows. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartRow.html#Syncfusion_EJ2_Charts_StockChartStockChartRow_Border 
 |
| `Height` | `string` | `"100%"` | The height of the row as a string accepts input both as `100px` and `100%`. If specified as `100%`, row renders to the full height of its chart. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartRow.html#Syncfusion_EJ2_Charts_StockChartStockChartRow_Height 
 |

---

## StockChartStockChartSelectedDataIndex Class 



**Class:** `StockChartStockChartSelectedDataIndex` 

  
**Namespace:** `Syncfusion.EJ2.Charts` 

  
**Assembly:** `Syncfusion.EJ2.dll` 


**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSelectedDataIndex.html 



### Inheritance 



- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockChartSelectedDataIndex` 



### Syntax 


```csharp
public class StockChartStockChartSelectedDataIndex : EJTagHelper
```

### Constructors 


#### `StockChartStockChartSelectedDataIndex()` 


https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSelectedDataIndex.html#Syncfusion_EJ2_Charts_StockChartStockChartSelectedDataIndex__ctor 


### Properties 


| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Point` | `int` | `0` | Specifies index of point. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSelectedDataIndex.html#Syncfusion_EJ2_Charts_StockChartStockChartSelectedDataIndex_Point 
 |
| `Series` | `int` | `0` | Specifies index of series. 
 | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSelectedDataIndex.html#Syncfusion_EJ2_Charts_StockChartStockChartSelectedDataIndex_Series 
 |

---

## StockEvent Class

**Class:** `StockEvent`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.
html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockEvent`

### Syntax

```csharp
public class StockEvent : EJTagHelper
```

### Constructors

#### `StockEvent()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent__ctor

### Properties

| Name | Type | Default | Description | Direct Link |
|------|------|---------|-------------|-------------|
| `Background` | `string` | `null` | Background color of the stock event. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_Background |
| `Border` | `StockChartStockEventsBorder` | `null` | Border options for the stock event. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_Border |
| `Content` | `string` | `null` | Content displayed inside the stock event. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_Content |
| `Date` | `object` | `null` | Date value where the stock event is rendered. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_Date |
| `Description` | `string` | `null` | Description of the stock event. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_Description |
| `IconUrl` | `string` | `null` | URL of the icon displayed in the stock event. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_IconUrl |
| `PlaceAt` | `StockEventsPlacement` | `StockEventsPlacement.Top` | Placement of the stock event relative to the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_PlaceAt |
| `SeriesIndexes` | `List<int>` | `null` | Series indexes to which the stock event applies. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_SeriesIndexes |
| `ShowOnSeries` | `bool` | `false` | Specifies whether the stock event should be shown on the series. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_ShowOnSeries |
| `TextStyle` | `StockChartStockEventsTextStyle` | `null` | Text style options for the stock event content. | https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvent.html#Syncfusion_EJ2_Charts_StockChartStockEvent_TextStyle |

---

## StockChartStockEvents Class

**Class:** `StockChartStockEvents`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvents.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartStockEvents`

### Syntax

```csharp
public class StockChartStockEvents : EJTagHelper
```

### Constructors

#### `StockChartStockEvents()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEvents.html#Syncfusion_EJ2_Charts_StockChartStockEvents__ctor

---

## StockChartStockEventsBorder Class

**Class:** `StockChartStockEventsBorder`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEventsBorder.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartBorder`
- `StockChartStockEventsBorder`

### Syntax

```csharp
public class StockChartStockEventsBorder : StockChartBorder
```

### Constructors

#### `StockChartStockEventsBorder()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEventsBorder.html#Syncfusion_EJ2_Charts_StockChartStockEventsBorder__ctor

---

## StockChartStockEventsTextStyle Class

**Class:** `StockChartStockEventsTextStyle`  
**Namespace:** `Syncfusion.EJ2.Charts`  
**Assembly:** `Syncfusion.EJ2.dll`

**Class page:**  
https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEventsTextStyle.html

### Inheritance

- `System.Object`
- `Syncfusion.EJ2.EJTagHelper`
- `StockChartFont`
- `StockChartStockEventsTextStyle`

### Syntax

```csharp
public class StockChartStockEventsTextStyle : StockChartFont
```

### Constructors

#### `StockChartStockEventsTextStyle()`

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEventsTextStyle.html#Syncfusion_EJ2_Charts_StockChartStockEventsTextStyle__ctor

---
# MVC StockChart API Reference
**Part 9 — Wrapper / Collection Classes and Builder Classes**

---

## Wrapper / Collection Classes

The MVC charts namespace lists a final group of **plural stock-chart types** that round out the StockChart surface area. In Syncfusion’s API pattern, these plural types behave like **collection-style wrapper classes**, which is also consistent with the directly surfaced wrapper pages such as `StockChartStockChartAnnotations` and `ChartSelectedDataIndexes`, both of which expose lightweight wrapper-style definitions with parameterless constructors rather than large property sets. 

### 1) `[StockChartStockChartAnnotations]`
Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAnnotations.html
- Listed in the MVC charts namespace as a StockChart type, and directly surfaced in the API as a wrapper class. 
- **Syntax:** `public class StockChartStockChartAnnotations : EJTagHelper` 
- **Constructor:** `StockChartStockChartAnnotations()` 

### 2) `StockChartStockChartAxes`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxes.html
- Listed in the MVC charts namespace as a StockChart type; this is the plural companion to `StockChartStockChartAxis`. 

### 3) `StockChartStockChartIndicators`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicators.html
- Listed in the MVC charts namespace as a StockChart type; this is the plural companion to `StockChartStockChartIndicator`. 

### 4) `StockChartStockChartPeriods`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriods.html

- Listed in the MVC charts namespace as a StockChart type; this is the plural companion to `StockChartStockChartPeriod`. 

### 5) `StockChartStockChartRows`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartRows.html
 
- Listed in the MVC charts namespace as a StockChart type; this is the plural companion to `StockChartStockChartRow`. 

### 6) `StockChartStockChartSelectedDataIndexes`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSelectedDataIndexes.html

- Listed in the MVC charts namespace as a StockChart type; this is the plural companion to `StockChartStockChartSelectedDataIndex`. 

### 7) `StockChartStockChartSeriesCollection`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeriesCollection.html
- Listed in the MVC charts namespace as a StockChart type; this is the collection-style companion to `StockChartStockChartSeries`. 

### 8) `StockChartStockChartTrendlines`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartTrendlines.html
- Listed in the MVC charts namespace as a StockChart type in the remaining stock-chart family. 

### Wrapper-Class Note
For the wrapper / collection layer, the **actual configuration still lives on the concrete child item classes** you already documented earlier, such as `StockChartStockChartAxis`, `StockChartStockChartIndicator`, `StockChartStockChartPeriod`, `StockChartStockChartRow`, `StockChartStockChartSelectedDataIndex`, and `StockChartStockChartSeries`. 

---

## Builder Classes

The MVC charts namespace also lists the builder layer for the StockChart family, including stock-specific builders such as `StockChartStockChartAxisBuilder`, `StockChartStockChartIndicatorBuilder`, `StockChartStockChartLegendSettingsBuilder`, `StockChartStockChartPeriodBuilder`, `StockChartStockChartRowBuilder`, `StockChartStockChartSelectedDataIndexBuilder`, `StockChartStockChartSeriesBuilder`, `StockChartStockTooltipSettingsBuilder`, `StockChartTrendlinesBuilder`, `StockChartStockEventBuilder`, and `StockChartZoomSettingsBuilder`. 

### `StockChartStockChartAxisBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartAxisBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The builder surface is a `ControlBuilder` with constructors for **empty**, **model**, and **collection** usage. 
- The surfaced fluent members include `Add`, `Coefficient`, `CrossesAt`, `CrossesInAxis`, `CrosshairTooltip`, `Description`, and `DesiredIntervals`, among other axis-related members. 

### `StockChartStockChartIndicatorBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartIndicatorBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The builder surface is a `ControlBuilder` with constructors for **empty** and **collection** usage. 
- The surfaced fluent members include `Add`, `Animation`, `BandColor`, `Close`, `DashArray`, and `DataSource`, along with the broader indicator configuration surface. 

### `StockChartStockChartLegendSettingsBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartLegendSettingsBuilder.html
- Present in the MVC namespace as a StockChart builder type. 

### `StockChartStockChartPeriodBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartPeriodBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The builder surface is a `ControlBuilder` with constructors for **empty** and **collection** usage. 
- The surfaced fluent members include `Add`, `Interval`, `IntervalType`, `Selected`, and `Text`. 

### `StockChartStockChartRowBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartRowBuilder.html
- Present in the MVC namespace as a StockChart builder type. 

### `StockChartStockChartSelectedDataIndexBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSelectedDataIndexBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The builder surface is a `ControlBuilder` with constructors for **empty** and **collection** usage. 
- The surfaced fluent members include `Add`, `Point`, and `Series`. 

### `StockChartStockChartSeriesBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockChartSeriesBuilder.html
- Present in the MVC namespace as a StockChart builder type. 

### `StockChartStockTooltipSettingsBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockTooltipSettingsBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The builder surface is a `ControlBuilder` with constructors for **empty** and **model** usage. 
- The surfaced fluent members include `Border`, `Duration`, `Enable`, `EnableAnimation`, `EnableMarker`, `EnableTextWrap`, `FadeOutDuration`, and `FadeOutMode`. 

### `StockChartStockEventBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartStockEventBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The builder surface is a `ControlBuilder` with constructors for **empty** and **collection** usage. 
- The surfaced fluent members include `Add`, `Background`, `Border`, `Date`, `Description`, `PlaceAt`, `SeriesIndexes`, and `ShowOnSeries`. 

### `StockChartTrendlinesBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartTrendlinesBuilder.html
- Present in the MVC namespace as a StockChart builder type. 

### `StockChartZoomSettingsBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartZoomSettingsBuilder.html
- Present in the MVC namespace as a StockChart builder type. 
- The MVC API directly surfaces this as a `ControlBuilder` with constructors for **empty** and **model** usage. 
- The surfaced fluent members include `Accessibility`, `EnableAnimation`, `EnableDeferredZooming`, `EnableMouseWheelZooming`, `EnablePan`, `EnablePinchZooming`, `EnableScrollbar`, and `EnableSelectionZooming`. 

### `StockChartSeriesLabelSettingsBuilder`
- Base link: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.StockChartSeriesLabelSettingsBuilder.html
- This additional stock-specific builder is also directly surfaced in the MVC API. 
- The surfaced fluent members include `Background`, `Border`, `Font`, `Opacity`, `ShowOverlapText`, and `Text`. 

---

## Final Completion Note

With this part, the **Option-A StockChart class inventory is complete across the core stock-specific classes, stock events, wrapper / collection types, and builder types** that are surfaced in the MVC charts namespace. 