---
name: syncfusion-aspnetmvc-bullet-chart
description: Implement Syncfusion ASP.NET MVC Bullet Charts for data visualization. Always use when user needs bullet charts, performance indicators, KPI dashboards, target vs actual comparisons, quality range visualizations, progress metrics, or data with comparative targets. Covers installation, data binding, ranges, value bars, comparative bars, axis customization, labels, tooltips, titles, dimensions, theming, accessibility, and RTL support for ASP.NET MVC applications.
metadata:
  author: "Syncfusion"
  category: "Data Visualization"
version: "34.1.29"
---

# Implementing Bullet Charts

## When to Use This Skill

Use this skill when you need to:
- Create bullet charts to visualize performance metrics and KPIs
- Display actual values against target values with quality ranges
- Implement compact data visualizations for dashboards
- Show progress towards goals with visual quality indicators
- Compare current performance against historical targets
- Build ASP.NET MVC applications with Syncfusion Bullet Chart component
- Visualize data with background quality ranges (Good/Bad/Satisfactory)
- Create horizontal or vertical bullet chart layouts
- Implement accessible, WCAG-compliant data visualizations

## Component Overview

The Syncfusion ASP.NET MVC Bullet Chart is a specialized data visualization component designed to display a single measure (actual value) compared to a target value, with background qualitative ranges indicating performance quality. It's ideal for KPI dashboards, performance scorecards, and compact metric displays.

**Key capabilities:**
- Display actual values with value bars (various types: Rect, Dot, etc.)
- Show target/comparative values with distinct markers
- Define multiple qualitative ranges with custom colors
- Customize axes with labels, ticks, and formatting
- Configure data labels and interactive tooltips
- Support both horizontal and vertical orientations
- Enable RTL (right-to-left) layouts
- Apply built-in themes and animations
- Full accessibility support with keyboard navigation

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)

When the user wants to set up the Bullet Chart component for the first time:
- Install NuGet package (Syncfusion.EJ2.MVC5)
- Configure namespaces in Web.config
- Add script and style references
- Set up script manager
- Create first basic bullet chart
- Run the application

### Data Binding

📄 **Read:** [references/data-binding.md](references/data-binding.md)

When the user needs to bind data to the chart:
- Connect local data sources
- Map ValueField and TargetField properties
- Structure data models correctly
- Bind multiple data points
- Set up controller and model classes
- Handle data from various sources

### Ranges (Quality Indicators)

📄 **Read:** [references/ranges.md](references/ranges.md)

When the user wants to display quality ranges (Good/Bad/Satisfactory):
- Define range end points
- Configure multiple qualitative ranges
- Customize range colors and opacity
- Create visual quality indicators
- Set up background performance bands

### Value Bar (Actual Value)

📄 **Read:** [references/value-bar.md](references/value-bar.md)

When the user needs to customize the actual value display:
- Configure value bar types (Rect, Dot)
- Customize value bar appearance
- Set border styling (color, width)
- Apply fill colors and patterns
- Adjust bar height and width

### Comparative Bar (Target Value)

📄 **Read:** [references/comparative-bar.md](references/comparative-bar.md)

When the user wants to display target/comparison values:
- Configure target bar types (Rect, Circle, Cross)
- Customize comparative bar appearance
- Set target field mapping
- Style target markers
- Create clear target vs actual visualizations

### Axis Customization

📄 **Read:** [references/axis-customization.md](references/axis-customization.md)

When the user needs to configure the chart axis:
- Set axis range (Minimum, Maximum, Interval)
- Format axis labels
- Configure label placement (inside/outside)
- Customize tick lines and placement
- Set up major and minor ticks
- Enable opposed positioning
- Use category axes
- Implement axis grouping

### Data Labels

📄 **Read:** [references/data-label.md](references/data-label.md)

When the user wants to display data labels on the chart:
- Enable and configure data labels
- Customize label text and formatting
- Style labels (font, color, size, weight)
- Position labels appropriately
- Create custom label templates

### Title and Tooltip

📄 **Read:** [references/title-and-tooltip.md](references/title-and-tooltip.md)

When the user needs titles or interactive tooltips:
- Add and position chart titles
- Style title text and appearance
- Enable and configure tooltips
- Create custom tooltip templates
- Display contextual data on hover

### Dimensions and Sizing

📄 **Read:** [references/bullet-chart-dimensions.md](references/bullet-chart-dimensions.md)

When the user wants to control chart size:
- Set width and height properties
- Use pixel-based sizing
- Implement percentage-based (responsive) sizing
- Configure container-based sizing
- Handle responsive design scenarios

### Customization and Accessibility

📄 **Read:** [references/customization-and-accessibility.md](references/customization-and-accessibility.md)

When the user needs advanced customization or accessibility features:
- Change orientation (Horizontal/Vertical)
- Enable right-to-left (RTL) layouts
- Apply built-in themes
- Configure animations
- Implement WCAG 2.2 compliant charts
- Support keyboard navigation
- Enable screen reader compatibility
- Ensure proper color contrast

## Quick Start Example

Here's a minimal example to create a bullet chart with data, ranges, and a target:

```csharp
// Controller (HomeController.cs)
public ActionResult Index()
{
    List<BulletChartData> data = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    return View(data);
}

public class BulletChartData
{
    public double target;
    public double value;
}
```

```cshtml
<!-- View (Index.cshtml) -->
@model List<BulletChartData>

@(Html.EJS().BulletChart("bulletChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Title("Sales Performance")
    .Ranges(rng =>
    {
        rng.End(150).Add();
        rng.End(250).Add();
        rng.End(300).Add();
    })
    .Render()
)
```

## Common Patterns

### Pattern 1: KPI Dashboard with Multiple Metrics

When displaying multiple performance metrics in a dashboard:
- Use consistent range definitions across charts
- Align minimum, maximum, and interval values
- Apply uniform styling for professional appearance
- Position charts in a grid layout
- Use titles to identify each metric

### Pattern 2: Target vs Actual Comparison

When comparing actual performance against targets:
- Map data to ValueField (actual) and TargetField (target)
- Use distinct colors for value bar and target marker
- Configure ranges to show performance quality zones
- Enable tooltips to show exact values
- Use data labels for immediate value visibility

### Pattern 3: Progress Towards Goal

When showing progress towards a goal:
- Set Maximum property to the goal value
- Use value bar to display current progress
- Configure ranges to show milestones (25%, 50%, 75%, 100%)
- Apply green colors to higher ranges
- Add title describing the goal

### Pattern 4: Performance Over Time Series

When showing bullet charts for time-based performance:
- Create multiple bullet chart instances for each time period
- Use consistent scale (Minimum, Maximum, Interval)
- Bind data dynamically from time-series data
- Display period labels as chart titles
- Allow comparison across periods

### Pattern 5: Vertical Bullet Charts for Space Efficiency

When vertical layout is preferred:
- Set Orientation property to "Vertical"
- Adjust Width and Height for vertical display
- Rotate axis labels if needed
- Use in side-by-side comparisons
- Stack vertically in narrow layouts

## Key Properties Reference

### Essential Properties

- **DataSource**: Data collection for the chart
- **ValueField**: Property name for actual value
- **TargetField**: Property name for target value
- **Minimum**: Starting value of the axis
- **Maximum**: Ending value of the axis
- **Interval**: Distance between axis labels

### Visual Configuration

- **Ranges**: Collection of qualitative ranges
- **ValueBar**: Actual value bar configuration (Type, Border, Fill)
- **TargetBar**: Target marker configuration (Type, Width, Color)
- **Orientation**: Layout direction (Horizontal/Vertical)
- **Width**: Chart width (pixel or percentage)
- **Height**: Chart height (pixel or percentage)

### Labels and Text

- **Title**: Chart title text and styling
- **DataLabel**: Data label configuration
- **Tooltip**: Interactive tooltip settings
- **LabelFormat**: Axis label format string

### Accessibility and Localization

- **EnableRtl**: Right-to-left layout support
- **Theme**: Built-in theme selection
- **Animation**: Animation configuration
- **TabIndex**: Keyboard navigation order

## Common Use Cases

### Sales Performance Dashboard
Display actual sales against monthly targets with quality ranges showing performance levels (Below Target, On Target, Above Target).

### Project Milestone Tracking
Visualize project completion percentage against planned milestones with ranges indicating timeline adherence.

### Financial KPI Monitoring
Show financial metrics (revenue, profit, expenses) compared to budget targets with visual quality indicators.

### Quality Assurance Metrics
Display defect rates, test coverage, or quality scores against acceptable ranges and target thresholds.

### Employee Performance Scorecards
Create performance visualizations comparing actual employee metrics against goals with performance bands.

### Operational Efficiency Metrics
Visualize operational KPIs (production output, resource utilization) against efficiency targets with quality zones.

### Customer Satisfaction Scores
Display satisfaction scores against targets with ranges showing satisfaction levels (Poor, Fair, Good, Excellent).

---

**Next Steps:**
1. Start with [Getting Started](references/getting-started.md) for installation and setup
2. Review [Data Binding](references/data-binding.md) to connect your data
3. Explore specific features based on your requirements
4. Check [Customization and Accessibility](references/customization-and-accessibility.md) for advanced scenarios
