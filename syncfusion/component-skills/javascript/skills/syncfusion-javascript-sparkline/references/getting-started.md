# Getting Started with Sparkline

## Overview

The EJ2 Sparkline is a compact, information-dense visualization designed to display trends within a small area. It is commonly embedded in dashboards, tables, cards, and KPI summaries.

The Sparkline component is included in the `@syncfusion/ej2-charts` package. The minimum dependencies are installed automatically with the package.

This guide covers only:

- EJ2 TypeScript with `@syncfusion/ej2-charts`
- EJ2 JavaScript with `ej.charts.Sparkline`
- npm and bundler-based TypeScript applications
- CDN-based JavaScript applications

Do not use Vue, React, Angular, Composition API, directives, providers, or Single File Components for this implementation.

## Table of Contents

- #installation
  - #typescript-installation
  - #javascript-cdn-setup
- #basic-setup
  - #typescript-import
  - #javascript-global-reference
- #creating-your-first-sparkline
  - #typescript-quick-start
  - #javascript-quick-start
- #sparkline-types
- #data-binding
  - #numeric-array
  - #numeric-object-data
  - #category-data
  - #datetime-data
- #value-type-configuration
- #initial-configuration
  - #dimensions
  - #appearance
  - #container-area
  - #padding
- #complete-typescript-example
- #complete-javascript-example
- #dynamic-data-updates
- #responsive-rendering
- #common-setup-issues
- #combined-mistakes-and-future-references

## Installation

### TypeScript Installation

Install the Charts package:

```bash
npm install @syncfusion/ej2-charts
```

The package manager automatically resolves the minimum dependencies used by Sparkline:

```text
@syncfusion/ej2-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
└── @syncfusion/ej2-svg-base
```

Do not install each transitive dependency separately unless the package manager reports a specific unresolved dependency.

### JavaScript CDN Setup

The simplest JavaScript setup uses the complete EJ2 global bundle.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 JavaScript Sparkline</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="sparkline"></div>
</body>
</html>
```

Using the complete global bundle is safer than manually combining several individual package scripts.

If individual CDN packages are used, ensure that:

- Every package uses the same EJ2 version.
- Dependencies load before `ej2-charts`.
- Sparkline initialization runs after all scripts load.
- The global `ej.charts.Sparkline` constructor is available.

## Basic Setup

### TypeScript Import

Import `Sparkline` from `@syncfusion/ej2-charts`.

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';
```

Basic Sparkline rendering does not require module injection.

Do not use:

```typescript
Sparkline.Inject();
```

Create the component:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        dataSource: [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ]
    });

sparkline.appendTo('#sparkline');
```

### JavaScript Global Reference

Use the global constructor:

```javascript
var sparkline =
    new ej.charts.Sparkline({
        dataSource: [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ]
    });

sparkline.appendTo('#sparkline');
```

## Creating Your First Sparkline

### TypeScript Quick Start

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

    <title>EJ2 TypeScript Sparkline</title>

    <style>
        .sparkline-container {
            width: 300px;
            height: 120px;
        }

        #sparkline {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="sparkline-container">
        <div id="sparkline"></div>
    </div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const sparklineData: number[] = [
    2,
    6,
    4,
    1,
    3,
    2,
    5
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Line',
        valueType: 'Numeric',
        dataSource: sparklineData,
        fill: '#2563EB',
        lineWidth: 2
    });

sparkline.appendTo('#sparkline');
```

When the datasource is a numeric array, do not configure `xName` or `yName`.

### JavaScript Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 JavaScript Sparkline</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .sparkline-container {
            width: 300px;
            height: 120px;
        }

        #sparkline {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div class="sparkline-container">
        <div id="sparkline"></div>
    </div>

    <script>
        var sparklineData = [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '120px',
                type: 'Line',
                valueType: 'Numeric',
                dataSource: sparklineData,
                fill: '#2563EB',
                lineWidth: 2
            });

        sparkline.appendTo('#sparkline');
    </script>
</body>
</html>
```

## Sparkline Types

The Sparkline supports these rendering types:

```text
Line
Column
Area
WinLoss
Pie
```

### Line

Use Line to show a continuous trend.

```typescript
type: 'Line'
```

### Column

Use Column to compare individual values.

```typescript
type: 'Column'
```

### Area

Use Area to emphasize trend magnitude.

```typescript
type: 'Area'
```

### WinLoss

Use WinLoss to classify positive, negative, and neutral results.

```typescript
type: 'WinLoss'
```

Example data:

```typescript
const resultData: number[] = [
    1,
    -1,
    1,
    0,
    -1,
    1
];
```

### Pie

Use Pie to show proportional values in a compact circular visualization.

```typescript
type: 'Pie'
```

## Data Binding

Sparkline supports numeric arrays and object collections.

The configuration must match the datasource structure.

## Numeric Array

Use a simple numeric array when x-values are implicit sequential positions.

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

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: data
    });
```

Do not provide object-field mappings:

```typescript
xName: 'x',
yName: 'yval'
```

when the datasource contains only numbers.

## Numeric Object Data

When the datasource contains numeric x and y fields, set `valueType` to `Numeric`.

```typescript
interface NumericSparklineData {
    sequence: number;
    value: number;
}

const data: NumericSparklineData[] = [
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
    },
    {
        sequence: 5,
        value: 40
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: data,
        xName: 'sequence',
        yName: 'value'
    });
```

## Category Data

Set `valueType` to `Category` when the mapped x-values are strings.

```typescript
interface SalesData {
    month: string;
    sales: number;
}

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

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales'
    });
```

Without the correct `Category` value type, string x-values may not be interpreted as intended.

## DateTime Data

Set `valueType` to `DateTime` when the mapped x-values are JavaScript `Date` objects.

```typescript
interface TimeSeriesData {
    date: Date;
    value: number;
}

const timeSeriesData: TimeSeriesData[] = [
    {
        date: new Date(2023, 0, 1),
        value: 21
    },
    {
        date: new Date(2023, 0, 2),
        value: 24
    },
    {
        date: new Date(2023, 0, 3),
        value: 36
    },
    {
        date: new Date(2023, 0, 4),
        value: 30
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

Use real `Date` objects rather than ambiguous date strings.

Preferred:

```typescript
{
    date: new Date(2023, 0, 1),
    value: 21
}
```

Avoid:

```typescript
{
    date: '01/02/2023',
    value: 21
}
```

JavaScript month indexes begin at zero:

```typescript
new Date(2023, 0, 1)
```

represents January 1, 2023.

## Value Type Configuration

The Sparkline supports:

```text
Numeric
Category
DateTime
```

These values control how mapped x-values are interpreted.

Use:

```typescript
valueType: 'Numeric'
```

for numeric x-values.

Use:

```typescript
valueType: 'Category'
```

for string x-values.

Use:

```typescript
valueType: 'DateTime'
```

for JavaScript `Date` values.

Unlike the Range Navigator, Sparkline uses:

```typescript
valueType: 'Numeric'
```

Do not incorrectly replace it with:

```typescript
valueType: 'Double'
```

## Initial Configuration

### Dimensions

Set component dimensions using:

```typescript
width: '300px',
height: '120px'
```

Responsive width:

```typescript
width: '100%'
```

The parent container must have an available width.

```css
.sparkline-container {
    width: 100%;
    max-width: 400px;
    height: 120px;
}
```

### Appearance

For a Line Sparkline:

```typescript
fill: '#2563EB',
lineWidth: 2
```

For a Column Sparkline:

```typescript
fill: '#2563EB'
```

For an Area Sparkline:

```typescript
fill: 'rgba(37, 99, 235, 0.30)',
lineWidth: 2
```

Component border:

```typescript
border: {
    color: '#CBD5E1',
    width: 1
}
```

### Container Area

Use `containerArea` to style the Sparkline plotting container.

```typescript
containerArea: {
    background: '#FFFFFF',
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

### Padding

Use `padding` to create space between the rendered Sparkline and its boundaries.

```typescript
padding: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
}
```

## Complete TypeScript Example

This example includes:

- Complete TypeScript typing
- Category datasource mapping
- Column Sparkline
- Responsive dimensions
- Container styling
- Marker configuration
- High-point and low-point colors
- Dynamic data updating
- Correct host-container validation

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

    <title>Sales Sparkline</title>


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
            max-width: 420px;
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
            gap: 8px;
            margin-bottom: 12px;
        }

        .sparkline-toolbar button {
            padding: 7px 12px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        #sparkline {
            width: 100%;
            height: 140px;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-title"
    >
        <h1 id="sparkline-title">
            Monthly Sales
        </h1>

        <p id="sparkline-description">
            Sales performance from January through June.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="update-data"
                type="button"
            >
                Update Data
            </button>

            <button
                id="reset-data"
                type="button"
            >
                Reset Data
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
    Sparkline
} from '@syncfusion/ej2-charts';

interface SalesData {
    month: string;
    sales: number;
}

const initialSalesData: SalesData[] = [
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

const updatedSalesData: SalesData[] = [
    {
        month: 'Jan',
        sales: 38
    },
    {
        month: 'Feb',
        sales: 33
    },
    {
        month: 'Mar',
        sales: 41
    },
    {
        month: 'Apr',
        sales: 36
    },
    {
        month: 'May',
        sales: 46
    },
    {
        month: 'Jun',
        sales: 49
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
        height: '140px',
        type: 'Column',
        valueType: 'Category',
        dataSource: initialSalesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        negativePointColor: '#DC2626',
        border: {
            color: '#1D4ED8',
            width: 1
        },
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#E2E8F0',
                width: 1
            }
        },
        padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        },
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 6,
            fill: '#FFFFFF',
            border: {
                color: '#0F172A',
                width: 1
            }
        }
    });

sparkline.appendTo(
    sparklineElement
);

const updateButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#update-data'
        );

if (updateButton) {
    updateButton.addEventListener(
        'click',
        (): void => {
            sparkline.dataSource =
                updatedSalesData;

            sparkline.dataBind();
        }
    );
}

const resetButton:
    HTMLButtonElement | null =
        document.querySelector(
            '#reset-data'
        );

if (resetButton) {
    resetButton.addEventListener(
        'click',
        (): void => {
            sparkline.dataSource =
                initialSalesData;

            sparkline.dataBind();
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

    <title>Sales Sparkline</title>

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
            max-width: 420px;
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
            gap: 8px;
            margin-bottom: 12px;
        }

        .sparkline-toolbar button {
            padding: 7px 12px;
            border: 1px solid #CBD5E1;
            border-radius: 6px;
            background: #FFFFFF;
            cursor: pointer;
        }

        #sparkline {
            width: 100%;
            height: 140px;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-title"
    >
        <h1 id="sparkline-title">
            Monthly Sales
        </h1>

        <p id="sparkline-description">
            Sales performance from January through June.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="update-data"
                type="button"
            >
                Update Data
            </button>

            <button
                id="reset-data"
                type="button"
            >
                Reset Data
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>
    </main>

    <script>
        var initialSalesData = [
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

        var updatedSalesData = [
            {
                month: 'Jan',
                sales: 38
            },
            {
                month: 'Feb',
                sales: 33
            },
            {
                month: 'Mar',
                sales: 41
            },
            {
                month: 'Apr',
                sales: 36
            },
            {
                month: 'May',
                sales: 46
            },
            {
                month: 'Jun',
                sales: 49
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '140px',
                type: 'Column',
                valueType: 'Category',
                dataSource:
                    initialSalesData,
                xName: 'month',
                yName: 'sales',
                fill: '#2563EB',
                highPointColor: '#15803D',
                lowPointColor: '#DC2626',
                negativePointColor:
                    '#DC2626',
                border: {
                    color: '#1D4ED8',
                    width: 1
                },
                containerArea: {
                    background: '#FFFFFF',
                    border: {
                        color: '#E2E8F0',
                        width: 1
                    }
                },
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                },
                markerSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    size: 6,
                    fill: '#FFFFFF',
                    border: {
                        color: '#0F172A',
                        width: 1
                    }
                }
            });

        sparkline.appendTo('#sparkline');

        document
            .getElementById('update-data')
            .addEventListener(
                'click',
                function () {
                    sparkline.dataSource =
                        updatedSalesData;

                    sparkline.dataBind();
                }
            );

        document
            .getElementById('reset-data')
            .addEventListener(
                'click',
                function () {
                    sparkline.dataSource =
                        initialSalesData;

                    sparkline.dataBind();
                }
            );
    </script>
</body>
</html>
```

## Dynamic Data Updates

Replace the datasource:

```typescript
sparkline.dataSource =
    updatedData;
```

Apply the change:

```typescript
sparkline.dataBind();
```

Complete update:

```typescript
sparkline.dataSource =
    updatedData;

sparkline.dataBind();
```

Use `refresh()` only when a complete rerender is required, such as:

- Element dimensions changed.
- A hidden parent became visible.
- Major structural configuration changed.
- The Sparkline must recalculate its complete layout.

## Responsive Rendering

Use percentage width:

```typescript
width: '100%'
```

Ensure the parent defines an available width:

```css
.sparkline-container {
    width: 100%;
    max-width: 400px;
    height: 120px;
}
```

If manual refresh is required, debounce it:

```typescript
let resizeTimer:
    number | undefined;

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
                    sparkline.refresh();
                },
                150
            );
    }
);
```

Do not call `refresh()` for every raw resize event without debouncing.

## Common Setup Issues

### Sparkline Does Not Render

Validate the container:

```typescript
const container:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (!container) {
    throw new Error(
        'Sparkline container was not found.'
    );
}
```

Then render:

```typescript
sparkline.appendTo(container);
```

Also verify:

- The script runs after the host element is created.
- The container has an available width.
- The component has a usable height.
- `Sparkline` is imported from the correct package.
- No runtime error occurs before `appendTo()`.

### Data Does Not Render

For a numeric array:

```typescript
dataSource: [
    2,
    6,
    4,
    1,
    3
]
```

Do not add field mappings.

For object data:

```typescript
dataSource: [
    {
        month: 'Jan',
        sales: 35
    }
],
xName: 'month',
yName: 'sales',
valueType: 'Category'
```

Ensure that field names match exactly.

### Category Data Appears Incorrectly

Use:

```typescript
valueType: 'Category'
```

when `xName` maps to strings.

### DateTime Data Appears Incorrectly

Use:

```typescript
valueType: 'DateTime'
```

and bind JavaScript `Date` objects.

### JavaScript Namespace Is Undefined

If this fails:

```javascript
new ej.charts.Sparkline({});
```

verify that the EJ2 global script loaded before initialization:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Hidden Container Sizing

If Sparkline is initialized inside a hidden tab, dialog, accordion, or panel, call:

```typescript
sparkline.refresh();
```

after the parent becomes visible.

## Combined Mistakes and Future References

### xName and yName Used with Numeric Array

Incorrect:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        dataSource: [
            2,
            6,
            4,
            1
        ],
        xName: 'x',
        yName: 'yval'
    });
```

Correct:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        dataSource: [
            2,
            6,
            4,
            1
        ]
    });
```

### Missing valueType for Category Data

Incomplete:

```typescript
dataSource: salesData,
xName: 'month',
yName: 'sales'
```

Correct:

```typescript
valueType: 'Category',
dataSource: salesData,
xName: 'month',
yName: 'sales'
```

### Missing valueType for DateTime Data

Incomplete:

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

### Using Double Instead of Numeric

Incorrect for Sparkline:

```typescript
valueType: 'Double'
```

Correct:

```typescript
valueType: 'Numeric'
```

Sparkline value types are `Numeric`, `Category`, and `DateTime`.

### Invalid Date Strings

Avoid:

```typescript
{
    date: '01/02/2023',
    value: 21
}
```

Use:

```typescript
{
    date: new Date(2023, 0, 2),
    value: 21
}
```

### Missing Field Mapping

Datasource:

```typescript
const data = [
    {
        month: 'Jan',
        sales: 35
    }
];
```

Incorrect:

```typescript
xName: 'x',
yName: 'y'
```

Correct:

```typescript
xName: 'month',
yName: 'sales'
```

### Unnecessary Module Injection

Do not use:

```typescript
Sparkline.Inject();
```

Basic Sparkline rendering does not require feature injection.

### Unnecessary Separate Dependency Installation

Preferred:

```bash
npm install @syncfusion/ej2-charts
```

Do not require separate installation of `ej2-base`, `ej2-data`, and `ej2-svg-base` for a normal npm setup unless a specific resolution problem occurs.

### Version-Mismatched CDN Scripts

Do not combine different EJ2 package versions.

Prefer the complete global bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Updating Data Without dataBind

Incomplete:

```typescript
sparkline.dataSource =
    updatedData;
```

Correct:

```typescript
sparkline.dataSource =
    updatedData;

sparkline.dataBind();
```

### Refreshing Unnecessarily

For an ordinary datasource or property update, use:

```typescript
sparkline.dataBind();
```

Use:

```typescript
sparkline.refresh();
```

only when complete layout recalculation is required.

### Final Runtime-Safety Checklist

Before returning a Sparkline solution, verify:

1. The implementation is TypeScript or JavaScript.
2. TypeScript imports `Sparkline` from `@syncfusion/ej2-charts`.
3. JavaScript uses `ej.charts.Sparkline`.
4. The host element exists.
5. The selector matches the host ID.
6. The component has a usable width.
7. The component has a usable height.
8. The theme stylesheet is loaded.
9. The Sparkline type is supported.
10. Numeric arrays do not use `xName` or `yName`.
11. Object collections use correct field mappings.
12. Numeric x-values use `Numeric`.
13. String x-values use `Category`.
14. Date x-values use `DateTime`.
15. DateTime data uses JavaScript `Date` objects.
16. `xName` matches the datasource x-field.
17. `yName` matches the datasource y-field.
18. Dynamic updates call `dataBind()`.
19. Hidden-container rendering calls `refresh()` after visibility.
20. Manual resize refreshes are debounced.
21. Different CDN package versions are not mixed.
22. Unnecessary module injection is not added.
23. TypeScript and JavaScript examples are complete and runnable.
24. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.