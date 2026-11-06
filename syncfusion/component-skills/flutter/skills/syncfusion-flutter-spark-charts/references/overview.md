# Flutter Spark Charts Overview

Syncfusion Flutter Spark Charts (also known as Micro Charts) are lightweight, condensed chart widgets designed to display data trends in a simple, compact format without traditional chart elements like axes or coordinates.

## What are Spark Charts?

Spark charts present the general shape of data variation in a simple and highly condensed way. They are typically small, word-sized graphics that can be embedded inline with text or placed in tight spaces like table cells, dashboards, or cards.

## Key Features

### 1. Four Chart Types

Spark Charts support four different visualization types:

- **Line Chart** - For identifying patterns and trends over time
- **Area Chart** - For emphasizing magnitude of changes
- **Bar Chart** - For discrete value comparisons
- **Win-Loss Chart** - For binary outcome visualization

### 2. Marker Support

Line and area charts support markers to highlight specific data points:

- Customizable shapes (circle, diamond, square, triangle, inverted triangle)
- Display modes (all, high, low, first, last points)
- Custom colors and borders

### 3. Trackball

Interactive trackball displays additional information on touch:

- Tap, double-tap, or long-press activation
- Customizable tooltip appearance
- Works with all chart types

### 4. Data Labels

Display data point values directly on the chart:

- Multiple display modes
- Customizable text styles
- Available for line, area, and bar charts

### 5. Plot Bands

Highlight specific value ranges on the Y-axis:

- Customizable start and end values
- Color and border styling
- Useful for threshold visualization

### 6. Special Point Colors

Highlight important data points with custom colors:

- High point color
- Low point color
- First point color
- Last point color
- Negative point color
- Tie point color (Win-Loss chart only)

### 7. Lightweight and Fast

Spark charts are optimized for:

- Minimal memory footprint
- Fast rendering
- Compact display
- Inline embedding

## When to Use Spark Charts

### Use Spark Charts When:

- **Space is limited** - Dashboards, cards, table cells
- **Quick insights needed** - Trends at a glance
- **Simple data visualization** - No complex analysis required
- **Inline display** - Embedded with text or data
- **Mobile interfaces** - Compact mobile-friendly charts
- **Multiple comparisons** - Many small charts side by side

### Don't Use Spark Charts When:

- **Detailed analysis required** - Use full-featured charts
- **Axis labels needed** - Spark charts have no axis labels
- **Multiple series** - Spark charts show single series only
- **Interactive exploration** - Use full charts with zoom, pan
- **Precise values needed** - Use data grids or full charts

## Chart Type Comparison

| Feature | Line | Area | Bar | Win-Loss |
|---------|------|------|-----|----------|
| **Markers** | ✅ | ✅ | ❌ | ❌ |
| **Data Labels** | ✅ | ✅ | ✅ | ❌ |
| **Dashed Style** | ✅ | ❌ | ❌ | ❌ |
| **Border** | Line only | ✅ | ✅ | ✅ |
| **Special Points** | ✅ | ✅ | ✅ | ✅ (includes tie) |
| **Best For** | Continuous trends | Magnitude emphasis | Discrete data | Binary outcomes |

## Typical Use Cases

### Dashboard KPIs

Display key performance indicators with trend sparklines:

```dart
// Revenue trend in KPI card
SfSparkLineChart(
  axisLineWidth: 0,
  data: monthlyRevenue,
  color: Colors.blue,
)
```

### Data Tables

Add inline sparklines to table rows:

```dart
// Sales trend per product
Row(
  children: [
    Text(productName),
    Expanded(
      child: SfSparkLineChart(
        data: salesData,
        axisLineWidth: 0,
      ),
    ),
  ],
)
```

### Performance Metrics

Visualize win-loss records or success rates:

```dart
// Game win-loss record
SfSparkWinLossChart(
  data: gameResults,
  color: Colors.green,
  negativePointColor: Colors.red,
  tiePointColor: Colors.grey,
)
```

### Compact Visualizations

Create space-efficient dashboard widgets:

```dart
// Temperature trends
Container(
  height: 50,
  child: SfSparkAreaChart(
    data: temperatureData,
    color: Colors.orange.withOpacity(0.3),
    borderColor: Colors.orange,
    borderWidth: 2,
  ),
)
```

## Architecture

Spark charts are built on Flutter's CustomPainter and support:

- **Hot reload** - Instant updates during development
- **Responsive layout** - Adapts to container size
- **Theme integration** - Works with Flutter themes
- **Accessibility** - Font scaling and contrast support

## Next Steps

- **Getting Started**: Learn basic setup and implementation
- **Chart Types**: Explore each chart type in detail
- **Customization**: Style charts with colors, borders, markers
- **Data Binding**: Work with custom data sources
- **Advanced Features**: Implement trackball, plot bands, and special points
