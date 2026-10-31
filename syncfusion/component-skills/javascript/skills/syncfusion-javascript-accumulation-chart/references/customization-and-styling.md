# Customization & Styling

## Table of Contents

- [Customization & Styling](#customization--styling)
  - [Theme Options](#theme-options)
    - [Applying a Theme](#applying-a-theme)
    - [Supported Theme Families](#supported-theme-families)
  - [Chart and Series Customization](#chart-and-series-customization)
    - [Chart Background and Border](#chart-background-and-border)
    - [Custom Color Palette](#custom-color-palette)
    - [Point Color Mapping](#point-color-mapping)
    - [Series Border](#series-border)
    - [Data Label Styling](#data-label-styling)
    - [Tooltip Styling](#tooltip-styling)
    - [Legend Styling](#legend-styling)
  - [CSS Customization](#css-customization)
    - [Chart Container Styling](#chart-container-styling)
    - [Using Chart Properties Instead of Internal CSS](#using-chart-properties-instead-of-internal-css)
  - [Responsive Sizing](#responsive-sizing)
    - [Responsive Width and Height](#responsive-width-and-height)
    - [Container-Based Sizing](#container-based-sizing)
    - [Responsive Layout with CSS](#responsive-layout-with-css)
    - [Application-Specific Resize Handling](#application-specific-resize-handling)
  - [Title and Subtitle](#title-and-subtitle)
    - [Basic Title](#basic-title)
    - [Title with Subtitle](#title-with-subtitle)
    - [Title and Subtitle Styling](#title-and-subtitle-styling)
  - [Print and Export](#print-and-export)
    - [Enable Export](#enable-export)
    - [Export to PNG](#export-to-png)
    - [Export to JPEG](#export-to-jpeg)
    - [Export to SVG](#export-to-svg)
    - [Export to PDF](#export-to-pdf)
    - [Print the Chart](#print-the-chart)
  - [Complete Customization Example](#complete-customization-example)
    - [TypeScript Example](#typescript-example)
    - [JavaScript Example](#javascript-example)
  - [Troubleshooting](#troubleshooting)


Customize an EJ2 Accumulation Chart using themes, chart properties, point colors, legends, data labels, tooltips, responsive dimensions, titles, subtitles, export, and print functionality.

## Theme Options

Use the chart-level `theme` property to apply a built-in Accumulation Chart theme.

The selected theme controls the default colors and text appearance. Explicit settings such as `background`, `palettes`, `pointColorMapping`, text styles, and borders can override theme defaults.

### Applying a Theme

**TypeScript:**

```typescript
import {
  AccumulationChart,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(PieSeries);

interface SalesData {
  region: string;
  sales: number;
}

const chartData: SalesData[] = [
  { region: 'East', sales: 135 },
  { region: 'West', sales: 198 },
  { region: 'North', sales: 160 },
  { region: 'South', sales: 121 }
];

const chart: AccumulationChart =
  new AccumulationChart({
    theme: 'Material',
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie',
        name: 'Sales'
      }
    ]
  });

chart.appendTo('#chart');
```

**JavaScript:**

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries
);

var chartData = [
  { region: 'East', sales: 135 },
  { region: 'West', sales: 198 },
  { region: 'North', sales: 160 },
  { region: 'South', sales: 121 }
];

var chart =
  new ej.charts.AccumulationChart({
    theme: 'Material',
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie',
        name: 'Sales'
      }
    ]
  });

chart.appendTo('#chart');
```

### Supported Theme Families

Commonly supported Accumulation Chart themes include:

- `Material`
- `MaterialDark`
- `Material3`
- `Material3Dark`
- `Fabric`
- `FabricDark`
- `Bootstrap`
- `BootstrapDark`
- `Bootstrap4`
- `Bootstrap5`
- `Bootstrap5Dark`
- `Tailwind`
- `TailwindDark`
- `Tailwind3`
- `Tailwind3Dark`
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `Fluent2HighContrast`
- `HighContrast`
- `HighContrastLight`

Use an exact theme enumeration supported by the installed `@syncfusion/ej2-charts` package version.

The Accumulation Chart is rendered using SVG. A basic standalone chart does not require an `ej2-charts/styles` stylesheet merely to display the SVG chart. Application CSS can still be used to size and style the chart container.

## Chart and Series Customization

### Chart Background and Border

Use `background` to configure the chart background and `border` to configure the chart boundary.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    background: '#F5F7FA',
    border: {
      color: '#D3D3D3',
      width: 1
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

### Custom Color Palette

Use `palettes` to supply a collection of colors for chart points.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    palettes: [
      '#0F6CBD',
      '#D83B01',
      '#107C10',
      '#8764B8'
    ],
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Use `palettes`, not `palette`.

### Point Color Mapping

Use `pointColorMapping` to read each point color from the data source.

```typescript
interface ColoredSalesData {
  region: string;
  sales: number;
  color: string;
}

const chartData: ColoredSalesData[] = [
  {
    region: 'East',
    sales: 135,
    color: '#0F6CBD'
  },
  {
    region: 'West',
    sales: 198,
    color: '#D83B01'
  },
  {
    region: 'North',
    sales: 160,
    color: '#107C10'
  },
  {
    region: 'South',
    sales: 121,
    color: '#8764B8'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        pointColorMapping: 'color',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Each mapped color must be a valid CSS color string.

### Series Border

Use the series `border` property to customize point boundaries.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie',
        border: {
          color: '#FFFFFF',
          width: 2
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Do not use a single series-level `fill` value when each Pie point requires a separate color. Use `palettes`, `pointColorMapping`, or the `pointRender` event.

### Data Label Styling

Import and inject `AccumulationDataLabel` before enabling data labels.

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel
);

const chart: AccumulationChart =
  new AccumulationChart({
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie',
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'region',
          font: {
            color: '#242424',
            fontFamily: 'Segoe UI',
            fontWeight: '600',
            size: '12px'
          },
          border: {
            color: '#808080',
            width: 1
          }
        }
      }
    ]
  });

chart.appendTo('#chart');
```

Use `dataLabel.name` to map label text from a data-source field.

### Tooltip Styling

Import and inject `AccumulationTooltip` when tooltips are enabled.

```typescript
import {
  AccumulationChart,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationTooltip
);

const chart: AccumulationChart =
  new AccumulationChart({
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:n2}',
      fill: '#242424',
      opacity: 0.95,
      border: {
        color: '#FFFFFF',
        width: 1
      },
      textStyle: {
        color: '#FFFFFF',
        fontFamily: 'Segoe UI',
        size: '12px'
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie',
        name: 'Sales'
      }
    ]
  });

chart.appendTo('#chart');
```

Use `fill`, not `background`, for the tooltip background. Use `textStyle.size`, not `fontSize`.

### Legend Styling

Import and inject `AccumulationLegend` before displaying the legend.

```typescript
import {
  AccumulationChart,
  AccumulationLegend,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationLegend
);

const chart: AccumulationChart =
  new AccumulationChart({
    legendSettings: {
      visible: true,
      position: 'Right',
      alignment: 'Center',
      background: '#FFFFFF',
      border: {
        color: '#D3D3D3',
        width: 1
      },
      textStyle: {
        color: '#242424',
        fontFamily: 'Segoe UI',
        size: '12px',
        fontWeight: '400'
      },
      shapeWidth: 12,
      shapeHeight: 12,
      shapePadding: 8
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

## CSS Customization

### Chart Container Styling

Use application-owned CSS classes to style the chart container.

**HTML:**

```html
<div id="chart" class="custom-chart"></div>
```

**CSS:**

```css
.custom-chart {
  width: 100%;
  min-height: 420px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #D3D3D3;
  border-radius: 8px;
  background:
    linear-gradient(
      135deg,
      #F5F7FA 0%,
      #E4EAF1 100%
    );
  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.1);
}
```

### Using Chart Properties Instead of Internal CSS

Do not depend on undocumented internal selectors such as:

- `.e-chart-title`
- `.e-legend`
- `.e-data-label`
- `.e-tooltip`

Internal SVG structures and class names can change between releases. Prefer supported chart properties:

- `titleStyle`
- `subTitleStyle`
- `legendSettings`
- `dataLabel.font`
- `tooltip.fill`
- `tooltip.textStyle`
- `background`
- `border`
- `palettes`
- `pointColorMapping`

Use CSS primarily for application-owned containers and controls.

## Responsive Sizing

### Responsive Width and Height

Use a percentage width and a stable height.

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    width: '100%',
    height: '420px',
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Avoid `height: '100%'` unless every parent element has an explicitly resolved height.

### Container-Based Sizing

**HTML:**

```html
<div id="chart-container">
  <div id="chart"></div>
</div>
```

**CSS:**

```css
#chart-container {
  width: 100%;
  height: 500px;
}

#chart {
  width: 100%;
  height: 100%;
}
```

**TypeScript:**

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    width: '100%',
    height: '100%',
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

A manual `offsetWidth` and `offsetHeight` calculation is unnecessary when CSS and percentage dimensions satisfy the layout requirement.

### Responsive Layout with CSS

```css
#chart {
  width: 100%;
  min-height: 420px;
}

@media (max-width: 767px) {
  #chart {
    min-height: 320px;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  #chart {
    min-height: 400px;
  }
}

@media (min-width: 1024px) {
  #chart {
    min-height: 500px;
  }
}
```

Avoid assigning a fixed width such as `800px` when the chart must remain responsive.

### Application-Specific Resize Handling

Do not use an unverified `resizeRedraw` property.

When application-specific settings must change at a breakpoint, use a debounced resize listener.

```typescript
let resizeTimer: number | undefined;

const handleResize = (): void => {
  window.clearTimeout(resizeTimer);

  resizeTimer = window.setTimeout(() => {
    const nextPosition:
      'Right' | 'Bottom' =
      window.innerWidth > 768
        ? 'Right'
        : 'Bottom';

    if (
      chart.legendSettings.position !==
      nextPosition
    ) {
      chart.legendSettings.position =
        nextPosition;

      chart.refresh();
    }
  }, 150);
};

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener('beforeunload', () => {
  window.clearTimeout(resizeTimer);

  window.removeEventListener(
    'resize',
    handleResize
  );

  chart.destroy();
});
```

Do not call `refresh()` continuously for every raw resize event.

## Title and Subtitle

The Accumulation Chart supports `title`, `subTitle`, `titleStyle`, and `subTitleStyle`.

### Basic Title

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Sales Distribution by Region',
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

### Title with Subtitle

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Sales Distribution by Region',
    subTitle: 'Quarterly Report for Q1 2026',
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

### Title and Subtitle Styling

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Regional Sales Performance',
    titleStyle: {
      color: '#1F4E79',
      fontFamily: 'Segoe UI',
      fontStyle: 'Normal',
      fontWeight: '600',
      size: '18px'
    },
    subTitle: 'Fiscal Year 2026',
    subTitleStyle: {
      color: '#5A5A5A',
      fontFamily: 'Segoe UI',
      fontStyle: 'Italic',
      fontWeight: '400',
      size: '13px'
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

Do not use unverified properties such as:

```typescript
titleStyle: {
  align: 'Center'
}
```

Do not use an unverified chart-level `titlePadding` object.

Use the supported chart margin and text-style properties when additional spacing is required.

## Print and Export

Set `enableExport` to `true` when export functionality is required.

### Enable Export

```typescript
const chart: AccumulationChart =
  new AccumulationChart({
    enableExport: true,
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        type: 'Pie'
      }
    ]
  });

chart.appendTo('#chart');
```

### Export to PNG

```typescript
chart.export(
  'PNG',
  'regional-sales'
);
```

### Export to JPEG

```typescript
chart.export(
  'JPEG',
  'regional-sales'
);
```

### Export to SVG

```typescript
chart.export(
  'SVG',
  'regional-sales'
);
```

### Export to PDF

```typescript
chart.export(
  'PDF',
  'regional-sales'
);
```

Use a file name without manually appending an extension unless the installed package version specifically requires one.

### Print the Chart

```typescript
chart.print();
```

Use native buttons for export and print actions.

```html
<div
  class="chart-actions"
  role="group"
  aria-label="Chart export and print actions"
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
    Print chart
  </button>
</div>
```

## Complete Customization Example

### TypeScript Example

```typescript
import {
  AccumulationChart,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
  PieSeries
} from '@syncfusion/ej2-charts';

AccumulationChart.Inject(
  PieSeries,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip
);

interface RegionalSalesData {
  region: string;
  sales: number;
  color: string;
  label: string;
}

const chartData: RegionalSalesData[] = [
  {
    region: 'East',
    sales: 135,
    color: '#0F6CBD',
    label: 'East: 135'
  },
  {
    region: 'West',
    sales: 198,
    color: '#D83B01',
    label: 'West: 198'
  },
  {
    region: 'North',
    sales: 160,
    color: '#107C10',
    label: 'North: 160'
  },
  {
    region: 'South',
    sales: 121,
    color: '#8764B8',
    label: 'South: 121'
  }
];

const chart: AccumulationChart =
  new AccumulationChart({
    title: 'Regional Sales Analysis',
    subTitle: 'Quarter 1 2026',
    theme: 'Fluent',
    width: '100%',
    height: '440px',
    enableExport: true,
    background: '#F5F7FA',
    border: {
      color: '#D3D3D3',
      width: 1
    },
    titleStyle: {
      color: '#1F4E79',
      fontFamily: 'Segoe UI',
      fontWeight: '600',
      size: '18px'
    },
    subTitleStyle: {
      color: '#5A5A5A',
      fontFamily: 'Segoe UI',
      fontStyle: 'Italic',
      size: '13px'
    },
    legendSettings: {
      visible: true,
      position:
        window.innerWidth > 768
          ? 'Right'
          : 'Bottom',
      alignment: 'Center',
      textStyle: {
        color: '#242424',
        fontFamily: 'Segoe UI',
        size: '12px'
      }
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:n2}<br>' +
        'Share: ${point.percentage:n1}%',
      fill: '#242424',
      opacity: 0.95,
      border: {
        color: '#FFFFFF',
        width: 1
      },
      textStyle: {
        color: '#FFFFFF',
        fontFamily: 'Segoe UI',
        size: '12px'
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Regional Sales',
        radius: '88%',
        border: {
          color: '#FFFFFF',
          width: 2
        },
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label',
          font: {
            color: '#242424',
            fontFamily: 'Segoe UI',
            size: '12px',
            fontWeight: '600'
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

const exportJpegButton: HTMLButtonElement | null =
  document.getElementById(
    'export-jpeg'
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

exportPngButton?.addEventListener('click', () => {
  chart.export(
    'PNG',
    'regional-sales-report'
  );
});

exportJpegButton?.addEventListener('click', () => {
  chart.export(
    'JPEG',
    'regional-sales-report'
  );
});

exportSvgButton?.addEventListener('click', () => {
  chart.export(
    'SVG',
    'regional-sales-report'
  );
});

exportPdfButton?.addEventListener('click', () => {
  chart.export(
    'PDF',
    'regional-sales-report'
  );
});

printButton?.addEventListener('click', () => {
  chart.print();
});

window.addEventListener('beforeunload', () => {
  chart.destroy();
});
```

**HTML:**

```html
<div
  id="chart"
  class="custom-chart"
  role="region"
  aria-label="Pie chart showing regional sales"
></div>

<div
  class="chart-actions"
  role="group"
  aria-label="Chart export and print actions"
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
    Print chart
  </button>
</div>
```

**CSS:**

```css
.custom-chart {
  width: 100%;
  min-height: 440px;
  border-radius: 8px;
  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.1);
}

.chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.chart-actions button {
  min-height: 40px;
  padding: 8px 16px;
}

.chart-actions button:focus-visible {
  outline: 3px solid #0F6CBD;
  outline-offset: 2px;
}

@media print {
  .chart-actions {
    display: none;
  }

  .custom-chart {
    break-inside: avoid;
    page-break-inside: avoid;
    box-shadow: none;
  }
}
```

### JavaScript Example

```javascript
ej.charts.AccumulationChart.Inject(
  ej.charts.PieSeries,
  ej.charts.AccumulationDataLabel,
  ej.charts.AccumulationLegend,
  ej.charts.AccumulationTooltip
);

var chart[
Source: chartData,
Name: 'region',
Name: 'sales',
ColorMapping: 'color',
: 'Pie',
: 'Regional Sales',
: '88%',
: {
: '#FFFFFF',
: 2
Label: {
: true,
: 'Outside',
: 'label',
: {
: '#242424',
Family: 'Segoe UI',
: '12px',
Weight: '600'
To('#chart');

PngButton: HTMLButtonElement |  {
    region: 'South',
    sales: 121,
    color: '#8764B8',
    label: 'South: 121'
  }
];

var chart =
  new ej.charts.AccumulationChart({
    title: 'Regional Sales Analysis',
    subTitle: 'Quarter 1 2026',
    theme: 'Fluent',
    width: '100%',
    height: '440px',
    enableExport: true,
    background: '#F5F7FA',
    border: {
      color: '#D3D3D3',
      width: 1
    },
    legendSettings: {
      visible: true,
      position:
        window.innerWidth > 768
          ? 'Right'
          : 'Bottom',
      alignment: 'Center'
    },
    tooltip: {
      enable: true,
      header: '',
      format:
        '<b>${point.x}</b><br>' +
        'Sales: ${point.y:n2}<br>' +
        'Share: ${point.percentage:n1}%',
      fill: '#242424',
      textStyle: {
        color: '#FFFFFF',
        size: '12px'
      }
    },
    series: [
      {
        dataSource: chartData,
        xName: 'region',
        yName: 'sales',
        pointColorMapping: 'color',
        type: 'Pie',
        name: 'Regional Sales',
        radius: '88%',
        border: {
          color: '#FFFFFF',
          width: 2
        },
        dataLabel: {
          visible: true,
          position: 'Outside',
          name: 'label'
        }
      }
    ]
  });

chart.appendTo('#chart');

document
  .getElementById('export-png')
  ?.addEventListener('click', function () {
    chart.export(
      'PNG',
      'regional-sales-report'
    );
  });

document
  .getElementById('export-svg')
  ?.addEventListener('click', function () {
    chart.export(
      'SVG',
      'regional-sales-report'
    );
  });

document
  .getElementById('export-pdf')
  ?.addEventListener('click', function () {
    chart.export(
      'PDF',
      'regional-sales-report'
    );
  });

document
  .getElementById('print-chart')
  ?.addEventListener('click', function () {
    chart.print();
  });
```

## Troubleshooting

### Theme Is Not Applied

- Use an exact theme name supported by the installed package version.
- Check the casing of the theme value.
- Ensure that custom point colors are not overriding the theme palette.
- Ensure that `background`, text styles, and borders are not overriding theme defaults.
- Refresh or recreate the chart after changing the theme dynamically.

### Custom Colors Are Not Applied

- Use `palettes` for a chart-level color collection.
- Use `pointColorMapping` for data-driven point colors.
- Ensure that mapped color values are valid CSS colors.
- Check whether `pointRender` changes the point fill.
- Do not rely on an undocumented internal CSS class to color SVG points.

### Custom CSS Is Not Applied

- Apply CSS to application-owned containers.
- Ensure that the stylesheet is loaded.
- Check CSS specificity.
- Avoid relying on undocumented `.e-*` selectors.
- Prefer supported chart configuration properties for generated chart elements.
- Avoid using `!important` unless a validated application requirement exists.

### Chart Is Not Responsive

- Use `width: '100%'`.
- Give the chart or parent container a resolved height.
- Avoid `height: '100%'` when parent heights are not defined.
- Use media queries to change container height.
- Use a debounced resize handler only when configuration values must change.
- Do not use an unverified `resizeRedraw` property.

### Title Is Clipped or Overlapping

- Shorten the title.
- Reduce `titleStyle.size`.
- Increase the chart height.
- Increase the chart margin when supported and required.
- Keep subtitle text concise.
- Do not use an unsupported `titlePadding` object.
- Do not place an unsupported `align` property inside `titleStyle`.

### Data Labels Are Not Displayed

- Import and inject `AccumulationDataLabel`.
- Set `dataLabel.visible` to `true`.
- Place `dataLabel` inside the series.
- Map `dataLabel.name` to a valid field.
- Increase the chart dimensions.
- Use `position: 'Outside'` when labels do not fit inside points.

### Tooltip Is Not Displayed

- Import and inject `AccumulationTooltip`.
- Do not inject the regular Cartesian Chart `Tooltip`.
- Set `tooltip.enable` to `true`.
- Use valid tooltip tokens.
- Use `tooltip.fill`, not `tooltip.background`.
- Use `tooltip.textStyle.size`, not `fontSize`.

### Legend Is Not Displayed

- Import and inject `AccumulationLegend`.
- Set `legendSettings.visible` to `true`.
- Use `legendSettings`, not `legend`.
- Ensure that `xName` maps to meaningful category values.
- Ensure that the chart has enough space for the selected legend position.

### Export Is Not Working

- Set `enableExport` to `true`.
- Ensure that the chart has completed rendering.
- Use `PNG`, `JPEG`, `SVG`, or `PDF`.
- Call `export` from a user-initiated event.
- Pass a valid file name.
- Ensure that the browser permits downloads.
- Check the browser console for errors.

### Print Is Not Working

- Call `chart.print()` from a user-initiated action.
- Ensure that the chart is visible.
- Ensure that the browser permits the print dialog.
- Add `@media print` styles to protect the chart layout.
- Hide export and print controls during printing.