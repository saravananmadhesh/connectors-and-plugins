# Annotations

## Table of Contents
- [Annotation Basics](#annotation-basics)
- [Adding Text Annotations](#adding-text-annotations)
  - [Simple Text Annotation](#simple-text-annotation)
  - [HTML Content Annotation](#html-content-annotation)
- [Adding Image Annotations](#adding-image-annotations)
- [Positioning Annotations](#positioning-annotations)
  - [Axis-Based Positioning](#axis-based-positioning)
  - [Pixel-Based Positioning](#pixel-based-positioning)
- [Z-Index and Layering](#z-index-and-layering)
- [Alignment Configuration](#alignment-configuration)
  - [Horizontal Alignment](#horizontal-alignment)
  - [Vertical Alignment](#vertical-alignment)
- [Multiple Annotations](#multiple-annotations)
- [Styling and Customization](#styling-and-customization)
  - [Custom Styled Annotations](#custom-styled-annotations)
  - [Dynamic Annotation Updates](#dynamic-annotation-updates)
  - [Pattern: Status Indicator Annotation](#pattern-status-indicator-annotation)
  
## Annotation Basics

Annotations are custom HTML elements, text, or images placed anywhere on the gauge to provide labels, notes, or visual enhancements.

**Common Uses:**
- Label important zones or ranges
- Display gauge title or unit information
- Add icons or status indicators
- Highlight specific values or events
- Provide contextual information

**Key Annotation Properties:**
- `Content` - HTML element ID or HTML string
- `AxisValue` - Position on axis (numeric value)
- `AxisIndex` - Which axis to use (for multi-axis gauges)
- `X` - Horizontal pixel position
- `Y` - Vertical pixel position
- `HorizontalAlignment` - Center, Near, Far, None
- `VerticalAlignment` - Center, Near, Far, None
- `ZIndex` - Stacking order
- `Font` - Sets and gets the options to customize the font of the annotation in linear gauge

## Adding Text Annotations

Use annotations to add text labels and information.

### Simple Text Annotation

```cshtml
<ejs-lineargauge id="gauge" title="Temperature Gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="Current: 75°C"
                                   axisValue="75"
                                   x="100"
                                   y="100"
                                   zIndex="1">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

### HTML Content Annotation

Create custom HTML annotations:

```cshtml
<!-- Define annotation content -->
<script type="text/html" id="custom-annotation">
    <div style="background: white; padding: 8px 12px; border-radius: 4px; border: 1px solid #ccc;">
        <strong>Target: 100°C</strong>
    </div>
</script>

<!-- Use in gauge -->
<ejs-lineargauge id="gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="#custom-annotation"
                                   x="150"
                                   y="150"
                                   zIndex="1">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

## Adding Image Annotations

Use images as annotations for icons or visual indicators.

```cshtml
<ejs-lineargauge id="gauge" title="Server Status">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="100" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <!-- Status icon -->
        <e-lineargauge-annotation content="<img src='/images/status-ok.png' width='32' height='32' />"
                                   x="200"
                                   y="50"
                                   zIndex="1">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

**Image Best Practices:**
- Use small, optimized images
- Specify width and height to prevent layout shifts
- Use SVG for scalable icons
- Ensure images load before gauge renders

## Positioning Annotations

### Axis-Based Positioning

Position annotations relative to axis values.

```cshtml
<e-lineargauge-annotations>
    <!-- Position at specific axis value -->
    <e-lineargauge-annotation content="Min Temp"
                               axisIndex="0"
                               axisValue="0">
    </e-lineargauge-annotation>
    
    <!-- Position at another axis value -->
    <e-lineargauge-annotation content="Max Temp"
                               axisIndex="0"
                               axisValue="100">
    </e-lineargauge-annotation>
</e-lineargauge-annotations>
```

### Pixel-Based Positioning

Position annotations using fixed pixel coordinates.

```cshtml
<e-lineargauge-annotations>
    <!-- Top-left corner -->
    <e-lineargauge-annotation content="Top Left" x="10" y="10">
    </e-lineargauge-annotation>
    
    <!-- Center -->
    <e-lineargauge-annotation content="Center" x="300" y="200">
    </e-lineargauge-annotation>
    
    <!-- Bottom-right corner -->
    <e-lineargauge-annotation content="Bottom Right" x="590" y="390">
    </e-lineargauge-annotation>
</e-lineargauge-annotations>
```

**Coordinate System:**
- Origin (0, 0) is top-left of gauge container
- X increases rightward
- Y increases downward

## Z-Index and Layering

The `ZIndex` property controls which annotations appear in front when overlapping.

```cshtml
<e-lineargauge-annotations>
    <!-- Background annotation (lower z-index) -->
    <e-lineargauge-annotation content="<div style='background: lightgray; padding: 20px;'>Background</div>"
                               x="50"
                               y="50"
                               z-index="1">
    </e-lineargauge-annotation>
    
    <!-- Foreground annotation (higher z-index) -->
    <e-lineargauge-annotation content="<div style='background: white; padding: 10px; border: 2px solid black;'>Foreground</div>"
                               x="70"
                               y="70"
                               z-index="10">
    </e-lineargauge-annotation>
</e-lineargauge-annotations>
```

**Z-Index Behavior:**
- Higher values appear in front
- Overlapping annotations show based on z-index
- Default z-index: 1
- Useful for layering labels and backgrounds

## Alignment Configuration

Control how annotations align relative to their position.

### Horizontal Alignment

```cshtml
<e-lineargauge-annotations>
    <!-- Align to the left of position -->
    <e-lineargauge-annotation content="Left"
                               x="200"
                               y="100"
                               horizontalAlignment="Near"
                               z-index="1">
    </e-lineargauge-annotation>
    
    <!-- Center around position -->
    <e-lineargauge-annotation content="Center"
                               x="200"
                               y="150"
                               horizontalAlignment="Center"
                               z-index="1">
    </e-lineargauge-annotation>
    
    <!-- Align to the right of position -->
    <e-lineargauge-annotation content="Right"
                               x="200"
                               y="200"
                               horizontalAlignment="Far"
                               z-index="1">
    </e-lineargauge-annotation>
</e-lineargauge-annotations>
```

### Vertical Alignment

```cshtml
<e-lineargauge-annotations>
    <!-- Align above position -->
    <e-lineargauge-annotation content="Top"
                               x="100"
                               y="100"
                               verticalAlignment="Near"
                               z-index="1">
    </e-lineargauge-annotation>
    
    <!-- Center around position -->
    <e-lineargauge-annotation content="Middle"
                               x="200"
                               y="100"
                               verticalAlignment="Center"
                               z-index="1">
    </e-lineargauge-annotation>
    
    <!-- Align below position -->
    <e-lineargauge-annotation content="Bottom"
                               x="300"
                               y="100"
                               verticalAlignment="Far"
                               z-index="1">
    </e-lineargauge-annotation>
</e-lineargauge-annotations>
```

**Important:** Alignment only applies when X and Y are NOT specified. When X and Y are set, alignment is ignored.

## Multiple Annotations

Add multiple annotations for complex labeling.

```cshtml
<ejs-lineargauge id="gauge" title="Multi-Zone Gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="33" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="33" end="66" color="#FFC107"></e-lineargauge-range>
                <e-lineargauge-range start="66" end="100" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="65" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <!-- Zone labels -->
        <e-lineargauge-annotation content="<strong>Good</strong>"
                                   axisValue="16"
                                   x="100"
                                   y="50"
                                   z-index="1">
        </e-lineargauge-annotation>
        
        <e-lineargauge-annotation content="<strong>Fair</strong>"
                                   axisValue="50"
                                   x="250"
                                   y="50"
                                   z-index="1">
        </e-lineargauge-annotation>
        
        <e-lineargauge-annotation content="<strong>Poor</strong>"
                                   axisValue="83"
                                   x="400"
                                   y="50"
                                   z-index="1">
        </e-lineargauge-annotation>
        
        <!-- Current value label -->
        <e-lineargauge-annotation content="<div style='font-size: 16px; font-weight: bold;'>Current: 65</div>"
                                   axisValue="65"
                                   x="300"
                                   y="150"
                                   z-index="10">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

## Styling and Customization

### Custom Styled Annotations

```cshtml
<script type="text/html" id="styled-annotation">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                font-weight: bold;
                text-align: center;">
        Performance: Excellent
    </div>
</script>

<ejs-lineargauge id="gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="#styled-annotation" x="200" y="150">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

### Dynamic Annotation Updates

```cshtml
<ejs-lineargauge id="gauge" title="Live Data" valueChange="valueChange">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50"
                                       type="Bar"
                                       enableDrag="true"
                                       width="10">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>

    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="Value: 50"
                                  x="250"
                                  y="100"
                                  zIndex="1">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>

<script>
function valueChange(args) {
    var gauge = document.getElementById('gauge').ej2_instances[0];
    var annotationContent = 'Value: ' + Math.round(args.value);
    // Update annotation text dynamically
    gauge.setAnnotationValue(0, annotationContent, args.value);
}
</script>
```

### Pattern: Status Indicator Annotation

```cshtml
<script type="text/html" id="status-annotation">
    <div id="status-display"
         style="width: 24px; height: 24px; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                color: white; font-weight: bold; background-color: #F44336;">
        !
    </div>
</script>

<ejs-lineargauge id="gauge"
                 title="Live Data"
                 valueChange="valueChange"
                 loaded="onLoaded">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="100" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>

            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="60"
                                       type="Bar"
                                       enableDrag="true"
                                       width="10">
                </e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>

    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="#status-annotation"
                                  x="350"
                                  y="50"
                                  zIndex="1">
        </e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>

<script>
    function updateStatus(value) {
        var statusEl = document.getElementById('status-display');
        if (!statusEl) return;
           console.log("1")
        if (value <= 50) {
            statusEl.style.backgroundColor = '#4CAF50';
            statusEl.textContent = '✓';
            console.log("1")
        } else {
            statusEl.style.backgroundColor = '#F44336';
            statusEl.textContent = '!';
            console.log("1")
        }
    }

    function onLoaded() {
        var gauge = document.getElementById('gauge').ej2_instances[0];
        var currentValue = gauge.axes[0].pointers[0].value;
        updateStatus(currentValue);
    }

    function valueChange(args) {
        updateStatus(args.value);
    }
</script>
```