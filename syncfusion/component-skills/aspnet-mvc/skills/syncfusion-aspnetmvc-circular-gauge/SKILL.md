---
name: syncfusion-aspnetmvc-circular-gauge
description: Implement Syncfusion Circular Gauge in ASP.NET MVC applications for visualizing numeric values on circular scales. Learn setup, axes configuration, pointer customization, ranges, styling, annotations, interactions, and accessibility features. Always use this skill when developing circular gauge components that display data in circular/radial format.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Gauges"
---

# Implementing Circular Gauge

The Circular Gauge is a powerful visualization control for displaying numeric values on a circular scale. It's ideal for dashboards, performance metrics, speed indicators, and any scenario requiring radial data visualization.

## When to Use This Skill

Use this skill when you need to:
- **Display numeric values** in a circular/radial format (speed, percentage, temperature, etc.)
- **Create dashboards** with gauge visualizations
- **Build interactive gauges** with animations and user interactions
- **Customize appearance** with themes, colors, and sizing
- **Add multiple data points** using pointers, ranges, and annotations
- **Implement accessibility** and internationalization features
- **Export gauges** for reports or printing
- **Support RTL** (Right-to-Left) layouts

## Key Capabilities

- ✅ **Multiple pointer types:** Needle, Marker, RangeBar, Image
- ✅ **Multiple axes:** Support for complex multi-axis gauges
- ✅ **Animation support:** Smooth transitions and animations
- ✅ **Interactive features:** Tooltip, pointer drag-and-drop
- ✅ **Customization:** Themes, colors, dimensions, margins
- ✅ **Annotations:** Add custom elements at any position
- ✅ **Legends:** Display ranges with toggle/paging support
- ✅ **Export:** Print and export to image formats
- ✅ **Accessibility:** WCAG compliance, keyboard navigation
- ✅ **Globalization:** RTL support, internationalization

## Quick Start Example

```csharp
// In your ASP.NET MVC View (.cshtml)
@Html.EJS().CircularGauge("container")
    .Title("Speed")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            StartAngle = 0,
            EndAngle = 360
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 50,
            Type = GaugePointerType.Needle
        });
    })
    .Render();
```

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and NuGet setup
- ASP.NET MVC configuration
- Script manager registration
- Basic gauge initialization
- Adding titles and axes to your first gauge

### Axes and Scales Configuration
📄 **Read:** [references/axes-and-scales.md](references/axes-and-scales.md)
- Setting axis ranges (minimum, maximum)
- Configuring direction and angle
- Custom label formatting
- Tick positioning and appearance
- Label positioning and smart labels
- Working with multiple axes

### Pointers and Animations
📄 **Read:** [references/pointers.md](references/pointers.md)
- Pointer types (Needle, Marker, RangeBar, Image)
- Pointer customization and styling
- Animation configuration
- Enabling pointer drag-and-drop
- Using multiple pointers
- Pointer positioning and sizing

### Ranges and Indicators
📄 **Read:** [references/ranges-and-indicators.md](references/ranges-and-indicators.md)
- Creating and configuring ranges
- Range styling and appearance
- Working with multiple ranges
- Range positioning and sizing
- Color gradients and custom colors

### Appearance and Styling
📄 **Read:** [references/appearance-and-styling.md](references/appearance-and-styling.md)
- Gauge dimensions and responsive sizing
- Area customization and margins
- Title and label styling
- Theme customization
- Color schemes and custom colors
- Responsive design implementation

### Annotations and Legends
📄 **Read:** [references/annotations-and-legends.md](references/annotations-and-legends.md)
- Adding annotations to gauges
- Annotation positioning and content
- Legend configuration
- Toggle and paging support for legends
- Custom legend text

### Interactions and Export
📄 **Read:** [references/interactions-and-export.md](references/interactions-and-export.md)
- Tooltip configuration
- User interaction patterns (hover, click)
- Print functionality
- Export to image formats (SVG, PNG, JPEG, PDF)
- Event handling and callbacks

### Globalization and Accessibility
📄 **Read:** [references/globalization-and-accessibility.md](references/globalization-and-accessibility.md)
- RTL (Right-to-Left) support
- Internationalization (i18n) and localization
- Accessibility compliance (WCAG)
- Keyboard navigation
- Screen reader support

## Common Implementation Patterns

### Basic Dashboard Gauge
```csharp
@Html.EJS().CircularGauge("cpuGauge")
    .Title("CPU Usage")
    .Axes(axes => axes.Add(new CircularGaugeAxis 
    { 
        Minimum = 0, 
        Maximum = 100
    }))
    .Pointers(pointers => pointers.Add(new CircularGaugePointer 
    { 
        Value = 75, 
        Type = GaugePointerType.Needle 
    }))
    .Render();
```

### Multi-Pointer Gauge
Use multiple pointers to show different metrics on the same gauge. Common for comparing actual vs target values or overlaying multiple data series.

### Gauge with Ranges
Add ranges to show performance zones (e.g., green for safe, yellow for warning, red for critical). This helps users quickly assess status at a glance.

### Interactive Gauge
Enable pointer dragging and tooltips for interactive dashboards where users can explore data or adjust values dynamically.

## Key Props Reference

| Property | Type | Purpose |
|----------|------|---------|
| `Title` | string | Gauge title/label |
| `Axes` | Collection | Define gauge scale and range |
| `Pointers` | Collection | Add needles, markers, range bars |
| `Ranges` | Collection | Define color zones |
| `Annotations` | Collection | Add custom text/images |
| `Legend` | LegendSettings | Configure legend display |
| `Tooltip` | TooltipSettings | Interactive hover information |
| `AnimationDuration` | int | Animation speed in milliseconds |

## Common Use Cases

1. **Speed/RPM Gauge** - Display vehicle speed or engine RPM
2. **Temperature Monitor** - Show current vs safe temperature ranges
3. **Performance Dashboard** - CPU, Memory, Network usage indicators
4. **KPI Dashboard** - Sales, revenue, conversion metrics
5. **Industrial Monitoring** - Pressure, flow, level indicators
6. **Financial Dashboards** - Stock performance, portfolio allocation
7. **Health Metrics** - Blood pressure, heart rate monitors

---

**Ready to implement?** Start with [Getting Started](references/getting-started.md) to configure your first gauge, then explore specific features based on your requirements.
