# Stock Chart Series Types

## Overview

The EJ2 Stock Chart supports the following principal series types:

- `Candle`
- Hollow Candle
- `Hilo`
- `HiloOpenClose`
- `Line`
- `Spline`

A Hollow Candle is configured as a Candle series with `enableSolidCandle: false`. Every series type requires its corresponding module to be imported and injected in TypeScript.

The Stock Chart examples also use `AreaSeries`, which can be useful for single-value data such as volume or another continuous measurement.

## Table of Contents

- #financial-and-single-value-series
- #candle-series
- #hollow-candle-series
- #hilo-series
- #hiloopenclose-series
- #line-series
- #area-series
- #spline-series
- #built-in-series-selector
- #multiple-series
- #series-customization
- #dynamic-series-updates
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Financial and Single-Value Series

Stock Chart series fall into two mapping categories.

### Financial Series

Financial series require dedicated price-field mappings.

#### Candle and HiloOpenClose

```typescript
xName: 'date',
open: 'open',
high: 'high',
low: 'low',
close: 'close'
```

#### Hilo

```typescript
xName: 'date',
high: 'high',
low: 'low'
```

### Single-Value Series

Line, Area, and Spline series use one numeric y-field.

```typescript
xName: 'date',
yName: 'close'
```

Do not use `yName` as a substitute for the dedicated OHLC mappings of a Candle or HiloOpenClose series.

## Candle Series

A Candle series displays the opening, highest, lowest, and closing values for each financial period.

Use it for:

- Standard stock-price visualization
- Detailed price movement
- Financial dashboards
- Technical-analysis interfaces
- Open, high, low, and close comparisons

The Candle type requires `CandleSeries` injection.

### TypeScript

```typescript
import {
    CandleSeries,
    DateTime,
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

StockChart.Inject(
    DateTime,
    CandleSeries
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
    }
];

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
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
                name: 'Stock Price'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

### JavaScript

```javascript
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
    }
];

var stockChart =
    new ej.charts.StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
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
                name: 'Stock Price'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

### Candle Colors

```typescript
{
    type: 'Candle',
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    bearFillColor: '#DC2626',
    bullFillColor: '#16A34A'
}
```

Do not describe `bullFillColor` and `bearFillColor` as universally meaning price-up and price-down colors without validating the rendered behavior in the installed EJ2 version and the configured solid-candle mode.

Do not rely only on red and green when users must interpret candle direction. Provide a tooltip, table, or textual description of the open and close values.

## Hollow Candle Series

A Hollow Candle uses the Candle series module and sets:

```typescript
enableSolidCandle: false
```

The Stock Chart documentation identifies Hollow Candle as a Candle series with `enableSolidCandle` disabled.

```typescript
import {
    CandleSeries,
    DateTime,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    CandleSeries
);

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Candle',
                enableSolidCandle: false,
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                name: 'Hollow Candle'
            }
        ]
    });
```

Do not use an invented series type:

```typescript
type: 'HollowCandle'
```

Use:

```typescript
type: 'Candle',
enableSolidCandle: false
```

## Hilo Series

A Hilo series displays the highest and lowest values for each period without rendering open and close ticks.

Use it when:

- Only high and low data is available
- Price-range comparison is the primary requirement
- A simplified financial representation is preferred

The Hilo type requires `HiloSeries` injection.

### TypeScript

```typescript
import {
    DateTime,
    HiloSeries,
    StockChart
} from '@syncfusion/ej2-charts';

interface HiloData {
    date: Date;
    high: number;
    low: number;
}

StockChart.Inject(
    DateTime,
    HiloSeries
);

const hiloData: HiloData[] = [
    {
        date: new Date(2025, 0, 2),
        high: 106,
        low: 98
    },
    {
        date: new Date(2025, 0, 3),
        high: 109,
        low: 102
    },
    {
        date: new Date(2025, 0, 6),
        high: 111,
        low: 103
    }
];

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Hilo',
                dataSource: hiloData,
                xName: 'date',
                high: 'high',
                low: 'low',
                name: 'Daily Range'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

### JavaScript

```javascript
var hiloData = [
    {
        date: new Date(2025, 0, 2),
        high: 106,
        low: 98
    },
    {
        date: new Date(2025, 0, 3),
        high: 109,
        low: 102
    }
];

var stockChart =
    new ej.charts.StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Hilo',
                dataSource: hiloData,
                xName: 'date',
                high: 'high',
                low: 'low',
                name: 'Daily Range'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

Do not omit the `high` and `low` mappings.

## HiloOpenClose Series

A HiloOpenClose series displays the high-low range with separate open and close ticks.

Use it for:

- Traditional OHLC financial visualization
- Dense trading datasets
- Platforms that prefer OHLC bars over candles
- Detailed open and close comparison without filled candle bodies

The type requires `HiloOpenCloseSeries` injection.

### TypeScript

```typescript
import {
    DateTime,
    HiloOpenCloseSeries,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    HiloOpenCloseSeries
);

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'HiloOpenClose',
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                name: 'OHLC Price',
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

### JavaScript

```javascript
var stockChart =
    new ej.charts.StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'HiloOpenClose',
                dataSource: stockData,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                name: 'OHLC Price'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

## Line Series

A Line series displays one numeric field over time.

Use it for:

- Closing-price trends
- Adjusted-close values
- Moving-average data
- Benchmark values
- Comparison series
- Simplified price history

The Line type requires `LineSeries` injection.

```typescript
import {
    DateTime,
    LineSeries,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    LineSeries
);

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Line',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                name: 'Closing Price',
                fill: '#2563EB',
                width: 2,
                marker: {
                    visible: true,
                    width: 6,
                    height: 6,
                    shape: 'Circle',
                    border: {
                        color: '#1D4ED8',
                        width: 1
                    }
                }
            }
        ]
    });
```

Markers can become cluttered on dense financial datasets. Prefer markers for short ranges or important points only.

## Area Series

An Area series displays one numeric value with the region beneath the path filled.

Use it for:

- Volume overview
- Account-value history
- Cumulative data already calculated by the application
- Emphasizing magnitude against a baseline

The module is:

```typescript
AreaSeries
```

```typescript
import {
    AreaSeries,
    DateTime,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    AreaSeries
);

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Area',
                dataSource: stockData,
                xName: 'date',
                yName: 'volume',
                name: 'Volume',
                fill:
                    'rgba(37, 99, 235, 0.30)',
                opacity: 0.7,
                border: {
                    color: '#2563EB',
                    width: 1
                }
            }
        ]
    });
```

Area does not automatically calculate cumulative values. If cumulative behavior is required, calculate the cumulative field before binding it.

Area is not always the clearest representation for trading volume. A Column series in a separate pane may provide better period-by-period comparison.

## Spline Series

A Spline series renders a smooth curve through single-value points.

Use it for:

- Smooth visual presentation
- Long-term trend summaries
- Comparison lines where curved interpolation is acceptable

The Spline type requires `SplineSeries` injection.

```typescript
import {
    DateTime,
    SplineSeries,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    SplineSeries
);

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Spline',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                name: 'Closing Price',
                fill: '#7C3AED',
                width: 2
            }
        ]
    });
```

A Spline changes the visual interpolation between points. It does not smooth, average, or reduce volatility in the underlying financial values.

Use a calculated moving average or another validated indicator when data smoothing is required.

## Built-In Series Selector

Stock Chart can expose supported series choices through its built-in series-selector toolbar.

Configure:

```typescript
seriesType: [
    'Line',
    'Spline',
    'Hilo',
    'HiloOpenClose',
    'Candle'
]
```

Every enabled choice must have its corresponding module injected:

```typescript
StockChart.Inject(
    LineSeries,
    SplineSeries,
    HiloSeries,
    HiloOpenCloseSeries,
    CandleSeries
);
```

The Stock Chart series-type documentation describes using the series dropdown to navigate among supported series types.

Example:

```typescript
const stockChart: StockChart =
    new StockChart({
        seriesType: [
            'Line',
            'Spline',
            'Hilo',
            'HiloOpenClose',
            'Candle'
        ],
        series: [
            {
                type: 'Candle',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close'
            }
        ]
    });
```

When the built-in selector can switch between financial and single-value types, include both:

```typescript
yName: 'close'
```

and:

```typescript
open: 'open',
high: 'high',
low: 'low',
close: 'close'
```

This gives Line or Spline a y-field while preserving the financial mappings required by Candle, Hilo, and HiloOpenClose.

Do not expose a type in `seriesType` unless its module was injected.

## Multiple Series

Multiple series can be displayed together when their scales and visual roles are clear.

Example with Candle and closing-price Line series:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    LineSeries
);

const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
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
                name: 'Price'
            },
            {
                type: 'Line',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                name: 'Close',
                fill: '#2563EB',
                width: 2
            }
        ]
    });
```

Use a secondary axis or pane when the second series has a substantially different scale, such as volume.

## Series Customization

### Fill and Width

Line, Area, and Spline:

```typescript
{
    fill: '#2563EB',
    width: 2
}
```

### Border

Use the nested `border` model when supported by the selected series:

```typescript
{
    border: {
        color: '#1E3A8A',
        width: 1
    }
}
```

Do not use:

```typescript
borderColor: '#333333',
borderWidth: 1
```

as assumed root-level series properties.

### Marker

```typescript
marker: {
    visible: true,
    width: 8,
    height: 8,
    shape: 'Circle',
    fill: '#FFFFFF',
    border: {
        color: '#2563EB',
        width: 2
    }
}
```

Markers are most suitable for:

- Line
- Area
- Spline

Validate marker behavior before applying it to financial series.

### Opacity

```typescript
opacity: 0.7
```

Opacity should usually be within:

```text
0 to 1
```

### Series Animation

```typescript
animation: {
    enable: false
}
```

Disable animation when:

- Data updates frequently
- The dataset is large
- The chart includes multiple financial series
- Animation makes financial changes harder to compare

## Data Labels

Data-label support and template context can differ by series type.

A support-safe Line-series example is:

```typescript
{
    type: 'Line',
    dataSource: stockData,
    xName: 'date',
    yName: 'close',
    dataLabel: {
        visible: true,
        position: 'Top'
    }
}
```

Do not assume this template is available for every Stock Chart series:

```typescript
dataLabel: {
    template:
        '<div>${point.close}</div>'
}
```

Validate:

- Whether the chosen series supports data labels
- The available template context
- Financial field placeholders
- Label overlap
- Performance on large datasets

Data labels on every Candle can make a financial chart unreadable. Prefer tooltips or a data table for dense data.

## Empty Point Handling

For a single-value series:

```typescript
{
    type: 'Line',
    dataSource: lineData,
    xName: 'date',
    yName: 'value',
    emptyPointSettings: {
        mode: 'Drop',
        fill: '#DC2626',
        border: {
            color: '#7F1D1D',
            width: 1
        }
    }
}
```

Do not use:

```typescript
emptyPointSettings: {
    borderColor: '#000000',
    borderWidth: 1
}
```

Prefer the nested `border` model after validating it against the installed Stock Chart series model.

Common empty-point modes may include:

```text
Gap
Zero
Drop
Average
```

Validate the exact supported values in the installed version.

For OHLC data, removing or averaging an incomplete candle can change its financial meaning. Validate and reject malformed records before binding rather than relying only on empty-point rendering.

## Series Visibility

Initial visibility:

```typescript
{
    type: 'Line',
    visible: true
}
```

Runtime update:

```typescript
stockChart.series[1].visible =
    false;

stockChart.dataBind();
```

Use `dataBind()` for an ordinary visibility update.

Use `refresh()` when:

- A series is inserted or removed
- The series type changes structurally
- Axes or panes change
- The legend or toolbar structure changes
- A complete layout calculation is required

## Dynamic Series Updates

### Change Line to Spline

Ensure both modules were injected:

```typescript
StockChart.Inject(
    LineSeries,
    SplineSeries
);
```

Update:

```typescript
stockChart.series[0].type =
    'Spline';

stockChart.refresh();
```

A structural series-type change can require `refresh()`.

### Change Candle to Hollow Candle

```typescript
stockChart
    .series[0]
    .type =
        'Candle';

stockChart
    .series[0]
    .enableSolidCandle =
        false;

stockChart.refresh();
```

### Update Line Color

```typescript
stockChart.series[0].fill =
    '#EA580C';

stockChart.dataBind();
```

### Replace the Datasource

```typescript
stockChart
    .series[0]
    .dataSource =
        updatedData;

stockChart.dataBind();
```

### Add a Series

```typescript
stockChart.addSeries(
    [
        {
            type: 'Line',
            dataSource: stockData,
            xName: 'date',
            yName: 'close',
            name: 'Close'
        }
    ]
);
```

Use `addSeries()` only if it is available in the installed Stock Chart API. Otherwise, replace the `series` collection and call `refresh()`.

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

    <title>Stock Chart Series Types</title>

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

        .series-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .series-controls button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .series-controls button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #series-status {
            min-height: 24px;
            color: #334155;
        }

        #stock-chart {
            width: 100%;
            min-height: 680px;
        }
    </style>
</head>
<body>
    <main
        class="stock-chart-card"
        aria-labelledby="stock-chart-heading"
    >
        <h1 id="stock-chart-heading">
            Stock Chart Series
        </h1>

        <p id="stock-chart-description">
            Use the built-in series selector or the
            buttons below to change the financial
            representation.
        </p>

        <div class="series-controls">
            <button
                id="show-candle"
                type="button"
            >
                Candle
            </button>

            <button
                id="show-hollow-candle"
                type="button"
            >
                Hollow Candle
            </button>

            <button
                id="show-hilo"
                type="button"
            >
                Hilo
            </button>

            <button
                id="show-hloc"
                type="button"
            >
                HiloOpenClose
            </button>

            <button
                id="show-line"
                type="button"
            >
                Line
            </button>

            <button
                id="show-spline"
                type="button"
            >
                Spline
            </button>
        </div>

        <p
            id="series-status"
            role="status"
            aria-live="polite"
        >
            Candle series is displayed.
        </p>

        <div
            id="stock-chart"
            aria-describedby="
                stock-chart-description
                series-status
            "
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
    HiloOpenCloseSeries,
    HiloSeries,
    LineSeries,
    RangeTooltip,
    SplineSeries,
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

type SupportedSeriesType =
    'Candle' |
    'Hilo' |
    'HiloOpenClose' |
    'Line' |
    'Spline';

StockChart.Inject(
    DateTime,
    CandleSeries,
    HiloSeries,
    HiloOpenCloseSeries,
    LineSeries,
    SplineSeries,
    RangeTooltip
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

const host:
    HTMLElement | null =
        document.querySelector(
            '#stock-chart'
        );

if (!host) {
    throw new Error(
        'The Stock Chart host was not found.'
    );
}

const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '680px',
        theme: 'Bootstrap5',
        title:
            'Daily Stock Price',
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
        seriesType: [
            'Line',
            'Spline',
            'Hilo',
            'HiloOpenClose',
            'Candle'
        ],
        series: [
            {
                type: 'Candle',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                volume: 'volume',
                name: 'Stock Price',
                enableSolidCandle: true,
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A',
                animation: {
                    enable: false
                }
            }
        ],
        indicatorType: [],
        trendlineType: [],
        exportType: []
    });

stockChart.appendTo(host);

const status:
    HTMLElement | null =
        document.querySelector(
            '#series-status'
        );

const applySeriesType = (
    type: SupportedSeriesType,
    solidCandle: boolean = true
): void => {
    const series =
        stockChart.series[0];

    series.type = type;

    if (type === 'Candle') {
        series.enableSolidCandle =
            solidCandle;
    } else {
        series.enableSolidCandle =
            true;
    }

    if (
        type === 'Line' ||
        type === 'Spline'
    ) {
        series.fill = '#2563EB';
        series.width = 2;
    }

    stockChart.refresh();

    if (status) {
        status.textContent =
            type === 'Candle' &&
            !solidCandle
                ? 'Hollow Candle series is displayed.'
                : `${type} series is displayed.`;
    }
};

const bindButton = (
    selector: string,
    handler: () => void
): void => {
    const button:
        HTMLButtonElement | null =
            document.querySelector(
                selector
            );

    if (button) {
        button.addEventListener(
            'click',
            handler
        );
    }
};

bindButton(
    '#show-candle',
    (): void => {
        applySeriesType(
            'Candle',
            true
        );
    }
);

bindButton(
    '#show-hollow-candle',
    (): void => {
        applySeriesType(
            'Candle',
            false
        );
    }
);

bindButton(
    '#show-hilo',
    (): void => {
        applySeriesType(
            'Hilo'
        );
    }
);

bindButton(
    '#show-hloc',
    (): void => {
        applySeriesType(
            'HiloOpenClose'
        );
    }
);

bindButton(
    '#show-line',
    (): void => {
        applySeriesType(
            'Line'
        );
    }
);

bindButton(
    '#show-spline',
    (): void => {
        applySeriesType(
            'Spline'
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

    <title>Stock Chart Series Types</title>

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
            background: #FFFFFF;
        }

        #stock-chart {
            width: 100%;
            min-height: 680px;
        }
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Stock Chart Series
        </h1>

        <p id="stock-chart-description">
            Use the built-in series selector to switch
            among the configured financial series.
        </p>

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

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '680px',
                title:
                    'Daily Stock Price',
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
                seriesType: [
                    'Line',
                    'Spline',
                    'Hilo',
                    'HiloOpenClose',
                    'Candle'
                ],
                series: [
                    {
                        type: 'Candle',
                        dataSource:
                            stockData,
                        xName: 'date',
                        yName: 'close',
                        open: 'open',
                        high: 'high',
                        low: 'low',
                        close: 'close',
                        volume: 'volume',
                        name: 'Stock Price',
                        enableSolidCandle:
                            true,
                        animation: {
                            enable: false
                        }
                    }
                ],
                indicatorType: [],
                trendlineType: [],
                exportType: []
            });

        stockChart.appendTo(
            '#stock-chart'
        );
    </script>
</body>
</html>
```

## Best Practices

### Financial Series

- Map every required financial field.
- Use JavaScript `Date` objects.
- Sort records chronologically.
- Validate OHLC relationships before binding.
- Use Candle or HiloOpenClose when open and close values matter.
- Use Hilo when only the price range matters.
- Use Hollow Candle through `enableSolidCandle: false`.

### Single-Value Series

- Map `xName` and `yName`.
- Use Line for direct point-to-point trends.
- Use Spline only when curved interpolation is acceptable.
- Use Area when filled magnitude is meaningful.
- Do not claim that Spline reduces data volatility.
- Do not claim that Area automatically calculates cumulative values.

### Modules

- Inject `CandleSeries` for Candle and Hollow Candle.
- Inject `HiloSeries` for Hilo.
- Inject `HiloOpenCloseSeries` for HiloOpenClose.
- Inject `LineSeries` for Line.
- Inject `SplineSeries` for Spline.
- Inject `AreaSeries` for Area.
- Inject every type exposed by `seriesType`.

### Runtime Updates

- Use `dataBind()` for ordinary appearance and visibility changes.
- Use `refresh()` for structural series-type changes.
- Batch related property changes.
- Avoid recreating the complete Stock Chart for a simple series update.

## Combined Mistakes and Future References

### Candle Using yName Only

Incorrect:

```typescript
{
    type: 'Candle',
    xName: 'date',
    yName: 'close'
}
```

Correct:

```typescript
{
    type: 'Candle',
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
}
```

### Hilo Missing Field Mappings

Incorrect:

```typescript
{
    type: 'Hilo',
    xName: 'date'
}
```

Correct:

```typescript
{
    type: 'Hilo',
    xName: 'date',
    high: 'high',
    low: 'low'
}
```

### HiloOpenClose Missing Mappings

Incorrect:

```typescript
{
    type: 'HiloOpenClose',
    xName: 'date'
}
```

Correct:

```typescript
{
    type: 'HiloOpenClose',
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
}
```

### Incorrect Hollow Candle Type

Incorrect:

```typescript
type: 'HollowCandle'
```

Correct:

```typescript
type: 'Candle',
enableSolidCandle: false
```

Hollow Candle uses the Candle module with solid-candle rendering disabled.

### Missing DateTime Axis

Incorrect:

```typescript
series: [
    {
        dataSource: stockData,
        xName: 'date'
    }
]
```

Correct:

```typescript
primaryXAxis: {
    valueType: 'DateTime'
}
```

with:

```typescript
StockChart.Inject(
    DateTime
);
```

### Missing Series Module

If this is configured:

```typescript
type: 'Spline'
```

then import and inject:

```typescript
SplineSeries
```

Each documented Stock Chart series type requires its corresponding module.

### Incorrect Border Properties

Avoid:

```typescript
borderColor: '#333333',
borderWidth: 1
```

Use:

```typescript
border: {
    color: '#333333',
    width: 1
}
```

after validating border support for the selected series type.

### Area Described as Automatically Cumulative

Incorrect:

```text
Area automatically displays cumulative data.
```

Correct:

```text
Area displays the values supplied through yName.
```

Calculate cumulative values before binding if required.

### Spline Described as Noise Reduction

Incorrect:

```text
Spline reduces volatility and noise.
```

Correct:

```text
Spline changes the visual interpolation between points.
```

### Incorrect Empty-Point Border

Avoid:

```typescript
emptyPointSettings: {
    borderColor: '#000000',
    borderWidth: 1
}
```

Use the supported nested border model if available:

```typescript
emptyPointSettings: {
    border: {
        color: '#000000',
        width: 1
    }
}
```

### Visibility Updated with Full Refresh

Less efficient:

```typescript
stockChart.series[1].visible =
    false;

stockChart.refresh();
```

Preferred for an ordinary visibility update:

```typescript
stockChart.series[1].visible =
    false;

stockChart.dataBind();
```

### Series Type Validation Checklist

Before generating a Stock Chart series example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. Date values are JavaScript `Date` objects.
4. `primaryXAxis.valueType` is `DateTime`.
5. `DateTime` is imported and injected.
6. Candle uses `type: 'Candle'`.
7. Candle imports and injects `CandleSeries`.
8. Candle maps `xName`.
9. Candle maps `open`.
10. Candle maps `high`.
11. Candle maps `low`.
12. Candle maps `close`.
13. Hollow Candle uses `enableSolidCandle: false`.
14. Hilo imports and injects `HiloSeries`.
15. Hilo maps `high`.
16. Hilo maps `low`.
17. HiloOpenClose imports and injects `HiloOpenCloseSeries`.
18. HiloOpenClose maps `open`.
19. HiloOpenClose maps `high`.
20. HiloOpenClose maps `low`.
21. HiloOpenClose maps `close`.
22. Line imports and injects `LineSeries`.
23. Line maps `xName`.
24. Line maps `yName`.
25. Spline imports and injects `SplineSeries`.
26. Spline maps `xName`.
27. Spline maps `yName`.
28. Area imports and injects `AreaSeries`.
29. Area maps `xName`.
30. Area maps `yName`.
31. Area is not described as automatically cumulative.
32. Spline is not described as changing the underlying values.
33. Every `seriesType` option has an injected module.
34. Financial and single-value mappings are not confused.
35. Marker usage is appropriate for the selected type.
36. Data-label support is validated for the selected type.
37. Empty-point behavior is validated for financial meaning.
38. Supported nested border models are used.
39. Visibility updates call `dataBind()`.
40. Structural type updates use `refresh()` when required.
41. The host exists before `appendTo()`.
42. The host has sufficient width and height.
43. The matching EJ2 stylesheet is loaded.
44. The TypeScript and JavaScript examples are complete and runnable.
45. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.