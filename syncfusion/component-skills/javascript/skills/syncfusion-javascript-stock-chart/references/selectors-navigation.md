# Period and Range Selectors

## Overview

The EJ2 Stock Chart provides two integrated controls for changing the visible financial-data range:

- **Period selector**: Displays preset range buttons such as `1M`, `3M`, `6M`, `YTD`, `1Y`, and `All`.
- **Range selector**: Displays a range navigator with draggable handles and date-range controls for selecting a custom interval.

Both selectors are enabled by default. Use `enablePeriodSelector` to control the period-selector toolbar and `enableSelector` to control the range selector.

The supplied material required the following corrections:

- The period selector is enabled by default.
- The range selector is integrated into Stock Chart and does not require a separate `RangeSelector` module.
- Use `enableSelector`, not a root `rangeSelector` configuration object.
- Do not configure a separate series inside `rangeSelector`.
- `RangeTooltip` supports the range navigator tooltip.
- The correct quarter interval value is `Quarter`, not `Quarters`.
- Period buttons select a visible date range. They do not change candle aggregation or datasource resolution.
- A `1m` period means one minute of the existing datasource domain, not one-minute candles.
- Intraday periods require an intraday datasource with sufficiently detailed timestamps.
- Candle series require complete OHLC field mappings.
- Do not use undocumented `selectPeriod()` methods without validating the installed API.
- Do not directly mutate range-selector internals.
- Use `primaryXAxis`, not `xAxis`.
- Dynamic period changes can require `refresh()` because the period-selector toolbar structure changes.
- Use calendar-based periods correctly. Three months must use `Months` with interval `3`, not 90 days.
- Only one period should be selected by default.

## Table of Contents

- #period-selector
  - #basic-period-selector
  - #period-configuration
  - #special-periods
  - #intraday-periods
  - #daily-and-long-term-periods
  - #period-selector-visibility
- #range-selector
  - #basic-range-selector
  - #range-selection-methods
  - #range-tooltip
  - #range-selector-visibility
- #combined-selector-configuration
- #programmatic-control
  - #replace-the-period-collection
  - #select-a-custom-range
  - #restore-the-complete-range
- #server-side-range-loading
- #custom-date-range-controls
- #dynamic-period-creation
- #accessibility
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Period Selector

The period selector allows users to select a visible range using predefined period buttons. It is enabled by default in the Stock Chart.

Configure its buttons through:

```typescript
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
]
```

The `interval` property specifies the interval count, and `text` specifies the button text.

## Basic Period Selector

### TypeScript

```typescript
import {
    CandleSeries,
    DateTime,
    RangeTooltip,
    StockChart
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    DateTime,
    CandleSeries,
    RangeTooltip
);

const stockChart: StockChart =
    new StockChart({
        enablePeriodSelector: true,
        primaryXAxis: {
            valueType: 'DateTime'
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
                name: 'Stock Price'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

### JavaScript

```javascript
var stockChart =
    new ej.charts.StockChart({
        enablePeriodSelector: true,
        primaryXAxis: {
            valueType: 'DateTime'
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
                volume: 'volume'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

## Period Configuration

A standard period entry has this structure:

```typescript
{
    intervalType: 'Months',
    interval: 3,
    text: '3M',
    selected: true
}
```

The supported interval types are:

```text
Auto
Years
Quarter
Months
Weeks
Days
Hours
Minutes
Seconds
```

The correct quarter interval value is singular:

```typescript
intervalType: 'Quarter'
```

not:

```typescript
intervalType: 'Quarters'
```

These period interval types are documented for the Stock Chart period selector.

### Only One Selected Period

Use only one default selection:

```typescript
periods: [
    {
        intervalType: 'Months',
        interval: 1,
        text: '1M'
    },
    {
        intervalType: 'Months',
        interval: 3,
        text: '3M',
        selected: true
    },
    {
        text: 'All'
    }
]
```

Do not mark several entries as selected.

## Special Periods

### All

Use a text-only entry:

```typescript
{
    text: 'All'
}
```

### Year to Date

Use:

```typescript
{
    text: 'YTD'
}
```

Do not invent interval values for these special entries.

Incorrect:

```typescript
{
    intervalType: 'Years',
    interval: 0,
    text: 'YTD'
}
```

Correct:

```typescript
{
    text: 'YTD'
}
```

## Intraday Periods

Intraday periods are appropriate when the datasource contains intraday timestamps.

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
        intervalType: 'Hours',
        interval: 12,
        text: '12H',
        selected: true
    },
    {
        text: '1D'
    }
]
```

Syncfusion’s period-selector examples use minute and hour entries with an intraday DateTime datasource.

A period button controls the visible range. It does not aggregate the datasource.

For example:

```typescript
{
    intervalType: 'Minutes',
    interval: 5,
    text: '5m'
}
```

means “show a five-minute date range.” It does not mean “convert the datasource to five-minute candles.”

If users must switch between one-minute, five-minute, hourly, and daily candles:

1. Detect the requested resolution using application controls or a verified period-change event.
2. Request or aggregate data at that resolution.
3. Convert timestamps into JavaScript `Date` objects.
4. Validate the OHLC records.
5. Replace the public series datasource.
6. Call `dataBind()` or `refresh()` as required.

## Daily and Long-Term Periods

For daily historical data:

```typescript
periods: [
    {
        intervalType: 'Weeks',
        interval: 1,
        text: '1W'
    },
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
]
```

Use calendar semantics rather than approximate day counts.

Incorrect:

```typescript
{
    intervalType: 'Days',
    interval: 90,
    text: '3M'
}
```

Correct:

```typescript
{
    intervalType: 'Months',
    interval: 3,
    text: '3M'
}
```

A 90-day interval and three calendar months are not always equivalent.

## Period Selector Visibility

The period selector is visible by default. Use `enablePeriodSelector` to control it.

Hide it:

```typescript
enablePeriodSelector: false
```

Show it:

```typescript
enablePeriodSelector: true
```

Runtime update:

```typescript
stockChart.enablePeriodSelector =
    false;

stockChart.refresh();
```

Because this changes the toolbar layout, use `refresh()` rather than assuming `dataBind()` alone will recalculate the complete Stock Chart layout.

## Range Selector

The Stock Chart range selector displays an overview of the complete date domain and allows users to change the visible interval.

The range can be selected by:

- Dragging the left or right navigator thumb.
- Tapping range labels.
- Selecting start and end dates through the Date Range control.

The range selector is enabled by default and can be controlled through:

```typescript
enableSelector
```

Do not create a separate Stock Chart `rangeSelector` configuration object unless the installed API explicitly supports it.

## Basic Range Selector

```typescript
const stockChart: StockChart =
    new StockChart({
        enableSelector: true,
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
                volume: 'volume'
            }
        ]
    });

stockChart.appendTo('#stock-chart');
```

The Stock Chart manages the range navigator from its configured series.

Do not use:

```typescript
import {
    RangeSelector
} from '@syncfusion/ej2-charts';
```

Do not inject:

```typescript
StockChart.Inject(
    RangeSelector
);
```

Do not configure:

```typescript
rangeSelector: {
    enable: true,
    series: [
        {
            dataSource: stockData
        }
    ]
}
```

## Range Selector Visibility

Hide the range selector:

```typescript
enableSelector: false
```

Show it:

```typescript
enableSelector: true
```

The documented Stock Chart `enableSelector` property controls range-selector visibility.

Runtime update:

```typescript
stockChart.enableSelector =
    false;

stockChart.refresh();
```

Use `refresh()` because hiding or showing the range navigator changes the overall Stock Chart layout.

## Range Tooltip

Use `RangeTooltip` for the tooltip associated with the range navigator.

```typescript
import {
    RangeTooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip
);
```

Do not confuse `RangeTooltip` with the primary chart-series tooltip:

```typescript
import {
    RangeTooltip,
    Tooltip
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeTooltip,
    Tooltip
);
```

Use:

- `Tooltip` for the primary chart series.
- `RangeTooltip` for the range navigator.

## Unsupported Range Selector Configuration

Do not add unverified configuration such as:

```typescript
rangeSelector: {
    enable: true,
    height: 100,
    labelFormat: 'MMM d, yyyy',
    seriesType: 'Area',
    thumbBorder: {
        color: '#EA580C',
        width: 1
    },
    backgroundColor: '#F3F4F6',
    selectedRegionColor:
        'rgba(37, 99, 235, 0.2)'
}
```

This mixes standalone Range Navigator concepts with the integrated Stock Chart selector.

Use the verified Stock Chart properties:

```typescript
enableSelector: true
```

```typescript
enablePeriodSelector: true
```

```typescript
periods: [...]
```

## Combined Selector Configuration

```typescript
const stockChart: StockChart =
    new StockChart({
        enablePeriodSelector: true,
        enableSelector: true,
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
                volume: 'volume'
            }
        ]
    });
```

This provides:

- Quick range buttons in the period selector.
- Custom range selection through the range navigator.
- Start and end date selection.
- A complete historical domain in the navigator.

## Selector Styling

Avoid relying on undocumented generated selectors such as:

```css
.e-period-selector button {
}
```

Generated classes or internal markup can change between releases.

Preferred approaches:

1. Load the correct EJ2 theme.
2. Configure supported Stock Chart appearance properties.
3. Use Theme Studio where appropriate.
4. Apply CSS overrides only when the selectors are documented and tested against the target release.
5. Retest overrides after package upgrades.

## Programmatic Control

Do not document unverified methods such as:

```typescript
stockChart.selectPeriod(
    period
);
```

or:

```typescript
stockChart.selectPeriod(4);
```

unless the installed `StockChart` TypeScript definition explicitly exposes that method.

A support-safe method is to update the visible x-axis range or replace the `periods` collection.

## Replace the Period Collection

```typescript
stockChart.periods = [
    {
        intervalType: 'Months',
        interval: 1,
        text: '1M'
    },
    {
        intervalType: 'Months',
        interval: 6,
        text: '6M'
    },
    {
        text: 'All',
        selected: true
    }
];

stockChart.refresh();
```

Use `refresh()` because the period-selector toolbar buttons have changed structurally.

## Select a Custom Range

Use the primary x-axis range without destroying the complete datasource:

```typescript
const selectCustomRange = (
    startDate: Date,
    endDate: Date
): void => {
    if (
        !Number.isFinite(
            startDate.getTime()
        ) ||
        !Number.isFinite(
            endDate.getTime()
        )
    ) {
        throw new Error(
            'The selected dates are invalid.'
        );
    }

    if (
        startDate.getTime() >
        endDate.getTime()
    ) {
        throw new Error(
            'The start date must not be after the end date.'
        );
    }

    stockChart
        .primaryXAxis
        .minimum =
            startDate;

    stockChart
        .primaryXAxis
        .maximum =
            endDate;

    stockChart.dataBind();
};
```

Usage:

```typescript
selectCustomRange(
    new Date(2025, 0, 1),
    new Date(2025, 5, 30)
);
```

Use:

```typescript
primaryXAxis
```

Do not use:

```typescript
xAxis
```

## Restore the Complete Range

Remove the fixed minimum and maximum:

```typescript
stockChart
    .primaryXAxis
    .minimum =
        null;

stockChart
    .primaryXAxis
    .maximum =
        null;

stockChart.dataBind();
```

If strict TypeScript settings reject `null`, use the reset value supported by the installed model, such as `undefined`, or replace the axis configuration.

Avoid filtering the complete datasource merely to change the visible range:

```typescript
stockChart
    .series[0]
    .dataSource =
        filteredData;
```

Filtering removes historical data from the range navigator and can prevent users from returning to the complete domain.

## Period and Range Events

Do not use unverified event names such as:

```typescript
rangeSelected
```

```typescript
periodRender
```

unless the installed Stock Chart version explicitly exposes them.

A period-change event has existed in some platform wrappers and package versions, but event names and argument models can differ. Validate the exact TypeScript `StockChartModel` definition before documenting the event.

For server-side loading, use only a verified Stock Chart range-change or period-change event from the installed version.

## Server-Side Range Loading

For large datasets, the application can request data for a selected interval, but it should preserve enough context for the range navigator.

Recommended workflow:

1. Receive the selected start and end timestamps from a verified Stock Chart event.
2. Debounce rapid navigator changes.
3. Cancel any stale request.
4. Request data for the selected range.
5. Normalize date strings into `Date` objects.
6. Validate OHLC values.
7. Merge and deduplicate the returned candles.
8. Update the public series datasource.
9. Call `dataBind()`.
10. Preserve or separately manage the complete historical navigator domain.

Example request utility:

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

```typescript
const loadDataForRange = async (
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

    const payload:
        ApiStockData[] =
            await response.json();

    return payload.map(
        (
            item: ApiStockData
        ): StockData => {
            return {
                date:
                    new Date(
                        item.date
                    ),
                open:
                    Number(
                        item.open
                    ),
                high:
                    Number(
                        item.high
                    ),
                low:
                    Number(
                        item.low
                    ),
                close:
                    Number(
                        item.close
                    ),
                volume:
                    item.volume ===
                        undefined
                        ? undefined
                        : Number(
                            item.volume
                        )
            };
        }
    );
};
```

Do not fetch on every raw thumb-move event. Debounce the range change.

## Custom Date Range Controls

Use native date inputs when the application requires an external date-range interface.

### HTML

```html
<div class="date-range-controls">
    <label for="start-date">
        Start date
    </label>

    <input
        id="start-date"
        type="date"
    >

    <label for="end-date">
        End date
    </label>

    <input
        id="end-date"
        type="date"
    >

    <button
        id="apply-date-range"
        type="button"
    >
        Apply range
    </button>

    <button
        id="reset-date-range"
        type="button"
    >
        Show all
    </button>
</div>

<p
    id="range-status"
    role="status"
    aria-live="polite"
></p>
```

### TypeScript

```typescript
const parseDateInput = (
    value: string
): Date | null => {
    if (!value) {
        return null;
    }

    const date: Date =
        new Date(
            `${value}T00:00:00`
        );

    return Number.isFinite(
        date.getTime()
    )
        ? date
        : null;
};
```

```typescript
const applyButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#apply-date-range'
        );

if (applyButton) {
    applyButton.addEventListener(
        'click',
        (): void => {
            const startInput =
                document.querySelector(
                    '#start-date'
                ) as
                    HTMLInputElement |
                    null;

            const endInput =
                document.querySelector(
                    '#end-date'
                ) as
                    HTMLInputElement |
                    null;

            const startDate:
                Date | null =
                    parseDateInput(
                        startInput?.value ||
                        ''
                    );

            const endDate:
                Date | null =
                    parseDateInput(
                        endInput?.value ||
                        ''
                    );

            if (
                !startDate ||
                !endDate ||
                startDate > endDate
            ) {
                setRangeStatus(
                    'Select a valid date range.'
                );

                return;
            }

            endDate.setHours(
                23,
                59,
                59,
                999
            );

            selectCustomRange(
                startDate,
                endDate
            );

            setRangeStatus(
                'The custom date range was applied.'
            );
        }
    );
}
```

## Dynamic Period Creation

Create periods using the correct calendar interval.

```typescript
interface CustomPeriod {
    text: string;
    interval: number;
    intervalType:
        'Years' |
        'Quarter' |
        'Months' |
        'Weeks' |
        'Days' |
        'Hours' |
        'Minutes' |
        'Seconds';
}
```

```typescript
const addCustomPeriod = (
    period: CustomPeriod
): void => {
    if (
        !Number.isFinite(
            period.interval
        ) ||
        period.interval <= 0
    ) {
        throw new Error(
            'The period interval must be positive.'
        );
    }

    stockChart.periods = [
        ...stockChart.periods,
        {
            intervalType:
                period.intervalType,
            interval:
                period.interval,
            text:
                period.text
        }
    ];

    stockChart.refresh();
};
```

Add two weeks:

```typescript
addCustomPeriod({
    text: '2W',
    interval: 2,
    intervalType: 'Weeks'
});
```

Add three months:

```typescript
addCustomPeriod({
    text: '3M',
    interval: 3,
    intervalType: 'Months'
});
```

Do not use:

```typescript
addCustomPeriod(
    '3M',
    90
);
```

because 90 days is not always equal to three calendar months.

Before adding a period, prevent duplicate button text where appropriate.

## Accessibility

The period and range selectors should be supplemented with:

- A visible description of the currently displayed date range.
- A data table when exact values are required.
- Native custom date controls when users need keyboard-accessible range entry.
- A live region for programmatic range changes.
- Sufficient contrast for range handles and period buttons.
- Visible focus styles.
- Labels that distinguish minutes from months.

Avoid ambiguous button labels:

```text
1m
1M
```

Although this convention is common in financial interfaces, it can be confusing. Provide accessible names or nearby explanatory text:

```html
<p id="period-help">
    Lowercase m represents minutes.
    Uppercase M represents months.
</p>
```

Do not rely only on pointer dragging. The Stock Chart also provides label and Date Range interactions for selecting the range.

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

    <title>Stock Chart Selectors</title>

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

        .selector-controls {
            display: flex;
            flex-wrap: wrap;
            align-items: end;
            gap: 12px;
            margin-bottom: 16px;
        }

        .selector-field {
            display: grid;
            gap: 4px;
        }

        .selector-controls input,
        .selector-controls button {
            min-height: 38px;
            box-sizing: border-box;
        }

        .selector-controls button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .selector-controls button:focus-visible,
        .selector-controls input:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #range-status {
            min-height: 24px;
            color: #334155;
        }

        #stock-chart {
            width: 100%;
            min-height: 680px;
        }

        @media (max-width: 767px) {
            body {
                padding: 12px;
            }

            .stock-chart-card {
                padding: 12px;
            }

            #stock-chart {
                min-height: 520px;
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
            Historical Stock Price
        </h1>

        <p id="stock-chart-description">
            Use the period buttons for preset ranges,
            drag the range navigator for a custom
            interval, or enter dates below.
        </p>

        <div class="selector-controls">
            <div class="selector-field">
                <label for="start-date">
                    Start date
                </label>

                <input
                    id="start-date"
                    type="date"
                >
            </div>

            <div class="selector-field">
                <label for="end-date">
                    End date
                </label>

                <input
                    id="end-date"
                    type="date"
                >
            </div>

            <button
                id="apply-date-range"
                type="button"
            >
                Apply Range
            </button>

            <button
                id="reset-date-range"
                type="button"
            >
                Show All
            </button>

            <button
                id="toggle-period-selector"
                type="button"
                aria-pressed="true"
            >
                Hide Period Selector
            </button>

            <button
                id="toggle-range-selector"
                type="button"
                aria-pressed="true"
            >
                Hide Range Selector
            </button>
        </div>

        <p
            id="range-status"
            role="status"
            aria-live="polite"
        ></p>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description range-status"
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
    RangeTooltip,
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
    CandleSeries,
    RangeTooltip
);

const stockData: StockData[] = [
    {
        date: new Date(2024, 0, 2),
        open: 100,
        high: 106,
        low: 98,
        close: 104,
        volume: 1050000
    },
    {
        date: new Date(2024, 1, 1),
        open: 104,
        high: 111,
        low: 102,
        close: 108,
        volume: 1180000
    },
    {
        date: new Date(2024, 2, 1),
        open: 108,
        high: 114,
        low: 105,
        close: 112,
        volume: 970000
    },
    {
        date: new Date(2024, 3, 1),
        open: 112,
        high: 119,
        low: 109,
        close: 116,
        volume: 1230000
    },
    {
        date: new Date(2024, 4, 1),
        open: 116,
        high: 121,
        low: 110,
        close: 113,
        volume: 1320000
    },
    {
        date: new Date(2024, 5, 3),
        open: 113,
        high: 120,
        low: 111,
        close: 118,
        volume: 1160000
    },
    {
        date: new Date(2024, 6, 1),
        open: 118,
        high: 125,
        low: 116,
        close: 123,
        volume: 1420000
    },
    {
        date: new Date(2024, 7, 1),
        open: 123,
        high: 128,
        low: 119,
        close: 121,
        volume: 1380000
    },
    {
        date: new Date(2024, 8, 2),
        open: 121,
        high: 130,
        low: 120,
        close: 128,
        volume: 1510000
    },
    {
        date: new Date(2024, 9, 1),
        open: 128,
        high: 133,
        low: 124,
        close: 131,
        volume: 1450000
    },
    {
        date: new Date(2024, 10, 1),
        open: 131,
        high: 136,
        low: 126,
        close: 129,
        volume: 1270000
    },
    {
        date: new Date(2024, 11, 2),
        open: 129,
        high: 138,
        low: 128,
        close: 136,
        volume: 1590000
    },
    {
        date: new Date(2025, 0, 2),
        open: 136,
        high: 142,
        low: 132,
        close: 140,
        volume: 1620000
    },
    {
        date: new Date(2025, 1, 3),
        open: 140,
        high: 145,
        low: 135,
        close: 138,
        volume: 1480000
    },
    {
        date: new Date(2025, 2, 3),
        open: 138,
        high: 147,
        low: 137,
        close: 145,
        volume: 1710000
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
            'Historical Stock Price',
        enablePeriodSelector: true,
        enableSelector: true,
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
                bearFillColor: '#DC2626',
                bullFillColor: '#16A34A'
            }
        ],
        indicatorType: [],
        trendlineType: [],
        exportType: []
    });

stockChart.appendTo(host);

const setRangeStatus = (
    message: string
): void => {
    const status:
        HTMLElement | null =
            document.querySelector(
                '#range-status'
            );

    if (status) {
        status.textContent =
            message;
    }
};

const parseDateInput = (
    value: string
): Date | null => {
    if (!value) {
        return null;
    }

    const date: Date =
        new Date(
            `${value}T00:00:00`
        );

    return Number.isFinite(
        date.getTime()
    )
        ? date
        : null;
};

const applyButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#apply-date-range'
        );

if (applyButton) {
    applyButton.addEventListener(
        'click',
        (): void => {
            const startInput =
                document.querySelector(
                    '#start-date'
                ) as
                    HTMLInputElement |
                    null;

            const endInput =
                document.querySelector(
                    '#end-date'
                ) as
                    HTMLInputElement |
                    null;

            const startDate:
                Date | null =
                    parseDateInput(
                        startInput?.value ||
                        ''
                    );

            const endDate:
                Date | null =
                    parseDateInput(
                        endInput?.value ||
                        ''
                    );

            if (
                !startDate ||
                !endDate ||
                startDate > endDate
            ) {
                setRangeStatus(
                    'Select a valid start and end date.'
                );

                return;
            }

            endDate.setHours(
                23,
                59,
                59,
                999
            );

            stockChart
                .primaryXAxis
                .minimum =
                    startDate;

            stockChart
                .primaryXAxis
                .maximum =
                    endDate;

            stockChart.dataBind();

            setRangeStatus(
                'The custom date range was applied.'
            );
        }
    );
}

const resetButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#reset-date-range'
        );

if (resetButton) {
    resetButton.addEventListener(
        'click',
        (): void => {
            stockChart
                .primaryXAxis
                .minimum = null;

            stockChart
                .primaryXAxis
                .maximum = null;

            stockChart.dataBind();

            setRangeStatus(
                'The complete date range is displayed.'
            );
        }
    );
}

const periodButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#toggle-period-selector'
        );

if (periodButton) {
    periodButton.addEventListener(
        'click',
        (): void => {
            stockChart
                .enablePeriodSelector =
                    !stockChart
                        .enablePeriodSelector;

            periodButton.setAttribute(
                'aria-pressed',
                String(
                    stockChart
                        .enablePeriodSelector
                )
            );

            periodButton.textContent =
                stockChart
                    .enablePeriodSelector
                    ? 'Hide Period Selector'
                    : 'Show Period Selector';

            stockChart.refresh();
        }
    );
}

const rangeButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#toggle-range-selector'
        );

if (rangeButton) {
    rangeButton.addEventListener(
        'click',
        (): void => {
            stockChart.enableSelector =
                !stockChart
                    .enableSelector;

            rangeButton.setAttribute(
                'aria-pressed',
                String(
                    stockChart
                        .enableSelector
                )
            );

            rangeButton.textContent =
                stockChart
                    .enableSelector
                    ? 'Hide Range Selector'
                    : 'Show Range Selector';

            stockChart.refresh();
        }
    );
}
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

    <title>Stock Chart Selectors</title>

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
            Historical Stock Price
        </h1>

        <p id="stock-chart-description">
            Use the preset periods or range navigator
            to select the displayed date range.
        </p>

        <div
            id="stock-chart"
            aria-describedby="stock-chart-description"
        ></div>
    </main>

    <script>
        var stockData = [
            {
                date: new Date(2024, 0, 2),
                open: 100,
                high: 106,
                low: 98,
                close: 104,
                volume: 1050000
            },
            {
                date: new Date(2024, 3, 1),
                open: 104,
                high: 112,
                low: 102,
                close: 109,
                volume: 1180000
            },
            {
                date: new Date(2024, 6, 1),
                open: 109,
                high: 118,
                low: 106,
                close: 115,
                volume: 1270000
            },
            {
                date: new Date(2024, 9, 1),
                open: 115,
                high: 123,
                low: 112,
                close: 120,
                volume: 1390000
            },
            {
                date: new Date(2025, 0, 2),
                open: 120,
                high: 129,
                low: 117,
                close: 126,
                volume: 1480000
            },
            {
                date: new Date(2025, 3, 1),
                open: 126,
                high: 134,
                low: 123,
                close: 131,
                volume: 1560000
            }
        ];

        var stockChart =
            new ej.charts.StockChart({
                width: '100%',
                height: '680px',
                title:
                    'Historical Stock Price',
                enablePeriodSelector: true,
                enableSelector: true,
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
                        intervalType:
                            'Months',
                        interval: 6,
                        text: '6M'
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
                        name: 'Stock Price'
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

### Period Selector

- Use periods appropriate for the datasource resolution.
- Keep periods in a logical order.
- Mark only one period as selected.
- Use `YTD` and `All` as text-only special entries.
- Use calendar intervals for months, quarters, and years.
- Do not treat period buttons as aggregation controls.
- Hide the selector with `enablePeriodSelector` when it is unnecessary.

### Range Selector

- Use `enableSelector` to control visibility.
- Let Stock Chart manage the integrated range navigator.
- Inject `RangeTooltip` when required.
- Preserve the complete datasource so users can return to earlier ranges.
- Do not mutate undocumented range-selector internals.
- Do not configure a second series through an invented `rangeSelector` object.

### Performance

- Debounce server requests triggered by range changes.
- Abort stale requests.
- Cache historical ranges.
- Aggregate data on the server when appropriate.
- Keep dates sorted.
- Remove duplicate timestamps.
- Avoid replacing the complete historical domain after every thumb movement.

### User Experience

- Distinguish minute and month labels.
- Provide a visible current-range summary.
- Provide external date inputs when precise keyboard entry is required.
- Keep one useful default period.
- Avoid an excessive number of period buttons.
- Test range controls on touch devices and narrow layouts.

## Combined Mistakes and Future References

### Unnecessary RangeSelector Module

Incorrect:

```typescript
import {
    RangeSelector
} from '@syncfusion/ej2-charts';

StockChart.Inject(
    RangeSelector
);
```

Correct:

```typescript
enableSelector: true
```

The integrated Stock Chart range selector is controlled through `enableSelector`.

### Incorrect rangeSelector Object

Incorrect:

```typescript
rangeSelector: {
    enable: true,
    height: 100,
    series: [
        {
            dataSource: stockData
        }
    ]
}
```

Correct:

```typescript
enableSelector: true
```

### Wrong Quarter Value

Incorrect:

```typescript
intervalType: 'Quarters'
```

Correct:

```typescript
intervalType: 'Quarter'
```

The documented interval value is singular.

### Missing Candle Mappings

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

### Period Mistaken for Candle Resolution

Incorrect assumption:

```text
Selecting 5m automatically creates five-minute candles.
```

Correct behavior:

```text
The period selects a five-minute visible range from the
existing datasource.
```

### Incorrect Three-Month Period

Incorrect:

```typescript
{
    intervalType: 'Days',
    interval: 90,
    text: '3M'
}
```

Correct:

```typescript
{
    intervalType: 'Months',
    interval: 3,
    text: '3M'
}
```

### Unsupported selectPeriod Method

Avoid:

```typescript
stockChart.selectPeriod(4);
```

unless the installed Stock Chart API explicitly exposes it.

### Incorrect Axis Property

Incorrect:

```typescript
stockChart.xAxis.minimum =
    startDate;
```

Correct:

```typescript
stockChart
    .primaryXAxis
    .minimum =
        startDate;
```

### Filtering Away the Historical Domain

Avoid:

```typescript
stockChart
    .series[0]
    .dataSource =
        stockData.filter(
            (
                point
            ): boolean => {
                return (
                    point.date >= start &&
                    point.date <= end
                );
            }
        );
```

for simple client-side visible-range selection.

Prefer:

```typescript
stockChart
    .primaryXAxis
    .minimum = start;

stockChart
    .primaryXAxis
    .maximum = end;

stockChart.dataBind();
```

### Unverified Range Events

Avoid claiming:

```typescript
rangeSelected
```

or:

```typescript
periodRender
```

without checking the installed Stock Chart model.

### Fragile Internal CSS

Avoid depending on:

```css
.e-period-selector button
```

unless the selector is documented and validated for the installed release.

### Selector Validation Checklist

Before generating a Stock Chart selector example, verify:

1. `StockChart` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.StockChart`.
3. `DateTime` is imported and injected.
4. Candle usage imports and injects `CandleSeries`.
5. Candle data maps `xName`.
6. Candle data maps `open`.
7. Candle data maps `high`.
8. Candle data maps `low`.
9. Candle data maps `close`.
10. Dates are JavaScript `Date` objects.
11. The period selector uses `periods`.
12. Only one period uses `selected: true`.
13. The interval type uses a supported value.
14. The quarter value is `Quarter`.
15. Months use `Months`.
16. Weeks use `Weeks`.
17. Minutes use `Minutes`.
18. Special `YTD` and `All` entries are configured correctly.
19. Intraday periods match the datasource resolution.
20. Periods are not described as aggregation controls.
21. `enablePeriodSelector` controls period-selector visibility.
22. `enableSelector` controls range-selector visibility.
23. A separate `RangeSelector` module is not injected.
24. An invented `rangeSelector` configuration is not used.
25. `RangeTooltip` is injected when required.
26. Public series data is used for the Stock Chart and navigator.
27. Range-selector internals are not mutated.
28. `primaryXAxis` is used for custom limits.
29. Start and end dates are validated.
30. The start date is not after the end date.
31. The complete source collection is preserved.
32. Period collection changes use `refresh()` when required.
33. Ordinary axis changes call `dataBind()`.
34. Unverified `selectPeriod()` methods are excluded.
35. Unverified period or range events are excluded.
36. Server requests are debounced.
37. Stale requests are canceled.
38. Remote dates are normalized.
39. Duplicate timestamps are handled.
40. Generated internal CSS selectors are avoided.
41. Exact ranges are available through accessible text.
42. Native date controls are used when appropriate.
43. The host exists before `appendTo()`.
44. The host has sufficient width and height.
45. The matching EJ2 stylesheet is loaded.
46. TypeScript and JavaScript examples are complete and runnable.
47. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.