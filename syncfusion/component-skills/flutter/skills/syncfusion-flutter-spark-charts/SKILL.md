---
name: syncfusion-flutter-spark-charts
description: Implements Syncfusion Flutter Spark Charts (SfSparkLineChart, SfSparkAreaChart, SfSparkBarChart, SfSparkWinLossChart) for compact, lightweight data visualization. Use when working with micro charts, sparklines, KPI indicators, or inline trend charts in Flutter dashboards. This skill covers chart configuration, data binding, markers, tooltips, and trackball for all four spark chart types.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Spark Charts

This skill covers the Syncfusion Flutter Spark Charts (also known as Micro Charts) - lightweight, condensed chart widgets designed to show data trends in a simple, compact format without axes or coordinates. The package includes four chart types: **SfSparkLineChart**, **SfSparkAreaChart**, **SfSparkBarChart**, and **SfSparkWinLossChart**.

## When to Use This Skill

Use this skill when you need to:

- **Display compact data visualizations** without complex chart elements
- **Show trends and patterns** in a minimal, condensed format
- **Add inline charts** to tables, cards, or dashboards
- **Visualize KPIs** and performance indicators efficiently
- **Create lightweight visualizations** where space is limited
- **Build dashboard widgets** with quick data insights
- **Implement micro charts** for mobile or web interfaces
- **Display data summaries** without overwhelming detail
- **Show win-loss scenarios** or binary outcomes
- **Add sparklines** to data grids or list items

## Choosing the Right Chart Type

### Use **SfSparkLineChart** when:
- You need to **identify patterns and trends** over time
- Showing **continuous data flow** or sequences
- Displaying **seasonal effects** or changes over a period
- **Line trends** are the most appropriate visualization
- Building: stock price trends, temperature changes, sales trends, performance metrics

### Use **SfSparkAreaChart** when:
- You want to **emphasize magnitude** of changes
- **Cumulative values** need to be highlighted
- The **volume of change** is more important than individual points
- You need to **fill the area under the trend line**
- Building: volume indicators, cumulative metrics, filled trend displays

### Use **SfSparkBarChart** when:
- **Discrete values** or individual data points are important
- **Comparing values** across categories
- **Column/bar representation** is more intuitive
- Data is **categorical or segmented**
- Building: monthly comparisons, category-wise data, discrete measurements

### Use **SfSparkWinLossChart** when:
- Showing **binary outcomes** (positive/negative, win/loss)
- **Performance indicators** with success/failure states
- **Win-loss records** or game results
- **Binary status** over time periods
- Building: win-loss records, success metrics, binary performance indicators, tie scenarios

### Key Differences Summary:

| Feature | SfSparkLineChart | SfSparkAreaChart | SfSparkBarChart | SfSparkWinLossChart |
|---------|------------------|------------------|-----------------|---------------------|
| **Primary Purpose** | Trend lines | Magnitude emphasis | Discrete comparisons | Binary outcomes |
| **Visualization** | Line | Filled area | Vertical bars | Win/Loss bars |
| **Marker Support** | ✅ Yes | ✅ Yes | ❌ No | ❌ No |
| **Best For** | Continuous trends | Cumulative data | Categorical data | Binary data |
| **Data Label** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Border Style** | Line only | Area + Border | Bar + Border | Bar + Border |
| **Special Points** | High, low, first, last, negative | High, low, first, last, negative | High, low, first, last, negative | High, low, first, last, tie |
| **Dashed Style** | ✅ Yes | ❌ No | ❌ No | ❌ No |

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup
- Basic implementation for all chart types
- Adding dependencies and imports
- Binding data sources
- First examples and quick starts

### Chart Overview

📄 **Read:** [references/overview.md](references/overview.md)
- Spark Charts widget overview and features
- When to use Spark Charts vs full charts
- Four chart types explained
- Key features and capabilities
- Lightweight visualization benefits

### Chart Types

📄 **Read:** [references/chart-types.md](references/chart-types.md)
- Line chart (SfSparkLineChart)
- Area chart (SfSparkAreaChart)
- Bar chart (SfSparkBarChart)
- WinLoss chart (SfSparkWinLossChart)
- Chart type comparison and selection
- Type-specific properties and customization
- Dashed line support for line charts

### Axis Configuration

📄 **Read:** [references/axis-types.md](references/axis-types.md)
- Numeric axis
- Date-time axis
- Category axis
- Custom data source binding
- Axis line customization
- Axis crossing positions
- Axis styling (color, width, dash array)

### Data Binding

📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Simple data binding with List<double>
- Custom data source with xValueMapper and yValueMapper
- Numeric, date-time, and category x-axis values
- Data mapping patterns
- Using .custom() constructors

### Markers and Data Labels

📄 **Read:** [references/markers-datalabels.md](references/markers-datalabels.md)
- Marker configuration (line and area charts only)
- Marker shapes (circle, diamond, square, triangle, inverted triangle)
- Marker display modes (all, high, low, first, last, none)
- Marker customization (color, border, size)
- Data label display modes
- Data label styling

### Trackball

📄 **Read:** [references/trackball.md](references/trackball.md)
- Enabling trackball for interaction
- Trackball activation modes (tap, longPress, doubleTap)
- Trackball customization (color, border, background)
- Trackball label styling
- Touch interaction patterns

### Plot Bands

📄 **Read:** [references/plotband.md](references/plotband.md)
- Highlighting specific Y-axis ranges
- Plot band start and end values
- Plot band styling (color, border)
- Use cases for plot bands

### Customization and Styling

📄 **Read:** [references/customization.md](references/customization.md)
- Chart color customization
- Special point colors (high, low, first, last, negative, tie)
- Border styling (width, color)
- Line width customization
- Chart inversion
- Visual appearance patterns

### Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Sufficient contrast for charts
- Theme support and customization
- Large font support
- Text scaling with MediaQueryData
- Color customization for accessibility

## Quick Start Examples

### Basic Line Chart

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class MySparkLineChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Spark Line Chart')),
      body: Center(
        child: Container(
          height: 100,
          padding: EdgeInsets.all(16),
          child: SfSparkLineChart(
            data: <double>[
              5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8
            ],
          ),
        ),
      ),
    );
  }
}
```

### Bar Chart with Special Points

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class SparkBarWithColors extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SfSparkBarChart(
      data: <double>[
        10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10
      ],
      highPointColor: Colors.red,
      lowPointColor: Colors.green,
      firstPointColor: Colors.orange,
      lastPointColor: Colors.orange,
      negativePointColor: Colors.purple,
    );
  }
}
```

### WinLoss Chart

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class SparkWinLossChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SfSparkWinLossChart(
      data: <double>[
        12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10
      ],
      color: Colors.blue,
      negativePointColor: Colors.red,
      tiePointColor: Colors.grey,
    );
  }
}
```

### Chart with Trackball

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/sparkcharts.dart';

class SparkLineWithTrackball extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      axisLineWidth: 0,
      trackball: SparkChartTrackball(
        backgroundColor: Colors.blue.withOpacity(0.8),
        borderColor: Colors.blue.withOpacity(0.8),
        borderWidth: 2,
        color: Colors.blue,
        labelStyle: TextStyle(color: Colors.white),
        activationMode: SparkChartActivationMode.tap,
      ),
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.all,
      ),
      data: <double>[
        5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8
      ],
    );
  }
}
```

## Common Patterns

### Pattern 1: Dashboard KPI Widget

```dart
// Compact KPI card with sparkline
class KPICard extends StatelessWidget {
  final String title;
  final String value;
  final List<double> trendData;
  final Color trendColor;

  const KPICard({
    required this.title,
    required this.value,
    required this.trendData,
    this.trendColor = Colors.blue,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: TextStyle(fontSize: 14, color: Colors.grey)),
            SizedBox(height: 8),
            Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            SizedBox(height: 12),
            Container(
              height: 50,
              child: SfSparkLineChart(
                axisLineWidth: 0,
                data: trendData,
                color: trendColor,
                width: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Pattern 2: Data Table with Inline Sparklines

```dart
// Table row with sparkline trend
class DataRowWithSparkline extends StatelessWidget {
  final String label;
  final List<double> data;

  const DataRowWithSparkline({
    required this.label,
    required this.data,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 2,
          child: Text(label),
        ),
        Expanded(
          flex: 3,
          child: Container(
            height: 30,
            child: SfSparkLineChart(
              axisLineWidth: 0,
              data: data,
              highPointColor: Colors.green,
              lowPointColor: Colors.red,
            ),
          ),
        ),
      ],
    );
  }
}
```

### Pattern 3: Win-Loss Record Display

```dart
// Display win-loss record with chart
class WinLossRecord extends StatelessWidget {
  final List<double> results; // 1 for win, -1 for loss, 0 for tie

  const WinLossRecord({required this.results});

  @override
  Widget build(BuildContext context) {
    int wins = results.where((r) => r > 0).length;
    int losses = results.where((r) => r < 0).length;
    int ties = results.where((r) => r == 0).length;

    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text('W: $wins', style: TextStyle(color: Colors.green)),
            Text('L: $losses', style: TextStyle(color: Colors.red)),
            Text('T: $ties', style: TextStyle(color: Colors.grey)),
          ],
        ),
        SizedBox(height: 8),
        Container(
          height: 40,
          child: SfSparkWinLossChart(
            data: results,
            color: Colors.green,
            negativePointColor: Colors.red,
            tiePointColor: Colors.grey,
          ),
        ),
      ],
    );
  }
}
```

### Pattern 4: Chart with Plot Band Threshold

```dart
// Highlight threshold zones with plot band
class ThresholdSparkLine extends StatelessWidget {
  final List<double> data;
  final double thresholdMin;
  final double thresholdMax;

  const ThresholdSparkLine({
    required this.data,
    this.thresholdMin = 5.0,
    this.thresholdMax = 10.0,
  });

  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      axisLineWidth: 1,
      axisLineColor: Colors.grey[300],
      data: data,
      color: Colors.blue,
      plotBand: SparkChartPlotBand(
        start: thresholdMin,
        end: thresholdMax,
        color: Colors.green.withOpacity(0.2),
        borderColor: Colors.green,
        borderWidth: 1,
      ),
    );
  }
}
```

## Key Properties

### Essential Properties (All Chart Types)

**Data & Display:**
- `data` - List of data values (List<double>)
- `color` - Primary color of the chart
- `axisLineWidth` - Axis line width (set to 0 to hide)
- `isInversed` - Inverts chart vertically

**Special Point Colors:**
- `highPointColor`, `lowPointColor`, `firstPointColor`, `lastPointColor`
- `negativePointColor` - For negative values
- `tiePointColor` - For zero values (Win-Loss only)

**Interactive Features:**
- `marker` - Marker configuration (Line/Area only)
- `trackball` - Interactive tooltip configuration
- `plotBand` - Highlight Y-axis ranges

**Line Chart Specific:**
- `width` - Line thickness
- `dashArray` - Dashed line pattern [5, 3]

**Area/Bar/Win-Loss Specific:**
- `borderColor`, `borderWidth` - Chart borders

**Data Labels:**
- `labelDisplayMode` - Display mode (all, high, low, first, last, none)
- `labelStyle` - Text style configuration

**Custom Data Binding:**
- Use `.custom()` constructor with `dataCount`, `xValueMapper`, `yValueMapper`

📄 **For detailed properties:** See [references/customization.md](references/customization.md)

## Common Use Cases

1. **Dashboard KPIs** - Use SfSparkLineChart for compact trend indicators
2. **Data Grid Trends** - Use any chart type inline with table data
3. **Performance Metrics** - Use SfSparkLineChart with special point colors
4. **Win-Loss Records** - Use SfSparkWinLossChart for game/competition results
5. **Stock Price Indicators** - Use SfSparkLineChart with markers
6. **Sales Trends** - Use SfSparkAreaChart to emphasize volume
7. **Monthly Comparisons** - Use SfSparkBarChart for discrete periods
8. **Threshold Monitoring** - Use plot bands to highlight critical ranges
9. **Mobile Dashboards** - Use compact sparklines for space-limited UIs
10. **Report Summaries** - Use sparklines for quick data overviews
