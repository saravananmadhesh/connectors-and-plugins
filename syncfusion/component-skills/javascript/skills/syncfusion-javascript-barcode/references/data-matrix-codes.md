# Data Matrix Barcodes

Create and configure 2D Data Matrix barcodes for industrial labeling, inventory management, and high-density encoding.

## Table of Contents

- [Data Matrix Overview](#data-matrix-overview)
- [Creating Data Matrix Codes](#creating-data-matrix-codes)
- [Encoding Types](#encoding-types)
- [Size Selection](#size-selection)
- [Display Text](#display-text)
- [Color Customization](#color-customization)
- [Use Cases](#use-cases)

---

## Data Matrix Overview

Data Matrix is a 2D barcode symbology consisting of dark and light dots arranged in a square or rectangular pattern. It's designed for small-scale applications where:
- Space is limited (very compact)
- High data density is needed
- Industrial/manufacturing labeling is required
- Tracking and traceability are critical

**Key Characteristics:**
- **Density:** Extremely compact (encodes same data in ~35% less space than QR)
- **Data Capacity:** Up to 3,116 numeric digits or 2,335 alphanumeric characters
- **Sizes:** 10×10 to 144×144 modules
- **Industry Standard:** ISO/IEC 16022, widely used in healthcare, aerospace, and retail
- **Readable Orientation:** Works at any angle (360° rotatable)

---

## Creating Data Matrix Codes

### Basic Data Matrix

```typescript
import { DataMatrixGenerator } from '@syncfusion/ej2-barcode-generator';

const dataMatrix = new DataMatrixGenerator({
    width: '200px',
    height: '200px',
    value: 'Syncfusion',
    mode: 'SVG',
    displayText: { visibility: false }
});

dataMatrix.appendTo('#datamatrix');
```

### Numeric Data

```typescript
const dataMatrix = new DataMatrixGenerator({
    width: '150px',
    height: '150px',
    value: '123456789012345',  // Pure numeric: most efficient
    mode: 'SVG'
});

dataMatrix.appendTo('#datamatrix');
```

### Alphanumeric Data

```typescript
const dataMatrix = new DataMatrixGenerator({
    width: '200px',
    height: '150px',
    value: 'SYNCFUSION-2024',  // Letters + numbers
    mode: 'SVG'
});

dataMatrix.appendTo('#datamatrix');
```

### Special Characters

```typescript
const dataMatrix = new DataMatrixGenerator({
    width: '200px',
    height: '200px',
    value: 'Product#SKU-123|Batch:ABC',  // Special chars increase size slightly
    mode: 'SVG'
});

dataMatrix.appendTo('#datamatrix');
```

---

## Encoding Types

Data Matrix supports different encoding schemes affecting size and capacity:

### Numeric (Smallest)

```typescript
// Use for pure numbers: Product codes, quantities, dates
const dataMatrix = new DataMatrixGenerator({
    width: '120px',
    height: '120px',
    value: '20240315123456',  // Date + ID: most compact
    mode: 'SVG'
});
```

**Best For:** Barcodes, serial numbers, production dates

**Capacity:** 3,116 digits

### Alphanumeric

```typescript
// Use for letters + numbers
const dataMatrix = new DataMatrixGenerator({
    width: '150px',
    height: '150px',
    value: 'SYNC-2024-V1',
    mode: 'SVG'
});
```

**Best For:** Product codes with prefixes, batch IDs, SKUs

**Capacity:** 2,335 characters

### Byte (Largest)

```typescript
// Use for full ASCII, lowercase, special chars
const dataMatrix = new DataMatrixGenerator({
    width: '180px',
    height: '180px',
    value: 'info@syncfusion.com',
    mode: 'SVG'
});
```

**Best For:** Email, URLs (though QR better for URLs), complex data

**Capacity:** 1,556 bytes

---

## Size Selection

Data Matrix comes in multiple sizes optimized for different data volumes:

| Size Name | Module Count | Smallest Data | Largest Data | Use Case |
|-----------|--------------|---------------|--------------|----------|
| 10×10 | 100 | 1 char | 10 numeric | Tiny tags, ICs |
| 12×12 | 144 | 2 chars | 32 numeric | Small components |
| 14×14 | 196 | 3 chars | 72 numeric | Component labels |
| 16×16 | 256 | 4 chars | 128 numeric | Standard small |
| 18×18 | 324 | 6 chars | 178 numeric | General purpose |
| 22×22 | 484 | 10 chars | 334 numeric | Flexible |
| 32×32 | 1024 | 31 chars | 1,028 numeric | Document IDs |
| 44×44 | 1936 | 60 chars | 1,911 numeric | Large data |
| 144×144 | 20736 | 500+ chars | 3,116 numeric | Maximum |

**Auto-Sizing (Recommended):**

```typescript
const dataMatrix = new DataMatrixGenerator({
    width: '200px',
    height: '200px',
    value: 'DATA-TO-ENCODE',
    mode: 'SVG'
    // Library automatically selects smallest size that fits
});
```

**Manual Selection Example:**

```typescript
// For known small data, can specify dimensions
const dataMatrix = new DataMatrixGenerator({
    width: '100px',   // ~10×10 to 12×12 modules
    height: '100px',
    value: 'ID123'
});

// For large data sets
const dataMatrix = new DataMatrixGenerator({
    width: '300px',   // ~44×44+ modules
    height: '300px',
    value: 'VERY-LONG-DATA-STRING-WITH-PRODUCT-INFO'
});
```

---

## Display Text

Control text display below the Data Matrix code:

```typescript
// Hide text (common for industrial labels)
const dataMatrix = new DataMatrixGenerator({
    displayText: { visibility: false },
    value: 'SYNC-2024'
});

// Show encoded data as text
const dataMatrix = new DataMatrixGenerator({
    displayText: { visibility: true },
    value: 'SKU-123456',
    width: '150px',
    height: '150px'
});

// Custom label text
const dataMatrix = new DataMatrixGenerator({
    displayText: {
        visibility: true,
        text: 'Product Serial Number'
    },
    value: 'SYNC-2024-SN-1234'
});

// Custom font styling
const dataMatrix = new DataMatrixGenerator({
    displayText: {
        visibility: true,
        text: 'Batch Code',
        font: {
            size: '12px',
            color: '#333333'
        }
    },
    value: 'BATCH-A1B2C3'
});
```

---

## Color Customization

### Forecolor (Barcode Color)

```typescript
// Default: Black
const dataMatrix = new DataMatrixGenerator({
    value: 'SYNCFUSION',
    foreColor: '#000000',  // Black (standard)
    width: '200px',
    height: '200px'
});

// Custom color
const dataMatrix = new DataMatrixGenerator({
    value: 'SYNCFUSION',
    foreColor: '#0066cc',  // Dark blue
    width: '200px',
    height: '200px'
});
```

### Backcolor (Background Color)

```typescript
// Default: White
const dataMatrix = new DataMatrixGenerator({
    value: 'SYNCFUSION',
    foreColor: '#000000',
    backgroundColor: '#ffffff',  // White background
    width: '200px',
    height: '200px'
});

// Different background
const dataMatrix = new DataMatrixGenerator({
    value: 'SYNCFUSION',
    foreColor: '#ffffff',  // White barcode
    backgroundColor: '#0066cc',  // Blue background
    width: '200px',
    height: '200px'
});
```

**Important:** Ensure sufficient contrast for scanability!

| Forecolor | Backcolor | Scannable |
|-----------|-----------|-----------|
| Black | White | ✅ Excellent |
| Dark Blue | White | ✅ Good |
| White | Black | ✅ Good |
| Red | White | ⚠️ Fair (red absorbs) |
| Light Gray | White | ❌ Poor (insufficient contrast) |

---

## Use Cases

### 1. Manufacturing & Traceability

```typescript
// Product serial number on component
const dataMatrix = new DataMatrixGenerator({
    width: '100px',
    height: '100px',
    value: 'MFG-2024-LOT-ABC-SN-001234',
    foreColor: '#000000',
    mode: 'SVG'
});
```

Track products through supply chain, recall management, warranty tracking.

### 2. Healthcare & Pharmaceuticals

```typescript
// Medicine batch and expiration
const dataMatrix = new DataMatrixGenerator({
    width: '150px',
    height: '150px',
    value: '5260002100211|LOT-ABC123|EXP-2025-12-31',
    mode: 'SVG'
});
```

Comply with FDAtraceability requirements, prevent counterfeiting.

### 3. Logistics & Package Labeling

```typescript
// Shipment tracking code
const dataMatrix = new DataMatrixGenerator({
    width: '180px',
    height: '180px',
    value: 'PKG-2024-US-CA-12345678-1',
    displayText: { visibility: true, text: 'Tracking ID' },
    mode: 'SVG'
});
```

Automate parcel sorting, enable barcode scanning at multiple points.

### 4. Asset Management

```typescript
// Fixed asset tag
const dataMatrix = new DataMatrixGenerator({
    width: '120px',
    height: '120px',
    value: 'ASSET-IT-2024-00567',
    mode: 'SVG'
});
```

Track office equipment, machinery, IT inventory with small adhesive labels.

### 5. Document Management

```typescript
// Document identifier
const dataMatrix = new DataMatrixGenerator({
    width: '110px',
    height: '110px',
    value: 'DOC-2024-Q1-12345',
    mode: 'SVG'
});
```

Embed in PDFs, attach to file folders, automate document routing.

### 6. Retail & SKU Labeling

```typescript
// Small product labels
const dataMatrix = new DataMatrixGenerator({
    width: '130px',
    height: '130px',
    value: 'SKU-987654-LOT-A',
    foreColor: '#000000',
    backgroundColor: '#ffffff',
    mode: 'SVG'
});
```

Reduce label size compared to QR codes, meet retailer requirements.

---

## Advantages vs. QR Codes

| Feature | Data Matrix | QR Code |
|---------|-------------|---------|
| Size | Smaller (35% less space) | Larger |
| Data Capacity (same data) | ~1500 chars | ~4000 chars |
| Orientation | 360° readable | any angle |
| Error Correction | Reed-Solomon (40% recovery max) | Golay (30% recovery) |
| Best For | Industrial, small labels | Marketing, mobile scans |
| Readability at Distance | Close range (< 30cm) | Longer range |
| Industry Adoption | Healthcare, manufacturing | Consumer, retail |

---

## Troubleshooting

**Issue:** "Data Matrix too small to scan"
- Solution: Increase width/height above 100px
- Avoid: Printing smaller than 5mm × 5mm

**Issue:** "Cannot read barcode with scanner"
- Check: Barcode size (minimum 10×10 modules)
- Check: Contrast between foreColor and backgroundColor
- Verify: Render mode (SVG recommended for clarity)
- Test: With different barcode reader software

**Issue:** "Data won't fit in Data Matrix"
- Shorten: The data string
- Split: Into multiple Data Matrix codes
- Increase: Width/height to allow larger version

---

## Next Steps

Export Data Matrix codes using [Export & Printing](export-printing.md) or customize appearance further with [Customization & Styling](customization-styling.md).
