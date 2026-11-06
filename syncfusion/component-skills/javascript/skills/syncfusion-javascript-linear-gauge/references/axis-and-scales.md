# Configuring Linear Gauge Axes and Scales in TypeScript and JavaScript

The axis defines the numeric scale of the Linear Gauge. It controls the minimum and maximum values, axis direction, line appearance, major and minor ticks, labels, ranges, and pointers.

## Table of Contents

- #prerequisites
- #axis-overview
  - #basic-axis
  - #axis-properties
- #scale-configuration
  - #minimum-and-maximum-values
  - #inversed-axis
  - #opposed-position
  - #show-the-last-label
- #tick-marks
  - #major-ticks
  - #minor-ticks
  - #tick-properties
  - #tick-positioning
  - #coarse-scale
  - #fine-scale
  - #hide-minor-ticks
- #label-formatting
  - #basic-labels
  - #label-format-strings
  - #global-number-formats
  - #font-styling
  - #label-positioning
  - #range-colored-labels
- #multiple-axes
  - #celsius-and-fahrenheit-axes
- #advanced-axis-features
  - #axis-line-customization
  - #dashed-axis-line
  - #dynamic-scale-updates
  - #dynamic-pointer-updates
  - #conditional-label-formatting
- #practical-examples
  - #temperature-scale
  - #pressure-gauge
  - #percentage-scale
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #troubleshooting

## Prerequisites

Install the Essential JS 2 Linear Gauge package.

```bash
npm install @syncfusion/ej2-lineargauge
```

For TypeScript applications, import the `LinearGauge` class.

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
```

Add an HTML element to host the Linear Gauge.

```html
<div id="gauge-container"></div>
```

Give the host a visible size.

```css
#gauge-container {
  display: block;
  width: 100%;
  height: 360px;
}
```

Create and append the gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

For JavaScript applications using the EJ2 global namespace:

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Axis Overview

An axis represents a numeric scale in the Linear Gauge.

A Linear Gauge can contain one or more axes. Each axis can include:

- An axis line
- Major ticks
- Minor ticks
- Labels
- Ranges
- Pointers

## Basic Axis

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      opposedPosition: false,
      isInversed: false,
      showLastLabel: true
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      opposedPosition: false,
      isInversed: false,
      showLastLabel: true
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Axis Properties

Common axis properties include:

- `minimum`: Specifies the minimum axis value. The default is `0`.
- `maximum`: Specifies the maximum axis value. The default is `100`.
- `isInversed`: Reverses the direction of the scale.
- `opposedPosition`: Places the axis on the opposite side.
- `line`: Customizes the axis line.
- `majorTicks`: Customizes the major tick marks.
- `minorTicks`: Customizes the minor tick marks.
- `labelStyle`: Customizes axis labels.
- `ranges`: Defines colored value regions.
- `pointers`: Defines value indicators.
- `showLastLabel`: Shows or hides the final label.

A complete axis configuration follows this structure:

```typescript
axes: [
  {
    minimum: 0,
    maximum: 100,
    isInversed: false,
    opposedPosition: false,
    showLastLabel: true,

    line: {
      width: 2,
      color: '#475569'
    },

    majorTicks: {
      interval: 20,
      height: 10,
      width: 2,
      color: '#334155'
    },

    minorTicks: {
      interval: 5,
      height: 5,
      width: 1,
      color: '#64748b'
    },

    labelStyle: {
      format: '{value}%'
    },

    ranges: [],

    pointers: []
  }
]
```

## Scale Configuration

## Minimum and Maximum Values

Use `minimum` and `maximum` to define the axis limits.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 50,

      pointers: [
        {
          value: 28,
          type: 'Marker'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 50,

      pointers: [
        {
          value: 28,
          type: 'Marker'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Ensure that:

- `minimum` is less than `maximum`.
- Pointer values remain inside the axis range.
- Range start and end values remain inside the axis range.
- Tick intervals are appropriate for the scale.

## Inversed Axis

Set `isInversed` to `true` to reverse the direction of the axis.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      isInversed: true,

      pointers: [
        {
          value: 65
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      isInversed: true,

      pointers: [
        {
          value: 65
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

For a horizontal gauge, inversion changes the scale direction from left-to-right to right-to-left.

For a vertical gauge, inversion changes the scale direction from bottom-to-top to top-to-bottom.

## Opposed Position

Set `opposedPosition` to `true` to place the axis on the opposite side of the gauge.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  orientation: 'Vertical',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      opposedPosition: true,

      labelStyle: {
        format: '{value}%'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  orientation: 'Vertical',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      opposedPosition: true,

      labelStyle: {
        format: '{value}%'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Use opposed positioning when multiple scales must appear on different sides of the gauge.

## Show the Last Label

Use `showLastLabel` to control the final axis label.

```typescript
axes: [
  {
    minimum: 0,
    maximum: 100,
    showLastLabel: true
  }
]
```

Set it to `false` when the final label overlaps another element.

```typescript
axes: [
  {
    minimum: 0,
    maximum: 100,
    showLastLabel: false
  }
]
```

## Tick Marks

Tick marks help users estimate and read values from the scale.

The Linear Gauge supports:

- Major ticks
- Minor ticks

## Major Ticks

Major ticks identify the primary scale intervals.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 20,
        width: 2,
        height: 10,
        color: '#334155',
        offset: 4,
        position: 'Outside'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 20,
        width: 2,
        height: 10,
        color: '#334155',
        offset: 4,
        position: 'Outside'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Minor Ticks

Minor ticks divide the space between major ticks.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 20,
        height: 10,
        width: 2
      },

      minorTicks: {
        interval: 5,
        height: 5,
        width: 1,
        color: '#64748b'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 20,
        height: 10,
        width: 2
      },

      minorTicks: {
        interval: 5,
        height: 5,
        width: 1,
        color: '#64748b'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Tick Properties

Common tick properties include:

- `interval`: Specifies the numeric distance between ticks.
- `width`: Specifies tick-line thickness in pixels.
- `height`: Specifies tick-line length in pixels.
- `color`: Specifies a valid CSS color.
- `offset`: Moves ticks relative to the axis.
- `position`: Positions ticks relative to the axis.

Supported tick positions include:

- `Inside`
- `Outside`
- `Cross`
- `Auto`

## Tick Positioning

### Inside

```typescript
majorTicks: {
  interval: 20,
  position: 'Inside'
}
```

### Outside

```typescript
majorTicks: {
  interval: 20,
  position: 'Outside'
}
```

### Cross

```typescript
majorTicks: {
  interval: 20,
  position: 'Cross'
}
```

### Automatic

```typescript
majorTicks: {
  interval: 20,
  position: 'Auto'
}
```

Use the same positioning approach for minor ticks.

## Coarse Scale

Use larger intervals when only broad value estimation is required.

```typescript
majorTicks: {
  interval: 50,
  height: 10,
  width: 2
},

minorTicks: {
  interval: 10,
  height: 5,
  width: 1
}
```

For a scale from `0` to `100`, major ticks appear at broad 50-unit intervals.

## Fine Scale

Use smaller intervals when more precise visual estimation is required.

```typescript
majorTicks: {
  interval: 10,
  height: 8,
  width: 2
},

minorTicks: {
  interval: 2,
  height: 4,
  width: 1
}
```

Avoid overly dense ticks on small screens.

## Hide Minor Ticks

Use a height of `0` when minor ticks should not be visible.

```typescript
minorTicks: {
  height: 0
}
```

Alternatively, omit `minorTicks` when minor-tick customization is not required.

```typescript
axes: [
  {
    minimum: 0,
    maximum: 100,

    majorTicks: {
      interval: 20
    }
  }
]
```

Do not rely on `interval: 0` as a universal way to disable minor ticks.

## Label Formatting

Use `labelStyle` to configure axis-label appearance and formatting.

## Basic Labels

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        offset: 8,
        position: 'Outside',

        font: {
          fontFamily: 'Arial',
          size: '12px',
          color: '#334155',
          fontWeight: '500'
        }
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        offset: 8,
        position: 'Outside',

        font: {
          fontFamily: 'Arial',
          size: '12px',
          color: '#334155',
          fontWeight: '500'
        }
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Label Format Strings

Use `{value}` as the axis-value placeholder.

### Temperature

```typescript
labelStyle: {
  format: '{value}°C'
}
```

### Fahrenheit

```typescript
labelStyle: {
  format: '{value}°F'
}
```

### Percentage

```typescript
labelStyle: {
  format: '{value}%'
}
```

### Pressure

```typescript
labelStyle: {
  format: '{value} bar'
}
```

### Currency with Static Prefix and Suffix

```typescript
labelStyle: {
  format: '${value}K'
}
```

In a regular quoted string, `${value}` remains literal and can be processed by the gauge.

When a JavaScript template literal is used, escape the placeholder.

```typescript
const format: string = `$\{value}K`;
```

A regular string is simpler:

```typescript
const format: string = '${value}K';
```

## Global Number Formats

The label format also supports applicable global number-format strings.

### One Decimal Place

```typescript
labelStyle: {
  format: 'n1'
}
```

### No Decimal Places

```typescript
labelStyle: {
  format: 'n0'
}
```

Do not use Python-style formatting.

```typescript
// Unsupported pattern.
labelStyle: {
  format: '{value:.2f}'
}
```

When specialized text is required, use the `axisLabelRender` event.

## Font Styling

```typescript
labelStyle: {
  font: {
    fontFamily: 'Georgia, serif',
    size: '14px',
    color: '#1e293b',
    fontStyle: 'Italic',
    fontWeight: '700',
    opacity: 1
  }
}
```

Common font properties include:

- `fontFamily`
- `size`
- `color`
- `fontStyle`
- `fontWeight`
- `opacity`

## Label Positioning

Use `labelStyle.position` to position labels relative to the axis.

```typescript
labelStyle: {
  position: 'Cross'
}
```

Supported positions include:

- `Inside`
- `Outside`
- `Cross`
- `Auto`

Use `offset` to move labels farther from or closer to the axis.

```typescript
labelStyle: {
  position: 'Outside',
  offset: 10
}
```

## Range-Colored Labels

Set `useRangeColor` to `true` to apply the corresponding range colors to labels.

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%',
        useRangeColor: true,

        font: {
          size: '13px',
          fontWeight: '600'
        }
      },

      ranges: [
        {
          start: 0,
          end: 40,
          color: '#15803d',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 40,
          end: 70,
          color: '#a16207',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 70,
          end: 100,
          color: '#b91c1c',
          startWidth: 15,
          endWidth: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Multiple Axes

Add multiple objects to the `axes` collection to display multiple independent scales.

Each axis can have its own:

- Minimum and maximum values
- Position
- Tick intervals
- Label format
- Ranges
- Pointers
- Axis line

Use `opposedPosition` to place axes on different sides.

## Celsius and Fahrenheit Axes

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const celsiusValue: number = 30;
const fahrenheitValue: number =
  celsiusValue * 9 / 5 + 32;

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',
  width: '100%',
  height: '380px',

  axes: [
    {
      minimum: -20,
      maximum: 50,
      opposedPosition: false,

      line: {
        color: '#2563eb',
        width: 2
      },

      majorTicks: {
        interval: 10,
        position: 'Outside',
        color: '#2563eb'
      },

      minorTicks: {
        interval: 2,
        position: 'Outside',
        color: '#93c5fd'
      },

      labelStyle: {
        format: '{value}°C',
        position: 'Outside',

        font: {
          color: '#1e3a8a',
          size: '12px'
        }
      },

      pointers: [
        {
          value: celsiusValue,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 18,
          width: 18
        }
      ]
    },

    {
      minimum: -4,
      maximum: 122,
      opposedPosition: true,

      line: {
        color: '#dc2626',
        width: 2
      },

      majorTicks: {
        interval: 18,
        position: 'Outside',
        color: '#dc2626'
      },

      minorTicks: {
        interval: 3.6,
        position: 'Outside',
        color: '#fca5a5'
      },

      labelStyle: {
        format: '{value}°F',
        position: 'Outside',

        font: {
          color: '#991b1b',
          size: '12px'
        }
      },

      pointers: [
        {
          value: fahrenheitValue,
          type: 'Marker',
          markerType: 'Diamond',
          color: '#dc2626',
          height: 18,
          width: 18
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var celsiusValue = 30;

var fahrenheitValue =
  celsiusValue * 9 / 5 + 32;

var gauge = new ej.lineargauge.LinearGauge({
  orientation: 'Horizontal',
  width: '100%',
  height: '380px',

  axes: [
    {
      minimum: -20,
      maximum: 50,
      opposedPosition: false,

      line: {
        color: '#2563eb',
        width: 2
      },

      majorTicks: {
        interval: 10,
        position: 'Outside',
        color: '#2563eb'
      },

      minorTicks: {
        interval: 2,
        position: 'Outside',
        color: '#93c5fd'
      },

      labelStyle: {
        format: '{value}°C',
        position: 'Outside',

        font: {
          color: '#1e3a8a',
          size: '12px'
        }
      },

      pointers: [
        {
          value: celsiusValue,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 18,
          width: 18
        }
      ]
    },

    {
      minimum: -4,
      maximum: 122,
      opposedPosition: true,

      line: {
        color: '#dc2626',
        width: 2
      },

      majorTicks: {
        interval: 18,
        position: 'Outside',
        color: '#dc2626'
      },

      minorTicks: {
        interval: 3.6,
        position: 'Outside',
        color: '#fca5a5'
      },

      labelStyle: {
        format: '{value}°F',
        position: 'Outside',

        font: {
          color: '#991b1b',
          size: '12px'
        }
      },

      pointers: [
        {
          value: fahrenheitValue,
          type: 'Marker',
          markerType: 'Diamond',
          color: '#dc2626',
          height: 18,
          width: 18
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

The Fahrenheit intervals align with the Celsius intervals:

- `10°C` equals `18°F`.
- `2°C` equals `3.6°F`.

## Advanced Axis Features

## Axis Line Customization

Use `line` inside an axis.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      line: {
        height: 250,
        width: 2,
        color: '#334155',
        offset: 2,
        dashArray: ''
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      line: {
        height: 250,
        width: 2,
        color: '#334155',
        offset: 2,
        dashArray: ''
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Common line properties include:

- `height`
- `width`
- `color`
- `offset`
- `dashArray`

## Dashed Axis Line

```typescript
line: {
  width: 2,
  color: '#64748b',
  dashArray: '5,5'
}
```

A solid line can use an empty `dashArray`.

```typescript
line: {
  width: 2,
  color: '#334155',
  dashArray: ''
}
```

## Dynamic Scale Updates

Update the axis model and call `refresh()`.

### TypeScript

```typescript
function updateScale(
  minimum: number,
  maximum: number
): void {
  if (minimum >= maximum) {
    throw new Error(
      'The minimum value must be less than the maximum value.'
    );
  }

  const axis = gauge.axes[0];

  axis.minimum = minimum;
  axis.maximum = maximum;

  if (
    axis.pointers[0].value < minimum
  ) {
    axis.pointers[0].value = minimum;
  }

  if (
    axis.pointers[0].value > maximum
  ) {
    axis.pointers[0].value = maximum;
  }

  gauge.refresh();
}
```

### JavaScript

```javascript
function updateScale(
  minimum,
  maximum
) {
  if (minimum >= maximum) {
    throw new Error(
      'The minimum value must be less than the maximum value.'
    );
  }

  var axis = gauge.axes[0];

  axis.minimum = minimum;
  axis.maximum = maximum;

  if (
    axis.pointers[0].value < minimum
  ) {
    axis.pointers[0].value = minimum;
  }

  if (
    axis.pointers[0].value > maximum
  ) {
    axis.pointers[0].value = maximum;
  }

  gauge.refresh();
}
```

Example:

```typescript
updateScale(0, 200);
```

## Dynamic Pointer Updates

For a smooth pointer-only update, use `setPointerValue`.

### TypeScript

```typescript
function updatePointer(
  value: number
): void {
  const axisIndex: number = 0;
  const pointerIndex: number = 0;
  const axis = gauge.axes[axisIndex];

  const safeValue: number = Math.min(
    axis.maximum,
    Math.max(axis.minimum, value)
  );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

### JavaScript

```javascript
function updatePointer(value) {
  var axisIndex = 0;
  var pointerIndex = 0;
  var axis = gauge.axes[axisIndex];

  var safeValue = Math.min(
    axis.maximum,
    Math.max(axis.minimum, value)
  );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

Example:

```typescript
updatePointer(75);
```

Use `setPointerValue` when only a pointer value changes. Use `refresh()` when the complete axis scale or styling changes.

## Conditional Label Formatting

Use the `axisLabelRender` event to customize each label before it is rendered.

### TypeScript

```typescript
import {
  LinearGauge,
  IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%'
      }
    }
  ],

  axisLabelRender: (
    args: IAxisLabelRenderEventArgs
  ): void => {
    const value: number =
      Number(
        args.text.replace('%', '')
      );

    if (value >= 70) {
      args.labelStyle.font.color =
        '#b91c1c';
      args.labelStyle.font.fontWeight =
        '700';
    } else if (value >= 40) {
      args.labelStyle.font.color =
        '#a16207';
      args.labelStyle.font.fontWeight =
        '600';
    } else {
      args.labelStyle.font.color =
        '#15803d';
      args.labelStyle.font.fontWeight =
        '500';
    }
  }
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%'
      }
    }
  ],

  axisLabelRender: function (args) {
    var value = Number(
      args.text.replace('%', '')
    );

    if (value >= 70) {
      args.labelStyle.font.color =
        '#b91c1c';

      args.labelStyle.font.fontWeight =
        '700';
    } else if (value >= 40) {
      args.labelStyle.font.color =
        '#a16207';

      args.labelStyle.font.fontWeight =
        '600';
    } else {
      args.labelStyle.font.color =
        '#15803d';

      args.labelStyle.font.fontWeight =
        '500';
    }
  }
});

gauge.appendTo('#gauge-container');
```

Configure `axisLabelRender` on the Linear Gauge, not inside an axis.

## Practical Examples

## Temperature Scale

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const temperature: number = 24;

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Vertical',
  width: '100%',
  height: '500px',

  container: {
    type: 'Thermometer',
    width: 30,
    backgroundColor: '#e2e8f0',
    border: {
      color: '#64748b',
      width: 1
    }
  },

  axes: [
    {
      minimum: -20,
      maximum: 50,

      majorTicks: {
        interval: 10,
        position: 'Outside',
        height: 10
      },

      minorTicks: {
        interval: 2,
        position: 'Outside',
        height: 5
      },

      labelStyle: {
        format: '{value}°C',
        position: 'Outside'
      },

      ranges: [
        {
          start: -20,
          end: 10,
          color: '#2563eb',
          startWidth: 12,
          endWidth: 12
        },
        {
          start: 10,
          end: 30,
          color: '#16a34a',
          startWidth: 12,
          endWidth: 12
        },
        {
          start: 30,
          end: 50,
          color: '#dc2626',
          startWidth: 12,
          endWidth: 12
        }
      ],

      pointers: [
        {
          value: temperature,
          type: 'Bar',
          color: '#b91c1c',
          width: 16,
          roundedCornerRadius: 4,
          description:
            'Current temperature is 24 degrees Celsius'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Pressure Gauge

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const pressure: number = 6.5;

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 10,

      majorTicks: {
        interval: 1,
        height: 10,
        width: 2,
        position: 'Outside'
      },

      minorTicks: {
        interval: 0.5,
        height: 5,
        width: 1,
        position: 'Outside'
      },

      labelStyle: {
        format: '{value} bar',
        position: 'Outside',

        font: {
          size: '12px',
          color: '#334155'
        }
      },

      pointers: [
        {
          value: pressure,
          type: 'Marker',
          markerType: 'Diamond',
          color: '#7c3aed',
          height: 20,
          width: 20
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var pressure = 6.5;

var gauge = new ej.lineargauge.LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 10,

      majorTicks: {
        interval: 1,
        height: 10,
        width: 2,
        position: 'Outside'
      },

      minorTicks: {
        interval: 0.5,
        height: 5,
        width: 1,
        position: 'Outside'
      },

      labelStyle: {
        format: '{value} bar',
        position: 'Outside',

        font: {
          size: '12px',
          color: '#334155'
        }
      },

      pointers: [
        {
          value: pressure,
          type: 'Marker',
          markerType: 'Diamond',
          color: '#7c3aed',
          height: 20,
          width: 20
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Percentage Scale

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      majorTicks: {
        interval: 25,
        position: 'Outside'
      },

      minorTicks: {
        interval: 5,
        position: 'Outside'
      },

      labelStyle: {
        format: '{value}%',
        position: 'Outside'
      },

      pointers: [
        {
          value: 72,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Complete TypeScript Example

The following example includes:

- Configurable minimum and maximum values
- Dynamic pointer updates
- Major and minor ticks
- Conditional axis-label colors
- Inversed-axis control
- Opposed-position control
- Native accessible controls
- Input validation
- Responsive layout

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Linear Gauge Axes and Scales
  </title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      color: #111827;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    }

    main {
      width: min(100%, 1050px);
      margin: 0 auto;
    }

    h1 {
      margin: 0 0 8px;
      font-size: clamp(22px, 4vw, 32px);
    }

    .description {
      max-width: 75ch;
      margin: 0 0 18px;
      line-height: 1.5;
    }

    .control-panel {
      display: grid;
      grid-template-columns:
        repeat(
          auto-fit,
          minmax(150px, 1fr)
        );
      gap: 12px;
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      background: #ffffff;
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field label {
      font-weight: 600;
    }

    .field input {
      min-height: 42px;
      padding: 8px 10px;
      border: 1px solid #64748b;
      border-radius: 6px;
      font: inherit;
    }

    .checkbox-field {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 42px;
    }

    .checkbox-field input {
      width: 20px;
      height: 20px;
    }

    .actions {
      display: flex;
      align-items: end;
    }

    .actions button {
      min-height: 42px;
      width: 100%;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .actions button:hover {
      background: #dbeafe;
    }

    .actions button:focus-visible,
    .field input:focus-visible,
    .checkbox-field input:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    .gauge-card {
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #ffffff;
    }

    #gauge-container {
      width: 100%;
      height: 300px;
    }

    #status {
      margin: 12px 0 0;
      color: #334155;
    }

    @media (min-width: 768px) {
      #gauge-container {
        height: 380px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Configurable Linear Gauge Scale</h1>

    <p class="description">
      Change the scale limits, pointer value,
      axis direction, and axis position.
    </p>

    <section
      class="control-panel"
      aria-label="Gauge scale controls"
    >
      <div class="field">
        <label for="minimum">
          Minimum
        </label>

        <input
          id="minimum"
          type="number"
          value="0"
        />
      </div>

      <div class="field">
        <label for="maximum">
          Maximum
        </label>

        <input
          id="maximum"
          type="number"
          value="100"
        />
      </div>

      <div class="field">
        <label for="pointer-value">
          Pointer value
        </label>

        <input
          id="pointer-value"
          type="number"
          value="65"
        />
      </div>

      <label class="checkbox-field">
        <input
          id="inversed"
          type="checkbox"
        />
        Inversed axis
      </label>

      <label class="checkbox-field">
        <input
          id="opposed"
          type="checkbox"
        />
        Opposed position
      </label>

      <div class="actions">
        <button id="apply" type="button">
          Apply Changes
        </button>
      </div>
    </section>

    <section
      class="gauge-card"
      aria-label="Configurable percentage gauge"
    >
      <div id="gauge-container"></div>

      <p
        id="status"
        role="status"
        aria-live="polite"
      >
        Scale: 0 to 100. Current value: 65.
      </p>
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  LinearGauge,
  IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title: 'System Utilization',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '19px',
      fontWeight: '700'
    },

    margin: {
      left: 25,
      right: 25,
      top: 25,
      bottom: 30
    },

    container: {
      width: 26,
      height: 0,
      type: 'RoundedRectangle',
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      {
        minimum: 0,
        maximum: 100,
        isInversed: false,
        opposedPosition: false,
        showLastLabel: true,

        line: {
          width: 2,
          color: '#475569',
          offset: 0,
          dashArray: ''
        },

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 11,
          width: 2,
          color: '#334155',
          offset: 4
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 6,
          width: 1,
          color: '#64748b',
          offset: 4
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 9,

          font: {
            fontFamily: 'Arial',
            size: '13px',
            color: '#334155',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#15803d',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 40,
            end: 70,
            color: '#a16207',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 70,
            end: 100,
            color: '#b91c1c',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          }
        ],

        pointers: [
          {
            value: 65,
            type: 'Bar',
            color: '#1e293b',
            width: 10,
            position: 'Cross',
            roundedCornerRadius: 4,
            animationDuration: 600,
            description:
              'Current utilization is 65 percent'
          },
          {
            value: 65,
            type: 'Marker',
            markerType: 'InvertedTriangle',
            color: '#111827',
            height: 18,
            width: 18,
            position: 'Outside',
            placement: 'Near',
            offset: 7
          }
        ]
      }
    ],

    axisLabelRender: (
      args: IAxisLabelRenderEventArgs
    ): void => {
      const numericText: string =
        args.text.replace(
          /[^0-9.-]/g,
          ''
        );

      const value: number =
        Number(numericText);

      if (value >= 70) {
        args.labelStyle.font.color =
          '#991b1b';
      } else if (value >= 40) {
        args.labelStyle.font.color =
          '#854d0e';
      } else {
        args.labelStyle.font.color =
          '#166534';
      }
    }
  });

gauge.appendTo('#gauge-container');

function getInput(
  selector: string
): HTMLInputElement {
  const input:
    HTMLInputElement | null =
      document.querySelector<HTMLInputElement>(
        selector
      );

  if (!input) {
    throw new Error(
      `Input not found: ${selector}`
    );
  }

  return input;
}

const minimumInput:
  HTMLInputElement =
    getInput('#minimum');

const maximumInput:
  HTMLInputElement =
    getInput('#maximum');

const pointerInput:
  HTMLInputElement =
    getInput('#pointer-value');

const inversedInput:
  HTMLInputElement =
    getInput('#inversed');

const opposedInput:
  HTMLInputElement =
    getInput('#opposed');

const status:
  HTMLElement | null =
    document.getElementById('status');

const applyButton:
  HTMLButtonElement | null =
    document.querySelector<HTMLButtonElement>(
      '#apply'
    );

function setStatus(
  message: string
): void {
  if (status) {
    status.textContent = message;
  }
}

function calculateInterval(
  minimum: number,
  maximum: number
): number {
  const difference: number =
    maximum - minimum;

  return Math.max(
    difference / 5,
    1
  );
}

function applyChanges(): void {
  const minimum: number =
    Number(minimumInput.value);

  const maximum: number =
    Number(maximumInput.value);

  const requestedValue: number =
    Number(pointerInput.value);

  if (
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    !Number.isFinite(requestedValue)
  ) {
    setStatus(
      'Enter valid numeric values.'
    );

    return;
  }

  if (minimum >= maximum) {
    setStatus(
      'Minimum must be less than maximum.'
    );

    return;
  }

  const pointerValue: number =
    Math.min(
      maximum,
      Math.max(minimum, requestedValue)
    );

  const axis = gauge.axes[0];
  const majorInterval: number =
    calculateInterval(
      minimum,
      maximum
    );

  axis.minimum = minimum;
  axis.maximum = maximum;
  axis.isInversed =
    inversedInput.checked;
  axis.opposedPosition =
    opposedInput.checked;

  axis.majorTicks.interval =
    majorInterval;

  axis.minorTicks.interval =
    majorInterval / 4;

  axis.ranges[0].start =
    minimum;

  axis.ranges[0].end =
    minimum +
    (maximum - minimum) * 0.4;

  axis.ranges[1].start =
    axis.ranges[0].end;

  axis.ranges[1].end =
    minimum +
    (maximum - minimum) * 0.7;

  axis.ranges[2].start =
    axis.ranges[1].end;

  axis.ranges[2].end =
    maximum;

  axis.pointers[0].value =
    pointerValue;

  axis.pointers[1].value =
    pointerValue;

  pointerInput.value =
    pointerValue.toString();

  gauge.refresh();

  setStatus(
    `Scale: ${minimum} to ${maximum}. ` +
    `Current value: ${pointerValue}.`
  );
}

applyButton?.addEventListener(
  'click',
  applyChanges
);

window.addEventListener(
  'beforeunload',
  (): void => {
    applyButton?.removeEventListener(
      'click',
      applyChanges
    );

    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Complete JavaScript Example

Use the same `index.html` from the complete TypeScript example.

Ensure the EJ2 Linear Gauge global script is loaded before `index.js`.

### index.js

```javascript
var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title: 'System Utilization',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '19px',
      fontWeight: '700'
    },

    margin: {
      left: 25,
      right: 25,
      top: 25,
      bottom: 30
    },

    container: {
      width: 26,
      height: 0,
      type: 'RoundedRectangle',
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      {
        minimum: 0,
        maximum: 100,
        isInversed: false,
        opposedPosition: false,
        showLastLabel: true,

        line: {
          width: 2,
          color: '#475569',
          offset: 0,
          dashArray: ''
        },

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 11,
          width: 2,
          color: '#334155',
          offset: 4
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 6,
          width: 1,
          color: '#64748b',
          offset: 4
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 9,

          font: {
            fontFamily: 'Arial',
            size: '13px',
            color: '#334155',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#15803d',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 40,
            end: 70,
            color: '#a16207',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          },
          {
            start: 70,
            end: 100,
            color: '#b91c1c',
            position: 'Inside',
            startWidth: 14,
            endWidth: 14
          }
        ],

        pointers: [
          {
            value: 65,
            type: 'Bar',
            color: '#1e293b',
            width: 10,
            position: 'Cross',
            roundedCornerRadius: 4,
            animationDuration: 600,
            description:
              'Current utilization is 65 percent'
          },
          {
            value: 65,
            type: 'Marker',
            markerType: 'InvertedTriangle',
            color: '#111827',
            height: 18,
            width: 18,
            position: 'Outside',
            placement: 'Near',
            offset: 7
          }
        ]
      }
    ],

    axisLabelRender: function (args) {
      var numericText =
        args.text.replace(
          /[^0-9.-]/g,
          ''
        );

      var value = Number(numericText);

      if (value >= 70) {
        args.labelStyle.font.color =
          '#991b1b';
      } else if (value >= 40) {
        args.labelStyle.font.color =
          '#854d0e';
      } else {
        args.labelStyle.font.color =
          '#166534';
      }
    }
  });

gauge.appendTo('#gauge-container');

function getInput(selector) {
  var input =
    document.querySelector(selector);

  if (!input) {
    throw new Error(
      'Input not found: ' + selector
    );
  }

  return input;
}

var minimumInput =
  getInput('#minimum');

var maximumInput =
  getInput('#maximum');

var pointerInput =
  getInput('#pointer-value');

var inversedInput =
  getInput('#inversed');

var opposedInput =
  getInput('#opposed');

var status =
  document.getElementById('status');

var applyButton =
  document.getElementById('apply');

function setStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

function calculateInterval(
  minimum,
  maximum
) {
  var difference =
    maximum - minimum;

  return Math.max(
    difference / 5,
    1
  );
}

function applyChanges() {
  var minimum =
    Number(minimumInput.value);

  var maximum =
    Number(maximumInput.value);

  var requestedValue =
    Number(pointerInput.value);

  if (
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    !Number.isFinite(requestedValue)
  ) {
    setStatus(
      'Enter valid numeric values.'
    );

    return;
  }

  if (minimum >= maximum) {
    setStatus(
      'Minimum must be less than maximum.'
    );

    return;
  }

  var pointerValue =
    Math.min(
      maximum,
      Math.max(minimum, requestedValue)
    );

  var axis = gauge.axes[0];

  var majorInterval =
    calculateInterval(
      minimum,
      maximum
    );

  axis.minimum = minimum;
  axis.maximum = maximum;

  axis.isInversed =
    inversedInput.checked;

  axis.opposedPosition =
    opposedInput.checked;

  axis.majorTicks.interval =
    majorInterval;

  axis.minorTicks.interval =
    majorInterval / 4;

  axis.ranges[0].start =
    minimum;

  axis.ranges[0].end =
    minimum +
    (maximum - minimum) * 0.4;

  axis.ranges[1].start =
    axis.ranges[0].end;

  axis.ranges[1].end =
    minimum +
    (maximum - minimum) * 0.7;

  axis.ranges[2].start =
    axis.ranges[1].end;

  axis.ranges[2].end =
    maximum;

  axis.pointers[0].value =
    pointerValue;

  axis.pointers[1].value =
    pointerValue;

  pointerInput.value =
    String(pointerValue);

  gauge.refresh();

  setStatus(
    'Scale: ' +
    minimum +
    ' to ' +
    maximum +
    '. Current value: ' +
    pointerValue +
    '.'
  );
}

if (applyButton) {
  applyButton.addEventListener(
    'click',
    applyChanges
  );
}

window.addEventListener(
  'beforeunload',
  function () {
    if (applyButton) {
      applyButton.removeEventListener(
        'click',
        applyChanges
      );
    }

    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Best Practices

### Use Meaningful Scale Limits

Choose minimum and maximum values that represent the actual data domain.

```typescript
axes: [
  {
    minimum: 0,
    maximum: 10
  }
]
```

Avoid using a very broad scale when all expected values occupy a small part of it.

### Keep Pointer Values Within the Scale

Clamp dynamic values before assigning them.

```typescript
const safeValue: number =
  Math.min(
    axis.maximum,
    Math.max(axis.minimum, value)
  );
```

### Choose Readable Tick Intervals

For a `0` to `100` scale:

```typescript
majorTicks: {
  interval: 20
},

minorTicks: {
  interval: 5
}
```

For a `0` to `10` scale:

```typescript
majorTicks: {
  interval: 1
},

minorTicks: {
  interval: 0.5
}
```

### Avoid Excessive Tick Density

Small intervals can cause visual clutter.

```typescript
// May be too dense for a small gauge.
majorTicks: {
  interval: 1
},

minorTicks: {
  interval: 0.1
}
```

Test the configuration at the smallest supported screen size.

### Keep Labels Concise

```typescript
labelStyle: {
  format: '{value}%'
}
```

Avoid lengthy text on every tick label.

### Use Opposed Position for Multiple Axes

```typescript
axes: [
  {
    opposedPosition: false
  },
  {
    opposedPosition: true
  }
]
```

This prevents labels and ticks from competing for the same space.

### Use Equivalent Scales for Related Units

When displaying Celsius and Fahrenheit together, ensure corresponding values align.

```typescript
const fahrenheit: number =
  celsius * 9 / 5 + 32;
```

### Use setPointerValue for Pointer-Only Changes

```typescript
gauge.setPointerValue(
  0,
  0,
  newValue
);
```

Use `refresh()` when changing:

- Minimum or maximum values
- Tick intervals
- Label styles
- Axis position
- Axis inversion
- Ranges
- Axis-line appearance

### Use axisLabelRender for Conditional Labels

```typescript
axisLabelRender: (
  args: IAxisLabelRenderEventArgs
): void => {
  args.labelStyle.font.color =
    '#b91c1c';
}
```

Do not attempt to configure an unsupported label template.

### Provide Units

```typescript
labelStyle: {
  format: '{value} bar'
}
```

Units help users interpret the scale correctly.

## Troubleshooting

### Axis Is Not Displayed

Confirm that the `axes` collection contains a valid axis.

```typescript
axes: [
  {
    minimum: 0,
    maximum: 100,

    line: {
      width: 2,
      color: '#334155'
    }
  }
]
```

Ensure the host has a nonzero size.

```css
#gauge-container {
  width: 100%;
  height: 360px;
}
```

### Minimum and Maximum Are Ignored

Confirm that:

- The property names use the correct casing.
- `minimum` is less than `maximum`.
- The properties are inside an object in the `axes` collection.
- `refresh()` is called after dynamic changes.

```typescript
gauge.axes[0].minimum = 0;
gauge.axes[0].maximum = 200;
gauge.refresh();
```

### Axis Direction Is Incorrect

Check `isInversed`.

```typescript
axes: [
  {
    isInversed: false
  }
]
```

Set it to `true` only when reverse scale direction is required.

### Axis Is on the Wrong Side

Check `opposedPosition`.

```typescript
axes: [
  {
    opposedPosition: true
  }
]
```

### Major Ticks Are Not Visible

Provide a valid interval and visible dimensions.

```typescript
majorTicks: {
  interval: 20,
  height: 10,
  width: 2,
  color: '#334155'
}
```

### Minor Ticks Are Too Dense

Increase the minor interval.

```typescript
minorTicks: {
  interval: 5
}
```

Or hide them.

```typescript
minorTicks: {
  height: 0
}
```

### Tick Position Is Incorrect

Use one of the supported values.

```typescript
majorTicks: {
  position: 'Inside'
}
```

```typescript
majorTicks: {
  position: 'Outside'
}
```

```typescript
majorTicks: {
  position: 'Cross'
}
```

```typescript
majorTicks: {
  position: 'Auto'
}
```

Check letter casing.

### Labels Are Not Formatted

Use `{value}` as the placeholder.

```typescript
labelStyle: {
  format: '{value}%'
}
```

Do not use Python-style formatting.

```typescript
// Avoid.
labelStyle: {
  format: '{value:.2f}'
}
```

Use a global number format when decimals are required.

```typescript
labelStyle: {
  format: 'n2'
}
```

### Conditional Label Colors Are Not Applied

Configure `axisLabelRender` on the gauge.

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    axisLabelRender: (
      args: IAxisLabelRenderEventArgs
    ): void => {
      args.labelStyle.font.color =
        '#b91c1c';
    }
  });
```

Do not place the event inside an axis object.

### Multiple Axes Overlap

Use opposed positioning.

```typescript
axes: [
  {
    opposedPosition: false
  },
  {
    opposedPosition: true
  }
]
```

Also adjust tick and label positions.

```typescript
labelStyle: {
  position: 'Outside'
},

majorTicks: {
  position: 'Outside'
}
```

Increase the gauge height if both axes still need more space.

### Dynamic Scale Does Not Update

Update the model and call `refresh()`.

```typescript
gauge.axes[0].minimum = 0;
gauge.axes[0].maximum = 200;
gauge.refresh();
```

### Pointer Does Not Move

Use `setPointerValue`.

```typescript
gauge.setPointerValue(
  0,
  0,
  75
);
```

The arguments represent:

1. Axis index
2. Pointer index
3. New value

Ensure that the indexes reference an existing axis and pointer.

### Pointer Falls Outside the New Scale

Clamp the value before updating the scale.

```typescript
const safeValue: number =
  Math.min(
    newMaximum,
    Math.max(newMinimum, pointerValue)
  );
```

### Last Label Is Missing

Set `showLastLabel` to `true`.

```typescript
axes: [
  {
    showLastLabel: true
  }
]
```

If the final label overlaps another element, increase the gauge margin or change the label position.

### Gauge Is Not Visible

Confirm that:

1. The host element exists.
2. The host has a nonzero width and height.
3. The gauge is appended after the host is available.
4. The correct package or global script is loaded.
5. No earlier JavaScript error stopped initialization.

```html
<div id="gauge-container"></div>
```

```css
#gauge-container {
  width: 100%;
  height: 360px;
}
```

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```