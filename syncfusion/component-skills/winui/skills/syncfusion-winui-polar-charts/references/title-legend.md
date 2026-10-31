# Chart Title and Legend in Polar Charts

Complete guide to configuring chart titles and legends in Syncfusion WinUI Polar Chart, including customization and interactive features.

## Table of Contents
- [Chart Title](#chart-title)
- [Legend Configuration](#legend-configuration)
- [Legend Icons](#legend-icons)
- [Legend Item Spacing](#legend-item-spacing)
- [Interactive Features](#interactive-features)
- [Legend Placement](#legend-placement)
- [Legend Background](#legend-background)
- [Legend Templates](#legend-templates)
- [Best Practices](#best-practices)

## Chart Title

The chart title (header) provides context about what the chart displays.

### Basic Title

Use the `Header` property to set a simple text title:

**XAML:**
```xml
<chart:SfPolarChart Header="Plant Distribution by Direction">
    <!-- Chart content -->
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.Header = "Plant Distribution by Direction";
```

### Custom Title with Styling

The `Header` property accepts any `UIElement`, allowing rich customization:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Header>
        <Border BorderThickness="2"
                BorderBrush="Black"
                Margin="10"
                CornerRadius="5"
                Padding="5">
            <TextBlock FontSize="14"
                       Text="Polar Chart"
                       Foreground="Blue"
                       HorizontalTextAlignment="Center"/>
        </Border>
    </chart:SfPolarChart.Header>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
Border border = new Border()
{
    BorderThickness = new Thickness(2),
    BorderBrush = new SolidColorBrush(Colors.Black),
    Margin = new Thickness(10),
    CornerRadius = new CornerRadius(5),
    Padding = new Thickness(5)
};

TextBlock textBlock = new TextBlock()
{
    Text = "Polar Chart",
    FontSize = 14,
    Foreground = new SolidColorBrush(Colors.Blue),
    HorizontalTextAlignment = TextAlignment.Center
};

border.Child = textBlock;
chart.Header = border;
```

### Title Alignment

Use the `HorizontalHeaderAlignment` property to align the title:

**XAML:**
```xml
<chart:SfPolarChart HorizontalHeaderAlignment="Left">
    <chart:SfPolarChart.Header>
        <TextBlock Text="Left-Aligned Title"
                   FontSize="16"/>
    </chart:SfPolarChart.Header>
</chart:SfPolarChart>
```

**Options:**
- `Left` - Align title to the left
- `Center` - Center the title (default)
- `Right` - Align title to the right
- `Stretch` - Stretch across available width

**C# Code:**
```csharp
chart.HorizontalHeaderAlignment = HorizontalAlignment.Left;
```

### Example: Styled Title with Background

```xml
<chart:SfPolarChart HorizontalHeaderAlignment="Center">
    <chart:SfPolarChart.Header>
        <Border BorderThickness="2"
                BorderBrush="Black"
                Background="LightBlue"
                Margin="10"
                CornerRadius="5"
                Padding="10,5">
            <TextBlock Text="Polar Chart Analysis"
                       HorizontalTextAlignment="Center"
                       FontSize="14"
                       Foreground="Blue"/>
        </Border>
    </chart:SfPolarChart.Header>
</chart:SfPolarChart>
```

## Legend Configuration

The legend displays a list of series in the chart, helping users identify which data each series represents.

### Enabling Legend

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend/>
    </chart:SfPolarChart.Legend>
    
    <chart:SfPolarChart.Series>
        <chart:PolarAreaSeries Label="Tree" .../>
        <chart:PolarLineSeries Label="Weed" .../>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.Legend = new ChartLegend();
```

**Important:** Each series needs a `Label` property to appear in the legend.

### Legend Title

Add a title to the legend using the `Header` property:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend>
            <chart:ChartLegend.Header>
                <TextBlock Text="Plant Details"
                           HorizontalAlignment="Center"
                           Foreground="Blue"
                           Margin="0,0,0,5"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
ChartLegend legend = new ChartLegend();

TextBlock textBlock = new TextBlock()
{
    Text = "Plant Details",
    HorizontalTextAlignment = TextAlignment.Center,
    Foreground = new SolidColorBrush(Colors.Blue),
    Margin = new Thickness(0, 0, 0, 5)
};

legend.Header = textBlock;
chart.Legend = legend;
```

## Legend Icons

Customize the appearance of legend icons that represent each series.

### Icon Size

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend IconWidth="15"
                           IconHeight="15"
                           IconVisibility="Visible"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    IconWidth = 15,
    IconHeight = 15,
    IconVisibility = Visibility.Visible
};
```

### Icon Visibility

Control whether icons are shown:

```xml
<chart:ChartLegend IconVisibility="Visible"/>  <!-- Show icons -->
<chart:ChartLegend IconVisibility="Collapsed"/>  <!-- Hide icons -->
```

### Series Icon Type

Set the icon shape for individual series using the `LegendIcon` property:

**XAML:**
```xml
<chart:PolarAreaSeries Label="Tree"
                       LegendIcon="Pentagon"
                       .../>
                       
<chart:PolarLineSeries Label="Weed"
                       LegendIcon="Circle"
                       .../>
```

**Available Icon Types:**
- `SeriesType` - Matches series type (default)
- `Circle`
- `Rectangle`
- `Diamond`
- `Pentagon`
- `Triangle`
- `InvertedTriangle`
- `Cross`
- `Plus`
- `Hexagon`

**C# Code:**
```csharp
PolarAreaSeries series = new PolarAreaSeries();
series.Label = "Tree";
series.LegendIcon = ChartLegendIcon.Pentagon;
```

## Legend Item Spacing

Control the spacing between legend items using the `ItemMargin` property:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend ItemMargin="10"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    ItemMargin = new Thickness(10)
};
```

**Different Margins:**
```xml
<!-- Uniform margin (all sides) -->
<chart:ChartLegend ItemMargin="10"/>

<!-- Horizontal and vertical -->
<chart:ChartLegend ItemMargin="10,5"/>

<!-- Left, Top, Right, Bottom -->
<chart:ChartLegend ItemMargin="10,5,10,5"/>
```

## Interactive Features

### Checkbox for Series Toggle

Enable checkboxes in legend items to show/hide series:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend CheckBoxVisibility="Visible"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    CheckBoxVisibility = Visibility.Visible
};
```

When enabled, users can check/uncheck legend items to show/hide the corresponding series.

### Toggle Series Visibility

Enable clicking legend items to show/hide series without checkboxes:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend ToggleSeriesVisibility="True"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    ToggleSeriesVisibility = true
};
```

**Default:** `False`

When enabled, users can click legend items to toggle series visibility on/off.

### Comparison: Checkbox vs Toggle

| Feature | CheckBoxVisibility | ToggleSeriesVisibility |
|---------|-------------------|------------------------|
| Visual indicator | Checkbox | No checkbox |
| Click target | Checkbox only | Entire legend item |
| User familiarity | High (standard checkbox) | Medium (click to toggle) |
| Space usage | More (checkbox + label) | Less (label only) |

## Legend Placement

Control where the legend appears using the `Placement` property:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend Placement="Right" ItemMargin="10"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    Placement = LegendPlacement.Right,
    ItemMargin = new Thickness(10)
};
```

**Available Placements:**
- `Top` - Above the chart (default)
- `Bottom` - Below the chart
- `Left` - Left side of the chart
- `Right` - Right side of the chart

### Example: Different Placements

```xml
<!-- Top Placement (Default) -->
<chart:ChartLegend Placement="Top"/>

<!-- Right Placement -->
<chart:ChartLegend Placement="Right"/>

<!-- Bottom Placement -->
<chart:ChartLegend Placement="Bottom"/>

<!-- Left Placement -->
<chart:ChartLegend Placement="Left"/>
```

## Legend Background

Customize the legend background and border:

**XAML:**
```xml
<chart:SfPolarChart>
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend Background="LightGray"
                           BorderBrush="Black"
                           BorderThickness="1"
                           CornerRadius="5"
                           Padding="10"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    Background = new SolidColorBrush(Colors.LightGray),
    BorderBrush = new SolidColorBrush(Colors.Black),
    BorderThickness = new Thickness(1),
    CornerRadius = new CornerRadius(5),
    Padding = new Thickness(10)
};
```

### Background Properties

- **Background:** Fill color of the legend
- **BorderBrush:** Border color
- **BorderThickness:** Border width
- **CornerRadius:** Rounded corners
- **Padding:** Internal spacing

### Example: Styled Legend Box

```xml
<chart:ChartLegend Background="#F5F5F5"
                   BorderBrush="#1976D2"
                   BorderThickness="2"
                   CornerRadius="8"
                   Padding="15,10"
                   Placement="Right">
    <chart:ChartLegend.Header>
        <TextBlock Text="Legend"
                   Foreground="#1976D2"
                   Margin="0,0,0,8"/>
    </chart:ChartLegend.Header>
</chart:ChartLegend>
```

## Legend Templates

Create custom legend item templates for advanced customization:

**XAML:**
```xml
<chart:SfPolarChart x:Name="chart">
    <chart:SfPolarChart.Resources>
        <DataTemplate x:Key="legendItemTemplate" x:DataType="chart:LegendItem">
            <StackPanel Margin="10" Orientation="Vertical">
                <!-- Icon -->
                <Ellipse Height="15"
                         Width="15"
                         Fill="{Binding IconBrush}"
                         Stroke="#4a4a4a"
                         StrokeThickness="2"
                         HorizontalAlignment="Center"/>
                <!-- Label -->
                <TextBlock HorizontalAlignment="Center"
                           FontSize="12"
                           Foreground="Black"
                           Text="{Binding Label}"
                           Margin="0,4,0,0"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfPolarChart.Resources>
    
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource legendItemTemplate}"/>
    </chart:SfPolarChart.Legend>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
chart.Legend = new ChartLegend()
{
    ItemTemplate = chart.Resources["legendItemTemplate"] as DataTemplate
};
```

### Template Binding Context

The binding context for `ItemTemplate` is `LegendItem` with these properties:
- `Label` - Series label text
- `IconBrush` - Series color
- `Item` - Reference to the series object

### Advanced Template Example

```xml
<DataTemplate x:Key="advancedLegendTemplate" x:DataType="chart:LegendItem">
    <Grid Margin="8,4">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto"/>
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>
        
        <!-- Custom Icon -->
        <Rectangle Grid.Column="0"
                   Width="20"
                   Height="12"
                   Fill="{Binding IconBrush}"
                   Stroke="Gray"
                   StrokeThickness="1"
                   RadiusX="2"
                   RadiusY="2"
                   Margin="0,0,8,0"/>
        
        <!-- Label with additional info -->
        <StackPanel Grid.Column="1">
            <TextBlock Text="{Binding Label}"
                       FontSize="11"
                       Foreground="#212121"/>
            <TextBlock Text="Series Data"
                       FontSize="9"
                       Foreground="#757575"/>
        </StackPanel>
    </Grid>
</DataTemplate>
```

## Best Practices

### Chart Title

1. **Be descriptive but concise:**
   ```xml
   <!-- Good -->
   <chart:SfPolarChart Header="Sales by Region - Q1 2026"/>
   
   <!-- Too vague -->
   <chart:SfPolarChart Header="Chart"/>
   
   <!-- Too verbose -->
   <chart:SfPolarChart Header="This chart shows the sales data..."/>
   ```

2. **Use appropriate alignment:**
   - Center for standalone charts
   - Left for reports and documents
   - Match your application's design system

3. **Keep styling consistent:**
   - Use the same font family across your app
   - Maintain consistent colors and sizes

### Legend Configuration

1. **Always provide series labels:**
   ```xml
   <!-- Required for legend -->
   <chart:PolarAreaSeries Label="Product A" .../>
   ```

2. **Choose appropriate placement:**
   - **Top/Bottom:** For horizontal legend items
   - **Left/Right:** For vertical legend items
   - Consider available space and chart shape

3. **Enable interaction when useful:**
   - Use `ToggleSeriesVisibility` for comparative analysis
   - Use checkboxes for explicit control
   - Don't enable if only one series

4. **Optimize spacing:**
   ```xml
   <!-- Good spacing for readability -->
   <chart:ChartLegend ItemMargin="10"/>
   
   <!-- Too tight -->
   <chart:ChartLegend ItemMargin="2"/>
   ```

### Legend Icons

1. **Choose meaningful icons:**
   - Use default `SeriesType` for consistency
   - Use distinct shapes when series are similar in color
   - Pentagon, Circle, Diamond work well for differentiation

2. **Maintain appropriate size:**
   ```xml
   <!-- Good size for visibility -->
   <chart:ChartLegend IconWidth="15" IconHeight="15"/>
   
   <!-- Too small -->
   <chart:ChartLegend IconWidth="5" IconHeight="5"/>
   ```

### Templates

1. **Keep templates simple:**
   - Complex templates can impact performance
   - Prioritize readability over aesthetics

2. **Test with different data:**
   - Ensure templates work with long labels
   - Verify appearance with many series

3. **Maintain accessibility:**
   - Ensure sufficient color contrast
   - Use clear, readable fonts

## Complete Example

Here's a comprehensive example combining title and legend customization:

```xml
<chart:SfPolarChart Header="Plant Distribution Analysis"
                    HorizontalHeaderAlignment="Center"
                    GridLineType="Polygon">
    
    <!-- Styled Title -->
    <chart:SfPolarChart.Header>
        <Border Background="#E3F2FD"
                BorderBrush="#1976D2"
                BorderThickness="2"
                CornerRadius="8"
                Padding="12,6"
                Margin="10">
            <TextBlock Text="Plant Distribution Analysis - 2026"
                       FontSize="16"
                       Foreground="#0D47A1"
                       HorizontalTextAlignment="Center"/>
        </Border>
    </chart:SfPolarChart.Header>
    
    <!-- Styled Legend -->
    <chart:SfPolarChart.Legend>
        <chart:ChartLegend Placement="Right"
                           Background="#FAFAFA"
                           BorderBrush="#BDBDBD"
                           BorderThickness="1"
                           CornerRadius="5"
                           Padding="15,10"
                           ItemMargin="8"
                           IconWidth="16"
                           IconHeight="16"
                           ToggleSeriesVisibility="True">
            <chart:ChartLegend.Header>
                <TextBlock Text="Plant Types"
                           FontSize="13"
                           Foreground="#424242"
                           Margin="0,0,0,8"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfPolarChart.Legend>
    
    <!-- Series -->
    <chart:SfPolarChart.Series>
        <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                               XBindingPath="Direction"
                               YBindingPath="Tree"
                               Label="Trees"
                               LegendIcon="Pentagon"/>
        
        <chart:PolarLineSeries ItemsSource="{Binding Data}"
                               XBindingPath="Direction"
                               YBindingPath="Flower"
                               Label="Flowers"
                               LegendIcon="Circle"/>
    </chart:SfPolarChart.Series>
    
</chart:SfPolarChart>
```

## Summary

**Key Points:**
- **Chart Title:** Use `Header` property, accepts UIElement for customization
- **Title Alignment:** `HorizontalHeaderAlignment` (Left, Center, Right)
- **Legend:** Enable with `ChartLegend`, requires series `Label` properties
- **Legend Placement:** Top, Bottom, Left, Right
- **Interactive:** `ToggleSeriesVisibility` or `CheckBoxVisibility`
- **Icons:** Customize size and shape per series
- **Templates:** Full control over legend item appearance

Use these features to create clear, informative polar charts with professional titles and legends!
