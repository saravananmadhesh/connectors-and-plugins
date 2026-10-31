# Series Types and Axes Configuration

## Overview

The EJ2 Range Navigator supports three series types:

- `Line`
- `Area`
- `StepLine`

`Spline`, `SplineArea`, and `Column` are not supported Range Navigator series types and must not be included in its series configuration.

The Range Navigator supports the following x-axis value types:

- `Double`
- `DateTime`
- `Category`
- `Logarithmic`

The module required by each enabled series or specialized axis must be imported before initialization and injected using `RangeNavigator.Inject(...)`.

## Table of Contents

- #series-types
  - #required-series-modules
- #line-series
  - #typescript-line-series
  - #javascript-line-series
- #area-series
  - #typescript-area-series
  - #javascript-area-series
- #stepline-series
  - #typescript-stepline-series
  - #javascript-stepline-series
- #axis-configuration
  - #datetime-axis
  - #double-axis
  - #category-axis
  - #logarithmic-axis
- #series-properties
  - #data-binding-properties
  - #appearance-properties
- #multiple-series
- #runtime-series-switching
- #series-type-selection-guide
- #combined-mistakes-and-future-references

## Series Types

A series displays a visual overview of the data inside the Range Navigator. Users can select a smaller range by dragging the left and right slider thumbs.

The selected range can then be used to:

- Restrict the visible data in a Chart.
- Synchronize the selected range with another visualization.
- Filter dashboard data.
- Analyze a smaller portion of a large dataset.
- Select a specific date or numeric interval.

The Range Navigator supports the following series types.

| Series Type | Description | Required Module |
|---|---|---|
| Line | Connects data points using straight lines | `LineSeries` |
| Area | Displays a filled region beneath the series line | `AreaSeries` |
| StepLine | Displays changes using horizontal and vertical line segments | `StepLineSeries` |

### Required Series Modules

Import the corresponding module for every series type used by the Range Navigator.

```typescript
import {
    RangeNavigator,
    LineSeries,
    AreaSeries,
    StepLineSeries
} from '@syncfusion/ej2-charts';
```

Inject the modules before creating the Range Navigator instance.

```typescript
RangeNavigator.Inject(
    LineSeries,
    AreaSeries,
    StepLineSeries
);
```

If only one series type is used, only that series module needs to be injected.

For example, an Area series with a DateTime axis requires:

```typescript
import {
    RangeNavigator,
    AreaSeries,
    DateTime
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

## Line Series

Line series connects data points using straight lines.

Use Line series for:

- Stock-price movement
- Revenue trends
- Sales trends
- Website traffic
- Sensor measurements
- Historical performance

The `LineSeries` module must be imported and injected.

### TypeScript Line Series

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
    <title>Range Navigator Line Series</title>

</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    DateTime,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface RangeData {
    x: Date;
    y: number;
}

RangeNavigator.Inject(
    DateTime,
    LineSeries
);

const data: RangeData[] = [
    { x: new Date(2023, 0, 1), y: 21 },
    { x: new Date(2023, 1, 1), y: 24 },
    { x: new Date(2023, 2, 1), y: 36 },
    { x: new Date(2023, 3, 1), y: 38 },
    { x: new Date(2023, 4, 1), y: 54 },
    { x: new Date(2023, 5, 1), y: 48 },
    { x: new Date(2023, 6, 1), y: 62 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 1, 1),
        new Date(2023, 5, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'Line',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

### JavaScript Line Series

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
    <title>Range Navigator Line Series</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

    <script>
        var data = [
            { x: new Date(2023, 0, 1), y: 21 },
            { x: new Date(2023, 1, 1), y: 24 },
            { x: new Date(2023, 2, 1), y: 36 },
            { x: new Date(2023, 3, 1), y: 38 },
            { x: new Date(2023, 4, 1), y: 54 },
            { x: new Date(2023, 5, 1), y: 48 },
            { x: new Date(2023, 6, 1), y: 62 }
        ];

        var rangeNavigator = new ej.charts.RangeNavigator({
            valueType: 'DateTime',
            value: [
                new Date(2023, 1, 1),
                new Date(2023, 5, 1)
            ],
            labelFormat: 'MMM-yy',
            series: [
                {
                    dataSource: data,
                    xName: 'x',
                    yName: 'y',
                    type: 'Line',
                    width: 2
                }
            ]
        });

        rangeNavigator.appendTo('#range');
    </script>
</body>
</html>
```

The global JavaScript build contains the required component modules. Therefore, the CDN example does not use ES module imports.

## Area Series

Area series renders a filled region between the series line and the axis baseline.

Use Area series when both the trend and magnitude are important.

Recommended scenarios:

- Revenue trends
- Resource consumption
- Energy usage
- Application traffic
- Cumulative measurements
- Stock-price overview panels

The `AreaSeries` module must be imported and injected.

### TypeScript Area Series

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
    <title>Range Navigator Area Series</title>

</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface RangeData {
    x: Date;
    y: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);

const data: RangeData[] = [
    { x: new Date(2023, 0, 1), y: 21 },
    { x: new Date(2023, 1, 1), y: 24 },
    { x: new Date(2023, 2, 1), y: 36 },
    { x: new Date(2023, 3, 1), y: 38 },
    { x: new Date(2023, 4, 1), y: 54 },
    { x: new Date(2023, 5, 1), y: 48 },
    { x: new Date(2023, 6, 1), y: 62 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 1, 1),
        new Date(2023, 5, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'Area',
            fill: '#4472C4',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

### JavaScript Area Series

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
    <title>Range Navigator Area Series</title>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

    <script>
        var data = [
            { x: new Date(2023, 0, 1), y: 21 },
            { x: new Date(2023, 1, 1), y: 24 },
            { x: new Date(2023, 2, 1), y: 36 },
            { x: new Date(2023, 3, 1), y: 38 },
            { x: new Date(2023, 4, 1), y: 54 },
            { x: new Date(2023, 5, 1), y: 48 },
            { x: new Date(2023, 6, 1), y: 62 }
        ];

        var rangeNavigator = new ej.charts.RangeNavigator({
            valueType: 'DateTime',
            value: [
                new Date(2023, 1, 1),
                new Date(2023, 5, 1)
            ],
            labelFormat: 'MMM-yy',
            series: [
                {
                    dataSource: data,
                    xName: 'x',
                    yName: 'y',
                    type: 'Area',
                    fill: '#4472C4',
                    width: 2
                }
            ]
        });

        rangeNavigator.appendTo('#range');
    </script>
</body>
</html>
```

## StepLine Series

StepLine series displays data using horizontal and vertical line segments.

Use StepLine series when a value remains unchanged until another event changes it.

Recommended scenarios:

- Interest-rate changes
- Product-price changes
- Inventory levels
- Machine states
- Subscription-plan changes
- Discrete sensor values

The `StepLineSeries` module must be imported and injected.

### TypeScript StepLine Series

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
    <title>Range Navigator StepLine Series</title>

</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    DateTime,
    RangeNavigator,
    StepLineSeries
} from '@syncfusion/ej2-charts';

interface RangeData {
    x: Date;
    y: number;
}

RangeNavigator.Inject(
    DateTime,
    StepLineSeries
);

const data: RangeData[] = [
    { x: new Date(2023, 0, 1), y: 20 },
    { x: new Date(2023, 1, 1), y: 20 },
    { x: new Date(2023, 2, 1), y: 30 },
    { x: new Date(2023, 3, 1), y: 30 },
    { x: new Date(2023, 4, 1), y: 45 },
    { x: new Date(2023, 5, 1), y: 45 },
    { x: new Date(2023, 6, 1), y: 55 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 1, 1),
        new Date(2023, 5, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'StepLine',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

### JavaScript StepLine Series

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
    <title>Range Navigator StepLine Series</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

</head>
<body>
    <div id="container">
        <div id="range"></div>
    </div>

    <script>
        var data = [
            { x: new Date(2023, 0, 1), y: 20 },
            { x: new Date(2023, 1, 1), y: 20 },
            { x: new Date(2023, 2, 1), y: 30 },
            { x: new Date(2023, 3, 1), y: 30 },
            { x: new Date(2023, 4, 1), y: 45 },
            { x: new Date(2023, 5, 1), y: 45 },
            { x: new Date(2023, 6, 1), y: 55 }
        ];

        var rangeNavigator = new ej.charts.RangeNavigator({
            valueType: 'DateTime',
            value: [
                new Date(2023, 1, 1),
                new Date(2023, 5, 1)
            ],
            labelFormat: 'MMM-yy',
            series: [
                {
                    dataSource: data,
                    xName: 'x',
                    yName: 'y',
                    type: 'StepLine',
                    width: 2
                }
            ]
        });

        rangeNavigator.appendTo('#range');
    </script>
</body>
</html>
```

## Axis Configuration

The `valueType` property determines how the Range Navigator interprets the x-values.

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime'
});
```

The x-values mapped through `xName` must be compatible with the selected `valueType`.

| Data Type | valueType | Required Axis Module |
|---|---|---|
| JavaScript Date objects | `DateTime` | `DateTime` |
| Numbers | `Double` | No additional axis module |
| Text categories | `Category` | `Category` |
| Positive logarithmic values | `Logarithmic` | `Logarithmic` |

## DateTime Axis

Use a DateTime axis when x-values represent dates or timestamps.

The `DateTime` module must be imported and injected.

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

The datasource should contain JavaScript `Date` objects.

```typescript
const data = [
    { x: new Date(2023, 0, 1), y: 21 },
    { x: new Date(2023, 1, 1), y: 24 },
    { x: new Date(2023, 2, 1), y: 36 }
];
```

Configure the Range Navigator as follows:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 0, 1),
        new Date(2023, 2, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'Area'
        }
    ]
});

rangeNavigator.appendTo('#range');
```

Common DateTime label formats include:

- `MMM-yy`
- `MMM yyyy`
- `dd/MM/yyyy`
- `MMM d`
- `HH:mm`

The values inside the `value` array must also be `Date` objects when `valueType` is `DateTime`. The `value` property defines the initially selected start and end values.

## Double Axis

Use the `Double` value type when x-values are numeric.

Do not use `Numeric` as the value type.

### TypeScript Example

```typescript
import {
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface NumericData {
    x: number;
    y: number;
}

RangeNavigator.Inject(LineSeries);

const data: NumericData[] = [
    { x: 10, y: 21 },
    { x: 20, y: 24 },
    { x: 30, y: 36 },
    { x: 40, y: 38 },
    { x: 50, y: 54 },
    { x: 60, y: 58 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'Double',
    value: [20, 50],
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'Line',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

A Double axis does not require a separate axis module. The series module must still be injected.

## Category Axis

Use a Category axis when the x-values are strings.

The `Category` module must be imported and injected.

### TypeScript Example

```typescript
import {
    AreaSeries,
    Category,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface CategoryData {
    product: string;
    sales: number;
}

RangeNavigator.Inject(
    AreaSeries,
    Category
);

const data: CategoryData[] = [
    { product: 'Product A', sales: 120 },
    { product: 'Product B', sales: 180 },
    { product: 'Product C', sales: 150 },
    { product: 'Product D', sales: 210 },
    { product: 'Product E', sales: 175 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'Category',
    series: [
        {
            dataSource: data,
            xName: 'product',
            yName: 'sales',
            type: 'Area'
        }
    ]
});

rangeNavigator.appendTo('#range');
```

When the Category axis is used:

- `xName` must map to a string field.
- `Category` must be imported.
- `Category` must be passed to `RangeNavigator.Inject(...)`.
- Category values should be supplied in the intended display order.

## Logarithmic Axis

Use a Logarithmic axis when numeric x-values span multiple orders of magnitude.

The `Logarithmic` module must be imported and injected.

### TypeScript Example

```typescript
import {
    LineSeries,
    Logarithmic,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface LogarithmicData {
    x: number;
    y: number;
}

RangeNavigator.Inject(
    LineSeries,
    Logarithmic
);

const data: LogarithmicData[] = [
    { x: 1, y: 10 },
    { x: 10, y: 20 },
    { x: 100, y: 35 },
    { x: 1000, y: 42 },
    { x: 10000, y: 55 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'Logarithmic',
    logBase: 10,
    value: [10, 1000],
    series: [
        {
            dataSource: data,
            xName: 'x',
            yName: 'y',
            type: 'Line',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

The x-values of a logarithmic axis must be positive. Zero and negative values cannot be represented on a logarithmic scale.

## Series Properties

The Range Navigator series model provides properties for data binding, series selection, styling, querying, and animation.

### Data Binding Properties

#### dataSource

Defines the collection of records rendered by the series.

```typescript
dataSource: data
```

The datasource can be a local collection or a supported data manager source.

#### xName

Maps the datasource field containing the x-value.

```typescript
xName: 'date'
```

#### yName

Maps the datasource field containing the y-value.

```typescript
yName: 'value'
```

#### type

Specifies how the series is rendered.

```typescript
type: 'Area'
```

Supported values:

```text
Line
Area
StepLine
```

#### query

Defines a data query when a supported remote or managed datasource is used.

```typescript
query: query
```

### Appearance Properties

#### fill

Defines the series color.

```typescript
fill: '#4472C4'
```

#### width

Defines the stroke width. It is mainly applicable to line-based rendering.

```typescript
width: 2
```

#### dashArray

Defines a dashed stroke pattern for a Line series.

```typescript
dashArray: '5,3'
```

#### border

Defines the border appearance.

```typescript
border: {
    color: '#1F2937',
    width: 1
}
```

#### animation

Defines the series animation behavior.

```typescript
animation: {
    enable: true,
    duration: 500
}
```

### Complete Series Configuration

```typescript
series: [
    {
        dataSource: data,
        xName: 'date',
        yName: 'value',
        type: 'Area',
        fill: '#4472C4',
        width: 2,
        border: {
            color: '#1F2937',
            width: 1
        },
        animation: {
            enable: true,
            duration: 500
        }
    }
]
```

## Multiple Series

The Range Navigator can render multiple supported series.

Every series type included in the configuration must have its corresponding module imported and injected before initialization.

### TypeScript Example

```typescript
import {
    AreaSeries,
    DateTime,
    LineSeries,
    RangeNavigator
} from '@syncfusion/ej2-charts';

interface SalesData {
    date: Date;
    sales: number;
}

interface RevenueData {
    date: Date;
    revenue: number;
}

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    LineSeries
);

const salesData: SalesData[] = [
    { date: new Date(2023, 0, 1), sales: 120 },
    { date: new Date(2023, 1, 1), sales: 145 },
    { date: new Date(2023, 2, 1), sales: 138 },
    { date: new Date(2023, 3, 1), sales: 170 },
    { date: new Date(2023, 4, 1), sales: 195 },
    { date: new Date(2023, 5, 1), sales: 215 }
];

const revenueData: RevenueData[] = [
    { date: new Date(2023, 0, 1), revenue: 100 },
    { date: new Date(2023, 1, 1), revenue: 128 },
    { date: new Date(2023, 2, 1), revenue: 118 },
    { date: new Date(2023, 3, 1), revenue: 152 },
    { date: new Date(2023, 4, 1), revenue: 176 },
    { date: new Date(2023, 5, 1), revenue: 198 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 1, 1),
        new Date(2023, 4, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: salesData,
            xName: 'date',
            yName: 'sales',
            type: 'Line',
            fill: '#2563EB',
            width: 2
        },
        {
            dataSource: revenueData,
            xName: 'date',
            yName: 'revenue',
            type: 'Area',
            fill: '#93C5FD',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');
```

The injection list contains both `LineSeries` and `AreaSeries` because both series types are used.

## Runtime Series Switching

When the application changes the series type at runtime, all possible series modules must be imported and injected before the initial render.

### TypeScript Example

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
    <title>Runtime Range Navigator Series Switching</title>

</head>
<body>
    <div class="configuration-panel">
        <label for="series-type">Series type</label>

        <select id="series-type">
            <option value="Line">Line</option>
            <option value="Area" selected>Area</option>
            <option value="StepLine">StepLine</option>
        </select>
    </div>

    <div id="range"></div>

   <script scr="index.js"></script>
</body>
</html>
```

#### index.ts

```typescript
import {
    AreaSeries,
    DateTime,
    LineSeries,
    RangeNavigator,
    StepLineSeries
} from '@syncfusion/ej2-charts';

interface RangeData {
    date: Date;
    value: number;
}

type SupportedSeriesType = 'Line' | 'Area' | 'StepLine';

RangeNavigator.Inject(
    AreaSeries,
    DateTime,
    LineSeries,
    StepLineSeries
);

const data: RangeData[] = [
    { date: new Date(2023, 0, 1), value: 21 },
    { date: new Date(2023, 1, 1), value: 24 },
    { date: new Date(2023, 2, 1), value: 36 },
    { date: new Date(2023, 3, 1), value: 38 },
    { date: new Date(2023, 4, 1), value: 54 },
    { date: new Date(2023, 5, 1), value: 48 },
    { date: new Date(2023, 6, 1), value: 62 },
    { date: new Date(2023, 7, 1), value: 58 },
    { date: new Date(2023, 8, 1), value: 70 },
    { date: new Date(2023, 9, 1), value: 76 },
    { date: new Date(2023, 10, 1), value: 72 },
    { date: new Date(2023, 11, 1), value: 85 }
];

const rangeNavigator: RangeNavigator = new RangeNavigator({
    valueType: 'DateTime',
    value: [
        new Date(2023, 2, 1),
        new Date(2023, 9, 1)
    ],
    labelFormat: 'MMM-yy',
    series: [
        {
            dataSource: data,
            xName: 'date',
            yName: 'value',
            type: 'Area',
            fill: '#4472C4',
            width: 2
        }
    ]
});

rangeNavigator.appendTo('#range');

const seriesTypeElement: HTMLSelectElement | null =
    document.querySelector('#series-type');

if (seriesTypeElement) {
    seriesTypeElement.addEventListener('change', (): void => {
        const selectedType: SupportedSeriesType =
            seriesTypeElement.value as SupportedSeriesType;

        rangeNavigator.series[0].type = selectedType;
        rangeNavigator.refresh();
    });
}
```

All three series modules are injected because the user can switch among `Line`, `Area`, and `StepLine` at runtime.

## Series Type Selection Guide

| Requirement | Recommended Series |
|---|---|
| Display a basic trend | Line |
| Emphasize the magnitude beneath a trend | Area |
| Display discrete state or level changes | StepLine |
| Display stock-price movement | Line or Area |
| Display inventory-level changes | StepLine |
| Display resource usage over time | Area |
| Display smooth curved interpolation | Use the Chart component |
| Display vertical columns | Use the Chart component |

## Combined Mistakes and Future References

### Using Unsupported Series Types

Incorrect:

```typescript
series: [
    {
        type: 'Spline'
    }
]
```

Incorrect:

```typescript
series: [
    {
        type: 'SplineArea'
    }
]
```

Incorrect:

```typescript
series: [
    {
        type: 'Column'
    }
]
```

Supported Range Navigator series types are:

```text
Line
Area
StepLine
```

Use the Chart component when Spline, SplineArea, Column, or another advanced series type is required.

### Using Numeric Instead of Double

Incorrect:

```typescript
valueType: 'Numeric'
```

Correct:

```typescript
valueType: 'Double'
```

### Missing Series Module Injection

Incorrect:

```typescript
import {
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(DateTime);
```

The preceding configuration is incomplete when the Range Navigator uses an Area series.

Correct:

```typescript
import {
    AreaSeries,
    DateTime,
    RangeNavigator
} from '@syncfusion/ej2-charts';

RangeNavigator.Inject(
    AreaSeries,
    DateTime
);
```

### Missing DateTime Module

If the configuration uses:

```typescript
valueType: 'DateTime'
```

the script must import and inject:

```typescript
import { DateTime } from '@syncfusion/ej2-charts';

RangeNavigator.Inject(DateTime);
```

### Missing Category Module

If the configuration uses:

```typescript
valueType: 'Category'
```

the script must import and inject:

```typescript
import { Category } from '@syncfusion/ej2-charts';

RangeNavigator.Inject(Category);
```

### Missing Logarithmic Module

If the configuration uses:

```typescript
valueType: 'Logarithmic'
```

the script must import and inject:

```typescript
import { Logarithmic } from '@syncfusion/ej2-charts';

RangeNavigator.Inject(Logarithmic);
```

### Using Date Strings With DateTime Axis

Avoid relying on environment-dependent date parsing.

Less reliable:

```typescript
const data = [
    { x: '01/02/2023', y: 21 }
];
```

Preferred:

```typescript
const data = [
    { x: new Date(2023, 1, 1), y: 21 }
];
```

### Incorrect JavaScript Month Index

JavaScript month indexes begin at zero.

January:

```typescript
new Date(2023, 0, 1)
```

December:

```typescript
new Date(2023, 11, 1)
```

### value Does Not Match valueType

For a DateTime axis, use Date objects:

```typescript
valueType: 'DateTime',
value: [
    new Date(2023, 0, 1),
    new Date(2023, 5, 1)
]
```

For a Double axis, use numbers:

```typescript
valueType: 'Double',
value: [10, 50]
```

### xName and yName Do Not Match Data Fields

Datasource:

```typescript
const data = [
    {
        date: new Date(2023, 0, 1),
        value: 21
    }
];
```

Incorrect:

```typescript
series: [
    {
        dataSource: data,
        xName: 'x',
        yName: 'y'
    }
]
```

Correct:

```typescript
series: [
    {
        dataSource: data,
        xName: 'date',
        yName: 'value'
    }
]
```

### Creating an Instance Without Rendering It

Incomplete:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator(configuration);
```

Correct:

```typescript
const rangeNavigator: RangeNavigator =
    new RangeNavigator(configuration);

rangeNavigator.appendTo('#range');
```

Alternatively, the selector can be passed to the constructor:

```typescript
const rangeNavigator: RangeNavigator = new RangeNavigator(
    configuration,
    '#range'
);
```

### Runtime Switching Without Injecting All Modules

Incorrect:

```typescript
RangeNavigator.Inject(AreaSeries);
```

The preceding injection is incomplete if the user can switch to Line or StepLine.

Correct:

```typescript
RangeNavigator.Inject(
    AreaSeries,
    LineSeries,
    StepLineSeries
);
```

### Assuming Chart Series Properties Are Supported

Do not copy Chart-specific properties into a Range Navigator series without confirming that the Range Navigator series model supports them.

Properties supported by the Range Navigator series model include:

```typescript
series: [
    {
        animation: {
            enable: true,
            duration: 500
        },
        border: {
            color: '#1F2937',
            width: 1
        },
        dashArray: '5,3',
        dataSource: data,
        fill: '#4472C4',
        type: 'Line',
        width: 2,
        xName: 'x',
        yName: 'y'
    }
]
```

Do not add Chart-only marker or data-label configurations unless they are explicitly supported by the Range Navigator series model.

### Import and Injection Validation Checklist

Before generating or running a Range Navigator example, verify the following:

1. `RangeNavigator` is imported from `@syncfusion/ej2-charts`.
2. Every configured series has its corresponding imported module.
3. Every imported series module is passed to `RangeNavigator.Inject(...)`.
4. `DateTime` is imported and injected when `valueType` is `DateTime`.
5. `Category` is imported and injected when `valueType` is `Category`.
6. `Logarithmic` is imported and injected when `valueType` is `Logarithmic`.
7. No additional axis module is required for `Double`.
8. `valueType` matches the datasource x-value type.
9. `value` contains values compatible with `valueType`.
10. `xName` and `yName` exactly match the datasource fields.
11. Only `Line`, `Area`, or `StepLine` is used as the series type.
12. Every possible series module is injected when runtime switching is supported.
13. The Range Navigator is attached to an existing HTML element.
14. The required Syncfusion theme stylesheet is loaded.
15. JavaScript examples use the global `ej.charts.RangeNavigator` namespace when the EJ2 CDN bundle is loaded.
16. TypeScript examples use ES module imports and `RangeNavigator.Inject(...)`.
17. Vue directives, Composition API functions, providers, and Single File Component syntax are not used.