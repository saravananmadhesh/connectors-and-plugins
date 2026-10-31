# Appearance & Styling for 3D Charts

## Table of Contents

- [Chart-Level Styling](#chart-level-styling)
  - [Chart Background](#chart-background)
  - [Chart Border](#chart-border)
  - [Chart Margin](#chart-margin)
  - [Wall Color](#wall-color)
- [Color Schemes and Palettes](#color-schemes-and-palettes)
  - [Custom Color Palette](#custom-color-palette)
  - [Series-Specific Colors](#series-specific-colors)
  - [Point Color Mapping](#point-color-mapping)
- [Font and Text Styling](#font-and-text-styling)
  - [Title Styling](#title-styling)
  - [Subtitle Styling](#subtitle-styling)
  - [Axis Label Styling](#axis-label-styling)
  - [Axis Title Styling](#axis-title-styling)
  - [Legend Text Styling](#legend-text-styling)
  - [Data Label Styling](#data-label-styling)
- [Series Appearance](#series-appearance)
  - [Series Fill](#series-fill)
  - [Series Opacity](#series-opacity)
  - [Series Border](#series-border)
  - [Column Width and Spacing](#column-width-and-spacing)
- [Axis Appearance](#axis-appearance)
  - [Axis Lines](#axis-lines)
  - [Major Grid Lines](#major-grid-lines)
  - [Major Tick Lines](#major-tick-lines)
- [Theme Options](#theme-options)
  - [Applying a Theme](#applying-a-theme)
  - [Themes and Custom Colors](#themes-and-custom-colors)
- [Practical Examples](#practical-examples)
  - [Professional Business Chart](#professional-business-chart)
  - [Modern Dark Chart](#modern-dark-chart)
  - [Multi-Series Chart with Custom Colors](#multi-series-chart-with-custom-colors)
  - [High-Contrast Chart](#high-contrast-chart)
- [Troubleshooting](#troubleshooting)
  - [Custom Palette Is Not Applied](#custom-palette-is-not-applied)
  - [Series Color Is Not Applied](#series-color-is-not-applied)
  - [Point Colors Are Not Applied](#point-colors-are-not-applied)
  - [Title or Subtitle Is Not Visible](#title-or-subtitle-is-not-visible)
  - [Axis Labels Are Overlapping](#axis-labels-are-overlapping)
  - [Legend Is Not Displayed](#legend-is-not-displayed)
  - [Data Labels Are Not Displayed](#data-labels-are-not-displayed)
  - [Theme Is Not Applied](#theme-is-not-applied)
  - [Dark Theme Text Is Not Readable](#dark-theme-text-is-not-readable)
  - [Chart Border Is Not Visible](#chart-border-is-not-visible)
  - [Chart Appearance Is Too Crowded](#chart-appearance-is-too-crowded)
- [Next Steps](#next-steps)


Customize the EJ2 3D Chart using chart-level backgrounds, borders, margins, wall colors, custom palettes, series colors, text styles, themes, axis styling, and data-point color mapping.

The 3D Chart uses the `palettes` property, not `palette`, to provide a custom chart color collection. Individual data-point colors can also be mapped from the data source through `pointColorMapping`.

## Chart-Level Styling

Use chart-level properties to configure the outer background, border, margin, and 3D wall color.

### Chart Background

Use `background` to customize the background of the complete chart.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Sales',
  background: '#F5F5F5',
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
    }
  ]
});

chart.appendTo('#chart');
```

### Chart Border

Use the chart-level `border` property to customize the outer chart border.

```typescript
const chart: Chart3D = new Chart3D({
  background: '#FFFFFF',
  border: {
    color: '#CCCCCC',
    width: 1
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Chart Margin

Use `margin` to control the space around the chart content.

```typescript
const chart: Chart3D = new Chart3D({
  margin: {
    left: 40,
    right: 40,
    top: 60,
    bottom: 40
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Increase the margins when titles, rotated axis labels, legends, or data labels require additional space.

### Wall Color

Use `wallColor` to customize the walls of the 3D plotting region.

```typescript
const chart: Chart3D = new Chart3D({
  background: '#FFFFFF',
  wallColor: '#F0F3F5',
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Set `wallColor` to `transparent` when the 3D walls should use a transparent appearance.

```typescript
const chart: Chart3D = new Chart3D({
  wallColor: 'transparent',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

## Color Schemes and Palettes

The 3D Chart assigns colors to series from its active theme. Use `palettes`, series `fill`, or `pointColorMapping` when custom colors are required.

### Custom Color Palette

Use the `palettes` property to provide a custom collection of series colors.

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

interface RegionalData {
  quarter: string;
  north: number;
  south: number;
  east: number;
}

const chartData: RegionalData[] = [
  {
    quarter: 'Q1',
    north: 50,
    south: 35,
    east: 25
  },
  {
    quarter: 'Q2',
    north: 60,
    south: 40,
    east: 30
  },
  {
    quarter: 'Q3',
    north: 70,
    south: 45,
    east: 35
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Regional Sales',
  palettes: [
    '#0F6CBD',
    '#D83B01',
    '#107C10'
  ],
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'north',
      type: 'Column',
      name: 'North'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'south',
      type: 'Column',
      name: 'South'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'east',
      type: 'Column',
      name: 'East'
    }
  ]
});

chart.appendTo('#chart');
```

The palette colors are assigned to series in order. If the chart has more series than palette colors, colors can be reused.

### Series-Specific Colors

Use the series `fill` property to assign a specific color to a series.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  legendSettings: {
    visible: true
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'north',
      type: 'Column',
      name: 'North',
      fill: '#0F6CBD'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'south',
      type: 'Column',
      name: 'South',
      fill: '#D83B01'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'east',
      type: 'Column',
      name: 'East',
      fill: '#107C10'
    }
  ]
});

chart.appendTo('#chart');
```

A series-level `fill` value takes precedence over the corresponding color selected from `palettes`.

### Point Color Mapping

Use `pointColorMapping` to assign a separate color to each data point from a field in the data source.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D
);

interface ColoredSalesData {
  month: string;
  sales: number;
  color: string;
}

const chartData: ColoredSalesData[] = [
  {
    month: 'Jan',
    sales: 35,
    color: '#0F6CBD'
  },
  {
    month: 'Feb',
    sales: 28,
    color: '#D83B01'
  },
  {
    month: 'Mar',
    sales: 34,
    color: '#107C10'
  },
  {
    month: 'Apr',
    sales: 32,
    color: '#8764B8'
  },
  {
    month: 'May',
    sales: 40,
    color: '#C19C00'
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      pointColorMapping: 'color',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

Ensure that every value referenced through `pointColorMapping` is a valid CSS color.

## Font and Text Styling

Use the corresponding text-style property for each chart element.

- Use `titleStyle` for the chart title.
- Use `subTitleStyle` for the chart subtitle.
- Use `labelStyle` for axis labels.
- Use `titleStyle` within an axis for the axis title.
- Use `legendSettings.textStyle` for legend text.
- Use `dataLabel.font` for data-label text.

### Title Styling

Use `titleStyle` to customize the chart title.

```typescript
const chart: Chart3D = new Chart3D({
  title: 'Sales Report',
  titleStyle: {
    color: '#242424',
    fontFamily: 'Arial',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px'
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Subtitle Styling

Use `subTitle` and `subTitleStyle` to display and customize a subtitle.

```typescript
const chart: Chart3D = new Chart3D({
  title: 'Sales Report',
  subTitle: 'Financial Year 2025-2026',
  titleStyle: {
    color: '#242424',
    fontFamily: 'Arial',
    fontWeight: '600',
    size: '18px'
  },
  subTitleStyle: {
    color: '#616161',
    fontFamily: 'Arial',
    fontWeight: '400',
    size: '12px'
  },
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Axis Label Styling

Use the axis `labelStyle` property to customize axis-label text.

Use `labelRotation` on the axis to rotate labels. Do not place an `angle` property inside `labelStyle`.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    labelRotation: -45,
    labelStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      fontStyle: 'Normal',
      fontWeight: '400',
      size: '11px'
    }
  },
  primaryYAxis: {
    labelStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      fontStyle: 'Normal',
      fontWeight: '400',
      size: '11px'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Axis Title Styling

Use the axis `title` and `titleStyle` properties to customize axis titles.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    titleStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      fontWeight: '600',
      size: '14px'
    }
  },
  primaryYAxis: {
    title: 'Sales in Thousands',
    titleStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      fontWeight: '600',
      size: '14px'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Legend Text Styling

Use `legendSettings`, not `legend`, to configure the 3D Chart legend.

The `Legend3D` module must be imported and injected when the legend is displayed.

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
    position: 'Bottom',
    textStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      fontWeight: '400',
      size: '12px'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Data Label Styling

The `DataLabel3D` module must be imported and injected before data labels are enabled.

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

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#242424',
          fontFamily: 'Arial',
          fontStyle: 'Normal',
          fontWeight: '600',
          size: '12px'
        },
        border: {
          color: '#808080',
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

## Series Appearance

Use series-level properties to customize the color, transparency, border, width, and spacing of 3D columns and bars.

### Series Fill

Use `fill` to assign a specific series color.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      fill: '#4472C4'
    }
  ]
});

chart.appendTo('#chart');
```

### Series Opacity

Use `opacity` to control series transparency.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      fill: '#4472C4',
      opacity: 0.85
    }
  ]
});

chart.appendTo('#chart');
```

Use an opacity value between `0` and `1`.

### Series Border

Use the series `border` property to customize the border around rendered data points.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      fill: '#4472C4',
      border: {
        color: '#2E5C8A',
        width: 1
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Column Width and Spacing

Use `columnWidth` to control the relative width of columns or bars and `columnSpacing` to control the spacing between them.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      columnWidth: 0.7,
      columnSpacing: 0.2
    }
  ]
});

chart.appendTo('#chart');
```

The same properties are used for a 3D Bar series.

```typescript
import {
  BarSeries3D,
  Category3D,
  Chart3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  BarSeries3D,
  Category3D
);

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Bar',
      name: 'Sales',
      columnWidth: 0.7,
      columnSpacing: 0.2
    }
  ]
});

chart.appendTo('#chart');
```

## Axis Appearance

Use `axisLine`, `majorGridLines`, and `majorTickLines` to customize the visual appearance of chart axes.

### Axis Lines

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    axisLine: {
      color: '#666666',
      width: 1
    }
  },
  primaryYAxis: {
    axisLine: {
      color: '#666666',
      width: 1
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

### Major Grid Lines

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
    }
  },
  primaryYAxis: {
    majorGridLines: {
      color: '#D0D0D0',
      width: 1
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Set `majorGridLines.width` to `0` when major grid lines should be hidden.

### Major Tick Lines

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category',
    majorTickLines: {
      color: '#808080',
      width: 1,
      height: 5
    }
  },
  primaryYAxis: {
    majorTickLines: {
      color: '#808080',
      width: 1,
      height: 5
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

## Theme Options

The 3D Chart supports built-in themes. Theme support includes Material, Fabric, Bootstrap, Tailwind CSS, Fluent, and Material 3 theme families.

The exact theme enumeration available to the `theme` property depends on the installed `@syncfusion/ej2-charts` package version.

### Applying a Theme

Set the chart-level `theme` property to a supported theme value.

```typescript
const chart: Chart3D = new Chart3D({
  theme: 'Material',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');
```

Common theme families include:

- Material
- Material Dark
- Fabric
- Fabric Dark
- Bootstrap
- Bootstrap 4
- Bootstrap 5
- Bootstrap 5 Dark
- Tailwind
- Tailwind Dark
- Fluent
- Fluent Dark
- Material 3
- Material 3 Dark
- High Contrast

Use the exact theme enumeration supported by the installed EJ2 package version.

### Themes and Custom Colors

A theme can be combined with `palettes` or series-level `fill` values.

```typescript
const chart: Chart3D = new Chart3D({
  theme: 'Material',
  palettes: [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1'
  ],
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'north',
      type: 'Column',
      name: 'North'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'south',
      type: 'Column',
      name: 'South'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'east',
      type: 'Column',
      name: 'East'
    }
  ]
});

chart.appendTo('#chart');
```

The `palettes` property changes the series colors while the selected theme continues to control the default appearance of other chart elements.

## Practical Examples

### Professional Business Chart

The following complete TypeScript example applies corporate styling to the chart, axes, series, tooltip, legend, and data labels.

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Legend3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Legend3D,
  Tooltip3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

const chart: Chart3D = new Chart3D({
  title: 'Quarterly Sales Report',
  subTitle: 'Sales values in thousands',
  theme: 'Bootstrap4',
  background: '#FFFFFF',
  wallColor: '#F4F6F8',
  border: {
    color: '#D1D5DB',
    width: 1
  },
  margin: {
    top: 50,
    bottom: 30,
    left: 50,
    right: 30
  },
  titleStyle: {
    fontFamily: 'Calibri',
    fontWeight: '600',
    size: '18px',
    color: '#1A1A1A'
  },
  subTitleStyle: {
    fontFamily: 'Calibri',
    fontWeight: '400',
    size: '12px',
    color: '#616161'
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelStyle: {
      fontFamily: 'Calibri',
      size: '12px',
      color: '#333333'
    },
    titleStyle: {
      fontFamily: 'Calibri',
      size: '14px',
      fontWeight: '600',
      color: '#333333'
    },
    axisLine: {
      color: '#808080',
      width: 1
    },
    majorTickLines: {
      color: '#808080',
      width: 1,
      height: 5
    }
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales in Thousands',
    labelFormat: '{value}K',
    labelStyle: {
      fontFamily: 'Calibri',
      size: '12px',
      color: '#333333'
    },
    titleStyle: {
      fontFamily: 'Calibri',
      size: '14px',
      fontWeight: '600',
      color: '#333333'
    },
    axisLine: {
      color: '#808080',
      width: 1
    },
    majorGridLines: {
      color: '#D9D9D9',
      width: 1
    }
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
    textStyle: {
      fontFamily: 'Calibri',
      size: '12px',
      color: '#333333'
    }
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales',
      fill: '#4472C4',
      opacity: 0.95,
      border: {
        color: '#2E5C8A',
        width: 1
      },
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#242424',
          fontFamily: 'Calibri',
          size: '12px',
          fontWeight: '600'
        }
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
  <title>Professional 3D Chart</title>
</head>
<body>
  <div id="chart" style="height: 450px;"></div>
  <script src="index.js"></script>
</body>
</html>
```

### Modern Dark Chart

The following example uses a dark theme and explicit colors that remain visible against a dark background.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  Legend3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  Legend3D,
  Tooltip3D
);

interface AnalyticsData {
  category: string;
  current: number;
  previous: number;
}

const chartData: AnalyticsData[] = [
  {
    category: 'Product A',
    current: 45,
    previous: 38
  },
  {
    category: 'Product B',
    current: 60,
    previous: 52
  },
  {
    category: 'Product C',
    current: 52,
    previous: 48
  },
  {
    category: 'Product D',
    current: 70,
    previous: 61
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Analytics Dashboard',
  theme: 'FabricDark',
  background: '#1A1A1A',
  wallColor: '#242424',
  border: {
    color: '#555555',
    width: 1
  },
  palettes: [
    '#00B4D8',
    '#90E0EF'
  ],
  titleStyle: {
    color: '#FFFFFF',
    fontFamily: 'Segoe UI',
    size: '20px',
    fontWeight: '600'
  },
  primaryXAxis: {
    valueType: 'Category',
    labelStyle: {
      color: '#F3F3F3',
      fontFamily: 'Segoe UI',
      size: '12px'
    },
    axisLine: {
      color: '#A0A0A0',
      width: 1
    },
    majorTickLines: {
      color: '#A0A0A0',
      width: 1,
      height: 5
    }
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 80,
    interval: 20,
    labelStyle: {
      color: '#F3F3F3',
      fontFamily: 'Segoe UI',
      size: '12px'
    },
    axisLine: {
      color: '#A0A0A0',
      width: 1
    },
    majorGridLines: {
      color: '#505050',
      width: 1
    }
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    textStyle: {
      color: '#FFFFFF',
      fontFamily: 'Segoe UI',
      size: '12px'
    }
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'current',
      type: 'Column',
      name: 'Current'
    },
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'previous',
      type: 'Column',
      name: 'Previous'
    }
  ]
});

chart.appendTo('#chart');
```

### Multi-Series Chart with Custom Colors

```typescript
import {
  Category3D,
  Chart3D,
  Legend3D,
  StackingColumnSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  StackingColumnSeries3D,
  Category3D,
  Legend3D,
  Tooltip3D
);

interface RegionalData {
  quarter: string;
  north: number;
  south: number;
  east: number;
}

const chartData: RegionalData[] = [
  {
    quarter: 'Q1',
    north: 50,
    south: 35,
    east: 25
  },
  {
    quarter: 'Q2',
    north: 60,
    south: 40,
    east: 30
  },
  {
    quarter: 'Q3',
    north: 70,
    south: 45,
    east: 35
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Regional Sales from Q1 to Q3',
  theme: 'Material',
  background: '#FFFFFF',
  wallColor: '#F5F5F5',
  margin: {
    top: 50,
    bottom: 30,
    left: 50,
    right: 30
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter',
    labelStyle: {
      fontFamily: 'Segoe UI',
      size: '12px',
      color: '#333333'
    }
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 180,
    interval: 30,
    title: 'Sales',
    labelStyle: {
      fontFamily: 'Segoe UI',
      size: '12px',
      color: '#333333'
    },
    majorGridLines: {
      color: '#E0E0E0',
      width: 1
    }
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
    textStyle: {
      fontFamily: 'Segoe UI',
      size: '12px',
      color: '#333333'
    }
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'north',
      type: 'StackingColumn',
      name: 'North Region',
      fill: '#FF6B6B'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'south',
      type: 'StackingColumn',
      name: 'South Region',
      fill: '#4ECDC4'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'east',
      type: 'StackingColumn',
      name: 'East Region',
      fill: '#45B7D1'
    }
  ]
});

chart.appendTo('#chart');
```

### High-Contrast Chart

A high-contrast chart should use strongly differentiated colors, readable text, visible borders, data labels, and sufficient color contrast.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Legend3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Legend3D,
  Tooltip3D
);

interface AccessibleData {
  category: string;
  actual: number;
  target: number;
}

const chartData: AccessibleData[] = [
  {
    category: 'Category A',
    actual: 40,
    target: 50
  },
  {
    category: 'Category B',
    actual: 55,
    target: 60
  },
  {
    category: 'Category C',
    actual: 65,
    target: 70
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Accessible Performance Chart',
  theme: 'HighContrast',
  background: '#000000',
  wallColor: '#111111',
  border: {
    color: '#FFFFFF',
    width: 2
  },
  palettes: [
    '#FFFF00',
    '#00FFFF'
  ],
  titleStyle: {
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontWeight: '600',
    size: '18px'
  },
  primaryXAxis: {
    valueType: 'Category',
    labelStyle: {
      color: '#FFFFFF',
      fontFamily: 'Arial',
      size: '12px'
    },
    axisLine: {
      color: '#FFFFFF',
      width: 1
    },
    majorTickLines: {
      color: '#FFFFFF',
      width: 1,
      height: 5
    }
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 80,
    interval: 20,
    labelStyle: {
      color: '#FFFFFF',
      fontFamily: 'Arial',
      size: '12px'
    },
    axisLine: {
      color: '#FFFFFF',
      width: 1
    },
    majorGridLines: {
      color: '#808080',
      width: 1
    }
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    textStyle: {
      color: '#FFFFFF',
      fontFamily: 'Arial',
      size: '12px'
    }
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'actual',
      type: 'Column',
      name: 'Actual',
      border: {
        color: '#FFFFFF',
        width: 1
      },
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#FFFFFF',
          fontFamily: 'Arial',
          size: '12px',
          fontWeight: '600'
        }
      }
    },
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'target',
      type: 'Column',
      name: 'Target',
      border: {
        color: '#FFFFFF',
        width: 1
      },
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#FFFFFF',
          fontFamily: 'Arial',
          size: '12px',
          fontWeight: '600'
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

Do not communicate essential distinctions through color alone. Use legends, series names, tooltips, data labels, or other textual indicators.

## Troubleshooting

### Custom Palette Is Not Applied

- Use `palettes`, not `palette`.
- Verify that `palettes` is an array of valid CSS color strings.
- Ensure that a series-level `fill` is not overriding the palette color.
- Ensure that `pointColorMapping` is not overriding the series color.
- Confirm that the series is rendered successfully.
- Check the browser console for configuration errors.

### Series Color Is Not Applied

- Use the series `fill` property.
- Verify that the supplied value is a valid CSS color.
- Check whether a `pointColorMapping` value is overriding the series color.
- Ensure that the correct series is being configured.
- Avoid relying only on external CSS to color SVG chart points.

### Point Colors Are Not Applied

- Set `pointColorMapping` to the name of the color field.
- Ensure that every data object contains the mapped field.
- Ensure that each mapped value is a valid CSS color.
- Do not set `pointColorMapping` to a literal color value.
- Ensure that `xName` and `yName` also map to valid fields.

### Title or Subtitle Is Not Visible

- Set the `title` or `subTitle` text.
- Ensure that the text color contrasts with the chart background.
- Increase the top margin when the title is clipped.
- Use `titleStyle` for the title.
- Use `subTitleStyle` for the subtitle.
- Ensure that the chart container has sufficient height.

### Axis Labels Are Overlapping

- Increase the chart width or height.
- Use the axis-level `labelRotation` property.
- Reduce `labelStyle.size`.
- Increase the label interval when appropriate.
- Shorten long category labels.
- Use a 3D Bar series when horizontal presentation improves long-label readability.
- Do not use an `angle` property inside `labelStyle`.

### Legend Is Not Displayed

- Import and inject `Legend3D`.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Assign a meaningful `name` to each series.
- Ensure that the chart has sufficient space for the selected legend position.

### Data Labels Are Not Displayed

- Import and inject `DataLabel3D`.
- Set `dataLabel.visible` to `true`.
- Confirm that the series contains valid points.
- Ensure that the data-label text color contrasts with the chart background.
- Use `Middle` when a `Top` label is clipped.
- Increase the chart margin or height when necessary.

### Theme Is Not Applied

- Verify that the theme value is supported by the installed package version.
- Ensure that the required Syncfusion base and theme CSS files are loaded.
- Ensure that the chart is created after the corresponding styles are available.
- Check whether custom `background`, `wallColor`, `fill`, `palettes`, or text styles are overriding the theme defaults.
- Check for global CSS rules that affect the chart container.
- Confirm that the theme name uses the expected casing.

### Dark Theme Text Is Not Readable

- Set explicit colors for `titleStyle`, `subTitleStyle`, axis `labelStyle`, axis `titleStyle`, and `legendSettings.textStyle`.
- Use a dark `background` and compatible `wallColor`.
- Use visible grid-line and axis-line colors.
- Ensure that data-label text has sufficient contrast.
- Test tooltip readability against the selected theme.

### Chart Border Is Not Visible

- Set the chart-level `border.width` to a value greater than zero.
- Use a border color that contrasts with the background.
- Confirm that the chart container is not clipping the outer border.
- Do not confuse the chart-level border with a series border.

### Chart Appearance Is Too Crowded

- Reduce the number of visible series.
- Reduce the number of categories.
- Increase the chart dimensions.
- Reduce the title, label, and legend font sizes carefully.
- Adjust `columnWidth` and `columnSpacing`.
- Move the legend to another position.
- Reduce the number of visible data labels.
- Avoid excessive margins that reduce the plot area.

## Next Steps

- **3D settings:** See `3d-settings-and-rotation.md`.
- **Interactions:** See `interaction-features-3d.md`.
- **Data handling:** See `data-and-performance.md`.
- **Axis customization:** See `axes-customization-3d.md`.
- **Chart types:** See `chart-types-3d.md`.