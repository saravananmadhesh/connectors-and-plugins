---
name: syncfusion-javascript-sparkline
description: Create compact, lightweight sparklines in Syncfusion TypeScript and JavaScript. Immediately use this skill when user needs to visualize small data trends, create sparklines in grids, display line/column/area/pie/win-loss charts, add markers for high/low/start/end/negative points, configure data labels and tooltips, customize appearance, enable interactivity with trackball, or implement accessibility features. Works with TypeScript (module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Sparklines in Syncfusion TypeScript and JavaScript

The Syncfusion EJ2 Sparkline is a lightweight data-visualization component for showing trends, comparisons, proportions, and outcome patterns in a compact area. It is suitable for dashboards, cards, tables, grids, reports, and KPI summaries.

This skill covers:

- EJ2 TypeScript using `@syncfusion/ej2-charts`
- EJ2 JavaScript using `ej.charts.Sparkline`
- npm and bundler-based TypeScript applications
- Global CDN-based JavaScript applications
- Line, Column, Area, Pie, and WinLoss Sparklines
- Markers, data labels, tooltips, tracker lines, and range bands
- Appearance, axis ranges, accessibility, RTL, and localization
- Dynamic property and datasource updates

Do not generate Vue, React, Angular, Composition API, directive, provider, or Single File Component examples when this skill is used.

## Platform Support

### TypeScript

Use TypeScript when the project requires:

- Static type checking
- IDE IntelliSense
- ES module imports
- npm package management
- Webpack or another bundler
- Typed event arguments
- Explicit optional-feature module injection

Import the component from:

```typescript
import {
    Sparkline
} from '@syncfusion/ej2-charts';
```

Create and render it:

```typescript
const sparkline: Sparkline =
    new Sparkline(configuration);

sparkline.appendTo('#sparkline');
```

Basic Sparkline features do not require module injection.

The following features work without optional module injection:

- Basic rendering
- Line, Column, Area, Pie, and WinLoss types
- Axis ranges and reference line
- Markers
- Data labels
- Range bands
- Special-point colors
- Appearance customization
- Rendering events

Tooltip and tracker-line features require `SparklineTooltip`:

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

Do not call an empty injection method:

```typescript
Sparkline.Inject();
```

### JavaScript

Use JavaScript when the project requires:

- Direct browser execution
- CDN-based dependency loading
- No TypeScript compilation
- No module bundler
- Global EJ2 namespace access

Create the component through:

```javascript
var sparkline =
    new ej.charts.Sparkline(
        configuration
    );

sparkline.appendTo('#sparkline');
```

When the complete EJ2 global bundle is loaded, explicit TypeScript-style feature injection is generally unnecessary.

## When to Use This Skill

Use this skill when the user needs to:

- Display compact data trends.
- Add a Sparkline to a dashboard card.
- Add Sparklines to table or grid cells.
- Render a Line, Column, Area, Pie, or WinLoss Sparkline.
- Bind a numeric array.
- Bind object data through `xName` and `yName`.
- Configure Numeric, Category, or DateTime x-values.
- Highlight high, low, start, end, or negative points.
- Add markers to selected points.
- Display data labels.
- Enable tooltips.
- Enable a tracker line.
- Configure one or more range bands.
- Set fixed x-axis or y-axis ranges.
- Customize the horizontal reference line.
- Apply colors, borders, opacity, padding, and themes.
- Update the datasource dynamically.
- Change the Sparkline type at runtime.
- Customize rendered points through events.
- Implement accessible text and data alternatives.
- Enable right-to-left rendering.
- Localize surrounding labels, summaries, numbers, or dates.

## Validation Workflow

Before generating Sparkline code, validate the following items.

### Step 1: Identify the Platform

Determine whether the user needs:

- TypeScript
- JavaScript
- Both TypeScript and JavaScript

Do not substitute a framework-specific wrapper.

### Step 2: Identify the Sparkline Type

Supported values are:

```text
Line
Column
Area
Pie
WinLoss
```

Configure the type at Sparkline root level:

```typescript
type: 'Line'
```

### Step 3: Identify the Datasource Structure

A datasource can be:

- A numeric array
- An object array with numeric x-values
- An object array with category x-values
- An object array with DateTime x-values

Numeric array:

```typescript
dataSource: [
    2,
    6,
    4,
    1,
    3
]
```

Object array:

```typescript
dataSource: [
    {
        month: 'Jan',
        sales: 35
    },
    {
        month: 'Feb',
        sales: 28
    }
],
xName: 'month',
yName: 'sales'
```

Do not provide `xName` or `yName` for a plain numeric array.

### Step 4: Validate valueType

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

Do not use:

```typescript
valueType: 'Double'
```

### Step 5: Identify Optional Features

| Feature | TypeScript module |
|---|---|
| Basic rendering | No optional module |
| Sparkline types | No optional module |
| Markers | No optional module |
| Data labels | No optional module |
| Axis configuration | No optional module |
| Range bands | No optional module |
| Appearance | No optional module |
| Tooltip | `SparklineTooltip` |
| Tracker line | `SparklineTooltip` |

### Step 6: Validate Configuration Hierarchy

Use:

```typescript
markerSettings
```

for markers.

Use:

```typescript
dataLabelSettings
```

for data labels.

Use:

```typescript
tooltipSettings
```

for tooltips.

Use:

```typescript
tooltipSettings: {
    trackLineSettings: {
        visible: true
    }
}
```

for the tracker line.

Use:

```typescript
rangeBandSettings: [
    {
        startRange: 30,
        endRange: 40
    }
]
```

for range bands.

Use:

```typescript
axisSettings: {
    lineSettings: {
        visible: true
    }
}
```

for the horizontal reference line.

### Step 7: Validate the Host

Confirm that:

- The host element exists.
- The selector matches the host ID.
- The parent has an available width.
- The Sparkline has a usable height.
- The EJ2 theme stylesheet is loaded.
- A component initialized in a hidden parent is refreshed after becoming visible.

## Navigation Guide

### Getting Started

Read:

```text
references/getting-started.md
```

Use it for:

- Package installation
- TypeScript setup
- JavaScript setup
- CDN usage
- Container setup
- Initial rendering
- Numeric, Category, and DateTime binding
- Dynamic datasource updates

### Sparkline Types

Read:

```text
references/sparkline-types.md
```

Use it for:

- Line Sparkline
- Column Sparkline
- Area Sparkline
- Pie Sparkline
- WinLoss Sparkline
- Type-specific appearance
- Runtime type switching
- Type-selection guidance

### Appearance and Styling

Read:

```text
references/appearance-styling.md
```

Use it for:

- Sparkline fill
- Line width
- Series border
- Container background
- Container border
- Internal padding
- Pie palette
- Special-point colors
- Responsive sizing
- Themes
- Runtime styling updates

### Markers and Special Points

Read:

```text
references/markers-and-points.md
```

Use it for:

- All-point markers
- Start and end markers
- High and low markers
- Negative-point markers
- Marker fill
- Marker border
- Marker opacity
- Marker size
- Special-point colors
- Marker-rendering events

### Data Labels and Tooltips

Read:

```text
references/data-labels-and-tooltips.md
```

Use it for:

- Data-label visibility
- Data-label formatting
- Data-label appearance
- Tooltip module injection
- Tooltip visibility
- Tooltip formatting
- Tooltip templates
- Tracker-line configuration
- Dynamic interaction updates

### Range Bands

Read:

```text
references/range-bands.md
```

Use it for:

- Single range bands
- Multiple range bands
- Target intervals
- Performance zones
- Tolerance bands
- Range-band color and opacity
- Axis-range alignment
- Runtime band updates

### Axis Customization

Read:

```text
references/axis-customization.md
```

Use it for:

- `minX`
- `maxX`
- `minY`
- `maxY`
- Horizontal reference-line value
- Reference-line appearance
- Fixed comparison scales
- Dynamic range calculation

Sparkline does not expose conventional x-axis and y-axis labels, tick labels, label rotation, or an axis-label style model.

### User Interaction

Read:

```text
references/user-interaction.md
```

Use it for:

- Tooltips
- Tracker lines
- Tooltip templates
- Point-rendering events
- Marker-rendering events
- Data-label-rendering events
- Load and loaded events
- Custom application-managed selection
- Accessible interaction alternatives

### Accessibility and Localization

Read:

```text
references/accessibility-localization.md
```

Use it for:

- Text alternatives
- Color contrast
- Non-color visual cues
- Data-table alternatives
- Dynamic update announcements
- Native keyboard controls
- RTL rendering
- Localized categories
- Locale-aware number and date formatting

## Installation

Install the EJ2 Charts package:

```bash
npm install @syncfusion/ej2-charts
```

The required transitive dependencies are installed automatically.

Do not require separate installation of `ej2-base`, `ej2-data`, or `ej2-svg-base` unless the package manager reports a specific resolution problem.

## Theme Setup


Configure the corresponding component theme when required:

```typescript
theme: 'Material'
```

## Host Setup

```html
<div class="sparkline-wrapper">
    <div id="sparkline"></div>
</div>
```

```css
.sparkline-wrapper {
    width: 100%;
    max-width: 500px;
}

#sparkline {
    width: 100%;
    height: 140px;
}
```

Render only after the host element exists:

```typescript
const host:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (!host) {
    throw new Error(
        'The Sparkline host element was not found.'
    );
}

sparkline.appendTo(host);
```

## Quick Start

### TypeScript

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
        .sparkline-wrapper {
            width: 100%;
            max-width: 400px;
        }

        #sparkline {
            width: 100%;
            height: 120px;
        }
    </style>
</head>
<body>
    <div class="sparkline-wrapper">
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

interface PopulationData {
    year: string;
    population: number;
}

const populationData:
    PopulationData[] = [
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
        },
        {
            year: '2011',
            population: 21766710
        }
    ];

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '120px',
        type: 'Line',
        valueType: 'Category',
        dataSource:
            populationData,
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
                color: '#1D4ED8',
                width: 2
            }
        }
    });

sparkline.appendTo('#sparkline');
```

### JavaScript

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
        .sparkline-wrapper {
            width: 100%;
            max-width: 400px;
        }

        #sparkline {
            width: 100%;
            height: 120px;
        }
    </style>
</head>
<body>
    <div class="sparkline-wrapper">
        <div id="sparkline"></div>
    </div>

    <script>
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
            },
            {
                year: '2011',
                population: 21766710
            }
        ];

        var sparkline =
            new ej.charts.Sparkline({
                width: '100%',
                height: '120px',
                type: 'Line',
                valueType: 'Category',
                dataSource:
                    populationData,
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
                        color: '#1D4ED8',
                        width: 2
                    }
                }
            });

        sparkline.appendTo('#sparkline');
    </script>
</body>
</html>
```

## Sparkline Types

### Line

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Line',
        valueType: 'Numeric',
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

Use Line for ordered trends and continuous sequences.

### Column

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        valueType: 'Numeric',
        dataSource: [
            35,
            28,
            34,
            42
        ],
        fill: '#2563EB'
    });
```

Use Column for discrete value comparison.

### Area

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Area',
        valueType: 'Numeric',
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

Use Area when trend and magnitude relative to a baseline matter.

Do not describe Area as cumulative unless the datasource itself contains cumulative values.

### Pie

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'Pie',
        valueType: 'Numeric',
        dataSource: [
            40,
            30,
            20,
            10
        ],
        palette: [
            '#2563EB',
            '#EA580C',
            '#15803D',
            '#7C3AED'
        ]
    });
```

Use Pie for a small number of meaningful proportions.

### WinLoss

```typescript
const sparkline: Sparkline =
    new Sparkline({
        type: 'WinLoss',
        valueType: 'Numeric',
        dataSource: [
            1,
            -1,
            1,
            1,
            0,
            -1,
            1
        ],
        fill: '#15803D',
        negativePointColor:
            '#DC2626',
        tiePointColor: '#64748B'
    });
```

Use:

- Positive values for wins.
- Negative values for losses.
- Zero for ties or neutral outcomes.
- `fill` for positive outcomes.
- `negativePointColor` for negative outcomes.
- `tiePointColor` for neutral outcomes.

Do not use `highPointColor` and `lowPointColor` as the primary WinLoss colors.

## Data Binding

### Numeric Array

```typescript
const sparkline: Sparkline =
    new Sparkline({
        valueType: 'Numeric',
        dataSource: [
            2,
            6,
            4,
            1,
            3
        ]
    });
```

Do not configure field mappings for a numeric array.

### Numeric Object Data

```typescript
interface NumericData {
    sequence: number;
    value: number;
}

const data:
    NumericData[] = [
        {
            sequence: 1,
            value: 35
        },
        {
            sequence: 2,
            value: 28
        }
    ];

const sparkline: Sparkline =
    new Sparkline({
        valueType: 'Numeric',
        dataSource: data,
        xName: 'sequence',
        yName: 'value'
    });
```

### Category Data

```typescript
interface SalesData {
    month: string;
    sales: number;
}

const salesData:
    SalesData[] = [
        {
            month: 'Jan',
            sales: 35
        },
        {
            month: 'Feb',
            sales: 28
        }
    ];

const sparkline: Sparkline =
    new Sparkline({
        valueType: 'Category',
        dataSource: salesData,
        xName: 'month',
        yName: 'sales'
    });
```

### DateTime Data

```typescript
interface TimeSeriesData {
    date: Date;
    value: number;
}

const timeSeriesData:
    TimeSeriesData[] = [
        {
            date:
                new Date(2025, 0, 1),
            value: 21
        },
        {
            date:
                new Date(2025, 0, 2),
            value: 24
        }
    ];

const sparkline: Sparkline =
    new Sparkline({
        valueType: 'DateTime',
        dataSource:
            timeSeriesData,
        xName: 'date',
        yName: 'value'
    });
```

Use JavaScript `Date` instances rather than ambiguous date strings.

## Markers and Special Points

Marker visibility is an array.

```typescript
markerSettings: {
    visible: [
        'High',
        'Low'
    ],
    size: 8,
    fill: '#FFFFFF',
    opacity: 1,
    border: {
        color: '#111827',
        width: 2
    }
}
```

Supported point categories include:

```text
All
Start
End
High
Low
Negative
None
```

Special-point colors belong at Sparkline root level:

```typescript
startPointColor: '#7C3AED',
endPointColor: '#EA580C',
highPointColor: '#15803D',
lowPointColor: '#DC2626',
negativePointColor: '#B91C1C',
tiePointColor: '#64748B'
```

Incorrect:

```typescript
markerSettings: {
    highPointColor: '#15803D',
    lowPointColor: '#DC2626'
}
```

## Data Labels

Use `dataLabelSettings`.

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
        color: '#111827',
        size: '11px',
        fontFamily: 'Segoe UI',
        fontWeight: '600'
    }
}
```

Data-label visibility accepts an array.

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

Do not use:

```typescript
dataLabel
```

as the Sparkline configuration property.

## Tooltips and Tracker Line

### TypeScript Setup

```typescript
import {
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

Sparkline.Inject(
    SparklineTooltip
);
```

### Tooltip Configuration

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
        fontWeight: '500'
    }
}
```

### Tracker-Line Configuration

```typescript
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

Do not use:

```typescript
trackball: {
    enable: true
}
```

Do not use:

```typescript
tooltip: {
    enable: true
}
```

## Range Bands

Use an array of range-band objects:

```typescript
rangeBandSettings: [
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
]
```

Do not use:

```typescript
rangeBandSettings: {
    startValue: 30,
    endValue: 40
}
```

Use:

```typescript
startRange
```

and:

```typescript
endRange
```

Align range bands with the configured y-axis range:

```typescript
axisSettings: {
    minY: 0,
    maxY: 100
}
```

## Axis Configuration

Sparkline does not expose conventional x-axis and y-axis text labels.

The `axisSettings` model configures:

- `minX`
- `maxX`
- `minY`
- `maxY`
- `value`
- `lineSettings`

```typescript
axisSettings: {
    minY: 0,
    maxY: 100,
    value: 60,
    lineSettings: {
        visible: true,
        color: '#64748B',
        width: 1,
        opacity: 1
    }
}
```

The `value` property positions the horizontal reference line.

Do not use:

```typescript
axisSettings: {
    lineStyle: {}
}
```

Use:

```typescript
axisSettings: {
    lineSettings: {}
}
```

Do not use unsupported axis properties such as:

```typescript
labelStyle
```

```typescript
labelPosition
```

```typescript
labelRotation
```

```typescript
labelFormat
```

Use data labels, tooltips, or external HTML when visible textual values are required.

## Appearance

### Container

```typescript
containerArea: {
    background: '#FFFFFF',
    border: {
        color: '#CBD5E1',
        width: 1
    }
}
```

### Internal Padding

```typescript
padding: {
    left: 12,
    right: 12,
    top: 20,
    bottom: 12
}
```

`padding` is a root Sparkline property.

Do not place it inside `containerArea`.

### External Margin

Use CSS on a wrapper:

```css
.sparkline-wrapper {
    margin: 16px;
}
```

### Responsive Width

```typescript
width: '100%',
height: '140px'
```

The parent must provide a measurable width.

## Rendering Events

Prefer typed event arguments when available.

### Point Rendering

```typescript
import {
    IPointRenderingEventArgs,
    Sparkline
} from '@syncfusion/ej2-charts';

const sparkline: Sparkline =
    new Sparkline({
        type: 'Column',
        dataSource: [
            45,
            78,
            65,
            92
        ],
        pointRendering: (
            args:
                IPointRenderingEventArgs
        ): void => {
            const value: number =
                args.point.yVal;

            if (value >= 80) {
                args.fill = '#15803D';
            } else if (value >= 60) {
                args.fill = '#CA8A04';
            } else {
                args.fill = '#DC2626';
            }
        }
    });
```

Use:

```typescript
pointRendering
```

not:

```typescript
pointRender
```

A rendering event is not a click, hover, or selection event.

## Point Selection

Do not claim that Sparkline provides a built-in point-selection model comparable to the full Chart component.

If selection is required:

1. Use a native `<select>`, button group, list, or table.
2. Maintain the selected index in application state.
3. Use a rendering event to style the selected point.
4. Display the selected value in visible text.
5. Announce important selection changes through a live region.

Do not depend on generated SVG IDs or internal classes.

## Dynamic Updates

### Update Data

```typescript
sparkline.dataSource =
    updatedData;

sparkline.dataBind();
```

### Update Markers

```typescript
sparkline.markerSettings.visible = [
    'High',
    'Low'
];

sparkline.markerSettings.size = 10;
sparkline.dataBind();
```

### Update Special-Point Colors

```typescript
sparkline.highPointColor =
    '#15803D';

sparkline.lowPointColor =
    '#DC2626';

sparkline.dataBind();
```

### Update Range Bands

```typescript
sparkline.rangeBandSettings = [
    {
        startRange: 80,
        endRange: 100,
        color: '#86EFAC',
        opacity: 0.3
    }
];

sparkline.dataBind();
```

### Update Type

```typescript
sparkline.type = 'Column';
sparkline.dataBind();
```

### Update Appearance

```typescript
sparkline.fill = '#DC2626';

sparkline.border = {
    color: '#7F1D1D',
    width: 1
};

sparkline.dataBind();
```

Batch related changes and call `dataBind()` once.

Use `refresh()` when:

- Dimensions changed.
- A hidden parent became visible.
- Rendering-event state requires full point regeneration.
- Complete layout recalculation is required.

## Accessibility

A Sparkline must not rely only on visual presentation or pointer tooltips.

Provide:

- A visible heading or caption
- A concise trend summary
- A data table when exact values are important
- Markers or labels in addition to color
- Native controls for keyboard operations
- A live region for meaningful dynamic updates

Example:

```html
<figure aria-labelledby="sales-caption">
    <figcaption id="sales-caption">
        Monthly sales
    </figcaption>

    <p id="sales-description">
        Sales declined in February and then increased
        to the highest value in June.
    </p>

    <div
        id="sparkline"
        aria-describedby="sales-description"
    ></div>

    <details>
        <summary>
            View monthly sales data
        </summary>

        <table>
            <caption>
                Monthly sales values
            </caption>

            <thead>
                <tr>
                    <th scope="col">
                        Month
                    </th>
                    <th scope="col">
                        Sales
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th scope="row">
                        January
                    </th>
                    <td>35</td>
                </tr>
            </tbody>
        </table>
    </details>
</figure>
```

Do not make a static Sparkline focusable unless it offers a meaningful keyboard action.

Do not make tooltips the only source of exact values.

## RTL

Use:

```typescript
enableRtl: true
```

For an RTL section:

```html
<section lang="ar" dir="rtl">
    <div id="sparkline"></div>
</section>
```

Use both `enableRtl` and the appropriate surrounding HTML direction when the complete section is RTL.

## Localization

Translate Category datasource values through the application:

```typescript
const localizedData = [
    {
        label: 'Janvier',
        value: 35
    },
    {
        label: 'Février',
        value: 28
    }
];

const sparkline: Sparkline =
    new Sparkline({
        valueType: 'Category',
        dataSource: localizedData,
        xName: 'label',
        yName: 'value'
    });
```

Use `Intl.NumberFormat` for surrounding text and tables:

```typescript
const formattedValue: string =
    new Intl.NumberFormat(
        'fr-FR'
    ).format(35000);
```

Use `Intl.DateTimeFormat` for localized dates:

```typescript
const formattedDate: string =
    new Intl.DateTimeFormat(
        'fr-FR',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    ).format(
        new Date(2025, 0, 1)
    );
```

Sparkline has little built-in textual UI, so localization commonly applies to:

- Category values
- Captions
- Descriptions
- Tooltips
- Tables
- Status messages
- Numbers
- Dates

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

    <title>Complete EJ2 Sparkline</title>

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
            max-width: 640px;
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

        table {
            width: 100%;
            margin-top: 12px;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            border: 1px solid #CBD5E1;
            text-align: start;
        }
    </style>
</head>
<body>
    <main
        class="sparkline-card"
        aria-labelledby="sparkline-heading"
    >
        <h1 id="sparkline-heading">
            Monthly Performance
        </h1>

        <p id="sparkline-description">
            Values below 60 are below target, values
            from 60 to 79 are acceptable, and values
            of 80 or more are excellent.
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
                id="toggle-tooltip"
                type="button"
            >
                Disable Tooltip
            </button>

            <button
                id="update-data"
                type="button"
            >
                Update Data
            </button>
        </div>

        <div
            id="sparkline"
            aria-describedby="sparkline-description"
        ></div>

        <details>
            <summary>
                View performance data
            </summary>

            <table>
                <caption>
                    Monthly performance values
                </caption>

                <thead>
                    <tr>
                        <th scope="col">
                            Month
                        </th>
                        <th scope="col">
                            Score
                        </th>
                    </tr>
                </thead>

                <tbody id="data-body">
                </tbody>
            </table>
        </details>
    </main>

   <script scr="index.js"></script>
</body>
</html>
```

### index.ts

```typescript
import {
    IPointRenderingEventArgs,
    Sparkline,
    SparklineTooltip
} from '@syncfusion/ej2-charts';

interface PerformanceData {
    month: string;
    score: number;
}

Sparkline.Inject(
    SparklineTooltip
);

const initialData:
    PerformanceData[] = [
        {
            month: 'Jan',
            score: 45
        },
        {
            month: 'Feb',
            score: 78
        },
        {
            month: 'Mar',
            score: 65
        },
        {
            month: 'Apr',
            score: 92
        },
        {
            month: 'May',
            score: 55
        },
        {
            month: 'Jun',
            score: 88
        }
    ];

const updatedData:
    PerformanceData[] = [
        {
            month: 'Jan',
            score: 58
        },
        {
            month: 'Feb',
            score: 81
        },
        {
            month: 'Mar',
            score: 72
        },
        {
            month: 'Apr',
            score: 95
        },
        {
            month: 'May',
            score: 64
        },
        {
            month: 'Jun',
            score: 90
        }
    ];

const sparklineElement:
    HTMLElement | null =
        document.querySelector(
            '#sparkline'
        );

if (!sparklineElement) {
    throw new Error(
        'The Sparkline host was not found.'
    );
}

const sparkline: Sparkline =
    new Sparkline({
        width: '100%',
        height: '220px',
        type: 'Line',
        valueType: 'Category',
        dataSource: initialData,
        xName: 'month',
        yName: 'score',
        fill: '#2563EB',
        lineWidth: 3,
        highPointColor: '#15803D',
        lowPointColor: '#DC2626',
        axisSettings: {
            minY: 0,
            maxY: 100,
            value: 60,
            lineSettings: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        rangeBandSettings: [
            {
                startRange: 0,
                endRange: 60,
                color: '#FCA5A5',
                opacity: 0.18
            },
            {
                startRange: 60,
                endRange: 80,
                color: '#FDE68A',
                opacity: 0.18
            },
            {
                startRange: 80,
                endRange: 100,
                color: '#86EFAC',
                opacity: 0.18
            }
        ],
        markerSettings: {
            visible: [
                'All'
            ],
            size: 7,
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
                fontWeight: '500'
            },
            trackLineSettings: {
                visible: true,
                color: '#475569',
                width: 1
            }
        },
        pointRendering: (
            args:
                IPointRenderingEventArgs
        ): void => {
            const value: number =
                args.point.yVal;

            if (value >= 80) {
                args.fill = '#15803D';
            } else if (value >= 60) {
                args.fill = '#CA8A04';
            } else {
                args.fill = '#DC2626';
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

const renderTable = (
    data: PerformanceData[]
): void => {
    const body:
        HTMLTableSectionElement | null =
            document.querySelector(
                '#data-body'
            );

    if (!body) {
        return;
    }

    body.replaceChildren();

    data.forEach(
        (
            item: PerformanceData
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const month:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            month.scope = 'row';
            month.textContent =
                item.month;

            const score:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            score.textContent =
                String(item.score);

            row.append(
                month,
                score
            );

            body.append(row);
        }
    );
};

renderTable(initialData);

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
    '#show-line',
    (): void => {
        sparkline.type = 'Line';
        sparkline.fill = '#2563EB';
        sparkline.lineWidth = 3;

        sparkline
            .markerSettings
            .visible = [
                'All'
            ];

        sparkline.dataBind();
    }
);

bindButton(
    '#show-column',
    (): void => {
        sparkline.type = 'Column';
        sparkline.fill = '#2563EB';

        sparkline
            .markerSettings
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

bindButton(
    '#update-data',
    (): void => {
        sparkline.dataSource =
            updatedData;

        sparkline.dataBind();

        renderTable(updatedData);
    }
);
```

## Output Requirements

When generating a Sparkline solution:

1. Use only EJ2 TypeScript or JavaScript.
2. Do not generate framework wrappers.
3. Import `Sparkline` from `@syncfusion/ej2-charts`.
4. Use `ej.charts.Sparkline` in JavaScript.
5. Include a complete datasource.
6. Include the host HTML.
7. Include a usable width and height.
8. Load an EJ2 theme stylesheet.
9. Match `valueType` to the x-values.
10. Do not use field mappings with a plain numeric array.
11. Use `markerSettings` for markers.
12. Keep special-point colors at Sparkline root level.
13. Use `dataLabelSettings` for data labels.
14. Configure data-label visibility as an array.
15. Use `tooltipSettings` for tooltips.
16. Import and inject `SparklineTooltip` when tooltips are used in TypeScript.
17. Configure the tracker line through `trackLineSettings`.
18. Do not use a root `trackball`.
19. Configure range bands as an array.
20. Use `startRange` and `endRange`.
21. Use `axisSettings.lineSettings`.
22. Do not claim conventional Sparkline axis labels.
23. Use `lineWidth` for Line and Area path thickness.
24. Use `palette` for Pie segments.
25. Use `fill`, `negativePointColor`, and `tiePointColor` for WinLoss.
26. Use typed rendering events when available.
27. Do not claim unsupported built-in point selection.
28. Use native controls for keyboard-driven interaction.
29. Provide text or tabular alternatives when exact values matter.
30. Call `dataBind()` after ordinary property updates.
31. Batch related updates before rendering.
32. Reserve `refresh()` for complete layout recalculation.
33. Refresh after a hidden parent becomes visible.
34. Debounce manual resize refreshes.
35. Return complete, runnable, directly copyable examples.

## Combined Mistakes and Future References

### Unnecessary Basic Injection

Incorrect:

```typescript
Sparkline.Inject();
```

Basic Sparkline rendering does not require injection.

### Missing Category valueType

Incorrect:

```typescript
dataSource: data,
xName: 'month',
yName: 'sales'
```

Correct:

```typescript
valueType: 'Category',
dataSource: data,
xName: 'month',
yName: 'sales'
```

### Missing DateTime valueType

Incorrect:

```typescript
dataSource: data,
xName: 'date',
yName: 'value'
```

Correct:

```typescript
valueType: 'DateTime',
dataSource: data,
xName: 'date',
yName: 'value'
```

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

### Incorrect Data-Label Property

Incorrect:

```typescript
dataLabel: {
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

### Incorrect Tooltip Property

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

### Incorrect Trackball Property

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

### Incorrect Range-Band Structure

Incorrect:

```typescript
rangeBandSettings: {
    startValue: 30,
    endValue: 40
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

### Incorrect Axis Settings

Incorrect:

```typescript
axisSettings: {
    lineStyle: {},
    labelStyle: {}
}
```

Correct:

```typescript
axisSettings: {
    lineSettings: {
        visible: true
    }
}
```

Sparkline does not expose conventional axis-label styling.

### Incorrect Point Event

Incorrect:

```typescript
pointRender: (
    args: any
): void => {
}
```

Correct:

```typescript
pointRendering: (
    args:
        IPointRenderingEventArgs
): void => {
}
```

### Unsupported Point Selection

Do not claim built-in Sparkline point selection without explicit API support.

Use native controls and application state.

### Refresh Used for Ordinary Updates

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

### Final Runtime-Safety Checklist

Before returning a Sparkline implementation, verify:

1. The implementation is TypeScript or JavaScript.
2. `Sparkline` uses the correct casing.
3. TypeScript imports from `@syncfusion/ej2-charts`.
4. JavaScript uses `ej.charts.Sparkline`.
5. The host exists before rendering.
6. The selector matches the host ID.
7. The host has an available width.
8. The component has a usable height.
9. The EJ2 theme stylesheet is loaded.
10. The Sparkline type is supported.
11. Numeric arrays do not use unnecessary field mappings.
12. Object fields match `xName` and `yName`.
13. Numeric x-values use `Numeric`.
14. String x-values use `Category`.
15. Date x-values use `DateTime`.
16. Date values are JavaScript `Date` objects.
17. Tooltip usage imports `SparklineTooltip`.
18. Tooltip usage injects `SparklineTooltip`.
19. Tooltip configuration uses `tooltipSettings`.
20. Tracker-line configuration uses `trackLineSettings`.
21. Marker visibility is an array.
22. Special-point colors are root properties.
23. Data-label visibility is an array.
24. Range-band settings are an array.
25. Range bands use `startRange` and `endRange`.
26. Axis-line settings use `lineSettings`.
27. Conventional axis labels are not claimed.
28. Line and Area use `lineWidth`.
29. Pie uses `palette`.
30. WinLoss uses positive, negative, and neutral colors correctly.
31. Rendering events use correct names.
32. Built-in selection is not claimed without support.
33. Ordinary updates call `dataBind()`.
34. Related updates are batched.
35. Complete rerenders use `refresh()` only when necessary.
36. Tooltips are not the only source of exact values.
37. Accessibility includes text or tabular alternatives.
38. RTL uses `enableRtl`.
39. Localized text comes from the application datasource or UI.
40. The final example is complete and directly runnable.
41. Vue, React, Angular, Composition API, providers, directives, and Single File Components are not used.