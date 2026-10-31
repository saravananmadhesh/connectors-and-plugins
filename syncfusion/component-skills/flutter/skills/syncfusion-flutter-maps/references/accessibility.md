# Accessibility in Flutter Maps

Ensure your maps are accessible to all users, including those using screen readers and keyboard navigation.

## Screen Reader Support

Maps automatically provide semantic information for shapes:

```dart
MapShapeLayer(
  source: _dataSource,
  showDataLabels: true,  // Helps screen readers identify shapes
)
```

## Semantic Labels

Add custom semantic labels:

```dart
Semantics(
  label: 'Interactive world map showing population data',
  child: SfMaps(
    layers: [
      MapShapeLayer(source: _dataSource),
    ],
  ),
)
```

## Keyboard Navigation

Implement keyboard support for web/desktop:

```dart
Focus(
  onKey: (FocusNode node, RawKeyEvent event) {
    if (event is RawKeyDownEvent) {
      if (event.logicalKey == LogicalKeyboardKey.arrowUp) {
        // Zoom in
      } else if (event.logicalKey == LogicalKeyboardKey.arrowDown) {
        // Zoom out
      }
    }
    return KeyEventResult.handled;
  },
  child: SfMaps(
    layers: [MapShapeLayer(source: _dataSource)],
  ),
)
```

## Color Contrast

Ensure sufficient contrast:

```dart
// Good contrast
MapShapeLayer(
  source: _dataSource,
  color: Colors.blue[100],
  strokeColor: Colors.blue[900],  // High contrast
  dataLabelSettings: MapDataLabelSettings(
    textStyle: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
  ),
)
```

## WCAG Compliance

- Provide text alternatives for visual content
- Ensure color isn't the only way to convey information
- Make interactive elements keyboard accessible
- Provide sufficient color contrast (4.5:1 minimum)

## Best Practices

1. **Always show data labels** - Helps all users
2. **Use patterns + colors** - Don't rely on color alone
3. **Provide tooltips** - Additional context for screen readers
4. **Test with screen readers** - Verify accessibility
5. **Enable keyboard navigation** - Essential for desktop users
