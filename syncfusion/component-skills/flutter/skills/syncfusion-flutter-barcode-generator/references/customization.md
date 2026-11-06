---
title: Customization and Styling
parent: syncfusion-flutter-barcode-generator
nav_order: 3
---

# Customization and Styling

The Syncfusion Flutter Barcode Generator provides extensive customization options to match your app's design and ensure optimal scannability. This guide covers text styling, bar customization, color control, and sizing strategies.

## Table of Contents

1. [Customization Overview](#customization-overview)
2. [Text Customization](#text-customization)
   - [Show/Hide Value](#showhide-value)
   - [Text Style Configuration](#text-style-configuration)
   - [Text Spacing](#text-spacing)
   - [Text Alignment](#text-alignment)
3. [Bar Customization](#bar-customization)
   - [Module Property (Bar Width)](#module-property-bar-width)
   - [Bar Color](#bar-color)
   - [Background Color](#background-color)
4. [Size and Layout Control](#size-and-layout-control)
5. [Complete Customization Examples](#complete-customization-examples)
6. [Best Practices](#best-practices)

---

## Customization Overview

The `SfBarcodeGenerator` widget provides two main areas of customization:

**Text Customization:**
- Show or hide the input value
- Style text with fonts, colors, and weights
- Control spacing between barcode and text
- Align text horizontally

**Bar Customization:**
- Adjust bar width (module size)
- Change bar color
- Set background color
- Control overall barcode size

All customizations maintain barcode scannability when used appropriately.

---

## Text Customization

### Show/Hide Value

The `showValue` property controls whether the input value text appears below the barcode.

**Property:**
- Type: `bool`
- Default: `false`
- When `true`: Displays the input value below the barcode
- When `false`: Shows only the barcode graphic

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ShowValueExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 300,
          child: SfBarcodeGenerator(
            value: '12634388927',
            showValue: true, // Display text below barcode
          ),
        ),
      ),
    );
  }
}
```

**Use Cases:**
- **Show value (`true`):** Product labels, human-readable identification, documentation
- **Hide value (`false`):** Clean aesthetic, when text is displayed separately, space constraints

---

### Text Style Configuration

The `textStyle` property allows complete control over the appearance of the displayed value text.

**Property:**
- Type: `TextStyle`
- Default: System default text style
- Supports all TextStyle properties

**Available TextStyle Properties:**

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| **fontSize** | double | Text size in logical pixels | `16.0` |
| **fontWeight** | FontWeight | Text weight (thickness) | `FontWeight.bold` |
| **fontStyle** | FontStyle | Italic or normal | `FontStyle.italic` |
| **fontFamily** | String | Font family name | `'Roboto'` |
| **color** | Color | Text color | `Colors.red` |
| **letterSpacing** | double | Space between letters | `1.5` |
| **wordSpacing** | double | Space between words | `2.0` |
| **decoration** | TextDecoration | Underline, strikethrough, etc. | `TextDecoration.underline` |

**Basic Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class TextStyleExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 300,
          child: SfBarcodeGenerator(
            value: '12634388927',
            showValue: true,
            textStyle: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.red,
            ),
          ),
        ),
      ),
    );
  }
}
```

**Advanced Example:**

```dart
SfBarcodeGenerator(
  value: 'PRODUCT-2024',
  showValue: true,
  textStyle: TextStyle(
    fontFamily: 'Times',
    fontSize: 16,
    fontStyle: FontStyle.italic,
    fontWeight: FontWeight.bold,
    color: Colors.red,
    letterSpacing: 1.2,
  ),
  symbology: Code128(),
)
```

**Font Family Example:**

```dart
// Using custom font (ensure font is added to pubspec.yaml)
textStyle: TextStyle(
  fontFamily: 'Courier',
  fontSize: 14,
  fontWeight: FontWeight.w600,
  color: Colors.black87,
)
```

---

### Text Spacing

The `textSpacing` property controls the vertical space between the barcode and the displayed text.

**Property:**
- Type: `double`
- Default: `2`
- Unit: Logical pixels
- Only applies when `showValue` is `true`

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class TextSpacingExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 300,
          child: SfBarcodeGenerator(
            value: '12634388927',
            showValue: true,
            textSpacing: 25, // 25 pixels between barcode and text
          ),
        ),
      ),
    );
  }
}
```

**Comparison:**

```dart
// Small spacing (compact)
SfBarcodeGenerator(
  value: 'COMPACT',
  showValue: true,
  textSpacing: 5, // Minimal space
)

// Default spacing
SfBarcodeGenerator(
  value: 'DEFAULT',
  showValue: true,
  textSpacing: 2, // Default
)

// Large spacing (prominent)
SfBarcodeGenerator(
  value: 'SPACED',
  showValue: true,
  textSpacing: 20, // More separation
)
```

**Use Cases:**
- **Small spacing (2-5):** Compact labels, limited space
- **Medium spacing (10-15):** Standard product labels
- **Large spacing (20-30):** Emphasis on text, clear separation

---

### Text Alignment

The `textAlign` property controls the horizontal alignment of the displayed value text.

**Property:**
- Type: `TextAlign`
- Default: `TextAlign.center`
- Options: `start`, `center`, `end`, `left`, `right`, `justify`

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class TextAlignExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 240,
          child: SfBarcodeGenerator(
            value: '12634',
            showValue: true,
            textAlign: TextAlign.end, // Align to end (right in LTR)
          ),
        ),
      ),
    );
  }
}
```

**Alignment Options:**

```dart
// Center alignment (default)
SfBarcodeGenerator(
  value: 'CENTER',
  showValue: true,
  textAlign: TextAlign.center,
)

// Start alignment (left in LTR, right in RTL)
SfBarcodeGenerator(
  value: 'START',
  showValue: true,
  textAlign: TextAlign.start,
)

// End alignment (right in LTR, left in RTL)
SfBarcodeGenerator(
  value: 'END',
  showValue: true,
  textAlign: TextAlign.end,
)
```

**Use Cases:**
- **Center:** Most common, balanced appearance
- **Start:** Left-aligned labels, tabular data
- **End:** Right-aligned labels, special formatting

---

## Bar Customization

### Module Property (Bar Width)

The `module` property defines the width of the smallest bar (1D) or dot (2D) in the barcode.

**Property:**
- Type: `int?`
- Default: Auto-calculated based on available space
- Unit: Logical pixels
- Applies to all symbology types

**How It Works:**

**For 1D Barcodes:**
- Defines the width of the narrowest bar
- Wider bars are multiples of this value
- Larger module = larger, more scannable barcode

**For 2D Barcodes:**
- Defines the size of each square module (dot)
- Determines overall QR code or Data Matrix size
- Larger module = bigger, easier to scan

#### One-Dimensional Barcodes (1D)

**Example with Module:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ModuleExample1D extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 230,
          child: SfBarcodeGenerator(
            backgroundColor: Color.fromRGBO(193, 250, 250, 1),
            value: '123456789',
            showValue: true,
            symbology: Codabar(module: 1), // 1 pixel bar width
          ),
        ),
      ),
    );
  }
}
```

**Without Module (Auto-calculated):**

```dart
SfBarcodeGenerator(
  backgroundColor: Color.fromRGBO(193, 250, 250, 1),
  value: '123456789',
  showValue: true,
  symbology: Codabar(), // Auto-calculated width
)
```

**Comparison:**

```dart
// Thin bars (compact)
symbology: Code128(module: 1)

// Medium bars (standard)
symbology: Code128(module: 2)

// Thick bars (high readability)
symbology: Code128(module: 3)
```

#### Two-Dimensional Barcodes (2D)

**Example with Module:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ModuleExample2D extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 230,
          child: SfBarcodeGenerator(
            backgroundColor: Color.fromRGBO(193, 250, 250, 1),
            value: '123456789',
            symbology: QRCode(module: 2), // 2x2 pixel modules
          ),
        ),
      ),
    );
  }
}
```

**Without Module (Auto-calculated):**

```dart
SfBarcodeGenerator(
  backgroundColor: Color.fromRGBO(193, 250, 250, 1),
  value: '123456789',
  symbology: QRCode(), // Auto-calculated module size
)
```

**Use Cases:**
- **Small module (1-2):** Compact labels, space constraints
- **Medium module (2-3):** Standard applications, balanced size
- **Large module (4-6):** Long-distance scanning, high visibility
- **Auto (not specified):** Let system optimize based on container size

---

### Bar Color

The `barColor` property changes the color of the barcode bars or modules.

**Property:**
- Type: `Color`
- Default: `Colors.black`
- Supports any Flutter Color

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class BarColorExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 240,
          child: SfBarcodeGenerator(
            value: '12634',
            barColor: Colors.deepPurple, // Purple bars
          ),
        ),
      ),
    );
  }
}
```

**Color Examples:**

```dart
// Solid colors
barColor: Colors.blue
barColor: Colors.red
barColor: Colors.green

// Custom RGB colors
barColor: Color.fromRGBO(255, 87, 34, 1.0)

// Hex colors
barColor: Color(0xFF6200EE)

// Material colors with shades
barColor: Colors.blue[700]
```

**Best Practices:**
- **Dark colors (black, dark blue, dark brown):** Best for scanning
- **Bright colors (red, green, blue):** Use with caution, test scannability
- **Light colors (yellow, light grey):** Avoid, poor contrast
- **Always ensure sufficient contrast** with background color

---

### Background Color

The `backgroundColor` property sets the background color behind the barcode.

**Property:**
- Type: `Color`
- Default: `Colors.white`
- Supports any Flutter Color

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class BackgroundColorExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Container(
          height: 150,
          width: 230,
          child: SfBarcodeGenerator(
            backgroundColor: Color.fromRGBO(193, 250, 250, 1), // Light cyan
            value: '123456789',
            symbology: Codabar(),
          ),
        ),
      ),
    );
  }
}
```

**Background Examples:**

```dart
// Light backgrounds (recommended for dark bars)
backgroundColor: Colors.white
backgroundColor: Colors.grey[100]
backgroundColor: Color.fromRGBO(245, 245, 245, 1.0)

// Colored backgrounds
backgroundColor: Color.fromRGBO(193, 250, 250, 1) // Light cyan
backgroundColor: Colors.amber[50] // Very light amber

// Transparent background
backgroundColor: Colors.transparent
```

**Best Practices:**
- **White or very light backgrounds:** Optimal for scanning
- **Maintain high contrast ratio:** 4.5:1 minimum for accessibility
- **Test scanning:** Some colored backgrounds may reduce readability
- **Avoid dark backgrounds** with dark bars (use light bar colors instead)

---

## Size and Layout Control

### Container Sizing

The barcode requires a container with defined dimensions. The size affects readability and scanning distance.

**Basic Sizing:**

```dart
Container(
  height: 150,  // Fixed height
  width: 300,   // Fixed width
  child: SfBarcodeGenerator(
    value: 'BARCODE',
    symbology: Code128(),
  ),
)
```

**Responsive Sizing:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ResponsiveBarcodeSize extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    
    return Container(
      height: 150,
      width: screenWidth * 0.8, // 80% of screen width
      child: SfBarcodeGenerator(
        value: 'RESPONSIVE',
        showValue: true,
      ),
    );
  }
}
```

**Square Sizing (for QR Codes):**

```dart
Container(
  height: 300,
  width: 300, // Equal height and width
  child: SfBarcodeGenerator(
    value: 'https://www.example.com',
    symbology: QRCode(),
    showValue: true,
  ),
)
```

**Flexible Sizing:**

```dart
// Expand to fill available space
Expanded(
  child: SfBarcodeGenerator(
    value: 'FLEXIBLE',
    symbology: Code128(),
  ),
)

// Flexible with flex factor
Flexible(
  flex: 2,
  child: SfBarcodeGenerator(
    value: 'FLEX',
    symbology: Code128(),
  ),
)
```

### Size Recommendations

**One-Dimensional Barcodes:**
- **Minimum height:** 80-100 pixels
- **Minimum width:** 150-200 pixels
- **Recommended height:** 120-150 pixels
- **Recommended width:** 250-350 pixels

**QR Codes:**
- **Minimum size:** 150x150 pixels
- **Recommended size:** 250x250 to 350x350 pixels
- **Large size:** 400x400+ pixels for long-distance scanning

**Data Matrix:**
- **Minimum size:** 100x100 pixels
- **Recommended size:** 200x200 to 300x300 pixels

### Aspect Ratio Considerations

**1D Barcodes:**
- Width-to-height ratio typically 2:1 to 3:1
- Height affects scanning reliability
- Width depends on data length and module size

**QR Codes:**
- Must be square (1:1 aspect ratio)
- Non-square containers will center the QR code

**Data Matrix:**
- Square or rectangular depending on encoding
- Prefer square containers

---

## Complete Customization Examples

### Example 1: Fully Customized 1D Barcode

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class CustomizedCode128 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(title: Text('Customized Barcode')),
      body: Center(
        child: Card(
          elevation: 4,
          child: Padding(
            padding: EdgeInsets.all(20),
            child: Container(
              height: 180,
              width: 350,
              child: SfBarcodeGenerator(
                value: 'CUSTOM-2024-12345',
                symbology: Code128(module: 2),
                showValue: true,
                barColor: Color(0xFF1976D2), // Material Blue 700
                backgroundColor: Colors.white,
                textStyle: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Roboto',
                  color: Color(0xFF1976D2),
                  letterSpacing: 1.5,
                ),
                textSpacing: 15,
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```

### Example 2: Branded QR Code

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class BrandedQRCode extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFF5F5F5),
      appBar: AppBar(
        title: Text('Company QR Code'),
        backgroundColor: Color(0xFF6200EE),
      ),
      body: Center(
        child: Container(
          padding: EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: Colors.black12,
                blurRadius: 10,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Scan for More Info',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF6200EE),
                ),
              ),
              SizedBox(height: 20),
              Container(
                height: 300,
                width: 300,
                child: SfBarcodeGenerator(
                  value: 'https://www.company.com/product/12345',
                  symbology: QRCode(
                    errorCorrectionLevel: ErrorCorrectionLevel.high,
                    module: 4,
                  ),
                  barColor: Color(0xFF6200EE),
                  backgroundColor: Colors.white,
                ),
              ),
              SizedBox(height: 15),
              Container(
                height: 40,
                child: SfBarcodeGenerator(
                  value: 'www.company.com',
                  showValue: true,
                  textStyle: TextStyle(
                    fontSize: 14,
                    color: Colors.grey[700],
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                  symbology: Code128(),
                  barColor: Colors.grey[700]!,
                  backgroundColor: Colors.transparent,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Example 3: Product Label with Styling

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ProductLabel extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.grey[300]!, width: 2),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Product info
          Text(
            'Product Name',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 8),
          Text(
            'SKU: PRD-2024-001',
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
            ),
          ),
          SizedBox(height: 16),
          // EAN barcode
          Container(
            height: 120,
            child: SfBarcodeGenerator(
              value: '9735940564824',
              symbology: EAN13(module: 2),
              showValue: true,
              barColor: Colors.black87,
              backgroundColor: Colors.transparent,
              textStyle: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
              textSpacing: 12,
            ),
          ),
          SizedBox(height: 12),
          // Price and info
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '\$29.99',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.green[700],
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.blue[50],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  'In Stock',
                  style: TextStyle(
                    color: Colors.blue[700],
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

### Example 4: Dark Theme Barcode

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class DarkThemeBarcode extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF121212),
      body: Center(
        child: Container(
          padding: EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Color(0xFF1E1E1E),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Container(
            height: 200,
            width: 350,
            child: SfBarcodeGenerator(
              value: 'DARK-THEME-CODE',
              symbology: Code128(module: 2),
              showValue: true,
              barColor: Colors.white, // White bars on dark background
              backgroundColor: Color(0xFF1E1E1E),
              textStyle: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
              textSpacing: 15,
            ),
          ),
        ),
      ),
    );
  }
}
```

---

## Best Practices

### Scannability Guidelines

1. **Maintain High Contrast**
   - Use black bars on white background (optimal)
   - Ensure 4.5:1 contrast ratio minimum
   - Dark bars on light backgrounds work best

2. **Test Before Production**
   - Print test samples at actual size
   - Test with multiple scanner types
   - Verify in different lighting conditions

3. **Module Size Selection**
   - Smaller modules: Compact labels, close-range scanning
   - Larger modules: Long-distance scanning, visibility
   - Auto-calculate: Let system optimize based on space

4. **Size Recommendations**
   - 1D barcodes: Minimum 120 pixels height
   - QR codes: Minimum 200x200 pixels
   - Larger for long-distance scanning

### Visual Design Guidelines

1. **Text Styling**
   - Use readable fonts (sans-serif recommended)
   - Font size 14-16 pixels for labels
   - Match brand colors when appropriate
   - Ensure text color contrasts with background

2. **Color Selection**
   - Black/dark bars: Best for reliability
   - Colored bars: Test thoroughly before production
   - Light backgrounds: White or very light grey preferred
   - Avoid red bars (some scanners struggle with red)

3. **Spacing and Layout**
   - Adequate text spacing (10-15 pixels recommended)
   - Padding around barcode (16-24 pixels)
   - Center alignment for balance
   - Consider container padding for visual appeal

### Accessibility Considerations

1. **Color Contrast**
   - Meet WCAG AA standards (4.5:1 ratio)
   - Test with contrast checker tools
   - Avoid low-contrast color combinations

2. **Text Size**
   - Respect system text scaling
   - Use relative sizing when possible
   - Test with large text settings enabled

3. **Alternative Information**
   - Always show value text for human readers
   - Provide text alternatives for screen readers
   - Include semantic labels where appropriate

### Performance Optimization

1. **Efficient Sizing**
   - Use fixed sizes when possible
   - Avoid rebuilding barcodes unnecessarily
   - Cache generated barcodes if reusing

2. **Module Selection**
   - Specify module size to avoid recalculation
   - Use consistent sizing across app
   - Balance size and performance

### Common Pitfalls to Avoid

❌ **Don't:**
- Use light-colored bars (yellow, light grey)
- Set very small module sizes (< 1 pixel)
- Use low-contrast color combinations
- Make barcodes too small (< 100 pixels)
- Use dark backgrounds with dark bars
- Ignore text spacing (causes overlap)
- Skip print testing

✅ **Do:**
- Use high contrast (black on white is optimal)
- Test printed barcodes before production
- Maintain adequate sizing for scanning
- Consider viewing distance
- Test with actual scanners
- Provide text alternatives
- Follow industry standards

---

## Troubleshooting

**Issue:** Barcode won't scan
- Ensure sufficient contrast between bar and background
- Increase module size
- Use darker bar colors (black recommended)
- Increase overall barcode size
- Test with different scanner apps

**Issue:** Text overlaps barcode
- Increase `textSpacing` value
- Increase container height
- Reduce text font size
- Check container dimensions

**Issue:** Barcode appears distorted
- Use square containers for QR codes
- Maintain proper aspect ratios
- Check container sizing constraints
- Ensure adequate space for barcode and text

**Issue:** Colors don't print correctly
- Test print samples before production
- Use CMYK-compatible colors
- Ensure printer color calibration
- Consider printer limitations

---

**Next:** Learn about [accessibility features](accessibility.md) to ensure your barcodes are inclusive and follow best practices for readability.
