# Data Labels and Tooltips

## Overview

EJ2 Sparkline provides three related capabilities for displaying point information:

- **Data labels** render values directly beside selected Sparkline points.
- **Tooltips** display contextual information when users hover over or interact with a point.
- **Tracker lines** draw a vertical reference line through the currently hovered point.

The correct EJ2 Sparkline configuration uses:

```typescript
dataLabelSettings
```

for data labels and:

```typescript
tooltipSettings
```

for tooltips and tracker lines.

The supplied material contained several incorrect patterns that must be corrected:

- Data-label visibility accepts an array of point categories, not a Boolean.
- Data labels do not require `SparklineTooltip` injection.
- Tooltips require `SparklineTooltip` in TypeScript.
- Use `tooltipSettings.visible`, not `tooltip.enable`.
- Use `tooltipSettings`, not `tooltip`.
- Use `tooltipSettings.trackLineSettings`, not a root-level `trackball`.
- Use `textStyle.size`, not `textStyle.fontSize`.
- Tooltip formatting uses validated placeholders such as `${x}` and `${y}`.
- Inline `${x:format}` and `${y:format}` formatting must not be documented unless verified against the installed EJ2 version.
- Ordinary property updates should be followed by `dataBind()`.
- Use `refresh()` only when a complete rerender is necessary.

Data-label visibility supports `All`, `Start`, `End`, `High`, `Low`, and `Negative`. Tooltip and tracker-line interaction is provided through `SparklineTooltip`.

## Table of Contents

- #data-labels
  - #data-label-visibility
  - #typescript-data-label-example
  - #javascript-data-label-example
  - #data-label-customization
  - #data-label-format
- #tooltip-configuration
  - #required-tooltip-module
  - #typescript-tooltip-example
  - #javascript-tooltip-example
  - #tooltip-customization
  - #tooltip-format
  - #tooltip-template
- #tracker-line
  - #tracker-line-configuration
  - #tooltip-with-tracker-line
- #common-patterns
  - #all-point-labels
  - #extreme-point-labels
  - #category-tooltip
  - #datetime-tooltip
  - #compact-hover-only-sparkline
- #dynamic-updates
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
- #combined-mistakes-and-future-references

## Data Labels

Data labels display Sparkline point values directly in the rendered visualization.

Data labels do not require module injection.

Basic import:

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';
```

Do not inject `SparklineTooltip` only to display data labels.

### Data Label Visibility

The `visible` property accepts an array of point-category values.

Display labels for every point:

```typescript
dataLabelSettings: {
    visible: [
        'All'
    ]
}
```

Display only the first point:

```typescript
dataLabelSettings: {
    visible: [
        'Start'
    ]
}
```

Display only the final point:

```typescript
dataLabelSettings: {
    visible: [
        'End'
    ]
}
```

Display only the highest point:

```typescript
dataLabelSettings: {
    visible: [
        'High'
    ]
}
```

Display only the lowest point:

```typescript
dataLabelSettings: {
    visible: [
        'Low'
    ]
}
```

Display labels for negative points:

```typescript
dataLabelSettings: {
    visible: [
        'Negative'
    ]
}
```

Combine multiple categories:

```typescript
dataLabelSettings: {
    visible: [
        'Start',
        'End',
        'High',
        'Low',
        'Negative'
    ]
}
```

Do not use:

```typescript
dataLabelSettings: {
    visible: true
}
```

The documented visibility categories are `All`, `Start`, `End`, `High`, `Low`, and `Negative`.

### TypeScript Data Label Example

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';

const salesData: number[] = [
    35,
    28,
    34,
    32,
    40,
    42
];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '140px',
        type: 'Column',
        valueType: 'Numeric',
        dataSource: salesData,
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        dataLabelSettings: {
            visible: [
                'All'
            ]
        }
    });

sparkline.appendTo('#sparkline');
```

### JavaScript Data Label Example

```javascript
var salesData = [
    35,
    28,
    34,
    32,
    40,
    42
];

var sparkline =
    new ej.charts.Sparkline({
        width: '100%',
        height: '140px',
        type: 'Column',
        valueType: 'Numeric',
        dataSource: salesData,
        fill: '#2563EB',
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        dataLabelSettings: {
            visible: [
                'All'
            ]
        }
    });

sparkline.appendTo('#sparkline');
```

The JavaScript global bundle includes the required Sparkline functionality. Explicit TypeScript-style injection is not required for basic data labels.

### Data Label Customization

Data labels support appearance customization through:

- `fill`
- `opacity`
- `border`
- `textStyle`
- `format`
- `offset`

Example:

```typescript
dataLabelSettings: {
    visible: [
        'All'
    ],
    fill: '#FFFFFF',
    opacity: 0.95,
    border: {
        color: '#2563EB',
        width: 1
    },
    textStyle: {
        color: '#1E3A8A',
        size: '11px',
        fontFamily: 'Segoe UI',
        fontStyle: 'Normal',
        fontWeight: '600',
        opacity: 1
    }
}
```

The documented customization model includes fill, border, opacity, and text styling.

Use `textStyle.color` for label text color.

Incorrect:

```typescript
dataLabelSettings: {
    color: '#0000FF'
}
```

Correct:

```typescript
dataLabelSettings: {
    textStyle: {
        color: '#0000FF'
    }
}
```

### Data Label Format

The `format` property controls data-label content.

For object data:

```typescript
dataLabelSettings: {
    visible: [
        'All'
    ],
    format: '${x} : ${y}'
}
```

Complete example:

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
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        dataLabelSettings: {
            visible: [
                'All'
            ],
            format: '${x} : ${y}',
            fill: '#EFF6FF',
            border: {
                color: '#2563EB',
                width: 1
            },
            textStyle: {
                color: '#1E3A8A',
                size: '11px'
            }
        }
    });
```

The documented format pattern supports datasource placeholders such as `${x}` and `${y}`.

Do not treat number-format patterns such as the following as guaranteed Sparkline data-label formatting:

```typescript
format: '###,###.00'
```

```typescript
format: '$###,###.00'
```

```typescript
format: '0.00%'
```

Use `${x}` and `${y}` placeholders, or handle advanced formatting through the relevant rendering event after validating its event argument model.

## Tooltip Configuration

Sparkline tooltips display information for the point under the mouse or pointer.

The correct property is:

```typescript
tooltipSettings
```

The correct visibility property is:

```typescript
visible: true
```

Correct:

```typescript
tooltipSettings: {
    visible: true
}
```

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

### Required Tooltip Module

In TypeScript, import and inject `SparklineTooltip`.

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

Perform the injection before creating the Sparkline instance.

Tooltip support requires the `SparklineTooltip` module.

### TypeScript Tooltip Example

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);

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
        tooltipSettings: {
            visible: true
        }
    });

sparkline.appendTo('#sparkline');
```

### JavaScript Tooltip Example

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
        tooltipSettings: {
            visible: true
        }
    });

sparkline.appendTo('#sparkline');
```

When the complete EJ2 global script is used, this explicit injection is unnecessary:

```javascript
ej.charts.Sparkline.Inject(
    ej.charts.SparklineTooltip
);
```

Use global injection only when the specific modular JavaScript distribution requires it.

### Tooltip Customization

The tooltip can be customized through:

- `visible`
- `format`
- `fill`
- `border`
- `textStyle`
- `template`
- `trackLineSettings`

Example:

```typescript
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
    }
}
```

The tooltip model provides fill, format, border, template, text style, tracker-line settings, and visibility properties.

Use:

```typescript
textStyle: {
    size: '12px'
}
```

Do not use:

```typescript
textStyle: {
    fontSize: 12
}
```

### Tooltip Format

For Category data:

```typescript
tooltipSettings: {
    visible: true,
    format: '${x} : ${y}'
}
```

Complete example:

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
    }
];

const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}'
        }
    });
```

The documented tooltip format uses placeholders such as `${x}` and `${y}`.

Do not document the following as universally supported without validating the installed package:

```typescript
format: '${x:MMM yyyy} : ${y:n2}'
```

Inline placeholder format specifiers can vary across EJ2 components and versions. For a runtime-safe general Sparkline guide, use:

```typescript
format: '${x} : ${y}'
```

If locale-aware number or DateTime formatting is mandatory, use a validated tooltip-render event or prepare a preformatted datasource field.

### Tooltip Template

Sparkline tooltips support templates.

Template element:

```html
<div
    id="sparkline-tooltip-template"
    style="display: none;"
>
    <div class="sparkline-tooltip-content">
        <strong>${x}</strong>
        <span>${y}</span>
    </div>
</div>
```

Sparkline configuration:

```typescript
tooltipSettings: {
    visible: true,
    template:
        '#sparkline-tooltip-template'
}
```

Template CSS:

```css
.sparkline-tooltip-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px;
    border-radius: 6px;
    color: #FFFFFF;
    background: #111827;
}
```

Validate the exact template selector and context behavior against the installed EJ2 version before using complex template logic.

## Tracker Line

The Sparkline interaction feature is called a tracker line, not a trackball.

The tracker line is configured within:

```typescript
tooltipSettings.trackLineSettings
```

Do not use:

```typescript
trackball: {
    enable: true
}
```

Sparkline user interaction consists of tooltip and tracker-line features.

### Tracker Line Configuration

```typescript
tooltipSettings: {
    visible: true,
    trackLineSettings: {
        visible: true,
        color: '#64748B',
        width: 1
    }
}
```

The tooltip module is required because tracker-line configuration belongs to `tooltipSettings`.

### Tooltip with Tracker Line

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);

interface TimeSeriesData {
    date: Date;
    value: number;
}

const timeSeriesData:
    TimeSeriesData[] = [
        {
            date: new Date(2025, 0, 1),
            value: 21.256
        },
        {
            date: new Date(2025, 1, 1),
            value: 24.578
        },
        {
            date: new Date(2025, 2, 1),
            value: 36.894
        },
        {
            date: new Date(2025, 3, 1),
            value: 30.412
        }
    ];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Line',
        valueType: 'DateTime',
        dataSource: timeSeriesData,
        xName: 'date',
        yName: 'value',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'All'
            ],
            size: 5,
            fill: '#FFFFFF',
            border: {
                color: '#2563EB',
                width: 2
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
                size: '12px'
            },
            trackLineSettings: {
                visible: true,
                color: '#64748B',
                width: 1
            }
        }
    });

sparkline.appendTo('#sparkline');
```

## Common Patterns

### All Point Labels

Use this pattern when the Sparkline contains only a few points and every value must remain visible.

```typescript
dataLabelSettings: {
    visible: [
        'All'
    ],
    format: '${y}',
    fill: '#FFFFFF',
    border: {
        color: '#CBD5E1',
        width: 1
    },
    textStyle: {
        color: '#0F172A',
        size: '11px'
    }
}
```

### Extreme Point Labels

Use this pattern when only the highest and lowest values need emphasis.

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
        color: '#0F172A',
        size: '11px',
        fontWeight: '600'
    }
}
```

The same special-point categories can be used to identify important values visually.

### Category Tooltip

```typescript
valueType: 'Category',
dataSource: salesData,
xName: 'month',
yName: 'sales',
tooltipSettings: {
    visible: true,
    format: '${x} : ${y}'
}
```

### DateTime Tooltip

```typescript
valueType: 'DateTime',
dataSource: timeSeriesData,
xName: 'date',
yName: 'value',
tooltipSettings: {
    visible: true,
    format: '${x} : ${y}',
    trackLineSettings: {
        visible: true,
        color: '#64748B',
        width: 1
    }
}
```

Use JavaScript `Date` objects:

```typescript
{
    date: new Date(2025, 0, 1),
    value: 21.256
}
```

### Compact Hover-Only Sparkline

For a compact dashboard card, omit data labels and use only tooltip interaction:

```typescript
const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '80px',
        type: 'Line',
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales',
        fill: '#2563EB',
        lineWidth: 2,
        markerSettings: {
            visible: [
                'High',
                'Low'
            ],
            size: 6
        },
        dataLabelSettings: {
            visible: []
        },
        tooltipSettings: {
            visible: true,
            format: '${x} : ${y}',
            trackLineSettings: {
                visible: true,
                color: '#94A3B8',
                width: 1
            }
        }
    });
```

## Dynamic Updates

Enable all labels:

```typescript
sparkline.dataLabelSettings.visible = [
    'All'
];

sparkline.dataBind();
```

Show only high and low labels:

```typescript
sparkline.dataLabelSettings.visible = [
    'High',
    'Low'
];

sparkline.dataBind();
```

Change the label format:

```typescript
sparkline.dataLabelSettings.format =
    '${y}';

sparkline.dataBind();
```

Enable the tooltip:

```typescript
sparkline.tooltipSettings.visible =
    true;

sparkline.dataBind();
```

Enable the tracker line:

```typescript
sparkline
    .tooltipSettings
    .trackLineSettings
    .visible = true;

sparkline.dataBind();
```

Use `dataBind()` for ordinary property updates.

Use `refresh()` only when:

- Component dimensions changed.
- The parent became visible after being hidden.
- A complete visual reconstruction is necessary.
- Major structural settings changed.

## Complete TypeScript Example

The following example includes:

- Category data
- Column Sparkline
- High and low markers
- High and low data labels
- Tooltip
- Tracker line
- Tooltip appearance
- Runtime label-mode switching
- Runtime tooltip switching
- Correct imports and module injection
- Complete HTML container
- Responsive dimensions

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

    <title>Sparkline Data Labels and Tooltips</title>

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
            max-width: 520px;
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
            height: 180px;
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
            Hover over the Sparkline to inspect
            individual monthly values.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="show-all-labels"
                type="button"
            >
                Show All Labels
            </button>

            <button
                id="show-extreme-labels"
                type="button"
            >
                Show High and Low
            </button>

            <button
                id="hide-labels"
                type="button"
            >
                Hide Labels
            </button>

            <button
                id="toggle-tooltip"
                type="button"
            >
                Disable Tooltip
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

interface SalesData {
    month: string;
    sales: number;
}

Sparkline.Inject(
    SparklineTooltip
);

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
        height: '180px',
        type: 'Column',
        valueType: 'Category',
        dataSource: salesData,
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
            top: 20,
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
    '#show-all-labels',
    (): void => {
        sparkline
            .dataLabelSettings
            .visible = [
                'All'
            ];

        sparkline.dataBind();
    }
);

bindButton(
    '#show-extreme-labels',
    (): void => {
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
    '#hide-labels',
    (): void => {
        sparkline
            .dataLabelSettings
            .visible = [];

        sparkline.dataBind();
    }
);

bindButton(
    '#toggle-tooltip',
    (): void => {
        sparkline
            .tooltipSettings
            .visible =
                !sparkline
                    .tooltipSettings
                    .visible;

        const button:
            HTMLButtonElement | null =
                document.querySelector(
                    '#toggle-tooltip'
                );

        if (button) {
            button.textContent =
                sparkline
                    .tooltipSettings
                    .visible
                    ? 'Disable Tooltip'
                    : 'Enable Tooltip';
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

    <title>Sparkline Data Labels and Tooltips</title>

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
            max-width: 520px;
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
            height: 180px;
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
            Hover over the Sparkline to inspect
            individual monthly values.
        </p>

        <div class="sparkline-toolbar">
            <button
                id="show-all-labels"
                type="button"
            >
                Show All Labels
            </button>

            <button
                id="show-extreme-labels"
                type="button"
            >
                Show High and Low
            </button>

            <button
                id="hide-labels"
                type="button"
            >
                Hide Labels
            </button>

            <button
                id="toggle-tooltip"
                type="button"
            >
                Disable Tooltip
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
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '180px',
                type: 'Column',
                valueType: 'Category',
                dataSource: salesData,
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
                    top: 20,
                    bottom: 12
                }
            });

        sparkline.appendTo('#sparkline');

        document
            .getElementById(
                'show-all-labels'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .dataLabelSettings
                        .visible = [
                            'All'
                        ];

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'show-extreme-labels'
            )
            .addEventListener(
                'click',
                function () {
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
                'hide-labels'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .dataLabelSettings
                        .visible = [];

                    sparkline.dataBind();
                }
            );

        document
            .getElementById(
                'toggle-tooltip'
            )
            .addEventListener(
                'click',
                function () {
                    sparkline
                        .tooltipSettings
                        .visible =
                            !sparkline
                                .tooltipSettings
                                .visible;

                    this.textContent =
                        sparkline
                            .tooltipSettings
                            .visible
                            ? 'Disable Tooltip'
                            : 'Enable Tooltip';

                    sparkline.dataBind();
                }
            );
    </script>
</body>
</html>
```

## Best Practices

### Data Labels

- Use `All` only for small datasets.
- Use `High` and `Low` for compact KPI visualizations.
- Use `Start` and `End` to emphasize trend direction.
- Use `Negative` for financial or variance data.
- Maintain sufficient text and background contrast.
- Add top padding when labels may be clipped.
- Avoid dense labels on small Sparkline containers.

### Tooltips

- Import and inject `SparklineTooltip` in TypeScript.
- Use `tooltipSettings.visible`.
- Use `${x}` and `${y}` for support-safe formatting.
- Keep tooltip content concise.
- Use a tracker line for Line and Area Sparklines.
- Use visible markers to improve point identification.
- Test hover and touch interaction on target devices.

### Tracker Line

- Configure it through `tooltipSettings.trackLineSettings`.
- Use a color that is visible but does not overpower the series.
- Keep the line width small.
- Do not describe it as a separate `trackball` property.
- Validate interaction with Pie and WinLoss types before documenting it for those types.

### Performance

- Avoid rendering labels for every point in dense datasets.
- Avoid complex HTML tooltip templates for every interaction.
- Use `dataBind()` for ordinary property updates.
- Avoid unnecessary `refresh()` calls.
- Destroy the Sparkline when its containing application view is removed.

## Combined Mistakes and Future References

### Boolean Data Label Visibility

Incorrect:

```typescript
dataLabelSettings: {
    visible: true
}
```

Correct:

```typescript
dataLabelSettings: {
    visible: [
        'All'
    ]
}
```

### Tooltip Injection for Data Labels

Incorrect:

```typescript
Sparkline.Inject(
    SparklineTooltip
);
```

when only data labels are used.

Basic data labels require no additional module.

### Wrong Tooltip Property

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true
}
```

### Wrong Tooltip Visibility Property

Incorrect:

```typescript
tooltipSettings: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true
}
```

### Missing Tooltip Module

Incorrect TypeScript configuration:

```typescript
tooltipSettings: {
    visible: true
}
```

without importing and injecting `SparklineTooltip`.

Correct:

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

### Unnecessary JavaScript Global Injection

When the complete EJ2 global bundle is loaded, avoid unnecessary injection:

```javascript
ej.charts.Sparkline.Inject(
    ej.charts.SparklineTooltip
);
```

Create the Sparkline directly:

```javascript
var sparkline =
    new ej.charts.Sparkline({
        tooltipSettings: {
            visible: true
        }
    });
```

### Wrong Tracker Property

Incorrect:

```typescript
trackball: {
    enable: true
}
```

Correct:

```typescript
tooltipSettings: {
    visible: true,
    trackLineSettings: {
        visible: true
    }
}
```

### Wrong Tooltip Text Size

Incorrect:

```typescript
textStyle: {
    fontSize: 12
}
```

Correct:

```typescript
textStyle: {
    size: '12px'
}
```

### Wrong Data Label Text Color

Incorrect:

```typescript
dataLabelSettings: {
    color: '#0000FF'
}
```

Correct:

```typescript
dataLabelSettings: {
    textStyle: {
        color: '#0000FF'
    }
}
```

### Unverified Inline Placeholder Formatting

Avoid documenting this as universally supported:

```typescript
tooltipSettings: {
    format:
        '${x:MMM yyyy} : ${y:n2}'
}
```

Use the validated general format:

```typescript
tooltipSettings: {
    format: '${x} : ${y}'
}
```

Use an event or preformatted field when advanced locale formatting is required.

### Chart-Style Number Format Assumption

Avoid:

```typescript
dataLabelSettings: {
    format: '$###,###.00'
}
```

Use datasource placeholders:

```typescript
dataLabelSettings: {
    format: '${y}'
}
```

### Using refresh for Ordinary Updates

Avoid:

```typescript
sparkline
    .dataLabelSettings
    .visible = [
        'All'
    ];

sparkline.refresh();
```

Preferred:

```typescript
sparkline
    .dataLabelSettings
    .visible = [
        'All'
    ];

sparkline.dataBind();
```

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

### Import and Injection Validation Checklist

Before generating a Sparkline data-label and tooltip example, verify:

1. `Sparkline` is imported from `@syncfusion/ej2-charts`.
2. JavaScript uses `ej.charts.Sparkline`.
3. Data labels use `dataLabelSettings`.
4. Data-label visibility is an array.
5. `All`, `Start`, `End`, `High`, `Low`, or `Negative` is used.
6. Data labels do not unnecessarily inject `SparklineTooltip`.
7. Tooltip usage imports `SparklineTooltip`.
8. Tooltip usage injects `SparklineTooltip`.
9. Tooltip configuration uses `tooltipSettings`.
10. Tooltip visibility uses `visible`.
11. The root-level `tooltip` property is not used.
12. Tooltip format uses validated placeholders.
13. Tooltip text size uses `size`.
14. Tooltip tracker line uses `trackLineSettings`.
15. A root-level `trackball` property is not used.
16. Data-label text color is inside `textStyle`.
17. Marker visibility is configured through `markerSettings`.
18. Category data uses `valueType: 'Category'`.
19. DateTime data uses `valueType: 'DateTime'`.
20. Numeric data uses `valueType: 'Numeric'`.
21. DateTime values are JavaScript `Date` objects.
22. `xName` matches the datasource x-field.
23. `yName` matches the datasource y-field.
24. Dynamic property updates call `dataBind()`.
25. `refresh()` is reserved for complete rerender scenarios.
26. The host element exists before `appendTo()`.
27. The host selector matches the HTML ID.
28. The component has sufficient width and height.
29. The EJ2 theme stylesheet is loaded.
30. TypeScript and JavaScript examples are complete and runnable.
31. Vue, React, Angular, Composition API, provider, directive, and Single File Component syntax are not used.