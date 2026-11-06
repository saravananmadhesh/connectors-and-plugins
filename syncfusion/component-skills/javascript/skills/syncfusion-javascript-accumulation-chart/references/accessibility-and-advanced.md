# Accessibility & Advanced Features

## Table of Contents

- [Accessibility & Advanced Features](#accessibility--advanced-features)
  - [Accessibility Overview](#accessibility-overview)
    - [Accessibility Standards](#accessibility-standards)
    - [WAI-ARIA Support](#wai-aria-support)
  - [Advanced Accessibility Configuration](#advanced-accessibility-configuration)
    - [Chart-Level Accessibility](#chart-level-accessibility)
    - [Series Accessibility](#series-accessibility)
    - [Legend Accessibility](#legend-accessibility)
    - [Focus Border Configuration](#focus-border-configuration)
  - [Keyboard Navigation](#keyboard-navigation)
    - [Supported Keyboard Interactions](#supported-keyboard-interactions)
    - [Keyboard Navigation Requirements](#keyboard-navigation-requirements)
  - [Screen Reader Support](#screen-reader-support)
    - [Accessible Chart Summary](#accessible-chart-summary)
    - [Accessible Data Table](#accessible-data-table)
    - [Announcing Chart Updates](#announcing-chart-updates)
  - [Dynamic Data Updates](#dynamic-data-updates)
    - [Replacing the Data Source](#replacing-the-data-source)
    - [Real-Time Data Updates](#real-time-data-updates)
    - [Cleanup](#cleanup)
  - [Animation and Transitions](#animation-and-transitions)
    - [Series Animation](#series-animation)
    - [Animation Complete Event](#animation-complete-event)
    - [Reduced Motion](#reduced-motion)
  - [Event Handling](#event-handling)
    - [Loaded Event](#loaded-event)
    - [Point Render Event](#point-render-event)
    - [Text Render Event](#text-render-event)
    - [Tooltip Render Event](#tooltip-render-event)
    - [Point Click Event](#point-click-event)
  - [Performance Optimization](#performance-optimization)
    - [Limit Visible Points](#limit-visible-points)
    - [Group Small Values](#group-small-values)
    - [Control Update Frequency](#control-update-frequency)
    - [Disable Animation for Frequent Updates](#disable-animation-for-frequent-updates)
  - [Advanced Patterns](#advanced-patterns)
    - [Dashboard with Multiple Charts](#dashboard-with-multiple-charts)
    - [Drill-Down Navigation](#drill-down-navigation)
    - [Conditional Point Formatting](#conditional-point-formatting)
  - [Complete Accessible Example](#complete-accessible-example)
  - [Troubleshooting](#troubleshooting)
    - [Keyboard Navigation Is Not Working](#keyboard-navigation-is-not-working)
    - [Screen Reader Does Not Announce the Chart](#screen-reader-does-not-announce-the-chart)
    - [Screen Reader Does Not Announce Changes](#screen-reader-does-not-announce-changes)
    - [Animation Is Too Slow](#animation-is-too-slow)
    - [Dynamic Updates Are Slow](#dynamic-updates-are-slow)
    - [Point Color Is Not Updated](#point-color-is-not-updated)
    - [Grouping Is Not Working](#grouping-is-not-working)
    - [Drill-Down Data Is Not Displayed](#drill-down-data-is-not-displayed)
  - [Next Steps](#next-steps)
  - [Combined Mistakes and Future References](#combined-mistakes-and-future-references)


The EJ2 Accumulation Chart supports accessibility through WAI-ARIA semantics, screen reader compatibility, keyboard navigation, focus customization, right-to-left rendering, and accessible chart, series, and legend configuration.

The component is documented as supporting ADA, Section 508, WCAG 2.2 at the AA level, WAI-ARIA roles and attributes, keyboard navigation, screen readers, color contrast, RTL layouts, and mobile devices.

## Accessibility Overview

Accessibility requires more than displaying data labels. An accessible Accumulation Chart should provide:

- A meaningful visible title.
- A concise chart description.
- Keyboard access.
- Visible keyboard focus.
- Meaningful point descriptions.
- Adequate color contrast.
- More than color alone to distinguish categories.
- A semantic data table when users need access to every value.
- Announcements for important dynamic updates.
- Respect for reduced-motion preferences.
- Accessible controls for filtering, drill-down, export, and printing.

### Accessibility Standards

The Accumulation Chart follows accessibility standards and guidelines that include:

- ADA.
- Section 508.
- WCAG 2.2.
- WAI-ARIA.

The component uses accessibility-related roles and attributes such as:

- `role="img"`
- `role="button"`
- `role="region"`
- `aria-label`
- `aria-hidden`
- `aria-pressed`

### WAI-ARIA Support

The chart generates WAI-ARIA semantics for its rendered and interactive elements.

For application-specific context, also use semantic HTML around the chart.

```html
<section aria-labelledby="sales-heading">
  <h2 id="sales-heading">
    Product Sales Distribution
  </h2>

  <p id="sales-summary">
    Product B has the highest sales value at 30,000.
    Product C has the lowest value at 20,000.
  </p>

  <div
    id="chart"
    role="region"
    aria-label="Pie chart showing product sales distribution"
    aria-describedby="sales-summary sales-table-caption"
  ></div>
</section>
```

Do not depend only on automatically generated chart semantics when the visualization requires additional business context.

## Advanced Accessibility Configuration

The current Accumulation Chart API supports chart-level accessibility configuration through properties such as:

- `accessibilityDescription`
- `accessibilityRole`
- `focusable`
- `focusBorderColor`
- `focusBorderMargin`
- `focusBorderWidth`

### Chart-Level Accessibility

Use chart-level accessibility properties to describe the complete visualization.

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

interface SalesData {
  product: string;
  sales: number;
}

const chartData: SalesData[] = [
  {
    product: 'Product A',
    sales: 25000
  },
  {
    product: 'Product B',
    sales: 30000
  },
  {
    product: 'Product C',
    sales: 20000
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    accessibilityDescription:
      'Pie chart showing sales distribution across three products. ' +
      'Product B has the highest sales value.',
    accessibilityRole: 'img',
    focusable: true,
    focusBorderColor: '#0F6CBD',
    focusBorderWidth: 2,
    focusBorderMargin: 2,
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        name: 'Product Sales'
      }
    ]
  });

chart.appendTo('#chart');
```

Use `accessibilityDescription`, not an unverified chart-level `ariaLabel` property.

Use `focusable`, not an unverified chart-level `tabIndex` property.

### Series Accessibility

Use the series `accessibility` configuration to provide meaningful descriptions for rendered points.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        name: 'Product Sales',
        accessibility: {
          accessibilityDescription:
            '${point.x}, sales value ${point.y}',
          accessibilityRole: 'img',
          focusable: true
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Keep point descriptions concise and meaningful. Avoid repeating unnecessary words for every point.

### Legend Accessibility

Use the legend accessibility configuration to describe legend interaction.

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
    legendSettings: {
      visible: true,
      position: 'Right',
      description:
        'Legend for product sales categories. ' +
        'Activate a legend item to toggle the corresponding point.',
      accessibility: {
        accessibilityDescription:
          'Product sales legend',
        accessibilityRole: 'region',
        focusable: true
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

The legend settings model supports accessibility customization and a screen reader description.

### Focus Border Configuration

Use the chart's focus-border properties to make keyboard focus visible.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    focusable: true,
    focusBorderColor: '#0F6CBD',
    focusBorderWidth: 3,
    focusBorderMargin: 2,
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Ensure that the focus border has sufficient contrast against the chart background.

## Keyboard Navigation

The Accumulation Chart provides built-in keyboard interaction.

### Supported Keyboard Interactions

The documented keyboard shortcuts include:

- `Alt + J`: Moves focus to the Accumulation Chart.
- `Tab`: Moves focus to the next interactive chart element.
- `Shift + Tab`: Moves focus to the previous interactive chart element.
- `Down Arrow`: Moves focus to the point on the left side of the selected point.
- `Up Arrow`: Moves focus to the point on the right side of the selected point.
- `Down Arrow` or `Left Arrow` on the legend: Moves focus to the legend item on the left.
- `Up Arrow` or `Right Arrow` on the legend: Moves focus to the legend item on the right.
- `Enter` or `Space` on a legend item: Toggles the corresponding point visibility.
- `Ctrl + P`: Prints the chart.

The action performed by an arrow key depends on the focused chart element.

Do not document only `Left Arrow` and `Right Arrow` as point-navigation keys when the documented point navigation uses `Down Arrow` and `Up Arrow`.

### Keyboard Navigation Requirements

To preserve built-in keyboard navigation:

- Set `focusable` to `true` when chart-level focus is required.
- Do not intercept chart navigation keys unnecessarily.
- Do not remove visible focus indicators.
- Ensure that no transparent overlay blocks the chart.
- Use native buttons for application-owned controls.
- Keep custom controls in logical DOM order.
- Do not use positive `tabindex` values.
- Use descriptive labels for drill-down, reset, export, and filter controls.

Use `tabindex="0"` only on an application-owned container when it has a meaningful interactive or navigational purpose.

```html
<div
  id="chart"
  role="region"
  aria-label="Product sales distribution chart"
></div>
```

Prefer the chart's `focusable` configuration over an unsupported constructor-level `tabIndex`.

## Screen Reader Support

Data labels and tooltips improve visual comprehension, but they are not complete replacements for accessible descriptions or semantic data alternatives.

### Accessible Chart Summary

Provide a concise text summary before the chart.

```html
<p id="sales-summary">
  Product B has the highest sales at 30,000.
  Product A follows at 25,000, and Product C has 20,000.
</p>

<div
  id="chart"
  role="region"
  aria-label="Product sales distribution chart"
  aria-describedby="sales-summary sales-table-caption"
></div>
```

A useful summary should explain:

- What the chart represents.
- Its measurement unit.
- The most important comparison or trend.
- Where users can access the complete data.

### Accessible Data Table

Provide a semantic table when users need access to every chart value.

```html
<table>
  <caption id="sales-table-caption">
    Product sales values displayed in the accumulation chart
  </caption>
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Product A</th>
      <td>25,000</td>
    </tr>
    <tr>
      <th scope="row">Product B</th>
      <td>30,000</td>
    </tr>
    <tr>
      <th scope="row">Product C</th>
      <td>20,000</td>
    </tr>
  </tbody>
</table>
```

Do not mark the only accessible data alternative with `aria-hidden="true"`.

### Announcing Chart Updates

A `console.log` statement is not announced by screen readers.

Use an ARIA live region for important chart updates.

```html
<p id="chart-status" aria-live="polite">
  Product sales chart loaded.
</p>
```

```typescript
const statusElement: HTMLElement | null =
  document.getElementById('chart-status');

function announceChartUpdate(
  message: string
): void {
  if (statusElement) {
    statusElement.textContent = message;
  }
}
```

After updating the data:

```typescript
chart.series[0].dataSource = updatedData;
chart.refresh();

announceChartUpdate(
  'Product sales chart updated with the latest values.'
);
```

Do not use `pointRender` to announce every point. Rendering can occur repeatedly and may produce excessive announcements.

## Dynamic Data Updates

### Replacing the Data Source

Assign the new data source to the series and call `refresh()`.

```typescript
interface SalesData {
  product: string;
  sales: number;
}

const initialData: SalesData[] = [
  {
    product: 'Product A',
    sales: 25
  },
  {
    product: 'Product B',
    sales: 30
  },
  {
    product: 'Product C',
    sales: 20
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: initialData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');

function updateChartData(
  updatedData: SalesData[]
): void {
  chart.series[0].dataSource = updatedData;
  chart.refresh();

  announceChartUpdate(
    'The chart data has been updated.'
  );
}
```

### Real-Time Data Updates

The following example updates the chart at a controlled interval.

```typescript
interface LiveData {
  category: string;
  value: number;
}

let liveData: LiveData[] = [
  {
    category: 'A',
    value: 25
  },
  {
    category: 'B',
    value: 30
  },
  {
    category: 'C',
    value: 20
  },
  {
    category: 'D',
    value: 25
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Live Distribution',
    series: [
      {
        dataSource: liveData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        animation: {
          enable: false
        }
      }
    ]
  });

chart.appendTo('#chart');

const updateInterval: number =
  window.setInterval(() => {
    liveData = liveData.map(
      (item: LiveData): LiveData => ({
        ...item,
        value: Math.max(
          1,
          item.value +
            Math.round(Math.random() * 10 - 5)
        )
      })
    );

    chart.series[0].dataSource =
      liveData;

    chart.refresh();

    announceChartUpdate(
      'Live chart values updated.'
    );
  }, 5000);
```

Keep values valid and nonnegative when they represent proportions.

Do not invoke a placeholder such as `fetchLatestData()` as though it returns data synchronously when the real implementation performs an asynchronous network request.

### Cleanup

Clear intervals and destroy the chart when it is permanently removed.

```typescript
window.addEventListener('beforeunload', () => {
  window.clearInterval(updateInterval);
  chart.destroy();
});
```

In a component framework, perform equivalent cleanup in the component's unmount or destroy lifecycle.

## Animation and Transitions

Animation is configured inside the Accumulation Chart series.

The animation model supports:

- `enable`
- `duration`
- `delay`

The documented defaults are an enabled animation, a duration of 1000 milliseconds, and a delay of 0 milliseconds.

### Series Animation

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        animation: {
          enable: true,
          duration: 1000,
          delay: 0
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Do not use an unverified chart-level `enableAnimation` property. Configure animation through the series.

### Animation Complete Event

Use `animationComplete` when application logic must run after the chart animation finishes.

```typescript
import {
  AccumulationChart,
  IAccAnimationCompleteEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

const chart: AccumulationChart =
  new AccumulationChart({
    animationComplete: (
      args: IAccAnimationCompleteEventArgs
    ): void => {
      announceChartUpdate(
        'Chart animation completed.'
      );
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        animation: {
          enable: true,
          duration: 800,
          delay: 0
        }
      }
    ]
  });

chart.appendTo('#chart');
```

### Reduced Motion

Respect the user's reduced-motion preference.

```typescript
const prefersReducedMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        animation: {
          enable: !prefersReducedMotion,
          duration:
            prefersReducedMotion
              ? 0
              : 800,
          delay: 0
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Disable animation for charts that update frequently.

## Event Handling

### Loaded Event

Use `loaded` after the chart has completed rendering.

```typescript
import {
  IAccLoadedEventArgs
} from '@syncfusion/ej2-charts';

const chart: AccumulationChart =
  new AccumulationChart({
    loaded: (
      args: IAccLoadedEventArgs
    ): void => {
      announceChartUpdate(
        'Product sales chart is ready.'
      );
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

### Point Render Event

Use `pointRender` to customize a point before it is rendered.

```typescript
import {
  IAccPointRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: AccumulationChart =
  new AccumulationChart({
    pointRender: (
      args: IAccPointRenderEventArgs
    ): void => {
      const value: number =
        Number(args.point?.y);

      if (value > 30000) {
        args.fill = '#107C10';
      } else if (value > 20000) {
        args.fill = '#C19C00';
      } else {
        args.fill = '#D13438';
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Use `args.fill` to change the rendered point color.

Do not assign an unverified `args.point.color` property.

### Text Render Event

Use `textRender` to customize data-label text before rendering.

```typescript
import {
  IAccTextRenderEventArgs
} from '@syncfusion/ej2-charts';

const chart: AccumulationChart =
  new AccumulationChart({
    textRender: (
      args: IAccTextRenderEventArgs
    ): void => {
      if (args.text.includes('Others')) {
        args.text = 'Other Products';
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        dataLabel: {
          visible: true,
          position: 'Outside'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Inject `AccumulationDataLabel` when data labels are enabled.

### Tooltip Render Event

Use `tooltipRender` only when conditional runtime formatting is required.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    tooltipRender: (args): void => {
      if (args.text) {
        args.text =
          `Sales details: ${args.text}`;
      }
    },
    tooltip: {
      enable: true,
      format:
        '${point.x}: ${point.y:n2}'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        name: 'Product Sales'
      }
    ]
  });

chart.appendTo('#chart');
```

Preserve inline tooltip formatting in `tooltip.format` when standard number or DateTime formatting is sufficient.

### Point Click Event

Use `pointClick` for drill-down, filtering, or application-specific interactions.

```typescript
import {
  IAccPointClickEventArgs
} from '@syncfusion/ej2-charts';

const chart: AccumulationChart =
  new AccumulationChart({
    pointClick: (
      args: IAccPointClickEventArgs
    ): void => {
      if (args.point) {
        announceChartUpdate(
          `Selected ${String(args.point.x)}, ` +
          `value ${String(args.point.y)}.`
        );
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

## Performance Optimization

Accumulation Charts are designed to display proportional or stage-based data. They are generally not appropriate for thousands of individually rendered points.

### Limit Visible Points

For a large source dataset:

- Aggregate related records.
- Display only the most important categories.
- Group small values.
- Filter the dataset before binding it.
- Avoid displaying thousands of slices.
- Avoid enabling a data label for every point.
- Reduce update frequency.
- Disable animation during frequent updates.

Do not create a 10,000-point Pie Chart. It is not readable and creates unnecessary rendering work.

### Group Small Values

Use `groupTo`, not `groupPadding`.

Group points below a numeric threshold:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'product',
    yName: 'sales',
    type: 'Pie',
    groupMode: 'Value',
    groupTo: '5000'
  }
]
```

Group points below a percentage threshold:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'product',
    yName: 'sales',
    type: 'Pie',
    groupMode: 'Value',
    groupTo: '5%'
  }
]
```

Keep a fixed number of leading points and group the remaining points:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'product',
    yName: 'sales',
    type: 'Pie',
    groupMode: 'Point',
    groupTo: '5'
  }
]
```

The supported grouping modes are `Value` and `Point`. Percentage grouping is configured by supplying a percentage string through `groupTo`.

### Control Update Frequency

Batch multiple changes and call `refresh()` once.

```typescript
function updateMultipleValues(
  updatedData: SalesData[]
): void {
  chart.series[0].dataSource =
    updatedData;

  chart.title =
    'Updated Product Sales';

  chart.refresh();
}
```

Avoid calling `refresh()` after every individual point change.

### Disable Animation for Frequent Updates

```typescript
series: [
  {
    dataSource: liveData,
    xName: 'category',
    yName: 'value',
    type: 'Pie',
    animation: {
      enable: false
    }
  }
]
```

## Advanced Patterns

### Dashboard with Multiple Charts

Use separate Accumulation Chart instances for independent visualizations.

```typescript
const pieChart: AccumulationChart =
  new AccumulationChart({
    title: 'Sales by Region',
    series: [
      {
        dataSource: regionalData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

pieChart.appendTo('#pie-chart');

const doughnutChart: AccumulationChart =
  new AccumulationChart({
    title: 'Revenue Distribution',
    series: [
      {
        dataSource: revenueData,
        xName: 'category',
        yName: 'revenue',
        type: 'Pie',
        innerRadius: '55%'
      }
    ]
  });

doughnutChart.appendTo('#doughnut-chart');
```

A Doughnut Chart uses `type: 'Pie'` with a nonzero `innerRadius`. Do not use `type: 'Doughnut'`.

Do not directly mutate an internal point's `isSelected` property to synchronize charts. Use supported selection configuration or update the related chart's data and selected indexes.

### Drill-Down Navigation

The following example replaces the chart data after a point click and provides a separate back button.

```typescript
interface RegionData {
  region: string;
  sales: number;
}

interface CountryData {
  country: string;
  sales: number;
}

const regionData: RegionData[] = [
  {
    region: 'Asia',
    sales: 45
  },
  {
    region: 'Europe',
    sales: 35
  },
  {
    region: 'Americas',
    sales: 20
  }
];

const countryData:
  Record<string, CountryData[]> = {
    Asia: [
      {
        country: 'India',
        sales: 20
      },
      {
        country: 'Japan',
        sales: 15
      },
      {
        country: 'Singapore',
        sales: 10
      }
    ],
    Europe: [
      {
        country: 'Germany',
        sales: 15
      },
      {
        country: 'France',
        sales: 12
      },
      {
        country: 'Italy',
        sales: 8
      }
    ],
    Americas: [
      {
        country: 'USA',
        sales: 12
      },
      {
        country: 'Canada',
        sales: 5
      },
      {
        country: 'Brazil',
        sales: 3
      }
    ]
  };

let isDrilledDown: boolean = false;

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Sales by Region',
    pointClick: (
      args: IAccPointClickEventArgs
    ): void => {
      if (
        isDrilledDown ||
        !args.point
      ) {
        return;
      }

      const selectedRegion: string =
        String(args.point.x);

      const detailData: CountryData[] | undefined =
        countryData[selectedRegion];

      if (!detailData) {
        return;
      }

      chart.series[0].dataSource =
        detailData;

      chart.series[0].xName =
        'country';

      chart.series[0].yName =
        'sales';

      chart.title =
        `Sales in ${selectedRegion}`;

      isDrilledDown = true;
      chart.refresh();

      announceChartUpdate(
        `Drilled down to sales details for ${selectedRegion}.`
      );
    },
    series: [
      {
        dataSource: regionData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');

const backButton: HTMLButtonElement | null =
  document.getElementById(
    'back-to-regions'
  ) as HTMLButtonElement | null;

backButton?.addEventListener('click', () => {
  chart.series[0].dataSource =
    regionData;

  chart.series[0].xName =
    'region';

  chart.series[0].yName =
    'sales';

  chart.title =
    'Sales by Region';

  isDrilledDown = false;
  chart.refresh();

  announceChartUpdate(
    'Returned to the regional sales view.'
  );
});
```

```html
<button id="back-to-regions" type="button">
  Back to regions
</button>
```

### Conditional Point Formatting

Use `args.fill` in `pointRender`.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    pointRender: (
      args: IAccPointRenderEventArgs
    ): void => {
      const value: number =
        Number(args.point?.y);

      if (value > 30000) {
        args.fill = '#107C10';
      } else if (value > 20000) {
        args.fill = '#C19C00';
      } else {
        args.fill = '#D13438';
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Do not communicate the value classification through color alone. Also provide a data label, tooltip, description, or table.

## Complete Accessible Example

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  IAccPointClickEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
);

interface ProductSalesData {
  product: string;
  sales: number;
  label: string;
}

const chartData: ProductSalesData[] = [
  {
    product: 'Product A',
    sales: 25000,
    label: 'Product A: 25,000'
  },
  {
    product: 'Product B',
    sales: 30000,
    label: 'Product B: 30,000'
  },
  {
    product: 'Product C',
    sales: 20000,
    label: 'Product C: 20,000'
  }
];

const statusElement: HTMLElement | null =
  document.getElementById('chart-status');

const prefersReducedMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    accessibilityDescription:
      'Pie chart showing sales distribution across Products A, B, and C. ' +
      'Product B has the highest value at 30,000.',
    accessibilityRole: 'img',
    focusable: true,
    focusBorderColor: '#0F6CBD',
    focusBorderWidth: 3,
    focusBorderMargin: 2,
    legendSettings: {
      visible: true,
      position: 'Right',
      description:
        'Product categories. Activate an item to toggle its point.',
      textStyle: {
        color: '#242424',
        size: '12px'
      }
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:n0}<br>' +
        'Share: ${point.percentage:n1}%'
    },
    pointClick: (
      args: IAccPointClickEventArgs
    ): void => {
      if (
        args.point &&
        statusElement
      ) {
        statusElement.textContent =
          `Selected ${String(args.point.x)}, ` +
          `sales ${String(args.point.y)}.`;
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'sales',
        type: 'Pie',
        name: 'Product Sales',
        radius: '82%',
        accessibility: {
          accessibilityDescription:
            '${point.x}, sales ${point.y}',
          accessibilityRole: 'img',
          focusable: true
        },
        animation: {
          enable: !prefersReducedMotion,
          duration:
            prefersReducedMotion
              ? 0
              : 800,
          delay: 0
        },
        border: {
          color: '#FFFFFF',
          width: 2
        },
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label',
          connectorStyle: {
            length: '10%',
            type: 'Curve'
          }
        }
      }
    ]
  });

chart.appendTo('#chart');

window.addEventListener('beforeunload', () => {
  chart.destroy();
});
```

**HTML:**

```html
<section aria-labelledby="sales-heading">
  <h1 id="sales-heading">
    Product Sales Distribution
  </h1>

  <p id="sales-summary">
    Product B has the highest sales value at 30,000.
    Product C has the lowest value at 20,000.
  </p>

  <div
    id="chart"
    role="region"
    aria-label="Product sales distribution chart"
    aria-describedby="sales-summary sales-table-caption"
  ></div>

  <p id="chart-status" aria-live="polite">
    Product sales chart loaded.
  </p>

  <table>
    <caption id="sales-table-caption">
      Product sales values displayed in the chart
    </caption>
    <thead>
      <tr>
        <th scope="col">Product</th>
        <th scope="col">Sales</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Product A</th>
        <td>25,000</td>
      </tr>
      <tr>
        <th scope="row">Product B</th>
        <td>30,000</td>
      </tr>
      <tr>
        <th scope="row">Product C</th>
        <td>20,000</td>
      </tr>
    </tbody>
  </table>
</section>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 420px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

th,
td {
  padding: 8px;
  border: 1px solid #808080;
  text-align: left;
}
```

## Troubleshooting

### Keyboard Navigation Is Not Working

- Set `focusable` to `true`.
- Ensure that the chart is visible and fully rendered.
- Use `Alt + J` to move focus to the Accumulation Chart.
- Ensure that no parent element traps keyboard focus.
- Ensure that custom keyboard handlers do not cancel built-in navigation.
- Do not use an unsupported chart-level `tabIndex` property.
- Preserve visible focus indicators.

### Screen Reader Does Not Announce the Chart

- Set `accessibilityDescription`.
- Set an appropriate `accessibilityRole`.
- Provide a visible title.
- Add application context through `aria-label`, `aria-labelledby`, or `aria-describedby` on the host.
- Provide an accessible summary.
- Provide a semantic data table.
- Ensure that the chart is not inside an `aria-hidden="true"` container.

### Screen Reader Does Not Announce Changes

- Use an `aria-live="polite"` status element.
- Update the status after the chart update completes.
- Do not use `console.log` for screen reader announcements.
- Do not announce every render event.

### Animation Is Too Slow

- Reduce `series.animation.duration`.
- Disable animation during frequent updates.
- Respect `prefers-reduced-motion`.
- Do not use an unsupported chart-level `enableAnimation` property.

### Dynamic Updates Are Slow

- Reduce the update frequency.
- Aggregate or group small values.
- Disable animation.
- Avoid displaying a data label for every point.
- Call `refresh()` once after applying all changes.
- Clear obsolete intervals.

### Point Color Is Not Updated

- Assign the color through `args.fill` in `pointRender`.
- Do not assign an unverified `args.point.color`.
- Ensure that the selected color is a valid CSS color.
- Check whether `pointColorMapping` overrides the event result.

### Grouping Is Not Working

- Use `groupTo`.
- Use `groupMode: 'Value'` or `groupMode: 'Point'`.
- Do not use `groupPadding`.
- Do not use `groupMode: 'Percentage'`.
- Supply a percentage string such as `5%` through `groupTo`.

### Drill-Down Data Is Not Displayed

- Verify that the clicked point has a matching detail dataset.
- Update `dataSource`.
- Update `xName` and `yName` when the detail data uses different fields.
- Call `refresh()`.
- Provide a keyboard-accessible back control.
- Announce the new view through an ARIA live region.

## Next Steps

- **Getting started:** See `getting-started.md`.
- **Chart types:** See `chart-types.md`.
- **Tooltips and selection:** See `tooltip-selection.md`.
- **Data labels:** See `data-labels.md`.
- **Legends:** See `legend-configuration.md`.
- **Customization:** See `customization-and-styling.md`.
- **Annotations and features:** See `annotations-and-features.md`.

## Combined Mistakes and Future References

- Import Accumulation Chart modules from `@syncfusion/ej2-charts`.
- Call `AccumulationChart.Inject(...)` before creating the chart.
- Inject `PieSeries` for Pie and Doughnut charts.
- Inject `AccumulationDataLabel` when data labels are enabled.
- Inject `AccumulationLegend` when the legend is visible.
- Inject `AccumulationTooltip` when tooltips are enabled.
- Do not use the regular Cartesian Chart `Tooltip` module.
- Use `accessibilityDescription` for the chart's accessible description.
- Use `accessibilityRole` for the chart's accessibility role.
- Use `focusable` to control chart focusability.
- Use `focusBorderColor`, `focusBorderWidth`, and `focusBorderMargin` for focus styling.
- Do not document `ariaLabel` as a verified chart constructor property.
- Do not document `tabIndex` as a verified chart constructor property.
- Use the series `accessibility` configuration for point descriptions.
- Use the legend accessibility configuration for legend descriptions.
- Preserve the built-in keyboard-navigation keys.
- Do not override arrow keys, Enter, Space, or Ctrl + P without a validated requirement.
- The documented point-navigation keys are Down Arrow and Up Arrow.
- The documented legend-navigation keys include Down/Left and Up/Right.
- Use `Alt + J` to focus the Accumulation Chart.
- Use `Enter` or `Space` to toggle the focused legend item.
- Use `Ctrl + P` to print.
- Use a visible title and text summary.
- Provide a semantic data table when complete data access is required.
- Do not rely only on data labels or tooltips for screen reader support.
- Do not use `console.log` as an accessibility announcement.
- Use an ARIA live region for important updates.
- Avoid announcing every point during rendering.
- Replace the series data source and call `refresh()` for dynamic updates.
- Call `refresh()` once after applying a group of changes.
- Clear intervals and timeouts during cleanup.
- Call `chart.destroy()` when the chart is permanently removed.
- Configure animation through `series.animation`.
- Do not use an unverified chart-level `enableAnimation` property.
- Use `animation.enable`, `animation.duration`, and `animation.delay`.
- Respect `prefers-reduced-motion`.
- Disable animation for frequently updated charts.
- Use typed event arguments when supported interfaces are available.
- Use `loaded` after chart rendering.
- Use `pointRender` to customize point appearance.
- Use `args.fill`, not an unverified `args.point.color`.
- Use `textRender` to customize data-label text.
- Preserve inline tooltip formatting such as `${point.y:n2}` and `${point.percentage:n1}`.
- Use `tooltipRender` only for conditional runtime tooltip logic.
- Use `pointClick` for drill-down and application interactions.
- Do not render thousands of independent Pie slices.
- Aggregate, filter, or group large datasets before binding.
- Use `groupTo`, not `groupPadding`.
- Use `groupMode: 'Value'` for value or percentage threshold grouping.
- Use `groupMode: 'Point'` for point-count grouping.
- Use a percentage string such as `5%` for percentage grouping.
- Do not use `groupMode: 'Percentage'`.
- Do not use an unverified `isTransposed` property for an Accumulation Chart.
- Create a Doughnut Chart with `type: 'Pie'` and a nonzero `innerRadius`.
- Do not use `type: 'Doughnut'`.
- Do not directly mutate internal point properties such as `isSelected`.
- Use supported selection settings or selected-data indexes.
- Provide native buttons for back, reset, export, print, and filtering actions.
- Preserve visible keyboard focus for application-owned controls.
- Do not communicate essential data through color alone.
- Ensure that chart and text colors have sufficient contrast.
- Ensure that `dataSource`, `xName`, and `yName` are valid.
- Ensure that fields mapped through `yName` contain numeric values.
- Ensure that the chart container exists and has a valid height.
- Call `appendTo` after creating the chart.