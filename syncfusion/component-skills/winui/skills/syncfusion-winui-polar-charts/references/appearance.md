# Appearance and Styling in Polar Charts

Complete guide to customizing the appearance of Syncfusion WinUI Polar Chart using palettes, custom colors, and gradients.

## Table of Contents
- [Overview](#overview)
- [Default Palette Brushes](#default-palette-brushes)
- [Custom Palette Brushes](#custom-palette-brushes)
- [Applying Gradients](#applying-gradients)
- [Individual Series Styling](#individual-series-styling)
- [Theme Integration](#theme-integration)
- [Best Practices](#best-practices)

## Overview

The appearance of the SfPolarChart can be customized using:
- **Default palette** - Built-in color scheme
- **Custom palettes** - Define your own color schemes
- **Gradients** - LinearGradientBrush and RadialGradientBrush
- **Series-specific styling** - Individual Fill and Stroke properties

## Default Palette Brushes

SfPolarChart includes one predefined palette that's applied automatically to series.

### Basic Usage

When you don't specify custom colors, the chart uses its default palette:

**XAML:**
```xml
<chart:SfPolarChart GridLineType="Polygon">
    <chart:SfPolarChart.Series>
        <!-- Series 1 - Gets first palette color -->
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Tree"
                               Label="Tree"/>
        
        <!-- Series 2 - Gets second palette color -->
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Weed"
                               Label="Weed"/>
        
        <!-- Series 3 - Gets third palette color -->
        <chart:PolarLineSeries ItemsSource="{Binding PlantDetails}"
                               XBindingPath="Direction"
                               YBindingPath="Flower"
                               Label="Flower"/>
    </chart:SfPolarChart.Series>
</chart:SfPolarChart>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();
chart.GridLineType = PolarChartGridLineType.Polygon;

// Series will automatically use default palette colors
PolarLineSeries series1 = new PolarLineSeries
{
    XBindingPath = "Direction",
    YBindingPath = "Tree",
    ItemsSource = viewModel.PlantDetails
};

PolarLineSeries series2 = new PolarLineSeries
{
    XBindingPath = "Direction",
    YBindingPath = "Weed",
    ItemsSource = viewModel.PlantDetails
};

PolarLineSeries series3 = new PolarLineSeries
{
    XBindingPath = "Direction",
    YBindingPath = "Flower",
    ItemsSource = viewModel.PlantDetails
};

chart.Series.Add(series1);
chart.Series.Add(series2);
chart.Series.Add(series3);
```

### Default Colors

The default palette provides a set of colors that work well together for multi-series charts. Colors are assigned sequentially to each series.

## Custom Palette Brushes

Define your own color palette using the `PaletteBrushes` property.

### Basic Custom Palette

**XAML:**
```xml
<Grid>
    <Grid.Resources>
        <BrushCollection x:Key="customBrushes">
            <SolidColorBrush Color="#4dd0e1"/>
            <SolidColorBrush Color="#26c6da"/>
            <SolidColorBrush Color="#00bcd4"/>
            <SolidColorBrush Color="#00acc1"/>
            <SolidColorBrush Color="#0097a7"/>
            <SolidColorBrush Color="#00838f"/>
        </BrushCollection>
    </Grid.Resources>
    
    <chart:SfPolarChart PaletteBrushes="{StaticResource customBrushes}">
        <chart:SfPolarChart.Series>
            <!-- Series will use colors from custom palette -->
            <chart:PolarAreaSeries ItemsSource="{Binding Data}"
                                   XBindingPath="Category"
                                   YBindingPath="Value"/>
        </chart:SfPolarChart.Series>
    </chart:SfPolarChart>
</Grid>
```

**C# Code:**
```csharp
SfPolarChart chart = new SfPolarChart();

List<Brush> customBrushes = new List<Brush>();
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 77, 208, 225)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 38, 198, 218)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 188, 212)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 172, 193)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 151, 167)));
customBrushes.Add(new SolidColorBrush(Color.FromArgb(255, 0, 131, 143)));

chart.PaletteBrushes = customBrushes;
```

### Color Palette Examples

**Blue Palette:**
```xml
<BrushCollection x:Key="bluePalette">
    <SolidColorBrush Color="#E3F2FD"/>
    <SolidColorBrush Color="#90CAF9"/>
    <SolidColorBrush Color="#42A5F5"/>
    <SolidColorBrush Color="#1E88E5"/>
    <SolidColorBrush Color="#1565C0"/>
    <SolidColorBrush Color="#0D47A1"/>
</BrushCollection>
```

**Green Palette:**
```xml
<BrushCollection x:Key="greenPalette">
    <SolidColorBrush Color="#E8F5E9"/>
    <SolidColorBrush Color="#A5D6A7"/>
    <SolidColorBrush Color="#66BB6A"/>
    <SolidColorBrush Color="#4CAF50"/>
    <SolidColorBrush Color="#388E3C"/>
    <SolidColorBrush Color="#2E7D32"/>
</BrushCollection>
```

**Warm Palette:**
```xml
<BrushCollection x:Key="warmPalette">
    <SolidColorBrush Color="#FFE7C7"/>
    <SolidColorBrush Color="#FCB69F"/>
    <SolidColorBrush Color="#FF6F61"/>
    <SolidColorBrush Color="#FF5722"/>
    <SolidColorBrush Color="#E64A19"/>
    <SolidColorBrush Color="#D84315"/>
</BrushCollection>
```

**Cool Palette:**
```xml
<BrushCollection x:Key="coolPalette">
    <SolidColorBrush Color="#B2EBF2"/>
    <SolidColorBrush Color="#4DD0E1"/>
    <SolidColorBrush Color="#00BCD4"/>
    <SolidColorBrush Color="#0097A7"/>
    <SolidColorBrush Color="#00838F"/>
    <SolidColorBrush Color="#006064"/>
</BrushCollection>
```

**Professional Palette:**
```xml
<BrushCollection x:Key="professionalPalette">
    <SolidColorBrush Color="#2196F3"/>  <!-- Blue -->
    <SolidColorBrush Color="#4CAF50"/>  <!-- Green -->
    <SolidColorBrush Color="#FF9800"/>  <!-- Orange -->
    <SolidColorBrush Color="#9C27B0"/>  <!-- Purple -->
    <SolidColorBrush Color="#F44336"/>  <!-- Red -->
    <SolidColorBrush Color="#00BCD4"/>  <!-- Cyan -->
</BrushCollection>
```

### Palette Selection Tips

1. **For data visualization:**
   - Use distinct, easily distinguishable colors
   - Ensure sufficient contrast between colors
   - Consider colorblind-friendly palettes

2. **For presentations:**
   - Use professional, harmonious colors
   - Match your brand or theme colors
   - Limit to 3-5 colors for clarity

3. **For analysis:**
   - Use gradients from light to dark
   - Maintain logical color progression
   - Consider semantic colors (red = bad, green = good)

## Applying Gradients

Use gradients for more sophisticated and visually appealing charts.

### Chart-Wide Gradient Palette

Apply gradients to all series via `PaletteBrushes`:

**XAML:**
```xml
<Grid>
    <Grid.Resources>
        <BrushCollection x:Key="gradientPalette">
            <!-- Gradient 1: Peach -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#FFE7C7"/>
                <GradientStop Offset="0" Color="#FCB69F"/>
            </LinearGradientBrush>
            
            <!-- Gradient 2: Yellow -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#fadd7d"/>
                <GradientStop Offset="0" Color="#fccc2d"/>
            </LinearGradientBrush>
            
            <!-- Gradient 3: Green -->
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DCFA97"/>
                <GradientStop Offset="0" Color="#96E6A1"/>
            </LinearGradientBrush>
        </BrushCollection>
    </Grid.Resources>
    
    <chart:SfPolarChart PaletteBrushes="{StaticResource gradientPalette}">
        <!-- Series will use gradient colors -->
    </chart:SfPolarChart>
</Grid>
```

**C# Code:**
```csharp
List<Brush> gradientPalette = new List<Brush>();

// Gradient 1
LinearGradientBrush gradient1 = new LinearGradientBrush();
gradient1.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 255, 231, 199) });
gradient1.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 252, 182, 159) });

// Gradient 2
LinearGradientBrush gradient2 = new LinearGradientBrush();
gradient2.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 250, 221, 125) });
gradient2.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 252, 204, 45) });

// Gradient 3
LinearGradientBrush gradient3 = new LinearGradientBrush();
gradient3.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 220, 250, 151) });
gradient3.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 150, 230, 161) });

gradientPalette.Add(gradient1);
gradientPalette.Add(gradient2);
gradientPalette.Add(gradient3);

chart.PaletteBrushes = gradientPalette;
```

### LinearGradientBrush

Create linear gradients that transition from one color to another.

**Basic Linear Gradient:**
```xml
<LinearGradientBrush>
    <GradientStop Offset="0" Color="#1E88E5"/>  <!-- Start color -->
    <GradientStop Offset="1" Color="#E3F2FD"/>  <!-- End color -->
</LinearGradientBrush>
```

**Multiple Color Stops:**
```xml
<LinearGradientBrush>
    <GradientStop Offset="0" Color="#0D47A1"/>   <!-- Dark blue -->
    <GradientStop Offset="0.5" Color="#1976D2"/> <!-- Medium blue -->
    <GradientStop Offset="1" Color="#90CAF9"/>   <!-- Light blue -->
</LinearGradientBrush>
```

**Gradient Direction:**
```xml
<!-- Vertical gradient (default: bottom to top) -->
<LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
    <GradientStop Offset="0" Color="Blue"/>
    <GradientStop Offset="1" Color="LightBlue"/>
</LinearGradientBrush>

<!-- Horizontal gradient (left to right) -->
<LinearGradientBrush StartPoint="0,0" EndPoint="1,0">
    <GradientStop Offset="0" Color="Blue"/>
    <GradientStop Offset="1" Color="LightBlue"/>
</LinearGradientBrush>

<!-- Diagonal gradient -->
<LinearGradientBrush StartPoint="0,0" EndPoint="1,1">
    <GradientStop Offset="0" Color="Blue"/>
    <GradientStop Offset="1" Color="LightBlue"/>
</LinearGradientBrush>
```

### RadialGradientBrush

Create radial gradients that emanate from a center point.

**Basic Radial Gradient:**
```xml
<RadialGradientBrush>
    <GradientStop Offset="0" Color="#FFFFFF"/>  <!-- Center: White -->
    <GradientStop Offset="1" Color="#1E88E5"/>  <!-- Edge: Blue -->
</RadialGradientBrush>
```

**Off-Center Radial:**
```xml
<RadialGradientBrush Center="0.3,0.3" RadiusX="0.8" RadiusY="0.8">
    <GradientStop Offset="0" Color="Yellow"/>
    <GradientStop Offset="0.7" Color="Orange"/>
    <GradientStop Offset="1" Color="Red"/>
</RadialGradientBrush>
```

## Individual Series Styling

Override palette colors by setting the `Fill` property directly on a series.

### Basic Series Fill

**XAML:**
```xml
<chart:PolarAreaSeries ItemsSource="{Binding Data}"
                       XBindingPath="Category"
                       YBindingPath="Value"
                       Fill="#A8EAEE"
                       Stroke="#7BB0F9"
                       StrokeWidth="2"/>
```

**C# Code:**
```csharp
PolarAreaSeries series = new PolarAreaSeries
{
    ItemsSource = data,
    XBindingPath = "Category",
    YBindingPath = "Value",
    Fill = new SolidColorBrush(Color.FromArgb(255, 168, 234, 238)),
    Stroke = new SolidColorBrush(Color.FromArgb(255, 123, 176, 249)),
    StrokeWidth = 2
};
```

### Gradient Fill on Series

Apply gradients directly to individual series:

**XAML:**
```xml
<chart:PolarAreaSeries ItemsSource="{Binding PlantDetails}"
                       XBindingPath="Direction"
                       YBindingPath="Tree"
                       Label="Tree">
    <chart:PolarAreaSeries.Fill>
        <LinearGradientBrush>
            <GradientStop Offset="1" Color="#A8EAEE"/>
            <GradientStop Offset="0" Color="#7BB0F9"/>
        </LinearGradientBrush>
    </chart:PolarAreaSeries.Fill>
</chart:PolarAreaSeries>
```

**C# Code:**
```csharp
LinearGradientBrush gradientFill = new LinearGradientBrush();
gradientFill.GradientStops.Add(new GradientStop { Offset = 1, Color = Color.FromArgb(255, 168, 234, 238) });
gradientFill.GradientStops.Add(new GradientStop { Offset = 0, Color = Color.FromArgb(255, 123, 176, 249) });

PolarAreaSeries series = new PolarAreaSeries
{
    ItemsSource = viewModel.PlantDetails,
    XBindingPath = "Direction",
    YBindingPath = "Tree",
    Fill = gradientFill
};
```

### Stroke Customization

Customize the outline of series:

**XAML:**
```xml
<!-- Solid stroke -->
<chart:PolarAreaSeries Fill="#8000BCD4"
                       Stroke="#00BCD4"
                       StrokeWidth="3"/>

<!-- Dashed stroke -->
<chart:PolarLineSeries Stroke="Red"
                       StrokeWidth="2"
                       StrokeDashArray="5,3"/>

<!-- No stroke -->
<chart:PolarAreaSeries Fill="#FF6347"
                       Stroke="Transparent"/>
```

### Opacity

Control transparency:

```xml
<!-- Semi-transparent series -->
<chart:PolarAreaSeries Fill="Blue"/>

<!-- Using alpha channel in color -->
<chart:PolarAreaSeries Fill="#80FF6347"/>  <!-- 50% transparent -->
```

## Theme Integration

Syncfusion WinUI controls automatically adapt to the application theme.

### Respecting System Theme

Charts inherit theme colors from the application:

**App.xaml:**
```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <!-- WinUI theme resources -->
            <XamlControlsResources xmlns="using:Microsoft.UI.Xaml.Controls"/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

### Custom Theme Colors

Define theme-aware colors:

```xml
<Application.Resources>
    <ResourceDictionary>
        <SolidColorBrush x:Key="ChartPrimaryBrush" Color="#2196F3"/>
        <SolidColorBrush x:Key="ChartSecondaryBrush" Color="#4CAF50"/>
        <SolidColorBrush x:Key="ChartAccentBrush" Color="#FF9800"/>
    </ResourceDictionary>
</Application.Resources>
```

Use in charts:

```xml
<chart:PolarAreaSeries Fill="{StaticResource ChartPrimaryBrush}"/>
```

## Best Practices

### Color Selection

1. **Ensure Sufficient Contrast:**
   ```xml
   <!-- Good: Clear distinction -->
   <chart:PolarAreaSeries Fill="#2196F3"/>  <!-- Blue -->
   <chart:PolarAreaSeries Fill="#F44336"/>  <!-- Red -->
   
   <!-- Poor: Similar colors -->
   <chart:PolarAreaSeries Fill="#2196F3"/>  <!-- Blue -->
   <chart:PolarAreaSeries Fill="#1976D2"/>  <!-- Darker blue -->
   ```

2. **Consider Colorblind Users:**
   - Avoid red-green combinations alone
   - Use additional visual cues (patterns, labels)
   - Test with colorblind simulation tools

3. **Limit Color Count:**
   - Use 3-5 colors for clarity
   - More colors = harder to distinguish
   - Consider grouping data if you need many colors

### Gradient Usage

1. **Don't Overuse Gradients:**
   - One or two gradient series maximum
   - Mix gradients with solid colors for balance

2. **Choose Appropriate Gradient Direction:**
   ```xml
   <!-- For polar charts, radial gradients often work well -->
   <RadialGradientBrush>
       <GradientStop Offset="0" Color="White"/>
       <GradientStop Offset="1" Color="Blue"/>
   </RadialGradientBrush>
   ```

3. **Maintain Readability:**
   - Ensure text/labels remain visible
   - Test gradients with different data ranges

### Performance

1. **Solid Colors Perform Best:**
   - Use solid colors when possible
   - Gradients add rendering complexity

2. **Reuse Brushes:**
   ```csharp
   // Good: Reuse brush
   SolidColorBrush blueBrush = new SolidColorBrush(Colors.Blue);
   series1.Fill = blueBrush;
   series2.Stroke = blueBrush;
   
   // Less efficient: Create new brushes
   series1.Fill = new SolidColorBrush(Colors.Blue);
   series2.Stroke = new SolidColorBrush(Colors.Blue);
   ```

### Accessibility

1. **Don't Rely on Color Alone:**
   - Use labels, patterns, or shapes
   - Provide text alternatives

2. **Test in Different Modes:**
   - Light theme
   - Dark theme
   - High contrast mode

## Complete Example

Here's a comprehensive styling example:

```xml
<Grid>
    <Grid.Resources>
        <!-- Custom gradient palette -->
        <BrushCollection x:Key="customGradients">
            <LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
                <GradientStop Offset="0" Color="#1E88E5"/>
                <GradientStop Offset="1" Color="#90CAF9"/>
            </LinearGradientBrush>
            <LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
                <GradientStop Offset="0" Color="#43A047"/>
                <GradientStop Offset="1" Color="#A5D6A7"/>
            </LinearGradientBrush>
            <LinearGradientBrush StartPoint="0,0" EndPoint="0,1">
                <GradientStop Offset="0" Color="#FB8C00"/>
                <GradientStop Offset="1" Color="#FFB74D"/>
            </LinearGradientBrush>
        </BrushCollection>
    </Grid.Resources>
    
    <chart:SfPolarChart Header="Styled Polar Chart"
                        GridLineType="Polygon"
                        PaletteBrushes="{StaticResource customGradients}">
        
        <chart:SfPolarChart.PrimaryAxis>
            <chart:CategoryAxis/>
        </chart:SfPolarChart.PrimaryAxis>
        
        <chart:SfPolarChart.SecondaryAxis>
            <chart:NumericalAxis/>
        </chart:SfPolarChart.SecondaryAxis>
        
        <chart:SfPolarChart.Legend>
            <chart:ChartLegend/>
        </chart:SfPolarChart.Legend>
        
        <chart:SfPolarChart.Series>
            <!-- Series 1: Uses first gradient from palette -->
            <chart:PolarAreaSeries ItemsSource="{Binding Data1}"
                                   XBindingPath="Category"
                                   YBindingPath="Value"
                                   Label="Product A"/>
            
            <!-- Series 2: Uses second gradient from palette -->
            <chart:PolarLineSeries ItemsSource="{Binding Data2}"
                                   XBindingPath="Category"
                                   YBindingPath="Value"
                                   Label="Product B"
                                   StrokeWidth="3"/>
            
            <!-- Series 3: Custom override with solid color -->
            <chart:PolarAreaSeries ItemsSource="{Binding Data3}"
                                   XBindingPath="Category"
                                   YBindingPath="Value"
                                   Label="Product C"
                                   Fill="#80E91E63"
                                   Stroke="#E91E63"
                                   StrokeWidth="2"/>
        </chart:SfPolarChart.Series>
        
    </chart:SfPolarChart>
</Grid>
```

## Summary

**Key Points:**
- **Default Palette:** Automatic, built-in colors
- **Custom Palettes:** Define `PaletteBrushes` with your own colors
- **Gradients:** Use LinearGradientBrush or RadialGradientBrush
- **Series Fill:** Override palette with individual `Fill` property
- **Best Practices:** Ensure contrast, limit colors, consider accessibility

Experiment with different color schemes to create visually appealing and effective polar charts!
