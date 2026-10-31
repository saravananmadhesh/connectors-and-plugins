# Axes Configuration

- #axis-basics
  - #basic-axis-configuration
  - #axis-radius
  - #axis-direction
- #axis-line-customization
  - #line-width-and-color
  - #axis-background
  - #line-offset
- #start-and-end-angles
  - #common-angle-configurations
  - #clockwise-and-anticlockwise-directions
- #axis-ranges
  - #basic-range-configuration
  - #range-width-and-radius
  - #range-position
  - #rounded-range-corners
- #ticks-and-labels
  - #major-and-minor-ticks
  - #tick-position-and-offset
  - #axis-labels
  - #custom-label-format
  - #axis-label-render-event
- #multiple-axes
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Axis Basics

Every Circular Gauge contains at least one axis. An axis defines the numeric scale and provides the coordinate system for ranges, pointers, ticks, labels, and annotations.

Each axis can have its own:

```text
Minimum and maximum values
Start and end angles
Direction
Radius
Axis line
Ticks
Labels
Ranges
Pointers
Annotations
```

Circular Gauge supports multiple axes, and each axis maintains its own ranges, pointers, and annotations.

### Basic Axis Configuration

```typescript
axes: [{
    minimum: 0,
    maximum: 100,
    startAngle: 230,
    endAngle: 130
}]
```

Property behavior:

```text
minimum    -> Defines the lowest value on the scale.
maximum    -> Defines the highest value on the scale.
startAngle -> Defines where the axis begins.
endAngle   -> Defines where the axis ends.
```

The minimum value should be less than the maximum value.

Recommended:

```typescript
axes: [{
    minimum: 0,
    maximum: 100
}]
```

Avoid:

```typescript
axes: [{
    minimum: 100,
    maximum: 0
}]
```

### Complete Basic TypeScript Axis

Required HTML:

```html
<div id="gauge"></div>
```

TypeScript:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Complete Basic JavaScript Axis

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Axis Radius

Use `radius` to control the size of an axis.

Percentage radius:

```typescript
axes: [{
    radius: '80%'
}]
```

Pixel radius:

```typescript
axes: [{
    radius: '150'
}]
```

Percentage values are calculated relative to the available gauge size. For example, `50%` renders the axis using half of the available radius. The gauge calculates the radius automatically when no explicit radius is provided.

Use percentages for responsive gauges:

```typescript
axes: [{
    radius: '90%'
}]
```

Use fixed values only when the container dimensions are predictable:

```typescript
axes: [{
    radius: '180'
}]
```

### Axis Direction

Use `direction` to render the axis clockwise or anticlockwise.

Clockwise:

```typescript
axes: [{
    direction: 'ClockWise'
}]
```

Anticlockwise:

```typescript
axes: [{
    direction: 'AntiClockWise'
}]
```

The direction property controls whether values progress clockwise or anticlockwise around the axis.

Complete example:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,
    startAngle: 230,
    endAngle: 130,
    direction: 'AntiClockWise',

    pointers: [{
        value: 65
    }]
}]
```

## Axis Line Customization

### Purpose

Use `lineStyle` to customize the visible axis line.

```typescript
lineStyle: {
    width: 8,
    color: '#ff6347'
}
```

The axis documentation supports customization of the axis-line width and color through `lineStyle`.

### Line Width and Color

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    lineStyle: {
        width: 8,
        color: '#ff6347'
    }
}]
```

Property behavior:

```text
width  -> Defines the line thickness in pixels.
color  -> Defines the line color.
offset -> Moves the line relative to its default position.
```

Use valid CSS colors:

```typescript
color: '#ff6347'
```

```typescript
color: 'rgb(255, 99, 71)'
```

```typescript
color: 'rgba(255, 99, 71, 0.8)'
```

```typescript
color: 'tomato'
```

### Complete Axis-Line Example

#### TypeScript

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 120,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            lineStyle: {
                width: 8,
                color: '#ff6347'
            },

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 120,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            lineStyle: {
                width: 8,
                color: '#ff6347'
            },

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Axis Background

Use `background` to set the background of the axis area.

```typescript
axes: [{
    background: 'rgba(0, 128, 128, 0.3)'
}]
```

The axis background is independent of the gauge-level background.

```text
Gauge background -> CircularGauge.background
Axis background  -> axes[].background
```

Axis background customization is supported through the axis `background` property.

Do not define the same property more than once.

Incorrect:

```typescript
axes: [{
    background: '#f5f5f5',
    background: 'rgba(0, 128, 128, 0.3)'
}]
```

Correct:

```typescript
axes: [{
    background: 'rgba(0, 128, 128, 0.3)'
}]
```

### Line Offset

Use `lineStyle.offset` to move the axis line.

```typescript
lineStyle: {
    width: 8,
    color: '#e0e0e0',
    offset: 5
}
```

Validate positive and negative offsets visually because the final position also depends on:

```text
Axis radius
Tick position
Tick offset
Label position
Label offset
Range radius
Pointer radius
```

## Start and End Angles

### Purpose

The `startAngle` and `endAngle` properties define the visible axis arc.

The Circular Gauge axis supports angles from `0` through `360`. Its default start and end angles are `200` and `160`, respectively.

### Common Angle Configurations

Full-circle gauge:

```typescript
startAngle: 0,
endAngle: 360
```

Upper semi-circular gauge:

```typescript
startAngle: 270,
endAngle: 90
```

Lower semi-circular gauge:

```typescript
startAngle: 90,
endAngle: 270
```

Speedometer-style gauge:

```typescript
startAngle: 230,
endAngle: 130
```

Custom arc:

```typescript
startAngle: 45,
endAngle: 315
```

The visual sweep also depends on `direction`.

### Complete Angle Example

#### TypeScript

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 120,
            startAngle: 230,
            endAngle: 130,
            direction: 'ClockWise',

            lineStyle: {
                width: 8,
                color: '#e0e0e0'
            },

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 120,
            startAngle: 230,
            endAngle: 130,
            direction: 'ClockWise',

            lineStyle: {
                width: 8,
                color: '#e0e0e0'
            },

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Clockwise and Anticlockwise Directions

Clockwise example:

```typescript
axes: [{
    startAngle: 230,
    endAngle: 130,
    direction: 'ClockWise'
}]
```

Anticlockwise example:

```typescript
axes: [{
    startAngle: 230,
    endAngle: 130,
    direction: 'AntiClockWise'
}]
```

Do not describe angle behavior without considering `direction`. The same start and end angles produce different value progression when the direction changes.

## Axis Ranges

### Purpose

Ranges divide an axis into visual sections.

Use ranges to represent:

- Normal, warning, and critical values.
- Low, medium, and high categories.
- Temperature zones.
- Performance grades.
- Acceptable and unacceptable limits.
- Operational thresholds.

The Circular Gauge supports one or more ranges on each axis.

### Basic Range Configuration

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    ranges: [
        {
            start: 0,
            end: 40,
            color: '#107c10'
        },
        {
            start: 40,
            end: 70,
            color: '#ffb900'
        },
        {
            start: 70,
            end: 100,
            color: '#d13438'
        }
    ]
}]
```

Range properties:

```text
start      -> Defines the range starting value.
end        -> Defines the range ending value.
color      -> Defines the range color.
radius     -> Defines the range position from the gauge center.
startWidth -> Defines the width at the start.
endWidth   -> Defines the width at the end.
```

### Range Width and Radius

Use equal start and end widths for a uniform range:

```typescript
ranges: [{
    start: 0,
    end: 50,
    color: '#107c10',
    startWidth: 10,
    endWidth: 10,
    radius: '90%'
}]
```

Use different widths for a tapered range:

```typescript
ranges: [{
    start: 0,
    end: 50,
    color: '#107c10',
    startWidth: 4,
    endWidth: 14,
    radius: '90%'
}]
```

Use percentage radii for responsive layouts:

```typescript
radius: '90%'
```

### Range Position

Use the range `position` property when the range must be positioned relative to the axis line.

```typescript
ranges: [{
    start: 0,
    end: 50,
    position: 'Inside',
    startWidth: 10,
    endWidth: 10
}]
```

Common positions include:

```text
Inside
Outside
Cross
```

Validate the selected position against:

- Tick positions.
- Label positions.
- Axis-line width.
- Pointer radius.
- Other ranges.

### Rounded Range Corners

Use `roundedCornerRadius` to create rounded range ends.

```typescript
ranges: [{
    start: 0,
    end: 50,
    color: '#107c10',
    startWidth: 12,
    endWidth: 12,
    roundedCornerRadius: 6
}]
```

Use a moderate radius relative to the range width. Excessively large corner radii can distort short ranges.

### Complete Range Example

#### TypeScript

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 40,
                    end: 70,
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 40,
                    end: 70,
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

## Ticks and Labels

### Major and Minor Ticks

Major ticks identify the primary scale intervals.

```typescript
majorTicks: {
    interval: 20,
    width: 2,
    height: 8,
    color: '#333333',
    position: 'Inside',
    offset: 5
}
```

Minor ticks subdivide the major intervals.

```typescript
minorTicks: {
    interval: 5,
    width: 1,
    height: 4,
    color: '#999999',
    position: 'Inside',
    offset: 5
}
```

Major- and minor-tick height, width, color, and intervals can be customized. When a major interval is not specified, Circular Gauge can calculate it automatically.

Do not state that `majorTicks.interval` is always required.

Explicit intervals are recommended when:

- The scale must use exact steps.
- Several axes must remain synchronized.
- Labels must correspond to known business values.
- Automatic intervals produce too many or too few labels.

### Complete Tick Configuration

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    majorTicks: {
        interval: 20,
        width: 2,
        height: 10,
        color: '#333333',
        position: 'Inside',
        offset: 5
    },

    minorTicks: {
        interval: 5,
        width: 1,
        height: 5,
        color: '#999999',
        position: 'Inside',
        offset: 5
    }
}]
```

### Tick Position and Offset

Tick positions:

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

Use `offset` to adjust the distance between ticks and the axis line.

```typescript
majorTicks: {
    position: 'Inside',
    offset: 5
}
```

When ticks are not visible, verify:

```text
Tick height is greater than zero.
Tick width is greater than zero.
Tick color contrasts with the background.
The interval is suitable for the axis scale.
The selected position fits within the gauge container.
The offset has not moved ticks outside the visible area.
```

### Axis Labels

Use `labelStyle` to configure axis labels.

```typescript
labelStyle: {
    position: 'Inside',
    format: '{value}%',
    useRangeColor: true,
    autoAngle: false,

    font: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#333333'
    }
}
```

Property behavior:

```text
position      -> Places labels inside or outside the axis.
format        -> Adds prefixes, suffixes, or units.
useRangeColor -> Applies the corresponding range color to labels.
autoAngle     -> Rotates labels according to their axis positions.
font          -> Controls the label text appearance.
offset        -> Adjusts the label distance from the axis.
hiddenLabel   -> Hides the first, last, or no endpoint label.
```

### Label Position

Inside labels:

```typescript
labelStyle: {
    position: 'Inside'
}
```

Outside labels:

```typescript
labelStyle: {
    position: 'Outside'
}
```

Use inside labels when:

- The gauge has sufficient interior space.
- The pointer does not overlap label text.
- A compact layout is required.

Use outside labels when:

- The gauge center contains annotations.
- Several pointers occupy the interior.
- Inside labels overlap.
- Multiple axes require visual separation.

### Custom Label Format

Use the `format` property with the `{value}` placeholder.

```typescript
labelStyle: {
    format: '{value} km/h'
}
```

Percentage example:

```typescript
labelStyle: {
    format: '{value}%'
}
```

Temperature example:

```typescript
labelStyle: {
    format: '{value}°C'
}
```

The `labelStyle.format` property is a string format. Do not assign a function to it.

Incorrect:

```typescript
labelStyle: {
    format: (args) => {
        return 'Speed: ' +
            args.value +
            ' km/h';
    }
}
```

Use `axisLabelRender` when labels require conditional or function-based customization.

### Axis Label Render Event

Use `axisLabelRender` to customize individual labels before they are rendered. The Circular Gauge API provides an axis-label rendering event and corresponding event-argument model.

#### TypeScript

```typescript
import {
    CircularGauge,
    IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axisLabelRender: (
            args: IAxisLabelRenderEventArgs
        ): void => {
            args.text =
                'Speed: ' +
                args.value +
                ' km/h';
        },

        axes: [{
            minimum: 0,
            maximum: 120,

            majorTicks: {
                interval: 20
            },

            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axisLabelRender: function (args) {
            args.text =
                'Speed: ' +
                args.value +
                ' km/h';
        },

        axes: [{
            minimum: 0,
            maximum: 120,

            majorTicks: {
                interval: 20
            },

            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use `axisLabelRender` when:

- Labels require conditional units.
- Selected values must use custom text.
- Labels must be localized dynamically.
- A label must be hidden according to application logic.

## Multiple Axes

### Purpose

Use multiple axes when one Circular Gauge must display:

- Different measurement scales.
- Inner and outer readings.
- Celsius and Fahrenheit.
- Actual and target scales.
- Several independent gauges in one container.

Each axis can have its own scale, radius, direction, line, ticks, labels, ranges, and pointers.

### Complete TypeScript Multiple Axes

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Temperature Comparison',

        axes: [
            {
                minimum: 0,
                maximum: 100,
                startAngle: 230,
                endAngle: 130,
                radius: '65%',

                lineStyle: {
                    width: 8,
                    color: '#d13438'
                },

                majorTicks: {
                    interval: 20,
                    position: 'Inside'
                },

                labelStyle: {
                    position: 'Inside',
                    format: '{value}°C',

                    font: {
                        size: '11px',
                        color: '#d13438'
                    }
                },

                pointers: [{
                    value: 65,
                    type: 'Needle',
                    radius: '55%',
                    color: '#d13438',

                    cap: {
                        radius: 7,
                        color: '#d13438'
                    }
                }]
            },
            {
                minimum: 32,
                maximum: 212,
                startAngle: 230,
                endAngle: 130,
                radius: '90%',

                lineStyle: {
                    width: 8,
                    color: '#0066cc'
                },

                majorTicks: {
                    interval: 36,
                    position: 'Outside'
                },

                labelStyle: {
                    position: 'Outside',
                    format: '{value}°F',

                    font: {
                        size: '11px',
                        color: '#0066cc'
                    }
                },

                pointers: [{
                    value: 149,
                    type: 'Marker',
                    markerShape: 'Triangle',
                    markerWidth: 14,
                    markerHeight: 14,
                    radius: '100%',
                    color: '#0066cc'
                }]
            }
        ]
    });

gauge.appendTo('#gauge');
```

### Complete JavaScript Multiple Axes

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Temperature Comparison',

        axes: [
            {
                minimum: 0,
                maximum: 100,
                startAngle: 230,
                endAngle: 130,
                radius: '65%',

                lineStyle: {
                    width: 8,
                    color: '#d13438'
                },

                majorTicks: {
                    interval: 20,
                    position: 'Inside'
                },

                labelStyle: {
                    position: 'Inside',
                    format: '{value}°C',

                    font: {
                        size: '11px',
                        color: '#d13438'
                    }
                },

                pointers: [{
                    value: 65,
                    type: 'Needle',
                    radius: '55%',
                    color: '#d13438',

                    cap: {
                        radius: 7,
                        color: '#d13438'
                    }
                }]
            },
            {
                minimum: 32,
                maximum: 212,
                startAngle: 230,
                endAngle: 130,
                radius: '90%',

                lineStyle: {
                    width: 8,
                    color: '#0066cc'
                },

                majorTicks: {
                    interval: 36,
                    position: 'Outside'
                },

                labelStyle: {
                    position: 'Outside',
                    format: '{value}°F',

                    font: {
                        size: '11px',
                        color: '#0066cc'
                    }
                },

                pointers: [{
                    value: 149,
                    type: 'Marker',
                    markerShape: 'Triangle',
                    markerWidth: 14,
                    markerHeight: 14,
                    radius: '100%',
                    color: '#0066cc'
                }]
            }
        ]
    });

gauge.appendTo('#gauge');
```

### Multiple-Axis Layout Guidance

Use sufficiently different radii:

```text
Inner axis -> 60% to 70%
Outer axis -> 85% to 95%
```

Separate label positions:

```text
Inner axis labels -> Inside
Outer axis labels -> Outside
```

Use different visual styles:

```text
Different line colors
Different pointer types
Different tick positions
Different label formats
```

Avoid using two long needle pointers that share the same center and cover each other.

## Complete TypeScript Example

### Required HTML

```html
<div id="gauge"></div>
```

### TypeScript

```typescript
import {
    CircularGauge,
    IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Performance Gauge',
        background: '#ffffff',

        border: {
            width: 1,
            color: '#dddddd'
        },

        axisLabelRender: (
            args: IAxisLabelRenderEventArgs
        ): void => {
            if (args.value === 100) {
                args.text = 'Maximum';
            }
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            direction: 'ClockWise',
            radius: '88%',
            background:
                'rgba(0, 0, 0, 0.03)',

            lineStyle: {
                width: 8,
                color: '#e0e0e0',
                offset: 0
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                color: '#333333',
                position: 'Inside',
                offset: 5
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                color: '#888888',
                position: 'Inside',
                offset: 5
            },

            labelStyle: {
                position: 'Inside',
                format: '{value}%',
                useRangeColor: false,
                autoAngle: false,

                font: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: 'Normal',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10,
                    roundedCornerRadius: 4
                },
                {
                    start: 40,
                    end: 70,
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10,
                    roundedCornerRadius: 4
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 9,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#0066cc'
                },

                animation: {
                    enable: true,
                    duration: 1000
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

## Complete JavaScript Example

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Circular Gauge Axes</title>

        <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="gauge"></div>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Performance Gauge',
        background: '#ffffff',

        border: {
            width: 1,
            color: '#dddddd'
        },

        axisLabelRender: function (args) {
            if (args.value === 100) {
                args.text = 'Maximum';
            }
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            direction: 'ClockWise',
            radius: '88%',
            background:
                'rgba(0, 0, 0, 0.03)',

            lineStyle: {
                width: 8,
                color: '#e0e0e0',
                offset: 0
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                color: '#333333',
                position: 'Inside',
                offset: 5
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                color: '#888888',
                position: 'Inside',
                offset: 5
            },

            labelStyle: {
                position: 'Inside',
                format: '{value}%',
                useRangeColor: false,
                autoAngle: false,

                font: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: 'Normal',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10,
                    roundedCornerRadius: 4
                },
                {
                    start: 40,
                    end: 70,
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10,
                    roundedCornerRadius: 4
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 9,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#0066cc'
                },

                animation: {
                    enable: true,
                    duration: 1000
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ The global EJ2 script loads before JavaScript application code.
✅ The HTML gauge host exists.
✅ gauge.appendTo('#gauge') is called.
✅ At least one axis is configured.
✅ Axis minimum is less than axis maximum.
✅ Pointer values are within the corresponding axis range.
✅ Range start and end values remain within the axis range.
✅ Range start is less than range end.
✅ Ranges do not overlap unintentionally.
✅ Axis radius fits inside the gauge container.
✅ Multiple axes use sufficiently different radii.
✅ startAngle and endAngle produce the intended arc.
✅ direction is considered when interpreting angle progression.
✅ Axis-line styling uses lineStyle.
✅ Axis background uses axes[].background.
✅ Major- and minor-tick intervals are positive when explicitly set.
✅ Tick heights and widths are greater than zero.
✅ Tick colors contrast with the gauge background.
✅ Label format uses the {value} placeholder.
✅ Function-based label changes use axisLabelRender.
✅ Label text has sufficient contrast.
✅ Label positions do not overlap pointers or adjacent axes.
✅ No editor-generated HTML exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Constructor Pattern

Avoid:

```typescript
const gauge =
    new CircularGauge({
        axes: []
    }, '#gauge');
```

Preferred:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        axes: []
    });

gauge.appendTo('#gauge');
```

### Incorrect Minimum and Maximum

Incorrect:

```typescript
axes: [{
    minimum: 100,
    maximum: 0
}]
```

Correct:

```typescript
axes: [{
    minimum: 0,
    maximum: 100
}]
```

### Incorrect Full-Circle Assumption

Do not assume that every start/end pair produces the same sweep regardless of direction.

Always validate:

```text
startAngle
endAngle
direction
```

together.

### Incorrect Quarter-Circle Description

The following configuration is commonly used for a wide speedometer-style arc:

```typescript
startAngle: 230,
endAngle: 130
```

Do not describe it as a 90-degree quarter circle.

Use an actual 90-degree sweep when a quarter-circle gauge is required.

### Incorrect Tick Requirement

Incorrect claim:

```text
majorTicks.interval is always required.
```

Correct:

```text
The major interval can be calculated automatically.
Set an explicit interval when a specific scale is required.
```

The Circular Gauge can calculate the major-tick interval automatically.

### Function Assigned to Label Format

Incorrect:

```typescript
labelStyle: {
    format: (args) => {
        return args.value + ' km/h';
    }
}
```

Correct static format:

```typescript
labelStyle: {
    format: '{value} km/h'
}
```

Correct conditional format:

```typescript
axisLabelRender: (args) => {
    args.text =
        'Speed: ' +
        args.value +
        ' km/h';
}
```

### Out-of-Range Range

Incorrect:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    ranges: [{
        start: 0,
        end: 150
    }]
}]
```

Correct:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    ranges: [{
        start: 0,
        end: 50
    }]
}]
```

### Invalid Range Order

Incorrect:

```typescript
ranges: [{
    start: 70,
    end: 40
}]
```

Preferred:

```typescript
ranges: [{
    start: 40,
    end: 70
}]
```

### Labels Overlapping

When labels overlap:

```text
Increase the major-tick interval.
Reduce label font size.
Change label position.
Adjust label offset.
Increase gauge dimensions.
Reduce the number of axes.
Increase separation between axis radii.
Disable autoAngle if rotation reduces readability.
Shorten the label format.
```

Example:

```typescript
majorTicks: {
    interval: 25
},

labelStyle: {
    position: 'Outside',

    font: {
        size: '10px'
    }
}
```

### Range Not Visible

Check:

```text
Range values are inside the axis limits.
Range width is greater than zero.
Range radius is appropriate.
Range color is visible.
Range position fits the layout.
The axis radius fits the gauge.
The range is not hidden behind another element.
```

### Multiple Axes Overlap

Avoid:

```typescript
axes: [
    {
        radius: '80%',
        labelStyle: {
            position: 'Inside'
        }
    },
    {
        radius: '82%',
        labelStyle: {
            position: 'Inside'
        }
    }
]
```

Prefer greater separation:

```typescript
axes: [
    {
        radius: '65%',
        labelStyle: {
            position: 'Inside'
        }
    },
    {
        radius: '90%',
        labelStyle: {
            position: 'Outside'
        }
    }
]
```

### Missing Gauge Dimensions

A gauge may not render correctly when its container has no measurable size.

Preferred:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        axes: [{
            minimum: 0,
            maximum: 100
        }]
    });
```

### Encoded Executable HTML

Incorrect:

```html
<div id="gauge"></div>
```

Correct:

```html
<div id="gauge"></div>
```

### Editor-Generated Markup

Do not place the following inside executable TypeScript, JavaScript, HTML, imports, templates, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```