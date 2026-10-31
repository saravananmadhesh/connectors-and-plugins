# Chart Types in Flutter Spark Charts

Syncfusion Flutter Spark Charts provides four distinct chart types, each optimized for different data visualization scenarios.

## Line Chart (SfSparkLineChart)

Line charts are ideal for identifying patterns, trends, and seasonal effects over time. They display continuous data as a connected line.

### Basic Line Chart

```dart
SfSparkLineChart(
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
)
```

### Line Chart Properties

- `color` - Line color
- `width` - Line thickness (default: 2)
- `dashArray` - Dash pattern for line (e.g., [5, 3])
- `marker` - Marker settings
- `labelDisplayMode` - Data label display mode
- `labelStyle` - Data label text style

### Line Chart with Customization

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  color: Colors.blue,
  width: 3,
  highPointColor: Colors.red,
  lowPointColor: Colors.red,
  firstPointColor: Colors.orange,
  lastPointColor: Colors.orange,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
)
```

### Dashed Line Chart

Create dashed lines using the `dashArray` property. Odd values represent dash length, even values represent gap length:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  dashArray: <double>[5, 3], 
  color: Colors.blue,
)
```

### When to Use Line Charts

- Stock price trends
- Temperature changes over time
- Sales trends
- Performance metrics
- Any continuous time-series data

---

## Area Chart (SfSparkAreaChart)

Area charts emphasize magnitude and cumulative changes by filling the area under the line. They're ideal when communicating the volume of change is more important than individual values.

### Basic Area Chart

```dart
SfSparkAreaChart(
  data: <double>[34, 36, 32, 35, 40, 38, 33, 37, 34, 31, 30],
)
```

### Area Chart Properties

- `color` - Fill color for the area
- `borderColor` - Border line color
- `borderWidth` - Border line width
- `marker` - Marker settings
- `labelDisplayMode` - Data label display mode
- `labelStyle` - Data label text style

### Area Chart with Border

```dart
SfSparkAreaChart(
  data: <double>[34, 36, 32, 35, 40, 38, 33, 37, 34, 31, 30],
  color: Colors.blue.withOpacity(0.3),
  borderColor: Colors.red.withOpacity(0.8),
  borderWidth: 2,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
  ),
)
```

### When to Use Area Charts

- Volume indicators
- Cumulative metrics
- Resource utilization
- Filled trend displays
- Emphasizing data magnitude

---

## Bar Chart (SfSparkBarChart)

Bar charts display discrete values as vertical bars, making them ideal for comparing individual data points or categories.

### Basic Bar Chart

```dart
SfSparkBarChart(
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

### Bar Chart Properties

- `color` - Fill color for bars
- `borderColor` - Border color for bars
- `borderWidth` - Border width for bars
- `labelDisplayMode` - Data label display mode
- `labelStyle` - Data label text style

### Bar Chart with Special Points

```dart
SfSparkBarChart(
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  firstPointColor: Colors.orange,
  lastPointColor: Colors.orange,
  negativePointColor: Colors.purple,
)
```

### When to Use Bar Charts

- Monthly comparisons
- Category-wise data
- Discrete measurements
- Individual value comparison
- Sales by region/product

---

## Win-Loss Chart (SfSparkWinLossChart)

Win-loss charts visualize binary outcomes, showing whether each value is positive (win), negative (loss), or zero (tie). Each value is represented as a bar of equal height.

### Basic Win-Loss Chart

```dart
SfSparkWinLossChart(
  data: <double>[12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10],
)
```

### Win-Loss Chart Properties

- `color` - Color for positive values (wins)
- `negativePointColor` - Color for negative values (losses)
- `tiePointColor` - Color for zero values (ties)
- `borderColor` - Border color for bars
- `borderWidth` - Border width for bars

### Win-Loss Chart with Custom Colors

```dart
SfSparkWinLossChart(
  data: <double>[12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10],
  color: Colors.green,
  negativePointColor: Colors.red,
  tiePointColor: Colors.grey,
  borderWidth: 1,
  borderColor: Colors.black,
)
```

### Data Interpretation

- **Positive values** (> 0) - Displayed as "wins" with `color`
- **Negative values** (< 0) - Displayed as "losses" with `negativePointColor`
- **Zero values** (= 0) - Displayed as "ties" with `tiePointColor`

### When to Use Win-Loss Charts

- Game win-loss records
- Success/failure metrics
- Pass/fail results
- Binary performance indicators
- On/off states over time

---

## Common Properties Across All Types

All spark chart types share these properties:

### Special Point Colors

```dart
highPointColor: Colors.red,        // Highest value
lowPointColor: Colors.green,        // Lowest value
firstPointColor: Colors.orange,     // First data point
lastPointColor: Colors.orange,      // Last data point
negativePointColor: Colors.purple,  // Negative values
```

### Axis Customization

```dart
axisCrossesAt: 0,                   // Axis line position
axisLineColor: Colors.grey,         // Axis line color
axisLineWidth: 1,                   // Axis line width (0 to hide)
axisLineDashArray: <double>[5, 3],  // Axis line dash pattern
```

### Additional Features

```dart
isInversed: false,                  // Invert chart vertically
trackball: SparkChartTrackball(),   // Interactive trackball
plotBand: SparkChartPlotBand(),     // Highlight Y-axis range
```

## Choosing the Right Chart Type

| Scenario | Recommended Chart Type |
|----------|------------------------|
| Show continuous trends | Line Chart |
| Emphasize magnitude | Area Chart |
| Compare discrete values | Bar Chart |
| Display win-loss records | Win-Loss Chart |
| Stock prices | Line Chart |
| Resource usage | Area Chart |
| Monthly sales | Bar Chart |
| Game results | Win-Loss Chart |
| Temperature trends | Line Chart |
| Volume indicators | Area Chart |

## Next Steps

- **Data Binding**: Learn how to bind custom data sources
- **Markers**: Add markers to line and area charts
- **Customization**: Style charts with colors and borders
- **Trackball**: Enable interactive tooltips
- **Plot Bands**: Highlight specific value ranges
