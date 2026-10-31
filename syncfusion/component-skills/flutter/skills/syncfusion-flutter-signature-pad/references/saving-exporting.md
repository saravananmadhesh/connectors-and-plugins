# Saving and Exporting Signatures

This guide covers how to save, export, and manage signatures captured with the Syncfusion Flutter SignaturePad widget.

## Converting to Image

### Basic Image Export

Use the `toImage()` method to convert the signature to a `ui.Image`:

```dart
import 'dart:ui' as ui;
import 'package:syncfusion_flutter_signaturepad/signaturepad.dart';

final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();

Future<ui.Image> getSignatureImage() async {
  final ui.Image image = await _signaturePadKey.currentState!.toImage();
  return image;
}
```

### With Pixel Ratio (Quality Control)

Control the output resolution using `pixelRatio`:

```dart
// Standard quality (default)
final image = await _signaturePadKey.currentState!.toImage(
  pixelRatio: 1.0,
);

// High quality (recommended)
final image = await _signaturePadKey.currentState!.toImage(
  pixelRatio: 3.0,
);

// Ultra high quality
final image = await _signaturePadKey.currentState!.toImage(
  pixelRatio: 5.0,
);
```

**Pixel Ratio Guide:**
- `1.0` - Standard resolution (smaller file size)
- `2.0` - Retina display quality
- `3.0` - High quality (recommended for most cases)
- `4.0+` - Very high quality (legal documents, archival)

## Converting to Bytes

### PNG Format

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

### JPEG Format

```dart
Future<Uint8List> getSignatureBytesJpeg() async {
  final ui.Image image = await _signaturePadKey.currentState!.toImage(
    pixelRatio: 3.0,
  );
  
  final ByteData? byteData = await image.toByteData(
    format: ui.ImageByteFormat.rawRgba, // JPEG not directly supported
  );
  
  return byteData!.buffer.asUint8List();
}
```

**Note:** For true JPEG output, use the `image` package to convert PNG bytes to JPEG.

## Saving to File

### Save to Local Storage

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

Future<File> saveSignatureToFile() async {
  // Get the signature as bytes
  final bytes = await getSignatureBytes();
  
  // Get the application documents directory
  final directory = await getApplicationDocumentsDirectory();
  
  // Create a unique filename
  final filename = 'signature_${DateTime.now().millisecondsSinceEpoch}.png';
  final path = '${directory.path}/$filename';
  
  // Write the file
  final file = File(path);
  await file.writeAsBytes(bytes);
  
  print('Signature saved to: $path');
  return file;
}
```

### Save to Gallery (Mobile)

```dart
import 'package:image_gallery_saver/image_gallery_saver.dart';

Future<void> saveSignatureToGallery() async {
  final bytes = await getSignatureBytes();
  
  final result = await ImageGallerySaver.saveImage(
    bytes,
    quality: 100,
    name: 'signature_${DateTime.now().millisecondsSinceEpoch}',
  );
  
  if (result['isSuccess']) {
    print('Signature saved to gallery');
  }
}
```

### Save with Custom Name

```dart
Future<File> saveSignatureWithName(String name) async {
  final bytes = await getSignatureBytes();
  final directory = await getApplicationDocumentsDirectory();
  
  // Sanitize filename
  final sanitizedName = name.replaceAll(RegExp(r'[^\w\s-]'), '');
  final path = '${directory.path}/${sanitizedName}_signature.png';
  
  final file = File(path);
  await file.writeAsBytes(bytes);
  
  return file;
}
```

## Clearing the Signature Pad

### Basic Clear

```dart
void clearSignature() {
  _signaturePadKey.currentState!.clear();
}
```

### Clear with Confirmation

```dart
Future<void> clearSignatureWithConfirmation(BuildContext context) async {
  final result = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Clear Signature'),
      content: Text('Are you sure you want to clear the signature?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context, false),
          child: Text('Cancel'),
        ),
        TextButton(
          onPressed: () => Navigator.pop(context, true),
          child: Text('Clear'),
        ),
      ],
    ),
  );
  
  if (result == true) {
    _signaturePadKey.currentState!.clear();
  }
}
```

### Clear After Save

```dart
Future<void> saveAndClear() async {
  final file = await saveSignatureToFile();
  _signaturePadKey.currentState!.clear();
  
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text('Signature saved and cleared')),
  );
}
```

## Validation Before Saving

### Check if Empty

```dart
Future<bool> hasSignature() async {
  try {
    final image = await _signaturePadKey.currentState!.toImage();
    return true;
  } catch (e) {
    return false; // No signature drawn
  }
}
```

### Validate Before Export

```dart
Future<void> saveWithValidation() async {
  if (!await hasSignature()) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Please provide a signature first'),
        backgroundColor: Colors.red,
      ),
    );
    return;
  }
  
  final file = await saveSignatureToFile();
  print('Saved: ${file.path}');
}
```

### Minimum Stroke Count Validation

Track drawing events to ensure meaningful signature:

```dart
class SignaturePadWithValidation extends StatefulWidget {
  @override
  _SignaturePadWithValidationState createState() => _SignaturePadWithValidationState();
}

class _SignaturePadWithValidationState extends State<SignaturePadWithValidation> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  int _strokeCount = 0;
  final int _minimumStrokes = 3; // Require at least 3 strokes

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          key: _key,
          onDrawEnd: () {
            setState(() => _strokeCount++);
          },
        ),
        ElevatedButton(
          onPressed: _strokeCount >= _minimumStrokes ? _save : null,
          child: Text('Save'),
        ),
        Text('Strokes: $_strokeCount (min: $_minimumStrokes)'),
      ],
    );
  }

  Future<void> _save() async {
    if (_strokeCount >= _minimumStrokes) {
      await saveSignatureToFile();
    }
  }
}
```

## Uploading to Server

### HTTP Upload

```dart
import 'package:http/http.dart' as http;

Future<void> uploadSignature(String url) async {
  final bytes = await getSignatureBytes();
  
  var request = http.MultipartRequest('POST', Uri.parse(url));
  request.files.add(
    http.MultipartFile.fromBytes(
      'signature',
      bytes,
      filename: 'signature_${DateTime.now().millisecondsSinceEpoch}.png',
    ),
  );
  
  var response = await request.send();
  
  if (response.statusCode == 200) {
    print('Signature uploaded successfully');
  } else {
    print('Upload failed: ${response.statusCode}');
  }
}
```

### With Additional Data

```dart
Future<void> uploadSignatureWithData(String url, Map<String, String> data) async {
  final bytes = await getSignatureBytes();
  
  var request = http.MultipartRequest('POST', Uri.parse(url));
  
  // Add signature file
  request.files.add(
    http.MultipartFile.fromBytes(
      'signature',
      bytes,
      filename: 'signature.png',
    ),
  );
  
  // Add additional form data
  request.fields.addAll(data);
  
  var response = await request.send();
  
  if (response.statusCode == 200) {
    print('Upload successful');
  }
}

// Usage
await uploadSignatureWithData(
  'https://api.example.com/signatures',
  {
    'user_id': '12345',
    'document_id': 'doc_789',
    'timestamp': DateTime.now().toIso8601String(),
  },
);
```

### Base64 Encoding

```dart
import 'dart:convert';

Future<String> getSignatureBase64() async {
  final bytes = await getSignatureBytes();
  return base64Encode(bytes);
}

Future<void> uploadAsBase64(String url) async {
  final base64String = await getSignatureBase64();
  
  final response = await http.post(
    Uri.parse(url),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      'signature': base64String,
      'format': 'png',
    }),
  );
  
  if (response.statusCode == 200) {
    print('Upload successful');
  }
}
```

## Displaying Saved Signatures

### From File

```dart
class DisplaySignature extends StatelessWidget {
  final File signatureFile;
  
  DisplaySignature({required this.signatureFile});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      decoration: BoxDecoration(border: Border.all()),
      child: Image.file(
        signatureFile,
        fit: BoxFit.contain,
      ),
    );
  }
}
```

### From Bytes

```dart
class DisplaySignatureFromBytes extends StatelessWidget {
  final Uint8List signatureBytes;
  
  DisplaySignatureFromBytes({required this.signatureBytes});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      decoration: BoxDecoration(border: Border.all()),
      child: Image.memory(
        signatureBytes,
        fit: BoxFit.contain,
      ),
    );
  }
}
```

### From URL

```dart
class DisplaySignatureFromUrl extends StatelessWidget {
  final String signatureUrl;
  
  DisplaySignatureFromUrl({required this.signatureUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      decoration: BoxDecoration(border: Border.all()),
      child: Image.network(
        signatureUrl,
        fit: BoxFit.contain,
        loadingBuilder: (context, child, loadingProgress) {
          if (loadingProgress == null) return child;
          return Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
```

## Complete Save Flow Example

```dart
class CompleteSignatureFlow extends StatefulWidget {
  @override
  _CompleteSignatureFlowState createState() => _CompleteSignatureFlowState();
}

class _CompleteSignatureFlowState extends State<CompleteSignatureFlow> {
  final GlobalKey<SfSignaturePadState> _signaturePadKey = GlobalKey();
  bool _isSaving = false;

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
                decoration: BoxDecoration(border: Border.all()),
                child: SfSignaturePad(
                  key: _signaturePadKey,
                  backgroundColor: Colors.white,
                ),
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: _isSaving ? null : _handleClear,
                    child: Text('Clear'),
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _isSaving ? null : _handleSave,
                    child: _isSaving
                        ? SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation(Colors.white),
                            ),
                          )
                        : Text('Save'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _handleClear() {
    _signaturePadKey.currentState!.clear();
  }

  Future<void> _handleSave() async {
    setState(() => _isSaving = true);

    try {
      // Check if signature exists
      final image = await _signaturePadKey.currentState!.toImage(pixelRatio: 3.0);
      
      // Convert to bytes
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      final bytes = byteData!.buffer.asUint8List();
      
      // Validate size (optional)
      if (bytes.length < 1000) {
        throw Exception('Signature appears to be empty');
      }
      
      // Save to file
      final directory = await getApplicationDocumentsDirectory();
      final path = '${directory.path}/signature_${DateTime.now().millisecondsSinceEpoch}.png';
      final file = File(path);
      await file.writeAsBytes(bytes);
      
      // Show success
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Signature saved successfully'),
          backgroundColor: Colors.green,
        ),
      );
      
      // Clear and navigate
      _signaturePadKey.currentState!.clear();
      Navigator.pop(context, file);
      
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() => _isSaving = false);
    }
  }
}
```

## Image Compression

### Using image Package

```dart
import 'package:image/image.dart' as img;

Future<Uint8List> getCompressedSignature({int quality = 85}) async {
  // Get signature bytes
  final bytes = await getSignatureBytes();
  
  // Decode PNG
  img.Image? image = img.decodeImage(bytes);
  
  if (image == null) return bytes;
  
  // Encode as JPEG with compression
  return img.encodeJpg(image, quality: quality);
}
```

### Resize for Thumbnails

```dart
Future<Uint8List> getSignatureThumbnail({int width = 200}) async {
  final bytes = await getSignatureBytes();
  
  img.Image? image = img.decodeImage(bytes);
  if (image == null) return bytes;
  
  // Resize maintaining aspect ratio
  img.Image thumbnail = img.copyResize(image, width: width);
  
  return img.encodePng(thumbnail);
}
```

## Best Practices

### Quality vs File Size

```dart
// For legal documents (best quality, larger size)
pixelRatio: 4.0

// For web uploads (balanced)
pixelRatio: 2.5

// For thumbnails or previews (smaller size)
pixelRatio: 1.5
```

### Error Handling

Always wrap export operations in try-catch:

```dart
Future<void> safeSave() async {
  try {
    final bytes = await getSignatureBytes();
    // Save logic
  } catch (e) {
    print('Error saving signature: $e');
    // Show user-friendly error
  }
}
```

### Memory Management

Clear signature pad after successful export:

```dart
Future<void> exportAndClear() async {
  final file = await saveSignatureToFile();
  _signaturePadKey.currentState!.clear(); // Free memory
  return file;
}
```

## Next Steps

- [Callbacks](callbacks.md) - Handle drawing events
- [Advanced Features](advanced-features.md) - Validation and display patterns
- [Customization](customization.md) - Style the signature pad
- [Accessibility](accessibility.md) - Make signatures accessible
