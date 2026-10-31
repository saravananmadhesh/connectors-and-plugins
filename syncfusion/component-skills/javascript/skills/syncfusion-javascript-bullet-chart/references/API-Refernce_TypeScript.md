# BulletChart API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript BulletChart ([`Syncfusion.EJ2.Charts.BulletChart`](https://ej2.syncfusion.com/documentation/api/bullet-chart/)) component.

- **Base API Documentation:** [BulletChart](https://ej2.syncfusion.com/documentation/api/bullet-chart/)
- **Namespace:** `Syncfusion.EJ2.Charts`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Data and Value Properties](#data-and-value-properties)
- [Scale and Axis Properties](#scale-and-axis-properties)
- [Visual and Styling Properties](#visual-and-styling-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [BulletChart()](https://ej2.syncfusion.com/documentation/api/bullet-chart/)
Creates a new instance of the BulletChart component.

---

## Core Configuration Properties

- **[`title`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#title)** (string): Specifies the title of the bullet chart. **Default:** ''
- **[`subtitle`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#subtitle)** (string): Specifies the sub title of the bullet chart. **Default:** ''
- **[`titleStyle`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletlabelstylemodel)** (BulletLabelStyleModel): Options for customizing the title styles of the bullet chart.
- **[`titlePosition`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#titleposition)** (TextPosition): Sets the title position of bullet chart. **Default:** 'Top'
- **[`subtitleStyle`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletlabelstylemodel)** (BulletLabelStyleModel): Options for customizing the sub title styles of the bullet chart.
- **[`theme`](https://ej2.syncfusion.com/documentation/api/bullet-chart/charttheme)** (ChartTheme): Specifies the theme for the bullet chart. **Default:** 'Material'
- **[`tabIndex`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#tabindex)** (number): TabIndex value for the bullet chart. **Default:** 1
- **[`locale`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#locale)** (string): The locale of the bullet chart as a string. **Default:** null
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enableGroupSeparator`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#enablegroupseparator)** (boolean): Default value for enableGroupSeparator. **Default:** false

---

## Data and Value Properties

- **[`dataSource`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#datasource)** (Object): Default value of multiple data bullet chart. **Default:** null
- **[`valueField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valuefield)** (string): The DataSource field that contains the value value. **Default:** ''
- **[`targetField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetfield)** (string): The DataSource field that contains the target value. **Default:** ''
- **[`categoryField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#categoryfield)** (string): It defines the category for the data source. **Default:** null
- **[`query`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#query)** (Query): It defines the query for the data source. **Default:** null

---

## Value Bar Configuration Properties

- **[`type`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#type)** (FeatureType): Default type on feature measure. **Default:** 'Rect'
- **[`valueFill`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valuefill)** (string): The stroke color for the feature measure, which can accept values in hex and rgba as valid CSS color strings. This property can also be mapped from the data source. **Default:** null
- **[`valueHeight`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valueheight)** (number): Options for customizing feature bar height of the bullet chart. **Default:** 6
- **[`valueBorder`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bordermodel)** (BorderModel): Options for customizing the color and width of the feature bar border.

---

## Comparative Bar Configuration Properties

- **[`targetColor`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetcolor)** (string): The stroke color for the comparative measure, which can accept values in hex and rgba as valid CSS color strings. This property can also be mapped from the data source. **Default:** '#191919'
- **[`targetWidth`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetwidth)** (number): Options for customizing comparative bar color bullet chart. **Default:** 5
- **[`targetTypes`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targettypes)** (TargetType[]): The DataSource field that contains the target value. **Default:** ['Rect', 'Cross', 'Circle']

---

## Scale and Axis Properties

- **[`minimum`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#minimum)** (number): Specifies the minimum range of an scale. **Default:** null
- **[`maximum`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#maximum)** (number): Specifies the maximum range of an scale. **Default:** null
- **[`interval`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#interval)** (number): Specifies the interval for an scale. **Default:** null
- **[`minorTicksPerInterval`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#minortickssperinterval)** (number): Specifies the interval of minor ticks. **Default:** 4
- **[`orientation`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#orientation)** (OrientationType): Orientation of the scale. **Default:** 'Horizontal'
- **[`opposedPosition`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#opposedposition)** (boolean): If set to true, the axis will render at the opposite side of its default position. **Default:** false

---

## Axis Label and Tick Properties

- **[`labelFormat`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#labelformat)** (string): Specifies the format of the bullet chart axis labels. **Default:** ''
- **[`labelPosition`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#labelposition)** (LabelsPlacement): Specifies the axis label position of the bullet chart. **Default:** 'Outside'
- **[`labelStyle`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletlabelstylemodel)** (BulletLabelStyleModel): Options for customizing labels.
- **[`categoryLabelStyle`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletlabelstylemodel)** (BulletLabelStyleModel): Options for customizing values labels.
- **[`tickPosition`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#tickposition)** (TickPosition): Specifies the tick position of the bullet chart. **Default:** 'Outside'
- **[`majorTickLines`](https://ej2.syncfusion.com/documentation/api/bullet-chart/majorticklinessettingsmodel)** (MajorTickLinesSettingsModel): Options for customizing major tick lines.
- **[`minorTickLines`](https://ej2.syncfusion.com/documentation/api/bullet-chart/minorticklinessettingsmodel)** (MinorTickLinesSettingsModel): Options for customizing minor tick lines.

---

## Visual and Styling Properties

- **[`height`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#height)** (string): The height of the bullet chart as a string accepts input both as '100px' or '100%'. If specified as '100%', bullet chart renders to the full height of its parent element. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#width)** (string): The width of the bullet chart as a string accepts input as both like '100px' or '100%'. If specified as '100%', bullet chart renders to the full width of its parent element. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/documentation/api/bullet-chart/marginmodel)** (MarginModel): Options to customize left, right, top and bottom margins of the bullet chart.
- **[`border`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bordermodel)** (BorderModel): Options for customizing the color and width of the chart border.
- **[`animation`](https://ej2.syncfusion.com/documentation/api/bullet-chart/animationmodel)** (AnimationModel): Options for customizing animation of the feature bar.

---

## Data Label and Range Properties

- **[`dataLabel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletdatalabelmodel)** (BulletDataLabelModel): Options for customizing data label of the feature bar.
- **[`ranges`](https://ej2.syncfusion.com/documentation/api/bullet-chart/rangemodel)** (RangeModel[]): Provides qualitative ranges of the bullet chart.

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletchartlegendsettingsmodel)** (BulletChartLegendSettingsModel): Options for customizing the legend of the bullet chart.
- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bullettooltipsettingsmodel)** (BulletTooltipSettingsModel): Options for customizing the tooltip of the BulletChart.

---

## Module Properties

- **[`bulletChartLegendModule`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletchartlegend)** (BulletChartLegend): The `bulletChartLegendModule` is used to manipulate and add legend in bullet chart.
- **[`bulletTooltipModule`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bullettooltip)** (BulletTooltip): The `bulletTooltipModule` is used to manipulate and add tooltip to the feature bar.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [createSvg()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#createsvg)
Method to create SVG element.

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#destroy)
To destroy the widget.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#export)
Handles the export method for bullet chart control.

**Parameters:**
- `type` (ExportType): Type of the export
- `fileName` (string): File name for exporting
- `orientation` (optional) (PdfPageOrientation): Orientation of the export
- `controls` (optional) (BulletChart[]): To mention the exporting chart
- `width` (optional) (number): Width of the export
- `height` (optional) (number): Height of the export
- `isVertical` (optional) (boolean): Whether the export is in vertical orientation

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#print)
Handles the print method for bullet chart control.

**Parameters:**
- `id` (optional) (string[] | string | Element): The id of the bullet chart to be printed on the page

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/bullet-chart/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [beforePrint](https://ej2.syncfusion.com/documentation/api/bullet-chart/iprinteventargs)
Triggers before the print gets started.

### [bulletChartMouseClick](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletmouseeventargs)
Triggers on clicking the chart.

### [legendRender](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletlegendrendereventargs)
Triggers before the legend is rendered.

### [load](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletloadedeventargs)
Triggers before bullet chart load.

### [loaded](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletloadedeventargs)
Triggers after the bullet chart rendering.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletcharttooltipeventargs)
Triggers before the bullet chart tooltip is rendered.

---

## Related Settings Classes

### Data Binding
- **[`RangeModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/rangemodel)** - Represents a qualitative range configuration

### Styling and Appearance
- **[`AnimationModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/animationmodel)** - Configuration for animation settings
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bordermodel)** - Border styling configuration
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/marginmodel)** - Margin configuration
- **[`BulletLabelStyleModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletlabelstylemodel)** - Label styling configuration

### Axis Configuration
- **[`MajorTickLinesSettingsModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/majorticklinessettingsmodel)** - Major tick lines configuration
- **[`MinorTickLinesSettingsModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/minorticklinessettingsmodel)** - Minor tick lines configuration

### Data Labels, Legend, and Tooltips
- **[`BulletDataLabelModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletdatalabelmodel)** - Data label configuration
- **[`BulletChartLegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletchartlegendsettingsmodel)** - Legend settings configuration
- **[`BulletTooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bullettooltipsettingsmodel)** - Tooltip settings configuration

### Modules
- **[`BulletChartLegend`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletchartlegend)** - Module for managing legends
- **[`BulletTooltip`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bullettooltip)** - Module for managing tooltips

### Event Arguments
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/bullet-chart/iprinteventargs)** - Print event arguments
- **[`IBulletMouseEventArgs`](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletmouseeventargs)** - Mouse event arguments
- **[`IBulletLegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletlegendrendereventargs)** - Legend render event arguments
- **[`IBulletLoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletloadedeventargs)** - Loaded event arguments
- **[`IBulletchartTooltipEventArgs`](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletcharttooltipeventargs)** - Tooltip render event arguments

### Theme
- **[`ChartTheme`](https://ej2.syncfusion.com/documentation/api/bullet-chart/charttheme)** - Available chart themes enumeration

---

## Common Usage Patterns

- Configure data binding using [`dataSource`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#datasource), [`valueField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valuefield), and [`targetField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetfield) properties.
- Set the scale range using [`minimum`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#minimum), [`maximum`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#maximum), and [`interval`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#interval) properties.
- Customize the feature bar using [`type`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#type), [`valueFill`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valuefill), [`valueHeight`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valueheight), and [`valueBorder`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bordermodel) properties.
- Customize the comparative bar using [`targetColor`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetcolor), [`targetWidth`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetwidth), and [`targetTypes`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targettypes) properties.
- Define qualitative ranges using the [`ranges`](https://ej2.syncfusion.com/documentation/api/bullet-chart/rangemodel) property for visual representation.
- Customize appearance using [`title`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#title), [`theme`](https://ej2.syncfusion.com/documentation/api/bullet-chart/charttheme), and [`border`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bordermodel) properties.
- Configure interactive features using [`legendSettings`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bulletchartlegendsettingsmodel) and [`tooltip`](https://ej2.syncfusion.com/documentation/api/bullet-chart/bullettooltipsettingsmodel) properties.
- Handle lifecycle events like [`load`](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletloadedeventargs), [`loaded`](https://ej2.syncfusion.com/documentation/api/bullet-chart/ibulletloadedeventargs), and export via the [`export()`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#export) method.

---

## Notes

- The BulletChart component requires data to be bound through the [`dataSource`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#datasource) property with appropriate field mappings.
- The [`valueField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#valuefield) and [`targetField`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#targetfield) properties must be specified to properly display the feature and comparative bars.
- The scale range must be defined using [`minimum`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#minimum) and [`maximum`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#maximum) properties, otherwise automatic scaling will be used.
- Qualitative ranges defined in the [`ranges`](https://ej2.syncfusion.com/documentation/api/bullet-chart/rangemodel) property provide visual context for evaluating the actual and target values.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#addeventlistener) method for real-time chart interactions.
- Use the [`export()`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#export) method to export the chart to PNG, JPEG, or SVG formats, and the [`print()`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#print) method for printing.
- Module injection via [`Inject()`](https://ej2.syncfusion.com/documentation/api/bullet-chart/#inject) may be required for certain features like legends and tooltips.
