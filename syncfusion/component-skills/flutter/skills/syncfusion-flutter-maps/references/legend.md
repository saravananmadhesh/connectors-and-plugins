# Legend in Flutter Maps

Legends provide clear information about the data plotted on the map, helping users interpret color-coded regions and bubbles.

## Table of Contents
- [Overview](#overview)
- [Shape Legend](#shape-legend)
- [Bubble Legend](#bubble-legend)
- [Legend Positioning](#legend-positioning)
- [Legend Customization](#legend-customization)
- [Bar Legend](#bar-legend)
- [Legend Toggling](#legend-toggling)

## Overview

Legends explain what colors, sizes, or symbols mean on your map. Essential for choropleth maps and bubble visualizations.

## Shape Legend

Show shape legend using `MapLegend(MapElement.shape)`:

```dart
late MapShapeSource _dataSource;

@override
void initState() {
  super.initState();
  
  _dataSource = MapShapeSource.asset(
    'assets/world_map.json',
    shapeDataField: 'continent',
  );
}

@override
Widget build(BuildContext context) {
  return SfMaps(
    layers: [
      MapShapeLayer(
        source: _dataSource,
        legend: MapLegend(MapElement.shape),
      ),
    ],
  );
}
```

### With Color Mapping

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'name',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].country,
  shapeColorValueMapper: (index) => _data[index].value,
  shapeColorMappers: [
    MapColorMapper(from: 0, to: 50, color: Colors.red, text: 'Low'),
    MapColorMapper(from: 51, to: 100, color: Colors.green, text: 'High'),
  ],
);

MapShapeLayer(
  source: _dataSource,
  legend: MapLegend(MapElement.shape),
)
```

## Bubble Legend

Show bubble legend using `MapLegend(MapElement.bubble)`:

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'continent',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].continent,
  bubbleSizeMapper: (index) => _data[index].population,
);

MapShapeLayer(
  source: _dataSource,
  legend: MapLegend(MapElement.bubble),
)
```

## Legend Positioning

Control legend placement using `position`:

```dart
MapLegend(
  MapElement.shape,
  position: MapLegendPosition.bottom,  // or top, left, right
)
```

**Available Positions:**
- `MapLegendPosition.top`
- `MapLegendPosition.bottom` (default)
- `MapLegendPosition.left`
- `MapLegendPosition.right`

### Example: Right-Side Legend

```dart
MapShapeLayer(
  source: _dataSource,
  legend: MapLegend(
    MapElement.shape,
    position: MapLegendPosition.right,
  ),
)
```

## Legend Customization

### Text Style

```dart
MapLegend(
  MapElement.shape,
  textStyle: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.bold,
    color: Colors.black87,
  ),
)
```

### Icon Customization

```dart
MapLegend(
  MapElement.shape,
  iconType: MapIconType.circle,  // or diamond, triangle, rectangle
  iconSize: Size(12, 12),
)
```

### Spacing and Padding

```dart
MapLegend(
  MapElement.shape,
  padding: EdgeInsets.all(10),
  spacing: 8.0,  // Space between legend items
)
```

### Complete Customization Example

```dart
MapShapeLayer(
  source: _dataSource,
  legend: MapLegend(
    MapElement.shape,
    position: MapLegendPosition.bottom,
    offset: Offset(0, 10),
    spacing: 10.0,
    direction: Axis.horizontal,
    textStyle: TextStyle(fontSize: 11, color: Colors.black87),
    iconType: MapIconType.circle,
    iconSize: Size(10, 10),
    padding: EdgeInsets.all(15),
  ),
)
```

## Bar Legend

Use bar legend for continuous data ranges:

```dart
MapLegend.bar(
  MapElement.shape,
  position: MapLegendPosition.bottom,
  labelsPlacement: MapLegendLabelsPlacement.betweenItems,
  edgeLabelsPlacement: MapLegendEdgeLabelsPlacement.inside,
)
```

### Bar Legend Properties

```dart
MapLegend.bar(
  MapElement.shape,
  position: MapLegendPosition.top,
  spacing: 2.0,
  segmentSize: Size(50, 12),
  labelsPlacement: MapLegendLabelsPlacement.onItem,
  edgeLabelsPlacement: MapLegendEdgeLabelsPlacement.inside,
  labelOverflow: MapLabelOverflow.hide,
  textStyle: TextStyle(fontSize: 10),
)
```

## Legend Toggling

Enable legend toggle to show/hide map elements:

```dart
MapLegend(
  MapElement.shape,
  enableToggleInteraction: true,  // Enable toggle
  onToggle: (int index, bool isToggled) {
    print('Legend item $index toggled: $isToggled');
  },
)
```

### Complete Toggle Example

```dart
class ToggleableLegendMap extends StatefulWidget {
  @override
  _ToggleableLegendMapState createState() => _ToggleableLegendMapState();
}

class _ToggleableLegendMapState extends State<ToggleableLegendMap> {
  late MapShapeSource _dataSource;
  late List<bool> _toggledIndices;
  
  @override
  void initState() {
    super.initState();
    _toggledIndices = List.filled(6, true);  // All enabled initially
    
    _dataSource = MapShapeSource.asset(
      'assets/world_map.json',
      shapeDataField: 'continent',
      dataCount: _continents.length,
      primaryValueMapper: (index) => _continents[index].name,
      shapeColorValueMapper: (index) => _continents[index].color,
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return SfMaps(
      layers: [
        MapShapeLayer(
          source: _dataSource,
          legend: MapLegend(
            MapElement.shape,
            enableToggleInteraction: true,
            onToggle: (index, isToggled) {
              setState(() {
                _toggledIndices[index] = isToggled;
              });
            },
          ),
        ),
      ],
    );
  }
}
```

## Common Patterns

### Pattern 1: Choropleth with Legend

```dart
MapShapeLayer(
  source: _dataSource,
  legend: MapLegend(
    MapElement.shape,
    position: MapLegendPosition.bottom,
    overflowMode: MapLegendOverflowMode.wrap,
    direction: Axis.horizontal,
    spacing: 8.0,
  ),
  shapeColorMappers: [
    MapColorMapper(from: 0, to: 25, color: Colors.red[200]!, text: '0-25'),
    MapColorMapper(from: 26, to: 50, color: Colors.orange[200]!, text: '26-50'),
    MapColorMapper(from: 51, to: 75, color: Colors.yellow[200]!, text: '51-75'),
    MapColorMapper(from: 76, to: 100, color: Colors.green[200]!, text: '76-100'),
  ],
)
```

### Pattern 2: Bubble Map with Legend

```dart
MapShapeLayer(
  source: _dataSource,
  legend: MapLegend.bar(
    MapElement.bubble,
    position: MapLegendPosition.top,
    segmentSize: Size(60, 10),
  ),
  bubbleSettings: MapBubbleSettings(
    maxRadius: 50,
    minRadius: 10,
  ),
)
```

## Best Practices

1. **Position appropriately** - Bottom or right for most layouts
2. **Keep text concise** - Use short, clear labels
3. **Match map colors** - Ensure legend colors match map exactly
4. **Enable toggle for complex maps** - Help users focus on specific data
5. **Use bar legend for continuous data** - Better than discrete items

## Troubleshooting

### Issue: Legend Not Showing

**Check:**
1. `legend` property is set
2. Color mappers are configured (if using color mapping)
3. Legend position doesn't place it off-screen

### Issue: Legend Items Wrong

**Check:**
1. `shapeColorMappers` text property
2. Color mapper ranges match data
3. `primaryValueMapper` returns correct values

### Issue: Legend Overlapping Map

**Solutions:**
- Change `position`
- Adjust `offset`
- Use `overflowMode: MapLegendOverflowMode.scroll`
