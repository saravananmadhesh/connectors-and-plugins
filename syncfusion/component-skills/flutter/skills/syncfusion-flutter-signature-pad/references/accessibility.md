# Accessibility

This guide covers accessibility best practices for the Syncfusion Flutter SignaturePad to ensure your signature capture interfaces are usable by everyone, including users with disabilities.

## Semantic Labels

### Basic Semantics

Wrap the signature pad with proper semantic labels:

```dart
Semantics(
  label: 'Signature field',
  hint: 'Draw your signature here',
  child: SfSignaturePad(
    backgroundColor: Colors.white,
  ),
)
```

### Complete Semantic Structure

```dart
class AccessibleSignaturePad extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Semantics(
          label: 'Signature section',
          child: Text(
            'Your Signature',
            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(height: 8),
        Semantics(
          label: 'Signature drawing area',
          hint: 'Use your finger or stylus to draw your signature',
          enabled: true,
          textField: false,
          child: Container(
            height: 200,
            decoration: BoxDecoration(border: Border.all()),
            child: SfSignaturePad(
              key: _key,
              backgroundColor: Colors.white,
            ),
          ),
        ),
        SizedBox(height: 8),
        Row(
          children: [
            Semantics(
              label: 'Clear signature',
              hint: 'Removes your signature and lets you start over',
              button: true,
              child: ElevatedButton(
                onPressed: () => _key.currentState!.clear(),
                child: Text('Clear'),
              ),
            ),
            SizedBox(width: 16),
            Semantics(
              label: 'Save signature',
              hint: 'Saves your signature and continues',
              button: true,
              child: ElevatedButton(
                onPressed: _saveSignature,
                child: Text('Save'),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _saveSignature() async {
    // Save logic
  }
}
```

## Screen Reader Support

### Announcing State Changes

Announce important state changes to screen readers:

```dart
class ScreenReaderFriendlySignaturePad extends StatefulWidget {
  @override
  _ScreenReaderFriendlySignaturePadState createState() => 
      _ScreenReaderFriendlySignaturePadState();
}

class _ScreenReaderFriendlySignaturePadState 
    extends State<ScreenReaderFriendlySignaturePad> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  bool _hasSignature = false;
  String _announcement = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Semantics(
          liveRegion: true,
          announcement: _announcement,
          child: Container(),
        ),
        SfSignaturePad(
          key: _key,
          onDrawStart: () {
            setState(() {
              _announcement = 'Started drawing signature';
            });
            return true;
          },
          onDrawEnd: () {
            setState(() {
              _hasSignature = true;
              _announcement = 'Signature drawn. You can now save or clear.';
            });
          },
        ),
        Row(
          children: [
            ElevatedButton(
              onPressed: () {
                _key.currentState!.clear();
                setState(() {
                  _hasSignature = false;
                  _announcement = 'Signature cleared';
                });
              },
              child: Text('Clear'),
            ),
            SizedBox(width: 16),
            ElevatedButton(
              onPressed: _hasSignature ? () {
                setState(() {
                  _announcement = 'Signature saved successfully';
                });
                _saveSignature();
              } : null,
              child: Text('Save'),
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _saveSignature() async {
    // Save logic
  }
}
```

### Focus Management

Ensure proper focus order and management:

```dart
class FocusManaged SignaturePad extends StatefulWidget {
  @override
  _FocusManagedSignaturePadState createState() => 
      _FocusManagedSignaturePadState();
}

class _FocusManagedSignaturePadState extends State<FocusManagedSignaturePad> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  final FocusNode _clearButtonFocus = FocusNode();
  final FocusNode _saveButtonFocus = FocusNode();

  @override
  void dispose() {
    _clearButtonFocus.dispose();
    _saveButtonFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          key: _key,
          onDrawEnd: () {
            // Move focus to save button after drawing
            _saveButtonFocus.requestFocus();
          },
        ),
        Row(
          children: [
            ElevatedButton(
              focusNode: _clearButtonFocus,
              onPressed: () => _key.currentState!.clear(),
              child: Text('Clear'),
            ),
            SizedBox(width: 16),
            ElevatedButton(
              focusNode: _saveButtonFocus,
              onPressed: _saveSignature,
              child: Text('Save'),
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _saveSignature() async {
    // Save logic
  }
}
```

## Alternative Input Methods

### Keyboard Navigation Support

While signature pads are primarily touch-based, provide alternative methods:

```dart
class AccessibleSignatureCapture extends StatefulWidget {
  @override
  _AccessibleSignatureCaptureState createState() => 
      _AccessibleSignatureCaptureState();
}

class _AccessibleSignatureCaptureState 
    extends State<AccessibleSignatureCapture> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  bool _useAlternativeInput = false;
  String _typedSignature = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Signature',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8),
        
        // Option to switch input method
        Semantics(
          label: 'Alternative signature input',
          hint: 'Switch to typed signature instead of drawing',
          child: SwitchListTile(
            title: Text('Use typed signature'),
            value: _useAlternativeInput,
            onChanged: (value) {
              setState(() => _useAlternativeInput = value);
            },
          ),
        ),
        
        SizedBox(height: 16),
        
        if (_useAlternativeInput)
          // Text input alternative
          Semantics(
            label: 'Type your full name as signature',
            textField: true,
            child: TextField(
              decoration: InputDecoration(
                labelText: 'Type your full name',
                border: OutlineInputBorder(),
                hintText: 'John Doe',
              ),
              onChanged: (value) {
                setState(() => _typedSignature = value);
              },
            ),
          )
        else
          // Touch signature pad
          Semantics(
            label: 'Draw signature',
            hint: 'Use touch or stylus to draw your signature',
            child: Container(
              height: 200,
              decoration: BoxDecoration(border: Border.all()),
              child: SfSignaturePad(
                key: _key,
                backgroundColor: Colors.white,
              ),
            ),
          ),
        
        SizedBox(height: 16),
        
        ElevatedButton(
          onPressed: _save,
          child: Text('Save Signature'),
        ),
      ],
    );
  }

  Future<void> _save() async {
    if (_useAlternativeInput) {
      // Save typed signature (you could generate an image from text)
      print('Typed signature: $_typedSignature');
    } else {
      // Save drawn signature
      final image = await _key.currentState!.toImage();
      // Save logic
    }
  }
}
```

## Visual Accessibility

### High Contrast Support

Provide high contrast options for users with visual impairments:

```dart
class HighContrastSignaturePad extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  
  @override
  Widget build(BuildContext context) {
    final highContrast = MediaQuery.of(context).highContrast;
    
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: highContrast ? Colors.black : Colors.grey,
          width: highContrast ? 3 : 1,
        ),
      ),
      child: SfSignaturePad(
        key: _key,
        backgroundColor: Colors.white,
        strokeColor: highContrast ? Colors.black : Colors.blue,
        minimumStrokeWidth: highContrast ? 3.0 : 2.0,
        maximumStrokeWidth: highContrast ? 6.0 : 4.0,
      ),
    );
  }
}
```

### Large Touch Targets

Ensure buttons meet minimum size requirements (48x48dp):

```dart
class AccessibleButtons extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> signatureKey;
  
  AccessibleButtons({required this.signatureKey});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: SizedBox(
            height: 48, // Minimum touch target height
            child: ElevatedButton(
              onPressed: () => signatureKey.currentState!.clear(),
              child: Text('Clear', style: TextStyle(fontSize: 16)),
            ),
          ),
        ),
        SizedBox(width: 16),
        Expanded(
          child: SizedBox(
            height: 48,
            child: ElevatedButton(
              onPressed: _save,
              child: Text('Save', style: TextStyle(fontSize: 16)),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _save() async {
    // Save logic
  }
}
```

### Color Contrast

Ensure adequate color contrast ratios:

```dart
// Good contrast example
SfSignaturePad(
  backgroundColor: Colors.white,      // Background
  strokeColor: Colors.black,          // High contrast
)

// For dark mode
SfSignaturePad(
  backgroundColor: Color(0xFF1E1E1E), // Dark background
  strokeColor: Colors.white,          // White stroke for contrast
)
```

## Error and Validation Feedback

### Accessible Error Messages

Provide clear error messages for screen readers:

```dart
class AccessibleValidation extends StatefulWidget {
  @override
  _AccessibleValidationState createState() => _AccessibleValidationState();
}

class _AccessibleValidationState extends State<AccessibleValidation> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  String? _errorMessage;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Semantics(
          label: 'Signature field',
          hint: _errorMessage ?? 'Draw your signature here',
          error: _errorMessage != null,
          child: Container(
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
            ),
          ),
        ),
        if (_errorMessage != null)
          Semantics(
            liveRegion: true,
            child: Padding(
              padding: EdgeInsets.only(top: 8),
              child: Text(
                _errorMessage!,
                style: TextStyle(color: Colors.red),
              ),
            ),
          ),
        SizedBox(height: 16),
        ElevatedButton(
          onPressed: _validate,
          child: Text('Continue'),
        ),
      ],
    );
  }

  Future<void> _validate() async {
    try {
      final image = await _key.currentState!.toImage();
      setState(() => _errorMessage = null);
      // Proceed
    } catch (e) {
      setState(() {
        _errorMessage = 'Please provide a signature before continuing';
      });
    }
  }
}
```

## Instructions and Help Text

### Clear Instructions

Provide clear, concise instructions:

```dart
class InstructionalSignaturePad extends StatelessWidget {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Semantics(
          header: true,
          child: Text(
            'Signature Required',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(height: 8),
        Semantics(
          child: Text(
            'Please sign below using your finger or stylus. '
            'Your signature will be used to verify this document.',
            style: TextStyle(fontSize: 14, color: Colors.grey[700]),
          ),
        ),
        SizedBox(height: 16),
        Semantics(
          label: 'Signature drawing area',
          hint: 'Draw your signature with your finger or stylus',
          child: Container(
            height: 200,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(8),
            ),
            child: SfSignaturePad(
              key: _key,
              backgroundColor: Colors.white,
            ),
          ),
        ),
        SizedBox(height: 8),
        Semantics(
          child: Text(
            'Tip: Sign as you normally would on paper',
            style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic),
          ),
        ),
      ],
    );
  }
}
```

## WCAG Compliance Checklist

### Level A (Minimum)

- ✅ Provide text alternatives for signature fields
- ✅ Ensure keyboard accessibility for all controls
- ✅ Use sufficient color contrast (4.5:1 for text)
- ✅ Make all functionality available from keyboard

### Level AA (Recommended)

- ✅ Provide clear labels and instructions
- ✅ Ensure 3:1 contrast for UI components
- ✅ Make touch targets at least 44x44 CSS pixels
- ✅ Support screen orientation changes
- ✅ Provide clear error identification

### Level AAA (Enhanced)

- ✅ Provide extended help text
- ✅ Minimize timing requirements
- ✅ Ensure 7:1 contrast ratio
- ✅ Provide status messages
- ✅ Support alternative input methods

## Complete Accessible Example

```dart
class FullyAccessibleSignaturePad extends StatefulWidget {
  @override
  _FullyAccessibleSignaturePadState createState() => 
      _FullyAccessibleSignaturePadState();
}

class _FullyAccessibleSignaturePadState 
    extends State<FullyAccessibleSignaturePad> {
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();
  final FocusNode _saveFocus = FocusNode();
  bool _hasSignature = false;
  String? _errorMessage;
  String _statusMessage = '';

  @override
  void dispose() {
    _saveFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final highContrast = MediaQuery.of(context).highContrast;
    
    return Scaffold(
      appBar: AppBar(
        title: Semantics(
          header: true,
          child: Text('Sign Document'),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Instructions
            Semantics(
              child: Text(
                'Please provide your signature below. '
                'Use your finger or stylus to draw on the white area.',
                style: TextStyle(fontSize: 16),
              ),
            ),
            SizedBox(height: 16),
            
            // Status announcements
            Semantics(
              liveRegion: true,
              announcement: _statusMessage,
              child: Container(),
            ),
            
            // Signature pad
            Semantics(
              label: 'Signature drawing area',
              hint: 'Draw your signature using touch or stylus',
              error: _errorMessage != null,
              child: Container(
                height: 250,
                decoration: BoxDecoration(
                  border: Border.all(
                    color: _errorMessage != null 
                        ? Colors.red 
                        : (highContrast ? Colors.black : Colors.grey),
                    width: _errorMessage != null ? 3 : (highContrast ? 3 : 1),
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: SfSignaturePad(
                  key: _key,
                  backgroundColor: Colors.white,
                  strokeColor: highContrast ? Colors.black : Colors.blue[900]!,
                  minimumStrokeWidth: highContrast ? 3.0 : 2.0,
                  maximumStrokeWidth: highContrast ? 6.0 : 4.0,
                  onDrawStart: () {
                    setState(() {
                      _errorMessage = null;
                      _statusMessage = 'Drawing signature';
                    });
                    return true;
                  },
                  onDrawEnd: () {
                    setState(() {
                      _hasSignature = true;
                      _statusMessage = 'Signature completed. You can save or redraw.';
                    });
                    // Move focus to save button
                    Future.delayed(Duration(milliseconds: 500), () {
                      _saveFocus.requestFocus();
                    });
                  },
                ),
              ),
            ),
            
            // Error message
            if (_errorMessage != null)
              Semantics(
                liveRegion: true,
                child: Padding(
                  padding: EdgeInsets.only(top: 8),
                  child: Text(
                    _errorMessage!,
                    style: TextStyle(
                      color: Colors.red,
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            
            SizedBox(height: 24),
            
            // Action buttons
            Row(
              children: [
                Expanded(
                  child: SizedBox(
                    height: 48,
                    child: Semantics(
                      button: true,
                      label: 'Clear signature',
                      hint: 'Removes your current signature so you can redraw',
                      child: OutlinedButton(
                        onPressed: _hasSignature ? _clear : null,
                        child: Text('Clear', style: TextStyle(fontSize: 16)),
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: SizedBox(
                    height: 48,
                    child: Semantics(
                      button: true,
                      label: 'Save signature',
                      hint: 'Saves your signature and continues to next step',
                      child: ElevatedButton(
                        focusNode: _saveFocus,
                        onPressed: _hasSignature ? _save : null,
                        child: Text('Save', style: TextStyle(fontSize: 16)),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _clear() {
    setState(() {
      _key.currentState!.clear();
      _hasSignature = false;
      _errorMessage = null;
      _statusMessage = 'Signature cleared. You can draw again.';
    });
  }

  Future<void> _save() async {
    try {
      final image = await _key.currentState!.toImage(pixelRatio: 3.0);
      setState(() {
        _statusMessage = 'Signature saved successfully';
      });
      
      // Navigate or continue
      Future.delayed(Duration(seconds: 1), () {
        Navigator.pop(context, image);
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Unable to save signature. Please try drawing again.';
        _statusMessage = _errorMessage!;
      });
    }
  }
}
```

## Testing Accessibility

### Screen Reader Testing

Test with screen readers on different platforms:
- **iOS**: VoiceOver
- **Android**: TalkBack
- **Web**: NVDA, JAWS

### Keyboard Navigation Testing

Verify:
- Tab order is logical
- All functions are keyboard accessible
- Focus indicators are visible
- No keyboard traps

### Color Contrast Testing

Use tools like:
- WebAIM Contrast Checker
- Chrome DevTools Accessibility Panel
- WAVE Browser Extension

## Best Practices

✅ **Do:**
- Provide clear labels and instructions
- Announce state changes to screen readers
- Support alternative input methods
- Use sufficient color contrast
- Make touch targets large enough
- Test with real assistive technologies

❌ **Don't:**
- Rely solely on color to convey information
- Make signature fields without alternatives
- Use small touch targets (<44x44 dp)
- Forget to announce errors
- Ignore keyboard navigation

## Next Steps

- [Getting Started](getting-started.md) - Set up accessible signature pads
- [Customization](customization.md) - Style with accessibility in mind
- [Advanced Features](advanced-features.md) - Build accessible complex workflows
