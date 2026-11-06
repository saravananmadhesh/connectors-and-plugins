# Getting Started with Accumulation Charts

## Table of Contents

- [Getting Started with Accumulation Charts](#getting-started-with-accumulation-charts)
  - [Prerequisites](#prerequisites)
  - [Installation and Setup](#installation-and-setup)
    - [TypeScript Setup](#typescript-setup)
    - [JavaScript ES5 CDN Setup](#javascript-es5-cdn-setup)
  - [Module Injection Pattern](#module-injection-pattern)
    - [TypeScript Module Injection](#typescript-module-injection)
    - [JavaScript Module Injection](#javascript-module-injection)
  - [Creating Your First Pie Chart](#creating-your-first-pie-chart)
    - [TypeScript Example](#typescript-example)
    - [JavaScript ES5 Example](#javascript-es5-example)
  - [Theme Selection](#theme-selection)
  - [Basic Data Binding](#basic-data-binding)
  - [Adding a Legend](#adding-a-legend)
  - [Enabling Data Labels](#enabling-data-labels)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript ES5 Example](#complete-javascript-es5-example)
  - [Common Configuration Issues](#common-configuration-issues)
    - [Chart Is Not Rendering](#chart-is-not-rendering)
    - [AccumulationChart Is Not Defined](#accumulationchart-is-not-defined)
    - [Pie Series Is Not Displayed](#pie-series-is-not-displayed)
    - [Legend Is Not Displayed](#legend-is-not-displayed)
    - [Data Labels Are Not Displayed](#data-labels-are-not-displayed)
    - [Tooltip Is Not Displayed](#tooltip-is-not-displayed)
    - [Selection Is Not Working](#selection-is-not-working)
    - [Theme Is Not Applied](#theme-is-not-applied)
    - [CDN Example Is Not Working](#cdn-example-is-not-working)
  - [Next Steps](#next-steps)


The EJ2 Accumulation Chart is a separate chart control designed for visualizing proportional data without Cartesian axes. It supports Pie, Doughnut, Funnel, and Pyramid series.

Accumulation Charts support:

- Local and remote data binding.
- Smart data-label arrangement.
- Legends and tooltips.
- Point explosion.
- Selection and highlighting.
- Grouping of smaller data points.
- Export and print functionality.

## Prerequisites

For a TypeScript project, ensure that the following tools are available:

- Node.js.
- npm.
- A TypeScript-compatible build tool such as webpack or Vite.
- A modern web browser.
- A text editor such as Visual Studio Code.

For a JavaScript ES5 CDN application, ensure that the following are available:

- A modern web browser.
- An active network connection for loading CDN resources.
- An HTML file containing the chart container and scripts.

## Installation and Setup

### TypeScript Setup

Install the Accumulation Chart package and its required dependencies through npm:

```bash
npm install @syncfusion/ej2-charts
```

The main package is:

```text
@syncfusion/ej2-charts
```

Its core dependencies include:

```text
@syncfusion/ej2-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
└── @syncfusion/ej2-svg-base
```

The following packages are required only when the corresponding export functionality is used:

```text
@syncfusion/ej2-pdf-export
@syncfusion/ej2-file-utils
@syncfusion/ej2-compression
```

Import only the Accumulation Chart class and the feature modules required by the application.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSelection,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';
```

The feature modules serve the following purposes:

- `PieSeries` renders Pie and Doughnut series.
- `AccumulationDataLabel` renders data labels.
- `AccumulationLegend` renders the legend.
- `AccumulationTooltip` renders tooltips.
- `AccumulationSelection` enables point selection.

### JavaScript ES5 CDN Setup

Load the Syncfusion EJ2 scripts in dependency order.

Use a specific package version in production so that updates do not unexpectedly change application behavior.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>

<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>

<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>

<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

Load the scripts in the following order:

1. `ej2-base`
2. `ej2-data`
3. `ej2-svg-base`
4. `ej2-charts`

Add `ej2-pdf-export` before `ej2-charts` only when PDF export is required.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-pdf-export/dist/global/ej2-pdf-export.min.js"></script>
```

The Accumulation Chart is rendered using SVG and does not require Chart-specific CSS merely to display a basic chart. Theme selection is controlled through the chart's `theme` property.

Application-level CSS can still be used to size and position the chart container.

```css
#chart {
  width: 100%;
  min-height: 400px;
}
```

## Module Injection Pattern

The Accumulation Chart uses a modular architecture. Inject the series and feature modules before creating the chart.

### TypeScript Module Injection

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSelection,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationSelection
);
```

Only inject modules used by the chart.

For example, a basic Pie Chart without a legend, data labels, tooltip, or selection requires only `PieSeries`.

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);
```

A Pie Chart with data labels, a legend, and a tooltip requires:

```typescript
AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
);
```

### JavaScript Module Injection

When using individual feature modules from the global EJ2 namespace, inject the modules required by the chart.

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationTooltip
);
```

Add `ej.charts.AccumulationSelection` only when selection is enabled.

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationSelection
);
```

## Creating Your First Pie Chart

A Pie Chart requires:

- A valid chart container.
- A numeric data field.
- A category data field.
- A `Pie` series.
- The `PieSeries` module.
- Valid `xName` and `yName` field mappings.

### TypeScript Example

**index.ts:**

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

interface SalesData {
  quarter: string;
  sales: number;
}

const salesData: SalesData[] = [
  {
    quarter: 'Q1',
    sales: 25000
  },
  {
    quarter: 'Q2',
    sales: 30000
  },
  {
    quarter: 'Q3',
    sales: 28000
  },
  {
    quarter: 'Q4',
    sales: 32000
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Quarterly Sales Distribution',
    width: '100%',
    height: '400px',
    series: [
      {
        dataSource: salesData,
        xName: 'quarter',
        yName: 'sales',
        type: 'Pie',
        name: 'Sales'
      }
    ]
  });

chart.appendTo('#chart-container');
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <title>Syncfusion Accumulation Chart</title>
</head>
<body>
  <div id="chart-container"></div>
  <script src="index.js"></script>
</body>
</html>
```

**styles.css:**

```css
#chart-container {
  width: 100%;
  min-height: 400px;
}
```

The constructor target syntax is also supported:

```typescript
const chart: AccumulationChart =
  new AccumulationChart(
    {
      title: 'Quarterly Sales Distribution',
      series: [
        {
          dataSource: salesData,
          xName: 'quarter',
          yName: 'sales',
          type: 'Pie'
        }
      ]
    },
    '#chart-container'
  );
```

Use one initialization pattern consistently. Do not call `appendTo` again when the target selector is already passed to the constructor.

### JavaScript ES5 Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Syncfusion Accumulation Chart</title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>

  <style>
    #chart {
      width: 100%;
      min-height: 400px;
    }
  </style>
</head>
<body>
  <div id="chart"></div>

  <script>
    ej.charts.AccumulationChart.Inject(
      ej.charts.PieSeries
    );

    var salesData = [
      {
        quarter: 'Q1',
        sales: 25000
      },
      {
        quarter: 'Q2',
        sales: 30000
      },
      {
        quarter: 'Q3',
        sales: 28000
      },
      {
        quarter: 'Q4',
        sales: 32000
      }
    ];

    var chart = new ej.charts.AccumulationChart({
      title: 'Quarterly Sales Distribution',
      width: '100%',
      height: '400px',
      series: [
        {
          dataSource: salesData,
          xName: 'quarter',
          yName: 'sales',
          type: 'Pie',
          name: 'Sales'
        }
      ]
    });

    chart.appendTo('#chart');
  </script>
</body>
</html>
```

## Theme Selection

Use the `theme` property to apply a built-in chart theme.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Revenue',
    theme: 'Bootstrap5',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Common theme families include:

- Material
- Material Dark
- Material 3
- Material 3 Dark
- Bootstrap
- Bootstrap 4
- Bootstrap 5
- Bootstrap 5 Dark
- Fabric
- Fabric Dark
- Fluent
- Fluent Dark
- Tailwind
- Tailwind Dark
- High Contrast

Use the exact theme enumeration supported by the installed `@syncfusion/ej2-charts` package version.

A theme controls the default colors and text appearance. Series-level properties and custom palettes can override theme values.

## Basic Data Binding

The Accumulation Chart uses `xName` and `yName` to map data fields.

- `xName` identifies the category field.
- `yName` identifies the numeric field used to calculate segment size.

```typescript
interface ProductData {
  product: string;
  revenue: number;
}

const chartData: ProductData[] = [
  {
    product: 'Product A',
    revenue: 15000
  },
  {
    product: 'Product B',
    revenue: 22000
  },
  {
    product: 'Product C',
    revenue: 18000
  },
  {
    product: 'Product D',
    revenue: 25000
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Revenue by Product',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        name: 'Revenue'
      }
    ]
  });

chart.appendTo('#chart');
```

The values mapped through `yName` must be valid numbers.

Incorrect:

```typescript
const chartData = [
  {
    product: 'Product A',
    revenue: '15000'
  }
];
```

Correct:

```typescript
const chartData = [
  {
    product: 'Product A',
    revenue: 15000
  }
];
```

If data is received as text, convert it before assigning the data source.

```typescript
interface RawProductData {
  product: string;
  revenue: string;
}

interface ProductData {
  product: string;
  revenue: number;
}

const rawData: RawProductData[] = [
  {
    product: 'Product A',
    revenue: '15000'
  },
  {
    product: 'Product B',
    revenue: '22000'
  }
];

const chartData: ProductData[] = rawData.map(
  (item: RawProductData): ProductData => ({
    product: item.product,
    revenue: Number(item.revenue)
  })
);
```

## Adding a Legend

The `AccumulationLegend` module must be injected when the legend is displayed.

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend
);

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Revenue by Product',
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        name: 'Revenue'
      }
    ]
  });

chart.appendTo('#chart');
```

Common legend positions include:

- `Auto`
- `Top`
- `Bottom`
- `Left`
- `Right`
- `Custom`

## Enabling Data Labels

The `AccumulationDataLabel` module must be injected before enabling data labels.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel
);

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Revenue by Product',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'product'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Use `name` to map the data-label text from a field in the data source.

```typescript
interface ProductData {
  product: string;
  revenue: number;
  label: string;
}

const chartData: ProductData[] = [
  {
    product: 'Product A',
    revenue: 15000,
    label: 'Product A: 15K'
  },
  {
    product: 'Product B',
    revenue: 22000,
    label: 'Product B: 22K'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

## Enabling Tooltips

The correct tooltip module for an Accumulation Chart is `AccumulationTooltip`.

Do not import or inject the regular Cartesian Chart `Tooltip` module for an Accumulation Chart.

```typescript
import {
  AccumulationChart,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationTooltip
);

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Revenue by Product',
    tooltip: {
      enable: true,
      format:
        '${point.x}: <b>${point.y}</b>'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        name: 'Revenue'
      }
    ]
  });

chart.appendTo('#chart');
```

Common tooltip placeholders include:

- `${point.x}`
- `${point.y}`
- `${series.name}`

## Complete TypeScript Example

The following example includes a Pie series, legend, data labels, tooltip, selection, theme, and responsive sizing.

**index.ts:**

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSelection,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationSelection
);

interface SalesData {
  quarter: string;
  sales: number;
  label: string;
}

const salesData: SalesData[] = [
  {
    quarter: 'Q1',
    sales: 25000,
    label: 'Q1: 25K'
  },
  {
    quarter: 'Q2',
    sales: 30000,
    label: 'Q2: 30K'
  },
  {
    quarter: 'Q3',
    sales: 28000,
    label: 'Q3: 28K'
  },
  {
    quarter: 'Q4',
    sales: 32000,
    label: 'Q4: 32K'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Quarterly Sales Distribution',
    theme: 'Bootstrap5',
    width: '100%',
    height: '400px',
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    tooltip: {
      enable: true,
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y}'
    },
    selectionMode: 'Point',
    series: [
      {
        dataSource: salesData,
        xName: 'quarter',
        yName: 'sales',
        type: 'Pie',
        name: 'Quarterly Sales',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label'
        },
        explode: true,
        explodeOffset: '10%'
      }
    ]
  });

chart.appendTo('#chart-container');

window.addEventListener('beforeunload', () => {
  chart.destroy();
});
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Quarterly Sales Accumulation Chart</title>
</head>
<body>
  <main>
    <h1>Quarterly Sales Distribution</h1>

    <div
      id="chart-container"
      role="region"
      aria-label="Pie chart showing quarterly sales distribution"
    ></div>
  </main>

  <script src="index.js"></script>
</body>
</html>
```

**styles.css:**

```css
#chart-container {
  width: 100%;
  min-height: 400px;
}
```

## Complete JavaScript ES5 Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Quarterly Sales Accumulation Chart</title>

  <script
    srccfusion.com/ej2/33.2.3/ej2-base/dist/global/ej2-base.min.js  </script>

  <script
    srccfusion.com/ej2/33.2.3/ej2-data/dist/global/ej2-data.min.js  </script>

  <script
    srccfusion.com/ej2/33.2.3/ej2-svg-base/dist/global/ej2-svg-base.min.js  </script>

  <script
    srccfusion.com/ej2/33.2.3/ej2-charts/dist/global/ej2-charts.min.js  </script>

  <style>
    #chart-container {
      width: 100%;
      min-height: 400px;
    }
  </style>
</head>
<body>
  <main>
    <h1>Quarterly Sales Distribution</h1>

    <div
      id="chart-container"
      role="region"
      aria-label="Pie chart showing quarterly sales distribution"
    ></div>
  </main>

  <script>
    ej.charts.AccumulationChart.Inject(
      ej.charts.PieSeries,
      ej.charts.AccumulationDataLabel,
      ej.charts.AccumulationLegend,
      ej.charts.AccumulationTooltip,
      ej.charts.AccumulationSelection
    );

    var salesData = [
      {
        quarter: 'Q1',
        sales: 25000,
        label: 'Q1: 25K'
      },
      {
        quarter: 'Q2',
        sales: 30000,
        label: 'Q2: 30K'
      },
      {
        quarter: 'Q3',
        sales: 28000,
        label: 'Q3: 28K'
      },
      {
        quarter: 'Q4',
        sales: 32000,
        label: 'Q4: 32K'
      }
    ];

    var chart =
      new ej.charts.AccumulationChart({
        title: 'Quarterly Sales Distribution',
        theme: 'Bootstrap5',
        width: '100%',
        height: '400px',
        legendSettings: {
          visible: true,
          position: 'Right'
        },
        tooltip: {
          enable: true,
          format:
            '<b>${point.x}</b><br>' +
            'Sales: ${point.y}'
        },
        selectionMode: 'Point',
        series: [
          {
            dataSource: salesData,
            xName: 'quarter',
            yName: 'sales',
            type: 'Pie',
            name: 'Quarterly Sales',
            dataLabel: {
              visible: true,
              position: 'Outside',
              name: 'label'
            },
            explode: true,
            explodeOffset: '10%'
          }
        ]
      });

    chart.appendTo('#chart-container');

    window.addEventListener(
      'beforeunload',
      function () {
        chart.destroy();
      }
    );
  </script>
</body>
</html>
```

## Common Configuration Issues

### Chart Is Not Rendering

- Confirm that `@syncfusion/ej2-charts` is installed.
- Import `AccumulationChart`.
- Import and inject the required series module.
- Inject `PieSeries` when the series type is `Pie`.
- Ensure that the target element exists before calling `appendTo`.
- Ensure that the chart container has a valid height.
- Confirm that `dataSource`, `xName`, and `yName` are configured.
- Check the browser console for runtime errors.

### AccumulationChart Is Not Defined

For TypeScript:

- Import `AccumulationChart` from `@syncfusion/ej2-charts`.
- Ensure that the project build succeeds.
- Ensure that the package is installed.
- Ensure that the import path is correct.

For JavaScript ES5:

- Ensure that `ej2-base`, `ej2-data`, `ej2-svg-base`, and `ej2-charts` load successfully.
- Load the scripts in dependency order.
- Create the chart only after the scripts have loaded.
- Use `ej.charts.AccumulationChart`.
- Check the browser network panel for failed CDN requests.

### Pie Series Is Not Displayed

- Import and inject `PieSeries`.
- Set the series `type` to `Pie`.
- Ensure that the data source is not empty.
- Ensure that `xName` matches the category field.
- Ensure that `yName` matches the numeric field.
- Ensure that mapped Y-values are valid numbers.
- Remove `null`, `undefined`, `NaN`, or invalid values.

### Legend Is Not Displayed

- Import and inject `AccumulationLegend`.
- Set `legendSettings.visible` to `true`.
- Use `legendSettings`, not `legend`.
- Ensure that X-values contain meaningful category labels.
- Ensure that the chart container provides sufficient space.

### Data Labels Are Not Displayed

- Import and inject `AccumulationDataLabel`.
- Set `dataLabel.visible` to `true`.
- Place `dataLabel` inside the series configuration.
- Map `dataLabel.name` to a valid data-source field when custom text is required.
- Ensure that segment values are large enough to display labels.
- Increase the chart dimensions if outside labels are clipped.

### Tooltip Is Not Displayed

- Import and inject `AccumulationTooltip`.
- Do not inject the regular Chart `Tooltip` module.
- Set `tooltip.enable` to `true`.
- Ensure that no other element covers the chart.
- Use supported placeholders such as `${point.x}`, `${point.y}`, and `${series.name}`.

### Selection Is Not Working

- Import and inject `AccumulationSelection`.
- Set `selectionMode` to a supported value such as `Point`.
- Ensure that pointer events are not disabled.
- Ensure that an overlay is not covering the chart.

### Theme Is Not Applied

- Use an exact theme value supported by the installed package version.
- Check the casing of the theme value.
- Ensure that custom series colors are not overriding the theme colors.
- Ensure that the chart is recreated or refreshed after changing the theme dynamically.

### CDN Example Is Not Working

- Use matching versions for all EJ2 CDN scripts.
- Do not combine unrelated EJ2 package versions.
- Load `ej2-base` before other EJ2 scripts.
- Load `ej2-data` before `ej2-charts`.
- Load `ej2-svg-base` before `ej2-charts`.
- Load `ej2-pdf-export` only when PDF export is required.
- Confirm that the CDN requests are not blocked by a content security policy.

## Next Steps

- **Explore chart types:** See `chart-types.md`.
- **Configure legends:** See `legend-configuration.md`.
- **Add data labels:** See `data-labels.md`.
- **Configure tooltips:** See `tooltip-format.md`.
- **Style charts:** See `customization-and-styling.md`.
- **Handle data:** See `data-binding.md`.
- **Add interactions:** See `interaction-features.md`.
- **Configure accessibility and export:** See `accessibility-export.md`.
