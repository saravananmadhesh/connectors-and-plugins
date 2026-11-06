# Advanced Features and Patterns

This guide covers advanced techniques and patterns for using the Syncfusion Flutter SignaturePad in complex applications.

## Signature Validation

### Basic Validation

Check if a signature exists before proceeding:

```dart
Future<bool> validateSignature() async {
  try {
    final image = await _signaturePadKey.currentState!.toImage();
    return true; // Signature exists
  } catch (e) {
    return false; // No signature
  }
}

// Usage
Future<void> submitForm() async {
  if (!await validateSignature()) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Signature Required'),
        content: Text('Please provide your signature before submitting.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('OK'),
          ),
        ],
      ),
    );
    return;
  }
  
  // Proceed with submission
  await saveSignature();
}
```

### Stroke Count Validation

Ensure users provide meaningful signatures:

```dart
class ValidatedSignaturePad extends StatefulWidget {
  final int minimumStrokes;
  
  ValidatedSignaturePad({this.minimumStrokes = 3});

  @override
  _ValidatedSignaturePadState createState() => _ValidatedSignaturePadState();
}

class _ValidatedSignaturePadState extends State<ValidatedSignaturePad> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  int _strokeCount = 0;
  String? _errorMessage;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: 200,
          decoration: BoxDecoration(
            border: Border.all(
              color: _errorMessage != null ? Colors.red : Colors.grey,
              width: _errorMessage != null ? 2 : 1,
            ),
          ),
          child: SfSignaturePad(
            key: _key,
            backgroundColor: Colors.white,
            onDrawEnd: () {
              setState(() {
                _strokeCount++;
                _errorMessage = null; // Clear error when drawing
              });
            },
          ),
        ),
        if (_errorMessage != null)
          Padding(
            padding: EdgeInsets.only(top: 8),
            child: Text(
              _errorMessage!,
              style: TextStyle(color: Colors.red, fontSize: 12),
            ),
          ),
        SizedBox(height: 8),
        Text(
          'Strokes: $_strokeCount (minimum: ${widget.minimumStrokes})',
          style: TextStyle(fontSize: 12, color: Colors.grey),
        ),
        SizedBox(height: 16),
        ElevatedButton(
          onPressed: _handleSave,
          child: Text('Save'),
        ),
      ],
    );
  }

  Future<void> _handleSave() async {
    if (_strokeCount < widget.minimumStrokes) {
      setState(() {
        _errorMessage = 'Please provide a complete signature (minimum ${widget.minimumStrokes} strokes)';
      });
      return;
    }
    
    // Save signature
    await saveSignature();
  }
}
```

### Size Validation

Verify that the signature is not too small:

```dart
import 'dart:ui' as ui;

Future<bool> validateSignatureSize() async {
  try {
    final image = await _signaturePadKey.currentState!.toImage(pixelRatio: 1.0);
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    final bytes = byteData!.buffer.asUint8List();
    
    // Check if file size is above minimum (e.g., 1KB)
    if (bytes.length < 1024) {
      return false; // Signature too small or empty
    }
    
    return true;
  } catch (e) {
    return false;
  }
}
```

### Custom Validation Rules

```dart
class SignatureValidator {
  final int minimumStrokes;
  final int minimumFileSize;
  final Duration minimumDrawingTime;
  
  SignatureValidator({
    this.minimumStrokes = 3,
    this.minimumFileSize = 1024,
    this.minimumDrawingTime = const Duration(seconds: 1),
  });
  
  Future<ValidationResult> validate(
    GlobalKey<SfSignaturePadState> key,
    int strokeCount,
    Duration drawingTime,
  ) async {
    // Check stroke count
    if (strokeCount < minimumStrokes) {
      return ValidationResult(
        isValid: false,
        message: 'Signature must have at least $minimumStrokes strokes',
      );
    }
    
    // Check drawing time
    if (drawingTime < minimumDrawingTime) {
      return ValidationResult(
        isValid: false,
        message: 'Please take more time to sign carefully',
      );
    }
    
    // Check file size
    try {
      final image = await key.currentState!.toImage(pixelRatio: 1.0);
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      final bytes = byteData!.buffer.asUint8List();
      
      if (bytes.length < minimumFileSize) {
        return ValidationResult(
          isValid: false,
          message: 'Signature appears incomplete',
        );
      }
    } catch (e) {
      return ValidationResult(
        isValid: false,
        message: 'No signature provided',
      );
    }
    
    return ValidationResult(isValid: true);
  }
}

class ValidationResult {
  final bool isValid;
  final String? message;
  
  ValidationResult({required this.isValid, this.message});
}
```

## Read-only Signature Display

Display existing signatures without allowing edits:

```dart
class ReadOnlySignature extends StatelessWidget {
  final Uint8List signatureData;
  final String? label;
  
  ReadOnlySignature({
    required this.signatureData,
    this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null)
          Text(
            label!,
            style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        if (label != null) SizedBox(height: 8),
        Container(
          height: 150,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Stack(
            children: [
              // Display signature
              Center(
                child: Image.memory(
                  signatureData,
                  fit: BoxFit.contain,
                ),
              ),
              // Read-only overlay
              Positioned.fill(
                child: IgnorePointer(
                  child: Container(
                    color: Colors.transparent,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```

## Multi-signature Forms

Collect multiple signatures in a single form:

```dart
class MultiSignatureForm extends StatefulWidget {
  @override
  _MultiSignatureFormState createState() => _MultiSignatureFormState();
}

class _MultiSignatureFormState extends State<MultiSignatureForm> {
  final Map<String, GlobalKey<SfSignaturePadState>> _signatureKeys = {
    'applicant': GlobalKey<SfSignaturePadState>(),
    'witness': GlobalKey<SfSignaturePadState>(),
    'guardian': GlobalKey<SfSignaturePadState>(),
  };
  
  final Map<String, int> _strokeCounts = {
    'applicant': 0,
    'witness': 0,
    'guardian': 0,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Multi-Signature Form')),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildSignatureField(
              'Applicant Signature',
              'applicant',
              required: true,
            ),
            SizedBox(height: 24),
            _buildSignatureField(
              'Witness Signature',
              'witness',
              required: true,
            ),
            SizedBox(height: 24),
            _buildSignatureField(
              'Guardian Signature (if applicable)',
              'guardian',
              required: false,
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: _submitForm,
              child: Text('Submit All Signatures'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSignatureField(String label, String key, {required bool required}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              label,
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            if (required)
              Text(' *', style: TextStyle(color: Colors.red)),
          ],
        ),
        SizedBox(height: 8),
        Container(
          height: 150,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.grey),
            borderRadius: BorderRadius.circular(8),
          ),
          child: SfSignaturePad(
            key: _signatureKeys[key],
            backgroundColor: Colors.white,
            onDrawEnd: () {
              setState(() {
                _strokeCounts[key] = (_strokeCounts[key] ?? 0) + 1;
              });
            },
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Strokes: ${_strokeCounts[key]}',
              style: TextStyle(fontSize: 12, color: Colors.grey),
            ),
            TextButton(
              onPressed: () {
                _signatureKeys[key]!.currentState!.clear();
                setState(() => _strokeCounts[key] = 0);
              },
              child: Text('Clear'),
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _submitForm() async {
    // Validate required signatures
    final requiredKeys = ['applicant', 'witness'];
    
    for (final key in requiredKeys) {
      if (_strokeCounts[key] == 0) {
        showDialog(
          context: context,
          builder: (context) => AlertDialog(
            title: Text('Missing Signature'),
            content: Text('Please provide ${key} signature'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: Text('OK'),
              ),
            ],
          ),
        );
        return;
      }
    }
    
    // Save all signatures
    final signatures = <String, Uint8List>{};
    
    for (final entry in _signatureKeys.entries) {
      if (_strokeCounts[entry.key]! > 0) {
        final image = await entry.value.currentState!.toImage(pixelRatio: 3.0);
        final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
        signatures[entry.key] = byteData!.buffer.asUint8List();
      }
    }
    
    // Process signatures
    print('Collected ${signatures.length} signatures');
    
    Navigator.pop(context, signatures);
  }
}
```

## Undo/Redo Functionality

Implement undo/redo for signature drawing:

```dart
class UndoableSignaturePad extends StatefulWidget {
  @override
  _UndoableSignaturePadState createState() => _UndoableSignaturePadState();
}

class _UndoableSignaturePadState extends State<UndoableSignaturePad> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  final List<Uint8List> _history = [];
  int _historyIndex = -1;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 300,
          decoration: BoxDecoration(border: Border.all()),
          child: SfSignaturePad(
            key: _key,
            backgroundColor: Colors.white,
            onDrawEnd: _saveState,
          ),
        ),
        SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            IconButton(
              icon: Icon(Icons.undo),
              onPressed: _canUndo ? _undo : null,
              tooltip: 'Undo',
            ),
            IconButton(
              icon: Icon(Icons.redo),
              onPressed: _canRedo ? _redo : null,
              tooltip: 'Redo',
            ),
            IconButton(
              icon: Icon(Icons.delete),
              onPressed: _clear,
              tooltip: 'Clear',
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _saveState() async {
    try {
      final image = await _key.currentState!.toImage(pixelRatio: 1.0);
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      final bytes = byteData!.buffer.asUint8List();
      
      setState(() {
        // Remove any redo history
        _history.removeRange(_historyIndex + 1, _history.length);
        
        // Add new state
        _history.add(bytes);
        _historyIndex = _history.length - 1;
        
        // Limit history size
        if (_history.length > 20) {
          _history.removeAt(0);
          _historyIndex--;
        }
      });
    } catch (e) {
      // Handle error
    }
  }

  bool get _canUndo => _historyIndex > 0;
  bool get _canRedo => _historyIndex < _history.length - 1;

  void _undo() {
    if (_canUndo) {
      setState(() {
        _historyIndex--;
        _restoreState(_history[_historyIndex]);
      });
    }
  }

  void _redo() {
    if (_canRedo) {
      setState(() {
        _historyIndex++;
        _restoreState(_history[_historyIndex]);
      });
    }
  }

  void _restoreState(Uint8List bytes) {
    _key.currentState!.clear();
    // Note: SfSignaturePad doesn't support loading from bytes directly
    // You would need to display the image in an overlay
  }

  void _clear() {
    setState(() {
      _key.currentState!.clear();
      _history.clear();
      _historyIndex = -1;
    });
  }
}
```

## Signature Comparison

Compare two signatures for similarity (basic approach):

```dart
class SignatureComparator {
  Future<double> compareSignatures(
    Uint8List signature1,
    Uint8List signature2,
  ) async {
    // This is a simplified comparison
    // For production use, consider using proper image comparison libraries
    
    if (signature1.length != signature2.length) {
      return 0.0;
    }
    
    int matchingBytes = 0;
    for (int i = 0; i < signature1.length; i++) {
      if (signature1[i] == signature2[i]) {
        matchingBytes++;
      }
    }
    
    return matchingBytes / signature1.length;
  }
  
  Future<bool> areSimilar(
    Uint8List signature1,
    Uint8List signature2,
    {double threshold = 0.8}
  ) async {
    final similarity = await compareSignatures(signature1, signature2);
    return similarity >= threshold;
  }
}
```

## Background Image Integration

Add signature lines or document backgrounds:

```dart
class SignatureWithTemplate extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Background template
        Positioned.fill(
          child: CustomPaint(
            painter: SignatureLinePainter(),
          ),
        ),
        // Signature pad
        SfSignaturePad(
          key: _key,
          backgroundColor: Colors.transparent,
          strokeColor: Colors.blue[900]!,
          minimumStrokeWidth: 2.0,
          maximumStrokeWidth: 4.0,
        ),
      ],
    );
  }
}

class SignatureLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.grey[400]!
      ..strokeWidth = 1.0
      ..style = PaintingStyle.stroke;
    
    // Draw signature line
    final y = size.height * 0.7;
    canvas.drawLine(
      Offset(20, y),
      Offset(size.width - 20, y),
      paint,
    );
    
    // Draw "Sign here" text
    final textPainter = TextPainter(
      text: TextSpan(
        text: 'Sign here',
        style: TextStyle(
          color: Colors.grey[400],
          fontSize: 12,
          fontStyle: FontStyle.italic,
        ),
      ),
      textDirection: TextDirection.ltr,
    );
    textPainter.layout();
    textPainter.paint(canvas, Offset(20, y + 5));
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
```

## Form Integration

Integrate signature pad with Flutter Form:

```dart
class SignatureFormField extends FormField<Uint8List> {
  SignatureFormField({
    Key? key,
    FormFieldSetter<Uint8List>? onSaved,
    FormFieldValidator<Uint8List>? validator,
    Uint8List? initialValue,
    AutovalidateMode? autovalidateMode,
  }) : super(
    key: key,
    onSaved: onSaved,
    validator: validator,
    initialValue: initialValue,
    autovalidateMode: autovalidateMode ?? AutovalidateMode.disabled,
    builder: (FormFieldState<Uint8List> state) {
      final key = GlobalKey<SfSignaturePadState>();
      
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 150,
            decoration: BoxDecoration(
              border: Border.all(
                color: state.hasError ? Colors.red : Colors.grey,
              ),
            ),
            child: SfSignaturePad(
              key: key,
              backgroundColor: Colors.white,
              onDrawEnd: () async {
                try {
                  final image = await key.currentState!.toImage(pixelRatio: 3.0);
                  final byteData = await image.toByteData(
                    format: ui.ImageByteFormat.png,
                  );
                  state.didChange(byteData!.buffer.asUint8List());
                } catch (e) {
                  // Handle error
                }
              },
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              TextButton(
                onPressed: () {
                  key.currentState!.clear();
                  state.didChange(null);
                },
                child: Text('Clear'),
              ),
            ],
          ),
          if (state.hasError)
            Padding(
              padding: EdgeInsets.only(top: 4),
              child: Text(
                state.errorText!,
                style: TextStyle(color: Colors.red, fontSize: 12),
              ),
            ),
        ],
      );
    },
  );
}

// Usage
Form(
  key: _formKey,
  child: Column(
    children: [
      TextFormField(
        decoration: InputDecoration(labelText: 'Name'),
        validator: (value) => value?.isEmpty == true ? 'Required' : null,
      ),
      SignatureFormField(
        validator: (value) => value == null ? 'Signature required' : null,
        onSaved: (value) {
          // Save signature
        },
      ),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            _formKey.currentState!.save();
          }
        },
        child: Text('Submit'),
      ),
    ],
  ),
)
```

## Next Steps

- [Callbacks](callbacks.md) - Event handling for advanced features
- [Saving & Exporting](saving-exporting.md) - Save validated signatures
- [Customization](customization.md) - Style advanced components
- [Accessibility](accessibility.md) - Make advanced features accessible
