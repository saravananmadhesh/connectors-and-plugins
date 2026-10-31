# Legend Configuration

## Table of Contents
- [Overview](#overview)
- [Enabling Legend](#enabling-legend)
- [Legend Title](#legend-title)
- [Icon Customization](#icon-customization)
- [Item Spacing](#item-spacing)
- [Checkbox for Toggle](#checkbox-for-toggle)
- [Toggle Series Visibility](#toggle-series-visibility)
- [Legend Placement](#legend-placement)
- [Background Customization](#background-customization)
- [Custom Templates](#custom-templates)
- [Best Practices](#best-practices)

## Overview

The legend displays information about each segment in the funnel chart. In a funnel chart, the x-value of data points (category names) becomes the legend item labels.

## Enabling Legend

Add a `ChartLegend` instance to display the legend:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.Legend>
        <chart:ChartLegend />
    </chart:SfFunnelChart.Legend>
</chart:SfFunnelChart>
```

### C#
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.Legend = new ChartLegend();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
this.Content = chart;
```

**Note:** The legend automatically displays all segments with their corresponding colors and labels.

## Legend Title

Add a title (header) to the legend using any `UIElement`:

### Simple Text Header
```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend>
        <chart:ChartLegend.Header>
            <TextBlock Text="Products"
                       HorizontalAlignment="Center"
                       Foreground="Blue"/>
        </chart:ChartLegend.Header>
    </chart:ChartLegend>
</chart:SfFunnelChart.Legend>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
ChartLegend legend = new ChartLegend();

TextBlock textBlock = new TextBlock()
{
    Text = "Products",
    HorizontalTextAlignment = TextAlignment.Center,
    Foreground = new SolidColorBrush(Colors.Blue),
};

legend.Header = textBlock;
chart.Legend = legend;
this.Content = chart;
```

### Styled Header with Border
```xml
<chart:ChartLegend>
    <chart:ChartLegend.Header>
        <Border Background="LightGray"
                BorderBrush="Black"
                BorderThickness="1"
                CornerRadius="4"
                Padding="8,4">
            <TextBlock Text="Sales Stages"
                       FontSize="13"/>
        </Border>
    </chart:ChartLegend.Header>
</chart:ChartLegend>
```

## Icon Customization

Customize legend icons using these properties:

### Icon Properties
- `IconWidth` - Width of legend icons
- `IconHeight` - Height of legend icons  
- `IconVisibility` - Show or hide icons

```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend IconWidth="15"
                       IconHeight="15"
                       IconVisibility="Visible"/>
</chart:SfFunnelChart.Legend>
```

### C# Example
```csharp
ChartLegend legend = new ChartLegend()
{
    IconWidth = 15,
    IconHeight = 15,
    IconVisibility = Visibility.Visible
};
chart.Legend = legend;
```

### Hide Icons
```xml
<chart:ChartLegend IconVisibility="Collapsed"/>
```

### Larger Icons
```xml
<chart:ChartLegend IconWidth="20" IconHeight="20"/>
```

## Item Spacing

Control spacing between legend items using `ItemMargin`:

```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend ItemMargin="10"/>
</chart:SfFunnelChart.Legend>
```

### C# Implementation
```csharp
ChartLegend legend = new ChartLegend()
{
    ItemMargin = new Thickness(10)
};
chart.Legend = legend;
```

### Custom Margin (Different Sides)
```xml
<chart:ChartLegend ItemMargin="5,10,5,10"/>  <!-- Left,Top,Right,Bottom -->
```

## Checkbox for Toggle

Enable checkboxes next to legend items to show/hide segments:

```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend CheckBoxVisibility="Visible"/>
</chart:SfFunnelChart.Legend>
```

### C# Implementation
```csharp
ChartLegend legend = new ChartLegend()
{
    CheckBoxVisibility = Visibility.Visible
};
chart.Legend = legend;
```

**Behavior:**
- Unchecking a legend item hides the corresponding segment
- Checking it makes the segment visible again
- Useful for focusing on specific data

## Toggle Series Visibility

Enable clicking legend items to toggle segment visibility:

```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend ToggleSeriesVisibility="True"/>
</chart:SfFunnelChart.Legend>
```

### C# Implementation
```csharp
ChartLegend legend = new ChartLegend()
{
    ToggleSeriesVisibility = true
};
chart.Legend = legend;
```

**Behavior:**
- Click a legend item to hide its segment
- Click again to show it
- More intuitive than checkboxes for casual users

### Combining Checkbox and Toggle
```xml
<chart:ChartLegend CheckBoxVisibility="Visible"
                   ToggleSeriesVisibility="True"/>
```

**Note:** Both methods work together - users can click the item or the checkbox.

## Legend Placement

Position the legend using the `Placement` property:

### Placement Options
- `Top` (default)
- `Bottom`
- `Left`
- `Right`

### Top Placement (Default)
```xml
<chart:ChartLegend Placement="Top"/>
```

### Bottom Placement
```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend Placement="Bottom"
                       ItemMargin="10"/>
</chart:SfFunnelChart.Legend>
```

### Right Placement
```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend ItemMargin="10"
                       Placement="Right"/>
</chart:SfFunnelChart.Legend>
```

### C# Implementation
```csharp
ChartLegend legend = new ChartLegend()
{
    Placement = LegendPlacement.Right,
    ItemMargin = new Thickness(10)
};
chart.Legend = legend;
```

### Left Placement
```xml
<chart:ChartLegend Placement="Left"/>
```

**Best practices:**
- Use `Right` or `Left` for charts with many segments
- Use `Top` or `Bottom` for wider layouts
- Consider available space when choosing placement

## Background Customization

Customize legend appearance with these properties:

### Available Properties
- `BorderThickness` - Legend border width
- `BorderBrush` - Legend border color
- `Background` - Legend background color
- `CornerRadius` - Rounded corners

### Complete Example
```xml
<chart:SfFunnelChart.Legend>
    <chart:ChartLegend Background="Gray"
                       BorderBrush="Black"
                       BorderThickness="1"
                       CornerRadius="5"/>
</chart:SfFunnelChart.Legend>
```

### C# Implementation
```csharp
ChartLegend legend = new ChartLegend()
{
    Background = new SolidColorBrush(Colors.Gray),
    BorderBrush = new SolidColorBrush(Colors.Black),
    BorderThickness = new Thickness(1),
    CornerRadius = new CornerRadius(5)
};
chart.Legend = legend;
```

### Subtle Background
```xml
<chart:ChartLegend Background="#F5F5F5"
                   BorderBrush="#E0E0E0"
                   BorderThickness="1"
                   CornerRadius="4"
                   Padding="10"/>
```

### Transparent Background
```xml
<chart:ChartLegend Background="Transparent"
                   BorderThickness="0"/>
```

### Card-Style Legend
```xml
<chart:ChartLegend Background="White"
                   BorderBrush="#CCCCCC"
                   BorderThickness="2"
                   CornerRadius="8"
                   Padding="12"/>
```

## Custom Templates

Create fully custom legend items using `ItemTemplate`:

### Basic Custom Template
```xml
<chart:SfFunnelChart x:Name="chart">
    <chart:SfFunnelChart.Resources>
        <DataTemplate x:Key="legendTemplate" x:DataType="chart:LegendItem">
            <StackPanel Margin="10" Orientation="Vertical">
                <Ellipse Height="15"
                         Width="15"
                         Fill="{Binding IconBrush}"
                         Stroke="#4a4a4a"
                         StrokeThickness="2"/>
                <TextBlock HorizontalAlignment="Center"
                           FontSize="12"
                           Foreground="Black"
                           Text="{Binding Item._XAxesData}"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfFunnelChart.Resources>
    
    <chart:SfFunnelChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource legendTemplate}"/>
    </chart:SfFunnelChart.Legend>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.Legend = new ChartLegend()
{
    ItemTemplate = grid.Resources["legendTemplate"] as DataTemplate
};
this.Content = chart;
```

### Horizontal Layout Template
```xml
<DataTemplate x:Key="legendTemplate" x:DataType="chart:LegendItem">
    <StackPanel Orientation="Horizontal" Margin="8,4">
        <Rectangle Width="12"
                   Height="12"
                   Fill="{Binding IconBrush}"
                   Margin="0,0,6,0"/>
        <TextBlock Text="{Binding Item._XAxesData}"
                   FontSize="11"
                   VerticalAlignment="Center"/>
    </StackPanel>
</DataTemplate>
```

### Template with Value Display
```xml
<DataTemplate x:Key="legendTemplate" x:DataType="chart:LegendItem">
    <Grid Margin="10,5">
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="Auto"/>
            <ColumnDefinition Width="*"/>
            <ColumnDefinition Width="Auto"/>
        </Grid.ColumnDefinitions>
        
        <Ellipse Grid.Column="0"
                 Width="10" Height="10"
                 Fill="{Binding IconBrush}"
                 Margin="0,0,8,0"/>
        
        <TextBlock Grid.Column="1"
                   Text="{Binding Item._XAxesData}"
                   FontSize="12"
                   VerticalAlignment="Center"/>
        
        <TextBlock Grid.Column="2"
                   Text="{Binding Item._YAxesData}"
                   FontSize="11"
                   Foreground="Gray"
                   Margin="8,0,0,0"
                   VerticalAlignment="Center"/>
    </Grid>
</DataTemplate>
```

### Card-Style Legend Item
```xml
<DataTemplate x:Key="legendTemplate" x:DataType="chart:LegendItem">
    <Border Background="White"
            BorderBrush="#E0E0E0"
            BorderThickness="1"
            CornerRadius="4"
            Padding="8,6"
            Margin="4">
        <StackPanel>
            <TextBlock Text="{Binding Item._XAxesData}"
                       FontSize="13"
                       Foreground="{Binding IconBrush}"/>
            <TextBlock Text="{Binding Item._YAxesData}"
                       FontSize="11"
                       Foreground="Gray"
                       Margin="0,2,0,0"/>
        </StackPanel>
    </Border>
</DataTemplate>
```

**Important:** 
- The binding context for `ItemTemplate` is `LegendItem`
- Access data via `Item._XAxesData` (category name) and `Item._YAxesData` (value)
- Use `IconBrush` for the segment color

## Best Practices

### 1. Legend Placement
- **Few items (≤5):** Use `Top` or `Bottom`
- **Many items (>5):** Use `Right` or `Left` to save vertical space
- **Mobile/narrow:** Prefer `Bottom` for better responsiveness

### 2. Icon Sizing
- Default size (10-12px) works for most cases
- Increase for larger displays or accessibility needs
- Keep consistent across all charts in an application

### 3. Interactive Features
- Use `ToggleSeriesVisibility` for casual exploration
- Use `CheckBoxVisibility` when explicit state is important
- Avoid both unless necessary

### 4. Styling
- Match legend style to your application theme
- Ensure good contrast for readability
- Use subtle backgrounds to avoid overwhelming the chart

### 5. Custom Templates
- Use for specialized data display needs
- Keep templates simple and scannable
- Test with different data lengths

## Common Patterns

### Minimal Legend
```xml
<chart:ChartLegend IconWidth="10"
                   IconHeight="10"
                   Background="Transparent"
                   BorderThickness="0"/>
```

### Professional Legend
```xml
<chart:ChartLegend Background="White"
                   BorderBrush="#DDDDDD"
                   BorderThickness="1"
                   CornerRadius="4"
                   Padding="10"
                   ItemMargin="8"
                   Placement="Right">
    <chart:ChartLegend.Header>
        <TextBlock Text="Stages"
                   Margin="0,0,0,8"/>
    </chart:ChartLegend.Header>
</chart:ChartLegend>
```

### Interactive Legend
```xml
<chart:ChartLegend ToggleSeriesVisibility="True"
                   CheckBoxVisibility="Visible"
                   ItemMargin="10"
                   Placement="Right">
    <chart:ChartLegend.Header>
        <TextBlock Text="Click to toggle"
                   FontSize="11"
                   Foreground="Gray"/>
    </chart:ChartLegend.Header>
</chart:ChartLegend>
```

## Troubleshooting

### Legend Not Appearing
- Ensure `Legend` property is set with a `ChartLegend` instance
- Verify data is bound correctly
- Check if legend is placed outside visible area

### Legend Items Not Clickable
- Set `ToggleSeriesVisibility="True"` to enable clicking
- Or set `CheckBoxVisibility="Visible"` for checkboxes

### Custom Template Not Working
- Verify `x:DataType="chart:LegendItem"` is set
- Check binding paths: `Item._XAxesData` for labels
- Ensure template is defined in Resources and referenced correctly

### Legend Overlapping Chart
- Adjust chart size to accommodate legend placement
- Use different `Placement` value
- Reduce `ItemMargin` or icon sizes
