# Getting Started with Syncfusion HeatMap

- #overview
- #installation-and-package-setup
  - #typescript-installation
  - #javascript-cdn-setup
  - #local-script-setup
- #project-structure
- #typescript-setup
  - #create-the-html-container
  - #import-and-inject-modules
  - #create-the-typescript-heatmap
- #javascript-setup
  - #using-the-consolidated-bundle
  - #using-individual-package-scripts
  - #create-the-javascript-heatmap
- #data-and-axis-configuration
- #module-injection
- #common-initialization-patterns
- #complete-typescript-example
- #complete-javascript-example
- #running-the-application
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Overview

The Syncfusion Essential JS 2 HeatMap displays two-dimensional data as a matrix of color-coded cells. It helps users identify patterns, trends, clusters, high values, low values, and relationships across rows and columns.

Use HeatMap for:

- Performance matrices.
- Sales and revenue comparisons.
- Resource utilization.
- Attendance analysis.
- Risk assessment.
- Correlation matrices.
- Calendar-style activity data.
- Temperature and weather analysis.
- Operational monitoring.
- Large two-dimensional datasets.

The HeatMap is available through the `@syncfusion/ej2-heatmap` package. Its required dependencies include `@syncfusion/ej2-base`, `@syncfusion/ej2-data`, and `@syncfusion/ej2-svg-base`.

## Installation and Package Setup

### TypeScript Installation

Install the HeatMap package through npm:

```bash
npm install @syncfusion/ej2-heatmap
```

The package manager installs the required transitive dependencies automatically.

Do not install every dependency separately unless the project has a specific dependency-management requirement.

Keep all Syncfusion packages on compatible versions to prevent dependency conflicts.

### TypeScript Import

Import the HeatMap class:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';
```

Import and inject only the feature modules used by the HeatMap.

For a HeatMap with a legend and tooltip:

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

### JavaScript CDN Setup

JavaScript applications can load the HeatMap through either:

```text
1. The consolidated EJ2 bundle.
2. Individual package scripts.
```

Choose only one approach. Do not load the consolidated bundle together with individual package scripts.

For version `33.2.3`, the documented individual-script dependency order is:

```text
1. ej2-base
2. ej2-data
3. ej2-svg-base
4. ej2-heatmap
5. Application script
```

The global scripts register the HeatMap constructor as `ej.heatmap.HeatMap`.

## Project Structure

A basic TypeScript application can use:

```text
heatmap-app/
|-- src/
|   |-- app/
|   |   |-- app.ts
|   |-- index.html
|-- package.json
|-- tsconfig.json
|-- webpack.config.js
```

File responsibilities:

```text
src/index.html    -> Contains the HeatMap host element.
src/app/app.ts    -> Imports modules and creates the HeatMap.
package.json      -> Contains dependencies and npm scripts.
tsconfig.json     -> Contains TypeScript compiler settings.
webpack.config.js -> Bundles and serves the application.
```

A global JavaScript application can use:

```text
heatmap-app/
|-- index.html
|-- index.js
```

## TypeScript Setup

### Create the HTML Container

Add a host element to the HTML page:

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
</head>
<body>
    <div id="heatmap"></div>
</body>
</html>
```

The element ID must match the selector passed to `appendTo`:

```typescript
heatmap.appendTo('#heatmap');
```

### Optional Container Styling

```css
#heatmap {
    width: 100%;
    min-height: 400px;
}
```

The component can also receive explicit dimensions through its configuration:

```typescript
width: '100%',
height: '400px'
```

### Import and Inject Modules

For a HeatMap containing a tooltip and legend:

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

Module responsibilities:

```text
HeatMap -> Creates and manages the HeatMap.
Legend  -> Displays the relationship between values and colors.
Tooltip -> Displays cell information during pointer interaction.
Adaptor -> Transforms supported object-based data into HeatMap data.
```

Do not inject `Adaptor` for a simple two-dimensional numeric array.

### Create the TypeScript HeatMap

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

const heatmapData: number[][] = [
    [73, 39, 26, 39, 94, 0],
    [93, 58, 53, 38, 26, 68],
    [99, 28, 22, 4, 66, 90]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '400px',

        dataSource: heatmapData,

        xAxis: {
            labels: [
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013'
            ]
        },

        yAxis: {
            labels: [
                'USA',
                'Germany',
                'England'
            ]
        },

        titleSettings: {
            text: 'GDP Growth Rate',

            textStyle: {
                size: '15px'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        showTooltip: true
    });

heatmap.appendTo('#heatmap');
```

## JavaScript Setup

The global HeatMap constructor is:

```javascript
ej.heatmap.HeatMap
```

No TypeScript imports or explicit feature-module injection calls are normally required when the complete global package script is used.

### Using the Consolidated Bundle

Use the consolidated bundle when the page uses multiple Syncfusion components or when loading one larger EJ2 script is acceptable.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not add the following individual scripts when the consolidated bundle is already loaded:

```text
ej2-base.min.js
ej2-data.min.js
ej2-svg-base.min.js
ej2-heatmap.min.js
```

### Consolidated Bundle HTML

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

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
</head>
<body>
    <div id="heatmap"></div>

    <script src="index.js"></script>
</body>
</html>
```

### Using Individual Package Scripts

Use individual package scripts when the application requires only the HeatMap-related packages.

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

These scripts and their order match the documented HeatMap global JavaScript setup for version `33.2.3`.

### Complete Individual-Script HTML

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
</head>
<body>
    <div id="heatmap"></div>

    <script src="index.js"></script>
</body>
</html>
```

### Local Script Setup

Use local copies of the same package scripts:

```text
heatmap-app/
|-- resources/
|   |-- scripts/
|       |-- ej2-base.min.js
|       |-- ej2-data.min.js
|       |-- ej2-svg-base.min.js
|       |-- ej2-heatmap.min.js
|-- index.html
|-- index.js
```

Load them in dependency order:

```html
<script src="resources/scripts/ej2-base.min.js"></script>

<script src="resources/scripts/ej2-data.min.js"></script>

<script src="resources/scripts/ej2-svg-base.min.js"></script>

<script src="resources/scripts/ej2-heatmap.min.js"></script>

<script src="index.js"></script>
```

Use scripts from the same Essential JS 2 release.

### Create the JavaScript HeatMap

File: `index.js`

```javascript
var heatmapData = [
    [73, 39, 26, 39, 94, 0],
    [93, 58, 53, 38, 26, 68],
    [99, 28, 22, 4, 66, 90]
];

var heatmap =
    new ej.heatmap.HeatMap({
        width: '100%',
        height: '400px',

        dataSource: heatmapData,

        xAxis: {
            labels: [
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013'
            ]
        },

        yAxis: {
            labels: [
                'USA',
                'Germany',
                'England'
            ]
        },

        titleSettings: {
            text: 'GDP Growth Rate',

            textStyle: {
                size: '15px'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        showTooltip: true
    });

heatmap.appendTo('#heatmap');
```

## Data and Axis Configuration

### Two-Dimensional Array

A basic HeatMap data source can be a two-dimensional array:

```typescript
const heatmapData: number[][] = [
    [1, 2, 3],
    [4, 5, 6]
];
```

Each inner array represents a row.

```text
First row  -> [1, 2, 3]
Second row -> [4, 5, 6]
```

The number of x-axis labels should match the number of columns:

```typescript
xAxis: {
    labels: [
        'A',
        'B',
        'C'
    ]
}
```

The number of y-axis labels should match the number of rows:

```typescript
yAxis: {
    labels: [
        'X',
        'Y'
    ]
}
```

Complete configuration:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [1, 2, 3],
            [4, 5, 6]
        ],

        xAxis: {
            labels: [
                'A',
                'B',
                'C'
            ]
        },

        yAxis: {
            labels: [
                'X',
                'Y'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### Data Shape Validation

For this data:

```typescript
dataSource: [
    [1, 2, 3],
    [4, 5, 6]
]
```

use:

```text
3 x-axis labels
2 y-axis labels
```

A mismatched label count can produce incorrect or incomplete axis labeling.

## Module Injection

### Legend

Import and inject `Legend` when the legend is visible.

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);
```

Configuration:

```typescript
legendSettings: {
    visible: true,
    position: 'Bottom'
}
```

### Tooltip

Import and inject `Tooltip` when tooltips are enabled.

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

Customize tooltip content through `tooltipRender`:

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
                args.yLabel +
                ' | ' +
                args.xLabel +
                ' : ' +
                args.value
            ];
        },

        dataSource: [
            [1, 2, 3],
            [4, 5, 6]
        ],

        xAxis: {
            labels: [
                'A',
                'B',
                'C'
            ]
        },

        yAxis: {
            labels: [
                'X',
                'Y'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

Do not configure only `tooltipRender` while leaving the tooltip disabled.

### Adaptor

Import and inject `Adaptor` when the data requires adaptor-based transformation.

```typescript
import {
    HeatMap,
    Adaptor
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Adaptor);
```

Do not inject `Adaptor` for ordinary matrix data unless it is actually required by the selected data-binding configuration.

### Complete Feature Injection

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

Use this complete set only when all three features are used.

## Common Initialization Patterns

### Pattern 1: Simple Matrix

Use this pattern for a basic data matrix:

```typescript
import {
    HeatMap
} from '@syncfusion/ej2-heatmap';

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [1, 2, 3],
            [4, 5, 6]
        ],

        xAxis: {
            labels: [
                'A',
                'B',
                'C'
            ]
        },

        yAxis: {
            labels: [
                'X',
                'Y'
            ]
        }
    });

heatmap.appendTo('#heatmap');
```

### Pattern 2: HeatMap with Tooltip

```typescript
import {
    HeatMap,
    Tooltip,
    ITooltipEventArgs
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Tooltip);

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [1, 2, 3],
            [4, 5, 6]
        ],

        xAxis: {
            labels: [
                'A',
                'B',
                'C'
            ]
        },

        yAxis: {
            labels: [
                'X',
                'Y'
            ]
        },

        showTooltip: true,

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
    });

heatmap.appendTo('#heatmap');
```

### Pattern 3: HeatMap with Legend

```typescript
import {
    HeatMap,
    Legend
} from '@syncfusion/ej2-heatmap';

HeatMap.Inject(Legend);

const heatmap: HeatMap =
    new HeatMap({
        dataSource: [
            [1, 2, 3],
            [4, 5, 6]
        ],

        legendSettings: {
            visible: true,
            position: 'Bottom'
        }
    });

heatmap.appendTo('#heatmap');
```

### Pattern 4: Responsive HeatMap

```typescript
const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: [
            [1, 2, 3],
            [4, 5, 6]
        ]
    });

heatmap.appendTo('#heatmap');
```

Required CSS:

```css
.heatmap-wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
}

#heatmap {
    width: 100%;
    min-height: 450px;
}
```

Required HTML:

```html
<div class="heatmap-wrapper">
    <div id="heatmap"></div>
</div>
```

## Complete TypeScript Example

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
    [99, 28, 22, 4, 66, 90]
];

const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',

        dataSource: heatmapData,

        xAxis: {
            labels: [
                '2008',
                '2009',
                '2010',
                '2011',
                '2012',
                '2013'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                size: '12px',
                color: '#333333'
            }
        },

        yAxis: {
            labels: [
                'USA',
                'Germany',
                'England'
            ],

            textStyle: {
                fontFamily: 'Segoe UI',
                size: '12px',
                color: '#333333'
            }
        },

        titleSettings: {
            text: 'GDP Growth Rate',

            textStyle: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '16px',
                color: '#1a1a1a'
            }
        },

        legendSettings: {
            visible: true,
            position: 'Bottom'
        },

        showTooltip: true,

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
    });

heatmap.appendTo('#heatmap');
```

### Expected Behavior

```text
1. The HeatMap renders three rows and six columns.
2. The x-axis displays the six year labels.
3. The y-axis displays the three country labels.
4. Every numeric value is represented by a colored cell.
5. The legend explains the value-to-color relationship.
6. Hovering a cell displays its row, column, and value.
7. The title appears above the HeatMap.
8. The HeatMap uses the available wrapper width.
```

## Complete JavaScript Example

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
            [99, 28, 22, 4, 66, 90]
        ];

        var heatmap =
            new ej.heatmap.HeatMap({
                width: '100%',
                height: '450px',

                dataSource: heatmapData,

                xAxis: {
                    labels: [
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013'
                    ],

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        size: '12px',
                        color: '#333333'
                    }
                },

                yAxis: {
                    labels: [
                        'USA',
                        'Germany',
                        'England'
                    ],

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        size: '12px',
                        color: '#333333'
                    }
                },

                titleSettings: {
                    text: 'GDP Growth Rate',

                    textStyle: {
                        fontFamily: 'Segoe UI',
                        fontWeight: '600',
                        size: '16px',
                        color: '#1a1a1a'
                    }
                },

                legendSettings: {
                    visible: true,
                    position: 'Bottom'
                },

                showTooltip: true,

                tooltipRender: function (args) {
                    args.content = [
                        args.yLabel +
                        ' | ' +
                        args.xLabel +
                        ' : ' +
                        args.value
                    ];
                }
            });

        heatmap.appendTo('#heatmap');
    </script>
</body>
</html>
```

## Running the Application

### TypeScript

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Start the development server using the script defined in `package.json`.

Common commands include:

```bash
npm run start
```

or:

```bash
npm start
```

The exact URL and port depend on the project configuration.

### JavaScript

Serve the application through a local HTTP server.

Using Python:

```bash
python -m http.server 8000
```

Using Node.js:

```bash
npx http-server
```

Open the address returned by the selected server.

A local server is preferred over directly opening the HTML file because browser security restrictions can affect scripts, modules, and data requests.

## Runtime Validation Checklist

```text
✅ @syncfusion/ej2-heatmap is installed for TypeScript.
✅ HeatMap is imported.
✅ Legend is imported and injected when the legend is visible.
✅ Tooltip is imported and injected when tooltips are enabled.
✅ Adaptor is imported and injected only when adaptor data binding is used.
✅ Every injected module is imported.
✅ The global scripts use the same EJ2 version.
✅ The individual scripts load in dependency order.
✅ The consolidated bundle is not combined with individual scripts.
✅ The HeatMap script loads before the application script.
✅ The global constructor is ej.heatmap.HeatMap.
✅ The HeatMap host element exists.
✅ The appendTo selector matches the host ID.
✅ heatmap.appendTo('#heatmap') is called.
✅ The data source is a valid two-dimensional array.
✅ Every row contains the intended number of columns.
✅ The x-axis label count matches the number of columns.
✅ The y-axis label count matches the number of rows.
✅ showTooltip is true when tooltipRender is used.
✅ The tooltip content handles row labels, column labels, and values.
✅ The HeatMap has measurable width and height.
✅ Executable HTML uses actual elements instead of HTML entities.
✅ No editor-generated anchor elements exist inside script URLs.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Encoded HTML

Incorrect executable HTML:

```html
&lt;div id="heatmap"&gt;&lt;/div&gt;
```

Correct:

```html
<div id="heatmap"></div>
```

### Editor-Generated CDN Link

Incorrect:

```html
...</a>"></script>
```

Correct:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>
```

### Unnecessary CSS Reference

A basic global HeatMap setup requires the documented global scripts. Do not add an unrelated `ej2-base` theme stylesheet merely because other EJ2 controls require CSS themes.

Add external styles only when they are required by the specific HeatMap design or application layout.

### Incorrect Script Dependencies

Incomplete:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>
```

Correct individual-script setup:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"
></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>
```

The documented HeatMap dependencies are `ej2-base`, `ej2-data`, and `ej2-svg-base`.

### Combining Consolidated and Individual Scripts

Incorrect:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>
```

Use either the consolidated bundle or the individual package scripts, not both.

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

### Missing Host Element

Incorrect:

```typescript
heatmap.appendTo('#heatmap');
```

when the HTML does not contain:

```html
<div id="heatmap"></div>
```

### Missing Tooltip Enablement

Incorrect:

```typescript
HeatMap.Inject(Tooltip);

const heatmap: HeatMap =
    new HeatMap({
        tooltipRender: (args) => {
            args.content = [
                String(args.value)
            ];
        }
    });
```

Correct:

```typescript
HeatMap.Inject(Tooltip);

const heatmap: HeatMap =
    new HeatMap({
        showTooltip: true,

        tooltipRender: (args) => {
            args.content = [
                String(args.value)
            ];
        }
    });
```

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

HeatMap.Inject(Legend);
```

### Unnecessary Adaptor Injection

Avoid:

```typescript
HeatMap.Inject(
    Adaptor
);
```

when the data source is only:

```typescript
dataSource: [
    [1, 2, 3],
    [4, 5, 6]
]
```

Inject `Adaptor` only for the data-binding approach that requires it.

### Mismatched Axis Labels

Incorrect:

```typescript
dataSource: [
    [1, 2, 3],
    [4, 5, 6]
],

xAxis: {
    labels: [
        'A',
        'B'
    ]
},

yAxis: {
    labels: [
        'X',
        'Y',
        'Z'
    ]
}
```

Correct:

```typescript
dataSource: [
    [1, 2, 3],
    [4, 5, 6]
],

xAxis: {
    labels: [
        'A',
        'B',
        'C'
    ]
},

yAxis: {
    labels: [
        'X',
        'Y'
    ]
}
```

### Unequal Row Lengths

Avoid:

```typescript
dataSource: [
    [1, 2, 3],
    [4, 5]
]
```

Preferred:

```typescript
dataSource: [
    [1, 2, 3],
    [4, 5, 6]
]
```

Validate irregular data according to the selected HeatMap data-binding mode before rendering.

### Missing Size

A HeatMap may not render as intended when neither the component nor its container has a measurable height.

Preferred:

```typescript
const heatmap: HeatMap =
    new HeatMap({
        width: '100%',
        height: '450px',
        dataSource: data
    });
```

### Loading Application Code Too Early

Incorrect:

```html
<script src="index.js"></script>

<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>
```

Correct:

```html
<script
    src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-heatmap/dist/global/ej2-heatmap.min.js"
></script>

<script src="index.js"></script>
```

### Mixing EJ1 and EJ2

Do not use the older EJ1 initialization pattern:

```javascript
$('#heatmap').ejHeatMap({
    // EJ1 configuration
});
```

Use the EJ2 constructor:

```javascript
var heatmap =
    new ej.heatmap.HeatMap({
        // EJ2 configuration
    });

heatmap.appendTo('#heatmap');
```