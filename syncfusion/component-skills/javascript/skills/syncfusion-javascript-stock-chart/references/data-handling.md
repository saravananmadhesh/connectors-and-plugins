# Data Handling and Updates

## Overview

The EJ2 Stock Chart supports local JSON collections and remote data sources through the series `dataSource` property. It also supports a `noDataTemplate` for presenting a custom state when no records are available.

This guide covers:

- Local OHLC data binding
- Data validation and normalization
- Remote data with `DataManager`
- Remote data with `fetch`
- Dynamic datasource replacement
- Real-time candle construction
- Batched stream updates
- Empty-data templates
- Large-dataset aggregation
- Bounded data retention
- Request cancellation and lifecycle cleanup

The supplied material required these primary corrections:

- Candle series must map `open`, `high`, `low`, and `close`.
- `yName: 'close'` is not a replacement for complete Candle mappings.
- Remote URLs must not contain generated anchor markup.
- `executeQuery()` returns a promise-like result, not a `DataManager` suitable for direct assignment in the shown form.
- The proposed custom adaptor does not follow the supported EJ2 adaptor architecture.
- Remote date strings must be converted to JavaScript `Date` objects.
- Dynamic updates should normally call `dataBind()`.
- The Stock Chart manages its range navigator from the configured series; do not directly modify undocumented `rangeSelector.series` internals.
- WebSocket ticks and OHLC candles are different data structures.
- Incoming ticks must be grouped into time buckets before they can form valid candles.
- `noDataTemplate` content should not contain unsafe inline handlers or unsanitized server content.
- Stock Chart virtual scrolling and a `scrollEnd` lazy-loading event must not be claimed without API validation.
- Large datasets should use aggregation, bounded retention, batching, and server-side range loading.
- Timers, WebSockets, and pending requests must be cleaned up when the view is destroyed.

## Table of Contents

- #local-data-binding
- #financial-field-mapping
- #data-validation
- #remote-data-binding
  - #datamanager-and-odata
  - #fetch-and-normalize
  - #querying-remote-data
- #dynamic-data-updates
  - #replace-the-datasource
  - #append-historical-candles
- #real-time-candle-updates
  - #tick-structure
  - #time-bucket-aggregation
  - #batched-rendering
- #empty-data-template
- #large-dataset-optimization
  - #aggregation
  - #bounded-retention
  - #server-side-windowing
  - #animation-and-feature-cost
- #error-and-loading-states
- #lifecycle-cleanup
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Local Data Binding

Stock Chart series can bind a local JSON collection through `dataSource`.

### Data Interface

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

Keep custom metadata explicit rather than adding an unrestricted index signature.

```typescript
interface ExtendedStockData
    extends StockData {
    change?: number;
    changePercent?: number;
    trend?: string;
}
```

### Local Collection

```typescript
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
    }
];
```

### Required Modules

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

### Local Binding

```typescript
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

## Financial Field Mapping

A Candle series requires mappings for:

```text
xName
open
high
low
close
```

Recommended mapping:

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

`yName` is used by a single-value series such as Line:

```typescript
series: [
    {
        type: 'Line',
        dataSource: stockData,
        xName: 'date',
        yName: 'close'
    }
]
```

A Candle record should satisfy:

```text
high >= open
high >= close
high >= low
low <= open
low <= close
```

## Data Validation

Validate local, remote, and streamed records before assigning them to the chart.

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

```typescript
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
            isFiniteNumber(item.volume)
        )
    );
};
```

Filter and sort:

```typescript
const normalizeStockData = (
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
```

Do not modify the original array when immutability matters:

```typescript
const normalized: StockData[] =
    normalizeStockData([
        ...stockData
    ]);
```

## Remote Data Binding

Stock Chart supports local and remote data binding.

Remote data must still match the series field mappings.

## DataManager and OData

Install and import the data package if it is not already available through the project dependencies:

```typescript
import {
    DataManager,
    ODataV4Adaptor,
    Query
} from '@syncfusion/ej2-data';
```

Create a remote manager:

```typescript
const remoteData:
    DataManager =
        new DataManager({
            url:
                'https://example.com/odata/stocks',
            adaptor:
                new ODataV4Adaptor(),
            crossDomain: true
        });
```

Create a query:

```typescript
const stockQuery: Query =
    new Query()
        .where(
            'symbol',
            'equal',
            'AAPL'
        )
        .take(500);
```

Bind the manager and query through the series:

```typescript
const stockChart: StockChart =
    new StockChart({
        primaryXAxis: {
            valueType: 'DateTime'
        },
        series: [
            {
                type: 'Candle',
                dataSource: remoteData,
                query: stockQuery,
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close',
                volume: 'volume'
            }
        ]
    });
```

Do not assign `executeQuery()` directly as the series datasource:

```typescript
dataSource:
    remoteData.executeQuery(
        stockQuery
    )
```

`executeQuery()` is appropriate when the application wants to await and process the result before assigning a local collection.

## Fetch and Normalize

Use `fetch` when the application needs explicit response validation, date conversion, retries, caching, or custom authentication.

### API Record

```typescript
interface ApiStockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}
```

### Conversion

```typescript
const convertApiRecord = (
    item: ApiStockData
): StockData => {
    return {
        date: new Date(item.date),
        open: Number(item.open),
        high: Number(item.high),
        low: Number(item.low),
        close: Number(item.close),
        volume:
            item.volume === undefined
                ? undefined
                : Number(item.volume)
    };
};
```

### Fetch Function

```typescript
const loadStockData = async (
    signal?: AbortSignal
): Promise<StockData[]> => {
    const response: Response =
        await fetch(
            '/api/stock-data',
            {
                signal
            }
        );

    if (!response.ok) {
        throw new Error(
            `Stock request failed with ` +
            `status ${response.status}.`
        );
    }

    const payload: unknown =
        await response.json();

    if (!Array.isArray(payload)) {
        throw new Error(
            'The stock response must be an array.'
        );
    }

    const converted: StockData[] =
        (
            payload as ApiStockData[]
        ).map(convertApiRecord);

    return normalizeStockData(
        converted
    );
};
```

### Assign Loaded Data

```typescript
const controller:
    AbortController =
        new AbortController();

const updateFromApi =
    async (): Promise<void> => {
        try {
            const data: StockData[] =
                await loadStockData(
                    controller.signal
                );

            stockChart
                .series[0]
                .dataSource = data;

            stockChart.dataBind();
        } catch (error: unknown) {
            if (
                error instanceof DOMException &&
                error.name ===
                    'AbortError'
            ) {
                return;
            }

            console.error(
                'Unable to load stock data.',
                error
            );
        }
    };
```

Never embed malformed HTML anchors in a URL string.

Incorrect:

```typescript
url:
    'https://example.com/stocks...'
```

Correct:

```typescript
url:
    'https://example.com/stocks'
```

## Querying Remote Data

For user-selected ranges, encode query parameters safely.

```typescript
const buildStockUrl = (
    symbol: string,
    startDate: Date,
    endDate: Date
): string => {
    const parameters:
        URLSearchParams =
            new URLSearchParams({
                symbol,
                start:
                    startDate
                        .toISOString(),
                end:
                    endDate
                        .toISOString()
            });

    return (
        `/api/stock-data?` +
        parameters.toString()
    );
};
```

Do not manually concatenate untrusted values into URLs.

Validate the remote service for:

- Authentication
- CORS
- Rate limits
- Pagination
- Date format
- Time zone
- Missing values
- Duplicate timestamps
- Numeric precision
- Chronological ordering

## Dynamic Data Updates

## Replace the Datasource

Use a new array reference:

```typescript
const updateStockData = (
    newData: StockData[]
): void => {
    stockChart
        .series[0]
        .dataSource =
            normalizeStockData(
                newData
            );

    stockChart.dataBind();
};
```

Use `dataBind()` for normal datasource changes.

Use `refresh()` only when complete layout recalculation is required.

## Append Historical Candles

```typescript
const appendCandles = (
    existingData: StockData[],
    incomingData: StockData[]
): StockData[] => {
    return normalizeStockData([
        ...existingData,
        ...incomingData
    ]);
};
```

Remove duplicate timestamps:

```typescript
const removeDuplicateDates = (
    data: StockData[]
): StockData[] => {
    const records:
        Map<number, StockData> =
            new Map<
                number,
                StockData
            >();

    data.forEach(
        (
            item: StockData
        ): void => {
            records.set(
                item.date.getTime(),
                item
            );
        }
    );

    return Array.from(
        records.values()
    ).sort(
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

Apply the update:

```typescript
const currentData:
    StockData[] =
        (
            stockChart
                .series[0]
                .dataSource as
                    StockData[]
        ) || [];

stockChart
    .series[0]
    .dataSource =
        removeDuplicateDates([
            ...currentData,
            ...incomingData
        ]);

stockChart.dataBind();
```

Do not update undocumented range-selector internals:

```typescript
stockChart
    .rangeSelector
    .series[0]
    .dataSource =
        recentData;
```

Update the public Stock Chart series datasource and allow the component to synchronize its range-navigation view.

## Real-Time Candle Updates

A raw market tick and an OHLC candle are different structures.

### Tick Structure

```typescript
interface PriceTick {
    timestamp: Date;
    price: number;
    volume?: number;
}
```

### Candle Structure

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

Do not push a tick object directly into a Candle series unless it has first been transformed into a valid OHLC candle.

## Time-Bucket Aggregation

The following example groups ticks into one-minute candles.

```typescript
const candleIntervalMs:
    number =
        60 * 1000;
```

Resolve the candle start:

```typescript
const getBucketStart = (
    timestamp: Date,
    intervalMs: number
): Date => {
    const milliseconds: number =
        timestamp.getTime();

    return new Date(
        Math.floor(
            milliseconds /
            intervalMs
        ) * intervalMs
    );
};
```

Create or update a candle:

```typescript
const applyTick = (
    candles: StockData[],
    tick: PriceTick,
    intervalMs: number
): StockData[] => {
    if (
        !Number.isFinite(
            tick.timestamp.getTime()
        ) ||
        !Number.isFinite(
            tick.price
        )
    ) {
        return candles;
    }

    const bucketStart: Date =
        getBucketStart(
            tick.timestamp,
            intervalMs
        );

    const last:
        StockData | undefined =
            candles[
                candles.length - 1
            ];

    if (
        last &&
        last.date.getTime() ===
            bucketStart.getTime()
    ) {
        const updatedLast:
            StockData = {
                ...last,
                high:
                    Math.max(
                        last.high,
                        tick.price
                    ),
                low:
                    Math.min(
                        last.low,
                        tick.price
                    ),
                close: tick.price,
                volume:
                    (
                        last.volume || 0
                    ) +
                    (
                        tick.volume || 0
                    )
            };

        return [
            ...candles.slice(
                0,
                -1
            ),
            updatedLast
        ];
    }

    const newCandle:
        StockData = {
            date: bucketStart,
            open: tick.price,
            high: tick.price,
            low: tick.price,
            close: tick.price,
            volume:
                tick.volume || 0
        };

    return [
        ...candles,
        newCandle
    ];
};
```

This assumes ticks arrive in chronological order. If late or out-of-order ticks are possible, update candles by bucket key rather than only examining the final item.

## WebSocket Stream

```typescript
const socket:
    WebSocket =
        new WebSocket(
            'wss://example.com/stocks'
        );

let liveData: StockData[] = [
    ...stockData
];

socket.addEventListener(
    'message',
    (
        event: MessageEvent<string>
    ): void => {
        try {
            const payload:
                {
                    timestamp: string;
                    price: number;
                    volume?: number;
                } =
                    JSON.parse(
                        event.data
                    );

            const tick: PriceTick = {
                timestamp:
                    new Date(
                        payload.timestamp
                    ),
                price:
                    Number(
                        payload.price
                    ),
                volume:
                    payload.volume ===
                        undefined
                        ? undefined
                        : Number(
                            payload.volume
                        )
            };

            liveData =
                applyTick(
                    liveData,
                    tick,
                    candleIntervalMs
                );

            scheduleChartUpdate();
        } catch (error: unknown) {
            console.error(
                'Invalid stock tick.',
                error
            );
        }
    }
);
```

Do not assume:

```typescript
tick.x.getTime()
```

works after parsing JSON. JSON dates are strings and must be converted into `Date` objects.

## Batched Rendering

Do not render after every tick in a high-frequency stream.

```typescript
let updateScheduled:
    boolean = false;

const scheduleChartUpdate =
    (): void => {
        if (updateScheduled) {
            return;
        }

        updateScheduled = true;

        window.setTimeout(
            (): void => {
                updateScheduled = false;

                stockChart
                    .series[0]
                    .dataSource =
                        liveData;

                stockChart.dataBind();
            },
            250
        );
    };
```

The batching interval should match the application’s latency and performance requirements.

For very frequent updates, consider:

- Updating at a fixed number of frames per second.
- Aggregating ticks in a Web Worker.
- Rendering only completed candles.
- Updating the current candle less frequently.
- Pausing visual updates when the tab is hidden.

## Empty Data Template

The `noDataTemplate` property can display a custom layout when no data is available.

### Safe Template

```typescript
const stockChart: StockChart =
    new StockChart({
        series: [
            {
                type: 'Candle',
                dataSource: [],
                xName: 'date',
                open: 'open',
                high: 'high',
                low: 'low',
                close: 'close'
            }
        ],
        noDataTemplate:
            '#stock-no-data-template'
    });
```

HTML:

```html
<div
    id="stock-no-data-template"
    style="display: none;"
>
    <div class="stock-no-data">
        <p>
            No stock data is available.
        </p>

        <button
            id="reload-stock-data"
            type="button"
        >
            Reload data
        </button>
    </div>
</div>
```

CSS:

```css
.stock-no-data {
    display: grid;
    justify-items: center;
    gap: 12px;
    padding: 40px;
    text-align: center;
}
```

Attach the event through JavaScript:

```typescript
const reloadButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#reload-stock-data'
        );

if (reloadButton) {
    reloadButton.addEventListener(
        'click',
        (): void => {
            void updateFromApi();
        }
    );
}
```

Avoid inline handlers:

```html
<button onclick="loadData()">
```

Do not insert untrusted server text directly into `noDataTemplate`.

### Template Lifecycle

The template’s rendered button may be created after the Stock Chart loads. If the event target is unavailable initially, bind the handler through the Stock Chart `loaded` event or use safe event delegation on a stable parent.

## Large Dataset Optimization

## Aggregation

Aggregate data according to timestamps rather than assuming every fixed number of records equals one hour.

Record-count aggregation is unsafe when:

- Records are missing.
- Trading pauses occur.
- The market closes.
- Timestamps are irregular.
- Multiple exchanges use different sessions.

### Time-Based OHLC Aggregation

```typescript
const aggregateCandles = (
    data: StockData[],
    intervalMs: number
): StockData[] => {
    if (
        !Number.isFinite(
            intervalMs
        ) ||
        intervalMs <= 0
    ) {
        throw new Error(
            'Aggregation interval must be positive.'
        );
    }

    const buckets:
        Map<
            number,
            StockData[]
        > =
            new Map<
                number,
                StockData[]
            >();

    normalizeStockData(data)
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

                const records:
                    StockData[] =
                        buckets.get(
                            bucket
                        ) || [];

                records.push(item);

                buckets.set(
                    bucket,
                    records
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
                    open: first.open,
                    high:
                        Math.max(
                            ...records.map(
                                (
                                    item:
                                        StockData
                                ): number => {
                                    return item.high;
                                }
                            )
                        ),
                    low:
                        Math.min(
                            ...records.map(
                                (
                                    item:
                                        StockData
                                ): number => {
                                    return item.low;
                                }
                            )
                        ),
                    close: last.close,
                    volume:
                        records.reduce(
                            (
                                total:
                                    number,
                                item:
                                    StockData
                            ): number => {
                                return (
                                    total +
                                    (
                                        item.volume ||
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

Aggregate minute candles into hourly candles:

```typescript
const hourlyData:
    StockData[] =
        aggregateCandles(
            minuteData,
            60 * 60 * 1000
        );
```

Bind once:

```typescript
stockChart
    .series[0]
    .dataSource =
        hourlyData;

stockChart.dataBind();
```

## Bounded Retention

For a real-time display, retain a bounded number of recent candles.

```typescript
const maximumPoints:
    number = 5000;
```

```typescript
const limitData = (
    data: StockData[],
    limit: number
): StockData[] => {
    if (limit <= 0) {
        return [];
    }

    return data.slice(
        -limit
    );
};
```

Usage:

```typescript
liveData =
    limitData(
        liveData,
        maximumPoints
    );
```

Avoid repeatedly calling `shift()` for large numbers of removed records. A single `slice()` or `splice()` operation is generally clearer for removing a batch.

## Server-Side Windowing

For very large historical datasets:

1. Request only the required symbol and date range.
2. Aggregate on the server according to the visible interval.
3. Cache previously loaded ranges.
4. Cancel stale requests.
5. Merge and deduplicate returned candles.
6. Update the public series datasource.
7. Allow Stock Chart to update its range-navigation view.

Example range request:

```typescript
const loadDateRange = async (
    symbol: string,
    start: Date,
    end: Date,
    signal?: AbortSignal
): Promise<StockData[]> => {
    const parameters:
        URLSearchParams =
            new URLSearchParams({
                symbol,
                start:
                    start.toISOString(),
                end:
                    end.toISOString()
            });

    const response: Response =
        await fetch(
            `/api/stock-data?` +
            parameters.toString(),
            {
                signal
            }
        );

    if (!response.ok) {
        throw new Error(
            `Range request failed with ` +
            `status ${response.status}.`
        );
    }

    const data:
        ApiStockData[] =
            await response.json();

    return normalizeStockData(
        data.map(
            convertApiRecord
        )
    );
};
```

Do not claim support for:

```typescript
scrollEnd
```

or Stock Chart virtual scrolling unless those APIs have been explicitly verified against the installed package.

Do not add:

```typescript
primaryXAxis: {
    enableScrollbar: true
}
```

as a general Stock Chart large-data solution without API validation.

Use the Stock Chart’s built-in range navigator and period selection for normal financial navigation.

## Animation and Feature Cost

For frequent updates, disable unnecessary animation:

```typescript
series: [
    {
        type: 'Candle',
        animation: {
            enable: false
        }
    }
]
```

Also evaluate the runtime cost of:

- Multiple indicators
- Trendlines
- Shared tooltips
- Crosshairs
- Multiple panes
- Large range-navigator datasets
- Data labels
- Frequent full redraws
- Export preparation

Do not present a fixed threshold such as 1,000 or 10,000 points as a universal performance limit. Test with production-scale data on target browsers and devices.

## Error and Loading States

Track loading and error status outside the visualization.

```html
<p
    id="stock-status"
    role="status"
    aria-live="polite"
></p>
```

```typescript
const setStockStatus = (
    message: string
): void => {
    const element:
        HTMLElement | null =
            document.querySelector(
                '#stock-status'
            );

    if (element) {
        element.textContent =
            message;
    }
};
```

Usage:

```typescript
const reloadData =
    async (): Promise<void> => {
        setStockStatus(
            'Loading stock data.'
        );

        try {
            const data:
                StockData[] =
                    await loadStockData();

            stockChart
                .series[0]
                .dataSource =
                    data;

            stockChart.dataBind();

            setStockStatus(
                data.length === 0
                    ? 'No stock data is available.'
                    : `${data.length} stock records loaded.`
            );
        } catch (error: unknown) {
            setStockStatus(
                'Unable to load stock data.'
            );

            console.error(error);
        }
    };
```

Do not expose internal error details, credentials, or server responses directly to end users.

## Lifecycle Cleanup

Clean up active resources when the containing view is removed.

```typescript
let updateTimer:
    number | undefined;

const controller:
    AbortController =
        new AbortController();

const socket:
    WebSocket =
        new WebSocket(
            'wss://example.com/stocks'
        );
```

Cleanup:

```typescript
const destroyStockView =
    (): void => {
        controller.abort();

        if (
            socket.readyState ===
                WebSocket.OPEN ||
            socket.readyState ===
                WebSocket.CONNECTING
        ) {
            socket.close();
        }

        if (
            updateTimer !== undefined
        ) {
            window.clearTimeout(
                updateTimer
            );
        }

        stockChart.destroy();
    };
```

Also remove custom DOM event listeners when their containing page can be mounted and unmounted repeatedly.

## Complete TypeScript Example

This example includes:

- Typed OHLC records
- Complete Candle mappings
- Local initial data
- Remote reload
- Date conversion
- Validation and sorting
- Empty-data template
- Safe loading status
- Batched real-time updates
- Bounded retention
- Tooltip, crosshair, and range tooltip
- Request cancellation
- Cleanup

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

    <title>Stock Chart Data Updates</title>

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

        .stock-no-data {
            display: grid;
            justify-items: center;
            gap: 12px;
            padding: 40px;
            text-align: center;
        }
    </style>
</head>
<body>
    <main
        class="stock-chart-card"
        aria-labelledby="stock-chart-heading"
    >
        <h1 id="stock-chart-heading">
            Live Stock Data
        </h1>

        <p id="stock-chart-description">
            Daily open, high, low, and close prices.
        </p>

        <div class="stock-chart-toolbar">
            <button
                id="reload-stock-data"
                type="button"
            >
                Reload Data
            </button>

            <button
                id="clear-stock-data"
                type="button"
            >
                Clear Data
            </button>

            <button
                id="add-sample-candle"
                type="button"
            >
                Add Candle
            </button>
        </div>

        <p
            id="stock-status"
            role="status"
            aria-live="polite"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description"
        ></div>

        <div
            id="stock-no-data-template"
            style="display: none;"
        >
            <div class="stock-no-data">
                <strong>
                    No stock data is available.
                </strong>

                <span>
                    Use Reload Data to request
                    the latest records.
                </span>
            </div>
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

interface ApiStockData {
    date: string;
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

const initialData: StockData[] = [
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
        item.low <= item.close
    );
};

const normalizeStockData = (
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

const convertApiRecord = (
    item: ApiStockData
): StockData => {
    return {
        date: new Date(item.date),
        open: Number(item.open),
        high: Number(item.high),
        low: Number(item.low),
        close: Number(item.close),
        volume:
            item.volume === undefined
                ? undefined
                : Number(item.volume)
    };
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

let currentData: StockData[] =
    normalizeStockData([
        ...initialData
    ]);

const stockChart: StockChart =
    new StockChart({
        width: '100%',
        height: '650px',
        theme: 'Bootstrap5',
        title: 'Stock Price',
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
        noDataTemplate:
            '#stock-no-data-template',
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
                },
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A'
            }
        ],
        indicatorType: [],
        trendlineType: [],
        exportType: []
    });

stockChart.appendTo(
    stockChartElement
);

const setStatus = (
    message: string
): void => {
    const status:
        HTMLElement | null =
            document.querySelector(
                '#stock-status'
            );

    if (status) {
        status.textContent = message;
    }
};

let requestController:
    AbortController | null =
        null;

const reloadData =
    async (): Promise<void> => {
        requestController?.abort();

        requestController =
            new AbortController();

        setStatus(
            'Loading stock data.'
        );

        try {
            const response: Response =
                await fetch(
                    '/api/stock-data',
                    {
                        signal:
                            requestController
                                .signal
                    }
                );

            if (!response.ok) {
                throw new Error(
                    `Request failed with ` +
                    `status ${response.status}.`
                );
            }

            const payload: unknown =
                await response.json();

            if (!Array.isArray(payload)) {
                throw new Error(
                    'The stock response must be an array.'
                );
            }

            currentData =
                normalizeStockData(
                    (
                        payload as
                            ApiStockData[]
                    ).map(
                        convertApiRecord
                    )
                );

            stockChart
                .series[0]
                .dataSource =
                    currentData;

            stockChart.dataBind();

            setStatus(
                currentData.length === 0
                    ? 'No stock data is available.'
                    : `${currentData.length} stock records loaded.`
            );
        } catch (error: unknown) {
            if (
                error instanceof DOMException &&
                error.name === 'AbortError'
            ) {
                return;
            }

            console.error(
                'Unable to load stock data.',
                error
            );

            setStatus(
                'Unable to load stock data.'
            );
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
    '#reload-stock-data',
    (): void => {
        void reloadData();
    }
);

bindButton(
    '#clear-stock-data',
    (): void => {
        currentData = [];

        stockChart
            .series[0]
            .dataSource = [];

        stockChart.dataBind();

        setStatus(
            'Stock data cleared.'
        );
    }
);

bindButton(
    '#add-sample-candle',
    (): void => {
        const previous:
            StockData | undefined =
                currentData[
                    currentData.length -
                    1
                ];

        const open: number =
            previous
                ? previous.close
                : 100;

        const close: number =
            open + 2;

        const nextDate: Date =
            previous
                ? new Date(
                    previous.date
                        .getTime() +
                    24 * 60 * 60 * 1000
                )
                : new Date();

        const next:
            StockData = {
                date: nextDate,
                open,
                high:
                    Math.max(
                        open,
                        close
                    ) + 2,
                low:
                    Math.min(
                        open,
                        close
                    ) - 2,
                close,
                volume: 1100000
            };

        currentData = [
            ...currentData,
            next
        ].slice(-5000);

        stockChart
            .series[0]
            .dataSource =
                currentData;

        stockChart.dataBind();

        setStatus(
            'A sample candle was added.'
        );
    }
);

window.addEventListener(
    'beforeunload',
    (): void => {
        requestController?.abort();
        stockChart.destroy();
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

    <title>Stock Chart Data Updates</title>

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
            margin-bottom: 16px;
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
    </style>
</head>
<body>
    <main class="stock-chart-card">
        <h1>
            Stock Data
        </h1>

        <p id="stock-chart-description">
            Daily open, high, low, and close prices.
        </p>

        <div class="stock-chart-toolbar">
            <button
                id="clear-stock-data"
                type="button"
            >
                Clear Data
            </button>

            <button
                id="restore-stock-data"
                type="button"
            >
                Restore Data
            </button>
        </div>

        <p
            id="stock-status"
            role="status"
            aria-live="polite"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description"
        ></div>

        <div
            id="stock-no-data-template"
            style="display: none;"
        >
            <div>
                No stock data is available.
            </div>
        </div>
    </main>

    <script>
        var initialData = [
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

        var currentData =
            initialData.slice();

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '650px',
                theme: 'Bootstrap5',
                title: 'Stock Price',
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
                noDataTemplate:
                    '#stock-no-data-template',
                series: [
                    {
                        type: 'Candle',
                        dataSource:
                            currentData,
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

        function setStatus(message) {
            document
                .getElementById(
                    'stock-status'
                )
                .textContent =
                    message;
        }

        document
            .getElementById(
                'clear-stock-data'
            )
            .addEventListener(
                'click',
                function () {
                    currentData = [];

                    stockChart
                        .series[0]
                        .dataSource = [];

                    stockChart.dataBind();

                    setStatus(
                        'Stock data cleared.'
                    );
                }
            );

        document
            .getElementById(
                'restore-stock-data'
            )
            .addEventListener(
                'click',
                function () {
                    currentData =
                        initialData.slice();

                    stockChart
                        .series[0]
                        .dataSource =
                            currentData;

                    stockChart.dataBind();

                    setStatus(
                        currentData.length +
                        ' stock records restored.'
                    );
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Local Data

- Define typed OHLC records.
- Map every required financial field.
- Validate high and low relationships.
- Sort records chronologically.
- Remove duplicate timestamps.
- Use JavaScript `Date` objects.

### Remote Data

- Validate HTTP status codes.
- Validate response structure.
- Convert date strings into `Date` objects.
- Convert numeric strings into numbers when necessary.
- Handle CORS and authentication.
- Cancel stale requests.
- Cache previously loaded historical ranges.
- Avoid embedding markup in URL strings.

### Real-Time Data

- Treat ticks and candles as different models.
- Aggregate ticks into explicit time buckets.
- Handle out-of-order ticks when the feed allows them.
- Batch visual updates.
- Bound retained history.
- Disable unnecessary animation.
- Close WebSockets during teardown.

### Empty Data

- Use `noDataTemplate`.
- Keep template content static or sanitized.
- Avoid inline event handlers.
- Provide a visible reload control.
- Announce loading and error status accessibly.

### Performance

- Aggregate by timestamp, not fixed record count.
- Request only the required date range.
- Reduce update frequency.
- Test production-scale datasets.
- Avoid unsupported virtual-scrolling claims.
- Avoid undocumented range-selector mutation.
- Profile indicators, tooltips, crosshairs, and panes separately.

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

### Missing JavaScript Mappings

Incorrect:

```javascript
{
    type: 'Candle',
    dataSource: stockData
}
```

Correct:

```javascript
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

### Invalid Custom Adaptor

Do not extend an assumed type such as:

```typescript
DataManager.QueryableAdaptor
```

unless that exact adaptor API has been validated.

Prefer:

- A supported EJ2 adaptor, or
- An explicit `fetch` function that returns a normalized local collection.

### executeQuery Used as Datasource

Incorrect:

```typescript
dataSource:
    manager.executeQuery(
        query
    )
```

Preferred:

```typescript
dataSource: manager,
query
```

or await the query and assign its result after normalization.

### Mutating Range Selector Internals

Avoid:

```typescript
stockChart
    .rangeSelector
    .series[0]
    .dataSource =
        recentData;
```

Update:

```typescript
stockChart
    .series[0]
    .dataSource =
        recentData;

stockChart.dataBind();
```

### Tick Used as Candle

Incorrect:

```typescript
stockChart
    .series[0]
    .dataSource
    .push(tick);
```

A tick with only `timestamp` and `price` must first be transformed into an OHLC candle.

### Parsed Date Treated as Date Object

Incorrect:

```typescript
const tick =
    JSON.parse(event.data);

tick.x.getTime();
```

Correct:

```typescript
const timestamp =
    new Date(tick.timestamp);

timestamp.getTime();
```

### Refresh After Every Tick

Avoid:

```typescript
socket.onmessage = (): void => {
    stockChart.refresh();
};
```

Batch ticks and call `dataBind()` at a controlled interval.

### Unsafe No-Data Handler

Avoid:

```html
<button onclick="loadData()">
```

Use `addEventListener()`.

### Unsupported Virtual Scrolling

Do not claim that Stock Chart supports virtual scrolling by configuring:

```typescript
enableScrollbar: true
```

without confirming the API in the installed version.

### Unsupported scrollEnd Event

Do not document:

```typescript
scrollEnd: (
    args
): void => {
}
```

unless Stock Chart explicitly supports that event in the target version.

### Record-Count Aggregation

Avoid assuming:

```typescript
aggregateData(
    minuteData,
    60
)
```

always creates hourly candles.

Aggregate according to actual timestamp buckets.

### Repeated refresh Calls

Avoid:

```typescript
data.push(point);
stockChart.refresh();
```

for every point.

Preferred:

```typescript
stockChart
    .series[0]
    .dataSource =
        updatedData;

stockChart.dataBind();
```

### Data-Handling Validation Checklist

Before generating a Stock Chart data example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. `DateTime` is imported and injected.
4. The financial-series module is imported and injected.
5. Candle data maps `xName`.
6. Candle data maps `open`.
7. Candle data maps `high`.
8. Candle data maps `low`.
9. Candle data maps `close`.
10. Volume is mapped when required.
11. Dates are JavaScript `Date` objects.
12. OHLC fields contain finite numbers.
13. High is not below open, close, or low.
14. Low is not above open, close, or high.
15. Records are chronologically sorted.
16. Duplicate timestamps are handled.
17. Remote HTTP errors are handled.
18. Remote response shape is validated.
19. Remote dates are converted.
20. URL strings contain no HTML anchor markup.
21. Supported adaptors are used correctly.
22. `executeQuery()` is not assigned incorrectly.
23. Ticks are transformed into candles.
24. Tick buckets use timestamps.
25. Frequent updates are batched.
26. Retained data is bounded.
27. Range-selector internals are not mutated.
28. `noDataTemplate` is configured safely.
29. Inline handlers are avoided.
30. Untrusted template HTML is not injected.
31. Unsupported virtual scrolling is not claimed.
32. Unsupported lazy-loading events are not claimed.
33. Aggregation uses time intervals.
34. Ordinary datasource updates call `dataBind()`.
35. Full `refresh()` calls are limited.
36. Animations are disabled when frequent updates require it.
37. Pending requests are abortable.
38. WebSockets and timers are cleaned up.
39. The host exists before `appendTo()`.
40. The host has sufficient width and height.
41. TypeScript and JavaScript examples are complete and runnable.
42. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.