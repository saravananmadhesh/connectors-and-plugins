# Troubleshooting Polar Charts

Common issues, solutions, and best practices for Syncfusion WinUI Polar Chart implementation.

## Table of Contents
- [Installation Issues](#installation-issues)
- [License Issues](#license-issues)
- [Data Binding Problems](#data-binding-problems)
- [Rendering Issues](#rendering-issues)
- [Performance Problems](#performance-problems)
- [Styling and Appearance Issues](#styling-and-appearance-issues)
- [Axis Configuration Issues](#axis-configuration-issues)
- [Best Practices](#best-practices)
- [FAQ](#faq)

## Installation Issues

### Problem: Package Not Installing

**Symptoms:**
- NuGet package installation fails
- Errors about package compatibility
- Missing assembly references

**Solutions:**

**1. Clear NuGet Cache:**
```powershell
dotnet nuget locals all --clear
```

**2. Update Package Manager:**
- In Visual Studio: Tools → NuGet Package Manager → Package Manager Settings
- Check for updates

**3. Install Specific Version:**
```powershell
Install-Package Syncfusion.Chart.WinUI -Version x.x.x.x
```

### Problem: Namespace Not Found

**Symptoms:**
- `'SfPolarChart' could not be found`
- Namespace errors in XAML

**Solutions:**

**1. Verify Package Installation:**
```xml
<!-- Check your .csproj file -->
<ItemGroup>
  <PackageReference Include="Syncfusion.Chart.WinUI" Version="x.x.x.x" />
</ItemGroup>
```

**2. Rebuild Solution:**
- Clean Solution (Build → Clean Solution)
- Rebuild Solution (Build → Rebuild Solution)

**3. Check XAML Namespace:**
```xml
<Window
    ...
    xmlns:chart="using:Syncfusion.UI.Xaml.Charts">
```

**4. Restart Visual Studio:**
- IntelliSense can sometimes be stale
- Restart resolves most designer issues

## License Issues

### Problem: "Invalid License" or Trial Watermark

**Symptoms:**
- "Invalid License" message
- Trial watermark on chart
- License expired error

**Solutions:**

**1. Register License Key:**

Ensure license is registered BEFORE `InitializeComponent()`:

```csharp
public App()
{
    // Register license FIRST
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    
    // THEN initialize
    this.InitializeComponent();
}
```

**2. Verify License Key:**
- Check for typos in the license key
- Ensure no extra spaces or line breaks
- Verify key matches your Syncfusion version

**3. Get Valid License:**
- **Community License:** https://www.syncfusion.com/products/communitylicense
- **Trial License:** https://www.syncfusion.com/account/manage-trials/downloads
- **Commercial License:** Contact Syncfusion sales

**4. Check License Expiration:**
```csharp
// For trial licenses, check expiration date
// Renew or upgrade before expiration
```

### Problem: License Key Not Working

**Symptoms:**
- Valid key shows as invalid
- Registration seems to do nothing

**Solutions:**

**1. Version Mismatch:**
```csharp
// Ensure license version matches package version
// License for v20.x won't work with v21.x
```

**2. Multiple Calls:**
```csharp
// Don't call RegisterLicense multiple times
// Call once in App constructor only
```

**3. Platform Mismatch:**
- Ensure you have a WinUI license, not WPF or other platform

## Data Binding Problems

### Problem: Chart is Empty / No Data Displayed

**Symptoms:**
- Chart renders but no data points visible
- Series appears blank
- Axes show but no plot

**Solutions:**

**1. Verify Data is Not Null:**
```csharp
// Check data in debugger
public ObservableCollection<DataPoint> ChartData { get; set; }

public ChartViewModel()
{
    ChartData = new ObservableCollection<DataPoint>();
    
    // Ensure data is added
    ChartData.Add(new DataPoint { Category = "A", Value = 10 });
    // ... more data
    
    // Verify count
    Debug.WriteLine($"Data Count: {ChartData.Count}");
}
```

**2. Check Binding Paths:**
```xml
<!-- Ensure property names match exactly (case-sensitive) -->
<chart:PolarAreaSeries ItemsSource="{Binding ChartData}"
                       XBindingPath="Category"
                       YBindingPath="Value"/>
<!-- "Category" and "Value" must match property names exactly -->
```

**3. Verify DataContext:**
```xml
<!-- Ensure DataContext is set -->
<chart:SfPolarChart>
    <chart:SfPolarChart.DataContext>
        <local:ChartViewModel/>
    </chart:SfPolarChart.DataContext>
</chart:SfPolarChart>
```

**4. Check Data Values:**
```csharp
// Ensure Y values are not all zero or null
// Ensure Y values are numeric
public class DataPoint
{
    public string Category { get; set; }
    public double Value { get; set; }  // Must be numeric
}
```

**5. Verify Axes Configuration:**
```xml
<!-- Both axes must be configured -->
<chart:SfPolarChart.PrimaryAxis>
    <chart:CategoryAxis/>
</chart:SfPolarChart.PrimaryAxis>

<chart:SfPolarChart.SecondaryAxis>
    <chart:NumericalAxis/>
</chart:SfPolarChart.SecondaryAxis>
```

### Problem: Data Not Updating

**Symptoms:**
- Initial data shows but updates don't reflect
- Adding/removing data has no effect

**Solutions:**

**1. Use ObservableCollection:**
```csharp
// GOOD: Updates automatically
public ObservableCollection<DataPoint> Data { get; set; }

// BAD: Does not notify changes
public List<DataPoint> Data { get; set; }
```

**2. Implement INotifyPropertyChanged:**
```csharp
public class ChartViewModel : INotifyPropertyChanged
{
    private ObservableCollection<DataPoint> _data;
    
    public ObservableCollection<DataPoint> Data
    {
        get => _data;
        set
        {
            _data = value;
            OnPropertyChanged(nameof(Data));
        }
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged(string propertyName)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
```

**3. Refresh Binding:**
```csharp
// If using List instead of ObservableCollection
series.ItemsSource = null;
series.ItemsSource = data;
```

## Rendering Issues

### Problem: Chart Not Visible

**Symptoms:**
- Chart doesn't appear at all
- White/blank space where chart should be

**Solutions:**

**1. Check Container Size:**
```xml
<!-- Ensure parent container has size -->
<Grid Width="800" Height="600">
    <chart:SfPolarChart/>
</Grid>

<!-- OR use stretch -->
<Grid>
    <chart:SfPolarChart HorizontalAlignment="Stretch"
                        VerticalAlignment="Stretch"/>
</Grid>
```

**2. Verify Z-Index/Layering:**
```xml
<!-- Ensure chart is not behind other elements -->
<Grid>
    <chart:SfPolarChart Canvas.ZIndex="1"/>
</Grid>
```

**3. Check Visibility:**
```xml
<!-- Ensure Visibility is not Collapsed -->
<chart:SfPolarChart Visibility="Visible"/>
```

### Problem: Chart Cut Off or Clipped

**Symptoms:**
- Parts of chart are missing
- Labels are cut off
- Legend is partially hidden

**Solutions:**

**1. Add Margin:**
```xml
<chart:SfPolarChart Margin="20">
    <!-- Adds space around chart -->
</chart:SfPolarChart>
```

**2. Adjust Container:**
```xml
<ScrollViewer>
    <chart:SfPolarChart MinWidth="600" MinHeight="400"/>
</ScrollViewer>
```

**3. Legend Placement:**
```xml
<!-- If legend is cut off, adjust placement -->
<chart:ChartLegend Placement="Right"/>
```

## Performance Problems

### Problem: Slow Rendering

**Symptoms:**
- Chart takes long to load
- UI freezes during updates
- Laggy interactions

**Solutions:**

**1. Limit Data Points:**
```csharp
// Good: Reasonable data size
public ObservableCollection<DataPoint> Data { get; set; } = new();
// Keep under 1000 points per series for best performance

// Bad: Too many points
// 10,000+ points can cause performance issues
```

**2. Disable Animations:**
```xml
<chart:PolarLineSeries EnableAnimation="False"/>
```

**3. Simplify Styling:**
```xml
<!-- Avoid complex gradients on large datasets -->
<chart:PolarAreaSeries Fill="Blue"/>  <!-- Simple is faster -->
```

**4. Use Appropriate Update Strategy:**
```csharp
// Batch updates
ChartData.Clear();
foreach (var item in newData)
{
    ChartData.Add(item);
}

// Better: Replace collection
ChartData = new ObservableCollection<DataPoint>(newData);
```

**5. Optimize Data Labels:**
```xml
<!-- Disable for large datasets -->
<chart:PolarLineSeries ShowDataLabels="False"/>
```

### Problem: Memory Leaks

**Symptoms:**
- Memory usage grows over time
- Application slows down after multiple chart updates

**Solutions:**

**1. Clear Event Handlers:**
```csharp
public void Cleanup()
{
    // Unsubscribe from events
    if (chart != null)
    {
        chart.Loaded -= Chart_Loaded;
        chart = null;
    }
}
```

**2. Dispose Resources:**
```csharp
// Clear data when not needed
ChartData?.Clear();
```

**3. Avoid Circular References:**
```csharp
// Don't keep references to chart in data models
public class DataPoint
{
    // BAD: Circular reference
    // public SfPolarChart Chart { get; set; }
    
    // GOOD: Just data
    public string Category { get; set; }
    public double Value { get; set; }
}
```

## Styling and Appearance Issues

### Problem: Colors Not Applying

**Symptoms:**
- Custom colors don't show
- Palette not working
- Fill/Stroke ignored

**Solutions:**

**1. Check Brush Creation:**
```csharp
// GOOD: Proper brush
series.Fill = new SolidColorBrush(Colors.Blue);

// BAD: Won't work
series.Fill = Colors.Blue;  // Colors is not a Brush
```

**2. Verify Palette Syntax:**
```xml
<chart:SfPolarChart.Resources>
    <BrushCollection x:Key="customBrushes">
        <SolidColorBrush Color="#FF0000"/>
        <SolidColorBrush Color="#00FF00"/>
    </BrushCollection>
</chart:SfPolarChart.Resources>

<chart:SfPolarChart PaletteBrushes="{StaticResource customBrushes}">
```

**3. Series Override:**
```xml
<!-- Series Fill overrides palette -->
<chart:PolarAreaSeries Fill="Red"/>  <!-- This takes precedence -->
```

### Problem: Data Labels Not Showing

**Symptoms:**
- ShowDataLabels="True" but labels don't appear
- Labels are invisible

**Solutions:**

**1. Check Context:**
```xml
<chart:PolarDataLabelSettings Context="YValue"/>
<!-- Ensure Context is set to valid value -->
```

**2. Verify Foreground:**
```xml
<!-- Labels might be same color as background -->
<chart:PolarDataLabelSettings Foreground="White"
                              Background="Black"/>
```

**3. Check Data Values:**
```csharp
// Ensure Y values exist and are valid
public double Value { get; set; }  // Not null, not NaN
```

## Axis Configuration Issues

### Problem: Axis Labels Not Showing

**Symptoms:**
- Axes render but no labels
- Empty axis labels

**Solutions:**

**1. Verify Data:**
```csharp
// Ensure X values are not null or empty
public string Category { get; set; }  // Must have value
```

**2. Check LabelFormat:**
```xml
<!-- For numerical axis, ensure format is valid -->
<chart:NumericalAxis>
    <chart:NumericalAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="0.0"/>
    </chart:NumericalAxis.LabelStyle>
</chart:NumericalAxis>
```

### Problem: Axis Range Issues

**Symptoms:**
- Data points outside visible range
- Axis too small or too large

**Solutions:**

**1. Set Explicit Range:**
```xml
<chart:NumericalAxis Minimum="0" Maximum="100" Interval="20"/>
```

**2. Check Data Range:**
```csharp
// Ensure data values are within reasonable range
var minValue = data.Min(d => d.Value);
var maxValue = data.Max(d => d.Value);
Debug.WriteLine($"Range: {minValue} to {maxValue}");
```

**3. Use Auto Range:**
```xml
<!-- Remove Minimum/Maximum to auto-calculate -->
<chart:NumericalAxis/>
```

## Best Practices

### Development Practices

**1. Start Simple:**
```xml
<!-- Begin with minimal configuration -->
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
    <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                           XBindingPath="Category"
                           YBindingPath="Value"/>
</chart:SfPolarChart>
<!-- Add features incrementally -->
```

**2. Test with Sample Data:**
```csharp
// Use hardcoded data first
ChartData = new ObservableCollection<DataPoint>
{
    new DataPoint { Category = "A", Value = 10 },
    new DataPoint { Category = "B", Value = 20 },
    new DataPoint { Category = "C", Value = 15 }
};
// Verify chart works before connecting real data
```

**3. Use Debugger:**
```csharp
// Add breakpoints to check data flow
public ObservableCollection<DataPoint> ChartData
{
    get
    {
        Debug.WriteLine($"ChartData accessed: {_chartData?.Count} items");
        return _chartData;
    }
    set
    {
        _chartData = value;
        Debug.WriteLine($"ChartData set: {value?.Count} items");
        OnPropertyChanged(nameof(ChartData));
    }
}
```

### Data Management

**1. Validate Data:**
```csharp
public void LoadData(IEnumerable<DataPoint> data)
{
    if (data == null)
    {
        Debug.WriteLine("Warning: Null data provided");
        return;
    }
    
    var validData = data.Where(d => 
        !string.IsNullOrEmpty(d.Category) && 
        !double.IsNaN(d.Value) &&
        !double.IsInfinity(d.Value)
    );
    
    ChartData = new ObservableCollection<DataPoint>(validData);
}
```

**2. Handle Empty Data:**
```xml
<!-- Show message when no data -->
<Grid>
    <chart:SfPolarChart Visibility="{Binding HasData, Converter={StaticResource BoolToVisibilityConverter}}"/>
    <TextBlock Text="No data available"
               Visibility="{Binding HasData, Converter={StaticResource InverseBoolToVisibilityConverter}}"/>
</Grid>
```

### Performance Optimization

**1. Lazy Loading:**
```csharp
// Load data only when needed
private ObservableCollection<DataPoint> _chartData;
public ObservableCollection<DataPoint> ChartData
{
    get
    {
        if (_chartData == null)
        {
            _chartData = LoadChartData();
        }
        return _chartData;
    }
}
```

**2. Data Aggregation:**
```csharp
// Aggregate large datasets
if (rawData.Count > 1000)
{
    // Group and average
    var aggregated = rawData
        .GroupBy(d => d.Category)
        .Select(g => new DataPoint
        {
            Category = g.Key,
            Value = g.Average(d => d.Value)
        });
    
    ChartData = new ObservableCollection<DataPoint>(aggregated);
}
```

## FAQ

**Q: How many data points can a polar chart handle?**  
A: For optimal performance, keep under 500 points per series. Charts with 1000+ points may experience slowdown.

**Q: Can I use datetime on the primary axis?**  
A: Yes, use `DateTimeAxis` for the `PrimaryAxis` for time-based data.

**Q: How do I export the chart as an image?**  
A: Use RenderTargetBitmap to capture the chart visual to an image file.

**Q: Can I have multiple Y-axes?**  
A: No, polar charts support one primary (angular) and one secondary (radial) axis only.

**Q: How do I handle null values in data?**  
A: Filter out null values before binding, or handle in your data model with default values.

**Q: Is there a maximum number of series?**  
A: No hard limit, but for readability, limit to 3-5 series. Performance degrades with many series.

**Q: Can I animate transitions between data sets?**  
A: Yes, enable `EnableAnimation="True"` on series for animated updates.

**Q: How do I make the chart responsive?**  
A: Use `HorizontalAlignment="Stretch"` and `VerticalAlignment="Stretch"` and place in a responsive container.

## Getting Help

If you continue to experience issues:

1. **Check Documentation:** https://help.syncfusion.com/winui/polar-chart/overview
2. **Search Knowledge Base:** https://www.syncfusion.com/kb/winui
3. **Community Forums:** https://www.syncfusion.com/forums/winui
4. **Direct Support:** https://www.syncfusion.com/support/directtrac (for license holders)
5. **GitHub Issues:** https://github.com/syncfusion/winui-demos/issues

## Summary

Most polar chart issues fall into these categories:
- **Setup:** License registration and package installation
- **Data Binding:** Property names, DataContext, ObservableCollection
- **Rendering:** Container size, visibility, layering
- **Performance:** Data volume, animations, styling complexity
- **Configuration:** Axis setup, series properties, valid values

Follow best practices, start simple, and add complexity incrementally for the best results!
