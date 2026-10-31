# Ranges & Qualitative Scale Configuration

## Table of Contents

- [Ranges & Qualitative Scale Configuration](#ranges--qualitative-scale-configuration)
  - [Overview](#overview)
  - [Understanding Ranges](#understanding-ranges)
    - [Range Boundaries](#range-boundaries)
    - [Basic Range Structure](#basic-range-structure)
    - [Range Properties](#range-properties)
  - [Qualitative Scale Configurations](#qualitative-scale-configurations)
    - [Two-Zone Scale](#two-zone-scale)
    - [Three-Zone Scale](#three-zone-scale)
    - [Four-Zone Scale](#four-zone-scale)
    - [Five-Zone Scale](#five-zone-scale)
  - [Range Color and Opacity](#range-color-and-opacity)
    - [Solid Colors](#solid-colors)
    - [Semi-Transparent Ranges](#semi-transparent-ranges)
    - [Range Opacity](#range-opacity)
    - [Business Traffic-Light Colors](#business-traffic-light-colors)
    - [Gradient Ranges](#gradient-ranges)
  - [Named Ranges and Legends](#named-ranges-and-legends)
    - [Named Ranges](#named-ranges)
    - [Enable the Range Legend](#enable-the-range-legend)
    - [Legend Shapes](#legend-shapes)
    - [Image Legend Shape](#image-legend-shape)
  - [Dynamic Ranges](#dynamic-ranges)
    - [Calculate Ranges Before Rendering](#calculate-ranges-before-rendering)
    - [Update Ranges Dynamically](#update-ranges-dynamically)
  - [Multiple Measures with Shared Ranges](#multiple-measures-with-shared-ranges)
  - [Category-Specific Range Requirements](#category-specific-range-requirements)
  - [Performance Zone Examples](#performance-zone-examples)
    - [Sales Performance Zones](#sales-performance-zones)
    - [Customer Satisfaction Zones](#customer-satisfaction-zones)
    - [Project Completion Zones](#project-completion-zones)
  - [Scale Formatting Examples](#scale-formatting-examples)
    - [Percentage Scale](#percentage-scale)
    - [Currency Scale](#currency-scale)
    - [Time-Based Scale](#time-based-scale)
  - [Accessibility](#accessibility)


## Overview

Qualitative ranges provide performance context for the actual and target values in a Bullet Chart. They form colored regions behind the value and comparative bars and can represent levels such as poor, satisfactory, good, and excellent.

A qualitative range is defined by an ending value through `end`. The first range starts at the Bullet Chart `minimum`, and each subsequent range starts at the preceding range's ending value.

For example:

```typescript
minimum: 0,
maximum: 100,
ranges: [
  {
    end: 35
  },
  {
    end: 70
  },
  {
    end: 100
  }
]
```

This configuration produces:

- The first range from `0` through `35`.
- The second range from `35` through `70`.
- The third range from `70` through `100`.

Range boundaries should be ordered from the lowest `end` value to the highest.

## Understanding Ranges

### Range Boundaries

Each range ends at the value configured through `end`.

```typescript
ranges: [
  {
    end: 35,
    color: '#FADBD8'
  },
  {
    end: 70,
    color: '#FCF3CF'
  },
  {
    end: 100,
    color: '#D5F5E3'
  }
]
```

With:

```typescript
minimum: 0,
maximum: 100
```

the ranges represent:

```text
0 to 35
35 to 70
70 to 100
```

The Bullet Chart does not require a separate `start` value for each range.

### Basic Range Structure

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
    interval: 20,
    ranges: [
      {
        end: 35
      },
      {
        end: 70
      },
      {
        end: 100
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Range Properties

A Bullet Chart range supports properties including:

- `end`: Defines the ending value of the qualitative range.
- `color`: Defines the range color.
- `opacity`: Defines range transparency.
- `name`: Defines the range name used by the legend.
- `shape`: Defines the range's legend shape.
- `legendImageUrl`: Defines an image URL when the legend shape is `Image`.
- `index`: Identifies the qualitative range.

Example:

```typescript
ranges: [
  {
    end: 35,
    color: '#FADBD8',
    opacity: 0.8,
    name: 'Below target',
    shape: 'Rectangle'
  },
  {
    end: 70,
    color: '#FCF3CF',
    opacity: 0.8,
    name: 'Near target',
    shape: 'Diamond'
  },
  {
    end: 100,
    color: '#D5F5E3',
    opacity: 0.8,
    name: 'On target',
    shape: 'Circle'
  }
]
```

The standard range API does not expose a `description` property.

Incorrect:

```typescript
ranges: [
  {
    end: 35,
    description:
      'Performance is below expectations'
  }
]
```

Use `name` for the range legend and provide longer descriptions in application-owned text or a semantic list.

## Qualitative Scale Configurations

The number of ranges should reflect meaningful business thresholds. Do not add ranges solely for decoration.

### Two-Zone Scale

Use two ranges for a simple below-threshold and target-achieved comparison.

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
    minimum: 0,
    maximum: 100,
    interval: 20,
    ranges: [
      {
        end: 75,
        color: '#FADBD8',
        name: 'Below target'
      },
      {
        end: 100,
        color: '#D5F5E3',
        name: 'Target achieved'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The boundary should normally align with the threshold represented by the scale. If the target is `75`, a below-target range ending at `50` would communicate a different threshold.

### Three-Zone Scale

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
    minimum: 0,
    maximum: 100,
    interval: 20,
    ranges: [
      {
        end: 50,
        color: '#FADBD8',
        name: 'Below expectations'
      },
      {
        end: 75,
        color: '#FCF3CF',
        name: 'Approaching target'
      },
      {
        end: 100,
        color: '#D5F5E3',
        name: 'Target achieved'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Four-Zone Scale

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
    minimum: 0,
    maximum: 100,
    interval: 20,
    ranges: [
      {
        end: 25,
        color: '#FADBD8',
        name: 'Poor'
      },
      {
        end: 50,
        color: '#FDEBD0',
        name: 'Satisfactory'
      },
      {
        end: 75,
        color: '#FCF3CF',
        name: 'Good'
      },
      {
        end: 100,
        color: '#D5F5E3',
        name: 'Excellent'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Five-Zone Scale

Use a detailed scale only when all five levels correspond to defined business thresholds.

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
    minimum: 0,
    maximum: 100,
    interval: 20,
    ranges: [
      {
        end: 20,
        color: '#F5B7B1',
        name: 'Critical'
      },
      {
        end: 40,
        color: '#FAD7A0',
        name: 'Poor'
      },
      {
        end: 60,
        color: '#FCF3CF',
        name: 'Satisfactory'
      },
      {
        end: 80,
        color: '#D4EFDF',
        name: 'Good'
      },
      {
        end: 100,
        color: '#A9DFBF',
        name: 'Excellent'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Adding too many ranges can make the visualization difficult to interpret. Use the minimum number needed to communicate the measurement policy.

## Range Color and Opacity

### Solid Colors

Use color values that keep the value bar, target markers, labels, and tick marks visible.

```typescript
ranges: [
  {
    end: 35,
    color: '#F5B7B1'
  },
  {
    end: 70,
    color: '#F9E79F'
  },
  {
    end: 100,
    color: '#A9DFBF'
  }
]
```

The `color` property accepts valid CSS color values.

### Semi-Transparent Ranges

You can use RGBA colors:

```typescript
ranges: [
  {
    end: 35,
    color:
      'rgba(209, 52, 56, 0.18)'
  },
  {
    end: 70,
    color:
      'rgba(193, 156, 0, 0.18)'
  },
  {
    end: 100,
    color:
      'rgba(16, 124, 16, 0.18)'
  }
]
```

This keeps the qualitative context visible without overpowering the actual and target measures.

### Range Opacity

Use the documented `opacity` property when every range has a solid base color.

```typescript
ranges: [
  {
    end: 35,
    color: '#D13438',
    opacity: 0.2
  },
  {
    end: 70,
    color: '#C19C00',
    opacity: 0.2
  },
  {
    end: 100,
    color: '#107C10',
    opacity: 0.2
  }
]
```

The default range opacity is `1`.

Use either:

- A solid color with `opacity`, or
- An RGBA color with an alpha channel.

Avoid applying strong transparency through both mechanisms unless the combined effect is intentional.

### Business Traffic-Light Colors

```typescript
ranges: [
  {
    end: 33,
    color: '#D13438',
    opacity: 0.18,
    name: 'Critical'
  },
  {
    end: 66,
    color: '#C19C00',
    opacity: 0.18,
    name: 'Warning'
  },
  {
    end: 100,
    color: '#107C10',
    opacity: 0.18,
    name: 'Healthy'
  }
]
```

Do not rely only on red, yellow, and green. Include range names, a legend, a textual summary, or a semantic list.

### Gradient Ranges

A sequence of differently colored ranges creates discrete qualitative zones. It is not a continuous color gradient.

This configuration:

```typescript
ranges: [
  {
    end: 50,
    color: '#FF6B6B'
  },
  {
    end: 100,
    color: '#4ECDC4'
  }
]
```

creates two solid ranges.

The standard Bullet Chart range model does not expose documented `linearGradient` or `radialGradient` properties. Use separate solid or semitransparent ranges instead.

## Named Ranges and Legends

### Named Ranges

Use `name` to identify a range.

```typescript
ranges: [
  {
    end: 25,
    color: '#F5B7B1',
    name: 'Poor'
  },
  {
    end: 50,
    color: '#FAD7A0',
    name: 'Average'
  },
  {
    end: 75,
    color: '#FCF3CF',
    name: 'Good'
  },
  {
    end: 100,
    color: '#A9DFBF',
    name: 'Excellent'
  }
]
```

The range model supports `name`, which is used to identify the range in the Bullet Chart legend.

### Enable the Range Legend

Import and inject `BulletChartLegend`.

```typescript
import {
  BulletChart,
  BulletChartLegend
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletChartLegend
);
```

Enable the legend:

```typescript
legendSettings: {
  visible: true,
  position: 'Bottom'
}
```

Complete configuration:

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
        end: 35,
        color: '#F5B7B1',
        name: 'Poor'
      },
      {
        end: 70,
        color: '#FCF3CF',
        name: 'Satisfactory'
      },
      {
        end: 100,
        color: '#A9DFBF',
        name: 'Good'
      }
    ],
    legendSettings: {
      visible: true,
      position: 'Bottom'
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use `BulletChartLegend`, not `BulletLegend`.

Use `legendSettings`, not `legend`.

### Legend Shapes

Use the range `shape` property to customize its legend icon.

Supported range legend shapes include:

- `Circle`
- `Rectangle`
- `Triangle`
- `Diamond`
- `Cross`
- `HorizontalLine`
- `VerticalLine`
- `Pentagon`
- `InvertedTriangle`
- `SeriesType`
- `Image`

Example:

```typescript
ranges: [
  {
    end: 35,
    color: '#F5B7B1',
    name: 'Poor',
    shape: 'Cross'
  },
  {
    end: 70,
    color: '#FCF3CF',
    name: 'Satisfactory',
    shape: 'Diamond'
  },
  {
    end: 100,
    color: '#A9DFBF',
    name: 'Good',
    shape: 'Circle'
  }
]
```

The default legend shape is `Rectangle`.

### Image Legend Shape

Set the shape to `Image` and provide `legendImageUrl`.

```typescript
ranges: [
  {
    end: 35,
    color: '#F5B7B1',
    name: 'Poor',
    shape: 'Image',
    legendImageUrl:
      '/assets/icons/poor-status.png'
  },
  {
    end: 100,
    color: '#A9DFBF',
    name: 'Good',
    shape: 'Circle'
  }
]
```

Ensure that the image is available when the Bullet Chart renders.

Do not use an image as the only way to communicate the range meaning.

## Dynamic Ranges

### Calculate Ranges Before Rendering

Calculate the complete `ranges` collection before creating the Bullet Chart.

```typescript
import {
  RangeModel
} from '@syncfusion/ej2-charts';

function getRanges(
  target: number
): RangeModel[] {
  if (
    !Number.isFinite(target) ||
    target <= 0
  ) {
    return [
      {
        end: 100,
        color: '#E5E7EB',
        name: 'Unavailable'
      }
    ];
  }

  const warningThreshold: number =
    Math.round(target * 0.75);

  return [
    {
      end: warningThreshold,
      color: '#FADBD8',
      name: 'Below target'
    },
    {
      end: target,
      color: '#FCF3CF',
      name: 'Approaching target'
    },
    {
      end: Math.max(
        100,
        target
      ),
      color: '#D5F5E3',
      name: 'Target achieved'
    }
  ];
}

const target: number = 75;

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 55,
        target,
        category: 'Sales'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    ranges:
      getRanges(target)
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Keep the calculated range ends ordered and inside the intended scale.

### Update Ranges Dynamically

Assign a new range collection and call `refresh()`.

```typescript
const updatedRanges: RangeModel[] = [
  {
    end: 50,
    color: '#FADBD8',
    name: 'Below target'
  },
  {
    end: 85,
    color: '#FCF3CF',
    name: 'Approaching target'
  },
  {
    end: 120,
    color: '#D5F5E3',
    name: 'Target achieved'
  }
];

bulletChart.ranges =
  updatedRanges;

bulletChart.maximum =
  120;

bulletChart.interval =
  20;

bulletChart.refresh();
```

Apply the scale and range changes before calling `refresh()`.

## Multiple Measures with Shared Ranges

All measures in one Bullet Chart share the same qualitative scale and `ranges` collection.

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
    interval: 20,
    ranges: [
      {
        end: 35,
        color: '#FADBD8',
        name: 'Poor'
      },
      {
        end: 50,
        color: '#FDEBD0',
        name: 'Average'
      },
      {
        end: 75,
        color: '#FCF3CF',
        name: 'Good'
      },
      {
        end: 100,
        color: '#D5F5E3',
        name: 'Excellent'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Shared ranges are appropriate only when every measure uses:

- The same unit.
- The same scale.
- The same interpretation of thresholds.

Do not combine percentages, currency, and hours in one Bullet Chart with one shared range scale.

## Category-Specific Range Requirements

The standard Bullet Chart has one Chart-level `ranges` collection. It does not provide a documented `rangeRender` event for replacing ranges independently for each category.

Do not use:

```typescript
rangeRender: (args) => {
  args.ranges = [];
}
```

If categories require different units or thresholds, create separate Bullet Chart instances.

```html
<section class="performance-grid">
  <div>
    <h2>Revenue</h2>
    <div id="revenue-chart"></div>
  </div>

  <div>
    <h2>Profit Margin</h2>
    <div id="profit-chart"></div>
  </div>
</section>
```

```typescript
const revenueChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 120000,
        target: 150000
      }
    ],
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 200000,
    interval: 50000,
    ranges: [
      {
        end: 80000,
        color: '#FADBD8',
        name: 'Below target'
      },
      {
        end: 150000,
        color: '#FCF3CF',
        name: 'Near target'
      },
      {
        end: 200000,
        color: '#D5F5E3',
        name: 'Target achieved'
      }
    ]
  });

revenueChart.appendTo(
  '#revenue-chart'
);

const profitChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 18,
        target: 20
      }
    ],
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 30,
    interval: 5,
    ranges: [
      {
        end: 10,
        color: '#FADBD8',
        name: 'Low'
      },
      {
        end: 20,
        color: '#FCF3CF',
        name: 'Expected'
      },
      {
        end: 30,
        color: '#D5F5E3',
        name: 'High'
      }
    ]
  });

profitChart.appendTo(
  '#profit-chart'
);
```

## Performance Zone Examples

### Sales Performance Zones

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 120000,
        target: 150000,
        category: 'Revenue'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 200000,
    interval: 50000,
    labelFormat: '₹{value}',
    ranges: [
      {
        end: 50000,
        color: '#F5B7B1',
        name: 'Below target'
      },
      {
        end: 100000,
        color: '#FAD7A0',
        name: 'Near target'
      },
      {
        end: 150000,
        color: '#FCF3CF',
        name: 'On target'
      },
      {
        end: 200000,
        color: '#A9DFBF',
        name: 'Exceeding target'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Customer Satisfaction Zones

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 7.5,
        target: 8,
        category:
          'Customer Satisfaction'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 10,
    interval: 2,
    ranges: [
      {
        end: 2,
        color: '#F5B7B1',
        name: 'Very unsatisfied'
      },
      {
        end: 4,
        color: '#FAD7A0',
        name: 'Unsatisfied'
      },
      {
        end: 6,
        color: '#FCF3CF',
        name: 'Neutral'
      },
      {
        end: 8,
        color: '#D4EFDF',
        name: 'Satisfied'
      },
      {
        end: 10,
        color: '#A9DFBF',
        name: 'Very satisfied'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Project Completion Zones

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 72,
        target: 80,
        category:
          'Project Completion'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    ranges: [
      {
        end: 25,
        color: '#F5B7B1',
        name: 'Critical delay'
      },
      {
        end: 50,
        color: '#FAD7A0',
        name: 'Behind schedule'
      },
      {
        end: 75,
        color: '#FCF3CF',
        name: 'On track'
      },
      {
        end: 100,
        color: '#A9DFBF',
        name: 'Near completion'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

A completion percentage does not by itself indicate whether a project is ahead of schedule. Use schedule-variance data when the labels must represent timing performance.

## Scale Formatting Examples

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
    labelFormat: '{value}%',
    ranges: [
      {
        end: 60,
        color: '#FADBD8',
        name: 'Low'
      },
      {
        end: 80,
        color: '#FCF3CF',
        name: 'Expected'
      },
      {
        end: 100,
        color: '#D5F5E3',
        name: 'High'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Currency Scale

Use `{value}` in custom Bullet Chart scale-label text.

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
    ranges: [
      {
        end: 30000,
        color: '#FADBD8',
        name: 'Below target'
      },
      {
        end: 70000,
        color: '#FCF3CF',
        name: 'Expected'
      },
      {
        end: 100000,
        color: '#D5F5E3',
        name: 'High'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

A label such as:

```typescript
labelFormat: '${value}K'
```

adds `K` without dividing the scale value by one thousand.

If abbreviated values are required, normalize the data first:

```typescript
const chartData = [
  {
    value: 45,
    target: 50,
    category: 'Revenue'
  }
];
```

Then use:

```typescript
labelFormat: '₹{value}K',
minimum: 0,
maximum: 100,
interval: 20
```

### Time-Based Scale

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 6,
        target: 8,
        category: 'Training'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 10,
    interval: 1,
    labelFormat: '{value}h',
    ranges: [
      {
        end: 3,
        color: '#FADBD8',
        name: 'Low'
      },
      {
        end: 6,
        color: '#FCF3CF',
        name: 'Expected'
      },
      {
        end: 10,
        color: '#D5F5E3',
        name: 'High'
      }
    ]
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

## Accessibility

Qualitative range colors must not be the only indication of performance.

Provide:

- Range names.
- A visible legend.
- A short textual explanation.
- Sufficient contrast.
- A semantic list or data table.
- Distinct legend shapes where useful.

Example text alternative:

```html
<section
  aria-labelledby="sales-heading"
>
  <h1 id="sales-heading">
    Sales Performance
  </h1>

  <p id="range-description">
    Values below 50 are below expectations.
    Values from 50 through 75 are approaching the target.
    Values above 75 meet or exceed the target.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="range-description"
  ></div>
</section>
```

Semantic range list:

```html
<ul aria-label="Performance range definitions">
  <li>
    Below expectations: 0 through 50
  </li>
  <li>
    Approaching target: above 50 through 75
  </li>
  <li>
    Target achieved: above 75 through 100
  </li>
</ul>
```

Use colors with sufficient contrast against the value bar, target markers, labels, and Chart background.

## Complete TypeScript Example

```typescript
import {
  BulletChart,
  BulletChartLegend,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletChartLegend,
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
      'Actual values compared with target values',
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    valueFill: '#0F6CBD',
    targetColor: '#242424',
    targetWidth: 6,
    width: '100%',
    height: '420px',
    ranges: [
      {
        end: 50,
        color: '#D13438',
        opacity: 0.16,
        name: 'Below expectations',
        shape: 'Cross'
      },
      {
        end: 75,
        color: '#C19C00',
        opacity: 0.16,
        name: 'Approaching target',
        shape: 'Diamond'
      },
      {
        end: 100,
        color: '#107C10',
        opacity: 0.16,
        name: 'Target achieved',
        shape: 'Circle'
      }
    ],
    legendSettings: {
      visible: true,
      position: 'Bottom'
    },
    tooltip: {
      enable: true,
      template:
        '<div class="bullet-tooltip">' +
        '<strong>Actual:</strong> ${value}<br>' +
        '<strong>Target:</strong> ${target}' +
        '</div>'
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
    Business Performance
  </h1>

  <p id="range-description">
    Values through 50 are below expectations.
    Values above 50 through 75 are approaching target.
    Values above 75 through 100 have achieved the target.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="range-description"
  ></div>

  <ul aria-label="Performance range definitions">
    <li>
      Below expectations: 0 through 50 percent
    </li>
    <li>
      Approaching target: above 50 through 75 percent
    </li>
    <li>
      Target achieved: above 75 through 100 percent
    </li>
  </ul>
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
    Bullet Chart Qualitative Ranges
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
  </style>
</head>

<body>
  <section
    aria-labelledby="performance-heading"
  >
    <h1 id="performance-heading">
      Business Performance
    </h1>

    <p id="range-description">
      Values through 50 are below expectations.
      Values above 50 through 75 are approaching target.
      Values above 75 through 100 have achieved the target.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="range-description"
    ></div>

    <ul aria-label="Performance range definitions">
      <li>
        Below expectations: 0 through 50 percent
      </li>
      <li>
        Approaching target: above 50 through 75 percent
      </li>
      <li>
        Target achieved: above 75 through 100 percent
      </li>
    </ul>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletChartLegend,
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
          'Actual values compared with target values',
        dataSource:
          chartData,
        valueField:
          'value',
        targetField:
          'target',
        categoryField:
          'category',
        minimum:
          0,
        maximum:
          100,
        interval:
          20,
        labelFormat:
          '{value}%',
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
        ranges: [
          {
            end:
              50,
            color:
              '#D13438',
            opacity:
              0.16,
            name:
              'Below expectations',
            shape:
              'Cross'
          },
          {
            end:
              75,
            color:
              '#C19C00',
            opacity:
              0.16,
            name:
              'Approaching target',
            shape:
              'Diamond'
          },
          {
            end:
              100,
            color:
              '#107C10',
            opacity:
              0.16,
            name:
              'Target achieved',
            shape:
              'Circle'
          }
        ],
        legendSettings: {
          visible:
            true,
          position:
            'Bottom'
        },
        tooltip: {
          enable:
            true,
          template:
            '<div class="bullet-tooltip">' +
            '<strong>Actual:</strong> ${value}<br>' +
            '<strong>Target:</strong> ${target}' +
            '</div>'
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

1. **Use meaningful thresholds:** Range boundaries should correspond to documented business rules.
2. **Order boundaries:** Configure range `end` values in ascending order.
3. **Cover the visible scale:** The last range should normally end at the Bullet Chart maximum.
4. **Use a shared unit:** Measures in one Bullet Chart should use the same unit and range interpretation.
5. **Limit visual complexity:** Use the minimum number of ranges required to explain performance.
6. **Use subtle backgrounds:** Keep the actual and target measures visually dominant.
7. **Use range opacity:** Configure `opacity` or RGBA colors for less prominent range backgrounds.
8. **Use names:** Add `name` when the range legend is enabled.
9. **Use legend shapes:** Shapes can supplement color differences.
10. **Do not rely on color alone:** Provide a description, legend, list, or table.
11. **Keep colors consistent:** Use the same threshold semantics across related Bullet Charts.
12. **Use separate Charts for different thresholds:** One Bullet Chart uses one shared range collection.
13. **Validate dynamic ranges:** Recalculate the scale when range ends exceed the existing maximum.
14. **Update efficiently:** Apply ranges and scale changes before calling `refresh()`.
15. **Clean up:** Destroy the Bullet Chart when it is permanently removed.

## Troubleshooting

### Ranges Are Not Displayed

- Ensure that `ranges` contains at least one object.
- Ensure that every object has a numeric `end`.
- Ensure that range ends fall within the intended scale.
- Ensure that the Bullet Chart host has a resolved size.
- Ensure that colors are valid CSS values.
- Check whether opacity is too low to see.

### Range Boundaries Are Incorrect

- Set `minimum` explicitly when the first range should start at a known value.
- Order range ends from lowest to highest.
- Ensure that the final range ends at or beyond the required visible scale.
- Do not configure a separate unsupported `start` value.
- Remember that each range starts at the previous range's end.

### Range Names Are Not Visible

Range names appear through the legend rather than directly inside range backgrounds.

- Import and inject `BulletChartLegend`.
- Set `legendSettings.visible` to `true`.
- Provide `name` for every required range.
- Ensure that enough layout space is available.

### Legend Is Not Displayed

- Import `BulletChartLegend`.
- Inject it through `BulletChart.Inject`.
- Use `legendSettings`, not `legend`.
- Set `legendSettings.visible` to `true`.
- Use valid range names.
- Ensure that the legend position has enough space.

### Range Opacity Is Not Applied

Use:

```typescript
ranges: [
  {
    end: 50,
    color: '#D13438',
    opacity: 0.2
  }
]
```

Keep opacity between `0` and `1`.

Do not combine a very low RGBA alpha with a very low `opacity` unless the resulting transparency is intentional.

### Range Description Is Not Displayed

The standard Bullet Chart range model does not expose a `description` property.

Use:

- `name` for the range legend.
- A visible paragraph.
- A semantic list.
- A data table.
- An application-owned tooltip or help element.

### Category-Specific Range Event Is Not Working

The standard Bullet Chart does not expose a documented `rangeRender` event for replacing ranges per category.

Create separate Bullet Chart instances when categories require different:

- Units.
- Scale limits.
- Intervals.
- Threshold definitions.
- Qualitative range colors.

### Gradient Is Not Displayed

The standard range API uses discrete colors and opacity. It does not expose documented gradient properties.

Use multiple solid or semitransparent ranges.

### Currency Labels Are Misleading

A suffix such as `K` does not divide values automatically.

Either:

- Bind values already expressed in thousands, or
- Display the complete numeric values with a currency prefix.

## Related Topics

- See `references/value-bar-and-comparative-bar.md` for actual and target-bar customization.
- See `references/data-binding-and-labels.md` for data mapping and labels.
- See `references/axis-customization.md` for scale, ticks, labels, and orientation.
- See `references/title-tooltip-and-interactivity.md` for titles, tooltips, and interactions.
- See `references/customization-dimensions-and-export.md` for themes, dimensions, export, and printing.
