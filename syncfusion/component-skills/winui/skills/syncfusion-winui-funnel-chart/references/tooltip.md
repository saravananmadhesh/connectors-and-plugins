# Tooltips

## Table of Contents
- [Overview](#overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Behavior Configuration](#tooltip-behavior-configuration)
- [Background Styling](#background-styling)
- [Label Styling](#label-styling)
- [Positioning](#positioning)
- [Timing and Animation](#timing-and-animation)
- [Custom Templates](#custom-templates)
- [Best Practices](#best-practices)

## Overview

Tooltips display detailed information about segments when users hover over them with the mouse. They provide context without cluttering the chart with permanent labels.

## Enabling Tooltips

Set the `EnableTooltip` property to `true`:

### XAML
```xml
<chart:SfFunnelChart x:Name="chart"
                     EnableTooltip="True"
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
chart.EnableTooltip = true;
this.Content = chart;
```

**Default behavior:** Shows segment value on hover.

## Tooltip Behavior Configuration

Use `ChartTooltipBehavior` to customize tooltip appearance and behavior:

### Basic Configuration
```xml
<chart:SfFunnelChart EnableTooltip="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value">
    
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior />
    </chart:SfFunnelChart.TooltipBehavior>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
ChartTooltipBehavior behavior = new ChartTooltipBehavior();
chart.TooltipBehavior = behavior;
chart.EnableTooltip = true;
this.Content = chart;
```

### Available Properties

The `ChartTooltipBehavior` provides these customization properties:

- **Style** - Customize fill and stroke of tooltip background
- **LabelStyle** - Customize tooltip text appearance
- **HorizontalAlignment** - Align tooltip horizontally (Left, Center, Right)
- **VerticalAlignment** - Align tooltip vertically (Top, Center, Bottom)
- **HorizontalOffset** - Distance from data point horizontally
- **VerticalOffset** - Distance from data point vertically
- **Duration** - How long tooltip remains visible (milliseconds)
- **EnableAnimation** - Enable/disable tooltip animation
- **InitialShowDelay** - Delay before showing tooltip (milliseconds)

## Background Styling

Customize tooltip background using the `Style` property with `TargetType="Path"`:

### Custom Background Example
```xml
<chart:SfFunnelChart x:Name="chart" EnableTooltip="True">
    
    <chart:SfFunnelChart.Resources>
        <Style TargetType="Path" x:Key="tooltipStyle">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="Gray"/>
        </Style>
    </chart:SfFunnelChart.Resources>
    
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource tooltipStyle}"/>
    </chart:SfFunnelChart.TooltipBehavior>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.EnableTooltip = true;

Style style = new Style(typeof(Path));
style.Setters.Add(new Setter(Path.StrokeProperty, new SolidColorBrush(Colors.Black)));
style.Setters.Add(new Setter(Path.FillProperty, new SolidColorBrush(Colors.Gray)));

ChartTooltipBehavior tooltipBehavior = new ChartTooltipBehavior();
tooltipBehavior.Style = style;
chart.TooltipBehavior = tooltipBehavior;

this.Content = chart;
```

### Professional Background
```xml
<Style TargetType="Path" x:Key="professionalTooltip">
    <Setter Property="Stroke" Value="#2C3E50"/>
    <Setter Property="Fill" Value="White"/>
</Style>
```

### Vibrant Background
```xml
<Style TargetType="Path" x:Key="vibrantTooltip">
    <Setter Property="Stroke" Value="#E91E63"/>
    <Setter Property="Fill" Value="#F8BBD0"/>
</Style>
```

### Dark Theme Tooltip
```xml
<Style TargetType="Path" x:Key="darkTooltip">
    <Setter Property="Stroke" Value="#455A64"/>
    <Setter Property="Fill" Value="#263238"/>
</Style>
```

## Label Styling

Customize tooltip text using the `LabelStyle` property with `TargetType="TextBlock"`:

### Custom Label Style
```xml
<chart:SfFunnelChart x:Name="chart" EnableTooltip="True">
    
    <chart:SfFunnelChart.Resources>
        <Style TargetType="TextBlock" x:Key="labelStyle">
            <Setter Property="FontSize" Value="14"/>
            <Setter Property="Foreground" Value="Red"/>
        </Style>
    </chart:SfFunnelChart.Resources>
    
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior LabelStyle="{StaticResource labelStyle}"/>
    </chart:SfFunnelChart.TooltipBehavior>
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();

Style labelStyle = new Style(typeof(TextBlock));
labelStyle.Setters.Add(new Setter(TextBlock.FontSizeProperty, 14d));
labelStyle.Setters.Add(new Setter(TextBlock.ForegroundProperty, new SolidColorBrush(Colors.Red)));

ChartTooltipBehavior tooltipBehavior = new ChartTooltipBehavior();
tooltipBehavior.LabelStyle = labelStyle;
chart.TooltipBehavior = tooltipBehavior;

this.Content = chart;
```

### Bold Professional Label
```xml
<Style TargetType="TextBlock" x:Key="boldLabel">
    <Setter Property="FontSize" Value="15"/>
    <Setter Property="Foreground" Value="#2C3E50"/>
</Style>
```

### Light Elegant Label
```xml
<Style TargetType="TextBlock" x:Key="elegantLabel">
    <Setter Property="FontSize" Value="13"/>
    <Setter Property="Foreground" Value="#FFFFFF"/>
    <Setter Property="FontFamily" Value="Segoe UI"/>
</Style>
```

### Combined Background and Label Styling
```xml
<chart:SfFunnelChart EnableTooltip="True">
    
    <chart:SfFunnelChart.Resources>
        <Style TargetType="Path" x:Key="bgStyle">
            <Setter Property="Stroke" Value="#3498DB"/>
            <Setter Property="Fill" Value="White"/>
        </Style>
        
        <Style TargetType="TextBlock" x:Key="textStyle">
            <Setter Property="FontSize" Value="14"/>
            <Setter Property="Foreground" Value="#2C3E50"/>
        </Style>
    </chart:SfFunnelChart.Resources>
    
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource bgStyle}"
                                   LabelStyle="{StaticResource textStyle}"/>
    </chart:SfFunnelChart.TooltipBehavior>
</chart:SfFunnelChart>
```

## Positioning

Control tooltip position relative to the data point:

### Horizontal Alignment
```xml
<!-- Align to left of data point -->
<chart:ChartTooltipBehavior HorizontalAlignment="Left"/>

<!-- Center on data point (default) -->
<chart:ChartTooltipBehavior HorizontalAlignment="Center"/>

<!-- Align to right of data point -->
<chart:ChartTooltipBehavior HorizontalAlignment="Right"/>
```

### Vertical Alignment
```xml
<!-- Above data point -->
<chart:ChartTooltipBehavior VerticalAlignment="Top"/>

<!-- Centered on data point -->
<chart:ChartTooltipBehavior VerticalAlignment="Center"/>

<!-- Below data point -->
<chart:ChartTooltipBehavior VerticalAlignment="Bottom"/>
```

### Horizontal Offset
```xml
<!-- Move 20 pixels to the right -->
<chart:ChartTooltipBehavior HorizontalOffset="20"/>

<!-- Move 20 pixels to the left -->
<chart:ChartTooltipBehavior HorizontalOffset="-20"/>
```

### Vertical Offset
```xml
<!-- Move 15 pixels down -->
<chart:ChartTooltipBehavior VerticalOffset="15"/>

<!-- Move 15 pixels up -->
<chart:ChartTooltipBehavior VerticalOffset="-15"/>
```

### Combined Positioning
```xml
<chart:ChartTooltipBehavior HorizontalAlignment="Right"
                           VerticalAlignment="Top"
                           HorizontalOffset="10"
                           VerticalOffset="-10"/>
```

**Use cases:**
- Prevent tooltip from covering important chart areas
- Position away from chart edges
- Align with specific UI elements

## Timing and Animation

Control tooltip display timing and animation:

### Duration (How Long Tooltip Stays Visible)
```xml
<!-- Show for 3 seconds (3000 milliseconds) -->
<chart:ChartTooltipBehavior Duration="3000"/>

<!-- Show for 5 seconds -->
<chart:ChartTooltipBehavior Duration="5000"/>

<!-- Show indefinitely until mouse moves away -->
<chart:ChartTooltipBehavior Duration="0"/>
```

### Initial Show Delay
```xml
<!-- Wait 500ms before showing tooltip -->
<chart:ChartTooltipBehavior InitialShowDelay="500"/>

<!-- Show immediately on hover -->
<chart:ChartTooltipBehavior InitialShowDelay="0"/>

<!-- Wait 1 second before showing -->
<chart:ChartTooltipBehavior InitialShowDelay="1000"/>
```

### Enable/Disable Animation
```xml
<!-- With animation (default) -->
<chart:ChartTooltipBehavior EnableAnimation="True"/>

<!-- Without animation -->
<chart:ChartTooltipBehavior EnableAnimation="False"/>
```

### Complete Timing Configuration
```xml
<chart:ChartTooltipBehavior Duration="4000"
                           InitialShowDelay="300"
                           EnableAnimation="True"/>
```

**Best practices:**
- Use `InitialShowDelay` (300-500ms) to prevent accidental triggers
- Set `Duration` to 0 for tooltips with important information
- Disable animation for better performance with many segments

## Custom Templates

Create fully custom tooltip layouts using `TooltipTemplate`:

### Basic Custom Template
```xml
<chart:SfFunnelChart x:Name="chart"
                     Height="388" Width="500"
                     EnableTooltip="True"
                     ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     TooltipTemplate="{StaticResource tooltipTemplate}">
    
    <chart:SfFunnelChart.Resources>
        <DataTemplate x:Key="tooltipTemplate" x:DataType="chart:ChartSegment">
            <StackPanel Orientation="Horizontal">
                <TextBlock Text="{Binding Item.Category}"
                           Foreground="Black"
                           FontSize="12"
                           HorizontalAlignment="Center"
                           VerticalAlignment="Center"/>
                <TextBlock Text=" : "
                           Foreground="Black"
                           FontSize="12"
                           HorizontalAlignment="Center"
                           VerticalAlignment="Center"/>
                <TextBlock Text="{Binding Item.Value}"
                           Foreground="Black"
                           FontSize="12"
                           HorizontalAlignment="Center"
                           VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
        
        <Style TargetType="Path" x:Key="tooltipBgStyle">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="LightGreen"/>
        </Style>
    </chart:SfFunnelChart.Resources>
    
    <chart:SfFunnelChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource tooltipBgStyle}"/>
    </chart:SfFunnelChart.TooltipBehavior>
    
</chart:SfFunnelChart>
```

### C# Implementation
```csharp
SfFunnelChart chart = new SfFunnelChart();
chart.SetBinding(SfFunnelChart.ItemsSourceProperty, new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.EnableTooltip = true;
chart.TooltipTemplate = this.chart.Resources["tooltipTemplate"] as DataTemplate;
this.Content = chart;
```

### Rich Content Template
```xml
<DataTemplate x:Key="richTooltip" x:DataType="chart:ChartSegment">
    <Grid Padding="12,8">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="Auto"/>
        </Grid.RowDefinitions>
        
        <!-- Header -->
        <TextBlock Grid.Row="0"
                   Text="{Binding Item.Category}"
                   FontSize="16"
                   Foreground="#2C3E50"/>
        
        <!-- Separator -->
        <Rectangle Grid.Row="1"
                   Height="1"
                   Fill="#BDC3C7"
                   Margin="0,4"/>
        
        <!-- Value -->
        <StackPanel Grid.Row="2" Orientation="Horizontal" Margin="0,4,0,0">
            <TextBlock Text="Value: "
                       FontSize="13"
                       Foreground="#7F8C8D"/>
            <TextBlock Text="{Binding Item.Value}"
                       FontSize="13"
                       Foreground="#27AE60"/>
        </StackPanel>
    </Grid>
</DataTemplate>
```

### Card-Style Tooltip
```xml
<DataTemplate x:Key="cardTooltip" x:DataType="chart:ChartSegment">
    <Border Background="White"
            BorderBrush="#E0E0E0"
            BorderThickness="1"
            CornerRadius="6"
            Padding="16,12">
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <TextBlock Grid.Row="0"
                       Text="{Binding Item.Category}"
                       FontSize="14"
                       Foreground="#333333"/>
            
            <StackPanel Grid.Row="1" Orientation="Horizontal" Margin="0,6,0,0">
                <Ellipse Width="8" Height="8"
                         Fill="#4CAF50"
                         VerticalAlignment="Center"
                         Margin="0,0,6,0"/>
                <TextBlock Text="{Binding Item.Value}"
                           FontSize="18"
                           Foreground="#4CAF50"/>
            </StackPanel>
        </Grid>
    </Border>
</DataTemplate>
```

### Percentage Display Template
```xml
<DataTemplate x:Key="percentageTooltip" x:DataType="chart:ChartSegment">
    <StackPanel Padding="10">
        <TextBlock Text="{Binding Item.Category}"
                   FontSize="13"
                   Foreground="White"/>
        <StackPanel Orientation="Horizontal" Margin="0,4,0,0">
            <TextBlock Text="{Binding Item.Value}"
                       FontSize="20"
                       Foreground="#FFC107"/>
            <TextBlock Text="%"
                       FontSize="16"
                       Foreground="#FFC107"
                       VerticalAlignment="Bottom"
                       Margin="2,0,0,2"/>
        </StackPanel>
    </StackPanel>
</DataTemplate>
```

**Important:** 
- The binding context for `TooltipTemplate` is `ChartSegment`
- Access data via `Item.{PropertyName}` (e.g., `Item.Category`, `Item.Value`)
- Combine with `Style` property for background customization

## Best Practices

### 1. Keep It Concise
- Display only essential information
- Avoid long text that extends tooltip boundaries
- Use abbreviations when appropriate

### 2. Ensure Readability
- Maintain high contrast between text and background
- Use adequate font sizes (minimum 12px)
- Test with various background colors

### 3. Performance Considerations
- Simple templates are faster than complex ones
- Avoid animations within tooltips
- Disable tooltips if not needed

### 4. Timing
- Add slight delay (300-500ms) to prevent accidental triggers
- Allow enough duration for users to read content
- Consider disabling animation for better responsiveness

### 5. Positioning
- Ensure tooltips don't cover important chart areas
- Test with charts at different sizes
- Use offsets to fine-tune placement

## Common Patterns

### Minimal Tooltip
```xml
<chart:ChartTooltipBehavior InitialShowDelay="200"
                           Duration="2000"
                           EnableAnimation="True"/>
```

### Professional Dashboard Tooltip
```xml
<chart:ChartTooltipBehavior Style="{StaticResource whiteBackground}"
                           LabelStyle="{StaticResource darkText}"
                           InitialShowDelay="300"
                           HorizontalOffset="15"
                           VerticalOffset="-15"/>
```

### Persistent Information Tooltip
```xml
<chart:ChartTooltipBehavior Duration="0"
                           InitialShowDelay="0"
                           EnableAnimation="False"
                           VerticalAlignment="Top"
                           HorizontalAlignment="Right"/>
```

## Troubleshooting

### Tooltip Not Appearing
- Verify `EnableTooltip="True"` is set
- Check if mouse is actually hovering over segments
- Ensure `TooltipBehavior` is properly configured

### Tooltip Flickering
- Increase `InitialShowDelay` (e.g., 300-500ms)
- Reduce or disable animation
- Check for rapid mouse movements

### Custom Template Not Displaying
- Verify `x:DataType="chart:ChartSegment"` is set
- Check binding paths: use `Item.{PropertyName}`
- Ensure template is in Resources and referenced correctly

### Tooltip Positioned Incorrectly
- Adjust `HorizontalAlignment` and `VerticalAlignment`
- Use `HorizontalOffset` and `VerticalOffset` for fine-tuning
- Test with different chart sizes and data

### Text Not Visible
- Check contrast between `Foreground` and background
- Verify `LabelStyle` is applied correctly
- Ensure tooltip isn't transparent
