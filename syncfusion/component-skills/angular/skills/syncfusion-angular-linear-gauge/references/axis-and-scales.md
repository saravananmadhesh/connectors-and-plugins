# Configuring Axes and Scales

## Table of Contents

- [Axis Overview](#axis-overview)
  - [Axis Properties](#axis-properties)
- [Scale Configuration](#scale-configuration)
  - [Setting Min and Max Values](#setting-min-and-max-values)
  - [Opposed Position](#opposed-position)
- [Tick Marks](#tick-marks)
  - [Tick Properties](#tick-properties)
  - [Examples](#examples)
- [Label Formatting](#label-formatting)
  - [Basic Labels](#basic-labels)
  - [Format Strings](#format-strings)
  - [Font Styling](#font-styling)
  - [Label Positioning](#label-positioning)
- [Multiple Axes](#multiple-axes)
- [Advanced Axis Features](#advanced-axis-features)
  - [Axis Line Style](#axis-line-style)
  - [Dynamic Scale Updates](#dynamic-scale-updates)
  - [Conditional Formatting](#conditional-formatting)
- [Practical Examples](#practical-examples)
  - [Temperature Scale CelsiusFahrenheit](#temperature-scale-celsiusfahrenheit)
  - [Pressure Gauge Bar](#pressure-gauge-bar)
  - [Percentage Scale](#percentage-scale)

## Axis Overview

The axis defines the scale of the Linear Gauge. It determines the minimum and maximum values displayed and how data is represented.

```typescript
<e-axis [minimum]="0" 
        [maximum]="100"
        [opposedPosition]="false"
  <!-- Ranges, pointers, labels, ticks -->
</e-axis>
```

### Axis Properties

| Property          | Type            | Default | Description |
|-------------------|-----------------|---------|-------------|
| `minimum`        | number          | 0       | Sets and gets the minimum value for the axis. |
| `maximum`           | number          | 100     | Sets and gets the maximum value for the axis. |
| `isInversed`        | boolean         | false   | Enables or disables the inversed axis. |
| `opposedPosition`   | boolean         | false   | Enables or disables the opposed position of the axis in the linear gauge. |
| `line`              | LineModel       | —       | Sets and gets the options for customizing the appearance of the axis line. |
| `majorTicks`        | TickModel       | —       | Sets and gets the options for customizing the major tick lines. |
| `minorTicks`        | TickModel       | —       | Sets and gets the options for customizing the minor tick lines. |
| `labelStyle`        | LabelModel      | —       | Sets and gets the options for customizing the appearance of the labels in the axis. |
| `ranges`           | RangeModel[]    | —       | Sets and gets the options for customizing the ranges of an axis. |
| `pointers`          | PointerModel[]  | —       | Sets and gets the options for customizing the pointers of an axis. |
| `showLastLabel`     | boolean         | false   | Shows or hides the last label in the axis of the linear gauge. |

## Scale Configuration

### Setting Min and Max Values

Define custom scale limits:

```typescript
<e-axis [minimum]="0" [maximum]="50">
  <!-- For temperature in Celsius -->
</e-axis>
```

### Opposed Position

Place the axis labels on the opposite side:

```typescript
<ejs-lineargauge [orientation]="'Vertical'">
  <e-axes>
    <e-axis [minimum]="0" [maximum]="100" [opposedPosition]="true">
      <!-- Labels appear on right side instead of left -->
    </e-axis>
  </e-axes>
</ejs-lineargauge>
```

## Tick Marks

Tick marks help users read the scale accurately. Configure major and minor ticks:

```typescript
<e-axis [minimum]="0" [maximum]="100"
        [majorTicks]="majorTicks"
        [minorTicks]="minorTicks">
</e-axis>

// In component:
majorTicks = {
  interval: 20,
  width: 2,
  height: 8,
  color: '#333'
};

minorTicks = {
  interval: 5,
  width: 1,
  height: 5,
  color: '#999'
};
```

### Tick Properties

| Property | Type | Description |
|----------|------|-------------|
| `interval` | number | Distance between ticks in units |
| `width` | number | Tick line thickness (pixels) |
| `height` | number | Tick line length (pixels) |
| `color` | string | Tick color (hex or CSS color) |
| `offset` | number | Distance from axis (pixels) |
| `position` | Position | Value to place the ticks in the axis |

### Examples

**Coarse scale (large intervals):**
```typescript
majorTicks = { interval: 50, height: 10 };
minorTicks = { interval: 10, height: 5 };
```

**Fine scale (small intervals):**
```typescript
majorTicks = { interval: 10, height: 8 };
minorTicks = { interval: 2, height: 3 };
```

**No minor ticks:**
```typescript
minorTicks = { interval: 0 }; // Disable minor ticks
```

## Label Formatting

### Basic Labels

Configure how axis values display:

```typescript
<e-axis [minimum]="0" [maximum]="100"
        [labelStyle]="labelStyle">
</e-axis>

labelStyle = {
    font: {
      fontFamily: 'Arial',
      size: '12px',
      color: '#333'
    },
    offset: -10,
};
```

### Format Strings

Add units or custom formatting:

```typescript
// Temperature with degree symbol
labelStyle = {
  format: '{value}°C'
};

// Currency
labelStyle = {
  format: '${value}k'
};

// Percentage
labelStyle = {
  format: '{value}%'
};

// Custom decimal places
labelStyle = {
  format: '{value:.2f}'
};
```

### Font Styling

Customize label appearance:

```typescript
labelStyle = {
  font: {
    fontFamily: 'Georgia, serif',
    size: '14px',
    color: '#2c3e50',
    fontStyle: 'italic',
    fontWeight: 'bold',
    opacity: 1
  }
};
```

### Label Positioning

Control label placement:

```typescript
labelStyle = {
   position: "Cross"
};
```

## Multiple Axes

Display multiple independent scales on the same gauge:

```typescript
<ejs-lineargauge [orientation]="'Horizontal'">
  <e-axes>
    <!-- First axis (Celsius) -->
    <e-axis [minimum]="0" [maximum]="50"
            [labelStyle]="{ format: '{value}°C' }"
            [axisLabelRenderEventArgs]="onAxisLabelRender">
      <e-pointers>
        <e-pointer [value]="30"></e-pointer>
      </e-pointers>
    </e-axis>
    
    <!-- Second axis (Fahrenheit) -->
    <e-axis [minimum]="32" [maximum]="122"
            [labelStyle]="{ format: '{value}°F' }"
            [opposedPosition]="true">
      <e-pointers>
        <e-pointer [value]="86" [color]="'#ff6600'"></e-pointer>
      </e-pointers>
    </e-axis>
  </e-axes>
</ejs-lineargauge>
```

## Advanced Axis Features

### Axis Line Style

Customize the axis line itself:

```typescript
<e-axis [minimum]="0" [maximum]="100"
        [line]="axisLine">
</e-axis>

axisLine = {
  width: 2,
  color: '#333',
};
```

### Dynamic Scale Updates

Update axis range based on data:

```typescript
export class GaugeComponent implements OnInit {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;
  
  updateScale(newMin: number, newMax: number): void {
    // Change axis range programmatically
    this.gaugeRef.axes[0].minimum = newMin;
    this.gaugeRef.axes[0].maximum = newMax;
    this.gaugeRef.refresh();
  }
}
```

### Conditional Formatting

Adjust axis properties based on current value:

```typescript
onAxisLabelRender(args: any): void {
  if (parseInt(args.text) > 70) {
    args.labelStyle.font.color = '#e74c3c'; // Red for high values
  } else if (parseInt(args.text) > 40) {
    args.labelStyle.font.color = '#f39c12'; // Orange for medium
  } else {
    args.labelStyle.font.color = '#27ae60'; // Green for low
  }
}
```

## Practical Examples

### Temperature Scale (Celsius/Fahrenheit)

```typescript
export class TemperatureGaugeComponent {
  celsiusAxis = {
    minimum: -50,
    maximum: 50,
    labelStyle: { format: '{value}°C' },
    majorTicks: { interval: 10 },
    minorTicks: { interval: 2 }
  };
  
  fahrenheitAxis = {
    minimum: -58,
    maximum: 122,
    labelStyle: { format: '{value}°F' },
    majorTicks: { interval: 20 },
    minorTicks: { interval: 5 },
    opposedPosition: true
  };
}
```

### Pressure Gauge (Bar)

```typescript
<e-axis [minimum]="0" [maximum]="10"
        [labelStyle]="{ format: '{value} bar' }"
        [majorTicks]="{ interval: 1, height: 10 }"
        [minorTicks]="{ interval: 0.5, height: 5 }">
</e-axis>
```

### Percentage Scale

```typescript
<e-axis [minimum]="0" [maximum]="100"
        [labelStyle]="{ format: '{value}%' }"
        [majorTicks]="{ interval: 25 }"
        [minorTicks]="{ interval: 5 }">
</e-axis>
```
