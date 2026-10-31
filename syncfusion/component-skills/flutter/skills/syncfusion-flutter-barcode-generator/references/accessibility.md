---
title: Accessibility Features
parent: syncfusion-flutter-barcode-generator
nav_order: 4
---

# Accessibility Features

Ensuring your barcodes are accessible improves usability for all users, including those with visual impairments or using assistive technologies. This guide covers accessibility features and best practices for the Syncfusion Flutter Barcode Generator.

## Table of Contents

1. [Accessibility Overview](#accessibility-overview)
2. [Sufficient Contrast Support](#sufficient-contrast-support)
3. [Large Fonts Support](#large-fonts-support)
4. [Semantic Labels](#semantic-labels)
5. [Screen Reader Compatibility](#screen-reader-compatibility)
6. [High Contrast Themes](#high-contrast-themes)
7. [Accessibility Best Practices](#accessibility-best-practices)
8. [Testing Accessibility](#testing-accessibility)

---

## Accessibility Overview

**What is Accessibility in Barcodes?**

Barcode accessibility ensures that:
- Visual elements have sufficient contrast for users with low vision
- Text scales appropriately with system font settings
- Screen readers can convey barcode information
- Alternative text is available for non-visual users
- High contrast modes are supported

**Why Accessibility Matters:**
- **Legal Compliance:** Meet WCAG (Web Content Accessibility Guidelines) standards
- **Inclusive Design:** Serve users with diverse abilities
- **Better UX:** Improved usability benefits all users
- **Professional Standards:** Follow industry best practices

**SfBarcodeGenerator Accessibility Features:**
- Automatic contrast handling
- Support for system text scaling
- Customizable colors for contrast requirements
- Integration with Flutter's semantics system

---

## Sufficient Contrast Support

The `SfBarcodeGenerator` supports customizable colors to ensure sufficient contrast between barcode elements and backgrounds.

### Understanding Contrast Ratios

**WCAG Standards:**
- **AA Level (Minimum):** 4.5:1 contrast ratio for normal text
- **AAA Level (Enhanced):** 7:1 contrast ratio for normal text
- **Large Text:** 3:1 contrast ratio minimum

**For Barcodes:**
- Barcode bars/modules should have high contrast with background
- Text should meet contrast requirements
- Recommended: Black on white (21:1 ratio - optimal)

### Color Customization for Contrast

**Example: High Contrast Barcode**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class HighContrastBarcode extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          height: 150,
          child: SfBarcodeGenerator(
            value: '12345678',
            symbology: Code128(),
            barColor: Colors.black, // Maximum contrast
            backgroundColor: Colors.white,
            showValue: true,
            textStyle: TextStyle(
              color: Colors.black,
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
```

### Contrast Recommendations

**Optimal Combinations:**

```dart
// Black on white (21:1 ratio - best)
barColor: Colors.black
backgroundColor: Colors.white

// Very dark blue on white (12:1 ratio - excellent)
barColor: Color(0xFF0D47A1) // Blue 900
backgroundColor: Colors.white

// Dark grey on white (10:1 ratio - excellent)
barColor: Color(0xFF424242) // Grey 800
backgroundColor: Colors.white
```

**Acceptable Combinations:**

```dart
// Dark blue on light background (7:1 ratio - good)
barColor: Color(0xFF1976D2) // Blue 700
backgroundColor: Colors.grey[50]

// Black on light grey (15:1 ratio - excellent)
barColor: Colors.black
backgroundColor: Colors.grey[100]
```

**Avoid:**

```dart
// Low contrast - poor accessibility ❌
barColor: Colors.grey
backgroundColor: Colors.grey[300]

// Very low contrast ❌
barColor: Colors.yellow
backgroundColor: Colors.white
```

### Testing Contrast

**Online Tools:**
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Coolors Contrast Checker: https://coolors.co/contrast-checker

**Example Check:**
```dart
// Use contrast checker with these hex values:
// Bar color: #000000 (black)
// Background: #FFFFFF (white)
// Result: 21:1 ratio (WCAG AAA compliant)
```

---

## Large Fonts Support

The `SfBarcodeGenerator` automatically respects Flutter's text scaling settings, ensuring text scales properly for users who need larger fonts.

### How Text Scaling Works

Flutter provides `MediaQueryData.textScaleFactor` which users can adjust in their device's accessibility settings. The barcode generator automatically applies this scaling to displayed text.

**System Integration:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class TextScalingExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Get the system text scale factor
    final textScaleFactor = MediaQuery.of(context).textScaleFactor;
    
    return Scaffold(
      body: Center(
        child: Container(
          height: 180, // Extra height to accommodate scaled text
          child: SfBarcodeGenerator(
            value: '123456789',
            symbology: Code128(),
            showValue: true,
            textStyle: TextStyle(
              fontSize: 16, // Base font size (will be scaled)
              fontWeight: FontWeight.normal,
            ),
            textSpacing: 15,
          ),
        ),
      ),
    );
  }
}
```

### Supporting Text Scaling

**Best Practices:**

1. **Use Appropriate Base Font Size:**
```dart
textStyle: TextStyle(
  fontSize: 16, // Good base size (will scale to 20, 24, etc.)
  fontWeight: FontWeight.w500,
)
```

2. **Provide Adequate Container Height:**
```dart
// Allow extra space for scaled text
Container(
  height: 200, // Enough room for 2x text scaling
  child: SfBarcodeGenerator(
    value: 'SCALABLE',
    showValue: true,
    textSpacing: 15, // Extra spacing helps with larger text
  ),
)
```

3. **Test with Different Scale Factors:**
```dart
// Simulate text scaling for testing
MediaQuery(
  data: MediaQueryData(textScaleFactor: 2.0), // 200% scaling
  child: SfBarcodeGenerator(
    value: 'TEST',
    showValue: true,
    textStyle: TextStyle(fontSize: 16),
  ),
)
```

### Responsive Text Sizing

**Dynamic Font Size Based on Scale Factor:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ResponsiveTextBarcode extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final textScaleFactor = MediaQuery.of(context).textScaleFactor;
    
    // Adjust container height based on text scaling
    final containerHeight = 150.0 + (textScaleFactor - 1.0) * 50;
    
    return Container(
      height: containerHeight,
      child: SfBarcodeGenerator(
        value: '987654321',
        symbology: Code128(),
        showValue: true,
        textStyle: TextStyle(
          fontSize: 16, // Automatically scales with system settings
          fontWeight: FontWeight.w600,
        ),
        textSpacing: 12 * textScaleFactor, // Scale spacing too
      ),
    );
  }
}
```

### Font Size Recommendations

**Base Font Sizes:**
- **Small labels:** 12-14px (scales to 18-21px at 1.5x)
- **Standard labels:** 14-16px (scales to 21-24px at 1.5x)
- **Large labels:** 18-20px (scales to 27-30px at 1.5x)

**Testing Scale Factors:**
- 1.0x - Default (100%)
- 1.15x - Slightly larger (115%)
- 1.3x - Medium (130%)
- 1.5x - Large (150%)
- 2.0x - Extra large (200%)

---

## Semantic Labels

Semantic labels provide context for assistive technologies like screen readers, helping users understand barcode content and purpose.

### Adding Semantic Labels

Use Flutter's `Semantics` widget to provide accessible descriptions:

**Example:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class SemanticBarcodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Product barcode for item SKU 12345678',
      hint: 'Scan this barcode to view product details',
      child: Container(
        height: 150,
        child: SfBarcodeGenerator(
          value: '12345678',
          symbology: EAN13(),
          showValue: true,
        ),
      ),
    );
  }
}
```

### Semantic Properties

**Available Properties:**

| Property | Purpose | Example |
|----------|---------|---------|
| **label** | Describes the element | 'Product barcode' |
| **hint** | Provides usage guidance | 'Scan to view details' |
| **value** | Current value | 'Barcode number 12345' |
| **excludeSemantics** | Hides from screen readers | true/false |

**Comprehensive Example:**

```dart
Semantics(
  label: 'QR code for product information',
  hint: 'Scan with camera to access product page',
  value: 'Product code ABC123',
  excludeSemantics: false,
  child: Container(
    height: 300,
    width: 300,
    child: SfBarcodeGenerator(
      value: 'https://example.com/product/ABC123',
      symbology: QRCode(),
      showValue: true,
    ),
  ),
)
```

### Context-Specific Labels

**Product Label:**
```dart
Semantics(
  label: 'Product barcode for ${productName}',
  hint: 'Scan to add to cart or view price',
  child: SfBarcodeGenerator(value: productCode, symbology: EAN13()),
)
```

**Ticket Barcode:**
```dart
Semantics(
  label: 'Event ticket barcode',
  hint: 'Show this barcode at venue entrance for admission',
  value: 'Ticket number ${ticketNumber}',
  child: SfBarcodeGenerator(value: ticketNumber, symbology: Code128()),
)
```

**Shipping Label:**
```dart
Semantics(
  label: 'Shipping tracking barcode',
  hint: 'Scan to track package delivery status',
  value: 'Tracking number ${trackingNumber}',
  child: SfBarcodeGenerator(value: trackingNumber, symbology: Code128()),
)
```

---

## Screen Reader Compatibility

Screen readers announce semantic information to users who cannot see the screen. Proper implementation ensures barcode information is accessible.

### Best Practices for Screen Readers

1. **Provide Meaningful Labels:**
```dart
Semantics(
  label: 'Product identification barcode',
  hint: 'Contains product SKU 12345678',
  child: SfBarcodeGenerator(
    value: '12345678',
    symbology: Code128(),
    showValue: true,
  ),
)
```

2. **Include Value Text:**
```dart
// Always show the value text for screen readers to announce
SfBarcodeGenerator(
  value: 'ABC123XYZ',
  showValue: true, // Important for accessibility
  textStyle: TextStyle(fontSize: 16),
)
```

3. **Group Related Elements:**
```dart
Semantics(
  label: 'Product label',
  child: Column(
    children: [
      Text('Product Name: Premium Widget'),
      Semantics(
        label: 'Product barcode',
        child: SfBarcodeGenerator(
          value: '12345678',
          symbology: EAN13(),
          showValue: true,
        ),
      ),
      Text('Price: \$29.99'),
    ],
  ),
)
```

### Testing with Screen Readers

**iOS (VoiceOver):**
- Settings → Accessibility → VoiceOver → On
- Swipe to navigate, double-tap to activate
- Test that barcode announces label and value

**Android (TalkBack):**
- Settings → Accessibility → TalkBack → On
- Swipe to navigate, double-tap to activate
- Verify barcode description is clear

**Example Test Script:**
```dart
// Test that screen reader announces:
// 1. Barcode label/purpose
// 2. Barcode value (if showValue: true)
// 3. Any usage hints

Semantics(
  label: 'Ticket barcode', // Should announce this first
  hint: 'Show at entrance', // Should announce this second
  child: SfBarcodeGenerator(
    value: 'TKT-2024-001', // Should announce value if showValue: true
    showValue: true,
    symbology: Code128(),
  ),
)
```

---

## High Contrast Themes

Support system-wide high contrast themes to ensure barcodes remain visible for users with low vision.

### Detecting High Contrast Mode

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class HighContrastBarcodeExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Check if high contrast is enabled
    final isHighContrast = MediaQuery.of(context).highContrast;
    
    return Container(
      height: 150,
      child: SfBarcodeGenerator(
        value: '12345678',
        symbology: Code128(),
        // Use maximum contrast colors in high contrast mode
        barColor: isHighContrast ? Colors.black : Colors.blue[800]!,
        backgroundColor: isHighContrast ? Colors.white : Colors.grey[50]!,
        showValue: true,
        textStyle: TextStyle(
          color: isHighContrast ? Colors.black : Colors.grey[800],
          fontWeight: isHighContrast ? FontWeight.bold : FontWeight.normal,
        ),
      ),
    );
  }
}
```

### Theme-Aware Barcodes

**Light and Dark Theme Support:**

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ThemedBarcode extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final brightness = Theme.of(context).brightness;
    final isHighContrast = MediaQuery.of(context).highContrast;
    
    // Choose colors based on theme and contrast mode
    final barColor = brightness == Brightness.dark 
        ? Colors.white 
        : Colors.black;
    
    final backgroundColor = brightness == Brightness.dark
        ? (isHighContrast ? Colors.black : Color(0xFF1E1E1E))
        : (isHighContrast ? Colors.white : Colors.grey[50]!);
    
    return Container(
      height: 150,
      child: SfBarcodeGenerator(
        value: 'THEME-AWARE',
        symbology: Code128(),
        barColor: barColor,
        backgroundColor: backgroundColor,
        showValue: true,
        textStyle: TextStyle(
          color: barColor,
          fontWeight: isHighContrast ? FontWeight.bold : FontWeight.normal,
        ),
      ),
    );
  }
}
```

---

## Accessibility Best Practices

### Design Guidelines

1. **✅ Always Use High Contrast**
   - Black on white is optimal
   - Minimum 4.5:1 contrast ratio
   - Test with contrast checker tools

2. **✅ Show Value Text**
   - Enable `showValue: true` by default
   - Provides visual confirmation
   - Helps screen reader users

3. **✅ Adequate Sizing**
   - Minimum 150 pixels for 1D barcodes
   - Minimum 200x200 pixels for QR codes
   - Consider viewing distance

4. **✅ Semantic Labels**
   - Always provide meaningful labels
   - Include usage hints
   - Describe purpose clearly

5. **✅ Support Text Scaling**
   - Use appropriate base font sizes
   - Allow container height to expand
   - Test with 2x scaling

6. **✅ Theme Integration**
   - Support light and dark themes
   - Adapt to high contrast mode
   - Use theme-aware colors

### Implementation Checklist

- [ ] Contrast ratio meets WCAG AA (4.5:1 minimum)
- [ ] `showValue: true` for human readability
- [ ] Semantic labels provided with Semantics widget
- [ ] Text scales with system settings
- [ ] Container height accommodates scaled text
- [ ] High contrast mode support implemented
- [ ] Light and dark theme support
- [ ] Tested with screen readers (VoiceOver/TalkBack)
- [ ] Barcode size adequate for readability
- [ ] Alternative text available for non-visual users

### Code Review Questions

Before deploying barcodes, ask:
- Does the barcode have sufficient contrast?
- Is the value text displayed?
- Are semantic labels present?
- Does text scale appropriately?
- Is the barcode size adequate?
- Have you tested with assistive technologies?

---

## Testing Accessibility

### Manual Testing

**Visual Testing:**
1. Check contrast ratio with online tools
2. View in different lighting conditions
3. Test with various screen brightness levels
4. Verify at different distances

**Screen Reader Testing:**
1. Enable VoiceOver (iOS) or TalkBack (Android)
2. Navigate to barcode
3. Verify announcement is clear and useful
4. Check that value is announced

**Text Scaling Testing:**
1. Set device text size to 200%
2. Verify text doesn't overflow
3. Check container height is adequate
4. Ensure spacing is maintained

**High Contrast Testing:**
1. Enable high contrast mode on device
2. Verify barcode remains visible
3. Check text contrast
4. Test with light and dark themes

### Automated Testing

**Contrast Testing:**
```dart
// Test contrast ratio programmatically
import 'package:flutter_test/flutter_test.dart';

testWidgets('Barcode has sufficient contrast', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: SfBarcodeGenerator(
          value: 'TEST',
          barColor: Colors.black,
          backgroundColor: Colors.white,
        ),
      ),
    ),
  );
  
  // Verify colors
  final barcodeFinder = find.byType(SfBarcodeGenerator);
  expect(barcodeFinder, findsOneWidget);
  
  // Assert sufficient contrast (manual verification needed)
  // Black (#000000) on White (#FFFFFF) = 21:1 ratio ✅
});
```

**Semantics Testing:**
```dart
testWidgets('Barcode has semantic label', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(
      home: Scaffold(
        body: Semantics(
          label: 'Product barcode',
          child: SfBarcodeGenerator(value: '12345678', symbology: Code128()),
        ),
      ),
    ),
  );
  
  // Verify semantic label exists
  expect(
    tester.getSemantics(find.byType(SfBarcodeGenerator)),
    matchesSemantics(label: 'Product barcode'),
  );
});
```

### User Testing

**Test with Real Users:**
- Users with low vision
- Users with complete blindness (screen reader users)
- Users with motor impairments
- Users with cognitive disabilities
- Older adults

**Feedback Areas:**
- Is the barcode visible and clear?
- Can you understand its purpose?
- Is the text readable?
- Can you use it successfully?

---

## Common Accessibility Issues

**Issue:** Low contrast barcode
- **Solution:** Use black on white or verify 4.5:1 contrast minimum

**Issue:** Text too small at default size
- **Solution:** Use minimum 16px base font size, support text scaling

**Issue:** Screen reader doesn't announce anything
- **Solution:** Add Semantics widget with label and hint

**Issue:** Barcode invisible in dark theme
- **Solution:** Implement theme-aware colors (white bars on dark background)

**Issue:** Text overlaps when scaled
- **Solution:** Increase container height and textSpacing

**Issue:** No context for barcode purpose
- **Solution:** Add meaningful semantic labels describing usage

---

## Resources

**Guidelines:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Flutter Accessibility](https://docs.flutter.dev/development/accessibility-and-localization/accessibility)
- [Material Design Accessibility](https://material.io/design/usability/accessibility.html)

**Testing Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- Flutter DevTools Accessibility Inspector

**Screen Readers:**
- iOS VoiceOver
- Android TalkBack
- macOS VoiceOver
- Windows Narrator

---

**Making barcodes accessible ensures they work for everyone!** By following these guidelines and testing thoroughly, you create an inclusive experience that benefits all users.

**Next Steps:**
- Review [customization options](customization.md) for accessible design
- Check [barcode types](barcode-types.md) for appropriate selection
- Explore [getting started](getting-started.md) for implementation basics
