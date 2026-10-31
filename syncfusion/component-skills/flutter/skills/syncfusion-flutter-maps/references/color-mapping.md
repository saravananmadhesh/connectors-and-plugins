# Color Mapping in Flutter Maps

Color mapping applies colors to shapes based on data values, creating choropleth maps for visualizing statistical information geographically.

## Table of Contents
- [Overview](#overview)
- [Direct Color Mapping](#direct-color-mapping)
- [Equal Color Mapping](#equal-color-mapping)
- [Range Color Mapping](#range-color-mapping)
- [Opacity Settings](#opacity-settings)

## Overview

Two approaches for coloring shapes:
1. **Direct** - Return colors from `shapeColorValueMapper`
2. **Mapped** - Return values and use `shapeColorMappers` for color assignment

## Direct Color Mapping

Return colors directly:

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'continent',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].continent,
  shapeColorValueMapper: (index) => _data[index].color,  // Return Color
);
```

## Equal Color Mapping

Map specific values to colors:

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'name',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].country,
  shapeColorValueMapper: (index) => _data[index].category,  // Return String
  shapeColorMappers: [
    MapColorMapper(value: 'Low', color: Colors.red, text: 'Low Risk'),
    MapColorMapper(value: 'Medium', color: Colors.orange, text: 'Medium Risk'),
    MapColorMapper(value: 'High', color: Colors.green, text: 'High Growth'),
  ],
);
```

## Range Color Mapping

Map numeric ranges to colors:

```dart
_dataSource = MapShapeSource.asset(
  'assets/world_map.json',
  shapeDataField: 'name',
  dataCount: _data.length,
  primaryValueMapper: (index) => _data[index].country,
  shapeColorValueMapper: (index) => _data[index].gdp,  // Return number
  shapeColorMappers: [
    MapColorMapper(from: 0, to: 1000, color: Colors.red[200]!, text: '<1T'),
    MapColorMapper(from: 1001, to: 5000, color: Colors.yellow[200]!, text: '1-5T'),
    MapColorMapper(from: 5001, to: 20000, color: Colors.green[200]!, text: '>5T'),
  ],
);
```

## Opacity Settings

Control opacity for range mappers:

```dart
shapeColorMappers: [
  MapColorMapper(
    from: 0,
    to: 100,
    color: Colors.red,
    minOpacity: 0.2,
    maxOpacity: 0.8,
    text: '0-100',
  ),
]
```

Shapes with lower values get `minOpacity`, higher values get `maxOpacity`.

## Common Patterns

### Election Results

```dart
shapeColorMappers: [
  MapColorMapper(value: 'Party A', color: Colors.blue, text: 'Party A'),
  MapColorMapper(value: 'Party B', color: Colors.red, text: 'Party B'),
  MapColorMapper(value: 'Independent', color: Colors.grey, text: 'Independent'),
]
```

### Temperature Map

```dart
shapeColorMappers: [
  MapColorMapper(from: -20, to: 0, color: Colors.blue, text: 'Freezing'),
  MapColorMapper(from: 1, to: 15, color: Colors.green, text: 'Cool'),
  MapColorMapper(from: 16, to: 30, color: Colors.orange, text: 'Warm'),
  MapColorMapper(from: 31, to: 50, color: Colors.red, text: 'Hot'),
]
```

### Income Levels

```dart
shapeColorMappers: [
  MapColorMapper(from: 0, to: 30000, color: Colors.red[100]!),
  MapColorMapper(from: 30001, to: 60000, color: Colors.orange[100]!),
  MapColorMapper(from: 60001, to: 100000, color: Colors.green[100]!),
  MapColorMapper(from: 100001, to: 999999, color: Colors.blue[100]!),
]
```

## Best Practices

1. **Use 4-7 color categories** - Too many confuse users
2. **Choose intuitive colors** - Red/green for bad/good, temperature gradients
3. **Provide legend** - Always show legend with color mappings
4. **Test color blind accessibility** - Use patterns or vary brightness
5. **Match data type** - Equal for categories, range for continuous data
