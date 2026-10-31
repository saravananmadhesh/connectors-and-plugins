# Axis Configuration in Polar Charts

Complete guide to configuring and customizing axes in Syncfusion WinUI Polar Chart, including all four axis types and their properties.

## Table of Contents
- [Axis Overview](#axis-overview)
- [Category Axis](#category-axis)
- [Numerical Axis](#numerical-axis)
- [DateTime Axis](#datetime-axis)
- [Logarithmic Axis](#logarithmic-axis)
- [Axis Events](#axis-events)
- [Best Practices](#best-practices)

## Axis Overview

Polar charts use two axes to define the coordinate system:

- **PrimaryAxis:** Angular axis (categories arranged around the circle)
- **SecondaryAxis:** Radial axis (numeric scale from center to edge)

### Axis Types Supported

| Axis Type | Use Case | Data Type |
|-----------|----------|-----------|
| CategoryAxis | Named categories, labels | string |
| NumericalAxis | Numeric values, ranges | double, int |
| DateTimeAxis | Time-series data | DateTime |
| LogarithmicAxis | Large value ranges | double (positive) |

### Basic Axis Setup

```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

## Category Axis

The CategoryAxis is an index-based axis that plots values based on the index of the data point collection. Points are equally spaced.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
    
    <chart:PolarLineSeries ItemsSource="{Binding Data}"
                           XBindingPath="Category"
                           YBindingPath="Value"/>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.PrimaryAxis = new CategoryAxis();
chart.SecondaryAxis = new NumericalAxis();
```

### When to Use Category Axis

**Best for:**
- Named categories (North, South, East, West)
- Text labels (Product names, regions, skills)
- Ordinal data (rankings, levels)
- Any non-numeric X-axis values

**Example Data:**
```csharp
public class DirectionalData
{
    public string Direction { get; set; }  // Category
    public double Value { get; set; }
}

// Data: North, South, East, West, etc.
```

### Category Axis Properties

```xml
<chart:CategoryAxis ShowGridLines="True"
                    ArrangeByIndex="True"
                    LabelPlacement="BetweenTicks"/>
```

**Key Properties:**
- `ArrangeByIndex` - Arrange data points by index (default: true)
- `LabelPlacement` - BetweenTicks or OnTicks
- `ShowGridLines` - Show/hide grid lines

## Numerical Axis

The NumericalAxis is used to plot numerical values with a linear scale on the radial axis.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.PrimaryAxis = new CategoryAxis();
chart.SecondaryAxis = new NumericalAxis();
```

### Customizing the Range

Set custom minimum, maximum, and interval values:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis Minimum="0"
                             Maximum="100"
                             Interval="20"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
NumericalAxis secondaryAxis = new NumericalAxis()
{
    Minimum = 0,
    Maximum = 100,
    Interval = 20
};
chart.SecondaryAxis = secondaryAxis;
```

### Auto-Ranging Behavior

If you set only `Minimum` or `Maximum`, the other value is calculated automatically:

```xml
<!-- Only set Maximum, Minimum calculated from data -->
<chart:NumericalAxis Maximum="100"/>

<!-- Only set Minimum, Maximum calculated from data -->
<chart:NumericalAxis Minimum="0"/>
```

### Interval Configuration

**Auto Interval:**
```xml
<!-- Interval calculated automatically from range -->
<chart:NumericalAxis Minimum="0" Maximum="100"/>
```

**Manual Interval:**
```xml
<!-- Explicit interval of 10 -->
<chart:NumericalAxis Minimum="0" 
                     Maximum="100" 
                     Interval="10"/>
```

### Edge Cases Configuration

**RangePadding:**
Control how the axis range extends beyond data:

```xml
<chart:NumericalAxis RangePadding="None"/>
<!-- Options: None, Round, Additional, Auto -->
```

### Numerical Axis on Primary

You can also use NumericalAxis on the PrimaryAxis (angular):

```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**Use case:** When both axes represent numeric ranges (e.g., angle in degrees vs. radius).

## DateTime Axis

The DateTimeAxis is used to plot chart data with DateTime values on the axis.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:DateTimeAxis Interval="1"
                            IntervalType="Months">
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="MMM/dd"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
DateTimeAxis primaryAxis = new DateTimeAxis()
{
    Interval = 1,
    IntervalType = DateTimeIntervalType.Months,
    LabelStyle = new LabelStyle() { LabelFormat = "MMM/dd" }
};
chart.PrimaryAxis = primaryAxis;
chart.SecondaryAxis = new NumericalAxis();
```

### Interval Types

The `IntervalType` property determines the unit for the interval:

**Available Types:**
- `Auto` - Automatically determined
- `Years`
- `Months`
- `Days`
- `Hours`
- `Minutes`
- `Seconds`
- `Milliseconds`

**Example:**
```xml
<!-- Show data points every 6 months -->
<chart:DateTimeAxis Interval="6" 
                    IntervalType="Months"/>

<!-- Show data points every 7 days -->
<chart:DateTimeAxis Interval="7" 
                    IntervalType="Days"/>
```

### Date Formatting

Format date labels using standard .NET date format strings:

```xml
<chart:DateTimeAxis IntervalType="Months">
    <chart:DateTimeAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="MMM yyyy"/>  <!-- Jan 2026 -->
    </chart:DateTimeAxis.LabelStyle>
</chart:DateTimeAxis>
```

**Common Formats:**
- `MMM/dd` - Jan/15
- `MMM yyyy` - Jan 2026
- `dd-MM-yyyy` - 15-01-2026
- `MM/dd/yy` - 01/15/26
- `yyyy-MM-dd` - 2026-01-15

### DateTime Range

**XAML:**
```xml
<chart:DateTimeAxis Minimum="2026-01-01" 
                    Maximum="2026-12-31"
                    IntervalType="Months"
                    Interval="1"/>
```

**C# Code:**
```csharp
DateTimeAxis axis = new DateTimeAxis()
{
    Minimum = new DateTime(2026, 1, 1),
    Maximum = new DateTime(2026, 12, 31),
    IntervalType = DateTimeIntervalType.Months,
    Interval = 1
};
```

### Use Case Example: Seasonal Data

```csharp
// Data model with DateTime
public class SeasonalData
{
    public DateTime Month { get; set; }
    public double Temperature { get; set; }
}

// View model
public class ViewModel
{
    public ObservableCollection<SeasonalData> Data { get; set; }
    
    public ViewModel()
    {
        Data = new ObservableCollection<SeasonalData>()
        {
            new SeasonalData { Month = new DateTime(2026, 1, 1), Temperature = 45 },
            new SeasonalData { Month = new DateTime(2026, 2, 1), Temperature = 48 },
            new SeasonalData { Month = new DateTime(2026, 3, 1), Temperature = 55 },
            // ... more months
        };
    }
}
```

```xml
<chart:PolarLineSeries ItemsSource="{Binding Data}"
                       XBindingPath="Month"
                       YBindingPath="Temperature"/>
```

## Logarithmic Axis

The LogarithmicAxis uses a logarithmic scale, making it highly effective for visualizing data with large range differences.

### Basic Implementation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:LogarithmicAxis/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.PrimaryAxis = new CategoryAxis();
chart.SecondaryAxis = new LogarithmicAxis();
```

### When to Use Logarithmic Axis

**Best for:**
- Data spanning multiple orders of magnitude (1, 10, 100, 1000, ...)
- Scientific measurements (pH, earthquake magnitudes, sound levels)
- Financial data with exponential growth
- Population statistics
- Data where relative change is more important than absolute change

**Example:** Display values ranging from 100 to 10,000 on a readable scale.

### Interval Configuration

The `Interval` property determines the spacing between axis labels. Default is 1.

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:LogarithmicAxis Interval="10"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
LogarithmicAxis secondaryAxis = new LogarithmicAxis()
{
    Interval = 10
};
chart.SecondaryAxis = secondaryAxis;
```

### Customizing the Range

Set custom minimum and maximum values:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:LogarithmicAxis Minimum="100" 
                               Maximum="10000"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
LogarithmicAxis secondaryAxis = new LogarithmicAxis()
{
    Minimum = 100,
    Maximum = 10000
};
chart.SecondaryAxis = secondaryAxis;
```

**Note:** If minimum or maximum is not set, it's automatically calculated from the data range.

### Customizing the Logarithmic Base

Change the base of the logarithm using the `LogarithmicBase` property. Default is 10.

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:LogarithmicAxis LogarithmicBase="2"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
LogarithmicAxis secondaryAxis = new LogarithmicAxis()
{
    LogarithmicBase = 2  // Base 2 logarithm
};
chart.SecondaryAxis = secondaryAxis;
```

**Common Bases:**
- `10` - Common logarithm (default) - used in science
- `2` - Binary logarithm - used in computer science
- `Math.E` (≈2.718) - Natural logarithm - used in mathematics

### Complete Example

```xml
<chart:SfPolarChart Header="Logarithmic Scale Example">
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:LogarithmicAxis Minimum="100"
                               Maximum="10000"
                               Interval="10"
                               LogarithmicBase="10"/>
    </chart:SfPolarChart.SecondaryAxis>
    
    <chart:PolarLineSeries ItemsSource="{Binding ScientificData}"
                           XBindingPath="Category"
                           YBindingPath="Value"/>
</chart:SfPolarChart>
```

## Axis Events

Polar chart axes support events for advanced customization and interaction.

### ActualRangeChanged Event

Triggered when the actual range of the axis changes (after auto-calculation).

**XAML:**
```xml
<chart:NumericalAxis x:Name="secondaryAxis"
                     ActualRangeChanged="SecondaryAxis_ActualRangeChanged"/>
```

**C# Event Handler:**
```csharp
private void SecondaryAxis_ActualRangeChanged(object sender, ActualRangeChangedEventArgs e)
{
    // Get the calculated range
    double actualMin = e.ActualMinimum;
    double actualMax = e.ActualMaximum;
    
    // Log or use the values
    Debug.WriteLine($"Axis range: {actualMin} to {actualMax}");
    
    // Optionally adjust based on range
    if (actualMax > 1000)
    {
        // Perform some action
    }
}
```

**Event Arguments:**
- `ActualMinimum` - The calculated minimum value
- `ActualMaximum` - The calculated maximum value

**Use Cases:**
- Synchronize multiple charts
- Adjust UI based on data range
- Display range information to users
- Trigger calculations based on scale

### LabelCreated Event

Triggered when each axis label is created, allowing customization of label content and appearance.

**XAML:**
```xml
<chart:NumericalAxis LabelCreated="SecondaryAxis_LabelCreated"/>
```

**C# Event Handler:**
```csharp
private void SecondaryAxis_LabelCreated(object sender, ChartAxisLabelEventArgs e)
{
    // Get label properties
    string labelText = e.Label;      // Original label text
    double position = e.Position;    // Position on axis
    
    // Modify label text
    e.Label = $"${e.Label}K";  // Add prefix/suffix
    
    // Customize label style
    e.LabelStyle = new LabelStyle()
    {
        Foreground = new SolidColorBrush(Colors.Blue),
        FontSize = 12,
    };
}
```

**Event Arguments:**
- `Label` - Gets or sets the label text
- `Position` - Gets the position of the label on the axis
- `LabelStyle` - Gets or sets the label style

**Use Cases:**
- Add units to labels ($, kg, °C, etc.)
- Format numbers with custom patterns
- Apply conditional styling (color negative values red)
- Abbreviate long labels
- Localize labels

### Example: Custom Currency Labels

```csharp
private void AxisLabelCreated(object sender, ChartAxisLabelEventArgs e)
{
    // Parse the label value
    if (double.TryParse(e.Label, out double value))
    {
        // Format as currency
        e.Label = value.ToString("C0");  // $1,234
        
        // Color negative values red
        if (value < 0)
        {
            e.LabelStyle = new LabelStyle()
            {
                Foreground = new SolidColorBrush(Colors.Red)
            };
        }
    }
}
```

### Example: Abbreviated Large Numbers

```csharp
private void AxisLabelCreated(object sender, ChartAxisLabelEventArgs e)
{
    if (double.TryParse(e.Label, out double value))
    {
        if (value >= 1000000)
            e.Label = $"{value / 1000000:0.#}M";  // 1.5M
        else if (value >= 1000)
            e.Label = $"{value / 1000:0.#}K";      // 1.5K
    }
}
```

## Best Practices

### Axis Type Selection

1. **Primary Axis (Angular):**
   - Use **CategoryAxis** for named categories (most common)
   - Use **NumericalAxis** for numeric angles or ranges
   - Use **DateTimeAxis** for time-based circular data (24-hour cycles, seasons)

2. **Secondary Axis (Radial):**
   - Use **NumericalAxis** for most numeric data (most common)
   - Use **LogarithmicAxis** for wide-ranging values
   - Rarely use CategoryAxis or DateTimeAxis on secondary axis

### Range Configuration

1. **Let auto-ranging work when possible:**
   ```xml
   <chart:NumericalAxis/>  <!-- Auto-calculates from data -->
   ```

2. **Set explicit ranges for consistency:**
   ```xml
   <chart:NumericalAxis Minimum="0" Maximum="100"/>
   ```

3. **Use round numbers for intervals:**
   ```xml
   <chart:NumericalAxis Interval="10"/>  <!-- Not 7 or 13 -->
   ```

### Performance Tips

1. **Limit DateTime precision:**
   - Don't use `Milliseconds` unless necessary
   - Aggregate data to appropriate intervals

2. **Cache axis instances:**
   ```csharp
   // Reuse axis instances when creating multiple charts
   private readonly CategoryAxis _sharedPrimaryAxis = new CategoryAxis();
   ```

3. **Set explicit ranges to avoid recalculation:**
   ```xml
   <chart:NumericalAxis Minimum="0" Maximum="100" Interval="20"/>
   ```

### Accessibility

1. **Always provide axis titles:**
   ```xml
   <chart:NumericalAxis Header="Temperature (°C)"/>
   ```

2. **Use clear label formats:**
   ```xml
   <chart:DateTimeAxis.LabelStyle>
       <chart:LabelStyle LabelFormat="MMM yyyy"/>
   </chart:DateTimeAxis.LabelStyle>
   ```

3. **Ensure sufficient contrast for labels**

## Summary

**Key Points:**
- **CategoryAxis:** For named categories (most common for primary axis)
- **NumericalAxis:** For numeric ranges (most common for secondary axis)
- **DateTimeAxis:** For time-series data
- **LogarithmicAxis:** For wide-ranging values
- **Events:** Use ActualRangeChanged and LabelCreated for advanced customization
- **Range settings:** Balance auto-ranging convenience with explicit control

Choose the appropriate axis type based on your data and customize ranges and intervals for optimal readability!
