# Customization and Styling in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [Title and Subtitle](#title-and-subtitle)
- [Legend Customization](#legend-customization)
- [Border and Background](#border-and-background)
- [Font and Text Styling](#font-and-text-styling)
- [Padding and Margin Settings](#padding-and-margin-settings)
- [Group and Leaf Item Styling](#group-and-leaf-item-styling)
- [Accessibility Settings](#accessibility-settings)
- [Complete Customization Example](#complete-customization-example)

## Overview

TreeMap customization allows you to control visual appearance, add titles, configure legends, adjust styling, and ensure accessibility. These customizations enhance both aesthetics and usability.

### Customization Categories

| Category | Features |
|----------|----------|
| **Text** | Title, subtitle, fonts, colors |
| **Layout** | Padding, margin, gaps |
| **Appearance** | Borders, backgrounds, colors |
| **Legend** | Position, orientation, styling |
| **Accessibility** | ARIA labels, keyboard navigation |

## Title and Subtitle

Add descriptive titles to your TreeMap.

### TitleSettings Property

Configure title display:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .TitleSettings(title =>
    {
        title.Text("Company Revenue by Region")
             .TextStyle(style =>
             {
                 style.FontSize("18px")
                      .FontWeight("bold")
                      .Color("#333333");
             });
    })
    .Render();
```

### Title Properties

| Property | Purpose | Example |
|----------|---------|---------|
| **Text** | Title text | "Company Revenue" |
| **Alignment** | Left, Center, Right | Alignment.Center |
| **TextStyle** | Font properties | FontSize, Color, etc. |

### Subtitle Configuration

Add subtitle below title:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .TitleSettings(title =>
    {
        title.Text("Company Revenue")
             .Subtitle("Revenue by Region - Q1 2024")
             .SubtitleStyle(style =>
             {
                 style.FontSize("14px")
                      .Color("#666666");
             });
    })
    .Render();
```

### Complete Title Example

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Revenue")
    .TitleSettings(title =>
    {
        title.Text("Global Revenue Distribution")
             .TextAlignment(Alignment.Center)
             .TextStyle(style =>
             {
                 style.FontSize("20px")
                      .FontWeight("bold")
                      .Color("#1a1a1a");
             })
             .Subtitle("2024 Annual Report")
             .SubtitleStyle(style =>
             {
                 style.FontSize("12px")
                      .Color("#888888");
             });
    })
    .Render();
```

## Legend Customization

Control legend appearance, position, and content.

### Legend Settings

Configure legend display:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LegendSettings(legend =>
    {
        legend.Visible(true)
              .Position(LegendPosition.Bottom)
              .Orientation(LegendOrientation.Horizontal)
              .Width("100%")
              .Height("40px");
    })
    .ColorMapping(colors =>
    {
        colors.From(0).To(100).Color("Red").Add();
        colors.From(100).To(200).Color("Yellow").Add();
        colors.From(200).To(300).Color("Green").Add();
    })
    .Render();
```

### Legend Position Options

| Position | Display Location |
|----------|-----------------|
| **Top** | Above TreeMap |
| **Bottom** | Below TreeMap (default) |
| **Left** | Left side |
| **Right** | Right side |
| **Float** | Floating overlay |

### Legend Orientation

```razor
// Horizontal legend (left to right)
.LegendSettings(legend =>
{
    legend.Orientation(LegendOrientation.Horizontal)
})

// Vertical legend (top to bottom)
.LegendSettings(legend =>
{
    legend.Orientation(LegendOrientation.Vertical)
})
```

### Legend Label Styling

Customize legend text appearance:

```razor
.LegendSettings(legend =>
{
    legend.Visible(true)
          .LabelDisplayMode(LabelDisplayMode.All)
          .TextStyle(style =>
          {
              style.FontSize("12px")
                   .Color("#333333")
                   .FontFamily("Arial, sans-serif");
          })
          .IconType(LegendIconType.Circle)  // Icon shape
          .Padding(10);
})
```

### Complete Legend Example

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .EqualColorValuePath("Status")
    .LegendSettings(legend =>
    {
        legend.Visible(true)
              .Position(LegendPosition.Bottom)
              .Orientation(LegendOrientation.Horizontal)
              .Alignment(Alignment.Center)
              .IconType(LegendIconType.Rectangle)
              .TextStyle(style =>
              {
                  style.FontSize("13px")
                       .Color("#666666");
              })
              .Width("400px")
              .Height("50px");
    })
    .ColorMapping(colors =>
    {
        colors.Value("Active").Color("Green").Add();
        colors.Value("Pending").Color("Orange").Add();
        colors.Value("Inactive").Color("Red").Add();
    })
    .Render();
```

## Border and Background

Customize borders and background colors.

### TreeMap Container Border

Add border around entire TreeMap:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Border(border =>
    {
        border.Color("#999999")
              .Width(2);
    })
    .Background("White")
    .Render();
```

### Border Properties

| Property | Purpose |
|----------|---------|
| **Color** | Hex or named color |
| **Width** | Thickness in pixels |

### Item Borders

Configure borders for individual items:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf =>
    {
        leaf.Border(border =>
        {
            border.Color("#cccccc")
                  .Width(1);
        })
    })
    .Render();
```

### Background Color

Set background color:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Background("#f0f0f0")
    .Render();
```

## Font and Text Styling

Customize text appearance throughout the TreeMap.

### Label Text Style

Style data labels:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf =>
    {
        leaf.LabelPath("Name")
            .TextStyle(style =>
            {
                style.FontFamily("Arial, sans-serif")
                     .FontSize("14px")
                     .FontWeight("bold")
                     .Color("#333333")
                     .Opacity(1.0);
            });
    })
    .Render();
```

### Text Style Properties

| Property | Values | Example |
|----------|--------|---------|
| **FontFamily** | Font names | "Arial", "Georgia" |
| **FontSize** | Size with unit | "14px", "1.2em" |
| **FontWeight** | bold, normal, etc. | "bold" |
| **Color** | Hex or named | "#FF0000", "Red" |
| **Opacity** | 0-1 | 0.8 |

### Tooltip Text Styling

Style tooltip text:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true)
               .Format("<b>${Name}</b><br/>${Value}")
               .TextStyle(style =>
               {
                   style.FontSize("12px")
                        .Color("White");
               });
    })
    .Render();
```

## Padding and Margin Settings

Add spacing within and around items.

### TreeMap Padding

Add internal padding:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Padding(10)  // 10px padding on all sides
    .Render();
```

### Item Spacing

Set gap between items:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf =>
    {
        leaf.Gap(5)  // 5px gap between items
    })
    .Render();
```

### Group Padding

Padding for group items:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .GroupPadding(8)  // Padding for group containers
    .Render();
```

## Group and Leaf Item Styling

Customize appearance of group and leaf items separately.

### Group Item Settings

Style parent/group rectangles:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Levels(levels =>
    {
        levels.GroupPath("Category")
              .Fill("LightGray")
              .Border(border =>
              {
                  border.Color("Black")
                        .Width(1);
              })
              .Add();
    })
    .Render();
```

### Leaf Item Settings

Style leaf/child rectangles:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LeafItemSettings(leaf =>
    {
        leaf.LabelPath("Name")
            .Fill("LightBlue")
            .Border(border =>
            {
                border.Color("Navy")
                      .Width(1);
            });
    })
    .Render();
```

### Different Colors per Level

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Levels(levels =>
    {
        // Level 1: Regions - Light color
        levels.GroupPath("Region")
              .Fill("#E8F4F8")
              .Add();
        
        // Level 2: Countries - Medium color
        levels.GroupPath("Country")
              .Fill("#B3D9E8")
              .Add();
    })
    .LeafItemSettings(leaf =>
    {
        // Leaf items - Darker color
        leaf.Fill("#6BA3C0");
    })
    .Render();
```

## Accessibility Settings

Ensure TreeMap is accessible to all users.

### ARIA Attributes

Add ARIA labels for screen readers:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Role("img")
    .AriaLabel("TreeMap showing company revenue by department")
    .Render();
```

### Keyboard Support

Enable keyboard navigation:

```javascript
// Keyboard navigation (usually enabled by default)
document.addEventListener('keydown', function(e) {
    var treemap = document.getElementById('container').ej2_instances[0];
    
    if (e.key === 'Tab') {
        // Tab through items
    } else if (e.key === 'Enter') {
        // Activate/select item
    }
});
```

### High Contrast Mode

Support high contrast display:

```csharp
// Check if high contrast mode is active
bool isHighContrast = Request.Browser.Capabilities["IsHighContrast"] == "true";

@if (isHighContrast) {
    @Html.EJS().TreeMap("container")
        .DataSource(Model)
        .Border(border =>
        {
            border.Color("Black")  // Higher contrast
                  .Width(3);
        })
        .LeafItemSettings(leaf =>
        {
            leaf.Border(border =>
            {
                border.Color("Black")
                      .Width(2);
            });
        })
        .Render();
} else {
    // Normal display
    @Html.EJS().TreeMap("container")
        .DataSource(Model)
        .Render();
}
```

## Complete Customization Example

**Controller:**
```csharp
public ActionResult FullCustomization()
{
    var data = new List<object>
    {
        new { Department = "Sales", Employees = 45, Performance = "High" },
        new { Department = "Engineering", Employees = 120, Performance = "High" },
        new { Department = "Marketing", Employees = 30, Performance = "Medium" },
        new { Department = "HR", Employees = 20, Performance = "Medium" },
        new { Department = "Finance", Employees = 35, Performance = "Low" }
    };
    return View(data);
}
```

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Employees")
    .EqualColorValuePath("Performance")
    .LayoutType(TreemapLayoutType.Squarified)
    
    // Title
    .TitleSettings(title =>
    {
        title.Text("Company Organization Chart")
             .TextAlignment(Alignment.Center)
             .TextStyle(style =>
             {
                 style.FontSize("18px")
                      .FontWeight("bold")
                      .Color("#1a1a1a");
             })
             .Subtitle("Department Size and Performance")
             .SubtitleStyle(style =>
             {
                 style.FontSize("12px")
                      .Color("#999999");
             });
    })
    
    // Legend
    .LegendSettings(legend =>
    {
        legend.Visible(true)
              .Position(LegendPosition.Bottom)
              .Orientation(LegendOrientation.Horizontal);
    })
    
    // Colors
    .ColorMapping(colors =>
    {
        colors.Value("High").Color("Green").Add();
        colors.Value("Medium").Color("Orange").Add();
        colors.Value("Low").Color("Red").Add();
    })
    
    // Styling
    .Border(border =>
    {
        border.Color("#cccccc")
              .Width(1);
    })
    .Background("#ffffff")
    .Padding(15)
    
    // Items
    .Levels(levels =>
    {
        levels.GroupPath("Department")
              .Fill("#f0f0f0")
              .Add();
    })
    .LeafItemSettings(leaf =>
    {
        leaf.LabelPath("Department")
            .TextStyle(style =>
            {
                style.FontSize("14px")
                     .FontWeight("bold")
                     .Color("#333333");
            })
            .Gap(2);
    })
    
    // Tooltips
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true)
               .Format("<b>${Department}</b><br/>Employees: ${Employees}")
               .TextStyle(style =>
               {
                   style.FontSize("12px")
                        .Color("White");
               });
    })
    
    .Render();

<style>
    #container {
        height: 600px;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
</style>
```

**Result:**
- Professional-looking TreeMap with title and subtitle
- Color-coded by performance (Green/Orange/Red)
- Legend at bottom showing performance categories
- Clean borders and professional styling
- Informative tooltips on hover
- Department names clearly labeled

## Troubleshooting

### Issue: Title Not Appearing

**Cause:** TitleSettings not configured or Text is empty.

**Solution:**
```razor
// ✅ Correct
.TitleSettings(title =>
{
    title.Text("My Title");
})

// ❌ Incorrect
.TitleSettings(title =>
{
    title.Text("");  // Empty text
})
// or missing TitleSettings entirely
```

### Issue: Legend Overlapping Content

**Cause:** Legend position or size not optimal.

**Solution:**
```razor
// Change position
.LegendSettings(legend =>
{
    legend.Position(LegendPosition.Right)  // Move to side
          .Orientation(LegendOrientation.Vertical);
})

// Adjust container size
<div id="container" style="height: 700px;"></div>
```

### Issue: Colors Not Applied

**Cause:** ColorMapping not configured or EqualColorValuePath missing.

**Solution:**
```razor
// ✅ Include both
.EqualColorValuePath("Status")
.ColorMapping(colors =>
{
    colors.Value("Active").Color("Green").Add();
})

// ❌ Missing ColorValuePath
.ColorMapping(colors =>
{
    colors.Value("Active").Color("Green").Add();
})
```

### Issue: Text Too Small or Unclear

**Cause:** Font size too small or insufficient contrast.

**Solution:**
```razor
.LeafItemSettings(leaf =>
{
    leaf.TextStyle(style =>
    {
        style.FontSize("14px")   // Increase size
             .FontWeight("bold") // Make bold
             .Color("#1a1a1a");  // High contrast
    });
})
```

