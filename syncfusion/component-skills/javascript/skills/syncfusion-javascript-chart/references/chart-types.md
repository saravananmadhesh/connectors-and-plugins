# Chart Types & Selection

## Table of Contents

- [Chart Types & Selection](#chart-types--selection)
  - [Overview](#overview)
  - [Cartesian Chart Types](#cartesian-chart-types)
    - [Line Chart](#line-chart)
    - [Spline Chart](#spline-chart)
    - [Area Chart](#area-chart)
    - [Bar Chart](#bar-chart)
    - [Column Chart](#column-chart)
    - [Scatter Chart](#scatter-chart)
    - [Bubble Chart](#bubble-chart)
  - [Stacked and Range Chart Types](#stacked-and-range-chart-types)
    - [Stacked Chart](#stacked-chart)
    - [Range Column Chart](#range-column-chart)
    - [Range Area Chart](#range-area-chart)
  - [Polar and Radar Charts](#polar-and-radar-charts)
    - [Polar Chart](#polar-chart)
    - [Radar Chart](#radar-chart)
    - [Polar and Radar Draw Types](#polar-and-radar-draw-types)
  - [Statistical Chart Types](#statistical-chart-types)
    - [Histogram](#histogram)
    - [Box and Whisker](#box-and-whisker)
    - [Pareto Chart](#pareto-chart)
  - [Specialized Chart Types](#specialized-chart-types)
    - [Waterfall Chart](#waterfall-chart)
    - [Step Chart](#step-chart)
    - [Multicolored Chart](#multicolored-chart)
  - [Financial Chart Types](#financial-chart-types)
    - [Candlestick Chart](#candlestick-chart)
    - [Hilo Open Close Chart](#hilo-open-close-chart)
    - [Hilo Chart](#hilo-chart)
  - [Circular and Accumulation Chart Types](#circular-and-accumulation-chart-types)
  - [Chart Type Comparison](#chart-type-comparison)
    - [Line and Spline](#line-and-spline)
    - [Area](#area)
    - [Column](#column)
    - [Bar](#bar)


## Overview

The EJ2 Chart supports Cartesian, Polar, Radar, statistical, range, stacked, waterfall, and financial series. Supported chart series include Line, Column, Area, Bar, Histogram, stacked series, StepLine, StepArea, Scatter, Spline, RangeColumn, Hilo, HiloOpenClose, Waterfall, RangeArea, Candle, BoxAndWhisker, Bubble, Polar, Radar, Pareto, and multicolored series.

Choose a chart based on the data structure and the comparison users need to make.

- Use Line or Spline to display trends.
- Use Column to compare categories vertically.
- Use Bar to compare categories horizontally.
- Use Area to emphasize magnitude over time.
- Use stacked series to compare totals and contributions.
- Use Scatter to examine relationships between two numeric variables.
- Use Bubble to compare three numeric variables.
- Use Histogram or Box and Whisker for statistical analysis.
- Use Waterfall to explain cumulative increases and decreases.
- Use Candle, HiloOpenClose, or Hilo for financial data.
- Use Polar or Radar for cyclical or multidimensional comparisons.
- Use the separate `AccumulationChart` component for Pie, Doughnut, Funnel, and Pyramid visualizations.

The EJ2 Chart package provides more than 50 chart and graph variations through its series types, stacking options, draw types, range series, financial series, trendlines, and technical indicators.

## Cartesian Chart Types

Cartesian charts render data against horizontal and vertical axes.

### Line Chart

A Line Chart connects data points with straight line segments. It is suitable for trends, ordered categories, and continuous data.

Required modules:

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

Example:

```typescript
interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  {
    month: 'Jan',
    sales: 35
  },
  {
    month: 'Feb',
    sales: 28
  },
  {
    month: 'Mar',
    sales: 34
  },
  {
    month: 'Apr',
    sales: 42
  }
];

const chart: Chart = new Chart({
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
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales',
      width: 2,
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use Line Charts for:

- Time-series trends.
- Performance monitoring.
- Website traffic.
- Temperature changes.
- Multiple-series comparisons.

### Spline Chart

A Spline Chart displays a smooth curve between data points.

Required modules:

```typescript
import {
  Category,
  Chart,
  SplineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  SplineSeries,
  Category
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Spline',
      name: 'Sales',
      width: 2,
      marker: {
        visible: true
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use a Spline Chart when a smooth visual trend is appropriate. Do not use smoothing when it could imply values that were not measured.

### Area Chart

An Area Chart fills the region between a line and the axis. It emphasizes magnitude as well as trend.

Required modules:

```typescript
import {
  AreaSeries,
  Category,
  Chart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  AreaSeries,
  Category
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Area',
      name: 'Sales',
      opacity: 0.6
    }
  ]
});

chart.appendTo('#chart');
```

Related area series include:

- `Area`
- `SplineArea`
- `StepArea`
- `StackingArea`
- `StackingArea100`
- `StackingStepArea`
- `RangeArea`
- `RangeStepArea`
- `SplineRangeArea`

Inject the module required by every configured series type.

### Bar Chart

A Bar Chart renders horizontal bars and is suitable for comparisons involving long category labels.

Required modules:

```typescript
import {
  BarSeries,
  Category,
  Chart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  BarSeries,
  Category
);
```

Example:

```typescript
interface DepartmentData {
  department: string;
  budget: number;
}

const chartData: DepartmentData[] = [
  {
    department: 'Engineering',
    budget: 85
  },
  {
    department: 'Customer Support',
    budget: 62
  },
  {
    department: 'Product Management',
    budget: 74
  },
  {
    department: 'Marketing',
    budget: 58
  }
];

const chart: Chart = new Chart({
  title: 'Department Budget',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Department'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20,
    title: 'Budget'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'department',
      yName: 'budget',
      type: 'Bar',
      name: 'Budget'
    }
  ]
});

chart.appendTo('#chart');
```

Continue mapping category values through `xName` and numeric values through `yName`. Do not exchange the field mappings merely because bars render horizontally.

Use Bar Charts for:

- Rankings.
- Department comparisons.
- Long category names.
- Survey results.
- Geographic comparisons.

### Column Chart

A Column Chart renders vertical columns for category comparison.

Required modules:

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
```

Example:

```typescript
const chart: Chart = new Chart({
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
      cornerRadius: {
        topLeft: 4,
        topRight: 4,
        bottomLeft: 0,
        bottomRight: 0
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use a `cornerRadius` object. Do not assign a single number directly to `cornerRadius`.

Related Column series include:

- `Column`
- `StackingColumn`
- `StackingColumn100`
- `RangeColumn`

### Scatter Chart

A Scatter Chart plots independent X and Y values without connecting them.

Required module:

```typescript
import {
  Chart,
  ScatterSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(ScatterSeries);
```

Example:

```typescript
interface IncomeData {
  age: number;
  income: number;
}

const chartData: IncomeData[] = [
  {
    age: 22,
    income: 28000
  },
  {
    age: 28,
    income: 42000
  },
  {
    age: 35,
    income: 61000
  },
  {
    age: 43,
    income: 76000
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    title: 'Age'
  },
  primaryYAxis: {
    title: 'Income'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'age',
      yName: 'income',
      type: 'Scatter',
      name: 'Income',
      marker: {
        width: 12,
        height: 12
      }
    }
  ]
});

chart.appendTo('#chart');
```

Use Scatter Charts for:

- Correlation studies.
- Outlier detection.
- Distribution patterns.
- Numeric X and Y relationships.

### Bubble Chart

A Bubble Chart adds a third numeric variable that controls the bubble size.

Required modules:

```typescript
import {
  BubbleSeries,
  Chart,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  BubbleSeries,
  Tooltip
);
```

Example:

```typescript
interface CountryData {
  country: string;
  gdp: number;
  lifeExpectancy: number;
  population: number;
}

const chartData: CountryData[] = [
  {
    country: 'Country A',
    gdp: 42,
    lifeExpectancy: 72,
    population: 18
  },
  {
    country: 'Country B',
    gdp: 58,
    lifeExpectancy: 78,
    population: 32
  },
  {
    country: 'Country C',
    gdp: 35,
    lifeExpectancy: 69,
    population: 24
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    title: 'GDP'
  },
  primaryYAxis: {
    title: 'Life Expectancy'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.tooltip}</b><br>' +
      'GDP: ${point.x:n2}<br>' +
      'Life expectancy: ${point.y:n2}'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'gdp',
      yName: 'lifeExpectancy',
      size: 'population',
      tooltipMappingName: 'country',
      type: 'Bubble',
      name: 'Countries',
      minRadius: 5,
      maxRadius: 20
    }
  ]
});

chart.appendTo('#chart');
```

Use:

- `size` to map the third data variable.
- `minRadius` to configure the minimum bubble radius.
- `maxRadius` to configure the maximum bubble radius.

Do not describe Bubble Charts as three-dimensional Scatter Charts. They display three variables in a two-dimensional coordinate system.

## Stacked and Range Chart Types

### Stacked Chart

Stacked series show the contribution of multiple series to a category total.

Example using stacked columns:

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

interface RegionalData {
  quarter: string;
  north: number;
  south: number;
  west: number;
}

const chartData: RegionalData[] = [
  {
    quarter: 'Q1',
    north: 35,
    south: 28,
    west: 24
  },
  {
    quarter: 'Q2',
    north: 42,
    south: 32,
    west: 26
  },
  {
    quarter: 'Q3',
    north: 48,
    south: 36,
    west: 30
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  tooltip: {
    enable: true,
    shared: true
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
      type: 'StackingColumn',
      name: 'North'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'south',
      type: 'StackingColumn',
      name: 'South'
    },
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'west',
      type: 'StackingColumn',
      name: 'West'
    }
  ]
});

chart.appendTo('#chart');
```

Common stacked series include:

- `StackingColumn`
- `StackingColumn100`
- `StackingBar`
- `StackingBar100`
- `StackingArea`
- `StackingArea100`
- `StackingLine`
- `StackingLine100`
- `StackingStepArea`

Use the `100` variants when every category should be normalized to 100 percent.

### Range Column Chart

A Range Column Chart displays a low and high value for every category.

Required modules:

```typescript
import {
  Category,
  Chart,
  RangeColumnSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  RangeColumnSeries,
  Category
);
```

Example:

```typescript
interface TemperatureData {
  month: string;
  low: number;
  high: number;
}

const chartData: TemperatureData[] = [
  {
    month: 'Jan',
    low: 12,
    high: 24
  },
  {
    month: 'Feb',
    low: 14,
    high: 27
  },
  {
    month: 'Mar',
    low: 17,
    high: 31
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      low: 'low',
      high: 'high',
      type: 'RangeColumn',
      name: 'Temperature Range'
    }
  ]
});

chart.appendTo('#chart');
```

### Range Area Chart

A Range Area Chart fills the region between low and high values.

Required modules:

```typescript
import {
  Category,
  Chart,
  RangeAreaSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  RangeAreaSeries,
  Category
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      low: 'low',
      high: 'high',
      type: 'RangeArea',
      name: 'Temperature Range',
      opacity: 0.6
    }
  ]
});

chart.appendTo('#chart');
```

## Polar and Radar Charts

Polar and Radar series require a `drawType` that determines how their data is rendered.

Supported draw types include Line, Column, Area, RangeColumn, Spline, Scatter, StackingArea, and StackingColumn. The default draw type is Line.

### Polar Chart

Import and inject `PolarSeries` and the module required by the selected draw type.

For a Polar Line Chart:

```typescript
import {
  Category,
  Chart,
  LineSeries,
  PolarSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  PolarSeries,
  LineSeries,
  Category
);
```

Example:

```typescript
interface SkillData {
  skill: string;
  proficiency: number;
}

const chartData: SkillData[] = [
  {
    skill: 'Communication',
    proficiency: 80
  },
  {
    skill: 'Technical',
    proficiency: 90
  },
  {
    skill: 'Leadership',
    proficiency: 72
  },
  {
    skill: 'Planning',
    proficiency: 84
  }
];

const chart: Chart = new Chart({
  title: 'Skill Assessment',
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20
  },
  series: [
    {
      dataSource: chartData,
      xName: 'skill',
      yName: 'proficiency',
      type: 'Polar',
      drawType: 'Line',
      name: 'Proficiency',
      isClosed: true,
      marker: {
        visible: true
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Radar Chart

Import and inject `RadarSeries` and the module required by the selected draw type.

For a Radar Area Chart:

```typescript
import {
  AreaSeries,
  Category,
  Chart,
  RadarSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  RadarSeries,
  AreaSeries,
  Category
);
```

Example:

```typescript
const chart: Chart = new Chart({
  title: 'Product Comparison',
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20
  },
  series: [
    {
      dataSource: chartData,
      xName: 'skill',
      yName: 'proficiency',
      type: 'Radar',
      drawType: 'Area',
      name: 'Product A',
      opacity: 0.5
    }
  ]
});

chart.appendTo('#chart');
```

A Radar Chart is not configured merely by using `type: 'Radar'`. Configure a supported `drawType` and inject its corresponding module.

### Polar and Radar Draw Types

Examples of module requirements include:

- `drawType: 'Line'` requires `LineSeries`.
- `drawType: 'Spline'` requires `SplineSeries`.
- `drawType: 'Area'` requires `AreaSeries`.
- `drawType: 'Column'` requires `ColumnSeries`.
- `drawType: 'RangeColumn'` requires `RangeColumnSeries`.
- `drawType: 'Scatter'` requires `ScatterSeries`.
- `drawType: 'StackingArea'` requires `StackingAreaSeries`.
- `drawType: 'StackingColumn'` requires `StackingColumnSeries`.

Always inject `PolarSeries` or `RadarSeries` in addition to the draw-type module.

## Statistical Chart Types

### Histogram

A Histogram groups numeric observations into intervals and displays their frequency.

Required module:

```typescript
import {
  Chart,
  HistogramSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(HistogramSeries);
```

Example:

```typescript
interface MeasurementData {
  value: number;
}

const chartData: MeasurementData[] = [
  { value: 5.3 },
  { value: 6.2 },
  { value: 7.8 },
  { value: 8.1 },
  { value: 8.7 },
  { value: 9.3 },
  { value: 10.1 },
  { value: 10.8 },
  { value: 11.4 },
  { value: 12.2 }
];

const chart: Chart = new Chart({
  title: 'Measurement Distribution',
  primaryXAxis: {
    title: 'Value'
  },
  primaryYAxis: {
    title: 'Frequency'
  },
  series: [
    {
      dataSource: chartData,
      yName: 'value',
      type: 'Histogram',
      name: 'Measurements',
      binInterval: 2,
      showNormalDistribution: true
    }
  ]
});

chart.appendTo('#chart');
```

Use `binInterval` to control the interval width.

A Histogram is not suitable for categorical frequency data that has already been aggregated. Use a Column Chart for pre-aggregated categories.

### Box and Whisker

A Box and Whisker Chart displays medians, quartiles, ranges, and outliers.

Required modules:

```typescript
import {
  BoxAndWhiskerSeries,
  Category,
  Chart
} from '@syncfusion/ej2-charts';

Chart.Inject(
  BoxAndWhiskerSeries,
  Category
);
```

The field mapped through `yName` contains an array of numeric observations.

```typescript
interface ExperimentData {
  experiment: string;
  values: number[];
}

const chartData: ExperimentData[] = [
  {
    experiment: 'Experiment A',
    values: [
      12,
      15,
      18,
      19,
      22,
      24,
      30
    ]
  },
  {
    experiment: 'Experiment B',
    values: [
      10,
      14,
      17,
      21,
      23,
      26,
      28
    ]
  }
];

const chart: Chart = new Chart({
  title: 'Experiment Distribution',
  primaryXAxis: {
    valueType: 'Category'
  },
  primaryYAxis: {
    title: 'Observed Value'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'experiment',
      yName: 'values',
      type: 'BoxAndWhisker',
      name: 'Distribution',
      boxPlotMode: 'Normal'
    }
  ]
});

chart.appendTo('#chart');
```

### Pareto Chart

A Pareto Chart combines descending columns with a cumulative percentage line.

Required modules:

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  LineSeries,
  ParetoSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ParetoSeries,
  ColumnSeries,
  LineSeries,
  Category
);
```

Example:

```typescript
interface DefectData {
  defect: string;
  count: number;
}

const chartData: DefectData[] = [
  {
    defect: 'Surface',
    count: 45
  },
  {
    defect: 'Dimensions',
    count: 32
  },
  {
    defect: 'Assembly',
    count: 18
  },
  {
    defect: 'Packaging',
    count: 9
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'defect',
      yName: 'count',
      type: 'Pareto',
      name: 'Defects'
    }
  ]
});

chart.appendTo('#chart');
```

## Specialized Chart Types

### Waterfall Chart

A Waterfall Chart shows how positive and negative values contribute to a cumulative total.

Required modules:

```typescript
import {
  Category,
  Chart,
  WaterfallSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  WaterfallSeries,
  Category
);
```

Example:

```typescript
interface FinancialChangeData {
  stage: string;
  amount: number;
}

const chartData: FinancialChangeData[] = [
  {
    stage: 'Starting Revenue',
    amount: 120
  },
  {
    stage: 'Product Sales',
    amount: 45
  },
  {
    stage: 'Service Revenue',
    amount: 25
  },
  {
    stage: 'Operating Cost',
    amount: -38
  },
  {
    stage: 'Tax',
    amount: -18
  },
  {
    stage: 'Net Revenue',
    amount: 0
  }
];

const chart: Chart = new Chart({
  title: 'Revenue Breakdown',
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'stage',
      yName: 'amount',
      type: 'Waterfall',
      name: 'Revenue',
      intermediateSumIndexes: [],
      sumIndexes: [
        5
      ],
      negativeFillColor: '#D13438',
      summaryFillColor: '#0F6CBD'
    }
  ]
});

chart.appendTo('#chart');
```

Use Waterfall Charts for:

- Revenue analysis.
- Budget changes.
- Profit and loss explanations.
- Inventory movement.
- Cumulative positive and negative changes.

### Step Chart

Step charts hold each value until the next point is reached.

Required module for Step Line:

```typescript
import {
  Category,
  Chart,
  StepLineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  StepLineSeries,
  Category
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'StepLine',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

Related types include:

- `StepLine`
- `StepArea`
- `RangeStepArea`
- `StackingStepArea`

### Multicolored Chart

Multicolored series use point or segment colors to highlight ranges and conditions.

Required module:

```typescript
import {
  Chart,
  MultiColoredLineSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(MultiColoredLineSeries);
```

Example with point color mapping:

```typescript
interface PerformanceData {
  x: number;
  y: number;
  color: string;
}

const chartData: PerformanceData[] = [
  {
    x: 1,
    y: 20,
    color: '#107C10'
  },
  {
    x: 2,
    y: 35,
    color: '#107C10'
  },
  {
    x: 3,
    y: 18,
    color: '#D13438'
  },
  {
    x: 4,
    y: 42,
    color: '#107C10'
  }
];

const chart: Chart = new Chart({
  series: [
    {
      dataSource: chartData,
      xName: 'x',
      yName: 'y',
      pointColorMapping: 'color',
      type: 'MultiColoredLine',
      name: 'Performance'
    }
  ]
});

chart.appendTo('#chart');
```

## Financial Chart Types

Financial series commonly use a DateTime X-axis and fields such as high, low, open, and close.

### Candlestick Chart

A Candlestick Chart displays open, high, low, and close values.

Required modules:

```typescript
import {
  CandleSeries,
  Chart,
  DateTime
} from '@syncfusion/ej2-charts';

Chart.Inject(
  CandleSeries,
  DateTime
);
```

Example:

```typescript
interface StockData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

const chartData: StockData[] = [
  {
    date: new Date(2026, 0, 1),
    open: 120,
    high: 132,
    low: 116,
    close: 128
  },
  {
    date: new Date(2026, 0, 2),
    open: 128,
    high: 137,
    low: 124,
    close: 130
  },
  {
    date: new Date(2026, 0, 3),
    open: 130,
    high: 134,
    low: 121,
    close: 124
  }
];

const chart: Chart = new Chart({
  title: 'Stock Price',
  primaryXAxis: {
    valueType: 'DateTime',
    labelFormat: 'dd MMM'
  },
  series[
: new Date(2026, 0, 1)ce: chartData,
      xName: 'date',
      open: 'open',
      high: 'high',
      low: 'low',
      close: 'close',
      type: 'Candle',
      name: 'Price'
    }
  ]
});

chart.appendTo('#chart');
```

### Hilo Open Close Chart

Required modules:

```typescript
import {
  Chart,
  DateTime,
  HiloOpenCloseSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  HiloOpenCloseSeries,
  DateTime
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'DateTime'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      open: 'open',
      high: 'high',
      low: 'low',
      close: 'close',
      type: 'HiloOpenClose',
      name: 'Price'
    }
  ]
});

chart.appendTo('#chart');
```

### Hilo Chart

A Hilo Chart displays only high and low values.

Required modules:

```typescript
import {
  Chart,
  DateTime,
  HiloSeries
} from '@syncfusion/ej2-charts';

Chart.Inject(
  HiloSeries,
  DateTime
);
```

Example:

```typescript
const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'DateTime'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'date',
      high: 'high',
      low: 'low',
      type: 'Hilo',
      name: 'Daily Range'
    }
  ]
});

chart.appendTo('#chart');
```

## Circular and Accumulation Chart Types

Pie, Doughnut, Funnel, and Pyramid visualizations should be created with `AccumulationChart`, not the Cartesian `Chart`.

Use these modules with `AccumulationChart`:

- `PieSeries` for Pie and Doughnut charts.
- `FunnelSeries` for Funnel charts.
- `PyramidSeries` for Pyramid charts.

Example Pie Chart:

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

interface CategoryData {
  category: string;
  value: number;
}

const chartData: CategoryData[] = [
  {
    category: 'A',
    value: 40
  },
  {
    category: 'B',
    value: 35
  },
  {
    category: 'C',
    value: 25
  }
];

const chart: AccumulationChart =
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

chart.appendTo('#chart');
```

Example Doughnut Chart:

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        innerRadius: '50%'
      }
    ]
  });

chart.appendTo('#chart');
```

Do not use `type: 'Doughnut'`. A Doughnut Chart is a Pie series with a nonzero `innerRadius`.

Example Funnel Chart:

```typescript
import {
  AccumulationChart,
  FunnelSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(FunnelSeries);

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'stage',
        yName: 'value',
        type: 'Funnel'
      }
    ]
  });

chart.appendTo('#chart');
```

Example Pyramid Chart:

```typescript
import {
  AccumulationChart,
  PyramidSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PyramidSeries);

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'level',
        yName: 'value',
        type: 'Pyramid'
      }
    ]
  });

chart.appendTo('#chart');
```

## Chart Type Comparison

### Line and Spline

Best for:

- Trends.
- Time-series data.
- Ordered categories.
- Multiple-series comparison.

Avoid when:

- The data has no meaningful order.
- A connecting path would imply continuity that does not exist.

### Area

Best for:

- Trends with magnitude.
- Cumulative values.
- Stacked contributions.

Avoid when:

- Overlapping areas obscure important values.
- Precise line comparison is required.

### Column

Best for:

- Vertical category comparison.
- Side-by-side series.
- Grouped and stacked totals.

### Bar

Best for:

- Horizontal category comparison.
- Long labels.
- Rankings.
- Many categories.

### Scatter

Best for:

- Correlation.
- Distribution.
- Outlier detection.
- Independent numeric X and Y values.

### Bubble

Best for:

- Three-variable relationships.
- Comparing X, Y, and relative magnitude.

### Histogram

Best for:

- Frequency distribution.
- Numeric observations.
- Examining distribution shape.

### Box and Whisker

Best for:

- Quartiles.
- Medians.
- Statistical spread.
- Outliers.
- Comparing sample distributions.

### Waterfall

Best for:

- Sequential changes.
- Financial breakdown.
- Positive and negative contributions.
- Explaining a cumulative total.

### Polar and Radar

Best for:

- Cyclical data.
- Multidimensional comparisons.
- Performance profiles.
- Directional data.

### Financial Series

Best for:

- High and low ranges.
- Open and close values.
- Market and stock data.
- Financial price movement.

### Accumulation Charts

Best for:

- Parts of a whole.
- Pie and Doughnut distributions.
- Funnel stages.
- Pyramid hierarchies.

Use `AccumulationChart`, not `Chart`.

## Choosing a Chart Type

Use a Line Chart when:

- Data has a meaningful order.
- Trends are more important than individual category sizes.
- Several related series must be compared.

Use a Column Chart when:

- Individual category values must be compared.
- Category labels are relatively short.
- Side-by-side or stacked comparison is required.

Use a Bar Chart when:

- Category labels are long.
- Rankings are important.
- Horizontal comparison improves readability.

Use an Area Chart when:

- Magnitude and trend are both important.
- A filled region communicates volume or accumulation.

Use a Scatter Chart when:

- X and Y are independent numeric variables.
- Correlation or outliers must be examined.

Use a Bubble Chart when:

- A third numeric value controls relative point size.
- The chart remains readable with varying bubble sizes.

Use a Histogram when:

- Raw observations must be divided into numeric intervals.
- Frequency distribution is the focus.

Use a Box and Whisker Chart when:

- Median, quartiles, spread, and outliers must be compared.

Use a Waterfall Chart when:

- Positive and negative changes explain a cumulative result.

Use Polar or Radar when:

- Categories represent cyclical or multidimensional measures.
- Multiple dimensions must be compared around a radial axis.

Use financial series when:

- The data contains high, low, open, and close values.

Use `AccumulationChart` when:

- A Pie, Doughnut, Funnel, or Pyramid visualization is required.

## Implementation Pattern

A complete Chart implementation requires:

1. Preparing the data.
2. Importing the required series module.
3. Importing the required axis module.
4. Injecting all required modules.
5. Mapping the data fields.
6. Configuring the axes.
7. Creating the chart.
8. Appending it to a valid element.

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

interface ChartData {
  category: string;
  value: number;
}

const chartData: ChartData[] = [
  {
    category: 'A',
    value: 25
  },
  {
    category: 'B',
    value: 32
  },
  {
    category: 'C',
    value: 28
  }
];

const chart: Chart = new Chart({
  primaryXAxis: {
    valueType: 'Category',
    title: 'Category'
  },
  primaryYAxis: {
    title: 'Value'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'category',
      yName: 'value',
      type: 'Line',
      name: 'Value'
    }
  ]
});

chart.appendTo('#chart');
```

The primary Y-axis is numeric by default. Do not use `valueType: 'Double'`.

In most basic examples, omit the primary Y-axis `valueType`.

## Complete TypeScript Example

The following example renders Line, Column, and Scatter series in separate chart instances.

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  Legend,
  LineSeries,
  ScatterSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  ColumnSeries,
  ScatterSeries,
  Category,
  Legend,
  Tooltip
);

interface BusinessData {
  month: string;
  sales: number;
  revenue: number;
}

const businessData: BusinessData[] = [
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
    revenue: 49
  },
  {
    month: 'Apr',
    sales: 42,
    revenue: 56
  }
];

const lineChart: Chart = new Chart({
  title: 'Monthly Sales Trend',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${series.name}</b><br>' +
      '${point.x}: ${point.y:n2}'
  },
  series: [
    {
      dataSource: businessData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales',
      width: 2,
      marker: {
        visible: true
      }
    }
  ]
});

lineChart.appendTo('#line-chart');

const columnChart: Chart = new Chart({
  title: 'Sales and Revenue',
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
    shared: true
  },
  series: [
    {
      dataSource: businessData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Sales'
    },
    {
      dataSource: businessData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

columnChart.appendTo('#column-chart');

interface CorrelationData {
  advertising: number;
  sales: number;
}

const correlationData: CorrelationData[] = [
  {
    advertising: 10,
    sales: 22
  },
  {
    advertising: 18,
    sales: 31
  },
  {
    advertising: 24,
    sales: 36
  },
  {
    advertising: 30,
    sales: 45
  }
];

const scatterChart: Chart = new Chart({
  title: 'Advertising and Sales',
  primaryXAxis: {
    title: 'Advertising'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format:
      'Advertising: ${point.x:n2}<br>' +
      'Sales: ${point.y:n2}'
  },
  series: [
    {
      dataSource: correlationData,
      xName: 'advertising',
      yName: 'sales',
      type: 'Scatter',
      name: 'Observations',
      marker: {
        width: 12,
        height: 12
      }
    }
  ]
});

scatterChart.appendTo('#scatter-chart');

window.addEventListener('beforeunload', () => {
  lineChart.destroy();
  columnChart.destroy();
  scatterChart.destroy();
});
```

**HTML:**

```html
<div id="line-chart"></div>
<div id="column-chart"></div>
<div id="scatter-chart"></div>
```

**CSS:**

```css
#line-chart,
#column-chart,
#scatter-chart {
  width: 100%;
  min-height: 420px;
}
```

## Complete JavaScript Example

```javascript
ej.charts.Chart.Inject(
  ej.charts.LineSeries,
  ej.charts.ColumnSeries,
  ej.charts.Category,
  ej.charts.Legend,
  ej.charts.Tooltip
);

var chartData = [
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
    revenue: 49
  },
  {
    month: 'Apr',
    sales: 42,
    revenue: 56
  }
];

var chart = new ej.charts.Chart({
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
      type: 'Line',
      name: 'Sales',
      marker: {
        visible: true
      }
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

## Troubleshooting

### Series Is Not Displayed

- Import and inject the module required by the series type.
- Ensure that `dataSource` contains valid records.
- Ensure that `xName` and `yName` match the data-source fields.
- Ensure that mapped Y-values are numeric.
- Ensure that the chart container has a valid height.
- Check the browser console for module errors.

### Bar Chart Is Not Displayed

- Import and inject `BarSeries`.
- Set the series `type` to `Bar`.
- Continue mapping category values through `xName`.
- Continue mapping numeric values through `yName`.
- Inject `Category` when the X-axis uses category values.

### Column Corner Radius Is Not Applied

- Use a `cornerRadius` object.
- Configure `topLeft`, `topRight`, `bottomLeft`, and `bottomRight`.
- Do not assign a single numeric value to `cornerRadius`.

### Bubble Sizes Are Incorrect

- Map the size field through `size`.
- Ensure that size values are numeric.
- Use `minRadius` and `maxRadius`.
- Do not use `marker.width` and `marker.height` as the Bubble series size range.

### Polar or Radar Chart Is Not Displayed

- Inject `PolarSeries` or `RadarSeries`.
- Set `type` to `Polar` or `Radar`.
- Set `drawType` to a supported value.
- Inject the module required by the draw type.
- Inject `Category` when the X-axis uses category values.

### Histogram Is Not Displayed

- Import and inject `HistogramSeries`.
- Map raw numeric observations through `yName`.
- Set `type` to `Histogram`.
- Use a positive `binInterval`.
- Do not bind already aggregated category counts as raw observations.

### Box and Whisker Chart Is Not Displayed

- Import and inject `BoxAndWhiskerSeries`.
- Inject `Category` for a Category X-axis.
- Ensure that `yName` maps to an array of numbers.
- Remove invalid or nonnumeric observations.

### Financial Series Is Not Displayed

- Inject the corresponding financial series module.
- Inject `DateTime` when the X-axis uses dates.
- Convert date input to valid JavaScript `Date` objects.
- Map the required fields, such as `high`, `low`, `open`, and `close`.

### Pie or Doughnut Chart Is Not Displayed

- Use `AccumulationChart`, not `Chart`.
- Inject `PieSeries` through `AccumulationChart.Inject`.
- Set `type` to `Pie`.
- Set a nonzero `innerRadius` for a Doughnut Chart.
- Do not use `type: 'Doughnut'`.

## Next Steps

- **Configure series details:** See `references/series-configuration.md`.
- **Customize axes:** See `references/axes-customization.md`.
- **Add interactivity:** See `references/features-interaction.md`.
- **Style chart appearance:** See `references/styling-appearance.md`.
- **Configure tooltips:** See `references/tooltip-configuration.md`.
- **Configure legends:** See `references/legend-configuration.md`.
- **Configure financial indicators:** See `references/advanced-features.md`.