# StockChart API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript StockChart ([`Syncfusion.EJ2.StockChart.StockChart`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/)) component.

- **Base API Documentation:** [StockChart](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/)
- **Namespace:** `Syncfusion.EJ2.StockChart`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Data and Series Properties](#data-and-series-properties)
- [Display and Layout Properties](#display-and-layout-properties)
- [Axis Properties](#axis-properties)
- [Selection and Interaction Properties](#selection-and-interaction-properties)
- [Indicator and Trendline Properties](#indicator-and-trendline-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [StockChart()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/)
Creates a new instance of the StockChart component.

---

## Core Configuration Properties

- **[`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartannotationsettingsmodel)** (StockChartAnnotationSettingsModel[]): The configuration for annotation in chart.
- **[`axes`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel)** (StockChartAxisModel[]): Secondary axis collection for the stockChart.
- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#background)** (string): The background color of the stockChart that accepts value in hex and rgba as a valid CSS color string. **Default:** null
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartbordermodel)** (StockChartBorderModel): Options for customizing the color and width of the stockChart border.
- **[`chartArea`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartareamodel)** (StockChartAreaModel): Options for configuring the border and background of the stockChart area.
- **[`crosshair`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/crosshairsettingsmodel)** (CrosshairSettingsModel): Options for customizing the crosshair of the chart.
- **[`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#datasource)** (Object | DataManager): Specifies the DataSource for the stockChart. It can be an array of JSON objects or an instance of DataManager. **Default:** ''
- **[`enableCustomRange`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enablecustomrange)** (boolean): Custom Range. **Default:** true
- **[`enablePeriodSelector`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enableperiodselector)** (boolean): It specifies whether the periodSelector to be rendered in financial chart. **Default:** true
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enableSelector`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enableselector)** (boolean): It specifies whether the range navigator to be rendered in financial chart. **Default:** true
- **[`exportType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/exporttype)** (ExportType[]): It specifies the types of Export types in financial chart.
- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#height)** (string): The height of the stockChart as a string accepts input both as '100px' or '100%'. If specified as '100%', stockChart renders to the full height of its parent element. **Default:** null
- **[`isTransposed`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#istransposed)** (boolean): It specifies whether the stockChart should be render in transposed manner or not. **Default:** false
- **[`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartlegendsettingsmodel)** (StockChartLegendSettingsModel): Options for customizing the legend of the stockChart.
- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`mainObject`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#mainobject)** (Element): Overall SVG.
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockmarginmodel)** (StockMarginModel): Options to customize left, right, top and bottom margins of the stockChart.
- **[`noDataTemplate`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#nodatatemplate)** (string | Function): Specifies the template to be displayed when the chart has no data. This property enables the users to display customized messages, images, or other UI elements in place of an empty chart. It provides a better user experience by offering context when no data points are available. **Default:** null
- **[`periods`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/periodsmodel)** (PeriodsModel[]): To configure period selector options.
- **[`rows`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartrowmodel)** (StockChartRowModel[]): Options to split stockChart into multiple plotting areas horizontally. Each object in the collection represents a plotting area in the stockChart.
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/charttheme)** (ChartTheme): Specifies the theme for the stockChart. **Default:** 'Material'
- **[`title`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#title)** (string): Title of the chart. **Default:** ''
- **[`titleStyle`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartfontmodel)** (StockChartFontModel): Options for customizing the title of the Chart.
- **[`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stocktooltipsettingsmodel)** (StockTooltipSettingsModel): Options for customizing the tooltip of the chart.
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#width)** (string): The width of the stockChart as a string accepts input as both like '100px' or '100%'. If specified as '100%', stockChart renders to the full width of its parent element. **Default:** null
- **[`zoomChange`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#zoomchange)** (boolean): Private property.
- **[`zoomSettings`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/zoomsettingsmodel)** (ZoomSettingsModel): Options to enable the zooming feature in the chart.

---

## Data and Series Properties

- **[`series`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockseriesmodel)** (StockSeriesModel[]): The configuration for series in the stockChart.
- **[`seriesType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/chartseriestype)** (ChartSeriesType[]): It specifies the types of series in financial chart.
- **[`stockEvents`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockeventssettingsmodel)** (StockEventsSettingsModel[]): The configuration for stock events in the stockChart.
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindexesmodel)** (StockChartIndexesModel[]): Specifies the point indexes to be selected while loading a chart. It requires selectionMode to be Point | Series | or Cluster. **Default:** []

---

## Display and Layout Properties

- **[`titleStyle`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartfontmodel)** (StockChartFontModel): Options for customizing the title of the Chart.
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockmarginmodel)** (StockMarginModel): Options to customize left, right, top and bottom margins of the stockChart.
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartbordermodel)** (StockChartBorderModel): Options for customizing the color and width of the stockChart border.
- **[`chartArea`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartareamodel)** (StockChartAreaModel): Options for configuring the border and background of the stockChart area.
- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#background)** (string): The background color of the stockChart. **Default:** null
- **[`noDataTemplate`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#nodatatemplate)** (string | Function): Template to display when no data is available. **Default:** null

---

## Axis Properties

- **[`primaryXAxis`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel)** (StockChartAxisModel): Options to configure the horizontal axis.
- **[`primaryYAxis`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel)** (StockChartAxisModel): Options to configure the vertical axis.
- **[`axes`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel)** (StockChartAxisModel[]): Secondary axis collection for the stockChart.

---

## Selection and Interaction Properties

- **[`isMultiSelect`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#ismultiselect)** (boolean): If set true, enables the multi selection in chart. It requires selectionMode to be Point | Series | or Cluster. **Default:** false
- **[`isSelect`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#isselect)** (boolean): If set true, enables the animation in chart. **Default:** false
- **[`selectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/selectionmode)** (SelectionMode): Specifies whether series or data point has to be selected. They are: none - Disables the selection; series - selects a series; point - selects a point; cluster - selects a cluster of point; dragXY - selects points by dragging with respect to both horizontal and vertical axes; dragX - selects points by dragging with respect to horizontal axis; dragY - selects points by dragging with respect to vertical axis. **Default:** None
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindexesmodel)** (StockChartIndexesModel[]): Specifies the point indexes to be selected while loading a chart. **Default:** []

---

## Indicator and Trendline Properties

- **[`indicators`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindicatormodel)** (StockChartIndicatorModel[]): Defines the collection of technical indicators, that are used in financial markets.
- **[`indicatorType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/technicalindicators)** (TechnicalIndicators[]): It specifies the types of indicators in financial chart.
- **[`trendlineType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/trendlinetypes)** (TrendlineTypes[]): It specifies the types of trendline types in financial chart.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs.

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [chartModuleInjection()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#chartmoduleinjection)
Module Injection for components.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#destroy)
Destroy method.

**Returns:** void

### [getModuleName()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#getmodulename)
Get component name.

**Returns:** string

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#getrootelement)
Returns the route element of the component.

**Returns:** HTMLElement

### [rangeChanged()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#rangechanged)
To change the range for chart.

**Parameters:**
- `updatedStart` (number): The updated start value for the chart range.
- `updatedEnd` (number): The updated end value for the chart range.

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [renderPeriodSelector()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#renderperiodselector)
Render period selector.

**Returns:** void

### [stockChartDataManagerSuccess()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#stockchartdatamanagersuccess)
DataManager Success.

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [axisLabelRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iaxislabelrendereventargs)
EmitType<IAxisLabelRenderEventArgs>: Triggers before each axis label is rendered.

### [beforeExport](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iexporteventargs)
EmitType<IExportEventArgs>: Triggers before the export process begins. This event allows for the customization of export settings before the chart is exported.

### [beforeIndicatorChange](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/ibeforeindicatorchangeeventargs)
EmitType<IBeforeIndicatorChangeEventArgs>: Triggers before an indicator add/remove mutation is applied. This event is cancelable. Set the cancel property to true to prevent the mutation.

### [crosshairLabelRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/icrosshairlabelrendereventargs)
EmitType<ICrosshairLabelRenderEventArgs>: Triggers before the crosshairtooltip for the series is rendered.

### [indicatorChanged](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iindicatorchangedeventargs)
EmitType<IIndicatorChangedEventArgs>: Triggers after an indicator add/remove mutation has been successfully applied. This event is not triggered when beforeIndicatorChange event is cancelled.

### [legendClick](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istocklegendclickeventargs)
EmitType<IStockLegendClickEventArgs>: Triggers after click on legend.

### [legendRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istocklegendrendereventargs)
EmitType<IStockLegendRenderEventArgs>: Triggers before the legend is rendered.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istockcharteventargs)
EmitType<IStockChartEventArgs>: Triggers before the range navigator rendering.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istockcharteventargs)
EmitType<IStockChartEventArgs>: Triggers after the range navigator rendering.

### [onZooming](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/izoomingeventargs)
EmitType<IZoomingEventArgs>: Triggers after the zoom selection is completed.

### [pointClick](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/ipointeventargs)
EmitType<IPointEventArgs>: Triggers on point click.

### [pointMove](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/ipointeventargs)
EmitType<IPointEventArgs>: Triggers on point move.

### [rangeChange](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/irangechangeeventargs)
EmitType<IRangeChangeEventArgs>: Triggers if the range is changed.

### [selectorRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/irangeselectorrendereventargs)
EmitType<IRangeSelectorRenderEventArgs>: Triggers before render the selector.

### [seriesRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iseriesrendereventargs)
EmitType<ISeriesRenderEventArgs>: Triggers before the series is rendered.

### [stockChartMouseClick](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs)
EmitType<IMouseEventArgs>: Triggers on clicking the stock chart.

### [stockChartMouseDown](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs)
EmitType<IMouseEventArgs>: Triggers on mouse down.

### [stockChartMouseLeave](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs)
EmitType<IMouseEventArgs>: Triggers when cursor leaves the chart.

### [stockChartMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs)
EmitType<IMouseEventArgs>: Triggers on hovering the stock chart.

### [stockChartMouseUp](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs)
EmitType<IMouseEventArgs>: Triggers on mouse up.

### [stockEventRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istockeventrenderargs)
EmitType<IStockEventRenderArgs>: Triggers before the series is rendered.

### [tooltipRender](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/itooltiprendereventargs)
EmitType<ITooltipRenderEventArgs>: Triggers before the tooltip for series is rendered.

---

## Related Settings Classes

### Chart Configuration
- **[`StockChartAnnotationSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartannotationsettingsmodel)** - Annotation configuration for stock chart
- **[`StockSeriesModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockseriesmodel)** - Series configuration for stock chart
- **[`StockEventsSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockeventssettingsmodel)** - Stock events configuration (dividends, splits, etc.)

### Axes
- **[`StockChartAxisModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel)** - Axis configuration for primary, secondary, and other axes
- **[`StockChartRowModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartrowmodel)** - Row configuration for multiple plotting areas

### Indicators and Trendlines
- **[`StockChartIndicatorModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindicatormodel)** - Technical indicators (RSI, MACD, etc.) configuration
- **[`TechnicalIndicators`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/technicalindicators)** - Available technical indicators
- **[`TrendlineTypes`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/trendlinetypes)** - Available trendline types

### Period Selection
- **[`PeriodsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/periodsmodel)** - Period selector configuration (1D, 1M, 3M, 1Y, etc.)
- **[`StockLegend`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stocklegend)** - Legend module for stock chart

### Visual and Layout
- **[`StockChartBorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartbordermodel)** - Border styling for stock chart
- **[`StockChartAreaModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartareamodel)** - Chart area configuration
- **[`StockChartFontModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartfontmodel)** - Font styling for chart title
- **[`StockMarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockmarginmodel)** - Margin configuration
- **[`StockTooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stocktooltipsettingsmodel)** - Tooltip configuration
- **[`StockChartLegendSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartlegendsettingsmodel)** - Legend settings
- **[`CrosshairSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/crosshairsettingsmodel)** - Crosshair configuration
- **[`ZoomSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/zoomsettingsmodel)** - Zoom settings configuration

### Interaction and Selection
- **[`SelectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/selectionmode)** - Selection modes (None, Series, Point, Cluster, dragXY, dragX, dragY)
- **[`StockChartIndexesModel`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindexesmodel)** - Selected data indexes

### Series Types and Themes
- **[`ChartSeriesType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/chartseriestype)** - Available chart series types (Candle, OHLC, HLC, etc.)
- **[`ChartTheme`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/charttheme)** - Available themes
- **[`ExportType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/exporttype)** - Available export types

### Event Arguments
- **[`IAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iaxislabelrendereventargs)** - Axis label render event data
- **[`IExportEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iexporteventargs)** - Export event data
- **[`IBeforeIndicatorChangeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/ibeforeindicatorchangeeventargs)** - Before indicator change event data
- **[`IIndicatorChangedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iindicatorchangedeventargs)** - Indicator changed event data
- **[`ICrosshairLabelRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/icrosshairlabelrendereventargs)** - Crosshair label render event data
- **[`IStockLegendClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istocklegendclickeventargs)** - Legend click event data
- **[`IStockLegendRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istocklegendrendereventargs)** - Legend render event data
- **[`IStockChartEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istockcharteventargs)** - Stock chart event data (load, loaded)
- **[`IZoomingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/izoomingeventargs)** - Zooming event data
- **[`IPointEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/ipointeventargs)** - Point event data (click, move)
- **[`IRangeChangeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/irangechangeeventargs)** - Range change event data
- **[`IRangeSelectorRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/irangeselectorrendereventargs)** - Range selector render event data
- **[`ISeriesRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iseriesrendereventargs)** - Series render event data
- **[`IMouseEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs)** - Mouse event data (click, down, up, move, leave)
- **[`IStockEventRenderArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/istockeventrenderargs)** - Stock event render data
- **[`ITooltipRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/itooltiprendereventargs)** - Tooltip render event data

---

## Common Usage Patterns

- Initialize the StockChart with [`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#datasource) and [`series`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockseriesmodel) to display financial data.
- Configure [`primaryXAxis`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel) and [`primaryYAxis`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartaxismodel) for date and price axes respectively.
- Enable [`enableSelector`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enableselector) to display the range navigator at the bottom of the chart.
- Enable [`enablePeriodSelector`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enableperiodselector) to provide predefined time period buttons (1D, 1M, 3M, 1Y, etc.).
- Add technical indicators using [`indicators`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindicatormodel) for financial analysis (RSI, MACD, Bollinger Bands, etc.).
- Use [`trendlineType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/trendlinetypes) to add trendlines for trend analysis.
- Configure [`stockEvents`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockeventssettingsmodel) to display dividends, stock splits, and other corporate actions.
- Add interactive annotations with [`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartannotationsettingsmodel) for highlighting important data points.
- Use [`selectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/selectionmode) to enable point, series, or drag-based selection.
- Configure [`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stocktooltipsettingsmodel) to show detailed price information on hover.
- Enable [`crosshair`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/crosshairsettingsmodel) for precise value tracking across multiple panels.
- Use [`zoomSettings`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/zoomsettingsmodel) to enable zooming and panning operations.
- Set [`title`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#title) and [`titleStyle`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartfontmodel) for the chart title.
- Customize appearance with [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/charttheme), [`background`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#background), and [`border`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartbordermodel).
- Use [`rows`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartrowmodel) to split the chart into multiple horizontal panels for indicators.
- Handle events like [`pointClick`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/ipointeventargs), [`rangeChange`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/irangechangeeventargs), and [`indicatorChanged`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/iindicatorchangedeventargs) for interactive functionality.
- Use [`rangeChanged()`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#rangechanged) method to programmatically update the chart range.

---

## Notes

- The StockChart component is specifically designed for financial data visualization with support for stock-specific features.
- Technical indicators are added through the [`indicators`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartindicatormodel) collection, with each indicator occupying its own row when [`rows`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/stockchartrowmodel) is configured.
- The range navigator at the bottom of the chart can be enabled/disabled using [`enableSelector`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#enableselector).
- Period selector buttons provide quick navigation to predefined time ranges.
- Stock events like dividends and splits are rendered as markers on the chart for contextual information.
- The [`selectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/selectionmode) supports various drag-based selection modes for advanced user interaction.
- Technical indicators (RSI, MACD, etc.) are rendered in separate panels and can be dynamically added or removed.
- Use [`Inject()`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/#inject) method to dynamically inject required modules.
- The component supports both array-based data and DataManager for flexible data binding.
- Mouse events ([`stockChartMouseClick`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs), [`stockChartMouseDown`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/imouseeventargs), etc.) provide granular control over user interactions.
- Export functionality allows saving the chart in various formats through [`exportType`](https://ej2.syncfusion.com/javascript/documentation/api/stock-chart/exporttype) configuration.
