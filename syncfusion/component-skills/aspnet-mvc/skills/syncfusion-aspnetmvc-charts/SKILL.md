---
name: syncfusion-aspnetmvc-charts
description: Complete implementation guide for Syncfusion ASP.NET MVC Chart component. Always use this when users need data visualization, charts, graphs, plotting data, financial charts, statistical charts, line charts, bar charts, column charts, area charts, pie charts, donut charts, scatter plots, bubble charts, candlestick charts, OHLC charts, technical indicators, trendlines, zooming, panning, tooltips, legends, data labels, axes configuration, multiple series, combination charts.
metadata:
  author: "Syncfusion"
  category: "Data Visualization"
  version: "34.1.29"
---

# Implementing Syncfusion ASP.NET MVC Charts

A comprehensive skill for implementing and customizing Syncfusion's Chart component in ASP.NET MVC applications. The Chart control visualizes data with user interactivity and provides extensive customization options. All chart elements are rendered using Scalable Vector Graphics (SVG) for crisp, scalable rendering.

## When to Use This Skill

Use this skill when you need to:
- Create any type of chart or graph for data visualization
- Implement line, bar, column, area, pie, or donut charts
- Display financial data with candlestick, OHLC, or HiLo charts
- Create statistical visualizations (box & whisker, histogram, pareto)
- Build combination charts with multiple series types
- Configure chart axes (numeric, datetime, category, logarithmic)
- Add data labels, markers, legends, and tooltips
- Implement user interactions (zooming, panning, crosshair, trackball, selection)
- Add technical indicators or trendlines to charts
- Customize chart appearance, themes, and styling
- Export charts to PDF, SVG, PNG, or JPEG
- Handle dynamic data updates and real-time charts
- Create multi-axis or multi-pane charts
- Implement chart annotations and strip lines

## Chart Capabilities Summary

**Chart Types:** 25+ types including Line, Bar, Column, Area, Spline, Step, Scatter, Bubble, Polar, Radar, Financial (Candle, OHLC, HiLo), Statistical (Box & Whisker, Histogram, Pareto), and Waterfall.

**Key Features:**
- Multiple axes with different data types (numeric, datetime, category, logarithmic)
- Data binding from arrays, JSON, OData, or DataManager
- Rich data visualization elements (markers, labels, legends, tooltips)
- User interactions (zooming, panning, crosshair, trackball, selection)
- Technical indicators (20+ types) and trendlines
- Customizable appearance with themes and gradients
- Export functionality (PDF, SVG, PNG, JPEG, CSV)
- Accessibility features and RTL support
- Responsive and mobile-friendly

## Documentation and Navigation Guide

### Getting Started & Setup

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites and system requirements
- NuGet package installation (Syncfusion.EJ2.MVC5)
- Namespace configuration in Web.config
- Script and style references in _Layout.cshtml
- ScriptManager registration
- Basic chart implementation with Html Helper
- First chart example walkthrough
- Rendering and initialization

### Chart Types & Series

📄 **Read:** [references/chart-types-and-series.md](references/chart-types-and-series.md)
- Overview of 25+ available chart types
- Line charts (Line, Spline, Step Line, Stacked Line)
- Bar and Column charts (Bar, Column, Stacked, 100% Stacked)
- Area charts (Area, Spline Area, Step Area, Range Area, Stacked Area)
- Financial charts (Candlestick, OHLC, HiLo, HiLoOpenClose)
- Statistical charts (Box & Whisker, Histogram, Pareto)
- Specialized charts (Waterfall, Polar, Radar, Scatter, Bubble)
- Multiple series configuration
- Combination series (mixing chart types)
- Series customization and styling
- When to use each chart type

### Axes Configuration

📄 **Read:** [references/axes-configuration.md](references/axes-configuration.md)
- Axis types (Numeric, DateTime, Category, Logarithmic)
- Primary and secondary axes
- Multiple axes support
- Axis titles and labels
- Axis customization (grid lines, tick lines, colors)
- Smart axis labels (trim, wrap, rotate, hide, multi-row)
- Multilevel labels for category grouping
- Axis crossing and positioning
- Axis inversion (vertical charts)
- Strip lines for region highlighting
- Axis ranges and intervals

### Data Binding

📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Binding array of JSON objects
- Model binding from controllers
- ViewBag and ViewData binding
- DataManager integration
- OData web services binding
- Remote data binding with adapters
- Dynamic data updates
- Real-time data updates
- Data editing capabilities
- Empty points and null value handling
- Data source configuration patterns

### Data Markers

📄 **Read:** [references/data-markers.md](references/data-markers.md)
- Marker visibility and shapes (Circle, Rectangle, Diamond, Triangle, etc.)
- Marker size and border customization
- Marker colors and opacity
- Image markers with custom icons
- Data point marker positioning
- Marker visibility based on conditions
- Marker fill patterns

### Data Labels

📄 **Read:** [references/data-labels.md](references/data-labels.md)
- Data label visibility and enabling
- Label positioning (Top, Middle, Bottom, Outer, Auto)
- Label templates and custom formatting
- Smart label arrangement (no overlap)
- Label rotation and alignment
- Label font, color, and style customization
- Connector lines for labels
- Label borders and backgrounds
- Number and date formatting in labels

### Legend

📄 **Read:** [references/legend.md](references/legend.md)
- Legend visibility and enabling
- Legend positioning (Top, Bottom, Left, Right, Custom)
- Legend alignment and padding
- Legend customization (shape, text, size)
- Legend paging for multiple series
- Legend click and toggle behavior
- Custom legend text and formatting
- Legend item templates
- Legend reverse and scroll modes

### Tooltip

📄 **Read:** [references/tooltip.md](references/tooltip.md)
- Tooltip enabling and format
- Tooltip templates with custom HTML
- Shared tooltips for multiple series
- Tooltip customization (fill, border, opacity, font)
- Tooltip animation and timing
- Tooltip header and content formatting
- Crosshair tooltips
- Custom tooltip positioning

### Zooming & Panning

📄 **Read:** [references/zooming-and-panning.md](references/zooming-and-panning.md)
- Zoom modes (X, Y, XY axis zooming)
- Zoom types (Selection, Pinch, MouseWheel)
- Zoom toolbar with buttons
- Pan functionality for zoomed charts
- Auto-zoom intervals
- Zoom events and programmatic zoom
- Reset zoom functionality
- Zoom factor and position configuration

### User Interactions

📄 **Read:** [references/user-interactions.md](references/user-interactions.md)
- Crosshair for precise data tracking
- Trackball for multi-series data tracking
- Selection modes (Point, Series, Cluster, DragXY, DragY, DragX)
- Selection patterns and multi-selection
- Highlight on hover
- Selection events and customization
- Interactive data exploration patterns

### Annotations

📄 **Read:** [references/annotations.md](references/annotations.md)
- Chart annotations overview
- Content annotations (text, shapes, images, HTML)
- Annotation positioning (coordinate units, pixel units)
- Region annotations for highlighting areas
- Dynamic annotations based on data
- Annotation styling and customization
- Annotation alignment and offsets

### Appearance & Customization

📄 **Read:** [references/appearance-customization.md](references/appearance-customization.md)
- Chart dimensions (width, height, responsive)
- Background customization (color, image)
- Border and margin configuration
- Chart area customization
- Title and subtitle configuration
- Built-in themes (Material, Bootstrap, Fluent, Tailwind, Fabric)
- Theme Studio for custom themes
- Gradient fills and color palettes
- Series colors and point customization
- Animation configuration

### WebMCP and AI Agent Integration

📄 **Read:** [references/webmcp.md](references/webmcp.md)

When you need to:
- Enable WebMCP with `.EnableWebMcp(true)`
- Configure `.WebMcpSettings(...)`
- Set the registration `Name`, selected `Tools`, custom tools, or `ExposedTo`
- Register all built-in tools by omitting `Tools`
- Handle execution with `.BeforeWebMcpToolExecute(...)`
- Use automatic registration without `registerWebMcpTools()`
- Generate complete MVC view and controller samples
- Avoid manual registration controls and fabricated model-context behavior

### Advanced Features

📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Technical indicators (20+ types: SMA, EMA, MACD, RSI, Bollinger Bands, etc.)
- Trendlines (Linear, Exponential, Logarithmic, Polynomial, Power, Moving Average)
- Error bars (Fixed, Percentage, StandardDeviation, StandardError, Custom)
- Multiple panes for separate chart regions
- Chart synchronization across multiple charts
- Vertical chart orientation (transposed axes)
- Print functionality
- Export to PDF, SVG, PNG, JPEG
- Export to CSV for data
- Scaffolding support

### Accessibility & Localization

📄 **Read:** [references/accessibility-localization.md](references/accessibility-localization.md)
- WCAG 2.1 compliance and accessibility features
- Keyboard navigation support
- Screen reader compatibility and ARIA attributes
- Focus indicators and tab order
- RTL (Right-to-Left) support
- Internationalization (i18n) setup
- Localization (l10n) for multiple languages
- Number formatting (decimal, percentage, currency)
- Date and time formatting
- Culture-specific rendering

### Chart API Reference

WebMCP additions in the API reference include `EnableWebMcp`, `WebMcpSettings`, `BeforeWebMcpToolExecute`, and their fluent `ChartBuilder` methods.

📄 **Read:** [references/chart-api-reference.md](references/chart-api-reference.md)
- Complete Chart class API with 100+ properties
- Properties organized by category (Container, Positioning, Styling, Data, Axes, etc.)
- ChartSeries configuration and properties
- ChartAxis configuration reference
- Legend, Tooltip, and zoom property details
- Selection and interaction property reference
- All Chart events with descriptions
- Enumerations (ChartTheme, ChartSeriesType, SelectionMode, ValueType, etc.)
- Related classes and API links
- Common usage patterns and examples
- Namespace and assembly information
- Links to official Syncfusion API documentation

## Quick Start Example

Here's a basic example to get started with a simple line chart:

```cshtml
@* Controller: Prepare data *@
@{
    List<ChartData> chartData = new List<ChartData>
    {
        new ChartData { Month = "Jan", Sales = 35 },
        new ChartData { Month = "Feb", Sales = 28 },
        new ChartData { Month = "Mar", Sales = 34 },
        new ChartData { Month = "Apr", Sales = 32 },
        new ChartData { Month = "May", Sales = 40 },
        new ChartData { Month = "Jun", Sales = 32 }
    };
}

@* View: Render chart *@
@Html.EJS().Chart("container").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)
    ).PrimaryYAxis(py => py.LabelFormat("{value}K")
    ).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(chartData)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Marker(mr => mr.Visible(true))
              .Add();
    }).Title("Monthly Sales Analysis").Render()

@* Model class *@
public class ChartData
{
    public string Month { get; set; }
    public double Sales { get; set; }
}
```

## Common Patterns

### Multiple Series Chart

```cshtml
@Html.EJS().Chart("multiSeries").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(productASales)
              .XName("Month")
              .YName("Sales")
              .Name("Product A")
              .Add();
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(productBSales)
              .XName("Month")
              .YName("Sales")
              .Name("Product B")
              .Add();
    }).Render()
```

### Combination Chart (Column + Line)

```cshtml
@Html.EJS().Chart("combo").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.Category)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Column)
              .DataSource(salesData)
              .XName("Month")
              .YName("Sales")
              .Name("Sales")
              .Add();
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Line)
              .DataSource(salesData)
              .XName("Month")
              .YName("Target")
              .Name("Target")
              .Marker(mr => mr.Visible(true))
              .Add();
    }).Render()
```

### Chart with Zooming and Tooltip

```cshtml
@Html.EJS().Chart("zoomChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Area)
              .DataSource(timeSeriesData)
              .XName("Date")
              .YName("Value")
              .Add();
    }).ZoomSettings(zoom => zoom.EnableSelectionZooming(true)
                              .EnablePinchZooming(true)
                              .EnableMouseWheelZooming(true)
                              .Mode(Syncfusion.EJ2.Charts.ZoomMode.XY)
    ).Tooltip(tooltip => tooltip.Enable(true).Shared(true)
    ).Render()
```

### Financial Chart with Indicators

```cshtml
@Html.EJS().Chart("stockChart").PrimaryXAxis(px => px.ValueType(Syncfusion.EJ2.Charts.ValueType.DateTime)).Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.ChartSeriesType.Candle)
              .DataSource(stockData)
              .XName("Date")
              .High("High")
              .Low("Low")
              .Open("Open")
              .Close("Close")
              .Add();
    }).Indicators(indicators =>
    {
        indicators.Type(Syncfusion.EJ2.Charts.TechnicalIndicators.Sma)
                  .Period(14)
                  .SeriesName("Series1")
                  .Add();
    }).Render()
```

## Key Configuration Areas

### Series Configuration
- **Type**: Chart type (Line, Bar, Column, Area, etc.)
- **DataSource**: Data array or collection
- **XName/YName**: Property names for X and Y values
- **Name**: Series display name in legend
- **Fill**: Series color
- **Marker**: Data point markers
- **Width**: Line/border width

### Axis Configuration
- **ValueType**: Numeric, DateTime, Category, Logarithmic
- **Title**: Axis title text
- **LabelFormat**: Format string for labels
- **Minimum/Maximum**: Axis range
- **Interval**: Label interval
- **OpposedPosition**: Position on opposite side

### Legend Configuration
- **Visible**: Show/hide legend
- **Position**: Top, Bottom, Left, Right, Custom
- **Alignment**: Near, Center, Far
- **ShapeHeight/ShapeWidth**: Legend symbol size

### Tooltip Configuration
- **Enable**: Show/hide tooltip
- **Format**: Tooltip text format
- **Shared**: Show data from all series
- **Template**: Custom HTML template

### Zoom Configuration
- **EnableSelectionZooming**: Drag to zoom
- **EnablePinchZooming**: Touch pinch zoom
- **EnableMouseWheelZooming**: Scroll to zoom
- **Mode**: X, Y, or XY axis zoom

## Common Use Cases

### Business Analytics Dashboard
Create KPI charts with multiple metrics, targets, and trends for business intelligence.

### Financial Data Visualization
Display stock prices, trading volumes, and technical indicators for financial analysis.

### Scientific Data Plotting
Visualize experimental data, statistical distributions, and scientific measurements.

### Real-time Monitoring
Show live data updates for IoT sensors, system metrics, or application performance.

### Comparison Analysis
Compare multiple data series across categories, time periods, or segments.

### Trend Analysis
Identify patterns and trends with trendlines, moving averages, and indicators.

### Geographic Data
Combine with maps for location-based data visualization and analysis.

## Events

Handle chart events for interactive behavior:

```cshtml
@Html.EJS().Chart("eventChart").Series(series => series.Add()
    ).PointClick("onPointClick").SeriesRender("onSeriesRender").Load("onChartLoad").Loaded("onChartLoaded").Render()

<script>
    function onPointClick(args) {
        console.log("Point clicked:", args.point);
        // Handle point click
    }
    
    function onSeriesRender(args) {
        // Customize series before rendering
        args.fill = calculateColor(args.data);
    }
    
    function onChartLoad(args) {
        // Perform actions before chart loads
    }
    
    function onChartLoaded(args) {
        // Perform actions after chart loads
    }
</script>
```

## Troubleshooting

### Chart not rendering
- Verify `@Html.EJS().ScriptManager()` is at end of `<body>` in _Layout.cshtml
- Check that Syncfusion scripts are loaded (ej2.min.js)
- Ensure chart container has unique ID
- Verify `.Render()` is called

### Data not displaying
- Check DataSource is not null or empty
- Verify XName and YName match data property names (case-sensitive)
- Ensure data properties are public
- Check browser console for JavaScript errors

### Axis labels incorrect
- Set appropriate ValueType (Category for strings, DateTime for dates)
- Use LabelFormat for number/date formatting
- Check data types match axis ValueType

### Series colors not applied
- Use Fill property on series
- Check for theme overrides
- Verify Palette property if using multiple series

### Tooltip not showing
- Set Enable(true) in Tooltip configuration
- Check Format string syntax
- For shared tooltips, ensure Shared(true)

### Zoom not working
- Enable at least one zoom type in ZoomSettings
- Set appropriate Mode (X, Y, or XY)
- Ensure EnableScrollbar if using scrollbar

## Related Components

- **Stock Chart**: Specialized component for financial charts with advanced features
- **Range Selector**: Date/numeric range selection for chart data filtering
- **Sparkline**: Inline mini-charts for compact data visualization
- **3D Chart**: Three-dimensional chart visualization

## Resources

- **Official Documentation**: https://ej2.syncfusion.com/aspnetmvc/documentation/chart/
- **Component Demos**: https://ej2.syncfusion.com/aspnetmvc/Chart/
- **API Reference**: https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.Charts.Chart.html
- **WebMCP Reference**: [references/webmcp.md](references/webmcp.md)
- **GitHub Examples**: https://github.com/SyncfusionExamples/ASP-NET-MVC-Getting-Started-Examples/tree/main/Chart/
