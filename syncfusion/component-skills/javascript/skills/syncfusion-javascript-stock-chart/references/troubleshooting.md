# Troubleshooting and Optimization

## Overview

Use a deterministic troubleshooting sequence when an EJ2 Stock Chart does not render, displays no data, omits a feature, or performs poorly:

1. Verify the host element and its dimensions.
2. Check the browser console and network requests.
3. Confirm that the matching EJ2 stylesheet is loaded.
4. Validate module imports and injection.
5. Validate the series type and field mappings.
6. Validate dates and numeric values.
7. Reduce the configuration to a minimal working example.
8. Restore optional features one at a time.
9. Profile with production-scale data.
10. Clean up timers, network requests, streams, and component instances.

Current Syncfusion getting-started guidance targets modern Chrome, Edge, Firefox, and Safari browsers. Validate exact browser-version requirements against the EJ2 release used by the application.

## Table of Contents

- #diagnostic-workflow
- #chart-not-rendering
- #data-not-displaying
- #axis-labels-not-showing
- #missing-features
- #hidden-container-issues
- #remote-data-failures
- #performance-optimization
- #memory-and-lifecycle-management
- #browser-compatibility
- #debugging
- #error-handling
- #complete-typescript-diagnostic-example
- #complete-javascript-diagnostic-example
- #best-practices
- #combined-mistakes-and-future-references

## Diagnostic Workflow

Start with a minimal Stock Chart before investigating advanced features.

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
        width: '100%',
        height: '500px',
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
                close: 'close'
            }
        ],
        indicatorType: [],
        trendlineType: [],
        exportType: []
    });

stockChart.appendTo('#stock-chart');
```

If this works, restore features one at a time:

1. Tooltip
2. Crosshair
3. Range tooltip
4. Legend
5. Additional series
6. Indicators
7. Trendlines
8. Export
9. Annotations
10. Remote or real-time data

This isolates the configuration or module causing the failure.

## Chart Not Rendering

### Verify the Host Exists

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
```

Render only after the host exists:

```typescript
stockChart.appendTo(host);
```

### Verify the Selector

HTML:

```html
<div id="stock-chart"></div>
```

TypeScript:

```typescript
stockChart.appendTo(
    '#stock-chart'
);
```

These IDs must match exactly.

### Verify Dimensions

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

```typescript
const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '600px'
    });
```

A percentage width requires a parent with a measurable width.

Inspect the host:

```typescript
const rectangle:
    DOMRect =
        host.getBoundingClientRect();

console.log({
    width: rectangle.width,
    height: rectangle.height,
    display:
        getComputedStyle(host)
            .display,
    visibility:
        getComputedStyle(host)
            .visibility
});
```

A zero width or hidden parent can prevent a correct initial layout.

### Verify TypeScript Module Injection

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
```

Inject the module corresponding to every feature and series used.

Examples:

```typescript
StockChart.Inject(
    LineSeries
);
```

```typescript
StockChart.Inject(
    Tooltip
);
```

```typescript
StockChart.Inject(
    Crosshair
);
```

```typescript
StockChart.Inject(
    SmaIndicator
);
```

Do not inject unrelated modules merely to suppress an error. Match modules to the actual configuration.

### Verify JavaScript Dependencies

Prefer the complete global bundle for a simple CDN setup:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Check the global constructor before initialization:

```javascript
if (
    !window.ej ||
    !ej.charts ||
    !ej.charts.StockChart
) {
    throw new Error(
        'The EJ2 Stock Chart script is unavailable.'
    );
}
```

Do not leave generated anchor markup inside `src` or `href` attributes.

### Verify Stylesheet Loading

Inspect the Network panel for a successful stylesheet response.

The selected component theme should match the loaded stylesheet:

```typescript
theme: 'Bootstrap5'
```

```html
https://cdn.syncfusion.com/ej2/34.2.2/material3.css
```

### Inspect Console Errors

Common errors include:

- Module not injected
- Constructor unavailable
- Invalid property value
- Host element missing
- Undefined datasource
- Incorrect event argument usage
- Accessing a destroyed component
- Calling a method before initialization

Fix the first console error before investigating later errors because subsequent failures can be secondary effects.

## Data Not Displaying

### Verify the Collection

```typescript
console.log({
    isArray:
        Array.isArray(stockData),
    count:
        Array.isArray(stockData)
            ? stockData.length
            : 0,
    first:
        stockData[0]
});
```

An empty collection is a valid no-data state. Configure `noDataTemplate` instead of treating it as an initialization failure.

### Validate Candle Mappings

Incorrect:

```typescript
series: [
    {
        type: 'Candle',
        dataSource: stockData,
        xName: 'date',
        yName: 'close'
    }
]
```

Correct:

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
        volume: 'volume'
    }
]
```

`yName` is appropriate for a single-value series:

```typescript
{
    type: 'Line',
    dataSource: stockData,
    xName: 'date',
    yName: 'close'
}
```

### Validate Hilo Mappings

```typescript
{
    type: 'Hilo',
    dataSource: stockData,
    xName: 'date',
    high: 'high',
    low: 'low'
}
```

### Validate HiloOpenClose Mappings

```typescript
{
    type: 'HiloOpenClose',
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close'
}
```

### Validate Dates

```typescript
const isValidDate = (
    value: unknown
): value is Date => {
    return (
        value instanceof Date &&
        Number.isFinite(
            value.getTime()
        )
    );
};
```

Convert remote date strings:

```typescript
const date: Date =
    new Date(apiRecord.date);
```

Do not assume a parsed JSON date is already a `Date`:

```typescript
JSON.parse(response).date
```

JSON date values are strings.

### Validate Numeric Values

```typescript
const isFiniteNumber = (
    value: unknown
): value is number => {
    return (
        typeof value === 'number' &&
        Number.isFinite(value)
    );
};
```

Validate a candle:

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

```typescript
const isValidStockData = (
    item: StockData
): boolean => {
    return (
        isValidDate(item.date) &&
        isFiniteNumber(item.open) &&
        isFiniteNumber(item.high) &&
        isFiniteNumber(item.low) &&
        isFiniteNumber(item.close) &&
        item.high >= item.low &&
        item.high >= item.open &&
        item.high >= item.close &&
        item.low <= item.open &&
        item.low <= item.close &&
        (
            item.volume === undefined ||
            isFiniteNumber(item.volume)
        )
    );
};
```

### Sort Chronologically

```typescript
const normalizedData:
    StockData[] =
        stockData
            .filter(
                isValidStockData
            )
            .sort(
                (
                    first:
                        StockData,
                    second:
                        StockData
                ): number => {
                    return (
                        first.date
                            .getTime() -
                        second.date
                            .getTime()
                    );
                }
            );
```

### Remove Duplicate Timestamps

```typescript
const removeDuplicates = (
    data: StockData[]
): StockData[] => {
    const byTimestamp:
        Map<number, StockData> =
            new Map<
                number,
                StockData
            >();

    data.forEach(
        (
            item: StockData
        ): void => {
            byTimestamp.set(
                item.date.getTime(),
                item
            );
        }
    );

    return Array
        .from(
            byTimestamp.values()
        )
        .sort(
            (
                first: StockData,
                second: StockData
            ): number => {
                return (
                    first.date.getTime() -
                    second.date.getTime()
                );
            }
        );
};
```

### Verify DateTime Axis

```typescript
primaryXAxis: {
    valueType: 'DateTime'
}
```

TypeScript also requires:

```typescript
StockChart.Inject(
    DateTime
);
```

## Axis Labels Not Showing

### labelFormat Is Optional

A DateTime axis can generate labels without an explicit `labelFormat`.

Use `labelFormat` only when a specific output is required:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'MMM d'
}
```

### Check Label Contrast

Light background:

```typescript
primaryXAxis: {
    labelStyle: {
        color: '#475569',
        size: '11px'
    }
}
```

Dark background:

```typescript
primaryXAxis: {
    labelStyle: {
        color: '#E2E8F0',
        size: '11px'
    }
}
```

Labels may exist but appear missing when their color is too close to the background.

### Handle Overlap

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelIntersectAction: 'Hide',
    edgeLabelPlacement: 'Shift'
}
```

Or:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelIntersectAction:
        'Rotate45'
}
```

Do not use this as a general DateTime-axis fix:

```typescript
labelPlacement:
    'BetweenTicks'
```

That placement is primarily relevant to Category-axis behavior.

### Avoid Dense Fixed Intervals

Potentially problematic:

```typescript
primaryXAxis: {
    intervalType: 'Days',
    interval: 1
}
```

for several years of data.

Prefer automatic intervals:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    intervalType: 'Auto'
}
```

### Verify Margins and Height

```typescript
height: '600px'
```

```typescript
chartArea: {
    margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
}
```

Do not add excessive margins that leave too little plot area.

## Missing Features

### Tooltip

```typescript
import {
    Tooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Tooltip
);
```

```typescript
tooltip: {
    enable: true
}
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

```typescript
crosshair: {
    enable: true,
    lineType: 'Both'
}
```

Axis labels:

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

### Range Tooltip

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip
);
```

`RangeTooltip` supports the range navigator. It does not replace the main `Tooltip` module.

### Legend

Use:

```typescript
legendSettings: {
    visible: true
}
```

Inject:

```typescript
import {
    StockLegend
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    StockLegend
);
```

Do not use:

```typescript
legend: {
    visible: true
}
```

### Export

```typescript
import {
    Export
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    Export
);
```

```typescript
exportType: [
    'PNG',
    'JPEG',
    'SVG',
    'PDF'
]
```

### Indicators

Each indicator requires:

1. Its corresponding module
2. A valid source series
3. A matching `seriesName`
4. Correct data mappings
5. Enough records for its period

```typescript
series: [
    {
        type: 'Candle',
        name: 'Price',
        dataSource: stockData,
        xName: 'date',
        open: 'open',
        high: 'high',
        low: 'low',
        close: 'close',
        volume: 'volume'
    }
],
indicators: [
    {
        type: 'Sma',
        seriesName: 'Price',
        field: 'Close',
        period: 20
    }
]
```

```typescript
StockChart.Inject(
    SmaIndicator
);
```

## Hidden Container Issues

A Stock Chart initialized inside a hidden tab, dialog, accordion, or inactive panel may measure a zero or incomplete layout.

Refresh after the parent becomes visible:

```typescript
const showChartPanel =
    (): void => {
        chartPanel.hidden = false;

        window.requestAnimationFrame(
            (): void => {
                stockChart.refresh();
            }
        );
    };
```

If the parent animates open, refresh after the transition completes:

```typescript
chartPanel.addEventListener(
    'transitionend',
    (): void => {
        stockChart.refresh();
    },
    {
        once: true
    }
);
```

Do not call `refresh()` continuously during every animation frame.

## Remote Data Failures

### Validate HTTP Status

```typescript
const response: Response =
    await fetch(
        '/api/stock-data',
        {
            signal
        }
    );

if (!response.ok) {
    throw new Error(
        `Request failed with ` +
        `status ${response.status}.`
    );
}
```

### Validate Response Shape

```typescript
const payload: unknown =
    await response.json();

if (!Array.isArray(payload)) {
    throw new Error(
        'The stock response must be an array.'
    );
}
```

### Normalize Records

```typescript
interface ApiStockData {
    date: string;
    open: number | string;
    high: number | string;
    low: number | string;
    close: number | string;
    volume?: number | string;
}
```

```typescript
const normalizeApiRecord = (
    item: ApiStockData
): StockData => {
    return {
        date:
            new Date(item.date),
        open:
            Number(item.open),
        high:
            Number(item.high),
        low:
            Number(item.low),
        close:
            Number(item.close),
        volume:
            item.volume === undefined
                ? undefined
                : Number(
                    item.volume
                )
    };
};
```

### Cancel Stale Requests

```typescript
let requestController:
    AbortController | null =
        null;
```

```typescript
const loadData =
    async (): Promise<void> => {
        requestController?.abort();

        requestController =
            new AbortController();

        try {
            const data =
                await requestStockData(
                    requestController
                        .signal
                );

            stockChart
                .series[0]
                .dataSource =
                    data;

            stockChart.dataBind();
        } catch (error: unknown) {
            if (
                error instanceof DOMException &&
                error.name ===
                    'AbortError'
            ) {
                return;
            }

            reportError(
                'Unable to load stock data.',
                error
            );
        }
    };
```

### Check Network Conditions

In DevTools, verify:

- Request URL
- HTTP status
- CORS headers
- Authentication
- Response payload
- Content type
- Request cancellation
- Cache behavior
- Date format
- Numeric precision

## Performance Optimization

Do not begin with arbitrary point limits. Profile the actual application with:

- Production data volume
- Enabled indicators
- Number of panes
- Range navigator
- Tooltips and crosshair
- Browser and device targets
- Update frequency

## Time-Based Aggregation

Aggregate OHLC records using timestamp buckets rather than fixed record counts.

```typescript
const aggregateCandles = (
    source: StockData[],
    intervalMs: number
): StockData[] => {
    if (
        !Number.isFinite(intervalMs) ||
        intervalMs <= 0
    ) {
        throw new Error(
            'The aggregation interval must be positive.'
        );
    }

    const buckets:
        Map<number, StockData[]> =
            new Map<
                number,
                StockData[]
            >();

    source
        .filter(isValidStockData)
        .sort(
            (
                first: StockData,
                second: StockData
            ): number => {
                return (
                    first.date.getTime() -
                    second.date.getTime()
                );
            }
        )
        .forEach(
            (
                item: StockData
            ): void => {
                const bucket:
                    number =
                        Math.floor(
                            item.date
                                .getTime() /
                            intervalMs
                        ) *
                        intervalMs;

                const current:
                    StockData[] =
                        buckets.get(
                            bucket
                        ) || [];

                current.push(item);

                buckets.set(
                    bucket,
                    current
                );
            }
        );

    return Array
        .from(
            buckets.entries()
        )
        .sort(
            (
                first,
                second
            ): number => {
                return (
                    first[0] -
                    second[0]
                );
            }
        )
        .map(
            (
                [
                    bucket,
                    records
                ]
            ): StockData => {
                const first:
                    StockData =
                        records[0];

                const last:
                    StockData =
                        records[
                            records.length -
                            1
                        ];

                return {
                    date:
                        new Date(bucket),
                    open:
                        first.open,
                    high:
                        Math.max(
                            ...records.map(
                                (
                                    record:
                                        StockData
                                ): number => {
                                    return record.high;
                                }
                            )
                        ),
                    low:
                        Math.min(
                            ...records.map(
                                (
                                    record:
                                        StockData
                                ): number => {
                                    return record.low;
                                }
                            )
                        ),
                    close:
                        last.close,
                    volume:
                        records.reduce(
                            (
                                total:
                                    number,
                                record:
                                    StockData
                            ): number => {
                                return (
                                    total +
                                    (
                                        record.volume ||
                                        0
                                    )
                                );
                            },
                            0
                        )
                };
            }
        );
};
```

Create hourly candles:

```typescript
const hourlyData:
    StockData[] =
        aggregateCandles(
            minuteData,
            60 * 60 * 1000
        );
```

Fixed-record aggregation is unsafe when:

- Records are missing
- Trading sessions close
- Timestamps are irregular
- Data contains gaps
- Multiple markets use different sessions

## Bounded Retention

For a real-time view:

```typescript
const maximumPoints:
    number = 5000;
```

```typescript
currentData = [
    ...currentData,
    ...newCandles
].slice(
    -maximumPoints
);
```

```typescript
stockChart
    .series[0]
    .dataSource =
        currentData;

stockChart.dataBind();
```

Use a limit based on actual device and feature performance rather than treating 1,000 or 5,000 as universal thresholds.

## Batch Updates

Inefficient:

```typescript
for (
    const item of incomingData
) {
    currentData.push(item);

    stockChart
        .series[0]
        .dataSource =
            currentData;

    stockChart.dataBind();
}
```

Preferred:

```typescript
currentData = [
    ...currentData,
    ...incomingData
];

stockChart
    .series[0]
    .dataSource =
        currentData;

stockChart.dataBind();
```

### Schedule Frequent Updates

```typescript
let updateScheduled:
    boolean = false;
```

```typescript
const scheduleUpdate =
    (): void => {
        if (updateScheduled) {
            return;
        }

        updateScheduled = true;

        window.setTimeout(
            (): void => {
                updateScheduled =
                    false;

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

## Disable Expensive Features

Disable only features that the user does not need.

```typescript
tooltip: {
    enable: false
},
crosshair: {
    enable: false
},
legendSettings: {
    visible: false
},
series: [
    {
        type: 'Candle',
        animation: {
            enable: false
        }
    }
]
```

Animation is configured on the series:

```typescript
series: [
    {
        animation: {
            enable: false
        }
    }
]
```

Do not assume this root property exists:

```typescript
animation: {
    enable: false
}
```

## Indicators and Trendlines

Each indicator can add calculation and rendering cost.

For real-time data:

- Enable only required indicators
- Use the minimum necessary number of panes
- Batch datasource updates
- Disable indicator animation
- Avoid full refresh after every tick
- Aggregate data before binding
- Consider calculating complex indicators outside the UI thread when appropriate

## Server-Side Windowing

For large historical datasets:

1. Request a specific symbol and date range.
2. Aggregate on the server according to the required resolution.
3. Cache loaded intervals.
4. Cancel stale requests.
5. Normalize and validate records.
6. Update the public series datasource.
7. Preserve enough historical context for the range navigator.

Do not claim Stock Chart virtual scrolling through:

```typescript
enableScrollbar: true
```

or:

```typescript
scrollbarSettings: {
    size: '20px'
}
```

without validating those properties against the installed Stock Chart model.

Do not enable:

```typescript
enableCanvasRendering: true
```

as a Stock Chart optimization unless the installed `StockChartModel` explicitly exposes it.

## Resize Optimization

Avoid refreshing on every raw resize event.

```typescript
let resizeTimer:
    number | undefined;
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
                },
                150
            );
    }
);
```

Use `ResizeObserver` when the Stock Chart responds to a resizable container rather than only the browser window:

```typescript
const resizeObserver:
    ResizeObserver =
        new ResizeObserver(
            (): void => {
                scheduleResizeRefresh();
            }
        );

resizeObserver.observe(
    host
);
```

Guard against refresh loops when observing an element whose size changes because of the refresh itself.

## Memory and Lifecycle Management

### Destroy Correctly

```typescript
stockChart.destroy();
```

Do not access the Stock Chart after destroying it.

Incorrect:

```typescript
stockChart.destroy();

stockChart
    .series[0]
    .dataSource = [];
```

If data must be released first:

```typescript
stockChart
    .series[0]
    .dataSource = [];

stockChart.destroy();
```

Then release application references:

```typescript
currentData = [];
```

### Cleanup Timers

```typescript
if (
    updateTimer !== undefined
) {
    window.clearTimeout(
        updateTimer
    );
}
```

### Cleanup Intervals

```typescript
window.clearInterval(
    pollingInterval
);
```

### Abort Requests

```typescript
requestController?.abort();
```

### Close WebSockets

```typescript
if (
    socket.readyState ===
        WebSocket.OPEN ||
    socket.readyState ===
        WebSocket.CONNECTING
) {
    socket.close();
}
```

### Disconnect Observers

```typescript
resizeObserver.disconnect();
```

### Remove Event Listeners

Store named handlers when they must later be removed:

```typescript
const handleResize =
    (): void => {
        scheduleResizeRefresh();
    };

window.addEventListener(
    'resize',
    handleResize
);
```

Cleanup:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);
```

## Browser Compatibility

Current Syncfusion Stock Chart getting-started guidance identifies modern Chrome, Edge, Firefox, and Safari as target browsers.

Do not hardcode browser-version claims such as:

```text
Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
IE 11
```

unless those versions are verified against:

- The installed EJ2 release
- The application’s JavaScript target
- The bundler output
- The required browser APIs
- The organization’s support policy

Do not recommend IE 11 polyfills automatically. IE 11 is obsolete, and modern EJ2 releases and application dependencies may not support it.

Avoid obsolete combinations such as:

```html
@babel/polyfill
```

and:

```html
core-js 2
```

without a validated legacy-browser build strategy.

### Browser Testing Matrix

Test:

- Current stable Chrome
- Current stable Edge
- Current stable Firefox
- Current stable Safari
- iOS Safari if touch support matters
- Android Chrome if touch support matters
- Embedded WebView when the application uses one

Validate:

- Initial rendering
- Range handles
- Period selector
- Tooltip
- Crosshair
- Export
- Print
- Touch interactions
- Resize behavior
- Date localization
- High-DPI displays
- Dark mode if provided

### Feature Detection

Do not treat these as Stock Chart prerequisites:

```typescript
requestAnimationFrame
```

```typescript
localStorage
```

```typescript
Intl
```

Check a browser API only when the application explicitly uses it.

For example, check `ResizeObserver` only when using it:

```typescript
if (
    'ResizeObserver' in window
) {
    // Use the observer.
} else {
    // Use a debounced resize listener.
}
```

## Debugging

## Verified Lifecycle Events

Use `load` for pre-render investigation:

```typescript
load: (): void => {
    console.log(
        'Stock Chart loading.'
    );
}
```

Use `loaded` for post-render measurement:

```typescript
loaded: (): void => {
    console.log(
        'Stock Chart rendered.'
    );
}
```

The Stock Chart API also exposes root events such as `axisLabelRender`, `beforeExport`, `beforeIndicatorChange`, and `crosshairLabelRender`.

Do not advertise unverified events such as:

```typescript
chartRender
```

```typescript
seriesRender
```

```typescript
pointRender
```

without confirming them in the installed `StockChartModel`.

## Measure Initialization

```typescript
const initializationStart:
    number =
        performance.now();
```

```typescript
const stockChart: StockChart =
    new StockChart({
        loaded: (): void => {
            const duration:
                number =
                    performance.now() -
                    initializationStart;

            console.log(
                `Stock Chart rendered in ` +
                `${duration.toFixed(1)} ms.`
            );
        }
    });
```

This measures until the Stock Chart `loaded` event rather than only measuring constructor execution.

## Measure Data Updates

```typescript
let updateStart:
    number = 0;
```

```typescript
const updateData = (
    newData: StockData[]
): void => {
    updateStart =
        performance.now();

    stockChart
        .series[0]
        .dataSource =
            newData;

    stockChart.dataBind();
};
```

Use `loaded` to report the duration:

```typescript
loaded: (): void => {
    if (updateStart === 0) {
        return;
    }

    const duration:
        number =
            performance.now() -
            updateStart;

    console.log(
        `Update rendered in ` +
        `${duration.toFixed(1)} ms.`
    );

    updateStart = 0;
}
```

Be aware that `loaded` can run for initial and subsequent renders. Track the operation being measured.

## Export Measurement

Do not use:

```typescript
console.time(
    'Export'
);

stockChart.export(
    'PNG',
    'stock-chart'
);

console.timeEnd(
    'Export'
);
```

This records only synchronous invocation time unless the export API provides a verified completion callback or Promise.

Use `beforeExport` to record that preparation began:

```typescript
beforeExport: (): void => {
    console.log(
        'Export preparation started.'
    );
}
```

Do not claim successful export completion without a verified completion mechanism.

## Safe State Inspection

Inspect documented public properties:

```typescript
console.log({
    width:
        stockChart.width,
    height:
        stockChart.height,
    xAxisType:
        stockChart
            .primaryXAxis
            .valueType,
    seriesCount:
        stockChart.series.length,
    firstSeriesType:
        stockChart
            .series[0]
            ?.type
});
```

Safely inspect data:

```typescript
const dataSource:
    unknown =
        stockChart
            .series[0]
            ?.dataSource;

console.log({
    isArray:
        Array.isArray(
            dataSource
        ),
    count:
        Array.isArray(
            dataSource
        )
            ? dataSource.length
            : undefined
});
```

Avoid depending on internal properties such as:

```typescript
visibleSeries
```

unless they are explicitly documented as public API in the target version.

## Configuration Logging

Log a small diagnostic summary rather than the entire component instance:

```typescript
const logConfiguration =
    (
        chart: StockChart
    ): void => {
        console.log({
            dimensions: {
                width:
                    chart.width,
                height:
                    chart.height
            },
            xAxis: {
                valueType:
                    chart
                        .primaryXAxis
                        .valueType
            },
            series:
                chart.series.map(
                    (
                        series
                    ) => {
                        return {
                            type:
                                series.type,
                            xName:
                                series.xName,
                            yName:
                                series.yName,
                            open:
                                series.open,
                            high:
                                series.high,
                            low:
                                series.low,
                            close:
                                series.close,
                            count:
                                Array.isArray(
                                    series
                                        .dataSource
                                )
                                    ? series
                                        .dataSource
                                        .length
                                    : undefined
                        };
                    }
                )
        });
    };
```

Do not log confidential financial records, authentication tokens, personal data, or full remote responses in production.

## Browser DevTools

### Console

Use it to inspect:

- First error
- Module-injection errors
- Invalid property warnings
- Failed date conversion
- Undefined datasource fields
- Unhandled Promise rejections

### Network

Use it to inspect:

- CDN responses
- API status
- CORS
- Response size
- Request waterfall
- Cache behavior
- Aborted requests
- Download failures

### Performance

Profile:

- Initial render
- Range dragging
- Tooltip movement
- Crosshair movement
- Real-time data updates
- Indicator recalculation
- Window resizing

### Memory

Check for:

- Detached Stock Chart hosts
- Unclosed WebSockets
- Repeating timers
- Retained large arrays
- Multiple component instances
- Undisconnected observers

### Elements

Use the inspector to verify:

- Host dimensions
- Generated SVG
- Visibility
- Clipping
- Theme styles
- Parent overflow
- Zero-size ancestors

Do not build production logic around generated SVG IDs or internal class names.

## Error Handling

### User-Facing Status

```html
<p
    id="stock-chart-status"
    role="status"
    aria-live="polite"
></p>
```

```typescript
const setStatus = (
    message: string
): void => {
    const status:
        HTMLElement | null =
            document.querySelector(
                '#stock-chart-status'
            );

    if (status) {
        status.textContent =
            message;
    }
};
```

### Safe Initialization

```typescript
try {
    if (!host) {
        throw new Error(
            'The Stock Chart host is missing.'
        );
    }

    const validatedData:
        StockData[] =
            stockData.filter(
                isValidStockData
            );

    stockChart.appendTo(host);

    setStatus(
        validatedData.length === 0
            ? 'No stock data is available.'
            : `${validatedData.length} records loaded.`
    );
} catch (error: unknown) {
    console.error(
        'Stock Chart initialization failed.',
        error
    );

    setStatus(
        'The Stock Chart could not be displayed.'
    );
}
```

Do not display raw internal exceptions to users.

### Empty Data

Empty data is valid:

```typescript
series: [
    {
        dataSource: []
    }
],
noDataTemplate:
    '#stock-no-data-template'
```

HTML:

```html
<div
    id="stock-no-data-template"
    style="display: none;"
>
    <p>
        No stock data is available.
    </p>
</div>
```

### Single Record

A single valid financial record is not necessarily an error, although trend and indicator features may have too little data to produce meaningful output.

### Invalid Record Reporting

```typescript
const invalidRecords:
    StockData[] =
        stockData.filter(
            (
                item:
                    StockData
            ): boolean => {
                return (
                    !isValidStockData(
                        item
                    )
                );
            }
        );

if (
    invalidRecords.length > 0
) {
    console.warn(
        `${invalidRecords.length} ` +
        `invalid stock records ` +
        `were excluded.`
    );
}
```

Avoid logging complete sensitive records.

## Complete TypeScript Diagnostic Example

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

    <title>Stock Chart Diagnostics</title>

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

        .diagnostic-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
        }

        .diagnostic-controls button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .diagnostic-controls button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #stock-chart-status {
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
            Stock Chart Diagnostics
        </h1>

        <p id="stock-chart-description">
            This sample validates OHLC records,
            reports render duration, and demonstrates
            safe data updates and lifecycle cleanup.
        </p>

        <div class="diagnostic-controls">
            <button
                id="reload-data"
                type="button"
            >
                Restore Data
            </button>

            <button
                id="clear-data"
                type="button"
            >
                Clear Data
            </button>

            <button
                id="log-state"
                type="button"
            >
                Log Public State
            </button>
        </div>

        <p
            id="stock-chart-status"
            role="status"
            aria-live="polite"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="
                stock-chart-description
                stock-chart-status
            "
        ></div>

        <div
            id="stock-no-data-template"
            style="display: none;"
        >
            <p>
                No stock data is available.
            </p>
        </div>
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
    volume?: number;
}

StockChart.Inject(
    DateTime,
    CandleSeries,
    Tooltip,
    Crosshair,
    RangeTooltip
);

const sourceData: StockData[] = [
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

const isFiniteNumber = (
    value: unknown
): value is number => {
    return (
        typeof value === 'number' &&
        Number.isFinite(value)
    );
};

const isValidStockData = (
    item: StockData
): boolean => {
    return (
        item.date instanceof Date &&
        Number.isFinite(
            item.date.getTime()
        ) &&
        isFiniteNumber(item.open) &&
        isFiniteNumber(item.high) &&
        isFiniteNumber(item.low) &&
        isFiniteNumber(item.close) &&
        item.high >= item.low &&
        item.high >= item.open &&
        item.high >= item.close &&
        item.low <= item.open &&
        item.low <= item.close &&
        (
            item.volume === undefined ||
            isFiniteNumber(
                item.volume
            )
        )
    );
};

const normalizeData = (
    data: StockData[]
): StockData[] => {
    return data
        .filter(isValidStockData)
        .sort(
            (
                first: StockData,
                second: StockData
            ): number => {
                return (
                    first.date.getTime() -
                    second.date.getTime()
                );
            }
        );
};

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

const status:
    HTMLElement | null =
        document.querySelector(
            '#stock-chart-status'
        );

const setStatus = (
    message: string
): void => {
    if (status) {
        status.textContent =
            message;
    }
};

let currentData:
    StockData[] =
        normalizeData([
            ...sourceData
        ]);

let operationStart:
    number =
        performance.now();

let operationName:
    string =
        'Initial render';

const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '650px',
        theme: 'Bootstrap5',
        title:
            'Diagnostic Stock Chart',
        primaryXAxis: {
            valueType: 'DateTime',
            intervalType: 'Auto',
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
        noDataTemplate:
            '#stock-no-data-template',
        load: (): void => {
            console.log(
                'Stock Chart loading.'
            );
        },
        loaded: (): void => {
            const duration:
                number =
                    performance.now() -
                    operationStart;

            const message:
                string =
                    `${operationName} completed ` +
                    `in ${duration.toFixed(1)} ms.`;

            console.log(message);
            setStatus(message);

            operationName =
                'Stock Chart render';

            operationStart =
                performance.now();
        },
        series: [
            {
                type: 'Candle',
                dataSource: currentData,
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

const beginOperation = (
    name: string
): void => {
    operationName = name;
    operationStart =
        performance.now();
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
    '#reload-data',
    (): void => {
        beginOperation(
            'Data restore'
        );

        currentData =
            normalizeData([
                ...sourceData
            ]);

        stockChart
            .series[0]
            .dataSource =
                currentData;

        stockChart.dataBind();
    }
);

bindButton(
    '#clear-data',
    (): void => {
        beginOperation(
            'Data clear'
        );

        currentData = [];

        stockChart
            .series[0]
            .dataSource = [];

        stockChart.dataBind();
    }
);

bindButton(
    '#log-state',
    (): void => {
        const dataSource:
            unknown =
                stockChart
                    .series[0]
                    ?.dataSource;

        console.log({
            dimensions: {
                width:
                    stockChart.width,
                height:
                    stockChart.height
            },
            host: {
                width:
                    host
                        .getBoundingClientRect()
                        .width,
                height:
                    host
                        .getBoundingClientRect()
                        .height
            },
            xAxisType:
                stockChart
                    .primaryXAxis
                    .valueType,
            seriesCount:
                stockChart
                    .series
                    .length,
            firstSeriesType:
                stockChart
                    .series[0]
                    ?.type,
            dataCount:
                Array.isArray(
                    dataSource
                )
                    ? dataSource.length
                    : undefined
        });

        setStatus(
            'Public Stock Chart state was written to the console.'
        );
    }
);

let resizeTimer:
    number | undefined;

const handleResize =
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

                    beginOperation(
                        'Responsive resize'
                    );

                    stockChart.height =
                        compact
                            ? '480px'
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

const cleanup = (): void => {
    window.removeEventListener(
        'resize',
        handleResize
    );

    if (
        resizeTimer !== undefined
    ) {
        window.clearTimeout(
            resizeTimer
        );
    }

    currentData = [];
    stockChart.destroy();
};

window.addEventListener(
    'beforeunload',
    cleanup,
    {
        once: true
    }
);
```

## Complete JavaScript Diagnostic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Stock Chart Diagnostics</title>

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
            Stock Chart Diagnostics
        </h1>

        <p id="stock-chart-description">
            Minimal diagnostic example with complete
            OHLC field mappings.
        </p>

        <p
            id="stock-chart-status"
            role="status"
            aria-live="polite"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="
                stock-chart-description
                stock-chart-status
            "
        ></div>
    </main>

    <script>
        if (
            !window.ej ||
            !ej.charts ||
            !ej.charts.StockChart
        ) {
            throw new Error(
                'The EJ2 Stock Chart script is unavailable.'
            );
        }

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
            }
        ];

        var start =
            performance.now();

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '650px',
                theme: 'Bootstrap5',
                title:
                    'Diagnostic Stock Chart',
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
                tooltip: {
                    enable: true,
                    shared: true
                },
                crosshair: {
                    enable: true,
                    lineType: 'Both'
                },
                loaded:
                    function () {
                        var duration =
                            performance.now() -
                            start;

                        document
                            .getElementById(
                                'stock-chart-status'
                            )
                            .textContent =
                                'Stock Chart rendered in ' +
                                duration.toFixed(1) +
                                ' ms.';
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

        stockChart.appendTo(
            '#stock-chart'
        );
    </script>
</body>
</html>
```

## Best Practices

### Rendering

- Confirm that the host exists.
- Confirm that the host and parent have nonzero dimensions.
- Load the matching stylesheet.
- Import and inject only required modules.
- Start with a minimal Stock Chart.
- Restore optional features incrementally.
- Refresh after a hidden parent becomes visible.

### Data

- Map all financial fields.
- Convert remote dates to `Date`.
- Convert numeric strings to numbers.
- Reject nonfinite values.
- Validate OHLC relationships.
- Sort chronologically.
- Remove duplicate timestamps.
- Treat empty data as a supported state.

### Performance

- Aggregate by timestamps.
- Batch updates.
- Bound retained data.
- Disable animation where appropriate.
- Reduce unnecessary indicators and panes.
- Debounce resize handling.
- Cancel stale requests.
- Profile rather than using universal point thresholds.
- Do not claim unsupported virtual scrolling or Canvas settings.

### Debugging

- Fix the first console error.
- Use verified lifecycle events.
- Measure rendering through `loaded`.
- Inspect documented public properties.
- Avoid relying on generated SVG internals.
- Avoid logging sensitive financial data.
- Use Network, Performance, and Memory tools together.

### Lifecycle

- Abort requests.
- Close streams.
- Clear timers.
- Disconnect observers.
- Remove listeners.
- Destroy the Stock Chart.
- Do not access the instance after destruction.

## Combined Mistakes and Future References

### Candle Using yName

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

### labelFormat Described as Required

Incorrect:

```text
Axis labels require labelFormat.
```

Correct:

```text
labelFormat customizes generated axis-label text.
```

### BetweenTicks Used for DateTime

Avoid:

```typescript
primaryXAxis: {
    valueType: 'DateTime',
    labelPlacement:
        'BetweenTicks'
}
```

Validate placement options according to the selected axis type.

### Incorrect Legend Property

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

### Root Animation Assumption

Avoid:

```typescript
animation: {
    enable: false
}
```

Use:

```typescript
series: [
    {
        animation: {
            enable: false
        }
    }
]
```

### Unsupported Virtual Scrolling

Avoid:

```typescript
enableScrollbar: true
```

and:

```typescript
scrollbarSettings: {
    size: '20px'
}
```

unless explicitly supported by the installed Stock Chart model.

### Unsupported Canvas Rendering

Avoid:

```typescript
enableCanvasRendering: true
```

unless verified for Stock Chart.

### WebGL Fallback

Stock Chart is not a WebGL visualization in the shown workflow. Do not use WebGL detection to decide whether to enable Canvas rendering.

### Fixed Record Aggregation

Avoid:

```typescript
aggregateData(
    source,
    60
);
```

when records can be irregular.

Aggregate using timestamp buckets.

### Destroy Order

Incorrect:

```typescript
stockChart.destroy();

stockChart
    .series[0]
    .dataSource = [];
```

Correct:

```typescript
stockChart
    .series[0]
    .dataSource = [];

stockChart.destroy();
```

### Fixed Browser Versions

Do not publish fixed minimum versions without checking the current EJ2 release. Current getting-started guidance targets modern Chrome, Edge, Firefox, and Safari.

### Obsolete IE Polyfills

Do not automatically recommend:

```text
@babel/polyfill
core-js 2
```

Build a validated legacy-browser strategy only when the application has a documented requirement.

### Unverified Debug Events

Avoid:

```typescript
chartRender
```

```typescript
seriesRender
```

```typescript
pointRender
```

unless present in the installed Stock Chart API.

### Export Timing

Avoid treating the return of `export()` as export completion.

### Troubleshooting Validation Checklist

Before returning a troubleshooting or optimization example, verify:

1. `StockChart` is imported correctly.
2. JavaScript uses `ej.charts.StockChart`.
3. The host exists.
4. The selector matches the host ID.
5. The host has nonzero dimensions.
6. The matching theme stylesheet is loaded.
7. DateTime data uses JavaScript `Date` objects.
8. `DateTime` is imported and injected.
9. The selected series module is injected.
10. Candle maps `xName`.
11. Candle maps `open`.
12. Candle maps `high`.
13. Candle maps `low`.
14. Candle maps `close`.
15. Hilo maps `high` and `low`.
16. HiloOpenClose maps all OHLC fields.
17. Line, Area, and Spline map `yName`.
18. Numeric fields are finite.
19. OHLC relationships are valid.
20. Records are chronologically sorted.
21. Duplicate timestamps are handled.
22. Empty data uses `noDataTemplate`.
23. Axis-label contrast is sufficient.
24. Dense DateTime intervals are avoided.
25. Tooltip usage injects `Tooltip`.
26. Range-tooltip usage injects `RangeTooltip`.
27. Crosshair usage injects `Crosshair`.
28. Legend uses `legendSettings`.
29. Legend usage injects `StockLegend`.
30. Indicator modules match configured indicators.
31. Indicator `seriesName` matches the source series name.
32. Hidden containers refresh after becoming visible.
33. Remote HTTP responses are validated.
34. Remote date strings are converted.
35. Stale requests are canceled.
36. Time-based aggregation is used.
37. Updates are batched.
38. Retained data is bounded.
39. Unsupported virtual-scrolling settings are excluded.
40. Unsupported Canvas settings are excluded.
41. Animation is configured on the series.
42. Ordinary updates use `dataBind()`.
43. Structural changes use `refresh()` when required.
44. Resize refreshes are debounced.
45. Verified events are used.
46. Performance is measured through lifecycle completion.
47. Internal SVG state is not treated as public API.
48. Browser claims match the installed release.
49. Obsolete polyfills are excluded.
50. Timers and intervals are cleared.
51. Requests are aborted.
52. WebSockets are closed.
53. Observers are disconnected.
54. Event handlers are removed.
55. The component is destroyed.
56. The instance is not accessed after destruction.
57. User-facing errors are concise and safe.
58. Sensitive data is not written to logs.
59. TypeScript and JavaScript examples are complete and runnable.
60. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.