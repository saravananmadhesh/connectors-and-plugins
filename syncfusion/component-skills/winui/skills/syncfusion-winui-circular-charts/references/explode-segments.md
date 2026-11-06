# Explode Segments

## Overview

Exploding segments visually separates them from the rest of the chart by pulling them outward. This feature draws attention to specific data points, emphasizes important segments, or creates interactive visualizations where users can explore data by tapping segments.

**Use Cases:**
- Highlight best-performing or worst-performing segments
- Emphasize critical data points in presentations
- Create interactive exploration experiences
- Draw attention to specific categories
- Show detailed focus on selected segments

## Explode Properties

The following properties control segment explosion:

- **ExplodeIndex** - Index of segment to explode (0-based)
- **ExplodeAll** - Explode all segments simultaneously
- **ExplodeRadius** - Distance segments move when exploded
- **ExplodeOnTap** - Enable tap/click to explode segments

**Important:** Set ExplodeRadius > 0 for explosion to be visible.

## Explode Single Segment

Use **ExplodeIndex** to explode a specific segment:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       ExplodeIndex="2"
                       ExplodeRadius="10"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

PieSeries series = new PieSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Product",
    YBindingPath = "SalesRate",
    ExplodeIndex = 2,      // Explode third segment (0-based)
    ExplodeRadius = 10     // Move 10 pixels outward
};

chart.Series.Add(series);
```

**Result:** The segment at index 2 is pulled outward by 10 pixels.

### Explode Radius Values

**Common radius values:**
- **5-10** - Subtle emphasis
- **10-15** - Standard separation
- **15-25** - Strong emphasis
- **> 25** - Dramatic effect (use sparingly)

**Example with different radii:**
```xml
<!-- Subtle -->
<chart:PieSeries ExplodeIndex="1" ExplodeRadius="8"/>

<!-- Standard -->
<chart:PieSeries ExplodeIndex="1" ExplodeRadius="15"/>

<!-- Dramatic -->
<chart:PieSeries ExplodeIndex="1" ExplodeRadius="30"/>
```

## Explode All Segments

Use **ExplodeAll** to explode every segment:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       ExplodeAll="True"
                       ExplodeRadius="15"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Category",
    YBindingPath = "Value",
    ExplodeAll = true,
    ExplodeRadius = 15
};

chart.Series.Add(series);
```

**Result:** All segments are separated with spacing between them.

**Best for:**
- Showing all segments with clear separation
- Improving visual clarity with many segments
- Creating distinctive "exploded pie" style

## Interactive Explode on Tap

Enable **ExplodeOnTap** for interactive segment explosion:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"
                       ExplodeOnTap="True"
                       ExplodeRadius="20"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries()
{
    ExplodeOnTap = true,
    ExplodeRadius = 20
};

chart.Series.Add(series);
```

**Behavior:**
- Click/tap a segment → It explodes outward
- Click/tap an exploded segment → It returns to normal position
- Only one segment exploded at a time

**Best for:**
- Interactive dashboards
- Data exploration interfaces
- User-driven emphasis
- Touch-enabled applications

## Combining Explode with Other Features

### Explode with Selection

Combine explosion with selection for enhanced interactivity:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"
                       ExplodeOnTap="True"
                       ExplodeRadius="15">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                                Type="Single"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**Result:** Click segment → Explodes and changes color

### Explode with Data Labels

**XAML:**
```xml
<chart:PieSeries ItemsSource="{Binding Data}"
               XBindingPath="Category"
               YBindingPath="Value"
               ExplodeIndex="2"
               ExplodeRadius="20"
               ShowDataLabels="True">
    <chart:PieSeries.DataLabelSettings>
        <chart:CircularDataLabelSettings Position="Outside"
                                       Context="Percentage"
                                       ShowConnectorLine="True"/>
    </chart:PieSeries.DataLabelSettings>
</chart:PieSeries>
```

**Result:** Exploded segment with data label and connector line

### Explode with Tooltips

**XAML:**
```xml
<chart:PieSeries ItemsSource="{Binding Data}"
               ExplodeOnTap="True"
               ExplodeRadius="15"
               EnableTooltip="True"/>
```

**Result:** Hover for tooltip, click to explode

## Practical Examples

### Example 1: Highlight Best Performer

```xml
<chart:SfCircularChart Header="Sales Performance">
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding SalesData}"
                       XBindingPath="Product"
                       YBindingPath="Revenue"
                       ExplodeIndex="0"
                       ExplodeRadius="20"
                       ShowDataLabels="True"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**Use Case:** Assuming data is sorted by revenue, index 0 (highest) is exploded

### Example 2: Exploded Doughnut Chart

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Category"
                            YBindingPath="Amount"
                            InnerRadius="0.6"
                            ExplodeAll="True"
                            ExplodeRadius="12"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**Result:** All doughnut segments separated with elegant spacing

### Example 3: Interactive Exploration

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Region"
                       YBindingPath="Sales"
                       ExplodeOnTap="True"
                       ExplodeRadius="18"
                       EnableTooltip="True"
                       ShowDataLabels="True">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Position="Inside"
                                               Context="Percentage"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**Features:** Hover for tooltip, click to explode, labels show percentages

### Example 4: Multiple Exploded Segments (Manual)

```csharp
// ViewModel with pre-processed data
public class ChartViewModel
{
    public List<SalesData> Data { get; set; }
    public int TopPerformerIndex { get; set; }
    
    public ChartViewModel()
    {
        Data = GetSalesData();
        
        // Find index of top performer
        TopPerformerIndex = Data.IndexOf(Data.OrderByDescending(d => d.Sales).First());
    }
}
```

**XAML:**
```xml
<chart:PieSeries ExplodeIndex="{Binding TopPerformerIndex}"
               ExplodeRadius="15"
               ItemsSource="{Binding Data}"/>
```

## Best Practices

### When to Use Explode

**Good use cases:**
- Emphasizing specific data points (top/bottom performers)
- Creating visual hierarchy in presentations
- Interactive data exploration
- Focusing attention for storytelling

**Avoid:**
- Exploding too many segments (cluttered)
- Using with very small segments (hard to see)
- Overusing in static reports (distracting)
- Combining with too many other effects

### Radius Guidelines

1. **Proportional to chart size** - Larger charts can handle larger radii
2. **Subtle for emphasis** - 10-15px for highlighting
3. **Moderate for interaction** - 15-20px for tap behavior
4. **Dramatic for impact** - 20-30px for presentation focus
5. **Consistent radius** - Use same value across similar charts

### Design Considerations

1. **Single emphasis** - Usually explode one segment for focus
2. **ExplodeAll sparingly** - Can look cluttered with many segments
3. **Combine with selection** - For interactive applications
4. **Consider chart size** - Ensure exploded segments fit in container
5. **Test interactions** - Verify ExplodeOnTap behaves as expected

### Performance

1. **Minimal impact** - Explosion is efficient, no performance concerns
2. **Animation** - Natural animation occurs when exploding
3. **Multiple charts** - Can use on multiple charts without issues

## Common Scenarios

### Scenario 1: Emphasize Top Segment

```xml
<chart:SfCircularChart Header="Market Share Analysis">
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding MarketShareData}"
                       XBindingPath="Company"
                       YBindingPath="Share"
                       ExplodeIndex="0"
                       ExplodeRadius="18"
                       ShowDataLabels="True">
            <chart:PieSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Context="Percentage"
                                               Position="Outside"/>
            </chart:PieSeries.DataLabelSettings>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: All Segments Exploded

```xml
<chart:SfCircularChart Header="Budget Breakdown">
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding BudgetData}"
                       XBindingPath="Department"
                       YBindingPath="Budget"
                       ExplodeAll="True"
                       ExplodeRadius="10"
                       ShowDataLabels="True"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 3: Interactive Tap-to-Explore

```xml
<chart:SfCircularChart Header="Click to Explore">
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior EnableAnimation="True"/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"
                       ExplodeOnTap="True"
                       ExplodeRadius="20"
                       EnableTooltip="True">
            <chart:PieSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior SelectionBrush="Gold"
                                                Type="Single"/>
            </chart:PieSeries.SelectionBehavior>
        </chart:PieSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 4: Doughnut with Selective Explode

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:DoughnutSeries ItemsSource="{Binding Data}"
                            XBindingPath="Category"
                            YBindingPath="Value"
                            InnerRadius="0.65"
                            ExplodeIndex="1"
                            ExplodeRadius="15"
                            ShowDataLabels="True">
            <chart:DoughnutSeries.DataLabelSettings>
                <chart:CircularDataLabelSettings Position="Outside"
                                               ShowConnectorLine="True"/>
            </chart:DoughnutSeries.DataLabelSettings>
        </chart:DoughnutSeries>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

## Troubleshooting

### Explosion Not Visible

**Problem:** Segment doesn't appear to explode

**Solutions:**
1. Ensure ExplodeRadius > 0
2. Check that ExplodeIndex is valid (within data range)
3. Verify chart has enough space for exploded segment
4. Try increasing ExplodeRadius value

### ExplodeOnTap Not Working

**Problem:** Clicking segment doesn't trigger explosion

**Solutions:**
1. Verify ExplodeOnTap="True"
2. Ensure ExplodeRadius is set
3. Check if other interactions are conflicting
4. Verify segment is clickable (not disabled)

### Exploded Segment Cut Off

**Problem:** Exploded segment extends beyond chart bounds

**Solutions:**
1. Reduce ExplodeRadius
2. Add margin to chart container
3. Reduce chart's Radius property
4. Adjust chart size/container