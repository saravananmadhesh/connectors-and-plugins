# Getting Started with Linear Gauge in TypeScript and JavaScript

This guide explains how to install, configure, and render the Syncfusion Essential JS 2 Linear Gauge in framework-neutral TypeScript and JavaScript applications.

It covers:

- npm installation.
- Standard versioned CDN setup.
- Local script setup.
- Gauge dimensions and orientation.
- Containers and axes.
- Ranges and pointers.
- Pointer dragging.
- Labels and tooltips.
- Complete TypeScript and JavaScript examples.
- Validation, accessibility, cleanup, and troubleshooting.

- #prerequisites
- #installation
  - #install-with-npm
  - #register-the-syncfusion-license
  - #add-the-gauge-container
- #typescript-setup
- #javascript-setup
  - #standard-combined-cdn
  - #individual-package-cdn-scripts
  - #local-script-setup
- #component-structure
- #gauge-configuration
- #orientation
- #container-configuration
- #axes-configuration
- #ranges
- #pointers
  - #bar-pointer
  - #marker-pointer
  - #image-pointer
  - #text-pointer
  - #draggable-pointer
- #labels
- #tooltips
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Prerequisites

For TypeScript development, install:

- Node.js and npm.
- A modern browser.
- A code editor.
- A TypeScript-compatible build process or bundler.

For global JavaScript development, use:

- A modern browser.
- A versioned EJ2 global script.
- A local HTTP server when the application loads external data or assets.

Keep all installed Syncfusion package versions compatible to avoid duplicate dependency versions or runtime conflicts.

## Installation

## Install with npm

Install the focused Linear Gauge package:

```bash
npm install @syncfusion/ej2-lineargauge
```

Import the `LinearGauge` class:

```typescript
import {
    LinearGauge
} from '@syncfusion/ej2-lineargauge';
```

Create the gauge:

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        axes: [
            {
                minimum: 0,
                maximum: 100
            }
        ]
    });
```

Append it to an HTML element:

```typescript
gauge.appendTo(
    '#gauge-container'
);
```

The constructor can also receive the target selector:

```typescript
const gauge: LinearGauge =
    new LinearGauge(
        {
            axes: [
                {
                    minimum: 0,
                    maximum: 100
                }
            ]
        },
        '#gauge-container'
    );
```

This guide uses an explicit `appendTo()` call because it makes host validation and initialization order clearer.

Do not install the Angular wrapper for a framework-neutral TypeScript application.

```bash
# Not required for framework-neutral TypeScript
npm install @syncfusion/ej2-angular-lineargauge
```

## Register the Syncfusion License

Register an applicable Syncfusion license key before initializing the component when required by the selected license and deployment.

```typescript
import {
    registerLicense
} from '@syncfusion/ej2-base';

registerLicense(
    'YOUR_SYNCFUSION_LICENSE_KEY'
);
```

Do not commit a private license key to a public repository.

Use an application configuration mechanism appropriate for the selected build system.

## Add the Gauge Container

Add a host element:

```html
<div id="gauge-container"></div>
```

Give the host measurable dimensions:

```css
#gauge-container {
    display: block;
    width: 100%;
    min-height: 400px;
}
```

You can also configure the component dimensions:

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        width: '100%',
        height: '400px'
    });
```

Percentage dimensions depend on the dimensions of the parent element.

Avoid:

```css
#gauge-container {
    height: 100%;
}
```

unless the parent and all relevant ancestors have definite computed heights.

## TypeScript Setup

### index.html

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Essential JS 2 Linear Gauge</title>

    ./styles.css
</head>

<body>
    <main class="page-container">
        <section
            class="gauge-card"
            aria-labelledby="gauge-heading"
            aria-describedby="gauge-description"
        >
            <h1 id="gauge-heading">
                System Health
            </h1>

            <p id="gauge-description">
                The gauge displays the current system-health
                percentage from 0 to 100.
            </p>

            <div id="gauge-container"></div>

            <p
                id="gauge-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the Linear Gauge.
            </p>
        </section>
    </main>

    ./<script scr="index.js"></script>
</body>
</html>
```

The TypeScript source must be compiled into `index.js` by the selected TypeScript build process or bundler.

### styles.css

```css
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    color: #111827;
    background: #f8fafc;
    font-family:
        Arial,
        Helvetica,
        sans-serif;
}

.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
}

.gauge-card {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

.gauge-card h1 {
    margin: 0 0 8px;
    font-size: 24px;
}

.gauge-card > p {
    line-height: 1.5;
}

#gauge-container {
    display: block;
    width: 100%;
    min-height: 400px;
}

.status-message {
    margin: 12px 0 0;
    color: #475569;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .gauge-card {
        padding: 12px;
    }

    #gauge-container {
        min-height: 340px;
    }
}
```

### index.ts

```typescript
import {
    LinearGauge
} from '@syncfusion/ej2-lineargauge';

const host:
    HTMLElement | null =
        document.getElementById(
            'gauge-container'
        );

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'gauge-status'
        );

if (!host) {
    throw new Error(
        'The Linear Gauge host "#gauge-container" was not found.'
    );
}

const gauge: LinearGauge =
    new LinearGauge({
        orientation: 'Horizontal',
        width: '100%',
        height: '400px',

        axes: [
            {
                minimum: 0,
                maximum: 100,

                ranges: [
                    {
                        start: 0,
                        end: 30,
                        color: '#dc2626',
                        startWidth: 15,
                        endWidth: 15
                    },
                    {
                        start: 30,
                        end: 70,
                        color: '#ca8a04',
                        startWidth: 15,
                        endWidth: 15
                    },
                    {
                        start: 70,
                        end: 100,
                        color: '#16a34a',
                        startWidth: 15,
                        endWidth: 15
                    }
                ],

                pointers: [
                    {
                        value: 45,
                        type: 'Marker',
                        markerType:
                            'InvertedTriangle',
                        color: '#111827',
                        height: 15,
                        width: 15
                    }
                ]
            }
        ],

        loaded: (): void => {
            if (statusElement) {
                statusElement.textContent =
                    'The Linear Gauge loaded successfully.';
            }
        }
    });

gauge.appendTo(
    host
);
```

## JavaScript Setup

The JavaScript implementation can use:

1. The standard combined EJ2 CDN bundle.
2. Individual package CDN scripts.
3. Locally hosted global scripts.
4. A custom production bundle.

Use one approach consistently.

## Standard Combined CDN

The combined bundle is the simplest getting-started option.

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.1.29/dist/ej2.min.js"></script>
```

Create the gauge through the global namespace:

```javascript
var gauge =
    new ej.lineargauge.LinearGauge({
        axes: [
            {
                minimum: 0,
                maximum: 100
            }
        ]
    });

gauge.appendTo(
    '#gauge-container'
);
```

Use a fixed and tested EJ2 version in production.

Do not use an unversioned URL that can change without an application deployment.

## Individual Package CDN Scripts

For a package-specific global setup, load the required dependencies before the Linear Gauge script.

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.1.29/ej2-base/dist/global/ej2-base.min.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.1.29/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.1.29/ej2-lineargauge/dist/global/ej2-lineargauge.min.js"></script>
```

Rules:

- Keep every script on the same EJ2 version.
- Load dependencies before `ej2-lineargauge`.
- Do not load the combined bundle and individual package scripts together.
- Add export-related dependencies only when those features require them.
- Prefer the combined bundle for the first working example.
- Consider an optimized custom bundle for production.

## Local Script Setup

Example structure:

```text
project/
|-- resources/
|   |-- scripts/
|       |-- ej2.min.js
|-- index.html
|-- index.js
```

Load the local bundle before application code:

```html
<script src="resources/scripts/ej2.min.js"></script>
./<script scr="index.js"></script>
```

Do not initialize the gauge before the EJ2 global script has loaded.

Validate the namespace:

```javascript
if (
    typeof window.ej ===
        'undefined' ||
    !window.ej.lineargauge
) {
    throw new Error(
        'The EJ2 Linear Gauge global script was not loaded.'
    );
}
```

## Component Structure

A typical Linear Gauge configuration contains:

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        orientation:
            'Horizontal',

        width:
            '100%',

        height:
            '400px',

        background:
            '#ffffff',

        border: {
            color:
                '#cbd5e1',
            width:
                1
        },

        margin: {
            left:
                20,
            right:
                20,
            top:
                20,
            bottom:
                20
        },

        container: {
            type:
                'Normal'
        },

        axes: [
            {
                minimum:
                    0,
                maximum:
                    100,
                ranges: [],
                pointers: []
            }
        ]
    });

gauge.appendTo(
    '#gauge-container'
);
```

Common gauge-level properties include:

- `orientation`
- `width`
- `height`
- `background`
- `border`
- `margin`
- `container`
- `axes`
- `annotations`
- `title`
- `titleStyle`
- `tooltip`
- `allowPrint`
- `allowImageExport`
- `allowPdfExport`

## Gauge Configuration

Use gauge-level configuration for properties that affect the complete visualization.

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        orientation:
            'Horizontal',

        width:
            '100%',

        height:
            '400px',

        background:
            '#ffffff',

        title:
            'Current System Health',

        titleStyle: {
            color:
                '#111827',
            fontFamily:
                'Arial',
            size:
                '18px',
            fontWeight:
                '700'
        },

        border: {
            color:
                '#cbd5e1',
            width:
                1
        },

        margin: {
            left:
                30,
            right:
                30,
            top:
                30,
            bottom:
                30
        },

        axes: [
            {
                minimum:
                    0,
                maximum:
                    100
            }
        ]
    });
```

## Orientation

Supported orientations are:

```text
Horizontal
Vertical
```

Horizontal:

```typescript
orientation:
    'Horizontal'
```

Vertical:

```typescript
orientation:
    'Vertical'
```

Use a horizontal gauge when:

- The layout has more width than height.
- Values should progress from left to right.
- The gauge appears in a dashboard row.

Use a vertical gauge when:

- The display resembles a thermometer.
- The gauge represents a tank or level.
- The layout has sufficient vertical space.

Choose host dimensions that match the orientation.

Horizontal:

```css
#gauge-container {
    width: 100%;
    min-height: 350px;
}
```

Vertical:

```css
#gauge-container {
    width: 100%;
    min-height: 500px;
}
```

## Container Configuration

The Linear Gauge container visually holds the axes, ranges, and pointers.

```typescript
container: {
    width: 30,
    height: 200,
    type: 'RoundedRectangle',
    backgroundColor: '#fef3c7',
    offset: 5,
    roundedCornerRadius: 8,

    border: {
        color: '#92400e',
        width: 2
    }
}
```

Common container types include:

```text
Normal
RoundedRectangle
Thermometer
```

Common properties include:

- `width`
- `height`
- `type`
- `backgroundColor`
- `offset`
- `roundedCornerRadius`
- `border`

Container dimensions are numeric:

```typescript
container: {
    width: 30,
    height: 200
}
```

Do not use CSS-size strings for numeric container properties:

```typescript
container: {
    width: '30px',
    height: '200px'
}
```

Use gauge-level `width` and `height` when CSS-size strings are required:

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        width: '100%',
        height: '400px'
    });
```

For a horizontal gauge, an explicit container `height` may not be necessary. For a vertical gauge, a container height can be useful when deliberately controlling the thermometer or rounded-rectangle body.

## Axes Configuration

The `axes` collection defines one or more numeric scales.

```typescript
axes: [
    {
        minimum: 0,
        maximum: 100,
        opposedPosition: false,
        isInversed: false,
        showLastLabel: true,

        line: {
            color: '#475569',
            width: 2,
            offset: 0
        },

        majorTicks: {
            interval: 20,
            position: 'Outside',
            color: '#334155',
            height: 10,
            width: 2,
            offset: 4
        },

        minorTicks: {
            interval: 5,
            position: 'Outside',
            color: '#64748b',
            height: 5,
            width: 1,
            offset: 4
        }
    }
]
```

Common axis properties include:

- `minimum`
- `maximum`
- `opposedPosition`
- `isInversed`
- `showLastLabel`
- `line`
- `majorTicks`
- `minorTicks`
- `labelStyle`
- `ranges`
- `pointers`

Validate that:

```text
minimum < maximum
```

Tick intervals should be finite, positive, and appropriate for the axis span.

Example validation:

```typescript
const validateAxis = (
    minimum:
        number,
    maximum:
        number,
    majorInterval:
        number,
    minorInterval:
        number
): void => {
    if (
        !Number.isFinite(
            minimum
        ) ||
        !Number.isFinite(
            maximum
        ) ||
        minimum >= maximum
    ) {
        throw new Error(
            'The axis minimum must be less than its maximum.'
        );
    }

    if (
        !Number.isFinite(
            majorInterval
        ) ||
        majorInterval <= 0
    ) {
        throw new Error(
            'The major-tick interval must be positive.'
        );
    }

    if (
        !Number.isFinite(
            minorInterval
        ) ||
        minorInterval <= 0
    ) {
        throw new Error(
            'The minor-tick interval must be positive.'
        );
    }
};
```

## Ranges

Ranges categorize sections of an axis.

```typescript
ranges: [
    {
        start: 0,
        end: 40,
        color: '#16a34a',
        position: 'Inside',
        offset: 0,
        startWidth: 18,
        endWidth: 18,

        border: {
            color: '#14532d',
            width: 1
        }
    },
    {
        start: 40,
        end: 70,
        color: '#ca8a04',
        position: 'Inside',
        startWidth: 18,
        endWidth: 18
    },
    {
        start: 70,
        end: 100,
        color: '#dc2626',
        position: 'Inside',
        startWidth: 18,
        endWidth: 18
    }
]
```

Common range properties include:

- `start`
- `end`
- `color`
- `offset`
- `startWidth`
- `endWidth`
- `position`
- `border`
- `linearGradient`
- `radialGradient`

Common positions include:

```text
Inside
Outside
Cross
Auto
```

Ranges can use different start and end widths:

```typescript
ranges: [
    {
        start:
            0,
        end:
            100,
        color:
            '#2563eb',
        startWidth:
            5,
        endWidth:
            25
    }
]
```

Use range colors for labels when appropriate:

```typescript
labelStyle: {
    useRangeColor:
        true
}
```

Validate ranges before rendering:

```typescript
interface GaugeRange {
    start: number;
    end: number;
}

const validateRanges = (
    minimum:
        number,
    maximum:
        number,
    ranges:
        GaugeRange[]
): void => {
    ranges.forEach(
        (
            range:
                GaugeRange
        ): void => {
            if (
                !Number.isFinite(
                    range.start
                ) ||
                !Number.isFinite(
                    range.end
                )
            ) {
                throw new Error(
                    'Range boundaries must be finite.'
                );
            }

            if (
                range.start <
                    minimum ||
                range.end >
                    maximum
            ) {
                throw new Error(
                    'Every range must remain within the axis limits.'
                );
            }

            if (
                range.start >=
                range.end
            ) {
                throw new Error(
                    'Every range start must be less than its end.'
                );
            }
        }
    );
};
```

Adjacent ranges can intentionally share a boundary:

```typescript
{
    start: 0,
    end: 40
},
{
    start: 40,
    end: 70
}
```

Avoid accidental gaps unless an unmapped interval is intended.

## Pointers

Pointers indicate values on an axis.

Primary pointer types are:

```text
Bar
Marker
```

Pointer values should normally remain within the axis minimum and maximum.

## Bar Pointer

A bar pointer fills the scale up to a configured value.

```typescript
pointers: [
    {
        value: 50,
        type: 'Bar',
        color: '#2563eb',
        width: 15,
        offset: 5,
        position: 'Cross',
        opacity: 1,
        roundedCornerRadius: 4,
        animationDuration: 1000,

        border: {
            color: '#1e3a8a',
            width: 1
        },

        description:
            'Current value is 50 percent'
    }
]
```

Use a bar pointer for:

- Progress.
- Capacity.
- Completion.
- Utilization.
- Filled level.

## Marker Pointer

A marker pointer indicates an exact position.

```typescript
pointers: [
    {
        value: 65,
        type: 'Marker',
        markerType: 'Circle',
        color: '#7c3aed',
        height: 18,
        width: 18,
        offset: 0,
        position: 'Outside',
        placement: 'Near',
        description:
            'Current value is 65 percent'
    }
]
```

Common marker types include:

```text
Circle
Rectangle
Triangle
InvertedTriangle
Diamond
Image
Text
```

Validate the selected marker type against the installed package version.

## Image Pointer

```typescript
pointers: [
    {
        value: 60,
        type: 'Marker',
        markerType: 'Image',
        imageUrl:
            './assets/marker.png',
        height: 32,
        width: 32,
        description:
            'Current value is 60'
    }
]
```

Ensure that:

- The image exists.
- The browser can access it.
- Content Security Policy permits the image source.
- Width and height are visible.
- The image has a meaningful text alternative through surrounding content or pointer description.

## Text Pointer

```typescript
pointers: [
    {
        value: 65,
        type: 'Marker',
        markerType: 'Text',
        text: '65%',

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

Keep text pointers concise to prevent overlap.

## Draggable Pointer

Enable pointer dragging through `enableDrag`.

```typescript
pointers: [
    {
        value: 50,
        type: 'Marker',
        markerType: 'Circle',
        color: '#2563eb',
        height: 18,
        width: 18,
        enableDrag: true,
        description:
            'Editable system-health value'
    }
]
```

Enable dragging only when changing the pointer value is meaningful.

Do not enable dragging for read-only status indicators.

Provide persistent text that communicates the current value because pointer position alone is not sufficient for all users.

## Labels

Use `labelStyle` inside an axis.

```typescript
labelStyle: {
    format: '{value}%',
    position: 'Outside',
    offset: 10,

    font: {
        fontFamily: 'Arial',
        size: '12px',
        color: '#334155',
        fontWeight: '500'
    }
}
```

Common label-style properties include:

- `format`
- `position`
- `offset`
- `font`
- `useRangeColor`

Common label positions include:

```text
Inside
Outside
Cross
Auto
```

Use `{value}` as the numeric placeholder:

```typescript
labelStyle: {
    format:
        '{value}%'
}
```

```typescript
labelStyle: {
    format:
        '{value}°C'
}
```

Use `showLastLabel` at the axis level:

```typescript
axes: [
    {
        showLastLabel:
            true
    }
]
```

Avoid long label formats that collide with neighboring labels, ranges, or pointers.

## Tooltips

Enable a gauge tooltip through the gauge-level tooltip configuration.

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        tooltip: {
            enable: true,
            showAtMousePosition: true,

            textStyle: {
                color: '#ffffff',
                fontFamily: 'Arial',
                size: '13px'
            },

            fill: '#1f2937',

            border: {
                color: '#111827',
                width: 1
            }
        },

        axes: [
            {
                minimum: 0,
                maximum: 100,

                pointers: [
                    {
                        value: 65,
                        type: 'Marker',
                        markerType: 'Circle'
                    }
                ]
            }
        ]
    });
```

Validate the exact tooltip properties against the installed package version before adding advanced templates or format strings.

Do not make tooltip content the only persistent source of the gauge value.

## Complete TypeScript Example

This example provides:

- A horizontal gauge.
- A rounded container.
- Three colored ranges.
- Major and minor ticks.
- Formatted labels.
- A bar pointer.
- A marker pointer.
- Runtime validation.
- A visible text equivalent.
- Responsive layout.
- Safe cleanup.

### index.html

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Linear Gauge System Health Monitor</title>

    ./styles.css
</head>

<body>
    <main class="page-container">
        <section
            class="gauge-card"
            aria-labelledby="gauge-heading"
            aria-describedby="gauge-description"
        >
            <h1 id="gauge-heading">
                System Health Monitor
            </h1>

            <p id="gauge-description">
                The gauge displays the current system-health
                percentage. Green represents normal operation,
                amber represents a warning, and red represents
                a critical condition.
            </p>

            <div id="gauge-container"></div>

            <p
                id="current-value"
                class="current-value"
            >
                Current system health: 65 percent.
            </p>

            <div class="range-summary">
                <h2>Range meaning</h2>

                <ul>
                    <li>
                        0 to 39: Normal
                    </li>
                    <li>
                        40 to 69: Warning
                    </li>
                    <li>
                        70 to 100: Critical
                    </li>
                </ul>
            </div>

            <p
                id="gauge-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the Linear Gauge.
            </p>
        </section>
    </main>

    ./<script scr="index.js"></script>
</body>
</html>
```

### styles.css

```css
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    color: #111827;
    background: #f8fafc;
    font-family:
        Arial,
        Helvetica,
        sans-serif;
}

.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
}

.gauge-card {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

.gauge-card h1 {
    margin: 0 0 8px;
    font-size: 24px;
}

.gauge-card > p {
    line-height: 1.5;
}

#gauge-container {
    display: block;
    width: 100%;
    min-height: 400px;
}

.current-value {
    margin: 12px 0;
    padding: 12px;
    background: #f1f5f9;
    border-left: 4px solid #2563eb;
    font-weight: 700;
}

.range-summary {
    margin-top: 16px;
    padding: 16px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
}

.range-summary h2 {
    margin: 0 0 8px;
    font-size: 18px;
}

.range-summary ul {
    margin: 0;
    padding-left: 24px;
}

.range-summary li {
    margin: 6px 0;
}

.status-message {
    margin: 12px 0 0;
    color: #475569;
}

@media (max-width: 768px) {
    .page-container {
        padding: 12px;
    }

    .gauge-card {
        padding: 12px;
    }

    #gauge-container {
        min-height: 340px;
    }
}
```

### index.ts

```typescript
import {
    LinearGauge,
    type AxisModel
} from '@syncfusion/ej2-lineargauge';

interface GaugeRangeDefinition {
    start: number;
    end: number;
    color: string;
    description: string;
}

const minimum:
    number =
        0;

const maximum:
    number =
        100;

const currentHealth:
    number =
        65;

const rangeDefinitions:
    GaugeRangeDefinition[] = [
        {
            start: 0,
            end: 40,
            color: '#16a34a',
            description: 'Normal'
        },
        {
            start: 40,
            end: 70,
            color: '#ca8a04',
            description: 'Warning'
        },
        {
            start: 70,
            end: 100,
            color: '#dc2626',
            description: 'Critical'
        }
    ];

const validateGaugeValue = (
    value:
        number,
    axisMinimum:
        number,
    axisMaximum:
        number
): void => {
    if (
        !Number.isFinite(
            axisMinimum
        ) ||
        !Number.isFinite(
            axisMaximum
        ) ||
        axisMinimum >=
            axisMaximum
    ) {
        throw new Error(
            'The axis minimum must be less than its maximum.'
        );
    }

    if (
        !Number.isFinite(
            value
        ) ||
        value <
            axisMinimum ||
        value >
            axisMaximum
    ) {
        throw new Error(
            'The pointer value must remain within the axis range.'
        );
    }
};

const validateRanges = (
    ranges:
        GaugeRangeDefinition[],
    axisMinimum:
        number,
    axisMaximum:
        number
): void => {
    ranges.forEach(
        (
            range:
                GaugeRangeDefinition
        ): void => {
            if (
                !Number.isFinite(
                    range.start
                ) ||
                !Number.isFinite(
                    range.end
                )
            ) {
                throw new Error(
                    'Range boundaries must be finite.'
                );
            }

            if (
                range.start <
                    axisMinimum ||
                range.end >
                    axisMaximum
            ) {
                throw new Error(
                    'Every range must remain within the axis limits.'
                );
            }

            if (
                range.start >=
                range.end
            ) {
                throw new Error(
                    'Every range start must be less than its end.'
                );
            }

            if (
                !range.color.trim()
            ) {
                throw new Error(
                    'Every range requires a color.'
                );
            }
        }
    );
};

validateGaugeValue(
    currentHealth,
    minimum,
    maximum
);

validateRanges(
    rangeDefinitions,
    minimum,
    maximum
);

const host:
    HTMLElement | null =
        document.getElementById(
            'gauge-container'
        );

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'gauge-status'
        );

if (!host) {
    throw new Error(
        'The Linear Gauge host "#gauge-container" was not found.'
    );
}

const axes:
    AxisModel[] = [
        {
            minimum,
            maximum,
            opposedPosition: false,
            isInversed: false,
            showLastLabel: true,

            line: {
                color: '#475569',
                width: 2,
                offset: 0
            },

            majorTicks: {
                interval: 20,
                position: 'Outside',
                color: '#334155',
                height: 12,
                width: 2,
                offset: 4
            },

            minorTicks: {
                interval: 5,
                position: 'Outside',
                color: '#64748b',
                height: 6,
                width: 1,
                offset: 4
            },

            labelStyle: {
                format: '{value}%',
                position: 'Outside',
                offset: 10,

                font: {
                    fontFamily: 'Arial',
                    size: '13px',
                    color: '#334155',
                    fontWeight: '500'
                }
            },

            ranges:
                rangeDefinitions.map(
                    (
                        range:
                            GaugeRangeDefinition
                    ) => {
                        return {
                            start:
                                range.start,
                            end:
                                range.end,
                            color:
                                range.color,
                            position:
                                'Inside',
                            startWidth:
                                18,
                            endWidth:
                                18
                        };
                    }
                ),

            pointers: [
                {
                    value:
                        currentHealth,
                    type:
                        'Bar',
                    color:
                        '#1e293b',
                    width:
                        12,
                    position:
                        'Cross',
                    opacity:
                        0.9,
                    roundedCornerRadius:
                        4,
                    animationDuration:
                        1000,
                    description:
                        'System health is 65 percent',

                    border: {
                        color:
                            '#0f172a',
                        width:
                            1
                    }
                },
                {
                    value:
                        currentHealth,
                    type:
                        'Marker',
                    markerType:
                        'InvertedTriangle',
                    color:
                        '#111827',
                    height:
                        18,
                    width:
                        18,
                    placement:
                        'Near',
                    position:
                        'Outside',
                    offset:
                        8,
                    description:
                        'Current system-health marker'
                }
            ]
        }
    ];

const gauge: LinearGauge =
    new LinearGauge({
        orientation:
            'Horizontal',

        width:
            '100%',

        height:
            '400px',

        background:
            '#ffffff',

        title:
            'Current System Health',

        titleStyle: {
            color:
                '#111827',
            fontFamily:
                'Arial',
            size:
                '18px',
            fontWeight:
                '700'
        },

        border: {
            color:
                '#cbd5e1',
            width:
                0
        },

        margin: {
            left:
                35,
            right:
                35,
            top:
                35,
            bottom:
                35
        },

        container: {
            type:
                'RoundedRectangle',
            width:
                30,
            backgroundColor:
                '#e2e8f0',
            roundedCornerRadius:
                8,

            border: {
                color:
                    '#94a3b8',
                width:
                    1
            }
        },

        axes,

        loaded:
            (): void => {
                if (statusElement) {
                    statusElement.textContent =
                        'The system-health gauge loaded successfully.';
                }
            }
    });

gauge.appendTo(
    host
);
```

Cleanup when a dynamic view is removed:

```typescript
gauge.destroy();
```

## Complete JavaScript Example

This standalone example uses the standard versioned combined CDN bundle.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Linear Gauge System Health Monitor</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            min-height: 100%;
        }

        body {
            color: #111827;
            background: #f8fafc;
            font-family:
                Arial,
                Helvetica,
                sans-serif;
        }

        .page-container {
            width: 100%;
            min-height: 100vh;
            padding: 24px;
        }

        .gauge-card {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
        }

        .gauge-card h1 {
            margin: 0 0 8px;
            font-size: 24px;
        }

        #gauge-container {
            display: block;
            width: 100%;
            min-height: 400px;
        }

        .current-value {
            margin: 12px 0;
            padding: 12px;
            background: #f1f5f9;
            border-left: 4px solid #2563eb;
            font-weight: 700;
        }

        .range-summary {
            margin-top: 16px;
            padding: 16px;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
        }

        .range-summary h2 {
            margin: 0 0 8px;
            font-size: 18px;
        }

        .range-summary ul {
            margin: 0;
            padding-left: 24px;
        }

        .status-message {
            color: #475569;
        }

        @media (max-width: 768px) {
            .page-container {
                padding: 12px;
            }

            .gauge-card {
                padding: 12px;
            }

            #gauge-container {
                min-height: 340px;
            }
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="gauge-card"
            aria-labelledby="gauge-heading"
            aria-describedby="gauge-description"
        >
            <h1 id="gauge-heading">
                System Health Monitor
            </h1>

            <p id="gauge-description">
                The gauge displays the current system-health
                percentage. Green represents normal operation,
                amber represents a warning, and red represents
                a critical condition.
            </p>

            <div id="gauge-container"></div>

            <p class="current-value">
                Current system health: 65 percent.
            </p>

            <div class="range-summary">
                <h2>Range meaning</h2>

                <ul>
                    <li>0 to 39: Normal</li>
                    <li>40 to 69: Warning</li>
                    <li>70 to 100: Critical</li>
                </ul>
            </div>

            <p
                id="gauge-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the Linear Gauge.
            </p>
        </section>
    </main>

    <script>
        var minimum =
            0;

        var maximum =
            100;

        var currentHealth =
            65;

        var rangeDefinitions = [
            {
                start: 0,
                end: 40,
                color: '#16a34a',
                description: 'Normal'
            },
            {
                start: 40,
                end: 70,
                color: '#ca8a04',
                description: 'Warning'
            },
            {
                start: 70,
                end: 100,
                color: '#dc2626',
                description: 'Critical'
            }
        ];

        function validateGaugeValue(
            value,
            axisMinimum,
            axisMaximum
        ) {
            if (
                !Number.isFinite(
                    axisMinimum
                ) ||
                !Number.isFinite(
                    axisMaximum
                ) ||
                axisMinimum >=
                    axisMaximum
            ) {
                throw new Error(
                    'The axis minimum must be less than its maximum.'
                );
            }

            if (
                !Number.isFinite(
                    value
                ) ||
                value <
                    axisMinimum ||
                value >
                    axisMaximum
            ) {
                throw new Error(
                    'The pointer value must remain within the axis range.'
                );
            }
        }

        function validateRanges(
            ranges,
            axisMinimum,
            axisMaximum
        ) {
            ranges.forEach(
                function (range) {
                    if (
                        !Number.isFinite(
                            range.start
                        ) ||
                        !Number.isFinite(
                            range.end
                        )
                    ) {
                        throw new Error(
                            'Range boundaries must be finite.'
                        );
                    }

                    if (
                        range.start <
                            axisMinimum ||
                        range.end >
                            axisMaximum
                    ) {
                        throw new Error(
                            'Every range must remain within the axis limits.'
                        );
                    }

                    if (
                        range.start >=
                        range.end
                    ) {
                        throw new Error(
                            'Every range start must be less than its end.'
                        );
                    }
                }
            );
        }

        validateGaugeValue(
            currentHealth,
            minimum,
            maximum
        );

        validateRanges(
            rangeDefinitions,
            minimum,
            maximum
        );

        var host =
            document.getElementById(
                'gauge-container'
            );

        var statusElement =
            document.getElementById(
                'gauge-status'
            );

        if (!host) {
            throw new Error(
                'The Linear Gauge host "#gauge-container" was not found.'
            );
        }

        if (
            typeof window.ej ===
                'undefined' ||
            !window.ej.lineargauge
        ) {
            throw new Error(
                'The EJ2 Linear Gauge global bundle was not loaded.'
            );
        }

        var ranges =
            rangeDefinitions.map(
                function (range) {
                    return {
                        start:
                            range.start,
                        end:
                            range.end,
                        color:
                            range.color,
                        position:
                            'Inside',
                        startWidth:
                            18,
                        endWidth:
                            18
                    };
                }
            );

        var gauge =
            new ej.lineargauge.LinearGauge({
                orientation:
                    'Horizontal',

                width:
                    '100%',

                height:
                    '400px',

                background:
                    '#ffffff',

                title:
                    'Current System Health',

                titleStyle: {
                    color:
                        '#111827',
                    fontFamily:
                        'Arial',
                    size:
                        '18px',
                    fontWeight:
                        '700'
                },

                border: {
                    color:
                        '#cbd5e1',
                    width:
                        0
                },

                margin: {
                    left:
                        35,
                    right:
                        35,
                    top:
                        35,
                    bottom:
                        35
                },

                container: {
                    type:
                        'RoundedRectangle',
                    width:
                        30,
                    backgroundColor:
                        '#e2e8f0',
                    roundedCornerRadius:
                        8,

                    border: {
                        color:
                            '#94a3b8',
                        width:
                            1
                    }
                },

                axes: [
                    {
                        minimum:
                            minimum,
                        maximum:
                            maximum,
                        opposedPosition:
                            false,
                        isInversed:
                            false,
                        showLastLabel:
                            true,

                        line: {
                            color:
                                '#475569',
                            width:
                                2,
                            offset:
                                0
                        },

                        majorTicks: {
                            interval:
                                20,
                            position:
                                'Outside',
                            color:
                                '#334155',
                            height:
                                12,
                            width:
                                2,
                            offset:
                                4
                        },

                        minorTicks: {
                            interval:
                                5,
                            position:
                                'Outside',
                            color:
                                '#64748b',
                            height:
                                6,
                            width:
                                1,
                            offset:
                                4
                        },

                        labelStyle: {
                            format:
                                '{value}%',
                            position:
                                'Outside',
                            offset:
                                10,

                            font: {
                                fontFamily:
                                    'Arial',
                                size:
                                    '13px',
                                color:
                                    '#334155',
                                fontWeight:
                                    '500'
                            }
                        },

                        ranges:
                            ranges,

                        pointers: [
                            {
                                value:
                                    currentHealth,
                                type:
                                    'Bar',
                                color:
                                    '#1e293b',
                                width:
                                    12,
                                position:
                                    'Cross',
                                opacity:
                                    0.9,
                                roundedCornerRadius:
                                    4,
                                animationDuration:
                                    1000,
                                description:
                                    'System health is 65 percent',

                                border: {
                                    color:
                                        '#0f172a',
                                    width:
                                        1
                                }
                            },
                            {
                                value:
                                    currentHealth,
                                type:
                                    'Marker',
                                markerType:
                                    'InvertedTriangle',
                                color:
                                    '#111827',
                                height:
                                    18,
                                width:
                                    18,
                                placement:
                                    'Near',
                                position:
                                    'Outside',
                                offset:
                                    8,
                                description:
                                    'Current system-health marker'
                            }
                        ]
                    }
                ],

                loaded:
                    function () {
                        statusElement.textContent =
                            'The system-health gauge loaded successfully.';
                    }
            });

        gauge.appendTo(
            host
        );
    </script>
</body>
</html>
```

## Best Practices

## Use the Correct Package

Framework-neutral TypeScript:

```bash
npm install @syncfusion/ej2-lineargauge
```

Do not use an Angular package unless the application is built with Angular.

## Keep Axis Values Valid

Ensure that:

- `minimum` is finite.
- `maximum` is finite.
- `minimum` is less than `maximum`.
- Pointer values remain within the axis range.
- Range boundaries remain within the axis range.
- Range start values are less than range end values.
- Tick intervals are positive.

## Use Readable Range Colors

```typescript
ranges: [
    {
        start:
            0,
        end:
            40,
        color:
            '#16a34a'
    },
    {
        start:
            40,
        end:
            70,
        color:
            '#ca8a04'
    },
    {
        start:
            70,
        end:
            100,
        color:
            '#dc2626'
    }
]
```

Do not rely only on color. Provide visible text explaining the range meaning.

## Use Suitable Pointer Types

Use a bar pointer for progress or capacity:

```typescript
pointers: [
    {
        value:
            65,
        type:
            'Bar'
    }
]
```

Use a marker pointer for an exact position:

```typescript
pointers: [
    {
        value:
            65,
        type:
            'Marker',
        markerType:
            'InvertedTriangle'
    }
]
```

## Use Explicit TypeScript Models

```typescript
import {
    LinearGauge,
    type AxisModel
} from '@syncfusion/ej2-lineargauge';

const currentHealth:
    number =
        65;

const axes:
    AxisModel[] = [
        {
            minimum:
                0,
            maximum:
                100,

            pointers: [
                {
                    value:
                        currentHealth
                }
            ]
        }
    ];

const gauge:
    LinearGauge =
        new LinearGauge({
            axes
        });
```

## Keep Labels Concise

```typescript
labelStyle: {
    format:
        '{value}%'
}
```

Avoid long text that overlaps adjacent labels or ticks.

## Provide a Text Equivalent

Use persistent text:

```html
<p>
    Current system health: 65 percent.
</p>
```

Do not require users to infer the value only from pointer position.

## Batch Runtime Updates

Update a pointer through the supported component API or model, then refresh once if required.

Avoid repeated refresh calls:

```typescript
updates.forEach(
    (): void => {
        applyUpdate();
        gauge.refresh();
    }
);
```

Preferred:

```typescript
updates.forEach(
    (): void => {
        applyUpdate();
    }
);

gauge.refresh();
```

## Clean Up Dynamic Views

```typescript
gauge.destroy();
```

Remove application-owned listeners and clear timers before destroying the component.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-lineargauge is installed.
✅ The LinearGauge import uses the correct package.
✅ The Syncfusion license is registered when required.
✅ The global EJ2 script loads before JavaScript initialization.
✅ Combined and individual global bundles are not mixed.
✅ All individual package scripts use the same EJ2 version.
✅ The host element exists.
✅ The appendTo selector matches the host ID.
✅ The host has measurable dimensions.
✅ Gauge width and height use valid CSS-size strings.
✅ Container width and height use valid numeric values.
✅ The orientation is Horizontal or Vertical.
✅ The axes collection contains at least one valid axis.
✅ Axis minimum and maximum are finite.
✅ Axis minimum is less than axis maximum.
✅ Tick intervals are finite and positive.
✅ Tick dimensions are visible.
✅ Range start and end values are finite.
✅ Range boundaries remain within the axis limits.
✅ Every range start is less than its end.
✅ Range widths are visible.
✅ Pointer values are finite.
✅ Pointer values remain within the axis limits.
✅ Marker pointers have suitable width and height.
✅ Bar pointers have a visible width.
✅ Image pointers use accessible image URLs.
✅ Text pointers use concise content.
✅ Draggable pointers represent editable values.
✅ Label formats use the {value} placeholder.
✅ Label positions and offsets avoid collisions.
✅ Important meaning is not communicated only through color.
✅ A persistent text equivalent is available.
✅ Application-owned listeners and timers are cleaned up.
✅ gauge.destroy() is called when a dynamic host is removed.
✅ No encoded HTML replaces executable markup.
✅ No editor-generated tags or malformed script URLs remain.
```

## Troubleshooting

## Linear Gauge Is Not Displayed

Confirm that the host exists:

```html
<div id="gauge-container"></div>
```

Give it measurable dimensions:

```css
#gauge-container {
    width: 100%;
    min-height: 400px;
}
```

Validate the host before initialization:

```typescript
const host:
    HTMLElement | null =
        document.getElementById(
            'gauge-container'
        );

if (!host) {
    throw new Error(
        'The gauge host was not found.'
    );
}
```

Append through the correct host:

```typescript
gauge.appendTo(
    host
);
```

Also check:

- Initialization runs after the host exists.
- No previous JavaScript error stopped execution.
- The host is not inside a hidden ancestor.
- The global bundle or npm-built script loaded.
- The host is not reused by an existing gauge instance.

## Module Import Cannot Be Resolved

Install the correct package:

```bash
npm install @syncfusion/ej2-lineargauge
```

Use the correct import:

```typescript
import {
    LinearGauge
} from '@syncfusion/ej2-lineargauge';
```

Do not use:

```typescript
import {
    LinearGaugeModule
} from '@syncfusion/ej2-angular-lineargauge';
```

in a framework-neutral TypeScript application.

## Global Namespace Is Undefined

Check the bundle:

```javascript
if (
    typeof window.ej ===
        'undefined' ||
    !window.ej.lineargauge
) {
    throw new Error(
        'The Linear Gauge script was not loaded.'
    );
}
```

Ensure the EJ2 bundle loads before application code:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

./<script scr="index.js"></script>
```

## Axis Is Not Visible

Provide a valid axis:

```typescript
axes: [
    {
        minimum:
            0,
        maximum:
            100,

        line: {
            color:
                '#475569',
            width:
                2
        }
    }
]
```

Check that:

- `minimum < maximum`.
- The axis line has a visible color.
- The line width is greater than zero.
- The host has adequate dimensions.
- Margins do not leave insufficient rendering space.

## Range Is Not Visible

Check:

1. `start` and `end` are within the axis limits.
2. `start < end`.
3. `startWidth` and `endWidth` are greater than zero.
4. The color is visible.
5. Position and offset do not move the range outside the useful area.

```typescript
ranges: [
    {
        start:
            0,
        end:
            40,
        color:
            '#16a34a',
        startWidth:
            15,
        endWidth:
            15
    }
]
```

## Pointer Is Not Visible

Check that the pointer value is within the axis range:

```typescript
axes: [
    {
        minimum:
            0,
        maximum:
            100,

        pointers: [
            {
                value:
                    65,
                type:
                    'Marker',
                markerType:
                    'Circle',
                height:
                    18,
                width:
                    18,
                color:
                    '#2563eb'
            }
        ]
    }
]
```

For marker pointers:

- Provide visible `height`.
- Provide visible `width`.
- Use a supported `markerType`.
- Confirm that position and offset remain visible.

For bar pointers:

- Provide a visible `width`.
- Confirm that the bar color contrasts with the gauge.
- Confirm that the value is not below the axis minimum.

## Labels Are Not Formatted

Use `{value}`:

```typescript
labelStyle: {
    format:
        '{value}%'
}
```

Do not use template placeholders from unrelated controls:

```typescript
labelStyle: {
    format:
        '${Value}%'
}
```

## Labels Overlap Ranges or Pointers

Move labels outside:

```typescript
labelStyle: {
    position:
        'Outside',
    offset:
        10
}
```

Move ranges inside:

```typescript
ranges: [
    {
        position:
            'Inside'
    }
]
```

Move ticks:

```typescript
majorTicks: {
    position:
        'Outside'
},

minorTicks: {
    position:
        'Outside'
}
```

Also consider:

- Increasing gauge height.
- Increasing margins.
- Reducing font size carefully.
- Increasing the major-tick interval.
- Simplifying the label format.

## Gauge Orientation Is Incorrect

Use exact values:

```typescript
orientation:
    'Horizontal'
```

or:

```typescript
orientation:
    'Vertical'
```

Check letter casing.

## Container Dimensions Cause Type Errors

Use numeric values:

```typescript
container: {
    width:
        30,
    height:
        200
}
```

Do not use:

```typescript
container: {
    width:
        '30px',
    height:
        '200px'
}
```

Use gauge-level dimensions for CSS-size strings:

```typescript
const gauge: LinearGauge =
    new LinearGauge({
        width:
            '100%',
        height:
            '400px'
    });
```

## Tick Marks Are Not Displayed

Provide visible intervals and dimensions:

```typescript
majorTicks: {
    interval:
        20,
    height:
        10,
    width:
        2,
    color:
        '#334155'
},

minorTicks: {
    interval:
        5,
    height:
        5,
    width:
        1,
    color:
        '#64748b'
}
```

Check that intervals are positive and suitable for the axis span.

## Dragging Does Not Change the Pointer

Enable dragging:

```typescript
pointers: [
    {
        value:
            50,
        type:
            'Marker',
        markerType:
            'Circle',
        enableDrag:
            true
    }
]
```

Also check:

- The pointer is visible.
- Another element is not covering the gauge.
- The pointer represents an editable value.
- The application does not immediately overwrite the dragged value.
- Pointer drag events are validated before use.

## Runtime Output Differs from TypeScript Configuration

Check:

- All Syncfusion package versions are compatible.
- The latest compiled application bundle is loaded.
- No stale output remains in the build directory.
- The browser is not loading an old cached script.
- Property names use the correct casing.
- The host is not initialized more than once.
- No previous error stopped initialization.

Run:

```bash
npx tsc --noEmit
```

Rebuild:

```bash
rm -rf dist
npm run build
```

Use cache removal only when stale build output is suspected.

## Gauge Is Initialized More Than Once

Destroy the existing instance before recreating it:

```typescript
let gauge:
    LinearGauge | null =
        null;

const createGauge =
    (): void => {
        gauge?.destroy();

        gauge =
            new LinearGauge({
                axes: [
                    {
                        minimum:
                            0,
                        maximum:
                            100
                    }
                ]
            });

        gauge.appendTo(
            '#gauge-container'
        );
    };
```

## Combined Mistakes and Future References

### Encoded Host Element

Incorrect:

```html
&lt;div id="gauge-container"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="gauge-container"></div>
```

### Malformed Script Element

Incorrect:

```text
<script scr="index.js"></script>
```

Correct:

```html
./<script scr="index.js"></script>
```

### Unversioned CDN

Avoid an unversioned production dependency:

```html
<script
    src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"
></script>
```

Use a tested version:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Combined and Individual Bundles Loaded Together

Avoid:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.1.29/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.1.29/ej2-lineargauge/dist/global/ej2-lineargauge.min.js"></script>
script>
```

Use either the combined bundle or the validated individual package scripts.

### Angular Wrapper in Framework-Neutral TypeScript

Incorrect:

```typescript
import {
    LinearGaugeModule
} from '@syncfusion/ej2-angular-lineargauge';
```

Correct:

```typescript
import {
    LinearGauge
} from '@syncfusion/ej2-lineargauge';
```

### Missing Host Dimensions

Incorrect:

```css
#gauge-container {
}
```

Correct:

```css
#gauge-container {
    width: 100%;
    min-height: 400px;
}
```

### CSS Strings for Numeric Container Dimensions

Incorrect:

```typescript
container: {
    width:
        '30px',
    height:
        '200px'
}
```

Correct:

```typescript
container: {
    width:
        30,
    height:
        200
}
```

### Invalid Axis Range

Incorrect:

```typescript
axes: [
    {
        minimum:
            100,
        maximum:
            0
    }
]
```

Correct:

```typescript
axes: [
    {
        minimum:
            0,
        maximum:
            100
    }
]
```

### Pointer Outside the Axis

Incorrect:

```typescript
axes: [
    {
        minimum:
            0,
        maximum:
            100,

        pointers: [
            {
                value:
                    150
            }
        ]
    }
]
```

Correct:

```typescript
axes: [
    {
        minimum:
            0,
        maximum:
            100,

        pointers: [
            {
                value:
                    65
            }
        ]
    }
]
```

### Zero-Width Range

Incorrect:

```typescript
ranges: [
    {
        start:
            0,
        end:
            40,
        startWidth:
            0,
        endWidth:
            0
    }
]
```

Correct:

```typescript
ranges: [
    {
        start:
            0,
        end:
            40,
        startWidth:
            15,
        endWidth:
            15
    }
]
```

### Wrong Label Placeholder

Incorrect:

```typescript
labelStyle: {
    format:
        '${value}%'
}
```

Correct:

```typescript
labelStyle: {
    format:
        '{value}%'
}
```

### Using Only Color to Explain Health

Avoid:

```text
Green, amber, and red are shown without any text explanation.
```

Provide persistent text:

```html
<ul>
    <li>0 to 39: Normal</li>
    <li>40 to 69: Warning</li>
    <li>70 to 100: Critical</li>
</ul>
```

### Draggable Read-Only Pointer

Avoid:

```typescript
pointers: [
    {
        value:
            65,
        enableDrag:
            true
    }
]
```

when the gauge is strictly read-only.

### Multiple Initialization Without Cleanup

Incorrect:

```typescript
const firstGauge:
    LinearGauge =
        new LinearGauge({});

firstGauge.appendTo(
    '#gauge-container'
);

const secondGauge:
    LinearGauge =
        new LinearGauge({});

secondGauge.appendTo(
    '#gauge-container'
);
```

Correct:

```typescript
firstGauge.destroy();

secondGauge.appendTo(
    '#gauge-container'
);
```

### Missing Cleanup

When a dynamic view is removed:

```typescript
button.removeEventListener(
    'click',
    handleClick
);

gauge.destroy();
```

### Editor-Generated Markup

Remove the following from executable HTML, TypeScript, JavaScript, CSS, imports, commands, templates, and URLs:

```text
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated classes
Rich-text anchor wrappers
Encoded executable HTML
Malformed script elements
```