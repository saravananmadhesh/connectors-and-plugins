# Chart Types for 3D Charts

## Table of Contents

- [3D Column Chart](#3d-column-chart)
  - [Basic 3D Column Chart](#basic-3d-column-chart)
  - [Multi-Series 3D Column Chart](#multi-series-3d-column-chart)
- [3D Bar Chart](#3d-bar-chart)
  - [Basic 3D Bar Chart](#basic-3d-bar-chart)
  - [Multi-Series 3D Bar Chart](#multi-series-3d-bar-chart)
  - [Grouped 3D Bar Chart](#grouped-3d-bar-chart)
- [Stacked 3D Column Chart](#stacked-3d-column-chart)
  - [Basic Stacked 3D Column Chart](#basic-stacked-3d-column-chart)
  - [Stacking Groups](#stacking-groups)
- [Stacked 3D Bar Chart](#stacked-3d-bar-chart)
  - [Basic Stacked 3D Bar Chart](#basic-stacked-3d-bar-chart)
- [Series Configuration](#series-configuration)
  - [Core Series Properties](#core-series-properties)
  - [Column and Bar Width](#column-and-bar-width)
  - [Column and Bar Spacing](#column-and-bar-spacing)
  - [Series Appearance](#series-appearance)
  - [Data Labels](#data-labels)
- [When to Use Each Type](#when-to-use-each-type)
  - [Use a 3D Column Chart When](#use-a-3d-column-chart-when)
  - [Use a 3D Bar Chart When](#use-a-3d-bar-chart-when)
  - [Use a Stacked 3D Column Chart When](#use-a-stacked-3d-column-chart-when)
  - [Use a Stacked 3D Bar Chart When](#use-a-stacked-3d-bar-chart-when)
  - [Avoid 3D Charts When](#avoid-3d-charts-when)
- [Data Binding Patterns](#data-binding-patterns)
  - [Simple Array Binding](#simple-array-binding)
  - [Multiple Series with the Same Data Source](#multiple-series-with-the-same-data-source)
  - [Multiple Series with Separate Data Sources](#multiple-series-with-separate-data-sources)
  - [Dynamic Data](#dynamic-data)
- [Troubleshooting](#troubleshooting)
  - [Series Is Not Displayed](#series-is-not-displayed)
  - [Column Series Is Not Displayed](#column-series-is-not-displayed)
  - [Bar Series Is Not Displayed](#bar-series-is-not-displayed)
  - [Stacked Column Series Is Not Displayed](#stacked-column-series-is-not-displayed)
  - [Stacked Bar Series Is Not Displayed](#stacked-bar-series-is-not-displayed)
  - [Multiple Series Are Not Displayed Correctly](#multiple-series-are-not-displayed-correctly)
  - [Grouped Bars Are Not Displayed Correctly](#grouped-bars-are-not-displayed-correctly)
  - [Stacking Is Not Working](#stacking-is-not-working)
  - [Data Labels Are Not Displayed](#data-labels-are-not-displayed)
  - [Tooltip Is Not Displayed](#tooltip-is-not-displayed)
  - [Legend Is Not Displayed](#legend-is-not-displayed)
  - [Data Is Not Updating](#data-is-not-updating)
- [Next Steps](#next-steps)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)


The EJ2 3D Chart supports `Column`, `Bar`, `StackingColumn`, and `StackingBar` series for displaying categorical data in a three-dimensional layout.

The required modules are:

- `ColumnSeries3D` for the `Column` series type.
- `BarSeries3D` for the `Bar` series type.
- `StackingColumnSeries3D` for the `StackingColumn` series type.
- `StackingBarSeries3D` for the `StackingBar` series type.
- `Category3D` when `primaryXAxis.valueType` is set to `Category`.

The `Bar` series is rendered by setting the series `type` to `Bar` and injecting `BarSeries3D`. The `columnWidth`, `columnSpacing`, and `groupName` properties can be used to customize and group 3D Bar series.

## 3D Column Chart

A 3D Column Chart displays values as vertical columns. It is suitable for comparing values across categories or time periods.

Set the series `type` to `Column` and inject the `ColumnSeries3D` module before creating the chart.

### Basic 3D Column Chart

**TypeScript:**

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
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
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

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.ColumnSeries3D,
  ej.charts.Category3D
);

var chartData = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 },
  { month: 'Apr', sales: 32 },
  { month: 'May', sales: 40 }
];

var chart = new ej.charts.Chart3D({
  title: 'Monthly Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
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

### Multi-Series 3D Column Chart

Multiple `Column` series can use the same data source with different `yName` mappings.

Inject `Legend3D` when the legend is visible.

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

interface BusinessData {
  month: string;
  sales: number;
  revenue: number;
}

const chartData: BusinessData[] = [
  { month: 'Jan', sales: 35, revenue: 42 },
  { month: 'Feb', sales: 28, revenue: 44 },
  { month: 'Mar', sales: 34, revenue: 52 },
  { month: 'Apr', sales: 32, revenue: 51 },
  { month: 'May', sales: 40, revenue: 58 }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Business Performance',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 70,
    interval: 10,
    title: 'Amount'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
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

## 3D Bar Chart

A 3D Bar Chart displays values as horizontal bars. It is useful when category labels are long or when horizontal comparison is easier to understand.

Set the series `type` to `Bar` and inject the `BarSeries3D` module before creating the chart.

### Basic 3D Bar Chart

**TypeScript:**

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

interface RegionalSalesData {
  region: string;
  sales: number;
}

const chartData: RegionalSalesData[] = [
  { region: 'North America', sales: 2500 },
  { region: 'Europe', sales: 1800 },
  { region: 'Asia Pacific', sales: 2200 },
  { region: 'Latin America', sales: 900 }
];

const chart: Chart3D = new Chart3D({
  title: 'Regional Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Region'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 3000,
    interval: 500,
    title: 'Sales'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Bar',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.BarSeries3D,
  ej.charts.Category3D
);

var chartData = [
  { region: 'North America', sales: 2500 },
  { region: 'Europe', sales: 1800 },
  { region: 'Asia Pacific', sales: 2200 },
  { region: 'Latin America', sales: 900 }
];

var chart = new ej.charts.Chart3D({
  title: 'Regional Sales',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Region'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 3000,
    interval: 500,
    title: 'Sales'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Bar',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

### Multi-Series 3D Bar Chart

Multiple `Bar` series can be displayed for the same categories.

Inject `Legend3D` when the legend is visible and `Tooltip3D` when the tooltip is enabled.

```typescript
import {
  BarSeries3D,
  Category3D,
  Chart3D,
  Legend3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  BarSeries3D,
  Category3D,
  Legend3D,
  Tooltip3D
);

interface RegionalData {
  region: string;
  sales: number;
  revenue: number;
}

const chartData: RegionalData[] = [
  {
    region: 'North America',
    sales: 2500,
    revenue: 2800
  },
  {
    region: 'Europe',
    sales: 1800,
    revenue: 2100
  },
  {
    region: 'Asia Pacific',
    sales: 2200,
    revenue: 2600
  },
  {
    region: 'Latin America',
    sales: 900,
    revenue: 1200
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Regional Business Performance',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Region'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 3000,
    interval: 500,
    title: 'Amount'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Bar',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'revenue',
      type: 'Bar',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Grouped 3D Bar Chart

Use the `groupName` property to group related Bar series. Data points in series with the same group name are grouped together.

```typescript
import {
  BarSeries3D,
  Category3D,
  Chart3D,
  Legend3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  BarSeries3D,
  Category3D,
  Legend3D
);

interface MedalData {
  year: string;
  usaGold: number;
  usaSilver: number;
  ukGold: number;
  ukSilver: number;
}

const chartData: MedalData[] = [
  {
    year: '2012',
    usaGold: 104,
    usaSilver: 88,
    ukGold: 65,
    ukSilver: 54
  },
  {
    year: '2016',
    usaGold: 121,
    usaSilver: 95,
    ukGold: 67,
    ukSilver: 58
  },
  {
    year: '2020',
    usaGold: 113,
    usaSilver: 91,
    ukGold: 64,
    ukSilver: 56
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Olympic Medal Comparison',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Year'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 140,
    interval: 20,
    title: 'Medals'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'year',
      yName: 'usaGold',
      type: 'Bar',
      name: 'USA Gold',
      groupName: 'USA',
      columnWidth: 0.7,
      columnSpacing: 0.1
    },
    {
      dataSource: chartData,
      xName: 'year',
      yName: 'usaSilver',
      type: 'Bar',
      name: 'USA Silver',
      groupName: 'USA',
      columnWidth: 0.7,
      columnSpacing: 0.1
    },
    {
      dataSource: chartData,
      xName: 'year',
      yName: 'ukGold',
      type: 'Bar',
      name: 'UK Gold',
      groupName: 'UK',
      columnWidth: 0.7,
      columnSpacing: 0.1
    },
    {
      dataSource: chartData,
      xName: 'year',
      yName: 'ukSilver',
      type: 'Bar',
      name: 'UK Silver',
      groupName: 'UK',
      columnWidth: 0.7,
      columnSpacing: 0.1
    }
  ]
});

chart.appendTo('#chart');
```

## Stacked 3D Column Chart

A Stacked 3D Column Chart places multiple series vertically within the same category. It is suitable for displaying totals and the contribution of each series to those totals.

Set every participating series `type` to `StackingColumn` and inject `StackingColumnSeries3D`.

### Basic Stacked 3D Column Chart

**TypeScript:**

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

interface RegionalSalesData {
  quarter: string;
  northAmerica: number;
  europe: number;
  asia: number;
}

const chartData: RegionalSalesData[] = [
  {
    quarter: 'Q1',
    northAmerica: 50,
    europe: 35,
    asia: 25
  },
  {
    quarter: 'Q2',
    northAmerica: 60,
    europe: 40,
    asia: 30
  },
  {
    quarter: 'Q3',
    northAmerica: 70,
    europe: 45,
    asia: 35
  },
  {
    quarter: 'Q4',
    northAmerica: 80,
    europe: 50,
    asia: 40
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Regional Sales by Quarter',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 200,
    interval: 40,
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
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'northAmerica',
      type: 'StackingColumn',
      name: 'North America'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'europe',
      type: 'StackingColumn',
      name: 'Europe'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'asia',
      type: 'StackingColumn',
      name: 'Asia'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.StackingColumnSeries3D,
  ej.charts.Category3D,
  ej.charts.Legend3D,
  ej.charts.Tooltip3D
);

var chartData = [
  {
    quarter: 'Q1',
    northAmerica: 50,
    europe: 35,
    asia: 25
  },
  {
    quarter: 'Q2',
    northAmerica: 60,
    europe: 40,
    asia: 30
  },
  {
    quarter: 'Q3',
    northAmerica: 70,
    europe: 45,
    asia: 35
  },
  {
    quarter: 'Q4',
    northAmerica: 80,
    europe: 50,
    asia: 40
  }
];

var chart = new ej.charts.Chart3D({
  title: 'Regional Sales by Quarter',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 200,
    interval: 40,
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
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'northAmerica',
      type: 'StackingColumn',
      name: 'North America'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'europe',
      type: 'StackingColumn',
      name: 'Europe'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'asia',
      type: 'StackingColumn',
      name: 'Asia'
    }
  ]
});

chart.appendTo('#chart');
```

### Stacking Groups

Use `stackingGroup` to create separate stacked groups within the same category. Series with the same `stackingGroup` value are stacked together.

```typescript
import {
  Category3D,
  Chart3D,
  Legend3D,
  StackingColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  StackingColumnSeries3D,
  Category3D,
  Legend3D
);

interface GroupedSalesData {
  quarter: string;
  productASales: number;
  productAProfit: number;
  productBSales: number;
  productBProfit: number;
}

const chart[
Source: chartData,
Name: 'quarter',
Name: 'northAmerica',
: 'StackingColumn',
: 'North America'
Source: chartData,
Name: 'quarter',
Name: 'europe',
: 'StackingColumn',
: 'Europe'
Source: chartData,
Name: 'quarter',
Name: 'asia',
: 'StackingColumn',
: 'Asia'
To('#chart') {
    quarter: 'Q3',
    productASales: 55,
    productAProfit: 24,
    productBSales: 48,
    productBProfit: 19
  },
  {
    quarter: 'Q4',
    productASales: 65,
    productAProfit: 28,
    productBSales: 58,
    productBProfit: 23
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Product Performance',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20,
    title: 'Amount'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productASales',
      type: 'StackingColumn',
      stackingGroup: 'ProductA',
      name: 'Product A Sales'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productAProfit',
      type: 'StackingColumn',
      stackingGroup: 'ProductA',
      name: 'Product A Profit'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productBSales',
      type: 'StackingColumn',
      stackingGroup: 'ProductB',
      name: 'Product B Sales'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'productBProfit',
      type: 'StackingColumn',
      stackingGroup: 'ProductB',
      name: 'Product B Profit'
    }
  ]
});

chart.appendTo('#chart');
```

## Stacked 3D Bar Chart

A Stacked 3D Bar Chart displays multiple values as horizontal stacked segments. It is useful for displaying part-to-whole relationships when category labels are long.

Set every participating series `type` to `StackingBar` and inject `StackingBarSeries3D`.

### Basic Stacked 3D Bar Chart

**TypeScript:**

```typescript
import {
  Category3D,
  Chart3D,
  Legend3D,
  StackingBarSeries3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  StackingBarSeries3D,
  Category3D,
  Legend3D,
  Tooltip3D
);

interface DepartmentData {
  department: string;
  salaries: number;
  operations: number;
  marketing: number;
}

const chartData: DepartmentData[] = [
  {
    department: 'Engineering',
    salaries: 70,
    operations: 20,
    marketing: 10
  },
  {
    department: 'Customer Support',
    salaries: 55,
    operations: 30,
    marketing: 15
  },
  {
    department: 'Product Management',
    salaries: 60,
    operations: 15,
    marketing: 25
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Department Budget Allocation',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Department'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 120,
    interval: 20,
    title: 'Budget'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'salaries',
      type: 'StackingBar',
      name: 'Salaries'
    },
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'operations',
      type: 'StackingBar',
      name: 'Operations'
    },
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'marketing',
      type: 'StackingBar',
      name: 'Marketing'
    }
  ]
});

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.Chart3D.Inject(
  ej.charts.StackingBarSeries3D,
  ej.charts.Category3D,
  ej.charts.Legend3D,
  ej.charts.Tooltip3D
);

var chartData = [
  {
    department: 'Engineering',
    salaries: 70,
    operations: 20,
    marketing: 10
  },
  {
    department: 'Customer Support',
    salaries: 55,
    operations: 30,
    marketing: 15
  },
  {
    department: 'Product Management',
    salaries: 60,
    operations: 15,
    marketing: 25
  }
];

var chart = new ej.charts.Chart3D({
  title: 'Department Budget Allocation',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Department'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 120,
    interval: 20,
    title: 'Budget'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  },
  enableRotation: true,
  rotation: 7,
  tilt: 10,
  depth: 100,
  wallColor: 'transparent',
  series: [
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'salaries',
      type: 'StackingBar',
      name: 'Salaries'
    },
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'operations',
      type: 'StackingBar',
      name: 'Operations'
    },
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'marketing',
      type: 'StackingBar',
      name: 'Marketing'
    }
  ]
});

chart.appendTo('#chart');
```

## Series Configuration

### Core Series Properties

A 3D Chart series commonly uses the following properties:

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'category',
    yName: 'value',
    type: 'Column',
    name: 'Sales'
  }
]
```

- `dataSource` specifies the local array or remote data source.
- `xName` maps the field used as the category or X-value.
- `yName` maps the field used as the numeric Y-value.
- `type` specifies the 3D series type.
- `name` identifies the series in legends and tooltips.
- `fill` specifies the series color.
- `opacity` controls series transparency.
- `columnWidth` controls the relative width of a column or bar.
- `columnSpacing` controls the spacing between columns or bars.
- `groupName` groups related `Bar` series.
- `stackingGroup` groups related stacked series.

The supported series types and their modules are:

```typescript
import {
  BarSeries3D,
  Category3D,
  Chart3D,
  ColumnSeries3D,
  StackingBarSeries3D,
  StackingColumnSeries3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  BarSeries3D,
  StackingColumnSeries3D,
  StackingBarSeries3D,
  Category3D
);
```

Only inject the modules required by the series types used in the chart.

### Column and Bar Width

Use `columnWidth` to control the relative width of columns and bars.

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
      columnWidth: 0.7
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      columnWidth: 0.7
    }
  ]
});

chart.appendTo('#chart');
```

The same property is used for a `Bar` series:

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Bar',
      name: 'Sales',
      columnWidth: 0.75
    }
  ]
});

chart.appendTo('#chart');
```

### Column and Bar Spacing

Use `columnSpacing` to control the spacing between columns or bars. The `columnWidth` and `columnSpacing` properties are supported for 3D Bar series even though the series is rendered horizontally.

```typescript
const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'sales',
      type: 'Bar',
      name: 'Sales',
      columnWidth: 0.75,
      columnSpacing: 0.2
    },
    {
      dataSource: chartData,
      xName: 'region',
      yName: 'revenue',
      type: 'Bar',
      name: 'Revenue',
      columnWidth: 0.75,
      columnSpacing: 0.2
    }
  ]
});

chart.appendTo('#chart');
```

Use values appropriate for the number of series and the available chart dimensions. Excessive spacing can make columns or bars too narrow.

### Series Appearance

Use `fill` and `opacity` to customize the series appearance.

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
      fill: '#0F6CBD',
      opacity: 0.9
    }
  ]
});

chart.appendTo('#chart');
```

### Data Labels

Inject `DataLabel3D` before enabling data labels.

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
      name: 'Sales',
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#333333',
          size: '12px',
          fontWeight: '600'
        }
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use a data label template when custom label content is required.

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
      dataLabel: {
        visible: true,
        position: 'Top',
        template:
          '<div class="data-label">' +
          '${point.y}' +
          '</div>'
      }
    }
  ]
});

chart.appendTo('#chart');
```

The available data label positions include:

- `Top`
- `Middle`
- `Bottom`

## When to Use Each Type

### Use a 3D Column Chart When

- Values must be compared vertically across categories.
- Category labels are reasonably short.
- Changes across months, quarters, or years must be displayed.
- Multiple independent series must be displayed side by side.
- Individual series values are more important than a combined total.

Typical scenarios include:

- Monthly sales
- Quarterly performance
- Product comparisons
- Regional totals
- Department budgets

### Use a 3D Bar Chart When

- Category labels are long.
- Horizontal comparison is easier to understand.
- Several categories must be compared.
- The available layout is wider than it is tall.
- Related series must be organized using `groupName`.

Typical scenarios include:

- Regional comparisons
- Department budgets
- Product rankings
- Employee performance
- Survey results

### Use a Stacked 3D Column Chart When

- Part-to-whole relationships must be displayed vertically.
- The total value for each category is important.
- Each total must be divided into contributing series.
- Multiple related series share the same category values.
- Separate stacks are required through `stackingGroup`.

Typical scenarios include:

- Regional contributions to quarterly sales
- Product contributions to annual revenue
- Department costs by category
- Resource allocation by project
- Sales and profit grouped by product

### Use a Stacked 3D Bar Chart When

- Part-to-whole relationships must be displayed horizontally.
- Category labels are long.
- The contribution of multiple series to each total must be compared.
- A horizontal stacked layout improves readability.

Typical scenarios include:

- Department budget allocation
- Revenue breakdown by source
- Project resource allocation
- Survey response distribution
- Product cost composition

### Avoid 3D Charts When

- The dataset contains too many categories or series.
- Precise visual comparison is more important than dimensional presentation.
- A stacked series contains too many small segments.
- The depth or rotation makes values difficult to compare.
- The visualization requires unsupported series such as line, area, scatter, financial, or pie.

Use the regular EJ2 Chart or another appropriate EJ2 visualization component when the required series type is not supported by the 3D Chart.

## Data Binding Patterns

### Simple Array Binding

Use a flat array of objects and map its fields through `xName` and `yName`.

```typescript
interface ChartData {
  category: string;
  value: number;
}

const chartData: ChartData[] = [
  { category: 'Jan', value: 35 },
  { category: 'Feb', value: 28 },
  { category: 'Mar', value: 34 }
];

const chart: Chart3D = new Chart3D({
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

### Multiple Series with the Same Data Source

Use different `yName` mappings when multiple values are stored in the same data objects.

```typescript
interface BusinessData {
  month: string;
  sales: number;
  revenue: number;
}

const chartData: BusinessData[] = [
  { month: 'Jan', sales: 35, revenue: 42 },
  { month: 'Feb', sales: 28, revenue: 44 },
  { month: 'Mar', sales: 34, revenue: 52 }
];

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

The same pattern can be used with a Bar series:

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
      type: 'Bar',
      name: 'Sales'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Bar',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Multiple Series with Separate Data Sources

Each series can use an independent data source. Category values should remain compatible when side-by-side or stacked comparison is required.

```typescript
interface SeriesData {
  month: string;
  value: number;
}

const salesData: SeriesData[] = [
  { month: 'Jan', value: 35 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 34 }
];

const revenueData: SeriesData[] = [
  { month: 'Jan', value: 42 },
  { month: 'Feb', value: 44 },
  { month: 'Mar', value: 52 }
];

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: salesData,
      xName: 'month',
      yName: 'value',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: revenueData,
      xName: 'month',
      yName: 'value',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');
```

### Dynamic Data

Replace the series data source and call `refresh()` to render the updated data.

```typescript
interface SalesData {
  month: string;
  sales: number;
}

const initialData: SalesData[] = [
  { month: 'Jan', sales: 35 },
  { month: 'Feb', sales: 28 },
  { month: 'Mar', sales: 34 }
];

const chart: Chart3D = new Chart3D({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: initialData,
      xName: 'month',
      yName: 'sales',
      type: 'Column'
    }
  ]
});

chart.appendTo('#chart');

const updatedData: SalesData[] = [
  { month: 'Jan', sales: 40 },
  { month: 'Feb', sales: 32 },
  { month: 'Mar', sales: 45 }
];

chart.series[0].dataSource = updatedData;
chart.refresh();
```

## Troubleshooting

### Series Is Not Displayed

- Confirm that the target chart element exists before calling `appendTo`.
- Ensure that the chart container has a valid width and height.
- Confirm that `dataSource` contains valid records.
- Confirm that `xName` and `yName` exactly match the data field names.
- Confirm that the field mapped through `yName` contains numeric values.
- Inject the module required by the configured series type.
- Inject `Category3D` when `primaryXAxis.valueType` is `Category`.
- Check the browser console for module or configuration errors.

### Column Series Is Not Displayed

- Set the series `type` to `Column`.
- Import and inject `ColumnSeries3D`.
- Do not inject only `BarSeries3D` when the configured type is `Column`.

### Bar Series Is Not Displayed

- Set the series `type` to `Bar`.
- Import and inject `BarSeries3D`.
- Do not inject only `ColumnSeries3D` when the configured type is `Bar`.
- Ensure that the category labels and numeric values are mapped correctly.

### Stacked Column Series Is Not Displayed

- Set every participating series `type` to `StackingColumn`.
- Import and inject `StackingColumnSeries3D`.
- Ensure that participating series use compatible category values.
- Ensure that each series has a valid numeric `yName` field.

### Stacked Bar Series Is Not Displayed

- Set every participating series `type` to `StackingBar`.
- Import and inject `StackingBarSeries3D`.
- Ensure that participating series use compatible category values.
- Ensure that each series has a valid numeric `yName` field.
- Do not inject only `BarSeries3D` when the configured type is `StackingBar`.

### Multiple Series Are Not Displayed Correctly

- Ensure that each series has a valid `dataSource`.
- Assign a different `yName` when multiple values come from the same data source.
- Ensure that the series use compatible X-values.
- Assign a meaningful `name` to each series.
- Inject `Legend3D` when `legendSettings.visible` is enabled.
- Adjust `columnWidth` and `columnSpacing` if columns or bars overlap.

### Grouped Bars Are Not Displayed Correctly

- Set every grouped series `type` to `Bar`.
- Inject `BarSeries3D`.
- Assign the intended `groupName` to each series.
- Use the same `groupName` for related series.
- Use different `groupName` values to create separate groups.
- Keep `columnWidth` and `columnSpacing` consistent across related series.

### Stacking Is Not Working

- Use `StackingColumn` or `StackingBar` for every participating series.
- Inject the module that matches the configured stacking type.
- Ensure that participating series contain compatible X-values.
- Ensure that each series has a valid numeric `yName` field.
- Use the same `stackingGroup` for series that must be stacked together.
- Use different `stackingGroup` values to create separate stacks.
- Do not mix regular and stacking series when all series are expected to form one stack.

### Data Labels Are Not Displayed

- Import and inject `DataLabel3D`.
- Set `dataLabel.visible` to `true`.
- Confirm that the series contains valid points.
- Confirm that the chart container provides sufficient space.
- Use `Middle` or `Bottom` if a `Top` label is clipped.
- Use `${point.x}` and `${point.y}` in a data label template.

### Tooltip Is Not Displayed

- Import and inject `Tooltip3D`.
- Set `tooltip.enable` to `true`.
- Use supported placeholders such as `${series.name}`, `${point.x}`, and `${point.y}`.
- Confirm that no other element is covering the chart interaction area.

### Legend Is Not Displayed

- Import and inject `Legend3D`.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Assign a meaningful `name` to every series.
- Ensure that the chart has sufficient space for the selected legend position.

### Data Is Not Updating

- Assign the updated data to `chart.series[index].dataSource`.
- Call `chart.refresh()` after completing the data changes.
- Ensure that the updated data uses the same fields configured through `xName` and `yName`.
- Ensure that numeric fields have not been converted to invalid strings.
- Avoid destroying the chart before applying the update.

## Next Steps

- **Configure axes:** See `axes-customization-3d.md`.
- **Add interactions:** See `interaction-features-3d.md`.
- **Style appearance:** See `appearance-and-styling.md`.
- **Handle data:** See `data-and-performance.md`.

## Combined Mistakes and Future References

- Use standalone EJ2 TypeScript and JavaScript examples for this documentation.
- Do not use Vue components, Vue directives, or Vue provider syntax.
- Import all required modules from `@syncfusion/ej2-charts`.
- Call `Chart3D.Inject(...)` before creating a `Chart3D` instance.
- Inject `ColumnSeries3D` for a `Column` series.
- Inject `BarSeries3D` for a `Bar` series.
- Inject `StackingColumnSeries3D` for a `StackingColumn` series.
- Inject `StackingBarSeries3D` for a `StackingBar` series.
- Inject `Category3D` when `primaryXAxis.valueType` is `Category`.
- Inject `Legend3D` when the legend is visible.
- Inject `Tooltip3D` when the tooltip is enabled.
- Inject `DataLabel3D` when data labels are enabled.
- Use `legendSettings`, not `legend`.
- The supported 3D Chart series types include `Column`, `Bar`, `StackingColumn`, and `StackingBar`.
- Do not state that EJ2 3D Chart lacks Bar-series support.
- Do not remove `BarSeries3D` from a Chart that contains `type: 'Bar'`.
- Do not remove `StackingBarSeries3D` from a Chart that contains `type: 'StackingBar'`.
- Do not inject only `ColumnSeries3D` for a `Bar` series.
- Do not inject only `BarSeries3D` for a `StackingBar` series.
- Use `columnWidth` to customize Column and Bar series width.
- Use `columnSpacing` to customize the spacing between columns and bars.
- Use `groupName` to group related Bar series.
- Use `stackingGroup` to control which stacked series are combined.
- Ensure that stacked series contain compatible category values.
- Use `fill` to customize the series color.
- Use `opacity` to customize series transparency.
- Do not use a regular two-dimensional Chart marker configuration without confirming that the property is supported by the 3D series model.
- Use data labels to display values directly on 3D columns and bars.
- Use `${point.x}` and `${point.y}` inside data label templates.
- Use `${series.name}`, `${point.x}`, and `${point.y}` inside tooltip formats.
- Always provide a valid `dataSource`, `xName`, and `yName`.
- Ensure that fields mapped through `yName` contain numeric values.
- Call `appendTo` after creating the chart.
- Call `refresh()` after replacing or modifying an existing data source.
- Avoid rendering too many categories or series in a 3D Chart.
- Use the regular EJ2 Chart when an unsupported series type is required.
- Disregard the earlier incorrect statement that `Bar`, `StackingBar`, `BarSeries3D`, and `StackingBarSeries3D` are unavailable in the EJ2 3D Chart.