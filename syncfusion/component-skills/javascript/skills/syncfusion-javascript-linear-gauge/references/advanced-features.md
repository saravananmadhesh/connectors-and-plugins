# Linear Gauge Advanced Features in TypeScript and JavaScript

This guide covers advanced Syncfusion Essential JS 2 Linear Gauge features, including printing, image and PDF export, Base64 export, annotations, animations, internationalization, accessibility, and migration from Essential JavaScript 1.

## Table of Contents

- #prerequisites
- #print-and-export
  - #required-modules
  - #export-to-png
  - #export-to-jpeg
  - #export-to-svg
  - #export-to-pdf
  - #pdf-orientation
  - #export-to-base64
  - #print-the-gauge
  - #custom-export-file-name
- #annotations
  - #required-annotation-module
  - #text-annotation
  - #html-annotation
  - #position-an-annotation-by-axis-value
  - #annotation-properties
  - #dynamic-annotation-content
- #animations
  - #animate-the-complete-gauge
  - #disable-gauge-animation
  - #pointer-animation
  - #update-a-pointer-with-animation
  - #range-animation
- #internationalization
  - #set-the-application-culture
  - #set-the-currency-code
  - #configure-the-gauge-locale
  - #number-formatting
  - #currency-formatting
  - #localized-annotation-date
- #right-to-left-considerations
- #accessibility
  - #built-in-accessibility
  - #semantic-surrounding-content
  - #accessible-pointer-description
  - #keyboard-accessible-value-controls
  - #color-contrast
  - #focus-management
- #complete-typescript-example
- #complete-javascript-example
- #migration-from-essential-javascript-1
  - #primary-migration-changes
  - #ej1-example
  - #ej2-typescript-example
  - #ej2-javascript-example
  - #feature-mapping
  - #migration-checklist
- #best-practices
- #troubleshooting

## Prerequisites

Install the Essential JS 2 Linear Gauge package.

```bash
npm install @syncfusion/ej2-lineargauge
```

For PDF orientation types, install or use the PDF export package resolved with the Linear Gauge dependencies.

```bash
npm install @syncfusion/ej2-pdf-export
```

Keep all Syncfusion package versions consistent.

For TypeScript, import the `LinearGauge` class.

```typescript
import { LinearGauge } from '@syncfusion/ej2-lineargauge';
```

Add a host element.

```html
<div id="gauge-container"></div>
```

Give the host a visible size.

```css
#gauge-container {
  display: block;
  width: 100%;
  height: 360px;
}
```

Create and append the gauge.

```typescript
const gauge: LinearGauge = new LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

For JavaScript applications using the EJ2 global namespace:

```javascript
var gauge = new ej.lineargauge.LinearGauge({
  width: '100%',
  height: '100%',

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## Print and Export

The Linear Gauge supports:

- Browser printing
- PNG export
- JPEG export
- SVG export
- PDF export
- Base64 export for supported output types

Print and export features are provided through feature modules.

## Required Modules

For TypeScript, import and inject the required modules before creating the Linear Gauge.

```typescript
import {
  LinearGauge,
  Print,
  ImageExport,
  PdfExport
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(
  Print,
  ImageExport,
  PdfExport
);
```

For JavaScript applications using the EJ2 global namespace:

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Print,
  ej.lineargauge.ImageExport,
  ej.lineargauge.PdfExport
);
```

Enable the required features in the Linear Gauge configuration.

```typescript
const gauge: LinearGauge = new LinearGauge({
  allowPrint: true,
  allowImageExport: true,
  allowPdfExport: true
});
```

Inject only the modules used by the application.

## Export to PNG

PNG is appropriate for lossless raster output.

### TypeScript

```typescript
import {
  LinearGauge,
  ImageExport
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(ImageExport);

const gauge: LinearGauge = new LinearGauge({
  allowImageExport: true,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 65,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');

function exportPNG(): void {
  gauge.export(
    'PNG',
    'system-health-gauge'
  );
}
```

### JavaScript

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.ImageExport
);

var gauge = new ej.lineargauge.LinearGauge({
  allowImageExport: true,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 65,
          type: 'Bar',
          color: '#2563eb',
          width: 15
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');

function exportPNG() {
  gauge.export(
    'PNG',
    'system-health-gauge'
  );
}
```

### HTML

```html
<button id="export-png" type="button">
  Export PNG
</button>
```

```typescript
const pngButton: HTMLElement | null =
  document.getElementById('export-png');

pngButton?.addEventListener(
  'click',
  exportPNG
);
```

## Export to JPEG

JPEG can provide a smaller raster file when lossless output is not required.

### TypeScript

```typescript
function exportJPEG(): void {
  gauge.export(
    'JPEG',
    'system-health-gauge'
  );
}
```

### JavaScript

```javascript
function exportJPEG() {
  gauge.export(
    'JPEG',
    'system-health-gauge'
  );
}
```

## Export to SVG

SVG creates scalable vector output.

### TypeScript

```typescript
function exportSVG(): void {
  gauge.export(
    'SVG',
    'system-health-gauge'
  );
}
```

### JavaScript

```javascript
function exportSVG() {
  gauge.export(
    'SVG',
    'system-health-gauge'
  );
}
```

SVG is useful when:

- The output must scale without losing clarity.
- The image will be used in a vector-based workflow.
- Axis labels and tick marks must remain sharp at different sizes.

## Export to PDF

Import and inject the `PdfExport` module.

### TypeScript

```typescript
import {
  LinearGauge,
  PdfExport
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(PdfExport);

const gauge: LinearGauge = new LinearGauge({
  allowPdfExport: true,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 65
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');

function exportPDF(): void {
  gauge.export(
    'PDF',
    'system-health-gauge'
  );
}
```

### JavaScript

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.PdfExport
);

var gauge = new ej.lineargauge.LinearGauge({
  allowPdfExport: true,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      pointers: [
        {
          value: 65
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');

function exportPDF() {
  gauge.export(
    'PDF',
    'system-health-gauge'
  );
}
```

## PDF Orientation

Import `PdfPageOrientation` for a typed TypeScript orientation value.

```typescript
import {
  PdfPageOrientation
} from '@syncfusion/ej2-pdf-export';
```

Export using portrait orientation.

```typescript
function exportPortraitPDF(): void {
  gauge.export(
    'PDF',
    'system-health-portrait',
    PdfPageOrientation.Portrait
  );
}
```

Export using landscape orientation.

```typescript
function exportLandscapePDF(): void {
  gauge.export(
    'PDF',
    'system-health-landscape',
    PdfPageOrientation.Landscape
  );
}
```

For JavaScript applications using the global scripts:

```javascript
function exportLandscapePDF() {
  gauge.export(
    'PDF',
    'system-health-landscape',
    ej.pdfexport.PdfPageOrientation.Landscape
  );
}
```

Use landscape orientation for a wide horizontal gauge.

Use portrait orientation when the gauge is square, vertical, or part of a portrait-oriented report.

## Export to Base64

Set the `allowDownload` argument to `false` to receive the exported content programmatically.

Supported Base64 workflows include PNG, JPEG, and PDF output.

### TypeScript

```typescript
async function exportPNGBase64():
  Promise<void> {
  const result: string =
    await gauge.export(
      'PNG',
      'system-health-gauge',
      undefined,
      false
    );

  console.log(result);
}
```

Display the returned image in a preview.

```typescript
async function previewPNG():
  Promise<void> {
  const result: string =
    await gauge.export(
      'PNG',
      'system-health-gauge',
      undefined,
      false
    );

  const preview:
    HTMLImageElement | null =
      document.querySelector<HTMLImageElement>(
        '#export-preview'
      );

  if (preview) {
    preview.src = result;
  }
}
```

### JavaScript

```javascript
async function exportPNGBase64() {
  var result =
    await gauge.export(
      'PNG',
      'system-health-gauge',
      undefined,
      false
    );

  console.log(result);
}
```

```javascript
async function previewPNG() {
  var result =
    await gauge.export(
      'PNG',
      'system-health-gauge',
      undefined,
      false
    );

  var preview =
    document.getElementById(
      'export-preview'
    );

  if (preview) {
    preview.src = result;
  }
}
```

### HTML

```html
<img
  id="export-preview"
  alt="Exported preview of the system health gauge"
/>
```

## Print the Gauge

Inject `Print`, set `allowPrint` to `true`, and call `print()`.

### TypeScript

```typescript
import {
  LinearGauge,
  Print
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Print);

const gauge: LinearGauge = new LinearGauge({
  allowPrint: true,

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');

function printGauge(): void {
  gauge.print();
}
```

### JavaScript

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Print
);

var gauge = new ej.lineargauge.LinearGauge({
  allowPrint: true,

  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ]
});

gauge.appendTo('#gauge-container');

function printGauge() {
  gauge.print();
}
```

Use print-specific CSS to hide surrounding controls.

```css
@media print {
  .gauge-toolbar,
  .page-description,
  #export-preview {
    display: none;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #gauge-container {
    width: 100%;
    height: 360px;
  }
}
```

## Custom Export File Name

Generate a file name based on the current date.

### TypeScript

```typescript
type GaugeExportType =
  'PNG' |
  'JPEG' |
  'SVG' |
  'PDF';

function createExportFileName(): string {
  const date: string =
    new Date()
      .toISOString()
      .slice(0, 10);

  return `system-health-gauge-${date}`;
}

function exportGauge(
  format: GaugeExportType
): void {
  gauge.export(
    format,
    createExportFileName()
  );
}
```

### JavaScript

```javascript
function createExportFileName() {
  var date =
    new Date()
      .toISOString()
      .slice(0, 10);

  return (
    'system-health-gauge-' +
    date
  );
}

function exportGauge(format) {
  gauge.export(
    format,
    createExportFileName()
  );
}
```

Use file-system-safe characters in generated names.

## Annotations

Annotations place custom text or HTML content at a specific position in the Linear Gauge.

Annotations can be positioned using:

- Pixel-based `x` and `y` offsets
- `axisIndex`
- `axisValue`
- Horizontal and vertical alignment
- Stacking order

## Required Annotation Module

For TypeScript:

```typescript
import {
  LinearGauge,
  Annotations
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);
```

For JavaScript:

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Annotations
);
```

## Text Annotation

### TypeScript

```typescript
import {
  LinearGauge,
  Annotations
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ],

  annotations: [
    {
      content: 'Current value: 65%',
      axisIndex: 0,
      axisValue: 65,
      x: 0,
      y: -40,
      zIndex: '1',

      font: {
        color: '#111827',
        fontFamily: 'Arial',
        size: '14px',
        fontWeight: '700'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Annotations
);

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ],

  annotations: [
    {
      content: 'Current value: 65%',
      axisIndex: 0,
      axisValue: 65,
      x: 0,
      y: -40,
      zIndex: '1',

      font: {
        color: '#111827',
        fontFamily: 'Arial',
        size: '14px',
        fontWeight: '700'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

## HTML Annotation

Annotations support HTML content.

### TypeScript

```typescript
const statusAnnotation: string = `
  <div style="
    padding:6px 10px;
    border:1px solid #166534;
    border-radius:6px;
    background:#dcfce7;
    color:#14532d;
    font-family:Arial,sans-serif;
  ">
    <strong>Status:</strong>
    <span>Normal</span>
  </div>
`;

const gauge: LinearGauge = new LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ],

  annotations: [
    {
      content: statusAnnotation,
      axisIndex: 0,
      axisValue: 65,
      x: 0,
      y: -45,
      zIndex: '1'
    }
  ]
});

gauge.appendTo('#gauge-container');
```

### JavaScript

```javascript
var statusAnnotation =
  '<div style="' +
  'padding:6px 10px;' +
  'border:1px solid #166534;' +
  'border-radius:6px;' +
  'background:#dcfce7;' +
  'color:#14532d;' +
  'font-family:Arial,sans-serif;' +
  '">' +
  '<strong>Status:</strong> ' +
  '<span>Normal</span>' +
  '</div>';

var gauge = new ej.lineargauge.LinearGauge({
  axes: [
    {
      minimum: 0,
      maximum: 100
    }
  ],

  annotations: [
    {
      content: statusAnnotation,
      axisIndex: 0,
      axisValue: 65,
      x: 0,
      y: -45,
      zIndex: '1'
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Only use trusted or sanitized HTML in annotations.

## Position an Annotation by Axis Value

Set `axisIndex` and `axisValue` to anchor an annotation to a specific axis value.

```typescript
annotations: [
  {
    axisIndex: 0,
    axisValue: 75,
    x: 0,
    y: -35,
    content: 'Target: 75%'
  }
]
```

For a gauge with multiple axes, use the required axis index.

```typescript
annotations: [
  {
    axisIndex: 1,
    axisValue: 86,
    content: '86°F'
  }
]
```

## Annotation Properties

Common annotation properties include:

- `content`: Specifies text or HTML content.
- `x`: Specifies the horizontal offset.
- `y`: Specifies the vertical offset.
- `zIndex`: Specifies the stacking order.
- `font`: Customizes annotation text.
- `axisIndex`: Specifies the associated axis.
- `axisValue`: Positions the annotation near an axis value.
- `horizontalAlignment`: Specifies horizontal alignment.
- `verticalAlignment`: Specifies vertical alignment.

Example:

```typescript
annotations: [
  {
    content: 'System Health',
    axisIndex: 0,
    axisValue: 50,
    x: 0,
    y: -45,
    zIndex: '1',
    horizontalAlignment: 'Center',
    verticalAlignment: 'Center',

    font: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '16px',
      fontWeight: '700'
    }
  }
]
```

## Dynamic Annotation Content

Update annotation content and refresh the gauge.

### TypeScript

```typescript
function updateAnnotation(
  value: number
): void {
  const status: string =
    value >= 70
      ? 'Critical'
      : value >= 40
        ? 'Warning'
        : 'Normal';

  gauge.annotations[0].content =
    `<strong>${value}%</strong> ${status}`;

  gauge.annotations[0].axisValue =
    value;

  gauge.refresh();
}
```

### JavaScript

```javascript
function updateAnnotation(value) {
  var status =
    value >= 70
      ? 'Critical'
      : value >= 40
        ? 'Warning'
        : 'Normal';

  gauge.annotations[0].content =
    '<strong>' +
    value +
    '%</strong> ' +
    status;

  gauge.annotations[0].axisValue =
    value;

  gauge.refresh();
}
```

## Animations

The Linear Gauge supports complete component animation and individual pointer animation.

## Animate the Complete Gauge

Use the gauge-level `animationDuration` property.

### TypeScript

```typescript
const gauge: LinearGauge = new LinearGauge({
  animationDuration: 3000,

  axes: [
    {
      minimum: 0,
      maximum: 100,

      ranges: [
        {
          start: 0,
          end: 70,
          color: '#2563eb',
          startWidth: 15,
          endWidth: 15
        }
      ],

      pointers: [
        {
          value: 65
        }
      ]
    }
  ]
});

gauge.appendTo('#gauge-container');
```

The gauge animation proceeds through its rendered elements, including axis elements, ranges, pointers, and annotations.

## Disable Gauge Animation

Set the gauge-level animation duration to `0`.

```typescript
const gauge: LinearGauge = new LinearGauge({
  animationDuration: 0
});
```

A duration of `0` disables the complete component animation.

Consider reduced-motion preferences.

```typescript
const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const gauge: LinearGauge = new LinearGauge({
  animationDuration:
    reduceMotion ? 0 : 1200
});
```

## Pointer Animation

Use `animationDuration` inside the pointer to animate only the pointer.

### TypeScript

```typescript
pointers: [
  {
    value: 65,
    type: 'Bar',
    color: '#2563eb',
    width: 15,
    animationDuration: 1000
  }
]
```

### JavaScript

```javascript
pointers: [
  {
    value: 65,
    type: 'Bar',
    color: '#2563eb',
    width: 15,
    animationDuration: 1000
  }
]
```

## Update a Pointer with Animation

Use `setPointerValue()` to update a pointer.

### TypeScript

```typescript
function updatePointer(
  value: number
): void {
  const axisIndex: number = 0;
  const pointerIndex: number = 0;
  const axis = gauge.axes[axisIndex];

  const safeValue: number =
    Math.min(
      axis.maximum,
      Math.max(axis.minimum, value)
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

### JavaScript

```javascript
function updatePointer(value) {
  var axisIndex = 0;
  var pointerIndex = 0;
  var axis = gauge.axes[axisIndex];

  var safeValue =
    Math.min(
      axis.maximum,
      Math.max(axis.minimum, value)
    );

  gauge.setPointerValue(
    axisIndex,
    pointerIndex,
    safeValue
  );
}
```

Use `setPointerValue()` when only the pointer value changes.

Use `refresh()` when changing the axis scale, ranges, labels, or annotations.

## Range Animation

Ranges participate in the complete gauge animation when the gauge-level `animationDuration` is enabled.

```typescript
const gauge: LinearGauge = new LinearGauge({
  animationDuration: 1500,

  axes: [
    {
      ranges: [
        {
          start: 0,
          end: 50,
          color: '#2563eb',
          startWidth: 15,
          endWidth: 15
        }
      ]
    }
  ]
});
```

There is no separate range-level animation-duration property comparable to pointer `animationDuration`.

To change a range dynamically, update its values and refresh the gauge.

```typescript
gauge.axes[0].ranges[0].start = 0;
gauge.axes[0].ranges[0].end = 75;
gauge.refresh();
```

## Internationalization

The Linear Gauge supports culture-aware number formatting through EJ2 globalization utilities and its `locale` property.

Import the required functions from `@syncfusion/ej2-base`.

```typescript
import {
  setCulture,
  setCurrencyCode
} from '@syncfusion/ej2-base';
```

## Set the Application Culture

Set the global culture before creating the gauge.

```typescript
import {
  setCulture
} from '@syncfusion/ej2-base';

setCulture('de-DE');

const gauge: LinearGauge = new LinearGauge({
  locale: 'de-DE',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: 'n1'
      }
    }
  ]
});

gauge.appendTo('#gauge-container');
```

Load the required CLDR data when the selected culture requires data that is not already available in the application.

## Set the Currency Code

```typescript
import {
  setCulture,
  setCurrencyCode
} from '@syncfusion/ej2-base';

setCulture('de-DE');
setCurrencyCode('EUR');
```

Create the gauge after setting the culture and currency.

## Configure the Gauge Locale

Set the `locale` property.

```typescript
const gauge: LinearGauge = new LinearGauge({
  locale: 'fr-FR',

  axes: [
    {
      minimum: 0,
      maximum: 100,

      labelStyle: {
        format: 'n1'
      }
    }
  ]
});
```

Do not add unverified component locale keys such as `range` unless the control explicitly exposes a corresponding localized string.

The Linear Gauge primarily localizes number formatting rather than displaying built-in command text.

## Number Formatting

Use global numeric format strings.

### No Decimal Places

```typescript
labelStyle: {
  format: 'n0'
}
```

### One Decimal Place

```typescript
labelStyle: {
  format: 'n1'
}
```

### Two Decimal Places

```typescript
labelStyle: {
  format: 'n2'
}
```

Use `{value}` when adding static text or units.

```typescript
labelStyle: {
  format: '{value} km/h'
}
```

Do not use Python-style formatting.

```typescript
// Avoid.
labelStyle: {
  format: '{value:.2f}'
}
```

## Currency Formatting

Use a global currency format when culture-aware currency formatting is required.

```typescript
labelStyle: {
  format: 'C0'
}
```

```typescript
labelStyle: {
  format: 'C2'
}
```

Set the culture and currency before creating the gauge.

```typescript
setCulture('de-DE');
setCurrencyCode('EUR');

const gauge: LinearGauge =
  new LinearGauge({
    locale: 'de-DE',

    axes: [
      {
        minimum: 0,
        maximum: 100,

        labelStyle: {
          format: 'C0'
        }
      }
    ]
  });
```

For a fixed symbol that does not require culture-aware formatting:

```typescript
labelStyle: {
  format: '${value}K'
}
```

Use a regular quoted string so `${value}` remains available to the gauge formatter.

## Localized Annotation Date

Format dates with the browser `Intl.DateTimeFormat` API and supply the resulting text to an annotation.

### TypeScript

```typescript
const locale: string = 'en-IN';

const timestamp: string =
  new Intl.DateTimeFormat(
    locale,
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(new Date());

const gauge: LinearGauge = new LinearGauge({
  annotations: [
    {
      content:
        `Last updated: ${timestamp}`,
      x: 0,
      y: 50,
      zIndex: '1'
    }
  ]
});
```

### JavaScript

```javascript
var locale = 'en-IN';

var timestamp =
  new Intl.DateTimeFormat(
    locale,
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(new Date());

var gauge =
  new ej.lineargauge.LinearGauge({
    annotations: [
      {
        content:
          'Last updated: ' +
          timestamp,
        x: 0,
        y: 50,
        zIndex: '1'
      }
    ]
  });
```

## Right-to-Left Considerations

Built-in right-to-left support is not applicable to the Linear Gauge in the same way it is for text-heavy EJ2 components.

Do not rely on `enableRtl` to reverse the numeric scale.

Use `isInversed` to reverse scale direction.

### Horizontal Reversed Scale

```typescript
const gauge: LinearGauge = new LinearGauge({
  orientation: 'Horizontal',

  axes: [
    {
      minimum: 0,
      maximum: 100,
      isInversed: true
    }
  ]
});
```

Use CSS direction for surrounding textual content.

```html
<section
  class="gauge-panel"
  dir="rtl"
  lang="ar"
>
  <h1>مؤشر أداء النظام</h1>
  <div id="gauge-container"></div>
</section>
```

```css
.gauge-panel {
  text-align: start;
}
```

Treat text direction and numeric scale direction as separate concerns.

## Accessibility

The Linear Gauge provides built-in screen-reader support for supported content, but the complete page must also provide accessible structure and controls.

## Built-in Accessibility

Supported screen-reader content includes:

- Linear Gauge title
- Axis labels
- Text pointer content
- Annotation content

The gauge uses accessible roles and labels for supported rendered elements.

Built-in keyboard navigation is not generally applicable to the Linear Gauge.

When pointer value editing is required, provide a native accessible input or buttons rather than relying only on pointer dragging.

## Semantic Surrounding Content

Provide a heading and explanation.

```html
<section
  aria-labelledby="gauge-heading"
>
  <h2 id="gauge-heading">
    System Temperature
  </h2>

  <p id="gauge-description">
    The gauge shows a current system
    temperature of 65 degrees Celsius.
  </p>

  <div id="gauge-container"></div>
</section>
```

When exact values are important, provide a visible text value.

```html
<p>
  Current temperature:
  <strong id="current-value">
    65°C
  </strong>
</p>
```

Do not make essential information available only through color or pointer position.

## Accessible Pointer Description

Use the pointer `description` property.

```typescript
pointers: [
  {
    value: 65,
    type: 'Bar',
    color: '#2563eb',
    width: 15,
    description:
      'Current system temperature is 65 degrees Celsius'
  }
]
```

For a text pointer:

```typescript
pointers: [
  {
    value: 65,
    type: 'Marker',
    markerType: 'Text',
    text: '65°C',

    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '700'
    },

    description:
      'Current system temperature is 65 degrees Celsius'
  }
]
```

## Keyboard-Accessible Value Controls

Use a native range input for keyboard-accessible pointer editing.

### HTML

```html
<label for="gauge-value">
  System health:
  <output id="gauge-output">
    50%
  </output>
</label>

<input
  id="gauge-value"
  type="range"
  min="0"
  max="100"
  step="5"
  value="50"
/>

<div id="gauge-container"></div>
```

### TypeScript

```typescript
const valueInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#gauge-value'
    );

const valueOutput:
  HTMLOutputElement | null =
    document.querySelector<HTMLOutputElement>(
      '#gauge-output'
    );

function updateGaugeValue(): void {
  if (!valueInput) {
    return;
  }

  const value: number =
    Number(valueInput.value);

  gauge.setPointerValue(
    0,
    0,
    value
  );

  if (valueOutput) {
    valueOutput.value = `${value}%`;
  }
}

valueInput?.addEventListener(
  'input',
  updateGaugeValue
);
```

### JavaScript

```javascript
var valueInput =
  document.getElementById(
    'gauge-value'
  );

var valueOutput =
  document.getElementById(
    'gauge-output'
  );

function updateGaugeValue() {
  if (!valueInput) {
    return;
  }

  var value =
    Number(valueInput.value);

  gauge.setPointerValue(
    0,
    0,
    value
  );

  if (valueOutput) {
    valueOutput.value =
      value + '%';
  }
}

if (valueInput) {
  valueInput.addEventListener(
    'input',
    updateGaugeValue
  );
}
```

Native range inputs support keyboard interaction without requiring custom arrow-key handling.

## Color Contrast

Use sufficiently distinct colors and visible text.

```typescript
const accessibleColors = {
  normal: '#166534',
  warning: '#854d0e',
  critical: '#991b1b',
  pointer: '#111827',
  label: '#111827',
  background: '#ffffff'
};
```

Apply them through supported properties.

```typescript
ranges: [
  {
    start: 0,
    end: 40,
    color: accessibleColors.normal
  },
  {
    start: 40,
    end: 70,
    color: accessibleColors.warning
  },
  {
    start: 70,
    end: 100,
    color: accessibleColors.critical
  }
]
```

Provide a textual explanation of each color range.

```html
<ul aria-label="System health ranges">
  <li>Normal: 0 to 40</li>
  <li>Warning: 40 to 70</li>
  <li>Critical: 70 to 100</li>
</ul>
```

## Focus Management

Keep focus on the native control that initiated an action.

For example, after updating the gauge from a range input, focus remains on the input.

Use a button when the application needs to focus the gauge region.

```html
<button id="focus-gauge" type="button">
  Move to gauge summary
</button>

<section
  id="gauge-summary"
  tabindex="-1"
  aria-labelledby="gauge-summary-heading"
>
  <h2 id="gauge-summary-heading">
    System health summary
  </h2>

  <p>
    Current value: 65 percent.
  </p>
</section>
```

```typescript
const focusButton:
  HTMLElement | null =
    document.getElementById(
      'focus-gauge'
    );

const gaugeSummary:
  HTMLElement | null =
    document.getElementById(
      'gauge-summary'
    );

focusButton?.addEventListener(
  'click',
  (): void => {
    gaugeSummary?.focus();
  }
);
```

Do not add `tabindex="0"` to noninteractive elements unless users need to reach them directly in sequential focus order.

## Complete TypeScript Example

The following example includes:

- PNG, JPEG, SVG, and PDF export
- Browser printing
- Base64 PNG preview
- HTML annotation
- Complete gauge and pointer animation
- Reduced-motion support
- Native keyboard-accessible pointer editing
- Accessible status messages
- Culture-aware timestamp formatting

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Advanced Linear Gauge
  </title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 20px;
      background: #f8fafc;
      color: #111827;
      font-family:
        Arial,
        Helvetica,
        sans-serif;
    }

    main {
      width: min(100%, 1100px);
      margin: 0 auto;
    }

    h1 {
      margin: 0 0 8px;
      font-size: clamp(22px, 4vw, 32px);
    }

    .description {
      max-width: 75ch;
      margin: 0 0 16px;
      line-height: 1.5;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .toolbar button {
      min-height: 42px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 700;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: #dbeafe;
    }

    .toolbar button:focus-visible,
    #gauge-value:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    .value-control {
      display: grid;
      gap: 8px;
      margin-bottom: 16px;
      padding: 14px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      background: #ffffff;
    }

    #gauge-value {
      width: 100%;
      min-height: 32px;
    }

    .gauge-card {
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 12px;
      background: #ffffff;
    }

    #gauge-container {
      width: 100%;
      height: 300px;
    }

    #export-preview {
      display: block;
      max-width: 100%;
      margin-top: 18px;
      border: 1px solid #64748b;
    }

    .range-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding-left: 20px;
    }

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      white-space: nowrap;
      border: 0;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
    }

    @media (min-width: 768px) {
      #gauge-container {
        height: 380px;
      }
    }

    @media print {
      .toolbar,
      .value-control,
      #export-preview,
      #action-status {
        display: none;
      }

      body {
        margin: 0;
        padding: 0;
      }

      .gauge-card {
        border: 0;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Advanced System Health Gauge</h1>

    <p class="description">
      Adjust the current value using the range
      control. Export the gauge as an image or PDF,
      or print it using the browser.
    </p>

    <div
      class="toolbar"
      role="group"
      aria-label="Gauge print and export actions"
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

      <button id="preview-png" type="button">
        Preview PNG
      </button>

      <button id="print" type="button">
        Print Gauge
      </button>
    </div>

    <div class="value-control">
      <label for="gauge-value">
        Current system health:
        <output id="gauge-output">
          65%
        </output>
      </label>

      <input
        id="gauge-value"
        type="range"
        min="0"
        max="100"
        step="5"
        value="65"
      />
    </div>

    <p
      id="action-status"
      class="visually-hidden"
      role="status"
      aria-live="polite"
    ></p>

    <section
      class="gauge-card"
      aria-label="System health gauge"
    >
      <div id="gauge-container"></div>

      <ul
        class="range-list"
        aria-label="System health ranges"
      >
        <li>Normal: 0 to 40</li>
        <li>Warning: 40 to 70</li>
        <li>Critical: 70 to 100</li>
      </ul>
    </section>

    <img
      id="export-preview"
      alt="Exported preview of the system health gauge"
    />
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  LinearGauge,
  Print,
  ImageExport,
  PdfExport,
  Annotations
} from '@syncfusion/ej2-lineargauge';

import {
  PdfPageOrientation
} from '@syncfusion/ej2-pdf-export';

LinearGauge.Inject(
  Print,
  ImageExport,
  PdfExport,
  Annotations
);

const initialValue: number = 65;

const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

function getStatus(
  value: number
): string {
  if (value >= 70) {
    return 'Critical';
  }

  if (value >= 40) {
    return 'Warning';
  }

  return 'Normal';
}

function getStatusColor(
  value: number
): string {
  if (value >= 70) {
    return '#991b1b';
  }

  if (value >= 40) {
    return '#854d0e';
  }

  return '#166534';
}

function createAnnotation(
  value: number
): string {
  const status: string =
    getStatus(value);

  const color: string =
    getStatusColor(value);

  return (
    '<div style="' +
    'padding:6px 10px;' +
    'border:1px solid ' +
    color +
    ';' +
    'border-radius:6px;' +
    'background:#ffffff;' +
    'color:' +
    color +
    ';' +
    'font-family:Arial,sans-serif;' +
    'font-weight:700;' +
    '">' +
    value +
    '% ' +
    status +
    '</div>'
  );
}

const timestamp: string =
  new Intl.DateTimeFormat(
    'en-IN',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(new Date());

const gauge: LinearGauge =
  new LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    allowPrint: true,
    allowImageExport: true,
    allowPdfExport: true,

    animationDuration:
      reduceMotion ? 0 : 1000,

    title: 'Current System Health',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '19px',
      fontWeight: '700'
    },

    margin: {
      left: 25,
      right: 25,
      top: 30,
      bottom: 45
    },

    container: {
      width: 28,
      height: 0,
      type: 'RoundedRectangle',
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      {
        minimum: 0,
        maximum: 100,
        showLastLabel: true,

        line: {
          width: 2,
          color: '#475569'
        },

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 11,
          width: 2,
          color: '#334155'
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 6,
          width: 1,
          color: '#64748b'
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 9,

          font: {
            color: '#334155',
            fontFamily: 'Arial',
            size: '13px',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#166534',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 40,
            end: 70,
            color: '#854d0e',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 70,
            end: 100,
            color: '#991b1b',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          }
        ],

        pointers: [
          {
            value: initialValue,
            type: 'Bar',
            color: '#1e293b',
            width: 11,
            position: 'Cross',
            roundedCornerRadius: 4,
            animationDuration:
              reduceMotion ? 0 : 700,
            description:
              'Current system health is 65 percent'
          },
          {
            value: initialValue,
            type: 'Marker',
            markerType: 'InvertedTriangle',
            color: '#111827',
            height: 18,
            width: 18,
            position: 'Outside',
            placement: 'Near',
            offset: 7,
            animationDuration:
              reduceMotion ? 0 : 700,
            description:
              'Current system-health marker'
          }
        ]
      }
    ],

    annotations: [
      {
        axisIndex: 0,
        axisValue: initialValue,
        x: 0,
        y: -45,
        zIndex: '1',
        content:
          createAnnotation(initialValue)
      },
      {
        axisIndex: 0,
        axisValue: 50,
        x: 0,
        y: 70,
        zIndex: '1',
        content:
          `Last updated: ${timestamp}`,

        font: {
          color: '#475569',
          fontFamily: 'Arial',
          size: '11px'
        }
      }
    ]
  });

gauge.appendTo('#gauge-container');

const valueInput:
  HTMLInputElement | null =
    document.querySelector<HTMLInputElement>(
      '#gauge-value'
    );

const valueOutput:
  HTMLOutputElement | null =
    document.querySelector<HTMLOutputElement>(
      '#gauge-output'
    );

const actionStatus:
  HTMLElement | null =
    document.getElementById(
      'action-status'
    );

function setActionStatus(
  message: string
): void {
  if (actionStatus) {
    actionStatus.textContent = message;
  }
}

function updateGaugeValue(): void {
  if (!valueInput) {
    return;
  }

  const value: number =
    Number(valueInput.value);

  gauge.setPointerValue(
    0,
    0,
    value
  );

  gauge.setPointerValue(
    0,
    1,
    value
  );

  gauge.axes[0].pointers[0].description =
    `Current system health is ${value} percent`;

  gauge.axes[0].pointers[1].description =
    `Current system-health marker at ${value} percent`;

  gauge.annotations[0].axisValue =
    value;

  gauge.annotations[0].content =
    createAnnotation(value);

  gauge.refresh();

  if (valueOutput) {
    valueOutput.value = `${value}%`;
  }

  setActionStatus(
    `System health updated to ${value} percent.`
  );
}

valueInput?.addEventListener(
  'input',
  updateGaugeValue
);

function addAction(
  id: string,
  handler: () => void
): void {
  const button: HTMLElement | null =
    document.getElementById(id);

  button?.addEventListener(
    'click',
    handler
  );
}

function getFileName(): string {
  const date: string =
    new Date()
      .toISOString()
      .slice(0, 10);

  return `system-health-gauge-${date}`;
}

addAction(
  'export-png',
  (): void => {
    gauge.export(
      'PNG',
      getFileName()
    );

    setActionStatus(
      'PNG export started.'
    );
  }
);

addAction(
  'export-jpeg',
  (): void => {
    gauge.export(
      'JPEG',
      getFileName()
    );

    setActionStatus(
      'JPEG export started.'
    );
  }
);

addAction(
  'export-svg',
  (): void => {
    gauge.export(
      'SVG',
      getFileName()
    );

    setActionStatus(
      'SVG export started.'
    );
  }
);

addAction(
  'export-pdf',
  (): void => {
    gauge.export(
      'PDF',
      getFileName(),
      PdfPageOrientation.Landscape
    );

    setActionStatus(
      'PDF export started.'
    );
  }
);

addAction(
  'print',
  (): void => {
    gauge.print();

    setActionStatus(
      'Browser print dialog opened.'
    );
  }
);

addAction(
  'preview-png',
  (): void => {
    void (async (): Promise<void> => {
      try {
        setActionStatus(
          'Creating PNG preview.'
        );

        const result: string =
          await gauge.export(
            'PNG',
            getFileName(),
            undefined,
            false
          );

        const preview:
          HTMLImageElement | null =
            document.querySelector<HTMLImageElement>(
              '#export-preview'
            );

        if (preview) {
          preview.src = result;
        }

        setActionStatus(
          'PNG preview created.'
        );
      } catch {
        setActionStatus(
          'The PNG preview could not be created.'
        );
      }
    })();
  }
);

window.addEventListener(
  'beforeunload',
  (): void => {
    valueInput?.removeEventListener(
      'input',
      updateGaugeValue
    );

    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Complete JavaScript Example

Use the same `index.html` from the complete TypeScript example.

Ensure that the required EJ2 Linear Gauge and PDF export global scripts are loaded before `index.js`.

### index.js

```javascript
ej.lineargauge.LinearGauge.Inject(
  ej.lineargauge.Print,
  ej.lineargauge.ImageExport,
  ej.lineargauge.PdfExport,
  ej.lineargauge.Annotations
);

var initialValue = 65;

var reduceMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

function getStatus(value) {
  if (value >= 70) {
    return 'Critical';
  }

  if (value >= 40) {
    return 'Warning';
  }

  return 'Normal';
}

function getStatusColor(value) {
  if (value >= 70) {
    return '#991b1b';
  }

  if (value >= 40) {
    return '#854d0e';
  }

  return '#166534';
}

function createAnnotation(value) {
  var status =
    getStatus(value);

  var color =
    getStatusColor(value);

  return (
    '<div style="' +
    'padding:6px 10px;' +
    'border:1px solid ' +
    color +
    ';' +
    'border-radius:6px;' +
    'background:#ffffff;' +
    'color:' +
    color +
    ';' +
    'font-family:Arial,sans-serif;' +
    'font-weight:700;' +
    '">' +
    value +
    '% ' +
    status +
    '</div>'
  );
}

var timestamp =
  new Intl.DateTimeFormat(
    'en-IN',
    {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  ).format(new Date());

var gauge =
  new ej.lineargauge.LinearGauge({
    width: '100%',
    height: '100%',
    orientation: 'Horizontal',
    background: '#ffffff',

    allowPrint: true,
    allowImageExport: true,
    allowPdfExport: true,

    animationDuration:
      reduceMotion ? 0 : 1000,

    title: 'Current System Health',

    titleStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '19px',
      fontWeight: '700'
    },

    margin: {
      left: 25,
      right: 25,
      top: 30,
      bottom: 45
    },

    container: {
      width: 28,
      height: 0,
      type: 'RoundedRectangle',
      backgroundColor: '#e2e8f0',
      roundedCornerRadius: 8,
      border: {
        color: '#94a3b8',
        width: 1
      }
    },

    axes: [
      {
        minimum: 0,
        maximum: 100,
        showLastLabel: true,

        line: {
          width: 2,
          color: '#475569'
        },

        majorTicks: {
          interval: 20,
          position: 'Outside',
          height: 11,
          width: 2,
          color: '#334155'
        },

        minorTicks: {
          interval: 5,
          position: 'Outside',
          height: 6,
          width: 1,
          color: '#64748b'
        },

        labelStyle: {
          format: '{value}%',
          position: 'Outside',
          offset: 9,

          font: {
            color: '#334155',
            fontFamily: 'Arial',
            size: '13px',
            fontWeight: '600'
          }
        },

        ranges: [
          {
            start: 0,
            end: 40,
            color: '#166534',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 40,
            end: 70,
            color: '#854d0e',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          },
          {
            start: 70,
            end: 100,
            color: '#991b1b',
            position: 'Inside',
            startWidth: 15,
            endWidth: 15
          }
        ],

        pointers: [
          {
            value: initialValue,
            type: 'Bar',
            color: '#1e293b',
            width: 11,
            position: 'Cross',
            roundedCornerRadius: 4,
            animationDuration:
              reduceMotion ? 0 : 700,
            description:
              'Current system health is 65 percent'
          },
          {
            value: initialValue,
            type: 'Marker',
            markerType: 'InvertedTriangle',
            color: '#111827',
            height: 18,
            width: 18,
            position: 'Outside',
            placement: 'Near',
            offset: 7,
            animationDuration:
              reduceMotion ? 0 : 700,
            description:
              'Current system-health marker'
          }
        ]
      }
    ],

    annotations: [
      {
        axisIndex: 0,
        axisValue: initialValue,
        x: 0,
        y: -45,
        zIndex: '1',
        content:
          createAnnotation(initialValue)
      },
      {
        axisIndex: 0,
        axisValue: 50,
        x: 0,
        y: 70,
        zIndex: '1',
        content:
          'Last updated: ' +
          timestamp,

        font: {
          color: '#475569',
          fontFamily: 'Arial',
          size: '11px'
        }
      }
    ]
  });

gauge.appendTo('#gauge-container');

var valueInput =
  document.getElementById(
    'gauge-value'
  );

var valueOutput =
  document.getElementById(
    'gauge-output'
  );

var actionStatus =
  document.getElementById(
    'action-status'
  );

function setActionStatus(message) {
  if (actionStatus) {
    actionStatus.textContent = message;
  }
}

function updateGaugeValue() {
  if (!valueInput) {
    return;
  }

  var value =
    Number(valueInput.value);

  gauge.setPointerValue(
    0,
    0,
    value
  );

  gauge.setPointerValue(
    0,
    1,
    value
  );

  gauge.axes[0].pointers[0].description =
    'Current system health is ' +
    value +
    ' percent';

  gauge.axes[0].pointers[1].description =
    'Current system-health marker at ' +
    value +
    ' percent';

  gauge.annotations[0].axisValue =
    value;

  gauge.annotations[0].content =
    createAnnotation(value);

  gauge.refresh();

  if (valueOutput) {
    valueOutput.value =
      value + '%';
  }

  setActionStatus(
    'System health updated to ' +
    value +
    ' percent.'
  );
}

if (valueInput) {
  valueInput.addEventListener(
    'input',
    updateGaugeValue
  );
}

function addAction(id, handler) {
  var button =
    document.getElementById(id);

  if (button) {
    button.addEventListener(
      'click',
      handler
    );
  }
}

function getFileName() {
  var date =
    new Date()
      .toISOString()
      .slice(0, 10);

  return (
    'system-health-gauge-' +
    date
  );
}

addAction(
  'export-png',
  function () {
    gauge.export(
      'PNG',
      getFileName()
    );

    setActionStatus(
      'PNG export started.'
    );
  }
);

addAction(
  'export-jpeg',
  function () {
    gauge.export(
      'JPEG',
      getFileName()
    );

    setActionStatus(
      'JPEG export started.'
    );
  }
);

addAction(
  'export-svg',
  function () {
    gauge.export(
      'SVG',
      getFileName()
    );

    setActionStatus(
      'SVG export started.'
    );
  }
);

addAction(
  'export-pdf',
  function () {
    gauge.export(
      'PDF',
      getFileName(),
      ej.pdfexport
        .PdfPageOrientation
        .Landscape
    );

    setActionStatus(
      'PDF export started.'
    );
  }
);

addAction(
  'print',
  function () {
    gauge.print();

    setActionStatus(
      'Browser print dialog opened.'
    );
  }
);

addAction(
  'preview-png',
  async function () {
    try {
      setActionStatus(
        'Creating PNG preview.'
      );

      var result =
        await gauge.export(
          'PNG',
          getFileName(),
          undefined,
          false
        );

      var preview =
        document.getElementById(
          'export-preview'
        );

      if (preview) {
        preview.src = result;
      }

      setActionStatus(
        'PNG preview created.'
      );
    } catch (error) {
      setActionStatus(
        'The PNG preview could not be created.'
      );
    }
  }
);

window.addEventListener(
  'beforeunload',
  function () {
    if (valueInput) {
      valueInput.removeEventListener(
        'input',
        updateGaugeValue
      );
    }

    gauge.destroy();
  },
  {
    once: true
  }
);
```

## Migration from Essential JavaScript 1

Essential JavaScript 2 uses a different package, initialization model, configuration structure, and module system from Essential JavaScript 1.

The examples in this section describe migration to pure EJ2 TypeScript and JavaScript, not to the Angular wrapper.

## Primary Migration Changes

Major changes include:

- Replace the jQuery-based `ejLinearGauge` initialization with `new LinearGauge(...)`.
- Install `@syncfusion/ej2-lineargauge`.
- Replace EJ1 scales with EJ2 axes.
- Place ranges and pointers inside an axis.
- Replace separate marker- and bar-pointer collections with the unified `pointers` collection.
- Use pointer `type` to select `Marker` or `Bar`.
- Use `labelStyle` to configure axis labels.
- Use annotations for custom gauge content.
- Inject optional feature modules such as print, export, annotations, gradients, and tooltips.
- Replace EJ1 property paths with EJ2 configuration objects.
- Replace jQuery event handling with standard JavaScript events or EJ2 event properties.

## EJ1 Example

```javascript
$('#gauge-container').ejLinearGauge({
  orientation: 'Horizontal',

  scales: [
    {
      minimum: 0,
      maximum: 100,

      markerPointers: [
        {
          value: 50
        }
      ],

      ranges: [
        {
          startValue: 0,
          endValue: 50,
          backgroundColor: 'green'
        }
      ]
    }
  ]
});
```

## EJ2 TypeScript Example

```typescript
import {
  LinearGauge
} from '@syncfusion/ej2-lineargauge';

const gauge: LinearGauge =
  new LinearGauge({
    orientation: 'Horizontal',

    axes: [
      {
        minimum: 0,
        maximum: 100,

        ranges: [
          {
            start: 0,
            end: 50,
            color: '#15803d',
            startWidth: 15,
            endWidth: 15
          }
        ],

        pointers: [
          {
            value: 50,
            type: 'Marker',
            markerType:
              'InvertedTriangle'
          }
        ]
      }
    ]
  });

gauge.appendTo('#gauge-container');
```

## EJ2 JavaScript Example

```javascript
var gauge =
  new ej.lineargauge.LinearGauge({
    orientation: 'Horizontal',

    axes: [
      {
        minimum: 0,
        maximum: 100,

        ranges: [
          {
            start: 0,
            end: 50,
            color: '#15803d',
            startWidth: 15,
            endWidth: 15
          }
        ],

        pointers: [
          {
            value: 50,
            type: 'Marker',
            markerType:
              'InvertedTriangle'
          }
        ]
      }
    ]
  });

gauge.appendTo('#gauge-container');
```

## Feature Mapping

### Gauge Initialization

EJ1:

```javascript
$('#gauge-container').ejLinearGauge({
  orientation: 'Horizontal'
});
```

EJ2:

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    orientation: 'Horizontal'
  });

gauge.appendTo('#gauge-container');
```

### Scale Collection

EJ1:

```javascript
scales: []
```

EJ2:

```typescript
axes: []
```

### Marker Pointers

EJ1:

```javascript
markerPointers: [
  {
    value: 50
  }
]
```

EJ2:

```typescript
pointers: [
  {
    value: 50,
    type: 'Marker'
  }
]
```

### Bar Pointers

EJ1:

```javascript
barPointers: [
  {
    value: 50
  }
]
```

EJ2:

```typescript
pointers: [
  {
    value: 50,
    type: 'Bar'
  }
]
```

### Label Formatting

EJ1:

```javascript
labels: [
  {
    unitText: '%'
  }
]
```

EJ2:

```typescript
labelStyle: {
  format: '{value}%'
}
```

### Tick Dimensions

EJ2 major ticks:

```typescript
majorTicks: {
  interval: 20,
  height: 10,
  width: 2
}
```

EJ2 minor ticks:

```typescript
minorTicks: {
  interval: 5,
  height: 5,
  width: 1
}
```

### Update a Pointer

EJ2:

```typescript
gauge.setPointerValue(
  0,
  0,
  75
);
```

The arguments are:

1. Axis index
2. Pointer index
3. New value

### Update a Range

Update the range model and refresh the gauge.

```typescript
gauge.axes[0].ranges[0].start =
  0;

gauge.axes[0].ranges[0].end =
  75;

gauge.refresh();
```

Use a dedicated range-update method only when it exists and is validated for the installed package version.

### Custom Labels

Use `axisLabelRender`.

```typescript
axisLabelRender: (
  args
): void => {
  args.text =
    `Value: ${args.text}`;
}
```

### Annotations

Inject `Annotations` and configure the annotation collection.

```typescript
LinearGauge.Inject(Annotations);

const gauge: LinearGauge =
  new LinearGauge({
    annotations: [
      {
        content: 'Current value',
        axisIndex: 0,
        axisValue: 50
      }
    ]
  });
```

## Migration Checklist

- [ ] Remove jQuery-based Linear Gauge initialization.
- [ ] Install `@syncfusion/ej2-lineargauge`.
- [ ] Import `LinearGauge` from the EJ2 package.
- [ ] Replace EJ1 scales with the EJ2 `axes` collection.
- [ ] Move ranges into the corresponding axis.
- [ ] Move marker and bar pointers into `axes[].pointers`.
- [ ] Set each pointer `type` to `Marker` or `Bar`.
- [ ] Replace EJ1 label settings with `labelStyle`.
- [ ] Replace custom-label configuration with annotations or `axisLabelRender`.
- [ ] Update tick settings to `majorTicks` and `minorTicks`.
- [ ] Replace jQuery events with EJ2 events or standard DOM listeners.
- [ ] Inject `Print` before using printing.
- [ ] Inject `ImageExport` before image export.
- [ ] Inject `PdfExport` before PDF export.
- [ ] Inject `Annotations` before annotations.
- [ ] Inject `Gradient` before range or pointer gradients.
- [ ] Validate pointer and range update APIs.
- [ ] Replace Angular templates if migrating to pure TypeScript or JavaScript.
- [ ] Validate theme configuration.
- [ ] Test print and every export format.
- [ ] Test pointer values after dynamic scale changes.
- [ ] Test labels at all supported screen sizes.
- [ ] Test accessible names, contrast, and surrounding controls.
- [ ] Test reduced-motion behavior.
- [ ] Remove obsolete EJ1 scripts and styles after migration.

## Best Practices

### Inject Only Required Modules

```typescript
LinearGauge.Inject(
  Print,
  ImageExport
);
```

Do not inject `PdfExport` or `Annotations` unless those features are used.

### Enable the Matching Export Property

For image export:

```typescript
allowImageExport: true
```

For PDF export:

```typescript
allowPdfExport: true
```

For printing:

```typescript
allowPrint: true
```

### Use Meaningful File Names

```typescript
gauge.export(
  'PNG',
  'system-health-2026-08-13'
);
```

Avoid generic names such as `export` when users may download several files.

### Respect Reduced-Motion Preferences

```typescript
const reduceMotion: boolean =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

const gauge: LinearGauge =
  new LinearGauge({
    animationDuration:
      reduceMotion ? 0 : 1000
  });
```

### Sanitize Annotation HTML

Do not insert untrusted content directly into annotation HTML.

```typescript
annotations: [
  {
    content:
      '<strong>Trusted content</strong>'
  }
]
```

Use text content or sanitized markup when values originate outside the application.

### Keep Essential Information Outside the Graphic

Provide visible text for important values.

```html
<p>
  Current system health:
  <strong>65 percent</strong>
</p>
```

### Use Native Controls

Use native buttons for print and export.

```html
<button id="export-png" type="button">
  Export PNG
</button>
```

Use a native range input for keyboard-accessible value editing.

```html
<input
  id="gauge-value"
  type="range"
  min="0"
  max="100"
  value="65"
/>
```

### Separate Text Direction from Scale Direction

Use `dir="rtl"` for surrounding text.

```html
<section dir="rtl" lang="ar">
  <h1>مؤشر النظام</h1>
</section>
```

Use `isInversed` for numeric scale direction.

```typescript
axes: [
  {
    isInversed: true
  }
]
```

### Destroy the Gauge

```typescript
gauge.destroy();
```

Also remove application-level event listeners when the gauge is no longer required.

## Troubleshooting

### Print Does Not Work

Import and inject `Print`.

```typescript
import {
  LinearGauge,
  Print
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Print);
```

Enable printing.

```typescript
allowPrint: true
```

Call `print()` after the gauge has rendered.

```typescript
gauge.print();
```

### PNG, JPEG, or SVG Export Does Not Work

Import and inject `ImageExport`.

```typescript
import {
  LinearGauge,
  ImageExport
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(ImageExport);
```

Enable image export.

```typescript
allowImageExport: true
```

Use a supported format.

```typescript
gauge.export(
  'PNG',
  'linear-gauge'
);
```

```typescript
gauge.export(
  'JPEG',
  'linear-gauge'
);
```

```typescript
gauge.export(
  'SVG',
  'linear-gauge'
);
```

### PDF Export Does Not Work

Import and inject `PdfExport`.

```typescript
import {
  LinearGauge,
  PdfExport
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(PdfExport);
```

Enable PDF export.

```typescript
allowPdfExport: true
```

Export using `PDF`.

```typescript
gauge.export(
  'PDF',
  'linear-gauge'
);
```

### Base64 Export Is Empty or Undefined

Confirm that:

1. The correct export module is injected.
2. The matching export property is enabled.
3. The gauge has completed rendering.
4. `allowDownload` is `false`.
5. The returned promise is awaited.

```typescript
const result: string =
  await gauge.export(
    'PNG',
    'linear-gauge',
    undefined,
    false
  );
```

### PDF Is Clipped

Use landscape orientation for a wide gauge.

```typescript
gauge.export(
  'PDF',
  'linear-gauge',
  PdfPageOrientation.Landscape
);
```

Also verify:

- Gauge width and height
- Margins
- Label length
- Annotation position
- Container aspect ratio

### Exported Images Omit External Assets

Externally loaded pointer images or annotation images may be restricted by browser cross-origin rules.

Prefer application-controlled assets and ensure that:

- The image path is valid.
- The image has loaded before export.
- The server permits required cross-origin access.
- The deployed application includes the image.

### Annotation Is Not Displayed

Import and inject `Annotations`.

```typescript
import {
  LinearGauge,
  Annotations
} from '@syncfusion/ej2-lineargauge';

LinearGauge.Inject(Annotations);
```

Verify that:

- `axisIndex` identifies an existing axis.
- `axisValue` is within the scale.
- `content` is not empty.
- `x` and `y` do not move the annotation outside the gauge.
- `zIndex` does not place it behind other content.

### Annotation Is in the Wrong Position

Adjust `x` and `y`.

```typescript
annotations: [
  {
    axisIndex: 0,
    axisValue: 65,
    x: 0,
    y: -40
  }
]
```

For multiple axes, verify `axisIndex`.

### Gauge Animation Does Not Run

Set a positive gauge-level duration.

```typescript
animationDuration: 1000
```

For individual pointer animation:

```typescript
pointers: [
  {
    value: 65,
    animationDuration: 700
  }
]
```

Check whether the application intentionally disables animation for reduced-motion users.

### Range Does Not Animate Independently

A range does not have an independent animation-duration property comparable to a pointer.

Use the gauge-level animation.

```typescript
animationDuration: 1000
```

For dynamic range changes:

```typescript
gauge.axes[0].ranges[0].end =
  75;

gauge.refresh();
```

### Number Formatting Does Not Change

Set the culture before creating the gauge.

```typescript
setCulture('de-DE');

const gauge: LinearGauge =
  new LinearGauge({
    locale: 'de-DE'
  });
```

Load the required culture data when applicable.

Use a supported number format.

```typescript
labelStyle: {
  format: 'n1'
}
```

### Currency Symbol Is Incorrect

Set the currency code before creating the gauge.

```typescript
setCurrencyCode('EUR');
```

Use a currency format.

```typescript
labelStyle: {
  format: 'C0'
}
```

### Custom Locale Text Is Not Displayed

The Linear Gauge does not expose general built-in command labels such as `range` for arbitrary localization.

Localize:

- Surrounding headings
- Button labels
- Annotation content
- Visible descriptions
- Date and number formats

Example:

```html
<button id="export-png" type="button">
  Bild exportieren
</button>
```

### RTL Does Not Reverse the Scale

Use `isInversed`.

```typescript
axes: [
  {
    isInversed: true
  }
]
```

Use `dir="rtl"` separately for surrounding textual content.

### Keyboard Arrow Keys Do Not Change the Gauge

Built-in keyboard navigation is not generally applicable to the Linear Gauge.

Provide a native range input.

```html
<input
  id="gauge-value"
  type="range"
  min="0"
  max="100"
  value="50"
/>
```

Update the pointer with `setPointerValue()`.

```typescript
gauge.setPointerValue(
  0,
  0,
  value
);
```

### Screen Reader Output Is Incomplete

Provide:

- A meaningful gauge title
- Clear axis labels
- Pointer descriptions
- Text annotation content
- A visible textual value outside the gauge

```typescript
title: 'System Temperature'
```

```typescript
pointers: [
  {
    value: 65,
    description:
      'Current system temperature is 65 degrees Celsius'
  }
]
```

### Migrated EJ1 Gauge Does Not Render

Confirm that:

- The EJ2 package is installed.
- The old jQuery initialization was removed.
- `scales` was replaced with `axes`.
- Ranges and pointers are inside an axis.
- The gauge is appended to a valid host.
- The host has a visible size.

```typescript
const gauge: LinearGauge =
  new LinearGauge({
    axes: [
      {
        minimum: 0,
        maximum: 100
      }
    ]
  });

gauge.appendTo('#gauge-container');
```

### Gauge Is Not Visible

Confirm that the host exists.

```html
<div id="gauge-container"></div>
```

Give it a nonzero size.

```css
#gauge-container {
  width: 100%;
  height: 360px;
}
```

Append the gauge after the host becomes available.

```typescript
gauge.appendTo('#gauge-container');
```

Also verify that no earlier JavaScript error stopped initialization.