# Annotations

- #overview
- #required-module
- #basic-annotation
- #annotation-properties
- #annotation-content
  - #plain-text-content
  - #html-content
  - #element-selector
  - #image-content
- #annotation-positioning
  - #angle
  - #radius
  - #automatic-angle
  - #z-index
- #annotation-text-style
- #multiple-annotations
- #dynamic-annotation-content
- #annotation-render-event
- #accessibility
- #export-considerations
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Overview

Annotations display custom content at specified positions within a Circular Gauge axis.

Use annotations for:

- Current values.
- Measurement units.
- Gauge descriptions.
- KPI labels.
- Status indicators.
- Images and icons.
- Custom HTML content.
- Secondary gauges.
- Additional contextual information.

An annotation can contain an HTML string, a function, or the ID of an existing HTML element. Its position is controlled through `angle` and `radius`.

Each axis can contain one or more annotations:

```typescript
axes: [{
    annotations: [
        {
            content: '<div>65</div>',
            angle: 180,
            radius: '30%',
            zIndex: '1'
        }
    ]
}]
```

## Required Module

TypeScript applications must import and inject the `Annotations` module before using axis annotations.

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

The module must be injected before the Circular Gauge instance is created.

Correct:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const gauge: CircularGauge =
    new CircularGauge({
        axes: [{
            annotations: [{
                content: '<div>65</div>'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Incorrect:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        axes: [{
            annotations: [{
                content: '<div>65</div>'
            }]
        }]
    });

CircularGauge.Inject(Annotations);
```

When the complete EJ2 global JavaScript bundle is used, explicit module injection is generally unnecessary.

## Basic Annotation

### Required HTML

```html
<div id="gauge"></div>
```

### TypeScript

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 60,
                type: 'Needle'
            }],

            annotations: [{
                angle: 180,
                radius: '35%',
                zIndex: '1',

                content:
                    '<div style="' +
                    'font-size:18px;' +
                    'font-weight:600;' +
                    'color:#333333;' +
                    '">' +
                    '60' +
                    '</div>'
            }]
        }]
    });

gauge.appendTo('#gauge');
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
                value: 60,
                type: 'Needle'
            }],

            annotations: [{
                angle: 180,
                radius: '35%',
                zIndex: '1',

                content:
                    '<div style="' +
                    'font-size:18px;' +
                    'font-weight:600;' +
                    'color:#333333;' +
                    '">' +
                    '60' +
                    '</div>'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

## Annotation Properties

The Circular Gauge annotation model supports the following properties:

```text
angle
autoAngle
content
description
radius
textStyle
zIndex
```

These properties control the annotation content, position, rotation, text appearance, stacking order, and accessibility description.

### `angle`

Defines the angular position of the annotation.

```typescript
angle: 180
```

The default value is `90`.

### `radius`

Defines the annotation's distance from the center relative to the axis radius.

```typescript
radius: '35%'
```

The radius accepts percentage or pixel values. The default is `50%`.

### `content`

Defines the annotation content.

```typescript
content: '<div>Current value: 65</div>'
```

The property accepts an HTML string, function, or element ID.

### `zIndex`

Defines the stacking order.

```typescript
zIndex: '1'
```

The annotation API defines `zIndex` as a string. Its default value is `-1`.

### `autoAngle`

Controls whether the annotation rotates along the axis.

```typescript
autoAngle: true
```

The default value is `false`.

### `description`

Provides information about the annotation for assistive technologies.

```typescript
description:
    'Current speed is 65 kilometers per hour'
```

### `textStyle`

Configures the text appearance of a plain-text annotation.

```typescript
textStyle: {
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px',
    color: '#333333'
}
```

Do not use unsupported direct properties such as `fontFamily`, `fontSize`, or `fontColor on the annotation itself.

## Annotation Content

### Plain Text Content

Use a plain string when the annotation needs only simple text.

```typescript
annotations: [{
    angle: 180,
    radius: '35%',
    content: 'Current value: 65',

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        size: '14px',
        color: '#333333'
    }
}]
```

Complete TypeScript example:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }],

            annotations: [{
                angle: 180,
                radius: '35%',
                content: 'Current value: 65',

                textStyle: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### HTML Content

Use HTML when the annotation requires structured or richly styled content.

```typescript
annotations: [{
    angle: 180,
    radius: '35%',
    zIndex: '1',

    content:
        '<div class="value-annotation">' +
        '<span class="value-annotation__label">' +
        'Speed' +
        '</span>' +
        '<strong class="value-annotation__value">' +
        '65' +
        '</strong>' +
        '<span class="value-annotation__unit">' +
        'km/h' +
        '</span>' +
        '</div>'
}]
```

Required CSS:

```css
.value-annotation {
    min-width: 90px;
    padding: 8px 12px;
    color: #333333;
    background: #f5f5f5;
    border: 1px solid #dddddd;
    border-radius: 6px;
    font-family: "Segoe UI", sans-serif;
    text-align: center;
    box-sizing: border-box;
}

.value-annotation__label,
.value-annotation__unit {
    display: block;
    font-size: 12px;
}

.value-annotation__value {
    display: block;
    color: #d13438;
    font-size: 24px;
    line-height: 1.2;
}
```

Using CSS classes is preferable to repeating long inline style strings.

### Element Selector

An annotation can reference an existing HTML element through its ID.

Required HTML:

```html
<div id="gauge"></div>

<script id="annotation-template" type="text/x-template">
    <div class="value-annotation">
        <span class="value-annotation__label">
            Speed
        </span>

        <strong
            id="annotation-value"
            class="value-annotation__value"
        >
            65
        </strong>

        <span class="value-annotation__unit">
            km/h
        </span>
    </div>
</script>
```

Gauge configuration:

```typescript
annotations: [{
    angle: 180,
    radius: '35%',
    zIndex: '1',
    content: '#annotation-template'
}]
```

The annotation content API accepts an HTML string or the ID of a custom element.

When using an element selector:

- Ensure the element exists before the gauge is created.
- Use a unique ID.
- Include the `#` prefix when required.
- Avoid duplicate element IDs inside repeated annotations.
- Verify that the template element is not displayed separately.

### Image Content

Use an HTML `img` element.

```typescript
annotations: [{
    angle: 180,
    radius: '35%',
    zIndex: '1',

    content:
        'images/speedometer.png',

    description:
        'Speedometer status icon'
}]
```

When using an image annotation:

- Verify that the image path is correct.
- Serve the image through HTTP or HTTPS.
- Set explicit dimensions.
- Use an empty `alt` value when the annotation description already conveys the meaning.
- Test the image in print and export scenarios.
- Verify cross-origin access for external images.

## Annotation Positioning

### Angle

The `angle` property positions the annotation around the axis.

```typescript
annotations: [{
    angle: 90,
    radius: '50%',
    content: '<div>Annotation</div>'
}]
```

For example, an annotation with an angle of `90` and a radius greater than `100%` is positioned toward the right side of the axis.

Always validate positions visually because the final location depends on:

```text
Axis start angle
Axis end angle
Axis direction
Axis radius
Gauge dimensions
Gauge centerX and centerY
Annotation width and height
```

Do not rely on universal screen-direction descriptions for angle values without checking the actual rendered gauge.

### Radius

Use a percentage value for responsive positioning:

```typescript
radius: '35%'
```

Use a pixel value only when the gauge dimensions are fixed:

```typescript
radius: '120'
```

Percentage positioning is calculated relative to the axis radius.

Examples:

```typescript
annotations: [
    {
        angle: 0,
        radius: '0%',
        content: '<div>Center</div>'
    },
    {
        angle: 90,
        radius: '50%',
        content: '<div>Middle radius</div>'
    },
    {
        angle: 180,
        radius: '100%',
        content: '<div>Axis edge</div>'
    }
]
```

Use percentages for layouts that must adapt to different gauge sizes.

### Automatic Angle

Set `autoAngle` to `true` when annotation content should rotate along the axis.

```typescript
annotations: [{
    angle: 90,
    radius: '80%',
    autoAngle: true,
    content: 'Target'
}]
```

Use automatic rotation for:

- Short labels.
- Direction indicators.
- Labels that intentionally follow the arc.

Avoid it for:

- Long text.
- Multi-line HTML.
- KPI cards.
- Images that must remain upright.
- Content that must be read quickly.

### Z-Index

Use `zIndex` to control whether the annotation appears above or behind other content.

```typescript
zIndex: '1'
```

The property uses a string value:

```typescript
zIndex: '1'
```

Avoid:

```typescript
zIndex: 1
```

A positive z-index is commonly used when the annotation must appear above gauge content.

A negative value can place it behind other elements.

## Annotation Text Style

Use the nested `textStyle` model for plain-text annotation styling.

```typescript
annotations: [{
    angle: 180,
    radius: '35%',
    content: 'Current Value',

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Italic',
        fontWeight: '600',
        size: '16px',
        color: '#d13438',
        opacity: 1
    }
}]
```

Do not place font properties directly on the annotation.

Incorrect:

```typescript
annotations: [{
    content: 'Current Value',
    fontFamily: 'Segoe UI',
    fontSize: '16px',
    fontColor: '#d13438',
    fontWeight: 'Bold'
}]
```

Correct:

```typescript
annotations: [{
    content: 'Current Value',

    textStyle: {
        fontFamily: 'Segoe UI',
        size: '16px',
        color: '#d13438',
        fontWeight: 'Bold'
    }
}]
```

The annotation model exposes `textStyle` for annotation text styling.

For complex HTML content, use CSS classes inside `content`.

## Multiple Annotations

An axis can contain several annotations.

Use separate annotations when each item needs its own:

```text
Position
Radius
Rotation
Description
Stacking order
Text style
HTML structure
```

### TypeScript

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

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
            }],

            annotations: [
                {
                    angle: 180,
                    radius: '30%',
                    zIndex: '1',
                    content:
                        '<div class="gauge-value">' +
                        '65' +
                        '</div>',
                    description:
                        'Current value is 65'
                },
                {
                    angle: 180,
                    radius: '48%',
                    zIndex: '1',
                    content:
                        '<div class="gauge-unit">' +
                        'km/h' +
                        '</div>',
                    description:
                        'Unit is kilometers per hour'
                },
                {
                    angle: 0,
                    radius: '20%',
                    zIndex: '1',
                    content:
                        '<div class="gauge-label">' +
                        'Speed' +
                        '</div>'
                }
            ]
        }]
    });

gauge.appendTo('#gauge');
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
            startAngle: 230,
            endAngle: 130,

            pointers: [{
                value: 65,
                type: 'Needle'
            }],

            annotations: [
                {
                    angle: 180,
                    radius: '30%',
                    zIndex: '1',
                    content:
                        '<div class="gauge-value">' +
                        '65' +
                        '</div>',
                    description:
                        'Current value is 65'
                },
                {
                    angle: 180,
                    radius: '48%',
                    zIndex: '1',
                    content:
                        '<div class="gauge-unit">' +
                        'km/h' +
                        '</div>',
                    description:
                        'Unit is kilometers per hour'
                },
                {
                    angle: 0,
                    radius: '20%',
                    zIndex: '1',
                    content:
                        '<div class="gauge-label">' +
                        'Speed' +
                        '</div>'
                }
            ]
        }]
    });

gauge.appendTo('#gauge');
```

Use different angles, radii, or both to prevent overlap.

## Dynamic Annotation Content

### Purpose

Dynamic annotations keep displayed text synchronized with a pointer value or application state.

Use the public `setAnnotationValue` method when available in the target Essential JS 2 version.

```typescript
gauge.setAnnotationValue(
    axisIndex,
    annotationIndex,
    content
);
```

Parameters:

```text
axisIndex       -> Index of the containing axis.
annotationIndex -> Index of the annotation to update.
content         -> New annotation content.
```

### Update Pointer and Annotation Together

Required HTML:

```html
<button id="updateButton" type="button">
    Set Value to 85
</button>

<div id="gauge"></div>
```

TypeScript:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const createValueContent = (
    value: number
): string => {
    return (
        '<div class="gauge-value">' +
        value.toFixed(0) +
        '</div>'
    );
};

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle',

                animation: {
                    enable: true,
                    duration: 800
                }
            }],

            annotations: [{
                angle: 180,
                radius: '30%',
                zIndex: '1',
                content:
                    createValueContent(65),
                description:
                    'Current value is 65'
            }]
        }]
    });

gauge.appendTo('#gauge');

const updateButton: HTMLElement | null =
    document.getElementById(
        'updateButton'
    );

if (updateButton) {
    updateButton.addEventListener(
        'click',
        (): void => {
            const value: number = 85;

            gauge.setPointerValue(
                0,
                0,
                value
            );

            gauge.setAnnotationValue(
                0,
                0,
                createValueContent(value)
            );
        }
    );
}
```

JavaScript:

```javascript
function createValueContent(value) {
    return (
        '<div class="gauge-value">' +
        value.toFixed(0) +
        '</div>'
    );
}

var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle',

                animation: {
                    enable: true,
                    duration: 800
                }
            }],

            annotations: [{
                angle: 180,
                radius: '30%',
                zIndex: '1',
                content:
                    createValueContent(65),
                description:
                    'Current value is 65'
            }]
        }]
    });

gauge.appendTo('#gauge');

var updateButton =
    document.getElementById(
        'updateButton'
    );

if (updateButton) {
    updateButton.addEventListener(
        'click',
        function () {
            var value = 85;

            gauge.setPointerValue(
                0,
                0,
                value
            );

            gauge.setAnnotationValue(
                0,
                0,
                createValueContent(value)
            );
        }
    );
}
```

If the installed EJ2 version does not expose `setAnnotationValue`, update the annotation model and refresh:

```typescript
gauge.axes[0].annotations[0].content =
    createValueContent(value);

gauge.refresh();
```

Do not rely on an unsupported `valueChange` event for programmatic pointer updates. Update the annotation in the same application action that calls `setPointerValue`.

For pointer dragging, update the annotation through `dragMove` or `dragEnd`.

### Dynamic Annotation During Pointer Dragging

```typescript
import {
    CircularGauge,
    Annotations,
    PointerDragEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const createValueContent = (
    value: number
): string => {
    return (
        '<div class="gauge-value">' +
        value.toFixed(0) +
        '</div>'
    );
};

const gauge: CircularGauge =
    new CircularGauge({
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65
            }],

            annotations: [{
                angle: 180,
                radius: '30%',
                zIndex: '1',
                content:
                    createValueContent(65)
            }]
        }],

        dragMove: (
            args: PointerDragEventArgs
        ): void => {
            gauge.setAnnotationValue(
                0,
                0,
                createValueContent(
                    args.currentValue
                )
            );
        }
    });

gauge.appendTo('#gauge');
```

Use `dragEnd` instead when annotation refresh during every drag movement is unnecessary.

## Annotation Render Event

Use `annotationRender` to customize or cancel an annotation before rendering.

```typescript
import {
    CircularGauge,
    Annotations,
    IAnnotationRenderEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const gauge: CircularGauge =
    new CircularGauge({
        annotationRender: (
            args: IAnnotationRenderEventArgs
        ): void => {
            console.log(
                'Rendering annotation:',
                args
            );
        },

        axes: [{
            annotations: [{
                content:
                    '<div>Current Value</div>',
                zIndex: '1'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use `annotationRender` for:

- Conditional annotation content.
- Localization.
- Applying application state.
- Preventing selected annotations from rendering.
- Recording rendering diagnostics.

Avoid expensive processing in the event because it runs during rendering.

## Accessibility

Use `description` to supply an accessible annotation description.

```typescript
annotations: [{
    content:
        '<div class="gauge-value">' +
        '65' +
        '</div>',

    description:
        'Current speed is 65 kilometers per hour'
}]
```

The annotation API specifically provides `description` for assistive technology.

Accessibility guidance:

- Describe the annotation's meaning rather than its appearance.
- Include the value and unit when relevant.
- Update the description when dynamic content changes.
- Do not rely on color alone for status.
- Do not repeat information unnecessarily.
- Keep decorative images hidden from assistive technology.
- Provide readable contrast for visible text.

For dynamic status, also consider an external live region:

```html
<p id="gauge-status" aria-live="polite">
    Current speed is 65 kilometers per hour.
</p>
```

Update the live region when the gauge value changes:

```typescript
const gaugeStatus: HTMLElement | null =
    document.getElementById(
        'gauge-status'
    );

if (gaugeStatus) {
    gaugeStatus.textContent =
        'Current speed is 85 kilometers per hour.';
}
```

## Export Considerations

Annotations may contain HTML elements that require special handling during image or PDF export.

Potential limitations include:

- HTML annotation content being omitted.
- External images not being available when export begins.
- CSS classes not being embedded into exported output.
- Browser differences involving SVG `foreignObject`.
- Custom fonts not being ready before export.

Validate every required export format when annotations are present.

Test:

```text
PNG
JPEG
SVG
PDF
Print
```

If HTML annotations are not included in normal export, use a validated specialized export workflow that converts annotation content into exportable SVG or canvas content.

## Complete TypeScript Example

### Required HTML

```html
<div class="gauge-actions">
    <button id="decreaseButton" type="button">
        Decrease
    </button>

    <button id="increaseButton" type="button">
        Increase
    </button>
</div>

<div id="gauge"></div>

<p id="gauge-status" aria-live="polite">
    Current speed is 65 kilometers per hour.
</p>
```

### Required CSS

```css
.gauge-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.gauge-actions button {
    padding: 8px 14px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
}

.gauge-actions button:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}

.gauge-value-card {
    min-width: 100px;
    padding: 8px 12px;
    color: #333333;
    background: #f5f5f5;
    border: 1px solid #dddddd;
    border-radius: 6px;
    font-family: "Segoe UI", sans-serif;
    text-align: center;
    box-sizing: border-box;
}

.gauge-value-card__label {
    display: block;
    font-size: 12px;
}

.gauge-value-card__value {
    display: block;
    color: #d13438;
    font-size: 28px;
    line-height: 1.2;
}

.gauge-value-card__unit {
    display: block;
    color: #666666;
    font-size: 12px;
}

.gauge-status-badge {
    padding: 5px 10px;
    color: #ffffff;
    background: #107c10;
    border-radius: 12px;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
    font-weight: 600;
}
```

### TypeScript

```typescript
import {
    CircularGauge,
    Annotations,
    PointerDragEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);

const minimum: number = 0;
const maximum: number = 120;

let currentValue: number = 65;

const clamp = (
    value: number
): number => {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
};

const createValueContent = (
    value: number
): string => {
    return (
        '<div class="gauge-value-card">' +
        '<span class="gauge-value-card__label">' +
        'Speed' +
        '</span>' +
        '<strong class="gauge-value-card__value">' +
        value.toFixed(0) +
        '</strong>' +
        '<span class="gauge-value-card__unit">' +
        'km/h' +
        '</span>' +
        '</div>'
    );
};

const getStatus = (
    value: number
): string => {
    if (value >= 90) {
        return 'CRITICAL';
    }

    if (value >= 60) {
        return 'WARNING';
    }

    return 'NORMAL';
};

const getStatusColor = (
    value: number
): string => {
    if (value >= 90) {
        return '#d13438';
    }

    if (value >= 60) {
        return '#ff8c00';
    }

    return '#107c10';
};

const createStatusContent = (
    value: number
): string => {
    return (
        '<div ' +
        'class="gauge-status-badge" ' +
        'style="background:' +
        getStatusColor(value) +
        ';">' +
        getStatus(value) +
        '</div>'
    );
};

const statusElement: HTMLElement | null =
    document.getElementById(
        'gauge-status'
    );

const updateAccessibleStatus = (
    value: number
): void => {
    if (statusElement) {
        statusElement.textContent =
            'Current speed is ' +
            value.toFixed(0) +
            ' kilometers per hour. ' +
            'Status is ' +
            getStatus(value).toLowerCase() +
            '.';
    }
};

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Vehicle Speed',
        enablePointerDrag: true,

        axes: [{
            minimum,
            maximum,
            startAngle: 230,
            endAngle: 130,
            radius: '88%',

            lineStyle: {
                width: 8,
                color: '#e0e0e0'
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                position: 'Inside'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                position: 'Inside'
            },

            labelStyle: {
                position: 'Inside',
                format: '{value}',

                font: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 60,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 60,
                    end: 90,
                    color: '#ff8c00',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 90,
                    end: 120,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                }
            ],

            pointers: [{
                value: currentValue,
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
                    duration: 800
                }
            }],

            annotations: [
                {
                    angle: 180,
                    radius: '30%',
                    zIndex: '1',
                    autoAngle: false,
                    content:
                        createValueContent(
                            currentValue
                        ),
                    description:
                        'Current speed is 65 ' +
                        'kilometers per hour'
                },
                {
                    angle: 180,
                    radius: '58%',
                    zIndex: '1',
                    autoAngle: false,
                    content:
                        createStatusContent(
                            currentValue
                        ),
                    description:
                        'Current status is warning'
                }
            ]
        }],

        dragMove: (
            args: PointerDragEventArgs
        ): void => {
            currentValue =
                clamp(args.currentValue);

            gauge.setAnnotationValue(
                0,
                0,
                createValueContent(
                    currentValue
                )
            );

            gauge.setAnnotationValue(
                0,
                1,
                createStatusContent(
                    currentValue
                )
            );

            updateAccessibleStatus(
                currentValue
            );
        }
    });

gauge.appendTo('#gauge');

const updateGauge = (
    requestedValue: number
): void => {
    currentValue =
        clamp(requestedValue);

    gauge.setPointerValue(
        0,
        0,
        currentValue
    );

    gauge.setAnnotationValue(
        0,
        0,
        createValueContent(
            currentValue
        )
    );

    gauge.setAnnotationValue(
        0,
        1,
        createStatusContent(
            currentValue
        )
    );

    updateAccessibleStatus(
        currentValue
    );
};

document
    .getElementById('decreaseButton')
    ?.addEventListener('click', (): void => {
        updateGauge(
            currentValue - 10
        );
    });

document
    .getElementById('increaseButton')
    ?.addEventListener('click', (): void => {
        updateGauge(
            currentValue + 10
        );
    });
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

    <title>Circular Gauge Annotations</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .gauge-actions {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        }

        .gauge-actions button {
            padding: 8px 14px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            background: #ffffff;
            cursor: pointer;
        }

        .gauge-actions button:focus-visible {
            outline: 2px solid #0066cc;
            outline-offset: 2px;
        }

        .gauge-value-card {
            min-width: 100px;
            padding: 8px 12px;
            color: #333333;
            background: #f5f5f5;
            border: 1px solid #dddddd;
            border-radius: 6px;
            font-family: "Segoe UI", sans-serif;
            text-align: center;
            box-sizing: border-box;
        }

        .gauge-value-card__label {
            display: block;
            font-size: 12px;
        }

        .gauge-value-card__value {
            display: block;
            color: #d13438;
            font-size: 28px;
            line-height: 1.2;
        }

        .gauge-value-card__unit {
            display: block;
            color: #666666;
            font-size: 12px;
        }

        .gauge-status-badge {
            padding: 5px 10px;
            color: #ffffff;
            border-radius: 12px;
            font-family: "Segoe UI", sans-serif;
            font-size: 12px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="gauge-actions">
        <button id="decreaseButton" type="button">
            Decrease
        </button>

        <button id="increaseButton" type="button">
            Increase
        </button>
    </div>

    <div id="gauge"></div>

    <p id="gauge-status" aria-live="polite">
        Current speed is 65 kilometers per hour.
    </p>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var minimum = 0;
var maximum = 120;
var currentValue = 65;

function clamp(value) {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
}

function createValueContent(value) {
    return (
        '<div class="gauge-value-card">' +
        '<span class="gauge-value-card__label">' +
        'Speed' +
        '</span>' +
        '<strong class="gauge-value-card__value">' +
        value.toFixed(0) +
        '</strong>' +
        '<span class="gauge-value-card__unit">' +
        'km/h' +
        '</span>' +
        '</div>'
    );
}

function getStatus(value) {
    if (value >= 90) {
        return 'CRITICAL';
    }

    if (value >= 60) {
        return 'WARNING';
    }

    return 'NORMAL';
}

function getStatusColor(value) {
    if (value >= 90) {
        return '#d13438';
    }

    if (value >= 60) {
        return '#ff8c00';
    }

    return '#107c10';
}

function createStatusContent(value) {
    return (
        '<div ' +
        'class="gauge-status-badge" ' +
        'style="background:' +
        getStatusColor(value) +
        ';">' +
        getStatus(value) +
        '</div>'
    );
}

var statusElement =
    document.getElementById(
        'gauge-status'
    );

function updateAccessibleStatus(value) {
    if (statusElement) {
        statusElement.textContent =
            'Current speed is ' +
            value.toFixed(0) +
            ' kilometers per hour. ' +
            'Status is ' +
            getStatus(value).toLowerCase() +
            '.';
    }
}

var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Vehicle Speed',
        enablePointerDrag: true,

        axes: [{
            minimum: minimum,
            maximum: maximum,
            startAngle: 230,
            endAngle: 130,
            radius: '88%',

            lineStyle: {
                width: 8,
                color: '#e0e0e0'
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                position: 'Inside'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                position: 'Inside'
            },

            labelStyle: {
                position: 'Inside',
                format: '{value}',

                font: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 60,
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 60,
                    end: 90,
                    color: '#ff8c00',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 90,
                    end: 120,
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                }
            ],

            pointers: [{
                value: currentValue,
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
                    duration: 800
                }
            }],

            annotations: [
                {
                    angle: 180,
                    radius: '30%',
                    zIndex: '1',
                    autoAngle: false,
                    content:
                        createValueContent(
                            currentValue
                        ),
                    description:
                        'Current speed is 65 ' +
                        'kilometers per hour'
                },
                {
                    angle: 180,
                    radius: '58%',
                    zIndex: '1',
                    autoAngle: false,
                    content:
                        createStatusContent(
                            currentValue
                        ),
                    description:
                        'Current status is warning'
                }
            ]
        }],

        dragMove: function (args) {
            currentValue =
                clamp(args.currentValue);

            gauge.setAnnotationValue(
                0,
                0,
                createValueContent(
                    currentValue
                )
            );

            gauge.setAnnotationValue(
                0,
                1,
                createStatusContent(
                    currentValue
                )
            );

            updateAccessibleStatus(
                currentValue
            );
        }
    });

gauge.appendTo('#gauge');

function updateGauge(requestedValue) {
    currentValue =
        clamp(requestedValue);

    gauge.setPointerValue(
        0,
        0,
        currentValue
    );

    gauge.setAnnotationValue(
        0,
        0,
        createValueContent(
            currentValue
        )
    );

    gauge.setAnnotationValue(
        0,
        1,
        createStatusContent(
            currentValue
        )
    );

    updateAccessibleStatus(
        currentValue
    );
}

var decreaseButton =
    document.getElementById(
        'decreaseButton'
    );

var increaseButton =
    document.getElementById(
        'increaseButton'
    );

if (decreaseButton) {
    decreaseButton.addEventListener(
        'click',
        function () {
            updateGauge(
                currentValue - 10
            );
        }
    );
}

if (increaseButton) {
    increaseButton.addEventListener(
        'click',
        function () {
            updateGauge(
                currentValue + 10
            );
        }
    );
}
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ Annotations is imported and injected.
✅ The global EJ2 script loads before JavaScript application code.
✅ The gauge host element exists.
✅ gauge.appendTo('#gauge') is called.
✅ Annotations are configured inside an axis.
✅ Annotation content contains valid text, HTML, a function, or an element ID.
✅ Executable HTML is not entity encoded.
✅ Annotation radius uses a valid percentage or pixel value.
✅ Annotation angle produces the intended rendered position.
✅ Annotation position is validated with the axis direction.
✅ zIndex uses a string value.
✅ autoAngle is enabled only when rotated content is readable.
✅ Plain-text annotation styling uses textStyle.
✅ HTML annotation styling uses valid HTML and CSS.
✅ description explains meaningful annotation content.
✅ Dynamic pointer and annotation values remain synchronized.
✅ setAnnotationValue uses valid axis and annotation indexes.
✅ setPointerValue uses valid axis and pointer indexes.
✅ Pointer values remain within the axis range.
✅ Multiple annotations use sufficient angle or radius separation.
✅ External annotation images are reachable.
✅ Annotation export behavior is tested for required formats.
✅ Dynamic status is available outside the visual gauge when necessary.
✅ No editor-generated markup exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Missing Annotation Module

Incorrect:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

const gauge =
    new CircularGauge({
        axes: [{
            annotations: [{
                content: '<div>65</div>'
            }]
        }]
    });
```

Correct:

```typescript
import {
    CircularGauge,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Annotations);
```

### Incorrect Direct Font Properties

Incorrect:

```typescript
annotations: [{
    content: 'Current Value',
    fontFamily: 'Segoe UI',
    fontSize: '16px',
    fontColor: '#333333',
    fontWeight: 'Bold'
}]
```

Correct:

```typescript
annotations: [{
    content: 'Current Value',

    textStyle: {
        fontFamily: 'Segoe UI',
        size: '16px',
        color: '#333333',
        fontWeight: 'Bold'
    }
}]
```

The annotation API exposes one nested `textStyle` model.

### Incorrect Z-Index Type

Avoid:

```typescript
zIndex: 1
```

Use:

```typescript
zIndex: '1'
```

The annotation model defines `zIndex` as a string.

### Encoded HTML Content

Incorrect executable content:

```typescript
content:
    '<div style="font-size:24px">' +
    '65' +
    '</div>'
```

Correct:

```typescript
content:
    '<div style="font-size:24px">' +
    '65' +
    '</div>'
```

### Unsupported Value Change Event

Avoid:

```typescript
gauge.valueChange = (args) => {
    gauge.axes[0]
        .annotations[0]
        .content =
            String(args.value);

    gauge.refresh();
};
```

For programmatic changes, update both elements in the same operation:

```typescript
gauge.setPointerValue(
    0,
    0,
    value
);

gauge.setAnnotationValue(
    0,
    0,
    createValueContent(value)
);
```

For pointer dragging, use:

```typescript
dragMove
```

or:

```typescript
dragEnd
```

### Dynamic Content Without Refresh or Public Method

Incorrect:

```typescript
gauge.axes[0]
    .annotations[0]
    .content =
        '<div>85</div>';
```

Preferred:

```typescript
gauge.setAnnotationValue(
    0,
    0,
    '<div>85</div>'
);
```

Fallback when the method is unavailable:

```typescript
gauge.axes[0]
    .annotations[0]
    .content =
        '<div>85</div>';

gauge.refresh();
```

### Annotation Position Assumptions

Avoid treating angle values as fixed screen directions without validating the actual gauge.

The final rendered position depends on:

```text
Axis direction
Axis start angle
Axis end angle
Axis radius
Gauge center
Annotation radius
Gauge dimensions
```

### Multiple Annotation Overlap

Incorrect:

```typescript
annotations: [
    {
        angle: 180,
        radius: '35%'
    },
    {
        angle: 180,
        radius: '35%'
    }
]
```

Preferred:

```typescript
annotations: [
    {
        angle: 180,
        radius: '30%'
    },
    {
        angle: 180,
        radius: '50%'
    }
]
```

Or vary the angle:

```typescript
annotations: [
    {
        angle: 160,
        radius: '35%'
    },
    {
        angle: 200,
        radius: '35%'
    }
]
```

### Image Annotation Without Dimensions

Avoid:

```typescript
content:
    'images/icon.png'
```

Prefer:

```typescript
content:
    'images/icon.png'
```

### Untrusted HTML Content

Do not insert unsanitized user input into an annotation HTML string.

Unsafe:

```typescript
content:
    '<div>' +
    userProvidedText +
    '</div>'
```

Use trusted text, sanitize the input, or set text through a safe DOM operation before using the template.

### Missing Accessibility Description

Avoid using a visual-only annotation for important data.

Add:

```typescript
description:
    'Current speed is 65 kilometers per hour'
```

Also consider a visible or screen-reader-accessible text summary outside the gauge.

### Annotation Export Assumption

Do not assume that arbitrary HTML annotations always appear in every exported format.

Test:

```text
PNG
JPEG
SVG
PDF
Print
```

Pay special attention to:

```text
External images
Custom fonts
CSS classes
HTML templates
SVG foreignObject compatibility
```

### Constructor Selector Pattern

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

### Missing Host Element

Required HTML:

```html
<div id="gauge"></div>
```

Required attachment:

```typescript
gauge.appendTo('#gauge');
```

The host ID and selector must match exactly.

### Editor-Generated Markup

Do not place the following inside executable TypeScript, JavaScript, HTML, CSS, templates, imports, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```