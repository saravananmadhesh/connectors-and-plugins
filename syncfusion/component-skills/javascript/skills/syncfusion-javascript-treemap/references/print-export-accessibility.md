# TreeMap Print, Export, and Accessibility in TypeScript and JavaScript

## Table of Contents

- #prerequisites
- #print-functionality
  - #enable-print
  - #print-options
- #image-export
  - #export-as-png
  - #export-as-jpeg
  - #export-as-svg
  - #export-to-base64
  - #export-configuration
- #pdf-export
  - #enable-pdf-export
  - #pdf-orientation
  - #run-multiple-export-actions
- #complete-typescript-export-example
- #complete-javascript-export-example
- #accessibility-overview
  - #accessibility-standards
  - #built-in-wai-aria-support
  - #keyboard-navigation-considerations
- #screen-reader-support
  - #accessible-treemap-content
  - #custom-accessible-description
  - #accessible-surrounding-content
- #color-contrast-best-practices
  - #use-high-contrast-colors
  - #avoid-low-contrast-combinations
  - #accessible-category-palette
  - #do-not-rely-only-on-color
- #complete-accessible-typescript-example
- #complete-accessible-javascript-example
- #accessibility-checklist
- #testing-for-accessibility
  - #browser-development-tools
  - #automated-accessibility-testing
  - #screen-reader-testing
  - #print-and-export-testing
- #troubleshooting

## Prerequisites

Install the Syncfusion EJ2 TreeMap package.

```bash
npm install @syncfusion/ej2-treemap
```

The TreeMap package includes dependencies required by its print and export functionality.

Add a TreeMap container to the HTML page.

```html
<div id="container"></div>
```

Define a visible width and height for the container.

```html
<style>
  #container {
    display: block;
    width: 100%;
    height: 520px;
  }
</style>
```

For TypeScript, import the TreeMap and only the feature modules required by the application.

```typescript
import {
  TreeMap,
  Print,
  ImageExport,
  PdfExport
} from '@syncfusion/ej2-treemap';
```

Inject the required modules before creating the TreeMap.

```typescript
TreeMap.Inject(
  Print,
  ImageExport,
  PdfExport
);
```

For JavaScript applications that use Syncfusion EJ2 global scripts, inject the modules through the `ej.treemap` namespace.

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.Print,
  ej.treemap.ImageExport,
  ej.treemap.PdfExport
);
```

Inject only the modules used by the application.

## Print Functionality

TreeMap provides built-in browser printing through:

- The `Print` module
- The `allowPrint` property
- The `print()` instance method

The print operation opens the browser print flow for the rendered TreeMap.

## Enable Print

Import and inject the `Print` module, set `allowPrint` to `true`, and call `print()` on the TreeMap instance.

### TypeScript

```typescript
import {
  TreeMap,
  Print
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(Print);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  }
];

const treemap: TreeMap = new TreeMap({
  allowPrint: true,
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');

const printButton: HTMLElement | null =
  document.getElementById('print');

printButton?.addEventListener('click', (): void => {
  treemap.print();
});
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.Print
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  }
];

var treemap = new ej.treemap.TreeMap({
  allowPrint: true,
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');

var printButton = document.getElementById('print');

if (printButton) {
  printButton.addEventListener('click', function () {
    treemap.print();
  });
}
```

### HTML

```html
<button id="print" type="button">
  Print TreeMap
</button>

<div id="container"></div>
```

## Print Options

Use the `print()` method to print the rendered TreeMap.

### TypeScript

```typescript
function printTreeMap(): void {
  treemap.print();
}
```

### JavaScript

```javascript
function printTreeMap() {
  treemap.print();
}
```

The appearance of the print dialog and available options are controlled by the browser and operating system.

Use print-specific CSS when surrounding page elements should be hidden.

```css
@media print {
  .toolbar,
  .page-description {
    display: none;
  }

  body {
    margin: 0;
    padding: 0;
  }

  #container {
    width: 100%;
    height: 520px;
  }
}
```

Useful print considerations include:

- Give the TreeMap a fixed print height.
- Hide controls that are not required in the printed output.
- Avoid placing essential information only in hover tooltips.
- Verify that labels remain readable in grayscale.
- Test portrait and landscape browser print modes.

## Image Export

TreeMap supports image export through:

- The `ImageExport` module
- The `allowImageExport` property
- The `export()` instance method

Supported image formats include:

- `PNG`
- `JPEG`
- `SVG`

## Export as PNG

PNG is suitable when lossless raster output and sharp text are required.

### TypeScript

```typescript
import {
  TreeMap,
  ImageExport
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(ImageExport);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  }
];

const treemap: TreeMap = new TreeMap({
  allowImageExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true
  }
});

treemap.appendTo('#container');

const pngButton: HTMLElement | null =
  document.getElementById('export-png');

pngButton?.addEventListener('click', (): void => {
  treemap.export('PNG', 'treemap');
});
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.ImageExport
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  }
];

var treemap = new ej.treemap.TreeMap({
  allowImageExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true
  }
});

treemap.appendTo('#container');

var pngButton =
  document.getElementById('export-png');

if (pngButton) {
  pngButton.addEventListener('click', function () {
    treemap.export('PNG', 'treemap');
  });
}
```

## Export as JPEG

JPEG is useful when a smaller raster image is preferred and lossless output is not required.

### TypeScript

```typescript
function exportJPEG(): void {
  treemap.export('JPEG', 'treemap');
}
```

### JavaScript

```javascript
function exportJPEG() {
  treemap.export('JPEG', 'treemap');
}
```

## Export as SVG

SVG is suitable for scalable vector output.

### TypeScript

```typescript
function exportSVG(): void {
  treemap.export('SVG', 'treemap');
}
```

### JavaScript

```javascript
function exportSVG() {
  treemap.export('SVG', 'treemap');
}
```

SVG output is useful when:

- The image must scale without losing sharpness.
- The exported content will be used in vector workflows.
- Text and boundaries must remain clear at different sizes.

## Export to Base64

Set the `allowDownload` argument to `false` to obtain the exported image data programmatically instead of immediately downloading it.

Base64 export is supported for PNG and JPEG image workflows.

### TypeScript

```typescript
async function exportBase64(): Promise<void> {
  const result: string = await treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  console.log(result);
}
```

Display the returned value in an image preview.

```typescript
async function previewExport(): Promise<void> {
  const result: string = await treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  const preview: HTMLImageElement | null =
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
async function exportBase64() {
  var result = await treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  console.log(result);
}
```

Display the value in an image preview.

```javascript
async function previewExport() {
  var result = await treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  var preview =
    document.getElementById('export-preview');

  if (preview) {
    preview.src = result;
  }
}
```

### HTML

```html
<button id="preview-export" type="button">
  Preview PNG
</button>

<img
  id="export-preview"
  alt="Preview of the exported TreeMap"
/>
```

Do not use Base64 output as accessible replacement content. The original TreeMap or an accessible text alternative should remain available.

## Export Configuration

The TreeMap export method accepts the export type, file name, optional PDF orientation, and optional download behavior.

```typescript
treemap.export(
  type,
  fileName,
  orientation,
  allowDownload
);
```

The arguments are:

- `type`: Export format such as `PNG`, `JPEG`, `SVG`, or `PDF`.
- `fileName`: Name assigned to the exported file.
- `orientation`: Optional PDF page orientation.
- `allowDownload`: Determines whether the export is downloaded automatically.

Common calls include:

```typescript
treemap.export('PNG', 'product-sales');
```

```typescript
treemap.export('JPEG', 'product-sales');
```

```typescript
treemap.export('SVG', 'product-sales');
```

```typescript
treemap.export(
  'PNG',
  'product-sales',
  undefined,
  false
);
```

Use clear and meaningful file names.

```typescript
treemap.export(
  'PNG',
  'product-sales-by-category'
);
```

## PDF Export

TreeMap supports PDF export through:

- The `PdfExport` module
- The `allowPdfExport` property
- The `export()` instance method

## Enable PDF Export

Import and inject `PdfExport`, set `allowPdfExport` to `true`, and call `export()` with `PDF`.

### TypeScript

```typescript
import {
  TreeMap,
  PdfExport
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(PdfExport);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  }
];

const treemap: TreeMap = new TreeMap({
  allowPdfExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true
  }
});

treemap.appendTo('#container');

const pdfButton: HTMLElement | null =
  document.getElementById('export-pdf');

pdfButton?.addEventListener('click', (): void => {
  treemap.export('PDF', 'treemap');
});
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.PdfExport
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  }
];

var treemap = new ej.treemap.TreeMap({
  allowPdfExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true
  }
});

treemap.appendTo('#container');

var pdfButton =
  document.getElementById('export-pdf');

if (pdfButton) {
  pdfButton.addEventListener('click', function () {
    treemap.export('PDF', 'treemap');
  });
}
```

## PDF Orientation

Import `PdfPageOrientation` from `@syncfusion/ej2-pdf-export`.

### TypeScript

```typescript
import {
  PdfPageOrientation
} from '@syncfusion/ej2-pdf-export';
```

Export in portrait orientation.

```typescript
function exportPDFPortrait(): void {
  treemap.export(
    'PDF',
    'treemap-portrait',
    PdfPageOrientation.Portrait
  );
}
```

Export in landscape orientation.

```typescript
function exportPDFLandscape(): void {
  treemap.export(
    'PDF',
    'treemap-landscape',
    PdfPageOrientation.Landscape
  );
}
```

### JavaScript

When the PDF export library is available globally, use its corresponding page-orientation value.

```javascript
function exportPDFPortrait() {
  treemap.export(
    'PDF',
    'treemap-portrait',
    ej.pdfexport.PdfPageOrientation.Portrait
  );
}
```

```javascript
function exportPDFLandscape() {
  treemap.export(
    'PDF',
    'treemap-landscape',
    ej.pdfexport.PdfPageOrientation.Landscape
  );
}
```

Use landscape orientation when the TreeMap is substantially wider than it is tall.

Use portrait orientation when:

- The TreeMap is approximately square.
- The document will be included in a portrait report.
- The available page width is sufficient for readable labels.

## Run Multiple Export Actions

Each `export()` call starts a separate export action.

### TypeScript

```typescript
import {
  PdfPageOrientation
} from '@syncfusion/ej2-pdf-export';

function exportAll(): void {
  treemap.export(
    'PNG',
    'treemap'
  );

  treemap.export(
    'JPEG',
    'treemap'
  );

  treemap.export(
    'SVG',
    'treemap'
  );

  treemap.export(
    'PDF',
    'treemap',
    PdfPageOrientation.Landscape
  );
}
```

### JavaScript

```javascript
function exportAll() {
  treemap.export(
    'PNG',
    'treemap'
  );

  treemap.export(
    'JPEG',
    'treemap'
  );

  treemap.export(
    'SVG',
    'treemap'
  );

  treemap.export(
    'PDF',
    'treemap',
    ej.pdfexport.PdfPageOrientation.Landscape
  );
}
```

Multiple calls can trigger multiple browser downloads. Separate buttons are generally clearer because users can select the required format directly.

## Complete TypeScript Export Example

The following example supports:

- PNG export
- JPEG export
- SVG export
- PDF export
- Base64 PNG preview
- Browser printing
- Accessible toolbar controls
- Screen-reader status messages

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
    TreeMap Print and Export
  </title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
      background: #f8fafc;
      color: #111827;
      font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 24px;
    }

    .description {
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
      min-height: 40px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: #dbeafe;
    }

    .toolbar button:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    #container {
      display: block;
      width: 100%;
      height: 520px;
      background: #ffffff;
    }

    #preview-section {
      margin-top: 20px;
    }

    #export-preview {
      display: block;
      max-width: 100%;
      margin-top: 8px;
      border: 1px solid #64748b;
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

    @media print {
      .toolbar,
      .description,
      #preview-section,
      #export-status {
        display: none;
      }

      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
      }

      #container {
        width: 100%;
        height: 520px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Product Sales TreeMap</h1>

    <p class="description">
      Export the product sales TreeMap as an image
      or PDF, or print it using the browser.
    </p>

    <div
      class="toolbar"
      role="group"
      aria-label="TreeMap export and print actions"
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
        Print TreeMap
      </button>
    </div>

    <p
      id="export-status"
      class="visually-hidden"
      role="status"
      aria-live="polite"
    ></p>

    <div id="container"></div>

    <section
      id="preview-section"
      aria-labelledby="preview-heading"
    >
      <h2 id="preview-heading">
        Export preview
      </h2>

      <img
        id="export-preview"
        alt="Exported preview of product sales TreeMap"
      />
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  TreeMap,
  Print,
  ImageExport,
  PdfExport
} from '@syncfusion/ej2-treemap';

import {
  PdfPageOrientation
} from '@syncfusion/ej2-pdf-export';

TreeMap.Inject(
  Print,
  ImageExport,
  PdfExport
);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  },
  {
    Product: 'Monitor',
    Sales: 6500
  }
];

const treemap: TreeMap = new TreeMap({
  allowPrint: true,
  allowImageExport: true,
  allowPdfExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  description:
    'Product sales TreeMap. Rectangle size represents sales value.',

  titleSettings: {
    text: 'Product Sales',
    textStyle: {
      color: '#111827',
      size: '18px',
      fontFamily: 'Arial',
      fontWeight: '600'
    }
  },

  palette: [
    '#075985',
    '#166534',
    '#9a3412',
    '#6b21a8'
  ],

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 2
    },
    labelStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '13px',
      fontWeight: '600'
    }
  }
});

treemap.appendTo('#container');

function setStatus(message: string): void {
  const status: HTMLElement | null =
    document.getElementById('export-status');

  if (status) {
    status.textContent = message;
  }
}

function addButtonHandler(
  id: string,
  handler: () => void
): void {
  const button: HTMLElement | null =
    document.getElementById(id);

  button?.addEventListener('click', handler);
}

addButtonHandler('export-png', (): void => {
  treemap.export(
    'PNG',
    'product-sales-treemap'
  );

  setStatus('PNG export started.');
});

addButtonHandler('export-jpeg', (): void => {
  treemap.export(
    'JPEG',
    'product-sales-treemap'
  );

  setStatus('JPEG export started.');
});

addButtonHandler('export-svg', (): void => {
  treemap.export(
    'SVG',
    'product-sales-treemap'
  );

  setStatus('SVG export started.');
});

addButtonHandler('export-pdf', (): void => {
  treemap.export(
    'PDF',
    'product-sales-treemap',
    PdfPageOrientation.Landscape
  );

  setStatus('PDF export started.');
});

addButtonHandler('print', (): void => {
  treemap.print();
  setStatus('Browser print dialog opened.');
});

const previewButton: HTMLElement | null =
  document.getElementById('preview-png');

previewButton?.addEventListener(
  'click',
  async (): Promise<void> => {
    try {
      setStatus('Creating PNG preview.');

      const result: string = await treemap.export(
        'PNG',
        'product-sales-treemap',
        undefined,
        false
      );

      const preview: HTMLImageElement | null =
        document.querySelector<HTMLImageElement>(
          '#export-preview'
        );

      if (preview) {
        preview.src = result;
      }

      setStatus('PNG preview created.');
    } catch {
      setStatus(
        'The PNG preview could not be created.'
      );
    }
  }
);
```

## Complete JavaScript Export Example

The following example uses the Syncfusion EJ2 global JavaScript namespace.

Ensure that the required EJ2 TreeMap and PDF export scripts and theme styles are loaded before `index.js`.

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
    TreeMap Print and Export
  </title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
      background: #f8fafc;
      color: #111827;
      font-family: Arial, Helvetica, sans-serif;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 24px;
    }

    .description {
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
      min-height: 40px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: #dbeafe;
    }

    .toolbar button:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    #container {
      display: block;
      width: 100%;
      height: 520px;
      background: #ffffff;
    }

    #preview-section {
      margin-top: 20px;
    }

    #export-preview {
      display: block;
      max-width: 100%;
      margin-top: 8px;
      border: 1px solid #64748b;
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

    @media print {
      .toolbar,
      .description,
      #preview-section,
      #export-status {
        display: none;
      }

      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
      }

      #container {
        width: 100%;
        height: 520px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Product Sales TreeMap</h1>

    <p class="description">
      Export the product sales TreeMap as an image
      or PDF, or print it using the browser.
    </p>

    <div
      class="toolbar"
      role="group"
      aria-label="TreeMap export and print actions"
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
        Print TreeMap
      </button>
    </div>

    <p
      id="export-status"
      class="visually-hidden"
      role="status"
      aria-live="polite"
    ></p>

    <div id="container"></div>

    <section
      id="preview-section"
      aria-labelledby="preview-heading"
    >
      <h2 id="preview-heading">
        Export preview
      </h2>

      <img
        id="export-preview"
        alt="Exported preview of product sales TreeMap"
      />
    </section>
  </main>

  <script scr="index.js"></script>
</body>
</html>
```

### index.js

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.Print,
  ej.treemap.ImageExport,
  ej.treemap.PdfExport
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  },
  {
    Product: 'Monitor',
    Sales: 6500
  }
];

var treemap = new ej.treemap.TreeMap({
  allowPrint: true,
  allowImageExport: true,
  allowPdfExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  description:
    'Product sales TreeMap. Rectangle size represents sales value.',

  titleSettings: {
    text: 'Product Sales',
    textStyle: {
      color: '#111827',
      size: '18px',
      fontFamily: 'Arial',
      fontWeight: '600'
    }
  },

  palette: [
    '#075985',
    '#166534',
    '#9a3412',
    '#6b21a8'
  ],

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 2
    },
    labelStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '13px',
      fontWeight: '600'
    }
  }
});

treemap.appendTo('#container');

function setStatus(message) {
  var status =
    document.getElementById('export-status');

  if (status) {
    status.textContent = message;
  }
}

function addButtonHandler(id, handler) {
  var button = document.getElementById(id);

  if (button) {
    button.addEventListener('click', handler);
  }
}

addButtonHandler('export-png', function () {
  treemap.export(
    'PNG',
    'product-sales-treemap'
  );

  setStatus('PNG export started.');
});

addButtonHandler('export-jpeg', function () {
  treemap.export(
    'JPEG',
    'product-sales-treemap'
  );

  setStatus('JPEG export started.');
});

addButtonHandler('export-svg', function () {
  treemap.export(
    'SVG',
    'product-sales-treemap'
  );

  setStatus('SVG export started.');
});

addButtonHandler('export-pdf', function () {
  treemap.export(
    'PDF',
    'product-sales-treemap',
    ej.pdfexport.PdfPageOrientation.Landscape
  );

  setStatus('PDF export started.');
});

addButtonHandler('print', function () {
  treemap.print();
  setStatus('Browser print dialog opened.');
});

addButtonHandler(
  'preview-png',
  async function () {
    try {
      setStatus('Creating PNG preview.');

      var result = await treemap.export(
        'PNG',
        'product-sales-treemap',
        undefined,
        false
      );

      var preview =
        document.getElementById('export-preview');

      if (preview) {
        preview.src = result;
      }

      setStatus('PNG preview created.');
    } catch (error) {
      setStatus(
        'The PNG preview could not be created.'
      );
    }
  }
);
```

## Accessibility Overview

TreeMap includes built-in accessibility support for its rendered content.

The accessibility of the complete application also depends on:

- Page structure
- Titles and descriptions
- Label text
- Color contrast
- Surrounding controls
- Focus visibility
- Alternative access to tooltip information
- The accessibility of custom templates

## Accessibility Standards

TreeMap accessibility support is designed around commonly referenced accessibility standards and practices, including:

- WCAG 2.2
- Section 508
- ADA
- WAI-ARIA patterns
- Screen-reader support
- Right-to-left rendering
- Color-contrast requirements
- Mobile-device support

Accessibility should be tested in the final application because custom colors, templates, labels, and surrounding controls can affect compliance.

## Built-in WAI-ARIA Support

TreeMap uses accessibility roles and labels for its rendered elements.

Built-in patterns include:

- `role="region"` for TreeMap areas without interactive selection or highlight behavior.
- `role="button"` for TreeMap areas with interactive behavior such as selection or highlighting.
- `aria-label` to provide accessible names for supported TreeMap content.

Accessible names are provided for elements such as:

- TreeMap title
- TreeMap subtitle
- Data labels
- Legend title
- Legend item labels

Do not overwrite generated accessibility attributes unless the replacement provides equivalent or better information.

## Keyboard Navigation Considerations

Keyboard navigation is not a generally applicable TreeMap feature in the same way that it is for controls such as menus, grids, or form elements.

Do not assume that every TreeMap leaf item is keyboard-operable.

When the application provides actions such as print, image export, or PDF export:

- Use native `<button>` elements.
- Provide visible focus indicators.
- Use meaningful button text.
- Keep the controls in a logical document order.
- Do not use clickable `<div>` or `<span>` elements as buttons.
- Communicate asynchronous results with a status region where appropriate.

Example:

```html
<div
  class="toolbar"
  role="group"
  aria-label="TreeMap actions"
>
  <button id="export-png" type="button">
    Export PNG
  </button>

  <button id="print" type="button">
    Print TreeMap
  </button>
</div>
```

## Screen Reader Support

TreeMap screen-reader support includes announcements for named and visible TreeMap elements.

## Accessible TreeMap Content

Screen readers can announce supported content such as:

- Data labels displayed on leaf items
- TreeMap title
- TreeMap subtitle
- Legend title
- Legend item labels

Use meaningful text for all these elements.

```typescript
const treemap: TreeMap = new TreeMap({
  titleSettings: {
    text: 'Product Sales by Category',
    subtitleSettings: {
      text: 'Rectangle size represents total sales'
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    labelFormat: '${Product}: ${Sales}'
  }
});
```

Do not use labels such as `Item 1`, `Value`, or `Data` when more descriptive text is available.

## Custom Accessible Description

Use the TreeMap `description` property to provide a meaningful description.

### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  description:
    'Product sales TreeMap grouped by category. ' +
    'Rectangle size represents total sales.',
  dataSource: data,
  weightValuePath: 'Sales',
  titleSettings: {
    text: 'Product Sales by Category'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  description:
    'Product sales TreeMap grouped by category. ' +
    'Rectangle size represents total sales.',
  dataSource: data,
  weightValuePath: 'Sales',
  titleSettings: {
    text: 'Product Sales by Category'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

A useful description should explain:

- What the TreeMap represents
- What rectangle size means
- What color means, when applicable
- The primary grouping used in the visualization

Avoid repeating the title without adding useful context.

## Accessible Surrounding Content

Essential information should not be available only through pointer-hover tooltips.

Provide a text summary, data table, or equivalent content when users need access to exact values.

```html
<section aria-labelledby="summary-heading">
  <h2 id="summary-heading">
    Product sales summary
  </h2>

  <ul>
    <li>Laptop: 15,000 sales</li>
    <li>Phone: 12,000 sales</li>
    <li>Tablet: 8,000 sales</li>
  </ul>
</section>
```

For larger datasets, an accessible data table may be more appropriate.

```html
<table>
  <caption>
    Product sales values represented by the TreeMap
  </caption>

  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Category</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <th scope="row">Laptop</th>
      <td>Electronics</td>
      <td>15,000</td>
    </tr>

    <tr>
      <th scope="row">Chair</th>
      <td>Furniture</td>
      <td>8,000</td>
    </tr>
  </tbody>
</table>
```

## Color Contrast Best Practices

The application controls the TreeMap fill colors, label colors, templates, and palette. These choices determine practical color contrast.

## Use High-Contrast Colors

Use light text on sufficiently dark fills or dark text on sufficiently light fills.

### TypeScript

```typescript
leafItemSettings: {
  labelPath: 'Product',
  fill: '#075985',
  labelStyle: {
    color: '#ffffff',
    fontWeight: '600'
  }
}
```

### JavaScript

```javascript
leafItemSettings: {
  labelPath: 'Product',
  fill: '#075985',
  labelStyle: {
    color: '#ffffff',
    fontWeight: '600'
  }
}
```

Also ensure that borders remain visible.

```typescript
leafItemSettings: {
  border: {
    color: '#ffffff',
    width: 2
  }
}
```

## Avoid Low-Contrast Combinations

Avoid similar foreground and background colors.

### Avoid

```typescript
leafItemSettings: {
  fill: '#0066dd',
  labelStyle: {
    color: '#0055cc'
  }
}
```

The label text can become difficult to distinguish from the item fill.

Also avoid relying on opacity to create contrast unless the final rendered result has been tested.

## Accessible Category Palette

Use category colors that remain distinguishable and support readable labels.

```typescript
const palette: string[] = [
  '#075985',
  '#166534',
  '#9a3412',
  '#6b21a8'
];
```

```javascript
var palette = [
  '#075985',
  '#166534',
  '#9a3412',
  '#6b21a8'
];
```

Apply the palette to the TreeMap.

```typescript
const treemap: TreeMap = new TreeMap({
  palette: palette,
  leafItemSettings: {
    labelPath: 'Product',
    labelStyle: {
      color: '#ffffff'
    }
  }
});
```

A color palette is not automatically accessible in every context. Validate the final color and text combinations.

## Do Not Rely Only on Color

When color represents categories, also provide:

- Text labels
- A legend
- Tooltip text
- Patterns or boundaries where practical
- A textual summary or data table

Example:

```typescript
const treemap: TreeMap = new TreeMap({
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    title: 'Product categories'
  },
  leafItemSettings: {
    labelPath: 'Product',
    labelFormat: '${Product}: ${Sales}',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#9a3412',
        label: 'Clothing'
      }
    ]
  }
});
```

## Complete Accessible TypeScript Example

The following example provides:

- A meaningful title and subtitle
- A TreeMap description
- High-contrast labels
- Category color mapping
- A visible legend
- Informative tooltips
- A text summary
- Native keyboard-accessible controls
- A screen-reader status region

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
    Accessible Product Sales TreeMap
  </title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
      background: #f8fafc;
      color: #111827;
      font-family: Arial, Helvetica, sans-serif;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1,
    h2 {
      color: #111827;
    }

    .intro {
      max-width: 72ch;
      line-height: 1.6;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 16px 0;
    }

    .toolbar button {
      min-height: 44px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: #dbeafe;
    }

    .toolbar button:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    #container {
      display: block;
      width: 100%;
      height: 520px;
      background: #ffffff;
    }

    table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
      background: #ffffff;
    }

    caption {
      padding: 8px;
      font-weight: 700;
      text-align: left;
    }

    th,
    td {
      padding: 10px;
      border: 1px solid #64748b;
      text-align: left;
    }

    thead {
      background: #e2e8f0;
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

    @media print {
      .toolbar,
      #action-status {
        display: none;
      }

      body {
        margin: 0;
        padding: 0;
      }

      #container {
        height: 520px;
      }
    }
  </style>
</head>
<body>
  <main>
    <h1>Product Sales by Category</h1>

    <p class="intro">
      This TreeMap compares product sales.
      Rectangle size represents sales value, and
      color identifies the product category.
    </p>

    <div
      class="toolbar"
      role="group"
      aria-label="TreeMap actions"
    >
      <button id="export-png" type="button">
        Export TreeMap as PNG
      </button>

      <button id="print" type="button">
        Print TreeMap
      </button>
    </div>

    <p
      id="action-status"
      class="visually-hidden"
      role="status"
      aria-live="polite"
    ></p>

    <div id="container"></div>

    <section aria-labelledby="data-heading">
      <h2 id="data-heading">
        Product sales data
      </h2>

      <table>
        <caption>
          Values represented in the product sales TreeMap
        </caption>

        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Sales</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">Laptop</th>
            <td>Electronics</td>
            <td>15,000</td>
          </tr>

          <tr>
            <th scope="row">Phone</th>
            <td>Electronics</td>
            <td>12,000</td>
          </tr>

          <tr>
            <th scope="row">Chair</th>
            <td>Furniture</td>
            <td>8,000</td>
          </tr>

          <tr>
            <th scope="row">Shirt</th>
            <td>Clothing</td>
            <td>5,000</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  TreeMap,
  TreeMapTooltip,
  TreeMapLegend,
  Print,
  ImageExport
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapTooltip,
  TreeMapLegend,
  Print,
  ImageExport
);

interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Phone',
    Sales: 12000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  },
  {
    Product: 'Shirt',
    Sales: 5000,
    Category: 'Clothing'
  }
];

const treemap: TreeMap = new TreeMap({
  allowPrint: true,
  allowImageExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  format: 'n0',
  useGroupingSeparator: true,
  tabIndex: 0,

  description:
    'Product sales TreeMap grouped by category. ' +
    'Rectangle size represents sales, and color ' +
    'identifies the product category.',

  titleSettings: {
    text: 'Product Sales by Category',
    subtitleSettings: {
      text:
        'Rectangle size represents total sales'
    },
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '18px',
      fontWeight: '700'
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 2
    },
    labelStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '13px',
      fontWeight: '600'
    },
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#9a3412',
        label: 'Clothing'
      }
    ]
  },

  tooltipSettings: {
    visible: true,
    format:
      'Product: ${Product}<br/>' +
      'Sales: ${Sales}<br/>' +
      'Category: ${Category}'
  },

  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product categories',
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '13px'
    }
  }
});

treemap.appendTo('#container');

function setActionStatus(message: string): void {
  const status: HTMLElement | null =
    document.getElementById('action-status');

  if (status) {
    status.textContent = message;
  }
}

const exportButton: HTMLElement | null =
  document.getElementById('export-png');

exportButton?.addEventListener('click', (): void => {
  treemap.export(
    'PNG',
    'accessible-product-sales-treemap'
  );

  setActionStatus('PNG export started.');
});

const printButton: HTMLElement | null =
  document.getElementById('print');

printButton?.addEventListener('click', (): void => {
  treemap.print();
  setActionStatus('Browser print dialog opened.');
});
```

## Complete Accessible JavaScript Example

The JavaScript example uses the Syncfusion EJ2 global namespace.

### index.js

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip,
  ej.treemap.TreeMapLegend,
  ej.treemap.Print,
  ej.treemap.ImageExport
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Phone',
    Sales: 12000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  },
  {
    Product: 'Shirt',
    Sales: 5000,
    Category: 'Clothing'
  }
];

var treemap = new ej.treemap.TreeMap({
  allowPrint: true,
  allowImageExport: true,
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  format: 'n0',
  useGroupingSeparator: true,
  tabIndex: 0,

  description:
    'Product sales TreeMap grouped by category. ' +
    'Rectangle size represents sales, and color ' +
    'identifies the product category.',

  titleSettings: {
    text: 'Product Sales by Category',
    subtitleSettings: {
      text:
        'Rectangle size represents total sales'
    },
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '18px',
      fontWeight: '700'
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 2
    },
    labelStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '13px',
      fontWeight: '600'
    },
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#9a3412',
        label: 'Clothing'
      }
    ]
  },

  tooltipSettings: {
    visible: true,
    format:
      'Product: ${Product}<br/>' +
      'Sales: ${Sales}<br/>' +
      'Category: ${Category}'
  },

  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product categories',
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '13px'
    }
  }
});

treemap.appendTo('#container');

function setActionStatus(message) {
  var status =
    document.getElementById('action-status');

  if (status) {
    status.textContent = message;
  }
}

var exportButton =
  document.getElementById('export-png');

if (exportButton) {
  exportButton.addEventListener(
    'click',
    function () {
      treemap.export(
        'PNG',
        'accessible-product-sales-treemap'
      );

      setActionStatus('PNG export started.');
    }
  );
}

var printButton =
  document.getElementById('print');

if (printButton) {
  printButton.addEventListener(
    'click',
    function () {
      treemap.print();

      setActionStatus(
        'Browser print dialog opened.'
      );
    }
  );
}
```

## Accessibility Checklist

Use the following checklist when implementing an accessible TreeMap:

- Provide a concise and meaningful TreeMap title.
- Use a subtitle when it adds important context.
- Set a descriptive `description` value.
- Use clear data labels.
- Include values in labels when exact values are important.
- Maintain sufficient contrast between labels and item fills.
- Use visible boundaries between adjacent items.
- Provide a legend when color represents categories or ranges.
- Do not use color as the only means of communicating meaning.
- Make essential tooltip information available through labels, a summary, or a data table.
- Use native buttons for print and export actions.
- Give every button a clear accessible name.
- Preserve visible focus indicators.
- Keep focus order logical.
- Use a live status region for asynchronous export feedback where needed.
- Use explicit alternate text for exported image previews.
- Hide nonessential controls in print-specific CSS.
- Test print output in both color and grayscale.
- Test the final application with browser accessibility tools.
- Test with a screen reader.
- Test with keyboard-only navigation.
- Recheck accessibility after adding custom label or tooltip templates.

## Testing for Accessibility

Accessibility testing should include automated inspection and manual evaluation.

## Browser Development Tools

Use the browser accessibility inspector to verify:

- Accessible roles
- Accessible names
- `aria-label` values
- Heading structure
- Button names
- Focus order
- Visible focus indication
- Text contrast
- Color contrast
- Hidden content
- Status announcements

Inspect both the TreeMap and the surrounding page controls.

## Automated Accessibility Testing

Use accessibility testing tools to identify common issues such as:

- Missing accessible names
- Insufficient color contrast
- Invalid ARIA attributes
- Incorrect heading order
- Empty buttons
- Focusable hidden content
- Duplicate IDs

Automated testing does not replace manual testing. It cannot determine whether a title, description, or label is meaningful in the application context.

## Screen Reader Testing

Test with a screen reader supported by the target environment.

A practical test flow is:

1. Navigate to the page heading.
2. Read the TreeMap introduction or description.
3. Confirm that the TreeMap title is announced.
4. Confirm that visible data labels are meaningful.
5. Confirm that the legend title is announced.
6. Confirm that legend item labels are understandable.
7. Confirm that export and print buttons have clear names.
8. Activate each toolbar button using the keyboard.
9. Confirm that status messages are announced.
10. Confirm that essential values are available outside pointer-only tooltips.
11. Read the alternative data table or textual summary.
12. Verify that the exported preview has useful alternate text.

## Print and Export Testing

Test print and export behavior separately from on-screen accessibility.

For print:

- Confirm that labels remain readable.
- Confirm that important content is not clipped.
- Confirm that toolbar buttons are hidden if not required.
- Test portrait and landscape print modes.
- Test grayscale output.
- Confirm that the printed TreeMap still communicates categories without relying only on color.

For exports:

- Open each exported file.
- Confirm that titles and labels are visible.
- Confirm that the correct file name is used.
- Confirm that SVG output scales correctly.
- Confirm that PNG and JPEG output are readable.
- Confirm that PDF orientation is appropriate.
- Confirm that custom templates and external images appear correctly.
- Confirm that Base64 output can be assigned to an image preview.

## Troubleshooting

### Print Button Does Nothing

Confirm that `Print` is imported and injected.

```typescript
import {
  TreeMap,
  Print
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(Print);
```

Enable printing.

```typescript
const treemap: TreeMap = new TreeMap({
  allowPrint: true
});
```

Call `print()` after the TreeMap has been created.

```typescript
treemap.print();
```

For JavaScript:

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.Print
);
```

Also confirm that the event handler is attached after the button exists in the document.

### Image Export Does Not Work

Confirm that `ImageExport` is imported and injected.

```typescript
import {
  TreeMap,
  ImageExport
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(ImageExport);
```

Enable image export.

```typescript
const treemap: TreeMap = new TreeMap({
  allowImageExport: true
});
```

Use a supported format.

```typescript
treemap.export(
  'PNG',
  'treemap'
);
```

```typescript
treemap.export(
  'JPEG',
  'treemap'
);
```

```typescript
treemap.export(
  'SVG',
  'treemap'
);
```

### PDF Export Does Not Work

Confirm that `PdfExport` is imported and injected.

```typescript
import {
  TreeMap,
  PdfExport
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(PdfExport);
```

Enable PDF export.

```typescript
const treemap: TreeMap = new TreeMap({
  allowPdfExport: true
});
```

Export using the `PDF` type.

```typescript
treemap.export(
  'PDF',
  'treemap'
);
```

If orientation is used, import it from the PDF export package.

```typescript
import {
  PdfPageOrientation
} from '@syncfusion/ej2-pdf-export';
```

```typescript
treemap.export(
  'PDF',
  'treemap',
  PdfPageOrientation.Landscape
);
```

### Base64 Export Returns No Usable Value

Confirm that:

1. The `ImageExport` module is injected.
2. `allowImageExport` is enabled.
3. The TreeMap has completed rendering.
4. PNG or JPEG is used.
5. `allowDownload` is set to `false`.
6. The returned promise is awaited.

```typescript
async function exportBase64(): Promise<void> {
  const result: string = await treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  console.log(result);
}
```

Do not call the method before the TreeMap instance is created.

### Exported File Is Empty

Confirm that:

- The TreeMap container has a nonzero width and height.
- The data source contains valid values.
- `weightValuePath` points to a numeric field.
- The TreeMap is visible when export begins.
- No earlier JavaScript error has interrupted rendering.
- External images used in templates are accessible.
- Cross-origin image restrictions are not blocking export.

```css
#container {
  width: 100%;
  height: 520px;
}
```

### Exported Template Images Are Missing

Externally hosted images can be affected by browser cross-origin restrictions.

Confirm that:

- The image URL is valid.
- The image server permits cross-origin access where required.
- The image loads before export is started.
- The image path is correct in the deployed application.
- The image is served over a compatible protocol.

Prefer application-controlled image assets when consistent export output is required.

### PDF Content Is Clipped

Use landscape orientation for wide TreeMaps.

```typescript
treemap.export(
  'PDF',
  'treemap',
  PdfPageOrientation.Landscape
);
```

Also consider:

- Reducing the TreeMap width.
- Increasing label wrapping.
- Shortening labels.
- Reducing title size.
- Testing with a more suitable container aspect ratio.

### Print Output Is Clipped

Add print-specific CSS.

```css
@media print {
  body {
    margin: 0;
    padding: 0;
  }

  #container {
    width: 100%;
    height: 520px;
  }
}
```

Hide surrounding controls.

```css
@media print {
  .toolbar {
    display: none;
  }
}
```

If clipping continues, test landscape mode in the browser print settings.

### Screen Reader Output Is Unclear

Provide a meaningful title and description.

```typescript
const treemap: TreeMap = new TreeMap({
  description:
    'Product sales TreeMap grouped by category. ' +
    'Rectangle size represents total sales.',
  titleSettings: {
    text: 'Product Sales by Category'
  }
});
```

Use clear labels.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  labelFormat: '${Product}: ${Sales}'
}
```

Provide a legend when colors represent categories.

```typescript
legendSettings: {
  visible: true,
  title: 'Product categories'
}
```

Provide a text summary or table when exact values are important.

### Tooltip Information Is Not Available to All Users

Do not place essential information only in a pointer-hover tooltip.

Include important values in labels where space permits.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  labelFormat: '${Product}: ${Sales}'
}
```

Alternatively, provide a textual summary or data table adjacent to the TreeMap.

### Export Buttons Are Not Keyboard Accessible

Use native `<button>` elements.

```html
<button id="export-png" type="button">
  Export TreeMap as PNG
</button>
```

Do not use an unmodified `<div>` as a button.

```html
<!-- Avoid -->
<div id="export-png">
  Export PNG
</div>
```

Provide a visible focus indicator.

```css
button:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}
```

### Color Contrast Is Insufficient

Use a darker fill with light label text.

```typescript
leafItemSettings: {
  fill: '#075985',
  labelStyle: {
    color: '#ffffff'
  }
}
```

Test every item color separately when a palette or color mapping is used.

### TreeMap Is Not Visible

Confirm that the container exists.

```html
<div id="container"></div>
```

Give it a visible size.

```css
#container {
  width: 100%;
  height: 520px;
}
```

Create the TreeMap and append it using the correct selector.

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales'
});

treemap.appendTo('#container');
```

Also verify that the required Syncfusion EJ2 scripts, styles, and package versions are configured correctly.