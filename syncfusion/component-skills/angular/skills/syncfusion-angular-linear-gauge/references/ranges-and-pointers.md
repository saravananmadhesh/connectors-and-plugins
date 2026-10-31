# Ranges and Pointers

## Table of Contents

- [Understanding Ranges](#understanding-ranges)
- [Creating Ranges](#creating-ranges)
  - [Basic Range](#basic-range)
  - [Range with Name](#range-with-name)
  - [Complete Range Configuration](#complete-range-configuration)
- [Range Styling](#range-styling)
  - [Range Properties](#range-properties)
  - [Offset and Width](#offset-and-width)
  - [Border Styling](#border-styling)
  - [Gradient Colors](#gradient-colors)
- [Understanding Pointers](#understanding-pointers)
- [Pointer Types](#pointer-types)
  - [Bar Pointer](#bar-pointer)
  - [Marker Pointer](#marker-pointer)
- [Pointer Styling](#pointer-styling)
  - [Pointer Properties](#pointer-properties)
  - [Styling Examples](#styling-examples)
- [Multiple Pointers](#multiple-pointers)
- [Animations](#animations)
  - [Enabling Animations](#enabling-animations)
  - [Animation Property](#animation-property)
  - [Global Animation Configuration](#global-animation-configuration)
- [Dynamic Updates](#dynamic-updates)
  - [Updating Pointer Values](#updating-pointer-values)
- [Practical Examples](#practical-examples)
  - [Traffic Light Gauge](#traffic-light-gauge)
  - [Performance Gauge](#performance-gauge)
  - [Dual Display](#dual-display)

## Understanding Ranges

Ranges are colored zones on the gauge that represent different value regions. They help users quickly identify whether a reading is in a safe, warning, or critical zone.

```typescript
<e-ranges>
    <e-range [start]="0" [end]="30" [color]="'#27ae60'" ></e-range>
    <e-range [start]="30" [end]="70" [color]="'#f39c12'" ></e-range>
    <e-range [start]="70" [end]="100" [color]="'#e74c3c'" ></e-range>
</e-ranges>
```

## Creating Ranges

### Basic Range

Define a range with color:

```typescript
<e-range 
  [start]="0" 
  [end]="50" 
  [color]="'#3498db'">
</e-range>
```

### Range with Name

Add a label for reference:

```typescript
<e-range 
  [start]="0" 
  [end]="50" 
  [color]="'#3498db'"
</e-range>
```

### Complete Range Configuration

```typescript
<e-range 
  [start]="20" 
  [end]="80" 
  [color]="'#9b59b6'"
  [offset]="10"
  [startWidth]="15"
  [endWidth]="15"
  [border]="{ color: '#fff', width: 2 }">
</e-range>
```

## Range Styling

### Range Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `start` | number | - | Range start value (required) |
| `end` | number | - | Range end value (required) |
| `color` | string | - | Range background color |
| `startWidth` | number | - | Width at range start (pixels) |
| `endWidth` | number | - | Width at range end (pixels) |
| `offset` | number | - | Distance from axis (pixels) |
| `border` | object | - | Border styling |
| `linearGradient` | LinearGradientModel | null | Render a linear gradient for the range |
| `position` | Position | Outside | Position to place the ranges in the axis |
| `radialGradient` | RadialGradientModel | null | Render a radial gradient for the range |

### Offset and Width

Create ranges with visual depth:

```typescript
// Range that tapers from top to bottom
<e-range 
  [start]="0" 
  [end]="50" 
  [color]="'#3498db'"
  [startWidth]="20"
  [endWidth]="10"
  [offset]="5">
</e-range>

// Range with custom offset
<e-range 
  [start]="50" 
  [end]="100" 
  [color]="'#e74c3c'"
  [offset]="-5">
</e-range>
```

### Border Styling

Add borders to ranges:

```typescript
<e-range 
  [start]="0" 
  [end]="50" 
  [color]="'#3498db'"
  [border]="{ color: '#1a1a1a', width: 2 }">
</e-range>
```

### Gradient Colors

Use CSS gradients for visual appeal:

```typescript
// Note: Use RGB/Hex colors for gradient support
<e-range 
  [start]="0" 
  [end]="100" 
  [color]="'linear-gradient(to right, #3498db, #2ecc71)'"
  [startWidth]="20"
  [endWidth]="20">
</e-range>
```

## Understanding Pointers

Pointers display the current value on the gauge scale. They are the primary indicator of the measured value.

```typescript
<e-pointers>
  <e-pointer [value]="45" [type]="'Bar'"></e-pointer>
</e-pointers>
```

## Pointer Types

### Bar Pointer

Rectangular bar that extends from the axis:

```typescript
<e-pointer 
  [value]="50" 
  [type]="'Bar'"
  [width]="20"
  [color]="'#2c3e50'">
</e-pointer>
```

**Use case:** Temperature, speed, and general measurements.

### Marker Pointer

Circular or custom-shaped marker at a specific value:

```typescript
<e-pointer 
  [value]="50" 
  [type]="'Marker'"
  [markerType]="'Circle'"
  [width]="15"
  [color]="'#ff6600'">
</e-pointer>
```

**Marker types:** Circle, Triangle, Rectangle, Diamond, Inverted Triangle, Image

```typescript
// Different marker shapes
<e-pointer [markerType]="'Circle'" [value]="25"></e-pointer>
<e-pointer [markerType]="'Triangle'" [value]="50"></e-pointer>
<e-pointer [markerType]="'Diamond'" [value]="75"></e-pointer>
<e-pointer [markerType]="'Rectangle'" [value]="100"></e-pointer>
```

## Pointer Styling

### Pointer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | number | - | Current pointer value (required) |
| `type` | 'Bar' \| 'Marker' | 'Bar' | Pointer style |
| `color` | string | - | Pointer color |
| `width` | number | 10 | Pointer width/size (pixels) |
| `offset` | number | 0 | Distance from axis |
| `markerType` | string | 'Inverted Triangle' | Shape for Marker type |
| `border` | object | - | Border styling |

### Styling Examples

```typescript
// Thick bar pointer
<e-pointer 
  [value]="60" 
  [type]="'Bar'"
  [width]="25"
  [color]="'#34495e'"
  [border]="{ color: '#fff', width: 2 }">
</e-pointer>

// Large circular marker
<e-pointer 
  [value]="40" 
  [type]="'Marker'"
  [markerType]="'Circle'"
  [width]="20"
  [color]="'#e74c3c'">
</e-pointer>
```

## Multiple Pointers

Compare multiple values on the same gauge:

```typescript
<e-pointers>
  <!-- Current value (bar pointer) -->
  <e-pointer 
    [value]="currentValue" 
    [type]="'Bar'"
    [color]="'#0066cc'"
    [width]="15">
  </e-pointer>
  
  <!-- Target value (marker pointer) -->
  <e-pointer 
    [value]="targetValue" 
    [type]="'Marker'"
    [markerType]="'Circle'"
    [color]="'#ff6600'"
    [width]="12">
  </e-pointer>
  
  <!-- Average value (marker pointer) -->
  <e-pointer 
    [value]="averageValue" 
    [type]="'Marker'"
    [markerType]="'Triangle'"
    [color]="'#27ae60'"
    [width]="10">
  </e-pointer>
</e-pointers>
```

**Component code:**

```typescript
export class MultiPointerGaugeComponent {
  currentValue = 65;
  targetValue = 75;
  averageValue = 70;
}
```

## Animations

### Enabling Animations

Animate pointer movement:

```typescript
<e-pointer animationDuration="1000"
    [value]="averageValue"  
    [type]="'Marker'"
    [markerType]="'Triangle'"
    [color]="'#27ae60'"
    [width]="10">
</e-pointer>
```

### Animation Property

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animationDuration` | number | 500 | Animation duration (milliseconds) |

### Global Animation Configuration

```typescript
<ejs-lineargauge animationDuration="1000">
  ...
</ejs-lineargauge>
```

## Dynamic Updates

### Updating Pointer Values

Change pointer values programmatically:

```typescript
export class InteractiveGaugeComponent implements OnInit {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;
  gaugeValue: number = 50;

  ngOnInit(): void {
    this.simulateValueChange();
  }

  simulateValueChange(): void {
    setInterval(() => {
      this.gaugeValue = Math.random() * 100;
      this.updateGauge();
    }, 1000);
  }

  updateGauge(): void {
    if (this.gaugeRef) {
      this.gaugeRef.setPointerValue(0, 0, this.gaugeValue);
    }
  }
}
```

## Practical Examples

### Traffic Light Gauge

```typescript
<ejs-lineargauge [orientation]="'Vertical'">
  <e-axes>
    <e-axis [minimum]="0" [maximum]="100">
      <e-ranges>
        <e-range [start]="0" [end]="30" [color]="'#27ae60'" ></e-range>
        <e-range [start]="30" [end]="70" [color]="'#f39c12'" ></e-range>
        <e-range [start]="70" [end]="100" [color]="'#e74c3c'"></e-range>
      </e-ranges>
      <e-pointers>
        <e-pointer [value]="trafficValue" [type]="'Marker'" [markerType]="'Circle'" [width]="25"></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-lineargauge>
```

### Performance Gauge

```typescript
<e-ranges>
  <e-range [start]="0" [end]="40" [color]="'#e74c3c'" [startWidth]="15" [endWidth]="15"></e-range>
  <e-range [start]="40" [end]="70" [color]="'#f39c12'" [startWidth]="15" [endWidth]="15"></e-range>
  <e-range [start]="70" [end]="100" [color]="'#27ae60'" [startWidth]="15" [endWidth]="15"></e-range>
</e-ranges>
<e-pointers>
  <e-pointer [value]="performanceScore" [type]="'Bar'" [width]="20" [color]="'#2c3e50'" [animationDuration]="'800'" ></e-pointer>
</e-pointers>
```

### Dual Display

```typescript
<e-pointers>
  <!-- Main value -->
  <e-pointer 
    [value]="mainValue" 
    [type]="'Bar'"
    [width]="20"
    [color]="'#0066cc'"
    [offset]="10">
  </e-pointer>
  
  <!-- Secondary value for comparison -->
  <e-pointer 
    [value]="secondaryValue" 
    [type]="'Bar'"
    [width]="15"
    [color]="'#999'"
    [offset]="-10">
  </e-pointer>
</e-pointers>
```
