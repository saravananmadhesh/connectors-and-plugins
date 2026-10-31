# Getting Started with Barcode Generation

## Table of Contents
- [Installation](#installation)
- [Package Selection](#package-selection)
- [Component Setup](#component-setup)
- [Basic Code128 Barcode](#basic-code128-barcode)
- [QR Code Setup](#qr-code-setup)
- [Data Matrix Setup](#data-matrix-setup)
- [Common Setup Issues](#common-setup-issues)

---

## Installation

### Step 1: Install Syncfusion Barcode Package

The Syncfusion barcode component requires the `@syncfusion/ej2-angular-barcode-generator` package. Install via npm:

```bash
npm install @syncfusion/ej2-angular-barcode-generator --save
```

This installs the latest Ivy-compatible version (recommended for Angular 12+).

### Step 2: Verify Installation

Check that the package appears in `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-angular-barcode-generator": "^20.2.48"
  }
}
```

---

## Package Selection

### Ivy Library Distribution (Recommended)

**Use for:** Angular 12+

```bash
npm install @syncfusion/ej2-angular-barcode-generator --save
```

**Advantages:**
- Smaller bundle size
- Better tree-shaking
- Modern Angular support
- Default installation

**In package.json:**
```json
"@syncfusion/ej2-angular-barcode-generator": "^20.2.48"
```

### Angular Compatibility Compiler (ngcc) Legacy

**Use for:** Angular <12

```bash
npm install @syncfusion/ej2-angular-barcode-generator@ngcc --save
```

**When to use:**
- Angular 11 or earlier
- Legacy projects
- Compatibility issues with Ivy

**In package.json:**
```json
"@syncfusion/ej2-angular-barcode-generator": "20.2.48-ngcc"
```

**Note:** If ngcc suffix isn't specified, Ivy package installs by default and may show warnings in older Angular versions.

---

## Component Setup

### Step 1: Import in AppModule

Add `BarcodeGeneratorModule` to your module imports:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BarcodeGeneratorModule } from '@syncfusion/ej2-angular-barcode-generator';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BarcodeGeneratorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Step 2: Import CSS Theme

Add Syncfusion theme to `styles.css` or `styles.scss`:

```css
/* styles.css - Add at the top */
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-barcode-generator/styles/material.css';
```

**Available themes:** material, material-dark, fabric, fabric-dark, bootstrap, bootstrap-dark, bootstrap5, bootstrap5-dark, tailwind, tailwind-dark

### Step 3: Verify Setup in Component

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Barcode Generation Example';
}
```

---

## Basic Code128 Barcode

Code128 is the most widely-used linear barcode for retail and inventory systems. It supports the full ASCII set and includes automatic checksums.

### Template (HTML)

```html
<!-- app.component.html -->
<div class="barcode-container">
  <h1>Product Barcode</h1>

  <ejs-barcodegenerator
    type="Code128"
    value="123456789ABC"
    width="200px"
    height="150px"
    [displayText]="{ text: 'SKU: 123456789ABC', visibility: true }">
  </ejs-barcodegenerator>
</div>
```

### Component (TypeScript)

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  barcodeValue = '123456789ABC';
}
```

### Styling (CSS)

```css
/* app.component.css */
.barcode-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 400px;
}

h1 {
  font-size: 18px;
  margin-bottom: 20px;
}

ejs-barcodegenerator {
  display: block;
  margin: 20px 0;
}
```

---

## QR Code Setup

QR codes are perfect for encoding URLs, contact information, or embedding in marketing materials.

### Basic QR Code

```html
<ejs-barcodegenerator
  type="QRCode"
  value="https://example.com"
  width="200px"
  height="200px">
</ejs-barcodegenerator>
```

### Dynamic QR Code with Input

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  qrValue = 'https://example.com';

  onInputChange(event: any) {
    this.qrValue = event.target.value;
  }
}
```

```html
<!-- app.component.html -->
<div>
  <input 
    type="text" 
    placeholder="Enter URL or text"
    (change)="onInputChange($event)"
    value="https://example.com">
  
  <ejs-barcodegenerator 
    [value]="qrValue" 
    type="QRCode" 
    width="250px" 
    height="250px">
  </ejs-barcodegenerator>
</div>
```

---

## Data Matrix Setup

Data Matrix codes are ideal for compact, high-density encoding on small labels.

### Basic Data Matrix

```html
<ejs-barcodegenerator
  type="DataMatrix"
  value="PHARMACEUTICAL-TRACKING-001"
  width="100px"
  height="100px">
</ejs-barcodegenerator>
```

### With Display Text

```html
<ejs-barcodegenerator
  type="DataMatrix"
  value="TRACK-20260321-BATCH-789"
  [displayText]="{ text: 'Batch #789', visibility: true }"
  width="120px"
  height="120px">
</ejs-barcodegenerator>
```

---

## Common Setup Issues

### Issue 1: Component Not Recognized

**Error:** `'ejs-barcodegenerator' is not a known element`

**Solution:**
- Verify `BarcodeGeneratorModule` is imported in `app.module.ts`
- Restart the development server (`ng serve`)
- Clear node_modules: `rm -rf node_modules && npm install`

### Issue 2: Missing Styles

**Error:** Barcode displays but styles look broken or unstyled

**Solution:**
```css
/* Ensure theme CSS is imported at the TOP of styles.css */
@import '@syncfusion/ej2-base/styles/material.css';
@import '@syncfusion/ej2-barcode-generator/styles/material.css';
```

### Issue 3: Package Version Mismatch

**Error:** `Module not found: '@syncfusion/ej2-angular-barcode-generator'`

**Solution:**
```bash
npm list @syncfusion/ej2-angular-barcode-generator
npm update @syncfusion/ej2-angular-barcode-generator
```

### Issue 4: SVG Mode Problems

**Error:** Barcode not rendering or appears blank

**Solution:** Explicitly set mode to SVG:

```html
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789" 
  mode="SVG"
  width="200px" 
  height="150px">
</ejs-barcodegenerator>
```

### Issue 5: ViewChild Reference Undefined

**Error:** `Cannot read property 'export' of undefined`

**Solution:** Wait for component to initialize using `@ViewChild` with static false:

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BarcodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('barcode', { static: false })
  barcode!: BarcodeGeneratorComponent;

  ngAfterViewInit() {
    // NOW barcode is initialized
    console.log(this.barcode);
  }
}
```

---

## Next Steps

- For linear barcodes, see [linear-barcodes.md](linear-barcodes.md)
- For QR code details, see [qr-codes.md](qr-codes.md)
- For Data Matrix, see [data-matrix-barcodes.md](data-matrix-barcodes.md)
- To customize appearance, see [customization.md](customization.md)
- To export barcodes, see [exporting-barcodes.md](exporting-barcodes.md)
