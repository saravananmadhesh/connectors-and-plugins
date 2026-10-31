---
name: syncfusion-flutter-signature-pad
description: Implements Syncfusion Flutter SignaturePad (SfSignaturePad) for capturing handwritten signatures and drawings in Flutter apps. Use when implementing digital signatures, document signing, e-signature fields, or touch/stylus drawing surfaces. This skill covers stroke customization, background color, saving signatures as images, and clearing the pad.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Signature Pad

This skill covers the Syncfusion Flutter **SfSignaturePad** component, which provides an elegant and intuitive way to capture handwritten signatures or drawings in your Flutter applications. The component offers smooth drawing experience with touch and stylus support, along with powerful customization and export capabilities.

## When to Use This Skill

Use this skill when you need to:

- **Capture digital signatures** for documents, forms, or agreements
- **Implement e-signature functionality** in approval workflows
- **Create signature fields** in PDF forms or digital documents
- **Build document signing interfaces** for contracts, receipts, or legal forms
- **Add handwritten input** for notes, sketches, or annotations
- **Implement signature verification** screens in authentication flows
- **Create drawing surfaces** for simple sketching or markup
- **Capture user consent** with signature-based authentication
- **Build approval systems** that require handwritten signatures
- **Add signature pads** to registration, checkout, or delivery confirmation screens

## Component Overview

**SfSignaturePad** is a Flutter widget that captures smooth, high-quality signatures or drawings through touch or stylus input. It provides a customizable drawing surface with features like stroke customization, background images, minimum stroke validation, and multiple export formats.

### Key Features

- **Smooth Drawing Experience** - Optimized for touch and stylus input with smooth curves
- **Stroke Customization** - Control stroke color, width, and appearance
- **Background Support** - Add background colors or images
- **Minimum Stroke Validation** - Ensure meaningful signatures are captured
- **Multiple Export Formats** - Convert to image (PNG, JPEG) or save as raw data
- **Clear & Reset** - Programmatically clear the signature pad
- **Read-only Mode** - Display signatures without allowing modifications
- **Callbacks** - Handle draw start, draw, and draw end events
- **Transparent Background** - Support for transparent signature capture
- **High-Quality Output** - Export signatures at desired resolution

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup
- Basic SfSignaturePad implementation
- Package dependencies and imports
- First signature capture example
- Quick setup guide

### Component Overview

📄 **Read:** [references/overview.md](references/overview.md)
- SfSignaturePad widget overview and features
- When to use SignaturePad
- Core capabilities and use cases
- Widget architecture
- Basic configuration

### Customization and Styling

📄 **Read:** [references/customization.md](references/customization.md)
- Stroke color customization
- Stroke width and min/max settings
- Background color and images
- Border and container styling
- Transparent backgrounds
- Visual appearance customization
- Theme integration

### Saving and Exporting

📄 **Read:** [references/saving-exporting.md](references/saving-exporting.md)
- Converting signature to image (toImage method)
- Image format options (PNG, JPEG)
- Resolution and quality settings
- Saving signatures to storage
- Converting to Uint8List
- Clearing the signature pad
- Minimum stroke count validation
- Export patterns and best practices

### Event Handling

📄 **Read:** [references/callbacks.md](references/callbacks.md)
- onDrawStart callback
- onDraw callback
- onDrawEnd callback
- Handling signature events
- Validation during drawing
- Real-time feedback patterns
- Event argument types

### Advanced Features

📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Read-only mode for displaying signatures
- Background image support
- Signature validation techniques
- Custom drawing constraints
- Integration with forms
- Signature comparison
- Multi-signature workflows
- Undo/redo implementation patterns

### Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Screen reader support
- Semantic labels for signature fields
- Keyboard accessibility considerations
- Alternative input methods
- WCAG compliance
- Accessible signature workflows

## Quick Start Examples

### Basic Signature Pad

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';

class BasicSignaturePad extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign Here')),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(16),
            child: Container(
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
              ),
              child: SfSignaturePad(
                key: _signaturePadKey,
                backgroundColor: Colors.white,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () => _signaturePadKey.currentState!.clear(),
                child: Text('Clear'),
              ),
              ElevatedButton(
                onPressed: _saveSignature,
                child: Text('Save'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _saveSignature() async {
    final image = await _signaturePadKey.currentState!.toImage();
    // Process the image (save to file, upload, etc.)
  }
}
```

### Customized Signature Pad

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';

class CustomSignaturePad extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return SfSignaturePad(
      key: _signaturePadKey,
      backgroundColor: Colors.grey[100],
      strokeColor: Colors.blue,
      minimumStrokeWidth: 1.0,
      maximumStrokeWidth: 4.0,
      onDrawStart: () {
        print('Started drawing');
        return true;
      },
      onDraw: (offset, time) {
        print('Drawing at: $offset');
      },
      onDrawEnd: () {
        print('Finished drawing');
      },
    );
  }
}
```

### Signature Pad with Validation

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';
import 'dart:ui' as ui;

class ValidatedSignaturePad extends StatefulWidget {
  @override
  _ValidatedSignaturePadState createState() => _ValidatedSignaturePadState();
}

class _ValidatedSignaturePadState extends State<ValidatedSignaturePad> {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();
  String _validationMessage = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign Document')),
      body: Column(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(16),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey, width: 2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: SfSignaturePad(
                  key: _signaturePadKey,
                  backgroundColor: Colors.white,
                  strokeColor: Colors.black,
                  minimumStrokeWidth: 2.0,
                  maximumStrokeWidth: 4.0,
                ),
              ),
            ),
          ),
          if (_validationMessage.isNotEmpty)
            Padding(
              padding: EdgeInsets.all(8),
              child: Text(
                _validationMessage,
                style: TextStyle(color: Colors.red),
              ),
            ),
          Padding(
            padding: EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                OutlinedButton(
                  onPressed: _clearSignature,
                  child: Text('Clear'),
                ),
                ElevatedButton(
                  onPressed: _saveSignature,
                  child: Text('Save Signature'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _clearSignature() {
    setState(() {
      _signaturePadKey.currentState!.clear();
      _validationMessage = '';
    });
  }

  Future<void> _saveSignature() async {
    // Validate minimum stroke count
    if (_signaturePadKey.currentState!.toImage == null) {
      setState(() {
        _validationMessage = 'Please provide a signature';
      });
      return;
    }

    try {
      final ui.Image image = await _signaturePadKey.currentState!.toImage(
        pixelRatio: 3.0,
      );
      
      // Convert to bytes
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      final bytes = byteData!.buffer.asUint8List();
      
      // Save or upload the signature
      print('Signature saved: ${bytes.length} bytes');
      
      setState(() {
        _validationMessage = 'Signature saved successfully!';
      });
      
      // Navigate or perform next action
    } catch (e) {
      setState(() {
        _validationMessage = 'Error saving signature: $e';
      });
    }
  }
}
```

### Signature Pad with Background Image

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';

class SignatureWithBackground extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        image: DecorationImage(
          image: AssetImage('assets/signature_background.png'),
          fit: BoxFit.cover,
          opacity: 0.3,
        ),
      ),
      child: SfSignaturePad(
        key: _signaturePadKey,
        backgroundColor: Colors.transparent,
        strokeColor: Colors.blue[900]!,
        minimumStrokeWidth: 2.0,
        maximumStrokeWidth: 5.0,
      ),
    );
  }
}
```

## Common Patterns

### Pattern 1: Document Signing Flow

```dart
class DocumentSigningFlow extends StatefulWidget {
  @override
  _DocumentSigningFlowState createState() => _DocumentSigningFlowState();
}

class _DocumentSigningFlowState extends State<DocumentSigningFlow> {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();
  bool _hasSignature = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sign Agreement')),
      body: Column(
        children: [
          // Document preview
          Expanded(
            flex: 2,
            child: Container(
              padding: EdgeInsets.all(16),
              child: Text('Agreement Terms...'),
            ),
          ),
          
          // Signature section
          Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Your Signature',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Container(
                  height: 200,
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: SfSignaturePad(
                    key: _signaturePadKey,
                    backgroundColor: Colors.white,
                    strokeColor: Colors.black,
                    minimumStrokeWidth: 2.0,
                    maximumStrokeWidth: 4.0,
                    onDrawEnd: () {
                      setState(() => _hasSignature = true);
                    },
                  ),
                ),
              ],
            ),
          ),
          
          // Action buttons
          Padding(
            padding: EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: _clearSignature,
                    child: Text('Clear'),
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _hasSignature ? _submitSignature : null,
                    child: Text('Submit'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _clearSignature() {
    setState(() {
      _signaturePadKey.currentState!.clear();
      _hasSignature = false;
    });
  }

  Future<void> _submitSignature() async {
    final image = await _signaturePadKey.currentState!.toImage(pixelRatio: 3.0);
    // Submit signature with document
    Navigator.pop(context, image);
  }
}
```

### Pattern 2: Multiple Signatures Collection

```dart
class MultipleSignaturesForm extends StatefulWidget {
  @override
  _MultipleSignaturesFormState createState() => _MultipleSignaturesFormState();
}

class _MultipleSignaturesFormState extends State<MultipleSignaturesForm> {
  final GlobalKey<SfSignaturePadState> _applicantKey = GlobalKey();
  final GlobalKey<SfSignaturePadState> _witnessKey = GlobalKey();
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Signatures Required')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSignatureField(
              'Applicant Signature',
              _applicantKey,
            ),
            SizedBox(height: 24),
            _buildSignatureField(
              'Witness Signature',
              _witnessKey,
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _submitAllSignatures,
              child: Text('Submit All'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSignatureField(String label, GlobalKey<SfSignaturePadState> key) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        SizedBox(height: 8),
        Container(
          height: 150,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey),
            borderRadius: BorderRadius.circular(8),
          ),
          child: SfSignaturePad(
            key: key,
            backgroundColor: Colors.white,
            strokeColor: Colors.blue[900]!,
          ),
        ),
        TextButton(
          onPressed: () => key.currentState!.clear(),
          child: Text('Clear'),
        ),
      ],
    );
  }

  Future<void> _submitAllSignatures() async {
    final applicantImage = await _applicantKey.currentState!.toImage();
    final witnessImage = await _witnessKey.currentState!.toImage();
    // Submit both signatures
  }
}
```

### Pattern 3: Read-only Signature Display

```dart
class SignatureDisplay extends StatefulWidget {
  final Uint8List signatureData;

  SignatureDisplay({required this.signatureData});

  @override
  _SignatureDisplayState createState() => _SignatureDisplayState();
}

class _SignatureDisplayState extends State<SignatureDisplay> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Image.memory(
        widget.signatureData,
        fit: BoxFit.contain,
      ),
    );
  }
}
```

### Pattern 4: Signature with Real-time Feedback

```dart
class InteractiveSignaturePad extends StatefulWidget {
  @override
  _InteractiveSignaturePadState createState() => _InteractiveSignaturePadState();
}

class _InteractiveSignaturePadState extends State<InteractiveSignaturePad> {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();
  bool _isDrawing = false;
  int _strokeCount = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 300,
          decoration: BoxDecoration(
            border: Border.all(
              color: _isDrawing ? Colors.blue : Colors.grey,
              width: _isDrawing ? 2 : 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: SfSignaturePad(
            key: _signaturePadKey,
            backgroundColor: Colors.white,
            strokeColor: Colors.black,
            minimumStrokeWidth: 2.0,
            maximumStrokeWidth: 4.0,
            onDrawStart: () {
              setState(() {
                _isDrawing = true;
                _strokeCount++;
              });
              return true;
            },
            onDrawEnd: () {
              setState(() {
                _isDrawing = false;
              });
            },
          ),
        ),
        SizedBox(height: 8),
        Text(
          _isDrawing ? 'Drawing...' : 'Stroke count: $_strokeCount',
          style: TextStyle(color: Colors.grey[600]),
        ),
      ],
    );
  }
}
```

## Key Properties

### Essential Properties

- **`backgroundColor`** - Background color of the signature pad (Color)
- **`strokeColor`** - Color of the signature strokes (Color, default: Colors.black)
- **`minimumStrokeWidth`** - Minimum width of strokes (double, default: 1.0)
- **`maximumStrokeWidth`** - Maximum width of strokes (double, default: 4.0)

### Callback Properties

- **`onDrawStart`** - Callback when drawing starts (SignatureOnDrawStartCallback → bool Function(); return true to allow drawing, false to cancel)
- **`onDraw`** - Callback during drawing with offset and timestamp (DrawCallback)
- **`onDrawEnd`** - Callback when drawing ends (VoidCallback)

### State Methods (via GlobalKey)

- **`clear()`** - Clears all strokes from the signature pad
- **`toImage({double pixelRatio})`** - Converts signature to ui.Image
  - `pixelRatio` - Resolution multiplier (default: 1.0, higher = better quality)

## Common Use Cases

1. **Contract Signing** - Digital signature capture for legal documents and agreements
2. **Delivery Confirmation** - Capture recipient signatures for package deliveries
3. **Medical Consent Forms** - Patient signatures for consent and authorization
4. **Registration Forms** - User signatures during account creation or registration
5. **Checkout Process** - Signature capture during payment or purchase completion
6. **Approval Workflows** - Manager or authority signatures for approvals
7. **Receipt Acknowledgment** - Customer signatures on digital receipts
8. **Time Sheet Signing** - Employee signatures for attendance or timesheet approval
9. **Visitor Management** - Visitor signatures during check-in processes
10. **Terms Acceptance** - Signature-based acceptance of terms and conditions

## Best Practices

### Validation

```dart
// Always validate before saving
Future<bool> validateSignature() async {
  try {
    final image = await _signaturePadKey.currentState!.toImage();
    // Check if image has meaningful content
    return true;
  } catch (e) {
    return false; // No signature drawn
  }
}
```

### Image Quality

```dart
// Use higher pixel ratio for better quality
final image = await _signaturePadKey.currentState!.toImage(
  pixelRatio: 3.0, // 3x resolution for high-quality signatures
);
```

### User Experience

- Provide clear "Clear" and "Save" buttons
- Show visual feedback during drawing (border highlight)
- Display validation messages clearly
- Consider adding "Sign Here" indicator or background watermark
- Allow users to retry if they make mistakes
- Show confirmation after successful signature capture

### Storage

```dart
import 'dart:ui' as ui;
import 'dart:typed_data';

Future<Uint8List> getSignatureBytes() async {
  final ui.Image image = await _signaturePadKey.currentState!.toImage(
    pixelRatio: 3.0,
  );
  
  final ByteData? byteData = await image.toByteData(
    format: ui.ImageByteFormat.png,
  );
  
  return byteData!.buffer.asUint8List();
}
```

## Tips and Gotchas

- Always use a `GlobalKey<SfSignaturePadState>` to access signature pad methods
- Call `toImage()` before navigating away to preserve the signature
- Higher `pixelRatio` values produce larger files but better quality
- Clear the pad when validation fails to avoid confusion
- Test on both touch devices and stylus-enabled devices
- Consider adding a stroke count check for validation
- Use contrasting colors for stroke and background for visibility
- Provide adequate height (150-300px) for comfortable signing
