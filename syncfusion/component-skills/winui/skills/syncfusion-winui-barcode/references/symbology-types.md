# Symbology Types

The Syncfusion WinUI Barcode control supports 15 different symbology types: 12 one-dimensional (linear) barcodes and 3 two-dimensional barcodes. Each symbology is designed for specific use cases and supports different character sets.

## Table of Contents
- [Understanding Barcode Dimensions](#understanding-barcode-dimensions)
- [One-Dimensional Barcodes](#one-dimensional-barcodes)
  - [Codabar](#codabar)
  - [Code 11](#code-11)
  - [Code 32](#code-32)
  - [Code 39](#code-39)
  - [Code 39 Extended](#code-39-extended)
  - [Code 93](#code-93)
  - [Code 93 Extended](#code-93-extended)
  - [Code 128A](#code-128a)
  - [Code 128B](#code-128b)
  - [Code 128C](#code-128c)
  - [UPC Barcode](#upc-barcode)
  - [GS1 Code128](#gs1-code128)
- [Two-Dimensional Barcodes](#two-dimensional-barcodes)
  - [QR Code](#qr-code)
  - [Data Matrix](#data-matrix)
  - [PDF417](#pdf417)
- [Symbology Selection Guide](#symbology-selection-guide)

## Understanding Barcode Dimensions

### One-Dimensional (1D) Barcodes
Also called **linear barcodes**, these encode data as a series of parallel lines (bars) and spaces with varying widths. Each symbol represents a specific ASCII character.

**Characteristics:**
- Horizontal bars and spaces
- Scanned in one direction (left to right)
- Limited data capacity
- Widely supported by standard barcode scanners
- Best for numeric or short alphanumeric data

### Two-Dimensional (2D) Barcodes
Encode data in both horizontal and vertical directions using squares, dots, or other patterns.

**Characteristics:**
- Matrix of cells or patterns
- Scanned in two dimensions
- High data capacity
- Can include error correction
- Readable by cameras and 2D scanners
- Best for URLs, complex data, or compact encoding

## One-Dimensional Barcodes

### Codabar

**Use Case:** Libraries, blood banks, package delivery, photo labs

**Supported Characters:** `0-9`, `-`, `$`, `:`, `/`, `.`, `+`

**Structure:**
- Each character has 3 bars and 4 spaces
- Start/stop characters: A, B, C, D (not encoded in value)
- Discrete symbology (spaces between characters)

**Implementation:**
```xml
<syncfusion:SfBarcode Value="48625310" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:CodabarBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"A123456B"` - Valid (A and B are start/stop)
- `"12-34/56"` - Valid (digits and special chars)
- `"12.34:56"` - Valid

---

### Code 11

**Use Case:** Telecommunications equipment labeling

**Supported Characters:** `0-9`, `-`

**Structure:**
- 3 bars and 2 spaces per character
- Two wide and three narrow elements OR one wide and four narrow elements
- Includes checksum digits

**Implementation:**
```xml
<syncfusion:SfBarcode Value="12345-67" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code11Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"123456789"` - Valid
- `"12-34-56"` - Valid
- `"ABC123"` - Invalid (alphabetic not supported)

---

### Code 32

**Use Case:** Pharmaceutical coding in Italy (Pharmacode)

**Supported Characters:** `0-9` only

**Structure:**
- Always starts with 'A' prefix (automatically added, not encoded)
- Encodes exactly 8 digits
- Checksum modulo 10 (automatically calculated)
- Based on Code 39

**Implementation:**
```xml
<syncfusion:SfBarcode Value="12345678" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code32Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"12345678"` - Valid (8 digits)
- `"123456"` - Invalid (must be 8 digits)
- `"A12345678"` - Invalid (don't include the 'A' prefix)

**Note:** The displayed barcode will show "A12345678" even though you only provide "12345678".

---

### Code 39

**Use Case:** Automotive, defense, healthcare (HIBC)

**Supported Characters:** `0-9`, `A-Z`, `-`, `.`, `$`, `/`, `+`, `%`, `SPACE`

**Structure:**
- 5 bars and 4 spaces per character (3 wide, 6 narrow)
- Asterisk (*) as start/stop symbol (automatically added)
- No checksum required (optional)

**Implementation:**
```xml
<syncfusion:SfBarcode Value="CODE-39" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"ITEM-123"` - Valid
- `"PART/A-5"` - Valid
- `"CODE 39"` - Valid (space allowed)
- `"item-123"` - Invalid (lowercase not supported)

**Note:** Don't include the asterisk (*) in your value; it's automatically added.

---

### Code 39 Extended

**Use Case:** Extended ASCII support for Code 39 applications

**Supported Characters:** Full ASCII set (0-127), including lowercase `a-z`

**Structure:**
- Uses two-character combinations to encode full ASCII
- Based on Code 39 encoding
- Larger than standard Code 39

**Implementation:**
```xml
<syncfusion:SfBarcode Value="Code39Ext" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code39ExtendedBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"Product-A1"` - Valid
- `"item@123"` - Valid (special chars)
- `"HelloWorld"` - Valid (mixed case)

---

### Code 93

**Use Case:** Improved version of Code 39, logistics

**Supported Characters:** `0-9`, `A-Z`, `-`, `.`, `$`, `/`, `+`, `%`, `SPACE`, `*`

**Structure:**
- Denser than Code 39
- Asterisk (*) start/stop symbol (automatically added)
- Two check characters (automatically calculated)

**Implementation:**
```xml
<syncfusion:SfBarcode Value="CODE-93" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code93Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"PRODUCT/A"` - Valid
- `"12345-ABC"` - Valid

---

### Code 93 Extended

**Use Case:** Full ASCII support with Code 93 benefits

**Supported Characters:** All 128 ASCII characters

**Structure:**
- Uses two-character combinations for full ASCII
- Denser encoding than Code 39 Extended

**Implementation:**
```xml
<syncfusion:SfBarcode Value="Extended93" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code93ExtendedBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

---

### Code 128A

**Use Case:** Uppercase alphanumeric with control characters

**Supported Characters:** 
- `0-9`, `A-Z` (uppercase only)
- Control characters (ASCII 0-31)
- Special characters: `"`, `!`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `\`, `]`, `^`, `_`

**Implementation:**
```xml
<syncfusion:SfBarcode Value="PRODUCT123" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code128ABarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

---

### Code 128B

**Use Case:** Upper and lowercase alphanumeric

**Supported Characters:**
- `0-9`, `A-Z`, `a-z`
- Special characters: `SPACE`, `!`, `"`, `#`, `$`, `%`, `&`, `'`, `(`, `)`, `*`, `+`, `,`, `-`, `.`, `/`, `:`, `;`, `<`, `=`, `>`, `?`, `@`, `[`, `\`, `]`, `^`, `_`, `` ` ``, `{`, `|`, `}`, `~`

**Implementation:**
```xml
<syncfusion:SfBarcode Value="Product123" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code128BBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"ItemCode-A1"` - Valid (mixed case)
- `"user@email.com"` - Valid

---

### Code 128C

**Use Case:** Numeric data encoding (most efficient for numbers)

**Supported Characters:** Digit pairs `00-99`

**Structure:**
- Encodes two digits per symbol character
- Most compact for numeric-only data
- Value must have even number of digits

**Implementation:**
```xml
<syncfusion:SfBarcode Value="123456" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Code128CBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"123456"` - Valid (6 digits, even)
- `"001122"` - Valid
- `"12345"` - Invalid (odd number of digits)
- `"12AB34"` - Invalid (non-numeric)

**Best Practice:** Use Code 128C for long numeric sequences (barcodes, serial numbers).

---

### UPC Barcode

**Use Case:** Retail products (Universal Product Code)

**Supported Characters:** `0-9` only

**Structure:**
- Encodes exactly 12 numeric digits
- Check digit automatically calculated
- Fixed format (UPC-A standard)
- Widely used in North American retail

**Implementation:**
```xml
<syncfusion:SfBarcode Value="012345678905" Height="150" Width="250">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:UpcBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"012345678905"` - Valid (12 digits)
- `"123456789012"` - Valid
- `"12345"` - Invalid (must be 12 digits)

---

### GS1 Code128

**Use Case:** Shipping, supply chain, logistics (GS1-128/EAN-128)

**Supported Characters:** Numeric pairs `00-99` with Application Identifiers (AI)

**Structure:**
- Based on Code 128C
- Uses GS1 Application Identifiers
- Commonly used in logistics and supply chain

**Implementation:**
```xml
<syncfusion:SfBarcode Value="(01)12345678901231" Height="150">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:GS1Code128Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Application Identifiers:**
- `(01)` - GTIN (Global Trade Item Number)
- `(10)` - Batch/Lot Number
- `(17)` - Expiration Date
- `(21)` - Serial Number

---

## Two-Dimensional Barcodes

### QR Code

**Use Case:** URLs, contact info, Wi-Fi credentials, mobile payments, product tracking

**Supported Characters:**
- **Numeric mode:** `0-9`
- **Alphanumeric mode:** `0-9`, `A-Z`, `SPACE`, `$`, `%`, `*`, `+`, `-`, `.`, `/`, `:`
- **Binary mode:** All Shift JIS characters

**Structure:**
- Square matrix of black/white modules
- Three position markers (corners)
- Built-in error correction
- Versions 1-40 (size increases with data capacity)

**Implementation:**
```xml
<syncfusion:SfBarcode Value="http://www.syncfusion.com" 
                       Height="200" 
                       Width="200">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:QRBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"http://example.com"` - URL
- `"WIFI:T:WPA;S:MyNetwork;P:password123;;"` - Wi-Fi credentials
- `"BEGIN:VCARD\nFN:John Doe\nTEL:1234567890\nEND:VCARD"` - vCard contact

**Advantages:**
- Fast readability
- Can be scanned from any angle
- Works with smartphone cameras
- High error correction capability

---

### Data Matrix

**Use Case:** Small item marking, electronics, PCB tracking, postal services, labels

**Supported Characters:** All ASCII characters (0-255)

**Structure:**
- Square or rectangular matrix
- Finder pattern (L-shaped border on two sides)
- Very compact encoding
- Sizes from 10×10 to 144×144

**Implementation:**
```xml
<syncfusion:SfBarcode Value="DataMatrix123" 
                       Width="200" 
                       Height="200"
                       AutoModule="True">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:DataMatrixBarcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"12345678"` - Simple numeric
- `"PART-A-12345"` - Alphanumeric
- `"http://tiny.url"` - URL

**Advantages:**
- Very small physical size
- High data density
- Good for marking tiny components
- Error correction built-in

---

### PDF417

**Use Case:** ID cards, transport, inventory management, boarding passes

**Supported Characters:** All ASCII characters

**Structure:**
- Stacked linear barcode (multiple rows)
- High data capacity (1800+ characters)
- Error correction built-in
- Variable height and width

**Implementation:**
```xml
<syncfusion:SfBarcode Value="PDF417 Barcode Data" 
                       Height="150" 
                       Width="300">
    <syncfusion:SfBarcode.Symbology>
        <syncfusion:Pdf417Barcode />
    </syncfusion:SfBarcode.Symbology>
</syncfusion:SfBarcode>
```

**Example Values:**
- `"Passenger: John Doe, Flight: AB123, Seat: 15A"` - Boarding pass
- `"Name: Jane Smith\nDOB: 1990-01-15\nID: 123456789"` - ID card

**Advantages:**
- Very high data capacity
- Can encode entire paragraphs
- Commonly used on driver's licenses
- Robust error correction

---

## Symbology Selection Guide

### By Data Type

| Data Type | Recommended Symbology |
|-----------|----------------------|
| **Numeric only (short)** | Code11, Code32, Code128C |
| **Numeric only (long)** | Code128C, UPC |
| **Alphanumeric (uppercase)** | Code39, Code93, Code128A |
| **Alphanumeric (mixed case)** | Code128B, Code93Extended |
| **Full ASCII** | Code39Extended, Code93Extended |
| **URLs and web links** | QRBarcode |
| **Large text blocks** | Pdf417Barcode |
| **Compact encoding** | DataMatrixBarcode |

### By Industry

| Industry | Recommended Symbology |
|----------|----------------------|
| **Retail/Products** | UpcBarcode, GS1Code128Barcode |
| **Pharmaceuticals** | Code32Barcode |
| **Automotive** | Code39Barcode |
| **Healthcare** | Code39Barcode, DataMatrixBarcode |
| **Logistics/Shipping** | GS1Code128Barcode, DataMatrixBarcode |
| **Libraries** | CodabarBarcode |
| **Telecommunications** | Code11Barcode |
| **Marketing/Mobile** | QRBarcode |
| **Identification** | Pdf417Barcode |

### By Physical Size Constraints

| Constraint | Recommended Symbology |
|------------|----------------------|
| **Very small labels** | DataMatrixBarcode |
| **Standard labels** | Code39, Code128 series |
| **Large space available** | Any symbology |
| **Square format preferred** | QRBarcode, DataMatrixBarcode |
| **Rectangular format** | Most 1D barcodes, Pdf417Barcode |

### By Scanner Capability

| Scanner Type | Compatible Symbologies |
|--------------|------------------------|
| **Standard 1D laser scanner** | All 1D barcodes |
| **2D imager scanner** | All symbologies (1D and 2D) |
| **Smartphone camera** | QRBarcode, DataMatrixBarcode |
| **Industrial 2D scanner** | All symbologies |

## Character Set Reference Table

| Symbology | Digits | Uppercase | Lowercase | Special | Full ASCII |
|-----------|--------|-----------|-----------|---------|------------|
| Codabar | ✓ | ✗ | ✗ | Limited | ✗ |
| Code11 | ✓ | ✗ | ✗ | - only | ✗ |
| Code32 | ✓ | ✗ | ✗ | ✗ | ✗ |
| Code39 | ✓ | ✓ | ✗ | Limited | ✗ |
| Code39Extended | ✓ | ✓ | ✓ | ✓ | ✓ |
| Code93 | ✓ | ✓ | ✗ | Limited | ✗ |
| Code93Extended | ✓ | ✓ | ✓ | ✓ | ✓ |
| Code128A | ✓ | ✓ | ✗ | ✓ | Partial |
| Code128B | ✓ | ✓ | ✓ | ✓ | Most |
| Code128C | ✓ | ✗ | ✗ | ✗ | ✗ |
| UpcBarcode | ✓ | ✗ | ✗ | ✗ | ✗ |
| GS1Code128 | ✓ | ✗ | ✗ | ✗ | ✗ |
| QRBarcode | ✓ | ✓ | ✓ | ✓ | ✓ |
| DataMatrixBarcode | ✓ | ✓ | ✓ | ✓ | ✓ |
| Pdf417Barcode | ✓ | ✓ | ✓ | ✓ | ✓ |
