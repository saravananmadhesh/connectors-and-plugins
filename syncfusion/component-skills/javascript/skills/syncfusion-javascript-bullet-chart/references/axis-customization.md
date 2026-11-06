# Axis Customization

## Table of Contents

- [Axis Customization](#axis-customization)
  - [Overview](#overview)
  - [Axis Scale Configuration](#axis-scale-configuration)
    - [Basic Scale](#basic-scale)
    - [Automatic and Explicit Values](#automatic-and-explicit-values)
    - [Percentage Scale](#percentage-scale)
    - [Currency Scale](#currency-scale)
    - [Decimal Scale](#decimal-scale)
    - [Negative-Value Scale](#negative-value-scale)
    - [Linear Scale Only](#linear-scale-only)
  - [Tick-Line Customization](#tick-line-customization)
    - [Major Tick Lines](#major-tick-lines)
    - [Minor Tick Lines](#minor-tick-lines)
    - [Minor Ticks per Interval](#minor-ticks-per-interval)
    - [Range-Colored Ticks](#range-colored-ticks)
    - [Hide Tick Lines](#hide-tick-lines)
  - [Tick Placement](#tick-placement)
    - [Outside Ticks](#outside-ticks)
    - [Inside Ticks](#inside-ticks)
  - [Numeric Label Formatting](#numeric-label-formatting)
    - [Custom Prefix and Suffix](#custom-prefix-and-suffix)
    - [Globalized Number Formats](#globalized-number-formats)
    - [Abbreviated Values](#abbreviated-values)
    - [Group Separators](#group-separators)
  - [Numeric Label Styling](#numeric-label-styling)
  - [Numeric Label Placement](#numeric-label-placement)
    - [Outside Labels](#outside-labels)
    - [Inside Labels](#inside-labels)
  - [Category Labels](#category-labels)
    - [Display Category Labels](#display-category-labels)
    - [Category Label Styling](#category-label-styling)
    - [Long Category Labels](#long-category-labels)
    - [Localized Category Labels](#localized-category-labels)
  - [Opposed Position](#opposed-position)
    - [Standard Position](#standard-position)
    - [Opposed Position by Orientation](#opposed-position-by-orientation)
  - [Orientation and Axis Direction](#orientation-and-axis-direction)
  - [Unsupported Axis Configurations](#unsupported-axis-configurations)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Best Practices](#best-practices)
  - [Troubleshooting](#troubleshooting)
    - [Axis Labels Are Not Displayed](#axis-labels-are-not-displayed)
    - [Tick Lines Are Not Displayed](#tick-lines-are-not-displayed)
    - [Minor Ticks Are Not Displayed](#minor-ticks-are-not-displayed)
    - [Dashed Ticks Are Not Displayed](#dashed-ticks-are-not-displayed)
    - [Label Format Is Incorrect](#label-format-is-incorrect)
    - [Category Labels Are Missing](#category-labels-are-missing)
    - [Category Label Position Is Not Applied](#category-label-position-is-not-applied)
    - [Axis Label Event Is Not Working](#axis-label-event-is-not-working)
    - [Opposed Position Appears on an Unexpected Side](#opposed-position-appears-on-an-unexpected-side)
    - [Logarithmic Scale Is Not Working](#logarithmic-scale-is-not-working)
    - [Range Padding Is Not Applied](#range-padding-is-not-applied)
    - [Axis Line Style Is Not Applied](#axis-line-style-is-not-applied)
  - [Related Topics](#related-topics)


## Overview

The Bullet Chart axis displays the quantitative scale used to position actual values, targets, qualitative ranges, ticks, and numeric labels.

The main scale properties are:

- `minimum`: Defines the beginning of the quantitative scale.
- `maximum`: Defines the end of the quantitative scale.
- `interval`: Defines the distance between major ticks and numeric labels.
- `majorTickLines`: Configures major ticks.
- `minorTickLines`: Configures minor ticks.
- `minorTicksPerInterval`: Configures the number of minor ticks between major intervals.
- `tickPosition`: Places major and minor ticks inside or outside the qualitative ranges.
- `labelFormat`: Formats numeric scale labels.
- `labelStyle`: Styles numeric scale labels.
- `labelPosition`: Places numeric labels inside or outside the qualitative ranges.
- `categoryLabelStyle`: Styles category labels.
- `opposedPosition`: Moves the axis to its opposite side.
- `orientation`: Controls whether the quantitative scale is horizontal or vertical.

Major and minor ticks support `width`, `height`, `color`, and `useRangeColor`. Tick placement is controlled through `tickPosition`, while numeric label placement is controlled through `labelPosition`.

## Axis Scale Configuration

### Basic Scale

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
    category: 'Sales'
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

This configuration displays major scale values at:

```text
0, 20, 40, 60, 80, 100
```

Ensure that:

- `minimum` is less than `maximum`.
- `interval` is greater than zero.
- Actual values fall within the visible scale.
- Target values fall within the visible scale.
- Qualitative range endings correspond to the scale.

### Automatic and Explicit Values

For predictable Bullet Chart output, explicitly configure:

```typescript
minimum
maximum
interval
```

Example:

```typescript
minimum: 0,
maximum: 100,
interval: 20
```

Do not assign an unsupported string such as:

```typescript
interval: 'auto'
```

When business thresholds are known, explicit values make the scale easier to compare across related Bullet Charts.

### Percentage Scale

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 85,
        target: 90,
        category: 'Completion'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 10,
    labelFormat: '{value}%'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Currency Scale

Use a globalized currency format:

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 1500,
        target: 1300,
        category: 'Revenue'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 2500,
    interval: 250,
    labelFormat: 'c'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Bullet Chart numeric axis labels support Globalize number formats through `labelFormat`.

A custom currency prefix can also be used:

```typescript
labelFormat: '₹{value}'
```

### Decimal Scale

Use a supported number format such as `n2`.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 7.45,
        target: 8.25,
        category: 'Quality Score'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 10,
    interval: 2,
    labelFormat: 'n2'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Common numeric formats include:

- `n0`: No decimal places.
- `n1`: One decimal place.
- `n2`: Two decimal places.
- `n3`: Three decimal places.
- `c`: Currency formatting.
- `p`: Percentage formatting using Globalize semantics.

Globalized number formats such as `n1`, `n2`, and `n3` control decimal precision.

Do not use an unsupported Python-style format:

```typescript
labelFormat: '{value:.2f}'
```

Use:

```typescript
labelFormat: 'n2'
```

### Negative-Value Scale

Configure a scale that includes negative values when the metric supports them.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: -5,
        target: 10,
        category: 'Variance'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: -20,
    maximum: 40,
    interval: 10,
    labelFormat: '{value}%'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Ensure that qualitative ranges also cover the negative portion of the scale when ranges are configured.

### Linear Scale Only

The standard Bullet Chart quantitative axis is linear.

The following configuration:

```typescript
minimum: 1,
maximum: 1000,
interval: 100
```

creates a linear scale with equal intervals of `100`. It does not create a logarithmic scale.

Do not describe it as logarithmic.

The Bullet Chart does not expose the regular Cartesian Chart `valueType: 'Logarithmic'` axis configuration.

For logarithmic analysis, use an EJ2 Cartesian `Chart` with a Logarithmic axis.

## Tick-Line Customization

### Major Tick Lines

Major ticks appear at each configured interval.

Use:

- `height` for tick length.
- `width` for tick thickness.
- `color` for tick color.
- `useRangeColor` to use the corresponding qualitative range color.

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
    majorTickLines: {
      height: 15,
      width: 2,
      color: '#242424',
      useRangeColor: false
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The documented tick-line length property is `height`, not `size`.

Incorrect:

```typescript
majorTickLines: {
  size: 15
}
```

Correct:

```typescript
majorTickLines: {
  height: 15
}
```

The Bullet Chart tick-line model does not expose a documented `dashArray` property.

### Minor Tick Lines

Minor ticks appear between major intervals.

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
    majorTickLines: {
      height: 15,
      width: 2,
      color: '#242424'
    },
    minorTickLines: {
      height: 8,
      width: 1,
      color: '#808080'
    },
    minorTicksPerInterval: 4
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The same supported appearance properties apply to major and minor ticks:

- `height`
- `width`
- `color`
- `useRangeColor` 

### Minor Ticks per Interval

Use `minorTicksPerInterval` to specify how many minor ticks appear between major intervals.

```typescript
minorTicksPerInterval: 4
```

With:

```typescript
interval: 20
```

four minor ticks divide the major interval into smaller visual steps.

Avoid excessive minor ticks because they can add visual clutter without improving interpretation.

### Range-Colored Ticks

Set `useRangeColor` to `true` to apply the corresponding qualitative range color to ticks.

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
    ranges: [
      {
        end: 50,
        color: '#D13438',
        opacity: 0.2
      },
      {
        end: 75,
        color: '#C19C00',
        opacity: 0.2
      },
      {
        end: 100,
        color: '#107C10',
        opacity: 0.2
      }
    ],
    majorTickLines: {
      height: 15,
      width: 2,
      useRangeColor: true
    },
    minorTickLines: {
      height: 8,
      width: 1,
      useRangeColor: true
    },
    labelStyle: {
      useRangeColor: true
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

`useRangeColor` applies colors from corresponding qualitative ranges to ticks and labels.

Ensure that range-derived tick and label colors provide sufficient contrast.

### Hide Tick Lines

Set tick height or width to zero.

```typescript
majorTickLines: {
  height: 0,
  width: 0
},
minorTickLines: {
  height: 0,
  width: 0
},
minorTicksPerInterval: 0
```

Hiding all ticks can make the scale more difficult to interpret. Preserve numeric labels or provide another means of understanding the scale.

## Tick Placement

Use `tickPosition` to place major and minor ticks inside or outside the qualitative ranges.

Supported values include:

- `Inside`
- `Outside`

### Outside Ticks

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
    tickPosition: 'Outside'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Inside Ticks

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
    tickPosition: 'Inside'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

When ticks are inside the ranges, ensure they remain distinguishable from:

- Range backgrounds.
- Value bars.
- Target markers.
- Data labels.

## Numeric Label Formatting

### Custom Prefix and Suffix

Use `{value}` when adding custom text.

```typescript
labelFormat: '{value}%'
```

```typescript
labelFormat: '₹{value}'
```

```typescript
labelFormat: '{value}h'
```

Do not use JavaScript interpolation syntax inside `labelFormat`.

Incorrect:

```typescript
labelFormat: '${value}%'
```

Correct:

```typescript
labelFormat: '{value}%'
```

An exception is a literal currency symbol that happens to be `$`:

```typescript
labelFormat: '${value}K'
```

Here, `$` is literal text and `{value}` is the Bullet Chart value placeholder.

### Globalized Number Formats

```typescript
labelFormat: 'n0'
```

```typescript
labelFormat: 'n2'
```

```typescript
labelFormat: 'c'
```

Numeric labels support Globalize formats through `labelFormat`.

Use the appropriate locale when currency or number separators must be localized.

### Abbreviated Values

`labelFormat` inserts or formats the resolved numeric value. It does not evaluate arithmetic expressions.

Incorrect:

```typescript
labelFormat:
  '${value/1000}M'
```

The expression `value/1000` is not evaluated.

Normalize the data and scale before binding.

```typescript
interface RevenueData {
  value: number;
  target: number;
  category: string;
}

const revenueData:
  RevenueData[] = [
    {
      value: 450,
      target: 500,
      category: 'Revenue'
    }
  ];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: revenueData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 1000,
    interval: 200,
    labelFormat: '₹{value}K'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

In this example, the bound values are already expressed in thousands.

### Group Separators

Set `enableGroupSeparator` to display locale-aware grouping separators.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 45000,
        target: 50000,
        category: 'Revenue'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100000,
    interval: 20000,
    labelFormat: '₹{value}',
    enableGroupSeparator: true
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart model exposes `enableGroupSeparator` for grouped number display.

## Numeric Label Styling

Use `labelStyle` for quantitative scale labels.

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
    labelStyle: {
      size: '14px',
      color: '#2E5F7F',
      fontFamily:
        'Arial, sans-serif',
      fontStyle: 'Normal',
      fontWeight: '600',
      opacity: 1,
      useRangeColor: false
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use:

```typescript
labelStyle
```

Do not use:

```typescript
axisLabelStyle
```

The Bullet Chart label-style model does not expose a documented rotation or `angle` property.

Do not use:

```typescript
labelStyle: {
  angle: 45
}
```

Use an appropriate Chart width, label interval, or shorter label format rather than rotating Bullet Chart scale labels.

## Numeric Label Placement

Use `labelPosition` to place quantitative scale labels inside or outside the qualitative ranges. The Bullet Chart model defines this as a Chart-level property.

Supported values include:

- `Inside`
- `Outside`

Do not confuse Bullet Chart `labelPosition` with the regular Cartesian Category-axis `labelPlacement` values `OnTicks` and `BetweenTicks`.

### Outside Labels

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
    tickPosition: 'Outside',
    labelPosition: 'Outside'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Inside Labels

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
    tickPosition: 'Inside',
    labelPosition: 'Inside',
    labelStyle: {
      color: '#242424',
      size: '13px'
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

When labels are inside, use colors that contrast with every qualitative range.

## Category Labels

Category labels identify individual measures. They are mapped through `categoryField`.

### Display Category Labels

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
    categoryField: 'category',
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Category Label Styling

Use `categoryLabelStyle`.

```typescript
categoryLabelStyle: {
  size: '14px',
  color: '#2C3E50',
  fontFamily:
    'Segoe UI, sans-serif',
  fontStyle: 'Normal',
  fontWeight: '600',
  opacity: 1
}
```

The Bullet Chart exposes `categoryLabelStyle` separately from the numeric scale's `labelStyle`.

Do not place unsupported properties such as `position` or `angle` inside `categoryLabelStyle`.

Incorrect:

```typescript
categoryLabelStyle: {
  position: 'Left',
  angle: 45
}
```

Correct:

```typescript
categoryLabelStyle: {
  size: '14px',
  color: '#2C3E50',
  fontWeight: '600'
}
```

### Long Category Labels

Use trimming properties supported by the label style.

```typescript
categoryLabelStyle: {
  size: '13px',
  maximumTitleWidth: 160,
  enableTrim: true,
  textOverflow: 'Trim'
}
```

Alternatively:

- Increase the Chart width.
- Use horizontal orientation.
- Use shorter labels.
- Provide the complete label in nearby text or a table.

Do not use unexplained abbreviations solely to make labels fit.

### Localized Category Labels

Category labels come from the data source. Replace the data when the language changes.

```typescript
const englishData = [
  {
    value: 55,
    target: 75,
    category: 'Revenue'
  },
  {
    value: 82,
    target: 90,
    category: 'Profit'
  }
];

const arabicData = [
  {
    value: 55,
    target: 75,
    category: 'الإيرادات'
  },
  {
    value: 82,
    target: 90,
    category: 'الأرباح'
  }
];

function setLanguage(
  language: 'en' | 'ar'
): void {
  const isRtl: boolean =
    language === 'ar';

  document.documentElement.lang =
    language;

  document.documentElement.dir =
    isRtl
      ? 'rtl'
      : 'ltr';

  bulletChart.enableRtl =
    isRtl;

  bulletChart.dataSource =
    isRtl
      ? arabicData
      : englishData;

  bulletChart.refresh();
}
```

## Opposed Position

Use `opposedPosition` to move the scale axis to the opposite side of its default position. The Bullet Chart model exposes this property at the Chart level.

### Standard Position

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    opposedPosition: false,
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Opposed Position by Orientation

For a horizontal Bullet Chart, `opposedPosition: true` moves the quantitative axis to the opposite vertical side.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    opposedPosition: true,
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

For a vertical Bullet Chart, the same property moves the axis to the opposite horizontal side.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 55,
        target: 75,
        category: 'Sales'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Vertical',
    opposedPosition: true,
    minimum: 0,
    maximum: 100,
    interval: 20,
    height: '500px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Do not describe `opposedPosition` as always meaning “move the axis to the top.” Its visual result depends on the orientation.

## Orientation and Axis Direction

Horizontal orientation places the quantitative scale horizontally.

```typescript
orientation: 'Horizontal'
```

Vertical orientation places the quantitative scale vertically.

```typescript
orientation: 'Vertical'
```

The default Bullet Chart orientation is `Horizontal`.

When selecting an orientation, consider:

- Available width and height.
- Category-label length.
- Number of measures.
- Numeric-label density.
- RTL requirements.
- Target-marker visibility.

## Unsupported Axis Configurations

The Bullet Chart has a specialized scale API and does not expose every property available on a regular Cartesian Chart axis.

Do not use the following unverified or unsupported Bullet Chart properties:

```typescript
axisLabelStyle
```

```typescript
axisLabelRender
```

```typescript
labelIntersectAction
```

```typescript
lineStyle
```

```typescript
rangeStart
```

```typescript
rangeEnd
```

```typescript
valueType: 'Logarithmic'
```

```typescript
labelRotation
```

```typescript
labelPlacement: 'OnTicks'
```

Use the supported Bullet Chart alternatives:

- `labelStyle`
- `labelFormat`
- `labelPosition`
- `tickPosition`
- `minimum`
- `maximum`
- `interval`
- `majorTickLines`
- `minorTickLines`
- `minorTicksPerInterval`
- `opposedPosition`
- `orientation`

The standard Bullet Chart API does not provide a separate configurable quantitative axis-line style comparable to Cartesian `lineStyle`.

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
  target: number;
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 58,
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
    title: 'Business Performance',
    subtitle:
      'Actual values compared with targets',
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    enableGroupSeparator: true,
    opposedPosition: false,
    tickPosition: 'Outside',
    labelPosition: 'Outside',
    majorTickLines: {
      height: 14,
      width: 2,
      color: '#242424',
      useRangeColor: false
    },
    minorTickLines: {
      height: 7,
      width: 1,
      color: '#808080',
      useRangeColor: false
    },
    minorTicksPerInterval: 4,
    labelStyle: {
      size: '13px',
      color: '#242424',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle: 'Normal',
      fontWeight: '400',
      opacity: 1,
      useRangeColor: false
    },
    categoryLabelStyle: {
      size: '14px',
      color: '#242424',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle: 'Normal',
      fontWeight: '600',
      opacity: 1,
      maximumTitleWidth: 160,
      enableTrim: true,
      textOverflow: 'Trim'
    },
    ranges: [
      {
        end: 60,
        color: '#D13438',
        opacity: 0.12
      },
      {
        end: 80,
        color: '#C19C00',
        opacity: 0.12
      },
      {
        end: 100,
        color: '#107C10',
        opacity: 0.12
      }
    ],
    valueFill: '#0F6CBD',
    targetColor: '#242424',
    targetWidth: 6,
    width: '100%',
    height: '420px',
    tooltip: {
      enable: true,
      template:
        '<div class="bullet-tooltip">' +
        '<strong>Actual:</strong> ${value}<br>' +
        '<strong>Target:</strong> ${target}' +
        '</div>'
    },
    animation: {
      enable: false
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);

const positionButton:
  HTMLButtonElement | null =
  document.getElementById(
    'toggle-axis-position'
  ) as HTMLButtonElement | null;

const toggleAxisPosition =
  (): void => {
    bulletChart.opposedPosition =
      !bulletChart.opposedPosition;

    bulletChart.refresh();
  };

positionButton?.addEventListener(
  'click',
  toggleAxisPosition
);

window.addEventListener(
  'beforeunload',
  (): void => {
    positionButton
      ?.removeEventListener(
        'click',
        toggleAxisPosition
      );

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
    Business Performance
  </h1>

  <p id="performance-summary">
    The scale runs from 0 through 100 percent
    with major intervals of 20 percent.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary"
  ></div>

  <button
    id="toggle-axis-position"
    type="button"
  >
    Toggle axis position
  </button>
</section>
```

**CSS:**

```css
#bullet-chart {
  width: 100%;
  min-height: 420px;
}

.bullet-tooltip {
  min-width: 130px;
  padding: 8px 10px;
}

#toggle-axis-position {
  min-height: 40px;
  margin-top: 12px;
  padding: 8px 16px;
}

#toggle-axis-position:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
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
    Bullet Chart Axis Customization
  </title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #bullet-chart {
      width: 100%;
      min-height: 420px;
    }

    .bullet-tooltip {
      min-width: 130px;
      padding: 8px 10px;
    }

    #toggle-axis-position {
      min-height: 40px;
      margin-top: 12px;
      padding: 8px 16px;
    }

    #toggle-axis-position:focus-visible {
      outline: 3px solid #0F6CBD;
      outline-offset: 2px;
    }
  </style>
</head>

<body>
  <section
    aria-labelledby="performance-heading"
  >
    <h1 id="performance-heading">
      Business Performance
    </h1>

    <p id="performance-summary">
      The scale runs from 0 through 100 percent
      with major intervals of 20 percent.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="performance-summary"
    ></div>

    <button
      id="toggle-axis-position"
      type="button"
    >
      Toggle axis position
    </button>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    var chartData = [
      {
        value: 58,
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

    var bulletChart =
      new ej.charts.BulletChart({
        title:
          'Business Performance',
        subtitle:
          'Actual values compared with targets',
        dataSource:
          chartData,
        valueField:
          'value',
        targetField:
          'target',
        categoryField:
          'category',
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
        enableGroupSeparator:
          true,
        opposedPosition:
          false,
        tickPosition:
          'Outside',
        labelPosition:
          'Outside',
        majorTickLines: {
          height:
            14,
          width:
            2,
          color:
            '#242424',
          useRangeColor:
            false
        },
        minorTickLines: {
          height:
            7,
          width:
            1,
          color:
            '#808080',
          useRangeColor:
            false
        },
        minorTicksPerInterval:
          4,
        labelStyle: {
          size:
            '13px',
          color:
            '#242424',
          fontFamily:
            'Segoe UI, sans-serif',
          fontStyle:
            'Normal',
          fontWeight:
            '400',
          opacity:
            1,
          useRangeColor:
            false
        },
        categoryLabelStyle: {
          size:
            '14px',
          color:
            '#242424',
          fontFamily:
            'Segoe UI, sans-serif',
          fontStyle:
            'Normal',
          fontWeight:
            '600',
          opacity:
            1,
          maximumTitleWidth:
            160,
          enableTrim:
            true,
          textOverflow:
            'Trim'
        },
        ranges: [
          {
            end:
              60,
            color:
              '#D13438',
            opacity:
              0.12
          },
          {
            end:
              80,
            color:
              '#C19C00',
            opacity:
              0.12
          },
          {
            end:
              100,
            color:
              '#107C10',
            opacity:
              0.12
          }
        ],
        valueFill:
          '#0F6CBD',
        targetColor:
          '#242424',
        targetWidth:
          6,
        width:
          '100%',
        height:
          '420px',
        tooltip: {
          enable:
            true,
          template:
            '<div class="bullet-tooltip">' +
            '<strong>Actual:</strong> ${value}<br>' +
            '<strong>Target:</strong> ${target}' +
            '</div>'
        },
        animation: {
          enable:
            false
        }
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    var positionButton =
      document.getElementById(
        'toggle-axis-position'
      );

    function toggleAxisPosition() {
      bulletChart.opposedPosition =
        !bulletChart.opposedPosition;

      bulletChart.refresh();
    }

    if (positionButton) {
      positionButton.addEventListener(
        'click',
        toggleAxisPosition
      );
    }

    window.addEventListener(
      'beforeunload',
      function () {
        if (positionButton) {
          positionButton.removeEventListener(
            'click',
            toggleAxisPosition
          );
        }

        bulletChart.destroy();
      }
    );
  </script>
</body>
</html>
```

## Best Practices

1. **Use an appropriate scale:** Ensure that actual values, targets, and ranges fit between `minimum` and `maximum`.
2. **Choose readable intervals:** Use intervals that support quick interpretation.
3. **Keep scales consistent:** Related Bullet Charts should use the same scale when users compare them directly.
4. **Use `height` for ticks:** Do not use the regular Chart-style `size` property.
5. **Keep major ticks prominent:** Use greater height or width than minor ticks.
6. **Keep minor ticks subtle:** Avoid excessive minor-tick density.
7. **Use `tickPosition`:** Place ticks inside or outside based on available contrast and space.
8. **Use `labelPosition`:** Place numeric labels inside or outside independently of ticks.
9. **Use `labelStyle`:** Do not use an unsupported `axisLabelStyle`.
10. **Use `categoryLabelStyle`:** Style category labels separately from numeric labels.
11. **Use supported number formats:** Use Globalize formats or `{value}` with custom text.
12. **Normalize abbreviated values:** Do not perform arithmetic inside `labelFormat`.
13. **Avoid unsupported rotation:** Increase width or reduce label density instead.
14. **Use opposed positioning carefully:** The resulting side depends on orientation.
15. **Provide text alternatives:** Explain the unit, scale, and threshold meaning.
16. **Preserve contrast:** Labels and ticks must remain visible against qualitative ranges.
17. **Update efficiently:** Apply all related changes before calling `refresh()`.
18. **Clean up resources:** Remove application-owned listeners and destroy the Bullet Chart.

## Troubleshooting

### Axis Labels Are Not Displayed

- Ensure that `minimum`, `maximum`, and `interval` are valid.
- Ensure that `minimum` is less than `maximum`.
- Ensure that `interval` is greater than zero.
- Check `labelStyle.opacity`.
- Check whether the label color matches the background.
- Increase the Bullet Chart dimensions.

### Tick Lines Are Not Displayed

- Use `height`, not `size`.
- Set `width` to a positive value.
- Set `height` to a positive value.
- Use a visible color.
- Ensure that ticks are not obscured by range colors.
- Check `tickPosition`.

### Minor Ticks Are Not Displayed

- Set `minorTicksPerInterval` to a value greater than zero.
- Set `minorTickLines.height` to a positive value.
- Set `minorTickLines.width` to a positive value.
- Use a visible minor-tick color.

### Dashed Ticks Are Not Displayed

The Bullet Chart tick-line model does not expose a documented `dashArray` property.

Use:

```typescript
majorTickLines: {
  height: 14,
  width: 2,
  color: '#242424'
}
```

### Label Format Is Incorrect

- Use `{value}` for a custom prefix or suffix.
- Use a supported Globalize number format.
- Do not use `${value}` as JavaScript interpolation.
- Do not perform arithmetic inside `labelFormat`.
- Normalize abbreviated values before binding.
- Use `n2` instead of `{value:.2f}`.

### Category Labels Are Missing

- Configure `categoryField`.
- Ensure that the mapped field exists.
- Ensure that category values are strings.
- Increase the Chart height when several measures are displayed.
- Use `categoryLabelStyle` for appearance.

### Category Label Position Is Not Applied

The documented `categoryLabelStyle` model does not expose `position` or `angle`.

Do not use:

```typescript
categoryLabelStyle: {
  position: 'Left',
  angle: 45
}
```

Use orientation, RTL, dimensions, and supported style properties.

### Axis Label Event Is Not Working

Do not use an unverified Bullet Chart `axisLabelRender` event.

Use:

- `labelFormat`
- `labelStyle`
- Pre-normalized values
- Application-owned descriptions

### Opposed Position Appears on an Unexpected Side

The opposite side depends on `orientation`.

- In Horizontal orientation, the axis moves to the opposite vertical side.
- In Vertical orientation, the axis moves to the opposite horizontal side.
- Refresh after changing the property dynamically.

### Logarithmic Scale Is Not Working

The standard Bullet Chart quantitative scale is linear.

Use a regular Cartesian `Chart` with a Logarithmic axis when logarithmic scaling is required.

### Range Padding Is Not Applied

The Bullet Chart does not expose documented `rangeStart` or `rangeEnd` padding properties.

Adjust:

```typescript
minimum
```

and:

```typescript
maximum
```

explicitly when additional scale space is required.

### Axis Line Style Is Not Applied

The Bullet Chart does not expose the regular Cartesian Chart `lineStyle` axis configuration.

Customize:

- Major ticks.
- Minor ticks.
- Labels.
- Ranges.
- Chart border.

## Related Topics

- See `references/ranges-and-qualitative-scale.md` for qualitative range configuration.
- See `references/data-binding-and-labels.md` for data and feature-bar labels.
- See `references/value-bar-and-comparative-bar.md` for actual and target styling.
- See `references/title-tooltip-and-interactivity.md` for titles and tooltips.
- See `references/customization-dimensions-and-export.md` for orientation, dimensions, themes, and printing.
