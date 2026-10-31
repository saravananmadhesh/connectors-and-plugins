# Appearance

The appearance of the `SfCircularChart` can be customized using predefined palettes, custom palettes, and gradients to enrich your WinUI application.

---

## Table of Contents
- [Predefined PaletteBrushes](#predefined-palettebrushes)
- [Custom PaletteBrushes](#custom-palettebrushes)
- [Applying Gradient](#applying-gradient)
- [Related Resources](#related-resources)

---

## Predefined PaletteBrushes

The `SfCircularChart` provides **one default predefined palette** that is automatically applied to circular series (PieSeries, DoughnutSeries). This is the default appearance without any explicit customization.

### Default Palette Example

**XAML:**
```xml
<chart:PieSeries ItemsSource="{Binding Data}" 
                 XBindingPath="Product" 
                 YBindingPath="SalesRate">
</chart:PieSeries>
```

**C#:**
```csharp
PieSeries series = new PieSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Product",
    YBindingPath = "SalesRate"
};
chart.Series.Add(series);
```

> **Note:** The WinUI circular chart currently supports only one predefined palette (the default). This is automatically applied to series without additional configuration.

---

## Custom PaletteBrushes

You can define custom color schemes using the `PaletteBrushes` property on the series. This property accepts a collection of `Brush` objects that will be applied to data points in order.

### Basic Custom Palette

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
        <BrushCollection x:Key="customBrushes">
            <SolidColorBrush Color="#4dd0e1"/>
            <SolidColorBrush Color="#26c6da"/>
            <SolidColorBrush Color="#00bcd4"/>
            <SolidColorBrush Color="#00acc1"/>
            <SolidColorBrush Color="#0097a7"/>
            <SolidColorBrush Color="#00838f"/>
        </BrushCollection>
    </chart:SfCircularChart.Resources>

    <chart:PieSeries ItemsSource="{Binding Data}" 
                     XBindingPath="Product" 
                     YBindingPath="SalesRate"
                     PaletteBrushes="{StaticResource customBrushes}" />
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

PieSeries series = new PieSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Product",
    YBindingPath = "SalesRate"
};

series.PaletteBrushes = new List<Brush>()
{
    new SolidColorBrush(ColorHelper.FromArgb(255, 77, 208, 225)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 38, 198, 218)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 188, 212)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 172, 193)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 151, 167)),
    new SolidColorBrush(ColorHelper.FromArgb(255, 0, 131, 143))
};

chart.Series.Add(series);
```

**How it works:** The chart cycles through the custom brushes in the collection, assigning each brush to successive data points.

---

## Applying Gradient

Gradients can be applied to circular chart segments using `LinearGradientBrush` or `RadialGradientBrush` in the `PaletteBrushes` collection.

### Linear Gradient Example

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
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
    </chart:SfCircularChart.Resources>

    <chart:PieSeries ItemsSource="{Binding Data}" 
                     XBindingPath="Product" 
                     YBindingPath="SalesRate"
                     PaletteBrushes="{StaticResource customBrushes}" />
</chart:SfCircularChart>
```

**C#:**
```csharp
SfCircularChart chart = new SfCircularChart();

// Create gradient brushes
LinearGradientBrush gradient1 = new LinearGradientBrush()
{
    StartPoint = new Point(0, 0),
    EndPoint = new Point(1, 1)
};
gradient1.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 255, 231, 199), Offset = 1 });
gradient1.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 252, 182, 159), Offset = 0 });

LinearGradientBrush gradient2 = new LinearGradientBrush()
{
    StartPoint = new Point(0, 0),
    EndPoint = new Point(1, 1)
};
gradient2.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 250, 221, 125), Offset = 1 });
gradient2.GradientStops.Add(new GradientStop() { Color = ColorHelper.FromArgb(255, 252, 204, 45), Offset = 0 });

PieSeries series = new PieSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Product",
    YBindingPath = "SalesRate",
    PaletteBrushes = new List<Brush>() { gradient1, gradient2 }
};

chart.Series.Add(series);
```

### Radial Gradient Example

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:SfCircularChart.Resources>
        <BrushCollection x:Key="radialGradients">
            <RadialGradientBrush>
                <GradientStop Color="#ffcc00" Offset="0"/>
                <GradientStop Color="#ff6600" Offset="1"/>
            </RadialGradientBrush>
            <RadialGradientBrush>
                <GradientStop Color="#00ccff" Offset="0"/>
                <GradientStop Color="#0066cc" Offset="1"/>
            </RadialGradientBrush>
            <RadialGradientBrush>
                <GradientStop Color="#66ff66" Offset="0"/>
                <GradientStop Color="#009900" Offset="1"/>
            </RadialGradientBrush>
        </BrushCollection>
    </chart:SfCircularChart.Resources>

    <chart:DoughnutSeries ItemsSource="{Binding Data}"
                          XBindingPath="Label"
                          YBindingPath="Value"
                          PaletteBrushes="{StaticResource radialGradients}"/>
</chart:SfCircularChart>
```

**Effect:** Radial gradients create depth and dimension in chart segments, giving a 3D-like appearance.

---

## Additional Customizations

### Stroke Customization

Customize segment borders using the `Stroke` and `StrokeWidth` properties.

**XAML:**
```xml
<chart:SfCircularChart>
    <chart:PieSeries ItemsSource="{Binding Data}"
                     XBindingPath="Category"
                     YBindingPath="Value"
                     Stroke="White"
                     StrokeWidth="2"/>
</chart:SfCircularChart>
```

**C#:**
```csharp
PieSeries series = new PieSeries()
{
    ItemsSource = viewModel.Data,
    XBindingPath = "Category",
    YBindingPath = "Value",
    Stroke = new SolidColorBrush(Colors.White),
    StrokeWidth = 2
};
```

---