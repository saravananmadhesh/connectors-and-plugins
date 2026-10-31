# Linear Barcodes (Code39, Code128, Codabar, etc.)

## Table of Contents
- [Overview](#overview)
- [Barcode Types Comparison](#barcode-types-comparison)
- [Code39 (Basic Alphanumeric)](#code39-basic-alphanumeric)
- [Code39 Extended (Full ASCII)](#code39-extended-full-ascii)
- [Code128 (High-Density Standard)](#code128-high-density-standard)
- [Code128 Character Sets](#code128-character-sets)
- [Code11 (Telecommunications)](#code11-telecommunications)
- [Codabar (Library & Medical)](#codabar-library--medical)
- [Code32 (Pharmaceutical)](#code32-pharmaceutical)
- [Code93 & Code93 Extended](#code93--code93-extended)
- [Choosing the Right Type](#choosing-the-right-type)
- [Character Set Reference](#character-set-reference)

---

## Overview

Linear barcodes are one-dimensional symbologies used for retail, inventory, and industrial applications. Each type has specific strengths in terms of character set, error correction, and industry adoption.

**Key characteristics:**
- Single-row encoding (horizontal bars and spaces)
- Automatic checksums for data validation
- Industry-standard support across all barcode scanners
- Variable-length data (type-dependent)
- Different character set limitations per type

---

## Barcode Types Comparison

| Type | Character Set | Use Case | Industry Standard | Max Length |
|------|---------------|----------|------------------|------------|
| **Code39** | 0-9, A-Z, special chars | General purpose | Retail, warehouse | ~43 chars |
| **Code39 Extended** | Full ASCII | Legacy systems, special chars | Industrial | ~43 chars |
| **Code128** | Full ASCII | Retail default, high-density | **RETAIL STANDARD** | Unlimited |
| **Code11** | 0-9, dash (-) | Telecommunications | Telecom equipment | ~30 chars |
| **Codabar** | 0-9, special chars | Libraries, blood banks | Medical/Library | ~40 chars |
| **Code32** | 8 digits + checksum | Pharmaceutical codes | Pharma/Cosmetics | 8 digits |
| **Code93** | Full ASCII | Improved Code39 | General use | ~47 chars |

---

## Code39 (Basic Alphanumeric)

Code39 is a simple, widely-supported symbology supporting digits 0-9, uppercase A-Z, and select special characters.

### Character Set
Supported: `0-9`, `A-Z`, `-`, `.`, ` ` (space), `$`, `/`, `+`, `%`

**Note:** Code39 doesn't require a checksum digit (one of its strengths for legacy systems).

### Basic Implementation

```html
<ejs-barcodegenerator 
  type="Code39" 
  value="ABC123" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### Component Example

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-barcode',
  template: `
    <div>
    <ejs-barcodegenerator
      type="Code39" 
      [value]="productCode" 
      width="200px" 
      height="120px"
      [displayText]="{ text: 'SKU: ' + productCode, visibility: true }">
    </ejs-barcodegenerator>
    </div>
  `
})
export class BarcodeComponent {
  productCode = 'PRODUCT-001';
}
```

### When to Use Code39

✅ **Use if:**
- Supporting old barcode systems (no checksum needed)
- Need uppercase + numbers + basic punctuation
- Backwards compatibility with legacy equipment
- Simple product identifiers

❌ **Avoid if:**
- Need high data density (Code128 better)
- Require lowercase letters (use Code39 Extended)
- Need full ASCII support (use Code128)

---

## Code39 Extended (Full ASCII)

Code39 Extended encodes the full ASCII character set (lowercase, digits, uppercase, special characters) through two-character combinations.

### Character Set
Supported: Full ASCII (0-127) including lowercase letters, digits, uppercase, punctuation

### Implementation

```html
<ejs-barcodegenerator
  type="Code39Extension" 
  value="lowercase-123-special@chars" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### TypeScript Component

```typescript
export class ExtendedBarcodeComponent {
  // Full ASCII support allows lowercase and special chars
  serialNumber = 'SN-2026-abc-123@temp.org';

  generateBarcode() {
    // Extended Code39 encodes the full string
    return this.serialNumber;
  }
}
```

### When to Use Code39 Extended

✅ **Use if:**
- Need full ASCII character set
- Encoding email addresses or URLs
- Require lowercase letters
- Working with text data

❌ **Avoid if:**
- Data includes Tab/Control characters
- Binary data encoding needed
- Higher data density required

---

## Code128 (High-Density Standard)

Code128 is the retail standard, supporting full ASCII with high data density and built-in checksum validation.

### Advantages

- **High density:** Encodes 3-4 times more data than Code39 in same space
- **Full ASCII:** All 128 ASCII characters
- **Automatic checksum:** Built-in error detection
- **Industry standard:** Universally supported in retail

### Character Sets (Optimizes Density)

Code128 uses 3 switchable character sets to maximize efficiency:

#### Code Set A (ASCII 0-95)
Uppercase letters, digits, punctuation, control characters

```html
<!-- Code Set A encoding -->
<ejs-barcodegenerator 
  type="Code128" 
  value="UPPERCASE123+CONTROL" 
  width="180px" 
  height="100px">
</ejs-barcodegenerator>
```

#### Code Set B (ASCII 32-127)
Uppercase, lowercase, digits, punctuation

```html
<!-- Code Set B encoding (default) -->
<ejs-barcodegenerator 
  type="Code128" 
  value="Mixed-Case-123-Data" 
  width="180px" 
  height="100px">
</ejs-barcodegenerator>
```

#### Code Set C (00-99 pairs)
Numeric pairs for ultra-high density numeric encoding

```typescript
// Code Set C optimizes pure numeric data
// "12345678" encodes as 4 pairs instead of 8 characters
const numericCode = "12345678"; // 8 digits as 4 pairs
```

### Basic Implementation

```html
<ejs-barcodegenerator
  type="Code128" 
  value="SKU-123456-ABC-789" 
  width="200px" 
  height="150px"
  [displayText]="{ text: 'Product SKU', visibility: true }">
</ejs-barcodegenerator>
```

### Component with Dynamic Values

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-retail-barcode',
  template: `
    <div class="product">
      <input placeholder="Enter SKU" [(ngModel)]="sku">
      
      <ejs-barcodegenerator
        type="Code128" 
        [value]="sku" 
        width="220px" 
        height="140px"
        [displayText]="{ text: 'SKU: ' + sku, visibility: true }">
      </ejs-barcodegenerator>
    </div>
  `
})
export class RetailBarcodeComponent {
  sku = 'SKU-2026-001-ABC';
}
```

### When to Use Code128

✅ **Use if:**
- Building retail/e-commerce systems (INDUSTRY STANDARD)
- Need high data density
- Encoding mixed alphanumeric data
- Data will be scanned by retail equipment

❌ **Avoid if:**
- Supporting very old legacy systems (Code39 better)
- Only encoding numeric data (GTIN-13 specialized barcode better)

---

## Code11 (Telecommunications)

Code11 was designed for telecommunications equipment labeling. Limited to digits and hyphen only.

### Character Set
Supported: `0-9`, `-` (dash)

### Implementation

```html
<ejs-barcodegenerator 
  type="Code11" 
  value="0512874569" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### Telecom Equipment Example

```typescript
export class TelecomBarcodeComponent {
  // Equipment serial with only digits and hyphens
  equipmentSerial = '05-128-74-569';
  
  generateLabel() {
    return this.equipmentSerial;
  }
}
```

### When to Use Code11

✅ **Use if:**
- Labeling telecommunications equipment
- Inventory system for telecom/networking gear
- Only digits and hyphens in data

❌ **Avoid if:**
- General purpose use (Code128 better)
- Need to encode letters
- Retail/commerce systems

---

## Codabar (Library & Medical)

Codabar is for specialized applications like libraries, blood banks, and package delivery with specific start/stop characters.

### Character Set
Supported: `0-9`, `-`, `$`, `:`, `/`, `.`, `+`, and special A-D start/stop

### Implementation

```html
<ejs-barcodegenerator 
  type="Codabar" 
  value="A123456789B" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### Medical Tracking Example

```typescript
export class BloodBankBarcodeComponent {
  // Blood bank donation tracking
  donationID = 'A567890123B'; // A-D start/stop chars
  
  generateLabel() {
    return this.donationID;
  }
}
```

### Start/Stop Characters

Codabar requires a start character (A, B, C, D) and matching stop character:

```html
<!-- Valid: A-B or C-D pairing -->
<ejs-barcodegenerator type="Codabar" value="A123B">
<ejs-barcodegenerator type="Codabar" value="C456D">

<!-- Each side has specific character set -->
<!-- A/B start: data range, C/D start: different range -->
```

### When to Use Codabar

✅ **Use if:**
- Library book tracking
- Blood bank/medical specimen tracking
- Package delivery services
- Industry specifically uses Codabar

❌ **Avoid if:**
- General retail (Code128 better)
- No special start/stop requirement

---

## Code32 (Pharmaceutical)

Code32 is specifically for Italian pharmaceutical codes with a mandated 9-character structure (prefix + 8 digits + auto-checksum).

### Required Format

- **Position 1:** 'A' prefix (not encoded in barcode)
- **Positions 2-9:** 8-digit Pharmacode
- **Position 10:** Auto-calculated checksum (displayed in barcode)

### Implementation

```html
<ejs-barcodegenerator 
  type="Code32" 
  value="12345678" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### Pharmaceutical Tracking

```typescript
export class PharmaBarcodeComponent {
  generatePharmacodeBarcode(productCode: string) {
    // Input: "123456" (6 digits) -> Prefix with zeros
    // Becomes: "00123456" (8 digits)
    // Checksum automatically added
    const pharmacode = productCode.padStart(8, '0');
    
    return pharmacode; // System auto-adds checksum
  }

  ngOnInit() {
    const result = this.generatePharmacodeBarcode('123456');
    // Result barcode encodes: "00123456" + auto-checksum
  }
}
```

### When to Use Code32

✅ **Use if:**
- Pharmaceutical/cosmetics labeling (Italian standard)
- Pharmacode encoding required
- Medical/healthcare product tracking
- Industry regulatory requirement

❌ **Avoid if:**
- Non-pharmaceutical use
- Not Italian standard requirement
- General product barcodes

---

## Code93 & Code93 Extended

Code93 is an improved version of Code39 with higher data density and additional security.

### Code93

Supports full ASCII through character combinations, similar to Code39 Extended but with more efficient encoding.

```html
<ejs-barcodegenerator 
  type="Code93" 
  value="ABC123-TEST" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### Code93 Extended

Full 128 ASCII character support:

```html
<ejs-barcodegenerator
  type="Code93Extension" 
  value="lowercase@symbols#123" 
  width="200px" 
  height="120px">
</ejs-barcodegenerator>
```

### When to Use Code93

✅ **Use if:**
- Improving upon Code39 density
- Need all ASCII characters
- Enhanced security features desired

❌ **Avoid if:**
- Retail standard needed (Code128 better)
- Legacy Code39 support required

---

## Choosing the Right Type

### Decision Tree

**Q: What's your primary use case?**

1. **Retail/E-commerce?** → **Code128**
   - Industry standard, high density, full ASCII

2. **Legacy system compatibility?** → **Code39 or Code39Extended**
   - Older equipment often supports Code39

3. **Telecommunications?** → **Code11**
   - Specialized for telecom equipment

4. **Medical/Library?** → **Codabar**
   - Blood banks, libraries, tracking

5. **Pharmaceutical/Cosmetics?** → **Code32**
   - Italian pharma standard

6. **Improved Code39 needed?** → **Code93**
   - Better density than Code39

### Data Type Guide

| Data Type | Recommended | Reason |
|-----------|-------------|--------|
| Uppercase + numbers | Code39, Code128 | Simple encoding |
| Mixed case + numbers | Code128, Code93 Extended | Full ASCII |
| Only numbers + hyphens | Code11 | Specialized |
| Library/Medical | Codabar | Industry standard |
| Pharma/Cosmetics | Code32 | Regulatory requirement |

---

## Industry-Specific Implementations

### Retail: Product Labeling (Code128)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-label',
  template: `
    <div class="product-label" *ngFor="let product of products">
      <ejs-barcodegenerator
        type="Code128"
        [value]="product.sku"
        [displayText]="{ text: 'SKU: ' + product.sku, visibility: true }"
        width="150px"
        height="100px"
        foreColor="#000000"
        backgroundColor="#FFFFFF">
      </ejs-barcodegenerator>

      <p>{{ product.name }}</p>
      <p>\${{ product.price }}</p>
    </div>
  `,
  styles: [`
    .product-label {
      border: 1px solid #ccc;
      padding: 10px;
      width: 200px;
    }
  `]
})
export class ProductLabelComponent {
  products = [
    { sku: '5901234123457', name: 'Wireless Mouse', price: 24.99 },
    { sku: '5902876543210', name: 'USB Hub', price: 34.99 }
  ];
}
```

### Pharmaceutical: Medication Packaging (Code32)

```typescript
  // Code32 is mandatory for Italian pharma regulations
  // Format: A + 8 digits + auto checksum = 10 chars total
  
 import { Component } from '@angular/core';

@Component({
  selector: 'app-pharma-label',
  template: `
    <div class="pharma-label">
      <ejs-barcodegenerator
        type="Code32"
        [value]="medicationBatch.code"
        [displayText]="{ text: 'Batch: ' + medicationBatch.batch, visibility: true }"
        width="120px"
        height="80px"
        foreColor="#2C3E50">
      </ejs-barcodegenerator>

      <p><strong>{{ medicationBatch.name }}</strong></p>
      <p>{{ medicationBatch.batch }} | EXP: {{ medicationBatch.expiry }}</p>
    </div>
  `,
  styles: [`
    .pharma-label {
      border: 2px solid #27AE60;
      padding: 15px;
      width: 200px;
      font-size: 12px;
    }
  `]
})
export class PharmaLabelComponent {
  medicationBatch = {
    code: '00123456', // ✅ exactly 8 digits
    name: 'Acetaminophen 500mg',
    batch: 'BAT2026031',
    expiry: '2027-03-15'
  };
}
```

### Healthcare: Medical Records (Codabar)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-medical-record',
  template: `
    <div class="medical-record">
      <h3>Patient Label</h3>

      <ejs-barcodegenerator
        type="Codabar"
        [value]="'A' + patientRecord.mrn + 'B'"
        [displayText]="{ text: 'MRN: ' + patientRecord.mrn, visibility: true }"
        width="150px"
        height="80px"
        foreColor="#C0392B">
      </ejs-barcodegenerator>

      <p><strong>{{ patientRecord.name }}</strong></p>
      <p>Blood Type: {{ patientRecord.bloodType }} | {{ patientRecord.facility }}</p>
    </div>
  `,
  styles: [`
    .medical-record {
      border: 3px solid #C0392B;
      padding: 15px;
      width: 220px;
    }
  `]
})
export class MedicalRecordComponent {
  patientRecord = {
    mrn: '123456789',
    name: 'Jane Doe',
    bloodType: 'O+',
    facility: 'Central Hospital'
  };
}
```

### Telecommunications: Equipment Tracking (Code11)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-telecom-label',
  template: `
    <div class="telecom-label">
      <ejs-barcodegenerator
        type="Code11"
        [value]="equipment.serialNumber"
        [displayText]="{ text: 'SN: ' + equipment.serialNumber, visibility: true }"
        width="180px"
        height="90px"
        foreColor="#274E7F">
      </ejs-barcodegenerator>

      <p><strong>{{ equipment.type }}</strong></p>
      <p>{{ equipment.vendor }} | Installed: {{ equipment.installDate }}</p>
    </div>
  `,
  styles: [`
    .telecom-label {
      border: 2px dashed #274E7F;
      padding: 12px;
      width: 220px;
    }
  `]
})
export class TelecomLabelComponent {
  equipment = {
    serialNumber: '9876543210-5',
    type: 'Router Model X2000',
    vendor: 'NetworkTech Inc',
    installDate: '2025-06-01'
  };
}
```

### Logistics: Shipment Tracking (Code39 Extended)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-shipping-label',
  template: `
    <div class="shipping-label">
      <ejs-barcodegenerator
        type="Code39Extension"
        [value]="shipment.trackingId"
        [displayText]="{ text: shipment.trackingId, visibility: true }"
        width="200px"
        height="100px"
        foreColor="#1A5490"
        [margin]="{ left: 10, right: 10, top: 10, bottom: 10 }">
      </ejs-barcodegenerator>

      <p><strong>{{ shipment.origin }} → {{ shipment.destination }}</strong></p>
      <p>Weight: {{ shipment.weight }} | Status: {{ shipment.status }}</p>
    </div>
  `,
  styles: [`
    .shipping-label {
      border: 1px solid #1A5490;
      padding: 15px;
      width: 240px;
    }
  `]
})
export class ShippingLabelComponent {
  shipment = {
    trackingId: 'TRACK-20260321-ABC123',
    origin: 'Warehouse NYC',
    destination: 'Distribution Center LA',
    weight: '15kg',
    status: 'In Transit'
  };
}
```

### Library/Archives: Asset Management (Codabar)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-archive-asset',
  template: `
    <div class="archive-label">
      <ejs-barcodegenerator
        type="Codabar"
        [value]="'A' + sanitizedId + 'B'"
        [displayText]="{ text: 'ID: ' + asset.uuid, visibility: true }"
        width="160px"
        height="80px"
        foreColor="#6B4423">
      </ejs-barcodegenerator>

      <p><strong>{{ asset.title }}</strong></p>
      <p>{{ asset.section }} | {{ asset.condition }}</p>
    </div>
  `,
  styles: [`
    .archive-label {
      background: #FAF4ED;
      border: 2px solid #6B4423;
      padding: 12px;
      width: 220px;
    }
  `]
})
export class ArchiveAssetComponent {
  asset = {
    uuid: '4529-1234-5678-9876',
    title: 'Historical Documents Collection',
    section: 'Archive-001',
    condition: 'Preserved'
  };

  get sanitizedId(): string {
    return this.asset.uuid.replace(/[^0-9\\-\\$:\\/\\.\\+]/g, '');
  }
}
```

---

## Character Set Reference

### Code39 vs Code39 Extended

```
CODE39 SET: 0-9 A-Z - . $ / + % space
CODE39 EXTENDED: Full ASCII 0-127
```

### Code128 Sets

```
SET A (ASCII 0-95):  Uppercase, digits, punctuation, control
SET B (ASCII 32-127): uppercase, lowercase, digits, punctuation
SET C (00-99):       Numeric pairs (ultra-compact)
```

### Codabar

```
DATA: 0-9 - $ : / . +
START/STOP: A B C D
Valid pairs: A-B or C-D
```

---

## Next Steps

- For QR codes, see [qr-codes.md](qr-codes.md)
- For Data Matrix, see [data-matrix-barcodes.md](data-matrix-barcodes.md)
- To customize appearance, see [customization.md](customization.md)
- To export barcodes, see [exporting-barcodes.md](exporting-barcodes.md)
