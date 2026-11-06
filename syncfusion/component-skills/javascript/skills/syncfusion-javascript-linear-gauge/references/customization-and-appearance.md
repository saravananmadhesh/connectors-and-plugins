# Linear Gauge Customization and Appearance in TypeScript and JavaScript

Customize the appearance of the Syncfusion Essential JS 2 Linear Gauge using containers, themes, colors, fonts, ranges, pointers, gradients, annotations, borders, and rendering events.

## Table of Contents

- #prerequisites
- #gauge-area-and-container-styling
  - #gauge-area-properties
  - #internal-container-properties
  - #container-types
  - #component-and-container-sizing
- #color-schemes-and-themes
  - #built-in-themes
  - #custom-color-scheme
  - #range-colors
- #font-and-label-customization
  - #label-styling
  - #font-properties
  - #label-formatting
  - #conditional-label-customization
  - #responsive-font-sizing
- #borders-and-effects
  - #gauge-border
  - #axis-line
  - #dashed-axis-line
  - #range-borders
  - #pointer-borders
- #backgrounds-and-gradients
  - #solid-background
  - #linear-gradient-range
  - #radial-gradient-range
- #custom-content
  - #image-pointer
  - #text-pointer
  - #custom-axis-labels
  - #range-descriptions-with-annotations
- #practical-examples
  - #professional-dashboard-gauge
  - #minimal-clean-gauge
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

Add a host element to the HTML page.

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

Create the Linear Gauge and append it to the host.

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

For JavaScript applications that use the EJ2 global namespace:

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

## Gauge Area and Container Styling

The Linear Gauge has two separate visual areas:

1. The overall gauge area
2. The internal container used to render ranges and pointers

Use gauge-level properties such as `background`, `border`, `margin`, `width`, and `height` to customize the complete component.

Use the `container` property to customize the internal visual container.

## Gauge Area Properties

Use the following top-level properties to customize the complete Linear Gauge:

- `background`
- `border`
- `margin`
- `width`
- `height`
- `title`
- `titleStyle`

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '360px',
  background: '#f8fafc',

  border: {
    color: '#94a3b8',
    width: 1
  },

  margin: {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30
  },

  title: 'System Performance',

  titleStyle: {
    color: '#111827',
    fontFamily: 'Arial',
    size: '20px',
    fontStyle: 'Normal',
    fontWeight: '700',
    opacity: 1
  },

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '360px',
  background: '#f8fafc',

  border: {
    color: '#94a3b8',
    width: 1
  },

  margin: {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30
  },

  title: 'System Performance',

  titleStyle: {
    color: '#111827',
    fontFamily: 'Arial',
    size: '20px',
    fontStyle: 'Normal',
    fontWeight: '700',
    opacity: 1
  },

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Internal Container Properties

The internal container is the area at the center of the gauge where ranges and bar pointers can be displayed.

```typescript
container: {
  width: 30,
  height: 0,
  type: 'RoundedRectangle',
  offset: 0,
  roundedCornerRadius: 8,
  backgroundColor: '#e2e8f0',
  border: {
    color: '#64748b',
    width: 1
  }
}
```

Common internal container properties include:

- `width`: Specifies the container thickness.
- `height`: Specifies the container length.
- `type`: Specifies the visual shape.
- `offset`: Moves the container relative to the axis.
- `roundedCornerRadius`: Specifies the corner radius.
- `backgroundColor`: Specifies the container fill.
- `border`: Specifies the container boundary.

The `width` and `height` values are numeric pixel values.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '360px',

  container: {
    width: 30,
    height: 0,
    type: 'RoundedRectangle',
    backgroundColor: '#e2e8f0',
    roundedCornerRadius: 8,
    border: {
      color: '#64748b',
      width: 1
    }
  },

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '360px',

  container: {
    width: 30,
    height: 0,
    type: 'RoundedRectangle',
    backgroundColor: '#e2e8f0',
    roundedCornerRadius: 8,
    border: {
      color: '#64748b',
      width: 1
    }
  },

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Container Types

The Linear Gauge supports the following internal container types:

- `Normal`
- `RoundedRectangle`
- `Thermometer`

### Normal Container

`Normal` renders a standard rectangular container.

```typescript
container: {
  type: 'Normal',
  width: 30,
  backgroundColor: '#e2e8f0'
}
```

### Rounded Rectangle

`RoundedRectangle` renders a rectangle with configurable rounded corners.

```typescript
container: {
  type: 'RoundedRectangle',
  width: 30,
  roundedCornerRadius: 8,
  backgroundColor: '#dbeafe'
}
```

### Thermometer

`Thermometer` is suitable for vertical temperature and level indicators.

```typescript
container: {
  type: 'Thermometer',
  width: 30,
  backgroundColor: '#fee2e2'
}
```

A thermometer container is normally used with vertical orientation.

```typescript
const gauge: LinearGauge = new LinearGauge({
  orientation: 'Vertical',

  container: {
    type: 'Thermometer',
    width: 30
  }
});
```

## Component and Container Sizing

Use gauge-level `width` and `height` for the complete component.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '360px'
});
```

Use numeric dimensions for the internal container.

```typescript
container: {
  width: 30,
  height: 250
}
```

Do not use CSS dimension strings for internal container dimensions.

```typescript
// Avoid.
container: {
  width: '100%',
  height: '200px'
}
```

## Color Schemes and Themes

Appearance can be controlled through:

- The gauge `theme` property
- Gauge background and border settings
- Axis-line and tick colors
- Range colors
- Pointer colors
- Label and title styles
- Container colors

## Built-in Themes

Use the `theme` property to apply a supported EJ2 theme.

```typescript
const gauge: LinearGauge = new LinearGauge({
  theme: 'Material',
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});
```

The theme value must be supported by the installed EJ2 package version.

Common theme families include Material, Bootstrap, Fabric, Fluent, Tailwind, and High Contrast variants.

A theme provides baseline styling. Explicit gauge properties can then be used to customize individual elements.

```typescript
const gauge: LinearGauge = new LinearGauge({
  theme: 'Material',

  background: '#ffffff',

  titleStyle: {
    color: '#111827'
  },

  axes: [
    {
      line: {
        color: '#475569'
      }
    }
  ]
});
```

## Custom Color Scheme

Define semantic application colors in a JavaScript object.

### TypeScript

```typescript
interface StatusColors {
  critical: string;
  warning: string;
  normal: string;
  information: string;
  pointer: string;
}

const statusColors: StatusColors = {
  critical: '#b91c1c',
  warning: '#a16207',
  normal: '#15803d',
  information: '#0369a1',
  pointer: '#111827'
};

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 30,
          color: statusColors.critical,
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 30,
          end: 70,
          color: statusColors.warning,
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 70,
          end: 100,
          color: statusColors.normal,
          startWidth: 15,
          endWidth: 15
        }
      ],

      pointers: [
        {
          value: 65,
          type: 'Marker',
          markerType: 'InvertedTriangle',
          color: statusColors.pointer
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var statusColors = {
  critical: '#b91c1c',
  warning: '#a16207',
  normal: '#15803d',
  information: '#0369a1',
  pointer: '#111827'
};

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 30,
          color: statusColors.critical,
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 30,
          end: 70,
          color: statusColors.warning,
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 70,
          end: 100,
          color: statusColors.normal,
          startWidth: 15,
          endWidth: 15
        }
      ],

      pointers: [
        {
          value: 65,
          type: 'Marker',
          markerType: 'InvertedTriangle',
          color: statusColors.pointer
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Do not assume that arbitrary CSS custom properties automatically modify EJ2 Linear Gauge graphics.

```css
/* These variables do not automatically configure the gauge. */
.e-gauge {
  --primary-color: #0066cc;
  --danger-color: #dc2626;
}
```

Apply colors through supported Linear Gauge properties.

## Range Colors

Ranges provide visual zones for different parts of the axis.

```typescript
ranges: [
  {
    start: 0,
    end: 30,
    color: '#b91c1c',
    position: 'Inside',
    startWidth: 16,
    endWidth: 16
  },
  {
    start: 30,
    end: 70,
    color: '#a16207',
    position: 'Inside',
    startWidth: 16,
    endWidth: 16
  },
  {
    start: 70,
    end: 100,
    color: '#15803d',
    position: 'Inside',
    startWidth: 16,
    endWidth: 16
  }
]
```

Set `labelStyle.useRangeColor` to `true` when labels should use their corresponding range colors.

```typescript
labelStyle: {
  useRangeColor: true,
  font: {
    fontFamily: 'Arial',
    size: '13px',
    fontWeight: '600'
  }
}
```

## Font and Label Customization

Use `labelStyle` inside an axis to customize labels.

```typescript
labelStyle: {
  format: '{value}%',
  offset: 8,
  position: 'Outside',

  font: {
    fontFamily: 'Arial, sans-serif',
    size: '14px',
    color: '#334155',
    fontStyle: 'Normal',
    fontWeight: '500',
    opacity: 1
  }
}
```

## Label Styling

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: '{value}%',
        offset: 8,
        position: 'Outside',

        font: {
          fontFamily: 'Arial, sans-serif',
          size: '14px',
          color: '#334155',
          fontStyle: 'Normal',
          fontWeight: '500',
          opacity: 1
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
        format: '{value}%',
        offset: 8,
        position: 'Outside',

        font: {
          fontFamily: 'Arial, sans-serif',
          size: '14px',
          color: '#334155',
          fontStyle: 'Normal',
          fontWeight: '500',
          opacity: 1
        }
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Font Properties

Common label font properties include:

- `fontFamily`: Specifies the font family.
- `size`: Specifies the font size.
- `color`: Specifies the text color.
- `fontStyle`: Specifies the font style.
- `fontWeight`: Specifies the font weight.
- `opacity`: Specifies text opacity.

Example:

```typescript
font: {
  fontFamily: 'Segoe UI, Arial, sans-serif',
  size: '13px',
  color: '#334155',
  fontStyle: 'Normal',
  fontWeight: '600',
  opacity: 1
}
```

## Label Formatting

Use `{value}` as the value placeholder.

### Temperature

```typescript
labelStyle: {
  format: '{value}°C'
}
```

### Percentage

```typescript
labelStyle: {
  format: '{value}%'
}
```

### Units

```typescript
labelStyle: {
  format: '{value} km/h'
}
```

The `format` property also accepts applicable global number-format strings.

```typescript
labelStyle: {
  format: 'n1'
}
```

Do not assume that Python-style formatting is supported.

```typescript
// Avoid.
labelStyle: {
  format: '{value:.2f}'
}
```

Use a supported global number format or customize the rendered label through `axisLabelRender`.

## Conditional Label Customization

Use the `axisLabelRender` event to customize label text or appearance based on its value.

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
      Number(args.text.replace('%', ''));

    if (value >= 70) {
      args.text = `${value}% High`;
      args.labelStyle.font.color = '#b91c1c';
    } else if (value >= 40) {
      args.text = `${value}% Warning`;
      args.labelStyle.font.color = '#a16207';
    } else {
      args.text = `${value}% Normal`;
      args.labelStyle.font.color = '#15803d';
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
      args.text = value + '% High';
      args.labelStyle.font.color =
        '#b91c1c';
    } else if (value >= 40) {
      args.text = value + '% Warning';
      args.labelStyle.font.color =
        '#a16207';
    } else {
      args.text = value + '% Normal';
      args.labelStyle.font.color =
        '#15803d';
    }
  }
});

gauge.appendTo('#gauge-container');
```

Keep conditional label text compact to avoid overlap.

## Responsive Font Sizing

Use `matchMedia` to change internal gauge styling at an application breakpoint.

### TypeScript

```typescript
const compactQuery: MediaQueryList =
  window.matchMedia(
    '(max-width: 575px)'
  );

function applyLabelSize(
  compact: boolean
): void {
  gauge.axes[0].labelStyle.font.size =
    compact ? '10px' : '14px';

  gauge.refresh();
}

function handleBreakpointChange(
  event: MediaQueryListEvent
): void {
  applyLabelSize(event.matches);
}

compactQuery.addEventListener(
  'change',
  handleBreakpointChange
);

applyLabelSize(compactQuery.matches);
```

### JavaScript

```javascript
var compactQuery =
  window.matchMedia(
    '(max-width: 575px)'
  );

function applyLabelSize(compact) {
  gauge.axes[0].labelStyle.font.size =
    compact ? '10px' : '14px';

  gauge.refresh();
}

function handleBreakpointChange(event) {
  applyLabelSize(event.matches);
}

compactQuery.addEventListener(
  'change',
  handleBreakpointChange
);

applyLabelSize(compactQuery.matches);
```

Remove the event listener when the gauge is destroyed.

## Borders and Effects

Borders can be configured for:

- The complete gauge area
- The internal container
- Ranges
- Pointers

The axis uses a customizable line rather than an axis-area border.

## Gauge Border

```typescript
const gauge: LinearGauge = new LinearGauge({
  border: {
    color: '#94a3b8',
    width: 1
  }
});
```

## Axis Line

Use `axes[].line` to customize the axis line.

```typescript
line: {
  width: 2,
  color: '#334155',
  offset: 0,
  dashArray: ''
}
```

## Dashed Axis Line

Use `dashArray` to create a dashed line.

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

## Range Borders

Use `border` inside each range.

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    color: '#0284c7',
    startWidth: 15,
    endWidth: 15,

    border: {
      color: '#0c4a6e',
      width: 2
    }
  }
]
```

## Pointer Borders

Use `border` inside a pointer.

```typescript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Circle',
    color: '#2563eb',
    height: 20,
    width: 20,

    border: {
      color: '#1e3a8a',
      width: 2
    }
  }
]
```

## Backgrounds and Gradients

## Solid Background

Use the gauge-level `background` property to style the complete gauge area.

```typescript
const gauge: LinearGauge = new LinearGauge({
  background: '#f8fafc'
});
```

Use `container.backgroundColor` to style the internal gauge container.

```typescript
container: {
  backgroundColor: '#e2e8f0'
}
```

## Linear Gradient Range

Import and inject the `Gradient` module before using range gradients.

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
          startWidth: 18,
          endWidth: 18,

          linearGradient: {
            startValue: '0%',
            endValue: '100%',

            colorStop: [
              {
                color: '#16a34a',
                offset: '0%',
                opacity: 1
              },
              {
                color: '#ca8a04',
                offset: '50%',
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

var gauge =
  new ej.lineargauge.LinearGauge({
    axes: [
      {
        minimum: 0,
        maximum: 100,

        ranges: [
          {
            start: 0,
            end: 100,
            startWidth: 18,
            endWidth: 18,

            linearGradient: {
              startValue: '0%',
              endValue: '100%',

              colorStop: [
                {
                  color: '#16a34a',
                  offset: '0%',
                  opacity: 1
                },
                {
                  color: '#ca8a04',
                  offset: '50%',
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

Use `radialGradient` when a radial color transition is required.

```typescript
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
```

Ensure that `Gradient` is injected before using radial or linear gradients.

## Custom Content

Linear Gauge does not provide arbitrary HTML templates for axis labels or ranges.

Use the following supported mechanisms:

- `Image` marker pointers for custom pointer images
- `Text` marker pointers for pointer text
- `axisLabelRender` for axis-label customization
- Annotations for additional HTML or text content

## Image Pointer

Set the pointer type to `Marker`, set `markerType` to `Image`, and provide `imageUrl`.

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
          markerType: 'Image',
          imageUrl: 'assets/pointer-arrow.png',
          width: 30,
          height: 30,
          description:
            'Current value is 50'
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
          markerType: 'Image',
          imageUrl: 'assets/pointer-arrow.png',
          width: 30,
          height: 30,
          description:
            'Current value is 50'
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Text Pointer

Set `markerType` to `Text`.

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
      fontStyle: 'Normal',
      fontWeight: '700',
      opacity: 1
    }
  }
]
```

## Custom Axis Labels

Use `axisLabelRender` instead of an unsupported label template.

```typescript
axisLabelRender: (
  args: IAxisLabelRenderEventArgs
): void => {
  const value: number =
    Number(args.text);

  if (value === 0) {
    args.text = 'Low';
  } else if (value === 50) {
    args.text = 'Medium';
  } else if (value === 100) {
    args.text = 'High';
  }
}
```

## Range Descriptions with Annotations

Use annotations to display text such as Low, Medium, and High near ranges.

Annotations require the `Annotations` module.

### TypeScript

```typescript
import {
  LinearGauge,
  Annotations
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);

const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 30,
          color: '#15803d',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 30,
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
  ],

  annotations: [
    {
      axisIndex: 0,
      axisValue: 15,
      x: 0,
      y: 45,
      content:
        '<span style="color:#15803d;font-weight:700;">Low</span>'
    },
    {
      axisIndex: 0,
      axisValue: 50,
      x: 0,
      y: 45,
      content:
        '<span style="color:#a16207;font-weight:700;">Medium</span>'
    },
    {
      axisIndex: 0,
      axisValue: 85,
      x: 0,
      y: 45,
      content:
        '<span style="color:#b91c1c;font-weight:700;">High</span>'
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Annotations
);

var gauge = new ej.lineargauge.LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 30,
          color: '#15803d',
          startWidth: 15,
          endWidth: 15
        },
        {
          start: 30,
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
  ],

  annotations: [
    {
      axisIndex: 0,
      axisValue: 15,
      x: 0,
      y: 45,
      content:
        '<span style="color:#15803d;font-weight:700;">Low</span>'
    },
    {
      axisIndex: 0,
      axisValue: 50,
      x: 0,
      y: 45,
      content:
        '<span style="color:#a16207;font-weight:700;">Medium</span>'
    },
    {
      axisIndex: 0,
      axisValue: 85,
      x: 0,
      y: 45,
      content:
        '<span style="color:#b91c1c;font-weight:700;">High</span>'
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Only use trusted content in HTML annotations.

## Practical Examples

## Professional Dashboard Gauge

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const currentValue: number = 68;

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '340px',
  orientation: 'Horizontal',
  background: '#ffffff',
  title: 'Service Availability',

  titleStyle: {
    fontFamily: 'Segoe UI, Arial, sans-serif',
    size: '18px',
    color: '#111827',
    fontWeight: '700'
  },

  container: {
    width: 28,
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

      line: {
        width: 2,
        color: '#475569'
      },

      majorTicks: {
        interval: 20,
        position: 'Outside',
        height: 11,
        color: '#334155'
      },

      minorTicks: {
        interval: 5,
        position: 'Outside',
        height: 6,
        color: '#64748b'
      },

      labelStyle: {
        format: '{value}%',
        position: 'Outside',
        offset: 8,

        font: {
          fontFamily:
            'Segoe UI, Arial, sans-serif',
          size: '12px',
          color: '#334155',
          fontWeight: '500'
        }
      },

      ranges: [
        {
          start: 0,
          end: 40,
          color: '#b91c1c',
          position: 'Inside',
          startWidth: 16,
          endWidth: 16
        },
        {
          start: 40,
          end: 70,
          color: '#a16207',
          position: 'Inside',
          startWidth: 16,
          endWidth: 16
        },
        {
          start: 70,
          end: 100,
          color: '#15803d',
          position: 'Inside',
          startWidth: 16,
          endWidth: 16
        }
      ],

      pointers: [
        {
          value: currentValue,
          type: 'Bar',
          color: '#1e293b',
          width: 12,
          position: 'Cross',
          roundedCornerRadius: 5,
          animationDuration: 800,
          description:
            'Service availability is 68 percent'
        },
        {
          value: currentValue,
          type: 'Marker',
          markerType: 'InvertedTriangle',
          color: '#111827',
          height: 18,
          width: 18,
          position: 'Outside',
          placement: 'Near',
          offset: 8
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Minimal Clean Gauge

### TypeScript

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '220px',
  background: '#ffffff',

  margin: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
  },

  container: {
    width: 10,
    type: 'RoundedRectangle',
    backgroundColor: '#e5e7eb',
    roundedCornerRadius: 5,
    border: {
      width: 0
    }
  },

  axes: [
    {
      minimum: 0,
      maximum: 100,

      line: {
        width: 0
      },

      majorTicks: {
        interval: 25,
        height: 6,
        width: 1,
        color: '#9ca3af'
      },

      minorTicks: {
        height: 0
      },

      labelStyle: {
        format: '{value}%',

        font: {
          size: '11px',
          color: '#6b7280',
          fontFamily: 'Arial'
        }
      },

      pointers: [
        {
          value: 65,
          type: 'Bar',
          color: '#2563eb',
          width: 8,
          roundedCornerRadius: 4
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Complete TypeScript Example

The following example includes:

- Gauge-area styling
- Rounded internal container
- Semantic range colors
- Conditional axis-label customization
- Responsive label sizing
- Range annotations
- A bar pointer and marker pointer
- Accessible surrounding content

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
    Customized Linear Gauge
  </title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 20px;
      background: #f1f5f9;
      color: #111827;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    }

    main {
      width: min(100%, 1000px);
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

    .gauge-card {
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #ffffff;
      box-shadow:
        0 8px 24px rgba(15, 23, 42, 0.08);
    }

    #gauge-container {
      width: 100%;
      height: 280px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin: 16px 0 0;
      padding: 0;
      list-style: none;
    }

    .legend li {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .legend-swatch {
      width: 16px;
      height: 16px;
      border: 1px solid #334155;
      border-radius: 3px;
    }

    .critical {
      background: #b91c1c;
    }

    .warning {
      background: #a16207;
    }

    .normal {
      background: #15803d;
    }

    @media (min-width: 768px) {
      .gauge-card {
        padding: 24px;
      }

      #gauge-container {
        height: 360px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>System Performance</h1>

    <p class="description">
      The gauge displays a system-performance value
      of 68 percent. Red represents a critical
      condition, amber represents a warning, and
      green represents normal operation.
    </p>

    <section
      class="gauge-card"
      aria-label="System performance gauge"
    >
      <div id="gauge-container"></div>

      <ul
        class="legend"
        aria-label="Performance ranges"
      >
        <li>
          <span
            class="legend-swatch critical"
            aria-hidden="true"
          ></span>
          Critical: 0 to 40
        </li>

        <li>
          <span
            class="legend-swatch warning"
            aria-hidden="true"
          ></span>
          Warning: 40 to 70
        </li>

        <li>
          <span
            class="legend-swatch normal"
            aria-hidden="true"
          ></span>
          Normal: 70 to 100
        </li>
      </ul>
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  LinearGauge,
  Annotations,
  IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);

const currentValue: number = 68;

const compactQuery: MediaQueryList =
  window.matchMedia(
    '(max-width: 575px)'
  );

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title: 'Current Performance',

    titleStyle: {
      fontFamily:
        'Segoe UI, Arial, sans-serif',
      size: compactQuery.matches
        ? '16px'
        : '20px',
      color: '#111827',
      fontStyle: 'Normal',
      fontWeight: '700',
      opacity: 1
    },

    border: {
      color: '#ffffff',
      width: 0
    },

    margin: {
      left: compactQuery.matches
        ? 10
        : 30,
      right: compactQuery.matches
        ? 10
        : 30,
      top: 25,
      bottom: 35
    },

    container: {
      width: compactQuery.matches
        ? 20
        : 30,
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
          color: '#475569',
          dashArray: ''
        },

        majorTicks: {
          interval: compactQuery.matches
            ? 25
            : 20,
          position: 'Outside',
          height: compactQuery.matches
            ? 7
            : 11,
          width: 2,
          color: '#334155',
          offset: 4
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: compactQuery.matches
            ? 4
            : 6,
          width: 1,
          color: '#64748b',
          offset: 4
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: compactQuery.matches
            ? 6
            : 10,

          font: {
            fontFamily:
              'Segoe UI, Arial, sans-serif',
            size: compactQuery.matches
              ? '10px'
              : '13px',
            color: '#334155',
            fontStyle: 'Normal',
            fontWeight: '600',
            opacity: 1
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#b91c1c',
            position: 'Inside',
            startWidth:
              compactQuery.matches ? 10 : 16,
            endWidth:
              compactQuery.matches ? 10 : 16,
            border: {
              color: '#7f1d1d',
              width: 1
            }
          },
          {
            start: 40,
            end: 70,
            color: '#a16207',
            position: 'Inside',
            startWidth:
              compactQuery.matches ? 10 : 16,
            endWidth:
              compactQuery.matches ? 10 : 16,
            border: {
              color: '#713f12',
              width: 1
            }
          },
          {
            start: 70,
            end: 100,
            color: '#15803d',
            position: 'Inside',
            startWidth:
              compactQuery.matches ? 10 : 16,
            endWidth:
              compactQuery.matches ? 10 : 16,
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
            width: compactQuery.matches
              ? 9
              : 13,
            position: 'Cross',
            opacity: 0.9,
            roundedCornerRadius: 5,
            animationDuration: 800,
            description:
              'System performance is 68 percent',
            border: {
              color: '#0f172a',
              width: 1
            }
          },
          {
            value: currentValue,
            type: 'Marker',
            markerType: 'InvertedTriangle',
            color: '#111827',
            height: compactQuery.matches
              ? 14
              : 20,
            width: compactQuery.matches
              ? 14
              : 20,
            position: 'Outside',
            placement: 'Near',
            offset: compactQuery.matches
              ? 5
              : 8,
            description:
              'Current performance marker'
          }
        ]
      }
    ],

    annotations: [
      {
        axisIndex: 0,
        axisValue: currentValue,
        x: 0,
        y: compactQuery.matches
          ? -35
          : -45,
        content:
          '<span style="' +
          'padding:4px 8px;' +
          'border-radius:4px;' +
          'background:#111827;' +
          'color:#ffffff;' +
          'font-family:Arial,sans-serif;' +
          'font-weight:700;' +
          '">' +
          '68%' +
          '</span>'
      }
    ],

    axisLabelRender: (
      args: IAxisLabelRenderEventArgs
    ): void => {
      const value: number =
        Number(
          args.text.replace('%', '')
        );

      if (value < 40) {
        args.labelStyle.font.color =
          '#7f1d1d';
      } else if (value < 70) {
        args.labelStyle.font.color =
          '#713f12';
      } else {
        args.labelStyle.font.color =
          '#14532d';
      }
    }
  });

gauge.appendTo('#gauge-container');

function applyResponsiveAppearance(
  compact: boolean
): void {
  gauge.titleStyle.size =
    compact ? '16px' : '20px';

  gauge.margin.left =
    compact ? 10 : 30;

  gauge.margin.right =
    compact ? 10 : 30;

  gauge.container.width =
    compact ? 20 : 30;

  const axis = gauge.axes[0];

  axis.majorTicks.interval =
    compact ? 25 : 20;

  axis.majorTicks.height =
    compact ? 7 : 11;

  axis.minorTicks.height =
    compact ? 4 : 6;

  axis.labelStyle.offset =
    compact ? 6 : 10;

  axis.labelStyle.font.size =
    compact ? '10px' : '13px';

  axis.ranges.forEach((range): void => {
    range.startWidth =
      compact ? 10 : 16;

    range.endWidth =
      compact ? 10 : 16;
  });

  axis.pointers[0].width =
    compact ? 9 : 13;

  axis.pointers[1].height =
    compact ? 14 : 20;

  axis.pointers[1].width =
    compact ? 14 : 20;

  gauge.refresh();
}

function handleBreakpointChange(
  event: MediaQueryListEvent
): void {
  applyResponsiveAppearance(
    event.matches
  );
}

compactQuery.addEventListener(
  'change',
  handleBreakpointChange
);

window.addEventListener(
  'beforeunload',
  (): void => {
    compactQuery.removeEventListener(
      'change',
      handleBreakpointChange
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

Ensure that the required EJ2 Linear Gauge global script is loaded before `index.js`.

### index.js

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Annotations
);

var currentValue = 68;

var compactQuery =
  window.matchMedia(
    '(max-width: 575px)'
  );

var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    title: 'Current Performance',

    titleStyle: {
      fontFamily:
        'Segoe UI, Arial, sans-serif',
      size: compactQuery.matches
        ? '16px'
        : '20px',
      color: '#111827',
      fontStyle: 'Normal',
      fontWeight: '700',
      opacity: 1
    },

    border: {
      color: '#ffffff',
      width: 0
    },

    margin: {
      left: compactQuery.matches
        ? 10
        : 30,
      right: compactQuery.matches
        ? 10
        : 30,
      top: 25,
      bottom: 35
    },

    container: {
      width: compactQuery.matches
        ? 20
        : 30,
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
          color: '#475569',
          dashArray: ''
        },

        majorTicks: {
          interval: compactQuery.matches
            ? 25
            : 20,
          position: 'Outside',
          height: compactQuery.matches
            ? 7
            : 11,
          width: 2,
          color: '#334155',
          offset: 4
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: compactQuery.matches
            ? 4
            : 6,
          width: 1,
          color: '#64748b',
          offset: 4
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: compactQuery.matches
            ? 6
            : 10,

          font: {
            fontFamily:
              'Segoe UI, Arial, sans-serif',
            size: compactQuery.matches
              ? '10px'
              : '13px',
            color: '#334155',
            fontStyle: 'Normal',
            fontWeight: '600',
            opacity: 1
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#b91c1c',
            position: 'Inside',
            startWidth:
              compactQuery.matches ? 10 : 16,
            endWidth:
              compactQuery.matches ? 10 : 16,
            border: {
              color: '#7f1d1d',
              width: 1
            }
          },
          {
            start: 40,
            end: 70,
            color: '#a16207',
            position: 'Inside',
            startWidth:
              compactQuery.matches ? 10 : 16,
            endWidth:
              compactQuery.matches ? 10 : 16,
            border: {
              color: '#713f12',
              width: 1
            }
          },
          {
            start: 70,
            end: 100,
            color: '#15803d',
            position: 'Inside',
            startWidth:
              compactQuery.matches ? 10 : 16,
            endWidth:
              compactQuery.matches ? 10 : 16,
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
            width: compactQuery.matches
              ? 9
              : 13,
            position: 'Cross',
            opacity: 0.9,
            roundedCornerRadius: 5,
            animationDuration: 800,
            description:
              'System performance is 68 percent',
            border: {
              color: '#0f172a',
              width: 1
            }
          },
          {
            value: currentValue,
            type: 'Marker',
            markerType: 'InvertedTriangle',
            color: '#111827',
            height: compactQuery.matches
              ? 14
              : 20,
            width: compactQuery.matches
              ? 14
              : 20,
            position: 'Outside',
            placement: 'Near',
            offset: compactQuery.matches
              ? 5
              : 8,
            description:
              'Current performance marker'
          }
        ]
      }
    ],

    annotations: [
      {
        axisIndex: 0,
        axisValue: currentValue,
        x: 0,
        y: compactQuery.matches
          ? -35
          : -45,
        content:
          '<span style="' +
          'padding:4px 8px;' +
          'border-radius:4px;' +
          'background:#111827;' +
          'color:#ffffff;' +
          'font-family:Arial,sans-serif;' +
          'font-weight:700;' +
          '">' +
          '68%' +
          '</span>'
      }
    ],

    axisLabelRender: function (args) {
      var value = Number(
        args.text.replace('%', '')
      );

      if (value < 40) {
        args.labelStyle.font.color =
          '#7f1d1d';
      } else if (value < 70) {
        args.labelStyle.font.color =
          '#713f12';
      } else {
        args.labelStyle.font.color =
          '#14532d';
      }
    }
  });

gauge.appendTo('#gauge-container');

function applyResponsiveAppearance(
  compact
) {
  gauge.titleStyle.size =
    compact ? '16px' : '20px';

  gauge.margin.left =
    compact ? 10 : 30;

  gauge.margin.right =
    compact ? 10 : 30;

  gauge.container.width =
    compact ? 20 : 30;

  var axis = gauge.axes[0];

  axis.majorTicks.interval =
    compact ? 25 : 20;

  axis.majorTicks.height =
    compact ? 7 : 11;

  axis.minorTicks.height =
    compact ? 4 : 6;

  axis.labelStyle.offset =
    compact ? 6 : 10;

  axis.labelStyle.font.size =
    compact ? '10px' : '13px';

  axis.ranges.forEach(function (range) {
    range.startWidth =
      compact ? 10 : 16;

    range.endWidth =
      compact ? 10 : 16;
  });

  axis.pointers[0].width =
    compact ? 9 : 13;

  axis.pointers[1].height =
    compact ? 14 : 20;

  axis.pointers[1].width =
    compact ? 14 : 20;

  gauge.refresh();
}

function handleBreakpointChange(event) {
  applyResponsiveAppearance(
    event.matches
  );
}

compactQuery.addEventListener(
  'change',
  handleBreakpointChange
);

window.addEventListener(
  'beforeunload',
  function () {
    compactQuery.removeEventListener(
      'change',
      handleBreakpointChange
    );

    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Best Practices

### Distinguish Gauge and Container Styling

Use top-level properties for the complete gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '360px',
  background: '#ffffff'
});
```

Use `container` for the internal graphical container.

```typescript
container: {
  width: 30,
  type: 'RoundedRectangle',
  backgroundColor: '#e2e8f0'
}
```

### Use Supported Appearance Properties

Configure colors through:

- `background`
- `border`
- `titleStyle`
- `container`
- `line`
- `majorTicks`
- `minorTicks`
- `labelStyle`
- `ranges`
- `pointers`

Do not assume arbitrary CSS variables will modify SVG elements rendered by the gauge.

### Maintain Text Contrast

Use label colors that remain readable against the page background.

```typescript
labelStyle: {
  font: {
    color: '#334155'
  }
}
```

Test conditional label colors individually.

### Do Not Rely Only on Color

When range color communicates status, provide a visible legend or textual explanation.

```html
<ul aria-label="Gauge status ranges">
  <li>Critical: 0 to 40</li>
  <li>Warning: 40 to 70</li>
  <li>Normal: 70 to 100</li>
</ul>
```

### Keep Labels Concise

Use short formats.

```typescript
labelStyle: {
  format: '{value}%'
}
```

Avoid adding long status text to every label when the labels are close together.

### Inject Optional Modules

Inject `Gradient` for gradients.

```typescript
import {
  LinearGauge,
  Gradient
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Gradient);
```

Inject `Annotations` for annotations.

```typescript
import {
  LinearGauge,
  Annotations
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);
```

### Use Rendering Events for Conditional Labels

Use `axisLabelRender` instead of attempting to define a label template.

```typescript
axisLabelRender: (
  args: IAxisLabelRenderEventArgs
): void => {
  args.text = `Value: ${args.text}`;
}
```

### Clean Up Responsive Listeners

```typescript
compactQuery.removeEventListener(
  'change',
  handleBreakpointChange
);

gauge.destroy();
```

## Troubleshooting

### Internal Container Is the Wrong Size

Use numeric values.

```typescript
container: {
  width: 30,
  height: 250
}
```

Do not use CSS dimension strings.

```typescript
// Incorrect for internal container dimensions.
container: {
  width: '100%',
  height: '250px'
}
```

Use gauge-level dimensions for CSS values.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '350px'
});
```

### Rounded Corners Are Not Displayed

Set the container type to `RoundedRectangle`.

```typescript
container: {
  type: 'RoundedRectangle',
  roundedCornerRadius: 8
}
```

### Custom CSS Variables Do Not Change Gauge Colors

Apply colors through the supported configuration.

```typescript
const gauge: LinearGauge = new LinearGauge({
  background: '#ffffff',

  axes: [
    {
      line: {
        color: '#334155'
      },

      ranges: [
        {
          start: 0,
          end: 100,
          color: '#2563eb'
        }
      ]
    }
  ]
});
```

### Axis Labels Are Not Formatted

Use `{value}` as the placeholder.

```typescript
labelStyle: {
  format: '{value}%'
}
```

For global numeric formatting, use an applicable global format string.

```typescript
labelStyle: {
  format: 'n1'
}
```

### Conditional Label Colors Are Not Applied

Use `axisLabelRender`.

```typescript
axisLabelRender: (
  args: IAxisLabelRenderEventArgs
): void => {
  args.labelStyle.font.color =
    '#b91c1c';
}
```

Confirm that the event is configured on the `LinearGauge` object, not inside an axis.

### Axis Line Is Not Dashed

Set `dashArray` on the axis line.

```typescript
line: {
  width: 2,
  color: '#64748b',
  dashArray: '5,5'
}
```

### Range Border Is Not Visible

Set a nonzero border width.

```typescript
ranges: [
  {
    start: 0,
    end: 50,
    color: '#0284c7',

    border: {
      color: '#0c4a6e',
      width: 2
    }
  }
]
```

Also specify visible range widths.

```typescript
startWidth: 15,
endWidth: 15
```

### Gradient Is Not Displayed

Import and inject `Gradient`.

```typescript
import {
  LinearGauge,
  Gradient
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Gradient);
```

Define valid color stops.

```typescript
linearGradient: {
  startValue: '0%',
  endValue: '100%',

  colorStop: [
    {
      color: '#16a34a',
      offset: '0%',
      opacity: 1
    },
    {
      color: '#dc2626',
      offset: '100%',
      opacity: 1
    }
  ]
}
```

### Annotation Is Not Displayed

Import and inject `Annotations`.

```typescript
import {
  LinearGauge,
  Annotations
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);
```

Confirm that:

- `axisIndex` references an existing axis.
- `axisValue` is within the axis limits.
- The annotation content is not empty.
- The configured `x` and `y` offsets do not move it outside the gauge.

### Image Pointer Is Not Displayed

Confirm that:

- `type` is `Marker`.
- `markerType` is `Image`.
- `imageUrl` is valid.
- `height` and `width` are greater than zero.
- The image is included in the deployed application.

```typescript
pointers: [
  {
    value: 50,
    type: 'Marker',
    markerType: 'Image',
    imageUrl: 'assets/pointer-arrow.png',
    height: 30,
    width: 30
  }
]
```

### Responsive Font Size Does Not Update

Update the model and call `refresh()`.

```typescript
gauge.axes[0].labelStyle.font.size =
  '10px';

gauge.refresh();
```

Ensure that the same media-query callback is removed during cleanup.

### Gauge Is Not Visible

Confirm that the host exists and has a visible size.

```html
<div id="gauge-container"></div>
```

```css
#gauge-container {
  width: 100%;
  height: 360px;
}
```

Append the gauge after the host is available.

```typescript
gauge.appendTo('#gauge-container');
```

Also verify that the package or required global scripts are loaded and that no earlier JavaScript error stopped initialization.