# Legend and Tooltip in Syncfusion HeatMap

- #legend-configuration
  - #required-legend-module
  - #basic-legend
  - #hide-the-legend
- #legend-positioning
  - #supported-positions
  - #legend-orientation
- #legend-customization
  - #legend-size
  - #legend-labels
  - #legend-title-and-text-style
  - #runtime-legend-visibility
- #tooltip-configuration
  - #required-tooltip-module
  - #basic-tooltip
  - #disable-the-tooltip
- #tooltip-render-event
  - #basic-tooltip-content
  - #conditional-tooltip-content
  - #numeric-formatting
  - #missing-value-handling
- #custom-tooltip-content
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Legend Configuration

The HeatMap legend displays the relationship between cell values and colors. It helps users understand how low, medium, and high values are represented in the HeatMap.

Use a legend when:

- Users must interpret a continuous color scale.
- The palette contains several value ranges.
- Exact range boundaries are important.
- The HeatMap uses custom colors.
- Color meaning is not otherwise explained.

Do not rely only on color to communicate information. The HeatMap should also provide axis labels, cell values, tooltips, or supporting text when the data is important.

### Required Legend Module

TypeScript applications must import and inject the `Legend` module before enabling the legend.

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);
```

The module must be injected before the HeatMap instance is created.

Correct:

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);

const heatmap: HeatMap =
    new HeatMap({
        legendSettings: {
            visible: true
        },

        dataSource: [
            [10, 20, 30],
            [40, 50, 60]
        ]
    });

heatmap.appendTo('#heatmap');
```

Do not inject `Legend` when the legend is not used.

### Basic Legend

Set `legendSettings.visible` to `true`.

```typescript
legendSettings: {
    visible: true
}
```

Complete TypeScript example:

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);

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
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4',
                'Q5'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022',
                '2023'
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
    });

heatmap.appendTo('#heatmap');
```

JavaScript example:

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
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4',
                'Q5'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022',
                '2023'
            ]
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
    });

heatmap.appendTo('#heatmap');
```

Do not call the following in global JavaScript:

```javascript
ej.heatmap.HeatMap.Inject(
    ej.heatmap.Legend
);
```

The global HeatMap package contains the feature modules required by the global constructor. Explicit feature injection is for module-based TypeScript applications.

### Hide the Legend

Set `visible` to `false`.

```typescript
legendSettings: {
    visible: false
}
```

When the legend is hidden, ensure the color meaning is explained elsewhere if users need it.

Possible alternatives include:

- Cell labels.
- Tooltips.
- A visible text description.
- A separate data table.
- Explicit palette labels in surrounding content.

## Legend Positioning

Use `legendSettings.position` to control where the legend appears relative to the HeatMap.

### Supported Positions

Bottom:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

Top:

```typescript
legendSettings: {
    visible: true,
    position: 'Top'
}
```

Right:

```typescript
legendSettings: {
    visible: true,
    position: 'Right'
}
```

Left:

```typescript
legendSettings: {
    visible: true,
    position: 'Left'
}
```

Position guidance:

```text
Bottom -> Suitable for wide HeatMaps.
Top    -> Places the legend above the data area.
Right  -> Suitable when horizontal space is available.
Left   -> Places the legend before the data area.
```

Validate the selected position with:

- HeatMap width.
- HeatMap height.
- Axis-label length.
- Legend-label length.
- Page direction.
- Responsive breakpoints.

### Legend Orientation

Legend orientation typically follows the selected position.

```text
Top or Bottom -> Horizontal presentation.
Left or Right -> Vertical presentation.
```

Do not add an `orientation` property unless it is explicitly supported by the installed HeatMap legend model.

Prefer controlling the layout through `position`:

```typescript
legendSettings: {
    visible: true,
    position: 'Right'
}
```

## Legend Customization

### Legend Size

Use `width` and `height` to control legend dimensions.

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    width: '300px',
    height: '50px'
}
```

Avoid an excessively small width when several labels are displayed.

For responsive layouts, validate fixed legend dimensions at smaller viewport sizes.

### Legend Labels

Use `showLabel` to control legend-label visibility.

```typescript
legendSettings: {
    visible: true,
    showLabel: true
}
```

Use `labelFormat` to format legend values.

```typescript
legendSettings: {
    visible: true,
    showLabel: true,
    labelFormat: '{value}%'
}
```

Do not use unsupported placeholders such as:

```typescript
labelFormat: '{value} - {label}'
```

unless the installed API explicitly supports the additional placeholder.

Use the validated `{value}` placeholder:

```typescript
labelFormat: 'Score: {value}%'
```

### Legend Label Position

When the legend label-position property is supported by the installed version, use a valid position appropriate to the selected legend layout.

Example:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',
    showLabel: true,
    labelFormat: '{value}%',
    labelDisplayType: 'All'
}
```

Validate exact legend-label placement properties against the installed HeatMap version before including them in production code.

### Legend Title and Text Style

When a title is required, use the legend title configuration supported by the installed HeatMap model.

Keep the title concise:

```text
Performance Score
Sales Amount
Temperature
Risk Level
```

Use `textStyle` for legend-label typography when supported:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom',

    textStyle: {
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: 'Normal',
        size: '12px',
        color: '#333333'
    }
}
```

Do not assume that chart-style properties such as `titleStyle` and `labelStyle` are accepted by the HeatMap legend without validating the installed type definitions.

### Runtime Legend Visibility

Update the `visible` property and refresh the HeatMap.

Required HTML:

```html
<button id="toggleLegendButton" type="button">
    Hide legend
</button>

<div id="heatmap"></div>
```

TypeScript:

```typescript
const toggleLegendButton: HTMLElement | null =
    document.getElementById(
        'toggleLegendButton'
    );

if (toggleLegendButton) {
    toggleLegendButton.addEventListener(
        'click',
        (): void => {
            const isVisible: boolean =
                Boolean(
                    heatmap
                        .legendSettings
                        .visible
                );

            heatmap.legendSettings.visible =
                !isVisible;

            heatmap.refresh();

            toggleLegendButton.textContent =
                isVisible
                    ? 'Show legend'
                    : 'Hide legend';
        }
    );
}
```

JavaScript:

```javascript
var toggleLegendButton =
    document.getElementById(
        'toggleLegendButton'
    );

if (toggleLegendButton) {
    toggleLegendButton.addEventListener(
        'click',
        function () {
            var isVisible =
                Boolean(
                    heatmap
                        .legendSettings
                        .visible
                );

            heatmap.legendSettings.visible =
                !isVisible;

            heatmap.refresh();

            toggleLegendButton.textContent =
                isVisible
                    ? 'Show legend'
                    : 'Hide legend';
        }
    );
}
```

## Tooltip Configuration

HeatMap tooltips display information about a cell during pointer interaction.

A tooltip can display:

- X-axis label.
- Y-axis label.
- Cell value.
- Formatted numeric value.
- Status derived from the value.
- Additional contextual information available to the application.

### Required Tooltip Module

TypeScript applications must import and inject `Tooltip`.

```typescript
import {
    HeatMap,
    Tooltip
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Tooltip);
```

Enable the tooltip through:

```typescript
showTooltip: true
```

Do not use:

```typescript
tooltipSettings: {
    visible: true
}
```

The HeatMap tooltip is enabled through the HeatMap-level `showTooltip` property.

### Basic Tooltip

TypeScript:

```typescript
import {
    HeatMap,
    Tooltip
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Tooltip);

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',
        showTooltip: true,

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

JavaScript:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '450px',
        showTooltip: true,

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Do not call `HeatMap.Inject` in this global JavaScript example.

### Disable the Tooltip

Set:

```typescript
showTooltip: false
```

When tooltips are disabled, ensure important cell information is available through:

- Cell labels.
- A data table.
- A details panel.
- Accessible text.
- Another persistent display.

## Tooltip Render Event

Use `tooltipRender` to customize tooltip content before the tooltip is displayed.

The tooltip must be enabled:

```typescript
showTooltip: true
```

### Basic Tooltip Content

```typescript
import {
    HeatMap,
    Tooltip,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Tooltip);

const heatmap: HeatMap =
    new HeatMap({
        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            args.content = [
                'Row: ' + args.yLabel,
                'Column: ' + args.xLabel,
                'Value: ' + args.value
            ];
        },

        dataSource: [
            [73, 39, 26],
            [93, 58, 53]
        ],

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3'
            ]
        },

        yAxis: {
            labels: [
                '2021',
                '2022'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

The common tooltip event values include:

```text
args.xLabel -> X-axis label for the cell.
args.yLabel -> Y-axis label for the cell.
args.value  -> Cell value.
args.content -> Tooltip content collection.
```

### Single-Line Tooltip

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    args.content = [
        args.yLabel +
        ' | ' +
        args.xLabel +
        ' : ' +
        args.value
    ];
}
```

### Conditional Tooltip Content

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    const value: number =
        Number(args.value);

    if (!Number.isFinite(value)) {
        args.content = [
            args.yLabel +
            ' | ' +
            args.xLabel,
            'No data'
        ];

        return;
    }

    if (value > 75) {
        args.content = [
            args.yLabel +
            ' | ' +
            args.xLabel,
            'High performance: ' +
            value.toFixed(0) +
            '%',
            'Target exceeded'
        ];

        return;
    }

    if (value < 25) {
        args.content = [
            args.yLabel +
            ' | ' +
            args.xLabel,
            'Low performance: ' +
            value.toFixed(0) +
            '%',
            'Needs attention'
        ];

        return;
    }

    args.content = [
        args.yLabel +
        ' | ' +
        args.xLabel,
        'Normal performance: ' +
        value.toFixed(0) +
        '%'
    ];
}
```

### Numeric Formatting

Convert the tooltip value to a number before using numeric methods.

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    const value: number =
        Number(args.value);

    if (!Number.isFinite(value)) {
        args.content = [
            'Value: No data'
        ];

        return;
    }

    const formattedValue: string =
        value.toLocaleString(
            'en-US',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    args.content = [
        'Value: $' +
        formattedValue
    ];
}
```

Do not call:

```typescript
args.value.toFixed(2)
```

without validating that `args.value` is numeric.

### Percentage Formatting

If the source value is already a percentage value such as `73`, append the percentage symbol:

```typescript
const value: number =
    Number(args.value);

args.content = [
    'Performance: ' +
    value.toFixed(1) +
    '%'
];
```

Do not use a redundant calculation such as:

```typescript
const percentage =
    args.value / 100 * 100;
```

That expression returns the original value and does not calculate a meaningful percentage.

If the source value is a fraction such as `0.73`, convert it explicitly:

```typescript
const value: number =
    Number(args.value);

const percentage: number =
    value * 100;

args.content = [
    'Performance: ' +
    percentage.toFixed(1) +
    '%'
];
```

### Missing Value Handling

Handle `null`, `undefined`, empty, and nonnumeric values safely.

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    const rawValue: unknown =
        args.value;

    if (
        rawValue === null ||
        rawValue === undefined ||
        rawValue === ''
    ) {
        args.content = [
            args.yLabel +
            ' | ' +
            args.xLabel,
            'No data'
        ];

        return;
    }

    const value: number =
        Number(rawValue);

    if (!Number.isFinite(value)) {
        args.content = [
            args.yLabel +
            ' | ' +
            args.xLabel,
            'Invalid value'
        ];

        return;
    }

    args.content = [
        args.yLabel +
        ' | ' +
        args.xLabel +
        ' : ' +
        value.toFixed(2)
    ];
}
```

Do not claim that a null value automatically displays as `NaN`. The rendered behavior depends on data binding and event values. Handle missing values explicitly.

## Custom Tooltip Content

Use an array of concise text lines for reliable tooltip content.

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    args.content = [
        'Year: ' + args.yLabel,
        'Quarter: ' + args.xLabel,
        'Sales: $' + args.value + 'K'
    ];
}
```

### Status Indicator

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    const value: number =
        Number(args.value);

    if (!Number.isFinite(value)) {
        args.content = [
            'Status: No data'
        ];

        return;
    }

    let status: string;

    if (value > 80) {
        status = 'Above target';
    } else if (value < 40) {
        status = 'Below target';
    } else {
        status = 'Within target';
    }

    args.content = [
        args.yLabel +
        ' | ' +
        args.xLabel,
        'Status: ' + status,
        'Performance: ' +
        value.toFixed(0) +
        '%'
    ];
}
```

Do not rely only on icons such as check marks or arrows. Include a readable text status.

### Avoid Unvalidated HTML

Do not assume that arbitrary HTML supplied through `args.content` will always render as rich HTML.

Avoid:

```typescript
args.content = [
    '<b>' +
    args.yLabel +
    '</b>'
];
```

Prefer text:

```typescript
args.content = [
    'Row: ' + args.yLabel
];
```

If rich HTML is required, validate the exact template API and rendering behavior supported by the installed HeatMap version.

Do not place unsanitized user input into tooltip HTML.

### Avoid Fabricated Tooltip Data

Do not generate random totals:

```typescript
const total =
    Math.random() * 1000;
```

Tooltip content must be based on:

- The actual cell value.
- Existing data.
- A calculated value derived from real data.
- Application state.
- Valid metadata associated with the selected cell.

Example with a real row total:

```typescript
const salesData: number[][] = [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
];

const rowTotals: number[] =
    salesData.map(
        (row: number[]): number => {
            return row.reduce(
                (
                    total: number,
                    value: number
                ): number => {
                    return total + value;
                },
                0
            );
        }
    );
```

Only use a row total in the tooltip when the selected row index is available and validated through the event data or application mapping.

## Complete TypeScript Example

### Required HTML

```html
<div class="heatmap-actions">
    <button id="toggleLegendButton" type="button">
        Hide legend
    </button>
</div>

<div class="heatmap-wrapper">
    <div id="heatmap"></div>
</div>
```

### Required CSS

```css
.heatmap-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.heatmap-actions button {
    padding: 8px 14px;
    color: #1a1a1a;
    background: #ffffff;
    border: 1px solid #666666;
    border-radius: 4px;
    cursor: pointer;
}

.heatmap-actions button:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}

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

const salesData: number[][] = [
    [73, 39, 26, 39, 94],
    [93, 58, 53, 38, 26],
    [99, 28, 22, 4, 66]
];

const getStatus = (
    value: number
): string => {
    if (value > 75) {
        return 'Above target';
    }

    if (value < 25) {
        return 'Needs attention';
    }

    return 'Within target';
};

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: salesData,

        xAxis: {
            labels: [
                'Q1',
                'Q2',
                'Q3',
                'Q4',
                'Q5'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                size: '12px',
                color: '#333333'
            }
        },

        yAxis: {
            labels: [
                '2021',
                '2022',
                '2023'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                size: '12px',
                color: '#333333'
            }
        },

        titleSettings: {
            text: 'Quarterly Sales Performance',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '16px',
                color: '#1a1a1a'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom',
            showLabel: true,
            labelFormat: '{value}'
        },

        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            const rawValue: unknown =
                args.value;

            if (
                rawValue === null ||
                rawValue === undefined ||
                rawValue === ''
            ) {
                args.content = [
                    'Year: ' + args.yLabel,
                    'Quarter: ' + args.xLabel,
                    'Sales: No data'
                ];

                return;
            }

            const value: number =
                Number(rawValue);

            if (!Number.isFinite(value)) {
                args.content = [
                    'Year: ' + args.yLabel,
                    'Quarter: ' + args.xLabel,
                    'Sales: Invalid value'
                ];

                return;
            }

            args.content = [
                'Year: ' + args.yLabel,
                'Quarter: ' + args.xLabel,
                'Sales: $' +
                value.toFixed(0) +
                'K',
                'Status: ' +
                getStatus(value)
            ];
        }
    });

heatmap.appendTo('#heatmap');

const toggleLegendButton: HTMLElement | null =
    document.getElementById(
        'toggleLegendButton'
    );

if (toggleLegendButton) {
    toggleLegendButton.addEventListener(
        'click',
        (): void => {
            const isVisible: boolean =
                Boolean(
                    heatmap
                        .legendSettings
                        .visible
                );

            heatmap.legendSettings.visible =
                !isVisible;

            heatmap.refresh();

            toggleLegendButton.textContent =
                isVisible
                    ? 'Show legend'
                    : 'Hide legend';
        }
    );
}
```

## Complete JavaScript Example

The following example uses valid script elements, actual angle brackets, and plain CDN URLs.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>HeatMap Legend and Tooltip</title>

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
        .heatmap-actions {
            display: flex;
            gap: 8px;
            margin-bottom: 12px;
        }

        .heatmap-actions button {
            padding: 8px 14px;
            color: #1a1a1a;
            background: #ffffff;
            border: 1px solid #666666;
            border-radius: 4px;
            cursor: pointer;
        }

        .heatmap-actions button:focus-visible {
            outline: 2px solid #0066cc;
            outline-offset: 2px;
        }

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
    <div class="heatmap-actions">
        <button id="toggleLegendButton" type="button">
            Hide legend
        </button>
    </div>

    <div class="heatmap-wrapper">
        <div id="heatmap"></div>
    </div>

    <script>
        var salesData = [
            [73, 39, 26, 39, 94],
            [93, 58, 53, 38, 26],
            [99, 28, 22, 4, 66]
        ];

        function getStatus(value) {
            if (value > 75) {
                return 'Above target';
            }

            if (value < 25) {
                return 'Needs attention';
            }

            return 'Within target';
        }

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '450px',

                dataSource: salesData,

                xAxis: {
                    labels: [
                        'Q1',
                        'Q2',
                        'Q3',
                        'Q4',
                        'Q5'
                    ],

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        size: '12px',
                        color: '#333333'
                    }
                },

                yAxis: {
                    labels: [
                        '2021',
                        '2022',
                        '2023'
                    ],

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        size: '12px',
                        color: '#333333'
                    }
                },

                titleSettings: {
                    text:
                        'Quarterly Sales Performance',

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        fontWeight: '600',
                        size: '16px',
                        color: '#1a1a1a'
                    }
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    showLabel: true,
                    labelFormat: '{value}'
                },

                showTooltip: true,

                tooltipRender: function (args) {
                    var rawValue =
                        args.value;

                    if (
                        rawValue === null ||
                        rawValue === undefined ||
                        rawValue === ''
                    ) {
                        args.content = [
                            'Year: ' +
                            args.yLabel,
                            'Quarter: ' +
                            args.xLabel,
                            'Sales: No data'
                        ];

                        return;
                    }

                    var value =
                        Number(rawValue);

                    if (!Number.isFinite(value)) {
                        args.content = [
                            'Year: ' +
                            args.yLabel,
                            'Quarter: ' +
                            args.xLabel,
                            'Sales: Invalid value'
                        ];

                        return;
                    }

                    args.content = [
                        'Year: ' +
                        args.yLabel,
                        'Quarter: ' +
                        args.xLabel,
                        'Sales: $' +
                        value.toFixed(0) +
                        'K',
                        'Status: ' +
                        getStatus(value)
                    ];
                }
            });

        heatmap.appendTo('#heatmap');

        var toggleLegendButton =
            document.getElementById(
                'toggleLegendButton'
            );

        if (toggleLegendButton) {
            toggleLegendButton.addEventListener(
                'click',
                function () {
                    var isVisible =
                        Boolean(
                            heatmap
                                .legendSettings
                                .visible
                        );

                    heatmap
                        .legendSettings
                        .visible =
                            !isVisible;

                    heatmap.refresh();

                    toggleLegendButton
                        .textContent =
                            isVisible
                                ? 'Show legend'
                                : 'Hide legend';
                }
            );
        }
    </script>
</body>
</html>
```

## Runtime Validation Checklist

```text
✅ HeatMap is imported in TypeScript.
✅ Legend is imported and injected when the legend is visible.
✅ Tooltip is imported and injected when tooltips are enabled.
✅ Every injected module is imported.
✅ Global JavaScript does not call HeatMap.Inject.
✅ The required global scripts load before application code.
✅ All individual scripts use the same EJ2 version.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ The appendTo selector matches the host ID.
✅ The data source is defined.
✅ Every matrix row uses the intended number of columns.
✅ X-axis labels match the matrix-column count.
✅ Y-axis labels match the matrix-row count.
✅ legendSettings.visible is true when the legend is required.
✅ The legend position uses a supported value.
✅ The legend has sufficient room for its labels.
✅ showTooltip is true when tooltipRender is used.
✅ Tooltip content handles null and undefined values.
✅ Tooltip content validates numeric values before formatting.
✅ Tooltip calculations use existing data.
✅ Tooltips do not contain fabricated random values.
✅ HTML tooltip content is used only after validating support.
✅ User-provided content is not inserted as unsanitized HTML.
✅ The HeatMap has measurable width and height.
✅ Actual angle brackets are used in executable HTML.
✅ No HTML entities replace executable tags.
✅ No editor-generated anchor tags appear in CDN URLs.
✅ No editor-generated strong or br tags appear in source code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Incorrect Tooltip Property

Incorrect:

```typescript
tooltipSettings: {
    visible: true
}
```

Correct:

```typescript
showTooltip: true
```

### Missing Tooltip Enablement

Incorrect:

```typescript
HeatMap.Inject(
    Tooltip
);

const heatmap: HeatMap =
    new HeatMap({
        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            args.content = [
                String(args.value)
            ];
        }
    });
```

Correct:

```typescript
HeatMap.Inject(
    Tooltip
);

const heatmap: HeatMap =
    new HeatMap({
        showTooltip: true,

        tooltipRender: (
            args: ITooltipEventArgs
        ): void => {
            args.content = [
                String(args.value)
            ];
        }
    });
```

### TypeScript Injection in Global JavaScript

Avoid:

```javascript
ej.heatmap.HeatMap.Inject(
    ej.heatmap.Legend,
    ej.heatmap.Tooltip
);
```

Use the global constructor directly:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        legendSettings: {
            visible: true
        },

        showTooltip: true
    });

heatmap.appendTo('#heatmap');
```

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

### Unsupported Legend Orientation

Avoid:

```typescript
legendSettings: {
    orientation: 'Horizontal'
}
```

unless `orientation` is explicitly available in the installed HeatMap legend model.

Use:

```typescript
legendSettings: {
    position: 'Bottom'
}
```

### Unsupported Legend Placeholder

Avoid:

```typescript
labelFormat:
    '{value} - {label}'
```

Use:

```typescript
labelFormat:
    'Score: {value}%'
```

### Unsafe Numeric Formatting

Avoid:

```typescript
const value =
    args.value.toFixed(2);
```

Use:

```typescript
const value: number =
    Number(args.value);

if (Number.isFinite(value)) {
    args.content = [
        value.toFixed(2)
    ];
}
```

### Redundant Percentage Formula

Avoid:

```typescript
const percentage =
    args.value / 100 * 100;
```

If the value is already a percentage:

```typescript
const percentage: number =
    Number(args.value);
```

If the value is a fraction:

```typescript
const percentage: number =
    Number(args.value) * 100;
```

### Random Tooltip Values

Avoid:

```typescript
const total =
    Math.random() * 1000;
```

Tooltips must use actual data or a calculation derived from actual data.

### Unsupported Object Mapping

Avoid chart-style object mapping such as:

```typescript
const heatmap =
    new HeatMap({
        dataSource: detailedData,
        xName: 'col',
        yName: 'row',
        valueName: 'value'
    });
```

Use the HeatMap data adaptor and its supported data-source settings for object-based data.

For a simple implementation, use a two-dimensional matrix:

```typescript
dataSource: [
    [85, 72],
    [65, 58]
]
```

### Unsafe Metadata Lookup

Avoid:

```typescript
const cell =
    detailedData[args.yLabel];
```

The Y-axis label is not guaranteed to be a valid numeric array index.

Maintain an explicit mapping when additional metadata is required.

### Unvalidated HTML Tooltip

Avoid:

```typescript
args.content = [
    '<b>' +
    args.yLabel +
    '</b>'
];
```

Prefer:

```typescript
args.content = [
    'Row: ' +
    args.yLabel
];
```

### Incorrect Performance Claim

Do not claim:

```text
Complex tooltip templates have no performance impact.
```

Tooltip performance depends on:

- Content complexity.
- DOM creation.
- Event frequency.
- Data processing.
- Device performance.
- Number of HeatMap cells.
- Browser rendering.

Keep tooltip processing lightweight.

### Missing Legend Module

Incorrect:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        legendSettings: {
            visible: true
        }
    });
```

Correct:

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend
);
```

### Malformed CDN Markup

Do not use:

```html
https://cdn.syncfusion.com/...
    https://cdn.syncfusion.com/...
</a>
```

Use a valid script element:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
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