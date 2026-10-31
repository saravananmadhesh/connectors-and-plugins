# Customization, Dimensions & Export

## Table of Contents

- [Customization, Dimensions & Export](#customization-dimensions--export)
  - [Overview](#overview)
  - [Orientation](#orientation)
    - [Horizontal Orientation](#horizontal-orientation)
    - [Vertical Orientation](#vertical-orientation)
    - [Select an Orientation](#select-an-orientation)
    - [Mixed Dashboard Layout](#mixed-dashboard-layout)
  - [Right-to-Left Support](#right-to-left-support)
    - [Enable RTL](#enable-rtl)
    - [RTL Document Setup](#rtl-document-setup)
    - [RTL Category Labels](#rtl-category-labels)
    - [Dynamic Direction Switching](#dynamic-direction-switching)
  - [Animations](#animations)
    - [Configure Animation](#configure-animation)
    - [Disable Animation](#disable-animation)
    - [Reduced Motion](#reduced-motion)
    - [Animation During Updates](#animation-during-updates)
  - [Themes](#themes)
    - [Apply a Theme](#apply-a-theme)
    - [Supported Theme Families](#supported-theme-families)
    - [Dynamic Theme Switching](#dynamic-theme-switching)
    - [Custom Colors](#custom-colors)
  - [Container Sizing](#container-sizing)
    - [Fixed Dimensions](#fixed-dimensions)
    - [Percentage Dimensions](#percentage-dimensions)
    - [Container-Controlled Sizing](#container-controlled-sizing)
    - [Default Dimensions](#default-dimensions)
  - [Responsive Design](#responsive-design)
    - [Responsive Container](#responsive-container)
    - [Responsive Dashboard Layout](#responsive-dashboard-layout)
    - [Responsive Chart Configuration](#responsive-chart-configuration)
    - [Resize Handling](#resize-handling)
  - [Export Functionality](#export-functionality)
    - [Direct Export Support](#direct-export-support)
    - [SVG Download Workflow](#svg-download-workflow)
    - [PNG Export Workflow](#png-export-workflow)
    - [PDF Report Workflow](#pdf-report-workflow)
  - [Print Options](#print-options)
    - [Print the Bullet Chart](#print-the-bullet-chart)
    - [Print Multiple Elements](#print-multiple-elements)
    - [Before Print Event](#before-print-event)
    - [Print-Specific CSS](#print-specific-css)
    - [Browser Print Shortcut](#browser-print-shortcut)
  - [Complete TypeScript Example](#complete-typescript-example)
  - [Complete JavaScript Example](#complete-javascript-example)
  - [Best Practices](#best-practices)
  - [Troubleshooting](#troubleshooting)
    - [Orientation Is Incorrect](#orientation-is-incorrect)
    - [RTL Is Not Applied](#rtl-is-not-applied)
    - [Animation Is Not Visible](#animation-is-not-visible)
    - [Theme Is Not Applied](#theme-is-not-applied)
    - [Custom Palette Is Not Applied](#custom-palette-is-not-applied)
    - [Percentage Height Is Not Working](#percentage-height-is-not-working)
    - [Responsive Labels Are Not Updating](#responsive-labels-are-not-updating)
    - [Direct Export Method Is Not Working](#direct-export-method-is-not-working)
    - [PDF Export Is Not Working](#pdf-export-is-not-working)
    - [Print Is Not Working](#print-is-not-working)
  - [Related Topics](#related-topics)


## Overview

The EJ2 Bullet Chart supports:

- Horizontal and vertical orientations.
- Right-to-left rendering.
- Feature-bar animation.
- Built-in themes.
- Pixel and percentage dimensions.
- Responsive container layouts.
- Browser printing.
- Application-owned SVG, image, and PDF export workflows.

The default Bullet Chart orientation is `Horizontal`, not `Vertical`. Use the `orientation` property to switch between `Horizontal` and `Vertical`.

The Bullet Chart supports `enableRtl`, `animation`, `theme`, `width`, and `height` as Chart-level properties.

## Orientation

### Horizontal Orientation

The default orientation is `Horizontal`. In a left-to-right layout, the scale generally progresses from left to right.

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
  },
  {
    value: 82,
    target: 90,
    category: 'Profit'
  }
];

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20,
    width: '100%',
    height: '400px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Horizontal orientation is normally appropriate for:

- Multiple measures.
- Longer category labels.
- Dashboard cards.
- Left-to-right or right-to-left performance reading.
- Layouts where horizontal width is greater than vertical space.

### Vertical Orientation

Set `orientation` to `Vertical` when values should progress vertically.

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
    minimum: 0,
    maximum: 100,
    interval: 20,
    width: '300px',
    height: '500px'
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Vertical orientation is useful for:

- A small number of measures.
- Narrow dashboard cards.
- Side-by-side KPI comparisons.
- Layouts with more vertical than horizontal space.

Vertical orientation is not the default.

### Select an Orientation

Use the available layout and category-label length to choose the orientation.

Prefer `Horizontal` when:

- The Chart contains several categories.
- Category labels are long.
- The Chart spans most of the page width.
- Users must scan measures from top to bottom.

Prefer `Vertical` when:

- The Chart displays a single KPI.
- Several narrow KPI cards appear side by side.
- Horizontal space is limited.
- Category labels are short.

Do not switch orientation solely based on an arbitrary breakpoint without checking whether the resulting labels and scale remain readable.

### Mixed Dashboard Layout

Different Bullet Chart instances can use different orientations.

```typescript
const salesChart: BulletChart =
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
    minimum: 0,
    maximum: 100,
    interval: 20,
    width: '100%',
    height: '420px'
  });

salesChart.appendTo(
  '#sales-chart'
);

const departmentChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 55,
        target: 75,
        category: 'Team A'
      },
      {
        value: 82,
        target: 90,
        category: 'Team B'
      },
      {
        value: 38,
        target: 60,
        category: 'Team C'
      }
    ],
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20,
    width: '100%',
    height: '420px'
  });

departmentChart.appendTo(
  '#department-chart'
);
```

Every instance must have its own host element.

## Right-to-Left Support

### Enable RTL

Set `enableRtl` to `true`.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: [
      {
        value: 85,
        target: 90,
        category: 'المبيعات'
      },
      {
        value: 72,
        target: 85,
        category: 'الأرباح'
      }
    ],
    categoryField: 'category',
    valueField: 'value',
    targetField: 'target',
    enableRtl: true,
    orientation: 'Horizontal',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart supports right-to-left rendering through its Chart-level `enableRtl` property.

### RTL Document Setup

Set the language and direction on the document or nearest relevant container.

```html
<section
  lang="ar"
  dir="rtl"
  aria-labelledby="performance-heading"
>
  <h1 id="performance-heading">
    أداء المبيعات
  </h1>

  <p id="performance-summary">
    يقارن المخطط القيم الفعلية بالقيم المستهدفة.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="performance-summary"
  ></div>
</section>
```

Use both:

```typescript
enableRtl: true
```

and:

```html
dir="rtl"
```

The Chart property controls the component layout, while the HTML attribute establishes the direction for surrounding content.

### RTL Category Labels

Use `categoryLabelStyle` for readable category text.

```typescript
categoryLabelStyle: {
  fontFamily:
    'Arial, sans-serif',
  size: '14px',
  color: '#242424',
  fontStyle: 'Normal',
  fontWeight: '600'
}
```

Use a font available in the target application. Do not depend on `Arial Unicode MS`, which may not be installed on every device.

### Dynamic Direction Switching

```typescript
type SupportedLanguage =
  | 'en'
  | 'ar';

interface LocalizedData {
  value: number;
  target: number;
  category: string;
}

const englishData:
  LocalizedData[] = [
    {
      value: 85,
      target: 90,
      category: 'Sales'
    },
    {
      value: 72,
      target: 85,
      category: 'Profit'
    }
  ];

const arabicData:
  LocalizedData[] = [
    {
      value: 85,
      target: 90,
      category: 'المبيعات'
    },
    {
      value: 72,
      target: 85,
      category: 'الأرباح'
    }
  ];

function setLanguage(
  language: SupportedLanguage
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

  bulletChart.title =
    isRtl
      ? 'أداء المبيعات'
      : 'Sales Performance';

  bulletChart.refresh();
}
```

Localize the data-source categories as well as the Chart title.

## Animations

The actual and target bars support linear animation. Animation speed and delay are controlled through `duration` and `delay`.

### Configure Animation

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
    animation: {
      enable: true,
      duration: 800,
      delay: 0
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use a short duration for dashboard interfaces.

### Disable Animation

```typescript
animation: {
  enable: false
}
```

Disable animation when:

- The Bullet Chart updates frequently.
- The user prefers reduced motion.
- Several Bullet Charts load simultaneously.
- Animation interferes with comparison.
- Automated visual testing requires stable output.

Do not assume animation is always enabled by default. Configure the required behavior explicitly.

### Reduced Motion

Respect the user's operating-system preference.

```typescript
const prefersReducedMotion:
  boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    minimum: 0,
    maximum: 100,
    interval: 20,
    animation: {
      enable:
        !prefersReducedMotion,
      duration:
        prefersReducedMotion
          ? 0
          : 800,
      delay: 0
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

### Animation During Updates

Update the data and refresh the existing instance.

```typescript
const updatedData = [
  {
    value: 72,
    target: 85,
    category: 'Sales'
  }
];

bulletChart.dataSource =
  updatedData;

bulletChart.refresh();
```

Do not guarantee that every refresh reproduces the initial-load animation identically. Animation behavior depends on the installed version and update path.

For frequent updates, use:

```typescript
bulletChart.animation = {
  enable: false
};
```

## Themes

### Apply a Theme

Use the `theme` property.

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    theme: 'Material',
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
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

The Bullet Chart supports theme selection through its `theme` property.

### Supported Theme Families

Common EJ2 theme families include:

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
- `Fluent`
- `FluentDark`
- `Fluent2`
- `Fluent2Dark`
- `Tailwind`
- `TailwindDark`
- `Tailwind3`
- `Tailwind3Dark`
- `HighContrast`

Use an exact theme value supported by the installed `@syncfusion/ej2-charts` version.

Do not use an unverified theme name such as:

```typescript
theme: 'TailwindLight'
```

Use:

```typescript
theme: 'Tailwind'
```

### Dynamic Theme Switching

```typescript
type SupportedTheme =
  | 'Material'
  | 'MaterialDark'
  | 'Fluent'
  | 'FluentDark'
  | 'Fluent2'
  | 'Fluent2Dark'
  | 'HighContrast';

function setTheme(
  theme: SupportedTheme
): void {
  bulletChart.theme =
    theme;

  bulletChart.refresh();
}
```

Button example:

```html
<button
  id="toggle-theme"
  type="button"
>
  Toggle theme
</button>
```

```typescript
let isDarkMode: boolean =
  false;

const themeButton:
  HTMLButtonElement | null =
  document.getElementById(
    'toggle-theme'
  ) as HTMLButtonElement | null;

const toggleTheme = (): void => {
  isDarkMode =
    !isDarkMode;

  setTheme(
    isDarkMode
      ? 'Fluent2Dark'
      : 'Fluent2'
  );
};

themeButton?.addEventListener(
  'click',
  toggleTheme
);
```

Use an appropriate dark theme instead of treating `HighContrast` as a general-purpose dark mode.

### Custom Colors

The Bullet Chart does not expose the regular Cartesian Chart `palette` or `palettes` properties.

Do not use:

```typescript
palette: [
  '#27AE60',
  '#E74C3C'
]
```

Customize supported elements directly:

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
    valueFill: '#0F6CBD',
    targetColor: '#242424',
    ranges: [
      {
        end: 50,
        color: '#D13438',
        opacity: 0.14
      },
      {
        end: 75,
        color: '#C19C00',
        opacity: 0.14
      },
      {
        end: 100,
        color: '#107C10',
        opacity: 0.14
      }
    ],
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Use:

- `valueFill` for actual-bar color.
- `targetColor` for target-marker color.
- `ranges[].color` for qualitative ranges.
- Text-style properties for labels and titles.
- `border` for the Bullet Chart border.

## Container Sizing

The Bullet Chart size can be controlled through the host container or through the Chart `width` and `height` properties. Pixel and percentage values are supported.

### Fixed Dimensions

```html
<div
  id="bullet-chart"
  style="width: 600px; height: 400px;"
></div>
```

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    width: '600px',
    height: '400px',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Avoid defining conflicting dimensions in both CSS and the Chart unless the relationship is intentional.

### Percentage Dimensions

Percentage dimensions are resolved relative to the host's containing layout.

```html
<div class="bullet-chart-wrapper">
  <div id="bullet-chart"></div>
</div>
```

```css
.bullet-chart-wrapper {
  width: 100%;
  max-width: 1200px;
  height: 500px;
}

#bullet-chart {
  width: 100%;
  height: 100%;
}
```

```typescript
const bulletChart: BulletChart =
  new BulletChart({
    dataSource: chartData,
    valueField: 'value',
    targetField: 'target',
    categoryField: 'category',
    width: '100%',
    height: '100%',
    minimum: 0,
    maximum: 100,
    interval: 20
  });

bulletChart.appendTo(
  '#bullet-chart'
);
```

Every parent involved in percentage height calculation must have a resolved height.

### Container-Controlled Sizing

Allow CSS to control the available width while assigning a stable Chart height.

```css
#bullet-chart {
  width: 100%;
  min-height: 400px;
}
```

```typescript
width: '100%',
height: '400px'
```

This approach is normally easier to maintain than calculating dimensions from the viewport in JavaScript.

### Default Dimensions

If no explicit dimensions are configured, the Bullet Chart documentation states that it renders with a default height of `126px` and a width based on the window.

Set a deliberate height for production dashboards.

## Responsive Design

### Responsive Container

```html
<div
  id="bullet-chart"
  class="bullet-chart-container"
></div>
```

```css
.bullet-chart-container {
  width: 100%;
  min-height: 420px;
}

@media (max-width: 767px) {
  .bullet-chart-container {
    min-height: 340px;
  }
}

@media (max-width: 479px) {
  .bullet-chart-container {
    min-height: 300px;
  }
}
```

Avoid `!important` unless it is needed to resolve a known cascade conflict.

### Responsive Dashboard Layout

```html
<div class="dashboard">
  <section class="chart-card">
    <h2>Sales</h2>
    <div id="sales-chart"></div>
  </section>

  <section class="chart-card">
    <h2>Profit</h2>
    <div id="profit-chart"></div>
  </section>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-columns:
    repeat(
      auto-fit,
      minmax(300px, 1fr)
    );
  gap: 20px;
}

.chart-card {
  min-width: 0;
  padding: 16px;
  border: 1px solid #D3D3D3;
  border-radius: 8px;
  background: #FFFFFF;
}

.chart-card > div {
  width: 100%;
  min-height: 360px;
}
```

Grid or Flexbox can control dashboard layout without manually computing every Chart width.

### Responsive Chart Configuration

Update supported properties when the layout crosses a breakpoint.

```typescript
interface ResponsiveSettings {
  orientation:
    'Horizontal' |
    'Vertical';
  height: string;
  categorySize: string;
}

function getResponsiveSettings():
  ResponsiveSettings {
  const isMobile: boolean =
    window.innerWidth < 600;

  return {
    orientation:
      isMobile
        ? 'Horizontal'
        : 'Horizontal',
    height:
      isMobile
        ? '340px'
        : '420px',
    categorySize:
      isMobile
        ? '12px'
        : '14px'
  };
}
```

In many cases, keeping the same horizontal orientation across breakpoints is more readable than changing the meaning and layout of the visualization.

Apply settings:

```typescript
function applyResponsiveSettings():
  void {
  const settings:
    ResponsiveSettings =
    getResponsiveSettings();

  bulletChart.orientation =
    settings.orientation;

  bulletChart.height =
    settings.height;

  bulletChart.categoryLabelStyle = {
    ...bulletChart
      .categoryLabelStyle,
    size:
      settings.categorySize
  };

  bulletChart.refresh();
}
```

### Resize Handling

Debounce application-owned resize handlers.

```typescript
let resizeTimer:
  number | undefined;

const handleResize = (): void => {
  window.clearTimeout(
    resizeTimer
  );

  resizeTimer =
    window.setTimeout(
      (): void => {
        applyResponsiveSettings();
      },
      150
    );
};

window.addEventListener(
  'resize',
  handleResize
);
```

Do not call `refresh()` continuously for every raw resize event.

The Bullet Chart does not expose the regular Cartesian Chart `pointRender` data-label workflow.

Do not use:

```typescript
pointRender: (args) => {
  args.dataLabel.visible = false;
}
```

Control Bullet Chart labels through:

```typescript
dataLabel: {
  enable: false
}
```

For breakpoint changes:

```typescript
bulletChart.dataLabel = {
  enable:
    window.innerWidth >= 480,
  labelStyle: {
    color: '#242424',
    size: '12px'
  }
};

bulletChart.refresh();
```

## Export Functionality

### Direct Export Support

Do not apply the regular Cartesian `Chart` export API to `BulletChart` without explicit validation against the installed version.

The regular EJ2 `Chart` component supports export through its `Export` module, but that does not establish that `BulletChart` supports the same `export()` method or a `PdfExport` injection module.

Do not use unverified code such as:

```typescript
import {
  PdfExport
} from '@syncfusion/ej2-charts';

BulletChart.Inject(
  PdfExport
);
```

Do not assume this is supported:

```typescript
bulletChart.export(
  'PNG',
  'bullet-chart'
);
```

Use an application-owned export workflow when a Bullet Chart image or document is required.

### SVG Download Workflow

The Bullet Chart renders SVG content. An application can serialize the generated SVG and download it.

```typescript
function downloadBulletChartSvg(
  chartElementId: string,
  fileName: string
): void {
  const host:
    HTMLElement | null =
    document.getElementById(
      chartElementId
    );

  const svg:
    SVGSVGElement | null =
    host?.querySelector(
      'svg'
    ) ?? null;

  if (!svg) {
    throw new Error(
      'The rendered Bullet Chart SVG was not found.'
    );
  }

  const serializer:
    XMLSerializer =
    new XMLSerializer();

  const svgText: string =
    serializer.serializeToString(
      svg
    );

  const blob: Blob =
    new Blob(
      [svgText],
      {
        type:
          'image/svg+xml;charset=utf-8'
      }
    );

  const downloadUrl: string =
    URL.createObjectURL(
      blob
    );

  const link:
    HTMLAnchorElement =
    document.createElement(
      'a'
    );

  link.href =
    downloadUrl;

  link.download =
    fileName.endsWith('.svg')
      ? fileName
      : `${fileName}.svg`;

  link.click();

  URL.revokeObjectURL(
    downloadUrl
  );
}
```

Attach it to a native button:

```typescript
const exportSvgButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-svg'
  ) as HTMLButtonElement | null;

const exportSvg = (): void => {
  downloadBulletChartSvg(
    'bullet-chart',
    'sales-performance'
  );
};

exportSvgButton?.addEventListener(
  'click',
  exportSvg
);
```

Validate externally referenced fonts, images, and styles if the exported SVG must be completely self-contained.

### PNG Export Workflow

Convert the serialized SVG to an image using a Canvas.

```typescript
async function downloadBulletChartPng(
  chartElementId: string,
  fileName: string
): Promise<void> {
  const host:
    HTMLElement | null =
    document.getElementById(
      chartElementId
    );

  const svg:
    SVGSVGElement | null =
    host?.querySelector(
      'svg'
    ) ?? null;

  if (!svg) {
    throw new Error(
      'The rendered Bullet Chart SVG was not found.'
    );
  }

  const serializer:
    XMLSerializer =
    new XMLSerializer();

  const svgText: string =
    serializer.serializeToString(
      svg
    );

  const svgBlob: Blob =
    new Blob(
      [svgText],
      {
        type:
          'image/svg+xml;charset=utf-8'
      }
    );

  const svgUrl: string =
    URL.createObjectURL(
      svgBlob
    );

  try {
    const image:
      HTMLImageElement =
      new Image();

    await new Promise<void>(
      (
        resolve:
          () => void,
        reject:
          (
            reason?: unknown
          ) => void
      ): void => {
        image.onload =
          (): void => resolve();

        image.onerror =
          (): void => reject(
            new Error(
              'Unable to load the Bullet Chart SVG for PNG conversion.'
            )
          );

        image.src =
          svgUrl;
      }
    );

    const viewBox =
      svg.viewBox.baseVal;

    const width: number =
      viewBox.width ||
      svg.clientWidth ||
      800;

    const height: number =
      viewBox.height ||
      svg.clientHeight ||
      400;

    const canvas:
      HTMLCanvasElement =
      document.createElement(
        'canvas'
      );

    canvas.width =
      Math.ceil(width);

    canvas.height =
      Math.ceil(height);

    const context:
      CanvasRenderingContext2D | null =
      canvas.getContext(
        '2d'
      );

    if (!context) {
      throw new Error(
        'Canvas rendering is unavailable.'
      );
    }

    context.fillStyle =
      '#FFFFFF';

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    const pngUrl: string =
      canvas.toDataURL(
        'image/png'
      );

    const link:
      HTMLAnchorElement =
      document.createElement(
        'a'
      );

    link.href =
      pngUrl;

    link.download =
      fileName.endsWith('.png')
        ? fileName
        : `${fileName}.png`;

    link.click();
  } finally {
    URL.revokeObjectURL(
      svgUrl
    );
  }
}
```

Browser security restrictions may affect Canvas conversion when the SVG contains cross-origin images or fonts.

### PDF Report Workflow

For a browser-generated PDF, use the browser print dialog and choose **Save as PDF**.

For a downloadable PDF created without the print dialog:

1. Export or serialize the Bullet Chart to SVG or PNG.
2. Pass the exported content to a validated PDF-generation library or server endpoint.
3. Add headings, descriptions, and tabular values to the PDF.
4. Verify page size, orientation, and accessibility requirements.

Do not label an unverified `bulletChart.export('PDF', ...)` call as supported.

## Print Options

### Print the Bullet Chart

The Bullet Chart provides print support through the print utility. The print method accepts an optional element, element ID, or collection of element IDs.

```typescript
const printButton:
  HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

const printChart = (): void => {
  bulletChart.print();
};

printButton?.addEventListener(
  'click',
  printChart
);
```

Use a native button:

```html
<button
  id="print-chart"
  type="button"
>
  Print Chart
</button>
```

### Print Multiple Elements

Print the heading, summary, and Bullet Chart together.

```typescript
bulletChart.print([
  'report-heading',
  'report-summary',
  'bullet-chart'
]);
```

HTML:

```html
<section id="performance-report">
  <h1 id="report-heading">
    Sales Performance
  </h1>

  <p id="report-summary">
    Actual sales are 72 units against a target of 85 units.
  </p>

  <div id="bullet-chart"></div>
</section>
```

### Before Print Event

Use `beforePrint` for print preparation.

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

The Bullet Chart API exposes `beforePrint` before printing starts.

### Print-Specific CSS

```css
.chart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

@media print {
  .chart-actions {
    display: none;
  }

  #performance-report {
    width: 100%;
  }

  #bullet-chart {
    width: 100%;
    min-height: 420px;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  body {
    background: #FFFFFF;
    color: #000000;
    font-family:
      Arial,
      sans-serif;
  }
}
```

The browser controls printer selection, page size, orientation, and Save as PDF behavior.

### Browser Print Shortcut

Browsers already provide `Ctrl + P` on Windows and Linux and `Command + P` on macOS.

Do not override the browser's standard print shortcut unless the application has a validated requirement.

Prefer a visible Print button:

```html
<button
  id="print-chart"
  type="button"
>
  Print Chart
</button>
```

If a custom shortcut is required, avoid conflicting with browser or assistive-technology conventions and document it visibly.

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
    value: 72,
    target: 85,
    category: 'Sales'
  },
  {
    value: 82,
    target: 90,
    category: 'Profit'
  }
];

const prefersReducedMotion:
  boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

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
    enableRtl: false,
    theme: 'Fluent2',
    width: '100%',
    height: '420px',
    minimum: 0,
    maximum: 100,
    interval: 20,
    labelFormat: '{value}%',
    valueFill: '#0F6CBD',
    targetColor: '#242424',
    targetWidth: 6,
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
      enable:
        !prefersReducedMotion,
      duration:
        prefersReducedMotion
          ? 0
          : 800,
      delay: 0
    },
    beforePrint: (): void => {
      console.log(
        'Preparing the performance report for printing.'
      );
    }
  });

bulletChart.appendTo(
  '#bullet-chart'
);

const exportSvgButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-svg'
  ) as HTMLButtonElement | null;

const exportPngButton:
  HTMLButtonElement | null =
  document.getElementById(
    'export-png'
  ) as HTMLButtonElement | null;

const printButton:
  HTMLButtonElement | null =
  document.getElementById(
    'print-chart'
  ) as HTMLButtonElement | null;

const themeButton:
  HTMLButtonElement | null =
  document.getElementById(
    'toggle-theme'
  ) as HTMLButtonElement | null;

function downloadSvg(
  chartElementId: string,
  fileName: string
): void {
  const host:
    HTMLElement | null =
    document.getElementById(
      chartElementId
    );

  const svg:
    SVGSVGElement | null =
    host?.querySelector(
      'svg'
    ) ?? null;

  if (!svg) {
    throw new Error(
      'The rendered Bullet Chart SVG was not found.'
    );
  }

  const svgText: string =
    new XMLSerializer()
      .serializeToString(
        svg
      );

  const blob: Blob =
    new Blob(
      [svgText],
      {
        type:
          'image/svg+xml;charset=utf-8'
      }
    );

  const url: string =
    URL.createObjectURL(
      blob
    );

  const link:
    HTMLAnchorElement =
    document.createElement(
      'a'
    );

  link.href = url;
  link.download =
    `${fileName}.svg`;

  link.click();

  URL.revokeObjectURL(
    url
  );
}

async function downloadPng(
  chartElementId: string,
  fileName: string
): Promise<void> {
  const host:
    HTMLElement | null =
    document.getElementById(
      chartElementId
    );

  const svg:
    SVGSVGElement | null =
    host?.querySelector(
      'svg'
    ) ?? null;

  if (!svg) {
    throw new Error(
      'The rendered Bullet Chart SVG was not found.'
    );
  }

  const svgText: string =
    new XMLSerializer()
      .serializeToString(
        svg
      );

  const blob: Blob =
    new Blob(
      [svgText],
      {
        type:
          'image/svg+xml;charset=utf-8'
      }
    );

  const svgUrl: string =
    URL.createObjectURL(
      blob
    );

  try {
    const image:
      HTMLImageElement =
      new Image();

    await new Promise<void>(
      (
        resolve:
          () => void,
        reject:
          (
            reason?: unknown
          ) => void
      ): void => {
        image.onload =
          (): void => resolve();

        image.onerror =
          (): void => reject(
            new Error(
              'Unable to convert the Bullet Chart to PNG.'
            )
          );

        image.src =
          svgUrl;
      }
    );

    const width: number =
      svg.viewBox.baseVal.width ||
      svg.clientWidth ||
      800;

    const height: number =
      svg.viewBox.baseVal.height ||
      svg.clientHeight ||
      420;

    const canvas:
      HTMLCanvasElement =
      document.createElement(
        'canvas'
      );

    canvas.width =
      Math.ceil(width);

    canvas.height =
      Math.ceil(height);

    const context:
      CanvasRenderingContext2D | null =
      canvas.getContext(
        '2d'
      );

    if (!context) {
      throw new Error(
        'Canvas rendering is unavailable.'
      );
    }

    context.fillStyle =
      '#FFFFFF';

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    const link:
      HTMLAnchorElement =
      document.createElement(
        'a'
      );

    link.href =
      canvas.toDataURL(
        'image/png'
      );

    link.download =
      `${fileName}.png`;

    link.click();
  } finally {
    URL.revokeObjectURL(
      svgUrl
    );
  }
}

const exportSvg = (): void => {
  downloadSvg(
    'bullet-chart',
    'business-performance'
  );
};

const exportPng = (): void => {
  void downloadPng(
    'bullet-chart',
    'business-performance'
  );
};

const printChart = (): void => {
  bulletChart.print([
    'report-heading',
    'report-summary',
    'bullet-chart'
  ]);
};

let isDarkTheme: boolean =
  false;

const toggleTheme = (): void => {
  isDarkTheme =
    !isDarkTheme;

  bulletChart.theme =
    isDarkTheme
      ? 'Fluent2Dark'
      : 'Fluent2';

  bulletChart.refresh();
};

exportSvgButton?.addEventListener(
  'click',
  exportSvg
);

exportPngButton?.addEventListener(
  'click',
  exportPng
);

printButton?.addEventListener(
  'click',
  printChart
);

themeButton?.addEventListener(
  'click',
  toggleTheme
);

let resizeTimer:
  number | undefined;

const handleResize = (): void => {
  window.clearTimeout(
    resizeTimer
  );

  resizeTimer =
    window.setTimeout(
      (): void => {
        bulletChart.height =
          window.innerWidth < 600
            ? '340px'
            : '420px';

        bulletChart.refresh();
      },
      150
    );
};

window.addEventListener(
  'resize',
  handleResize
);

window.addEventListener(
  'beforeunload',
  (): void => {
    window.clearTimeout(
      resizeTimer
    );

    window.removeEventListener(
      'resize',
      handleResize
    );

    exportSvgButton
      ?.removeEventListener(
        'click',
        exportSvg
      );

    exportPngButton
      ?.removeEventListener(
        'click',
        exportPng
      );

    printButton
      ?.removeEventListener(
        'click',
        printChart
      );

    themeButton
      ?.removeEventListener(
        'click',
        toggleTheme
      );

    bulletChart.destroy();
  }
);
```

**HTML:**

```html
<section
  id="performance-report"
  aria-labelledby="report-heading"
>
  <h1 id="report-heading">
    Business Performance
  </h1>

  <p id="report-summary">
    The Bullet Chart compares actual sales and profit
    against their assigned targets.
  </p>

  <div
    id="bullet-chart"
    aria-describedby="report-summary"
  ></div>

  <div
    class="chart-actions"
    role="group"
    aria-label="Bullet Chart actions"
  >
    <button
      id="export-svg"
      type="button"
    >
      Download SVG
    </button>

    <button
      id="export-png"
      type="button"
    >
      Download PNG
    </button>

    <button
      id="print-chart"
      type="button"
    >
      Print report
    </button>

    <button
      id="toggle-theme"
      type="button"
    >
      Toggle theme
    </button>
  </div>
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

@media (max-width: 599px) {
  #bullet-chart {
    min-height: 340px;
  }
}

@media print {
  .chart-actions {
    display: none;
  }

  #performance-report {
    width: 100%;
  }

  #bullet-chart {
    width: 100%;
    min-height: 420px;
    break-inside: avoid;
    page-break-inside: avoid;
  }
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
    Bullet Chart Customization
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

    @media (max-width: 599px) {
      #bullet-chart {
        min-height: 340px;
      }
    }

    @media print {
      .chart-actions {
        display: none;
      }

      #bullet-chart {
        width: 100%;
        min-height: 420px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
    }
  </style>
</head>

<body>
  <section
    id="performance-report"
    aria-labelledby="report-heading"
  >
    <h1 id="report-heading">
      Business Performance
    </h1>

    <p id="report-summary">
      The Bullet Chart compares actual sales and profit
      against their assigned targets.
    </p>

    <div
      id="bullet-chart"
      aria-describedby="report-summary"
    ></div>

    <div
      class="chart-actions"
      role="group"
      aria-label="Bullet Chart actions"
    >
      <button
        id="export-svg"
        type="button"
      >
        Download SVG
      </button>

      <button
        id="print-chart"
        type="button"
      >
        Print report
      </button>

      <button
        id="toggle-theme"
        type="button"
      >
        Toggle theme
      </button>
    </div>
  </section>

  <script>
    ej.charts.BulletChart.Inject(
      ej.charts.BulletTooltip
    );

    var prefersReducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

    var chartData = [
      {
        value: 72,
        target: 85,
        category: 'Sales'
      },
      {
        value: 82,
        target: 90,
        category: 'Profit'
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
        enableRtl:
          false,
        theme:
          'Fluent2',
        width:
          '100%',
        height:
          '420px',
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
          enable:
            !prefersReducedMotion,
          duration:
            prefersReducedMotion
              ? 0
              : 800,
          delay: 0
        }
      });

    bulletChart.appendTo(
      '#bullet-chart'
    );

    var exportSvgButton =
      document.getElementById(
        'export-svg'
      );

    var printButton =
      document.getElementById(
        'print-chart'
      );

    var themeButton =
      document.getElementById(
        'toggle-theme'
      );

    function downloadSvg() {
      var host =
        document.getElementById(
          'bullet-chart'
        );

      var svg =
        host
          ? host.querySelector('svg')
          : null;

      if (!svg) {
        console.error(
          'The rendered Bullet Chart SVG was not found.'
        );

        return;
      }

      var svgText =
        new XMLSerializer()
          .serializeToString(
            svg
          );

      var blob =
        new Blob(
          [svgText],
          {
            type:
              'image/svg+xml;charset=utf-8'
          }
        );

      var url =
        URL.createObjectURL(
          blob
        );

      var link =
        document.createElement(
          'a'
        );

      link.href =
        url;

      link.download =
        'business-performance.svg';

      link.click();

      URL.revokeObjectURL(
        url
      );
    }

    function printChart() {
      bulletChart.print([
        'report-heading',
        'report-summary',
        'bullet-chart'
      ]);
    }

    var isDarkTheme =
      false;

    function toggleTheme() {
      isDarkTheme =
        !isDarkTheme;

      bulletChart.theme =
        isDarkTheme
          ? 'Fluent2Dark'
          : 'Fluent2';

      bulletChart.refresh();
    }

    if (exportSvgButton) {
      exportSvgButton.addEventListener(
        'click',
        downloadSvg
      );
    }

    if (printButton) {
      printButton.addEventListener(
        'click',
        printChart
      );
    }

    if (themeButton) {
      themeButton.addEventListener(
        'click',
        toggleTheme
      );
    }

    var resizeTimer;

    function handleResize() {
      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          function () {
            bulletChart.height =
              window.innerWidth < 600
                ? '340px'
                : '420px';

            bulletChart.refresh();
          },
          150
        );
    }

    window.addEventListener(
      'resize',
      handleResize
    );

    window.addEventListener(
      'beforeunload',
      function () {
        window.clearTimeout(
          resizeTimer
        );

        window.removeEventListener(
          'resize',
          handleResize
        );

        bulletChart.destroy();
      }
    );
  </script>
</body>
</html>
```

## Best Practices

1. **Use the correct default:** The default orientation is `Horizontal`.
2. **Choose orientation intentionally:** Consider category count, label length, and available space.
3. **Use RTL comprehensively:** Set `enableRtl`, `dir`, and `lang`, and localize the data.
4. **Respect reduced motion:** Disable or shorten animation when requested.
5. **Avoid frequent animation:** Disable animation for rapidly updating dashboards.
6. **Use supported themes:** Validate the exact theme name against the installed version.
7. **Customize supported properties:** Use `valueFill`, `targetColor`, and range colors instead of `palette`.
8. **Use stable dimensions:** Give the Bullet Chart or its parent a resolved height.
9. **Prefer CSS layout:** Use Grid or Flexbox instead of repeatedly calculating pixel widths.
10. **Debounce resize updates:** Avoid refreshing on every raw resize event.
11. **Do not use point events for responsiveness:** Update `dataLabel.enable` and supported properties directly.
12. **Validate export support:** Do not apply regular Cartesian Chart export modules to Bullet Chart without validation.
13. **Use SVG for vector output:** Serialize the rendered SVG when a standalone SVG file is required.
14. **Use PNG for sharing:** Convert a self-contained SVG to Canvas when raster output is required.
15. **Use browser print for reports:** Users can print or save the report as PDF.
16. **Provide visible controls:** Use native buttons for export, print, and theme switching.
17. **Clean up:** Remove listeners, clear timers, and destroy the Bullet Chart.

## Troubleshooting

### Orientation Is Incorrect

- Use `Horizontal` or `Vertical`.
- Remember that `Horizontal` is the default.
- Ensure that the Chart has enough width for horizontal labels.
- Ensure that a vertical Chart has sufficient height.
- Refresh after changing orientation dynamically.

### RTL Is Not Applied

- Set `enableRtl` to `true`.
- Set `dir="rtl"` on the document or relevant container.
- Set the correct `lang`.
- Localize category labels.
- Refresh after changing direction dynamically.

### Animation Is Not Visible

- Set `animation.enable` to `true`.
- Use a positive `duration`.
- Check `prefers-reduced-motion`.
- Ensure that the feature bar is visible.
- Do not assume every refresh repeats initial-load animation.

### Theme Is Not Applied

- Use a supported theme name.
- Use exact casing.
- Use `HighContrast`, not `Highcontrast`.
- Use `Tailwind`, not an unverified `TailwindLight`.
- Check whether explicit colors override theme defaults.
- Refresh after changing the theme.

### Custom Palette Is Not Applied

The Bullet Chart does not expose the regular Chart `palette` or `palettes` properties.

Use:

- `valueFill`
- `targetColor`
- `ranges[].color`
- `titleStyle`
- `subtitleStyle`
- `labelStyle`
- `categoryLabelStyle`

### Percentage Height Is Not Working

- Give the parent a resolved height.
- Ensure that every relevant ancestor has a valid height.
- Prefer a fixed or responsive pixel height when the layout does not provide a resolved percentage basis.

### Responsive Labels Are Not Updating

Do not use an unverified `pointRender` event.

Update:

```typescript
bulletChart.dataLabel = {
  enable:
    window.innerWidth >= 480,
  labelStyle: {
    size: '12px'
  }
};

bulletChart.refresh();
```

### Direct Export Method Is Not Working

Do not assume that the regular Cartesian Chart `export()` method and `Export` module apply to Bullet Chart.

Use:

- Application-owned SVG serialization.
- SVG-to-Canvas PNG conversion.
- Browser printing.
- A validated server-side or client-side PDF workflow.

### PDF Export Is Not Working

Do not inject an unverified `PdfExport` module into Bullet Chart.

Use the browser print dialog and select **Save as PDF**, or pass an exported SVG or PNG to a validated PDF-generation workflow.

### Print Is Not Working

- Call `bulletChart.print()` from a user action.
- Ensure that the Chart is visible.
- Ensure that the browser allows the print dialog.
- Use valid element IDs when printing multiple elements.
- Add print-specific CSS.
- Do not override the browser's standard print shortcut unnecessarily.

## Related Topics

- See `references/axis-customization.md` for scale and axis configuration.
- See `references/value-bar-and-comparative-bar.md` for actual and target styling.
- See `references/title-tooltip-and-interactivity.md` for titles and tooltips.
- See `references/ranges-and-qualitative-scale.md` for performance zones.
- See `references/data-binding-and-labels.md` for data and labels.