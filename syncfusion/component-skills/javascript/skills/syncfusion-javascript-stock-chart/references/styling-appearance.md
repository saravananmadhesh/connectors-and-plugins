# Styling and Appearance

## Overview

The EJ2 Stock Chart provides built-in themes and configuration models for customizing the chart background, plot area, title, axes, financial series, single-value series, legend, tooltip, dimensions, and responsive behavior.

The Stock Chart renders using SVG by default. Styling should therefore use supported component properties rather than undocumented CSS selectors or unsupported Canvas settings.

The supplied content required these primary corrections:

- Theme names vary by EJ2 release. Validate them against the installed `ChartTheme` type.
- `TailwindCSS` is not a safe universal theme value. Depending on the version, the valid theme may be `Tailwind`, `Tailwind3`, or a dark variant.
- A Candle series requires complete `xName`, `open`, `high`, `low`, and `close` mappings.
- `bullFillColor` and `bearFillColor` meanings should not be described universally without testing the configured candle mode.
- Use a nested `border` object instead of assumed `borderWidth` and `borderColor` properties.
- Stock Chart uses `palettes`, not `palette`.
- `chartArea` is the supported plot-area appearance model.
- The proposed `plotArea` object and `plotAreaBackground` property should not be used without API validation.
- Axis titles use a string plus `titleStyle`.
- Use `legendSettings`, not `legend`.
- Use tooltip `fill`, not `backgroundColor`.
- Crosshair styling properties must be verified against the Stock Chart crosshair model.
- `enableCanvasRendering` should not be presented as a Stock Chart performance option without explicit API support.
- `enableTouchMode` is not required for normal touch interaction.
- Use responsive media queries instead of user-agent detection.
- Resize handling should be debounced.
- Complex external SVG gradient references should be validated before use.
- Internal classes such as `.e-chart-title` and `.e-major-grid-line` should not be treated as stable public styling APIs.
- Theme Studio does not directly support data-visualization controls such as Chart and Range Navigator.

## Table of Contents

- #themes
- #theme-stylesheets
- #color-palettes
- #stock-chart-background
- #chart-area-styling
- #title-and-subtitle
- #axis-styling
- #financial-series-styling
- #line-series-styling
- #area-series-styling
- #legend-styling
- #tooltip-styling
- #gradient-fills
- #dimensions
- #responsive-design
- #runtime-style-updates
- #accessibility
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Themes

Set the Stock Chart theme through the root `theme` property:

```typescript
const stockChart: StockChart =
    new StockChart({
        theme: 'Bootstrap5',
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

Built-in theme families include:

- Material
- Bootstrap
- Fluent
- Tailwind
- Fabric
- High Contrast
- Dark variants
- Version-specific variants such as Bootstrap 5 or Tailwind 3

Exact enum names can change between releases. Validate the selected value against the `ChartTheme` type included in the installed `@syncfusion/ej2-charts` package.

### TypeScript Theme Typing

```typescript
import {
    ChartTheme,
    StockChart
} from '@syncfusion/ej2-charts';

const selectedTheme:
    ChartTheme =
        'Bootstrap5';
```

```typescript
const stockChart: StockChart =
    new StockChart({
        theme: selectedTheme
    });
```

Do not assume this value exists in every version:

```typescript
theme: 'TailwindCSS'
```

Use a theme value confirmed by the installed package, such as:

```typescript
theme: 'Tailwind'
```

or a version-specific value if supported.

## Theme Stylesheets

Load the stylesheet that corresponds to the selected theme.

### HTML

```html
https://cdn.syncfusion.com/ej2/34.2.2/material3.css
```

## Color Palettes

Use the Stock Chart `palettes` collection to assign default colors across multiple series:

```typescript
palettes: [
    '#2563EB',
    '#0F766E',
    '#15803D',
    '#EA580C',
    '#7C3AED'
]
```

Do not use:

```typescript
palette: [
    '#2563EB'
]
```

Use:

```typescript
palettes: [
    '#2563EB'
]
```

A color palette primarily controls the default colors assigned to different series. A Candle series can additionally use financial-series color properties.

```typescript
const stockChart: StockChart =
    new StockChart({
        palettes: [
            '#2563EB',
            '#0F766E',
            '#15803D',
            '#EA580C',
            '#7C3AED'
        ],
        series: [
            {
                type: 'Line',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                name: 'Close'
            },
            {
                type: 'Line',
                dataSource: movingAverageData,
                xName: 'date',
                yName: 'average',
                name: 'Moving Average'
            }
        ]
    });
```

## Stock Chart Background

Use the root `background` property to style the complete Stock Chart background:

```typescript
background: '#FFFFFF'
```

Use the root `border` property for the outer component border:

```typescript
border: {
    color: '#CBD5E1',
    width: 1
}
```

Example:

```typescript
const stockChart: StockChart =
    new StockChart({
        background: '#FFFFFF',
        border: {
            color: '#CBD5E1',
            width: 1
        }
    });
```

Use CSS on an external container when the layout requires:

- Rounded corners
- Box shadows
- External padding
- External margin
- Dashboard-card treatment

```css
.stock-chart-card {
    padding: 20px;
    border: 1px solid #CBD5E1;
    border-radius: 12px;
    background: #FFFFFF;
    box-shadow:
        0 8px 24px
        rgba(15, 23, 42, 0.08);
}
```

Do not attempt to create an outer card entirely through internal SVG properties.

## Chart Area Styling

Use `chartArea` to configure the display area.

The Stock Chart chart-area model supports properties such as `background`, `backgroundImage`, `border`, `margin`, `opacity`, and `width`.

```typescript
chartArea: {
    background: '#F8FAFC',
    opacity: 1,
    border: {
        color: '#E2E8F0',
        width: 1
    },
    margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
}
```

### Transparent Chart Area

```typescript
chartArea: {
    background: 'transparent',
    border: {
        width: 0
    }
}
```

### Chart-Area Background Image

```typescript
chartArea: {
    backgroundImage:
        '/assets/chart-background.png',
    opacity: 0.15
}
```

Use background images sparingly because they can reduce the contrast of gridlines, candles, labels, and annotations.

### Unsupported Plot-Area Configuration

Do not use the following without confirming the API:

```typescript
plotAreaBackground: '#FFFFFF'
```

```typescript
plotArea: {
    background: '#FAFAFA'
}
```

Use the supported `chartArea` model instead.

## Title and Subtitle

### Title

```typescript
title:
    'AAPL Stock Price'
```

```typescript
titleStyle: {
    color: '#0F172A',
    size: '18px',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '600',
    textAlignment: 'Center',
    textOverflow: 'Trim'
}
```

### Subtitle

```typescript
subTitle:
    'Daily open, high, low, and close values'
```

```typescript
subTitleStyle: {
    color: '#475569',
    size: '13px',
    fontFamily: 'Segoe UI',
    fontStyle: 'Normal',
    fontWeight: '400',
    textAlignment: 'Center',
    textOverflow: 'Trim'
}
```

Complete example:

```typescript
const stockChart: StockChart =
    new StockChart({
        title:
            'AAPL Stock Price',
        titleStyle: {
            color: '#0F172A',
            size: '18px',
            fontFamily:
                'Segoe UI',
            fontWeight: '600'
        },
        subTitle:
            'Daily OHLC values',
        subTitleStyle: {
            color: '#475569',
            size: '13px',
            fontFamily:
                'Segoe UI'
        }
    });
```

Avoid overly decorative fonts that make financial labels difficult to scan.

## Axis Styling

### DateTime Axis

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'MMM d',
    edgeLabelPlacement: 'Shift',
    majorGridLines: {
        width: 0
    },
    lineStyle: {
        color: '#CBD5E1',
        width: 1
    },
    majorTickLines: {
        color: '#94A3B8',
        width: 1
    },
    labelStyle: {
        color: '#475569',
        size: '11px',
        fontFamily: 'Segoe UI'
    }
}
```

### Numeric Axis

```typescript
primaryYAxis: {
    title: 'Price (USD)',
    titleStyle: {
        color: '#334155',
        size: '13px',
        fontFamily: 'Segoe UI',
        fontWeight: '600'
    },
    labelFormat: '${value}',
    majorGridLines: {
        color: '#E2E8F0',
        width: 1
    },
    lineStyle: {
        width: 0
    },
    majorTickLines: {
        width: 0
    },
    labelStyle: {
        color: '#475569',
        size: '11px',
        fontFamily: 'Segoe UI'
    }
}
```

Axis titles use a string and a separate style model.

Incorrect:

```typescript
primaryYAxis: {
    title: {
        text: 'Price',
        style: {
            size: '13px'
        }
    }
}
```

Correct:

```typescript
primaryYAxis: {
    title: 'Price',
    titleStyle: {
        size: '13px'
    }
}
```

## Financial Series Styling

### Candle Series

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
        name: 'Price',
        bearFillColor: '#DC2626',
        bullFillColor: '#16A34A',
        border: {
            color: '#334155',
            width: 0.5
        },
        animation: {
            enable: false
        }
    }
]
```

Do not use:

```typescript
borderWidth: 0.5,
borderColor: '#334155'
```

Use the nested model:

```typescript
border: {
    color: '#334155',
    width: 0.5
}
```

The exact visual meaning of `bullFillColor` and `bearFillColor` can depend on the Candle rendering mode and package version. Validate the rendered result before describing either property as universally representing an up or down candle.

### Hollow Candle

```typescript
{
    type: 'Candle',
    enableSolidCandle: false,
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
}
```

A Hollow Candle is not a separate series type. It uses `CandleSeries` with `enableSolidCandle: false`.

### HiloOpenClose

```typescript
{
    type: 'HiloOpenClose',
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

## Line Series Styling

A Line series requires `LineSeries` injection and an `xName` and `yName` mapping.

```typescript
import {
    LineSeries
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    LineSeries
);
```

```typescript
{
    type: 'Line',
    dataSource: stockData,
    xName: 'date',
    yName: 'close',
    name: 'Closing Price',
    fill: '#2563EB',
    width: 2,
    dashArray: '5,5',
    opacity: 0.9,
    marker: {
        visible: true,
        width: 7,
        height: 7,
        shape: 'Circle',
        fill: '#FFFFFF',
        border: {
            color: '#2563EB',
            width: 2
        }
    }
}
```

Avoid enabling markers for thousands of points because they can create visual clutter and additional rendering work.

## Area Series Styling

An Area series requires `AreaSeries` injection and `xName` and `yName` mappings.

```typescript
import {
    AreaSeries
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    AreaSeries
);
```

```typescript
{
    type: 'Area',
    dataSource: stockData,
    xName: 'date',
    yName: 'close',
    name: 'Closing Price',
    fill:
        'rgba(37, 99, 235, 0.25)',
    opacity: 0.8,
    border: {
        color: '#2563EB',
        width: 2
    }
}
```

Area does not calculate cumulative values. It fills the region beneath the supplied y-values.

Avoid combining a low-opacity RGBA fill with another very low series opacity unless the resulting area remains visible:

```typescript
fill:
    'rgba(37, 99, 235, 0.25)',
opacity: 0.8
```

The effective visual opacity is influenced by both values.

## Legend Styling

Use:

```typescript
legendSettings
```

not:

```typescript
legend
```

Import and inject `StockLegend` when the legend is enabled:

```typescript
import {
    StockLegend
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    StockLegend
);
```

Configure it:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    padding: 12,
    background: '#FFFFFF',
    border: {
        color: '#E2E8F0',
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

Do not use:

```typescript
legend: {
    visible: true
}
```

## Tooltip Styling

Import and inject `Tooltip`:

```typescript
import {
    Tooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Tooltip
);
```

Use `fill` for the tooltip background:

```typescript
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
        fontFamily: 'Segoe UI',
        fontWeight: '500'
    }
}
```

Incorrect:

```typescript
tooltip: {
    backgroundColor: '#333333'
}
```

Correct:

```typescript
tooltip: {
    fill: '#333333'
}
```

## Gradient Fills

SVG gradients can be applied only when the generated series output and `fill` property accept a stable SVG paint-server reference.

Example external definition:

```html
<svg
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
>
    <defs>
        <linearGradient
            id="price-gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
        >
            <stop
                offset="0%"
                stop-color="#2563EB"
                stop-opacity="0.70"
            ></stop>

            <stop
                offset="100%"
                stop-color="#2563EB"
                stop-opacity="0.05"
            ></stop>
        </linearGradient>
    </defs>
</svg>
```

Series configuration:

```typescript
{
    type: 'Area',
    dataSource: stockData,
    xName: 'date',
    yName: 'close',
    fill:
        'url(#price-gradient)',
    border: {
        color: '#2563EB',
        width: 2
    }
}
```

Validate this approach in the target browsers and EJ2 version because:

- The component may create or recreate SVG elements.
- Export behavior may differ from browser rendering.
- External SVG references may not be preserved in PNG or PDF output.
- Duplicate gradient IDs can conflict when several charts exist.
- Shadow DOM or embedded contexts can affect reference resolution.

For maximum export reliability, prefer a supported solid or RGBA fill.

## Dimensions

### Fixed Size

```typescript
const stockChart: StockChart =
    new StockChart({
        width: '800px',
        height: '600px'
    });
```

Use fixed dimensions for:

- Controlled reporting layouts
- Export-only instances
- Kiosk screens
- Fixed dashboard panels

### Responsive Width

```typescript
const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '600px'
    });
```

The parent must have a measurable width:

```css
.stock-chart-wrapper {
    width: 100%;
    max-width: 1200px;
}

#stock-chart {
    width: 100%;
    min-height: 600px;
}
```

Do not use:

```typescript
enableCanvasRendering: true
```

as a Stock Chart optimization unless that property is explicitly exposed by the installed Stock Chart type definition.

Although the EJ2 Chart package supports SVG and Canvas rendering modes for Chart, Stock Chart-specific support and behavior must be validated before applying a Chart-only option.

## Responsive Design

Use CSS media queries and `matchMedia()` instead of user-agent detection.

### Responsive CSS

```css
#stock-chart {
    width: 100%;
    min-height: 650px;
}

@media (max-width: 767px) {
    #stock-chart {
        min-height: 480px;
    }
}
```

### Debounced Resize Handling

```typescript
let resizeTimer:
    number | undefined;

const updateResponsiveLayout =
    (): void => {
        const compact:
            boolean =
                window.matchMedia(
                    '(max-width: 767px)'
                ).matches;

        stockChart.height =
            compact
                ? '480px'
                : '650px';

        stockChart
            .legendSettings
            .visible =
                !compact;

        stockChart.refresh();
    };
```

```typescript
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
                updateResponsiveLayout,
                150
            );
    }
);
```

Do not use:

```typescript
const isMobile =
    /iPhone|Android/i
        .test(
            navigator.userAgent
        );
```

Viewport width, input capabilities, user zoom, split-screen windows, and responsive containers are more relevant than the reported device name.

### Touch Support

Do not add an unsupported property:

```typescript
enableTouchMode: true
```

The Stock Chart handles supported pointer and touch interactions through its built-in interaction modules and browser event support.

### Mobile Simplification

On narrow layouts, consider:

- Reducing chart height carefully
- Hiding the legend
- Reducing the number of period buttons
- Disabling unnecessary indicators
- Avoiding markers on dense Line series
- Shortening title text
- Hiding secondary panes only when doing so does not mislead users
- Keeping the range selector large enough to operate by touch

## Runtime Style Updates

### Change Theme

```typescript
stockChart.theme =
    'Bootstrap5';

stockChart.refresh();
```

A theme change affects many generated elements, so use `refresh()`.

### Change Background

```typescript
stockChart.background =
    '#FFFFFF';

stockChart.dataBind();
```

### Change Chart-Area Background

```typescript
stockChart
    .chartArea
    .background =
        '#F8FAFC';

stockChart.dataBind();
```

### Change Series Color

```typescript
stockChart.series[0].fill =
    '#2563EB';

stockChart.dataBind();
```

### Change Candle Colors

```typescript
stockChart
    .series[0]
    .bullFillColor =
        '#16A34A';

stockChart
    .series[0]
    .bearFillColor =
        '#DC2626';

stockChart.dataBind();
```

### Change Title Style

```typescript
stockChart.titleStyle = {
    ...stockChart.titleStyle,
    color: '#1D4ED8',
    size: '20px'
};

stockChart.dataBind();
```

### Change Legend Visibility

```typescript
stockChart
    .legendSettings
    .visible = false;

stockChart.dataBind();
```

### Batch Related Updates

```typescript
stockChart.background =
    '#0F172A';

stockChart
    .chartArea
    .background =
        '#111827';

stockChart
    .primaryXAxis
    .labelStyle
    .color =
        '#CBD5E1';

stockChart
    .primaryYAxis
    .labelStyle
    .color =
        '#CBD5E1';

stockChart.dataBind();
```

Call `dataBind()` once after related ordinary property changes.

## Accessibility

Styling must preserve:

- Sufficient text contrast
- Distinguishable candle states
- Visible keyboard focus
- Readable tooltip text
- Distinguishable series colors
- Text alternatives for financial values
- Non-color cues where direction or status matters

Do not rely only on red and green to indicate candle behavior.

Provide a data table or summary:

```html
<details>
    <summary>
        View stock-price data
    </summary>

    <table>
        <caption>
            Daily open, high, low, and close values
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

When creating a dark theme:

- Verify axis-label contrast.
- Verify gridline visibility.
- Verify tooltip contrast.
- Verify range-selector handle contrast.
- Verify period-selector focus states.
- Verify legend text and disabled-series states.

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

    <title>Stock Chart Styling</title>

    https://cdn.syncfusion.com/ej2/34.2.2/material3.css

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F1F5F9;
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
            box-shadow:
                0 8px 24px
                rgba(15, 23, 42, 0.08);
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

        .stock-chart-toolbar button:hover {
            background: #F8FAFC;
        }

        .stock-chart-toolbar button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #style-status {
            min-height: 24px;
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
                min-height: 480px;
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
            Stock Price Appearance
        </h1>

        <p id="stock-chart-description">
            The Stock Chart uses a responsive layout,
            styled financial series, accessible labels,
            and theme-aligned controls.
        </p>

        <div class="stock-chart-toolbar">
            <button
                id="show-light-style"
                type="button"
            >
                Light Style
            </button>

            <button
                id="show-dark-style"
                type="button"
            >
                Dark Style
            </button>

            <button
                id="toggle-legend"
                type="button"
                aria-pressed="true"
            >
                Hide Legend
            </button>
        </div>

        <p
            id="style-status"
            role="status"
            aria-live="polite"
        >
            Light style is displayed.
        </p>

        <div
            id="stock-chart"
            aria-describedby="
                stock-chart-description
                style-status
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
    Crosshair,
    DateTime,
    LineSeries,
    RangeTooltip,
    StockChart,
    StockLegend,
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
    LineSeries,
    Tooltip,
    RangeTooltip,
    Crosshair,
    StockLegend
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
        background: '#FFFFFF',
        border: {
            color: '#CBD5E1',
            width: 1
        },
        palettes: [
            '#2563EB',
            '#EA580C',
            '#15803D'
        ],
        title:
            'Daily Stock Price',
        titleStyle: {
            color: '#0F172A',
            size: '18px',
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            textAlignment: 'Center'
        },
        subTitle:
            'Open, high, low, close, and closing-price trend',
        subTitleStyle: {
            color: '#475569',
            size: '12px',
            fontFamily: 'Segoe UI',
            fontWeight: '400'
        },
        chartArea: {
            background: '#F8FAFC',
            opacity: 1,
            border: {
                color: '#E2E8F0',
                width: 1
            },
            margin: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        primaryXAxis: {
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            edgeLabelPlacement: 'Shift',
            majorGridLines: {
                width: 0
            },
            lineStyle: {
                color: '#CBD5E1',
                width: 1
            },
            majorTickLines: {
                color: '#94A3B8',
                width: 1
            },
            labelStyle: {
                color: '#475569',
                size: '11px',
                fontFamily: 'Segoe UI'
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
        primaryYAxis: {
            title: 'Price (USD)',
            titleStyle: {
                color: '#334155',
                size: '13px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            },
            labelFormat: '${value}',
            majorGridLines: {
                color: '#E2E8F0',
                width: 1
            },
            lineStyle: {
                width: 0
            },
            majorTickLines: {
                width: 0
            },
            labelStyle: {
                color: '#475569',
                size: '11px',
                fontFamily: 'Segoe UI'
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
                fontFamily: 'Segoe UI',
                fontWeight: '500'
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
            padding: 12,
            background: '#FFFFFF',
            border: {
                color: '#E2E8F0',
                width: 1
            },
            textStyle: {
                color: '#334155',
                size: '12px',
                fontFamily: 'Segoe UI'
            },
            toggleVisibility: true
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
                name: 'OHLC',
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A',
                border: {
                    color: '#334155',
                    width: 0.5
                },
                animation: {
                    enable: false
                }
            },
            {
                type: 'Line',
                dataSource: stockData,
                xName: 'date',
                yName: 'close',
                name: 'Close',
                fill: '#2563EB',
                width: 2,
                opacity: 0.9,
                marker: {
                    visible: true,
                    width: 6,
                    height: 6,
                    shape: 'Circle',
                    fill: '#FFFFFF',
                    border: {
                        color: '#2563EB',
                        width: 2
                    }
                },
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
            '#style-status'
        );

const applyLightStyle =
    (): void => {
        stockChart.background =
            '#FFFFFF';

        stockChart.chartArea.background =
            '#F8FAFC';

        stockChart.titleStyle.color =
            '#0F172A';

        stockChart.subTitleStyle.color =
            '#475569';

        stockChart
            .primaryXAxis
            .labelStyle
            .color =
                '#475569';

        stockChart
            .primaryYAxis
            .labelStyle
            .color =
                '#475569';

        stockChart
            .primaryYAxis
            .majorGridLines
            .color =
                '#E2E8F0';

        stockChart
            .legendSettings
            .background =
                '#FFFFFF';

        stockChart
            .legendSettings
            .textStyle
            .color =
                '#334155';

        stockChart.dataBind();

        if (status) {
            status.textContent =
                'Light style is displayed.';
        }
    };

const applyDarkStyle =
    (): void => {
        stockChart.background =
            '#0F172A';

        stockChart.chartArea.background =
            '#111827';

        stockChart.titleStyle.color =
            '#F8FAFC';

        stockChart.subTitleStyle.color =
            '#CBD5E1';

        stockChart
            .primaryXAxis
            .labelStyle
            .color =
                '#CBD5E1';

        stockChart
            .primaryYAxis
            .labelStyle
            .color =
                '#CBD5E1';

        stockChart
            .primaryYAxis
            .titleStyle
            .color =
                '#E2E8F0';

        stockChart
            .primaryYAxis
            .majorGridLines
            .color =
                '#334155';

        stockChart
            .legendSettings
            .background =
                '#111827';

        stockChart
            .legendSettings
            .textStyle
            .color =
                '#E2E8F0';

        stockChart.dataBind();

        if (status) {
            status.textContent =
                'Dark style is displayed.';
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
    '#show-light-style',
    applyLightStyle
);

bindButton(
    '#show-dark-style',
    applyDarkStyle
);

const legendButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#toggle-legend'
        );

if (legendButton) {
    legendButton.addEventListener(
        'click',
        (): void => {
            stockChart
                .legendSettings
                .visible =
                    !stockChart
                        .legendSettings
                        .visible;

            legendButton.setAttribute(
                'aria-pressed',
                String(
                    stockChart
                        .legendSettings
                        .visible
                )
            );

            legendButton.textContent =
                stockChart
                    .legendSettings
                    .visible
                    ? 'Hide Legend'
                    : 'Show Legend';

            stockChart.dataBind();
        }
    );
}

let resizeTimer:
    number | undefined;

const updateResponsiveLayout =
    (): void => {
        const compact:
            boolean =
                window.matchMedia(
                    '(max-width: 767px)'
                ).matches;

        stockChart.height =
            compact
                ? '480px'
                : '650px';

        stockChart.refresh();
    };

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
                updateResponsiveLayout,
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

    <title>Stock Chart Styling</title>

    https://cdn.syncfusion.com/ej2/34.2.2/material3.css

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F1F5F9;
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

        @media (max-width: 767px) {
            #stock-chart {
                min-height: 480px;
            }
        }
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Stock Price Appearance
        </h1>

        <p id="stock-chart-description">
            Responsive Stock Chart with styled
            financial and closing-price series.
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
                background: '#FFFFFF',
                palettes: [
                    '#2563EB',
                    '#EA580C',
                    '#15803D'
                ],
                title:
                    'Daily Stock Price',
                titleStyle: {
                    color: '#0F172A',
                    size: '18px',
                    fontFamily:
                        'Segoe UI',
                    fontWeight: '600'
                },
                subTitle:
                    'Open, high, low, close, and trend',
                subTitleStyle: {
                    color: '#475569',
                    size: '12px',
                    fontFamily:
                        'Segoe UI'
                },
                chartArea: {
                    background: '#F8FAFC',
                    border: {
                        color: '#E2E8F0',
                        width: 1
                    }
                },
                primaryXAxis: {
                    valueType: 'DateTime',
                    labelFormat: 'MMM d',
                    edgeLabelPlacement:
                        'Shift',
                    majorGridLines: {
                        width: 0
                    },
                    labelStyle: {
                        color: '#475569',
                        size: '11px'
                    }
                },
                primaryYAxis: {
                    title: 'Price (USD)',
                    titleStyle: {
                        color: '#334155',
                        size: '13px'
                    },
                    labelFormat: '${value}',
                    majorGridLines: {
                        color: '#E2E8F0',
                        width: 1
                    },
                    lineStyle: {
                        width: 0
                    },
                    majorTickLines: {
                        width: 0
                    },
                    labelStyle: {
                        color: '#475569',
                        size: '11px'
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
                    alignment: 'Center',
                    background: '#FFFFFF',
                    border: {
                        color: '#E2E8F0',
                        width: 1
                    },
                    textStyle: {
                        color: '#334155',
                        size: '12px'
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
                        name: 'OHLC',
                        bearFillColor:
                            '#DC2626',
                        bullFillColor:
                            '#16A34A',
                        border: {
                            color: '#334155',
                            width: 0.5
                        },
                        animation: {
                            enable: false
                        }
                    },
                    {
                        type: 'Line',
                        dataSource:
                            stockData,
                        xName: 'date',
                        yName: 'close',
                        name: 'Close',
                        fill: '#2563EB',
                        width: 2,
                        marker: {
                            visible: true,
                            width: 6,
                            height: 6,
                            shape: 'Circle',
                            fill: '#FFFFFF',
                            border: {
                                color: '#2563EB',
                                width: 2
                            }
                        },
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

## CSS Customization

Prefer wrapper CSS and supported component properties.

Safe wrapper styling:

```css
.stock-chart-card {
    padding: 20px;
    border: 1px solid #CBD5E1;
    border-radius: 12px;
    background: #FFFFFF;
}
```

```css
#stock-chart {
    width: 100%;
    min-height: 650px;
}
```

Avoid relying on undocumented internal selectors such as:

```css
.e-chart-title
```

```css
.e-legend
```

```css
.e-tooltip
```

```css
.e-major-grid-line
```

These selectors may:

- Change between releases
- Affect other charts
- Be overridden by inline SVG attributes
- Break theme behavior
- Not affect exported output

Use public properties such as:

- `titleStyle`
- `legendSettings`
- `tooltip`
- `primaryXAxis`
- `primaryYAxis`
- `chartArea`
- `series`

## Theme Studio Note

Syncfusion Theme Studio can customize common EJ2 theme variables, but the referenced Theme Studio documentation states that it does not directly support data-visualization controls such as Chart, Diagram, Gauge, Range Navigator, and Maps.

For a Stock Chart:

1. Use a built-in theme as the base.
2. Load the matching consolidated stylesheet.
3. Configure Stock Chart visual properties explicitly.
4. Test dependent toolbar, range selector, calendar, and dropdown controls.
5. Validate export and print output separately.

## Best Practices

### Themes

- Validate the theme name against the installed package.
- Load the matching stylesheet.
- Test dark and light variants.
- Keep dependent Stock Chart controls visually consistent.
- Do not assume `TailwindCSS` is a valid theme value.

### Colors

- Use a restrained palette.
- Ensure adequate contrast.
- Do not rely only on red and green.
- Validate Candle color semantics.
- Use consistent colors for the same metric across dashboards.
- Avoid highly saturated palettes for dense financial data.

### Chart Area

- Use `chartArea.background` and `chartArea.border`.
- Keep background images subtle.
- Avoid decorative styling that competes with financial values.
- Keep gridlines lighter than the data series.

### Series

- Use complete financial mappings.
- Use the nested `border` model.
- Disable animation for frequent updates.
- Avoid markers on dense datasets.
- Use opacity carefully.
- Do not describe Area as automatically cumulative.

### Responsive Layout

- Use `width: '100%'`.
- Give the parent a measurable width.
- Use CSS media queries.
- Debounce manual refresh calls.
- Avoid user-agent detection.
- Do not use unsupported touch-mode properties.
- Test range handles and period buttons on narrow layouts.

### Performance

- Prefer solid or RGBA fills over many complex gradients.
- Avoid unnecessary markers and data labels.
- Limit expensive effects.
- Disable animation during real-time updates.
- Test production-scale datasets.
- Validate Stock Chart support before enabling Canvas rendering.

## Combined Mistakes and Future References

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

### Unsupported Plot Area

Avoid:

```typescript
plotAreaBackground:
    '#FFFFFF'
```

```typescript
plotArea: {
    background: '#FFFFFF'
}
```

Use:

```typescript
chartArea: {
    background: '#FFFFFF'
}
```

The Stock Chart chart-area model supports background, border, margin, opacity, width, and background-image properties.

### Incorrect Axis Title

Incorrect:

```typescript
primaryYAxis: {
    title: {
        text: 'Price'
    }
}
```

Correct:

```typescript
primaryYAxis: {
    title: 'Price'
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

### Incorrect Tooltip Background

Incorrect:

```typescript
tooltip: {
    backgroundColor:
        '#111827'
}
```

Correct:

```typescript
tooltip: {
    fill: '#111827'
}
```

### Incorrect Series Border

Incorrect:

```typescript
borderWidth: 1,
borderColor: '#334155'
```

Correct:

```typescript
border: {
    width: 1,
    color: '#334155'
}
```

### Unsupported Canvas Property

Avoid:

```typescript
enableCanvasRendering: true
```

unless the installed Stock Chart model explicitly supports it.

### Unsupported Touch Mode

Avoid:

```typescript
enableTouchMode: true
```

unless validated against the installed Stock Chart API.

### Incorrect Mobile Legend Property

Incorrect:

```typescript
legend: {
    visible: false
}
```

Correct:

```typescript
legendSettings: {
    visible: false
}
```

### User-Agent Detection

Avoid:

```typescript
const isMobile =
    /Android|iPhone/i
        .test(
            navigator.userAgent
        );
```

Prefer:

```typescript
const compact =
    window.matchMedia(
        '(max-width: 767px)'
    ).matches;
```

### Unverified Internal CSS

Avoid depending on:

```css
.e-chart-title
```

```css
.e-tooltip
```

Use supported component settings.

### Styling Validation Checklist

Before generating a Stock Chart styling example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. Dates are JavaScript `Date` objects.
4. `DateTime` is imported and injected.
5. The configured series modules are imported and injected.
6. Candle data maps `xName`.
7. Candle data maps `open`.
8. Candle data maps `high`.
9. Candle data maps `low`.
10. Candle data maps `close`.
11. Line, Area, and Spline series map `yName`.
12. The theme value exists in the installed package.
13. The matching theme stylesheet is loaded.
14. `palettes` is used instead of `palette`.
15. Root background uses `background`.
16. Root border uses `border`.
17. The plot area uses `chartArea`.
18. Unsupported `plotArea` settings are excluded.
19. Title appearance uses `titleStyle`.
20. Subtitle appearance uses `subTitleStyle`.
21. Axis titles use strings.
22. Axis-title appearance uses `titleStyle`.
23. Axis-label appearance uses `labelStyle`.
24. Font size uses `size`.
25. Candle colors are described cautiously.
26. Series border uses a nested `border` object.
27. Line and Area colors use `fill`.
28. Width uses the supported `width` property.
29. Marker dimensions use `width` and `height`.
30. Legend uses `legendSettings`.
31. Legend usage imports and injects `StockLegend`.
32. Tooltip background uses `fill`.
33. Tooltip usage imports and injects `Tooltip`.
34. Crosshair usage imports and injects `Crosshair`.
35. Crosshair styling is validated.
36. Gradient references are tested in rendering and export.
37. Unsupported Canvas settings are excluded.
38. Unsupported touch-mode settings are excluded.
39. Responsive width has a measurable parent.
40. Resize handling is debounced.
41. User-agent detection is avoided.
42. Internal generated CSS selectors are avoided.
43. Contrast is validated.
44. Financial meaning is not conveyed only through color.
45. Ordinary style updates use `dataBind()`.
46. Theme and dimension changes use `refresh()` when required.
47. The host exists before `appendTo()`.
48. The host has sufficient width and height.
49. TypeScript and JavaScript examples are complete and runnable.
50. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.