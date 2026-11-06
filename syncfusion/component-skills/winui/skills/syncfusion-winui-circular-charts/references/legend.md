# Legend

## Table of Contents
- [Overview](#overview)
- [Enabling Legend](#enabling-legend)
- [Legend Title](#legend-title)
- [Legend Icon](#legend-icon)
- [Item Spacing](#item-spacing)
- [Checkbox for Visibility Toggle](#checkbox-for-visibility-toggle)
- [Toggle Series Visibility](#toggle-series-visibility)
- [Legend Placement](#legend-placement)
- [Background Customization](#background-customization)
- [Custom Templates](#custom-templates)
- [Best Practices](#best-practices)

## Overview

The legend provides a visual key that helps users identify segments in the circular chart. Each legend item corresponds to a data point and displays the category name along with an icon representing the segment color.

**Key Features:**
- Automatic generation from data
- Customizable icons and appearance
- Multiple placement options
- Interactive visibility toggles
- Template customization support

## Enabling Legend

### Basic Legend

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
chart.Legend = new ChartLegend();

PieSeries series = new PieSeries();
chart.Series.Add(series);
```

**Note:** Legend items are automatically created from the XBindingPath values (categories) in your data.

## Legend Title

Add a title or header to the legend using the **Header** property.

### Text Title

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend>
            <chart:ChartLegend.Header>
                <TextBlock Text="Products"
                          HorizontalAlignment="Center"
                          Foreground="Blue"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();
ChartLegend legend = new ChartLegend();

TextBlock textBlock = new TextBlock()
{
    Text = "Products",
    HorizontalTextAlignment = TextAlignment.Center,
    Foreground = new SolidColorBrush(Colors.Blue),
};

legend.Header = textBlock;
chart.Legend = legend;
```

### Custom Header

You can use any UIElement as legend header:

```xml
<chart:ChartLegend>
    <chart:ChartLegend.Header>
        <StackPanel Orientation="Horizontal">
            <SymbolIcon Symbol="Filter"/>
            <TextBlock Text="Categories" Margin="5,0,0,0"/>
        </StackPanel>
    </chart:ChartLegend.Header>
</chart:ChartLegend>
```

## Legend Icon

### Icon Type

Set the icon type using the **LegendIcon** property on the series:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries LegendIcon="Rectangle"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.LegendIcon = ChartLegendIcon.Rectangle;
chart.Series.Add(series);
```

**Available Icon Types:**
- `SeriesType` (default) - Uses series-specific icon
- `Circle`
- `Rectangle`
- `Diamond`
- `Pentagon`
- `Triangle`
- `HorizontalLine`
- `VerticalLine`
- `Cross`
- `Plus`

### Icon Size

Customize icon dimensions using **IconWidth** and **IconHeight**:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend IconWidth="15"
                         IconHeight="15"
                         IconVisibility="Visible"/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend()
{
    IconWidth = 15,
    IconHeight = 15,
    IconVisibility = Visibility.Visible
};
```

### Custom Legend Icon Template

Create completely custom icons using **LegendIconTemplate**:

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="iconTemplate">
            <Ellipse Height="15"
                    Width="15"
                    Fill="White"
                    Stroke="#4a4a4a"
                    StrokeThickness="2"/>
        </DataTemplate>
    </Grid.Resources>

    <chart:SfCircularChart>
        <chart:SfCircularChart.Legend>
            <chart:ChartLegend IconWidth="15" IconHeight="15"/>
        </chart:SfCircularChart.Legend>
        
        <chart:SfCircularChart.Series>
            <chart:PieSeries LegendIconTemplate="{StaticResource iconTemplate}"
                           ItemsSource="{Binding Data}"
                           XBindingPath="Product"
                           YBindingPath="SalesRate"/>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.LegendIconTemplate = grid.Resources["iconTemplate"] as DataTemplate;
chart.Series.Add(series);
```

## Item Spacing

Control spacing between legend items using **ItemMargin**:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend ItemMargin="10"/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend()
{
    ItemMargin = new Thickness(10)
};
```

**Different margin values:**
```xml
<!-- Uniform margin -->
<chart:ChartLegend ItemMargin="10"/>

<!-- Horizontal and vertical -->
<chart:ChartLegend ItemMargin="15,5"/>

<!-- All sides -->
<chart:ChartLegend ItemMargin="10,5,10,5"/>
```

## Checkbox for Visibility Toggle

Add checkboxes to legend items for interactive show/hide of segments:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend CheckBoxVisibility="Visible"/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend()
{
    CheckBoxVisibility = Visibility.Visible
};
```

**Behavior:**
- Checked = Segment visible
- Unchecked = Segment hidden/collapsed
- Users can toggle visibility by clicking checkboxes

## Toggle Series Visibility

Enable clicking legend items to toggle segment visibility:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend ToggleSeriesVisibility="True"/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend()
{
    ToggleSeriesVisibility = true
};
```

**Behavior:**
- Click legend item → Toggle segment visibility
- No checkbox needed
- Visual feedback on legend item (dimmed when hidden)

**Note:** You can use both CheckBoxVisibility and ToggleSeriesVisibility together, but typically use one or the other.

## Legend Placement

Position the legend relative to the chart using the **Placement** property:

### Placement Options

**XAML:**
```xml
<!-- Top (default) -->
<chart:ChartLegend Placement="Top"/>

<!-- Bottom -->
<chart:ChartLegend Placement="Bottom"/>

<!-- Left -->
<chart:ChartLegend Placement="Left"/>

<!-- Right -->
<chart:ChartLegend Placement="Right"/>
```

**C#:**
```csharp
chart.Legend = new ChartLegend()
{
    Placement = LegendPlacement.Left
};
```

### Practical Examples

**Left placement:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend Placement="Left" ItemMargin="10"/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**Right placement with styling:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend Placement="Right"
                         ItemMargin="5"
                         Background="LightGray"
                         BorderBrush="Gray"
                         BorderThickness="1"
                         Padding="10"/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**Choosing placement:**
- **Top/Bottom** - Good for horizontal layouts, many items
- **Left/Right** - Good for vertical layouts, fewer items
- **Right** - Most common for circular charts

## Background Customization

Customize the legend background appearance:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend Background="LightGray"
                         BorderBrush="Black"
                         BorderThickness="1"
                         CornerRadius="5"
                         Padding="10"/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**C#:**
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

- **Background** - Fill color of legend background
- **BorderBrush** - Border color
- **BorderThickness** - Border width
- **CornerRadius** - Rounded corners
- **Padding** - Internal spacing

### Styling Examples

**Card-style legend:**
```xml
<chart:ChartLegend Background="White"
                 BorderBrush="#E0E0E0"
                 BorderThickness="1"
                 CornerRadius="8"
                 Padding="15"
                 Margin="10"/>
```

**Transparent legend:**
```xml
<chart:ChartLegend Background="Transparent"
                 BorderBrush="Transparent"/>
```

## Custom Templates

Create fully custom legend items using **ItemTemplate**:

**XAML:**
```xml
<chart:SfCircularChart x:Name="chart">
    <chart:SfCircularChart.Resources>
        <DataTemplate x:Key="labelTemplate" x:DataType="chart:LegendItem">
            <StackPanel Margin="10" Orientation="Vertical">
                <Ellipse Height="15"
                        Width="15"
                        Fill="{Binding IconBrush}"
                        Stroke="#4a4a4a"
                        StrokeThickness="2"/>
                <TextBlock HorizontalAlignment="Center"
                          FontSize="12"
                          Foreground="Black"
                          FontWeight="SemiBold"
                          Text="{Binding Item._XAxesData}"/>
            </StackPanel>
        </DataTemplate>
    </chart:SfCircularChart.Resources>
    
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend ItemTemplate="{StaticResource labelTemplate}"/>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

**C#:**
```csharp
chart.Legend = new ChartLegend()
{
    ItemTemplate = grid.Resources["labelTemplate"] as DataTemplate
};
```

### Template Binding Context

The binding context for ItemTemplate is **LegendItem**, which provides:

- **IconBrush** - Segment color brush
- **Label** - Legend item text
- **Item** - Reference to data item
- **Item._XAxesData** - X-axis value (category name)

### Advanced Template Example

```xml
<DataTemplate x:Key="advancedTemplate" x:DataType="chart:LegendItem">
    <Border Background="{Binding IconBrush}"
            CornerRadius="4"
            Padding="8,4"
            Margin="2">
        <TextBlock Text="{Binding Label}"
                  Foreground="White"
                  FontWeight="SemiBold"/>
    </Border>
</DataTemplate>
```

## Best Practices

### General Guidelines

1. **Always include legend** - Essential for identifying segments
2. **Choose appropriate placement** - Consider chart and container size
3. **Limit legend items** - Group small values if > 10 items
4. **Use consistent styling** - Match application theme

### Icon Selection

1. **Default is fine** - SeriesType works well for most cases
2. **Simple shapes** - Circle or Rectangle for clarity
3. **Consistent sizing** - Keep icons same size (12-16px typical)
4. **Custom icons** - Only when needed for branding

### Interactive Features

1. **Use checkboxes** - For explicit show/hide control
2. **Use toggle** - For simpler interaction
3. **Don't use both** - Choose one interaction method
4. **Provide feedback** - Visual indication of state

### Performance

1. **Avoid complex templates** - Keep ItemTemplate simple
2. **Reasonable item count** - < 20 legend items
3. **Static content** - Avoid animations in templates

### Accessibility

1. **Clear labels** - Ensure legend text is readable
2. **Color contrast** - Between icon and background
3. **Touch targets** - Ensure clickable areas are large enough
4. **Tooltips** - Consider adding to legend items

## Common Scenarios

### Scenario 1: Legend with Checkboxes

```xml
<chart:SfCircularChart Header="Product Sales">
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend CheckBoxVisibility="Visible"
                         Placement="Right"
                         ItemMargin="5"/>
    </chart:SfCircularChart.Legend>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: Styled Legend with Header

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Legend>
        <chart:ChartLegend Background="WhiteSmoke"
                         BorderBrush="Gray"
                         BorderThickness="1"
                         CornerRadius="5"
                         Padding="10"
                         ItemMargin="8">
            <chart:ChartLegend.Header>
                <TextBlock Text="Product Categories"
                          FontSize="14"
                          FontWeight="Bold"
                          Margin="0,0,0,10"/>
            </chart:ChartLegend.Header>
        </chart:ChartLegend>
    </chart:SfCircularChart.Legend>
</chart:SfCircularChart>
```

### Scenario 3: Compact Legend with Custom Icons

```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="compactIcon">
            <Rectangle Width="12"
                      Height="12"
                      Fill="{Binding IconBrush}"
                      RadiusX="2"
                      RadiusY="2"/>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfCircularChart>
        <chart:SfCircularChart.Legend>
            <chart:ChartLegend IconWidth="12"
                             IconHeight="12"
                             ItemMargin="5,2"/>
        </chart:SfCircularChart.Legend>
        
        <chart:SfCircularChart.Series>
            <chart:PieSeries LegendIconTemplate="{StaticResource compactIcon}"
                           ItemsSource="{Binding Data}"/>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```