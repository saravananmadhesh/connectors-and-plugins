# Multiple Series

Display multiple datasets in a single chart for comparison and correlation analysis.

## Basic Usage

Add multiple series to the chart's Series collection:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <!-- First Series -->
    <chart:ColumnSeries ItemsSource="{Binding Data2020}"
                       XBindingPath="Month"
                       YBindingPath="Sales"
                       Label="2020"
                       Fill="SteelBlue"/>
    
    <!-- Second Series -->
    <chart:ColumnSeries ItemsSource="{Binding Data2021}"
                       XBindingPath="Month"
                       YBindingPath="Sales"
                       Label="2021"
                       Fill="OrangeRed"/>
    
    <!-- Third Series -->
    <chart:ColumnSeries ItemsSource="{Binding Data2022}"
                       XBindingPath="Month"
                       YBindingPath="Sales"
                       Label="2022"
                       Fill="Green"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
// Create series dynamically
var series1 = new ColumnSeries
{
    ItemsSource = viewModel.Data2020,
    XBindingPath = "Month",
    YBindingPath = "Sales",
    Label = "2020",
    Fill = new SolidColorBrush(Colors.SteelBlue)
};

var series2 = new ColumnSeries
{
    ItemsSource = viewModel.Data2021,
    XBindingPath = "Month",
    YBindingPath = "Sales",
    Label = "2021",
    Fill = new SolidColorBrush(Colors.OrangeRed)
};

chart.Series.Add(series1);
chart.Series.Add(series2);
```

## Mixed Series Types

Combine different series types:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <!-- Column for actual values -->
    <chart:ColumnSeries ItemsSource="{Binding ActualData}"
                       XBindingPath="Month"
                       YBindingPath="Value"
                       Label="Actual"
                       Fill="DodgerBlue"/>
    
    <!-- Line for target values -->
    <chart:LineSeries ItemsSource="{Binding TargetData}"
                     XBindingPath="Month"
                     YBindingPath="Value"
                     Label="Target"
                     Stroke="Red"
                     StrokeThickness="2"/>
    
</chart:SfCartesianChart>
```

## Color Palettes

Define custom color scheme for multiple series:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.PaletteBrushes>
        <SolidColorBrush Color="#FF6B9BD8"/>
        <SolidColorBrush Color="#FFFF6B57"/>
        <SolidColorBrush Color="#FF6BCC87"/>
        <SolidColorBrush Color="#FFFFC107"/>
        <SolidColorBrush Color="#FF9C27B0"/>
    </chart:SfCartesianChart.PaletteBrushes>
    
    <chart:ColumnSeries ItemsSource="{Binding Data1}"
                       XBindingPath="X" YBindingPath="Y" Label="Series 1"/>
    <chart:ColumnSeries ItemsSource="{Binding Data2}"
                       XBindingPath="X" YBindingPath="Y" Label="Series 2"/>
    <chart:ColumnSeries ItemsSource="{Binding Data3}"
                       XBindingPath="X" YBindingPath="Y" Label="Series 3"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
chart.PaletteBrushes = new List<Brush>
{
    new SolidColorBrush(ColorHelper.FromArgb(255, 107, 155, 216)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 255, 107, 87)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 107, 204, 135))
};
```

## Series Visibility

Toggle series visibility using the `IsSeriesVisible` property:

**XAML:**
```xaml
<chart:LineSeries ItemsSource="{Binding Data}"
                 XBindingPath="X"
                 YBindingPath="Y"
                 IsSeriesVisible="{Binding ShowSeries}"
                 Label="Sales"/>
```

**C#:**
```csharp
// Hide series
series1.IsSeriesVisible = false;

// Show series
series1.IsSeriesVisible = true;

// Toggle visibility
series1.IsSeriesVisible = !series1.IsSeriesVisible;
```

## Legend for Series Identification

Display legend to identify series:

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCartesianChart.Legend>
    
    <chart:LineSeries ItemsSource="{Binding Data1}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Product A"/>
    
    <chart:LineSeries ItemsSource="{Binding Data2}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Product B"/>
    
</chart:SfCartesianChart>
```

## Practical Examples

### Example 1: Year-over-Year Comparison

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Header>
        <TextBlock Text="Sales Comparison" 
                  FontSize="20" 
                  Margin="0,10"/>
    </chart:SfCartesianChart.Header>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend Placement="Bottom"/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis Header="Month"/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis Header="Sales ($)" 
                            LabelFormat="$#,0"/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries ItemsSource="{Binding Sales2021}"
                     XBindingPath="Month"
                     YBindingPath="Amount"
                     Label="2021"
                     Stroke="Blue"
                     StrokeThickness="2"/>
    
    <chart:LineSeries ItemsSource="{Binding Sales2022}"
                     XBindingPath="Month"
                     YBindingPath="Amount"
                     Label="2022"
                     Stroke="Green"
                     StrokeThickness="2"/>
    
    <chart:LineSeries ItemsSource="{Binding Sales2023}"
                     XBindingPath="Month"
                     YBindingPath="Amount"
                     Label="2023"
                     Stroke="Orange"
                     StrokeThickness="2"/>
    
</chart:SfCartesianChart>
```

### Example 2: Dynamically Adding Series

**XAML:**
```xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    
    <!-- Controls to manage series -->
    <StackPanel Grid.Row="0" Orientation="Horizontal" Margin="10">
        <Button Content="Add Series" 
                Click="AddSeries_Click"
                Margin="5"/>
        <Button Content="Remove Last Series" 
                Click="RemoveSeries_Click"
                Margin="5"/>
        <Button Content="Clear All" 
                Click="ClearSeries_Click"
                Margin="5"/>
    </StackPanel>
    
    <!-- Chart -->
    <chart:SfCartesianChart x:Name="chart" Grid.Row="1">
        <chart:SfCartesianChart.Legend>
            <chart:ChartLegend/>
        </chart:SfCartesianChart.Legend>
        
        <chart:SfCartesianChart.XAxes>
            <chart:CategoryAxis/>
        </chart:SfCartesianChart.XAxes>
        
        <chart:SfCartesianChart.YAxes>
            <chart:NumericalAxis/>
        </chart:SfCartesianChart.YAxes>
    </chart:SfCartesianChart>
</Grid>

Enable automatic series visibility toggling by clicking legend items:

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.Legend>
        <chart:ChartLegend ToggleSeriesVisibility="True"/>
    </chart:SfCartesianChart.Legend>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries ItemsSource="{Binding Data1}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Series 1"/>
    
    <chart:LineSeries ItemsSource="{Binding Data2}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Series 2"/>
    
    <chart:LineSeries ItemsSource="{Binding Data3}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Series 3"/>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

ChartLegend legend = new ChartLegend();
legend.ToggleSeriesVisibility = true;
chart.Legend = legend;

// Add axes
chart.XAxes.Add(new CategoryAxis());
chart.YAxes.Add(new NumericalAxis());

// Add series
chart.Series.Add(new LineSeries 
{ 
    ItemsSource = viewModel.Data1,
    XBindingPath = "X",
    YBindingPath = "Y",
    Label = "Series 1"
});

chart.Series.Add(new LineSeries 
{ 
    ItemsSource = viewModel.Data2,
    XBindingPath = "X",
    YBindingPath = "Y",
    Label = "Series 2"
});

this.Content = chart;
```

**Alternative: Using Checkboxes**

```xaml
<chart:SfCartesianChart.Legend>
    <chart:ChartLegend CheckBoxVisibility="Visible"/>
</chart:SfCartesianChart.Legend>
```

When `CheckBoxVisibility` is set to `Visible`, checkboxes appear next to each legend item, allowing users to control series visibility. 
    
    private void AddSeries_Click(object sender, RoutedEventArgs e)
    {
        seriesCount++;
        var data = GenerateRandomData();
        var color = GenerateRandomColor();
        
        var newSeries = new LineSeries
        {
            ItemsSource = data,
            XBindingPath = "Category",
            YBindingPath = "Value",
            Label = $"Series {seriesCount}",
            Stroke = new SolidColorBrush(color),
            StrokeThickness = 2
        };
        
        chart.Series.Add(newSeries);
    }
    
    private void RemoveSeries_Click(object sender, RoutedEventArgs e)
    {
        if (chart.Series.Count > 0)
        {
            chart.Series.RemoveAt(chart.Series.Count - 1);
        }
    }
    
    private void ClearSeries_Click(object sender, RoutedEventArgs e)
    {
        chart.Series.Clear();
        seriesCount = 0;
    }
    
    private List<DataPoint> GenerateRandomData()
    {
        var data = new List<DataPoint>();
        for (int i = 0; i < 12; i++)
        {
            data.Add(new DataPoint 
            { 
                Category = $"Month {i + 1}", 
                Value = random.Next(20, 100) 
            });
        }
        return data;
    }
    
    private Color GenerateRandomColor()
    {
        return Color.FromArgb(255, 
            (byte)random.Next(256), 
            (byte)random.Next(256), 
            (byte)random.Next(256));
    }


public class DataPoint
{
    public string Category { get; set; }
    public double Value { get; set; }
}
```

### Example 3: Series Toggle with Legend Click

```csharp
private void Chart_LegendItemClicked(object sender, LegendItemClickedEventArgs e)
{
    var series = e.LegendItem.Series;
    series.IsVisible = !series.IsVisible;
    
    // Update legend appearance
    e.LegendItem.IconBrush = series.IsVisible 
        ? series.Fill 
        : new SolidColorBrush(Colors.LightGray);
}
```

## Performance Considerations

**For Large Datasets:**

Use FastLineSeries instead of LineSeries:

```xaml
<chart:FastLineSeries ItemsSource="{Binding LargeDataSet1}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Series 1"/>

<chart:FastLineSeries ItemsSource="{Binding LargeDataSet2}"
                     XBindingPath="X"
                     YBindingPath="Y"
                     Label="Series 2"/>
```

**Tips:**
- Limit number of visible series (5-7 max for readability)
- Use fast series types for datasets > 1000 points
- Consider virtualization for many series
- Hide unused series instead of removing/re-adding

## Common Patterns

### Pattern 1: Multiple Metrics

```xaml
<!-- Revenue, Profit, and Expenses -->
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Quarter"
                   YBindingPath="Revenue"
                   Label="Revenue"/>

<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Quarter"
                   YBindingPath="Profit"
                   Label="Profit"/>

<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Quarter"
                   YBindingPath="Expenses"
                   Label="Expenses"/>
```

### Pattern 2: Actual vs. Target

```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Month"
                   YBindingPath="Actual"
                   Label="Actual"
                   Fill="SteelBlue"/>

<chart:LineSeries ItemsSource="{Binding Data}"
                 XBindingPath="Month"
                 YBindingPath="Target"
                 Label="Target"
                 Stroke="Red"
                 StrokeThickness="2"
                 StrokeDashArray="3,3"/>
```

### Pattern 3: Category Breakdown

```xaml
<!-- Sales by Region -->
<chart:LineSeries ItemsSource="{Binding NorthData}"
                 Label="North" XBindingPath="Month" YBindingPath="Sales"/>
<chart:LineSeries ItemsSource="{Binding SouthData}"
                 Label="South" XBindingPath="Month" YBindingPath="Sales"/>
<chart:LineSeries ItemsSource="{Binding EastData}"
                 Label="East" XBindingPath="Month" YBindingPath="Sales"/>
<chart:LineSeries ItemsSource="{Binding WestData}"
                 Label="West" XBindingPath="Month" YBindingPath="Sales"/>
```

## Best Practices

- **Use distinct colors** - Ensure series are easily distinguishable
- **Add legend** - Always include legend for multiple series
- **Limit series count** - 5-7 series max for clarity
- **Label clearly** - Use meaningful Label property values
- **Consider scale** - Ensure all series fit in same Y-axis range (or use multiple axes)
- **Optimize performance** - Use Fast series for large datasets
- **Enable tooltips** - Help users identify exact values
- **Provide series toggle** - Let users show/hide series
- **Use consistent patterns** - Same series type for similar data

## Troubleshooting

**Series not visible:**
- Check ItemsSource has data
- Verify IsVisible is True
- Ensure colors are distinct
- Check if series is behind others (Z-order)

**Colors look the same:**
- Define custom PaletteBrushes
- Manually set Fill/Stroke for each series
- Use color-blind friendly palette

**Legend not showing:**
- Set Chart.Legend property
- Ensure series have Label property set
- Check legend Placement

**Performance issues:**
- Reduce number of series
- Use Fast series types
- Limit data points per series
- Consider data sampling/aggregation

**Series overlapping:**
- Use ColumnWidthRatio to adjust spacing
- Consider using different series types
- Implement transparency (Opacity < 1)
