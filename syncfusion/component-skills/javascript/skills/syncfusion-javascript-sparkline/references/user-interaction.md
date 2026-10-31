# User Interaction

## Overview

The EJ2 Sparkline provides two built-in pointer-interaction features:

- **Tooltip**: Displays details about the data point under the pointer.
- **Tracker line**: Draws a vertical reference line through the active point.

Both features are configured through `tooltipSettings`. In TypeScript, they require the `SparklineTooltip` module to be imported and injected before creating the Sparkline.

Correct:

```typescript
tooltipSettings: {
    visible: true,
    format: '${x} : ${y}',
    trackLineSettings: {
        visible: true
    }
}
```

Incorrect:

```typescript
trackball: {
    enable: true
},
tooltip: {
    enable: true
}
```

The supplied content also contained the following issues:

- The Sparkline interaction is called a **tracker line**, not a trackball.
- Use `tooltipSettings`, not `tooltip`.
- Use `visible`, not `enable`.
- Sparkline does not provide a built-in point-selection configuration comparable to the full Chart control.
- `pointRendering` is a rendering event, not a mouse or selection event.
- Tooltip injection is unnecessary when only rendering events are used.
- Category and DateTime data require the corresponding `valueType`.
- Tooltip interaction must not be the only way users can access exact data.
- Native buttons and accessible data tables are preferable for keyboard-driven selection workflows.

## Table of Contents

- #tooltip-interaction
- #tracker-line
- #tooltip-customization
- #tooltip-template
- #rendering-events
  - #point-rendering
  - #marker-rendering
  - #data-label-rendering
  - #load-and-loaded-events
- #point-selection
- #dom-pointer-and-click-events
- #interactive-patterns
- #dynamic-interaction-updates
- #complete-typescript-example
- #complete-javascript-example
- #accessibility
- #best-practices
- #combined-mistakes-and-future-references

## Tooltip Interaction

Tooltips display information when the pointer moves over a Sparkline point.

### Required TypeScript Module

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

The module must be injected before creating the Sparkline.

### Basic TypeScript Example

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);

interface SalesData {
    month: string;
    sales: number;
}

const salesData: SalesData[] = [
    {
        month: 'Jan',
        sales: 35
    },
    {
        month: 'Feb',
        sales: 28
    },
    {
        month: 'Mar',
        sales: 34
    },
    {
        month: 'Apr',
        sales: 32
    },
    {
        month: 'May',
        sales: 40
    },
    {
        month: 'Jun',
        sales: 42
    }
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '130px',
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'All'
            ],
            size: 6,
            fill: '#FFFFFF',
            border: {
                color: '#1D4ED8',
                width: 2
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}'
        }
    });

sparkline.appendTo('#sparkline');
```

### Basic JavaScript Example

When using the complete EJ2 global bundle:

```javascript
var salesData = [
    {
        month: 'Jan',
        sales: 35
    },
    {
        month: 'Feb',
        sales: 28
    },
    {
        month: 'Mar',
        sales: 34
    },
    {
        month: 'Apr',
        sales: 32
    }
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '130px',
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'All'
            ],
            size: 6
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}'
        }
    });

sparkline.appendTo('#sparkline');
```

## Tracker Line

The tracker line is configured inside `tooltipSettings`.

```typescript
tooltipSettings: {
    visible: true,
    trackLineSettings: {
        visible: true,
        color: '#64748B',
        width: 1
    }
}
```

Sparkline’s documented user-interaction features are tooltip and tracker line.

### Tooltip with Tracker Line

```typescript
const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '130px',
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'All'
            ],
            size: 6,
            fill: '#FFFFFF',
            border: {
                color: '#2563EB',
                width: 2
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}',
            trackLineSettings: {
                visible: true,
                color: '#64748B',
                width: 1
            }
        }
    });
```

Do not use:

```typescript
trackball: {
    enable: true
}
```

## Tooltip Customization

The tooltip supports customization through properties such as:

- `visible`
- `format`
- `fill`
- `border`
- `textStyle`
- `template`
- `trackLineSettings`

These options are part of the Sparkline tooltip settings model.

```typescript
tooltipSettings: {
    visible: true,
    format: '${x} : ${y}',
    fill: '#111827',
    border: {
        color: '#374151',
        width: 1
    },
    textStyle: {
        color: '#FFFFFF',
        size: '12px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '500',
        opacity: 1
    },
    trackLineSettings: {
        visible: true,
        color: '#64748B',
        width: 1
    }
}
```

Use:

```typescript
textStyle: {
    size: '12px'
}
```

Do not use:

```typescript
textStyle: {
    fontSize: 12
}
```

## Tooltip Template

Sparkline tooltips support templates for custom HTML content.

### HTML

```html
<div
    id="sparkline-tooltip-template"
    style="display: none;"
>
    <div class="sparkline-tooltip">
        <strong>${x}</strong>
        <span>Value: ${y}</span>
    </div>
</div>
```

### CSS

```css
.sparkline-tooltip {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px;
    border-radius: 6px;
    background: #111827;
    color: #FFFFFF;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
}
```

### TypeScript

```typescript
tooltipSettings: {
    visible: true,
    template:
        '#sparkline-tooltip-template',
    trackLineSettings: {
        visible: true,
        color: '#64748B',
        width: 1
    }
}
```

Validate complex template context and lifecycle behavior against the installed EJ2 version.

## Rendering Events

Rendering events customize Sparkline elements while they are being created. They do not represent built-in selection.

Use strongly typed event arguments when available instead of `any`.

## Point Rendering

Use `pointRendering` to customize a rendered data point based on its value or index.

```typescript
import {
    IPointRenderingEventArgs,
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: [
            45,
            78,
            65,
            92,
            55,
            88,
            70
        ],
        pointRendering: (
            args:
                IPointRenderingEventArgs
        ): void => {
            const value: number =
                args.point.yVal;

            if (value >= 80) {
                args.fill = '#15803D';
            } else if (value >= 60) {
                args.fill = '#CA8A04';
            } else {
                args.fill = '#DC2626';
            }
        }
    });
```

Use the exact event name:

```typescript
pointRendering
```

Do not use:

```typescript
pointRender
```

If the event argument model differs in the target EJ2 release, validate fields such as `point`, `pointIndex`, and `fill` against that installed version.

Tooltip injection is unnecessary when only `pointRendering` is used.

## Marker Rendering

Use `markerRendering` for per-marker customization.

```typescript
import {
    IMarkerRenderingEventArgs,
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ],
        markerSettings: {
            visible: [
                'All'
            ],
            size: 7
        },
        markerRendering: (
            args:
                IMarkerRenderingEventArgs
        ): void => {
            if (args.pointIndex === 0) {
                args.fill = '#7C3AED';
            }
        }
    });
```

## Data Label Rendering

Use `dataLabelRendering` when label appearance or content needs conditional customization.

```typescript
import {
    IDataLabelRenderingEventArgs,
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: [
            35,
            28,
            34,
            32,
            40,
            42
        ],
        dataLabelSettings: {
            visible: [
                'All'
            ],
            format: '${y}'
        },
        dataLabelRendering: (
            args:
                IDataLabelRenderingEventArgs
        ): void => {
            if (args.point.yVal < 30) {
                args.color = '#B91C1C';
            }
        }
    });
```

Validate the event argument fields against the installed package before changing advanced values.

## Load and Loaded Events

The `load` event runs before rendering completes and is appropriate for last-minute initialization changes.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            35,
            28,
            34,
            32,
            40,
            42
        ],
        load: (): void => {
            console.log(
                'Sparkline rendering started.'
            );
        }
    });
```

Use `loaded` when logic must run after the Sparkline finishes rendering:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            35,
            28,
            34,
            32,
            40,
            42
        ],
        loaded: (): void => {
            console.log(
                'Sparkline rendering completed.'
            );
        }
    });
```

Do not use rendering events as substitutes for user click or keyboard events.

## Point Selection

EJ2 Sparkline does not expose a built-in point-selection model comparable to the full EJ2 Chart selection feature.

Avoid documenting unsupported properties such as:

```typescript
selectionMode: 'Point'
```

or:

```typescript
selectedDataIndexes: [
    {
        point: 2
    }
]
```

If the application requires selection:

1. Present the values through native HTML controls.
2. Maintain the selected index in application state.
3. Update the Sparkline styling or datasource.
4. Provide a visible and screen-reader-accessible status.
5. Support keyboard access through the native control.

### Accessible Point Selection Pattern

```html
<label for="point-selector">
    Select month
</label>

<select id="point-selector">
    <option value="0">
        January
    </option>
    <option value="1">
        February
    </option>
    <option value="2">
        March
    </option>
    <option value="3">
        April
    </option>
</select>

<p
    id="selected-point-status"
    role="status"
    aria-live="polite"
></p>
```

```typescript
let selectedIndex: number = 0;

const selector:
    HTMLSelectElement | null =
        document.querySelector(
            '#point-selector'
        );

const status:
    HTMLElement | null =
        document.querySelector(
            '#selected-point-status'
        );

if (selector) {
    selector.addEventListener(
        'change',
        (): void => {
            selectedIndex =
                Number(selector.value);

            const selected:
                SalesData =
                    salesData[
                        selectedIndex
                    ];

            if (status) {
                status.textContent =
                    `${selected.month}: ` +
                    `${selected.sales}`;
            }

            sparkline.refresh();
        }
    );
}
```

A rendering event can use `selectedIndex` to style the chosen point. This is custom application behavior, not built-in Sparkline selection.

## DOM Pointer and Click Events

If a general click on the visualization is required, attach a DOM event to the host after rendering.

```typescript
const host:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (host) {
    host.addEventListener(
        'click',
        (
            event: MouseEvent
        ): void => {
            console.log(
                'Sparkline host clicked.',
                event
            );
        }
    );
}
```

This reports a host click. It does not automatically identify the clicked Sparkline point.

Do not parse generated SVG IDs or depend on undocumented internal element structures for production point selection. Generated IDs and class names can change between releases.

## Interactive Patterns

## Color-Coded Performance

Use `pointRendering` for a Column Sparkline:

```typescript
const performanceData: number[] = [
    45,
    78,
    65,
    92,
    55,
    88,
    70
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '150px',
        type: 'Column',
        valueType: 'Numeric',
        dataSource: performanceData,
        axisSettings: {
            minY: 0,
            maxY: 100
        },
        pointRendering: (
            args:
                IPointRenderingEventArgs
        ): void => {
            const value: number =
                args.point.yVal;

            if (value >= 80) {
                args.fill = '#15803D';
            } else if (value >= 60) {
                args.fill = '#CA8A04';
            } else {
                args.fill = '#DC2626';
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${y}'
        }
    });
```

Explain the ranges using visible text because color must not be the only indicator.

## DateTime Trend with Tooltip

```typescript
interface PriceData {
    date: Date;
    price: number;
}

const priceData: PriceData[] = [
    {
        date:
            new Date(2025, 0, 1),
        price: 100
    },
    {
        date:
            new Date(2025, 0, 2),
        price: 125
    },
    {
        date:
            new Date(2025, 0, 3),
        price: 110
    },
    {
        date:
            new Date(2025, 0, 4),
        price: 135
    }
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '140px',
        type: 'Line',
        valueType: 'DateTime',
        dataSource: priceData,
        xName: 'date',
        yName: 'price',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'All'
            ],
            size: 6,
            fill: '#FFFFFF',
            border: {
                color: '#2563EB',
                width: 2
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}',
            fill: '#FFFFFF',
            border: {
                color: '#475569',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '12px'
            },
            trackLineSettings: {
                visible: true,
                color: '#64748B',
                width: 1
            }
        }
    });
```

Date-valued x-fields require:

```typescript
valueType: 'DateTime'
```

## Actual Versus Target

A Sparkline displays one y-field at a time. A `target` property in the datasource is not automatically plotted as a second series.

Use a range band or horizontal reference line for a single target:

```typescript
interface TargetData {
    month: string;
    actual: number;
}

const actualData: TargetData[] = [
    {
        month: 'Jan',
        actual: 100
    },
    {
        month: 'Feb',
        actual: 125
    },
    {
        month: 'Mar',
        actual: 110
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Category',
        dataSource: actualData,
        xName: 'month',
        yName: 'actual',
        axisSettings: {
            minY: 0,
            maxY: 150,
            value: 120,
            lineSettings: {
                visible: true,
                color: '#DC2626',
                width: 2
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}'
        }
    });
```

The axis line at `120` represents the target.

## Dynamic Interaction Updates

Enable tooltip:

```typescript
sparkline
    .tooltipSettings
    .visible = true;

sparkline.dataBind();
```

Disable tooltip:

```typescript
sparkline
    .tooltipSettings
    .visible = false;

sparkline.dataBind();
```

Enable tracker line:

```typescript
sparkline
    .tooltipSettings
    .trackLineSettings
    .visible = true;

sparkline.dataBind();
```

Change tooltip format:

```typescript
sparkline
    .tooltipSettings
    .format = '${x} : ${y}';

sparkline.dataBind();
```

Batch related interaction updates:

```typescript
sparkline
    .tooltipSettings
    .visible = true;

sparkline
    .tooltipSettings
    .format = '${x} : ${y}';

sparkline
    .tooltipSettings
    .trackLineSettings
    .visible = true;

sparkline.dataBind();
```

Use `dataBind()` for ordinary property updates.

Use `refresh()` only when:

- The component dimensions changed.
- A hidden parent became visible.
- Rendering-event state requires complete point regeneration.
- The complete layout must be recalculated.

## Complete TypeScript Example

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Sparkline User Interaction</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .sparkline-card {
            width: 100%;
            max-width: 640px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .sparkline-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .sparkline-toolbar button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #sparkline {
            width: 100%;
            height: 200px;
        }

        .performance-key {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 12px;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Performance Scores
        </h1>

        <p id="sparkline-description">
            Scores below 60 are below target, scores
            from 60 to 79 are acceptable, and scores
            of 80 or above are excellent.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="toggle-tooltip"
                type="button"
            >
                Disable Tooltip
            </button>

            <button
                id="toggle-tracker"
                type="button"
            >
                Disable Tracker Line
            </button>

            <button
                id="show-data"
                type="button"
                aria-expanded="false"
                aria-controls="data-details"
            >
                Show Data
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>

        <details id="data-details">
            <summary>
                Performance data
            </summary>

            <ul>
                <li>January: 45</li>
                <li>February: 78</li>
                <li>March: 65</li>
                <li>April: 92</li>
                <li>May: 55</li>
                <li>June: 88</li>
                <li>July: 70</li>
            </ul>
        </details>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    IPointRenderingEventArgs,
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

interface PerformanceData {
    month: string;
    score: number;
}

Sparkline.Inject(
    SparklineTooltip
);

const performanceData:
    PerformanceData[] = [
        {
            month: 'Jan',
            score: 45
        },
        {
            month: 'Feb',
            score: 78
        },
        {
            month: 'Mar',
            score: 65
        },
        {
            month: 'Apr',
            score: 92
        },
        {
            month: 'May',
            score: 55
        },
        {
            month: 'Jun',
            score: 88
        },
        {
            month: 'Jul',
            score: 70
        }
    ];

const sparklineElement:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (!sparklineElement) {
    throw new Error(
        'The Sparkline container was not found.'
    );
}

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '200px',
        type: 'Column',
        valueType: 'Category',
        dataSource:
            performanceData,
        xName: 'month',
        yName: 'score',
        fill: '#2563EB',
        axisSettings: {
            minY: 0,
            maxY: 100,
            value: 60,
            lineSettings: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        rangeBandSettings: [
            {
                startRange: 0,
                endRange: 60,
                color: '#FCA5A5',
                opacity: 0.18
            },
            {
                startRange: 60,
                endRange: 80,
                color: '#FDE68A',
                opacity: 0.18
            },
            {
                startRange: 80,
                endRange: 100,
                color: '#86EFAC',
                opacity: 0.18
            }
        ],
        pointRendering: (
            args:
                IPointRenderingEventArgs
        ): void => {
            const value: number =
                args.point.yVal;

            if (value >= 80) {
                args.fill = '#15803D';
            } else if (value >= 60) {
                args.fill = '#CA8A04';
            } else {
                args.fill = '#DC2626';
            }
        },
        dataLabelSettings: {
            visible: [
                'High',
                'Low'
            ],
            format: '${y}',
            fill: '#FFFFFF',
            border: {
                color: '#475569',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '11px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}',
            fill: '#111827',
            border: {
                color: '#374151',
                width: 1
            },
            textStyle: {
                color: '#FFFFFF',
                size: '12px',
                fontFamily: 'Segoe UI',
                fontWeight: '500'
            },
            trackLineSettings: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#CBD5E1',
                width: 1
            }
        },
        padding: {
            left: 14,
            right: 14,
            top: 28,
            bottom: 14
        }
    });

sparkline.appendTo(
    sparklineElement
);

const tooltipButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#toggle-tooltip'
        );

if (tooltipButton) {
    tooltipButton.addEventListener(
        'click',
        (): void => {
            sparkline
                .tooltipSettings
                .visible =
                    !sparkline
                        .tooltipSettings
                        .visible;

            tooltipButton.textContent =
                sparkline
                    .tooltipSettings
                    .visible
                    ? 'Disable Tooltip'
                    : 'Enable Tooltip';

            sparkline.dataBind();
        }
    );
}

const trackerButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#toggle-tracker'
        );

if (trackerButton) {
    trackerButton.addEventListener(
        'click',
        (): void => {
            const settings =
                sparkline
                    .tooltipSettings
                    .trackLineSettings;

            settings.visible =
                !settings.visible;

            trackerButton.textContent =
                settings.visible
                    ? 'Disable Tracker Line'
                    : 'Enable Tracker Line';

            sparkline.dataBind();
        }
    );
}

const showDataButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#show-data'
        );

const details:
    HTMLDetailsElement | null =
        document.querySelector(
            '#data-details'
        );

if (
    showDataButton &&
    details
) {
    showDataButton.addEventListener(
        'click',
        (): void => {
            details.open =
                !details.open;

            showDataButton.setAttribute(
                'aria-expanded',
                String(details.open)
            );

            showDataButton.textContent =
                details.open
                    ? 'Hide Data'
                    : 'Show Data';
        }
    );
}
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Sparkline User Interaction</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .sparkline-card {
            width: 100%;
            max-width: 640px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .sparkline-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        #sparkline {
            width: 100%;
            height: 200px;
        }
    </style>
</head>
<body>
    <main class="sparkline-card">
        <h1>
            Performance Scores
        </h1>

        <p id="sparkline-description">
            Scores below 60 are below target, scores
            from 60 to 79 are acceptable, and scores
            of 80 or above are excellent.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="toggle-tooltip"
                type="button"
            >
                Disable Tooltip
            </button>

            <button
                id="toggle-tracker"
                type="button"
            >
                Disable Tracker Line
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>

        <details>
            <summary>
                Performance data
            </summary>

            <ul>
                <li>January: 45</li>
                <li>February: 78</li>
                <li>March: 65</li>
                <li>April: 92</li>
                <li>May: 55</li>
                <li>June: 88</li>
                <li>July: 70</li>
            </ul>
        </details>
    </main>

    <script>
        var performanceData = [
            {
                month: 'Jan',
                score: 45
            },
            {
                month: 'Feb',
                score: 78
            },
            {
                month: 'Mar',
                score: 65
            },
            {
                month: 'Apr',
                score: 92
            },
            {
                month: 'May',
                score: 55
            },
            {
                month: 'Jun',
                score: 88
            },
            {
                month: 'Jul',
                score: 70
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '200px',
                type: 'Column',
                valueType: 'Category',
                dataSource:
                    performanceData,
                xName: 'month',
                yName: 'score',
                fill: '#2563EB',
                axisSettings: {
                    minY: 0,
                    maxY: 100,
                    value: 60,
                    lineSettings: {
                        visible: true,
                        color: '#475569',
                        width: 1
                    }
                },
                rangeBandSettings: [
                    {
                        startRange: 0,
                        endRange: 60,
                        color: '#FCA5A5',
                        opacity: 0.18
                    },
                    {
                        startRange: 60,
                        endRange: 80,
                        color: '#FDE68A',
                        opacity: 0.18
                    },
                    {
                        startRange: 80,
                        endRange: 100,
                        color: '#86EFAC',
                        opacity: 0.18
                    }
                ],
                pointRendering:
                    function (args) {
                        var value =
                            args.point.yVal;

                        if (value >= 80) {
                            args.fill =
                                '#15803D';
                        } else if (
                            value >= 60
                        ) {
                            args.fill =
                                '#CA8A04';
                        } else {
                            args.fill =
                                '#DC2626';
                        }
                    },
                dataLabelSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    format: '${y}',
                    fill: '#FFFFFF',
                    border: {
                        color: '#475569',
                        width: 1
                    },
                    textStyle: {
                        color: '#111827',
                        size: '11px',
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '600'
                    }
                },
                tooltipSettings: {
                    visible: true,
                    format: '${x} : ${y}',
                    fill: '#111827',
                    border: {
                        color: '#374151',
                        width: 1
                    },
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px',
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '500'
                    },
                    trackLineSettings: {
                        visible: true,
                        color: '#475569',
                        width: 1
                    }
                },
                containerArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#CBD5E1',
                        width: 1
                    }
                },
                padding: {
                    left: 14,
                    right: 14,
                    top: 28,
                    bottom: 14
                }
            });

        sparkline.appendTo('#sparkline');

        var tooltipButton =
            document.getElementById(
                'toggle-tooltip'
            );

        tooltipButton.addEventListener(
            'click',
            function () {
                sparkline
                    .tooltipSettings
                    .visible =
                        !sparkline
                            .tooltipSettings
                            .visible;

                this.textContent =
                    sparkline
                        .tooltipSettings
                        .visible
                        ? 'Disable Tooltip'
                        : 'Enable Tooltip';

                sparkline.dataBind();
            }
        );

        var trackerButton =
            document.getElementById(
                'toggle-tracker'
            );

        trackerButton.addEventListener(
            'click',
            function () {
                var settings =
                    sparkline
                        .tooltipSettings
                        .trackLineSettings;

                settings.visible =
                    !settings.visible;

                this.textContent =
                    settings.visible
                        ? 'Disable Tracker Line'
                        : 'Enable Tracker Line';

                sparkline.dataBind();
            }
        );
    </script>
</body>
</html>
```

## Accessibility

Tooltips are pointer-oriented and must not be the only method for accessing exact values.

Provide at least one of these alternatives:

- A visible data table
- A `<details>` region
- An accessible list
- A concise text summary
- Native controls for selecting a period
- Data labels for important points

Do not add `tabindex="0"` to a static Sparkline unless the focused element provides a meaningful and tested keyboard interaction.

Use native elements such as:

```html
<button type="button">
    Show data
</button>
```

```html
<select>
    <option>January</option>
</select>
```

These controls include built-in keyboard behavior.

## Best Practices

### Tooltip and Tracker Line

- Import and inject `SparklineTooltip` in TypeScript.
- Use `tooltipSettings.visible`.
- Place tracker-line settings inside `tooltipSettings`.
- Use `${x}` and `${y}` for support-safe tooltip content.
- Enable visible markers for precise Line and Area interaction.
- Keep tooltip content concise.
- Test pointer and touch behavior.

### Rendering Events

- Use `pointRendering` for point appearance.
- Use `markerRendering` for marker appearance.
- Use `dataLabelRendering` for data-label appearance.
- Prefer typed event arguments.
- Do not treat rendering events as mouse events.
- Do not inject tooltip support when no tooltip or tracker line is used.

### Selection

- Do not claim that Sparkline has built-in point selection.
- Use application state and native controls.
- Present selected values through visible text.
- Announce meaningful selection changes when required.
- Avoid parsing internal SVG IDs.

## Combined Mistakes and Future References

### Incorrect Trackball Property

Incorrect:

```typescript
trackball: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true,
    trackLineSettings: {
        visible: true
    }
}
```

### Incorrect Tooltip Property

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true
}
```

### Missing Tooltip Module

Correct TypeScript setup:

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

### Incorrect Rendering Event Name

Incorrect:

```typescript
pointRender: (
    args: any
): void => {
}
```

Correct:

```typescript
pointRendering: (
    args:
        IPointRenderingEventArgs
): void => {
}
```

### Rendering Event Described as Mouse Event

`pointRendering` runs while points are rendered. It is not a hover, click, or selection event.

### Unnecessary Tooltip Injection

Incorrect when only point rendering is used:

```typescript
Sparkline.Inject(
    SparklineTooltip
);
```

Tooltip injection is required only when tooltip or tracker-line functionality is enabled.

### Unsupported Built-In Selection

Do not document properties such as:

```typescript
selectionMode: 'Point'
```

unless the installed Sparkline API explicitly introduces and supports them.

### Missing Category valueType

Incorrect:

```typescript
dataSource: performanceData,
xName: 'month',
yName: 'score'
```

Correct:

```typescript
valueType: 'Category',
dataSource: performanceData,
xName: 'month',
yName: 'score'
```

### Missing DateTime valueType

Incorrect:

```typescript
dataSource: priceData,
xName: 'date',
yName: 'price'
```

Correct:

```typescript
valueType: 'DateTime',
dataSource: priceData,
xName: 'date',
yName: 'price'
```

### Multi-Value Datasource Assumption

A datasource can contain both `actual` and `target`, but Sparkline plots only the field mapped through `yName`.

Use:

```typescript
yName: 'actual'
```

and represent a constant target with:

```typescript
axisSettings: {
    value: 120,
    lineSettings: {
        visible: true
    }
}
```

### Interaction Validation Checklist

Before generating a Sparkline interaction example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. Tooltip usage imports `SparklineTooltip`.
4. Tooltip usage injects `SparklineTooltip`.
5. Tooltip configuration uses `tooltipSettings`.
6. Tooltip visibility uses `visible`.
7. Tracker-line configuration uses `trackLineSettings`.
8. A root-level `trackball` property is not used.
9. A root-level `tooltip` property is not used.
10. Tooltip format uses validated placeholders.
11. `pointRendering` uses the correct event name.
12. Rendering events are not described as mouse events.
13. Typed event arguments are used when available.
14. Tooltip injection is omitted when no tooltip is used.
15. Built-in point selection is not claimed without API support.
16. Custom selection uses native controls and application state.
17. Category data uses `valueType: 'Category'`.
18. DateTime data uses `valueType: 'DateTime'`.
19. Numeric data uses `valueType: 'Numeric'`.
20. DateTime values are JavaScript `Date` objects.
21. `xName` matches the datasource x-field.
22. `yName` matches the datasource y-field.
23. Multi-value data does not imply multiple Sparkline series.
24. Runtime interaction updates call `dataBind()`.
25. Related updates are batched.
26. Tooltips are not the only source of exact data.
27. Native controls are used for keyboard actions.
28. Internal generated SVG identifiers are not used as stable APIs.
29. The host exists before `appendTo()`.
30. The host has sufficient width and height.
31. The final TypeScript and JavaScript examples are complete and runnable.
32. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.