# Events & Interactions

- #overview
- #event-registration
- #mouse-events
  - #gauge-mouse-move
  - #gauge-mouse-click
  - #gauge-mouse-leave
- #pointer-drag-events
  - #enable-pointer-dragging
  - #drag-start
  - #drag-move
  - #drag-end
- #range-drag-events
- #tooltip-configuration
  - #required-tooltip-module
  - #pointer-tooltip
  - #range-tooltip
  - #annotation-tooltip
  - #tooltip-format
  - #tooltip-template
  - #tooltip-styling
  - #tooltip-render-event
- #legend-configuration
  - #required-legend-module
  - #range-names
  - #legend-position-and-alignment
  - #legend-styling
  - #legend-events
- #animation-events
- #programmatic-value-updates
- #live-data-updates
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Overview

The Circular Gauge provides events and interaction features for responding to:

```text
Gauge loading and rendering
Pointer movement
Pointer clicks
Pointer dragging
Range dragging
Pointer animation
Tooltip rendering
Legend rendering
Legend interaction
Axis-label rendering
Range rendering
Pointer rendering
Annotation rendering
Window resizing
Printing and exporting
```

Use events only when standard properties cannot provide the required behavior.

```text
Use a property:
When the same behavior applies to every gauge element.

Use an event:
When behavior must change according to the current pointer, range,
value, target element, or application state.
```

Example:

```text
Use pointer.color:
All pointer instances use the configured color.

Use axisLabelRender:
Label text or style changes conditionally according to its value.
```

## Event Registration

Register events inside the `CircularGauge` constructor configuration.

Preferred TypeScript pattern:

```typescript
import {
    CircularGauge,
    GaugeMouseEventArgs
} from '@syncfusion/ej2-circulargauge';

const gauge: CircularGauge =
    new CircularGauge({
        gaugeMouseClick: (
            args: GaugeMouseEventArgs
        ): void => {
            console.log(args);
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Preferred JavaScript pattern:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        gaugeMouseClick: function (args) {
            console.log(args);
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Registering events in the constructor ensures that the handlers are available during the component lifecycle.

## Mouse Events

### Gauge Mouse Move

Use `gaugeMouseMove` to respond when the pointer moves over the gauge area.

TypeScript:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        gaugeMouseMove: (args): void => {
            console.log(
                'Mouse target:',
                args.target
            );
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

JavaScript:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        gaugeMouseMove: function (args) {
            console.log(
                'Mouse target:',
                args.target
            );
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use this event for lightweight pointer-location behavior.

Avoid expensive processing inside `gaugeMouseMove` because it can fire repeatedly while the pointer moves.

Do not assume that the event always includes:

```text
args.x
args.y
args.value
```

Read only properties exposed by the installed event argument type. Use the corresponding pointer, range, drag, or tooltip event when a resolved gauge value is required.

### Gauge Mouse Click

Use `gaugeMouseClick` to respond when users select an element inside the gauge.

TypeScript:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        gaugeMouseClick: (args): void => {
            console.log(
                'Clicked target:',
                args.target
            );
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

JavaScript:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        gaugeMouseClick: function (args) {
            console.log(
                'Clicked target:',
                args.target
            );
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use `gaugeMouseClick` for:

- Opening a details panel.
- Recording interaction telemetry.
- Identifying the selected gauge element.
- Running an application command.
- Displaying additional information.

Do not assume that `args.value` is always available for every clicked target. A title, axis line, label, range, pointer, or empty gauge area can produce different event context.

### Gauge Mouse Leave

Use `gaugeMouseLeave` when the pointer leaves the gauge.

TypeScript:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        gaugeMouseLeave: (): void => {
            console.log(
                'Pointer left the gauge.'
            );
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

JavaScript:

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        gaugeMouseLeave: function () {
            console.log(
                'Pointer left the gauge.'
            );
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use `gaugeMouseLeave` to:

- Clear temporary status text.
- Remove an external hover indicator.
- Reset application-level hover state.
- Close custom content that is not managed by the built-in tooltip.

## Pointer Drag Events

### Enable Pointer Dragging

Set `enablePointerDrag` to `true`.

```typescript
enablePointerDrag: true
```

The Circular Gauge model provides `enablePointerDrag` for pointer dragging.

Complete configuration:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 50,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use pointer dragging when users are allowed to provide or adjust a numeric value directly on the gauge.

Do not enable dragging when the gauge is display-only.

### Drag Start

Use `dragStart` when pointer dragging begins.

```typescript
dragStart: (args): void => {
    console.log(
        'Starting value:',
        args.currentValue
    );
}
```

Use cases:

- Store the original value.
- Display drag instructions.
- Begin an undo transaction.
- Validate whether dragging is permitted.
- Record interaction telemetry.

### Drag Move

Use `dragMove` while the pointer is being dragged.

```typescript
dragMove: (args): void => {
    console.log(
        'Current value:',
        args.currentValue
    );
}
```

Use `dragMove` for visual feedback that must be updated continuously.

Avoid expensive API calls in `dragMove`. Save business data after dragging completes unless continuous synchronization is explicitly required.

### Drag End

Use `dragEnd` when dragging finishes.

```typescript
dragEnd: (args): void => {
    console.log(
        'Final value:',
        args.currentValue
    );
}
```

Use `dragEnd` to:

- Save the final value.
- Validate the final selection.
- Update another component.
- Submit the value to an application service.
- Display a completion message.

### Complete Pointer Dragging Example

#### TypeScript

```typescript
import {
    CircularGauge,
    PointerDragEventArgs
} from '@syncfusion/ej2-circulargauge';

const output: HTMLElement | null =
    document.getElementById('output');

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            pointers: [{
                value: 50,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 9,
                    color: '#0066cc'
                }
            }]
        }],

        dragStart: (
            args: PointerDragEventArgs
        ): void => {
            if (output) {
                output.textContent =
                    'Drag started at ' +
                    args.currentValue.toFixed(1);
            }
        },

        dragMove: (
            args: PointerDragEventArgs
        ): void => {
            if (output) {
                output.textContent =
                    'Current value: ' +
                    args.currentValue.toFixed(1);
            }
        },

        dragEnd: (
            args: PointerDragEventArgs
        ): void => {
            if (output) {
                output.textContent =
                    'Final value: ' +
                    args.currentValue.toFixed(1);
            }
        }
    });

gauge.appendTo('#gauge');
```

Required HTML:

```html
<div id="gauge"></div>
<p id="output" aria-live="polite">
    Current value: 50
</p>
```

#### JavaScript

```javascript
var output =
    document.getElementById('output');

var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        enablePointerDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,

            pointers: [{
                value: 50,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 9,
                    color: '#0066cc'
                }
            }]
        }],

        dragStart: function (args) {
            if (output) {
                output.textContent =
                    'Drag started at ' +
                    args.currentValue.toFixed(1);
            }
        },

        dragMove: function (args) {
            if (output) {
                output.textContent =
                    'Current value: ' +
                    args.currentValue.toFixed(1);
            }
        },

        dragEnd: function (args) {
            if (output) {
                output.textContent =
                    'Final value: ' +
                    args.currentValue.toFixed(1);
            }
        }
    });

gauge.appendTo('#gauge');
```

## Range Drag Events

Set `enableRangeDrag` to `true` when users must adjust gauge ranges interactively.

```typescript
enableRangeDrag: true
```

The Circular Gauge model exposes `enableRangeDrag` separately from `enablePointerDrag`.

Example:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        enableRangeDrag: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            ranges: [{
                start: 20,
                end: 60,
                color: '#0066cc',
                startWidth: 12,
                endWidth: 12
            }],

            pointers: [{
                value: 50
            }]
        }],

        dragMove: (args): void => {
            console.log(args);
        },

        dragEnd: (args): void => {
            console.log(args);
        }
    });

gauge.appendTo('#gauge');
```

Use range dragging only when ranges represent editable values. Do not enable it for fixed status bands such as normal, warning, and critical thresholds unless users are authorized to modify those thresholds.

## Tooltip Configuration

### Required Tooltip Module

The correct TypeScript feature module is `GaugeTooltip`.

```typescript
import {
    CircularGauge,
    GaugeTooltip
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(GaugeTooltip);
```

Do not import a generic `Tooltip` module for this feature.

Incorrect:

```typescript
import {
    Tooltip
} from '@syncfusion/ej2-circulargauge';
```

Correct:

```typescript
import {
    GaugeTooltip
} from '@syncfusion/ej2-circulargauge';
```

The official interaction documentation requires `GaugeTooltip` injection before using Circular Gauge tooltips.

### Pointer Tooltip

Enable the tooltip and specify the `Pointer` type.

```typescript
tooltip: {
    enable: true,
    type: ['Pointer']
}
```

Complete TypeScript example:

```typescript
import {
    CircularGauge,
    GaugeTooltip
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(GaugeTooltip);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',

        tooltip: {
            enable: true,
            type: ['Pointer'],
            format: 'Speed: ${value} km/h'
        },

        axes: [{
            minimum: 0,
            maximum: 120,

            pointers: [{
                value: 65,
                type: 'Needle'
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

        tooltip: {
            enable: true,
            type: ['Pointer'],
            format: 'Speed: ${value} km/h'
        },

        axes: [{
            minimum: 0,
            maximum: 120,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Range Tooltip

Include `Range` in the tooltip `type` collection.

```typescript
tooltip: {
    enable: true,
    type: ['Range']
}
```

Customize range tooltips through `rangeSettings`.

```typescript
tooltip: {
    enable: true,
    type: ['Range'],

    rangeSettings: {
        fill: '#252423',
        format:
            'Range: ${start} - ${end}',

        border: {
            width: 1,
            color: '#ffffff'
        },

        textStyle: {
            fontFamily: 'Segoe UI',
            size: '12px',
            color: '#ffffff'
        }
    }
}
```

Range tooltip options are configured through `rangeSettings`, including fill, text style, format, template, animation, border, and pointer-position behavior.

### Annotation Tooltip

Include `Annotation` in the type collection.

```typescript
tooltip: {
    enable: true,
    type: ['Annotation']
}
```

Customize annotation tooltips through `annotationSettings`.

```typescript
tooltip: {
    enable: true,
    type: ['Annotation'],

    annotationSettings: {
        fill: '#252423',
        format: 'Current gauge status',

        border: {
            width: 1,
            color: '#ffffff'
        },

        textStyle: {
            fontFamily: 'Segoe UI',
            size: '12px',
            color: '#ffffff'
        }
    }
}
```

Annotation tooltip behavior requires an annotation and therefore also requires the `Annotations` feature module in TypeScript.

```typescript
import {
    CircularGauge,
    GaugeTooltip,
    Annotations
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    GaugeTooltip,
    Annotations
);
```

### Multiple Tooltip Types

```typescript
tooltip: {
    enable: true,
    type: [
        'Pointer',
        'Range',
        'Annotation'
    ]
}
```

Only include `Annotation` when annotations are configured.

### Tooltip Format

Use `${value}` to display the pointer value.

```typescript
tooltip: {
    enable: true,
    format: 'Speed: ${value} km/h'
}
```

The Circular Gauge tooltip API documents `${value}` as the pointer-value placeholder.

### Tooltip Template

Use `template` for custom HTML content.

```typescript
tooltip: {
    enable: true,
    type: ['Pointer'],

    template:
        '<div class="gauge-tooltip">' +
        '<span>Speed: ${value} km/h</span>' +
        '</div>'
}
```

Required CSS:

```css
.gauge-tooltip {
    padding: 6px 8px;
    color: #ffffff;
    background: #252423;
    border-radius: 4px;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
}
```

Do not encode executable template tags.

Incorrect:

```typescript
template:
    '<div>${value}</div>'
```

Correct:

```typescript
template:
    '<div>${value}</div>'
```

### Tooltip Styling

Use `border`, not `borderColor` and `borderWidth`.

Incorrect:

```typescript
tooltip: {
    fill: '#ffffff',
    borderColor: '#333333',
    borderWidth: 1
}
```

Correct:

```typescript
tooltip: {
    enable: true,
    fill: '#ffffff',

    border: {
        width: 1,
        color: '#333333'
    },

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#333333'
    }
}
```

The tooltip settings model contains `border`, `fill`, `format`, `template`, `textStyle`, and `enableAnimation`.

### Tooltip Position

Use `showAtMousePosition` to display the pointer tooltip near the mouse position.

```typescript
tooltip: {
    enable: true,
    type: ['Pointer'],
    showAtMousePosition: true
}
```

The default value is `false`, which displays the tooltip over the axis line.

Do not use an unsupported general property such as:

```typescript
showNearestPointer: true
```

### Tooltip Render Event

Use `tooltipRender` to customize tooltip content before it is displayed.

```typescript
import {
    CircularGauge,
    GaugeTooltip,
    ITooltipRenderEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(GaugeTooltip);

const gauge: CircularGauge =
    new CircularGauge({
        tooltip: {
            enable: true,
            type: ['Pointer']
        },

        tooltipRender: (
            args: ITooltipRenderEventArgs
        ): void => {
            if (
                args.pointer &&
                args.pointer.value !== undefined
            ) {
                args.content =
                    'Current value: ' +
                    args.pointer.value;
            }
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

The tooltip-render event arguments include the gauge, axis, pointer, range, annotation, content, location, element type, and cancel state.

Use `args.cancel = true` to prevent the selected tooltip from rendering when a validated application rule requires it.

## Legend Configuration

### Purpose

The Circular Gauge legend represents axis ranges. It does not create legend items for pointers by default.

The legend is hidden by default. Enable it through `legendSettings.visible`.

### Required Legend Module

TypeScript applications must import and inject `Legend`.

```typescript
import {
    CircularGauge,
    Legend
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Legend);
```

### Basic Legend

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

Complete TypeScript example:

```typescript
import {
    CircularGauge,
    Legend
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Legend);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '500px',

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        axes: [{
            minimum: 0,
            maximum: 100,

            ranges: [
                {
                    start: 0,
                    end: 40,
                    legendText: 'Normal',
                    color: '#107c10'
                },
                {
                    start: 40,
                    end: 70,
                    legendText: 'Moderate',
                    color: '#ffb900'
                },
                {
                    start: 70,
                    end: 100,
                    legendText: 'Critical',
                    color: '#d13438'
                }
            ],

            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Range Names

Use the range `legendText` property for legend content.

```typescript
ranges: [{
    start: 0,
    end: 40,
    legendText: 'Normal',
    color: '#107c10'
}]
```

Do not rely on a generic `name` property for range legend text.

Incorrect:

```typescript
ranges: [{
    start: 0,
    end: 40,
    name: 'Normal'
}]
```

Correct:

```typescript
ranges: [{
    start: 0,
    end: 40,
    legendText: 'Normal'
}]
```

### Legend Position and Alignment

Supported positions include:

```text
Top
Bottom
Left
Right
Custom
Auto
```

Supported alignments include:

```text
Near
Center
Far
```

These position and alignment values are documented for the EJ2 Circular Gauge legend.

Example:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center'
}
```

Custom location:

```typescript
legendSettings: {
    visible: true,
    position: 'Custom',

    location: {
        x: 100,
        y: 400
    }
}
```

### Legend Dimensions

```typescript
legendSettings: {
    visible: true,
    width: '100%',
    height: '60px'
}
```

Use custom dimensions when:

- Range labels are long.
- Several ranges are displayed.
- A fixed dashboard layout is required.
- Legend items must wrap.

### Legend Styling

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    background: '#f5f5f5',
    opacity: 1,
    shape: 'Circle',
    shapeWidth: 12,
    shapeHeight: 12,
    padding: 8,

    border: {
        width: 1,
        color: '#dddddd'
    },

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#333333'
    }
}
```

The legend supports position, alignment, custom location, dimensions, opacity, shape, shape size, padding, border, and text styling.

Do not add `toggleVisibility` unless the installed Circular Gauge legend model explicitly supports it. The standard legend documentation focuses on range representation and visual customization.

### Legend Events

Use `legendRender` to customize legend items before they are displayed.

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        legendSettings: {
            visible: true
        },

        legendRender: (args): void => {
            console.log(
                'Legend item:',
                args.text
            );
        },

        axes: [{
            ranges: [{
                start: 0,
                end: 40,
                legendText: 'Normal',
                color: '#107c10'
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Use `legendRender` for:

- Localization.
- Conditional legend text.
- Hiding selected legend items.
- Applying validated legend customization.
- Adding business terminology.

## Animation Events

### Pointer Animation

Configure pointer animation through the pointer `animation` object.

```typescript
pointers: [{
    value: 65,
    type: 'Needle',

    animation: {
        enable: true,
        duration: 800
    }
}]
```

### Animation Complete

Use `animationComplete` after pointer animation finishes.

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        animationComplete: (args): void => {
            console.log(
                'Pointer animation completed.',
                args
            );
        },

        axes: [{
            pointers: [{
                value: 65,

                animation: {
                    enable: true,
                    duration: 800
                }
            }]
        }]
    });

gauge.appendTo('#gauge');
```

The `animationComplete` event is triggered after pointer animation finishes.

Do not assume that `args.pointerIndex` exists without validating the current event argument interface.

## Programmatic Value Updates

### setPointerValue

Use `setPointerValue` to change a pointer value without rebuilding the gauge.

```typescript
gauge.setPointerValue(
    0,
    0,
    85
);
```

Parameters:

```text
First parameter  -> Axis index.
Second parameter -> Pointer index.
Third parameter  -> New pointer value.
```

### Safe Value Update

Validate the value before applying it.

```typescript
const clamp = (
    value: number,
    minimum: number,
    maximum: number
): number => {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
};

const requestedValue: number = 85;

const safeValue: number =
    clamp(
        requestedValue,
        0,
        100
    );

gauge.setPointerValue(
    0,
    0,
    safeValue
);
```

### Delayed Update

```typescript
window.setTimeout(
    (): void => {
        gauge.setPointerValue(
            0,
            0,
            75
        );
    },
    2000
);
```

JavaScript:

```javascript
window.setTimeout(
    function () {
        gauge.setPointerValue(
            0,
            0,
            75
        );
    },
    2000
);
```

### Update Button

Required HTML:

```html
<button id="updateButton" type="button">
    Update Value
</button>

<div id="gauge"></div>
```

TypeScript:

```typescript
const updateButton: HTMLElement | null =
    document.getElementById(
        'updateButton'
    );

if (updateButton) {
    updateButton.addEventListener(
        'click',
        (): void => {
            const newValue: number =
                Math.random() * 100;

            gauge.setPointerValue(
                0,
                0,
                newValue
            );
        }
    );
}
```

## Live Data Updates

Use a timer only when the application genuinely requires periodic updates.

```typescript
const updateInterval: number =
    window.setInterval(
        (): void => {
            const newValue: number =
                40 + Math.random() * 20;

            gauge.setPointerValue(
                0,
                0,
                newValue
            );
        },
        2000
    );
```

Stop the timer when the gauge is no longer needed.

```typescript
window.clearInterval(
    updateInterval
);
```

Do not start an unmanaged interval in a single-page application. Clear it when the page, component, or view is destroyed.

## Complete TypeScript Example

### Required HTML

```html
<div class="gauge-actions">
    <button id="updateButton" type="button">
        Generate Value
    </button>
</div>

<div id="gauge"></div>

<p id="status" aria-live="polite">
    Current value: 65
</p>
```

### Required CSS

```css
.gauge-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
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

.gauge-tooltip {
    padding: 6px 8px;
    color: #ffffff;
    background: #252423;
    border-radius: 4px;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
}
```

### TypeScript

```typescript
import {
    CircularGauge,
    GaugeTooltip,
    Legend,
    PointerDragEventArgs,
    ITooltipRenderEventArgs
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    GaugeTooltip,
    Legend
);

const statusElement: HTMLElement | null =
    document.getElementById('status');

const setStatus = (
    message: string
): void => {
    if (statusElement) {
        statusElement.textContent =
            message;
    }
};

const clamp = (
    value: number,
    minimum: number,
    maximum: number
): number => {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
};

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Performance Gauge',
        enablePointerDrag: true,

        tooltip: {
            enable: true,
            type: [
                'Pointer',
                'Range'
            ],
            fill: '#252423',
            showAtMousePosition: true,
            enableAnimation: true,

            border: {
                width: 1,
                color: '#ffffff'
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#ffffff'
            },

            rangeSettings: {
                fill: '#252423',
                enableAnimation: true,

                border: {
                    width: 1,
                    color: '#ffffff'
                },

                textStyle: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#ffffff'
                }
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            alignment: 'Center',
            background: '#f5f5f5',
            shape: 'Circle',
            shapeWidth: 12,
            shapeHeight: 12,
            padding: 8,

            border: {
                width: 1,
                color: '#dddddd'
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '88%',

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

                font: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    legendText: 'Normal',
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 40,
                    end: 70,
                    legendText: 'Moderate',
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    legendText: 'Critical',
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
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
                    duration: 800
                }
            }]
        }],

        dragStart: (
            args: PointerDragEventArgs
        ): void => {
            setStatus(
                'Drag started at ' +
                args.currentValue.toFixed(1)
            );
        },

        dragMove: (
            args: PointerDragEventArgs
        ): void => {
            setStatus(
                'Current value: ' +
                args.currentValue.toFixed(1)
            );
        },

        dragEnd: (
            args: PointerDragEventArgs
        ): void => {
            setStatus(
                'Final value: ' +
                args.currentValue.toFixed(1)
            );
        },

        gaugeMouseClick: (args): void => {
            console.log(
                'Clicked target:',
                args.target
            );
        },

        gaugeMouseLeave: (): void => {
            console.log(
                'Pointer left the gauge.'
            );
        },

        tooltipRender: (
            args: ITooltipRenderEventArgs
        ): void => {
            if (
                args.type === 'Pointer' &&
                args.pointer &&
                args.pointer.value !==
                    undefined
            ) {
                args.content =
                    'Current value: ' +
                    Number(
                        args.pointer.value
                    ).toFixed(1);
            }
        },

        animationComplete: (): void => {
            console.log(
                'Pointer animation completed.'
            );
        }
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
            const requestedValue: number =
                Math.random() * 100;

            const safeValue: number =
                clamp(
                    requestedValue,
                    0,
                    100
                );

            gauge.setPointerValue(
                0,
                0,
                safeValue
            );

            setStatus(
                'Current value: ' +
                safeValue.toFixed(1)
            );
        }
    );
}
```

## Complete JavaScript Example

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .gauge-actions {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
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
    </style>
</head>
<body>
    <div class="gauge-actions">
        <button id="updateButton" type="button">
            Generate Value
        </button>
    </div>

    <div id="gauge"></div>

    <p id="status" aria-live="polite">
        Current value: 65
    </p>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var statusElement =
    document.getElementById('status');

function setStatus(message) {
    if (statusElement) {
        statusElement.textContent =
            message;
    }
}

function clamp(
    value,
    minimum,
    maximum
) {
    return Math.min(
        maximum,
        Math.max(minimum, value)
    );
}

var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '500px',
        title: 'Performance Gauge',
        enablePointerDrag: true,

        tooltip: {
            enable: true,
            type: [
                'Pointer',
                'Range'
            ],
            fill: '#252423',
            showAtMousePosition: true,
            enableAnimation: true,

            border: {
                width: 1,
                color: '#ffffff'
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#ffffff'
            },

            rangeSettings: {
                fill: '#252423',
                enableAnimation: true,

                border: {
                    width: 1,
                    color: '#ffffff'
                },

                textStyle: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#ffffff'
                }
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            alignment: 'Center',
            background: '#f5f5f5',
            shape: 'Circle',
            shapeWidth: 12,
            shapeHeight: 12,
            padding: 8,

            border: {
                width: 1,
                color: '#dddddd'
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '88%',

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

                font: {
                    fontFamily: 'Segoe UI',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    legendText: 'Normal',
                    color: '#107c10',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 40,
                    end: 70,
                    legendText: 'Moderate',
                    color: '#ffb900',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
                },
                {
                    start: 70,
                    end: 100,
                    legendText: 'Critical',
                    color: '#d13438',
                    radius: '95%',
                    startWidth: 10,
                    endWidth: 10
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
                    duration: 800
                }
            }]
        }],

        dragStart: function (args) {
            setStatus(
                'Drag started at ' +
                args.currentValue.toFixed(1)
            );
        },

        dragMove: function (args) {
            setStatus(
                'Current value: ' +
                args.currentValue.toFixed(1)
            );
        },

        dragEnd: function (args) {
            setStatus(
                'Final value: ' +
                args.currentValue.toFixed(1)
            );
        },

        gaugeMouseClick: function (args) {
            console.log(
                'Clicked target:',
                args.target
            );
        },

        gaugeMouseLeave: function () {
            console.log(
                'Pointer left the gauge.'
            );
        },

        tooltipRender: function (args) {
            if (
                args.type === 'Pointer' &&
                args.pointer &&
                args.pointer.value !==
                    undefined
            ) {
                args.content =
                    'Current value: ' +
                    Number(
                        args.pointer.value
                    ).toFixed(1);
            }
        },

        animationComplete: function () {
            console.log(
                'Pointer animation completed.'
            );
        }
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
            var requestedValue =
                Math.random() * 100;

            var safeValue =
                clamp(
                    requestedValue,
                    0,
                    100
                );

            gauge.setPointerValue(
                0,
                0,
                safeValue
            );

            setStatus(
                'Current value: ' +
                safeValue.toFixed(1)
            );
        }
    );
}
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ GaugeTooltip is imported and injected when tooltips are enabled.
✅ Legend is imported and injected when the legend is visible.
✅ Annotations is imported and injected when annotation tooltips are used.
✅ The global EJ2 script loads before JavaScript application code.
✅ The gauge host element exists.
✅ gauge.appendTo('#gauge') is called.
✅ Events are registered in the CircularGauge constructor.
✅ gaugeMouseMove is used instead of mouseMove.
✅ gaugeMouseLeave is used instead of mouseLeave.
✅ gaugeMouseClick does not assume every target has a numeric value.
✅ enablePointerDrag is true when pointer dragging is required.
✅ enableRangeDrag is true when range dragging is required.
✅ dragStart, dragMove, and dragEnd use validated event arguments.
✅ Expensive operations are avoided during dragMove and gaugeMouseMove.
✅ Tooltip type uses Pointer, Range, or Annotation.
✅ Tooltip styling uses the border object.
✅ showAtMousePosition is used for mouse-positioned pointer tooltips.
✅ Range tooltip styling is configured through rangeSettings.
✅ Annotation tooltip styling is configured through annotationSettings.
✅ Tooltip templates contain executable HTML.
✅ Tooltip placeholders are valid for the selected tooltip type.
✅ Range legend content uses legendText.
✅ Legend position and alignment use supported values.
✅ Programmatic pointer updates use setPointerValue.
✅ Axis and pointer indexes are valid.
✅ New pointer values are within the axis range.
✅ Live-update timers are cleared when no longer needed.
✅ Native buttons are used for application actions.
✅ Dynamic status output uses an accessible live region when appropriate.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Tooltip Module

Incorrect:

```typescript
import {
    CircularGauge,
    Tooltip
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Tooltip);
```

Correct:

```typescript
import {
    CircularGauge,
    GaugeTooltip
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    GaugeTooltip
);
```

The Circular Gauge interaction documentation identifies `GaugeTooltip` as the required tooltip feature module.

### Incorrect Mouse Event Names

Avoid:

```typescript
gauge.mouseMove = (args) => {
    console.log(args);
};

gauge.mouseLeave = () => {
    console.log('Left');
};
```

Use:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        gaugeMouseMove: (args): void => {
            console.log(args);
        },

        gaugeMouseLeave: (): void => {
            console.log('Left');
        }
    });
```

### Assigning Events After Rendering

Avoid relying on:

```typescript
gauge.gaugeMouseClick = (args) => {
    console.log(args);
};
```

after initialization when configuration-time registration is available.

Preferred:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        gaugeMouseClick: (args): void => {
            console.log(args);
        }
    });

gauge.appendTo('#gauge');
```

### Incorrect Tooltip Border

Incorrect:

```typescript
tooltip: {
    borderColor: '#333333',
    borderWidth: 1
}
```

Correct:

```typescript
tooltip: {
    border: {
        width: 1,
        color: '#333333'
    }
}
```

The tooltip model exposes a nested `border` property.

### Unsupported Nearest-Pointer Property

Avoid:

```typescript
tooltip: {
    showNearestPointer: true
}
```

Use the validated Circular Gauge tooltip properties, such as:

```typescript
tooltip: {
    enable: true,
    showAtMousePosition: true
}
```

### Encoded Tooltip Template

Incorrect:

```typescript
template:
    '<div>${value}</div>'
```

Correct:

```typescript
template:
    '<div>${value}</div>'
```

### Incorrect Legend Text Property

Incorrect:

```typescript
ranges: [{
    start: 0,
    end: 40,
    name: 'Normal'
}]
```

Correct:

```typescript
ranges: [{
    start: 0,
    end: 40,
    legendText: 'Normal'
}]
```

### Unverified Legend Toggle Property

Avoid:

```typescript
legendSettings: {
    toggleVisibility: true
}
```

unless the installed Circular Gauge legend model explicitly exposes and validates that property.

### Unsupported Value Change Event

Avoid:

```typescript
gauge.valueChange = (args) => {
    console.log(args.value);
};
```

For pointer dragging, use:

```typescript
dragStart
dragMove
dragEnd
```

For programmatic changes, update application state when calling:

```typescript
gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    value
);
```

### Unsafe Click Value Assumption

Avoid:

```typescript
gaugeMouseClick: (args) => {
    console.log(
        args.value.toFixed(2)
    );
}
```

Not every target guarantees a numeric `value`.

Use:

```typescript
gaugeMouseClick: (args) => {
    console.log(
        'Clicked target:',
        args.target
    );
}
```

### Unsafe Animation Arguments

Avoid:

```typescript
animationComplete: (args) => {
    console.log(args.pointerIndex);
}
```

unless the current event argument type explicitly contains `pointerIndex`.

Safe:

```typescript
animationComplete: (args) => {
    console.log(
        'Animation completed.',
        args
    );
}
```

### Missing Tooltip Injection

Incorrect:

```typescript
const gauge =
    new CircularGauge({
        tooltip: {
            enable: true
        }
    });
```

Correct:

```typescript
import {
    CircularGauge,
    GaugeTooltip
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    GaugeTooltip
);
```

### Missing Legend Injection

Incorrect:

```typescript
const gauge =
    new CircularGauge({
        legendSettings: {
            visible: true
        }
    });
```

Correct:

```typescript
import {
    CircularGauge,
    Legend
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Legend
);
```

### Invalid Pointer Update Index

Incorrect:

```typescript
gauge.setPointerValue(
    3,
    5,
    85
);
```

when the gauge only contains one axis and one pointer.

Correct:

```typescript
gauge.setPointerValue(
    0,
    0,
    85
);
```

### Out-of-Range Pointer Update

Incorrect:

```typescript
gauge.setPointerValue(
    0,
    0,
    150
);
```

when the axis maximum is `100`.

Preferred:

```typescript
const safeValue: number =
    Math.min(
        100,
        Math.max(0, requestedValue)
    );

gauge.setPointerValue(
    0,
    0,
    safeValue
);
```

### Unmanaged Live-Update Timer

Avoid starting an interval without retaining its ID.

Incorrect:

```typescript
setInterval(() => {
    gauge.setPointerValue(
        0,
        0,
        Math.random() * 100
    );
}, 2000);
```

Preferred:

```typescript
const intervalId: number =
    window.setInterval(
        (): void => {
            gauge.setPointerValue(
                0,
                0,
                Math.random() * 100
            );
        },
        2000
    );

window.clearInterval(
    intervalId
);
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

### Editor-Generated Markup

Do not place the following inside executable TypeScript, JavaScript, HTML, templates, imports, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```