# Appearance and Animation

## Table of Contents

- [Gauge Title](#gauge-title)
  - [Basic Title](#basic-title)
  - [Title Styling](#title-styling)
- [Gauge Positioning](#gauge-positioning)
  - [Center Position Default](#center-position-default)
  - [Pixel-Based Positioning](#pixel-based-positioning)
  - [Percentage-Based Positioning](#percentage-based-positioning)
  - [Custom Positioning Examples](#custom-positioning-examples)
- [Background and Border](#background-and-border)
  - [Background Color](#background-color)
  - [Border Styling](#border-styling)
  - [Complete Styling](#complete-styling)
- [Margin and Spacing](#margin-and-spacing)
  - [Margin Configuration](#margin-configuration)
  - [Asymmetric Margins](#asymmetric-margins)
- [Gauge Dimensions](#gauge-dimensions)
- [Animation](#animation)
  - [Enable Global Animation](#enable-global-animation)
  - [Animation Sequence](#animation-sequence)
  - [Pointer-Specific Animation](#pointer-specific-animation)
  - [Complete Animation Setup](#complete-animation-setup)
  - [No Animation](#no-animation)
- [Non-Circular Gauges](#non-circular-gauges)
  - [Semi-Circular Gauge Half Circle](#semi-circular-gauge-half-circle)
  - [Quarter-Circular Gauge](#quarter-circular-gauge)
  - [Custom Arc Range](#custom-arc-range)
  - [Direction Adjustment](#direction-adjustment)
  - [Semi-Gauge Dashboard Example](#semi-gauge-dashboard-example)
- [Complete Styled Gauge Example](#complete-styled-gauge-example)

## Gauge Title

Add a title to the gauge and customize its appearance.

### Basic Title

```typescript
<ejs-circulargauge [title]="'Speed Gauge'">
  <!-- gauge content -->
</ejs-circulargauge>
```

### Title Styling

Customize title appearance with `titleStyle`:

```typescript
export class AppComponent {
  titleStyle = {
    color: '#333333',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '500',
    size: '18px',
    textAlignment: 'Center'
  };
}
```

Template:
```html
<ejs-circulargauge [title]="'Performance Gauge'" [titleStyle]='titleStyle'>
</ejs-circulargauge>
```

## Gauge Positioning

Position the gauge at specific locations within its container.

### Center Position (Default)

```typescript
<ejs-circulargauge centerX='50%' centerY='50%'>
  <!-- Centered in container (default) -->
</ejs-circulargauge>
```

### Pixel-Based Positioning

Position at fixed pixel coordinates:

```typescript
<ejs-circulargauge centerX='300' centerY='300'>
  <!-- Gauge center at 300px from left and top -->
</ejs-circulargauge>
```

### Percentage-Based Positioning

Position relative to container dimensions:

```typescript
<ejs-circulargauge centerX='25%' centerY='75%'>
  <!-- Gauge at bottom-left quadrant -->
</ejs-circulargauge>
```

### Custom Positioning Examples

**Top-Left:**
```typescript
<ejs-circulargauge centerX='20%' centerY='20%'></ejs-circulargauge>
```

**Top-Right:**
```typescript
<ejs-circulargauge centerX='80%' centerY='20%'></ejs-circulargauge>
```

**Bottom-Center:**
```typescript
<ejs-circulargauge centerX='50%' centerY='85%'></ejs-circulargauge>
```

## Background and Border

Customize gauge container appearance.

### Background Color

```typescript
<ejs-circulargauge background='#F5F5F5'>
  <!-- Light gray background -->
</ejs-circulargauge>
```

### Border Styling

```typescript
export class AppComponent {
  borderStyle = {
    color: '#0074E3',
    width: 2
  };
}
```

Template:
```html
<ejs-circulargauge [border]='borderStyle'></ejs-circulargauge>
```

### Complete Styling

```typescript
export class AppComponent {
  background = '#FFFFFF';
  
  borderStyle = {
    color: '#0074E3',
    width: 2
  };
}
```

Template:
```html
<ejs-circulargauge [background]='background' [border]='borderStyle'>
</ejs-circulargauge>
```

## Margin and Spacing

Add space around the gauge within its container.

### Margin Configuration

```typescript
export class AppComponent {
  margin = {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
  };
}
```

Template:
```html
<ejs-circulargauge [margin]='margin'></ejs-circulargauge>
```

### Asymmetric Margins

```typescript
margin = {
  left: 50,      // More space on left
  right: 10,
  top: 30,       // More space on top
  bottom: 10
};
```

## Gauge Dimensions

Control gauge sizing and responsiveness.

## Animation

Animate gauge elements when loading or value changes.

### Enable Global Animation

```typescript
<ejs-circulargauge [animationDuration]='2000'>
  <!-- All elements animate over 2 seconds -->
</ejs-circulargauge>
```

### Animation Sequence

Global animation applies in this order:
1. **Axis line** - Renders along direction
2. **Ticks and labels** - Fade/appear
3. **Ranges** - Fill animation
4. **Pointers** - Move to position
5. **Annotations** - Appear

### Pointer-Specific Animation

Individual pointer animation (within global animation):

Template:
```typescript
<e-pointer value=90 [animation]="animation"></e-pointer>
```

```typescript
animation= {
    enable: true,
    duration: 1500
};
```

### Complete Animation Setup

```typescript
export class AppComponent {
  // Global animation for all elements
  animationDuration = 2000;  // milliseconds
}
```

Template:
```html
<ejs-circulargauge [animationDuration]='animationDuration'>
  <e-axes>
    <e-axis>
      <e-pointers>
        <!-- Individual pointer animation overrides -->
        <e-pointer [value]='65' type='Needle' [animation]="animation">
        </e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

Component:
```typescript
animation= {
    enable: true,
    duration: 1500
};
```

### No Animation

Disable animation for instant rendering:

```typescript
<ejs-circulargauge [animationDuration]='0'>
  <!-- No animation (instant render) -->
</ejs-circulargauge>
```

## Non-Circular Gauges

Create semi-circular, quarter-circular, and custom arc gauges.

### Semi-Circular Gauge (Half Circle)

```typescript
<ejs-circulargauge id='gauge'>
  <e-axes>
    <e-axis [startAngle]='0' [endAngle]='180'>
      <!-- 0° to 180° = half circle -->
      <e-pointers>
        <e-pointer [value]='50'></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

**Use:**
- Bottom-mounted dashboard displays
- Width-constrained layouts
- Battery level indicators

### Quarter-Circular Gauge

```typescript
<e-axis [startAngle]='0' [endAngle]='90'>
  <!-- 0° to 90° = quarter circle -->
</e-axis>
```

**Use:**
- Corner-mounted widgets
- Compact displays
- Mobile layouts

### Custom Arc Range

```typescript
<e-axis [startAngle]='45' [endAngle]='315'>
  <!-- 45° to 315° = 270° arc (3/4 circle) -->
</e-axis>
```

### Direction Adjustment

Change measurement direction:

```typescript
<e-axis [startAngle]='0' [endAngle]='180' [direction]="'AntiClockWise'">
  <!-- Values increase counter-clockwise -->
</e-axis>
```

**Effect:** For quarter/semi gauges, removes wasted space, makes gauge fill available area.

### Semi-Gauge Dashboard Example

```typescript
export class AppComponent {
  metrics = [
    { label: 'CPU', value: 65 },
    { label: 'Memory', value: 45 },
    { label: 'Disk', value: 78 }
  ];
}
```

Template:
```html
<div style="width: 500px; height: 500px;">
    <ejs-circulargauge title="CPU">
      <e-axes>
        <e-axis
          [startAngle]="0"
          [endAngle]="180"
          [minimum]="0"
          [maximum]="100">

          <e-pointers>
            <e-pointer [value]="cpuValue" type="Needle"></e-pointer>
          </e-pointers>

        </e-axis>
      </e-axes>
    </ejs-circulargauge>
  </div>

  <!-- Memory Gauge -->
  <div style="width: 200px; height: 500px;">
    <ejs-circulargauge title="Memory">
      <e-axes>
        <e-axis
          [startAngle]="0"
          [endAngle]="180"
          [minimum]="0"
          [maximum]="100">

          <e-pointers>
            <e-pointer [value]="memoryValue" type="Needle"></e-pointer>
          </e-pointers>

        </e-axis>
      </e-axes>
    </ejs-circulargauge>
  </div>

  <!-- Disk Gauge -->
  <div style="width: 200px; height: 150px;">
    <ejs-circulargauge title="Disk">
      <e-axes>
        <e-axis
          [startAngle]="0"
          [endAngle]="180"
          [minimum]="0"
          [maximum]="100">

          <e-pointers>
            <e-pointer [value]="diskValue" type="Needle"></e-pointer>
          </e-pointers>

        </e-axis>
      </e-axes>
    </ejs-circulargauge>
  </div>
```

## Complete Styled Gauge Example

Combines positioning, styling, and animation:

```typescript
export class AppComponent {
  title = 'Performance Monitor';
  background = '#FFFFFF';
  
  titleStyle = {
    color: '#333333',
    fontFamily: 'Arial, sans-serif',
    fontWeight: '500',
    size: '16px'
  };

  borderStyle = {
    color: '#E0E0E0',
    width: 1
  };

  margin = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15
  };

  animationDuration = 2000;
  centerX = '50%';
  centerY = '50%';
}
```

Template:
```html
<ejs-circulargauge [title]='title'
                   [titleStyle]='titleStyle'
                   [background]='background'
                   [border]='borderStyle'
                   [margin]='margin'
                   [animationDuration]='animationDuration'
                   [centerX]='centerX'
                   [centerY]='centerY'>
  <e-axes>
    <e-axis [minimum]='0' [maximum]='100'>
      <e-ranges>
        <e-range [start]='0' [end]='40' color='#F44336'></e-range>
        <e-range [start]='40' [end]='70' color='#FFC107'></e-range>
        <e-range [start]='70' [end]='100' color='#4CAF50'></e-range>
      </e-ranges>
      <e-pointers>
        <e-pointer [value]='65' type='Needle'>
        </e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

---

