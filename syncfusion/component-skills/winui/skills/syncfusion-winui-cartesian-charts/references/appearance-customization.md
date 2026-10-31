# Appearance

The appearance of the `SfCartesianChart` can be customized using predefined brushes, custom brushes, and gradients to enrich your WinUI application.

## Table of Contents
- [Predefined PaletteBrushes](#predefined-palettebrushes)
- [Custom PaletteBrushes for Chart](#custom-palettebrushes-for-chart)
- [PaletteBrushes for Series](#palettebrushes-for-series)
- [Applying Gradient](#applying-gradient)
- [Additional Appearance Features](#additional-appearance-features)
- [Best Practices](#best-practices)
- [Related Resources](#related-resources)

## Predefined PaletteBrushes

By default, `SfCartesianChart` applies a set of predefined brushes to the series in a predefined order. Currently, the chart supports **only one predefined palette**, which is the default palette for `SfCartesianChart`.

### Default Palette Example

**XAML:**
```xml
<chart:SfCartesianChart x:Name="chart">
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding Data1}"
                       XBindingPath="Category"
                       YBindingPath="Value"/>
    
    <chart:ColumnSeries ItemsSource="{Binding Data2}"
                       XBindingPath="Category"
                       YBindingPath="Value"/>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

ColumnSeries series1 = new ColumnSeries()
{
    ItemsSource = viewModel.Data1,
    XBindingPath = "Category",
    YBindingPath = "Value"
};

ColumnSeries series2 = new ColumnSeries()
{
    ItemsSource = viewModel.Data2,
    XBindingPath = "Category",
    YBindingPath = "Value"
};

chart.Series.Add(series1);
chart.Series.Add(series2);
```

> **Note:** The default palette is automatically applied to multiple series in a predefined order without any explicit configuration.

---

## Custom PaletteBrushes for Chart

`SfCartesianChart` provides the `PaletteBrushes` property at the chart level to define custom brushes with a preferred order. This palette will be applied to all series in the chart.

### Basic Custom Palette at Chart Level

**XAML:**
```xml
<chart:SfCartesianChart x:Name="chart" PaletteBrushes="{Binding CustomBrushes}">
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>
    
    <chart:ColumnSeries ItemsSource="{Binding Data1}"
                       XBindingPath="Category"
                       YBindingPath="Value"/>
    
    <chart:ColumnSeries ItemsSource="{Binding Data2}"
                       XBindingPath="Category"
                       YBindingPath="Value"/>
</chart:SfCartesianChart>
```

**C#:**
```csharp
public class ViewModel
{
    public List<Brush> CustomBrushes { get; set; }
    
    public ViewModel()
    {
        CustomBrushes = new List<Brush>()
        {
            new SolidColorBrush(ColorHelper.FromArgb(255, 38, 198, 218)),
            new SolidColorBrush(ColorHelper.FromArgb(255, 0, 188, 212)),
            new SolidColorBrush(ColorHelper.FromArgb(255, 0, 172, 193)),
            new SolidColorBrush(ColorHelper.FromArgb(255, 0, 151, 167))
        };
    }
}
```

**How it works:** The palette brushes defined at the chart level are applied to all series sequentially. Each series gets the next color from the palette.

---

## PaletteBrushes for Series

Cartesian chart provides support to set the palette at the **series level**, which applies predefined brushes to individual segments within that series.

### Custom Palette at Series Level

**XAML:**
```xml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <BrushCollection x:Key="customBrushes">
            <SolidColorBrush Color="#26c6da"/>
            <SolidColorBrush Color="#00bcd4"/>
            <SolidColorBrush Color="#00acc1"/>
            <SolidColorBrush Color="#0097a7"/>
            <SolidColorBrush Color="#00838f"/>
        </BrushCollection>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>

    <chart:SfCartesianChart.Series>
        <chart:ColumnSeries ItemsSource="{Binding Data}"  
                            XBindingPath="Demand" 
                            YBindingPath="Year2010" 
                            PaletteBrushes="{StaticResource customBrushes}"/>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

ColumnSeries series = new ColumnSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Demand",
    YBindingPath = "Year2010"
};

series.PaletteBrushes = new List<Brush>()
{
    new SolidColorBrush(ColorHelper.FromArgb(255, 38, 198, 218)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 188, 212)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 172, 193)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 151, 167)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 131, 143))
};

chart.Series.Add(series);
```

**Difference from chart-level palette:** When `PaletteBrushes` is set at the series level, each **data point (segment)** within that series gets a different color from the palette, creating a multi-colored series.

---

## Applying Gradient

Gradients can be applied to chart series using the `PaletteBrushes` property with `LinearGradientBrush` or `RadialGradientBrush`.

### Linear Gradient Example

**XAML:**
```xml
<chart:SfCartesianChart>
    <chart:SfCartesianChart.Resources>
        <BrushCollection x:Key="customBrushes">
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#FFE7C7" />
                <GradientStop Offset="0" Color="#FCB69F" />
            </LinearGradientBrush>
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#fadd7d" />
                <GradientStop Offset="0" Color="#fccc2d" />
            </LinearGradientBrush>
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DCFA97" />
                <GradientStop Offset="0" Color="#96E6A1" />
            </LinearGradientBrush>
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#DDD6F3" />
                <GradientStop Offset="0" Color="#FAACA8" />
            </LinearGradientBrush>
            <LinearGradientBrush>
                <GradientStop Offset="1" Color="#A8EAEE" />
                <GradientStop Offset="0" Color="#7BB0F9" />
            </LinearGradientBrush>
        </BrushCollection>
    </chart:SfCartesianChart.Resources>
    
    <chart:SfCartesianChart.XAxes>
        <chart:CategoryAxis/>
    </chart:SfCartesianChart.XAxes>
    
    <chart:SfCartesianChart.YAxes>
        <chart:NumericalAxis/>
    </chart:SfCartesianChart.YAxes>

    <chart:SfCartesianChart.Series>
        <chart:ColumnSeries ItemsSource="{Binding Data}"  
                            XBindingPath="Demand" 
                            YBindingPath="Year2010" 
                            PaletteBrushes="{StaticResource customBrushes}"/>
    </chart:SfCartesianChart.Series>
</chart:SfCartesianChart>
```

**C#:**
```csharp
SfCartesianChart chart = new SfCartesianChart();

// Create gradient brushes
LinearGradientBrush gradient1 = new LinearGradientBrush()
{
    StartPoint = new Point(0, 0),
    EndPoint = new Point(0, 1)
};
gradient1.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 255, 231, 199), Offset = 1 });
gradient1.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 252, 182, 159), Offset = 0 });

LinearGradientBrush gradient2 = new LinearGradientBrush()
{
    StartPoint = new Point(0, 0),
    EndPoint = new Point(0, 1)
};
gradient2.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 250, 221, 125), Offset = 1 });
gradient2.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 252, 204, 45), Offset = 0 });

ColumnSeries series = new ColumnSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Demand",
    YBindingPath = "Year2010",
    PaletteBrushes = new List<Brush>() { gradient1, gradient2 }
};

CategoryAxis xAxis = new CategoryAxis();
chart.XAxes.Add(xAxis);

NumericalAxis yAxis = new NumericalAxis();
chart.YAxes.Add(yAxis);

chart.Series.Add(series);
```

**Effect:** Each segment/data point in the series gets a gradient fill, creating visually appealing and dimensional appearance.

---

## Additional Appearance Features

While the official docs focus on palette brushes and gradients, `SfCartesianChart` supports additional appearance customizations:

### Chart Header

Add titles using the `Header` property:

**XAML:**
```xml
<chart:SfCartesianChart Header="Sales Performance">
    <!-- Chart content -->
</chart:SfCartesianChart>
```

### Chart Background

Customize the overall chart background:

**XAML:**
```xml
<chart:SfCartesianChart Background="WhiteSmoke">
    <!-- Chart content -->
</chart:SfCartesianChart>
```

### Series-Specific Styling

Individual series can have explicit `Fill`, `Stroke`, and other styling properties:

**XAML:**
```xml
<chart:ColumnSeries ItemsSource="{Binding Data}"
                   XBindingPath="Category"
                   YBindingPath="Value"
                   Fill="RoyalBlue"
                   Stroke="DarkBlue"
                   StrokeWidth="2"/>
```

> **Note:** Explicit `Fill` property on a series will override palette brushes.

---

## Best Practices

### Color Selection

1. **Chart-level vs Series-level palettes**:
   - Use chart-level `PaletteBrushes` when you have multiple series and want each series to have a distinct color
   - Use series-level `PaletteBrushes` when you want multi-colored segments within a single series

2. **Contrast and accessibility**:
   - Ensure sufficient contrast between colors
   - Test with color-blind friendly palettes
   - Avoid relying solely on color to convey information

3. **Consistency**:
   - Use the same palette across related charts in your application
   - Align colors with your brand guidelines

### Gradients

1. **Performance considerations**:
   - Be cautious with gradients on large datasets (many data points)
   - Complex gradients can impact rendering performance

2. **Visual clarity**:
   - Use subtle gradients to avoid overwhelming the data visualization
   - Ensure gradients don't reduce readability of data labels

3. **Direction**:
   - Keep gradient direction consistent across similar charts
   - Vertical gradients (top to bottom) work well for column/bar charts

### General Guidelines

- **Default first**: Try the predefined default palette before creating custom palettes
- **Limit colors**: 5-8 colors in a palette typically provide optimal differentiation
- **Test rendering**: Preview your charts with actual data to ensure colors work well together
- **Theme support**: Consider providing light and dark theme color variations

---
