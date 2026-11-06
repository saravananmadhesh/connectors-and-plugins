# Interaction Features

## Overview

The EJ2 Stock Chart supports financial-data exploration through tooltips, crosshairs, legends, range navigation, period selection, trendlines, stock events, and annotations. Stock Chart-specific features should be preferred over copying interaction settings from the standalone EJ2 Chart without validation.

The primary interaction modules are:

```typescript
import {
    Annotation,
    CandleSeries,
    Crosshair,
    DateTime,
    LineSeries,
    RangeTooltip,
    StockChart,
    StockLegend,
    Tooltip,
    Trendlines
} from '@syncfusion/ej2-charts';
```

Inject only the modules required by the implementation:

```typescript
StockChart.Inject(
    DateTime,
    CandleSeries,
    LineSeries,
    Tooltip,
    RangeTooltip,
    Crosshair,
    StockLegend,
    Trendlines,
    Annotation
);
```

The main chart tooltip requires `Tooltip`, while `RangeTooltip` supports the Stock Chart range navigator. Crosshair support requires `Crosshair`, and legends require the Stock Chart legend module.

## Table of Contents

- #tooltips
  - #basic-tooltip
  - #shared-tooltip
  - #financial-tooltip-content
  - #tooltip-render-event
  - #tooltip-template
  - #tooltip-styling
- #range-tooltip
- #crosshair
  - #basic-crosshair
  - #crosshair-axis-tooltips
  - #crosshair-label-rendering
- #legend
  - #stock-legend-module
  - #legend-configuration
  - #legend-rendering-event
- #range-navigation-and-period-selection
- #selection-zooming-and-panning
- #trendlines
  - #trendline-series
  - #trendline-types
  - #trendline-customization
- #annotations
  - #point-annotation
  - #pixel-annotation
  - #threshold-and-region-alternatives
- #dynamic-interaction-updates
- #accessibility
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Tooltips

The Stock Chart tooltip displays information about the financial point beneath the pointer. Tooltips are disabled by default and can be enabled through `tooltip.enable`. The `Tooltip` module must be injected in TypeScript.

### Basic Tooltip

```typescript
import {
    CandleSeries,
    DateTime,
    StockChart,
    Tooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    CandleSeries,
    Tooltip
);
```

```typescript
const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        tooltip: {
            enable: true,
            shared: false
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
                name: 'Price'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

A Candle series must map the full financial fields:

```typescript
xName: 'date',
open: 'open',
high: 'high',
low: 'low',
close: 'close'
```

Do not use `yName: 'close'` as a substitute for these mappings.

### JavaScript Tooltip

```javascript
var stockChart =
    new ej.charts.StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        tooltip: {
            enable: true,
            shared: false
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
                name: 'Price'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

When the complete EJ2 global bundle is used, separate TypeScript-style module injection is generally unnecessary.

## Shared Tooltip

Set `shared` to `true` when the Stock Chart contains compatible series that should display their values together.

```typescript
tooltip: {
    enable: true,
    shared: true
}
```

A second Line series requires `LineSeries`:

```typescript
import {
    LineSeries
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    LineSeries
);
```

Complete series configuration:

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
    },
    {
        type: 'Line',
        dataSource: movingAverageData,
        xName: 'date',
        yName: 'average',
        name: 'Moving Average',
        width: 2
    }
]
```

`RangeTooltip` does not create a shared main-chart tooltip. Use:

```typescript
Tooltip
```

for the primary chart series tooltip and:

```typescript
RangeTooltip
```

for the range navigator.

## Financial Tooltip Content

The documented Stock Chart tooltip format supports placeholders such as:

```text
${series.name}
${point.x}
${point.y}
```

The official Stock Chart tooltip documentation demonstrates `format` with series and point placeholders.

For financial fields, validate the exact available placeholders against the installed `@syncfusion/ej2-charts` version before depending on:

```text
${point.open}
${point.high}
${point.low}
${point.close}
${point.volume}
```

A support-safe initial configuration is:

```typescript
tooltip: {
    enable: true,
    shared: false,
    header:
        '<b>${point.x}</b>',
    format:
        '${series.name} : ${point.y}'
}
```

For complete OHLC content, use `tooltipRender` when field-specific placeholders are not confirmed.

## Tooltip Render Event

The `tooltipRender` event can be used to generate validated, locale-aware financial text.

```typescript
import {
    ITooltipRenderEventArgs
} from '@syncfusion/ej2-charts';
```

```typescript
const numberFormatter:
    Intl.NumberFormat =
        new Intl.NumberFormat(
            'en-US',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
```

```typescript
tooltipRender: (
    args:
        ITooltipRenderEventArgs
): void => {
    const pointData:
        Partial<StockData> =
            args.point as
                Partial<StockData>;

    if (
        typeof pointData.open !==
            'number' ||
        typeof pointData.high !==
            'number' ||
        typeof pointData.low !==
            'number' ||
        typeof pointData.close !==
            'number'
    ) {
        return;
    }

    args.text = [
        `Open: ${
            numberFormatter.format(
                pointData.open
            )
        }`,
        `High: ${
            numberFormatter.format(
                pointData.high
            )
        }`,
        `Low: ${
            numberFormatter.format(
                pointData.low
            )
        }`,
        `Close: ${
            numberFormatter.format(
                pointData.close
            )
        }`
    ];
}
```

Validate the exact type and shape of `args.point` and `args.text` against the installed EJ2 version before using this event in production.

## Inline Tooltip Formatting

Do not assume that every tooltip placeholder supports inline formatting such as:

```typescript
'${point.close:n2}'
```

or:

```typescript
'${point.x:dd MMM yyyy}'
```

unless this syntax has been explicitly validated against the installed Stock Chart package.

For reliable locale-aware formatting:

1. Use `tooltipRender`.
2. Format numbers through `Intl.NumberFormat`.
3. Format dates through `Intl.DateTimeFormat`.
4. Assign the resulting text through the typed event argument.

Example date formatter:

```typescript
const dateFormatter:
    Intl.DateTimeFormat =
        new Intl.DateTimeFormat(
            'en-US',
            {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }
        );
```

## Tooltip Template

A tooltip can use a custom template, but the template context must be validated against the installed package.

Avoid unconfigured template-pipe syntax:

```typescript
template:
    '${point.x | dateFormat}'
```

The `dateFormat` pipe is not automatically defined in plain TypeScript or JavaScript.

Prefer a selector-based template:

```html
<div
    id="stock-tooltip-template"
    style="display: none;"
>
    <div class="stock-tooltip">
        <strong>${point.x}</strong>
        <span>${series.name}</span>
        <span>${point.y}</span>
    </div>
</div>
```

```typescript
tooltip: {
    enable: true,
    template:
        '#stock-tooltip-template'
}
```

CSS:

```css
.stock-tooltip {
    display: grid;
    gap: 4px;
    padding: 10px;
    border-radius: 6px;
    background: #111827;
    color: #FFFFFF;
    font-family: "Segoe UI", sans-serif;
    font-size: 12px;
}
```

Keep templates static or sanitized. Do not inject untrusted HTML into tooltip content.

## Tooltip Styling

Use `fill` for the tooltip background:

```typescript
tooltip: {
    enable: true,
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
        fontWeight: '500'
    }
}
```

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#FFFFFF'
}
```

Correct:

```typescript
tooltip: {
    fill: '#FFFFFF'
}
```

## Range Tooltip

`RangeTooltip` supports the tooltip used by the Stock Chart range navigator. It is separate from the main series tooltip.

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip
);
```

Use both modules when both interaction surfaces are enabled:

```typescript
StockChart.Inject(
    Tooltip,
    RangeTooltip
);
```

## Crosshair

The crosshair provides vertical and horizontal reference lines at the pointer or touch position. It is enabled through `crosshair.enable`.

### Basic Crosshair

```typescript
import {
    Crosshair
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Crosshair
);
```

```typescript
crosshair: {
    enable: true,
    lineType: 'Both'
}
```

Common line types are:

```text
Both
Vertical
Horizontal
```

Validate optional styling properties against the installed `StockChartCrosshairSettings` model before adding properties such as:

```typescript
lineColor
lineWidth
dashArray
```

Do not use the unsupported pattern:

```typescript
crosshair: {
    tooltip: {
        enable: true
    }
}
```

## Crosshair Axis Tooltips

Enable crosshair labels on the corresponding axes.

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    crosshairTooltip: {
        enable: true,
        fill: '#111827',
        textStyle: {
            color: '#FFFFFF',
            size: '11px'
        }
    }
}
```

```typescript
primaryYAxis: {
    labelFormat: '${value}',
    crosshairTooltip: {
        enable: true,
        fill: '#111827',
        textStyle: {
            color: '#FFFFFF',
            size: '11px'
        }
    }
}
```

Crosshair axis labels are enabled through `crosshairTooltip` on each axis.

## Crosshair Label Rendering

Use `crosshairLabelRender` at Stock Chart root level when crosshair text needs conditional formatting.

```typescript
crosshairLabelRender: (
    args
): void => {
    console.log(
        args.text
    );
}
```

Use the exact event-argument interface available in the installed package rather than defaulting to `any`.

## Legend

Stock Chart legend configuration uses:

```typescript
legendSettings
```

Do not use:

```typescript
legend
```

The Stock Chart has a dedicated legend module, `StockLegend`, for rendering its legend.

## Stock Legend Module

```typescript
import {
    StockLegend
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    StockLegend
);
```

## Legend Configuration

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    padding: 12,
    background: '#FFFFFF',
    border: {
        color: '#CBD5E1',
        width: 1
    },
    textStyle: {
        color: '#334155',
        size: '12px',
        fontFamily: 'Segoe UI'
    },
    toggleVisibility: true
}
```

Common positions include:

```text
Auto
Top
Bottom
Left
Right
Custom
```

For a custom location, validate the installed `StockChartLegendSettings` location model instead of using unverified root `x` and `y` values.

## Legend Rendering Event

`legendRender` runs before a legend item is rendered. It is not a legend-click event.

```typescript
legendRender: (
    args
): void => {
    console.log(
        'Rendering legend item:',
        args.text
    );
}
```

Incorrect description:

```text
legendRender fires when a legend item is clicked.
```

Use the supported legend-click event, if exposed by the installed Stock Chart model, for click-specific logic. Do not substitute `legendRender`.

## Range Navigation and Period Selection

Stock Chart includes financial navigation through:

- Period selector
- Range selector
- Range navigator
- Range tooltip

These features should be used before copying ordinary Chart zoom settings.

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

The Stock Chart product supports range selection, period selection, zooming, and panning as financial-data exploration features. Exact programmatic property support must still be validated against the installed package version.

## Selection, Zooming, and Panning

Do not claim Stock Chart point selection through unverified properties such as:

```typescript
selectionMode: 'Point'
```

```typescript
selectionStyle: {
    color: '#FF5733'
}
```

Do not copy standalone Chart settings into Stock Chart without validation:

```typescript
zoomSettings: {
    enableSelectionZooming: true,
    enableMouseWheelZooming: true,
    enablePinchZooming: true
}
```

Also avoid unverified property names:

```typescript
enableSelectionZoom
```

```typescript
enablePan
```

For the Stock Chart, prefer:

- Period buttons
- Built-in range selector
- Range navigator handles
- Date-range controls
- Application-managed filters

If the installed Stock Chart version explicitly exposes `zoomSettings`, use the exact Stock Chart type definitions and property names for that version.

## Custom Point Selection

If a financial candle must be selected:

1. Use an external date selector or table.
2. Store the selected timestamp in application state.
3. Use a rendering event to alter the matching point’s appearance.
4. Display the selected OHLC values in visible text.
5. Announce the change through a live region when appropriate.

Do not parse generated SVG IDs or classes to identify selected points.

## Trendlines

Trendlines show calculated direction or fitted behavior for a compatible single-value series. The Stock Chart trendline model supports properties including `type`, `period`, `polynomialOrder`, `fill`, `width`, forecasts, intercept, name, marker, and `enableTooltip`.

### Required Module

```typescript
import {
    Trendlines
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Trendlines
);
```

### Compatible Trendline Series

Use a Line series bound to close-price values:

```typescript
import {
    LineSeries
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    LineSeries,
    Trendlines
);
```

```typescript
series: [
    {
        type: 'Line',
        dataSource: stockData,
        xName: 'date',
        yName: 'close',
        name: 'Closing Price',
        width: 2,
        trendlines: [
            {
                type: 'Linear',
                name: 'Linear Trend',
                fill: '#EA580C',
                width: 2,
                enableTooltip: true
            }
        ]
    }
]
```

Do not attach a trendline directly to a Candle series unless that combination is explicitly supported by the target version.

### Trendline Types

Typical trendline types include:

```typescript
trendlines: [
    {
        type: 'Linear',
        name: 'Linear'
    },
    {
        type: 'Exponential',
        name: 'Exponential'
    },
    {
        type: 'Logarithmic',
        name: 'Logarithmic'
    },
    {
        type: 'Power',
        name: 'Power'
    },
    {
        type: 'Polynomial',
        polynomialOrder: 3,
        name: 'Polynomial'
    },
    {
        type: 'MovingAverage',
        period: 5,
        name: 'Moving Average'
    }
]
```

### Trendline Customization

```typescript
trendlines: [
    {
        type: 'Linear',
        name: 'Trend',
        fill: '#EA580C',
        width: 2,
        opacity: 0.9,
        dashArray: '5,5',
        forwardForecast: 2,
        backwardForecast: 0,
        enableTooltip: true
    }
]
```

The referenced Stock Chart trendline model confirms properties such as `fill`, `width`, `period`, `polynomialOrder`, forecasts, and `enableTooltip`.

Do not document the following without explicit support:

```typescript
showEquation: true
```

```typescript
showRSquared: true
```

```typescript
tooltip: {
    shared: true
}
```

These are not established by the referenced Stock Chart trendline model.

## Annotations

Stock Chart exposes an `annotations` collection for chart annotations.

Annotations generally place HTML content at point or pixel coordinates. They are not built-in line or rectangle drawing objects.

### Required Module

If required by the installed package:

```typescript
import {
    Annotation
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Annotation
);
```

### Point Annotation

```typescript
annotations: [
    {
        content:
            '<div class="stock-annotation">' +
            'Earnings' +
            '</div>',
        x: new Date(2025, 0, 8),
        y: 112,
        coordinateUnits: 'Point',
        region: 'Series'
    }
]
```

CSS:

```css
.stock-annotation {
    padding: 4px 8px;
    border: 1px solid #EA580C;
    border-radius: 4px;
    background: #FFF7ED;
    color: #9A3412;
    font-size: 12px;
    font-weight: 600;
}
```

Ensure that the `x` value corresponds to a date in the displayed domain and that the `y` value is within the visible axis range.

### Pixel Annotation

```typescript
annotations: [
    {
        content:
            '<div class="stock-note">' +
            'Updated data' +
            '</div>',
        x: '85%',
        y: '10%',
        coordinateUnits: 'Pixel',
        region: 'Chart'
    }
]
```

Validate percentage and pixel-coordinate support against the installed annotation model.

### Threshold Lines and Regions

Do not use unsupported annotation structures such as:

```typescript
{
    type: 'HorizontalLine',
    x1: ...,
    x2: ...,
    y: ...
}
```

```typescript
{
    type: 'Rectangle',
    x1: ...,
    x2: ...,
    y1: ...,
    y2: ...
}
```

For horizontal thresholds or highlighted ranges, investigate the Stock Chart axis strip-line model:

```typescript
primaryYAxis: {
    stripLines: [
        {
            start: 110,
            end: 112,
            color: '#FDE68A',
            opacity: 0.3
        }
    ]
}
```

Use strip lines only after validating the exact `StockChartStripLineSettings` properties in the installed version. The Stock Chart API overview identifies a Stock Chart strip-line settings model.

## Dynamic Interaction Updates

### Toggle Tooltip

```typescript
stockChart.tooltip.enable =
    !stockChart.tooltip.enable;

stockChart.dataBind();
```

### Toggle Crosshair

```typescript
stockChart.crosshair.enable =
    !stockChart.crosshair.enable;

stockChart.dataBind();
```

### Toggle Legend

```typescript
stockChart
    .legendSettings
    .visible =
        !stockChart
            .legendSettings
            .visible;

stockChart.dataBind();
```

### Update Periods

```typescript
stockChart.periods = [
    {
        text: '1M',
        interval: 1,
        intervalType: 'Months'
    },
    {
        text: '6M',
        interval: 6,
        intervalType: 'Months'
    },
    {
        text: 'All',
        selected: true
    }
];

stockChart.refresh();
```

A toolbar structure change may require `refresh()` rather than a simple `dataBind()`.

### Update Trendline

```typescript
const closeSeries =
    stockChart.series[1];

if (
    closeSeries &&
    closeSeries.trendlines &&
    closeSeries.trendlines[0]
) {
    closeSeries
        .trendlines[0]
        .type =
            'MovingAverage';

    closeSeries
        .trendlines[0]
        .period = 5;

    stockChart.refresh();
}
```

Trendline structure changes can require a complete rerender.

## Accessibility

Tooltips, crosshairs, legends, and range controls must not be the only method for obtaining exact financial values.

Provide an accessible data alternative:

```html
<details>
    <summary>
        View stock-price data
    </summary>

    <table>
        <caption>
            Daily open, high, low, and close prices
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
```

Use native buttons for interaction controls:

```html
<button
    id="toggle-tooltip"
    type="button"
    aria-pressed="true"
>
    Disable tooltip
</button>
```

Do not depend only on:

- Pointer hover
- Red and green color
- Tooltip content
- Legend visibility
- Crosshair position
- Annotation text inside the SVG

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

    <title>Stock Chart Interaction</title>

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

        .stock-chart-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .stock-chart-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .stock-chart-toolbar button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #stock-chart {
            width: 100%;
            min-height: 650px;
        }

        .stock-annotation {
            padding: 4px 8px;
            border: 1px solid #EA580C;
            border-radius: 4px;
            background: #FFF7ED;
            color: #9A3412;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <main
        class="stock-chart-card"
        aria-labelledby="stock-chart-heading"
    >
        <h1 id="stock-chart-heading">
            Stock Price Interaction
        </h1>

        <p id="stock-chart-description">
            Use the tooltip, crosshair, legend, period
            selector, and range navigator to explore
            the displayed financial data.
        </p>

        <div class="stock-chart-toolbar">
            <button
                id="toggle-tooltip"
                type="button"
                aria-pressed="true"
            >
                Disable Tooltip
            </button>

            <button
                id="toggle-crosshair"
                type="button"
                aria-pressed="true"
            >
                Disable Crosshair
            </button>

            <button
                id="toggle-legend"
                type="button"
                aria-pressed="true"
            >
                Hide Legend
            </button>
        </div>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description"
        ></div>

        <details>
            <summary>
                View data description
            </summary>

            <p>
                The candlestick series shows open,
                high, low, and close values. The line
                series shows closing values and a
                moving-average trendline.
            </p>
        </details>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    Annotation,
    CandleSeries,
    Crosshair,
    DateTime,
    LineSeries,
    RangeTooltip,
    StockChart,
    StockLegend,
    Tooltip,
    Trendlines
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
    LineSeries,
    Tooltip,
    RangeTooltip,
    Crosshair,
    StockLegend,
    Trendlines,
    Annotation
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
        title:
            'Daily Stock Price',
        primaryXAxis: {
            valueType: 'DateTime',
            majorGridLines: {
                width: 0
            },
            edgeLabelPlacement: 'Shift',
            crosshairTooltip: {
                enable: true,
                fill: '#111827',
                textStyle: {
                    color: '#FFFFFF',
                    size: '11px'
                }
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
                enable: true,
                fill: '#111827',
                textStyle: {
                    color: '#FFFFFF',
                    size: '11px'
                }
            }
        },
        tooltip: {
            enable: true,
            shared: true,
            fill: '#111827',
            border: {
                color: '#374151',
                width: 1
            },
            textStyle: {
                color: '#FFFFFF',
                size: '12px',
                fontFamily: 'Segoe UI'
            }
        },
        crosshair: {
            enable: true,
            lineType: 'Both'
        },
        legendSettings: {
            visible: true,
            position: 'Bottom',
            alignment: 'Center',
            toggleVisibility: true,
            border: {
                color: '#CBD5E1',
                width: 1
            },
            textStyle: {
                color: '#334155',
                size: '12px',
                fontFamily: 'Segoe UI'
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
                type: 'Line',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                name: 'Close',
                fill: '#2563EB',
                width: 2,
                trendlines: [
                    {
                        type:
                            'MovingAverage',
                        period: 3,
                        name:
                            'Moving Average',
                        fill: '#EA580C',
                        width: 2,
                        enableTooltip: true
                    }
                ]
            }
        ],
        annotations: [
            {
                content:
                    '<div class="stock-annotation">' +
                    'Price high' +
                    '</div>',
                x:
                    new Date(
                        2025,
                        0,
                        10
                    ),
                y: 115,
                coordinateUnits:
                    'Point',
                region: 'Series'
            }
        ],
        indicatorType: [],
        trendlineType: [
            'Linear',
            'MovingAverage'
        ],
        exportType: []
    });

stockChart.appendTo(host);

const bindToggle = (
    selector: string,
    getValue: () => boolean,
    setValue: (
        value: boolean
    ) => void,
    enabledText: string,
    disabledText: string
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
            const next: boolean =
                !getValue();

            setValue(next);

            button.setAttribute(
                'aria-pressed',
                String(next)
            );

            button.textContent =
                next
                    ? enabledText
                    : disabledText;

            stockChart.dataBind();
        }
    );
};

bindToggle(
    '#toggle-tooltip',
    (): boolean => {
        return stockChart
            .tooltip
            .enable;
    },
    (
        value: boolean
    ): void => {
        stockChart
            .tooltip
            .enable = value;
    },
    'Disable Tooltip',
    'Enable Tooltip'
);

bindToggle(
    '#toggle-crosshair',
    (): boolean => {
        return stockChart
            .crosshair
            .enable;
    },
    (
        value: boolean
    ): void => {
        stockChart
            .crosshair
            .enable = value;
    },
    'Disable Crosshair',
    'Enable Crosshair'
);

bindToggle(
    '#toggle-legend',
    (): boolean => {
        return stockChart
            .legendSettings
            .visible;
    },
    (
        value: boolean
    ): void => {
        stockChart
            .legendSettings
            .visible = value;
    },
    'Hide Legend',
    'Show Legend'
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

    <title>Stock Chart Interaction</title>

    https://cdn.syncfusion.com/ej2/34.2.2/material3.css

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        #stock-chart {
            width: 100%;
            min-height: 650px;
        }

        .stock-annotation {
            padding: 4px 8px;
            border: 1px solid #EA580C;
            border-radius: 4px;
            background: #FFF7ED;
            color: #9A3412;
        }
    </style>
</head>
<body>
    <h1>
        Stock Price Interaction
    </h1>

    <p id="stock-chart-description">
        Explore the financial data using the tooltip,
        crosshair, legend, period selector, and range
        navigator.
    </p>

    <div
        id="stock-chart"
        aria-describedby="stock-chart-description"
    ></div>

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
                title:
                    'Daily Stock Price',
                primaryXAxis: {
                    valueType: 'DateTime',
                    majorGridLines: {
                        width: 0
                    },
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
                    shared: true,
                    fill: '#111827',
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px'
                    }
                },
                crosshair: {
                    enable: true,
                    lineType: 'Both'
                },
                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    toggleVisibility: true
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
                        name: 'Price'
                    },
                    {
                        type: 'Line',
                        dataSource:
                            stockData,
                        xName: 'date',
                        yName: 'close',
                        name: 'Close',
                        width: 2,
                        trendlines: [
                            {
                                type:
                                    'MovingAverage',
                                period: 3,
                                name:
                                    'Moving Average',
                                fill:
                                    '#EA580C',
                                width: 2
                            }
                        ]
                    }
                ],
                annotations: [
                    {
                        content:
                            '<div class="stock-annotation">' +
                            'Price high' +
                            '</div>',
                        x:
                            new Date(
                                2025,
                                0,
                                8
                            ),
                        y: 112,
                        coordinateUnits:
                            'Point',
                        region: 'Series'
                    }
                ],
                indicatorType: [],
                trendlineType: [
                    'Linear',
                    'MovingAverage'
                ],
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

### Tooltips

- Import and inject `Tooltip`.
- Keep `RangeTooltip` separate from the main tooltip.
- Map all Candle financial fields.
- Keep tooltip content concise.
- Use `tooltipRender` for verified locale-aware OHLC formatting.
- Do not rely only on tooltip content for exact values.
- Sanitize custom HTML templates.

### Crosshair

- Import and inject `Crosshair`.
- Enable axis labels through `crosshairTooltip`.
- Use `lineType` according to the task.
- Keep crosshair styling visually restrained.
- Test pointer and touch interactions.

### Legend

- Use `legendSettings`.
- Import and inject `StockLegend`.
- Use the legend for multiple identifiable series.
- Keep `toggleVisibility` enabled only when hiding a series does not mislead users.
- Do not treat `legendRender` as a click event.

### Range Navigation

- Prefer period and range selectors for financial navigation.
- Import and inject `RangeTooltip` when required.
- Select only one default period.
- Do not copy standalone Chart zoom properties without validation.

### Trendlines

- Import and inject `Trendlines`.
- Attach trendlines to a compatible single-value series.
- Import and inject that series module.
- Use `fill`, `width`, `period`, and forecast properties as appropriate.
- Do not claim unsupported equation or R-squared rendering.
- Treat trendlines as analytical aids, not financial advice.

### Annotations

- Use content annotations for labels and callouts.
- Keep annotation HTML static or sanitized.
- Do not present unsupported line or rectangle annotation types.
- Validate strip-line support for thresholds and ranges.
- Avoid covering important financial data.

## Combined Mistakes and Future References

### RangeTooltip Used for Shared Series Tooltip

Incorrect:

```typescript
StockChart.Inject(
    RangeTooltip
);

tooltip: {
    enable: true,
    shared: true
}
```

Correct:

```typescript
StockChart.Inject(
    Tooltip,
    RangeTooltip
);
```

`Tooltip` handles the main chart tooltip, while `RangeTooltip` supports the range navigator.

### Missing Financial Mappings

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

### Missing LineSeries

Incorrect:

```typescript
{
    type: 'Line',
    yName: 'close'
}
```

without importing and injecting `LineSeries`.

Correct:

```typescript
StockChart.Inject(
    LineSeries
);
```

### Incorrect Tooltip Background

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#FFFFFF'
}
```

Correct:

```typescript
tooltip: {
    fill: '#FFFFFF'
}
```

### Crosshair Tooltip at Wrong Level

Incorrect:

```typescript
crosshair: {
    tooltip: {
        enable: true
    }
}
```

Correct:

```typescript
primaryXAxis: {
    crosshairTooltip: {
        enable: true
    }
},
primaryYAxis: {
    crosshairTooltip: {
        enable: true
    }
}
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

### Missing Stock Legend Module

Correct TypeScript setup:

```typescript
import {
    StockLegend
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    StockLegend
);
```

### legendRender Described as Click

`legendRender` is a rendering event, not a legend-item click event.

### Unsupported Selection

Avoid:

```typescript
selectionMode: 'Point'
```

```typescript
selectionStyle: {
    color: '#FF5733'
}
```

unless the installed Stock Chart API explicitly supports them.

### Unsupported Zoom Property Names

Avoid:

```typescript
enableSelectionZoom
```

Prefer Stock Chart range navigation unless the exact Stock Chart zoom model has been verified.

### Trendline Attached to Candle

Avoid attaching trendlines to a Candle series without validation.

Preferred:

```typescript
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
```

### Unsupported Trendline Properties

Avoid unverified properties such as:

```typescript
showEquation: true
```

```typescript
showRSquared: true
```

The documented Stock Chart trendline model establishes properties such as type, period, polynomial order, fill, width, forecasts, and tooltip enablement.

### Unsupported Shape Annotations

Avoid:

```typescript
{
    type: 'HorizontalLine'
}
```

```typescript
{
    type: 'VerticalLine'
}
```

```typescript
{
    type: 'Rectangle'
}
```

Use content annotations or a validated strip-line configuration.

### Interaction Validation Checklist

Before generating a Stock Chart interaction example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. `DateTime` is imported and injected.
4. Candle usage imports and injects `CandleSeries`.
5. Candle data maps `xName`.
6. Candle data maps `open`.
7. Candle data maps `high`.
8. Candle data maps `low`.
9. Candle data maps `close`.
10. Main tooltip usage imports and injects `Tooltip`.
11. Range tooltip usage imports and injects `RangeTooltip`.
12. Shared tooltip does not rely only on `RangeTooltip`.
13. Tooltip background uses `fill`.
14. Tooltip formatting placeholders are verified.
15. Inline formatting syntax is verified before use.
16. Unconfigured template pipes are excluded.
17. Crosshair usage imports and injects `Crosshair`.
18. Crosshair axis labels use `crosshairTooltip`.
19. Legend configuration uses `legendSettings`.
20. Legend usage imports and injects `StockLegend`.
21. `legendRender` is not described as a click event.
22. A Line series imports and injects `LineSeries`.
23. Trendline usage imports and injects `Trendlines`.
24. Trendlines are attached to compatible series.
25. Unsupported equation properties are excluded.
26. Annotation usage imports and injects the required module.
27. Annotations use supported content-coordinate settings.
28. Unsupported line or rectangle annotation types are excluded.
29. Stock Chart range navigation is preferred.
30. Standalone Chart zoom properties are not copied blindly.
31. Unsupported point selection is not claimed.
32. Exact data is available outside pointer tooltips.
33. Native controls are used for custom interactions.
34. Dynamic basic settings call `dataBind()`.
35. Structural interaction changes use `refresh()` when required.
36. The host exists before `appendTo()`.
37. The host has sufficient width and height.
38. The matching theme stylesheet is loaded.
39. The TypeScript and JavaScript examples are complete and runnable.
40. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.