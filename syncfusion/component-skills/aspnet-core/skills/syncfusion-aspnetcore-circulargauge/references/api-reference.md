# CircularGauge API Reference

Complete API reference for the Syncfusion ASP.NET Core Circular Gauge component (`Syncfusion.EJ2.CircularGauge.CircularGauge`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html
- **Namespace:** `Syncfusion.EJ2.CircularGauge`
- **Assembly:** `Syncfusion.EJ2.dll`
## Table of Contents

- [CircularGauge Class](#circulargauge-class)
  - [Constructor](#constructor)
  - [Core Properties](#core-properties)
    - [Basic Configuration Properties](#basic-configuration-properties)
    - [Dimension Properties](#dimension-properties)
    - [Appearance Properties](#appearance-properties)
    - [Layout & Positioning Properties](#layout--positioning-properties)
    - [Interaction Properties](#interaction-properties)
    - [State & Persistence Properties](#state--persistence-properties)
    - [Localization Properties](#localization-properties)
    - [Export & Print Properties](#export--print-properties)
    - [HTML Attributes](#html-attributes)
- [Events](#events)
- [Child Configuration APIs](#child-configuration-apis)
- [Complete Class Reference](#complete-class-reference)
  - [Axis Configuration Classes](#axis-configuration-classes)
  - [Pointer Configuration Classes](#pointer-configuration-classes)
  - [Range Configuration Classes](#range-configuration-classes)
  - [Annotation Configuration Classes](#annotation-configuration-classes)
  - [Layout & Styling Classes](#layout--styling-classes)
  - [Gradient & Advanced Classes](#gradient--advanced-classes)
  - [Legend & Tooltip Classes](#legend--tooltip-classes)
- [Enumerations](#enumerations)
  - [GaugeTheme](#gaugetheme-enum)
  - [GaugeDirection](#gaugedirection-enum)
  - [GaugeShape](#gaugeshape-enum)
  - [PointerType](#pointertype-enum)
  - [Position](#position-enum)
  - [Alignment](#alignment-enum)
  - [LegendPosition](#legendposition-enum)
- [Namespace and Assembly](#namespace-and-assembly)
- [Additional Resources](#additional-resources)
- [Important Notes](#important-notes)

---

## CircularGauge Class

The main circular gauge component class for rendering numeric values on circular scales with axes, pointers, ranges, and annotations.

**Official API Reference:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html

**Namespace:** `Syncfusion.EJ2.CircularGauge`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Inheritance:** `System.Object` → `Syncfusion.EJ2.EJTagHelper` → `CircularGauge`

---

### Constructor

```csharp
public CircularGauge()
```

Creates a new instance of the CircularGauge component.

---

## Core Properties

### Basic Configuration Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Title` | `string` | "" | Title of the circular gauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Title) |
| `Description` | `string` | null | Assistive technology description text | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Description) |
| `Background` | `string` | null | Gauge background color (hex, rgba, CSS color) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Background) |
| `Theme` | `GaugeTheme` | Material | Visual theme (Material, Bootstrap, Fabric, etc.) | [GaugeTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.GaugeTheme.html) |

### Dimension Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Width` | `string` | null | Gauge width ("100px", "100%", etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Width) |
| `Height` | `string` | null | Gauge height ("100px", "100%", etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Height) |
| `CenterX` | `string` | null | Horizontal center position of gauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_CenterX) |
| `CenterY` | `string` | null | Vertical center position of gauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_CenterY) |
| `MoveToCenter` | `bool` | false | Auto-position half/quarter circle at center | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_MoveToCenter) |

### Appearance Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Border` | `CircularGaugeBorder` | null | Gauge border styling | [CircularGaugeBorder](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeBorder.html) |
| `TitleStyle` | `CircularGaugeFont` | null | Title font and styling | [CircularGaugeFont](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeFont.html) |

### Layout & Positioning Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Margin` | `CircularGaugeMargin` | null | Left, right, top, bottom margins | [CircularGaugeMargin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeMargin.html) |
| `AllowMargin` | `bool` | true | Allow margin configuration | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AllowMargin) |

### Interaction Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `EnablePointerDrag` | `bool` | false | Enable pointer drag functionality | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_EnablePointerDrag) |
| `EnableRangeDrag` | `bool` | false | Enable range drag functionality | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_EnableRangeDrag) |
| `Tooltip` | `CircularGaugeTooltipSettings` | null | Tooltip configuration and styling | [CircularGaugeTooltipSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeTooltipSettings.html) |

### State & Persistence Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `AnimationDuration` | `double` | 0 | Pointer animation duration (milliseconds) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AnimationDuration) |
| `EnablePersistence` | `bool` | false | Persist component state between page reloads | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_EnablePersistence) |
| `TabIndex` | `double` | 0 | Tab index value for keyboard navigation | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_TabIndex) |

### Localization Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Locale` | `string` | "en-US" | Culture/locale for number and text formatting | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Locale) |
| `UseGroupingSeparator` | `bool` | false | Enable thousands separator for numbers | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_UseGroupingSeparator) |
| `EnableRtl` | `bool` | false | Enable right-to-left rendering | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_EnableRtl) |

### Export & Print Properties

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `AllowImageExport` | `bool` | false | Enable image export (PNG, JPEG, SVG) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AllowImageExport) |
| `AllowPdfExport` | `bool` | false | Enable PDF export | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AllowPdfExport) |
| `AllowPrint` | `bool` | false | Enable print functionality | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AllowPrint) |

### Configuration Collections

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `Axes` | `List<CircularGaugeAxis>` | null | Axes collection for gauge scales | [CircularGaugeAxis](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAxis.html) |
| `Annotations` | `List<CircularGaugeAnnotation>` | null | Annotations collection | [CircularGaugeAnnotation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotation.html) |
| `LegendSettings` | `CircularGaugeLegendSettings` | null | Legend configuration | [CircularGaugeLegendSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLegendSettings.html) |

### HTML Attributes

| Property | Type | Default | Description | API Link |
|----------|------|---------|-------------|----------|
| `HtmlAttributes` | `object` | null | Additional HTML attributes (title, name, etc.) | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_HtmlAttributes) |

---

## Events

| Event | Type | Triggered When | Handler Signature | API Link |
|-------|------|---|----------|----------|
| `Load` | `string` | Before the gauge is loaded | `function(args: ICircularGaugeEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Load) |
| `Loaded` | `string` | After the gauge is loaded | `function(args: ICircularGaugeEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Loaded) |
| `Resized` | `string` | When window is resized | `function(args: IResizeEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_Resized) |
| `AnimationComplete` | `string` | After pointer animation completes | `function(args: IAnimationCompleteEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AnimationComplete) |
| `AxisLabelRender` | `string` | Before each axis label is rendered | `function(args: IAxisLabelRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AxisLabelRender) |
| `AnnotationRender` | `string` | Before each annotation is rendered | `function(args: IAnnotationRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_AnnotationRender) |
| `LegendRender` | `string` | Before each legend item is rendered | `function(args: ILegendRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_LegendRender) |
| `TooltipRender` | `string` | Before tooltip is rendered | `function(args: ITooltipRenderEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_TooltipRender) |
| `GaugeMouseDown` | `string` | When mouse button is pressed on gauge | `function(args: IGaugeMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_GaugeMouseDown) |
| `GaugeMouseUp` | `string` | When mouse button is released on gauge | `function(args: IGaugeMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_GaugeMouseUp) |
| `GaugeMouseMove` | `string` | When cursor hovers over gauge | `function(args: IGaugeMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_GaugeMouseMove) |
| `GaugeMouseLeave` | `string` | When cursor leaves gauge area | `function(args: IGaugeMouseEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_GaugeMouseLeave) |
| `DragStart` | `string` | Before pointer drag begins | `function(args: IDragStartEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_DragStart) |
| `DragMove` | `string` | While dragging pointer | `function(args: IDragMoveEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_DragMove) |
| `DragEnd` | `string` | After pointer drag completes | `function(args: IDragEndEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_DragEnd) |
| `RadiusCalculate` | `string` | Before radius is calculated | `function(args: IRadiusCalculateEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_RadiusCalculate) |
| `BeforePrint` | `string` | Before print starts | `function(args: IPrintEventArgs)` | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html#Syncfusion_EJ2_CircularGauge_CircularGauge_BeforePrint) |

---

## Child Configuration APIs

### Axis Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeAxis` | `CircularGaugeAxisBuilder` | Individual axis configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAxis.html) |
| `CircularGaugeAxes` | N/A | Collection of axes | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAxes.html) |
| `CircularGaugeLabel` | `CircularGaugeLabelBuilder` | Axis label configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLabel.html) |
| `CircularGaugeTick` | `CircularGaugeTickBuilder` | Axis tick configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeTick.html) |
| `AxisMinorTicksAxes` | N/A | Minor ticks configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.AxisMinorTicksAxes.html) |

### Pointer Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugePointer` | `CircularGaugePointerBuilder` | Individual pointer configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugePointer.html) |
| `CircularGaugePointers` | N/A | Collection of pointers | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugePointers.html) |
| `CircularGaugeCap` | `CircularGaugeCapBuilder` | Pointer cap configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeCap.html) |
| `CircularGaugeNeedleTail` | `CircularGaugeNeedleTailBuilder` | Needle tail configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeNeedleTail.html) |
| `PointerLinearGradientPointers` | N/A | Linear gradient for pointers | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.PointerLinearGradientPointers.html) |
| `PointerRadialGradientPointers` | N/A | Radial gradient for pointers | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.PointerRadialGradientPointers.html) |

### Range Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeRange` | `CircularGaugeRangeBuilder` | Individual range configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRange.html) |
| `CircularGaugeRanges` | N/A | Collection of ranges | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRanges.html) |
| `CircularGaugeRangeTooltip` | `CircularGaugeRangeTooltipBuilder` | Range tooltip configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRangeTooltip.html) |

### Annotation Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeAnnotation` | `CircularGaugeAnnotationBuilder` | Individual annotation configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotation.html) |
| `CircularGaugeAnnotations` | N/A | Collection of annotations | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotations.html) |
| `CircularGaugeAnnotationTooltip` | `CircularGaugeAnnotationTooltipBuilder` | Annotation tooltip configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotationTooltip.html) |

### Layout & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeMargin` | `CircularGaugeMarginBuilder` | Margin configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeMargin.html) |
| `CircularGaugeBorder` | `CircularGaugeBorderBuilder` | Border styling | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeBorder.html) |
| `CircularGaugeFont` | `CircularGaugeFontBuilder` | Font properties | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeFont.html) |

### Gradient & Advanced Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeLinearGradient` | `CircularGaugeLinearGradientBuilder` | Linear gradient configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLinearGradient.html) |
| `CircularGaugeRadialGradient` | `CircularGaugeRadialGradientBuilder` | Radial gradient configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRadialGradient.html) |
| `CircularGaugeColorStop` | `CircularGaugeColorStopBuilder` | Gradient color stop | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeColorStop.html) |
| `CircularGaugeGradientPosition` | `CircularGaugeGradientPositionBuilder` | Gradient position settings | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeGradientPosition.html) |
| `CircularGaugeAnimation` | `CircularGaugeAnimationBuilder` | Animation configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnimation.html) |

### Legend & Tooltip Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeLegendSettings` | `CircularGaugeLegendSettingsBuilder` | Legend configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLegendSettings.html) |
| `CircularGaugeTooltipSettings` | `CircularGaugeTooltipSettingsBuilder` | Tooltip configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeTooltipSettings.html) |

---

## Complete Class Reference

### Axis Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeAxis` | `CircularGaugeAxisBuilder` | Axis scale configuration (min, max, angles) | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAxis.html) |
| `CircularGaugeAxes` | N/A | Collection of axes for multi-scale gauges | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAxes.html) |
| `CircularGaugeLabel` | `CircularGaugeLabelBuilder` | Axis label styling and formatting | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLabel.html) |
| `CircularGaugeTick` | `CircularGaugeTickBuilder` | Tick marks configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeTick.html) |
| `AxisMinorTicksAxes` | N/A | Minor tick configuration for axes | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.AxisMinorTicksAxes.html) |

### Pointer Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugePointer` | `CircularGaugePointerBuilder` | Individual pointer settings (needle, marker, bar) | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugePointer.html) |
| `CircularGaugePointers` | N/A | Collection of pointers on an axis | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugePointers.html) |
| `CircularGaugeCap` | `CircularGaugeCapBuilder` | Pointer cap/knob styling | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeCap.html) |
| `CircularGaugeNeedleTail` | `CircularGaugeNeedleTailBuilder` | Needle tail configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeNeedleTail.html) |

### Range Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeRange` | `CircularGaugeRangeBuilder` | Individual range zone configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRange.html) |
| `CircularGaugeRanges` | N/A | Collection of ranges for axis | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRanges.html) |
| `CircularGaugeRangeTooltip` | `CircularGaugeRangeTooltipBuilder` | Range hover tooltip | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRangeTooltip.html) |

### Annotation Configuration Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeAnnotation` | `CircularGaugeAnnotationBuilder` | Custom text/HTML content placement | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotation.html) |
| `CircularGaugeAnnotations` | N/A | Collection of annotations | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotations.html) |
| `CircularGaugeAnnotationTooltip` | `CircularGaugeAnnotationTooltipBuilder` | Annotation tooltip | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnnotationTooltip.html) |

### Layout & Styling Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeMargin` | `CircularGaugeMarginBuilder` | Gauge margin settings | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeMargin.html) |
| `CircularGaugeBorder` | `CircularGaugeBorderBuilder` | Gauge border styling | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeBorder.html) |
| `CircularGaugeFont` | `CircularGaugeFontBuilder` | Font properties and styling | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeFont.html) |

### Gradient & Advanced Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeLinearGradient` | `CircularGaugeLinearGradientBuilder` | Linear gradient for pointers/ranges | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLinearGradient.html) |
| `CircularGaugeRadialGradient` | `CircularGaugeRadialGradientBuilder` | Radial gradient for pointers/ranges | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeRadialGradient.html) |
| `CircularGaugeColorStop` | `CircularGaugeColorStopBuilder` | Gradient color stop configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeColorStop.html) |
| `CircularGaugeGradientPosition` | `CircularGaugeGradientPositionBuilder` | Gradient position and offset | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeGradientPosition.html) |
| `CircularGaugeAnimation` | `CircularGaugeAnimationBuilder` | Pointer animation settings | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeAnimation.html) |

### Legend & Tooltip Classes

| Class | Builder Class | Purpose | Namespace | API Link |
|-------|---------------|---------|-----------|----------|
| `CircularGaugeLegendSettings` | `CircularGaugeLegendSettingsBuilder` | Legend display configuration | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeLegendSettings.html) |
| `CircularGaugeTooltipSettings` | `CircularGaugeTooltipSettingsBuilder` | Tooltip appearance and behavior | Syncfusion.EJ2.CircularGauge | [Reference](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGaugeTooltipSettings.html) |

---

## Enumerations

### GaugeTheme Enum

**API Reference:** [GaugeTheme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.GaugeTheme.html)

Available visual themes for gauge styling:

- `Material` (default)
- `Fabric`
- `Bootstrap`
- `Bootstrap5`
- `BootstrapDark`
- `Fluent`
- `FluentDark`
- `Tailwind`
- `TailwindDark`
- `HighContrast`

### GaugeDirection Enum

**API Reference:** [GaugeDirection](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.GaugeDirection.html)

Axis direction/progression:

- `ClockWise` - Clockwise direction (default)
- `CounterClockWise` - Counter-clockwise direction

### GaugeShape Enum

**API Reference:** [GaugeShape](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.GaugeShape.html)

Pointer types:

- `Circle` (default)
- `Rectangle`
- `Triangle`
- `Diamond`
- `Polygon`
- `Wedge`

### PointerType Enum

**API Reference:** [PointerType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.PointerType.html)

Types of pointers:

- `Needle` - Needle pointer (default)
- `Marker` - Marker pointer
- `RangeBar` - Range bar pointer

### Position Enum

**API Reference:** [Position](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.Position.html)

Element positioning:

- `Inside` - Inside the gauge
- `Outside` - Outside the gauge

### Alignment Enum

**API Reference:** [Alignment](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.Alignment.html)

Text alignment:

- `Center` (default)
- `Far`
- `Near`

### LegendPosition Enum

**API Reference:** [LegendPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.LegendPosition.html)

Legend placement:

- `Top` - Display at top
- `Bottom` - Display at bottom (default)
- `Left` - Display on left side
- `Right` - Display on right side
- `Custom` - Custom position

---

## Namespace and Assembly

**Namespace:** `Syncfusion.EJ2.CircularGauge`

**Assembly:** `Syncfusion.EJ2.dll`

**Version:** Compatible with Syncfusion EJ2 ASP.NET Core (v18.4.0 and later)

### Using Statement

```csharp
using Syncfusion.EJ2.CircularGauge;
```

### NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.2.7
```

---

## Additional Resources

- [Official Documentation](https://ej2.syncfusion.com/aspnetcore/documentation/circular-gauge/gauge-getting-started/)
- [Live Demos](https://ej2.syncfusion.com/aspnetcore/circular-gauge/default/)
- [GitHub Examples](https://github.com/SyncfusionExamples/ASP-NET-Core-Getting-Started-Examples/tree/main/CircularGauge)
- [Axes Configuration Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-gauge/gauge-axes/)
- [Pointers Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-gauge/gauge-pointers/)
- [Ranges Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-gauge/gauge-ranges/)
- [Annotations Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-gauge/gauge-annotations/)
- [User Interactions Guide](https://ej2.syncfusion.com/aspnetcore/documentation/circular-gauge/gauge-user-interaction/)
- [API Documentation - CircularGauge](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.CircularGauge.CircularGauge.html)

---

## Important Notes

- **Pointer Types:** Circular Gauge supports three pointer types: Needle (default), Marker, and RangeBar for displaying values.
- **Multiple Axes:** You can create gauges with multiple axes for comparing different scales simultaneously.
- **Range Zones:** Use ranges to visually categorize gauge areas (e.g., safe, warning, danger zones).
- **Annotations:** Place custom text, HTML, or images at specific positions using annotations.
- **Drag Interaction:** Enable `EnablePointerDrag` for interactive value selection via pointer drag.
- **Range Drag:** Enable `EnableRangeDrag` to allow users to modify range boundaries dynamically.
- **Animation:** Configure `AnimationDuration` for pointer animation when values change.
- **Export Support:** Enable export properties for PNG, JPEG, SVG, and PDF export formats.
- **Responsive:** Width and height accept both pixel ('450px') and percentage ('100%') values.
- **Themes:** Available themes include Material (default), Bootstrap5, Fluent, Tailwind with light and dark variants.
- **Locale Support:** Configure `Locale` for culture-specific number formatting and localization.
- **SVG Rendering:** All gauge elements render as SVG for scalability and responsive behavior.
- **Persistence:** Enable `EnablePersistence` to maintain component state across browser sessions.
- **Semi-Circular & Quarter:** Configure start/end angles to create semi-circular (180°-0°) or quarter-circular (180°-90°) gauges.
- **Touch Support:** Gauges support touch interactions on mobile devices for pointer drag functionality.
- **Keyboard Navigation:** Set `TabIndex` for keyboard accessibility and focus management.
- **Right-to-Left:** Enable `EnableRtl` for languages requiring RTL rendering.

---