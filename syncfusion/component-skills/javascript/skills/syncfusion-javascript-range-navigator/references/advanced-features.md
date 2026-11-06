# Advanced Features and Integration

## Overview

The EJ2 Range Navigator supports image and document export, browser printing, Chart synchronization, accessibility-oriented host configuration, large-data optimization, and real-time data updates.

The following corrections have been applied to the original material:

- `ImageExport` does not need to be injected into `RangeNavigator`.
- Range Navigator export supports `JPEG`, `PNG`, `SVG`, and `PDF`.
- The export method does not accept custom width and height as its third and fourth arguments.
- The third export argument is PDF orientation.
- A file name should generally be passed without manually appending the extension.
- `print()` is the supported direct-print method.
- Manually copying only `outerHTML` into another window does not reliably preserve the generated SVG styles, scripts, or application state.
- `enableLightweightMode` is not a supported Range Navigator property.
- Range Navigator does not provide virtual scrolling.
- Range Navigator series do not support the regular Chart series `name` property.
- The Range Navigator tooltip does not support Chart-style `{x}` and `{y}` point formatting.
- Tooltip support requires the `RangeTooltip` module.
- Period Selector support requires the `PeriodSelector` module.
- Chart synchronization can directly use `args.zoomFactor` and `args.zoomPosition`.
- Expensive range-change handlers should use `enableDeferredUpdate: true`.
- Large datasets should be aggregated, sampled, or decimated before binding.
- Real-time updates should use controlled batching and `dataBind()` or `refresh()` rather than rebuilding the component.
- The host element can be given an accessible label, but unsupported keyboard behavior must not be documented without validating it in the target EJ2 version.

The rendered Range Navigator can be exported as JPEG, PNG, SVG, or PDF and printed through its public methods.

## Table of Contents

- #export-functionality
  - #supported-export-formats
  - #typescript-export
  - #javascript-export
  - #pdf-orientation
  - #exporting-multiple-controls
  - #export-file-naming
- #print-support
  - #typescript-print
  - #javascript-print
  - #print-styles
  - #printing-with-surrounding-content
- #accessibility-features
  - #host-element-labeling
  - #accessible-controls
  - #selection-announcements
  - #color-and-label-accessibility
  - #keyboard-interaction-guidance
- #chart-integration
  - #zoom-based-synchronization
  - #data-filtering-synchronization
  - #complete-chart-integration
- #performance-optimization
  - #unsupported-lightweight-mode
  - #deferred-range-updates
  - #disable-animation
  - #data-decimation
  - #minimum-and-maximum-aggregation
  - #real-time-update-batching
  - #component-cleanup
- #common-use-cases
  - #stock-price-analysis
  - #historical-data-browser
  - #real-time-data-monitoring
- #complete-typescript-example
- #complete-javascript-example
- #troubleshooting
- #combined-mistakes-and-future-references

## Export Functionality

The Range Navigator `export` method exports the rendered control.

Supported formats are:

```text
JPEG
PNG
SVG
PDF
```

The documented export parameters include:

1. Export type
2. File name
3. PDF orientation
4. Control collection

PDF orientation applies only when the export type is `PDF`.

### Supported Export Formats

PNG:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator'
);
```

JPEG:

```typescript
rangeNavigator.export(
    'JPEG',
    'range-navigator'
);
```

SVG:

```typescript
rangeNavigator.export(
    'SVG',
    'range-navigator'
);
```

PDF:

```typescript
rangeNavigator.export(
    'PDF',
    'range-navigator',
    'Landscape'
);
```

Do not manually add the file extension unless the application has verified that behavior for its EJ2 version.

Preferred:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator'
);
```

Avoid:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator.png'
);
```

### TypeScript Export

No `ImageExport` injection is required for the Range Navigator export method.

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Range Navigator Export</title>

    <style>
        body {
            margin: 24px;
            font-family: "Segoe UI", sans-serif;
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .toolbar button {
            padding: 8px 14px;
            cursor: pointer;
        }

        #range {
            width: 100%;
            min-height: 250px;
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <button id="export-png" type="button">
            Export PNG
        </button>

        <button id="export-jpeg" type="button">
            Export JPEG
        </button>

        <button id="export-svg" type="button">
            Export SVG
        </button>

        <button id="export-pdf" type="button">
            Export PDF
        </button>
    </div>

    <div id="range"></div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);

const data: RangeData[] = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 1, 1), value: 24 },
    { date: new Date(2023, 2, 1), value: 36 },
    { date: new Date(2023, 3, 1), value: 38 },
    { date: new Date(2023, 4, 1), value: 54 },
    { date: new Date(2023, 5, 1), value: 48 },
    { date: new Date(2023, 6, 1), value: 62 },
    { date: new Date(2023, 7, 1), value: 58 },
    { date: new Date(2023, 8, 1), value: 70 },
    { date: new Date(2023, 9, 1), value: 76 },
    { date: new Date(2023, 10, 1), value: 72 },
    { date: new Date(2023, 11, 1), value: 85 }
];

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        width: '100%',
        height: '250px',
        valueType: 'DateTime',
        value: [
            new Date(2023, 2, 1),
            new Date(2023, 9, 1)
        ],
        labelFormat: 'MMM-yy',
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                fill: '#2563EB',
                width: 2,
                animation: {
                    enable: false
                }
            }
        ]
    });

rangeNavigator.appendTo('#range');

const bindButton = (
    selector: string,
    handler: () => void
): void => {
    const button: HTMLButtonElement | null =
        document.querySelector(selector);

    if (button) {
        button.addEventListener(
            'click',
            handler
        );
    }
};

bindButton(
    '#export-png',
    (): void => {
        rangeNavigator.export(
            'PNG',
            'range-navigator'
        );
    }
);

bindButton(
    '#export-jpeg',
    (): void => {
        rangeNavigator.export(
            'JPEG',
            'range-navigator'
        );
    }
);

bindButton(
    '#export-svg',
    (): void => {
        rangeNavigator.export(
            'SVG',
            'range-navigator'
        );
    }
);

bindButton(
    '#export-pdf',
    (): void => {
        rangeNavigator.export(
            'PDF',
            'range-navigator',
            'Landscape'
        );
    }
);
```

### JavaScript Export

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Range Navigator Export</title>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div>
        <button id="export-png" type="button">
            Export PNG
        </button>

        <button id="export-svg" type="button">
            Export SVG
        </button>

        <button id="export-pdf" type="button">
            Export PDF
        </button>
    </div>

    <div id="range"></div>

    <script>
        var data = [
            { date: new Date(2023, 0, 1), value: 21 },
            { date: new Date(2023, 1, 1), value: 24 },
            { date: new Date(2023, 2, 1), value: 36 },
            { date: new Date(2023, 3, 1), value: 38 },
            { date: new Date(2023, 4, 1), value: 54 },
            { date: new Date(2023, 5, 1), value: 48 },
            { date: new Date(2023, 6, 1), value: 62 }
        ];

        var rangeNavigator =
            new ej.charts.RangeNavigator({
                valueType: 'DateTime',
                value: [
                    new Date(2023, 1, 1),
                    new Date(2023, 5, 1)
                ],
                labelFormat: 'MMM-yy',
                series: [
                    {
                        dataSource: data,
                        xName: 'date',
                        yName: 'value',
                        type: 'Area',
                        fill: '#2563EB',
                        width: 2,
                        animation: {
                            enable: false
                        }
                    }
                ]
            });

        rangeNavigator.appendTo('#range');

        document
            .getElementById('export-png')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.export(
                        'PNG',
                        'range-navigator'
                    );
                }
            );

        document
            .getElementById('export-svg')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.export(
                        'SVG',
                        'range-navigator'
                    );
                }
            );

        document
            .getElementById('export-pdf')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.export(
                        'PDF',
                        'range-navigator',
                        'Landscape'
                    );
                }
            );
    </script>
</body>
</html>
```

### PDF Orientation

PDF export accepts an orientation argument.

Landscape:

```typescript
rangeNavigator.export(
    'PDF',
    'range-navigator',
    'Landscape'
);
```

Portrait:

```typescript
rangeNavigator.export(
    'PDF',
    'range-navigator',
    'Portrait'
);
```

Orientation is relevant only for PDF exports.

### Exporting Multiple Controls

The export method can receive a collection of controls.

```typescript
rangeNavigator.export(
    'PNG',
    'range-report',
    undefined,
    [
        rangeNavigator
    ]
);
```

For a Range Navigator and Chart:

```typescript
rangeNavigator.export(
    'PNG',
    'chart-range-report',
    undefined,
    [
        chart,
        rangeNavigator
    ]
);
```

The controls must already be rendered before export is initiated.

### Export File Naming

Create a file-system-safe name.

```typescript
const formatFileDate = (
    value: Date
): string => {
    const year: number =
        value.getFullYear();

    const month: string =
        String(
            value.getMonth() + 1
        ).padStart(2, '0');

    const day: string =
        String(
            value.getDate()
        ).padStart(2, '0');

    return `${year}-${month}-${day}`;
};
```

Use the selected range:

```typescript
changed: (
    args: IChangedEventArgs
): void => {
    if (
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    const fileName: string =
        `range-${formatFileDate(args.start)}` +
        `-to-${formatFileDate(args.end)}`;

    console.log(fileName);
}
```

Do not automatically export inside every `changed` event. Continuous dragging can trigger many exports when deferred updates are disabled.

Preferred behavior:

1. Store the latest range.
2. Let the user select the range.
3. Export only after the user activates an export button.

## Print Support

The Range Navigator can be printed through its public `print()` method.

### TypeScript Print

```typescript
const printButton: HTMLButtonElement | null =
    document.querySelector('#print-range');

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            rangeNavigator.print();
        }
    );
}
```

Complete button:

```html
<button id="print-range" type="button">
    Print Range Navigator
</button>
```

### JavaScript Print

```javascript
document
    .getElementById('print-range')
    .addEventListener(
        'click',
        function () {
            rangeNavigator.print();
        }
    );
```

### Print Styles

Use print-specific CSS to hide application controls and preserve the visualization.

```css
@media print {
    body {
        margin: 0;
        background: #FFFFFF;
    }

    .application-toolbar {
        display: none;
    }

    .range-report {
        width: 100%;
        break-inside: avoid;
        page-break-inside: avoid;
    }

    #range {
        width: 100% !important;
    }
}
```

Use the actual rendered element ID:

```html
<div id="range"></div>
```

Do not write print CSS for `#range-navigator` if the control is attached to `#range`.

### Printing With Surrounding Content

The built-in `print()` method is the support-safe approach when only the Range Navigator must be printed.

For a report containing a title, description, Chart, and Range Navigator, print the existing report container through normal browser print behavior.

```html
<div id="report">
    <h2>Sales Range Report</h2>

    <p>
        Select a range before printing the report.
    </p>

    <div id="chart"></div>
    <div id="range"></div>
</div>
```

```typescript
const printReportButton: HTMLButtonElement | null =
    document.querySelector('#print-report');

if (printReportButton) {
    printReportButton.addEventListener(
        'click',
        (): void => {
            window.print();
        }
    );
}
```

Use print CSS to hide unrelated content:

```css
@media print {
    body * {
        visibility: hidden;
    }

    #report,
    #report * {
        visibility: visible;
    }

    #report {
        position: absolute;
        inset: 0;
        width: 100%;
    }
}
```

Avoid copying only `outerHTML` into a new window:

```typescript
printWindow.document.write(
    rangeElement.outerHTML
);
```

That approach can omit:

- Theme styles
- Generated SVG dependencies
- Font declarations
- Current application styling
- Required document structure
- Runtime state
- Print-ready layout rules

## Accessibility Features

Accessibility must be addressed through the component configuration, host markup, descriptive controls, readable labels, sufficient contrast, and status announcements.

Do not claim support for a specific keyboard command unless that command has been validated against the installed EJ2 version.

### Host Element Labeling

Wrap the component in a labeled region:

```html
<section
    aria-labelledby="range-heading"
    class="range-section"
>
    <h2 id="range-heading">
        Sales date range
    </h2>

    <p id="range-instructions">
        Adjust the selected date range to filter
        the sales chart.
    </p>

    <div
        id="range"
        aria-describedby="range-instructions"
    ></div>
</section>
```

Do not automatically set:

```html
role="application"
```

The `application` role changes how assistive technologies interpret keyboard input and should be used only when its behavior has been specifically designed and tested.

Prefer structural HTML:

```html
<section aria-labelledby="range-heading">
```

### Accessible Controls

Export and print buttons require clear accessible names.

```html
<button
    id="export-png"
    type="button"
    aria-label="Export selected sales range as PNG"
>
    Export PNG
</button>

<button
    id="print-range"
    type="button"
    aria-label="Print the sales range navigator"
>
    Print
</button>
```

Use native buttons rather than clickable `div` elements.

Avoid:

```html
<div onclick="printRange()">
    Print
</div>
```

Use:

```html
<button id="print-range" type="button">
    Print
</button>
```

### Selection Announcements

Add an `aria-live` region to announce the selected range.

```html
<p
    id="range-status"
    role="status"
    aria-live="polite"
>
</p>
```

Update it through the `changed` event:

```typescript
const rangeStatus: HTMLElement | null =
    document.querySelector('#range-status');

const dateFormatter: Intl.DateTimeFormat =
    new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );

const announceSelection = (
    args: IChangedEventArgs
): void => {
    if (
        !rangeStatus ||
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    rangeStatus.textContent =
        `Selected range from ` +
        `${dateFormatter.format(args.start)} to ` +
        `${dateFormatter.format(args.end)}.`;
};
```

### Color and Label Accessibility

Do not use color as the only way to communicate selection.

Use:

- Visible slider thumbs
- Clear selected and unselected regions
- Readable labels
- A live text summary
- Sufficient contrast
- Clear focus appearance for external buttons

Example:

```typescript
labelStyle: {
    size: '14px',
    color: '#111827',
    fontFamily: 'Segoe UI',
    fontWeight: '600'
},
navigatorStyleSettings: {
    selectedRegionColor:
        'rgba(37, 99, 235, 0.28)',
    unselectedRegionColor:
        'rgba(107, 114, 128, 0.18)',
    thumb: {
        type: 'Rectangle',
        width: 16,
        height: 26,
        fill: '#FFFFFF',
        border: {
            color: '#1D4ED8',
            width: 2
        }
    }
}
```

Do not use unsupported Range Navigator series properties for accessibility:

```typescript
series: [
    {
        name: 'Monthly Sales Revenue'
    }
]
```

`name` belongs to regular Chart series scenarios and is not part of the validated Range Navigator series configuration.

### Keyboard Interaction Guidance

Do not document the following as guaranteed without direct version-specific validation:

```text
Tab focuses the Range Navigator.
Arrow keys adjust the thumbs.
Enter confirms the selection.
```

Support-safe guidance:

- Use native keyboard-accessible buttons for export, print, reset, and preset ranges.
- Ensure no external element traps keyboard focus.
- Validate slider keyboard behavior in the installed EJ2 version.
- Test with the supported browsers and assistive technologies required by the application.
- Provide preset range buttons if keyboard-only operation is a strict requirement.
- Provide a textual status update whenever the selected range changes.

## Chart Integration

The `changed` event provides `zoomFactor` and `zoomPosition`. These values can be assigned directly to a related Chart x-axis.

There is no need to create undefined helper functions such as:

```typescript
calculateZoomFactor(
    args.start,
    args.end
);
```

Use:

```typescript
args.zoomFactor
```

and:

```typescript
args.zoomPosition
```

### Zoom-Based Synchronization

Required modules must be injected separately into `Chart` and `RangeNavigator`.

```typescript
import {
    AreaSeries,
    Chart,
    DateTime,
    IChangedEventArgs,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

Chart.Inject(
    DateTime,
    LineSeries
);

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

Create the Chart:

```typescript
const chart: Chart = new Chart({
    height: '350px',
    primaryXAxis: {
        valueType: 'DateTime',
        edgeLabelPlacement: 'Shift'
    },
    primaryYAxis: {
        labelFormat: '${value}'
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Line',
            width: 2
        }
    ]
});

chart.appendTo('#chart');
```

Create the Range Navigator:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        valueType: 'DateTime',
        value: [
            new Date(2023, 2, 1),
            new Date(2023, 9, 1)
        ],
        enableDeferredUpdate: false,
        changed: (
            args: IChangedEventArgs
        ): void => {
            chart.primaryXAxis.zoomFactor =
                args.zoomFactor;

            chart.primaryXAxis.zoomPosition =
                args.zoomPosition;

            chart.dataBind();
        },
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                width: 2
            }
        ]
    });

rangeNavigator.appendTo('#range');
```

Use `dataBind()` for property updates. Do not call `refresh()` during every drag movement unless a complete rerender is necessary.

### Data-Filtering Synchronization

Filtering replaces the Chart datasource with only selected records.

```typescript
const handleRangeChange = (
    args: IChangedEventArgs
): void => {
    if (
        !(args.start instanceof Date) ||
        !(args.end instanceof Date)
    ) {
        return;
    }

    const startTime: number =
        args.start.getTime();

    const endTime: number =
        args.end.getTime();

    const filteredData: RangeData[] =
        data.filter(
            (item: RangeData): boolean => {
                const currentTime: number =
                    item.date.getTime();

                return (
                    currentTime >= startTime &&
                    currentTime <= endTime
                );
            }
        );

    chart.series[0].dataSource =
        filteredData;

    chart.dataBind();
};
```

Use filtering when:

- The related component does not support zoom properties.
- The selected collection must be sent to another service.
- Only selected records must appear in a Grid.
- Calculations must run against the selected dataset.

Use zoom synchronization when:

- The Chart and Range Navigator use the same complete dataset.
- Smooth interaction is important.
- Repeated array filtering would be expensive.

### Complete Chart Integration

#### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Chart and Range Navigator Integration</title>

    <style>
        body {
            margin: 24px;
            font-family: "Segoe UI", sans-serif;
        }

        .visualization-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
        }

        #chart {
            min-height: 350px;
        }

        #range {
            min-height: 200px;
            margin-top: 16px;
        }
    </style>
</head>
<body>
    <main class="visualization-container">
        <h1>Sales Analysis</h1>

        <p id="range-status" role="status" aria-live="polite">
            Adjust the range to update the chart.
        </p>

        <div id="chart"></div>
        <div id="range"></div>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    AreaSeries,
    Chart,
    DateTime,
    IChangedEventArgs,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

Chart.Inject(
    DateTime,
    LineSeries
);

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);

const data: RangeData[] = [
    { date: new Date(2023, 0, 1), value: 42 },
    { date: new Date(2023, 1, 1), value: 48 },
    { date: new Date(2023, 2, 1), value: 45 },
    { date: new Date(2023, 3, 1), value: 56 },
    { date: new Date(2023, 4, 1), value: 62 },
    { date: new Date(2023, 5, 1), value: 59 },
    { date: new Date(2023, 6, 1), value: 68 },
    { date: new Date(2023, 7, 1), value: 72 },
    { date: new Date(2023, 8, 1), value: 69 },
    { date: new Date(2023, 9, 1), value: 78 },
    { date: new Date(2023, 10, 1), value: 81 },
    { date: new Date(2023, 11, 1), value: 88 }
];

const rangeStatus: HTMLElement | null =
    document.querySelector('#range-status');

const dateFormatter: Intl.DateTimeFormat =
    new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: 'long'
        }
    );

const chart: Chart = new Chart({
    width: '100%',
    height: '350px',
    title: 'Monthly Sales',
    primaryXAxis: {
        valueType: 'DateTime',
        labelFormat: 'MMM-yy',
        edgeLabelPlacement: 'Shift'
    },
    primaryYAxis: {
        title: 'Sales',
        minimum: 0
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Line',
            width: 2
        }
    ]
});

chart.appendTo('#chart');

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        width: '100%',
        height: '200px',
        valueType: 'DateTime',
        value: [
            new Date(2023, 2, 1),
            new Date(2023, 9, 1)
        ],
        labelFormat: 'MMM-yy',
        enableDeferredUpdate: false,
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                fill: '#60A5FA',
                width: 2,
                animation: {
                    enable: false
                }
            }
        ],
        changed: (
            args: IChangedEventArgs
        ): void => {
            chart.primaryXAxis.zoomFactor =
                args.zoomFactor;

            chart.primaryXAxis.zoomPosition =
                args.zoomPosition;

            chart.dataBind();

            if (
                rangeStatus &&
                args.start instanceof Date &&
                args.end instanceof Date
            ) {
                rangeStatus.textContent =
                    `Showing sales from ` +
                    `${dateFormatter.format(args.start)} ` +
                    `through ` +
                    `${dateFormatter.format(args.end)}.`;
            }
        }
    });

rangeNavigator.appendTo('#range');
```

## Performance Optimization

### Unsupported Lightweight Mode

Do not use:

```typescript
enableLightweightMode: true
```

This property is not part of the validated EJ2 Range Navigator model.

Do not document a guaranteed data-point threshold such as:

```text
Recommended for 100,000 or more points.
```

Performance depends on the browser, device, interval density, rendering configuration, event handlers, and surrounding components.

### Deferred Range Updates

When a `changed` handler performs expensive work, enable deferred updates:

```typescript
enableDeferredUpdate: true
```

Example:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        enableDeferredUpdate: true,
        changed: (
            args: IChangedEventArgs
        ): void => {
            updateDashboard(
                args.start,
                args.end
            );
        }
    });
```

When it is `true`, the range-change work occurs after dragging is completed rather than continuously during thumb movement.

### Disable Animation

Set the component animation duration to zero:

```typescript
animationDuration: 0
```

Disable series animation:

```typescript
series: [
    {
        dataSource: data,
        xName: 'date',
        yName: 'value',
        type: 'Area',
        animation: {
            enable: false,
            duration: 0
        }
    }
]
```

Performance-oriented setup:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        animationDuration: 0,
        enableDeferredUpdate: true,
        series: [
            {
                dataSource: optimizedData,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                animation: {
                    enable: false,
                    duration: 0
                }
            }
        ]
    });
```

### Data Decimation

Simple interval sampling:

```typescript
const decimateData = <T>(
    source: T[],
    factor: number
): T[] => {
    if (factor <= 1) {
        return source.slice();
    }

    const result: T[] = [];

    for (
        let index: number = 0;
        index < source.length;
        index += factor
    ) {
        result.push(source[index]);
    }

    const lastItem: T | undefined =
        source[source.length - 1];

    if (
        lastItem !== undefined &&
        result[result.length - 1] !== lastItem
    ) {
        result.push(lastItem);
    }

    return result;
};
```

Usage:

```typescript
const visualData: RangeData[] =
    decimateData(
        largeData,
        100
    );
```

Simple sampling is fast, but it can miss peaks and troughs between sampled points.

### Minimum and Maximum Aggregation

For financial and monitoring data, preserving local minimum and maximum values is safer than selecting only every nth point.

```typescript
const aggregateMinMax = (
    source: RangeData[],
    bucketSize: number
): RangeData[] => {
    if (bucketSize <= 1) {
        return source.slice();
    }

    const result: RangeData[] = [];

    for (
        let index: number = 0;
        index < source.length;
        index += bucketSize
    ) {
        const bucket: RangeData[] =
            source.slice(
                index,
                index + bucketSize
            );

        if (bucket.length === 0) {
            continue;
        }

        let minimum: RangeData = bucket[0];
        let maximum: RangeData = bucket[0];

        for (
            let bucketIndex: number = 1;
            bucketIndex < bucket.length;
            bucketIndex++
        ) {
            const current: RangeData =
                bucket[bucketIndex];

            if (current.value < minimum.value) {
                minimum = current;
            }

            if (current.value > maximum.value) {
                maximum = current;
            }
        }

        if (
            minimum.date.getTime() <=
            maximum.date.getTime()
        ) {
            result.push(minimum);

            if (maximum !== minimum) {
                result.push(maximum);
            }
        } else {
            result.push(maximum);

            if (maximum !== minimum) {
                result.push(minimum);
            }
        }
    }

    return result;
};
```

Usage:

```typescript
const optimizedData: RangeData[] =
    aggregateMinMax(
        largeData,
        100
    );
```

### Real-Time Update Batching

Avoid refreshing for every incoming record:

```typescript
setInterval(
    (): void => {
        rangeNavigator.refresh();
    },
    1000
);
```

If records arrive frequently, batch them.

```typescript
const pendingData: RangeData[] = [];

const queuePoint = (
    point: RangeData
): void => {
    pendingData.push(point);
};
```

Apply the batch at a controlled interval:

```typescript
const updateTimer: number =
    window.setInterval(
        (): void => {
            if (pendingData.length === 0) {
                return;
            }

            data.push(
                ...pendingData.splice(
                    0,
                    pendingData.length
                )
            );

            const maximumPoints: number = 1000;

            if (data.length > maximumPoints) {
                data.splice(
                    0,
                    data.length - maximumPoints
                );
            }

            rangeNavigator.series[0].dataSource =
                data;

            rangeNavigator.dataBind();
        },
        1000
    );
```

Store the timer ID so it can be cleared later.

### Component Cleanup

Clear timers and destroy instances when the page or containing view is removed.

```typescript
window.clearInterval(updateTimer);

rangeNavigator.destroy();
chart.destroy();
```

For a single-page application, execute cleanup during the framework or router unmount lifecycle.

Do not repeatedly create Range Navigator instances on the same element without destroying the existing instance.

## Common Use Cases

### Stock Price Analysis

Required imports:

```typescript
import {
    AreaSeries,
    DateTime,
    IChangedEventArgs,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

Configuration:

```typescript
const stockRange: RangeNavigator =
    new RangeNavigator({
        valueType: 'DateTime',
        value: [
            new Date(2023, 2, 1),
            new Date(2023, 9, 1)
        ],
        labelFormat: 'dd-MMM',
        enableDeferredUpdate: true,
        series: [
            {
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                type: 'Area',
                fill: '#2563EB',
                width: 2
            }
        ],
        changed: (
            args: IChangedEventArgs
        ): void => {
            updateTechnicalIndicators(
                args.start,
                args.end
            );
        }
    });

stockRange.appendTo('#range');
```

Do not add:

```typescript
name: 'Stock Price'
```

to a Range Navigator series unless the installed API explicitly supports it.

### Historical Data Browser

Required modules:

```typescript
import {
    AreaSeries,
    DateTime,
    PeriodSelector,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector
);
```

Configuration:

```typescript
const historicalRange: RangeNavigator =
    new RangeNavigator({
        valueType: 'DateTime',
        labelFormat: 'MMM-yy',
        animationDuration: 0,
        enableDeferredUpdate: true,
        periodSelectorSettings: {
            position: 'Top',
            periods: [
                {
                    text: '3M',
                    interval: 3,
                    intervalType: 'Months'
                },
                {
                    text: '6M',
                    interval: 6,
                    intervalType: 'Months'
                },
                {
                    text: '1Y',
                    interval: 1,
                    intervalType: 'Years'
                },
                {
                    text: '5Y',
                    interval: 5,
                    intervalType: 'Years'
                },
                {
                    text: 'All'
                }
            ]
        },
        series: [
            {
                dataSource: optimizedHistoricalData,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                animation: {
                    enable: false
                }
            }
        ]
    });

historicalRange.appendTo('#range');
```

### Real-Time Data Monitoring

Required modules:

```typescript
import {
    DateTime,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    DateTime,
    LineSeries
);
```

Configuration:

```typescript
const realtimeData: RangeData[] = [];

const realtimeRange: RangeNavigator =
    new RangeNavigator({
        valueType: 'DateTime',
        animationDuration: 0,
        enableDeferredUpdate: true,
        series: [
            {
                dataSource: realtimeData,
                xName: 'date',
                yName: 'value',
                type: 'Line',
                width: 2,
                animation: {
                    enable: false
                }
            }
        ]
    });

realtimeRange.appendTo('#range');
```

Batch updates:

```typescript
const realtimeTimer: number =
    window.setInterval(
        (): void => {
            const newPoint: RangeData =
                getLatestDataPoint();

            realtimeData.push(newPoint);

            const maximumPoints: number = 500;

            if (
                realtimeData.length >
                maximumPoints
            ) {
                realtimeData.shift();
            }

            realtimeRange.series[0].dataSource =
                realtimeData;

            realtimeRange.dataBind();
        },
        1000
    );
```

`getLatestDataPoint()` must be implemented by the application. Do not include an undefined placeholder in a runnable sample.

## Complete TypeScript Example

This example includes:

- Range Navigator
- Chart synchronization
- PNG, SVG, and PDF export
- Printing
- Period Selector
- Range Tooltip
- Accessible status updates
- Deferred updates
- Valid imports and module injection

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

    <title>Advanced Range Navigator Integration</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            color: #111827;
            background: #F8FAFC;
            font-family: "Segoe UI", sans-serif;
        }

        .report {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .toolbar button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        .toolbar button:focus-visible {
            outline: 3px solid #93C5FD;
            outline-offset: 2px;
        }

        #chart {
            min-height: 350px;
        }

        #range {
            min-height: 240px;
            margin-top: 16px;
        }

        #range-status {
            min-height: 24px;
            font-weight: 600;
        }

        @media print {
            body {
                padding: 0;
                background: #FFFFFF;
            }

            .toolbar {
                display: none;
            }

            .report {
                max-width: none;
                border: 0;
                padding: 0;
            }

            #chart,
            #range {
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <main id="report" class="report">
        <h1>Sales Range Report</h1>

        <p id="range-instructions">
            Select a predefined period or move the
            range thumbs to update the sales chart.
        </p>

        <div class="toolbar">
            <button
                id="export-png"
                type="button"
                aria-label="Export the chart and range navigator as PNG"
            >
                Export PNG
            </button>

            <button
                id="export-svg"
                type="button"
                aria-label="Export the chart and range navigator as SVG"
            >
                Export SVG
            </button>

            <button
                id="export-pdf"
                type="button"
                aria-label="Export the chart and range navigator as PDF"
            >
                Export PDF
            </button>

            <button
                id="print-range"
                type="button"
                aria-label="Print the range navigator"
            >
                Print Range
            </button>

            <button
                id="print-report"
                type="button"
                aria-label="Print the complete sales report"
            >
                Print Report
            </button>
        </div>

        <p
            id="range-status"
            role="status"
            aria-live="polite"
        >
            Current selection will appear here.
        </p>

        <div id="chart"></div>

        <section aria-labelledby="range-heading">
            <h2 id="range-heading">
                Sales date range
            </h2>

            <div
                id="range"
                aria-describedby="range-instructions"
            ></div>
        </section>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    AreaSeries,
    Chart,
    DateTime,
    IChangedEventArgs,
    LineSeries,
    PeriodSelector,
    RangeNavigator,
    RangeTooltip
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

Chart.Inject(
    DateTime,
    LineSeries
);

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector,
    RangeTooltip
);

const data: RangeData[] = [
    { date: new Date(2022, 0, 1), value: 42 },
    { date: new Date(2022, 1, 1), value: 48 },
    { date: new Date(2022, 2, 1), value: 45 },
    { date: new Date(2022, 3, 1), value: 56 },
    { date: new Date(2022, 4, 1), value: 62 },
    { date: new Date(2022, 5, 1), value: 59 },
    { date: new Date(2022, 6, 1), value: 68 },
    { date: new Date(2022, 7, 1), value: 72 },
    { date: new Date(2022, 8, 1), value: 69 },
    { date: new Date(2022, 9, 1), value: 78 },
    { date: new Date(2022, 10, 1), value: 81 },
    { date: new Date(2022, 11, 1), value: 88 },
    { date: new Date(2023, 0, 1), value: 84 },
    { date: new Date(2023, 1, 1), value: 91 },
    { date: new Date(2023, 2, 1), value: 96 },
    { date: new Date(2023, 3, 1), value: 93 },
    { date: new Date(2023, 4, 1), value: 101 },
    { date: new Date(2023, 5, 1), value: 108 },
    { date: new Date(2023, 6, 1), value: 105 },
    { date: new Date(2023, 7, 1), value: 112 },
    { date: new Date(2023, 8, 1), value: 118 },
    { date: new Date(2023, 9, 1), value: 121 },
    { date: new Date(2023, 10, 1), value: 117 },
    { date: new Date(2023, 11, 1), value: 126 }
];

const rangeStatus: HTMLElement | null =
    document.querySelector('#range-status');

const dateFormatter: Intl.DateTimeFormat =
    new Intl.DateTimeFormat(
        'en-US',
        {
            year: 'numeric',
            month: 'long'
        }
    );

const chart: Chart = new Chart({
    width: '100%',
    height: '350px',
    title: 'Monthly Sales',
    primaryXAxis: {
        valueType: 'DateTime',
        labelFormat: 'MMM-yy',
        edgeLabelPlacement: 'Shift'
    },
    primaryYAxis: {
        title: 'Sales',
        minimum: 0
    },
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Line',
            width: 2,
            animation: {
                enable: false
            }
        }
    ]
});

chart.appendTo('#chart');

const rangeNavigator: RangeNavigator =
    new RangeNavigator({
        width: '100%',
        height: '240px',
        animationDuration: 0,
        enableDeferredUpdate: true,
        valueType: 'DateTime',
        value: [
            new Date(2023, 0, 1),
            new Date(2023, 11, 1)
        ],
        labelFormat: 'MMM-yy',
        labelIntersectAction: 'Hide',
        tooltip: {
            enable: true,
            displayMode: 'Always',
            fill: '#111827',
            opacity: 0.92,
            labelFormat: 'MMM yyyy',
            textStyle: {
                color: '#FFFFFF',
                size: '12px'
            }
        },
        periodSelectorSettings: {
            position: 'Top',
            periods: [
                {
                    text: '1M',
                    interval: 1,
                    intervalType: 'Months'
                },
                {
                    text: '3M',
                    interval: 3,
                    intervalType: 'Months'
                },
                {
                    text: '6M',
                    interval: 6,
                    intervalType: 'Months'
                },
                {
                    text: '1Y',
                    interval: 1,
                    intervalType: 'Years',
                    selected: true
                },
                {
                    text: 'YTD'
                },
                {
                    text: 'All'
                }
            ]
        },
        navigatorStyleSettings: {
            selectedRegionColor:
                'rgba(37, 99, 235, 0.24)',
            unselectedRegionColor:
                'rgba(107, 114, 128, 0.18)',
            thumb: {
                type: 'Rectangle',
                width: 16,
                height: 26,
                fill: '#FFFFFF',
                border: {
                    color: '#1D4ED8',
                    width: 2
                }
            }
        },
        series: [
            {
                dataSource: data,
                xName: 'date',
                yName: 'value',
                type: 'Area',
                fill: '#60A5FA',
                width: 2,
                animation: {
                    enable: false
                }
            }
        ],
        changed: (
            args: IChangedEventArgs
        ): void => {
            chart.primaryXAxis.zoomFactor =
                args.zoomFactor;

            chart.primaryXAxis.zoomPosition =
                args.zoomPosition;

            chart.dataBind();

            if (
                rangeStatus &&
                args.start instanceof Date &&
                args.end instanceof Date
            ) {
                const selectedPeriod: string =
                    args.selectedPeriod ||
                    'Custom range';

                rangeStatus.textContent =
                    `Showing ${selectedPeriod}: ` +
                    `${dateFormatter.format(args.start)} ` +
                    `through ` +
                    `${dateFormatter.format(args.end)}.`;
            }
        }
    });

rangeNavigator.appendTo('#range');

const bindButton = (
    selector: string,
    handler: () => void
): void => {
    const button: HTMLButtonElement | null =
        document.querySelector(selector);

    if (button) {
        button.addEventListener(
            'click',
            handler
        );
    }
};

bindButton(
    '#export-png',
    (): void => {
        rangeNavigator.export(
            'PNG',
            'sales-range-report',
            undefined,
            [
                chart,
                rangeNavigator
            ]
        );
    }
);

bindButton(
    '#export-svg',
    (): void => {
        rangeNavigator.export(
            'SVG',
            'sales-range-report',
            undefined,
            [
                chart,
                rangeNavigator
            ]
        );
    }
);

bindButton(
    '#export-pdf',
    (): void => {
        rangeNavigator.export(
            'PDF',
            'sales-range-report',
            'Landscape',
            [
                chart,
                rangeNavigator
            ]
        );
    }
);

bindButton(
    '#print-range',
    (): void => {
        rangeNavigator.print();
    }
);

bindButton(
    '#print-report',
    (): void => {
        window.print();
    }
);
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

    <title>Advanced Range Navigator Integration</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            color: #111827;
            background: #F8FAFC;
            font-family: "Segoe UI", sans-serif;
        }

        .report {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .toolbar button {
            padding: 8px 14px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        #chart {
            min-height: 350px;
        }

        #range {
            min-height: 240px;
            margin-top: 16px;
        }

        @media print {
            body {
                padding: 0;
                background: #FFFFFF;
            }

            .toolbar {
                display: none;
            }

            .report {
                max-width: none;
                border: 0;
                padding: 0;
            }
        }
    </style>
</head>
<body>
    <main id="report" class="report">
        <h1>Sales Range Report</h1>

        <p id="range-instructions">
            Select a period or move the range thumbs
            to update the chart.
        </p>

        <div class="toolbar">
            <button id="export-png" type="button">
                Export PNG
            </button>

            <button id="export-svg" type="button">
                Export SVG
            </button>

            <button id="export-pdf" type="button">
                Export PDF
            </button>

            <button id="print-range" type="button">
                Print Range
            </button>

            <button id="print-report" type="button">
                Print Report
            </button>
        </div>

        <p
            id="range-status"
            role="status"
            aria-live="polite"
        >
            Current selection will appear here.
        </p>

        <div id="chart"></div>

        <section aria-labelledby="range-heading">
            <h2 id="range-heading">
                Sales date range
            </h2>

            <div
                id="range"
                aria-describedby="range-instructions"
            ></div>
        </section>
    </main>

    <script>
        var data = [
            { date: new Date(2022, 0, 1), value: 42 },
            { date: new Date(2022, 1, 1), value: 48 },
            { date: new Date(2022, 2, 1), value: 45 },
            { date: new Date(2022, 3, 1), value: 56 },
            { date: new Date(2022, 4, 1), value: 62 },
            { date: new Date(2022, 5, 1), value: 59 },
            { date: new Date(2022, 6, 1), value: 68 },
            { date: new Date(2022, 7, 1), value: 72 },
            { date: new Date(2022, 8, 1), value: 69 },
            { date: new Date(2022, 9, 1), value: 78 },
            { date: new Date(2022, 10, 1), value: 81 },
            { date: new Date(2022, 11, 1), value: 88 },
            { date: new Date(2023, 0, 1), value: 84 },
            { date: new Date(2023, 1, 1), value: 91 },
            { date: new Date(2023, 2, 1), value: 96 },
            { date: new Date(2023, 3, 1), value: 93 },
            { date: new Date(2023, 4, 1), value: 101 },
            { date: new Date(2023, 5, 1), value: 108 },
            { date: new Date(2023, 6, 1), value: 105 },
            { date: new Date(2023, 7, 1), value: 112 },
            { date: new Date(2023, 8, 1), value: 118 },
            { date: new Date(2023, 9, 1), value: 121 },
            { date: new Date(2023, 10, 1), value: 117 },
            { date: new Date(2023, 11, 1), value: 126 }
        ];

        var rangeStatus =
            document.querySelector('#range-status');

        var dateFormatter =
            new Intl.DateTimeFormat(
                'en-US',
                {
                    year: 'numeric',
                    month: 'long'
                }
            );

        var chart =
            new ej.charts.Chart({
                width: '100%',
                height: '350px',
                title: 'Monthly Sales',
                primaryXAxis: {
                    valueType: 'DateTime',
                    labelFormat: 'MMM-yy',
                    edgeLabelPlacement: 'Shift'
                },
                primaryYAxis: {
                    title: 'Sales',
                    minimum: 0
                },
                series: [
                    {
                        dataSource: data,
                        xName: 'date',
                        yName: 'value',
                        type: 'Line',
                        width: 2,
                        animation: {
                            enable: false
                        }
                    }
                ]
            });

        chart.appendTo('#chart');

        var rangeNavigator =
            new ej.charts.RangeNavigator({
                width: '100%',
                height: '240px',
                animationDuration: 0,
                enableDeferredUpdate: true,
                valueType: 'DateTime',
                value: [
                    new Date(2023, 0, 1),
                    new Date(2023, 11, 1)
                ],
                labelFormat: 'MMM-yy',
                labelIntersectAction: 'Hide',
                tooltip: {
                    enable: true,
                    displayMode: 'Always',
                    fill: '#111827',
                    opacity: 0.92,
                    labelFormat: 'MMM yyyy',
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px'
                    }
                },
                periodSelectorSettings: {
                    position: 'Top',
                    periods: [
                        {
                            text: '1M',
                            interval: 1,
                            intervalType: 'Months'
                        },
                        {
                            text: '3M',
                            interval: 3,
                            intervalType: 'Months'
                        },
                        {
                            text: '6M',
                            interval: 6,
                            intervalType: 'Months'
                        },
                        {
                            text: '1Y',
                            interval: 1,
                            intervalType: 'Years',
                            selected: true
                        },
                        {
                            text: 'YTD'
                        },
                        {
                            text: 'All'
                        }
                    ]
                },
                series: [
                    {
                        dataSource: data,
                        xName: 'date',
                        yName: 'value',
                        type: 'Area',
                        fill: '#60A5FA',
                        width: 2,
                        animation: {
                            enable: false
                        }
                    }
                ],
                changed: function (args) {
                    chart.primaryXAxis.zoomFactor =
                        args.zoomFactor;

                    chart.primaryXAxis.zoomPosition =
                        args.zoomPosition;

                    chart.dataBind();

                    if (
                        rangeStatus &&
                        args.start instanceof Date &&
                        args.end instanceof Date
                    ) {
                        var selectedPeriod =
                            args.selectedPeriod ||
                            'Custom range';

                        rangeStatus.textContent =
                            'Showing ' +
                            selectedPeriod +
                            ': ' +
                            dateFormatter.format(
                                args.start
                            ) +
                            ' through ' +
                            dateFormatter.format(
                                args.end
                            ) +
                            '.';
                    }
                }
            });

        rangeNavigator.appendTo('#range');

        document
            .getElementById('export-png')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.export(
                        'PNG',
                        'sales-range-report',
                        undefined,
                        [
                            chart,
                            rangeNavigator
                        ]
                    );
                }
            );

        document
            .getElementById('export-svg')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.export(
                        'SVG',
                        'sales-range-report',
                        undefined,
                        [
                            chart,
                            rangeNavigator
                        ]
                    );
                }
            );

        document
            .getElementById('export-pdf')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.export(
                        'PDF',
                        'sales-range-report',
                        'Landscape',
                        [
                            chart,
                            rangeNavigator
                        ]
                    );
                }
            );

        document
            .getElementById('print-range')
            .addEventListener(
                'click',
                function () {
                    rangeNavigator.print();
                }
            );

        document
            .getElementById('print-report')
            .addEventListener(
                'click',
                function () {
                    window.print();
                }
            );
    </script>
</body>
</html>
```

## Troubleshooting

### Range Navigator Does Not Render

Validate that the target element exists before calling `appendTo()`.

```typescript
const rangeElement: HTMLElement | null =
    document.querySelector('#range');

if (!rangeElement) {
    throw new Error(
        'The Range Navigator container was not found.'
    );
}
```

Then initialize:

```typescript
rangeNavigator.appendTo(rangeElement);
```

Ensure the parent has an available width:

```css
.range-container {
    width: 100%;
    min-height: 220px;
}
```

If the component is initialized in a hidden tab or dialog, call:

```typescript
rangeNavigator.refresh();
```

after the container becomes visible.

### Data Does Not Display

Verify the field mappings.

Datasource:

```typescript
const data = [
    {
        date: new Date(2023, 0, 1),
        value: 42
    }
];
```

Correct mapping:

```typescript
series: [
    {
        dataSource: data,
        xName: 'date',
        yName: 'value',
        type: 'Area'
    }
]
```

Also verify:

- `AreaSeries` is injected.
- `DateTime` is injected.
- `valueType` is `DateTime`.
- Date values are valid JavaScript `Date` objects.
- `value` lies within the datasource range.

### changed Does Not Fire as Expected

Use:

```typescript
changed: (
    args: IChangedEventArgs
): void => {
    console.log(args);
}
```

Check `enableDeferredUpdate`.

Continuous updates during dragging:

```typescript
enableDeferredUpdate: false
```

One update after dragging:

```typescript
enableDeferredUpdate: true
```

Do not immediately destroy and recreate the component as the first troubleshooting step.

### Export Does Not Work

Validate that:

1. The Range Navigator has rendered.
2. Export is triggered through a user action.
3. The export type is `JPEG`, `PNG`, `SVG`, or `PDF`.
4. PDF orientation is supplied only for PDF.
5. Controls included in the export collection are rendered.
6. The browser permits downloads.
7. The file name does not contain invalid file-system characters.

Correct:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator'
);
```

Incorrect:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator.png',
    1200,
    400
);
```

### Print Output Is Clipped

Use percentage width:

```typescript
width: '100%'
```

Add print CSS:

```css
@media print {
    #range {
        width: 100% !important;
        break-inside: avoid;
    }
}
```

Hide unrelated controls:

```css
@media print {
    .toolbar {
        display: none;
    }
}
```

### Chart Does Not Synchronize

Use the event values directly:

```typescript
chart.primaryXAxis.zoomFactor =
    args.zoomFactor;

chart.primaryXAxis.zoomPosition =
    args.zoomPosition;

chart.dataBind();
```

Verify that:

- Both components use the same x-value domain.
- Both use `DateTime`.
- The Chart has `DateTime` injected.
- The Range Navigator has `DateTime` injected.
- The Chart is created before the Range Navigator event runs.

### Performance Degrades With Large Data

Do not use:

```typescript
enableLightweightMode: true
```

Use:

```typescript
animationDuration: 0,
enableDeferredUpdate: true
```

Disable series animation:

```typescript
animation: {
    enable: false,
    duration: 0
}
```

Reduce the bound collection through:

- Sampling
- Time-bucket aggregation
- Minimum and maximum aggregation
- Server-side aggregation
- Controlled real-time batching

### Labels Overlap

Use:

```typescript
labelIntersectAction: 'Hide'
```

Shorten the format:

```typescript
labelFormat: 'MMM'
```

Reduce label size:

```typescript
labelStyle: {
    size: '11px'
}
```

Increase available width or use DateTime grouping when appropriate.

## Combined Mistakes and Future References

### Unnecessary ImageExport Injection

Avoid:

```typescript
import {
    ImageExport
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    ImageExport
);
```

Use the Range Navigator public export method directly:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator'
);
```

### Invalid Custom Export Dimensions

Incorrect:

```typescript
rangeNavigator.export(
    'PNG',
    'range-navigator',
    1200,
    400
);
```

The third argument is not width, and the fourth argument is not height.

For a specifically sized export, configure the rendered control dimensions before exporting, then restore them if required.

```typescript
const originalWidth: string | null =
    rangeNavigator.width;

const originalHeight: string | null =
    rangeNavigator.height;

rangeNavigator.width = '1200px';
rangeNavigator.height = '400px';
rangeNavigator.refresh();

rangeNavigator.export(
    'PNG',
    'range-navigator'
);

rangeNavigator.width = originalWidth;
rangeNavigator.height = originalHeight;
rangeNavigator.refresh();
```

Validate asynchronous export behavior before relying on immediate restoration in production.

### Automatic Export During changed

Avoid:

```typescript
changed: (): void => {
    rangeNavigator.export(
        'PNG',
        'range-selection'
    );
}
```

This can trigger repeated downloads.

Store the range and export through a button instead.

### Unsupported Lightweight Mode

Incorrect:

```typescript
enableLightweightMode: true
```

Use:

```typescript
animationDuration: 0,
enableDeferredUpdate: true
```

### Unsupported Virtual Scrolling

Range Navigator does not expose a virtual-scrolling configuration.

A Period Selector limits the selected range but does not virtualize the bound datasource.

### Unsupported Range Series name

Avoid:

```typescript
series: [
    {
        name: 'Sales Data'
    }
]
```

Use surrounding accessible text to describe the visualization.

### Unsupported Tooltip Point Format

Avoid:

```typescript
tooltip: {
    format: 'Sales: ${y} on ${x}'
}
```

The Range Navigator tooltip displays slider values.

Use:

```typescript
tooltip: {
    enable: true,
    labelFormat: 'MMM d, yyyy'
}
```

### Missing RangeTooltip Injection

Incorrect:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

when tooltip is enabled.

Correct:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    RangeTooltip
);
```

### Missing PeriodSelector Injection

Incorrect:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

when `periodSelectorSettings` is configured.

Correct:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    PeriodSelector
);
```

### Undefined Zoom Helper Functions

Avoid:

```typescript
chart.primaryXAxis.zoomFactor =
    calculateZoomFactor(
        args.start,
        args.end
    );
```

Use:

```typescript
chart.primaryXAxis.zoomFactor =
    args.zoomFactor;

chart.primaryXAxis.zoomPosition =
    args.zoomPosition;
```

### Unsafe Date Filtering

Avoid:

```typescript
item.date >= args.start &&
item.date <= args.end
```

without validating event types.

Use:

```typescript
if (
    args.start instanceof Date &&
    args.end instanceof Date
) {
    const startTime: number =
        args.start.getTime();

    const endTime: number =
        args.end.getTime();
}
```

### Refreshing Every Second Without Limits

Avoid allowing the datasource to grow indefinitely.

Use a maximum point count:

```typescript
const maximumPoints: number = 500;

if (realtimeData.length > maximumPoints) {
    realtimeData.shift();
}
```

Batch incoming records and call `dataBind()` at a controlled rate.

### Recreating the Component as First Troubleshooting Step

Avoid:

```typescript
rangeNavigator.destroy();

rangeNavigator =
    new RangeNavigator(
        configuration,
        '#range'
    );
```

First validate:

- Container existence
- Dimensions
- Imports
- Module injection
- Data mappings
- Data types
- Event configuration
- Hidden-container state

Recreate only when the application lifecycle actually requires it.

### Import and Injection Validation Checklist

Before generating or running an advanced Range Navigator example, verify:

1. `RangeNavigator` is imported from `@syncfusion/ej2-charts`.
2. Every Range Navigator series module is imported.
3. Every Range Navigator series module is injected through `RangeNavigator.Inject(...)`.
4. `DateTime` is injected for a DateTime Range Navigator.
5. `RangeTooltip` is injected when `tooltip.enable` is true.
6. `PeriodSelector` is injected when `periodSelectorSettings` is configured.
7. `Chart` modules are injected separately through `Chart.Inject(...)`.
8. `LineSeries` is injected into Chart when the Chart uses a Line series.
9. `DateTime` is injected into Chart when its x-axis is DateTime.
10. `ImageExport` is not unnecessarily injected into Range Navigator.
11. Export uses `JPEG`, `PNG`, `SVG`, or `PDF`.
12. PDF orientation is supplied only for PDF export.
13. Custom dimensions are not passed as export arguments.
14. Export is triggered through an explicit user action.
15. `print()` is used for direct Range Navigator printing.
16. `window.print()` is used when surrounding report content must also print.
17. Chart synchronization uses `args.zoomFactor`.
18. Chart synchronization uses `args.zoomPosition`.
19. `chart.dataBind()` is preferred for property updates.
20. Date filtering validates `args.start` and `args.end`.
21. `enableDeferredUpdate` is enabled for expensive handlers.
22. `enableLightweightMode` is not used.
23. Virtual scrolling is not claimed.
24. Large datasets are sampled or aggregated before binding.
25. Series animation is disabled for performance-sensitive scenarios.
26. Real-time data is bounded to a maximum history size.
27. Real-time updates are batched.
28. Timer IDs are retained for cleanup.
29. Range Navigator and Chart instances are destroyed during teardown.
30. Native buttons are used for export and print actions.
31. An `aria-live` status is used when range changes must be announced.
32. Unsupported Range Navigator series `name` is not used.
33. Unsupported Chart-style tooltip point formatting is not used.
34. Keyboard behavior is validated against the installed EJ2 version before documentation.
35. The target container exists before `appendTo()` is called.
36. The container has sufficient dimensions.
37. The component is refreshed after a hidden container becomes visible.
38. TypeScript examples use package imports and explicit module injection.
39. JavaScript examples use the `ej.charts` global namespace.
40. Vue, React, Angular, Composition API, provider, and directive syntax are not used.