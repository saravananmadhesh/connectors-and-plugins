# Axis Configuration in Smith Chart

## Table of Contents
- [Overview](#overview)
- [Axis Types](#axis-types)
  - [Horizontal Axis](#horizontal-axis)
  - [Radial Axis](#radial-axis)
- [Label Customization](#label-customization)
  - [Label Position](#label-position)
  - [Label Intersection Handling](#label-intersection-handling)
  - [Label Styling](#label-styling)
- [Gridlines](#gridlines)
  - [Major Gridlines](#major-gridlines)
  - [Minor Gridlines](#minor-gridlines)
  - [Gridline Visual Distinction](#gridline-visual-distinction)
- [Axis Lines](#axis-lines)
  - [Horizontal Axis Line](#horizontal-axis-line)
  - [Radial Axis Line](#radial-axis-line)
- [Practical Examples](#practical-examples)
  - [Example 1: Professional Publication Format](#example-1-professional-publication-format)
  - [Example 2: Minimal, Dashboard Format](#example-2-minimal-dashboard-format)
  - [Example 3: Detailed Technical Analysis](#example-3-detailed-technical-analysis)
  - [Example 4: Presentation Mode](#example-4-presentation-mode)
- [Best Practices](#best-practices)


## Overview

The Smith Chart has two types of axes that define the visualization structure:
- **Horizontal Axis** - Displays resistance values as a straight line
- **Radial Axis** - Displays reactance values as a circular path

Both axes can be extensively customized to improve readability, adjust labels, and control gridline appearance. Proper axis configuration enhances the clarity and professionalism of your Smith Chart visualizations.

## Axis Types

### Horizontal Axis

The horizontal axis represents the real component (resistance) of impedance. It appears as a straight line running left-to-right across the chart.

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis>
        <e-smithchartaxis-majorgridlines visible="true" width="1">
        </e-smithchartaxis-majorgridlines>
    </e-smithchart-horizontalaxis>
</ejs-smithchart>
```

### Radial Axis

The radial axis represents the imaginary component (reactance) of impedance. It appears as concentric circles in the chart.

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-radialaxis>
        <e-smithchartaxis-majorgridlines visible="true" width="1">
        </e-smithchartaxis-majorgridlines>
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

## Label Customization

### Label Position

Control where axis labels appear relative to the axis line using the `labelPosition` property:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis labelPosition="Outside">
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis labelPosition="Outside">
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

Options:
- `Inside` - Labels positioned inside the chart boundary
- `Outside` - Labels positioned outside the chart boundary (default for clarity)

### Label Intersection Handling

When labels become too crowded, use `labelIntersectAction` to prevent overlapping:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis labelIntersectAction="Hide">
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis labelIntersectAction="Hide">
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

This property:
- Automatically hides overlapping labels
- Maintains chart clarity with dense data
- Particularly useful for zoomed or detailed views

### Label Styling

Customize font properties for axis labels using `labelStyle`:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis>
        <e-smithchartaxis-labelstyle fontFamily="Arial" fontSize="12" fontColor="black">
        </e-smithchartaxis-labelstyle>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis>
        <e-smithchartaxis-labelstyle fontFamily="Arial" fontSize="12" fontColor="black">
        </e-smithchartaxis-labelstyle>
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

Available properties:
- `fontFamily` - Font typeface (Arial, Verdana, etc.)
- `fontSize` - Label text size in pixels
- `fontColor` - Label text color (hex or color name)
- `fontWeight` - Font weight (normal, bold)
- `fontStyle` - Font style (normal, italic)
- `opacity` - Text transparency (0 to 1)

## Gridlines

### Major Gridlines

Major gridlines represent primary axis intervals and help read values:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis>
        <e-smithchartaxis-majorgridlines visible="true" width="1" dashArray="5" opacity="0.8">
        </e-smithchartaxis-majorgridlines>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis>
        <e-smithchartaxis-majorgridlines visible="true" width="1" dashArray="5" opacity="0.8">
        </e-smithchartaxis-majorgridlines>
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

Properties:
- `visible` - Show or hide major gridlines
- `width` - Line thickness in pixels
- `dashArray` - Dashed pattern (e.g., "5" for dashed, no value for solid)
- `opacity` - Gridline transparency (0 to 1)

### Minor Gridlines

Minor gridlines provide finer detail between major gridlines:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis>
        <e-smithchartaxis-minorgridlines visible="true" count="4" width="0.5" opacity="0.5">
        </e-smithchartaxis-minorgridlines>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis>
        <e-smithchartaxis-minorgridlines visible="true" count="4" width="0.5" opacity="0.5">
        </e-smithchartaxis-minorgridlines>
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

Properties:
- `visible` - Show or hide minor gridlines
- `count` - Number of minor gridlines between major ones
- `width` - Minor gridline thickness
- `opacity` - Transparency setting

### Gridline Visual Distinction

Create clear visual hierarchy between major and minor gridlines:

```cshtml
<!-- Clear hierarchy example -->
<e-smithchartaxis-majorgridlines visible="true" width="2" opacity="0.9">
</e-smithchartaxis-majorgridlines>
<e-smithchartaxis-minorgridlines visible="true" count="3" width="0.5" opacity="0.4">
</e-smithchartaxis-minorgridlines>
```

## Axis Lines

The axis line itself (the base for gridline reference) can be customized:

### Horizontal Axis Line

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis>
        <e-smithchartaxis-axisline visible="true" width="1" dashArray="0">
        </e-smithchartaxis-axisline>
    </e-smithchart-horizontalaxis>
</ejs-smithchart>
```

### Radial Axis Line

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-radialaxis>
        <e-smithchartaxis-axisline visible="true" width="1" dashArray="0">
        </e-smithchartaxis-axisline>
    </e-smithchart-radialaxis>
</ejs-smithchart>
```

Properties:
- `visible` - Show or hide the axis line
- `width` - Axis line thickness
- `dashArray` - Dash pattern (solid line by default)

## Practical Examples

### Example 1: Professional Publication Format

Clean, clear formatting suitable for technical publications:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis labelPosition="Outside" labelIntersectAction="Hide">
        <e-smithchartaxis-labelstyle fontFamily="Arial" fontSize="11" fontColor="#333333">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="1.5" opacity="0.8">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="true" count="4" width="0.5" opacity="0.4">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="1">
        </e-smithchartaxis-axisline>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis labelPosition="Outside" labelIntersectAction="Hide">
        <e-smithchartaxis-labelstyle fontFamily="Arial" fontSize="11" fontColor="#333333">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="1.5" opacity="0.8">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="true" count="4" width="0.5" opacity="0.4">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="1">
        </e-smithchartaxis-axisline>
    </e-smithchart-radialaxis>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="TransmissionData" name="Transmission Line">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 2: Minimal, Dashboard Format

Subtle gridlines for a clean dashboard appearance:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis labelPosition="Outside">
        <e-smithchartaxis-labelstyle fontFamily="Verdana" fontSize="10" fontColor="#666666">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="1" opacity="0.3" dashArray="3">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="false">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="0.5">
        </e-smithchartaxis-axisline>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis labelPosition="Outside">
        <e-smithchartaxis-labelstyle fontFamily="Verdana" fontSize="10" fontColor="#666666">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="1" opacity="0.3" dashArray="3">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="false">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="0.5">
        </e-smithchartaxis-axisline>
    </e-smithchart-radialaxis>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="CircuitData" name="Impedance">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 3: Detailed Technical Analysis

High-detail gridlines for precise value reading:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis labelPosition="Inside" labelIntersectAction="Hide">
        <e-smithchartaxis-labelstyle fontFamily="Courier" fontSize="10" fontColor="black" fontWeight="bold">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="2" opacity="1" dashArray="0">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="true" count="9" width="0.5" opacity="0.6">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="1.5">
        </e-smithchartaxis-axisline>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis labelPosition="Inside" labelIntersectAction="Hide">
        <e-smithchartaxis-labelstyle fontFamily="Courier" fontSize="10" fontColor="black" fontWeight="bold">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="2" opacity="1" dashArray="0">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="true" count="9" width="0.5" opacity="0.6">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="1.5">
        </e-smithchartaxis-axisline>
    </e-smithchart-radialaxis>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="MeasuredData" name="Measurement">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

### Example 4: Presentation Mode

Bold, easy-to-read configuration for presentations:

```cshtml
<ejs-smithchart id="smithchart">
    <e-smithchart-horizontalaxis labelPosition="Outside">
        <e-smithchartaxis-labelstyle fontFamily="Segoe UI" fontSize="14" fontColor="#0066CC" fontWeight="bold">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="2" opacity="0.7" dashArray="0">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="true" count="1" width="1" opacity="0.3">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="2">
        </e-smithchartaxis-axisline>
    </e-smithchart-horizontalaxis>
    <e-smithchart-radialaxis labelPosition="Outside">
        <e-smithchartaxis-labelstyle fontFamily="Segoe UI" fontSize="14" fontColor="#0066CC" fontWeight="bold">
        </e-smithchartaxis-labelstyle>
        <e-smithchartaxis-majorgridlines visible="true" width="2" opacity="0.7" dashArray="0">
        </e-smithchartaxis-majorgridlines>
        <e-smithchartaxis-minorgridlines visible="true" count="1" width="1" opacity="0.3">
        </e-smithchartaxis-minorgridlines>
        <e-smithchartaxis-axisline visible="true" width="2">
        </e-smithchartaxis-axisline>
    </e-smithchart-radialaxis>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="PresentationData" name="Analysis">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Best Practices

1. **Match Your Audience** - Publication formatting for technical docs, minimal for dashboards, bold for presentations
2. **Ensure Readability** - Use sufficient contrast between gridlines and background
3. **Balance Detail** - Enough gridlines for precision without overwhelming the chart
4. **Consistent Styling** - Keep horizontal and radial axis formatting consistent unless specific comparison is needed
5. **Label Overlap Prevention** - Always use `labelIntersectAction="Hide"` for crowded displays
6. **Test at Scale** - View your final chart at intended display size to verify label readability

Proper axis configuration is crucial for making Smith Charts both functional and professional-looking across different contexts and use cases.
