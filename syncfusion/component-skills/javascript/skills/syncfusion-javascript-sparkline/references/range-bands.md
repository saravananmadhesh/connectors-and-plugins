# Range Bands

## Overview

Range bands highlight one or more y-value intervals across an EJ2 Sparkline. They are useful for showing target zones, acceptable limits, warning areas, performance categories, tolerances, and operating ranges.

The correct Sparkline configuration uses:

- `rangeBandSettings` as an array.
- `startRange` for the lower boundary.
- `endRange` for the upper boundary.
- `color` for the band color.
- `opacity` for band transparency.

A Sparkline supports multiple range bands directly by adding multiple objects to the `rangeBandSettings` array.

Correct:

```typescript
rangeBandSettings: [
    {
        startRange: 30,
        endRange: 40,
        color: '#86EFAC',
        opacity: 0.35
    }
]
```

Incorrect:

```typescript
rangeBandSettings: {
    startValue: 30,
    endValue: 40,
    color: '#86EFAC',
    opacity: 0.35
}
```

The original material contained the following issues:

- `rangeBandSettings` was incorrectly configured as an object.
- `startValue` and `endValue` were used instead of `startRange` and `endRange`.
- Multiple-range support was incorrectly described as requiring property replacement.
- Sparkline natively supports multiple range-band objects.
- Runtime updates should update the array and call `dataBind()`.
- Repeated `refresh()` calls are unnecessary for ordinary range-band changes.
- Range bands should be coordinated with `axisSettings.minY` and `axisSettings.maxY`.
- Range meaning must be communicated through text and not color alone.

## Table of Contents

- #basic-range-band
- #range-band-properties
- #multiple-range-bands
- #axis-range-alignment
- #visual-styling
- #common-patterns
  - #target-range
  - #safe-operating-range
  - #performance-zones
  - #tolerance-band
  - #budget-range
- #dynamic-range-band-updates
- #accessibility
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Basic Range Band

Configure a basic range band by supplying an array to `rangeBandSettings`.

### TypeScript

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const data: number[] = [
    20,
    35,
    40,
    25,
    30,
    45,
    38
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '140px',
        type: 'Column',
        valueType: 'Numeric',
        dataSource: data,
        fill: '#2563EB',
        axisSettings: {
            minY: 0,
            maxY: 50
        },
        rangeBandSettings: [
            {
                startRange: 30,
                endRange: 40,
                color: '#86EFAC',
                opacity: 0.35
            }
        ]
    });

sparkline.appendTo('#sparkline');
```

### JavaScript

```javascript
var data = [
    20,
    35,
    40,
    25,
    30,
    45,
    38
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '140px',
        type: 'Column',
        valueType: 'Numeric',
        dataSource: data,
        fill: '#2563EB',
        axisSettings: {
            minY: 0,
            maxY: 50
        },
        rangeBandSettings: [
            {
                startRange: 30,
                endRange: 40,
                color: '#86EFAC',
                opacity: 0.35
            }
        ]
    });

sparkline.appendTo('#sparkline');
```

Range bands highlight y-axis intervals and span the Sparkline plotting width.

## Range Band Properties

Each range-band object supports the following core properties:

- `startRange`
- `endRange`
- `color`
- `opacity`

### Start Range

```typescript
startRange: 30
```

This defines the first y-value boundary.

### End Range

```typescript
endRange: 40
```

This defines the second y-value boundary.

### Color

```typescript
color: '#86EFAC'
```

Use a color that remains distinguishable from:

- The Sparkline series
- The container background
- Other range bands
- Data labels
- Markers
- The horizontal reference line

### Opacity

```typescript
opacity: 0.35
```

Opacity is typically a value from zero through one:

```text
0 = fully transparent
1 = fully opaque
```

A moderate opacity often allows the series to remain readable over the band.

Complete range-band object:

```typescript
{
    startRange: 30,
    endRange: 40,
    color: '#86EFAC',
    opacity: 0.35
}
```

## Multiple Range Bands

Multiple bands can be configured directly in one Sparkline.

```typescript
rangeBandSettings: [
    {
        startRange: 0,
        endRange: 40,
        color: '#FCA5A5',
        opacity: 0.25
    },
    {
        startRange: 40,
        endRange: 70,
        color: '#FDE68A',
        opacity: 0.25
    },
    {
        startRange: 70,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.25
    }
]
```

EJ2 Sparkline supports multiple range bands through multiple objects in `rangeBandSettings`.

Complete example:

```typescript
const performanceData: number[] = [
    58,
    64,
    72,
    68,
    81,
    76,
    89
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '160px',
        type: 'Line',
        valueType: 'Numeric',
        dataSource: performanceData,
        fill: '#1D4ED8',
        lineWidth: 3,
        axisSettings: {
            minY: 0,
            maxY: 100
        },
        rangeBandSettings: [
            {
                startRange: 0,
                endRange: 40,
                color: '#FCA5A5',
                opacity: 0.25
            },
            {
                startRange: 40,
                endRange: 70,
                color: '#FDE68A',
                opacity: 0.25
            },
            {
                startRange: 70,
                endRange: 100,
                color: '#86EFAC',
                opacity: 0.25
            }
        ]
    });
```

Do not create separate Sparkline instances merely to show separate performance zones.

Incorrect:

```typescript
const poorSparkline =
    new Sparkline({
        rangeBandSettings: [
            poorBand
        ]
    });

const averageSparkline =
    new Sparkline({
        rangeBandSettings: [
            averageBand
        ]
    });

const goodSparkline =
    new Sparkline({
        rangeBandSettings: [
            goodBand
        ]
    });
```

Correct:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        rangeBandSettings: [
            poorBand,
            averageBand,
            goodBand
        ]
    });
```

## Axis Range Alignment

Range bands use y-values. Their boundaries should be consistent with the Sparkline y-axis range.

```typescript
axisSettings: {
    minY: 0,
    maxY: 100
},
rangeBandSettings: [
    {
        startRange: 70,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.25
    }
]
```

If the configured band lies outside the visible y-range, some or all of it may not appear.

Avoid:

```typescript
axisSettings: {
    minY: 0,
    maxY: 50
},
rangeBandSettings: [
    {
        startRange: 70,
        endRange: 100
    }
]
```

### Deriving a Range from Data

```typescript
const values: number[] = [
    20,
    35,
    40,
    25,
    30,
    45,
    38
];

const minimum: number =
    Math.min(...values);

const maximum: number =
    Math.max(...values);

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

Apply the values:

```typescript
axisSettings: {
    minY: minimumY,
    maxY: maximumY
}
```

A fixed axis range is preferable when several Sparklines must be compared using the same scale.

## Visual Styling

Range bands should remain visually subordinate to the actual data series.

Recommended structure:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Area',
        dataSource: [
            3,
            6,
            4,
            1,
            3,
            2,
            5,
            7,
            4,
            2
        ],
        fill:
            'rgba(37, 99, 235, 0.22)',
        lineWidth: 2,
        border: {
            color: '#1D4ED8',
            width: 1
        },
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#CBD5E1',
                width: 1
            }
        },
        padding: {
            left: 12,
            right: 12,
            top: 12,
            bottom: 12
        },
        axisSettings: {
            minY: 0,
            maxY: 8
        },
        rangeBandSettings: [
            {
                startRange: 3,
                endRange: 6,
                color: '#FDE68A',
                opacity: 0.3
            }
        ]
    });
```

Use `lineWidth` to control Line and Area path thickness.

Do not rely only on:

```typescript
border: {
    width: 2
}
```

for the Line Sparkline path thickness.

## Common Patterns

## Target Range

Use a single range band to indicate the desired interval.

```typescript
const qualityData: number[] = [
    6,
    8,
    9,
    7,
    8,
    10,
    9
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: qualityData,
        fill: '#2563EB',
        axisSettings: {
            minY: 0,
            maxY: 10
        },
        rangeBandSettings: [
            {
                startRange: 8,
                endRange: 10,
                color: '#86EFAC',
                opacity: 0.3
            }
        ]
    });
```

## Safe Operating Range

```typescript
const temperatureData: number[] = [
    15,
    20,
    25,
    30,
    22,
    18,
    28
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: temperatureData,
        fill: '#DC2626',
        lineWidth: 2,
        axisSettings: {
            minY: 10,
            maxY: 35
        },
        rangeBandSettings: [
            {
                startRange: 16,
                endRange: 25,
                color: '#86EFAC',
                opacity: 0.28
            }
        ]
    });
```

The surrounding text must explain that the band represents the safe range.

```html
<p id="temperature-description">
    The shaded region represents the safe operating
    temperature from 16 to 25 degrees Celsius.
</p>
```

## Performance Zones

```typescript
const performanceBands = [
    {
        startRange: 0,
        endRange: 60,
        color: '#FCA5A5',
        opacity: 0.25
    },
    {
        startRange: 60,
        endRange: 80,
        color: '#FDE68A',
        opacity: 0.25
    },
    {
        startRange: 80,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.25
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: performanceData,
        axisSettings: {
            minY: 0,
            maxY: 100
        },
        rangeBandSettings:
            performanceBands
    });
```

Do not rely only on green, yellow, and red. Explain each interval through visible text or an accessible table.

## Tolerance Band

For a target of 100 with a tolerance of plus or minus five:

```typescript
const target: number = 100;
const tolerance: number = 5;

const toleranceBand = {
    startRange:
        target - tolerance,
    endRange:
        target + tolerance,
    color: '#FDE68A',
    opacity: 0.28
};
```

Use it in the Sparkline:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
        dataSource: [
            98,
            101,
            97,
            104,
            102,
            99
        ],
        axisSettings: {
            minY: 90,
            maxY: 110,
            value: 100,
            lineSettings: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        rangeBandSettings: [
            toleranceBand
        ]
    });
```

## Budget Range

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: [
            45,
            50,
            48,
            55,
            60,
            52
        ],
        fill: '#2563EB',
        axisSettings: {
            minY: 35,
            maxY: 65
        },
        rangeBandSettings: [
            {
                startRange: 40,
                endRange: 60,
                color: '#FDE68A',
                opacity: 0.3
            }
        ]
    });
```

## Dynamic Range Band Updates

Because `rangeBandSettings` is an array, update a specific band by its array index.

### Update Boundaries

```typescript
sparkline
    .rangeBandSettings[0]
    .startRange = 20;

sparkline
    .rangeBandSettings[0]
    .endRange = 30;

sparkline.dataBind();
```

### Update Color

```typescript
sparkline
    .rangeBandSettings[0]
    .color = '#FCA5A5';

sparkline.dataBind();
```

### Update Opacity

```typescript
sparkline
    .rangeBandSettings[0]
    .opacity = 0.4;

sparkline.dataBind();
```

### Replace the Complete Band Collection

```typescript
sparkline.rangeBandSettings = [
    {
        startRange: 0,
        endRange: 40,
        color: '#FCA5A5',
        opacity: 0.25
    },
    {
        startRange: 40,
        endRange: 70,
        color: '#FDE68A',
        opacity: 0.25
    },
    {
        startRange: 70,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.25
    }
];

sparkline.dataBind();
```

### Add a Band

```typescript
sparkline.rangeBandSettings = [
    ...sparkline.rangeBandSettings,
    {
        startRange: 80,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.25
    }
];

sparkline.dataBind();
```

### Remove a Band

```typescript
sparkline.rangeBandSettings =
    sparkline
        .rangeBandSettings
        .filter(
            (
                _band,
                index: number
            ): boolean => {
                return index !== 1;
            }
        );

sparkline.dataBind();
```

### Batch Related Updates

Preferred:

```typescript
const band =
    sparkline.rangeBandSettings[0];

band.startRange = 25;
band.endRange = 35;
band.color = '#FDE68A';
band.opacity = 0.3;

sparkline.dataBind();
```

Avoid calling `dataBind()` or `refresh()` after every individual assignment.

## Accessibility

A range band is a visual background feature and must not be the only way to communicate a threshold or target.

Provide visible explanatory text:

```html
<section aria-labelledby="quality-heading">
    <h2 id="quality-heading">
        Quality score
    </h2>

    <p id="quality-description">
        The shaded region represents the target
        quality range from 80 to 100.
    </p>

    <div
        id="sparkline"
        aria-describedby="quality-description"
    ></div>
</section>
```

For multiple zones, provide a text list:

```html
<ul id="performance-zones">
    <li>
        Below target: 0 to 60
    </li>
    <li>
        Acceptable: 60 to 80
    </li>
    <li>
        Excellent: 80 to 100
    </li>
</ul>
```

Do not rely only on:

- Green for good
- Yellow for warning
- Red for poor

Also use:

- Visible text
- Data labels
- Markers
- A table
- A concise chart summary

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

    <title>Sparkline Range Bands</title>

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

        .sparkline-description {
            margin: 0 0 12px;
            color: #475569;
        }

        .zone-list {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            margin: 0 0 16px;
            padding: 0;
            list-style: none;
        }

        .zone-list li {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .zone-swatch {
            width: 14px;
            height: 14px;
            border: 1px solid #475569;
        }

        .zone-poor {
            background: #FCA5A5;
        }

        .zone-average {
            background: #FDE68A;
        }

        .zone-good {
            background: #86EFAC;
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
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Performance Score
        </h1>

        <p
            id="sparkline-description"
            class="sparkline-description"
        >
            The background bands represent below-target,
            acceptable, and excellent performance zones.
        </p>

        <ul
            id="performance-zones"
            class="zone-list"
        >
            <li>
                <span
                    class="zone-swatch zone-poor"
                    aria-hidden="true"
                ></span>
                Below target: 0 to 60
            </li>

            <li>
                <span
                    class="zone-swatch zone-average"
                    aria-hidden="true"
                ></span>
                Acceptable: 60 to 80
            </li>

            <li>
                <span
                    class="zone-swatch zone-good"
                    aria-hidden="true"
                ></span>
                Excellent: 80 to 100
            </li>
        </ul>

        <div class="sparkline-toolbar">
            <button
                id="show-all-zones"
                type="button"
            >
                Show All Zones
            </button>

            <button
                id="show-target-zone"
                type="button"
            >
                Show Target Only
            </button>

            <button
                id="change-target"
                type="button"
            >
                Change Target to 85
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="
                sparkline-description
                performance-zones
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
    Sparkline
} from '@syncfusion/ej2-charts';

interface PerformanceData {
    period: string;
    score: number;
}

interface RangeBand {
    startRange: number;
    endRange: number;
    color: string;
    opacity: number;
}

const performanceData:
    PerformanceData[] = [
        {
            period: 'Jan',
            score: 58
        },
        {
            period: 'Feb',
            score: 64
        },
        {
            period: 'Mar',
            score: 72
        },
        {
            period: 'Apr',
            score: 68
        },
        {
            period: 'May',
            score: 81
        },
        {
            period: 'Jun',
            score: 76
        },
        {
            period: 'Jul',
            score: 89
        },
        {
            period: 'Aug',
            score: 84
        }
    ];

const allZones: RangeBand[] = [
    {
        startRange: 0,
        endRange: 60,
        color: '#FCA5A5',
        opacity: 0.25
    },
    {
        startRange: 60,
        endRange: 80,
        color: '#FDE68A',
        opacity: 0.25
    },
    {
        startRange: 80,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.25
    }
];

const targetZone: RangeBand[] = [
    {
        startRange: 80,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.3
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
        dataSource:
            performanceData,
        xName: 'period',
        yName: 'score',
        fill: '#1D4ED8',
        lineWidth: 3,
        highPointColor: '#166534',
        lowPointColor: '#B91C1C',
        markerSettings: {
            visible: [
                'High',
                'Low',
                'End'
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
                'Low',
                'End'
            ],
            format: '${y}',
            fill: '#FFFFFF',
            border: {
                color: '#475569',
                width: 1
            },
            textStyle: {
                color: '#111827',
                size: '11px',
                fontFamily: 'Segoe UI',
                fontWeight: '600'
            }
        },
        axisSettings: {
            minY: 0,
            maxY: 100,
            value: 80,
            lineSettings: {
                visible: true,
                color: '#475569',
                width: 1,
                opacity: 1
            }
        },
        rangeBandSettings:
            allZones,
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
    '#show-all-zones',
    (): void => {
        sparkline.rangeBandSettings =
            allZones;

        sparkline.axisSettings.value =
            80;

        sparkline.dataBind();
    }
);

bindButton(
    '#show-target-zone',
    (): void => {
        sparkline.rangeBandSettings =
            targetZone;

        sparkline.axisSettings.value =
            80;

        sparkline.dataBind();
    }
);

bindButton(
    '#change-target',
    (): void => {
        sparkline.rangeBandSettings = [
            {
                startRange: 85,
                endRange: 100,
                color: '#86EFAC',
                opacity: 0.3
            }
        ];

        sparkline.axisSettings.value =
            85;

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

    <title>Sparkline Range Bands</title>

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
            Performance Score
        </h1>

        <p id="sparkline-description">
            The background bands represent below-target,
            acceptable, and excellent performance zones.
        </p>

        <ul id="performance-zones">
            <li>
                Below target: 0 to 60
            </li>
            <li>
                Acceptable: 60 to 80
            </li>
            <li>
                Excellent: 80 to 100
            </li>
        </ul>

        <div class="sparkline-toolbar">
            <button
                id="show-all-zones"
                type="button"
            >
                Show All Zones
            </button>

            <button
                id="show-target-zone"
                type="button"
            >
                Show Target Only
            </button>

            <button
                id="change-target"
                type="button"
            >
                Change Target to 85
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="
                sparkline-description
                performance-zones
            "
        ></div>
    </main>

    <script>
        var performanceData = [
            {
                period: 'Jan',
                score: 58
            },
            {
                period: 'Feb',
                score: 64
            },
            {
                period: 'Mar',
                score: 72
            },
            {
                period: 'Apr',
                score: 68
            },
            {
                period: 'May',
                score: 81
            },
            {
                period: 'Jun',
                score: 76
            },
            {
                period: 'Jul',
                score: 89
            },
            {
                period: 'Aug',
                score: 84
            }
        ];

        var allZones = [
            {
                startRange: 0,
                endRange: 60,
                color: '#FCA5A5',
                opacity: 0.25
            },
            {
                startRange: 60,
                endRange: 80,
                color: '#FDE68A',
                opacity: 0.25
            },
            {
                startRange: 80,
                endRange: 100,
                color: '#86EFAC',
                opacity: 0.25
            }
        ];

        var targetZone = [
            {
                startRange: 80,
                endRange: 100,
                color: '#86EFAC',
                opacity: 0.3
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '220px',
                type: 'Line',
                valueType: 'Category',
                dataSource:
                    performanceData,
                xName: 'period',
                yName: 'score',
                fill: '#1D4ED8',
                lineWidth: 3,
                highPointColor: '#166534',
                lowPointColor: '#B91C1C',
                markerSettings: {
                    visible: [
                        'High',
                        'Low',
                        'End'
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
                        'Low',
                        'End'
                    ],
                    format: '${y}',
                    fill: '#FFFFFF',
                    border: {
                        color: '#475569',
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
                axisSettings: {
                    minY: 0,
                    maxY: 100,
                    value: 80,
                    lineSettings: {
                        visible: true,
                        color: '#475569',
                        width: 1,
                        opacity: 1
                    }
                },
                rangeBandSettings:
                    allZones,
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

        document
            .getElementById(
                'show-all-zones'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .rangeBandSettings =
                            allZones;

                    sparkline
                        .axisSettings
                        .value = 80;

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'show-target-zone'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .rangeBandSettings =
                            targetZone;

                    sparkline
                        .axisSettings
                        .value = 80;

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'change-target'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .rangeBandSettings = [
                            {
                                startRange: 85,
                                endRange: 100,
                                color:
                                    '#86EFAC',
                                opacity: 0.3
                            }
                        ];

                    sparkline
                        .axisSettings
                        .value = 85;

                    sparkline.dataBind();
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Do

- Configure `rangeBandSettings` as an array.
- Use `startRange` and `endRange`.
- Use multiple objects for multiple bands.
- Align bands with the visible y-axis range.
- Keep band opacity low enough for the series to remain visible.
- Explain each range through visible text.
- Use consistent range definitions across related Sparklines.
- Validate overlapping bands intentionally.
- Batch updates before calling `dataBind()`.
- Use a horizontal reference line when a precise threshold must also be shown.

### Do Not

- Configure `rangeBandSettings` as a single object.
- Use `startValue` or `endValue`.
- Create separate Sparkline instances only to show multiple zones.
- Rely solely on green, yellow, and red.
- Use a fully opaque band that obscures the series.
- Configure bands outside the visible y-axis range unintentionally.
- Call `refresh()` after every ordinary range-band property change.
- Recreate the Sparkline when the target range changes.

## Combined Mistakes and Future References

### rangeBandSettings Must Be an Array

Incorrect:

```typescript
rangeBandSettings: {
    startRange: 30,
    endRange: 40
}
```

Correct:

```typescript
rangeBandSettings: [
    {
        startRange: 30,
        endRange: 40
    }
]
```

Syncfusion’s TypeScript and JavaScript examples configure range bands as an array.

### Incorrect Boundary Property Names

Incorrect:

```typescript
{
    startValue: 30,
    endValue: 40
}
```

Correct:

```typescript
{
    startRange: 30,
    endRange: 40
}
```

The documented boundary properties are `startRange` and `endRange`.

### Incorrect Single-Object Runtime Update

Incorrect:

```typescript
sparkline
    .rangeBandSettings
    .startValue = 20;
```

Correct:

```typescript
sparkline
    .rangeBandSettings[0]
    .startRange = 20;

sparkline.dataBind();
```

### Multiple Bands Do Not Require Simulation

Incorrect description:

```text
Update one range-band object repeatedly to simulate
multiple range bands.
```

Correct:

```typescript
rangeBandSettings: [
    {
        startRange: 0,
        endRange: 40,
        color: '#FCA5A5'
    },
    {
        startRange: 40,
        endRange: 70,
        color: '#FDE68A'
    },
    {
        startRange: 70,
        endRange: 100,
        color: '#86EFAC'
    }
]
```

Multiple range bands are supported directly.

### Repeated refresh Calls

Avoid:

```typescript
sparkline
    .rangeBandSettings[0]
    .startRange = 20;

sparkline.refresh();

sparkline
    .rangeBandSettings[0]
    .endRange = 30;

sparkline.refresh();
```

Preferred:

```typescript
sparkline
    .rangeBandSettings[0]
    .startRange = 20;

sparkline
    .rangeBandSettings[0]
    .endRange = 30;

sparkline.dataBind();
```

### Missing Axis Range

Potentially unclear:

```typescript
rangeBandSettings: [
    {
        startRange: 80,
        endRange: 100
    }
]
```

Preferred for a fixed performance scale:

```typescript
axisSettings: {
    minY: 0,
    maxY: 100
},
rangeBandSettings: [
    {
        startRange: 80,
        endRange: 100
    }
]
```

### Missing Category valueType

Incorrect:

```typescript
dataSource: performanceData,
xName: 'period',
yName: 'score'
```

Correct:

```typescript
valueType: 'Category',
dataSource: performanceData,
xName: 'period',
yName: 'score'
```

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

### Range Band Checklist

Before generating a Sparkline range-band example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. Range bands require no optional module injection.
4. `rangeBandSettings` is an array.
5. Each band uses `startRange`.
6. Each band uses `endRange`.
7. `startValue` is not used.
8. `endValue` is not used.
9. Band colors are distinguishable from the series.
10. Band opacity is between zero and one.
11. Multiple bands use multiple array entries.
12. Separate Sparkline instances are not created unnecessarily.
13. Band boundaries align with the intended y-axis scale.
14. `axisSettings.minY` is configured when a fixed minimum is required.
15. `axisSettings.maxY` is configured when a fixed maximum is required.
16. A threshold line uses `axisSettings.value`.
17. The threshold line uses `axisSettings.lineSettings`.
18. Category data uses `valueType: 'Category'`.
19. DateTime data uses `valueType: 'DateTime'`.
20. Numeric data uses `valueType: 'Numeric'`.
21. `xName` matches the datasource x-field.
22. `yName` matches the datasource y-field.
23. Range meanings are explained through text.
24. Color is not the only communication method.
25. Dynamic changes call `dataBind()`.
26. Related updates are batched.
27. `refresh()` is reserved for complete layout recalculation.
28. The host element exists before `appendTo()`.
29. The host has sufficient width and height.
30. The final TypeScript and JavaScript examples are complete and runnable.
31. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.