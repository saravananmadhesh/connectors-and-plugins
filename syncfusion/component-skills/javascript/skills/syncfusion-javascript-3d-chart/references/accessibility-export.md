# Accessibility & Export for 3D Charts

## Table of Contents

- [Accessibility Overview](#accessibility-overview)
  - [WAI-ARIA Support](#wai-aria-support)
  - [Accessible Chart Container](#accessible-chart-container)
  - [Accessible Description](#accessible-description)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Interactions](#supported-keyboard-interactions)
  - [Keyboard Navigation Requirements](#keyboard-navigation-requirements)
  - [Custom Keyboard Handling](#custom-keyboard-handling)
- [Screen Reader Support](#screen-reader-support)
  - [Chart Summary](#chart-summary)
  - [Accessible Data Table](#accessible-data-table)
  - [Data Labels and Tooltips](#data-labels-and-tooltips)
- [Export to Image and Document Formats](#export-to-image-and-document-formats)
  - [Enable Export](#enable-export)
  - [Export to PNG](#export-to-png)
  - [Export to JPEG](#export-to-jpeg)
  - [Export to SVG](#export-to-svg)
  - [Export to PDF](#export-to-pdf)
- [Print Functionality](#print-functionality)
  - [Print the Chart](#print-the-chart)
  - [Print Styling](#print-styling)
  - [Print Multiple Charts](#print-multiple-charts)
- [Right-to-Left Language Support](#right-to-left-language-support)
  - [Enable RTL](#enable-rtl)
  - [RTL with a Legend](#rtl-with-a-legend)
- [Practical Examples](#practical-examples)
  - [Accessible Sales Dashboard](#accessible-sales-dashboard)
  - [Multilingual Chart with RTL](#multilingual-chart-with-rtl)
  - [Export and Print Workflow](#export-and-print-workflow)
- [Accessibility Checklist](#accessibility-checklist)
  - [Provide](#provide)
  - [Avoid](#avoid)
- [Troubleshooting](#troubleshooting)
  - [Screen Reader Does Not Announce the Chart](#screen-reader-does-not-announce-the-chart)
  - [Screen Reader Does Not Announce Every Value](#screen-reader-does-not-announce-every-value)
  - [Keyboard Navigation Is Not Working](#keyboard-navigation-is-not-working)
  - [Keyboard Focus Is Not Visible](#keyboard-focus-is-not-visible)
  - [Export Is Not Working](#export-is-not-working)
  - [Exported File Name Is Incorrect](#exported-file-name-is-incorrect)
  - [Exported Chart Has Incorrect Colors](#exported-chart-has-incorrect-colors)
  - [Print Is Not Working](#print-is-not-working)
  - [Printed Chart Is Clipped](#printed-chart-is-clipped)
  - [RTL Layout Is Incorrect](#rtl-layout-is-incorrect)
- [Next Steps](#next-steps)
- [Combined Mistakes and Future References](#combined-mistakes-and-future-references)


The EJ2 3D Chart provides accessibility support through WAI-ARIA semantics, screen reader compatibility, and keyboard navigation. It also supports printing and exporting the rendered chart to JPEG, PNG, SVG, and PDF formats.

## Accessibility Overview

Accessibility should be considered for the complete chart experience. This includes the chart title, keyboard interaction, screen reader context, visual contrast, data alternatives, tooltips, legends, and export controls.

The 3D Chart uses WAI-ARIA roles and attributes such as:

- `role="img"`
- `role="button"`
- `role="region"`
- `aria-label`
- `aria-hidden`
- `aria-pressed`

These attributes provide accessibility information for chart elements, interactive controls, legends, and selected points.

### WAI-ARIA Support

The 3D Chart applies accessibility semantics to its generated elements. Do not assume that unsupported chart configuration properties such as `ariaLabel`, `description`, `tabIndex`, or `keyboardSupport` can be passed directly to the `Chart3D` constructor.

When an application-specific accessible name or description is required, apply the corresponding ARIA attributes to the chart host element.

### Accessible Chart Container

Add an accessible label to the chart container before creating the chart.

**index.html:**

```html
<div
  id="chart"
  role="region"
  aria-label="Three-dimensional monthly sales chart for 2024"
  aria-describedby="chart-description"
  tabindex="0"
></div>

<p id="chart-description">
  This chart compares monthly sales values from January to May 2024.
  Use the keyboard to move through interactive chart elements.
  A data table containing the same values is available after the chart.
</p>
```

**index.ts:**

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Tooltip3D
);

interface SalesData {
  month: string;
  sales: number;
}

const chartData: SalesData[] = [
  { month: 'January', sales: 35 },
  { month: 'February', sales: 28 },
  { month: 'March', sales: 34 },
  { month: 'April', sales: 32 },
  { month: 'May', sales: 40 }
];

const chart: Chart3D = new Chart3D({
  title: 'Monthly Sales for 2024',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales in Thousands'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Sales: ${point.y} thousand'
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
      name: 'Monthly Sales',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    }
  ]
});

chart.appendTo('#chart');
```

### Accessible Description

Use `aria-describedby` to associate the chart container with a detailed text description.

```html
<div
  id="chart"
  role="region"
  aria-label="Quarterly sales chart"
  aria-describedby="sales-chart-description"
  tabindex="0"
></div>

<div id="sales-chart-description">
  <p>
    The three-dimensional column chart displays quarterly sales.
    Q4 has the highest value at 80 thousand, and Q1 has the lowest
    value at 50 thousand.
  </p>
</div>
```

Do not place a `description` property in the `Chart3D` constructor unless that property has been explicitly validated in the installed package version.

## Keyboard Navigation

The EJ2 3D Chart provides built-in keyboard navigation for chart points, series, legends, tooltips, selection, and printing.

### Supported Keyboard Interactions

The documented keyboard interactions include:

- `Tab`: Moves focus to the next interactive chart element.
- `Shift + Tab`: Moves focus to the previous interactive chart element.
- `Down Arrow`: Moves focus to the point on the left side of the selected point.
- `Up Arrow`: Moves focus to the point on the right side of the selected point.
- `Left Arrow`: Moves focus to the next series.
- `Right Arrow`: Moves focus to the previous series.
- `Escape`: Closes the tooltip for the focused data point.
- `Enter` or `Space`: Selects the focused data point.
- `Down Arrow` or `Left Arrow` on a legend: Moves focus to the legend item on the left.
- `Up Arrow` or `Right Arrow` on a legend: Moves focus to the legend item on the right.
- `Enter` or `Space` on a legend: Toggles the corresponding series visibility.
- `Ctrl + P`: Prints the chart.

The actual interaction available at a given time depends on which chart element has focus and which features are enabled.

### Keyboard Navigation Requirements

To maintain reliable keyboard accessibility:

- Render the chart in a visible container.
- Ensure that no overlay blocks pointer or keyboard interaction.
- Provide visible focus styles for custom controls around the chart.
- Use native `<button>` elements for export and print actions.
- Do not remove focus outlines without providing an equivalent visible focus indicator.
- Use meaningful button text.
- Avoid positive `tabindex` values that disrupt the natural tab order.
- Avoid adding application-level keyboard handlers that conflict with the chart's built-in keyboard behavior.

Example export and print controls:

```html
<div
  class="chart-actions"
  role="group"
  aria-label="Chart export and print actions"
>
  <button id="export-png" type="button">
    Export chart as PNG
  </button>

  <button id="export-svg" type="button">
    Export chart as SVG
  </button>

  <button id="export-pdf" type="button">
    Export chart as PDF
  </button>

  <button id="print-chart" type="button">
    Print chart
  </button>
</div>
```

### Custom Keyboard Handling

The original `keyDown` chart event and `IKeyboardEventArgs` example should not be documented as a `Chart3D` API without validating those members against the installed package version.

If an application requires custom keyboard behavior, register a standard DOM keyboard listener on an application-owned element.

```typescript
const chartElement: HTMLElement | null =
  document.getElementById('chart');

const statusElement: HTMLElement | null =
  document.getElementById('chart-status');

const handleChartKeyDown = (
  event: KeyboardEvent
): void => {
  if (!statusElement) {
    return;
  }

  if (event.key === 'Home') {
    statusElement.textContent =
      'The chart container received the Home key.';
  }

  if (event.key === 'End') {
    statusElement.textContent =
      'The chart container received the End key.';
  }
};

chartElement?.addEventListener(
  'keydown',
  handleChartKeyDown
);

window.addEventListener('beforeunload', () => {
  chartElement?.removeEventListener(
    'keydown',
    handleChartKeyDown
  );
});
```

Do not intercept arrow keys, `Enter`, `Space`, or `Escape` unless the application has a validated requirement because these keys are used by the built-in chart navigation.

## Screen Reader Support

The 3D Chart can be accessed through assistive technologies such as screen readers. WAI-ARIA semantics provide information about generated chart elements and interactive states.

A graphical chart should not be the only source of essential information. Provide a text summary and, when practical, an accessible HTML table containing the same data.

### Chart Summary

A concise chart summary should explain:

- What the chart represents.
- The period or category range.
- The measurement unit.
- The most important trend or comparison.
- Where an equivalent data table is available.

```html
<section aria-labelledby="sales-section-heading">
  <h2 id="sales-section-heading">
    Monthly Sales Report
  </h2>

  <p id="sales-summary">
    Monthly sales from January to May are displayed in thousands.
    May has the highest value at 40 thousand, while February has
    the lowest value at 28 thousand.
  </p>

  <div
    id="chart"
    role="region"
    aria-label="Three-dimensional monthly sales chart"
    aria-describedby="sales-summary sales-table-caption"
    tabindex="0"
  ></div>
</section>
```

### Accessible Data Table

Use a semantic HTML table as the textual alternative to the chart.

```html
<table id="sales-data-table">
  <caption id="sales-table-caption">
    Monthly sales values shown in the 3D chart
  </caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales in thousands</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>35</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>28</td>
    </tr>
    <tr>
      <th scope="row">March</th>
      <td>34</td>
    </tr>
    <tr>
      <th scope="row">April</th>
      <td>32</td>
    </tr>
    <tr>
      <th scope="row">May</th>
      <td>40</td>
    </tr>
  </tbody>
</table>
```

Do not hide the only data alternative with `aria-hidden="true"`. If the table should be visually hidden while remaining available to assistive technologies, use a visually hidden CSS class.

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
```

Apply the class only when a visually hidden table is appropriate:

```html
<table
  id="sales-data-table"
  class="visually-hidden"
>
  <caption>
    Monthly sales values shown in the 3D chart
  </caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales in thousands</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>35</td>
    </tr>
  </tbody>
</table>
```

### Data Labels and Tooltips

Data labels make values visible without requiring pointer interaction. Tooltips provide additional information during pointer or keyboard interaction.

The `DataLabel3D` and `Tooltip3D` modules must be imported and injected when their features are enabled.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Tooltip3D
);

const chart: Chart3D = new Chart3D({
  title: 'Quarterly Sales Report',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    title: 'Sales'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Sales: ${point.y}'
  },
  series: [
    {
      dataSource: [
        {
          quarter: 'Q1',
          sales: 50
        },
        {
          quarter: 'Q2',
          sales: 60
        },
        {
          quarter: 'Q3',
          sales: 75
        },
        {
          quarter: 'Q4',
          sales: 80
        }
      ],
      xName: 'quarter',
      yName: 'sales',
      type: 'Column',
      name: 'Quarterly Sales',
      dataLabel: {
        visible: true,
        position: 'Top'
      }
    }
  ]
});

chart.appendTo('#chart');
```

Do not use `${description}` in a tooltip template unless `description` is a verified tooltip token. For reliable output, use supported point and series tokens such as:

- `${point.x}`
- `${point.y}`
- `${series.name}`
- `${series.type}`

Provide extended descriptions outside the chart through standard HTML when additional context is required.

## Export to Image and Document Formats

The rendered 3D Chart can be exported to the following formats:

- JPEG
- PNG
- SVG
- PDF

Use the public `export` method with the export type and file name.

### Enable Export

Set `enableExport` to `true` when export support is required.

```typescript
const chart: Chart3D = new Chart3D({
  enableExport: true,
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

### Export to PNG

```typescript
const exportPngButton: HTMLButtonElement | null =
  document.getElementById(
    'export-png'
  ) as HTMLButtonElement | null;

exportPngButton?.addEventListener('click', () => {
  chart.export(
    'PNG',
    'monthly-sales-report'
  );
});
```

### Export to JPEG

```typescript
const exportJpegButton: HTMLButtonElement | null =
  document.getElementById(
    'export-jpeg'
  ) as HTMLButtonElement | null;

exportJpegButton?.addEventListener('click', () => {
  chart.export(
    'JPEG',
    'monthly-sales-report'
  );
});
```

### Export to SVG

```typescript
const exportSvgButton: HTMLButtonElement | null =
  document.getElementById(
    'export-svg'
  ) as HTMLButtonElement | null;

exportSvgButton?.addEventListener('click', () => {
  chart.export(
    'SVG',
    'monthly-sales-report'
  );
});
```

### Export to PDF

```typescript
const exportPdfButton: HTMLButtonElement | null =
  document.getElementById(
    'export-pdf'
  ) as HTMLButtonElement | null;

exportPdfButton?.addEventListener('click', () => {
  chart.export(
    'PDF',
    'monthly-sales-report'
  );
});
```

Use the file name without manually appending an extension unless the installed package version specifically requires one.

Do not document unverified width, height, scale, orientation, controls, header, footer, or multi-page arguments as supported by the 3D Chart `export` method. The verified 3D Chart export pattern uses the export type and file name.

## Print Functionality

The rendered 3D Chart can be printed through the browser using the public `print` method.

### Print the Chart

```typescript
const printButton: HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

printButton?.addEventListener('click', () => {
  chart.print();
});
```

Use a native button for the print action:

```html
<button id="print-chart" type="button">
  Print chart
</button>
```

### Print Styling

Use print-specific CSS to hide application controls and prevent the chart from being divided across pages.

```css
@media print {
  .chart-actions {
    display: none;
  }

  .chart-container {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  #chart {
    width: 100%;
    min-height: 450px;
  }
}
```

Example markup:

```html
<section class="chart-container">
  <h1>Monthly Sales Report</h1>

  <div
    id="chart"
    role="region"
    aria-label="Monthly sales chart"
  ></div>
</section>

<div
  class="chart-actions"
  role="group"
  aria-label="Chart actions"
>
  <button id="print-chart" type="button">
    Print chart
  </button>
</div>
```

### Print Multiple Charts

Do not call `print()` repeatedly with delayed timers to print multiple charts. That approach can open multiple print dialogs and produce unreliable output.

For application-controlled multi-chart printing, place the chart containers inside one printable section and use the browser print command.

```html
<main id="printable-reports">
  <section class="chart-container">
    <h2>Monthly Sales</h2>
    <div id="sales-chart"></div>
  </section>

  <section class="chart-container">
    <h2>Monthly Revenue</h2>
    <div id="revenue-chart"></div>
  </section>
</main>

<button id="print-all-charts" type="button">
  Print all reports
</button>
```

```typescript
const printAllButton: HTMLButtonElement | null =
  document.getElementById(
    'print-all-charts'
  ) as HTMLButtonElement | null;

printAllButton?.addEventListener('click', () => {
  window.print();
});
```

```css
@media print {
  #print-all-charts {
    display: none;
  }

  .chart-container {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 24px;
  }
}
```

Use `chart.print()` when only the individual chart should be printed. Use a deliberately styled printable page when multiple charts and surrounding report content must be printed together.

## Right-to-Left Language Support

Use `enableRtl` to enable right-to-left rendering for languages such as Arabic and Hebrew.

Also ensure that:

- The page or container uses the correct `dir` attribute.
- The selected font supports the required script.
- Chart labels and titles are localized.
- Native control text is localized.
- Data values are formatted for the selected locale when required.

### Enable RTL

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

interface ArabicSalesData {
  month: string;
  sales: number;
}

const chartData: ArabicSalesData[] = [
  {
    month: 'يناير',
    sales: 35
  },
  {
    month: 'فبراير',
    sales: 28
  },
  {
    month: 'مارس',
    sales: 34
  }
];

const chart: Chart3D = new Chart3D({
  title: 'تقرير المبيعات',
  enableRtl: true,
  primaryXAxis: {
    valueType: 'Category',
    title: 'الشهر'
  },
  primaryYAxis: {
    title: 'المبيعات'
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
      name: 'المبيعات الشهرية'
    }
  ]
});

chart.appendTo('#chart');
```

Use an RTL container:

```html
<div
  id="chart"
  dir="rtl"
  role="region"
  aria-label="مخطط مبيعات شهري ثلاثي الأبعاد"
></div>
```

### RTL with a Legend

Use `legendSettings`, not `legend`, and inject `Legend3D` when the legend is visible.

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

interface HebrewSalesData {
  month: string;
  sales: number;
  revenue: number;
}

const chartData: HebrewSalesData[] = [
  {
    month: 'ינואר',
    sales: 35,
    revenue: 42
  },
  {
    month: 'פברואר',
    sales: 28,
    revenue: 44
  },
  {
    month: 'מרץ',
    sales: 34,
    revenue: 52
  }
];

const chart: Chart3D = new Chart3D({
  title: 'דוח מכירות',
  enableRtl: true,
  titleStyle: {
    fontFamily: 'Arial',
    fontWeight: '600',
    size: '18px'
  },
  primaryXAxis: {
    valueType: 'Category',
    title: 'חודש'
  },
  primaryYAxis: {
    title: 'ערך'
  },
  legendSettings: {
    visible: true,
    position: 'Left',
    textStyle: {
      fontFamily: 'Arial',
      size: '12px'
    }
  },
  series: [
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'מכירות'
    },
    {
      dataSource: chartData,
      xName: 'month',
      yName: 'revenue',
      type: 'Column',
      name: 'הכנסות'
    }
  ]
});

chart.appendTo('#chart');
```

Do not place an unverified `textAlignment` property inside `titleStyle`. Use the chart's supported title alignment configuration only after validating it against the installed package version.

## Practical Examples

### Accessible Sales Dashboard

The following complete TypeScript example includes:

- An accessible chart region.
- A descriptive summary.
- A semantic data table.
- Data labels.
- Tooltips.
- A legend.
- Keyboard-accessible export buttons.
- Print support.
- Cleanup of application-owned event listeners.

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
    sales: 32
  },
  {
    month: 'May',
    sales: 40
  }
];

const chart: Chart3D = new Chart3D({
  title: '2024 Monthly Sales Report',
  enableExport: true,
  background: '#FFFFFF',
  wallColor: '#F5F5F5',
  primaryXAxis: {
    valueType: 'Category',
    title: 'Month',
    labelRotation: -45,
    labelStyle: {
      color: '#242424',
      fontFamily: 'Arial',
      size: '12px'
    }
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 50,
    interval: 10,
    title: 'Sales in Thousands',
    labelFormat: '{value}K',
    labelStyle: {
      color: '#242424',
      fontFamily: 'Arial',
      size: '12px'
    }
  },
  titleStyle: {
    color: '#242424',
    fontFamily: 'Arial',
    fontWeight: '600',
    size: '18px'
  },
  tooltip: {
    enable: true,
    format:
      '<b>${point.x}</b><br>' +
      'Sales: ${point.y} thousand'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom',
    textStyle: {
      color: '#242424',
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
      xName: 'month',
      yName: 'sales',
      type: 'Column',
      name: 'Monthly Sales',
      fill: '#0F6CBD',
      border: {
        color: '#073B6F',
        width: 1
      },
      dataLabel: {
        visible: true,
        position: 'Top',
        font: {
          color: '#242424',
          fontFamily: 'Arial',
          fontWeight: '600',
          size: '12px'
        }
      }
    }
  ]
});

chart.appendTo('#chart');

const exportPngButton: HTMLButtonElement | null =
  document.getElementById(
    'export-png'
  ) as HTMLButtonElement | null;

const exportSvgButton: HTMLButtonElement | null =
  document.getElementById(
    'export-svg'
  ) as HTMLButtonElement | null;

const exportPdfButton: HTMLButtonElement | null =
  document.getElementById(
    'export-pdf'
  ) as HTMLButtonElement | null;

const printButton: HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

const handlePngExport = (): void => {
  chart.export(
    'PNG',
    'monthly-sales-report'
  );
};

const handleSvgExport = (): void => {
  chart.export(
    'SVG',
    'monthly-sales-report'
  );
};

const handlePdfExport = (): void => {
  chart.export(
    'PDF',
    'monthly-sales-report'
  );
};

const handlePrint = (): void => {
  chart.print();
};

exportPngButton?.addEventListener(
  'click',
  handlePngExport
);

exportSvgButton?.addEventListener(
  'click',
  handleSvgExport
);

exportPdfButton?.addEventListener(
  'click',
  handlePdfExport
);

printButton?.addEventListener(
  'click',
  handlePrint
);

window.addEventListener('beforeunload', () => {
  exportPngButton?.removeEventListener(
    'click',
    handlePngExport
  );

  exportSvgButton?.removeEventListener(
    'click',
    handleSvgExport
  );

  exportPdfButton?.removeEventListener(
    'click',
    handlePdfExport
  );

  printButton?.removeEventListener(
    'click',
    handlePrint
  );

  chart.destroy();
});
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
  <title>Accessible 3D Sales Chart</title>
</head>
<body>
  <main>
    <section aria-labelledby="sales-report-heading">
      <h1 id="sales-report-heading">
        2024 Monthly Sales Report
      </h1>

      <p id="sales-chart-summary">
        The chart displays monthly sales from January to May
        in thousands. May has the highest sales value at 40
        thousand. February has the lowest value at 28 thousand.
      </p>

      <div
        id="chart"
        role="region"
        aria-label="Three-dimensional monthly sales chart"
        aria-describedby="sales-chart-summary sales-table-caption"
        tabindex="0"
        style="height: 450px;"
      ></div>

      <div
        class="chart-actions"
        role="group"
        aria-label="Chart export and print actions"
      >
        <button id="export-png" type="button">
          Export as PNG
        </button>

        <button id="export-svg" type="button">
          Export as SVG
        </button>

        <button id="export-pdf" type="button">
          Export as PDF
        </button>

        <button id="print-chart" type="button">
          Print chart
        </button>
      </div>

      <table id="sales-data-table">
        <caption id="sales-table-caption">
          Monthly sales values shown in the 3D chart
        </caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Sales in thousands</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">January</th>
            <td>35</td>
          </tr>
          <tr>
            <th scope="row">February</th>
            <td>28</td>
          </tr>
          <tr>
            <th scope="row">March</th>
            <td>34</td>
          </tr>
          <tr>
            <th scope="row">April</th>
            <td>32</td>
          </tr>
          <tr>
            <th scope="row">May</th>
            <td>40</td>
          </tr>
        </tbody>
      </table>

      <p id="export-status" aria-live="polite"></p>
    </section>
  </main>

  <script src="index.js"></script>
</body>
</html>
```

**styles.css:**

```css
#chart {
  width: 100%;
  min-height: 450px;
}

.chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.chart-actions button {
  min-height: 40px;
  padding: 8px 16px;
}

.chart-actions button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}

#sales-data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

#sales-data-table th,
#sales-data-table td {
  padding: 8px;
  border: 1px solid #808080;
  text-align: left;
}

@media print {
  .chart-actions {
    display: none;
  }

  #chart,
  #sales-data-table {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
```

### Multilingual Chart with RTL

The following example creates an English, Arabic, or Hebrew chart from validated application data.

```typescript
import {
  Category3D,
  Chart3D,
  ColumnSeries3D,
  DataLabel3D,
  Tooltip3D
} from '@syncfusion/ej2-charts';

Chart3D.Inject(
  ColumnSeries3D,
  Category3D,
  DataLabel3D,
  Tooltip3D
);

type SupportedLanguage = 'en' | 'ar' | 'he';

interface LocalizedText {
  chartLabel: string;
  title: string;
  monthAxis: string;
  salesAxis: string;
  seriesName: string;
  months: string[];
}

interface LocalizedSalesData {
  month: string;
  sales: number;
}

const localizedText: Record<
  SupportedLanguage,
  LocalizedText
> = {
  en: {
    chartLabel:
      'Three-dimensional monthly sales chart',
    title: 'Sales Report',
    monthAxis: 'Month',
    salesAxis: 'Sales',
    seriesName: 'Monthly Sales',
    months: [
      'January',
      'February',
      'March'
    ]
  },
  ar: {
    chartLabel:
      'مخطط مبيعات شهري ثلاثي الأبعاد',
    title: 'تقرير المبيعات',
    monthAxis: 'الشهر',
    salesAxis: 'المبيعات',
    seriesName: 'المبيعات الشهرية',
    months: [
      'يناير',
      'فبراير',
      'مارس'
    ]
  },
  he: {
    chartLabel:
      'תרשים מכירות חודשי תלת ממדי',
    title: 'דוח מכירות',
    monthAxis: 'חודש',
    salesAxis: 'מכירות',
    seriesName: 'מכירות חודשיות',
    months: [
      'ינואר',
      'פברואר',
      'מרץ'
    ]
  }
};

let activeChart: Chart3D | null = null;

function renderLocalizedChart(
  language: SupportedLanguage
): void {
  const text: LocalizedText =
    localizedText[language];

  const isRtl: boolean =
    language === 'ar' || language === 'he';

  const chartElement: HTMLElement | null =
    document.getElementById('chart');

  if (!chartElement) {
    throw new Error(
      'The chart container was not found.'
    );
  }

  const chartData: LocalizedSalesData[] = [
    {
      month: text.months[0],
      sales: 35
    },
    {
      month: text.months[1],
      sales: 28
    },
    {
      month: text.months[2],
      sales: 34
    }
  ];

  activeChart?.destroy();
  activeChart = null;

  chartElement.replaceChildren();
  chartElement.dir = isRtl ? 'rtl' : 'ltr';

  chartElement.setAttribute(
    'aria-label',
    text.chartLabel
  );

  activeChart = new Chart3D({
    title: text.title,
    enableRtl: isRtl,
    primaryXAxis: {
      valueType: 'Category',
      title: text.monthAxis
    },
    primaryYAxis: {
      minimum: 0,
      maximum: 50,
      interval: 10,
      title: text.salesAxis
    },
    tooltip: {
      enable: true,
      format:
        '<b>${point.x}</b><br>' +
        '${point.y}'
    },
    wallColor: 'transparent',
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
        name: text.seriesName,
        dataLabel: {
          visible: true,
          position: 'Top'
        }
      }
    ]
  });

  activeChart.appendTo('#chart');
}

renderLocalizedChart('ar');

window.addEventListener('beforeunload', () => {
  activeChart?.destroy();
  activeChart = null;
});
```

### Export and Print Workflow

The following complete example provides accessible buttons for the verified 3D Chart export formats and printing.

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

interface RevenueData {
  quarter: string;
  revenue: number;
}

const chartData: RevenueData[] = [
  {
    quarter: 'Q1',
    revenue: 50
  },
  {
    quarter: 'Q2',
    revenue: 65
  },
  {
    quarter: 'Q3',
    revenue: 72
  },
  {
    quarter: 'Q4',
    revenue: 84
  }
];

const chart: Chart3D = new Chart3D({
  title: 'Quarterly Revenue Report',
  enableExport: true,
  primaryXAxis: {
    valueType: 'Category',
    title: 'Quarter'
  },
  primaryYAxis: {
    minimum: 0,
    maximum: 100,
    interval: 20,
    title: 'Revenue'
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
      yName: 'revenue',
      type: 'Column',
      name: 'Revenue'
    }
  ]
});

chart.appendTo('#chart');

const actions: Record<
  string,
  () => void
> = {
  'export-png': () => {
    chart.export(
      'PNG',
      'quarterly-revenue-report'
    );
  },
  'export-jpeg': () => {
    chart.export(
      'JPEG',
      'quarterly-revenue-report'
    );
  },
  'export-svg': () => {
    chart.export(
      'SVG',
      'quarterly-revenue-report'
    );
  },
  'export-pdf': () => {
    chart.export(
      'PDF',
      'quarterly-revenue-report'
    );
  },
  'print-chart': () => {
    chart.print();
  }
};

Object.entries(actions).forEach(
  ([elementId, action]: [string, () => void]) => {
    const button: HTMLButtonElement | null =
      document.getElementById(
        elementId
      ) as HTMLButtonElement | null;

    button?.addEventListener(
      'click',
      action
    );
  }
);
```

```html
<div
  id="chart"
  role="region"
  aria-label="Three-dimensional quarterly revenue chart"
  tabindex="0"
  style="height: 450px;"
></div>

<div
  class="chart-actions"
  role="group"
  aria-label="Export and print chart"
>
  <button id="export-png" type="button">
    Export PNG
  </button>

  <button id="export-jpeg" type="button">
    Export JPEG
  </button>

  <button id="export-svg" type="button">
    Export SVG
  </button>

  <button id="export-pdf" type="button">
    Export PDF
  </button>

  <button id="print-chart" type="button">
    Print
  </button>
</div>
```

The verified 3D Chart export formats are JPEG, PNG, SVG, and PDF, and the verified method pattern is `chart.export(type, fileName)`. Printing uses `chart.print()`.

## Accessibility Checklist

### Provide

- A meaningful visible chart title.
- An accessible name for the chart region.
- An extended text summary for complex charts.
- A semantic table or equivalent textual data representation.
- Keyboard-accessible controls.
- Visible focus indicators.
- Tooltips for additional point information.
- Data labels when persistent values improve understanding.
- Legends with meaningful series names.
- Adequate text, grid-line, border, and data-color contrast.
- More than color alone to distinguish essential information.
- Correct text direction for RTL languages.
- Localized chart titles, axis titles, labels, and control text.
- Cleanup for custom event listeners and chart instances.
- Accessible names for export and print buttons.

### Avoid

- Unsupported constructor properties such as `ariaLabel`, `description`, `tabIndex`, and `keyboardSupport`.
- Unverified chart events such as `keyDown`.
- Removing browser focus outlines without a replacement.
- Keyboard traps.
- Keyboard handlers that override built-in navigation.
- Color as the only method of communicating series identity.
- Tooltips as the only method of exposing essential information.
- Hiding the only data alternative from assistive technology.
- Empty or generic button labels such as `Action`.
- Repeated delayed print calls for multiple charts.
- Insecure or dynamically generated HTML from untrusted input.
- Unverified export parameters copied from other Chart components.

## Troubleshooting

### Screen Reader Does Not Announce the Chart

- Ensure that the chart is attached to the document.
- Add an accessible name to the host element through `aria-label` or `aria-labelledby`.
- Add a visible chart title.
- Associate a detailed description through `aria-describedby`.
- Provide a semantic HTML table containing the chart data.
- Confirm that the chart or its parent is not marked `aria-hidden="true"`.
- Confirm that the chart container is not hidden with `display: none`.
- Test with the target browser and screen-reader combination.

### Screen Reader Does Not Announce Every Value

- Provide a semantic data table as the complete data alternative.
- Enable data labels when visually appropriate.
- Enable the tooltip for point interaction.
- Provide a concise summary of important trends.
- Do not rely on unsupported custom tooltip tokens.
- Do not assume that a visual text label automatically provides a complete accessible description.

### Keyboard Navigation Is Not Working

- Ensure that the chart is visible and rendered.
- Use `Tab` or `Shift + Tab` to move focus into chart elements.
- Ensure that no parent component traps focus.
- Ensure that custom keyboard event handlers do not cancel built-in chart keys.
- Avoid applying `pointer-events: none` to chart elements.
- Check whether the required legend, selection, or tooltip feature is enabled.
- Use native buttons for external export and print actions.

### Keyboard Focus Is Not Visible

- Do not remove the browser's default focus outline.
- Add a high-contrast `:focus-visible` style to custom buttons.
- Check that the focus outline is not clipped by `overflow: hidden`.
- Ensure that focused controls have sufficient contrast against the background.

### Export Is Not Working

- Set `enableExport` to `true`.
- Ensure that the chart has completed rendering.
- Verify that the chart is attached to the document.
- Use one of the supported formats: `JPEG`, `PNG`, `SVG`, or `PDF`.
- Pass a valid file name.
- Call the export method from a user-initiated event such as a button click.
- Confirm that the browser permits downloads.
- Check the console for runtime errors.
- Check whether browser extensions or content security policies block the export.

### Exported File Name Is Incorrect

- Pass a simple file name to `chart.export`.
- Avoid unsupported file-system characters.
- Avoid manually adding the extension unless required by the installed package version.
- Ensure that the export type matches the intended output.

### Exported Chart Has Incorrect Colors

- Ensure that colors are valid CSS color values.
- Confirm that the selected theme styles are loaded.
- Use explicit `background`, `wallColor`, `fill`, and text colors when required.
- Verify that global CSS is not changing the chart container before export.
- Ensure that text colors contrast with the exported background.

### Print Is Not Working

- Call `chart.print()` from a user-initiated event.
- Confirm that the chart is visible.
- Ensure that the browser permits the print dialog.
- Check whether popup or kiosk policies block printing.
- Add print-specific CSS for page layout.
- Avoid repeated delayed calls to `chart.print()`.

### Printed Chart Is Clipped

- Set an appropriate chart width and height.
- Use `break-inside: avoid`.
- Use `page-break-inside: avoid` for broader browser support.
- Hide nonessential controls with `@media print`.
- Reduce oversized margins.
- Verify the browser print scale and orientation manually.

### RTL Layout Is Incorrect

- Set `enableRtl` to `true`.
- Apply `dir="rtl"` to the relevant container.
- Use a font that supports the required script.
- Localize the chart title, axis titles, labels, legend text, and controls.
- Use `legendSettings`, not `legend`.
- Check whether application CSS forces `direction: ltr`.
- Avoid unsupported title-style alignment properties.

## Next Steps

- **Chart types:** See `chart-types-3d.md`.
- **Performance:** See `data-and-performance.md`.
- **Styling:** See `appearance-and-styling.md`.
- **Interactions:** See `interaction-features-3d.md`.
- **Axes:** See `axes-customization-3d.md`.

## Combined Mistakes and Future References

- Use standalone EJ2 TypeScript and JavaScript examples for this documentation.
- Do not use Vue components, Vue directives, or Vue provider syntax.
- Import chart modules from `@syncfusion/ej2-charts`.
- Call `Chart3D.Inject(...)` before creating the chart.
- Inject `ColumnSeries3D` when the series type is `Column`.
- Inject `Category3D` when `primaryXAxis.valueType` is `Category`.
- Inject `DataLabel3D` when data labels are enabled.
- Inject `Tooltip3D` when the tooltip is enabled.
- Inject `Legend3D` when the legend is visible.
- Use `legendSettings`, not `legend`.
- Use valid `dataSource`, `xName`, and `yName` mappings.
- Ensure that Y-values are numeric.
- Call `appendTo` after creating the `Chart3D` instance.
- Do not document `ariaLabel` as a verified `Chart3D` constructor property.
- Do not document `description` as a verified `Chart3D` constructor property.
- Do not document `tabIndex` as a verified `Chart3D` constructor property.
- Do not document `keyboardSupport` as a verified `Chart3D` constructor property.
- Do not document `keyDown` or `IKeyboardEventArgs` as verified 3D Chart APIs without package-level validation.
- Apply application-specific `aria-label`, `aria-labelledby`, `aria-describedby`, `role`, and `tabindex` attributes to the chart host element.
- Use native HTML buttons for export and print actions.
- Preserve visible keyboard focus.
- Do not override built-in chart keyboard interactions without a validated requirement.
- The documented 3D Chart keyboard interactions include Tab, Shift + Tab, arrow keys, Escape, Enter, Space, and Ctrl + P.
- Provide an accessible chart summary.
- Provide a semantic data table when users need complete access to chart values.
- Do not rely on tooltips as the only data alternative.
- Do not rely on data labels as the only screen reader description.
- Do not use `${description}` as a tooltip token without validating that token.
- Use supported tooltip tokens such as `${point.x}`, `${point.y}`, and `${series.name}`.
- Use `${point.x}` and `${point.y}` in data label templates.
- Set `enableExport` to `true` when export functionality is required.
- The verified 3D Chart export formats are JPEG, PNG, SVG, and PDF.
- Use `chart.export(type, fileName)` for the verified 3D Chart export pattern.
- Do not document orientation, scale, width, height, controls, headers, footers, or multi-page parameters without validating them against the current 3D Chart API.
- Use `chart.print()` to print an individual rendered chart.
- Do not print multiple charts by repeatedly calling `print()` with delayed timers.
- Use a dedicated printable page or section when multiple charts must be printed together.
- Use `@media print` styles to hide controls and protect chart layout.
- Use `enableRtl` for right-to-left chart rendering.
- Apply `dir="rtl"` to the relevant HTML container.
- Use fonts that support Arabic, Hebrew, or the required script.
- Localize chart text and external control text.
- Do not place an unverified `textAlignment` property inside `titleStyle`.
- Do not communicate essential distinctions through color alone.
- Use meaningful series names, legends, data labels, tooltips, patterns, borders, summaries, or tables.
- Ensure sufficient color contrast in light, dark, and high-contrast themes.
- Test keyboard navigation with the target browser.
- Test accessibility with the target screen reader.
- Test export and print in every browser supported by the application.
- Remove application-owned event listeners during cleanup.
- Call `chart.destroy()` when the chart is permanently removed.