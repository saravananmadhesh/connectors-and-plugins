# Tooltips

## Overview

Tooltips display information when users hover over pyramid chart segments. They provide contextual data without cluttering the chart, making them ideal for showing detailed information on demand.

**Key Features:**
- Automatic display on mouse hover
- Configurable appearance (style, colors, fonts)
- Custom template support
- Alignment and positioning options
- Animation support
- Configurable display duration

---

## Enabling Tooltips

Set the `EnableTooltip` property to `true` to display tooltips on hover.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart"
                      EnableTooltip="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value">
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.EnableTooltip = true;

this.Content = chart;
```

**Default tooltip behavior:**
- Displays category (XBindingPath) and value (YBindingPath)
- Appears on mouse hover
- Uses default system styling
- Follows cursor position

---

## Tooltip Customization

Create a `ChartTooltipBehavior` instance to customize tooltip appearance and behavior.

### Basic Setup

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart" EnableTooltip="True">
    <chart:SfPyramidChart.TooltipBehavior>
        <chart:ChartTooltipBehavior/>
    </chart:SfPyramidChart.TooltipBehavior>
</chart:SfPyramidChart>
```

**C#:**
```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.EnableTooltip = true;

ChartTooltipBehavior behavior = new ChartTooltipBehavior();
chart.TooltipBehavior = behavior;

this.Content = chart;
```

### Customization Properties

| Property | Type | Description |
|----------|------|-------------|
| **Style** | Style | Background and border styling |
| **LabelStyle** | Style | Text styling (font, color, size) |
| **HorizontalAlignment** | HorizontalAlignment | Left, Center, or Right alignment |
| **VerticalAlignment** | VerticalAlignment | Top, Center, or Bottom alignment |
| **HorizontalOffset** | double | Horizontal distance from data point |
| **VerticalOffset** | double | Vertical distance from data point |
| **Duration** | int | Display duration in milliseconds |
| **EnableAnimation** | bool | Enable/disable tooltip animation |
| **InitialShowDelay** | int | Delay before showing (milliseconds) |

---

## Background Style

Customize the tooltip's fill and stroke colors using the `Style` property targeting `Path`.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart" EnableTooltip="True">
    <chart:SfPyramidChart.Resources>
        <Style TargetType="Path" x:Key="tooltipStyle">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="LightBlue"/>
        </Style>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource tooltipStyle}"/>
    </chart:SfPyramidChart.TooltipBehavior>
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.EnableTooltip = true;

Style style = new Style(typeof(Path));
style.Setters.Add(new Setter(Path.StrokeProperty, new SolidColorBrush(Colors.Black)));
style.Setters.Add(new Setter(Path.FillProperty, new SolidColorBrush(Colors.LightBlue)));

ChartTooltipBehavior tooltipBehavior = new ChartTooltipBehavior();
tooltipBehavior.Style = style;
chart.TooltipBehavior = tooltipBehavior;

this.Content = chart;
```

### Common Style Patterns

**Dark Theme:**
```xml
<Style TargetType="Path" x:Key="darkTooltip">
    <Setter Property="Fill" Value="#2D2D2D"/>
    <Setter Property="Stroke" Value="#555555"/>
</Style>
```

**Gradient Background:**
```xml
<Style TargetType="Path" x:Key="gradientTooltip">
    <Setter Property="Stroke" Value="Navy"/>
    <Setter Property="Fill">
        <Setter.Value>
            <LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
                <GradientStop Color="LightBlue" Offset="0"/>
                <GradientStop Color="White" Offset="1"/>
            </LinearGradientBrush>
        </Setter.Value>
    </Setter>
</Style>
```

**High Contrast:**
```xml
<Style TargetType="Path" x:Key="highContrastTooltip">
    <Setter Property="Fill" Value="Yellow"/>
    <Setter Property="Stroke" Value="Black"/>
</Style>
```

---

## Label Style

Customize the tooltip text appearance using the `LabelStyle` property targeting `TextBlock`.

### XAML

```xml
<chart:SfPyramidChart x:Name="chart" EnableTooltip="True">
    <chart:SfPyramidChart.Resources>
        <Style TargetType="TextBlock" x:Key="labelStyle">
            <Setter Property="FontSize" Value="16"/>
            <Setter Property="Foreground" Value="Navy"/>
        </Style>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.TooltipBehavior>
        <chart:ChartTooltipBehavior LabelStyle="{StaticResource labelStyle}"/>
    </chart:SfPyramidChart.TooltipBehavior>
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.EnableTooltip = true;

Style labelStyle = new Style(typeof(TextBlock));
labelStyle.Setters.Add(new Setter(TextBlock.FontSizeProperty, 16d));
labelStyle.Setters.Add(new Setter(TextBlock.ForegroundProperty, new SolidColorBrush(Colors.Navy)));

ChartTooltipBehavior tooltipBehavior = new ChartTooltipBehavior();
tooltipBehavior.LabelStyle = labelStyle;
chart.TooltipBehavior = tooltipBehavior;

this.Content = chart;
```

---

## Positioning and Alignment

### Horizontal and Vertical Alignment

Position the tooltip relative to the data point:

```xml
<chart:ChartTooltipBehavior HorizontalAlignment="Left"
                            VerticalAlignment="Top"/>
```

**Alignment Options:**

| Horizontal | Vertical | Result |
|------------|----------|--------|
| Left | Top | Top-left of point |
| Center | Center | Centered on point |
| Right | Bottom | Bottom-right of point |

### Offset Properties

Fine-tune tooltip position with offset values:

```xml
<chart:ChartTooltipBehavior HorizontalOffset="20"
                            VerticalOffset="-10"/>
```

- **Positive HorizontalOffset:** Moves tooltip right
- **Negative HorizontalOffset:** Moves tooltip left
- **Positive VerticalOffset:** Moves tooltip down
- **Negative VerticalOffset:** Moves tooltip up

---

## Timing and Animation

### Display Duration

Control how long the tooltip remains visible:

```xml
<chart:ChartTooltipBehavior Duration="5000"/>
<!-- Tooltip stays visible for 5 seconds -->
```

### Initial Show Delay

Add a delay before the tooltip appears:

```xml
<chart:ChartTooltipBehavior InitialShowDelay="500"/>
<!-- Wait 500ms before showing tooltip -->
```

### Enable Animation

```xml
<chart:ChartTooltipBehavior EnableAnimation="True"/>
```

### Complete Timing Example

```xml
<chart:ChartTooltipBehavior EnableAnimation="True"
                            InitialShowDelay="300"
                            Duration="3000"/>
<!-- Fade in after 300ms, stay for 3 seconds -->
```

---

## Custom Tooltip Template

Create fully customized tooltip layouts using the `TooltipTemplate` property.

### Basic Custom Template

**XAML:**
```xml
<chart:SfPyramidChart x:Name="chart"
                      EnableTooltip="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Category"
                      YBindingPath="Value"
                      TooltipTemplate="{StaticResource tooltipTemplate}">
    
    <chart:SfPyramidChart.Resources>
        <DataTemplate x:Key="tooltipTemplate" x:DataType="chart:ChartSegment">
            <StackPanel Orientation="Horizontal" Padding="10">
                <TextBlock Text="{Binding Item.Category}"
                           Foreground="Black"
                           FontSize="14"
                           VerticalAlignment="Center"/>
                
                <TextBlock Text=" : "
                           Foreground="Black"
                           FontSize="14"
                           VerticalAlignment="Center"/>
                
                <TextBlock Text="{Binding Item.Value}"
                           Foreground="Black"
                           FontSize="14"
                           VerticalAlignment="Center"/>
            </StackPanel>
        </DataTemplate>
        
        <Style TargetType="Path" x:Key="style">
            <Setter Property="Stroke" Value="Black"/>
            <Setter Property="Fill" Value="LightGreen"/>
        </Style>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource style}"/>
    </chart:SfPyramidChart.TooltipBehavior>
    
</chart:SfPyramidChart>
```

### C#

```csharp
SfPyramidChart chart = new SfPyramidChart();
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";
chart.TooltipTemplate = this.chart.Resources["tooltipTemplate"] as DataTemplate;
chart.EnableTooltip = true;

this.Content = chart;
```

### Advanced Template with Icons

```xml
<DataTemplate x:Key="iconTooltipTemplate" x:DataType="chart:ChartSegment">
    <Border Background="#E0E0E0"
            BorderBrush="#757575"
            BorderThickness="2"
            CornerRadius="8"
            Padding="15,10">
        <StackPanel Spacing="8">
            <!-- Header with icon -->
            <StackPanel Orientation="Horizontal" Spacing="8">
                <Path Fill="#1976D2"
                      Data="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
                      Stretch="Uniform"
                      Width="16"
                      Height="16"/>
                
                <TextBlock Text="{Binding Item.Category}"
                           FontSize="16"
                           Foreground="#1976D2"
                           VerticalAlignment="Center"/>
            </StackPanel>
            
            <!-- Divider -->
            <Rectangle Height="1" Fill="#BDBDBD"/>
            
            <!-- Value -->
            <StackPanel Orientation="Horizontal" Spacing="5">
                <TextBlock Text="Value:"
                           FontSize="13"
                           Foreground="#424242"/>
                <TextBlock Text="{Binding Item.Value}"
                           FontSize="13"
                           Foreground="#D32F2F"/>
            </StackPanel>
        </StackPanel>
    </Border>
</DataTemplate>
```

### Template with Multiple Data Fields

```xml
<DataTemplate x:Key="detailedTooltipTemplate" x:DataType="chart:ChartSegment">
    <Border Background="White"
            BorderBrush="Navy"
            BorderThickness="2"
            CornerRadius="5"
            Padding="12">
        <Grid RowSpacing="5">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <!-- Title -->
            <TextBlock Grid.Row="0"
                       Text="{Binding Item.Category}"
                       FontSize="16"
                       Foreground="Navy"/>
            
            <!-- Value -->
            <TextBlock Grid.Row="1"
                       FontSize="13">
                <Run Text="Value: " Foreground="Gray"/>
                <Run Text="{Binding Item.Value}" Foreground="Black"/>
            </TextBlock>
            
            <!-- Percentage (if applicable) -->
            <TextBlock Grid.Row="2"
                       FontSize="13">
                <Run Text="Percentage: " Foreground="Gray"/>
                <Run Text="{Binding Item.Percentage}" Foreground="Green"/>
            </TextBlock>
            
            <!-- Additional info -->
            <TextBlock Grid.Row="3"
                       Text="{Binding Item.Description}"
                       FontSize="11"
                       Foreground="Gray"
                       TextWrapping="Wrap"
                       MaxWidth="200"/>
        </Grid>
    </Border>
</DataTemplate>
```

### Binding Context

The `TooltipTemplate` binding context is `ChartSegment`, which provides:

| Property | Description |
|----------|-------------|
| **Item** | Reference to the data object |
| **Item.{PropertyName}** | Access any property from your data model |

**Example:**
```xml
<!-- Access Category and Value from your model -->
<TextBlock Text="{Binding Item.Category}"/>
<TextBlock Text="{Binding Item.Value}"/>
<TextBlock Text="{Binding Item.Description}"/>
```

---

## Complete Examples

### Example 1: Styled Tooltip

```xml
<chart:SfPyramidChart EnableTooltip="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Region"
                      YBindingPath="Sales">
    
    <chart:SfPyramidChart.Resources>
        <Style TargetType="Path" x:Key="bgStyle">
            <Setter Property="Fill" Value="#2C3E50"/>
            <Setter Property="Stroke" Value="#34495E"/>
        </Style>
        
        <Style TargetType="TextBlock" x:Key="textStyle">
            <Setter Property="Foreground" Value="White"/>
            <Setter Property="FontSize" Value="14"/>
        </Style>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart.TooltipBehavior>
        <chart:ChartTooltipBehavior Style="{StaticResource bgStyle}"
                                    LabelStyle="{StaticResource textStyle}"
                                    HorizontalAlignment="Center"
                                    VerticalAlignment="Top"
                                    VerticalOffset="-15"
                                    EnableAnimation="True"
                                    InitialShowDelay="200"
                                    Duration="4000"/>
    </chart:SfPyramidChart.TooltipBehavior>
    
</chart:SfPyramidChart>
```

### Example 2: Custom Template Tooltip

```xml
<chart:SfPyramidChart EnableTooltip="True"
                      ItemsSource="{Binding Data}"
                      XBindingPath="Product"
                      YBindingPath="Revenue">
    
    <chart:SfPyramidChart.Resources>
        <DataTemplate x:Key="revenueTooltip" x:DataType="chart:ChartSegment">
            <Border Background="Gold"
                    BorderBrush="DarkGoldenrod"
                    BorderThickness="3"
                    CornerRadius="10"
                    Padding="15">
                <StackPanel Spacing="5">
                    <TextBlock Text="{Binding Item.Product}"
                               FontSize="18"
                               Foreground="DarkRed"/>
                    
                    <TextBlock FontSize="14" Foreground="Black">
                        <Run Text="Revenue: $"/>
                        <Run Text="{Binding Item.Revenue}"/>
                    </TextBlock>
                </StackPanel>
            </Border>
        </DataTemplate>
    </chart:SfPyramidChart.Resources>
    
    <chart:SfPyramidChart TooltipTemplate="{StaticResource revenueTooltip}"/>
    
</chart:SfPyramidChart>
```

### Example 3: C# Complete Configuration

```csharp
SfPyramidChart chart = new SfPyramidChart
{
    EnableTooltip = true
};

// Create background style
Style bgStyle = new Style(typeof(Path));
bgStyle.Setters.Add(new Setter(Path.FillProperty, 
    new SolidColorBrush(Color.FromArgb(255, 44, 62, 80))));
bgStyle.Setters.Add(new Setter(Path.StrokeProperty, 
    new SolidColorBrush(Color.FromArgb(255, 52, 73, 94))));

// Create label style
Style labelStyle = new Style(typeof(TextBlock));
labelStyle.Setters.Add(new Setter(TextBlock.ForegroundProperty, 
    new SolidColorBrush(Colors.White)));
labelStyle.Setters.Add(new Setter(TextBlock.FontSizeProperty, 14d));

// Configure tooltip behavior
ChartTooltipBehavior tooltipBehavior = new ChartTooltipBehavior
{
    Style = bgStyle,
    LabelStyle = labelStyle,
    HorizontalAlignment = HorizontalAlignment.Center,
    VerticalAlignment = VerticalAlignment.Top,
    VerticalOffset = -15,
    EnableAnimation = true,
    InitialShowDelay = 200,
    Duration = 4000
};

chart.TooltipBehavior = tooltipBehavior;

// Data binding
chart.SetBinding(SfPyramidChart.ItemsSourceProperty, 
    new Binding() { Path = new PropertyPath("Data") });
chart.XBindingPath = "Category";
chart.YBindingPath = "Value";

this.Content = chart;
```

---

## Best Practices

1. **Keep tooltips concise** - Show only essential information
2. **Use high contrast** - Ensure text is easily readable
3. **Minimal delay** - 200-500ms InitialShowDelay provides good UX
4. **Appropriate duration** - 3-5 seconds is usually sufficient
5. **Template complexity** - Simple templates perform better
6. **Test on touch devices** - Tooltips may behave differently
7. **Accessibility** - Ensure tooltip text is accessible to screen readers

---

## Troubleshooting

**Tooltip not showing:**
- Verify `EnableTooltip="True"` is set
- Check that data binding is working
- Ensure you're hovering over actual segments

**Tooltip positioning issues:**
- Adjust HorizontalOffset and VerticalOffset
- Try different alignment values
- Check if tooltip is being clipped by window bounds

**Custom template not displaying:**
- Verify `x:DataType="chart:ChartSegment"`
- Check binding paths match your data model properties
- Ensure template resource key matches reference
