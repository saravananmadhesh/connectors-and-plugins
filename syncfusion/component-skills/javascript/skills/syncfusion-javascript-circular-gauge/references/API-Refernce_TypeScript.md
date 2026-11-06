# CircularGauge API Reference (TypeScript)

Complete API reference for the Syncfusion TypeScript CircularGauge ([`Syncfusion.EJ2.Gauges.CircularGauge`](https://ej2.syncfusion.com/documentation/api/circular-gauge/)) component.

- **Base API Documentation:** [CircularGauge](https://ej2.syncfusion.com/documentation/api/circular-gauge/)
- **Namespace:** `Syncfusion.EJ2.Gauges`
- **Assembly:** `Syncfusion.EJ2.dll`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Layout and Positioning Properties](#layout-and-positioning-properties)
- [Axes and Pointers Properties](#axes-and-pointers-properties)
- [Visual and Styling Properties](#visual-and-styling-properties)
- [Legend and Tooltip Properties](#legend-and-tooltip-properties)
- [Export and Print Properties](#export-and-print-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [CircularGauge()](https://ej2.syncfusion.com/documentation/api/circular-gauge/)
Creates a new instance of the CircularGauge component.

---

## Core Configuration Properties

- **[`title`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#title)** (string): Sets and gets the title for circular gauge. **Default:** ''
- **[`titleStyle`](https://ej2.syncfusion.com/documentation/api/circular-gauge/fontmodel)** (FontModel): Sets and gets the options for customizing the title for circular gauge.
- **[`description`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#description)** (string): Sets and gets the information about gauge for assistive technology. **Default:** null
- **[`theme`](https://ej2.syncfusion.com/documentation/api/circular-gauge/gaugetheme)** (GaugeTheme): Sets and gets the theme styles supported for circular gauge. When the theme is set, the styles associated with the theme will be set in the gauge. **Default:** Material
- **[`locale`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`tabIndex`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#tabindex)** (number): Sets and gets the tab index value for the circular gauge. **Default:** 0
- **[`enablePersistence`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`enableRtl`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#usegroupingseparator)** (boolean): Enables and disables the grouping separator should be used for a number. **Default:** false

---

## Layout and Positioning Properties

- **[`height`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#height)** (string): Sets and gets the height of the circular gauge as a string in order to provide input as both like '100px' or '100%'. If specified as '100%', gauge will render to the full height of its parent element. **Default:** null
- **[`width`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#width)** (string): Sets and gets the width of the circular gauge as a string in order to provide input as both like '100px' or '100%'. If specified as '100%', gauge will render to the full width of its parent element. **Default:** null
- **[`centerX`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#centerx)** (string): Sets and gets the X coordinate of the center of the circular gauge. **Default:** null
- **[`centerY`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#centery)** (string): Sets and gets the Y coordinate of the center of the circular gauge. **Default:** null
- **[`moveToCenter`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#movetocenter)** (boolean): Enables and disables placing the half or quarter circle in center, if `centerX` and `centerY` properties are not specified. **Default:** false
- **[`margin`](https://ej2.syncfusion.com/documentation/api/circular-gauge/marginmodel)** (MarginModel): Sets and gets the options to customize the left, right, top and bottom margins of the circular gauge.
- **[`allowMargin`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#allowmargin)** (boolean): Enables or disables the ability of the gauge to be rendered to the complete width. The left, right, top and bottom spacing will not be considered in the gauge when this property is disabled. **Default:** true

---

## Axes and Pointers Properties

- **[`axes`](https://ej2.syncfusion.com/documentation/api/circular-gauge/axismodel)** (AxisModel[]): Sets and gets the options for customizing the axes of circular gauge.
- **[`enablePointerDrag`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablepointerdrag)** (boolean): Enables and disables drag movement of the pointer in the circular gauge. **Default:** false
- **[`enableRangeDrag`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablerangedrag)** (boolean): Enables and disables the drag movement of the ranges in the circular gauge. **Default:** false
- **[`allowRangePreRender`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#allowrangeprerrender)** (boolean): Allow the range element to be rendered ahead of the axis element, when this property is set to "true". **Default:** true

---

## Animation Properties

- **[`animationDuration`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#animationduration)** (number): Sets and gets the duration of animation in milliseconds in circular gauge. **Default:** 0

---

## Visual and Styling Properties

- **[`background`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#background)** (string): Sets and gets the background color of the gauge. This property accepts value in hex code, rgba string as a valid CSS color string. **Default:** null
- **[`border`](https://ej2.syncfusion.com/documentation/api/circular-gauge/bordermodel)** (BorderModel): Sets and gets the options for customizing the style properties of the gauge border.

---

## Legend and Tooltip Properties

- **[`legendSettings`](https://ej2.syncfusion.com/documentation/api/circular-gauge/legendsettingsmodel)** (LegendSettingsModel): Sets and gets the options for customizing the legend of the circular gauge.
- **[`tooltip`](https://ej2.syncfusion.com/documentation/api/circular-gauge/tooltipsettingsmodel)** (TooltipSettingsModel): Sets and gets the options for customizing the tooltip of gauge.

---

## Export and Print Properties

- **[`allowImageExport`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#allowimageexport)** (boolean): Enables and disables the export to image functionality in circular gauge. **Default:** false
- **[`allowPdfExport`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#allowpdfexport)** (boolean): Enables and disables the export to pdf functionality in circular gauge. **Default:** false
- **[`allowPrint`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#allowprint)** (boolean): Enables and disables the print functionality in circular gauge. **Default:** false

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#destroy)
This method destroys the circular gauge. This method removes the events associated with the circular gauge and disposes the objects created for rendering and updating the circular gauge.

**Returns:** void

### [export()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#export)
This method is used to perform the export functionality for the circular gauge.

**Parameters:**
- `type` (ExportType): Specifies the type of the export
- `fileName` (string): Specifies the file name for the exported file
- `orientation` (optional) (PdfPageOrientation): Specifies the orientation for the exported PDF document
- `allowDownload` (optional) (boolean): Specifies whether to download as a file

**Returns:** Promise<void>

### [getRootElement()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#print)
This method is used to print the rendered circular gauge.

**Parameters:**
- `id` (optional) (string[] | string | Element): Specifies the element to print the circular gauge

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [setAnnotationValue()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setannotationvalue)
This method is used to set the annotation content dynamically for circular gauge.

**Parameters:**
- `axisIndex` (number): Specifies the index value for the axis in circular gauge
- `annotationIndex` (number): Specifies the index value for the annotation in circular gauge
- `content` (string | Function): Specifies the content for the annotation in circular gauge

**Returns:** void

### [setPointerValue()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setpointervalue)
This method is used to set the pointer value dynamically for circular gauge.

**Parameters:**
- `axisIndex` (number): Specifies the index value for the axis in circular gauge
- `pointerIndex` (number): Specifies the index value for the pointer in circular gauge
- `value` (number): Specifies the value for the pointer in circular gauge

**Returns:** void

### [setRangeValue()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setrangevalue)
This method is used to set the range values dynamically for circular gauge.

**Parameters:**
- `axisIndex` (number): Specifies the index value for the axis in circular gauge
- `rangeIndex` (number): Specifies the index value for the range in circular gauge
- `start` (number): Specifies the start value for the current range in circular gauge
- `end` (number): Specifies the end value for the current range in circular gauge

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/documentation/api/circular-gauge/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [animationComplete](https://ej2.syncfusion.com/documentation/api/circular-gauge/ianimationcompleteeventargs)
Triggers after the animation gets completed for pointers.

### [annotationRender](https://ej2.syncfusion.com/documentation/api/circular-gauge/iannotationrendereventargs)
Triggers before each annotation for the circular gauge gets rendered.

### [axisLabelRender](https://ej2.syncfusion.com/documentation/api/circular-gauge/iaxislabelrendereventargs)
Triggers before each axis label gets rendered.

### [beforePrint](https://ej2.syncfusion.com/documentation/api/circular-gauge/iprinteventargs)
Triggers before the print gets started.

### [dragEnd](https://ej2.syncfusion.com/documentation/api/circular-gauge/ipointerdrageventargs)
Triggers after the pointer is dragged.

### [dragMove](https://ej2.syncfusion.com/documentation/api/circular-gauge/ipointerdrageventargs)
Triggers while dragging the pointers.

### [dragStart](https://ej2.syncfusion.com/documentation/api/circular-gauge/ipointerdrageventargs)
Triggers before the pointer is dragged.

### [gaugeMouseDown](https://ej2.syncfusion.com/documentation/api/circular-gauge/imouseeventargs)
Triggers on mouse down.

### [gaugeMouseLeave](https://ej2.syncfusion.com/documentation/api/circular-gauge/imouseeventargs)
Triggers while cursor leaves the circular gauge.

### [gaugeMouseMove](https://ej2.syncfusion.com/documentation/api/circular-gauge/imouseeventargs)
Triggers on hovering the circular gauge.

### [gaugeMouseUp](https://ej2.syncfusion.com/documentation/api/circular-gauge/imouseeventargs)
Triggers when mouse up action is performed over the circular gauge.

### [legendRender](https://ej2.syncfusion.com/documentation/api/circular-gauge/ilegendrendereventargs)
Triggers before each legend for the circular gauge gets rendered.

### [load](https://ej2.syncfusion.com/documentation/api/circular-gauge/iloadedeventargs)
Triggers before the circular gauge gets loaded.

### [loaded](https://ej2.syncfusion.com/documentation/api/circular-gauge/iloadedeventargs)
Triggers after the circular gauge gets loaded.

### [radiusCalculate](https://ej2.syncfusion.com/documentation/api/circular-gauge/iradiuscalculateeventargs)
Triggers before the radius for the circular gauge gets calculated.

### [resized](https://ej2.syncfusion.com/documentation/api/circular-gauge/iresizeeventargs)
Triggers to notify the resize of the circular gauge when the window is resized.

### [tooltipRender](https://ej2.syncfusion.com/documentation/api/circular-gauge/itooltiprendereventargs)
Triggers before the tooltip for pointer of the circular gauge gets rendered.

---

## Related Settings Classes

### Axes and Ranges
- **[`AxisModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/axismodel)** - Represents the axis configuration
- **[`RangeModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/rangemodel)** - Represents the range configuration
- **[`PointerModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/pointermodel)** - Represents the pointer configuration
- **[`TickModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/tickmodel)** - Represents the tick configuration

### Visual and Styling
- **[`BorderModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/bordermodel)** - Border styling configuration
- **[`MarginModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/marginmodel)** - Margin configuration
- **[`FontModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/fontmodel)** - Font styling configuration

### Legend and Tooltip
- **[`LegendSettingsModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/legendsettingsmodel)** - Legend settings configuration
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/tooltipsettingsmodel)** - Tooltip settings configuration

### Annotations
- **[`AnnotationModel`](https://ej2.syncfusion.com/documentation/api/circular-gauge/annotationmodel)** - Annotation configuration

### Event Arguments
- **[`IAnimationCompleteEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/ianimationcompleteeventargs)** - Animation complete event arguments
- **[`IAnnotationRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/iannotationrendereventargs)** - Annotation render event arguments
- **[`IAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/iaxislabelrendereventargs)** - Axis label render event arguments
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/iprinteventargs)** - Print event arguments
- **[`IPointerDragEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/ipointerdrageventargs)** - Pointer drag event arguments
- **[`IMouseEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/imouseeventargs)** - Mouse event arguments
- **[`ILegendRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/ilegendrendereventargs)** - Legend render event arguments
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/iloadedeventargs)** - Loaded event arguments
- **[`IRadiusCalculateEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/iradiuscalculateeventargs)** - Radius calculate event arguments
- **[`IResizeEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/iresizeeventargs)** - Resize event arguments
- **[`ITooltipRenderEventArgs`](https://ej2.syncfusion.com/documentation/api/circular-gauge/itooltiprendereventargs)** - Tooltip render event arguments

### Theme
- **[`GaugeTheme`](https://ej2.syncfusion.com/documentation/api/circular-gauge/gaugetheme)** - Available gauge theme enumeration

---

## Common Usage Patterns

- Configure gauge structure using [`axes`](https://ej2.syncfusion.com/documentation/api/circular-gauge/axismodel) property to define scale, ranges, and pointers.
- Set gauge center position using [`centerX`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#centerx) and [`centerY`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#centery) or enable [`moveToCenter`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#movetocenter).
- Customize appearance using [`title`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#title), [`theme`](https://ej2.syncfusion.com/documentation/api/circular-gauge/gaugetheme), and [`background`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#background) properties.
- Enable interactive features using [`enablePointerDrag`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablepointerdrag) and [`enableRangeDrag`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablerangedrag) properties.
- Dynamically update pointer values using the [`setPointerValue()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setpointervalue) method.
- Configure legend using [`legendSettings`](https://ej2.syncfusion.com/documentation/api/circular-gauge/legendsettingsmodel) property for range display.
- Add dynamic tooltips using [`tooltip`](https://ej2.syncfusion.com/documentation/api/circular-gauge/tooltipsettingsmodel) property configuration.
- Handle user interactions via events like [`dragEnd`](https://ej2.syncfusion.com/documentation/api/circular-gauge/ipointerdrageventargs), [`gaugeMouseClick`](https://ej2.syncfusion.com/documentation/api/circular-gauge/imouseeventargs), and [`tooltipRender`](https://ej2.syncfusion.com/documentation/api/circular-gauge/itooltiprendereventargs).
- Export the gauge using the [`export()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#export) method to PNG, JPEG, or PDF formats.

---

## Notes

- The CircularGauge component requires at least one axis to be configured through the [`axes`](https://ej2.syncfusion.com/documentation/api/circular-gauge/axismodel) property.
- The [`centerX`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#centerx) and [`centerY`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#centery) properties accept string values in pixels or percentages.
- Use [`enablePointerDrag`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#enablepointerdrag) to allow users to interactively update pointer values.
- The [`animationDuration`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#animationduration) property controls animation speed; set to **0** to disable animations.
- Dynamic value updates can be performed using [`setPointerValue()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setpointervalue), [`setRangeValue()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setrangevalue), and [`setAnnotationValue()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#setannotationvalue) methods.
- Event handlers can be attached using the [`addEventListener()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#addeventlistener) method for real-time gauge interactions.
- The [`export()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#export) method returns a Promise and supports PNG, JPEG, SVG, and PDF export formats.
- Module injection via [`Inject()`](https://ej2.syncfusion.com/documentation/api/circular-gauge/#inject) may be required for certain features.
