# Linear Gauge Ranges and Pointers in TypeScript and JavaScript

Ranges represent value zones on a Linear Gauge axis. Pointers display current, target, average, threshold, or comparison values.

Use ranges to communicate categories such as:

- Normal
- Warning
- Critical
- Low
- Medium
- High

Use pointers to communicate one or more measured values.

## Table of Contents

- #prerequisites
- #understanding-ranges
- #creating-ranges
  - #basic-range
  - #named-range-data
  - #complete-range-configuration
- #range-styling
  - #range-properties
  - #range-position
  - #offset-and-width
  - #tapered-ranges
  - #range-border
  - #range-colored-labels
  - #linear-gradient-range
  - #radial-gradient-range
- #understanding-pointers
- #pointer-types
  - #bar-pointer
  - #marker-pointer
  - #image-pointer
  - #text-pointer
- #pointer-styling
  - #pointer-properties
  - #bar-pointer-styling
  - #marker-pointer-styling
  - #pointer-border-and-opacity
  - #draggable-pointer
- #multiple-pointers
- #animations
  - #complete-gauge-animation
  - #pointer-animation
  - #reduced-motion
- #dynamic-updates
  - #update-a-pointer-value
  - #update-multiple-pointers
  - #update-a-range
  - #real-time-value-simulation
- #practical-examples
  - #traffic-status-gauge
  - #performance-gauge
  - #dual-value-display
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #troubleshooting

## Prerequisites

Install the Essential JS 2 Linear Gauge package.

```bash
npm install @syncfusion/ej2-lineargauge
```

For TypeScript, import the `LinearGauge` class.

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
```

Add a host element.

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

## Understanding Ranges

A range is a colored region associated with part of an axis.

Each range is defined inside `axes[].ranges` using `start` and `end`.

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 30,
          color: '#166534',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 30,
          end: 70,
          color: '#854d0e',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 70,
          end: 100,
          color: '#991b1b',
          startWidth: 15,
          endWidth: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

A Linear Gauge can contain any number of ranges.

Ranges should remain within the axis minimum and maximum values.

## Creating Ranges

## Basic Range

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 50,
          color: '#0284c7',
          startWidth: 15,
          endWidth: 15
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
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 50,
          color: '#0284c7',
          startWidth: 15,
          endWidth: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Named Range Data

The Linear Gauge range model does not require a display-name property.

If the application needs names for legends, summaries, tooltips, or business logic, maintain the names in application data and map the visual properties into the gauge configuration.

### TypeScript

```typescript
import {
  LinearGauge,
  RangeModel
} from '@syncfusion/ej2-lineargauge';

interface StatusRange {
  name: string;
  start: number;
  end: number;
  color: string;
}

const statusRanges: StatusRange[] = [
  {
    name: 'Normal',
    start: 0,
    end: 40,
    color: '#166534'
  },
  {
    name: 'Warning',
    start: 40,
    end: 70,
    color: '#854d0e'
  },
  {
    name: 'Critical',
    start: 70,
    end: 100,
    color: '#991b1b'
  }
];

const ranges: RangeModel[] =
  statusRanges.map(
    (item: StatusRange): RangeModel => ({
      start: item.start,
      end: item.end,
      color: item.color,
      startWidth: 15,
      endWidth: 15
    })
  );

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,
      ranges: ranges
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var statusRanges = [
  {
    name: 'Normal',
    start: 0,
    end: 40,
    color: '#166534'
  },
  {
    name: 'Warning',
    start: 40,
    end: 70,
    color: '#854d0e'
  },
  {
    name: 'Critical',
    start: 70,
    end: 100,
    color: '#991b1b'
  }
];

var ranges = statusRanges.map(
  function (item) {
    return {
      start: item.start,
      end: item.end,
      color: item.color,
      startWidth: 15,
      endWidth: 15
    };
  }
);

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,
      ranges: ranges
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Complete Range Configuration

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 20,
          end: 80,
          color: '#7c3aed',
          offset: 10,
          position: 'Outside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#4c1d95',
            width: 2
          }
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Range Styling

## Range Properties

Common range properties include:

- `start`: Specifies the range start value.
- `end`: Specifies the range end value.
- `color`: Specifies the solid range color.
- `startWidth`: Specifies the thickness at the start.
- `endWidth`: Specifies the thickness at the end.
- `offset`: Positions the range relative to the axis.
- `position`: Specifies the range position.
- `border`: Customizes the range boundary.
- `linearGradient`: Applies a linear gradient.
- `radialGradient`: Applies a radial gradient.

## Range Position

Supported range positions include:

- `Inside`
- `Outside`
- `Cross`
- `Auto`

### Inside

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    position: 'Inside',
    startWidth: 15,
    endWidth: 15
  }
]
```

### Outside

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    position: 'Outside',
    startWidth: 15,
    endWidth: 15
  }
]
```

### Cross

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    position: 'Cross',
    startWidth: 15,
    endWidth: 15
  }
]
```

## Offset and Width

Use `offset` to move a range away from the axis.

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    color: '#0284c7',
    startWidth: 20,
    endWidth: 20,
    offset: 8,
    position: 'Outside'
  }
]
```

Positive and negative offsets move the range in different directions relative to the axis and its orientation.

Test offsets with the actual range position and gauge orientation.

## Tapered Ranges

Use different start and end widths to create a tapered range.

```typescript
ranges: [
  {
    start: 0,
    end: 100,
    color: '#2563eb',
    startWidth: 5,
    endWidth: 25,
    position: 'Outside'
  }
]
```

Reverse the widths to taper in the opposite direction.

```typescript
ranges: [
  {
    start: 0,
    end: 100,
    color: '#2563eb',
    startWidth: 25,
    endWidth: 5,
    position: 'Outside'
  }
]
```

## Range Border

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    color: '#0284c7',
    startWidth: 18,
    endWidth: 18,

    border: {
      color: '#0c4a6e',
      width: 2
    }
  }
]
```

Use a border when adjacent ranges have similar colors or when range boundaries need more emphasis.

## Range-Colored Labels

Set `labelStyle.useRangeColor` to `true` to apply range colors to corresponding axis labels.

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
          color: '#166534',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 40,
          end: 70,
          color: '#854d0e',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 70,
          end: 100,
          color: '#991b1b',
          startWidth: 15,
          endWidth: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Linear Gradient Range

A CSS `linear-gradient(...)` string is not a valid value for the range `color` property.

Import and inject the `Gradient` module and use `linearGradient`.

### TypeScript

```typescript
import {
  LinearGauge,
  Gradient
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Gradient);

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 100,
          startWidth: 20,
          endWidth: 20,

          linearGradient: {
            startValue: '0%',
            endValue: '100%',

            colorStop: [
              {
                color: '#2563eb',
                offset: '0%',
                opacity: 1
              },
              {
                color: '#16a34a',
                offset: '50%',
                opacity: 1
              },
              {
                color: '#ca8a04',
                offset: '75%',
                opacity: 1
              },
              {
                color: '#dc2626',
                offset: '100%',
                opacity: 1
              }
            ]
          }
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Gradient
);

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 100,
          startWidth: 20,
          endWidth: 20,

          linearGradient: {
            startValue: '0%',
            endValue: '100%',

            colorStop: [
              {
                color: '#2563eb',
                offset: '0%',
                opacity: 1
              },
              {
                color: '#16a34a',
                offset: '50%',
                opacity: 1
              },
              {
                color: '#ca8a04',
                offset: '75%',
                opacity: 1
              },
              {
                color: '#dc2626',
                offset: '100%',
                opacity: 1
              }
            ]
          }
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Radial Gradient Range

```typescript
import {
  LinearGauge,
  Gradient
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Gradient);

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 100,
          startWidth: 20,
          endWidth: 20,

          radialGradient: {
            radius: '60%',

            outerPosition: {
              x: '50%',
              y: '50%'
            },

            innerPosition: {
              x: '50%',
              y: '50%'
            },

            colorStop: [
              {
                color: '#bfdbfe',
                offset: '0%',
                opacity: 1
              },
              {
                color: '#1d4ed8',
                offset: '100%',
                opacity: 1
              }
            ]
          }
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Understanding Pointers

Pointers display values on a Linear Gauge axis.

Pointers are configured through `axes[].pointers`.

```typescript
pointers: [
  {
    value: 45,
    type: 'Bar'
  }
]
```

The Linear Gauge supports two primary pointer types:

- `Bar`
- `Marker`

## Pointer Types

## Bar Pointer

A bar pointer extends from the beginning of the scale to the pointer value.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Bar',
          width: 20,
          color: '#1e293b',
          roundedCornerRadius: 4
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
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Bar',
          width: 20,
          color: '#1e293b',
          roundedCornerRadius: 4
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Bar pointers are useful for:

- Progress
- Capacity
- Utilization
- Temperature levels
- Performance values
- Completion status

## Marker Pointer

A marker pointer displays a shape at a specific axis value.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          color: '#c2410c',
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
var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 50,
          type: 'Marker',
          markerType: 'Circle',
          color: '#c2410c',
          height: 18,
          width: 18
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Supported marker types include:

- `Circle`
- `Rectangle`
- `Triangle`
- `InvertedTriangle`
- `Diamond`
- `Image`
- `Text`

Use `InvertedTriangle` without a space.

```typescript
markerType: 'InvertedTriangle'
```

For marker pointers, set both `height` and `width`.

```typescript
pointers: [
  {
    value: 25,
    type: 'Marker',
    markerType: 'Circle',
    height: 16,
    width: 16
  },
  {
    value: 50,
    type: 'Marker',
    markerType: 'Triangle',
    height: 18,
    width: 18
  },
  {
    value: 75,
    type: 'Marker',
    markerType: 'Diamond',
    height: 18,
    width: 18
  },
  {
    value: 100,
    type: 'Marker',
    markerType: 'Rectangle',
    height: 16,
    width: 16
  }
]
```

## Image Pointer

```typescript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Image',
    imageUrl: 'assets/current-value.png',
    height: 32,
    width: 32,
    description:
      'Current value is 65'
  }
]
```

Ensure the image is available in the deployed application.

## Text Pointer

```typescript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Text',
    text: '65%',
    placement: 'Near',
    offset: 10,

    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '700'
    },

    description:
      'Current value is 65 percent'
  }
]
```

## Pointer Styling

## Pointer Properties

Common pointer properties include:

- `value`: Specifies the current pointer value.
- `type`: Specifies `Bar` or `Marker`.
- `color`: Specifies the pointer color.
- `width`: Specifies pointer width.
- `height`: Specifies marker height.
- `offset`: Moves the pointer relative to the axis.
- `position`: Specifies pointer position.
- `placement`: Specifies marker placement.
- `markerType`: Specifies the marker shape.
- `border`: Specifies the pointer boundary.
- `opacity`: Specifies pointer opacity.
- `animationDuration`: Specifies pointer animation duration.
- `enableDrag`: Enables pointer dragging.
- `roundedCornerRadius`: Rounds a bar pointer.
- `imageUrl`: Specifies the image-marker source.
- `text`: Specifies text-marker content.
- `textStyle`: Customizes a text pointer.
- `description`: Provides an accessible pointer description.
- `linearGradient`: Applies a linear gradient.
- `radialGradient`: Applies a radial gradient.

## Bar Pointer Styling

```typescript
pointers: [
  {
    value: 60,
    type: 'Bar',
    width: 20,
    color: '#334155',
    position: 'Cross',
    opacity: 0.9,
    roundedCornerRadius: 5,

    border: {
      color: '#0f172a',
      width: 2
    }
  }
]
```

## Marker Pointer Styling

```typescript
pointers: [
  {
    value: 40,
    type: 'Marker',
    markerType: 'Circle',
    height: 22,
    width: 22,
    color: '#dc2626',
    position: 'Outside',
    placement: 'Near',
    offset: 8,

    border: {
      color: '#7f1d1d',
      width: 2
    }
  }
]
```

## Pointer Border and Opacity

```typescript
pointers: [
  {
    value: 65,
    type: 'Bar',
    width: 16,
    color: '#2563eb',
    opacity: 0.75,

    border: {
      color: '#1e3a8a',
      width: 2
    }
  }
]
```

## Draggable Pointer

```typescript
pointers: [
  {
    value: 50,
    type: 'Marker',
    markerType: 'Circle',
    height: 28,
    width: 28,
    color: '#2563eb',
    enableDrag: true,
    description:
      'Drag to change the gauge value'
  }
]
```

Use a sufficiently large marker for touch interaction.

Provide a native range or number input when keyboard-accessible editing is required.

## Multiple Pointers

Multiple pointers can compare current, target, average, threshold, or historical values.

### TypeScript

```typescript
const currentValue: number = 65;
const targetValue: number = 75;
const averageValue: number = 70;

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: currentValue,
          type: 'Bar',
          color: '#2563eb',
          width: 14,
          description:
            'Current value is 65'
        },
        {
          value: targetValue,
          type: 'Marker',
          markerType: 'Circle',
          color: '#c2410c',
          height: 18,
          width: 18,
          position: 'Outside',
          placement: 'Near',
          offset: 8,
          description:
            'Target value is 75'
        },
        {
          value: averageValue,
          type: 'Marker',
          markerType: 'Triangle',
          color: '#15803d',
          height: 18,
          width: 18,
          position: 'Outside',
          placement: 'Far',
          offset: 8,
          description:
            'Average value is 70'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var currentValue = 65;
var targetValue = 75;
var averageValue = 70;

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: currentValue,
          type: 'Bar',
          color: '#2563eb',
          width: 14,
          description:
            'Current value is 65'
        },
        {
          value: targetValue,
          type: 'Marker',
          markerType: 'Circle',
          color: '#c2410c',
          height: 18,
          width: 18,
          position: 'Outside',
          placement: 'Near',
          offset: 8,
          description:
            'Target value is 75'
        },
        {
          value: averageValue,
          type: 'Marker',
          markerType: 'Triangle',
          color: '#15803d',
          height: 18,
          width: 18,
          position: 'Outside',
          placement: 'Far',
          offset: 8,
          description:
            'Average value is 70'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Use distinct pointer shapes, colors, positions, and descriptions.

## Animations

## Complete Gauge Animation

Use the gauge-level `animationDuration` property to animate the complete gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  animationDuration: 1000,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 70,
          color: '#2563eb',
          startWidth: 15,
          endWidth: 15
        }
      ],

      pointers: [
        {
          value: 65
        }
      ]
    }
  ]
});
```

Set the duration to `0` to disable complete gauge animation.

```typescript
animationDuration: 0
```

## Pointer Animation

Use `animationDuration` inside a pointer to animate that pointer.

```typescript
pointers: [
  {
    value: 70,
    type: 'Marker',
    markerType: 'Triangle',
    color: '#15803d',
    height: 18,
    width: 18,
    animationDuration: 1000
  }
]
```

Do not assume that the pointer animation duration defaults to a specific value. Set it explicitly when predictable behavior is required.

## Reduced Motion

Respect the user’s reduced-motion preference.

```typescript
const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const gauge: LinearGauge = new LinearGauge({
  animationDuration:
    reduceMotion ? 0 : 1000,

  axes: [
    {
      pointers: [
        {
          value: 65,
          animationDuration:
            reduceMotion ? 0 : 700
        }
      ]
    }
  ]
});
```

## Dynamic Updates

## Update a Pointer Value

Use `setPointerValue()` for a pointer-only update.

```typescript
gauge.setPointerValue(
  axisIndex,
  pointerIndex,
  value
);
```

### TypeScript

```typescript
function updateCurrentValue(
  requestedValue: number
): void {
  const axisIndex: number = 0;
  const pointerIndex: number = 0;
  const axis = gauge.axes[axisIndex];

  const safeValue: number =
    Math.min(
      axis.maximum,
      Math.max(
        axis.minimum,
        requestedValue
      )
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
function updateCurrentValue(
  requestedValue
) {
  var axisIndex = 0;
  var pointerIndex = 0;
  var axis = gauge.axes[axisIndex];

  var safeValue =
    Math.min(
      axis.maximum,
      Math.max(
        axis.minimum,
        requestedValue
      )
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

## Update Multiple Pointers

```typescript
gauge.setPointerValue(
  0,
  0,
  68
);

gauge.setPointerValue(
  0,
  1,
  80
);

gauge.setPointerValue(
  0,
  2,
  72
);
```

The arguments represent:

1. Axis index
2. Pointer index
3. New value

## Update a Range

Update the range model and refresh the gauge.

### TypeScript

```typescript
function updateWarningRange(
  start: number,
  end: number
): void {
  const axis = gauge.axes[0];
  const warningRange = axis.ranges[1];

  warningRange.start = start;
  warningRange.end = end;

  gauge.refresh();
}
```

### JavaScript

```javascript
function updateWarningRange(
  start,
  end
) {
  var axis = gauge.axes[0];
  var warningRange =
    axis.ranges[1];

  warningRange.start = start;
  warningRange.end = end;

  gauge.refresh();
}
```

Use `refresh()` for range, scale, tick, label, or layout changes.

## Real-Time Value Simulation

```typescript
let currentValue: number = 50;
let updateTimer: number | null = null;

function startSimulation(): void {
  if (updateTimer !== null) {
    return;
  }

  updateTimer =
    window.setInterval(
      (): void => {
        const change: number =
          (Math.random() - 0.5) * 12;

        currentValue =
          Math.min(
            100,
            Math.max(
              0,
              currentValue + change
            )
          );

        gauge.setPointerValue(
          0,
          0,
          currentValue
        );
      },
      1000
    );
}

function stopSimulation(): void {
  if (updateTimer === null) {
    return;
  }

  window.clearInterval(
    updateTimer
  );

  updateTimer = null;
}
```

Clear the interval when the gauge is destroyed.

## Practical Examples

## Traffic Status Gauge

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const trafficValue: number = 62;

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Vertical',
  width: '100%',
  height: '500px',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%'
      },

      ranges: [
        {
          start: 0,
          end: 30,
          color: '#166534',
          startWidth: 16,
          endWidth: 16
        },
        {
          start: 30,
          end: 70,
          color: '#854d0e',
          startWidth: 16,
          endWidth: 16
        },
        {
          start: 70,
          end: 100,
          color: '#991b1b',
          startWidth: 16,
          endWidth: 16
        }
      ],

      pointers: [
        {
          value: trafficValue,
          type: 'Marker',
          markerType: 'Circle',
          height: 26,
          width: 26,
          color: '#111827',
          description:
            'Current traffic value is 62 percent'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Performance Gauge

```typescript
const performanceScore: number = 76;

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',
  animationDuration: 800,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%'
      },

      ranges: [
        {
          start: 0,
          end: 40,
          color: '#991b1b',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 40,
          end: 70,
          color: '#854d0e',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 70,
          end: 100,
          color: '#166534',
          startWidth: 15,
          endWidth: 15
        }
      ],

      pointers: [
        {
          value: performanceScore,
          type: 'Bar',
          width: 12,
          color: '#1e293b',
          roundedCornerRadius: 4,
          animationDuration: 800,
          description:
            'Performance score is 76 percent'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Dual-Value Display

```typescript
const primaryValue: number = 68;
const comparisonValue: number = 55;

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: primaryValue,
          type: 'Bar',
          width: 14,
          color: '#2563eb',
          offset: 10,
          position: 'Outside',
          description:
            'Primary value is 68'
        },
        {
          value: comparisonValue,
          type: 'Bar',
          width: 10,
          color: '#64748b',
          offset: -10,
          position: 'Inside',
          description:
            'Comparison value is 55'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Use different offsets and positions to prevent the bar pointers from covering each other.

## Complete TypeScript Example

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
    Linear Gauge Ranges and Pointers
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

    .controls {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      gap: 12px;
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      background: #ffffff;
    }

    .field {
      display: grid;
      flex: 1 1 220px;
      gap: 7px;
    }

    .field label {
      font-weight: 700;
    }

    .field input {
      width: 100%;
      min-height: 40px;
    }

    .controls button {
      min-height: 42px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .controls button:hover {
      background: #dbeafe;
    }

    .controls button:focus-visible,
    .field input:focus-visible {
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
      height: 320px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin: 14px 0 0;
      padding-left: 20px;
    }

    #status {
      margin: 12px 0 0;
    }

    @media (min-width: 768px) {
      #gauge-container {
        height: 390px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Performance Ranges and Pointers</h1>

    <p class="description">
      The bar displays the current value. The circle
      identifies the target value, and the triangle
      identifies the average value.
    </p>

    <section
      class="controls"
      aria-label="Gauge value controls"
    >
      <div class="field">
        <label for="current-value">
          Current value:
          <output id="current-output">
            65%
          </output>
        </label>

        <input
          id="current-value"
          type="range"
          min="0"
          max="100"
          step="1"
          value="65"
        />
      </div>

      <button id="randomize" type="button">
        Randomize Value
      </button>
    </section>

    <section
      class="gauge-card"
      aria-label="Performance gauge"
    >
      <div id="gauge-container"></div>

      <ul class="legend">
        <li>Critical: 0 to 40</li>
        <li>Warning: 40 to 70</li>
        <li>Normal: 70 to 100</li>
        <li>Target: 80</li>
        <li>Average: 70</li>
      </ul>

      <p
        id="status"
        role="status"
        aria-live="polite"
      >
        Current value is 65 percent.
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
  Gradient
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Gradient);

const targetValue: number = 80;
const averageValue: number = 70;

let currentValue: number = 65;

const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',
  orientation: 'Horizontal',
  background: '#ffffff',
  animationDuration:
    reduceMotion ? 0 : 900,

  title: 'Current Performance',

  titleStyle: {
    color: '#111827',
    fontFamily: 'Arial',
    size: '19px',
    fontWeight: '700'
  },

  container: {
    width: 28,
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
      showLastLabel: true,

      line: {
        width: 2,
        color: '#475569'
      },

      majorTicks: {
        interval: 20,
        position: 'Outside',
        height: 11,
        width: 2,
        color: '#334155'
      },

      minorTicks: {
        interval: 5,
        position: 'Outside',
        height: 6,
        width: 1,
        color: '#64748b'
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
          color: '#991b1b',
          position: 'Inside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#7f1d1d',
            width: 1
          }
        },
        {
          start: 40,
          end: 70,
          color: '#854d0e',
          position: 'Inside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#713f12',
            width: 1
          }
        },
        {
          start: 70,
          end: 100,
          color: '#166534',
          position: 'Inside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#14532d',
            width: 1
          }
        }
      ],

      pointers: [
        {
          value: currentValue,
          type: 'Bar',
          color: '#1e293b',
          width: 11,
          position: 'Cross',
          roundedCornerRadius: 4,
          animationDuration:
            reduceMotion ? 0 : 600,
          description:
            'Current performance value is 65 percent'
        },
        {
          value: targetValue,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 20,
          width: 20,
          position: 'Outside',
          placement: 'Near',
          offset: 8,
          description:
            'Target value is 80 percent',
          border: {
            color: '#1e3a8a',
            width: 2
          }
        },
        {
          value: averageValue,
          type: 'Marker',
          markerType: 'Triangle',
          color: '#7c3aed',
          height: 20,
          width: 20,
          position: 'Outside',
          placement: 'Far',
          offset: 8,
          description:
            'Average value is 70 percent',
          border: {
            color: '#581c87',
            width: 2
          }
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');

const valueInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#current-value'
    );

const valueOutput:
  HTMLOutputElement | null =
    document.querySelector<HTMLOutputElement>(
      '#current-output'
    );

const randomizeButton:
  HTMLElement | null =
    document.getElementById('randomize');

const status:
  HTMLElement | null =
    document.getElementById('status');

function setCurrentValue(
  requestedValue: number
): void {
  currentValue = Math.min(
    100,
    Math.max(0, requestedValue)
  );

  gauge.setPointerValue(
    0,
    0,
    currentValue
  );

  gauge.axes[0]
    .pointers[0]
    .description =
      `Current performance value is ${Math.round(
        currentValue
      )} percent`;

  if (valueInput) {
    valueInput.value =
      Math.round(currentValue).toString();
  }

  if (valueOutput) {
    valueOutput.value =
      `${Math.round(currentValue)}%`;
  }

  if (status) {
    status.textContent =
      `Current value is ${Math.round(
        currentValue
      )} percent.`;
  }
}

function updateFromInput(): void {
  if (!valueInput) {
    return;
  }

  setCurrentValue(
    Number(valueInput.value)
  );
}

function randomizeValue(): void {
  const randomValue: number =
    Math.round(Math.random() * 100);

  setCurrentValue(randomValue);
}

valueInput?.addEventListener(
  'input',
  updateFromInput
);

randomizeButton?.addEventListener(
  'click',
  randomizeValue
);

window.addEventListener(
  'beforeunload',
  (): void => {
    valueInput?.removeEventListener(
      'input',
      updateFromInput
    );

    randomizeButton?.removeEventListener(
      'click',
      randomizeValue
    );

    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Complete JavaScript Example

Use the same `index.html` from the TypeScript example.

### index.js

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Gradient
);

var targetValue = 80;
var averageValue = 70;
var currentValue = 65;

var reduceMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '100%',
  orientation: 'Horizontal',
  background: '#ffffff',
  animationDuration:
    reduceMotion ? 0 : 900,

  title: 'Current Performance',

  titleStyle: {
    color: '#111827',
    fontFamily: 'Arial',
    size: '19px',
    fontWeight: '700'
  },

  container: {
    width: 28,
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
      showLastLabel: true,

      line: {
        width: 2,
        color: '#475569'
      },

      majorTicks: {
        interval: 20,
        position: 'Outside',
        height: 11,
        width: 2,
        color: '#334155'
      },

      minorTicks: {
        interval: 5,
        position: 'Outside',
        height: 6,
        width: 1,
        color: '#64748b'
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
          color: '#991b1b',
          position: 'Inside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#7f1d1d',
            width: 1
          }
        },
        {
          start: 40,
          end: 70,
          color: '#854d0e',
          position: 'Inside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#713f12',
            width: 1
          }
        },
        {
          start: 70,
          end: 100,
          color: '#166534',
          position: 'Inside',
          startWidth: 15,
          endWidth: 15,
          border: {
            color: '#14532d',
            width: 1
          }
        }
      ],

      pointers: [
        {
          value: currentValue,
          type: 'Bar',
          color: '#1e293b',
          width: 11,
          position: 'Cross',
          roundedCornerRadius: 4,
          animationDuration:
            reduceMotion ? 0 : 600,
          description:
            'Current performance value is 65 percent'
        },
        {
          value: targetValue,
          type: 'Marker',
          markerType: 'Circle',
          color: '#2563eb',
          height: 20,
          width: 20,
          position: 'Outside',
          placement: 'Near',
          offset: 8,
          description:
            'Target value is 80 percent',
          border: {
            color: '#1e3a8a',
            width: 2
          }
        },
        {
          value: averageValue,
          type: 'Marker',
          markerType: 'Triangle',
          color: '#7c3aed',
          height: 20,
          width: 20,
          position: 'Outside',
          placement: 'Far',
          offset: 8,
          description:
            'Average value is 70 percent',
          border: {
            color: '#581c87',
            width: 2
          }
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');

var valueInput =
  document.getElementById(
    'current-value'
  );

var valueOutput =
  document.getElementById(
    'current-output'
  );

var randomizeButton =
  document.getElementById(
    'randomize'
  );

var status =
  document.getElementById(
    'status'
  );

function setCurrentValue(
  requestedValue
) {
  currentValue = Math.min(
    100,
    Math.max(0, requestedValue)
  );

  gauge.setPointerValue(
    0,
    0,
    currentValue
  );

  gauge.axes[0]
    .pointers[0]
    .description =
      'Current performance value is ' +
      Math.round(currentValue) +
      ' percent';

  if (valueInput) {
    valueInput.value =
      String(
        Math.round(currentValue)
      );
  }

  if (valueOutput) {
    valueOutput.value =
      Math.round(currentValue) +
      '%';
  }

  if (status) {
    status.textContent =
      'Current value is ' +
      Math.round(currentValue) +
      ' percent.';
  }
}

function updateFromInput() {
  if (!valueInput) {
    return;
  }

  setCurrentValue(
    Number(valueInput.value)
  );
}

function randomizeValue() {
  var randomValue =
    Math.round(
      Math.random() * 100
    );

  setCurrentValue(randomValue);
}

if (valueInput) {
  valueInput.addEventListener(
    'input',
    updateFromInput
  );
}

if (randomizeButton) {
  randomizeButton.addEventListener(
    'click',
    randomizeValue
  );
}

window.addEventListener(
  'beforeunload',
  function () {
    if (valueInput) {
      valueInput.removeEventListener(
        'input',
        updateFromInput
      );
    }

    if (randomizeButton) {
      randomizeButton.removeEventListener(
        'click',
        randomizeValue
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

### Keep Range Values Inside the Axis

```typescript
axes: [
  {
    minimum: 0,
    maximum: 100,

    ranges: [
      {
        start: 0,
        end: 40
      },
      {
        start: 40,
        end: 70
      },
      {
        start: 70,
        end: 100
      }
    ]
  }
]
```

### Avoid Range Gaps and Overlaps

Recommended:

```typescript
ranges: [
  {
    start: 0,
    end: 40
  },
  {
    start: 40,
    end: 70
  },
  {
    start: 70,
    end: 100
  }
]
```

Avoid unintended gaps:

```typescript
ranges: [
  {
    start: 0,
    end: 35
  },
  {
    start: 40,
    end: 70
  }
]
```

### Use Supported Gradient Models

Do not use a CSS gradient as the range color.

```typescript
// Avoid.
color:
  'linear-gradient(to right, #2563eb, #16a34a)'
```

Use `linearGradient` and inject `Gradient`.

```typescript
LinearGauge.Inject(Gradient);
```

### Set Marker Height and Width

```typescript
pointers: [
  {
    type: 'Marker',
    markerType: 'Circle',
    height: 20,
    width: 20
  }
]
```

### Use Valid Marker Names

```typescript
markerType: 'InvertedTriangle'
```

Avoid:

```typescript
markerType: 'Inverted Triangle'
```

### Differentiate Multiple Pointers

Use different:

- Shapes
- Colors
- Positions
- Placements
- Offsets
- Accessible descriptions

### Use setPointerValue for Pointer-Only Updates

```typescript
gauge.setPointerValue(
  0,
  0,
  75
);
```

Use `refresh()` only when the scale, ranges, labels, or layout changes.

### Clamp External Values

```typescript
const safeValue: number =
  Math.min(
    axis.maximum,
    Math.max(
      axis.minimum,
      externalValue
    )
  );
```

### Respect Reduced Motion

```typescript
const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

animationDuration:
  reduceMotion ? 0 : 800
```

### Do Not Rely Only on Color

Provide visible descriptions of the range meanings.

```html
<ul aria-label="Performance ranges">
  <li>Critical: 0 to 40</li>
  <li>Warning: 40 to 70</li>
  <li>Normal: 70 to 100</li>
</ul>
```

## Troubleshooting

### Range Is Not Visible

Confirm that:

1. `start` is less than `end`.
2. Both values are within the axis range.
3. `startWidth` and `endWidth` are greater than zero.
4. The range color is visible.
5. The range position and offset do not place it outside the visible area.

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    color: '#0284c7',
    startWidth: 15,
    endWidth: 15
  }
]
```

### Range Appears in the Wrong Position

Set `position` explicitly.

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    position: 'Inside'
  }
]
```

Adjust `offset` after confirming the position.

### CSS Gradient Is Not Displayed

A CSS gradient string is not a valid range color.

Import and inject `Gradient`.

```typescript
import {
  LinearGauge,
  Gradient
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Gradient);
```

Use `linearGradient` or `radialGradient`.

### Gradient Is Still Not Displayed

Confirm that:

- The `Gradient` module is injected.
- Color-stop offsets are valid percentages.
- Every color stop has a valid color.
- The range has visible start and end widths.
- The gradient object uses the correct property names.

### Pointer Is Not Visible

Confirm that:

- The pointer value is inside the axis range.
- The pointer has a visible color.
- A marker pointer has valid `height` and `width`.
- A bar pointer has a nonzero `width`.
- The pointer position and offset are valid.

```typescript
pointers: [
  {
    value: 50,
    type: 'Marker',
    markerType: 'Circle',
    color: '#2563eb',
    height: 20,
    width: 20
  }
]
```

### Marker Shape Is Not Applied

Use a supported marker name.

```typescript
markerType: 'InvertedTriangle'
```

Check spelling and letter casing.

### Multiple Pointers Overlap

Place markers on different sides.

```typescript
pointers: [
  {
    type: 'Marker',
    position: 'Outside',
    placement: 'Near',
    offset: 8
  },
  {
    type: 'Marker',
    position: 'Outside',
    placement: 'Far',
    offset: 8
  }
]
```

For bar pointers, use separate offsets or positions.

### Pointer Animation Does Not Run

Set a positive pointer duration.

```typescript
pointers: [
  {
    value: 65,
    animationDuration: 800
  }
]
```

Check whether reduced-motion handling intentionally sets the duration to `0`.

### Dynamic Pointer Update Does Not Work

Use valid axis and pointer indexes.

```typescript
gauge.setPointerValue(
  0,
  0,
  75
);
```

Confirm that:

- Axis `0` exists.
- Pointer `0` exists.
- The requested value is inside the axis range.

### Dynamic Range Update Does Not Appear

Update the range model and call `refresh()`.

```typescript
gauge.axes[0]
  .ranges[0]
  .end = 75;

gauge.refresh();
```

### Simulation Continues After Page Exit

Store and clear the timer.

```typescript
window.clearInterval(
  updateTimer
);

updateTimer = null;
```

Destroy the gauge.

```typescript
gauge.destroy();
```

### Gauge Is Not Visible

Confirm that the host exists.

```html
<div id="gauge-container"></div>
```

Give it a nonzero size.

```css
#gauge-container {
  width: 100%;
  height: 360px;
}
```

Append the gauge after the host is available.

```typescript
gauge.appendTo(
  '#gauge-container'
);
```

Also verify that the package or global script is loaded and that no earlier JavaScript error stopped initialization.