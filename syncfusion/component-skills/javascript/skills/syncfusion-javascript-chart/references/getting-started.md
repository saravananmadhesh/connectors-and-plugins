# Getting Started with Charts

## Table of Contents

- [Getting Started with Charts](#getting-started-with-charts)
  - [Prerequisites](#prerequisites)
  - [Setup TypeScript](#setup-typescript)
    - [Package Installation](#package-installation)
    - [Import and Inject Modules](#import-and-inject-modules)
    - [HTML Container](#html-container)
  - [Setup JavaScript](#setup-javascript)
    - [Consolidated CDN Script](#consolidated-cdn-script)
    - [Individual CDN Scripts](#individual-cdn-scripts)
    - [Local Scripts](#local-scripts)
  - [Basic Chart Creation](#basic-chart-creation)
    - [TypeScript Line Chart](#typescript-line-chart)
    - [JavaScript Line Chart](#javascript-line-chart)
  - [Data Binding Fundamentals](#data-binding-fundamentals)
    - [Local Data](#local-data)
    - [Mapping Data Fields](#mapping-data-fields)
    - [Multiple Series](#multiple-series)
    - [Dynamic Data Assignment](#dynamic-data-assignment)
  - [Theme Selection](#theme-selection)
    - [Built-in Themes](#built-in-themes)
    - [Custom Color Palettes](#custom-color-palettes)
  - [Common Configuration](#common-configuration)
    - [Chart Dimensions](#chart-dimensions)
    - [Title and Subtitle](#title-and-subtitle)
    - [Tooltip Configuration](#tooltip-configuration)
    - [Legend Configuration](#legend-configuration)
  - [Common Scenarios](#common-scenarios)
    - [Loading Data from an API](#loading-data-from-an-api)
    - [Responsive Chart](#responsive-chart)
  - [Troubleshooting](#troubleshooting)
    - [Chart Is Not Displayed](#chart-is-not-displayed)
    - [Line Series Is Not Displayed](#line-series-is-not-displayed)
    - [Category Axis Is Not Displayed](#category-axis-is-not-displayed)
    - [DateTime Axis Is Not Displayed](#datetime-axis-is-not-displayed)
    - [Tooltip Is Not Displayed](#tooltip-is-not-displayed)
    - [Legend Is Not Displayed](#legend-is-not-displayed)


The EJ2 Chart control visualizes local or remote data using SVG. It supports multiple series, multiple axes, Category, DateTime, Numeric, and Logarithmic axis types, as well as interactive features such as tooltips, legends, zooming, crosshairs, trackballs, and selection.

## Prerequisites

Before creating an EJ2 Chart, ensure that the following tools are available:

- Node.js and npm for TypeScript projects.
- A TypeScript-compatible bundler such as webpack or Vite.
- A modern web browser.
- A text editor such as Visual Studio Code.
- A valid HTML element in which the chart can be rendered.

The Syncfusion TypeScript getting-started documentation lists Node.js 14.15.0 or later as a minimum requirement for its webpack quick-start workflow.

## Setup TypeScript

### Package Installation

Install the individual Chart package:

```bash
npm install @syncfusion/ej2-charts
```

Installing `@syncfusion/ej2-charts` installs its required package dependencies. Do not install `@syncfusion/ej2-base` separately unless the application directly depends on it for another reason.

The main package is:

```text
@syncfusion/ej2-charts
```

Its dependencies include:

```text
@syncfusion/ej2-charts
├── @syncfusion/ej2-base
├── @syncfusion/ej2-data
└── @syncfusion/ej2-svg-base
```

The following packages are used when the corresponding export functionality requires them:

```text
@syncfusion/ej2-pdf-export
@syncfusion/ej2-file-utils
@syncfusion/ej2-compression
```

The PDF export packages are optional when PDF export is not used.

### Import and Inject Modules

The EJ2 Chart uses a modular architecture. Import and inject only the series, axis, and feature modules required by the chart.

```typescript
import {
  Category,
  Chart,
  DateTime,
  Legend,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Category,
  DateTime,
  Legend,
  Tooltip
);
```

The modules in this example serve the following purposes:

- `LineSeries` renders Line series.
- `Category` supports a Category axis.
- `DateTime` supports a DateTime axis.
- `Legend` renders the chart legend.
- `Tooltip` renders chart tooltips.

Inject only the modules used by the configured chart.

For a basic Category Line Chart:

```typescript
import {
  Category,
  Chart,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Category
);
```

For a DateTime Line Chart with a tooltip:

```typescript
import {
  Chart,
  DateTime,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTime,
  Tooltip
);
```

### HTML Container

Add a valid chart container to the HTML page.

```html
<div id="chart"></div>
```

Provide a stable height through CSS:

```css
#chart {
  width: 100%;
  min-height: 420px;
}
```

The Chart renders using SVG. A basic standalone Chart does not require an `ej2-charts/styles` CSS import merely to render its SVG content.

Application CSS can be used to size and position the chart container.

## Setup JavaScript

### Consolidated CDN Script

For a standalone JavaScript ES5 example, the simplest setup is the consolidated EJ2 CDN script.

Use a specific version in production so that package updates do not unexpectedly change application behavior.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Syncfusion Chart</title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #chart {
      width: 100%;
      min-height: 420px;
    }
  </style>
</head>
<body>
  <div id="chart"></div>

  <script src="index.js"></script>
</body>
</html>
```

Do not load the consolidated script together with individual EJ2 package scripts.

### Individual CDN Scripts

Use individual package scripts when package-level control is required.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

Load the scripts in this order:

1. `ej2-base`
2. `ej2-data`
3. `ej2-svg-base`
4. `ej2-charts`

Use the same version for every EJ2 CDN package.

When PDF export is required, load its dependencies before the Chart script.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-pdf-export/dist/global/ej2-pdf-export.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

### Local Scripts

When the EJ2 scripts are hosted by the application, preserve the same dependency order.

```html
<script scr="resources/scripts/ej2-base.min.js"></script>
<script scr="resources/scripts/ej2-data.min.js"></script>
<script scr="resources/scripts/ej2-svg-base.min.js"></script>
<script scr="resources/scripts/ej2-charts.min.js"></script>
```

Ensure that every file comes from a compatible EJ2 package version.

## Basic Chart Creation

### TypeScript Line Chart

The following example renders a Line Chart with a Category X-axis.

**index.ts:**

```typescript
import {
  Category,
  Chart,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Category
);

interface MonthlySalesData {
  month: string;
  sales: number;
}

const chartData: MonthlySalesData[] = [
  {
    month: 'Jan',
    sales: 21
  },
  {
    month: 'Feb',
    sales: 28
  },
  {
    month: 'Mar',
    sales: 19
  },
  {
    month: 'Apr',
    sales: 36
  }
];

const chart: Chart = new Chart({
  title: 'Monthly Sales',
  width: '100%',
  height: '420px',
  primaryXAxis: {
    valueType: 'Category',
    labelPlacement: 'OnTicks',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 40,
    interval: 10,
    labelFormat: '{value}%',
    title: 'Sales'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
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

  <title>Monthly Sales Chart</title>

  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="chart"></div>

  index.js"></script>
</body>
</html>
```

**styles.css:**

```css
#chart {
  width: 100%;
  min-height: 420px;
}
```

### JavaScript Line Chart

```javascript
ej.charts.Chart.Inject(
  ej.charts.LineSeries,
  ej.charts.Category
);

var chartData = [
  {
    month: 'Jan',
    sales: 21
  },
  {
    month: 'Feb',
    sales: 28
  },
  {
    month: 'Mar',
    sales: 19
  },
  {
    month: 'Apr',
    sales: 36
  }
];

var chart = new ej.charts.Chart({
  title: 'Monthly Sales',
  width: '100%',
  height: '420px',
  primaryXAxis: {
    valueType: 'Category',
    labelPlacement: 'OnTicks',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 40,
    interval: 10,
    labelFormat: '{value}%',
    title: 'Sales'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

This example:

1. Imports and injects the Line and Category modules.
2. Creates data with category and numeric fields.
3. Maps the fields through `xName` and `yName`.
4. Configures the primary X-axis as a Category axis.
5. Renders a Line series.
6. Appends the chart to the target element.

Use either the constructor target or `appendTo`, but do not attach the same chart instance twice.

Constructor-target pattern:

```typescript
const chart: Chart = new Chart(
  {
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'sales',
        type: 'Line'
      }
    ]
  },
  '#chart'
);
```

Append pattern:

```typescript
const chart: Chart = new Chart({
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

## Data Binding Fundamentals

The Chart can bind local arrays, remote services, and Syncfusion DataManager data sources.

### Local Data

A local data source normally consists of an array of objects.

```typescript
interface BusinessData {
  month: string;
  sales: number;
  revenue: number;
}

const chartData: BusinessData[] = [
  {
    month: 'Jan',
    sales: 35,
    revenue: 42
  },
  {
    month: 'Feb',
    sales: 28,
    revenue: 45
  },
  {
    month: 'Mar',
    sales: 34,
    revenue: 38
  }
];
```

### Mapping Data Fields

Use `xName` and `yName` to map data-source properties to chart points.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Column',
    name: 'Sales'
  }
]
```

- `dataSource` specifies the data collection.
- `xName` specifies the property containing X-values.
- `yName` specifies the property containing Y-values.
- `type` specifies the series type.
- `name` identifies the series in legends and tooltips.

The field mapped through `yName` must contain valid numeric values.

Incorrect:

```typescript
const chartData = [
  {
    month: 'Jan',
    sales: '35'
  }
];
```

Correct:

```typescript
const chartData = [
  {
    month: 'Jan',
    sales: 35
  }
];
```

### Multiple Series

Multiple series can use the same data source with different Y-fields.

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  Legend,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  Legend,
  Tooltip
);

const chart: Chart = new Chart({
  title: 'Monthly Business Performance',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Amount'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  tooltip: {
    enable: true,
    shared: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Dynamic Data Assignment

Replace the series data and call `refresh()`.

```typescript
interface MonthlySalesData {
  month: string;
  sales: number;
}

const updatedData: MonthlySalesData[] = [
  {
    month: 'Jan',
    sales: 40
  },
  {
    month: 'Feb',
    sales: 32
  },
  {
    month: 'Mar',
    sales: 45
  }
];

chart.series[0].dataSource = updatedData;
chart.refresh();
```

Apply all required changes before calling `refresh()` so the chart rerenders only once.

## Theme Selection

### Built-in Themes

Use the chart-level `theme` property to select a theme.

```typescript
const chart: Chart = new Chart({
  theme: 'Material',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Common theme families include:

- `Material`
- `MaterialDark`
- `Material3`
- `Material3Dark`
- `Fabric`
- `FabricDark`
- `Bootstrap`
- `BootstrapDark`
- `Bootstrap4`
- `Bootstrap5`
- `Bootstrap5Dark`
- `Tailwind`
- `TailwindDark`
- `Tailwind3`
- `Tailwind3Dark`
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `HighContrast`

Use an exact theme value supported by the installed package version.

Use `HighContrast`, not `Highcontrast`.

### Custom Color Palettes

Use `palettes`, not `palette`, to supply custom series colors.

```typescript
const chart: Chart = new Chart({
  palettes: [
    '#FF5733',
    '#33A852',
    '#3357FF',
    '#8764B8'
  ],
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

A series-level `fill` can override the color assigned by `palettes`.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Column',
    name: 'Sales',
    fill: '#0F6CBD'
  }
]
```

## Common Configuration

### Chart Dimensions

Use a responsive width and a stable height.

```typescript
const chart: Chart = new Chart({
  width: '100%',
  height: '420px',
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Avoid `height: '100%'` unless the chart's parent hierarchy has explicitly resolved heights.

### Title and Subtitle

Use `title` and `subTitle` to describe the chart.

```typescript
const chart: Chart = new Chart({
  title: 'Quarterly Sales Report',
  subTitle: 'Fiscal Year 2026',
  titleStyle: {
    color: '#242424',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px'
  },
  subTitleStyle: {
    color: '#616161',
    fontFamily: 'Arial',
    fontStyle: 'Italic',
    fontWeight: '400',
    size: '12px'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

### Tooltip Configuration

Import and inject `Tooltip` before enabling the tooltip.

```typescript
import {
  Category,
  Chart,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Category,
  Tooltip
);
```

Configure the tooltip:

```typescript
const chart: Chart = new Chart({
  tooltip: {
    enable: true,
    shared: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

Inline tooltip formatting can be applied inside supported tooltip tokens:

```typescript
tooltip: {
  enable: true,
  format:
    '${series.name}<br>' +
    '${point.x}: ${point.y:n2}'
}
```

Examples include:

- `${point.y:n2}` for two decimal places.
- `${point.y:n0}` for no decimal places.
- `${point.y:c2}` for currency with two decimal places.
- `${point.x:MMM yyyy}` for compatible DateTime values.

### Legend Configuration

Use `legendSettings`, not `legend`.

The Chart legend settings support visibility, position, alignment, background, borders, dimensions, text styles, and custom positioning.

Import and inject `Legend` when the legend is visible.

```typescript
import {
  Chart,
  Legend,
  LineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Legend
);
```

Configure the legend:

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom',
  alignment: 'Center'
}
```

Supported positions include:

- `Auto`
- `Top`
- `Bottom`
- `Left`
- `Right`
- `Custom`

For custom positioning, use `location`:

```typescript
legendSettings: {
  visible: true,
  position: 'Custom',
  location: {
    x: 100,
    y: 50
  }
}
```

## Common Scenarios

### Loading Data from an API

Inject every module used by the resulting chart, including `Tooltip`.

Ensure that DateTime strings returned by an API are converted to JavaScript `Date` objects before assigning them to a DateTime axis.

```typescript
import {
  Chart,
  DateTime,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  DateTime,
  Tooltip
);

interface SalesResponse {
  date: string;
  amount: number;
}

interface SalesData {
  date: Date;
  amount: number;
}

async function loadSalesChart(): Promise<void> {
  try {
    const response: Response =
      await fetch('/api/sales');

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData: SalesResponse[] =
      await response.json();

    const chartData: SalesData[] =
      responseData.map(
        (item: SalesResponse): SalesData => ({
          date: new Date(item.date),
          amount: Number(item.amount)
        })
      );

    const chart: Chart = new Chart({
      title: 'Daily Sales',
      primaryXAxis: {
        valueType: 'DateTime',
        labelFormat: 'dd MMM',
        title: 'Date'
      },
      primaryYAxis: {
        title: 'Amount'
      },
      tooltip: {
        enable: true,
        format:
          '<b>${point.x:dd MMM yyyy}</b><br>' +
          'Amount: ${point.y:c2}'
      },
      series: [
        {
          dataSource: chartData,
          xName: 'date',
          yName: 'amount',
          type: 'Line',
          name: 'Sales'
        }
      ]
    });

    chart.appendTo('#chart');
  } catch (error: unknown) {
    const chartElement: HTMLElement | null =
      document.getElementById('chart');

    if (chartElement) {
      chartElement.textContent =
        'Unable to load the sales chart.';
    }

    console.error(error);
  }
}

void loadSalesChart();
```

Do not assume that raw API date strings are automatically interpreted exactly as intended by the DateTime axis.

### Responsive Chart

The Chart can use a percentage width and fixed or container-resolved height.

```typescript
import {
  Category,
  Chart,
  ColumnSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category
);

interface SalesData {
  category: string;
  value: number;
}

const chartData: SalesData[] = [
  {
    category: 'A',
    value: 35
  },
  {
    category: 'B',
    value: 28
  },
  {
    category: 'C',
    value: 42
  }
];

const chart: Chart = new Chart({
  width: '100%',
  height: '420px',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Use CSS to adjust chart height at application breakpoints.

```css
#chart {
  width: 100%;
  min-height: 420px;
}

@media (max-width: 767px) {
  #chart {
    min-height: 320px;
  }
}
```

Do not call `refresh()` continuously for every raw resize event unless application-specific settings must be changed.

When breakpoint-specific chart settings must change, use a debounced resize handler.

```typescript
let resizeTimer: number | undefined;

const handleResize = (): void => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    const nextHeight: string =
      window.innerWidth < 768
        ? '320px'
        : '420px';

    if (chart.height !== nextHeight) {
      chart.height = nextHeight;
      chart.refresh();
    }
  }, 150);
};

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener('beforeunload', () => {
  window.clearTimeout(resizeTimer);

  window.removeEventListener(
    'resize',
    handleResize
  );

  chart.destroy();
});
```

## Troubleshooting

### Chart Is Not Displayed

- Ensure that `@syncfusion/ej2-charts` is installed.
- Import `Chart`.
- Import and inject the required series module.
- Ensure that the target element exists.
- Ensure that the chart container has a valid height.
- Ensure that `dataSource`, `xName`, and `yName` are configured.
- Ensure that fields mapped through `yName` contain numeric values.
- Check the browser console for runtime errors.

### Line Series Is Not Displayed

- Import and inject `LineSeries`.
- Set the series `type` to `Line`.
- Ensure that the data source contains valid points.
- Ensure that X and Y fields are mapped correctly.

### Category Axis Is Not Displayed

- Import and inject `Category`.
- Set `primaryXAxis.valueType` to `Category`.
- Ensure that `xName` maps to valid category values.

### DateTime Axis Is Not Displayed

- Import and inject `DateTime`.
- Set `primaryXAxis.valueType` to `DateTime`.
- Convert input dates to valid JavaScript `Date` objects.
- Ensure that `xName` maps to the Date field.

### Tooltip Is Not Displayed

- Import and inject `Tooltip`.
- Set `tooltip.enable` to `true`.
- Ensure that no overlay blocks the chart.
- Use valid tooltip tokens.
- Check whether pointer events are disabled by CSS.

### Legend Is Not Displayed

- Import and inject `Legend`.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Assign a meaningful `name` to every series.
- Ensure that the chart has enough space for the legend.

### Custom Colors Are Not Applied

- Use `palettes`, not `palette`.
- Ensure that every palette value is a valid CSS color.
- Check whether a series-level `fill` overrides the palette color.
- Ensure that the series is rendered successfully.

### Theme Is Not Applied

- Use an exact theme name supported by the installed package.
- Check the casing of the theme value.
- Use `HighContrast`, not `Highcontrast`.
- Check whether explicit colors or styles override the theme defaults.

### CDN Chart Is Not Displayed

- Confirm that every CDN URL loads successfully.
- Use matching versions for all EJ2 scripts.
- Load scripts in dependency order.
- Do not combine the consolidated EJ2 script with individual package scripts.
- Use `ej.charts.Chart` from the global namespace.
- Check the browser network panel for failed requests.

### Dynamic Data Is Not Updating

- Assign the updated data to `chart.series[index].dataSource`.
- Preserve the fields configured through `xName` and `yName`.
- Call `chart.refresh()` after completing all updates.
- Ensure that the chart instance has not been destroyed.

## Next Steps

- **Explore chart types:** See `references/chart-types.md`.
- **Configure series:** See `references/series-configuration.md`.
- **Customize axes:** See `references/axes-configuration.md`.
- **Customize appearance:** See `references/styling-appearance.md`.
- **Add interactivity:** See `references/features-interaction.md`.
- **Configure tooltips:** See `references/tooltip-configuration.md`.
- **Configure legends:** See `references/legend-configuration.md`.
- **Configure accessibility:** See `references/accessibility-advanced.md`.
