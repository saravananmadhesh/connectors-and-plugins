# Axes and Labels in Syncfusion HeatMap

- #axis-overview
- #axis-value-types
  - #category-axis
  - #numeric-axis
  - #datetime-axis
- #configuring-axis-labels
  - #category-labels
  - #dynamic-labels
  - #axis-text-style
- #axis-ranges-and-intervals
  - #numeric-range
  - #datetime-range
  - #matrix-dimension-validation
- #label-formatting
  - #numeric-label-formatting
  - #datetime-label-formatting
  - #custom-category-labels
- #label-rotation-and-intersection
- #axis-positioning
  - #inversed-axis
  - #opposed-axis
  - #rtl-layout
- #axis-titles
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Axis Overview

The Syncfusion HeatMap contains an X-axis and a Y-axis.

The axes identify the column and row represented by each HeatMap cell.

```text
X-axis -> Identifies HeatMap columns.
Y-axis -> Identifies HeatMap rows.
```

Each axis can be configured independently with:

```text
Value type
Labels
Minimum and maximum values
Intervals
Date interval type
Label formatting
Label rotation
Intersection behavior
Text style
Inversed direction
Opposed position
Axis title
```

For a matrix data source, the number of X-axis positions must correspond to the number of columns, and the number of Y-axis positions must correspond to the number of rows.

Example:

```typescript
dataSource: [
    [10, 20, 30],
    [40, 50, 60]
]
```

The matrix contains:

```text
2 rows
3 columns
```

Therefore, a category-axis configuration requires:

```typescript
xAxis: {
    labels: [
        'A',
        'B',
        'C'
    ]
},

yAxis: {
    labels: [
        'X',
        'Y'
    ]
}
```

## Axis Value Types

HeatMap axes support different value types for different data structures.

The primary value types are:

```text
Category
Numeric
DateTime
```

Choose the value type according to the meaning of the axis rather than the HeatMap cell values.

### Category Axis

Use a Category axis when the axis represents discrete text categories.

Typical category values include:

- Product names.
- Countries.
- Regions.
- Departments.
- Months represented as names.
- Quarters.
- Status categories.
- Employee names.
- Machine identifiers.

### Category Axis TypeScript Example

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const data: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        xAxis: {
            valueType: 'Category',

            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ]
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                '2021',
                '2022',
                '2023'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### Category Axis JavaScript Example

```javascript
var data = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        xAxis: {
            valueType: 'Category',

            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4'
            ]
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                '2021',
                '2022',
                '2023'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Category labels are displayed according to their position in the label collection.

```text
First X-axis label  -> First matrix column
Second X-axis label -> Second matrix column
First Y-axis label  -> First matrix row
Second Y-axis label -> Second matrix row
```

### Numeric Axis

Use a Numeric axis when the axis represents a continuous numeric scale.

Typical numeric dimensions include:

- Age ranges.
- Temperature levels.
- Distance.
- Percentage thresholds.
- Height or weight intervals.
- Numeric measurement ranges.
- Time represented as numeric units.

A Numeric axis is configured through:

```text
minimum
maximum
interval
```

### Numeric Axis TypeScript Example

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const data: number[][] = [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        xAxis: {
            valueType: 'Numeric',
            minimum: 0,
            maximum: 80,
            interval: 20
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Product A',
                'Product B',
                'Product C'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

The following numeric configuration generates five X-axis positions:

```typescript
minimum: 0,
maximum: 80,
interval: 20
```

Generated positions:

```text
0
20
40
60
80
```

The bound matrix must therefore contain five columns.

```typescript
dataSource: [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
]
```

Do not configure six numeric positions for a five-column matrix.

### Numeric Axis JavaScript Example

```javascript
var data = [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        xAxis: {
            valueType: 'Numeric',
            minimum: 0,
            maximum: 80,
            interval: 20
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Product A',
                'Product B',
                'Product C'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Do not normally combine an automatically generated Numeric axis with a separate category-style `labels` collection.

Avoid:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20,

    labels: [
        '0',
        '20',
        '40',
        '60',
        '80',
        '100'
    ]
}
```

Preferred:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20
}
```

### DateTime Axis

Use a DateTime axis when the axis represents dates or time intervals.

Typical DateTime values include:

- Days.
- Weeks.
- Months.
- Quarters represented by dates.
- Years.
- Hours.
- Minutes.
- Time-series periods.

A DateTime axis commonly uses:

```text
minimum
maximum
interval
intervalType
labelFormat
```

### DateTime Axis TypeScript Example

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const data: number[][] = [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        xAxis: {
            valueType: 'DateTime',
            minimum: new Date(
                2023,
                0,
                1
            ),
            maximum: new Date(
                2023,
                4,
                1
            ),
            interval: 1,
            intervalType: 'Months',
            labelFormat: 'MMM'
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Product A',
                'Product B',
                'Product C'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

The DateTime range contains five monthly positions:

```text
January 2023
February 2023
March 2023
April 2023
May 2023
```

The matrix therefore contains five columns.

### DateTime Axis JavaScript Example

```javascript
var data = [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',

        dataSource: data,

        xAxis: {
            valueType: 'DateTime',
            minimum: new Date(
                2023,
                0,
                1
            ),
            maximum: new Date(
                2023,
                4,
                1
            ),
            interval: 1,
            intervalType: 'Months',
            labelFormat: 'MMM'
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Product A',
                'Product B',
                'Product C'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### DateTime Interval Types

Use a DateTime interval type appropriate to the scale.

Common interval types include:

```text
Years
Months
Days
Hours
Minutes
```

Example with days:

```typescript
xAxis: {
    valueType: 'DateTime',
    minimum: new Date(
        2023,
        0,
        1
    ),
    maximum: new Date(
        2023,
        0,
        7
    ),
    interval: 1,
    intervalType: 'Days',
    labelFormat: 'dd MMM'
}
```

Example with three-month intervals:

```typescript
xAxis: {
    valueType: 'DateTime',
    minimum: new Date(
        2023,
        0,
        1
    ),
    maximum: new Date(
        2023,
        9,
        1
    ),
    interval: 3,
    intervalType: 'Months',
    labelFormat: 'MMM yyyy'
}
```

Ensure the matrix column count matches the number of generated date positions.

### Timezone Guidance

JavaScript `Date` objects can be affected by local timezone behavior.

For date-only data:

- Construct dates consistently.
- Avoid mixing local-date and UTC-date creation.
- Verify labels in each required timezone.
- Confirm server date formats before creating `Date` objects.
- Avoid parsing ambiguous strings such as `01/02/2023`.

Prefer an explicit constructor:

```typescript
new Date(
    2023,
    0,
    1
)
```

or a validated ISO date format:

```typescript
new Date(
    '2023-01-01T00:00:00Z'
)
```

Do not mix both approaches without validating the resulting dates.

## Configuring Axis Labels

### Category Labels

Set category labels through the `labels` collection.

```typescript
xAxis: {
    valueType: 'Category',

    labels: [
        'January',
        'February',
        'March'
    ]
}
```

```typescript
yAxis: {
    valueType: 'Category',

    labels: [
        'Laptop',
        'Phone',
        'Tablet'
    ]
}
```

The label counts must match the corresponding matrix dimensions.

### Dynamic Labels

Axis labels can be derived from application data.

```typescript
interface ProductRow {
    Product: string;
    Jan: number;
    Feb: number;
    Mar: number;
}

const productData: ProductRow[] = [
    {
        Product: 'Laptop',
        Jan: 73,
        Feb: 39,
        Mar: 26
    },
    {
        Product: 'Phone',
        Jan: 93,
        Feb: 58,
        Mar: 53
    },
    {
        Product: 'Tablet',
        Jan: 99,
        Feb: 28,
        Mar: 22
    }
];

const matrix: number[][] =
    productData.map(
        (
            item: ProductRow
        ): number[] => {
            return [
                item.Jan,
                item.Feb,
                item.Mar
            ];
        }
    );

const productLabels: string[] =
    productData.map(
        (
            item: ProductRow
        ): string => {
            return item.Product;
        }
    );
```

Use the generated data:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: matrix,

        xAxis: {
            valueType: 'Category',

            labels: [
                'Jan',
                'Feb',
                'Mar'
            ]
        },

        yAxis: {
            valueType: 'Category',
            labels: productLabels
        }
    });

heatmap.appendTo('#heatmap');
```

### Axis Text Style

Use the axis `textStyle` property to customize label text.

```typescript
xAxis: {
    labels: [
        'Q1',
        'Q2',
        'Q3'
    ],

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '13px',
        color: '#333333'
    }
}
```

Y-axis example:

```typescript
yAxis: {
    labels: [
        '2021',
        '2022',
        '2023'
    ],

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        size: '12px',
        color: '#555555'
    }
}
```

Do not mix HeatMap axis text styling with an unsupported `labelStyle` object.

Avoid:

```typescript
xAxis: {
    labelStyle: {
        size: '14px',
        color: '#333333'
    }
}
```

Preferred:

```typescript
xAxis: {
    textStyle: {
        size: '14px',
        color: '#333333'
    }
}
```

## Axis Ranges and Intervals

### Numeric Range

A Numeric axis requires a valid range and positive interval.

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20
}
```

Validate:

```text
minimum < maximum
interval > 0
```

Avoid:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 100,
    maximum: 0,
    interval: 0
}
```

The number of generated positions can be calculated as:

```text
((maximum - minimum) / interval) + 1
```

For example:

```text
minimum = 0
maximum = 100
interval = 20

Position count = ((100 - 0) / 20) + 1
Position count = 6
```

The corresponding matrix must contain six columns.

### DateTime Range

A DateTime axis requires:

```text
A valid minimum date
A valid maximum date
minimum earlier than maximum
A positive interval
A suitable interval type
```

Example:

```typescript
xAxis: {
    valueType: 'DateTime',
    minimum: new Date(
        2023,
        0,
        1
    ),
    maximum: new Date(
        2023,
        5,
        1
    ),
    interval: 1,
    intervalType: 'Months',
    labelFormat: 'MMM'
}
```

### Matrix Dimension Validation

Validate a matrix before rendering.

```typescript
const isRectangularMatrix = (
    data: unknown
): data is number[][] => {
    if (
        !Array.isArray(data) ||
        data.length === 0 ||
        !Array.isArray(data[0])
    ) {
        return false;
    }

    const columnCount: number =
        data[0].length;

    if (columnCount === 0) {
        return false;
    }

    return data.every(
        (row: unknown): boolean => {
            return (
                Array.isArray(row) &&
                row.length === columnCount
            );
        }
    );
};
```

Validate category labels:

```typescript
const validateCategoryDimensions = (
    data: number[][],
    xLabels: string[],
    yLabels: string[]
): boolean => {
    const rowCount: number =
        data.length;

    const columnCount: number =
        rowCount > 0
            ? data[0].length
            : 0;

    return (
        xLabels.length ===
            columnCount &&
        yLabels.length ===
            rowCount
    );
};
```

## Label Formatting

### Numeric Label Formatting

Use a numeric format supported by the HeatMap axis formatter.

Example:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%'
}
```

Currency example:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 1000,
    interval: 200,
    labelFormat: '${value}'
}
```

Do not assume that chart-style composite formats such as the following are supported:

```typescript
labelFormat: '{value:N2}'
```

Use a validated HeatMap number format or an axis-label customization event when more advanced formatting is required.

### DateTime Label Formatting

Month abbreviation:

```typescript
labelFormat: 'MMM'
```

Month and year:

```typescript
labelFormat: 'MMM yyyy'
```

Day and month:

```typescript
labelFormat: 'dd MMM'
```

Year:

```typescript
labelFormat: 'yyyy'
```

Choose a format that matches the DateTime interval.

```text
Years  -> yyyy
Months -> MMM or MMM yyyy
Days   -> dd MMM
Hours  -> HH:mm
```

### Custom Category Labels

Category labels already contain their displayed text.

Preferred:

```typescript
xAxis: {
    valueType: 'Category',

    labels: [
        'Month: Jan',
        'Month: Feb',
        'Month: Mar'
    ]
}
```

Do not assume that the following automatically prefixes Category labels:

```typescript
xAxis: {
    valueType: 'Category',
    labelFormat: 'Month: {value}'
}
```

For category labels, construct the intended text before assigning the `labels` collection.

```typescript
const months: string[] = [
    'Jan',
    'Feb',
    'Mar'
];

const formattedMonths: string[] =
    months.map(
        (month: string): string => {
            return (
                'Month: ' +
                month
            );
        }
    );
```

Apply the result:

```typescript
xAxis: {
    valueType: 'Category',
    labels: formattedMonths
}
```

## Label Rotation and Intersection

Use `labelRotation` to rotate axis labels.

```typescript
xAxis: {
    labels: [
        'Very Long Category Name 1',
        'Very Long Category Name 2',
        'Very Long Category Name 3'
    ],

    labelRotation: 45
}
```

Use rotation when:

- Labels are long.
- The HeatMap has many columns.
- Horizontal labels overlap.
- Additional vertical space is available.

Avoid excessive rotation that makes labels difficult to read.

### Label Intersection Behavior

Use `labelIntersectAction` to control overlapping labels.

Example:

```typescript
xAxis: {
    labels: [
        'North America',
        'South America',
        'Western Europe',
        'Eastern Europe'
    ],

    labelRotation: 45,
    labelIntersectAction: 'None'
}
```

Use only values supported by the installed HeatMap version.

Do not place text-overflow properties inside `textStyle` unless the installed axis model explicitly supports them.

Avoid:

```typescript
textStyle: {
    textOverflow: 'Wrap'
}
```

Control intersection through the axis-level intersection and rotation properties.

### Long-Label Guidance

When labels overlap:

1. Increase the HeatMap width.
2. Rotate the labels.
3. Shorten the labels.
4. Reduce the font size.
5. Use an opposed axis when appropriate.
6. Use a supported intersection action.
7. Show full details in a tooltip or adjacent text.
8. Reduce the number of displayed categories.

## Axis Positioning

### Inversed Axis

Use `isInversed` to reverse axis order.

Reverse the X-axis:

```typescript
xAxis: {
    isInversed: true
}
```

Reverse the Y-axis:

```typescript
yAxis: {
    isInversed: true
}
```

Complete example:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ],
            isInversed: true
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ],
            isInversed: true
        }
    });

heatmap.appendTo('#heatmap');
```

Use axis inversion for:

- Newest-first time display.
- Domain-specific orientation.
- Reverse category ordering.
- Matching another visualization.

Axis inversion is independent of RTL layout.

### Opposed Axis

Use `opposedPosition` to place an axis on the opposite side.

X-axis on the opposite side:

```typescript
xAxis: {
    opposedPosition: true
}
```

Y-axis on the opposite side:

```typescript
yAxis: {
    opposedPosition: true
}
```

Example:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ],
            opposedPosition: true
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ],
            opposedPosition: true
        }
    });

heatmap.appendTo('#heatmap');
```

Validate the opposed positions with:

- Axis titles.
- Long labels.
- Legend position.
- HeatMap margins.
- Page direction.
- Responsive breakpoints.

### RTL Layout

Use `enableRtl` to enable right-to-left component layout.

```typescript
const heatmap: HeatMap =
    new HeatMap({
        enableRtl: true,

        dataSource: [
            [73, 39, 26, 39],
            [93, 58, 53, 38],
            [99, 28, 22, 4]
        ],

        xAxis: {
            labels: [
                'الربع الأول',
                'الربع الثاني',
                'الربع الثالث',
                'الربع الرابع'
            ]
        },

        yAxis: {
            labels: [
                'الشرق',
                'الغرب',
                'الشمال'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Use matching document metadata:

```html
<html lang="ar" dir="rtl">
```

Do not treat RTL and axis inversion as the same feature.

```text
enableRtl  -> Controls right-to-left component layout.
isInversed -> Reverses the selected axis order.
```

Use both only when the application requires both behaviors.

## Axis Titles

Use the axis title model supported by HeatMap.

X-axis title:

```typescript
xAxis: {
    labels: [
        'Q1',
        'Q2',
        'Q3',
        'Q4'
    ],

    title: {
        text: 'Quarters',

        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: '600',
            size: '14px',
            color: '#333333'
        }
    }
}
```

Y-axis title:

```typescript
yAxis: {
    labels: [
        '2021',
        '2022',
        '2023'
    ],

    title: {
        text: 'Years',

        textStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: '600',
            size: '14px',
            color: '#333333'
        }
    }
}
```

Do not assume that HeatMap axes use a chart-style string title with a separate `titleStyle`.

Avoid:

```typescript
xAxis: {
    title: 'Quarters',

    titleStyle: {
        size: '16px'
    }
}
```

Preferred:

```typescript
xAxis: {
    title: {
        text: 'Quarters',

        textStyle: {
            size: '16px'
        }
    }
}
```

## Axis and Cell Borders

Do not configure an unverified axis-level border model.

Avoid:

```typescript
xAxis: {
    border: {
        width: 1,
        color: '#cccccc'
    }
}
```

HeatMap cell borders are configured through `cellSettings.border`.

```typescript
cellSettings: {
    border: {
        width: 1,
        color: '#ffffff'
    }
}
```

Complete example:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        cellSettings: {
            showLabel: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        }
    });

heatmap.appendTo('#heatmap');
```

## Complete TypeScript Example

### Required HTML

```html
<div class="heatmap-wrapper">
    <div id="heatmap"></div>
</div>
```

### Required CSS

```css
.heatmap-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    box-sizing: border-box;
}

#heatmap {
    width: 100%;
    min-height: 450px;
}
```

### TypeScript

```typescript
import {
    HeatMap,
    Legend,
    Tooltip,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend,
    Tooltip
);

const performanceData: number[][] = [
    [73, 39, 26, 39],
    [93, 58, 53, 38],
    [99, 28, 22, 4]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource:
            performanceData,

        titleSettings: {
            text:
                'Quarterly Performance',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '16px',
                color: '#1a1a1a'
            }
        },

        xAxis: {
            valueType: 'Category',

            labels: [
                'Quarter 1',
                'Quarter 2',
                'Quarter 3',
                'Quarter 4'
            ],

            labelRotation: 45,
            labelIntersectAction:
                'None',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            },

            title: {
                text: 'Quarter',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    fontStyle:
                        'Normal',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                '2021',
                '2022',
                '2023'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            },

            title: {
                text: 'Year',

                textStyle: {
                    fontFamily:
                        'Segoe UI',
                    fontStyle:
                        'Normal',
                    fontWeight: '600',
                    size: '14px',
                    color: '#333333'
                }
            }
        },

        cellSettings: {
            showLabel: true,

            border: {
                width: 1,
                color: '#ffffff'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            const value: number =
                Number(args.value);

            args.content = [
                'Year: ' +
                String(args.yLabel),
                'Quarter: ' +
                String(args.xLabel),
                'Value: ' +
                (
                    Number.isFinite(value)
                        ? value.toFixed(0)
                        : 'No data'
                )
            ];
        }
    });

heatmap.appendTo('#heatmap');
```

## Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>HeatMap Axes and Labels</title>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
        type="text/javascript"
    ></script>

    <script
        src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
        type="text/javascript"
    ></script>

    <style>
        .heatmap-wrapper {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            box-sizing: border-box;
        }

        #heatmap {
            width: 100%;
            min-height: 450px;
        }
    </style>
</head>
<body>
    <div class="heatmap-wrapper">
        <div id="heatmap"></div>
    </div>

    <script>
        var performanceData = [
            [73, 39, 26, 39],
            [93, 58, 53, 38],
            [99, 28, 22, 4]
        ];

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '450px',

                dataSource:
                    performanceData,

                titleSettings: {
                    text:
                        'Quarterly Performance',

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight: '600',
                        size: '16px',
                        color: '#1a1a1a'
                    }
                },

                xAxis: {
                    valueType:
                        'Category',

                    labels: [
                        'Quarter 1',
                        'Quarter 2',
                        'Quarter 3',
                        'Quarter 4'
                    ],

                    labelRotation: 45,
                    labelIntersectAction:
                        'None',

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            'Normal',
                        size: '12px',
                        color: '#333333'
                    },

                    title: {
                        text: 'Quarter',

                        textStyle: {
                            fontFamily:
                                'Segoe UI',
                            fontStyle:
                                'Normal',
                            fontWeight:
                                '600',
                            size: '14px',
                            color:
                                '#333333'
                        }
                    }
                },

                yAxis: {
                    valueType:
                        'Category',

                    labels: [
                        '2021',
                        '2022',
                        '2023'
                    ],

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            'Normal',
                        size: '12px',
                        color: '#333333'
                    },

                    title: {
                        text: 'Year',

                        textStyle: {
                            fontFamily:
                                'Segoe UI',
                            fontStyle:
                                'Normal',
                            fontWeight:
                                '600',
                            size: '14px',
                            color:
                                '#333333'
                        }
                    }
                },

                cellSettings: {
                    showLabel: true,

                    border: {
                        width: 1,
                        color: '#ffffff'
                    }
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                },

                showTooltip: true,

                tooltipRender:
                    function (args) {
                        var value =
                            Number(
                                args.value
                            );

                        args.content = [
                            'Year: ' +
                            String(
                                args.yLabel
                            ),
                            'Quarter: ' +
                            String(
                                args.xLabel
                            ),
                            'Value: ' +
                            (
                                Number.isFinite(
                                    value
                                )
                                    ? value
                                        .toFixed(0)
                                    : 'No data'
                            )
                        ];
                    }
            });

        heatmap.appendTo('#heatmap');
    </script>
</body>
</html>
```

## Runtime Validation Checklist

```text
✅ HeatMap is imported in TypeScript.
✅ Every injected module is imported.
✅ Global JavaScript does not call HeatMap.Inject.
✅ All CDN scripts use the same EJ2 version.
✅ Scripts load in dependency order.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ The appendTo selector matches the host ID.
✅ The HeatMap has measurable width and height.
✅ The data source is a rectangular matrix.
✅ Category X-axis labels match the matrix-column count.
✅ Category Y-axis labels match the matrix-row count.
✅ Numeric minimum is less than maximum.
✅ Numeric interval is greater than zero.
✅ Numeric positions match the corresponding matrix dimension.
✅ DateTime minimum is earlier than maximum.
✅ DateTime interval is greater than zero.
✅ DateTime interval type matches the intended granularity.
✅ DateTime positions match the corresponding matrix dimension.
✅ Date values are created consistently.
✅ Axis label text uses textStyle.
✅ Category labels are formatted before assignment when necessary.
✅ Numeric labelFormat uses supported placeholders.
✅ DateTime labelFormat matches the interval type.
✅ Label rotation does not make labels unreadable.
✅ labelIntersectAction uses a supported value.
✅ isInversed is used only when axis reversal is required.
✅ enableRtl and isInversed are treated as separate features.
✅ opposedPosition is validated with labels and titles.
✅ Axis titles use the HeatMap title model.
✅ Cell borders use cellSettings.border.
✅ Tooltip values are validated before numeric formatting.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No malformed .min.jsscript URLs exist.
✅ No editor-generated anchor elements exist in CDN URLs.
✅ No strong, br, data-lexical-text, or editor-generated classes remain.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Constructor Selector Pattern

Avoid:

```typescript
const heatmap =
    new HeatMap({
        dataSource: data
    }, '#heatmap');
```

Preferred:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: data
    });

heatmap.appendTo('#heatmap');
```

### Invalid Z-Axis

HeatMap contains an X-axis and a Y-axis.

Do not use:

```typescript
zAxis: {
    valueType: 'Category'
}
```

Use:

```typescript
xAxis: {
    valueType: 'Category'
},

yAxis: {
    valueType: 'Category'
}
```

### Incorrect Axis Text Style

Avoid:

```typescript
xAxis: {
    labelStyle: {
        size: '14px'
    }
}
```

Use:

```typescript
xAxis: {
    textStyle: {
        size: '14px'
    }
}
```

### Text Overflow Inside Text Style

Avoid:

```typescript
xAxis: {
    textStyle: {
        textOverflow: 'Wrap'
    }
}
```

Use the supported axis-level label intersection and rotation properties.

```typescript
xAxis: {
    labelRotation: 45,
    labelIntersectAction: 'None'
}
```

### Numeric Axis with Redundant Labels

Avoid:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20,

    labels: [
        '0',
        '20',
        '40',
        '60',
        '80',
        '100'
    ]
}
```

Preferred:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20
}
```

### Numeric Dimension Mismatch

The following axis creates six positions:

```typescript
xAxis: {
    valueType: 'Numeric',
    minimum: 0,
    maximum: 100,
    interval: 20
}
```

Do not bind a five-column matrix.

Incorrect:

```typescript
dataSource: [
    [10, 20, 30, 40, 50]
]
```

Correct:

```typescript
dataSource: [
    [10, 20, 30, 40, 50, 60]
]
```

### DateTime Dimension Mismatch

This axis produces five monthly positions:

```typescript
xAxis: {
    valueType: 'DateTime',
    minimum: new Date(
        2023,
        0,
        1
    ),
    maximum: new Date(
        2023,
        4,
        1
    ),
    interval: 1,
    intervalType: 'Months'
}
```

Use five matrix columns:

```typescript
dataSource: [
    [10, 20, 30, 40, 50]
]
```

### Category Label Format Assumption

Avoid:

```typescript
xAxis: {
    valueType: 'Category',
    labelFormat: 'Month: {value}'
}
```

Preferred:

```typescript
xAxis: {
    valueType: 'Category',

    labels: [
        'Month: Jan',
        'Month: Feb',
        'Month: Mar'
    ]
}
```

### Unvalidated Composite Numeric Format

Avoid:

```typescript
labelFormat:
    '{value:N2}'
```

unless it is explicitly supported by the installed HeatMap formatter.

Use a validated format:

```typescript
labelFormat:
    '{value}%'
```

### Incorrect Axis Title Model

Avoid:

```typescript
xAxis: {
    title: 'Quarter',
    titleStyle: {
        size: '14px'
    }
}
```

Preferred:

```typescript
xAxis: {
    title: {
        text: 'Quarter',

        textStyle: {
            size: '14px'
        }
    }
}
```

### Unsupported Axis Border

Avoid:

```typescript
xAxis: {
    border: {
        width: 1,
        color: '#cccccc'
    }
}
```

Use the HeatMap cell border:

```typescript
cellSettings: {
    border: {
        width: 1,
        color: '#ffffff'
    }
}
```

### RTL and Inversion Confusion

Do not assume:

```typescript
enableRtl: true
```

automatically requires:

```typescript
isInversed: true
```

Use RTL for component layout:

```typescript
enableRtl: true
```

Use inversion only when axis order must be reversed:

```typescript
xAxis: {
    isInversed: true
}
```

### Ambiguous Date Parsing

Avoid:

```typescript
new Date(
    '01/02/2023'
)
```

The meaning can vary by environment.

Prefer:

```typescript
new Date(
    2023,
    0,
    2
)
```

or a validated ISO value:

```typescript
new Date(
    '2023-01-02T00:00:00Z'
)
```

### Malformed CDN Link

Do not use a URL ending with:

```text
.min.jsscript
```

Use:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
    type="text/javascript"
></script>
```

### Encoded Executable HTML

Do not use:

```html
&lt;div id="heatmap"&gt;&lt;/div&gt;
```

Use:

```html
<div id="heatmap"></div>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```