# Colors and Theming in Flutter TreeMap

## Table of Contents
- [Overview](#overview)
- [Level Color](#level-color)
- [Color Mappers](#color-mappers)
- [Value-Based Color Mapping](#value-based-color-mapping)
- [Range-Based Color Mapping](#range-based-color-mapping)
- [Saturation and Gradients](#saturation-and-gradients)
- [Theme Integration](#theme-integration)
- [Common Patterns](#common-patterns)

## Overview

TreeMap provides multiple ways to apply colors to tiles:
1. **Level color** - Uniform color for an entire level
2. **Value-based mapping** - Colors for specific values
3. **Range-based mapping** - Colors for value ranges with gradients

## Level Color

Apply a uniform color to all tiles at a specific level using the `color` property.

### Basic Example

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  color: Colors.blue[200], // All tiles at this level
  padding: EdgeInsets.all(2),
)
```

### Hierarchical Coloring

```dart
levels: [
  TreemapLevel(
    groupMapper: (int index) => _data[index].region,
    color: Colors.blue[800], // Darker for parent
    padding: EdgeInsets.all(1),
  ),
  TreemapLevel(
    groupMapper: (int index) => _data[index].country,
    color: Colors.blue[400], // Medium for child
    padding: EdgeInsets.all(2),
  ),
  TreemapLevel(
    groupMapper: (int index) => _data[index].city,
    color: Colors.blue[200], // Lighter for grandchild
    padding: EdgeInsets.all(3),
  ),
]
```

## Color Mappers

Color mappers provide dynamic coloring based on data values. Set them using the `colorMappers` property on `SfTreemap`.

### Setup Requirements

1. Define `colorValueMapper` in `TreemapLevel`
2. Provide `colorMappers` list to `SfTreemap`
3. Colors automatically applied based on mapper type

## Value-Based Color Mapping

Color tiles based on exact value matches using `TreemapColorMapper.value()`.

### Basic Value Mapping

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class ValueColorExample extends StatefulWidget {
  @override
  _ValueColorExampleState createState() => _ValueColorExampleState();
}

class _ValueColorExampleState extends State<ValueColorExample> {
  late List<SocialMediaData> _data;
  late List<TreemapColorMapper> _colorMappers;

  @override
  void initState() {
    _data = [
      SocialMediaData(country: 'India', platform: 'Facebook', users: 254),
      SocialMediaData(country: 'USA', platform: 'Instagram', users: 191),
      SocialMediaData(country: 'Japan', platform: 'Facebook', users: 133),
      SocialMediaData(country: 'Germany', platform: 'Instagram', users: 106),
      SocialMediaData(country: 'France', platform: 'Twitter', users: 75),
      SocialMediaData(country: 'UK', platform: 'Instagram', users: 49),
    ];

    _colorMappers = [
      TreemapColorMapper.value(
        value: 'Facebook',
        color: Colors.blue[300]!,
      ),
      TreemapColorMapper.value(
        value: 'Instagram',
        color: Colors.pink[300]!,
      ),
      TreemapColorMapper.value(
        value: 'Twitter',
        color: Colors.lightBlue[400]!,
      ),
    ];
    
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Social Media Users by Platform')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].users,
          colorMappers: _colorMappers,
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].country,
              padding: EdgeInsets.all(2),
              colorValueMapper: (TreemapTile tile) {
                // Return the value to match against
                return _data[tile.indices[0]].platform;
              },
            ),
          ],
        ),
      ),
    );
  }
}

class SocialMediaData {
  SocialMediaData({
    required this.country,
    required this.platform,
    required this.users,
  });
  
  final String country;
  final String platform;
  final double users;
}
```

### Multiple Value Mappers

```dart
_colorMappers = [
  TreemapColorMapper.value(value: 'Electronics', color: Colors.blue),
  TreemapColorMapper.value(value: 'Clothing', color: Colors.orange),
  TreemapColorMapper.value(value: 'Food', color: Colors.green),
  TreemapColorMapper.value(value: 'Books', color: Colors.purple),
];
```

## Range-Based Color Mapping

Color tiles based on value ranges using `TreemapColorMapper.range()`.

### Basic Range Mapping

```dart
class RangeColorExample extends StatefulWidget {
  @override
  _RangeColorExampleState createState() => _RangeColorExampleState();
}

class _RangeColorExampleState extends State<RangeColorExample> {
  late List<SalesData> _data;
  late List<TreemapColorMapper> _colorMappers;

  @override
  void initState() {
    _data = [
      SalesData(region: 'North', sales: 850000),
      SalesData(region: 'South', sales: 620000),
      SalesData(region: 'East', sales: 450000),
      SalesData(region: 'West', sales: 280000),
      SalesData(region: 'Central', sales: 150000),
    ];

    _colorMappers = [
      TreemapColorMapper.range(
        from: 0,
        to: 300000,
        color: Colors.green[300]!,
        name: 'Low',
      ),
      TreemapColorMapper.range(
        from: 300000,
        to: 600000,
        color: Colors.yellow[600]!,
        name: 'Medium',
      ),
      TreemapColorMapper.range(
        from: 600000,
        to: 1000000,
        color: Colors.red[400]!,
        name: 'High',
      ),
    ];
    
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sales Performance')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].sales,
          colorMappers: _colorMappers,
          legend: TreemapLegend.bar(), // Show legend
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].region,
              padding: EdgeInsets.all(2),
              colorValueMapper: (TreemapTile tile) {
                // Return the weight for range comparison
                return tile.weight;
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

### Named Ranges for Legend

Use the `name` property to display custom text in legends:

```dart
TreemapColorMapper.range(
  from: 0,
  to: 100,
  color: Colors.blue,
  name: 'Beginner', // Shown in legend
)
```

## Saturation and Gradients

Create gradient effects within a range using `minSaturation` and `maxSaturation`.

### Gradient Range

```dart
_colorMappers = [
  TreemapColorMapper.range(
    from: 0,
    to: 100,
    color: Colors.blue,
    minSaturation: 0.3, // Lightest (30%)
    maxSaturation: 1.0, // Darkest (100%)
    name: '0-100',
  ),
  TreemapColorMapper.range(
    from: 100,
    to: 500,
    color: Colors.orange,
    minSaturation: 0.4,
    maxSaturation: 1.0,
    name: '100-500',
  ),
  TreemapColorMapper.range(
    from: 500,
    to: 1000,
    color: Colors.red,
    minSaturation: 0.5,
    maxSaturation: 1.0,
    name: '500-1000',
  ),
];
```

**How it works:**
- Tiles with the lowest value in the range get `minSaturation`
- Tiles with the highest value get `maxSaturation`
- Intermediate values get proportional saturation

### Heat Map Effect

```dart
_colorMappers = [
  TreemapColorMapper.range(
    from: 0,
    to: 1000,
    color: Colors.red,
    minSaturation: 0.2, // Very light red
    maxSaturation: 1.0, // Full red
    name: 'Temperature',
  ),
];
```

## Theme Integration

TreeMap automatically adapts to Flutter's theme system.

### Using Theme Colors

```dart
@override
Widget build(BuildContext context) {
  final theme = Theme.of(context);
  
  return SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].value,
    levels: [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
        color: theme.primaryColor.withOpacity(0.3),
        border: RoundedRectangleBorder(
          side: BorderSide(color: theme.dividerColor),
        ),
        labelBuilder: (context, tile) => Text(
          tile.group,
          style: theme.textTheme.bodyMedium,
        ),
      ),
    ],
  );
}
```

### Dark Mode Support

```dart
@override
Widget build(BuildContext context) {
  final isDark = Theme.of(context).brightness == Brightness.dark;
  
  return SfTreemap(
    dataCount: _data.length,
    weightValueMapper: (int index) => _data[index].value,
    colorMappers: [
      TreemapColorMapper.range(
        from: 0,
        to: 50,
        color: isDark ? Colors.blue[700]! : Colors.blue[200]!,
      ),
      TreemapColorMapper.range(
        from: 50,
        to: 100,
        color: isDark ? Colors.orange[700]! : Colors.orange[200]!,
      ),
    ],
    levels: [
      TreemapLevel(
        groupMapper: (int index) => _data[index].category,
        colorValueMapper: (tile) => tile.weight,
      ),
    ],
  );
}
```

## Common Patterns

### Pattern 1: Traffic Light Colors

```dart
_colorMappers = [
  TreemapColorMapper.range(
    from: 0,
    to: 33,
    color: Colors.red[400]!,
    name: 'Critical',
  ),
  TreemapColorMapper.range(
    from: 33,
    to: 66,
    color: Colors.yellow[700]!,
    name: 'Warning',
  ),
  TreemapColorMapper.range(
    from: 66,
    to: 100,
    color: Colors.green[400]!,
    name: 'Healthy',
  ),
];
```

### Pattern 2: Custom Color Palette

```dart
class CustomPalette {
  static const primary = Color(0xFF6C63FF);
  static const secondary = Color(0xFFFF6584);
  static const tertiary = Color(0xFF00D9FF);
  
  static List<TreemapColorMapper> getMappers() {
    return [
      TreemapColorMapper.value(value: 'A', color: primary),
      TreemapColorMapper.value(value: 'B', color: secondary),
      TreemapColorMapper.value(value: 'C', color: tertiary),
    ];
  }
}

// Usage
colorMappers: CustomPalette.getMappers(),
```

### Pattern 3: Percentage-Based Coloring

```dart
// Calculate percentages from data
double _getPercentage(double value, double total) {
  return (value / total) * 100;
}

@override
void initState() {
  final total = _data.fold<double>(0, (sum, item) => sum + item.value);
  
  // Use percentages for coloring
  _colorMappers = [
    TreemapColorMapper.range(
      from: 0,
      to: 25,
      color: Colors.red,
      name: '0-25%',
    ),
    TreemapColorMapper.range(
      from: 25,
      to: 50,
      color: Colors.orange,
      name: '25-50%',
    ),
    TreemapColorMapper.range(
      from: 50,
      to: 75,
      color: Colors.yellow,
      name: '50-75%',
    ),
    TreemapColorMapper.range(
      from: 75,
      to: 100,
      color: Colors.green,
      name: '75-100%',
    ),
  ];
  
  super.initState();
}
```

### Pattern 4: Category-Based with Fallback

```dart
colorValueMapper: (TreemapTile tile) {
  final category = _data[tile.indices[0]].category;
  
  // Return category or default
  return category ?? 'Unknown';
},

colorMappers: [
  TreemapColorMapper.value(value: 'Electronics', color: Colors.blue),
  TreemapColorMapper.value(value: 'Clothing', color: Colors.pink),
  TreemapColorMapper.value(value: 'Unknown', color: Colors.grey),
],
```

## Best Practices

1. **Limit color mappers:** 3-7 colors is optimal for user comprehension.

2. **Use meaningful colors:** Red for critical, green for good, etc.

3. **Ensure accessibility:** Check color contrast for colorblind users.

4. **Provide legends:** Always add legends when using color mappers.

5. **Consistent ranges:** Use non-overlapping, continuous ranges.

6. **Test in both themes:** Verify colors work in light and dark modes.

7. **Document color meaning:** Make it clear what each color represents.

## Troubleshooting

**Issue: Colors not applying**

**Solution:** Ensure `colorValueMapper` returns a value that matches your mappers:
```dart
colorValueMapper: (TreemapTile tile) {
  return _data[tile.indices[0]].category; // Must match mapper values
}
```

**Issue: All tiles the same color**

**Solution:** Check that `colorValueMapper` returns different values:
```dart
// Debug: Print the values
colorValueMapper: (TreemapTile tile) {
  final value = tile.weight;
  print('Tile value: $value'); // Check values
  return value;
}
```

**Issue: Range colors don't show gradient**

**Solution:** Add `minSaturation` and `maxSaturation`:
```dart
TreemapColorMapper.range(
  from: 0,
  to: 100,
  color: Colors.blue,
  minSaturation: 0.3, // Add this
  maxSaturation: 1.0,  // And this
)
```

**Issue: Poor contrast in dark mode**

**Solution:** Use theme-aware colors:
```dart
final isDark = Theme.of(context).brightness == Brightness.dark;
color: isDark ? Colors.blue[300]! : Colors.blue[700]!
```
