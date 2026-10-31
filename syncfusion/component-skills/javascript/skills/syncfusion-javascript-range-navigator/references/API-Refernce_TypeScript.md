# RangeNavigator API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript RangeNavigator ([`Syncfusion.EJ2.Charts.RangeNavigator`](https://ej2.syncfusion.com/documentation/api/range-navigator/)) component.

- **Base API Documentation:** [RangeNavigator](https://ej2.syncfusion.com/documentation/api/range-navigator/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Data and Axis Properties](#data-and-axis-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Axis Label and Formatting Properties](#axis-label-and-formatting-properties)
- [Appearance and Styling Properties](#appearance-and-styling-properties)
- [Series and Tooltip Properties](#series-and-tooltip-properties)
- [Period Selector Properties](#period-selector-properties)
- [Interactive Properties](#interactive-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [RangeNavigator()](https://ej2.syncfusion.com/documentation/api/range-navigator/)
Creates a new instance of the RangeNavigator component.

---

## Core Configuration Properties

- **[`valueType`](https://ej2.syncfusion.com/documentation/api/range-navigator/#valuetype)** (RangeValueType): Specifies the data types that the axis can handle (Double, DateTime, Logarithmic, DateTimeCategory). **Default:** 'Double'
- **[`theme`](https://ej2.syncfusion.com/documentation/api/range-navigator/#theme)** (ChartTheme): Specifies the theme for the range navigator. **Default:** 'Material'
- **[`animationDuration`](https://ej2.syncfusion.com/documentation/api/range-navigator/#animationduration)** (number): Duration of the animation. **Default:** 500

---

## Data and Axis Properties

- **[`dataSource`](https://ej2.syncfusion.com/documentation/api/range-navigator/#datasource)** (Object | DataManager): It defines the data source for a range navigator. **Default:** null
- **[`query`](https://ej2.syncfusion.com/documentation/api/range-navigator/#query)** (Query): It defines the query for the data source. **Default:** null
- **[`xName`](https://ej2.syncfusion.com/documentation/api/range-navigator/#xname)** (string): It defines the xName for the range navigator. **Default:** null
- **[`yName`](https://ej2.syncfusion.com/documentation/api/range-navigator/#yname)** (string): It defines the yName for the range navigator. **Default:** null
- **[`series`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangenavigatorseriesmodel)** (RangeNavigatorSeriesModel[]): It defines the configuration of series in the range navigator.
- **[`minimum`](https://ej2.syncfusion.com/documentation/api/range-navigator/#minimum)** (number | Date): Minimum value for the axis. **Default:** null
- **[`maximum`](https://ej2.syncfusion.com/documentation/api/range-navigator/#maximum)** (number | Date): Maximum value for the axis. **Default:** null
- **[`interval`](https://ej2.syncfusion.com/documentation/api/range-navigator/#interval)** (number): Interval value for the axis. **Default:** null
- **[`intervalType`](https://ej2.syncfusion.com/documentation/api/range-navigator/#intervaltype)** (RangeIntervalType): IntervalType for the dateTime axis. **Default:** 'Auto'
- **[`logBase`](https://ej2.syncfusion.com/documentation/api/range-navigator/#logbase)** (number): Base value for log axis. **Default:** 10

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/documentation/api/range-navigator/#height)** (string): The height of the chart as a string accepts input both as '100px' or '100%'. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/range-navigator/#width)** (string): The width of the range navigator as a string accepts input as both like '100px' or '100%'. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/documentation/api/range-navigator/marginmodel)** (MarginModel): Margin for the range navigator.

---

## Axis Label and Formatting Properties

- **[`labelFormat`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelformat)** (string): Used to format the axis label that accepts any global string format like 'C', 'n1', 'P' etc. **Default:** ''
- **[`labelStyle`](https://ej2.syncfusion.com/documentation/api/range-navigator/fontmodel)** (FontModel): Label style for the labels.
- **[`labelPlacement`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelplacement)** (NavigatorPlacement): Specifies the placement of labels to the axis line (betweenTicks, onTicks, auto). **Default:** 'Auto'
- **[`labelPosition`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelposition)** (AxisPosition): Label positions for the axis. **Default:** 'Outside'
- **[`labelIntersectAction`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelintersectaction)** (RangeLabelIntersectAction): Specifies action when axis labels intersect (None shows all labels, Hide hides intersecting labels). **Default:** Hide
- **[`skeleton`](https://ej2.syncfusion.com/documentation/api/range-navigator/#skeleton)** (string): Specifies the skeleton format in which the dateTime format will process. **Default:** ''
- **[`skeletonType`](https://ej2.syncfusion.com/documentation/api/range-navigator/#skeletontype)** (SkeletonType): It specifies the type of format to be used in dateTime format process. **Default:** 'DateTime'

---

## Appearance and Styling Properties

- **[`background`](https://ej2.syncfusion.com/documentation/api/range-navigator/#background)** (string): The background color of the chart that accepts value in hex and rgba as a valid CSS color string. **Default:** null
- **[`navigatorBorder`](https://ej2.syncfusion.com/documentation/api/range-navigator/bordermodel)** (BorderModel): Options for customizing the color and width of the chart border.
- **[`navigatorStyleSettings`](https://ej2.syncfusion.com/documentation/api/range-navigator/stylesettingsmodel)** (StyleSettingsModel): Navigator style settings.
- **[`tickPosition`](https://ej2.syncfusion.com/documentation/api/range-navigator/#tickposition)** (AxisPosition): Tick Position for the axis. **Default:** 'Outside'
- **[`majorTickLines`](https://ej2.syncfusion.com/documentation/api/range-navigator/majorticklineshmodel)** (MajorTickLinesModel): MajorTickLines configuration.
- **[`majorGridLines`](https://ej2.syncfusion.com/documentation/api/range-navigator/majorgridlinesmodel)** (MajorGridLinesModel): MajorGridLines configuration.

---

## Series and Tooltip Properties

- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangetooltipsettingsmodel)** (RangeTooltipSettingsModel): Options for customizing the tooltip of the chart.
- **[`secondaryLabelAlignment`](https://ej2.syncfusion.com/documentation/api/range-navigator/#secondarylabelalignment)** (LabelAlignment): It specifies the label alignment for secondary axis labels. **Default:** 'Middle'

---

## Period Selector Properties

- **[`periodSelectorSettings`](https://ej2.syncfusion.com/documentation/api/range-navigator/periodselectorsettingsmodel)** (PeriodSelectorSettingsModel): Period selector settings.
- **[`disableRangeSelector`](https://ej2.syncfusion.com/documentation/api/range-navigator/#disablerangeselector)** (boolean): To render the period selector without range navigator. **Default:** false

---

## Interactive Properties

- **[`value`](https://ej2.syncfusion.com/documentation/api/range-navigator/#value)** (number[] | Date[]): Selected range for range navigator. **Default:** []
- **[`allowSnapping`](https://ej2.syncfusion.com/documentation/api/range-navigator/#allowsnapping)** (boolean): Enable snapping for range navigator sliders. **Default:** false
- **[`allowIntervalData`](https://ej2.syncfusion.com/documentation/api/range-navigator/#allowintervaldata)** (boolean): Allow the data to be selected for that particular interval while clicking the particular label. **Default:** false
- **[`enableDeferredUpdate`](https://ej2.syncfusion.com/documentation/api/range-navigator/#enabledeferredupdate)** (boolean): Enable deferred update for the range navigator. **Default:** false
- **[`enableGrouping`](https://ej2.syncfusion.com/documentation/api/range-navigator/#enablegrouping)** (boolean): Enable grouping for the labels. **Default:** false
- **[`groupBy`](https://ej2.syncfusion.com/documentation/api/range-navigator/#groupby)** (RangeIntervalType): GroupBy property for the axis. **Default:** Auto
- **[`locale`](https://ej2.syncfusion.com/documentation/api/range-navigator/#locale)** (string): Overrides the global culture and localization value for this component. **Default:** ''
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/documentation/api/range-navigator/#usegroupingseparator)** (boolean): Specifies whether a grouping separator should be used for a number. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/range-navigator/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/range-navigator/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/range-navigator/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/range-navigator/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [createSecondaryElement()](https://ej2.syncfusion.com/documentation/api/range-navigator/#createsecondaryrange)
Creating secondary range navigator.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/range-navigator/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/documentation/api/range-navigator/#destroy)
To destroy the widget.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/range-navigator/#export)
Handles the export method for range navigator control.

**Parameters:**
- `type` (ExportType): The type of export
- `fileName` (string): The name of the file for export
- `orientation` (optional) (PdfPageOrientation): The orientation of the PDF page
- `controls` (optional) ([]): Array of controls to be exported
- `width` (optional) (number): The width of the exported content
- `height` (optional) (number): The height of the exported content
- `isVertical` (optional) (boolean): Indicates whether the export is vertical

**Returns:** void

### [getModuleName()](https://ej2.syncfusion.com/documentation/api/range-navigator/#getmodulename)
To get the module name of the widget.

**Returns:** string

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/range-navigator/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [onPropertyChanged()](https://ej2.syncfusion.com/documentation/api/range-navigator/#onpropertychanged)
OnProperty change method calling here.

**Parameters:**
- `newProp` (RangeNavigatorModel): The new RangeNavigatorModel

**Returns:** void

### [preRender()](https://ej2.syncfusion.com/documentation/api/range-navigator/#prerender)
Starting point of the control initialization.

**Returns:** void

### [print()](https://ej2.syncfusion.com/documentation/api/range-navigator/#print)
Handles the print method for range navigator control.

**Parameters:**
- `id` (optional) (string[] | string | Element): The id of the range navigator to be printed on the page

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/range-navigator/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/range-navigator/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [render()](https://ej2.syncfusion.com/documentation/api/range-navigator/#render)
To render the range navigator.

**Returns:** void

### [renderChart()](https://ej2.syncfusion.com/documentation/api/range-navigator/#renderchart)
Creating Chart for range navigator.

**Parameters:**
- `resize` (boolean): Indicates whether the chart should be resized

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/range-navigator/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [beforePrint](https://ej2.syncfusion.com/documentation/api/range-navigator/iprinteventargs)
Triggers before the print gets started.

### [beforeResize](https://ej2.syncfusion.com/documentation/api/range-navigator/irangebeforeresizeeventargs)
Triggers before window resize.

### [changed](https://ej2.syncfusion.com/documentation/api/range-navigator/ichangedeventargs)
Triggers after change the slider.

### [labelRender](https://ej2.syncfusion.com/documentation/api/range-navigator/ilabelrendereventsargs)
Triggers before the label rendering.

### [load](https://ej2.syncfusion.com/documentation/api/range-navigator/irangeloadedeventargs)
Triggers before the range navigator rendering.

### [loaded](https://ej2.syncfusion.com/documentation/api/range-navigator/irangeloadedeventargs)
Triggers after the range navigator rendering.

### [resized](https://ej2.syncfusion.com/documentation/api/range-navigator/iresizerangenavigatoreventargs)
Triggers after the range navigator resized.

### [selectorRender](https://ej2.syncfusion.com/documentation/api/range-navigator/irangeselectorrendereventargs)
Triggers before the range navigator selector rendering.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/range-navigator/irangetooltiprendereventargs)
Triggers before the tooltip for series is rendered.

---

## Related Settings Classes

### Axes and Series
- **[`RangeNavigatorSeriesModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangenavigatorseriesmodel)** - Series configuration for range navigator

### Visual and Styling
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/bordermodel)** - Border customization configuration
- **[`StyleSettingsModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/stylesettingsmodel)** - Navigator style settings
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/marginmodel)** - Margin configuration
- **[`FontModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/fontmodel)** - Font styling configuration
- **[`MajorTickLinesModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/majorticklineshmodel)** - Major tick lines configuration
- **[`MajorGridLinesModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/majorgridlinesmodel)** - Major grid lines configuration

### Legend and Tooltip
- **[`RangeTooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangetooltipsettingsmodel)** - Tooltip settings configuration

### Period Selector
- **[`PeriodSelectorSettingsModel`](https://ej2.syncfusion.com/documentation/api/range-navigator/periodselectorsettingsmodel)** - Period selector settings

### Event Arguments
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/iprinteventargs)** - Print event arguments
- **[`IRangeBeforeResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/irangebeforeresizeeventargs)** - Before resize event arguments
- **[`IChangedEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/ichangedeventargs)** - Changed event arguments
- **[`ILabelRenderEventsArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/ilabelrendereventsargs)** - Label render event arguments
- **[`IRangeLoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/irangeloadedeventargs)** - Range loaded event arguments
- **[`IResizeRangeNavigatorEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/iresizerangenavigatoreventargs)** - Range navigator resize event arguments
- **[`IRangeSelectorRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/irangeselectorrendereventargs)** - Range selector render event arguments
- **[`IRangeTooltipRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/range-navigator/irangetooltiprendereventargs)** - Range tooltip render event arguments

### Enumerations
- **[`RangeValueType`](https://ej2.syncfusion.com/documentation/api/range-navigator/#valuetype)** - Value type enumeration (Double, DateTime, Logarithmic, DateTimeCategory)
- **[`RangeIntervalType`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangeintervaltype)** - Interval type enumeration
- **[`ChartTheme`](https://ej2.syncfusion.com/documentation/api/range-navigator/charttheme)** - Theme enumeration
- **[`RangeLabelIntersectAction`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelintersectaction)** - Label intersect action enumeration

---

## Common Usage Patterns

- Configure axis properties using [`minimum`](https://ej2.syncfusion.com/documentation/api/range-navigator/#minimum), [`maximum`](https://ej2.syncfusion.com/documentation/api/range-navigator/#maximum), and [`interval`](https://ej2.syncfusion.com/documentation/api/range-navigator/#interval) for proper range scaling.
- Set data source using [`dataSource`](https://ej2.syncfusion.com/documentation/api/range-navigator/#datasource) and define axis mapping with [`xName`](https://ej2.syncfusion.com/documentation/api/range-navigator/#xname) and [`yName`](https://ej2.syncfusion.com/documentation/api/range-navigator/#yname).
- Customize series appearance using [`series`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangenavigatorseriesmodel) property for styling and data visualization.
- Configure axis labels using [`labelFormat`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelformat), [`labelStyle`](https://ej2.syncfusion.com/documentation/api/range-navigator/fontmodel), and [`labelPlacement`](https://ej2.syncfusion.com/documentation/api/range-navigator/#labelplacement).
- Set selected range using [`value`](https://ej2.syncfusion.com/documentation/api/range-navigator/#value) property for programmatic range selection.
- Enable period selector using [`periodSelectorSettings`](https://ej2.syncfusion.com/documentation/api/range-navigator/periodselectorsettingsmodel) for quick date range selection.
- Customize tooltip behavior using [`tooltip`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangetooltipsettingsmodel) property for better user interaction.
- Handle range changes using the [`changed`](https://ej2.syncfusion.com/documentation/api/range-navigator/ichangedeventargs) event for responsive updates.
- Apply styling using [`navigatorStyleSettings`](https://ej2.syncfusion.com/documentation/api/range-navigator/stylesettingsmodel) and [`navigatorBorder`](https://ej2.syncfusion.com/documentation/api/range-navigator/bordermodel) for visual customization.
- Export range navigator using the [`export()`](https://ej2.syncfusion.com/documentation/api/range-navigator/#export) method to PNG, JPEG, SVG, or PDF formats.

---

## Notes

- The RangeNavigator component typically requires a chart control alongside it for synchronized range selection.
- The [`valueType`](https://ej2.syncfusion.com/documentation/api/range-navigator/#valuetype) property determines the axis data type and should match your data structure (Double for numeric, DateTime for dates).
- The [`animationDuration`](https://ej2.syncfusion.com/documentation/api/range-navigator/#animationduration) property controls animation speed; set to **0** to disable animations.
- Use [`enableDeferredUpdate`](https://ej2.syncfusion.com/documentation/api/range-navigator/#enabledeferredupdate) for better performance with large datasets by deferring updates until range selection completes.
- The [`periodSelectorSettings`](https://ej2.syncfusion.com/documentation/api/range-navigator/periodselectorsettingsmodel) provides quick preset range selections (Last 7 days, Last month, etc.).
- Handle the [`changed`](https://ej2.syncfusion.com/documentation/api/range-navigator/ichangedeventargs) event to synchronize range selection with other components or trigger data updates.
- The [`series`](https://ej2.syncfusion.com/documentation/api/range-navigator/rangenavigatorseriesmodel) property configures how data is visualized within the navigator (area, line, column, etc.).
- RTL support via [`enableRtl`](https://ej2.syncfusion.com/documentation/api/range-navigator/#enablertl) property ensures proper layout for right-to-left language locales.
- Module injection via [`Inject()`](https://ej2.syncfusion.com/documentation/api/range-navigator/#inject) may be required for specific features like DateTime or Logarithmic axes.
