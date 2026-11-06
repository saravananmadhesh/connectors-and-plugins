# Drilldown Navigation in Flutter TreeMap

This guide covers implementing the **built-in drilldown functionality** to navigate through hierarchical data levels interactively.

## Table of Contents
- [What is Drilldown?](#what-is-drilldown)
- [Enabling Drilldown](#enabling-drilldown)
- [Complete Drilldown Example](#complete-drilldown-example)
- [Breadcrumb Navigation](#breadcrumb-navigation)
- [Breadcrumb Styling Examples](#breadcrumb-styling-examples)
- [Breadcrumb Positioning and Dividers](#breadcrumb-positioning-and-dividers)
- [How Built-in Drilldown Works](#how-built-in-drilldown-works)
- [Best Practices](#best-practices)
- [Important Notes](#important-notes)
- [Troubleshooting](#troubleshooting)

## What is Drilldown?

Drilldown allows users to tap a parent tile to expand it and view its child tiles with smooth animation. The TreeMap provides **built-in drilldown support** that automatically handles navigation, animations, and breadcrumb tracking. This provides an intuitive way to explore multi-level hierarchical data one level at a time.

## Enabling Drilldown

To enable the built-in drilldown feature, set `enableDrilldown` to `true` and provide a `TreemapBreadcrumbs` widget. The TreeMap automatically handles:
- Tile tapping to drill down to child levels
- Smooth animations when expanding tiles
- Breadcrumb tracking of the navigation path
- Navigation back through breadcrumb clicks

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  enableDrilldown: true, // Enable built-in drilldown
  breadcrumbs: TreemapBreadcrumbs(
    builder: (BuildContext context, TreemapTile tile, bool isCurrent) {
      return Text(
        tile.group,
        style: TextStyle(
          color: isCurrent ? Colors.blue : Colors.black54,
        ),
      );
    },
  ),
  levels: [
    // Define multiple levels for hierarchical navigation
    TreemapLevel(groupMapper: (int index) => _data[index].region),
    TreemapLevel(groupMapper: (int index) => _data[index].country),
    TreemapLevel(groupMapper: (int index) => _data[index].city),
  ],
)
```

## Complete Drilldown Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class DrilldownExample extends StatefulWidget {
  @override
  _DrilldownExampleState createState() => _DrilldownExampleState();
}

class _DrilldownExampleState extends State<DrilldownExample> {
  late List<SalesData> _data;

  @override
  void initState() {
    _data = [
      SalesData(region: 'North America', country: 'USA', city: 'New York', sales: 120000),
      SalesData(region: 'North America', country: 'USA', city: 'Los Angeles', sales: 95000),
      SalesData(region: 'North America', country: 'Canada', city: 'Toronto', sales: 80000),
      SalesData(region: 'Europe', country: 'UK', city: 'London', sales: 110000),
      SalesData(region: 'Europe', country: 'Germany', city: 'Berlin', sales: 90000),
      SalesData(region: 'Europe', country: 'France', city: 'Paris', sales: 85000),
      SalesData(region: 'Asia', country: 'India', city: 'Mumbai', sales: 130000),
      SalesData(region: 'Asia', country: 'China', city: 'Beijing', sales: 150000),
      SalesData(region: 'Asia', country: 'Japan', city: 'Tokyo', sales: 105000),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sales Drilldown'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].sales,
          enableDrilldown: true,
          breadcrumbs: TreemapBreadcrumbs(
            builder: (BuildContext context, TreemapTile tile, bool isCurrent) {
              return Padding(
                padding: EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                child: Text(
                  tile.group,
                  style: TextStyle(
                    color: isCurrent ? Colors.blue : Colors.black,
                    fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
                    decoration: isCurrent ? null : TextDecoration.underline,
                  ),
                ),
              );
            },
          ),
          levels: [
            TreemapLevel(
              groupMapper: (int index) => _data[index].region,
              color: Colors.blue[300],
              padding: EdgeInsets.all(2),
              labelBuilder: (BuildContext context, TreemapTile tile) {
                return Center(
                  child: Text(
                    tile.group,
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                );
              },
            ),
            TreemapLevel(
              groupMapper: (int index) => _data[index].country,
              color: Colors.green[300],
              padding: EdgeInsets.all(3),
              labelBuilder: (BuildContext context, TreemapTile tile) {
                return Center(child: Text(tile.group));
              },
            ),
            TreemapLevel(
              groupMapper: (int index) => _data[index].city,
              color: Colors.orange[300],
              padding: EdgeInsets.all(4),
              labelBuilder: (BuildContext context, TreemapTile tile) {
                return Center(child: Text(tile.group));
              },
            ),
          ],
        ),
      ),
    );
  }
}

class SalesData {
  SalesData({
    required this.region,
    required this.country,
    required this.city,
    required this.sales,
  });
  
  final String region;
  final String country;
  final String city;
  final double sales;
}
```

## Breadcrumb Navigation

Breadcrumbs are automatically managed by the TreeMap to show the current navigation path. Users can tap any breadcrumb to navigate back to that level. The TreeMap handles all the navigation logic internally.

### Breadcrumb Builder

The `builder` callback is called for each breadcrumb item and receives:
- `BuildContext context` - Build context
- `TreemapTile tile` - The tile representing this breadcrumb level
- `bool isCurrent` - `true` if this is the currently displayed level

**The TreeMap automatically:**
- Adds breadcrumbs as you drill down
- Makes breadcrumbs clickable to navigate back
- Removes breadcrumbs when navigating back

```dart
breadcrumbs: TreemapBreadcrumbs(
  builder: (BuildContext context, TreemapTile tile, bool isCurrent) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isCurrent ? Colors.blue[100] : Colors.transparent,
        borderRadius: BorderRadius.circular(4),
      ),
      child: Text(
        tile.group,
        style: TextStyle(
          color: isCurrent ? Colors.blue[900] : Colors.black54,
          fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
        ),
      ),
    );
  },
)
```

### Breadcrumb Styling Examples

#### With Icons

```dart
breadcrumbs: TreemapBreadcrumbs(
  builder: (context, tile, isCurrent) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (!isCurrent) Icon(Icons.chevron_right, size: 16),
        Text(
          tile.group,
          style: TextStyle(
            color: isCurrent ? Colors.blue : Colors.grey,
            fontWeight: isCurrent ? FontWeight.bold : FontWeight.normal,
          ),
        ),
      ],
    );
  },
)
```

#### With Separators

```dart
breadcrumbs: TreemapBreadcrumbs(
  builder: (context, tile, isCurrent) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 6),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            tile.group,
            style: TextStyle(
              color: isCurrent ? Colors.black : Colors.blue,
              decoration: isCurrent ? null : TextDecoration.underline,
            ),
          ),
          if (!isCurrent)
            Padding(
              padding: EdgeInsets.only(left: 6),
              child: Text('>', style: TextStyle(color: Colors.grey)),
            ),
        ],
      ),
    );
  },
)
```

## Breadcrumb Positioning and Dividers

You can customize the breadcrumb position and add dividers between items.

### Position

Set the breadcrumb position using the `position` property. Default is `TreemapBreadcrumbPosition.top`.

```dart
breadcrumbs: TreemapBreadcrumbs(
  position: TreemapBreadcrumbPosition.bottom, // Position at bottom
  builder: (context, tile, isCurrent) {
    return Text(tile.group);
  },
)
```

### Dividers

Add separators between breadcrumb items using the `divider` property:

```dart
breadcrumbs: TreemapBreadcrumbs(
  divider: Icon(Icons.chevron_right, color: Colors.grey, size: 16),
  builder: (context, tile, isCurrent) {
    return Text(
      tile.group,
      style: TextStyle(
        color: isCurrent ? Colors.black : Colors.blue,
      ),
    );
  },
)
```

## Best Practices

1. **Always provide breadcrumbs** - Required for built-in drilldown. Users need a way to navigate back through the hierarchy.

2. **Clear visual hierarchy** - Use different colors or styles per level to distinguish between hierarchy depths.

3. **Highlight current location** - Use the `isCurrent` parameter in the breadcrumb builder to visually distinguish the active level.

4. **Limit depth** - Keep hierarchies to 3-4 levels maximum for optimal user experience.

5. **Distinguish clickable breadcrumbs** - Make it visually clear which breadcrumbs can be clicked (typically all except the current one).

6. **Use appropriate dividers** - Add visual separators between breadcrumbs to show the navigation path clearly.

7. **Consider mobile taps** - Ensure breadcrumb items are large enough to be easily tapped on mobile devices.

## How Built-in Drilldown Works

The TreeMap component automatically handles:

1. **Tap Detection** - Detects taps on parent tiles (tiles with children).
2. **Tile Expansion** - Expands the tapped tile to fill the viewport with smooth animation.
3. **Child Rendering** - Renders the child tiles of the expanded parent.
4. **Breadcrumb Management** - Adds the drilled level to the breadcrumb trail.
5. **Back Navigation** - Makes previous breadcrumb items clickable to navigate back.
6. **Animation** - Provides smooth transitions between levels.

## Important Notes

- **Selection and tooltips** work only on leaf tiles (tiles without children) when drilldown is enabled.
- **Animation** is automatic and smooth - no manual animation code needed.
- **Breadcrumb taps** automatically navigate back to that level - handled by the TreeMap.
- **Multiple levels required** - You must define at least 2 `TreemapLevel` objects for drilldown to work.
- **Breadcrumbs are required** - The `breadcrumbs` property must be provided when `enableDrilldown` is `true`.

## Troubleshooting

**Issue: Drilldown not working when tapping tiles**

**Solutions:**
- Ensure `enableDrilldown: true` is set
- Verify you have at least 2 `TreemapLevel` objects defined
- Confirm breadcrumbs are provided with a valid builder

```dart
// Correct setup
enableDrilldown: true,
breadcrumbs: TreemapBreadcrumbs(
  builder: (context, tile, isCurrent) => Text(tile.group),
),
levels: [
  TreemapLevel(groupMapper: (int index) => _data[index].level1),
  TreemapLevel(groupMapper: (int index) => _data[index].level2),
  // At least 2 levels required
]
```

**Issue: Breadcrumbs not showing**

**Solution:** The `breadcrumbs` property is required when `enableDrilldown` is `true`:
```dart
breadcrumbs: TreemapBreadcrumbs(
  builder: (context, tile, isCurrent) => Text(tile.group),
)
```

**Issue: Can't navigate back to previous level**

**Solution:** The TreeMap makes breadcrumbs automatically clickable. Simply tap an earlier breadcrumb to navigate back to that level. No additional code is needed.

**Issue: Tiles are not expanding on tap**

**Solutions:**
- Only parent tiles (tiles with children) are drillable
- Leaf tiles (tiles without children) cannot be drilled into
- Verify your data has hierarchical structure matching your levels
