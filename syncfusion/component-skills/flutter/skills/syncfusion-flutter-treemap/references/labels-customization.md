# Labels and Customization in Flutter TreeMap

## Table of Contents
- [Adding Labels](#adding-labels)
- [Label Builder](#label-builder)
- [TreemapTile Properties](#treemaptile-properties)
- [Label Positioning](#label-positioning)
- [Text Styling](#text-styling)
- [Overflow Handling](#overflow-handling)
- [Conditional Labels](#conditional-labels)
- [Common Patterns](#common-patterns)

## Adding Labels

Labels improve tile readability by displaying text or widgets directly on tiles. Add labels using the `labelBuilder` callback in `TreemapLevel`.

### Basic Label

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  labelBuilder: (BuildContext context, TreemapTile tile) {
    return Padding(
      padding: EdgeInsets.all(4),
      child: Text(tile.group),
    );
  },
)
```

## Label Builder

The `labelBuilder` callback receives:
- `BuildContext context` - Build context for the widget
- `TreemapTile tile` - Details about the current tile

Return any Flutter widget to display as the label.

### Complete Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class LabelExample extends StatefulWidget {
  @override
  _LabelExampleState createState() => _LabelExampleState();
}

class _LabelExampleState extends State<LabelExample> {
  late List<SalesData> _data;

  @override
  void initState() {
    _data = [
      SalesData(region: 'North America', sales: 850000),
      SalesData(region: 'Europe', sales: 620000),
      SalesData(region: 'Asia', sales: 980000),
      SalesData(region: 'South America', sales: 340000),
      SalesData(region: 'Africa', sales: 210000),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sales by Region')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].sales,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].region,
              color: Colors.blue[200],
              labelBuilder: (BuildContext context, TreemapTile tile) {
                return Padding(
                  padding: EdgeInsets.all(6),
                  child: Text(
                    tile.group,
                    style: TextStyle(
                      color: Colors.black87,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class SalesData {
  SalesData({required this.region, required this.sales});
  final String region;
  final double sales;
}
```

## TreemapTile Properties

The `TreemapTile` object provides information about the current tile:

| Property | Type | Description |
|----------|------|-------------|
| `group` | String | The group name from `groupMapper` |
| `weight` | double | The sum of weights for this tile |
| `indices` | List\<int\> | Data source indices for items in this tile |

### Accessing Tile Data

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  // Get the group name
  final category = tile.group;
  
  // Get the weight (sum of values)
  final total = tile.weight;
  
  // Access original data
  final firstIndex = tile.indices[0];
  final originalData = _data[firstIndex];
  
  return Text('$category: ${total.toStringAsFixed(0)}');
}
```

## Label Positioning

Use Flutter's layout widgets to position labels within tiles.

### Center Alignment

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Align(
    alignment: Alignment.center,
    child: Text(tile.group),
  );
}
```

### Top-Left

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Align(
    alignment: Alignment.topLeft,
    child: Padding(
      padding: EdgeInsets.all(8),
      child: Text(tile.group),
    ),
  );
}
```

### Bottom-Right

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Align(
    alignment: Alignment.bottomRight,
    child: Padding(
      padding: EdgeInsets.all(8),
      child: Text(tile.group),
    ),
  );
}
```

### Multi-Line Labels

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          tile.group,
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 4),
        Text(
          '\$${tile.weight.toStringAsFixed(0)}',
          style: TextStyle(fontSize: 12),
        ),
      ],
    ),
  );
}
```

## Text Styling

Customize label appearance using `TextStyle`.

### Font Size and Weight

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      tile.group,
      style: TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: Colors.black87,
      ),
    ),
  );
}
```

### Color Contrast

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Text(
    tile.group,
    style: TextStyle(
      color: Colors.white,
      fontWeight: FontWeight.bold,
      shadows: [
        Shadow(
          offset: Offset(1, 1),
          blurRadius: 2,
          color: Colors.black45,
        ),
      ],
    ),
  );
}
```

### Responsive Font Size

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  // Larger font for larger tiles
  final fontSize = tile.weight > 500000 ? 16.0 : 12.0;
  
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      tile.group,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}
```

## Overflow Handling

Control how text behaves when it exceeds tile boundaries.

### Ellipsis

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      tile.group,
      overflow: TextOverflow.ellipsis,
      maxLines: 1,
    ),
  );
}
```

### Fade

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      tile.group,
      overflow: TextOverflow.fade,
      softWrap: false,
    ),
  );
}
```

### Clip

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      tile.group,
      overflow: TextOverflow.clip,
      maxLines: 2,
    ),
  );
}
```

### FittedBox for Auto-Scaling

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(8),
    child: FittedBox(
      fit: BoxFit.scaleDown,
      alignment: Alignment.center,
      child: Text(
        tile.group,
        style: TextStyle(fontSize: 16),
      ),
    ),
  );
}
```

## Conditional Labels

Show or hide labels based on conditions.

### Show Labels Only for Large Tiles

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  // Only show label if weight is above threshold
  if (tile.weight < 50000) {
    return SizedBox.shrink(); // Empty widget
  }
  
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(tile.group),
  );
}
```

### Different Styles by Value

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  Color textColor;
  FontWeight weight;
  
  if (tile.weight > 800000) {
    textColor = Colors.white;
    weight = FontWeight.bold;
  } else if (tile.weight > 500000) {
    textColor = Colors.black87;
    weight = FontWeight.w600;
  } else {
    textColor = Colors.black54;
    weight = FontWeight.normal;
  }
  
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      tile.group,
      style: TextStyle(
        color: textColor,
        fontWeight: weight,
      ),
    ),
  );
}
```

### Icons with Labels

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(4),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.location_on, size: 16, color: Colors.red),
        SizedBox(width: 4),
        Flexible(
          child: Text(
            tile.group,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    ),
  );
}
```

## Common Patterns

### Pattern 1: Formatted Number Labels

```dart
import 'package:intl/intl.dart';

final formatter = NumberFormat.compact();

labelBuilder: (BuildContext context, TreemapTile tile) {
  return Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          tile.group,
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        Text(
          formatter.format(tile.weight),
          style: TextStyle(fontSize: 12, color: Colors.black54),
        ),
      ],
    ),
  );
}
```

### Pattern 2: Hierarchical Level Styling

```dart
// Different styles for different levels
levels: [
  // Level 1: Large, bold
  TreemapLevel(
    groupMapper: (int index) => _data[index].category,
    labelBuilder: (context, tile) => Text(
      tile.group,
      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
    ),
  ),
  // Level 2: Medium
  TreemapLevel(
    groupMapper: (int index) => _data[index].subcategory,
    labelBuilder: (context, tile) => Text(
      tile.group,
      style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
    ),
  ),
  // Level 3: Small
  TreemapLevel(
    groupMapper: (int index) => _data[index].item,
    labelBuilder: (context, tile) => Text(
      tile.group,
      style: TextStyle(fontSize: 10),
    ),
  ),
]
```

### Pattern 3: Abbreviate Long Names

```dart
String _abbreviate(String text, int maxLength) {
  if (text.length <= maxLength) return text;
  return '${text.substring(0, maxLength - 1)}...';
}

labelBuilder: (BuildContext context, TreemapTile tile) {
  return Padding(
    padding: EdgeInsets.all(4),
    child: Text(
      _abbreviate(tile.group, 15),
      style: TextStyle(fontSize: 12),
    ),
  );
}
```

### Pattern 4: Background Container

```dart
labelBuilder: (BuildContext context, TreemapTile tile) {
  return Align(
    alignment: Alignment.topLeft,
    child: Container(
      margin: EdgeInsets.all(4),
      padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.8),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        tile.group,
        style: TextStyle(fontSize: 11),
      ),
    ),
  );
}
```

## Best Practices

1. **Keep it simple:** Labels should enhance, not clutter the visualization.

2. **Consider tile size:** Don't show labels on very small tiles.

3. **Ensure readability:** Use sufficient contrast between label and tile color.

4. **Handle overflow:** Always specify overflow behavior for text.

5. **Test with real data:** Long names, special characters, and edge cases matter.

6. **Performance:** Keep labelBuilder lightweight - it's called for every tile.

7. **Accessibility:** Ensure text is readable at different zoom levels.

## Troubleshooting

**Issue: Labels are cut off**

**Solution:** Add padding and use `FittedBox`:
```dart
labelBuilder: (context, tile) => Padding(
  padding: EdgeInsets.all(8),
  child: FittedBox(child: Text(tile.group)),
)
```

**Issue: Labels overlap tile boundaries**

**Solution:** Use `ClipRect`:
```dart
labelBuilder: (context, tile) => ClipRect(
  child: Padding(
    padding: EdgeInsets.all(4),
    child: Text(tile.group, overflow: TextOverflow.ellipsis),
  ),
)
```

**Issue: Labels not visible on dark tiles**

**Solution:** Add contrasting color or shadow:
```dart
Text(
  tile.group,
  style: TextStyle(
    color: Colors.white,
    shadows: [Shadow(blurRadius: 2, color: Colors.black)],
  ),
)
```
