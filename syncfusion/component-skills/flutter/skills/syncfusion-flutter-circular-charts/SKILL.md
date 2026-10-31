---
name: syncfusion-flutter-circular-charts
description: Implements Syncfusion Flutter Circular Charts (SfCircularChart) for pie, doughnut, and radial bar data visualizations in Flutter. Use when working with PieSeries, DoughnutSeries, or RadialBarSeries using the syncfusion_flutter_charts package. This skill covers chart setup, data labels, legends, tooltips, selection, annotations, gradients, animation, accessibility, and chart export.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing Syncfusion Flutter Circular Charts

`SfCircularChart` is Syncfusion's high-performance Flutter widget for rendering pie, doughnut, and radial bar charts. It supports rich interactivity (tooltips, selection, explode), beautiful customization (gradients, animations, data labels), and accessibility out of the box.

## When to Use This Skill

- User wants a **pie chart** to show part-to-whole proportions
- User wants a **doughnut chart** — ring-style chart, optionally with center content
- User wants a **radial bar chart** for comparing categories in circular arcs
- Any `SfCircularChart`, `PieSeries`, `DoughnutSeries`, or `RadialBarSeries` question
- Customizing segment colors, explode behavior, grouping small slices
- Adding data labels inside/outside slices with connector lines
- Configuring legend, tooltip, selection, annotations
- Exporting the chart as PNG or PDF
- Handling accessibility or RTL layouts

## Component Overview

The **SfCircularChart** widget is a high-performance charting solution for displaying proportional data in circular formats. It supports three primary series types:

- **PieSeries**: Traditional pie chart showing data as segments of a circle. Supports exploding segments, semi-circle rendering, grouping small slices, per-point radius customization, and various interaction modes.

- **DoughnutSeries**: Ring-shaped chart with customizable inner radius. Ideal for displaying data with center annotations, supports rounded corners, center elevation effects, and all pie chart features.

- **RadialBarSeries**: Circular progress-style chart with customizable tracks. Features include maximum value configuration, corner styles (flat/rounded), track opacity and color customization, and data labels along the arc.

All series types support rich interactivity (tooltips, selection, tap gestures), comprehensive data label positioning (inside/outside with connector lines), legend configuration, animations with customizable duration and delay, gradient fills (linear/sweep/radial), image shaders, empty point handling, data sorting, and chart export to PNG/PDF formats. The widget provides accessibility features, RTL support, and extensive customization through color mapping, point-specific colors, and annotations.

## Quick Start

```dart
import 'package:syncfusion_flutter_charts/charts.dart';

class MyChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<ChartData> data = [
      ChartData('Jan', 35),
      ChartData('Feb', 28),
      ChartData('Mar', 34),
      ChartData('Apr', 32),
      ChartData('May', 40),
    ];

    return SfCircularChart(
      title: ChartTitle(text: 'Monthly Sales'),
      legend: Legend(isVisible: true),
      tooltipBehavior: TooltipBehavior(enable: true),
      series: <CircularSeries>[
        PieSeries<ChartData, String>(
          dataSource: data,
          xValueMapper: (ChartData d, _) => d.x,
          yValueMapper: (ChartData d, _) => d.y,
          dataLabelSettings: DataLabelSettings(isVisible: true),
          enableTooltip: true,
        ),
      ],
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

### Doughnut with center annotation
```dart
SfCircularChart(
  annotations: <CircularChartAnnotation>[
    CircularChartAnnotation(
      widget: Text('62%', style: TextStyle(fontSize: 25)),
    ),
  ],
  series: <CircularSeries>[
    DoughnutSeries<ChartData, String>(
      dataSource: data,
      xValueMapper: (d, _) => d.x,
      yValueMapper: (d, _) => d.y,
      innerRadius: '60%',
    ),
  ],
)
```

### Radial bar with track and rounded corners
```dart
RadialBarSeries<ChartData, String>(
  dataSource: data,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  maximumValue: 100,
  cornerStyle: CornerStyle.bothCurve,
  useSeriesColor: true,
  trackOpacity: 0.3,
)
```

### Pie with exploded segment on tap
```dart
PieSeries<ChartData, String>(
  dataSource: data,
  xValueMapper: (d, _) => d.x,
  yValueMapper: (d, _) => d.y,
  explode: true,
  explodeIndex: 0,
  explodeGesture: ActivationMode.singleTap,
)
```

## Key Properties

| Prop | Where | Purpose |
|---|---|---|
| `series` | `SfCircularChart` | List of `CircularSeries` (Pie/Doughnut/RadialBar) |
| `xValueMapper` | Series | Category label per data point |
| `yValueMapper` | Series | Numeric value per data point |
| `dataLabelSettings` | Series | Show/style data labels |
| `legend` | `SfCircularChart` | Show legend |
| `tooltipBehavior` | `SfCircularChart` | Configure tooltip |
| `annotations` | `SfCircularChart` | Overlay widgets on chart |
| `radius` | Series | Outer size as `'80%'` (default) |
| `innerRadius` | Doughnut/RadialBar | Inner hole size |
| `explode` | Pie/Doughnut | Enable segment pop-out on tap |
| `maximumValue` | RadialBarSeries | Full-arc reference value |
| `palette` | `SfCircularChart` | Chart-level color list |

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and pubspec setup
- Import statement and initialization
- Binding data source with `PieSeries`
- Adding title, data labels, legend, tooltip
- Complete runnable minimal example

### Chart Types (Pie, Doughnut, Radial Bar)
📄 **Read:** [references/chart-types.md](references/chart-types.md)
- `PieSeries` — radius, explode, angle (semi-pie), grouping small slices, per-slice radius
- `DoughnutSeries` — inner radius, rounded corners, center elevation, angle, grouping
- `RadialBarSeries` — inner radius, track customization, maximumValue, overfilled bar, data labels

### Series Customization
📄 **Read:** [references/series-customization.md](references/series-customization.md)
- Animation duration and delay
- Color palette and per-point color mapping
- Gradient fill (linear, sweep, radial)
- Image shader fill
- Per-point shader mapping
- Point render mode (solid vs sweep gradient)
- Empty/null data point handling
- Sorting data points

### Data Labels
📄 **Read:** [references/data-labels.md](references/data-labels.md)
- Enable and style data labels
- Positioning (inside vs outside)
- Smart label layout (avoid overlap)
- Connector lines for outside labels
- Custom label text (dataLabelMapper)
- Label templates (builder)
- Zero-value label suppression

### Legend and Title
📄 **Read:** [references/legend-and-title.md](references/legend-and-title.md)
- Enable and customize legend appearance
- Legend title, positioning, and orientation
- Overflow handling (wrap/scroll)
- Floating legend with custom offset
- Legend item templates
- Chart title and text styling

### Tooltip and Selection
📄 **Read:** [references/tooltip-and-selection.md](references/tooltip-and-selection.md)
- Enable and configure `TooltipBehavior`
- Tooltip format, positioning, templates
- Activation modes (singleTap, longPress, doubleTap)
- Segment selection with `SelectionBehavior`
- Customizing selected/unselected segment appearance
- Multi-selection

### Annotations and Appearance
📄 **Read:** [references/annotations-and-appearance.md](references/annotations-and-appearance.md)
- Placing widgets inside the chart (`CircularChartAnnotation`)
- Positioning annotations by radius and alignment
- Watermark pattern
- Chart sizing, margin, background color and image

### Accessibility and Export
📄 **Read:** [references/accessibility-and-export.md](references/accessibility-and-export.md)
- Accessibility (contrast, large fonts, tappable targets)
- RTL (right-to-left) layout support
- Export chart as PNG image (`toImage`)
- Export chart as PDF (`syncfusion_flutter_pdf`)
