---
name: syncfusion-flutter-pyramid-charts
description: Implements Syncfusion Flutter Pyramid Charts (SfPyramidChart, PyramidSeries) for proportional and hierarchical data visualization. Use when working with pyramid charts, funnel-style visualizations, or segment-based data comparisons in Flutter. This skill covers series configuration, segment exploding, gap ratio, PyramidMode, data labels, legends, and tooltip customization.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing Pyramid Charts (SfPyramidChart)

The Syncfusion Flutter `SfPyramidChart` widget renders high-performance pyramid charts natively in Dart. It visualizes proportional or hierarchical data as stacked triangular segments, making it ideal for sales funnels, population distribution, organizational hierarchy, and process stage analysis.

## When to Use This Skill

- User wants to render a pyramid chart in a Flutter application
- User references `SfPyramidChart`, `PyramidSeries`, or `syncfusion_flutter_charts`
- User needs to customize pyramid segments (color, gap, explode, mode)
- User wants to add labels, legend, tooltip, or selection to a pyramid chart
- User needs to export a pyramid chart as PNG or PDF
- User asks about RTL support or accessibility in Syncfusion Flutter charts

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and pubspec.yaml setup
- Import statement and basic widget initialization
- Binding data source with xValueMapper / yValueMapper
- Adding title, data labels, legend, and tooltip
- Minimal runnable example

### Pyramid Customization
📄 **Read:** [references/pyramid-customization.md](references/pyramid-customization.md)
- PyramidMode: linear (height-based) vs surface (area-based)
- Changing pyramid size with `height` and `width` (percentage strings)
- Gap between segments using `gapRatio` (0 to 1)
- Exploding segments: `explode`, `explodeIndex`, `explodeOffset`
- Palette colors, border color/width, opacity, pointColorMapper

### Series Customization
📄 **Read:** [references/series-customization.md](references/series-customization.md)
- Animation: `animationDuration` and `animationDelay`
- Handling null/empty data points with `EmptyPointSettings`
- Empty point modes: gap, zero, drop, average
- Color mapping per data point via `pointColorMapper`

### Data Labels
📄 **Read:** [references/data-labels.md](references/data-labels.md)
- Enabling data labels with `DataLabelSettings(isVisible: true)`
- Inside vs outside positioning (`labelPosition`)
- Connector line settings (type, color, length)
- Custom label templates via `builder`
- Smart labels and `labelIntersectAction`
- Overflow mode and hiding zero-value labels

### Legend and Tooltip
📄 **Read:** [references/legend-and-tooltip.md](references/legend-and-tooltip.md)
- Enabling and positioning the legend
- Legend title, item templates, overflow behavior
- Toggle series visibility via legend tap
- Enabling tooltip with `TooltipBehavior`
- Tooltip formatting, custom templates, activation mode

### Selection and Callbacks
📄 **Read:** [references/selection-and-callbacks.md](references/selection-and-callbacks.md)
- Enabling segment selection with `SelectionBehavior`
- Multi-selection, toggle selection, initial selection
- Programmatic selection via `selectDataPoints`
- Key callbacks: `onPointTap`, `onSelectionChanged`, `onTooltipRender`
- `onRendererCreated` for dynamic data updates via `PyramidSeriesController`

### Appearance, Export, and RTL
📄 **Read:** [references/appearance-export-rtl.md](references/appearance-export-rtl.md)
- Chart title customization (`ChartTitle`)
- Chart sizing, margin, background color/image
- Exporting chart as PNG image or PDF document
- RTL support using `Directionality` widget or locale
- Accessibility: contrast, font scaling, tap targets
- `pixelToPoint` method for coordinate conversion

## Quick Start Example

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class PyramidChartExample extends StatelessWidget {
  final List<ChartData> chartData = [
    ChartData('Enterprise', 654),
    ChartData('Mid-Market', 575),
    ChartData('SMB', 446),
    ChartData('Startup', 341),
    ChartData('Individual', 160),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfPyramidChart(
        title: ChartTitle(text: 'Sales Pipeline'),
        legend: Legend(isVisible: true),
        series: PyramidSeries<ChartData, String>(
          dataSource: chartData,
          xValueMapper: (ChartData data, _) => data.x,
          yValueMapper: (ChartData data, _) => data.y,
          dataLabelSettings: DataLabelSettings(isVisible: true),
        ),
      ),
    );
  }
}

class ChartData {
  ChartData(this.x, this.y);
  final String x;
  final double y;
}
```

## Common Patterns

### Exploding a specific segment
```dart
PyramidSeries<ChartData, String>(
  explode: true,
  explodeIndex: 0,      // Index of segment to highlight
  explodeOffset: '5%',  // Distance the segment moves out
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

### Surface mode (area proportional)
```dart
PyramidSeries<ChartData, String>(
  pyramidMode: PyramidMode.surface,  // Area ∝ Y value (vs linear: height ∝ Y)
  dataSource: chartData,
  xValueMapper: (ChartData data, _) => data.x,
  yValueMapper: (ChartData data, _) => data.y,
)
```

### Tooltip + selection together
```dart
// In initState:
_tooltipBehavior = TooltipBehavior(enable: true);
_selectionBehavior = SelectionBehavior(enable: true);

// In widget:
SfPyramidChart(
  tooltipBehavior: _tooltipBehavior,
  series: PyramidSeries<ChartData, String>(
    selectionBehavior: _selectionBehavior,
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
  ),
)
```

## Key Properties

| Property | Type | Description |
|---|---|---|
| `series` | `PyramidSeries` | The pyramid data series (one per chart) |
| `title` | `ChartTitle` | Chart title widget |
| `legend` | `Legend` | Legend configuration |
| `tooltipBehavior` | `TooltipBehavior` | Tooltip enable/customize |
| `enableMultiSelection` | `bool` | Allow selecting multiple segments |
| `palette` | `List<Color>` | Custom segment colors |
| `pyramidMode` | `PyramidMode` | `linear` or `surface` sizing |
| `gapRatio` | `double` | Gap between segments (0–1) |
| `explode` | `bool` | Enable segment explode on tap |
