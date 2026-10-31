# Ranges and Values Configuration

## Table of Contents
- [Range Basics](#range-basics)
- [Defining Single Range](#defining-single-range)
- [Multiple Ranges](#multiple-ranges)
- [Range Customization](#range-customization)
  - [Position Configuration](#position-configuration)
  - [Offset Configuration](#offset-configuration)
  - [Variable Width Ranges](#variable-width-ranges)
  - [Border Customization](#border-customization)
- [Axis Value Binding](#axis-value-binding)
- [Range Colors and Styling](#range-colors-and-styling)
  - [Standard Colors](#standard-colors)
  - [Using Range Colors for Labels](#using-range-colors-for-labels)
- [Gradient Colors](#gradient-colors)
  - [Linear Gradient](#linear-gradient)
  - [Radial Gradient](#radial-gradient)
- [Advanced Patterns](#advanced-patterns)

## Range Basics

A range represents a set of values on the gauge axis. Ranges are color zones that highlight different value regions. Common use cases:
- Temperature zones (cold=blue, warm=green, hot=red)
- Performance levels (poor=red, acceptable=yellow, excellent=green)
- Progress indicators (incomplete=gray, in-progress=blue, complete=green)

**Key Properties:**
- `Start` - Beginning value of the range
- `End` - Ending value of the range
- `Color` - Fill color for the range
- `StartWidth` - Range thickness at start position
- `EndWidth` - Range thickness at end position
- `Position` - Range placement (Inside, Outside, Cross, Auto)
- `Offset` - Distance from axis
- `Border` - Customize color and width of range border.

## Defining Single Range

A single range creates one colored zone on the gauge axis.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="100" color="green">
                </e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Behavior:**
- Renders a green zone from 0 to 100 (entire axis)
- Default position: Outside the axis
- Default start and end width: 10

## Multiple Ranges

Multiple ranges divide the axis into color zones.

```cshtml
<ejs-lineargauge id="temperature" title="Temperature Gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <!-- Cold zone -->
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="25" color="#3498db">
                </e-lineargauge-range>
                <!-- Cool zone -->
                <e-lineargauge-range start="25" end="50" color="#2ecc71">
                </e-lineargauge-range>
                <!-- Warm zone -->
                <e-lineargauge-range start="50" end="75" color="#f39c12">
                </e-lineargauge-range>
                <!-- Hot zone -->
                <e-lineargauge-range start="75" end="100" color="#e74c3c">
                </e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="75" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Rendering Order:**
- Ranges render in the order they are defined
- Later ranges can overlap earlier ones
- All ranges render by default

**Best Practices:**
- Define ranges in ascending order by start value
- Avoid overlapping range definitions
- Use 3-5 ranges for clarity; more than 7 becomes confusing

## Range Customization

### Position Configuration

The `Position` property controls where ranges appear relative to the axis.

```cshtml
<e-lineargauge-axis minimum="0" maximum="100">
    <e-lineargauge-ranges>
        <!-- Outside: Range appears below/right of axis (default) -->
        <e-lineargauge-range start="0" end="50" color="green" position="Outside">
        </e-lineargauge-range>
        
        <!-- Inside: Range appears above/left of axis -->
        <e-lineargauge-range start="50" end="100" color="red" position="Inside">
        </e-lineargauge-range>
    </e-lineargauge-ranges>
</e-lineargauge-axis>
```

### Offset Configuration

The `Offset` property specifies distance from the axis.

```cshtml
<e-lineargauge-range start="0" end="100" 
                      color="blue" 
                      position="Outside"
                      offset="10">
</e-lineargauge-range>
```

### Variable Width Ranges

Use `StartWidth` and `EndWidth` for tapered ranges.

```cshtml
<e-lineargauge-range start="0" end="50" 
                      color="green"
                      startWidth="5"
                      endWidth="20">
</e-lineargauge-range>

<e-lineargauge-range start="50" end="100" 
                      color="red"
                      startWidth="20"
                      endWidth="5">
</e-lineargauge-range>
```

### Border Customization

```cshtml
<e-lineargauge-range start="0" end="100" color="blue">
    <e-range-border color="black" width="2"></e-range-border>
</e-lineargauge-range>
```

## Axis Value Binding

The axis minimum and maximum define the gauge scale.

```cshtml
<e-lineargauge-axis minimum="0" maximum="200">
    <e-lineargauge-ranges>
        <e-lineargauge-range start="0" end="50" color="blue"></e-lineargauge-range>
        <e-lineargauge-range start="50" end="150" color="green"></e-lineargauge-range>
        <e-lineargauge-range start="150" end="200" color="red"></e-lineargauge-range>
    </e-lineargauge-ranges>
    <e-lineargauge-pointers>
        <e-lineargauge-pointer value="120" type="Bar"></e-lineargauge-pointer>
    </e-lineargauge-pointers>
</e-lineargauge-axis>
```

**Key Points:**
- All range start/end values must be within axis minimum/maximum
- Pointer values must be within axis range
- Axis range determines scale of visual representation

**Range Percentage Calculation:**
- For axis 0-100 with range 0-50: range covers 50% of gauge
- For axis 0-200 with range 0-50: range covers 25% of gauge

## Range Colors and Styling

### Standard Colors

```cshtml
<e-lineargauge-ranges>
    <e-lineargauge-range start="0" end="25" color="#FF0000"></e-lineargauge-range>
    <e-lineargauge-range start="25" end="50" color="orange"></e-lineargauge-range>
    <e-lineargauge-range start="50" end="75" color="yellow"></e-lineargauge-range>
    <e-lineargauge-range start="75" end="100" color="green"></e-lineargauge-range>
</e-lineargauge-ranges>
```

**Color Format Support:**
- Hex: `#FF0000`, `#F00`
- RGB: `rgb(255, 0, 0)`
- Named: `red`, `green`, `blue`
- CSS variables: `var(--primary-color)`

### Using Range Colors for Labels

Make axis labels match their corresponding range color:

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-axis-labelstyle useRangeColor="true"></e-axis-labelstyle>
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="green"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="100" color="red"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Gradient Colors

Gradients provide smooth color transitions across ranges.

### Linear Gradient

Linear gradients transition colors in a linear progression.

```cshtml
<ejs-lineargauge id="linear" load="onGaugeLoad" orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0"
                                     end="100"
                                     color="green"
                                     startWidth="20"
                                     endWidth="20">
                </e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
function onGaugeLoad(args) {
    var gauge = args.gauge;
    var axis = gauge.axes[0];

    axis.ranges[0].linearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#FFFF00', offset: '0%', opacity: 1 },
            { color: '#FF0000', offset: '100%', opacity: 1 }
        ]
    };
}
</script>
```

**Behavior:**
- Starts with yellow (#FFFF00) at 0
- Transitions to red (#FF0000) at 100
- Creates smooth color fade effect

### Radial Gradient

Radial gradients transition colors in circular progression.

```cshtml
<ejs-lineargauge id="linear" load="onGaugeLoad" orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0"
                                     end="100"
                                     color="blue"
                                     startWidth="20"
                                     endWidth="20">
                </e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
function onGaugeLoad(args) {
    var gauge = args.gauge;
    var axis = gauge.axes[0];

    axis.ranges[0].radialGradient = {
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

**Important:** If both linear and radial gradients are defined, only linear gradient renders.

## Advanced Patterns

**Pattern 1: Progress Indicator**
```cshtml
<ejs-lineargauge id="progress" orientation="Horizontal" title="Upload Progress">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="100" color="lightgray"></e-lineargauge-range>
                <e-lineargauge-range start="0" end="65" color="#4CAF50"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="65" type="Bar" width="5"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Pattern 2: Performance Zones**
```cshtml
<ejs-lineargauge id="performance" title="CPU Usage">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="33" color="#2ecc71"></e-lineargauge-range>
                <e-lineargauge-range start="33" end="66" color="#f39c12"></e-lineargauge-range>
                <e-lineargauge-range start="66" end="100" color="#e74c3c"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="45" type="Marker"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Pattern 3: Multi-Axis with Multiple Ranges**
```cshtml
<ejs-lineargauge id="multi-axis">
    <e-lineargauge-axes>
        <!-- First axis: 0-100 -->
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="100" color="blue"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
        
        <!-- Second axis: 0-1000 (different scale) -->
        <e-lineargauge-axis minimum="0" maximum="1000">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="500" color="green"></e-lineargauge-range>
                <e-lineargauge-range start="500" end="1000" color="red"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```
