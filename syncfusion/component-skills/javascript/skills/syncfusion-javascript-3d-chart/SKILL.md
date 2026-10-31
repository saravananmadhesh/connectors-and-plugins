---
name: syncfusion-javascript-3d-chart
description: Create interactive 3D charts in Syncfusion TypeScript and JavaScript. Immediately use this skill when user needs to build 3D visualizations, render 3D column/bar charts, configure 3D rotation and depth, visualize data in three dimensions, customize 3D chart appearance, handle 3D interactions, or implement advanced 3D features. Works with TypeScript (webpack/module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---
# Implementing 3D Charts in Syncfusion TypeScript and JavaScript

The Syncfusion EJ2 3D Chart component visualizes categorical, numeric, and date-based data through three-dimensional Column, Bar, Stacking Column, Stacking Bar, and 100-percent stacking series.

This skill covers framework-neutral implementations for:

- TypeScript using npm and ES modules.
- JavaScript using npm and ES modules.
- JavaScript using the complete global EJ2 bundle.
- Local and remote data binding.
- 3D rotation, tilt, and depth.
- Category, numeric, and date-time axes.
- Multiple and stacked series.
- Tooltips, legends, highlighting, and selection.
- Internal Chart3D themes.
- Dynamic data updates.
- Performance, accessibility, and cleanup.

A separate Syncfusion theme stylesheet is not required solely for the focused Chart3D examples. Apply the visual theme internally through the `theme` property.

## Platform Support

### TypeScript

Use TypeScript when the application requires:

- Type definitions and IDE assistance.
- npm package management.
- ES module imports.
- Explicit feature-module injection.
- Compile-time validation.
- A bundler or TypeScript build process.

Install:

```bash
npm install @syncfusion/ej2-charts
```

Import:

```typescript
import {
    Chart3D
} from '@syncfusion/ej2-charts';
```

Import and inject every optional module used by the chart before creating the Chart3D instance.

### JavaScript with npm and ES Modules

Use module-based JavaScript when the application uses:

- npm.
- A module bundler.
- ES module imports.
- Explicit `Chart3D.Inject(...)` calls.

Install:

```bash
npm install @syncfusion/ej2-charts
```

Import:

```javascript
import {
    Chart3D
} from '@syncfusion/ej2-charts';
```

### Global JavaScript

Use the global JavaScript approach when the application uses:

- A versioned EJ2 global bundle.
- Traditional HTML and JavaScript files.
- The `ej.charts.Chart3D` global constructor.
- No TypeScript compilation.

Use the versioned complete bundle:

```html
  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not call `Chart3D.Inject(...)` when using the complete global bundle.

Browser compatibility must follow the supported browser matrix of the installed EJ2 version. Do not promise unrestricted legacy-browser compatibility.

## When to Use This Skill

Use this skill when a task requires:

- Creating a 3D Column Chart.
- Creating a 3D Bar Chart.
- Creating stacked 3D series.
- Creating 100-percent stacked 3D series.
- Displaying multiple series in a 3D view.
- Configuring category, numeric, or date-time axes.
- Enabling interactive rotation.
- Setting rotation, tilt, and depth.
- Customizing chart walls and backgrounds.
- Applying a built-in Chart3D theme.
- Adding legends and tooltips.
- Enabling highlighting or selection.
- Displaying data labels.
- Binding local or remote data.
- Dynamically updating data or appearance.
- Improving accessible interpretation.
- Validating performance and cleanup.

Use a 3D chart only when depth or interaction adds meaningful context. For precise value comparison, a conventional 2D chart can be easier to interpret.

## Navigation Guide

Choose the reference that matches the implementation task.

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

Use this reference for:

- Package installation.
- TypeScript imports.
- Module injection.
- JavaScript bundle setup.
- Host creation and validation.
- Basic 3D Column Chart creation.
- Internal theme selection.
- Data validation.
- Complete TypeScript and JavaScript examples.
- Basic troubleshooting.

### 3D Settings and Rotation

📄 **Read:** [references/3d-settings-and-rotation.md](references/3d-settings-and-rotation.md)

Use this reference for:

- `enableRotation`.
- Initial rotation.
- Tilt.
- Depth.
- Wall color.
- Perspective and visual readability.
- Runtime rotation updates.
- Rotation interaction.
- Occlusion and label visibility.
- Resetting the 3D view.

### Chart Types

📄 **Read:** [references/chart-types-3d.md](references/chart-types-3d.md)

Use this reference for:

- 3D Column series.
- 3D Bar series.
- Stacking Column series.
- Stacking Bar series.
- 100-percent Stacking Column series.
- 100-percent Stacking Bar series.
- Multi-series charts.
- Stacking groups.
- Series-specific module injection.
- Choosing an appropriate series type.

### Axes Customization

📄 **Read:** [references/axes-customization-3d.md](references/axes-customization-3d.md)

Use this reference for:

- Category axes.
- Numeric axes.
- Date-time axes.
- Axis titles.
- Label formatting.
- Axis minimum and maximum.
- Intervals.
- Label rotation.
- Axis data coverage.
- Category label placement.
- Validated axis modules.

### Interaction Features

📄 **Read:** [references/interaction-features-3d.md](references/interaction-features-3d.md)

Use this reference for validated:

- Tooltips.
- Legends.
- Data labels.
- Rotation.
- Highlighting.
- Selection.
- Point interaction.
- Series interaction.
- Interaction events.
- Persistent details outside the chart.

Do not transfer ordinary 2D Chart interaction APIs to Chart3D without validating the Chart3D-specific module and model.

### Appearance and Styling

📄 **Read:** [references/appearance-and-styling.md](references/appearance-and-styling.md)

Use this reference for:

- Internal Chart3D themes.
- Palettes.
- Series colors.
- Point colors.
- Borders.
- Opacity.
- Chart background.
- Wall color.
- Title styles.
- Axis fonts.
- Application-owned layout CSS.

A separate Syncfusion theme stylesheet is not required solely for the focused Chart3D examples. Use the `theme` property for the chart’s built-in visual theme.

### Data Handling and Performance

📄 **Read:** [references/data-and-performance.md](references/data-and-performance.md)

Use this reference for:

- Local data.
- Remote data.
- `DataManager`.
- Queries and adaptors.
- Data normalization.
- Runtime validation.
- Dynamic updates.
- Real-time update considerations.
- Large data collections.
- Animation and depth performance.
- Responsive refresh behavior.
- Memory cleanup.

### Accessibility and Export

📄 **Read:** [references/accessibility-export.md](references/accessibility-export.md)

Use this reference for:

- Semantic chart descriptions.
- Persistent text summaries.
- Semantic data tables.
- Color and contrast.
- Focus visibility.
- Touch and pointer interaction.
- Browser zoom and reflow testing.
- Validated Chart3D print functionality.
- Validated Chart3D image export.
- Validated PDF export.
- Right-to-left behavior when confirmed by the installed Chart3D API.

Do not copy print or export APIs from the ordinary 2D Chart without validating Chart3D support.

## Feature Module Reference

Import and inject only the modules required by the implementation.

```text
Column series               -> ColumnSeries3D
Bar series                  -> BarSeries3D
Stacking Column series      -> StackingColumnSeries3D
Stacking Bar series         -> StackingBarSeries3D
100% Stacking Column        -> Validated 100% stacking-column module
100% Stacking Bar           -> Validated 100% stacking-bar module
Category axis               -> Category3D
Date-time axis              -> Validated DateTime3D module
Legend                      -> Legend3D
Tooltip                     -> Tooltip3D
Highlight                   -> Highlight3D
Selection                   -> Validated Chart3D selection module
Data labels                 -> Validated Chart3D data-label module
Print                       -> Validated Chart3D print module
Image export                -> Validated Chart3D image-export module
PDF export                  -> Validated Chart3D PDF-export module
```

Validate exact export names against the installed `@syncfusion/ej2-charts` package before adding an optional feature.

## TypeScript Module Injection

A 3D Column Chart with a category axis, legend, and tooltip uses:

```typescript
import {
    Category3D,
    Chart3D,
    ColumnSeries3D,
    Legend3D,
    Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    ColumnSeries3D,
    Category3D,
    Legend3D,
    Tooltip3D
);
```

A minimal 3D Column Chart without a legend or tooltip uses:

```typescript
import {
    Category3D,
    Chart3D,
    ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    ColumnSeries3D,
    Category3D
);
```

Keep imports and injection synchronized.

Incorrect:

```typescript
import {
    Chart3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    ColumnSeries3D
);
```

Correct:

```typescript
import {
    Chart3D,
    ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    ColumnSeries3D
);
```

## Host and Dimensions

Use a consistent host ID:

```html
<div id="chart-container"></div>
```

Provide measurable dimensions:

```css
.chart-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

#chart-container {
    width: 100%;
    min-height: 600px;
}
```

Configure component dimensions:

```typescript
const chart:
    Chart3D =
        new Chart3D({
            width:
                '100%',
            height:
                '600px'
        });
```

Validate the host:

```typescript
const host:
    HTMLElement | null =
        document.getElementById(
            'chart-container'
        );

if (!host) {
    throw new Error(
        'The 3D Chart host "#chart-container" was not found.'
    );
}
```

Prefer explicit construction followed by `appendTo()`:

```typescript
const chart:
    Chart3D =
        new Chart3D({
            // Configuration
        });

chart.appendTo(
    host
);
```

The two-argument constructor is supported:

```typescript
const chart:
    Chart3D =
        new Chart3D(
            configuration,
            '#chart-container'
        );
```

Use explicit `appendTo()` for clearer host validation and cleanup.

## Quick Start Example

## TypeScript

```typescript
import {
    Category3D,
    Chart3D,
    ColumnSeries3D,
    Legend3D,
    Tooltip3D
} from '@syncfusion/ej2-charts';

interface MonthlySales {
    month: string;
    sales: number;
}

Chart3D.Inject(
    ColumnSeries3D,
    Category3D,
    Legend3D,
    Tooltip3D
);

const chartData:
    MonthlySales[] = [
        {
            month:
                'Jan',
            sales:
                35
        },
        {
            month:
                'Feb',
            sales:
                28
        },
        {
            month:
                'Mar',
            sales:
                34
        },
        {
            month:
                'Apr',
            sales:
                32
        },
        {
            month:
                'May',
            sales:
                40
        }
    ];

const host:
    HTMLElement | null =
        document.getElementById(
            'chart-container'
        );

if (!host) {
    throw new Error(
        'The 3D Chart host "#chart-container" was not found.'
    );
}

const chart:
    Chart3D =
        new Chart3D({
            width:
                '100%',

            height:
                '600px',

            theme:
                'Fluent2',

            primaryXAxis: {
                valueType:
                    'Category',
                title:
                    'Month'
            },

            primaryYAxis: {
                minimum:
                    0,
                maximum:
                    60,
                interval:
                    10,
                title:
                    'Sales'
            },

            title:
                'Monthly Sales in 3D',

            tooltip: {
                enable:
                    true
            },

            legendSettings: {
                visible:
                    true,
                position:
                    'Bottom'
            },

            enableRotation:
                true,

            rotation:
                7,

            tilt:
                10,

            depth:
                100,

            series: [
                {
                    dataSource:
                        chartData,
                    xName:
                        'month',
                    yName:
                        'sales',
                    type:
                        'Column',
                    name:
                        'Sales'
                }
            ]
        });

chart.appendTo(
    host
);
```

A separate Syncfusion theme stylesheet is not required for this focused Chart3D example. Apply the built-in visual theme through:

```typescript
theme:
    'Fluent2'
```

Validate the exact theme value against the installed `Chart3DTheme` type.

## JavaScript with the Complete CDN Bundle

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 3D Chart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        #chart-container {
            width: 100%;
            min-height: 600px;
        }
    </style>
</head>

<body>
    <div id="chart-container"></div>

    <script>
        if (
            typeof window.ej ===
                'undefined' ||
            !window.ej.charts ||
            !window.ej.charts.Chart3D
        ) {
            throw new Error(
                'The EJ2 3D Chart global bundle was not loaded.'
            );
        }

        var chartData = [
            {
                month:
                    'Jan',
                sales:
                    35
            },
            {
                month:
                    'Feb',
                sales:
                    28
            },
            {
                month:
                    'Mar',
                sales:
                    34
            },
            {
                month:
                    'Apr',
                sales:
                    32
            },
            {
                month:
                    'May',
                sales:
                    40
            }
        ];

        var chart =
            new ej.charts.Chart3D({
                width:
                    '100%',

                height:
                    '600px',

                theme:
                    'Fluent2',

                primaryXAxis: {
                    valueType:
                        'Category',
                    title:
                        'Month'
                },

                primaryYAxis: {
                    minimum:
                        0,
                    maximum:
                        60,
                    interval:
                        10,
                    title:
                        'Sales'
                },

                title:
                    'Monthly Sales in 3D',

                tooltip: {
                    enable:
                        true
                },

                legendSettings: {
                    visible:
                        true,
                    position:
                        'Bottom'
                },

                enableRotation:
                    true,

                rotation:
                    7,

                tilt:
                    10,

                depth:
                    100,

                series: [
                    {
                        dataSource:
                            chartData,
                        xName:
                            'month',
                        yName:
                            'sales',
                        type:
                            'Column',
                        name:
                            'Sales'
                    }
                ]
            });

        chart.appendTo(
            '#chart-container'
        );
    </script>
</body>
</html>
```

Do not call `Chart3D.Inject(...)` when the complete global EJ2 bundle is used.

## Data Validation

Define reusable data validation.

```typescript
interface MonthlySales {
    month: string;
    sales: number;
}

const validateMonthlySales = (
    data:
        MonthlySales[]
): void => {
    if (
        data.length ===
        0
    ) {
        throw new Error(
            'The 3D Chart requires at least one data point.'
        );
    }

    const categories:
        Set<string> =
            new Set<string>();

    data.forEach(
        (
            item:
                MonthlySales,
            index:
                number
        ): void => {
            const category:
                string =
                    item.month.trim();

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
                    item.sales
                )
            ) {
                throw new Error(
                    'Data point "' +
                    category +
                    '" requires a finite sales value.'
                );
            }

            if (
                item.sales < 0
            ) {
                throw new Error(
                    'Data point "' +
                    category +
                    '" cannot have negative sales in this example.'
                );
            }

            categories.add(
                category
            );
        }
    );
};
```

Call it before constructing the chart:

```typescript
validateMonthlySales(
    chartData
);
```

## Common Patterns

## Basic 3D Column Chart with Rotation

```typescript
const chart:
    Chart3D =
        new Chart3D({
            enableRotation:
                true,

            rotation:
                7,

            tilt:
                10,

            depth:
                100,

            series: [
                {
                    type:
                        'Column',
                    dataSource:
                        chartData,
                    xName:
                        'month',
                    yName:
                        'sales'
                }
            ]
        });

chart.appendTo(
    '#chart-container'
);
```

Use a Column 3D Chart when categories should be compared vertically.

## Basic 3D Bar Chart

Import and inject the validated Bar 3D series module:

```typescript
import {
    BarSeries3D,
    Category3D,
    Chart3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    BarSeries3D,
    Category3D
);
```

Configure:

```typescript
series: [
    {
        type:
            'Bar',
        dataSource:
            chartData,
        xName:
            'month',
        yName:
            'sales',
        name:
            'Sales'
    }
]
```

Validate the exact `BarSeries3D` export against the installed package before finalizing the example.

Use Bar when horizontal category labels are easier to read.

## Multi-Series 3D Column Chart

Define compatible metrics:

```typescript
interface MonthlyPerformance {
    month: string;
    sales: number;
    revenue: number;
}

const performanceData:
    MonthlyPerformance[] = [
        {
            month:
                'Jan',
            sales:
                35,
            revenue:
                42
        },
        {
            month:
                'Feb',
            sales:
                28,
            revenue:
                38
        },
        {
            month:
                'Mar',
            sales:
                34,
            revenue:
                45
        }
    ];
```

Configure multiple series:

```typescript
series: [
    {
        dataSource:
            performanceData,
        xName:
            'month',
        yName:
            'sales',
        type:
            'Column',
        name:
            'Sales'
    },
    {
        dataSource:
            performanceData,
        xName:
            'month',
        yName:
            'revenue',
        type:
            'Column',
        name:
            'Revenue'
    }
]
```

Ensure that:

- The units are compatible.
- The scales are comparable.
- The category fields match.
- The number of side-by-side series remains readable.
- Depth does not hide one series behind another.

Use a two-dimensional chart when precise comparison is more important than 3D presentation.

## Stacked 3D Column Chart

Import and inject the stacking module:

```typescript
import {
    Category3D,
    Chart3D,
    Legend3D,
    StackingColumnSeries3D,
    Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    StackingColumnSeries3D,
    Category3D,
    Legend3D,
    Tooltip3D
);
```

Define data:

```typescript
interface RegionalSales {
    region: string;
    productA: number;
    productB: number;
}

const regionalData:
    RegionalSales[] = [
        {
            region:
                'North',
            productA:
                35,
            productB:
                22
        },
        {
            region:
                'South',
            productA:
                28,
            productB:
                26
        },
        {
            region:
                'East',
            productA:
                32,
            productB:
                19
        },
        {
            region:
                'West',
            productA:
                25,
            productB:
                30
        }
    ];
```

Configure:

```typescript
series: [
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productA',
        type:
            'StackingColumn',
        name:
            'Product A'
    },
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productB',
        type:
            'StackingColumn',
        name:
            'Product B'
    }
]
```

Validate the exact `StackingColumnSeries3D` export against the installed package.

## Stacked 3D Bar Chart

Import and inject:

```typescript
import {
    Category3D,
    Chart3D,
    Legend3D,
    StackingBarSeries3D,
    Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    StackingBarSeries3D,
    Category3D,
    Legend3D,
    Tooltip3D
);
```

Configure:

```typescript
series: [
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productA',
        type:
            'StackingBar',
        name:
            'Product A'
    },
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productB',
        type:
            'StackingBar',
        name:
            'Product B'
    }
]
```

## Stacking Groups

Use `stackingGroup` to control which series are stacked together:

```typescript
series: [
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productA',
        type:
            'StackingColumn',
        name:
            'Product A',
        stackingGroup:
            'Current'
    },
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productB',
        type:
            'StackingColumn',
        name:
            'Product B',
        stackingGroup:
            'Current'
    }
]
```

Series sharing the same `stackingGroup` are stacked together.

Configure grouping intentionally to prevent misleading comparisons.

## 100-Percent Stacking

Use a 100-percent stacking series when the objective is to compare proportional composition rather than absolute totals.

```typescript
series: [
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productA',
        type:
            'StackingColumn100',
        name:
            'Product A'
    },
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productB',
        type:
            'StackingColumn100',
        name:
            'Product B'
    }
]
```

Validate the exact 100-percent series module exported by the installed package.

Do not describe ordinary `StackingColumn` or `StackingBar` as automatically normalized to 100 percent.

## Rotation, Tilt, and Depth

Configure the 3D view:

```typescript
enableRotation:
    true,

rotation:
    22,

tilt:
    10,

depth:
    120
```

Validate the values:

```typescript
const validate3DSettings = (
    rotation:
        number,
    tilt:
        number,
    depth:
        number
): void => {
    if (
        !Number.isFinite(
            rotation
        )
    ) {
        throw new Error(
            'Rotation must be finite.'
        );
    }

    if (
        !Number.isFinite(
            tilt
        )
    ) {
        throw new Error(
            'Tilt must be finite.'
        );
    }

    if (
        !Number.isFinite(
            depth
        ) ||
        depth <= 0
    ) {
        throw new Error(
            'Depth must be finite and positive.'
        );
    }
};
```

Do not document a fixed rotation range unless it has been verified against the installed property model.

Avoid extreme values that:

- Hide data points.
- Cause series occlusion.
- Make labels unreadable.
- Distort visual comparisons.
- Reduce touch usability.

## Theme Selection

Apply a built-in visual theme through:

```typescript
theme:
    'Fluent2'
```

A separate Syncfusion theme stylesheet is not required solely for the focused Chart3D examples.

Theme values can vary between EJ2 releases. Validate the selected value against the installed `Chart3DTheme` model.

Do not present an outdated theme list as exhaustive.

Do not use an arbitrary value:

```typescript
theme:
    'CustomTheme'
```

unless the installed API explicitly supports it.

## Key Properties

### 3D-Specific Properties

```text
enableRotation -> Enables user rotation.
rotation       -> Sets the initial horizontal rotation.
tilt           -> Sets the initial vertical tilt.
depth          -> Sets the 3D rendering depth.
wallColor      -> Sets the chart-wall color.
```

### Chart-Level Properties

```text
primaryXAxis   -> Configures the primary category or horizontal axis.
primaryYAxis   -> Configures the primary numeric axis.
series         -> Configures the 3D series collection.
tooltip        -> Configures tooltips.
legendSettings -> Configures the legend.
title          -> Sets the chart title.
theme          -> Applies a built-in Chart3D theme.
palette        -> Sets series colors.
background     -> Sets the chart background.
height         -> Sets the component height.
width          -> Sets the component width.
```

Use `legendSettings`, not `legend`.

### Series-Level Properties

```text
dataSource    -> Binds series data.
xName         -> Maps the category or x-value field.
yName         -> Maps the numeric value field.
type          -> Selects the 3D series type.
name          -> Sets the series name.
fill          -> Sets a series fill where supported.
opacity       -> Sets series opacity where supported.
stackingGroup -> Groups compatible stacked series.
```

Do not assume that ordinary Chart marker settings apply identically to every Chart3D series.

Validate data labels, marker-like point customization, borders, and point-rendering events against the installed Chart3D API.

## Internal Theme and Application CSS

Use the Chart3D `theme` property for the chart’s built-in appearance:

```typescript
theme:
    'Fluent2'
```

Use application-owned CSS for:

- Page background.
- Card layouts.
- Host dimensions.
- Responsive spacing.
- Text summaries.
- Data tables.
- External buttons and controls.

Example:

```css
.chart-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

#chart-container {
    width: 100%;
    min-height: 600px;
}
```

Do not install or import a Syncfusion theme package only for a focused Chart3D example.

## Dynamic Data Updates

Replace the first series data:

```typescript
chart.series[0]
    .dataSource =
        updatedChartData;

chart.dataBind();
```

Update the title:

```typescript
chart.title =
    'Updated Monthly Sales';

chart.dataBind();
```

Update the 3D view:

```typescript
chart.rotation =
    15;

chart.tilt =
    12;

chart.depth =
    110;

chart.dataBind();
```

Batch updates:

```typescript
chart.title =
    'Updated Monthly Sales';

chart.series[0]
    .dataSource =
        updatedChartData;

chart.rotation =
    15;

chart.dataBind();
```

Use `dataBind()` for normal property updates.

Use `refresh()` when:

- The host dimensions changed.
- The chart was initialized in a hidden container.
- A complete layout recalculation is needed.
- The series structure changed substantially.

## Remote Data

Remote data can be bound through `DataManager`.

```typescript
import {
    DataManager,
    Query
} from '@syncfusion/ej2-data';

const dataManager:
    DataManager =
        new DataManager({
            url:
                'https://example.com/api/sales'
        });

const query:
    Query =
        new Query()
            .take(
                12
            );
```

Bind it:

```typescript
series: [
    {
        dataSource:
            dataManager,
        query:
            query,
        xName:
            'month',
        yName:
            'sales',
        type:
            'Column',
        name:
            'Sales'
    }
]
```

The URL must be a plain string.

Do not embed an HTML anchor inside the URL.

Validate:

- HTTPS usage.
- Endpoint availability.
- Authentication.
- CORS.
- Content Security Policy.
- Response shape.
- Field casing.
- Numeric values.
- Empty responses.
- Cancellation and cleanup.

Do not present an example-domain URL as a working service.

## Accessibility Guidance

Support an accessible implementation through:

- A semantic heading.
- A concise chart description.
- A persistent summary.
- A semantic table for exact values.
- Readable axis labels.
- Sufficient text contrast.
- Visible focus for application-owned controls.
- Mouse, keyboard, touch, and browser-zoom testing.
- Moderate rotation and tilt.
- Alternatives to color-only meaning.
- Alternatives to depth-only meaning.
- Tooltips as supplemental content.

Do not claim automatic WCAG compliance.

Do not rely only on:

- Column height.
- Column depth.
- Perspective.
- Series color.
- Hover tooltips.

For decision-critical values, provide a table:

```html
<table>
    <caption>
        Monthly sales values
    </caption>

    <thead>
        <tr>
            <th scope="col">Month</th>
            <th scope="col">Sales</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <th scope="row">January</th>
            <td>35</td>
        </tr>
    </tbody>
</table>
```

## Performance and Cleanup

- Validate data before rendering.
- Reuse normalized data.
- Avoid unnecessary series.
- Avoid excessive depth.
- Avoid extreme perspective.
- Reduce animation for larger datasets.
- Keep tooltip content simple.
- Batch property changes.
- Call `dataBind()` once after related updates.
- Call `refresh()` only when a layout recalculation is needed.
- Debounce resize handlers.
- Cancel pending remote requests.
- Remove application-owned listeners.
- Clear pending timers.
- Destroy the chart when its dynamic host is removed.

```typescript
chart.destroy();
```

Resize cleanup:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

if (
    resizeTimer !==
    undefined
) {
    window.clearTimeout(
        resizeTimer
    );
}

chart.destroy();
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-charts is installed.
✅ No external theme package is installed solely for Chart3D.
✅ The built-in visual theme is configured through theme.
✅ The selected theme exists in the installed Chart3DTheme model.
✅ Chart3D is imported.
✅ The configured series module is imported and injected.
✅ ColumnSeries3D is injected for Column.
✅ The validated Bar 3D module is injected for Bar.
✅ The stacking-column module is injected for StackingColumn.
✅ StackingBarSeries3D is injected for StackingBar.
✅ The corresponding module is injected for a 100% stacking series.
✅ Category3D is injected for a category axis.
✅ Date-time axes use the validated Chart3D date-time module.
✅ Legend3D is injected only when the legend is used.
✅ Tooltip3D is injected only when tooltips are enabled.
✅ Highlight and selection modules are included only when enabled.
✅ Imports and injection are synchronized.
✅ Global JavaScript does not call Chart3D.Inject.
✅ The global bundle loads before application code.
✅ Combined and individual scripts are not mixed.
✅ Individual package scripts use a single EJ2 version.
✅ The host exists.
✅ The appendTo target matches the host ID.
✅ The host has measurable dimensions.
✅ Chart width and height use valid CSS-size strings.
✅ The data collection is nonempty.
✅ Category labels are nonempty.
✅ Category labels are unique when required.
✅ xName matches the category field.
✅ yName matches a numeric field.
✅ Every y value is finite.
✅ Axis minimum is below axis maximum.
✅ Axis interval is finite and positive.
✅ The axis range includes all intended values.
✅ legendSettings is used instead of legend.
✅ Rotation is finite.
✅ Tilt is finite.
✅ Depth is finite and positive.
✅ 3D settings do not obscure important data.
✅ Multi-series values use compatible units.
✅ Stacking groups are configured intentionally.
✅ Ordinary stacking is not described as 100% stacking.
✅ Important meaning is not communicated only through color or depth.
✅ A persistent text alternative is available.
✅ Resize handlers are debounced.
✅ Listeners and timers are cleaned up.
✅ Pending requests are cancelled when appropriate.
✅ chart.destroy() is called when a dynamic host is removed.
✅ No encoded executable HTML remains.
✅ No rich-text URL wrappers or editor-generated classes remain.
```

## Troubleshooting

### Chart Does Not Render

Verify:

1. `@syncfusion/ej2-charts` is installed.
2. `Chart3D` is imported.
3. The selected series module is injected.
4. The selected axis module is injected.
5. The host exists.
6. The host ID matches `appendTo()`.
7. The host has measurable dimensions.
8. The data collection is nonempty.
9. `xName` matches the category field.
10. `yName` matches the numeric field.
11. No previous error stopped execution.
12. The chart is not initialized multiple times in the same host.

### Column Series Does Not Render

Import and inject:

```typescript
import {
    ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    ColumnSeries3D
);
```

Configure:

```typescript
series: [
    {
        dataSource:
            chartData,
        xName:
            'month',
        yName:
            'sales',
        type:
            'Column'
    }
]
```

### Stacking Bar Does Not Render

Import and inject:

```typescript
import {
    StackingBarSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    StackingBarSeries3D
);
```

Configure:

```typescript
series: [
    {
        dataSource:
            regionalData,
        xName:
            'region',
        yName:
            'productA',
        type:
            'StackingBar'
    }
]
```

### Category Axis Does Not Render

Import and inject:

```typescript
import {
    Category3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    Category3D
);
```

Configure:

```typescript
primaryXAxis: {
    valueType:
        'Category'
}
```

### Legend Does Not Appear

Import and inject:

```typescript
import {
    Legend3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    Legend3D
);
```

Use:

```typescript
legendSettings: {
    visible:
        true
}
```

Do not use:

```typescript
legend: {
    visible:
        true
}
```

### Tooltip Does Not Appear

Import and inject:

```typescript
import {
    Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    Tooltip3D
);
```

Enable:

```typescript
tooltip: {
    enable:
        true
}
```

### Rotation Does Not Work

Enable rotation:

```typescript
enableRotation:
    true
```

Check:

- No element covers the chart.
- Pointer events are enabled.
- The host has usable dimensions.
- No application event blocks interaction.
- Rotation is supported by the target input environment.

### Data Is Clipped

Check the axis maximum:

```typescript
primaryYAxis: {
    minimum:
        0,
    maximum:
        60,
    interval:
        10
}
```

Increase the maximum or allow automatic range calculation when data exceeds the configured range.

### Labels Overlap

Use:

```typescript
primaryXAxis: {
    valueType:
        'Category',
    labelRotation:
        -45
}
```

Also consider:

- Increasing chart size.
- Shortening category labels.
- Reducing category count.
- Reducing rotation or tilt.
- Reducing the number of visible series.

### Hidden Container

If the chart is initialized inside a hidden tab, dialog, accordion, or panel, call:

```typescript
chart.refresh();
```

after the parent becomes visible.

### Global Namespace Is Undefined

Check:

```javascript
if (
    typeof window.ej ===
        'undefined' ||
    !window.ej.charts ||
    !window.ej.charts.Chart3D
) {
    throw new Error(
        'The EJ2 3D Chart global bundle was not loaded.'
    );
}
```

Ensure the bundle loads before application code.

### Theme Does Not Apply

Verify:

- The selected theme exists in the installed Chart3D theme model.
- The value uses correct casing.
- No stale compiled output is loaded.
- No later assignment overrides `chart.theme`.
- A separate theme stylesheet is not expected to control the Chart3D theme.

Apply:

```typescript
theme:
    'Fluent2'
```

### Runtime Output Differs from TypeScript

Run:

```bash
npx tsc --noEmit
```

Check:

- Package versions.
- Property casing.
- Module injection.
- Compiled output.
- Browser cache.
- Duplicate component instances.
- Stale development-server output.

## Combined Mistakes and Future References

### External Theme Stylesheet Added Unnecessarily

Avoid installing or importing a Syncfusion theme package solely for a focused Chart3D example.

Use:

```typescript
theme:
    'Fluent2'
```

### Incorrect Legend Property

Incorrect:

```typescript
legend: {
    visible:
        true
}
```

Correct:

```typescript
legendSettings: {
    visible:
        true
}
```

### Malformed CDN Script

Incorrect:

```html
https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

### Combined and Individual Bundles Mixed

Avoid:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"
></script>
```

Use one bundle strategy.

### Mismatched Script Versions

Incorrect:

```html
<script
    src="https://cdn.syncfusion.com/ej2/33.2.3/ej2-base/dist/global/ej2-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"
></script>
```

Use one EJ2 version.

### Encoded Host Markup

Incorrect:

```html
&lt;div id="chart-container"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="chart-container"></div>
```

### Missing Host Dimensions

Incorrect:

```css
#chart-container {
}
```

Correct:

```css
#chart-container {
    width: 100%;
    min-height: 600px;
}
```

### Missing Column Module

Incorrect:

```typescript
import {
    Chart3D
} from '@syncfusion/ej2-charts';
```

with:

```typescript
type:
    'Column'
```

Correct:

```typescript
import {
    Chart3D,
    ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    ColumnSeries3D
);
```

### Missing Stacking Module

Incorrect:

```typescript
series: [
    {
        type:
            'StackingBar'
    }
]
```

without `StackingBarSeries3D`.

Correct:

```typescript
import {
    StackingBarSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    StackingBarSeries3D
);
```

### Missing Category Module

Incorrect:

```typescript
primaryXAxis: {
    valueType:
        'Category'
}
```

without `Category3D`.

Correct:

```typescript
import {
    Category3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    Category3D
);
```

### Missing Field Mappings

Incorrect:

```typescript
series: [
    {
        dataSource:
            chartData,
        type:
            'Column'
    }
]
```

Correct:

```typescript
series: [
    {
        dataSource:
            chartData,
        xName:
            'month',
        yName:
            'sales',
        type:
            'Column'
    }
]
```

### Undefined Data

Avoid:

```typescript
dataSource:
    chartData
```

unless `chartData` is defined, loaded, and validated.

### Numeric Strings

Avoid:

```typescript
{
    month:
        'Jan',
    sales:
        '35'
}
```

Use:

```typescript
{
    month:
        'Jan',
    sales:
        35
}
```

Normalize remote data before binding.

### Axis Maximum Excludes Data

Incorrect:

```typescript
primaryYAxis: {
    maximum:
        40
}
```

when the data contains:

```typescript
{
    sales:
        55
}
```

Use an adequate maximum or automatic range calculation.

### Ordinary Stacking Described as 100 Percent

Incorrect:

```text
StackingColumn automatically normalizes every category to 100%.
```

Correct:

```text
Use StackingColumn for absolute stacked values.
Use StackingColumn100 for proportional 100-percent stacking.
```

### Unverified Theme Name

Avoid:

```typescript
theme:
    'CustomTheme'
```

Validate the value through the installed Chart3D theme type.

### Universal Marker Support Assumption

Do not assume ordinary Chart marker settings work identically for every Chart3D series.

Validate the Chart3D-specific property and module first.

### Unsupported Interaction Claims

Do not promise:

- Crosshairs.
- Trackballs.
- Keyboard rotation.
- Point selection.
- Series selection.
- Export formats.

without validating the Chart3D-specific APIs and modules.

### Automatic Accessibility Compliance Claim

Do not state:

```text
Chart3D is automatically WCAG compliant.
```

Use:

```text
Validate the complete implementation against the application's
accessibility requirements and target assistive technologies.
```

### Repeated dataBind Calls

Avoid:

```typescript
chart.title =
    'Updated';

chart.dataBind();

chart.rotation =
    15;

chart.dataBind();
```

Preferred:

```typescript
chart.title =
    'Updated';

chart.rotation =
    15;

chart.dataBind();
```

### Duplicate Initialization

Avoid creating multiple Chart3D instances in the same host without cleanup.

```typescript
existingChart.destroy();

newChart.appendTo(
    '#chart-container'
);
```

### Missing Cleanup

When the dynamic view is removed:

```typescript
window.removeEventListener(
    'resize',
    handleResize
);

if (
    resizeTimer !==
    undefined
) {
    window.clearTimeout(
        resizeTimer
    );
}

chart.destroy();
```

### Editor-Generated Markup

Remove the following from executable HTML, TypeScript, JavaScript, CSS, imports, commands, and URLs:

```text
<a>
<strong data-lexical-text="true">
<br>
data-lexical-text
Editor-generated class names
Encoded executable HTML
Malformed script elements
Rich-text URL wrappers
```