# Axes Configuration

## Table of Contents

- [Axis Customization](#axis-customization)
  - [Line Style](#line-style)
  - [Axis Background](#axis-background)
- [Angles and Direction](#angles-and-direction)
  - [Start and End Angles](#start-and-end-angles)
  - [Direction](#direction)
- [Axis Radius](#axis-radius)
  - [Pixel-Based Radius](#pixel-based-radius)
  - [Percentage-Based Radius](#percentage-based-radius)
  - [Example: Responsive Gauge](#example-responsive-gauge)
- [Ticks Configuration](#ticks-configuration)
  - [Major Ticks](#major-ticks)
  - [Minor Ticks](#minor-ticks)
  - [Tick Position](#tick-position)
  - [Complete Tick Configuration](#complete-tick-configuration)
- [Labels](#labels)
  - [Font Configuration](#font-configuration)
  - [Label Position](#label-position)
  - [Label Format](#label-format)
  - [Custom Label Format](#custom-label-format)
  - [Smart Labels (Auto Angle)](#smart-labels-auto-angle)
  - [Hide Intersecting Labels](#hide-intersecting-labels)
  - [Hide First/Last Label](#hide-firstlast-label)
- [Minimum and Maximum Values](#minimum-and-maximum-values)
- [Multiple Axes](#multiple-axes)

## Axis Customization

### Line Style

Customize the axis line appearance using `lineStyle` property:

```typescript
<e-axis [lineStyle]='lineStyle'>
  <e-pointers>
    <e-pointer [value]='50'></e-pointer>
  </e-pointers>
</e-axis>
```

Component:
```typescript
export class AppComponent {
  lineStyle = {
    color: '#0074E3',     // Axis line color
    width: 3              // Axis line width in pixels
  };
}
```

### Axis Background

Add background color to the axis area:

```typescript
<e-axis background='#E8F0FF'>
  <!-- axis content -->
</e-axis>
```

## Angles and Direction

### Start and End Angles

Control the arc range using `startAngle` and `endAngle`:

```typescript
<e-axis [startAngle]='200' [endAngle]='160'>
  <!-- Full arc: 200° to 160° = 320° visible -->
</e-axis>
```

**Common configurations:**

| Angle Range | Visual | Use Case |
|------------|--------|----------|
| 200° to 160° | 320° arc (default) | Standard speedometer |
| 0° to 180° | Half circle (bottom) | Dashboard display |
| 0° to 360° | Full circle | 360° gauge |
| 270° to 90° | Left half | Vertical layout |

### Direction

Set rotation direction with `direction` property:

```typescript
<e-axis [direction]="'ClockWise'">
  <!-- Values increase clockwise -->
</e-axis>
```

**Options:**
- `ClockWise` - Values increase clockwise (default)
- `AntiClockWise` - Values increase counterclockwise

## Axis Radius

Control the size of the gauge axis using `radius` property:

### Pixel-Based Radius

Set fixed size in pixels:

```typescript
<e-axis [radius]='200'>
  <!-- Gauge renders with 500px radius -->
</e-axis>
```

### Percentage-Based Radius

Set size relative to container:

```typescript
<e-axis [radius]='80%'>
  <!-- Gauge uses 80% of available container space -->
</e-axis>
```

**Benefits of percentage:**
- Responsive design (adapts to container size)
- Works across different screen sizes
- Maintains proportions

### Example: Responsive Gauge

```typescript
<ejs-circulargauge id='gauge'>
  <e-axes>
    <e-axis minimum=0 maximum=100 radius="90%">
      <e-pointers>
        <e-pointer [value]='65'></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

## Ticks Configuration

### Major Ticks

Major tick marks (larger marks) at intervals:

```typescript
<e-axis [majorTicks]='majorTicks'>
  <!-- axis content -->
</e-axis>
```

Component:
```typescript
export class AppComponent {
  majorTicks = {
    interval: 10,       // Tick every 10 units (0, 10, 20, 30...)
    height: 10,         // Tick mark height in pixels
    width: 2,           // Tick mark width
    color: '#333333'    // Tick color
  };
}
```

### Minor Ticks

Minor tick marks (smaller marks) between major ticks:

```typescript
<e-axis [minorTicks]='minorTicks'>
  <!-- axis content -->
</e-axis>
```

Component:
```typescript
export class AppComponent {
  minorTicks = {
    interval: 2,        // Tick every 2 units
    height: 5,          // Smaller than major ticks
    width: 1,
    color: '#999999'
  };
}
```

### Tick Position

Control tick placement with `position` and `offset`:

```typescript
<ejs-circulargauge id="circular-container">
    <e-axes>
        <e-axis [majorTicks]="majorTicks" [minorTicks]="minorTicks"></e-axis>
    </e-axes>
</ejs-circulargauge>
```

**Position options:**
- `Inside` - Ticks on inside of axis (default)
- `Outside` - Ticks on outside of axis

**Offset:** Distance in pixels between axis line and tick mark (default: 0)

### Complete Tick Configuration

```typescript
export class AppComponent {
  majorTicks = {
    interval: 10,
    height: 12,
    width: 2,
    color: '#0074E3',
    position: 'Outside',
    offset: 8
  };

  minorTicks = {
    interval: 2,
    height: 6,
    width: 1,
    color: '#B0B0B0',
    position: 'Inside',
    offset: 0
  };
}
```

```html
<e-axis [majorTicks]='majorTicks' [minorTicks]='minorTicks'></e-axis>
```

## Labels

### Font Configuration

Customize label appearance with `labelStyle.font`:

```typescript
<e-axis [labelStyle]='labelStyle'>
  <!-- axis content -->
</e-axis>
```

Component:
```typescript
export class AppComponent {
  labelStyle = {
    font: {
      fontFamily: 'Arial',
      fontStyle: 'Normal',
      fontWeight: '500',
      size: '14px',
      color: '#222222'
    }
  };
}
```

### Label Position

Control label placement relative to axis:

```typescript
<e-axis [labelStyle]='labelPosition'>
  <!-- axis content -->
</e-axis>
```

Component:
```typescript
export class AppComponent {
  labelPosition = {
    position: 'Outside',  // 'Inside' or 'Outside'
    offset: 10,           // Distance from axis (pixels)
    autoAngle: false       // Rotate labels along axis
  };
}
```

### Label Format

Format label values using `format` property:

```typescript
<e-axis [labelStyle]="{ format: 'n1' }">
  <!-- Labels show as: 0.0, 20.0, 40.0... -->
</e-axis>
```

**Format options:**

| Format | Example Value | Output | Description |
|--------|---------------|--------|-------------|
| `n1` | 100 | 100.0 | Number with 1 decimal |
| `n2` | 100 | 100.00 | Number with 2 decimals |
| `p1` | 0.5 | 50.0% | Percentage with 1 decimal |
| `c1` | 100 | $100.0 | Currency with 1 decimal |

### Custom Label Format

```typescript
<e-axis [labelStyle]="{ format: '{value}°C' }">
  <!-- Labels show as: 0°C, 20°C, 40°C... -->
</e-axis>
```

### Smart Labels (Auto Angle)

Rotate labels along the axis for better readability:

```typescript
<e-axis [labelStyle]="{ autoAngle: true }">
  <!-- Labels rotate to follow axis curve -->
</e-axis>
```

### Hide Intersecting Labels

When labels overlap, automatically hide some:

```typescript
<e-axis [hideIntersectingLabel]='true'>
  <!-- Overlapping labels are hidden -->
</e-axis>
```

### Hide First/Last Label

In full circles, avoid first/last label overlap:

```typescript
<e-axis [labelStyle]="{ hiddenLabel: 'First' }">
  <!-- First label hidden, prevents overlap at 0°/360° -->
</e-axis>
```

**Options:**
- `'First'` - Hide first label
- `'Last'` - Hide last label

## Minimum and Maximum Values

Set the axis value range:

```typescript
<e-axis [minimum]='0' [maximum]='200'>
  <!-- Axis displays 0 to 200 range -->
</e-axis>
```

**Example: Temperature gauge (−40 to 120°C):**

```typescript
<e-axis [minimum]='-40' [maximum]='120'>
  <e-pointers>
    <e-pointer [value]='25'></e-pointer> <!-- 25°C -->
  </e-pointers>
</e-axis>
```

## Multiple Axes

Add multiple axes to display layered data:

```typescript
<ejs-circulargauge id='gauge'>
  <e-axes>
    <!-- Outer axis -->
    <e-axis [minimum]='0' [maximum]='100' radius='100%'>
      <e-pointers>
        <e-pointer [value]='65' type='Needle'></e-pointer>
      </e-pointers>
    </e-axis>

    <!-- Inner axis -->
    <e-axis [minimum]='0' [maximum]='200' radius='60%'>
      <e-pointers>
        <e-pointer [value]='120' type='RangeBar'></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-circulargauge>
```

**Use cases:**
- **Dual metrics:** Humidity (outer) + Temperature (inner)
- **Layered information:** Current value (outer) + Average (inner)
- **Multi-scale displays:** Different units or ranges

Each axis:
- Has independent pointers
- Has independent ranges
- Can be independently styled
- Uses independent radius/angle settings

---

