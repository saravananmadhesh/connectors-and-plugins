---
name: syncfusion-flutter-treemap
description: Implements Syncfusion Flutter TreeMap (SfTreemap) for visualizing hierarchical and proportional data in Flutter apps. Use when working with treemap layouts, nested rectangles, drill-down navigation, or hierarchical data visualization. This skill covers layouts, labels, tooltips, legends, selection, color mapping, and drilldown navigation.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing Flutter TreeMaps

This skill guides you through implementing the Syncfusion Flutter TreeMap (SfTreemap) widget - a powerful visualization component for displaying hierarchical and proportional data using nested rectangles. TreeMaps excel at showing complex data relationships, making them ideal for dashboards, analytics, and data exploration interfaces.

## When to Use This Skill

Use this skill when the user needs to:
- Visualize hierarchical or nested data structures in Flutter
- Display proportional data using nested rectangles
- Create interactive treemap visualizations with drilldown
- Show categorical data with color-coded tiles
- Represent large datasets in a space-efficient manner
- Build dashboards with hierarchical data displays
- Implement data exploration interfaces with selection and tooltips
- Create heat maps based on quantitative values

## Component Overview

The Syncfusion Flutter TreeMap (SfTreemap) is a powerful data visualization widget that displays hierarchical data using nested rectangles. Each rectangle's size is proportional to a quantitative value, making it easy to compare values across different categories and levels.

**TreeMap is ideal for:**
- File system visualizations
- Budget breakdowns by category
- Market share analysis
- Organization hierarchies with metrics
- Resource allocation displays
- Portfolio compositions
- Sales data by region/product/category

## Key Capabilities

- **Multiple Layout Algorithms:** Squarified (default), Slice, Dice
- **Data Support:** Both flat and hierarchical structures
- **Customizable Labels:** Use any Flutter widget as labels
- **Interactive Features:** Selection, tooltips, tap events
- **Color Mapping:** Value-based and range-based coloring
- **Legend Support:** Bar and gradient legends
- **Drilldown Navigation:** Navigate through hierarchical levels
- **Accessibility:** RTL support, semantic labels
- **Theming:** Full customization of colors and styles

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and setup
- Adding dependency to pubspec.yaml
- Importing the treemap package
- Creating your first treemap
- Basic data source structure
- Essential properties: `dataCount`, `weightValueMapper`, `levels`
- Minimal working example

### Layout Configuration
📄 **Read:** [references/layouts.md](references/layouts.md)
- Understanding layout algorithms
- Squarified layout (default, balanced rectangles)
- Slice layout (horizontal divisions)
- Dice layout (vertical divisions)
- When to use each layout type
- Performance considerations
- Switching between layouts

### Data Structure and Hierarchy
📄 **Read:** [references/hierarchical-data.md](references/hierarchical-data.md)
- Flat vs hierarchical data structures
- Configuring TreemapLevel for grouping
- Using `groupMapper` to organize data
- Using `weightValueMapper` to size tiles
- Creating multi-level hierarchies
- `dataCount` property usage
- Building complex nested data

### Customization: Labels and Styling
📄 **Read:** [references/labels-customization.md](references/labels-customization.md)
- Adding labels with `labelBuilder`
- TreemapTile properties and data access
- Custom label widgets
- Label positioning and padding
- Text styling and formatting
- Conditional label display
- Responsive label sizing

### Customization: Colors and Theming
📄 **Read:** [references/colors-theming.md](references/colors-theming.md)
- Color mapping overview
- Value-based color mapping
- Range-based color mapping
- Gradient support
- Theme integration
- Custom color palettes
- Per-tile color customization

### Interactive Features: Tooltip and Selection
📄 **Read:** [references/tooltip-selection.md](references/tooltip-selection.md)
- Creating tooltips with `tooltipBuilder`
- Custom tooltip widgets and styling
- Enabling tile selection
- Handling `onSelectionChanged` events
- Selected tile highlighting
- Multi-select support
- Touch and hover interactions

### Legend
📄 **Read:** [references/legend.md](references/legend.md)
- Adding TreemapLegend widget
- Bar legends vs gradient legends
- Legend positioning (top, bottom, left, right)
- Icon and text customization
- Legend item styling
- Integration with color mappers

### Drilldown Navigation
📄 **Read:** [references/drilldown.md](references/drilldown.md)
- Implementing drilldown behavior
- Using `onTap` callback
- Navigating hierarchical data
- Managing drilldown state
- Building breadcrumb navigation
- Back/up navigation
- Preserving user context

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Custom tile widgets with `itemBuilder`
- Right-to-left (RTL) support
- Accessibility features
- Keyboard navigation
- Performance optimization techniques
- Responsive design patterns
- Integration with state management

## Quick Start Example

Here's a minimal example to get you started:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class BasicTreemapExample extends StatefulWidget {
  @override
  _BasicTreemapExampleState createState() => _BasicTreemapExampleState();
}

class _BasicTreemapExampleState extends State<BasicTreemapExample> {
  late List<SalesData> _salesData;

  @override
  void initState() {
    _salesData = [
      SalesData(region: 'North America', sales: 8500),
      SalesData(region: 'Europe', sales: 6200),
      SalesData(region: 'Asia', sales: 9800),
      SalesData(region: 'South America', sales: 3400),
      SalesData(region: 'Africa', sales: 2100),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sales by Region')),
      body: Center(
        child: Container(
          height: 400,
          width: 400,
          padding: EdgeInsets.all(16),
          child: SfTreemap(
            dataCount: _salesData.length,
            weightValueMapper: (int index) {
              return _salesData[index].sales;
            },
            levels: [
              TreemapLevel(
                groupMapper: (int index) {
                  return _salesData[index].region;
                },
                labelBuilder: (BuildContext context, TreemapTile tile) {
                  return Padding(
                    padding: EdgeInsets.all(4),
                    child: Text(
                      tile.group,
                      style: TextStyle(color: Colors.black),
                    ),
                  );
                },
              ),
            ],
          ),
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

## Common Patterns

### Pattern 1: Hierarchical Data with Drilldown

```dart
// Multi-level data structure
class SalesData {
  SalesData({
    required this.region,
    required this.country,
    required this.sales,
  });
  
  final String region;
  final String country;
  final double sales;
}

// TreeMap with two levels
SfTreemap(
  dataCount: _salesData.length,
  weightValueMapper: (int index) => _salesData[index].sales,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _salesData[index].region,
    ),
    TreemapLevel(
      groupMapper: (int index) => _salesData[index].country,
    ),
  ],
)
```

### Pattern 2: Color-Coded by Value

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  colorMappers: [
    TreemapColorMapper.range(
      from: 0,
      to: 25,
      color: Colors.green,
      name: 'Low',
    ),
    TreemapColorMapper.range(
      from: 25,
      to: 50,
      color: Colors.yellow,
      name: 'Medium',
    ),
    TreemapColorMapper.range(
      from: 50,
      to: 100,
      color: Colors.red,
      name: 'High',
    ),
  ],
  legend: TreemapLegend.bar(),
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
    ),
  ],
)
```

### Pattern 3: Interactive with Selection

```dart
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  onSelectionChanged: (TreemapTile tile) {
    setState(() {
      // Add selection changed functionalities here
    });
  },
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].category,
      color: Colors.blue[200],
      tooltipBuilder: (BuildContext context, TreemapTile tile) {
        return Container(
          padding: EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.black87,
            borderRadius: BorderRadius.circular(4),
          ),
          child: Text(
            '${tile.group}: ${tile.weight}',
            style: TextStyle(color: Colors.white),
          ),
        );
      },
    ),
  ],
)
```

## Key Properties Reference

### Essential Properties

| Property | Type | Description |
|----------|------|-------------|
| `dataCount` | int | Number of data points in the source |
| `weightValueMapper` | IndexedDoubleValueMapper | Callback returning numeric value for tile size |
| `levels` | List\<TreemapLevel\> | Hierarchy levels configuration |

### TreemapLevel Properties

| Property | Type | Description |
|----------|------|-------------|
| `groupMapper` | IndexedStringValueMapper | Groups data for this level |
| `labelBuilder` | TreemapLabelBuilder? | Custom label widget builder |
| `tooltipBuilder` | TreemapTooltipBuilder? | Custom tooltip widget builder |
| `color` | Color? | Default tile color for this level |
| `border` | RoundedRectangleBorder? | Tile border styling |
| `padding` | EdgeInsetsGeometry? | Padding around tiles |

### Optional Configuration

> **Note:** The layout algorithm is determined by the constructor used, not by a property.
> Use `SfTreemap()` for squarified (default), `SfTreemap.slice()` for slice, or `SfTreemap.dice()` for dice.

| Property | Type | Description |
|----------|------|-------------|
| `colorMappers` | List\<TreemapColorMapper\>? | Value/range-based coloring |
| `legend` | TreemapLegend? | Legend widget configuration |
| `onSelectionChanged` | ValueChanged\<TreemapTile\>? | Selection event handler |
| `layoutDirection` | TreemapLayoutDirection | Layouts the tiles in top-left, top-right, bottom-left and bottom-right directions; default `topLeft` |
| `sortAscending` | bool | Sort tiles by weight (slice/dice only) |

## Common Use Cases

### Use Case 1: Budget Dashboard
Display organizational budget breakdown by department and sub-categories with color coding for spending levels.

**When to use:** Multi-level budget tracking, resource allocation

### Use Case 2: Sales Analysis
Visualize sales data across regions, countries, and products with interactive drilldown.

**When to use:** Regional sales comparison, market analysis, performance dashboards

### Use Case 3: File System Visualization
Show disk space usage by folders and files with proportional sizing.

**When to use:** Storage analysis, file management tools, disk cleanup utilities

### Use Case 4: Market Share Analysis
Display market share data for different companies, products, or categories.

**When to use:** Competitive analysis, portfolio composition, market research

### Use Case 5: Organization Hierarchy
Show organizational structure with metrics like headcount or budget per team.

**When to use:** HR dashboards, resource planning, org chart visualizations

## Troubleshooting Quick Reference

**No tiles visible?**
- Check that `dataCount` matches your data length
- Verify `weightValueMapper` returns positive numbers
- Ensure `groupMapper` returns non-null strings

**Labels not showing?**
- Add `labelBuilder` to TreemapLevel
- Check label widget size fits within tile
- Verify text color contrasts with tile background

**Colors not applying?**
- Ensure `colorMappers` values match your data range
- Check that color mapper has the correct type (value vs range)
- Verify legend is configured if using color mappers

**Selection not working?**
- Add `onSelectionChanged` callback
- Ensure you're calling `setState` to rebuild
- Check that tiles are large enough to tap

For detailed troubleshooting and solutions, refer to the specific reference documentation.
