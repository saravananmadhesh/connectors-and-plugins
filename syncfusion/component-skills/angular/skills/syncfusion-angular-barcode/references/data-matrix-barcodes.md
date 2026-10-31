# Data Matrix Barcodes

## Table of Contents
- [Data Matrix Overview](#data-matrix-overview)
- [When to Use Data Matrix](#when-to-use-data-matrix)
- [Basic Implementation](#basic-implementation)
- [Dimensions & Sizing](#dimensions--sizing)
- [Customizing Appearance](#customizing-appearance)
- [Display Text](#display-text)
- [Data Encoding](#data-encoding)
- [Industry Applications](#industry-applications)
- [Data Matrix vs QR Code](#data-matrix-vs-qr-code)

---

## Data Matrix Overview

Data Matrix is a two-dimensional barcode symbology consisting of black and white modules (squares) arranged in a simple grid pattern. It encodes data in a compact square or rectangular format, making it ideal for space-constrained applications.

### Key Characteristics

- **2D Symbology:** Grid of dark and light squares (typically square, but rectangular variants exist)
- **High Data Density:** Encodes large amounts of data in small physical space
- **Error Correction:** Reed–Solomon error correction for reliability
- **Variable Sizes:** From 10×10 to 144×144 modules
- **Alphanumeric Support:** Numeric, ASCII, and extended ASCII characters

### Data Matrix Advantages

✅ Compact size (excellent for small labels)  
✅ High data capacity (similar to QR codes)  
✅ Industrial standard (aerospace, pharmaceutical, logistics)  
✅ Printable at small sizes (still scannable)  
✅ Works on low-resolution printers  

---

## When to Use Data Matrix

### Ideal Scenarios

**Healthcare & Pharmaceutical:**
- Medicine packaging and tracking
- Prescription labels
- Medical device identification
- Hospital supply chain tracking

**Manufacturing & Logistics:**
- Component tracking in assembly
- Shipping labels
- Return merchandise authorization (RMA)
- Asset tracking

**Aerospace & Defense:**
- Parts traceability
- Component identification
- Compliance documentation

**Small Item Labeling:**
- Jewelry and watches
- Electronics components
- Part numbers
- Serial numbers

### Data Matrix vs Other Barcodes

| Barcode Type | Best For | Reason |
|--------------|----------|--------|
| **Data Matrix** | Small labels, high-density data | Compact, industrial standard |
| **QR Code** | URLs, mobile scanning | Universal phone recognition |
| **Code128** | Retail products, large labels | Industry standard for retail |

---

## Basic Implementation

### Simplest Data Matrix

```html
<ejs-barcodegenerator 
  type="DataMatrix" 
  value="TRACKING-001" 
  width="120px" 
  height="120px">
</ejs-barcodegenerator>
```

### TypeScript Component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-datamatrix',
  template: `
    <ejs-barcodegenerator 
      type="DataMatrix" 
      [value]="trackingCode" 
      width="150px" 
      height="150px">
    </ejs-barcodegenerator>
  `
})
export class DataMatrixComponent {
  trackingCode = 'TRK-2026-3847-92';
}
```

### Medical Device Tracking

```typescript
export class MedicalDeviceComponent {
  // Device serial + lot number + expiration
  deviceTrackingCode = 'DEV-SN-123456-LOT-789-EXP-2028-06';

  generateTrackingLabel() {
    return this.deviceTrackingCode;
  }
}
```

---

## Dimensions & Sizing

Data Matrix supports multiple size options. Smaller sizes are possible because of high data density.

### Size Guidelines

| Dimension | Scan Distance | Use Case |
|-----------|---------------|----------|
| **50×50px** | Contact / 5cm | Very small labels (jewelry, components) |
| **80×80px** | 10cm | Small product labels, packaging |
| **120×120px** | 20cm | Standard label sizing |
| **150×150px** | 30cm | Large display labels |
| **200×200px** | 50cm | Informational displays |

### Implementation

```html
<!-- Small Data Matrix for tiny labels -->
<ejs-barcodegenerator 
  type="DataMatrix" 
  value="SN123456"
  width="50px" 
  height="50px">
</ejs-barcodegenerator>

<!-- Standard Data Matrix for product labels -->
<ejs-barcodegenerator 
  type="DataMatrix" 

```

### Capacity by Module Size

| Modules | Physical Size | Max Characters | Use Case |
|---------|---------------|-----------------|----------|
| 10×10 | 10mm (very small) | 6 numeric | Component labels |
| 16×16 | 16mm (small) | 13 numeric | Product IDs |
| 32×32 | 32mm (medium) | 64 numeric | Tracking codes |
| 64×64 | 64mm (large) | 256 numeric | Complex data |
| 144×144 | 144mm (very large) | 2,335 numeric | Full documents |

---

## Customizing Appearance

Data Matrix supports color customization similar to other barcode types.

### Color Customization

```html
<!-- Standard black on white -->
<ejs-barcodegenerator 
  type="DataMatrix" 
  value="DATA-999"
  foreColor="#000000"
  backgroundColor="#FFFFFF"
  width="120px" 
  height="120px">
</ejs-barcodegenerator>

<!-- Professional color scheme -->
<ejs-barcodegenerator 
  type="DataMatrix" 
  value="DATA-999"
  foreColor="#1976D2"
  backgroundColor="#F5F5F5"
  width="120px" 
  height="120px">
</ejs-barcodegenerator>

<!-- Dark mode -->
<ejs-barcodegenerator 
  type="DataMatrix" 
  value="DATA-999"
  foreColor="#FFFFFF"
  backgroundColor="#1a1a1a"
  width="120px" 
  height="120px">
</ejs-barcodegenerator>
```

### Component with Theme Selection

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-themed-datamatrix',
  template: `
    <div>
      <select (change)="setTheme($event)">
        <option value="standard">Standard (Black/White)</option>
        <option value="brand">Brand Colors</option>
        <option value="dark">Dark Mode</option>
      </select>

      <ejs-barcodegenerator 
        type="DataMatrix" 
        value="DATA-MATRIX-2026"
        [foreColor]="foreColor"
        [backgroundColor]="backgroundColor"
        width="150px" 
        height="150px">
      </ejs-barcodegenerator>
    </div>
  `
})
export class ThemedDataMatrixComponent {
  foreColor = '#000000';
  backgroundColor = '#FFFFFF';

  setTheme(event: Event) {
    const theme = (event.target as HTMLSelectElement).value;

    if (theme === 'brand') {
      this.foreColor = '#1976D2';
      this.backgroundColor = '#E3F2FD';
    } else if (theme === 'dark') {
      this.foreColor = '#FFFFFF';
      this.backgroundColor = '#1a1a1a';
    } else {
      this.foreColor = '#000000';
      this.backgroundColor = '#FFFFFF';
    }
  }
}

```

### ⚠️ Color Contrast Important

Data Matrix requires good contrast for reliable scanning:
- ✅ **Good:** High contrast between foreground and background
- ❌ **Bad:** Similar brightness levels (won't scan)

---

## Display Text

Display text appears below the Data Matrix barcode for human-readable identification.

### Basic Display Text

```html
<ejs-barcodegenerator 
  type="DataMatrix" 
  value="TRK-123456-789"
  [displayText]="{ text: 'Batch #789', visibility: true }"
  width="120px" 
  height="120px">
</ejs-barcodegenerator>

```

### Display Text Examples

```typescript
// Pharmaceutical batch number
displayText = { text: 'BATCH: 789-2026-Q1', visibility: true };

// Medical device lot
displayText = { text: 'LOT: ABC123 EXP: 2028-06', visibility: true };

// Product serial
displayText = { text: 'SN: 456789', visibility: true };

// Shipment reference
displayText = { text: 'SHIP: 2026-03-21-001', visibility: true };

// Asset ID
displayText = { text: 'ASSET: A-789456', visibility: true };
```

### Dynamic Display Text

```typescript
export class LabeledDataMatrixComponent {
  trackingValue = 'TRK-2026-001';

  displayText = {
    text: 'Batch: BATCH-789',
    visibility: true
  };

  updateBatch(newBatch: string) {
    this.displayText = {
      text: `Batch: ${newBatch}`,
      visibility: true
    };
  }
}
```

```html
<ejs-barcodegenerator
  type="DataMatrix" 
  [value]="trackingValue"
  [displayText]="displayText"
  width="120px" 
  height="120px">
</ejs-barcodegenerator>
```

---

## Data Encoding

Data Matrix supports multiple character sets with automatic encoding optimization:

### Supported Character Sets

| Type | Characters | Example |
|------|-----------|---------|
| **Numeric** | 0-9 | 1234567890 |
| **Alphanumeric** | 0-9, A-Z, space, punctuation | PROD-123-ABC |
| **ASCII** | Full ASCII including lowercase | prod_123_abc@2026 |
| **Extended ASCII** | Control characters, high-ASCII | Binary data, special chars |

### Encoding Examples

```typescript
// Numeric – most efficient
numericData = '123456789';

// Alphanumeric
alphaData = 'PRODUCT-CODE-123';

// Full ASCII
asciiData = 'product-123-abc@example.com';

// Component auto-selects most efficient encoding
```

### Data Capacity

| Data Type | Character Limit | Sample Valid Data |
|-----------|-----------------|-------------------|
| Numeric | 2,335 digits | "1234567890" |
| Alphanumeric | 1,556 chars | "PROD-CODE-123-ABC" |
| ASCII/UTF-8 | 1,024 chars | "product@domain.com" |

---

## Industry Applications

### Healthcare & Pharmaceutical

```typescript
export class PharmaTrackingComponent {
  // Medicine packaging
  medicineTracking = `MED-2026-BATCH-789
                       LOT:789-ABC
                       EXP:2028-06-15
                       SN:PHM-456789`;
  
  // Medical device
  deviceTracking = 'DEVX-SN-123456-LOT-789-REV-A1';
}
```

### Manufacturing & Logistics

```typescript
export class ManufacturingComponent {
  // Component part number
  partTracking = 'PN-A123B456-LOT-001-2026';
  
  // Assembly station
  assemblyStation = 'STATION-02-2026-03-21-00456';
  
  // Quality inspection
  qcPass = 'QC-PASS-LINE-03-2026-03-21';
}
```

### Aerospace & Defense

```typescript
export class AerospaceComponent {
  // Aircraft component
  componentTracking = 'AC-ENG-001-SN-789456-REV-B2';
  
  // Traceability data
  traceability = 'PART-789456-LOT-003-DATE-2026-03-21';
}
```

---

## Data Matrix vs QR Code

### Feature Comparison

| Feature | Data Matrix | QR Code |
|---------|-------------|---------|
| **Shape** | Square/rectangular | Square |
| **Module Density** | Higher | Lower |
| **Scannable Size** | Smaller | Larger |
| **Mobile Recognition** | Scanner needed | Phone camera |
| **Industry Standard** | Manufacturing/Pharma | General/Marketing |
| **Error Correction** | Reed-Solomon | Reed-Solomon |
| **Data Capacity** | Similar | Similar |

### Choose Data Matrix If

✅ Small physical space required (jewelry, components)
✅ Industrial/manufacturing application
✅ Healthcare/pharmaceutical use
✅ Supply chain/logistics tracking
✅ Printable at tiny sizes (5mm×5mm possible)

### Choose QR Code If

✅ Mobile phone scanning required
✅ Marketing/promotional content
✅ Consumer-facing application
✅ URL or contact information
✅ General public scanning expected

### Size Comparison

```
Data Matrix: 5×5mm = 16 data modules (very compact)
QR Code: 10×10mm = 21×21 modules minimum (larger)

For same data, Data Matrix occupies ~4× less space
```

---

## Next Steps

- For QR codes, see [qr-codes.md](qr-codes.md)
- For linear barcodes, see [linear-barcodes.md](linear-barcodes.md)
- To customize appearance, see [customization.md](customization.md)
- To export barcodes, see [exporting-barcodes.md](exporting-barcodes.md)
