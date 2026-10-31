---
name: syncfusion-flutter-barcode-generator
description: Implements Syncfusion Flutter Barcode Generator (SfBarcodeGenerator) for generating 1D and 2D barcodes in Flutter apps. Use when working with QR codes, Data Matrix, Code128, EAN, UPC, or other machine-readable barcode formats. This skill covers barcode types, customization, sizing, text display, and integration into product labels, ticketing, or inventory systems.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Barcode Generator

This skill covers the Syncfusion Flutter Barcode Generator component (**SfBarcodeGenerator**) for creating machine-readable barcodes. The widget supports 14 different barcode symbologies including popular 1D barcodes (Code128, EAN, UPC, etc.) and 2D barcodes (QR Code, Data Matrix).

## When to Use This Skill

Use this skill when you need to:

- **Generate barcodes** for products, assets, or documents
- **Implement QR codes** for URLs, contact info, or payments
- **Create product labels** with retail barcodes (EAN, UPC)
- **Build inventory systems** with barcode tracking
- **Generate Data Matrix codes** for compact data encoding
- **Add barcode scanning integration** to your Flutter apps
- **Create tickets or vouchers** with unique barcode identifiers
- **Implement asset tracking** with barcode labels
- **Generate barcodes for documents** or identification cards
- **Customize barcode appearance** with colors, text, and styling
- **Support multiple barcode formats** in a single application
- **Display machine-readable codes** for data input workflows

## Component Overview

**SfBarcodeGenerator** is a data visualization widget designed to generate and display data in a machine-readable format. It provides:

- **14 Barcode Symbologies** - 12 one-dimensional and 2 two-dimensional types
- **Customizable Appearance** - Colors, text styling, spacing, and bar width control
- **Easy Integration** - Simple API with minimal configuration
- **Accessibility Support** - Sufficient contrast and large fonts support
- **Flexible Sizing** - Automatic or manual module (bar width) configuration
- **Text Display** - Show/hide input values with custom formatting

## Supported Barcode Types

### One-Dimensional (1D) Barcodes - 12 Types

| Barcode Type | Character Support | Typical Use Cases |
|--------------|------------------|-------------------|
| **Codabar** | Numeric + special chars (-, :, /, +) | Libraries, blood banks, shipping |
| **Code39** | Alphanumeric (uppercase) + symbols | Automotive, defense, healthcare |
| **Code39Extended** | Full ASCII (all 128 characters) | Extended character encoding |
| **Code93** | Alphanumeric + symbols | Compact encoding, logistics |
| **Code128** | Full ASCII (automatic mode) | Most versatile, shipping, packaging |
| **Code128A** | ASCII 0-95 (uppercase + control) | Control character encoding |
| **Code128B** | ASCII 32-127 (upper + lowercase) | Standard text encoding |
| **Code128C** | Numeric pairs (00-99) | Numeric data, double density |
| **UPCA** | 12-digit numeric | Retail products (North America) |
| **UPCE** | 8-digit numeric (compact) | Small package retail products |
| **EAN13** | 13-digit numeric | International retail products |
| **EAN8** | 8-digit numeric | Small retail products |

### Two-Dimensional (2D) Barcodes - 2 Types

| Barcode Type | Data Capacity | Typical Use Cases |
|--------------|---------------|-------------------|
| **QR Code** | Up to 7,089 numeric or 4,296 alphanumeric | URLs, contact info, payments, marketing |
| **Data Matrix** | Up to 3,116 numeric or 2,335 alphanumeric | Electronics, pharmaceuticals, printed media |

**QR Code Features:**
- Error correction levels (Low, Medium, Quartile, High)
- Input modes (Numeric, Alphanumeric, Binary, Kanji)
- Version 1-40 (21x21 to 177x177 modules)

**Data Matrix Features:**
- Encoding types (Auto, ASCII, ASCIINumeric, Base256)
- Square and rectangular formats
- Compact size for small labels

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup
- Add dependency to pubspec.yaml
- Import barcode package
- Basic SfBarcodeGenerator implementation
- Create your first 1D barcode (Code128)
- Create your first QR code
- Display input value below barcode
- Next steps and learning path

### Barcode Types and Symbologies

📄 **Read:** [references/barcode-types.md](references/barcode-types.md)
- All 12 one-dimensional barcode types with examples
- All 2 two-dimensional barcode types with examples
- Detailed properties for each symbology
- Input validation rules per barcode type
- Character support and limitations
- Choosing the right barcode type for your use case
- Symbology comparison table
- Best practices for barcode selection

### Customization and Styling

📄 **Read:** [references/customization.md](references/customization.md)
- Text customization (showValue, textStyle, textSpacing, textAlign)
- Bar customization (module, barColor, backgroundColor)
- Size and layout control
- Responsive sizing strategies
- Text style properties (font, size, weight, color)
- Bar width (module) configuration for 1D and 2D barcodes
- Complete customization examples
- Best practices for scannable barcodes

### Accessibility Features

📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Sufficient contrast support
- Large fonts and text scaling
- Color customization for accessibility
- MediaQueryData integration
- Accessibility best practices
- Testing for readability

## Quick Start Examples

### Basic QR Code

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class QRCodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('QR Code')),
      body: Center(
        child: Container(
          height: 300,
          width: 300,
          child: SfBarcodeGenerator(
            value: 'https://www.syncfusion.com',
            symbology: QRCode(),
            showValue: true,
          ),
        ),
      ),
    );
  }
}
```

### Basic Code128 Barcode

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code128Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Code128 Barcode')),
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: 'SYNCFUSION',
            symbology: Code128(),
            showValue: true,
          ),
        ),
      ),
    );
  }
}
```

### Retail Product Barcode (EAN13)

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class RetailBarcodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Product Barcode')),
      body: Center(
        child: Container(
          height: 150,
          width: 280,
          child: SfBarcodeGenerator(
            value: '9735940564824',
            symbology: EAN13(),
            showValue: true,
          ),
        ),
      ),
    );
  }
}
```

## Common Patterns

### Pattern 1: QR Code with Error Correction

```dart
SfBarcodeGenerator(
  value: 'https://www.example.com/product/12345',
  symbology: QRCode(
    errorCorrectionLevel: ErrorCorrectionLevel.high,
    codeVersion: QRCodeVersion.auto,
    inputMode: QRInputMode.binary,
  ),
  showValue: true,
  textSpacing: 10,
)
```

### Pattern 2: Customized Barcode Appearance

```dart
SfBarcodeGenerator(
  value: 'PRODUCT-12345',
  symbology: Code128(module: 2),
  barColor: Colors.deepPurple,
  backgroundColor: Colors.grey[100],
  textStyle: TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.bold,
    color: Colors.deepPurple,
  ),
  showValue: true,
  textAlign: TextAlign.center,
  textSpacing: 15,
)
```

### Pattern 3: Multiple Barcode Types in List

```dart
class BarcodeList extends StatelessWidget {
  final List<BarcodeItem> barcodeTypes = [
    BarcodeItem('Code128', '12345678', Code128()),
    BarcodeItem('QR Code', 'https://example.com', QRCode()),
    BarcodeItem('EAN13', '9735940564824', EAN13()),
    BarcodeItem('Code39', 'CODE39', Code39()),
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: barcodeTypes.length,
      itemBuilder: (context, index) {
        final item = barcodeTypes[index];
        return Card(
          margin: EdgeInsets.all(8),
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              children: [
                Text(
                  item.name,
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 10),
                Container(
                  height: 150,
                  child: SfBarcodeGenerator(
                    value: item.value,
                    symbology: item.symbology,
                    showValue: true,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class BarcodeItem {
  final String name;
  final String value;
  final Symbology symbology;
  
  BarcodeItem(this.name, this.value, this.symbology);
}
```

### Pattern 4: Responsive Barcode Sizing

```dart
class ResponsiveBarcode extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final barcodeSize = screenWidth * 0.8;

    return Center(
      child: Container(
        height: barcodeSize,
        width: barcodeSize,
        child: SfBarcodeGenerator(
          value: 'RESPONSIVE-BARCODE',
          symbology: QRCode(),
          showValue: true,
        ),
      ),
    );
  }
}
```

## Key Properties

### SfBarcodeGenerator Essential Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| **value** | String | The data to encode in the barcode | Required |
| **symbology** | Symbology | Barcode type (Code128, QRCode, etc.) | Code128 |
| **showValue** | bool | Display input value below barcode | false |
| **barColor** | Color | Color of barcode bars/modules | Colors.black |
| **backgroundColor** | Color | Background color of barcode | Colors.white |
| **textStyle** | TextStyle | Style for displayed text | Default TextStyle |
| **textSpacing** | double | Space between barcode and text | 2 |
| **textAlign** | TextAlign | Horizontal alignment of text | TextAlign.center |

### Common Symbology Properties

| Property | Applies To | Description | Default |
|----------|-----------|-------------|---------|
| **module** | All types | Width of smallest bar/dot (logical pixels) | Auto-calculated |

### Code39 Specific Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| **enableCheckSum** | bool | Add check digit to barcode | true |

### QR Code Specific Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| **errorCorrectionLevel** | ErrorCorrectionLevel | Error recovery level (low, medium, quartile, high) | high |
| **codeVersion** | QRCodeVersion | QR version 1-40 or auto | auto |
| **inputMode** | QRInputMode | Input type (numeric, alphanumeric, binary, kanji) | binary |

### Data Matrix Specific Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| **encoding** | DataMatrixEncoding | Encoding type (auto, ASCII, ASCIINumeric, base256) | auto |
| **dataMatrixSize** | DataMatrixSize | Size configuration | auto |

## Common Use Cases

1. **Product Labeling** - Generate EAN13 or UPCA barcodes for retail products
2. **Inventory Management** - Use Code128 for tracking assets and stock items
3. **QR Code Marketing** - Create QR codes for URLs, promotions, and campaigns
4. **Ticket Generation** - Generate unique barcodes for event tickets and vouchers
5. **Document Identification** - Add Code39 or Code128 to documents for tracking
6. **Payment QR Codes** - Create QR codes for payment gateways and transactions
7. **Asset Tracking** - Label equipment and assets with Codabar or Code128
8. **Shipping Labels** - Use Code128 for package tracking and logistics
9. **Library Management** - Implement Codabar for book and media tracking
10. **Healthcare Labels** - Generate barcodes for patient records and medications
11. **Contact Sharing** - Create QR codes with vCard data for business cards
12. **Wi-Fi Sharing** - Generate QR codes for Wi-Fi credentials

## Related Resources

- **Package:** [syncfusion_flutter_barcodes](https://pub.dev/packages/syncfusion_flutter_barcodes)
- **API Documentation:** [SfBarcodeGenerator API](https://pub.dev/documentation/syncfusion_flutter_barcodes/latest/barcodes/SfBarcodeGenerator-class.html)
- **GitHub Examples:** [Flutter Barcode Examples](https://github.com/syncfusion/flutter-examples)
- **Video Tutorial:** [Getting Started with Flutter Barcode Generator](https://www.youtube.com/watch?v=ckAHrT2CR8A)
- **Official Documentation:** [Syncfusion Flutter Barcode User Guide](https://help.syncfusion.com/flutter/barcode/overview)
