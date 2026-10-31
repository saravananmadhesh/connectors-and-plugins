# Accessibility Features

Both SfCalendar and SfDateRangePicker are built with accessibility in mind, supporting screen readers, keyboard navigation, and WCAG compliance.

## Screen Reader Support

Both components automatically provide semantic labels for screen readers:

- **Date announcements** - Each date is announced with full context
- **Selection feedback** - Selection changes are announced
- **Navigation cues** - Month/year changes are announced
- **Appointment details** - Calendar appointments are read aloud

## Semantic Labels

Components use proper semantic labels automatically:

```dart
// Automatic semantic labels for all dates
SfCalendar(view: CalendarView.month) // "March 2026, Monday 20"

SfDateRangePicker() // "Select date, March 20, 2026"
```

## Keyboard Navigation

Users can navigate using keyboard:

- **Arrow keys** - Navigate between dates
- **Enter/Space** - Select date
- **Tab** - Move between UI elements
- **Escape** - Close picker/cancel selection

## Color Contrast

Ensure sufficient color contrast for visually impaired users:

```dart
SfCalendar(
  todayHighlightColor: Colors.blue[700], // High contrast
  cellBorderColor: Colors.grey[400], // Visible borders
  monthViewSettings: MonthViewSettings(
    monthCellStyle: MonthCellStyle(
      textStyle: TextStyle(
        color: Colors.black87, // High contrast text
        fontSize: 16, // Readable size
      ),
    ),
  ),
)
```

## Focus Indicators

Selection decoration provides clear focus indicators:

```dart
SfCalendar(
  selectionDecoration: BoxDecoration(
    border: Border.all(color: Colors.blue, width: 3), // Clear focus ring
    borderRadius: BorderRadius.circular(4),
  ),
)
```

## Best Practices

1. **Use high contrast colors** for selections and highlights
2. **Maintain minimum text size** of 14-16px
3. **Provide clear visual feedback** for interactions
4. **Test with screen readers** (TalkBack on Android, VoiceOver on iOS)
5. **Ensure touch targets** are at least 44x44 pixels

## WCAG Compliance

Components follow WCAG 2.1 Level AA guidelines:
- ✅ Perceivable - High contrast, clear labels
- ✅ Operable - Keyboard navigation, touch targets
- ✅ Understandable - Consistent behavior, clear feedback
- ✅ Robust - Works with assistive technologies

## Next Steps

- **Customization:** Read [customization.md](customization.md) for styling accessible components
