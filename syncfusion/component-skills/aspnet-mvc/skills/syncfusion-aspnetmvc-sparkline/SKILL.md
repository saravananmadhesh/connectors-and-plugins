---
name: syncfusion-aspnetmvc-sparkline
description: Implement Syncfusion ASP.NET MVC Sparkline component to create compact, space-efficient data visualizations. Use this skill when implementing sparklines with different types (line, column, area, pie, win-loss), configuring markers, range bands, tooltips, data labels, and user interactions. Includes getting started, customization, accessibility features, and migration from EJ1 APIs.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization - Charts"
---

# Implementing Syncfusion ASP.NET MVC Sparkline Component

The Sparkline component is a small, space-efficient chart used to display data trends and patterns in a highly condensed format. Unlike traditional charts, sparklines render without axes or coordinates, making them perfect for dashboards, grids, and data summaries.

## Key Features

- **Five sparkline types:** Line, Column, Area, Pie, and Win-Loss
- **Markers:** Support for high, low, start, end, and negative point markers
- **Range bands:** Highlight specific value ranges on the Y-axis
- **Data labels:** Display values for specific points
- **User interactions:** Tooltips, track lines, and mouse tracking
- **Localization & Accessibility:** Full support for multiple languages, RTL, and WCAG standards
- **Themes:** Material, Fabric, Bootstrap, and High Contrast themes
- **Grid integration:** Easily embed sparklines within data grids

## When to Use This Skill

Use this skill when you need to:
- Create compact data visualizations in dashboards
- Embed trend charts within data grids or tables
- Highlight data patterns in minimal space
- Implement interactive tooltips and data labels on charts
- Customize chart appearance with themes and styling
- Make charts accessible and localized for different users
- Migrate existing EJ1 sparkline code to EJ2

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installing Syncfusion.EJ2.MVC5 NuGet package
- Adding namespace and script references
- Registering ScriptManager
- Creating your first sparkline with sample data
- Setting up data binding with XName and YName

### API Reference
📄 **Read:** [references/chart-types.md](references/api-reference.md)
- Component Properties
- Data Binding Properties
- Series and Appearance Properties
- Marker Properties
- Range Band Properties
- Data Label Properties
- Tooltip Properties
- Track Line Properties
- Container Properties
- Events
- Methods
- Enumerations

### Sparkline Types Configuration
📄 **Read:** [references/sparkline-types.md](references/sparkline-types.md)
- Understanding all five sparkline types
- Line type implementation for trend data
- Column type for comparing values
- Area type for cumulative data
- Pie type for composition analysis
- Win-Loss type for binary outcomes
- Examples for each type with code samples

### Markers and Special Points
📄 **Read:** [references/markers-configuration.md](references/markers-configuration.md)
- Enabling markers for all, specific, or special points
- Start, end, high, low, and negative point markers
- Customizing marker fill color, border, size, and opacity
- Conditional marker visibility based on data values

### Range Bands
📄 **Read:** [references/range-bands.md](references/range-bands.md)
- Adding single range band to highlight data regions
- Multiple range bands for complex visualizations
- Customizing range band color and opacity
- Setting start and end range values
- Common use cases for threshold highlighting

### Appearance and Styling
📄 **Read:** [references/appearance-customization.md](references/appearance-customization.md)
- Customizing borders with color and width
- Padding and margin adjustments
- Container area background colors
- Theme selection (Material, Fabric, Bootstrap, High Contrast)
- Series colors, opacity, and line width
- Palette customization for multiple sparklines

### Data Labels
📄 **Read:** [references/data-labels.md](references/data-labels.md)
- Enabling data labels for all or specific points
- Label formatting and text styling
- Customizing label appearance with fill, border, and opacity
- Offset positioning and font customization
- Format strings for displaying custom values

### User Interaction Features
📄 **Read:** [references/user-interaction.md](references/user-interaction.md)
- Enabling tooltips with custom formatting
- Tooltip customization with fill color and text styles
- Custom tooltip templates
- Track line feature for cursor tracking
- Mouse position tracking and events

### Localization, Accessibility, and Sizing
📄 **Read:** [references/localization-accessibility-sizing.md](references/localization-accessibility-sizing.md)
- Locale configuration and culture-specific formatting
- RTL (Right-to-Left) support
- WCAG 2.2 accessibility compliance
- Keyboard navigation (Ctrl+P for print)
- Screen reader support with ARIA attributes
- Setting sparkline dimensions (pixel, percentage, container)
- Responsive sizing for different screen sizes

### EJ1 to EJ2 Migration
📄 **Read:** [references/ej1-migration.md](references/ej1-migration.md)
- API differences between EJ1 and EJ2
- Property name changes and new features
- Breaking changes and migration checklist
- Side-by-side API comparison tables
- Deprecations and alternative approaches

## Quick Start Example

```cshtml
<!-- View: ~/Views/Home/Index.cshtml -->
@Html.EJS().Sparkline("spark")
    .DataSource(Model)
    .XName("xval")
    .YName("yval")
    .Height("100")
    .Width("70")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .Render()
```

```csharp
// Controller: HomeController.cs
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View(DataSource.GetData());
    }
}

public class DataSource
{
    public int x;
    public string xval;
    public double yval;

    public static List<DataSource> GetData()
    {
        List<DataSource> data = new List<DataSource>
        {
            new DataSource { x = 0, xval = "2005", yval = 20090440 },
            new DataSource { x = 1, xval = "2006", yval = 20264080 },
            new DataSource { x = 2, xval = "2007", yval = 20434180 },
            new DataSource { x = 3, xval = "2008", yval = 21007310 }
        };
        return data;
    }
}
```

## Common Patterns

### Pattern 1: Dashboard with Multiple Sparklines
Create a dashboard that compares trends across different metrics using multiple sparklines side-by-side or within a grid.

### Pattern 2: Conditional Marker Highlighting
Show markers only for high and low values to highlight anomalies in data trends, helping users quickly spot performance extremes.

### Pattern 3: Theme-Aware Tooltips
Implement tooltips that automatically adjust colors based on the selected theme (Material, Fabric, Bootstrap, High Contrast) for consistent visual presentation.

### Pattern 4: Responsive Sizing
Build sparklines that adapt to container size using percentage-based dimensions, ensuring they scale properly on different screen sizes.

### Pattern 5: Localized Currency Formatting
Display values in tooltips using culture-specific formatting (e.g., currency symbols) based on the user's locale.

## Key Properties Reference

**Core Properties:**
- `type`: SparklineType (Line, Column, Area, Pie, WinLoss)
- `dataSource`: Array of data points
- `xName`: Property name for X-axis values
- `yName`: Property name for Y-axis values
- `width`, `height`: Dimensions (pixels or percentage)

**Visual Properties:**
- `fill`: Series color
- `opacity`: Transparency (0-1)
- `lineWidth`: Thickness of line sparklines
- `theme`: Visual theme (Material, Fabric, Bootstrap, Highcontrast)

**Marker Properties:**
- `markerSettings.visible`: Types to display (All, Start, End, High, Low, Negative)
- `markerSettings.fill`: Marker color
- `markerSettings.size`: Marker dimensions

**Range Band Properties:**
- `rangeBandSettings.startRange`: Start value for highlight
- `rangeBandSettings.endRange`: End value for highlight
- `rangeBandSettings.color`: Band color
- `rangeBandSettings.opacity`: Band transparency

**Interaction Properties:**
- `tooltipSettings.visible`: Enable/disable tooltips
- `tooltipSettings.format`: Tooltip text format
- `trackLineSettings.visible`: Enable/disable track line
- `dataLabelSettings.visible`: Show/hide data labels

## Next Steps

1. Start with [Getting Started](references/getting-started.md) to set up your first sparkline
2. Choose your [Sparkline Type](references/sparkline-types.md) based on your data
3. Configure [Markers](references/markers-configuration.md) to highlight important points
4. Add [User Interactions](references/user-interaction.md) for better UX
5. Customize [Appearance](references/appearance-customization.md) to match your design
6. Implement [Localization](references/localization-accessibility-sizing.md) if needed
7. Ensure [Accessibility](references/localization-accessibility-sizing.md) compliance
