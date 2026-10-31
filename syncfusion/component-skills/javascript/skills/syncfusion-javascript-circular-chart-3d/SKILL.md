---
name: syncfusion-javascript-circular-chart-3d
description: Create interactive 3D circular charts (Pie, Doughnut) in Syncfusion TypeScript and JavaScript. ALWAYS use this skill when the user needs to implement 3D pie charts, 3D doughnut charts, 3D circular visualizations, data labels, legends, tooltips, or any 3D circular chart features. Immediately helpful for chart setup, data binding, customization, styling, export, and accessibility. Works with TypeScript (webpack/module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing 3D Circular Charts in Syncfusion TypeScript & JavaScript

The Syncfusion Essential JS 2 3D Circular Chart visualizes part-to-whole data as three-dimensional pie and doughnut charts.

Use this skill to create, configure, customize, update, export, print, and troubleshoot the `CircularChart3D` component in TypeScript and global JavaScript applications.

This skill prioritizes:

- Complete, runnable examples.
- Correct feature-module injection.
- Correct data-field mapping.
- Separate TypeScript and JavaScript implementations.
- Runtime-safe DOM access.
- Explicit chart-to-container attachment.
- Clear guidance about when each feature should be used.
- Prevention of unsupported properties and incomplete configurations.

## Platform Support

### TypeScript

Use TypeScript when the application uses:

- The `@syncfusion/ej2-charts` npm package.
- TypeScript compilation.
- Webpack, Vite, or another module bundler.
- Strongly typed data models.
- Explicit feature-module injection.
- IDE-based type validation.

TypeScript imports the required chart classes and modules from:

```typescript
@syncfusion/ej2-charts
```

Each enabled feature must be imported and injected before the chart instance is created.

Example:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);
```

### JavaScript

Use global JavaScript when the application uses:

- CDN scripts.
- Locally stored EJ2 global scripts.
- The global `ej` namespace.
- Traditional HTML and JavaScript files.
- No TypeScript compilation or bundling.

The 3D Circular Chart constructor is available through:

```javascript
ej.charts.CircularChart3D
```

The global EJ2 chart bundle includes the chart feature modules. Explicit `CircularChart3D.Inject(...)` calls are generally unnecessary when using the complete global bundle.

### Browser Language Level

The examples use syntax that is compatible with modern browsers.

When strict ES5 compatibility is required:

- Use `var` instead of `const` and `let`.
- Use traditional functions instead of arrow functions.
- Avoid optional chaining.
- Avoid object spread syntax.
- Transpile modern syntax when necessary.

## When to Use This Skill

Use this skill when the task requires any of the following:

- Creating a basic 3D pie chart.
- Creating a 3D doughnut chart.
- Switching between pie and doughnut presentations.
- Binding local or dynamically updated data.
- Mapping category and numeric fields.
- Configuring chart dimensions.
- Adding titles and subtitles.
- Controlling tilt, rotation, depth, or interactive rotation.
- Enabling and formatting data labels.
- Positioning labels inside or outside segments.
- Customizing connector lines.
- Mapping custom data-label text.
- Handling empty or missing point values.
- Configuring legends.
- Enabling and formatting tooltips.
- Applying templates.
- Selecting themes and colors.
- Enabling RTL layout.
- Configuring animation.
- Improving chart accessibility.
- Exporting the chart.
- Printing the chart.
- Handling chart events.
- Updating chart properties at runtime.

## Implementation Rules

### Rule 1: Validate Imports Before Generating TypeScript

Determine every feature enabled in the chart before writing the import statement.

Feature-to-module mapping:

```text
3D pie or doughnut series -> PieSeries3D
Data labels               -> CircularChartDataLabel3D
Legend                    -> CircularChartLegend3D
Tooltip                   -> CircularChartTooltip3D
Export                     -> CircularChartExport3D
```

If a feature appears in the chart configuration, its corresponding module must be imported and injected.

### Rule 2: Inject Modules Before Creating the Chart

Correct:

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

const chart: CircularChart3D = new CircularChart3D({
    // Configuration
});
```

Incorrect:

```typescript
const chart: CircularChart3D = new CircularChart3D({
    // Configuration
});

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);
```

### Rule 3: Keep Imports and Injection Synchronized

Every injected module must be imported.

Every imported feature module should be injected when that feature is used.

Correct:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);
```

### Rule 4: Use Explicit DOM Attachment

Create the chart first and then call `appendTo`.

```typescript
const chart: CircularChart3D = new CircularChart3D({
    // Configuration
});

chart.appendTo('#chart');
```

Use the same pattern in JavaScript:

```javascript
var chart = new ej.charts.CircularChart3D({
    // Configuration
});

chart.appendTo('#chart');
```

### Rule 5: Ensure the Host Element Exists

Required HTML:

```html
<div id="chart"></div>
```

Required attachment:

```typescript
chart.appendTo('#chart');
```

The selector must match the host element ID exactly.

### Rule 6: Keep Data Mapping Synchronized

For this data:

```typescript
const data = [
    {
        browser: 'Chrome',
        share: 62.92
    }
];
```

Use:

```typescript
series: [{
    dataSource: data,
    xName: 'browser',
    yName: 'share'
}]
```

Do not use:

```typescript
xName: 'x',
yName: 'y'
```

unless the data objects actually contain `x` and `y` properties.

### Rule 7: Use `subTitle`, Not `subtitle`

Correct:

```typescript
subTitle: '2023'
```

Incorrect:

```typescript
subtitle: '2023'
```

### Rule 8: Use Full Examples

A runnable TypeScript example should include:

```text
Imports
Module injection
Typed data
Chart configuration
appendTo call
Required HTML host
```

A runnable global JavaScript example should include:

```text
Valid script references
Data
Chart configuration
appendTo call
Required HTML host
```

## Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

Use this reference for:

- Package installation.
- TypeScript project setup.
- Global JavaScript setup.
- CDN and local script loading.
- HTML host creation.
- Initial chart configuration.
- Module injection.
- Chart startup and testing.
- Common initialization errors.

### Pie and Doughnut Charts

📄 **Read:** [references/pie-and-doughnut-charts.md](references/pie-and-doughnut-charts.md)

Use this reference for:

- Pie chart fundamentals.
- Doughnut chart configuration.
- `innerRadius` behavior.
- Outer-radius customization.
- Various-radius charts.
- Runtime pie-to-doughnut switching.
- Segment colors.
- Segment explosion.
- Series opacity.
- Pie versus doughnut selection guidance.

### Data Labels

📄 **Read:** [references/data-labels.md](references/data-labels.md)

Use this reference for:

- Enabling data labels.
- Required data-label module injection.
- Inside and outside label positions.
- Label background, border, and font.
- Connector lines.
- Label templates.
- Text mapping through `name`.
- Number and text formatting.
- Label rotation.
- Dynamic customization through `textRender`.

### Legends, Tooltips and Titles

📄 **Read:** [references/legends-tooltips-and-titles.md](references/legends-tooltips-and-titles.md)

Use this reference for:

- Legend module injection.
- Legend visibility.
- Legend position and alignment.
- Legend appearance and dimensions.
- Legend interaction.
- Tooltip module injection.
- Tooltip format and templates.
- Tooltip appearance and animation.
- Title and subtitle configuration.
- Title, subtitle, legend, and tooltip text styles.
- Legend and tooltip events.

### Styling, Customization and Export

📄 **Read:** [references/styling-customization-and-export.md](references/styling-customization-and-export.md)

Use this reference for:

- Tilt, rotation, and depth.
- Interactive rotation.
- Built-in themes.
- Series palettes.
- Data-driven point colors.
- Chart background and border.
- RTL support.
- Series animation.
- Image export.
- PDF export.
- Print behavior.
- Export and print validation.

### Empty Points and Accessibility

📄 **Read:** [references/empty-points-and-accessibility.md](references/empty-points-and-accessibility.md)

Use this reference for:

- Empty values.
- Gap, Drop, Zero, and Average modes.
- Empty-point fill and border.
- Runtime mode switching.
- Chart accessibility settings.
- Series accessibility settings.
- Keyboard focus.
- Accessible descriptions.
- Alternative data tables.
- Screen-reader testing.
- Text and non-text contrast.
- Avoiding color-only communication.

## Quick Start

## TypeScript Quick Start

### Required HTML

```html
<div id="chart"></div>
```

### Complete TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 62.92
    },
    {
        browser: 'Firefox',
        share: 15.23
    },
    {
        browser: 'Safari',
        share: 19.97
    },
    {
        browser: 'Others',
        share: 2.88
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    subTitle: '2023',
    tilt: -45,
    rotation: 0,
    depth: 50,

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y:n2}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        radius: '80%',
        innerRadius: '0%',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#chart');
```

### Runtime Behavior

```text
1. PieSeries3D renders a solid 3D pie.
2. The browser field supplies category names.
3. The share field controls segment angles.
4. CircularChartDataLabel3D renders outside labels.
5. CircularChartLegend3D renders the legend.
6. CircularChartTooltip3D renders hover information.
7. The title and subtitle describe the visualization.
8. appendTo attaches the chart to the HTML host.
```

## JavaScript Quick Start

### Complete CDN HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>3D Circular Chart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
</head>
<body>
    <div id="chart"></div>

    <script src="index.js"></script>
</body>
</html>
```

### Complete JavaScript

```javascript
var data = [
    {
        browser: 'Chrome',
        share: 62.92
    },
    {
        browser: 'Firefox',
        share: 15.23
    },
    {
        browser: 'Safari',
        share: 19.97
    },
    {
        browser: 'Others',
        share: 2.88
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Browser Market Share',
    subTitle: '2023',
    tilt: -45,
    rotation: 0,
    depth: 50,

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y:n2}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        radius: '80%',
        innerRadius: '0%',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'browser',

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#chart');
```

### Script Loading Requirements

Load the application script after the Syncfusion scripts.

Correct order:

```text
1. ej2-base
2. ej2-data
3. ej2-svg-base
4. ej2-charts
5. index.js
```

If `index.js` loads before the Syncfusion chart script, the global `ej` namespace may be unavailable.

## Common Patterns

## Pattern 1: Basic Pie Chart with Legend

### Purpose

Use this pattern for a simple part-to-whole visualization with category identification through a legend.

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);

interface CategoryData {
    category: string;
    value: number;
}

const data: CategoryData[] = [
    {
        category: 'Category A',
        value: 35
    },
    {
        category: 'Category B',
        value: 40
    },
    {
        category: 'Category C',
        value: 25
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Category Distribution',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        innerRadius: '0%'
    }]
});

chart.appendTo('#chart');
```

### JavaScript

```javascript
var data = [
    {
        category: 'Category A',
        value: 35
    },
    {
        category: 'Category B',
        value: 40
    },
    {
        category: 'Category C',
        value: 25
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Category Distribution',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        innerRadius: '0%'
    }]
});

chart.appendTo('#chart');
```

## Pattern 2: Doughnut Chart

### Purpose

A doughnut chart uses `PieSeries3D` with an `innerRadius` greater than `0%`.

No separate doughnut-series module is required.

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    {
        category: 'Hardware',
        value: 35
    },
    {
        category: 'Software',
        value: 45
    },
    {
        category: 'Services',
        value: 20
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    subTitle: 'Doughnut View',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}</b>'
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '80%',
        innerRadius: '40%'
    }]
});

chart.appendTo('#chart');
```

### JavaScript

```javascript
var data = [
    {
        category: 'Hardware',
        value: 35
    },
    {
        category: 'Software',
        value: 45
    },
    {
        category: 'Services',
        value: 20
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    subTitle: 'Doughnut View',
    tilt: -45,

    legendSettings: {
        visible: true,
        position: 'Right'
    },

    tooltip: {
        enable: true,
        format: '${point.x}: <b>${point.y}</b>'
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '80%',
        innerRadius: '40%'
    }]
});

chart.appendTo('#chart');
```

### Pie and Doughnut Rule

```text
innerRadius: '0%'  -> Pie
innerRadius: '40%' -> Doughnut
```

## Pattern 3: Outside Data Labels

### Purpose

Use outside labels when:

- Segments are small.
- Category names are long.
- Inside text has insufficient contrast.
- A doughnut has a large center opening.
- Maximum label readability is required.

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    {
        category: 'North America',
        value: 45
    },
    {
        category: 'Europe',
        value: 30
    },
    {
        category: 'Asia Pacific',
        value: 20
    },
    {
        category: 'Other Regions',
        value: 5
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Regional Sales',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '75%',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'category',

            connectorStyle: {
                length: '40px',
                width: 2,
                color: '#666666'
            },

            font: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#333333'
            }
        }
    }]
});

chart.appendTo('#chart');
```

### JavaScript

```javascript
var data = [
    {
        category: 'North America',
        value: 45
    },
    {
        category: 'Europe',
        value: 30
    },
    {
        category: 'Asia Pacific',
        value: 20
    },
    {
        category: 'Other Regions',
        value: 5
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '500px',
    title: 'Regional Sales',
    tilt: -45,

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',
        radius: '75%',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'category',

            connectorStyle: {
                length: '40px',
                width: 2,
                color: '#666666'
            },

            font: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#333333'
            }
        }
    }]
});

chart.appendTo('#chart');
```

## Pattern 4: Tooltip-Enabled Chart

### Purpose

Use tooltips when exact values should appear during pointer interaction without permanently occupying chart space.

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);

interface BrowserData {
    browser: string;
    share: number;
}

const data: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 62.92
    },
    {
        browser: 'Firefox',
        share: 15.23
    },
    {
        browser: 'Safari',
        share: 19.97
    },
    {
        browser: 'Others',
        share: 2.88
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,

    tooltip: {
        enable: true,
        header: 'Market Share',
        format: '${point.x}: <b>${point.y:n2}%</b>'
    },

    series: [{
        name: 'Browser Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share'
    }]
});

chart.appendTo('#chart');
```

### JavaScript

```javascript
var data = [
    {
        browser: 'Chrome',
        share: 62.92
    },
    {
        browser: 'Firefox',
        share: 15.23
    },
    {
        browser: 'Safari',
        share: 19.97
    },
    {
        browser: 'Others',
        share: 2.88
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share',
    tilt: -45,

    tooltip: {
        enable: true,
        header: 'Market Share',
        format: '${point.x}: <b>${point.y:n2}%</b>'
    },

    series: [{
        name: 'Browser Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share'
    }]
});

chart.appendTo('#chart');
```

## Pattern 5: Point Selection and Highlight

### Purpose

Use selection when users must keep a point visually selected.

Use highlighting when users need temporary emphasis during interaction.

Required modules must be validated against the selected mode and installed EJ2 version before implementation.

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartSelection3D,
    CircularChartHighlight3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartSelection3D,
    CircularChartHighlight3D
);

interface CategoryData {
    category: string;
    value: number;
}

const data: CategoryData[] = [
    {
        category: 'Category A',
        value: 40
    },
    {
        category: 'Category B',
        value: 35
    },
    {
        category: 'Category C',
        value: 25
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Interactive Distribution',
    tilt: -45,
    selectionMode: 'Point',
    highlightMode: 'Point',

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#chart');
```

### JavaScript

```javascript
var data = [
    {
        category: 'Category A',
        value: 40
    },
    {
        category: 'Category B',
        value: 35
    },
    {
        category: 'Category C',
        value: 25
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Interactive Distribution',
    tilt: -45,
    selectionMode: 'Point',
    highlightMode: 'Point',

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#chart');
```

Do not assume that `Series` is a valid selection or highlight mode for the 3D Circular Chart unless the installed API explicitly supports it.

## Pattern 6: Runtime Data Update

### Required HTML

```html
<button id="updateButton" type="button">
    Update Data
</button>

<div id="chart"></div>
```

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);

interface SalesData {
    category: string;
    value: number;
}

const initialData: SalesData[] = [
    {
        category: 'Hardware',
        value: 35
    },
    {
        category: 'Software',
        value: 45
    },
    {
        category: 'Services',
        value: 20
    }
];

const updatedData: SalesData[] = [
    {
        category: 'Hardware',
        value: 30
    },
    {
        category: 'Software',
        value: 50
    },
    {
        category: 'Services',
        value: 20
    }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,

    series: [{
        dataSource: initialData,
        xName: 'category',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'category'
        }
    }]
});

chart.appendTo('#chart');

const updateButton: HTMLElement | null =
    document.getElementById('updateButton');

if (updateButton) {
    updateButton.addEventListener('click', (): void => {
        chart.series[0].dataSource = updatedData;
        chart.refresh();
    });
}
```

### JavaScript

```javascript
var initialData = [
    {
        category: 'Hardware',
        value: 35
    },
    {
        category: 'Software',
        value: 45
    },
    {
        category: 'Services',
        value: 20
    }
];

var updatedData = [
    {
        category: 'Hardware',
        value: 30
    },
    {
        category: 'Software',
        value: 50
    },
    {
        category: 'Services',
        value: 20
    }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Sales Distribution',
    tilt: -45,

    series: [{
        dataSource: initialData,
        xName: 'category',
        yName: 'value',

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'category'
        }
    }]
});

chart.appendTo('#chart');

var updateButton =
    document.getElementById('updateButton');

if (updateButton) {
    updateButton.addEventListener('click', function () {
        chart.series[0].dataSource = updatedData;
        chart.refresh();
    });
}
```

## Key Properties

## Chart-Level Properties

### `series`

Contains the series configurations.

```typescript
series: [{
    dataSource: data,
    xName: 'category',
    yName: 'value'
}]
```

### `width`

Controls chart width.

```typescript
width: '100%'
```

### `height`

Controls chart height.

```typescript
height: '500px'
```

### `title`

Sets the primary title.

```typescript
title: 'Browser Market Share'
```

### `subTitle`

Sets secondary title text.

```typescript
subTitle: '2023'
```

### `tilt`

Controls the vertical 3D viewing angle.

```typescript
tilt: -45
```

### `rotation`

Rotates the chart around its vertical axis.

```typescript
rotation: 30
```

### `depth`

Controls the 3D thickness.

```typescript
depth: 50
```

### `enableRotation`

Enables pointer-driven chart rotation.

```typescript
enableRotation: true
```

### `theme`

Applies a supported built-in theme.

```typescript
theme: 'Material'
```

### `background`

Sets the chart background.

```typescript
background: '#ffffff'
```

### `border`

Sets chart-border color and width.

```typescript
border: {
    width: 1,
    color: '#dddddd'
}
```

### `enableRtl`

Enables right-to-left layout behavior.

```typescript
enableRtl: true
```

### `enableAnimation`

Controls chart animation.

```typescript
enableAnimation: true
```

### `legendSettings`

Configures legend behavior and appearance.

```typescript
legendSettings: {
    visible: true,
    position: 'Right',
    alignment: 'Center'
}
```

### `tooltip`

Configures tooltip behavior and appearance.

```typescript
tooltip: {
    enable: true,
    format: '${point.x}: ${point.y}'
}
```

### `selectionMode`

Configures persistent point selection when the required selection module is available.

```typescript
selectionMode: 'Point'
```

### `highlightMode`

Configures temporary point highlighting when the required highlight module is available.

```typescript
highlightMode: 'Point'
```

### `accessibility`

Configures description, role, focusability, and tab order.

```typescript
accessibility: {
    accessibilityDescription:
        'Browser market share shown as a 3D pie chart.',
    accessibilityRole: 'region',
    focusable: true,
    tabIndex: 0
}
```

## Series-Level Properties

### `dataSource`

Supplies data objects.

```typescript
dataSource: data
```

### `xName`

Maps the category field.

```typescript
xName: 'browser'
```

### `yName`

Maps the numeric field.

```typescript
yName: 'share'
```

### `name`

Sets the series name.

```typescript
name: 'Market Share'
```

### `radius`

Controls the outer series size or maps a radius field.

Fixed radius:

```typescript
radius: '80%'
```

Mapped radius:

```typescript
radius: 'segmentRadius'
```

### `innerRadius`

Controls the center opening.

```typescript
innerRadius: '40%'
```

### `dataLabel`

Configures data labels.

```typescript
dataLabel: {
    visible: true,
    position: 'Outside'
}
```

### `palettes`

Supplies an ordered color collection.

```typescript
palettes: [
    '#0066cc',
    '#d83b01',
    '#107c10',
    '#5c2d91'
]
```

### `pointColorMapping`

Maps a color field from the data source.

```typescript
pointColorMapping: 'color'
```

### `opacity`

Controls series transparency.

```typescript
opacity: 0.9
```

### `explode`

Enables segment explosion.

```typescript
explode: true
```

### `explodeIndex`

Identifies the initially exploded point.

```typescript
explodeIndex: 0
```

### `explodeOffset`

Controls the exploded segment distance.

```typescript
explodeOffset: '20%'
```

### `emptyPointSettings`

Controls handling of `null` and `undefined` values.

```typescript
emptyPointSettings: {
    mode: 'Gap',
    fill: '#767676',
    border: {
        width: 1,
        color: '#333333'
    }
}
```

### `animation`

Configures series animation.

```typescript
animation: {
    enable: true,
    duration: 1000,
    delay: 0
}
```

## Data-Label Properties

### `visible`

Enables labels.

```typescript
visible: true
```

### `position`

Places labels inside or outside.

```typescript
position: 'Outside'
```

### `name`

Maps a data-source text field.

```typescript
name: 'labelText'
```

### `format`

Formats the resolved label value.

```typescript
format: 'n2'
```

Static-text example:

```typescript
format: '{value}%'
```

### `template`

Creates custom HTML content.

```typescript
template:
    '<div class="data-label-template">' +
    '<strong>${point.x}</strong><br>' +
    '<span>${point.y}</span>' +
    '</div>'
```

### `fill`

Sets the label background.

```typescript
fill: '#ffffff'
```

### `border`

Sets the label border.

```typescript
border: {
    width: 1,
    color: '#cccccc'
}
```

### `font`

Sets label text properties.

```typescript
font: {
    fontFamily: 'Segoe UI',
    fontWeight: '600',
    size: '12px',
    color: '#333333'
}
```

### `enableRotation`

Enables label rotation.

```typescript
enableRotation: true
```

### `angle`

Sets the label rotation angle.

```typescript
angle: 45
```

### `connectorStyle`

Configures outside-label connectors.

```typescript
connectorStyle: {
    length: '40px',
    width: 2,
    color: '#666666',
    dashArray: '5,3'
}
```

## Tooltip Properties

### `enable`

Enables tooltips.

```typescript
enable: true
```

### `header`

Sets tooltip heading text.

```typescript
header: 'Market Share'
```

### `format`

Defines simple tooltip content.

```typescript
format: '${point.x}: <b>${point.y}</b>'
```

### `template`

Defines custom tooltip HTML.

```typescript
template:
    '<div class="chart-tooltip">' +
    '<strong>${point.x}</strong><br>' +
    '<span>${point.y}</span>' +
    '</div>'
```

### `fill`

Sets tooltip background color.

```typescript
fill: '#252423'
```

### `opacity`

Sets tooltip transparency.

```typescript
opacity: 0.9
```

### `border`

Sets tooltip border.

```typescript
border: {
    width: 1,
    color: '#ffffff'
}
```

### `textStyle`

Sets tooltip text appearance.

```typescript
textStyle: {
    fontFamily: 'Segoe UI',
    size: '12px',
    color: '#ffffff'
}
```

### `enableAnimation`

Controls tooltip movement animation.

```typescript
enableAnimation: true
```

### `fadeOutDuration`

Controls fade-out duration.

```typescript
fadeOutDuration: 1000
```

## Events

Use events only when standard properties cannot provide the required behavior.

Common CircularChart3D events include:

```text
load
loaded
pointRender
seriesRender
textRender
legendRender
legendClick
tooltipRender
pointClick
pointMove
beforeResize
resized
beforePrint
beforeExport
afterExport
selectionComplete
```

### `load`

Use for pre-render initialization.

### `loaded`

Use after chart rendering completes.

### `pointRender`

Use to customize individual point rendering.

### `seriesRender`

Use to customize series rendering.

### `textRender`

Use to customize data-label text.

### `legendRender`

Use to customize legend items before rendering.

### `legendClick`

Use to respond to legend interaction.

### `tooltipRender`

Use to change tooltip content dynamically.

### `pointClick`

Use to respond to point selection through pointer interaction.

### `pointMove`

Use to respond to pointer movement over points.

### Event Guidance

Prefer:

```text
Static API property -> Static behavior
Event               -> Runtime conditional behavior
```

Example:

```text
Use dataLabel.font for one label style applied to all points.
Use textRender when label text changes conditionally by point.
```

## Complete TypeScript Feature Example

### Required HTML

```html
<div class="chart-actions">
    <button id="pieButton" type="button">
        Show Pie
    </button>

    <button id="doughnutButton" type="button">
        Show Doughnut
    </button>

    <button id="updateButton" type="button">
        Update Data
    </button>
</div>

<div id="chart"></div>
```

### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D,
    CircularChart3DTextRenderEventArgs
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);

interface BrowserData {
    browser: string;
    share: number;
    labelText: string;
    color: string;
}

const initialData: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 62.92,
        labelText: 'Chrome',
        color: '#0066cc'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        labelText: 'Firefox',
        color: '#d83b01'
    },
    {
        browser: 'Safari',
        share: 19.97,
        labelText: 'Safari',
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        labelText: 'Others',
        color: '#5c2d91'
    }
];

const updatedData: BrowserData[] = [
    {
        browser: 'Chrome',
        share: 60,
        labelText: 'Chrome',
        color: '#0066cc'
    },
    {
        browser: 'Firefox',
        share: 13,
        labelText: 'Firefox',
        color: '#d83b01'
    },
    {
        browser: 'Safari',
        share: 23,
        labelText: 'Safari',
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 4,
        labelText: 'Others',
        color: '#5c2d91'
    }
];

let activeData: BrowserData[] = initialData;

const calculateTotal = (): number => {
    return activeData.reduce(
        (
            sum: number,
            item: BrowserData
        ): number => sum + item.share,
        0
    );
};

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: 'Interactive 3D Circular Chart',
    theme: 'Material',
    background: '#ffffff',
    tilt: -45,
    rotation: 0,
    depth: 50,
    enableRotation: true,
    enableAnimation: true,

    accessibility: {
        accessibilityDescription:
            'Interactive browser market share shown as a ' +
            '3D circular chart.',
        accessibilityRole: 'region',
        focusable: true,
        tabIndex: 0
    },

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: 'Bold',
        size: '18px',
        color: '#1a1a1a'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: 'Normal',
        size: '14px',
        color: '#444444'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center',
        description: 'Browser market share categories',

        textStyle: {
            fontFamily: 'Segoe UI',
            size: '12px',
            color: '#1a1a1a'
        }
    },

    tooltip: {
        enable: true,
        header: 'Market Share',
        format: '${point.x}: <b>${point.y:n2}%</b>',
        fill: '#1a1a1a',
        opacity: 0.9,

        textStyle: {
            fontFamily: 'Segoe UI',
            size: '12px',
            color: '#ffffff'
        }
    },

    textRender: (
        args: CircularChart3DTextRenderEventArgs
    ): void => {
        if (
            args.point &&
            args.point.y !== undefined
        ) {
            const total: number = calculateTotal();
            const value: number = Number(args.point.y);

            const percentage: number =
                total === 0
                    ? 0
                    : value / total * 100;

            args.text =
                `${args.point.x}: ` +
                `${percentage.toFixed(1)}%`;
        }
    },

    series: [{
        name: 'Market Share',
        dataSource: activeData,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',
        radius: '75%',
        innerRadius: '0%',

        accessibility: {
            accessibilityDescription:
                'Browser market share data series.',
            accessibilityDescriptionFormat:
                '${point.x}: ${point.y} percent',
            accessibilityRole: 'region',
            focusable: true,
            tabIndex: 0
        },

        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        },

        emptyPointSettings: {
            mode: 'Gap',
            fill: '#767676',
            border: {
                width: 1,
                color: '#333333'
            }
        },

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'labelText',
            fill: '#ffffff',

            border: {
                width: 1,
                color: '#cccccc'
            },

            font: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#1a1a1a'
            },

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#chart');

document
    .getElementById('pieButton')
    ?.addEventListener('click', (): void => {
        chart[{
: 'Market Share',
Source: activeData,
Name: 'browser',
Name: 'share',
ColorMapping: 'color',
: '75%',
Radius: '0%',

: {
Description:
Browser market share data series.',
DescriptionFormat:
point.x}: ${point.y} percent',
Role: 'region',
able: true,
Index: 0
: {
: true,
: 1000,
: 0
PointSettings: {
: 'Gap',
: '#767676',
: {
: 1,
: '#333333'
Label: {
: true,
: 'Outside',
: 'labelText',
: '#ffffff',

: {
: 1,
: '#cccccc'
: {
Family: 'Segoe UI',
Weight: '600',
: '12px',
: '#1a1a1a'
Style: {
: '40px',
: 1,
: '#666666'
To('#chart')mplete JavaScript Feature Example

### Required HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Interactive 3D Circular Chart</title>

    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
</head>
<body>
    <div class="chart-actions">
        <button id="pieButton" type="button">
            Show Pie
        </button>

        <button id="doughnutButton" type="button">
            Show Doughnut
        </button>

        <button id="updateButton" type="button">
            Update Data
        </button>
    </div>

    <div id="chart"></div>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var initialData = [
    {
        browser: 'Chrome',
        share: 62.92,
        labelText: 'Chrome',
        color: '#0066cc'
    },
    {
        browser: 'Firefox',
        share: 15.23,
        labelText: 'Firefox',
        color: '#d83b01'
    },
    {
        browser: 'Safari',
        share: 19.97,
        labelText: 'Safari',
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 2.88,
        labelText: 'Others',
        color: '#5c2d91'
    }
];

var updatedData = [
    {
        browser: 'Chrome',
        share: 60,
        labelText: 'Chrome',
        color: '#0066cc'
    },
    {
        browser: 'Firefox',
        share: 13,
        labelText: 'Firefox',
        color: '#d83b01'
    },
    {
        browser: 'Safari',
        share: 23,
        labelText: 'Safari',
        color: '#107c10'
    },
    {
        browser: 'Others',
        share: 4,
        labelText: 'Others',
        color: '#5c2d91'
    }
];

var activeData = initialData;

function calculateTotal() {
    return activeData.reduce(function (sum, item) {
        return sum + item.share;
    }, 0);
}

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '550px',
    title: 'Browser Market Share',
    subTitle: 'Interactive 3D Circular Chart',
    theme: 'Material',
    background: '#ffffff',
    tilt: -45,
    rotation: 0,
    depth: 50,
    enableRotation: true,
    enableAnimation: true,

    accessibility: {
        accessibilityDescription:
            'Interactive browser market share shown as a ' +
            '3D circular chart.',
        accessibilityRole: 'region',
        focusable: true,
        tabIndex: 0
    },

    titleStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: 'Bold',
        size: '18px',
        color: '#1a1a1a'
    },

    subTitleStyle: {
        fontFamily: 'Segoe UI',
        fontWeight: 'Normal',
        size: '14px',
        color: '#444444'
    },

    legendSettings: {
        visible: true,
        position: 'Right',
        alignment: 'Center',
        description: 'Browser market share categories',

        textStyle: {
            fontFamily: 'Segoe UI',
            size: '12px',
            color: '#1a1a1a'
        }
    },

    tooltip: {
        enable: true,
        header: 'Market Share',
        format: '${point.x}: <b>${point.y:n2}%</b>',
        fill: '#1a1a1a',
        opacity: 0.9,

        textStyle: {
            fontFamily: 'Segoe UI',
            size: '12px',
            color: '#ffffff'
        }
    },

    textRender: function (args) {
        if (
            args.point &&
            args.point.y !== undefined
        ) {
            var total = calculateTotal();
            var value = Number(args.point.y);

            var percentage =
                total === 0
                    ? 0
                    : value / total * 100;

            args.text =
                args.point.x +
                ': ' +
                percentage.toFixed(1) +
                '%';
        }
    },

    series: [{
        name: 'Market Share',
        dataSource: activeData,
        xName: 'browser',
        yName: 'share',
        pointColorMapping: 'color',
        radius: '75%',
        innerRadius: '0%',

        accessibility: {
            accessibilityDescription:
                'Browser market share data series.',
            accessibilityDescriptionFormat:
                '${point.x}: ${point.y} percent',
            accessibilityRole: 'region',
            focusable: true,
            tabIndex: 0
        },

        animation: {
            enable: true,
            duration: 1000,
            delay: 0
        },

        emptyPointSettings: {
            mode: 'Gap',
            fill: '#767676',
            border: {
                width: 1,
                color: '#333333'
            }
        },

        dataLabel: {
            visible: true,
            position: 'Outside',
            name: 'labelText',
            fill: '#ffffff',

            border: {
                width: 1,
                color: '#cccccc'
            },

            font: {
                fontFamily: 'Segoe UI',
                fontWeight: '600',
                size: '12px',
                color: '#1a1a1a'
            },

            connectorStyle: {
                length: '40px',
                width: 1,
                color: '#666666'
            }
        }
    }]
});

chart.appendTo('#chart');

var pieButton =
    document.getElementById('pieButton');

var doughnutButton =
    document.getElementById('doughnutButton');

var updateButton =
    document.getElementById('updateButton');

if (pieButton) {
    pieButton.addEventListener('click', function () {
        chart.series[0].innerRadius = '0%';
        chart.subTitle = 'Pie View';
        chart.refresh();
    });
}

if (doughnutButton) {
    doughnutButton.addEventListener('click', function () {
        chart.series[0].innerRadius = '40%';
        chart.subTitle = 'Doughnut View';
        chart.refresh();
    });
}

if (updateButton) {
    updateButton.addEventListener('click', function () {
        activeData = updatedData;
        chart.series[0].dataSource = activeData;
        chart.refresh();
    });
}
```

## Runtime Validation Checklist

```text
✅ The correct reference file was selected for the requested feature.
✅ TypeScript imports were validated before code generation.
✅ Every enabled TypeScript feature has a matching injected module.
✅ Every injected module is imported.
✅ PieSeries3D is included for pie and doughnut charts.
✅ CircularChartDataLabel3D is included when data labels are visible.
✅ CircularChartLegend3D is included when the legend is visible.
✅ CircularChartTooltip3D is included when tooltips are enabled.
✅ Export uses the validated CircularChart3D export module when required.
✅ The TypeScript data model matches the data source.
✅ xName matches a category field.
✅ yName matches a numeric field.
✅ The HTML host exists.
✅ The appendTo selector matches the host ID.
✅ The chart is attached through appendTo.
✅ subTitle uses the correct casing.
✅ Pie charts use innerRadius: '0%'.
✅ Doughnut charts use innerRadius greater than '0%'.
✅ Outside data labels have sufficient surrounding space.
✅ Connector lines are used with Outside labels.
✅ Template HTML is executable and not entity encoded.
✅ No rich-text editor markup appears inside code.
✅ Tooltip tokens are validated.
✅ Empty points use Gap, Drop, Zero, or Average.
✅ Accessibility uses the supported accessibility model.
✅ Color is not the only source of category information.
✅ Runtime property changes are followed by refresh when required.
✅ JavaScript files load after the required EJ2 global scripts.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Missing Module Injection

Incorrect:

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

const chart = new CircularChart3D({
    legendSettings: {
        visible: true
    },

    tooltip: {
        enable: true
    },

    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y',

        dataLabel: {
            visible: true
        }
    }]
});
```

Correct:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D,
    CircularChartTooltip3D
);
```

### Passing the Selector to the Constructor

Avoid:

```typescript
const chart = new CircularChart3D({
    series: []
}, '#chart');
```

Preferred:

```typescript
const chart = new CircularChart3D({
    series: []
});

chart.appendTo('#chart');
```

### Incorrect Subtitle Property

Incorrect:

```typescript
subtitle: '2023'
```

Correct:

```typescript
subTitle: '2023'
```

### Invalid HTML Encoding

Incorrect executable HTML:

```html
<div id="chart"></div>
```

Correct:

```html
<div id="chart"></div>
```

### Rich-Text Editor Markup in Code

Incorrect:

```html
https://cdn.syncfusion.com/...
    https://cdn.syncfusion.com/...
</a>
```

Correct:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

### Incorrect Doughnut Assumption

Incorrect:

```text
A doughnut chart requires a separate DoughnutSeries3D module.
```

Correct:

```text
PieSeries3D with innerRadius: '0%'  -> Pie
PieSeries3D with innerRadius: '40%' -> Doughnut
```

### Invalid Chart-Level Palette

Incorrect:

```typescript
const chart = new CircularChart3D({
    palette: [
        '#0066cc',
        '#d83b01'
    ]
});
```

Correct:

```typescript
const chart = new CircularChart3D({
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value',

        palettes: [
            '#0066cc',
            '#d83b01'
        ]
    }]
});
```

### Incorrect Empty-Point Visibility

Incorrect:

```typescript
emptyPointSettings: {
    visible: true,
    mode: 'Zero'
}
```

Correct:

```typescript
emptyPointSettings: {
    mode: 'Zero'
}
```

### Unsupported Accessibility Properties

Avoid:

```typescript
ariaLabel: 'Chart description'
```

Avoid:

```typescript
accessibility: {
    screenReaderMode: true
}
```

Use:

```typescript
accessibility: {
    accessibilityDescription:
        'Chart description',
    accessibilityRole: 'region',
    focusable: true,
    tabIndex: 0
}
```

### Incorrect Animation Duration

Incorrect chart-level pattern:

```typescript
animationDuration: 1000
```

Correct series-level pattern:

```typescript
series: [{
    dataSource: data,
    xName: 'category',
    yName: 'value',

    animation: {
        enable: true,
        duration: 1000,
        delay: 0
    }
}]
```

### Invalid Data Mapping

Incorrect:

```typescript
const data = [
    {
        browser: 'Chrome',
        share: 62.92
    }
];

series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y'
}]
```

Correct:

```typescript
series: [{
    dataSource: data,
    xName: 'browser',
    yName: 'share'
}]
```

### Incomplete Snippets

Avoid isolated configuration fragments when the reader needs runnable code.

Incomplete:

```typescript
tooltip: {
    enable: true
}
```

Support-ready example:

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);

const chart: CircularChart3D = new CircularChart3D({
    tooltip: {
        enable: true
    },

    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#chart');
```

### Color-Only Communication

Do not rely only on segment colors.

Add at least one of the following:

```text
Data labels
Legend
Tooltip
Text summary
Accessible data table
Selection or highlight pattern
```

### Unverified Interactivity Claims

Do not claim that all points support every keyboard command without runtime validation.

Do not assume unsupported selection modes.

Validate:

```text
Installed EJ2 version
Injected interaction module
Configured mode
Rendered element focusability
Browser behavior
Screen-reader behavior
```

### Excessive Chart Configuration

Avoid enabling features only because they are available.

Choose features based on the user scenario:

```text
Simple summary:
Pie + title + legend

Exact interactive values:
Pie + tooltip

Small segments:
Outside labels + connectors

Open-center presentation:
Doughnut

Dynamic application:
Data updates + refresh

Accessible critical data:
Chart + description + data 