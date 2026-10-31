# Progress Bar API Reference (JavaScript)

Complete API reference for the Syncfusion JavaScript Progress Bar ([`@syncfusion/ej2-progressbar.ProgressBar`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/)) component.

- **Base API Documentation:** [ProgressBar](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/)
- **Module:** `@syncfusion/ej2-progressbar`
- **Package:** `@syncfusion/ej2-progressbar`

- [Constructor](#constructor)
- [Core Configuration Properties](#core-configuration-properties)
- [Value and Range Properties](#value-and-range-properties)
- [Layout and Sizing Properties](#layout-and-sizing-properties)
- [Visual Styling Properties](#visual-styling-properties)
- [Progress Bar Configuration Properties](#progress-bar-configuration-properties)
- [Label and Tooltip Properties](#label-and-tooltip-properties)
- [Module Properties](#module-properties)
- [Methods](#methods)
- [Events](#events)
- [Related Settings Classes](#related-settings-classes)
- [Common Usage Patterns](#common-usage-patterns)
- [Notes](#notes)

---

## Constructor

### [ProgressBar()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/)
Creates a new instance of the Progress Bar component.

---

## Core Configuration Properties

- **[`type`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#type)** (ProgressType): Type of the progress bar (Linear or Circular). **Default:** Linear
- **[`role`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#role)** (ModeType): Modes of linear progress (Success, Info, Warning, Danger, etc.). **Default:** null
- **[`theme`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#theme)** (ProgressTheme): Theme style for progress bar. **Default:** Fabric
- **[`enableRtl`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#enablertl)** (boolean): Enable or disable right to left rendering. **Default:** false
- **[`enablePersistence`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#enablepersistence)** (boolean): Enable or disable persisting component's state between page reloads. **Default:** false
- **[`locale`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#locale)** (string): Overrides the global culture and localization value for this component. Default global culture is 'en-US'. **Default:** ''
- **[`isActive`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isactive)** (boolean): Active state of the progress bar. **Default:** false
- **[`isIndeterminate`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isindeterminate)** (boolean): Indeterminate progress state. **Default:** false

---

## Value and Range Properties

- **[`value`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#value)** (number): Progress value. **Default:** null
- **[`minimum`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#minimum)** (number): Minimum progress value. **Default:** 0
- **[`maximum`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#maximum)** (number): Maximum progress value. **Default:** 100
- **[`secondaryProgress`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#secondaryprogress)** (number): Secondary progress value. **Default:** null
- **[`rangeColors`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/rangecolormodel)** (RangeColorModel[]): RangeColor configurations in Progressbar for different value ranges.

---

## Layout and Sizing Properties

- **[`height`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#height)** (string): Height of the progress bar. **Default:** null
- **[`width`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#width)** (string): Width of the progress bar. **Default:** null
- **[`margin`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/marginmodel)** (MarginModel): Margin size for progress bar.
- **[`radius`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#radius)** (string): Track radius for circular progress bar. **Default:** '100%'
- **[`innerRadius`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#innerradius)** (string): Progress radius for circular progress bar. **Default:** '100%'
- **[`startAngle`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#startangle)** (number): Start angle for circular progress bar. **Default:** 0
- **[`endAngle`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#endangle)** (number): End angle for circular progress bar. **Default:** 0

---

## Visual Styling Properties

- **[`progressColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#progresscolor)** (string): Progress bar color. **Default:** null
- **[`trackColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#trackcolor)** (string): Track color of the progress bar. **Default:** null
- **[`progressThickness`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#progressthickness)** (number): Progress bar thickness. **Default:** 0
- **[`trackThickness`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#trackthickness)** (number): Track thickness. **Default:** 0
- **[`secondaryProgressColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#secondaryprogresscolor)** (string): Defines color for the secondary progress bar. By default, it takes the primary progress bar color with half of the opacity. **Default:** ''
- **[`secondaryProgressThickness`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#secondaryprogressthickness)** (number): Defines thickness for the secondary progress bar. By default, it takes the primary progress bar thickness. **Default:** null
- **[`isGradient`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isgradient)** (boolean): Enable gradient effect. **Default:** false
- **[`isStriped`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isstriped)** (boolean): Enable striped pattern. **Default:** false
- **[`cornerRadius`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/cornertype)** (CornerType): Corner radius type for progress bar. **Default:** Auto

---

## Progress Bar Configuration Properties

- **[`enablePieProgress`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#enablepieprogress)** (boolean): Enable pie view for circular progress bar. **Default:** false
- **[`enableProgressSegments`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#enableprogresssegments)** (boolean): Disable the trackSegment. **Default:** false
- **[`segmentCount`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#segmentcount)** (number): Segment count of the progress bar. **Default:** 1
- **[`segmentColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#segmentcolor)** (string[]): Segment color array. **Default:** null
- **[`gapWidth`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#gapwidth)** (number): Gap width of the segment. **Default:** null
- **[`animation`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/animationmodel)** (AnimationModel): Animation configuration for the progress bar.

---

## Label and Tooltip Properties

- **[`showProgressValue`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#showprogressvalue)** (boolean): Show label of the progress bar. **Default:** false
- **[`labelOnTrack`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#labelontrack)** (boolean): Show label on the track. **Default:** true
- **[`labelStyle`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/fontmodel)** (FontModel): Option for customizing the label text.
- **[`annotations`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progressannotationsettingsmodel)** (ProgressAnnotationSettingsModel[]): The configuration for annotation in Progressbar.
- **[`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/tooltipsettingsmodel)** (TooltipSettingsModel): Options for customizing the tooltip of progressbar.

---

## Module Properties

- **[`progressAnnotationModule`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progressannotation)** (ProgressAnnotation): ProgressAnnotation module to use annotations.
- **[`progressTooltipModule`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progresstooltip)** (ProgressTooltip): ProgressTooltip module to use tooltip.

---

## Methods

### [addEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#addeventlistener)
Adds the handler to the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event
- `handler` (Function): Specifies the call to run when the event occurs

**Returns:** void

### [appendTo()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#appendto)
Appends the control within the given HTML element.

**Parameters:**
- `selector` (optional) (string | HTMLElement): Target element where control needs to be appended

**Returns:** void

### [dataBind()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#databind)
When invoked, applies the pending property changes immediately to the component.

**Returns:** void

### [destroy()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#destroy)
To destroy the widget.

**Returns:** void

### [getRootElement()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#getrootelement)
Returns the root element of the component.

**Returns:** HTMLElement

### [refresh()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#refresh)
Applies all the pending property changes and render the component again.

**Returns:** void

### [removeEventListener()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#removeeventlistener)
Removes the handler from the given event listener.

**Parameters:**
- `eventName` (string): A String that specifies the name of the event to remove
- `handler` (Function): Specifies the function to remove

**Returns:** void

### [Inject()](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#inject)
Dynamically injects the required modules to the component.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

---

## Events

### [animationComplete](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iprogressvalueeventargs)
Triggers after the animation completed.

### [load](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iloadedeventargs)
Triggers before the progress bar get rendered.

### [loaded](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iloadedeventargs)
Triggers after the progress bar has loaded.

### [mouseClick](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/imouseeventargs)
Trigger after mouse click.

### [mouseDown](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/imouseeventargs)
Trigger after mouse down.

### [mouseLeave](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/imouseeventargs)
Trigger after mouse leave.

### [mouseMove](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/imouseeventargs)
Trigger after mouse move.

### [mouseUp](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/imouseeventargs)
Trigger after mouse up.

### [progressCompleted](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iprogressvalueeventargs)
Triggers after the progress value completed.

### [textRender](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/itextrendereventargs)
Triggers before the progress bar label renders.

### [tooltipRender](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/itooltiprendereventargs)
Triggers before the tooltip for series is rendered.

### [valueChanged](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iprogressvalueeventargs)
Triggers after the value has changed.

---

## Related Settings Classes

### Animation and Visual
- **[`AnimationModel`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/animationmodel)** - Animation configuration settings
- **[`CornerType`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/cornertype)** - Corner radius type enumeration (Auto, Square, Round, etc.)
- **[`RangeColorModel`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/rangecolormodel)** - Range color configuration for different value ranges

### Annotations and Tooltips
- **[`ProgressAnnotationSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progressannotationsettingsmodel)** - Annotation configuration
- **[`ProgressAnnotation`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progressannotation)** - ProgressAnnotation module
- **[`TooltipSettingsModel`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/tooltipsettingsmodel)** - Tooltip configuration
- **[`ProgressTooltip`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progresstooltip)** - ProgressTooltip module

### Text and Labels
- **[`FontModel`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/fontmodel)** - Font configuration for labels

### Layout
- **[`MarginModel`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/marginmodel)** - Margin configuration

### Event Arguments
- **[`IProgressValueEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iprogressvalueeventargs)** - Progress value event arguments
- **[`ILoadedEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/iloadedeventargs)** - Load/loaded event arguments
- **[`IMouseEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/imouseeventargs)** - Mouse event arguments
- **[`ITextRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/itextrendereventargs)** - Text render event arguments
- **[`ITooltipRenderEventArgs`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/itooltiprendereventargs)** - Tooltip render event arguments

### Enumerations
- **[`ProgressType`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progresstype)** - Progress bar type enumeration (Linear, Circular)
- **[`ModeType`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/modetype)** - Linear progress mode enumeration (Success, Info, Warning, Danger, etc.)
- **[`ProgressTheme`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progresstheme)** - Theme enumeration (Material, Bootstrap, Fabric, etc.)

---

## Common Usage Patterns

- Set progress bar type using [`type`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#type) property (Linear or Circular).
- Configure progress value using [`value`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#value), [`minimum`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#minimum), and [`maximum`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#maximum) properties.
- Customize colors using [`progressColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#progresscolor) and [`trackColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#trackcolor) properties.
- Display progress value using [`showProgressValue`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#showprogressvalue) property to show the percentage.
- Enable striped pattern using [`isStriped`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isstriped) property for visual emphasis.
- Enable gradient effect using [`isGradient`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isgradient) property for color transitions.
- Configure circular progress with [`startAngle`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#startangle) and [`endAngle`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#endangle) for custom arc shapes.
- Show indeterminate progress using [`isIndeterminate`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isindeterminate) for loading states.
- Add tooltips using [`tooltip`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/tooltipsettingsmodel) property with [`progressTooltipModule`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/progresstooltip) module.
- Configure progress segments using [`segmentCount`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#segmentcount) and [`segmentColor`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#segmentcolor) for multi-part progress display.

---

## Notes

- The Progress Bar component supports two types: **Linear** (default) and **Circular** progress indicators.
- The [`theme`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#theme) property provides predefined color schemes; **Fabric** is the default theme.
- The [`role`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#role) property applies semantic colors based on status: Success, Info, Warning, Danger.
- The [`isIndeterminate`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#isindeterminate) property is useful for loading states where progress duration is unknown.
- The [`secondaryProgress`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#secondaryprogress) property allows displaying a secondary progress indicator behind the primary one.
- The [`enablePieProgress`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#enablepieprogress) property displays circular progress as a pie/donut view.
- The [`cornerRadius`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/cornertype) property controls the shape of progress bar corners (**Auto**, **Square**, **Round**, etc.).
- Use [`rangeColors`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/rangecolormodel) to apply different colors based on progress value ranges.
- The [`animation`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/animationmodel) property provides smooth transition effects when value changes occur.
- The [`gapWidth`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#gapwidth) property is used with [`segmentCount`](https://ej2.syncfusion.com/javascript/documentation/api/progressbar/#segmentcount) to create segmented progress bars with gaps between segments.
