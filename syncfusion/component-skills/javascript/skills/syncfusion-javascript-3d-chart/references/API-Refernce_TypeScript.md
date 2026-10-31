# Chart3D API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript Chart3D ([`Syncfusion.EJ2.Charts.Chart3D`](https://ej2.syncfusion.com/documentation/api/chart3d/)) component.

- **Base API Documentation:** [Chart3D](https://ej2.syncfusion.com/documentation/api/chart3d/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [3D Appearance Properties](#3d-appearance-properties)
- [Axis and Series Properties](#axis-and-series-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Selection and Highlighting Properties](#selection-and-highlighting-properties)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [Chart3D()](https://ej2.syncfusion.com/documentation/api/chart3d/)
Creates a new instance of the Chart3D component.

---

## Core Configuration Properties

- **[`dataSource`](https://ej2.syncfusion.com/documentation/api/chart3d/#datasource)** (Object|DataManager): Specifies the DataSource for the chart as an array of JSON objects or DataManager instance. **Default:** ''
- **[`title`](https://ej2.syncfusion.com/documentation/api/chart3d/#title)** (string): Title of the chart. **Default:** ''
- **[`subTitle`](https://ej2.syncfusion.com/documentation/api/chart3d/#subtitle)** (string): SubTitle of the chart. **Default:** ''
- **[`description`](https://ej2.syncfusion.com/documentation/api/chart3d/#description)** (string): Description for chart. **Default:** null
- **[`locale`](https://ej2.syncfusion.com/documentation/api/chart3d/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`theme`](https://ej2.syncfusion.com/documentation/api/chart3d/charttheme)** (ChartTheme): Specifies the theme for the chart. **Default:** 'Bootstrap5'
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/documentation/api/chart3d/#usegroupingseparator)** (boolean): Specifies whether a grouping separator should be used for a number. **Default:** false

---

## 3D Appearance Properties

- **[`depth`](https://ej2.syncfusion.com/documentation/api/chart3d/#depth)** (number): Depth of the 3D Chart from front view of the series to the background wall. **Default:** 50
- **[`rotation`](https://ej2.syncfusion.com/documentation/api/chart3d/#rotation)** (number): Defines the rotating angle for the 3D chart. **Default:** 0
- **[`tilt`](https://ej2.syncfusion.com/documentation/api/chart3d/#tilt)** (number): Defines the slope angle for the 3D chart. **Default:** 0
- **[`perspectiveAngle`](https://ej2.syncfusion.com/documentation/api/chart3d/#perspectiveangle)** (number): Defines the perspective angle for the 3D chart. **Default:** 90
- **[`wallColor`](https://ej2.syncfusion.com/documentation/api/chart3d/#wallcolor)** (string): Represents the color of the 3D wall. **Default:** null
- **[`wallSize`](https://ej2.syncfusion.com/documentation/api/chart3d/#wallsize)** (number): Defines the width of the 3D chart wall. **Default:** 2
- **[`enableRotation`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablerotation)** (boolean): If set true, enables the rotation in the 3D chart. **Default:** false
- **[`isTransposed`](https://ej2.syncfusion.com/documentation/api/chart3d/#istransposed)** (boolean): It specifies whether the chart should be render in transposed manner or not. **Default:** false
- **[`background`](https://ej2.syncfusion.com/documentation/api/chart3d/#background)** (string): The background color of the chart that accepts value in hex and rgba as a valid CSS color string. **Default:** null
- **[`backgroundImage`](https://ej2.syncfusion.com/documentation/api/chart3d/#backgroundimage)** (string): The background image of the chart that accepts value in string as url link or location of an image. **Default:** null
- **[`border`](https://ej2.syncfusion.com/documentation/api/chart3d/bordermodel)** (BorderModel): Options for customizing the color and width of the chart border.
- **[`height`](https://ej2.syncfusion.com/documentation/api/chart3d/#height)** (string): The height of the chart as a string accepts input both as '100px' or '100%'. If specified as '100%', chart renders to the full height of its parent element. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/chart3d/#width)** (string): The width of the chart as a string accepts input as both like '100px' or '100%'. If specified as '100%', chart renders to the full width of its parent element. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/documentation/api/chart3d/marginmodel)** (MarginModel): Options to customize left, right, top and bottom margins of the chart.
- **[`palettes`](https://ej2.syncfusion.com/documentation/api/chart3d/#palettes)** (string[]): Palette for the chart series. **Default:** []

---

## Axis and Series Properties

- **[`primaryXAxis`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxismodel)** (Chart3DAxisModel): Options to configure the horizontal axis.
- **[`primaryYAxis`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxismodel)** (Chart3DAxisModel): Options to configure the vertical axis.
- **[`axes`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxismodel)** (Chart3DAxisModel[]): Secondary axis collection for the chart.
- **[`series`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dseriesmodel)** (Chart3DSeriesModel[]): The configuration for series in the chart.
- **[`rows`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3drowmodel)** (Chart3DRowModel[]): Options to split Chart into multiple plotting areas horizontally.
- **[`columns`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dcolumnmodel)** (Chart3DColumnModel[]): Options to split chart into multiple plotting areas vertically.

---

## Visual and Styling Properties

- **[`background`](https://ej2.syncfusion.com/documentation/api/chart3d/#background)** (string): The background color of the chart that accepts value in hex and rgba as a valid CSS color string. **Default:** null
- **[`backgroundImage`](https://ej2.syncfusion.com/documentation/api/chart3d/#backgroundimage)** (string): The background image of the chart that accepts value in string as url link or location of an image. **Default:** null
- **[`border`](https://ej2.syncfusion.com/documentation/api/chart3d/bordermodel)** (BorderModel): Options for customizing the color and width of the chart border.
- **[`width`](https://ej2.syncfusion.com/documentation/api/chart3d/#width)** (string): The width of the chart as a string accepts input as both like '100px' or '100%'. **Default:** null
- **[`height`](https://ej2.syncfusion.com/documentation/api/chart3d/#height)** (string): The height of the chart as a string accepts input both as '100px' or '100%'. **Default:** null
- **[`theme`](https://ej2.syncfusion.com/documentation/api/chart3d/charttheme)** (ChartTheme): Specifies the theme for the chart. **Default:** 'Bootstrap5'
- **[`wallColor`](https://ej2.syncfusion.com/documentation/api/chart3d/#wallcolor)** (string): Represents the color of the 3D wall. **Default:** null
- **[`wallSize`](https://ej2.syncfusion.com/documentation/api/chart3d/#wallsize)** (number): Defines the width of the 3D chart wall. **Default:** 2
- **[`margin`](https://ej2.syncfusion.com/documentation/api/chart3d/marginmodel)** (MarginModel): Options to customize left, right, top and bottom margins of the chart.
- **[`palettes`](https://ej2.syncfusion.com/documentation/api/chart3d/#palettes)** (string[]): Palette for the chart series. **Default:** []
- **[`titleStyle`](https://ej2.syncfusion.com/documentation/api/chart3d/titlesettingsmodel)** (TitleSettingsModel): Options for customizing the title of the Chart.
- **[`subTitleStyle`](https://ej2.syncfusion.com/documentation/api/chart3d/titlesettingsmodel)** (TitleSettingsModel): Options for customizing the Subtitle of the Chart.

---

## Interaction Properties

- **[`enableRotation`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablerotation)** (boolean): If set true, enables the rotation in the 3D chart. **Default:** false
- **[`isTransposed`](https://ej2.syncfusion.com/documentation/api/chart3d/#istransposed)** (boolean): It specifies whether the chart should be render in transposed manner or not. **Default:** false
- **[`enableSideBySidePlacement`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablesidebysideplacement)** (boolean): To enable the side by side placing the points for column type series. **Default:** true
- **[`selectionMode`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dselectionmode)** (Chart3DSelectionMode): Specifies whether a series or data point should be highlighted. **Default:** None
- **[`selectionPattern`](https://ej2.syncfusion.com/documentation/api/chart3d/selectionpattern)** (SelectionPattern): Specifies whether series or data point has to be selected. **Default:** None
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/documentation/api/chart3d/indexesmodel)** (IndexesModel[]): Specifies the point indexes to be selected while loading a chart. **Default:** []
- **[`isMultiSelect`](https://ej2.syncfusion.com/documentation/api/chart3d/#ismultiselect)** (boolean): If set true, enables the multi selection in chart. **Default:** false
- **[`highlightMode`](https://ej2.syncfusion.com/documentation/api/chart3d/highlightmode)** (HighlightMode): Specifies whether a series or data point should be highlighted. **Default:** None
- **[`highlightPattern`](https://ej2.syncfusion.com/documentation/api/chart3d/selectionpattern)** (SelectionPattern): Specifies whether series or data point has to be highlighted. **Default:** None
- **[`highlightColor`](https://ej2.syncfusion.com/documentation/api/chart3d/#highlightcolor)** (string): Defines the color for the highlighted data point. **Default:** ''

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendsettingsmodel)** (Chart3DLegendSettingsModel): The chart legend configuration options.
- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtooltipsettingsmodel)** (Chart3DTooltipSettingsModel): The chart tooltip configuration options.

---

## Module Properties

- **[`dataLabel3DModule`](https://ej2.syncfusion.com/documentation/api/chart3d/datalabel3d)** (DataLabel3D): The `dataLabel3DModule` is used to manipulate and add data label to the series.
- **[`tooltip3DModule`](https://ej2.syncfusion.com/documentation/api/chart3d/tooltip3d)** (Tooltip3D): The `tooltip3DModule` is used to manipulate and add tooltip to the series.
- **[`export3DModule`](https://ej2.syncfusion.com/documentation/api/chart3d/export3d)** (Export3D): The Export Module is used to export chart.
- **[`highlight3DModule`](https://ej2.syncfusion.com/documentation/api/chart3d/)** (Highlight3D): The `highlight3DModule` is used to manipulate and add highlight to the chart.
- **[`selection3DModule`](https://ej2.syncfusion.com/documentation/api/chart3d/)** (Selection3D): The `selection3DModule` is used to manipulate and add selection to the chart.

---

## Persistence and Export Properties

- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableExport`](https://ej2.syncfusion.com/documentation/api/chart3d/#enableexport)** (boolean): Enables or disables the export feature in the 3D chart. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/documentation/api/chart3d/#usegroupingseparator)** (boolean): Specifies whether a grouping separator should be used for a number. **Default:** false

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/chart3d/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [addSeries()](https://ej2.syncfusion.com/documentation/api/chart3d/#addseries)
Adds new series to the chart.

**Parameters:**
- `seriesCollection` (Chart3DSeriesModel[]): The series collection to be added to the chart

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/chart3d/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [createChartSvg()](https://ej2.syncfusion.com/documentation/api/chart3d/#createchartsvg)
Method to create SVG element.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/chart3d/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/documentation/api/chart3d/#destroy)
To destroy the widget.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/chart3d/#export)
Export method for the chart.

**Parameters:**
- `type` (ExportType): Specifies the type of the export
- `fileName` (string): Specifies the file name of the exported file

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/chart3d/#getrootelement)
Returns the route element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/documentation/api/chart3d/#print)
Prints the chart in the page.

**Parameters:**
- `id` (optional) (string[] | string | Element): The id of the chart to be printed on the page

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/chart3d/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/chart3d/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [removeSeries()](https://ej2.syncfusion.com/documentation/api/chart3d/#removeseries)
Removes a series from the chart.

**Parameters:**
- `index` (number): The index of the series to be removed from the chart

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/chart3d/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [afterExport](https://ej2.syncfusion.com/documentation/api/chart3d/#afterexport)
Triggers after the export completed.

### [axisLabelRender](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxislabelrendereventargs)
Triggers before each axis label is rendered.

### [beforeExport](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dexporteventargs)
Triggers before the export gets started.

### [beforePrint](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dprinteventargs)
Triggers before the prints gets started.

### [beforeResize](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dbeforeresizeeventargs)
Triggers before resizing of chart.

### [chart3DMouseClick](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dmouseeventargs)
Triggered when the user clicks on a 3D chart.

### [chart3DMouseDown](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dmouseeventargs)
Triggered when the mouse is pressed down on a 3D chart.

### [chart3DMouseLeave](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dmouseeventargs)
Triggered when the cursor leaves a 3D chart.

### [chart3DMouseMove](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dmouseeventargs)
Triggered when the user hovers over a 3D chart.

### [chart3DMouseUp](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dmouseeventargs)
Triggered when the mouse button is released on a 3D chart.

### [legendClick](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendclickeventargs)
Triggered when the user clicks on the legend.

### [legendRender](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendrendereventargs)
Triggered when the legend is ready to render on the screen.

### [load](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dloadedeventargs)
Triggered before the chart is loaded.

### [loaded](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dloadedeventargs)
Triggered after the chart is loaded.

### [pointClick](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dpointeventargs)
Triggered when the user clicks on data points.

### [pointMove](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dpointeventargs)
Triggered when the user hovers over data points.

### [pointRender](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dpointrendereventargs)
Triggered when the data point is ready to render on the screen.

### [resized](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dresizeeventargs)
Triggers after resizing of chart.

### [selectionComplete](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dselectioncompleteeventargs)
Triggers after the selection is completed.

### [seriesRender](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dseriesrendereventargs)
Triggered when the series is ready to render on the screen.

### [textRender](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtextrendereventargs)
Triggered when the data label is ready to render on the screen.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtooltiprendereventargs)
Triggered when the tooltip is ready to render on the screen.

---

## Related Settings Classes

### Axis and Series Configuration
- **[`Chart3DAxisModel`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxismodel)** - Represents the 3D chart axis model
- **[`Chart3DSeriesModel`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dseriesmodel)** - Represents the 3D chart series model
- **[`Chart3DRowModel`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3drowmodel)** - Represents a chart row configuration
- **[`Chart3DColumnModel`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dcolumnmodel)** - Represents a chart column configuration

### Legend and Tooltip Settings
- **[`Chart3DLegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendsettingsmodel)** - Represents the legend settings for 3D chart
- **[`Chart3DTooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtooltipsettingsmodel)** - Represents the tooltip settings for 3D chart

### Visual and Styling
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/chart3d/bordermodel)** - Represents border model for chart
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/chart3d/marginmodel)** - Represents margin configuration
- **[`TitleSettingsModel`](https://ej2.syncfusion.com/documentation/api/chart3d/titlesettingsmodel)** - Represents title settings configuration

### Selection and Highlighting
- **[`IndexesModel`](https://ej2.syncfusion.com/documentation/api/chart3d/indexesmodel)** - Represents data point indexes for selection
- **[`Chart3DSelectionMode`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dselectionmode)** - Specifies selection mode options
- **[`SelectionPattern`](https://ej2.syncfusion.com/documentation/api/chart3d/selectionpattern)** - Specifies pattern for selection and highlighting
- **[`HighlightMode`](https://ej2.syncfusion.com/documentation/api/chart3d/highlightmode)** - Specifies highlight mode options

### Modules and Components
- **[`DataLabel3D`](https://ej2.syncfusion.com/documentation/api/chart3d/datalabel3d)** - Module for manipulating data labels
- **[`Tooltip3D`](https://ej2.syncfusion.com/documentation/api/chart3d/tooltip3d)** - Module for managing tooltips
- **[`Export3D`](https://ej2.syncfusion.com/documentation/api/chart3d/export3d)** - Module for exporting charts

### Event Arguments
- **[`Chart3DAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxislabelrendereventargs)** - Represents axis label render event data
- **[`Chart3DExportEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dexporteventargs)** - Represents export event data
- **[`Chart3DPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dprinteventargs)** - Represents print event data
- **[`Chart3DBeforeResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dbeforeresizeeventargs)** - Represents before resize event data
- **[`Chart3DMouseEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dmouseeventargs)** - Represents mouse event data
- **[`Chart3DLegendClickEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendclickeventargs)** - Represents legend click event data
- **[`Chart3DLegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendrendereventargs)** - Represents legend render event data
- **[`Chart3DLoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dloadedeventargs)** - Represents chart loaded event data
- **[`Chart3DPointEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dpointeventargs)** - Represents point event data
- **[`Chart3DPointRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dpointrendereventargs)** - Represents point render event data
- **[`Chart3DResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dresizeeventargs)** - Represents resize event data
- **[`Chart3DSelectionCompleteEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dselectioncompleteeventargs)** - Represents selection complete event data
- **[`Chart3DSeriesRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dseriesrendereventargs)** - Represents series render event data
- **[`Chart3DTextRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtextrendereventargs)** - Represents text (data label) render event data
- **[`Chart3DTooltipRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtooltiprendereventargs)** - Represents tooltip render event data

---

## Common Usage Patterns

- Configure the 3D chart with [`series`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dseriesmodel) and [`dataSource`](https://ej2.syncfusion.com/documentation/api/chart3d/#datasource) to bind data and display visualizations.
- Set [`enableRotation`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablerotation) to true and configure [`rotation`](https://ej2.syncfusion.com/documentation/api/chart3d/#rotation), [`tilt`](https://ej2.syncfusion.com/documentation/api/chart3d/#tilt), and [`perspectiveAngle`](https://ej2.syncfusion.com/documentation/api/chart3d/#perspectiveangle) for interactive 3D viewing.
- Customize appearance using [`theme`](https://ej2.syncfusion.com/documentation/api/chart3d/charttheme), [`palettes`](https://ej2.syncfusion.com/documentation/api/chart3d/#palettes), [`background`](https://ej2.syncfusion.com/documentation/api/chart3d/#background), and [`wallColor`](https://ej2.syncfusion.com/documentation/api/chart3d/#wallcolor).
- Enable user interaction with [`selectionMode`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dselectionmode), [`highlightMode`](https://ej2.syncfusion.com/documentation/api/chart3d/highlightmode), and [`tooltip`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dtooltipsettingsmodel) settings.
- Configure legend and axis labels using [`legendSettings`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dlegendsettingsmodel), [`primaryXAxis`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxismodel), and [`primaryYAxis`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3daxismodel).
- Export charts using the [`export()`](https://ej2.syncfusion.com/documentation/api/chart3d/#export) method after enabling [`enableExport`](https://ej2.syncfusion.com/documentation/api/chart3d/#enableexport).
- Handle chart lifecycle events like [`load`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dloadedeventargs), [`loaded`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dloadedeventargs), and [`resized`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dresizeeventargs) for dynamic updates.
- Apply layout modifications using [`rows`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3drowmodel) and [`columns`](https://ej2.syncfusion.com/documentation/api/chart3d/chart3dcolumnmodel) to create multi-plot charts.

---

## Notes

- All dates should use ISO 8601 format (YYYY-MM-DD) when binding DateTime values in the chart.
- The 3D chart supports multiple data binding options through [`dataSource`](https://ej2.syncfusion.com/documentation/api/chart3d/#datasource) including arrays and DataManager instances for remote data.
- To enable smooth 3D rotations and interactions, ensure [`enableRotation`](https://ej2.syncfusion.com/documentation/api/chart3d/#enablerotation) is properly configured with appropriate rotation, tilt, and perspective angle values.
- Use the module injection pattern with [`Inject()`](https://ej2.syncfusion.com/documentation/api/chart3d/#inject) to dynamically load required features like DataLabel3D, Tooltip3D, and Export3D modules.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/documentation/api/chart3d/#addeventlistener) method or by directly assigning to event properties for real-time chart interactions and validation.
