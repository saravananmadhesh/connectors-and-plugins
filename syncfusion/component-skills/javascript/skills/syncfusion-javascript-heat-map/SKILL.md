---
name: syncfusion-javascript-heat-map
description: Guide to implementing Syncfusion Heatmap in TypeScript and JavaScript. Immediately use this skill when user needs to visualize two-dimensional data, create gradient-based visualizations, configure axes and labels, customize cell appearance, add interactive tooltips and legends, handle heatmap events, or render large datasets with SVG/Canvas modes. Works with TypeScript (module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion HeatMap (TypeScript & JavaScript)

The Syncfusion Essential JS 2 HeatMap visualizes two-dimensional data using color-coded cells. It is suitable for identifying patterns, trends, clusters, high values, low values, correlations, and density distributions across rows and columns.

This skill covers:

- TypeScript applications using npm and module imports.
- JavaScript applications using versioned CDN or local global scripts.
- Array and JSON data binding.
- Category, Numeric, and DateTime axes.
- Gradient and fixed color palettes.
- Cell labels, borders, highlighting, and conditional styling.
- Legends and tooltips.
- Cell click and double-click events.
- SVG and Canvas rendering.
- Bubble HeatMaps.
- Runtime data updates.
- Responsive layouts.
- Accessibility and performance guidance.
- Export features when supported by the installed HeatMap version.

## Platform Support

### TypeScript

Use TypeScript when the application uses:

- The `@syncfusion/ej2-heatmap` npm package.
- TypeScript compilation.
- Webpack, Vite, or another module bundler.
- Strongly typed component configuration.
- Explicit feature-module injection.
- IDE IntelliSense and compile-time validation.

Install the package:

```bash
npm install @syncfusion/ej2-heatmap
```

Basic import:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';
```

Import and inject only the feature modules used by the HeatMap.

```typescript
import {
    HeatMap,
    Legend,
    Tooltip
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend,
    Tooltip
);
```

### JavaScript

Use global JavaScript when the application uses:

- Versioned CDN scripts.
- Locally stored EJ2 global scripts.
- Traditional HTML and JavaScript files.
- The global `ej` namespace.
- No TypeScript compilation.

The global HeatMap constructor is:

```javascript
ej.heatmap.HeatMap
```

Global JavaScript examples should not call `HeatMap.Inject(...)`.

### JavaScript Language Level

The JavaScript examples use ES5-compatible syntax where practical:

```text
var declarations
Traditional functions
No optional chaining
No object spread
No JavaScript module imports
```

A modern browser is still recommended.

## When to Use This Skill

Use this skill when the task requires:

- Creating a basic HeatMap.
- Visualizing matrix or correlation data.
- Identifying hotspots and value patterns.
- Displaying performance across two dimensions.
- Binding a two-dimensional numeric array.
- Binding sparse cell data.
- Binding JSON table or cell data.
- Loading HeatMap data from an API.
- Updating HeatMap data dynamically.
- Configuring Category, Numeric, or DateTime axes.
- Formatting or rotating axis labels.
- Applying gradient or fixed color palettes.
- Displaying cell values.
- Configuring legends and tooltips.
- Handling cell click and double-click events.
- Implementing selection when supported by the installed version.
- Creating a Bubble HeatMap.
- Selecting SVG or Canvas rendering.
- Optimizing large matrices.
- Creating responsive layouts.
- Providing accessible descriptions and data alternatives.
- Exporting the rendered HeatMap when supported by the installed version.

## Implementation Rules

### Rule 1: Provide Complete Examples

A runnable TypeScript example should include:

```text
Imports
Required feature-module injection
Data source
HeatMap configuration
HTML host element
appendTo call
Required CSS
```

A runnable JavaScript example should include:

```text
All required global scripts
HeatMap host element
Data source
HeatMap configuration
appendTo call
Required CSS
```

### Rule 2: Use Explicit DOM Attachment

Preferred TypeScript:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [10, 20, 30],
            [40, 50, 60]
        ]
    });

heatmap.appendTo('#heatmap');
```

Preferred JavaScript:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        dataSource: [
            [10, 20, 30],
            [40, 50, 60]
        ]
    });

heatmap.appendTo('#heatmap');
```

Avoid passing the selector as the second constructor argument.

### Rule 3: Ensure the Host Exists

Required HTML:

```html
<div id="heatmap"></div>
```

Required attachment:

```typescript
heatmap.appendTo('#heatmap');
```

The host ID and selector must match.

### Rule 4: Inject Every Enabled TypeScript Feature

Common feature-module mapping:

```text
Legend       -> Legend
Tooltip      -> Tooltip
Data adaptor -> Adaptor
```

Example:

```typescript
import {
    HeatMap,
    Legend,
    Tooltip,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend,
    Tooltip,
    Adaptor
);
```

Inject `Adaptor` only when adaptor-based data binding is used.

Do not inject unused modules.

### Rule 5: Keep Imports and Injection Synchronized

Incorrect:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Legend
);
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

### Rule 6: Do Not Inject Modules in Global JavaScript

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

### Rule 7: Keep Matrix Dimensions Synchronized

For this matrix:

```typescript
const data: number[][] = [
    [10, 20, 30],
    [40, 50, 60]
];
```

use three X-axis labels:

```typescript
xAxis: {
    labels: [
        'A',
        'B',
        'C'
    ]
}
```

and two Y-axis labels:

```typescript
yAxis: {
    labels: [
        'X',
        'Y'
    ]
}
```

Avoid inconsistent row lengths:

```typescript
const invalidData = [
    [10, 20, 30],
    [40, 50]
];
```

### Rule 8: Enable Tooltips Explicitly

Import and inject `Tooltip`:

```typescript
import {
    HeatMap,
    Tooltip
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Tooltip);
```

Enable the feature:

```typescript
showTooltip: true
```

Use typed event arguments:

```typescript
import {
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';
```

Do not use:

```typescript
tooltipSettings: {
    visible: true
}
```

### Rule 9: Use `dataSourceSettings` for JSON Mapping

Do not place JSON field mappings directly on the HeatMap.

Incorrect:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,
        xName: 'Month',
        yName: 'Product',
        valueName: 'Sales'
    });
```

Correct:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Product',
            valueMapping: 'Sales'
        }
    });
```

TypeScript also requires:

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);
```

### Rule 10: Use Supported Cell Properties

Cell highlighting:

```typescript
cellSettings: {
    enableCellHighlight: true
}
```

Do not use:

```typescript
enableCellHighlighting: true
```

Cell labels:

```typescript
cellSettings: {
    showLabel: true,

    textStyle: {
        size: '12px',
        color: '#ffffff'
    }
}
```

Cell border:

```typescript
cellSettings: {
    border: {
        width: 1,
        color: '#ffffff',
        radius: 3
    }
}
```

### Rule 11: Prefer Public Configuration Over Generated DOM Styling

Do not depend on undocumented generated selectors:

```css
.e-heatmap-cell {
    border-radius: 6px;
}
```

Do not query assumed attributes:

```typescript
document.querySelectorAll(
    '[data-row]'
);
```

Prefer public configuration:

```typescript
cellSettings: {
    border: {
        radius: 6
    }
}
```

### Rule 12: Use Strings for Component Dimensions

Preferred:

```typescript
width: '100%',
height: '450px'
```

Runtime update:

```typescript
heatmap.width =
    '100%';

heatmap.height =
    '450px';
```

Avoid assigning numeric dimensions unless the installed API explicitly supports them.

### Rule 13: Do Not Use Encoded or Editor-Generated Code

Executable HTML must use actual tags:

```html
<div id="heatmap"></div>
```

Do not use:

```html
&lt;div id="heatmap"&gt;&lt;/div&gt;
```

Do not place the following inside source code or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```

## Navigation Guide

### Getting Started

Read:

```text
references/getting-started.md
```

Use this reference for:

- npm installation.
- TypeScript imports.
- JavaScript CDN setup.
- Individual script dependencies.
- Combined bundle setup.
- HeatMap host creation.
- Basic matrix binding.
- Legend and tooltip injection.
- Running the application.
- Initialization troubleshooting.

### Data Binding

Read:

```text
references/data-binding.md
```

Use this reference for:

- Array table binding.
- Array cell binding.
- JSON table binding.
- JSON cell binding.
- `Adaptor` injection.
- `dataSourceSettings`.
- External API loading.
- API-response validation.
- Real-time data updates.
- Missing-value normalization.
- Large-data considerations.

### Axes and Labels

Read:

```text
references/axes-and-labels.md
```

Use this reference for:

- Category axes.
- Numeric axes.
- DateTime axes.
- Axis labels.
- Numeric ranges and intervals.
- Date ranges and interval types.
- Axis text styles.
- Label formatting.
- Label rotation.
- Axis inversion.
- Opposed positioning.
- Axis titles.
- RTL layout.

### Appearance and Styling

Read:

```text
references/appearance-styling.md
```

Use this reference for:

- Cell borders and corner radius.
- Cell highlighting.
- Cell labels.
- Conditional cell styling.
- Gradient palettes.
- Fixed palettes.
- Domain-specific palettes.
- HeatMap title styling.
- Axis-label styling.
- Background and margins.
- Themes.
- Responsive dimensions.
- Resize handling.
- Color and contrast guidance.

### Legend and Tooltip

Read:

```text
references/legend-tooltip.md
```

Use this reference for:

- Legend module injection.
- Legend visibility.
- Legend positioning.
- Legend labels.
- Runtime legend toggling.
- Tooltip module injection.
- `showTooltip`.
- `tooltipRender`.
- Numeric formatting.
- Conditional tooltip content.
- Missing-value handling.
- Tooltip performance guidance.

### Events and Interactions

Read:

```text
references/events-interactions.md
```

Use this reference for:

- `cellClick`.
- `cellDoubleClick`.
- `cellRender`.
- Cell selection state.
- Cell highlighting.
- Interaction details.
- Drill-down navigation.
- Custom range-selection state.
- Comparison logic.
- Event performance.
- Safe DOM updates.
- Accessible interaction alternatives.

### Advanced Features

Read:

```text
references/advanced-features.md
```

Use this reference for:

- SVG rendering.
- Canvas rendering.
- Rendering-mode selection.
- Bubble tile types.
- Bubble size and color behavior.
- Selection properties.
- Clearing selection.
- Export validation.
- Large-matrix limits.
- Efficient batch updates.
- Server-side data windows.
- API validation.
- Resource cleanup.
- Accessible descriptions.
- Semantic data-table alternatives.
- Keyboard-accessible external actions.
- High-contrast presentation.

## TypeScript Quick Start

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

const heatmapData: number[][] = [
    [73, 39, 26, 39, 94, 0],
    [93, 58, 53, 38, 26, 68],
    [99, 28, 22, 4, 66, 90],
    [14, 26, 97, 69, 69, 3]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        titleSettings: {
            text:
                'Sales Revenue per Employee',

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
                'Nancy',
                'Andrew',
                'Janet',
                'Margaret',
                'Steven',
                'Michael'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: 'Normal',
                size: '12px',
                color: '#333333'
            }
        },

        dataSource:
            heatmapData,

        cellSettings: {
            showLabel: true,
            enableCellHighlight: true,

            border: {
                width: 1,
                color: '#ffffff',
                radius: 2
            },

            textStyle: {
                fontFamily: 'Segoe UI',
                fontStyle: 'Normal',
                fontWeight: '600',
                size: '12px',
                color: '#ffffff'
            }
        },

        paletteSettings: {
            type: 'Gradient',

            palette: [
                {
                    value: 0,
                    color: '#fff4cc'
                },
                {
                    value: 50,
                    color: '#3b82f6'
                },
                {
                    value: 100,
                    color: '#172554'
                }
            ]
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
            const value: number =
                Number(args.value);

            args.content = [
                'Day: ' +
                String(args.yLabel),
                'Employee: ' +
                String(args.xLabel),
                'Sales: ' +
                (
                    Number.isFinite(value)
                        ? '$' +
                            value.toFixed(0) +
                            'K'
                        : 'No data'
                )
            ];
        }
    });

heatmap.appendTo('#heatmap');
```

## JavaScript Quick Start

Use either:

```text
The consolidated EJ2 bundle
```

or:

```text
Individual HeatMap dependency scripts
```

Do not combine both approaches.

### Individual Script Order

Load:

```text
1. ej2-base
2. ej2-data
3. ej2-svg-base
4. ej2-heatmap
5. Application code
```

### Complete JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Syncfusion HeatMap</title>

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
        var heatmapData = [
            [73, 39, 26, 39, 94, 0],
            [93, 58, 53, 38, 26, 68],
            [99, 28, 22, 4, 66, 90],
            [14, 26, 97, 69, 69, 3]
        ];

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '450px',

                titleSettings: {
                    text:
                        'Sales Revenue per Employee',

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
                        'Nancy',
                        'Andrew',
                        'Janet',
                        'Margaret',
                        'Steven',
                        'Michael'
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
                    }
                },

                yAxis: {
                    valueType:
                        'Category',

                    labels: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday'
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
                    }
                },

                dataSource:
                    heatmapData,

                cellSettings: {
                    showLabel: true,
                    enableCellHighlight: true,

                    border: {
                        width: 1,
                        color: '#ffffff',
                        radius: 2
                    },

                    textStyle: {
                        fontFamily:
                            'Segoe UI',
                        fontStyle:
                            'Normal',
                        fontWeight:
                            '600',
                        size: '12px',
                        color: '#ffffff'
                    }
                },

                paletteSettings: {
                    type: 'Gradient',

                    palette: [
                        {
                            value: 0,
                            color: '#fff4cc'
                        },
                        {
                            value: 50,
                            color: '#3b82f6'
                        },
                        {
                            value: 100,
                            color: '#172554'
                        }
                    ]
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    showLabel: true,
                    labelFormat: '{value}'
                },

                showTooltip: true,

                tooltipRender:
                    function (args) {
                        var value =
                            Number(
                                args.value
                            );

                        args.content = [
                            'Day: ' +
                            String(
                                args.yLabel
                            ),
                            'Employee: ' +
                            String(
                                args.xLabel
                            ),
                            'Sales: ' +
                            (
                                Number.isFinite(
                                    value
                                )
                                    ? '$' +
                                        value
                                            .toFixed(0) +
                                        'K'
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

## Common Patterns

### Pattern 1: Basic Matrix Binding

Use a rectangular two-dimensional array.

```typescript
const data: number[][] = [
    [73, 39, 26],
    [93, 58, 53],
    [99, 28, 22]
];

const heatmap: HeatMap =
    new HeatMap({
        dataSource: data,

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
                '2022',
                '2023'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Use this pattern for:

- Small and medium matrices.
- Category-based rows and columns.
- Data already prepared for visualization.
- Simple runtime updates.

### Pattern 2: JSON Cell Binding

Use `Adaptor` and `dataSourceSettings`.

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);

interface SalesCell {
    Year: string;
    Month: string;
    Value: number;
}

const cellData: SalesCell[] = [
    {
        Year: '2021',
        Month: 'Jan',
        Value: 73
    },
    {
        Year: '2021',
        Month: 'Feb',
        Value: 39
    },
    {
        Year: '2022',
        Month: 'Jan',
        Value: 93
    }
];

const heatmap: HeatMap =
    new HeatMap({
        dataSource: cellData,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'Month',
            yDataMapping: 'Year',
            valueMapping: 'Value'
        },

        xAxis: {
            valueType: 'Category',

            labels: [
                'Jan',
                'Feb'
            ]
        },

        yAxis: {
            valueType: 'Category',

            labels: [
                '2021',
                '2022'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### Pattern 3: Runtime Data Update

Update the existing instance.

```typescript
const updateHeatMap = (
    newData: number[][]
): void => {
    heatmap.dataSource =
        newData;

    heatmap.refresh();
};
```

Do not recreate the HeatMap for every update.

Validate:

- Matrix row count.
- Matrix column count.
- X-axis labels.
- Y-axis labels.
- Numeric values.
- Missing values.

### Pattern 4: Gradient Palette

```typescript
paletteSettings: {
    type: 'Gradient',

    palette: [
        {
            value: 0,
            color: '#fff4cc'
        },
        {
            value: 50,
            color: '#3b82f6'
        },
        {
            value: 100,
            color: '#172554'
        }
    ]
}
```

Use for continuous values.

### Pattern 5: Fixed Status Palette

```typescript
paletteSettings: {
    type: 'Fixed',

    palette: [
        {
            value: 0,
            color: '#dbeafe',
            label: 'Low'
        },
        {
            value: 40,
            color: '#fef3c7',
            label: 'Moderate'
        },
        {
            value: 70,
            color: '#fecaca',
            label: 'High'
        }
    ]
}
```

Use for explicit business ranges.

Also provide cell values, tooltip status, or legend labels so users do not depend on color alone.

### Pattern 6: Cell Interaction

```typescript
import {
    ICellClickEventArgs
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSource: data,

        cellClick: (
            args: ICellClickEventArgs
        ): void => {
            console.log(
                args.yLabel,
                args.xLabel,
                args.value
            );
        }
    });

heatmap.appendTo('#heatmap');
```

For user-facing details, update a dedicated text element with `textContent`.

### Pattern 7: Bubble HeatMap

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [35, 55, 80],
            [70, 25, 60]
        ],

        cellSettings: {
            tileType: 'Bubble',
            bubbleType: 'Size'
        }
    });

heatmap.appendTo('#heatmap');
```

Do not use unsupported top-level `bubbleSizeMapping`.

### Pattern 8: Large Matrix

Use an explicitly selected rendering mode after performance testing.

```typescript
const heatmap: HeatMap =
    new HeatMap({
        renderingMode: 'Canvas',
        dataSource: largeData,

        cellSettings: {
            showLabel: false,
            enableCellHighlight: false
        }
    });

heatmap.appendTo('#heatmap');
```

Do not claim automatic SVG and Canvas switching based on a fixed threshold.

## Key Properties

### HeatMap-Level Properties

```text
dataSource           -> HeatMap data.
dataSourceSettings   -> Data adaptor and mapping configuration.
xAxis                -> X-axis settings.
yAxis                -> Y-axis settings.
titleSettings        -> HeatMap title.
paletteSettings      -> Color mapping.
legendSettings       -> Legend settings.
cellSettings         -> Cell appearance and behavior.
showTooltip          -> Tooltip enablement.
renderingMode        -> SVG or Canvas rendering.
theme                -> Built-in visual theme.
width                -> Component width.
height               -> Component height.
background           -> Component background when supported.
margin               -> Component margins when supported.
enableRtl            -> Right-to-left layout.
allowSelection       -> Selection enablement when supported.
enableMultiSelect    -> Multiple selection when supported.
```

### Data-Source Settings

```text
isJsonData     -> Identifies JSON object data.
adaptorType    -> Table or Cell adaptor.
xDataMapping   -> X-axis source field.
yDataMapping   -> Y-axis source field.
valueMapping   -> Cell-value source field.
```

### Axis Properties

```text
valueType              -> Category, Numeric, or DateTime.
labels                 -> Category labels.
minimum                -> Numeric or DateTime minimum.
maximum                -> Numeric or DateTime maximum.
interval               -> Numeric or DateTime interval.
intervalType           -> DateTime interval type.
labelFormat            -> Numeric or DateTime label format.
labelRotation          -> Label rotation.
labelIntersectAction   -> Label-intersection handling.
textStyle              -> Axis-label appearance.
isInversed             -> Reverses axis order.
opposedPosition        -> Places the axis on the opposite side.
title                  -> Axis-title model.
```

### Cell Properties

```text
showLabel              -> Displays cell values.
format                 -> Cell-label format.
textStyle              -> Cell-label appearance.
border                 -> Cell border and corner radius.
enableCellHighlight    -> Pointer highlighting.
tileType               -> Rect or Bubble.
bubbleType             -> Bubble representation.
```

### Palette Properties

```text
type     -> Gradient or Fixed.
palette  -> Value, color, and optional label collection.
```

### Legend Properties

```text
visible       -> Legend visibility.
position      -> Top, Bottom, Left, or Right.
width         -> Legend width.
height        -> Legend height.
showLabel     -> Legend-label visibility.
labelFormat   -> Legend-value formatting.
```

### Interaction Events

```text
cellClick        -> Cell click event.
cellDoubleClick  -> Cell double-click event.
cellRender       -> Cell-render customization.
tooltipRender    -> Tooltip-content customization.
loaded           -> Triggered after component rendering.
```

Use event interfaces instead of `any` when an interface is available.

## Rendering Guidance

### SVG

```typescript
renderingMode: 'SVG'
```

Use when vector rendering is required and performance testing confirms it is suitable.

### Canvas

```typescript
renderingMode: 'Canvas'
```

Use when bitmap rendering performs better for the target matrix and environment.

Do not use:

```typescript
renderingMode: 'Auto'
```

unless that value is explicitly supported by the installed version.

Do not define universal cell-count thresholds.

## Accessibility Guidance

Provide:

- A visible heading.
- A concise description.
- Axis labels.
- Cell values or tooltips.
- A legend when color interpretation is required.
- Textual status for important ranges.
- Native buttons for user actions.
- A semantic table for an alternative data representation.
- Sufficient color contrast.
- Non-color status information.

Do not add unverified properties such as:

```typescript
enableAccessibility: true
```

or:

```typescript
allowKeyboardNavigation: true
```

Do not overwrite the generated HeatMap semantics with an unvalidated `role="grid"`.

Do not hide an accessible data table with:

```css
display: none;
```

Use a visually hidden technique that preserves table semantics.

## Performance Guidance

For large datasets:

- Bound matrix dimensions before allocation.
- Avoid creating millions of cells without testing.
- Use Canvas only after validation.
- Disable cell labels when cells become too small.
- Disable highlighting when it is unnecessary.
- Keep `cellRender` lightweight.
- Keep tooltip calculations lightweight.
- Update the existing component.
- Batch cell updates.
- Call `refresh()` once per complete update.
- Request smaller server-side data windows.
- Limit update frequency.
- Clear timers and subscriptions.
- Destroy the HeatMap when its view is removed.

Do not create:

```typescript
generateData(
    10000,
    10000
);
```

That attempts to create 100 million cells.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-heatmap is installed for TypeScript.
✅ HeatMap is imported.
✅ Every enabled TypeScript feature has a matching imported module.
✅ Every imported feature module is injected before HeatMap creation.
✅ Unused feature modules are not injected.
✅ Global JavaScript does not call HeatMap.Inject.
✅ All CDN scripts use the same EJ2 version.
✅ Individual CDN scripts load in dependency order.
✅ Every CDN URL ends in .min.js.
✅ The consolidated bundle is not mixed with individual scripts.
✅ The HeatMap host element exists.
✅ heatmap.appendTo('#heatmap') is called.
✅ The appendTo selector matches the host ID.
✅ The HeatMap has measurable width and height.
✅ The component dimensions use strings.
✅ The matrix is rectangular.
✅ X-axis labels match the matrix-column count.
✅ Y-axis labels match the matrix-row count.
✅ JSON binding uses dataSourceSettings.
✅ Adaptor is injected for adaptor-based TypeScript binding.
✅ Cell binding uses xDataMapping, yDataMapping, and valueMapping.
✅ Tooltip is enabled through showTooltip.
✅ tooltipRender uses ITooltipEventArgs.
✅ Tooltip values are validated before numeric formatting.
✅ Legend is injected when the legend is visible.
✅ Cell highlighting uses enableCellHighlight.
✅ Cell-label styling uses cellSettings.textStyle.
✅ Axis-label styling uses xAxis.textStyle and yAxis.textStyle.
✅ Cell borders use cellSettings.border.
✅ Gradient palettes use ordered value stops.
✅ Fixed palettes use explicit value boundaries.
✅ Rendering mode uses a supported value.
✅ Automatic rendering-mode switching is not assumed.
✅ Bubble HeatMap uses cellSettings.tileType and bubbleType.
✅ Unsupported bubbleSizeMapping is not used.
✅ Selection APIs are validated against the installed version.
✅ Unsupported CellSelection is not injected.
✅ Generated SVG or Canvas internals are not queried directly.
✅ Runtime updates modify the existing HeatMap.
✅ API responses are validated before binding.
✅ Fetch requests check response.ok.
✅ Large matrix dimensions are bounded.
✅ Timers, listeners, subscriptions, and requests are cleaned up.
✅ heatmap.destroy() is called when the view is removed.
✅ Important information is not communicated through color alone.
✅ Native controls are provided for essential user actions.
✅ A semantic data alternative is provided when required.
✅ Executable HTML uses actual angle brackets.
✅ No encoded tags replace executable HTML.
✅ No anchor elements wrap CDN URLs.
✅ No malformed .min.jsscript URLs exist.
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

### Untyped Tooltip Event

Avoid:

```typescript
tooltipRender: (
    args: any
): void => {
    // ...
}
```

Use:

```typescript
tooltipRender: (
    args: ITooltipEventArgs
): void => {
    // ...
}
```

### Direct JSON Mapping

Avoid:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: data,
        xName: 'month',
        yName: 'year',
        valueName: 'value'
    });
```

Use:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: data,

        dataSourceSettings: {
            isJsonData: true,
            adaptorType: 'Cell',
            xDataMapping: 'month',
            yDataMapping: 'year',
            valueMapping: 'value'
        }
    });
```

### Missing Adaptor Module

Incorrect:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSourceSettings: {
            adaptorType: 'Cell'
        }
    });
```

Correct:

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    Adaptor
);
```

### TypeScript Injection in Global JavaScript

Avoid:

```javascript
ej.heatmap.HeatMap.Inject(
    ej.heatmap.Legend
);
```

Use the global constructor directly.

### Missing CDN Dependencies

Do not load only:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>
```

Use the individual dependency order:

```html
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
```

### Incorrect Highlight Property

Avoid:

```typescript
enableCellHighlighting:
    true
```

Use:

```typescript
enableCellHighlight:
    true
```

### Unsupported Hover Event

Do not use:

```typescript
cellHover: (
    args
): void => {
    // ...
}
```

unless the installed HeatMap model explicitly exposes that event.

Use validated interactions such as:

```text
cellClick
cellDoubleClick
cellRender
tooltipRender
```

### Automatic Rendering Claim

Do not claim:

```text
HeatMap automatically switches to Canvas for large data.
```

Do not use:

```typescript
renderingMode: 'Auto'
```

unless explicitly supported by the installed version.

Select:

```typescript
renderingMode: 'SVG'
```

or:

```typescript
renderingMode: 'Canvas'
```

after testing.

### Unsupported Bubble Mapping

Avoid:

```typescript
bubbleSizeMapping:
    'size'
```

Use:

```typescript
cellSettings: {
    tileType: 'Bubble',
    bubbleType: 'Size'
}
```

### Unsupported Selection Module

Avoid:

```typescript
import {
    CellSelection
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(
    CellSelection
);
```

Use selection settings exposed by the installed HeatMap version.

### Unverified Export and Print Features

Do not import or document HeatMap export and print modules until they are verified in the installed `@syncfusion/ej2-heatmap` package.

Validate:

```text
Export method
Supported formats
Required modules
Required enablement properties
SVG behavior
Canvas behavior
Legend inclusion
Filename handling
```

### Unsupported Accessibility Properties

Avoid:

```typescript
enableAccessibility: true
```

Avoid:

```typescript
allowKeyboardNavigation: true
```

unless the installed HeatMap API explicitly supports them.

### Invalid Grid Role

Avoid:

```html
<div
    id="heatmap"
    role="grid"
></div>
```

unless the complete ARIA grid pattern and keyboard interaction are implemented.

### Hidden Accessible Table

Avoid:

```css
.data-table {
    display: none;
}
```

Use a visually hidden style that retains semantic table content for assistive technology.

### Very Large Matrix

Avoid:

```typescript
generateData(
    10000,
    10000
);
```

Use bounded dimensions and validate memory usage.

### Refresh Per Cell

Avoid:

```typescript
updates.forEach(
    (update) => {
        data[
            update.rowIndex
        ][
            update.columnIndex
        ] =
            update.value;

        heatmap.refresh();
    }
);
```

Refresh once:

```typescript
updates.forEach(
    (update) => {
        data[
            update.rowIndex
        ][
            update.columnIndex
        ] =
            update.value;
    }
);

heatmap.dataSource =
    data;

heatmap.refresh();
```

### Recreating the HeatMap for Each Update

Avoid:

```typescript
const heatmap =
    new HeatMap({
        dataSource: newData
    });

heatmap.appendTo('#heatmap');
```

Use:

```typescript
heatmap.dataSource =
    newData;

heatmap.refresh();
```

### Missing Cleanup

When removing the view:

```typescript
window.clearInterval(
    intervalId
);

window.removeEventListener(
    'resize',
    resizeHandler
);

requestController.abort();

heatmap.destroy();
```

### Malformed CDN Link

Do not wrap the URL in an anchor element.

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

Do not place the following inside executable HTML, TypeScript, JavaScript, CSS, imports, templates, commands, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```