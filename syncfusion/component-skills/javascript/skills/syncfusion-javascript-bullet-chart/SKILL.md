---
name: syncfusion-javascript-bullet-chart
description: Create interactive bullet charts in Syncfusion TypeScript and JavaScript. Immediately use this skill when user needs to build bullet charts, visualize performance metrics, create comparative analyses, configure ranges/bars, customize appearance, add interactivity, or implement performance dashboards. Includes range configuration, bar customization, axis control, data binding, animations, and export functionality. Works with TypeScript (webpack/module-based) and JavaScript (CDN/ES5).
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Bullet Charts in Syncfusion TypeScript & JavaScript

The Syncfusion EJ2 Bullet Chart is a specialized visualization component for comparing actual values against target values within a quantitative scale. Qualitative ranges can provide performance context such as below expectations, approaching target, and target achieved.

The Bullet Chart supports:

- Single and multiple performance measures.
- Actual-value bars.
- One or more target markers.
- Qualitative performance ranges.
- Horizontal and vertical orientations.
- Major and minor scale ticks.
- Numeric and category labels.
- Data labels for actual values.
- Tooltip templates.
- Animation.
- Themes.
- Right-to-left rendering.
- Browser printing.
- Dynamic data updates.
- Accessibility and keyboard support.

## Platform Support

This skill covers both TypeScript and JavaScript implementations.

### TypeScript

TypeScript implementations use:

- npm package installation.
- Imports from `@syncfusion/ej2-charts`.
- Feature-module injection through `BulletChart.Inject(...)`.
- Typed data interfaces.
- Typed application event handlers.
- A bundler such as webpack or Vite.
- IDE and compiler support.

### JavaScript

JavaScript implementations use:

- A consolidated EJ2 CDN script.
- Individual CDN package scripts when required.
- Locally hosted ES5 scripts where required.
- The global `ej.charts` namespace.
- Feature-module injection through `ej.charts.BulletChart.Inject(...)`.
- No TypeScript compilation step.

The configuration model is generally equivalent between TypeScript and JavaScript. Package loading, imports, typing, module injection, and event-listener syntax differ between platforms.

## When to Use This Skill

Use this skill when you need to:

- **Display performance metrics:** Compare actual values with targets.
- **Build KPI dashboards:** Monitor sales, revenue, quality, completion, service levels, or operational metrics.
- **Display multiple measures:** Show related performance records with category labels.
- **Configure targets:** Display one or more comparative markers.
- **Configure qualitative ranges:** Define performance zones such as poor, satisfactory, good, and excellent.
- **Customize actual and target measures:** Configure shapes, colors, borders, thickness, and target-marker styles.
- **Configure the scale:** Set minimum, maximum, interval, tick placement, label placement, and number formatting.
- **Display actual-value labels:** Enable and style Bullet Chart data labels.
- **Add tooltips:** Display actual and target values through tooltip templates.
- **Support dynamic updates:** Replace data, refresh performance values, and implement polling.
- **Customize layout:** Configure orientation, dimensions, responsive behavior, themes, and RTL rendering.
- **Print or download output:** Print the report or serialize the rendered SVG for an application-owned download.
- **Support accessibility:** Provide keyboard focus, semantic summaries, data tables, contrast, RTL, and live announcements.

## Component Selection

Use `BulletChart` when the visualization must compare an actual value against one or more targets within qualitative ranges.

Use a regular Cartesian `Chart` instead when the requirement involves:

- Value trends over time.
- Grouped or stacked comparisons.
- Logarithmic axes.
- Point selection.
- Zooming and panning.
- Crosshairs.
- Multiple independent axes.
- Series-level interactions.
- Regular Chart export modules.

Use `StockChart` when the application requires a stock-focused financial interface with built-in range selection and period controls.

## Navigation Guide

Read only the reference files relevant to the requested task.

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md) for:

- Package installation.
- TypeScript setup.
- JavaScript CDN setup.
- Basic Bullet Chart creation.
- Initial data binding.
- Tooltip injection.
- Container sizing.
- Common setup issues.

### Value Bar & Comparative Bar

📄 **Read:** [references/value-bar-and-comparative-bar.md](references/value-bar-and-comparative-bar.md) for:

- Actual-value bar configuration.
- `Rect` and `Dot` actual-bar shapes.
- Actual-bar color mapping.
- Actual-bar height and border.
- Comparative-marker shapes.
- Comparative-marker color and width.
- Multiple targets.
- Performance-based coloring.
- Dynamic bar updates.

### Ranges & Qualitative Scale

📄 **Read:** [references/ranges-and-qualitative-scale.md](references/ranges-and-qualitative-scale.md) for:

- Qualitative range boundaries.
- Range colors and opacity.
- Named ranges.
- Range legends and shapes.
- Dynamic ranges.
- Shared scale requirements.
- Performance-zone examples.
- Accessible range descriptions.

### Axis Customization

📄 **Read:** [references/axis-customization.md](references/axis-customization.md) for:

- Minimum, maximum, and interval.
- Major and minor ticks.
- Tick placement.
- Numeric-label formatting.
- Numeric-label placement.
- Category-label styling.
- Group separators.
- Opposed positioning.
- Scale and orientation behavior.

### Data Binding & Labels

📄 **Read:** [references/data-binding-and-labels.md](references/data-binding-and-labels.md) for:

- Actual, target, and category mappings.
- Local and remote data.
- Data validation.
- Multiple targets.
- Dynamic updates.
- Real-time data.
- API polling.
- Actual-value data labels.
- Category labels.
- Multiple measures.
- Accessible summaries and tables.

### Title, Tooltip & Interactivity

📄 **Read:** [references/title-tooltip-and-interactivity.md](references/title-tooltip-and-interactivity.md) for:

- Title and subtitle configuration.
- Title styling and positioning.
- Tooltip module injection.
- Tooltip templates.
- Tooltip appearance.
- Bullet Chart lifecycle events.
- Chart-click handling.
- Application-owned drill-down controls.
- Dynamic title and tooltip updates.

### Customization, Dimensions & Export

📄 **Read:** [references/customization-dimensions-and-export.md](references/customization-dimensions-and-export.md) for:

- Horizontal and vertical orientations.
- Right-to-left rendering.
- Animation and reduced motion.
- Themes.
- Fixed and percentage dimensions.
- Responsive layouts.
- SVG serialization.
- SVG-to-PNG conversion.
- Printing.
- Browser Save as PDF workflows.

### Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md) for:

- WCAG and Section 508 considerations.
- Generated WAI-ARIA output.
- Documented keyboard interaction.
- Keyboard focus.
- Semantic text alternatives.
- Data tables.
- Dynamic update announcements.
- Color and contrast.
- RTL accessibility.
- Automated and manual testing.

## Core Implementation Rules

### Use BulletChart

Import:

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';
```

Create the instance:

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Inject Feature Modules Only When Required

A basic Bullet Chart does not require module injection.

Inject `BulletTooltip` when tooltips are enabled:

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);
```

Inject `BulletChartLegend` when the range legend is enabled:

```typescript
import {
  BulletChart,
  BulletChartLegend
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletChartLegend
);
```

Use:

```typescript
BulletChart.Inject(...)
```

Do not use:

```typescript
Chart.Inject(...)
```

Do not import an unverified module such as:

```typescript
BulletLegend
```

Use:

```typescript
BulletChartLegend
```

### Map Data Explicitly

Configure:

```typescript
dataSource
valueField
targetField
categoryField
```

Example:

```typescript
interface PerformanceData {
  actual: number;
  goal: number;
  metric: string;
}

const chartData: PerformanceData[] = [
  {
    actual: 55,
    goal: 75,
    metric: 'Sales'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'actual',
    targetField: 'goal',
    categoryField: 'metric'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Ensure that actual and target values are finite numbers.

### Configure a Valid Scale

```typescript
minimum: 0,
maximum: 100,
interval: 20
```

Ensure that:

- `minimum` is less than `maximum`.
- `interval` is greater than zero.
- Actual values are included in the scale.
- Target values are included in the scale.
- Qualitative range endings are ordered.
- The final qualitative range normally includes the maximum.

### Use Either Constructor Target or appendTo

Constructor target:

```typescript
const bulletChart: BulletChart =
  new BulletChart(
    {
      dataSource: chartData,
      valueField: 'value',
      targetField: 'target'
    },
    '#bullet-chart'
  );
```

`appendTo` pattern:

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Do not attach the same instance twice.

### Clean Up Resources

When permanently removing the Bullet Chart:

- Clear intervals.
- Clear polling timeouts.
- Remove application-owned listeners.
- Close streaming connections.
- Revoke object URLs.
- Call `bulletChart.destroy()`.

## Quick Start Example

### TypeScript

Install the package:

```bash
npm install @syncfusion/ej2-charts
```

Add the host:

```html
<div id="bullet-chart"></div>
```

Add a stable size:

```css
#bullet-chart {
  width: 100%;
  min-height: 400px;
}
```

Create the Bullet Chart:

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
    value: 55,
    target: 75,
    category: 'Sales Performance'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    title: 'Quarter 1 Performance',
    subtitle:
      'Actual sales compared with target',
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    orientation: 'Horizontal',
    width: '100%',
    height: '400px',
    valueFill: '#0F6CBD',
    targetColor: '#242424',
    targetWidth: 6,
    ranges: [
      {
        end: 50,
        color: '#D13438',
        opacity: 0.12,
        name: 'Below expectations'
      },
      {
        end: 75,
        color: '#C19C00',
        opacity: 0.12,
        name: 'Approaching target'
      },
      {
        end: 100,
        color: '#107C10',
        opacity: 0.12,
        name: 'Target achieved'
      }
    ],
    tooltip: {
      enable: true,
      template:
        '<div class="bullet-tooltip">' +
        '<strong>Actual:</strong> ${value}<br>' +
        '<strong>Target:</strong> ${target}' +
        '</div>'
    },
    dataLabel: {
      enable: true,
      labelStyle: {
        color: '#242424',
        size: '13px',
        fontWeight: '600'
      }
    },
    animation: {
      enable: false
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

Module purpose:

- `BulletChart` creates the Bullet Chart component.
- `BulletTooltip` enables actual and target tooltips.

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

  <title>
    Bullet Chart
  </title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #bullet-chart {
      width: 100%;
      min-height: 400px;
    }

    .bullet-tooltip {
      min-width: 130px;
      padding: 8px 10px;
    }
  </style>
</head>

<body>
  <div id="bullet-chart"></div>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    var chartData = [
      {
        value: 55,
        target: 75,
        category:
          'Sales Performance'
      }
    ];

    var bulletChart =
      new ej.charts.BulletChart({
        title:
          'Quarter 1 Performance',
        subtitle:
          'Actual sales compared with target',
        dataSource:
          chartData,
        valueField:
          'value',
        targetField:
          'target',
        categoryField:
          'category',
        minimum:
          0,
        maximum:
          100,
        interval:
          20,
        labelFormat:
          '{value}%',
        orientation:
          'Horizontal',
        width:
          '100%',
        height:
          '400px',
        valueFill:
          '#0F6CBD',
        targetColor:
          '#242424',
        targetWidth:
          6,
        ranges: [
          {
            end: 50,
            color: '#D13438',
            opacity: 0.12,
            name:
              'Below expectations'
          },
          {
            end: 75,
            color: '#C19C00',
            opacity: 0.12,
            name:
              'Approaching target'
          },
          {
            end: 100,
            color: '#107C10',
            opacity: 0.12,
            name:
              'Target achieved'
          }
        ],
        tooltip: {
          enable: true,
          template:
            '<div class="bullet-tooltip">' +
            '<strong>Actual:</strong> ${value}<br>' +
            '<strong>Target:</strong> ${target}' +
            '</div>'
        },
        dataLabel: {
          enable: true,
          labelStyle: {
            color: '#242424',
            size: '13px',
            fontWeight: '600'
          }
        },
        animation: {
          enable: false
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

### JavaScript with Individual CDN Scripts

When individual package scripts are required, load them in dependency order and use the same version.

```html
<!-- Include CDN scripts -->
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-base/dist/global/ej2-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-data/dist/global/ej2-data.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-svg-base/dist/global/ej2-svg-base.min.js"></script>
<script src="https://cdn.syncfusion.com/ej2/34.2.2/ej2-charts/dist/global/ej2-charts.min.js"></script>
```

Do not combine the consolidated EJ2 script with individual package scripts.

## Common Patterns

### Pattern 1: Multi-Measure Bullet Chart

Display several related measures with one shared scale.

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
    value: 68,
    target: 80,
    category: 'Growth'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20,
    width: '100%',
    height: '400px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Every measure in one Bullet Chart should use the same unit and scale interpretation.

### Pattern 2: Qualitative Performance Ranges

```typescript
ranges: [
  {
    end: 25,
    color: '#D13438',
    opacity: 0.14,
    name: 'Poor'
  },
  {
    end: 50,
    color: '#C85D00',
    opacity: 0.14,
    name: 'Satisfactory'
  },
  {
    end: 75,
    color: '#C19C00',
    opacity: 0.14,
    name: 'Good'
  },
  {
    end: 100,
    color: '#107C10',
    opacity: 0.14,
    name: 'Excellent'
  }
]
```

Range endings must be ordered.

Do not communicate range meaning through color alone. Add names, a legend, or visible explanatory text.

### Pattern 3: Custom Axis and Labels

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
    labelFormat: '{value}%',
    tickPosition: 'Outside',
    labelPosition: 'Outside',
    majorTickLines: {
      height: 14,
      width: 2,
      color: '#242424'
    },
    minorTickLines: {
      height: 7,
      width: 1,
      color: '#808080'
    },
    minorTicksPerInterval: 4,
    labelStyle: {
      size: '13px',
      color: '#242424'
    },
    categoryLabelStyle: {
      size: '14px',
      color: '#242424',
      fontWeight: '600'
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use `height` for tick length, not `size`.

### Pattern 4: Multiple Targets

```typescript
interface PerformanceData {
  value: number;
  targets: number[];
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 72,
    targets: [
      65,
      85
    ],
    category: 'Sales'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'targets',
    categoryField: 'category',
    targetTypes: [
      'Circle',
      'Rect'
    ],
    targetColor: '#242424',
    targetWidth: 6,
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Explain the meaning of every target marker in visible text.

### Pattern 5: Data-Driven Actual-Bar Colors

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  color: string;
}

const chartData: PerformanceData[] = [
  {
    value: 92,
    target: 90,
    category: 'Team A',
    color: '#005A9C'
  },
  {
    value: 78,
    target: 90,
    category: 'Team B',
    color: '#7A5500'
  },
  {
    value: 58,
    target: 90,
    category: 'Team C',
    color: '#A4262C'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueFill: 'color',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Do not rely on an unverified `pointRender` event.

### Pattern 6: Dynamic Data Update

```typescript
const updatedData = [
  {
    value: 72,
    target: 85,
    category:
      'Quarter 2 Performance'
  }
];

bulletChart.dataSource =
  updatedData;

bulletChart.title =
  'Quarter 2 Performance';

bulletChart.refresh();
```

Apply all related changes before calling `refresh()`.

### Pattern 7: Real-Time Update

```typescript
const updateInterval: number =
  window.setInterval(
    (): void => {
      const nextValue: number =
        Math.round(
          Math.random() *
          1000
        ) / 10;

      bulletChart.dataSource = [
        {
          value: nextValue,
          target: 75,
          category:
            'Live Performance'
        }
      ];

      bulletChart.refresh();
    },
    5000
  );

window.addEventListener(
  'beforeunload',
  (): void => {
    window.clearInterval(
      updateInterval
    );

    bulletChart.destroy();
  }
);
```

Disable animation for frequent updates.

### Pattern 8: RTL Bullet Chart

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    title: 'أداء المبيعات',
    dataSource: [
      {
        value: 85,
        target: 90,
        category: 'المبيعات'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    enableRtl: true,
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Also configure the HTML language and direction:

```html
<section lang="ar" dir="rtl">
  <div id="bullet-chart"></div>
</section>
```

## Key Properties

### Data Binding

- `dataSource`: Defines the bound data collection.
- `valueField`: Maps the actual or feature-measure value.
- `targetField`: Maps one or more target values.
- `categoryField`: Maps category labels.
- `query`: Defines a query when a compatible data source is used.

### Scale

- `minimum`: Defines the scale beginning.
- `maximum`: Defines the scale ending.
- `interval`: Defines the major interval.
- `labelFormat`: Formats numeric labels.
- `enableGroupSeparator`: Enables grouped number separators.
- `orientation`: Sets `Horizontal` or `Vertical`.
- `opposedPosition`: Moves the scale axis to the opposite side.
- `tickPosition`: Places ticks `Inside` or `Outside`.
- `labelPosition`: Places numeric labels `Inside` or `Outside`.

### Tick Lines

- `majorTickLines.height`: Defines major-tick length.
- `majorTickLines.width`: Defines major-tick thickness.
- `majorTickLines.color`: Defines major-tick color.
- `majorTickLines.useRangeColor`: Applies corresponding range colors.
- `minorTickLines.height`: Defines minor-tick length.
- `minorTickLines.width`: Defines minor-tick thickness.
- `minorTickLines.color`: Defines minor-tick color.
- `minorTickLines.useRangeColor`: Applies corresponding range colors.
- `minorTicksPerInterval`: Defines minor-tick count.

### Actual-Value Bar

- `type`: Defines `Rect` or `Dot`.
- `valueFill`: Defines or maps the actual-bar color.
- `valueHeight`: Defines actual-bar thickness.
- `valueBorder`: Defines actual-bar border color and width.

### Comparative Target

- `targetTypes`: Defines target shapes such as `Rect`, `Cross`, or `Circle`.
- `targetColor`: Defines or maps target-marker color.
- `targetWidth`: Defines target-marker width.

### Qualitative Ranges

- `ranges`: Defines qualitative performance zones.
- `ranges[].end`: Defines the range ending.
- `ranges[].color`: Defines the range color.
- `ranges[].opacity`: Defines range transparency.
- `ranges[].name`: Defines the range legend name.
- `ranges[].shape`: Defines the legend shape.
- `ranges[].legendImageUrl`: Defines an image legend icon when the shape is `Image`.

### Labels

- `labelStyle`: Styles numeric scale labels.
- `categoryLabelStyle`: Styles category labels.
- `dataLabel.enable`: Shows actual-value labels.
- `dataLabel.labelStyle`: Styles actual-value labels.

### Titles and Tooltip

- `title`: Defines the primary title.
- `subtitle`: Defines the subtitle.
- `titlePosition`: Positions the title and subtitle.
- `titleStyle`: Styles the title.
- `subtitleStyle`: Styles the subtitle.
- `tooltip.enable`: Enables the tooltip.
- `tooltip.template`: Defines tooltip HTML.
- `tooltip.fill`: Defines tooltip background color.
- `tooltip.border`: Defines tooltip border.
- `tooltip.textStyle`: Styles tooltip text.

### Layout and Appearance

- `width`: Defines component width.
- `height`: Defines component height.
- `theme`: Selects a built-in theme.
- `enableRtl`: Enables RTL rendering.
- `border`: Defines the Bullet Chart border.
- `margin`: Defines outer margins.
- `animation`: Configures feature-bar animation.
- `tabIndex`: Places the Bullet Chart in the keyboard sequence.

### Legend and Printing

- `legendSettings`: Configures the range legend.
- `beforePrint`: Runs before printing.
- `print()`: Prints the Bullet Chart or selected elements.

## Common Mistakes

- Do not use `Chart.Inject(...)`; use `BulletChart.Inject(...)`.
- Do not inject modules for a basic Bullet Chart.
- Inject `BulletTooltip` only when a tooltip is enabled.
- Inject `BulletChartLegend` when the range legend is enabled.
- Do not import `BulletLegend`.
- Do not use corrupted chat-generated anchor markup in CDN examples.
- Include `ej2-svg-base` when individual CDN scripts are used.
- Use the same version for every CDN package.
- Do not combine consolidated and individual EJ2 scripts.
- Use `Horizontal` as the default orientation.
- Do not describe `Vertical` as the default.
- Use `valueHeight`, not `barHeight` or `valueBarSize`.
- Use `valueBorder`, not `valueBorderColor` or `valueBorderWidth`.
- Use `targetTypes`, not `targetType`.
- Use `targetWidth`, not `targetBarSize` or `targetLineWidth`.
- Use `Rect`, `Cross`, or `Circle` for target-marker shapes.
- Use `dataLabel.enable`, not `dataLabel.visible`.
- Use `dataLabel.labelStyle`, not a nested `font` object.
- Do not use unsupported data-label `position`, `template`, `border`, or `margin`.
- Use `labelFormat` to format actual-value labels.
- Use `labelStyle`, not `axisLabelStyle`.
- Use `height` for tick length, not `size`.
- Use `tickPosition` for tick placement.
- Use `labelPosition` for numeric-label placement.
- Do not use `OnTicks` or `BetweenTicks`.
- Do not use unsupported `axisLabelRender`, `lineStyle`, `rangeStart`, or `rangeEnd`.
- The Bullet Chart scale is linear.
- Do not describe numeric intervals as logarithmic.
- Do not perform arithmetic inside `labelFormat`.
- Normalize abbreviated values before binding.
- Use `legendSettings`, not `legend`.
- Bullet Chart does not expose a regular Chart `palette`.
- Customize `valueFill`, `targetColor`, and range colors directly.
- Do not use an unverified `pointRender` event.
- Do not use regular Cartesian selection or highlight properties.
- Do not use unsupported `allowKeyboardInteraction`, `keyDown`, or `keyUp`.
- Do not use regular Chart `tooltip.format`.
- Use Bullet Chart `tooltip.template`.
- Do not use unsupported `ariaLabel`, `description`, or `checkAccessibility`.
- Provide accessibility descriptions through semantic HTML.
- Do not assume regular Cartesian Chart export modules apply to Bullet Chart.
- Do not inject an unverified `PdfExport` module.
- Do not call an unverified `bulletChart.export()` method.
- Use printing or an application-owned SVG or PNG workflow.
- Apply related updates before calling `refresh()`.
- Remove listeners and clear timers during cleanup.
- Call `bulletChart.destroy()` when the component is permanently removed.

## Accessibility Requirements

When generating a Bullet Chart example:

1. Provide a visible heading.
2. Provide a short summary of the actual and target values.
3. Use `tabIndex: 0` when keyboard focus is required.
4. Use native buttons for application actions.
5. Provide visible focus indicators.
6. Do not communicate status only through color.
7. Provide range names or visible threshold descriptions.
8. Use a semantic table when users need every value.
9. Use a persistent ARIA live region for dynamic updates.
10. Respect `prefers-reduced-motion`.
11. Set `lang`, `dir`, and `enableRtl` for RTL content.
12. Test color contrast.
13. Test keyboard focus.
14. Test with target screen readers.
15. Test at increased browser zoom.

The documented built-in Bullet Chart keyboard interactions include:

- `Tab`
- `Shift + Tab`
- `Ctrl + P`

Do not claim built-in point selection, arrow-key navigation, zooming, or panning shortcuts.

## Output Expectations

When responding to a Bullet Chart request:

1. Identify the user's platform:
   - TypeScript
   - JavaScript CDN
   - JavaScript module build

2. Read the relevant Bullet Chart reference files.

3. Import `BulletChart`.

4. Inject only the feature modules required by the configuration.

5. Provide complete data and field mappings.

6. Configure a valid scale.

7. Include an HTML host and stable dimensions for runnable examples.

8. Use typed interfaces in TypeScript.

9. Use the global `ej.charts` namespace in JavaScript CDN examples.

10. Use supported Bullet Chart properties rather than regular Cartesian Chart properties.

11. Use `dataLabel.enable` and `dataLabel.labelStyle` for actual-value labels.

12. Use `tooltip.template` for Bullet Chart tooltip customization.

13. Use data-driven `valueFill` for conditional actual-bar colors.

14. Provide a persistent text summary for important actual and target values.

15. Include cleanup for timers, listeners, and Bullet Chart instances.

16. Avoid unsupported or unverified properties.

17. Keep examples complete, consistent, and directly runnable.

18. When both TypeScript and JavaScript are requested, provide separate complete examples.

19. Use the reference documents for advanced details instead of duplicating unrelated configurations in the main skill.