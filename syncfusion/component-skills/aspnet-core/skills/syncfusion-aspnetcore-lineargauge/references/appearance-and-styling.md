# Appearance and Styling

## Table of Contents
- [Gauge Container Appearance](#gauge-container-appearance)
    - [Background Customization](#background-customization)
    - [Border Customization](#border-customization)
    - [Margin Customization](#margin-customization)
- [Title Styling](#title-styling)
    - [Title Examples](#title-examples)
- [Container Types](#container-types)
    - [Normal Container](#normal-container)
    - [Rounded Rectangle Container](#rounded-rectangle-container)
    - [Thermometer Container](#thermometer-container)
    - [Container Customization](#container-customization)
- [Colors and Themes](#colors-and-themes)
    - [Applying Color Themes](#applying-color-themes)
    - [Custom Colors](#custom-colors)
- [Scales](#scales)
  - [Major Ticks](#major-ticks)
  - [Minor Ticks](#minor-ticks)
  - [Line Customization](#line-customization)
  - [Inverted Axis](#inverted-axis)
  - [Opposed Axis](#opposed-axis)
- [Labels and Ticks](#labels-and-ticks)
    - [Axis Label Styling](#axis-label-styling)
    - [Label Customization Example](#label-customization-example)
- [CSS Customization](#css-customization)
    - [Custom CSS Classes](#custom-css-classes)
    - [CSS Variables](#css-variables)
- [Common Patterns](#common-patterns)

## Gauge Container Appearance

The gauge container is the area where ranges and pointers render. Customize its appearance with background color, borders, and margins.

### Background Customization

```cshtml
<ejs-lineargauge id="gauge" background="#F5F5F5">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Border Customization

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-border color="#333333" width="2"></e-lineargauge-border>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Margin Customization

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-margin left="50" right="50" top="50" bottom="50">
    </e-lineargauge-margin>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Margin Properties:**
- `Left` - Left margin in pixels
- `Right` - Right margin in pixels
- `Top` - Top margin in pixels
- `Bottom` - Bottom margin in pixels

## Title Styling

Add and customize the gauge title.

```cshtml
<ejs-lineargauge id="gauge" title="Temperature Gauge">
    <e-lineargauge-titlestyle color="#2196F3"
                                fontFamily="Arial"
                                fontStyle="normal"
                                fontWeight="bold"
                                size="18px"
                                opacity="1">
    </e-lineargauge-titlestyle>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Title Style Properties:**
- `Color` - Text color (hex, rgb, or named)
- `FontFamily` - Font name (Arial, Verdana, etc.)
- `FontStyle` - Style (normal, italic, oblique)
- `FontWeight` - Weight (normal, bold, lighter, 100-900)
- `Size` - Font size (e.g., "18px", "1.2em")
- `Opacity` - Transparency (0-1)

### Title Examples

**Simple Title:**
```cshtml
<ejs-lineargauge title="Gauge Title">
    <!-- axes -->
</ejs-lineargauge>
```

**Styled Title:**
```cshtml
<ejs-lineargauge id="gauge" title="Performance Metrics">
    <e-lineargauge-titlestyle color="#E91E63"
                                font-weight="bold"
                                size="20px">
    </e-lineargauge-titlestyle>
    <!-- axes -->
</ejs-lineargauge>
```

## Container Types

The container is the area where ranges and pointers are rendered. Three types are available.

### Normal Container

Default container type - renders as a rectangle.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-container type="Normal">
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Normal Container Properties:**
- Rectangular shape
- Default appearance
- Full customization support

### Rounded Rectangle Container

Container with rounded corners.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-container type="RoundedRectangle"
                              roundedCornerRadius="10">
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Rounded Rectangle Properties:**
- Smooth corner radius (pixels)
- Modern appearance
- Common for dashboard components

### Thermometer Container

Container styled like a thermometer - bulb at bottom, narrow tube at top.

```cshtml
<ejs-lineargauge id="gauge" orientation="Vertical">
    <e-lineargauge-container type="Thermometer">
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="-20" maximum="50">
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Thermometer Properties:**
- Bulb at bottom, narrow shaft
- Best used with vertical orientation
- Ideal for temperature gauges

### Container Customization

```cshtml
<e-lineargauge-container type="Normal"
                         width="30"
                         height="200"
                         backgroundColor="#E8F5E9"
                         offset="30">
    <e-container-border color="#4CAF50" width="2">
    </e-container-border>
</e-lineargauge-container>
```

**Container Properties:**
- `Width` - Container thickness
- `Height` - Container length
- `BackgroundColor` - Fill color
- `Offset` - Distance from axis
- `Border` - Custom border styling

## Colors and Themes

### Applying Color Themes

Syncfusion supports multiple predefined themes. Include appropriate CSS:

**Bootstrap 5 Theme:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/bootstrap5.css" />
```

**Material Theme:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/material.css" />
```

**Fluent Theme:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/fluent.css" />
```

**Fabric Theme:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/fabric.css" />
```

**High Contrast Theme:**
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.2.3/highcontrast.css" />
```

### Custom Colors

```cshtml
<ejs-lineargauge id="gauge" background="#ffffff">
    <e-lineargauge-border color="#2196F3" width="1"></e-lineargauge-border>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="100" color="#FF5722"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Scales

### Major Ticks

Major ticks mark significant axis values.

```cshtml
<e-lineargauge-axis minimum="0" maximum="100">
    <e-axis-majorticks color="#000000" width="2" interval="20">
    </e-axis-majorticks>
</e-lineargauge-axis>
```

**Major Tick Properties:**
- `Color` - Tick color
- `Width` - Tick thickness
- `Interval` - Distance between ticks (value units)
- `Height` - Tick length

### Minor Ticks

Minor ticks provide finer scale divisions.

```cshtml
<e-lineargauge-axis minimum="0" maximum="100">
    <e-axis-minorticks color="#CCCCCC" width="1" interval="5">
    </e-axis-minorticks>
</e-lineargauge-axis>
```

**Minor Tick Properties:**
- Similar to major ticks
- Typically smaller and lighter
- Usually set interval to 1/4 of major interval

### Line Customization

The following properties in the `e-axis-line` can be used to customize the axis line in the Linear Gauge.

- `Height` - To set the length of the axis line.
- `Width` -  To set the thickness of the axis line.
- `Color` - To set the color of the axis line.
- `Offset` - To render the axis line with the specified distance from the Linear Gauge.

```cshtml
<ejs-lineargauge id="linear">
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-axis-line Height="150" Width="2" Color="#4286f4" Offset="2"></e-axis-line>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Inverted Axis

The axis of the Linear Gauge component can be inversed by setting the `IsInversed` property to `true` in the `e-lineargauge-axis`.

```cshtml
<ejs-lineargauge id="linear">
    <e-lineargauge-axes>
        <e-lineargauge-axis IsInversed="true"></e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Opposed Axis

To place an axis opposite from its original position, `OpposedPosition` property in the `e-lineargauge-axis` must be set as `true`.

```cshtml
<ejs-lineargauge id="linear">
    <e-lineargauge-axes>
        <e-lineargauge-axis OpposedPosition="true"></e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Labels and Ticks

### Axis Label Styling

```cshtml
@{
    var label = new LinearGaugeLabel
    {
        Font = new LinearGaugeFont
        {
            Color = "red",
            Opacity = 1,
            FontFamily="Arial",
            FontWeight="normal"
        }
    };
}

<e-lineargauge-axis minimum="0" maximum="100" labelStyle="label">
</e-lineargauge-axis>
```

**Label Properties:**
- `Font` - Font style
- `Offset` - Distance from axis
- `UseRangeColor` - Match range colors

### Label Customization Example

```cshtml
@{
    var label = new LinearGaugeLabel
    {
        Font = new LinearGaugeFont
        {
            Color = "#2196F3",
            Opacity = 1,
            FontFamily = "Arial",
            FontWeight = "normal",
            Size="14px"
        }
    };
}
<e-lineargauge-axis minimum="0" maximum="100" labelStyle="label">
    <e-axis-majorticks color="#2196F3" width="2" interval="20">
    </e-axis-majorticks>
    <e-axis-minorticks color="#BBDEFB" width="1" interval="10">
    </e-axis-minorticks>
</e-lineargauge-axis>
```

## CSS Customization

### Custom CSS Classes

Apply custom CSS to gauges:

```html
<style>
    .custom-gauge {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 8px;
        padding: 20px;
    }
    
    .gauge-container {
        background-color: #f9f9f9;
    }
</style>

<div class="custom-gauge">
    <ejs-lineargauge id="gauge">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

### CSS Variables

Override theme variables:

```html
<style>
    :root {
        --sf-primary: #2196F3;
        --sf-secondary: #FF5722;
        --sf-success: #4CAF50;
    }
</style>
```

## Common Patterns

**Pattern 1: Professional Dashboard Gauge**

```cshtml
@{
    var label = new LinearGaugeLabel
    {
        Font = new LinearGaugeFont
        {
            Color = "#666666",
            Opacity = 1,
            FontFamily = "Arial",
            FontWeight = "normal",
            Size="13px"
        }
    };
}
<ejs-lineargauge id="dashboard-gauge" 
                  title="Server Load"
                  background="#FFFFFF">
    <e-lineargauge-border color="#E0E0E0" width="1"></e-lineargauge-border>
    <e-lineargauge-container type="RoundedRectangle" roundedCornerRadius="8">
        <e-container-border color="#BDBDBD" width="1"></e-container-border>
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100" labelStyle="label">
            <e-axis-majorticks color="#999999" width="1" interval="20">
            </e-axis-majorticks>
            <e-axis-minorticks color="#DDDDDD" width="1" interval="10">
            </e-axis-minorticks>
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="80" color="#FFC107"></e-lineargauge-range>
                <e-lineargauge-range start="80" end="100" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="65" type="Bar" width="6"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Pattern 2: Thermometer Style**

```cshtml
<ejs-lineargauge id="thermometer" 
                  orientation="Vertical"
                  title="Temperature">
    <e-lineargauge-container type="Thermometer" backgroundColor="#E3F2FD">
        <e-container-border color="#0277BD" width="2"></e-container-border>
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="-30" maximum="50">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="-30" end="0" color="#1976D2"></e-lineargauge-range>
                <e-lineargauge-range start="0" end="25" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="25" end="50" color="#D32F2F"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="22" type="Bar" width="8" color="#D32F2F"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

**Pattern 3: Minimalist Gauge**

```cshtml
<ejs-lineargauge id="minimal-gauge" 
                  title="Progress"
                  background="transparent">
    <e-lineargauge-border width="0"></e-lineargauge-border>
    <e-lineargauge-container type="Normal">
        <e-container-border width="0"></e-container-border>
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-axis-labelstyle offset="20"></e-axis-labelstyle>
            <e-axis-majorticks width="0"></e-axis-majorticks>
            <e-axis-minorticks width="0"></e-axis-minorticks>
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="100" color="#E0E0E0"></e-lineargauge-range>
                <e-lineargauge-range start="0" end="70" color="#2196F3"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="70" type="Bar" width="10"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```
