# Pointers Configuration

- #pointer-types
- #needle-pointers
- #rangebar-pointers
- #marker-pointers
- #pointer-animation
- #pointer-dragging
- #multiple-pointers
- #runtime-pointer-updates
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Pointer Types

Pointers indicate values on a Circular Gauge axis.

The Circular Gauge supports three pointer types:

```text
Needle   -> Displays a speedometer-style needle.
RangeBar -> Displays a filled arc from the axis minimum to the pointer value.
Marker   -> Displays a shape, text, or image at the pointer value.
```

Pointer type is configured through the `type` property:

```typescript
pointers: [{
    value: 75,
    type: 'Needle'
}]
```

Use each pointer type for the following scenarios:

```text
Needle:
Speed, temperature, pressure, and measurement gauges.

RangeBar:
Progress, completion, utilization, and capacity indicators.

Marker:
Targets, limits, checkpoints, thresholds, and status positions.
```

A basic axis can contain one or more pointers:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    pointers: [
        {
            value: 65,
            type: 'Needle'
        },
        {
            value: 80,
            type: 'Marker'
        }
    ]
}]
```

The pointer value should normally remain between the axis `minimum` and `maximum`.

## Needle Pointers

### Purpose

A needle pointer displays a value using a needle that rotates around the center of the gauge.

A needle pointer contains three primary visual parts:

```text
Needle     -> Main line or triangular body.
Cap        -> Circular element placed at the gauge center.
NeedleTail -> Portion extending behind the center.
```

The pointer API uses the `needleTail` property. Do not use `tail`.

### Basic Needle Pointer

#### TypeScript

Required HTML:

```html
<div id="gauge"></div>
```

TypeScript:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
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

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Needle Length

Use `radius` to control the needle length.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',
    radius: '80%'
}]
```

The percentage is calculated relative to the axis radius.

```text
Smaller radius -> Shorter needle.
Larger radius  -> Longer needle.
```

Use percentage values for responsive gauges.

### Needle Width

Use `pointerWidth` to control the general needle width.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',
    pointerWidth: 8
}]
```

Use `needleStartWidth` and `needleEndWidth` when the needle should have different widths at its two ends.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',
    needleStartWidth: 1,
    needleEndWidth: 8
}]
```

These properties can create tapered or triangular needle designs.

### Needle Color and Border

Use `color` to set the needle fill.

Use `border` to customize the needle boundary.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',
    color: '#ff6347',

    border: {
        width: 2,
        color: '#333333'
    }
}]
```

### Needle Tail

Use `needleTail` to customize the tail.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',

    needleTail: {
        length: '25%',
        color: '#ff6347',

        border: {
            width: 1,
            color: '#333333'
        }
    }
}]
```

Property behavior:

```text
length -> Controls the tail length.
color  -> Controls the tail color.
border -> Controls the tail boundary.
```

Do not use an unsupported `width` property inside `needleTail`. The pointer width and needle start/end widths control the needle body.

### Needle Cap

Use `cap` to customize the center knob.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',

    cap: {
        radius: 10,
        color: '#0066cc',

        border: {
            width: 2,
            color: '#333333'
        }
    }
}]
```

Do not place `borderWidth` and `borderColor` directly inside `cap`.

Incorrect:

```typescript
cap: {
    radius: 10,
    borderWidth: 2,
    borderColor: '#333333'
}
```

Correct:

```typescript
cap: {
    radius: 10,

    border: {
        width: 2,
        color: '#333333'
    }
}
```

### Complete Customized Needle

```typescript
pointers: [{
    value: 65,
    type: 'Needle',
    radius: '80%',
    pointerWidth: 8,
    needleStartWidth: 2,
    needleEndWidth: 8,
    color: '#ff6347',

    border: {
        width: 1,
        color: '#333333'
    },

    needleTail: {
        length: '25%',
        color: '#ff6347',

        border: {
            width: 1,
            color: '#333333'
        }
    },

    cap: {
        radius: 10,
        color: '#0066cc',

        border: {
            width: 2,
            color: '#333333'
        }
    }
}]
```

## RangeBar Pointers

### Purpose

A RangeBar pointer displays a value as an arc beginning at the axis minimum and ending at the pointer value.

Use RangeBar pointers for:

- Progress.
- Completion percentage.
- System utilization.
- Capacity.
- Goal achievement.
- Circular loading indicators.

### Basic RangeBar

```typescript
pointers: [{
    value: 75,
    type: 'RangeBar',
    radius: '80%',
    pointerWidth: 20,
    color: '#107c10'
}]
```

Property behavior:

```text
value        -> Controls the arc endpoint.
radius       -> Controls the arc position relative to the axis.
pointerWidth -> Controls the arc thickness.
color        -> Controls the arc color.
border       -> Controls the arc border.
```

### Complete TypeScript RangeBar

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,

        pointers: [{
            value: 75,
            type: 'RangeBar',
            radius: '80%',
            pointerWidth: 20,
            color: '#107c10',

            border: {
                width: 2,
                color: '#333333'
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Complete JavaScript RangeBar

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
                value: 75,
                type: 'RangeBar',
                radius: '80%',
                pointerWidth: 20,
                color: '#107c10',

                border: {
                    width: 2,
                    color: '#333333'
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Rounded RangeBar

Use `roundedCornerRadius` to round the RangeBar ends.

```typescript
pointers: [{
    value: 75,
    type: 'RangeBar',
    radius: '80%',
    pointerWidth: 20,
    roundedCornerRadius: 10,
    color: '#107c10'
}]
```

Do not use:

```typescript
roundedCorners: true
```

Use the numeric `roundedCornerRadius` property instead.

### RangeBar Gradient

The `Gradient` module must be imported and injected before a pointer gradient is used.

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);
```

Complete TypeScript example:

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,

        pointers: [{
            value: 75,
            type: 'RangeBar',
            radius: '80%',
            pointerWidth: 20,

            linearGradient: {
                startValue: '0%',
                endValue: '100%',

                colorStop: [
                    {
                        color: '#d13438',
                        offset: '0%'
                    },
                    {
                        color: '#ffb900',
                        offset: '50%'
                    },
                    {
                        color: '#107c10',
                        offset: '100%'
                    }
                ]
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

Complete JavaScript example:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 75,
                type: 'RangeBar',
                radius: '80%',
                pointerWidth: 20,

                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',

                    colorStop: [
                        {
                            color: '#d13438',
                            offset: '0%'
                        },
                        {
                            color: '#ffb900',
                            offset: '50%'
                        },
                        {
                            color: '#107c10',
                            offset: '100%'
                        }
                    ]
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

The global EJ2 bundle contains the required feature modules. Explicit injection is not normally required for the global JavaScript setup.

## Marker Pointers

### Purpose

A Marker pointer displays a shape, text, or image at a specific axis value.

Use Marker pointers for:

- Target values.
- Thresholds.
- Checkpoints.
- Warning limits.
- Current status.
- Minimum and maximum indicators.

### Built-In Marker Shapes

```typescript
pointers: [{
    value: 25,
    type: 'Marker',
    markerShape: 'Triangle',
    markerWidth: 20,
    markerHeight: 20,
    radius: '80%',
    color: '#ff6347',

    border: {
        width: 2,
        color: '#333333'
    }
}]
```

Common marker shapes include:

```text
Circle
Rectangle
Diamond
Triangle
InvertedTriangle
Image
Text
```

Use a shape supported by the installed EJ2 version.

### Complete TypeScript Marker

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,

        pointers: [{
            value: 25,
            type: 'Marker',
            markerShape: 'Triangle',
            markerWidth: 20,
            markerHeight: 20,
            radius: '80%',
            color: '#ff6347',

            border: {
                width: 2,
                color: '#333333'
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

### Complete JavaScript Marker

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
                value: 25,
                type: 'Marker',
                markerShape: 'Triangle',
                markerWidth: 20,
                markerHeight: 20,
                radius: '80%',
                color: '#ff6347',

                border: {
                    width: 2,
                    color: '#333333'
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Image Marker

Set `markerShape` to `Image` and provide `imageUrl`.

```typescript
pointers: [{
    value: 50,
    type: 'Marker',
    markerShape: 'Image',
    imageUrl: 'images/marker.png',
    markerWidth: 30,
    markerHeight: 30,
    radius: '80%'
}]
```

The image marker requires both:

```text
markerShape: 'Image'
imageUrl: valid image path
```

Ensure that:

- The image URL is reachable.
- The image is served through HTTP or HTTPS.
- The image dimensions are appropriate.
- Cross-origin access is permitted when using an external image.

### Text Marker

Set `markerShape` to `Text` and configure `text`.

```typescript
pointers: [{
    value: 50,
    type: 'Marker',
    markerShape: 'Text',
    text: 'Target',
    radius: '80%',

    textStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: '600',
        size: '12px',
        color: '#333333'
    }
}]
```

## Pointer Animation

### Pointer-Level Animation

Use the pointer `animation` object.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',

    animation: {
        enable: true,
        duration: 1000
    }
}]
```

Property behavior:

```text
enable   -> Enables or disables pointer animation.
duration -> Defines the animation duration in milliseconds.
```

Do not add `delay` unless it is explicitly supported by the installed Circular Gauge pointer animation model.

### Gauge-Level Animation Duration

The chart-level `animationDuration` property controls the general gauge animation duration.

```typescript
const gauge: CircularGauge = new CircularGauge({
    animationDuration: 1500,

    axes: [{
        pointers: [{
            value: 65,
            type: 'Needle'
        }]
    }]
});

gauge.appendTo('#gauge');
```

Use pointer-level animation when a specific pointer requires custom animation settings.

Use gauge-level `animationDuration` when the general animation duration should be controlled for the component.

### Animation Complete Event

Use `animationComplete` when an action must run after pointer animation finishes.

```typescript
const gauge: CircularGauge = new CircularGauge({
    animationComplete: (): void => {
        console.log('Pointer animation completed.');
    },

    axes: [{
        pointers: [{
            value: 65,
            type: 'Needle',

            animation: {
                enable: true,
                duration: 1000
            }
        }]
    }]
});

gauge.appendTo('#gauge');
```

## Pointer Dragging

### Purpose

Pointer dragging allows users to change pointer values interactively.

Dragging can be enabled at the gauge level or for an individual pointer, depending on the required behavior.

### Enable Pointer Dragging

Use `enablePointerDrag` on the Circular Gauge.

```typescript
enablePointerDrag: true
```

Complete TypeScript example:

```typescript
import {
    CircularGauge,
    PointerDragEventArgs
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',
    enablePointerDrag: true,

    axes: [{
        minimum: 0,
        maximum: 100,

        pointers: [{
            value: 50,
            type: 'Needle'
        }]
    }],

    dragMove: (
        args: PointerDragEventArgs
    ): void => {
        console.log('Current value:', args.currentValue);
    },

    dragEnd: (
        args: PointerDragEventArgs
    ): void => {
        console.log('Final value:', args.currentValue);
    }
});

gauge.appendTo('#gauge');
```

Complete JavaScript example:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 50,
                type: 'Needle'
            }]
        }],

        dragMove: function (args) {
            console.log(
                'Current value:',
                args.currentValue
            );
        },

        dragEnd: function (args) {
            console.log(
                'Final value:',
                args.currentValue
            );
        }
    });

gauge.appendTo('#gauge');
```

The relevant drag lifecycle events are:

```text
dragStart -> Triggered when dragging begins.
dragMove  -> Triggered while the pointer is moving.
dragEnd   -> Triggered when dragging ends.
```

### Individual Pointer Dragging

Use `enableDrag` on a pointer when only selected pointers should be draggable.

```typescript
pointers: [
    {
        value: 50,
        type: 'Needle',
        enableDrag: true
    },
    {
        value: 75,
        type: 'Marker',
        enableDrag: false
    }
]
```

Do not use an unsupported chart-level `allowDragging` property.

Incorrect:

```typescript
allowDragging: true
```

Correct gauge-level property:

```typescript
enablePointerDrag: true
```

Correct pointer-level property:

```typescript
enableDrag: true
```

Do not use an unverified `valueChange` event for pointer dragging. Use the documented drag events and read the current value from the event arguments.

## Multiple Pointers

### Purpose

Multiple pointers allow several values or thresholds to be displayed on the same axis.

Use multiple pointers for:

- Current value and target value.
- Actual value and planned value.
- Minimum, current, and maximum values.
- Progress and threshold.
- Multiple sensor readings on the same scale.

### Complete TypeScript Multiple Pointers

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '500px',

    title: 'Performance Comparison',

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,

        pointers: [
            {
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 6,
                color: '#d13438',

                cap: {
                    radius: 8,
                    color: '#d13438'
                },

                needleTail: {
                    length: '20%',
                    color: '#d13438'
                }
            },
            {
                value: 45,
                type: 'Needle',
                radius: '60%',
                pointerWidth: 5,
                color: '#0066cc',

                cap: {
                    radius: 6,
                    color: '#0066cc'
                },

                needleTail: {
                    length: '15%',
                    color: '#0066cc'
                }
            },
            {
                value: 80,
                type: 'RangeBar',
                radius: '90%',
                pointerWidth: 12,
                color: 'rgba(16, 124, 16, 0.45)'
            },
            {
                value: 90,
                type: 'Marker',
                markerShape: 'Triangle',
                markerWidth: 14,
                markerHeight: 14,
                radius: '100%',
                color: '#5c2d91'
            }
        ]
    }]
});

gauge.appendTo('#gauge');
```

### Complete JavaScript Multiple Pointers

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '500px',

        title: 'Performance Comparison',

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            pointers: [
                {
                    value: 65,
                    type: 'Needle',
                    radius: '75%',
                    pointerWidth: 6,
                    color: '#d13438',

                    cap: {
                        radius: 8,
                        color: '#d13438'
                    },

                    needleTail: {
                        length: '20%',
                        color: '#d13438'
                    }
                },
                {
                    value: 45,
                    type: 'Needle',
                    radius: '60%',
                    pointerWidth: 5,
                    color: '#0066cc',

                    cap: {
                        radius: 6,
                        color: '#0066cc'
                    },

                    needleTail: {
                        length: '15%',
                        color: '#0066cc'
                    }
                },
                {
                    value: 80,
                    type: 'RangeBar',
                    radius: '90%',
                    pointerWidth: 12,
                    color:
                        'rgba(16, 124, 16, 0.45)'
                },
                {
                    value: 90,
                    type: 'Marker',
                    markerShape: 'Triangle',
                    markerWidth: 14,
                    markerHeight: 14,
                    radius: '100%',
                    color: '#5c2d91'
                }
            ]
        }]
    });

gauge.appendTo('#gauge');
```

### Avoid Pointer Overlap

Use the following techniques:

```text
Assign different radii.
Use different pointer types.
Use distinct colors.
Use different needle lengths.
Use different pointer widths.
Use marker pointers for thresholds.
Use RangeBar pointers behind needles.
```

Example:

```typescript
pointers: [
    {
        value: 60,
        type: 'Needle',
        radius: '65%'
    },
    {
        value: 80,
        type: 'Needle',
        radius: '80%'
    },
    {
        value: 90,
        type: 'Marker',
        radius: '95%'
    }
]
```

Changing only `pointerWidth` does not prevent pointers from occupying the same angular position.

## Runtime Pointer Updates

### setPointerValue Method

Use `setPointerValue` to update a pointer value at runtime.

The parameters are:

```text
axisIndex
pointerIndex
value
```

Required HTML:

```html
<button id="updateButton" type="button">
    Set Value to 85
</button>

<div id="gauge"></div>
```

### TypeScript

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '450px',

    axes: [{
        minimum: 0,
        maximum: 100,

        pointers: [{
            value: 50,
            type: 'Needle',

            animation: {
                enable: true,
                duration: 1000
            }
        }]
    }]
});

gauge.appendTo('#gauge');

const updateButton: HTMLElement | null =
    document.getElementById('updateButton');

if (updateButton) {
    updateButton.addEventListener(
        'click',
        (): void => {
            gauge.setPointerValue(0, 0, 85);
        }
    );
}
```

### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 50,
                type: 'Needle',

                animation: {
                    enable: true,
                    duration: 1000
                }
            }]
        }]
    });

gauge.appendTo('#gauge');

var updateButton =
    document.getElementById('updateButton');

if (updateButton) {
    updateButton.addEventListener(
        'click',
        function () {
            gauge.setPointerValue(0, 0, 85);
        }
    );
}
```

Use `setPointerValue` for live updates instead of rebuilding the entire gauge.

Validate the new value before updating:

```typescript
const minimum: number = 0;
const maximum: number = 100;
const requestedValue: number = 85;

const safeValue: number = Math.min(
    maximum,
    Math.max(minimum, requestedValue)
);

gauge.setPointerValue(0, 0, safeValue);
```

## Complete TypeScript Example

Required HTML:

```html
<div class="gauge-actions">
    <button id="setLowButton" type="button">
        Set Low
    </button>

    <button id="setMediumButton" type="button">
        Set Medium
    </button>

    <button id="setHighButton" type="button">
        Set High
    </button>
</div>

<div id="gauge"></div>
```

TypeScript:

```typescript
import {
    CircularGauge,
    Gradient,
    PointerDragEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);

const gauge: CircularGauge = new CircularGauge({
    width: '100%',
    height: '500px',
    title: 'System Performance',
    animationDuration: 1000,
    enablePointerDrag: true,

    axes: [{
        minimum: 0,
        maximum: 100,
        startAngle: 230,
        endAngle: 130,
        radius: '90%',

        lineStyle: {
            width: 2,
            color: '#666666'
        },

        majorTicks: {
            interval: 20,
            width: 2,
            height: 10,
            position: 'Inside',
            color: '#333333'
        },

        minorTicks: {
            interval: 5,
            width: 1,
            height: 5,
            position: 'Inside',
            color: '#666666'
        },

        labelStyle: {
            position: 'Inside',

            font: {
                fontFamily: 'Segoe UI',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        ranges: [
            {
                start: 0,
                end: 50,
                radius: '95%',
                startWidth: 8,
                endWidth: 8,
                color: '#107c10'
            },
            {
                start: 50,
                end: 80,
                radius: '95%',
                startWidth: 8,
                endWidth: 8,
                color: '#ffb900'
            },
            {
                start: 80,
                end: 100,
                radius: '95%',
                startWidth: 8,
                endWidth: 8,
                color: '#d13438'
            }
        ],

        pointers: [
            {
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                needleStartWidth: 2,
                needleEndWidth: 8,
                color: '#d13438',
                enableDrag: true,

                border: {
                    width: 1,
                    color: '#333333'
                },

                needleTail: {
                    length: '20%',
                    color: '#d13438',

                    border: {
                        width: 1,
                        color: '#333333'
                    }
                },

                cap: {
                    radius: 10,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                animation: {
                    enable: true,
                    duration: 800
                }
            },
            {
                value: 80,
                type: 'RangeBar',
                radius: '85%',
                pointerWidth: 14,
                roundedCornerRadius: 7,

                linearGradient: {
                    startValue: '0%',
                    endValue: '100%',

                    colorStop: [
                        {
                            color: '#0066cc',
                            offset: '0%'
                        },
                        {
                            color: '#107c10',
                            offset: '100%'
                        }
                    ]
                },

                animation: {
                    enable: true,
                    duration: 800
                }
            },
            {
                value: 90,
                type: 'Marker',
                markerShape: 'Triangle',
                markerWidth: 14,
                markerHeight: 14,
                radius: '100%',
                color: '#5c2d91'
            }
        ]
    }],

    dragMove: (
        args: PointerDragEventArgs
    ): void => {
        console.log(
            'Pointer value:',
            args.currentValue
        );
    },

    dragEnd: (
        args: PointerDragEventArgs
    ): void => {
        console.log(
            'Final pointer value:',
            args.currentValue
        );
    },

    animationComplete: (): void => {
        console.log('Pointer animation completed.');
    }
});

gauge.appendTo('#gauge');

const clampValue = (value: number): number => {
    return Math.min(100, Math.max(0, value));
};

const updateNeedle = (value: number): void => {
    gauge.setPointerValue(
        0,
        0,
        clampValue(value)
    );
};

document
    .getElementById('setLowButton')
    ?.addEventListener('click', (): void => {
        updateNeedle(25);
    });

document
    .getElementById('setMediumButton')
    ?.addEventListener('click', (): void => {
        updateNeedle(60);
    });

document
    .getElementById('setHighButton')
    ?.addEventListener('click', (): void => {
        updateNeedle(90);
    });
```

## Complete JavaScript Example

Required HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Circular Gauge Pointers</title>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
  </head>
<body>
    <div class="gauge-actions">
        <button id="setLowButton" type="button">
            Set Low
        </button>

        <button id="setMediumButton" type="button">
            Set Medium
        </button>

        <button id="setHighButton" type="button">
            Set High
        </button>
    </div>

    <div id="gauge"></div>

    <script src="index.js"></script>
</body>
</html>
```

JavaScript:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '500px',
        title: 'System Performance',
        animationDuration: 1000,
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            lineStyle: {
                width: 2,
                color: '#666666'
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                position: 'Inside',
                color: '#333333'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                position: 'Inside',
                color: '#666666'
            },

            labelStyle: {
                position: 'Inside',

                font: {
                    fontFamily: 'Segoe UI',
                    fontWeight: 'Normal',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 50,
                    radius: '95%',
                    startWidth: 8,
                    endWidth: 8,
                    color: '#107c10'
                },
                {
                    start: 50,
                    end: 80,
                    radius: '95%',
                    startWidth: 8,
                    endWidth: 8,
                    color: '#ffb900'
                },
                {
                    start: 80,
                    end: 100,
                    radius: '95%',
                    startWidth: 8,
                    endWidth: 8,
                    color: '#d13438'
                }
            ],

            pointers: [
                {
                    value: 65,
                    type: 'Needle',
                    radius: '75%',
                    pointerWidth: 8,
                    needleStartWidth: 2,
                    needleEndWidth: 8,
                    color: '#d13438',
                    enableDrag: true,

                    border: {
                        width: 1,
                        color: '#333333'
                    },

                    needleTail: {
                        length: '20%',
                        color: '#d13438',

                        border: {
                            width: 1,
                            color: '#333333'
                        }
                    },

                    cap: {
                        radius: 10,
                        color: '#0066cc',

                        border: {
                            width: 2,
                            color: '#333333'
                        }
                    },

                    animation: {
                        enable: true,
                        duration: 800
                    }
                },
                {
                    value: 80,
                    type: 'RangeBar',
                    radius: '85%',
                    pointerWidth: 14,
                    roundedCornerRadius: 7,

                    linearGradient: {
                        startValue: '0%',
                        endValue: '100%',

                        colorStop: [
                            {
                                color: '#0066cc',
                                offset: '0%'
                            },
                            {
                                color: '#107c10',
                                offset: '100%'
                            }
                        ]
                    },

                    animation: {
                        enable: true,
                        duration: 800
                    }
                },
                {
                    value: 90,
                    type: 'Marker',
                    markerShape: 'Triangle',
                    markerWidth: 14,
                    markerHeight: 14,
                    radius: '100%',
                    color: '#5c2d91'
                }
            ]
        }],

        dragMove: function (args) {
            console.log(
                'Pointer value:',
                args.currentValue
            );
        },

        dragEnd: function (args) {
            console.log(
                'Final pointer value:',
                args.currentValue
            );
        },

        animationComplete: function () {
            console.log(
                'Pointer animation completed.'
            );
        }
    });

gauge.appendTo('#gauge');

function clampValue(value) {
    return Math.min(
        100,
        Math.max(0, value)
    );
}

function updateNeedle(value) {
    gauge.setPointerValue(
        0,
        0,
        clampValue(value)
    );
}

var setLowButton =
    document.getElementById('setLowButton');

var setMediumButton =
    document.getElementById('setMediumButton');

var setHighButton =
    document.getElementById('setHighButton');

if (setLowButton) {
    setLowButton.addEventListener(
        'click',
        function () {
            updateNeedle(25);
        }
    );
}

if (setMediumButton) {
    setMediumButton.addEventListener(
        'click',
        function () {
            updateNeedle(60);
        }
    );
}

if (setHighButton) {
    setHighButton.addEventListener(
        'click',
        function () {
            updateNeedle(90);
        }
    );
}
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ Gradient is imported and injected when a gradient is used.
✅ The global EJ2 script loads before JavaScript application code.
✅ The Circular Gauge host element exists.
✅ gauge.appendTo('#gauge') is called.
✅ At least one axis is configured.
✅ Axis minimum is less than axis maximum.
✅ Pointer type is Needle, RangeBar, or Marker.
✅ Pointer value is within the intended axis range.
✅ Needle pointers use needleTail instead of tail.
✅ Cap borders use cap.border.
✅ Needle-tail borders use needleTail.border.
✅ RangeBar rounded ends use roundedCornerRadius.
✅ Image markers use markerShape: 'Image'.
✅ Image markers provide a valid imageUrl.
✅ Pointer animation uses supported animation properties.
✅ Pointer dragging uses enablePointerDrag or pointer.enableDrag.
✅ Drag behavior uses dragStart, dragMove, or dragEnd.
✅ Runtime updates use setPointerValue.
✅ Axis and pointer indexes passed to setPointerValue are valid.
✅ Multiple pointers use distinguishable radii, colors, or types.
✅ No editor-generated HTML exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Needle Tail Property

Incorrect:

```typescript
tail: {
    length: '25%',
    width: 8,
    color: '#ff6347'
}
```

Correct:

```typescript
needleTail: {
    length: '25%',
    color: '#ff6347',

    border: {
        width: 1,
        color: '#333333'
    }
}
```

### Incorrect Cap Border

Incorrect:

```typescript
cap: {
    radius: 10,
    color: '#0066cc',
    borderWidth: 2,
    borderColor: '#333333'
}
```

Correct:

```typescript
cap: {
    radius: 10,
    color: '#0066cc',

    border: {
        width: 2,
        color: '#333333'
    }
}
```

### Incorrect Rounded RangeBar Property

Incorrect:

```typescript
roundedCorners: true
```

Correct:

```typescript
roundedCornerRadius: 10
```

### Missing Marker Shape for Image

Incorrect:

```typescript
pointers: [{
    type: 'Marker',
    imageUrl: 'images/marker.png'
}]
```

Correct:

```typescript
pointers: [{
    type: 'Marker',
    markerShape: 'Image',
    imageUrl: 'images/marker.png'
}]
```

### Missing Gradient Module

Incorrect TypeScript:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge = new CircularGauge({
    axes: [{
        pointers: [{
            linearGradient: {
                colorStop: []
            }
        }]
    }]
});
```

Correct:

```typescript
import {
    CircularGauge,
    Gradient
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Gradient);
```

### Incorrect Drag Property

Incorrect:

```typescript
allowDragging: true
```

Correct gauge-level configuration:

```typescript
enablePointerDrag: true
```

Correct individual-pointer configuration:

```typescript
pointers: [{
    value: 50,
    enableDrag: true
}]
```

### Incorrect Drag Event

Avoid relying on:

```typescript
gauge.valueChange = (args) => {
    console.log(args.value);
};
```

Use the pointer-drag lifecycle:

```typescript
const gauge = new CircularGauge({
    enablePointerDrag: true,

    dragMove: (args) => {
        console.log(args.currentValue);
    },

    dragEnd: (args) => {
        console.log(args.currentValue);
    }
});
```

### Invalid Axis Structure

Incorrect:

```typescript
axes: [{
    pointers: [{
        value: 50
    }]
}}
]
```

Correct:

```typescript
axes: [{
    pointers: [{
        value: 50
    }]
}]
```

### Out-of-Range Pointer Value

Incorrect:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    pointers: [{
        value: 150
    }]
}]
```

Preferred:

```typescript
axes: [{
    minimum: 0,
    maximum: 100,

    pointers: [{
        value: 85
    }]
}]
```

Validate or clamp external values before assigning them.

### Pointer Not Visible

Check:

```text
Pointer value is within the axis range.
Pointer type is valid.
Pointer radius is appropriate.
Pointer color contrasts with the background.
Marker width and height are greater than zero.
RangeBar pointerWidth is greater than zero.
Image marker URL is valid.
Axis radius provides enough space.
```

### Multiple Pointer Overlap

Changing only width may not solve overlap.

Prefer:

```typescript
pointers: [
    {
        value: 60,
        type: 'Needle',
        radius: '65%',
        color: '#d13438'
    },
    {
        value: 80,
        type: 'Needle',
        radius: '80%',
        color: '#0066cc'
    },
    {
        value: 90,
        type: 'Marker',
        radius: '95%',
        color: '#107c10'
    }
]
```

### Rebuilding the Gauge for Every Update

Avoid destroying and recreating the entire gauge for a simple pointer update.

Preferred:

```typescript
gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    newValue
);
```

### Incorrect Constructor Pattern

Avoid:

```typescript
const gauge = new CircularGauge({
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

### Missing Host Element

Required HTML:

```html
<div id="gauge"></div>
```

Required attachment:

```typescript
gauge.appendTo('#gauge');
```

The IDs must match exactly.