# Linear Gauge API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Linear Gauge ([`@syncfusion/ej2-lineargauge.LinearGauge`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/)) component.

- **Base API Documentation:** [LinearGauge](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/)
- **Module:** `@syncfusion/ej2-lineargauge`
- **Package:** `@syncfusion/ej2-lineargauge`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Axis and Scale Properties](#axis-and-scale-properties)
- [Annotation Properties](#annotation-properties)
- [Title and Tooltip Properties](#title-and-tooltip-properties)
- [Export and Print Properties](#export-and-print-properties)
- [Accessibility Properties](#accessibility-properties)
- [Internationalization Properties](#internationalization-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [LinearGauge()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/)
Creates a new instance of the Linear Gauge component.

---

## Core Configuration Properties

- **[`orientation`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#orientation)** (Orientation): Specifies the orientation of the rendering of the linear gauge. **Default:** Vertical
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#theme)** (LinearGaugeTheme): Sets and gets the theme styles supported for linear gauge. When the theme is set, the styles associated with the theme will be set in the gauge. **Default:** Material
- **[`background`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#background)** (string): Specifies the background color of the gauge. This property accepts value in hex code, rgba string as a valid CSS color string. **Default:** 'transparent'
- **[`edgeLabelPlacement`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#edgelabelplacement)** (LabelPlacement): Specifies the placement of the label in linear gauge. **Default:** None
- **[`allowMargin`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#allowmargin)** (boolean): Enables or disables the ability of the gauge to be rendered to the complete width. The left, right, top and bottom spacing will not be considered in the gauge when this property is disabled. **Default:** true
- **[`animationDuration`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#animationduration)** (number): Defines the duration of the loading animation in linear gauge, which animates the axis line, ticks, axis labels, ranges, pointers, and annotations. The value of this property will be in milliseconds. **Default:** 0

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#height)** (string): Specifies the height of the linear gauge as a string in order to provide input as both like '100px' or '100%'. **Default:** null
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#width)** (string): Specifies the width of the linear gauge as a string in order to provide input as both like '100px' or '100%'. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/marginmodel)** (MarginModel): Specifies the options to customize the margins of the linear gauge.
- **[`border`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/bordermodel)** (BorderModel): Specifies the options for customizing the style properties of the border for linear gauge.
- **[`container`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/containermodel)** (ContainerModel): Specifies the options for customizing the container in linear gauge.

---

## Axis and Scale Properties

- **[`axes`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/axismodel)** (AxisModel[]): Specifies the options for customizing the axis in linear gauge.
- **[`rangePalettes`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#rangepalettes)** (string[]): Specifies the color palette for axis ranges in linear gauge. **Default:** []

---

## Annotation Properties

- **[`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/annotationmodel)** (AnnotationModel[]): Specifies the options for customizing the annotation of linear gauge.

---

## Title and Tooltip Properties

- **[`title`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#title)** (string): Specifies the title for linear gauge.
- **[`titleStyle`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/fontmodel)** (FontModel): Specifies the options for customizing the appearance of title for linear gauge.
- **[`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/tooltipsettingsmodel)** (TooltipSettingsModel): Specifies the options for customizing the tooltip in linear gauge.

---

## Export and Print Properties

- **[`allowImageExport`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#allowimageexport)** (boolean): Enables or disables the export to image functionality in linear gauge. **Default:** false
- **[`allowPdfExport`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#allowpdfexport)** (boolean): Enables or disables the export to PDF functionality in linear gauge. **Default:** false
- **[`allowPrint`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#allowprint)** (boolean): Enables or disables the print functionality in linear gauge. **Default:** false

---

## Accessibility Properties

- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#enablertl)** (boolean): Enable or disable rendering component in right to left direction. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`tabIndex`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#tabindex)** (number): Specifies the tab index value for the linear gauge. **Default:** 0
- **[`description`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#description)** (string): Sets and gets the information about gauge for assistive technology. **Default:** null

---

## Internationalization Properties

- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`format`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#format)** (string): Specifies the format to apply for internationalization in linear gauge. **Default:** null
- **[`useGroupingSeparator`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#usegroupingseparator)** (boolean): Enables or disables a grouping separator should be used for a number. **Default:** false

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#destroy)
This method destroys the linear gauge. This method removes the events associated with the linear gauge and disposes the objects created for rendering and updating the linear gauge.

**Returns:** void

### [export()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#export)
This method handles the export functionality for linear gauge.

**Parameters:**
- `type` (ExportType): Specifies the extension type of the exported document
- `fileName` (string): Specifies file name for exporting the rendered Linear Gauge
- `orientation` (optional) (PdfPageOrientation): Specifies the orientation of the PDF document
- `allowDownload` (optional) (boolean): Specifies whether the exported file should be downloaded or not

**Returns:** Promise

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [print()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#print)
This method handles the print functionality for linear gauge.

**Parameters:**
- `id` (optional) (string[] | string | Element): Specifies the element to print the linear gauge

**Returns:** void

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [setAnnotationValue()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#setannotationvalue)
This method is used to set the annotation value in the linear gauge.

**Parameters:**
- `annotationIndex` (number): Specifies the index value for the annotation in linear gauge
- `content` (string | Function): Specifies the content for the annotation in linear gauge
- `axisValue` (optional) (number): Specifies the axis value to which the annotation must be positioned

**Returns:** void

### [setPointerValue()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#setpointervalue)
This method is used to set the pointer value in the linear gauge.

**Parameters:**
- `axisIndex` (number): Specifies the index of the axis
- `pointerIndex` (number): Specifies the index of the pointer
- `value` (number): Specifies the pointer value

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [animationComplete](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ianimationcompleteeventargs)
Triggers after completing the animation for pointer.

### [annotationRender](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iannotationrendereventargs)
Triggers before each annotation gets rendered.

### [axisLabelRender](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iaxislabelrendereventargs)
Triggers before each axis label gets rendered.

### [beforePrint](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iprinteventargs)
Triggers before the print functionality gets started.

### [dragEnd](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs)
Triggers after the pointer is dragged.

### [dragMove](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs)
Triggers while dragging the pointers.

### [dragStart](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs)
Triggers before the pointer is dragged.

### [gaugeMouseDown](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/imouseeventargs)
Triggers when performing the mouse down operation on gauge area.

### [gaugeMouseLeave](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/imouseeventargs)
Triggers when performing the mouse leave operation from the gauge area.

### [gaugeMouseMove](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/imouseeventargs)
Triggers when performing the mouse move operation on gauge area.

### [gaugeMouseUp](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/imouseeventargs)
Triggers when performing mouse up operation on gauge area.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iloadeventargs)
Triggers before the gauge gets rendered.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iloadedeventargs)
Triggers after the gauge gets rendered.

### [resized](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iresizeeventargs)
Triggers to notify the resize of the linear gauge when the window is resized.

### [tooltipRender](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/itooltiprendereventargs)
Triggers before the tooltip get rendered.

### [valueChange](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ivaluechangeeventargs)
Triggers while changing the value of the pointer by UI interaction.

---

## Related Settings Classes

### Axis Configuration
- **[`AxisModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/axismodel)** - Axis configuration with labels, ticks, ranges, and pointers
- **[`LabelModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/labelmodel)** - Axis label customization
- **[`TickModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/tickmodel)** - Tick marks configuration
- **[`RangeModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/rangemodel)** - Range configuration for colored zones
- **[`PointerModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/pointermodel)** - Pointer configuration (bar, marker, etc.)

### Visual and Layout
- **[`MarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/marginmodel)** - Margin configuration
- **[`BorderModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/bordermodel)** - Border customization
- **[`ContainerModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/containermodel)** - Background container configuration

### Annotations and Tooltips
- **[`AnnotationModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/annotationmodel)** - Annotation configuration
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/tooltipsettingsmodel)** - Tooltip configuration

### Title and Text
- **[`FontModel`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/fontmodel)** - Font configuration for title and labels

### Event Arguments
- **[`IAnimationCompleteEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ianimationcompleteeventargs)** - Animation complete event arguments
- **[`IAnnotationRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iannotationrendereventargs)** - Annotation render event arguments
- **[`IAxisLabelRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iaxislabelrendereventargs)** - Axis label render event arguments
- **[`IPrintEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iprinteventargs)** - Print event arguments
- **[`IPointerDragEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs)** - Pointer drag event arguments
- **[`IMouseEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/imouseeventargs)** - Mouse event arguments
- **[`ILoadEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iloadeventargs)** - Load event arguments
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iloadedeventargs)** - Loaded event arguments
- **[`IResizeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/iresizeeventargs)** - Resize event arguments
- **[`ITooltipRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/itooltiprendereventargs)** - Tooltip render event arguments
- **[`IValueChangeEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ivaluechangeeventargs)** - Value change event arguments

### Enumerations
- **[`Orientation`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/orientation)** - Gauge orientation (Vertical, Horizontal)
- **[`LinearGaugeTheme`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/lineargaugetheme)** - Theme enumeration (Material, Bootstrap, Fabric, etc.)
- **[`LabelPlacement`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/labelplacement)** - Edge label placement (None, Shift, Hide)
- **[`ExportType`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/exporttype)** - Export type enumeration (PNG, JPEG, SVG, PDF)

---

## Common Usage Patterns

- Configure gauge orientation using [`orientation`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#orientation) property (Vertical or Horizontal).
- Define axes using [`axes`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/axismodel) property with range, ticks, and pointers configurations.
- Customize gauge appearance using [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#theme) property to apply predefined color schemes.
- Set gauge size using [`height`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#height) and [`width`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#width) properties as percentage or pixel values.
- Configure pointers using [`setPointerValue()`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#setpointervalue) method to dynamically update values.
- Add contextual labels using [`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/annotationmodel) property for highlighting specific values.
- Enable tooltips using [`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/tooltipsettingsmodel) property for point value displays.
- Configure color ranges using [`rangePalettes`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#rangepalettes) or individual axis ranges within [`axes`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/axismodel).
- Handle pointer drag interactions using [`dragStart`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs), [`dragMove`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs), and [`dragEnd`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ipointerdrageventargs) events.
- Export gauge using [`export()`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#export) method to image or PDF formats, or print via [`print()`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#print) method.

---

## Notes

- The Linear Gauge component is designed for visualizing data in linear scale, commonly used for thermometers, progress bars, and measurement displays.
- The [`orientation`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#orientation) property determines if the gauge is rendered **Vertical** (default) or **Horizontal**.
- The [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#theme) property supports predefined themes; **Material** is the default theme.
- The [`allowMargin`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#allowmargin) property controls whether spacing (true) or full container rendering (false) is used.
- The [`background`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#background) property accepts CSS color formats and defaults to **'transparent'**.
- The [`animationDuration`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#animationduration) property controls the loading animation in milliseconds; **0** means no animation.
- Use [`edgeLabelPlacement`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#edgelabelplacement) to manage how edge labels are displayed (**None**, **Shift**, or **Hide**).
- Pointer values can be dynamically updated using [`setPointerValue()`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#setpointervalue) method or changed via UI drag interaction triggering the [`valueChange`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/ivaluechangeeventargs) event.
- The [`description`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#description) property provides accessibility information for assistive technologies.
- Format numbers using [`format`](https://ej2.syncfusion.com/javascript/documentation/api/linear-gauge/#format) property (e.g., 'c0' for currency, 'p0' for percentage) with internationalization support.
