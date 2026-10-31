# QR Codes

## Table of Contents
- [QR Code Overview](#qr-code-overview)
- [QR Code Versions & Capacity](#qr-code-versions--capacity)
- [Basic QR Code Generation](#basic-qr-code-generation)
- [Customizing Colors](#customizing-colors)
- [Customizing Dimensions](#customizing-dimensions)
- [Display Text & Labels](#display-text--labels)
- [Adding Logos](#adding-logos)
- [Logo Image Sources](#logo-image-sources)
- [Error Correction & Data Encoding](#error-correction--data-encoding)
- [Dynamic QR Codes](#dynamic-qr-codes)
- [Common QR Code Patterns](#common-qr-code-patterns)

---

## QR Code Overview

QR Codes (Quick Response Codes) are two-dimensional barcodes that encode data in a grid of dark and light squares. They are universally recognized, scannable by any smartphone camera, and store significantly more data than linear barcodes.

### Key Characteristics

- **2D Format:** Square grid of modules (dark/light squares)
- **High Data Capacity:** Up to 7,089 numeric or 4,296 alphanumeric characters
- **Universal Scanning:** Works with any smartphone camera or dedicated scanner
- **Error Correction:** Built-in recovery for damaged/partially obscured codes
- **Automatic Versioning:** Component auto-selects version (1-40) based on data length

### QR Code Versions

QR Code versions determine the grid size and data capacity:

| Version | Grid Size | Use Case |
|---------|-----------|----------|
| **1-10** | 21×21 to 57×57 | Small URLs, text, contact info (recommended for most uses) |
| **11-20** | 61×61 to 105×105 | Longer URLs, documents, product catalogs |
| **21-40** | 109×109 to 177×177 | Large data (5KB+), complex documents |

**Note:** Component automatically selects appropriate version based on input data length.

---

## QR Code Versions & Capacity

### Numeric Data Capacity by Version

| Version | Grid | Numeric Capacity | Alphanumeric | Byte |
|---------|------|------------------|--------------|------|
| 1 | 21×21 | 41 | 25 | 17 |
| 5 | 37×37 | 154 | 93 | 65 |
| 10 | 57×57 | 346 | 209 | 134 |
| 20 | 101×101 | 1,308 | 790 | 504 |
| 40 | 177×177 | 7,089 | 4,296 | 2,953 |

### Data Type Support

- **Numeric:** `0-9` only → Highest density
- **Alphanumeric:** `0-9`, `A-Z`, space, `$%*+-./:`
- **Byte:** Full UTF-8/Unicode support
- **Kanji:** Japanese characters (JIS8)

### Auto Version Selection

The barcode component AUTOMATICALLY selects the minimum version that fits your data:

```typescript
// Component auto-selects version:
// "Hello" (5 chars) → Version 1
// "https://example.com/very/long/path" (35 chars) → Version 2-3
// 500 chars → Version 8-9
```

---

## Basic QR Code Generation

### Simplest Implementation

```html
<!-- app.component.html -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com" 
  width="200px" 
  height="200px">
</ejs-barcodegenerator>
```

### Component Example

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-qr',
  template: `
    <ejs-barcodegenerator 
      type="QRCode" 
      [value]="qrValue" 
      width="250px" 
      height="250px">
    </ejs-barcodegenerator>
  `
})
export class QRCodeComponent {
  qrValue = 'https://myapp.com';
}
```

### QR Code for Different Data Types

```typescript
export class QRExamplesComponent {
  // URL - Most common
  urlQR = 'https://example.com/product/123';
  
  // Contact vCard
  contactQR = 'BEGIN:VCARD\nFN:John Doe\nTEL:+1234567890\nEND:VCARD';
  
  // WiFi Connection
  wifiQR = 'WIFI:T:WPA;S:NetworkName;P:Password;;';
  
  // Plain Text
  textQR = 'Simple text data';
  
  // Phone Number
  phoneQR = 'tel:+1234567890';
  
  // Email
  emailQR = 'mailto:contact@example.com';
}
```

---

## Customizing Colors

QR codes should maintain high contrast with background. Colors are specified as RGB hex values or named colors.

### Built-in Color Properties

| Property | Purpose | Default |
|----------|---------|---------|
| `foreColor` | Dark modules (encoded squares) | #000000 (black) |
| `backgroundColor` | Light modules (background) | #FFFFFF (white) |

### Basic Color Customization

```html
<!-- Black QR on white background (standard) -->
<ejs-barcodegenerator
  type="QRCode" 
  value="https://example.com"
  foreColor="#000000"
  backgroundColor="#FFFFFF"
  width="200px" 
  height="200px">
</ejs-barcodegenerator>
```

### Dark Theme QR Code

```html
<!-- White QR on dark background -->
<ejs-barcodegenerator
  type="QRCode" 
  value="https://example.com"
  foreColor="#FFFFFF"
  backgroundColor="#1a1a1a"
  width="200px" 
  height="200px">
</ejs-barcodegenerator>
```

### Branded Color QR Code

```html
<!-- Blue and light theme -->
<ejs-barcodegenerator
  type="QRCode" 
  value="https://mycompany.com"
  foreColor="#1976D2"
  backgroundColor="#F5F5F5"
  width="200px" 
  height="200px">
</ejs-barcodegenerator>
```

### Dynamic Color Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-branded-qr',
  template: `
    <div>
      <select (change)="setBrandColor($event)">
        <option value="brand-blue">Brand Blue</option>
        <option value="brand-green">Brand Green</option>
        <option value="dark-mode">Dark Mode</option>
      </select>
      
      <ejs-barcodegenerator
        type="QRCode" 
        value="https://example.com"
        [foreColor]="foreColor"
        [backgroundColor]="backgroundColor"
        width="250px" 
        height="250px">
      </ejs-barcodegenerator>
    </div>
  `
})
export class BrandedQRComponent {
  foreColor = '#000000';
  backgroundColor = '#FFFFFF';

  setBrandColor(event: any) {
    const brand = event.target.value;
    if (brand === 'brand-blue') {
      this.foreColor = '#1976D2';
      this.backgroundColor = '#E3F2FD';
    } else if (brand === 'brand-green') {
      this.foreColor = '#4CAF50';
      this.backgroundColor = '#F1F8E9';
    } else if (brand === 'dark-mode') {
      this.foreColor = '#FFFFFF';
      this.backgroundColor = '#1a1a1a';
    }
  }
}
```

### ⚠️ Important Color Contrast Note

Ensure sufficient contrast for scanning:
- ✅ **Good:** Dark foreColor, light backColor (or vice versa)
- ❌ **Bad:** Similar brightness (won't scan reliably)

---

## Customizing Dimensions

QR code size is controlled by `width` and `height` properties. Larger sizes are more tolerant of damage and easier to scan.

### Size Guidelines

| Dimension | Scan Distance | Use Case |
|-----------|---------------|----------|
| **80×80px** | Contact/near | Small labels, QR codes in documents |
| **200×200px** | 30cm/1ft | Standard printable size |
| **300×300px** | 1m/3ft | Large displays, posters |
| **400×400px** | 2m/7ft | Billboards, large installations |

### Implementation

```html
<!-- Small QR (80×80) - Labels/documents -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  width="80px" 
  height="80px">
</ejs-barcodegenerator>

<!-- Standard QR (200×200) - Most common -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  width="200px" 
  height="200px">
</ejs-barcodegenerator>

<!-- Large QR (350×350) - Posters/displays -->
<ejs-barcodegenerator 
  type="QRCode" 
  value="https://example.com"
  width="350px" 
  height="350px">
</ejs-barcodegenerator>
```

### Responsive QR Code

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responsive-qr',
  template: `
    <ejs-barcodegenerator 
      type="QRCode" 
      [value]="qrValue"
      [width]="qrSize" 
      [height]="qrSize">
    </ejs-barcodegenerator>
  `,
  styles: [`
    :host { display: block; padding: 20px; }
  `]
})
export class ResponsiveQRComponent implements OnInit {
  qrValue = 'https://example.com';
  qrSize = '200px';

  ngOnInit() {
    this.updateSizeForScreen();
    window.addEventListener('resize', () => this.updateSizeForScreen());
  }

  updateSizeForScreen() {
    const width = window.innerWidth;
    if (width < 600) {
      this.qrSize = '100px'; // Small screens
    } else if (width < 1200) {
      this.qrSize = '200px'; // Tablets
    } else {
      this.qrSize = '300px'; // Desktop
    }
  }
}
```

---

## Display Text & Labels

Display text appears below the QR code for human-readable identification.

### Basic Display Text

```html
<ejs-barcodegenerator
  type="QRCode" 
  value="https://example.com"
  [displayText]="{ text: 'Visit our website', visibility: true }"
  width="200px" 
  height="200px">
</ejs-barcodegenerator>
```

### Dynamic Display Text

```typescript
export class LabeledQRComponent {
  qrValue = 'https://myapp.com/docs';
  displayLabel = {
    text: 'Scan for documentation',
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

### Common Display Text Examples

```typescript
// Product promotion
displayText = { text: 'Download Our App', visibility: true }; // App store link

// Event registration
displayText = { text: 'Register Now - Event Portal', visibility: true };

// WiFi sharing
displayText = { text: 'Connect to WiFi', visibility: true };

// Contact info
displayText = { text: 'Add Contact - John Doe', visibility: true };

// Menu/reservation
displayText = { text: 'Reserve a Table', visibility: true };
```

---

## Adding Logos

Add logos or icons to QR codes for branding while maintaining scannability.

### Basic Logo Implementation

```html
<div>
 <ejs-qrcodegenerator style="display: block;" #qrcode 
      id="qrcode" width="200px" height="150px"
      [displayText]="{visibility: true}"
      [logo]="logoConfig"
      value="Syncfusion">
</ejs-qrcodegenerator>
</div>
```

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';
import { QRCodeLogoModel } from '@syncfusion/ej2-barcode-generator/src/barcode/primitives/icon-model';

@Component({
  selector: 'app-branded-qr',
  templateUrl: './branded-qr.component.html'
})
export class BrandedQRComponent implements OnInit {
  @ViewChild('qrcode', { static: false }) 
  qrCode: QRCodeGeneratorComponent;
  public logoConfig: QRCodeLogoModel = {imageSource:'assets/company-logo.png',width:50, height:50 }
  ngOnInit() {
  }
}
```

### Logo Size Guidelines

| Logo Size | QR Size | Recommended | Use Case |
|-----------|---------|-------------|----------|
| 30×30px | 150×150px | Small, subtle branding |
| 50×50px | 200×200px | Standard, balanced branding |
| 80×80px | 300×300px | Large, prominent logo |
| 100×100px | 400×400px | Very large displays |

**⚠️ Logo Size Limit:** Logo should not exceed 25-30% of QR code size to maintain scannability.

### Logo Image Sources

Logos can come from multiple sources:

#### 1. Local File (Recommended)
```typescript
const logoConfig = {
  imageSource: 'assets/logos/company-logo.png',
  width: 50,
  height: 50
};
```

#### 2. Remote URL
```typescript
const logoConfig = {
  imageSource: 'https://cdn.example.com/logo.svg',
  width: 50,
  height: 50
};
```

#### 3. Base64 Encoded Image
```typescript
const logoConfig = {
  imageSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  width: 50,
  height: 50
};
```

#### 4. SVG Inline
```typescript
const logoConfig = {
  imageSource: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23FF0000"/></svg>',
  width: 50,
  height: 50
};
```

### Advanced Logo Patterns

#### Pattern 1: Dynamic Logo Based on Product Type

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';
import { QRCodeLogoModel } from '@syncfusion/ej2-barcode-generator/src/barcode/primitives/icon-model';
export class DynamicLogoQRComponent {

@ViewChild('qrCode', { static: false })
qrCode!: QRCodeGeneratorComponent;

public logoConfig: QRCodeLogoModel = { imageSource: 'assets/logos/tech-logo.svg', width: 50, height: 50 };
  productType: string = 'tech'; // 'tech', 'retail', 'food'
  qrValue: string = 'https://example.com/product/123';
  
  logoMap = {
    tech: 'assets/logos/tech-logo.svg',
    retail: 'assets/logos/retail-logo.svg',
    food: 'assets/logos/food-logo.svg'
  };
updateLogoForProduct(type: string) {
   setTimeout(() => {
      this.productType = type;
      this.logoConfig = { imageSource: this.logoMap[type], width: 50, height: 50 };
        // Logo updates with new product type
    }, 100);
}
}
```

#### Pattern 2: Responsive Logo Size

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';
import { QRCodeLogoModel } from '@syncfusion/ej2-barcode-generator/src/barcode/primitives/icon-model';
export class ResponsiveLogoQRComponent implements OnInit {
  @ViewChild('qrCode') qrCode: QRCodeGeneratorComponent;
  
  qrSize = '200px';
  logoSize = 50;
  logoSource = 'assets/logo.svg';
  public logoConfig: QRCodeLogoModel = { imageSource: this.logoSource, width: this.logoSize, height: this.logoSize };

  ngOnInit() {
    this.updateSizes();
    window.addEventListener('resize', () => this.updateSizes());
  }

  updateSizes() {
    const width = window.innerWidth;
    
    if (width < 600) {
      this.qrSize = '120px';
      this.logoSize = 30; // QR 120×120, logo 30×30
    } else if (width < 1200) {
      this.qrSize = '200px';
      this.logoSize = 50; // QR 200×200, logo 50×50
    } else {
      this.qrSize = '300px';
      this.logoSize = 80; // QR 300×300, logo 80×80
    }
    this.logoConfig.width = this.logoSize;
    this.logoConfig.height = this.logoSize;
    
    // Updates applied to QRCodeLogo configuration
  }
}
```

#### Pattern 3: Logo with Error Handling

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';
import { QRCodeLogoModel } from '@syncfusion/ej2-barcode-generator/src/barcode/primitives/icon-model';
export class SafeLogoQRComponent {
  @ViewChild('qrCode') qrCode!: QRCodeGeneratorComponent;
  
  qrValue = 'https://example.com';
  logoSource = 'assets/logo.svg';
  logoLoaded = false;
  logoError = false;
  public logoConfig!: QRCodeLogoModel;


  applyLogo() {
    const img = new Image();
    
    img.onload = () => {
      this.logoLoaded = true;
      this.logoError = false;
      this.logoConfig = { imageSource: this.logoSource, width: 50, height: 50 };
      // Logo applied successfully
    };
    
    img.onerror = () => {
      this.logoError = true;
      this.logoLoaded = false;
      console.warn('Logo failed to load, using QR without logo');
      // Fallback: QR code without logo
    };
    
    img.src = this.logoSource;
  }

  ngAfterViewInit() {
    this.applyLogo();
  }
}
```

#### Pattern 4: Logo with Accessibility

```typescript
import { ViewChild } from '@angular/core';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';
import { QRCodeLogoModel } from '@syncfusion/ej2-barcode-generator/src/barcode/primitives/icon-model';

export class AccessibleLogoQRComponent {
  @ViewChild('qrCode') qrCode!: QRCodeGeneratorComponent;

  qrValue = 'https://example.com/campaign/2026-spring';
  displayText = 'Scan to view spring campaign';
  ariaLabel = 'QR code for spring campaign - Scan with camera or QR reader app';
  ariaDescription = 'This QR code links to example.com/campaign/2026-spring and contains company logo branding to promote brand awareness.';

  logoConfig: QRCodeLogoModel = { imageSource: 'assets/logo.svg', width: 50, height: 50 };

  template = `
    <div class="qr-container">
      <ejs-qrcodegenerator
        #qrCode
        [value]="qrValue"
        width="200px"
        height="200px"
        [logo]="logoConfig"
        [displayText]="{ text: displayText, visibility: true }"
        <!-- Accessibility attributes (standard HTML/ARIA, NOT EJ2-specific properties) -->
        role="img"
        [attr.aria-label]="ariaLabel">
      </ejs-qrcodegenerator>

      <p class="sr-only">{{ ariaDescription }}</p>
      <p class="qr-label">{{ displayText }}</p>
    </div>
  `;
}
```

#### Pattern 5: Multiple Logos/Dynamic Overlay

```typescript
import { ViewChild } from '@angular/core';
import { QRCodeGeneratorComponent } from '@syncfusion/ej2-angular-barcode-generator';

export class MultiLevelBrandingComponent {
  @ViewChild('qrCode') qrCode!: QRCodeGeneratorComponent;
  // Implementation note: Multiple logos require custom Canvas manipulation
  // Use single logo for standard implementation, or post-process exported image
  exportWithBadge() {
    // 1. Export QR as Base64 (supported API)
    const qrImage = this.qrCode.exportAsBase64Image('PNG');

    // 2. Create canvas for badge overlay
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 200;
    canvas.height = 200;

    // 3. Draw QR and overlay badge
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(170, 30, 20, 0, Math.PI * 2);
      ctx.fill();

      // Final image (QR + badge)
      return canvas.toDataURL('image/png');
    };
    img.src = qrImage;
  }
}
```

---

## Logo Image Sources

QR codes support logos from multiple sources:

### 1. Local Image File

```typescript
const logoConfig = {
  imageSource: 'assets/logo.svg',  // Relative to root
  width: 50,
  height: 50
};

// Or absolute path
const logoConfig = {
  imageSource: '/assets/images/company-logo.png',
  width: 50,
  height: 50
};
```

### 2. Remote URL

```typescript
const logoConfig = {
  imageSource: 'https://cdn.example.com/logo-50x50.png',
  width: 50,
  height: 50
};
```

**⚠️ Note:** Remote images must have proper CORS headers.

### 3. Base64 Encoded Image

```typescript
const logoConfig = {
  imageSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADI' +
               'AAAAA4CAIAAABNiN19AAAAqElEQVRIie3YQQqDQAxF0YnIhIk' +
               'QaQ9SEQQK7r1V95OaEIQgQqYpHzLR.....',  // Base64 string
  width: 50,
  height: 50
};
```

### 4. SVG Format

```typescript
const logoConfig = {
  imageSource: `
    <svg width="50" height="50" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#1976D2"/>
      <text x="50" y="60" text-anchor="middle" fill="white">Logo</text>
    </svg>
  `,
  width: 50,
  height: 50
};
```

---

## Error Correction & Data Encoding

QR codes include built-in error correction to handle damage or obstruction.

### Error Correction Levels

| Level | Recovery | Use Case |
|-------|----------|----------|
| **L (LOW)** | 7% | Clean environments |
| **M (MEDIUM)** | 15% | Standard usage (recommended) |
| **Q (QUARTILE)** | 25% | Outdoor/harsh conditions |
| **H (HIGH)** | 30% | Very harsh environments, damaged barcodes |

**Note:** Component uses MEDIUM (15%) by default.

### Data Type Encoding

```typescript
// Numeric (0-9) - Most efficient
qrValue = '1234567890'; // Version 1 can hold 41 digits

// Alphanumeric (0-9, A-Z, space, special)
qrValue = 'EXAMPLE123'; // Version 1 can hold 25 chars

// Byte (UTF-8, all characters)
qrValue = 'hello@world.com'; // Version 1 can hold 17 bytes

// QR code auto-selects most efficient encoding
```

---

## Dynamic QR Codes

Update QR code content at runtime based on user input or events.

### Real-time QR Generator

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dynamic-qr',
  template: `
    <div class="qr-generator">
      <label>
        Enter text or URL:
        <input 
          type="text" 
          [(ngModel)]="userInput"
          (keyup)="onInputChange()">
      </label>

      <ejs-barcodegenerator 
        type="QRCode" 
        [value]="qrValue"
        [displayText]="{ text: userInput || 'Scan me', visibility: true }"
        width="250px" 
        height="250px">
      </ejs-barcodegenerator>

      <p>Data: {{ qrValue }}</p>
      <p>Size: {{ getDataSize() }} bytes</p>
    </div>
  `
})
export class DynamicQRComponent {
  userInput = 'https://example.com';
  qrValue = 'https://example.com';

  onInputChange() {
    this.qrValue = this.userInput || '';
  }

  getDataSize() {
    return new Blob([this.qrValue]).size;
  }
}
```

### URL Parameter QR

```typescript
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class URLQRComponent implements OnInit {
  qrValue!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.qrValue = `https://mystore.com/product/${productId}`;
  }
}
```

---

## Common QR Code Patterns

### Pattern 1: App Download Link

```typescript
// iOS App Store Link
const appStoreQR = 'https://apps.apple.com/app/myapp/id123456789';

// Google Play Link
const playStoreQR = 'https://play.google.com/store/apps/details?id=com.myapp';

// Generic App Link (redirects based on device)
const appLink = 'https://myapp.com/download';
```

### Pattern 2: vCard (Contact Info)

```typescript
const contactQR = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1-555-123-4567
EMAIL:john@example.com
ORG:Acme Corp
END:VCARD`;
```

### Pattern 3: WiFi Connection

```typescript
const wifiQR = 'WIFI:T:WPA;S:NetworkName;P:Password123;;';
```

### Pattern 4: Event Registration

```typescript
const eventQR = 'https://events.com/register?event=2026-conf&pass=' + ticketCode;
```

---

## Next Steps

- For linear barcodes, see [linear-barcodes.md](linear-barcodes.md)
- For Data Matrix, see [data-matrix-barcodes.md](data-matrix-barcodes.md)
- To customize appearance, see [customization.md](customization.md)
- To export barcodes, see [exporting-barcodes.md](exporting-barcodes.md)
