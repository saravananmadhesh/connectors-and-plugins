# Export & Print

- #overview
- #supported-export-formats
- #required-modules
- #image-export
  - #png-export
  - #jpeg-export
  - #svg-export
  - #returning-an-image-as-base64
- #pdf-export
  - #portrait-pdf
  - #landscape-pdf
- #print
- #complete-typescript-example
- #complete-javascript-example
- #exporting-annotations
- #export-timing
- #filename-handling
- #runtime-validation-checklist
- #combined-mistakes-and-future-references

## Overview

The Syncfusion Circular Gauge supports:

```text
PNG export
JPEG export
SVG export
PDF export
Browser printing
```

Use export and print when:

- A gauge must be included in a report.
- Users need a downloadable snapshot.
- The visualization must be archived.
- A gauge must be shared outside the application.
- A scalable graphic is required.
- The rendered gauge must be printed.

Image export, PDF export, and printing are separate features. Each feature requires its corresponding module and gauge-level enablement property.

```text
Image export -> ImageExport + allowImageExport
PDF export   -> PdfExport + allowPdfExport
Print        -> Print + allowPrint
```

Image export supports JPEG, PNG, and SVG. PDF export uses the same public `export` method with `PDF` as the export type. Printing uses the public `print` method.

## Supported Export Formats

### PNG

PNG is a raster image format.

Use PNG when:

- The gauge is included in a presentation.
- A screenshot-style image is required.
- The exported image must preserve sharp text at its original dimensions.
- The image will be used in reports, documents, or web pages.

```typescript
gauge.export(
    'PNG',
    'performance-gauge'
);
```

### JPEG

JPEG is a raster image format.

Use JPEG when:

- A smaller raster file is preferred.
- Transparency is not required.
- The gauge will be shared as a standard image.

```typescript
gauge.export(
    'JPEG',
    'performance-gauge'
);
```

### SVG

SVG is a vector image format.

Use SVG when:

- The gauge must scale without losing quality.
- The exported output will be used on the web.
- The image may be edited in vector-graphics software.
- High-resolution printing is required.

```typescript
gauge.export(
    'SVG',
    'performance-gauge'
);
```

### PDF

PDF is a document format.

Use PDF when:

- The gauge is part of a formal report.
- The output must be archived.
- Page orientation must be controlled.
- The visualization must be printed or shared as a document.

```typescript
gauge.export(
    'PDF',
    'performance-gauge',
    'Landscape'
);
```

## Required Modules

### Image Export Module

Import and inject `ImageExport` when exporting PNG, JPEG, or SVG.

```typescript
import {
    CircularGauge,
    ImageExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(ImageExport);
```

Enable image export in the gauge:

```typescript
allowImageExport: true
```

Complete requirement:

```typescript
import {
    CircularGauge,
    ImageExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(ImageExport);

const gauge: CircularGauge =
    new CircularGauge({
        allowImageExport: true,

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### PDF Export Module

Import and inject `PdfExport` when exporting PDF.

```typescript
import {
    CircularGauge,
    PdfExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(PdfExport);
```

Enable PDF export:

```typescript
allowPdfExport: true
```

Complete requirement:

```typescript
import {
    CircularGauge,
    PdfExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(PdfExport);

const gauge: CircularGauge =
    new CircularGauge({
        allowPdfExport: true,

        axes[{
: 65
.appendTo('#gauge');
 Export          value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Print Module

Import and inject `Print` when printing the gauge.

```typescript
import {
    CircularGauge,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Print);
```

Enable printing:

```typescript
allowPrint: true
```

Complete requirement:

```typescript
import {
    CircularGauge,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Print);

const gauge: CircularGauge =
    new CircularGauge({
        allowPrint: true,

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

### Complete Module Injection

Use the following configuration when image export, PDF export, and printing are all required:

```typescript
import {
    CircularGauge,
    ImageExport,
    PdfExport,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    ImageExport,
    PdfExport,
    Print
);
```

Enable all three features:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        allowImageExport: true,
        allowPdfExport: true,
        allowPrint: true,

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

## Image Export

### Export Method

Image export uses the public `export` method.

Basic signature:

```typescript
gauge.export(
    type,
    fileName
);
```

Extended image-export usage:

```typescript
gauge.export(
    type,
    fileName,
    null,
    allowDownload
);
```

Parameters:

```text
type          -> PNG, JPEG, or SVG.
fileName      -> Desired exported file name.
orientation   -> Not required for image export. Pass null when the fourth argument is used.
allowDownload -> true downloads the file; false returns exported image data.
```

The default value of `allowDownload` is `true`. When it is `false`, image export can return image data instead of automatically downloading the file.

### PNG Export

Required HTML:

```html
<button id="exportPngButton" type="button">
    Export PNG
</button>

<div id="gauge"></div>
```

#### TypeScript

```typescript
import {
    CircularGauge,
    ImageExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(ImageExport);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        allowImageExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

const exportPngButton: HTMLElement | null =
    document.getElementById(
        'exportPngButton'
    );

if (exportPngButton) {
    exportPngButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'PNG',
                'performance-gauge'
            );
        }
    );
}
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        allowImageExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

var exportPngButton =
    document.getElementById(
        'exportPngButton'
    );

if (exportPngButton) {
    exportPngButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'PNG',
                'performance-gauge'
            );
        }
    );
}
```

### JPEG Export

Required HTML:

```html
<button id="exportJpegButton" type="button">
    Export JPEG
</button>

<div id="gauge"></div>
```

#### TypeScript

```typescript
import {
    CircularGauge,
    ImageExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(ImageExport);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        allowImageExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

const exportJpegButton: HTMLElement | null =
    document.getElementById(
        'exportJpegButton'
    );

if (exportJpegButton) {
    exportJpegButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'JPEG',
                'performance-gauge'
            );
        }
    );
}
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        allowImageExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

var exportJpegButton =
    document.getElementById(
        'exportJpegButton'
    );

if (exportJpegButton) {
    exportJpegButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'JPEG',
                'performance-gauge'
            );
        }
    );
}
```

### SVG Export

Required HTML:

```html
<button id="exportSvgButton" type="button">
    Export SVG
</button>

<div id="gauge"></div>
```

#### TypeScript

```typescript
import {
    CircularGauge,
    ImageExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(ImageExport);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        allowImageExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

const exportSvgButton: HTMLElement | null =
    document.getElementById(
        'exportSvgButton'
    );

if (exportSvgButton) {
    exportSvgButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'SVG',
                'performance-gauge'
            );
        }
    );
}
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        allowImageExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

var exportSvgButton =
    document.getElementById(
        'exportSvgButton'
    );

if (exportSvgButton) {
    exportSvgButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'SVG',
                'performance-gauge'
            );
        }
    );
}
```

### Returning an Image as Base64

Set `allowDownload` to `false` when the application needs exported image data instead of an automatic file download.

The orientation parameter is not used for image export, so pass `null`.

#### TypeScript

```typescript
const exportGaugeAsBase64 =
    async (): Promise<void> => {
        const result: string =
            await gauge.export(
                'PNG',
                'performance-gauge',
                null,
                false
            );

        console.log(result);
    };
```

#### JavaScript

```javascript
function exportGaugeAsBase64() {
    gauge.export(
        'PNG',
        'performance-gauge',
        null,
        false
    ).then(function (result) {
        console.log(result);
    });
}
```

This pattern is useful when:

- Previewing the exported image.
- Sending the image to an application service.
- Embedding the image in another document.
- Storing the image in application state.

Do not assume that SVG export returns the same data representation as PNG or JPEG. Validate the returned type for the selected format and installed EJ2 version.

## PDF Export

### Purpose

PDF export creates a document containing the rendered Circular Gauge.

PDF export requires:

```text
PdfExport module
allowPdfExport: true
PDF export type
A file name
Optional page orientation
```

### Portrait PDF

Required HTML:

```html
<button id="exportPortraitButton" type="button">
    Export Portrait PDF
</button>

<div id="gauge"></div>
```

#### TypeScript

```typescript
import {
    CircularGauge,
    PdfExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(PdfExport);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        allowPdfExport: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

const exportPortraitButton:
    HTMLElement | null =
        document.getElementById(
            'exportPortraitButton'
        );

if (exportPortraitButton) {
    exportPortraitButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'PDF',
                'performance-gauge',
                'Portrait'
            );
        }
    );
}
```

#### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        allowPdfExport: true,

        axes[{
: 65,
: 'Needle'
imum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

var exportPortraitButton =
    document.getElementById(
        'exportPortraitButton'
    );

if (exportPortraitButton) {
    exportPortraitButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'PDF',
                'performance-gauge',
                'Portrait'
            );
        }
    );
}
```

### Landscape PDF

```typescript
gauge.export(
    'PDF',
    'performance-gauge',
    'Landscape'
);
```

Use landscape orientation when:

- The gauge is wide.
- Multiple visual elements must fit horizontally.
- A semi-circular gauge uses a wide layout.
- The output is intended for a landscape report.

Use portrait orientation when:

- The gauge is compact.
- The report follows a standard vertical page layout.
- Additional report content will appear above or below the gauge.

## Print

### Purpose

The `print()` method opens the browser print workflow for the rendered Circular Gauge.

Printing requires:

```text
Print module
allowPrint: true
A rendered Circular Gauge
A call to gauge.print()
```

The browser print dialog controls:

- Printer selection.
- Paper size.
- Page orientation.
- Margins.
- Scaling.
- Destination file.
- Other browser-supported print settings.

The print operation does not silently print without user interaction.

### Complete TypeScript Print Example

Required HTML:

```html
<button id="printButton" type="button">
    Print Gauge
</button>

<div id="gauge"></div>
```

TypeScript:

```typescript
import {
    CircularGauge,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(Print);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        allowPrint: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

const printButton: HTMLElement | null =
    document.getElementById(
        'printButton'
    );

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            gauge.print();
        }
    );
}
```

### Complete JavaScript Print Example

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        allowPrint: true,

        axes: [{
            minimum: 0,
            maximum: 100,

            pointers: [{
                value: 65,
                type: 'Needle'
            }]
        }]
    });

gauge.appendTo('#gauge');

var printButton =
    document.getElementById(
        'printButton'
    );

if (printButton) {
    printButton.addEventListener(
        'click',
        function () {
            gauge.print();
        }
    );
}
```

### Print Styling

Use print CSS to hide export buttons and optimize the gauge layout.

```css
.gauge-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

@media print {
    .gauge-actions {
        display: none;
    }

    .gauge-wrapper {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
        border: 0;
    }
}
```

Example HTML:

```html
<div class="gauge-actions">
    <button id="printButton" type="button">
        Print Gauge
    </button>
</div>

<div class="gauge-wrapper">
    <div id="gauge"></div>
</div>
```

## Complete TypeScript Example

### Required HTML

```html
<div class="gauge-actions">
    <button id="exportPngButton" type="button">
        Export PNG
    </button>

    <button id="exportJpegButton" type="button">
        Export JPEG
    </button>

    <button id="exportSvgButton" type="button">
        Export SVG
    </button>

    <button id="exportPdfButton" type="button">
        Export PDF
    </button>

    <button id="printButton" type="button">
        Print
    </button>
</div>

<div class="gauge-wrapper">
    <div id="gauge"></div>
</div>
```

### Required CSS

```css
.gauge-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
}

.gauge-actions button {
    padding: 8px 14px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    background: #ffffff;
    cursor: pointer;
}

.gauge-wrapper {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    box-sizing: border-box;
}

@media print {
    .gauge-actions {
        display: none;
    }

    .gauge-wrapper {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
        border: 0;
    }
}
```

### TypeScript

```typescript
import {
    CircularGauge,
    ImageExport,
    PdfExport,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    ImageExport,
    PdfExport,
    Print
);

const gauge: CircularGauge =
    new CircularGauge({
        width: '100%',
        height: '450px',
        title: 'Performance Gauge',
        allowImageExport: true,
        allowPdfExport: true,
        allowPrint: true,

        titleStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Bold',
            size: '18px',
            color: '#333333'
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            lineStyle: {
                width: 2,
                color: '#666666'
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                color: '#333333',
                position: 'Inside'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                color: '#777777',
                position: 'Inside'
            },

            labelStyle: {
                position: 'Inside',

                font: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: 'Normal',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#d13438',
                    startWidth: 10,
                    endWidth: 10,
                    radius: '95%'
                },
                {
                    start: 40,
                    end: 70,
                    color: '#ffb900',
                    startWidth: 10,
                    endWidth: 10,
                    radius: '95%'
                },
                {
                    start: 70,
                    end: 100,
                    color: '#107c10',
                    startWidth: 10,
                    endWidth: 10,
                    radius: '95%'
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 10,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#0066cc'
                },

                animation: {
                    enable: true,
                    duration: 1000
                }
            }]
        }]
    });

gauge.appendTo('#gauge');

const exportPngButton: HTMLElement | null =
    document.getElementById(
        'exportPngButton'
    );

const exportJpegButton: HTMLElement | null =
    document.getElementById(
        'exportJpegButton'
    );

const exportSvgButton: HTMLElement | null =
    document.getElementById(
        'exportSvgButton'
    );

const exportPdfButton: HTMLElement | null =
    document.getElementById(
        'exportPdfButton'
    );

const printButton: HTMLElement | null =
    document.getElementById(
        'printButton'
    );

if (exportPngButton) {
    exportPngButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'PNG',
                'performance-gauge'
            );
        }
    );
}

if (exportJpegButton) {
    exportJpegButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'JPEG',
                'performance-gauge'
            );
        }
    );
}

if (exportSvgButton) {
    exportSvgButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'SVG',
                'performance-gauge'
            );
        }
    );
}

if (exportPdfButton) {
    exportPdfButton.addEventListener(
        'click',
        (): void => {
            gauge.export(
                'PDF',
                'performance-gauge',
                'Landscape'
            );
        }
    );
}

if (printButton) {
    printButton.addEventListener(
        'click',
        (): void => {
            gauge.print();
        }
    );
}
```

## Complete JavaScript Example

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    />

    <title>Circular Gauge Export and Print</title>

        <script src="https://cdn.syncfusion.com/ej2/34.2.2/dist/ej2.min.js"></script>

    <style>
        .gauge-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 16px;
        }

        .gauge-actions button {
            padding: 8px 14px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            background: #ffffff;
            cursor: pointer;
        }

        .gauge-wrapper {
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
            padding: 16px;
            background: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-sizing: border-box;
        }

        @media print {
            .gauge-actions {
                display: none;
            }

            .gauge-wrapper {
                width: 100%;
                max-width: none;
                margin: 0;
                padding: 0;
                border: 0;
            }
        }
    </style>
</head>
<body>
    <div class="gauge-actions">
        <button id="exportPngButton" type="button">
            Export PNG
        </button>

        <button id="exportJpegButton" type="button">
            Export JPEG
        </button>

        <button id="exportSvgButton" type="button">
            Export SVG
        </button>

        <button id="exportPdfButton" type="button">
            Export PDF
        </button>

        <button id="printButton" type="button">
            Print
        </button>
    </div>

    <div class="gauge-wrapper">
        <div id="gauge"></div>
    </div>

    <script src="index.js"></script>
</body>
</html>
```

### JavaScript

```javascript
var gauge =
    new ej.circulargauge.CircularGauge({
        width: '100%',
        height: '450px',
        title: 'Performance Gauge',
        allowImageExport: true,
        allowPdfExport: true,
        allowPrint: true,

        titleStyle: {
            fontFamily: 'Segoe UI',
            fontStyle: 'Normal',
            fontWeight: 'Bold',
            size: '18px',
            color: '#333333'
        },

        axes: [{
            minimum: 0,
            maximum: 100,
            startAngle: 230,
            endAngle: 130,
            radius: '90%',

            lineStyle: {
                width: 2,
                color: '#666666'
            },

            majorTicks: {
                interval: 20,
                width: 2,
                height: 10,
                color: '#333333',
                position: 'Inside'
            },

            minorTicks: {
                interval: 5,
                width: 1,
                height: 5,
                color: '#777777',
                position: 'Inside'
            },

            labelStyle: {
                position: 'Inside',

                font: {
                    fontFamily: 'Segoe UI',
                    fontStyle: 'Normal',
                    fontWeight: 'Normal',
                    size: '12px',
                    color: '#333333'
                }
            },

            ranges: [
                {
                    start: 0,
                    end: 40,
                    color: '#d13438',
                    startWidth: 10,
                    endWidth: 10,
                    radius: '95%'
                },
                {
                    start: 40,
                    end: 70,
                    color: '#ffb900',
                    startWidth: 10,
                    endWidth: 10,
                    radius: '95%'
                },
                {
                    start: 70,
                    end: 100,
                    color: '#107c10',
                    startWidth: 10,
                    endWidth: 10,
                    radius: '95%'
                }
            ],

            pointers: [{
                value: 65,
                type: 'Needle',
                radius: '75%',
                pointerWidth: 8,
                color: '#0066cc',

                cap: {
                    radius: 10,
                    color: '#0066cc',

                    border: {
                        width: 2,
                        color: '#333333'
                    }
                },

                needleTail: {
                    length: '20%',
                    color: '#0066cc'
                },

                animation: {
                    enable: true,
                    duration: 1000
                }
            }]
        }]
    });

gauge.appendTo('#gauge');

var exportPngButton =
    document.getElementById(
        'exportPngButton'
    );

var exportJpegButton =
    document.getElementById(
        'exportJpegButton'
    );

var exportSvgButton =
    document.getElementById(
        'exportSvgButton'
    );

var exportPdfButton =
    document.getElementById(
        'exportPdfButton'
    );

var printButton =
    document.getElementById(
        'printButton'
    );

if (exportPngButton) {
    exportPngButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'PNG',
                'performance-gauge'
            );
        }
    );
}

if (exportJpegButton) {
    exportJpegButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'JPEG',
                'performance-gauge'
            );
        }
    );
}

if (exportSvgButton) {
    exportSvgButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'SVG',
                'performance-gauge'
            );
        }
    );
}

if (exportPdfButton) {
    exportPdfButton.addEventListener(
        'click',
        function () {
            gauge.export(
                'PDF',
                'performance-gauge',
                'Landscape'
            );
        }
    );
}

if (printButton) {
    printButton.addEventListener(
        'click',
        function () {
            gauge.print();
        }
    );
}
```

## Exporting Annotations

Circular Gauge annotations can contain HTML, text, images, and other custom elements.

Annotations may require special handling during image or PDF export because the gauge is SVG-based while annotation content can be rendered as HTML or `foreignObject` content. Browser support and export behavior can vary.

Before relying on annotation export:

```text
1. Test the exported output in each required format.
2. Test the target browsers.
3. Verify external images and fonts.
4. Confirm that annotation content appears in PNG, JPEG, SVG, and PDF.
5. Use a specialized conversion workflow when normal export omits HTML annotations.
```

Do not promise that every arbitrary HTML annotation will automatically appear in every export format.

## Export Timing

Export only after the gauge has completed rendering.

A safe pattern is to enable export buttons after the `loaded` event.

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        allowImageExport: true,

        loaded: (): void => {
            const exportButton:
                HTMLButtonElement | null =
                    document.getElementById(
                        'exportPngButton'
                    ) as HTMLButtonElement | null;

            if (exportButton) {
                exportButton.disabled = false;
            }
        },

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });

gauge.appendTo('#gauge');
```

Required HTML:

```html
<button
    id="exportPngButton"
    type="button"
    disabled
>
    Export PNG
</button>
```

When the pointer value changes before export, update the gauge first:

```typescript
gauge.setPointerValue(
    0,
    0,
    85
);
```

Export after the visual state reflects the updated value.

## Filename Handling

Use a file name without manually appending a format-specific extension.

Preferred:

```typescript
gauge.export(
    'PNG',
    'performance-gauge'
);
```

Avoid:

```typescript
gauge.export(
    'PNG',
    'performance-gauge.png'
);
```

Use a sanitized file name when it is created from user or business data.

```typescript
const sanitizeFileName = (
    fileName: string
): string => {
    return fileName.replace(
        /[^a-zA-Z0-9-_]/g,
        '_'
    );
};

const fileName: string =
    sanitizeFileName(
        'Performance Gauge: August 2026'
    );

gauge.export(
    'PNG',
    fileName
);
```

Result:

```text
Performance_Gauge__August_2026
```

## Runtime Validation Checklist

```text
✅ CircularGauge is imported in TypeScript.
✅ ImageExport is imported and injected for PNG, JPEG, and SVG.
✅ PdfExport is imported and injected for PDF.
✅ Print is imported and injected for printing.
✅ allowImageExport is true for image export.
✅ allowPdfExport is true for PDF export.
✅ allowPrint is true for printing.
✅ The global EJ2 bundle loads before JavaScript application code.
✅ The gauge host element exists.
✅ gauge.appendTo('#gauge') is called.
✅ PNG, JPEG, or SVG is used for image export.
✅ PDF is used for document export.
✅ Image export does not receive PDF-only orientation unnecessarily.
✅ null is passed for image orientation when allowDownload is supplied.
✅ allowDownload is false only when returned image data is required.
✅ PDF orientation is Portrait or Landscape.
✅ The file name is valid and sanitized.
✅ The gauge has completed rendering before export.
✅ The pointer displays the intended value before export.
✅ Annotation export behavior is tested when annotations are used.
✅ External images and custom fonts are available before export.
✅ Print controls are hidden through print CSS when required.
✅ No editor-generated HTML exists inside executable code.
✅ TypeScript and JavaScript examples provide equivalent behavior.
```

## Combined Mistakes and Future References

### Missing Feature Enablement

Incorrect:

```typescript
CircularGauge.Inject(
    ImageExport
);

const gauge =
    new CircularGauge({
        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });
```

Correct:

```typescript
CircularGauge.Inject(
    ImageExport
);

const gauge: CircularGauge =
    new CircularGauge({
        allowImageExport: true,

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });
```

Module injection and feature enablement are both required for the documented export workflow.

### Incorrect Width and Height Parameters

Avoid unsupported assumptions such as:

```typescript
gauge.export(
    'PNG',
    'gauge',
    'Landscape',
    800,
    600
);
```

The fourth parameter in the documented image-export workflow controls downloading, not export width.

Use:

```typescript
gauge.export(
    'PNG',
    'gauge'
);
```

Or return image data:

```typescript
gauge.export(
    'PNG',
    'gauge',
    null,
    false
);
```

Control the rendered gauge dimensions before export:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        width: '800px',
        height: '600px',
        allowImageExport: true,

        axes: [{
            pointers: [{
                value: 65
            }]
        }]
    });
```

### Incorrect High-Resolution Export Assumption

Avoid:

```typescript
gauge.export(
    'PNG',
    'gauge-hires',
    'Landscape',
    width * 2,
    height * 2
);
```

Do not treat export arguments as arbitrary output dimensions.

For scalable output, prefer:

```typescript
gauge.export(
    'SVG',
    'gauge'
);
```

For larger raster output, render the gauge at validated larger dimensions before exporting.

### Missing Image Export Module

Incorrect:

```typescript
import {
    CircularGauge
} from '@syncfusion/ej2-circulargauge';

gauge.export(
    'PNG',
    'gauge'
);
```

Correct:

```typescript
import {
    CircularGauge,
    ImageExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    ImageExport
);
```

Also enable:

```typescript
allowImageExport: true
```

### Missing PDF Export Module

Incorrect:

```typescript
gauge.export(
    'PDF',
    'gauge'
);
```

without importing and injecting `PdfExport`.

Correct:

```typescript
import {
    CircularGauge,
    PdfExport
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    PdfExport
);
```

Also enable:

```typescript
allowPdfExport: true
```

### Missing Print Module

Incorrect:

```typescript
gauge.print();
```

without importing and injecting `Print`.

Correct:

```typescript
import {
    CircularGauge,
    Print
} from '@syncfusion/ej2-circulargauge';

CircularGauge.Inject(
    Print
);
```

Also enable:

```typescript
allowPrint: true
```

### Missing JPEG Format

Do not document image export as supporting only PNG and SVG.

Supported image types include:

```text
PNG
JPEG
SVG
```



### Incorrect Claim About Silent Printing

Incorrect:

```text
gauge.print() prints directly without a dialog.
```

Correct:

```text
gauge.print() opens the browser print workflow.
The browser and operating system control the print dialog.
```

### Incorrect PDF Orientation for Image Export

Avoid:

```typescript
gauge.export(
    'PNG',
    'gauge',
    'Landscape'
);
```

PDF orientation is not required for image export.

Use:

```typescript
gauge.export(
    'PNG',
    'gauge'
);
```

When using the fourth image-export argument:

```typescript
gauge.export(
    'PNG',
    'gauge',
    null,
    false
);
```

### Exporting Before Rendering

Avoid calling export immediately before the gauge is attached.

Incorrect:

```typescript
const gauge =
    new CircularGauge({
        allowImageExport: true
    });

gauge.export(
    'PNG',
    'gauge'
);

gauge.appendTo('#gauge');
```

Correct:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        allowImageExport: true
    });

gauge.appendTo('#gauge');

gauge.export(
    'PNG',
    'gauge'
);
```

In user-facing applications, call export from a button after rendering completes.

### Constructor Selector Pattern

Avoid:

```typescript
const gauge =
    new CircularGauge({
        axes: []
    }, '#gauge');
```

Preferred:

```typescript
const gauge: CircularGauge =
    new CircularGauge({
        axes: []
    });

gauge.appendTo('#gauge');
```

### Missing Host Element

Required HTML:

```html
<div id="gauge"></div>
```

Required attachment:

```typescript
gauge.appendTo('#gauge');
```

The host ID and selector must match exactly.

### Encoded Executable HTML

Incorrect:

```html
<button id="printButton">
    Print
</button>
```

Correct:

```html
<button id="printButton" type="button">
    Print
</button>
```

### Editor-Generated Markup

Do not place the following inside executable HTML, TypeScript, JavaScript, imports, filenames, or CDN URLs:

```text
<a>
<strong>
<br>
data-lexical-text
Editor-generated class names
```