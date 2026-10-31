# Callbacks and Events

This guide covers callbacks and event handlers available across all slider controls for responding to user interactions.

## Table of Contents
- [Available Callbacks](#available-callbacks)
- [onChanged Callback](#onchanged-callback)
- [onChangeStart Callback](#onchangestart-callback)
- [onChangeEnd Callback](#onchangend-callback)
- [Complete Lifecycle Example](#complete-lifecycle-example)
- [Validation and Constraints](#validation-and-constraints)
- [Async Operations](#async-operations)

## Available Callbacks

All three widgets support the same core callbacks:

| Callback | When It Fires | Use Case |
|----------|---------------|----------|
| `onChanged` | Continuously during drag | Update UI, show live values |
| `onChangeStart` | When user starts dragging | Log start, initialize operations |
| `onChangeEnd` | When user releases thumb | Save to database, trigger API calls |

### Widget-Specific Signatures

```dart
// SfSlider
onChanged: (dynamic newValue) { }
onChangeStart: (dynamic startValue) { }
onChangeEnd: (dynamic endValue) { }

// SfRangeSlider & SfRangeSelector
onChanged: (SfRangeValues newValues) { }
onChangeStart: (SfRangeValues startValues) { }
onChangeEnd: (SfRangeValues endValues) { }
```

## onChanged Callback

Fires continuously as the user drags the thumb(s). Called many times per second.

### SfSlider onChanged

```dart
class SliderOnChanged extends StatefulWidget {
  @override
  _SliderOnChangedState createState() => _SliderOnChangedState();
}

class _SliderOnChangedState extends State<SliderOnChanged> {
  double _value = 50.0;
  int _changeCount = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Value: ${_value.toInt()}'),
        Text('Changes: $_changeCount'),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          enableTooltip: true,
          onChanged: (dynamic newValue) {
            setState(() {
              _value = newValue;
              _changeCount++;
            });
            print('Value changed to: $newValue');
          },
        ),
      ],
    );
  }
}
```

**Note**: `_changeCount` will increment rapidly during drag—can be hundreds of calls for one drag action.

### SfRangeSlider onChanged

```dart
class RangeSliderOnChanged extends StatefulWidget {
  @override
  _RangeSliderOnChangedState createState() => _RangeSliderOnChangedState();
}

class _RangeSliderOnChangedState extends State<RangeSliderOnChanged> {
  SfRangeValues _values = SfRangeValues(20.0, 80.0);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Range: ${_values.start.toInt()} - ${_values.end.toInt()}'),
        SfRangeSlider(
          min: 0.0,
          max: 100.0,
          values: _values,
          enableTooltip: true,
          onChanged: (SfRangeValues newValues) {
            setState(() {
              _values = newValues;
            });
            print('Start: ${newValues.start}, End: ${newValues.end}');
          },
        ),
      ],
    );
  }
}
```

### SfRangeSelector onChanged

```dart
SfRangeSelector(
  min: 0.0,
  max: 100.0,
  initialValues: SfRangeValues(30.0, 70.0),
  enableTooltip: true,
  onChanged: (SfRangeValues newValues) {
    print('Range changed: ${newValues.start} - ${newValues.end}');
    // Note: For deferred updates with controller, this fires but
    // you might not setState here—wait for controller listener instead
  },
  child: Container(
    height: 120,
    child: SfCartesianChart(/* chart */),
  ),
)
```

### Date Values in onChanged

```dart
class DateSliderOnChanged extends StatefulWidget {
  @override
  _DateSliderOnChangedState createState() => _DateSliderOnChangedState();
}

class _DateSliderOnChangedState extends State<DateSliderOnChanged> {
  DateTime _selectedDate = DateTime(2024, 06, 01);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Selected: ${DateFormat.yMMMd().format(_selectedDate)}'),
        SfSlider(
          min: DateTime(2024, 01, 01),
          max: DateTime(2024, 12, 31),
          value: _selectedDate,
          dateFormat: DateFormat.yMMM(),
          dateIntervalType: DateIntervalType.months,
          interval: 2,
          showLabels: true,
          enableTooltip: true,
          onChanged: (dynamic newValue) {
            setState(() {
              _selectedDate = newValue as DateTime;
            });
          },
        ),
      ],
    );
  }
}
```

## onChangeStart Callback

Fires once when the user **starts** dragging a thumb.

### SfSlider onChangeStart

```dart
class SliderOnChangeStart extends StatefulWidget {
  @override
  _SliderOnChangeStartState createState() => _SliderOnChangeStartState();
}

class _SliderOnChangeStartState extends State<SliderOnChangeStart> {
  double _value = 50.0;
  String _status = 'Ready';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Status: $_status'),
        Text('Value: ${_value.toInt()}'),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          enableTooltip: true,
          onChangeStart: (dynamic startValue) {
            setState(() {
              _status = 'Dragging started at ${startValue.toInt()}';
            });
            print('User started dragging at: $startValue');
          },
          onChanged: (dynamic newValue) {
            setState(() {
              _value = newValue;
            });
          },
        ),
      ],
    );
  }
}
```

### SfRangeSlider onChangeStart

```dart
class RangeSliderOnChangeStart extends StatefulWidget {
  @override
  _RangeSliderOnChangeStartState createState() => _RangeSliderOnChangeStartState();
}

class _RangeSliderOnChangeStartState extends State<RangeSliderOnChangeStart> {
  SfRangeValues _values = SfRangeValues(30.0, 70.0);
  String _message = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(_message),
        SfRangeSlider(
          min: 0.0,
          max: 100.0,
          values: _values,
          enableTooltip: true,
          onChangeStart: (SfRangeValues startValues) {
            setState(() {
              _message = 'Started dragging: ${startValues.start.toInt()} - ${startValues.end.toInt()}';
            });
            print('Drag start: ${startValues.start} - ${startValues.end}');
          },
          onChanged: (SfRangeValues newValues) {
            setState(() {
              _values = newValues;
            });
          },
        ),
      ],
    );
  }
}
```

### Use Cases for onChangeStart

1. **Log interaction start**: Analytics tracking
2. **Show loading indicator**: Prepare for expensive operation
3. **Store initial value**: Compare before/after
4. **Disable other UI**: Prevent conflicting interactions
5. **Start timer**: Measure how long user takes to adjust

```dart
DateTime? _dragStartTime;

onChangeStart: (dynamic value) {
  _dragStartTime = DateTime.now();
  print('User started adjusting at $value');
}
```

## onChangeEnd Callback

Fires once when the user **releases** the thumb.

### SfSlider onChangeEnd

```dart
class SliderOnChangeEnd extends StatefulWidget {
  @override
  _SliderOnChangeEndState createState() => _SliderOnChangeEndState();
}

class _SliderOnChangeEndState extends State<SliderOnChangeEnd> {
  double _value = 50.0;
  double _committedValue = 50.0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Current: ${_value.toInt()}'),
        Text('Committed: ${_committedValue.toInt()}', 
          style: TextStyle(fontWeight: FontWeight.bold)),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          enableTooltip: true,
          onChanged: (dynamic newValue) {
            setState(() {
              _value = newValue;  // Live update
            });
          },
          onChangeEnd: (dynamic finalValue) {
            setState(() {
              _committedValue = finalValue;  // Committed value
            });
            print('User finished at: $finalValue');
            // Trigger expensive operation here
            _saveToDatabase(_committedValue);
          },
        ),
      ],
    );
  }

  void _saveToDatabase(double value) {
    print('Saving $value to database...');
    // Async database operation
  }
}
```

### SfRangeSlider onChangeEnd

```dart
class RangeSliderOnChangeEnd extends StatefulWidget {
  @override
  _RangeSliderOnChangeEndState createState() => _RangeSliderOnChangeEndState();
}

class _RangeSliderOnChangeEndState extends State<RangeSliderOnChangeEnd> {
  SfRangeValues _values = SfRangeValues(20.0, 80.0);

  @override
  Widget build(BuildContext context) {
    return SfRangeSlider(
      min: 0.0,
      max: 100.0,
      values: _values,
      enableTooltip: true,
      onChanged: (SfRangeValues newValues) {
        setState(() {
          _values = newValues;
        });
      },
      onChangeEnd: (SfRangeValues finalValues) {
        print('Final range: ${finalValues.start} - ${finalValues.end}');
        // Trigger API call, update chart, save preferences
        _applyFilterToData(finalValues.start, finalValues.end);
      },
    );
  }

  void _applyFilterToData(double start, double end) {
    print('Applying filter: $start - $end');
    // Expensive filtering operation
  }
}
```

### Use Cases for onChangeEnd

1. **Save to database**: Persist final value
2. **API calls**: Fetch data for selected range
3. **Analytics**: Log final selection
4. **Trigger computations**: Expensive calculations
5. **Update external state**: Commit to state management
6. **Show confirmation**: "Range updated" snackbar

## Complete Lifecycle Example

Track the entire interaction lifecycle from start to end.

```dart
class CompleteLifecycleExample extends StatefulWidget {
  @override
  _CompleteLifecycleExampleState createState() => _CompleteLifecycleExampleState();
}

class _CompleteLifecycleExampleState extends State<CompleteLifecycleExample> {
  double _value = 50.0;
  String _status = 'Ready';
  DateTime? _dragStartTime;
  int _changeCallCount = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Status: $_status', style: TextStyle(fontSize: 16)),
        Text('Value: ${_value.toInt()}'),
        Text('Change calls: $_changeCallCount'),
        SizedBox(height: 20),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          interval: 20,
          showLabels: true,
          showTicks: true,
          enableTooltip: true,
          onChangeStart: (dynamic startValue) {
            setState(() {
              _status = 'Dragging started';
              _dragStartTime = DateTime.now();
              _changeCallCount = 0;
            });
            print('[START] Initial value: $startValue');
          },
          onChanged: (dynamic newValue) {
            setState(() {
              _value = newValue;
              _changeCallCount++;
              _status = 'Dragging... (${_value.toInt()})';
            });
          },
          onChangeEnd: (dynamic finalValue) {
            final duration = DateTime.now().difference(_dragStartTime!);
            setState(() {
              _status = 'Drag ended (took ${duration.inMilliseconds}ms)';
            });
            print('[END] Final value: $finalValue');
            print('[END] Total onChange calls: $_changeCallCount');
            print('[END] Duration: ${duration.inMilliseconds}ms');
            
            // Perform expensive operation
            _processValue(finalValue);
          },
        ),
      ],
    );
  }

  void _processValue(double value) {
    print('Processing value: $value');
    // Database save, API call, etc.
  }
}
```

### Range Slider Lifecycle with Analytics

```dart
class AnalyticsRangeSlider extends StatefulWidget {
  @override
  _AnalyticsRangeSliderState createState() => _AnalyticsRangeSliderState();
}

class _AnalyticsRangeSliderState extends State<AnalyticsRangeSlider> {
  SfRangeValues _values = SfRangeValues(30.0, 70.0);
  SfRangeValues? _initialValues;

  @override
  Widget build(BuildContext context) {
    return SfRangeSlider(
      min: 0.0,
      max: 100.0,
      values: _values,
      interval: 20,
      showLabels: true,
      enableTooltip: true,
      onChangeStart: (SfRangeValues startValues) {
        _initialValues = startValues;
        // Log to analytics
        _logEvent('range_slider_interaction_start', {
          'start': startValues.start,
          'end': startValues.end,
        });
      },
      onChanged: (SfRangeValues newValues) {
        setState(() {
          _values = newValues;
        });
      },
      onChangeEnd: (SfRangeValues finalValues) {
        // Calculate change
        double startChange = (finalValues.start - _initialValues!.start).abs();
        double endChange = (finalValues.end - _initialValues!.end).abs();
        
        // Log to analytics
        _logEvent('range_slider_interaction_end', {
          'initial_start': _initialValues!.start,
          'initial_end': _initialValues!.end,
          'final_start': finalValues.start,
          'final_end': finalValues.end,
          'start_delta': startChange,
          'end_delta': endChange,
        });
      },
    );
  }

  void _logEvent(String eventName, Map<String, dynamic> params) {
    print('Analytics: $eventName - $params');
    // Send to analytics service (Firebase, Mixpanel, etc.)
  }
}
```

## Validation and Constraints

Enforce constraints or validate values in callbacks.

### Enforce Minimum Range Width

```dart
class MinimumRangeExample extends StatefulWidget {
  @override
  _MinimumRangeExampleState createState() => _MinimumRangeExampleState();
}

class _MinimumRangeExampleState extends State<MinimumRangeExample> {
  SfRangeValues _values = SfRangeValues(30.0, 70.0);
  final double _minRangeWidth = 20.0;
  String _message = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(_message, style: TextStyle(color: Colors.red)),
        SfRangeSlider(
          min: 0.0,
          max: 100.0,
          values: _values,
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          onChanged: (SfRangeValues newValues) {
            double rangeWidth = newValues.end - newValues.start;
            if (rangeWidth >= _minRangeWidth) {
              setState(() {
                _values = newValues;
                _message = '';
              });
            } else {
              setState(() {
                _message = 'Minimum range width is $_minRangeWidth';
              });
            }
          },
          onChangeEnd: (SfRangeValues finalValues) {
            double rangeWidth = finalValues.end - finalValues.start;
            if (rangeWidth < _minRangeWidth) {
              // Reset to previous valid range
              setState(() {
                _values = _values;  // Revert
                _message = 'Range reset: too narrow';
              });
            }
          },
        ),
      ],
    );
  }
}
```

### Snap to Nearest Value

```dart
class SnapToValueExample extends StatefulWidget {
  @override
  _SnapToValueExampleState createState() => _SnapToValueExampleState();
}

class _SnapToValueExampleState extends State<SnapToValueExample> {
  double _value = 50.0;
  final double _snapInterval = 10.0;

  @override
  Widget build(BuildContext context) {
    return SfSlider(
      min: 0.0,
      max: 100.0,
      value: _value,
      showLabels: true,
      enableTooltip: true,
      onChanged: (dynamic newValue) {
        setState(() {
          _value = newValue;  // Allow smooth dragging
        });
      },
      onChangeEnd: (dynamic finalValue) {
        // Snap to nearest interval
        double snappedValue = (finalValue / _snapInterval).round() * _snapInterval;
        setState(() {
          _value = snappedValue;
        });
        print('Snapped to: $snappedValue');
      },
    );
  }
}
```

### Reject Invalid Selections

```dart
class RejectInvalidExample extends StatefulWidget {
  @override
  _RejectInvalidExampleState createState() => _RejectInvalidExampleState();
}

class _RejectInvalidExampleState extends State<RejectInvalidExample> {
  double _value = 50.0;
  final List<double> _blockedValues = [25.0, 75.0];
  String _warning = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Blocked values: ${_blockedValues.join(", ")}'),
        Text(_warning, style: TextStyle(color: Colors.orange)),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          interval: 25,
          showLabels: true,
          enableTooltip: true,
          onChanged: (dynamic newValue) {
            if (!_blockedValues.contains(newValue)) {
              setState(() {
                _value = newValue;
                _warning = '';
              });
            } else {
              setState(() {
                _warning = 'Cannot select blocked value: $newValue';
              });
            }
          },
        ),
      ],
    );
  }
}
```

## Async Operations

Handle asynchronous operations in callbacks.

### Fetch Data on Range Change

```dart
class AsyncDataFetch extends StatefulWidget {
  @override
  _AsyncDataFetchState createState() => _AsyncDataFetchState();
}

class _AsyncDataFetchState extends State<AsyncDataFetch> {
  SfRangeValues _values = SfRangeValues(20.0, 80.0);
  bool _loading = false;
  List<String> _data = [];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfRangeSlider(
          min: 0.0,
          max: 100.0,
          values: _values,
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          onChanged: (SfRangeValues newValues) {
            setState(() {
              _values = newValues;
            });
          },
          onChangeEnd: (SfRangeValues finalValues) async {
            setState(() {
              _loading = true;
            });
            
            // Simulate API call
            await _fetchDataForRange(finalValues.start, finalValues.end);
            
            setState(() {
              _loading = false;
            });
          },
        ),
        if (_loading)
          CircularProgressIndicator()
        else
          Text('Data count: ${_data.length}'),
      ],
    );
  }

  Future<void> _fetchDataForRange(double start, double end) async {
    print('Fetching data for range: $start - $end');
    await Future.delayed(Duration(seconds: 1));  // Simulate network delay
    setState(() {
      _data = List.generate(
        (end - start).toInt(),
        (i) => 'Item ${start.toInt() + i}',
      );
    });
  }
}
```

### Debounce API Calls

```dart
import 'dart:async';

class DebouncedApiCall extends StatefulWidget {
  @override
  _DebouncedApiCallState createState() => _DebouncedApiCallState();
}

class _DebouncedApiCallState extends State<DebouncedApiCall> {
  double _value = 50.0;
  Timer? _debounceTimer;
  String _apiCallStatus = 'Idle';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('API Status: $_apiCallStatus'),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          enableTooltip: true,
          onChanged: (dynamic newValue) {
            setState(() {
              _value = newValue;
              _apiCallStatus = 'Waiting...';
            });
            
            // Cancel previous timer
            _debounceTimer?.cancel();
            
            // Start new timer (debounce)
            _debounceTimer = Timer(Duration(milliseconds: 500), () {
              _makeApiCall(newValue);
            });
          },
        ),
      ],
    );
  }

  void _makeApiCall(double value) {
    setState(() {
      _apiCallStatus = 'Calling API for value: ${value.toInt()}';
    });
    print('API call: $value');
    // Actual API call here
  }

  @override
  void dispose() {
    _debounceTimer?.cancel();
    super.dispose();
  }
}
```

## Best Practices

1. **Use onChangeEnd for expensive operations**: Database saves, API calls
2. **Use onChanged for UI updates**: Live feedback, tooltip-like displays
3. **Use onChangeStart for initialization**: Prepare resources, log start
4. **Avoid heavy computation in onChanged**: It fires very frequently
5. **Debounce frequent operations**: Prevent excessive API calls
6. **Validate in onChangeEnd**: Enforce constraints when user finishes
7. **Log interactions for analytics**: Understand user behavior
8. **Handle async operations carefully**: Use loading indicators, error handling
9. **Clean up resources**: Cancel timers, close streams in dispose()

## Callback Summary

```dart
SfSlider(
  value: _value,
  
  // Fires once when drag starts
  onChangeStart: (dynamic startValue) {
    print('Started at: $startValue');
    // Initialize, log start, store initial value
  },
  
  // Fires continuously during drag (many times per second)
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;  // Update UI
    });
    // Light operations only: update displays, show live feedback
  },
  
  // Fires once when drag ends
  onChangeEnd: (dynamic finalValue) {
    print('Ended at: $finalValue');
    // Heavy operations: save DB, API calls, analytics
  },
)
```
