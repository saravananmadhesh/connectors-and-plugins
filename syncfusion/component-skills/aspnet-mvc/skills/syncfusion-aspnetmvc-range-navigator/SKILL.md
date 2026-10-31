---
name: syncfusion-aspnetmvc-range-navigator
description: Implement interactive Range Navigator controls in ASP.NET MVC to enable data visualization and range selection. Trigger when user needs to scroll/navigate through data, select date ranges, display time-series data, combine with charts or grids, or create dashboards with interactive data exploration.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Range Navigator in ASP.NET MVC

The Range Navigator is a data visualization control that enables users to scroll and navigate through data by selecting a range. It combines seamlessly with other controls like Chart and Data Grid to create rich, interactive dashboards and data exploration experiences.

## When to Use This Skill

Use this skill when you need to:
- Enable users to scroll and navigate through time-series or sequential data
- Allow selection of specific data ranges (date ranges, numeric ranges)
- Combine Range Navigator with charts or grids to filter displayed data
- Create lightweight, mobile-friendly data visualization
- Implement interactive dashboards with range-based data filtering
- Display and customize tooltip information for range selection
- Configure period selectors for quick range selection (today, week, month, year)

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites and system requirements
- Installing NuGet packages (Syncfusion.EJ2.MVC5)
- Adding namespace and script references
- Creating basic Range Navigator control
- Rendering with initial data

### Data Binding and Series Configuration
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Configuring data sources (local and remote)
- Mapping series data with xName and yName
- Working with different value types (Numeric, DateTime, Category)
- Binding multiple series
- Handling data updates and refresh

### Customization and Styling
📄 **Read:** [references/customization.md](references/customization.md)
- Customizing navigator appearance (region colors)
- Styling thumbs (shape, size, color, border)
- Configuring border width and color
- Setting control dimensions (height, width)
- Configuring deferred updates and snap behavior
- Theme customization

### Interaction Features and Events
📄 **Read:** [references/interaction-features.md](references/interaction-features.md)
- Setting up tooltips and formatting tooltip content
- Configuring period selectors (presets for range selection)
- Handling range selection events (changed event)
- Configuring labels and label formatting
- Displaying grid lines in navigator
- Configuring tick marks

### Accessibility and RTL Support
📄 **Read:** [references/accessibility-rtl.md](references/accessibility-rtl.md)
- WCAG 2.2 and Section 508 compliance
- WAI-ARIA attributes for screen readers
- Keyboard navigation (Tab, Ctrl+P for print)
- Right-to-Left (RTL) language support
- Mobile device accessibility
- Color contrast considerations

### Advanced Usage and Integration
📄 **Read:** [references/advanced-usage.md](references/advanced-usage.md)
- Lightweight mode for mobile devices
- Exporting Range Navigator
- Integrating with Chart and Data Grid controls
- Event handling and callbacks
- Performance optimization techniques
- Responsive design patterns
- Troubleshooting common issues

### API Reference
📄 **Read:** [references/chart-types.md](references/api-reference.md)
- Component Properties
- Series Properties
- Tooltip Properties
- Period Selector Properties
- Style Settings Properties
- Events
- Methods
- Enumerations

## Quick Start Example

```csharp
// In your controller (HomeController.cs)
public class HomeController : Controller
{
    public ActionResult Index()
    {
        List<RangeData> dataSource = new List<RangeData>
        {
            new RangeData { x = new DateTime(2020, 01, 01), y = 35 },
            new RangeData { x = new DateTime(2020, 02, 01), y = 28 },
            new RangeData { x = new DateTime(2020, 03, 01), y = 34 },
            new RangeData { x = new DateTime(2020, 04, 01), y = 32 },
            new RangeData { x = new DateTime(2020, 05, 01), y = 40 }
        };
        return View(dataSource);
    }
}

public class RangeData
{
    public DateTime x;
    public double y;
}
```

```html
<!-- In your View (Index.cshtml) -->
@model List<RangeNavigatorSample.Controllers.RangeData>

@{
    ViewBag.Title = "Range Navigator Example";
}

<div class="container">
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("x").YName("y").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
        })
        .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
        .Tooltip(tooltip => tooltip.Enable(true))
        .DataSource(Model)
        .Render()
    )
</div>

@Html.EJS().ScriptManager()
```

## Common Patterns

### Pattern 1: DateTime-Based Range Selection
Use DateTime value type when working with date/time data to enable users to select specific date ranges:
- Set `ValueType` to `DateTime`
- Map x-axis to DateTime fields
- Tooltip automatically formats dates

### Pattern 2: Lightweight Mobile View
Optimize for mobile performance with lightweight mode:
- Enable `EnableLightweight(true)` for reduced rendering overhead
- Combine with responsive design for mobile devices
- Use period selectors for quick navigation on small screens

### Pattern 3: Period Selector Quick Navigation
Provide quick preset buttons for common range selections:
- Configure period selector with predefined options (today, week, month, year)
- Reduces need for manual range selection
- Improves user experience for common queries

### Pattern 4: Connected Range and Detail View
Integrate with Chart or Grid to show detailed data for selected range:
- Handle `Changed` event from Range Navigator
- Update connected control's data source based on selected range
- Create drill-down and exploration experiences

### Pattern 5: Custom Tooltip Formatting
Display meaningful information in tooltips based on your data:
- Use `TooltipSettings` to customize tooltip appearance
- Format numerical values appropriately (currency, percentages, etc.)
- Show multiple data values in tooltip

## Key Features Overview

| Feature | Purpose | Key Properties |
|---------|---------|-----------------|
| **Data Binding** | Connect to data sources for visualization | DataSource, Series, xName, yName |
| **Range Selection** | Allow users to select specific data range | ValueType, Changed event |
| **Customization** | Modify appearance and behavior | NavigatorStyleSettings, Thumb, Border |
| **Tooltips** | Display information on hover/interaction | TooltipSettings, Format |
| **Period Selector** | Quick preset range selection buttons | PeriodSelectorSettings |
| **Lightweight Mode** | Optimize for mobile/performance | EnableLightweight |
| **Accessibility** | Support keyboard and screen readers | ARIA attributes, Keyboard support |
| **RTL Support** | Right-to-left text direction | EnableRtl |

## Integration Points

The Range Navigator works best when integrated with other Syncfusion components:
- **Chart**: Combine to show detailed visualization for selected range
- **Data Grid**: Filter grid data based on selected range
- **Scheduler**: Navigate through scheduled events
- **Dashboard**: Use as primary navigation control

## Setup Checklist

- [ ] NuGet package installed: Syncfusion.EJ2.MVC5
- [ ] Namespace added to Web.config
- [ ] Script references configured (CDN or local)
- [ ] Script manager registered in layout
- [ ] Data source prepared with DateTime or Numeric values
- [ ] Series properly mapped (xName, yName)
- [ ] ValueType set appropriately (DateTime, Numeric, Category)
- [ ] Styling and customization applied
- [ ] Events handled (Changed, Resized, etc.)
- [ ] Accessibility considerations addressed
