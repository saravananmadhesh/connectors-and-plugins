# Stock Chart API Reference

This document summarizes key properties, methods, and events for the `StockChartComponent` with direct links to the official Syncfusion Angular API anchors.

- Official API index: https://ej2.syncfusion.com/angular/documentation/api/stock-chart/index-default

## Properties (selected)
- `annotations` — [StockChartAnnotationSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartannotationsettingsmodel)
- `axes` — [StockChartAxisModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartaxismodel)
- `background` — string
- `border` — [StockChartBorderModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartbordermodel)
- `chartArea` — [StockChartAreaModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartareamodel)
- `crosshair` — [CrosshairSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartaxismodel#crosshair) (see axis models)
- `dataSource` — Object | DataManager
- `enableCustomRange` — boolean
- `enablePeriodSelector` — boolean
- `enablePersistence` — boolean
- `enableRtl` — boolean
- `enableSelector` — boolean
- `exportType` — [ExportType[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/exporttype)
- `height` — string
- `indicatorType` — TechnicalIndicators[]
- `indicators` — [StockChartIndicatorModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartindicatormodel)
- `isMultiSelect` — boolean
- `isSelect` — boolean
- `isTransposed` — boolean
- `legendSettings` — [StockChartLegendSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartlegendsettingsmodel)
- `locale` — string
- `mainObject` — Element
- `margin` — [StockMarginModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockmarginmodel)
- `noDataTemplate` — string | Function
- `periods` — [PeriodsModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/periodsmodel)
- `primaryXAxis` / `primaryYAxis` — [StockChartAxisModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartaxismodel)
- `rows` — [StockChartRowModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartrowmodel)
- `selectedDataIndexes` — [StockChartIndexesModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartindexesmodel)
- `selectionMode` — [SelectionMode](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/selectionmode)
- `series` — [StockSeriesModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockseriesmodel)
- `seriesType` — ChartSeriesType[]
- `stockEvents` — [StockEventsSettingsModel[]](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockeventssettingsmodel)
- `theme` — [ChartTheme](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/charttheme)
- `title` / `titleStyle` — string / [StockChartFontModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stockchartfontmodel)
- `tooltip` — [StockTooltipSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/stocktooltipsettingsmodel)
- `trendlineType` — TrendlineTypes[]
- `width` — string
- `zoomSettings` — [ZoomSettingsModel](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/zoomsettingsmodel)

## Methods (selected)
- `chartModuleInjection()` — Module injection helper
- `destroy()` — Destroy method
- `getModuleName()` — Get component name
- `rangeChanged(updatedStart, updatedEnd)` — Programmatically change chart range
- `renderPeriodSelector()` — Render the period selector
- `stockChartDataManagerSuccess()` — DataManager success handler

## Events (selected)
- `axisLabelRender` — EmitType<IAxisLabelRenderEventArgs>
- `beforeExport` — [IExportEventArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/iexporteventargs)
- `crosshairLabelRender` — [ICrosshairLabelRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/icrosshairlabelrendereventargs)
- `legendClick` — [IStockLegendClickEventArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/istocklegendclickeventargs)
- `legendRender` — [IStockLegendRenderEventArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/istocklegendrendereventargs)
- `load` / `loaded` — [IStockChartEventArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/istockcharteventargs)
- `onZooming` — EmitType<IZoomingEventArgs>
- `pointClick` / `pointMove` — EmitType<IPointEventArgs>
- `rangeChange` — [IRangeChangeEventArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/irangechangeeventargs)
- `selectorRender` — EmitType<IRangeSelectorRenderEventArgs>
- `seriesRender` — EmitType<ISeriesRenderEventArgs>
- `stockChartMouseClick` / `stockChartMouseDown` / `stockChartMouseMove` / `stockChartMouseUp` / `stockChartMouseLeave` — EmitType<IMouseEventArgs>
- `stockEventRender` — [IStockEventRenderArgs](https://ej2.syncfusion.com/angular/documentation/api/stock-chart/istockeventrenderargs)
- `tooltipRender` — EmitType<ITooltipRenderEventArgs>

## Quick Example
See `SKILL.md` examples in the skill root for setup and usage patterns.

---
Generated from: https://ej2.syncfusion.com/angular/documentation/api/stock-chart/index-default
