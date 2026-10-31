# Flutter Funnel Chart (SfFunnelChart) Overview

Syncfusion Flutter Funnel Chart (SfFunnelChart) widget is written natively in Dart for creating beautiful and high-performance funnel charts, which are used to craft high-quality applications using Flutter.

## What is a Funnel Chart?

A funnel chart is a specialized chart type used to visualize data that progressively decreases from one stage to the next. It's named after its shape, which resembles a funnel - wide at the top and narrow at the bottom. The size of each segment represents the value at that stage, making it easy to identify bottlenecks or drop-off points in a process.

## Key Features

### Visual Features

* **Funnel Shape** - Distinctive funnel visualization with customizable body and neck dimensions
* **Segment Gaps** - Configurable spacing between segments for clear visual separation
* **Exploded Segments** - Ability to pull out specific segments for emphasis
* **Customizable Size** - Adjustable height and width as percentage of available space
* **Neck Customization** - Configurable neck height and width for different visual effects

### Interactive Features

* **Selection** - Single and multi-selection support for segments with visual feedback
* **Tooltip** - Rich tooltips with customizable appearance and activation modes
* **Legend** - Interactive legend with toggle visibility and customization options
* **Touch Interactions** - Tap, double-tap, and long-press event handling

### Data Visualization

* **Data Labels** - Flexible positioning (inside/outside) with extensive styling options
* **Color Mapping** - Map colors from data source for dynamic coloring
* **Palette Support** - Apply predefined color palettes automatically
* **Empty Points** - Handle null/missing data with multiple strategies

### Customization

* **Borders** - Configurable segment borders (width, color)
* **Opacity** - Control transparency of segments
* **Animation** - Smooth animations with configurable duration and delay
* **Title** - Customizable chart title with alignment and styling
* **Background** - Custom background colors and images

### Advanced Features

* **Export** - Export charts as PNG images or PDF documents
* **RTL Support** - Right-to-left rendering for international applications
* **Accessibility** - Screen reader support and accessibility features
* **Dynamic Updates** - Update data dynamically using series controller

## When to Use Funnel Charts

Funnel charts are ideal for:

### 1. Sales and Marketing

- **Sales Pipeline**: Track deals through stages (leads → prospects → qualified → closed)
- **Marketing Funnel**: Visualize customer journey (awareness → interest → consideration → purchase)
- **Lead Conversion**: Show conversion rates from initial contact to sale
- **Campaign Analysis**: Measure effectiveness at each stage of a marketing campaign

### 2. Process Analysis

- **Workflow Efficiency**: Identify bottlenecks in multi-step processes
- **Conversion Tracking**: Monitor user progression through defined steps
- **Drop-off Analysis**: Visualize where users exit a process
- **Quality Control**: Track defects or rejections at production stages

### 3. Web and App Analytics

- **User Journey**: Display visitor progression from landing page to conversion
- **Shopping Cart**: Analyze cart abandonment and checkout completion
- **Registration Flow**: Track user drop-off during sign-up process
- **Onboarding**: Monitor user activation through onboarding steps

### 4. Human Resources

- **Recruitment Funnel**: Show candidate progression (applicants → interviews → offers → hired)
- **Training Pipeline**: Track employee progression through training modules
- **Performance Reviews**: Visualize evaluation stages and outcomes

### 5. Financial Services

- **Loan Application**: Track applications from inquiry to approval
- **Investment Pipeline**: Show deal flow from prospecting to closing
- **Credit Assessment**: Visualize approval stages and rejection points

## Key Components

### SfFunnelChart

The main widget that renders the funnel chart. It provides:
- Chart-level configuration (title, legend, tooltip behavior)
- Visual appearance settings (background, borders, margin)
- Event callbacks for user interactions
- Export functionality

### FunnelSeries

The series component that defines:
- Data source and mapping
- Visual customization (size, neck, gaps, explode)
- Data labels configuration
- Selection behavior
- Animation settings

### Supporting Components

- **ChartTitle**: Configurable chart title with styling
- **Legend**: Data point legend with customization
- **TooltipBehavior**: Tooltip configuration and appearance
- **SelectionBehavior**: Segment selection settings
- **DataLabelSettings**: Data label positioning and styling

## Typical Use Case Flow

1. **Identify the Process**: Define the stages in your process (e.g., leads, qualified, contacted, won)
2. **Collect Data**: Gather numeric values for each stage showing progressive decrease
3. **Create Chart**: Initialize SfFunnelChart with FunnelSeries
4. **Map Data**: Connect data source using xValueMapper and yValueMapper
5. **Customize**: Apply colors, labels, tooltips, and other visual enhancements
6. **Enable Interactions**: Add selection, tooltips, and callbacks as needed

## Visual Structure

```
┌─────────────────────────────────┐
│         Chart Title             │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │     Segment 1 (Widest)    │  │  ← Top segment (largest value)
│  └───────────────────────────┘  │
│    ┌─────────────────────────┐  │
│    │      Segment 2          │  │  ← Second segment
│    └─────────────────────────┘  │
│      ┌───────────────────────┐  │
│      │     Segment 3         │  │  ← Third segment
│      └───────────────────────┘  │
│        ┌─────────────────────┐  │
│        │    Segment 4        │  │  ← Neck begins
│        │  (Narrow neck)      │  │
│        │                     │  │
│        └─────────────────────┘  │
│          ┌─────────────────┐    │
│          │   Segment 5     │    │  ← Bottom segment (smallest value)
│          └─────────────────┘    │
├─────────────────────────────────┤
│          Legend Items           │
└─────────────────────────────────┘
```

## Performance Considerations

- **Data Points**: Funnel charts typically work best with 3-8 segments
- **Animation**: Can be disabled for better performance by setting `animationDuration: 0`
- **Rendering**: Efficiently renders using Flutter's native rendering engine
- **Updates**: Use series controller for dynamic updates without rebuilding entire widget

## Comparison with Other Charts

### vs. Pyramid Chart
- **Funnel**: Has a neck (narrow section at bottom), shows progressive filtering
- **Pyramid**: Symmetrical or asymmetrical, no neck, shows hierarchical relationships

### vs. Bar Chart
- **Funnel**: Shows progression/flow between stages with decreasing values
- **Bar Chart**: Compares independent values, no implied flow or relationship

### vs. Pie Chart
- **Funnel**: Shows sequential stages with conversion/drop-off
- **Pie Chart**: Shows composition of a whole, no sequence or flow

## Design Best Practices

1. **Order Matters**: Arrange stages in logical order (typically top to bottom, largest to smallest)
2. **Clear Labels**: Use descriptive stage names in data labels
3. **Color Scheme**: Use consistent color progression or data-driven colors
4. **Appropriate Gaps**: Use `gapRatio` to clearly separate stages
5. **Highlight Key Stages**: Use exploded segments to draw attention
6. **Add Context**: Include tooltips with additional information (percentages, counts)
7. **Readable Text**: Ensure data labels are visible and readable
8. **Legend**: Enable legend for additional context about each stage

## Common Scenarios

### Scenario 1: High Drop-off Between Stages
- Use color mapping to highlight problematic stages (red for low conversion)
- Explode the problematic segment to draw attention
- Add detailed tooltips with drop-off percentages

### Scenario 2: Small Final Value
- Adjust neck dimensions (`neckHeight`, `neckWidth`) to ensure visibility
- Use outside data labels for better readability
- Consider logarithmic scaling if values vary dramatically

### Scenario 3: Many Stages (>8)
- Group similar stages to reduce segment count
- Use scrollable legend
- Consider alternative visualization (stacked bar chart)

### Scenario 4: Real-time Updates
- Use `FunnelSeriesController` for efficient updates
- Implement refresh mechanism with new data
- Disable animation for frequent updates

## Integration Examples

### With State Management
```dart
// Using Provider, Bloc, or other state management
Consumer<SalesFunnelModel>(
  builder: (context, model, child) {
    return SfFunnelChart(
      series: FunnelSeries<SalesStage, String>(
        dataSource: model.stages,
        // ... mappings
      )
    );
  }
)
```

### With API Data
```dart
// Fetch and display data from API
FutureBuilder<List<FunnelData>>(
  future: fetchFunnelData(),
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return SfFunnelChart(
        series: FunnelSeries<FunnelData, String>(
          dataSource: snapshot.data!,
          // ... mappings
        )
      );
    }
    return CircularProgressIndicator();
  }
)
```

## Next Steps

- Learn about [Funnel Customization](funnel-customization.md)
- Explore [Data Labels](datalabel.md) options
- Understand [Selection](selection.md) behavior
- Implement [Callbacks](callbacks.md) for interactions