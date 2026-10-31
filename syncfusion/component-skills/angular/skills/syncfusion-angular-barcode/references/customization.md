# Customization & Styling

## Table of Contents
- [Shared Properties](#shared-properties)
- [Color Customization](#color-customization)
- [Size & Dimensions](#size--dimensions)
- [Margins & Padding](#margins--padding)
- [Display Text Customization](#display-text-customization)
- [CSS Class Customization](#css-class-customization)
- [Rendering Mode](#rendering-mode)
- [Responsive Design](#responsive-design)

---

## Shared Properties

All barcode types (linear, QR, Data Matrix) support common customization properties:

| Property | Type | Default | Use |
|----------|------|---------|-----|
| `width` | string | Auto | Barcode width (px, %) |
| `height` | string | Auto | Barcode height (px, %) |
| `foreColor` | string | #000000 | Barcode/module color |
| `backgroundColor` | string | #FFFFFF | Background color |
| `value` | string | `''` | Encoded barcode value |
| `displayText` | object | `{ visibility: false }` | Human-readable text configuration |
| `margin` | object | {left: 0, right: 0, top: 0, bottom: 0} | Space around barcode |
| `mode` | string | SVG | SVG or Canvas rendering |

---

## Color Customization

### Foreground Color (Barcode Modules)

The foreground color defines the color of the barcode bars/modules.

```html
<!-- Black (default) -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  foreColor="#000000">
</ejs-barcodegenerator>

<!-- Blue branding -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  foreColor="#1976D2">
</ejs-barcodegenerator>

<!-- Named color -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  foreColor="navy">
</ejs-barcodegenerator>
```

### Background Color (Canvas Surface)

The background color defines the canvas behind the barcode.

```html
<!-- White background (default) -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  backgroundColor="#FFFFFF">
</ejs-barcodegenerator>

<!-- Light gray background -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  backgroundColor="#F5F5F5">
</ejs-barcodegenerator>

<!-- Dark background -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  foreColor="#FFFFFF"
  backgroundColor="#1a1a1a">
</ejs-barcodegenerator>
```

### Color Themes Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-color-themes',
  template: `
    <div>
      <button (click)="setTheme('standard')">Standard</button>
      <button (click)="setTheme('brand')">Brand</button>
      <button (click)="setTheme('dark')">Dark Mode</button>

      <ejs-barcodegenerator 
        type="Code128" 
        value="123456789"
        [foreColor]="foreColor"
        [backgroundColor]="backgroundColor"
        width="250px" 
        height="150px">
      </ejs-barcodegenerator>
    </div>
  `
})
export class ColorThemesComponent {
  foreColor = '#000000';
  backgroundColor = '#FFFFFF';

  setTheme(theme: string) {
    const themes: { [key: string]: { fg: string; bg: string } } = {
      standard: { fg: '#000000', bg: '#FFFFFF' },
      brand: { fg: '#1976D2', bg: '#E3F2FD' },
      dark: { fg: '#FFFFFF', bg: '#2a2a2a' }
    };

    if (themes[theme]) {
      this.foreColor = themes[theme].fg;
      this.backgroundColor = themes[theme].bg;
    }
  }
}
```

### Color Contrast Requirements

✅ **Required for scanning:**
- High contrast between foreground and background
- Minimum contrast ratio of 4.5:1 (WCAG AA standard)
- Example: Black (#000000) on White (#FFFFFF) → Contrast: 21:1 ✅

❌ **Problematic combinations:**
- Light gray (#E0E0E0) on white (#FFFFFF) → Contrast: 1.3:1 ❌
- Dark blue (#1976D2) on dark purple (#6A1B9A) → No scanning ❌

### RGB Hex Color Reference

```typescript
// Common professional colors
const colors = {
  // Neutral
  black: '#000000',
  white: '#FFFFFF',
  darkGray: '#333333',
  lightGray: '#F5F5F5',
  
  // Brand colors
  blue: '#1976D2',
  green: '#4CAF50',
  red: '#F44336',
  orange: '#FF9800',
  
  // Dark theme
  darkBG: '#1a1a1a',
  darkText: '#FFFFFF'
};
```

---

## Size & Dimensions

### Width & Height Properties

```html
<!-- Specify both width and height (square) -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  width="200px" 
  height="200px">
</ejs-barcodegenerator>

<!-- Rectangular barcode -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  width="300px" 
  height="100px">
</ejs-barcodegenerator>

<!-- Percentage-based sizing -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  width="80%" 
  height="120px">
</ejs-barcodegenerator>
```

### Size Guidelines by Type

| Barcode Type | Recommended Size | Minimum | Maximum |
|--------------|-----------------|---------|---------|
| **Linear (Code128)** | 200×100px | 100×50px | No limit |
| **QR Code** | 200×200px | 80×80px | 400×400px |
| **Data Matrix** | 120×120px | 50×50px | 200×200px |

### Responsive Sizing

```typescript
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-responsive-barcode',
  template: `
    <ejs-barcodegenerator 
      type="Code128" 
      value="RESPONSIVE-BARCODE"
      [width]="barcodeWidth" 
      [height]="barcodeHeight">
    </ejs-barcodegenerator>
  `
})
export class ResponsiveBarcodeComponent implements OnInit {
  barcodeWidth = '200px';
  barcodeHeight = '100px';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSize();
  }

  ngOnInit() {
    this.updateSize();
  }

  updateSize() {
    const width = window.innerWidth;
    if (width < 480) {
      this.barcodeWidth = '100px';
      this.barcodeHeight = '50px';
    } else if (width < 768) {
      this.barcodeWidth = '150px';
      this.barcodeHeight = '75px';
    } else {
      this.barcodeWidth = '200px';
      this.barcodeHeight = '100px';
    }
  }
}
```

---

## Margins & Padding

### Margin Property

Add space around the barcode using the margin property:

```html
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  [margin]="{ left: 10, right: 10, top: 10, bottom: 10 }"
  width="200px" 
  height="100px">
</ejs-barcodegenerator>
```

### Component with Margins

```typescript
export class MarginsComponent {
  marginConfig = {
    left: 15,    // Left margin in pixels
    right: 15,   // Right margin in pixels
    top: 10,     // Top margin in pixels
    bottom: 20   // Bottom margin (extra space for text)
  };
}
```

### CSS-based Spacing

```css
/* app.component.css */
ejs-barcodegenerator {
  display: block;
  padding: 20px;           /* Space inside container */
  margin: 10px 0;          /* Space outside container */
  border: 1px solid #ddd;  /* Border around */
}
```

---


## Display Text Customization

### Basic Display Text

```html
<ejs-barcodegenerator 
  type="Code128" 
  value="SKU123456789"
  [displayText]="{ text: 'Product SKU: 123456789', visibility: true }"
  width="250px" 
  height="150px">
</ejs-barcodegenerator>

```

### Dynamic Display Text

```typescript
export class DynamicTextComponent {
  barcodeValue = 'PROD-001';

  displayLabel = {
    text: 'Product Code',
    visibility: true
  };

  updateLabel(newLabel: string) {
    this.displayLabel = {
      text: newLabel,
      visibility: true
    };
  }
}
```

```html
<ejs-barcodegenerator 
  type="Code128" 
  [value]="barcodeValue"
  [displayText]="displayLabel"
  width="200px" 
  height="100px">
</ejs-barcodegenerator>
```

### Display Text Examples

```typescript
// Product barcode
displayText = { text: 'SKU: 123456789', visibility: true };

// QR code marketing
displayText = { text: 'Scan to Download App', visibility: true };

// Tracking barcode
displayText = { text: 'Package ID: TRK-2026-001', visibility: true };

// Medical / Pharma
displayText = { text: 'BATCH: 789 | EXP: 2028-06', visibility: true };

// Inventory
displayText = { text: 'Warehouse Location: A-15-02', visibility: true };
```

---

## CSS Class Customization

### Container Styling

```css
/* Style the barcode container */
ejs-barcodegenerator {
  display: block;
  padding: 20px;
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Angular Component Styling

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-styled-barcode',
  template: `
    <div class="barcode-wrapper">
      <ejs-barcodegenerator 
        class="barcode-item"
        type="Code128" 
        value="STYLED-BARCODE"
        width="200px" 
        height="100px">
      </ejs-barcodegenerator>
    </div>
  `,
  styles: [`
    .barcode-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .barcode-item {
      display: flex;
      justify-content: center;
    }
  `]
})
export class StyledBarcodeComponent {}
```

### Print-Friendly Styling

```css
@media print {
  ejs-barcodegenerator {
    display: block;
    width: 100%;
    margin: 10mm 0;
    page-break-inside: avoid;
  }

  /* Ensure scannable resolution */
  .barcode-print {
    width: 80mm;
    height: 50mm;
  }
}
```

---

## Rendering Mode

### SVG vs Canvas Rendering

```html
<!-- SVG rendering (default, recommended) -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  mode="SVG"
  width="200px" 
  height="100px">
</ejs-barcodegenerator>

<!-- Canvas rendering (alternative) -->
<ejs-barcodegenerator 
  type="Code128" 
  value="123456789"
  mode="Canvas"
  width="200px" 
  height="100px">
</ejs-barcodegenerator>
```

### Mode Comparison

| Mode | Advantage | Disadvantage |
|------|-----------|--------------|
| **SVG** | Scalable, print-friendly, crisp at any size | Slightly larger file size |
| **Canvas** | Smaller file size, faster rendering | Pixelates at large sizes |

**Recommended:** SVG for most use cases, especially for print.

---

## Responsive Design

### Mobile-First Layout

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive-layout',
  template: `
    <div class="barcode-container">
      <div class="barcode-card" *ngFor="let product of products">
        <h3>{{ product.name }}</h3>

        <ejs-barcodegenerator 
          type="Code128" 
          [value]="product.sku"
          [width]="barcodeSize"
          [height]="barcodeSize">
        </ejs-barcodegenerator>

        <p>SKU: {{ product.sku }}</p>
      </div>
    </div>
  `,
  styles: [`
    .barcode-container {
      display: grid;
      gap: 20px;
    }

    @media (max-width: 600px) {
      .barcode-container {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 601px) and (max-width: 1200px) {
      .barcode-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1201px) {
      .barcode-container {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .barcode-card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
  `]
})
export class ResponsiveLayoutComponent implements OnInit {
  barcodeSize = '150px';
  products = [
    { name: 'Product 1', sku: 'SKU-001' },
    { name: 'Product 2', sku: 'SKU-002' },
    { name: 'Product 3', sku: 'SKU-003' },
    { name: 'Product 4', sku: 'SKU-004' }
  ];

  ngOnInit() {
    this.updateBarcodeSize();
    window.addEventListener('resize', () => this.updateBarcodeSize());
  }

  updateBarcodeSize() {
    const width = window.innerWidth;
    if (width < 600) {
      this.barcodeSize = '100px';
    } else if (width < 1200) {
      this.barcodeSize = '120px';
    } else {
      this.barcodeSize = '150px';
    }
  }
}
```

### Dark Mode Support

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode',
  template: `
    <div [class.dark-theme]="isDarkMode">
      <button (click)="toggleTheme()">
        {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
      </button>

      <ejs-barcodegenerator 
        type="QRCode" 
        value="https://example.com"
        [foreColor]="isDarkMode ? '#FFFFFF' : '#000000'"
        [backgroundColor]="isDarkMode ? '#1a1a1a' : '#FFFFFF'"
        width="200px" 
        height="200px">
      </ejs-barcodegenerator>
    </div>
  `,
  styles: [`
    .dark-theme {
      background-color: #1a1a1a;
      color: #FFFFFF;
    }
  `]
})
export class DarkModeComponent implements OnInit {
  isDarkMode = false;

  ngOnInit() {
    // Check system preference
    this.isDarkMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}
```

---

## Accessibility (WCAG Compliance)

Making barcodes accessible ensures all users can understand barcode purposes and content, including those using assistive technologies.

### Color Contrast & WCAG Levels

Ensure sufficient contrast between `foreColor` and `backgroundColor`:

| Contrast Ratio | WCAG Level | Use For |
|---|---|---|
| **4.5:1** | AA (Minimum) | Text and important elements |
| **7:1** | AAA (Enhanced) | Critical information |
| **3:1** | AA Large | Large text only |

#### Color Contrast Examples

```typescript
export class AccessibleBarcodeComponent {
  // ✅ WCAG AA Compliant (4.5:1 ratio)
  goodContrast = {
    foreColor: '#000000',        // Black
    backgroundColor: '#FFFFFF'   // White
    // Ratio: 21:1 (exceeds AA, meets AAA) ✅
  };

  // ✅ WCAG AA Compliant
  brandedCompliant = {
    foreColor: '#1A5490',        // Dark blue
    backgroundColor: '#FFFFFF'   // White
    // Ratio: 8.2:1 (exceeds AA, meets AAA) ✅
  };

  // ⚠️ WCAG AA Marginal (4.5:1)
  marginalContrast = {
    foreColor: '#666666',        // Medium gray
    backgroundColor: '#FFFFFF'   // White
    // Ratio: 4.5:1 (meets AA minimum, not AAA)
  };

  // ❌ NOT Compliant under 3:1
  poorContrast = {
    foreColor: '#CCCCCC',        // Light gray
    backgroundColor: '#FFFFFF'   // White
    // Ratio: 1.7:1 (fails WCAG) ❌
  };
}
```

### Semantic HTML & ARIA Labels

Provide context for users with screen readers:

```html
<!-- With semantic HTML and ARIA -->
<div class="barcode-section">
  <h2>Product Identification</h2>

  <ejs-barcodegenerator 
    type="Code128" 
    value="ABC123456789"
    role="img"
    aria-label="Product barcode: ABC123456789"
    aria-describedby="barcode-description"
    width="200px" 
    height="100px">
  </ejs-barcodegenerator>

  <!-- Screen reader only description -->
  <p id="barcode-description" class="sr-only">
    This barcode represents product SKU ABC123456789. 
    Users can scan this barcode with a standard barcode reader 
    to retrieve product information from inventory system.
  </p>

  <!-- Visual-only context -->
  <p class="barcode-label">SKU: ABC123456789</p>
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
```

### Accessible Barcode Component

```typescript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-accessible-barcode',
  template: `
    <div class="barcode-container" [attr.aria-label]="ariaLabel">
      <ejs-barcodegenerator 
        [type]="type"
        [value]="value"
        [foreColor]="foreColor"
        [backgroundColor]="backgroundColor"
        [width]="width"
        [height]="height"
        [displayText]="displayText"
        role="img"
        [attr.aria-describedby]="descriptionId">
      </ejs-barcodegenerator>

      <!-- Hidden description for assistive tech -->
      <p [id]="descriptionId" class="sr-only">
        {{ accessibilityDescription }}
      </p>

      <!-- Optional visual label -->
      <p *ngIf="visualLabel" class="barcode-label">
        {{ visualLabel }}
      </p>
    </div>
  `,
  styles: [`
    .barcode-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
    }

    .barcode-label {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
    }
  `]
})
export class AccessibleBarcodeComponent implements OnInit {
  @Input() type: string = 'Code128';
  @Input() value: string = '123456789';
  @Input() foreColor: string = '#000000';
  @Input() backgroundColor: string = '#FFFFFF';
  @Input() width: string = '200px';
  @Input() height: string = '100px';

  // EJ2: displayText is an object (not a string)
  @Input() displayText: { text?: string; visibility?: boolean } = { visibility: false };

  @Input() visualLabel?: string;
  @Input() ariaLabel?: string;
  @Input() accessibilityDescription?: string;

  descriptionId = `barcode-desc-${Math.random().toString(36).substr(2, 9)}`;

  ngOnInit() {
    // Default values if not provided (Inputs are reliably available by ngOnInit)
    if (!this.ariaLabel) {
      this.ariaLabel = `Barcode: ${this.value}`;
    }
    if (!this.accessibilityDescription) {
      this.accessibilityDescription =
        `This barcode encodes: ${this.value}. Scan with a barcode reader to process.`;
    }
  }
}
```

### High Contrast Mode Support

```typescript
import { OnInit } from '@angular/core';

export class HighContrastBarcodeComponent implements OnInit {
  isDarkMode = false;
  isPrintMode = false;

  template = `
    <div [class.print-mode]="isPrintMode" 
         [class.dark-mode]="isDarkMode">
      <ejs-barcodegenerator 
        type="Code128"
        value="PRINT-001"
        [foreColor]="getForeColor()"
        [backgroundColor]="getBackColor()"
        width="200px"
        height="100px">
      </ejs-barcodegenerator>
    </div>
  `;

  getForeColor(): string {
    if (this.isPrintMode) return '#000000'; // Always black for print
    if (this.isDarkMode) return '#FFFFFF';  // White for dark mode
    return '#000000'; // Black for light mode
  }

  getBackColor(): string {
    if (this.isPrintMode) return '#FFFFFF'; // Always white for print
    if (this.isDarkMode) return '#1A1A1A';  // Dark for dark mode
    return '#FFFFFF'; // White for light mode
  }

  ngOnInit() {
    // Detect dark mode preference
    this.isDarkMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Detect print mode
    window.addEventListener('beforeprint', () => {
      this.isPrintMode = true;
    });
    window.addEventListener('afterprint', () => {
      this.isPrintMode = false;
    });
  }
}
```

---

## Next Steps

- For linear barcodes, see [linear-barcodes.md](linear-barcodes.md)
- For QR codes, see [qr-codes.md](qr-codes.md)
- For Data Matrix, see [data-matrix-barcodes.md](data-matrix-barcodes.md)
- To export barcodes, see [exporting-barcodes.md](exporting-barcodes.md)
