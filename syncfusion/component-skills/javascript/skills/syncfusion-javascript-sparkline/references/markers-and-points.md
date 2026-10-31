# Markers and Special Points

## Overview

Markers identify individual data points in an EJ2 Sparkline. They are especially useful in Line and Area Sparklines, where a point might otherwise be difficult to locate precisely.

The `markerSettings.visible` property accepts one or more special-point categories:

- `All`
- `Start`
- `End`
- `High`
- `Low`
- `Negative`
- `None`

Marker appearance can be customized using `size`, `fill`, `opacity`, and `border`. Special-point colors such as `highPointColor` and `lowPointColor` belong to the root Sparkline configuration, not inside `markerSettings`.

Correct:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8
        }
    });
```

Incorrect:

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ],
    highPointColor: '#15803D',
    lowPointColor: '#DC2626'
}
```

## Table of Contents

- #marker-visibility
- #special-point-colors
- #basic-marker-setup
- #marker-customization
- #point-specific-styling
- #marker-events
- #runtime-updates
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Marker Visibility

Configure marker visibility through:

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ]
}
```

The visibility collection accepts multiple values.

### All Points

```typescript
markerSettings: {
    visible: [
        'All'
    ]
}
```

Use `All` when:

- The Sparkline has relatively few points.
- Every point must be identifiable.
- The visualization is large enough to avoid marker overlap.
- Tooltip interaction requires a distinct point target.

### Start Point

```typescript
markerSettings: {
    visible: [
        'Start'
    ]
}
```

### End Point

```typescript
markerSettings: {
    visible: [
        'End'
    ]
}
```

### Highest Point

```typescript
markerSettings: {
    visible: [
        'High'
    ]
}
```

### Lowest Point

```typescript
markerSettings: {
    visible: [
        'Low'
    ]
}
```

### Negative Points

```typescript
markerSettings: {
    visible: [
        'Negative'
    ]
}
```

### Multiple Special Points

```typescript
markerSettings: {
    visible: [
        'Start',
        'End',
        'High',
        'Low',
        'Negative'
    ]
}
```

### Hide All Markers

Use an empty collection:

```typescript
markerSettings: {
    visible: []
}
```

A support-safe alternative is:

```typescript
markerSettings: {
    visible: [
        'None'
    ]
}
```

## Special-Point Colors

Special-point colors are root-level Sparkline properties.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        startPointColor: '#7C3AED',
        endPointColor: '#EA580C',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        negativePointColor: '#B91C1C',
        tiePointColor: '#64748B',
        markerSettings: {
            visible: [
                'Start',
                'End',
                'High',
                'Low',
                'Negative'
            ]
        }
    });
```

Use:

- `startPointColor` for the first point.
- `endPointColor` for the final point.
- `highPointColor` for the maximum value.
- `lowPointColor` for the minimum value.
- `negativePointColor` for values below zero.
- `tiePointColor` for neutral values in a WinLoss Sparkline.

The official marker examples place `highPointColor` and `lowPointColor` at Sparkline root level.

## Basic Marker Setup

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

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
        width: '100%',
        height: '120px',
        type: 'Line',
        valueType: 'Numeric',
        dataSource: data,
        fill: '#2563EB',
        lineWidth: 2,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ]
        }
    });

sparkline.appendTo('#sparkline');
```

Markers do not require module injection.

Do not use:

```typescript
Sparkline.Inject();
```

### JavaScript

```javascript
var data = [
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
        dataSource: data,
        fill: '#2563EB',
        lineWidth: 2,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ]
        }
    });

sparkline.appendTo('#sparkline');
```

## Marker Customization

Marker appearance is configured inside `markerSettings`.

Supported marker customization includes:

- `visible`
- `size`
- `fill`
- `opacity`
- `border`

The documented default marker size is `8`, and default opacity is `1`.

### Marker Size

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ],
    size: 8
}
```

Do not use CSS to resize generated Sparkline markers. Use the supported `size` property.

### Marker Fill

```typescript
markerSettings: {
    visible: [
        'All'
    ],
    fill: '#FFFFFF'
}
```

The common marker fill is applied to points not overridden by a special-point color.

### Marker Opacity

```typescript
markerSettings: {
    visible: [
        'All'
    ],
    fill: '#FFFFFF',
    opacity: 0.9
}
```

Opacity should be between zero and one.

### Marker Border

```typescript
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
}
```

### Complete Marker Configuration

```typescript
markerSettings: {
    visible: [
        'Start',
        'End',
        'High',
        'Low'
    ],
    size: 9,
    fill: '#FFFFFF',
    opacity: 1,
    border: {
        color: '#111827',
        width: 2
    }
}
```

Sparkline marker customization supports fill, opacity, size, and border styling.

## Point-Specific Styling

### Highlight Highest and Lowest Values

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        dataSource: [
            35,
            28,
            42,
            32,
            40,
            38
        ],
        fill: '#2563EB',
        lineWidth: 2,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 9,
            fill: '#FFFFFF',
            border: {
                color: '#111827',
                width: 1
            }
        }
    });
```

### Highlight Start and End Points

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Area',
        dataSource: [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ],
        fill:
            'rgba(37, 99, 235, 0.25)',
        lineWidth: 2,
        startPointColor: '#7C3AED',
        endPointColor: '#EA580C',
        markerSettings: {
            visible: [
                'Start',
                'End'
            ],
            size: 9,
            fill: '#FFFFFF',
            border: {
                color: '#111827',
                width: 1
            }
        }
    });
```

### Highlight Negative Values

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: [
            5,
            -3,
            4,
            -2,
            6,
            3,
            -1,
            5
        ],
        fill: '#2563EB',
        lineWidth: 2,
        negativePointColor: '#DC2626',
        axisSettings: {
            value: 0,
            lineSettings: {
                visible: true,
                color: '#64748B',
                width: 1
            }
        },
        markerSettings: {
            visible: [
                'Negative'
            ],
            size: 8,
            fill: '#FFFFFF',
            border: {
                color: '#7F1D1D',
                width: 2
            }
        }
    });
```

### Category Data

When x-values are text, use `valueType: 'Category'`.

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
        sales: 42
    },
    {
        month: 'Apr',
        sales: 32
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8
        }
    });
```

### DateTime Data

When x-values are dates, use `valueType: 'DateTime'`.

```typescript
interface PriceData {
    date: Date;
    price: number;
}

const stockPriceData: PriceData[] = [
    {
        date: new Date(2025, 0, 1),
        price: 128
    },
    {
        date: new Date(2025, 0, 2),
        price: 132
    },
    {
        date: new Date(2025, 0, 3),
        price: 125
    },
    {
        date: new Date(2025, 0, 4),
        price: 136
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'DateTime',
        dataSource: stockPriceData,
        xName: 'date',
        yName: 'price',
        fill: '#2563EB',
        lineWidth: 2,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8
        }
    });
```

## Markers by Sparkline Type

### Line and Area

Markers are most useful with Line and Area Sparklines because they identify the exact point along a connected path.

```typescript
type: 'Line'
```

```typescript
type: 'Area'
```

### Column

Column points are already represented by distinct rectangles. Use root special-point colors to emphasize important columns:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            35,
            28,
            42,
            32
        ],
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626'
    });
```

If markers are enabled for a Column Sparkline, validate the resulting appearance in the installed EJ2 version and target layout.

### WinLoss

Use a WinLoss Sparkline rather than a Column Sparkline for win, loss, and tie classification.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'WinLoss',
        dataSource: [
            1,
            1,
            -1,
            1,
            0,
            -1,
            1
        ],
        fill: '#15803D',
        negativePointColor: '#DC2626',
        tiePointColor: '#64748B'
    });
```

Do not rely on markers as the primary WinLoss distinction. Use:

- `fill` for wins
- `negativePointColor` for losses
- `tiePointColor` for ties

### Pie

Pie segments do not use point markers in the same way as Line or Area points.

Use a palette:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Pie',
        dataSource: [
            35,
            28,
            42,
            32
        ],
        palette: [
            '#2563EB',
            '#EA580C',
            '#15803D',
            '#7C3AED'
        ]
    });
```

## Markers and Data Labels

Use markers with data labels when exact high and low values must remain visible.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        dataSource: [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ],
        fill: '#2563EB',
        lineWidth: 2,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 9,
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
        padding: {
            left: 12,
            right: 12,
            top: 24,
            bottom: 12
        }
    });
```

Data-label visibility also accepts special-point categories. It must not be configured as a Boolean.

## Marker Events

Use the `markerRendering` event when individual markers require conditional customization.

```typescript
import {
    IMarkerRenderingEventArgs,
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        dataSource: [
            2,
            6,
            4,
            1,
            3,
            2,
            5
        ],
        markerSettings: {
            visible: [
                'All'
            ],
            size: 7
        },
        markerRendering: (
            args:
                IMarkerRenderingEventArgs
        ): void => {
            if (args.pointIndex === 0) {
                args.fill = '#7C3AED';
            }
        }
    });
```

Use the event for scenarios such as:

- Highlighting a known point index
- Applying a business-rule color
- Canceling a marker
- Styling markers according to external metadata

Validate the exact event argument properties against the installed EJ2 version before applying advanced event customization.

## Runtime Updates

### Change Marker Visibility

```typescript
sparkline.markerSettings.visible = [
    'High',
    'Low'
];

sparkline.dataBind();
```

### Show All Markers

```typescript
sparkline.markerSettings.visible = [
    'All'
];

sparkline.dataBind();
```

### Hide Markers

```typescript
sparkline.markerSettings.visible = [];

sparkline.dataBind();
```

### Change Marker Size

```typescript
sparkline.markerSettings.size = 10;
sparkline.dataBind();
```

### Change Common Marker Fill

```typescript
sparkline.markerSettings.fill =
    '#FFFFFF';

sparkline.dataBind();
```

### Change High and Low Colors

The special-point colors belong to the Sparkline root.

```typescript
sparkline.highPointColor =
    '#15803D';

sparkline.lowPointColor =
    '#DC2626';

sparkline.dataBind();
```

Do not use:

```typescript
sparkline
    .markerSettings
    .highPointColor =
        '#15803D';
```

### Batch Related Updates

Preferred:

```typescript
sparkline.markerSettings.visible = [
    'High',
    'Low'
];

sparkline.markerSettings.size = 10;
sparkline.markerSettings.fill =
    '#FFFFFF';

sparkline.highPointColor =
    '#15803D';

sparkline.lowPointColor =
    '#DC2626';

sparkline.dataBind();
```

Call `dataBind()` once after assigning related properties.

Use `refresh()` only when complete layout recalculation is required.

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

    <title>Sparkline Markers</title>

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
            max-width: 600px;
            padding: 20px;
            box-sizing: border-box;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            background: #FFFFFF;
        }

        .sparkline-card h1 {
            margin: 0 0 4px;
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
            Monthly Sales Trend
        </h1>

        <p id="sparkline-description">
            The highest, lowest, first, and final
            sales values can be highlighted.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="show-extremes"
                type="button"
            >
                Show High and Low
            </button>

            <button
                id="show-boundaries"
                type="button"
            >
                Show Start and End
            </button>

            <button
                id="show-all"
                type="button"
            >
                Show All
            </button>

            <button
                id="hide-markers"
                type="button"
            >
                Hide Markers
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
    },
    {
        month: 'Jul',
        sales: 37
    },
    {
        month: 'Aug',
        sales: 46
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
        height: '190px',
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        lineWidth: 2,
        startPointColor: '#7C3AED',
        endPointColor: '#EA580C',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        negativePointColor: '#B91C1C',
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 9,
            fill: '#FFFFFF',
            opacity: 1,
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
            opacity: 0.95,
            border: {
                color: '#64748B',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '11px',
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                opacity: 1
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
            top: 26,
            bottom: 14
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
    '#show-extremes',
    (): void => {
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

        sparkline.dataBind();
    }
);

bindButton(
    '#show-boundaries',
    (): void => {
        sparkline
            .markerSettings
            .visible = [
                'Start',
                'End'
            ];

        sparkline
            .dataLabelSettings
            .visible = [
                'Start',
                'End'
            ];

        sparkline.dataBind();
    }
);

bindButton(
    '#show-all',
    (): void => {
        sparkline
            .markerSettings
            .visible = [
                'All'
            ];

        sparkline
            .dataLabelSettings
            .visible = [];

        sparkline.dataBind();
    }
);

bindButton(
    '#hide-markers',
    (): void => {
        sparkline
            .markerSettings
            .visible = [];

        sparkline
            .dataLabelSettings
            .visible = [];

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

    <title>Sparkline Markers</title>

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
            max-width: 600px;
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
            height: 190px;
        }
    </style>
</head>
<body>
    <main class="sparkline-card">
        <h1>
            Monthly Sales Trend
        </h1>

        <p id="sparkline-description">
            The highest, lowest, first, and final
            sales values can be highlighted.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="show-extremes"
                type="button"
            >
                Show High and Low
            </button>

            <button
                id="show-boundaries"
                type="button"
            >
                Show Start and End
            </button>

            <button
                id="show-all"
                type="button"
            >
                Show All
            </button>

            <button
                id="hide-markers"
                type="button"
            >
                Hide Markers
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>
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
            },
            {
                month: 'Jul',
                sales: 37
            },
            {
                month: 'Aug',
                sales: 46
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '190px',
                type: 'Line',
                valueType: 'Category',
                dataSource: salesData,
                xName: 'month',
                yName: 'sales',
                fill: '#2563EB',
                lineWidth: 2,
                startPointColor: '#7C3AED',
                endPointColor: '#EA580C',
                highPointColor: '#15803D',
                lowPointColor: '#DC2626',
                negativePointColor:
                    '#B91C1C',
                markerSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    size: 9,
                    fill: '#FFFFFF',
                    opacity: 1,
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
                    opacity: 0.95,
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
                    top: 26,
                    bottom: 14
                }
            });

        sparkline.appendTo('#sparkline');

        document
            .getElementById(
                'show-extremes'
            )
            .addEventListener(
                'click',
                function () {
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

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'show-boundaries'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .markerSettings
                        .visible = [
                            'Start',
                            'End'
                        ];

                    sparkline
                        .dataLabelSettings
                        .visible = [
                            'Start',
                            'End'
                        ];

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'show-all'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .markerSettings
                        .visible = [
                            'All'
                        ];

                    sparkline
                        .dataLabelSettings
                        .visible = [];

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'hide-markers'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .markerSettings
                        .visible = [];

                    sparkline
                        .dataLabelSettings
                        .visible = [];

                    sparkline.dataBind();
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Marker Selection

- Use `High` and `Low` to emphasize extremes.
- Use `Start` and `End` to communicate trend direction.
- Use `Negative` for variance, profit-and-loss, or deviation data.
- Use `All` only when the point count is small enough to avoid clutter.
- Hide markers in very dense Sparklines.

### Marker Appearance

- Use `size` rather than CSS to control marker dimensions.
- Use a contrasting fill and border.
- Keep marker sizes proportional to the Sparkline height.
- Avoid marker sizes that obscure nearby points.
- Use root special-point colors for semantic distinctions.

### Accessibility

- Do not rely only on marker color.
- Pair important markers with data labels or surrounding text.
- Maintain sufficient contrast.
- Provide exact values in an accessible table when required.
- Keep tooltips supplementary rather than the only data source.

### Performance

- Avoid `All` markers for very large datasets.
- Avoid rendering data labels for every dense point.
- Batch runtime property changes before calling `dataBind()`.
- Reserve `refresh()` for complete layout recalculation.

## Combined Mistakes and Future References

### Special-Point Colors Inside markerSettings

Incorrect:

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ],
    highPointColor: '#15803D',
    lowPointColor: '#DC2626'
}
```

Correct:

```typescript
highPointColor: '#15803D',
lowPointColor: '#DC2626',
markerSettings: {
    visible: [
        'High',
        'Low'
    ]
}
```

Special-point colors are Sparkline-level properties.

### CSS-Controlled Marker Size

Avoid attempting to resize generated markers through internal SVG CSS.

Incorrect approach:

```css
.e-sparkline-marker {
    width: 12px;
    height: 12px;
}
```

Correct:

```typescript
markerSettings: {
    size: 12
}
```

### Missing Marker Size Support

Marker size is directly supported:

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ],
    size: 8
}
```

The marker model includes `size`, `fill`, `opacity`, `border`, and `visible`.

### Missing Category valueType

Incorrect:

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

### Missing DateTime valueType

Incorrect:

```typescript
dataSource: stockPriceData,
xName: 'date',
yName: 'price'
```

Correct:

```typescript
valueType: 'DateTime',
dataSource: stockPriceData,
xName: 'date',
yName: 'price'
```

### WinLoss Implemented as Column

Less appropriate:

```typescript
type: 'Column',
dataSource: [
    1,
    1,
    -1,
    1
]
```

Preferred:

```typescript
type: 'WinLoss',
dataSource: [
    1,
    1,
    -1,
    1
],
negativePointColor: '#DC2626',
tiePointColor: '#64748B'
```

### Updating Root Color Through markerSettings

Incorrect:

```typescript
sparkline
    .markerSettings
    .highPointColor =
        '#15803D';
```

Correct:

```typescript
sparkline.highPointColor =
    '#15803D';

sparkline.dataBind();
```

### Using refresh for Ordinary Updates

Avoid:

```typescript
sparkline.markerSettings.visible = [
    'High',
    'Low'
];

sparkline.refresh();
```

Preferred:

```typescript
sparkline.markerSettings.visible = [
    'High',
    'Low'
];

sparkline.dataBind();
```

### Missing All Marker Type

`All` is supported:

```typescript
markerSettings: {
    visible: [
        'All'
    ]
}
```

The marker visibility collection supports `All`, `Start`, `End`, `High`, `Low`, and `Negative`.

### Marker Configuration Checklist

Before generating a Sparkline marker example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. Basic markers do not require module injection.
4. Marker configuration uses `markerSettings`.
5. Marker visibility is an array.
6. Marker visibility uses supported categories.
7. `All` is used when every point needs a marker.
8. `High` is used for the highest point.
9. `Low` is used for the lowest point.
10. `Start` is used for the first point.
11. `End` is used for the final point.
12. `Negative` is used for negative points.
13. Common marker fill is inside `markerSettings`.
14. Marker size is inside `markerSettings`.
15. Marker opacity is inside `markerSettings`.
16. Marker border is inside `markerSettings`.
17. `highPointColor` is at Sparkline root level.
18. `lowPointColor` is at Sparkline root level.
19. `startPointColor` is at Sparkline root level.
20. `endPointColor` is at Sparkline root level.
21. `negativePointColor` is at Sparkline root level.
22. `tiePointColor` is at Sparkline root level.
23. Category data uses `valueType: 'Category'`.
24. DateTime data uses `valueType: 'DateTime'`.
25. Numeric data uses `valueType: 'Numeric'`.
26. `xName` matches the datasource x-field.
27. `yName` matches the datasource y-field.
28. Data-label visibility is also an array.
29. Runtime property updates call `dataBind()`.
30. Related updates are batched before rendering.
31. `refresh()` is reserved for full layout recalculation.
32. Internal generated SVG selectors are not used for marker sizing.
33. Marker color is not the only way important data is communicated.
34. The host element exists before `appendTo()`.
35. The host has sufficient width and height.
36. The final TypeScript and JavaScript examples are complete and runnable.
37. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.