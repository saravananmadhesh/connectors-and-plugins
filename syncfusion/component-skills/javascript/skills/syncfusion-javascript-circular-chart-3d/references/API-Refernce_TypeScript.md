# CircularChart3D API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript CircularChart3D ([`Syncfusion.EJ2.Charts.CircularChart3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)) component.

- **Base API Documentation:** [CircularChart3D](https://ej2.syncfusion.com/documentation/api/circularchart3d/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [3D Appearance Properties](#3d-appearance-properties)
- [Data and Series Properties](#data-and-series-properties)
- [Visual and Styling Properties](#visual-and-styling-properties)
- [Selection and Highlighting Properties](#selection-and-highlighting-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [CircularChart3D()](https://ej2.syncfusion.com/documentation/api/circularchart3d/)
Creates a new instance of the CircularChart3D component.

---

## Core Configuration Properties

- **[`dataSource`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#datasource)** (Object|DataManager): Specifies the dataSource for the circular 3D chart. It can be an array of JSON objects or an instance of DataManager. **Default:** ''
- **[`title`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#title)** (string): Represents the title for the circular 3D chart. **Default:** null
- **[`subTitle`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#subtitle)** (string): Represents the subtitle for the circular 3D chart. **Default:** null
- **[`locale`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`theme`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtheme)** (CircularChart3DTheme): Specifies the theme for the circular 3D chart. **Default:** 'Material'
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#usegroupingseparator)** (boolean): Specifies whether a grouping separator should be used for numbers. **Default:** false

---

## 3D Appearance Properties

- **[`depth`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#depth)** (number): Specifies the depth of the circular 3D chart. **Default:** 50
- **[`rotation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#rotation)** (number): Defines the rotation angle for the circular 3D chart. **Default:** 0
- **[`tilt`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#tilt)** (number): Defines the slope angle for the circular 3D chart. **Default:** 0
- **[`enableRotation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enablerotation)** (boolean): Enables or disables rotation in the circular 3D chart. **Default:** false
- **[`enableAnimation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enableanimation)** (boolean): If set true, enables the animation for circular 3D chart. **Default:** true

---

## Data and Series Properties

- **[`series`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dseriesmodel)** (CircularChart3DSeriesModel[]): The configuration for series in circular 3D chart. The `series` property allows you to define an array of circular 3D series, each with its own settings and data.

---

## Visual and Styling Properties

- **[`background`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#background)** (string): The background color of the circular 3D chart, which accepts a value in hex, rgba as a valid CSS color string. **Default:** null
- **[`backgroundImage`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#backgroundimage)** (string): The background image of the chart, specified as a URL link or the location of an image. **Default:** null
- **[`border`](https://ej2.syncfusion.com/documentation/api/circularchart3d/bordermodel)** (BorderModel): Options for customizing the color and width of the circular 3D chart border.
- **[`height`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#height)** (string): The height of the chart as a string, accepting input as both '100px' or '100%'. If specified as '100%', the chart renders to the full height of its parent element. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#width)** (string): The width of the chart as a string, accepting input as both '100px' or '100%'. If specified as '100%', the chart renders to the full width of its parent element. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/documentation/api/circularchart3d/marginmodel)** (MarginModel): Options to customize the left, right, top, and bottom margins of the circular 3D chart.
- **[`titleStyle`](https://ej2.syncfusion.com/documentation/api/circularchart3d/fontmodel)** (FontModel): Options for customizing the title of the circular 3D chart.
- **[`subTitleStyle`](https://ej2.syncfusion.com/documentation/api/circularchart3d/fontmodel)** (FontModel): Options for customizing the subtitle of the circular 3D Chart.

---

## Selection and Highlighting Properties

- **[`selectionMode`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dselectionmode)** (CircularChart3DSelectionMode): Specifies whether a point has to be selected or not. Takes values: 'None' or 'Point'. **Default:** None
- **[`selectionPattern`](https://ej2.syncfusion.com/documentation/api/circularchart3d/selectionpattern)** (SelectionPattern): Specifies the selection pattern for series or data points in the circular 3D chart. **Default:** None
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/documentation/api/circularchart3d/indexesmodel)** (IndexesModel[]): Specifies the point indexes to be selected while loading a circular 3D chart. It requires `selectionMode` to be `Point`. **Default:** []
- **[`isMultiSelect`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#ismultiselect)** (boolean): Enables or disables multi-selection in the circular 3D chart. If set true, enables the multi selection in circular 3D chart. It requires `selectionMode` to be `Point`. **Default:** false
- **[`highlightMode`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dhighlightmode)** (CircularChart3DHighlightMode): Specifies whether a point has to be highlighted or not. Takes values: 'None' or 'Point'. **Default:** None
- **[`highlightPattern`](https://ej2.syncfusion.com/documentation/api/circularchart3d/selectionpattern)** (SelectionPattern): Specifies the highlight pattern for series or data points in the circular 3D chart. **Default:** None
- **[`highlightColor`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#highlightcolor)** (string): Defines the color for the highlighted data point. **Default:** ''
- **[`enableExport`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enableexport)** (boolean): Enables or disables the export feature in the circular 3D chart. **Default:** false

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendsettingsmodel)** (CircularChart3DLegendSettingsModel): Options for customizing the legend of the circular 3D chart.
- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtooltipsettingsmodel)** (CircularChart3DTooltipSettingsModel): Options for customizing the tooltip of the circular 3D chart.

---

## Module Properties

- **[`circularChartDataLabel3DModule`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)** (CircularChartDataLabel3D): The `circularChartDataLabel3DModule` is used to manipulate and add data labels in the circular 3D chart.
- **[`circularChartTooltip3DModule`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularcharttooltip3d)** (CircularChartTooltip3D): The `circularChartTooltip3DModule` is used to manipulate and add tooltips in the circular 3D chart.
- **[`circularChartExport3DModule`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchartexport3d)** (CircularChartExport3D): The `circularChartExport3DModule` Module is used to facilitate the export of the circular 3D chart.
- **[`circularChartHighlight3DModule`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)** (CircularChartHighlight3D): The `circularHighlight3DModule` is used to manipulate and add highlights to the circular 3D chart.
- **[`circularChartSelection3DModule`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchartselection3d)** (CircularChartSelection3D): The `circularChartSelection3DModule` is used to manipulate and add selection in the circular 3D chart.
- **[`circularChartLegend3DModule`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)** (CircularChartLegend3D): The `circularChartLegend3DModule` is used to manipulate and add legend in the circular 3D chart.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#export)
Export method for the circular 3D chart.

**Parameters:**
- `type` (ExportType): Specifies the type of the image file (PNG, JPEG, SVG)
- `fileName` (string): Specifies the name of the exported image file

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [pdfExport()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#pdfexport)
Export the chart on the page to a PDF document.

**Parameters:**
- `fileName` (string): The name of the exported file
- `orientation` (optional) (PdfPageOrientation): Page orientation (portrait or landscape)
- `controls` (optional) (CircularChart3D[]): Array of controls to be exported
- `width` (optional) (number): The width of the exported chart
- `height` (optional) (number): The height of the exported chart
- `isVertical` (optional) (boolean): Export the chart vertically or horizontally
- `header` (optional) (IPDFArgs): Text to appear at the top of the exported PDF document
- `footer` (optional) (IPDFArgs): Text to appear at the bottom of the exported PDF document
- `exportToMultiplePage` (optional) (boolean): Export the chart to multiple PDF pages

**Returns:** void

### [print()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#print)
Handles the print method for the circular 3D chart control.

**Parameters:**
- `id` (optional) (string[] | string | Element): Specifies the element to print

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/circularchart3d/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [afterExport](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dafterexporteventargs)
Triggers after the export is completed.

### [beforeExport](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dexporteventargs)
Triggers before the export starts.

### [beforePrint](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dprinteventargs)
Triggers before printing starts.

### [beforeResize](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dbeforeresizeeventargs)
Triggered before resizing the chart.

### [circularChart3DMouseClick](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dmouseeventargs)
Triggered when the user clicks on a circular 3D chart.

### [circularChart3DMouseDown](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dmouseeventargs)
Triggered when the mouse is pressed down on a circular 3D chart.

### [circularChart3DMouseLeave](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dmouseeventargs)
Triggered when the cursor leaves a circular 3D chart.

### [circularChart3DMouseMove](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dmouseeventargs)
Triggered when the user hovers over a circular 3D chart.

### [circularChart3DMouseUp](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dmouseeventargs)
Triggered when the mouse button is released on a circular 3D chart.

### [legendClick](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendclickeventargs)
Triggers after a legend is clicked.

### [legendRender](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendrendereventargs)
Triggers before the legend is rendered.

### [load](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dloadedeventargs)
Triggered before the circular 3D is loaded.

### [loaded](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dloadedeventargs)
Triggers after the circular 3D chart is loaded.

### [pointClick](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dpointeventargs)
Triggered when the user clicks on data points.

### [pointMove](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dpointeventargs)
Triggered when the user hovers over data points.

### [pointRender](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dpointrendereventargs)
Triggers before each point for a series is rendered.

### [resized](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dresizeeventargs)
Triggered after the chart is resized.

### [selectionComplete](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dselectioncompleteeventargs)
Triggers after the selection is completed.

### [seriesRender](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dseriesrendereventargs)
Triggers before a series is rendered.

### [textRender](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtextrendereventargs)
Triggers before the data label for a series is rendered.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtooltiprendereventargs)
Triggered when the tooltip is ready to render on the screen.

---

## Related Settings Classes

### Series Configuration
- **[`CircularChart3DSeriesModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dseriesmodel)** - Represents the circular 3D series configuration

### Legend and Tooltip Settings
- **[`CircularChart3DLegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendsettingsmodel)** - Represents the legend settings for circular 3D chart
- **[`CircularChart3DTooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtooltipsettingsmodel)** - Represents the tooltip settings for circular 3D chart

### Visual and Styling
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/bordermodel)** - Represents border model for chart
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/marginmodel)** - Represents margin configuration
- **[`FontModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/fontmodel)** - Represents font styling configuration

### Selection and Highlighting
- **[`IndexesModel`](https://ej2.syncfusion.com/documentation/api/circularchart3d/indexesmodel)** - Represents data point indexes for selection
- **[`CircularChart3DSelectionMode`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dselectionmode)** - Specifies selection mode options
- **[`CircularChart3DHighlightMode`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dhighlightmode)** - Specifies highlight mode options
- **[`SelectionPattern`](https://ej2.syncfusion.com/documentation/api/circularchart3d/selectionpattern)** - Specifies pattern for selection and highlighting

### Modules and Components
- **[`CircularChartDataLabel3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)** - Module for manipulating data labels
- **[`CircularChartTooltip3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularcharttooltip3d)** - Module for managing tooltips
- **[`CircularChartExport3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchartexport3d)** - Module for exporting charts
- **[`CircularChartLegend3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)** - Module for managing legends
- **[`CircularChartSelection3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchartselection3d)** - Module for managing selection
- **[`CircularChartHighlight3D`](https://ej2.syncfusion.com/documentation/api/circularchart3d/)** - Module for managing highlights

### Event Arguments
- **[`CircularChart3DAfterExportEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dafterexporteventargs)** - Represents after export event data
- **[`CircularChart3DExportEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dexporteventargs)** - Represents export event data
- **[`CircularChart3DPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dprinteventargs)** - Represents print event data
- **[`CircularChart3DBeforeResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dbeforeresizeeventargs)** - Represents before resize event data
- **[`CircularChart3DMouseEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dmouseeventargs)** - Represents mouse event data
- **[`CircularChart3DLegendClickEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendclickeventargs)** - Represents legend click event data
- **[`CircularChart3DLegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendrendereventargs)** - Represents legend render event data
- **[`CircularChart3DLoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dloadedeventargs)** - Represents chart loaded event data
- **[`CircularChart3DPointEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dpointeventargs)** - Represents point event data
- **[`CircularChart3DPointRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dpointrendereventargs)** - Represents point render event data
- **[`CircularChart3DResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dresizeeventargs)** - Represents resize event data
- **[`CircularChart3DSelectionCompleteEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dselectioncompleteeventargs)** - Represents selection complete event data
- **[`CircularChart3DSeriesRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dseriesrendereventargs)** - Represents series render event data
- **[`CircularChart3DTextRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtextrendereventargs)** - Represents text (data label) render event data
- **[`CircularChart3DTooltipRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtooltiprendereventargs)** - Represents tooltip render event data

---

## Common Usage Patterns

- Configure the circular 3D chart with [`series`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dseriesmodel) and [`dataSource`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#datasource) to bind data and display visualizations.
- Set [`enableRotation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enablerotation) to true and configure [`rotation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#rotation) and [`tilt`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#tilt) for interactive 3D viewing.
- Customize appearance using [`theme`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtheme), [`background`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#background), and [`depth`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#depth).
- Enable user interaction with [`selectionMode`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dselectionmode), [`highlightMode`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dhighlightmode), and [`tooltip`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dtooltipsettingsmodel) settings.
- Configure legend using [`legendSettings`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dlegendsettingsmodel) to customize legend position, labels, and formatting.
- Export charts using the [`export()`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#export) method after enabling [`enableExport`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enableexport).
- Handle chart lifecycle events like [`load`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dloadedeventargs), [`loaded`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dloadedeventargs), and [`resized`](https://ej2.syncfusion.com/documentation/api/circularchart3d/circularchart3dresizeeventargs) for dynamic updates.
- Control animation behavior using [`enableAnimation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enableanimation) to optimize performance or enhance visual effects.

---

## Notes

- All dates should use ISO 8601 format (YYYY-MM-DD) when binding DateTime values in the chart.
- The circular 3D chart supports multiple data binding options through [`dataSource`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#datasource) including arrays and DataManager instances for remote data.
- To enable smooth 3D rotations and interactions, ensure [`enableRotation`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#enablerotation) is properly configured with appropriate rotation and tilt values.
- Use the module injection pattern with [`Inject()`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#inject) to dynamically load required features like CircularChartDataLabel3D, CircularChartTooltip3D, and CircularChartExport3D modules.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/documentation/api/circularchart3d/#addeventlistener) method or by directly assigning to event properties for real-time chart interactions and validation.
- The `selectedDataIndexes` property requires `selectionMode` to be set to `Point` for effective data point selection.
- Multi-selection is enabled through `isMultiSelect` when `selectionMode` is set to `Point`.
