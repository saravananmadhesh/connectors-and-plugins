# Axis Configuration

## Table of Contents
- [Overview](#overview)
- [Basic Axis Properties](#basic-axis-properties)
- [Minimum and Maximum](#minimum-and-maximum)
- [Ticks and Labels](#ticks-and-labels)
  - [Major Ticks](#major-ticks)
  - [Minor Ticks](#minor-ticks)
  - [Example with Both](#example-with-both)
- [Label Formatting](#label-formatting)
  - [Basic Label Setup](#basic-label-setup)
  - [Label Formatting with Custom Format](#label-formatting-with-custom-format)
  - [Precision Examples](#precision-examples)
  - [Font Customization](#font-customization)
  - [Label Position Control](#label-position-control)
- [Axis Line and Styling](#axis-line-and-styling)
  - [Dashed Line Example](#dashed-line-example)
- [Multiple Axes](#multiple-axes)
  - [Accessing Specific Axes](#accessing-specific-axes)
- [RTL Support](#rtl-support)
  - [RTL Configuration Example](#rtl-configuration-example)
- [Axis Ranges](#axis-ranges)
  - [Example: Zoomed Range](#example-zoomed-range)
- [Complete Configuration Example: Medical Temperature Gauge](#complete-configuration-example-medical-temperature-gauge)
- [Orientation](#orientation)

## Overview

The axis is the foundation of a Linear Gauge. It defines the scale, labels, tick marks, and visual appearance. A Linear Gauge must have at least one axis, and you can add multiple axes for complex visualizations.

## Basic Axis Properties

The axis is defined in the `axes` array:

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  line: { width: 2 },
  majorTicks: { interval: 10 },
  minorTicks: { interval: 2 },
  labelStyle: { format: '{value}°C' }
}]
```

Key Axis Properties:
- `minimum`: Lower bound of the axis scale
- `maximum`: Upper bound of the axis scale
- `line`: Line styling (width, color, dashArray)
- `majorTicks`: Primary tick marks
- `minorTicks`: Secondary tick marks
- `labelStyle`: Formatting and appearance of labels

## Minimum and Maximum

Define the scale range for your gauge:

```javascript
// Simple 0-100 range
axes: [{
  minimum: 0,
  maximum: 100
}]

// Negative range for temperature
axes: [{
  minimum: -50,
  maximum: 50
}]

// Large scale for measurements
axes: [{
  minimum: 0,
  maximum: 10000
}]

// Angle scale (0-360 for compass)
axes: [{
  minimum: 0,
  maximum: 360
}]
```

## Ticks and Labels

### Major Ticks

Major ticks are the primary divisions on the axis:

```javascript
majorTicks: {
  interval: 10,         // Space between major ticks
  width: 2,             // Line width in pixels
  color: '#000000',     // Line color
  height: 8             // Length of tick line
}
```

### Minor Ticks

Minor ticks are finer divisions between major ticks:

```javascript
minorTicks: {
  interval: 2,          // Space between minor ticks
  width: 1,             // Line width
  color: '#888888',     // Line color
  height: 4             // Length of tick line
}
```

### Example with Both

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  majorTicks: {
    interval: 25,
    width: 2,
    height: 10,
    color: '#000000'
  },
  minorTicks: {
    interval: 5,
    width: 1,
    height: 5,
    color: '#666666'
  }
}]
```

## Label Formatting

Labels display the numeric values at tick positions.

### Basic Label Setup

```javascript
labelStyle: {
  offset: 5,            // Distance from axis
  font: {
    size: '12px',
    family: 'Arial'
  },
  color: '#000000'
}
```

### Label Formatting with Custom Format

```javascript
labelStyle: {
  format: '{value}°C',  // Add suffix
  offset: 10
}

labelStyle: {
  format: '{value:.2f}' // Two decimal places
}

labelStyle: {
  format: '${value}k'   // Currency format
}
```

### Precision Examples

```javascript
// Show integers only
labelStyle: {
  format: '{value:.0f}'
}

// Show two decimals
labelStyle: {
  format: '{value:.2f}'
}

// Show one decimal
labelStyle: {
  format: '{value:.1f}'
}

// Scientific notation
labelStyle: {
  format: '{value:.2e}'
}
```

### Font Customization

```javascript
labelStyle: {
  font: {
    size: '14px',
    fontFamily: 'Helvetica',
    fontStyle: 'italic',
    fontWeight: '600'
  },
  color: '#1E90FF'
}
```

### Label Position Control

```javascript
labelStyle: {
  offset: 15,            // Distance from axis line
  useRangeColor: false,  // Use range colors for labels (if true)
  angle: 0,              // Rotation angle
  autoAngle: false       // Auto-rotate labels
}
```

## Axis Line and Styling

Customize the main axis line:

```javascript
line: {
  width: 2,
  color: '#000000',
  dashArray: '0'
}
```

### Dashed Line Example

```javascript
line: {
  width: 2,
  color: '#666666',
  dashArray: '5,5'       // 5 pixels on, 5 pixels off
}
```

## Multiple Axes

Add multiple axes for comparing different scales or metrics:

```javascript
axes: [
  {
    // Primary axis - Temperature
    minimum: 0,
    maximum: 100,
    line: { width: 3, color: '#FF0000' },
    labelStyle: { format: '{value}°C' },
    majorTicks: { interval: 20 }
  },
  {
    // Secondary axis - Humidity
    minimum: 0,
    maximum: 100,
    line: { width: 3, color: '#0000FF' },
    labelStyle: { format: '{value}%' },
    majorTicks: { interval: 25 },
    opposedPosition: true  // Place on opposite side
  }
]
```

### Accessing Specific Axes

```javascript
// Update first axis
gauge.setPointerValue(0, 0, 50);  // axis 0, pointer 0, value 50

// Update second axis
gauge.setPointerValue(1, 0, 75);  // axis 1, pointer 0, value 75
```

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

```javascript
<ejs-lineargauge id="linearGauge" :axes="axes" enableRtl="true"></ejs-lineargauge>
```

### RTL Configuration Example

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  majorTicks: { interval: 10 },
  labelStyle: {
    format: '{value}%'
  }
}]
```

When RTL is enabled:
- Axis flows right-to-left
- Labels appear on the right side
- Pointers move in RTL direction
- Ranges follow RTL layout

## Axis Ranges

Axis ranges define the visible portion of the axis (different from data ranges):

```javascript
axes: [{
  minimum: 0,
  maximum: 1000,
  startValue: 0,        // Start of visible range
  endValue: 500,        // End of visible range
  
  // Only values 0-500 are displayed
  // Values 500-1000 are not shown
}]
```

### Example: Zoomed Range

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  startValue: 25,       // Start viewing from 25
  endValue: 75,         // End viewing at 75
  
  // Gauge displays scaled view of 25-75 range
  majorTicks: { interval: 10 }
}]
```

## Complete Configuration Example: Medical Temperature Gauge

```javascript
axes: [{
  minimum: 94,          // Low end of normal range
  maximum: 106,         // High end (fever range)
  line: { width: 2, color: '#333333' },
  
  majorTicks: {
    interval: 2,        // Every 2 degrees
    width: 1.5,
    height: 8,
    color: '#000000'
  },
  
  minorTicks: {
    interval: 0.5,
    width: 0.5,
    height: 4,
    color: '#888888'
  },
  
  labelStyle: {
    format: '{value}°F',
    offset: 12,
    font: {
      size: '13px',
      fontFamily: 'Arial'
    }
  },
  
  ranges: [
    {
      start: 94,
      end: 98.6,
      color: '#0099FF',   // Normal
      startWidth: 15,
      endWidth: 15
    },
    {
      start: 98.6,
      end: 100,
      color: '#FFD700',   // Slightly elevated
      startWidth: 15,
      endWidth: 15
    },
    {
      start: 100,
      end: 106,
      color: '#FF0000',   // Fever
      startWidth: 15,
      endWidth: 15
    }
  ]
}]
```

## Orientation

Control whether the gauge is horizontal or vertical:

```javascript
// Horizontal (default)
<ejs-lineargauge :axes="axes" orientation="Horizontal"></ejs-lineargauge>

// Vertical (battery-like)
<ejs-lineargauge :axes="axes" orientation="Vertical"></ejs-lineargauge>
```

Horizontal vs. Vertical:
- **Horizontal**: Axis runs left-to-right, good for dashboards
- **Vertical**: Axis runs bottom-to-top, good for tank/battery indicators
