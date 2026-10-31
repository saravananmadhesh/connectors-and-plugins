# Value Bar & Comparative Bar Configuration

## Table of Contents

- [Value Bar & Comparative Bar Configuration](#value-bar--comparative-bar-configuration)
  - [Overview](#overview)
  - [Value Bar](#value-bar)
    - [Default Value Bar](#default-value-bar)
    - [Value Bar Shapes](#value-bar-shapes)
      - [Rectangle](#rectangle)
      - [Dot](#dot)
    - [Value Bar Color](#value-bar-color)
    - [Data-Driven Value Bar Color](#data-driven-value-bar-color)
    - [Value Bar Height](#value-bar-height)
    - [Value Bar Border](#value-bar-border)
  - [Comparative Bar](#comparative-bar)
    - [Default Comparative Bar](#default-comparative-bar)
    - [Comparative Bar Shapes](#comparative-bar-shapes)
      - [Rectangle Target](#rectangle-target)
      - [Cross Target](#cross-target)
      - [Circle Target](#circle-target)
    - [Comparative Bar Color](#comparative-bar-color)
    - [Data-Driven Comparative Bar Color](#data-driven-comparative-bar-color)
    - [Comparative Bar Width](#comparative-bar-width)
  - [Multiple Measures and Targets](#multiple-measures-and-targets)
    - [Multiple Measures](#multiple-measures)
    - [Multiple Targets](#multiple-targets)
    - [Orientation](#orientation)
      - [Horizontal Orientation](#horizontal-orientation)
      - [Vertical Orientation](#vertical-orientation)
  - [Styling Patterns](#styling-patterns)
    - [Performance-Based Coloring](#performance-based-coloring)
    - [Accessible Performance Styling](#accessible-performance-styling)


## Overview

The Bullet Chart uses two primary visual elements:

- **Value Bar:** Displays the actual or current value. It is also called the feature measure or actual bar.
- **Comparative Bar:** Displays the target or comparative value. It is also called the target marker.

The actual value is mapped through `valueField`, while the target value is mapped through `targetField`.

The value bar supports `Rect` and `Dot` shapes and can be customized through `valueFill`, `valueHeight`, and `valueBorder`.

The comparative bar supports `Circle`, `Cross`, and `Rect` shapes through `targetTypes`. Its appearance can be customized through `targetColor` and `targetWidth`.

## Value Bar

The value bar represents the actual value being measured.

### Default Value Bar

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';

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
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

In this example:

- `value: 55` controls the length of the value bar.
- `target: 75` controls the comparative marker position.
- `category` provides the label for the measure.
- `minimum`, `maximum`, and `interval` define the scale.

### Value Bar Shapes

Use the Bullet Chart `type` property to configure the value-bar shape.

Supported value-bar shapes include:

- `Rect`
- `Dot`

The default value is `Rect`.

#### Rectangle

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    type: 'Rect',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

#### Dot

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    type: 'Dot',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use `Dot` when the application needs to emphasize the actual position rather than the complete area from the scale origin.

### Value Bar Color

Use `valueFill` to configure a common color for all value bars.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueFill: '#FF6B35',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

`valueFill` accepts a valid CSS color value.

Examples include:

```typescript
valueFill: '#0F6CBD'
```

```typescript
valueFill: 'rgb(15, 108, 189)'
```

```typescript
valueFill: 'rgba(15, 108, 189, 0.8)'
```

Do not communicate performance status through value-bar color alone. Supplement color with category text, data labels, tooltips, qualitative range descriptions, or a semantic data table.

### Data-Driven Value Bar Color

The `valueFill` property can also map a color field from the data source.

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
    color: '#107C10'
  },
  {
    value: 78,
    target: 90,
    category: 'Team B',
    color: '#C19C00'
  },
  {
    value: 58,
    target: 90,
    category: 'Team C',
    color: '#D13438'
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

In this configuration:

```typescript
valueFill: 'color'
```

maps each value bar to the `color` field in its corresponding data object.

Every mapped color value must be a valid CSS color.

### Value Bar Height

Use `valueHeight` to configure the thickness of the value bar.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueHeight: 15,
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The value is measured in pixels.

The Bullet Chart uses `valueHeight`, not `valueBarSize`.

Incorrect:

```typescript
valueBarSize: 0.5
```

Correct:

```typescript
valueHeight: 15
```

Use a value that leaves enough space for category labels, target markers, and multiple measures.

### Value Bar Border

Use the `valueBorder` object to configure the value-bar border.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueFill: '#3498DB',
    valueBorder: {
      color: '#1F618D',
      width: 2
    },
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The documented value-bar border configuration uses:

- `valueBorder.color`
- `valueBorder.width`

Do not use unsupported properties such as:

```typescript
valueBorderColor
```

```typescript
valueBorderWidth
```

```typescript
valueBorderRadius
```

The standard Bullet Chart value-bar API does not provide a documented `valueBorderRadius` property.

## Comparative Bar

The comparative bar displays the target value to which the actual value is compared.

Depending on its configured shape, the comparative measure can appear as a rectangle, cross, or circle.

### Default Comparative Bar

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
    category: 'Sales Performance'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The configured target value must be included in the scale range to remain visible.

### Comparative Bar Shapes

Use the `targetTypes` collection to configure comparative-marker shapes.

Supported target types include:

- `Rect`
- `Cross`
- `Circle`

The default target-marker shape is `Rect`.

#### Rectangle Target

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    targetTypes: [
      'Rect'
    ],
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

#### Cross Target

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    targetTypes: [
      'Cross'
    ],
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

#### Circle Target

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    targetTypes: [
      'Circle'
    ],
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Do not use:

```typescript
targetType: 'Line'
```

or:

```typescript
targetType: 'Bar'
```

Use the plural `targetTypes` collection with supported target shapes:

```typescript
targetTypes: [
  'Rect'
]
```

### Comparative Bar Color

Use `targetColor` to configure the comparative marker color.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    targetTypes: [
      'Rect'
    ],
    targetColor: '#2E86AB',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

`targetColor` accepts a valid CSS color string and can also be mapped from the data source.

Ensure that the target marker remains visible against:

- The value bar.
- Qualitative ranges.
- The Chart background.
- Adjacent category labels.

### Data-Driven Comparative Bar Color

Map `targetColor` to a data-source field when each target marker requires a different color.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  targetMarkerColor: string;
}

const chartData: PerformanceData[] = [
  {
    value: 92,
    target: 90,
    category: 'Team A',
    targetMarkerColor: '#005A9C'
  },
  {
    value: 78,
    target: 85,
    category: 'Team B',
    targetMarkerColor: '#7A3E9D'
  },
  {
    value: 58,
    target: 75,
    category: 'Team C',
    targetMarkerColor: '#A23E00'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    targetColor:
      'targetMarkerColor',
    targetTypes: [
      'Rect'
    ],
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Every mapped value must be a valid CSS color.

### Comparative Bar Width

Use `targetWidth` to configure the target-marker width.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    targetTypes: [
      'Rect'
    ],
    targetColor: '#2E86AB',
    targetWidth: 6,
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The comparative-bar model exposes `targetWidth` for target-marker sizing.

Do not use unsupported properties such as:

```typescript
targetBarSize
```

```typescript
targetLineWidth
```

Use:

```typescript
targetWidth: 6
```

## Multiple Measures and Targets

### Multiple Measures

Provide multiple records in `dataSource` and map their labels through `categoryField`.

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
    value: 38,
    target: 60,
    category: 'Growth'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    height: '360px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Every record produces its own measure.

A field such as `previous` is ignored unless it is explicitly mapped through a supported Bullet Chart property.

Incorrect assumption:

```typescript
{
  value: 55,
  target: 75,
  previous: 45
}
```

The presence of `previous` does not automatically create an additional value bar.

To compare a previous value, use:

- Another Bullet Chart.
- Another data row with a clear category.
- Another supported target value.
- A separate visualization designed for grouped comparisons.

### Multiple Targets

A Bullet Chart can display more than one target for a measure by mapping a target collection through `targetField`.

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

The order of values in the mapped target array corresponds to the order of shapes in `targetTypes`.

Ensure that:

- Every target value is numeric.
- Every target value falls within the visible scale.
- The number and order of target shapes are intentional.
- Multiple markers remain visually distinguishable.

### Orientation

Use `orientation` to render the Bullet Chart horizontally or vertically.

Supported values include:

- `Horizontal`
- `Vertical`

The default orientation is `Horizontal`.

#### Horizontal Orientation

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

#### Vertical Orientation

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Vertical',
    minimum: 0,
    maximum: 100,
    interval: 20,
    height: '500px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Vertical orientation changes the direction of every measure. It does not mean that multiple categories are stacked vertically in the same way as a stacked Cartesian Chart.

## Styling Patterns

### Performance-Based Coloring

Calculate a color before binding the data and map it through `valueFill`.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  color: string;
}

function getPerformanceColor(
  actual: number,
  target: number
): string {
  if (
    !Number.isFinite(actual) ||
    !Number.isFinite(target) ||
    target <= 0
  ) {
    return '#808080';
  }

  const percentage: number =
    actual / target * 100;

  if (percentage >= 90) {
    return '#107C10';
  }

  if (percentage >= 75) {
    return '#C19C00';
  }

  return '#D13438';
}

const sourceData = [
  {
    value: 55,
    target: 75,
    category: 'Sales'
  },
  {
    value: 84,
    target: 90,
    category: 'Profit'
  },
  {
    value: 42,
    target: 70,
    category: 'Growth'
  }
];

const chartData:
  PerformanceData[] =
  sourceData.map(
    (item): PerformanceData => ({
      ...item,
      color:
        getPerformanceColor(
          item.value,
          item.target
        )
    })
  );

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

This approach uses the documented data-source color mapping supported by `valueFill`.

Do not rely on an unverified Bullet Chart `pointRender` event to configure value-bar colors.

### Accessible Performance Styling

Do not rely on green, orange, and red alone.

Include a textual status in the data and provide it through a table, tooltip, label, or nearby description.

```typescript
interface AccessiblePerformanceData {
  value: number;
  target: number;
  category: string;
  status: string;
  color: string;
}

const chartData:
  AccessiblePerformanceData[] = [
    {
      value: 92,
      target: 90,
      category: 'Team A',
      status: 'Target achieved',
      color: '#107C10'
    },
    {
      value: 78,
      target: 90,
      category: 'Team B',
      status: 'Near target',
      color: '#C19C00'
    },
    {
      value: 58,
      target: 90,
      category: 'Team C',
      status: 'Below target',
      color: '#D13438'
    }
  ];
```

Provide a semantic table:

```html
<table>
  <caption>
    Team performance values and target status
  </caption>

  <thead>
    <tr>
      <th scope="col">Team</th>
      <th scope="col">Actual</th>
      <th scope="col">Target</th>
      <th scope="col">Status</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">Team A</th>
      <td>92</td>
      <td>90</td>
      <td>Target achieved</td>
    </tr>
    <tr>
      <th scope="row">Team B</th>
      <td>78</td>
      <td>90</td>
      <td>Near target</td>
    </tr>
    <tr>
      <th scope="row">Team C</th>
      <td>58</td>
      <td>90</td>
      <td>Below target</td>
    </tr>
  </tbody>
</table>
```

## Dynamic Updates

Replace `dataSource` and call `refresh()`.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const updatedData:
  PerformanceData[] = [
    {
      value: 72,
      target: 85,
      category: 'Quarter 2 Performance'
    }
  ];

bulletChart.dataSource =
  updatedData;

bulletChart.refresh();
```

Update value-bar styling with the data:

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  color: string;
}

const updatedData:
  PerformanceData[] = [
    {
      value: 72,
      target: 85,
      category: 'Quarter 2 Performance',
      color:
        getPerformanceColor(
          72,
          85
        )
    }
  ];

bulletChart.dataSource =
  updatedData;

bulletChart.valueFill =
  'color';

bulletChart.refresh();
```

Apply all related changes before calling `refresh()`.

Do not attach a second Bullet Chart instance to the same host when updating an existing instance.

## Complete TypeScript Example

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
  targets: number[];
  category: string;
  valueColor: string;
}

function getPerformanceColor(
  actual: number,
  primaryTarget: number
): string {
  if (
    !Number.isFinite(actual) ||
    !Number.isFinite(
      primaryTarget
    ) ||
    primaryTarget <= 0
  ) {
    return '#808080';
  }

  const percentage: number =
    actual / primaryTarget * 100;

  if (percentage >= 90) {
    return '#107C10';
  }

  if (percentage >= 75) {
    return '#C19C00';
  }

  return '#D13438';
}

const sourceData = [
  {
    value: 92,
    targets: [
      80,
      90
    ],
    category: 'Team A'
  },
  {
    value: 78,
    targets: [
      75,
      90
    ],
    category: 'Team B'
  },
  {
    value: 58,
    targets: [
      65,
      85
    ],
    category: 'Team C'
  }
];

const chartData:
  PerformanceData[] =
  sourceData.map(
    (item): PerformanceData => ({
      ...item,
      valueColor:
        getPerformanceColor(
          item.value,
          item.targets[1]
        )
    })
  );

const bulletChart: BulletChart =
  new BulletChart({
    title: 'Team Performance',
    subtitle:
      'Actual values compared with minimum and primary targets',
    dataSource: chartData,
    valueField: 'value',
    targetField: 'targets',
    categoryField: 'category',
    valueFill: 'valueColor',
    valueHeight: 16,
    valueBorder: {
      color: '#FFFFFF',
      width: 1
    },
    targetTypes: [
      'Circle',
      'Rect'
    ],
    targetColor: '#242424',
    targetWidth: 6,
    type: 'Rect',
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    width: '100%',
    height: '400px',
    ranges: [
      {
        end: 60,
        color:
          'rgba(209, 52, 56, 0.12)'
      },
      {
        end: 80,
        color:
          'rgba(193, 156, 0, 0.12)'
      },
      {
        end: 100,
        color:
          'rgba(16, 124, 16, 0.12)'
      }
    ],
    tooltip: {
      enable: true
    },
    animation: {
      enable: true,
      duration: 600,
      delay: 0
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

**HTML:**

```html
<section
  aria-labelledby="performance-heading"
>
  <h1 id="performance-heading">
    Team Performance
  </h1>

  <p id="performance-summary">
    Each value bar shows actual performance. The circle
    indicates the minimum target and the rectangle indicates
    the primary target.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary performance-table-caption"
  ></div>

  <table>
    <caption id="performance-table-caption">
      Team performance values and targets
    </caption>

    <thead>
      <tr>
        <th scope="col">Team</th>
        <th scope="col">Actual</th>
        <th scope="col">Minimum target</th>
        <th scope="col">Primary target</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">Team A</th>
        <td>92%</td>
        <td>80%</td>
        <td>90%</td>
      </tr>
      <tr>
        <th scope="row">Team B</th>
        <td>78%</td>
        <td>75%</td>
        <td>90%</td>
      </tr>
      <tr>
        <th scope="row">Team C</th>
        <td>58%</td>
        <td>65%</td>
        <td>85%</td>
      </tr>
    </tbody>
  </table>
</section>
```

**CSS:**

```css
#bullet-chart {
  width: 100%;
  min-height: 400px;
}

table {
  width: 100%;
  margin-top: 16px;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #808080;
  text-align: left;
}
```

## Complete JavaScript Example

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
    Bullet Chart Value and Target Bars
  </title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #bullet-chart {
      width: 100%;
      min-height: 400px;
    }

    table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 8px;
      border: 1px solid #808080;
      text-align: left;
    }
  </style>
</head>

<body>
  <section
    aria-labelledby="performance-heading"
  >
    <h1 id="performance-heading">
      Team Performance
    </h1>

    <p id="performance-summary">
      Each value bar shows actual performance. The circle
      indicates the minimum target and the rectangle indicates
      the primary target.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="performance-summary performance-table-caption"
    ></div>

    <table>
      <caption id="performance-table-caption">
        Team performance values and targets
      </caption>

      <thead>
        <tr>
          <th scope="col">Team</th>
          <th scope="col">Actual</th>
          <th scope="col">Minimum target</th>
          <th scope="col">Primary target</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">Team A</th>
          <td>92%</td>
          <td>80%</td>
          <td>90%</td>
        </tr>
        <tr>
          <th scope="row">Team B</th>
          <td>78%</td>
          <td>75%</td>
          <td>90%</td>
        </tr>
        <tr>
          <th scope="row">Team C</th>
          <td>58%</td>
          <td>65%</td>
          <td>85%</td>
        </tr>
      </tbody>
    </table>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    function getPerformanceColor(
      actual,
      primaryTarget
    ) {
      if (
        !Number.isFinite(actual) ||
        !Number.isFinite(
          primaryTarget
        ) ||
        primaryTarget <= 0
      ) {
        return '#808080';
      }

      var percentage =
        actual /
        primaryTarget *
        100;

      if (percentage >= 90) {
        return '#107C10';
      }

      if (percentage >= 75) {
        return '#C19C00';
      }

      return '#D13438';
    }

    var sourceData = [
      {
        value: 92,
        targets: [
          80,
          90
        ],
        category: 'Team A'
      },
      {
        value: 78,
        targets: [
          75,
          90
        ],
        category: 'Team B'
      },
      {
        value: 58,
        targets: [
          65,
          85
        ],
        category: 'Team C'
      }
    ];

    var chartData =
      sourceData.map(
        function (item) {
          return {
            value: item.value,
            targets:
              item.targets,
            category:
              item.category,
            valueColor:
              getPerformanceColor(
                item.value,
                item.targets[1]
              )
          };
        }
      );

    var bulletChart =
      new ej.charts.BulletChart({
        title:
          'Team Performance',
        subtitle:
          'Actual values compared with minimum and primary targets',
        dataSource:
          chartData,
        valueField:
          'value',
        targetField:
          'targets',
        categoryField:
          'category',
        valueFill:
          'valueColor',
        valueHeight:
          16,
        valueBorder: {
          color:
            '#FFFFFF',
          width:
            1
        },
        targetTypes: [
          'Circle',
          'Rect'
        ],
        targetColor:
          '#242424',
        targetWidth:
          6,
        type:
          'Rect',
        orientation:
          'Horizontal',
        minimum:
          0,
        maximum:
          100,
        interval:
          20,
        labelFormat:
          '{value}%',
        width:
          '100%',
        height:
          '400px',
        ranges: [
          {
            end: 60,
            color:
              'rgba(209, 52, 56, 0.12)'
          },
          {
            end: 80,
            color:
              'rgba(193, 156, 0, 0.12)'
          },
          {
            end: 100,
            color:
              'rgba(16, 124, 16, 0.12)'
          }
        ],
        tooltip: {
          enable:
            true
        },
        animation: {
          enable:
            true,
          duration:
            600,
          delay:
            0
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

## Best Practices

1. **Map fields explicitly:** Use `valueField`, `targetField`, and `categoryField` with valid data-source fields.
2. **Use numeric data:** Ensure that actual and target values are finite numbers.
3. **Configure a valid scale:** Ensure that actual and target values fall between `minimum` and `maximum`.
4. **Use qualitative ranges carefully:** Keep range boundaries ordered and make the final range include the maximum.
5. **Use correct value-bar properties:** Use `valueFill`, `valueHeight`, `valueBorder`, and `type`.
6. **Use correct target properties:** Use `targetTypes`, `targetColor`, and `targetWidth`.
7. **Use data-driven colors:** Map `valueFill` or `targetColor` to data-source fields when different measures require different colors.
8. **Do not rely on color alone:** Add category labels, target descriptions, data labels, tooltips, or a semantic table.
9. **Keep the target visible:** Ensure sufficient contrast between the target marker, value bar, qualitative range, and background.
10. **Use compatible target shapes:** Use `Rect`, `Cross`, or `Circle`.
11. **Use accessible text:** Explain the meaning of multiple target shapes near the Bullet Chart.
12. **Use a stable container:** Give the host a resolved width and height.
13. **Update efficiently:** Apply all data and styling changes before calling `refresh()`.
14. **Clean up:** Call `destroy()` when the Bullet Chart is permanently removed.

## Troubleshooting

### Value Bar Is Not Displayed

- Ensure that `dataSource` contains records.
- Ensure that `valueField` matches a field in the data.
- Ensure that the mapped value is numeric.
- Ensure that the value is within the visible scale.
- Ensure that `valueHeight` is greater than zero.
- Ensure that `valueFill` resolves to a valid CSS color.
- Check whether the host has a resolved size.

### Comparative Bar Is Not Displayed

- Ensure that `targetField` matches a data-source field.
- Ensure that the mapped target value is numeric.
- Ensure that the target falls within the visible scale.
- Use `targetTypes`, not `targetType`.
- Use `Rect`, `Cross`, or `Circle`.
- Ensure that `targetWidth` is greater than zero.
- Ensure that the target color contrasts with the value bar and ranges.

### Data-Driven Value Color Is Not Applied

- Add a color field to each data object.
- Set `valueFill` to the field name.
- Ensure that every mapped value is a valid CSS color.
- Do not pass the field name as a hexadecimal color.
- Ensure that no later property assignment overrides `valueFill`.

### Data-Driven Target Color Is Not Applied

- Add a target-color field to each data object.
- Set `targetColor` to the mapped field name.
- Ensure that mapped target colors are valid CSS colors.
- Ensure that every relevant record contains the mapped field.

### Multiple Targets Are Not Displayed Correctly

- Map an array through `targetField`.
- Provide a compatible `targetTypes` collection.
- Ensure that the target values are numeric.
- Ensure that target values fall within the scale.
- Ensure that marker shapes remain distinguishable.
- Verify the relationship between target-array order and target-type order.

### Value-Bar Thickness Is Not Applied

- Use `valueHeight`.
- Do not use `valueBarSize`.
- Provide a positive pixel value.
- Ensure that sufficient row height is available.

### Target Width Is Not Applied

- Use `targetWidth`.
- Do not use `targetBarSize`.
- Do not use `targetLineWidth`.
- Provide a positive numeric value.
- Use a supported target shape.

### Rounded Corners Are Not Applied

The standard Bullet Chart value-bar API does not expose a documented `valueBorderRadius` property.

Use the supported properties:

```typescript
valueFill
```

```typescript
valueHeight
```

```typescript
valueBorder
```

Do not depend on undocumented DOM manipulation because generated element structure can change between versions.

### Conditional pointRender Styling Does Not Work

Use documented value-color mapping:

```typescript
valueFill: 'color'
```

Prepare the color field before binding the data.

Do not rely on an unverified Bullet Chart `pointRender` event.

### Gradient Is Not Applied

The standard Bullet Chart value-bar configuration does not expose the regular Cartesian Chart `linearGradient` or `radialGradient` properties.

Use:

- A solid `valueFill`.
- Data-driven colors.
- Qualitative range colors.

Do not rely on manually inserted SVG gradient IDs unless the implementation has been explicitly validated against the installed version.

## Related Topics

- See `references/ranges-and-qualitative-scale.md` for qualitative range backgrounds.
- See `references/axis-customization.md` for scale, labels, ticks, and orientation.
- See `references/data-binding-and-labels.md` for field mapping and data labels.
- See `references/title-tooltip-and-interactivity.md` for titles and tooltips.
- See `references/customization-dimensions-and-export.md` for size, themes, export, and printing.