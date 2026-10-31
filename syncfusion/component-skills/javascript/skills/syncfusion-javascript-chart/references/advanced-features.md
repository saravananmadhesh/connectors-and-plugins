# Advanced Features

## Table of Contents

- [Advanced Features](#advanced-features)
  - [Overview](#overview)
  - [Module Injection](#module-injection)
  - [Technical Indicators](#technical-indicators)
    - [Indicator Configuration](#indicator-configuration)
    - [Simple Moving Average](#simple-moving-average)
    - [Exponential Moving Average](#exponential-moving-average)
    - [MACD](#macd)
    - [Bollinger Bands](#bollinger-bands)
    - [Relative Strength Index](#relative-strength-index)
    - [Average True Range](#average-true-range)
    - [Stochastic Oscillator](#stochastic-oscillator)
  - [Trendlines](#trendlines)
    - [Linear Trendline](#linear-trendline)
    - [Exponential Trendline](#exponential-trendline)
    - [Logarithmic Trendline](#logarithmic-trendline)
    - [Power Trendline](#power-trendline)
    - [Polynomial Trendline](#polynomial-trendline)
    - [Moving Average Trendline](#moving-average-trendline)
    - [Trendline Styling](#trendline-styling)
    - [Multiple Trendlines](#multiple-trendlines)
  - [Export Functionality](#export-functionality)
    - [Enable Export](#enable-export)
    - [Export to PNG](#export-to-png)
    - [Export to JPEG](#export-to-jpeg)
    - [Export to SVG](#export-to-svg)
    - [Export to PDF](#export-to-pdf)
    - [Export Chart Data](#export-chart-data)
  - [Animations and Transitions](#animations-and-transitions)
    - [Series Animation](#series-animation)
    - [Trendline Animation](#trendline-animation)
    - [Indicator Animation](#indicator-animation)
    - [Animation Complete Event](#animation-complete-event)
    - [Reduced Motion](#reduced-motion)
  - [Print Functionality](#print-functionality)
    - [Print the Chart](#print-the-chart)


## Overview

The EJ2 Chart supports technical indicators, trendlines, client-side export, printing, and configurable animation.

Technical indicators are mathematical calculations based on historical price, volume, or open-interest information. The Chart supports multiple indicator types through a chart-level `indicators` collection and feature-specific modules.

Trendlines are configured inside a compatible series through its `trendlines` collection. Supported trendline types include Linear, Exponential, Logarithmic, Polynomial, Power, and Moving Average.

The rendered Chart can be exported to JPEG, PNG, SVG, or PDF and printed through the public `print()` method. The `Export` module must be injected when export functionality is required.
## Module Injection

Import and inject only the modules required by the Chart.

```typescript
import {
  AtrIndicator,
  BollingerBands,
  CandleSeries,
  Category,
  Chart,
  DateTime,
  EmaIndicator,
  Export,
  LineSeries,
  MacdIndicator,
  RsiIndicator,
  SmaIndicator,
  StochasticIndicator,
  Tooltip,
  Trendlines
} from '@syncfusion/ej2-charts';

Chart.Inject(
  CandleSeries,
  LineSeries,
  Category,
  DateTime,
  Tooltip,
  Trendlines,
  Export,
  SmaIndicator,
  EmaIndicator,
  MacdIndicator,
  BollingerBands,
  RsiIndicator,
  AtrIndicator,
  StochasticIndicator
);
```

The modules provide:

- `CandleSeries` for Candlestick series.
- `LineSeries` for Line series and compatible indicator output.
- `Category` for Category axes.
- `DateTime` for DateTime axes.
- `Tooltip` for Chart tooltips.
- `Trendlines` for series trendlines.
- `Export` for Chart export.
- `SmaIndicator` for the Simple Moving Average.
- `EmaIndicator` for the Exponential Moving Average.
- `MacdIndicator` for MACD.
- `BollingerBands` for Bollinger Bands.
- `RsiIndicator` for the Relative Strength Index.
- `AtrIndicator` for the Average True Range.
- `StochasticIndicator` for the Stochastic Oscillator.

Technical indicators are configured in the chart-level `indicators` collection. They are not added to the `series` collection as values such as `SmaIndicator` or `MacdIndicator`.

## Technical Indicators

### Indicator Configuration

A technical indicator can use:

- Its own `dataSource`.
- Data mappings such as `xName`, `open`, `high`, `low`, `close`, and `volume`.
- The `seriesName` of a source series.
- A named Y-axis through `yAxisName`.
- Indicator-specific periods and styles.

Example source data:

```typescript
interface StockData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const stockData: StockData[] = [
  {
    date: new Date(2026, 0, 5),
    open: 102,
    high: 108,
    low: 99,
    close: 106,
    volume: 245000
  },
  {
    date: new Date(2026, 0, 6),
    open: 106,
    high: 111,
    low: 103,
    close: 109,
    volume: 268000
  },
  {
    date: new Date(2026, 0, 7),
    open: 109,
    high: 113,
    low: 105,
    close: 107,
    volume: 251000
  }
];
```

Example source series:

```typescript
series: [
  {
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    volume: 'volume',
    type: 'Candle',
    name: 'Price'
  }
]
```

The source series `name` and indicator `seriesName` must match exactly when `seriesName` is used.

### Simple Moving Average

Import and inject `SmaIndicator`.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'Sma',
    period: 20,
    seriesName: 'Price',
    name: 'SMA 20',
    fill: '#0F6CBD',
    width: 2
  }
]
```

Use `type: 'Sma'`, not `type: 'SmaIndicator'`.

The `period` determines how many data points are used to calculate each average.

### Exponential Moving Average

Import and inject `EmaIndicator`.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'Ema',
    period: 12,
    seriesName: 'Price',
    name: 'EMA 12',
    fill: '#8764B8',
    width: 2
  }
]
```

Use `type: 'Ema'`, not `type: 'EmaIndicator'`.

### MACD

Import and inject `MacdIndicator`.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'Macd',
    seriesName: 'Price',
    fastPeriod: 12,
    slowPeriod: 26,
    period: 9,
    macdType: 'Both',
    yAxisName: 'MacdAxis',
    name: 'MACD'
  }
]
```

Use `type: 'Macd'`, not `type: 'MacdIndicator'`.

Common MACD output types include:

- `Line`
- `Histogram`
- `Both`

Place MACD on a separate named Y-axis when its scale differs significantly from the price series.

### Bollinger Bands

Import and inject `BollingerBands`.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'BollingerBands',
    period: 20,
    standardDeviation: 2,
    seriesName: 'Price',
    name: 'Bollinger Bands',
    fill: '#0F6CBD',
    bandColor: 'rgba(15, 108, 189, 0.15)',
    width: 2
  }
]
```

The `bandColor` property controls the area between the upper and lower bands. `standardDeviation` controls the distance of the bands from the moving average.

### Relative Strength Index

Import and inject `RsiIndicator`.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'Rsi',
    period: 14,
    overBought: 70,
    overSold: 30,
    seriesName: 'Price',
    yAxisName: 'RsiAxis',
    name: 'RSI'
  }
]
```

Use `type: 'Rsi'`, not `type: 'RsiIndicator'`.

RSI is normally placed on a separate axis configured around the required oscillator range.

### Average True Range

Import and inject `AtrIndicator`.

ATR requires high, low, and close mappings.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    high: 'high',
    low: 'low',
    close: 'close',
    type: 'Atr',
    period: 14,
    seriesName: 'Price',
    yAxisName: 'AtrAxis',
    name: 'ATR'
  }
]
```

Use `type: 'Atr'`, not `type: 'AtrIndicator'`.

Do not configure ATR with only a `yName` or close-value mapping.

### Stochastic Oscillator

Import and inject `StochasticIndicator`.

The Stochastic indicator requires high, low, and close mappings.

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    high: 'high',
    low: 'low',
    close: 'close',
    type: 'Stochastic',
    kPeriod: 14,
    dPeriod: 3,
    period: 14,
    overBought: 80,
    overSold: 20,
    seriesName: 'Price',
    yAxisName: 'StochasticAxis',
    name: 'Stochastic'
  }
]
```

Use `type: 'Stochastic'`, not `type: 'StochasticIndicator'`.

The technical-indicator model supports indicator-specific properties such as `kPeriod`, `dPeriod`, `fastPeriod`, `slowPeriod`, high, low, close, and animation settings.

## Trendlines

Import and inject `Trendlines` before configuring a trendline.

```typescript
import {
  Chart,
  ScatterSeries,
  Trendlines
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ScatterSeries,
  Trendlines
);
```

Trendlines can be applied to compatible Cartesian series, including Line, Column, Scatter, Area, Candle, and Hilo series. They are not supported for Bar series.

### Linear Trendline

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'x',
    yName: 'y',
    type: 'Scatter',
    name: 'Observations',
    trendlines: [
      {
        type: 'Linear',
        name: 'Linear Trend'
      }
    ]
  }
]
```

### Exponential Trendline

```typescript
trendlines: [
  {
    type: 'Exponential',
    name: 'Exponential Trend'
  }
]
```

Exponential trendlines require values that are compatible with exponential calculation. Zero or negative values prevent a valid exponential trendline from being generated.

### Logarithmic Trendline

```typescript
trendlines: [
  {
    type: 'Logarithmic',
    name: 'Logarithmic Trend'
  }
]
```

Ensure that the independent values are compatible with logarithmic calculation.

### Power Trendline

```typescript
trendlines: [
  {
    type: 'Power',
    name: 'Power Trend'
  }
]
```

Power trendlines require positive values for the relevant calculations.

### Polynomial Trendline

```typescript
trendlines: [
  {
    type: 'Polynomial',
    polynomialOrder: 2,
    name: 'Polynomial Trend'
  }
]
```

The `polynomialOrder` determines the polynomial degree.

Avoid using an unnecessarily high polynomial order because it can overfit the source data.

### Moving Average Trendline

```typescript
trendlines: [
  {
    type: 'MovingAverage',
    period: 3,
    name: 'Moving Average'
  }
]
```

The `period` determines the number of values used in the moving-average calculation.

### Trendline Styling

```typescript
trendlines: [
  {
    type: 'Linear',
    name: 'Trend',
    width: 2,
    fill: '#D13438',
    dashArray: '5,5',
    enableTooltip: true,
    forwardForecast: 2,
    backwardForecast: 1,
    animation: {
      enable: true,
      duration: 600,
      delay: 0
    }
  }
]
```

Trendline settings support width, fill, forecasting, tooltips, markers, animation, and the properties required by polynomial and moving-average trendlines.

### Multiple Trendlines

```typescript
trendlines: [
  {
    type: 'Linear',
    name: 'Linear',
    fill: '#0F6CBD',
    width: 2
  },
  {
    type: 'Polynomial',
    polynomialOrder: 2,
    name: 'Polynomial',
    fill: '#D13438',
    width: 2,
    dashArray: '5,5'
  }
]
```

Multiple trendlines can be attached to a compatible series.

## Export Functionality

Import and inject `Export` before exporting a Chart.

```typescript
import {
  Chart,
  Export
} from '@syncfusion/ej2-charts';

Chart.Inject(Export);
```

Set `enableExport` to `true` when export functionality is required.

```typescript
const chart: Chart = new Chart({
  enableExport: true,
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

The Chart export method supports JPEG, PNG, SVG, and PDF. Its primary arguments are the export type and file name. Optional arguments support PDF orientation, multiple controls, width, and height.

### Enable Export

Native buttons are recommended for application-owned export controls.

```html
<div
  class="chart-actions"
  role="group"
  aria-label="Chart export actions"
>
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
```

### Export to PNG

```typescript
const exportPngButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-png'
  ) as HTMLButtonElement | null;

exportPngButton?.addEventListener(
  'click',
  (): void => {
    chart.export(
      'PNG',
      'sales-report'
    );
  }
);
```

Do not manually append `.png` unless the installed package version explicitly requires it.

### Export to JPEG

```typescript
chart.export(
  'JPEG',
  'sales-report'
);
```

### Export to SVG

```typescript
chart.export(
  'SVG',
  'sales-report'
);
```

### Export to PDF

```typescript
chart.export(
  'PDF',
  'sales-report',
  'Landscape'
);
```

Common PDF orientations include:

- `Portrait`
- `Landscape`

The orientation argument applies to PDF export.

Do not include unmatched braces or parentheses after the export handler.

### Export Chart Data

The Chart can export data to CSV and Excel formats where supported by the installed EJ2 version.

```typescript
chart.export(
  'CSV',
  'sales-data'
);
```

```typescript
chart.export(
  'XLSX',
  'sales-data'
);
```

Validate the exact export types and optional dependencies against the installed package version.

The `export()` method initiates file export. Do not assume that it synchronously returns a Base64 image.

Incorrect:

```typescript
const imageData =
  chart.export(
    'PNG',
    undefined
  );
```

If the application requires a Base64 image, use a validated image-export workflow or serialize the rendered SVG and convert it through an appropriate application-owned process.

## Animations and Transitions

### Series Animation

Animation is configured inside each series.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'x',
    yName: 'y',
    type: 'Column',
    animation: {
      enable: true,
      duration: 1500,
      delay: 0
    }
  }
]
```

The animation model supports `enable`, `duration`, and `delay`. Technical indicators also expose animation configuration.

Do not configure a chart-level `animation` object for regular series animation.

Incorrect:

```typescript
const chart: Chart = new Chart({
  animation: {
    enable: true,
    duration: 2000
  }
});
```

Correct:

```typescript
const chart: Chart = new Chart({
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Column',
      animation: {
        enable: true,
        duration: 2000,
        delay: 0
      }
    }
  ]
});
```

### Trendline Animation

```typescript
trendlines: [
  {
    type: 'Linear',
    name: 'Trend',
    animation: {
      enable: true,
      duration: 600,
      delay: 0
    }
  }
]
```

### Indicator Animation

```typescript
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'Sma',
    period: 20,
    seriesName: 'Price',
    animation: {
      enable: true,
      duration: 600,
      delay: 0
    }
  }
]
```

### Animation Complete Event

Use `animationComplete` when application logic must run after animation.

```typescript
import {
  IAnimationCompleteEventArgs
} from '@syncfusion/ej2-charts';

const chart: Chart = new Chart({
  animationComplete: (
    args: IAnimationCompleteEventArgs
  ): void => {
    console.log(
      'Chart animation completed.',
      args
    );
  },
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Column',
      animation: {
        enable: true,
        duration: 800,
        delay: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Reduced Motion

Respect the user's reduced-motion preference.

```typescript
const prefersReducedMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const chart: Chart = new Chart({
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Column',
      animation: {
        enable: !prefersReducedMotion,
        duration:
          prefersReducedMotion
            ? 0
            : 800,
        delay: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

Disable animation for frequently updated Charts.

The `pointRender` event customizes a point before rendering. It does not define point animation.

## Print Functionality

### Print the Chart

Call the public `print()` method from a user-initiated action.

```html
<button id="print-chart" type="button">
  Print chart
</button>
```

```typescript
const printButton:
  HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

printButton?.addEventListener(
  'click',
  (): void => {
    chart.print();
  }
);
```

By default, `print()` prints the Chart element. The method can also accept element IDs or element references for printing additional content.

### Print Multiple Elements

```typescript
chart.print([
  'report-heading',
  'chart',
  'report-summary'
]);
```

Validate the accepted collection type against the installed package version.

### Custom Print Heading

The Chart does not use a chart-level `print` configuration object such as:

```typescript
print: {
  title: 'Sales Report'
}
```

To print a custom heading, place it in the document and include it in the print target.

```html
<section id="print-report">
  <h1 id="report-heading">
    Sales Report, Quarter 4, 2026
  </h1>

  <div id="chart"></div>

  <p id="report-summary">
    The report summarizes monthly sales and trend data.
  </p>
</section>
```

```typescript
chart.print([
  'report-heading',
  'chart',
  'report-summary'
]);
```

### Print CSS

Use print-specific CSS to preserve the layout and hide interactive controls.

```css
.chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.chart-actions button {
  min-height: 40px;
  padding: 8px 16px;
}

.chart-actions button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}

@media print {
  .chart-actions {
    display: none;
  }

  #chart {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

The browser print dialog controls printer selection, page size, orientation, and PDF output. Do not configure unverified Chart print settings such as `type` or `orientation`.

## Common Configurations

### Financial Chart with Indicators

```typescript
import {
  BollingerBands,
  CandleSeries,
  Chart,
  DateTime,
  LineSeries,
  SmaIndicator,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  CandleSeries,
  LineSeries,
  DateTime,
  Tooltip,
  SmaIndicator,
  BollingerBands
);

const chart: Chart = new Chart({
  title: 'Price Analysis',
  primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'dd MMM'
  },
  primaryYAxis: {
    title: 'Price'
  },
  tooltip: {
    enable: true,
    shared: true
  },
  series: [
    {
      dataSource: stockData,
      xName: 'date',
      open: 'open',
      high: 'high',
      low: 'low',
      close: 'close',
      volume: 'volume',
      type: 'Candle',
      name: 'Price'
    }
  ],
  indicators: [
    {
      dataSource: stockData,
      xName: 'date',
      close: 'close',
      type: 'Sma',
      period: 20,
      seriesName: 'Price',
      name: 'SMA 20',
      fill: '#0F6CBD',
      width: 2
    },
    {
      dataSource: stockData,
      xName: 'date',
      close: 'close',
      type: 'BollingerBands',
      period: 20,
      standardDeviation: 2,
      seriesName: 'Price',
      name: 'Bollinger Bands',
      bandColor:
        'rgba(135, 100, 184, 0.15)'
    }
  ]
});

chart.appendTo('#chart');
```

### Data Analysis with Trendlines

```typescript
import {
  Chart,
  ScatterSeries,
  Tooltip,
  Trendlines
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ScatterSeries,
  Tooltip,
  Trendlines
);

const chart: Chart = new Chart({
  title: 'Data Trend Analysis',
  tooltip: {
    enable: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      type: 'Scatter',
      name: 'Observations',
      trendlines: [
        {
          type: 'Linear',
          name: 'Linear',
          fill: '#0F6CBD',
          width: 2
        },
        {
          type: 'Power',
          name: 'Power',
          fill: '#D13438',
          width: 2,
          dashArray: '5,5'
        }
      ]
    }
  ]
});

chart.appendTo('#chart');
```

### Exportable Dashboard

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  Export
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  Export
);

const chart: Chart = new Chart({
  enableExport: true,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');

const exportPng = (): void => {
  chart.export(
    'PNG',
    'dashboard'
  );
};

const exportPdf = (): void => {
  chart.export(
    'PDF',
    'dashboard',
    'Landscape'
  );
};

const printChart = (): void => {
  chart.print();
};

document
  .getElementById('export-png')
  ?.addEventListener(
    'click',
    exportPng
  );

document
  .getElementById('export-pdf')
  ?.addEventListener(
    'click',
    exportPdf
  );

document
  .getElementById('print-chart')
  ?.addEventListener(
    'click',
    printChart
  );
```

### Animated Analysis Chart

```typescript
const prefersReducedMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'DateTime'
  },
  primaryYAxis: {
    title: 'Price'
  },
  axes: [
    {
      name: 'VolumeAxis',
      title: 'Volume',
      opposedPosition: true
    }
  ],
  series: [
    {
      dataSource: priceData,
      xName: 'date',
      yName: 'price',
      type: 'Line',
      name: 'Price',
      animation: {
        enable: !prefersReducedMotion,
        duration:
          prefersReducedMotion
            ? 0
            : 800,
        delay: 0
      },
      trendlines: [
        {
          type: 'Exponential',
          name: 'Price Trend',
          animation: {
            enable:
              !prefersReducedMotion,
            duration:
              prefersReducedMotion
                ? 0
                : 600,
            delay: 0
          }
        }
      ]
    },
    {
      dataSource: volumeData,
      xName: 'date',
      yName: 'volume',
      type: 'Column',
      name: 'Volume',
      yAxisName: 'VolumeAxis',
      animation: {
        enable: !prefersReducedMotion,
        duration:
          prefersReducedMotion
            ? 0
            : 800,
        delay: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

## Complete TypeScript Example

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  Export,
  LineSeries,
  Tooltip,
  Trendlines
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  LineSeries,
  Category,
  Tooltip,
  Trendlines,
  Export
);

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  {
    month: 'Jan',
    sales: 35
  },
  {
    month: 'Feb',
    sales: 42
  },
  {
    month: 'Mar',
    sales: 48
  },
  {
    month: 'Apr',
    sales: 55
  },
  {
    month: 'May',
    sales: 64
  },
  {
    month: 'Jun',
    sales: 72
  }
];

const prefersReducedMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const chart: Chart = new Chart({
  title: 'Monthly Sales Analysis',
  width: '100%',
  height: '440px',
  enableExport: true,
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Sales',
    minimum: 0,
    maximum: 80,
    interval: 20
  },
  tooltip: {
    enable: true,
    shared: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      animation: {
        enable: !prefersReducedMotion,
        duration:
          prefersReducedMotion
            ? 0
            : 800,
        delay: 0
      },
      trendlines: [
        {
          type: 'Linear',
          name: 'Linear Trend',
          fill: '#D13438',
          width: 2,
          dashArray: '5,5',
          enableTooltip: true,
          animation: {
            enable:
              !prefersReducedMotion,
            duration:
              prefersReducedMotion
                ? 0
                : 600,
            delay: 0
          }
        }
      ]
    }
  ]
});

chart.appendTo('#chart');

const exportPngButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-png'
  ) as HTMLButtonElement | null;

const exportSvgButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-svg'
  ) as HTMLButtonElement | null;

const exportPdfButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-pdf'
  ) as HTMLButtonElement | null;

const printButton:
  HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

const exportPng = (): void => {
  chart.export(
    'PNG',
    'monthly-sales'
  );
};

const exportSvg = (): void => {
  chart.export(
    'SVG',
    'monthly-sales'
  );
};

const exportPdf = (): void => {
  chart.export(
    'PDF',
    'monthly-sales',
    'Landscape'
  );
};

const printChart = (): void => {
  chart.print();
};

exportPngButton?.addEventListener(
  'click',
  exportPng
);

exportSvgButton?.addEventListener(
  'click',
  exportSvg
);

exportPdfButton?.addEventListener(
  'click',
  exportPdf
);

printButton?.addEventListener(
  'click',
  printChart
);

window.addEventListener(
  'beforeunload',
  (): void => {
    exportPngButton?.removeEventListener(
      'click',
      exportPng
    );

    exportSvgButton?.removeEventListener(
      'click',
      exportSvg
    );

    exportPdfButton?.removeEventListener(
      'click',
      exportPdf
    );

    printButton?.removeEventListener(
      'click',
      printChart
    );

    chart.destroy();
  }
);
```

**HTML:**

```html
<section id="sales-report">
  <h1 id="report-heading">
    Monthly Sales Report
  </h1>

  <div
    id="chart"
    role="region"
    aria-label="Column chart showing monthly sales and a linear trendline"
  ></div>

  <div
    class="chart-actions"
    role="group"
    aria-label="Chart export and print actions"
  >
    <button id="export-png" type="button">
      Export PNG
    </button>

    <button id="export-svg" type="button">
      Export SVG
    </button>

    <button id="export-pdf" type="button">
      Export PDF
    </button>

    <button id="print-chart" type="button">
      Print chart
    </button>
  </div>
</section>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 440px;
}

.chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.chart-actions button {
  min-height: 40px;
  padding: 8px 16px;
}

.chart-actions button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}

@media print {
  .chart-actions {
    display: none;
  }

  #chart {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

## Complete JavaScript Example

```javascript
ej.charts.Chart.Inject(
  ej.charts.ColumnSeries,
  ej.charts.LineSeries,
  ej.charts.Category,
  ej.charts.Tooltip,
  ej.charts.Trendlines,
  ej.charts.Export
);

var chartData = [
  {
    month: 'Jan',
    sales: 35
  },
  {
    month: 'Feb',
    sales: 42
  },
  {
    month: 'Mar',
    sales: 48
  },
  {
    month: 'Apr',
    sales: 55
  },
  {
    month: 'May',
    sales: 64
  },
  {
    month: 'Jun',
    sales: 72
  }
];

var prefersReducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

var chart = new ej.charts.Chart({
  title: 'Monthly Sales Analysis',
  width: '100%',
  height: '440px',
  enableExport: true,
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Sales',
    minimum: 0,
    maximum: 80,
    interval: 20
  },
  tooltip: {
    enable: true,
    shared: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      animation: {
        enable:
          !prefersReducedMotion,
        duration:
          prefersReducedMotion
            ? 0
            : 800,
        delay: 0
      },
      trendlines: [
        {
          type: 'Linear',
          name: 'Linear Trend',
          fill: '#D13438',
          width: 2,
          dashArray: '5,5',
          enableTooltip: true
        }
      ]
    }
  ]
});

chart.appendTo('#chart');

var exportPngButton =
  document.getElementById(
    'export-png'
  );

var exportSvgButton =
  document.getElementById(
    'export-svg'
  );

var exportPdfButton =
  document.getElementById(
    'export-pdf'
  );

var printButton =
  document.getElementById(
    'print-chart'
  );

function exportPng() {
  chart.export(
    'PNG',
    'monthly-sales'
  );
}

function exportSvg() {
  chart.export(
    'SVG',
    'monthly-sales'
  );
}

function exportPdf() {
  chart.export(
    'PDF',
    'monthly-sales',
    'Landscape'
  );
}

function printChart() {
  chart.print();
}

if (exportPngButton) {
  exportPngButton.addEventListener(
    'click',
    exportPng
  );
}

if (exportSvgButton) {
  exportSvgButton.addEventListener(
    'click',
    exportSvg
  );
}

if (exportPdfButton) {
  exportPdfButton.addEventListener(
    'click',
    exportPdf
  );
}

if (printButton) {
  printButton.addEventListener(
    'click',
    printChart
  );
}

window.addEventListener(
  'beforeunload',
  function () {
    chart.destroy();
  }
);
```

## Troubleshooting

### Technical Indicator Is Not Displayed

- Import and inject the corresponding indicator module.
- Add the configuration to the chart-level `indicators` collection.
- Do not add the indicator as a regular series.
- Use indicator types such as `Sma`, `Ema`, `Macd`, `Rsi`, `Atr`, or `Stochastic`.
- Do not use `SmaIndicator`, `EmaIndicator`, or `MacdIndicator` as the indicator `type`.
- Ensure that `seriesName` matches the source series `name`.
- Ensure that all required data fields are mapped.
- Ensure that the dataset contains enough points for the configured period.
- Configure a separate Y-axis when the indicator scale differs significantly from price.

### SMA or EMA Is Not Displayed

- Inject `SmaIndicator` or `EmaIndicator`.
- Map the `close` field.
- Set a valid positive `period`.
- Ensure that the data contains more points than the configured period.
- Ensure that `seriesName` matches the price-series name.

### ATR or Stochastic Is Not Displayed

- Map `high`, `low`, and `close`.
- Inject `AtrIndicator` or `StochasticIndicator`.
- Use `type: 'Atr'` or `type: 'Stochastic'`.
- Ensure that the source values are numeric.
- Ensure that sufficient points are available for the configured periods.

### Trendline Is Not Displayed

- Import and inject `Trendlines`.
- Place `trendlines` inside a compatible series.
- Use a supported trendline type.
- Ensure that the source data contains enough valid points.
- Do not use a Bar series.
- Ensure that exponential, logarithmic, and power calculations receive compatible values.

### Export Is Not Working

- Import and inject `Export`.
- Set `enableExport` to `true`.
- Call `export()` from a user-initiated action.
- Use a supported export type.
- Pass a valid file name.
- Ensure that browser downloads are permitted.
- Check optional export dependencies when PDF or Excel export is used.
- Check the browser console for errors.

### PDF Export Is Not Working

- Inject `Export`.
- Use `PDF` as the export type.
- Use `Portrait` or `Landscape` for orientation.
- Ensure that PDF export dependencies are installed.
- Ensure that the Chart has completed rendering.
- Do not pass unrelated Boolean values as undocumented export arguments.

### Export Does Not Return Base64

- The `export()` method initiates file export.
- Do not assume that it returns a Base64 image synchronously.
- Use a validated SVG serialization or image-conversion workflow when Base64 output is required.

### Animation Is Not Applied

- Configure `animation` inside the series, trendline, or indicator.
- Set `animation.enable` to `true`.
- Set a positive duration.
- Do not use an unsupported chart-level `animation` object.
- Check the user's reduced-motion preference.
- Ensure that the Chart is not being refreshed continuously.

### Print Is Not Working

- Call `chart.print()` from a user-initiated action.
- Ensure that the Chart is visible.
- Ensure that the browser permits the print dialog.
- Add print-specific CSS.
- Do not use an unsupported chart-level `print` configuration object.
- Include application-owned headings as additional print targets when required.

## Next Steps

- **Handle data:** See `references/data-handling.md`.
- **Accessibility:** See `references/accessibility-rtl.md`.
- **Troubleshooting:** See `references/troubleshooting.md`.
- **Configure series:** See `references/series-configuration.md`.
- **Configure axes:** See `references/axes-customization.md`.
- **Configure interactions:** See `references/features-interaction.md`.