# Sparkline API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Sparkline ([`@syncfusion/ej2-charts.Sparkline`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/)) component.

- **Base API Documentation:** [Sparkline](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/)
- **Module:** `@syncfusion/ej2-charts`
- **Package:** `@syncfusion/ej2-charts`

- [Constructor](#constructor)
- [Data Source Properties](#data-source-properties)
- [Type and Format Properties](#type-and-format-properties)
- [Series Styling Properties](#series-styling-properties)
- [Point Color Properties](#point-color-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Axis Configuration Properties](#axis-configuration-properties)
- [Markers and Labels Properties](#markers-and-labels-properties)
- [Interactive Properties](#interactive-properties)
- [Range Band Properties](#range-band-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [Sparkline()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/)
Creates a new instance of the Sparkline component.

---

## Data Source Properties

- **[`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#datasource)** (Object[] | DataManager): To configure sparkline data source. **Default:** null
- **[`query`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#query)** (Query): Specifies the query for filter the data. **Default:** null
- **[`xName`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#xname)** (string): To configure sparkline series xName. **Default:** null
- **[`yName`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#yname)** (string): To configure sparkline series yName. **Default:** null

---

## Type and Format Properties

- **[`type`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#type)** (SparklineType): To configure Sparkline series type (Line, Column, Area, WinLoss, Pie). **Default:** 'Line'
- **[`valueType`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#valuetype)** (SparklineValueType): To configure sparkline series value type (Numeric, Category, DateTime). **Default:** 'Numeric'
- **[`format`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#format)** (string): To apply internationalization for sparkline. **Default:** null

---

## Series Styling Properties

- **[`fill`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#fill)** (string): To configure sparkline series fill color. **Default:** '#00bdae'
- **[`lineWidth`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#linewidth)** (number): To configure sparkline line series width. **Default:** 1
- **[`opacity`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#opacity)** (number): To configure sparkline line series opacity. **Default:** 1
- **[`palette`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#palette)** (string[]): To configure sparkline series color palette. Applicable to column and pie type series. **Default:** []
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinebordermodel)** (SparklineBorderModel): To configure Sparkline points border color and width.
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#theme)** (SparklineTheme): To configure sparkline theme. **Default:** 'Material'

---

## Point Color Properties

- **[`highPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#highpointcolor)** (string): To configure sparkline series highest y value point color. **Default:** ''
- **[`lowPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#lowpointcolor)** (string): To configure sparkline series lowest y value point color. **Default:** ''
- **[`negativePointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#negativepointcolor)** (string): To configure sparkline series negative y value point color. **Default:** ''
- **[`startPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#startpointcolor)** (string): To configure sparkline series first x value point color. **Default:** ''
- **[`endPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#endpointcolor)** (string): To configure sparkline series last x value point color. **Default:** ''
- **[`tiePointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#tiepointcolor)** (string): To configure sparkline winloss series tie y value point color. **Default:** ''

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#height)** (string): To configure Sparkline height. **Default:** null
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#width)** (string): To configure Sparkline width. **Default:** null
- **[`padding`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/paddingmodel)** (PaddingModel): To configure Sparkline container area customization.
- **[`containerArea`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/containerareamodel)** (ContainerAreaModel): To configure Sparkline container area customization.

---

## Axis Configuration Properties

- **[`axisSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/axissettingsmodel)** (AxisSettingsModel): To configure Sparkline axis customization.
- **[`rangePadding`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#rangepadding)** (SparklineRangePadding): To configure Sparkline range padding (None, Normal, Additional, Round). **Default:** 'None'

---

## Markers and Labels Properties

- **[`markerSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinemarkersettingsmodel)** (SparklineMarkerSettingsModel): To configure Sparkline marker configuration.
- **[`dataLabelSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinedatalabelsettingsmodel)** (SparklineDataLabelSettingsModel): To configure Sparkline dataLabel configuration.

---

## Interactive Properties

- **[`tooltipSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinetooltipsettingsmodel)** (SparklineTooltipSettingsModel): To configure Sparkline tooltip settings.
- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#usegroupingseparator)** (boolean): To enable the grouping separator. **Default:** false

---

## Range Band Properties

- **[`rangeBandSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/rangebandsettingsmodel)** (RangeBandSettingsModel[]): To configure Sparkline range band customization.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#destroy)
Destroy the component.

**Returns:** void

### [getModuleName()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#getmodulename)
Get component name.

**Returns:** string

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [renderSparkline()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#rendersparkline)
To render sparkline elements.

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [axisRendering](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/iaxisrenderingeventargs)
Triggers before sparkline axis render.

### [dataLabelRendering](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/idatalabelrenderingeventargs)
Triggers before the sparkline datalabel render.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineloadeventargs)
Triggers before sparkline render.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineloadedeventargs)
Triggers after sparkline rendered.

### [markerRendering](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/imarkerrenderingeventargs)
Triggers before the sparkline marker render.

### [pointRegionMouseClick](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/ipointregioneventargs)
Triggers while mouse click on the sparkline point region.

### [pointRegionMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/ipointregioneventargs)
Triggers while mouse move on the sparkline point region.

### [pointRendering](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinepointeventargs)
Triggers before sparkline points render.

### [resize](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineresizeeventargs)
Triggers on resizing the sparkline.

### [seriesRendering](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/iseriesrenderingeventargs)
Triggers before sparkline series render.

### [sparklineMouseClick](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinemouseeventargs)
Triggers while mouse click on the sparkline container.

### [sparklineMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinemouseeventargs)
Triggers while mouse move on the sparkline container.

### [tooltipInitialize](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/itooltiprenderingeventargs)
Triggers before sparkline tooltip render.

---

## Related Settings Classes

### Data and Series Configuration
- **[`AxisSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/axissettingsmodel)** - Axis configuration settings

### Visual and Styling
- **[`SparklineBorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinebordermodel)** - Border customization configuration
- **[`ContainerAreaModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/containerareamodel)** - Container area customization
- **[`PaddingModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/paddingmodel)** - Padding configuration

### Markers and Data Labels
- **[`SparklineMarkerSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinemarkersettingsmodel)** - Marker configuration settings
- **[`SparklineDataLabelSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinedatalabelsettingsmodel)** - Data label configuration settings

### Range Bands
- **[`RangeBandSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/rangebandsettingsmodel)** - Range band customization

### Tooltip
- **[`SparklineTooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinetooltipsettingsmodel)** - Tooltip settings configuration

### Event Arguments
- **[`IAxisRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/iaxisrenderingeventargs)** - Axis rendering event arguments
- **[`IDataLabelRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/idatalabelrenderingeventargs)** - Data label rendering event arguments
- **[`ISparklineLoadEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineloadeventargs)** - Load event arguments
- **[`ISparklineLoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineloadedeventargs)** - Loaded event arguments
- **[`IMarkerRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/imarkerrenderingeventargs)** - Marker rendering event arguments
- **[`IPointRegionEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/ipointregioneventargs)** - Point region event arguments
- **[`ISparklinePointEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinepointeventargs)** - Point rendering event arguments
- **[`ISparklineResizeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineresizeeventargs)** - Resize event arguments
- **[`ISeriesRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/iseriesrenderingeventargs)** - Series rendering event arguments
- **[`ISparklineMouseEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinemouseeventargs)** - Mouse event arguments
- **[`ITooltipRenderingEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/itooltiprenderingeventargs)** - Tooltip rendering event arguments

### Enumerations
- **[`SparklineType`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinetype)** - Sparkline type enumeration (Line, Column, Area, WinLoss, Pie)
- **[`SparklineValueType`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinevaluetype)** - Value type enumeration (Numeric, Category, DateTime)
- **[`SparklineRangePadding`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinerangepadding)** - Range padding enumeration (None, Normal, Additional, Round)
- **[`SparklineTheme`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinetheme)** - Theme enumeration (Material, Bootstrap, Fabric, etc.)

---

## Common Usage Patterns

- Configure data source using [`dataSource`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#datasource) property and map values with [`xName`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#xname) and [`yName`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#yname).
- Set sparkline visualization type using [`type`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#type) property (Line, Column, Area, WinLoss, Pie).
- Customize series appearance using [`fill`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#fill), [`lineWidth`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#linewidth), and [`opacity`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#opacity) properties.
- Highlight specific points using point color properties: [`highPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#highpointcolor), [`lowPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#lowpointcolor), [`negativePointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#negativepointcolor), etc.
- Enable markers using [`markerSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinemarkersettingsmodel) property to display point markers on the sparkline.
- Add data labels using [`dataLabelSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinedatalabelsettingsmodel) property to show values on the sparkline.
- Configure tooltips using [`tooltipSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/sparklinetooltipsettingsmodel) property with the [`tooltipInitialize`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/itooltiprenderingeventargs) event for custom tooltip content.
- Apply range bands using [`rangeBandSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/rangebandsettingsmodel) to highlight specific value ranges.
- Customize axis using [`axisSettings`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/axissettingsmodel) property to configure horizontal and vertical axes.
- Handle sparkline interactions using mouse events: [`sparklineMouseClick`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinemouseeventargs), [`sparklineMouseMove`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinemouseeventargs), [`pointRegionMouseClick`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/ipointregioneventargs).

---

## Notes

- Sparklines are compact data visualizations designed to fit in small spaces like table cells or summaries.
- The [`type`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#type) property determines the visualization: **'Line'** for trends, **'Column'** for comparisons, **'Area'** for filled trends, **'WinLoss'** for performance, **'Pie'** for composition.
- The [`fill`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#fill) property sets the default series color (**'#00bdae'** is the default).
- Point colors override the default fill: use [`highPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#highpointcolor), [`lowPointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#lowpointcolor), and [`negativePointColor`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#negativepointcolor) to highlight extreme values.
- The [`valueType`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#valuetype) property specifies data format: **'Numeric'** for numbers, **'Category'** for labels, **'DateTime'** for dates.
- Use [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#theme) property to apply predefined color schemes: **'Material'** is the default theme.
- RTL support via [`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#enablertl) property ensures proper layout for right-to-left language locales.
- Use rendering events like [`seriesRendering`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/iseriesrenderingeventargs), [`pointRendering`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklinepointeventargs), and [`markerRendering`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/imarkerrenderingeventargs) for dynamic customization.
- The [`palette`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/#palette) property applies color schemes to Column and Pie type sparklines.
- Sparklines respond to container size changes via the [`resize`](https://ej2.syncfusion.com/javascript/documentation/api/sparkline/isparklineresizeeventargs) event.
