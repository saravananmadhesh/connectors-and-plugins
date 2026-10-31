# Appearance Customization

## Table of Contents
- [Chart Dimensions](#chart-dimensions)
  - [Responsive Chart](#responsive-chart)
  - [Percentage-Based](#percentage-based)
- [Background and Border](#background-and-border)
  - [Chart Area Customization](#chart-area-customization)
- [Themes](#themes)
  - [Theme Stylesheet](#theme-stylesheet)
- [Colors and Palettes](#colors-and-palettes)
  - [Single Series Color](#single-series-color)
  - [Custom Palette](#custom-palette)
  - [Point Colors](#point-colors)
- [Gradients](#gradients)
  - [Multiple Gradient Series](#multiple-gradient-series)
- [Chart Title](#chart-title)
- [Animation](#animation)
  - [Disable Animation](#disable-animation)
- [Common Styling Patterns](#common-styling-patterns)
  - [Modern Minimalist](#modern-minimalist)
  - [Dark Theme](#dark-theme)
  - [Corporate Style](#corporate-style)
- [Print and Export Styling](#print-and-export-styling)
- [Troubleshooting](#troubleshooting)
  - [Theme not applied](#theme-not-applied)
  - [Colors not showing](#colors-not-showing)
  - [Gradients not rendering](#gradients-not-rendering)
- [Best Practices](#best-practices)
- [API Reference](#api-reference)

## Chart Dimensions

Set chart size explicitly or make it responsive.

```cshtml
@Html.EJS().Chart("sizedChart").Width("800").Height("400").Series(series => series.Add()
    ).Render()
```

### Responsive Chart

```cshtml
.Width("100%")
.Height("400")
```

### Percentage-Based

```cshtml
.Width("90%")
.Height("70%")
```

## Background and Border

Customize chart container appearance.

```cshtml
@Html.EJS().Chart("styledChart").Background("rgba(255, 255, 255, 0.95)").Border(border => border
        .Width(2)
        .Color("#1E88E5")
    ).Margin(margin => margin
        .Left(20)
        .Right(20)
        .Top(20)
        .Bottom(20)
    ).Series(series => series.Add()).Render()
```

### Chart Area Customization

```cshtml
.ChartArea(area => area
    .Background("transparent")
    .Border(b => b.Width(1).Color("#E0E0E0"))
    .Opacity(1))
```

## Themes

Apply built-in themes for consistent styling.

```cshtml
@Html.EJS().Chart("themedChart").Theme(Syncfusion.EJ2.Charts.ChartTheme.Material).Series(series => series.Add()).Render()
```

**Available themes:**
- `Material` - Google Material Design
- `Bootstrap` - Bootstrap 4
- `Bootstrap5` - Bootstrap 5 (recommended)
- `Fabric` - Microsoft Office Fabric
- `Fluent` - Microsoft Fluent Design
- `Tailwind` - Tailwind CSS
- `MaterialDark` - Material dark mode
- `Bootstrap5Dark` - Bootstrap 5 dark
- `FabricDark` - Fabric dark
- `FluentDark` - Fluent dark
- `TailwindDark` - Tailwind dark

### Theme Stylesheet

Include theme CSS in layout:

```html
<head>
    <link href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/bootstrap5.css" rel="stylesheet" />
</head>
```

## Colors and Palettes

Customize series colors.

### Single Series Color

```cshtml
.Series(series =>
{
    series.Fill("#1E88E5")
          .Opacity(0.9)
          .Add();
})
```

### Custom Palette

```cshtml
@Html.EJS().Chart("paletteChart").Palettes(new string[] { "#E94649", "#F6B53F", "#6FAAB0", "#C4C24A", "#62C287" }).Series(series =>
    {
        series.Name("Product A").Add();
        series.Name("Product B").Add();
        series.Name("Product C").Add();
    }).Render()
```

### Point Colors

Color individual points:

```cshtml
@{
    var coloredData = new[] {
        new { X = "Jan", Y = 35, Color = "#FF0000" },
        new { X = "Feb", Y = 28, Color = "#00FF00" },
        new { X = "Mar", Y = 34, Color = "#0000FF" }
    };
}

.Series(series =>
{
    series.DataSource(coloredData)
          .PointColorMapping("Color")
          .Add();
})
```

## Gradients

Apply gradient fills to series.

```cshtml
@{
    var linearGradient = new Syncfusion.EJ2.Charts.ChartLinearGradient
    {
        X1 = 0,
        Y1 = 0,
        X2 = 0,
        Y2 = 1,
        GradientColorStop = new List<Syncfusion.EJ2.Charts.ChartGradientColorStop>
        {
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#4F46E5", Offset = 0,   Opacity = 1,    Lighten = 0, Brighten = 0   },
            new Syncfusion.EJ2.Charts.ChartGradientColorStop { Color = "#22D3EE", Offset = 100, Opacity = 0.95, Lighten = 0, Brighten = 0.9 }
        }
    };
}

@(Html.EJS().Chart("container")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .XName("Month")
              .YName("Amount")
              .Name("Sales")
              .LinearGradient(linearGradient)
              .Marker(mr => mr.Visible(true).IsFilled(true)
                  .DataLabel(dl => dl.Visible(true))
              )
              .DataSource(ViewBag.dataSource).Add();
    }
    ).PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py.LabelFormat("${value}k")
    ).Tooltip(tp => tp.Enable(true)
    ).LegendSettings(leg => leg.Visible(true)
    ).Title("Monthly Sales Performance").Render()
)
```

## Chart Title

Add and style chart title.

```cshtml
@Html.EJS().Chart("titledChart").Title("Monthly Sales Analysis").TitleStyle(style => style
        .FontFamily("Arial")
        .Size("18px")
        .FontWeight("600")
        .Color("#333")
        .TextAlignment(Syncfusion.EJ2.Charts.Alignment.Center)
    ).SubTitle("Q1 2024 Performance").SubTitleStyle(style => style
        .FontFamily("Arial")
        .Size("14px")
        .Color("#666")
    ).Series(series => series.Add()
    ).Render()
```

## Animation

Control chart animations.

```cshtml
@Html.EJS().Chart("animatedChart").Series(series =>
    {
        series.Animation(anim => anim
            .Enable(true)
            .Duration(1500)
            .Delay(100))
              .Add();
    }).Render()
```

### Disable Animation

```cshtml
.Series(series =>
{
    series.Animation(anim => anim.Enable(false)
    ).Add();
})
```

## Common Styling Patterns

### Modern Minimalist

```cshtml
@Html.EJS().Chart("minimalist").Background("#FAFAFA")
    .Border(b => b.Width(0)
    ).PrimaryXAxis(px => px
        .LineStyle(ls => ls.Width(0))
        .MajorTickLines(mtl => mtl.Width(0))
        .MajorGridLines(mgl => mgl.Width(0))
    ).PrimaryYAxis(py => py
        .LineStyle(ls => ls.Width(0))
        .MajorTickLines(mtl => mtl.Width(0))
        .MajorGridLines(mgl => mgl.Width(1).Color("#E0E0E0"))
    ).Series(series =>
    {
        series.Fill("#1E88E5")
              .CornerRadius(cr => cr.TopLeft(5).TopRight(5))
              .Add();
    }).Render()
```

### Dark Theme

```cshtml
@Html.EJS().Chart("darkChart").Theme(Syncfusion.EJ2.Charts.ChartTheme.MaterialDark).Background("#212121").PrimaryXAxis(px => px
        .LabelStyle(ls => ls.Color("#E0E0E0"))
        .MajorGridLines(mgl => mgl.Color("#424242"))
    ).PrimaryYAxis(py => py
        .LabelStyle(ls => ls.Color("#E0E0E0"))
        .MajorGridLines(mgl => mgl.Color("#424242"))
    ).Series(series =>
    {
        series.Fill("#64B5F6")
              .Add();
    }).Render()
```

### Corporate Style

```cshtml
@Html.EJS().Chart("corporate").Background("#FFFFFF").Border(b => b.Width(1).Color("#D0D0D0")
    ).Margin(m => m.Left(40).Right(40).Top(40).Bottom(40)
    ).Title("Sales Performance Report")
    .TitleStyle(ts => ts
        .Size("20px")
        .FontWeight("bold")
        .Color("#333")
        .FontFamily("Segoe UI")
    ).Palettes(new string[] { "#004E8B", "#00A3E0", "#66C2A5", "#FC8D62" }
    ).Series(series => series.Add()).Render()
```

## Print and Export Styling

Optimize for print/export:

```cshtml
@Html.EJS().Chart("printChart")
    .Background("#FFFFFF")
    .BeforePrint("beforePrint")
    .Series(series => series.Add())
    .Render()

<script>
    function beforePrint(args) {
        args.chart.background = '#FFFFFF';
        args.chart.border.width = 1;
        args.chart.border.color = '#000000';
    }
</script>
```

## Troubleshooting

### Theme not applied
- Include correct theme CSS in layout
- Check Theme property matches CSS file
- Verify CSS version matches script version

### Colors not showing
- Check Fill property is set correctly
- Verify hex color format (#RRGGBB)
- Check opacity isn't set to 0

### Gradients not rendering
- Ensure SVG defs are included
- Check gradient ID matches fill URL
- Verify linearGradient coordinates

## Best Practices

1. **Consistency**: Use consistent color palette
2. **Contrast**: Ensure sufficient contrast for readability
3. **Themes**: Use built-in themes for professional look
4. **Responsive**: Test on different screen sizes
5. **Print**: Consider print appearance for reports
6. **Accessibility**: Use high-contrast colors

## API Reference

https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html
