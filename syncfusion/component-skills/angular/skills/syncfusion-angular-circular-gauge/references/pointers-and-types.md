# Pointers and Types

## Table of Contents

- [Pointer Types Overview](#pointer-types-overview)
- [Needle Pointers](#needle-pointers)
  - [Basic Needle Pointer](#basic-needle-pointer)
  - [Customizing Needle Length](#customizing-needle-length)
  - [Customizing Needle Width](#customizing-needle-width)
  - [Needle Color and Style](#needle-color-and-style)
  - [Cap Customization](#cap-customization)
  - [Tail Customization](#tail-customization)
  - [Complete Needle Example](#complete-needle-example)
- [RangeBar Pointers](#rangebar-pointers)
  - [Basic RangeBar](#basic-rangebar)
  - [Customizing RangeBar Appearance](#customizing-rangebar-appearance)
  - [Rounded Corners](#rounded-corners)
  - [Multiple RangeBars](#multiple-rangebars)
- [Marker Pointers](#marker-pointers)
  - [Built-in Marker Shapes](#built-in-marker-shapes)
  - [Specific Shape Selection](#specific-shape-selection)
  - [Marker Customization](#marker-customization)
  - [Custom Marker Image](#custom-marker-image)
  - [Multiple Markers](#multiple-markers)
- [Pointer Dragging](#pointer-dragging)
  - [Enable Dragging Globally](#enable-dragging-globally)
  - [Enable Dragging Per Pointer](#enable-dragging-per-pointer)
  - [Disable Dragging on Specific Pointers](#disable-dragging-on-specific-pointers)
- [Multiple Pointers](#multiple-pointers)
- [Animation](#animation)
  - [Enable Pointer Animation](#enable-pointer-animation)
  - [Global Gauge Animation](#global-gauge-animation)
  - [Animation Sequence](#animation-sequence)
- [Gradient Colors](#gradient-colors)
  - [Linear Gradient](#linear-gradient)
  - [Radial Gradient](#radial-gradient)
  - [Gradient Use Cases](#gradient-use-cases)

## Pointer Types Overview

Circular Gauge supports three pointer types to display values:

| Type | Appearance | Best For |
|------|------------|----------|
| **Needle** | Long needle with cap and tail | Speedometer, RPM, classic gauges |
| **RangeBar** | Colored bar from center outward | Progress bars, fill indicators |
| **Marker** | Shape (circle, triangle, etc.) | Precise value marking, discrete steps |

## Needle Pointers

The needle pointer is the classic speedometer-style indicator with three components: needle, cap, and tail.

### Basic Needle Pointer

```typescript
<e-pointer [value]='65' type='Needle'>
</e-pointer>
```

### Customizing Needle Length

Control needle extent using `radius` property:

```typescript
<e-pointer [value]='65' type='Needle' radius='80%'>
  <!-- Needle extends 80% of axis radius -->
</e-pointer>
```

**Options:**
- `80%` - Percentage of axis radius (responsive)
- `250` - Fixed pixels
- Default: ~95% of axis radius

### Customizing Needle Width

Set needle thickness:

```typescript
<e-pointer [value]='65' 
           type='Needle' 
           [pointerWidth]='15'
           [needleStartWidth]='15'
           [needleEndWidth]='5'>
  <!-- Tapered needle: wide at base, pointed at end -->
</e-pointer>
```

**Properties:**
- `pointerWidth` - Standard needle width
- `needleStartWidth` - Width at base (center)
- `needleEndWidth` - Width at tip

### Needle Color and Style

```typescript
<e-pointer [value]='65' 
           type='Needle' 
           color='#0074E3'>
  <!-- Blue needle -->
</e-pointer>
```

### Cap Customization

The cap (knob) at the needle center:

```typescript
<e-pointer [value]='65' type='Needle' [cap]="cap">
</e-pointer>
```

Component:
```typescript
export class AppComponent {
  cap= {
        radius: 15,
        color: 'white',
        border: {
            color: '#007DD1',
            width: 5
        }
    };
}
```

**Cap properties:**
- `radius` - Cap size in pixels
- `color` - Cap fill color
- `border` - Border styling

### Tail Customization

The tail extends behind the needle center:

```typescript
<e-pointer value=90 radius="50%" pointerWidth=25 type="Needle" color='#007DD1' [cap]="cap" [needleTail]="needleTail"></e-pointer>
```

**Tail properties:**
- `length` - Tail length (pixels or percentage)
- `color` - Tail color
- `border` - Border styling
- `linearGradient` - Linear Gradient Tail color
- `radialGradient` - Radial Gradient Tail color

### Complete Needle Example

```typescript
export class AppComponent {
  needleConfig = {
    value: 75,
    type: 'Needle',
    radius: '90%',
    pointerWidth: 12,
    needleStartWidth: 12,
    needleEndWidth: 3,
    color: '#0074E3'
  };

  capConfig = {
    radius: 10,
    color: '#0074E3',
    border: { color: '#333333', width: 2 }
  };

  tailConfig = {
    length: '30%',
    color: '#999999'
  };
}
```

```html
<e-pointer 
    [value]="needleConfig.value"
    [type]="needleConfig.type"
    [radius]="needleConfig.radius"
    [pointerWidth]="needleConfig.pointerWidth"
    [needleStartWidth]="needleConfig.needleStartWidth"
    [needleEndWidth]="needleConfig.needleEndWidth"
    [color]="needleConfig.color"
    [cap]="capConfig"
    [needleTail]="tailConfig">
</e-pointer>

```

## RangeBar Pointers

RangeBar pointers fill from the center outward, similar to a progress bar.

### Basic RangeBar

```typescript
<e-pointer [value]='65' type='RangeBar'>
</e-pointer>
```

**Behavior:**
- Fills from center to pointer value
- Creates a visual "progress" effect
- Useful for completion percentages

### Customizing RangeBar Appearance

```typescript
<e-pointer [value]='65' 
           type='RangeBar'
           color='#4CAF50'
           [pointerWidth]='20'>
  <!-- Green bar, 20px thick -->
</e-pointer>
```

**Properties:**
- `color` - Bar fill color
- `pointerWidth` - Bar thickness
- `border` - Border styling

### Rounded Corners

Add rounded caps to RangeBar for modern appearance:

```typescript
<e-range start=40 end=80 radius='50%' roundedCornerRadius=6></e-range>
```

**Effect:** Creates arc gauge appearance with smooth ends.

### Multiple RangeBars

Layer multiple RangeBars for comparison:

```typescript
<e-axis>
  <e-pointers>
    <!-- Target: 80 -->
    <e-pointer [value]='80' 
               type='RangeBar' 
               color='#CCCCCC'
               [pointerWidth]='8'></e-pointer>
    
    <!-- Actual: 65 -->
    <e-pointer [value]='65' 
               type='RangeBar' 
               color='#4CAF50'
               [pointerWidth]='12'></e-pointer>
  </e-pointers>
</e-axis>
```

## Marker Pointers

Marker pointers use shapes or images to indicate values.

### Built-in Marker Shapes

```typescript
<e-pointer [value]='65' type='Marker'>
</e-pointer>
```

**Available shapes:**
- `Circle` (default)
- `Rectangle`
- `Triangle`
- `InvertedTriangle`
- `Diamond`

### Specific Shape Selection

```typescript
<e-pointer [value]='65' 
           type='Marker' 
           [markerShape]="'Triangle'">
</e-pointer>
```

### Marker Customization

```typescript
<e-pointer [value]='65' 
           type='Marker' 
           [markerShape]="'Circle'"
           [markerWidth]='16'
           [markerHeight]='16'
           color='#0074E3'
           [border]="{ color: '#000', width: 2 }">
</e-pointer>
```

**Marker properties:**
- `markerShape` - Shape type
- `markerWidth` - Width in pixels
- `markerHeight` - Height in pixels
- `color` - Fill color
- `border` - Border styling

### Custom Marker Image

Replace shapes with custom image:

```typescript
<e-pointer [value]='65' 
           type='Marker' 
           [markerShape]="'Image'"
           [imageUrl]="'/assets/marker.png'">
</e-pointer>
```

**Tips:**
- Use small images (16x16px - 32x32px)
- Support PNG, SVG, JPG formats
- Ensure image loads correctly

### Multiple Markers

Show different metrics as different marker shapes:

```typescript
<e-axis>
  <e-pointers>
    <!-- Current value: circle -->
    <e-pointer [value]='65' 
               type='Marker'
               [markerShape]="'Circle'"
               color='#0074E3'></e-pointer>
    
    <!-- Average value: diamond -->
    <e-pointer [value]='55'
               type='Marker'
               [markerShape]="'Diamond'"
               color='#FF9800'></e-pointer>
  </e-pointers>
</e-axis>
```

## Pointer Dragging

Allow users to adjust values by dragging pointers.

### Enable Dragging Globally

Enable drag for all pointers across all axes:

```typescript
<ejs-circulargauge [enablePointerDrag]='true'>
  <!-- All pointers now draggable -->
</ejs-circulargauge>
```

### Enable Dragging Per Pointer

Enable drag for specific pointers only:

```typescript
<e-pointer [value]='65' [enableDrag]='true'>
  <!-- Only this pointer is draggable -->
</e-pointer>
```

When `enableDrag` is set on individual pointers, it overrides the global `enablePointerDrag` setting.

### Disable Dragging on Specific Pointers

Disable drag even when global setting is enabled:

```typescript
<ejs-circulargauge [enablePointerDrag]='true'>
  <e-axes>
    <e-axis>
      <e-pointers>
        <!-- Draggable (inherits global setting) -->
        <e-pointer [value]='65' type='Needle'></e-pointer>
        
        <!-- Not draggable (explicitly disabled) -->
        <e-pointer [value]='85' type='RangeBar' [enableDrag]='false'></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

## Multiple Pointers

Display multiple pointers on a single axis:

```typescript
<e-axis>
  <e-pointers>
    <!-- Primary value: Needle -->
    <e-pointer [value]='65' type='Needle'></e-pointer>
    
    <!-- Target value: RangeBar -->
    <e-pointer [value]='80' type='RangeBar' color='#CCCCCC'></e-pointer>
    
    <!-- Average value: Marker -->
    <e-pointer [value]='55' type='Marker' [markerShape]="'Diamond'"></e-pointer>
  </e-pointers>
</e-axis>
```

**Use cases:**
- Show current + target + average simultaneously
- Compare multiple metrics on same scale
- Visualize range (min/max with current)

## Animation

Animate pointers when they load or when values change.

### Enable Pointer Animation

```typescript
<e-pointer [value]='65' type='Needle' [animation]="animation">
```

**Properties:**
- `enable` - true/false to enable animation
- `duration` - Animation duration in milliseconds

### Global Gauge Animation

Animate entire gauge including all elements:

```typescript
<ejs-circulargauge [animationDuration]='2000'>
  <!-- Axis, ticks, labels, ranges, pointers, annotations all animate -->
</ejs-circulargauge>
```

### Animation Sequence

Global `animationDuration` animates in order:
1. Axis line
2. Ticks and labels
3. Ranges
4. Pointers (with individual animation if set)
5. Annotations

## Gradient Colors

Apply gradient fills to pointers for sophisticated visual effects.

### Linear Gradient

Colors transition linearly:

```typescript
<e-pointer [value]='65' type='Needle'>
  <e-linearGradient [startValue]='0' [endValue]='100'>
    <e-colorStops>
      <e-colorStop [color]='#FF0000' [offset]='0%'></e-colorStop>
      <e-colorStop [color]='#FFFF00' [offset]='50%'></e-colorStop>
      <e-colorStop [color]='#00FF00' [offset]='100%'></e-colorStop>
    </e-colorStops>
  </e-linearGradient>
</e-pointer>
```

### Radial Gradient

Colors transition in circular progression:

```typescript
<e-pointer [value]='65' type='RangeBar'>
  <e-radialGradient [innerPosition]="{ x: '30%', y: '30%' }" 
                    [outerPosition]="{ x: '70%', y: '70%' }">
    <e-colorStops>
      <e-colorStop [color]='#FF0000' [offset]='0%'></e-colorStop>
      <e-colorStop [color]='#00FF00' [offset]='100%'></e-colorStop>
    </e-colorStops>
  </e-radialGradient>
</e-pointer>
```

### Gradient Use Cases

- **Temperature gradient:** Blue (cold) → Red (hot)
- **Performance gradient:** Green (good) → Red (poor)
- **Risk gradient:** Green (safe) → Red (danger)

---

