# Getting Started with Syncfusion Flutter Signature Pad

This guide walks you through the installation and basic setup of the Syncfusion Flutter SignaturePad component.

## Installation

### Step 1: Add Package Dependency

Add the Syncfusion Flutter SignaturePad package to your `pubspec.yaml` file:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_signaturepad
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

### Step 2: Import the Package

Import the SignaturePad package in your Dart file:

```dart
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';
```

## Basic Implementation

### Minimal Example

Here's the simplest way to add a signature pad to your Flutter app:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';

class SimpleSignaturePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign Here')),
      body: SfSignaturePad(),
    );
  }
}
```

### Complete Basic Example

A more practical example with clear and save functionality:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';
import 'dart:ui' as ui;

class BasicSignaturePage extends StatefulWidget {
  @override
  _BasicSignaturePageState createState() => _BasicSignaturePageState();
}

class _BasicSignaturePageState extends State<BasicSignaturePage> {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Document'),
      ),
      body: Column(
        children: [
          // Signature pad area
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(16.0),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                ),
                child: SfSignaturePad(
                  key: _signaturePadKey,
                  backgroundColor: Colors.white,
                  strokeColor: Colors.black,
                  minimumStrokeWidth: 1.0,
                  maximumStrokeWidth: 4.0,
                ),
              ),
            ),
          ),
          
          // Action buttons
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    _signaturePadKey.currentState!.clear();
                  },
                  child: Text('Clear'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                  ),
                ),
                ElevatedButton(
                  onPressed: _handleSaveSignature,
                  child: Text('Save'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _handleSaveSignature() async {
    final ui.Image image = await _signaturePadKey.currentState!.toImage();
    
    // Convert to bytes if needed
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    final bytes = byteData!.buffer.asUint8List();
    
    // Show confirmation
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Signature saved! (${bytes.length} bytes)')),
    );
    
    // Here you can save to file, upload to server, etc.
  }
}
```

## Understanding the GlobalKey

The `GlobalKey<SfSignaturePadState>` is essential for accessing the signature pad's methods:

```dart
// Declare the key
final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();

// Assign to the widget
SfSignaturePad(
  key: _signaturePadKey,
  // ... other properties
)

// Access methods
_signaturePadKey.currentState!.clear();           // Clear the signature
final image = await _signaturePadKey.currentState!.toImage(); // Get image
```

## Quick Configuration Options

### Background Color

```dart
SfSignaturePad(
  backgroundColor: Colors.grey[100],
)
```

### Stroke Customization

```dart
SfSignaturePad(
  strokeColor: Colors.blue,
  minimumStrokeWidth: 1.0,
  maximumStrokeWidth: 4.0,
)
```

### Transparent Background

```dart
SfSignaturePad(
  backgroundColor: Colors.transparent,
)
```

## Common Setup Patterns

### With Border Container

```dart
Container(
  height: 200,
  decoration: BoxDecoration(
    border: Border.all(color: Colors.black, width: 2),
    borderRadius: BorderRadius.circular(8),
  ),
  child: SfSignaturePad(
    backgroundColor: Colors.white,
  ),
)
```

### With Label

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text(
      'Signature',
      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
    ),
    SizedBox(height: 8),
    Container(
      height: 150,
      decoration: BoxDecoration(border: Border.all(color: Colors.grey)),
      child: SfSignaturePad(backgroundColor: Colors.white),
    ),
  ],
)
```

### In a Form

```dart
Form(
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(labelText: 'Name'),
      ),
      SizedBox(height: 16),
      Text('Signature'),
      Container(
        height: 150,
        decoration: BoxDecoration(border: Border.all()),
        child: SfSignaturePad(
          key: _signaturePadKey,
          backgroundColor: Colors.white,
        ),
      ),
      SizedBox(height: 16),
      ElevatedButton(
        onPressed: _submitForm,
        child: Text('Submit'),
      ),
    ],
  ),
)
```

## Next Steps

Now that you have a basic signature pad setup, explore:

- [Overview](overview.md) - Learn about all features and capabilities
- [Customization](customization.md) - Customize appearance and behavior
- [Saving & Exporting](saving-exporting.md) - Save signatures to files or upload
- [Callbacks](callbacks.md) - Handle drawing events
- [Advanced Features](advanced-features.md) - Validation, read-only mode, and more

## Troubleshooting

### Issue: "Null check operator used on a null value"

**Solution:** Ensure the GlobalKey is properly assigned and the widget is built before accessing methods:

```dart
// Check if state exists before accessing
if (_signaturePadKey.currentState != null) {
  _signaturePadKey.currentState!.clear();
}
```

### Issue: Signature appears pixelated

**Solution:** Use higher pixelRatio when converting to image:

```dart
final image = await _signaturePadKey.currentState!.toImage(
  pixelRatio: 3.0, // Higher value = better quality
);
```

### Issue: Can't save signature

**Solution:** Always use `await` when calling `toImage()`:

```dart
Future<void> saveSignature() async {
  final image = await _signaturePadKey.currentState!.toImage();
  // ... process image
}
```
