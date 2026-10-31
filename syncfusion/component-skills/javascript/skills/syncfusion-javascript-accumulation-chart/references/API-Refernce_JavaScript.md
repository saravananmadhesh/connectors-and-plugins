# AccumulationChart API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Accumulation Chart ([`Syncfusion.EJ2.Charts.AccumulationChart`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)) component.

- **Base API Documentation:** [AccumulationChart](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Chart Configuration Properties](#chart-configuration-properties)
- [Series and Data Properties](#series-and-data-properties)
- [Visual and Styling Properties](#visual-and-styling-properties)
- [Interaction Properties](#interaction-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Annotation Properties](#annotation-properties)
- [Focus Border Properties](#focus-border-properties)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [AccumulationChart()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)
Creates a new instance of the AccumulationChart component.

---

## Chart Configuration Properties

- **[`title`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#title)** (string): The title is displayed at the top of the chart to provide information about the plotted data. **Default:** null
- **[`subTitle`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#subtitle)** (string): The subtitle is positioned below the main title and provides further details about the data represented in the accumulation chart. **Default:** null
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationtheme)** (AccumulationTheme): The theme applied to the accumulation chart for visual styling. **Default:** 'Material'
- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#locale)** (string): Overrides the global culture and localization value for this component. **Default:** ''
- **[`enableAnimation`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enableanimation)** (boolean): If set to true, enables animation for the accumulation chart. **Default:** true
- **[`enableSmartLabels`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enablesmartlabels)** (boolean): If set to true, labels for the points will be placed smartly to avoid overlapping. **Default:** true
- **[`enableBorderOnMouseMove`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enableborderonmousemove)** (boolean): If set to true, enables the border in pie and accumulation charts when the mouse moves over a data point. **Default:** true

---

## Series and Data Properties

- **[`series`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationseriesmodel)** (AccumulationSeriesModel[]): The configuration for series in the accumulation chart.
- **[`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#datasource)** (Object|DataManager): Specifies the data source for the accumulation chart as an array of JSON objects or DataManager instance. **Default:** ''
- **[`center`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/piecentermodel)** (PieCenterModel): The `center` property allows changing the center position of the pie chart using the `x` and `y` properties.

---

## Visual and Styling Properties

- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#background)** (string): The background color of the chart which accepts values in hex and rgba formats as valid CSS color strings. **Default:** null
- **[`backgroundImage`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#backgroundimage)** (string): The background image of the chart accepts a string value as a URL link or the location of an image. **Default:** null
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/bordermodel)** (BorderModel): Options for customizing the appearance of the border in the chart by using the `color` and `width` properties.
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#width)** (string): The width of the chart as a string allowing input in formats such as '100px' or '100%'. **Default:** null
- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#height)** (string): The height of the chart as a string allowing input in formats such as '100px' or '100%'. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/marginmodel)** (MarginModel): Options to customize the margins around the accumulation chart including the left, right, top, and bottom margins.
- **[`titleStyle`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/titlestylesettingsmodel)** (TitleStyleSettingsModel): Options for customizing the appearance of the title which displays information about the plotted data.
- **[`subTitleStyle`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/titlestylesettingsmodel)** (TitleStyleSettingsModel): Options for customizing the appearance of the subtitle which displays information below the main title.

---

## Interaction Properties

- **[`selectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationselectionmode)** (AccumulationSelectionMode): Specifies whether points in the accumulation chart can be selected. **Default:** None
- **[`selectionPattern`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/selectionpattern)** (SelectionPattern): Specifies the selection pattern for series or data points. **Default:** None
- **[`selectedDataIndexes`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/indexesmodel)** (IndexesModel[]): Specifies the point indexes to be selected when the accumulation chart is initially loaded. **Default:** []
- **[`isMultiSelect`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#ismultiselect)** (boolean): When set to true, allows for the selection of multiple data points. **Default:** false
- **[`highlightMode`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationhighlightmode)** (AccumulationHighlightMode): Specifies whether points in the accumulation chart should be highlighted. **Default:** None
- **[`highlightPattern`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/selectionpattern)** (SelectionPattern): Specifies the pattern used for highlighting series or data points. **Default:** None
- **[`highlightColor`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#highlightcolor)** (string): Defines the color used to highlight a data point on mouse hover. **Default:** ''

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/legendsettingsmodel)** (LegendSettingsModel): The legend provides descriptive information about the data points displayed in the accumulation chart.
- **[`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/tooltipsettingsmodel)** (TooltipSettingsModel): Tooltips display information about the data points when the mouse hovers over a point.

---

## Center Label and Annotation Properties

- **[`centerLabel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/centerlabelmodel)** (CenterLabelModel): Options to customize the label that appears at the center of the accumulation chart.
- **[`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationannotationsettingsmodel)** (AccumulationAnnotationSettingsModel[]): Annotations are used to highlight specific data points or areas in the chart providing additional context and information.

---

## Focus Border Properties

- **[`focusBorderColor`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#focusbordercolor)** (string): Customize the focus border color if not specified the element will use the default focus border color. **Default:** null
- **[`focusBorderMargin`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#focusbordermargin)** (number): Customize the focus border margin if not specified the element will use the default focus border margin. **Default:** 0
- **[`focusBorderWidth`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#focusborderwidth)** (number): Customize the focus border width if not specified the element will use the default focus border width. **Default:** 1.5

---

## Persistence, Export and Utility Properties

- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableExport`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enableexport)** (boolean): When set to true it enables exporting the accumulation chart to various formats such as JPEG PNG SVG PDF XLSX or CSV. **Default:** true
- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enableHtmlSanitizer`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enablehtmlsanitizer)** (boolean): Specifies whether to display or remove the untrusted HTML values in the Accumulation Chart component. **Default:** false
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#usegroupingseparator)** (boolean): When set to true a grouping separator will be used for numbers to separate groups of thousands in the accumulation chart. **Default:** false
- **[`allowExport`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#allowexport)** (boolean): To enable export feature in blazor chart. **Default:** false
- **[`noDataTemplate`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#nodatatemplate)** (string|Function): Specifies the template to be displayed when the chart has no data. **Default:** null

---

## Module Properties

- **[`accumulationDataLabelModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (AccumulationDataLabel): The `accumulationDataLabelModule` is used to manipulate and add data labels in an accumulation chart.
- **[`accumulationTooltipModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (AccumulationTooltip): The `accumulationTooltipModule` is used to manipulate and add tooltips to an accumulation chart.
- **[`accumulationLegendModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (AccumulationLegend): The `accumulationLegendModule` is used to manipulate and add a legend in an accumulation chart.
- **[`accumulationSelectionModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (AccumulationSelection): The `accumulationSelectionModule` is used to manipulate and add selection in accumulation chart.
- **[`accumulationHighlightModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (AccumulationHighlight): The `accumulationHighlightModule` is used to manipulate and add highlights to the accumulation chart.
- **[`annotationModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (AccumulationAnnotation): The `annotationModule` is used to manipulate and add annotations in the chart.
- **[`exportModule`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/)** (Export): The `exportModule` is used to export the accumulation chart.
- **[`accessibility`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accessibilitymodel)** (AccessibilityModel): Options to improve accessibility for accumulation chart elements.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [calculateBounds()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#calculatebounds)
Method to calculate bounds for accumulation chart.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [export()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#export)
Export method for the chart.

**Parameters:**
- `type` (ExportType): The type of export
- `fileName` (string): The name of the file for export

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#getrootelement)
Returns the route element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#print)
Handles the print method for accumulation chart control.

**Parameters:**
- `id` (optional) (string[] | string | Element): The id of the accumulation chart to be printed on the page

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [setAnnotationValue()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#setannotationvalue)
Method to set the annotation content dynamically for accumulation.

**Parameters:**
- `annotationIndex` (number): The index of the annotation
- `content` (string): The content to set for the annotation

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [afterExport](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#afterexport)
Triggers after the export is completed.

### [animationComplete](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccanimationcompleteeventargs)
Triggers after the animation for the series is completed.

### [annotationRender](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#annotationrender)
Triggers before the annotation gets rendered allowing modifications of the annotation content and its location.

### [beforeExport](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iexporteventargs)
Triggers before the export process begins allowing customization of export settings.

### [beforePrint](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#beforeprint)
Triggers before the print process starts allowing modification of the accumulation chart's HTML content.

### [beforeResize](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccbeforeresizeeventargs)
Triggers before the window resize event occurs allowing modifications to the accumulation chart size.

### [chartDoubleClick](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#chartdoubleclick)
Triggers when double-clicking the accumulation chart.

### [chartMouseClick](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#chartmouseclick)
Triggers when clicking on the accumulation chart.

### [chartMouseDown](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#chartmousedown)
Triggers on the mouse down event within the accumulation chart.

### [chartMouseLeave](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#chartmouseleave)
Triggers when the cursor leaves the accumulation chart.

### [chartMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#chartmousemove)
Triggers when hovering over the accumulation chart.

### [chartMouseUp](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#chartmouseup)
Triggers on the mouse up event within the accumulation chart.

### [legendClick](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iacclegendclickeventargs)
Triggers after the legend is clicked.

### [legendRender](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#legendrender)
Triggers before the legend gets rendered allowing customization of legend before rendering.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccloadedeventargs)
Triggers before the accumulation chart loads allowing customization and configuration before rendering.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccloadedeventargs)
Triggers after the accumulation chart has been loaded.

### [pointClick](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#pointclick)
Triggers when a point in the accumulation chart is clicked.

### [pointMove](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#pointmove)
Triggers when a point in the accumulation chart is moved.

### [pointRender](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccpointrendereventargs)
Triggers before each point in the series gets rendered allowing customization of each data point.

### [resized](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccresizeeventargs)
Triggers after the window resize event completes.

### [selectionComplete](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccselectioncompleteeventargs)
Triggers after the selection is completed.

### [seriesRender](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccseriesrendereventargs)
Triggers before the series gets rendered allowing customization of series properties.

### [textRender](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iacctextrendereventargs)
Triggers before the data label for the series gets rendered allowing customization of data labels.

### [tooltipRender](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#tooltiprender)
Triggers before the tooltip for the series gets rendered allowing customization of tooltip properties.

---

## Related Settings Classes

### Series and Data Configuration
- **[`AccumulationSeriesModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationseriesmodel)** - Represents the accumulation series model
- **[`PieCenterModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/piecentermodel)** - Represents the pie center configuration

### Legend and Tooltip Settings
- **[`LegendSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/legendsettingsmodel)** - Represents the legend settings
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/tooltipsettingsmodel)** - Represents the tooltip settings

### Visual and Styling
- **[`BorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/bordermodel)** - Represents border model for chart
- **[`MarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/marginmodel)** - Represents margin configuration
- **[`TitleStyleSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/titlestylesettingsmodel)** - Represents title style settings
- **[`CenterLabelModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/centerlabelmodel)** - Represents center label configuration

### Selection and Highlighting
- **[`IndexesModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/indexesmodel)** - Represents data point indexes for selection
- **[`AccumulationSelectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationselectionmode)** - Specifies selection mode options
- **[`AccumulationHighlightMode`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationhighlightmode)** - Specifies highlight mode options
- **[`SelectionPattern`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/selectionpattern)** - Specifies pattern for selection and highlighting

### Annotations and Accessibility
- **[`AccumulationAnnotationSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationannotationsettingsmodel)** - Represents annotation settings
- **[`AccessibilityModel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accessibilitymodel)** - Represents accessibility options

### Event Arguments
- **[`IAccAnimationCompleteEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccanimationcompleteeventargs)** - Represents animation complete event data
- **[`IExportEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iexporteventargs)** - Represents export event data
- **[`IAccBeforeResizeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccbeforeresizeeventargs)** - Represents before resize event data
- **[`IAccLegendClickEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iacclegendclickeventargs)** - Represents legend click event data
- **[`IAccLoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccloadedeventargs)** - Represents chart loaded event data
- **[`IAccPointRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccpointrendereventargs)** - Represents point render event data
- **[`IAccResizeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccresizeeventargs)** - Represents resize event data
- **[`IAccSelectionCompleteEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccselectioncompleteeventargs)** - Represents selection complete event data
- **[`IAccSeriesRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccseriesrendereventargs)** - Represents series render event data
- **[`IAccTextRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iacctextrendereventargs)** - Represents text (data label) render event data

---

## Common Usage Patterns

- Configure the accumulation chart with [`series`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationseriesmodel) and [`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#datasource) to bind data and display visualizations.
- Customize chart appearance using [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationtheme), [`background`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#background), [`border`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/bordermodel), and [`margin`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/marginmodel) settings.
- Enable user interaction with [`selectionMode`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationselectionmode), [`highlightMode`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationhighlightmode), [`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/tooltipsettingsmodel), and [`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/legendsettingsmodel).
- Configure chart center and position using [`center`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/piecentermodel) and [`centerLabel`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/centerlabelmodel) properties.
- Enhance chart readability with [`enableSmartLabels`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enablesmartlabels) to automatically position labels without overlap.
- Export charts using the [`export()`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#export) method after enabling [`enableExport`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enableexport).
- Add custom annotations using [`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/accumulationannotationsettingsmodel) or dynamically with [`setAnnotationValue()`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#setannotationvalue).
- Handle chart lifecycle events like [`load`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccloadedeventargs), [`loaded`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccloadedeventargs), and [`resized`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/iaccresizeeventargs) for dynamic updates.

---

## Notes

- All dates should use ISO 8601 format (YYYY-MM-DD) when binding DateTime values in the chart.
- The accumulation chart supports multiple data binding options through [`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#datasource) including arrays and DataManager instances for remote data.
- Use the module injection pattern with [`Inject()`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#inject) to dynamically load required features like AccumulationDataLabel, AccumulationTooltip, and AccumulationLegend modules.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#addeventlistener) method or by directly assigning to event properties for real-time chart interactions.
- Enable [`enableHtmlSanitizer`](https://ej2.syncfusion.com/javascript/documentation/api/accumulation-chart/#enablehtmlsanitizer) to sanitize untrusted HTML values in tooltips, labels, and annotations for security.
