# Customization and Styling in Flutter Spark Charts

This comprehensive guide covers all aspects of customizing and styling Syncfusion Flutter Spark Charts, from basic colors to advanced visual configurations.

## Chart Colors

### Primary Chart Color

Set the main color for charts using the `color` property:

```dart
// Line chart color
SfSparkLineChart(
  data: data,
  color: Colors.blue,
)

// Area chart fill color
SfSparkAreaChart(
  data: data,
  color: Colors.blue.withOpacity(0.3),
)

// Bar chart color
SfSparkBarChart(
  data: data,
  color: Colors.green,
)

// Win-loss chart color (positive values)
SfSparkWinLossChart(
  data: data,
  color: Colors.green,
)
```

### Color with Opacity

Use semi-transparent colors for better visual appeal:

```dart
SfSparkAreaChart(
  data: data,
  color: Colors.blue.withOpacity(0.3),     
  borderColor: Colors.blue,                
  borderWidth: 2,
)
```

---

## Special Point Colors

Highlight specific data points with custom colors:

### High Point Color

Color the highest value point:

```dart
SfSparkLineChart(
  data: data,
  highPointColor: Colors.red,
)
```

### Low Point Color

Color the lowest value point:

```dart
SfSparkLineChart(
  data: data,
  lowPointColor: Colors.green,
)
```

### First and Last Point Colors

Color the first and last data points:

```dart
SfSparkLineChart(
  data: data,
  firstPointColor: Colors.orange,
  lastPointColor: Colors.purple,
)
```

### Negative Point Color

Color all negative values:

```dart
SfSparkBarChart(
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
  negativePointColor: Colors.red,
)
```

### Tie Point Color (Win-Loss Only)

Color zero values in win-loss charts:

```dart
SfSparkWinLossChart(
  data: <double>[12, 15, -10, 13, 0, 6, -12, 17, 13, 0, 8, -10],
  color: Colors.green,
  negativePointColor: Colors.red,
  tiePointColor: Colors.grey,
)
```

### Complete Special Points Example

```dart
SfSparkLineChart(
  axisLineWidth: 0,
  data: <double>[5, 6, 5, 7, 4, 3, 9, 5, 6, 5, 7, 8, 4, 5, 3, 4, 11, 10, 2, 12, 4, 7, 6, 8],
  color: Colors.blue,
  width: 3,
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  firstPointColor: Colors.orange,
  lastPointColor: Colors.purple,
  negativePointColor: Colors.pink,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.all,
  ),
)
```

---

## Border Styling

### Area Chart Border

Add borders to area charts:

```dart
SfSparkAreaChart(
  data: data,
  color: Colors.blue.withOpacity(0.3),
  borderColor: Colors.blue,
  borderWidth: 2,
)
```

### Bar Chart Border

Add borders to bar charts:

```dart
SfSparkBarChart(
  data: data,
  color: Colors.green,
  borderColor: Colors.darkGreen,
  borderWidth: 1,
)
```

### Win-Loss Chart Border

Add borders to win-loss charts:

```dart
SfSparkWinLossChart(
  data: data,
  color: Colors.green,
  negativePointColor: Colors.red,
  borderColor: Colors.black,
  borderWidth: 1,
)
```

---

## Line Styling

### Line Width

Control line thickness in line charts:

```dart
SfSparkLineChart(
  data: data,
  width: 3,              
  color: Colors.blue,
)
```

### Dashed Lines

Create dashed line patterns:

```dart
SfSparkLineChart(
  data: data,
  dashArray: <double>[5, 3],    
  color: Colors.blue,
)
```

### Dashed Line Patterns

```dart
// Short dashes
dashArray: <double>[3, 2]

// Long dashes
dashArray: <double>[10, 5]

// Dot pattern
dashArray: <double>[2, 2]

// Dash-dot pattern
dashArray: <double>[8, 3, 2, 3]
```

---

## Axis Customization

### Axis Line Color and Width

```dart
SfSparkLineChart(
  data: data,
  axisLineColor: Colors.grey,
  axisLineWidth: 1,
)
```

### Hide Axis Line

```dart
SfSparkLineChart(
  data: data,
  axisLineWidth: 0,     
)
```

### Axis Line Position

```dart
SfSparkLineChart.custom(
  dataCount: data.length,
  xValueMapper: (index) => data[index].x,
  yValueMapper: (index) => data[index].y,
  axisCrossesAt: 50,    
  axisLineWidth: 1,
  axisLineColor: Colors.grey,
)
```

### Dashed Axis Line

```dart
SfSparkLineChart(
  data: data,
  axisLineWidth: 1,
  axisLineColor: Colors.grey,
  axisLineDashArray: <double>[5, 3],
)
```

---

## Chart Inversion

Flip the chart vertically:

```dart
SfSparkLineChart(
  data: data,
  isInversed: true,     // Invert chart
  color: Colors.blue,
)
```

### Inversion Use Cases

```dart
// Normal chart (low to high, bottom to top)
SfSparkLineChart(
  data: data,
  isInversed: false,
)

// Inverted chart (high to low, top to bottom)
// Useful for: depth charts, ranking (lower is better), temperature drop
SfSparkLineChart(
  data: data,
  isInversed: true,
)
```

---

## Complete Styling Examples

### Example 1: Professional Line Chart

```dart
SfSparkLineChart(
  axisLineWidth: 1,
  axisLineColor: Colors.grey[300],
  axisCrossesAt: 0,
  data: data,
  color: Colors.blue,
  width: 2,
  highPointColor: Colors.red,
  lowPointColor: Colors.green,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
    color: Colors.red,
    borderColor: Colors.white,
    borderWidth: 2,
    shape: SparkChartMarkerShape.circle,
  ),
  trackball: SparkChartTrackball(
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
    borderWidth: 2,
    color: Colors.blue,
    activationMode: SparkChartActivationMode.tap,
  ),
  plotBand: SparkChartPlotBand(
    start: 60,
    end: 80,
    color: Colors.green.withOpacity(0.15),
    borderColor: Colors.green,
    borderWidth: 1,
  ),
)
```

### Example 2: Styled Area Chart

```dart
SfSparkAreaChart(
  data: data,
  color: Colors.purple.withOpacity(0.2),
  borderColor: Colors.purple,
  borderWidth: 2,
  highPointColor: Colors.purple,
  marker: SparkChartMarker(
    displayMode: SparkChartMarkerDisplayMode.high,
    color: Colors.purple,
    borderColor: Colors.white,
    borderWidth: 2,
    shape: SparkChartMarkerShape.diamond,
  ),
  axisLineWidth: 0,
)
```

### Example 3: Color-Coded Bar Chart

```dart
SfSparkBarChart(
  data: <double>[10, 6, 8, -5, 11, 5, -2, 7, -3, 6, 8, 10],
  color: Colors.blue,
  highPointColor: Colors.green,
  lowPointColor: Colors.orange,
  negativePointColor: Colors.red,
  firstPointColor: Colors.purple,
  lastPointColor: Colors.purple,
  borderColor: Colors.black,
  borderWidth: 1,
)
```

### Example 4: Win-Loss with Styling

```dart
SfSparkWinLossChart(
  data: <double>[12, 15, -10, 13, 0, 6, -12, 17, 13, 0, 8, -10],
  color: Colors.green,
  negativePointColor: Colors.red,
  tiePointColor: Colors.grey,
  borderColor: Colors.black54,
  borderWidth: 1,
  axisLineWidth: 1,
  axisLineColor: Colors.grey[400],
)
```

---

## Theme-Based Styling

### Light Theme

```dart
class LightThemeSparkChart extends StatelessWidget {
  final List<double> data;

  const LightThemeSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      data: data,
      color: Colors.blue[600],
      width: 2,
      highPointColor: Colors.red[600],
      lowPointColor: Colors.green[600],
      axisLineWidth: 1,
      axisLineColor: Colors.grey[300],
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        color: Colors.red[600],
        borderColor: Colors.white,
        borderWidth: 2,
      ),
    );
  }
}
```

### Dark Theme

```dart
class DarkThemeSparkChart extends StatelessWidget {
  final List<double> data;

  const DarkThemeSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    return SfSparkLineChart(
      data: data,
      color: Colors.blue[300],
      width: 2,
      highPointColor: Colors.red[300],
      lowPointColor: Colors.green[300],
      axisLineWidth: 1,
      axisLineColor: Colors.grey[700],
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        color: Colors.red[300],
        borderColor: Colors.grey[900],
        borderWidth: 2,
      ),
    );
  }
}
```

### Adaptive Theme

```dart
class AdaptiveSparkChart extends StatelessWidget {
  final List<double> data;

  const AdaptiveSparkChart({required this.data});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return SfSparkLineChart(
      data: data,
      color: isDark ? Colors.blue[300] : Colors.blue[600],
      width: 2,
      highPointColor: isDark ? Colors.red[300] : Colors.red[600],
      lowPointColor: isDark ? Colors.green[300] : Colors.green[600],
      axisLineWidth: 1,
      axisLineColor: isDark ? Colors.grey[700] : Colors.grey[300],
      marker: SparkChartMarker(
        displayMode: SparkChartMarkerDisplayMode.high,
        borderWidth: 2,
        borderColor: isDark ? Colors.grey[900] : Colors.white,
      ),
    );
  }
}
```

---

## Color Palette Examples

### Blue Palette

```dart
SfSparkLineChart(
  data: data,
  color: Color(0xFF2196F3),
  highPointColor: Color(0xFF1976D2),
  lowPointColor: Color(0xFF64B5F6),
  firstPointColor: Color(0xFF0D47A1),
  lastPointColor: Color(0xFF0D47A1),
)
```

### Green Palette

```dart
SfSparkAreaChart(
  data: data,
  color: Color(0xFF4CAF50).withOpacity(0.3),
  borderColor: Color(0xFF4CAF50),
  borderWidth: 2,
  highPointColor: Color(0xFF388E3C),
  lowPointColor: Color(0xFF81C784),
)
```

### Red Palette

```dart
SfSparkBarChart(
  data: data,
  color: Color(0xFFF44336),
  highPointColor: Color(0xFFD32F2F),
  lowPointColor: Color(0xFFE57373),
  negativePointColor: Color(0xFFFF5252),
)
```

### Purple Palette

```dart
SfSparkLineChart(
  data: data,
  color: Color(0xFF9C27B0),
  highPointColor: Color(0xFF7B1FA2),
  lowPointColor: Color(0xFFBA68C8),
  width: 2,
)
```

---

## Styling Properties Summary

### Common Properties

| Property | Type | Description |
|----------|------|-------------|
| `color` | Color | Primary chart color |
| `highPointColor` | Color | Highest point color |
| `lowPointColor` | Color | Lowest point color |
| `firstPointColor` | Color | First point color |
| `lastPointColor` | Color | Last point color |
| `negativePointColor` | Color | Negative values color |
| `axisLineWidth` | double | Axis line width (0 to hide) |
| `axisLineColor` | Color | Axis line color |
| `axisLineDashArray` | List<double> | Axis line dash pattern |
| `isInversed` | bool | Invert chart vertically |

### Line Chart Specific

| Property | Type | Description |
|----------|------|-------------|
| `width` | double | Line thickness |
| `dashArray` | List<double> | Line dash pattern |

### Area/Bar/Win-Loss Specific

| Property | Type | Description |
|----------|------|-------------|
| `borderColor` | Color | Border color |
| `borderWidth` | double | Border width |

### Win-Loss Specific

| Property | Type | Description |
|----------|------|-------------|
| `tiePointColor` | Color | Zero values color |

---

## Best Practices

1. **Use Consistent Colors** - Maintain color consistency across charts
2. **Consider Accessibility** - Ensure sufficient color contrast
3. **Meaningful Colors** - Red for negative/bad, green for positive/good
4. **Semi-Transparent Fills** - Use opacity 0.2-0.4 for area charts
5. **Appropriate Line Width** - 2-3px for visibility without overwhelming
6. **Hide Unnecessary Elements** - Set axisLineWidth to 0 for cleaner look
7. **Test Dark Mode** - Verify appearance in both light and dark themes
8. **Subtle Borders** - Use borderWidth of 1-2px for definition
9. **Special Points Sparingly** - Don't overuse special point colors
10. **Match Brand Colors** - Align with application's color scheme

## Next Steps

- **Markers**: Add visual indicators to data points
- **Data Labels**: Display values on charts
- **Trackball**: Enable interactive tooltips
- **Plot Bands**: Highlight specific value ranges
