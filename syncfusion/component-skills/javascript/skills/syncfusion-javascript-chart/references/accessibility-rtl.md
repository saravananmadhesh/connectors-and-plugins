# Accessibility & RTL Support

## Table of Contents

- [Accessibility & RTL Support](#accessibility--rtl-support)
  - [Overview](#overview)
  - [WCAG Compliance](#wcag-compliance)
    - [Accessibility Standards](#accessibility-standards)
    - [Core Accessibility Configuration](#core-accessibility-configuration)
    - [Series Accessibility](#series-accessibility)
    - [Semantic HTML](#semantic-html)
    - [Accessible Data Table](#accessible-data-table)
  - [Keyboard Navigation](#keyboard-navigation)
    - [Built-In Keyboard Shortcuts](#built-in-keyboard-shortcuts)
    - [Focus Customization](#focus-customization)
    - [Application-Owned Controls](#application-owned-controls)
    - [Tab Order](#tab-order)
  - [Screen Reader Support](#screen-reader-support)
    - [Chart Description](#chart-description)
    - [Text Summary](#text-summary)
    - [Announcing Dynamic Updates](#announcing-dynamic-updates)
  - [Color and Contrast](#color-and-contrast)
    - [Contrast Requirements](#contrast-requirements)
    - [Colorblind-Friendly Design](#colorblind-friendly-design)
    - [Selection Patterns](#selection-patterns)
    - [Font Readability](#font-readability)
  - [RTL Language Support](#rtl-language-support)
    - [Enable RTL Mode](#enable-rtl-mode)
    - [Document Direction](#document-direction)
    - [RTL Axis and Legend Configuration](#rtl-axis-and-legend-configuration)
    - [Dynamic Language Switching](#dynamic-language-switching)
  - [Complete Accessible Chart Example](#complete-accessible-chart-example)
  - [Complete RTL Chart Example](#complete-rtl-chart-example)
  - [Best Practices Checklist](#best-practices-checklist)
  - [Troubleshooting](#troubleshooting)
    - [Chart Is Not Announced](#chart-is-not-announced)
    - [Chart Cannot Receive Keyboard Focus](#chart-cannot-receive-keyboard-focus)
    - [Keyboard Navigation Is Not Working](#keyboard-navigation-is-not-working)
    - [Focus Border Is Not Visible](#focus-border-is-not-visible)
    - [Screen Reader Does Not Announce Updates](#screen-reader-does-not-announce-updates)


## Overview

The EJ2 Chart supports accessibility through WAI-ARIA semantics, keyboard navigation, screen-reader descriptions, visible focus indicators, accessible series configuration, high-contrast themes, right-to-left rendering, and application-level text alternatives.

The Chart follows accessibility standards and guidelines including ADA, Section 508, WCAG 2.2, and WAI-ARIA. It uses roles and attributes such as `img`, `button`, `region`, `aria-label`, `aria-hidden`, and `aria-pressed`.

Accessibility requires more than enabling a tooltip. An accessible Chart should provide:

- A meaningful visible title.
- A concise Chart description.
- Keyboard access.
- A visible focus indicator.
- Meaningful descriptions for series and points.
- Sufficient text and UI contrast.
- Information that is not communicated through color alone.
- A text summary.
- A semantic data table when users need every value.
- Announcements for important dynamic changes.
- Accessible controls for export, printing, filtering, and resetting.
- Right-to-left rendering when required by the selected language.

## WCAG Compliance

### Accessibility Standards

The EJ2 Chart documents support for:

- ADA.
- Section 508.
- WCAG 2.2.
- WAI-ARIA.
- Screen readers.
- Keyboard navigation.
- Right-to-left layouts.
- Color contrast.
- Mobile devices.
- Automated accessibility-checker and axe-core validation.

Application-level accessibility must still be validated against the complete page and workflow. A component's built-in support does not automatically make the complete application conformant.

### Core Accessibility Configuration

The Chart exposes an `accessibility` object with the following properties:

- `accessibilityDescription`
- `accessibilityRole`
- `focusable`
- `tabIndex`

The Chart also exposes focus-border properties:

- `focusBorderColor`
- `focusBorderWidth`
- `focusBorderMargin`

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

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  {
    month: 'January',
    sales: 35
  },
  {
    month: 'February',
    sales: 28
  },
  {
    month: 'March',
    sales: 34
  },
  {
    month: 'April',
    sales: 48
  }
];

const chart: Chart = new Chart({
  title: 'Sales Performance',
  subTitle: 'Monthly revenue for 2026',
  accessibility: {
    accessibilityDescription:
      'Line chart showing monthly sales. ' +
      'April has the highest value at 48 thousand, ' +
      'and February has the lowest value at 28 thousand.',
    accessibilityRole: 'img',
    focusable: true,
    tabIndex: 0
  },
  focusBorderColor: '#0F6CBD',
  focusBorderWidth: 3,
  focusBorderMargin: 2,
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    title: 'Revenue in thousands',
    labelFormat: '₹{value}K'
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line',
      name: 'Sales'
    }
  ]
});

chart.appendTo('#chart');
```

Use an appropriate accessibility role supported by the application and assistive-technology strategy.

Do not add an unnecessary second focus target to the host element if the Chart already manages focus through its accessibility configuration.

### Series Accessibility

Series can define accessibility information for the series and its data points.

```typescript
series: [
  {
    dataSource: chartData,
    xName: 'month',
    yName: 'sales',
    type: 'Line',
    name: 'Sales',
    accessibility: {
      accessibilityDescription:
        'Monthly sales series',
      accessibilityDescriptionFormat:
        '${series.name}, ${point.x}, ' +
        '${point.y} thousand rupees',
      accessibilityRole: 'img',
      focusable: true,
      tabIndex: 0
    }
  }
]
```

Series accessibility supports descriptions, point-description formats, roles, focusability, and tab order. Point-description formats can include series and point placeholders, with financial placeholders available when supported by the series type.

Keep descriptions concise. Repeating a long sentence for every point can make keyboard and screen-reader navigation inefficient.

### Semantic HTML

Use semantic HTML to provide context around the Chart.

```html
<article aria-labelledby="sales-heading">
  <h2 id="sales-heading">
    Sales Performance
  </h2>

  <p id="sales-summary">
    Monthly revenue increased overall. April recorded
    the highest value at ₹48,000, while February recorded
    the lowest value at ₹28,000.
  </p>

  <div
    id="chart"
    aria-describedby="sales-summary sales-table-caption"
  ></div>
</article>
```

Avoid assigning `role="img"` manually to the host when the Chart's `accessibilityRole` already produces the required semantic role. Duplicate or conflicting semantics can create confusing announcements.

### Accessible Data Table

Provide a semantic data table when users need access to every value.

```html
<table>
  <caption id="sales-table-caption">
    Monthly sales values represented in the Chart
  </caption>

  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>₹35,000</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>₹28,000</td>
    </tr>
    <tr>
      <th scope="row">March</th>
      <td>₹34,000</td>
    </tr>
    <tr>
      <th scope="row">April</th>
      <td>₹48,000</td>
    </tr>
  </tbody>
</table>
```

Do not hide the only accessible data alternative with `aria-hidden="true"` or visually remove it without a supported visually-hidden technique.

## Keyboard Navigation

The Chart provides built-in keyboard navigation. Do not replace it with custom handlers unless the application has a validated requirement that the built-in behavior cannot satisfy.

### Built-In Keyboard Shortcuts

Documented Chart keyboard interactions include:

- `Alt + J`: Moves focus to the Chart.
- `Tab`: Moves focus to the next interactive Chart element.
- `Shift + Tab`: Moves focus to the previous interactive Chart element.
- `Down Arrow`: Moves focus to the point on the left.
- `Up Arrow`: Moves focus to the point on the right.
- `Left Arrow`: Moves focus to the next series.
- `Right Arrow`: Moves focus to the previous series.
- `Escape`: Closes the point tooltip.
- `Enter` or `Space`: Selects the focused data point.
- `Down Arrow` or `Left Arrow` on a legend: Moves focus to the legend item on the left.
- `Up Arrow` or `Right Arrow` on a legend: Moves focus to the legend item on the right.
- `Enter` or `Space` on a legend item: Toggles the corresponding series.
- `Ctrl + +`: Zooms in.
- `Ctrl + -`: Zooms out.
- `Down Arrow` or `Up Arrow` in panning mode: Pans vertically.
- `Left Arrow` or `Right Arrow` in panning mode: Pans horizontally.
- `R`: Resets the zoomed Chart.
- `Ctrl + P`: Prints the Chart.

The action performed by an arrow key depends on the focused Chart element and active interaction mode.

Do not implement custom `ArrowLeft`, `ArrowRight`, `Enter`, or `Space` handlers that override the built-in behavior unless they preserve the complete supported keyboard interaction.

### Focus Customization

Use the Chart accessibility and focus-border properties.

```typescript
const chart: Chart = new Chart({
  accessibility: {
    accessibilityDescription:
      'Line chart showing monthly sales.',
    accessibilityRole: 'img',
    focusable: true,
    tabIndex: 0
  },
  focusBorderColor: '#0F6CBD',
  focusBorderWidth: 3,
  focusBorderMargin: 2,
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Line'
    }
  ]
});

chart.appendTo('#chart');
```

Ensure that the focus border has sufficient contrast against the Chart background.

### Application-Owned Controls

Use native buttons for application actions.

```html
<div
  class="chart-actions"
  role="group"
  aria-label="Chart actions"
>
  <button id="export-chart" type="button">
    Export Chart
  </button>

  <button id="print-chart" type="button">
    Print Chart
  </button>

  <button id="reset-chart" type="button">
    Reset view
  </button>
</div>
```

Native buttons provide keyboard interaction and semantics without requiring custom key handlers.

```typescript
const resetButton:
  HTMLButtonElement | null =
  document.getElementById(
    'reset-chart'
  ) as HTMLButtonElement | null;

const resetChart = (): void => {
  chart.primaryXAxis.zoomFactor = 1;
  chart.primaryXAxis.zoomPosition = 0;
  chart.primaryYAxis.zoomFactor = 1;
  chart.primaryYAxis.zoomPosition = 0;
  chart.refresh();
};

resetButton?.addEventListener(
  'click',
  resetChart
);
```

Do not invoke `zoomComplete` as a method. It is an event callback, not a zoom API.

### Tab Order

Use the natural DOM order.

```html
<div class="chart-actions">
  <button id="export-chart" type="button">
    Export Chart
  </button>

  <button id="print-chart" type="button">
    Print Chart
  </button>

  <button id="reset-chart" type="button">
    Reset view
  </button>
</div>

<div id="chart"></div>
```

Do not assign positive `tabindex` values such as `1`, `2`, `3`, or `4`. Positive values create a separate tab sequence that is difficult to maintain.

Use:

- `tabindex="0"` when an application-owned element must participate in the natural tab order.
- `tabindex="-1"` when it must be focusable programmatically but not through normal tab navigation.

For the Chart itself, prefer `accessibility.tabIndex`.

## Screen Reader Support

### Chart Description

Use `accessibility.accessibilityDescription` for the Chart's main accessible description.

```typescript
accessibility: {
  accessibilityDescription:
    'Column chart showing quarterly revenue. ' +
    'Revenue increased from 35 thousand in Quarter 1 ' +
    'to 48 thousand in Quarter 4.',
  accessibilityRole: 'img',
  focusable: true,
  tabIndex: 0
}
```

The accessibility model provides description, role, focusability, and tab-index properties for screen-reader and keyboard support.

### Text Summary

Provide a visible summary that explains the important conclusion rather than repeating every point.

```html
<p id="chart-summary">
  Sales increased overall during the period. April had
  the highest value at ₹48,000, and February had the
  lowest value at ₹28,000.
</p>

<div
  id="chart"
  aria-describedby="chart-summary"
></div>
```

A useful summary should explain:

- What the Chart represents.
- The measurement unit.
- The most important trend or comparison.
- The highest or lowest value when relevant.
- Where the complete tabular data is available.

### Announcing Dynamic Updates

Use a persistent ARIA live region.

```html
<p
  id="chart-status"
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
interface SalesData {
  month: string;
  sales: number;
}

const statusElement: HTMLElement | null =
  document.getElementById(
    'chart-status'
  );

function announceChartUpdate(
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

function updateChartData(
  nextData: SalesData[]
): void {
  const validData: SalesData[] =
    nextData.filter(
      (item: SalesData): boolean =>
        item.month.trim().length > 0 &&
        Number.isFinite(item.sales)
    );

  chart.series[0].dataSource =
    validData;

  chart.refresh();

  if (validData.length === 0) {
    announceChartUpdate(
      'The Chart was updated and contains no data.'
    );

    return;
  }

  const maximumPoint: SalesData =
    validData.reduce(
      (
        currentMaximum: SalesData,
        item: SalesData
      ): SalesData =>
        item.sales >
        currentMaximum.sales
          ? item
          : currentMaximum
    );

  announceChartUpdate(
    `The Chart was updated. ` +
    `The highest value is ${maximumPoint.sales} ` +
    `in ${maximumPoint.month}.`
  );
}
```

Do not create and remove a live region for every announcement. A persistent live region is more reliable and avoids unnecessary DOM changes.

Do not announce every render event or pointer movement. Announce only meaningful application state changes.

## Color and Contrast

### Contrast Requirements

Use colors that meet the required WCAG contrast for their purpose:

- Normal text should generally provide at least a 4.5:1 contrast ratio.
- Large text should generally provide at least a 3:1 contrast ratio.
- Focus indicators and meaningful UI graphics should generally provide at least a 3:1 contrast ratio against adjacent colors.

Contrast must be measured. Do not use a placeholder function that always returns `true`.

```typescript
const accessiblePalettes: string[] = [
  '#005A9C',
  '#A23E00',
  '#117A37',
  '#7A3E9D',
  '#6B5500'
];

const chart: Chart = new Chart({
  palettes: accessiblePalettes,
  background: '#FFFFFF',
  titleStyle: {
    color: '#1A1A1A',
    fontStyle: 'Normal',
    fontWeight: '600',
    size: '18px'
  },
  primaryXAxis: {
    labelStyle: {
      color: '#242424',
      size: '12px'
    }
  },
  primaryYAxis: {
    labelStyle: {
      color: '#242424',
      size: '12px'
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

Use `palettes`, not `palette`.

Use `fontWeight` for bold text. Do not use `fontStyle: 'Bold'`.

### Colorblind-Friendly Design

Use colors with differences in hue and lightness.

```typescript
const colorblindFriendlyPalettes:
  string[] = [
    '#0072B2',
    '#E69F00',
    '#009E73',
    '#CC79A7',
    '#D55E00',
    '#56B4E9'
  ];
```

Apply them through:

```typescript
palettes:
  colorblindFriendlyPalettes
```

Do not differentiate important series only with red and green.

Also use:

- Series names.
- Marker shapes.
- Line dash patterns.
- Data labels.
- Tooltips.
- Direct annotations.
- Tabular data.

### Selection Patterns

Use `selectionPattern` for additional visual distinction during selection.

```typescript
import {
  Chart,
  ColumnSeries,
  Selection
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Selection
);

const chart: Chart = new Chart({
  selectionMode: 'Point',
  isMultiSelect: true,
  selectionPattern: 'DiagonalForward',
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

Do not use an unsupported `customSeries` collection to define patterns.

Selection patterns apply to selected elements. They are not a replacement for permanently distinguishable series styling.

### Font Readability

Use readable font sizes and allow zooming.

```typescript
titleStyle: {
  size: '18px',
  fontFamily:
    'Arial, sans-serif',
  fontWeight: '600'
},
legendSettings: {
  visible: true,
  textStyle: {
    size: '13px',
    fontFamily:
      'Arial, sans-serif'
  }
}
```

Do not use `legend`; use `legendSettings`.

Do not use an unverified `letterSpacing` property unless supported by the targeted Chart text-style API.

Avoid enforcing a fixed minimum font size without testing the complete layout. Text must remain usable at browser zoom levels and across supported viewports.

## RTL Language Support

### Enable RTL Mode

Set the Chart-level `enableRtl` property to `true`.

```typescript
const chart: Chart = new Chart({
  enableRtl: true,
  title: 'أداء المبيعات',
  series: [
    {
      dataSource: arabicData,
      xName: 'month',
      yName: 'revenue',
      type: 'Line',
      name: 'الإيرادات'
    }
  ]
});

chart.appendTo('#chart');
```

Right-to-left support is included in the Chart accessibility capabilities.

### Document Direction

Set the document language and direction.

```html
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <title>تقرير المبيعات</title>
  </head>

  <body>
    <main>
      <h1>تقرير المبيعات</h1>
      <div id="chart"></div>
    </main>
  </body>
</html>
```

If only one section is RTL, apply direction to the nearest relevant container.

```html
<section lang="ar" dir="rtl">
  <h2>أداء المبيعات</h2>
  <div id="chart"></div>
</section>
```

### RTL Axis and Legend Configuration

RTL is enabled at the Chart level. Do not configure unverified axis-level or legend-level `enableRtl` properties.

```typescript
const chart: Chart = new Chart({
  enableRtl: true,
  title: 'أداء المبيعات',
  primaryXAxis: {
    valueType: 'Category',
    title: 'الأشهر',
    labelRotation: 0
  },
  primaryYAxis: {
    title: 'الإيرادات',
    labelFormat: '{value} ألف'
  },
  legendSettings: {
    visible: true,
    position: 'Left'
  },
  series: [
    {
      dataSource: arabicData,
      xName: 'month',
      yName: 'revenue',
      type: 'Line',
      name: 'المبيعات'
    }
  ]
});

chart.appendTo('#chart');
```

Use a string for an axis title.

Incorrect:

```typescript
primaryYAxis: {
  title: {
    text: 'الإيرادات',
    style: {
      direction: 'rtl'
    }
  }
}
```

Correct:

```typescript
primaryYAxis: {
  title: 'الإيرادات'
}
```

The document or container `dir="rtl"` and Chart-level `enableRtl` provide the directional context.

### Dynamic Language Switching

Use typed localization data and update supported Chart properties.

```typescript
type SupportedLanguage =
  | 'en'
  | 'ar';

interface LocalizedChartText {
  direction: 'ltr' | 'rtl';
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  seriesName: string;
  description: string;
}

const localization:
  Record<
    SupportedLanguage,
    LocalizedChartText
  > = {
    en: {
      direction: 'ltr',
      title: 'Sales Performance',
      xAxisTitle: 'Month',
      yAxisTitle:
        'Revenue in thousands',
      seriesName: 'Sales',
      description:
        'Line chart showing monthly sales.'
    },
    ar: {
      direction: 'rtl',
      title: 'أداء المبيعات',
      xAxisTitle: 'الشهر',
      yAxisTitle:
        'الإيرادات بالآلاف',
      seriesName: 'المبيعات',
      description:
        'مخطط خطي يعرض المبيعات الشهرية.'
    }
  };

function setLanguage(
  language: SupportedLanguage
): void {
  const text: LocalizedChartText =
    localization[language];

  document.documentElement.lang =
    language;

  document.documentElement.dir =
    text.direction;

  chart.enableRtl =
    text.direction === 'rtl';

  chart.title =
    text.title;

  chart.primaryXAxis.title =
    text.xAxisTitle;

  chart.primaryYAxis.title =
    text.yAxisTitle;

  chart.series[0].name =
    text.seriesName;

  chart.accessibility = {
    ...chart.accessibility,
    accessibilityDescription:
      text.description,
    accessibilityRole: 'img',
    focusable: true,
    tabIndex: 0
  };

  chart.refresh();
}
```

Do not update `chart.primaryXAxis.title.text`. The axis `title` is a string.

If category text also changes by language, replace the series data source with localized category values before refreshing.

## Complete Accessible Chart Example

```typescript
import {
  Category,
  Chart,
  ColumnSeries,
  DataLabel,
  Highlight,
  Legend,
  Selection,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  ColumnSeries,
  Category,
  DataLabel,
  Legend,
  Highlight,
  Selection,
  Tooltip
);

interface QuarterlySalesData {
  quarter: string;
  revenue: number;
  label: string;
}

const chartData: QuarterlySalesData[] = [
  {
    quarter: 'Q1',
    revenue: 35,
    label: 'Q1: ₹35K'
  },
  {
    quarter: 'Q2',
    revenue: 42,
    label: 'Q2: ₹42K'
  },
  {
    quarter: 'Q3',
    revenue: 39,
    label: 'Q3: ₹39K'
  },
  {
    quarter: 'Q4',
    revenue: 48,
    label: 'Q4: ₹48K'
  }
];

const statusElement: HTMLElement | null =
  document.getElementById(
    'chart-status'
  );

const chart: Chart = new Chart({
  title: 'Accessible Sales Dashboard',
  subTitle: 'Quarterly revenue for 2026',
  width: '100%',
  height: '420px',
  palettes: [
    '#005A9C'
  ],
  accessibility: {
    accessibilityDescription:
      'Column chart showing quarterly revenue for 2026. ' +
      'Revenue increased from 35 thousand rupees in Quarter 1 ' +
      'to 48 thousand rupees in Quarter 4.',
    accessibilityRole: 'img',
    focusable: true,
    tabIndex: 0
  },
  focusBorderColor: '#0F6CBD',
  focusBorderWidth: 3,
  focusBorderMargin: 2,
  primaryXAxis: {
    valueType: 'Category',
    title: 'Fiscal quarter',
    labelStyle: {
      color: '#242424',
      size: '13px',
      fontFamily:
        'Segoe UI, sans-serif'
    }
  },
  primaryYAxis: {
    title:
      'Revenue in thousands of rupees',
    labelFormat: '₹{value}K',
    minimum: 0,
    maximum: 60,
    interval: 10,
    labelStyle: {
      color: '#242424',
      size: '13px',
      fontFamily:
        'Segoe UI, sans-serif'
    }
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    enableHighlight: true,
    textStyle: {
      color: '#242424',
      size: '13px',
      fontFamily:
        'Segoe UI, sans-serif'
    },
    accessibility: {
      accessibilityDescription:
        'Sales series legend',
      accessibilityRole: 'region',
      focusable: true,
      tabIndex: 0
    }
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Revenue: ₹${point.y:n0}K',
    fill: '#FFFFFF',
    border: {
      color: '#242424',
      width: 1
    },
    textStyle: {
      color: '#242424',
      size: '13px'
    }
  },
  selectionMode: 'Point',
  isMultiSelect: false,
  selectionPattern:
    'DiagonalForward',
  selectionComplete: (): void => {
    if (statusElement) {
      statusElement.textContent =
        'The Chart selection was updated.';
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'quarter',
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue',
      accessibility: {
        accessibilityDescription:
          'Quarterly revenue series',
        accessibilityDescriptionFormat:
          '${series.name}, ${point.x}, ' +
          '${point.y} thousand rupees',
        accessibilityRole: 'img',
        focusable: true,
        tabIndex: 0
      },
      marker: {
        dataLabel: {
          visible: true,
          name: 'label',
          position: 'Outer',
          font: {
            color: '#242424',
            size: '12px',
            fontWeight: '600'
          }
        }
      }
    }
  ]
});

chart.appendTo('#chart');

window.addEventListener(
  'beforeunload',
  (): void => {
    chart.destroy();
  }
);
```

**HTML:**

```html
<article aria-labelledby="sales-heading">
  <h1 id="sales-heading">
    Accessible Sales Dashboard
  </h1>

  <p id="sales-summary">
    Quarterly revenue increased overall during 2026.
    Quarter 4 recorded the highest value at ₹48,000.
  </p>

  <div
    id="chart"
    aria-describedby="sales-summary sales-table-caption"
  ></div>

  <p
    id="chart-status"
    class="visually-hidden"
    aria-live="polite"
    aria-atomic="true"
  ></p>

  <table>
    <caption id="sales-table-caption">
      Quarterly revenue represented in the Chart
    </caption>

    <thead>
      <tr>
        <th scope="col">Quarter</th>
        <th scope="col">Revenue</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <th scope="row">Q1</th>
        <td>₹35,000</td>
      </tr>
      <tr>
        <th scope="row">Q2</th>
        <td>₹42,000</td>
      </tr>
      <tr>
        <th scope="row">Q3</th>
        <td>₹39,000</td>
      </tr>
      <tr>
        <th scope="row">Q4</th>
        <td>₹48,000</td>
      </tr>
    </tbody>
  </table>
</article>
```

**CSS:**

```css
#chart {
  width: 100%;
  min-height: 420px;
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

## Complete RTL Chart Example

```typescript
import {
  Category,
  Chart,
  Legend,
  LineSeries,
  Tooltip
} from '@syncfusion/ej2-charts';

Chart.Inject(
  LineSeries,
  Category,
  Legend,
  Tooltip
);

interface ArabicSalesData {
  month: string;
  revenue: number;
}

const arabicData:
  ArabicSalesData[] = [
    {
      month: 'يناير',
      revenue: 35
    },
    {
      month: 'فبراير',
      revenue: 28
    },
    {
      month: 'مارس',
      revenue: 34
    },
    {
      month: 'أبريل',
      revenue: 48
    }
  ];

const chart: Chart = new Chart({
  enableRtl: true,
  title: 'أداء المبيعات',
  width: '100%',
  height: '420px',
  accessibility: {
    accessibilityDescription:
      'مخطط خطي يعرض الإيرادات الشهرية.',
    accessibilityRole: 'img',
    focusable: true,
    tabIndex: 0
  },
  focusBorderColor: '#005A9C',
  focusBorderWidth: 3,
  focusBorderMargin: 2,
  primaryXAxis: {
    valueType: 'Category',
    title: 'الأشهر',
    labelStyle: {
      color: '#242424',
      size: '13px',
      fontFamily:
        'Arial, sans-serif'
    }
  },
  primaryYAxis: {
    title: 'الإيرادات بالآلاف',
    labelFormat: '{value} ألف',
    labelStyle: {
      color: '#242424',
      size: '13px',
      fontFamily:
        'Arial, sans-serif'
    }
  },
  legendSettings: {
    visible: true,
    position: 'Left',
    textStyle: {
      color: '#242424',
      size: '13px',
      fontFamily:
        'Arial, sans-serif'
    }
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'الإيرادات: ${point.y:n0} ألف'
  },
  series: [
    {
      dataSource: arabicData,
      xName: 'month',
      yName: 'revenue',
      type: 'Line',
      name: 'المبيعات',
      accessibility: {
        accessibilityDescription:
          'سلسلة الإيرادات الشهرية',
        accessibilityDescriptionFormat:
          '${point.x}: ${point.y} ألف',
        accessibilityRole: 'img',
        focusable: true,
        tabIndex: 0
      },
      marker: {
        visible: true,
        width: 8,
        height: 8
      }
    }
  ]
});

chart.appendTo('#chart');

window.addEventListener(
  'beforeunload',
  (): void => {
    chart.destroy();
  }
);
```

**HTML:**

```html
<section
  lang="ar"
  dir="rtl"
  aria-labelledby="arabic-sales-heading"
>
  <h1 id="arabic-sales-heading">
    أداء المبيعات
  </h1>

  <p id="arabic-sales-summary">
    يعرض المخطط الإيرادات الشهرية من يناير إلى أبريل.
  </p>

  <div
    id="chart"
    aria-describedby="arabic-sales-summary"
  ></div>
</section>
```

## Best Practices Checklist

- [ ] Provide a visible and meaningful Chart title.
- [ ] Configure `accessibility.accessibilityDescription`.
- [ ] Configure an appropriate accessibility role.
- [ ] Enable focus through `accessibility.focusable`.
- [ ] Use a logical `accessibility.tabIndex`.
- [ ] Provide a visible focus indicator.
- [ ] Configure meaningful series and point descriptions.
- [ ] Use semantic headings around the Chart.
- [ ] Provide a concise visible text summary.
- [ ] Provide a semantic data table when every value is required.
- [ ] Use a persistent ARIA live region for important updates.
- [ ] Preserve built-in keyboard navigation.
- [ ] Use native buttons for application-owned actions.
- [ ] Avoid positive `tabindex` values.
- [ ] Ensure sufficient text, UI, and focus-indicator contrast.
- [ ] Do not communicate essential information through color alone.
- [ ] Use marker shapes, dash patterns, labels, and text as alternatives.
- [ ] Test keyboard navigation at browser zoom levels.
- [ ] Test with screen readers.
- [ ] Test with axe-core or another accessibility checker.
- [ ] Set `lang` and `dir` on the document or relevant container.
- [ ] Set `enableRtl` when an RTL Chart is required.
- [ ] Localize titles, labels, series names, summaries, and descriptions.
- [ ] Validate the complete application against its required WCAG conformance level.

## Troubleshooting

### Chart Is Not Announced

- Configure `accessibility.accessibilityDescription`.
- Configure an appropriate `accessibilityRole`.
- Ensure that the Chart is not inside an `aria-hidden="true"` container.
- Provide a visible title and summary.
- Avoid conflicting roles on the host and generated Chart.
- Verify behavior with the target browser and screen reader.

### Chart Cannot Receive Keyboard Focus

- Set `accessibility.focusable` to `true`.
- Set `accessibility.tabIndex` to `0`.
- Ensure that no overlay blocks the Chart.
- Ensure that the Chart is visible.
- Use `Alt + J` to move focus to the Chart.
- Preserve the built-in focus behavior.

### Keyboard Navigation Is Not Working

- Do not override the built-in arrow, Enter, Space, Escape, zoom, or print keys.
- Ensure that the Chart has focus.
- Inject feature modules required by selection, legend, or zoom interaction.
- Ensure that the selected series and points are visible.
- Check whether application-level keyboard handlers call `preventDefault()` unnecessarily.

### Focus Border Is Not Visible

- Configure `focusBorderColor`.
- Configure a positive `focusBorderWidth`.
- Configure `focusBorderMargin`.
- Use a color with sufficient contrast.
- Ensure that parent containers do not clip the focus indicator.

### Screen Reader Does Not Announce Updates

- Use a persistent `aria-live="polite"` element.
- Update its text after the Chart data has changed.
- Use `aria-atomic="true"` when the complete message should be announced.
- Avoid immediately removing the live region.
- Do not announce every point render or mouse movement.
- Test timing with the target screen reader.

### Data Table Is Not Associated with the Chart

- Give the table caption a unique ID.
- Reference the caption or summary through `aria-describedby`.
- Ensure that referenced IDs exist.
- Do not hide the table from assistive technologies.
- Keep Chart and table values synchronized.

### Colors Are Difficult to Distinguish

- Use a palette with differences in both hue and lightness.
- Do not rely only on red and green.
- Use marker shapes and dash patterns.
- Enable direct labels or tooltips.
- Provide a text summary and table.
- Measure contrast rather than assuming it is sufficient.

### RTL Layout Is Incorrect

- Set the document or container `dir` to `rtl`.
- Set the language through `lang`.
- Set the Chart-level `enableRtl` to `true`.
- Localize Chart titles, axis titles, series names, and descriptions.
- Use `legendSettings`, not `legend`.
- Do not configure unsupported axis-level or legend-level `enableRtl` properties.
- Use strings for axis titles.
- Refresh the Chart after dynamically changing direction.

## Next Steps

- **Troubleshooting:** See `references/troubleshooting.md`.
- **Styling:** See `references/styling-appearance.md`.
- **Interactions:** See `references/features-interaction.md`.
- **Series configuration:** See `references/series-configuration.md`.
- **Axes customization:** See `references/axes-customization.md`.
- **Data handling:** See `references/data-handling.md`.
