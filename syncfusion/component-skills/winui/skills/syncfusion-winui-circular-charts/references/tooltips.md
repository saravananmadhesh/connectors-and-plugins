# Tooltips

## Table of Contents
- [Overview](#overview)
- [Enabling Tooltips](#enabling-tooltips)
- [Tooltip Behavior Configuration](#tooltip-behavior-configuration)
- [Background Styling](#background-styling)
- [Label Styling](#label-styling)
- [Positioning and Alignment](#positioning-and-alignment)
- [Custom Templates](#custom-templates)
- [Best Practices](#best-practices)

## Overview

Tooltips provide contextual information when users hover over chart segments. They display segment details like category names, values, and percentages without cluttering the chart.

**Key Features:**
- Automatic display on hover
- Customizable appearance
- Template support for complex layouts
- Position and alignment control
- Animation and duration settings

## Enabling Tooltips

### Basic Tooltip

Enable tooltips using the **EnableTooltip** property on series:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="SalesRate"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

PieSeries series = new PieSeries();
series.EnableTooltip = true;

chart.Series.Add(series);
```

**Default behavior:** Shows segment value and category name in a simple tooltip.

## Tooltip Behavior Configuration

Configure tooltip behavior using **TooltipBehavior** property on the chart:

### Basic Configuration

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

ChartTooltipBehavior tooltip = new ChartTooltipBehavior();
chart.TooltipBehavior = tooltip;

PieSeries series = new PieSeries();
series.EnableTooltip = true;

chart.Series.Add(series);
```

### Advanced Configuration

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Duration="3000"
                                  EnableAnimation="True"
                                  InitialShowDelay="500"
                                  HorizontalAlignment="Center"
                                  VerticalAlignment="Top"
                                  HorizontalOffset="0"
                                  VerticalOffset="-10"/>
    </chart:SfCircularChart.TooltipBehavior>
</chart:SfCircularChart>
```

**C#:**
```csharp
ChartTooltipBehavior tooltip = new ChartTooltipBehavior()
{
    Duration = 3000,               // Visible for 3 seconds
    EnableAnimation = true,         // Fade in/out animation
    InitialShowDelay = 500,        // 500ms delay before showing
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Top,
    HorizontalOffset = 0,
    VerticalOffset = -10
};

chart.TooltipBehavior = tooltip;
```

### Configuration Properties

- **Duration** - Time tooltip remains visible (milliseconds)
- **EnableAnimation** - Enable fade animations (true/false)
- **InitialShowDelay** - Delay before tooltip appears (milliseconds)
- **HorizontalAlignment** - Left, Center, Right
- **VerticalAlignment** - Top, Center, Bottom
- **HorizontalOffset** - Horizontal distance from segment (pixels)
- **VerticalOffset** - Vertical distance from segment (pixels)

## Background Styling

Customize tooltip background using the **Style** property:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
        <Style TargetType="Path" x:Key="tooltipStyle">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="LightBlue"/>
        </Style>
    </chart:SfCircularChart.Resources>
    
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource tooltipStyle}"/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
Style tooltipStyle = new Style(typeof(Path));
tooltipStyle.Setters.Add(new Setter(Path.StrokeProperty, new SolidColorBrush(Colors.Black)));
tooltipStyle.Setters.Add(new Setter(Path.FillProperty, new SolidColorBrush(Colors.LightBlue)));
ChartTooltipBehavior tooltip = new ChartTooltipBehavior();
tooltip.Style = tooltipStyle;

chart.TooltipBehavior = tooltip;
```

### Style Examples

**Dark theme tooltip:**
```xml
<Style TargetType="Path" x:Key="darkTooltip">
    <Setter Property="Fill" Value="#333333"/>
    <Setter Property="Stroke" Value="#666666"/>
</Style>
```

**Colorful tooltip:**
```xml
<Style TargetType="Path" x:Key="colorfulTooltip">
    <Setter Property="Fill" Value="Orange"/>
    <Setter Property="Stroke" Value="DarkOrange"/>
</Style>
```

**Transparent tooltip:**
```xml
<Style TargetType="Path" x:Key="transparentTooltip">
    <Setter Property="Fill" Value="#AA000000"/>
    <Setter Property="Stroke" Value="White"/>
</Style>
```

## Label Styling

Customize tooltip text using the **LabelStyle** property:

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
        <Style TargetType="TextBlock" x:Key="labelStyle">
            <Setter Property="FontSize" Value="14"/>
            <Setter Property="Foreground" Value="White"/>
            <Setter Property="FontStyle" Value="Italic"/>
        </Style>
    </chart:SfCircularChart.Resources>
    
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior LabelStyle="{StaticResource labelStyle}"/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

**C#:**
```csharp
Style labelStyle = new Style(typeof(TextBlock));
labelStyle.Setters.Add(new Setter(TextBlock.FontSizeProperty, 14d));
labelStyle.Setters.Add(new Setter(TextBlock.FontStyleProperty, FontStyles.Italic));
labelStyle.Setters.Add(new Setter(TextBlock.ForegroundProperty, new SolidColorBrush(Colors.White)));

ChartTooltipBehavior tooltip = new ChartTooltipBehavior();
tooltip.LabelStyle = labelStyle;

chart.TooltipBehavior = tooltip;
```

### Label Style Properties

- **FontSize** - Text size
- **FontFamily** - Font typeface
- **FontStyle** - Italic
- **Foreground** - Text color

### Combined Background and Label Styling

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
        <Style TargetType="Path" x:Key="bgStyle">
            <Setter Property="Fill" Value="#2196F3"/>
            <Setter Property="Stroke" Value="#1976D2"/>
            <Setter Property="StrokeThickness" Value="1"/>
        </Style>
        
        <Style TargetType="TextBlock" x:Key="textStyle">
            <Setter Property="FontSize" Value="12"/>
            <Setter Property="Foreground" Value="White"/>
            <Setter Property="FontWeight" Value="SemiBold"/>
        </Style>
    </chart:SfCircularChart.Resources>
    
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource bgStyle}"
                                  LabelStyle="{StaticResource textStyle}"/>
    </chart:SfCircularChart.TooltipBehavior>
</chart:SfCircularChart>
```

## Positioning and Alignment

Control tooltip placement relative to segments:

### Horizontal Alignment

**XAML:**
```xml
<!-- Center aligned -->
<chart:ChartTooltipBehavior HorizontalAlignment="Center"/>

<!-- Left aligned -->
<chart:ChartTooltipBehavior HorizontalAlignment="Left"/>

<!-- Right aligned -->
<chart:ChartTooltipBehavior HorizontalAlignment="Right"/>
```

### Vertical Alignment

**XAML:**
```xml
<!-- Top aligned -->
<chart:ChartTooltipBehavior VerticalAlignment="Top"/>

<!-- Center aligned -->
<chart:ChartTooltipBehavior VerticalAlignment="Center"/>

<!-- Bottom aligned -->
<chart:ChartTooltipBehavior VerticalAlignment="Bottom"/>
```

### Offsets

Fine-tune position with offset values:

**XAML:**
```xml
<!-- Move tooltip 20px right, 10px up -->
<chart:ChartTooltipBehavior HorizontalOffset="20"
                          VerticalOffset="-10"/>
```

**C#:**
```csharp
tooltip.HorizontalOffset = 20;   // Move right
tooltip.VerticalOffset = -10;    // Move up (negative = up)
```

### Practical Positioning Examples

**Above segment:**
```xml
<chart:ChartTooltipBehavior VerticalAlignment="Top"
                          VerticalOffset="-15"/>
```

**Below segment:**
```xml
<chart:ChartTooltipBehavior VerticalAlignment="Bottom"
                          VerticalOffset="15"/>
```

**Left of cursor:**
```xml
<chart:ChartTooltipBehavior HorizontalAlignment="Left"
                          HorizontalOffset="-10"/>
```

## Custom Templates

Create fully custom tooltip layouts using **TooltipTemplate** on series:

**XAML:**
```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="tooltipTemplate" x:DataType="chart:ChartSegment">
            <StackPanel Orientation="Horizontal"
                       Background="#333"
                       Padding="10">
                <TextBlock Text="{Binding Item.Product}"
                          Foreground="White"
                          FontWeight="Medium"
                          FontSize="12"/>
                <TextBlock Text=" : "
                          Foreground="White"
                          FontWeight="Medium"
                          FontSize="12"/>
                <TextBlock Text="{Binding Item.SalesRate}"
                          Foreground="White"
                          FontWeight="Medium"
                          FontSize="12"/>
            </StackPanel>
        </DataTemplate>
        
        <Style TargetType="Path" x:Key="bgStyle">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="LightGreen"/>
            <Setter Property="StrokeThickness" Value="2"/>
        </Style>
    </Grid.Resources>
    
    <chart:SfCircularChart>
        <chart:SfCircularChart.TooltipBehavior>
            <chart:ChartTooltipBehavior Style="{StaticResource bgStyle}"/>
        </chart:SfCircularChart.TooltipBehavior>
        
        <chart:SfCircularChart.Series>
            <chart:PieSeries EnableTooltip="True"
                           ItemsSource="{Binding Data}"
                           XBindingPath="Product"
                           YBindingPath="SalesRate"
                           TooltipTemplate="{StaticResource tooltipTemplate}"/>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```

**C#:**
```csharp
PieSeries series = new PieSeries();
series.EnableTooltip = true;
series.TooltipTemplate = grid.Resources["tooltipTemplate"] as DataTemplate;
```

### Template Binding Context

The binding context is **ChartSegment**, which provides:

- **Item** - The data model object
- **Item.PropertyName** - Access to specific properties

### Advanced Template Examples

**Multi-line template:**
```xml
<DataTemplate x:Key="multiLineTooltip" x:DataType="chart:ChartSegment">
    <StackPanel Background="White" Padding="10">
        <TextBlock Text="{Binding Item.Product}"
                  FontSize="14"
                  FontWeight="Bold"
                  Foreground="Black"/>
        <TextBlock Text="{Binding Item.SalesRate}"
                  FontSize="12"
                  Foreground="Gray"/>
    </StackPanel>
</DataTemplate>
```

**Template with icon:**
```xml
<DataTemplate x:Key="iconTooltip" x:DataType="chart:ChartSegment">
    <StackPanel Orientation="Horizontal"
               Background="WhiteSmoke"
               Padding="8">
        <SymbolIcon Symbol="Shop"
                   Foreground="DarkBlue"
                   Margin="0,0,8,0"/>
        <StackPanel>
            <TextBlock Text="{Binding Item.Product}"
                      FontWeight="Bold"/>
            <TextBlock Text="{Binding Item.SalesRate}"
                      FontSize="10"/>
        </StackPanel>
    </StackPanel>
</DataTemplate>
```

**Formatted value template:**
```xml
<DataTemplate x:Key="formattedTooltip" x:DataType="chart:ChartSegment">
    <Border Background="#1E88E5"
           BorderBrush="#1565C0"
           BorderThickness="1"
           CornerRadius="4"
           Padding="10,5">
        <StackPanel>
            <TextBlock Text="{Binding Item.Product}"
                      Foreground="White"
                      FontSize="11"/>
            <TextBlock Foreground="White"
                      FontSize="14"
                      FontWeight="Bold">
                <Run Text="$"/>
                <Run Text="{Binding Item.SalesRate}"/>
            </TextBlock>
        </StackPanel>
    </Border>
</DataTemplate>
```

## Best Practices

### Content

1. **Keep it concise** - Show only essential information
2. **Include context** - Category name + value
3. **Format numbers** - Use appropriate decimal places
4. **Add units** - Include currency, percentage, etc.

### Appearance

1. **Ensure readability** - High contrast text
2. **Match theme** - Coordinate with chart design
3. **Reasonable size** - Not too large or small
4. **Consistent styling** - Use same style across chart

### Behavior

1. **Reasonable duration** - 2-3 seconds default
2. **Smooth animation** - Enable for better UX
3. **Appropriate delay** - 200-500ms show delay
4. **Good positioning** - Don't obscure other segments

### Performance

1. **Simple templates** - Avoid complex layouts
2. **No heavy bindings** - Keep data access simple
3. **Static content** - Avoid animations in templates
4. **Minimal nesting** - Flat template structure

### Accessibility

1. **Readable fonts** - Minimum 11-12pt
2. **High contrast** - Between text and background
3. **Clear information** - Essential data only
4. **Keyboard support** - Ensure tooltips work with keyboard navigation

## Common Scenarios

### Scenario 1: Simple Styled Tooltip

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
        <Style TargetType="Path" x:Key="tooltipBg">
            <Setter Property="Fill" Value="#424242"/>
            <Setter Property="Stroke" Value="#616161"/>
        </Style>
        
        <Style TargetType="TextBlock" x:Key="tooltipText">
            <Setter Property="Foreground" Value="White"/>
            <Setter Property="FontSize" Value="12"/>
        </Style>
    </chart:SfCircularChart.Resources>
    
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource tooltipBg}"
                                  LabelStyle="{StaticResource tooltipText}"
                                  Duration="2000"
                                  EnableAnimation="True"/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"
                       XBindingPath="Product"
                       YBindingPath="Sales"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 2: Positioned Above Segment

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior VerticalAlignment="Top"
                                  VerticalOffset="-20"
                                  HorizontalAlignment="Center"
                                  InitialShowDelay="300"/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```

### Scenario 3: Custom Template with Percentage

```xml
<Grid x:Name="grid">
    <Grid.Resources>
        <DataTemplate x:Key="percentTooltip" x:DataType="chart:ChartSegment">
            <Border Background="Orange"
                   BorderBrush="DarkOrange"
                   BorderThickness="1"
                   CornerRadius="3"
                   Padding="8,4">
                <StackPanel>
                    <TextBlock Text="{Binding Item.Category}"
                              Foreground="White"
                              FontWeight="Bold"
                              FontSize="11"/>
                    <TextBlock Foreground="White"
                              FontSize="10">
                        <Run Text="{Binding Item.Value}"/>
                        <Run Text=" ("/>
                        <Run Text="{Binding Item.Percentage}"/>
                        <Run Text="%)"/>
                    </TextBlock>
                </StackPanel>
            </Border>
        </DataTemplate>
    </Grid.Resources>
    
    <chart:SfCircularChart>
        <chart:SfCircularChart.Series>
            <chart:PieSeries EnableTooltip="True"
                           TooltipTemplate="{StaticResource percentTooltip}"
                           ItemsSource="{Binding Data}"/>
        </chart:SfCircularChart.Series>
    </chart:SfCircularChart>
</Grid>
```

### Scenario 4: Delayed Tooltip

```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.TooltipBehavior>
        <chart:ChartTooltipBehavior InitialShowDelay="800"
                                  Duration="4000"
                                  EnableAnimation="True"/>
    </chart:SfCircularChart.TooltipBehavior>
    
    <chart:SfCircularChart.Series>
        <chart:PieSeries EnableTooltip="True"
                       ItemsSource="{Binding Data}"/>
    </chart:SfCircularChart.Series>
</chart:SfCircularChart>
```