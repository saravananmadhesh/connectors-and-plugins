---
name: syncfusion-javascript-stock-chart
description: Create interactive stock charts in Syncfusion TypeScript and JavaScript. Immediately use this skill when user needs to visualize financial data, track stock prices, implement trading dashboards, configure technical indicators, use period selectors, display candlestick/OHLC data, add trendlines, handle real-time price updates, export trading data, or build financial applications. Works with TypeScript (webpack/module-based) and JavaScript (CDN/ES5).
license: "SEE LICENSE IN license"
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Stock Chart in Syncfusion TypeScript and JavaScript

The Syncfusion EJ2 Stock Chart is a specialized financial visualization component for displaying and analyzing time-based market data. It supports financial series, technical indicators, trendlines, period selection, range navigation, real-time updates, export, print, annotations, and multi-pane layouts.

This skill covers:

- EJ2 TypeScript using `@syncfusion/ej2-charts`
- EJ2 JavaScript using `ej.charts.StockChart`
- npm and bundler-based TypeScript applications
- Global CDN-based JavaScript applications
- Candle, Hollow Candle, Hilo, HiloOpenClose, Line, Spline, and Area series
- Ten built-in technical indicators
- Local, remote, and real-time financial data
- Period and range selectors
- Tooltips, crosshairs, legends, trendlines, and annotations
- Themes and appearance
- Export and print
- Accessibility and RTL
- Troubleshooting and performance optimization

The Stock Chart is included in the `@syncfusion/ej2-charts` package and supports local arrays and remote `DataManager` sources. It also supports `noDataTemplate` for an empty-data state.

Do not generate Vue, React, Angular, Composition API, directive, provider, or Single File Component examples when this skill is used.

## Platform Support

### TypeScript

Use TypeScript when the project requires:

- Static type checking
- IDE IntelliSense
- ES module imports
- npm package management
- Webpack or another bundler
- Typed event arguments
- Explicit optional-feature module injection

Import the component and required modules from:

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

Inject modules before creating the Stock Chart:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    Tooltip,
    Crosshair,
    RangeTooltip
);
```

Create and render the component:

```typescript
const stockChart: StockChart =
    new StockChart(configuration);

stockChart.appendTo('#stock-chart');
```

Inject only the modules required by the configured series and features.

### JavaScript

Use JavaScript when the project requires:

- Direct browser execution
- CDN-based dependency loading
- No TypeScript compilation
- No module bundler
- Global EJ2 namespace access

Create the component through:

```javascript
var stockChart =
    new ej.charts.StockChart(
        configuration
    );

stockChart.appendTo(
    '#stock-chart'
);
```

When the complete EJ2 global bundle is used, explicit TypeScript-style module injection is generally unnecessary.

Current Syncfusion getting-started guidance targets modern Chrome, Edge, Firefox, and Safari. Validate exact browser requirements against the installed EJ2 release.

## When to Use This Skill

Use this skill when the user needs to:

- Display open, high, low, and close prices.
- Create Candle, Hollow Candle, Hilo, or HiloOpenClose series.
- Display closing-price trends with Line or Spline series.
- Display single-value data through Area series.
- Configure the built-in series selector.
- Add SMA, EMA, TMA, MACD, RSI, Stochastic, ATR, Bollinger Bands, Momentum, or Accumulation Distribution.
- Configure indicator panes and secondary axes.
- Add technical-indicator choices to the built-in toolbar.
- Configure period buttons.
- Show or hide the built-in period selector.
- Show or hide the integrated range selector.
- Bind local financial data.
- Bind remote OData or `DataManager` data.
- Normalize a REST API response.
- Build valid OHLC candles from streamed market ticks.
- Add tooltips and crosshairs.
- Configure a Stock Chart legend.
- Add trendlines to compatible single-value series.
- Add supported content annotations.
- Customize themes, colors, axes, labels, and chart area.
- Export the Stock Chart to JPEG, PNG, SVG, or PDF.
- Print the Stock Chart.
- Handle empty data.
- Diagnose rendering, data, module, or performance issues.
- Provide accessible text or tabular financial-data alternatives.
- Enable RTL for right-to-left interfaces.

## Scope and Output Rules

When this skill is used:

1. Generate only EJ2 TypeScript or plain EJ2 JavaScript.
2. Do not generate framework wrappers.
3. Use `StockChart` from `@syncfusion/ej2-charts`.
4. Use `ej.charts.StockChart` for global JavaScript.
5. Include a complete datasource unless the user provides one.
6. Include complete financial-field mappings.
7. Include the HTML host.
8. Include sufficient width and height.
9. Include the matching EJ2 theme stylesheet.
10. Import and inject every required module.
11. Exclude unused modules from minimal examples.
12. Use complete, runnable, directly copyable code.
13. Avoid unsupported properties copied from the standalone Chart.
14. Avoid presenting technical indicators as financial advice.
15. Preserve the user’s existing field names, chart type, and requested behavior when editing code.

## Validation Workflow

Before generating a Stock Chart implementation, validate the following items.

### Step 1: Identify the Platform

Determine whether the user needs:

- TypeScript
- JavaScript
- Both TypeScript and JavaScript

Do not substitute Vue, React, Angular, Blazor, ASP.NET Core, or another platform.

### Step 2: Identify the Series Type

Principal Stock Chart series types include:

```text
Candle
Hollow Candle
Hilo
HiloOpenClose
Line
Spline
```

A Hollow Candle is configured through:

```typescript
type: 'Candle',
enableSolidCandle: false
```

The Stock Chart documentation identifies Line, Spline, Hilo, HiloOpenClose, Hollow Candle, and Candle as its principal series types.

Area can also be used for suitable single-value data and requires `AreaSeries`.

### Step 3: Identify the Data Structure

Financial data normally contains:

```typescript
interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}
```

Validate that:

```text
high >= open
high >= close
high >= low
low <= open
low <= close
```

Sort records chronologically and handle duplicate timestamps.

### Step 4: Validate Field Mappings

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

#### Line, Area, and Spline

```typescript
xName: 'date',
yName: 'close'
```

Do not use `yName: 'close'` as a substitute for Candle or HiloOpenClose mappings.

### Step 5: Validate the DateTime Axis

For JavaScript `Date` x-values:

```typescript
primaryXAxis: {
    valueType: 'DateTime'
}
```

TypeScript requires:

```typescript
StockChart.Inject(
    DateTime
);
```

Convert remote date strings into JavaScript `Date` objects before binding.

### Step 6: Validate Module Injection

| Feature | Required module |
|---|---|
| DateTime axis | `DateTime` |
| Candle or Hollow Candle | `CandleSeries` |
| Hilo | `HiloSeries` |
| HiloOpenClose | `HiloOpenCloseSeries` |
| Line | `LineSeries` |
| Spline | `SplineSeries` |
| Area | `AreaSeries` |
| Column | `ColumnSeries` |
| Main chart tooltip | `Tooltip` |
| Range navigator tooltip | `RangeTooltip` |
| Crosshair | `Crosshair` |
| Stock Chart legend | `StockLegend` |
| Trendline | `Trendlines` |
| Export and print | `Export` |
| Annotation | `Annotation` |
| SMA | `SmaIndicator` |
| EMA | `EmaIndicator` |
| TMA | `TmaIndicator` |
| MACD | `MacdIndicator` |
| RSI | `RsiIndicator` |
| Stochastic | `StochasticIndicator` |
| ATR | `AtrIndicator` |
| Bollinger Bands | `BollingerBands` |
| Momentum | `MomentumIndicator` |
| Accumulation Distribution | `AccumulationDistributionIndicator` |

### Step 7: Validate Selectors

Use:

```typescript
enablePeriodSelector: true
```

for the period-selector toolbar.

Use:

```typescript
enableSelector: true
```

for the integrated range selector.

Use:

```typescript
periods: [...]
```

for preset period buttons.

Do not inject an invented `RangeSelector` module.

Do not use:

```typescript
rangeSelector: {
    enable: true
}
```

The period selector is enabled by default and is controlled through `enablePeriodSelector`. The integrated range selector is controlled through `enableSelector`.

### Step 8: Validate Interaction Configuration

Use:

```typescript
tooltip: {
    enable: true
}
```

for the main chart tooltip.

Use:

```typescript
crosshair: {
    enable: true
}
```

for the crosshair.

Use:

```typescript
primaryXAxis: {
    crosshairTooltip: {
        enable: true
    }
}
```

for an axis crosshair label.

Use:

```typescript
legendSettings: {
    visible: true
}
```

for the Stock Chart legend.

Do not use:

```typescript
legend: {
    visible: true
}
```

### Step 9: Validate Update Behavior

Use `dataBind()` for ordinary changes:

```typescript
stockChart
    .series[0]
    .dataSource =
        updatedData;

stockChart.dataBind();
```

Use `refresh()` for structural changes, such as:

- Adding or removing indicators
- Changing the series type
- Adding or removing panes
- Changing the period collection
- Showing or hiding a selector
- Changing dimensions
- Rendering after a hidden parent becomes visible

### Step 10: Validate Accessibility

Do not make pointer tooltips the only source of exact financial values.

Provide at least one of these:

- A financial-data table
- A visible data summary
- A details region
- Native date-range controls
- A live status region
- Text identifying candle or indicator behavior

## Navigation Guide

### Getting Started

Read:

```text
references/getting-started.md
```

Use it for:

- Package installation
- TypeScript setup
- JavaScript CDN setup
- Required module injection
- Basic Candle Stock Chart creation
- Initial OHLC data binding
- Theme and stylesheet setup
- Tooltip and crosshair setup

### Series Types

Read:

```text
references/series-types.md
```

Use it for:

- Candle
- Hollow Candle
- Hilo
- HiloOpenClose
- Line
- Spline
- Area
- Complete field mappings
- Series module injection
- Built-in series selector
- Runtime type switching
- Series visibility and appearance

### Technical Indicators

Read:

```text
references/technical-indicators.md
```

Use it for:

- SMA
- EMA
- TMA
- MACD
- RSI
- Stochastic
- ATR
- Bollinger Bands
- Momentum
- Accumulation Distribution
- Indicator module injection
- Indicator source-series mapping
- Overlay and separate-pane layouts
- Indicator toolbar choices
- Indicator lifecycle events
- Performance considerations

Technical indicators are mathematical calculations based on historical price or volume records. They must not be presented as guaranteed forecasts or trading advice.

### Period and Range Selectors

Read:

```text
references/selectors-navigation.md
```

Use it for:

- Period presets
- Intraday periods
- Calendar intervals
- `YTD` and `All`
- Period-selector visibility
- Integrated range-selector visibility
- Range tooltip
- Custom date-range controls
- Runtime period replacement
- Server-side range loading

Period buttons select a visible time range. They do not automatically convert data to one-minute, hourly, or daily candles.

### Axes Customization

Read:

```text
references/axes-customization.md
```

Use it for:

- DateTime x-axis
- Numeric y-axis
- Currency and percentage labels
- Axis title and title style
- Axis label style
- Gridlines and tick lines
- Fixed axis limits
- Secondary axes
- Multiple panes
- Axis-label rendering
- Range-navigation guidance

Do not advertise unverified Stock Chart scrollbar or standalone Chart zoom properties.

### Interaction Features

Read:

```text
references/interaction-features.md
```

Use it for:

- Main chart tooltip
- Shared tooltip
- Range tooltip
- Tooltip formatting and templates
- Crosshair and crosshair axis labels
- Stock Chart legend
- Period and range navigation
- Trendlines
- Supported content annotations
- Accessible interaction alternatives

Do not claim built-in point selection without explicit API support.

### Data Handling and Updates

Read:

```text
references/data-handling.md
```

Use it for:

- Local JSON data
- Data validation
- Remote `DataManager`
- OData queries
- REST API normalization
- Request cancellation
- Dynamic datasource replacement
- WebSocket tick processing
- OHLC candle aggregation
- Bounded retention
- Batch rendering
- Empty-data templates
- Server-side windowing
- Lifecycle cleanup

A raw market tick must be transformed into a valid OHLC candle before it is assigned to a Candle series.

### Styling and Appearance

Read:

```text
references/styling-appearance.md
```

Use it for:

- Built-in themes
- Matching stylesheets
- `palettes`
- Stock Chart background
- Chart-area background and border
- Title and subtitle
- Axis styling
- Candle colors
- Line and Area appearance
- Legend and tooltip styling
- Responsive dimensions
- Runtime style updates
- Contrast and non-color cues

Use:

```typescript
palettes
```

not:

```typescript
palette
```

Use:

```typescript
chartArea
```

instead of unverified `plotArea` settings.

### Export and Print

Read:

```text
references/export-print.md
```

Use it for:

- Built-in export toolbar
- JPEG export
- PNG export
- SVG export
- PDF export
- Print
- `beforeExport`
- Programmatic export
- Safe filenames
- Disabling export and print
- Multi-chart report guidance

Configure built-in formats first:

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

The Stock Chart toolbar supports JPEG, PNG, SVG, PDF, and print.

### Accessibility and RTL

Read:

```text
references/accessibility-rtl.md
```

Use it for:

- Accessible headings and descriptions
- Exact-value alternatives
- Financial-data tables
- Keyboard-accessible custom controls
- Live-region updates
- Color contrast
- Non-color cues
- RTL layout
- Date and number localization

Do not claim that every configured Stock Chart interaction is automatically keyboard accessible or WCAG compliant without testing the complete application.

### Troubleshooting and Optimization

Read:

```text
references/troubleshooting.md
```

Use it for:

- Missing host or dimensions
- Module-injection errors
- Incorrect field mappings
- Invalid dates and numeric values
- Hidden containers
- Remote-data failures
- Timestamp-based aggregation
- Batched updates
- Bounded retention
- Debounced resize handling
- Browser testing
- Verified lifecycle logging
- Component cleanup

Do not recommend unverified Stock Chart virtual scrolling, Canvas rendering, WebGL fallbacks, or obsolete IE polyfills.

## Installation

Install the EJ2 Charts package:

```bash
npm install @syncfusion/ej2-charts
```

The package includes the Stock Chart and its dependent EJ2 functionality. Do not require separate installation of every transitive package unless the package manager reports a specific dependency problem.

## Theme Setup

Load a supported consolidated EJ2 theme stylesheet:

```html
https://cdn.syncfusion.com/ej2/34.2.2/material3.css
```

Configure the corresponding component theme:

```typescript
theme: 'Bootstrap5'
```

Validate exact theme enum names against the installed `ChartTheme` definition.

## Host Setup

```html
<div class="stock-chart-wrapper">
    <div id="stock-chart"></div>
</div>
```

```css
.stock-chart-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

#stock-chart {
    width: 100%;
    min-height: 650px;
}
```

Render only after the host exists:

```typescript
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

stockChart.appendTo(host);
```

## Quick Start

### TypeScript

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

    <title>EJ2 TypeScript Stock Chart</title>

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

        #stock-chart {
            width: 100%;
            min-height: 650px;
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

        <p id="stock-chart-description">
            Daily open, high, low, and close prices.
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

#### index.ts

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
        height: '650px',
        theme: 'Bootstrap5',
        title: 'Daily Stock Price',
        primaryXAxis: {
            valueType: 'DateTime',
            majorGridLines: {
                width: 0
            },
            edgeLabelPlacement: 'Shift',
            crosshairTooltip: {
                enable: true
            }
        },
        primaryYAxis: {
            labelFormat: '${value}',
            lineStyle: {
                width: 0
            },
            majorTickLines: {
                width: 0
            },
            crosshairTooltip: {
                enable: true
            }
        },
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
                intervalType: 'Months',
                interval: 1,
                text: '1M'
            },
            {
                intervalType: 'Months',
                interval: 3,
                text: '3M'
            },
            {
                intervalType: 'Months',
                interval: 6,
                text: '6M'
            },
            {
                text: 'YTD'
            },
            {
                intervalType: 'Years',
                interval: 1,
                text: '1Y'
            },
            {
                text: 'All',
                selected: true
            }
        ],
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
```

### JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 JavaScript Stock Chart</title>

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
            min-height: 650px;
        }
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Daily Stock Price
        </h1>

        <p id="stock-chart-description">
            Daily open, high, low, and close prices.
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
                height: '650px',
                theme: 'Bootstrap5',
                title:
                    'Daily Stock Price',
                primaryXAxis: {
                    valueType: 'DateTime',
                    majorGridLines: {
                        width: 0
                    },
                    edgeLabelPlacement:
                        'Shift',
                    crosshairTooltip: {
                        enable: true
                    }
                },
                primaryYAxis: {
                    labelFormat: '${value}',
                    lineStyle: {
                        width: 0
                    },
                    majorTickLines: {
                        width: 0
                    },
                    crosshairTooltip: {
                        enable: true
                    }
                },
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
                        intervalType:
                            'Months',
                        interval: 1,
                        text: '1M'
                    },
                    {
                        intervalType:
                            'Months',
                        interval: 3,
                        text: '3M'
                    },
                    {
                        text: 'YTD'
                    },
                    {
                        intervalType:
                            'Years',
                        interval: 1,
                        text: '1Y'
                    },
                    {
                        text: 'All',
                        selected: true
                    }
                ],
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
                        name:
                            'Stock Price',
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

## Common Patterns

### Candle Chart with Dynamic Updates

```typescript
const updateStockData = (
    updatedData: StockData[]
): void => {
    stockChart
        .series[0]
        .dataSource =
            updatedData;

    stockChart.dataBind();
};
```

Candle configuration:

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
        volume: 'volume',
        bearFillColor: '#DC2626',
        bullFillColor: '#16A34A',
        animation: {
            enable: false
        }
    }
]
```

Do not push raw ticks directly into this series. Aggregate ticks into valid OHLC candles first.

### Multiple Series with a Trendline

Import and inject:

```typescript
StockChart.Inject(
    CandleSeries,
    LineSeries,
    Trendlines
);
```

Configure:

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
        type: 'Line',
        dataSource: stockData,
        xName: 'date',
        yName: 'close',
        name: 'Close',
        width: 2,
        trendlines: [
            {
                type: 'Linear',
                name: 'Linear Trend',
                fill: '#EA580C',
                width: 2
            }
        ]
    }
]
```

Trendlines belong to a compatible single-value series, not a root `trendlines` collection.

### Technical Indicator Dashboard

Inject the required modules:

```typescript
StockChart.Inject(
    SmaIndicator,
    EmaIndicator,
    RsiIndicator
);
```

Configure the source series:

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
    }
]
```

Configure indicators:

```typescript
indicators: [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 14
    },
    {
        type: 'Ema',
        seriesName: 'Price',
        field: 'Close',
        period: 12
    },
    {
        type: 'Rsi',
        seriesName: 'Price',
        field: 'Close',
        period: 14,
        yAxisName: 'rsiAxis'
    }
]
```

An indicator period counts datasource observations, not automatically calendar days.

### Period Selector

```typescript
periods: [
    {
        intervalType: 'Minutes',
        interval: 1,
        text: '1m'
    },
    {
        intervalType: 'Minutes',
        interval: 30,
        text: '30m'
    },
    {
        intervalType: 'Hours',
        interval: 1,
        text: '1H'
    },
    {
        text: '1D'
    }
]
```

Use intraday periods only when the datasource contains intraday timestamps.

Period buttons select visible ranges. They do not change candle resolution.

### Built-In Export and Print

Import and inject:

```typescript
StockChart.Inject(
    Export
);
```

Configure:

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

Disable the built-in export and print controls:

```typescript
exportType: []
```

## Key Properties

### Stock Chart Level

- `primaryXAxis`: Configures the DateTime x-axis.
- `primaryYAxis`: Configures the primary numeric y-axis.
- `axes`: Defines secondary axes.
- `rows`: Defines separate vertical panes.
- `series`: Defines financial and single-value series.
- `indicators`: Defines initialized technical indicators.
- `indicatorType`: Defines indicator-toolbar choices.
- `seriesType`: Defines series-selector choices.
- `trendlineType`: Defines trendline-selector choices.
- `periods`: Defines period-selector buttons.
- `enablePeriodSelector`: Shows or hides the period-selector toolbar.
- `enableSelector`: Shows or hides the integrated range selector.
- `tooltip`: Configures the main chart tooltip.
- `crosshair`: Configures the crosshair.
- `legendSettings`: Configures the Stock Chart legend.
- `annotations`: Defines supported content annotations.
- `chartArea`: Configures the chart-area appearance.
- `palettes`: Defines default series colors.
- `theme`: Selects a built-in theme.
- `exportType`: Defines built-in export choices.
- `noDataTemplate`: Defines the empty-data presentation.
- `width`, `height`: Define component dimensions.

### Series Level

- `dataSource`: Binds local or remote data.
- `type`: Selects the series type.
- `xName`: Maps the x-field.
- `yName`: Maps the y-field for single-value series.
- `open`: Maps the opening-value field.
- `high`: Maps the highest-value field.
- `low`: Maps the lowest-value field.
- `close`: Maps the closing-value field.
- `volume`: Maps the volume field.
- `name`: Identifies the series.
- `bearFillColor`: Configures one financial-state color.
- `bullFillColor`: Configures the other financial-state color.
- `enableSolidCandle`: Selects solid or hollow Candle rendering.
- `fill`: Configures single-value series color.
- `width`: Configures Line or Spline thickness.
- `border`: Configures a supported nested border model.
- `marker`: Configures markers where supported.
- `animation`: Configures series animation.
- `trendlines`: Defines trendlines for a compatible series.
- `visible`: Controls series visibility.
- `yAxisName`: Assigns the series to a named axis.

## Update Guidelines

### Datasource Change

```typescript
stockChart
    .series[0]
    .dataSource =
        updatedData;

stockChart.dataBind();
```

### Appearance Change

```typescript
stockChart
    .series[0]
    .fill =
        '#2563EB';

stockChart.dataBind();
```

### Visibility Change

```typescript
stockChart
    .series[1]
    .visible =
        false;

stockChart.dataBind();
```

### Series-Type Change

```typescript
stockChart
    .series[0]
    .type =
        'HiloOpenClose';

stockChart.refresh();
```

### Indicator Collection Change

```typescript
stockChart.indicators = [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 20
    }
];

stockChart.refresh();
```

### Period Collection Change

```typescript
stockChart.periods = [
    {
        intervalType: 'Months',
        interval: 1,
        text: '1M'
    },
    {
        text: 'All',
        selected: true
    }
];

stockChart.refresh();
```

### Hidden Parent Becomes Visible

```typescript
panel.hidden = false;

window.requestAnimationFrame(
    (): void => {
        stockChart.refresh();
    }
);
```

## Accessibility Requirements

Every generated Stock Chart implementation should include:

- A visible heading
- A concise description
- Sufficient color contrast
- A non-color explanation of financial states where necessary
- Native buttons for custom actions
- An accessible current-status region for dynamic changes
- A data table or details region when exact values matter
- Valid language and direction attributes for localized or RTL content

Example:

```html
<figure aria-labelledby="stock-heading">
    <figcaption id="stock-heading">
        Daily stock price
    </figcaption>

    <p id="stock-description">
        Daily open, high, low, and close prices.
    </p>

    <div
        id="stock-chart"
        aria-describedby="stock-description"
    ></div>

    <details>
        <summary>
            View financial data
        </summary>

        <table>
            <caption>
                Daily OHLC values
            </caption>

            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Open</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Close</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th scope="row">
                        January 2, 2025
                    </th>
                    <td>100</td>
                    <td>106</td>
                    <td>98</td>
                    <td>104</td>
                </tr>
            </tbody>
        </table>
    </details>
</figure>
```

## Performance Requirements

For large or frequently updated datasets:

1. Sort data chronologically.
2. Remove duplicate timestamps.
3. Aggregate data using time buckets.
4. Batch data updates.
5. Bound retained history.
6. Disable unnecessary animation.
7. Limit indicators and panes.
8. Debounce resize refreshes.
9. Cancel stale remote requests.
10. Close WebSockets and clear timers during cleanup.
11. Profile with production-scale data.
12. Avoid unsupported virtual-scrolling and Canvas claims.

Do not use fixed record-count aggregation when timestamps are irregular.

Do not recommend:

```typescript
enableScrollbar: true
```

```typescript
scrollbarSettings: {}
```

```typescript
enableCanvasRendering: true
```

without validating those properties against the installed Stock Chart API.

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

### Incorrect Series Names

Avoid:

```text
HILO
HLOC
```

Use the API values:

```typescript
type: 'Hilo'
```

```typescript
type: 'HiloOpenClose'
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

### Missing DateTime Module

Incorrect:

```typescript
primaryXAxis: {
    valueType: 'DateTime'
}
```

without:

```typescript
StockChart.Inject(
    DateTime
);
```

### RangeTooltip Used as Main Tooltip

Incorrect:

```typescript
StockChart.Inject(
    RangeTooltip
);

tooltip: {
    enable: true
}
```

Correct:

```typescript
StockChart.Inject(
    Tooltip,
    RangeTooltip
);
```

### Incorrect Range Selector

Incorrect:

```typescript
rangeSelector: {
    enable: true
}
```

Correct:

```typescript
enableSelector: true
```

### Period Mistaken for Resolution

Incorrect assumption:

```text
Selecting 1m creates one-minute candles.
```

Correct behavior:

```text
Selecting 1m chooses a one-minute visible range
from the existing datasource.
```

### Incorrect Legend Property

Incorrect:

```typescript
legend: {
    visible: true
}
```

Correct:

```typescript
legendSettings: {
    visible: true
}
```

### Incorrect Palette Property

Incorrect:

```typescript
palette: [
    '#2563EB'
]
```

Correct:

```typescript
palettes: [
    '#2563EB'
]
```

### Trendline at Stock Chart Root

Incorrect:

```typescript
trendlines: [
    {
        type: 'Linear'
    }
]
```

Correct:

```typescript
series: [
    {
        type: 'Line',
        xName: 'date',
        yName: 'close',
        trendlines: [
            {
                type: 'Linear'
            }
        ]
    }
]
```

### Indicator Without Source Mapping

Incorrect:

```typescript
indicators: [
    {
        type: 'Sma',
        period: 14
    }
]
```

Correct:

```typescript
series: [
    {
        name: 'Price'
    }
],
indicators: [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 14
    }
]
```

### Incorrect Indicator Field

Incorrect:

```typescript
field: 'close'
```

Correct:

```typescript
field: 'Close'
```

### Raw Tick Used as Candle

Incorrect:

```typescript
stockChart
    .series[0]
    .dataSource
    .push({
        timestamp,
        price
    });
```

Transform streamed ticks into records containing:

```text
date
open
high
low
close
```

before assigning them to a Candle series.

### Incorrect Tooltip Background

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#111827'
}
```

Correct:

```typescript
tooltip: {
    fill: '#111827'
}
```

### Unsupported Point Selection

Avoid:

```typescript
selectionMode: 'Point'
```

unless the installed Stock Chart API explicitly supports it.

### Unsupported Zoom and Panning Assumptions

Do not copy standalone Chart `zoomSettings` or panning properties into Stock Chart without Stock Chart-specific validation.

Prefer the built-in:

- Period selector
- Range selector
- Date-range control

### Unsupported Virtual Scrolling

Do not claim Stock Chart virtual scrolling through:

```typescript
enableScrollbar: true
```

without API validation.

### Incorrect Export Workflow

Prefer:

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

Do not assume `export()` returns image data or a Promise.

### Incomplete Accessibility Claim

Avoid:

```text
The Stock Chart is automatically WCAG compliant.
```

Prefer:

```text
Test the complete configured Stock Chart, custom controls,
colors, tooltips, selectors, tables, and surrounding interface
against the application’s accessibility requirements.
```

## Final Validation Checklist

Before returning a Stock Chart implementation, verify:

1. The requested platform is TypeScript or JavaScript.
2. `StockChart` is imported from `@syncfusion/ej2-charts`.
3. JavaScript uses `ej.charts.StockChart`.
4. The host exists before rendering.
5. The selector matches the host ID.
6. The host has sufficient width and height.
7. The matching EJ2 stylesheet is loaded.
8. The configured theme exists in the installed version.
9. Dates are JavaScript `Date` objects.
10. `primaryXAxis.valueType` is `DateTime`.
11. `DateTime` is injected.
12. The configured series module is injected.
13. Candle maps `xName`.
14. Candle maps `open`.
15. Candle maps `high`.
16. Candle maps `low`.
17. Candle maps `close`.
18. Hilo maps `high` and `low`.
19. HiloOpenClose maps all OHLC fields.
20. Line, Area, and Spline map `yName`.
21. Hollow Candle uses `enableSolidCandle: false`.
22. Every `seriesType` entry has an injected module.
23. Tooltip usage injects `Tooltip`.
24. Range-tooltip usage injects `RangeTooltip`.
25. Crosshair usage injects `Crosshair`.
26. Legend uses `legendSettings`.
27. Legend usage injects `StockLegend`.
28. Trendline usage injects `Trendlines`.
29. Trendlines belong to a compatible series.
30. Indicator modules match configured indicator types.
31. Indicator `seriesName` matches the source series name.
32. Indicator `field` uses a supported financial value.
33. Volume-dependent indicators have volume data.
34. Indicator periods are described as observation counts.
35. Oscillators use separate panes where appropriate.
36. Secondary axes have unique names.
37. `yAxisName` matches the intended axis.
38. Only one period is selected by default.
39. `Quarter` uses the singular API value.
40. `YTD` and `All` use supported special entries.
41. Period buttons are not described as aggregation controls.
42. `enablePeriodSelector` controls the period selector.
43. `enableSelector` controls the integrated range selector.
44. No invented `RangeSelector` module is injected.
45. Main chart tooltip and range tooltip are distinguished.
46. `palettes` is used instead of `palette`.
47. `chartArea` is used instead of unverified plot-area properties.
48. Axis titles use strings and `titleStyle`.
49. Tooltip background uses `fill`.
50. Series borders use a supported nested `border` model.
51. Built-in export choices use `exportType`.
52. Export and print usage injects `Export`.
53. Programmatic print uses `stockChart.print()`.
54. Export is not assumed to return image bytes or a Promise.
55. Remote HTTP responses are validated.
56. Remote date strings are converted.
57. OHLC records are validated.
58. Records are chronologically sorted.
59. Duplicate timestamps are handled.
60. Raw market ticks are aggregated into candles.
61. Empty data uses `noDataTemplate`.
62. Ordinary updates use `dataBind()`.
63. Structural updates use `refresh()` where required.
64. Hidden containers refresh after becoming visible.
65. Resize refreshes are debounced.
66. Frequent updates are batched.
67. Retained history is bounded where appropriate.
68. Stale requests are canceled.
69. WebSockets and timers are cleaned up.
70. The component is destroyed during teardown.
71. Unsupported point-selection claims are excluded.
72. Unsupported virtual-scrolling claims are excluded.
73. Unsupported Canvas-rendering claims are excluded.
74. Unsupported standalone Chart zoom properties are excluded.
75. Exact financial values are available outside pointer tooltips.
76. Financial meaning is not conveyed only through color.
77. Indicator descriptions avoid guaranteed trading claims.
78. The final code is complete and runnable.
79. TypeScript and JavaScript examples use equivalent mappings.
80. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.