# Getting Started with 3D Charts

Learn how to install, configure, and render a Syncfusion EJ2 3D Chart in framework-neutral TypeScript and JavaScript applications.

The 3D Chart is included in the `@syncfusion/ej2-charts` package. It supports 3D series, category and numeric axes, legends, tooltips, data labels, selection, highlighting, rotation, tilt, depth, local data, and remote data.

Unlike controls that depend on external theme stylesheets, the EJ2 3D Chart applies its visual theme internally through the `theme` property. A separate Syncfusion theme stylesheet is not required for the basic TypeScript or JavaScript 3D Chart examples in this guide.

This guide covers:

- TypeScript installation through npm.
- JavaScript setup through the combined EJ2 CDN bundle.
- JavaScript setup through npm and ES modules.
- Required module injection.
- Host dimensions.
- Local data binding.
- Axis configuration.
- 3D rotation, tilt, and depth.
- Legends and tooltips.
- Runtime validation.
- Responsive rendering.
- Accessibility and cleanup.
- Common rendering issues.

## Table of Contents

- [Installation and Setup](#installation-and-setup)
- [TypeScript Installation](#typescript-installation)
- [License Registration](#license-registration)
- [TypeScript Imports](#typescript-imports)
- [Module Injection](#module-injection)
- [JavaScript Setup](#javascript-setup)
- [Combined CDN Bundle](#combined-cdn-bundle)
- [Individual Package Scripts](#individual-package-scripts)
- [JavaScript with npm and ES Modules](#javascript-with-npm-and-es-modules)
- [Container Setup](#container-setup)
- [Data Model and Validation](#data-model-and-validation)
- [Creating Your First 3D Chart](#creating-your-first-3d-chart)
- [TypeScript Basic Example](#typescript-basic-example)
- [JavaScript Basic Example](#javascript-basic-example)
- [Basic Configuration](#basic-configuration)
- [Axes](#axes)
- [Legend](#legend)
- [Tooltip](#tooltip)
- [Rotation, Tilt, and Depth](#rotation-tilt-and-depth)
- [Theme Selection](#theme-selection)
- [Dynamic Updates](#dynamic-updates)
- [Complete TypeScript Example](#complete-typescript-example)
  - [Installation](#installation)
  - [index.html](#indexhtml)
  - [styles.css](#stylescss)
  - [index.ts](#indexts)
- [Complete JavaScript Example](#complete-javascript-example)
- [Accessibility Guidance](#accessibility-guidance)
- [Performance and Cleanup](#performance-and-cleanup)
- [Runtime Validation Checklist](#runtime-validation-checklist)
- [Troubleshooting](#troubleshooting)
- [3D Chart Does Not Render](#3d-chart-does-not-render)
- [Column Series Does Not Render](#column-series-does-not-render)
- [Category Axis Does Not Render](#category-axis-does-not-render)
- [Legend Does Not Appear](#legend-does-not-appear)
- [Tooltip Does Not Appear](#tooltip-does-not-appear)
- [Rotation Does Not Work](#rotation-does-not-work)
- [Data Columns Are Clipped](#data-columns-are-clipped)
- [Labels Overlap](#labels-overlap)
- [Chart Is Initialized in a Hidden Container](#chart-is-initialized-in-a-hidden-container)
- [Global Namespace Is Undefined](#global-namespace-is-undefined)
- [Runtime Output Differs from Configuration](#runtime-output-differs-from-configuration)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)
  - [Theme Stylesheet Added Unnecessarily](#theme-stylesheet-added-unnecessarily)
  - [Malformed CDN Scripts](#malformed-cdn-scripts)
  - [Combined and Individual Bundles Loaded Together](#combined-and-individual-bundles-loaded-together)
  - [Mismatched Script Versions](#mismatched-script-versions)
  - [Encoded Host Markup](#encoded-host-markup)
  - [Missing Host Dimensions](#missing-host-dimensions)
  - [Missing Column Module](#missing-column-module)
  - [Missing Category Module](#missing-category-module)
  - [Missing Field Mappings](#missing-field-mappings)
  - [Unsupported Theme Name](#unsupported-theme-name)
  - [Extreme Rotation and Tilt](#extreme-rotation-and-tilt)
  - [Repeated dataBind Calls](#repeated-databind-calls)
  - [Duplicate Initialization](#duplicate-initialization)
  - [Missing Cleanup](#missing-cleanup)
  - [Editor-Generated Markup](#editor-generated-markup)


## Installation and Setup

## TypeScript Installation

Install the Charts package:

```bash
npm install @syncfusion/ej2-charts
```

The 3D Chart and its required core dependencies are included through `@syncfusion/ej2-charts`.

Do not install every transitive dependency separately unless the package manager reports a specific unresolved dependency.

Keep all installed Syncfusion package versions compatible.

## License Registration

Register an applicable Syncfusion license before initializing the component when required by the selected license and deployment.

```typescript
import {
    registerLicense
} from '@syncfusion/ej2-base';

registerLicense(
    'YOUR_SYNCFUSION_LICENSE_KEY'
);
```

Do not commit a private license key to a public repository.

## TypeScript Imports

A 3D Column Chart with a category axis, legend, and tooltip requires:

```typescript
import {
    Category3D,
    Chart3D,
    ColumnSeries3D,
    Legend3D,
    Tooltip3D
} from '@syncfusion/ej2-charts';
```

## Module Injection

Inject the required modules before constructing the 3D Chart:

```typescript
Chart3D.Inject(
    ColumnSeries3D,
    Category3D,
    Legend3D,
    Tooltip3D
);
```

Keep imports and injection synchronized.

Do not inject modules that are not imported.

Do not import optional modules that are not used.

For a minimal 3D Column Chart without a legend or tooltip:

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

## JavaScript Setup

## Combined CDN Bundle

The simplest JavaScript setup uses the complete versioned EJ2 global bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

The global constructor is then available through:

```javascript
ej.charts.Chart3D
```

Validate the namespace before constructing the chart:

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

Do not call `Chart3D.Inject(...)` when using the complete global EJ2 bundle.

A separate Syncfusion theme stylesheet is not required for the focused 3D Chart example. Apply a supported visual theme through the Chart3D `theme` property.

## Individual Package Scripts

Individual global package scripts can be used when the application requires a smaller setup.

Example:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"
></script>

<script
    src="https://cdn.synfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"
></script>
```

Rules:

- Use the same EJ2 version for every script.
- Load dependencies before `ej2-charts`.
- Do not load the complete EJ2 bundle and individual package scripts together.
- Include only the dependencies required by the selected build.
- Prefer the combined bundle for a first working example.

## JavaScript with npm and ES Modules

Install:

```bash
npm install @syncfusion/ej2-charts
```

Import and inject modules:

```javascript
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

Then construct and append the chart:

```javascript
var chart =
    new Chart3D({
        series: [
            // Series configuration
        ]
    });

chart.appendTo(
    '#chart-container'
);
```

Module-based JavaScript requires a bundler or browser setup capable of resolving the npm package.

## Container Setup

Add a host element:

```html
<div id="chart-container"></div>
```

Use application-owned CSS to provide measurable dimensions:

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

Configure the chart dimensions:

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

Validate the host before initialization:

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

The two-argument constructor is also supported:

```typescript
const chart:
    Chart3D =
        new Chart3D(
            configuration,
            '#chart-container'
        );
```

Explicit `appendTo()` is preferred for host validation, documentation clarity, and cleanup.

## Data Model and Validation

Define a typed data model:

```typescript
interface MonthlySales {
    month: string;
    sales: number;
}
```

Create the data:

```typescript
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
        },
        {
            month:
                'Jun',
            sales:
                32
        },
        {
            month:
                'Jul',
            sales:
                35
        },
        {
            month:
                'Aug',
            sales:
                55
        },
        {
            month:
                'Sep',
            sales:
                38
        },
        {
            month:
                'Oct',
            sales:
                30
        },
        {
            month:
                'Nov',
            sales:
                25
        },
        {
            month:
                'Dec',
            sales:
                32
        }
    ];
```

Validate the data before rendering:

```typescript
const validateChartData = (
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
            const month:
                string =
                    item.month.trim();

            if (!month) {
                throw new Error(
                    'Data point ' +
                    index +
                    ' requires a nonempty category.'
                );
            }

            if (
                categories.has(
                    month
                )
            ) {
                throw new Error(
                    'Duplicate category: ' +
                    month
                );
            }

            if (
                !Number.isFinite(
                    item.sales
                )
            ) {
                throw new Error(
                    'Data point "' +
                    month +
                    '" requires a finite sales value.'
                );
            }

            if (
                item.sales < 0
            ) {
                throw new Error(
                    'Data point "' +
                    month +
                    '" cannot have negative sales in this example.'
                );
            }

            categories.add(
                month
            );
        }
    );
};
```

Call validation before constructing the chart:

```typescript
validateChartData(
    chartData
);
```

## Creating Your First 3D Chart

## TypeScript Basic Example

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

interface MonthlySales {
    month: string;
    sales: number;
}

const chartData:
    MonthlySales[] = [
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
        }
    ];

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
            ],

            enableRotation:
                true,
            rotation:
                7,
            tilt:
                10,
            depth:
                100
        });

chart.appendTo(
    '#chart-container'
);
```

A separate theme stylesheet is not required in this TypeScript example. The 3D Chart applies the selected theme through:

```typescript
theme:
    'Fluent2'
```

Validate the exact theme name against the installed `@syncfusion/ej2-charts` version.

## JavaScript Basic Example

```html
<div id="chart-container"></div>

<script>
    var chartData = [
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
            ],

            enableRotation:
                true,
            rotation:
                7,
            tilt:
                10,
            depth:
                100
        });

    chart.appendTo(
        '#chart-container'
    );
</script>
```

## Basic Configuration

A minimal 3D Column Chart requires:

- The `Chart3D` class.
- The `ColumnSeries3D` module.
- A data source.
- Valid `xName` and `yName` field mappings.
- A host element.

```typescript
const chart:
    Chart3D =
        new Chart3D({
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
        });

chart.appendTo(
    '#chart-container'
);
```

When `xName` contains category strings, inject `Category3D` and configure:

```typescript
primaryXAxis: {
    valueType:
        'Category'
}
```

## Axes

Configure the category axis:

```typescript
primaryXAxis: {
    valueType:
        'Category',
    title:
        'Month',
    labelRotation:
        -45,
    labelPlacement:
        'BetweenTicks'
}
```

Configure the numeric axis:

```typescript
primaryYAxis: {
    minimum:
        0,
    maximum:
        60,
    interval:
        10,
    title:
        'Sales'
}
```

Validate axis values:

```typescript
const validateNumericAxis = (
    minimum:
        number,
    maximum:
        number,
    interval:
        number
): void => {
    if (
        !Number.isFinite(
            minimum
        ) ||
        !Number.isFinite(
            maximum
        ) ||
        minimum >= maximum
    ) {
        throw new Error(
            'The axis minimum must be less than its maximum.'
        );
    }

    if (
        !Number.isFinite(
            interval
        ) ||
        interval <= 0
    ) {
        throw new Error(
            'The axis interval must be finite and positive.'
        );
    }
};
```

Ensure the configured maximum includes the expected values:

```typescript
const maximumDataValue:
    number =
        Math.max(
            ...chartData.map(
                (
                    item:
                        MonthlySales
                ): number => {
                    return item.sales;
                }
            )
        );

if (
    maximumDataValue >
    60
) {
    throw new Error(
        'The configured axis maximum does not include every data value.'
    );
}
```

## Legend

Import and inject `Legend3D` when the legend is visible:

```typescript
import {
    Legend3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    Legend3D
);
```

Configure:

```typescript
legendSettings: {
    visible:
        true,
    position:
        'Bottom'
}
```

Do not inject `Legend3D` when the legend is disabled and no other example feature requires it.

For a single series, a legend may be unnecessary if the title and surrounding description already identify the series.

## Tooltip

Import and inject `Tooltip3D`:

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

Tooltips should supplement persistent information.

Do not make the tooltip the only source of exact values when the visualization is decision-critical.

## Rotation, Tilt, and Depth

Enable interactive rotation:

```typescript
enableRotation:
    true
```

Set the initial rotation:

```typescript
rotation:
    7
```

Set the initial tilt:

```typescript
tilt:
    10
```

Configure depth:

```typescript
depth:
    100
```

Combined configuration:

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
        });
```

Validate the settings:

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
            'The 3D Chart rotation must be finite.'
        );
    }

    if (
        !Number.isFinite(
            tilt
        )
    ) {
        throw new Error(
            'The 3D Chart tilt must be finite.'
        );
    }

    if (
        !Number.isFinite(
            depth
        ) ||
        depth <= 0
    ) {
        throw new Error(
            'The 3D Chart depth must be finite and positive.'
        );
    }
};
```

Avoid extreme rotation, tilt, or depth values that:

- Hide columns.
- Make labels unreadable.
- Distort visual comparison.
- Obscure values behind other data points.
- Make pointer or touch interaction difficult.

Enable rotation only when interactive rotation is useful to the application.

## Theme Selection

Set the visual theme through the `theme` property:

```typescript
const chart:
    Chart3D =
        new Chart3D({
            theme:
                'Fluent2',

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
        });
```

The theme is internally applied by Chart3D. A separate external Syncfusion theme stylesheet is not required for the focused 3D Chart examples in this guide.

Theme names can vary between EJ2 releases. Validate the selected value against the installed `Chart3DTheme` type.

Do not present an outdated theme list as exhaustive.

Do not assume that an arbitrary theme name is supported:

```typescript
theme:
    'CustomTheme'
```

Use a value supported by the installed package.

## Dynamic Updates

Update the series data:

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

Update rotation:

```typescript
chart.rotation =
    15;

chart.dataBind();
```

Batch related updates:

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

- The host dimensions change.
- The chart is shown after being initialized in a hidden container.
- A complete layout recalculation is needed.
- The series structure changes substantially.

## Complete TypeScript Example

### Installation

```bash
npm install @syncfusion/ej2-charts
```

No external theme package or theme stylesheet is required for this focused Chart3D example.

### index.html

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

    ./styles.css
</head>

<body>
    <main class="page-container">
        <section
            class="chart-card"
            aria-labelledby="chart-heading"
            aria-describedby="chart-description"
        >
            <h1 id="chart-heading">
                Monthly Sales
            </h1>

            <p id="chart-description">
                The 3D Column Chart compares monthly sales from
                January through December. Drag the chart to rotate
                it when rotation is enabled.
            </p>

            <div id="chart-container"></div>

            <section
                class="chart-summary"
                aria-labelledby="chart-summary-heading"
            >
                <h2 id="chart-summary-heading">
                    Sales summary
                </h2>

                <p id="highest-sales"></p>
                <p id="lowest-sales"></p>
                <p id="average-sales"></p>
            </section>

            <div class="table-wrapper">
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

                    <tbody id="sales-table-body"></tbody>
                </table>
            </div>

            <p
                id="chart-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the 3D Chart.
            </p>
        </section>
    </main>

      <script src="./index.js"></script>
</body>
</html>
```

### styles.css

```css
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    min-height: 100%;
}

body {
    color: #0f172a;
    background: #f8fafc;
    font-family:
        "Segoe UI",
        Arial,
        sans-serif;
}

.page-container {
    width: 100%;
    min-height: 100vh;
    padding: 24px;
}

.chart-card {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
}

.chart-card h1 {
    margin: 0 0 8px;
    font-size: 24px;
}

.chart-card > p {
    margin: 0 0 16px;
    color: #475569;
    line-height: 1.5;
}

#chart-container {
    width: 100%;
    min-height: 600px;
}

.chart-summary {
    margin-top: 20px;
    padding: 16px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
}

.chart-summary h2 {
    margin: 0 0 8px;
    font-size: 18px;
}

.chart-summary p {
    margin: 4px 0;
}

.table-wrapper {
    width: 100%;
    margin-top: 20px;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

caption {
    padding: 0 0 10px;
    font-weight: 700;
    text-align: left;
}

th,
td {
    padding: 10px 12px;
    border: 1px solid #94a3b8;
    text-align: left;
}

thead th {
    color: #ffffff;
    background: #334155;
}

.status-message {
    margin-top: 12px;
    color: #475569;
}

@media (max-width: 767px) {
    .page-container {
        padding: 12px;
    }

    .chart-card {
        padding: 12px;
    }

    #chart-container {
        min-height: 500px;
    }
}
```

### index.ts

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
            sales: 32
        },
        {
            month: 'Jul',
            sales: 35
        },
        {
            month: 'Aug',
            sales: 55
        },
        {
            month: 'Sep',
            sales: 38
        },
        {
            month: 'Oct',
            sales: 30
        },
        {
            month: 'Nov',
            sales: 25
        },
        {
            month: 'Dec',
            sales: 32
        }
    ];

const validateChartData = (
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
            const month:
                string =
                    item.month.trim();

            if (!month) {
                throw new Error(
                    'Data point ' +
                    index +
                    ' requires a category.'
                );
            }

            if (
                categories.has(
                    month
                )
            ) {
                throw new Error(
                    'Duplicate category: ' +
                    month
                );
            }

            if (
                !Number.isFinite(
                    item.sales
                ) ||
                item.sales < 0
            ) {
                throw new Error(
                    'Data point "' +
                    month +
                    '" requires a finite nonnegative sales value.'
                );
            }

            categories.add(
                month
            );
        }
    );
};

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

validateChartData(
    chartData
);

validate3DSettings(
    7,
    10,
    100
);

const maximumSales:
    number =
        Math.max(
            ...chartData.map(
                (
                    item:
                        MonthlySales
                ): number => {
                    return item.sales;
                }
            )
        );

if (
    maximumSales >
    60
) {
    throw new Error(
        'The primary Y-axis maximum must include all sales values.'
    );
}

const host:
    HTMLElement | null =
        document.getElementById(
            'chart-container'
        );

const statusElement:
    HTMLElement | null =
        document.getElementById(
            'chart-status'
        );

if (!host) {
    throw new Error(
        'The 3D Chart host "#chart-container" was not found.'
    );
}

const highest:
    MonthlySales =
        chartData.reduce(
            (
                current:
                    MonthlySales,
                item:
                    MonthlySales
            ): MonthlySales => {
                return (
                    item.sales >
                    current.sales
                )
                    ? item
                    : current;
            }
        );

const lowest:
    MonthlySales =
        chartData.reduce(
            (
                current:
                    MonthlySales,
                item:
                    MonthlySales
            ): MonthlySales => {
                return (
                    item.sales <
                    current.sales
                )
                    ? item
                    : current;
            }
        );

const average:
    number =
        chartData.reduce(
            (
                total:
                    number,
                item:
                    MonthlySales
            ): number => {
                return (
                    total +
                    item.sales
                );
            },
            0
        ) /
        chartData.length;

const setText = (
    id:
        string,
    value:
        string
): void => {
    const element:
        HTMLElement | null =
            document.getElementById(
                id
            );

    if (element) {
        element.textContent =
            value;
    }
};

setText(
    'highest-sales',
    'Highest sales: ' +
        highest.month +
        ', ' +
        highest.sales
);

setText(
    'lowest-sales',
    'Lowest sales: ' +
        lowest.month +
        ', ' +
        lowest.sales
);

setText(
    'average-sales',
    'Average monthly sales: ' +
        average.toFixed(
            1
        )
);

const tableBody:
    HTMLTableSectionElement | null =
        document.getElementById(
            'sales-table-body'
        ) as
            HTMLTableSectionElement |
            null;

if (tableBody) {
    chartData.forEach(
        (
            item:
                MonthlySales
        ): void => {
            const row:
                HTMLTableRowElement =
                    document.createElement(
                        'tr'
                    );

            const monthCell:
                HTMLTableCellElement =
                    document.createElement(
                        'th'
                    );

            monthCell.scope =
                'row';

            monthCell.textContent =
                item.month;

            const salesCell:
                HTMLTableCellElement =
                    document.createElement(
                        'td'
                    );

            salesCell.textContent =
                String(
                    item.sales
                );

            row.append(
                monthCell,
                salesCell
            );

            tableBody.appendChild(
                row
            );
        }
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

            title:
                'Monthly Sales in 3D',

            primaryXAxis: {
                valueType:
                    'Category',
                title:
                    'Month',
                labelPlacement:
                    'BetweenTicks'
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
            ],

            enableRotation:
                true,

            rotation:
                7,

            tilt:
                10,

            depth:
                100,

            wallColor:
                'transparent',

            loaded:
                (): void => {
                    if (
                        statusElement
                    ) {
                        statusElement.textContent =
                            'The 3D Chart loaded successfully.';
                    }
                }
        });

chart.appendTo(
    host
);

let resizeTimer:
    number | undefined;

const handleResize =
    (): void => {
        if (
            resizeTimer !==
            undefined
        ) {
            window.clearTimeout(
                resizeTimer
            );
        }

        resizeTimer =
            window.setTimeout(
                (): void => {
                    const compact:
                        boolean =
                            window.matchMedia(
                                '(max-width: 767px)'
                            ).matches;

                    chart.height =
                        compact
                            ? '500px'
                            : '600px';

                    chart.refresh();
                },
                150
            );
    };

window.addEventListener(
    'resize',
    handleResize
);
```

Cleanup:

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

## Complete JavaScript Example

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>EJ2 JavaScript 3D Chart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            min-height: 100%;
        }

        body {
            color: #0f172a;
            background: #f8fafc;
            font-family:
                "Segoe UI",
                Arial,
                sans-serif;
        }

        .page-container {
            width: 100%;
            min-height: 100vh;
            padding: 24px;
        }

        .chart-card {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
        }

        .chart-card h1 {
            margin: 0 0 8px;
            font-size: 24px;
        }

        .chart-card > p {
            margin: 0 0 16px;
            color: #475569;
            line-height: 1.5;
        }

        #chart-container {
            width: 100%;
            min-height: 600px;
        }

        .chart-summary {
            margin-top: 20px;
            padding: 16px;
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
        }

        .chart-summary h2 {
            margin: 0 0 8px;
            font-size: 18px;
        }

        .chart-summary p {
            margin: 4px 0;
        }

        .table-wrapper {
            width: 100%;
            margin-top: 20px;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        caption {
            padding: 0 0 10px;
            font-weight: 700;
            text-align: left;
        }

        th,
        td {
            padding: 10px 12px;
            border: 1px solid #94a3b8;
            text-align: left;
        }

        thead th {
            color: #ffffff;
            background: #334155;
        }

        .status-message {
            margin-top: 12px;
            color: #475569;
        }

        @media (max-width: 767px) {
            .page-container {
                padding: 12px;
            }

            .chart-card {
                padding: 12px;
            }

            #chart-container {
                min-height: 500px;
            }
        }
    </style>
</head>

<body>
    <main class="page-container">
        <section
            class="chart-card"
            aria-labelledby="chart-heading"
            aria-describedby="chart-description"
        >
            <h1 id="chart-heading">
                Monthly Sales
            </h1>

            <p id="chart-description">
                The 3D Column Chart compares monthly sales from
                January through December. Drag the chart to rotate
                it when rotation is enabled.
            </p>

            <div id="chart-container"></div>

            <section
                class="chart-summary"
                aria-labelledby="chart-summary-heading"
            >
                <h2 id="chart-summary-heading">
                    Sales summary
                </h2>

                <p id="highest-sales"></p>
                <p id="lowest-sales"></p>
                <p id="average-sales"></p>
            </section>

            <div class="table-wrapper">
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

                    <tbody id="sales-table-body"></tbody>
                </table>
            </div>

            <p
                id="chart-status"
                class="status-message"
                aria-live="polite"
                aria-atomic="true"
            >
                Loading the 3D Chart.
            </p>
        </section>
    </main>

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
                sales: 32
            },
            {
                month: 'Jul',
                sales: 35
            },
            {
                month: 'Aug',
                sales: 55
            },
            {
                month: 'Sep',
                sales: 38
            },
            {
                month: 'Oct',
                sales: 30
            },
            {
                month: 'Nov',
                sales: 25
            },
            {
                month: 'Dec',
                sales: 32
            }
        ];

        function validateChartData(
            data
        ) {
            if (
                !Array.isArray(
                    data
                ) ||
                data.length ===
                    0
            ) {
                throw new Error(
                    'The 3D Chart requires data.'
                );
            }

            var categories =
                new Set();

            data.forEach(
                function (
                    item,
                    index
                ) {
                    if (
                        typeof item.month !==
                            'string' ||
                        item.month
                            .trim()
                            .length ===
                            0
                    ) {
                        throw new Error(
                            'Data point ' +
                            index +
                            ' requires a category.'
                        );
                    }

                    if (
                        categories.has(
                            item.month
                        )
                    ) {
                        throw new Error(
                            'Duplicate category: ' +
                            item.month
                        );
                    }

                    if (
                        !Number.isFinite(
                            item.sales
                        ) ||
                        item.sales < 0
                    ) {
                        throw new Error(
                            'Data point "' +
                            item.month +
                            '" requires a finite nonnegative sales value.'
                        );
                    }

                    categories.add(
                        item.month
                    );
                }
            );
        }

        validateChartData(
            chartData
        );

        var host =
            document.getElementById(
                'chart-container'
            );

        var statusElement =
            document.getElementById(
                'chart-status'
            );

        if (!host) {
            throw new Error(
                'The 3D Chart host "#chart-container" was not found.'
            );
        }

        var highest =
            chartData.reduce(
                function (
                    current,
                    item
                ) {
                    return (
                        item.sales >
                        current.sales
                    )
                        ? item
                        : current;
                }
            );

        var lowest =
            chartData.reduce(
                function (
                    current,
                    item
                ) {
                    return (
                        item.sales <
                        current.sales
                    )
                        ? item
                        : current;
                }
            );

        var total =
            chartData.reduce(
                function (
                    currentTotal,
                    item
                ) {
                    return (
                        currentTotal +
                        item.sales
                    );
                },
                0
            );

        var average =
            total /
            chartData.length;

        document.getElementById(
            'highest-sales'
        ).textContent =
            'Highest sales: ' +
            highest.month +
            ', ' +
            highest.sales;

        document.getElementById(
            'lowest-sales'
        ).textContent =
            'Lowest sales: ' +
            lowest.month +
            ', ' +
            lowest.sales;

        document.getElementById(
            'average-sales'
        ).textContent =
            'Average monthly sales: ' +
            average.toFixed(
                1
            );

        var tableBody =
            document.getElementById(
                'sales-table-body'
            );

        chartData.forEach(
            function (item) {
                var row =
                    document.createElement(
                        'tr'
                    );

                var monthCell =
                    document.createElement(
                        'th'
                    );

                monthCell.scope =
                    'row';

                monthCell.textContent =
                    item.month;

                var salesCell =
                    document.createElement(
                        'td'
                    );

                salesCell.textContent =
                    String(
                        item.sales
                    );

                row.append(
                    monthCell,
                    salesCell
                );

                tableBody.appendChild(
                    row
                );
            }
        );

        var chart =
            new ej.charts.Chart3D({
                width:
                    '100%',

                height:
                    '600px',

                theme:
                    'Fluent2',

                title:
                    'Monthly Sales in 3D',

                primaryXAxis: {
                    valueType:
                        'Category',
                    title:
                        'Month',
                    labelPlacement:
                        'BetweenTicks'
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
                ],

                enableRotation:
                    true,

                rotation:
                    7,

                tilt:
                    10,

                depth:
                    100,

                wallColor:
                    'transparent',

                loaded:
                    function () {
                        statusElement.textContent =
                            'The 3D Chart loaded successfully.';
                    }
            });

        chart.appendTo(
            host
        );
    </script>
</body>
</html>
```

## Accessibility Guidance

- Provide a semantic heading.
- Provide a concise chart description.
- Provide a persistent text summary.
- Provide a semantic data table when exact values are important.
- Do not rely only on column color.
- Do not rely only on depth or perspective.
- Keep tooltips supplemental.
- Preserve visible keyboard focus.
- Ensure axis labels remain readable after rotation.
- Avoid rotation and tilt values that obscure columns.
- Test mouse, keyboard, touch, browser zoom, and responsive reflow behavior.
- Do not claim automatic compliance with an accessibility standard.

## Performance and Cleanup

- Reuse validated data.
- Avoid unnecessary 3D depth.
- Avoid excessive animation for large datasets.
- Keep tooltip formats simple.
- Batch runtime updates.
- Call `dataBind()` once after normal property changes.
- Use `refresh()` after host layout changes.
- Debounce manual resize handling.
- Remove application-owned listeners.
- Clear timers.
- Cancel pending remote requests when applicable.
- Destroy the chart when its dynamic host is removed.

```typescript
chart.destroy();
```

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-charts is installed.
✅ No external theme package is required for the focused Chart3D example.
✅ The visual theme is configured through the Chart3D theme property.
✅ The selected theme is supported by the installed package.
✅ Chart3D is imported.
✅ ColumnSeries3D is imported and injected.
✅ Category3D is imported and injected for category axes.
✅ Legend3D is included only when the legend is visible.
✅ Tooltip3D is included only when tooltips are enabled.
✅ Imports and injection are synchronized.
✅ Global JavaScript does not call Chart3D.Inject.
✅ The complete global bundle loads before application code.
✅ Combined and individual EJ2 scripts are not mixed.
✅ Individual package scripts use the same EJ2 version.
✅ The host exists.
✅ The appendTo target matches the host ID.
✅ The host has measurable dimensions.
✅ The chart width and height are valid CSS-size strings.
✅ The data collection is nonempty.
✅ Category values are nonempty.
✅ Category values are unique when required.
✅ xName matches the category field.
✅ yName matches the numeric field.
✅ Every y value is finite.
✅ Axis minimum is below axis maximum.
✅ Axis interval is finite and positive.
✅ The axis maximum includes expected data values.
✅ Rotation is finite.
✅ Tilt is finite.
✅ Depth is finite and positive.
✅ Extreme 3D settings do not hide values.
✅ Important values are not communicated only through 3D appearance.
✅ A persistent text equivalent is available.
✅ Resize handlers are debounced.
✅ Application-owned listeners and timers are cleaned up.
✅ chart.destroy() is called when a dynamic host is removed.
✅ No encoded executable HTML remains.
✅ No rich-text anchors or editor-generated classes remain.
```

## Troubleshooting

## 3D Chart Does Not Render

Verify:

1. `@syncfusion/ej2-charts` is installed.
2. `Chart3D` is imported.
3. The selected series module is imported and injected.
4. The axis module is imported and injected.
5. The host exists.
6. The host ID matches `appendTo()`.
7. The host has measurable dimensions.
8. The data collection is nonempty.
9. `xName` and `yName` match the data.
10. No previous JavaScript error stopped execution.

## Column Series Does Not Render

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

## Category Axis Does Not Render

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

## Legend Does Not Appear

Import and inject:

```typescript
import {
    Legend3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
    Legend3D
);
```

Enable:

```typescript
legendSettings: {
    visible:
        true
}
```

## Tooltip Does Not Appear

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

## Rotation Does Not Work

Enable rotation:

```typescript
enableRotation:
    true
```

Also check:

- The chart is not covered by another element.
- Pointer events are not disabled.
- The host has usable dimensions.
- Rotation interaction is supported by the selected environment.
- No application event handler prevents the interaction.

## Data Columns Are Clipped

Verify the primary Y-axis maximum:

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

If the data contains values above 60, increase the maximum or allow automatic range calculation.

## Labels Overlap

Try:

```typescript
primaryXAxis: {
    valueType:
        'Category',
    labelRotation:
        -45
}
```

Also consider:

- Increasing chart width.
- Reducing the number of categories.
- Shortening category labels.
- Reducing rotation and tilt.
- Increasing chart height.

## Chart Is Initialized in a Hidden Container

After the parent becomes visible:

```typescript
chart.refresh();
```

Typical hidden parents include:

- Tabs.
- Dialogs.
- Accordions.
- Collapsed panels.
- Initially hidden views.

## Global Namespace Is Undefined

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

## Runtime Output Differs from Configuration

Check:

- Package versions.
- Compiled output.
- Browser cache.
- Property casing.
- Required module injection.
- Duplicate chart instances.
- Host dimensions.
- Stale development-server output.

Run:

```bash
npx tsc --noEmit
```

Rebuild stale output when necessary:

```bash
rm -rf dist
npm run build
```

## Combined Mistakes and Future References

### Theme Stylesheet Added Unnecessarily

Avoid adding a Syncfusion theme stylesheet solely for a focused 3D Chart example when the selected Chart3D theme is internally applied.

Preferred:

```typescript
const chart:
    Chart3D =
        new Chart3D({
            theme:
                'Fluent2'
        });
```

### Malformed CDN Scripts

Incorrect:

```html
https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js
```

Correct:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
></script>
```

### Combined and Individual Bundles Loaded Together

Avoid:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"
></script>
```

Use either the combined bundle or the validated individual package scripts.

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

Use one consistent EJ2 version.

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

with a Column series.

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
series:[
Source:
Data,
Name:
month',
Name:
sales',
:
Column'
 Axis Does Not Render

 inject:


3D
 '@syncfusion/ej2-charts';

D.Inject(
3D

: {
Type:
Category'
 Does Not Appear

 inject:


3D
 '@syncfusion/ej2-charts';

D.Inject(
3D

: {
:

 Does Not Appear

 inject:


3D
 '@syncfusion/ej2-charts';

D.Inject(
3D

 {
:

 Does Not Work

:


:

:

 chart is not covered by another element.
 events are not disabled.
 host has usable dimensions.
 interaction is supported by the selected environment.
 application event handler prevents the interaction.

 Columns Are Clipped

 primary Y-axis maximum:


: {
:
0,
:
60,
:
10
 data contains values above 60, increase the maximum or allow automatic range calculation.

 Overlap


: {
Type:
Category',
Rotation:
45
:

 chart width.
ucing the number of categories.
ening category labels.
ucing rotation and tilt.
 chart height.

 Is Initialized in a Hidden Container

 parent becomes visible:


();
 parents include:

.
s.
ions.
apsedstomTheme'
```

Use a theme supported by the installed `Chart3DTheme` model.

### Extreme Rotation and Tilt

Avoid initial settings that hide data or make labels unreadable.

Use moderate values:

```typescript
rotation:
    7,

tilt:
    10,

depth:
    100
```

and validate the actual rendered result.

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

Avoid creating multiple Chart3D instances for the same host without cleanup.

Correct:

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
data-lexical-text
Editor-generated class names
Encoded executable HTML
Malformed script elements
Rich-text URL wrappers
```