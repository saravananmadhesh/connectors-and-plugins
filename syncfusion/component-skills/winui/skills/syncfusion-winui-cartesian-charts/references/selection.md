# Selection

Selection allows users to interact with chart segments (data points) or entire series, highlighting selected elements for emphasis or triggering actions.

## Selection Types

**Data Point Selection** - Select individual data points/segments  
**Series Selection** - Select entire series

## Data Point Selection

Enable selection of individual data points using `DataPointSelectionBehavior`.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales">
        <chart:ColumnSeries.SelectionBehavior>
            <chart:DataPointSelectionBehavior SelectionBrush="Red"/>
        </chart:ColumnSeries.SelectionBehavior>
    </chart:ColumnSeries>
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

ColumnSeries series = new ColumnSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "Product",
    YBindingPath = "Sales"
};

DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionBrush = new SolidColorBrush(Colors.Red);
series.SelectionBehavior = selection;

chart.Series.Add(series);
```

### Selection Type

Control how many segments can be selected using the `Type` property:

```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple" 
                                         SelectionBrush="Orange"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

**Type Options:**
- `Single` - Only one segment at a time (default)
- `SingleDeselect` - Single selection with deselect capability
- `Multiple` - Multiple segments can be selected
- `None` - Disable selection

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.Type = ChartSelectionType.Multiple;
selection.SelectionBrush = new SolidColorBrush(Colors.Orange);
series.SelectionBehavior = selection;
```

### Selection Brush

Customize selected segment appearance:

```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Gold"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionBrush = new SolidColorBrush(Colors.Gold);
series.SelectionBehavior = selection;
```

### Selected Index

Programmatically select segments using `SelectedIndex`:

**XAML:**
```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectedIndex="2" 
                                         SelectionBrush="Blue"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectedIndex = 2; // Select 3rd segment (0-based)
selection.SelectionBrush = new SolidColorBrush(Colors.Blue);
series.SelectionBehavior = selection;
```

### Multiple Selection

Select multiple segments programmatically using `SelectedIndexes`:

**XAML:**
```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple"
                                         SelectedIndexes="{Binding SelectedIndexes}"
                                         SelectionBrush="BlueViolet"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

**C#:**
```csharp
DataPointSelectionBehavior selection = new DataPointSelectionBehavior()
{
    Type = ChartSelectionType.Multiple,
    SelectionBrush = new SolidColorBrush(Colors.BlueViolet),
    SelectedIndexes = new List<int>() { 0, 2, 4 }
};
series.SelectionBehavior = selection;
```

### Selection in Linear Series

For linear series (Line, Spline, etc.), selection is shown by changing the data label interior. Enable `ShowDataLabels` to see the selection:

**XAML:**
```xaml
<chart:SplineSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y"
                   ShowDataLabels="True">
    <chart:SplineSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"/>
    </chart:SplineSeries.SelectionBehavior>
</chart:SplineSeries>
```

**C#:**
```csharp
SplineSeries series = new SplineSeries()
{
    ItemsSource = new ViewModel().Data,
    XBindingPath = "X",
    YBindingPath = "Y",
    ShowDataLabels = true
};

DataPointSelectionBehavior selection = new DataPointSelectionBehavior();
selection.SelectionBrush = new SolidColorBrush(Colors.Red);
series.SelectionBehavior = selection;

chart.Series.Add(series);
```

## Series Selection

Select entire series using `SeriesSelectionBehavior` on the chart level.

### Basic Usage

**XAML:**
```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.SelectionBehavior>
        <chart:SeriesSelectionBehavior SelectionBrush="Red"/>
    </chart:SfCartesianChart.SelectionBehavior>
    
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
    
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

SeriesSelectionBehavior selection = new SeriesSelectionBehavior();
selection.SelectionBrush = new SolidColorBrush(Colors.Red);
chart.SelectionBehavior = selection;

// Add series
LineSeries series1 = new LineSeries()
{
    ItemsSource = viewModel.Data1,
    XBindingPath = "X",
    YBindingPath = "Y",
    Label = "Series 1"
};

LineSeries series2 = new LineSeries()
{
    ItemsSource = viewModel.Data2,
    XBindingPath = "X",
    YBindingPath = "Y",
    Label = "Series 2"
};

chart.Series.Add(series1);
chart.Series.Add(series2);
```

### Multiple Series Selection

Enable multiple series selection:

```xaml
<chart:SfCartesianChart.SelectionBehavior>
    <chart:SeriesSelectionBehavior Type="Multiple" 
                                  SelectionBrush="DarkBlue"/>
</chart:SfCartesianChart.SelectionBehavior>
```

**C#:**
```csharp
SeriesSelectionBehavior selection = new SeriesSelectionBehavior();
selection.Type = ChartSelectionType.Multiple;
selection.SelectionBrush = new SolidColorBrush(Colors.DarkBlue);
chart.SelectionBehavior = selection;
```

### Programmatic Series Selection

**C#:**
```csharp
// Select specific series by index
SeriesSelectionBehavior selection = new SeriesSelectionBehavior();
selection.SelectedIndex = 1; // Select second series
chart.SelectionBehavior = selection;

// Select multiple series
selection.Type = ChartSelectionType.Multiple;
selection.SelectedIndexes = new List<int>() { 0, 2 };
```

## Selection Events

Handle selection changes using `SelectionChanging` and `SelectionChanged` events.

### SelectionChanging Event

Occurs before selection changes. This is a cancelable event:

**XAML:**
```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Orange"
                                         SelectionChanging="Selection_SelectionChanging"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

**C#:**
```csharp
private void Selection_SelectionChanging(object sender, ChartSelectionChangingEventArgs e)
{
    // Get new and old indexes
    var newIndexes = e.NewIndexes;
    var oldIndexes = e.OldIndexes;
    
    // Cancel selection based on condition
    if (newIndexes.Count > 0 && newIndexes[0] == 3)
    {
        e.Cancel = true; // Prevent selection of index 3
    }
}
```

### SelectionChanged Event

Occurs after selection has changed:

**XAML:**
```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Red"
                                         SelectionChanged="Selection_SelectionChanged"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

**C#:**
```csharp
private void Selection_SelectionChanged(object sender, ChartSelectionChangedEventArgs e)
{
    if (e.NewIndexes.Count > 0)
    {
        int selectedIndex = e.NewIndexes[0];
        var series = sender as DataPointSelectionBehavior;
        
        // Access selected data
        var chartSeries = series.Parent as ChartSeries;
        if (chartSeries?.ItemsSource is List<DataPoint> data && 
            selectedIndex < data.Count)
        {
            var selectedData = data[selectedIndex];
            // Process selected data
            Debug.WriteLine($"Selected: {selectedData.Category} - {selectedData.Value}");
        }
    }
}
```

**Event Properties:**
- `NewIndexes` - Collection of newly selected indexes
- `OldIndexes` - Collection of previously selected indexes

## Practical Examples

### Example 1: Highlight Selected Product

```xaml
<Grid>
    <Grid.RowDefinitions>
        <RowDefinition Height="*"/>
        <RowDefinition Height="Auto"/>
    </Grid.RowDefinitions>
    
    <chart:SfCartesianChart Grid.Row="0">
        
        <chart:SfCartesianChart.XAxes>
            <chart:CategoryAxis/>
        </chart:SfCartesianChart.XAxes>
        
        <chart:SfCartesianChart.YAxes>
            <chart:NumericalAxis/>
        </chart:SfCartesianChart.YAxes>
        
        <chart:ColumnSeries ItemsSource="{Binding Products}"
                           XBindingPath="Name"
                           YBindingPath="Sales"
                           Fill="SteelBlue">
            <chart:ColumnSeries.SelectionBehavior>
                <chart:DataPointSelectionBehavior Type="Single"
                                                 SelectionBrush="Gold"
                                                 SelectionChanged="OnProductSelected"/>
            </chart:ColumnSeries.SelectionBehavior>
        </chart:ColumnSeries>
        
    </chart:SfCartesianChart>
    
    <StackPanel Grid.Row="1" Margin="10" Orientation="Horizontal">
        <TextBlock Text="Selected Product: " FontWeight="Bold"/>
        <TextBlock x:Name="ProductNameText" Margin="5,0"/>
        <TextBlock Text="Sales: " FontWeight="Bold" Margin="20,0,0,0"/>
        <TextBlock x:Name="ProductSalesText" Margin="5,0"/>
    </StackPanel>
</Grid>
```

```csharp
private void OnProductSelected(object sender, ChartSelectionChangedEventArgs e)
{
    if (e.NewIndexes.Count > 0)
    {
        var behavior = sender as DataPointSelectionBehavior;
        var series = behavior.Parent as ColumnSeries;
        var products = series.ItemsSource as List<Product>;
        var selectedProduct = products[e.NewIndexes[0]];
        
        ProductNameText.Text = selectedProduct.Name;
        ProductSalesText.Text = $"${selectedProduct.Sales:N0}";
    }
}
```

### Example 2: Multi-Select for Comparison

```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior Type="Multiple"
                                         SelectionBrush="Orange"
                                         SelectionChanged="OnMultipleSelected"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

```csharp
private void OnMultipleSelected(object sender, ChartSelectionChangedEventArgs e)
{
    var behavior = sender as DataPointSelectionBehavior;
    var series = behavior.Parent as ColumnSeries;
    var data = series.ItemsSource as List<DataPoint>;
    
    // Get current selection from behavior
    var selectedIndexes = behavior.SelectedIndexes;
    
    if (selectedIndexes != null && selectedIndexes.Count >= 2)
    {
        double sum = 0;
        foreach (int index in selectedIndexes)
        {
            sum += data[index].Value;
        }
        
        double average = sum / selectedIndexes.Count;
        AverageText.Text = $"Average: {average:F2}";
    }
}
```

### Example 3: Series Selection with Highlighting

```xaml
<chart:SfCartesianChart>
    
    <chart:SfCartesianChart.SelectionBehavior>
        <chart:SeriesSelectionBehavior Type="Single"
                                      SelectionBrush="#80FF6B57"
                                      SelectionChanged="OnSeriesSelected"/>
    </chart:SfCartesianChart.SelectionBehavior>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:LineSeries Label="Product A"
                     ItemsSource="{Binding DataA}"
                     XBindingPath="Month"
                     YBindingPath="Sales"/>
    
    <chart:LineSeries Label="Product B"
                     ItemsSource="{Binding DataB}"
                     XBindingPath="Month"
                     YBindingPath="Sales"/>
    
    <chart:LineSeries Label="Product C"
                     ItemsSource="{Binding DataC}"
                     XBindingPath="Month"
                     YBindingPath="Sales"/>
    
</chart:SfCartesianChart>
```

```csharp
private void OnSeriesSelected(object sender, ChartSelectionChangedEventArgs e)
{
    if (e.NewIndexes.Count > 0)
    {
        int seriesIndex = e.NewIndexes[0];
        var series = chart.Series[seriesIndex];
        
        SelectedSeriesText.Text = $"Selected: {series.Label}";
    }
}
```

## Use Cases

**Data Point Selection:**
- Product comparison in sales charts
- Highlighting specific data points
- Drill-down to detail views
- Interactive filtering
- User-driven analysis

**Series Selection:**
- Emphasizing one dataset among many
- Series comparison
- Focus mode for specific trends
- Interactive legend behavior

## Best Practices

- Use **Single** type for most cases to avoid confusion
- Choose distinct **SelectionBrush** colors with high contrast
- Provide visual feedback - selection color should stand out
- Use **SelectionChanging** event to prevent invalid selections
- Use **SelectionChanged** event to update UI or trigger actions
- For linear series, enable `ShowDataLabels` to make selection visible
- Combine with tooltips for additional context

## Combining with Other Features

### Selection + Tooltip

```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="X"
                   YBindingPath="Y"
                   EnableTooltip="True">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Orange"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

### Selection + Data Labels

```xaml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Product"
                   YBindingPath="Sales"
                   ShowDataLabels="True">
    <chart:ColumnSeries.SelectionBehavior>
        <chart:DataPointSelectionBehavior SelectionBrush="Gold"/>
    </chart:ColumnSeries.SelectionBehavior>
</chart:ColumnSeries>
```

## Troubleshooting

**Selection not working:**
- Verify SelectionBehavior is set on series or chart
- Check that series has data (ItemsSource is not empty)
- Ensure SelectionBrush is set
- For linear series, enable ShowDataLabels

**Can't select multiple segments:**
- Set Type="Multiple" in DataPointSelectionBehavior
- Use SelectedIndexes property (not SelectedIndex)

**Selection color not visible:**
- Choose high-contrast SelectionBrush
- Verify brush is different from series Fill
- Check opacity settings (use semi-transparent brushes like #80FF0000)

**Selection events not firing:**
- Confirm event handler is wired up correctly
- Check that selection is actually changing
- Verify SelectionBehavior is properly configured

**Programmatic selection not working:**
- Ensure index is valid (within data range)
- Check that SelectionBehavior is set before setting SelectedIndex
- Verify ItemsSource is set before setting SelectedIndex
