# Barcode Types & Selection Guide

Choose the right 1D barcode type for your application. This guide covers all supported linear barcode formats, their character sets, use cases, and when to select each type.

## Table of Contents

- [Overview](#overview)
- [Code39](#code39)
- [Code39 Extended](#code39-extended)
- [Code11](#code11)
- [Codabar](#codabar)
- [Code32](#code32)
- [Code93](#code93)
- [Code93 Extended](#code93-extended)
- [Code128](#code128)
- [Selection Guide](#selection-guide)

---

## Overview

Linear (1D) barcodes encode data as vertical bars and spaces. Each type has different:
- Character set support (numbers, uppercase, lowercase, special chars)
- Density (how much data per unit width)
- Checksum requirements
- Industry standards and use cases

---

## Code39

**Character Set:** Digits (0-9), uppercase letters (A-Z), space, and symbols: `- + . $ / %`

**Checksum Required:** Optional (not required for common use)

**Length:** Variable (no strict limit, but 25+ chars becomes wide)

**Best For:** Inventory, asset tracking, manufacturing

```typescript
import { BarcodeGenerator } from '@syncfusion/ej2-barcode-generator';

const barcode = new BarcodeGenerator({
    width: '200px',
    height: '150px',
    type: 'Code39',
    value: 'SYNCFUSION',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Advantages:**
- Simplest to implement
- Good for legacy systems
- No checksum overhead
- Widely supported in retail

**Disadvantages:**
- Largest physical size for equivalent data
- Uppercase only (standard)
- Symbols limited

**Use Case Example:** Asset tags in warehouses, product labels in legacy systems

---

## Code39 Extended

**Character Set:** All 128 ASCII characters (lowercase a-z, all special characters)

**Checksum Required:** Optional

**Length:** Variable

**Best For:** ASCII data, lowercase text, special characters

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code39Extension',
    value: 'Syncfusion@2024',
    width: '250px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Key Difference:** Code39 Extended represents lowercase and special chars as two-character pairs, making it larger than standard Code39.

**Example:** Email addresses, filenames, mixed-case data

---

## Code11

**Character Set:** Digits (0-9) and dash (`-`)

**Checksum Required:** Automatically calculated (1 or 2 digits)

**Length:** Variable

**Best For:** Telecommunications equipment labeling

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code11',
    value: '112',
    width: '200px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**When to Use:**
- Telecom equipment labels
- Numeric-only data with dash separators
- Legacy systems requiring Code11

**Example:** Equipment IDs: `555-123-456`

---

## Codabar

**Character Set:** Digits (0-9) and symbols: `- $ : / . +`; Start/stop chars: `A B C D`

**Checksum Required:** Yes (automatically calculated)

**Length:** Variable

**Best For:** Libraries, blood banks, package delivery

```typescript
const barcode = new BarcodeGenerator({
    type: 'Codabar',
    value: '123456789',
    width: '200px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Use Cases:**
- **Blood banks:** Specimen tracking
- **Libraries:** Book identification
- **Delivery:** Package tracking
- **Medical:** Patient wristbands

**Key Feature:** Start/stop characters (A, B, C, D) provide directional encoding.

---

## Code32

**Character Set:** 8-digit Pharmacode (numeric only)

**Checksum Required:** Yes (automatically calculated as 9th digit)

**Format:** Italian Pharmacode (standard for pharmaceuticals)

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code32',
    value: '01234567',  // 8 digits, checksum added automatically
    width: '200px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Specialized Use:** Pharmaceutical labeling ONLY

**Input Format:** Prefix with '0' if needed to make 8 digits. The 9th digit (checksum) is auto-calculated.

**Example:** `00123456` → generates Code32 with auto checksum

---

## Code93

**Character Set:** Uppercase (A-Z), digits (0-9), and 7 special chars: `* - $ % (space) . /`

**Checksum Required:** Yes (2 check digits)

**Density:** ~25% more compact than Code39

**Best For:** General-purpose where compactness matters

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code93',
    value: '01234567',
    width: '200px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Advantages Over Code39:**
- More compact (25% smaller)
- Better error checking (2 check digits)
- Improved scanning reliability

**Disadvantages:**
- Less industry adoption than Code39
- Requires additional check digits

**Use Case:** Shipping labels, inventory where space is constrained

---

## Code93 Extended

**Character Set:** All 128 ASCII characters (like Code39 Extended)

**Checksum Required:** Yes (2 check digits)

**Density:** Compact representation with extended ASCII

**Best For:** Complex data (lowercase, special chars) in limited space

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code93',
    value: 'hello@sync',
    width: '250px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

**Key Feature:** Like Code39 Extended, represents non-standard chars as pairs, but with better error checking than Code39.

---

## Code128

**Character Set:** All 128 ASCII characters (full ASCII set)

**Checksum Required:** Yes (1 check digit, automatic)

**Three Code Sets:** A, B, C for different character ranges

**Density:** Highest among linear barcodes (2x denser than Code39)

**Best For:** General-purpose, commercial, most flexible**

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: 'SYNCFUSION',
    width: '200px',
    height: '150px',
    mode: 'SVG'
});

barcode.appendTo('#barcode');
```

### Code128 Code Sets

**Code Set A:** Control chars (ASCII 0-95) + 7 special chars
- Used for: Function codes, control characters
- Contains: Uppercase, digits, punctuation

**Code Set B (Default):** Printable chars (ASCII 32-127) + 7 special chars
- Used for: General text, lowercase, special chars
- Most flexible for typical use

**Code Set C:** Numeric pairs (00-99) + 3 special chars
- Used for: Pure numeric data (2 digits per character)
- Highest density for numbers

### Example: Pure Numeric with Code Set C

```typescript
const barcode = new BarcodeGenerator({
    type: 'Code128',
    value: '1234567890123456',  // 16 digits
    width: '300px',
    height: '150px',
    mode: 'SVG'
    // Code Set C automatically selected for numeric
});

barcode.appendTo('#barcode');
```

**Advantages:**
- Most compact of all linear codes
- Standard in retail/commerce
- Full ASCII support
- Automatic code set selection
- Single check digit

**Use Cases:**
- **Retail:** Product barcodes (UCC-128, GS1-128)
- **Shipping:** Labels, tracking
- **Healthcare:** Medical records
- **E-commerce:** Order numbers, tracking
- **Manufacturing:** Work order codes

**When NOT to Use Code128:**
- Very simple numeric-only data → Use Code11
- Legacy systems requiring Code39 → Use Code39
- Telecom equipment → Use Code11

---

## Selection Guide

Choose your barcode type based on requirements:

| Need | Best Type | Reason |
|------|-----------|--------|
| Numeric only | Code11 | Simplest, smallest |
| Simple alphanumeric | Code39 | Industry standard, simple |
| General text + symbols | Code128 | Most compact, flexible |
| Lowercase/extended ASCII | Code39 Ext or Code128 | Full char support |
| Pharmaceutical | Code32 | Regulatory requirement |
| Medical/Library | Codabar | Industry standard |
| Compact encoding | Code93 | 25% smaller than Code39 |
| Pure numeric, max density | Code128 Set C | 2x denser |

### Quick Decision Tree

1. **Data type?**
   - Numeric only → Code11
   - Numeric + symbols without special chars → Code39
   - Any ASCII (lowercase, symbols) → Code128

2. **Industry?**
   - Retail/Commerce → Code128
   - Pharma → Code32
   - Blood bank/Medical → Codabar
   - Telecom → Code11

3. **Size constraint?**
   - Space limited → Code128 or Code93
   - Standard → Code39 or Code128

4. **Compatibility?**
   - Legacy system → Code39
   - Modern → Code128

---

## Programmatic Type Selection

```typescript
function selectBarcodeType(data: string, requirement: string): string {
    if (requirement === 'pharmaceutical') return 'Code32';
    if (requirement === 'medical') return 'Codabar';
    if (/^[0-9\-]*$/.test(data)) return 'Code11';  // Numeric only
    if (/^[A-Z0-9\s\.\-\+\$\/%]*$/.test(data)) return 'Code39';  // Code39 charset
    return 'Code128';  // Default for full ASCII
}

const barcodeType = selectBarcodeType(productData, 'retail');
const barcode = new BarcodeGenerator({
    type: barcodeType,
    value: productData
});
```

---

## Troubleshooting

**Issue:** "Invalid character in barcode value"
- **Solution:** Check your data against the type's character set
- Use Code128 if unsure (most permissive)

**Issue:** "Barcode too wide"
- **Solution:** Use Code128 (most compact) or split data across multiple barcodes

**Issue:** "Can't read barcode"
- **Solution:** Increase barcode height/width, verify data matches type requirements, check mode (SVG recommended)

---

## What's Next

Once you've selected a type, customize appearance using [Customization & Styling](customization-styling.md) or export using [Export & Printing](export-printing.md).
