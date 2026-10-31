# Axes Customization

## Overview

The EJ2 Stock Chart typically uses:

- A DateTime-based horizontal axis for trading dates.
- A numeric vertical axis for price values.
- Optional secondary axes for volume, indicators, or series with different scales.
- A built-in range navigator and period selector for viewing portions of a large financial dataset.

Secondary axes are configured through the root `axes` collection, while the `axisLabelRender` event is configured at Stock Chart root level.

The supplied material required the following corrections:

- Candle series must map `open`, `high`, `low`, and `close`.
- Axis titles use a string with `titleStyle`, not a nested `{ text, style }` object.
- Text styles use `size`, not `fontSize`.
- `axisLabelRender` is a Stock Chart event, not a property inside an axis.
- Event arguments use `args.text` and `args.value`; `args.value` should not be compared directly with a rendered month name.
- A secondary Volume series requires `ColumnSeries`, not `LineSeries`.
- Secondary series must provide complete field mappings.
- `labelPlacement: 'BetweenTicks'` is mainly appropriate for Category axes and should not be presented as a general DateTime-axis setting.
- `scrollbarSettings` should not be added without validation against the installed Stock Chart axis model.
- Stock Chart normally uses its built-in range navigator and period selector instead of ordinary Chart scrollbar guidance.
- Zoom configuration from the standalone Chart should not automatically be presented as Stock Chart configuration without validating the installed version.
- `majorGridLines.width: 0` is preferable to setting the color to `transparent`.
- Multiple panes require rows and axes assigned through `rowIndex`; adding an opposed axis alone does not create a separate pane.
- Fixed axis limits should be used only when the intended financial scale is known.

## Table of Contents

- #axis-types
- #datetime-axis
- #numeric-axis
- #axis-labels-and-formatting
- #gridlines-and-tick-lines
- #axis-label-render-event
- #multiple-axes
- #multiple-panes
- #range-navigation
- #dynamic-axis-updates
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Axis Types

A typical Stock Chart uses:

```text
Horizontal axis: DateTime
Vertical axis: Double
```

The horizontal axis is configured through:

```typescript
primaryXAxis
```

The primary vertical axis is configured through:

```typescript
primaryYAxis
```

Additional axes are configured through:

```typescript
axes
```

The Stock Chart exposes an `axes` collection for secondary axes.

## DateTime Axis

Use `DateTime` when datasource x-values are JavaScript `Date` objects.

### Required Import and Injection

```typescript
import {
    DateTime,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime
);
```

### Basic Configuration

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    majorGridLines: {
        width: 0
    },
    edgeLabelPlacement: 'Shift'
}
```

Complete example:

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
            valueType: 'DateTime',
            majorGridLines: {
                width: 0
            },
            edgeLabelPlacement: 'Shift'
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
                name: 'Stock Price'
            }
        ]
    });

stockChart.appendTo(
    '#stock-chart'
);
```

A Candle series requires explicit x, open, high, low, and close field mappings.

### Label Format

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'MMM d',
    edgeLabelPlacement: 'Shift'
}
```

Other examples include:

```typescript
labelFormat: 'MMM yyyy'
```

```typescript
labelFormat: 'dd-MM-yyyy'
```

```typescript
labelFormat: 'HH:mm'
```

Choose a format that matches the datasource resolution:

- Intraday data may use hour and minute text.
- Daily data may use day and abbreviated month.
- Monthly data may use month and year.
- Multi-year data may use years.

### Interval Configuration

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Days',
    interval: 1
}
```

Common interval types include:

```text
Auto
Years
Months
Days
Hours
Minutes
Seconds
```

For responsive Stock Charts, automatic interval calculation is often preferable:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Auto'
}
```

Do not force a one-day interval across a long dataset because labels may overlap.

### Fixed Date Range

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    minimum:
        new Date(2025, 0, 1),
    maximum:
        new Date(2025, 11, 31)
}
```

Use fixed limits only when the Stock Chart must always render a known date domain.

If the built-in range navigator or period selector should control the visible range, avoid unnecessarily fixing the primary x-axis minimum and maximum.

## Numeric Axis

The primary y-axis plots numeric price values.

The numeric value type is:

```typescript
valueType: 'Double'
```

Because `Double` is the normal numeric behavior, it can usually be omitted from `primaryYAxis`.

### Basic Configuration

```typescript
primaryYAxis: {
    labelFormat: '${value}',
    rangePadding: 'Normal',
    lineStyle: {
        width: 0
    },
    majorTickLines: {
        width: 0
    }
}
```

### Currency Labels

```typescript
primaryYAxis: {
    labelFormat: '${value}'
}
```

The dollar sign is literal text surrounding the `{value}` placeholder.

For another currency:

```typescript
primaryYAxis: {
    labelFormat: '₹{value}'
}
```

```typescript
primaryYAxis: {
    labelFormat: '€{value}'
}
```

### Percentage Labels

```typescript
primaryYAxis: {
    labelFormat: '{value}%'
}
```

This appends a percentage symbol. It does not automatically multiply decimal values by 100.

For example, if the datasource contains `0.25`, the displayed value may be `0.25%`, not `25%`. Transform or format the data according to the application’s percentage convention.

### Fixed Range

```typescript
primaryYAxis: {
    minimum: 80,
    maximum: 140,
    interval: 10
}
```

Use explicit limits when:

- Several Stock Charts require the same scale.
- The financial range is known.
- A regulatory or target interval must remain visible.
- Automatic scaling creates misleading comparisons.

Avoid arbitrary fixed limits such as:

```typescript
minimum: 0,
maximum: 500
```

when the actual stock-price range is much narrower.

### Axis Title

The axis title is a string:

```typescript
primaryYAxis: {
    title: 'Price (USD)',
    titleStyle: {
        color: '#334155',
        size: '14px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600'
    }
}
```

Axis titles and their appearance are configured with `title` and `titleStyle`.

Incorrect:

```typescript
primaryYAxis: {
    title: {
        text: 'Price',
        style: {
            fontFamily: 'Arial',
            size: '14px'
        }
    }
}
```

Correct:

```typescript
primaryYAxis: {
    title: 'Price',
    titleStyle: {
        fontFamily: 'Arial',
        size: '14px'
    }
}
```

## Axis Labels and Formatting

### Label Style

```typescript
primaryXAxis: {
    labelStyle: {
        color: '#475569',
        size: '12px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '400'
    }
}
```

Use:

```typescript
size: '12px'
```

Do not use:

```typescript
fontSize: '12px'
```

### Label Intersection

For DateTime labels:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelIntersectAction: 'Rotate45'
}
```

Other overlap-handling values depend on the installed EJ2 version. Validate the intended value before documenting it as supported.

For compact layouts, consider:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelIntersectAction: 'Hide'
}
```

### Edge Labels

```typescript
primaryXAxis: {
    edgeLabelPlacement: 'Shift'
}
```

This helps prevent the first and final labels from being clipped at the chart boundary.

### Label Placement

Do not configure this indiscriminately on a DateTime axis:

```typescript
labelPlacement: 'BetweenTicks'
```

`BetweenTicks` is mainly meaningful for Category-axis placement. Let a DateTime axis calculate positions according to its date values.

## Gridlines and Tick Lines

### Hide Vertical Gridlines

```typescript
primaryXAxis: {
    majorGridLines: {
        width: 0
    }
}
```

Prefer `width: 0` over:

```typescript
majorGridLines: {
    color: 'transparent'
}
```

### Customize Horizontal Gridlines

```typescript
primaryYAxis: {
    majorGridLines: {
        color: '#E2E8F0',
        width: 1
    }
}
```

### Hide Axis Line and Major Ticks

```typescript
primaryYAxis: {
    lineStyle: {
        width: 0
    },
    majorTickLines: {
        width: 0
    }
}
```

### Minor Gridlines

```typescript
primaryYAxis: {
    minorTicksPerInterval: 1,
    minorGridLines: {
        color: '#F1F5F9',
        width: 0.5
    }
}
```

Use minor gridlines only when they improve precision. Dense financial visualizations are usually clearer with restrained gridline styling.

## Axis Label Render Event

Configure `axisLabelRender` at Stock Chart root level.

The Stock Chart exposes `axisLabelRender` as an event that runs before each axis label is rendered.

### TypeScript

```typescript
import {
    IAxisLabelRenderEventArgs,
    StockChart
} from '@syncfusion/ej2-charts';

const stockChart: StockChart =
    new StockChart({
        axisLabelRender: (
            args:
                IAxisLabelRenderEventArgs
        ): void => {
            if (
                args.axis.name ===
                'primaryYAxis'
            ) {
                const numericValue:
                    number =
                        Number(args.value);

                if (
                    Number.isFinite(
                        numericValue
                    ) &&
                    Math.abs(
                        numericValue
                    ) >= 1000
                ) {
                    args.text =
                        `${(
                            numericValue /
                            1000
                        ).toFixed(1)}K`;
                }
            }
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

### JavaScript

```javascript
var stockChart =
    new ej.charts.StockChart({
        axisLabelRender:
            function (args) {
                if (
                    args.axis.name ===
                    'primaryYAxis'
                ) {
                    var value =
                        Number(
                            args.value
                        );

                    if (
                        Number.isFinite(
                            value
                        ) &&
                        Math.abs(value) >=
                            1000
                    ) {
                        args.text =
                            (
                                value /
                                1000
                            ).toFixed(1) +
                            'K';
                    }
                }
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

Incorrect:

```typescript
primaryYAxis: {
    axisLabelRender: (
        args
    ): void => {
    }
}
```

Correct:

```typescript
const stockChart: StockChart =
    new StockChart({
        axisLabelRender: (
            args
        ): void => {
        }
    });
```

Do not compare a numeric DateTime axis value directly to a rendered label:

```typescript
if (args.value === 'March') {
}
```

For custom DateTime logic, convert `args.value` to a date after validating its runtime type.

## Multiple Axes

Use a secondary axis when a second series has a substantially different scale.

Examples include:

- Price and volume
- Price and percentage change
- Price and oscillator values
- Separate technical measurements

### Required Modules

A Candle Price series and Column Volume series require:

```typescript
import {
    CandleSeries,
    ColumnSeries,
    DateTime,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    CandleSeries,
    ColumnSeries
);
```

Do not inject `LineSeries` as a substitute for `ColumnSeries`.

### Opposed Secondary Axis

```typescript
axes: [
    {
        name: 'volumeAxis',
        valueType: 'Double',
        opposedPosition: true,
        labelFormat: '{value}',
        title: 'Volume',
        titleStyle: {
            size: '13px',
            fontFamily: 'Segoe UI',
            fontWeight: '600'
        },
        lineStyle: {
            width: 0
        },
        majorTickLines: {
            width: 0
        }
    }
]
```

Assign the series:

```typescript
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
        type: 'Column',
        dataSource: stockData,
        xName: 'date',
        yName: 'volume',
        yAxisName: 'volumeAxis',
        name: 'Volume'
    }
]
```

The Stock Chart supports a secondary-axis collection through `axes`.

### Important Scale Warning

Overlaying volume and price in one plot area can create visual clutter even with separate axes. For financial dashboards, separate panes are often clearer.

## Multiple Panes

Use rows and axis `rowIndex` assignments to place price and volume in separate vertical panes.

```typescript
rows: [
    {
        height: '70%'
    },
    {
        height: '30%'
    }
],
primaryYAxis: {
    rowIndex: 0,
    title: 'Price',
    labelFormat: '${value}'
},
axes: [
    {
        name: 'volumeAxis',
        rowIndex: 1,
        opposedPosition: true,
        title: 'Volume',
        lineStyle: {
            width: 0
        },
        majorTickLines: {
            width: 0
        }
    }
]
```

Assign the volume series:

```typescript
{
    type: 'Column',
    dataSource: stockData,
    xName: 'date',
    yName: 'volume',
    yAxisName: 'volumeAxis',
    name: 'Volume'
}
```

An opposed secondary axis alone does not create a separate pane. A pane needs:

- A row definition.
- An axis with the corresponding `rowIndex`.
- A series assigned through `yAxisName`.

## Indicator Axes

Technical indicators can use separate axes and panes when required.

Example RSI axis:

```typescript
axes: [
    {
        name: 'rsiAxis',
        rowIndex: 1,
        minimum: 0,
        maximum: 100,
        interval: 20,
        opposedPosition: true,
        title: 'RSI',
        lineStyle: {
            width: 0
        },
        majorTickLines: {
            width: 0
        }
    }
]
```

Do not represent a built-in Stock Chart indicator as an ordinary Line series unless the application already calculates and supplies the indicator values.

When using a built-in RSI indicator, import and inject its corresponding indicator module.

## Range Navigation

The Stock Chart provides built-in financial range navigation and period selection. Use these features before adding ordinary Chart-style axis scrollbars.

### Period Selector

```typescript
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
]
```

### Range Tooltip

Import and inject:

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip
);
```

The range navigator allows users to change the visible financial interval without requiring a conventional axis scrollbar.

### Avoid Unvalidated Scrollbar Settings

Do not add the following to a Stock Chart axis without validating support in the installed package:

```typescript
scrollbarSettings: {
    size: '20px',
    color: '#F0F0F0'
}
```

Do not assume all standalone Chart scrollbar or zoom properties apply identically to Stock Chart.

### Zoom Configuration Warning

The standalone EJ2 Chart supports selection, mouse-wheel, and pinch zooming through `zoomSettings`.

However, Stock Chart already provides a range navigator and period selector. Validate `zoomSettings` against the installed Stock Chart API before documenting it as a Stock Chart feature.

## Dynamic Axis Updates

### Update Y-Axis Range

```typescript
stockChart.primaryYAxis.minimum =
    80;

stockChart.primaryYAxis.maximum =
    140;

stockChart.primaryYAxis.interval =
    10;

stockChart.dataBind();
```

### Reset Automatic Range

```typescript
stockChart.primaryYAxis.minimum =
    null;

stockChart.primaryYAxis.maximum =
    null;

stockChart.primaryYAxis.interval =
    null;

stockChart.dataBind();
```

Validate nullability against the installed TypeScript model. If strict typing rejects `null`, assign `undefined` or replace the axis model using supported values.

### Update Label Format

```typescript
stockChart
    .primaryYAxis
    .labelFormat =
        '₹{value}';

stockChart.dataBind();
```

### Update Secondary Axis

```typescript
const volumeAxis =
    stockChart.axes.find(
        (
            axis
        ): boolean => {
            return (
                axis.name ===
                'volumeAxis'
            );
        }
    );

if (volumeAxis) {
    volumeAxis.opposedPosition =
        false;

    stockChart.dataBind();
}
```

Use `dataBind()` for ordinary axis-property changes.

Use `refresh()` when:

- The Stock Chart dimensions changed.
- A hidden parent became visible.
- Rows or panes changed structurally.
- Axes were added or removed.
- A complete layout recalculation is required.

## Complete TypeScript Example

This example includes:

- DateTime x-axis
- Numeric price axis
- Candle OHLC mappings
- Separate price and volume panes
- Secondary Volume axis
- Date and price formatting
- Axis-label customization event
- Tooltip and crosshair
- Range tooltip
- Period selector
- Correct module injection

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

    <title>Stock Chart Axes</title>

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

        .stock-chart-card p {
            margin: 0 0 16px;
            color: #475569;
        }

        #stock-chart {
            width: 100%;
            min-height: 700px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .stock-chart-card {
                padding: 12px;
            }

            #stock-chart {
                min-height: 560px;
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
            Price and Volume
        </h1>

        <p id="stock-chart-description">
            Daily price appears in the upper pane and
            trading volume appears in the lower pane.
        </p>

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
    ColumnSeries,
    Crosshair,
    DateTime,
    IAxisLabelRenderEventArgs,
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
    ColumnSeries,
    Tooltip,
    Crosshair,
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
    },
    {
        date: new Date(2025, 0, 13),
        open: 115,
        high: 119,
        low: 112,
        close: 117,
        volume: 1380000
    }
];

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
        height: '700px',
        theme: 'Bootstrap5',
        title:
            'Daily Price and Volume',
        rows: [
            {
                height: '70%'
            },
            {
                height: '30%'
            }
        ],
        primaryXAxis: {
            valueType: 'DateTime',
            intervalType: 'Auto',
            labelFormat: 'MMM d',
            edgeLabelPlacement: 'Shift',
            labelIntersectAction: 'Hide',
            majorGridLines: {
                width: 0
            },
            crosshairTooltip: {
                enable: true
            },
            labelStyle: {
                color: '#475569',
                size: '11px',
                fontFamily: 'Segoe UI',
                fontWeight: '400'
            }
        },
        primaryYAxis: {
            rowIndex: 0,
            title: 'Price (USD)',
            titleStyle: {
                color: '#334155',
                size: '13px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            },
            labelFormat: '${value}',
            lineStyle: {
                width: 0
            },
            majorTickLines: {
                width: 0
            },
            majorGridLines: {
                color: '#E2E8F0',
                width: 1
            },
            crosshairTooltip: {
                enable: true
            }
        },
        axes: [
            {
                name: 'volumeAxis',
                rowIndex: 1,
                opposedPosition: true,
                title: 'Volume',
                titleStyle: {
                    color: '#334155',
                    size: '13px',
                    fontFamily: 'Segoe UI',
                    fontWeight: '600'
                },
                labelFormat: '{value}',
                rangePadding: 'Normal',
                lineStyle: {
                    width: 0
                },
                majorTickLines: {
                    width: 0
                },
                majorGridLines: {
                    color: '#F1F5F9',
                    width: 1
                }
            }
        ],
        tooltip: {
            enable: true,
            shared: true
        },
        crosshair: {
            enable: true,
            lineType: 'Both'
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
        axisLabelRender: (
            args:
                IAxisLabelRenderEventArgs
        ): void => {
            if (
                args.axis.name ===
                'volumeAxis'
            ) {
                const value: number =
                    Number(args.value);

                if (
                    Number.isFinite(value) &&
                    Math.abs(value) >=
                        1000000
                ) {
                    args.text =
                        `${(
                            value /
                            1000000
                        ).toFixed(1)}M`;
                } else if (
                    Number.isFinite(value) &&
                    Math.abs(value) >=
                        1000
                ) {
                    args.text =
                        `${(
                            value /
                            1000
                        ).toFixed(0)}K`;
                }
            }
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
                name: 'Price',
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A'
            },
            {
                type: 'Column',
                dataSource: stockData,
                xName: 'date',
                yName: 'volume',
                yAxisName: 'volumeAxis',
                name: 'Volume',
                fill: '#64748B'
            }
        ],
        indicatorType: [],
        trendlineType: [],
        exportType: []
    });

stockChart.appendTo(
    stockChartElement
);

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
                            ? '560px'
                            : '700px';

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

    <title>Stock Chart Axes</title>

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

        #stock-chart {
            width: 100%;
            min-height: 700px;
        }
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Price and Volume
        </h1>

        <p id="stock-chart-description">
            Daily price appears in the upper pane and
            trading volume appears in the lower pane.
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

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '700px',
                theme: 'Bootstrap5',
                title:
                    'Daily Price and Volume',
                rows: [
                    {
                        height: '70%'
                    },
                    {
                        height: '30%'
                    }
                ],
                primaryXAxis: {
                    valueType: 'DateTime',
                    intervalType: 'Auto',
                    labelFormat: 'MMM d',
                    edgeLabelPlacement:
                        'Shift',
                    labelIntersectAction:
                        'Hide',
                    majorGridLines: {
                        width: 0
                    },
                    crosshairTooltip: {
                        enable: true
                    },
                    labelStyle: {
                        color: '#475569',
                        size: '11px',
                        fontFamily:
                            'Segoe UI'
                    }
                },
                primaryYAxis: {
                    rowIndex: 0,
                    title: 'Price (USD)',
                    titleStyle: {
                        color: '#334155',
                        size: '13px',
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '600'
                    },
                    labelFormat: '${value}',
                    lineStyle: {
                        width: 0
                    },
                    majorTickLines: {
                        width: 0
                    },
                    majorGridLines: {
                        color: '#E2E8F0',
                        width: 1
                    },
                    crosshairTooltip: {
                        enable: true
                    }
                },
                axes: [
                    {
                        name: 'volumeAxis',
                        rowIndex: 1,
                        opposedPosition: true,
                        title: 'Volume',
                        titleStyle: {
                            color: '#334155',
                            size: '13px',
                            fontFamily:
                                'Segoe UI',
                            fontWeight:
                                '600'
                        },
                        lineStyle: {
                            width: 0
                        },
                        majorTickLines: {
                            width: 0
                        },
                        majorGridLines: {
                            color: '#F1F5F9',
                            width: 1
                        }
                    }
                ],
                tooltip: {
                    enable: true,
                    shared: true
                },
                crosshair: {
                    enable: true,
                    lineType: 'Both'
                },
                periods: [
                    {
                        text: '1M',
                        interval: 1,
                        intervalType:
                            'Months'
                    },
                    {
                        text: '3M',
                        interval: 3,
                        intervalType:
                            'Months'
                    },
                    {
                        text: '6M',
                        interval: 6,
                        intervalType:
                            'Months'
                    },
                    {
                        text: 'YTD'
                    },
                    {
                        text: '1Y',
                        interval: 1,
                        intervalType:
                            'Years'
                    },
                    {
                        text: 'All',
                        selected: true
                    }
                ],
                axisLabelRender:
                    function (args) {
                        if (
                            args.axis.name ===
                            'volumeAxis'
                        ) {
                            var value =
                                Number(
                                    args.value
                                );

                            if (
                                Number.isFinite(
                                    value
                                ) &&
                                Math.abs(
                                    value
                                ) >= 1000000
                            ) {
                                args.text =
                                    (
                                        value /
                                        1000000
                                    ).toFixed(1) +
                                    'M';
                            } else if (
                                Number.isFinite(
                                    value
                                ) &&
                                Math.abs(
                                    value
                                ) >= 1000
                            ) {
                                args.text =
                                    (
                                        value /
                                        1000
                                    ).toFixed(0) +
                                    'K';
                            }
                        }
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
                        name: 'Price',
                        bearFillColor:
                            '#DC2626',
                        bullFillColor:
                            '#16A34A'
                    },
                    {
                        type: 'Column',
                        dataSource:
                            stockData,
                        xName: 'date',
                        yName: 'volume',
                        yAxisName:
                            'volumeAxis',
                        name: 'Volume',
                        fill: '#64748B'
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

### DateTime Axis

- Use JavaScript `Date` objects.
- Import and inject `DateTime`.
- Use automatic intervals for responsive or long datasets.
- Match the label format to the data resolution.
- Use `edgeLabelPlacement: 'Shift'` to reduce clipping.
- Avoid forcing dense daily labels across multi-year data.
- Keep trading records chronologically sorted.

### Numeric Axis

- Use a clear unit in the axis title.
- Use `{value}` within `labelFormat`.
- Use fixed ranges only when they improve comparison.
- Hide unnecessary lines and ticks using `width: 0`.
- Avoid starting every financial price axis at zero unless that scale is meaningful.

### Multiple Axes and Panes

- Import and inject every series module used.
- Give every secondary axis a unique `name`.
- Match `series.yAxisName` to the axis name exactly.
- Use `rowIndex` to create distinct panes.
- Keep price and volume in separate panes when overlaying them reduces clarity.
- Avoid adding many opposed axes to one plot area.

### Range Navigation

- Prefer the built-in range navigator and period selector.
- Inject `RangeTooltip` when its tooltip is required.
- Select only one default period.
- Avoid copying standalone Chart scrollbar settings without Stock Chart validation.

## Combined Mistakes and Future References

### Incomplete Candle Mapping

Incorrect:

```typescript
{
    type: 'Candle',
    dataSource: stockData,
    xName: 'date',
    yName: 'close'
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

### Incorrect Axis Title Object

Incorrect:

```typescript
primaryYAxis: {
    title: {
        text: 'Price',
        style: {
            size: '14px'
        }
    }
}
```

Correct:

```typescript
primaryYAxis: {
    title: 'Price',
    titleStyle: {
        size: '14px'
    }
}
```

### Incorrect Text Size Property

Incorrect:

```typescript
labelStyle: {
    fontSize: '12px'
}
```

Correct:

```typescript
labelStyle: {
    size: '12px'
}
```

### Axis Event Inside Axis Configuration

Incorrect:

```typescript
primaryXAxis: {
    axisLabelRender: (
        args
    ): void => {
    }
}
```

Correct:

```typescript
const stockChart: StockChart =
    new StockChart({
        axisLabelRender: (
            args
        ): void => {
        }
    });
```

### Comparing Date Value with Month Text

Incorrect:

```typescript
if (args.value === 'March') {
}
```

Use `args.text` for the rendered label text or convert the numeric DateTime value into a `Date` after validating its type.

### Missing ColumnSeries

Incorrect setup for a Volume Column series:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    LineSeries
);
```

Correct:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    ColumnSeries
);
```

### Opposed Axis Does Not Create a Pane

Incomplete:

```typescript
axes: [
    {
        name: 'volumeAxis',
        opposedPosition: true
    }
]
```

For a separate pane, also define rows and assign `rowIndex`.

### Unsupported Scrollbar Settings

Avoid:

```typescript
primaryXAxis: {
    enableScrollbar: true,
    scrollbarSettings: {
        size: '20px',
        color: '#F0F0F0'
    }
}
```

unless those properties are explicitly validated against the installed Stock Chart package.

### Standalone Chart Zoom Assumption

The standalone Chart supports selection, wheel, and pinch zoom modes through `zoomSettings`.

Do not automatically assume identical support and behavior in Stock Chart. Prefer Stock Chart range navigation unless Stock Chart zoom APIs have been validated.

### Axis Validation Checklist

Before generating a Stock Chart axis example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. Date values are JavaScript `Date` objects.
4. `primaryXAxis.valueType` is `DateTime`.
5. `DateTime` is imported and injected.
6. Candle usage imports and injects `CandleSeries`.
7. Candle data maps `xName`.
8. Candle data maps `open`.
9. Candle data maps `high`.
10. Candle data maps `low`.
11. Candle data maps `close`.
12. A Line series uses `yName`.
13. A Column series uses `yName`.
14. A Volume Column series imports and injects `ColumnSeries`.
15. Axis titles use strings.
16. Axis-title appearance uses `titleStyle`.
17. Label appearance uses `labelStyle`.
18. Font size uses `size`.
19. Axis-line styling uses `lineStyle`.
20. Gridline styling uses `majorGridLines` or `minorGridLines`.
21. Tick-line styling uses `majorTickLines` or `minorTickLines`.
22. `axisLabelRender` is configured at Stock Chart root level.
23. Event values are handled according to their runtime type.
24. Every secondary axis has a unique name.
25. `yAxisName` matches the secondary-axis name exactly.
26. Separate panes define rows.
27. Pane axes specify `rowIndex`.
28. Fixed axis ranges are intentional.
29. Range navigation is preferred for long financial domains.
30. `RangeTooltip` is injected when required.
31. Unsupported scrollbar settings are excluded.
32. Standalone Chart zoom settings are not assumed to be Stock Chart settings.
33. Ordinary property updates call `dataBind()`.
34. Structural axis or pane changes use `refresh()` when necessary.
35. Resize refreshes are debounced.
36. The host exists before `appendTo()`.
37. The host has sufficient width and height.
38. The matching EJ2 stylesheet is loaded.
39. The TypeScript and JavaScript examples are complete and runnable.
40. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.