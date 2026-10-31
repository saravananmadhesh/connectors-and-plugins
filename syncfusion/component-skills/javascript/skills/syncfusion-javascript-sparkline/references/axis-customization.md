# Axis Customization

## Overview

The EJ2 Sparkline is intentionally compact and does not render conventional x-axis or y-axis labels like the EJ2 Chart component. Its `axisSettings` property configures the horizontal reference line and the minimum and maximum values used to calculate the plotting range.

The supported `axisSettings` properties are:

- `minX`
- `maxX`
- `minY`
- `maxY`
- `value`
- `lineSettings`

The documented model does not contain `labelStyle`, `lineStyle`, separate x-axis labels, or separate y-axis labels.

Use:

```typescript
axisSettings: {
    lineSettings: {
        visible: true,
        color: '#64748B',
        width: 1,
        opacity: 1
    }
}
```

Do not use:

```typescript
axisSettings: {
    lineStyle: {
        color: '#64748B',
        width: 1
    },
    labelStyle: {
        color: '#334155'
    }
}
```

## Table of Contents

- #understanding-the-sparkline-axis
- #value-types
- #horizontal-axis-line
- #axis-origin
- #axis-ranges
- #dynamic-range-calculation
- #shared-scale-across-sparklines
- #displaying-point-information
- #datetime-data
- #category-data
- #dynamic-axis-updates
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Understanding the Sparkline Axis

A Sparkline is a compact trend visualization rather than a full Chart. It does not display conventional horizontal and vertical axes with tick marks and text labels.

Instead, Sparkline axis configuration controls:

1. How x-values are interpreted through `valueType`.
2. The minimum and maximum plotting ranges.
3. The y-value at which the horizontal reference line is rendered.
4. The visual appearance of that horizontal reference line.

A complete axis configuration has the following structure:

```typescript
axisSettings: {
    minX: 0,
    maxX: 6,
    minY: -10,
    maxY: 50,
    value: 0,
    lineSettings: {
        visible: true,
        color: '#64748B',
        width: 1,
        opacity: 1
    }
}
```

The `value` property defines the y-value at which the horizontal axis line is placed. Its default is zero.

## Value Types

Sparkline supports three x-axis value types:

- `Numeric`
- `Category`
- `DateTime`

The `valueType` must correspond to the field mapped through `xName`.

### Numeric

Use `Numeric` when x-values are numbers:

```typescript
valueType: 'Numeric'
```

```typescript
dataSource: [
    {
        sequence: 1,
        value: 35
    },
    {
        sequence: 2,
        value: 28
    }
],
xName: 'sequence',
yName: 'value'
```

A plain numeric array also uses implicit sequential positions:

```typescript
valueType: 'Numeric',
dataSource: [
    35,
    28,
    34,
    32,
    40
]
```

Do not specify `xName` or `yName` for a plain numeric array.

### Category

Use `Category` when x-values are strings:

```typescript
valueType: 'Category'
```

```typescript
dataSource: [
    {
        month: 'Jan',
        sales: 35
    },
    {
        month: 'Feb',
        sales: 28
    }
],
xName: 'month',
yName: 'sales'
```

Category values control point ordering and tooltip or data-label content. They are not automatically displayed as a conventional x-axis beneath the Sparkline.

### DateTime

Use `DateTime` when x-values are JavaScript `Date` objects:

```typescript
valueType: 'DateTime'
```

```typescript
dataSource: [
    {
        date: new Date(2025, 0, 1),
        value: 21
    },
    {
        date: new Date(2025, 1, 1),
        value: 24
    }
],
xName: 'date',
yName: 'value'
```

Syncfusion documents `Numeric`, `Category`, and `DateTime` as the supported Sparkline value types.

## Horizontal Axis Line

The Sparkline axis line is configured through `axisSettings.lineSettings`.

```typescript
axisSettings: {
    lineSettings: {
        visible: true,
        color: '#64748B',
        width: 1,
        opacity: 1
    }
}
```

### Hide the Axis Line

```typescript
axisSettings: {
    lineSettings: {
        visible: false
    }
}
```

### Customize Line Color

```typescript
axisSettings: {
    lineSettings: {
        visible: true,
        color: '#2563EB'
    }
}
```

### Customize Line Width

```typescript
axisSettings: {
    lineSettings: {
        visible: true,
        width: 2
    }
}
```

### Customize Line Opacity

```typescript
axisSettings: {
    lineSettings: {
        visible: true,
        color: '#64748B',
        width: 1,
        opacity: 0.75
    }
}
```

## Axis Origin

The `axisSettings.value` property controls the y-value at which the horizontal reference line is rendered.

For positive and negative data, use zero:

```typescript
axisSettings: {
    value: 0,
    lineSettings: {
        visible: true,
        color: '#64748B',
        width: 1
    }
}
```

Example data:

```typescript
const varianceData: number[] = [
    12,
    -5,
    8,
    -3,
    16,
    -8,
    10
];
```

Values above zero appear on one side of the reference line, while negative values appear on the other side.

A custom reference value can also be used:

```typescript
axisSettings: {
    value: 50,
    minY: 0,
    maxY: 100,
    lineSettings: {
        visible: true,
        color: '#DC2626',
        width: 1
    }
}
```

This renders the horizontal reference line at `50`.

## Axis Ranges

Use the following properties to define the Sparkline plotting range:

```typescript
axisSettings: {
    minX: 0,
    maxX: 6,
    minY: 0,
    maxY: 50
}
```

The properties are numeric:

- `minX` defines the minimum x-value.
- `maxX` defines the maximum x-value.
- `minY` defines the minimum y-value.
- `maxY` defines the maximum y-value.

### Y-Axis Range

```typescript
axisSettings: {
    minY: 0,
    maxY: 50
}
```

This is useful when:

- Values must be evaluated against a known target range.
- Multiple Sparklines must use the same scale.
- Automatic scaling exaggerates small differences.
- Positive and negative values must use a stable baseline.

### X-Axis Range

For explicit numeric x-values:

```typescript
interface NumericData {
    sequence: number;
    value: number;
}

const data: NumericData[] = [
    {
        sequence: 1,
        value: 35
    },
    {
        sequence: 2,
        value: 28
    },
    {
        sequence: 3,
        value: 34
    },
    {
        sequence: 4,
        value: 32
    }
];

const sparkline: Sparkline =
    new Sparkline({
        valueType: 'Numeric',
        dataSource: data,
        xName: 'sequence',
        yName: 'value',
        axisSettings: {
            minX: 1,
            maxX: 4,
            minY: 0,
            maxY: 40
        }
    });
```

For a plain numeric array, x-values are implicit indexes. If the collection has six values, the indexes normally range from zero through five:

```typescript
const data: number[] = [
    35,
    28,
    34,
    32,
    40,
    42
];

const sparkline: Sparkline =
    new Sparkline({
        valueType: 'Numeric',
        dataSource: data,
        axisSettings: {
            minX: 0,
            maxX: 5,
            minY: 0,
            maxY: 50
        }
    });
```

Do not use `maxX: 6` merely because the array contains six records unless an additional right-side range is intentionally required.

## Dynamic Range Calculation

Calculate a range from the bound y-values.

```typescript
const data: number[] = [
    2,
    6,
    4,
    1,
    3,
    2,
    5
];

const minimum: number =
    Math.min(...data);

const maximum: number =
    Math.max(...data);
```

Add proportional padding:

```typescript
const difference: number =
    maximum - minimum;

const padding: number =
    difference === 0
        ? Math.max(
            Math.abs(maximum) * 0.1,
            1
        )
        : difference * 0.1;

const minimumY: number =
    minimum - padding;

const maximumY: number =
    maximum + padding;
```

Apply the range:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: data,
        axisSettings: {
            minY: minimumY,
            maxY: maximumY,
            value: 0,
            lineSettings: {
                visible: true,
                color: '#94A3B8',
                width: 1
            }
        }
    });
```

### Range Utility for Object Data

```typescript
interface SalesData {
    month: string;
    sales: number;
}

interface NumericRange {
    minimum: number;
    maximum: number;
}

const getPaddedRange = (
    values: number[],
    paddingRatio: number = 0.1
): NumericRange => {
    const finiteValues: number[] =
        values.filter(
            (value: number): boolean => {
                return Number.isFinite(value);
            }
        );

    if (finiteValues.length === 0) {
        return {
            minimum: 0,
            maximum: 1
        };
    }

    const minimum: number =
        Math.min(...finiteValues);

    const maximum: number =
        Math.max(...finiteValues);

    const difference: number =
        maximum - minimum;

    const padding: number =
        difference === 0
            ? Math.max(
                Math.abs(maximum) *
                    paddingRatio,
                1
            )
            : difference *
                paddingRatio;

    return {
        minimum:
            minimum - padding,
        maximum:
            maximum + padding
    };
};
```

Usage:

```typescript
const range: NumericRange =
    getPaddedRange(
        salesData.map(
            (
                item: SalesData
            ): number => {
                return item.sales;
            }
        )
    );
```

```typescript
axisSettings: {
    minY: range.minimum,
    maxY: range.maximum
}
```

## Shared Scale Across Sparklines

A shared scale makes multiple Sparklines visually comparable.

```typescript
const commonAxisSettings = {
    minY: 0,
    maxY: 100,
    value: 0,
    lineSettings: {
        visible: true,
        color: '#CBD5E1',
        width: 1,
        opacity: 1
    }
};
```

First Sparkline:

```typescript
const firstSparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        dataSource: firstData,
        axisSettings:
            commonAxisSettings
    });

firstSparkline.appendTo(
    '#first-sparkline'
);
```

Second Sparkline:

```typescript
const secondSparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        dataSource: secondData,
        axisSettings: {
            minY: 0,
            maxY: 100,
            value: 0,
            lineSettings: {
                visible: true,
                color: '#CBD5E1',
                width: 1,
                opacity: 1
            }
        }
    });

secondSparkline.appendTo(
    '#second-sparkline'
);
```

Use separate configuration objects when individual runtime updates are expected, so changing one Sparkline does not unintentionally affect another shared object.

## Displaying Point Information

Sparkline does not render conventional axis labels. Use the following supported features to display point information:

- `dataLabelSettings`
- `tooltipSettings`
- Surrounding HTML text
- Accessible summaries

### Data Labels

```typescript
dataLabelSettings: {
    visible: [
        'All'
    ],
    format: '${x} : ${y}'
}
```

Data labels support `All`, `Start`, `End`, `High`, `Low`, and `Negative` visibility categories.

### Tooltip

Tooltips require `SparklineTooltip` in TypeScript:

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

```typescript
tooltipSettings: {
    visible: true,
    format: '${x} : ${y}'
}
```

### Surrounding Category Labels

When persistent category text is necessary, render it outside the Sparkline:

```html
<div class="sparkline-card">
    <div id="sparkline"></div>

    <div
        class="category-summary"
        aria-hidden="true"
    >
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
    </div>
</div>
```

```css
.category-summary {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: #64748B;
    font-size: 11px;
}
```

These are external HTML labels, not Sparkline axis labels. Maintain their alignment carefully in responsive layouts.

## DateTime Data

Configure `DateTime` explicitly:

```typescript
interface TimeSeriesData {
    date: Date;
    value: number;
}

const timeSeriesData:
    TimeSeriesData[] = [
        {
            date:
                new Date(2025, 0, 1),
            value: 21
        },
        {
            date:
                new Date(2025, 0, 2),
            value: 24
        },
        {
            date:
                new Date(2025, 0, 3),
            value: 36
        }
    ];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'DateTime',
        dataSource: timeSeriesData,
        xName: 'date',
        yName: 'value'
    });
```

Sparkline requires `valueType: 'DateTime'` when the mapped x-values are dates.

Use JavaScript `Date` objects:

```typescript
new Date(2025, 0, 1)
```

Avoid ambiguous strings:

```typescript
'01/02/2025'
```

DateTime x-range values, when manually configured, are numeric timestamp values:

```typescript
axisSettings: {
    minX:
        new Date(
            2025,
            0,
            1
        ).getTime(),
    maxX:
        new Date(
            2025,
            0,
            3
        ).getTime(),
    minY: 0,
    maxY: 40
}
```

In most DateTime scenarios, let Sparkline calculate the x-range automatically unless a specific fixed domain is required.

## Category Data

Configure `Category` explicitly:

```typescript
interface ProductData {
    product: string;
    sales: number;
}

const productData: ProductData[] = [
    {
        product: 'A',
        sales: 35
    },
    {
        product: 'B',
        sales: 28
    },
    {
        product: 'C',
        sales: 34
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Category',
        dataSource: productData,
        xName: 'product',
        yName: 'sales',
        axisSettings: {
            minY: 0,
            maxY: 40,
            value: 0,
            lineSettings: {
                visible: true,
                color: '#CBD5E1',
                width: 1
            }
        }
    });
```

String x-values require `valueType: 'Category'`.

Do not use category strings directly for `minX` and `maxX` because those axis-range properties are numeric.

## Dynamic Axis Updates

Update the y-range:

```typescript
sparkline.axisSettings.minY = 0;
sparkline.axisSettings.maxY = 100;
sparkline.dataBind();
```

Update the reference-line value:

```typescript
sparkline.axisSettings.value = 50;
sparkline.dataBind();
```

Update the axis-line color:

```typescript
sparkline
    .axisSettings
    .lineSettings
    .color = '#DC2626';

sparkline.dataBind();
```

Hide the axis line:

```typescript
sparkline
    .axisSettings
    .lineSettings
    .visible = false;

sparkline.dataBind();
```

Use `dataBind()` for ordinary property changes.

Use `refresh()` when:

- Component dimensions changed.
- A hidden parent became visible.
- The Sparkline requires complete layout recalculation.
- Major structural settings changed.

## Complete TypeScript Example

This example includes:

- Category data
- Correct `valueType`
- Explicit y-axis range
- Configurable reference line
- Tooltip and tracker line
- High and low data labels
- Dynamic range controls
- Correct imports and module injection
- Complete HTML container
- Responsive width

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

    <title>Sparkline Axis Customization</title>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .sparkline-card {
            width: 100%;
            max-width: 560px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-card h1 {
            margin: 0 0 4px;
            font-size: 20px;
        }

        .sparkline-card p {
            margin: 0 0 16px;
            color: #475569;
        }

        .sparkline-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .sparkline-toolbar button {
            padding: 7px 12px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .sparkline-toolbar button:focus-visible {
            outline: 3px solid #93C5FD;
            outline-offset: 2px;
        }

        #sparkline {
            width: 100%;
            height: 190px;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Quarterly Revenue
        </h1>

        <p id="sparkline-description">
            The horizontal reference line represents
            the selected revenue baseline.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="use-fixed-range"
                type="button"
            >
                Use Fixed Range
            </button>

            <button
                id="use-data-range"
                type="button"
            >
                Use Data Range
            </button>

            <button
                id="toggle-axis"
                type="button"
            >
                Hide Axis Line
            </button>

            <button
                id="move-axis"
                type="button"
            >
                Move Baseline to 30
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

interface RevenueData {
    quarter: string;
    revenue: number;
}

interface NumericRange {
    minimum: number;
    maximum: number;
}

Sparkline.Inject(
    SparklineTooltip
);

const revenueData: RevenueData[] = [
    {
        quarter: 'Q1',
        revenue: 35
    },
    {
        quarter: 'Q2',
        revenue: 28
    },
    {
        quarter: 'Q3',
        revenue: 42
    },
    {
        quarter: 'Q4',
        revenue: 32
    }
];

const getPaddedRange = (
    values: number[]
): NumericRange => {
    const finiteValues: number[] =
        values.filter(
            (value: number): boolean => {
                return Number.isFinite(value);
            }
        );

    if (finiteValues.length === 0) {
        return {
            minimum: 0,
            maximum: 1
        };
    }

    const minimum: number =
        Math.min(...finiteValues);

    const maximum: number =
        Math.max(...finiteValues);

    const difference: number =
        maximum - minimum;

    const padding: number =
        difference === 0
            ? Math.max(
                Math.abs(maximum) * 0.1,
                1
            )
            : difference * 0.15;

    return {
        minimum:
            minimum - padding,
        maximum:
            maximum + padding
    };
};

const calculatedRange: NumericRange =
    getPaddedRange(
        revenueData.map(
            (
                item: RevenueData
            ): number => {
                return item.revenue;
            }
        )
    );

const sparklineElement:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (!sparklineElement) {
    throw new Error(
        'The Sparkline container was not found.'
    );
}

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '190px',
        type: 'Column',
        valueType: 'Category',
        dataSource: revenueData,
        xName: 'quarter',
        yName: 'revenue',
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        axisSettings: {
            minY: 0,
            maxY: 50,
            value: 0,
            lineSettings: {
                visible: true,
                color: '#64748B',
                width: 1,
                opacity: 1
            }
        },
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 7,
            fill: '#FFFFFF',
            border: {
                color: '#0F172A',
                width: 1
            }
        },
        dataLabelSettings: {
            visible: [
                'High',
                'Low'
            ],
            format: '${y}',
            fill: '#FFFFFF',
            opacity: 0.95,
            border: {
                color: '#64748B',
                width: 1
            },
            textStyle: {
                color: '#0F172A',
                size: '11px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                opacity: 1
            }
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}',
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
                fontWeight: '500',
                opacity: 1
            },
            trackLineSettings: {
                visible: true,
                color: '#64748B',
                width: 1
            }
        },
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#E2E8F0',
                width: 1
            }
        },
        padding: {
            left: 12,
            right: 12,
            top: 24,
            bottom: 12
        }
    });

sparkline.appendTo(
    sparklineElement
);

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
    '#use-fixed-range',
    (): void => {
        sparkline.axisSettings.minY = 0;
        sparkline.axisSettings.maxY = 50;
        sparkline.dataBind();
    }
);

bindButton(
    '#use-data-range',
    (): void => {
        sparkline.axisSettings.minY =
            calculatedRange.minimum;

        sparkline.axisSettings.maxY =
            calculatedRange.maximum;

        sparkline.dataBind();
    }
);

bindButton(
    '#toggle-axis',
    (): void => {
        const lineSettings =
            sparkline
                .axisSettings
                .lineSettings;

        lineSettings.visible =
            !lineSettings.visible;

        const button:
            HTMLButtonElement | null =
                document.querySelector(
                    '#toggle-axis'
                );

        if (button) {
            button.textContent =
                lineSettings.visible
                    ? 'Hide Axis Line'
                    : 'Show Axis Line';
        }

        sparkline.dataBind();
    }
);

bindButton(
    '#move-axis',
    (): void => {
        const useCustomBaseline:
            boolean =
                sparkline
                    .axisSettings
                    .value !== 30;

        sparkline.axisSettings.value =
            useCustomBaseline
                ? 30
                : 0;

        const button:
            HTMLButtonElement | null =
                document.querySelector(
                    '#move-axis'
                );

        if (button) {
            button.textContent =
                useCustomBaseline
                    ? 'Reset Baseline to 0'
                    : 'Move Baseline to 30';
        }

        sparkline.dataBind();
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

    <title>Sparkline Axis Customization</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 24px;
            background: #F8FAFC;
            color: #0F172A;
            font-family: "Segoe UI", sans-serif;
        }

        .sparkline-card {
            width: 100%;
            max-width: 560px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-card h1 {
            margin: 0 0 4px;
            font-size: 20px;
        }

        .sparkline-card p {
            margin: 0 0 16px;
            color: #475569;
        }

        .sparkline-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .sparkline-toolbar button {
            padding: 7px 12px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        #sparkline {
            width: 100%;
            height: 190px;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Quarterly Revenue
        </h1>

        <p id="sparkline-description">
            The horizontal reference line represents
            the selected revenue baseline.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="use-fixed-range"
                type="button"
            >
                Use Fixed Range
            </button>

            <button
                id="use-data-range"
                type="button"
            >
                Use Data Range
            </button>

            <button
                id="toggle-axis"
                type="button"
            >
                Hide Axis Line
            </button>

            <button
                id="move-axis"
                type="button"
            >
                Move Baseline to 30
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>
    </main>

    <script>
        var revenueData = [
            {
                quarter: 'Q1',
                revenue: 35
            },
            {
                quarter: 'Q2',
                revenue: 28
            },
            {
                quarter: 'Q3',
                revenue: 42
            },
            {
                quarter: 'Q4',
                revenue: 32
            }
        ];

        function getPaddedRange(values) {
            var finiteValues =
                values.filter(
                    function (value) {
                        return Number.isFinite(
                            value
                        );
                    }
                );

            if (
                finiteValues.length === 0
            ) {
                return {
                    minimum: 0,
                    maximum: 1
                };
            }

            var minimum =
                Math.min.apply(
                    null,
                    finiteValues
                );

            var maximum =
                Math.max.apply(
                    null,
                    finiteValues
                );

            var difference =
                maximum - minimum;

            var padding =
                difference === 0
                    ? Math.max(
                        Math.abs(
                            maximum
                        ) * 0.1,
                        1
                    )
                    : difference * 0.15;

            return {
                minimum:
                    minimum - padding,
                maximum:
                    maximum + padding
            };
        }

        var calculatedRange =
            getPaddedRange(
                revenueData.map(
                    function (item) {
                        return item.revenue;
                    }
                )
            );

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '190px',
                type: 'Column',
                valueType: 'Category',
                dataSource:
                    revenueData,
                xName: 'quarter',
                yName: 'revenue',
                fill: '#2563EB',
                highPointColor: '#15803D',
                lowPointColor: '#DC2626',
                axisSettings: {
                    minY: 0,
                    maxY: 50,
                    value: 0,
                    lineSettings: {
                        visible: true,
                        color: '#64748B',
                        width: 1,
                        opacity: 1
                    }
                },
                markerSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    size: 7,
                    fill: '#FFFFFF',
                    border: {
                        color: '#0F172A',
                        width: 1
                    }
                },
                dataLabelSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    format: '${y}',
                    fill: '#FFFFFF',
                    opacity: 0.95,
                    border: {
                        color: '#64748B',
                        width: 1
                    },
                    textStyle: {
                        color: '#0F172A',
                        size: '11px',
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            '600',
                        opacity: 1
                    }
                },
                tooltipSettings: {
                    visible: true,
                    format: '${x} : ${y}',
                    fill: '#111827',
                    border: {
                        color: '#374151',
                        width: 1
                    },
                    textStyle: {
                        color: '#FFFFFF',
                        size: '12px',
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            '500',
                        opacity: 1
                    },
                    trackLineSettings: {
                        visible: true,
                        color: '#64748B',
                        width: 1
                    }
                },
                containerArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#E2E8F0',
                        width: 1
                    }
                },
                padding: {
                    left: 12,
                    right: 12,
                    top: 24,
                    bottom: 12
                }
            });

        sparkline.appendTo(
            '#sparkline'
        );

        document
            .getElementById(
                'use-fixed-range'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .axisSettings
                        .minY = 0;

                    sparkline
                        .axisSettings
                        .maxY = 50;

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'use-data-range'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .axisSettings
                        .minY =
                            calculatedRange
                                .minimum;

                    sparkline
                        .axisSettings
                        .maxY =
                            calculatedRange
                                .maximum;

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'toggle-axis'
            )
            .addEventListener(
                'click',
                function () {
                    var lineSettings =
                        sparkline
                            .axisSettings
                            .lineSettings;

                    lineSettings.visible =
                        !lineSettings.visible;

                    this.textContent =
                        lineSettings.visible
                            ? 'Hide Axis Line'
                            : 'Show Axis Line';

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'move-axis'
            )
            .addEventListener(
                'click',
                function () {
                    var useCustomBaseline =
                        sparkline
                            .axisSettings
                            .value !== 30;

                    sparkline
                        .axisSettings
                        .value =
                            useCustomBaseline
                                ? 30
                                : 0;

                    this.textContent =
                        useCustomBaseline
                            ? 'Reset Baseline to 0'
                            : 'Move Baseline to 30';

                    sparkline.dataBind();
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Range Selection

- Let Sparkline calculate ranges automatically for general trend visualization.
- Use explicit ranges when comparing several Sparklines.
- Include reasonable padding around dynamically calculated values.
- Handle collections in which all values are identical.
- Ignore non-finite values when calculating ranges.
- Use consistent y-ranges for visual comparisons.

### Axis Line

- Use `axisSettings.lineSettings`.
- Keep the reference line visually lighter than the Sparkline data.
- Use `axisSettings.value` to position the reference line.
- Use zero as the baseline for positive and negative comparisons.
- Avoid thick reference lines in compact visualizations.

### Point Information

- Do not expect conventional axis text labels.
- Use data labels for persistent values.
- Use tooltips for hover details.
- Use external HTML when permanent category captions are required.
- Use `valueType` to interpret x-values correctly.

### Responsive Rendering

- Use `width: '100%'`.
- Give the parent an available width.
- Give Sparkline a usable height.
- Call `refresh()` when a hidden parent becomes visible.
- Debounce manual resize refreshes.
- Avoid excessive labels in small containers.

## Combined Mistakes and Future References

### Sparkline Does Not Render Conventional Axis Labels

Incorrect assumption:

```text
Sparkline displays category labels along the x-axis
and numeric labels along the y-axis.
```

Sparkline is a compact visualization and does not expose conventional axis-label settings through `axisSettings`.

Use data labels, tooltips, or external HTML text when visible point information is required.

### Unsupported labelStyle

Incorrect:

```typescript
axisSettings: {
    labelStyle: {
        color: '#0077B6',
        fontFamily: 'Segoe UI',
        fontSize: 11
    }
}
```

The documented `axisSettings` model does not contain `labelStyle`.

### Incorrect lineStyle Property

Incorrect:

```typescript
axisSettings: {
    lineStyle: {
        color: '#0077B6',
        width: 2
    }
}
```

Correct:

```typescript
axisSettings: {
    lineSettings: {
        visible: true,
        color: '#0077B6',
        width: 2,
        opacity: 1
    }
}
```

### Incorrect fontSize Property

Incorrect:

```typescript
fontSize: 11
```

When configuring a supported Sparkline text model, use:

```typescript
size: '11px'
```

However, axis settings themselves do not expose a label text-style model.

### Missing Category valueType

Incorrect:

```typescript
dataSource: categoryData,
xName: 'month',
yName: 'sales'
```

Correct:

```typescript
valueType: 'Category',
dataSource: categoryData,
xName: 'month',
yName: 'sales'
```

Category x-values require `valueType: 'Category'`.

### Missing DateTime valueType

Incorrect:

```typescript
dataSource: timeSeriesData,
xName: 'date',
yName: 'value'
```

Correct:

```typescript
valueType: 'DateTime',
dataSource: timeSeriesData,
xName: 'date',
yName: 'value'
```

DateTime x-values require `valueType: 'DateTime'`.

### Ambiguous Date Strings

Avoid:

```typescript
{
    date: '01/02/2025',
    value: 21
}
```

Use:

```typescript
{
    date: new Date(2025, 0, 2),
    value: 21
}
```

### Incorrect Numeric Array maxX

For six numeric values with implicit indexes, the default index range is zero through five.

Use:

```typescript
axisSettings: {
    minX: 0,
    maxX: 5
}
```

Do not automatically use:

```typescript
maxX: 6
```

unless intentional extra range is required.

### Category minX and maxX Assumption

The documented `minX` and `maxX` properties are numeric.

Do not use category strings:

```typescript
axisSettings: {
    minX: 'Jan',
    maxX: 'Jun'
}
```

Usually, allow Sparkline to calculate the Category x-range automatically.

### Axis Formatting Assumption

Sparkline does not provide conventional axis-label number or DateTime formatting through `axisSettings`.

Do not document:

```typescript
axisSettings: {
    labelFormat: 'C2'
}
```

Use:

- Data-label formatting
- Tooltip formatting
- Preformatted surrounding HTML
- A validated rendering event

### Incorrect Axis Visibility Property

Do not use:

```typescript
axisSettings: {
    visible: false
}
```

Configure line visibility through:

```typescript
axisSettings: {
    lineSettings: {
        visible: false
    }
}
```

### Updating with refresh

Avoid:

```typescript
sparkline.axisSettings.minY = 0;
sparkline.axisSettings.maxY = 100;
sparkline.refresh();
```

Preferred:

```typescript
sparkline.axisSettings.minY = 0;
sparkline.axisSettings.maxY = 100;
sparkline.dataBind();
```

Use `refresh()` only when complete layout recalculation is required.

### Import and Configuration Validation Checklist

Before generating a Sparkline axis example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. Axis configuration uses `axisSettings`.
4. Axis-line configuration uses `lineSettings`.
5. `lineStyle` is not used.
6. Unsupported `axisSettings.labelStyle` is not used.
7. `minX` and `maxX` are numeric when configured.
8. `minY` and `maxY` are numeric when configured.
9. `value` defines the horizontal reference-line position.
10. `lineSettings.visible` controls reference-line visibility.
11. Category data uses `valueType: 'Category'`.
12. DateTime data uses `valueType: 'DateTime'`.
13. Numeric data uses `valueType: 'Numeric'`.
14. DateTime x-values are JavaScript `Date` objects.
15. `xName` matches the datasource x-field.
16. `yName` matches the datasource y-field.
17. Numeric arrays do not use unnecessary field mappings.
18. Sparkline is not described as rendering conventional axis labels.
19. Data labels are used for persistent point values.
20. Tooltips are used for hover details.
21. External HTML is identified as external, not as a Sparkline axis.
22. Dynamic range calculations handle empty data.
23. Dynamic range calculations handle identical values.
24. Non-finite values are excluded from range calculations.
25. Shared comparison Sparklines use consistent y-ranges.
26. Ordinary property updates call `dataBind()`.
27. `refresh()` is reserved for complete rerender scenarios.
28. The host element exists before `appendTo()`.
29. The host selector matches the element ID.
30. The component has sufficient width and height.
31. The EJ2 theme stylesheet is loaded.
32. TypeScript and JavaScript examples are complete and runnable.
33. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.