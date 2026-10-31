# QR Code Generation & Customization

Create and customize 2D QR codes with Syncfusion's QRCodeGenerator. Learn about versions, error correction, logos, and dynamic sizing.

## Table of Contents

- [QR Code Basics](#qr-code-basics)
- [Creating QR Codes](#creating-qr-codes)
- [QR Code Versions](#qr-code-versions)
- [Error Correction](#error-correction)
- [Display Text](#display-text)
- [Adding Logos](#adding-logos)
- [Dynamic Sizing](#dynamic-sizing)
- [Use Cases](#use-cases)

---

## QR Code Basics

A QR Code is a 2D barcode consisting of black and white squares arranged in a square grid. QR codes can encode:
- **Numeric:** 0-9 (up to 7,089 characters)
- **Alphanumeric:** A-Z, 0-9, space, and 9 symbols (up to 4,296 characters)
- **Byte:** Full 256 ASCII (up to 2,953 bytes)
- **Kanji:** JIS8 Japanese characters (up to 1,852 characters)

QR codes are designed for industrial and consumer use, commonly seen on product packaging, business cards, event tickets, and marketing materials.

---

## Creating QR Codes

### Basic QR Code

```typescript
import { QRCodeGenerator } from '@syncfusion/ej2-barcode-generator';

const qrCode = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'Syncfusion',
    mode: 'SVG',
    displayText: { visibility: false }
});

qrCode.appendTo('#qrcode');
```

**Key Properties:**
- `width` / `height`: Square dimensions (QR codes are always square)
- `value`: Data to encode (URLs, contact info, text)
- `mode`: 'SVG' (recommended) or 'Canvas'
- `displayText`: Set `visibility: false` to hide encoded text below

### QR Code with URL

```typescript
const qrCode = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'syncfusion',
    mode: 'SVG',
    displayText: { visibility: false }
});

qrCode.appendTo('#qrcode');
```

When scanned, navigates to the URL.

### QR Code with Contact Info (vCard)

```typescript
const vcard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1-555-123-4567
EMAIL:john@example.com
END:VCARD`;

const qrCode = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: vcard,
    mode: 'SVG',
    displayText: { visibility: false }
});

qrCode.appendTo('#qrcode');
```

Scanning adds contact to phone.

---

## QR Code Versions

QR codes use "versions" that define the grid size and data capacity:

| Version | Grid Size | Module Size | Numeric Capacity |
|---------|-----------|-------------|------------------|
| 1 | 21×21 | Smallest | ~42 digits |
| 2 | 25×25 | | ~77 digits |
| 5 | 37×37 | | ~154 digits |
| 10 | 57×57 | | ~334 digits |
| 20 | 97×97 | | ~1,000 digits |
| 40 | 177×177 | Largest | ~7,089 digits |

**Automatic Version Selection (Recommended):**

```typescript
// Library automatically selects version based on data length
const qrCode = new QRCodeGenerator({
    value: longDataString,  // Auto selects v1-v40 based on length
    width: '200px',
    height: '200px'
});
```

The QR code automatically scales to the smallest version that fits your data.

**Manual Version Control:**

If you need to force a specific version:

```typescript
// Property available via advanced config
// Check Syncfusion documentation for version property
const qrCode = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'Small Data'
    // Version auto-selected to v1 for small data
});
```

**Practical Sizing:**
- **Small data (< 25 chars):** Version 1-2, 21×21 to 25×25 modules
- **Medium data (25-100 chars):** Version 5-10, 37×37 to 57×57 modules
- **Large data (> 100 chars):** Version 15+, 89×89+ modules

---

## Error Correction

QR codes include error correction so they remain scannable even if partially damaged or obscured (up to 30% damage).

Four error correction levels:

```typescript
import { QRCodeGenerator, ErrorCorrectionLevel } from '@syncfusion/ej2-barcode-generator';

// Level 0: Low (7% recovery)
const qr = new QRCodeGenerator({
    errorCorrectionLevel: 0,
    value: 'Data',
    width: '200px',
    height: '200px'
});

// Level 1: Medium (15% recovery)
const qr = new QRCodeGenerator({
    errorCorrectionLevel: 1,
    value: 'Data',
    width: '200px',
    height: '200px'
});

// Level 2: Quarter/Medium-High (25% recovery)
const qr = new QRCodeGenerator({
    errorCorrectionLevel: 2,
    value: 'Data',
    width: '200px',
    height: '200px'
});

// Level 3: High (30% recovery)
const qr = new QRCodeGenerator({
    errorCorrectionLevel: 3,
    value: 'Data',
    width: '200px',
    height: '200px'
});
```

**When to Use Each Level:**

- **Level 0 (Low):** Clean printing environment, minimal damage risk
- **Level 1 (Medium):** Standard use (default), good balance
- **Level 2 (Quarter):** Moderate risks (outdoor, printed materials)
- **Level 3 (High):** High-risk environments (worn packaging, logos)

**With Logo:**

```typescript
// When adding a logo, increase error correction to High
const qr = new QRCodeGenerator({
    errorCorrectionLevel: 3,  // HIGH - required for logo
    value: 'https://www.syncfusion.com',
    width: '200px',
    height: '200px',
    logo: {
        imageSource: 'logo.png',
        width: 30,
        height: 30
    }
});
```

---

## Display Text

Control the text displayed below the QR code:

```typescript
// Hide text (most common for QR codes)
const qr = new QRCodeGenerator({
    displayText: { visibility: false },
    value: 'Syncfusion',
    width: '200px',
    height: '200px'
});

// Show encoded text
const qr = new QRCodeGenerator({
    displayText: { visibility: true },
    value: 'Syncfusion',
    width: '200px',
    height: '200px'
    // Shows "Syncfusion" below QR code
});

// Custom text
const qr = new QRCodeGenerator({
    displayText: {
        visibility: true,
        text: 'Visit our website'
    },
    value: 'https://www.syncfusion.com',
    width: '200px',
    height: '200px'
});

// Custom font
const qr = new QRCodeGenerator({
    displayText: {
        visibility: true,
        text: 'Scan here',
        font: { size: '14px', color: '#0066cc' }
    },
    value: 'https://www.syncfusion.com',
    width: '200px',
    height: '200px'
});
```

---

## Adding Logos

Enhance QR codes with logos or icons for branding:

```typescript
import { QRCodeGenerator } from '@syncfusion/ej2-barcode-generator';

const qr = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'https://www.syncfusion.com',
    mode: 'SVG',
    errorCorrectionLevel: 3,  // HIGH - required for logo
    logo: {
        imageSource: 'https://www.syncfusion.com/web-stories/wp-content/uploads/sites/2/2022/02/cropped-Syncfusion-logo.png',
        width: 30,
        height: 30
    }
});

qr.appendTo('#qrcode');
```

### Logo Configuration

```typescript
logo: {
    // Image source: local path, remote URL, or Base64
    imageSource: 'logo.png',  // Local file
    // imageSource: 'https://example.com/logo.png',  // Remote URL
    // imageSource: 'data:image/png;base64,...',  // Base64 encoded
    
    width: 30,   // In pixels (30% of QR code max)
    height: 30,  // In pixels (30% of QR code max)
}
```

**Image Source Types:**

1. **Local File Path:**
   ```typescript
   imageSource: 'assets/logo.png'
   ```

2. **Remote URL:**
   ```typescript
   imageSource: 'https://example.com/logos/brand.png'
   ```

3. **Base64 Encoded:**
   ```typescript
   imageSource: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...'
   ```

**Size Constraints:**
- Maximum: 30% of QR code dimensions
- Recommended: 30 pixels for 200px QR codes
- Must maintain aspect ratio

**Best Practices:**
- Use high error correction level (3=High)
- Keep logo simple and recognizable
- Test scanability after adding logo
- Use PNG or SVG for transparency
- Keep logo centered and proportional

---

## Dynamic Sizing

Adjust QR code size for different media:

```typescript
// Small display (mobile)
const mobileQR = new QRCodeGenerator({
    width: '100px',
    height: '100px',
    value: 'https://www.syncfusion.com'
});

// Standard size (prints, labels)
const standardQR = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'https://www.syncfusion.com'
});

// Large display (posters, signage)
const largeQR = new QRCodeGenerator({
    width: '400px',
    height: '400px',
    value: 'https://www.syncfusion.com'
});

// Responsive sizing
const responsiveQR = new QRCodeGenerator({
    width: '100%',  // Fill container
    height: '100%', // Maintain square aspect
    value: 'https://www.syncfusion.com'
});
```

**Scanning Distance Guidelines:**
- 100px QR → Scan from ~10cm away
- 200px QR → Scan from ~20cm away (standard)
- 400px QR → Scan from ~40cm away

---

## Use Cases

### 1. Event Ticketing

```typescript
const eventQR = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'ticket-id-ABC123|event-conference-2024|seat-A1',
    mode: 'SVG',
    displayText: { visibility: false }
});
```

### 2. Product Information Link

```typescript
const productQR = new QRCodeGenerator({
    width: '150px',
    height: '150px',
    value: 'https://products.example.com/detail/SKU123',
    logo: {
        imageSource: 'brands/company-logo.png',
        width: 25,
        height: 25
    },
    errorCorrectionLevel: 2
});
```

### 3. WiFi Sharing

```typescript
const wifiQR = new QRCodeGenerator({
    width: '200px',
    height: '200px',
    value: 'WIFI:T:WPA;S:NetworkName;P:Password;;',
    mode: 'SVG',
    displayText: { text: 'Scan to connect to WiFi' }
});
```

### 4. Business Card Contact

```typescript
const contactQR = new QRCodeGenerator({
    width: '100px',
    height: '100px',
    value: 'BEGIN:VCARD...END:VCARD',  // vCard format
    mode: 'SVG',
    displayText: { visibility: false }
});
```

### 5. Payment QR Code

```typescript
const paymentQR = new QRCodeGenerator({
    width: '250px',
    height: '250px',
    value: 'upi://pay?pa=user@bank&pn=Name&am=100',
    errorCorrectionLevel: 2,
    displayText: { visibility: false }
});
```

---

## Troubleshooting

**Issue:** "QR code won't scan"
- Check: Data not too long for version
- Increase: Error correction level
- Verify: Sufficient contrast (black on white)
- Ensure: Minimum size ~2cm × 2cm

**Issue:** "QR code too large, data won't fit"
- Shorten: The data string
- Use: URL shortener (bit.ly, tinyurl.com)
- Increase: QR code size (decreases density)

**Issue:** "Logo obscures data"
- Increase: Error correction to High (level 3)
- Reduce: Logo size to <= 30%
- Ensure: Good contrast between logo and background

---

## Next Steps

Customize colors and styling using [Customization & Styling](customization-styling.md) or export QR codes using [Export & Printing](export-printing.md).
