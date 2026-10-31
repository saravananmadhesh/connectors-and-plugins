# Axes and Ranges Configuration

## Table of Contents
- [Understanding Axes](#understanding-axes)
  - [Axis Lifecycle](#axis-lifecycle)
- [Configuring Axes](#configuring-axes)
  - [Basic Axis Configuration](#basic-axis-configuration)
  - [Complete Axis Properties](#complete-axis-properties)
  - [Setting Value Range](#setting-value-range)
  - [Positioning with Angles](#positioning-with-angles)
- [Multiple Axes](#multiple-axes)
  - [Creating Multiple Axes](#creating-multiple-axes)
  - [Concentric Gauge Pattern](#concentric-gauge-pattern)
  - [Comparing Metrics](#comparing-metrics)
  - [Creating Multiple Ranges](#creating-multiple-ranges)
- [Range Definition and Styling](#range-definition-and-styling)
  - [Basic Range](#basic-range)
  - [Complete Range Configuration](#complete-range-configuration)
  - [Gradient Colors](#gradient-colors)
  - [Semantic Color Ranges](#semantic-color-ranges)
  - [Performance-Based Ranges](#performance-based-ranges)
- [Range Colors and Gradients](#range-colors-and-gradients)
  - [Solid Colors](#solid-colors)
  - [Gradient Colors](#gradient-colors)
  - [Semantic Color Ranges](#semantic-color-ranges)
  - [Performance-Based Ranges](#performance-based-ranges)
- [Labels and Ticks](#labels-and-ticks)
  - [Major Ticks](#major-ticks)
  - [Minor Ticks](#minor-ticks)
  - [Label Position and Styling](#label-position-and-styling)
  - [Example: Temperature Gauge](#example-temperature-gauge)
- [Practical Examples](#practical-examples)
  - [Example 1: Percentage Gauge](#example-1-percentage-gauge)
  - [Example 2: Speedometer (Extended Range)](#example-2-speedometer-extended-range)
  - [Example 3: Multi-Scale Gauge](#example-3-multi-scale-gauge)

## Understanding Axes

An axis is the foundation of a circular gauge. It defines:
- The value range (minimum to maximum)
- The visual span (start and end angles)
- Visual elements like labels, ticks, ranges, and pointers
- Each gauge must have at least one axis

### Axis Lifecycle

1. Gauge is initialized with axes array
2. Axes define the value scale
3. Ranges are drawn within axes
4. Pointers move along axes
5. Labels show scale values

## Configuring Axes

### Basic Axis Configuration

```javascript
axes: [{
  minimum: 0,           // Start value
  maximum: 100,         // End value
  startAngle: 0,        // Start position (degrees)
  endAngle: 360         // End position (degrees)
}]
```

### Complete Axis Properties

```javascript
axes: [{
  // Value range
  minimum: 0,
  maximum: 100,
  
  // Position and size
  startAngle: 0,        // 0-360 degrees
  endAngle: 360,        // 0-360 degrees
  radius: '90%',        // Default is 90% of container
  centerX: '50%',       // Horizontal center position
  centerY: '50%',       // Vertical center position
  
  // Visual styling
  lineStyle: {
    color: '#CCCCCC',
    width: 2
  },
  
  // Label configuration
  labelPosition: 'Outside',  // 'Inside' or 'Outside'
  majorTickLines: {
    height: 10,
    width: 2,
    color: '#000000'
  },
  minorTickLines: {
    height: 5,
    width: 1,
    color: '#CCCCCC'
  },
  
  // Axis labels
  majorTicks: {
    interval: 20,
    height: 10,
    width: 2
  },
  minorTicks: {
    interval: 5,
    height: 5,
    width: 1
  }
}]
```

### Setting Value Range

Define what values the axis represents:

```javascript
axes: [{
  minimum: 0,     // Smallest value
  maximum: 100    // Largest value
}]
```

For negative ranges:

```javascript
axes: [{
  minimum: -50,   // Can include negative values
  maximum: 50
}]
```

### Positioning with Angles

Control the visual arc of the gauge:

```javascript
// Full circle (standard gauge)
startAngle: 0,
endAngle: 360

// Semicircle (bottom half)
startAngle: 0,
endAngle: 180

// Quarter circle
startAngle: 0,
endAngle: 90

// Custom arc (e.g., 240 degree arc)
startAngle: 60,
endAngle: 300
```

## Multiple Axes

Add multiple axes to create layered gauges with different scales or ranges.

### Creating Multiple Axes

```javascript
axes: [
  {
    // First axis - inner circle
    minimum: 0,
    maximum: 100,
    radius: '70%',
    pointers: [{ value: 65 }],
    ranges: [
      { start: 0, end: 50, color: '#3FB9E3' },
      { start: 50, end: 100, color: '#33E9F6' }
    ]
  },
  {
    // Second axis - outer circle
    minimum: 0,
    maximum: 200,
    radius: '90%',
    pointers: [{ value: 150 }],
    ranges: [
      { start: 0, end: 100, color: '#52F0A7' },
      { start: 100, end: 200, color: '#A4D600' }
    ]
  }
]
```

### Concentric Gauge Pattern

Create nested gauges with different data:

```javascript
axes: [
  {
    minimum: 0,
    maximum: 100,
    radius: '55%',
    pointers: [{ value: 60 }]  // Inner pointer
  },
  {
    minimum: 0,
    maximum: 100,
    radius: '75%',
    pointers: [{ value: 75 }]  // Middle pointer
  },
  {
    minimum: 0,
    maximum: 100,
    radius: '95%',
    pointers: [{ value: 85 }]  // Outer pointer
  }
]
```

### Comparing Metrics

Display related measurements simultaneously:

```javascript
axes: [
  {
    // CPU Usage
    minimum: 0,
    maximum: 100,
    radius: '60%',
    pointers: [{ value: cpuUsage }],
    ranges: [
      { start: 0, end: 50, color: '#27AE60' },
      { start: 50, end: 100, color: '#E74C3C' }
    ]
  },
  {
    // Memory Usage
    minimum: 0,
    maximum: 100,
    radius: '80%',
    pointers: [{ value: memoryUsage }],
    ranges: [
      { start: 0, end: 50, color: '#3498DB' },
      { start: 50, end: 100, color: '#E74C3C' }
    ]
  }
]
```

## Range Definition and Styling

Ranges are colored segments that divide the gauge into zones.

### Basic Range

```javascript
ranges: [
  {
    start: 0,      // Starting value
    end: 25,       // Ending value
    color: '#3FB9E3'  // Range color
  }
]
```

### Complete Range Configuration

```javascript
ranges: [
  {
    start: 0,
    end: 25,
    
    // Colors
    color: '#3FB9E3',
    backgroundColor: '#F0F0F0',
    
    // Sizing
    startWidth: 15,   // Width at start
    endWidth: 25,     // Width at end
    
    // Positioning
    radius: '105%',   // Distance from center
    
    // Styling
    opacity: 1,
    
    // Rounded corners
    roundedCornerRadius: 0
  }
]
```

### Creating Multiple Ranges

```javascript
ranges: [
  { start: 0, end: 25, color: '#3FB9E3', startWidth: 10, endWidth: 15 },
  { start: 25, end: 50, color: '#33E9F6', startWidth: 10, endWidth: 15 },
  { start: 50, end: 75, color: '#52F0A7', startWidth: 10, endWidth: 15 },
  { start: 75, end: 100, color: '#A4D600', startWidth: 10, endWidth: 15 }
]
```

## Range Colors and Gradients

### Solid Colors

```javascript
ranges: [
  { start: 0, end: 33, color: '#E74C3C' }  // Red
]
```

### Gradient Colors

While gradients aren't directly supported in range colors, create visual gradients by using multiple narrow ranges:

```javascript
// Simulate gradient from red to green
ranges: [
  { start: 0, end: 10, color: '#E74C3C' },
  { start: 10, end: 20, color: '#E67E22' },
  { start: 20, end: 30, color: '#F39C12' },
  { start: 30, end: 40, color: '#F1C40F' },
  { start: 40, end: 50, color: '#A4D600' },
  { start: 50, end: 60, color: '#76D776' },
  { start: 60, end: 70, color: '#52F0A7' },
  { start: 70, end: 80, color: '#33E9F6' },
  { start: 80, end: 90, color: '#3FB9E3' },
  { start: 90, end: 100, color: '#2E7D8A' }
]
```

### Semantic Color Ranges

Use colors that represent states:

```javascript
// Traffic light pattern
ranges: [
  { start: 0, end: 33, color: '#E74C3C' },    // Red - Critical
  { start: 33, end: 66, color: '#F39C12' },   // Orange - Warning
  { start: 66, end: 100, color: '#27AE60' }   // Green - Healthy
]
```

### Performance-Based Ranges

```javascript
// Response time in milliseconds
ranges: [
  { start: 0, end: 100, color: '#27AE60' },   // Fast
  { start: 100, end: 500, color: '#F39C12' }, // Acceptable
  { start: 500, end: 1000, color: '#E74C3C' } // Slow
]
```

## Labels and Ticks

Control how the gauge scale is displayed.

### Major Ticks

Large tick marks at regular intervals:

```javascript
majorTicks: {
  interval: 20,     // Every 20 units
  height: 10,       // Tick mark height
  width: 2,         // Tick mark width
  color: '#000000'  // Tick color
}
```

### Minor Ticks

Small tick marks between major ticks:

```javascript
minorTicks: {
  interval: 5,      // Every 5 units
  height: 5,        // Tick mark height
  width: 1,         // Tick mark width
  color: '#CCCCCC'  // Tick color
}
```

### Label Position and Styling

```javascript
labelPosition: 'Outside',  // 'Inside' or 'Outside'

// Label appearance
axisLabelFont: {
  size: '12px',
  color: '#000000',
  fontFamily: 'Segoe UI',
  fontWeight: 'Normal'
}
```

### Example: Temperature Gauge

```javascript
axes: [{
  minimum: -10,
  maximum: 50,
  
  ranges: [
    { start: -10, end: 0, color: '#3498DB' },    // Freezing
    { start: 0, end: 15, color: '#27AE60' },     // Cold
    { start: 15, end: 25, color: '#F39C12' },    // Comfortable
    { start: 25, end: 40, color: '#E74C3C' },    // Hot
    { start: 40, end: 50, color: '#C0392B' }     // Very Hot
  ],
  
  majorTicks: {
    interval: 10,
    height: 12
  },
  
  minorTicks: {
    interval: 1,
    height: 5
  },
  
  pointers: [{ value: 22 }]
}]
```

## Practical Examples

### Example 1: Percentage Gauge

```javascript
axes: [{
  minimum: 0,
  maximum: 100,
  startAngle: 180,
  endAngle: 0,
  
  ranges: [
    { start: 0, end: 25, color: '#E74C3C', startWidth: 10, endWidth: 20 },
    { start: 25, end: 50, color: '#F39C12', startWidth: 10, endWidth: 20 },
    { start: 50, end: 75, color: '#F1C40F', startWidth: 10, endWidth: 20 },
    { start: 75, end: 100, color: '#27AE60', startWidth: 10, endWidth: 20 }
  ],
  
  majorTicks: { interval: 25, height: 15 },
  minorTicks: { interval: 5, height: 8 },
  
  pointers: [{ value: 65 }]
}]
```

### Example 2: Speedometer (Extended Range)

```javascript
axes: [{
  minimum: 0,
  maximum: 300,
  startAngle: 200,
  endAngle: 340,
  
  ranges: [
    { start: 0, end: 100, color: '#27AE60' },
    { start: 100, end: 200, color: '#F39C12' },
    { start: 200, end: 300, color: '#E74C3C' }
  ],
  
  majorTicks: { interval: 50, height: 12 },
  minorTicks: { interval: 10, height: 6 },
  
  pointers: [{ value: 145 }]
}]
```

### Example 3: Multi-Scale Gauge

```javascript
// Compare two metrics with different scales
axes: [
  {
    minimum: 0,
    maximum: 100,
    radius: '65%',
    ranges: [{ start: 0, end: 100, color: '#3FB9E3' }],
    pointers: [{ value: 65 }]
  },
  {
    minimum: 0,
    maximum: 1000,
    radius: '85%',
    ranges: [{ start: 0, end: 1000, color: '#52F0A7' }],
    pointers: [{ value: 650 }]
  }
]
```

