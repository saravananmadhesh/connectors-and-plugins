# Accessibility and States

This guide covers accessibility features, enabled/disabled states, and semantic properties across all slider controls.

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
- [Semantic Labels](#semantic-labels)
- [Enabled and Disabled States](#enabled-and-disabled-states)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Best Practices](#best-practices)

## Accessibility Overview

Syncfusion slider controls support:
- **Screen readers**: Semantic labels for VoiceOver, TalkBack
- **Keyboard navigation**: Arrow keys, tab navigation
- **RTL languages**: Automatic layout mirroring
- **Disabled states**: Visual and functional disabling
- **Tooltips**: Value announcements

### Why Accessibility Matters

- **Legal compliance**: WCAG 2.1 guidelines
- **Inclusive design**: Users with disabilities
- **Better UX**: Benefits all users
- **Global reach**: RTL language support

## Semantic Labels

Provide meaningful descriptions for screen readers.

### SfSlider Semantic Label

```dart
class AccessibleSlider extends StatefulWidget {
  @override
  _AccessibleSliderState createState() => _AccessibleSliderState();
}

class _AccessibleSliderState extends State<AccessibleSlider> {
  double _volume = 50.0;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Volume control',
      value: '${_volume.toInt()} percent',
      hint: 'Adjust volume level',
      child: SfSlider(
        min: 0.0,
        max: 100.0,
        value: _volume,
        enableTooltip: true,
        onChanged: (dynamic newValue) {
          setState(() {
            _volume = newValue;
          });
        },
      ),
    );
  }
}
```

**Screen reader announces**: "Volume control, 50 percent, Adjust volume level"

### SfRangeSlider Semantic Label

```dart
class AccessibleRangeSlider extends StatefulWidget {
  @override
  _AccessibleRangeSliderState createState() => _AccessibleRangeSliderState();
}

class _AccessibleRangeSliderState extends State<AccessibleRangeSlider> {
  SfRangeValues _priceRange = SfRangeValues(100.0, 500.0);

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Price range filter',
      value: 'From \$${_priceRange.start.toInt()} to \$${_priceRange.end.toInt()}',
      hint: 'Adjust minimum and maximum price',
      child: SfRangeSlider(
        min: 0.0,
        max: 1000.0,
        values: _priceRange,
        enableTooltip: true,
        numberFormat: NumberFormat('\$#'),
        onChanged: (SfRangeValues newValues) {
          setState(() {
            _priceRange = newValues;
          });
        },
      ),
    );
  }
}
```

### SfRangeSelector Semantic Label

```dart
Semantics(
  label: 'Time range selector',
  value: 'Selecting data from ${_startDate.year} to ${_endDate.year}',
  hint: 'Drag thumbs to select time range',
  child: SfRangeSelector(
    min: DateTime(2020, 01, 01),
    max: DateTime(2025, 01, 01),
    initialValues: SfRangeValues(_startDate, _endDate),
    dateFormat: DateFormat.y(),
    dateIntervalType: DateIntervalType.years,
    enableTooltip: true,
    child: Container(
      height: 130,
      child: SfCartesianChart(/* chart */),
    ),
  ),
)
```

### Custom Semantic Properties

```dart
Semantics(
  label: 'Brightness control',
  value: '${_brightness.toInt()} percent',
  hint: 'Swipe left to decrease, right to increase',
  increasedValue: '${(_brightness + 10).toInt()} percent',
  decreasedValue: '${(_brightness - 10).toInt()} percent',
  onIncrease: () {
    setState(() {
      _brightness = (_brightness + 10).clamp(0, 100);
    });
  },
  onDecrease: () {
    setState(() {
      _brightness = (_brightness - 10).clamp(0, 100);
    });
  },
  child: SfSlider(
    min: 0.0,
    max: 100.0,
    value: _brightness,
    onChanged: (dynamic newValue) {
      setState(() {
        _brightness = newValue;
      });
    },
  ),
)
```

## Enabled and Disabled States

Control whether users can interact with sliders.

### Disable SfSlider

Set `onChanged` to `null` to disable:

```dart
class DisableableSlider extends StatefulWidget {
  @override
  _DisableableSliderState createState() => _DisableableSliderState();
}

class _DisableableSliderState extends State<DisableableSlider> {
  double _value = 50.0;
  bool _isEnabled = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          interval: 20,
          showLabels: true,
          showTicks: true,
          enableTooltip: true,
          onChanged: _isEnabled
              ? (dynamic newValue) {
                  setState(() {
                    _value = newValue;
                  });
                }
              : null,  // null = disabled
        ),
        SwitchListTile(
          title: Text('Enable Slider'),
          value: _isEnabled,
          onChanged: (bool value) {
            setState(() {
              _isEnabled = value;
            });
          },
        ),
      ],
    );
  }
}
```

**Visual Effect**: Disabled slider appears grayed out, thumbs can't be dragged.

### Disable SfRangeSlider

```dart
class DisableableRangeSlider extends StatefulWidget {
  @override
  _DisableableRangeSliderState createState() => _DisableableRangeSliderState();
}

class _DisableableRangeSliderState extends State<DisableableRangeSlider> {
  SfRangeValues _values = SfRangeValues(20.0, 80.0);
  bool _isEnabled = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(_isEnabled ? 'Enabled' : 'Disabled',
          style: TextStyle(fontWeight: FontWeight.bold)),
        SfRangeSlider(
          min: 0.0,
          max: 100.0,
          values: _values,
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          onChanged: _isEnabled
              ? (SfRangeValues newValues) {
                  setState(() {
                    _values = newValues;
                  });
                }
              : null,  // Disabled
        ),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _isEnabled = !_isEnabled;
            });
          },
          child: Text(_isEnabled ? 'Disable' : 'Enable'),
        ),
      ],
    );
  }
}
```

### Conditionally Disable

```dart
class ConditionalDisable extends StatefulWidget {
  @override
  _ConditionalDisableState createState() => _ConditionalDisableState();
}

class _ConditionalDisableState extends State<ConditionalDisable> {
  double _value = 50.0;
  bool _allowAdjustment = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CheckboxListTile(
          title: Text('Allow manual adjustment'),
          value: _allowAdjustment,
          onChanged: (bool? value) {
            setState(() {
              _allowAdjustment = value ?? false;
            });
          },
        ),
        SfSlider(
          min: 0.0,
          max: 100.0,
          value: _value,
          interval: 20,
          showLabels: true,
          enableTooltip: true,
          onChanged: _allowAdjustment
              ? (dynamic newValue) {
                  setState(() {
                    _value = newValue;
                  });
                }
              : null,  // Disabled unless checkbox checked
        ),
        Text('Value: ${_value.toInt()}'),
      ],
    );
  }
}
```

### Disabled State with Custom Styling

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    disabledActiveTrackColor: Colors.grey.withOpacity(0.3),
    disabledInactiveTrackColor: Colors.grey.withOpacity(0.1),
    disabledThumbColor: Colors.grey,
  ),
  child: SfSlider(
    min: 0.0,
    max: 100.0,
    value: _value,
    onChanged: null,  // Disabled
  ),
)
```

## Keyboard Navigation

Sliders support keyboard navigation automatically when focused.

### Supported Keys

| Key | Action |
|-----|--------|
| **Arrow Right / Up** | Increase value |
| **Arrow Left / Down** | Decrease value |
| **Page Up** | Increase by larger step |
| **Page Down** | Decrease by larger step |
| **Home** | Jump to minimum |
| **End** | Jump to maximum |
| **Tab** | Move focus to next widget |

### Enable Focus

```dart
class KeyboardNavigableSlider extends StatefulWidget {
  @override
  _KeyboardNavigableSliderState createState() => _KeyboardNavigableSliderState();
}

class _KeyboardNavigableSliderState extends State<KeyboardNavigableSlider> {
  double _value = 50.0;
  final FocusNode _focusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Value: ${_value.toInt()}'),
        Text('Click slider or press Tab to focus, then use arrow keys'),
        Focus(
          focusNode: _focusNode,
          child: SfSlider(
            min: 0.0,
            max: 100.0,
            value: _value,
            interval: 10,
            showLabels: true,
            showTicks: true,
            enableTooltip: true,
            onChanged: (dynamic newValue) {
              setState(() {
                _value = newValue;
              });
            },
          ),
        ),
        ElevatedButton(
          onPressed: () {
            _focusNode.requestFocus();
          },
          child: Text('Focus Slider'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }
}
```

### Customize Keyboard Step

Keyboard navigation uses the `interval` property:

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  interval: 5,  // Arrow keys move by 5
  onChanged: (dynamic value) {
    setState(() {
      _value = value;
    });
  },
)
```

- **Arrow keys**: Move by `interval` (5 in this case)
- **Page Up/Down**: Typically 10x `interval`
- **Home/End**: Jump to min/max

## Screen Reader Support

Screen readers automatically announce slider values.

### Built-in Announcements

When using screen readers (VoiceOver on iOS, TalkBack on Android):

```dart
SfSlider(
  min: 0.0,
  max: 100.0,
  value: _value,
  enableTooltip: true,
  onChanged: (dynamic newValue) {
    setState(() {
      _value = newValue;
    });
  },
)
```

**Announces**: 
- "Slider, 50" (current value)
- "Adjustable" (indicates interactivity)
- When dragging: "60", "70", etc.

### Enhanced Announcements with Semantics

```dart
class ScreenReaderFriendlySlider extends StatefulWidget {
  @override
  _ScreenReaderFriendlySliderState createState() => _ScreenReaderFriendlySliderState();
}

class _ScreenReaderFriendlySliderState extends State<ScreenReaderFriendlySlider> {
  double _temperature = 22.0;

  String _getTemperatureDescription() {
    if (_temperature < 18) return 'Cold';
    if (_temperature < 24) return 'Comfortable';
    return 'Warm';
  }

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Temperature control',
      value: '${_temperature.toInt()} degrees Celsius, ${_getTemperatureDescription()}',
      hint: 'Use arrow keys or drag to adjust temperature',
      child: SfSlider(
        min: 16.0,
        max: 30.0,
        value: _temperature,
        interval: 2,
        showLabels: true,
        showTicks: true,
        enableTooltip: true,
        numberFormat: NumberFormat('#°'),
        onChanged: (dynamic newValue) {
          setState(() {
            _temperature = newValue;
          });
        },
      ),
    );
  }
}
```

**Announces**: "Temperature control, 22 degrees Celsius, Comfortable, Use arrow keys or drag to adjust temperature"

### Announce Value Changes

```dart
class AnnouncingSlider extends StatefulWidget {
  @override
  _AnnouncingSliderState createState() => _AnnouncingSliderState();
}

class _AnnouncingSliderState extends State<AnnouncingSlider> {
  double _value = 50.0;

  @override
  Widget build(BuildContext context) {
    return SfSlider(
      min: 0.0,
      max: 100.0,
      value: _value,
      interval: 10,
      showLabels: true,
      enableTooltip: true,
      onChanged: (dynamic newValue) {
        setState(() {
          _value = newValue;
        });
      },
      onChangeEnd: (dynamic finalValue) {
        // Announce final value
        SemanticsService.announce(
          'Volume set to ${finalValue.toInt()} percent',
          TextDirection.ltr,
        );
      },
    );
  }
}
```

## RTL (Right-to-Left) Support

Sliders automatically mirror for RTL languages (Arabic, Hebrew, etc.).

### Automatic RTL Detection

Flutter detects RTL from `Directionality` widget or `MaterialApp`'s `locale`:

```dart
MaterialApp(
  locale: Locale('ar', 'SA'),  // Arabic
  home: Scaffold(
    body: SfSlider(
      min: 0.0,
      max: 100.0,
      value: _value,
      onChanged: (dynamic value) {
        setState(() {
          _value = value;
        });
      },
    ),
  ),
)
```

**Effect**: Slider renders right-to-left (min on right, max on left).

### Force RTL for Testing

```dart
class RTLSliderExample extends StatefulWidget {
  @override
  _RTLSliderExampleState createState() => _RTLSliderExampleState();
}

class _RTLSliderExampleState extends State<RTLSliderExample> {
  double _value = 50.0;

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,  // Force RTL
      child: Column(
        children: [
          Text('قيمة: ${_value.toInt()}'),  // "Value:" in Arabic
          SfSlider(
            min: 0.0,
            max: 100.0,
            value: _value,
            interval: 20,
            showLabels: true,
            showTicks: true,
            enableTooltip: true,
            onChanged: (dynamic newValue) {
              setState(() {
                _value = newValue;
              });
            },
          ),
        ],
      ),
    );
  }
}
```

### RTL with Date Range

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfRangeSlider(
    min: DateTime(2024, 01, 01),
    max: DateTime(2024, 12, 31),
    values: _dateValues,
    dateFormat: DateFormat.yMMMd('ar'),  // Arabic date format
    dateIntervalType: DateIntervalType.months,
    interval: 3,
    showLabels: true,
    enableTooltip: true,
    onChanged: (SfRangeValues values) {
      setState(() {
        _dateValues = values;
      });
    },
  ),
)
```

### LTR and RTL Comparison

```dart
class DirectionalityComparison extends StatefulWidget {
  @override
  _DirectionalityComparisonState createState() => _DirectionalityComparisonState();
}

class _DirectionalityComparisonState extends State<DirectionalityComparison> {
  double _value = 50.0;

  Widget _buildSlider(TextDirection direction) {
    return Directionality(
      textDirection: direction,
      child: SfSlider(
        min: 0.0,
        max: 100.0,
        value: _value,
        interval: 25,
        showLabels: true,
        showTicks: true,
        enableTooltip: true,
        onChanged: (dynamic newValue) {
          setState(() {
            _value = newValue;
          });
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Left-to-Right (LTR)'),
        _buildSlider(TextDirection.ltr),
        SizedBox(height: 40),
        Text('Right-to-Left (RTL)'),
        _buildSlider(TextDirection.rtl),
      ],
    );
  }
}
```

## Best Practices

### Accessibility Checklist

✅ **Provide semantic labels**: Describe the slider's purpose  
✅ **Use meaningful value descriptions**: Not just numbers  
✅ **Include hints**: Explain how to interact  
✅ **Support keyboard navigation**: Test with Tab and arrow keys  
✅ **Test with screen readers**: VoiceOver (iOS), TalkBack (Android)  
✅ **Support RTL languages**: Test with Arabic or Hebrew locales  
✅ **Use sufficient color contrast**: Visible to users with low vision  
✅ **Ensure touch targets are large enough**: Minimum 48x48 logical pixels  
✅ **Provide feedback**: Tooltips, announcements for value changes  
✅ **Disable properly**: Use `onChanged: null`, not visual hacks  

### Color Contrast

Ensure track, thumbs, and labels have sufficient contrast:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    // Active color: high contrast with background
    activeTrackColor: Colors.blue[700],
    thumbColor: Colors.blue[700],
    
    // Inactive color: still visible
    inactiveTrackColor: Colors.grey[400],
    
    // Labels: dark text on light background
    labelOffset: Offset(0, 10),
  ),
  child: SfSlider(
    min: 0.0,
    max: 100.0,
    value: _value,
    showLabels: true,
    onChanged: (dynamic value) {
      setState(() {
        _value = value;
      });
    },
  ),
)
```

**Test**: Use a color contrast checker (WCAG AA: 4.5:1, AAA: 7:1).

### Touch Target Size

Ensure thumbs are large enough to tap easily:

```dart
SfSliderTheme(
  data: SfSliderThemeData(
    thumbRadius: 12,  // Minimum 12 for 48x48 touch target
    overlayRadius: 24,
  ),
  child: SfSlider(
    value: _value,
    onChanged: (dynamic value) {
      setState(() {
        _value = value;
      });
    },
  ),
)
```

**Guideline**: Touch target should be at least 48x48 logical pixels.

### Complete Accessible Slider

```dart
class FullyAccessibleSlider extends StatefulWidget {
  @override
  _FullyAccessibleSliderState createState() => _FullyAccessibleSliderState();
}

class _FullyAccessibleSliderState extends State<FullyAccessibleSlider> {
  double _volume = 50.0;
  bool _isMuted = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Semantics(
          label: 'Volume control',
          value: _isMuted ? 'Muted' : '${_volume.toInt()} percent',
          hint: 'Adjust audio volume. Use arrow keys or drag to change.',
          excludeSemantics: true,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Icon(Icons.volume_up),
                  SizedBox(width: 10),
                  Text(
                    'Volume: ${_isMuted ? "Muted" : "${_volume.toInt()}%"}',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              SizedBox(height: 10),
              SfSliderTheme(
                data: SfSliderThemeData(
                  thumbRadius: 14,  // Large enough touch target
                  overlayRadius: 28,
                  activeTrackColor: Colors.blue[700],  // Good contrast
                  inactiveTrackColor: Colors.grey[400],
                  thumbColor: Colors.blue[700],
                ),
                child: SfSlider(
                  min: 0.0,
                  max: 100.0,
                  value: _volume,
                  interval: 25,
                  showLabels: true,
                  showTicks: true,
                  enableTooltip: true,
                  onChanged: _isMuted
                      ? null  // Disabled when muted
                      : (dynamic newValue) {
                          setState(() {
                            _volume = newValue;
                          });
                        },
                  onChangeEnd: (dynamic finalValue) {
                    // Announce final value
                    SemanticsService.announce(
                      'Volume set to ${finalValue.toInt()} percent',
                      TextDirection.ltr,
                    );
                  },
                ),
              ),
            ],
          ),
        ),
        CheckboxListTile(
          title: Text('Mute'),
          value: _isMuted,
          onChanged: (bool? value) {
            setState(() {
              _isMuted = value ?? false;
            });
            SemanticsService.announce(
              _isMuted ? 'Volume muted' : 'Volume unmuted',
              TextDirection.ltr,
            );
          },
        ),
      ],
    );
  }
}
```

## Testing Accessibility

### iOS (VoiceOver)
1. Settings → Accessibility → VoiceOver → On
2. Double-tap to activate slider
3. Swipe up/down to adjust value
4. Listen for value announcements

### Android (TalkBack)
1. Settings → Accessibility → TalkBack → On
2. Double-tap to activate slider
3. Swipe left/right to adjust value
4. Listen for value announcements

### Keyboard
1. Press Tab to focus slider
2. Use Arrow Left/Right to adjust
3. Press Home/End to jump to min/max
4. Verify tooltip appears

### RTL Testing
```dart
void main() {
  runApp(MaterialApp(
    locale: Locale('ar', 'SA'),  // Test with Arabic
    home: MySliderWidget(),
  ));
}
```

## Summary

| Feature | Implementation |
|---------|----------------|
| **Semantic label** | Wrap in `Semantics` widget |
| **Disable slider** | Set `onChanged: null` |
| **Keyboard navigation** | Built-in, works automatically |
| **Screen reader** | Use `Semantics` + `SemanticsService` |
| **RTL support** | Automatic via `Directionality` |
| **Touch targets** | `thumbRadius: 12` minimum |
| **Color contrast** | Test with WCAG guidelines |
| **Announcements** | `SemanticsService.announce()` |
