---
title: Getting Started
parent: syncfusion-flutter-barcode-generator
nav_order: 1
---

# Getting Started with Syncfusion Flutter Barcode Generator

This guide walks you through the steps to add the Syncfusion Flutter Barcode Generator (SfBarcodeGenerator) widget to your Flutter application and create your first barcodes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation and Setup](#installation-and-setup)
3. [Package Dependencies](#package-dependencies)
4. [Initialize the Barcode Generator](#initialize-the-barcode-generator)
5. [Create Your First 1D Barcode](#create-your-first-1d-barcode)
6. [Create Your First QR Code](#create-your-first-qr-code)
7. [Display Input Value](#display-input-value)
8. [Common Properties Overview](#common-properties-overview)
9. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have:

- Flutter SDK installed (version 2.0 or higher)
- A Flutter project created
- Basic knowledge of Flutter widgets
- A code editor (VS Code, Android Studio, or IntelliJ IDEA)

For help creating your first Flutter app, see [Getting Started with Flutter](https://docs.flutter.dev/get-started/test-drive).

---

## Installation and Setup

### Step 1: Add Dependency

Add the Syncfusion Flutter Barcode package by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_barcodes
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

---

## Package Dependencies

### Import Package

Import the barcode package in your Dart file:

```dart
import 'package:syncfusion_flutter_barcodes/barcodes.dart';
```

### Complete Import Example

Here's a complete example with all necessary imports:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Barcode Generator Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: BarcodeHomePage(),
    );
  }
}
```

---

## Initialize the Barcode Generator

The **SfBarcodeGenerator** widget can be added as a child of any widget. The widget requires a height to be specified (either through its parent or the widget itself).

### Basic Structure

```dart
class BarcodeHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Barcode Generator'),
      ),
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: 'http://www.syncfusion.com',
          ),
        ),
      ),
    );
  }
}
```

### Key Points:

- **Container with height:** The barcode needs a defined height to render properly
- **value parameter:** This is the data that will be encoded in the barcode (required)
- **Default symbology:** If not specified, the default symbology is Code128

### Output:

This creates a basic Code128 barcode displaying the URL "http://www.syncfusion.com".

![Basic Barcode](../images/getting-started/basic-barcode.png)

---

## Create Your First 1D Barcode

Let's create a one-dimensional barcode using the **Code128** symbology, which is the most versatile 1D barcode type.

### Complete Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class Code128BarcodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Code128 Barcode'),
        backgroundColor: Colors.blue,
      ),
      body: Center(
        child: Container(
          height: 150,
          width: 300,
          child: SfBarcodeGenerator(
            value: '12634388927',
            symbology: Code128(),
          ),
        ),
      ),
    );
  }
}
```

### Code Walkthrough:

1. **Container sizing:** Height of 150 and width of 300 provides adequate space
2. **value:** The numeric string to encode
3. **symbology:** Explicitly set to `Code128()` (though this is the default)

### Other 1D Barcode Examples:

**EAN13 (Retail Products):**
```dart
SfBarcodeGenerator(
  value: '9735940564824',
  symbology: EAN13(),
)
```

**Code39 (Alphanumeric):**
```dart
SfBarcodeGenerator(
  value: 'CODE39',
  symbology: Code39(),
)
```

**UPCA (North American Retail):**
```dart
SfBarcodeGenerator(
  value: '72527273070',
  symbology: UPCA(),
)
```

---

## Create Your First QR Code

QR codes are two-dimensional barcodes that can store more data and are widely used for URLs, contact information, and payments.

### Complete Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class QRCodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('QR Code Generator'),
        backgroundColor: Colors.green,
      ),
      body: Center(
        child: Container(
          height: 350,
          width: 350,
          child: SfBarcodeGenerator(
            value: 'http://www.syncfusion.com',
            symbology: QRCode(),
          ),
        ),
      ),
    );
  }
}
```

### Code Walkthrough:

1. **Square container:** QR codes are square, so use equal height and width
2. **Larger size:** QR codes typically need more space (300-350 pixels minimum)
3. **symbology:** Set to `QRCode()` to generate a 2D QR code
4. **value:** Can be a URL, text, or any data (up to 4,296 alphanumeric characters)

### QR Code with Error Correction:

```dart
SfBarcodeGenerator(
  value: 'https://www.syncfusion.com',
  symbology: QRCode(
    errorCorrectionLevel: ErrorCorrectionLevel.high,
  ),
)
```

**Error Correction Levels:**
- **Low** - Recovers up to 7% damaged data
- **Medium** - Recovers up to 15% damaged data
- **Quartile** - Recovers up to 25% damaged data
- **High** - Recovers up to 30% damaged data (default)

### Data Matrix Example:

```dart
SfBarcodeGenerator(
  value: 'www.syncfusion.com',
  symbology: DataMatrix(),
)
```

---

## Display Input Value

To show the input value text below the barcode, enable the `showValue` property.

### Example with Text Display

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class BarcodeWithText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Barcode with Text'),
      ),
      body: Center(
        child: Container(
          height: 350,
          width: 350,
          child: SfBarcodeGenerator(
            value: 'http://www.syncfusion.com',
            showValue: true,
            textSpacing: 15,
            symbology: QRCode(),
          ),
        ),
      ),
    );
  }
}
```

### Text Display Properties:

- **showValue:** Set to `true` to display the text (default is `false`)
- **textSpacing:** Controls the space between barcode and text (default is 2)
- Text appears below the barcode automatically

### Output:

This generates a QR code with the URL displayed below it.

![QR Code with Text](../images/getting-started/qr-with-text.png)

---

## Common Properties Overview

Here are the most frequently used properties when creating barcodes:

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| **value** | String | The data to encode (required) | - |
| **symbology** | Symbology | Barcode type (Code128, QRCode, etc.) | Code128 |
| **showValue** | bool | Display input value below barcode | false |
| **barColor** | Color | Color of barcode bars/modules | Colors.black |
| **backgroundColor** | Color | Background color | Colors.white |
| **textStyle** | TextStyle | Style for displayed text | Default |
| **textSpacing** | double | Space between barcode and text | 2 |
| **textAlign** | TextAlign | Horizontal text alignment | center |

### Quick Reference Example:

```dart
SfBarcodeGenerator(
  value: 'BARCODE123',           // Required: data to encode
  symbology: Code128(module: 2), // Barcode type with bar width
  showValue: true,                // Show text below barcode
  barColor: Colors.blue,          // Blue bars
  backgroundColor: Colors.grey[100], // Light grey background
  textStyle: TextStyle(          // Custom text styling
    fontSize: 16,
    fontWeight: FontWeight.bold,
  ),
  textSpacing: 10,                // 10 pixels between barcode and text
  textAlign: TextAlign.center,    // Center-align text
)
```

---

## Next Steps

Now that you've created your first barcodes, explore more advanced features:

### Learn About Different Barcode Types

📄 **Read:** [barcode-types.md](barcode-types.md)
- Explore all 14 barcode symbologies
- Understand which barcode type fits your use case
- Learn about input validation and character support
- See comparison tables and best practices

### Customize Your Barcodes

📄 **Read:** [customization.md](customization.md)
- Style text with custom fonts, colors, and spacing
- Customize bar colors and background
- Control bar width (module) for better scanning
- Implement responsive sizing

### Implement Accessibility

📄 **Read:** [accessibility.md](accessibility.md)
- Ensure sufficient color contrast
- Support large fonts and text scaling
- Follow accessibility best practices
- Test for readability

### Common Implementation Patterns:

1. **Product labeling system** - Use EAN13 or UPCA for retail items
2. **QR code for URLs** - Generate QR codes for marketing and websites
3. **Inventory tracking** - Implement Code128 for asset management
4. **Ticket generation** - Create unique barcodes for events

### Additional Resources:

- **API Documentation:** [SfBarcodeGenerator Class](https://pub.dev/documentation/syncfusion_flutter_barcodes/latest/barcodes/SfBarcodeGenerator-class.html)
- **Video Tutorial:** [Flutter Barcode Generator](https://www.youtube.com/watch?v=ckAHrT2CR8A)
- **GitHub Examples:** [Flutter Examples Repository](https://github.com/syncfusion/flutter-examples)
- **Official Guide:** [Syncfusion Documentation](https://help.syncfusion.com/flutter/barcode/overview)

---

## Troubleshooting

### Common Issues:

**Issue:** Barcode doesn't display
- **Solution:** Ensure the container has a defined height
- **Solution:** Check that the value parameter is not empty

**Issue:** Barcode is too small or cut off
- **Solution:** Increase container height/width
- **Solution:** Use the `module` property to control bar width

**Issue:** Invalid value error
- **Solution:** Check input validation rules for the symbology type
- **Solution:** Ensure numeric-only types (EAN, UPC) receive only numbers

**Issue:** Text overlaps with barcode
- **Solution:** Increase `textSpacing` property value
- **Solution:** Ensure adequate container height

---

**You're now ready to implement barcodes in your Flutter application!** Continue to the next guide to learn about all available barcode types and when to use each one.
