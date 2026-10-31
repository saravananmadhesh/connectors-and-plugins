# Export and Print

## Overview

The EJ2 Stock Chart provides built-in export and print controls through the period-selector toolbar. The toolbar can export the rendered Stock Chart to JPEG, PNG, SVG, or PDF and can open the browser print dialog.

For most Stock Chart applications, configure the built-in toolbar first:

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

Use programmatic methods only when the application requires custom external buttons or automated workflows.

The supplied material required the following corrections:

- Use the `Export` module for Stock Chart export support.
- Do not import or inject a separate `PdfExport` module for the Stock Chart example.
- Configure built-in export formats through `exportType`.
- Use filenames without manually appended format extensions unless the installed version explicitly requires an extension.
- Do not pass unverified background, orientation, width, or height arguments to `export()`.
- Do not treat `export()` as returning image data or a Promise without validating the installed API.
- Do not pass an options object to `print()`.
- `beforeExport` is a supported Stock Chart event.
- Do not document `afterExport` unless it is verified in the installed version.
- Do not use `beforeExport` as an export-completion event.
- Do not use inline `onclick` handlers.
- Do not assume that multiple charts can be combined by awaiting `stockChart.export()`.
- PDF page sizes must not be passed as inches to an unverified export signature.
- For high-resolution output, resize a dedicated export instance or use a validated export API instead of undocumented arguments.
- Complete Candle examples require x, open, high, low, and close mappings.

## Table of Contents

- #required-modules
- #built-in-export-toolbar
- #export-formats
- #png-export
- #jpeg-export
- #svg-export
- #pdf-export
- #print
- #disabling-export-and-print
- #external-export-controls
- #before-export-event
- #file-naming
- #exporting-different-periods
- #high-resolution-output
- #multiple-chart-reports
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Required Modules

Import `Export` with the modules required by the configured Stock Chart.

```typescript
import {
    CandleSeries,
    DateTime,
    Export,
    RangeTooltip,
    StockChart
} from '@syncfusion/ej2-charts';
```

Inject the modules before creating the component:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    RangeTooltip,
    Export
);
```

The official TypeScript Stock Chart export example injects the `Export` module and exposes export through the period-selector toolbar.

Do not add:

```typescript
PdfExport
```

to the Stock Chart import or injection list unless that exact module requirement has been validated against the installed package.

Incorrect:

```typescript
import {
    Export,
    PdfExport,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Export,
    PdfExport
);
```

Preferred:

```typescript
import {
    Export,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Export
);
```

## Built-In Export Toolbar

The built-in Stock Chart period-selector toolbar is the preferred export and print interface.

Configure the formats through:

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

Complete configuration:

```typescript
const stockChart: StockChart =
    new StockChart({
        exportType: [
            'PNG',
            'JPEG',
            'SVG',
            'PDF'
        ],
        series: [
            {
                type: 'Candle',
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close'
            }
        ]
    });
```

The rendered Stock Chart exposes supported export formats through the export dropdown in its period-selector toolbar, while printing is available from the same toolbar.

Use the built-in toolbar when:

- Users need standard export choices.
- The application does not require a custom control layout.
- Export should remain integrated with the Stock Chart.
- Print and export should follow the selected Stock Chart range.
- Minimal custom application code is preferred.

## Export Formats

The TypeScript and JavaScript Stock Chart documentation lists these toolbar export formats:

```text
JPEG
PNG
SVG
PDF
```

The Stock Chart also provides printing through its toolbar.

### PNG

Use PNG for:

- Dashboard snapshots
- Documents and presentations
- General raster-image sharing
- Applications requiring broad image compatibility

### JPEG

Use JPEG for:

- Compressed raster output
- Reports where smaller output is more important than lossless quality
- Charts with photographic or complex background content

For charts containing small labels and fine financial lines, PNG is usually clearer than JPEG.

### SVG

Use SVG for:

- Scalable vector output
- High-quality web embedding
- Design-tool workflows
- Resolution-independent financial graphics

SVG may preserve chart geometry and text more effectively than a raster export, but external fonts and linked assets should still be tested.

### PDF

Use PDF for:

- Portable financial reports
- Archiving
- Sharing
- Printing
- Document-oriented workflows

Validate PDF appearance with the selected theme, fonts, chart dimensions, and browser environment.

## PNG Export

### Built-In Toolbar

```typescript
exportType: [
    'PNG'
]
```

### Programmatic TypeScript Export

```typescript
const pngButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#export-png'
        );

if (pngButton) {
    pngButton.addEventListener(
        'click',
        (): void => {
            stockChart.export(
                'PNG',
                'stock-chart'
            );
        }
    );
}
```

### Programmatic JavaScript Export

```javascript
var pngButton =
    document.getElementById(
        'export-png'
    );

if (pngButton) {
    pngButton.addEventListener(
        'click',
        function () {
            stockChart.export(
                'PNG',
                'stock-chart'
            );
        }
    );
}
```

Use a base filename unless the installed version explicitly documents extension handling:

```typescript
stockChart.export(
    'PNG',
    'stock-chart'
);
```

Avoid assuming this is required:

```typescript
stockChart.export(
    'PNG',
    'stock-chart.png'
);
```

## JPEG Export

### Built-In Toolbar

```typescript
exportType: [
    'JPEG'
]
```

### Programmatic Export

```typescript
stockChart.export(
    'JPEG',
    'stock-chart'
);
```

Use JPEG only when lossy compression is acceptable.

## SVG Export

### Built-In Toolbar

```typescript
exportType: [
    'SVG'
]
```

### Programmatic Export

```typescript
stockChart.export(
    'SVG',
    'stock-chart'
);
```

Do not assume SVG always produces a smaller file than PNG. Output size depends on:

- Point count
- Series count
- Path complexity
- Range navigator
- Indicators
- Labels
- Tooltips excluded from the static output
- Annotations
- Embedded styles

## PDF Export

### Built-In Toolbar

```typescript
exportType: [
    'PDF'
]
```

### Programmatic Export

```typescript
stockChart.export(
    'PDF',
    'stock-chart'
);
```

The built-in Stock Chart toolbar supports PDF as an export option.

Do not use this unverified signature:

```typescript
stockChart.export(
    'PDF',
    'stock-chart.pdf',
    'Light',
    false,
    8.5,
    11
);
```

The values `8.5` and `11` represent inches in a page-size description, but there is no basis for passing them as Stock Chart export dimensions in the shown call.

Do not import an unrelated PDF package merely to export one Stock Chart:

```typescript
import {
    PdfDocument
} from '@syncfusion/ej2-pdf';
```

Use the Stock Chart’s built-in PDF export unless the task requires a custom multi-section report.

## Print

### Built-In Toolbar

Print is available through the Stock Chart period-selector toolbar.

### Programmatic TypeScript Print

```typescript
const printButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#print-stock-chart'
        );

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            stockChart.print();
        }
    );
}
```

### Programmatic JavaScript Print

```javascript
var printButton =
    document.getElementById(
        'print-stock-chart'
    );

if (printButton) {
    printButton.addEventListener(
        'click',
        function () {
            stockChart.print();
        }
    );
}
```

The `print()` method opens the browser’s print workflow. The selected printer, paper size, margin, scaling, and PDF-printer behavior are controlled by the browser and operating system.

Do not pass an unverified options object:

```typescript
stockChart.print({
    type: 'SVG',
    orientation: 'Landscape',
    title: 'Stock Chart Report',
    multiPages: false
});
```

Use:

```typescript
stockChart.print();
```

### Print CSS

Use print CSS to improve the surrounding page:

```css
@media print {
    body {
        margin: 0;
        padding: 0;
        background: #FFFFFF;
    }

    .stock-chart-toolbar {
        display: none;
    }

    .stock-chart-card {
        max-width: none;
        padding: 0;
        border: 0;
        box-shadow: none;
    }

    #stock-chart {
        width: 100% !important;
        break-inside: avoid;
        page-break-inside: avoid;
    }
}
```

The component’s `print()` method prints the Stock Chart itself. Print CSS is most relevant when the browser prints the surrounding application page or a custom printable report.

## Disabling Export and Print

Set `exportType` to an empty array when export choices must be removed:

```typescript
exportType: []
```

The Stock Chart documentation uses an empty `exportType` collection to disable export and print controls in the built-in toolbar.

Example:

```typescript
const stockChart: StockChart =
    new StockChart({
        exportType: [],
        series: [
            {
                type: 'Candle',
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close'
            }
        ]
    });
```

Use this when:

- Export is prohibited by application policy.
- Financial data must remain inside the application.
- Custom export controls are provided elsewhere.
- Users do not have export permission.
- Print and export are disabled for a read-only embedded view.

Disabling the UI is not a security boundary. Sensitive-data protection must also be enforced through authorization, API access, logging, caching, and document-handling policies.

## External Export Controls

Use native buttons when the application requires its own toolbar.

### HTML

```html
<div
    class="stock-chart-toolbar"
    aria-label="Stock Chart export controls"
>
    <button
        id="export-png"
        type="button"
    >
        Export PNG
    </button>

    <button
        id="export-jpeg"
        type="button"
    >
        Export JPEG
    </button>

    <button
        id="export-svg"
        type="button"
    >
        Export SVG
    </button>

    <button
        id="export-pdf"
        type="button"
    >
        Export PDF
    </button>

    <button
        id="print-stock-chart"
        type="button"
    >
        Print
    </button>
</div>

<div id="stock-chart"></div>
```

### TypeScript Binding Utility

```typescript
type StockExportType =
    'PNG' |
    'JPEG' |
    'SVG' |
    'PDF';
```

```typescript
const bindExportButton = (
    selector: string,
    type: StockExportType,
    fileName: string
): void => {
    const button:
        HTMLButtonElement | null =
            document.querySelector(
                selector
            );

    if (!button) {
        return;
    }

    button.addEventListener(
        'click',
        (): void => {
            stockChart.export(
                type,
                fileName
            );
        }
    );
};
```

```typescript
bindExportButton(
    '#export-png',
    'PNG',
    'stock-chart'
);

bindExportButton(
    '#export-jpeg',
    'JPEG',
    'stock-chart'
);

bindExportButton(
    '#export-svg',
    'SVG',
    'stock-chart'
);

bindExportButton(
    '#export-pdf',
    'PDF',
    'stock-chart'
);
```

Avoid inline event handlers:

```html
<button onclick="exportPNG()">
```

Prefer:

```typescript
button.addEventListener(
    'click',
    handler
);
```

## Before Export Event

The Stock Chart exposes a `beforeExport` event that runs before the export operation.

Use it for last-minute export preparation that is supported by the event model.

```typescript
const stockChart: StockChart =
    new StockChart({
        beforeExport: (): void => {
            setExportStatus(
                'Preparing Stock Chart export.'
            );
        },
        series: [
            {
                type: 'Candle',
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close'
            }
        ]
    });
```

Status helper:

```typescript
const setExportStatus = (
    message: string
): void => {
    const status:
        HTMLElement | null =
            document.querySelector(
                '#export-status'
            );

    if (status) {
        status.textContent =
            message;
    }
};
```

Do not assume the event arguments contain:

```typescript
args.type
```

without validating the TypeScript event model for the installed version.

Do not document an `afterExport` event unless it exists in the target package version.

Incorrect assumption:

```typescript
afterExport: (
    args
): void => {
    console.log(
        'Export completed.'
    );
}
```

The available API reference confirms `beforeExport`, but does not establish the proposed `afterExport` event.

Also, `beforeExport` indicates that export is beginning. It does not prove that the file was successfully generated or saved by the browser.

## File Naming

Use a sanitized base filename:

```typescript
const sanitizeFileName = (
    value: string
): string => {
    return value
        .trim()
        .replace(
            /[^a-zA-Z0-9_-]+/g,
            '-'
        )
        .replace(
            /^-+|-+$/g,
            ''
        );
};
```

Generate a date-based filename:

```typescript
const createExportFileName = (
    symbol: string,
    period: string
): string => {
    const date: string =
        new Date()
            .toISOString()
            .slice(0, 10);

    return sanitizeFileName(
        `${symbol}-${period}-${date}`
    );
};
```

Usage:

```typescript
const fileName: string =
    createExportFileName(
        'AAPL',
        'daily'
    );

stockChart.export(
    'PNG',
    fileName
);
```

Recommended pattern:

```text
symbol-period-YYYY-MM-DD
```

Avoid:

- Slashes
- Colons
- Question marks
- User-provided raw strings
- Path separators
- Extremely long filenames

## Exporting Different Periods

Exporting several periods requires more than changing a label. The chart must finish applying the new range before the next export begins.

Do not use:

```typescript
await new Promise(
    (
        resolve
    ): void => {
        stockChart.beforeExport =
            resolve;

        stockChart.export(
            'PNG',
            'chart'
        );
    }
);
```

`beforeExport` runs before export and is not a completion signal.

A safer application workflow is:

1. Apply the selected range or period.
2. Wait for the Stock Chart to complete rendering.
3. Trigger one export.
4. Let the browser complete its download.
5. Move to the next range only through a validated completion mechanism.

Do not automatically trigger many browser downloads. Browsers may block or throttle repeated downloads, and the experience can be disruptive.

For user-driven exports, expose each required period as a separate action.

## High-Resolution Output

Do not use undocumented parameters such as:

```typescript
stockChart.export(
    'PNG',
    'stock-chart',
    'Light',
    false,
    3840,
    2160
);
```

If higher-resolution raster output is required:

1. Create a dedicated off-screen or export-only Stock Chart.
2. Give it validated pixel dimensions.
3. Bind the required data and settings.
4. Wait for its `loaded` event.
5. Trigger the export.
6. Destroy the temporary instance.

Conceptual pattern:

```typescript
const exportHost:
    HTMLDivElement =
        document.createElement(
            'div'
        );

exportHost.id =
    'stock-chart-export-host';

exportHost.style.position =
    'fixed';

exportHost.style.left =
    '-10000px';

exportHost.style.width =
    '1920px';

exportHost.style.height =
    '1080px';

document.body.append(
    exportHost
);
```

Then create a temporary Stock Chart with:

```typescript
width: '1920px',
height: '1080px'
```

This workflow must be tested carefully because:

- Browser canvas limits vary.
- Large SVG or canvas rendering consumes memory.
- Fonts must be loaded before export.
- Export may still be asynchronous.
- The temporary component must be destroyed.
- Excessive raster dimensions can crash resource-constrained devices.

For professional print reports, prefer SVG or PDF when suitable instead of arbitrarily large PNG dimensions.

## Multiple-Chart Reports

Do not assume this returns image data:

```typescript
const pngData =
    await stockChart.export(
        'PNG'
    );
```

The Stock Chart export method is primarily a download-oriented operation in this workflow. Do not treat it as a Promise or data-URL generator without explicit validation.

Do not use an unverified PDF API:

```typescript
const pdf =
    new PdfDocument();

pdf.addImage(
    pngData,
    10,
    10,
    200,
    150
);
```

For a multi-chart report:

1. Use a supported document-generation workflow.
2. Export or capture each visual using a validated API.
3. Preserve aspect ratios.
4. Add headings, captions, dates, and sources.
5. Generate the final PDF using the correct PDF library or reporting system.
6. Test pagination and image quality.

A multi-chart PDF is a document-composition task, not a standard single Stock Chart export operation.

## Complete TypeScript Example

This example includes:

- Candle OHLC mapping
- Correct module injection
- Built-in export choices
- Custom external export buttons
- Programmatic print
- `beforeExport`
- Accessible status text
- Safe file naming
- Complete responsive HTML

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

    <title>Stock Chart Export and Print</title>

    https://cdn.syncfusion.com/ej2/34.2.2/material3.css

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .stock-chart-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .stock-chart-card h1 {
            margin: 0 0 6px;
            font-size: 24px;
        }

        .stock-chart-description {
            margin: 0 0 16px;
            color: #475569;
        }

        .stock-chart-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }

        .stock-chart-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .stock-chart-toolbar button:hover {
            background: #F1F5F9;
        }

        .stock-chart-toolbar button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #export-status {
            min-height: 24px;
            margin: 0 0 8px;
            color: #334155;
        }

        #stock-chart {
            width: 100%;
            min-height: 650px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .stock-chart-card {
                padding: 12px;
            }

            #stock-chart {
                min-height: 500px;
            }
        }

        @media print {
            body {
                margin: 0;
                padding: 0;
                background: #FFFFFF;
            }

            .stock-chart-toolbar,
            #export-status {
                display: none;
            }

            .stock-chart-card {
                max-width: none;
                padding: 0;
                border: 0;
                border-radius: 0;
            }

            #stock-chart {
                width: 100% !important;
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <main
        class="stock-chart-card"
        aria-labelledby="stock-chart-heading"
    >
        <h1 id="stock-chart-heading">
            Daily Stock Price
        </h1>

        <p
            id="stock-chart-description"
            class="stock-chart-description"
        >
            Export the currently displayed Stock Chart
            or open the browser print dialog.
        </p>

        <div
            class="stock-chart-toolbar"
            aria-label="Stock Chart export controls"
        >
            <button
                id="export-png"
                type="button"
            >
                Export PNG
            </button>

            <button
                id="export-jpeg"
                type="button"
            >
                Export JPEG
            </button>

            <button
                id="export-svg"
                type="button"
            >
                Export SVG
            </button>

            <button
                id="export-pdf"
                type="button"
            >
                Export PDF
            </button>

            <button
                id="print-stock-chart"
                type="button"
            >
                Print
            </button>
        </div>

        <p
            id="export-status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description"
        ></div>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    CandleSeries,
    DateTime,
    Export,
    RangeTooltip,
    StockChart
} from '@syncfusion/ej2-charts';

interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

type StockExportType =
    'PNG' |
    'JPEG' |
    'SVG' |
    'PDF';

StockChart.Inject(
    DateTime,
    CandleSeries,
    RangeTooltip,
    Export
);

const stockData: StockData[] = [
    {
        date: new Date(2025, 0, 2),
        open: 100,
        high: 106,
        low: 98,
        close: 104,
        volume: 1050000
    },
    {
        date: new Date(2025, 0, 3),
        open: 104,
        high: 109,
        low: 102,
        close: 107,
        volume: 1180000
    },
    {
        date: new Date(2025, 0, 6),
        open: 107,
        high: 111,
        low: 103,
        close: 105,
        volume: 970000
    },
    {
        date: new Date(2025, 0, 7),
        open: 105,
        high: 110,
        low: 104,
        close: 109,
        volume: 1230000
    },
    {
        date: new Date(2025, 0, 8),
        open: 109,
        high: 114,
        low: 107,
        close: 112,
        volume: 1320000
    },
    {
        date: new Date(2025, 0, 9),
        open: 112,
        high: 115,
        low: 108,
        close: 110,
        volume: 1160000
    },
    {
        date: new Date(2025, 0, 10),
        open: 110,
        high: 117,
        low: 109,
        close: 115,
        volume: 1420000
    }
];

const setExportStatus = (
    message: string
): void => {
    const element:
        HTMLElement | null =
            document.querySelector(
                '#export-status'
            );

    if (element) {
        element.textContent =
            message;
    }
};

const sanitizeFileName = (
    value: string
): string => {
    return value
        .trim()
        .replace(
            /[^a-zA-Z0-9_-]+/g,
            '-'
        )
        .replace(
            /^-+|-+$/g,
            ''
        );
};

const createFileName = (): string => {
    const date: string =
        new Date()
            .toISOString()
            .slice(0, 10);

    return sanitizeFileName(
        `stock-daily-${date}`
    );
};

const stockChartElement:
    HTMLElement | null =
        document.querySelector(
            '#stock-chart'
        );

if (!stockChartElement) {
    throw new Error(
        'The Stock Chart container was not found.'
    );
}

const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '650px',
        theme: 'Bootstrap5',
        title: 'Daily Stock Price',
        exportType: [
            'PNG',
            'JPEG',
            'SVG',
            'PDF'
        ],
        primaryXAxis: {
            valueType: 'DateTime',
            majorGridLines: {
                width: 0
            },
            edgeLabelPlacement: 'Shift'
        },
        primaryYAxis: {
            labelFormat: '${value}',
            lineStyle: {
                width: 0
            },
            majorTickLines: {
                width: 0
            }
        },
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
                text: 'YTD'
            },
            {
                text: '1Y',
                interval: 1,
                intervalType: 'Years'
            },
            {
                text: 'All',
                selected: true
            }
        ],
        beforeExport: (): void => {
            setExportStatus(
                'Preparing the Stock Chart export.'
            );
        },
        series: [
            {
                type: 'Candle',
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                volume: 'volume',
                name: 'Stock Price',
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A'
            }
        ],
        indicatorType: [],
        trendlineType: []
    });

stockChart.appendTo(
    stockChartElement
);

const bindExportButton = (
    selector: string,
    type: StockExportType
): void => {
    const button:
        HTMLButtonElement | null =
            document.querySelector(
                selector
            );

    if (!button) {
        return;
    }

    button.addEventListener(
        'click',
        (): void => {
            setExportStatus(
                `Preparing ${type} export.`
            );

            stockChart.export(
                type,
                createFileName()
            );
        }
    );
};

bindExportButton(
    '#export-png',
    'PNG'
);

bindExportButton(
    '#export-jpeg',
    'JPEG'
);

bindExportButton(
    '#export-svg',
    'SVG'
);

bindExportButton(
    '#export-pdf',
    'PDF'
);

const printButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#print-stock-chart'
        );

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            setExportStatus(
                'Opening the browser print dialog.'
            );

            stockChart.print();
        }
    );
}

let resizeTimer:
    number | undefined;

window.addEventListener(
    'resize',
    (): void => {
        if (
            resizeTimer !== undefined
        ) {
            window.clearTimeout(
                resizeTimer
            );
        }

        resizeTimer =
            window.setTimeout(
                (): void => {
                    const compact:
                        boolean =
                            window.matchMedia(
                                '(max-width: 767px)'
                            ).matches;

                    stockChart.height =
                        compact
                            ? '500px'
                            : '650px';

                    stockChart.refresh();
                },
                150
            );
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

    <title>Stock Chart Export and Print</title>

    https://cdn.syncfusion.com/ej2/34.2.2/material3.css

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            font-family: "Segoe UI", sans-serif;
        }

        .stock-chart-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .stock-chart-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }

        .stock-chart-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        #stock-chart {
            width: 100%;
            min-height: 650px;
        }

        @media print {
            .stock-chart-toolbar,
            #export-status {
                display: none;
            }

            .stock-chart-card {
                max-width: none;
                padding: 0;
                border: 0;
            }
        }
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Daily Stock Price
        </h1>

        <p id="stock-chart-description">
            Export the currently displayed Stock Chart
            or open the browser print dialog.
        </p>

        <div class="stock-chart-toolbar">
            <button
                id="export-png"
                type="button"
            >
                Export PNG
            </button>

            <button
                id="export-svg"
                type="button"
            >
                Export SVG
            </button>

            <button
                id="export-pdf"
                type="button"
            >
                Export PDF
            </button>

            <button
                id="print-stock-chart"
                type="button"
            >
                Print
            </button>
        </div>

        <p
            id="export-status"
            role="status"
            aria-live="polite"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description"
        ></div>
    </main>

    <script>
        var stockData = [
            {
                date: new Date(2025, 0, 2),
                open: 100,
                high: 106,
                low: 98,
                close: 104,
                volume: 1050000
            },
            {
                date: new Date(2025, 0, 3),
                open: 104,
                high: 109,
                low: 102,
                close: 107,
                volume: 1180000
            },
            {
                date: new Date(2025, 0, 6),
                open: 107,
                high: 111,
                low: 103,
                close: 105,
                volume: 970000
            },
            {
                date: new Date(2025, 0, 7),
                open: 105,
                high: 110,
                low: 104,
                close: 109,
                volume: 1230000
            },
            {
                date: new Date(2025, 0, 8),
                open: 109,
                high: 114,
                low: 107,
                close: 112,
                volume: 1320000
            }
        ];

        function setExportStatus(
            message
        ) {
            document
                .getElementById(
                    'export-status'
                )
                .textContent =
                    message;
        }

        function createFileName() {
            var date =
                new Date()
                    .toISOString()
                    .slice(0, 10);

            return (
                'stock-daily-' +
                date
            );
        }

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '650px',
                theme: 'Bootstrap5',
                title:
                    'Daily Stock Price',
                exportType: [
                    'PNG',
                    'JPEG',
                    'SVG',
                    'PDF'
                ],
                primaryXAxis: {
                    valueType: 'DateTime',
                    majorGridLines: {
                        width: 0
                    },
                    edgeLabelPlacement:
                        'Shift'
                },
                primaryYAxis: {
                    labelFormat: '${value}',
                    lineStyle: {
                        width: 0
                    },
                    majorTickLines: {
                        width: 0
                    }
                },
                beforeExport:
                    function () {
                        setExportStatus(
                            'Preparing the Stock Chart export.'
                        );
                    },
                series: [
                    {
                        type: 'Candle',
                        dataSource:
                            stockData,
                        xName: 'date',
                        open: 'open',
                        high: 'high',
                        low: 'low',
                        close: 'close',
                        volume: 'volume',
                        name: 'Stock Price'
                    }
                ],
                indicatorType: [],
                trendlineType: []
            });

        stockChart.appendTo(
            '#stock-chart'
        );

        function bindExportButton(
            selector,
            type
        ) {
            var button =
                document.querySelector(
                    selector
                );

            if (!button) {
                return;
            }

            button.addEventListener(
                'click',
                function () {
                    setExportStatus(
                        'Preparing ' +
                        type +
                        ' export.'
                    );

                    stockChart.export(
                        type,
                        createFileName()
                    );
                }
            );
        }

        bindExportButton(
            '#export-png',
            'PNG'
        );

        bindExportButton(
            '#export-svg',
            'SVG'
        );

        bindExportButton(
            '#export-pdf',
            'PDF'
        );

        document
            .getElementById(
                'print-stock-chart'
            )
            .addEventListener(
                'click',
                function () {
                    setExportStatus(
                        'Opening the browser print dialog.'
                    );

                    stockChart.print();
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Built-In Toolbar

- Configure `exportType` first.
- Use the Stock Chart’s built-in toolbar for standard export and print workflows.
- Include only formats users actually need.
- Set `exportType: []` when export and print must be disabled.
- Import and inject `Export` in TypeScript.

### Programmatic Export

- Use `stockChart.export(type, fileName)`.
- Use a sanitized base filename.
- Do not append unsupported arguments.
- Do not assume a Promise return value.
- Do not assume the method returns image data.
- Avoid triggering many downloads automatically.

### PDF

- Use built-in PDF export for one Stock Chart.
- Use a document-generation workflow for multi-chart reports.
- Validate fonts, pagination, and aspect ratio.
- Do not pass inch-based page dimensions to an unverified method signature.

### Print

- Use `stockChart.print()`.
- Do not pass an unsupported options object.
- Let the browser control printer and PDF-printer settings.
- Use accessible visible labels for custom print buttons.

### Security

- Treat export as a potentially sensitive-data operation.
- Enforce authorization independently of UI visibility.
- Sanitize user-derived filenames.
- Avoid exporting hidden confidential series accidentally.
- Avoid embedding credentials, account numbers, or private identifiers in filenames.
- Review browser caching and download policies.

## Combined Mistakes and Future References

### Built-In Toolbar Omitted

Less appropriate for a normal Stock Chart:

```typescript
document
    .getElementById(
        'export-png'
    )
    ?.addEventListener(
        'click',
        (): void => {
            stockChart.export(
                'PNG',
                'stock-chart'
            );
        }
    );
```

Preferred first:

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

The export dropdown and print button are built into the period-selector toolbar.

### Unnecessary PdfExport Module

Avoid:

```typescript
StockChart.Inject(
    Export,
    PdfExport
);
```

Use:

```typescript
StockChart.Inject(
    Export
);
```

### Incomplete Candle Mapping

Incorrect:

```typescript
{
    type: 'Candle',
    dataSource: stockData
}
```

Correct:

```typescript
{
    type: 'Candle',
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
}
```

### Unsupported Export Arguments

Avoid:

```typescript
stockChart.export(
    'PNG',
    'stock-chart',
    'Light',
    false,
    1920,
    1080
);
```

Use the validated basic call:

```typescript
stockChart.export(
    'PNG',
    'stock-chart'
);
```

### PDF Dimensions in Inches

Avoid:

```typescript
stockChart.export(
    'PDF',
    'stock-chart',
    'Light',
    false,
    8.5,
    11
);
```

The standard Stock Chart export example does not establish that signature.

### Unsupported Print Options

Avoid:

```typescript
stockChart.print({
    orientation:
        'Landscape'
});
```

Use:

```typescript
stockChart.print();
```

### Export Treated as Promise

Avoid:

```typescript
const image =
    await stockChart.export(
        'PNG'
    );
```

Do not assume the method returns image data or a Promise.

### beforeExport Used as Completion Event

Incorrect:

```typescript
await new Promise(
    (
        resolve
    ): void => {
        stockChart.beforeExport =
            resolve;

        stockChart.export(
            'PNG',
            'stock-chart'
        );
    }
);
```

`beforeExport` runs before export begins.

### Unverified afterExport Event

Avoid:

```typescript
afterExport: (): void => {
    console.log(
        'Export completed.'
    );
}
```

unless the installed Stock Chart API explicitly supports it.

### Unsafe Inline Handlers

Avoid:

```html
<button onclick="exportPNG()">
```

Use:

```typescript
button.addEventListener(
    'click',
    handler
);
```

### Multi-Chart PDF Assumption

Avoid assuming a single Stock Chart export call can return image bytes for arbitrary PDF composition.

Use a validated document-generation workflow.

### Export and Print Validation Checklist

Before generating a Stock Chart export example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. `Export` is imported in TypeScript.
4. `Export` is injected before component creation.
5. The financial-series module is imported and injected.
6. `DateTime` is imported and injected.
7. Candle series maps `xName`.
8. Candle series maps `open`.
9. Candle series maps `high`.
10. Candle series maps `low`.
11. Candle series maps `close`.
12. Built-in formats are configured through `exportType`.
13. Supported formats use `PNG`, `JPEG`, `SVG`, or `PDF`.
14. Empty `exportType` is used when toolbar export and print must be disabled.
15. External controls use native buttons.
16. Inline `onclick` handlers are excluded.
17. Programmatic export uses a validated basic signature.
18. Unsupported background arguments are excluded.
19. Unsupported portrait arguments are excluded.
20. Unsupported width and height arguments are excluded.
21. PDF page dimensions are not passed as unverified export arguments.
22. Programmatic print uses `stockChart.print()`.
23. Unsupported print option objects are excluded.
24. `beforeExport` is configured at Stock Chart root level.
25. `beforeExport` is not treated as completion.
26. `afterExport` is not claimed without validation.
27. Export is not assumed to return image data.
28. Export is not assumed to return a Promise.
29. Multi-chart documents use a dedicated report workflow.
30. Filenames are sanitized.
31. Filename extensions are not duplicated.
32. User-provided values do not introduce path characters.
33. Export status messages do not claim success without confirmation.
34. Repeated automatic downloads are avoided.
35. Sensitive-data authorization is enforced outside the toolbar.
36. The host exists before `appendTo()`.
37. The host has sufficient width and height.
38. The matching EJ2 stylesheet is loaded.
39. Responsive resize refreshes are debounced.
40. The TypeScript and JavaScript examples are complete and runnable.
41. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.