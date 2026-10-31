---
name: syncfusion-javascript-accumulation-chart
description: Implements Syncfusion JavaScript accumulation charts (Pie, Doughnut, Funnel, Pyramid) for proportional and percentage-based visualizations. Use when displaying categorical or proportional data. Covers legend and label configuration, interactivity, accessibility, and customization. Works with TypeScript (modules) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"

---

# Implementing Accumulation Charts in Syncfusion TypeScript and JavaScript

The Syncfusion EJ2 Accumulation Chart visualizes categorical values through Pie, Doughnut, Funnel, and Pyramid presentations.

This skill covers framework-neutral implementations for:

- TypeScript using npm and ES modules.
- JavaScript using npm and ES modules.
- JavaScript using the complete global EJ2 bundle.
- Pie and Doughnut visualizations.
- Funnel and Pyramid visualizations.
- Legends, data labels, tooltips, and annotations.
- Selection and highlighting.
- Local and remote data.
- Dynamic updates.
- Internal themes.
- Accessibility, performance, validation, and cleanup.

A separate Syncfusion theme stylesheet is not required solely for the focused Accumulation Chart examples. Apply the visual theme through the chart-level `theme` property.

## Platform Support

### TypeScript

Use TypeScript when the application requires:

- Type definitions and IDE support.
- npm package management.
- ES module imports.
- Explicit feature-module injection.
- Compile-time validation.
- A TypeScript-compatible build process.

Install:

```bash
npm install @syncfusion/ej2-charts
```

Import:

```typescript
import {
    AccumulationChart
} from '@syncfusion/ej2-charts';
```

Optional features require their corresponding modules to be imported and injected before constructing the chart.

### JavaScript with npm and ES Modules

Use module-based JavaScript when the application uses:

- npm.
- ES module imports.
- A bundler.
- Explicit `AccumulationChart.Inject(...)` calls.

Install:

```bash
npm install @syncfusion/ej2-charts
```

Import:

```javascript
import {
    AccumulationChart
} from '@syncfusion/ej2-charts';
```

### Global JavaScript

Use global JavaScript when the application uses:

- A versioned EJ2 global bundle.
- Traditional HTML and JavaScript files.
- The `ej.charts.AccumulationChart` constructor.
- No TypeScript compilation.

Use the versioned complete bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not call `AccumulationChart.Inject(...)` when using the complete global EJ2 bundle.

Browser compatibility must follow the supported-browser matrix of the installed EJ2 version.

## When to Use This Skill

Use this skill when a task requires:

- Creating a Pie Chart.
- Creating a Doughnut Chart.
- Creating a Funnel Chart.
- Creating a Pyramid Chart.
- Displaying categorical contributions to a whole.
- Displaying proportional composition.
- Displaying sequential funnel stages.
- Displaying hierarchical Pyramid segments.
- Adding legends.
- Adding data labels.
- Adding tooltips.
- Adding a Doughnut center label.
- Exploding points.
- Grouping small points.
- Handling empty points.
- Enabling selection or highlighting.
- Adding annotations.
- Applying colors, gradients, or palettes.
- Binding local or remote data.
- Dynamically updating data.
- Supporting accessible interpretation.
- Validating performance and cleanup.

Use another visualization when it communicates the data more accurately:

- Use a Bar or Column Chart for precise comparisons between similar values.
- Use a Line Chart for trends over time.
- Use a Funnel Chart only when stage order is meaningful.
- Use a Pie or Doughnut Chart only when the relationship to a whole is meaningful.

## Accumulation Chart Types

### Pie

Use Pie to show categorical contributions to a whole.

```typescript
type:
    'Pie'
```

### Doughnut

A Doughnut Chart uses a Pie series with a nonzero `innerRadius`.

```typescript
type:
    'Pie',

innerRadius:
    '40%'
```

Do not use:

```typescript
type:
    'Doughnut'
```

unless the installed API explicitly introduces that series value.

### Funnel

Use Funnel for ordered stages, pipelines, or conversion processes.

```typescript
type:
    'Funnel'
```

### Pyramid

Use Pyramid for proportional or hierarchical segments.

```typescript
type:
    'Pyramid'
```

## Navigation Guide

Choose the reference that matches the task.

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

Use this reference for:

- Package installation.
- TypeScript imports.
- Module injection.
- JavaScript bundle setup.
- Host creation and validation.
- Basic Pie Chart creation.
- Internal theme configuration.
- Complete TypeScript and JavaScript examples.
- Runtime validation.
- Basic troubleshooting.

### Chart Types and Selection
📄 **Read:** [references/chart-types.md](references/chart-types.md)

Use this reference for:

- Pie Charts.
- Doughnut Charts.
- Funnel Charts.
- Pyramid Charts.
- Series-specific module injection.
- Radius and inner radius.
- Funnel neck dimensions.
- Pyramid modes.
- Gap ratios.
- Choosing the appropriate chart type.

### Legend Configuration

📄 **Read:** [references/legend-configuration.md](references/legend-configuration.md)

Use this reference for:

- Legend visibility.
- Legend position.
- Alignment.
- Legend titles.
- Text styles.
- Point toggling.
- Responsive legend behavior.
- Legend interaction.
- Legend accessibility.

### Data Labels

📄 **Read:** [references/data-labels.md](references/data-labels.md)

Use this reference for:

- Enabling data labels.
- Inside and outside labels.
- Label field mapping.
- Value and percentage labels.
- Connector lines.
- Smart labels.
- Text trimming and wrapping.
- Label templates.
- Overlap prevention.

### Tooltips and Selection

📄 **Read:** [references/tooltips-and-selection.md](references/tooltips-and-selection.md)

Use this reference for:

- Accumulation tooltips.
- Tooltip formatting.
- Tooltip templates.
- Point selection.
- Multiple selection when supported.
- Selection patterns.
- Highlighting.
- Interaction events.
- Persistent details outside tooltips.

### Annotations and Features

📄 **Read:** [references/annotations-and-features.md](references/annotations-and-features.md)

Use this reference for:

- Annotations.
- Doughnut center labels.
- Point explosion.
- Point grouping.
- Empty-point handling.
- Point color mapping.
- Gradient fills.
- Start and end angles.
- Pie-center positioning.
- Funnel neck configuration.
- Pyramid modes.

### Customization and Styling

📄 **Read:** [references/customization-and-styling.md](references/customization-and-styling.md)

Use this reference for:

- Internal themes.
- Palettes.
- Series fills.
- Borders.
- Opacity.
- Backgrounds.
- Titles and subtitles.
- Application-owned CSS.
- Responsive dimensions.
- Validated print and export functionality.

### Accessibility and Advanced Features

📄 **Read:** [references/accessibility-and-advanced.md](references/accessibility-and-advanced.md)

Use this reference for:

- Semantic descriptions.
- Persistent text alternatives.
- Semantic data tables.
- Accessibility configuration.
- Series descriptions.
- Focus visibility.
- Keyboard and screen-reader testing.
- Dynamic updates.
- Animation.
- Performance.
- Remote data.
- Cleanup.
- Troubleshooting.

Do not copy APIs from ordinary Cartesian Chart without validating their Accumulation Chart-specific modules and models.

## Feature Module Reference

Import and inject only the modules required by the implementation.

```text
Pie and Doughnut -> PieSeries
Funnel           -> FunnelSeries
Pyramid          -> PyramidSeries
Data labels      -> AccumulationDataLabel
Legend           -> AccumulationLegend
Tooltip          -> AccumulationTooltip
Selection        -> AccumulationSelection
Highlight        -> AccumulationHighlight
Annotations      -> AccumulationAnnotation
Print            -> Validated Accumulation Chart print module
Image export     -> Validated Accumulation Chart image-export module
PDF export       -> Validated Accumulation Chart PDF-export module
```

Validate optional module names against the installed `@syncfusion/ej2-charts` declarations.

## TypeScript Module Injection

A Pie Chart with labels, a legend, and a tooltip requires:

```typescript
import {
    AccumulationChart,
    AccumulationDataLabel,
    AccumulationLegend,
    AccumulationTooltip,
    PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    PieSeries,
    AccumulationDataLabel,
    AccumulationLegend,
    AccumulationTooltip
);
```

A minimal Pie Chart requires:

```typescript
import {
    AccumulationChart,
    PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    PieSeries
);
```

A Funnel Chart requires:

```typescript
import {
    AccumulationChart,
    FunnelSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    FunnelSeries
);
```

A Pyramid Chart requires:

```typescript
import {
    AccumulationChart,
    PyramidSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    PyramidSeries
);
```

Keep imports and injection synchronized.

Do not use the ordinary Chart tooltip module:

```typescript
Tooltip
```

Use:

```typescript
AccumulationTooltip
```

## Host and Dimensions

Use a consistent host:

```html
<div id="accumulation-chart"></div>
```

Provide measurable dimensions:

```css
.chart-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

#accumulation-chart {
    width: 100%;
    min-height: 500px;
}
```

Validate the host:

```typescript
const host:
    HTMLElement | null =
        document.getElementById(
            'accumulation-chart'
        );

if (!host) {
    throw new Error(
        'The Accumulation Chart host "#accumulation-chart" was not found.'
    );
}
```

Prefer explicit construction and attachment:

```typescript
const chart:
    AccumulationChart =
        new AccumulationChart({
            // Configuration
        });

chart.appendTo(
    host
);
```

## Data Model and Validation

Use a typed model:

```typescript
interface CategoryShare {
    category: string;
    value: number;
    label: string;
}
```

Define meaningful data:

```typescript
const chartData:
    CategoryShare[] = [
        {
            category:
                'January',
            value:
                22,
            label:
                'January: 22%'
        },
        {
            category:
                'February',
            value:
                24,
            label:
                'February: 24%'
        },
        {
            category:
                'March',
            value:
                26,
            label:
                'March: 26%'
        },
        {
            category:
                'April',
            value:
                28,
            label:
                'April: 28%'
        }
    ];
```

Validate before rendering:

```typescript
const validateCategoryShares = (
    data:
        CategoryShare[],
    requirePercentageTotal:
        boolean
): void => {
    if (
        data.length ===
        0
    ) {
        throw new Error(
            'The Accumulation Chart requires at least one data point.'
        );
    }

    const categories:
        Set<string> =
            new Set<string>();

    let positiveValueFound:
        boolean =
            false;

    let total:
        number =
            0;

    data.forEach(
        (
            item:
                CategoryShare,
            index:
                number
        ): void => {
            const category:
                string =
                    item.category.trim();

            if (!category) {
                throw new Error(
                    'Data point ' +
                    index +
                    ' requires a category.'
                );
            }

            if (
                categories.has(
                    category
                )
            ) {
                throw new Error(
                    'Duplicate category: ' +
                    category
                );
            }

            if (
                !Number.isFinite(
                    item.value
                ) ||
                item.value < 0
            ) {
                throw new Error(
                    'Data point "' +
                    category +
                    '" requires a finite nonnegative value.'
                );
            }

            if (
                item.value > 0
            ) {
                positiveValueFound =
                    true;
            }

            if (
                !item.label.trim()
            ) {
                throw new Error(
                    'Data point "' +
                    category +
                    '" requires a label.'
                );
            }

            total +=
                item.value;

            categories.add(
                category
            );
        }
    );

    if (
        !positiveValueFound
    ) {
        throw new Error(
            'At least one data point must have a positive value.'
        );
    }

    if (
        requirePercentageTotal &&
        Math.abs(
            total -
            100
        ) >
        0.0001
    ) {
        throw new Error(
            'Percentage data must total 100.'
        );
    }
};
```

Call validation:

```typescript
validateCategoryShares(
    chartData,
    true
);
```

Do not require a total of 100 when the chart displays raw values rather than percentages.

## Quick Start Example

### TypeScript

```typescript
import {
    AccumulationChart,
    AccumulationDataLabel,
    AccumulationLegend,
    AccumulationTooltip,
    PieSeries
} from '@syncfusion/ej2-charts';

interface CategoryShare {
    category: string;
    value: number;
    label: string;
}

AccumulationChart.Inject(
    PieSeries,
    AccumulationDataLabel,
    AccumulationLegend,
    AccumulationTooltip
);

const chartData:
    CategoryShare[] = [
        {
            category:
                'January',
            value:
                22,
            label:
                'January: 22%'
        },
        {
            category:
                'February',
            value:
                24,
            label:
                'February: 24%'
        },
        {
            category:
                'March',
            value:
                26,
            label:
                'March: 26%'
        },
        {
            category:
                'April',
            value:
                28,
            label:
                'April: 28%'
        }
    ];

const host:
    HTMLElement | null =
        document.getElementById(
            'accumulation-chart'
        );

if (!host) {
    throw new Error(
        'The Accumulation Chart host was not found.'
    );
}

const chart:
    AccumulationChart =
        new AccumulationChart({
            width:
                '100%',

            height:
                '500px',

            theme:
                'Fluent2',

            title:
                'Monthly Distribution',

            series: [
                {
                    dataSource:
                        chartData,
                    xName:
                        'category',
                    yName:
                        'value',
                    type:
                        'Pie',
                    name:
                        'Distribution',

                    dataLabel: {
                        visible:
                            true,
                        position:
                            'Outside',
                        name:
                            'label'
                    }
                }
            ],

            tooltip: {
                enable:
                    true
            },

            legendSettings: {
                visible:
                    true,
                position:
                    'Right'
            }
        });

chart.appendTo(
    host
);
```

A separate Syncfusion theme stylesheet is not required solely for this focused Accumulation Chart example.

## JavaScript with the Complete Bundle

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 Accumulation Chart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        #accumulation-chart {
            width: 100%;
            min-height: 500px;
        }
    </style>
</head>

<body>
    <div id="accumulation-chart"></div>

    <script>
        if (
            typeof window.ej ===
                'undefined' ||
            !window.ej.charts ||
            !window.ej.charts.AccumulationChart
        ) {
            throw new Error(
                'The EJ2 Accumulation Chart global bundle was not loaded.'
            );
        }

        var chartData = [
            {
                category:
                    'January',
                value:
                    22,
                label:
                    'January: 22%'
            },
            {
                category:
                    'February',
                value:
                    24,
                label:
                    'February: 24%'
            },
            {
                category:
                    'March',
                value:
                    26,
                label:
                    'March: 26%'
            },
            {
                category:
                    'April',
                value:
                    28,
                label:
                    'April: 28%'
            }
        ];

        var chart =
            new ej.charts.AccumulationChart({
                width:
                    '100%',

                height:
                    '500px',

                theme:
                    'Fluent2',

                title:
                    'Monthly Distribution',

                series: [
                    {
                        dataSource:
                            chartData,
                        xName:
                            'category',
                        yName:
                            'value',
                        type:
                            'Pie',
                        name:
                            'Distribution',

                        dataLabel: {
                            visible:
                                true,
                            position:
                                'Outside',
                            name:
                                'label'
                        }
                    }
                ],

                tooltip: {
                    enable:
                        true
                },

                legendSettings: {
                    visible:
                        true,
                    position:
                        'Right'
                }
            });

        chart.appendTo(
            '#accumulation-chart'
        );
    </script>
</body>
</html>
```

Do not call `AccumulationChart.Inject(...)` with the complete global bundle.

## Common Patterns

## Basic Pie Chart with Legend

```typescript
const chart:
    AccumulationChart =
        new AccumulationChart({
            series: [
                {
                    dataSource:
                        chartData,
                    xName:
                        'category',
                    yName:
                        'value',
                    type:
                        'Pie'
                }
            ],

            legendSettings: {
                visible:
                    true,
                position:
                    'Right'
            }
        });

chart.appendTo(
    '#accumulation-chart'
);
```

## Doughnut Chart with Center Label

Use a Pie series with `innerRadius`:

```typescript
const chart:
    AccumulationChart =
        new AccumulationChart({
            series: [
                {
                    dataSource:
                        chartData,
                    xName:
                        'category',
                    yName:
                        'value',
                    type:
                        'Pie',
                    innerRadius:
                        '40%'
                }
            ],

            centerLabel: {
                text:
                    'Sales',
                hoverTextFormat:
                    '${point.x}: ${point.y}'
            }
        });

chart.appendTo(
    '#accumulation-chart'
);
```

Do not use:

```typescript
type:
    'Doughnut'
```

The center label is intended for Pie or Doughnut-style visualizations.

## Funnel Chart

```typescript
import {
    AccumulationChart,
    AccumulationDataLabel,
    FunnelSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    FunnelSeries,
    AccumulationDataLabel
);

interface FunnelStage {
    stage: string;
    users: number;
    label: string;
}

const stageData:
    FunnelStage[] = [
        {
            stage:
                'Visited',
            users:
                1000,
            label:
                'Visited: 1,000'
        },
        {
            stage:
                'Downloaded',
            users:
                760,
            label:
                'Downloaded: 760'
        },
        {
            stage:
                'Subscribed',
            users:
                420,
            label:
                'Subscribed: 420'
        },
        {
            stage:
                'Renewed',
            users:
                190,
            label:
                'Renewed: 190'
        }
    ];

const chart:
    AccumulationChart =
        new AccumulationChart({
            series: [
                {
                    dataSource:
                        stageData,
                    xName:
                        'stage',
                    yName:
                        'users',
                    type:
                        'Funnel',
                    width:
                        '70%',
                    height:
                        '80%',
                    neckWidth:
                        '15%',
                    neckHeight:
                        '5%',
                    gapRatio:
                        0.08,

                    dataLabel: {
                        visible:
                            true,
                        position:
                            'Inside',
                        name:
                            'label'
                    }
                }
            ]
        });

chart.appendTo(
    '#accumulation-chart'
);
```

A Funnel Chart does not automatically calculate conversion rates. Calculate rates in application code when required.

## Pyramid Chart

```typescript
import {
    AccumulationChart,
    AccumulationDataLabel,
    PyramidSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    PyramidSeries,
    AccumulationDataLabel
);

const chart:
    AccumulationChart =
        new AccumulationChart({
            series: [
                {
                    dataSource:
                        chartData,
                    xName:
                        'category',
                    yName:
                        'value',
                    type:
                        'Pyramid',
                    pyramidMode:
                        'Linear',
                    gapRatio:
                        0.05,

                    dataLabel: {
                        visible:
                            true,
                        position:
                            'Inside',
                        name:
                            'label'
                    }
                }
            ]
        });

chart.appendTo(
    '#accumulation-chart'
);
```

Use a validated Pyramid mode such as:

```text
Linear
Surface
```

Do not add:

```typescript
reverse:
    true
```

unless the installed Pyramid model explicitly supports it.

## Data Labels

Import and inject:

```typescript
import {
    AccumulationDataLabel
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    AccumulationDataLabel
);
```

Configure labels inside the series:

```typescript
dataLabel: {
    visible:
        true,
    position:
        'Outside',
    name:
        'label'
}
```

Do not configure accumulation data labels at the chart root.

Use percentage labels only when the application values represent percentages or when the percentage has been calculated correctly.

## Tooltips

Import and inject:

```typescript
import {
    AccumulationTooltip
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    AccumulationTooltip
);
```

Enable:

```typescript
tooltip: {
    enable:
        true,
    format:
        '${point.x}: ${point.y}'
}
```

Executable HTML can be used only when supported and necessary:

```typescript
format:
    '${point.x}: <b>${point.y}</b>'
```

Do not use encoded HTML:

```typescript
format:
    '${point.x}: &lt;b&gt;${point.y}&lt;/b&gt;'
```

Do not append `%` unless the values are percentages.

## Selection

Import and inject:

```typescript
import {
    AccumulationSelection
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    AccumulationSelection
);
```

Configure a selection mode validated by the installed Accumulation Chart model.

```typescript
selectionMode:
    'Point'
```

Validate selection patterns and multiple-selection support before documenting them.

Do not assume ordinary Cartesian Chart series-selection behavior applies identically.

## Highlighting

Import and inject:

```typescript
import {
    AccumulationHighlight
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    AccumulationHighlight
);
```

Configure only modes and patterns supported by the installed package.

Do not enable highlighting solely as decoration when it reduces contrast or readability.

## Annotations

Import and inject:

```typescript
import {
    AccumulationAnnotation
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
    AccumulationAnnotation
);
```

Annotations and Doughnut center labels are different features.

Use annotations for contextual HTML content positioned relative to the chart.

Use `centerLabel` for content displayed in a Doughnut-like center.

Do not make annotation content the only source of essential information.

## Point Colors

Map point colors from data when required:

```typescript
interface CategoryShare {
    category: string;
    value: number;
    color: string;
}

series: [
    {
        dataSource:
            chartData,
        xName:
            'category',
        yName:
            'value',
        pointColorMapping:
            'color',
        type:
            'Pie'
    }
]
```

Do not list an ordinary Chart `marker` property as a universal Accumulation series option.

Pie, Funnel, and Pyramid points are rendered as segments, not Cartesian markers.

## Exploding Points

Enable point explosion:

```typescript
series: [
    {
        type:
            'Pie',
        explode:
            true,
        explodeIndex:
            0,
        explodeOffset:
            '10%'
    }
]
```

Use explosion sparingly. Excessive separated segments can make the whole harder to interpret.

## Funnel and Pyramid Gap Validation

Validate `gapRatio`:

```typescript
const validateGapRatio = (
    value:
        number
): void => {
    if (
        !Number.isFinite(
            value
        ) ||
        value < 0 ||
        value > 1
    ) {
        throw new Error(
            'The gap ratio must be between 0 and 1.'
        );
    }
};
```

## Internal Theme and Application CSS

Apply a built-in chart theme:

```typescript
theme:
    'Fluent2'
```

A separate Syncfusion theme package or stylesheet is not required solely for the focused Accumulation Chart examples.

Use application-owned CSS for:

- Host dimensions.
- Page backgrounds.
- Card layouts.
- Text summaries.
- Data tables.
- External buttons.
- Responsive spacing.

Example:

```css
.chart-card {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

#accumulation-chart {
    width: 100%;
    min-height: 500px;
}
```

Validate the selected theme against the installed Accumulation Chart theme model.

## Dynamic Data Updates

Replace the series data source:

```typescript
chart.series[0]
    .dataSource =
        updatedData;

chart.dataBind();
```

Update the title:

```typescript
chart.title =
    'Updated Distribution';

chart.dataBind();
```

Batch changes:

```typescript
chart.title =
    'Updated Distribution';

chart.series[0]
    .dataSource =
        updatedData;

chart.dataBind();
```

Use `dataBind()` for ordinary property changes.

Use `refresh()` when:

- The host dimensions change.
- A hidden parent becomes visible.
- The chart type changes substantially.
- A complete layout recalculation is required.

## Accessibility Guidance

Support accessible implementation through:

- A semantic heading.
- A concise chart description.
- Persistent text summaries.
- A semantic data table.
- Meaningful category labels.
- Sufficient contrast.
- Visible focus for external controls.
- Keyboard and screen-reader testing.
- Browser zoom and responsive reflow testing.
- Tooltips as supplemental content.
- Alternatives to color-only communication.

Do not claim automatic WCAG compliance.

Do not rely only on:

- Segment color.
- Segment angle.
- Slice area.
- Funnel width.
- Pyramid position.
- Hover tooltips.

Provide a table for exact values:

```html
<table>
    <caption>
        Category distribution
    </caption>

    <thead>
        <tr>
            <th scope="col">Category</th>
            <th scope="col">Value</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">January</th>
            <td>22%</td>
        </tr>
    </tbody>
</table>
```

Validate the chart-level and series-level accessibility models against the installed package before configuring advanced accessibility properties.

## Performance and Cleanup

- Validate data before rendering.
- Limit category counts.
- Group small points when appropriate.
- Keep tooltip templates simple.
- Keep data-label templates simple.
- Avoid unnecessary animations.
- Handle empty and zero values intentionally.
- Batch updates.
- Call `dataBind()` once after related changes.
- Use `refresh()` only for layout recalculation.
- Remove application-owned listeners.
- Clear timers.
- Cancel pending remote requests.
- Destroy the chart when its dynamic host is removed.

```typescript
chart.destroy();
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-charts is installed.
✅ No external theme package is required solely for AccumulationChart.
✅ A supported built-in theme is configured through theme.
✅ AccumulationChart is imported.
✅ PieSeries is injected for Pie and Doughnut.
✅ FunnelSeries is injected for Funnel.
✅ PyramidSeries is injected for Pyramid.
✅ AccumulationDataLabel is injected when labels are visible.
✅ AccumulationLegend is injected when the legend is visible.
✅ AccumulationTooltip is injected when tooltips are enabled.
✅ AccumulationSelection is injected when selection is enabled.
✅ AccumulationHighlight is injected 