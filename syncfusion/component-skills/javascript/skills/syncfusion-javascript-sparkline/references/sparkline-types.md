# Sparkline Types

## Overview

The Syncfusion EJ2 Sparkline supports five visualization types:

- `Line`
- `Column`
- `Area`
- `Pie`
- `WinLoss`

Select the visualization through the root-level `type` property:

```typescript
type: 'Line'
```

The selected type determines how `fill`, `lineWidth`, `palette`, markers, special-point colors, and other appearance properties are rendered.

The EJ2 TypeScript control is imported from:

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';
```

The JavaScript global constructor is:

```javascript
ej.charts.Sparkline
```

The five supported Sparkline types are Line, Column, Area, Pie, and WinLoss.

## Table of Contents

- #line-sparkline
- #column-sparkline
- #area-sparkline
- #pie-sparkline
- #winloss-sparkline
- #data-value-types
- #type-selection-guide
- #changing-types-dynamically
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Line Sparkline

A Line Sparkline connects data points using a continuous path.

Use it for:

- Trends over time
- Sequential measurements
- Stock-price movement
- Website traffic
- Temperature changes
- Sensor readings
- Performance history

Configure it through:

```typescript
type: 'Line'
```

Use `fill` for the line color and `lineWidth` for the line thickness:

```typescript
fill: '#2563EB',
lineWidth: 2
```

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

interface PopulationData {
    year: string;
    population: number;
}

const populationData: PopulationData[] = [
    {
        year: '2005',
        population: 20090440
    },
    {
        year: '2006',
        population: 20264080
    },
    {
        year: '2007',
        population: 20434180
    },
    {
        year: '2008',
        population: 21007310
    },
    {
        year: '2009',
        population: 21262640
    },
    {
        year: '2010',
        population: 21515750
    }
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Line',
        valueType: 'Category',
        dataSource: populationData,
        xName: 'year',
        yName: 'population',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 7,
            fill: '#FFFFFF',
            border: {
                color: '#1E3A8A',
                width: 2
            }
        }
    });

sparkline.appendTo('#sparkline');
```

Because `year` contains string values, the example explicitly uses:

```typescript
valueType: 'Category'
```

### JavaScript

```javascript
var populationData = [
    {
        year: '2005',
        population: 20090440
    },
    {
        year: '2006',
        population: 20264080
    },
    {
        year: '2007',
        population: 20434180
    },
    {
        year: '2008',
        population: 21007310
    },
    {
        year: '2009',
        population: 21262640
    },
    {
        year: '2010',
        population: 21515750
    }
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '120px',
        type: 'Line',
        valueType: 'Category',
        dataSource: populationData,
        xName: 'year',
        yName: 'population',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 7,
            fill: '#FFFFFF',
            border: {
                color: '#1E3A8A',
                width: 2
            }
        }
    });

sparkline.appendTo('#sparkline');
```

## Column Sparkline

A Column Sparkline represents each value using a separate vertical column.

Use it for:

- Discrete value comparison
- Monthly or quarterly metrics
- Categorical values
- Revenue comparison
- Positive and negative variance
- Compact KPI summaries

Configure it through:

```typescript
type: 'Column'
```

Use `fill` for the default column color:

```typescript
fill: '#2563EB'
```

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

interface QuarterlySales {
    quarter: string;
    sales: number;
}

const salesData: QuarterlySales[] = [
    {
        quarter: 'Q1',
        sales: 35
    },
    {
        quarter: 'Q2',
        sales: 28
    },
    {
        quarter: 'Q3',
        sales: 34
    },
    {
        quarter: 'Q4',
        sales: 42
    }
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Column',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'quarter',
        yName: 'sales',
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626'
    });

sparkline.appendTo('#sparkline');
```

### JavaScript

```javascript
var salesData = [
    {
        quarter: 'Q1',
        sales: 35
    },
    {
        quarter: 'Q2',
        sales: 28
    },
    {
        quarter: 'Q3',
        sales: 34
    },
    {
        quarter: 'Q4',
        sales: 42
    }
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '120px',
        type: 'Column',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'quarter',
        yName: 'sales',
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626'
    });

sparkline.appendTo('#sparkline');
```

Column points are already visually distinct. Markers are generally more useful with Line and Area Sparklines.

## Area Sparkline

An Area Sparkline renders a line trend with the area beneath the path filled.

Use it for:

- Trend magnitude
- Resource utilization
- Website activity
- Environmental measurements
- Volume changes
- Workload history

Configure it through:

```typescript
type: 'Area'
```

Use:

- `fill` for the area color.
- `lineWidth` for the path thickness.
- `border` when a separate outline is required.
- An RGBA color when a transparent area is preferred.

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const usageData: number[] = [
    3,
    6,
    4,
    1,
    3,
    2,
    5,
    7,
    4,
    2,
    8,
    5
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '140px',
        type: 'Area',
        valueType: 'Numeric',
        dataSource: usageData,
        fill:
            'rgba(37, 99, 235, 0.28)',
        lineWidth: 2,
        border: {
            color: '#1D4ED8',
            width: 1
        },
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 7,
            fill: '#FFFFFF',
            border: {
                color: '#1E3A8A',
                width: 2
            }
        }
    });

sparkline.appendTo('#sparkline');
```

### JavaScript

```javascript
var usageData = [
    3,
    6,
    4,
    1,
    3,
    2,
    5,
    7,
    4,
    2,
    8,
    5
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '140px',
        type: 'Area',
        valueType: 'Numeric',
        dataSource: usageData,
        fill:
            'rgba(37, 99, 235, 0.28)',
        lineWidth: 2,
        border: {
            color: '#1D4ED8',
            width: 1
        },
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 7,
            fill: '#FFFFFF',
            border: {
                color: '#1E3A8A',
                width: 2
            }
        }
    });

sparkline.appendTo('#sparkline');
```

An Area Sparkline shows magnitude relative to a baseline. It does not automatically represent cumulative values. The datasource must contain cumulative values if cumulative behavior is required.

## Pie Sparkline

A Pie Sparkline represents values as proportional segments.

Use it for:

- Part-to-whole relationships
- Budget allocation
- Market share
- Category distribution
- Compact composition summaries

Configure it through:

```typescript
type: 'Pie'
```

Use `palette` to assign segment colors.

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

interface ProductShare {
    product: string;
    share: number;
}

const productData: ProductShare[] = [
    {
        product: 'Product A',
        share: 40
    },
    {
        product: 'Product B',
        share: 30
    },
    {
        product: 'Product C',
        share: 20
    },
    {
        product: 'Product D',
        share: 10
    }
];

const sparkline: Sparkline =
    new Sparkline({
        width: '160px',
        height: '160px',
        type: 'Pie',
        valueType: 'Category',
        dataSource: productData,
        xName: 'product',
        yName: 'share',
        palette: [
            '#2563EB',
            '#EA580C',
            '#15803D',
            '#7C3AED'
        ]
    });

sparkline.appendTo('#sparkline');
```

### JavaScript

```javascript
var productData = [
    {
        product: 'Product A',
        share: 40
    },
    {
        product: 'Product B',
        share: 30
    },
    {
        product: 'Product C',
        share: 20
    },
    {
        product: 'Product D',
        share: 10
    }
];

var sparkline =
    new ej.charts.Sparkline({
        width: '160px',
        height: '160px',
        type: 'Pie',
        valueType: 'Category',
        dataSource: productData,
        xName: 'product',
        yName: 'share',
        palette: [
            '#2563EB',
            '#EA580C',
            '#15803D',
            '#7C3AED'
        ]
    });

sparkline.appendTo('#sparkline');
```

Pie-segment colors are customized through `palette`.

Avoid using a Pie Sparkline when:

- Values represent a time-series trend.
- There are many small categories.
- Positive and negative values must be compared.
- Exact comparison between similar values is essential.
- The values do not represent meaningful proportions.

## WinLoss Sparkline

A WinLoss Sparkline displays positive, negative, and neutral outcomes using uniform segments.

Use it for:

- Wins and losses
- Pass and fail results
- Success and failure history
- Positive and negative status
- Game outcomes
- Binary performance patterns

Configure it through:

```typescript
type: 'WinLoss'
```

Use:

- Positive values for wins.
- Negative values for losses.
- Zero for ties or neutral outcomes.
- `fill` for the positive outcome color.
- `negativePointColor` for losses.
- `tiePointColor` for ties.

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const resultData: number[] = [
    1,
    -1,
    1,
    1,
    0,
    -1,
    1,
    -1,
    1,
    1
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '90px',
        type: 'WinLoss',
        valueType: 'Numeric',
        dataSource: resultData,
        fill: '#15803D',
        negativePointColor: '#DC2626',
        tiePointColor: '#64748B'
    });

sparkline.appendTo('#sparkline');
```

### JavaScript

```javascript
var resultData = [
    1,
    -1,
    1,
    1,
    0,
    -1,
    1,
    -1,
    1,
    1
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '90px',
        type: 'WinLoss',
        valueType: 'Numeric',
        dataSource: resultData,
        fill: '#15803D',
        negativePointColor:
            '#DC2626',
        tiePointColor: '#64748B'
    });

sparkline.appendTo('#sparkline');
```

Do not use `highPointColor` and `lowPointColor` as the primary win and loss colors.

Incorrect:

```typescript
highPointColor: '#15803D',
lowPointColor: '#DC2626'
```

Correct:

```typescript
fill: '#15803D',
negativePointColor: '#DC2626',
tiePointColor: '#64748B'
```

WinLoss is designed to render positive, negative, and neutral outcomes.

## Data Value Types

The Sparkline `valueType` determines how x-values are interpreted.

Supported values are:

```text
Numeric
Category
DateTime
```

### Numeric

Use for numeric x-values or a plain numeric array:

```typescript
valueType: 'Numeric'
```

```typescript
dataSource: [
    2,
    6,
    4,
    1,
    3
]
```

Do not use `xName` and `yName` with a plain numeric array.

### Category

Use for string x-values:

```typescript
valueType: 'Category'
```

```typescript
dataSource: [
    {
        quarter: 'Q1',
        sales: 35
    },
    {
        quarter: 'Q2',
        sales: 28
    }
],
xName: 'quarter',
yName: 'sales'
```

### DateTime

Use for JavaScript `Date` values:

```typescript
valueType: 'DateTime'
```

```typescript
dataSource: [
    {
        date: new Date(2025, 0, 1),
        value: 35
    },
    {
        date: new Date(2025, 0, 2),
        value: 28
    }
],
xName: 'date',
yName: 'value'
```

## Type Selection Guide

### Choose Line When

- The point sequence represents a continuous trend.
- Direction and turning points matter.
- The visualization covers time-series data.
- Exact category-to-category separation is less important.

### Choose Column When

- Every value should appear as a separate visual unit.
- Comparing categories is the primary goal.
- Positive and negative values need a clear baseline.
- Individual values matter more than continuity.

### Choose Area When

- Trend and magnitude are both important.
- A filled visual is appropriate.
- The visualization should emphasize volume or intensity.
- The baseline has meaningful context.

### Choose Pie When

- Values represent parts of a meaningful whole.
- The category count is small.
- Approximate proportional comparison is sufficient.
- Trend direction is not required.

### Choose WinLoss When

- Only positive, negative, and neutral states matter.
- Exact magnitudes should not affect segment height.
- The application shows wins, losses, ties, pass, fail, or neutral outcomes.

## Changing Types Dynamically

Update the `type` property and call `dataBind()`.

```typescript
sparkline.type = 'Column';
sparkline.dataBind();
```

Do not use `refresh()` for an ordinary type-property update unless complete layout recalculation is required.

### Switching Between Line, Column, and Area

These types can usually share the same numeric or mapped datasource:

```typescript
const setSparklineType = (
    type:
        'Line' |
        'Column' |
        'Area'
): void => {
    sparkline.type = type;

    if (type === 'Area') {
        sparkline.fill =
            'rgba(37, 99, 235, 0.28)';
        sparkline.lineWidth = 2;
    } else {
        sparkline.fill = '#2563EB';
        sparkline.lineWidth = 2;
    }

    sparkline.dataBind();
};
```

### Switching to Pie

When switching to Pie:

- Validate that every value is appropriate for proportional display.
- Configure `palette`.
- Review the component dimensions.
- Disable type-specific marker settings when they are not relevant.

```typescript
sparkline.type = 'Pie';

sparkline.palette = [
    '#2563EB',
    '#EA580C',
    '#15803D',
    '#7C3AED'
];

sparkline.markerSettings.visible = [];
sparkline.dataLabelSettings.visible = [];

sparkline.dataBind();
```

### Switching to WinLoss

When switching to WinLoss:

- Use positive, negative, and zero values.
- Set positive, negative, and tie colors.
- Do not interpret segment height as magnitude.

```typescript
sparkline.type = 'WinLoss';
sparkline.dataSource = [
    1,
    -1,
    1,
    0,
    -1,
    1
];

sparkline.fill = '#15803D';
sparkline.negativePointColor =
    '#DC2626';
sparkline.tiePointColor =
    '#64748B';

sparkline.markerSettings.visible = [];
sparkline.dataLabelSettings.visible = [];

sparkline.dataBind();
```

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

    <title>Sparkline Types</title>

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
            max-width: 620px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-card h1 {
            margin: 0 0 6px;
            font-size: 22px;
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
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            color: #0F172A;
            cursor: pointer;
        }

        .sparkline-toolbar button:focus-visible {
            outline: 3px solid #2563EB;
            outline-offset: 2px;
        }

        #sparkline {
            width: 100%;
            height: 220px;
        }

        #sparkline-status {
            margin-top: 12px;
            color: #334155;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Monthly Sales
        </h1>

        <p id="sparkline-description">
            Select a visualization type to display
            the same monthly sales data.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="show-line"
                type="button"
            >
                Line
            </button>

            <button
                id="show-column"
                type="button"
            >
                Column
            </button>

            <button
                id="show-area"
                type="button"
            >
                Area
            </button>

            <button
                id="show-pie"
                type="button"
            >
                Pie
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="
                sparkline-description
                sparkline-status
            "
        ></div>

        <p
            id="sparkline-status"
            role="status"
            aria-live="polite"
        >
            Line Sparkline is displayed.
        </p>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

interface SalesData {
    month: string;
    sales: number;
}

type SupportedSparklineType =
    'Line' |
    'Column' |
    'Area' |
    'Pie';

const salesData: SalesData[] = [
    {
        month: 'Jan',
        sales: 35
    },
    {
        month: 'Feb',
        sales: 28
    },
    {
        month: 'Mar',
        sales: 34
    },
    {
        month: 'Apr',
        sales: 32
    },
    {
        month: 'May',
        sales: 40
    },
    {
        month: 'Jun',
        sales: 42
    }
];

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
        height: '220px',
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        lineWidth: 2,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        palette: [
            '#2563EB',
            '#EA580C',
            '#15803D',
            '#7C3AED',
            '#0891B2',
            '#DB2777'
        ],
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8,
            fill: '#FFFFFF',
            border: {
                color: '#111827',
                width: 2
            }
        },
        dataLabelSettings: {
            visible: [
                'High',
                'Low'
            ],
            format: '${y}',
            fill: '#FFFFFF',
            border: {
                color: '#64748B',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '11px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        },
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#CBD5E1',
                width: 1
            }
        },
        padding: {
            left: 14,
            right: 14,
            top: 28,
            bottom: 14
        }
    });

sparkline.appendTo(
    sparklineElement
);

const statusElement:
    HTMLElement | null =
        document.querySelector(
            '#sparkline-status'
        );

const applyType = (
    type: SupportedSparklineType
): void => {
    sparkline.type = type;

    if (type === 'Line') {
        sparkline.fill = '#2563EB';
        sparkline.lineWidth = 2;

        sparkline
            .markerSettings
            .visible = [
                'High',
                'Low'
            ];

        sparkline
            .dataLabelSettings
            .visible = [
                'High',
                'Low'
            ];
    } else if (type === 'Column') {
        sparkline.fill = '#2563EB';

        sparkline
            .markerSettings
            .visible = [];

        sparkline
            .dataLabelSettings
            .visible = [
                'High',
                'Low'
            ];
    } else if (type === 'Area') {
        sparkline.fill =
            'rgba(37, 99, 235, 0.28)';

        sparkline.lineWidth = 2;

        sparkline
            .markerSettings
            .visible = [
                'High',
                'Low'
            ];

        sparkline
            .dataLabelSettings
            .visible = [
                'High',
                'Low'
            ];
    } else {
        sparkline
            .markerSettings
            .visible = [];

        sparkline
            .dataLabelSettings
            .visible = [];
    }

    sparkline.dataBind();

    if (statusElement) {
        statusElement.textContent =
            `${type} Sparkline is displayed.`;
    }
};

const bindButton = (
    selector: string,
    type: SupportedSparklineType
): void => {
    const button:
        HTMLButtonElement | null =
            document.querySelector(
                selector
            );

    if (button) {
        button.addEventListener(
            'click',
            (): void => {
                applyType(type);
            }
        );
    }
};

bindButton(
    '#show-line',
    'Line'
);

bindButton(
    '#show-column',
    'Column'
);

bindButton(
    '#show-area',
    'Area'
);

bindButton(
    '#show-pie',
    'Pie'
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

    <title>Sparkline Types</title>

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
            max-width: 620px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .sparkline-toolbar button {
            padding: 8px 12px;
            border: 1px solid #64748B;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        #sparkline {
            width: 100%;
            height: 220px;
        }
    </style>
</head>
<body>
    <main class="sparkline-card">
        <h1>
            Monthly Sales
        </h1>

        <p id="sparkline-description">
            Select a visualization type to display
            the same monthly sales data.
        </p>

        <div class="sparkline-toolbar">
            <button id="show-line" type="button">
                Line
            </button>

            <button id="show-column" type="button">
                Column
            </button>

            <button id="show-area" type="button">
                Area
            </button>

            <button id="show-pie" type="button">
                Pie
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="
                sparkline-description
                sparkline-status
            "
        ></div>

        <p
            id="sparkline-status"
            role="status"
            aria-live="polite"
        >
            Line Sparkline is displayed.
        </p>
    </main>

    <script>
        var salesData = [
            {
                month: 'Jan',
                sales: 35
            },
            {
                month: 'Feb',
                sales: 28
            },
            {
                month: 'Mar',
                sales: 34
            },
            {
                month: 'Apr',
                sales: 32
            },
            {
                month: 'May',
                sales: 40
            },
            {
                month: 'Jun',
                sales: 42
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '220px',
                type: 'Line',
                valueType: 'Category',
                dataSource: salesData,
                xName: 'month',
                yName: 'sales',
                fill: '#2563EB',
                lineWidth: 2,
                highPointColor: '#15803D',
                lowPointColor: '#DC2626',
                palette: [
                    '#2563EB',
                    '#EA580C',
                    '#15803D',
                    '#7C3AED',
                    '#0891B2',
                    '#DB2777'
                ],
                markerSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    size: 8,
                    fill: '#FFFFFF',
                    border: {
                        color: '#111827',
                        width: 2
                    }
                },
                dataLabelSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    format: '${y}',
                    fill: '#FFFFFF',
                    border: {
                        color: '#64748B',
                        width: 1
                    },
                    textStyle: {
                        color: '#111827',
                        size: '11px',
                        fontFamily:
                            'Segoe UI',
                        fontWeight: '600'
                    }
                },
                containerArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#CBD5E1',
                        width: 1
                    }
                },
                padding: {
                    left: 14,
                    right: 14,
                    top: 28,
                    bottom: 14
                }
            });

        sparkline.appendTo('#sparkline');

        var statusElement =
            document.getElementById(
                'sparkline-status'
            );

        function applyType(type) {
            sparkline.type = type;

            if (type === 'Line') {
                sparkline.fill =
                    '#2563EB';

                sparkline.lineWidth = 2;

                sparkline
                    .markerSettings
                    .visible = [
                        'High',
                        'Low'
                    ];

                sparkline
                    .dataLabelSettings
                    .visible = [
                        'High',
                        'Low'
                    ];
            } else if (
                type === 'Column'
            ) {
                sparkline.fill =
                    '#2563EB';

                sparkline
                    .markerSettings
                    .visible = [];

                sparkline
                    .dataLabelSettings
                    .visible = [
                        'High',
                        'Low'
                    ];
            } else if (
                type === 'Area'
            ) {
                sparkline.fill =
                    'rgba(37, 99, 235, 0.28)';

                sparkline.lineWidth = 2;

                sparkline
                    .markerSettings
                    .visible = [
                        'High',
                        'Low'
                    ];

                sparkline
                    .dataLabelSettings
                    .visible = [
                        'High',
                        'Low'
                    ];
            } else {
                sparkline
                    .markerSettings
                    .visible = [];

                sparkline
                    .dataLabelSettings
                    .visible = [];
            }

            sparkline.dataBind();

            statusElement.textContent =
                type +
                ' Sparkline is displayed.';
        }

        document
            .getElementById(
                'show-line'
            )
            .addEventListener(
                'click',
                function () {
                    applyType('Line');
                }
            );

        document
            .getElementById(
                'show-column'
            )
            .addEventListener(
                'click',
                function () {
                    applyType('Column');
                }
            );

        document
            .getElementById(
                'show-area'
            )
            .addEventListener(
                'click',
                function () {
                    applyType('Area');
                }
            );

        document
            .getElementById(
                'show-pie'
            )
            .addEventListener(
                'click',
                function () {
                    applyType('Pie');
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Line

- Use for ordered or continuous data.
- Keep `lineWidth` proportionate to the component height.
- Enable selected markers instead of every marker for dense data.
- Use DateTime values for real temporal spacing.

### Column

- Use for discrete comparisons.
- Use a stable y-axis range when comparing multiple Sparklines.
- Use root special-point colors for high, low, and negative values.
- Avoid excessive columns in a very narrow container.

### Area

- Use when magnitude relative to a baseline matters.
- Prefer a partially transparent fill.
- Keep the series outline visible.
- Do not describe all Area data as cumulative unless the datasource is cumulative.

### Pie

- Use for a small number of meaningful proportions.
- Use `palette` for segment colors.
- Provide text or a table identifying each category.
- Avoid using Pie for time-series trends.
- Do not rely only on segment color.

### WinLoss

- Use positive, negative, and zero values.
- Use `fill` for wins.
- Use `negativePointColor` for losses.
- Use `tiePointColor` for ties.
- Do not use segment height as a magnitude indicator.
- Provide textual outcome details when accessibility requires exact results.

## Combined Mistakes and Future References

### Missing Category valueType

Incorrect:

```typescript
dataSource: salesData,
xName: 'quarter',
yName: 'sales'
```

Correct:

```typescript
valueType: 'Category',
dataSource: salesData,
xName: 'quarter',
yName: 'sales'
```

### Missing DateTime valueType

Incorrect:

```typescript
dataSource: stockData,
xName: 'date',
yName: 'price'
```

Correct:

```typescript
valueType: 'DateTime',
dataSource: stockData,
xName: 'date',
yName: 'price'
```

### Area Styling Without lineWidth

Incomplete:

```typescript
type: 'Area',
fill: '#B2DFFF',
border: {
    color: '#0077B6',
    width: 2
}
```

Preferred:

```typescript
type: 'Area',
fill:
    'rgba(37, 99, 235, 0.28)',
lineWidth: 2,
border: {
    color: '#1D4ED8',
    width: 1
}
```

### Incorrect WinLoss Colors

Incorrect:

```typescript
type: 'WinLoss',
highPointColor: '#15803D',
lowPointColor: '#DC2626'
```

Correct:

```typescript
type: 'WinLoss',
fill: '#15803D',
negativePointColor: '#DC2626',
tiePointColor: '#64748B'
```

### Missing Tie Value

WinLoss supports neutral outcomes.

Use:

```typescript
dataSource: [
    1,
    -1,
    0,
    1
]
```

where:

```text
positive = win
negative = loss
zero = tie or neutral
```

### Incorrect Pie valueType

Incomplete for string category fields:

```typescript
type: 'Pie',
dataSource: productData,
xName: 'product',
yName: 'share'
```

Correct:

```typescript
type: 'Pie',
valueType: 'Category',
dataSource: productData,
xName: 'product',
yName: 'share'
```

### Markers Used Indiscriminately

Markers are most useful for Line and Area Sparklines.

For Column, Pie, and WinLoss, validate whether markers improve the visualization before enabling them.

### Using refresh for a Type Update

Avoid:

```typescript
sparkline.type = 'Column';
sparkline.refresh();
```

Preferred:

```typescript
sparkline.type = 'Column';
sparkline.dataBind();
```

### Failing to Reset Type-Specific Settings

When switching to Pie or WinLoss, clear marker and data-label settings that are not appropriate:

```typescript
sparkline.markerSettings.visible = [];
sparkline.dataLabelSettings.visible = [];
sparkline.dataBind();
```

### Type Validation Checklist

Before generating a Sparkline type example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. The selected type is `Line`, `Column`, `Area`, `Pie`, or `WinLoss`.
4. Numeric data uses `valueType: 'Numeric'`.
5. Category data uses `valueType: 'Category'`.
6. DateTime data uses `valueType: 'DateTime'`.
7. DateTime values are JavaScript `Date` objects.
8. Plain numeric arrays do not use unnecessary field mappings.
9. `xName` matches the datasource x-field.
10. `yName` matches the datasource y-field.
11. Line uses `fill` and `lineWidth`.
12. Area uses a suitable fill and `lineWidth`.
13. Column uses `fill`.
14. Pie uses `palette`.
15. Pie data represents meaningful proportions.
16. WinLoss uses positive, negative, and zero values.
17. WinLoss uses `fill` for positive outcomes.
18. WinLoss uses `negativePointColor` for negative outcomes.
19. WinLoss uses `tiePointColor` for neutral outcomes.
20. Markers are used only when appropriate for the selected type.
21. Data-label visibility is an array.
22. Special-point colors are root Sparkline properties.
23. Runtime type updates call `dataBind()`.
24. Type-specific settings are reset when necessary.
25. The host element exists before `appendTo()`.
26. The host has sufficient width and height.
27. The EJ2 theme stylesheet is loaded.
28. The example includes a text description when accessibility requires it.
29. The TypeScript and JavaScript examples are complete and runnable.
30. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.