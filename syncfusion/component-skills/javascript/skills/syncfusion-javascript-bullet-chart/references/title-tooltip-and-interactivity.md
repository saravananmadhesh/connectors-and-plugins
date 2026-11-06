# Title, Tooltip & Interactivity

## Table of Contents

- [Title, Tooltip & Interactivity](#title-tooltip--interactivity)
  - [Overview](#overview)
  - [Title Configuration](#title-configuration)
    - [Basic Title](#basic-title)
    - [Title Styling](#title-styling)
    - [Title Overflow](#title-overflow)
    - [HTML in Titles](#html-in-titles)
    - [Hide the Title](#hide-the-title)
  - [Subtitle Configuration](#subtitle-configuration)
    - [Basic Subtitle](#basic-subtitle)
    - [Subtitle Styling](#subtitle-styling)
    - [Subtitle with Additional Information](#subtitle-with-additional-information)
  - [Title Positioning](#title-positioning)
    - [Title and Subtitle Position](#title-and-subtitle-position)
    - [Title and Subtitle Alignment](#title-and-subtitle-alignment)
  - [Tooltip Configuration](#tooltip-configuration)
    - [Enable the Tooltip](#enable-the-tooltip)
    - [Tooltip Format](#tooltip-format)
    - [Tooltip Template](#tooltip-template)
    - [Tooltip Styling](#tooltip-styling)
    - [Calculated Tooltip Content](#calculated-tooltip-content)
    - [Conditional Tooltip Content](#conditional-tooltip-content)
  - [Events and Interactions](#events-and-interactions)
    - [Load Event](#load-event)
    - [Loaded Event](#loaded-event)
    - [Chart Click Event](#chart-click-event)
    - [Before Print Event](#before-print-event)
    - [Dynamic Drill-Down](#dynamic-drill-down)
  - [Unsupported Cartesian Chart Interactions](#unsupported-cartesian-chart-interactions)
  - [Accessibility](#accessibility)
    - [Keyboard Focus](#keyboard-focus)
    - [Screen Reader Description](#screen-reader-description)
    - [Accessible Application Controls](#accessible-application-controls)
    - [Announce Dynamic Updates](#announce-dynamic-updates)
  - [Dynamic Title and Tooltip Updates](#dynamic-title-and-tooltip-updates)
  - [Complete TypeScript Example](#complete-typescript-example)


## Overview

The Bullet Chart supports:

- A primary `title`.
- An optional `subtitle`.
- Title and subtitle styling.
- Combined title and subtitle positioning.
- Tooltips for actual and target values.
- HTML tooltip templates.
- Chart lifecycle events.
- Chart mouse-click handling.
- Dynamic updates.
- Keyboard focus through the Bullet Chart `tabIndex`.
- Right-to-left rendering.
- Accessible surrounding content and application controls.

The Bullet Chart tooltip is configured through `tooltip`. The supported Bullet Chart tooltip properties include `enable`, `fill`, `border`, `textStyle`, and `template`. The `BulletTooltip` module must be injected before enabling it.

The Bullet Chart uses `title`, `subtitle`, `titleStyle`, `subtitleStyle`, and `titlePosition` for title configuration. A single `titlePosition` controls the placement of both the title and subtitle.

## Title Configuration

### Basic Title

Use the `title` property to provide a concise description of the measure.

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
    title: 'Sales Performance',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The title should identify the metric being compared rather than repeat every value in the visualization.

### Title Styling

Use `titleStyle` to customize title text.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    title: 'Sales Performance',
    titleStyle: {
      color: '#2C3E50',
      fontFamily:
        'Arial, sans-serif',
      size: '18px',
      fontStyle: 'Normal',
      fontWeight: '600',
      textAlignment: 'Center',
      opacity: 1
    },
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart label-style model supports properties including:

- `color`
- `fontFamily`
- `fontStyle`
- `fontWeight`
- `size`
- `opacity`
- `textAlignment`
- `maximumTitleWidth`
- `enableTrim`
- `textOverflow`

Use:

```typescript
size: '18px'
```

Do not use:

```typescript
fontSize: '18px'
```

Use:

```typescript
fontWeight: '600'
```

Do not use:

```typescript
fontStyle: 'Bold'
```

Supported text-alignment values include:

- `Left`
- `Center`
- `Right`

### Title Overflow

Use `maximumTitleWidth`, `enableTrim`, and `textOverflow` to handle long titles.

```typescript
titleStyle: {
  size: '18px',
  fontWeight: '600',
  maximumTitleWidth: 280,
  enableTrim: true,
  textOverflow: 'Trim'
}
```

Use a visible surrounding heading or description if important title information cannot fit inside the Bullet Chart.

### HTML in Titles

The Bullet Chart `title` property contains text. Do not place HTML markup inside it.

Incorrect:

```typescript
title:
  '<span style="color: green;">' +
  'Sales Performance' +
  '</span>'
```

Use supported title styling instead:

```typescript
title: 'Sales Performance',
titleStyle: {
  color: '#107C10',
  fontWeight: '600'
}
```

If the application requires rich HTML, create an application-owned heading outside the Bullet Chart.

```html
<h2 class="performance-heading">
  <span class="performance-period">
    Quarter 1, 2026
  </span>
  Sales Performance
</h2>

<div id="bullet-chart"></div>
```

### Hide the Title

The preferred way to hide the title is to omit it or set it to an empty string.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    title: '',
    dataSource: chartData,
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

Do not keep an unnecessary title and hide it only with zero opacity. Hidden text may still occupy layout space or produce confusing semantics.

## Subtitle Configuration

### Basic Subtitle

Use `subtitle` with a lowercase `t`.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    title: 'Sales Performance',
    subtitle: 'January 2026',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart supports additional information through the `subtitle` property.

### Subtitle Styling

Use `subtitleStyle`.

```typescript
subtitleStyle: {
  color: '#5A5A5A',
  fontFamily:
    'Arial, sans-serif',
  size: '14px',
  fontStyle: 'Normal',
  fontWeight: '400',
  textAlignment: 'Center',
  opacity: 0.9
}
```

Use `size`, not `fontSize`.

### Subtitle with Additional Information

A subtitle can summarize the target, actual value, or gap.

```typescript
interface RevenueData {
  value: number;
  target: number;
  category: string;
}

const revenueData: RevenueData[] = [
  {
    value: 82,
    target: 100,
    category: 'Revenue'
  }
];

const actual: number =
  revenueData[0].value;

const target: number =
  revenueData[0].target;

const gap: number =
  target - actual;

const bulletChart: BulletChart =
  new BulletChart({
    title: 'Revenue Growth',
    subtitle:
      `Target: ₹${target}M | ` +
      `Achieved: ₹${actual}M | ` +
      `Gap: ₹${gap}M`,
    subtitleStyle: {
      color: '#5A5A5A',
      size: '13px'
    },
    dataSource: revenueData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 120,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Calculate subtitle values from the same data used by the Bullet Chart so that visible and textual information remain synchronized.

## Title Positioning

### Title and Subtitle Position

Use `titlePosition` to position the title and subtitle together.

Supported positions include:

- `Top`
- `Bottom`
- `Left`
- `Right`

Top example:

```typescript
title: 'Sales Performance',
subtitle: 'Quarter 1, 2026',
titlePosition: 'Top'
```

Bottom example:

```typescript
title: 'Sales Performance',
subtitle: 'Quarter 1, 2026',
titlePosition: 'Bottom'
```

Left example:

```typescript
title: 'Sales Performance',
subtitle: 'Quarter 1, 2026',
titlePosition: 'Left'
```

Right example:

```typescript
title: 'Sales Performance',
subtitle: 'Quarter 1, 2026',
titlePosition: 'Right'
```

Do not use an unsupported `subtitlePosition` property.

Incorrect:

```typescript
titlePosition: 'Top',
subtitlePosition: 'Bottom'
```

Correct:

```typescript
titlePosition: 'Top'
```

The title and subtitle share the configured Bullet Chart title position.

### Title and Subtitle Alignment

Use `textAlignment` inside the corresponding style object.

```typescript
titleStyle: {
  textAlignment: 'Left'
},
subtitleStyle: {
  textAlignment: 'Left'
}
```

Supported alignment values include:

- `Left`
- `Center`
- `Right`

The alignment is applied within the space allocated to the title or subtitle.

## Tooltip Configuration

### Enable the Tooltip

Import and inject `BulletTooltip`.

```typescript
import {
  BulletChart,
  BulletTooltip
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  BulletTooltip
);
```

Enable the tooltip:

```typescript
tooltip: {
  enable: true
}
```

Complete example:

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
    tooltip: {
      enable: true
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The tooltip displays summary information about the actual and target values when users hover over the value bar.

### Tooltip Format

The Bullet Chart-specific tooltip model does not expose the regular Cartesian Chart `format` property. It supports `template` for custom content.

Do not use:

```typescript
tooltip: {
  enable: true,
  format:
    'Actual: ${value}, Target: ${target}'
}
```

Use:

```typescript
tooltip: {
  enable: true,
  template:
    '<div class="bullet-tooltip">' +
    '<strong>Actual:</strong> ${value}<br>' +
    '<strong>Target:</strong> ${target}' +
    '</div>'
}
```

### Tooltip Template

The Bullet Chart tooltip template supports `${value}` and `${target}` placeholders,

```typescript
tooltip: {
  enable: true,
  template:
    '<div class="bullet-tooltip">' +
    '<strong>Sales Performance</strong><br>' +
    '<span>Actual: ${value}</span><br>' +
    '<span>Target: ${target}</span>' +
    '</div>'
}
```

```css
.bullet-tooltip {
  min-width: 140px;
  padding: 8px 10px;
  color: #242424;
  font-family:
    "Segoe UI",
    sans-serif;
  font-size: 12px;
}
```

Use normal HTML inside executable TypeScript or JavaScript.

Correct:

```typescript
template:
  '<strong>Actual:</strong> ${value}'
```

Incorrect:

```typescript
template:
  '<strong>Actual:</strong> ${value}'
```

Do not place unsanitized user content inside a tooltip template.

### Tooltip Styling

Use `fill`, `border`, and `textStyle`.

```typescript
tooltip: {
  enable: true,
  fill: '#2C3E50',
  border: {
    color: '#000000',
    width: 1
  },
  textStyle: {
    color: '#FFFFFF',
    fontFamily:
      'Arial, sans-serif',
    size: '12px',
    fontStyle: 'Normal',
    fontWeight: '400'
  },
  template:
    '<div class="bullet-tooltip-dark">' +
    'Actual: ${value}<br>' +
    'Target: ${target}' +
    '</div>'
}
```

The supported Bullet Chart tooltip appearance properties include `fill`, `border`, and `textStyle`.

Use:

```typescript
fill: '#2C3E50'
```

Do not use:

```typescript
backgroundColor: '#2C3E50'
```

Use:

```typescript
textStyle: {
  size: '12px'
}
```

Do not use:

```typescript
textStyle: {
  fontSize: '12px'
}
```

The Bullet Chart tooltip model does not expose a documented `opacity` property. Use an RGBA color when transparency is required.

```typescript
fill:
  'rgba(44, 62, 80, 0.95)'
```

### Calculated Tooltip Content

The standard Bullet Chart template directly exposes actual and target placeholders. For calculated values such as gap and achievement, calculate those values before binding and use application-owned tooltip text or a nearby summary.

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
  gap: number;
  achievement: string;
}

const actual: number = 55;
const target: number = 75;

const chartData: PerformanceData[] = [
  {
    value: actual,
    target,
    category: 'Sales',
    gap: target - actual,
    achievement:
      `${(
        actual /
        target *
        100
      ).toFixed(1)}%`
  }
];
```

The Bullet Chart tooltip template's documented placeholders are `${value}` and `${target}`. Do not assume arbitrary object fields such as `${category}`, `${gap}`, or `${achievement}` are available unless explicitly validated in the installed version.

Provide calculated context outside the Chart:

```html
<p id="performance-details">
  Actual sales are 55. The target is 75.
  The remaining gap is 20, and achievement is 73.3 percent.
</p>

<div
  id="bullet-chart"
  aria-describedby="performance-details"
></div>
```

### Conditional Tooltip Content

For static Bullet Chart records, prepare a status message before creating the visualization.

```typescript
function getStatus(
  value: number,
  target: number
): string {
  if (
    !Number.isFinite(value) ||
    !Number.isFinite(target)
  ) {
    return 'Performance data is unavailable.';
  }

  if (value >= target) {
    return 'The target has been achieved.';
  }

  return (
    `${target - value} more units ` +
    'are required to reach the target.'
  );
}

const statusMessage: string =
  getStatus(55, 75);
```

Display the result in an accessible text element:

```html
<p id="performance-status"></p>
```

```typescript
const statusElement:
  HTMLElement | null =
  document.getElementById(
    'performance-status'
  );

if (statusElement) {
  statusElement.textContent =
    statusMessage;
}
```

Do not depend on unverified properties such as:

```typescript
args.tooltip.content
```

inside an unverified Bullet Chart `tooltipRender` callback.

## Events and Interactions

The Bullet Chart interaction model is smaller than the regular Cartesian Chart interaction model.

Do not assume that regular Chart events and properties such as `pointRender`, `pointClick`, `pointMove`, `selectionMode`, or `highlightMode` are available on Bullet Chart.

### Load Event

Use the `load` event for initialization-time adjustments that are supported by the event argument and installed package version.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 100,
    interval: 20,
    load: (): void => {
      console.log(
        'Bullet Chart initialization started.'
      );
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Avoid expensive work in lifecycle events.

### Loaded Event

Use `loaded` when application logic must run after rendering completes.

```typescript
const statusElement:
  HTMLElement | null =
  document.getElementById(
    'chart-load-status'
  );

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 100,
    interval: 20,
    loaded: (): void => {
      if (statusElement) {
        statusElement.textContent =
          'The performance Chart is ready.';
      }
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Chart Click Event

Use `bulletChartMouseClick` for Bullet Chart click handling. The Bullet Chart API exposes this event for clicks on the Chart.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 100,
    interval: 20,
    bulletChartMouseClick:
      (args): void => {
        console.log(
          'The Bullet Chart was clicked.',
          args
        );
      }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Do not use an unverified `pointClick` event.

The Bullet Chart click event may not provide the same point-data structure as the Cartesian Chart `pointClick` event. Do not assume that the event argument contains:

```typescript
args.data.category
```

or:

```typescript
args.data.value
```

without validating the installed version's event argument.

### Before Print Event

Use `beforePrint` when print-specific changes are required.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 100,
    interval: 20,
    beforePrint: (): void => {
      console.log(
        'Bullet Chart printing started.'
      );
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart API exposes `beforePrint` before printing begins.

### Dynamic Drill-Down

For reliable drill-down behavior, use an application-owned button or list rather than depending on unverified point-level click data.

```html
<button
  id="show-weekly-data"
  type="button"
>
  Show weekly breakdown
</button>
```

```typescript
interface PerformanceData {
  value: number;
  target: number;
  category: string;
}

const quarterlyData:
  PerformanceData[] = [
    {
      value: 55,
      target: 75,
      category: 'Quarter 1'
    }
  ];

const weeklyData:
  PerformanceData[] = [
    {
      value: 18,
      target: 25,
      category: 'Week 1'
    },
    {
      value: 20,
      target: 25,
      category: 'Week 2'
    },
    {
      value: 17,
      target: 25,
      category: 'Week 3'
    }
  ];

const drillDownButton:
  HTMLButtonElement | null =
  document.getElementById(
    'show-weekly-data'
  ) as HTMLButtonElement | null;

const showWeeklyData = (): void => {
  bulletChart.dataSource =
    weeklyData;

  bulletChart.title =
    'Quarter 1 Sales';

  bulletChart.subtitle =
    'Weekly breakdown';

  bulletChart.maximum =
    30;

  bulletChart.interval =
    5;

  bulletChart.refresh();
};

drillDownButton?.addEventListener(
  'click',
  showWeeklyData
);
```

This approach is keyboard accessible and does not depend on undocumented event-argument fields.

## Unsupported Cartesian Chart Interactions

The following regular Cartesian Chart configurations should not be used with Bullet Chart unless support is explicitly documented for the installed version:

```typescript
pointRender
```

```typescript
pointMove
```

```typescript
pointClick
```

```typescript
selectionMode
```

```typescript
highlightMode
```

```typescript
highlightColor
```

```typescript
allowKeyboardInteraction
```

For data-driven value-bar coloring, map `valueFill` to a data-source field.

```typescript
valueFill: 'color'
```

For interactive filtering, drill-down, and updates, use native application controls.

## Accessibility

### Keyboard Focus

Use the Bullet Chart `tabIndex` to place it in the natural keyboard sequence.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    minimum: 0,
    maximum: 100,
    interval: 20,
    tabIndex: 0
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart model exposes `tabIndex` for keyboard order.

Do not use an unsupported:

```typescript
allowKeyboardInteraction: true
```

Avoid positive tab-index values because they create a separate tab sequence.

### Screen Reader Description

Provide a visible title and summary around the Bullet Chart.

```html
<section
  aria-labelledby="sales-heading"
>
  <h1 id="sales-heading">
    Sales Performance
  </h1>

  <p id="sales-summary">
    Actual sales are 55 units against a target of 75 units.
    The remaining gap is 20 units.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="sales-summary"
  ></div>
</section>
```

Tooltips are useful for pointer and focus interactions, but they are not a replacement for a persistent text alternative.

### Accessible Application Controls

Use native controls for drill-down, updates, printing, and reset operations.

```html
<div
  class="bullet-chart-actions"
  role="group"
  aria-label="Performance Chart actions"
>
  <button
    id="show-weekly-data"
    type="button"
  >
    Show weekly breakdown
  </button>

  <button
    id="reset-chart"
    type="button"
  >
    Reset Chart
  </button>
</div>
```

Native buttons provide keyboard and screen-reader support without custom keyboard handlers.

### Announce Dynamic Updates

Use a persistent ARIA live region.

```html
<p
  id="bullet-chart-status"
  class="visually-hidden"
  aria-live="polite"
  aria-atomic="true"
></p>
```

```css
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

```typescript
const chartStatus:
  HTMLElement | null =
  document.getElementById(
    'bullet-chart-status'
  );

function announceUpdate(
  message: string
): void {
  if (!chartStatus) {
    return;
  }

  chartStatus.textContent = '';

  window.setTimeout((): void => {
    chartStatus.textContent =
      message;
  }, 50);
}
```

After updating the Bullet Chart:

```typescript
bulletChart.dataSource =
  updatedData;

bulletChart.refresh();

announceUpdate(
  'The Bullet Chart was updated. ' +
  'The current value is 72 and the target is 85.'
);
```

## Dynamic Title and Tooltip Updates

Update supported properties and refresh once.

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

bulletChart.title =
  'Quarter 2 Performance';

bulletChart.subtitle =
  'Updated actual and target values';

bulletChart.tooltip = {
  enable: true,
  fill: '#2C3E50',
  border: {
    color: '#000000',
    width: 1
  },
  textStyle: {
    color: '#FFFFFF',
    size: '12px'
  },
  template:
    '<div class="bullet-tooltip-dark">' +
    'Actual: ${value}<br>' +
    'Target: ${target}' +
    '</div>'
};

bulletChart.refresh();
```

Apply all related changes before calling `refresh()`.

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

  if (percentage >= 100) {
    return '#107C10';
  }

  if (percentage >= 80) {
    return '#C19C00';
  }

  return '#D13438';
}

function createPerformanceData(
  value: number,
  target: number,
  category: string
): PerformanceData {
  return {
    value,
    target,
    category,
    color:
      getPerformanceColor(
        value,
        target
      )
  };
}

const summaryData:
  PerformanceData[] = [
    createPerformanceData(
      55,
      75,
      'Sales'
    )
  ];

const weeklyData:
  PerformanceData[] = [
    createPerformanceData(
      18,
      25,
      'Week 1'
    ),
    createPerformanceData(
      20,
      25,
      'Week 2'
    ),
    createPerformanceData(
      17,
      25,
      'Week 3'
    )
  ];

const summaryText:
  HTMLElement | null =
  document.getElementById(
    'performance-summary'
  );

const liveRegion:
  HTMLElement | null =
  document.getElementById(
    'bullet-chart-status'
  );

function announceUpdate(
  message: string
): void {
  if (!liveRegion) {
    return;
  }

  liveRegion.textContent = '';

  window.setTimeout((): void => {
    liveRegion.textContent =
      message;
  }, 50);
}

const bulletChart: BulletChart =
  new BulletChart({
    title: 'Sales Performance',
    subtitle:
      'Actual value compared with target',
    titlePosition: 'Top',
    titleStyle: {
      color: '#1F4E79',
      fontFamily:
        'Segoe UI, sans-serif',
      size: '18px',
      fontStyle: 'Normal',
      fontWeight: '600',
      textAlignment: 'Center',
      opacity: 1
    },
    subtitleStyle: {
      color: '#5A5A5A',
      fontFamily:
        'Segoe UI, sans-serif',
      size: '13px',
      fontStyle: 'Normal',
      fontWeight: '400',
      textAlignment: 'Center',
      opacity: 1
    },
    dataSource: summaryData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    valueFill: 'color',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}',
    width: '100%',
    height: '400px',
    tabIndex: 0,
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
      enable: true,
      fill:
        'rgba(44, 62, 80, 0.96)',
      border: {
        color: '#000000',
        width: 1
      },
      textStyle: {
        color: '#FFFFFF',
        fontFamily:
          'Segoe UI, sans-serif',
        size: '12px',
        fontWeight: '400'
      },
      template:
        '<div class="bullet-tooltip">' +
        '<strong>Performance</strong><br>' +
        'Actual: ${value}<br>' +
        'Target: ${target}' +
        '</div>'
    },
    loaded: (): void => {
      announceUpdate(
        'The Sales Performance Chart is ready.'
      );
    },
    bulletChartMouseClick:
      (args): void => {
        console.log(
          'Bullet Chart click:',
          args
        );
      }
  });

bulletChart.appendTo(
  '#bullet-chart'
);

const showWeeklyButton:
  HTMLButtonElement | null =
  document.getElementById(
    'show-weekly'
  ) as HTMLButtonElement | null;

const resetButton:
  HTMLButtonElement | null =
  document.getElementById(
    'reset-chart'
  ) as HTMLButtonElement | null;

const showWeeklyData = (): void => {
  bulletChart.dataSource =
    weeklyData;

  bulletChart.title =
    'Quarter 1 Sales';

  bulletChart.subtitle =
    'Weekly breakdown';

  bulletChart.maximum =
    30;

  bulletChart.interval =
    5;

  bulletChart.refresh();

  if (summaryText) {
    summaryText.textContent =
      'Weekly sales are 18, 20, and 17 units, ' +
      'with a target of 25 units for each week.';
  }

  announceUpdate(
    'The Chart now shows the weekly Quarter 1 breakdown.'
  );
};

const resetChart = (): void => {
  bulletChart.dataSource =
    summaryData;

  bulletChart.title =
    'Sales Performance';

  bulletChart.subtitle =
    'Actual value compared with target';

  bulletChart.maximum =
    100;

  bulletChart.interval =
    20;

  bulletChart.refresh();

  if (summaryText) {
    summaryText.textContent =
      'Actual sales are 55 units against a target ' +
      'of 75 units. The remaining gap is 20 units.';
  }

  announceUpdate(
    'The Sales Performance Chart was reset.'
  );
};

showWeeklyButton?.addEventListener(
  'click',
  showWeeklyData
);

resetButton?.addEventListener(
  'click',
  resetChart
);

window.addEventListener(
  'beforeunload',
  (): void => {
    showWeeklyButton
      ?.removeEventListener(
        'click',
        showWeeklyData
      );

    resetButton
      ?.removeEventListener(
        'click',
        resetChart
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
    Sales Performance
  </h1>

  <p id="performance-summary">
    Actual sales are 55 units against a target
    of 75 units. The remaining gap is 20 units.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary"
  ></div>

  <div
    class="bullet-chart-actions"
    role="group"
    aria-label="Performance Chart actions"
  >
    <button
      id="show-weekly"
      type="button"
    >
      Show weekly breakdown
    </button>

    <button
      id="reset-chart"
      type="button"
    >
      Reset Chart
    </button>
  </div>

  <p
    id="bullet-chart-status"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  ></p>
</section>
```

**CSS:**

```css
#bullet-chart {
  width: 100%;
  min-height: 400px;
}

.bullet-tooltip {
  min-width: 140px;
  padding: 8px 10px;
}

.bullet-chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.bullet-chart-actions button {
  min-height: 40px;
  padding: 8px 16px;
}

.bullet-chart-actions button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
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
    Bullet Chart Title and Tooltip
  </title>

  <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

  <style>
    #bullet-chart {
      width: 100%;
      min-height: 400px;
    }

    .bullet-tooltip {
      min-width: 140px;
      padding: 8px 10px;
    }

    .bullet-chart-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .bullet-chart-actions button {
      min-height: 40px;
      padding: 8px 16px;
    }

    .bullet-chart-actions button:focus-visible {
      outline: 3px solid #0F6CBD;
      outline-offset: 2px;
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
      Sales Performance
    </h1>

    <p id="performance-summary">
      Actual sales are 55 units against a target
      of 75 units. The remaining gap is 20 units.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="performance-summary"
    ></div>

    <div
      class="bullet-chart-actions"
      role="group"
      aria-label="Performance Chart actions"
    >
      <button
        id="show-weekly"
        type="button"
      >
        Show weekly breakdown
      </button>

      <button
        id="reset-chart"
        type="button"
      >
        Reset Chart
      </button>
    </div>

    <p
      id="bullet-chart-status"
      class="visually-hidden"
      aria-live="polite"
      aria-atomic="true"
    ></p>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    function getPerformanceColor(
      actual,
      target
    ) {
      if (
        !Number.isFinite(actual) ||
        !Number.isFinite(target) ||
        target <= 0
      ) {
        return '#808080';
      }

      var percentage =
        actual / target * 100;

      if (percentage >= 100) {
        return '#107C10';
      }

      if (percentage >= 80) {
        return '#C19C00';
      }

      return '#D13438';
    }

    function createPerformanceData(
      value,
      target,
      category
    ) {
      return {
        value: value,
        target: target,
        category: category,
        color:
          getPerformanceColor(
            value,
            target
          )
      };
    }

    var summaryData = [
      createPerformanceData(
        55,
        75,
        'Sales'
      )
    ];

    var weeklyData = [
      createPerformanceData(
        18,
        25,
        'Week 1'
      ),
      createPerformanceData(
        20,
        25,
        'Week 2'
      ),
      createPerformanceData(
        17,
        25,
        'Week 3'
      )
    ];

    var summaryText =
      document.getElementById(
        'performance-summary'
      );

    var liveRegion =
      document.getElementById(
        'bullet-chart-status'
      );

    function announceUpdate(
      message
    ) {
      if (!liveRegion) {
        return;
      }

      liveRegion.textContent = '';

      window.setTimeout(
        function () {
          liveRegion.textContent =
            message;
        },
        50
      );
    }

    var bulletChart =
      new ej.charts.BulletChart({
        title:
          'Sales Performance',
        subtitle:
          'Actual value compared with target',
        titlePosition:
          'Top',
        titleStyle: {
          color:
            '#1F4E79',
          fontFamily:
            'Segoe UI, sans-serif',
          size:
            '18px',
          fontStyle:
            'Normal',
          fontWeight:
            '600',
          textAlignment:
            'Center',
          opacity:
            1
        },
        subtitleStyle: {
          color:
            '#5A5A5A',
          fontFamily:
            'Segoe UI, sans-serif',
          size:
            '13px',
          fontStyle:
            'Normal',
          fontWeight:
            '400',
          textAlignment:
            'Center',
          opacity:
            1
        },
        dataSource:
          summaryData,
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
          '400px',
        tabIndex:
          0,
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
            true,
          fill:
            'rgba(44, 62, 80, 0.96)',
          border: {
            color:
              '#000000',
            width:
              1
          },
          textStyle: {
            color:
              '#FFFFFF',
            fontFamily:
              'Segoe UI, sans-serif',
            size:
              '12px',
            fontWeight:
              '400'
          },
          template:
            '<div class="bullet-tooltip">' +
            '<strong>Performance</strong><br>' +
            'Actual: ${value}<br>' +
            'Target: ${target}' +
            '</div>'
        },
        loaded:
          function () {
            announceUpdate(
              'The Sales Performance Chart is ready.'
            );
          },
        bulletChartMouseClick:
          function (args) {
            console.log(
              'Bullet Chart click:',
              args
            );
          }
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    var showWeeklyButton =
      document.getElementById(
        'show-weekly'
      );

    var resetButton =
      document.getElementById(
        'reset-chart'
      );

    function showWeeklyData() {
      bulletChart.dataSource =
        weeklyData;

      bulletChart.title =
        'Quarter 1 Sales';

      bulletChart.subtitle =
        'Weekly breakdown';

      bulletChart.maximum =
        30;

      bulletChart.interval =
        5;

      bulletChart.refresh();

      if (summaryText) {
        summaryText.textContent =
          'Weekly sales are 18, 20, and 17 units, ' +
          'with a target of 25 units for each week.';
      }

      announceUpdate(
        'The Chart now shows the weekly Quarter 1 breakdown.'
      );
    }

    function resetChart() {
      bulletChart.dataSource =
        summaryData;

      bulletChart.title =
        'Sales Performance';

      bulletChart.subtitle =
        'Actual value compared with target';

      bulletChart.maximum =
        100;

      bulletChart.interval =
        20;

      bulletChart.refresh();

      if (summaryText) {
        summaryText.textContent =
          'Actual sales are 55 units against a target ' +
          'of 75 units. The remaining gap is 20 units.';
      }

      announceUpdate(
        'The Sales Performance Chart was reset.'
      );
    }

    if (showWeeklyButton) {
      showWeeklyButton.addEventListener(
        'click',
        showWeeklyData
      );
    }

    if (resetButton) {
      resetButton.addEventListener(
        'click',
        resetChart
      );
    }

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

1. **Use a meaningful title:** Identify the metric being compared.
2. **Keep subtitles concise:** Use the subtitle for the reporting period, unit, or short comparison context.
3. **Use supported style properties:** Use `size`, `fontWeight`, `textAlignment`, and `opacity`.
4. **Do not use HTML in the title:** Use an application-owned heading for rich markup.
5. **Use one title position:** `titlePosition` controls both title and subtitle.
6. **Inject the tooltip module:** Inject `BulletTooltip` before enabling the tooltip.
7. **Use tooltip templates:** The Bullet Chart uses `template` rather than the regular Chart `format` property.
8. **Use documented placeholders:** Use `${value}` and `${target}`.
9. **Use template HTML safely:** Do not insert unsanitized user content.
10. **Provide persistent text:** Tooltips must not be the only way to access important data.
11. **Use native controls:** Use buttons for drill-down, reset, export, and print operations.
12. **Use a live region:** Announce important dynamic updates.
13. **Avoid unsupported regular Chart APIs:** Do not use Cartesian selection, highlight, or point events with Bullet Chart.
14. **Update efficiently:** Apply all changes before calling `refresh()`.
15. **Clean up resources:** Remove application-owned listeners and destroy the Bullet Chart.

## Troubleshooting

### Title Is Not Displayed

- Ensure that `title` contains text.
- Ensure that the Bullet Chart has enough space.
- Check `titleStyle.opacity`.
- Check `titleStyle.maximumTitleWidth`.
- Check `titleStyle.textOverflow`.
- Ensure that the title color contrasts with the background.

### Title Style Is Not Applied

- Use `titleStyle`.
- Use `size`, not `fontSize`.
- Use `fontWeight`, not `fontStyle: 'Bold'`.
- Use `Left`, `Center`, or `Right` for `textAlignment`.
- Use valid CSS color and font values.

### Subtitle Is Not Displayed

- Use `subtitle` with a lowercase `t`.
- Use `subtitleStyle` for appearance.
- Ensure that sufficient space is available.
- Ensure that subtitle text contrasts with the background.

### Title Position Is Incorrect

- Use `titlePosition`.
- Use `Top`, `Bottom`, `Left`, or `Right`.
- Do not use an unsupported `subtitlePosition`.
- Remember that title and subtitle share the configured position.

### Tooltip Is Not Displayed

- Import and inject `BulletTooltip`.
- Set `tooltip.enable` to `true`.
- Ensure that the value bar is visible.
- Ensure that the host is not covered by another element.
- Ensure that pointer events are enabled.

### Tooltip Format Is Not Applied

The Bullet Chart-specific tooltip does not use the regular Cartesian Chart `format` property.

Use:

```typescript
tooltip: {
  enable: true,
  template:
    'Actual: ${value}<br>' +
    'Target: ${target}'
}
```

### Tooltip Background Is Not Applied

Use:

```typescript
tooltip: {
  fill: '#2C3E50'
}
```

Do not use:

```typescript
backgroundColor: '#2C3E50'
```

### Tooltip Font Size Is Not Applied

Use:

```typescript
textStyle: {
  size: '12px'
}
```

Do not use:

```typescript
textStyle: {
  fontSize: '12px'
}
```

### Tooltip Opacity Is Not Applied

The Bullet Chart tooltip model does not expose a documented `opacity` property.

Use an RGBA fill:

```typescript
fill:
  'rgba(44, 62, 80, 0.95)'
```

### Point Events Are Not Working

Do not use regular Cartesian Chart events such as:

```typescript
pointRender
```

```typescript
pointMove
```

```typescript
pointClick
```

Use:

- Data-driven `valueFill` for conditional colors.
- `bulletChartMouseClick` for Chart click handling.
- Application-owned buttons for reliable drill-down.
- `loaded` for post-render logic.

### Selection or Highlight Is Not Working

Bullet Chart does not use the regular Cartesian Chart selection and highlight configuration.

Do not use:

```typescript
selectionMode
```

```typescript
highlightMode
```

```typescript
highlightColor
```

Use native application controls and accessible status text for interactive workflows.

### Keyboard Interaction Is Not Working

- Use `tabIndex: 0`.
- Ensure that no overlay blocks the Bullet Chart.
- Use native buttons for application actions.
- Do not use an unsupported `allowKeyboardInteraction` property.
- Preserve visible focus styling on surrounding controls.

## Related Topics

- See `references/data-binding-and-labels.md` for data mapping and labels.
- See `references/value-bar-and-comparative-bar.md` for actual and target styling.
- See `references/axis-customization.md` for scale, labels, and ticks.
- See `references/customization-dimensions-and-export.md` for dimensions, themes, export, and printing.
