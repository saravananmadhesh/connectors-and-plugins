# Customization and Theming

Comprehensive guide to customizing the visual appearance of Flutter Maps using themes, styles, and SfMapsTheme.

## SfMapsTheme Integration

Use SfMapsTheme for comprehensive styling:

```dart
import 'package:syncfusion_flutter_core/theme.dart';

SfMapsTheme(
  data: SfMapsThemeData(
    layerColor: Colors.grey[200],
    layerStrokeColor: Colors.grey[400],
    layerStrokeWidth: 1,
    shapeHoverColor: Colors.blue[100],
    shapeHoverStrokeColor: Colors.blue,
    shapeHoverStrokeWidth: 2,
    dataLabelTextStyle: TextStyle(fontSize: 10, color: Colors.black87),
  ),
  child: SfMaps(
    layers: [
      MapShapeLayer(source: _dataSource),
    ],
  ),
)
```

## Shape Styling

Direct shape customization:

```dart
MapShapeLayer(
  source: _dataSource,
  color: Colors.lightBlue[50],
  strokeColor: Colors.blue[700],
  strokeWidth: 0.5,
)
```

## Hover Effects (Web)

Customize hover appearance for web:

```dart
SfMapsThemeData(
  shapeHoverColor: Colors.orange[200],
  shapeHoverStrokeColor: Colors.orange[900],
  shapeHoverStrokeWidth: 3,
)
```

## Selection Styling

```dart
MapShapeLayer(
  source: _dataSource,
  selectionSettings: MapSelectionSettings(
    color: Colors.yellow.withOpacity(0.5),
    strokeColor: Colors.orange,
    strokeWidth: 3,
  ),
)
```

## Responsive Design

Adapt to different screen sizes:

```dart
Widget build(BuildContext context) {
  final size = MediaQuery.of(context).size;
  final isLargeScreen = size.width > 600;
  
  return SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        showDataLabels: isLargeScreen,  // Hide labels on small screens
        dataLabelSettings: MapDataLabelSettings(
          textStyle: TextStyle(
            fontSize: isLargeScreen ? 12 : 8,
          ),
        ),
      ),
    ],
  );
}
```

## Best Practices

1. **Use SfMapsTheme** for global styling
2. **Test on different devices** - Mobile, tablet, desktop
3. **Consider dark mode** - Provide theme variants
4. **Maintain contrast** - Ensure readability
5. **Optimize for platform** - Web hover vs mobile touch
