# Axis Customization in Polar Charts

Complete guide to customizing axis labels, titles, and styling in Syncfusion WinUI Polar Chart.

## Table of Contents
- [Axis Labels](#axis-labels)
- [Axis Titles (Headers)](#axis-titles-headers)
- [Label Rotation](#label-rotation)
- [Label Formatting](#label-formatting)
- [Label Templates](#label-templates)
- [Header Styling](#header-styling)
- [Header Templates](#header-templates)
- [Complete Examples](#complete-examples)

## Axis Labels

Axis labels show the units, measures, or category values along the axis to help visualize the data. They are automatically generated based on the range and values in the chart.

### Basic Label Display

Labels are shown by default on both axes:

```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>  <!-- Labels: North, South, East, etc. -->
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis/>  <!-- Labels: 0, 20, 40, 60, etc. -->
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

## Label Rotation

The `LabelRotation` property rotates label content by a specified angle in degrees.

### Basic Rotation

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis LabelRotation="30"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
NumericalAxis secondaryAxis = new NumericalAxis()
{
    LabelRotation = 30  // Rotate labels 30 degrees
};
chart.SecondaryAxis = secondaryAxis;
```

### Rotation Values

- **0°** - Horizontal (default)
- **45°** - Diagonal (good for long labels)
- **90°** - Vertical (saves space)
- **-45°** - Diagonal opposite direction
- Any value from **-360 to 360**

### Use Cases for Rotation

**Horizontal Labels (0°):**
```xml
<chart:CategoryAxis LabelRotation="0"/>
<!-- Best for: Short labels, ample space -->
```

**Diagonal Labels (45° or -45°):**
```xml
<chart:CategoryAxis LabelRotation="45"/>
<!-- Best for: Medium-length labels, moderate space constraints -->
```

**Vertical Labels (90°):**
```xml
<chart:CategoryAxis LabelRotation="90"/>
<!-- Best for: Long labels, tight spaces -->
```

### Example: Rotating Primary Axis Labels

```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis LabelRotation="-45"/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis LabelRotation="30"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

## Label Formatting

Format axis labels using predefined format strings based on the data type.

### Numerical Formatting

Use standard .NET numeric format strings:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis>
            <chart:NumericalAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="0.0"/>
            </chart:NumericalAxis.LabelStyle>
        </chart:NumericalAxis>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
NumericalAxis secondaryAxis = new NumericalAxis()
{
    LabelStyle = new LabelStyle() { LabelFormat = "0.0" }
};
chart.SecondaryAxis = secondaryAxis;
```

### Common Numeric Formats

| Format | Example Input | Example Output | Description |
|--------|---------------|----------------|-------------|
| `"0"` | 1234.56 | 1235 | Integer (rounded) |
| `"0.0"` | 1234.56 | 1234.6 | One decimal place |
| `"0.00"` | 1234.56 | 1234.56 | Two decimal places |
| `"#,##0"` | 1234.56 | 1,235 | Thousands separator |
| `"#,##0.00"` | 1234.56 | 1,234.56 | With decimals |
| `"0%"` | 0.85 | 85% | Percentage |
| `"0.0%"` | 0.8567 | 85.7% | Percentage with decimal |
| `"C"` | 1234.56 | $1,234.56 | Currency |
| `"C0"` | 1234.56 | $1,235 | Currency no decimals |
| `"N"` | 1234.56 | 1,234.56 | Number with separators |
| `"N0"` | 1234.56 | 1,235 | Number rounded |

### DateTime Formatting

For DateTimeAxis, use standard .NET date format strings:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:DateTimeAxis IntervalType="Months">
            <chart:DateTimeAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="MMM/dd"/>
            </chart:DateTimeAxis.LabelStyle>
        </chart:DateTimeAxis>
    </chart:SfPolarChart.PrimaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
DateTimeAxis primaryAxis = new DateTimeAxis()
{
    IntervalType = DateTimeIntervalType.Months,
    LabelStyle = new LabelStyle() { LabelFormat = "MMM/dd" }
};
chart.PrimaryAxis = primaryAxis;
```

### Common DateTime Formats

| Format | Example Output | Description |
|--------|----------------|-------------|
| `"MMM/dd"` | Jan/15 | Month abbreviation and day |
| `"MMM yyyy"` | Jan 2026 | Month and year |
| `"MM/dd/yy"` | 01/15/26 | Short date |
| `"dd-MM-yyyy"` | 15-01-2026 | European format |
| `"yyyy-MM-dd"` | 2026-01-15 | ISO format |
| `"MMMM d, yyyy"` | January 15, 2026 | Long date |
| `"ddd, MMM dd"` | Wed, Jan 15 | Day of week and date |
| `"HH:mm"` | 14:30 | 24-hour time |
| `"hh:mm tt"` | 02:30 PM | 12-hour time |

### Custom Label Style

Apply comprehensive styling to labels:

```xml
<chart:NumericalAxis>
    <chart:NumericalAxis.LabelStyle>
        <chart:LabelStyle LabelFormat="#,##0"
                          Foreground="Blue"
                          FontSize="12"
                          FontFamily="Arial"
                          FontStyle="Italic"/>
    </chart:NumericalAxis.LabelStyle>
</chart:NumericalAxis>
```

## Label Templates

Use data templates for complete custom control over label appearance.

### Basic Template

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="labelTemplate">
            <Border Background="Blue"
                    CornerRadius="5"
                    BorderThickness="1"
                    BorderBrush="White">
                <TextBlock Text="{Binding Content}"
                           Foreground="White"
                           FontSize="10"
                           Margin="3"/>
            </Border>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfPolarChart>
        <chart:SfPolarChart.PrimaryAxis>
            <chart:CategoryAxis LabelTemplate="{StaticResource labelTemplate}"/>
        </chart:SfPolarChart.PrimaryAxis>
        
        <chart:SfPolarChart.SecondaryAxis>
            <chart:NumericalAxis/>
        </chart:SfPolarChart.SecondaryAxis>
    </chart:SfPolarChart>
</Grid>
```

**C# Code:**
```csharp
CategoryAxis primaryAxis = new CategoryAxis()
{
    LabelTemplate = grid.Resources["labelTemplate"] as DataTemplate
};
chart.PrimaryAxis = primaryAxis;
```

### Template Binding

The binding context for the template is the label content. Use `{Binding Content}` to access the label text.

### Advanced Template Example: Icon Labels

```xml
<DataTemplate x:Key="iconLabelTemplate">
    <StackPanel Orientation="Horizontal" Spacing="4">
        <!-- Icon -->
        <FontIcon Glyph="&#xE82F;" FontSize="12" Foreground="Green"/>
        <!-- Label Text -->
        <TextBlock Text="{Binding Content}" 
                   FontSize="11" 
                   Foreground="Black"/>
    </StackPanel>
</DataTemplate>
```

### Template Example: Colored Labels

```xml
<DataTemplate x:Key="coloredLabelTemplate">
    <Grid>
        <Rectangle Fill="Orange" 
                   RadiusX="3" 
                   RadiusY="3" 
                   Opacity="0.3"/>
        <TextBlock Text="{Binding Content}"
                   Margin="5,2"
                   Foreground="DarkOrange"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center"/>
    </Grid>
</DataTemplate>
```

## Axis Titles (Headers)

Axis titles provide context about what the axis represents.

### Adding Axis Titles

**Important:** Polar chart supports titles for the **secondary axis only** (radial axis).

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis/>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis Header="Temperature (°C)"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
NumericalAxis secondaryAxis = new NumericalAxis()
{
    Header = "Temperature (°C)"
};
chart.SecondaryAxis = secondaryAxis;
```

### Header as UIElement

The `Header` property accepts any UIElement, allowing rich customization:

```xml
<chart:NumericalAxis>
    <chart:NumericalAxis.Header>
        <TextBlock Text="Sales Revenue"
                   Foreground="Blue"
                   FontSize="14"/>
    </chart:NumericalAxis.Header>
</chart:NumericalAxis>
```

## Header Styling

Apply styling to axis headers using `HeaderStyle`.

### Basic Header Style

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis Header="Tree Count">
            <chart:NumericalAxis.HeaderStyle>
                <chart:LabelStyle FontFamily="Algerian"
                                  FontSize="13"
                                  Foreground="Black"/>
            </chart:NumericalAxis.HeaderStyle>
        </chart:NumericalAxis>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
LabelStyle headerStyle = new LabelStyle()
{
    FontFamily = new FontFamily("Algerian"),
    FontSize = 13,
    Foreground = new SolidColorBrush(Colors.Black),
};

NumericalAxis secondaryAxis = new NumericalAxis()
{
    Header = "Tree Count",
    HeaderStyle = headerStyle
};
chart.SecondaryAxis = secondaryAxis;
```

### HeaderStyle Properties

Available properties for styling:
- `FontFamily` - Font family name
- `FontSize` - Font size in points
- `Foreground` - Text color

## Header Templates

For advanced header customization, use `HeaderTemplate`.

### Basic Header Template

**XAML:**
```xml
<chart:SfPolarChart x:Name="chart">
    <chart:SfPolarChart.Resources>
        <DataTemplate x:Key="headerTemplate">
            <Border BorderBrush="Blue"
                    CornerRadius="5"
                    BorderThickness="1"
                    Padding="5">
                <TextBlock Text="{Binding}"
                           FontSize="12"
                           Foreground="DarkBlue"/>
            </Border>
        </DataTemplate>
    </chart:SfPolarChart.Resources>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis Header="Temperature (°C)"
                             HeaderTemplate="{StaticResource headerTemplate}"/>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
NumericalAxis secondaryAxis = new NumericalAxis()
{
    Header = "Temperature (°C)",
    HeaderTemplate = chart.Resources["headerTemplate"] as DataTemplate
};
chart.SecondaryAxis = secondaryAxis;
```

### Template Binding Context

The binding context for `HeaderTemplate` is the `Header` property value. Use `{Binding}` to access it.

### Advanced Header Template: With Icon

```xml
<DataTemplate x:Key="headerWithIconTemplate">
    <StackPanel Orientation="Horizontal" 
                Spacing="8"
                HorizontalAlignment="Center">
        <!-- Icon -->
        <FontIcon Glyph="&#xE9CA;" 
                  FontSize="16" 
                  Foreground="#1E88E5"/>
        <!-- Header Text -->
        <TextBlock Text="{Binding}"
                   FontSize="14"
                   Foreground="#1E88E5"
                   VerticalAlignment="Center"/>
    </StackPanel>
</DataTemplate>
```

### Styled Header Template

```xml
<DataTemplate x:Key="styledHeaderTemplate">
    <Grid>
        <!-- Background -->
        <Rectangle Fill="#E3F2FD" 
                   RadiusX="8" 
                   RadiusY="8"/>
        <!-- Content -->
        <StackPanel Margin="10,5">
            <TextBlock Text="{Binding}"
                       FontSize="13"
                       Foreground="#0D47A1"
                       HorizontalAlignment="Center"/>
            <Rectangle Height="2" 
                       Fill="#1E88E5" 
                       Margin="0,3,0,0"
                       HorizontalAlignment="Stretch"/>
        </StackPanel>
    </Grid>
</DataTemplate>
```

## Complete Examples

### Example 1: Fully Styled Axis

```xml
<chart:SfPolarChart Header="Comprehensive Axis Styling">
    <chart:SfPolarChart.PrimaryAxis>
        <chart:CategoryAxis LabelRotation="-45">
            <chart:CategoryAxis.LabelStyle>
                <chart:LabelStyle FontSize="11"
                                  Foreground="#424242"/>
            </chart:CategoryAxis.LabelStyle>
        </chart:CategoryAxis>
    </chart:SfPolarChart.PrimaryAxis>
    
    <chart:SfPolarChart.SecondaryAxis>
        <chart:NumericalAxis Header="Performance Score" 
                             LabelRotation="30">
            <chart:NumericalAxis.LabelStyle>
                <chart:LabelStyle LabelFormat="0.0"
                                  FontSize="10"
                                  Foreground="#1976D2"/>
            </chart:NumericalAxis.LabelStyle>
            <chart:NumericalAxis.HeaderStyle>
                <chart:LabelStyle FontSize="14"
                                  Foreground="#0D47A1"/>
            </chart:NumericalAxis.HeaderStyle>
        </chart:NumericalAxis>
    </chart:SfPolarChart.SecondaryAxis>
</chart:SfPolarChart>
```

### Example 2: Custom Templates

```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <!-- Label Template -->
        <DataTemplate x:Key="customLabelTemplate">
            <Border Background="#E8F5E9"
                    BorderBrush="#4CAF50"
                    BorderThickness="1"
                    CornerRadius="4"
                    Padding="4,2">
                <TextBlock Text="{Binding Content}"
                           FontSize="10"
                           Foreground="#2E7D32"/>
            </Border>
        </DataTemplate>
        
        <!-- Header Template -->
        <DataTemplate x:Key="customHeaderTemplate">
            <StackPanel Orientation="Horizontal" Spacing="6">
                <Ellipse Width="12" Height="12" Fill="#4CAF50"/>
                <TextBlock Text="{Binding}"
                           FontSize="13"
                           Foreground="#2E7D32"/>
            </StackPanel>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfPolarChart>
        <chart:SfPolarChart.PrimaryAxis>
            <chart:CategoryAxis LabelTemplate="{StaticResource customLabelTemplate}"/>
        </chart:SfPolarChart.PrimaryAxis>
        
        <chart:SfPolarChart.SecondaryAxis>
            <chart:NumericalAxis Header="Growth Rate"
                                 HeaderTemplate="{StaticResource customHeaderTemplate}">
                <chart:NumericalAxis.LabelStyle>
                    <chart:LabelStyle LabelFormat="0.0%"/>
                </chart:NumericalAxis.LabelStyle>
            </chart:NumericalAxis>
        </chart:SfPolarChart.SecondaryAxis>
    </chart:SfPolarChart>
</Grid>
```

### Example 3: C# Complete Configuration

```csharp
// Primary Axis
CategoryAxis primaryAxis = new CategoryAxis
{
    LabelRotation = -45,
    LabelStyle = new LabelStyle
    {
        FontSize = 11,
        Foreground = new SolidColorBrush(Color.FromArgb(255, 66, 66, 66))
    }
};

// Secondary Axis
NumericalAxis secondaryAxis = new NumericalAxis
{
    Header = "Performance Score",
    LabelRotation = 30,
    LabelStyle = new LabelStyle
    {
        LabelFormat = "0.0",
        FontSize = 10,
        Foreground = new SolidColorBrush(Color.FromArgb(255, 25, 118, 210))
    },
    HeaderStyle = new LabelStyle
    {
        FontSize = 14,
        Foreground = new SolidColorBrush(Color.FromArgb(255, 13, 71, 161))
    }
};

chart.PrimaryAxis = primaryAxis;
chart.SecondaryAxis = secondaryAxis;
```

## Best Practices

### Label Rotation
1. **Use 0° for short labels** - Most readable
2. **Use 45° or -45° for medium labels** - Good balance
3. **Use 90° for long labels** - Saves space
4. **Keep consistency** - Use same angle for similar charts

### Label Formatting
1. **Match data precision** - Don't show excessive decimals
2. **Add units when appropriate** - "$", "°C", "kg"
3. **Use thousand separators** - "#,##0" for large numbers
4. **Consider locale** - Date and number formats vary by region

### Templates
1. **Keep templates simple** - Complex templates can impact performance
2. **Maintain readability** - Don't sacrifice clarity for style
3. **Test with different data** - Ensure templates work with all possible values
4. **Use consistent styling** - Match your app's theme

### Headers
1. **Always include units** - "Temperature (°C)" not just "Temperature"
2. **Be concise** - Short, descriptive titles
3. **Use sentence case** - More readable than ALL CAPS

## Summary

**Key Points:**
- **LabelRotation:** Rotate labels to fit space (0°, 45°, 90°)
- **LabelFormat:** Use .NET format strings for numbers and dates
- **LabelTemplate:** Full control over label appearance
- **Header:** Titles for secondary axis only in polar charts
- **HeaderStyle:** Style header text (font, size, color)
- **HeaderTemplate:** Advanced header customization

Apply these customization techniques to create professional, readable polar charts that match your application's design!
