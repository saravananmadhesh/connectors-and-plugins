# Syncfusion LinearGauge API Reference
Complete API reference for the Syncfusion ASP.NET Core LinearGauge (`Syncfusion.EJ2.LinearGauge.LinearGauge`) component.

- **Official API Documentation:** https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html
- **Namespace:** `Syncfusion.EJ2.LinearGauge.LinearGauge`
- **Assembly:** `Syncfusion.EJ2.dll`
**Namespace:** `Syncfusion.EJ2.LinearGauge`  
**Assembly:** `Syncfusion.EJ2.dll`  
**Platform:** ASP.NET Core (EJ2)

## Overview

The LinearGauge component displays numerical values on a linear scale. It renders all elements using SVG (Scalable Vector Graphics) and provides extensive customization options for pointers, ranges, annotations, and visual styling.

---

## LinearGauge Class

Main component class for creating linear gauge controls with horizontal or vertical orientation.

**Reference:** [Official LinearGauge Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html)

### Constructor

```csharp
public LinearGauge()
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [AllowImageExport](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowImageExport) | `bool` | false | Enables or disables image export functionality |
| [AllowMargin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowMargin) | `bool` | true | Enables rendering to complete width with margin consideration |
| [AllowPdfExport](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowPdfExport) | `bool` | false | Enables or disables PDF export functionality |
| [AllowPrint](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowPrint) | `bool` | false | Enables or disables print functionality |
| [AnimationDuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AnimationDuration) | `double` | 0 | Duration of loading animation in milliseconds |
| [Annotations](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Annotations) | `List<LinearGaugeAnnotation>` | null | Collection of annotations to display |
| [Axes](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Axes) | `List<LinearGaugeAxis>` | null | Collection of axes configuration |
| [Background](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Background) | `string` | "transparent" | Background color of the gauge (accepts hex code or CSS color) |
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Border) | `LinearGaugeBorder` | null | Border styling properties |
| [Container](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Container) | `LinearGaugeContainer` | null | Container configuration and styling |
| [Description](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Description) | `string` | null | Description for accessibility support |
| [EdgeLabelPlacement](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_EdgeLabelPlacement) | `LabelPlacement` | LabelPlacement.None | Placement of edge labels |
| [EnablePersistence](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_EnablePersistence) | `bool` | false | Enable state persistence across page reloads |
| [EnableRtl](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_EnableRtl) | `bool` | false | Enable right-to-left rendering |
| [Format](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Format) | `string` | null | Internationalization format string |
| [Height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Height) | `string` | null | Height of the gauge (e.g., '100px' or '100%') |
| [Locale](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Locale) | `string` | "" | Locale culture ('en-US' by default) |
| [Margin](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Margin) | `LinearGaugeMargin` | null | Margin configuration |
| [Orientation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Orientation) | `Orientation` | Orientation.Vertical | Gauge orientation (Horizontal or Vertical) |
| [RangePalettes](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_RangePalettes) | `string[]` | null | Color palette for axis ranges |
| [TabIndex](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_TabIndex) | `double` | 0 | Tab index value for keyboard navigation |
| [Theme](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Theme) | `LinearGaugeTheme` | LinearGaugeTheme.Material | Theme styling |
| [Title](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Title) | `string` | null | Title text displayed in the gauge |
| [TitleStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_TitleStyle) | `LinearGaugeFont` | null | Font styling for title |
| [Tooltip](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Tooltip) | `LinearGaugeTooltipSettings` | null | Tooltip configuration |
| [UseGroupingSeparator](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_UseGroupingSeparator) | `bool` | false | Enable grouping separator for numbers |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Width) | `string` | null | Width of the gauge (e.g., '100px' or '100%') |

### Events

| Event | Type | Description |
|-------|------|-------------|
| AnimationComplete | `string` | Triggered after animation completes for pointer |
| AnnotationRender | `string` | Triggered before each annotation is rendered |
| AxisLabelRender | `string` | Triggered before each axis label is rendered |
| BeforePrint | `string` | Triggered before print functionality starts |
| DragEnd | `string` | Triggered after pointer drag ends |
| DragMove | `string` | Triggered while dragging pointer |
| DragStart | `string` | Triggered before pointer drag starts |
| GaugeMouseDown | `string` | Triggered on mouse down on gauge area |
| GaugeMouseLeave | `string` | Triggered when mouse leaves gauge area |
| GaugeMouseMove | `string` | Triggered on mouse move on gauge area |
| GaugeMouseUp | `string` | Triggered on mouse up on gauge area |
| Load | `string` | Triggered before gauge rendering |
| Loaded | `string` | Triggered after gauge rendering completes |
| Resized | `string` | Triggered when gauge is resized |
| TooltipRender | `string` | Triggered before tooltip is rendered |
| ValueChange | `string` | Triggered when pointer value changes via UI interaction |

---

## LinearGaugeAxis Class

Represents an axis configuration with scale, ranges, and pointers.

**Reference:** [Official LinearGaugeAxis Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [IsInversed](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_IsInversed) | `bool` | false | Inverts the axis direction |
| [LabelStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_LabelStyle) | `LinearGaugeLabel` | null | Axis label styling properties |
| [Line](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Line) | `LinearGaugeLine` | null | Axis line styling properties |
| [MajorTicks](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_MajorTicks) | `LinearGaugeTick` | null | Major tick line configuration |
| [Maximum](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Maximum) | `double` | 100 | Maximum value of the axis |
| [Minimum](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Minimum) | `double` | 0 | Minimum value of the axis |
| [MinorTicks](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_MinorTicks) | `LinearGaugeTick` | null | Minor tick line configuration |
| [OpposedPosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_OpposedPosition) | `bool` | false | Positions axis on opposite side |
| [Pointers](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Pointers) | `List<LinearGaugePointer>` | null | Collection of pointers on the axis |
| [Ranges](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Ranges) | `List<LinearGaugeRange>` | null | Collection of ranges on the axis |
| [ShowLastLabel](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_ShowLastLabel) | `bool` | false | Display or hide last label |

---

## LinearGaugePointer Class

Represents a pointer (marker or bar) on the gauge axis.

**Reference:** [Official LinearGaugePointer Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [AnimationDuration](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_AnimationDuration) | `double` | 0 | Duration of pointer animation in milliseconds |
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Border) | `LinearGaugeBorder` | null | Pointer border styling |
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Color) | `string` | null | Pointer color (hex or CSS color) |
| [Description](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Description) | `string` | null | Description for accessibility |
| [EnableDrag](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_EnableDrag) | `bool` | false | Enable drag to change pointer value |
| [Height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Height) | `double` | 20 | Height of the pointer |
| [ImageUrl](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_ImageUrl) | `string` | null | URL for image when MarkerType is Image |
| [LinearGradient](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_LinearGradient) | `LinearGaugeLinearGradient` | null | Linear gradient configuration |
| [MarkerType](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_MarkerType) | `MarkerType` | MarkerType.InvertedTriangle | Marker shape type |
| [Offset](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Offset) | `string` | "0" | Offset position from axis |
| [Opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Opacity) | `double` | 1 | Opacity of pointer (0-1) |
| [Placement](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Placement) | `Placement` | Placement.Far | Pointer placement relative to axis |
| [Position](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Position) | `Position` | Position.Auto | Position on the axis |
| [RadialGradient](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_RadialGradient) | `LinearGaugeRadialGradient` | null | Radial gradient configuration |
| [RoundedCornerRadius](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_RoundedCornerRadius) | `double` | 10 | Corner radius for rounded pointers |
| [Text](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Text) | `string` | "" | Text to display when MarkerType is Text |
| [TextStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_TextStyle) | `object` | null | Font styling for text pointer |
| [Type](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Type) | `Point` | Point.Marker | Pointer type (Marker or Bar) |
| [Value](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Value) | `double` | Double.NaN | Current value of the pointer |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Width) | `double` | 20 | Width of the pointer |

---

## LinearGaugeRange Class

Represents a range (colored zone) on the gauge axis.

**Reference:** [Official LinearGaugeRange Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Border) | `LinearGaugeBorder` | null | Range border styling |
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Color) | `string` | "" | Range color (hex or CSS color) |
| [End](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_End) | `double` | 0 | End value of the range |
| [EndWidth](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_EndWidth) | `double` | 10 | Width at the end of range |
| [LinearGradient](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_LinearGradient) | `LinearGaugeLinearGradient` | null | Linear gradient configuration |
| [Offset](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Offset) | `string` | "0" | Offset from axis |
| [Position](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Position) | `Position` | Position.Outside | Position relative to axis |
| [RadialGradient](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_RadialGradient) | `LinearGaugeRadialGradient` | null | Radial gradient configuration |
| [Start](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Start) | `double` | 0 | Start value of the range |
| [StartWidth](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_StartWidth) | `double` | 10 | Width at the start of range |

---

## LinearGaugeAnnotation Class

Represents an annotation (text, image, or custom content) on the gauge.

**Reference:** [Official LinearGaugeAnnotation Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [AxisIndex](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_AxisIndex) | `double` | Double.NaN | Axis index for annotation placement |
| [AxisValue](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_AxisValue) | `double` | Double.NaN | Axis value where annotation appears |
| [Content](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_Content) | `string` | "" | Content text or HTML |
| [Font](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_Font) | `LinearGaugeFont` | null | Font styling for annotation |
| [HorizontalAlignment](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_HorizontalAlignment) | `Placement` | Placement.None | Horizontal alignment |
| [VerticalAlignment](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_VerticalAlignment) | `Placement` | Placement.None | Vertical alignment |
| [X](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_X) | `double` | 0 | X-coordinate position |
| [Y](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_Y) | `double` | 0 | Y-coordinate position |
| [ZIndex](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_ZIndex) | `string` | "-1" | Z-index for layering |

---

## LinearGaugeContainer Class

Represents container configuration for gauge background.

**Reference:** [Official LinearGaugeContainer Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html#Syncfusion_EJ2_LinearGauge_LinearGaugeContainer_Border) | `LinearGaugeBorder` | null | Container border styling |
| [Offset](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html#Syncfusion_EJ2_LinearGauge_LinearGaugeContainer_Offset) | `double` | 0 | Offset from gauge edges |
| [Orientation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html#Syncfusion_EJ2_LinearGauge_LinearGaugeContainer_Orientation) | `Orientation` | Orientation.Vertical | Container orientation |
| [Type](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html#Syncfusion_EJ2_LinearGauge_LinearGaugeContainer_Type) | `ContainerType` | ContainerType.Normal | Container type (Normal, RoundedRectangle, Thermometer) |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html#Syncfusion_EJ2_LinearGauge_LinearGaugeContainer_Width) | `double` | 0 | Width of container background |

---

## LinearGaugeLabel Class

Represents label styling configuration.

**Reference:** [Official LinearGaugeLabel Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Font](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLabel_Font) | `LinearGaugeFont` | null | Label font properties |
| [Format](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLabel_Format) | `string` | null | Label format string |
| [Placement](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLabel_Placement) | `LabelPlacement` | LabelPlacement.Auto | Label placement strategy |

---

## LinearGaugeTick Class

Represents tick line configuration.

**Reference:** [Official LinearGaugeTick Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Color) | `string` | null | Tick color |
| [Height](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Height) | `double` | 0 | Tick height |
| [Interval](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Interval) | `double` | 10 | Interval between ticks |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Width) | `double` | 1 | Tick width |

---

## LinearGaugeBorder Class

Represents border styling configuration.

**Reference:** [Official LinearGaugeBorder Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeBorder.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeBorder.html#Syncfusion_EJ2_LinearGauge_LinearGaugeBorder_Color) | `string` | "" | Border color |
| [Width](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeBorder.html#Syncfusion_EJ2_LinearGauge_LinearGaugeBorder_Width) | `double` | 0 | Border width |
| [Dasharray](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeBorder.html#Syncfusion_EJ2_LinearGauge_LinearGaugeBorder_Dasharray) | `string` | "" | Dash pattern for border |

---

## LinearGaugeFont Class

Represents font styling configuration.

**Reference:** [Official LinearGaugeFont Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [FontFamily](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontFamily) | `string` | "" | Font family name |
| [FontSize](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontSize) | `string` | "" | Font size with unit |
| [FontStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontStyle) | `string` | "" | Font style (normal, italic, oblique) |
| [FontWeight](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontWeight) | `string` | "" | Font weight (normal, bold, etc.) |
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Color) | `string` | "" | Text color |
| [Opacity](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Opacity) | `double` | 1 | Text opacity |

---

## LinearGaugeMargin Class

Represents margin configuration for gauge spacing.

**Reference:** [Official LinearGaugeMargin Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeMargin.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Bottom](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeMargin.html#Syncfusion_EJ2_LinearGauge_LinearGaugeMargin_Bottom) | `double` | 0 | Bottom margin |
| [Left](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeMargin.html#Syncfusion_EJ2_LinearGauge_LinearGaugeMargin_Left) | `double` | 0 | Left margin |
| [Right](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeMargin.html#Syncfusion_EJ2_LinearGauge_LinearGaugeMargin_Right) | `double` | 0 | Right margin |
| [Top](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeMargin.html#Syncfusion_EJ2_LinearGauge_LinearGaugeMargin_Top) | `double` | 0 | Top margin |

---

## LinearGaugeLinearGradient Class

Represents linear gradient configuration for fills.

**Reference:** [Official LinearGaugeLinearGradient Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLinearGradient.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [ColorStop](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLinearGradient.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLinearGradient_ColorStop) | `List<LinearGaugeColorStop>` | null | Collection of color stops |

---

## LinearGaugeColorStop Class

Represents a color stop in gradient configuration.

**Reference:** [Official LinearGaugeColorStop Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeColorStop.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Color](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeColorStop.html#Syncfusion_EJ2_LinearGauge_LinearGaugeColorStop_Color) | `string` | "" | Stop color |
| [Offset](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeColorStop.html#Syncfusion_EJ2_LinearGauge_LinearGaugeColorStop_Offset) | `double` | 0 | Stop offset percentage (0-100) |

---

## LinearGaugeTooltipSettings Class

Represents tooltip configuration for gauge elements.

**Reference:** [Official LinearGaugeTooltipSettings Class Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html)

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [Border](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTooltipSettings_Border) | `object` | null | Tooltip border styling |
| [Enable](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTooltipSettings_Enable) | `bool` | false | Enable tooltip functionality |
| [Fill](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTooltipSettings_Fill) | `string` | "" | Tooltip background color |
| [Format](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTooltipSettings_Format) | `string` | null | Tooltip content format |
| [ShowAtMousePosition](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTooltipSettings_ShowAtMousePosition) | `bool` | false | Show tooltip at mouse position |
| [TextStyle](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTooltipSettings_TextStyle) | `object` | null | Tooltip text styling |

---

## Supporting Classes

### LinearGaugeRadialGradient

Represents radial gradient configuration for fills.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRadialGradient.html)

### LinearGaugeGradientPosition

Represents gradient position and radius configuration.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeGradientPosition.html)

### LinearGaugeLine

Represents axis line styling configuration.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLine.html)

### LinearGaugeColorStops

Collection class for managing color stops.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeColorStops.html)

### LinearGaugePointers

Collection class for managing pointers.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointers.html)

### LinearGaugeRanges

Collection class for managing ranges.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRanges.html)

### LinearGaugeAnnotations

Collection class for managing annotations.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotations.html)

### LinearGaugeAxes

Collection class for managing axes.

[Official Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxes.html)

---

## Enumerations

### Orientation Enum

Defines the orientation of the gauge.

| Value | Description |
|-------|-------------|
| `Horizontal` | Horizontal orientation (left to right) |
| `Vertical` | Vertical orientation (top to bottom, default) |

**Reference:** [Official Orientation Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.Orientation.html)

---

### MarkerType Enum

Defines the shape of pointer markers.

| Value | Description |
|-------|-------------|
| `Arrow` | Arrow-shaped marker |
| `Circle` | Circular marker |
| `Diamond` | Diamond-shaped marker |
| `Image` | Image-based marker (requires ImageUrl) |
| `InvertedArrow` | Inverted arrow-shaped marker |
| `InvertedTriangle` | Inverted triangle-shaped marker (default) |
| `Rectangle` | Rectangular marker |
| `Text` | Text-based marker (requires Text property) |
| `Triangle` | Triangle-shaped marker |

**Reference:** [Official MarkerType Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.MarkerType.html)

---

### ContainerType Enum

Defines the container type for gauge background.

| Value | Description |
|-------|-------------|
| `Normal` | Standard rectangular container (default) |
| `RoundedRectangle` | Container with rounded corners |
| `Thermometer` | Thermometer-style container with rounded ends |

**Reference:** [Official ContainerType Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.ContainerType.html)

---

### LabelPlacement Enum

Defines label placement strategy when they overlap.

| Value | Description |
|-------|-------------|
| `Auto` | Automatically adjust label placement |
| `None` | Show all labels without adjustment (default) |
| `Shift` | Shift overlapping labels |
| `Trim` | Trim overlapping label text |

**Reference:** [Official LabelPlacement Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LabelPlacement.html)

---

### LinearGaugeTheme Enum

Defines theme styles for the linear gauge.

| Value | Description |
|-------|-------------|
| `Bootstrap` | Bootstrap design theme |
| `Bootstrap4` | Bootstrap 4 design theme |
| `Bootstrap5` | Bootstrap 5 design theme |
| `Bootstrap5Dark` | Bootstrap 5 dark design theme |
| `BootstrapDark` | Bootstrap dark design theme |
| `Fabric` | Fabric design theme |
| `FabricDark` | Fabric dark design theme |
| `Fluent` | Microsoft Fluent design theme |
| `Fluent2` | Microsoft Fluent 2 design theme |
| `Fluent2Dark` | Microsoft Fluent 2 dark design theme |
| `Fluent2HighContrast` | Microsoft Fluent 2 high contrast theme |
| `FluentDark` | Microsoft Fluent dark design theme |
| `HighContrast` | High contrast theme for accessibility |
| `HighContrastLight` | High contrast light theme for accessibility |
| `Material` | Material design theme (default) |
| `Material3` | Material Design 3 theme |
| `Material3Dark` | Material Design 3 dark theme |
| `MaterialDark` | Material dark design theme |
| `Tailwind` | Tailwind CSS design theme |
| `Tailwind3` | Tailwind CSS 3 design theme |
| `Tailwind3Dark` | Tailwind CSS 3 dark design theme |
| `TailwindDark` | Tailwind CSS dark design theme |

**Reference:** [Official LinearGaugeTheme Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTheme.html)

---

### Position Enum

Defines pointer and range position on the axis.

**Reference:** [Official Position Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.Position.html)

| Value | Description |
|-------|-------------|
| `Auto` | Automatic positioning (default) |
| `Inside` | Inside the axis |
| `Outside` | Outside the axis |
| `Cross` | Cross the axis |

---

### Placement Enum

Defines placement of elements (pointers, annotations).

**Reference:** [Official Placement Enum Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.Placement.html)

| Value | Description |
|-------|-------------|
| `Near` | Near the axis |
| `Far` | Far from the axis (default for pointers) |
| `Center` | Center position |
| `None` | No specific placement |

---

## Event Arguments

### AnnotationRenderEventArgs

Triggered when annotation is about to be rendered.

**Reference:** [Official AnnotationRenderEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.AnnotationRenderEventArgs.html)

```csharp
public class AnnotationRenderEventArgs
{
    public string Angle { get; set; }
    public string Content { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
}
```

### AxisLabelRenderEventArgs

Triggered when axis label is about to be rendered.

**Reference:** [Official AxisLabelRenderEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.AxisLabelRenderEventArgs.html)

```csharp
public class AxisLabelRenderEventArgs
{
    public double Value { get; set; }
    public string Text { get; set; }
}
```

### DragEventArgs

Triggered during pointer drag operations.

**Reference:** [Official DragEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.DragEventArgs.html)

```csharp
public class DragEventArgs
{
    public double Value { get; set; }
    public int PointerIndex { get; set; }
    public int AxisIndex { get; set; }
}
```

### TooltipRenderEventArgs

Triggered when tooltip is about to be rendered.

**Reference:** [Official TooltipRenderEventArgs Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.TooltipRenderEventArgs.html)

```csharp
public class TooltipRenderEventArgs
{
    public double Value { get; set; }
    public string Text { get; set; }
}
```

---

## Usage Examples

### Basic Horizontal Gauge

```csharp
@page
<ejs-lineargauge id="linear" orientation="Horizontal" height="120px">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="200">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Thermometer Container

```csharp
@page
<ejs-lineargauge id="thermometer" orientation="Vertical">
    <e-lineargauge-container type="Thermometer" width="8"></e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="-10" maximum="60">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="-10" end="0" color="blue"></e-lineargauge-range>
                <e-lineargauge-range start="0" end="30" color="green"></e-lineargauge-range>
                <e-lineargauge-range start="30" end="60" color="red"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Draggable Pointer with Tooltip

```csharp
@page
<ejs-lineargauge id="gauge" tooltip-enable="true">
    <e-lineargauge-tooltip enable="true" format="{value}%"></e-lineargauge-tooltip>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" EnableDrag="true"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

---

## See Also

- [Syncfusion LinearGauge Official Documentation](https://help.syncfusion.com/aspnetcore-js2/linear-gauge/getting-started)
- [LinearGauge API Documentation](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html)
- [Getting Started Guide](../references/getting-started.md)
- [Advanced Features](../references/advanced-features.md)
