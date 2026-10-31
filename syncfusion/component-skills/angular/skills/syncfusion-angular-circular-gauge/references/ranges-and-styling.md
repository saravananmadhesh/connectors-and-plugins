# Ranges and Styling

## Table of Contents

- [Range Basics](#range-basics)
  - [Creating a Range](#creating-a-range)
  - [Simple Range Example](#simple-range-example)
- [Range Customization](#range-customization)
  - [Color](#color)
  - [Thickness (Width)](#thickness-width)
  - [Border](#border)
- [Range Positioning](#range-positioning)
  - [Radius Control](#radius-control)
  - [Pixel-Based Positioning](#pixel-based-positioning)
  - [Percentage-Based Positioning](#percentage-based-positioning)
  - [Offset from Axis](#offset-from-axis)
  - [Inside vs Outside](#inside-vs-outside)
- [Multiple Ranges](#multiple-ranges)
- [Rounded Corner Radius](#rounded-corner-radius)
  - [Arc Gauge Effect](#arc-gauge-effect)
- [Range Dragging](#range-dragging)
- [Gradient Colors](#gradient-colors)
  - [Linear Gradient](#linear-gradient)
  - [Radial Gradient](#radial-gradient)
- [Using Range Colors for Ticks](#using-range-colors-for-ticks)
- [Complete Range Example](#complete-range-example)

## Range Basics

Ranges are colored zones that categorize intervals on a gauge axis. They highlight value regions (e.g., safe/warning/danger zones).

### Creating a Range

```typescript
<e-axis>
  <e-ranges>
    <e-range [start]='0' [end]='50' color='#4CAF50'></e-range>
  </e-ranges>
</e-axis>
```

**Properties:**
- `start` - Range start value (e.g., 0)
- `end` - Range end value (e.g., 50)
- `color` - Range fill color

### Simple Range Example

Create a temperature gauge with a comfort zone:

```typescript
<e-axis [minimum]='0' [maximum]='50'>
  <e-ranges>
    <!-- Comfort zone: 18-24°C -->
    <e-range [start]='18' [end]='24' color='#4CAF50'></e-range>
  </e-ranges>
  <e-pointers>
    <e-pointer [value]='22' type='Needle'></e-pointer>
  </e-pointers>
</e-axis>
```

## Range Customization

### Color

Set range fill color:

```typescript
<e-range [start]='0' [end]='50' color='#0074E3'></e-range>
```

### Thickness (Width)

Control range thickness using `startWidth` and `endWidth`:

```typescript
<e-range [start]='0' 
         [end]='50' 
         color='#4CAF50'
         [startWidth]='20'
         [endWidth]='10'>
  <!-- Tapered: 20px at start, 10px at end -->
</e-range>
```

**Use cases:**
- Uniform thickness: Set both to same value
- Tapered effect: Decrease end width
- Variable emphasis: Thicker at higher values

### Border

Add border styling:

```typescript
<e-range [start]='0' [end]='50'
         color='#4CAF50'
         [border]="{ color: '#333333', width: 2 }">
</e-range>
```

## Range Positioning

### Radius Control

Position range inside or outside axis using `radius`:

```typescript
<e-range [start]='0' [end]='50' radius='100%'></e-range>
<!-- 100% = axis radius (default) -->
```

### Pixel-Based Positioning

Fixed distance from center:

```typescript
<e-range [start]='0' [end]='50' radius='200px'></e-range>
```

### Percentage-Based Positioning

Responsive positioning:

```typescript
<e-range [start]='0' [end]='50' radius='80%'></e-range>
```

### Offset from Axis

Move range relative to its radius:

```typescript
<e-range [start]='0' [end]='50' radius='90%' [offset]='10'></e-range>
```

### Inside vs Outside

```typescript
<!-- Inside axis: smaller radius -->
<e-range [start]='0' [end]='50' radius='50%'></e-range>

<!-- Outside axis: larger radius -->
<e-range [start]='0' [end]='50' radius='120%'></e-range>
```

## Multiple Ranges

Create zones for different states:

```typescript
<e-axis [minimum]='0' [maximum]='200'>
  <e-ranges>
    <!-- Safe: 0-60 -->
    <e-range [start]='0' [end]='60' color='#4CAF50'></e-range>
    
    <!-- Caution: 60-140 -->
    <e-range [start]='60' [end]='140' color='#FF9800'></e-range>
    
    <!-- Danger: 140-200 -->
    <e-range [start]='140' [end]='200' color='#F44336'></e-range>
  </e-ranges>
</e-axis>
```

## Rounded Corner Radius

Smooth range edges for modern appearance:

```typescript
<e-range [start]='0' [end]='50' [color]='#4CAF50'>
  <e-roundedCornerRadius [radius]='8'></e-roundedCornerRadius>
</e-range>
```

### Arc Gauge Effect

Use rounded corners for arc gauge styling:

```typescript
<e-axis [startAngle]='200' [endAngle]='160'>
  <e-ranges>
    <e-range [start]='0' [end]='50' color='#4CAF50' roundedCornerRadius=6>
    </e-range>
  </e-ranges>
</e-axis>
```

## Range Dragging

Allow users to adjust range positions dynamically:

```typescript
<ejs-circulargauge [enableRangeDrag]='true'>
  <e-axes>
    <e-axis>
      <e-ranges>
        <e-range [start]='30' [end]='70'></e-range>
      </e-ranges>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

**Behavior:**
- Click and drag range start/end points
- Updates range values dynamically
- Useful for interactive calibration

## Gradient Colors

Apply sophisticated color transitions to ranges.

### Linear Gradient

Color transitions in linear progression:

```typescript
<e-axis [lineStyle]='lineStyle' radius='90%' startAngle=200 endAngle=130 minimum=0 maximum=14 [labelStyle]='labelStyle' [majorTicks]='majorTicks' [minorTicks]='minorTicks' [ranges]='ranges'>
</e-axis>
```

Component:
```typescript
rangeLinearGradient: Object = {
    startValue: '0%', endValue: '100%',
    colorStop: [
        { color: '#9E40DC', offset: '0%', opacity: 0.9 },
        { color: '#E63B86', offset: '70%', opacity: 0.9 }]
};
ranges = [{
    start: 0, end: 12, radius: '115%',
    startWidth: 25, endWidth: 25,
    linearGradient : this.rangeLinearGradient
}, {
    start: 0, end: 11, radius: '85%',
    startWidth: 25, endWidth: 25,
    linearGradient : this.rangeLinearGradient
}, {
    start: 0, end: 10, radius: '55%',
    startWidth: 25, endWidth: 25,
    linearGradient : this.rangeLinearGradient
}];
```

**Effect:** Red → Yellow → Green gradient across range

### Radial Gradient

Color transitions in circular progression:

```typescript
<e-axis [lineStyle]='lineStyle' radius='90%' startAngle=200 endAngle=130 minimum=0 maximum=14 [labelStyle]='labelStyle' [majorTicks]='majorTicks' [minorTicks]='minorTicks' [ranges]='ranges'>
```

Component:
```typescript
rangeRadialGradient: Object = {
    radius: '50%', innerPosition: { x: '50%', y: '50%' },
    outerPosition: { x: '50%', y: '50%' },
    colorStop: [
        { color: '#9E40DC', offset: '90%', opacity: 0.9 },
        { color: '#E63B86', offset: '160%', opacity: 0.9 }]
};
ranges = [{
      start: 0, end: 12, radius: '115%',
      startWidth: 25, endWidth: 25,
      radialGradient: rangeRadialGradient
  }, {
      start: 0, end: 11, radius: '85%',
      startWidth: 25, endWidth: 25,
      radialGradient: rangeRadialGradient
  }, {
      start: 0, end: 10, radius: '55%',
      startWidth: 25, endWidth: 25,
      radialGradient: rangeRadialGradient
}];
```

## Using Range Colors for Ticks

Apply range colors to tick marks for visual consistency:

```typescript
<ejs-circulargauge id="circular-container">
    <e-axes>
        <e-axis [majorTicks]="majorTicks" [minorTicks]="minorTicks">
        <e-ranges>
            <e-range [start]='0' [end]='50' color='#4CAF50'></e-range>
            <e-range [start]='50' [end]='100' color='#FF9800'></e-range>
        </e-ranges>
    </e-axis>
    </e-axes>
</ejs-circulargauge>
```

Component:
```typescript
majorTicks= {
    interval: 10,
    color:'red',
    height: 10,
    width: 3,
    useRangeColor: false
};
minorTicks= {
    interval: 5,
    color:'green',
    height: 5,
    width: 2,
    useRangeColor: true
};
```

## Complete Range Example

Multi-range gauge with customization:

```typescript
export class AppComponent {
  gaugeConfig = {
    title: 'Performance Gauge',
    minimum: 0,
    maximum: 100
  };

  ranges = [
    {
      start: 0,
      end: 33,
      color: '#F44336',
      startWidth: 20,
      endWidth: 20,
      roundedCornerRadius: 8
    },
    {
      start: 33,
      end: 67,
      color: '#FFC107',
      startWidth: 20,
      endWidth: 20,
      roundedCornerRadius: 8
    },
    {
      start: 67,
      end: 100,
      color: '#4CAF50',
      startWidth: 20,
      endWidth: 20,
      roundedCornerRadius: 8
    }
  ];
}
```

Template:
```html
<ejs-circulargauge [title]="gaugeConfig.title">
  <e-axes>
    <e-axis
      [minimum]="gaugeConfig.minimum"
      [maximum]="gaugeConfig.maximum"
      [ranges]="ranges">

      <e-pointers>
        <e-pointer
          [value]="60"
          type="Needle">
        </e-pointer>
      </e-pointers>

    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

---

