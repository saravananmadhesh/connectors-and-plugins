# Chart Title, Subtitle, and Customization

## Table of Contents
- [Title Overview](#title-overview)
- [Adding Title and Subtitle](#adding-title-and-subtitle)
- [Title Styling](#title-styling)
- [Appearance Customization](#appearance-customization)
- [Theme Options](#theme-options)
- [Responsive Design](#responsive-design)
- [Complete Examples](#complete-examples)

## Title Overview

Chart titles and subtitles provide context and explanation for visualized data. They:

- Communicate the chart's purpose
- Enhance data interpretation
- Support multi-chart dashboards
- Improve accessibility
- Provide professional presentation

## Adding Title and Subtitle

### Basic Title

Add a title to your chart:

```csharp
@Html.EJS().CircularChart3D("container")
    .Title("Sales by Region")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Add Subtitle

Provide additional context:

```csharp
.Title("Sales by Region")
.SubTitle("2024 Annual Performance")
```

### Title Positioning

Control title placement:

```csharp
@Html.EJS().CircularChart3D("container")
    .Title("Sales by Region")
    .TitleStyle(style =>
    {
        style.Alignment(Syncfusion.EJ2.Charts.Alignment.Center);  // Center (default)
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

**Alignment Options:**
- `Alignment.Center` - Center alignment (default)
- `Alignment.Near` - Left alignment
- `Alignment.Far` - Right alignment

## Title Styling

### Font Customization

Control title appearance:

```csharp
.TitleStyle(style =>
{
    style.FontFamily("Segoe UI");
    style.FontSize("18px");
    style.FontWeight("bold");
    style.Color("#0078d4");
})
```

### Subtitle Styling

Customize subtitle independently:

```csharp
.SubTitleStyle(style =>
{
    style.FontFamily("Segoe UI");
    style.FontSize("12px");
    style.FontWeight("normal");
    style.Color("#666666");
})
```

### Title with Border

Add emphasis with borders:

```csharp
.TitleStyle(style =>
{
    style.FontSize("16px");
    style.Color("#0078d4");
})
.Border(border =>
{
    border.Color("#0078d4");
    border.Width(2);
    border.Type(Syncfusion.EJ2.Charts.BorderType.Rectangle);
})
```

### Title Margins

Control spacing around title:

```csharp
.TitleStyle(style =>
{
    style.FontSize("18px");
})
.MarginBottom(20)
.MarginTop(10)
```

### Complete Title Styling Example

```csharp
.Title("Revenue Analysis")
.SubTitle("Q1 2024 Financial Review")
.TitleStyle(style =>
{
    style.FontFamily("Arial");
    style.FontSize("20px");
    style.FontWeight("bold");
    style.Color("#1a1a1a");
})
.SubTitleStyle(style =>
{
    style.FontFamily("Arial");
    style.FontSize("13px");
    style.Color("#666666");
    style.FontWeight("normal");
})
```

## Appearance Customization

### Background Color

Set chart background:

```csharp
@Html.EJS().CircularChart3D("container")
    .Background("#ffffff")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Border Configuration

Add chart border:

```csharp
.Border(border =>
{
    border.Color("#cccccc");
    border.Width(2);
})
```

### Chart Area Customization

Control interior appearance:

```csharp
.ChartArea(area =>
{
    area.Background("#f9f9f9");
    area.Border(border =>
    {
        border.Color("#e0e0e0");
        border.Width(1);
    });
})
```

### Shadow and 3D Effects

Enhance visual depth:

```csharp
@Html.EJS().CircularChart3D("container")
    .ShadowColor("rgba(0, 0, 0, 0.2)")
    .TiltAngle(30)  // 3D perspective
    .RotationAngle(0)
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

## Theme Options

### Available Themes

Apply predefined themes:

```csharp
@Html.EJS().CircularChart3D("container")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Bootstrap)  // Bootstrap theme
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

**Theme Options:**
- `ChartTheme.Bootstrap` - Bootstrap design
- `ChartTheme.Bootstrap4` - Bootstrap 4 design
- `ChartTheme.Bootstrap5` - Bootstrap 5 design
- `ChartTheme.Fabric` - Microsoft Fabric design
- `ChartTheme.HighContrast` - High contrast for accessibility
- `ChartTheme.Material` - Material Design
- `ChartTheme.MaterialDark` - Material Dark
- `ChartTheme.Tailwind` - Tailwind CSS design
- `ChartTheme.TailwindDark` - Tailwind Dark

### Dark Theme Example

```csharp
@Html.EJS().CircularChart3D("container")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.MaterialDark)
    .Title("Sales Dashboard")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Custom Color Palette

Override theme colors:

```csharp
var customColors = new List<string> { "#0078d4", "#107c10", "#ff8c00", "#a239ca", "#ffc70f" };

@Html.EJS().CircularChart3D("container")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Bootstrap)
    .Palettes(customColors)  // Custom color palette
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

## Responsive Design

### Responsive Sizing

Create responsive charts:

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("100%")          // Full container width
    .Height("400px")        // Fixed height
    .Title("Responsive Chart")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Media Query Integration

Adapt to different screen sizes:

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("100%")
    .Height("@(ViewBag.IsMobile ? "300px" : "500px")")
    .Title("Responsive Dashboard")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Print Optimization

Set print dimensions:

```csharp
@Html.EJS().CircularChart3D("container")
    .PrintSettings(print =>
    {
        print.Width("800px");
        print.Height("600px");
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Value")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

## Complete Examples

### Example 1: Professional Dashboard Title

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("100%")
    .Height("450px")
    .Title("Q1 2024 Revenue Distribution")
    .SubTitle("By Product Category | Total: $2.5M")
    .TitleStyle(style =>
    {
        style.FontFamily("Segoe UI");
        style.FontSize("20px");
        style.FontWeight("bold");
        style.Color("#1a1a1a");
    })
    .SubTitleStyle(style =>
    {
        style.FontFamily("Segoe UI");
        style.FontSize("12px");
        style.Color("#666666");
    })
    .Background("#ffffff")
    .ChartArea(area =>
    {
        area.Background("#f5f5f5");
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Category")
            .YName("Revenue")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Legend(legend => legend.Visible(true))
    .Render()
```

### Example 2: Dark Theme with Custom Colors

```csharp
var brandColors = new List<string> { "#0078d4", "#107c10", "#ff8c00", "#a239ca" };

@Html.EJS().CircularChart3D("container")
    .Width("600px")
    .Height("400px")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.MaterialDark)
    .Palettes(brandColors)
    .Title("Market Share Analysis")
    .TitleStyle(style =>
    {
        style.FontSize("18px");
        style.Color("#ffffff");
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Company")
            .YName("SharePercentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Donut)
            .Add();
    })
    .Legend(legend => 
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Right);
    })
    .Render()
```

### Example 3: Minimal Design

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("500px")
    .Height("400px")
    .Title("Distribution")
    .TitleStyle(style =>
    {
        style.FontSize("14px");
        style.FontWeight("normal");
        style.Color("#333333");
    })
    .Background("transparent")
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Label")
            .YName("Percentage")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Render()
```

### Example 4: Rich Data Presentation

```csharp
@Html.EJS().CircularChart3D("container")
    .Width("100%")
    .Height("500px")
    .Title("Annual Sales Performance")
    .SubTitle("2024 Year-to-Date | Updated: March 15, 2024")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Bootstrap5)
    .TitleStyle(style =>
    {
        style.FontSize("22px");
        style.FontWeight("bold");
        style.Color("#0078d4");
    })
    .SubTitleStyle(style =>
    {
        style.FontSize("13px");
        style.Color("#666666");
    })
    .ChartArea(area =>
    {
        area.Background("#f9f9f9");
        area.Border(border =>
        {
            border.Color("#e0e0e0");
            border.Width(1);
        });
    })
    .Series(series =>
    {
        series.DataSource((IEnumerable<object>)Model)
            .XName("Region")
            .YName("Sales")
            .Type(Syncfusion.EJ2.Charts.CircularChartSeriesType.Pie)
            .Add();
    })
    .Legend(legend =>
    {
        legend.Visible(true);
        legend.Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom);
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true);
        tooltip.Format("{point.x}: ${point.y}K ({point.percentage:.1f}%)");
    })
    .Render()
```

## Best Practices for Titles and Customization

1. **Clarity**: Use clear, descriptive titles
2. **Consistency**: Match styling across dashboards
3. **Hierarchy**: Use subtitles for supporting information
4. **Accessibility**: Ensure sufficient color contrast
5. **Responsiveness**: Test on different screen sizes
6. **Theming**: Choose themes matching your brand
7. **Performance**: Minimize custom styling impact
8. **Updates**: Keep titles synchronized with data

## Customization Checklist

- [ ] Title clearly describes chart content
- [ ] Subtitle provides context or date range
- [ ] Font sizes readable at intended display size
- [ ] Color contrast meets accessibility standards
- [ ] Theme matches application design
- [ ] Responsive sizing works on all devices
- [ ] Styling consistent with other charts
- [ ] Performance acceptable with all customizations

Titles and customization transform basic charts into professional visualizations that communicate effectively with users.
