# Interaction Features for 3D Charts

## Table of Contents

- [Data Labels](#data-labels)
  - [Enabling Data Labels](#enabling-data-labels)
  - [Data Label Positioning](#data-label-positioning)
  - [Data Label Templates](#data-label-templates)
  - [Styling Data Labels](#styling-data-labels)
- [Tooltips](#tooltips)
  - [Enabling Tooltips](#enabling-tooltips)
  - [Tooltip Format](#tooltip-format)
    - [Inline Tooltip Formatting](#inline-tooltip-formatting)
  - [Tooltip Templates](#tooltip-templates)
  - [Tooltip Styling](#tooltip-styling)
- [Legends](#legends)
  - [Enabling Legends](#enabling-legends)
  - [Legend Positioning](#legend-positioning)
  - [Legend Customization](#legend-customization)
  - [Legend Click Behavior](#legend-click-behavior)
- [Selection and Highlighting](#selection-and-highlighting)
  - [Point Selection](#point-selection)
  - [Series Selection](#series-selection)
  - [Cluster Selection](#cluster-selection)
  - [Highlighting on Hover](#highlighting-on-hover)
- [Events and Callbacks](#events-and-callbacks)
  - [Chart Loaded Event](#chart-loaded-event)
  - [Point Render Event](#point-render-event)
  - [Point Click Event](#point-click-event)
  - [Series Render Event](#series-render-event)
  - [Selection Complete Event](#selection-complete-event)
- [Practical Examples](#practical-examples)
  - [Example 1: Interactive Sales Chart](#example-1-interactive-sales-chart)
  - [Example 2: Stacked Chart with Interactions](#example-2-stacked-chart-with-interactions)
  - [Example 3: Custom Tooltip Template](#example-3-custom-tooltip-template)
- [Troubleshooting](#troubleshooting)
  - [Data Labels Are Not Displayed](#data-labels-are-not-displayed)
  - [Data Labels Are Overlapping](#data-labels-are-overlapping)
  - [Tooltips Are Not Displayed](#tooltips-are-not-displayed)
  - [Legends Are Not Displayed](#legends-are-not-displayed)
  - [Selection Is Not Working](#selection-is-not-working)
  - [Highlighting Is Not Working](#highlighting-is-not-working)
  - [Stacked Series Are Not Displayed](#stacked-series-are-not-displayed)
- [Next Steps](#next-steps)


Learn how to configure data labels, tooltips, legends, selection, highlighting, and interaction events in EJ2 3D Charts.

> Crosshair support is not available in the EJ2 3D Chart. Therefore, this topic documents tooltip interaction without crosshairs.

## Data Labels

Data labels display values directly on chart points, allowing users to read values without hovering over the chart.

The `DataLabel3D` module must be injected before enabling data labels.

### Enabling Data Labels

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D
);

const data: Record<string, string | number>[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      dataLabel: {
        visible: true
      }
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D,
  ej.charts.DataLabel3D
);

var data = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

var chart = new ej.charts.Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      dataLabel: {
        visible: true
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Data Label Positioning

Use the `position` property to place data labels at the top, middle, or bottom of the corresponding chart point.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    }
  ]
});

chart.appendTo('#chart');
```

The available position options are:

- `Top`: Positions the label near the top of the chart point.
- `Middle`: Positions the label in the middle of the chart point.
- `Bottom`: Positions the label near the bottom of the chart point.

### Data Label Templates

Use the `template` property to display custom HTML content in data labels.

The `${point.x}` and `${point.y}` placeholders represent the X-value and Y-value of the current data point.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      dataLabel: {
        visible: true,
        position: 'Top',
        template:
          '<div class="data-label-template">' +
          '<span>${point.x}</span>: ' +
          '<strong>${point.y}</strong>' +
          '</div>'
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Styling Data Labels

Use the `font`, `border`, and `margin` properties to customize data label appearance.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#333333',
          fontFamily: 'Arial',
          fontStyle: 'Italic',
          size: '12px',
          fontWeight: '600'
        },
        border: {
          color: '#000000',
          width: 1
        },
        margin: {
          left: 5,
          right: 5,
          top: 5,
          bottom: 5
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

## Tooltips

Tooltips display information when users hover over chart points. They provide detailed information without permanently occupying chart space.

The `Tooltip3D` module must be injected before enabling tooltips.

### Enabling Tooltips

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Tooltip3D
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Tooltip Format

Use the `format` property to customize tooltip content.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

The commonly used tooltip placeholders are:

- `${point.x}`: Displays the X-value of the hovered data point.
- `${point.y}`: Displays the Y-value of the hovered data point.
- `${series.name}`: Displays the series name.
- `${series.type}`: Displays the series rendering type.

Additional text and supported HTML elements can be included in the format string.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Series: ${series.name}<br>' +
      'Value: ${point.y}'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

#### Inline Tooltip Formatting

The tooltip content can be formatted directly within the `format` property by adding DateTime or number format specifiers to supported tooltip tokens. This allows you to control how point and series values are displayed without using additional events.

A format specifier can be applied by adding a colon (`:`) after the tooltip token, followed by the required format.

```typescript
const chart = new Chart3D({
  tooltip: {
    enable: true,
    format:
      '${series.name}<br>' +
      '${point.x:MMM yyyy}: ${point.y:n2}<br>' +
      'Opacity: ${series.opacity}'
  },
  series: [
    {
      dataSource: data,
      xName: 'date',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      opacity: 0.8
    }
  ]
}, '#chart');
```

In the above example, `${point.x:MMM yyyy}` displays the X-value in month-year format, `${point.y:n2}` displays the Y-value with two decimal places, and `${series.opacity}` displays the opacity applied to the series.

Inline formatting can be applied to the following tooltip tokens:

- `${point.x}` or `${point.x:MMM yyyy}`: Specifies the X-value of the data point, such as a DateTime or category value.
- `${point.y}` or `${point.y:n2}`: Specifies the numeric Y-value of the data point.
- `${series.name}`: Specifies the name assigned to the series.
- `${series.type}`: Specifies the rendering type of the series, such as `Column`, `Bar`, `StackingColumn`, or `StackingBar`.
- `${series.opacity}` or `${series.opacity:n1}`: Specifies the opacity applied to the series.

> **Important:** The availability of point-specific tokens depends on the fields configured in the data source and the 3D Chart series type. The `${series.name}` and `${series.type}` tokens return string values, so DateTime or number formatting is not applied to them.

The following format types are supported:

**DateTime formats:**

- `MMM yyyy`: Displays the abbreviated month and four-digit year.
- `MM:yy`: Displays the two-digit month and year.
- `dd MMM`: Displays the two-digit day and abbreviated month.

**Number formats:**

- `n2`: Displays a number with two decimal places.
- `n0`: Displays a number without decimal places.
- `c2`: Displays the value in currency format with two decimal places.
- `p1`: Displays the value in percentage format with one decimal place.
- `e1`: Displays the value in exponential notation with one decimal place.

If the specified format does not match the resolved value type, the original value is displayed.

> The availability of point-specific values depends on the fields configured through the `xName` and `yName` properties.

### Tooltip Templates

Use the `template` property to display custom HTML content in the tooltip.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    template:
      '<div class="tooltip-template">' +
      '<strong>${point.x}</strong><br>' +
      'Sales: ${point.y}K' +
      '</div>',
    enableAnimation: true
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Tooltip Styling

Use the `textStyle`, `fill`, `border`, and `enableAnimation` properties to customize the tooltip appearance.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    format: '${series.name}: ${point.y}',
    fill: '#333333',
    border: {
      color: '#000000',
      width: 1
    },
    textStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '13px'
    },
    enableAnimation: true
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

## Legends

Legends identify the series rendered in the 3D Chart.

The `Legend3D` module must be injected before displaying a legend. Configure the legend using the `legendSettings` property.

### Enabling Legends

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Legend3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Legend3D
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: data,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Legend Positioning

Use the `position` and `alignment` properties to control the legend location.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Right',
    alignment: 'Center'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
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

Supported alignment values include:

- `Near`
- `Center`
- `Far`

### Legend Customization

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    width: '300px',
    height: '60px',
    shapeWidth: 15,
    shapeHeight: 15,
    padding: 10,
    textStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '12px'
    },
    border: {
      color: '#000000',
      width: 1
    },
    background: '#ffffff'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Legend Click Behavior

Set `toggleVisibility` to `true` to show or hide a series when its legend item is selected.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    toggleVisibility: true
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: data,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

## Selection and Highlighting

Selection allows users to select chart points or series. Highlighting emphasizes chart points or series when users move the pointer over them.

The `Selection3D` and `Highlight3D` modules must be injected when these features are enabled.

### Point Selection

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Selection3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Selection3D
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  selectionMode: 'Point',
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Series Selection

Use the `Series` selection mode to select an entire series.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  selectionMode: 'Series',
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: data,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Cluster Selection

Use the `Cluster` selection mode to select points with the same X-value across multiple series.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  selectionMode: 'Cluster',
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: data,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Highlighting on Hover

The `Highlight3D` module must be injected before enabling highlighting.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Highlight3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Highlight3D
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  highlightMode: 'Point',
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

The selection and highlight modes used by the 3D Chart include:

- `None`
- `Point`
- `Series`
- `Cluster`

## Events and Callbacks

The 3D Chart exposes events that allow an application to respond to loading, rendering, clicking, selection, and other user interactions.

### Chart Loaded Event

Use the `loaded` event to perform an action after the chart has been rendered.

```typescript
const chart: Chart3D = new Chart3D({
  loaded: () => {
    console.log('The 3D Chart has loaded.');
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Point Render Event

The `pointRender` event is triggered before each data point is rendered. It can be used to customize individual points.

```typescript
const chart: Chart3D = new Chart3D({
  pointRender: (args) => {
    if (args.point && args.point.y >= 40) {
      args.fill = '#0F6CBD';
    }
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Point Click Event

The `pointClick` event is triggered when a user clicks a chart point.

```typescript
const chart: Chart3D = new Chart3D({
  pointClick: (args) => {
    if (args.point) {
      console.log(
        'Point clicked:',
        args.point.x,
        args.point.y
      );
    }
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Series Render Event

The `seriesRender` event is triggered before a series is rendered.

```typescript
const chart: Chart3D = new Chart3D({
  seriesRender: (args) => {
    console.log('Series rendered:', args.series.name);
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Selection Complete Event

The `selectionComplete` event provides information about selected data points.

```typescript
const chart: Chart3D = new Chart3D({
  selectionMode: 'Point',
  selectionComplete: (args) => {
    console.log(
      'Selection completed:',
      args.selectedDataValues
    );
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series[
Source: data,
Name: 'month',
Name: 'sales',
: 'Column',
: 'Sales'
To('#chart')    type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

## Practical Examples

### Example 1: Interactive Sales Chart

The following complete TypeScript example includes data labels, tooltips, a legend, point selection, highlighting, and interaction events.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Highlight3D,
  Legend3D,
  Selection3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Tooltip3D,
  Legend3D,
  Selection3D,
  Highlight3D
);

interface SalesData {
  month: string;
  sales: number;
  revenue: number;
}

const data: SalesData[] = [
  { month: 'Jan', sales: 35, revenue: 42 },
  { month: 'Feb', sales: 28, revenue: 44 },
  { month: 'Mar', sales: 34, revenue: 52 },
  { month: 'Apr', sales: 32, revenue: 51 },
  { month: 'May', sales: 40, revenue: 58 }
];

const statusElement: HTMLElement | null =
  document.getElementById('interaction-status');

const chart: Chart3D = new Chart3D({
  title: 'Sales Dashboard',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelPlacement: 'BetweenTicks'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 70,
    interval: 10,
    title: 'Amount in thousands'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}K'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    toggleVisibility: true
  },
  selectionMode: 'Point',
  highlightMode: 'Point',
  loaded: () => {
    if (statusElement) {
      statusElement.textContent =
        'The Sales Dashboard has loaded.';
    }
  },
  pointClick: (args) => {
    if (args.point && statusElement) {
      statusElement.textContent =
        `Selected point: ${String(args.point.x)}, ` +
        `${String(args.point.y)}K`;
    }
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    },
    {
      dataSource: data,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
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
  <title>EJ2 Interactive 3D Chart</title>
</head>
<body>
  <div id="chart" style="height: 450px;"></div>
  <p id="interaction-status">
    Interact with a chart point to view its details.
  </p>

  <script src="index.js"></script>
</body>
</html>
```

### Example 2: Stacked Chart with Interactions

```typescript
import {
  Category3D,
  Chart3D,
  DataLabel3D,
  Highlight3D,
  Legend3D,
  Selection3D,
  StackingColumnSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  StackingColumnSeries3D,
  Category3D,
  DataLabel3D,
  Tooltip3D,
  Legend3D,
  Selection3D,
  Highlight3D
);

interface RegionalData {
  quarter: string;
  north: number;
  south: number;
  east: number;
}

const data: RegionalData[] = [
  { quarter: 'Q1', north: 50, south: 35, east: 25 },
  { quarter: 'Q2', north: 60, south: 40, east: 30 },
  { quarter: 'Q3', north: 70, south: 45, east: 35 },
  { quarter: 'Q4', north: 80, south: 50, east: 40 }
];

const chart: Chart3D = new Chart3D({
  title: 'Regional Sales',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    minimum: 0,
    interval: 20,
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Right',
    toggleVisibility: true
  },
  selectionMode: 'Series',
  highlightMode: 'Point',
  series: [
    {
      dataSource: data,
      xName: 'quarter',
      yName: 'north',
      type: 'StackingColumn',
      name: 'North',
      dataLabel: {
        visible: true,
        position: 'Middle'
      }
    },
    {
      dataSource: data,
      xName: 'quarter',
      yName: 'south',
      type: 'StackingColumn',
      name: 'South',
      dataLabel: {
        visible: true,
        position: 'Middle'
      }
    },
    {
      dataSource: data,
      xName: 'quarter',
      yName: 'east',
      type: 'StackingColumn',
      name: 'East',
      dataLabel: {
        visible: true,
        position: 'Middle'
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Example 3: Custom Tooltip Template

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Tooltip3D
);

interface SalesData {
  month: string;
  sales: number;
}

const data: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const selectedPointElement: HTMLElement | null =
  document.getElementById('selected-point');

const chart: Chart3D = new Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    template:
      '<div class="custom-tooltip">' +
      '<strong>${point.x}</strong><br>' +
      'Sales: ${point.y}K<br>' +
      '<span>Click for details</span>' +
      '</div>',
    enableAnimation: true
  },
  pointClick: (args) => {
    if (args.point && selectedPointElement) {
      selectedPointElement.textContent =
        `Selected: ${String(args.point.x)} - ` +
        `${String(args.point.y)}K`;
    }
  },
  series: [
    {
      dataSource: data,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

**index.html:**

```html
<div id="chart" style="height: 450px;"></div>
<p id="selected-point">
  Select a point to view its details.
</p>
```

**styles.css:**

```css
.custom-tooltip {
  padding: 10px;
}

.custom-tooltip span {
  color: #666666;
  font-size: 12px;
}
```

## Troubleshooting

### Data Labels Are Not Displayed

- Verify that `DataLabel3D` is imported and injected.
- Set `dataLabel.visible` to `true`.
- Ensure that `xName` and `yName` correctly match fields in the data source.
- Ensure that the chart container has a valid width and height.

### Data Labels Are Overlapping

- Reduce the value of `dataLabel.font.size`.
- Use `position: 'Middle'` to display labels inside chart points.
- Increase the chart size.
- Reduce the number of visible data labels on congested charts.
- Use a shorter data label template.

### Tooltips Are Not Displayed

- Verify that `Tooltip3D` is imported and injected.
- Set `tooltip.enable` to `true`.
- Ensure that the series has valid `xName` and `yName` mappings.
- Ensure that the chart container has a valid height.
- Verify that another element is not covering the chart interaction area.

### Legends Are Not Displayed

- Verify that `Legend3D` is imported and injected.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Assign a meaningful `name` to each series.

### Selection Is Not Working

- Verify that `Selection3D` is imported and injected.
- Set `selectionMode` to `Point`, `Series`, or `Cluster`.
- Do not use `Range` as a 3D Chart selection mode.
- Ensure that the chart is not recreated immediately after the selection occurs.

### Highlighting Is Not Working

- Verify that `Highlight3D` is imported and injected.
- Set `highlightMode` to `Point`, `Series`, or `Cluster`.
- Ensure that pointer events are not disabled on the chart container.

### Stacked Series Are Not Displayed

- Import and inject `StackingColumnSeries3D` for the `StackingColumn` series type.
- Ensure that every stacked series uses compatible X-values.
- Ensure that each series has a valid `yName` mapping.

## Next Steps

- **3D settings:** See `3d-settings-and-rotation.md`.
- **Styling:** See `appearance-and-styling.md`.
- **Data handling:** See `data-and-performance.md`.