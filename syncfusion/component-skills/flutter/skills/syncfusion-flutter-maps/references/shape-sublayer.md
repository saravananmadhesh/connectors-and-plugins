# Shape Sublayers in Flutter Maps

Sublayers allow you to add additional shape layers on top of the main map layer, enabling hierarchical data visualization and detailed regional overlays.

## Overview

Sublayers provide:
- Multiple shape layers on one map
- Hierarchical data visualization
- Drill-down capabilities
- Regional detail overlays
- Independent styling per layer

## Basic Sublayer

Add sublayer to MapShapeLayer:

```dart
MapShapeLayer(
  source: _mainDataSource,
  sublayers: [
    MapShapeSublayer(
      source: MapShapeSource.asset(
        'assets/texas_counties.json',
        shapeDataField: 'name',
      ),
      color: Colors.blue.withOpacity(0.5),
      strokeColor: Colors.blue,
      strokeWidth: 1,
    ),
  ],
)
```

## Multiple Sublayers

Stack multiple sublayers:

```dart
MapShapeLayer(
  source: _worldDataSource,
  sublayers: [
    MapShapeSublayer(
      source: _usStatesDataSource,
      color: Colors.blue[200],
    ),
    MapShapeSublayer(
      source: _californiaCountiesDataSource,
      color: Colors.green[200],
    ),
  ],
)
```

## Sublayer with Data

```dart
MapShapeSublayer(
  source: MapShapeSource.asset(
    'assets/india_states.json',
    shapeDataField: 'name',
    dataCount: _stateData.length,
    primaryValueMapper: (index) => _stateData[index].name,
    shapeColorValueMapper: (index) => _stateData[index].value,
  ),
  showDataLabels: true,
  legend: MapLegend(MapElement.shape),
)
```

## Common Use Cases

### Country with State Detail

```dart
// World map with USA states overlay
MapShapeLayer(
  source: MapShapeSource.asset('assets/world.json', shapeDataField: 'name'),
  sublayers: [
    MapShapeSublayer(
      source: MapShapeSource.asset('assets/usa_states.json', shapeDataField: 'name'),
      color: Colors.blue[100],
      strokeWidth: 1.5,
    ),
  ],
)
```

### Drill-Down Maps

Show detailed regions on demand:

```dart
MapShapeLayer(
  source: _countryDataSource,
  sublayers: _showStates ? [
    MapShapeSublayer(
      source: _statesDataSource,
    ),
  ] : [],
)
```

## Best Practices

1. **Layer hierarchy** - Main map → Regions → Sub-regions
2. **Distinct styling** - Make sublayers visually distinguishable
3. **Performance** - Limit sublayer complexity
4. **User control** - Allow toggling sublayer visibility
