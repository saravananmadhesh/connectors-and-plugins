# Hierarchical Data and Levels in Flutter TreeMap

## Table of Contents
- [Overview](#overview)
- [Flat vs Hierarchical Data](#flat-vs-hierarchical-data)
- [TreemapLevel Configuration](#treemaplevel-configuration)
- [Building Hierarchical Treemaps](#building-hierarchical-treemaps)
- [Customizing Level Appearance](#customizing-level-appearance)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeMap supports both flat (single-level) and hierarchical (multi-level) data structures. Understanding how to configure levels is essential for creating meaningful visualizations.

## Flat vs Hierarchical Data

### Flat Level

A flat treemap has a single level where each unique value from `groupMapper` creates one tile.

**Use when:**
- Data has no parent-child relationships
- Simple categorical data
- All items are at the same hierarchy level

**Example:**
```dart
class SalesData {
  SalesData({required this.region, required this.sales});
  final String region;
  final double sales;
}

// Single level treemap
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].sales,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _data[index].region,
    ),
  ],
)
```

### Hierarchical Level

A hierarchical treemap has multiple levels where tiles contain nested tiles representing sub-categories.

**Use when:**
- Data has parent-child relationships
- Multi-dimensional categorization
- Drill-down data exploration needed

**Example:**
```dart
class HierarchicalData {
  HierarchicalData({
    required this.region,
    required this.country,
    required this.city,
    required this.value,
  });
  
  final String region;
  final String country;
  final String city;
  final double value;
}

// Three-level treemap
SfTreemap(
  dataCount: _data.length,
  weightValueMapper: (int index) => _data[index].value,
  levels: [
    TreemapLevel(groupMapper: (int index) => _data[index].region),
    TreemapLevel(groupMapper: (int index) => _data[index].country),
    TreemapLevel(groupMapper: (int index) => _data[index].city),
  ],
)
```

## TreemapLevel Configuration

### Essential Properties

#### 1. groupMapper (Required)

Groups data items at this level. Returns a string that identifies the group.

```dart
TreemapLevel(
  groupMapper: (int index) {
    return _data[index].category; // Must return String
  },
)
```

**Index parameter:** Represents the position in the original data source.

**How grouping works:**
- For each unique string returned, one tile is created
- All items with the same string are grouped together
- Null values are ignored

#### 2. colorValueMapper (Optional)

Returns a value used for color mapping. Can return any type that matches your color mappers.

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].department,
  colorValueMapper: (TreemapTile tile) {
    // tile.weight gives the sum of weights for this group
    return tile.weight;
  },
)
```

## Building Hierarchical Treemaps

### Two-Level Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_treemap/treemap.dart';

class TwoLevelTreemap extends StatefulWidget {
  @override
  _TwoLevelTreemapState createState() => _TwoLevelTreemapState();
}

class _TwoLevelTreemapState extends State<TwoLevelTreemap> {
  late List<SalesData> _data;

  @override
  void initState() {
    _data = [
      SalesData(region: 'North', product: 'Laptop', sales: 50000),
      SalesData(region: 'North', product: 'Desktop', sales: 30000),
      SalesData(region: 'South', product: 'Laptop', sales: 45000),
      SalesData(region: 'South', product: 'Tablet', sales: 25000),
      SalesData(region: 'East', product: 'Phone', sales: 60000),
      SalesData(region: 'East', product: 'Tablet', sales: 35000),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Sales by Region and Product')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: SfTreemap(
          dataCount: _data.length,
          weightValueMapper: (int index) => _data[index].sales,
          levels: [
            // Level 1: Region
            TreemapLevel(
              groupMapper: (int index) => _data[index].region,
              color: Colors.blue[300],
              padding: EdgeInsets.all(2),
              labelBuilder: (BuildContext context, TreemapTile tile) {
                return Padding(
                  padding: EdgeInsets.all(4),
                  child: Text(
                    tile.group,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                );
              },
            ),
            // Level 2: Product
            TreemapLevel(
              groupMapper: (int index) => _data[index].product,
              color: Colors.green[200],
              padding: EdgeInsets.all(5),
              labelBuilder: (BuildContext context, TreemapTile tile) {
                return Center(
                  child: Text(tile.group),
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
  SalesData({
    required this.region,
    required this.product,
    required this.sales,
  });
  
  final String region;
  final String product;
  final double sales;
}
```

### Multi-Level Example (4 Levels)

```dart
class JobVacancyModel {
  JobVacancyModel({
    required this.country,
    required this.department,
    this.team,
    this.role,
    required this.vacancies,
  });
  
  final String country;
  final String department;
  final String? team;      // Nullable for flexibility
  final String? role;      // Nullable for flexibility
  final double vacancies;
}

class FourLevelTreemap extends StatefulWidget {
  @override
  _FourLevelTreemapState createState() => _FourLevelTreemapState();
}

class _FourLevelTreemapState extends State<FourLevelTreemap> {
  late List<JobVacancyModel> _data;

  @override
  void initState() {
    _data = [
      JobVacancyModel(
        country: 'USA',
        department: 'Engineering',
        team: 'Backend',
        role: 'Senior Dev',
        vacancies: 15,
      ),
      JobVacancyModel(
        country: 'USA',
        department: 'Engineering',
        team: 'Frontend',
        role: 'UI Dev',
        vacancies: 10,
      ),
      JobVacancyModel(
        country: 'USA',
        department: 'Sales',
        team: 'Enterprise',
        vacancies: 25,
      ),
      JobVacancyModel(
        country: 'India',
        department: 'Engineering',
        team: 'QA',
        role: 'Tester',
        vacancies: 20,
      ),
      JobVacancyModel(
        country: 'India',
        department: 'Marketing',
        vacancies: 12,
      ),
    ];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SfTreemap(
      dataCount: _data.length,
      weightValueMapper: (int index) => _data[index].vacancies,
      levels: [
        // Level 1: Country
        TreemapLevel(
          groupMapper: (int index) => _data[index].country,
          color: Colors.blue,
          padding: EdgeInsets.all(2),
        ),
        // Level 2: Department
        TreemapLevel(
          groupMapper: (int index) => _data[index].department,
          color: Colors.orange,
          padding: EdgeInsets.all(3),
        ),
        // Level 3: Team (nullable handling)
        TreemapLevel(
          groupMapper: (int index) => _data[index].team ?? 'General',
          color: Colors.green[300],
          padding: EdgeInsets.all(4),
        ),
        // Level 4: Role (nullable handling)
        TreemapLevel(
          groupMapper: (int index) => _data[index].role ?? 'Various',
          color: Colors.pink[300],
          padding: EdgeInsets.all(5),
        ),
      ],
    );
  }
}
```

## Customizing Level Appearance

### Padding

Control the gap between tiles at each level:

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  padding: EdgeInsets.all(2.5), // Space around tiles
)
```

**Recommendations:**
- Level 1 (outermost): 1-2 pixels
- Level 2: 2-3 pixels
- Level 3+: 3-5 pixels
- Increase padding for deeper levels to show hierarchy

### Color

Set a default color for all tiles at this level:

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  color: Colors.blue[200], // Default tile color
)
```

**Pattern:** Use different colors per level to show hierarchy visually.

### Border

Add borders to tiles:

```dart
TreemapLevel(
  groupMapper: (int index) => _data[index].category,
  border: RoundedRectangleBorder(
    side: BorderSide(
      color: Colors.white,
      width: 2,
    ),
    borderRadius: BorderRadius.circular(4),
  ),
)
```

## Common Patterns

### Pattern 1: Organization Hierarchy

```dart
// CEO → Department → Team → Individual
SfTreemap(
  dataCount: _orgData.length,
  weightValueMapper: (int index) => _orgData[index].headcount,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => 'Company', // Single top level
      color: Colors.purple[900],
      padding: EdgeInsets.all(1),
    ),
    TreemapLevel(
      groupMapper: (int index) => _orgData[index].department,
      color: Colors.purple[400],
      padding: EdgeInsets.all(2),
    ),
    TreemapLevel(
      groupMapper: (int index) => _orgData[index].team,
      color: Colors.purple[200],
      padding: EdgeInsets.all(3),
    ),
  ],
)
```

### Pattern 2: Geographic Hierarchy

```dart
// Continent → Country → City
SfTreemap(
  dataCount: _geoData.length,
  weightValueMapper: (int index) => _geoData[index].population,
  levels: [
    TreemapLevel(
      groupMapper: (int index) => _geoData[index].continent,
      labelBuilder: (context, tile) => Text(
        tile.group,
        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
      ),
    ),
    TreemapLevel(
      groupMapper: (int index) => _geoData[index].country,
      labelBuilder: (context, tile) => Text(
        tile.group,
        style: TextStyle(fontSize: 14),
      ),
    ),
    TreemapLevel(
      groupMapper: (int index) => _geoData[index].city,
      labelBuilder: (context, tile) => Text(
        tile.group,
        style: TextStyle(fontSize: 10),
      ),
    ),
  ],
)
```

### Pattern 3: Mixed Granularity Data

Handle cases where not all items have the same depth:

```dart
// Some items have team & role, others only have department
TreemapLevel(
  groupMapper: (int index) {
    final team = _data[index].team;
    // Provide default for missing levels
    return team ?? 'Unassigned';
  },
)
```

## Troubleshooting

### Issue: Tiles not nested as expected

**Cause:** Group mapper returns inconsistent values

**Solution:** Ensure groupMapper returns the same string for items that should be grouped:

```dart
// ✅ CORRECT
groupMapper: (int index) => _data[index].category

// ❌ WRONG - Creates new string each time
groupMapper: (int index) => 'Category: ${_data[index].category}'
```

### Issue: Empty tiles or missing data

**Cause:** Null values in groupMapper

**Solution:** Provide defaults for null values:

```dart
groupMapper: (int index) => _data[index].team ?? 'No Team'
```

### Issue: Hard to distinguish levels

**Solution:** Use distinct colors and increasing padding per level:

```dart
levels: [
  TreemapLevel(
    groupMapper: (int index) => _data[index].level1,
    color: Colors.blue[800],
    padding: EdgeInsets.all(1),
  ),
  TreemapLevel(
    groupMapper: (int index) => _data[index].level2,
    color: Colors.blue[400],
    padding: EdgeInsets.all(2),
  ),
  TreemapLevel(
    groupMapper: (int index) => _data[index].level3,
    color: Colors.blue[200],
    padding: EdgeInsets.all(3),
  ),
]
```

### Issue: Performance degradation with many levels

**Recommendation:**
- Limit to 4-5 levels maximum
- Use drilldown instead of showing all levels at once
- Filter data to reduce item count

## Best Practices

1. **Limit depth:** 2-4 levels is optimal. Beyond that, consider drilldown navigation.

2. **Visual hierarchy:** Use color gradients and padding to show level depth clearly.

3. **Consistent naming:** Use consistent string values in groupMapper for predictable grouping.

4. **Handle nulls:** Always provide defaults for nullable fields in hierarchical data.

5. **Label intelligently:** Adjust label size/style per level for better readability.

6. **Test with real data:** Hierarchical layouts can behave unexpectedly with edge cases.
