# Tooltips & Selection

## Table of Contents

- [Tooltips & Selection](#tooltips--selection)
  - [Tooltip Configuration](#tooltip-configuration)
    - [Enable Tooltips](#enable-tooltips)
    - [Tooltip Header](#tooltip-header)
    - [Tooltip Format](#tooltip-format)
    - [Format Placeholders](#format-placeholders)
  - [Inline Tooltip Formatting](#inline-tooltip-formatting)
    - [Supported Inline Tooltip Tokens](#supported-inline-tooltip-tokens)
    - [DateTime Formats](#datetime-formats)
    - [Number Formats](#number-formats)
    - [Inline Formatting with Multiple Tokens](#inline-formatting-with-multiple-tokens)
  - [Complete Tooltip Configuration](#complete-tooltip-configuration)
  - [Tooltip Template](#tooltip-template)
  - [Selection Configuration](#selection-configuration)
    - [Enable Point Selection](#enable-point-selection)
    - [Disable Selection](#disable-selection)
  - [Selection Patterns](#selection-patterns)
  - [Initial Point Selection](#initial-point-selection)
  - [Multi-Select](#multi-select)
  - [Highlight Configuration](#highlight-configuration)
    - [Enable Point Highlighting](#enable-point-highlighting)
    - [Highlight Patterns](#highlight-patterns)
  - [Events](#events)
    - [Point Render Event](#point-render-event)
    - [Point Click Event](#point-click-event)
    - [Selection Complete Event](#selection-complete-event)
    - [Tooltip Render Event](#tooltip-render-event)
  - [Interactive Example](#interactive-example)
    - [TypeScript Example](#typescript-example)
    - [JavaScript Example](#javascript-example)
  - [Selection Pattern Reference](#selection-pattern-reference)
  - [Troubleshooting](#troubleshooting)
    - [Tooltip Is Not Displayed](#tooltip-is-not-displayed)
    - [Tooltip Format Is Not Applied](#tooltip-format-is-not-applied)
    - [Inline Tooltip Formatting Is Not Applied](#inline-tooltip-formatting-is-not-applied)
    - [Tooltip Background Is Not Applied](#tooltip-background-is-not-applied)
    - [Tooltip Text Size Is Not Applied](#tooltip-text-size-is-not-applied)
    - [Tooltip Template Is Not Displayed](#tooltip-template-is-not-displayed)
    - [Selection Is Not Working](#selection-is-not-working)
    - [Selection Pattern Is Not Displayed](#selection-pattern-is-not-displayed)
    - [Highlight Is Not Working](#highlight-is-not-working)
    - [Point Click Event Is Not Triggered](#point-click-event-is-not-triggered)


Tooltips display detailed information when users hover over Accumulation Chart points. Selection emphasizes points after user interaction, while highlighting provides temporary visual feedback when users move the pointer over points.

The `AccumulationTooltip` module must be injected when tooltips are enabled. The regular Cartesian Chart `Tooltip` module must not be used for an Accumulation Chart.

## Tooltip Configuration

### Enable Tooltips

Set `tooltip.enable` to `true` and inject `AccumulationTooltip`.

**TypeScript:**

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

interface SalesData {
  category: string;
  value: number;
}

const chartData: SalesData[] = [
  {
    category: 'Q1',
    value: 25000
  },
  {
    category: 'Q2',
    value: 30000
  },
  {
    category: 'Q3',
    value: 28000
  },
  {
    category: 'Q4',
    value: 32000
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ],
    tooltip: {
      enable: true
    }
  });

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationTooltip
);

var chartData = [
  {
    category: 'Q1',
    value: 25000
  },
  {
    category: 'Q2',
    value: 30000
  },
  {
    category: 'Q3',
    value: 28000
  },
  {
    category: 'Q4',
    value: 32000
  }
];

var chart =
  new ej.charts.AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ],
    tooltip: {
      enable: true
    }
  });

chart.appendTo('#chart');
```

By default, the tooltip displays the X-value and Y-value of the hovered point.

### Tooltip Header

Use the `header` property to provide a tooltip header.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ],
    tooltip: {
      enable: true,
      header: 'Sales Distribution'
    }
  });

chart.appendTo('#chart');
```

Set `header` to an empty string when a header is not required.

```typescript
tooltip: {
  enable: true,
  header: ''
}
```

### Tooltip Format

Use the `format` property to customize the content of the tooltip. Tooltip tokens can be combined with text and supported HTML elements.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ],
    tooltip: {
      enable: true,
      format:
        '<b>${point.x}</b><br>' +
        'Value: ${point.y}'
    }
  });

chart.appendTo('#chart');
```

The series name can also be included:

```typescript
tooltip: {
  enable: true,
  format:
    '<b>${series.name}</b><br>' +
    '${point.x}: ${point.y}'
}
```

### Format Placeholders

The commonly used tooltip tokens include:

- `${point.x}`: Displays the category or X-value of the point.
- `${point.y}`: Displays the numeric Y-value of the point.
- `${point.percentage}`: Displays the percentage contribution of the point.
- `${series.name}`: Displays the configured series name.
- `${series.opacity}`: Displays the opacity applied to the series.

The availability of a token depends on the resolved point and series properties.

Use tokens inside the `format` string exactly as shown:

```typescript
tooltip: {
  enable: true,
  format:
    '<b>${series.name}</b><br>' +
    'Category: ${point.x}<br>' +
    'Value: ${point.y}<br>' +
    'Share: ${point.percentage}%'
}
```

Do not insert spaces between `$` and `{`.

Incorrect:

```typescript
format: '$ {point.x}: $ {point.y}'
```

Correct:

```typescript
format: '${point.x}: ${point.y}'
```

## Inline Tooltip Formatting

Tooltip values can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens.

Apply a format specifier by adding a colon after the token name, followed by the required format.

```typescript
tooltip: {
  enable: true,
  format:
    '${series.name}<br>' +
    '${point.x}: ${point.y:n2}<br>' +
    'Share: ${point.percentage:n1}%<br>' +
    'Opacity: ${series.opacity:n1}'
}
```

In this example:

- `${point.y:n2}` displays the Y-value with two decimal places.
- `${point.percentage:n1}` displays the percentage value with one decimal place.
- `${series.opacity:n1}` displays the series opacity with one decimal place.

Inline formatting is supported in the Accumulation Chart tooltip `format` property and can be applied without using an additional tooltip-render event.

### Supported Inline Tooltip Tokens

Inline formatting can be applied to these tooltip tokens:

- `${point.x}`
- `${point.x:MMM yyyy}`
- `${point.y}`
- `${point.y:n2}`
- `${point.percentage}`
- `${point.percentage:n1}`
- `${series.name}`
- `${series.opacity}`
- `${series.opacity:n1}`

The `${series.name}` token resolves to text, so numeric or DateTime formatting should not be applied to it.

### DateTime Formats

Common DateTime format specifiers include:

- `MMM yyyy`: Abbreviated month and four-digit year.
- `MM:yy`: Two-digit month and year.
- `dd MMM`: Two-digit day and abbreviated month.

Example:

```typescript
interface DateValueData {
  date: Date;
  value: number;
}

const chartData: DateValueData[] = [
  {
    date: new Date(2026, 0, 1),
    value: 12500.5
  },
  {
    date: new Date(2026, 1, 1),
    value: 15300.75
  },
  {
    date: new Date(2026, 2, 1),
    value: 14150.25
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'date',
        yName: 'value',
        type: 'Pie',
        name: 'Monthly Sales'
      }
    ],
    tooltip: {
      enable: true,
      format:
        '<b>${series.name}</b><br>' +
        '${point.x:MMM yyyy}: ${point.y:n2}'
    }
  });

chart.appendTo('#chart');
```

### Number Formats

Common number format specifiers include:

- `n2`: Number with two decimal places.
- `n0`: Number without decimal places.
- `c2`: Currency with two decimal places.
- `p1`: Percentage with one decimal place.
- `e1`: Exponential notation with one decimal place.

Examples:

```typescript
tooltip: {
  enable: true,
  format:
    '${point.x}: ${point.y:n2}'
}
```

```typescript
tooltip: {
  enable: true,
  format:
    '${point.x}: ${point.y:c2}'
}
```

```typescript
tooltip: {
  enable: true,
  format:
    '${point.x}: ${point.y:e1}'
}
```

```typescript
tooltip: {
  enable: true,
  format:
    '${point.x}<br>' +
    'Share: ${point.percentage:n1}%'
}
```

If a formatting specifier is incompatible with the resolved value type, the original value is displayed.

### Inline Formatting with Multiple Tokens

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Quarterly Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales',
        opacity: 0.9
      }
    ],
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${series.name}</b><br>' +
        'Quarter: ${point.x}<br>' +
        'Sales: ${point.y:c2}<br>' +
        'Share: ${point.percentage:n1}%<br>' +
        'Opacity: ${series.opacity:n1}'
    }
  });

chart.appendTo('#chart');
```

## Complete Tooltip Configuration

Use `fill`, not `background`, to customize the tooltip background.

Use `textStyle.size`, not `textStyle.fontSize`, to customize the tooltip text size.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Quarterly Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ],
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:c2}<br>' +
        'Share: ${point.percentage:n1}%',
      opacity: 0.9,
      fill: '#FFFFFF',
      border: {
        color: '#000000',
        width: 1
      },
      textStyle: {
        color: '#000000',
        fontFamily: 'Segoe UI',
        size: '12px',
        fontStyle: 'Normal',
        fontWeight: '400'
      },
      enableAnimation: true
    }
  });

chart.appendTo('#chart');
```

Supported tooltip styling settings include the tooltip fill, border, text style, opacity, and animation behavior.

## Tooltip Template

Use `template` when the tooltip requires a custom HTML structure.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ],
    tooltip: {
      enable: true,
      template:
        '<div class="custom-tooltip">' +
        '<b>${point.x}</b><br>' +
        'Value: ${point.y}' +
        '</div>'
    }
  });

chart.appendTo('#chart');
```

The corresponding CSS is:

```css
.custom-tooltip {
  padding: 8px;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  background: #FFFFFF;
  color: #242424;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
}
```

If the installed package version resolves template fields through direct aliases, `${x}` and `${y}` can be used in the template. For documentation consistency, validate the template token syntax against the targeted EJ2 version before publication.

Use `format` when only formatted text is required. Use `template` when custom HTML structure or CSS classes are required.

## Selection Configuration

The `AccumulationSelection` module must be imported and injected before point selection is enabled.

The supported Accumulation Chart selection modes are:

- `Point`
- `None`

Do not document `Series` as an Accumulation Chart selection mode.

### Enable Point Selection

**TypeScript:**

```typescript
import {
  AccumulationChart,
  AccumulationSelection,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationSelection
);

const chart: AccumulationChart =
  new AccumulationChart({
    selectionMode: 'Point',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationSelection
);

var chart =
  new ej.charts.AccumulationChart({
    selectionMode: 'Point',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

### Disable Selection

Set `selectionMode` to `None`.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    selectionMode: 'None',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

The `AccumulationSelection` module is not required when selection is disabled and no selection feature is used.

## Selection Patterns

Use the chart-level `selectionPattern` property to apply a visual pattern to selected points.

```typescript
import {
  AccumulationChart,
  AccumulationSelection,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationSelection
);

const chart: AccumulationChart =
  new AccumulationChart({
    selectionMode: 'Point',
    selectionPattern: 'DiagonalForward',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Do not configure a `selectionStyle` object inside an Accumulation Chart series unless that property is explicitly available in the targeted package version.

Use `selectionPattern` for the documented pattern-based selection appearance.

## Initial Point Selection

Use `selectedDataIndexes` to select one or more points when the chart is initially rendered.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    selectionMode: 'Point',
    selectedDataIndexes: [
      {
        series: 0,
        point: 1
      }
    ],
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

In this example, the second point in the first series is selected initially.

## Multi-Select

Set `isMultiSelect` to `true` to allow multiple points to remain selected.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    selectionMode: 'Point',
    isMultiSelect: true,
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

When `isMultiSelect` is `false`, selecting another point replaces the previous selection.

## Highlight Configuration

The `AccumulationHighlight` module must be imported and injected before point highlighting is enabled.

### Enable Point Highlighting

```typescript
import {
  AccumulationChart,
  AccumulationHighlight,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationHighlight
);

const chart: AccumulationChart =
  new AccumulationChart({
    highlightMode: 'Point',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Set `highlightMode` to `None` when highlighting is not required.

```typescript
highlightMode: 'None'
```

### Highlight Patterns

Use the chart-level `highlightPattern` property with `highlightMode: 'Point'`.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    highlightMode: 'Point',
    highlightPattern: 'DiagonalForward',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

The `AccumulationHighlight` module must be injected for this configuration.

## Events

### Point Render Event

The `pointRender` event is triggered before an accumulation point is rendered. It can be used to customize the point appearance.

```typescript
import {
  AccumulationChart,
  IAccPointRenderEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

const chart: AccumulationChart =
  new AccumulationChart({
    pointRender: (
      args: IAccPointRenderEventArgs
    ): void => {
      if (
        args.point &&
        typeof args.point.y === 'number' &&
        args.point.y >= 30000
      ) {
        args.fill = '#0F6CBD';
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

The `pointRender` event is a rendering event. It is not a selection event.

### Point Click Event

The `pointClick` event is triggered when a user clicks an accumulation point.

```typescript
import {
  AccumulationChart,
  IAccPointClickEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

const statusElement: HTMLElement | null =
  document.getElementById('selection-status');

const chart: AccumulationChart =
  new AccumulationChart({
    pointClick: (
      args: IAccPointClickEventArgs
    ): void => {
      if (args.point && statusElement) {
        statusElement.textContent =
          `Selected ${String(args.point.x)}: ` +
          `${String(args.point.y)}`;
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Use an application status element instead of relying only on console output.

```html
<p id="selection-status" aria-live="polite">
  Select a chart point to view its value.
</p>
```

### Selection Complete Event

Use `selectionComplete` to respond after point selection has completed.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    selectionMode: 'Point',
    selectionComplete: (args): void => {
      console.log(
        'Selection completed:',
        args.selectedDataValues
      );
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Inject `AccumulationSelection` when `selectionMode` is set to `Point`.

### Tooltip Render Event

Use `tooltipRender` when tooltip text must be changed dynamically at runtime.

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
      enable: true
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Quarterly Sales'
      }
    ]
  });

chart.appendTo('#chart');
```

Use inline tooltip formatting in `tooltip.format` when standard DateTime or number formatting is sufficient. Use `tooltipRender` only when conditional runtime logic is required.

## Interactive Example

### TypeScript Example

The following complete example includes:

- Data labels.
- Tooltip formatting.
- Inline tooltip number formatting.
- Point selection.
- Multiple selection.
- Selection pattern.
- Point highlighting.
- Highlight pattern.
- Point-click feedback.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationHighlight,
  AccumulationSelection,
  AccumulationTooltip,
  IAccPointClickEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationTooltip,
  AccumulationSelection,
  AccumulationHighlight
);

interface SalesData {
  quarter: string;
  sales: number;
  label: string;
}

const chartData: SalesData[] = [
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

const statusElement: HTMLElement | null =
  document.getElementById('selection-status');

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Quarterly Sales Distribution',
    selectionMode: 'Point',
    selectionPattern: 'DiagonalForward',
    isMultiSelect: true,
    highlightMode: 'Point',
    highlightPattern: 'Dots',
    selectedDataIndexes: [
      {
        series: 0,
        point: 1
      }
    ],
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${series.name}</b><br>' +
        'Quarter: ${point.x}<br>' +
        'Sales: ${point.y:c2}<br>' +
        'Share: ${point.percentage:n1}%',
      fill: '#FFFFFF',
      opacity: 0.95,
      border: {
        color: '#808080',
        width: 1
      },
      textStyle: {
        color: '#242424',
        fontFamily: 'Segoe UI',
        size: '12px'
      }
    },
    pointClick: (
      args: IAccPointClickEventArgs
    ): void => {
      if (args.point && statusElement) {
        statusElement.textContent =
          `Selected ${String(args.point.x)} ` +
          `with sales of ${String(args.point.y)}.`;
      }
    },
    series: [
      {
        dataSource: chartData,
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
        explodeOffset: '8%'
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
<div
  id="chart"
  role="region"
  aria-label="Quarterly sales accumulation chart"
></div>

<p id="selection-status" aria-live="polite">
  Select a chart point to view its details.
</p>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 400px;
}
```

### JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel,
  ej.charts.AccumulationTooltip,
  ej.charts.AccumulationSelection,
  ej.charts.AccumulationHighlight
);

var chartData = [
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

var statusElement =
  document.getElementById('selection-status');

var chart =
  new ej.charts.AccumulationChart({
    title: 'Quarterly Sales Distribution',
    selectionMode: 'Point',
    selectionPattern: 'DiagonalForward',
    isMultiSelect: true,
    highlightMode: 'Point',
    highlightPattern: 'Dots',
    selectedDataIndexes: [
      {
        series: 0,
        point: 1
      }
    ],
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${series.name}</b><br>' +
        'Quarter: ${point.x}<br>' +
        'Sales: ${point.y:c2}<br>' +
        'Share: ${point.percentage:n1}%',
      fill: '#FFFFFF',
      opacity: 0.95,
      border: {
        color: '#808080',
        width: 1
      },
      textStyle: {
        color: '#242424',
        fontFamily: 'Segoe UI',
        size: '12px'
      }
    },
    pointClick: function (args) {
      if (args.point && statusElement) {
        statusElement.textContent =
          'Selected ' +
          String(args.point.x) +
          ' with sales of ' +
          String(args.point.y) +
          '.';
      }
    },
    series: [
      {
        dataSource: chartData,
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
        explodeOffset: '8%'
      }
    ]
  });

chart.appendTo('#chart');
```

## Selection Pattern Reference

Common selection and highlight patterns include:

- `None`
- `Chessboard`
- `Dots`
- `DiagonalForward`
- `DiagonalBackward`
- `Grid`
- `Turquoise`
- `Star`
- `Triangle`
- `Circle`
- `Tile`
- `HorizontalDash`
- `VerticalDash`
- `Rectangle`
- `Box`
- `HorizontalStripe`
- `VerticalStripe`
- `Bubble`

Use only pattern values supported by the installed `@syncfusion/ej2-charts` package version.

Do not document `PatternByIndex` or `Chequered` unless those exact enum values are verified in the targeted package version.

## Troubleshooting

### Tooltip Is Not Displayed

- Import `AccumulationTooltip`.
- Inject `AccumulationTooltip` through `AccumulationChart.Inject(...)`.
- Do not inject the regular Chart `Tooltip` module.
- Set `tooltip.enable` to `true`.
- Ensure that the Accumulation Chart is rendered successfully.
- Ensure that another element is not covering the chart.
- Confirm that pointer events are not disabled.
- Check the browser console for errors.

### Tooltip Format Is Not Applied

- Use valid tooltip tokens.
- Do not insert spaces between `$` and `{`.
- Use `${point.x}` instead of `$ {point.x}`.
- Use `${point.y}` instead of `$ {point.y}`.
- Use `format`, not an unrelated property.
- Ensure that the formatted value resolves to the expected data type.
- Confirm that no `tooltipRender` event is replacing the formatted text.

### Inline Tooltip Formatting Is Not Applied

- Place the format specifier inside the tooltip token.
- Use `${point.y:n2}`, not `${point.y}:n2`.
- Use `${point.percentage:n1}`, not `${point.percentage}:n1`.
- Use a numeric format only for numeric values.
- Use a DateTime format only for compatible DateTime values.
- Do not apply numeric formatting to `${series.name}`.
- Verify that the targeted EJ2 package version includes inline tooltip formatting support.

### Tooltip Background Is Not Applied

- Use `tooltip.fill`.
- Do not use `tooltip.background`.
- Supply a valid CSS color.
- Ensure that an external template is not overriding the tooltip appearance.

### Tooltip Text Size Is Not Applied

- Use `tooltip.textStyle.size`.
- Do not use `tooltip.textStyle.fontSize`.
- Supply a string value such as `12px`.

### Tooltip Template Is Not Displayed

- Set `tooltip.enable` to `true`.
- Ensure that the template contains valid HTML.
- Validate the template token syntax against the installed EJ2 version.
- Avoid untrusted user-generated HTML.
- Ensure that global CSS does not hide the template.
- Check the browser console for template errors.

### Selection Is Not Working

- Import and inject `AccumulationSelection`.
- Set `selectionMode` to `Point`.
- Do not use `Series` as the Accumulation Chart selection mode.
- Ensure that pointer events are enabled.
- Ensure that no overlay covers the chart.
- Confirm that the selected point is not disabled or empty.

### Selection Pattern Is Not Displayed

- Inject `AccumulationSelection`.
- Set `selectionMode` to `Point`.
- Set `selectionPattern` at the chart level.
- Use a pattern supported by the installed package version.
- Do not place a `selectionStyle` object inside the series.
- Ensure that the selected segment is large enough for the pattern to be visible.

### Highlight Is Not Working

- Import and inject `AccumulationHighlight`.
- Set `highlightMode` to `Point`.
- Apply `highlightPattern` at the chart level.
- Ensure that pointer interaction is not blocked.
- Do not assume that injecting `AccumulationSelection` also enables highlighting.

### Point Click Event Is Not Triggered

- Ensure that `pointClick` is assigned to the chart configuration.
- Ensure that the clicked location is inside a rendered segment.
- Ensure that no transparent overlay covers the chart.
- Use the correct `IAccPointClickEventArgs` interface for TypeScript.
- Check the browser console for runtime errors.