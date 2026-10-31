# Markers and Data Labels in Flutter Spark Charts

Markers and data labels enhance spark charts by highlighting specific data points and displaying their values. This guide covers how to configure and customize both features.

## Markers

Markers are visual indicators placed on data points. They are supported by **SfSparkLineChart** and **SfSparkAreaChart** only.

### Enable Markers

Use the `marker` property with `SparkChartMarker` to enable markers:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
)
```

### Marker Display Modes

Control which data points show markers using `displayMode`:

```dart
// Show markers on all points
SparkChartMarker(displayMode: SparkChartMarkerDisplayMode.all)

// Show marker on highest point only
SparkChartMarker(displayMode: SparkChartMarkerDisplayMode.high)

// Show marker on lowest point only
SparkChartMarker(displayMode: SparkChartMarkerDisplayMode.low)

// Show marker on first point only
SparkChartMarker(displayMode: SparkChartMarkerDisplayMode.first)

// Show marker on last point only
SparkChartMarker(displayMode: SparkChartMarkerDisplayMode.last)

// Hide all markers
SparkChartMarker(displayMode: SparkChartMarkerDisplayMode.none)
```

### Display Mode Examples

```dart
// Highlight high and low points with special colors
SfSparkLineChart(
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8],
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
  ),
)

// Show markers on first and last points
SfSparkAreaChart(
  data: <double>[34, 36, 32, 35, 40, 38, 33, 37, 34, 31, 30],
  firstPointColor: Colors.orange,
  lastPointColor: Colors.orange,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
)
```

---

## Marker Shapes

Customize marker appearance with different shapes using the `shape` property:

### Available Shapes

- `circle` (default)
- `diamond`
- `square`
- `triangle`
- `invertedTriangle`

### Shape Examples

```dart
// Circle markers (default)
SparkChartMarker(
  shape: SparkChartMarkerShape.circle,
  displayMode: SparkChartMarkerDisplayMode.all,
)

// Square markers
SparkChartMarker(
  shape: SparkChartMarkerShape.square,
  displayMode: SparkChartMarkerDisplayMode.all,
)

// Diamond markers
SparkChartMarker(
  shape: SparkChartMarkerShape.diamond,
  displayMode: SparkChartMarkerDisplayMode.all,
)

// Triangle markers
SparkChartMarker(
  shape: SparkChartMarkerShape.triangle,
  displayMode: SparkChartMarkerDisplayMode.all,
)

// Inverted triangle markers
SparkChartMarker(
  shape: SparkChartMarkerShape.invertedTriangle,
  displayMode: SparkChartMarkerDisplayMode.all,
)
```

### Complete Shape Example

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  marker: SparkChartMarker(
    shape: SparkChartMarkerShape.square,
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
)
```

---

## Marker Customization

Customize marker colors, borders, and size:

### Color Customization

```dart
SparkChartMarker(
  displayMode: SparkChartMarkerDisplayMode.all,
  color: Colors.blue,              // Marker fill color
  borderColor: Colors.white,       // Marker border color
  borderWidth: 2,                  // Marker border width
)
```

### Complete Customization Example

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  color: Colors.blue,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
    shape: SparkChartMarkerShape.circle,
    color: Colors.red,
    borderColor: Colors.orange,
    borderWidth: 2,
  ),
)
```

### Combining with Special Point Colors

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  // Special point colors override marker color
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  firstPointColor: Colors.orange,
  lastPointColor: Colors.orange,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
    borderColor: Colors.white,
    borderWidth: 2,
  ),
)
```

---

## Data Labels

Data labels display the actual values of data points. They are supported by **SfSparkLineChart**, **SfSparkAreaChart**, and **SfSparkBarChart**.

> **Note:** SfSparkWinLossChart does not support data labels.

### Enable Data Labels

Use the `labelDisplayMode` property to enable data labels:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  labelDisplayMode: SparkChartLabelDisplayMode.all,
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

### Data Label Display Modes

```dart
// Show labels on all points
labelDisplayMode: SparkChartLabelDisplayMode.all

// Show label on highest point only
labelDisplayMode: SparkChartLabelDisplayMode.high

// Show label on lowest point only
labelDisplayMode: SparkChartLabelDisplayMode.low

// Show label on first point only
labelDisplayMode: SparkChartLabelDisplayMode.first

// Show label on last point only
labelDisplayMode: SparkChartLabelDisplayMode.last

// Hide all labels (default)
labelDisplayMode: SparkChartLabelDisplayMode.none
```

### Display Mode Examples

```dart
// Show only high and low values
SfSparkLineChart(
  labelDisplayMode: SparkChartLabelDisplayMode.high,
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)

// Show first and last values
SfSparkBarChart(
  labelDisplayMode: SparkChartLabelDisplayMode.last,
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

---

## Data Label Styling

Customize data label appearance using the `labelStyle` property:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  labelDisplayMode: SparkChartLabelDisplayMode.all,
  labelStyle: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    fontFamily: 'Roboto',
  ),
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
)
```

### TextStyle Properties

```dart
TextStyle(
  fontSize: 14,                  // Label font size
  fontWeight: FontWeight.bold,   // Label font weight
  color: Colors.red,             // Label text color
  fontStyle: FontStyle.italic,   // Label font style
  fontFamily: 'Arial',           // Label font family
  letterSpacing: 1.0,            // Letter spacing
)
```

### Complete Label Styling Example

```dart
SfSparkAreaChart(
  data: <double>[34, 36, 32, 35, 40, 38, 33, 37, 34, 31, 30],
  labelDisplayMode: SparkChartLabelDisplayMode.high,
  labelStyle: TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Colors.red,
  ),
  highPointColor: Colors.red,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
    color: Colors.red,
    borderColor: Colors.white,
    borderWidth: 2,
  ),
)
```

---

## Combining Markers and Data Labels

Use both markers and data labels together for enhanced visualization:

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  // Enable data labels
  labelDisplayMode: SparkChartLabelDisplayMode.high,
  labelStyle: TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.bold,
    color: Colors.red,
  ),
  // Enable markers
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
    shape: SparkChartMarkerShape.circle,
    color: Colors.blue,
    borderColor: Colors.white,
    borderWidth: 2,
  ),
  // Special point colors
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
)
```

---

## Practical Examples

### Example 1: KPI Dashboard Card

```dart
class KPICard extends StatelessWidget {
  final String title;
  final double currentValue;
  final List<double> trendData;

  const KPICard({
    required this.title,
    required this.currentValue,
    required this.trendData,
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
            Text(
              currentValue.toStringAsFixed(1),
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 12),
            Container(
              height: 50,
              child: SfSparkLineChart(
                axisLineWidth: 0,
                data: trendData,
                color: Colors.blue,
                labelDisplayMode: SparkChartLabelDisplayMode.last,
                labelStyle: TextStyle(
                  fontSize: 10,
                  color: Colors.blue,
                ),
                marker: SparkChartMarker(
                  displayMode: SparkChartMarkerDisplayMode.high,
                  color: Colors.red,
                ),
                highPointColor: Colors.red,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

### Example 2: Data Table with Trend Indicators

```dart
class TrendRow extends StatelessWidget {
  final String label;
  final List<double> data;

  const TrendRow({required this.label, required this.data});

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
              labelDisplayMode: SparkChartLabelDisplayMode.last,
              labelStyle: TextStyle(fontSize: 10),
              marker: SparkChartMarker(
                displayMode: SparkChartMarkerDisplayMode.high,
                shape: SparkChartMarkerShape.circle,
                borderWidth: 2,
                borderColor: Colors.white,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
```

### Example 3: Performance Chart with Multiple Indicators

```dart
SfSparkLineChart(
  axisLineWidth: 1,
  axisLineColor: Colors.grey[300],
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  color: Colors.blue,
  width: 2,
  // Highlight special points
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  firstPointColor: Colors.orange,
  lastPointColor: Colors.purple,
  // Show labels for special points
  labelDisplayMode: SparkChartLabelDisplayMode.high,
  labelStyle: TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.bold,
    color: Colors.red,
  ),
  // Show markers for all points
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
    shape: SparkChartMarkerShape.circle,
    borderWidth: 1,
    borderColor: Colors.white,
  ),
)
```

---

## Marker Properties Summary

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `displayMode` | SparkChartMarkerDisplayMode | When to show markers | none |
| `shape` | SparkChartMarkerShape | Marker shape | circle |
| `color` | Color | Marker fill color | null |
| `borderColor` | Color | Marker border color | null |
| `borderWidth` | double | Marker border width | 0 |

## Data Label Properties Summary

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `labelDisplayMode` | SparkChartLabelDisplayMode | When to show labels | none |
| `labelStyle` | TextStyle | Label text style | null |

## Chart Type Support

| Feature | Line | Area | Bar | Win-Loss |
|---------|------|------|-----|----------|
| **Markers** | ✅ | ✅ | ❌ | ❌ |
| **Data Labels** | ✅ | ✅ | ✅ | ❌ |

## Best Practices

1. **Don't Overuse** - Use `displayMode` to show only important points
2. **Readable Labels** - Ensure label font size is appropriate for chart size
3. **Color Contrast** - Use contrasting colors for markers and labels
4. **Combine Wisely** - Use markers and labels together sparingly
5. **Test Responsiveness** - Check appearance on different screen sizes

## Next Steps

- **Trackball**: Learn about interactive tooltips
- **Customization**: Explore more styling options
- **Plot Bands**: Highlight specific value ranges
- **Special Points**: Use color-coded data points
