# Smith Chart API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Smith Chart ([`@syncfusion/ej2-charts.Smithchart`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/)) component.

- **Base API Documentation:** [Smithchart](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/)
- **Module:** `@syncfusion/ej2-charts`
- **Package:** `@syncfusion/ej2-charts`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Axis Configuration Properties](#axis-configuration-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Title and Legend Properties](#title-and-legend-properties)
- [Series and Data Properties](#series-and-data-properties)
- [Visual Styling Properties](#visual-styling-properties)
- [Appearance Properties](#appearance-properties)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [Smithchart()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/)
Creates a new instance of the Smith Chart component.

---

## Core Configuration Properties

- **[`renderType`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#rendertype)** (RenderType): Render type of smithchart (Impedance or Admittance). **Default:** Impedance
- **[`radius`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#radius)** (number): Radius of the Smith Chart (normalized scale). **Default:** 1
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#theme)** (SmithchartTheme): Theme for smithchart. **Default:** Material
- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`elementSpacing`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#elementspacing)** (number): Spacing between elements. **Default:** 10

---

## Axis Configuration Properties

- **[`horizontalAxis`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartaxismodel)** (SmithchartAxisModel): Options to configure the horizontal axis (representing real component of impedance).
- **[`radialAxis`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartaxismodel)** (SmithchartAxisModel): Options to configure the vertical/radial axis (representing imaginary component of impedance).

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#height)** (string): Height for smithchart. **Default:** ''
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#width)** (string): Width for smithchart. **Default:** ''
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartmarginmodel)** (SmithchartMarginModel): Options for customizing margin.
- **[`bounds`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartrect)** (SmithchartRect): Area bounds for the smith chart.

---

## Title and Legend Properties

- **[`title`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/titlemodel)** (TitleModel): Options for customizing title.
- **[`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartlegendsettingsmodel)** (SmithchartLegendSettingsModel): Options for customizing legend.
- **[`legendBounds`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartrect)** (SmithchartRect): Legend bounds.

---

## Series and Data Properties

- **[`series`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartseriesmodel)** (SmithchartSeriesModel[]): Options for customizing series.

---

## Visual Styling Properties

- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#background)** (string): The background color of the smithchart. **Default:** null
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartbordermodel)** (SmithchartBorderModel): Options for customizing border.
- **[`font`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartfontmodel)** (SmithchartFontModel): Options for customizing font.

---

## Appearance Properties

- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false

---

## Module Properties

- **[`smithchartLegendModule`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartlegend)** (SmithchartLegend): `smithchartLegendModule` is used to add legend to the smithchart.
- **[`tooltipRenderModule`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/tooltiprender)** (TooltipRender): `tooltipRenderModule` is used to add tooltip to the smithchart.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#destroy)
To destroy the widget.

**Returns:** void

### [export()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#export)
Handles the export method for the smith chart control.

**Parameters:**
- `type` (SmithchartExportType): The smith chart export type
- `fileName` (string): The filename of the exported smith chart
- `orientation` (optional) (PdfPageOrientation): The page orientation for PDF export

**Returns:** void

### [getModuleName()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#getmodulename)
Get component name.

**Returns:** string

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [smithchartOnClick()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#smithchartonclick)
To handle the click event for the smithchart.

**Parameters:**
- `e` (Event | PointerEvent): The event

**Returns:** void

### [smithchartOnResize()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#smithchartonresize)
To handle the window resize event on smithchart.

**Returns:** boolean

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [animationComplete](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartanimationcompleteeventargs)
Triggers after the animation completed.

### [axisLabelRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartaxislabelrendereventargs)
Triggers before the axis label is rendered.

### [beforePrint](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartprinteventargs)
Triggers before the print gets started.

### [legendRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartlegendrendereventargs)
Triggers before the legend is rendered.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartloadeventargs)
Triggers before smithchart rendered.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartloadedeventargs)
Triggers after smithchart rendered.

### [seriesRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartseriesrendereventargs)
Triggers before the series is rendered.

### [subtitleRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/isubtitlerendereventargs)
Triggers before the sub-title is rendered.

### [textRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithcharttextrendereventargs)
Triggers before the datalabel text is rendered.

### [titleRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ititlerendereventargs)
Triggers before the title is rendered.

### [tooltipRender](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithcharttooltipeventargs)
Triggers before the tooltip rendering.

---

## Related Settings Classes

### Axis Configuration
- **[`SmithchartAxisModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartaxismodel)** - Axis configuration for horizontal and radial axes
- **[`SmithchartAxisLabelSettings`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartaxislabels)** - Axis label settings

### Series and Data
- **[`SmithchartSeriesModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartseriesmodel)** - Series configuration model
- **[`SmithchartDataLabelSettings`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartdatalabelsettings)** - Data label settings for series

### Visual and Styling
- **[`SmithchartBorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartbordermodel)** - Border customization configuration
- **[`SmithchartMarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartmarginmodel)** - Margin configuration
- **[`SmithchartFontModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartfontmodel)** - Font styling configuration
- **[`SmithchartRect`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartrect)** - Rectangle/bounds definition

### Title and Legend
- **[`TitleModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/titlemodel)** - Title configuration
- **[`SmithchartLegendSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartlegendsettingsmodel)** - Legend settings configuration
- **[`SmithchartLegend`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartlegend)** - Legend module

### Tooltip and Rendering
- **[`TooltipRender`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/tooltiprender)** - Tooltip rendering module

### Event Arguments
- **[`ISmithchartAnimationCompleteEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartanimationcompleteeventargs)** - Animation complete event arguments
- **[`ISmithchartAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartaxislabelrendereventargs)** - Axis label render event arguments
- **[`ISmithchartPrintEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartprinteventargs)** - Print event arguments
- **[`ISmithchartLegendRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartlegendrendereventargs)** - Legend render event arguments
- **[`ISmithchartLoadEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartloadeventargs)** - Load event arguments
- **[`ISmithchartLoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartloadedeventargs)** - Loaded event arguments
- **[`ISmithchartSeriesRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartseriesrendereventargs)** - Series render event arguments
- **[`ISubTitleRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/isubtitlerendereventargs)** - Subtitle render event arguments
- **[`ISmithchartTextRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithcharttextrendereventargs)** - Text/datalabel render event arguments
- **[`ITitleRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ititlerendereventargs)** - Title render event arguments
- **[`ISmithChartTooltipEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithcharttooltipeventargs)** - Tooltip render event arguments

### Enumerations
- **[`RenderType`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/rendertype)** - Render type enumeration (Impedance, Admittance)
- **[`SmithchartTheme`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithcharttheme)** - Theme enumeration (Material, Bootstrap, Fabric, etc.)
- **[`SmithchartExportType`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartexporttype)** - Export type enumeration (PNG, JPEG, SVG, PDF)

---

## Common Usage Patterns

- Set the render type using [`renderType`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#rendertype) property to display either Impedance or Admittance parameters on the Smith Chart.
- Configure horizontal axis using [`horizontalAxis`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartaxismodel) for controlling the real component display (resistance/conductance).
- Configure radial axis using [`radialAxis`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartaxismodel) for controlling the imaginary component display (reactance/susceptance).
- Add data points to series using [`series`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartseriesmodel) property with resistance and reactance values.
- Enable legend using [`legendSettings`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/smithchartlegendsettingsmodel) to identify different data series on the chart.
- Customize chart appearance using [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#theme) property to apply predefined color schemes.
- Add title and subtitle using [`title`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/titlemodel) property for better chart documentation.
- Handle series rendering using [`seriesRender`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartseriesrendereventargs) event for dynamic customization.
- Configure tooltips using [`tooltipRenderModule`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/tooltiprender) and the [`tooltipRender`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithcharttooltipeventargs) event for custom tooltip content.
- Export chart using [`export()`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#export) method to PNG, JPEG, SVG, or PDF formats.

---

## Notes

- The Smith Chart is primarily used for visualizing transmission line, impedance, and reflection coefficient data in electrical engineering applications.
- The [`renderType`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#rendertype) property determines whether the chart displays Impedance (**Impedance**) or Admittance (**Admittance**) parameters.
- The horizontal axis represents the real component (resistance or conductance), while the radial axis represents the imaginary component (reactance or susceptance).
- Use [`radius`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#radius) property to set the normalization value for the Smith Chart (typically **1** for 50Ω systems).
- The [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#theme) property provides predefined color schemes: **Material** is the default theme.
- RTL support via [`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#enablertl) property ensures proper layout for right-to-left language locales.
- Use rendering events like [`axisLabelRender`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartaxislabelrendereventargs), [`seriesRender`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ismithchartseriesrendereventargs), and [`titleRender`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/ititlerendereventargs) for dynamic customization before rendering.
- The Smith Chart supports module injection for legends and tooltips through [`Inject()`](https://ej2.syncfusion.com/javascript/documentation/api/smithchart/#inject) method.
- Data points in the Smith Chart should use normalized resistance/reactance values (e.g., 0 to 1 for a 50Ω reference).
