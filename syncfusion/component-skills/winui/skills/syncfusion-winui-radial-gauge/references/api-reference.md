# API Reference

Complete property reference for all Radial Gauge classes and components.

## Table of Contents
- [SfRadialGauge Class](#sfradialgauge-class)
- [GaugeAxis Class](#gaugeaxis-class)
- [RadialAxis Class](#radialaxis-class)
- [Needle Pointer](#needle-pointer)
- [Shape Pointer](#shape-pointer)
- [Content Pointer](#content-pointer)
- [Range Pointer](#range-pointer)
- [Marker Pointer](#marker-pointer)
- [Gauge Range](#gauge-range)
- [Gauge Annotation](#gauge-annotation)

## SfRadialGauge Class

The main gauge control container.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Axes` | ObservableCollection<RadialAxis> | Collection of radial axes | Empty collection |
| `CanScaleToFit` | bool | Positions axis based on start/end angles | true |

### Usage

```xaml
<gauge:SfRadialGauge CanScaleToFit="True">
    <gauge:SfRadialGauge.Axes>
        <gauge:RadialAxis />
    </gauge:SfRadialGauge.Axes>
</gauge:SfRadialGauge>
```

---

## GaugeAxis Class

Base class for axis with common properties.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Minimum` | double | Minimum axis value | 0 |
| `Maximum` | double | Maximum axis value | 100 |
| `Interval` | double | Label interval | Auto-calculated |
| `IsInversed` | bool | Reverses axis direction (counter-clockwise) | false |
| `LabelFormat` | string | Number format for labels (c, p, n2, etc.) | null |
| `LabelPosition` | GaugeLabelsPosition | Label position (Inside/Outside) | Inside |
| `LabelTemplate` | DataTemplate | Custom label template | null |
| `ShowLabels` | bool | Show/hide labels | true |
| `ShowTicks` | bool | Show/hide ticks | true |
| `ShowAxisLine` | bool | Show/hide axis line | true |
| `MaximumLabelsCount` | int | Max labels per 100 logical pixels | 3 |
| `AxisLineWidth` | double | Axis line thickness | 10 |
| `AxisLineWidthUnit` | SizeUnit | Unit for axis line width (Pixel/Factor) | Pixel |
| `AxisLineFill` | Brush | Axis line color | #E0E0E0 |
| `GradientStops` | ObservableCollection<GaugeGradientStop> | Gradient colors for axis line | Empty |
| `MajorTickLength` | double | Major tick length | 10 |
| `MinorTickLength` | double | Minor tick length | 5 |
| `TickLengthUnit` | SizeUnit | Unit for tick lengths (Pixel/Factor) | Pixel |
| `MinorTicksPerInterval` | int | Minor ticks between major ticks | 1 |
| `TickPosition` | GaugeElementPosition | Tick position (Inside/Outside/Cross) | Inside |
| `MajorTickStyle` | Style | Style for major ticks | Default |
| `MinorTickStyle` | Style | Style for minor ticks | Default |
| `Pointers` | ObservableCollection<GaugePointer> | Collection of pointers | Empty |
| `Ranges` | ObservableCollection<GaugeRange> | Collection of ranges | Empty |
| `Annotations` | ObservableCollection<GaugeAnnotation> | Collection of annotations | Empty |
| `UseRangeColorForAxis` | bool | Apply range colors to axis elements | false |

### Events

| Event | Description | EventArgs |
|-------|-------------|-----------|
| `LabelPrepared` | Fires when label is prepared | LabelPreparedEventArgs |

---

## RadialAxis Class

Circular axis extending GaugeAxis with radial-specific properties.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `StartAngle` | double | Starting angle (0-360°) | 270 |
| `EndAngle` | double | Ending angle (0-360°) | 270 |
| `RadiusFactor` | double | Radius as factor of available space (0-1) | 0.9 |
| `CanRotateLabels` | bool | Rotate labels along axis curve | false |
| `ShowFirstLabel` | bool | Show first label | true |
| `ShowLastLabel` | bool | Show last label | true |
| `LabelOffset` | double | Distance of labels from axis | double.NaN |
| `TickOffset` | double | Distance of ticks from axis | double.NaN |
| `OffsetUnit` | SizeUnit | Unit for offsets (Pixel/Factor) | Pixel |
| `BackgroundContent` | object | Custom background content | null |

### Events

| Event | Description | EventArgs |
|-------|-------------|-----------|
| `AxisTapped` | Fires when axis is tapped | AxisTappedEventArgs |

### Usage

```xaml
<gauge:RadialAxis Minimum="0"
                  Maximum="150"
                  StartAngle="180"
                  EndAngle="90"
                  RadiusFactor="0.85"
                  CanRotateLabels="True"
                  LabelOffset="0.3"
                  OffsetUnit="Factor" />
```

---

## Needle Pointer

Traditional gauge needle with knob and optional tail.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Value` | double | Pointer value | 0 |
| `EnableAnimation` | bool | Enable animation | false |
| `AnimationDuration` | double | Animation duration (ms) | 1500 |
| `AnimationEasingFunction` | EasingFunctionBase | Easing function | null |
| `IsInteractive` | bool | Enable dragging | false |
| `NeedleLength` | double | Needle length | 0.6 |
| `NeedleLengthUnit` | SizeUnit | Unit for needle length (Pixel/Factor) | Factor |
| `NeedleStartWidth` | double | Width at base | 1 |
| `NeedleEndWidth` | double | Width at tip | 10 |
| `NeedleFill` | Brush | Needle color | #424242 |
| `KnobRadius` | double | Knob size | 8 |
| `KnobSizeUnit` | SizeUnit | Unit for knob size (Pixel/Factor) | Pixel |
| `KnobFill` | Brush | Knob fill color | #424242 |
| `KnobStroke` | Brush | Knob border color | null |
| `KnobStrokeThickness` | double | Knob border width | 0 |
| `TailLength` | double | Tail length | 0.2 |
| `TailLengthUnit` | SizeUnit | Unit for tail length (Pixel/Factor) | Factor |
| `TailWidth` | double | Tail width | 10 |
| `TailFill` | Brush | Tail color | #424242 |

### Events

| Event | Description |
|-------|-------------|
| `ValueChangeStarted` | Drag begins |
| `ValueChanging` | Value changing (cancelable) |
| `ValueChanged` | Value changed |
| `ValueChangeCompleted` | Drag completed |

### Usage

```xaml
<gauge:NeedlePointer Value="75"
                     NeedleLength="0.8"
                     NeedleStartWidth="2"
                     NeedleEndWidth="12"
                     NeedleFill="Red"
                     KnobRadius="15"
                     KnobFill="White"
                     KnobStroke="Red"
                     TailLength="0.15"
                     EnableAnimation="True" />
```

---

## Shape Pointer

Marker shapes at specific axis values.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Value` | double | Pointer value | 0 |
| `EnableAnimation` | bool | Enable animation | false |
| `AnimationDuration` | double | Animation duration (ms) | 1500 |
| `AnimationEasingFunction` | EasingFunctionBase | Easing function | null |
| `IsInteractive` | bool | Enable dragging | false |
| `ShapeType` | GaugeShapeType | Shape (Circle/Diamond/Rectangle/Triangle/InvertedTriangle/Image/Text) | Circle |
| `ShapeHeight` | double | Shape height | 10 |
| `ShapeWidth` | double | Shape width | 10 |
| `Fill` | Brush | Shape fill color | #424242 |
| `Stroke` | Brush | Shape border color | null |
| `StrokeThickness` | double | Border width | 0 |
| `MarkerOffset` | double | Distance from axis | 0 |
| `OffsetUnit` | SizeUnit | Unit for offset (Pixel/Factor) | Pixel |
| `HasShadow` | bool | Enable shadow | false |
| `OverlayFill` | Brush | Inner overlay color | null |
| `OverlayRadius` | double | Overlay size (0-1) | 0 |

### Usage

```xaml
<gauge:ShapePointer Value="70"
                    ShapeType="Diamond"
                    ShapeHeight="20"
                    ShapeWidth="20"
                    Fill="Orange"
                    Stroke="Black"
                    StrokeThickness="2"
                    MarkerOffset="-15"
                    HasShadow="True" />
```

---

## Content Pointer

Custom UI elements as pointers.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Value` | double | Pointer value | 0 |
| `EnableAnimation` | bool | Enable animation | false |
| `AnimationDuration` | double | Animation duration (ms) | 1500 |
| `AnimationEasingFunction` | EasingFunctionBase | Easing function | null |
| `IsInteractive` | bool | Enable dragging | false |
| `Content` | object | Any UIElement | null |

### Usage

```xaml
<gauge:ContentPointer Value="50">
    <gauge:ContentPointer.Content>
        <Border Background="White"
                BorderBrush="Black"
                BorderThickness="2"
                Padding="5">
            <TextBlock Text="50"
                       FontWeight="Bold" />
        </Border>
    </gauge:ContentPointer.Content>
</gauge:ContentPointer>
```

---

## Range Pointer

Arc segment from axis start to pointer value.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `Value` | double | Pointer value | 0 |
| `EnableAnimation` | bool | Enable animation | false |
| `AnimationDuration` | double | Animation duration (ms) | 1500 |
| `AnimationEasingFunction` | EasingFunctionBase | Easing function | null |
| `IsInteractive` | bool | Enable dragging | false |
| `PointerWidth` | double | Arc width | 10 |
| `WidthUnit` | SizeUnit | Unit for width (Pixel/Factor) | Pixel |
| `CornerStyle` | CornerStyle | End shape (BothFlat/BothCurve/StartCurve/EndCurve) | BothFlat |
| `Background` | Brush | Pointer color | #424242 |
| `GradientStops` | ObservableCollection<GaugeGradientStop> | Gradient colors | Empty |
| `PointerOffset` | double | Distance from axis | 0 |
| `OffsetUnit` | SizeUnit | Unit for offset (Pixel/Factor) | Pixel |

### Usage

```xaml
<gauge:RangePointer Value="75"
                    PointerWidth="20"
                    CornerStyle="BothCurve"
                    Background="Green"
                    EnableAnimation="True">
    <gauge:RangePointer.GradientStops>
        <gauge:GaugeGradientStop Value="0" Color="Blue" />
        <gauge:GaugeGradientStop Value="75" Color="Red" />
    </gauge:RangePointer.GradientStops>
</gauge:RangePointer>
```

---

## Marker Pointer

Base class for Shape and Content pointers.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `MarkerOffset` | double | Distance from axis | 0 |
| `OffsetUnit` | SizeUnit | Unit for offset (Pixel/Factor) | Pixel |

---

## Gauge Range

Visual segments highlighting value zones.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `StartValue` | double | Range start | 0 |
| `EndValue` | double | Range end | 0 |
| `StartWidth` | double | Width at start | 10 |
| `EndWidth` | double | Width at end | 10 |
| `WidthUnit` | SizeUnit | Unit for widths (Pixel/Factor) | Pixel |
| `Background` | Brush | Range color | Transparent |
| `GradientStops` | ObservableCollection<GaugeGradientStop> | Gradient colors | Empty |
| `RangeOffset` | double | Distance from axis | 0 |
| `OffsetUnit` | SizeUnit | Unit for offset (Pixel/Factor) | Pixel |
| `Label` | string | Range label text | null |
| `LabelTemplate` | DataTemplate | Custom label template | null |
| `FontSize` | double | Label font size | 12 |
| `FontWeight` | FontWeight | Label font weight | Normal |
| `FontFamily` | FontFamily | Label font family | Segoe UI |
| `FontStyle` | FontStyle | Label font style | Normal |
| `Foreground` | Brush | Label text color | Black |

### Usage

```xaml
<gauge:GaugeRange StartValue="0"
                  EndValue="50"
                  StartWidth="15"
                  EndWidth="15"
                  Background="Green"
                  Label="Safe"
                  FontSize="18"
                  RangeOffset="0.3"
                  OffsetUnit="Factor">
    <gauge:GaugeRange.GradientStops>
        <gauge:GaugeGradientStop Value="0" Color="#00FF00" />
        <gauge:GaugeGradientStop Value="50" Color="#8BC34A" />
    </gauge:GaugeRange.GradientStops>
</gauge:GaugeRange>
```

---

## Gauge Annotation

Custom UI elements at specific positions.

### Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `DirectionUnit` | AnnotationDirection | Position mode (Angle/AxisValue) | Angle |
| `DirectionValue` | double | Angle (0-360°) or axis value | 0 |
| `PositionFactor` | double | Distance from center (0-1+) | 0 |
| `Content` | object | Any UIElement | null |
| `HorizontalAlignment` | HorizontalAlignment | Horizontal alignment | Center |
| `VerticalAlignment` | VerticalAlignment | Vertical alignment | Center |

### Usage

```xaml
<gauge:GaugeAnnotation DirectionUnit="AxisValue"
                       DirectionValue="75"
                       PositionFactor="0.5"
                       HorizontalAlignment="Center"
                       VerticalAlignment="Center">
    <gauge:GaugeAnnotation.Content>
        <StackPanel>
            <Image Source="Assets/icon.png"
                   Width="40"
                   Height="40" />
            <TextBlock Text="75"
                       FontSize="24"
                       FontWeight="Bold"
                       HorizontalAlignment="Center" />
        </StackPanel>
    </gauge:GaugeAnnotation.Content>
</gauge:GaugeAnnotation>
```

---

## Enumerations

### SizeUnit

```csharp
public enum SizeUnit
{
    Pixel,   // Absolute pixels
    Factor   // Factor of radius (0-1)
}
```

### GaugeLabelsPosition

```csharp
public enum GaugeLabelsPosition
{
    Inside,   // Labels inside axis line
    Outside   // Labels outside axis line
}
```

### GaugeElementPosition

```csharp
public enum GaugeElementPosition
{
    Inside,   // Element inside axis line
    Outside,  // Element outside axis line
    Cross     // Element crosses axis line
}
```

### GaugeShapeType

```csharp
public enum GaugeShapeType
{
    Circle,
    Diamond,
    Rectangle,
    Triangle,
    InvertedTriangle,
    Image,
    Text
}
```

### CornerStyle

```csharp
public enum CornerStyle
{
    BothFlat,    // Both ends flat
    BothCurve,   // Both ends rounded
    StartCurve,  // Start rounded, end flat
    EndCurve     // Start flat, end rounded
}
```

### AnnotationDirection

```csharp
public enum AnnotationDirection
{
    Angle,      // Position by angle (0-360°)
    AxisValue   // Position by axis value
}
```

---

## Event Arguments

### LabelPreparedEventArgs

```csharp
public class LabelPreparedEventArgs : EventArgs
{
    public string LabelText { get; set; }  // Modify label text
    public double Value { get; }            // Axis value for label
}
```

### AxisTappedEventArgs

```csharp
public class AxisTappedEventArgs : EventArgs
{
    public double Value { get; }  // Axis value at tap position
}
```

### ValueChangingEventArgs

```csharp
public class ValueChangingEventArgs : EventArgs
{
    public double Value { get; }      // Current value
    public double NewValue { get; }   // New value being set
    public bool Cancel { get; set; }  // Cancel value change
}
```

### ValueChangedEventArgs

```csharp
public class ValueChangedEventArgs : EventArgs
{
    public double Value { get; }  // New pointer value
}
```

---

## Helper Classes

### GaugeGradientStop

Defines color at specific value for gradients.

```csharp
public class GaugeGradientStop
{
    public double Value { get; set; }  // Axis value
    public Color Color { get; set; }   // Color at this value
}
```

**Usage:**
```xaml
<gauge:GaugeGradientStop Value="25" Color="#FF0000" />
<gauge:GaugeGradientStop Value="75" Color="#00FF00" />
```

---

## Quick Property Lookup

### Common Size Properties

All support both Pixel and Factor units via corresponding `*Unit` property:

- `AxisLineWidth` / `AxisLineWidthUnit`
- `MajorTickLength` / `TickLengthUnit`
- `MinorTickLength` / `TickLengthUnit`
- `NeedleLength` / `NeedleLengthUnit`
- `KnobRadius` / `KnobSizeUnit`
- `TailLength` / `TailLengthUnit`
- `PointerWidth` / `WidthUnit`
- `StartWidth` / `WidthUnit`
- `EndWidth` / `WidthUnit`
- `LabelOffset` / `OffsetUnit`
- `TickOffset` / `OffsetUnit`
- `MarkerOffset` / `OffsetUnit`
- `PointerOffset` / `OffsetUnit`
- `RangeOffset` / `OffsetUnit`

### Common Color Properties

- `AxisLineFill` - Axis line color
- `NeedleFill` - Needle color
- `KnobFill` / `KnobStroke` - Knob colors
- `TailFill` - Tail color
- `Fill` / `Stroke` - Shape pointer colors
- `Background` - Range/pointer color
- `Foreground` - Label/text color

### Common Visibility Properties

- `ShowAxisLine`
- `ShowLabels`
- `ShowTicks`
- `ShowFirstLabel`
- `ShowLastLabel`

---

## Additional Resources

- [Official API Documentation](https://help.syncfusion.com/cr/winui/Syncfusion.UI.Xaml.Gauges.html)
- [GitHub Samples](https://github.com/syncfusion/winui-demos/tree/master/radialgauge)
