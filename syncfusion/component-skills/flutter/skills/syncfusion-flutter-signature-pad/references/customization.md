# Customization and Styling

This guide covers all the ways you can customize the appearance and behavior of the Syncfusion Flutter SignaturePad widget.

## Stroke Customization

### Stroke Color

Control the color of the signature strokes:

```dart
SfSignaturePad(
  strokeColor: Colors.black, // Default
)

SfSignaturePad(
  strokeColor: Colors.blue, // Blue pen
)

SfSignaturePad(
  strokeColor: Color(0xFF1976D2), // Custom color
)
```

### Common Stroke Colors

```dart
// Professional signatures
strokeColor: Colors.black       // Classic black
strokeColor: Colors.blue[900]   // Dark blue
strokeColor: Color(0xFF000080)  // Navy blue

// Branded signatures
strokeColor: Theme.of(context).primaryColor  // Match app theme

// Special purposes
strokeColor: Colors.red         // Rejection/decline signatures
strokeColor: Colors.green[700]  // Approval signatures
```

### Stroke Width

Control the thickness of signature strokes with minimum and maximum values:

```dart
SfSignaturePad(
  minimumStrokeWidth: 1.0,  // Thinnest possible stroke
  maximumStrokeWidth: 4.0,  // Thickest possible stroke
)
```

The stroke width varies dynamically based on drawing speed - faster strokes are thinner, slower strokes are thicker, creating a natural pen-like effect.

### Width Configuration Examples

```dart
// Fine pen (detailed signatures)
SfSignaturePad(
  minimumStrokeWidth: 0.5,
  maximumStrokeWidth: 2.0,
)

// Standard pen (most common)
SfSignaturePad(
  minimumStrokeWidth: 1.0,
  maximumStrokeWidth: 4.0,
)

// Bold marker (high visibility)
SfSignaturePad(
  minimumStrokeWidth: 2.0,
  maximumStrokeWidth: 6.0,
)

// Uniform width (no variation)
SfSignaturePad(
  minimumStrokeWidth: 3.0,
  maximumStrokeWidth: 3.0,
)
```

## Background Customization

### Background Color

Set a solid background color:

```dart
SfSignaturePad(
  backgroundColor: Colors.white, // White background
)

SfSignaturePad(
  backgroundColor: Colors.grey[100], // Light grey
)

SfSignaturePad(
  backgroundColor: Color(0xFFFFFDE7), // Cream/paper color
)
```

### Transparent Background

Create a signature pad with transparent background:

```dart
SfSignaturePad(
  backgroundColor: Colors.transparent,
)
```

**Use Case:** Overlay signatures on documents, images, or custom backgrounds.

### Background with Container

Wrap in a Container for more control:

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.white,
    border: Border.all(color: Colors.grey),
    borderRadius: BorderRadius.circular(8),
    boxShadow: [
      BoxShadow(
        color: Colors.black12,
        blurRadius: 4,
        offset: Offset(0, 2),
      ),
    ],
  ),
  child: SfSignaturePad(
    backgroundColor: Colors.transparent,
    strokeColor: Colors.black,
  ),
)
```

### Background with Image

Add a background image using Stack or Container decoration:

```dart
// Method 1: Using Container decoration
Container(
  decoration: BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/signature_line.png'),
      fit: BoxFit.cover,
      opacity: 0.3, // Make it subtle
    ),
  ),
  child: SfSignaturePad(
    backgroundColor: Colors.transparent,
    strokeColor: Colors.black,
  ),
)

// Method 2: Using Stack
Stack(
  children: [
    // Background image
    Positioned.fill(
      child: Opacity(
        opacity: 0.2,
        child: Image.asset(
          'assets/watermark.png',
          fit: BoxFit.contain,
        ),
      ),
    ),
    // Signature pad
    SfSignaturePad(
      backgroundColor: Colors.transparent,
      strokeColor: Colors.blue[900]!,
    ),
  ],
)
```

### Paper Texture Background

```dart
Container(
  decoration: BoxDecoration(
    image: DecorationImage(
      image: AssetImage('assets/paper_texture.jpg'),
      fit: BoxFit.cover,
      opacity: 0.1,
    ),
  ),
  child: SfSignaturePad(
    backgroundColor: Color(0xFFFFFDEF), // Slight cream tint
    strokeColor: Colors.black87,
  ),
)
```

## Border and Container Styling

### Simple Border

```dart
Container(
  decoration: BoxDecoration(
    border: Border.all(color: Colors.grey),
  ),
  child: SfSignaturePad(
    backgroundColor: Colors.white,
  ),
)
```

### Custom Border

```dart
Container(
  decoration: BoxDecoration(
    border: Border.all(
      color: Colors.blue,
      width: 2.0,
    ),
    borderRadius: BorderRadius.circular(12),
  ),
  child: ClipRRect(
    borderRadius: BorderRadius.circular(12),
    child: SfSignaturePad(
      backgroundColor: Colors.white,
    ),
  ),
)
```

### Dashed Border

```dart
// Using dotted_border package
DottedBorder(
  color: Colors.grey,
  strokeWidth: 2,
  dashPattern: [8, 4],
  borderType: BorderType.RRect,
  radius: Radius.circular(8),
  child: SfSignaturePad(
    backgroundColor: Colors.white,
  ),
)
```

### Shadow and Elevation

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(8),
    boxShadow: [
      BoxShadow(
        color: Colors.black26,
        blurRadius: 10,
        offset: Offset(0, 4),
      ),
    ],
  ),
  child: ClipRRect(
    borderRadius: BorderRadius.circular(8),
    child: SfSignaturePad(
      backgroundColor: Colors.transparent,
    ),
  ),
)
```

## Size and Layout

### Fixed Size

```dart
Container(
  width: 400,
  height: 200,
  child: SfSignaturePad(),
)
```

### Responsive Size

```dart
// Take available space
Expanded(
  child: SfSignaturePad(),
)

// Percentage of screen
Container(
  width: MediaQuery.of(context).size.width * 0.8,
  height: MediaQuery.of(context).size.height * 0.3,
  child: SfSignaturePad(),
)
```

### Aspect Ratio

```dart
AspectRatio(
  aspectRatio: 2 / 1, // 2:1 width to height
  child: SfSignaturePad(),
)
```

### With Padding

```dart
Padding(
  padding: EdgeInsets.all(16),
  child: Container(
    decoration: BoxDecoration(border: Border.all()),
    child: SfSignaturePad(),
  ),
)
```

## Theme Integration

### Using Theme Colors

```dart
SfSignaturePad(
  backgroundColor: Theme.of(context).scaffoldBackgroundColor,
  strokeColor: Theme.of(context).primaryColor,
)
```

### Dark Mode Support

```dart
SfSignaturePad(
  backgroundColor: Theme.of(context).brightness == Brightness.dark
      ? Colors.grey[900]
      : Colors.white,
  strokeColor: Theme.of(context).brightness == Brightness.dark
      ? Colors.white
      : Colors.black,
)
```

### Custom Theme

```dart
class SignaturePadTheme {
  final Color backgroundColor;
  final Color strokeColor;
  final double minStrokeWidth;
  final double maxStrokeWidth;
  final Color borderColor;

  SignaturePadTheme({
    this.backgroundColor = Colors.white,
    this.strokeColor = Colors.black,
    this.minStrokeWidth = 1.0,
    this.maxStrokeWidth = 4.0,
    this.borderColor = Colors.grey,
  });
}

// Usage
class ThemedSignaturePad extends StatelessWidget {
  final SignaturePadTheme theme;
  
  ThemedSignaturePad({required this.theme});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: theme.borderColor),
      ),
      child: SfSignaturePad(
        backgroundColor: theme.backgroundColor,
        strokeColor: theme.strokeColor,
        minimumStrokeWidth: theme.minStrokeWidth,
        maximumStrokeWidth: theme.maxStrokeWidth,
      ),
    );
  }
}
```

## Visual States

### Active/Drawing State

Show visual feedback when user is drawing:

```dart
class SignaturePadWithState extends StatefulWidget {
  @override
  _SignaturePadWithStateState createState() => _SignaturePadWithStateState();
}

class _SignaturePadWithStateState extends State<SignaturePadWithState> {
  bool _isDrawing = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: _isDrawing ? Colors.blue : Colors.grey,
          width: _isDrawing ? 2 : 1,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      child: SfSignaturePad(
        backgroundColor: _isDrawing ? Colors.blue[50] : Colors.white,
        onDrawStart: () {
          setState(() => _isDrawing = true);
          return true;
        },
        onDrawEnd: () => setState(() => _isDrawing = false),
      ),
    );
  }
}
```

### Error State

Show error styling when validation fails:

```dart
class ValidatedSignaturePad extends StatefulWidget {
  @override
  _ValidatedSignaturePadState createState() => _ValidatedSignaturePadState();
}

class _ValidatedSignaturePadState extends State<ValidatedSignaturePad> {
  bool _hasError = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: _hasError ? Colors.red : Colors.grey,
              width: _hasError ? 2 : 1,
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: SfSignaturePad(
            key: _signaturePadKey,
            backgroundColor: _hasError ? Colors.red[50] : Colors.white,
          ),
        ),
        if (_hasError)
          Padding(
            padding: EdgeInsets.only(top: 8),
            child: Text(
              'Signature is required',
              style: TextStyle(color: Colors.red, fontSize: 12),
            ),
          ),
      ],
    );
  }
}
```

## Label and Instructions

### With Label

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text(
      'Signature',
      style: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.bold,
      ),
    ),
    SizedBox(height: 8),
    Container(
      height: 150,
      decoration: BoxDecoration(border: Border.all()),
      child: SfSignaturePad(),
    ),
  ],
)
```

### With Instructions

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text(
      'Please sign below',
      style: TextStyle(fontSize: 14, color: Colors.grey[600]),
    ),
    SizedBox(height: 8),
    Container(
      height: 150,
      decoration: BoxDecoration(border: Border.all()),
      child: Stack(
        children: [
          Center(
            child: Text(
              'Sign Here',
              style: TextStyle(
                fontSize: 24,
                color: Colors.grey[300],
                fontStyle: FontStyle.italic,
              ),
            ),
          ),
          SfSignaturePad(
            backgroundColor: Colors.transparent,
          ),
        ],
      ),
    ),
  ],
)
```

### With Watermark

```dart
Stack(
  children: [
    Positioned.fill(
      child: Center(
        child: RotationTransition(
          turns: AlwaysStoppedAnimation(-15 / 360),
          child: Text(
            'DRAFT',
            style: TextStyle(
              fontSize: 48,
              color: Colors.grey[200],
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    ),
    SfSignaturePad(
      backgroundColor: Colors.transparent,
    ),
  ],
)
```

## Pre-styled Components

### Professional Style

```dart
Widget buildProfessionalSignaturePad() {
  return Container(
    decoration: BoxDecoration(
      color: Colors.white,
      border: Border.all(color: Colors.grey[400]!),
      borderRadius: BorderRadius.circular(4),
      boxShadow: [
        BoxShadow(
          color: Colors.black12,
          blurRadius: 4,
          offset: Offset(0, 2),
        ),
      ],
    ),
    child: SfSignaturePad(
      backgroundColor: Colors.transparent,
      strokeColor: Colors.black87,
      minimumStrokeWidth: 1.0,
      maximumStrokeWidth: 3.0,
    ),
  );
}
```

### Casual/Modern Style

```dart
Widget buildModernSignaturePad() {
  return Container(
    decoration: BoxDecoration(
      color: Colors.blue[50],
      borderRadius: BorderRadius.circular(16),
    ),
    child: SfSignaturePad(
      backgroundColor: Colors.transparent,
      strokeColor: Colors.blue[700]!,
      minimumStrokeWidth: 2.0,
      maximumStrokeWidth: 5.0,
    ),
  );
}
```

### Legal/Formal Style

```dart
Widget buildLegalSignaturePad() {
  return Container(
    decoration: BoxDecoration(
      color: Colors.white,
      border: Border.all(color: Colors.black, width: 2),
    ),
    child: SfSignaturePad(
      backgroundColor: Colors.transparent,
      strokeColor: Colors.black,
      minimumStrokeWidth: 1.5,
      maximumStrokeWidth: 3.5,
    ),
  );
}
```

## Best Practices

### Contrast and Visibility

✅ **Do:**
- Use high contrast between stroke and background
- Ensure text and watermarks are subtle (low opacity)
- Test in different lighting conditions

❌ **Don't:**
- Use similar colors for stroke and background
- Make watermarks too prominent
- Sacrifice legibility for style

### Size Guidelines

- **Minimum height:** 120px for comfortable signing
- **Recommended height:** 150-250px for most uses
- **Landscape orientation:** 2:1 or 3:1 aspect ratio works well
- **Mobile:** Full screen width minus padding

### Performance

- Avoid complex background images (impacts drawing performance)
- Use appropriate image compression for backgrounds
- Clear signature pad when not in use to free memory

## Next Steps

- [Saving & Exporting](saving-exporting.md) - Save customized signatures
- [Callbacks](callbacks.md) - React to drawing events
- [Advanced Features](advanced-features.md) - Validation and read-only display
- [Accessibility](accessibility.md) - Make customized pads accessible
