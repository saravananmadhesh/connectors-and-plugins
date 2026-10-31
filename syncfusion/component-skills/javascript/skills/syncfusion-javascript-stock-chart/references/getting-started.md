# Getting Started with Stock Chart

## Overview

The Syncfusion EJ2 Stock Chart visualizes financial data over time. It supports financial series, period selectors, range navigation, tooltips, crosshairs, technical indicators, trendlines, printing, and export.

The Stock Chart is included in the `@syncfusion/ej2-charts` package. Financial series such as Candle and HiloOpenClose require valid mappings for the date, open, high, low, and close fields.

This guide covers:

- EJ2 TypeScript using npm and ES modules.
- EJ2 JavaScript using the global CDN bundle.
- Mandatory theme and stylesheet configuration.
- Candle-series creation.
- Required module injection.
- Correct OHLC field mapping.
- Local and remote data.
- Tooltip and crosshair configuration.
- Period and range selection.
- Dynamic data updates.
- Complete TypeScript and JavaScript examples.
- Runtime validation and troubleshooting.

## Table of Contents

- #installation-and-setup
  - #install-the-charts-package
  - #install-the-theme-package
  - #import-the-stock-chart-styles
  - #register-the-syncfusion-license
- #typescript-setup
- #javascript-setup
  - #javascript-cdn-stylesheet
  - #javascript-cdn-bundle
- #basic-stock-chart
- #module-injection
- #data-binding
  - #financial-field-mapping
  - #local-data
  - #remote-data
- #tooltip-and-crosshair
- #period-and-range-selection
- #themes-and-stylesheets
- #candle-colors
- #dynamic-data-updates
- #complete-typescript-example
- #complete-javascript-example
- #accessibility-guidance
- #performance-and-cleanup
- #runtime-validation-checklist
- #troubleshooting
- #combined-mistakes-and-future-references

## Installation and Setup

## Install the Charts Package

Install the Charts package:

```bash
npm install @syncfusion/ej2-charts
```

The Stock Chart and its required package dependencies are resolved through `@syncfusion/ej2-charts`.

Do not install every transitive package separately unless the package manager reports a specific unresolved dependency.

Keep all installed Syncfusion package versions compatible.

## Install the Theme Package

Every TypeScript Stock Chart getting-started example must include a compatible Syncfusion theme package.

The standard TypeScript quick-start setup uses the Fluent 2 theme:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

The Charts package and theme package should use compatible versions.

Do not omit the theme package because another reference file discusses themes. Each getting-started example must contain its complete theme setup.

## Import the Stock Chart Styles

Add the focused Stock Chart stylesheet to the application stylesheet.

If the stylesheet is located at `src/styles/styles.css`, use:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/stock-chart/index.css";
```

When the build system supports package resolution in CSS, use:

```css
@import "@syncfusion/ej2-fluent2-theme/styles/stock-chart/index.css";
```

Choose the import form supported by the target build configuration.

Do not load unrelated Syncfusion theme stylesheets when the focused Stock Chart theme file provides the required styles.

Do not combine Fluent 2 Stock Chart CSS with an unrelated component theme.

Use a compatible Stock Chart theme:

```typescript
theme:
    'Fluent2'
```

Validate the exact theme value against the installed `@syncfusion/ej2-charts` version.

## Register the Syncfusion License

Register an applicable Syncfusion license before initializing the component when required by the selected license and deployment.

```typescript
import {
    registerLicense
} from '@syncfusion/ej2-base';

registerLicense(
    'YOUR_SYNCFUSION_LICENSE_KEY'
);
```

Do not publish a private license key in public documentation or source repositories.

## TypeScript Setup

### HTML Container

```html
<div class="stock-chart-wrapper">
    <div id="stock-chart"></div>
</div>
```

### Container Styles

```css
.stock-chart-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

#stock-chart {
    width: 100%;
    min-height: 600px;
}
```

The Stock Chart host must exist before `appendTo()` is called.

Validate the host:

```typescript
const stockChartElement:
    HTMLElement | null =
        document.getElementById(
            'stock-chart'
        );

if (!stockChartElement) {
    throw new Error(
        'The Stock Chart container "#stock-chart" was not found.'
    );
}
```

### TypeScript Imports

A Candle Stock Chart with a date axis, tooltips, crosshair, and range tooltip requires:

```typescript
import {
    CandleSeries,
    Crosshair,
    DateTime,
    RangeTooltip,
    StockChart,
    Tooltip
} from '@syncfusion/ej2-charts';
```

### Module Injection

Inject the required modules before constructing the Stock Chart:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    Tooltip,
    Crosshair,
    RangeTooltip
);
```

Keep imports and injection synchronized.

Do not inject modules that are not imported.

Do not import modules that are not used by the example.

### Component Creation

```typescript
const stockChart: StockChart =
    new StockChart({
        theme:
            'Fluent2',

        primaryXAxis: {
            valueType:
                'DateTime'
        },

        series: [
            {
                type:
                    'Candle',
                dataSource:
                    stockData,
                xName:
                    'date',
                open:
                    'open',
                high:
                    'high',
                low:
                    'low',
                close:
                    'close',
                name:
                    'Stock Price'
            }
        ]
    });

stockChart.appendTo(
    stockChartElement
);
```

The two-argument constructor is supported:

```typescript
const stockChart: StockChart =
    new StockChart(
        configuration,
        '#stock-chart'
    );
```

However, explicit construction followed by `appendTo()` is preferred for documentation, host validation, and cleanup:

```typescript
const stockChart: StockChart =
    new StockChart(
        configuration
    );

stockChart.appendTo(
    '#stock-chart'
);
```

## JavaScript Setup

The simplest global JavaScript setup uses:

- One versioned Syncfusion EJ2 theme stylesheet.
- The matching versioned combined EJ2 JavaScript bundle.
- The global `ej.charts.StockChart` constructor.

Do not manually assemble individual package files for a basic getting-started example.

Do not call `StockChart.Inject(...)` when using the complete global EJ2 bundle.

## JavaScript CDN Stylesheet

Use the versioned Tailwind 3 stylesheet:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>
```

Configure the matching component theme:

```javascript
theme:
    'Tailwind3'
```

Do not include Bootstrap CSS in a focused Tailwind 3 example.

Avoid:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>

<link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
>
```

unless the surrounding application independently requires Bootstrap and the combination has been validated.

## JavaScript CDN Bundle

Load the matching versioned combined bundle:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
></script>
```

The stylesheet and JavaScript bundle versions must match:

```text
CSS version:        33.2.3
JavaScript version: 33.2.3
```

Initialize the Stock Chart only after the bundle has loaded:

```html
<script>
    var stockChart =
        new ej.charts.StockChart({
            theme:
                'Tailwind3',

            series: [
                // Stock Chart series
            ]
        });

    stockChart.appendTo(
        '#stock-chart'
    );
</script>
```

Validate the global namespace before construction:

```javascript
if (
    typeof window.ej ===
        'undefined' ||
    !window.ej.charts ||
    !window.ej.charts.StockChart
) {
    throw new Error(
        'The EJ2 Stock Chart global bundle was not loaded.'
    );
}
```

## Basic Stock Chart

## Data Interface

```typescript
interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
```

## Sample Data

```typescript
const stockData:
    StockData[] = [
        {
            date:
                new Date(
                    2025,
                    0,
                    2
                ),
            open:
                100,
            high:
                106,
            low:
                98,
            close:
                104,
            volume:
                1050000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    3
                ),
            open:
                104,
            high:
                109,
            low:
                102,
            close:
                107,
            volume:
                1180000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    6
                ),
            open:
                107,
            high:
                111,
            low:
                103,
            close:
                105,
            volume:
                970000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    7
                ),
            open:
                105,
            high:
                110,
            low:
                104,
            close:
                109,
            volume:
                1230000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    8
                ),
            open:
                109,
            high:
                114,
            low:
                107,
            close:
                112,
            volume:
                1320000
        }
    ];
```

## Minimal TypeScript Configuration

```typescript
const stockChart: StockChart =
    new StockChart({
        theme:
            'Fluent2',

        primaryXAxis: {
            valueType:
                'DateTime'
        },

        series: [
            {
                type:
                    'Candle',
                dataSource:
                    stockData,
                xName:
                    'date',
                open:
                    'open',
                high:
                    'high',
                low:
                    'low',
                close:
                    'close'
            }
        ]
    });

stockChart.appendTo(
    '#stock-chart'
);
```

## Module Injection

Only inject modules used by the example.

### Candle Series

```typescript
import {
    CandleSeries
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    CandleSeries
);
```

### DateTime Axis

```typescript
import {
    DateTime
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime
);
```

### Tooltip

```typescript
import {
    Tooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Tooltip
);
```

### Range Tooltip

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip
);
```

### Crosshair

```typescript
import {
    Crosshair
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Crosshair
);
```

### Other Series Types

Import each series module required by the configured series.

```typescript
import {
    AreaSeries,
    CandleSeries,
    HiloOpenCloseSeries,
    HiloSeries,
    LineSeries,
    SplineSeries
} from '@syncfusion/ej2-charts';
```

Inject only the selected modules:

```typescript
StockChart.Inject(
    AreaSeries,
    CandleSeries,
    HiloOpenCloseSeries,
    HiloSeries,
    LineSeries,
    SplineSeries
);
```

A hollow candle uses:

```typescript
{
    type:
        'Candle',
    enableSolidCandle:
        false
}
```

Do not import and inject every available series module in a minimal example.

## Data Binding

## Financial Field Mapping

A Candle or HiloOpenClose series requires explicit financial field mappings.

```typescript
series: [
    {
        type:
            'Candle',
        dataSource:
            stockData,
        xName:
            'date',
        open:
            'open',
        high:
            'high',
        low:
            'low',
        close:
            'close'
    }
]
```

Do not use `yName` as a replacement for OHLC mappings.

Incorrect:

```typescript
series: [
    {
        type:
            'Candle',
        dataSource:
            stockData,
        xName:
            'date',
        yName:
            'close'
    }
]
```

Correct:

```typescript
series: [
    {
        type:
            'Candle',
        dataSource:
            stockData,
        xName:
            'date',
        open:
            'open',
        high:
            'high',
        low:
            'low',
        close:
            'close'
    }
]
```

The `yName` property is appropriate for a single-value series:

```typescript
series: [
    {
        type:
            'Line',
        dataSource:
            stockData,
        xName:
            'date',
        yName:
            'close'
    }
]
```

## Validate Financial Data

Validate every record before binding:

```typescript
const validateStockData = (
    data:
        StockData[]
): void => {
    data.forEach(
        (
            item:
                StockData,
            index:
                number
        ): void => {
            if (
                !(
                    item.date instanceof
                    Date
                ) ||
                Number.isNaN(
                    item.date.getTime()
                )
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains an invalid date.'
                );
            }

            const financialValues:
                number[] = [
                    item.open,
                    item.high,
                    item.low,
                    item.close
                ];

            if (
                financialValues.some(
                    (
                        value:
                            number
                    ): boolean => {
                        return (
                            !Number.isFinite(
                                value
                            )
                        );
                    }
                )
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains a non-finite OHLC value.'
                );
            }

            if (
                item.high <
                    item.low
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' has a high value below its low value.'
                );
            }

            if (
                item.open >
                    item.high ||
                item.open <
                    item.low ||
                item.close >
                    item.high ||
                item.close <
                    item.low
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains an open or close value outside its high-low range.'
                );
            }

            if (
                !Number.isFinite(
                    item.volume
                ) ||
                item.volume < 0
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains invalid volume.'
                );
            }
        }
    );
};
```

## Local Data

Bind local data through the series `dataSource`:

```typescript
const stockChart: StockChart =
    new StockChart({
        series: [
            {
                type:
                    'Candle',
                dataSource:
                    stockData,
                xName:
                    'date',
                open:
                    'open',
                high:
                    'high',
                low:
                    'low',
                close:
                    'close',
                volume:
                    'volume'
            }
        ]
    });
```

Sort data chronologically before binding:

```typescript
const sortedStockData:
    StockData[] = [
        ...stockData
    ].sort(
        (
            first:
                StockData,
            second:
                StockData
        ): number => {
            return (
                first.date.getTime() -
                second.date.getTime()
            );
        }
    );
```

Do not mutate a shared application collection through `sort()` unless that mutation is intentional.

## Remote Data

Remote data can be loaded through `DataManager`.

```typescript
import {
    DataManager,
    ODataV4Adaptor
} from '@syncfusion/ej2-data';

const remoteData:
    DataManager =
        new DataManager({
            url:
                'https://example.com/odata/stocks',

            adaptor:
                new ODataV4Adaptor()
        });
```

Bind the remote data:

```typescript
const stockChart: StockChart =
    new StockChart({
        series: [
            {
                type:
                    'Candle',
                dataSource:
                    remoteData,
                xName:
                    'date',
                open:
                    'open',
                high:
                    'high',
                low:
                    'low',
                close:
                    'close'
            }
        ]
    });
```

The URL must be a plain string.

Do not place an anchor element inside the TypeScript URL.

Validate:

- Endpoint accessibility.
- HTTPS usage.
- CORS configuration.
- Authentication.
- Response structure.
- Field-name casing.
- Date parsing.
- Null records.
- Numeric OHLC fields.
- Chronological ordering.
- Error responses.
- Content Security Policy.

Do not present `https://example.com/odata/stocks` as a working service. It is a placeholder and must be replaced with an application endpoint.

## Tooltip and Crosshair

### Required Imports

```typescript
import {
    Crosshair,
    RangeTooltip,
    Tooltip
} from '@syncfusion/ej2-charts';
```

### Required Injection

```typescript
StockChart.Inject(
    Tooltip,
    Crosshair,
    RangeTooltip
);
```

### Configuration

```typescript
tooltip: {
    enable:
        true,
    shared:
        true
},

crosshair: {
    enable:
        true,
    lineType:
        'Both'
}
```

Enable crosshair tooltips on the axes:

```typescript
primaryXAxis: {
    valueType:
        'DateTime',

    crosshairTooltip: {
        enable:
            true
    }
},

primaryYAxis: {
    crosshairTooltip: {
        enable:
            true
    }
}
```

`Tooltip` supports primary series tooltips.

`RangeTooltip` supports the Stock Chart range navigator tooltip.

Do not make tooltip content the only persistent source of decision-critical values.

## Period and Range Selection

Configure period-selector entries:

```typescript
periods: [
    {
        text:
            '1M',
        interval:
            1,
        intervalType:
            'Months'
    },
    {
        text:
            '3M',
        interval:
            3,
        intervalType:
            'Months'
    },
    {
        text:
            '6M',
        interval:
            6,
        intervalType:
            'Months'
    },
    {
        text:
            'YTD'
    },
    {
        text:
            '1Y',
        interval:
            1,
        intervalType:
            'Years'
    },
    {
        text:
            'All',
        selected:
            true
    }
]
```

Select only one default period.

Avoid:

```typescript
periods: [
    {
        text:
            '1M',
        selected:
            true
    },
    {
        text:
            'All',
        selected:
            true
    }
]
```

Use period options that are meaningful for the available date span.

## Themes and Stylesheets

Theme setup is mandatory for every complete Stock Chart getting-started example.

Do not assume another file already explains it.

## TypeScript Fluent 2 Theme

Install:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

Import:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/stock-chart/index.css";
```

Configure:

```typescript
theme:
    'Fluent2'
```

## JavaScript Tailwind 3 Theme

Load the versioned stylesheet:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>
```

Load the matching bundle:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
></script>
```

Configure:

```javascript
theme:
    'Tailwind3'
```

## Bootstrap 5 Alternative

If the example intentionally uses Bootstrap 5, load:

```html
https://cdn.syncfusion.com/ej2/34.2.2/bootstrap5.css
```

Configure:

```typescript
theme:
    'Bootstrap5'
```

Do not load Tailwind 3 CSS while configuring `Bootstrap5`.

Do not load Bootstrap 5 CSS while configuring `Tailwind3`.

## Theme Consistency

Every example must follow:

```text
Theme package or CDN stylesheet
        ↓
Compatible Stock Chart theme value
        ↓
Same Syncfusion release version
        ↓
No conflicting Syncfusion theme
```

## Candle Colors

Configure Candle colors through:

```typescript
bearFillColor:
    '#dc2626',

bullFillColor:
    '#16a34a'
```

Validate the rendered result against:

- The installed EJ2 version.
- The selected Candle mode.
- `enableSolidCandle`.
- The selected theme.

Do not rely only on red and green to communicate financial movement.

Provide supporting text or tooltip data that includes open and close values.

## Dynamic Data Updates

Replace the series data source:

```typescript
stockChart.series[0]
    .dataSource =
        updatedStockData;

stockChart.dataBind();
```

Update the title:

```typescript
stockChart.title =
    'Updated Stock Price';

stockChart.dataBind();
```

Use `dataBind()` for normal property updates.

Use `refresh()` when:

- The host dimensions changed.
- A hidden parent became visible.
- A complete layout recalculation is required.
- The series structure changed substantially.

Batch related updates:

```typescript
stockChart.title =
    'Updated Stock Price';

stockChart.series[0]
    .dataSource =
        updatedStockData;

stockChart.dataBind();
```

Avoid calling `dataBind()` after every individual assignment.

## Complete TypeScript Example

### Install Packages

```bash
npm install @syncfusion/ej2-charts
npm install @syncfusion/ej2-fluent2-theme --save
```

### src/styles/styles.css

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/stock-chart/index.css";

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    color: #0f172a;
    background: #f8fafc;
    font-family:
        "Segoe UI",
        Arial,
        sans-serif;
}

.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
}

.stock-chart-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

.stock-chart-card h1 {
    margin: 0 0 6px;
    font-size: 24px;
}

.stock-chart-card > p {
    margin: 0 0 16px;
    color: #475569;
    line-height: 1.5;
}

#stock-chart {
    width: 100%;
    min-height: 650px;
}

.stock-summary {
    margin-top: 18px;
    padding: 16px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
}

.stock-summary h2 {
    margin: 0 0 8px;
    font-size: 18px;
}

.stock-summary p {
    margin: 4px 0;
}

.status-message {
    margin-top: 12px;
    color: #475569;
}

@media (max-width: 767px) {
    .page-container {
        padding: 12px;
    }

    .stock-chart-card {
        padding: 12px;
    }

    #stock-chart {
        min-height: 500px;
    }
}
```

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

    <title>EJ2 Stock Chart</title>

    ./styles/styles.css
</head>

<body>
    <main class="page-container">
        <section
            class="stock-chart-card"
            aria-labelledby="stock-chart-heading"
            aria-describedby="stock-chart-description"
        >
            <h1 id="stock-chart-heading">
                Daily Stock Price
            </h1>

            <p id="stock-chart-description">
                Daily open, high, low, and close prices for the
                selected sample interval.
            </p>

            <div id="stock-chart"></div>

            <section
                class="stock-summary"
                aria-labelledby="stock-summary-heading"
            >
                <h2 id="stock-summary-heading">
                    Latest trading record
                </h2>

                <p id="latest-date"></p>
                <p id="latest-open"></p>
                <p id="latest-high"></p>
                <p id="latest-low"></p>
                <p id="latest-close"></p>
            </section>

            <p
                id="stock-chart-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the Stock Chart.
            </p>
        </section>
    </main>

    <script src="./index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    CandleSeries,
    Crosshair,
    DateTime,
    RangeTooltip,
    StockChart,
    Tooltip
} from '@syncfusion/ej2-charts';

interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

StockChart.Inject(
    DateTime,
    CandleSeries,
    Tooltip,
    Crosshair,
    RangeTooltip
);

const stockData:
    StockData[] = [
        {
            date:
                new Date(
                    2025,
                    0,
                    2
                ),
            open:
                100,
            high:
                106,
            low:
                98,
            close:
                104,
            volume:
                1050000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    3
                ),
            open:
                104,
            high:
                109,
            low:
                102,
            close:
                107,
            volume:
                1180000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    6
                ),
            open:
                107,
            high:
                111,
            low:
                103,
            close:
                105,
            volume:
                970000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    7
                ),
            open:
                105,
            high:
                110,
            low:
                104,
            close:
                109,
            volume:
                1230000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    8
                ),
            open:
                109,
            high:
                114,
            low:
                107,
            close:
                112,
            volume:
                1320000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    9
                ),
            open:
                112,
            high:
                115,
            low:
                108,
            close:
                110,
            volume:
                1160000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    10
                ),
            open:
                110,
            high:
                117,
            low:
                109,
            close:
                115,
            volume:
                1420000
        },
        {
            date:
                new Date(
                    2025,
                    0,
                    13
                ),
            open:
                115,
            high:
                119,
            low:
                112,
            close:
                117,
            volume:
                1380000
        }
    ];

const validateStockData = (
    data:
        StockData[]
): void => {
    if (
        data.length ===
        0
    ) {
        throw new Error(
            'The Stock Chart requires at least one data record.'
        );
    }

    data.forEach(
        (
            item:
                StockData,
            index:
                number
        ): void => {
            if (
                !(
                    item.date instanceof
                    Date
                ) ||
                Number.isNaN(
                    item.date.getTime()
                )
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains an invalid date.'
                );
            }

            const values:
                number[] = [
                    item.open,
                    item.high,
                    item.low,
                    item.close
                ];

            if (
                values.some(
                    (
                        value:
                            number
                    ): boolean => {
                        return (
                            !Number.isFinite(
                                value
                            )
                        );
                    }
                )
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains a non-finite OHLC value.'
                );
            }

            if (
                item.high <
                    item.low
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' has a high value below its low value.'
                );
            }

            if (
                item.open <
                    item.low ||
                item.open >
                    item.high ||
                item.close <
                    item.low ||
                item.close >
                    item.high
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains an open or close value outside its high-low range.'
                );
            }

            if (
                !Number.isFinite(
                    item.volume
                ) ||
                item.volume < 0
            ) {
                throw new Error(
                    'Stock record ' +
                    index +
                    ' contains invalid volume.'
                );
            }
        }
    );
};

validateStockData(
    stockData
);

const sortedStockData:
    StockData[] = [
        ...stockData
    ].sort(
        (
            first:
                StockData,
            second:
                StockData
        ): number => {
            return (
                first.date.getTime() -
                second.date.getTime()
            );
        }
    );

const stockChartElement:
    HTMLElement | null =
        document.getElementById(
            'stock-chart'
        );

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'stock-chart-status'
        );

if (!stockChartElement) {
    throw new Error(
        'The Stock Chart container "#stock-chart" was not found.'
    );
}

const latestRecord:
    StockData =
        sortedStockData[
            sortedStockData.length -
            1
        ];

const setText = (
    id:
        string,
    text:
        string
): void => {
    const element:
        HTMLElement | null =
            document.getElementById(
                id
            );

    if (element) {
        element.textContent =
            text;
    }
};

setText(
    'latest-date',
    'Date: ' +
        latestRecord.date
            .toLocaleDateString()
);

setText(
    'latest-open',
    'Open: $' +
        latestRecord.open
            .toFixed(
                2
            )
);

setText(
    'latest-high',
    'High: $' +
        latestRecord.high
            .toFixed(
                2
            )
);

setText(
    'latest-low',
    'Low: $' +
        latestRecord.low
            .toFixed(
                2
            )
);

setText(
    'latest-close',
    'Close: $' +
        latestRecord.close
            .toFixed(
                2
            )
);

const stockChart:
    StockChart =
        new StockChart({
            width:
                '100%',

            height:
                '650px',

            theme:
                'Fluent2',

            title:
                'Daily Stock Price',

            primaryXAxis: {
                valueType:
                    'DateTime',

                majorGridLines: {
                    width:
                        0
                },

                crosshairTooltip: {
                    enable:
                        true
                }
            },

            primaryYAxis: {
                labelFormat:
                    '${value}',

                lineStyle: {
                    width:
                        0
                },

                majorTickLines: {
                    width:
                        0
                },

                crosshairTooltip: {
                    enable:
                        true
                }
            },

            tooltip: {
                enable:
                    true,
                shared:
                    true
            },

            crosshair: {
                enable:
                    true,
                lineType:
                    'Both'
            },

            periods: [
                {
                    text:
                        '1M',
                    interval:
                        1,
                    intervalType:
                        'Months'
                },
                {
                    text:
                        '3M',
                    interval:
                        3,
                    intervalType:
                        'Months'
                },
                {
                    text:
                        '6M',
                    interval:
                        6,
                    intervalType:
                        'Months'
                },
                {
                    text:
                        'YTD'
                },
                {
                    text:
                        '1Y',
                    interval:
                        1,
                    intervalType:
                        'Years'
                },
                {
                    text:
                        'All',
                    selected:
                        true
                }
            ],

            series: [
                {
                    type:
                        'Candle',
                    dataSource:
                        sortedStockData,
                    xName:
                        'date',
                    open:
                        'open',
                    high:
                        'high',
                    low:
                        'low',
                    close:
                        'close',
                    volume:
                        'volume',
                    name:
                        'Stock Price',
                    bearFillColor:
                        '#dc2626',
                    bullFillColor:
                        '#16a34a',

                    animation: {
                        enable:
                            true
                    }
                }
            ],

            indicatorType:
                [],

            trendlineType:
                [],

            exportType:
                [],

            loaded:
                (): void => {
                    if (
                        statusElement
                    ) {
                        statusElement.textContent =
                            'The Stock Chart loaded successfully.';
                    }
                }
        });

stockChart.appendTo(
    stockChartElement
);

let resizeTimer:
    number | undefined;

const handleResize =
    (): void => {
        if (
            resizeTimer !==
            undefined
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
    };

window.addEventListener(
    'resize',
    handleResize
);
```

Cleanup when the dynamic view is removed:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

if (
    resizeTimer !==
    undefined
) {
    window.clearTimeout(
        resizeTimer
    );
}

stockChart.destroy();
```

## Complete JavaScript Example

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 JavaScript Stock Chart</title>

    <link
        rel="stylesheet"
        href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
    >

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
    ></script>

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
            color: #0f172a;
            background: #f8fafc;
            font-family:
                "Segoe UI",
                Arial,
                sans-serif;
        }

        .page-container {
            width: 100%;
            min-height: 100vh;
            padding: 24px;
        }

        .stock-chart-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
        }

        .stock-chart-card h1 {
            margin: 0 0 6px;
            font-size: 24px;
        }

        .stock-chart-card > p {
            margin: 0 0 16px;
            color: #475569;
            line-height: 1.5;
        }

        #stock-chart {
            width: 100%;
            min-height: 650px;
        }

        .stock-summary {
            margin-top: 18px;
            padding: 16px;
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
        }

        .stock-summary h2 {
            margin: 0 0 8px;
            font-size: 18px;
        }

        .stock-summary p {
            margin: 4px 0;
        }

        .status-message {
            margin-top: 12px;
            color: #475569;
        }

        @media (max-width: 767px) {
            .page-container {
                padding: 12px;
            }

            .stock-chart-card {
                padding: 12px;
            }

            #stock-chart {
                min-height: 500px;
            }
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="stock-chart-card"
            aria-labelledby="stock-chart-heading"
            aria-describedby="stock-chart-description"
        >
            <h1 id="stock-chart-heading">
                Daily Stock Price
            </h1>

            <p id="stock-chart-description">
                Daily open, high, low, and close prices for the
                selected sample interval.
            </p>

            <div id="stock-chart"></div>

            <section
                class="stock-summary"
                aria-labelledby="stock-summary-heading"
            >
                <h2 id="stock-summary-heading">
                    Latest trading record
                </h2>

                <p id="latest-date"></p>
                <p id="latest-open"></p>
                <p id="latest-high"></p>
                <p id="latest-low"></p>
                <p id="latest-close"></p>
            </section>

            <p
                id="stock-chart-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the Stock Chart.
            </p>
        </section>
    </main>

    <script>
        if (
            typeof window.ej ===
                'undefined' ||
            !window.ej.charts ||
            !window.ej.charts.StockChart
        ) {
            throw new Error(
                'The EJ2 Stock Chart global bundle was not loaded.'
            );
        }

        var stockData = [
            {
                date:
                    new Date(
                        2025,
                        0,
                        2
                    ),
                open:
                    100,
                high:
                    106,
                low:
                    98,
                close:
                    104,
                volume:
                    1050000
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        3
                    ),
                open:
                    104,
                high:
                    109,
                low:
                    102,
                close:
                    107,
                volume:
                    1180000
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        6
                    ),
                open:
                    107,
                high:
                    111,
                low:
                    103,
                close:
                    105,
                volume:
                    970000
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        7
                    ),
                open:
                    105,
                high:
                    110,
                low:
                    104,
                close:
                    109,
                volume:
                    1230000
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        8
                    ),
                open:
                    109,
                high:
                    114,
                low:
                    107,
                close:
                    112,
                volume:
                    1320000
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        9
                    ),
                open:
                    112,
                high:
                    115,
                low:
                    108,
                close:
                    110,
                volume:
                    1160000
            },
            {
                date:
                    new Date(
                        2025,
                        0,
                        10
                    ),
                open:
                    110,
                high:
                    117,
                low:
                    109,
                close:
                    115,
                volume:
                    1420000
            }
        ];

        function validateStockData(
            data
        ) {
            if (
                !Array.isArray(
                    data
                ) ||
                data.length ===
                    0
            ) {
                throw new Error(
                    'The Stock Chart requires data.'
                );
            }

            data.forEach(
                function (
                    item,
                    index
                ) {
                    if (
                        !(
                            item.date instanceof
                            Date
                        ) ||
                        Number.isNaN(
                            item.date
                                .getTime()
                        )
                    ) {
                        throw new Error(
                            'Stock record ' +
                            index +
                            ' contains an invalid date.'
                        );
                    }

                    var values = [
                        item.open,
                        item.high,
                        item.low,
                        item.close
                    ];

                    if (
                        values.some(
                            function (
                                value
                            ) {
                                return (
                                    !Number.isFinite(
                                        value
                                    )
                                );
                            }
                        )
                    ) {
                        throw new Error(
                            'Stock record ' +
                            index +
                            ' contains a non-finite OHLC value.'
                        );
                    }

                    if (
                        item.high <
                            item.low
                    ) {
                        throw new Error(
                            'Stock record ' +
                            index +
                            ' has a high value below its low value.'
                        );
                    }
                }
            );
        }

        validateStockData(
            stockData
        );

        stockData.sort(
            function (
                first,
                second
            ) {
                return (
                    first.date
                        .getTime() -
                    second.date
                        .getTime()
                );
            }
        );

        var host =
            document.getElementById(
                'stock-chart'
            );

        var statusElement =
            document.getElementById(
                'stock-chart-status'
            );

        if (!host) {
            throw new Error(
                'The Stock Chart container "#stock-chart" was not found.'
            );
        }

        var latestRecord =
            stockData[
                stockData.length -
                1
            ];

        function setText(
            id,
            text
        ) {
            var element =
                document.getElementById(
                    id
                );

            if (element) {
                element.textContent =
                    text;
            }
        }

        setText(
            'latest-date',
            'Date: ' +
                latestRecord.date
                    .toLocaleDateString()
        );

        setText(
            'latest-open',
            'Open: $' +
                latestRecord.open
                    .toFixed(
                        2
                    )
        );

        setText(
            'latest-high',
            'High: $' +
                latestRecord.high
                    .toFixed(
                        2
                    )
        );

        setText(
            'latest-low',
            'Low: $' +
                latestRecord.low
                    .toFixed(
                        2
                    )
        );

        setText(
            'latest-close',
            'Close: $' +
                latestRecord.close
                    .toFixed(
                        2
                    )
        );

        var stockChart =
            new ej.charts.StockChart({
                width:
                    '100%',

                height:
                    '650px',

                theme:
                    'Tailwind3',

                title:
                    'Daily Stock Price',

                primaryXAxis: {
                    valueType:
                        'DateTime',

                    majorGridLines: {
                        width:
                            0
                    },

                    crosshairTooltip: {
                        enable:
                            true
                    }
                },

                primaryYAxis: {
                    labelFormat:
                        '${value}',

                    lineStyle: {
                        width:
                            0
                    },

                    majorTickLines: {
                        width:
                            0
                    },

                    crosshairTooltip: {
                        enable:
                            true
                    }
                },

                tooltip: {
                    enable:
                        true,
                    shared:
                        true
                },

                crosshair: {
                    enable:
                        true,
                    lineType:
                        'Both'
                },

                periods: [
                    {
                        text:
                            '1M',
                        interval:
                            1,
                        intervalType:
                            'Months'
                    },
                    {
                        text:
                            '3M',
                        interval:
                            3,
                        intervalType:
                            'Months'
                    },
                    {
                        text:
                            '6M',
                        interval:
                            6,
                        intervalType:
                            'Months'
                    },
                    {
                        text:
                            'YTD'
                    },
                    {
                        text:
                            '1Y',
                        interval:
                            1,
                        intervalType:
                            'Years'
                    },
                    {
                        text:
                            'All',
                        selected:
                            true
                    }
                ],

                series: [
                    {
                        type:
                            'Candle',
                        dataSource:
                            stockData,
                        xName:
                            'date',
                        open:
                            'open',
                        high:
                            'high',
                        low:
                            'low',
                        close:
                            'close',
                        volume:
                            'volume',
                        name:
                            'Stock Price',
                        bearFillColor:
                            '#dc2626',
                        bullFillColor:
                            '#16a34a'
                    }
                ],

                indicatorType:
                    [],

                trendlineType:
                    [],

                exportType:
                    [],

                loaded:
                    function () {
                        statusElement.textContent =
                            'The Stock Chart loaded successfully.';
                    }
            });

        stockChart.appendTo(
            host
        );
    </script>
</body>
</html>
```

## Accessibility Guidance

- Provide a semantic page heading.
- Provide a concise description of the financial visualization.
- Do not rely only on candle color.
- Provide persistent open, high, low, and close values for important records.
- Preserve visible keyboard focus for toolbar and selector controls.
- Ensure tooltip text has sufficient contrast.
- Do not make tooltip content the only source of important information.
- Use meaningful period labels.
- Test the Stock Chart at browser zoom levels.
- Test keyboard, touch, and screen-reader behavior.
- Avoid claiming that the complete application is automatically compliant with an accessibility standard.

## Performance and Cleanup

- Sort data once before binding.
- Validate remote data before assigning it.
- Avoid rebuilding unchanged series collections.
- Batch property updates and call `dataBind()` once.
- Debounce manual resize handling.
- Use `refresh()` only when a layout recalculation is needed.
- Remove application-owned event listeners.
- Clear pending timers.
- Cancel pending data requests when appropriate.
- Destroy the Stock Chart when its dynamic host is removed.

```typescript
stockChart.destroy();
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-charts is installed.
✅ A compatible Syncfusion theme package is installed for TypeScript.
✅ The focused Stock Chart stylesheet is imported.
✅ JavaScript loads a versioned EJ2 theme stylesheet.
✅ JavaScript loads the matching versioned EJ2 bundle.
✅ The CDN CSS and JavaScript versions match.
✅ The configured Stock Chart theme matches the stylesheet family.
✅ Only the required Syncfusion theme is loaded.
✅ Bootstrap is not added to a Tailwind example without an application requirement.
✅ Tailwind is not added to a Bootstrap example.
✅ StockChart is imported from @syncfusion/ej2-charts.
✅ JavaScript uses ej.charts.StockChart.
✅ The host exists before rendering.
✅ The appendTo target matches the host ID.
✅ The host has measurable dimensions.
✅ Dates are valid JavaScript Date objects.
✅ primaryXAxis.valueType is DateTime.
✅ DateTime is imported and injected.
✅ Candle usage imports and injects CandleSeries.
✅ The Candle series maps xName.
✅ The Candle series maps open.
✅ The Candle series maps high.
✅ The Candle series maps low.
✅ The Candle series maps close.
✅ yName is not used as a substitute for OHLC mappings.
✅ OHLC values are finite.
✅ High is not below low.
✅ Open and close remain within the high-low range.
✅ Tooltip usage imports and injects Tooltip.
✅ Crosshair usage imports and injects Crosshair.
✅ Range-tooltip usage imports and injects RangeTooltip.
✅ Unused modules are excluded.
✅ Only one period is selected by default.
✅ Local data is sorted chronologically.
✅ Remote response fields match configured mappings.
✅ Remote dates are parsed correctly.
✅ Remote URLs are plain strings.
✅ No malformed anchor markup remains in HTML or TypeScript.
✅ Theme names are valid for the installed EJ2 version.
✅ Theme CSS and component theme are aligned.
✅ Ordinary updates call dataBind().
✅ Hidden-container recovery calls refresh().
✅ Manual resize handlers are debounced.
✅ Application-owned listeners and timers are cleaned up.
✅ stockChart.destroy() is called when a dynamic host is removed.
✅ The TypeScript and JavaScript examples are complete and runnable.
✅ Vue, React, Angular, providers, directives, and Single File Components are not used.
```

## Troubleshooting

## Stock Chart Does Not Render

Verify:

1. The host exists before initialization.
2. The selector matches the host ID.
3. The parent has an available width.
4. The Stock Chart has a usable height.
5. The theme stylesheet is loaded.
6. The stylesheet request returns successfully.
7. The required modules are injected.
8. No JavaScript error occurs before `appendTo()`.
9. The component is not initialized twice in the same host.
10. The selected theme is supported by the installed package.

## Stock Chart Controls Are Unstyled

Verify:

- The selected Syncfusion stylesheet is loaded.
- The CSS request returns HTTP 200.
- The stylesheet loads before initialization.
- The stylesheet and JavaScript bundle use the same version.
- The component theme matches the stylesheet family.
- No second Syncfusion theme overrides it.
- The TypeScript CSS import resolves through the bundler.
- Browser caching is not serving an older stylesheet.
- Content Security Policy permits CDN stylesheets.

## Candle Series Does Not Render

Verify:

```typescript
xName:
    'date',

open:
    'open',

high:
    'high',

low:
    'low',

close:
    'close'
```

Also verify:

- Every field exists.
- Field casing matches.
- Values are numeric.
- Dates are valid.
- `CandleSeries` is injected.
- The data collection is nonempty.

## Date Axis Does Not Render Correctly

Use `Date` objects:

```typescript
date:
    new Date(
        2025,
        0,
        2
    )
```

Configure:

```typescript
primaryXAxis: {
    valueType:
        'DateTime'
}
```

Inject:

```typescript
StockChart.Inject(
    DateTime
);
```

## Tooltip Is Missing

Import and inject:

```typescript
import {
    Tooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Tooltip
);
```

Enable:

```typescript
tooltip: {
    enable:
        true
}
```

## Range Tooltip Is Missing

Import and inject:

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip
);
```

## Crosshair Is Missing

Import and inject:

```typescript
import {
    Crosshair
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Crosshair
);
```

Enable:

```typescript
crosshair: {
    enable:
        true
}
```

## Hidden Container

If the Stock Chart is initialized inside a hidden tab, dialog, accordion, or panel, call:

```typescript
stockChart.refresh();
```

after the parent becomes visible.

## JavaScript Namespace Is Undefined

Check:

```javascript
if (
    typeof window.ej ===
        'undefined' ||
    !window.ej.charts
) {
    throw new Error(
        'The EJ2 bundle was not loaded.'
    );
}
```

Ensure the bundle loads before the application script.

## Combined Mistakes and Future References

### Missing TypeScript Theme Package

Incorrect:

```bash
npm install @syncfusion/ej2-charts
```

with no theme package or stylesheet.

Correct:

```bash
npm install @syncfusion/ej2-charts
npm install @syncfusion/ej2-fluent2-theme --save
```

### Missing Stock Chart CSS Import

Incorrect:

```css
/* No Stock Chart theme import */
```

Correct:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/stock-chart/index.css";
```

### Missing OHLC Mappings

Incorrect:

```typescript
series: [
    {
        type:
            'Candle',
        dataSource:
            stockData,
        xName:
            'date',
        yName:
            'close'
    }
]
```

Correct:

```typescript
series: [
    {
        type:
            'Candle',
        dataSource:
            stockData,
        xName:
            'date',
        open:
            'open',
        high:
            'high',
        low:
            'low',
        close:
            'close'
    }
]
```

### Unused HiloOpenClose Import

Avoid importing and injecting:

```typescript
HiloOpenCloseSeries
```

when the example uses only:

```typescript
type:
    'Candle'
```

### Missing RangeTooltip

When the range navigator tooltip is required, include `RangeTooltip` in both the import and injection lists.

### Malformed CDN Stylesheet

Incorrect:

```html
https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css
```

Correct:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>
```

### Malformed CDN Script

Incorrect:

```html
https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js
```

Correct:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
></script>
```

### Mismatched CDN Versions

Incorrect:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>

https://cdn.syncfusion.com/ej2/34.1.29/dist/ej2.min.jsscript>
```

Correct:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"
></script>
```

### Theme and Stylesheet Mismatch

Incorrect:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>
```

```typescript
theme:
    'Bootstrap5'
```

Correct:

```html
<link
    rel="stylesheet"
    href="https://cdn.syncfusion.com/ej2/34.2.2/tailwind3.css"
>
```

```typescript
theme:
    'Tailwind3'
```

### Unnecessary Bootstrap Dependency

Avoid Bootstrap 3 CSS in a focused Tailwind 3 Stock Chart example unless the application independently requires it.

### Placeholder URL Wrapped in HTML

Incorrect:

```typescript
url:
    'https://example.com/odata/stockshttps://example.com/odata/stocks</a>'
```

Correct:

```typescript
url:
    'https://example.com/odata/stocks'
```

### Incorrect Theme Assumption

Do not assume every release supports the same theme enum values.

Validate:

```typescript
theme:
    'Fluent2'
```

or:

```typescript
theme:
    'Tailwind3'
```

against the installed Charts package.

### Ambiguous Bull and Bear Descriptions

Do not state that `bearFillColor` always represents falling prices and `bullFillColor` always represents rising prices without validating the configured Candle mode and installed version.

### Missing DateTime Module

Incorrect:

```typescript
primaryXAxis: {
    valueType:
        'DateTime'
}
```

without importing and injecting `DateTime`.

Correct:

```typescript
import {
    DateTime
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime
);
```

### Multiple Selected Periods

Incorrect:

```typescript
periods: [
    {
        text:
            '1M',
        selected:
            true
    },
    {
        text:
            'All',
        selected:
            true
    }
]
```

Correct:

```typescript
periods: [
    {
        text:
            '1M'
    },
    {
        text:
            'All',
        selected:
            true
    }
]
```

### Repeated dataBind Calls

Avoid:

```typescript
stockChart.title =
    'Updated';

stockChart.dataBind();

stockChart.series[0]
    .dataSource =
        updatedStockData;

stockChart.dataBind();
```

Preferred:

```typescript
stockChart.title =
    'Updated';

stockChart.series[0]
    .dataSource =
        updatedStockData;

stockChart.dataBind();
```

### Missing Cleanup

When the dynamic view is removed:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

if (
    resizeTimer !==
    undefined
) {
    window.clearTimeout(
        resizeTimer
    );
}

stockChart.destroy();
```

### Assuming Another Reference Covers CSS

Incorrect:

```text
The Stock Chart getting-started example can omit theme
installation and CSS because another reference discusses themes.
```

Correct:

```text
Every Stock Chart getting-started example must include its own
complete and compatible theme installation, stylesheet, component
theme, and CDN version setup.
```

### Editor-Generated Markup

Remove the following from executable HTML, TypeScript, JavaScript, CSS, URLs, imports, and commands:

```text
<a>
data-lexical-text
Editor-generated class names
Encoded executable HTML
Malformed script elements
Malformed link elements
Chat-generated source markers
```