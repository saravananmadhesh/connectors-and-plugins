# Chart Types in Accumulation Charts

## Table of Contents

- [Chart Types in Accumulation Charts](#chart-types-in-accumulation-charts)
  - [Pie Charts](#pie-charts)
    - [Basic Pie Chart](#basic-pie-chart)
    - [Radius Customization](#radius-customization)
    - [Pie Center](#pie-center)
    - [Partial Pie Chart](#partial-pie-chart)
  - [Doughnut Charts](#doughnut-charts)
    - [Basic Doughnut Chart](#basic-doughnut-chart)
    - [Inner Radius](#inner-radius)
    - [Doughnut Center Label](#doughnut-center-label)
  - [Multiple Pie and Doughnut Series](#multiple-pie-and-doughnut-series)
    - [Multiple Pie Series](#multiple-pie-series)
    - [Mapping Related Points with mappingKey](#mapping-related-points-with-mappingkey)
    - [Multiple Doughnut Series](#multiple-doughnut-series)
    - [Multiple Series Requirements](#multiple-series-requirements)
  - [Funnel Charts](#funnel-charts)
    - [Basic Funnel Chart](#basic-funnel-chart)
    - [Funnel Neck](#funnel-neck)
    - [Funnel Size](#funnel-size)
    - [Funnel Gap Ratio](#funnel-gap-ratio)
  - [Pyramid Charts](#pyramid-charts)
    - [Basic Pyramid Chart](#basic-pyramid-chart)
    - [Pyramid Mode](#pyramid-mode)
    - [Pyramid Gap Ratio](#pyramid-gap-ratio)
  - [Chart Type Comparison](#chart-type-comparison)
    - [Pie](#pie)
    - [Doughnut](#doughnut)
    - [Multiple Pie or Doughnut Series](#multiple-pie-or-doughnut-series)
    - [Funnel](#funnel)
    - [Pyramid](#pyramid)
  - [Choosing a Chart Type](#choosing-a-chart-type)
    - [Use Pie When](#use-pie-when)
    - [Use Doughnut When](#use-doughnut-when)
    - [Use Multiple Pie or Doughnut Series When](#use-multiple-pie-or-doughnut-series-when)
    - [Use Funnel When](#use-funnel-when)
    - [Use Pyramid When](#use-pyramid-when)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Troubleshooting](#troubleshooting)
    - [Pie Chart Is Not Displayed](#pie-chart-is-not-displayed)
    - [Doughnut Chart Is Not Displayed](#doughnut-chart-is-not-displayed)
    - [Multiple Pie Series Are Not Displayed Correctly](#multiple-pie-series-are-not-displayed-correctly)
    - [mappingKey Is Not Working](#mappingkey-is-not-working)
    - [Funnel Chart Is Not Displayed](#funnel-chart-is-not-displayed)
    - [Pyramid Chart Is Not Displayed](#pyramid-chart-is-not-displayed)
    - [Center Label Is Not Visible](#center-label-is-not-visible)
    - [Data Labels Overlap](#data-labels-overlap)


The EJ2 Accumulation Chart supports Pie, Doughnut, Funnel, and Pyramid visualizations.

The required series modules are:

- `PieSeries` for both Pie and Doughnut charts.
- `FunnelSeries` for Funnel charts.
- `PyramidSeries` for Pyramid charts.

A Doughnut Chart is created from a Pie series by setting `innerRadius` to a value greater than `0%`. There is no separate `DoughnutSeries` module.

## Pie Charts

Pie Charts display proportional data as slices of a circle. The size of each slice is determined by the numeric value mapped through `yName`.

Pie Charts are suitable for:

- Showing parts of a whole.
- Comparing category proportions.
- Displaying percentage distributions.
- Visualizing a small number of distinct categories.

Inject `PieSeries` before creating a Pie Chart.

### Basic Pie Chart

**TypeScript:**

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

interface MonthlyData {
  month: string;
  value: number;
}

const chartData: MonthlyData[] = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 3.5 },
  { month: 'Mar', value: 7 },
  { month: 'Apr', value: 13.5 },
  { month: 'May', value: 19 },
  { month: 'Jun', value: 23.5 }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Monthly Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        name: 'Monthly Values'
      }
    ]
  });

chart.appendTo('#pie-chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries
);

var chartData = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 3.5 },
  { month: 'Mar', value: 7 },
  { month: 'Apr', value: 13.5 },
  { month: 'May', value: 19 },
  { month: 'Jun', value: 23.5 }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Monthly Distribution',
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        name: 'Monthly Values'
      }
    ]
  });

chart.appendTo('#pie-chart');
```

### Radius Customization

Use the series `radius` property to customize the outer radius of the Pie Chart.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        radius: '100%'
      }
    ]
  });

chart.appendTo('#chart');
```

Common radius configurations include:

- `80%` for a standard-sized Pie Chart.
- `100%` to use more of the available chart area.
- `60%` for a smaller Pie Chart.
- A pixel value such as `150px` for a fixed radius.

Percentage-based values are generally preferable for responsive layouts.

### Pie Center

Use the chart-level `center` property to change the center position of the Pie Chart.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    center: {
      x: '55%',
      y: '50%'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        radius: '80%'
      }
    ]
  });

chart.appendTo('#chart');
```

The default center is normally calculated at the middle of the available chart area.

### Partial Pie Chart

Use `startAngle` and `endAngle` to create a partial or semi-circular Pie Chart.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'month',
        yName: 'value',
        type: 'Pie',
        startAngle: 270,
        endAngle: 90,
        radius: '90%'
      }
    ]
  });

chart.appendTo('#chart');
```

The angles are numeric degree values.

## Doughnut Charts

A Doughnut Chart is a Pie series with a nonzero `innerRadius`.

Use `PieSeries` for both Pie and Doughnut charts. Do not import or inject a `DoughnutSeries` module.

Doughnut Charts are suitable for:

- Part-to-whole visualization.
- Dashboards requiring center space.
- Displaying a central KPI or summary.
- Comparing proportions with a lighter visual appearance.

### Basic Doughnut Chart

**TypeScript:**

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

interface ProductData {
  product: string;
  revenue: number;
}

const chart[
Source: chartData,
Name: 'month',
Name: 'value',
: 'Pie',
Angle: 270,
Angle: 90,
: '90%'
To('#chart') B',
    revenue: 18000
  },
  {
    product: 'Product C',
    revenue: 12000
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Revenue',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        radius: '90%',
        innerRadius: '40%',
        name: 'Revenue'
      }
    ]
  });

chart.appendTo('#doughnut-chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries
);

var chartData = [
  {
    product: 'Product A',
    revenue: 25000
  },
  {
    product: 'Product B',
    revenue: 18000
  },
  {
    product: 'Product C',
    revenue: 12000
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Product Revenue',
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        radius: '90%',
        innerRadius: '40%',
        name: 'Revenue'
      }
    ]
  });

chart.appendTo('#doughnut-chart');
```

### Inner Radius

The `innerRadius` determines the size of the hollow center.

```typescript
series:[
Source: chartData,
Name: tData,
    xName: 'product',
    yName: 'revenue',
    type: 'Pie',
    radius: '90%',
    innerRadius: '50%'
  }
]
```

Common configurations include:

- `0%` for a Pie Chart without a center hole.
- `20%` for a small center hole.
- `40%` for a standard Doughnut Chart.
- `60%` for a larger center area.
- `75%` for a thin ring.

The `innerRadius` should remain smaller than the outer `radius`.

### Doughnut Center Label

Use the chart-level `centerLabel` property to display information in the center of the Doughnut Chart.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Revenue',
    centerLabel: {
      text: 'Total Revenue',
      hoverTextFormat:
        '${point.x}: ${point.y}'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'product',
        yName: 'revenue',
        type: 'Pie',
        radius: '90%',
        innerRadius: '55%'
      }
    ]
  });

chart.appendTo('#chart');
```

Ensure that the `innerRadius` provides sufficient room for the center label.

## Multiple Pie and Doughnut Series

The Accumulation Chart supports multiple Pie series in the same chart. Multiple series can be rendered as concentric Pie or Doughnut rings by configuring a different `radius` and `innerRadius` for each series.

This is useful for:

- Comparing current and previous periods.
- Comparing related datasets.
- Displaying category proportions across multiple groups.
- Creating nested Pie or Doughnut visualizations.
- Sharing legend items across corresponding points.

Use `PieSeries` for every Pie or Doughnut ring.

### Multiple Pie Series

The following example displays two related datasets as concentric rings.

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip
);

interface DeviceData {
  device: string;
  usage: number;
}

const current[
Source: chartData,
Name: 'product',
Name: 'revenue',
: 'Pie',
: '90%',
Radius: '55%'
To('#chart')    usage: 35
  },
  {
    device: 'Tablet',
    usage: 20
  }
];

const previousYearData: DeviceData[] = [
  {
    device: 'Mobile',
    usage: 38
  },
  {
    device: 'Desktop',
    usage: 42
  },
  {
    device: 'Tablet',
    usage: 20
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Device Usage Comparison',
    legendSettings: {
      visible: true,
      position: 'Right',
      mappingKey: 'device'
    },
    tooltip: {
      enable: true,
      format:
        '<b>${series.name}</b><br>' +
        '${point.x}: ${point.y}%'
    },
    series: [
      {
        dataSource: currentYearData,
        xName: 'device',
        yName: 'usage',
        name: 'Current Year',
        type: 'Pie',
        radius: '100%',
        innerRadius: '72%'
      },
      {
        dataSource: previousYearData,
        xName: 'device',
        yName: 'usage',
        name: 'Previous Year',
        type: 'Pie',
        radius: '65%',
        innerRadius: '38%'
      }
    ]
  });

chart.appendTo('#multiple-pie-series');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationTooltip
);

var currentYearData = [
  {
    device: 'Mobile',
    usage: 45
  },
  {
    device: 'Desktop',
    usage: 35
  },
  {
    device: 'Tablet',
    usage: 20
  }
];

var previousYearData = [
  {
    device: 'Mobile',
    usage: 38
  },
  {
    device: 'Desktop',
    usage: 42
  },
  {
    device: 'Tablet',
    usage: 20
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Device Usage Comparison',
    legendSettings: {
      visible: true,
      position: 'Right',
      mappingKey: 'device'
    },
    tooltip: {
      enable: true,
      format:
        '<b>${series.name}</b><br>' +
        '${point.x}: ${point.y}%'
    },
    series: [
      {
        dataSource: currentYearData,
        xName: 'device',
        yName: 'usage',
        name: 'Current Year',
        type: 'Pie',
        radius: '100%',
        innerRadius: '72%'
      },
      {
        dataSource: previousYearData,
        xName: 'device',
        yName: 'usage',
        name: 'Previous Year',
        type: 'Pie',
        radius: '65%',
        innerRadius: '38%'
      }
    ]
  });

chart.appendTo('#multiple-pie-series');
```

The series are rendered as separate concentric rings because:

- The outer series uses a larger `radius`.
- The outer series uses an `innerRadius` that leaves space for the inner series.
- The inner series uses a smaller `radius`.
- The inner series uses its own `innerRadius`.
- Each series has an independent data source and name.

### Mapping Related Points with mappingKey

Use `legendSettings.mappingKey` to associate corresponding points across multiple Pie series.

```typescript
legendSettings: {
  visible: true,
  position: 'Right',
  mappingKey: 'device'
}
```

The value assigned to `mappingKey` is the data-source property used to associate related points.

For example, the following points are associated because they both contain the `device` value `Mobile`:

```typescript
const currentYearPoint = {
  device: 'Mobile',
  usage: 45
};

const previousYearPoint = {
  device: 'Mobile',
  usage: 38
};
```

When `mappingKey` is set to `device`, the points with the same `device` value are represented through the corresponding shared legend behavior.

The point order does not need to be identical when the mapping is based on matching key values.

For example, the following series can still be associated through `device`:

```typescript
const currentYearData = [
  {
    device: 'Mobile',
    usage: 45
  },
  {
    device: 'Desktop',
    usage: 35
  },
  {
    device: 'Tablet',
    usage: 20
  }
];

const previousYearData = [
  {
    device: 'Tablet',
    usage: 20
  },
  {
    device: 'Mobile',
    usage: 38
  },
  {
    device: 'Desktop',
    usage: 42
  }
];
```

Requirements for `mappingKey`:

- Configure it inside `legendSettings`.
- Set it to a valid field name in the data source.
- Ensure that the field exists in every related point.
- Ensure that related points use identical key values.
- Ensure that key values uniquely identify categories within each series.
- Use consistent value types across the series.
- Inject `AccumulationLegend`.
- Set `legendSettings.visible` to `true`.

When the field mapped through `xName` should also be used as the mapping key, use the actual data-source field name.

For this series:

```typescript
series: [
  {
    dataSource: currentYearData,
    xName: 'device',
    yName: 'usage',
    type: 'Pie'
  }
]
```

Use:

```typescript
legendSettings: {
  visible: true,
  mappingKey: 'device'
}
```

Do not use `mappingKey: 'x'` unless the data-source property is actually named `x`.

### Multiple Doughnut Series

Multiple Doughnut series are created by assigning a nonzero `innerRadius` to each Pie series.

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend,
  AccumulationTooltip
);

interface RegionalData {
  region: string;
  value: number;
}

const currentYearData: RegionalData[] = [
  {
    region: 'North',
    value: 40
  },
  {
    region: 'South',
    value: 35
  },
  {
    region: 'East',
    value: 25
  }
];

const previousYearData: RegionalData[] = [
  {
    region: 'North',
    value: 35
  },
  {
    region: 'South',
    value: 40
  },
  {
    region: 'East',
    value: 25
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Regional Sales Comparison',
    legendSettings: {
      visible: true,
      position: 'Right',
      mappingKey: 'region'
    },
    tooltip: {
      enable: true,
      format:
        '<b>${series.name}</b><br>' +
        '${point.x}: ${point.y:n2}'
    },
    series: [
      {
        dataSource: currentYearData,
        xName: 'region',
        yName: 'value',
        name: 'Current Year',
        type: 'Pie',
        radius: '100%',
        innerRadius: '76%'
      },
      {
        dataSource: previousYearData,
        xName: 'region',
        yName: 'value',
        name: 'Previous Year',
        type: 'Pie',
        radius: '68%',
        innerRadius: '42%'
      }
    ]
  });

chart.appendTo('#multiple-doughnut-series');
```

### Multiple Series Requirements

When rendering multiple Pie or Doughnut series:

- Inject `PieSeries`.
- Configure a separate `radius` for each ring.
- Configure `innerRadius` to control the ring thickness.
- Ensure that ring ranges do not overlap unexpectedly.
- Assign a meaningful `name` to each series.
- Use `AccumulationTooltip` when tooltips are enabled.
- Use `${series.name}` in the tooltip to identify the active ring.
- Inject `AccumulationLegend` when the legend is visible.
- Use `mappingKey` when corresponding points should share legend behavior.
- Use matching category keys across related series.
- Test data-label placement carefully because labels from multiple rings can overlap.
- Ensure that the chart container is large enough for all rings.
- Prefer a small number of series and categories.

## Funnel Charts

Funnel Charts display values as stages in a funnel-shaped visualization. They are suitable for showing progressive reduction, conversion, or process flow.

Inject `FunnelSeries` before creating a Funnel Chart.

### Basic Funnel Chart

**TypeScript:**

```typescript
import {
  AccumulationChart,
  FunnelSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(FunnelSeries);

interface FunnelData {
  stage: string;
  value: number;
}

const stage[
Source: currentYearData,
Name: 'region',
Name: 'value',
: 'Current Year',
: 'Pie',
: '100%',
Radius: '76%'
Source: previousYearData,
Name: 'region',
Name: 'value',
: 'Previous Year',
: 'Pie',
: '68%',
Radius: '42%'
To('#multiple-doughnut-series'),
    value: 3000
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Sales Conversion Funnel',
    series: [
      {
        dataSource: stageData,
        xName: 'stage',
        yName: 'value',
        type: 'Funnel',
        name: 'Pipeline'
      }
    ]
  });

chart.appendTo('#funnel-chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.FunnelSeries
);

var stageData = [
  {
    stage: 'Awareness',
    value: 10000
  },
  {
    stage: 'Consideration',
    value: 8000
  },
  {
    stage: 'Evaluation',
    value: 6000
  },
  {
    stage: 'Purchase',
    value: 4000
  },
  {
    stage: 'Loyalty',
    value: 3000
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Sales Conversion Funnel',
    series: [
      {
        dataSource: stageData,
        xName: 'stage',
        yName: 'value',
        type: 'Funnel',
        name: 'Pipeline'
      }
    ]
  });

chart.appendTo('#funnel-chart');
```

### Funnel Neck

Use `neckWidth` and `neckHeight` to customize the narrow section of the Funnel Chart.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: stageData,
        xName: 'stage',
        yName: 'value',
        type: 'Funnel',
        neckWidth: '20%',
        neckHeight: '20%'
      }
    ]
  });

chart.appendTo('#chart');
```

- `neckWidth` controls the width of the funnel neck.
- `neckHeight` controls the height of the funnel neck.

### Funnel Size

Use the series `width` and `height` properties to control the Funnel Chart dimensions relative to the available chart area.

```typescript
series: [
  {
    dataSource: stageData,
    xName: 'stage',
    yName: 'value',
    type: 'Funnel',
    width: '80%',
    height: '90%'
  }
]
```

### Funnel Gap Ratio

Use `gapRatio` to control the gap between Funnel Chart segments.

```typescript
series: [
  {
    dataSource: stageData,
    xName: 'stage',
    yName: 'value',
    type: 'Funnel',
    gapRatio: 0.1
  }
]
```

The `gapRatio` value must be between `0` and `1`.

Use a small value to preserve visual continuity between stages.

## Pyramid Charts

Pyramid Charts display hierarchical or proportional values in a pyramid-shaped layout.

They are suitable for:

- Organizational levels.
- Population distribution.
- Resource hierarchy.
- Priority levels.
- Category proportions presented as ascending or descending layers.

Inject `PyramidSeries` before creating a Pyramid Chart.

### Basic Pyramid Chart

**TypeScript:**

```typescript
import {
  AccumulationChart,
  PyramidSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PyramidSeries);

interface HierarchyData {
  level: string;
  value: number;
}

const hierarchy[
Source: stageData,
Name: 'stage',
Name: 'value',
: 'Funnel',
Ratio: 0.1
gapRatio` value must be between `0` and `1`.

 small value to preserve visual continuity between stages.

 Charts

 Charts display hierarchical or proportional values in a pyramid-shaped layout.

 suitable for:

 levels.
 distribution.
 hierarchy.
 levels.
 proportions presented as ascending or descending layers.

PyramidSeries` before creating a Pyramid Chart.

 Pyramid Chart

Script:**


umulationChart,
Series
 '@syncfusion/ej2-charts';

Chart.Inject(PyramidSeries)art.appendTo('#pyramid-chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PyramidSeries
);

var hierarchyData = [
  {
    level: 'Management',
    value: 2
  },
  {
    level: 'Senior Staff',
    value: 8
  },
  {
    level: 'Mid-Level',
    value: 20
  },
  {
    level: 'Junior Staff',
    value: 45
  },
  {
    level: 'Interns',
    value: 15
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Organization Distribution',
    series: [
      {
        dataSource: hierarchyData,
        xName: 'level',
        yName: 'value',
        type: 'Pyramid',
        name: 'Employees'
      }
    ]
  });

chart.appendTo('#pyramid-chart');
```

### Pyramid Mode

Use `pyramidMode` to control how Pyramid Chart segment sizes are calculated.

```typescript
series: [
  {
    dataSource: hierarchyData,
    xName: 'level',
    yName: 'value',
    type: 'Pyramid',
    pyramidMode: 'Linear'
  }
]
```

Supported modes include:

- `Linear`
- `Surface`

Use `Linear` when the segment height should be proportional to its value.

Use `Surface` when the segment area should represent the corresponding value.

Do not document `Volume` unless it is explicitly supported by the targeted package version.

### Pyramid Gap Ratio

Use `gapRatio` to control the spacing between Pyramid Chart segments.

```typescript
series: [
  {
    dataSource: hierarchyData,
    xName: 'level',
    yName: 'value',
    type: 'Pyramid',
    pyramidMode: 'Linear',
    gapRatio: 0.05
  }
]
```

The `gapRatio` must be between `0` and `1`.

Do not use an unverified `reverse` property to invert the Pyramid Chart. Control the displayed category order by arranging the data source in the required sequence.

Example:

```typescript
const reversedHierarchyData: HierarchyData[] = [
  {
    level: 'Interns',
    value: 15
  },
  {
    level: 'Junior Staff',
    value: 45
  },
  {
    level: 'Mid-Level',
    value: 20
  },
  {
    level: 'Senior Staff',
    value: 8
  },
  {
    level: 'Management',
    value: 2
  }
];
```

## Chart Type Comparison

### Pie

Best suited for:

- Parts of a whole.
- Percentage distribution.
- A small number of categories.
- Direct category comparison.

Important properties:

- `radius`
- `startAngle`
- `endAngle`
- `explode`
- `explodeIndex`
- `pointColorMapping`

Required module:

```typescript
PieSeries
```

### Doughnut

Best suited for:

- Parts of a whole.
- Dashboard metrics.
- Charts requiring center content.
- Concentric-ring comparisons.

Important properties:

- `radius`
- `innerRadius`
- `centerLabel`
- `startAngle`
- `endAngle`

Required module:

```typescript
PieSeries
```

### Multiple Pie or Doughnut Series

Best suited for:

- Comparing related datasets.
- Current-versus-previous period comparisons.
- Concentric category distributions.
- Shared legend behavior across matching points.

Important properties:

- `series`
- `radius`
- `innerRadius`
- `name`
- `legendSettings.mappingKey`

Required modules:

```typescript
PieSeries
AccumulationLegend
```

Add `AccumulationTooltip` when tooltips are enabled.

### Funnel

Best suited for:

- Conversion processes.
- Sales pipelines.
- Progressive reduction.
- Stage-based workflows.

Important properties:

- `neckWidth`
- `neckHeight`
- `width`
- `height`
- `gapRatio`

Required module:

```typescript
FunnelSeries
```

### Pyramid

Best suited for:

- Hierarchical information.
- Organizational distributions.
- Population levels.
- Proportional layers.

Important properties:

- `pyramidMode`
- `width`
- `height`
- `gapRatio`

Required module:

```typescript
PyramidSeries
```

## Choosing a Chart Type

### Use Pie When

- The values represent parts of a whole.
- There are relatively few categories.
- Individual differences are large enough to identify.
- The total can be meaningfully interpreted.

Avoid Pie Charts when:

- There are many small categories.
- Values are very similar.
- Precise comparison is required.
- Values do not represent a meaningful whole.

### Use Doughnut When

- A Pie-style comparison is required.
- Center space is required for a label or KPI.
- A lighter visual appearance is preferred.
- Multiple concentric rings are required.

Avoid excessive `innerRadius` values because very thin rings can make slices difficult to compare.

### Use Multiple Pie or Doughnut Series When

- The same categories appear across multiple datasets.
- Current and previous periods must be compared.
- Concentric rings provide a meaningful relationship.
- Related points can be mapped through `mappingKey`.
- The number of rings and categories remains small.

Avoid multiple concentric series when:

- More than a few datasets must be compared.
- The rings become too thin.
- Data labels overlap.
- Related categories are inconsistent.
- Precise cross-ring comparison is required.

### Use Funnel When

- Data represents a sequence of stages.
- Values typically decrease between stages.
- Conversion or drop-off must be communicated.
- The stage order is meaningful.

### Use Pyramid When

- Data represents hierarchy or proportional levels.
- Layer ordering is meaningful.
- The values should be displayed in a triangular layout.
- A hierarchy is more important than precise category comparison.

## Complete TypeScript Example

The following example creates separate Pie, Doughnut, multiple Doughnut, Funnel, and Pyramid charts.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  FunnelSeries,
  PieSeries,
  PyramidSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  FunnelSeries,
  PyramidSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
);

interface CategoryData {
  category: string;
  value: number;
}

const productData: CategoryData[] = [
  {
    category: 'Product A',
    value: 40
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
    value: 10
  }
];

const previousProductData: CategoryData[] = [
  {
    category: 'Product A',
    value: 35
  },
  {
    category: 'Product B',
    value: 32
  },
  {
    category: 'Product C',
    value: 23
  },
  {
    category: 'Product D',
    value: 10
  }
];

const pipelineData: CategoryData[] = [
  {
    category: 'Leads',
    value: 1000
  },
  {
    category: 'Qualified',
    value: 500
  },
  {
    category: 'Proposal',
    value: 200
  },
  {
    category: 'Closed',
    value: 80
  }
];

const hierarchyData: CategoryData[] = [
  {
    category: 'Management',
    value: 5
  },
  {
    category: 'Senior Staff',
    value: 15
  },
  {
    category: 'Mid-Level',
    value: 30
  },
  {
    category: 'Junior Staff',
    value: 50
  }
];

const pieChart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Distribution',
    legendSettings: {
      visible: true,
      position: 'Right'
    },
    tooltip: {
      enable: true,
      format:
        '${point.x}: ${point.y:n2}'
    },
    series: [
      {
        dataSource: productData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        radius: '85%',
        name: 'Products',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'category'
        }
      }
    ]
  });

pieChart.appendTo('#pie-chart');

const doughnutChart: AccumulationChart =
  new AccumulationChart({
    title: 'Product Revenue',
    centerLabel: {
      text: 'Revenue',
      hoverTextFormat:
        '${point.x}: ${point.y}'
    },
    legendSettings: {
      visible: true,
      position: 'Bottom'
    },
    tooltip: {
      enable: true,
      format:
        '${point.x}: ${point.y:n2}'
    },
    series: [
      {
        dataSource: productData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        radius: '90%',
        innerRadius: '55%',
        name: 'Revenue'
      }
    ]
  });

doughnutChart.appendTo('#doughnut-chart');

const multipleDoughnutChart: AccumulationChart =
  new AccumulationChart({
    title: 'Current and Previous Product Distribution',
    legendSettings: {
      visible: true,
      position: 'Right',
      mappingKey: 'category'
    },
    tooltip: {
      enable: true,
      format:
        '<b>${series.name}</b><br>' +
        '${point.x}: ${point.y:n2}'
    },
    series: [
      {
        dataSource: productData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Current',
        radius: '100%',
        innerRadius: '76%'
      },
      {
        dataSource: previousProductData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Previous',
        radius: '68%',
        innerRadius: '42%'
      }
    ]
  });

multipleDoughnutChart.appendTo(
  '#multiple-doughnut-chart'
);

const funnelChart: AccumulationChart =
  new AccumulationChart({
    title: 'Sales Pipeline',
    tooltip: {
      enable: true,
      format:
        '${point.x}: ${point.y:n0}'
    },
    series: [
      {
        dataSource: pipelineData,
        xName: 'category',
        yName: 'value',
        type: 'Funnel',
        name: 'Pipeline',
        neckWidth: '20%',
        neckHeight: '20%',
        gapRatio: 0.08,
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'category'
        }
      }
    ]
  });

funnelChart.appendTo('#funnel-chart');

const pyramidChart: AccumulationChart =
  new AccumulationChart({
    title: 'Organization Distribution',
    tooltip: {
      enable: true,
      format:
        '${point.x}: ${point.y:n0}'
    },
    series: [
      {
        dataSource: hierarchyData,
        xName: 'category',
        yName: 'value',
        type: 'Pyramid',
        name: 'Employees',
        pyramidMode: 'Linear',
        gapRatio: 0.05,
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'category'
        }
      }
    ]
  });

pyramidChart.appendTo('#pyramid-chart');

window.addEventListener('beforeunload', () => {
  pieChart.destroy();
  doughnutChart.destroy();
  multipleDoughnutChart.destroy();
  funnelChart.destroy();
  pyramidChart.destroy();
});
```

**HTML:**

```html
<div id="pie-chart"></div>
<div id="doughnut-chart"></div>
<div id="multiple-doughnut-chart"></div>
<div id="funnel-chart"></div>
<div id="pyramid-chart"></div>
```

**CSS:**

```css
#pie-chart,
#doughnut-chart,
#multiple-doughnut-chart,
#funnel-chart,
#pyramid-chart {
  width: 100%;
  min-height: 420px;
}
```

## Complete JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.FunnelSeries,
  ej.charts.PyramidSeries,
  ej.charts.AccumulationDataLabel,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationTooltip
);

var currentData = [
  {
    category: 'Mobile',
    value: 45
  },
  {
    category: 'Desktop',
    value: 35
  },
  {
    category: 'Tablet',
    value: 20
  }
];

var previousData = [
  {
    category: 'Mobile',
    value: 38
  },
  {
    category: 'Desktop',
    value: 42
  },
  {
    category: 'Tablet',
    value: 20
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Device Usage Comparison',
    legendSettings: {
      visible: true,
      position: 'Right',
      mappingKey: 'category'
    },
    tooltip: {
      enable: true,
      format:
        '<b>${series.name}</b><br>' +
        '${point.x}: ${point.y:n2}%'
    },
    series: [
      {
        dataSource: currentData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Current Year',
        radius: '100%',
        innerRadius: '75%'
      },
      {
        dataSource: previousData,
        xName: 'category',
        yName: 'value',
        type: 'Pie',
        name: 'Previous Year',
        radius: '67%',
        innerRadius: '40%'
      }
    ]
  });

chart.appendTo('#chart');
```

## Troubleshooting

### Pie Chart Is Not Displayed

- Import and inject `PieSeries`.
- Set the series `type` to `Pie`.
- Ensure that `dataSource` contains valid records.
- Ensure that `xName` matches the category field.
- Ensure that `yName` matches a numeric field.
- Ensure that the chart container has a valid height.

### Doughnut Chart Is Not Displayed

- Import and inject `PieSeries`.
- Set the series `type` to `Pie`.
- Set `innerRadius` to a percentage greater than `0%`.
- Do not import or inject `DoughnutSeries`.
- Ensure that `innerRadius` is smaller than `radius`.

### Multiple Pie Series Are Not Displayed Correctly

- Import and inject `PieSeries`.
- Ensure that each series has a valid data source.
- Configure a distinct `radius` for each series.
- Configure `innerRadius` values that prevent unintended overlap.
- Ensure that the chart container is large enough.
- Reduce the number of rings when individual rings become too thin.
- Ensure that every series has a meaningful `name`.
- Use `${series.name}` in tooltips to distinguish rings.

### mappingKey Is Not Working

- Import and inject `AccumulationLegend`.
- Set `legendSettings.visible` to `true`.
- Configure `mappingKey` inside `legendSettings`.
- Set `mappingKey` to an actual data-source field name.
- Ensure that the mapping field exists in every related point.
- Ensure that corresponding points have identical key values.
- Ensure that key value types are consistent.
- Ensure that category keys are unique within each series.
- Do not use `mappingKey: 'x'` when the actual field is named differently.
- The point order may differ because association is based on key values.

### Funnel Chart Is Not Displayed

- Import and inject `FunnelSeries`.
- Set the series `type` to `Funnel`.
- Ensure that `xName` and `yName` map to valid fields.
- Ensure that the `yName` field contains numeric values.
- Keep `gapRatio` between `0` and `1`.
- Use valid percentage values for `neckWidth` and `neckHeight`.

### Pyramid Chart Is Not Displayed

- Import and inject `PyramidSeries`.
- Set the series `type` to `Pyramid`.
- Ensure that the data source contains valid values.
- Use `Linear` or `Surface` for `pyramidMode`.
- Do not use an unsupported `Volume` mode.
- Keep `gapRatio` between `0` and `1`.

### Center Label Is Not Visible

- Use a Pie series with a nonzero `innerRadius`.
- Increase the `innerRadius` to provide sufficient center space.
- Set `centerLabel.text`.
- Ensure that the chart container is large enough.
- Keep the center-label text concise.

### Data Labels Overlap

- Inject `AccumulationDataLabel`.
- Enable smart labels when appropriate.
- Use `position: 'Outside'`.
- Increase the chart dimensions.
- Shorten the data-label text.
- Hide data labels for inner rings when multiple series are displayed.
- Reduce the number of categories or rings.