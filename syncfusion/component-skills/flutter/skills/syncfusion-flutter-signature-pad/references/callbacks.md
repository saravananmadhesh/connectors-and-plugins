# Event Handling and Callbacks

This guide covers the event handling capabilities of the Syncfusion Flutter SignaturePad widget through its callback properties.

## Available Callbacks

The SfSignaturePad provides three main callbacks to track user interaction:

1. **`onDrawStart`** - Called when user begins drawing
2. **`onDraw`** - Called continuously during drawing
3. **`onDrawEnd`** - Called when user stops drawing

## onDrawStart Callback

Triggered when the user first touches the signature pad to start drawing.

### Basic Usage

```dart
SfSignaturePad(
  onDrawStart: () {
    print('User started drawing');
    return true;
  },
)
```

### Common Use Cases

#### Visual Feedback

```dart
class SignaturePadWithFeedback extends StatefulWidget {
  @override
  _SignaturePadWithFeedbackState createState() => _SignaturePadWithFeedbackState();
}

class _SignaturePadWithFeedbackState extends State<SignaturePadWithFeedback> {
  bool _isDrawing = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: _isDrawing ? Colors.blue : Colors.grey,
              width: _isDrawing ? 2 : 1,
            ),
          ),
          child: SfSignaturePad(
            backgroundColor: _isDrawing ? Colors.blue[50] : Colors.white,
            onDrawStart: () {
              setState(() => _isDrawing = true);
              return true;
            },
            onDrawEnd: () {
              setState(() => _isDrawing = false);
            },
          ),
        ),
        if (_isDrawing)
          Text('Drawing...', style: TextStyle(color: Colors.blue)),
      ],
    );
  }
}
```

#### Clear Error Messages

```dart
SfSignaturePad(
  onDrawStart: () {
    setState(() {
      _errorMessage = ''; // Clear validation errors when user starts
    });
    return true;
  },
)
```

#### Track Usage

```dart
int _drawingAttempts = 0;

SfSignaturePad(
  onDrawStart: () {
    setState(() => _drawingAttempts++);
    print('User has started drawing $_drawingAttempts times');
    return true;
  },
)
```

#### Enable Save Button

```dart
bool _canSave = false;

SfSignaturePad(
  onDrawStart: () {
    setState(() => _canSave = true);
    return true;
  },
)

// ... later
ElevatedButton(
  onPressed: _canSave ? _saveSignature : null,
  child: Text('Save'),
)
```

## onDraw Callback

Called continuously while the user is drawing on the signature pad. Receives the current pointer position and timestamp.

### Signature

```dart
typedef DrawCallback = void Function(Offset offset, DateTime time);
```

### Basic Usage

```dart
SfSignaturePad(
  onDraw: (offset, time) {
    print('Drawing at position: ${offset.dx}, ${offset.dy}');
    print('Time: $time');
  },
)
```

### Common Use Cases

#### Track Drawing Progress

```dart
class DrawingTracker extends StatefulWidget {
  @override
  _DrawingTrackerState createState() => _DrawingTrackerState();
}

class _DrawingTrackerState extends State<DrawingTracker> {
  int _pointCount = 0;
  Offset? _lastPosition;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          onDraw: (offset, time) {
            setState(() {
              _pointCount++;
              _lastPosition = offset;
            });
          },
          onDrawStart: () {
            setState(() => _pointCount = 0);
            return true;
          },
        ),
        Text('Points drawn: $_pointCount'),
        if (_lastPosition != null)
          Text('Last position: ${_lastPosition!.dx.toStringAsFixed(1)}, ${_lastPosition!.dy.toStringAsFixed(1)}'),
      ],
    );
  }
}
```

#### Calculate Drawing Duration

```dart
class DrawingDurationTracker extends StatefulWidget {
  @override
  _DrawingDurationTrackerState createState() => _DrawingDurationTrackerState();
}

class _DrawingDurationTrackerState extends State<DrawingDurationTracker> {
  DateTime? _drawStartTime;
  Duration _totalDrawingTime = Duration.zero;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          onDrawStart: () {
            _drawStartTime = DateTime.now();
            return true;
          },
          onDrawEnd: () {
            if (_drawStartTime != null) {
              setState(() {
                _totalDrawingTime += DateTime.now().difference(_drawStartTime!);
                _drawStartTime = null;
              });
            }
          },
        ),
        Text('Total drawing time: ${_totalDrawingTime.inSeconds} seconds'),
      ],
    );
  }
}
```

#### Real-time Bounds Checking

```dart
SfSignaturePad(
  onDraw: (offset, time) {
    // Check if drawing is within acceptable bounds
    final size = context.size;
    final margin = 20.0;
    
    if (offset.dx < margin || 
        offset.dy < margin || 
        offset.dx > size!.width - margin || 
        offset.dy > size.height - margin) {
      print('Warning: Drawing near edge');
    }
  },
)
```

#### Detect Drawing Speed

```dart
class SpeedDetector extends StatefulWidget {
  @override
  _SpeedDetectorState createState() => _SpeedDetectorState();
}

class _SpeedDetectorState extends State<SpeedDetector> {
  Offset? _lastOffset;
  DateTime? _lastTime;
  String _speed = 'Normal';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          onDraw: (offset, time) {
            if (_lastOffset != null && _lastTime != null) {
              final distance = (offset - _lastOffset!).distance;
              final duration = time.difference(_lastTime!).inMilliseconds;
              
              if (duration > 0) {
                final speed = distance / duration; // pixels per millisecond
                
                setState(() {
                  if (speed > 2.0) {
                    _speed = 'Fast';
                  } else if (speed < 0.5) {
                    _speed = 'Slow';
                  } else {
                    _speed = 'Normal';
                  }
                });
              }
            }
            
            _lastOffset = offset;
            _lastTime = time;
          },
          onDrawEnd: () {
            _lastOffset = null;
            _lastTime = null;
          },
        ),
        Text('Drawing speed: $_speed'),
      ],
    );
  }
}
```

## onDrawEnd Callback

Called when the user lifts their finger/stylus from the signature pad.

### Basic Usage

```dart
SfSignaturePad(
  onDrawEnd: () {
    print('User stopped drawing');
  },
)
```

### Common Use Cases

#### Stroke Counter

```dart
class StrokeCounter extends StatefulWidget {
  @override
  _StrokeCounterState createState() => _StrokeCounterState();
}

class _StrokeCounterState extends State<StrokeCounter> {
  int _strokeCount = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          onDrawEnd: () {
            setState(() => _strokeCount++);
          },
        ),
        Text('Strokes: $_strokeCount'),
        ElevatedButton(
          onPressed: () {
            _signaturePadKey.currentState!.clear();
            setState(() => _strokeCount = 0);
          },
          child: Text('Clear'),
        ),
      ],
    );
  }
}
```

#### Validate on Each Stroke

```dart
final int _minimumStrokes = 3;
int _currentStrokes = 0;
String _validationMessage = '';

SfSignaturePad(
  onDrawEnd: () {
    setState(() {
      _currentStrokes++;
      
      if (_currentStrokes < _minimumStrokes) {
        _validationMessage = 'Please add ${_minimumStrokes - _currentStrokes} more stroke(s)';
      } else {
        _validationMessage = 'Signature looks good!';
      }
    });
  },
)
```

#### Auto-save After Inactivity

```dart
class AutoSaveSignaturePad extends StatefulWidget {
  @override
  _AutoSaveSignaturePadState createState() => _AutoSaveSignaturePadState();
}

class _AutoSaveSignaturePadState extends State<AutoSaveSignaturePad> {
  Timer? _autoSaveTimer;
  final _autoSaveDelay = Duration(seconds: 3);

  @override
  Widget build(BuildContext context) {
    return SfSignaturePad(
      onDrawEnd: () {
        // Cancel existing timer
        _autoSaveTimer?.cancel();
        
        // Start new timer
        _autoSaveTimer = Timer(_autoSaveDelay, () {
          _autoSave();
        });
      },
    );
  }

  Future<void> _autoSave() async {
    print('Auto-saving signature...');
    // Save logic here
  }

  @override
  void dispose() {
    _autoSaveTimer?.cancel();
    super.dispose();
  }
}
```

#### Provide Real-time Feedback

```dart
class FeedbackSignaturePad extends StatefulWidget {
  @override
  _FeedbackSignaturePadState createState() => _FeedbackSignaturePadState();
}

class _FeedbackSignaturePadState extends State<FeedbackSignaturePad> {
  String _feedback = 'Start signing...';
  int _strokes = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          onDrawStart: () {
            setState(() => _feedback = 'Keep going...');
            return true;
          },
          onDrawEnd: () {
            setState(() {
              _strokes++;
              if (_strokes == 1) {
                _feedback = 'Good start!';
              } else if (_strokes == 2) {
                _feedback = 'Almost there...';
              } else if (_strokes >= 3) {
                _feedback = 'Perfect! You can save now.';
              }
            });
          },
        ),
        Container(
          padding: EdgeInsets.all(16),
          child: Text(
            _feedback,
            style: TextStyle(
              fontSize: 16,
              color: _strokes >= 3 ? Colors.green : Colors.grey[600],
              fontWeight: _strokes >= 3 ? FontWeight.bold : FontWeight.normal,
            ),
          ),
        ),
      ],
    );
  }
}
```

## Combining Callbacks

### Complete Event Tracking

```dart
class CompleteEventTracker extends StatefulWidget {
  @override
  _CompleteEventTrackerState createState() => _CompleteEventTrackerState();
}

class _CompleteEventTrackerState extends State<CompleteEventTracker> {
  bool _isDrawing = false;
  int _strokeCount = 0;
  int _pointCount = 0;
  DateTime? _strokeStartTime;
  List<Duration> _strokeDurations = [];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 300,
          decoration: BoxDecoration(
            border: Border.all(
              color: _isDrawing ? Colors.blue : Colors.grey,
              width: 2,
            ),
          ),
          child: SfSignaturePad(
            backgroundColor: Colors.white,
            onDrawStart: () {
              setState(() {
                _isDrawing = true;
                _strokeStartTime = DateTime.now();
                _pointCount = 0;
              });
              return true;
            },
            onDraw: (offset, time) {
              setState(() => _pointCount++);
            },
            onDrawEnd: () {
              setState(() {
                _isDrawing = false;
                _strokeCount++;
                
                if (_strokeStartTime != null) {
                  _strokeDurations.add(
                    DateTime.now().difference(_strokeStartTime!)
                  );
                }
              });
            },
          ),
        ),
        SizedBox(height: 16),
        _buildStatistics(),
      ],
    );
  }

  Widget _buildStatistics() {
    final avgDuration = _strokeDurations.isEmpty
        ? 0
        : _strokeDurations.map((d) => d.inMilliseconds).reduce((a, b) => a + b) /
            _strokeDurations.length;

    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Statistics:', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Text('Status: ${_isDrawing ? "Drawing" : "Idle"}'),
            Text('Total strokes: $_strokeCount'),
            Text('Points in current stroke: $_pointCount'),
            Text('Average stroke duration: ${avgDuration.toStringAsFixed(0)}ms'),
          ],
        ),
      ),
    );
  }
}
```

### State Machine Pattern

```dart
enum SignatureState { empty, drawing, complete, saved }

class StateMachineSignaturePad extends StatefulWidget {
  @override
  _StateMachineSignaturePadState createState() => _StateMachineSignaturePadState();
}

class _StateMachineSignaturePadState extends State<StateMachineSignaturePad> {
  SignatureState _state = SignatureState.empty;
  final GlobalKey<SfSignaturePadState> _key = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSignaturePad(
          key: _key,
          onDrawStart: () {
            setState(() => _state = SignatureState.drawing);
            return true;
          },
          onDrawEnd: () {
            setState(() => _state = SignatureState.complete);
          },
        ),
        SizedBox(height: 16),
        _buildStateIndicator(),
        SizedBox(height: 16),
        _buildActions(),
      ],
    );
  }

  Widget _buildStateIndicator() {
    String message;
    Color color;

    switch (_state) {
      case SignatureState.empty:
        message = 'Please sign above';
        color = Colors.grey;
        break;
      case SignatureState.drawing:
        message = 'Drawing...';
        color = Colors.blue;
        break;
      case SignatureState.complete:
        message = 'Signature complete - ready to save';
        color = Colors.green;
        break;
      case SignatureState.saved:
        message = 'Signature saved successfully';
        color = Colors.green;
        break;
    }

    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color),
      ),
      child: Text(message, style: TextStyle(color: color)),
    );
  }

  Widget _buildActions() {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: _state != SignatureState.empty ? _handleClear : null,
            child: Text('Clear'),
          ),
        ),
        SizedBox(width: 16),
        Expanded(
          child: ElevatedButton(
            onPressed: _state == SignatureState.complete ? _handleSave : null,
            child: Text('Save'),
          ),
        ),
      ],
    );
  }

  void _handleClear() {
    _key.currentState!.clear();
    setState(() => _state = SignatureState.empty);
  }

  Future<void> _handleSave() async {
    // Save logic
    setState(() => _state = SignatureState.saved);
    
    // Reset after delay
    await Future.delayed(Duration(seconds: 2));
    _handleClear();
  }
}
```

## Performance Considerations

### Throttling onDraw

If you're performing expensive operations in `onDraw`, consider throttling:

```dart
class ThrottledDrawing extends StatefulWidget {
  @override
  _ThrottledDrawingState createState() => _ThrottledDrawingState();
}

class _ThrottledDrawingState extends State<ThrottledDrawing> {
  DateTime? _lastUpdateTime;
  final _throttleDuration = Duration(milliseconds: 100);

  @override
  Widget build(BuildContext context) {
    return SfSignaturePad(
      onDraw: (offset, time) {
        final now = DateTime.now();
        
        if (_lastUpdateTime == null ||
            now.difference(_lastUpdateTime!) >= _throttleDuration) {
          _lastUpdateTime = now;
          _performExpensiveOperation(offset);
        }
      },
    );
  }

  void _performExpensiveOperation(Offset offset) {
    // Your expensive logic here
  }
}
```

### Debouncing onDrawEnd

For operations that should only run after the user finishes all drawing:

```dart
Timer? _debounceTimer;

SfSignaturePad(
  onDrawEnd: () {
    _debounceTimer?.cancel();
    _debounceTimer = Timer(Duration(seconds: 2), () {
      // User hasn't drawn for 2 seconds
      _performAction();
    });
  },
)
```

## Best Practices

### Do's

✅ Use `onDrawStart` to clear validation errors
✅ Use `onDrawEnd` for stroke counting and validation
✅ Keep callback logic lightweight for better performance
✅ Update UI state in `setState()` when needed
✅ Cancel timers in `dispose()` to prevent memory leaks

### Don'ts

❌ Don't perform heavy computations in `onDraw` without throttling
❌ Don't make network calls directly in callbacks
❌ Don't forget to cancel timers and subscriptions
❌ Don't update state too frequently (causes unnecessary rebuilds)

## Next Steps

- [Saving & Exporting](saving-exporting.md) - Save signatures from callback events
- [Advanced Features](advanced-features.md) - Build complex validation logic
- [Customization](customization.md) - Style based on drawing state
- [Accessibility](accessibility.md) - Accessible event handling
