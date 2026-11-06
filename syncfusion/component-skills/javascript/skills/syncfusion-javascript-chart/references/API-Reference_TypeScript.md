# Chart API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript Chart ([`Syncfusion.EJ2.Charts.Chart`](https://ej2.syncfusion.com/documentation/api/chart/)) component.

- **Base API Documentation:** [Chart](https://ej2.syncfusion.com/documentation/api/chart/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Chart Configuration Properties](#chart-configuration-properties)
- [Axis Properties](#axis-properties)
- [Data and Series Properties](#data-and-series-properties)
- [Visual and Styling Properties](#visual-and-styling-properties)
- [Interaction Properties](#interaction-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Annotation Properties](#annotation-properties)
- [Layout Properties](#layout-properties)
- [Advanced Features](#advanced-features)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [Chart()](https://ej2.syncfusion.com/documentation/api/chart/)
Creates a new instance of the Chart component.

---

## Chart Configuration Properties

- **[`title`](https://ej2.syncfusion.com/documentation/api/chart/#title)** (string): The title is displayed at the top of the chart to provide information about the plotted data. **Default:** ''
- **[`subTitle`](https://ej2.syncfusion.com/documentation/api/chart/#subtitle)** (string): The subtitle is positioned below the main title and provides additional details about the data represented in the chart. **Default:** ''
- **[`description`](https://ej2.syncfusion.com/documentation/api/chart/#description)** (string): A description for the chart that provides additional information about its content for screen readers. **Default:** null
- **[`theme`](https://ej2.syncfusion.com/documentation/api/chart/charttheme)** (ChartTheme): The theme applied to the chart for visual styling. Available themes: Fabric, FabricDark, Bootstrap4, Bootstrap, BootstrapDark, HighContrastLight, HighContrast, Tailwind, TailwindDark, Bootstrap5, Bootstrap5Dark, Fluent, FluentDark, Fluent2, Fluent2Dark, Fluent2HighContrast, Material3, Material3Dark, Material, MaterialDark. **Default:** 'Material'
- **[`locale`](https://ej2.syncfusion.com/documentation/api/chart/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`tabIndex`](https://ej2.syncfusion.com/documentation/api/chart/#tabindex)** (number): The `tabIndex` value determines the order in which the chart container receives focus during keyboard navigation. **Default:** 1
- **[`isTransposed`](https://ej2.syncfusion.com/documentation/api/chart/#istransposed)** (boolean): When set to true, the chart will render in a transposed manner, where the X and Y axes are interchanged. **Default:** false

---

## Axis Properties

- **[`primaryXAxis`](https://ej2.syncfusion.com/documentation/api/chart/axismodel)** (AxisModel): The `primaryXAxis` property configures the horizontal axis of the chart, including settings for axis labels, tick marks, grid lines, and axis ranges.
- **[`primaryYAxis`](https://ej2.syncfusion.com/documentation/api/chart/axismodel)** (AxisModel): The `primaryYAxis` property configures the vertical axis of the chart, including settings for axis labels, tick marks, grid lines, and axis ranges.
- **[`axes`](https://ej2.syncfusion.com/documentation/api/chart/axismodel)** (AxisModel[]): Configuration options for the secondary axis in the chart. Each object in the collection represents an additional axis, allowing for the plotting of multiple data series with different scales.
- **[`rows`](https://ej2.syncfusion.com/documentation/api/chart/rowmodel)** (RowModel[]): Options to split the chart into multiple plotting areas horizontally. Each object in the collection represents a separate plotting area (row) in the chart.
- **[`columns`](https://ej2.syncfusion.com/documentation/api/chart/columnmodel)** (ColumnModel[]): Options to split the chart into multiple plotting areas vertically. Each object in the collection represents a separate plotting area (column) in the chart.

---

## Data and Series Properties

- **[`dataSource`](https://ej2.syncfusion.com/documentation/api/chart/#datasource)** (Object|DataManager): Specifies the data source for the chart. It can be an array of JSON objects, or an instance of DataManager. **Default:** ''
- **[`series`](https://ej2.syncfusion.com/documentation/api/chart/seriesmodel)** (SeriesModel[]): Configuration options for the chart's series. Each object in the `series` collection represents a distinct data series displayed in the chart.
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/documentation/api/chart/indexesmodel)** (IndexesModel[]): Specifies the point indexes to be selected when a chart is initially loaded. **Default:** []
- **[`indicators`](https://ej2.syncfusion.com/documentation/api/chart/technicalindicatormodel)** (TechnicalIndicatorModel[]): Technical indicators assist in evaluating market conditions and identifying trends for making trading decisions.
- **[`rangeColorSettings`](https://ej2.syncfusion.com/documentation/api/chart/rangecolorsettingmodel)** (RangeColorSettingModel[]): The `rangeColorSettings` property specifies a set of rules for applying different colors to points based on their value ranges.
- **[`palettes`](https://ej2.syncfusion.com/documentation/api/chart/#palettes)** (string[]): The `palettes` array defines a set of colors used for rendering the chart's series. Each color in the array is applied to the series in order. **Default:** []

---

## Visual and Styling Properties

- **[`background`](https://ej2.syncfusion.com/documentation/api/chart/#background)** (string): The background color of the chart accepts values in hex and rgba formats as valid CSS color strings. **Default:** null
- **[`backgroundImage`](https://ej2.syncfusion.com/documentation/api/chart/#backgroundimage)** (string): The background image of the chart accepts a string value as a URL link or the location of an image. **Default:** null
- **[`border`](https://ej2.syncfusion.com/documentation/api/chart/bordermodel)** (BorderModel): Options for customizing the appearance of the border in the chart by using the `color` and `width` properties.
- **[`width`](https://ej2.syncfusion.com/documentation/api/chart/#width)** (string): The width of the chart as a string, accepting input such as '100px' or '100%'. **Default:** null
- **[`height`](https://ej2.syncfusion.com/documentation/api/chart/#height)** (string): The height of the chart as a string, accepting input such as '100px' or '100%'. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/documentation/api/chart/marginmodel)** (MarginModel): Options to customize the margins around the chart, including the left, right, top, and bottom margins.
- **[`chartArea`](https://ej2.syncfusion.com/documentation/api/chart/chartareamodel)** (ChartAreaModel): Configuration options for the chart area's border and background.
- **[`titleStyle`](https://ej2.syncfusion.com/documentation/api/chart/titlesettingsmodel)** (titleSettingsModel): Options for customizing the appearance of the title, which displays information about the plotted data.
- **[`subTitleStyle`](https://ej2.syncfusion.com/documentation/api/chart/titlesettingsmodel)** (titleSettingsModel): Options for customizing the appearance of the subtitle.

---

## Interaction Properties

- **[`selectionMode`](https://ej2.syncfusion.com/documentation/api/chart/selectionmode)** (SelectionMode): The `selectionMode` property determines how data points or series can be highlighted or selected. Options: None, Series, Point, Cluster, DragXY, DragX, DragY, Lasso. **Default:** None
- **[`selectionPattern`](https://ej2.syncfusion.com/documentation/api/chart/selectionpattern)** (SelectionPattern): The `selectionPattern` property determines how the selected data points or series are visually represented. **Default:** None
- **[`isMultiSelect`](https://ej2.syncfusion.com/documentation/api/chart/#ismultiselect)** (boolean): When set to true, it allows selecting multiple data points, series, or clusters. **Default:** false
- **[`allowMultiSelection`](https://ej2.syncfusion.com/documentation/api/chart/#allowmultiselection)** (boolean): If set to true, enables multi-drag selection in the chart. This feature allows selecting multiple data points by dragging a selection box. **Default:** false
- **[`highlightMode`](https://ej2.syncfusion.com/documentation/api/chart/highlightmode)** (HighlightMode): The `highlightMode` property determines how a series or individual data points are highlighted in the chart. Options: None, Series, Point, Cluster. **Default:** None
- **[`highlightPattern`](https://ej2.syncfusion.com/documentation/api/chart/selectionpattern)** (SelectionPattern): The `highlightPattern` property determines how the data points or series are visually highlighted. **Default:** None
- **[`highlightColor`](https://ej2.syncfusion.com/documentation/api/chart/#highlightcolor)** (string): Defines the color used to highlight a data point on mouse hover. **Default:** ''
- **[`enableSideBySidePlacement`](https://ej2.syncfusion.com/documentation/api/chart/#enablesidebysideplacement)** (boolean): This property controls whether columns for different series appear next to each other in a column chart. **Default:** true
- **[`enableAutoIntervalOnBothAxis`](https://ej2.syncfusion.com/documentation/api/chart/#enableautointervalonbothaxis)** (boolean): If set to true, the intervals for all the axes will be calculated automatically based on the zoomed range. **Default:** false

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/chart/legendsettingsmodel)** (LegendSettingsModel): The legend provides descriptive information about the data series displayed in the chart.
- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/chart/tooltipsettingsmodel)** (TooltipSettingsModel): Configuration options for the chart's tooltip, which displays details about the points when hovering over them.
- **[`crosshair`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel)** (CrosshairSettingsModel): The crosshair displays lines on the chart that follow the mouse cursor and show the axis values of the data points.
- **[`stackLabels`](https://ej2.syncfusion.com/documentation/api/chart/stacklabelsettingsmodel)** (StackLabelSettingsModel): Configuration options for stack labels in the chart.

---

## Annotation Properties

- **[`annotations`](https://ej2.syncfusion.com/documentation/api/chart/chartannotationsettingsmodel)** (ChartAnnotationSettingsModel[]): Annotations are used to highlight specific data points or areas in the chart, providing additional context and information.

---

## Layout Properties

- **[`focusBorderColor`](https://ej2.syncfusion.com/documentation/api/chart/#focusbordercolor)** (string): Customize the focus border color. If not specified, the element will use the default focus border color. **Default:** null
- **[`focusBorderMargin`](https://ej2.syncfusion.com/documentation/api/chart/#focusbordermargin)** (number): Customize the focus border margin. If not specified, the element will use the default focus border margin. **Default:** 0
- **[`focusBorderWidth`](https://ej2.syncfusion.com/documentation/api/chart/#focusborderwidth)** (number): Customize the focus border width. If not specified, the element will use the default focus border width. **Default:** 1.5
- **[`noDataTemplate`](https://ej2.syncfusion.com/documentation/api/chart/#nodatatemplate)** (string|Function): Specifies the template to be displayed when the chart has no data. **Default:** null

---

## Advanced Features

- **[`enableAnimation`](https://ej2.syncfusion.com/documentation/api/chart/#enableanimation)** (boolean): If set to true, animation effects will be enabled for chart elements such as axis labels, gridlines, series, markers, and data labels. **Default:** true
- **[`enableCanvas`](https://ej2.syncfusion.com/documentation/api/chart/#enablecanvas)** (boolean): When set to true, the chart will render using a canvas. **Default:** false
- **[`enableExport`](https://ej2.syncfusion.com/documentation/api/chart/#enableexport)** (boolean): When set to true, it enables exporting the chart to various formats such as `JPEG`, `PNG`, `SVG`, `PDF`, `XLSX`, or `CSV`. **Default:** true
- **[`enableHtmlSanitizer`](https://ej2.syncfusion.com/documentation/api/chart/#enablehtmlsanitizer)** (boolean): Specifies whether to display or remove the untrusted HTML values in the Chart component. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/chart/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/chart/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/documentation/api/chart/#usegroupingseparator)** (boolean): When set to true, a grouping separator will be used for numbers to separate groups of thousands in the chart. **Default:** false
- **[`allowExport`](https://ej2.syncfusion.com/documentation/api/chart/#allowexport)** (boolean): To enable export feature in blazor chart. **Default:** false
- **[`zoomSettings`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel)** (ZoomSettingsModel): Options to enable and configure the zooming feature in the chart.
- **[`accessibility`](https://ej2.syncfusion.com/documentation/api/chart/accessibilitymodel)** (AccessibilityModel): Options to improve accessibility for chart elements.

---

## Module Properties

- **[`accumulationDistributionIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (AccumulationDistributionIndicator): `accumulationDistributionIndicatorModule` is used to predict the market trend using Accumulation Distribution approach.
- **[`areaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (AreaSeries): `areaSeriesModule` is used to add area series to the chart.
- **[`atrIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (AtrIndicator): `atrIndicatorModule` is used to predict the market trend using ATR approach.
- **[`annotationModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (ChartAnnotation): `annotationModule` is used to manipulate and add annotation to the chart.
- **[`barSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (BarSeries): `barSeriesModule` is used to add bar series to the chart.
- **[`bollingerBandsModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (BollingerBands): `bollingerBandsModule` is used to predict the market trend using Bollinger approach.
- **[`boxAndWhiskerSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (BoxAndWhiskerSeries): `boxAndWhiskerSeriesModule` is used to add box and whisker series to the chart.
- **[`bubbleSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (BubbleSeries): `bubbleSeries` is used to add bubble series to the chart.
- **[`candleSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (CandleSeries): `candleSeriesModule` is used to add candle series to the chart.
- **[`categoryModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (Category): `categoryModule` is used to manipulate and add category axis to the chart.
- **[`columnSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (ColumnSeries): `columnSeriesModule` is used to add column series to the chart.
- **[`crosshairModule`](https://ej2.syncfusion.com/documentation/api/chart/crosshair)** (Crosshair): `crosshairModule` is used to manipulate and add crosshair to the chart.
- **[`dataEditingModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (DataEditing): `dataEditingModule` is used to drag and drop of the point.
- **[`dataLabelModule`](https://ej2.syncfusion.com/documentation/api/chart/datalabel)** (DataLabel): `dataLabelModule` is used to manipulate and add data label to the series.
- **[`dateTimeCategoryModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (DateTimeCategory): `dateTimeCategoryModule` is used to manipulate date time and category axis to the chart.
- **[`dateTimeModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (DateTime): `dateTimeModule` is used to manipulate and add date time axis to the chart.
- **[`eMAIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (EmaIndicator): `eMAIndicatorModule` is used to predict the market trend using EMA approach.
- **[`errorBarModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (ErrorBar): `errorBarModule` is used to manipulate and add errorBar for series.
- **[`exportModule`](https://ej2.syncfusion.com/documentation/api/chart/export)** (Export): `exportModule` is used to export the chart in `JPEG`, `PNG`, `SVG`, `PDF`, `XLSX`, or `CSV` format.
- **[`highlightModule`](https://ej2.syncfusion.com/documentation/api/chart/highlight)** (Highlight): `highlightModule` is used to manipulate and add highlight to the chart.
- **[`hiloOpenCloseSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (HiloOpenCloseSeries): `hiloOpenCloseSeriesModule` is used to add hilo open close series to the chart.
- **[`hiloSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (HiloSeries): `hiloSeriesModule` is used to add hilo series to the chart.
- **[`histogramSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (HistogramSeries): `histogramSeriesModule` is used to add histogram series to the chart.
- **[`lastValueLabelModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (LastValueLabel): `lastValueLabelModule` is used to manipulate and add last value indicator to the series.
- **[`legendModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (Legend): `legendModule` is used to manipulate and add legend to the chart.
- **[`lineSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (LineSeries): `lineSeriesModule` is used to add line series to the chart.
- **[`logarithmicModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (Logarithmic): `logarithmicModule` is used to manipulate and add log axis to the chart.
- **[`macdIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (MacdIndicator): `macdIndicatorModule` is used to predict the market trend using Macd approach.
- **[`momentumIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (MomentumIndicator): `momentumIndicatorModule` is used to predict the market trend using Momentum approach.
- **[`multiColoredAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (MultiColoredAreaSeries): `multiColoredAreaSeriesModule` is used to add multi colored area series to the chart.
- **[`multiColoredLineSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (MultiColoredLineSeries): `multiColoredLineSeriesModule` is used to add multi colored line series to the chart.
- **[`multiLevelLabelModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (MultiLevelLabel): `multiLevelLabelModule` is used to manipulate and add multi-level labels to the chart.
- **[`paretoSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (ParetoSeries): `paretoSeriesModule` is used to add pareto series to the chart.
- **[`polarSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (PolarSeries): `polarSeriesModule` is used to add polar series to the chart.
- **[`radarSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (RadarSeries): `radarSeriesModule` is used to add radar series to the chart.
- **[`rangeAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (RangeAreaSeries): `rangeAreaSeriesModule` is used to add range area series to the chart.
- **[`rangeColumnSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (RangeColumnSeries): `rangeColumnSeriesModule` is used to add range column series to the chart.
- **[`rangeStepAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (RangeStepAreaSeries): `rangeStepAreaSeriesModule` is used to add range step area series to the chart.
- **[`rsiIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (RsiIndicator): `rSIIndicatorModule` is used to predict the market trend using RSI approach.
- **[`sMAIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (SmaIndicator): `sMAIndicatorModule` is used to predict the market trend using SMA approach.
- **[`scatterSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (ScatterSeries): `scatterSeriesModule` is used to add scatter series to the chart.
- **[`scrollBarModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (ScrollBar): `scrollBarModule` is used to render a scrollbar in the chart while zooming.
- **[`selectionModule`](https://ej2.syncfusion.com/documentation/api/chart/selection)** (Selection): `selectionModule` is used to manipulate and add selection to the chart.
- **[`seriesLabelModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (SeriesLabel): `seriesLabelModule` is used to manipulate and add series label to the series.
- **[`splineAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (SplineAreaSeries): `splineAreaSeriesModule` is used to add spline area series to the chart.
- **[`splineRangeAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (SplineRangeAreaSeries): `splineRangeAreaSeriesModule` is used to add spline range area series to the chart.
- **[`splineSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (SplineSeries): `splineSeriesModule` is used to add spline series to the chart.
- **[`stackingAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StackingAreaSeries): `stackingAreaSeriesModule` is used to add stacking area series to the chart.
- **[`stackingBarSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StackingBarSeries): `stackingBarSeriesModule` is used to add stacking bar series to the chart.
- **[`stackingColumnSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StackingColumnSeries): `stackingColumnSeriesModule` is used to add stacking column series to the chart.
- **[`stackingLineSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StackingLineSeries): `stackingLineSeriesModule` is used to add stacking line series to the chart.
- **[`stackingStepAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StackingStepAreaSeries): `stackingStepAreaSeriesModule` is used to add stacking step area series to the chart.
- **[`stepAreaSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StepAreaSeries): `stepAreaSeriesModule` is used to add step area series to the chart.
- **[`stepLineSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StepLineSeries): `stepLineSeriesModule` is used to add step line series to the chart.
- **[`stochasticIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (StochasticIndicator): `stochasticIndicatorModule` is used to predict the market trend using Stochastic approach.
- **[`stripLineModule`](https://ej2.syncfusion.com/documentation/api/chart/stripline)** (StripLine): `stripLineModule` is used to manipulate and add strip line to the chart.
- **[`tMAIndicatorModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (TmaIndicator): `tMAIndicatorModule` is used to predict the market trend using TMA approach.
- **[`tooltipModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (Tooltip): `tooltipModule` is used to manipulate and add tooltip to the series.
- **[`trendLineModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (Trendlines): `trendlineModule` is used to predict the market trend using trendlines.
- **[`waterfallSeriesModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (WaterfallSeries): `waterfallSeries` is used to add waterfall series to the chart.
- **[`zoomModule`](https://ej2.syncfusion.com/documentation/api/chart/)** (Zoom): `zoomModule` is used to manipulate and add zooming to the chart.

---

## Methods

### [addAxes()](https://ej2.syncfusion.com/documentation/api/chart/#addaxes)
To add secondary axis for the chart.

**Parameters:**
- `axisCollection` (AxisModel[]): Defines the axis collection to be added in chart.

**Returns:** void

### [addSeries()](https://ej2.syncfusion.com/documentation/api/chart/#addseries)
To add series for the chart.

**Parameters:**
- `seriesCollection` (SeriesModel[]): Defines the series collection to be added in chart.

**Returns:** void

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/chart/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs.

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/chart/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [clearSeries()](https://ej2.syncfusion.com/documentation/api/chart/#clearseries)
Clear all series from the chart.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/chart/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/documentation/api/chart/#destroy)
To destroy the widget.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/chart/#export)
Exports the chart in the specified format.

**Parameters:**
- `type` (ExportType): The file format for the export. Available options are PNG, JPEG, PDF, and SVG.
- `fileName` (string): The name of the file to be saved.

**Returns:** void

### [getLocalizedLabel()](https://ej2.syncfusion.com/documentation/api/chart/#getlocalizedlabel)
Gets the localized label by locale keyword.

**Parameters:**
- `key` (string): key

**Returns:** string

### [getModuleName()](https://ej2.syncfusion.com/documentation/api/chart/#getmodulename)
Get component name.

**Returns:** string

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/chart/#getrootelement)
Returns the route element of the component.

**Returns:** HTMLElement

### [hideCrosshair()](https://ej2.syncfusion.com/documentation/api/chart/#hidecrosshair)
Hides a tooltip in the chart.

**Returns:** void

### [hideTooltip()](https://ej2.syncfusion.com/documentation/api/chart/#hidetooltip)
Hides a tooltip in the chart.

**Returns:** void

### [print()](https://ej2.syncfusion.com/documentation/api/chart/#print)
Prints the chart or specified element.

**Parameters:**
- `id` (optional) (string[] | string | Element): The ID or array of IDs of the elements to print.

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/chart/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [refreshLiveData()](https://ej2.syncfusion.com/documentation/api/chart/#refreshlivedata)
Refresh the chart for live data updates.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/chart/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [removeSeries()](https://ej2.syncfusion.com/documentation/api/chart/#removeseries)
To Remove series for the chart.

**Parameters:**
- `index` (number): Defines the series index to be remove in chart series

**Returns:** void

### [setAnnotationValue()](https://ej2.syncfusion.com/documentation/api/chart/#setannotationvalue)
Sets the content of the annotation dynamically for the chart.

**Parameters:**
- `annotationIndex` (number): The index of the annotation.
- `content` (string): The content to set for the annotation.

**Returns:** void

### [showCrosshair()](https://ej2.syncfusion.com/documentation/api/chart/#showcrosshair)
Displays a crosshair for the chart.

**Parameters:**
- `x` (number): Specifies the x value of the point or x coordinate.
- `y` (number): Specifies the x value of the point or y coordinate.

**Returns:** void

### [showTooltip()](https://ej2.syncfusion.com/documentation/api/chart/#showtooltip)
Displays a tooltip for the data points.

**Parameters:**
- `x` (number | string | Date): Specifies the x value of the point or x coordinate.
- `y` (number): Specifies the x value of the point or y coordinate.
- `isPoint` (boolean): Specifies whether x and y are data point or chart coordinates.

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/chart/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [afterExport](https://ej2.syncfusion.com/documentation/api/chart/#afterexport)
Triggers after the export is completed.

### [animationComplete](https://ej2.syncfusion.com/documentation/api/chart/ianimationcompleteeventargs)
Triggers after the animation for the series is completed.

### [annotationRender](https://ej2.syncfusion.com/documentation/api/chart/iannotationrendereventargs)
Triggers before the annotation gets rendered. This event allows for modifications of the annotation content and its location before it is rendered on the chart.

### [axisLabelClick](https://ej2.syncfusion.com/documentation/api/chart/iaxislabelclickeventargs)
Triggers when the x-axis label is clicked.

### [axisLabelRender](https://ej2.syncfusion.com/documentation/api/chart/iaxislabelrendereventargs)
Triggers before each axis label is rendered. This event allows for the customization of axis label and its font style before rendering on the chart.

### [axisMultiLabelRender](https://ej2.syncfusion.com/documentation/api/chart/iaxismultilabelrendereventargs)
Triggers before each axis multi-label is rendered. This event allows modification of multi-labels on the axis before they are rendered.

### [axisRangeCalculated](https://ej2.syncfusion.com/documentation/api/chart/iaxisrangecalculatedeventargs)
Triggers before each axis range is rendered. This event allows modification of the axis range and interval that are calculated based on data.

### [beforeExport](https://ej2.syncfusion.com/documentation/api/chart/iexporteventargs)
Triggers before the export process begins. This event allows for the customization of export settings before the chart is exported.

### [beforePrint](https://ej2.syncfusion.com/documentation/api/chart/iprinteventargs)
Triggers before the printing process starts. This event allows for the modification of the chart's HTML content before it is sent to the printer.

### [beforeResize](https://ej2.syncfusion.com/documentation/api/chart/ibeforeresizeeventargs)
Triggers before the chart is resized. This event allows for modifications to the chart size before resizing occurs.

### [chartDoubleClick](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)
Triggers when double-clicking the chart.

### [chartMouseClick](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)
Triggers when clicking on the chart.

### [chartMouseDown](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)
Triggers on mouse down.

### [chartMouseLeave](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)
Triggers when the cursor leaves the chart.

### [chartMouseMove](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)
Triggers on hovering over the chart.

### [chartMouseUp](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)
Triggers on mouse up.

### [crosshairLabelRender](https://ej2.syncfusion.com/documentation/api/chart/icrosshairlabelrendereventargs)
Triggers before the crosshair for the series is rendered. This event allows customization of the crosshair properties such as text, style, and fill before it is rendered on the chart.

### [drag](https://ej2.syncfusion.com/documentation/api/chart/idataeditingeventargs)
Triggers when the point is being dragged.

### [dragComplete](https://ej2.syncfusion.com/documentation/api/chart/idragcompleteeventargs)
Triggers after the drag selection is completed.

### [dragEnd](https://ej2.syncfusion.com/documentation/api/chart/idataeditingeventargs)
Triggers when the point drag operation ends.

### [dragStart](https://ej2.syncfusion.com/documentation/api/chart/idataeditingeventargs)
Triggers when the drag operation for a point starts.

### [legendClick](https://ej2.syncfusion.com/documentation/api/chart/ilegendclickeventargs)
Triggers after clicking on a legend item.

### [legendRender](https://ej2.syncfusion.com/documentation/api/chart/ilegendrendereventargs)
Triggers before the legend is rendered. This allows the customization of legend before rendering on the chart.

### [load](https://ej2.syncfusion.com/documentation/api/chart/iloadedeventargs)
Triggers before the chart loads. This event allows for customization and configuration before the chart is rendered.

### [loaded](https://ej2.syncfusion.com/documentation/api/chart/iloadedeventargs)
Triggers after the chart has fully loaded.

### [multiLevelLabelClick](https://ej2.syncfusion.com/documentation/api/chart/imultilevellabelclickeventargs)
Triggers after clicking on a multi-level label.

### [onZooming](https://ej2.syncfusion.com/documentation/api/chart/izoomingeventargs)
Triggers when the zoom selection started.

### [pointClick](https://ej2.syncfusion.com/documentation/api/chart/ipointeventargs)
Triggers on point click.

### [pointDoubleClick](https://ej2.syncfusion.com/documentation/api/chart/ipointeventargs)
Triggers on point double-click.

### [pointMove](https://ej2.syncfusion.com/documentation/api/chart/ipointeventargs)
Triggers when a data point is hovered.

### [pointRender](https://ej2.syncfusion.com/documentation/api/chart/ipointrendereventargs)
Triggers before each point in the series is rendered. This allows for the customization of each data point before it is rendered on the chart.

### [resized](https://ej2.syncfusion.com/documentation/api/chart/iresizeeventargs)
Triggers after the chart is resized.

### [scrollChanged](https://ej2.syncfusion.com/documentation/api/chart/iscrolleventargs)
Triggers when the scroll position changes.

### [scrollEnd](https://ej2.syncfusion.com/documentation/api/chart/iscrolleventargs)
Triggers after the scroll action ends.

### [scrollStart](https://ej2.syncfusion.com/documentation/api/chart/iscrolleventargs)
Triggers when the scroll action starts.

### [selectionComplete](https://ej2.syncfusion.com/documentation/api/chart/iselectioncompleteeventargs)
Triggers after the selection is completed.

### [seriesRender](https://ej2.syncfusion.com/documentation/api/chart/iseriesrendereventargs)
Triggers before the series is rendered. This event allows for the customization of series properties before they are rendered on the chart.

### [sharedTooltipRender](https://ej2.syncfusion.com/documentation/api/chart/isharedtooltiprendereventargs)
Triggers before the shared tooltip for the series is rendered. This event allows customization of the shared tooltip properties such as text, style, and template before it is rendered on the chart.

### [textRender](https://ej2.syncfusion.com/documentation/api/chart/itextrendereventargs)
Triggers before the data label for the series is rendered. This allows customization of data labels before they are rendered on the chart.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/chart/itooltiprendereventargs)
Triggers before the tooltip for the series is rendered. This event allows customization of the tooltip properties such as text, style, and template before it is rendered on the chart.

### [zoomComplete](https://ej2.syncfusion.com/documentation/api/chart/izoomcompleteeventargs)
Triggers after the zoom selection is completed.

---

## Related Settings Classes

### Axis and Layout Configuration
- **[`AxisModel`](https://ej2.syncfusion.com/documentation/api/chart/axismodel)** - Represents the axis model
- **[`RowModel`](https://ej2.syncfusion.com/documentation/api/chart/rowmodel)** - Represents row configuration for horizontal splits
- **[`ColumnModel`](https://ej2.syncfusion.com/documentation/api/chart/columnmodel)** - Represents column configuration for vertical splits

### Series and Data Configuration
- **[`SeriesModel`](https://ej2.syncfusion.com/documentation/api/chart/seriesmodel)** - Represents the series model
- **[`IndexesModel`](https://ej2.syncfusion.com/documentation/api/chart/indexesmodel)** - Represents data point indexes for selection
- **[`TechnicalIndicatorModel`](https://ej2.syncfusion.com/documentation/api/chart/technicalindicatormodel)** - Represents technical indicators
- **[`RangeColorSettingModel`](https://ej2.syncfusion.com/documentation/api/chart/rangecolorsettingmodel)** - Represents range color settings

### Legend and Tooltip Settings
- **[`LegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/legendsettingsmodel)** - Represents the legend settings
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/tooltipsettingsmodel)** - Represents the tooltip settings
- **[`CrosshairSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/crosshairsettingsmodel)** - Represents crosshair settings
- **[`StackLabelSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/stacklabelsettingsmodel)** - Represents stack label settings

### Visual and Styling
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/chart/bordermodel)** - Represents border model for chart
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/chart/marginmodel)** - Represents margin configuration
- **[`ChartAreaModel`](https://ej2.syncfusion.com/documentation/api/chart/chartareamodel)** - Represents chart area configuration
- **[`titleSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/titlesettingsmodel)** - Represents title style settings

### Selection and Highlighting
- **[`SelectionMode`](https://ej2.syncfusion.com/documentation/api/chart/selectionmode)** - Specifies selection mode options
- **[`HighlightMode`](https://ej2.syncfusion.com/documentation/api/chart/highlightmode)** - Specifies highlight mode options
- **[`SelectionPattern`](https://ej2.syncfusion.com/documentation/api/chart/selectionpattern)** - Specifies pattern for selection and highlighting

### Annotations and Accessibility
- **[`ChartAnnotationSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/chartannotationsettingsmodel)** - Represents annotation settings
- **[`AccessibilityModel`](https://ej2.syncfusion.com/documentation/api/chart/accessibilitymodel)** - Represents accessibility options

### Advanced Features
- **[`ZoomSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel)** - Represents zoom settings
- **[`ChartTheme`](https://ej2.syncfusion.com/documentation/api/chart/charttheme)** - Specifies available themes

### Event Arguments
- **[`IAnimationCompleteEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/ianimationcompleteeventargs)** - Represents animation complete event data
- **[`IAnnotationRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iannotationrendereventargs)** - Represents annotation render event data
- **[`IAxisLabelClickEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iaxislabelclickeventargs)** - Represents axis label click event data
- **[`IAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iaxislabelrendereventargs)** - Represents axis label render event data
- **[`IExportEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iexporteventargs)** - Represents export event data
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iprinteventargs)** - Represents print event data
- **[`IBeforeResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/ibeforeresizeeventargs)** - Represents before resize event data
- **[`IMouseEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/imouseeventargs)** - Represents mouse event data
- **[`ILegendClickEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/ilegendclickeventargs)** - Represents legend click event data
- **[`ILegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/ilegendrendereventargs)** - Represents legend render event data
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iloadedeventargs)** - Represents chart loaded event data
- **[`IPointEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/ipointeventargs)** - Represents point event data
- **[`IPointRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/ipointrendereventargs)** - Represents point render event data
- **[`IResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iresizeeventargs)** - Represents resize event data
- **[`ISelectionCompleteEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iselectioncompleteeventargs)** - Represents selection complete event data
- **[`ISeriesRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/iseriesrendereventargs)** - Represents series render event data
- **[`ITextRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/itextrendereventargs)** - Represents text (data label) render event data
- **[`ITooltipRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/itooltiprendereventargs)** - Represents tooltip render event data
- **[`IZoomingEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/izoomingeventargs)** - Represents zooming event data
- **[`IZoomCompleteEventArgs`](https://ej2.syncfusion.com/documentation/api/chart/izoomcompleteeventargs)** - Represents zoom complete event data

---

## Common Usage Patterns

- Configure the chart with [`series`](https://ej2.syncfusion.com/documentation/api/chart/seriesmodel) and [`dataSource`](https://ej2.syncfusion.com/documentation/api/chart/#datasource) to bind data and display visualizations.
- Set up axes using [`primaryXAxis`](https://ej2.syncfusion.com/documentation/api/chart/axismodel) and [`primaryYAxis`](https://ej2.syncfusion.com/documentation/api/chart/axismodel) for proper data representation.
- Customize chart appearance using [`theme`](https://ej2.syncfusion.com/documentation/api/chart/charttheme), [`background`](https://ej2.syncfusion.com/documentation/api/chart/#background), [`border`](https://ej2.syncfusion.com/documentation/api/chart/bordermodel), and [`margin`](https://ej2.syncfusion.com/documentation/api/chart/marginmodel) settings.
- Enable user interaction with [`selectionMode`](https://ej2.syncfusion.com/documentation/api/chart/selectionmode), [`highlightMode`](https://ej2.syncfusion.com/documentation/api/chart/highlightmode), [`tooltip`](https://ej2.syncfusion.com/documentation/api/chart/tooltipsettingsmodel), and [`legendSettings`](https://ej2.syncfusion.com/documentation/api/chart/legendsettingsmodel).
- Add animations with [`enableAnimation`](https://ej2.syncfusion.com/documentation/api/chart/#enableanimation) set to true for dynamic visual effects.
- Export charts using the [`export()`](https://ej2.syncfusion.com/documentation/api/chart/#export) method after enabling [`enableExport`](https://ej2.syncfusion.com/documentation/api/chart/#enableexport).
- Add custom annotations using [`annotations`](https://ej2.syncfusion.com/documentation/api/chart/chartannotationsettingsmodel) or dynamically with [`setAnnotationValue()`](https://ej2.syncfusion.com/documentation/api/chart/#setannotationvalue).
- Configure zoom capabilities using [`zoomSettings`](https://ej2.syncfusion.com/documentation/api/chart/zoomsettingsmodel) and the [`zoomModule`](https://ej2.syncfusion.com/documentation/api/chart/).
- Handle chart lifecycle events like [`load`](https://ej2.syncfusion.com/documentation/api/chart/iloadedeventargs), [`loaded`](https://ej2.syncfusion.com/documentation/api/chart/iloadedeventargs), and [`resized`](https://ej2.syncfusion.com/documentation/api/chart/iresizeeventargs) for dynamic updates.
- Use the module injection pattern with [`Inject()`](https://ej2.syncfusion.com/documentation/api/chart/#inject) to dynamically load required features and indicators.

---

## Notes

- All dates should use ISO 8601 format (YYYY-MM-DD) when binding DateTime values in the chart.
- The chart supports multiple data binding options through [`dataSource`](https://ej2.syncfusion.com/documentation/api/chart/#datasource) including arrays and DataManager instances for remote data.
- Use the module injection pattern with [`Inject()`](https://ej2.syncfusion.com/documentation/api/chart/#inject) to dynamically load required features like data labels, tooltips, legends, and technical indicators.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/documentation/api/chart/#addeventlistener) method or by directly assigning to event properties for real-time chart interactions.
- Enable [`enableHtmlSanitizer`](https://ej2.syncfusion.com/documentation/api/chart/#enablehtmlsanitizer) to sanitize untrusted HTML values in tooltips, labels, and annotations for security.
- Use [`enableSideBySidePlacement`](https://ej2.syncfusion.com/documentation/api/chart/#enablesidebysideplacement) to control column placement in multi-series column charts.
- Technical indicators and trendlines are useful for financial and stock market data analysis.
- The chart supports both canvas and SVG rendering modes via [`enableCanvas`](https://ej2.syncfusion.com/documentation/api/chart/#enablecanvas).

## WebMCP APIs and TypeScript Module Rule

### Properties

- **enableWebMcp** (`boolean`): Enables automatic WebMCP tool registration after Chart rendering. **Default:** `false`.
- **webMcpSettings** (`ChartWebMcpSettingsModel`): Configures the registration name, built-in tool allowlist or custom tools, and exposure targets.

### `ChartWebMcpSettingsModel`

- **name** (`string`): Prefix for registered tool names. The stable Chart element ID is used when this value is null or empty.
- **tools** (`string[] | WebMcpTool[]`): Built-in tool allowlist or custom tool definitions. Omit it to register all built-in tools. An explicit empty array clears previous registrations.
- **exposedTo** (`string[]`): Model contexts or origins permitted to access the registered tools.

### Method

- **getWebMcpTools(tools?: string[])** (`WebMcpTool[]`): Returns executable copies of all or selected built-in tool definitions. It is for retrieval, diagnostics, testing, or direct execution, not registration.

### Event

- **beforeWebMcpToolExecute** (`WebMcpToolExecuteEventArgs`): Runs before tool execution and can inspect, cancel, or control confirmation for the operation.

### TypeScript import and injection requirement

For a TypeScript WebMCP sample, import and inject every available Chart feature module. Do not reduce the module list based on the initially rendered series because WebMCP can change series types and enable additional Chart features at runtime.

```ts
import {
    Chart, AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands,
    BoxAndWhiskerSeries, BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing,
    DataLabel, DateTime, DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries,
    HiloSeries, HistogramSeries, LastValueLabel, Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator,
    MultiColoredAreaSeries, MultiColoredLineSeries, MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries,
    RangeAreaSeries, RangeColumnSeries, RangeStepAreaSeries, RsiIndicator, ScatterSeries, ScrollBar, Selection,
    SeriesLabel, SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries, SplineSeries, StackingArea100Series,
    StackingAreaSeries, StackingBar100Series, StackingBarSeries, StackingColumn100Series, StackingColumnSeries,
    StackingLine100Series, StackingLineSeries, StackingStepAreaSeries, StepAreaSeries, StepLineSeries,
    StochasticIndicator, StripLine, TmaIndicator, Tooltip, Trendlines, WaterfallSeries, WebMcpChart, Zoom
} from '@syncfusion/ej2-charts';

Chart.Inject(
    AccumulationDistributionIndicator, AreaSeries, AtrIndicator, BarSeries, BollingerBands, BoxAndWhiskerSeries,
    BubbleSeries, CandleSeries, Category, ChartAnnotation, ColumnSeries, Crosshair, DataEditing, DataLabel, DateTime,
    DateTimeCategory, EmaIndicator, ErrorBar, Export, Highlight, HiloOpenCloseSeries, HiloSeries, HistogramSeries,
    LastValueLabel, Legend, LineSeries, Logarithmic, MacdIndicator, MomentumIndicator, MultiColoredAreaSeries,
    MultiColoredLineSeries, MultiLevelLabel, ParetoSeries, PolarSeries, RadarSeries, RangeAreaSeries,
    RangeColumnSeries, RangeStepAreaSeries, RsiIndicator, ScatterSeries, ScrollBar, Selection, SeriesLabel,
    SmaIndicator, SplineAreaSeries, SplineRangeAreaSeries, SplineSeries, StackingArea100Series, StackingAreaSeries,
    StackingBar100Series, StackingBarSeries, StackingColumn100Series, StackingColumnSeries, StackingLine100Series,
    StackingLineSeries, StackingStepAreaSeries, StepAreaSeries, StepLineSeries, StochasticIndicator, StripLine,
    TmaIndicator, Tooltip, Trendlines, WaterfallSeries, WebMcpChart, Zoom
);
```

Always include `WebMcpChart`. This complete import and injection list allows customers to change `Column` to `Line`, `Spline`, `Area`, financial, stacked, polar, radar, or another supported series and enable indicators, trendlines, selection, zoom, annotations, export, and data labels without modifying module setup.

### TypeScript WebMCP rules

- Give the Chart a stable ID and set `enableWebMcp: true`.
- Registration is automatic. Never call `registerWebMcpTools()` and never generate a registration button.
- Omit `webMcpSettings.tools` when all built-in tools are required.
- Use only verified tool names in an explicit allowlist.
- Preserve the complete imports and `Chart.Inject(...)` list in WebMCP samples.
