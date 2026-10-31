# Technical Indicators

## Overview

The EJ2 Stock Chart supports 10 built-in technical indicators:

- `Sma`
- `Ema`
- `Tma`
- `Macd`
- `Rsi`
- `Stochastic`
- `Atr`
- `BollingerBands`
- `Momentum`
- `AccumulationDistribution`

Each indicator requires its corresponding module to be imported and injected before the Stock Chart is created. The built-in indicator dropdown can add or remove the enabled indicator types at runtime.

Technical indicators calculate derived values from historical price or volume records. They should be treated as descriptive analytical tools rather than guaranteed forecasts.

## Table of Contents

- #indicator-modules
- #datasource-and-field-mapping
- #indicator-periods
- #simple-moving-average
- #exponential-moving-average
- #triangular-moving-average
- #moving-average-convergence-divergence
- #relative-strength-index
- #stochastic
- #average-true-range
- #bollinger-bands
- #momentum
- #accumulation-distribution
- #multiple-indicators
- #indicator-panes
- #built-in-indicator-dropdown
- #indicator-lifecycle-events
- #runtime-indicator-updates
- #performance-considerations
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Indicator Modules

Import only the indicators used by the implementation.

```typescript
import {
    AccumulationDistributionIndicator,
    AtrIndicator,
    BollingerBands,
    EmaIndicator,
    MacdIndicator,
    MomentumIndicator,
    RsiIndicator,
    SmaIndicator,
    StochasticIndicator,
    TmaIndicator
} from '@syncfusion/ej2-charts';
```

Inject the required modules:

```typescript
StockChart.Inject(
    SmaIndicator,
    EmaIndicator,
    TmaIndicator,
    MacdIndicator,
    RsiIndicator,
    StochasticIndicator,
    AtrIndicator,
    BollingerBands,
    MomentumIndicator,
    AccumulationDistributionIndicator
);
```

Each built-in indicator has a corresponding module. For example, `Sma` requires `SmaIndicator`, `Macd` requires `MacdIndicator`, and `AccumulationDistribution` requires `AccumulationDistributionIndicator`.

When the built-in indicator dropdown exposes only selected indicators, inject only those modules:

```typescript
indicatorType: [
    'Sma',
    'Ema',
    'Rsi'
]
```

```typescript
StockChart.Inject(
    SmaIndicator,
    EmaIndicator,
    RsiIndicator
);
```

Do not expose an indicator in `indicatorType` without injecting its module.

## Datasource and Field Mapping

### Main Candle Series

A Candle series requires complete financial mappings:

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
        name: 'Price'
    }
]
```

### Indicator Using a Source Series

An indicator can identify the source series through `seriesName`.

```typescript
{
    type: 'Sma',
    seriesName: 'Price',
    field: 'Close',
    period: 20
}
```

The indicator `seriesName` must match the source series `name` exactly:

```typescript
series: [
    {
        name: 'Price'
    }
],
indicators: [
    {
        seriesName: 'Price'
    }
]
```

### Indicator with Explicit Data Mappings

The Stock Chart indicator model supports datasource and financial-field mappings including `xName`, `open`, `high`, `low`, `close`, and `volume`. It also supports `field`, which is a financial-data-field selection rather than a datasource property name.

```typescript
{
    type: 'Sma',
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    volume: 'volume',
    field: 'Close',
    period: 20
}
```

Incorrect:

```typescript
field: 'close'
```

Preferred:

```typescript
field: 'Close'
```

Keep these two concepts separate:

```typescript
close: 'close'
```

maps the datasource property.

```typescript
field: 'Close'
```

selects the financial value used by the calculation.

## Indicator Periods

An indicator period counts datasource observations, not calendar days.

```typescript
period: 20
```

means:

```text
20 datasource records
```

Its calendar duration depends on the datasource resolution:

- One-minute records produce a 20-minute calculation window.
- Hourly records produce a 20-hour window.
- Daily records produce a 20-trading-record window.
- Weekly records produce a 20-week-record window.

Do not automatically describe:

```typescript
period: 20
```

as a 20-day indicator unless each datasource record represents one daily period.

The Stock Chart indicator model uses `period` as the lookback count for rolling calculations.

## Simple Moving Average

The Simple Moving Average calculates an average over a configured number of observations and is commonly used to display a smoothed price trend.

### Required Module

```typescript
import {
    SmaIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    SmaIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 20,
        fill: '#2563EB',
        width: 2
    }
]
```

### Explicit Datasource Configuration

```typescript
indicators: [
    {
        type: 'Sma',
        dataSource: stockData,
        xName: 'date',
        close: 'close',
        field: 'Close',
        period: 20,
        fill: '#2563EB',
        width: 2
    }
]
```

The indicator type is `Sma`, and the required module is `SmaIndicator`.

## Exponential Moving Average

The Exponential Moving Average applies greater weighting to more recent observations than a simple moving average.

### Required Module

```typescript
import {
    EmaIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    EmaIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Ema',
        seriesName: 'Price',
        field: 'Close',
        period: 12,
        fill: '#EA580C',
        width: 2
    },
    {
        type: 'Ema',
        seriesName: 'Price',
        field: 'Close',
        period: 26,
        fill: '#7C3AED',
        width: 2
    }
]
```

Commonly used values such as 12 or 26 are conventions, not universally appropriate settings. Choose periods according to datasource resolution and analytical requirements.

The indicator type is `Ema`, and its module is `EmaIndicator`.

## Triangular Moving Average

The Triangular Moving Average applies additional smoothing to a moving-average calculation.

### Required Module

```typescript
import {
    TmaIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    TmaIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Tma',
        seriesName: 'Price',
        field: 'Close',
        period: 15,
        fill: '#0F766E',
        width: 2
    }
]
```

The indicator type is `Tma`, and its module is `TmaIndicator`.

A smoother line does not necessarily provide a more accurate or timely signal. Additional smoothing can increase lag.

## Moving Average Convergence Divergence

MACD calculates relationships between exponential moving-average values and can display a MACD line, signal line, and histogram.

### Required Module

```typescript
import {
    MacdIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    MacdIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Macd',
        seriesName: 'Price',
        field: 'Close',
        fastPeriod: 12,
        slowPeriod: 26,
        period: 9,
        macdType: 'Both',
        fill: '#2563EB',
        macdPositiveColor: '#16A34A',
        macdNegativeColor: '#DC2626',
        yAxisName: 'macdAxis'
    }
]
```

The indicator model supports `fastPeriod`, MACD line styling, positive and negative histogram colors, and a MACD rendering type. Validate the installed model for the exact signal-period property expected by that package version.

Do not automatically use an unverified property:

```typescript
signalPeriod: 9
```

If the installed model uses `period` for the signal calculation, use:

```typescript
period: 9
```

## Relative Strength Index

RSI displays a bounded momentum calculation and supports configurable overbought and oversold reference levels.

### Required Module

```typescript
import {
    RsiIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RsiIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Rsi',
        seriesName: 'Price',
        field: 'Close',
        period: 14,
        overBought: 70,
        overSold: 30,
        fill: '#7C3AED',
        yAxisName: 'rsiAxis'
    }
]
```

The indicator model supports `overBought` and `overSold` for RSI and Stochastic indicators.

Threshold crossings are descriptive conditions, not guaranteed buy or sell signals.

Avoid:

```text
RSI above 70 means the user should sell.
```

Prefer:

```text
RSI above the configured upper threshold indicates
that the calculation is in its upper reference region.
```

## Stochastic

The Stochastic indicator compares the current closing value with a recent high-low range.

### Required Module

```typescript
import {
    StochasticIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    StochasticIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Stochastic',
        seriesName: 'Price',
        field: 'Close',
        period: 14,
        kPeriod: 3,
        dPeriod: 3,
        overBought: 80,
        overSold: 20,
        fill: '#2563EB',
        yAxisName: 'stochasticAxis'
    }
]
```

The Stock Chart indicator model supports `kPeriod`, `dPeriod`, `overBought`, and `overSold` for Stochastic calculations.

The Stochastic indicator is represented with upper, lower, period, and signal lines.

## Average True Range

ATR measures price-range volatility by considering high, low, and previous close information.

### Required Module

```typescript
import {
    AtrIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    AtrIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Atr',
        seriesName: 'Price',
        period: 14,
        fill: '#EA580C',
        yAxisName: 'atrAxis'
    }
]
```

When binding the datasource directly, provide the required fields:

```typescript
indicators: [
    {
        type: 'Atr',
        dataSource: stockData,
        xName: 'date',
        high: 'high',
        low: 'low',
        close: 'close',
        period: 14,
        yAxisName: 'atrAxis'
    }
]
```

ATR is a volatility calculation and does not indicate price direction by itself. The Stock Chart uses indicator type `Atr` with the `AtrIndicator` module.

## Bollinger Bands

Bollinger Bands display upper, middle, and lower bands around a moving-average calculation.

### Required Module

```typescript
import {
    BollingerBands
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    BollingerBands
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'BollingerBands',
        seriesName: 'Price',
        field: 'Close',
        period: 20,
        standardDeviation: 2,
        fill: '#2563EB',
        bandColor:
            'rgba(37, 99, 235, 0.12)'
    }
]
```

Use:

```typescript
type: 'BollingerBands'
```

Do not use:

```typescript
type: 'BollingerBand'
```

The Stock Chart indicator list identifies Bollinger Bands as one of its 10 supported indicator types, and its model includes `bandColor` for the band region.

Validate the exact standard-deviation property name against the installed `StockChartIndicatorModel`.

A price touching a band is not an automatic trading instruction, and narrowing bands do not guarantee an upcoming breakout.

## Momentum

The Momentum indicator compares recent price movement across a configured observation window.

### Required Module

```typescript
import {
    MomentumIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    MomentumIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type: 'Momentum',
        seriesName: 'Price',
        field: 'Close',
        period: 10,
        fill: '#2563EB',
        yAxisName: 'momentumAxis'
    }
]
```

The Stock Chart Momentum indicator uses an upper reference line and signal line. Its upper-band value is represented at 100 in the documented implementation.

## Accumulation Distribution

Accumulation Distribution combines price and volume data.

### Required Module

```typescript
import {
    AccumulationDistributionIndicator
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    AccumulationDistributionIndicator
);
```

### Configuration

```typescript
indicators: [
    {
        type:
            'AccumulationDistribution',
        seriesName: 'Price',
        volume: 'volume',
        fill: '#0F766E',
        yAxisName: 'adAxis'
    }
]
```

### Explicit Datasource

```typescript
indicators: [
    {
        type:
            'AccumulationDistribution',
        dataSource: stockData,
        xName: 'date',
        high: 'high',
        low: 'low',
        close: 'close',
        volume: 'volume',
        yAxisName: 'adAxis'
    }
]
```

Accumulation Distribution requires volume data in addition to financial price values.

Verify that every record contains a finite volume value before enabling this indicator.

## Multiple Indicators

Overlay moving averages and Bollinger Bands on the price pane:

```typescript
indicators: [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 20,
        fill: '#2563EB',
        width: 2
    },
    {
        type: 'Ema',
        seriesName: 'Price',
        field: 'Close',
        period: 12,
        fill: '#EA580C',
        width: 2
    },
    {
        type: 'BollingerBands',
        seriesName: 'Price',
        field: 'Close',
        period: 20,
        standardDeviation: 2,
        bandColor:
            'rgba(124, 58, 237, 0.10)',
        fill: '#7C3AED'
    }
]
```

Place oscillators and volatility indicators in separate panes:

```typescript
indicators: [
    {
        type: 'Macd',
        seriesName: 'Price',
        field: 'Close',
        fastPeriod: 12,
        slowPeriod: 26,
        period: 9,
        yAxisName: 'macdAxis'
    },
    {
        type: 'Rsi',
        seriesName: 'Price',
        field: 'Close',
        period: 14,
        overBought: 70,
        overSold: 30,
        yAxisName: 'rsiAxis'
    }
]
```

Avoid displaying too many indicators simultaneously. Overlapping lines and several panes can make the Stock Chart difficult to interpret.

## Indicator Panes

Use rows and named axes to separate indicators from the main price series.

```typescript
rows: [
    {
        height: '60%'
    },
    {
        height: '20%'
    },
    {
        height: '20%'
    }
]
```

```typescript
primaryYAxis: {
    rowIndex: 0,
    title: 'Price',
    labelFormat: '${value}'
}
```

```typescript
axes: [
    {
        name: 'macdAxis',
        rowIndex: 1,
        opposedPosition: true,
        title: 'MACD',
        lineStyle: {
            width: 0
        },
        majorTickLines: {
            width: 0
        }
    },
    {
        name: 'rsiAxis',
        rowIndex: 2,
        opposedPosition: true,
        title: 'RSI',
        minimum: 0,
        maximum: 100,
        interval: 20,
        lineStyle: {
            width: 0
        },
        majorTickLines: {
            width: 0
        }
    }
]
```

Assign each indicator:

```typescript
{
    type: 'Macd',
    yAxisName: 'macdAxis'
}
```

```typescript
{
    type: 'Rsi',
    yAxisName: 'rsiAxis'
}
```

Separate panes are generally appropriate for:

- MACD
- RSI
- Stochastic
- ATR
- Momentum
- Accumulation Distribution

Overlay indicators are generally appropriate for:

- SMA
- EMA
- TMA
- Bollinger Bands

## Built-In Indicator Dropdown

Configure the indicator choices displayed in the built-in toolbar:

```typescript
indicatorType: [
    'Sma',
    'Ema',
    'Tma',
    'Macd',
    'Rsi',
    'Stochastic',
    'Atr',
    'BollingerBands',
    'Momentum',
    'AccumulationDistribution'
]
```

The Stock Chart indicator dropdown can add or remove supported technical indicators.

Every exposed type must have its module injected:

```typescript
StockChart.Inject(
    SmaIndicator,
    EmaIndicator,
    TmaIndicator,
    MacdIndicator,
    RsiIndicator,
    StochasticIndicator,
    AtrIndicator,
    BollingerBands,
    MomentumIndicator,
    AccumulationDistributionIndicator
);
```

To disable the indicator dropdown:

```typescript
indicatorType: []
```

## Indicator Lifecycle Events

The Stock Chart supports lifecycle events for indicator changes initiated through its built-in indicator dropdown.

### beforeIndicatorChange

This event occurs before an indicator is added or removed and can cancel the requested operation.

```typescript
import {
    IBeforeIndicatorChangeEventArgs
} from '@syncfusion/ej2-charts';
```

```typescript
beforeIndicatorChange: (
    args:
        IBeforeIndicatorChangeEventArgs
): void => {
    if (args.type === 'Ema') {
        args.cancel = true;
    }
}
```

### indicatorChanged

This event occurs after an indicator add or remove operation succeeds.

```typescript
import {
    IIndicatorChangedEventArgs
} from '@syncfusion/ej2-charts';
```

```typescript
indicatorChanged: (
    args:
        IIndicatorChangedEventArgs
): void => {
    console.log(
        `${args.type} indicator ` +
        `${args.isAdd
            ? 'added'
            : 'removed'}.`
    );
}
```

The `beforeIndicatorChange` event is exposed by the Stock Chart API. Validate the event interfaces and argument members against the installed EJ2 package because event models can evolve. src="https://cdn.sync

These events apply to user actions made through the built-in indicator dropdown. Indicators declared during initial component creation should not be treated as toolbar add or remove operations.

Do not use an unverified event:

```typescript
indicatorRender: (
    args
): void => {
}
```

Unless the installed Stock Chart model explicitly defines it.

## Runtime Indicator Updates

### Replace the Indicator Collection

```typescript
stockChart.indicators = [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 20,
        fill: '#2563EB'
    },
    {
        type: 'Rsi',
        seriesName: 'Price',
        field: 'Close',
        period: 14,
        yAxisName: 'rsiAxis'
    }
];

stockChart.refresh();
```

Use `refresh()` because adding or removing indicators can change generated series, axes, panes, and legend items.

### Change an Indicator Period

```typescript
const sma =
    stockChart.indicators.find(
        (
            indicator
        ): boolean => {
            return (
                indicator.type ===
                'Sma'
            );
        }
    );

if (sma) {
    sma.period = 50;
    stockChart.refresh();
}
```

### Toggle Indicator Dropdown Choices

```typescript
stockChart.indicatorType = [
    'Sma',
    'Ema',
    'Rsi'
];

stockChart.refresh();
```

The toolbar structure changes, so use a complete refresh.

## Performance Considerations

### Use Only Necessary Indicators

Each enabled indicator adds calculation and rendering work.

Avoid enabling all 10 types when users need only:

```typescript
indicatorType: [
    'Sma',
    'Ema',
    'Rsi'
]
```

### Batch Real-Time Updates

Avoid recalculating indicators after every high-frequency market tick.

```typescript
let updatePending:
    boolean = false;

const scheduleStockUpdate =
    (): void => {
        if (updatePending) {
            return;
        }

        updatePending = true;

        window.setTimeout(
            (): void => {
                updatePending = false;

                stockChart
                    .series[0]
                    .dataSource =
                        currentData;

                stockChart.dataBind();
            },
            250
        );
    };
```

### Disable Animation

```typescript
series: [
    {
        animation: {
            enable: false
        }
    }
],
indicators: [
    {
        animation: {
            enable: false
        }
    }
]
```

### Provide Enough Records

A period-based indicator needs enough observations to produce meaningful output.

For example:

```typescript
period: 20
```

requires a sufficient number of valid records before a moving result can be displayed.

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

    <title>Stock Chart Technical Indicators</title>

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

        .indicator-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .indicator-controls button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .indicator-controls button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #indicator-status {
            min-height: 24px;
            color: #334155;
        }

        #stock-chart {
            width: 100%;
            min-height: 760px;
        }
    </style>
</head>
<body>
    <main
        class="stock-chart-card"
        aria-labelledby="stock-chart-heading"
    >
        <h1 id="stock-chart-heading">
            Price with Technical Indicators
        </h1>

        <p id="stock-chart-description">
            The SMA is overlaid on the price pane.
            MACD and RSI are displayed in separate panes.
            These calculations describe historical data
            and are not trading recommendations.
        </p>

        <div class="indicator-controls">
            <button
                id="show-all-indicators"
                type="button"
            >
                Show SMA, MACD, and RSI
            </button>

            <button
                id="show-sma-only"
                type="button"
            >
                Show SMA Only
            </button>

            <button
                id="clear-indicators"
                type="button"
            >
                Clear Indicators
            </button>
        </div>

        <p
            id="indicator-status"
            role="status"
            aria-live="polite"
        >
            SMA, MACD, and RSI are displayed.
        </p>

        <div
            id="stock-chart"
            aria-describedby="
                stock-chart-description
                indicator-status
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
    AtrIndicator,
    BollingerBands,
    CandleSeries,
    Crosshair,
    DateTime,
    EmaIndicator,
    IBeforeIndicatorChangeEventArgs,
    IIndicatorChangedEventArgs,
    MacdIndicator,
    MomentumIndicator,
    RangeTooltip,
    RsiIndicator,
    SmaIndicator,
    StockChart,
    StochasticIndicator,
    TmaIndicator,
    Tooltip,
    AccumulationDistributionIndicator
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
    RangeTooltip,
    Crosshair,
    SmaIndicator,
    EmaIndicator,
    TmaIndicator,
    MacdIndicator,
    RsiIndicator,
    StochasticIndicator,
    AtrIndicator,
    BollingerBands,
    MomentumIndicator,
    AccumulationDistributionIndicator
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
    },
    {
        date: new Date(2025, 0, 14),
        open: 117,
        high: 121,
        low: 114,
        close: 119,
        volume: 1460000
    },
    {
        date: new Date(2025, 0, 15),
        open: 119,
        high: 123,
        low: 116,
        close: 118,
        volume: 1290000
    },
    {
        date: new Date(2025, 0, 16),
        open: 118,
        high: 125,
        low: 117,
        close: 123,
        volume: 1610000
    },
    {
        date: new Date(2025, 0, 17),
        open: 123,
        high: 127,
        low: 120,
        close: 125,
        volume: 1540000
    },
    {
        date: new Date(2025, 0, 20),
        open: 125,
        high: 128,
        low: 121,
        close: 122,
        volume: 1370000
    },
    {
        date: new Date(2025, 0, 21),
        open: 122,
        high: 129,
        low: 121,
        close: 127,
        volume: 1690000
    },
    {
        date: new Date(2025, 0, 22),
        open: 127,
        high: 132,
        low: 125,
        close: 130,
        volume: 1760000
    },
    {
        date: new Date(2025, 0, 23),
        open: 130,
        high: 134,
        low: 126,
        close: 128,
        volume: 1580000
    },
    {
        date: new Date(2025, 0, 24),
        open: 128,
        high: 135,
        low: 127,
        close: 133,
        volume: 1820000
    },
    {
        date: new Date(2025, 0, 27),
        open: 133,
        high: 137,
        low: 130,
        close: 135,
        volume: 1710000
    },
    {
        date: new Date(2025, 0, 28),
        open: 135,
        high: 139,
        low: 131,
        close: 134,
        volume: 1630000
    },
    {
        date: new Date(2025, 0, 29),
        open: 134,
        high: 141,
        low: 133,
        close: 139,
        volume: 1890000
    },
    {
        date: new Date(2025, 0, 30),
        open: 139,
        high: 144,
        low: 136,
        close: 142,
        volume: 1940000
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

const createIndicators = () => [
    {
        type: 'Sma' as const,
        seriesName: 'Price',
        field: 'Close' as const,
        period: 5,
        fill: '#2563EB',
        width: 2,
        animation: {
            enable: false
        }
    },
    {
        type: 'Macd' as const,
        seriesName: 'Price',
        field: 'Close' as const,
        fastPeriod: 5,
        slowPeriod: 10,
        period: 4,
        macdType: 'Both' as const,
        fill: '#7C3AED',
        macdPositiveColor: '#16A34A',
        macdNegativeColor: '#DC2626',
        yAxisName: 'macdAxis',
        animation: {
            enable: false
        }
    },
    {
        type: 'Rsi' as const,
        seriesName: 'Price',
        field: 'Close' as const,
        period: 5,
        overBought: 70,
        overSold: 30,
        fill: '#EA580C',
        yAxisName: 'rsiAxis',
        animation: {
            enable: false
        }
    }
];

const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '760px',
        theme: 'Bootstrap5',
        title:
            'Price with Technical Indicators',
        rows: [
            {
                height: '60%'
            },
            {
                height: '20%'
            },
            {
                height: '20%'
            }
        ],
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
            rowIndex: 0,
            title: 'Price',
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
        axes: [
            {
                name: 'macdAxis',
                rowIndex: 1,
                opposedPosition: true,
                title: 'MACD',
                lineStyle: {
                    width: 0
                },
                majorTickLines: {
                    width: 0
                }
            },
            {
                name: 'rsiAxis',
                rowIndex: 2,
                opposedPosition: true,
                title: 'RSI',
                minimum: 0,
                maximum: 100,
                interval: 20,
                lineStyle: {
                    width: 0
                },
                majorTickLines: {
                    width: 0
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
                bullFillColor: '#16A34A',
                animation: {
                    enable: false
                }
            }
        ],
        indicators:
            createIndicators(),
        indicatorType: [
            'Sma',
            'Ema',
            'Tma',
            'Macd',
            'Rsi',
            'Stochastic',
            'Atr',
            'BollingerBands',
            'Momentum',
            'AccumulationDistribution'
        ],
        beforeIndicatorChange: (
            args:
                IBeforeIndicatorChangeEventArgs
        ): void => {
            if (args.type === 'Ema') {
                args.cancel = true;
            }
        },
        indicatorChanged: (
            args:
                IIndicatorChangedEventArgs
        ): void => {
            const status:
                HTMLElement | null =
                    document.querySelector(
                        '#indicator-status'
                    );

            if (status) {
                status.textContent =
                    `${args.type} indicator ` +
                    `${args.isAdd
                        ? 'added'
                        : 'removed'}.`;
            }
        },
        seriesType: [],
        trendlineType: [],
        exportType: []
    });

stockChart.appendTo(host);

const setStatus = (
    message: string
): void => {
    const status:
        HTMLElement | null =
            document.querySelector(
                '#indicator-status'
            );

    if (status) {
        status.textContent =
            message;
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
    '#show-all-indicators',
    (): void => {
        stockChart.indicators =
            createIndicators();

        stockChart.refresh();

        setStatus(
            'SMA, MACD, and RSI are displayed.'
        );
    }
);

bindButton(
    '#show-sma-only',
    (): void => {
        stockChart.indicators = [
            {
                type: 'Sma',
                seriesName: 'Price',
                field: 'Close',
                period: 5,
                fill: '#2563EB',
                width: 2,
                animation: {
                    enable: false
                }
            }
        ];

        stockChart.refresh();

        setStatus(
            'Only SMA is displayed.'
        );
    }
);

bindButton(
    '#clear-indicators',
    (): void => {
        stockChart.indicators = [];
        stockChart.refresh();

        setStatus(
            'All configured indicators were removed.'
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

    <title>Stock Chart Technical Indicators</title>

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
            min-height: 760px;
        }
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Price with Technical Indicators
        </h1>

        <p id="stock-chart-description">
            SMA is overlaid on price. MACD and RSI
            appear in separate panes. These calculations
            are not trading recommendations.
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
            },
            {
                date: new Date(2025, 0, 13),
                open: 115,
                high: 119,
                low: 112,
                close: 117,
                volume: 1380000
            },
            {
                date: new Date(2025, 0, 14),
                open: 117,
                high: 121,
                low: 114,
                close: 119,
                volume: 1460000
            },
            {
                date: new Date(2025, 0, 15),
                open: 119,
                high: 123,
                low: 116,
                close: 118,
                volume: 1290000
            },
            {
                date: new Date(2025, 0, 16),
                open: 118,
                high: 125,
                low: 117,
                close: 123,
                volume: 1610000
            },
            {
                date: new Date(2025, 0, 17),
                open: 123,
                high: 127,
                low: 120,
                close: 125,
                volume: 1540000
            },
            {
                date: new Date(2025, 0, 20),
                open: 125,
                high: 128,
                low: 121,
                close: 122,
                volume: 1370000
            },
            {
                date: new Date(2025, 0, 21),
                open: 122,
                high: 129,
                low: 121,
                close: 127,
                volume: 1690000
            },
            {
                date: new Date(2025, 0, 22),
                open: 127,
                high: 132,
                low: 125,
                close: 130,
                volume: 1760000
            }
        ];

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '760px',
                title:
                    'Price with Technical Indicators',
                rows: [
                    {
                        height: '60%'
                    },
                    {
                        height: '20%'
                    },
                    {
                        height: '20%'
                    }
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
                    rowIndex: 0,
                    title: 'Price',
                    labelFormat: '${value}',
                    lineStyle: {
                        width: 0
                    },
                    majorTickLines: {
                        width: 0
                    }
                },
                axes: [
                    {
                        name: 'macdAxis',
                        rowIndex: 1,
                        opposedPosition: true,
                        title: 'MACD',
                        lineStyle: {
                            width: 0
                        },
                        majorTickLines: {
                            width: 0
                        }
                    },
                    {
                        name: 'rsiAxis',
                        rowIndex: 2,
                        opposedPosition: true,
                        title: 'RSI',
                        minimum: 0,
                        maximum: 100,
                        interval: 20,
                        lineStyle: {
                            width: 0
                        },
                        majorTickLines: {
                            width: 0
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
                        animation: {
                            enable: false
                        }
                    }
                ],
                indicators: [
                    {
                        type: 'Sma',
                        seriesName: 'Price',
                        field: 'Close',
                        period: 5,
                        fill: '#2563EB',
                        width: 2
                    },
                    {
                        type: 'Macd',
                        seriesName: 'Price',
                        field: 'Close',
                        fastPeriod: 5,
                        slowPeriod: 10,
                        period: 4,
                        macdType: 'Both',
                        fill: '#7C3AED',
                        macdPositiveColor:
                            '#16A34A',
                        macdNegativeColor:
                            '#DC2626',
                        yAxisName:
                            'macdAxis'
                    },
                    {
                        type: 'Rsi',
                        seriesName: 'Price',
                        field: 'Close',
                        period: 5,
                        overBought: 70,
                        overSold: 30,
                        fill: '#EA580C',
                        yAxisName:
                            'rsiAxis'
                    }
                ],
                indicatorType: [
                    'Sma',
                    'Ema',
                    'Tma',
                    'Macd',
                    'Rsi',
                    'Stochastic',
                    'Atr',
                    'BollingerBands',
                    'Momentum',
                    'AccumulationDistribution'
                ],
                seriesType: [],
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

### Indicator Configuration

- Import and inject every indicator module used.
- Match `seriesName` to the source series name.
- Use `field: 'Close'` rather than a lowercase datasource field name.
- Keep datasource mappings and field selection separate.
- Provide high, low, open, close, and volume mappings when required.
- Ensure the datasource contains enough records for the selected period.
- Remember that periods count observations rather than calendar days.

### Layout

- Overlay SMA, EMA, TMA, and Bollinger Bands on the price pane.
- Place MACD, RSI, Stochastic, ATR, Momentum, and Accumulation Distribution in separate panes.
- Use named axes and matching `yAxisName` values.
- Keep the number of simultaneous panes manageable.

### Interpretation

- Do not describe thresholds as guaranteed trading signals.
- Do not describe indicator output as financial advice.
- Do not state that Bollinger Band narrowing guarantees a breakout.
- Do not state that a moving average identifies exact support or resistance.
- Explain that calculations depend on input resolution and period settings.

### Performance

- Limit toolbar choices to required indicators.
- Batch live-data updates.
- Disable unnecessary animation.
- Avoid recalculating after every market tick.
- Test with production-scale data.
- Use server-side aggregation for very large datasets when appropriate.

## Combined Mistakes and Future References

### Incorrect Field Value

Incorrect:

```typescript
field: 'close'
```

Correct:

```typescript
field: 'Close'
```

The `field` property uses a financial-data-field value, while `close` maps the datasource field name.

### Missing Source Series Name

Incorrect:

```typescript
series: [
    {
        name: 'Price'
    }
],
indicators: [
    {
        seriesName: 'Stock Price'
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
        seriesName: 'Price'
    }
]
```

### Missing Candle Mappings

Incorrect:

```typescript
{
    type: 'Candle',
    dataSource: stockData,
    xName: 'date'
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
    close: 'close',
    volume: 'volume'
}
```

### Incorrect Bollinger Type

Incorrect:

```typescript
type: 'BollingerBand'
```

Correct:

```typescript
type: 'BollingerBands'
```

### Period Described as Days

Incorrect:

```text
period: 20 means 20 days.
```

Correct:

```text
period: 20 means 20 datasource observations.
```

### Missing Volume for Accumulation Distribution

Incorrect:

```typescript
{
    type:
        'AccumulationDistribution',
    close: 'close'
}
```

Correct:

```typescript
{
    type:
        'AccumulationDistribution',
    high: 'high',
    low: 'low',
    close: 'close',
    volume: 'volume'
}
```

Accumulation Distribution combines price and volume information.

### Overlaying Every Indicator

Avoid placing MACD, RSI, ATR, and Momentum directly over the price axis.

Use separate rows and named axes.

### Unsupported indicatorRender Event

Avoid:

```typescript
indicatorRender: (
    args
): void => {
}
```

unless it is explicitly available in the installed Stock Chart model.

### Duplicate Indicator Events Heading

Keep a single consolidated section covering:

- `beforeIndicatorChange`
- `indicatorChanged`

### Toolbar Event Scope

Do not claim that initial `indicators` configuration triggers toolbar add or remove events.

These events are intended for user operations through the built-in indicator selector.

### Indicator Validation Checklist

Before generating a Stock Chart indicator example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. `DateTime` is imported and injected.
4. Candle usage imports and injects `CandleSeries`.
5. Candle data maps `xName`.
6. Candle data maps `open`.
7. Candle data maps `high`.
8. Candle data maps `low`.
9. Candle data maps `close`.
10. Volume is mapped when required.
11. Dates are JavaScript `Date` objects.
12. Each indicator type has its corresponding injected module.
13. `Sma` uses `SmaIndicator`.
14. `Ema` uses `EmaIndicator`.
15. `Tma` uses `TmaIndicator`.
16. `Macd` uses `MacdIndicator`.
17. `Rsi` uses `RsiIndicator`.
18. `Stochastic` uses `StochasticIndicator`.
19. `Atr` uses `AtrIndicator`.
20. `BollingerBands` uses `BollingerBands`.
21. `Momentum` uses `MomentumIndicator`.
22. `AccumulationDistribution` uses `AccumulationDistributionIndicator`.
23. `field` uses a supported financial enum value.
24. Datasource mappings use the actual property names.
25. `seriesName` matches the source series name.
26. Periods are described as observation counts.
27. Stochastic period properties use the correct names.
28. MACD period properties match the installed model.
29. Bollinger standard-deviation configuration matches the installed model.
30. Accumulation Distribution has valid volume data.
31. Overlay indicators remain on the price pane.
32. Oscillators use separate panes where appropriate.
33. Rows are defined for separate panes.
34. Secondary axes have unique names.
35. Indicator `yAxisName` matches an axis name.
36. Only one axis uses each intended row.
37. Toolbar choices match injected modules.
38. Unsupported indicator events are excluded.
39. Indicator lifecycle events use validated argument types.
40. Toolbar lifecycle events are not claimed for initial configuration.
41. Runtime collection changes use `refresh()`.
42. Frequent updates are batched.
43. Animations are disabled when necessary.
44. Interpretations avoid guaranteed trading claims.
45. Accessible explanatory text is provided.
46. The host exists before `appendTo()`.
47. The host has sufficient width and height.
48. The matching EJ2 stylesheet is loaded.
49. TypeScript and JavaScript examples are complete and runnable.
50. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.