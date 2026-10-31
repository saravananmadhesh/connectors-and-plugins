# Appearance and Styling

## Overview

The EJ2 Sparkline provides supported API options for customizing:

- Sparkline type and primary color
- Series line width
- Series border
- Series opacity
- Pie-segment palette
- Special-point colors
- Marker appearance
- Data-label appearance
- Horizontal reference-line appearance
- Container background and border
- Internal padding
- Width and height
- Theme
- Right-to-left rendering

The `containerArea` property configures the background and border of the complete Sparkline drawing area. Its background is transparent by default.

The following corrections have been applied to the supplied material:

- `containerArea.background` and `containerArea.border` are supported.
- `padding` controls the internal spacing between the container and rendered Sparkline.
- External spacing should be applied through CSS on a wrapper rather than the generated visualization element.
- `fill` has type-dependent behavior.
- `lineWidth` controls the line thickness of Line and Area Sparklines.
- `border` and `containerArea.border` serve different purposes.
- `opacity` can control Sparkline transparency.
- `palette` is appropriate for multi-segment Pie coloring.
- Ordinary runtime property changes should use `dataBind()`.
- `refresh()` should be reserved for complete layout recalculation.
- Responsive width requires a parent with an available width.
- Manual resize refreshes should be debounced.
- Theme names must be validated against the installed EJ2 version.
- Undocumented internal SVG classes should not be used for production styling.

## Table of Contents

- #container-area-styling
  - #background-color
  - #container-border
- #sparkline-fill-colors
  - #line-sparkline
  - #column-sparkline
  - #area-sparkline
  - #pie-sparkline
  - #winloss-sparkline
- #series-border-and-opacity
- #special-point-colors
- #markers-and-data-labels
- #padding-and-external-spacing
- #responsive-sizing
  - #fixed-dimensions
  - #percentage-based-width
  - #hidden-containers
  - #debounced-resize-handling
- #themes
- #runtime-styling-updates
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Container Area Styling

The `containerArea` property configures the complete Sparkline drawing region.

```typescript
containerArea: {
    background: '#F8FAFC',
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

The `containerArea` model supports a background and border.

### Background Color

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        width: '250px',
        height: '100px',
        type: 'Area',
        dataSource: [
            3,
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
        containerArea: {
            background: '#F8FAFC'
        }
    });

sparkline.appendTo('#sparkline');
```

The default Sparkline container background is transparent.

### Container Border

```typescript
containerArea: {
    background: '#FFFFFF',
    border: {
        color: '#2563EB',
        width: 2
    }
}
```

Complete example:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        width: '250px',
        height: '100px',
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
        containerArea: {
            background: '#FFFFFF',
            border: {
                color: '#2563EB',
                width: 1
            }
        }
    });

sparkline.appendTo('#sparkline');
```

The container border encloses the Sparkline drawing area. It is separate from the root `border` property used for the rendered Sparkline series.

## Sparkline Fill Colors

The `fill` property controls the primary Sparkline color, but its visual result depends on the configured Sparkline type.

## Line Sparkline

For a Line Sparkline, use `fill` for the line color and `lineWidth` for its thickness.

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
        lineWidth: 2
    });
```

For Line and Area Sparklines, `lineWidth` is the support-safe property for controlling the series-path thickness.

## Column Sparkline

For a Column Sparkline, `fill` controls the column color.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            35,
            28,
            34,
            32,
            40,
            42
        ],
        fill: '#2563EB'
    });
```

Use special-point colors when particular columns require emphasis:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            35,
            -8,
            34,
            32,
            40,
            42
        ],
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        negativePointColor: '#DC2626',
        startPointColor: '#7C3AED',
        endPointColor: '#EA580C'
    });
```

## Area Sparkline

For an Area Sparkline, `fill` controls the area color and `lineWidth` controls the outline thickness.

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
            5
        ],
        fill:
            'rgba(37, 99, 235, 0.28)',
        lineWidth: 2,
        border: {
            color: '#1D4ED8',
            width: 1
        }
    });
```

An RGBA fill is useful when the area must remain transparent:

```typescript
fill:
    'rgba(37, 99, 235, 0.28)'
```

## Pie Sparkline

Use `palette` to assign colors to Pie segments.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Pie',
        dataSource: [
            35,
            28,
            34,
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

Use enough colors for the expected number of segments. If fewer colors are provided than data points, validate how the installed EJ2 version cycles or resolves the palette.

## WinLoss Sparkline

WinLoss Sparklines emphasize positive, negative, and neutral outcomes.

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'WinLoss',
        dataSource: [
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

Use distinct positive, negative, and neutral colors, but do not rely on color alone when the outcome must also be accessible through text.

## Series Border and Opacity

The root `border` property styles the rendered Sparkline series.

```typescript
border: {
    color: '#1D4ED8',
    width: 2
}
```

The container border is configured separately:

```typescript
containerArea: {
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

A complete Area Sparkline:

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
            5
        ],
        fill:
            'rgba(37, 99, 235, 0.30)',
        lineWidth: 2,
        opacity: 0.95,
        border: {
            color: '#1D4ED8',
            width: 1
        },
        containerArea: {
            background: '#F8FAFC',
            border: {
                color: '#CBD5E1',
                width: 1
            }
        }
    });
```

Do not confuse the two borders:

```text
border
```

styles the Sparkline series, while:

```text
containerArea.border
```

encloses the entire Sparkline area. Syncfusion’s appearance examples use both properties independently.

## Special-Point Colors

The Sparkline provides dedicated colors for significant values.

```typescript
highPointColor: '#15803D',
lowPointColor: '#DC2626',
negativePointColor: '#DC2626',
startPointColor: '#7C3AED',
endPointColor: '#EA580C',
tiePointColor: '#64748B'
```

Example:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            12,
            -5,
            18,
            9,
            -2,
            24
        ],
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#B91C1C',
        negativePointColor: '#DC2626',
        startPointColor: '#7C3AED',
        endPointColor: '#EA580C'
    });
```

Use special-point colors when the visualization must emphasize:

- The first value
- The final value
- The highest value
- The lowest value
- Negative values
- Tied WinLoss values

## Markers and Data Labels

Markers can reinforce the visual styling of Line and Area Sparklines.

```typescript
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
}
```

Data labels can match the application theme:

```typescript
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
}
```

Data-label visibility accepts categories such as `All`, `Start`, `End`, `High`, `Low`, and `Negative`, not a Boolean.

## Padding and External Spacing

The `padding` property creates internal space between the Sparkline container and the visualization.

```typescript
padding: {
    left: 20,
    right: 20,
    top: 20,
    bottom: 20
}
```

Sparkline padding supports separate left, right, top, and bottom values. The documented default is five.

Complete example:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        width: '350px',
        height: '200px',
        type: 'Area',
        dataSource: [
            3,
            6,
            4,
            1,
            3,
            2,
            5
        ],
        fill:
            'rgba(37, 99, 235, 0.28)',
        lineWidth: 2,
        containerArea: {
            background: '#F8FAFC',
            border: {
                color: '#2563EB',
                width: 2
            }
        },
        padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        }
    });
```

Use CSS for spacing outside the component.

Preferred:

```html
<div class="sparkline-wrapper">
    <div id="sparkline"></div>
</div>
```

```css
.sparkline-wrapper {
    margin: 16px;
}
```

Avoid adding margins directly to the rendered target when the parent layout can provide the spacing more predictably.

## Responsive Sizing

## Fixed Dimensions

```typescript
const sparkline: Sparkline =
    new Sparkline({
        width: '250px',
        height: '100px',
        type: 'Line',
        dataSource: data
    });
```

Fixed dimensions are useful for:

- Grid cells
- Uniform dashboard cards
- Table columns
- Repeated KPI components

## Percentage-Based Width

```typescript
const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Column',
        dataSource: data
    });
```

The parent must provide an available width:

```html
<div class="sparkline-container">
    <div id="sparkline"></div>
</div>
```

```css
.sparkline-container {
    width: 100%;
    max-width: 500px;
    height: 120px;
}

#sparkline {
    width: 100%;
    height: 100%;
}
```

## Hidden Containers

If Sparkline is initialized inside a hidden tab, dialog, accordion, or panel, its calculated width can be zero.

After the parent becomes visible, call:

```typescript
sparkline.refresh();
```

Do not repeatedly destroy and recreate the component solely to correct a hidden-container layout.

## Debounced Resize Handling

If the application must manually refresh Sparkline during resize, debounce the callback:

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

Do not call `refresh()` for every raw resize event.

## Themes

Set the Sparkline theme through:

```typescript
theme: 'Material'
```

Common documented Sparkline themes include Material, Fabric, Bootstrap, and HighContrast. Theme selection can affect data-label and tracker-line colors.

Example:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        theme: 'Material',
        type: 'Line',
        dataSource: data
    });
```


```typescript
theme: 'Material'
```


## Runtime Styling Updates

Update the fill:

```typescript
sparkline.fill = '#DC2626';
sparkline.dataBind();
```

Update the line width:

```typescript
sparkline.lineWidth = 3;
sparkline.dataBind();
```

Update the series border:

```typescript
sparkline.border = {
    color: '#7F1D1D',
    width: 2
};

sparkline.dataBind();
```

Update the container background:

```typescript
sparkline.containerArea.background =
    '#FFF7ED';

sparkline.dataBind();
```

Update the container border:

```typescript
sparkline.containerArea.border = {
    color: '#EA580C',
    width: 1
};

sparkline.dataBind();
```

Update the padding:

```typescript
sparkline.padding = {
    left: 20,
    right: 20,
    top: 15,
    bottom: 15
};

sparkline.dataBind();
```

Use `dataBind()` for ordinary styling property changes.

Use `refresh()` when:

- Dimensions changed.
- A hidden container became visible.
- Complete layout calculation is required.
- A structural rendering setting changed.

## Complete TypeScript Example

This complete example includes:

- Responsive Area Sparkline
- Category data
- Container background and border
- Series fill and border
- Opacity
- Internal padding
- High and low point colors
- High and low markers
- High and low data labels
- Tooltip and tracker line
- Theme switching
- Runtime style controls
- Correct imports and module injection

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

    <title>Sparkline Appearance and Styling</title>

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
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
            box-shadow:
                0 8px 24px
                rgba(15, 23, 42, 0.08);
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

        .sparkline-toolbar button:hover {
            background: #F1F5F9;
        }

        .sparkline-toolbar button:focus-visible {
            outline: 3px solid #93C5FD;
            outline-offset: 2px;
        }

        #sparkline {
            width: 100%;
            height: 210px;
        }

        @media (max-width: 600px) {
            body {
                padding: 12px;
            }

            .sparkline-card {
                padding: 14px;
            }

            #sparkline {
                height: 180px;
            }
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Monthly Revenue
        </h1>

        <p id="sparkline-description">
            Styled Area Sparkline with high and low
            point emphasis.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="apply-blue-style"
                type="button"
            >
                Blue Style
            </button>

            <button
                id="apply-orange-style"
                type="button"
            >
                Orange Style
            </button>

            <button
                id="increase-padding"
                type="button"
            >
                Increase Padding
            </button>

            <button
                id="reset-padding"
                type="button"
            >
                Reset Padding
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
    month: string;
    revenue: number;
}

Sparkline.Inject(
    SparklineTooltip
);

const revenueData: RevenueData[] = [
    {
        month: 'Jan',
        revenue: 32
    },
    {
        month: 'Feb',
        revenue: 46
    },
    {
        month: 'Mar',
        revenue: 38
    },
    {
        month: 'Apr',
        revenue: 25
    },
    {
        month: 'May',
        revenue: 41
    },
    {
        month: 'Jun',
        revenue: 35
    },
    {
        month: 'Jul',
        revenue: 52
    },
    {
        month: 'Aug',
        revenue: 48
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
        height: '210px',
        type: 'Area',
        valueType: 'Category',
        dataSource: revenueData,
        xName: 'month',
        yName: 'revenue',
        theme: 'Material',
        fill:
            'rgba(37, 99, 235, 0.28)',
        lineWidth: 2,
        opacity: 1,
        border: {
            color: '#1D4ED8',
            width: 1
        },
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        containerArea: {
            background: '#F8FAFC',
            border: {
                color: '#CBD5E1',
                width: 1
            }
        },
        padding: {
            left: 16,
            right: 16,
            top: 24,
            bottom: 16
        },
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 8,
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
    '#apply-blue-style',
    (): void => {
        sparkline.fill =
            'rgba(37, 99, 235, 0.28)';

        sparkline.border = {
            color: '#1D4ED8',
            width: 1
        };

        sparkline
            .containerArea
            .background =
                '#F8FAFC';

        sparkline
            .containerArea
            .border = {
                color: '#CBD5E1',
                width: 1
            };

        sparkline.dataBind();
    }
);

bindButton(
    '#apply-orange-style',
    (): void => {
        sparkline.fill =
            'rgba(234, 88, 12, 0.28)';

        sparkline.border = {
            color: '#C2410C',
            width: 1
        };

        sparkline
            .containerArea
            .background =
                '#FFF7ED';

        sparkline
            .containerArea
            .border = {
                color: '#FDBA74',
                width: 1
            };

        sparkline.dataBind();
    }
);

bindButton(
    '#increase-padding',
    (): void => {
        sparkline.padding = {
            left: 28,
            right: 28,
            top: 32,
            bottom: 24
        };

        sparkline.dataBind();
    }
);

bindButton(
    '#reset-padding',
    (): void => {
        sparkline.padding = {
            left: 16,
            right: 16,
            top: 24,
            bottom: 16
        };

        sparkline.dataBind();
    }
);

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
                    const smallScreen:
                        boolean =
                            window
                                .matchMedia(
                                    '(max-width: 600px)'
                                )
                                .matches;

                    sparkline.height =
                        smallScreen
                            ? '180px'
                            : '210px';

                    sparkline.refresh();
                },
                150
            );
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

    <title>Sparkline Appearance and Styling</title>

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
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #FFFFFF;
            box-shadow:
                0 8px 24px
                rgba(15, 23, 42, 0.08);
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
            height: 210px;
        }

        @media (max-width: 600px) {
            body {
                padding: 12px;
            }

            .sparkline-card {
                padding: 14px;
            }

            #sparkline {
                height: 180px;
            }
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Monthly Revenue
        </h1>

        <p id="sparkline-description">
            Styled Area Sparkline with high and low
            point emphasis.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="apply-blue-style"
                type="button"
            >
                Blue Style
            </button>

            <button
                id="apply-orange-style"
                type="button"
            >
                Orange Style
            </button>

            <button
                id="increase-padding"
                type="button"
            >
                Increase Padding
            </button>

            <button
                id="reset-padding"
                type="button"
            >
                Reset Padding
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
                month: 'Jan',
                revenue: 32
            },
            {
                month: 'Feb',
                revenue: 46
            },
            {
                month: 'Mar',
                revenue: 38
            },
            {
                month: 'Apr',
                revenue: 25
            },
            {
                month: 'May',
                revenue: 41
            },
            {
                month: 'Jun',
                revenue: 35
            },
            {
                month: 'Jul',
                revenue: 52
            },
            {
                month: 'Aug',
                revenue: 48
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '210px',
                type: 'Area',
                valueType: 'Category',
                dataSource: revenueData,
                xName: 'month',
                yName: 'revenue',
                theme: 'Material',
                fill:
                    'rgba(37, 99, 235, 0.28)',
                lineWidth: 2,
                opacity: 1,
                border: {
                    color: '#1D4ED8',
                    width: 1
                },
                highPointColor: '#15803D',
                lowPointColor: '#DC2626',
                containerArea: {
                    background: '#F8FAFC',
                    border: {
                        color: '#CBD5E1',
                        width: 1
                    }
                },
                padding: {
                    left: 16,
                    right: 16,
                    top: 24,
                    bottom: 16
                },
                markerSettings: {
                    visible: [
                        'High',
                        'Low'
                    ],
                    size: 8,
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
                        fontWeight:
                            '500'
                    },
                    trackLineSettings: {
                        visible: true,
                        color: '#64748B',
                        width: 1
                    }
                }
            });

        sparkline.appendTo('#sparkline');

        document
            .getElementById(
                'apply-blue-style'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline.fill =
                        'rgba(37, 99, 235, 0.28)';

                    sparkline.border = {
                        color: '#1D4ED8',
                        width: 1
                    };

                    sparkline
                        .containerArea
                        .background =
                            '#F8FAFC';

                    sparkline
                        .containerArea
                        .border = {
                            color:
                                '#CBD5E1',
                            width: 1
                        };

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'apply-orange-style'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline.fill =
                        'rgba(234, 88, 12, 0.28)';

                    sparkline.border = {
                        color: '#C2410C',
                        width: 1
                    };

                    sparkline
                        .containerArea
                        .background =
                            '#FFF7ED';

                    sparkline
                        .containerArea
                        .border = {
                            color:
                                '#FDBA74',
                            width: 1
                        };

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'increase-padding'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline.padding = {
                        left: 28,
                        right: 28,
                        top: 32,
                        bottom: 24
                    };

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'reset-padding'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline.padding = {
                        left: 16,
                        right: 16,
                        top: 24,
                        bottom: 16
                    };

                    sparkline.dataBind();
                }
            );

        var resizeTimer;

        window.addEventListener(
            'resize',
            function () {
                window.clearTimeout(
                    resizeTimer
                );

                resizeTimer =
                    window.setTimeout(
                        function () {
                            var smallScreen =
                                window
                                    .matchMedia(
                                        '(max-width: 600px)'
                                    )
                                    .matches;

                            sparkline.height =
                                smallScreen
                                    ? '180px'
                                    : '210px';

                            sparkline.refresh();
                        },
                        150
                    );
            }
        );
    </script>
</body>
</html>
```

## Best Practices

### Color

- Use a consistent primary color for the Sparkline series.
- Use dedicated special-point colors for high, low, negative, start, and end values.
- Use RGBA colors when an Area Sparkline needs transparency.
- Use a palette for Pie segments.
- Maintain sufficient contrast with the container background.
- Do not communicate meaning through color alone.

### Container

- Use `containerArea.background` for the visualization background.
- Use `containerArea.border` for the outer Sparkline-area border.
- Use CSS on a wrapper for border radius, shadow, margin, and surrounding layout.
- Avoid targeting generated internal SVG elements.

### Padding

- Increase top padding when data labels are visible.
- Keep padding small in Grid cells.
- Use consistent padding across related dashboard cards.
- Do not confuse internal Sparkline padding with external CSS margin.

### Responsive Design

- Use `width: '100%'` inside an explicitly sized parent.
- Keep a stable height for predictable layouts.
- Refresh after a hidden parent becomes visible.
- Debounce resize refreshes.
- Reduce labels and marker sizes on compact layouts.

### Runtime Updates

- Apply related style changes together.
- Call `dataBind()` once after multiple changes.
- Avoid calling `dataBind()` after every individual assignment.
- Use `refresh()` only when full layout recalculation is required.

## Combined Mistakes and Future References

### Confusing Series Border and Container Border

Series border:

```typescript
border: {
    color: '#1D4ED8',
    width: 2
}
```

Container border:

```typescript
containerArea: {
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

They are separate settings and should not be treated as interchangeable.

### Using Border Instead of lineWidth for Line Thickness

Avoid relying only on:

```typescript
border: {
    color: '#2563EB',
    width: 2
}
```

for a Line Sparkline.

Use:

```typescript
fill: '#2563EB',
lineWidth: 2
```

### Missing valueType for Category Data

Incorrect:

```typescript
dataSource: revenueData,
xName: 'month',
yName: 'revenue'
```

Correct:

```typescript
valueType: 'Category',
dataSource: revenueData,
xName: 'month',
yName: 'revenue'
```

### CSS Margin Applied to the Visualization Host

Less predictable:

```css
#sparkline {
    margin: 10px;
}
```

Preferred:

```html
<div class="sparkline-wrapper">
    <div id="sparkline"></div>
</div>
```

```css
.sparkline-wrapper {
    margin: 10px;
}
```

### Assuming Percentage Width Works Without Parent Width

Incomplete:

```typescript
width: '100%'
```

The parent must provide a measurable width:

```css
.sparkline-container {
    width: 100%;
    max-width: 500px;
}
```

### Calling refresh for Ordinary Styling Updates

Avoid:

```typescript
sparkline.fill = '#DC2626';
sparkline.refresh();
```

Preferred:

```typescript
sparkline.fill = '#DC2626';
sparkline.dataBind();
```

### Repeated Rendering Calls

Avoid:

```typescript
sparkline.fill = '#DC2626';
sparkline.dataBind();

sparkline.border = {
    color: '#7F1D1D',
    width: 2
};
sparkline.dataBind();
```

Preferred:

```typescript
sparkline.fill = '#DC2626';

sparkline.border = {
    color: '#7F1D1D',
    width: 2
};

sparkline.dataBind();
```

### Undocumented Internal CSS Selectors

Avoid styling generated internals such as:

```css
.e-sparkline-series
```

```css
.e-sparkline-column
```

```css
.e-sparkline-area
```

Use supported Sparkline API properties or style an external wrapper.

### Theme and Stylesheet Mismatch

Avoid configuring:

```typescript
theme: 'HighContrast'
```

while loading an unrelated theme stylesheet without validating the visual result.

Keep the installed theme, configured theme, and loaded CSS aligned.

### Unnecessary Module Injection

Basic appearance customization does not require module injection.

Do not use:

```typescript
Sparkline.Inject();
```

Only inject `SparklineTooltip` when tooltip or tracker-line functionality is used.

### Padding Default Assumption

The documented Sparkline padding default is five, but explicitly configure padding when exact layout consistency is required.

```typescript
padding: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
}
```

### Final Runtime-Safety Checklist

Before returning a Sparkline appearance example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. The host element exists.
4. The target selector matches the host ID.
5. The parent has an available width.
6. The Sparkline has a useful height.
7. The EJ2 theme stylesheet is loaded.
8. `valueType` matches the datasource x-values.
9. `xName` matches the datasource x-field.
10. `yName` matches the datasource y-field.
11. Numeric arrays do not use unnecessary field mappings.
12. `fill` is appropriate for the selected Sparkline type.
13. `lineWidth` is used for Line and Area path thickness.
14. `border` is used for series-border styling.
15. `containerArea.border` is used for the outer drawing-area border.
16. `containerArea.background` is used for the drawing-area background.
17. `padding` uses left, right, top, and bottom values.
18. External margin is applied through CSS.
19. Pie segment colors use `palette`.
20. Special-point colors are configured when required.
21. Marker visibility uses an array of point categories.
22. Data-label visibility uses an array of point categories.
23. Tooltip usage imports `SparklineTooltip`.
24. Tooltip usage injects `SparklineTooltip`.
25. Tooltip configuration uses `tooltipSettings`.
26. Tracker-line configuration uses `trackLineSettings`.
27. Runtime style updates call `dataBind()`.
28. Related property updates are batched before `dataBind()`.
29. `refresh()` is reserved for complete layout recalculation.
30. Hidden-container rendering is refreshed after visibility.
31. Manual resize refreshes are debounced.
32. Generated internal SVG classes are not used as stable styling hooks.
33. The configured theme is supported by the installed EJ2 version.
34. The final TypeScript and JavaScript examples are complete and runnable.
35. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.