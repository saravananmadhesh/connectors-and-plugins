# Getting Started with Barcode Generators

Learn to install, configure, and create your first barcode, QR code, or Data Matrix code in your JavaScript application.

---

## Installation

Install the Syncfusion barcode generator package from npm:

```bash
npm install @syncfusion/ej2-barcode-generator
```

### Dependencies

The barcode library depends on:

```
@syncfusion/ej2-barcode-generator
├── @syncfusion/ej2-base
└── @syncfusion/ej2-data
```

These are installed automatically with the main package.

---

## Project Setup

### Clone the Quickstart Repository

For a pre-configured project:

```bash
git clone https://github.com/syncfusion/ej2-quickstart.git quickstart
cd quickstart
npm install
```

This sets up a complete development environment with System.js configuration.

---

## System.js Configuration

If using System.js (not a bundler), configure `system.config.js`:

```javascript
System.config({
    paths: {
        'syncfusion:': './node_modules/@syncfusion/',
    },
    map: {
        app: 'app',
        '@syncfusion/ej2-base': 'syncfusion:ej2-base/dist/ej2-base.umd.min.js',
        '@syncfusion/ej2-data': 'syncfusion:ej2-data/dist/ej2-data.umd.min.js',
        '@syncfusion/ej2-barcode-generator': 'syncfusion:ej2-barcode-generator/dist/ej2-barcode-generator.umd.min.js',
        '@syncfusion/ej2-pdf-export': 'syncfusion:ej2-pdf-export/dist/ej2-pdf-export.umd.min.js',
        '@syncfusion/ej2-excel-export': 'syncfusion:ej2-excel-export/dist/ej2-excel-export.umd.min.js'
    },
    packages: {
        'app': { main: 'app', defaultExtension: 'js' }
    }
});

System.import('app');
```

---

## CSS Styling

Add the Syncfusion CSS to your `src/styles/styles.css`:

```css
@import '../../node_modules/@syncfusion/ej2/material.css';
```

Or use specific theme files:
- `ej2-bootstrap.css`
- `ej2-bootstrap4.css`
- `ej2-fabric.css`
- `ej2-highcontrast.css`
- `ej2-material.css`
- `ej2-tailwind.css`

Reference in HTML:

```html
<link href="node_modules/@syncfusion/ej2/material.css" rel="stylesheet" />
```

---

## HTML Setup

Create a div element where the barcode will render:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Barcode Demo</title>
    <link href="node_modules/@syncfusion/ej2/material.css" rel="stylesheet" />
</head>
<body>
    <div id="barcode"></div>
    <div id="qrcode"></div>
    <div id="datamatrix"></div>
    
    <!-- System JS configuration -->
    <script src="node_modules/systemjs/dist/system.src.js" type="text/javascript"></script>
    <script src="system.config.js" type="text/javascript"></script>
</body>
</html>
```

---

## Creating Your First Barcode

TypeScript/JavaScript:

```typescript
import { BarcodeGenerator } from '@syncfusion/ej2-barcode-generator';

const barcode = new BarcodeGenerator({
    width: '200px',
    height: '150px',
    mode: 'SVG',
    type: 'Codabar',
    value: '123456789'
});

barcode.appendTo('#barcode');
```

This creates a basic Codabar barcode. The `appendTo()` method renders the barcode in the specified DOM element.

---

## Creating Your First QR Code

```typescript
import { QRCodeGenerator } from '@syncfusion/ej2-barcode-generator';

const qrCode = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    displayText: { visibility: false },
    mode: 'SVG',
    value: 'Syncfusion'
});

qrCode.appendTo('#qrcode');
```

The square dimensions (200x200) are typical for QR codes. Set `displayText.visibility: false` to hide the encoded text below the code.

---

## Creating Your First Data Matrix

```typescript
import { DataMatrixGenerator } from '@syncfusion/ej2-barcode-generator';

const dataMatrix = new DataMatrixGenerator({
    width: '200px',
    height: '150px',
    displayText: { visibility: false },
    mode: 'SVG',
    value: 'Syncfusion'
});

dataMatrix.appendTo('#datamatrix');
```

Data Matrix barcodes can be smaller and more compact than QR codes while still encoding significant data.

---

## Render Modes: SVG vs Canvas

### SVG Mode (Recommended)

```typescript
const barcode = new BarcodeGenerator({
    mode: 'SVG',
    // ... other config
});
```

**Advantages:**
- Scalable without quality loss
- Better for printing
- Accessible (screen reader friendly)
- CSS styleable
- Smaller file size for export

### Canvas Mode

```typescript
const barcode = new BarcodeGenerator({
    mode: 'Canvas',
    // ... other config
});
```

**Advantages:**
- Faster rendering for complex barcodes
- Better performance with many elements
- Smoother animations

**Default:** SVG (recommended for most cases)

---

## Display Text Configuration

Control the text displayed below or beside the barcode:

```typescript
const barcode = new BarcodeGenerator({
    value: 'SYNCFUSION',
    displayText: {
        visibility: true,        // Show text
        text: 'Custom Label',     // Override with custom text
        font: { size: '14px' }    // Font size
    }
});
```

For QR and Data Matrix, usually hide text:

```typescript
displayText: { visibility: false }
```

---

## Troubleshooting Setup Issues

**Issue: "Cannot find module '@syncfusion/ej2-barcode-generator'"**
- Solution: Run `npm install @syncfusion/ej2-barcode-generator`
- Verify package.json includes the dependency

**Issue: Barcode not rendering**
- Check: HTML div with matching ID exists (`#barcode`, `#qrcode`, etc.)
- Check: CSS file is loaded (no 404 in DevTools)
- Check: `appendTo()` called with correct element ID

**Issue: System.js configuration errors**
- Verify System.config paths match your node_modules structure
- Check browser console for 404 on UMD files
- Use a bundler (Webpack, Vite) if System.js is problematic

---

## What's Next

Once setup is complete:
1. Choose your barcode type using [Barcode Types Guide](barcode-types.md)
2. Customize appearance using [Customization & Styling](customization-styling.md)
3. Export barcodes using [Export & Printing](export-printing.md)
