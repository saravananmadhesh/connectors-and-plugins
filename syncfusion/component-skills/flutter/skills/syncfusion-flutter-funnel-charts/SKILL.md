---
name: syncfusion-flutter-funnel-charts
description: Implements Syncfusion Flutter Funnel Chart (SfFunnelChart) for proportional and stage-based data visualization in Flutter apps. Use when working with conversion funnels, sales pipelines, or process-stage visualizations. This skill covers series configuration, segment exploding, gap ratio, data labels, legends, tooltips, and customization.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Funnel Chart

This skill covers the Syncfusion Flutter **SfFunnelChart** widget for visualizing data in a funnel shape, typically used to represent stages in a process where values progressively decrease.

## When to Use This Skill

Use this skill when you need to:

- **Visualize conversion funnels** showing stages in a sales or marketing process
- **Display hierarchical data** with progressively decreasing values
- **Track process stages** in workflows, pipelines, or sequential processes
- **Analyze conversion rates** across different stages (leads, prospects, customers)
- **Show sales pipelines** with deal progression through various stages
- **Visualize filtering processes** where data is reduced at each step
- **Display recruitment funnels** showing candidate progression through hiring stages
- **Create marketing analytics** showing user journey from awareness to conversion
- **Represent process efficiency** with data reduction at each stage
- **Build analytics dashboards** with funnel visualization for business metrics

## Key Features

- **Funnel visualization** with neck and body segments
- **Interactive selection** with single and multi-selection support
- **Rich tooltips** with customizable appearance and activation modes
- **Data labels** with flexible positioning (inside/outside) and styling
- **Legend support** with customization and toggling capabilities
- **Exploded segments** for emphasis on specific data points
- **Gap between segments** for clear visual separation
- **Animation support** with customizable duration and delay
- **Palette colors** for automatic color application
- **Export capabilities** to PNG images and PDF documents
- **RTL support** for right-to-left languages
- **Accessibility features** with semantic labels and screen reader support
- **Responsive sizing** with configurable width and height
- **Empty point handling** with multiple modes
- **Color mapping** for data-driven colors

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup
- Basic SfFunnelChart implementation
- Adding data source and binding
- First chart creation
- Package dependencies and imports
- Quick start code examples

### Component Overview

📄 **Read:** [references/overview.md](references/overview.md)
- SfFunnelChart widget overview and features
- When to use funnel charts vs other chart types
- Key features and capabilities
- Common use cases and scenarios
- Component architecture

### Funnel Customization

📄 **Read:** [references/funnel-customization.md](references/funnel-customization.md)
- Funnel size configuration (height and width)
- Neck size customization (neckHeight and neckWidth)
- Gap between segments (gapRatio)
- Exploding segments (explode, explodeIndex, explodeOffset)
- Segment borders and opacity
- Palette colors application
- Visual appearance customization

### Series Customization

📄 **Read:** [references/series-customization.md](references/series-customization.md)
- Animation settings (duration and delay)
- Empty point handling (gap, zero, drop, average modes)
- Empty point customization (color, border)
- Color mapping for data points (pointColorMapper)
- Series-level styling options

### Data Labels

📄 **Read:** [references/datalabel.md](references/datalabel.md)
- Enabling and positioning data labels
- Label alignment options (outer, auto, top, bottom, middle)
- Label position (inside/outside)
- Styling data labels (color, font, borders)
- Using series colors for labels
- Hiding labels for zero values
- Overflow mode handling
- Data label templates with builder

### Legend

📄 **Read:** [references/legend.md](references/legend.md)
- Enabling legend (isVisible)
- Customizing legend appearance
- Legend title configuration
- Legend positioning (top, bottom, left, right, auto)
- Legend overflow modes (scroll, wrap)
- Toggling series visibility
- Floating legend with offset
- Legend item templates with builder

### Tooltip

📄 **Read:** [references/tooltip.md](references/tooltip.md)
- Enabling tooltips (TooltipBehavior)
- Customizing tooltip appearance (colors, borders, elevation)
- Tooltip formatting and templates
- Tooltip positioning (auto, pointer)
- Activation modes (tap, double tap, long press)
- Tooltip duration and animation
- Custom tooltip builders

### Selection

📄 **Read:** [references/selection.md](references/selection.md)
- Enabling selection (SelectionBehavior)
- Single and multi-selection
- Customizing selected segments (colors, borders, opacity)
- Customizing unselected segments
- Initial selection on rendering
- Toggle selection behavior
- Programmatic selection with methods

### Chart Title and Appearance

📄 **Read:** [references/chart-title.md](references/chart-title.md)
- Adding and styling chart title
- Title alignment (near, center, far)
- Title background and borders
- Title text styling

📄 **Read:** [references/chart-appearance.md](references/chart-appearance.md)
- Chart sizing (width/height)
- Chart margin configuration
- Background color and image
- Border customization

### Callbacks and Events

📄 **Read:** [references/callbacks.md](references/callbacks.md)
- onLegendItemRender - Customize legend items
- onTooltipRender - Customize tooltip content
- onDataLabelRender - Customize data labels
- onLegendTapped - Handle legend taps
- onSelectionChanged - Handle selection events
- onDataLabelTapped - Handle data label taps
- onPointTap - Handle segment taps
- onPointDoubleTap - Handle double taps
- onPointLongPress - Handle long press
- onChartTouchInteractionUp/Down/Move - Touch interactions
- onRendererCreated - Access series controller

### Common Patterns and Best Practices

📄 **Read:** [references/common-patterns.md](references/common-patterns.md)
- Sales pipeline funnel pattern
- Marketing conversion with colors
- Exploded segment emphasis
- Custom neck sizing techniques
- Dynamic updates with controller
- Pattern combination examples
- Pattern selection guide

### Advanced Features

📄 **Read:** [references/methods.md](references/methods.md)
- FunnelSeriesController methods
- pixelToPoint conversion
- Dynamic data updates
- Programmatic control

📄 **Read:** [references/export-funnel-chart.md](references/export-funnel-chart.md)
- Export chart as PNG image
- Export chart as PDF document
- Image quality and pixel ratio
- PDF document creation

### Localization and Accessibility

📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Screen reader support
- Color contrast requirements
- Large font support
- Touch target sizing
- Accessible interactions

📄 **Read:** [references/right-to-left.md](references/right-to-left.md)
- RTL support for Arabic, Hebrew, etc.
- Directionality widget usage
- RTL locale configuration
- Legend and tooltip RTL behavior

## Quick Start Examples

### Basic Funnel Chart

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class BasicFunnelChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<ChartData> chartData = [
      ChartData('Prospects', 500),
      ChartData('Qualified', 350),
      ChartData('Contacted', 250),
      ChartData('Negotiating', 150),
      ChartData('Won', 100)
    ];
    
    return Scaffold(
      appBar: AppBar(title: Text('Sales Funnel')),
      body: Center(
        child: SfFunnelChart(
          title: ChartTitle(text: 'Sales Pipeline Analysis'),
          legend: Legend(isVisible: true),
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.stage,
            yValueMapper: (ChartData data, _) => data.value,
            dataLabelSettings: DataLabelSettings(isVisible: true)
          )
        )
      )
    );
  }
}

class ChartData {
  ChartData(this.stage, this.value);
  final String stage;
  final double value;
}
```

### Funnel Chart with Customization

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class CustomFunnelChart extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final List<ChartData> chartData = [
      ChartData('Awareness', 1000, Colors.blue),
      ChartData('Interest', 750, Colors.green),
      ChartData('Consideration', 500, Colors.orange),
      ChartData('Intent', 300, Colors.purple),
      ChartData('Purchase', 150, Colors.red)
    ];
    
    return Scaffold(
      appBar: AppBar(title: Text('Marketing Funnel')),
      body: Center(
        child: SfFunnelChart(
          title: ChartTitle(
            text: 'Customer Journey Analysis',
            textStyle: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)
          ),
          legend: Legend(
            isVisible: true,
            position: LegendPosition.bottom
          ),
          tooltipBehavior: TooltipBehavior(enable: true),
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.stage,
            yValueMapper: (ChartData data, _) => data.value,
            pointColorMapper: (ChartData data, _) => data.color,
            // Customize funnel appearance
            height: '80%',
            width: '80%',
            neckHeight: '20%',
            neckWidth: '15%',
            gapRatio: 0.1,
            explode: true,
            explodeIndex: 4,
            explodeOffset: '10%',
            dataLabelSettings: DataLabelSettings(
              isVisible: true,
              labelPosition: ChartDataLabelPosition.inside,
              textStyle: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold
              )
            )
          )
        )
      )
    );
  }
}

class ChartData {
  ChartData(this.stage, this.value, this.color);
  final String stage;
  final double value;
  final Color color;
}
```

### Funnel Chart with Tooltip and Selection

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class InteractiveFunnelChart extends StatefulWidget {
  @override
  _InteractiveFunnelChartState createState() => _InteractiveFunnelChartState();
}

class _InteractiveFunnelChartState extends State<InteractiveFunnelChart> {
  late TooltipBehavior _tooltipBehavior;
  late SelectionBehavior _selectionBehavior;

  @override
  void initState() {
    _tooltipBehavior = TooltipBehavior(
      enable: true,
      format: 'point.x: point.y leads',
      color: Colors.black87,
      textStyle: TextStyle(color: Colors.white)
    );
    
    _selectionBehavior = SelectionBehavior(
      enable: true,
      selectedColor: Colors.deepOrange,
      unselectedColor: Colors.grey[300]
    );
    
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final List<ChartData> chartData = [
      ChartData('Visitors', 5000),
      ChartData('Sign-ups', 3500),
      ChartData('Active Users', 2000),
      ChartData('Premium Users', 800),
      ChartData('Renewals', 500)
    ];
    
    return Scaffold(
      appBar: AppBar(title: Text('Subscription Funnel')),
      body: Center(
        child: SfFunnelChart(
          title: ChartTitle(text: 'User Conversion Funnel'),
          legend: Legend(isVisible: true),
          tooltipBehavior: _tooltipBehavior,
          series: FunnelSeries<ChartData, String>(
            dataSource: chartData,
            xValueMapper: (ChartData data, _) => data.stage,
            yValueMapper: (ChartData data, _) => data.count,
            selectionBehavior: _selectionBehavior,
            dataLabelSettings: DataLabelSettings(
              isVisible: true,
              labelPosition: ChartDataLabelPosition.outside
            )
          )
        )
      )
    );
  }
}

class ChartData {
  ChartData(this.stage, this.count);
  final String stage;
  final double count;
}
```

## Common Patterns

📄 **Read:** [references/common-patterns.md](references/common-patterns.md) for detailed implementation patterns

### Quick Pattern Overview

1. **Sales Pipeline Funnel** - Basic funnel for sales stages with clear progression
2. **Marketing Conversion with Colors** - Color-coded stages with visual hierarchy
3. **Exploded Segment Emphasis** - Highlight critical stages with exploded segments
4. **Custom Neck Sizing** - Adjust neck dimensions for different visual effects
5. **Dynamic Updates** - Real-time data updates using FunnelSeriesController

Each pattern includes complete code examples, when to use them, and best practices. See the [common patterns reference](references/common-patterns.md) for full implementations.

## Key Properties

### SfFunnelChart Essential Properties

- `series` - FunnelSeries configuration with data source
- `title` - Chart title (ChartTitle)
- `legend` - Legend configuration (Legend)
- `tooltipBehavior` - Tooltip settings (TooltipBehavior)
- `palette` - Color palette for series
- `backgroundColor` - Chart background color
- `backgroundImage` - Background image
- `borderColor` - Chart border color
- `borderWidth` - Chart border width
- `margin` - Chart margin (EdgeInsets)
- `enableMultiSelection` - Enable multiple segment selection
- `onSelectionChanged` - Selection change callback
- `onLegendItemRender` - Legend item render callback
- `onTooltipRender` - Tooltip render callback
- `onDataLabelRender` - Data label render callback
- `onLegendTapped` - Legend tap callback
- `onDataLabelTapped` - Data label tap callback
- `onChartTouchInteractionUp/Down/Move` - Touch interaction callbacks

### FunnelSeries Essential Properties

- `dataSource` - Data source list
- `xValueMapper` - Maps x-axis values from data
- `yValueMapper` - Maps y-axis values from data
- `pointColorMapper` - Maps colors from data
- `name` - Series name for legend
- `height` - Funnel height as percentage (e.g., '80%')
- `width` - Funnel width as percentage (e.g., '80%')
- `neckHeight` - Neck height as percentage (e.g., '20%')
- `neckWidth` - Neck width as percentage (e.g., '15%')
- `gapRatio` - Gap between segments (0 to 1)
- `explode` - Enable exploding segments
- `explodeIndex` - Index of segment to explode
- `explodeOffset` - Explode distance as percentage
- `opacity` - Series opacity (0 to 1)
- `borderWidth` - Segment border width
- `borderColor` - Segment border color
- `dataLabelSettings` - Data label configuration
- `selectionBehavior` - Selection behavior settings
- `enableTooltip` - Enable tooltip for series
- `animationDuration` - Animation duration in milliseconds
- `animationDelay` - Animation delay in milliseconds
- `emptyPointSettings` - Empty point handling
- `initialSelectedDataIndexes` - Initial selection indices
- `onPointTap` - Point tap callback
- `onPointDoubleTap` - Point double tap callback
- `onPointLongPress` - Point long press callback
- `onRendererCreated` - Renderer created callback

### DataLabelSettings Properties

- `isVisible` - Show/hide data labels
- `labelPosition` - Position (inside/outside)
- `labelAlignment` - Alignment (outer, auto, top, bottom, middle)
- `textStyle` - Text styling
- `color` - Label background color
- `borderColor` - Label border color
- `borderWidth` - Label border width
- `borderRadius` - Label corner radius
- `margin` - Label margin
- `opacity` - Label opacity
- `angle` - Label rotation angle
- `useSeriesColor` - Use series color for label background
- `showZeroValue` - Show labels for zero values
- `overflowMode` - Overflow handling (none, trim, hide, shift)

### Legend Properties

- `isVisible` - Show/hide legend
- `position` - Position (auto, top, bottom, left, right)
- `orientation` - Orientation (auto, horizontal, vertical)
- `title` - Legend title (LegendTitle)
- `overflowMode` - Overflow mode (scroll, wrap)
- `toggleSeriesVisibility` - Enable toggling series visibility
- `backgroundColor` - Legend background color
- `borderColor` - Legend border color
- `borderWidth` - Legend border width
- `opacity` - Legend opacity
- `padding` - Legend padding
- `iconHeight` - Legend icon height
- `iconWidth` - Legend icon width
- `offset` - Floating legend offset

### TooltipBehavior Properties

- `enable` - Enable tooltip
- `color` - Tooltip background color
- `borderColor` - Tooltip border color
- `borderWidth` - Tooltip border width
- `opacity` - Tooltip opacity
- `duration` - Display duration in milliseconds
- `animationDuration` - Animation duration
- `elevation` - Tooltip elevation/shadow
- `format` - Tooltip text format
- `header` - Tooltip header text
- `tooltipPosition` - Position (auto, pointer)
- `activationMode` - Activation mode (tap, doubleTap, longPress, none)
- `builder` - Custom tooltip builder

### SelectionBehavior Properties

- `enable` - Enable selection
- `selectedColor` - Selected segment color
- `unselectedColor` - Unselected segment color
- `selectedBorderColor` - Selected segment border color
- `selectedBorderWidth` - Selected segment border width
- `unselectedBorderColor` - Unselected segment border color
- `unselectedBorderWidth` - Unselected segment border width
- `selectedOpacity` - Selected segment opacity
- `unselectedOpacity` - Unselected segment opacity
- `toggleSelection` - Enable toggle selection

## Common Use Cases

1. **Sales Pipeline** - Track deals through sales stages (leads → closed won)
2. **Marketing Funnel** - Visualize customer journey (awareness → purchase)
3. **Conversion Analysis** - Show user conversion rates across process stages
4. **Recruitment Process** - Display candidate progression through hiring stages
5. **E-commerce Funnel** - Track shopping cart abandonment and checkout flow
6. **Lead Management** - Monitor lead qualification and conversion process
7. **Subscription Funnel** - Analyze user onboarding and subscription flow
8. **Web Analytics** - Display visitor engagement and conversion metrics
9. **Process Efficiency** - Visualize workflow bottlenecks and drop-off points
10. **Customer Journey** - Map customer touchpoints from awareness to loyalty