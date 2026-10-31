# API Reference

Complete API documentation for Syncfusion Linear Gauge component.

## Table of Contents
- [Component Properties](#component-properties)
- [Axis Properties](#axis-properties)
- [Pointer Properties](#pointer-properties)
- [Range Properties](#range-properties)
- [Annotation Properties](#annotation-properties)
- [Label Style Properties](#label-style-properties)
- [Events](#events)
- [Methods](#methods)
- [Enumerations](#enumerations)

---

## Component Properties

### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Title**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Title) | string | null | Title displayed at the top of gauge |
| [**Format**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Format) | string | null | Format of axis labels (n=number, c=currency, p=percentage) |
| [**Height**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Height) | string | null | Height of gauge container |
| [**Width**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Width) | string | null | Width of gauge container |
| [**Orientation**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Orientation) | [Orientation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Orientation.html) | Vertical | Layout direction (Horizontal, Vertical) |
| [**Container**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Container) | [LinearGaugeContainer](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeContainer.html) | null | Container shape (Normal, RoundedRectangle, Thermometer) |
| [**AnimationDuration**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AnimationDuration) | double | 0 | Duration of all animations in milliseconds |
| [**AllowPrint**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowPrint) | bool | false | Enable print functionality |
| [**AllowImageExport**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowImageExport) | bool | false | Enable image export (PNG/JPG) |
| [**AllowPdfExport**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowPdfExport) | bool | false | Enable PDF export |
| [**Tooltip**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Tooltip) | [LinearGaugeTooltipSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTooltipSettings.html) | null | Tooltip configuration object |
| [**Theme**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Theme) | [LinearGaugeTheme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTheme.html) | Material | Visual theme (Material, Bootstrap, Bootstrap4, etc.) |
| [**Background**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Background) | string | "transparent" | Background color of gauge |
| [**Border**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Border) | [LinearGaugeBorder](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeBorder.html) | null | Border configuration object |
| [**Margin**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Margin) | [LinearGaugeMargin](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeMargin.html) | null | Space around gauge edges |
| [**Locale**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Locale) | string | "" | Language locale code (en, fr, de, etc.) |
| [**EnableRtl**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_EnableRtl) | bool | false | Enable right-to-left rendering |
| [**AllowMargin**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AllowMargin) | bool | true | Render gauge with full width/height |

### Title Style Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**TitleStyle**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_TitleStyle) | [LinearGaugeFont](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html) | null | Customizes title appearance |
| [**TitleStyle.Size**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Size) | string | null | Title font size |
| [**TitleStyle.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Color) | string | null | Title text color |
| [**TitleStyle.FontFamily**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontFamily) | string | null | Title font family |
| [**TitleStyle.FontWeight**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontWeight) | string | null | Title font weight (400-700) |
| [**TitleStyle.FontStyle**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontStyle) | string | null | Title font style (Normal, Italic, Oblique) |

---

## Axis Properties

### Main Axis Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Minimum**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Minimum) | double | 0 | Minimum value of axis |
| [**Maximum**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Maximum) | double | 100 | Maximum value of axis |
| [**LabelFormat**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_LabelFormat) | string | "g" | Format for axis labels |
| [**ShowLastLabel**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_ShowLastLabel) | bool | true | Display label at maximum value |
| [**EdgeLabelPlacement**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_EdgeLabelPlacement) | [LabelPlacement](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LabelPlacement.html) | None | Edge label placement |
| [**Name**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Name) | string | null | Unique identifier for axis |
| [**IsInversed**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_IsInversed) | bool | false | Reverse axis direction |
| [**OpposedPosition**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_OpposedPosition) | bool | false | Place axis labels on opposite side |

### Axis Line Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Line**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_Line) | [LinearGaugeLine](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLine.html) | null | Axis line configuration |
| [**Line.Height**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLine.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLine_Height) | double | 2 | Main axis line height |
| [**Line.Width**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLine.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLine_Width) | double | 150 | Axis line length in pixels |
| [**Line.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLine.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLine_Color) | string | "#000000" | Axis line color |
| [**Line.Offset**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLine.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLine_Offset) | double | 0 | Distance from gauge edge |

### Axis Tick Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**MajorTicks**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_MajorTicks) | [LinearGaugeTick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html) | null | Major tick configuration |
| [**MajorTicks.Height**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Height) | double | 7 | Major tick mark height |
| [**MajorTicks.Width**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Width) | double | 1 | Major tick mark width |
| [**MajorTicks.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Color) | string | "#000000" | Major tick color |
| [**MajorTicks.Interval**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Interval) | double | 10 | Spacing between major ticks |
| [**MajorTicks.Position**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Position) | [Position](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Position.html) | Inside | Major tick placement |
| [**MinorTicks**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_MinorTicks) | [LinearGaugeTick](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html) | null | Minor tick configuration |
| [**MinorTicks.Height**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Height) | double | 3 | Minor tick mark height |
| [**MinorTicks.Width**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Width) | double | 1 | Minor tick mark width |
| [**MinorTicks.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Color) | string | "#000000" | Minor tick color |
| [**MinorTicks.Interval**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Interval) | double | 2 | Spacing between minor ticks |
| [**MinorTicks.Position**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTick.html#Syncfusion_EJ2_LinearGauge_LinearGaugeTick_Position) | [Position](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Position.html) | Inside | Minor tick placement |

---

## Pointer Properties

### Pointer Common Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Value**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Value) | double | 0 | Current pointer value |
| [**Type**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Type) | string | "Marker" | Shape type (Marker, Bar) |
| [**MarkerType**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_MarkerType) | [MarkerType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.MarkerType.html) | InvertedTriangle | Marker shape (Circle, Rectangle, Triangle, Diamond, Image, Text) |
| [**Width**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Width) | double | 7 | Pointer width in pixels |
| [**Height**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Height) | double | 15 | Pointer height in pixels |
| [**Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Color) | string | "#2196F3" | Pointer fill color |
| [**Offset**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Offset) | double | 0 | Distance from axis line |
| [**Text**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Text) | string | "" | Text for text marker type |
| [**ImageUrl**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_ImageUrl) | string | "" | URL for image marker type |
| [**RoundedCorners**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_RoundedCorners) | bool | false | Apply rounded corners to bar pointer |
| [**Placement**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Placement) | [Placement](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Placement.html) | Near | Pointer placement relative to axis |

### Pointer Border Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Border**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugePointer.html#Syncfusion_EJ2_LinearGauge_LinearGaugePointer_Border) | [PointerBorderPointers](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.PointerBorderPointers.html) | null | Pointer border configuration |
| [**Border.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.PointerBorderPointers.html#Syncfusion_EJ2_LinearGauge_PointerBorderPointers_Color) | string | "transparent" | Pointer border color |
| [**Border.Width**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.PointerBorderPointers.html#Syncfusion_EJ2_LinearGauge_PointerBorderPointers_Width) | double | 0 | Pointer border width |

### Pointer Animation Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **Animation.Enable** | bool | true | Enable pointer animation |
| **Animation.Duration** | double | 1000 | Animation duration in milliseconds |
| **Animation.Delay** | double | 0 | Delay before animation starts in milliseconds |

---

## Range Properties

### Range Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Start**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Start) | double | 0 | Start value of range zone |
| [**End**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_End) | double | 100 | End value of range zone |
| [**Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Color) | string | "#BDBDBD" | Fill color of range |
| [**StartWidth**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_StartWidth) | double | 10 | Width at range start |
| [**EndWidth**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_EndWidth) | double | 10 | Width at range end |
| [**Position**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Position) | [Position](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Position.html) | Inside | Range placement (Inside, Outside, Cross, Auto) |
| [**Offset**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Offset) | double | 0 | Distance from axis line |
| [**UseRangeColor**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_UseRangeColor) | bool | false | Apply range color to labels |
| [**Placement**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_Placement) | [Placement](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Placement.html) | Near | Label position relative to range |
| [**RoundedCorners**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeRange.html#Syncfusion_EJ2_LinearGauge_LinearGaugeRange_RoundedCorners) | bool | false | Apply rounded corners to range edges |

---

## Annotation Properties

### Text and Content Annotations

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**Content**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_Content) | string | "" | Annotation text or HTML content |
| [**X**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_X) | double | 0 | Horizontal position in pixels |
| [**Y**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_Y) | double | 0 | Vertical position in pixels |
| [**HorizontalAlignment**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_HorizontalAlignment) | string | "Center" | Horizontal alignment (Near, Center, Far) |
| [**VerticalAlignment**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_VerticalAlignment) | string | "Center" | Vertical alignment (Near, Center, Far) |
| [**AxisIndex**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_AxisIndex) | int | 0 | Target axis index |
| [**AxisValue**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_AxisValue) | double | null | Position along axis value |
| [**ZIndex**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_ZIndex) | string | "-1" | Stacking order (higher = on top) |
| [**Font**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAnnotation.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAnnotation_Font) | [LinearGaugeFont](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html) | null | Font configuration |
| [**Font.Size**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Size) | string | "12px" | Font size for text annotations |
| [**Font.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Color) | string | "#000000" | Text color |
| [**Font.FontFamily**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontFamily) | string | "Segoe UI" | Font family |

---

## Label Style Properties

### Axis Labels

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| [**LabelStyle**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeAxis.html#Syncfusion_EJ2_LinearGauge_LinearGaugeAxis_LabelStyle) | [LinearGaugeLabel](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html) | null | Label configuration |
| [**LabelStyle.Font**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLabel_Font) | [LinearGaugeFont](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html) | null | Font configuration |
| [**LabelStyle.Font.Size**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Size) | string | "12px" | Label font size |
| [**LabelStyle.Font.Color**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Color) | string | "#1f1f1f" | Label text color |
| [**LabelStyle.Font.FontFamily**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontFamily) | string | "Segoe UI" | Label font family |
| [**LabelStyle.Font.FontWeight**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_FontWeight) | string | "400" | Font weight (400-700) |
| [**LabelStyle.Font.Opacity**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeFont.html#Syncfusion_EJ2_LinearGauge_LinearGaugeFont_Opacity) | double | 1 | Label opacity (0-1) |
| [**LabelStyle.UseRangeColor**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLabel_UseRangeColor) | bool | false | Apply range color to matching labels |
| [**LabelStyle.Format**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeLabel.html#Syncfusion_EJ2_LinearGauge_LinearGaugeLabel_Format) | string | "g" | Number format for labels |

---

## Events

### Lifecycle Events

| Event | Link | Description |
|-------|------|-------------|
| [**Load**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Load) | Load | Fires when gauge initializes |
| [**Loaded**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Loaded) | Loaded | Fires after gauge fully renders |
| [**Resized**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_Resized) | Resized | Fires when gauge container resized |

### Interaction Events

| Event | Link | Description |
|-------|------|-------------|
| [**DragStart**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_DragStart) | DragStart | Fires when user starts dragging pointer |
| [**DragMove**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_DragMove) | DragMove | Fires while user drags pointer |
| [**DragEnd**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_DragEnd) | DragEnd | Fires when user stops dragging |
| [**GaugeMouseDown**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_GaugeMouseDown) | GaugeMouseDown | Fires on mouse down on gauge |
| [**GaugeMouseMove**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_GaugeMouseMove) | GaugeMouseMove | Fires on mouse move on gauge |
| [**GaugeMouseUp**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_GaugeMouseUp) | GaugeMouseUp | Fires on mouse up on gauge |
| [**GaugeMouseLeave**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_GaugeMouseLeave) | GaugeMouseLeave | Fires when mouse leaves gauge |
| [**ValueChange**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_ValueChange) | ValueChange | Fires while changing pointer value |

### Animation & Rendering Events

| Event | Link | Description |
|-------|------|-------------|
| [**AnimationComplete**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AnimationComplete) | AnimationComplete | Fires when animation finishes |
| [**AnnotationRender**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AnnotationRender) | AnnotationRender | Fires before annotation renders |
| [**AxisLabelRender**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_AxisLabelRender) | AxisLabelRender | Fires before axis label renders |

### Print/Export Events

| Event | Link | Description |
|-------|------|-------------|
| [**BeforePrint**](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html#Syncfusion_EJ2_LinearGauge_LinearGauge_BeforePrint) | BeforePrint | Fires before print starts |

### Event Usage Example

```csharp
// Controller
public ActionResult EventExample()
{
    return View();
}

// View
@Html.EJS().LinearGauge("eventGauge")
    .Loaded("onLoaded")
    .DragStart("onDragStart")
    .DragMove("onDragMove")
    .DragEnd("onDragEnd")
    .AnimationComplete("onAnimationComplete")
    .Axes(axes => { /* ... */ })
    .Render();

// JavaScript event handlers
<script>
function onLoaded(args) {
    console.log("Gauge loaded", args);
}

function onDragStart(args) {
    console.log("Drag started at value:", args.currentValue);
}

function onDragMove(args) {
    console.log("Dragging to value:", args.currentValue);
}

function onDragEnd(args) {
    console.log("Drag ended at value:", args.currentValue);
}

function onAnimationComplete(args) {
    console.log("Animation complete");
}
</script>
```

---

## Methods

### Gauge Methods

Public methods available on the LinearGauge component instance for runtime manipulation:

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| **setPointerValue** | axisIndex, pointerIndex, value | void | Set pointer to specific value programmatically |
| **getPointValue** | axisIndex, pointerIndex | double | Get current pointer value |
| **refresh** | - | void | Redraw gauge with updated data |
| **resizeGauge** | - | void | Recalculate gauge size after container changes |
| **print** | - | void | Trigger print dialog for gauge |
| **export** | type, fileName, orientation | void | Export gauge (PNG/JPG/PDF) |
| **destroy** | - | void | Clean up and remove gauge instance |

**Reference**: [LinearGauge Methods Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html)

### Method Usage Examples

```csharp
// In JavaScript
<script>
// Get gauge instance
var gauge = document.getElementById("myGauge").ej2_instances[0];

// Set pointer value
gauge.setPointerValue(0, 0, 75);

// Get pointer value
var currentValue = gauge.getPointValue(0, 0);

// Refresh gauge
gauge.refresh();

// Print gauge
gauge.print();

// Export as PNG
gauge.export("PNG", "my-gauge");

// Export as PDF
gauge.export("PDF", "my-gauge", "Portrait");

// Get gauge bounds
var bounds = gauge.getBounds();
console.log("Width:", bounds.width, "Height:", bounds.height);

// Destroy gauge
gauge.destroy();
</script>
```

---

## Enumerations

Reference enumeration types used throughout the LinearGauge API. See official documentation for complete definitions.

### [Orientation](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Orientation.html)

Controls the layout direction of the gauge:

```csharp
public enum Orientation
{
    Horizontal,      // Left-to-right layout
    Vertical         // Top-to-bottom layout (default)
}
```

**Reference**: [Orientation Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Orientation.html)

### [ContainerType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.ContainerType.html)

Defines container shape options:

```csharp
public enum ContainerType
{
    Normal,           // Standard rectangular container
    RoundedRectangle, // Rounded corners
    Thermometer       // Thermometer-style container
}
```

**Reference**: [ContainerType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.ContainerType.html)

### [MarkerType](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.MarkerType.html)

Defines pointer marker shapes:

```csharp
public enum MarkerType
{
    Circle,           // Circular marker
    Rectangle,        // Square/rectangular marker
    Triangle,         // Triangle pointing up
    InvertedTriangle, // Triangle pointing down (default)
    Diamond,          // Diamond-shaped marker
    Image,            // Custom image marker
    Text              // Text marker
}
```

**Reference**: [MarkerType Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.MarkerType.html)

### [Position](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Position.html)

Controls placement of ticks, labels, and ranges:

```csharp
public enum Position
{
    Inside,           // Inside the axis line
    Outside,          // Outside the axis line
    Cross,            // Crossing the axis line
    Auto              // Automatic positioning
}
```

**Reference**: [Position Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Position.html)

### [Placement](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Placement.html)

Controls pointer and range placement:

```csharp
public enum Placement
{
    Near,             // Near the axis
    Center,           // Center position
    Far               // Far from the axis
}
```

**Reference**: [Placement Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.Placement.html)

### [LabelPlacement](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LabelPlacement.html)

Controls edge label placement:

```csharp
public enum LabelPlacement
{
    None,            // No placement
    Start,           // At start position
    End,             // At end position
    Both             // At both start and end
}
```

**Reference**: [LabelPlacement Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LabelPlacement.html)

### [LinearGaugeTheme](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTheme.html)

Available themes for styling:

```csharp
public enum LinearGaugeTheme
{
    Material,         // Material design theme
    Bootstrap,        // Bootstrap 4 theme
    Bootstrap4,       // Bootstrap 4 (extended)
    Bootstrap5,       // Bootstrap 5 theme
    TailwindCss,      // Tailwind CSS theme
    Fluent,           // Microsoft Fluent theme
    HighContrast      // High contrast theme
}
```

**Reference**: [LinearGaugeTheme Enum](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGaugeTheme.html)

---

## Complete Component Example

```html
@Html.EJS().LinearGauge("completeGauge")
    .Title("Complete API Example")
    .Format("n")
    .Height("500px")
    .Width("100%")
    .Orientation(Orientation.Horizontal)
    .Container(ContainerType.Normal)
    .AnimationDuration(1500)
    .AllowPrint(true)
    .AllowImageExport(true)
    .AllowPdfExport(true)
    .Theme("Material")
    .Background("#f5f5f5")
    .BorderColor("#e0e0e0")
    .BorderWidth(1)
    .Margin(m => m.Left(10).Right(10).Top(10).Bottom(10))
    .Tooltip(tt => tt.Enable(true))
    .Axes(axes =>
    {
        axes.Minimum(0)
            .Maximum(100)
            .LabelFormat("g")
            .LabelPosition(Position.Inside)
            .Line(line => line.Height(150).Width(3).Color("black"))
            .MajorTicks(mt => mt.Height(7).Width(1).Interval(10))
            .MinorTicks(mt => mt.Height(3).Width(1).Interval(2))
            .LabelStyle(ls => ls.Font(f => f.Size("14px").Color("#333")))
            .Ranges(ranges =>
            {
                ranges.Start(0).End(40).Color("#4CAF50").Add();
                ranges.Start(40).End(70).Color("#FFC107").Add();
                ranges.Start(70).End(100).Color("#F44336").Add();
            })
            .Pointers(pointers =>
            {
                pointers.Value(65)
                    .Type(PointerType.Bar)
                    .Width(10)
                    .Color("#2196F3")
                    .Animation(a => a.Enable(true).Duration(1000))
                    .Add();
            })
            .Annotations(annotations =>
            {
                annotations.Content("Status OK")
                    .X(50)
                    .Y(100)
                    .HorizontalAlignment(Alignment.Center)
                    .Add();
            })
            .Add();
    })
    .Loaded("onLoaded")
    .DragStart("onDragStart")
    .DragEnd("onDragEnd")
    .AnimationComplete("onAnimationComplete")
    .Render();

<script>
function onLoaded(args) {
    console.log("Gauge initialized");
}

function onDragStart(args) {
    console.log("Started dragging, value:", args.currentValue);
}

function onDragEnd(args) {
    console.log("Finished dragging, final value:", args.currentValue);
}

function onAnimationComplete(args) {
    console.log("Animation finished");
}
</script>
```

---

## Official API Reference Links

Complete API reference and class documentation:

- **[LinearGauge Class Reference](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.LinearGauge.html)** - Main component class with all properties, events, and methods
- **[LinearGauge Namespace](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.LinearGauge.html)** - Complete namespace containing all LinearGauge types
- **[Syncfusion ASP.NET MVC Documentation](https://help.syncfusion.com/cr/aspnetmvc-js2/)** - Full Syncfusion EJ2 ASP.NET MVC documentation

## Additional Resources

- [Component Guide](https://www.syncfusion.com/asp.net-mvc-ui-controls/linear-gauge) - Feature overview and usage guide
- [NuGet Package](https://www.nuget.org/packages/Syncfusion.EJ2.MVC5) - Install via NuGet package manager
- [GitHub Samples](https://github.com/syncfusion/ej2-asp-core-mvc-samples) - Source code examples and samples
- [Community Support](https://www.syncfusion.com/forums) - Discussion forums and community help
- [Issue Tracker](https://www.syncfusion.com/feedback/linear-gauge) - Report issues and request features
