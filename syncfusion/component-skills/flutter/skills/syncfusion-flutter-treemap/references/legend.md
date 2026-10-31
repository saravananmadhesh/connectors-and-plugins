# Legend in Flutter TreeMap

Add legends to provide clarity about data displayed in your treemap.

## Overview

Legends display information about tiles and their grouping. Legend text is based on `TreemapLevel.groupMapper` values or color mapper names.

## Basic Usage

```dart
// Default legend
SfTreemap(
  legend: TreemapLegend(),
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)

// Bar legend (for continuous ranges)
SfTreemap(
  legend: TreemapLegend.bar(),
  colorMappers: [...],
)
```

## Complete Example

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].sales,
  colorMappers: [
    TreemapColorMapper.range(from: 0, to: 300000, color: Colors.green, name: 'Low'),
    TreemapColorMapper.range(from: 300000, to: 600000, color: Colors.yellow, name: 'Medium'),
    TreemapColorMapper.range(from: 600000, to: 1000000, color: Colors.red, name: 'High'),
  ],
  legend: TreemapLegend.bar(
    position: TreemapLegendPosition.bottom,
  ),
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].region,
      colorValueMapper: (TreemapTile tile) => tile.weight,
    ),
  ],
)
```

## Positioning

```dart
// Position options: top (default), bottom, left, right
legend: TreemapLegend(
  position: TreemapLegendPosition.bottom,
)

// Custom offset (absolute positioning)
legend: TreemapLegend(
  offset: Offset(70, 250),
)
```

## Appearance

```dart
legend: TreemapLegend(
  iconType: TreemapIconType.circle, // circle, rectangle, triangle, diamond
  iconSize: Size(12, 12),
  textStyle: TextStyle(fontSize: 14),
  spacing: 12.0,
  padding: EdgeInsets.all(16),
  direction: Axis.horizontal, // or vertical
  title: Text('Legend Title'),
)
```

## Legend Text

Legend text comes from `TreemapLevel.groupMapper` or color mapper `name` property:

```dart
// From groupMapper
levels: [
  TreemapLevel(
    groupMapper: (int index) => _data[index].region, // "North", "South", etc.
  ),
]

// Override with color mapper names
colorMappers: [
  TreemapColorMapper.range(from: 0, to: 100, color: Colors.green, name: 'Low'),
]
```

## Bar Legend Customization

```dart
legend: TreemapLegend.bar(
  // Painting style
  segmentPaintingStyle: TreemapLegendPaintingStyle.solid, // or gradient
  
  // Label placement
  labelsPlacement: TreemapLegendLabelsPlacement.betweenItems, // or onItem
  edgeLabelsPlacement: TreemapLegendEdgeLabelsPlacement.inside, // or center
  
  // Appearance
  segmentSize: Size(80, 12),
  labelOverflow: TreemapLabelOverflow.visible, // ellipsis, hide
  
  // Custom segment labels (first segment)
  // Use {start},{end} in name property
)

// Example: Custom first segment labels
colorMappers: [
  TreemapColorMapper.range(
    from: 0, to: 10,
    color: Colors.blue,
    name: '{0M},{10M}', // Custom start and end
  ),
]
```

## Overflow Handling

```dart
// Default legend: wrap (default) or scroll
legend: TreemapLegend(
  overflowMode: TreemapLegendOverflowMode.scroll,
  shouldAlwaysShowScrollbar: true,
)

// Bar legend: scroll (default) or wrap
legend: TreemapLegend.bar(
  overflowMode: TreemapLegendOverflowMode.scroll,
)
```

## Pointer on Hover

```dart
legend: TreemapLegend.bar(
  showPointerOnHover: true,
  pointerSize: Size(20, 20),
  pointerColor: Colors.deepPurple,
  
  // Custom pointer
  pointerBuilder: (context, value) => Icon(Icons.arrow_downward, size: 15),
)
```
