# Annotations & Features

## Table of Contents

- [Annotations & Features](#annotations--features)
  - [Annotations](#annotations)
    - [Basic Annotation](#basic-annotation)
    - [HTML Annotation](#html-annotation)
    - [Annotation Positioning](#annotation-positioning)
    - [Multiple Annotations](#multiple-annotations)
  - [Gradient Fills](#gradient-fills)
    - [Linear Gradient](#linear-gradient)
    - [Radial Gradient](#radial-gradient)
    - [Point-Level Colors](#point-level-colors)
    - [Custom Color Palettes](#custom-color-palettes)
  - [Center Labels](#center-labels)
    - [Basic Center Label](#basic-center-label)
    - [Center Label Hover Text](#center-label-hover-text)
    - [Center Label Text Style](#center-label-text-style)
    - [Dynamic Center Label](#dynamic-center-label)
  - [Grouping and Clubbing Points](#grouping-and-clubbing-points)
    - [Group by Value](#group-by-value)
    - [Group by Percentage](#group-by-percentage)
    - [Group by Point Count](#group-by-point-count)
    - [Customize the Grouped Point](#customize-the-grouped-point)
  - [Empty Point Handling](#empty-point-handling)
    - [Empty Point Modes](#empty-point-modes)
    - [Custom Empty Point Style](#custom-empty-point-style)
    - [No Data Template](#no-data-template)
  - [Combined Features Example](#combined-features-example)
    - [TypeScript Example](#typescript-example)
    - [JavaScript Example](#javascript-example)
  - [Troubleshooting](#troubleshooting)
    - [Annotation Is Not Displayed](#annotation-is-not-displayed)
    - [Annotation Position Is Incorrect](#annotation-position-is-incorrect)
    - [Gradient Is Not Displayed](#gradient-is-not-displayed)
    - [Point Colors Are Not Displayed](#point-colors-are-not-displayed)
    - [Custom Palette Is Not Applied](#custom-palette-is-not-applied)
    - [Center Label Is Not Visible](#center-label-is-not-visible)
    - [Center Label Hover Text Is Not Updated](#center-label-hover-text-is-not-updated)
    - [Grouped Points Are Not Displayed](#grouped-points-are-not-displayed)
    - [Too Many Points Are Grouped](#too-many-points-are-grouped)
    - [Empty Points Are Not Displayed](#empty-points-are-not-displayed)
    - [No-Data Content Is Not Displayed](#no-data-content-is-not-displayed)

The EJ2 Accumulation Chart supports annotations, linear and radial gradients, Pie and Doughnut center labels, grouping of small points, empty-point handling, and custom no-data content.

The required modules must be imported and injected before using the corresponding chart types and features.

## Annotations

Annotations display custom HTML content at a specified location in the Accumulation Chart.

Use annotations to display:

- Explanatory text.
- KPI values.
- Important notices.
- Custom HTML elements.
- Images or icons.
- Additional contextual information.

Import and inject `AccumulationAnnotation` before configuring annotations.

### Basic Annotation

**TypeScript:**

```typescript
import {
  AccumulationAnnotation,
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationAnnotation
);

interface SalesData {
  category: string;
  value: number;
}

const chartData: SalesData[] = [
  {
    category: 'Product A',
    value: 35
  },
  {
    category: 'Product B',
    value: 30
  },
  {
    category: 'Product C',
    value: 20
  },
  {
    category: 'Product D',
    value: 15
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ],
    annotations: [
      {
        content:
          '<div class="chart-annotation">' +
          'Important Note' +
          '</div>',
        x: '50%',
        y: '50%',
        coordinateUnits: 'Pixel'
      }
    ]
  });

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationAnnotation
);

var chartData = [
  {
    category: 'Product A',
    value: 35
  },
  {
    category: 'Product B',
    value: 30
  },
  {
    category: 'Product C',
    value: 20
  },
  {
    category: 'Product D',
    value: 15
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Product Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ],
    annotations: [
      {
        content:
          '<div class="chart-annotation">' +
          'Important Note' +
          '</div>',
        x: '50%',
        y: '50%',
        coordinateUnits: 'Pixel'
      }
    ]
  });

chart.appendTo('#chart');
```

```css
.chart-annotation {
  padding: 8px 12px;
  border: 1px solid #808080;
  border-radius: 4px;
  background: #FFFFFF;
  color: #242424;
  font-family: "Segoe UI", sans-serif;
  font-size: 13px;
}
```

### HTML Annotation

Use the `content` property to provide custom HTML.

```typescript
annotations: [
  {
    content:
      '<div class="important-annotation">' +
      '<strong>Top Performer</strong><br>' +
      '<span>Product A</span>' +
      '</div>',
    x: '72%',
    y: '24%',
    coordinateUnits: 'Pixel'
  }
]
```

```css
.important-annotation {
  padding: 10px;
  border-radius: 5px;
  background: #D83B01;
  color: #FFFFFF;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  text-align: center;
}
```

Do not insert untrusted user-provided HTML directly into annotation content.

### Annotation Positioning

The main annotation-positioning properties are:

- `x`: Specifies the horizontal position.
- `y`: Specifies the vertical position.
- `coordinateUnits`: Specifies how the annotation position is interpreted.
- `region`: Specifies the chart region relative to which the annotation is positioned.

Supported coordinate units include:

- `Pixel`
- `Point`

Use `Pixel` for positions relative to the chart area. Use `Point` when the annotation must be associated with a data point.

Do not use `Pixels` or `Percentage` as `coordinateUnits` values.

Example using pixel-based positioning:

```typescript
annotations: [
  {
    content:
      '<div class="chart-annotation">' +
      'Sales Summary' +
      '</div>',
    x: '50%',
    y: '50%',
    coordinateUnits: 'Pixel'
  }
]
```

Example using point-based positioning:

```typescript
annotations: [
  {
    content:
      '<div class="point-annotation">' +
      'Highest Value' +
      '</div>',
    x: 'Product A',
    y: 35,
    coordinateUnits: 'Point'
  }
]
```

Test point-based annotation positioning against the targeted series type and package version.

### Multiple Annotations

Configure multiple objects in the `annotations` collection.

```typescript
annotations: [
  {
    content:
      '<div class="chart-annotation">' +
      'Sales Distribution' +
      '</div>',
    x: '50%',
    y: '10%',
    coordinateUnits: 'Pixel'
  },
  {
    content:
      '<div class="important-annotation">' +
      'Top Performer' +
      '</div>',
    x: '72%',
    y: '24%',
    coordinateUnits: 'Pixel'
  }
]
```

Keep annotations concise to avoid covering chart points, data labels, or legends.

## Gradient Fills

The Accumulation Chart supports linear and radial gradient configurations. Gradient models use color stops to blend colors across the chart points.

The chart API includes `LinearGradient`, `RadialGradient`, and `GradientColorStop` models.

Do not configure a gradient through a nested chart-level `background.gradient` object.

### Linear Gradient

Use the series-level `linearGradient` property to apply a linear gradient.

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        border: {
          color: '#FFFFFF',
          width: 2
        },
        linearGradient: {
          x1: 0.1,
          y1: 0,
          x2: 0.9,
          y2: 1,
          gradientColorStop: [
            {
              color: '#4F46E5',
              offset: 0,
              opacity: 1,
              brighten: 0.55
            },
            {
              color: '#4F46E5',
              offset: 60,
              opacity: 0.98,
              brighten: 0.15
            },
            {
              color: '#4F46E5',
              offset: 100,
              opacity: 0.95,
              brighten: -0.25
            }
          ]
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Linear gradient coordinates are generally expressed between `0` and `1`, and color-stop offsets are expressed from `0` to `100`. Gradient color stops can configure color, offset, opacity, and brightness adjustments.

### Radial Gradient

Use `radialGradient` when the color should transition outward from a center point.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        radialGradient: {
          cx: 0.5,
          cy: 0.5,
          r: 0.5,
          fx: 0.5,
          fy: 0.5,
          gradientColorStop: [
            {
              color: '#60A5FA',
              offset: 0,
              opacity: 1
            },
            {
              color: '#1D4ED8',
              offset: 100,
              opacity: 1
            }
          ]
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Use gradient values supported by the installed `@syncfusion/ej2-charts` package version.

### Point-Level Colors

Use `pointColorMapping` when each point requires a specific solid color from the data source.

```typescript
interface ColoredSalesData {
  category: string;
  value: number;
  color: string;
}

const chartData: ColoredSalesData[] = [
  {
    category: 'Product A',
    value: 25,
    color: '#FF5733'
  },
  {
    category: 'Product B',
    value: 30,
    color: '#33A852'
  },
  {
    category: 'Product C',
    value: 20,
    color: '#3357FF'
  },
  {
    category: 'Product D',
    value: 25,
    color: '#8764B8'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        pointColorMapping: 'color',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

`pointColorMapping` maps solid point colors. It is not itself a gradient configuration.

### Custom Color Palettes

Use `palettes`, not `palette`, to provide a custom color collection.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    palettes: [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#FFA07A',
      '#98D8C8',
      '#6C5CE7'
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

A palette supplies separate solid colors. It does not automatically create a gradient between the colors.

## Center Labels

The chart-level `centerLabel` property displays text at the center of Pie and Doughnut charts.

The center-label model supports:

- `text`
- `hoverTextFormat`
- `textStyle`

Center labels are particularly useful in Doughnut charts because the nonzero `innerRadius` creates a clear central area.

### Basic Center Label

A Doughnut Chart uses the `Pie` series type with a nonzero `innerRadius`.

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

const chart: AccumulationChart =
  new AccumulationChart({
    centerLabel: {
      text: 'Total Sales'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        radius: '90%',
        innerRadius: '55%'
      }
    ]
  });

chart.appendTo('#chart');
```

Do not use `type: 'Doughnut'`. A Doughnut Chart is created by configuring `innerRadius` on a Pie series.

### Center Label Hover Text

Use `hoverTextFormat` to replace the default center text when the pointer moves over a Pie or Doughnut segment.

```typescript
centerLabel: {
  text: 'Sales 2026',
  hoverTextFormat:
    '${point.x}: ${point.y}'
}
```

A complete example is:

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    centerLabel: {
      text: 'Sales 2026',
      hoverTextFormat:
        '${point.x}<br>${point.y}'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        innerRadius: '60%'
      }
    ]
  });

chart.appendTo('#chart');
```

### Center Label Text Style

Use `textStyle`, not `font`, to customize center-label text.

```typescript
centerLabel: {
  text: 'Total Sales',
  hoverTextFormat:
    '${point.x}: ${point.y}',
  textStyle: {
    color: '#2F5496',
    fontFamily: 'Segoe UI',
    size: '16px',
    fontStyle: 'Normal',
    fontWeight: '600'
  }
}
```

Incorrect:

```typescript
centerLabel: {
  font: {
    size: '16px'
  }
}
```

Correct:

```typescript
centerLabel: {
  textStyle: {
    size: '16px'
  }
}
```

### Dynamic Center Label

Calculate the total before creating the chart.

```typescript
interface QuarterlySalesData {
  quarter: string;
  sales: number;
}

const chartData: QuarterlySalesData[] = [
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

const totalSales: number = chartData.reduce(
  (
    total: number,
    item: QuarterlySalesData
  ): number => total + item.sales,
  0
);

const chart: AccumulationChart =
  new AccumulationChart({
    centerLabel: {
      text:
        `Total<br>$${(totalSales / 1000).toFixed(0)}K`,
      hoverTextFormat:
        '${point.x}<br>${point.y:c0}',
      textStyle: {
        color: '#1F4E79',
        fontFamily: 'Segoe UI',
        size: '16px',
        fontWeight: '600'
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'quarter',
        yName: 'sales',
        type: 'Pie',
        innerRadius: '60%'
      }
    ]
  });

chart.appendTo('#chart');
```

Use concise center text so it fits within the configured `innerRadius`.

## Grouping and Clubbing Points

Use `groupTo` to combine smaller points into a single `Others` point.

The grouping behavior is controlled by:

- `groupTo`
- `groupMode`

The documented grouping modes are:

- `Value`
- `Point`

A numeric `groupTo` value can group points below a value threshold. A percentage string can group points below a percentage of the total. When `groupMode` is `Point`, the first specified number of points remain separate and the remaining points are grouped.

Do not use `groupPadding` for point grouping.

### Group by Value

Use the default `Value` mode to group points whose values are below the specified threshold.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        groupMode: 'Value',
        groupTo: '5000'
      }
    ]
  });

chart.appendTo('#chart');
```

Points with values below `5000` are grouped into the `Others` point.

### Group by Percentage

Provide a percentage string through `groupTo`.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        groupMode: 'Value',
        groupTo: '5%'
      }
    ]
  });

chart.appendTo('#chart');
```

Points whose values are below the configured percentage of the total are grouped.

There is no separate `Percentage` value for `groupMode`.

Incorrect:

```typescript
groupMode: 'Percentage',
groupPadding: 5
```

Correct:

```typescript
groupMode: 'Value',
groupTo: '5%'
```

### Group by Point Count

Set `groupMode` to `Point` and use `groupTo` to specify how many points should remain individually visible.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        groupMode: 'Point',
        groupTo: '4'
      }
    ]
  });

chart.appendTo('#chart');
```

In this example:

- The first four points remain separate.
- The remaining points are combined into `Others`.

The order of the data source affects point-count grouping.

### Customize the Grouped Point

Use `pointRender` to customize the grouped `Others` point and `textRender` to customize its data label.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  IAccPointRenderEventArgs,
  IAccTextRenderEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel
);

const chart: AccumulationChart =
  new AccumulationChart({
    pointRender: (
      args: IAccPointRenderEventArgs
    ): void => {
      if (
        args.point &&
        String(args.point.x).includes('Others')
      ) {
        args.fill = '#808080';
      }
    },
    textRender: (
      args: IAccTextRenderEventArgs
    ): void => {
      if (args.text.includes('Others')) {
        args.text = 'Other Products';
        args.color = '#242424';
        args.border.color = '#808080';
        args.border.width = 1;
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        groupMode: 'Value',
        groupTo: '5000',
        dataLabel: {
          visible: true,
          position: 'Outside'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

The label assigned automatically to the grouped point is `Others`. Use events when a different display label is required.

## Empty Point Handling

Data points with `null` or `undefined` Y-values are treated as empty points. They can be customized using the series `emptyPointSettings` property.

### Empty Point Modes

Supported empty-point modes include:

- `Gap`: Displays the empty point as a gap.
- `Zero`: Treats the empty point as zero.
- `Drop`: Ignores the empty point during rendering.
- `Average`: Uses the average of the previous and next points.

The documented default mode is `Gap`.

```typescript
interface MonthlyData {
  month: string;
  value: number | null | undefined;
}

const chartData: MonthlyData[] = [
  {
    month: 'Jan',
    value: 20
  },
  {
    month: 'Feb',
    value: null
  },
  {
    month: 'Mar',
    value: 25
  },
  {
    month: 'Apr',
    value: undefined
  },
  {
    month: 'May',
    value: 30
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        emptyPointSettings: {
          mode: 'Gap'
        }
      }
    ]
  });

chart.appendTo('#chart');
```

### Custom Empty Point Style

Use `fill` and `border` to customize empty points when the selected mode renders them.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        emptyPointSettings: {
          mode: 'Average',
          fill: '#CBCBCB',
          border: {
            color: '#808080',
            width: 2
          }
        }
      }
    ]
  });

chart.appendTo('#chart');
```

The empty-point settings model supports `mode`, `fill`, and `border`.

When `Drop` or `Gap` prevents an empty point from being rendered, its fill and border may not be visually apparent.

### No Data Template

Use `noDataTemplate` when the complete data source is empty and the chart should display custom content instead of an empty plotting area.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    noDataTemplate:
      '<div class="no-data-template">' +
      '<strong>No sales data available</strong><br>' +
      '<span>Update the filters or load another period.</span>' +
      '</div>',
    series: [
      {
        dataSource: [],
        xName: 'category',
        yName: 'value',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

```css
.no-data-template {
  padding: 16px;
  border: 1px solid #D3D3D3;
  border-radius: 6px;
  background: #F8F9FA;
  color: #424242;
  font-family: "Segoe UI", sans-serif;
  text-align: center;
}
```

Do not insert unsanitized user content into `noDataTemplate`.

## Combined Features Example

### TypeScript Example

The following example includes:

- A Doughnut Chart.
- Point-color mapping.
- Percentage-based grouping.
- Outside data labels.
- Inline tooltip formatting.
- A center label.
- An annotation.
- Empty-point handling.
- Legend support.

```typescript
import {
  AccumulationAnnotation,
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  IAccPointRenderEventArgs,
  IAccTextRenderEventArgs,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  AccumulationAnnotation
);

interface ProductSalesData {
  product: string;
  sales: number | null;
  color: string;
  label: string;
}

const salesData: ProductSalesData[] = [
  {
    product: 'Product A',
    sales: 25000,
    color: '#FF6B6B',
    label: 'Product A'
  },
  {
    product: 'Product B',
    sales: 30000,
    color: '#4ECDC4',
    label: 'Product B'
  },
  {
    product: 'Product C',
    sales: 20000,
    color: '#45B7D1',
    label: 'Product C'
  },
  {
    product: 'Product D',
    sales: 15000,
    color: '#FFA07A',
    label: 'Product D'
  },
  {
    product: 'Product E',
    sales: 3000,
    color: '#98D8C8',
    label: 'Product E'
  },
  {
    product: 'Product F',
    sales: null,
    color: '#CBCBCB',
    label: 'Product F'
  }
];

const totalSales: number = salesData.reduce(
  (
    total: number,
    item: ProductSalesData
  ): number => total + (item.sales ?? 0),
  0
);

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Sales Distribution',
    width: '100%',
    height: '460px',
    enableSmartLabels: true,
    centerLabel: {
      text:
        `Total<br>$${(totalSales / 1000).toFixed(0)}K`,
      hoverTextFormat:
        '${point.x}<br>${point.y:c0}',
      textStyle: {
        color: '#1F4E79',
        fontFamily: 'Segoe UI',
        size: '16px',
        fontWeight: '600'
      }
    },
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:c0}<br>' +
        'Share: ${point.percentage:n1}%'
    },
    annotations: [
      {
        content:
          '<div class="top-performer-annotation">' +
          '<strong>Top Performer</strong><br>' +
          'Product B' +
          '</div>',
        x: '62%',
        y: '18%',
        coordinateUnits: 'Pixel'
      }
    ],
    pointRender: (
      args: IAccPointRenderEventArgs
    ): void => {
      if (
        args.point &&
        String(args.point.x).includes('Others')
      ) {
        args.fill = '#808080';
      }
    },
    textRender: (
      args: IAccTextRenderEventArgs
    ): void => {
      if (args.text.includes('Others')) {
        args.text = 'Other Products';
      }
    },
    series: [
      {
        dataSource: salesData,
        xName: 'product',
        yName: 'sales',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Product Sales',
        radius: '86%',
        innerRadius: '58%',
        groupMode: 'Value',
        groupTo: '5%',
        border: {
          color: '#FFFFFF',
          width: 2
        },
        emptyPointSettings: {
          mode: 'Average',
          fill: '#CBCBCB',
          border: {
            color: '#808080',
            width: 1
          }
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
<div
  id="chart"
  role="region"
  aria-label="Doughnut chart showing product sales distribution"
></div>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 460px;
}

.top-performer-annotation {
  padding: 8px 10px;
  border: 1px solid #B8860B;
  border-radius: 4px;
  background: #FFD700;
  color: #242424;
  font-family: "Segoe UI", sans-serif;
  font-size: 12px;
  text-align: center;
}
```

### JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationTooltip,
  ej.charts.AccumulationAnnotation
);

var salesData = [
  {
    product: 'Product A',
    sales: 25000,
    color: '#FF6B6B',
    label: 'Product A'
  },
  {
    product: 'Product B',
    sales: 30000,
    color: '#4ECDC4',
    label: 'Product B'
  },
  {
    product: 'Product C',
    sales: 20000,
    color: '#45B7D1',
    label: 'Product C'
  },
  {
    product: 'Product D',
    sales: 15000,
    color: '#FFA07A',
    label: 'Product D'
  },
  {
    product: 'Product E',
    sales: 3000,
    color: '#98D8C8',
    label: 'Product E'
  },
  {
    product: 'Product F',
    sales: null,
    color: '#CBCBCB',
    label: 'Product F'
  }
];

var totalSales = salesData.reduce(
  function (total, item) {
    return total + (item.sales || 0);
  },
  0
);

var chart =
  new ej.charts.AccumulationChart({
    title: 'Product Sales Distribution',
    width: '100%',
    height: '460px',
    enableSmartLabels: true,
    centerLabel: {
      text:
        'Total<br>$' +
        (totalSales / 1000).toFixed(0) +
        'K',
      hoverTextFormat:
        '${point.x}<br>${point.y:c0}',
      textStyle: {
        color: '#1F4E79',
        fontFamily: 'Segoe UI',
        size: '16px',
        fontWeight: '600'
      }
    },
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:c0}<br>' +
        'Share: ${point.percentage:n1}%'
    },
    annotations: [
      {
        content:
          '<div class="top-performer-annotation">' +
          '<strong>Top Performer</strong><br>' +
          'Product B' +
          '</div>',
        x: '62%',
        y: '18%',
        coordinateUnits: 'Pixel'
      }
    ],
    pointRender: function (args) {
      if (
        args.point &&
        String(args.point.x).indexOf('Others') !== -1
      ) {
        args.fill = '#808080';
      }
    },
    textRender: function (args) {
      if (
        args.text.indexOf('Others') !== -1
      ) {
        args.text = 'Other Products';
      }
    },
    series: [
      {
        dataSource: salesData,
        xName: 'product',
        yName: 'sales',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Product Sales',
        radius: '86%',
        innerRadius: '58%',
        groupMode: 'Value',
        groupTo: '5%',
        border: {
          color: '#FFFFFF',
          width: 2
        },
        emptyPointSettings: {
          mode: 'Average',
          fill: '#CBCBCB',
          border: {
            color: '#808080',
            width: 1
          }
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
```

## Troubleshooting

### Annotation Is Not Displayed

- Import and inject `AccumulationAnnotation`.
- Add the annotation to the chart-level `annotations` collection.
- Use `Pixel` or `Point` for `coordinateUnits`.
- Do not use `Pixels` or `Percentage`.
- Ensure that the X and Y positions are within the visible chart area.
- Ensure that annotation content is valid HTML.
- Check whether another chart element covers the annotation.
- Check the browser console for errors.

### Annotation Position Is Incorrect

- Use `coordinateUnits: 'Pixel'` for chart-region positioning.
- Use `coordinateUnits: 'Point'` for point-based positioning.
- Verify the configured `region`.
- Test percentage-based X and Y values within the chart area.
- Ensure that the chart has completed rendering before programmatically updating annotations.

### Gradient Is Not Displayed

- Configure `linearGradient` or `radialGradient` on the series.
- Do not use `background.gradient`.
- Provide at least two valid gradient color stops.
- Use valid CSS colors.
- Keep color-stop offsets between `0` and `100`.
- Keep gradient opacity values between `0` and `1`.
- Verify gradient support in the installed package version.

### Point Colors Are Not Displayed

- Set `pointColorMapping` to the color-field name.
- Ensure that every relevant data point contains the mapped field.
- Use valid CSS color values.
- Do not set `pointColorMapping` to a literal color.
- Check whether a gradient or `pointRender` event overrides the mapped colors.

### Custom Palette Is Not Applied

- Use `palettes`, not `palette`.
- Provide an array of valid CSS colors.
- Check whether `pointColorMapping` overrides palette colors.
- Check whether a gradient configuration overrides the solid colors.

### Center Label Is Not Visible

- Use the `Pie` series type.
- Configure a nonzero `innerRadius` for a Doughnut Chart.
- Set `centerLabel.text`.
- Use `centerLabel.textStyle` for text styling.
- Ensure that the center-label text fits inside the inner radius.
- Increase `innerRadius` or shorten the text when required.

### Center Label Hover Text Is Not Updated

- Set `centerLabel.hoverTextFormat`.
- Use supported tokens such as `${point.x}` and `${point.y}`.
- Ensure that pointer events are not blocked.
- Ensure that the hovered point is rendered.
- Check whether another element covers the chart.

### Grouped Points Are Not Displayed

- Use `groupTo`.
- Use `groupMode: 'Value'` or `groupMode: 'Point'`.
- Do not use `groupPadding`.
- Do not use `groupMode: 'Percentage'`.
- Use a percentage string such as `5%` for percentage-based grouping.
- Ensure that the threshold actually matches one or more points.
- Ensure that the values mapped through `yName` are numeric.

### Too Many Points Are Grouped

- Reduce the value threshold.
- Reduce the percentage supplied through `groupTo`.
- Increase the point count supplied in `Point` mode.
- Verify the data-source order when using `groupMode: 'Point'`.

### Empty Points Are Not Displayed

- Ensure that the Y-values are actually `null` or `undefined`.
- Configure `emptyPointSettings`.
- Use `Zero` or `Average` when the empty point should produce a rendered value.
- Use `Drop` or `Gap` when the empty point should not be represented normally.
- Ensure that the fill and border are visible.
- Check whether a grouped-point threshold also affects the resulting point.

### No-Data Content Is Not Displayed

- Set `noDataTemplate`.
- Ensure that the series data source is empty.
- Ensure that the template contains valid HTML.
- Ensure that application CSS does not hide the template.
- Do not insert untrusted content into the template.