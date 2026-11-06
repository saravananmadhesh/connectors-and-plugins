---
title: Barcode Types and Symbologies
parent: syncfusion-flutter-barcode-generator
nav_order: 2
---

# Barcode Types and Symbologies

The Syncfusion Flutter Barcode Generator supports 14 different barcode symbologies: 12 one-dimensional (linear) and 2 two-dimensional barcodes. This guide helps you understand each type and choose the right one for your application.

## Table of Contents

1. [Barcode Types Overview](#barcode-types-overview)
2. [One-Dimensional (1D) Barcodes](#one-dimensional-1d-barcodes)
   - [Codabar](#codabar)
   - [Code39](#code39)
   - [Code39 Extended](#code39-extended)
   - [Code93](#code93)
   - [Code128](#code128)
   - [Code128A](#code128a)
   - [Code128B](#code128b)
   - [Code128C](#code128c)
   - [UPCA](#upca)
   - [UPCE](#upce)
   - [EAN13](#ean13)
   - [EAN8](#ean8)
3. [Two-Dimensional (2D) Barcodes](#two-dimensional-2d-barcodes)
   - [QR Code](#qr-code)
   - [Data Matrix](#data-matrix)
4. [Choosing the Right Barcode Type](#choosing-the-right-barcode-type)
5. [Symbology Comparison Table](#symbology-comparison-table)
6. [Input Validation Rules](#input-validation-rules)

---

## Barcode Types Overview

### What Are 1D vs 2D Barcodes?

**One-Dimensional (1D) Barcodes:**
- Represent data by varying the widths and spacings of parallel lines
- Also known as linear barcodes
- Read horizontally (left to right)
- Store limited data (typically 20-25 characters)
- Examples: Code128, EAN, UPC

**Two-Dimensional (2D) Barcodes:**
- Represent data using both horizontal and vertical patterns
- Store significantly more data (thousands of characters)
- Read in two dimensions
- Can include error correction for damaged codes
- Examples: QR Code, Data Matrix

### Supported Symbologies Summary:

- **12 One-Dimensional Types:** Codabar, Code39, Code39Extended, Code93, Code128, Code128A, Code128B, Code128C, UPCA, UPCE, EAN13, EAN8
- **2 Two-Dimensional Types:** QR Code, Data Matrix

---

## One-Dimensional (1D) Barcodes

One-dimensional barcodes represent data by varying the widths and spacings of parallel lines. These are widely used in retail, logistics, and inventory management.

### Codabar

**Codabar** is a discrete numeric symbology used in libraries, blood banks, and various information processing applications.

**Character Support:**
- Numeric digits (0-9)
- Special characters: dash (-), colon (:), slash (/), plus (+)

**Key Features:**
- Each character has 3 bars and 4 spaces
- Uses A, B, C, D as start and stop characters
- Self-checking symbology

**Common Use Cases:**
- Library book tracking
- Blood bank management
- FedEx airbills
- Photo finishing shops
- Medical laboratories

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class CodabarExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '123456789',
            showValue: true,
            symbology: Codabar(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Must contain only numeric digits and special characters (-, :, /, +)
- Minimum length: 1 character
- No maximum length limit

---

### Code39

**Code39** is a discrete, variable-length symbology that encodes alphanumeric characters. It's one of the oldest and most widely used barcode types.

**Character Support:**
- Digits (0-9)
- Upper case letters (A-Z)
- Symbols: space, minus (-), plus (+), period (.), dollar ($), slash (/), percent (%)

**Key Features:**
- Each character encoded with 5 bars and 4 spaces (3 wide, 6 narrow)
- Self-checking (check digit usually not required)
- Asterisk (*) as start/stop character
- Optional check digit with `enableCheckSum` property

**Common Use Cases:**
- Automotive industry
- Defense Department applications
- Healthcare and pharmaceuticals
- Shipping and logistics
- General inventory management

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code39Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: 'CODE39',
            showValue: true,
            symbology: Code39(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**With Check Digit:**

```dart
SfBarcodeGenerator(
  value: 'PRODUCT123',
  symbology: Code39(
    module: 2,
    enableCheckSum: true, // Adds check digit (default: true)
  ),
  showValue: true,
)
```

**Input Requirements:**
- Upper case letters A-Z only (no lowercase)
- Digits 0-9
- Special characters: space, -, +, ., $, /, %
- No length restrictions

---

### Code39 Extended

**Code39 Extended** is an extended version of Code39 that supports the full 128 ASCII character set, including lowercase letters.

**Character Support:**
- All 128 ASCII characters
- Includes lowercase letters (a-z)
- All special characters

**Key Features:**
- Encodes lowercase and special characters using pairs of Code39 characters
- Maintains Code39 compatibility
- Supports `enableCheckSum` property like Code39

**Common Use Cases:**
- Applications requiring full ASCII support
- Extended character set encoding
- Cases where lowercase letters are needed

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code39ExtendedExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '051091',
            showValue: true,
            symbology: Code39Extended(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Any ASCII character (0-127)
- No length restrictions

---

### Code93

**Code93** is designed to complement and enhance Code39. It's a continuous, variable-length symbology that produces denser codes.

**Character Support:**
- Uppercase letters (A-Z)
- Digits (0-9)
- Special characters: asterisk (*), dash (-), dollar ($), percent (%), space, period (.), slash (/), plus (+)

**Key Features:**
- More compact than Code39
- Continuous symbology (no inter-character gaps)
- Automatic check digits
- Higher data density

**Common Use Cases:**
- Logistics and shipping
- Retail inventory
- Electronic component marking
- Canadian postal service

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code93Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '01234567',
            showValue: true,
            symbology: Code93(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Uppercase letters and digits
- Special characters as listed above
- Asterisk (*) is the start/stop symbol, not a data character

---

### Code128

**Code128** is the most versatile and widely used one-dimensional barcode. It can encode the full ASCII character set efficiently.

**Character Support:**
- Full ASCII character set (128 characters)
- Automatically switches between Code128A, Code128B, and Code128C for optimal encoding

**Key Features:**
- Highest density among 1D barcodes
- Automatic character set optimization
- Built-in check digit
- Character-by-character parity verification
- Default symbology if none specified

**Common Use Cases:**
- Shipping and logistics (most common in industry)
- Package tracking
- Supply chain management
- General-purpose applications
- International shipping labels

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code128Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: 'CODE128',
            showValue: true,
            symbology: Code128(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Any ASCII character
- No length restrictions
- Automatically optimizes encoding

**Note:** If no symbology is specified, Code128 is used by default:

```dart
SfBarcodeGenerator(
  value: 'BARCODE', // Uses Code128 by default
  showValue: true,
)
```

---

### Code128A

**Code128A** (Character Set A) includes uppercase letters, control characters, and special characters.

**Character Support:**
- ASCII values 0-95
- Uppercase letters (A-Z)
- Digits (0-9)
- Control characters
- Punctuation and special characters

**Key Features:**
- Supports control characters for special applications
- Optimal for uppercase text with control codes
- Part of the Code128 family

**Common Use Cases:**
- Applications requiring control characters
- Specialized industrial systems
- Data transmission protocols

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code128AExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: 'CODE128A',
            showValue: true,
            symbology: Code128A(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- ASCII values 0-95
- Uppercase letters only

---

### Code128B

**Code128B** (Character Set B) includes both uppercase and lowercase letters plus standard keyboard characters.

**Character Support:**
- ASCII values 32-127
- Uppercase and lowercase letters (A-Z, a-z)
- Digits (0-9)
- Standard punctuation and symbols

**Key Features:**
- Supports lowercase letters
- Most commonly used Code128 subset
- Standard keyboard character set

**Common Use Cases:**
- General text encoding
- Product labels
- Standard shipping labels
- Most common Code128 applications

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code128BExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: 'CODE128B',
            showValue: true,
            symbology: Code128B(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- ASCII values 32-127
- Uppercase and lowercase letters

---

### Code128C

**Code128C** (Character Set C) is optimized for numeric data, encoding digit pairs efficiently.

**Character Support:**
- Numeric digits only (0-9)
- Encodes two digits per symbol character

**Key Features:**
- Highest density for numeric data
- Encodes digit pairs (00-99)
- Twice the density of other Code128 types for numbers
- Most efficient for numeric-only data

**Common Use Cases:**
- Serial numbers
- Numeric identifiers
- Batch numbers
- Numeric-only applications
- High-density numeric encoding

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code128CExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '1234567890',
            showValue: true,
            symbology: Code128C(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Numeric digits only (0-9)
- Even number of digits recommended for optimal encoding

---

### UPCA

**UPCA** (Universal Product Code - Version A) is the standard retail barcode in North America.

**Character Support:**
- Numeric digits only (0-9)
- Exactly 12 digits (11 data digits + 1 check digit)

**Key Features:**
- Most common retail barcode in USA and Canada
- Fixed length (12 digits)
- Automatic check digit calculation
- Built-in error detection

**Common Use Cases:**
- Retail product identification (primary use)
- Point-of-sale systems
- Inventory management
- Grocery and general merchandise

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class UPCAExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '72527273070',
            showValue: true,
            symbology: UPCA(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Must be exactly 11 or 12 digits
- If 11 digits provided, check digit is automatically calculated
- If 12 digits provided, last digit must be valid check digit

**Format:**
- First digit: Number system (0-9)
- Next 5 digits: Manufacturer code
- Next 5 digits: Product code
- Last digit: Check digit (auto-calculated)

---

### UPCE

**UPCE** (Universal Product Code - Version E) is a compressed version of UPCA for small packages.

**Character Support:**
- Numeric digits only (0-9)
- 6 data digits (8 digits when expanded with number system and check digit)

**Key Features:**
- Zero-suppressed version of UPCA
- Shorter barcode for small packages
- Automatically adds number system (0) and check digit
- Does not use middle guard pattern

**Common Use Cases:**
- Small product packaging
- Items with limited label space
- Convenience store items
- Compact retail products

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class UPCEExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '310194',
            showValue: true,
            symbology: UPCE(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Must be exactly 6, 7, or 8 digits
- 6 digits: number system and check digit added automatically
- 7 digits: includes number system, check digit added
- 8 digits: complete code including number system and check digit

---

### EAN13

**EAN13** (European Article Number - 13 digits) is the international standard for retail product identification.

**Character Support:**
- Numeric digits only (0-9)
- Exactly 13 digits (12 data digits + 1 check digit)

**Key Features:**
- International retail standard (used worldwide)
- Based on UPCA but with 13 digits
- Number system is 2 digits (00-99)
- Automatic check digit calculation

**Common Use Cases:**
- International retail products (primary use)
- European and Asian markets
- Books (with ISBN conversion)
- Worldwide product identification

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class EAN13Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '9735940564824',
            showValue: true,
            symbology: EAN13(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Must be exactly 12 or 13 digits
- If 12 digits provided, check digit is automatically calculated
- If 13 digits provided, last digit must be valid check digit

**Format:**
- First 2-3 digits: Country code (GS1 prefix)
- Next 4-5 digits: Manufacturer code
- Next 5 digits: Product code
- Last digit: Check digit (auto-calculated)

**UPCA vs EAN13:**
- UPCA: Single digit number system (0-9)
- EAN13: Two digit number system (00-99)
- Both are similar in structure and usage

---

### EAN8

**EAN8** (European Article Number - 8 digits) is a shorter version of EAN13 for small packaging.

**Character Support:**
- Numeric digits only (0-9)
- Exactly 8 digits (7 data digits + 1 check digit)

**Key Features:**
- Compact version of EAN13
- Shorter than UPCE
- Used for small retail products
- Automatic check digit calculation

**Common Use Cases:**
- Small product packaging
- Limited label space products
- Cigarette packages
- Chewing gum packages
- Small cosmetics

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class EAN8Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '11223344',
            showValue: true,
            symbology: EAN8(module: 2),
          ),
        ),
      ),
    );
  }
}
```

**Input Requirements:**
- Must be exactly 7 or 8 digits
- If 7 digits provided, check digit is automatically calculated
- If 8 digits provided, last digit must be valid check digit

**Format:**
- First 2-3 digits: Country code
- Next 4-5 digits: Product code
- Last digit: Check digit (auto-calculated)

---

## Two-Dimensional (2D) Barcodes

Two-dimensional barcodes store data in both horizontal and vertical patterns, allowing significantly more data capacity than 1D barcodes.

### QR Code

**QR Code** (Quick Response Code) is the most popular two-dimensional barcode, consisting of a grid of dark and light modules forming a square.

**Character Support:**
- Numeric: 0-9
- Alphanumeric: 0-9, A-Z, space, $, %, *, +, -, ., /, :
- Binary: All bytes (full ASCII and binary data)
- Kanji: Japanese characters (Shift JIS)

**Key Features:**
- High data capacity (up to 7,089 numeric or 4,296 alphanumeric characters)
- Error correction (recovers from damage)
- Fast scanning and decoding
- Version 1 to 40 (21x21 to 177x177 modules)
- Four error correction levels

**Common Use Cases:**
- URLs and website links (most common)
- Marketing and advertising
- Mobile payments
- Contact information (vCard)
- Wi-Fi credentials
- Product information
- Event tickets
- Authentication codes

**Basic Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class QRCodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 300,
          width: 300,
          child: SfBarcodeGenerator(
            value: 'www.syncfusion.com',
            showValue: true,
            symbology: QRCode(),
          ),
        ),
      ),
    );
  }
}
```

#### Error Correction Levels

The `errorCorrectionLevel` property enables the QR code to withstand damage without data loss:

| Level | Recovery Capability | Use Case |
|-------|---------------------|----------|
| **Low** | Up to 7% | Clean environments, temporary codes |
| **Medium** | Up to 15% | Standard applications |
| **Quartile** | Up to 25% | Outdoor use, potential wear |
| **High** | Up to 30% (default) | Maximum reliability, damaged surfaces |

**Example with Error Correction:**

```dart
SfBarcodeGenerator(
  value: 'www.syncfusion.com',
  showValue: true,
  symbology: QRCode(
    errorCorrectionLevel: ErrorCorrectionLevel.high,
  ),
)
```

#### Input Modes

The `inputMode` property selects the optimal character set for encoding:

| Mode | Character Support | Optimal For |
|------|------------------|-------------|
| **Numeric** | 0-9 | Pure numeric data (highest density) |
| **Alphanumeric** | 0-9, A-Z, space, $%*+-./: | Uppercase text and numbers |
| **Binary** | All bytes (default) | Full ASCII, mixed case, binary data |
| **Kanji** | Shift JIS characters | Japanese text |

**Example with Input Mode:**

```dart
SfBarcodeGenerator(
  value: '1263438892737643894930872',
  showValue: true,
  symbology: QRCode(
    inputMode: QRInputMode.numeric,
  ),
)
```

#### QR Code Version

The `codeVersion` property controls the size and data capacity:

- **Version 1:** 21x21 modules (smallest)
- **Version 2:** 25x25 modules
- **Version 3-39:** Increases by 4 modules per side
- **Version 40:** 177x177 modules (largest)
- **Auto (default):** Automatically selects version based on data length

**Example with Version:**

```dart
SfBarcodeGenerator(
  value: 'www.syncfusion.com',
  showValue: true,
  symbology: QRCode(
    codeVersion: QRCodeVersion.version09,
  ),
)
```

**Complete QR Code Example:**

```dart
SfBarcodeGenerator(
  value: 'https://www.syncfusion.com/flutter',
  symbology: QRCode(
    errorCorrectionLevel: ErrorCorrectionLevel.high,
    inputMode: QRInputMode.binary,
    codeVersion: QRCodeVersion.auto,
  ),
  showValue: true,
  textSpacing: 15,
)
```

---

### Data Matrix

**Data Matrix** is a two-dimensional barcode consisting of a grid of dark and light modules arranged in a square or rectangular pattern.

**Character Support:**
- Numeric: 0-9
- Alphanumeric: ASCII characters
- Binary: All byte values

**Key Features:**
- High data density
- Small size (can be very compact)
- Error correction built-in
- Square or rectangular formats
- Up to 3,116 numeric or 2,335 alphanumeric characters

**Common Use Cases:**
- Electronics marking
- Pharmaceutical packaging
- Printed media and labels
- Component identification
- Small parts tracking
- Medical devices
- Food packaging

**Basic Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class DataMatrixExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 300,
          width: 300,
          child: SfBarcodeGenerator(
            value: 'www.syncfusion.com',
            showValue: true,
            symbology: DataMatrix(),
          ),
        ),
      ),
    );
  }
}
```

#### Encoding Types

The `encoding` property determines how data is encoded:

| Encoding Type | Description | Use Case |
|---------------|-------------|----------|
| **Auto** (default) | Automatically selects optimal encoding | General use, recommended |
| **ASCII** | ASCII value + 1 (range 0-127) | Standard ASCII text |
| **ASCIINumeric** | Numeric pairs + 130 (00-99) | Numeric data |
| **Base256** | Binary data (range 128-255) | Binary data, extended ASCII |

**ASCII Encoding:**
- Code word = ASCII value + 1
- Range: 0 to 127

**ASCIINumeric Encoding:**
- Code word = numeric pair + 130
- Pairs: 00, 01, 02, ..., 99

**Base256 Encoding:**
- First code word = 235
- Second code word = ASCII value - 127
- Range: 128 to 255

**Example with Encoding:**

```dart
SfBarcodeGenerator(
  value: '12345678',
  symbology: DataMatrix(
    encoding: DataMatrixEncoding.ASCIINumeric,
  ),
  showValue: true,
)
```

#### Data Matrix Size

The `dataMatrixSize` property controls the symbol size:

**Example with Size:**

```dart
SfBarcodeGenerator(
  value: 'COMPACT',
  symbology: DataMatrix(
    dataMatrixSize: DataMatrixSize.auto, // Auto-calculate based on data
    encoding: DataMatrixEncoding.auto,
  ),
  showValue: true,
)
```

**Complete Data Matrix Example:**

```dart
SfBarcodeGenerator(
  value: 'Syncfusion Flutter Barcode',
  symbology: DataMatrix(
    encoding: DataMatrixEncoding.auto,
    dataMatrixSize: DataMatrixSize.auto,
  ),
  showValue: true,
  textSpacing: 10,
)
```

---

## Choosing the Right Barcode Type

### Decision Tree

**Step 1: Data Type**

**Numeric only?**
- **Retail product?** → Use UPCA (North America) or EAN13 (International)
- **Short numeric?** → Use UPCE or EAN8 for small packages
- **Long numeric?** → Use Code128C for high density
- **General numeric?** → Use Code128

**Alphanumeric (letters + numbers)?**
- **Uppercase only?** → Use Code39 (widely compatible)
- **Mixed case?** → Use Code128 or Code128B
- **Full ASCII?** → Use Code128 or Code39Extended

**Large amount of data (URLs, paragraphs)?**
- → Use QR Code (most common) or Data Matrix

**Step 2: Use Case**

**Retail/Commercial:**
- North America retail → UPCA
- International retail → EAN13
- Small packages → UPCE or EAN8
- General packaging → Code128

**Logistics/Shipping:**
- Industry standard → Code128 (most common)
- Alternative → Code93

**Inventory/Assets:**
- General tracking → Code128 or Code39
- Library/Blood Bank → Codabar
- Healthcare → Code39

**Marketing/URLs:**
- Websites/links → QR Code
- Contact info → QR Code
- Mobile payments → QR Code

**Manufacturing/Electronics:**
- Small components → Data Matrix
- General marking → Code128 or Data Matrix

**Step 3: Space Constraints**

**Very limited space:**
- 1D option → UPCE, EAN8, or Code128C
- 2D option → Data Matrix (most compact)

**Small space:**
- 1D option → Code93 or Code128
- 2D option → QR Code

**No space constraints:**
- Any barcode type suitable for your data

---

## Symbology Comparison Table

### One-Dimensional (1D) Barcodes

| Type | Data Capacity | Character Set | Density | Best For |
|------|---------------|---------------|---------|----------|
| **Codabar** | Variable | Numeric + 4 special | Low | Libraries, medical |
| **Code39** | Variable | Alphanumeric (upper) | Low | Automotive, defense |
| **Code39Ext** | Variable | Full ASCII | Low | Extended characters |
| **Code93** | Variable | Alphanumeric | Medium | Logistics, compact |
| **Code128** | Variable | Full ASCII | High | Shipping, general use |
| **Code128A** | Variable | ASCII 0-95 | High | Control characters |
| **Code128B** | Variable | ASCII 32-127 | High | Mixed case text |
| **Code128C** | Variable | Numeric pairs | Highest | Numeric data |
| **UPCA** | 12 digits | Numeric only | Fixed | US/Canada retail |
| **UPCE** | 8 digits | Numeric only | Fixed | Small retail packages |
| **EAN13** | 13 digits | Numeric only | Fixed | International retail |
| **EAN8** | 8 digits | Numeric only | Fixed | Small international |

### Two-Dimensional (2D) Barcodes

| Type | Max Capacity | Features | Best For |
|------|--------------|----------|----------|
| **QR Code** | 7,089 numeric / 4,296 alphanumeric | Error correction, multiple modes | URLs, marketing, general use |
| **Data Matrix** | 3,116 numeric / 2,335 alphanumeric | Compact size, error correction | Electronics, small parts |

---

## Input Validation Rules

### Numeric-Only Symbologies

**UPCA:**
- Must be 11 or 12 digits
- If 11 digits: check digit auto-calculated
- If 12 digits: last digit must be valid check digit

**UPCE:**
- Must be 6, 7, or 8 digits
- Check digit auto-calculated if not provided

**EAN13:**
- Must be 12 or 13 digits
- Check digit auto-calculated if not provided

**EAN8:**
- Must be 7 or 8 digits
- Check digit auto-calculated if not provided

**Code128C:**
- Numeric digits only (0-9)
- Even number of digits recommended

### Alphanumeric Symbologies

**Code39:**
- Uppercase letters A-Z
- Digits 0-9
- Special characters: space, -, +, ., $, /, %
- No lowercase letters

**Code39Extended:**
- All ASCII characters (0-127)
- Includes lowercase letters

**Code93:**
- Uppercase letters A-Z
- Digits 0-9
- Special characters: *, -, $, %, space, ., /, +

**Code128 (all variants):**
- Full ASCII support
- No restrictions on input

**Codabar:**
- Digits 0-9
- Special characters: -, :, /, +

### Two-Dimensional Symbologies

**QR Code:**
- Depends on input mode:
  - Numeric: 0-9 only
  - Alphanumeric: 0-9, A-Z, space, $%*+-./:
  - Binary: All bytes
  - Kanji: Shift JIS characters

**Data Matrix:**
- Numeric: 0-9
- Alphanumeric: ASCII characters
- Binary: All byte values

### Common Validation Errors

**"Invalid characters for symbology"**
- Solution: Check character support for the symbology
- Example: Code39 doesn't support lowercase letters

**"Invalid length"**
- Solution: Verify length requirements (EAN, UPC types have fixed lengths)
- Example: UPCA requires exactly 11 or 12 digits

**"Check digit mismatch"**
- Solution: Let the system auto-calculate or verify your check digit
- Example: Don't manually add check digits unless required

---

## Best Practices

### Selecting a Symbology

1. **Start with your use case:** Retail? Shipping? Marketing?
2. **Consider your data type:** Numeric only? Mixed case? URLs?
3. **Check space constraints:** Limited label space?
4. **Verify scanner compatibility:** Will your scanners support it?
5. **Test scannability:** Print and test with actual scanners

### Implementation Tips

1. **Use Code128 as default** for general-purpose 1D barcodes
2. **Use QR Code as default** for 2D barcodes and URLs
3. **Always enable error correction** for QR codes (high level recommended)
4. **Test printed barcodes** before production
5. **Follow industry standards** for retail (EAN/UPC) and shipping (Code128)
6. **Consider reading distance** when choosing barcode size

### Testing Recommendations

1. **Print test samples** at actual size
2. **Test with multiple scanners** (phone apps + dedicated scanners)
3. **Test under different lighting** conditions
4. **Verify damaged code recovery** for QR codes
5. **Check minimum size requirements** for your printer resolution

---

**Next:** Learn how to [customize barcode appearance](customization.md) with colors, text styling, and sizing options.
