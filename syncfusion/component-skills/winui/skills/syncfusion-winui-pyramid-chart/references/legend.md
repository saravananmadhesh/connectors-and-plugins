# Legend Configuration

## Table of Contents
- [Overview](#overview)
- [Enabling Legend](#enabling-legend)
- [Legend Title](#legend-title)
- [Icon Customization](#icon-customization)
- [Item Spacing](#item-spacing)
- [Checkbox for Legend](#checkbox-for-legend)
- [Toggle Series Visibility](#toggle-series-visibility)
- [Legend Placement](#legend-placement)
- [Background Customization](#background-customization)
- [Custom Legend Templates](#custom-legend-templates)
- [Complete Examples](#complete-examples)

---

## Overview

The legend provides a visual reference for the data points in your pyramid chart. It displays a list of segments with their corresponding colors and labels, helping users identify what each segment represents.

**Key Features:**
- Configurable titles and headers
- Customizable icons (size, visibility)
- Adjustable spacing between items
- Optional checkboxes for segment visibility
- Interactive toggle functionality
- Flexible placement (Top, Bottom, Left, Right)
- Full template customization support

---

## Enabling Legend

To add a legend to your pyramid chart, create a `ChartLegend` instance and assign it to the Legend property.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend/>
    </chart:SfPyramidChart.Legend>
    
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

// Add legend
chart.Legend = new ChartLegend();

this.Content = chart;
```

**Important:** The x-value (XBindingPath data) of each data point becomes the legend item's label.

---

## Legend Title

Add a title to your legend using the `Header` property. You can use any UIElement as the header.

### Simple Text Header

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend>
            <chart:ChartLegend.Header>
                <TextBlock Text="Food Categories"
                           HorizontalAlignment="Center"
                           Foreground="Blue"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
ChartLegend legend = new ChartLegend();

TextBlock header = new TextBlock
{
    Text = "Food Categories",
    HorizontalTextAlignment = TextAlignment.Center,
    Foreground = new SolidColorBrush(Colors.Blue),
};

legend.Header = header;
chart.Legend = legend;

this.Content = chart;
```

### Styled Header with Border

```xml
<chart:ChartLegend>
    <chart:ChartLegend.Header>
        <Border BorderBrush="Navy"
                BorderThickness="2"
                CornerRadius="5"
                Padding="10,5"
                Background="LightBlue">
            <TextBlock Text="Sales Data"
                       FontSize="14"/>
        </Border>
    </chart:ChartLegend.Header>
</chart:ChartLegend>
```

---

## Icon Customization

Customize the legend icons using the following properties:

| Property | Type | Description |
|----------|------|-------------|
| **IconWidth** | double | Width of legend icons |
| **IconHeight** | double | Height of legend icons |
| **IconVisibility** | Visibility | Show or hide legend icons |

### Example

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend IconWidth="20"
                           IconHeight="20"
                           IconVisibility="Visible"/>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Legend = new ChartLegend
{
    IconWidth = 20,
    IconHeight = 20,
    IconVisibility = Visibility.Visible
};

this.Content = chart;
```

### Hiding Icons

```xml
<chart:ChartLegend IconVisibility="Collapsed"/>
```

This creates a text-only legend without colored icons.

---

## Item Spacing

Control the spacing between legend items using the `ItemMargin` property.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend ItemMargin="15"/>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Legend = new ChartLegend
{
    ItemMargin = new Thickness(15)
};

this.Content = chart;
```

### Custom Margin Per Side

```xml
<!-- Different margins for each side: Left, Top, Right, Bottom -->
<chart:ChartLegend ItemMargin="10,5,10,5"/>
```

---

## Checkbox for Legend

Enable checkboxes next to legend items to allow users to show/hide individual segments.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend CheckBoxVisibility="Visible"/>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Legend = new ChartLegend
{
    CheckBoxVisibility = Visibility.Visible
};

this.Content = chart;
```

**Behavior:**
- Checked: Segment is visible
- Unchecked: Segment is hidden from the chart
- Default value: `Collapsed` (no checkboxes)

---

## Toggle Series Visibility

Enable interactive toggling of segment visibility by clicking/tapping legend items.

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend ToggleSeriesVisibility="True"/>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Legend = new ChartLegend
{
    ToggleSeriesVisibility = true
};

this.Content = chart;
```

**User Interaction:**
- Click/tap a legend item to hide its corresponding segment
- Click/tap again to show the segment
- Default value: `False`

**Difference from Checkbox:**
- **CheckBoxVisibility:** Shows explicit checkboxes
- **ToggleSeriesVisibility:** Entire legend item is clickable (no checkbox UI)

---

## Legend Placement

Position the legend at different locations around the chart using the `Placement` property.

### Available Positions

| Value | Description |
|-------|-------------|
| **Top** | Above the chart (default) |
| **Bottom** | Below the chart |
| **Left** | Left side of the chart |
| **Right** | Right side of the chart |

### Examples

**Top Placement (Default):**
```xml
<chart:ChartLegend Placement="Top"/>
```

**Left Placement:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend Placement="Left"
                           ItemMargin="10"/>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**Right Placement:**
```csharp
chart.Legend = new ChartLegend
{
    Placement = LegendPlacement.Right,
    ItemMargin = new Thickness(10)
};
```

**Bottom Placement:**
```xml
<chart:ChartLegend Placement="Bottom"/>
```

**Best Practices:**
- **Top/Bottom:** Good for horizontal legend layouts
- **Left/Right:** Better for vertical legend layouts
- Consider chart aspect ratio when choosing placement
- Use `ItemMargin` to add breathing room

---

## Background Customization

Customize the legend's background appearance with borders, fill colors, and corner radius.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| **Background** | Brush | Fill color of legend background |
| **BorderBrush** | Brush | Border color |
| **BorderThickness** | Thickness | Border width |
| **CornerRadius** | CornerRadius | Rounded corners |

### Example

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend Background="LightGray"
                           BorderBrush="DarkGray"
                           BorderThickness="2"
                           CornerRadius="8">
        </chart:ChartLegend>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend
{
    Background = new SolidColorBrush(Colors.LightGray),
    BorderBrush = new SolidColorBrush(Colors.DarkGray),
    BorderThickness = new Thickness(2),
    CornerRadius = new CornerRadius(8)
};
```

### Gradient Background

```xml
<chart:ChartLegend BorderBrush="Navy" BorderThickness="1">
    <chart:ChartLegend.Background>
        <LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
            <GradientStop Color="White" Offset="0"/>
            <GradientStop Color="LightBlue" Offset="1"/>
        </LinearGradientBrush>
    </chart:ChartLegend.Background>
</chart:ChartLegend>
```

### Transparent Background

```xml
<chart:ChartLegend Background="Transparent" 
                   BorderBrush="Transparent"/>
```

---

## Custom Legend Templates

Create completely custom legend item layouts using the `ItemTemplate` property.

### Basic Custom Template

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Resources>
        <DataTemplate x:Key="legendTemplate" x:DataType="chart:LegendItem">
            <StackPanel Orientation="Horizontal" Margin="5">
                <!-- Custom Icon -->
                <Ellipse Height="15"
                         Width="15"
                         Fill="{Binding IconBrush}"
                         Stroke="Black"
                         StrokeThickness="1"/>
                
                <!-- Label -->
                <TextBlock Text="{Binding Label}"
                           Margin="10,0,0,0"
                           FontSize="14"
                           Foreground="Navy"
                           VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource legendTemplate}"/>
    </chart:SfPyramidChart.Legend>
</chart:SfPyramidChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend
{
    ItemTemplate = this.Resources["legendTemplate"] as DataTemplate
};
```

### Advanced Template with Data Binding

```xml
<DataTemplate x:Key="advancedLegendTemplate" x:DataType="chart:LegendItem">
    <StackPanel Orientation="Vertical" Margin="10">
        <!-- Icon -->
        <Ellipse Height="15"
                 Width="15"
                 Fill="{Binding IconBrush}"
                 Stroke="#4a4a4a"
                 StrokeThickness="2"/>
        
        <!-- Label -->
        <TextBlock Text="{Binding Item.XData}"
                   HorizontalAlignment="Center"
                   FontSize="12"
                   Foreground="Black"
                   Margin="0,5,0,0"/>
        
        <!-- Value (if available) -->
        <TextBlock Text="{Binding Item.YData}"
                   HorizontalAlignment="Center"
                   FontSize="10"
                   Foreground="Gray"/>
    </StackPanel>
</DataTemplate>
```

### Template with Custom Shapes

```xml
<DataTemplate x:Key="customShapeTemplate" x:DataType="chart:LegendItem">
    <StackPanel Orientation="Horizontal" Spacing="8">
        <!-- Star Icon -->
        <Path Fill="{Binding IconBrush}"
              Data="M 0,4 L 2,8 L 7,8 L 3,11 L 4,16 L 0,12 L -4,16 L -3,11 L -7,8 L -2,8 Z"
              Stretch="Uniform"
              Width="16"
              Height="16"/>
        
        <TextBlock Text="{Binding Label}"
                   VerticalAlignment="Center"/>
    </StackPanel>
</DataTemplate>
```

### Binding Context

The `ItemTemplate` binding context is `LegendItem`, which provides:

| Property | Description |
|----------|-------------|
| **Label** | Legend item text (from XBindingPath) |
| **IconBrush** | Color brush for the segment |
| **Item** | Reference to the underlying data object |

**Accessing underlying data:**
```xml
<!-- Access properties from your data model -->
<TextBlock Text="{Binding Item.Category}"/>
<TextBlock Text="{Binding Item.Value}"/>
```

---

## Complete Examples

### Example 1: Comprehensive Legend Configuration

```xml
<chart:SfPyramidChart Header="Annual Sales Distribution"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Region"
                      YBindingPath="Sales">
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend Placement="Right"
                           ItemMargin="12"
                           IconWidth="18"
                           IconHeight="18"
                           Background="WhiteSmoke"
                           BorderBrush="Gray"
                           BorderThickness="1"
                           CornerRadius="5"
                           ToggleSeriesVisibility="True">
            <chart:ChartLegend.Header>
                <TextBlock Text="Regions"
                           FontSize="16"
                           Margin="10,5"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfPyramidChart.Legend>
    
</chart:SfPyramidChart>
```

### Example 2: Legend with Checkboxes

```xml
<chart:SfPyramidChart ItemsSource="{Binding Data}"
                      XBindingPath="Product"
                      YBindingPath="Revenue">
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend Placement="Bottom"
                           CheckBoxVisibility="Visible"
                           ItemMargin="15,8"
                           Background="LightBlue"
                           BorderBrush="Navy"
                           BorderThickness="2">
            <chart:ChartLegend.Header>
                <TextBlock Text="Product Revenue (Toggle to Filter)"
                           Margin="5"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfPyramidChart.Legend>
    
</chart:SfPyramidChart>
```

### Example 3: Custom Template Legend

```xml
<chart:SfPyramidChart x:Name="chart">
    <chart:SfPyramidChart.Resources>
        <DataTemplate x:Key="customTemplate" x:DataType="chart:LegendItem">
            <Border Background="{Binding IconBrush}"
                    CornerRadius="4"
                    Padding="10,5"
                    Margin="5">
                <TextBlock Text="{Binding Label}"
                           Foreground="White"/>
            </Border>
        </DataTemplate>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource customTemplate}"
                           Placement="Left"
                           Background="Transparent"
                           BorderBrush="Transparent"/>
    </chart:SfPyramidChart.Legend>
    
</chart:SfPyramidChart>
```

### Example 4: C# Complete Configuration

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.Header = "Market Share Analysis";

// Configure legend
ChartLegend legend = new ChartLegend
{
    Placement = LegendPlacement.Right,
    ItemMargin = new Thickness(10),
    IconWidth = 20,
    IconHeight = 20,
    IconVisibility = Visibility.Visible,
    Background = new SolidColorBrush(Color.FromArgb(255, 240, 240, 240)),
    BorderBrush = new SolidColorBrush(Colors.Gray),
    BorderThickness = new Thickness(1),
    CornerRadius = new CornerRadius(5),
    ToggleSeriesVisibility = true
};

// Add header
TextBlock header = new TextBlock
{
    Text = "Companies",
    FontSize = 16,
    Margin = new Thickness(10, 5, 10, 5)
};
legend.Header = header;

chart.Legend = legend;

// Data binding
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Company";
chart.YBindingPath = "MarketShare";

this.Content = chart;
```

---

## Best Practices

1. **Placement:** Choose placement based on available space and chart aspect ratio
2. **Item Spacing:** Use consistent margin values (10-15px typically works well)
3. **Icons:** Keep icon sizes between 12-20px for optimal visibility
4. **Headers:** Use headers to provide context when legend meaning isn't obvious
5. **Interactivity:** Enable `ToggleSeriesVisibility` for exploratory data analysis
6. **Templates:** Use custom templates when default styling doesn't match your design
7. **Checkboxes:** Prefer checkboxes over toggle when explicit state indication is important

---

## Troubleshooting

**Legend not showing:**
- Verify `chart.Legend = new ChartLegend()` is set
- Check that XBindingPath data exists
- Ensure legend isn't positioned outside visible bounds

**Legend items have wrong labels:**
- Verify XBindingPath property name matches your model
- Check that data binding is working correctly

**Custom template not displaying:**
- Ensure `x:DataType="chart:LegendItem"` is specified
- Verify template resource key matches `ItemTemplate` reference
- Check binding paths in template

**Toggle not working:**
- Confirm `ToggleSeriesVisibility="True"` is set
- Cannot use with `CheckBoxVisibility="Visible"` simultaneously
