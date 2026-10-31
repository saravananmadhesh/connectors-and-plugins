# Data Binding & Labels

## Table of Contents

- [Data Binding & Labels](#data-binding--labels)
  - [Overview](#overview)
  - [Data Binding Basics](#data-binding-basics)
    - [Essential Data Properties](#essential-data-properties)
    - [Bind an Array of Objects](#bind-an-array-of-objects)
    - [Bind a Single Record](#bind-a-single-record)
    - [Multiple Targets](#multiple-targets)
    - [Normalize and Validate Data](#normalize-and-validate-data)
  - [Remote Data](#remote-data)
    - [Load Data with Fetch](#load-data-with-fetch)
    - [JavaScript Fetch Example](#javascript-fetch-example)
    - [Loading and Error Feedback](#loading-and-error-feedback)
  - [Dynamic Data Updates](#dynamic-data-updates)
    - [Replace the Data Source](#replace-the-data-source)
    - [Update a Single Record](#update-a-single-record)
    - [Add and Remove Records](#add-and-remove-records)
    - [Real-Time Updates](#real-time-updates)
    - [API Polling](#api-polling)
    - [Resource Cleanup](#resource-cleanup)
  - [Data Label Configuration](#data-label-configuration)
    - [Enable Data Labels](#enable-data-labels)
    - [Customize Data Label Text](#customize-data-label-text)
    - [Data Label Formatting](#data-label-formatting)
    - [Data Label Limitations](#data-label-limitations)
  - [Category Label Configuration](#category-label-configuration)
    - [Display Category Labels](#display-category-labels)
    - [Customize Category Labels](#customize-category-labels)
    - [Long Category Labels](#long-category-labels)
    - [Localized Category Labels](#localized-category-labels)
  - [Conditional Label Content](#conditional-label-content)
  - [Multiple Measures](#multiple-measures)
    - [Display Multiple Metrics](#display-multiple-metrics)
    - [Grouped Data](#grouped-data)
    - [Mixed Units](#mixed-units)
  - [Accessibility](#accessibility)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Best Practices](#best-practices)
  - [Troubleshooting](#troubleshooting)
    - [Data Is Not Displayed](#data-is-not-displayed)
    - [Category Labels Are Missing](#category-labels-are-missing)
    - [Data Labels Are Missing](#data-labels-are-missing)
    - [Data Label Style Is Not Applied](#data-label-style-is-not-applied)
    - [Data Label Position Is Not Applied](#data-label-position-is-not-applied)
    - [Data Label Template Is Not Applied](#data-label-template-is-not-applied)
    - [Conditional Label Event Is Not Working](#conditional-label-event-is-not-working)
    - [Remote Data Is Not Loaded](#remote-data-is-not-loaded)
    - [Real-Time Updates Become Slow](#real-time-updates-become-slow)
    - [Grouped Data Is Confusing](#grouped-data-is-confusing)
  - [Related Topics](#related-topics)


## Overview

The Bullet Chart binds actual, target, and category values from an application-provided data collection.

The primary mappings are:

- `dataSource`: Defines the collection of records.
- `valueField`: Maps the actual or feature-measure value.
- `targetField`: Maps the target or comparative-measure value.
- `categoryField`: Maps the optional category label.

Data labels identify the actual value rendered by the feature bar. They are enabled through `dataLabel.enable` and styled through `dataLabel.labelStyle`.

Category labels are separate from data labels:

- The category label identifies the measure, such as `Revenue`.
- The data label identifies the actual numeric value, such as `85`.

## Data Binding Basics

### Essential Data Properties

A typical Bullet Chart record contains:

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
}
```

Example data:

```typescript
const chartData: PerformanceData[] = [
  {
    value: 55,
    target: 75,
    category: 'Sales'
  }
];
```

Bind the data:

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';

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

In this configuration:

- `valueField: 'value'` maps the actual value.
- `targetField: 'target'` maps the target.
- `categoryField: 'category'` maps the measure label.

The property names do not need to be `value`, `target`, and `category`. The mapping properties must match the application's actual field names.

```typescript
interface SprintData {
  completedStories: number;
  requiredStories: number;
  developer: string;
}

const sprintData: SprintData[] = [
  {
    completedStories: 25,
    requiredStories: 30,
    developer: 'David'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: sprintData,
    valueField: 'completedStories',
    targetField: 'requiredStories',
    categoryField: 'developer',
    minimum: 0,
    maximum: 40,
    interval: 5
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Bind an Array of Objects

Each object creates a separate measure in the Bullet Chart.

```typescript
interface TeamPerformance {
  value: number;
  target: number;
  category: string;
  region: string;
}

const salesData:
  TeamPerformance[] = [
    {
      value: 85,
      target: 90,
      category: 'Team A',
      region: 'North'
    },
    {
      value: 65,
      target: 80,
      category: 'Team B',
      region: 'South'
    },
    {
      value: 72,
      target: 78,
      category: 'Team C',
      region: 'East'
    },
    {
      value: 58,
      target: 75,
      category: 'Team D',
      region: 'West'
    }
  ];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: salesData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    height: '400px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The `region` field is retained in application data but is not displayed automatically because it is not mapped to a Bullet Chart property.

### Bind a Single Record

A Bullet Chart can display one performance measure.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 55,
        target: 75
      }
    ],
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

The `categoryField` is optional for a single record, but a visible title or nearby text should identify the measure.

### Multiple Targets

The mapped target field can contain multiple target values when the visualization requires several comparative markers.

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
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Ensure that:

- Every target value is numeric.
- Every target falls within the scale.
- The meaning of each target marker is explained.
- The target-array order corresponds to the configured target-type order.

### Normalize and Validate Data

Convert external values before assigning them to the Bullet Chart.

```typescript
interface ApiPerformanceData {
  actual: string | number;
  goal: string | number;
  metric: unknown;
}

interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

function normalizeData(
  source:
    ApiPerformanceData[]
): PerformanceData[] {
  return source
    .map(
      (
        item:
          ApiPerformanceData
      ): PerformanceData => ({
        value:
          Number(item.actual),
        target:
          Number(item.goal),
        category:
          String(item.metric)
      })
    )
    .filter(
      (
        item:
          PerformanceData
      ): boolean =>
        Number.isFinite(
          item.value
        ) &&
        Number.isFinite(
          item.target
        ) &&
        item.category.trim()
          .length > 0
    );
}
```

Do not rely on numeric strings:

```typescript
{
  value: '55',
  target: '75'
}
```

Convert them explicitly:

```typescript
{
  value: Number('55'),
  target: Number('75')
}
```

## Remote Data

### Load Data with Fetch

Validate the HTTP response and normalize its data.

```typescript
import {
  BulletChart
} from '@syncfusion/ej2-charts';

interface ApiPerformanceData {
  value: string | number;
  target: string | number;
  category: string;
}

interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

async function loadBulletChartData():
  Promise<void> {
  const statusElement:
    HTMLElement | null =
    document.getElementById(
      'bullet-chart-status'
    );

  try {
    if (statusElement) {
      statusElement.textContent =
        'Loading performance data.';
    }

    const response: Response =
      await fetch(
        '/api/performance-metrics'
      );

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData:
      ApiPerformanceData[] =
      await response.json()
        as ApiPerformanceData[];

    const chartData:
      PerformanceData[] =
      responseData
        .map(
          (
            item:
              ApiPerformanceData
          ): PerformanceData => ({
            value:
              Number(item.value),
            target:
              Number(item.target),
            category:
              String(
                item.category
              )
          })
        )
        .filter(
          (
            item:
              PerformanceData
          ): boolean =>
            Number.isFinite(
              item.value
            ) &&
            Number.isFinite(
              item.target
            ) &&
            item.category.trim()
              .length > 0
        );

    const bulletChart:
      BulletChart =
      new BulletChart({
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
          20
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    if (statusElement) {
      statusElement.textContent =
        'Performance data loaded.';
    }
  } catch (error: unknown) {
    console.error(
      'Unable to load Bullet Chart data.',
      error
    );

    if (statusElement) {
      statusElement.textContent =
        'Unable to load the performance data.';
    }
  }
}

void loadBulletChartData();
```

### JavaScript Fetch Example

```javascript
var statusElement =
  document.getElementById(
    'bullet-chart-status'
  );

fetch('/api/performance-metrics')
  .then(function (response) {
    if (!response.ok) {
      throw new Error(
        'Request failed with status ' +
        response.status +
        '.'
      );
    }

    return response.json();
  })
  .then(function (responseData) {
    var chartData =
      responseData
        .map(function (item) {
          return {
            value:
              Number(item.value),
            target:
              Number(item.target),
            category:
              String(item.category)
          };
        })
        .filter(function (item) {
          return (
            Number.isFinite(
              item.value
            ) &&
            Number.isFinite(
              item.target
            ) &&
            item.category.trim()
              .length > 0
          );
        });

    var bulletChart =
      new ej.charts.BulletChart({
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
          20
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    if (statusElement) {
      statusElement.textContent =
        'Performance data loaded.';
    }
  })
  .catch(function (error) {
    console.error(
      'Unable to load Bullet Chart data.',
      error
    );

    if (statusElement) {
      statusElement.textContent =
        'Unable to load the performance data.';
    }
  });
```

### Loading and Error Feedback

Provide a persistent status element.

```html
<p
  id="bullet-chart-status"
  aria-live="polite"
  aria-atomic="true"
></p>

<div id="bullet-chart"></div>
```

Do not leave a blank Chart area when loading fails.

## Dynamic Data Updates

### Replace the Data Source

Assign the updated collection and call `refresh()`.

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
      category:
        'Quarter 2 Performance'
    }
  ];

bulletChart.dataSource =
  updatedData;

bulletChart.refresh();
```

Apply all related changes before refreshing.

```typescript
bulletChart.dataSource =
  updatedData;

bulletChart.title =
  'Quarter 2 Performance';

bulletChart.maximum =
  100;

bulletChart.interval =
  20;

bulletChart.refresh();
```

### Update a Single Record

Prefer replacing the record rather than mutating an unknown internal reference.

```typescript
const updatedData:
  PerformanceData[] = [
    {
      value: 92,
      target: 90,
      category:
        'Sales Performance'
    }
  ];

bulletChart.dataSource =
  updatedData;

bulletChart.refresh();
```

For multiple records:

```typescript
function updateMeasure(
  currentData:
    PerformanceData[],
  category: string,
  nextValue: number
): PerformanceData[] {
  if (!Number.isFinite(nextValue)) {
    return currentData;
  }

  return currentData.map(
    (
      item:
        PerformanceData
    ): PerformanceData =>
      item.category === category
        ? {
            ...item,
            value: nextValue
          }
        : item
  );
}
```

### Add and Remove Records

Add a record:

```typescript
const currentData:
  PerformanceData[] =
  bulletChart.dataSource
    as PerformanceData[];

bulletChart.dataSource = [
  ...currentData,
  {
    value: 68,
    target: 80,
    category: 'Team E'
  }
];

bulletChart.refresh();
```

Remove a record:

```typescript
const currentData:
  PerformanceData[] =
  bulletChart.dataSource
    as PerformanceData[];

bulletChart.dataSource =
  currentData.filter(
    (
      item:
        PerformanceData
    ): boolean =>
      item.category !==
        'Team E'
  );

bulletChart.refresh();
```

### Real-Time Updates

Use a reasonable update interval and clear it during cleanup.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const updateInterval: number =
  window.setInterval(
    (): void => {
      const nextValue: number =
        Math.round(
          Math.random() *
          1000
        ) / 10;

      const nextData:
        PerformanceData[] = [
          {
            value: nextValue,
            target: 75,
            category:
              'Live Performance'
          }
        ];

      bulletChart.dataSource =
        nextData;

      bulletChart.refresh();
    },
    5000
  );
```

Do not update the Bullet Chart every animation frame for ordinary dashboard data.

Disable animation for frequent updates:

```typescript
animation: {
  enable: false
}
```

### API Polling

Use a recursive timeout to avoid overlapping requests.

```typescript
let pollingTimer:
  number | undefined;

let isDisposed: boolean =
  false;

async function pollMetric():
  Promise<void> {
  try {
    const response: Response =
      await fetch(
        '/api/current-metric'
      );

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}.`
      );
    }

    const responseData =
      await response.json();

    const value: number =
      Number(
        responseData.value
      );

    const target: number =
      Number(
        responseData.target
      );

    if (
      !Number.isFinite(value) ||
      !Number.isFinite(target)
    ) {
      throw new Error(
        'The performance response contains invalid values.'
      );
    }

    bulletChart.dataSource = [
      {
        value,
        target,
        category:
          String(
            responseData.category ??
            'Current Performance'
          )
      }
    ];

    bulletChart.refresh();
  } catch (error: unknown) {
    console.error(
      'Unable to update the performance metric.',
      error
    );
  } finally {
    if (!isDisposed) {
      pollingTimer =
        window.setTimeout(
          (): void => {
            void pollMetric();
          },
          5000
        );
    }
  }
}

void pollMetric();
```

### Resource Cleanup

```typescript
window.addEventListener(
  'beforeunload',
  (): void => {
    isDisposed = true;

    window.clearInterval(
      updateInterval
    );

    window.clearTimeout(
      pollingTimer
    );

    bulletChart.destroy();
  }
);
```

In a framework, perform equivalent cleanup in the component's unmount or destroy lifecycle.

## Data Label Configuration

Data labels identify the actual value rendered by the feature measure. Enable them through `dataLabel.enable`.

### Enable Data Labels

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
    dataLabel: {
      enable: true
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use:

```typescript
dataLabel: {
  enable: true
}
```

Do not use:

```typescript
dataLabel: {
  visible: true
}
```

The Bullet Chart property is `enable`, not `visible`.

### Customize Data Label Text

Use `dataLabel.labelStyle`.

```typescript
dataLabel: {
  enable: true,
  labelStyle: {
    color: '#242424',
    size: '14px',
    fontFamily:
      'Arial, sans-serif',
    fontStyle: 'Normal',
    fontWeight: '600',
    opacity: 1
  }
}
```

The Bullet Chart documentation supports customization of data-label color, opacity, size, font family, weight, and style through `labelStyle`.

Use:

```typescript
labelStyle: {
  size: '14px'
}
```

Do not use:

```typescript
font: {
  size: '14px'
}
```

### Data Label Formatting

The data label displays the actual value and uses the Bullet Chart's `labelFormat`.

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
    labelFormat: '{value}%',
    dataLabel: {
      enable: true,
      labelStyle: {
        color: '#242424',
        size: '14px',
        fontWeight: '600'
      }
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use `{value}` in the label format.

Examples:

```typescript
labelFormat: '{value}%'
```

```typescript
labelFormat: '₹{value}K'
```

```typescript
labelFormat: '{value}h'
```

A suffix such as `K` does not divide the value automatically. Normalize the bound data before using abbreviated units.

### Data Label Limitations

The documented Bullet Chart data-label model supports:

- `enable`
- `labelStyle` 

It does not expose the following regular Chart-style properties:

```typescript
position
```

```typescript
template
```

```typescript
format
```

```typescript
font
```

```typescript
border
```

```typescript
margin
```

Incorrect:

```typescript
dataLabel: {
  visible: true,
  position: 'Top',
  template:
    '<div>${value}</div>'
}
```

Correct:

```typescript
labelFormat: '{value}%',
dataLabel: {
  enable: true,
  labelStyle: {
    color: '#242424',
    size: '14px'
  }
}
```

Use a tooltip or application-owned text when the interface must display:

- The actual and target together.
- A calculated gap.
- A status message.
- Additional data-source fields.
- Rich HTML.

## Category Label Configuration

### Display Category Labels

Map category text through `categoryField`.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const chartData: PerformanceData[] = [
  {
    value: 85,
    target: 90,
    category: 'Revenue'
  },
  {
    value: 72,
    target: 85,
    category: 'Profit'
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

Category labels appear automatically when `categoryField` maps a valid field.

### Customize Category Labels

Use `categoryLabelStyle`.

```typescript
categoryLabelStyle: {
  size: '14px',
  color: '#2C3E50',
  fontFamily:
    'Arial, sans-serif',
  fontStyle: 'Normal',
  fontWeight: '600',
  opacity: 1
}
```

The Bullet Chart model provides `categoryLabelStyle` for category-value labels.

Use valid font-weight values:

```typescript
fontWeight: '600'
```

or:

```typescript
fontWeight: 'Bold'
```

Use `size`, not `fontSize`.

### Long Category Labels

Use the category label's text-overflow and trimming properties where supported by the installed package version.

```typescript
categoryLabelStyle: {
  size: '13px',
  maximumTitleWidth: 140,
  enableTrim: true,
  textOverflow: 'Trim'
}
```

Alternatively, provide shorter visible labels and preserve the complete text in a nearby table.

```typescript
const chartData = [
  {
    value: 85,
    target: 90,
    category: 'North Region'
  },
  {
    value: 72,
    target: 85,
    category: 'South Region'
  }
];
```

Avoid unexplained abbreviations such as:

```text
Rev
Prf
```

If abbreviations are necessary, define them in visible text.

### Localized Category Labels

Category text comes from the data source. Replace the collection when the interface language changes.

```typescript
const englishData = [
  {
    value: 85,
    target: 90,
    category: 'Revenue'
  },
  {
    value: 72,
    target: 85,
    category: 'Profit'
  }
];

const arabicData = [
  {
    value: 85,
    target: 90,
    category: 'الإيرادات'
  },
  {
    value: 72,
    target: 85,
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

## Conditional Label Content

The standard Bullet Chart data-label model does not expose a documented conditional template or point-render callback.

Do not use an unverified configuration such as:

```typescript
pointRender: (args) => {
  args.label =
    'Target achieved';
}
```

Calculate the status in application data and display it through accessible text.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  status: string;
}

function createPerformanceData(
  value: number,
  target: number,
  category: string
): PerformanceData {
  const status: string =
    value >= target
      ? 'Target achieved'
      : `Behind target by ${
          target - value
        }`;

  return {
    value,
    target,
    category,
    status
  };
}

const chartData:
  PerformanceData[] = [
    createPerformanceData(
      55,
      75,
      'Sales'
    )
  ];
```

Display the status:

```html
<p id="sales-status">
  Sales are behind target by 20 units.
</p>

<div
  id="bullet-chart"
  aria-describedby="sales-status"
></div>
```

For hover content, enable the Bullet Chart tooltip and use its supported `${value}` and `${target}` placeholders.

## Multiple Measures

### Display Multiple Metrics

```typescript
interface MetricData {
  value: number;
  target: number;
  category: string;
  year: number;
}

const chartData: MetricData[] = [
  {
    value: 55,
    target: 75,
    category: 'Revenue',
    year: 2026
  },
  {
    value: 82,
    target: 90,
    category: 'Profit',
    year: 2026
  },
  {
    value: 68,
    target: 80,
    category: 'Growth',
    year: 2026
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
    height: '350px',
    dataLabel: {
      enable: true
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The `year` field is not rendered automatically because it is not mapped.

### Grouped Data

The Bullet Chart displays records as separate measures. It does not automatically group records by an additional field.

Original data:

```typescript
const sourceData = [
  {
    value: 85,
    target: 90,
    quarter: 'Q1',
    department: 'Sales'
  },
  {
    value: 72,
    target: 85,
    quarter: 'Q2',
    department: 'Sales'
  },
  {
    value: 65,
    target: 80,
    quarter: 'Q1',
    department: 'Marketing'
  },
  {
    value: 78,
    target: 88,
    quarter: 'Q2',
    department: 'Marketing'
  }
];
```

Create a combined category:

```typescript
interface GroupedMetric {
  value: number;
  target: number;
  category: string;
}

const chartData:
  GroupedMetric[] =
  sourceData.map(
    (item): GroupedMetric => ({
      value:
        item.value,
      target:
        item.target,
      category:
        `${item.department}, ` +
        `${item.quarter}`
    })
  );
```

Bind it:

```typescript
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

For complex grouped comparisons, consider:

- Separate Bullet Charts by department.
- An application filter.
- A Cartesian grouped Column Chart.
- A semantic table.

### Mixed Units

Do not place values with incompatible units in one Bullet Chart using one shared scale.

Problematic data:

```typescript
const kpiData = [
  {
    value: 92,
    target: 85,
    category: 'Revenue',
    unit: 'Million'
  },
  {
    value: 45,
    target: 50,
    category: 'Growth',
    unit: 'Percent'
  }
];
```

Revenue and percentage growth do not share a meaningful unit or scale.

Create separate Bullet Charts or normalize the metrics to a common indexed score.

## Accessibility

Provide a persistent summary and semantic data table when users need complete access to every value.

```html
<section
  aria-labelledby="performance-heading"
>
  <h1 id="performance-heading">
    Team Performance
  </h1>

  <p id="performance-summary">
    The Bullet Chart compares each team's actual
    performance with its assigned target.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary performance-table-caption"
  ></div>

  <table>
    <caption id="performance-table-caption">
      Team performance values represented in the Bullet Chart
    </caption>

    <thead>
      <tr>
        <th scope="col">Team</th>
        <th scope="col">Actual</th>
        <th scope="col">Target</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">Team A</th>
        <td>85</td>
        <td>90</td>
      </tr>
      <tr>
        <th scope="row">Team B</th>
        <td>65</td>
        <td>80</td>
      </tr>
      <tr>
        <th scope="row">Team C</th>
        <td>72</td>
        <td>78</td>
      </tr>
    </tbody>
  </table>
</section>
```

Data labels and tooltips should not be the only way to access the values.

Ensure that data-label text contrasts with the actual bar and qualitative ranges.

## Complete TypeScript Example

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);

interface TeamPerformance {
  value: number;
  target: number;
  category: string;
  color: string;
}

function getValueColor(
  value: number,
  target: number
): string {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(target) ||
    target <= 0
  ) {
    return '#808080';
  }

  const percentage: number =
    value / target * 100;

  if (percentage >= 100) {
    return '#107C10';
  }

  if (percentage >= 80) {
    return '#C19C00';
  }

  return '#D13438';
}

const sourceData = [
  {
    value: 85,
    target: 90,
    category: 'Team A'
  },
  {
    value: 65,
    target: 80,
    category: 'Team B'
  },
  {
    value: 72,
    target: 78,
    category: 'Team C'
  },
  {
    value: 58,
    target: 75,
    category: 'Team D'
  }
];

let chartData:
  TeamPerformance[] =
  sourceData.map(
    (
      item
    ): TeamPerformance => ({
      ...item,
      color:
        getValueColor(
          item.value,
          item.target
        )
    })
  );

const statusElement:
  HTMLElement | null =
  document.getElementById(
    'bullet-chart-status'
  );

function announceUpdate(
  message: string
): void {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = '';

  window.setTimeout((): void => {
    statusElement.textContent =
      message;
  }, 50);
}

const bulletChart: BulletChart =
  new BulletChart({
    title: 'Team Performance',
    subtitle:
      'Actual values compared with targets',
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueFill: 'color',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}',
    width: '100%',
    height: '420px',
    categoryLabelStyle: {
      color: '#242424',
      size: '14px',
      fontFamily:
        'Segoe UI, sans-serif',
      fontStyle: 'Normal',
      fontWeight: '600',
      opacity: 1
    },
    dataLabel: {
      enable: true,
      labelStyle: {
        color: '#242424',
        size: '13px',
        fontFamily:
          'Segoe UI, sans-serif',
        fontStyle: 'Normal',
        fontWeight: '600',
        opacity: 1
      }
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

const updateButton:
  HTMLButtonElement | null =
  document.getElementById(
    'update-performance'
  ) as HTMLButtonElement | null;

const updatePerformance =
  (): void => {
    const updatedSource = [
      {
        value: 92,
        target: 90,
        category: 'Team A'
      },
      {
        value: 74,
        target: 80,
        category: 'Team B'
      },
      {
        value: 79,
        target: 78,
        category: 'Team C'
      },
      {
        value: 68,
        target: 75,
        category: 'Team D'
      }
    ];

    chartData =
      updatedSource.map(
        (
          item
        ): TeamPerformance => ({
          ...item,
          color:
            getValueColor(
              item.value,
              item.target
            )
        })
      );

    bulletChart.dataSource =
      chartData;

    bulletChart.subtitle =
      'Updated actual values and targets';

    bulletChart.refresh();

    announceUpdate(
      'Team performance values were updated.'
    );
  };

updateButton?.addEventListener(
  'click',
  updatePerformance
);

window.addEventListener(
  'beforeunload',
  (): void => {
    updateButton
      ?.removeEventListener(
        'click',
        updatePerformance
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
    Team Performance
  </h1>

  <p id="performance-summary">
    The Bullet Chart compares each team's actual
    performance with its assigned target.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary performance-table-caption"
  ></div>

  <button
    id="update-performance"
    type="button"
  >
    Update performance
  </button>

  <p
    id="bullet-chart-status"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  ></p>

  <table>
    <caption id="performance-table-caption">
      Initial team performance values
    </caption>

    <thead>
      <tr>
        <th scope="col">Team</th>
        <th scope="col">Actual</th>
        <th scope="col">Target</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">Team A</th>
        <td>85</td>
        <td>90</td>
      </tr>
      <tr>
        <th scope="row">Team B</th>
        <td>65</td>
        <td>80</td>
      </tr>
      <tr>
        <th scope="row">Team C</th>
        <td>72</td>
        <td>78</td>
      </tr>
      <tr>
        <th scope="row">Team D</th>
        <td>58</td>
        <td>75</td>
      </tr>
    </tbody>
  </table>
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

#update-performance {
  min-height: 40px;
  margin-top: 12px;
  padding: 8px 16px;
}

#update-performance:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
    Bullet Chart Data Binding and Labels
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

    #update-performance {
      min-height: 40px;
      margin-top: 12px;
      padding: 8px 16px;
    }

    #update-performance:focus-visible {
      outline: 3px solid #0F6CBD;
      outline-offset: 2px;
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

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
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
      The Bullet Chart compares each team's actual
      performance with its assigned target.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="performance-summary performance-table-caption"
    ></div>

    <button
      id="update-performance"
      type="button"
    >
      Update performance
    </button>

    <p
      id="bullet-chart-status"
      class="visually-hidden"
      aria-live="polite"
      aria-atomic="true"
    ></p>

    <table>
      <caption id="performance-table-caption">
        Initial team performance values
      </caption>

      <thead>
        <tr>
          <th scope="col">Team</th>
          <th scope="col">Actual</th>
          <th scope="col">Target</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th scope="row">Team A</th>
          <td>85</td>
          <td>90</td>
        </tr>
        <tr>
          <th scope="row">Team B</th>
          <td>65</td>
          <td>80</td>
        </tr>
        <tr>
          <th scope="row">Team C</th>
          <td>72</td>
          <td>78</td>
        </tr>
        <tr>
          <th scope="row">Team D</th>
          <td>58</td>
          <td>75</td>
        </tr>
      </tbody>
    </table>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    function getValueColor(
      value,
      target
    ) {
      if (
        !Number.isFinite(value) ||
        !Number.isFinite(target) ||
        target <= 0
      ) {
        return '#808080';
      }

      var percentage =
        value / target * 100;

      if (percentage >= 100) {
        return '#107C10';
      }

      if (percentage >= 80) {
        return '#C19C00';
      }

      return '#D13438';
    }

    function createChartData(
      sourceData
    ) {
      return sourceData.map(
        function (item) {
          return {
            value:
              item.value,
            target:
              item.target,
            category:
              item.category,
            color:
              getValueColor(
                item.value,
                item.target
              )
          };
        }
      );
    }

    var chartData =
      createChartData([
        {
          value: 85,
          target: 90,
          category: 'Team A'
        },
        {
          value: 65,
          target: 80,
          category: 'Team B'
        },
        {
          value: 72,
          target: 78,
          category: 'Team C'
        },
        {
          value: 58,
          target: 75,
          category: 'Team D'
        }
      ]);

    var statusElement =
      document.getElementById(
        'bullet-chart-status'
      );

    function announceUpdate(
      message
    ) {
      if (!statusElement) {
        return;
      }

      statusElement.textContent = '';

      window.setTimeout(
        function () {
          statusElement.textContent =
            message;
        },
        50
      );
    }

    var bulletChart =
      new ej.charts.BulletChart({
        title:
          'Team Performance',
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
        valueFill:
          'color',
        minimum:
          0,
        maximum:
          100,
        interval:
          20,
        labelFormat:
          '{value}',
        width:
          '100%',
        height:
          '420px',
        categoryLabelStyle: {
          color:
            '#242424',
          size:
            '14px',
          fontFamily:
            'Segoe UI, sans-serif',
          fontStyle:
            'Normal',
          fontWeight:
            '600',
          opacity:
            1
        },
        dataLabel: {
          enable:
            true,
          labelStyle: {
            color:
              '#242424',
            size:
              '13px',
            fontFamily:
              'Segoe UI, sans-serif',
            fontStyle:
              'Normal',
            fontWeight:
              '600',
            opacity:
              1
          }
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

    var updateButton =
      document.getElementById(
        'update-performance'
      );

    function updatePerformance() {
      chartData =
        createChartData([
          {
            value: 92,
            target: 90,
            category: 'Team A'
          },
          {
            value: 74,
            target: 80,
            category: 'Team B'
          },
          {
            value: 79,
            target: 78,
            category: 'Team C'
          },
          {
            value: 68,
            target: 75,
            category: 'Team D'
          }
        ]);

      bulletChart.dataSource =
        chartData;

      bulletChart.subtitle =
        'Updated actual values and targets';

      bulletChart.refresh();

      announceUpdate(
        'Team performance values were updated.'
      );
    }

    if (updateButton) {
      updateButton.addEventListener(
        'click',
        updatePerformance
      );
    }

    window.addEventListener(
      'beforeunload',
      function () {
        if (updateButton) {
          updateButton.removeEventListener(
            'click',
            updatePerformance
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

1. **Use consistent mappings:** Keep `valueField`, `targetField`, and `categoryField` consistent across updates.
2. **Validate numeric fields:** Convert external actual and target values to numbers.
3. **Reject invalid records:** Remove or report records containing invalid values.
4. **Use clear categories:** Category labels should identify each measure unambiguously.
5. **Use one unit per Chart:** Do not combine incompatible units in one shared Bullet Chart scale.
6. **Enable labels correctly:** Use `dataLabel.enable`, not `dataLabel.visible`.
7. **Style labels correctly:** Use `dataLabel.labelStyle`.
8. **Format through `labelFormat`:** The actual-value label uses the Bullet Chart scale-label format.
9. **Avoid unsupported templates:** The Bullet Chart data label does not expose a documented template API.
10. **Use tooltip templates for comparison:** Display actual and target values with the Bullet Chart tooltip.
11. **Provide persistent text:** Do not rely only on tooltips or labels.
12. **Use semantic data tables:** Provide complete values when accessibility or detailed comparison is required.
13. **Update once:** Apply all related changes before calling `refresh()`.
14. **Control update frequency:** Avoid unnecessarily frequent real-time refreshes.
15. **Clean up resources:** Clear timers, remove listeners, stop polling, and destroy the Bullet Chart.

## Troubleshooting

### Data Is Not Displayed

- Ensure that `dataSource` contains records.
- Ensure that `valueField` maps an existing field.
- Ensure that `targetField` maps an existing field.
- Ensure that mapped values are finite numbers.
- Ensure that data values fit within `minimum` and `maximum`.
- Ensure that the Bullet Chart host has a resolved size.

### Category Labels Are Missing

- Configure `categoryField`.
- Ensure that the mapped field exists in every record.
- Ensure that category values are not `null` or `undefined`.
- Ensure that category text contrasts with the background.
- Increase the Bullet Chart height for multiple measures.

### Data Labels Are Missing

Use:

```typescript
dataLabel: {
  enable: true
}
```

Do not use:

```typescript
dataLabel: {
  visible: true
}
```

Data labels identify actual values, not target values.

### Data Label Style Is Not Applied

Use:

```typescript
dataLabel: {
  enable: true,
  labelStyle: {
    color: '#242424',
    size: '14px',
    fontWeight: '600'
  }
}
```

Do not configure `font`, `border`, or `margin` inside the Bullet Chart data label.

### Data Label Position Is Not Applied

The documented Bullet Chart data-label model does not expose a `position` property.

Do not use:

```typescript
dataLabel: {
  position: 'Top'
}
```

### Data Label Template Is Not Applied

The documented Bullet Chart data-label model does not expose `template` or `format` properties.

Use:

- `labelFormat` for actual-value formatting.
- The Bullet Chart tooltip template for actual and target details.
- Application-owned text for calculated or conditional content.

### Conditional Label Event Is Not Working

Do not depend on an unverified Bullet Chart `pointRender` event.

Calculate status text before binding and display it in:

- A visible summary.
- A semantic table.
- An ARIA live region.
- An application-owned status element.

### Remote Data Is Not Loaded

- Check the HTTP response status.
- Check the browser Network panel.
- Validate the response schema.
- Convert numeric strings to numbers.
- Handle CORS and authentication failures.
- Show an accessible error message.

### Real-Time Updates Become Slow

- Reduce the update frequency.
- Disable animation.
- Refresh once per update.
- Avoid creating a new Bullet Chart for every update.
- Stop polling when the Chart is removed.
- Clear intervals and timeouts.

### Grouped Data Is Confusing

The Bullet Chart does not automatically group by an additional data field.

- Create a combined category label.
- Filter the data before binding.
- Use separate Bullet Charts.
- Use a grouped Cartesian Chart when side-by-side group comparison is required.

## Related Topics

- See `references/axis-customization.md` for scale and axis labels.
- See `references/title-tooltip-and-interactivity.md` for titles and tooltips.
- See `references/value-bar-and-comparative-bar.md` for actual and target styling.
- See `references/ranges-and-qualitative-scale.md` for performance ranges.
- See `references/getting-started.md` for installation and initial setup.
- See `references/customization-dimensions-and-export.md` for themes, dimensions, export, and printing.