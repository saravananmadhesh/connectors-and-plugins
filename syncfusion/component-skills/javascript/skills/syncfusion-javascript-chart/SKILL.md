---
name: syncfusion-javascript-chart
description: Implements Syncfusion JavaScript chart controls (Line, Area, Bar, Column, Pie, Polar, Radar, Waterfall, Stock). Use when building interactive data visualizations, dashboards, or real-time charts. Covers series and axes configuration, styling, animations, exporting, and technical indicators. Works with TypeScript (webpack/modules) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Charts in Syncfusion TypeScript & JavaScript

The Syncfusion EJ2 Charts package provides a comprehensive collection of visualization components for building interactive, data-driven applications and dashboards.

Use the appropriate component for the required visualization:

- Use `Chart` for Cartesian, statistical, financial, Polar, and Radar series.
- Use `AccumulationChart` for Pie, Doughnut, Funnel, and Pyramid visualizations.
- Use `StockChart` for financial dashboards that require built-in range selection, periods, indicators, and stock-specific controls.

The package supports multiple series, axes, technical indicators, trendlines, animations, export, printing, accessibility, right-to-left rendering, and real-time data updates.

## Platform Support

This skill covers TypeScript and JavaScript implementations.

### TypeScript

TypeScript implementations use:

- Package installation through npm.
- Module-based imports from `@syncfusion/ej2-charts`.
- Feature registration through `Chart.Inject(...)`.
- Typed data models.
- Typed event arguments.
- A bundler such as webpack or Vite.
- Full IDE and compiler support.

### JavaScript

JavaScript implementations use:

- Consolidated or individual CDN scripts.
- Local ES5 script files where required.
- The global `ej.charts` namespace.
- Feature registration through `ej.charts.Chart.Inject(...)`.
- No required TypeScript compilation step.

The configuration model is generally equivalent between TypeScript and JavaScript. However, package loading, imports, module injection, global namespace access, and type annotations differ between platforms.

## When to Use This Skill

Use this skill when you need to:

- **Create Cartesian Charts:** Build Line, Spline, Area, Bar, Column, Scatter, Bubble, Range, Step, Histogram, Box and Whisker, Waterfall, Pareto, or financial Charts.
- **Create Accumulation Charts:** Build Pie, Doughnut, Funnel, or Pyramid visualizations with `AccumulationChart`.
- **Create financial dashboards:** Use Candle, Hilo, HiloOpenClose, indicators, trendlines, or `StockChart`.
- **Visualize complex data:** Configure multiple series, stacked series, grouped data, multiple axes, and chart panes.
- **Build interactive dashboards:** Combine Charts with dynamic or real-time data.
- **Customize appearance:** Configure palettes, fills, gradients, typography, borders, backgrounds, themes, and responsive behavior.
- **Add interactivity:** Enable tooltips, crosshairs, trackball-style interaction, legends, highlighting, selection, zooming, and panning.
- **Implement advanced analysis:** Add technical indicators, trendlines, annotations, and financial analysis.
- **Export or print Charts:** Export to supported image, document, or data formats and print rendered Charts.
- **Optimize performance:** Filter, aggregate, limit, or progressively load large datasets and use Canvas rendering when appropriate.
- **Support accessibility:** Configure descriptions, keyboard navigation, focus styling, screen-reader support, accessible summaries, data tables, and RTL layouts.
- **Troubleshoot applications:** Diagnose rendering, data binding, module injection, browser compatibility, and performance issues.

## Component Selection

Select the component before implementing the visualization.

### Use Chart

Use `Chart` for:

- Line and Spline.
- Area and stacked Area.
- Bar and Column.
- Scatter and Bubble.
- Range series.
- Step series.
- Histogram.
- Box and Whisker.
- Waterfall.
- Pareto.
- Polar and Radar.
- Candle, Hilo, and HiloOpenClose.
- Technical indicators.
- Trendlines.

### Use AccumulationChart

Use `AccumulationChart` for:

- Pie.
- Doughnut.
- Funnel.
- Pyramid.

A Doughnut Chart is a Pie series with a nonzero `innerRadius`.

Do not configure:

```typescript
type: 'Doughnut'
```

Use:

```typescript
type: 'Pie',
innerRadius: '50%'
```

### Use StockChart

Use `StockChart` when the application requires a stock-focused interface with features such as:

- Built-in range selection.
- Period selectors.
- Financial series switching.
- Technical indicators.
- Stock-specific toolbars.
- Financial export and print controls.

## Navigation Guide

Read only the reference files relevant to the user's task.

### WebMCP for TypeScript and JavaScript

📄 **Read:** [TypeScript API Reference](references/API-Reference_TypeScript.md) and [JavaScript API Reference](references/API-Reference_JavaScript.md)

- TypeScript WebMCP samples must import and inject every available Chart feature module, including `WebMcpChart`.
- Do not reduce TypeScript imports or injections based on the initial series type.
- Browser JavaScript WebMCP samples that use the global EJ2 bundle must contain no imports and no injection calls.
- JavaScript samples must use `new ej.charts.Chart(...)` after loading the all-in-one browser script.
- Both languages must use a stable Chart ID, automatic registration, and verified WebMCP tool names.
- Never generate `registerWebMcpTools()` or a manual registration button.

### Getting Started

Read `references/getting-started.md` for:

- Package installation.
- TypeScript and JavaScript setup.
- Module injection.
- Basic Chart creation.
- Local data binding.
- Theme selection.
- Initial troubleshooting.

### Chart Types & Selection

Read `references/chart-types.md` for:

- Cartesian Chart types.
- Statistical and specialized Charts.
- Financial series.
- Polar and Radar Charts.
- Pie, Doughnut, Funnel, and Pyramid component selection.
- Guidelines for choosing an appropriate visualization.
- Required modules for each Chart type.

### Series Configuration

Read `references/series-configuration.md` for:

- Series properties and mappings.
- Multiple series.
- Data labels.
- Markers.
- Series borders and fills.
- Stacking and grouping.
- Stacking groups.
- Empty-point handling.
- Multi-axis series.

### Axes Customization

Read `references/axes-customization.md` for:

- Numeric, Category, DateTime, DateTimeCategory, and Logarithmic axes.
- Axis labels and formatting.
- Axis ranges and scaling.
- Multiple axes.
- Multiple panes.
- Axis positioning.
- Grid and tick lines.
- Strip lines.

### Features & Interaction

Read `references/features-interaction.md` for:

- Tooltips and inline tooltip formatting.
- Shared tooltips.
- Crosshairs.
- Trackball-style interaction.
- Legends and highlighting.
- Point, series, and cluster selection.
- Zooming and panning.
- Chart annotations.
- Interaction events.

### Styling & Appearance

Read `references/styling-appearance.md` for:

- Custom color palettes.
- Data-driven and conditional point colors.
- Linear and radial gradients.
- Typography.
- Borders and backgrounds.
- Chart-area styling.
- Responsive layouts.
- Built-in themes.
- Dynamic theme switching.

### Advanced Features

Read `references/advanced-features.md` for:

- Technical indicators.
- SMA, EMA, MACD, RSI, ATR, Bollinger Bands, and Stochastic indicators.
- Trendlines and forecasting.
- Animation.
- Export to supported image, document, and data formats.
- Printing.
- Reduced-motion handling.

### Data Handling & Updates

Read `references/data-handling.md` for:

- Dynamic data replacement.
- Adding, updating, and removing points.
- Real-time Charts.
- WebSocket updates.
- API polling.
- Drag-based data editing.
- Local and remote data sources.
- `DataManager`.
- CSV data.
- Large-dataset filtering and aggregation.
- Resource cleanup.

### Accessibility & RTL Support

Read `references/accessibility-rtl.md` for:

- WCAG and WAI-ARIA support.
- Chart-level accessibility configuration.
- Series and point accessibility.
- Keyboard navigation.
- Focus-border customization.
- Screen-reader summaries.
- Semantic data tables.
- ARIA live-region announcements.
- Color and contrast guidance.
- Right-to-left rendering.
- Dynamic language switching.

### Troubleshooting & Optimization

Read `references/troubleshooting.md` for:

- Blank or missing Charts.
- Invalid field mappings.
- Missing module injection.
- Tooltip and legend issues.
- Memory cleanup.
- TypeScript and CDN issues.
- SVG and Canvas rendering.
- Large-dataset optimization.
- Browser compatibility.
- Debugging strategies.

## Core Implementation Rules

Follow these rules for every implementation.

### Select the Correct Component

- Use `Chart` for Cartesian, statistical, Polar, Radar, and financial series.
- Use `AccumulationChart` for Pie, Doughnut, Funnel, and Pyramid.
- Use `StockChart` when built-in stock-specific controls are required.
- Do not mix APIs belonging to different Chart components.

### Inject Required Modules

Import and inject every series, axis, and feature module used by the configuration.

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

Common examples include:

- `LineSeries` for Line Charts.
- `ColumnSeries` for Column Charts.
- `StackingColumnSeries` for stacked Column Charts.
- `Category` for Category axes.
- `DateTime` for DateTime axes.
- `Tooltip` for tooltips.
- `Legend` for legends.
- `Selection` for selection.
- `Zoom` for zooming and panning.
- `DataLabel` for Cartesian Chart data labels.
- `Trendlines` for trendlines.
- `Export` for exporting.
- `ChartAnnotation` for annotations.

### Preserve Valid Field Mappings

Always configure:

```typescript
dataSource
xName
yName
```

Ensure that:

- The mapped fields exist.
- Y-values are numeric.
- DateTime values are valid JavaScript `Date` objects.
- Range and financial series include all required field mappings.

### Use Correct Chart-Level Properties

Use:

```typescript
legendSettings
palettes
selectionMode
zoomSettings
annotations
indicators
accessibility
```

Do not use:

```typescript
legend
palette
selection
annotation
```

### Use Correct Cartesian Data Label Placement

For a regular Cartesian `Chart`, configure data labels through:

```typescript
marker: {
  dataLabel: {
    visible: true
  }
}
```

Do not place `dataLabel` directly at the Cartesian series root.

### Use Either Constructor Target or appendTo

Constructor target:

```typescript
const chart: Chart = new Chart(
  {
    series: []
  },
  '#chart'
);
```

`appendTo` pattern:

```typescript
const chart: Chart = new Chart({
  series: []
});

chart.appendTo('#chart');
```

Do not attach the same instance twice.

### Clean Up Resources

When permanently removing a Chart:

- Clear intervals and timeouts.
- Close WebSocket connections.
- Remove application-owned event listeners.
- Call `chart.destroy()`.

## Quick Start Example

### TypeScript

Install the package:

```bash
npm install @syncfusion/ej2-charts
```

Add the Chart container:

```html
<div id="chart"></div>
```

Add a stable container size:

```css
#chart {
  width: 100%;
  min-height: 420px;
}
```

Create the Chart:

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

interface SalesData {
  date: Date;
  value: number;
}

const chart[To('#chart');
 attach the same instance twice.

 Up Resourcesvalue: 21
  },
  {
    date: new Date(2026, 0, 2),
    value: 24
  },
  {
    date: new Date(2026, 0, 3),
    value: 36
  },
  {
    date: new Date(2026, 0, 4),
    value: 38
  },
  {
    date: new Date(2026, 0, 5),
    value: 54
  }
];

const chart: Chart = new Chart({
  title: 'Sales Over Time',
  primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'dd MMM',
    title: 'Date'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x:dd MMM yyyy}</b><br>' +
      'Sales: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      yName: 'value',
      type: 'Line',
      name: 'Sales',
      marker: {
        visible: true
      }
    }
  ]
});

chart.appendTo('#chart');
```

Module purpose:

- `LineSeries` renders the Line series.
- `DateTime` supports the DateTime X-axis.
- `Tooltip` enables point tooltips.

### JavaScript with Consolidated CDN Script

Use a consistent, pinned EJ2 version in production.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Sales Chart</title>

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

  <script>
    ej.charts.Chart.Inject(
      ej.charts.LineSeries,
      ej.charts.DateTime,
      ej.charts.Tooltip
    );

    var chartData = [
      {
        date: new Date(2026, 0, 1),
        value: 21
      },
      {
        date: new Date(2026, 0, 2),
        value: 24
      },
      {
        date: new Date(2026, 0, 3),
        value: 36
      },
      {
        date: new Date(2026, 0, 4),
        value: 38
      },
      {
        date: new Date(2026, 0, 5),
        value: 54
      }
    ];

    var chart = new ej.charts.Chart({
      title: 'Sales Over Time',
      primaryXAxis: {
        valueType: 'DateTime',
        labelFormat: 'dd MMM',
        title: 'Date'
      },
      primaryYAxis: {
        title: 'Sales'
      },
      tooltip: {
        enable: true,
        format:
          '<b>${point.x:dd MMM yyyy}</b><br>' +
          'Sales: ${point.y:n2}'
      },
      series: [
        {
          dataSource: chartData,
          xName: 'date',
          yName: 'value',
          type: 'Line',
          name: 'Sales',
          marker: {
            visible: true
          }
        }
      ]
    });

    chart.appendTo('#chart');
  </script>
</body>
</html>
```

### JavaScript with Individual CDN Scripts

When individual package scripts are required, load them in dependency order and use the same version.

```html
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

Do not load the consolidated EJ2 script together with individual package scripts.

## Common Patterns

### Pattern 1: Multi-Series Column Chart

Use regular Column series for side-by-side comparison.

Required modules:

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
```

Configuration:

```typescript
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
],
legendSettings: {
  visible: true,
  position: 'Bottom'
},
tooltip: {
  enable: true,
  shared: true
}
```

### Pattern 2: Stacked Column Chart with Legend

Required modules:

```typescript
import {
  Category,
  Chart,
  Legend,
  StackingColumnSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  StackingColumnSeries,
  Category,
  Legend,
  Tooltip
);
```

Configuration:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'category',
    yName: 'value1',
    type: 'StackingColumn',
    name: 'Current'
  },
  {
    dataSource: chartData,
    xName: 'category',
    yName: 'value2',
    type: 'StackingColumn',
    name: 'Previous'
  }
],
legendSettings: {
  visible: true,
  position: 'Bottom'
},
tooltip: {
  enable: true,
  shared: true
}
```

Use `StackingColumn100` when each category must be normalized to 100 percent.

### Pattern 3: Real-Time Data Update

Use a bounded data window and disable animation for frequent updates.

```typescript
interface RealTimeData {
  timestamp: Date;
  value: number;
}

let realTimeData: RealTimeData[] = [];

const maximumVisiblePoints: number = 100;

const updateInterval: number =
  window.setInterval(() => {
    const nextPoint: RealTimeData = {
      timestamp: new Date(),
      value:
        Math.round(
          Math.random() * 10000
        ) / 100
    };

    realTimeData = [
      ...realTimeData,
      nextPoint
    ].slice(-maximumVisiblePoints);

    chart.series[0].dataSource =
      realTimeData;

    chart.refresh();
  }, 5000);

window.addEventListener(
  'beforeunload',
  (): void => {
    window.clearInterval(
      updateInterval
    );

    chart.destroy();
  }
);
```

Apply all changes before calling `refresh()`.

### Pattern 4: Interactive Point Selection

Inject `Selection`.

```typescript
import {
  Chart,
  ColumnSeries,
  Selection
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Selection
);
```

Configure selection through Chart-level properties:

```typescript
const chart: Chart = new Chart({
  selectionMode: 'Point',
  isMultiSelect: false,
  selectionPattern:
    'DiagonalForward',
  selectionComplete: (args): void => {
    console.log(
      'Selected values:',
      args.selectedDataValues
    );
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

Do not use `pointRender` as a selection event. `pointRender` customizes points before they are rendered.

### Pattern 5: Pie and Doughnut Charts

Use `AccumulationChart`.

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries
);

const pieChart:
  AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

pieChart.appendTo('#chart');
```

Create a Doughnut Chart by setting `innerRadius`.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'category',
    yName: 'value',
    type: 'Pie',
    innerRadius: '50%'
  }
]
```

### Pattern 6: Technical Indicator

Technical indicators belong in the Chart-level `indicators` collection.

```typescript
import {
  CandleSeries,
  Chart,
  DateTime,
  LineSeries,
  SmaIndicator
} from '@syncfusion/ej2-charts';

Chart.Inject(
  CandleSeries,
  LineSeries,
  DateTime,
  SmaIndicator
);
```

```typescript
series: [
  {
    dataSource: stockData,
    xName: 'date',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    type: 'Candle',
    name: 'Price'
  }
],
indicators: [
  {
    dataSource: stockData,
    xName: 'date',
    close: 'close',
    type: 'Sma',
    period: 20,
    seriesName: 'Price',
    name: 'SMA 20'
  }
]
```

Do not add an indicator to the normal `series` collection.

## Key Properties

### Chart-Level Properties

- `primaryXAxis`: Configures the primary X-axis.
- `primaryYAxis`: Configures the primary Y-axis.
- `axes`: Defines additional axes.
- `rows`: Defines horizontal Chart panes.
- `columns`: Defines vertical Chart panes.
- `series`: Defines Cartesian and financial series.
- `indicators`: Defines technical indicators.
- `annotations`: Defines custom HTML annotations.
- `tooltip`: Configures Chart tooltips.
- `legendSettings`: Configures the legend.
- `crosshair`: Configures crosshair interaction.
- `zoomSettings`: Configures zooming and panning.
- `selectionMode`: Configures point, series, or cluster selection.
- `selectedDataIndexes`: Defines initial selection.
- `palettes`: Defines the Chart color collection.
- `theme`: Selects a built-in theme.
- `background`: Configures the Chart background.
- `chartArea`: Configures the plotting area.
- `title`: Defines the Chart title.
- `subTitle`: Defines the Chart subtitle.
- `height`: Configures the Chart height.
- `width`: Configures the Chart width.
- `enableCanvas`: Enables Canvas rendering.
- `enableRtl`: Enables right-to-left rendering.
- `accessibility`: Configures Chart-level accessibility.

### Series-Level Properties

- `dataSource`: Defines the series data.
- `xName`: Maps the X-value field.
- `yName`: Maps the numeric Y-value field.
- `type`: Selects the series type.
- `name`: Defines the legend and tooltip series name.
- `visible`: Controls initial series visibility.
- `fill`: Configures the series color.
- `width`: Configures compatible line width.
- `opacity`: Configures series opacity.
- `border`: Configures series borders.
- `marker`: Configures point markers.
- `marker.dataLabel`: Configures Cartesian Chart data labels.
- `pointColorMapping`: Maps point colors from the data source.
- `emptyPointSettings`: Configures missing values.
- `trendlines`: Defines trendlines for a compatible series.
- `animation`: Configures series animation.
- `xAxisName`: Associates a series with a named X-axis.
- `yAxisName`: Associates a series with a named Y-axis.
- `stackingGroup`: Groups compatible stacked series.
- `accessibility`: Configures series and point accessibility.

### AccumulationChart Properties

- `series`: Defines Pie, Doughnut, Funnel, or Pyramid series.
- `legendSettings`: Configures the accumulation legend.
- `tooltip`: Configures accumulation tooltips.
- `enableSmartLabels`: Reduces label overlap.
- `accessibilityDescription`: Describes the visualization.
- `focusable`: Controls Chart focusability.
- `focusBorderColor`: Configures the focus border.
- `focusBorderWidth`: Configures focus-border width.
- `focusBorderMargin`: Configures focus-border spacing.

### WebMCP Language Rules

#### TypeScript

```ts
import { Chart, WebMcpChart } from '@syncfusion/ej2-charts';

// The complete WebMCP sample must import and inject all available Chart feature modules.
Chart.Inject(WebMcpChart);
```

#### JavaScript

```js
// No imports and no Chart.Inject(...) for global-bundle JavaScript WebMCP samples.
var chart = new ej.charts.Chart({ enableWebMcp: true });
```
