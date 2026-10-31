# Exploding Segments

Exploding segments visually separates them from the funnel to draw attention to specific data points. This feature is useful for emphasizing important stages or highlighting areas that need focus.

## Overview

The funnel chart provides three properties to control segment explosion:

- **ExplodeIndex** - Specifies which segment to explode
- **ExplodeOffset** - Controls the distance of the exploded segment
- **ExplodeOnTap** - Enables interactive explosion on user click

## Exploding a Specific Segment

Use `ExplodeIndex` to explode a segment by its zero-based index:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     ExplodeIndex="3"
                     ExplodeOffset="30"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.ExplodeIndex = 3;
chart.ExplodeOffset = 30;
this.Content = chart;
```

**Result:** The segment at index 3 (fourth segment, zero-based) separates from the funnel by 30 pixels.

**Index values:**
- `0` = First segment
- `1` = Second segment
- `2` = Third segment, etc.
- `-1` = No explosion (default)

## Controlling Explosion Distance

The `ExplodeOffset` property defines how far the segment separates:

### Small Offset (Subtle)
```xml
<chart:SfFunnelChart ExplodeIndex="2"
                     ExplodeOffset="15"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### Medium Offset (Standard)
```xml
<chart:SfFunnelChart ExplodeIndex="2"
                     ExplodeOffset="30"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### Large Offset (Dramatic)
```xml
<chart:SfFunnelChart ExplodeIndex="2"
                     ExplodeOffset="50"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

**Recommended values:**
- **15-20 pixels** - Subtle emphasis, professional look
- **25-35 pixels** - Clear separation, good for most cases
- **40-60 pixels** - Strong emphasis, attention-grabbing

**Considerations:**
- Larger offsets require more chart space
- Test with different chart sizes
- Balance visibility with overall layout

## Interactive Explosion

Enable `ExplodeOnTap` to let users click segments to explode them:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     ExplodeOnTap="True"
                     ExplodeOffset="40"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.ExplodeOnTap = true;
chart.ExplodeOffset = 40;
this.Content = chart;
```

**Behavior:**
- Click a segment → Segment explodes
- Click same segment again → Segment returns to funnel
- Click different segment → Previous returns, new one explodes
- Only one segment can be exploded at a time

**Use cases:**
- Exploratory data analysis
- Interactive presentations
- User-driven focus on specific stages
- Dashboard exploration

## Combining Features

### Explosion with Selection

Combine exploding segments with selection for enhanced interaction:

```xml
<chart:SfFunnelChart ExplodeOnTap="True"
                     ExplodeOffset="35"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Orange"/>
    </chart:SfFunnelChart.SelectionBehavior>
</chart:SfFunnelChart>
```

**Result:** Clicking a segment both explodes it and changes its color.

### Explosion with Data Labels

```xml
<chart:SfFunnelChart ExplodeIndex="2"
                     ExplodeOffset="40"
                     ShowDataLabels="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Context="Percentage"
                                      Foreground="White"
                                      FontSize="14"/>
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

**Result:** The exploded segment shows its data label clearly separated from other segments.

### Explosion with Tooltips

```xml
<chart:SfFunnelChart ExplodeOnTap="True"
                     ExplodeOffset="30"
                     EnableTooltip="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior />
    </chart:SfFunnelChart.TooltipBehavior>
</chart:SfFunnelChart>
```

**Result:** Users can click to explode segments and hover for detailed information.

## Programmatic Control

Change explosion dynamically at runtime:

### Explode Different Segment
```csharp
// Explode the segment at index 4
chart.ExplodeIndex = 4;
```

### Change Explosion Distance
```csharp
// Increase the explosion offset
chart.ExplodeOffset = 50;
```

### Remove Explosion
```csharp
// Remove the explosion
chart.ExplodeIndex = -1;
```

### Toggle Based on Data
```csharp
public void HighlightLowestPerforming()
{
    var data = viewModel.Data;
    int lowestIndex = data.IndexOf(data.OrderBy(d => d.Value).First());
    chart.ExplodeIndex = lowestIndex;
    chart.ExplodeOffset = 45;
}
```

### Cycle Through Segments
```csharp
private int currentExplodedIndex = -1;

public void ExplodeNextSegment()
{
    int segmentCount = viewModel.Data.Count;
    currentExplodedIndex = (currentExplodedIndex + 1) % segmentCount;
    chart.ExplodeIndex = currentExplodedIndex;
}
```

## Use Cases

### 1. Highlighting Critical Stages

Emphasize bottlenecks or critical conversion points:

```xml
<!-- Explode the negotiation stage (index 3) -->
<chart:SfFunnelChart ExplodeIndex="3"
                     ExplodeOffset="40"
                     Header="Sales Pipeline - Negotiation Focus">
</chart:SfFunnelChart>
```

**Scenario:** In a sales funnel, highlight the negotiation stage where most deals are lost.

### 2. Presentation Mode

Allow presenters to interactively emphasize points:

```xml
<chart:SfFunnelChart ExplodeOnTap="True"
                     ExplodeOffset="45"
                     Header="Q4 Performance Review">
</chart:SfFunnelChart>
```

**Scenario:** During a presentation, click segments to draw attention to specific stages being discussed.

### 3. Dashboard Insights

Automatically explode segments based on business rules:

```csharp
public void HighlightAlerts()
{
    // Explode segment if conversion rate drops below 50%
    for (int i = 0; i < data.Count - 1; i++)
    {
        double conversionRate = (data[i + 1].Value / data[i].Value) * 100;
        if (conversionRate < 50)
        {
            chart.ExplodeIndex = i;
            break;
        }
    }
}
```

**Scenario:** Automatically highlight problematic stages in a conversion funnel.

### 4. Focus on Wins

Emphasize successful outcomes:

```xml
<!-- Explode the final "Closed Won" stage -->
<chart:SfFunnelChart ExplodeIndex="4"
                     ExplodeOffset="35"
                     Header="Success Stories">
</chart:SfFunnelChart>
```

**Scenario:** Draw attention to the final stage showing successful conversions.

### 5. Comparison Emphasis

In reports comparing time periods:

```csharp
public void HighlightImprovedStage()
{
    // Explode the stage with the biggest improvement
    int improvedStageIndex = FindMostImprovedStage();
    chart.ExplodeIndex = improvedStageIndex;
    chart.ExplodeOffset = 40;
}
```

## Best Practices

### 1. Single Explosion Focus
- Explode only one segment at a time for clarity
- Avoid overwhelming users with multiple explosions
- Use explosion sparingly for maximum impact

### 2. Appropriate Offset Distance
- **Small charts (300-500px):** 15-25 pixel offset
- **Medium charts (500-700px):** 25-35 pixel offset
- **Large charts (700px+):** 35-50 pixel offset
- Test to ensure the segment remains visually connected

### 3. Combine with Context
- Pair explosion with data labels for immediate information
- Use tooltips for detailed information on exploded segments
- Consider selection highlighting for additional emphasis

### 4. Interactive vs Static
- **Static explosion (ExplodeIndex):** Use for reports, dashboards, emphasis
- **Interactive (ExplodeOnTap):** Use for exploratory analysis, presentations
- Don't enable both an initial explosion and tap interaction together—choose one approach

### 5. Accessibility
- Don't rely solely on explosion for critical information
- Provide alternative ways to access highlighted data
- Consider users who may not notice subtle visual changes

## Common Patterns

### Emphasize Problem Area
```xml
<chart:SfFunnelChart ExplodeIndex="2"
                     ExplodeOffset="40"
                     ShowDataLabels="True">
    <chart:SfFunnelChart.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"/>
    </chart:SfFunnelChart.SelectionBehavior>
</chart:SfFunnelChart>
```

### Interactive Exploration
```xml
<chart:SfFunnelChart ExplodeOnTap="True"
                     ExplodeOffset="35"
                     EnableTooltip="True">
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior InitialShowDelay="200"/>
    </chart:SfFunnelChart.TooltipBehavior>
</chart:SfFunnelChart>
```

### Success Highlight
```xml
<chart:SfFunnelChart ExplodeIndex="4"
                     ExplodeOffset="45"
                     ShowDataLabels="True">
    <chart:SfFunnelChart.DataLabelSettings>
        <chart:FunnelDataLabelSettings Foreground="White"
                                      Background="#4CAF50"/>
    </chart:SfFunnelChart.DataLabelSettings>
</chart:SfFunnelChart>
```

### Presentation Mode
```xml
<chart:SfFunnelChart ExplodeOnTap="True"
                     ExplodeOffset="50"
                     GapRatio="0.1">
</chart:SfFunnelChart>
```

## Troubleshooting

### Segment Not Exploding
- Verify `ExplodeIndex` is within valid range (0 to segment count - 1)
- Ensure `ExplodeOffset` is set to a value > 0
- Check that data is loaded and chart is rendered
- For `ExplodeOnTap`, confirm property is set to `true`

### Explosion Too Subtle
- Increase `ExplodeOffset` value (try 40-60 pixels)
- Add `GapRatio` for additional separation
- Combine with selection highlighting
- Use contrasting colors for the exploded segment

### Segment Explodes Outside Chart Area
- Reduce `ExplodeOffset` value
- Increase chart dimensions
- Adjust margin around the chart
- Consider the chart's available space

### Interactive Explosion Not Working
- Verify `ExplodeOnTap="True"` is set
- Ensure segments are clickable (not covered by other elements)
- Check for conflicting mouse event handlers
- Test with different segments

### Wrong Segment Exploding
- Remember indexes are zero-based (first segment = 0)
- Verify data order matches expected segment order
- Check for dynamic data updates that change indexing
- Log the data source to confirm segment positions
