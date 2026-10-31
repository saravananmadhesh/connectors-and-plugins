# Getting Started with Bullet Chart

## Table of Contents

- [Getting Started with Bullet Chart](#getting-started-with-bullet-chart)
  - [Overview](#overview)
  - [Installation and Setup](#installation-and-setup)
    - [TypeScript Setup](#typescript-setup)
      - [Install the Package](#install-the-package)
      - [Add the HTML Container](#add-the-html-container)
      - [Import and Initialize the Bullet Chart](#import-and-initialize-the-bullet-chart)
      - [Enable the Tooltip](#enable-the-tooltip)
    - [JavaScript CDN Setup](#javascript-cdn-setup)
      - [Create the Bullet Chart](#create-the-bullet-chart)
      - [Enable the JavaScript Tooltip](#enable-the-javascript-tooltip)
  - [Creating Your First Bullet Chart](#creating-your-first-bullet-chart)
    - [TypeScript Example](#typescript-example)
    - [JavaScript Example](#javascript-example)
  - [Basic Configuration](#basic-configuration)
    - [Scale and Qualitative Ranges](#scale-and-qualitative-ranges)
    - [Title and Subtitle](#title-and-subtitle)
    - [Multiple Categories](#multiple-categories)
    - [Tooltip](#tooltip)
    - [Legend](#legend)
  - [Themes](#themes)
  - [Data Binding](#data-binding)
    - [Local Data](#local-data)
    - [Asynchronous Data](#asynchronous-data)
  - [Responsive Container](#responsive-container)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Common Setup Issues](#common-setup-issues)
    - [Container Is Not Found](#container-is-not-found)
    - [Tooltip Is Not Displayed](#tooltip-is-not-displayed)
    - [Legend Is Not Displayed](#legend-is-not-displayed)
    - [Data Is Not Displayed](#data-is-not-displayed)
    - [Theme Is Not Applied](#theme-is-not-applied)
    - [Layout Is Collapsed](#layout-is-collapsed)
    - [API Data Is Invalid](#api-data-is-invalid)
  - [Next Steps](#next-steps)


## Overview

The EJ2 Bullet Chart compares one or more actual values against target values. Qualitative ranges can be used to communicate performance levels such as poor, satisfactory, and good.

The Bullet Chart supports horizontal and vertical orientations, multiple measures, multiple targets, qualitative ranges, labels, ticks, tooltips, themes, accessibility, and right-to-left rendering.

The primary data mappings are:

- `valueField` for the actual value.
- `targetField` for the comparative target.
- `categoryField` for the optional category label.
- `dataSource` for the data collection.

## Installation and Setup

### TypeScript Setup

#### Install the Package

```bash
npm install @syncfusion/ej2-charts
```

Installing `@syncfusion/ej2-charts` installs its required package dependencies. Do not install `@syncfusion/ej2-base` separately unless the application directly requires it for another reason.

The Bullet Chart is exported from:

```text
@syncfusion/ej2-charts
```

Its package dependencies include:

```text
@syncfusion/ej2-base
@syncfusion/ej2-data
@syncfusion/ej2-svg-base
```

Additional packages such as `@syncfusion/ej2-pdf-export`, `@syncfusion/ej2-file-utils`, and `@syncfusion/ej2-compression` are required only for the corresponding export features.

#### Add the HTML Container

```html
<div id="bullet-chart"></div>
```

Add a stable container size:

```css
#bullet-chart {
  width: 100%;
  min-height: 400px;
}
```

#### Import and Initialize the Bullet Chart

A basic Bullet Chart does not require feature-module injection.

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';

interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 55,
    target: 75,
    category: 'Sales'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Syncfusion TypeScript getting-started documentation initializes `BulletChart` from `@syncfusion/ej2-charts` and appends it to an existing HTML element.

#### Enable the Tooltip

Import and inject `BulletTooltip` before enabling the tooltip.

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);
```

Configure the tooltip:

```typescript
tooltip: {
  enable: true
}
```

### JavaScript CDN Setup

The simplest standalone JavaScript setup uses the consolidated EJ2 CDN script.

Use a consistent, pinned version in production.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>
```

Do not combine the consolidated EJ2 script with individual package scripts.

When individual package scripts are required, load them in dependency order:

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

Use the same version for every EJ2 package.

#### Create the Bullet Chart

```html
<div id="bullet-chart"></div>

<script>
  var chartData = [
    {
      value: 55,
      target: 75,
      category: 'Sales'
    }
  ];

  var bulletChart =
    new ej.charts.BulletChart({
      dataSource: chartData,
      valueField: 'value',
      targetField: 'target',
      categoryField: 'category',
      minimum: 0,
      maximum: 100,
      interval: 20
    });

  bulletChart.appendTo(
    '#bullet-chart'
  );
</script>
```

#### Enable the JavaScript Tooltip

```javascript
ej.charts.BulletChart.Inject(
  ej.charts.BulletTooltip
);
```

```javascript
tooltip: {
  enable: true
}
```

## Creating Your First Bullet Chart

A basic Bullet Chart requires:

- A data collection.
- A field containing actual values.
- A field containing target values.
- A valid HTML container.
- A scale that includes the actual and target values.

The category field is optional but recommended when the Chart contains multiple rows.

### TypeScript Example

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';

interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 55,
    target: 75,
    category: 'Sales'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### JavaScript Example

```javascript
var chartData = [
  {
    value: 55,
    target: 75,
    category: 'Sales'
  }
];

var bulletChart =
  new ej.charts.BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

## Basic Configuration

### Scale and Qualitative Ranges

Use `minimum`, `maximum`, and `interval` to configure the scale.

Use `ranges` to display qualitative performance regions.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 55,
        target: 75,
        category: 'Sales'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    ranges: [
      {
        end: 35,
        color:
          'rgba(209, 52, 56, 0.25)'
      },
      {
        end: 70,
        color:
          'rgba(193, 156, 0, 0.25)'
      },
      {
        end: 100,
        color:
          'rgba(16, 124, 16, 0.25)'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Each `end` value defines the upper boundary of its qualitative range.

Ensure that:

- Range boundaries increase in ascending order.
- The final range includes the configured maximum.
- Range colors provide sufficient contrast.
- Performance meaning is not communicated through color alone.

### Title and Subtitle

Use `title` and `subtitle`.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    title: 'Sales Performance',
    subtitle: 'Quarter 1, 2026',
    dataSource: [
      {
        value: 55,
        target: 75,
        category: 'Sales'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The property is `subtitle` with a lowercase `t`.

Syncfusion Bullet Chart customization examples use `title` and `subtitle` directly in the Bullet Chart configuration.

### Multiple Categories

Use `categoryField` to display a label for every measure.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 55,
    target: 75,
    category: 'Revenue'
  },
  {
    value: 82,
    target: 90,
    category: 'Profit'
  },
  {
    value: 38,
    target: 60,
    category: 'Growth'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    height: '400px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Tooltip

Import and inject `BulletTooltip`.

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);
```

Enable the tooltip:

```typescript
tooltip: {
  enable: true
}
```

Complete configuration:

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    tooltip: {
      enable: true
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The tooltip displays information about actual measures and target values.
### Legend

Import and inject `BulletChartLegend` when the Bullet Chart legend is required.

```typescript
import {
  BulletChart,
  BulletChartLegend
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletChartLegend
);
```

Configure the legend:

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom'
}
```

Use `BulletChartLegend`, not an unverified `BulletLegend` module.

Use `legendSettings`, not `legend`.

## Themes

Use the Bullet Chart `theme` property.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    theme: 'Material',
    dataSource: [
      {
        value: 55,
        target: 75
      }
    ],
    valueField: 'value',
    targetField: 'target'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
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
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `Tailwind`
- `TailwindDark`
- `Tailwind3`
- `Tailwind3Dark`
- `HighContrast`

Use an exact theme name supported by the installed `@syncfusion/ej2-charts` version.

Use `HighContrast`, not `Highcontrast`.

The Bullet Chart supports theme selection through its `theme` property.

A standalone Bullet Chart renders its core SVG content without requiring a Bullet Chart-specific stylesheet. Application CSS is still required for container sizing and surrounding controls.

## Data Binding

### Local Data

```typescript
interface TeamPerformance {
  value: number;
  target: number;
  category: string;
  revenue: number;
}

const salesData:
  TeamPerformance[] = [
    {
      value: 85,
      target: 90,
      category: 'Team A',
      revenue: 50000
    },
    {
      value: 65,
      target: 80,
      category: 'Team B',
      revenue: 35000
    },
    {
      value: 72,
      target: 78,
      category: 'Team C',
      revenue: 42000
    }
  ];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: salesData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Ensure that `value` and `target` contain finite numbers.

### Asynchronous Data

Validate the response before creating the Bullet Chart.

```typescript
interface ApiPerformanceData {
  value: string | number;
  target: string | number;
  category: string;
}

interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

async function loadBulletChart():
  Promise<void> {
  try {
    const response: Response =
      await fetch(
        '/api/sales-metrics'
      );

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData:
      ApiPerformanceData[] =
      await response.json()
        as ApiPerformanceData[];

    const chartData:
      PerformanceData[] =
      responseData
        .map(
          (
            item:
              ApiPerformanceData
          ): PerformanceData => ({
            value:
              Number(item.value),
            target:
              Number(item.target),
            category:
              String(
                item.category
              )
          })
        )
        .filter(
          (
            item:
              PerformanceData
          ): boolean =>
            Number.isFinite(
              item.value
            ) &&
            Number.isFinite(
              item.target
            ) &&
            item.category.length > 0
        );

    const bulletChart:
      BulletChart =
      new BulletChart({
        dataSource: chartData,
        valueField: 'value',
        targetField: 'target',
        categoryField: 'category',
        minimum: 0,
        maximum: 100,
        interval: 20
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );
  } catch (error: unknown) {
    console.error(
      'Unable to load Bullet Chart data.',
      error
    );

    const chartElement:
      HTMLElement | null =
      document.getElementById(
        'bullet-chart'
      );

    if (chartElement) {
      chartElement.textContent =
        'Unable to load the performance data.';
    }
  }
}

void loadBulletChart();
```

## Responsive Container

Use CSS to control the host dimensions.

```html
<div
  id="bullet-chart"
  class="bullet-chart-container"
></div>
```

```css
.bullet-chart-container {
  width: 100%;
  max-width: 1200px;
  min-height: 400px;
  margin-inline: auto;
}

@media (max-width: 767px) {
  .bullet-chart-container {
    min-height: 320px;
  }
}
```

Avoid `height: '100%'` unless every relevant parent has a resolved height.

## Complete TypeScript Example

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);

interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 85,
    target: 90,
    category: 'Team A'
  },
  {
    value: 65,
    target: 80,
    category: 'Team B'
  },
  {
    value: 72,
    target: 78,
    category: 'Team C'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    title: 'Team Performance',
    subtitle: 'Fiscal Year 2026',
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    height: '400px',
    width: '100%',
    ranges: [
      {
        end: 40,
        color:
          'rgba(209, 52, 56, 0.25)'
      },
      {
        end: 70,
        color:
          'rgba(193, 156, 0, 0.25)'
      },
      {
        end: 100,
        color:
          'rgba(16, 124, 16, 0.25)'
      }
    ],
    tooltip: {
      enable: true
    },
    animation: {
      enable: true
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);

window.addEventListener(
  'beforeunload',
  (): void => {
    bulletChart.destroy();
  }
);
```

**HTML:**

```html
<section aria-labelledby="performance-heading">
  <h1 id="performance-heading">
    Team Performance
  </h1>

  <p id="performance-summary">
    The Bullet Chart compares actual team performance
    with the target assigned to each team.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary"
  ></div>
</section>
```

**CSS:**

```css
#bullet-chart {
  width: 100%;
  min-height: 400px;
}
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

  <title>Syncfusion Bullet Chart</title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #bullet-chart {
      width: 100%;
      min-height: 400px;
    }
  </style>
</head>

<body>
  <section aria-labelledby="performance-heading">
    <h1 id="performance-heading">
      Team Performance
    </h1>

    <p id="performance-summary">
      The Bullet Chart compares actual team performance
      with the target assigned to each team.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="performance-summary"
    ></div>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    var chartData = [
      {
        value: 85,
        target: 90,
        category: 'Team A'
      },
      {
        value: 65,
        target: 80,
        category: 'Team B'
      },
      {
        value: 72,
        target: 78,
        category: 'Team C'
      }
    ];

    var bulletChart =
      new ej.charts.BulletChart({
        title: 'Team Performance',
        subtitle: 'Fiscal Year 2026',
        dataSource: chartData,
        valueField: 'value',
        targetField: 'target',
        categoryField: 'category',
        minimum: 0,
        maximum: 100,
        interval: 20,
        labelFormat: '{value}%',
        height: '400px',
        width: '100%',
        ranges: [
          {
            end: 40,
            color:
              'rgba(209, 52, 56, 0.25)'
          },
          {
            end: 70,
            color:
              'rgba(193, 156, 0, 0.25)'
          },
          {
            end: 100,
            color:
              'rgba(16, 124, 16, 0.25)'
          }
        ],
        tooltip: {
          enable: true
        },
        animation: {
          enable: true
        }
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    window.addEventListener(
      'beforeunload',
      function () {
        bulletChart.destroy();
      }
    );
  </script>
</body>
</html>
```

## Common Setup Issues

### Container Is Not Found

**Problem:**

The Bullet Chart cannot be appended because the target element does not exist.

**Solution:**

Create the Bullet Chart only after the host is available.

```typescript
const container:
  HTMLElement | null =
  document.getElementById(
    'bullet-chart'
  );

if (!container) {
  throw new Error(
    'The Bullet Chart container was not found.'
  );
}

const bulletChart:
  BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target'
  });

bulletChart.appendTo(
  container
);
```

### Tooltip Is Not Displayed

- Import `BulletTooltip`.
- Inject it through `BulletChart.Inject`.
- Set `tooltip.enable` to `true`.
- Ensure that another element does not block pointer interaction.
- Ensure that the data contains valid actual and target values.

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);
```

### Legend Is Not Displayed

- Import and inject `BulletChartLegend`.
- Set `legendSettings.visible` to `true`.
- Use valid legend names where required.
- Ensure that sufficient space is available.

```typescript
import {
  BulletChart,
  BulletChartLegend
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletChartLegend
);
```

Do not import an unverified `BulletLegend` module.

### Data Is Not Displayed

- Ensure that `dataSource` contains records.
- Ensure that `valueField` matches the actual-value field.
- Ensure that `targetField` matches the target-value field.
- Ensure that actual and target values are numeric.
- Ensure that `minimum`, `maximum`, and `interval` include the values.
- Ensure that the final qualitative range includes the scale maximum.

### Theme Is Not Applied

- Set the `theme` property.
- Use an exact theme supported by the installed package.
- Use `HighContrast`, not `Highcontrast`.
- Check whether explicit colors override theme defaults.

### Layout Is Collapsed

- Give the host a stable height or `min-height`.
- Ensure that the parent container is visible.
- Do not use percentage height without resolved parent heights.
- Use `width: '100%'` for responsive layouts.

### API Data Is Invalid

- Check the HTTP response status.
- Convert numeric strings to numbers.
- Remove or report invalid records.
- Ensure that category values are strings.
- Display an accessible error message when data loading fails.

## Next Steps

- **Customize value and target bars:** See `references/value-bar-and-comparative-bar.md`.
- **Configure axes and ranges:** See `references/axis-customization.md`.
- **Configure data and labels:** See `references/data-binding-and-labels.md`.
- **Configure titles, tooltips, and interaction:** See `references/title-tooltip-and-interactivity.md`.