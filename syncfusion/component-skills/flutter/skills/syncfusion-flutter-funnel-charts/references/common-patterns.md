# Common Patterns for Flutter Funnel Chart

This document provides common implementation patterns for Syncfusion Flutter Funnel Chart (SfFunnelChart) based on real-world use cases.

## Pattern 1: Sales Pipeline Funnel

A typical pattern for visualizing sales pipeline stages with progressive values.

```dart
// Common pattern for visualizing sales pipeline stages
SfFunnelChart(
  title: ChartTitle(text: 'Sales Pipeline Q1 2026'),
  legend: Legend(isVisible: true),
  series: FunnelSeries<SalesData, String>(
    dataSource: [
      SalesData('Leads', 1200),
      SalesData('Qualified', 800),
      SalesData('Proposal', 400),
      SalesData('Negotiation', 200),
      SalesData('Closed Won', 150)
    ],
    xValueMapper: (SalesData data, _) => data.stage,
    yValueMapper: (SalesData data, _) => data.count,
    dataLabelSettings: DataLabelSettings(
      isVisible: true,
      labelAlignment: ChartDataLabelAlignment.middle
    )
  )
)
```

**When to Use:**
- Sales pipeline visualization
- Deal progression tracking
- Revenue forecasting displays
- Sales performance dashboards

**Key Features:**
- Clear stage progression
- Middle-aligned labels for readability
- Legend for stage identification

---

## Pattern 2: Marketing Conversion Funnel with Colors

Data-driven colors for different conversion stages to provide visual hierarchy.

```dart
// Data-driven colors for different conversion stages
final List<ConversionData> conversions = [
  ConversionData('Impressions', 100000, Colors.blue[200]!),
  ConversionData('Clicks', 10000, Colors.blue[400]!),
  ConversionData('Landing Page', 5000, Colors.blue[600]!),
  ConversionData('Sign Up', 1000, Colors.blue[800]!),
  ConversionData('Purchase', 250, Colors.blue[900]!)
];

SfFunnelChart(
  series: FunnelSeries<ConversionData, String>(
    dataSource: conversions,
    xValueMapper: (ConversionData data, _) => data.stage,
    yValueMapper: (ConversionData data, _) => data.count,
    pointColorMapper: (ConversionData data, _) => data.color,
    gapRatio: 0.1,
    dataLabelSettings: DataLabelSettings(
      isVisible: true,
      useSeriesColor: true,
      textStyle: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)
    )
  )
)
```

**When to Use:**
- Marketing campaign analysis
- User journey visualization
- Conversion rate optimization
- A/B testing results

**Key Features:**
- Color gradient showing progression
- Gap between segments for clarity
- Series colors applied to labels
- White text for contrast

---

## Pattern 3: Exploded Segment for Emphasis

Highlight specific stages with exploded segments to draw attention to key metrics.

```dart
// Highlight specific stage with exploded segment
SfFunnelChart(
  series: FunnelSeries<ProcessData, String>(
    dataSource: processStages,
    xValueMapper: (ProcessData data, _) => data.name,
    yValueMapper: (ProcessData data, _) => data.value,
    // Explode the final stage to emphasize completion
    explode: true,
    explodeIndex: 4,  // Last segment
    explodeOffset: '10%',
    height: '85%',
    width: '85%',
    neckHeight: '25%',
    neckWidth: '20%'
  )
)
```

**When to Use:**
- Highlighting critical stages
- Emphasizing completion rates
- Drawing attention to problem areas
- Showcasing achievements

**Key Features:**
- Exploded segment at specific index
- Custom funnel and neck dimensions
- Visual emphasis on key metrics
- Effective for presentations

**Configuration Tips:**
- Use `explodeIndex` to target specific segment (0-based index)
- Adjust `explodeOffset` percentage for desired separation
- Consider exploding the smallest segment for visibility
- Use with tooltip for additional context

---

## Pattern 4: Custom Neck Size for Specific Visualization

Customize neck dimensions to create different visual effects based on data characteristics.

```dart
// Customize neck dimensions for better visual representation
SfFunnelChart(
  series: FunnelSeries<ChartData, String>(
    dataSource: chartData,
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y,
    // Wide neck for gradual narrowing effect
    neckHeight: '40%',
    neckWidth: '30%',
    height: '90%',
    width: '90%',
    borderWidth: 2,
    borderColor: Colors.white
  )
)
```

**When to Use:**
- Data with gradual decrease
- Process with consistent drop-off
- Visualizing smooth transitions
- Aesthetic customization needs

**Neck Size Guidelines:**
- **Wide Neck (30-40% width)**: Gradual transition, smooth flow
- **Narrow Neck (10-20% width)**: Sharp funnel effect, dramatic filtering
- **Tall Neck (30-50% height)**: Emphasize final stages
- **Short Neck (10-20% height)**: More pyramid-like appearance

**Visual Effects:**
- Wider neck = More gradual funnel
- Narrower neck = More dramatic filtering effect
- Taller neck = Emphasis on bottom stages
- White borders for segment separation

---

## Pattern 5: Dynamic Update with Controller

Programmatic control for real-time data updates and interactive features.

```dart
// Programmatic control and updates
FunnelSeriesController? seriesController;

SfFunnelChart(
  series: FunnelSeries<ChartData, String>(
    dataSource: chartData,
    onRendererCreated: (FunnelSeriesController controller) {
      seriesController = controller;
    },
    xValueMapper: (ChartData data, _) => data.x,
    yValueMapper: (ChartData data, _) => data.y
  )
)

// Later, update data dynamically
void updateData() {
  chartData.add(ChartData('New Stage', 75));
  seriesController?.updateDataSource(
    addedDataIndexes: [chartData.length - 1]
  );
}

// Remove data
void removeData(int index) {
  chartData.removeAt(index);
  seriesController?.updateDataSource(
    removedDataIndexes: [index]
  );
}

// Update existing data
void updateExistingData(int index, ChartData newData) {
  chartData[index] = newData;
  seriesController?.updateDataSource(
    updatedDataIndexes: [index]
  );
}
```

**When to Use:**
- Real-time dashboards
- Live data updates
- Interactive data management
- User-driven data modifications

**Key Methods:**
- `onRendererCreated`: Capture controller reference
- `updateDataSource`: Apply data changes
- `addedDataIndexes`: Specify new data points
- `removedDataIndexes`: Specify deleted points
- `updatedDataIndexes`: Specify modified points

**Best Practices:**
1. Always check controller is not null before use
2. Update data source first, then call updateDataSource
3. Batch multiple changes for better performance
4. Use appropriate index arrays for change type
5. Disable animation for frequent updates (set `animationDuration: 0`)

---

## Combining Patterns

You can combine multiple patterns for advanced visualizations:

### Example: Enhanced Sales Funnel

```dart
class EnhancedSalesFunnel extends StatefulWidget {
  @override
  _EnhancedSalesFunnelState createState() => _EnhancedSalesFunnelState();
}

class _EnhancedSalesFunnelState extends State<EnhancedSalesFunnel> {
  late TooltipBehavior _tooltipBehavior;
  late SelectionBehavior _selectionBehavior;
  FunnelSeriesController? _controller;
  
  List<SalesStage> stages = [
    SalesStage('Leads', 1200, Colors.blue[200]!),
    SalesStage('Qualified', 800, Colors.blue[400]!),
    SalesStage('Proposal', 400, Colors.blue[600]!),
    SalesStage('Negotiation', 200, Colors.blue[800]!),
    SalesStage('Closed Won', 150, Colors.blue[900]!),
  ];

  @override
  void initState() {
    _tooltipBehavior = TooltipBehavior(
      enable: true,
      format: 'point.x: point.y deals\nConversion: point.y%'
    );
    
    _selectionBehavior = SelectionBehavior(
      enable: true,
      selectedColor: Colors.orange,
      unselectedOpacity: 0.5
    );
    
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sales Pipeline'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _refreshData,
          )
        ],
      ),
      body: SfFunnelChart(
        title: ChartTitle(
          text: 'Sales Pipeline Analysis',
          textStyle: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)
        ),
        legend: Legend(
          isVisible: true,
          position: LegendPosition.bottom
        ),
        tooltipBehavior: _tooltipBehavior,
        series: FunnelSeries<SalesStage, String>(
          dataSource: stages,
          xValueMapper: (SalesStage stage, _) => stage.name,
          yValueMapper: (SalesStage stage, _) => stage.count,
          pointColorMapper: (SalesStage stage, _) => stage.color,
          selectionBehavior: _selectionBehavior,
          explode: true,
          explodeIndex: 4,
          explodeOffset: '8%',
          gapRatio: 0.08,
          neckHeight: '25%',
          neckWidth: '20%',
          dataLabelSettings: DataLabelSettings(
            isVisible: true,
            labelPosition: ChartDataLabelPosition.inside,
            useSeriesColor: true,
            textStyle: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold
            )
          ),
          onRendererCreated: (FunnelSeriesController controller) {
            _controller = controller;
          }
        )
      )
    );
  }
  
  void _refreshData() {
    // Simulate data update
    setState(() {
      stages = stages.map((stage) {
        return SalesStage(
          stage.name,
          stage.count + Random().nextInt(50) - 25,
          stage.color
        );
      }).toList();
    });
    
    _controller?.updateDataSource(
      updatedDataIndexes: List.generate(stages.length, (i) => i)
    );
  }
}

class SalesStage {
  SalesStage(this.name, this.count, this.color);
  final String name;
  final double count;
  final Color color;
}
```

**This combines:**
- Pattern 2: Color-coded stages
- Pattern 3: Exploded segment emphasis
- Pattern 4: Custom neck sizing
- Pattern 5: Dynamic updates with controller

---

## Pattern Selection Guide

| Use Case | Recommended Pattern | Key Features |
|----------|-------------------|--------------|
| Sales Pipeline | Pattern 1 | Basic funnel, clear stages |
| Marketing Analytics | Pattern 2 | Color-coded, visual hierarchy |
| Presentation Focus | Pattern 3 | Exploded segments, emphasis |
| Process Visualization | Pattern 4 | Custom neck, visual flow |
| Real-time Dashboard | Pattern 5 | Dynamic updates, interactive |
| Complex Dashboard | Combined | Multiple patterns together |

## Additional Resources

For more details on specific features used in these patterns, see:
- [Funnel Customization](funnel-customization.md) - Size, neck, gaps, explode
- [Series Customization](series-customization.md) - Colors, animation
- [Selection](selection.md) - Interactive selection behavior
- [Tooltip](tooltip.md) - Tooltip configuration
- [Methods](methods.md) - Controller methods and updates