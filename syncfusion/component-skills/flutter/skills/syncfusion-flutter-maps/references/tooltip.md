# Tooltips in Flutter Maps

Tooltips display additional information when users interact with shapes, bubbles, or markers. Essential for providing context in data-rich maps.

## Shape Tooltips

Show tooltips for shapes using `shapeTooltipBuilder`:

```dart
MapShapeLayer(
  source: _dataSource,
  shapeTooltipBuilder: (BuildContext context, int index) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: Text(
        _data[index].info,
        style: TextStyle(color: Colors.white),
      ),
    );
  },
  tooltipSettings: MapTooltipSettings(
    color: Colors.grey[800],
    strokeColor: Colors.white,
    strokeWidth: 2,
  ),
)
```

## Bubble Tooltips

Show tooltips for bubbles using `bubbleTooltipBuilder`:

```dart
MapShapeLayer(
  source: _dataSource,
  bubbleTooltipBuilder: (BuildContext context, int index) {
    return Container(
      padding: EdgeInsets.all(10),
      child: Text(
        'Population: ${_data[index].population}M',
        style: TextStyle(color: Colors.white),
      ),
    );
  },
)
```

## Marker Tooltips

Show tooltips for markers using `markerTooltipBuilder`:

```dart
MapShapeLayer(
  source: _dataSource,
  markerTooltipBuilder: (BuildContext context, int index) {
    return Container(
      padding: EdgeInsets.all(8),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(_markers[index].name, style: TextStyle(fontWeight: FontWeight.bold)),
          Text(_markers[index].description),
        ],
      ),
    );
  },
)
```

## Tooltip Styling

Customize tooltip appearance with `tooltipSettings`:

```dart
MapShapeLayer(
  source: _dataSource,
  shapeTooltipBuilder: (context, index) => _buildTooltip(index),
  tooltipSettings: MapTooltipSettings(
    color: Colors.blue[900],
    strokeColor: Colors.blue[200],
    strokeWidth: 2,
  ),
)
```

## Best Practices

1. Keep tooltips concise
2. Use high contrast colors
3. Show relevant data only
4. Test on mobile (touch) and web (hover)
