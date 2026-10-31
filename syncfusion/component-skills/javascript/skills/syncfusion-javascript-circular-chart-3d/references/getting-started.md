# Getting Started with 3D Circular Chart

- #dependencies
- #project-structure
- #typescript-setup
  - #clone-the-quickstart-project
  - #install-dependencies
  - #add-the-html-container
  - #create-the-typescript-chart
  - #run-the-typescript-application
- #javascript-setup
  - #using-cdn-scripts
  - #using-local-scripts
  - #create-the-javascript-chart
  - #run-the-javascript-application
- #creating-your-first-chart
  - #data-source
  - #series-mapping
  - #chart-container
  - #chart-initialization
- #module-injection
- #dimensions-and-titles
- #controlling-3d-appearance
- #complete-typescript-example
- #complete-javascript-example
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Dependencies

The Essential JS 2 3D Circular Chart is available through the `@syncfusion/ej2-charts` package.

The package uses the following Syncfusion dependencies:

```text
|-- @syncfusion/ej2-charts
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-pdf-export
    |-- @syncfusion/ej2-file-utils
    |-- @syncfusion/ej2-compression
    |-- @syncfusion/ej2-svg-base
```

Install the chart package directly when creating a project from the beginning:

```bash
npm install @syncfusion/ej2-charts
```

The package manager installs the required transitive dependencies automatically. Do not install each dependency separately unless the project has a specific package-management requirement.

## Project Structure

A basic TypeScript Webpack application can use the following structure:

```text
ej2-quickstart/
|-- src/
|   |-- app/
|   |   |-- app.ts
|   |-- index.html
|-- package.json
|-- tsconfig.json
|-- webpack.config.js
```

The files have the following responsibilities:

```text
src/index.html   -> Contains the chart host element.
src/app/app.ts   -> Imports modules and creates the chart.
package.json     -> Contains packages and npm scripts.
tsconfig.json    -> Contains TypeScript compiler settings.
webpack.config.js -> Bundles and serves the application.
```

## TypeScript Setup

### Clone the Quickstart Project

Open a command prompt or terminal and run:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
cd ej2-quickstart
```

The first command downloads the Webpack quickstart project.

The second command changes the current directory to the downloaded project.

### Install Dependencies

Install the packages declared in `package.json`:

```bash
npm install
```

If `@syncfusion/ej2-charts` is not already present in the project, install it explicitly:

```bash
npm install @syncfusion/ej2-charts
```

### Add the HTML Container

Create or update `src/index.html`.

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
</head>
<body>
    <div id="element"></div>
</body>
</html>
```

The element ID is important:

```html
<div id="element"></div>
```

The same ID must be passed to `appendTo`:

```typescript
chart.appendTo('#element');
```

If the IDs do not match, the chart cannot locate its host element.

### Create the TypeScript Chart

Create or update `src/app/app.ts`.

```typescript
import {
    CircularChart3D,
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
);

interface BrowserData {
    x: string;
    y: number;
}

const data: BrowserData[] = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share 2023',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y',
        dataLabel: {
            visible: true,
            position: 'Outside',
            connectorStyle: {
                length: '40px'
            }
        }
    }]
});

chart.appendTo('#element');
```

### How the TypeScript Example Works

The following import provides the main chart class:

```typescript
CircularChart3D
```

The following module renders a three-dimensional pie series:

```typescript
PieSeries3D
```

The following module renders point labels:

```typescript
CircularChartDataLabel3D
```

The following module renders the legend:

```typescript
CircularChartLegend3D
```

Every feature used by the chart must be imported and injected before the chart instance is created.

```typescript
CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D,
    CircularChartLegend3D
);
```

The `BrowserData` interface describes the shape of every data object:

```typescript
interface BrowserData {
    x: string;
    y: number;
}
```

The series maps the `x` data field as the category:

```typescript
xName: 'x'
```

The series maps the `y` data field as the numeric value:

```typescript
yName: 'y'
```

The chart is first created:

```typescript
const chart: CircularChart3D = new CircularChart3D({
    // Chart configuration
});
```

It is then attached to the HTML element:

```typescript
chart.appendTo('#element');
```

### Run the TypeScript Application

Start the development server:

```bash
npm run start
```

Create a production build:

```bash
npm run build
```

The exact development-server address and port depend on the Webpack configuration in the quickstart project.

## JavaScript Setup

The JavaScript version can use either CDN scripts or locally stored global scripts.

The global chart object is available through:

```javascript
ej.charts.CircularChart3D
```

Explicit `CircularChart3D.Inject(...)` calls are not normally required when using the EJ2 global JavaScript bundle.

### Using CDN Scripts

Create `index.html`.

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
    <div id="element"></div>

    <script src="index.js"></script>
</body>
</html>
```

Script order is important:

```text
1. ej2-base
2. ej2-data
3. ej2-svg-base
4. ej2-charts
5. Application script
```

The application script must be loaded after the Syncfusion scripts because it uses the global `ej` object.

### Using Local Scripts

Store the scripts in a local resources directory.

Example structure:

```text
application/
|-- resources/
|   |-- scripts/
|       |-- ej2-base.min.js
|       |-- ej2-data.min.js
|       |-- ej2-svg-base.min.js
|       |-- ej2-charts.min.js
|-- index.html
|-- index.js
```

Create `index.html`.

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
    <script src="resources/scripts/ej2-base.min.js"></script>
    <script src="resources/scripts/ej2-data.min.js"></script>
    <script src="resources/scripts/ej2-svg-base.min.js"></script>
    <script src="resources/scripts/ej2-charts.min.js"></script>
</head>
<body>
    <div id="element"></div>

    <script src="index.js"></script>
</body>
</html>
```

Use scripts from the same Essential JS 2 release. Mixing files from different releases can cause missing-module or compatibility errors.

### Create the JavaScript Chart

Create `index.js`.

```javascript
var data = [
    { x: 'Chrome', y: 62.92 },
    { x: 'Firefox', y: 15.23 },
    { x: 'Safari', y: 19.97 },
    { x: 'Others', y: 2.88 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Browser Market Share 2023',
    tilt: -45,
    legendSettings: {
        visible: true,
        position: 'Right'
    },
    series: [{
        dataSource: data,
        xName: 'x',
        yName: 'y',
        dataLabel: {
            visible: true,
            position: 'Outside',
            connectorStyle: {
                length: '40px'
            }
        }
    }]
});

chart.appendTo('#element');
```

### How the JavaScript Example Works

The Syncfusion global scripts create the `ej` namespace.

The chart constructor is available at:

```javascript
ej.charts.CircularChart3D
```

The chart configuration is passed to the constructor:

```javascript
var chart = new ej.charts.CircularChart3D({
    // Chart configuration
});
```

The chart is attached to the host element after construction:

```javascript
chart.appendTo('#element');
```

### Run the JavaScript Application

The files can be served through a local HTTP server.

Using Python:

```bash
python -m http.server 8000
```

Using Node.js:

```bash
npx http-server
```

After starting a server, open the address reported by the command.

Using a local server is preferred over opening the HTML file directly because browser security restrictions can affect scripts, modules, resources, and data requests.

## Creating Your First Chart

A basic 3D Circular Chart requires the following items:

```text
1. An HTML host element.
2. A chart data source.
3. An xName field mapping.
4. A yName field mapping.
5. PieSeries3D support.
6. A CircularChart3D instance.
7. An appendTo call.
```

### Data Source

The data source is an array of objects.

```typescript
const data = [
    { month: 'January', sales: 18 },
    { month: 'February', sales: 24 },
    { month: 'March', sales: 12 }
];
```

Each property has a purpose:

```text
month -> Category displayed by the chart.
sales -> Numeric value used to calculate segment size.
```

The property names do not have to be `x` and `y`. They only need to match the corresponding `xName` and `yName` values.

### Series Mapping

Map the data fields through `xName` and `yName`.

```typescript
series: [{
    dataSource: data,
    xName: 'month',
    yName: 'sales'
}]
```

The mapping means:

```text
xName: 'month' -> Read category values from the month field.
yName: 'sales' -> Read numeric values from the sales field.
```

Incorrect mapping:

```typescript
const data = [
    { month: 'January', sales: 18 }
];

series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y'
}]
```

The configuration is incorrect because the data objects do not contain `x` or `y` fields.

Correct mapping:

```typescript
const data = [
    { month: 'January', sales: 18 }
];

series: [{
    dataSource: data,
    xName: 'month',
    yName: 'sales'
}]
```

### Chart Container

The chart requires an existing HTML element.

```html
<div id="element"></div>
```

The selector supplied to `appendTo` must match the element ID.

```typescript
chart.appendTo('#element');
```

The chart cannot render when:

- The host element does not exist.
- The selector is misspelled.
- The chart is appended before the host element is created.
- Another element uses an unexpected duplicate ID.

### Chart Initialization

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface SalesData {
    month: string;
    sales: number;
}

const data: SalesData[] = [
    { month: 'January', sales: 18 },
    { month: 'February', sales: 24 },
    { month: 'March', sales: 12 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '420px',
    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'sales'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { month: 'January', sales: 18 },
    { month: 'February', sales: 24 },
    { month: 'March', sales: 12 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '420px',
    series: [{
        dataSource: data,
        xName: 'month',
        yName: 'sales'
    }]
});

chart.appendTo('#element');
```

## Module Injection

### Purpose

Module injection includes only the features required by a TypeScript application.

A feature must be:

```text
1. Imported from @syncfusion/ej2-charts.
2. Passed to CircularChart3D.Inject(...).
3. Configured in the chart.
```

### Pie Series Module

The `PieSeries3D` module renders the chart series.

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

Every 3D pie example requires `PieSeries3D`.

### Data Label Module

The `CircularChartDataLabel3D` module renders labels for data points.

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
```

Enable the feature in the series:

```typescript
dataLabel: {
    visible: true
}
```

Using `dataLabel.visible` without injecting `CircularChartDataLabel3D` leaves the TypeScript application without the required feature module.

### Legend Module

The `CircularChartLegend3D` module renders the chart legend.

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

Enable the legend:

```typescript
legendSettings: {
    visible: true
}
```

### Tooltip Module

The `CircularChartTooltip3D` module renders tooltips.

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
```

Enable the tooltip:

```typescript
tooltip: {
    enable: true
}
```

### Complete Module Injection

Use the following imports when the chart contains a pie series, data labels, a legend, and tooltips:

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

Feature-to-module mapping:

```text
3D pie series -> PieSeries3D
Data labels   -> CircularChartDataLabel3D
Legend        -> CircularChartLegend3D
Tooltip       -> CircularChartTooltip3D
```

### JavaScript Global Bundle

When using the EJ2 global JavaScript bundle:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

The required chart modules are included in the global bundle. Explicit `CircularChart3D.Inject(...)` calls are generally unnecessary in this setup.

## Dimensions and Titles

### Width

Set chart width using a CSS size.

```typescript
width: '100%'
```

Common examples:

```text
100%  -> Uses the available parent width.
800px -> Uses a fixed width of 800 pixels.
```

A percentage width requires the parent element to have measurable width.

### Height

Set chart height using a CSS size.

```typescript
height: '420px'
```

Use an explicit height when the surrounding layout does not provide a reliable height.

### Title

Use `title` to describe the chart.

```typescript
title: 'Sales Distribution'
```

A good title identifies the metric or subject shown by the chart.

### Complete Dimensions and Title Example

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface SalesData {
    category: string;
    value: number;
}

const data: SalesData[] = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '420px',
    title: 'Sales Distribution',
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { category: 'Hardware', value: 35 },
    { category: 'Software', value: 45 },
    { category: 'Services', value: 20 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '420px',
    title: 'Sales Distribution',
    series: [{
        dataSource: data,
        xName: 'category',
        yName: 'value'
    }]
});

chart.appendTo('#element');
```

## Controlling 3D Appearance

The 3D Circular Chart supports properties that control its three-dimensional presentation.

### Tilt

Use `tilt` to control the vertical viewing angle.

```typescript
tilt: -45
```

A negative value tilts the chart in one direction, while a positive value tilts it in the opposite direction.

Use moderate tilt values to preserve label and segment readability.

### Rotation

Use `rotation` to rotate the chart around its vertical axis.

```typescript
rotation: 30
```

Rotation changes which segments appear at the front of the chart.

### Depth

Use `depth` to control the visual thickness of the chart.

```typescript
depth: 50
```

Increasing depth makes the three-dimensional extrusion more prominent. Excessive depth can reduce readability when segments are small.

### Complete 3D Appearance Example

#### TypeScript

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);

interface ProductData {
    product: string;
    sales: number;
}

const data: ProductData[] = [
    { product: 'Product A', sales: 40 },
    { product: 'Product B', sales: 30 },
    { product: 'Product C', sales: 20 },
    { product: 'Product D', sales: 10 }
];

const chart: CircularChart3D = new CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Product Sales',
    tilt: -45,
    rotation: 30,
    depth: 50,
    series: [{
        dataSource: data,
        xName: 'product',
        yName: 'sales'
    }]
});

chart.appendTo('#element');
```

#### JavaScript

```javascript
var data = [
    { product: 'Product A', sales: 40 },
    { product: 'Product B', sales: 30 },
    { product: 'Product C', sales: 20 },
    { product: 'Product D', sales: 10 }
];

var chart = new ej.charts.CircularChart3D({
    width: '100%',
    height: '450px',
    title: 'Product Sales',
    tilt: -45,
    rotation: 30,
    depth: 50,
    series: [{
        dataSource: data,
        xName: 'product',
        yName: 'sales'
    }]
});

chart.appendTo('#element');
```

## Complete TypeScript Example

The following example includes:

- A strongly typed data source.
- A 3D pie series.
- Data labels.
- A legend.
- A tooltip.
- A title and subtitle.
- Explicit dimensions.
- Tilt, rotation, and depth.
- All required TypeScript module imports and injections.

File: `src/index.html`

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
</head>
<body>
    <div id="element"></div>
</body>
</html>
```

File: `src/app/app.ts`

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
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
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
        format: '${point.x}: <b>${point.y}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            connectorStyle: {
                length: '40px'
            }
        }
    }]
});

chart.appendTo('#element');
```

Expected behavior:

```text
1. The chart displays four three-dimensional pie segments.
2. The browser field identifies each segment.
3. The share field controls the size of each segment.
4. Labels are displayed outside the segments.
5. Connector lines join labels to their segments.
6. The legend appears on the right.
7. A tooltip appears when a segment is hovered.
8. The title and subtitle appear above the chart.
```

## Complete JavaScript Example

File: `index.html`

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
    <div id="element"></div>

    <script src="index.js"></script>
</body>
</html>
```

File: `index.js`

```javascript
var data = [
    { browser: 'Chrome', share: 62.92 },
    { browser: 'Firefox', share: 15.23 },
    { browser: 'Safari', share: 19.97 },
    { browser: 'Others', share: 2.88 }
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
        format: '${point.x}: <b>${point.y}%</b>'
    },

    series: [{
        name: 'Market Share',
        dataSource: data,
        xName: 'browser',
        yName: 'share',
        dataLabel: {
            visible: true,
            position: 'Outside',
            connectorStyle: {
                length: '40px'
            }
        }
    }]
});

chart.appendTo('#element');
```

Expected behavior:

```text
1. The Syncfusion scripts create the global ej namespace.
2. index.js creates the CircularChart3D instance.
3. The chart reads the browser and share fields from the data.
4. The chart renders labels, legend, tooltip, title, and subtitle.
5. The completed chart is appended to the element host.
```

## Runtime Validation Checklist

Use this checklist before considering the implementation complete:

```text
✅ @syncfusion/ej2-charts is installed for TypeScript.
✅ CircularChart3D is imported.
✅ PieSeries3D is imported and injected.
✅ CircularChartDataLabel3D is imported and injected when labels are visible.
✅ CircularChartLegend3D is imported and injected when the legend is visible.
✅ CircularChartTooltip3D is imported and injected when the tooltip is enabled.
✅ The JavaScript global scripts load before index.js.
✅ All local JavaScript files come from the same EJ2 release.
✅ The data source is defined.
✅ The xName value matches a data-source property.
✅ The yName value matches a numeric data-source property.
✅ A host element exists.
✅ The host element ID matches the appendTo selector.
✅ chart.appendTo('#element') is called.
✅ The chart has a measurable width and height.
✅ No editor-generated anchor elements exist inside source code.
✅ No HTML entities are used in executable HTML or tooltip markup.
✅ The TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Invalid Editor-Generated Links

Incorrect:

```bash
git clone <a href="https://github.com/SyncfusionExamples/ej2-quickstart-webpack">...</a>
```

Correct:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack ej2-quickstart
```

Do not place rich-text editor anchor markup inside commands or source code.

### Encoded HTML in Executable Files

Incorrect:

```html
<div id="element"></div>
```

Correct:

```html
<div id="element"></div>
```

HTML entities may be needed when displaying HTML as prose, but they must not replace actual tags inside a runnable HTML file.

### Broken Script Elements

Incorrect:

```html
<script src="resources/scripts/ej2-base.min.js"></script>
<script src="resources/scripts/ej2-charts.min.js"></script>
```

Correct:

```html
resources/scripts/ej2-base.min.js
resources/scripts/ej2-charts.min.js
```

Every external script path must be placed inside a valid `script` element.

### Missing Chart Container

Incorrect:

```typescript
const chart = new CircularChart3D({
    series: []
});

chart.appendTo('#element');
```

when the page does not contain the corresponding element.

Correct HTML:

```html
<div id="element"></div>
```

### Mismatched Container ID

Incorrect:

```html
<div id="chart"></div>
```

```typescript
chart.appendTo('#element');
```

Correct:

```html
<div id="element"></div>
```

```typescript
chart.appendTo('#element');
```

### Missing Series Module

Incorrect:

```typescript
import {
    CircularChart3D
} from '@syncfusion/ej2-charts';
```

Correct:

```typescript
import {
    CircularChart3D,
    PieSeries3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(PieSeries3D);
```

### Missing Data Label Module

Incorrect:

```typescript
dataLabel: {
    visible: true
}
```

without importing and injecting `CircularChartDataLabel3D`.

Correct:

```typescript
import {
    CircularChartDataLabel3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartDataLabel3D
);
```

### Missing Legend Module

Incorrect:

```typescript
legendSettings: {
    visible: true
}
```

without importing and injecting `CircularChartLegend3D`.

Correct:

```typescript
import {
    CircularChartLegend3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartLegend3D
);
```

### Missing Tooltip Module

Incorrect:

```typescript
tooltip: {
    enable: true
}
```

without importing and injecting `CircularChartTooltip3D`.

Correct:

```typescript
import {
    CircularChartTooltip3D
} from '@syncfusion/ej2-charts';

CircularChart3D.Inject(
    PieSeries3D,
    CircularChartTooltip3D
);
```

### Incorrect Data Mapping

Incorrect:

```typescript
const data = [
    { category: 'Chrome', value: 62.92 }
];

series: [{
    dataSource: data,
    xName: 'x',
    yName: 'y'
}]
```

Correct:

```typescript
const data = [
    { category: 'Chrome', value: 62.92 }
];

series: [{
    dataSource: data,
    xName: 'category',
    yName: 'value'
}]
```

### Constructor and appendTo Pattern

Avoid relying on a selector passed as an additional constructor argument.

Preferred pattern:

```typescript
const chart: CircularChart3D = new CircularChart3D({
    // Configuration
});

chart.appendTo('#element');
```

This pattern clearly separates instance creation from DOM attachment.

### Loading Application Script Too Early

Incorrect:

```html
<script src="index.js"></script>
<script src="resources/scripts/ej2-charts.min.js"></script>
```

Correct:

```html
<script src="resources/scripts/ej2-charts.min.js"></script>
<script src="index.js"></script>
```

The global chart script must load before code that accesses `ej.charts`.

### Mixing Package or Script Versions

Avoid combining scripts from different EJ2 releases.

Incorrect mixture:

```text
ej2-base from one release
ej2-data from another release
ej2-charts from another release
```

Preferred:

```text
All EJ2 scripts and packages use the same release.
```

### Fixed Layout Without Responsive Validation

A fixed width such as:

```typescript
width: '900px'
```

can overflow a smaller container.

Use a responsive width when appropriate:

```typescript
width: '100%'
```

Provide a measurable height:

```typescript
height: '450px'
```

### Excessive 3D Effects

Large tilt, rotation, or depth values can reduce readability.

Use moderate settings first:

```typescript
tilt: -45,
rotation: 0,
depth: 50
```

Then adjust one property at a time after validating labels, legends, tooltips, and segment visibility.