# Pointers and Indicators

## Table of Contents
- [Pointer Overview](#pointer-overview)
- [Pointer Types](#pointer-types)
    - [Marker Pointers](#marker-pointers)
    - [Bar Pointers](#bar-pointers)
- [Marker Pointers](#marker-pointers)
- [Bar Pointers](#bar-pointers-1)
- [Marker Shapes](#marker-shapes)
    - [Built-in Marker Types](#built-in-marker-types)
    - [Complete Marker Shape Example](#complete-marker-shape-example)
- [Custom Marker Types](#custom-marker-types)
    - [Image Markers](#image-markers)
    - [Text Markers](#text-markers)
- [Pointer Styling](#pointer-styling)
    - [Position and Placement](#position-and-placement)
    - [Color and Opacity](#color-and-opacity)
    - [Border Customization](#border-customization)
    - [Offset Configuration](#offset-configuration)
- [Animation](#animation)
- [Multiple Pointers](#multiple-pointers)
- [Advanced Configurations](#advanced-configurations)

## Pointer Overview

Pointers indicate values on a gauge axis. They are the primary visual element showing where on the scale a measurement lies. Key characteristics:

- **Value Property** - Sets the pointer's position on the axis
- **Type Property** - Determines pointer style (Marker or Bar)
- **MarkerType Property** - For markers, defines the shape
- **Position Property** - Controls placement relative to axis (Inside, Outside, Cross, Auto)
- **Placement Property** - For markers, controls positioning (Near, Center, Far, None)

## Pointer Types

The Linear Gauge supports two main pointer types.

### Marker Pointers

Marker pointers are shapes that mark values on the axis. Useful for precise point indicators and target markers.

```cshtml
<e-lineargauge-pointers>
    <e-lineargauge-pointer value="50" type="Marker"></e-lineargauge-pointer>
</e-lineargauge-pointers>
```

**Characteristics:**
- Renders as a shape (default: InvertedTriangle)
- Can be positioned inside or outside axis
- Supports various marker shapes
- Good for comparing multiple values

### Bar Pointers

Bar pointers track values from the start of the gauge to a specified value. Useful for progress indicators and percentage displays.

```cshtml
<e-lineargauge-pointers>
    <e-lineargauge-pointer value="65" type="Bar"></e-lineargauge-pointer>
</e-lineargauge-pointers>
```

**Characteristics:**
- Fills from minimum value to pointer value
- Renders as a bar/rectangle
- Excellent for progress indicators
- Provides immediate visual understanding of position

## Marker Pointers

Marker pointers use shapes to indicate values.

```cshtml
<ejs-lineargauge id="gauge" title="Temperature">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="-20" maximum="50">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="10" 
                                        type="Marker"
                                        markerType="Circle">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Marker Customization:**
- `Height` - Shape size vertically
- `Width` - Shape size horizontally
- `Color` - Fill color of the marker
- `Offset` - Distance from axis
- `Opacity` - Transparency (0-1)
- `Position` - The position of the pointer can be changed by setting the value as Inside, Outside, Cross, or Auto
- `Border` - To set the color and width for the border of the pointer
- `Placement` - To place the pointer in the specified position. By default, the pointer is placed `Far` from the axis. To change the placement, set the Placement property as `Near`, `Center`, or `None`
- `AnimationDuration` - To specify the duration of the animation in pointer

## Bar Pointers

Bar pointers fill from start to end value.

```cshtml
<ejs-lineargauge id="progress" orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75" 
                                        type="Bar"
                                        width="10"
                                        color="#2196F3">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Bar Customization:**
- `Width` - Bar thickness
- `Color` - Fill color
- `Offset` - Distance from default position
- `Opacity` - Transparency (0-1)
- `RoundedCornerRadius` - Corner radius for rounded bars
- `Border` - Custom border styling
- `AnimationDuration` - To set the duration of the animation in bar pointer

## Marker Shapes

The `MarkerType` property defines the shape for marker pointers.

### Built-in Marker Types

```cshtml
<!-- Circle -->
<e-lineargauge-pointer value="25" type="Marker" markerType="Circle"></e-lineargauge-pointer>

<!-- Rectangle -->
<e-lineargauge-pointer value="35" type="Marker" markerType="Rectangle"></e-lineargauge-pointer>

<!-- Triangle -->
<e-lineargauge-pointer value="45" type="Marker" markerType="Triangle"></e-lineargauge-pointer>

<!-- InvertedTriangle (default) -->
<e-lineargauge-pointer value="55" type="Marker" markerType="InvertedTriangle"></e-lineargauge-pointer>

<!-- Diamond -->
<e-lineargauge-pointer value="65" type="Marker" markerType="Diamond"></e-lineargauge-pointer>

<!--Image-->
<e-lineargauge-pointer value="60" markerType="Image" offset="-47" width="40" height="40" imageUrl="https://ej2.syncfusion.com/aspnetcore/styles/images/lineargauge/step-count.png"></e-lineargauge-pointer>

<!--Text-->
<e-lineargauge-pointer value="13" markerType="Text" text="Low" color="black" offset="-55" textStyle="textStyle"></e-lineargauge-pointer>
```

**Shape Characteristics:**
- **Circle** - Most commonly used; easy to recognize
- **Rectangle** - Compact; good for tight spacing
- **Triangle** - Directional; points upward
- **InvertedTriangle** - Points downward; default marker
- **Diamond** - Unique; stands out visually

### Complete Marker Shape Example

```cshtml
<ejs-lineargauge id="shapes-demo" title="Marker Shapes">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="10" type="Marker" markerType="Circle" color="#FF5722"></e-lineargauge-pointer>
                <e-lineargauge-pointer value="30" type="Marker" markerType="Rectangle" color="#009688"></e-lineargauge-pointer>
                <e-lineargauge-pointer value="50" type="Marker" markerType="Diamond" color="#2196F3"></e-lineargauge-pointer>
                <e-lineargauge-pointer value="70" type="Marker" markerType="Triangle" color="#FFC107"></e-lineargauge-pointer>
                <e-lineargauge-pointer value="90" type="Marker" markerType="InvertedTriangle" color="#9C27B0"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Custom Marker Types

### Image Markers

Use custom images as markers.

```cshtml
<e-lineargauge-pointer value="50" 
                        type="Marker"
                        markerType="Image"
                        imageUrl="https://example.com/marker.png"
                        height="30"
                        width="30">
</e-lineargauge-pointer>
```

**Image Marker Requirements:**
- URL must be accessible
- Image should be square or appropriate aspect ratio
- Height and width define display size
- Supports PNG, JPG, GIF, SVG formats

### Text Markers

Display custom text as markers.

```cshtml
<e-lineargauge-pointer value="50" 
                        type="Marker"
                        markerType="Text"
                        text="NOW"
                        textStyle="textStyle">
</e-lineargauge-pointer>
```

**Text Marker Styling:**
- `FontFamily` - Font type (Arial, Verdana, etc.)
- `FontStyle` - Style (normal, italic, oblique)
- `FontWeight` - Weight (normal, bold, lighter, 100-900)
- `Size` - Font size (e.g., "12px", "1em")
- `Color` - Text color

**Complete Text Marker Example:**

```cshtml
@{
    var textStyle = new LinearGaugeFont
    {
        Color = "white",
        Size = "12px",
        FontWeight = "Bold",
        FontFamily = "Arial"
    };
}

<ejs-lineargauge id="text-pointer" title="Status Indicator">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75"
                                       type="Marker"
                                       markerType="Text"
                                       text="75%"
                                       height="20"
                                       width="30"
                                       textStyle="textStyle">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Pointer Styling

### Position and Placement

```cshtml
<!-- Position: Inside or Outside the axis -->
<e-lineargauge-pointer value="50" type="Marker" position="Inside"></e-lineargauge-pointer>

<!-- Placement: For marker pointers (Near, Center, Far, None) -->
<e-lineargauge-pointer value="50" type="Marker" placement="Center"></e-lineargauge-pointer>
```

### Color and Opacity

```cshtml
<e-lineargauge-pointer value="50" 
                        type="Marker"
                        color="#FF5722"
                        opacity="0.8"
                        markerType="Circle">
</e-lineargauge-pointer>
```

### Border Customization

```cshtml
<e-lineargauge-pointer value="50" type="Marker">
    <e-pointer-border color="#333333" width="2"></e-pointer-border>
</e-lineargauge-pointer>
```

### Offset Configuration

```cshtml
<!-- Distance from axis -->
<e-lineargauge-pointer value="50" type="Marker" offset="15"></e-lineargauge-pointer>

<!-- For bar pointer -->
<e-lineargauge-pointer value="50" type="Bar" offset="10"></e-lineargauge-pointer>
```

## Animation

Pointers animate when the gauge loads or values change.

```cshtml
<e-lineargauge-pointer value="75" 
                        type="Bar"
                        animationDuration="1000">
</e-lineargauge-pointer>
```

**Animation Properties:**
- `AnimationDuration` - Duration in milliseconds (0-5000)
- Default: ~1000ms
- Set to 0 to disable animation

**Animation Example:**

```cshtml
<ejs-lineargauge id="animation-demo" title="Animated Pointer">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <!-- Slow animation (3 seconds) -->
                <e-lineargauge-pointer value="30" 
                                        type="Bar"
                                        animationDuration="3000">
                </e-lineargauge-pointer>
                
                <!-- Fast animation (500ms) -->
                <e-lineargauge-pointer value="70" 
                                        type="Marker"
                                        animationDuration="500">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Multiple Pointers

Use multiple pointers to compare values or show target vs actual.

```cshtml
<ejs-lineargauge id="multi-pointer" title="Actual vs Target">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <!-- Actual value -->
                <e-lineargauge-pointer value="65" 
                                        type="Bar"
                                        color="#2196F3"
                                        width="8">
                </e-lineargauge-pointer>
                
                <!-- Target value -->
                <e-lineargauge-pointer value="80" 
                                        type="Marker"
                                        markerType="Circle"
                                        color="#FF5722"
                                        height="15"
                                        width="15">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Multi-Pointer Best Practices:**
- Limit to 2-3 pointers for clarity
- Use different colors for each pointer
- Use different types (marker + bar) for distinction
- Add annotations to label each pointer

## Advanced Configurations

**Pattern 1: Linear Gradient-Colored Pointer**

```cshtml
<ejs-lineargauge id="linear" load="onGaugeLoad" orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75"
                                       type="Bar"
                                       width="20">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
function onGaugeLoad(args) {
    var gauge = args.gauge;
    var axis = gauge.axes[0];

    axis.pointers[0].linearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#00FF00', offset: '0%', opacity: 1 },
            { color: '#FF0000', offset: '100%', opacity: 1 }
        ]
    };
}
</script>
```

**Pattern 2: Radial Gradient-Colored Pointer**

```cshtml
<ejs-lineargauge id="linear" load="onGaugeLoad" orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75"
                                       type="Bar"
                                       width="20">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
function onGaugeLoad(args) {
    var gauge = args.gauge;
    var axis = gauge.axes[0];

    axis.pointers[0].radialGradient = {
        radius: '70%',
        innerPosition: { x: '30%', y: '30%' },
        outerPosition: { x: '70%', y: '70%' },
        colorStop: [
            { color: '#00FF00', offset: '0%', opacity: 1 },
            { color: '#FF0000', offset: '100%', opacity: 1 }
        ]
    };
}
</script>
```

**Pattern 3: Responsive Pointer Size**

```cshtml
<e-lineargauge-pointer value="50" 
                        type="Marker"
                        markerType="Circle"
                        height="20"
                        width="20">
</e-lineargauge-pointer>
```

**Pattern 4: Hidden Pointer with Bar Fill**

```cshtml
<!-- Bar pointer with full opacity, marker pointer invisible -->
<e-lineargauge-pointer value="75" type="Bar" opacity="1"></e-lineargauge-pointer>
<e-lineargauge-pointer value="75" type="Marker" opacity="0"></e-lineargauge-pointer>
```

**Pattern 5: Multi-Axis Pointers**

```cshtml
<ejs-lineargauge id="multi-axis-pointers">
    <e-lineargauge-axes>
        <!-- First axis with marker pointer -->
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="45" type="Marker" markerType="Circle"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
        
        <!-- Second axis with bar pointer -->
        <e-lineargauge-axis minimum="0" maximum="1000">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="650" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```
