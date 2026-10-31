# Customization and Styling

## Table of Contents
- [Overview](#overview)
- [Navigator Appearance](#navigator-appearance)
  - [Customizing Selected and Unselected Regions](#customizing-selected-and-unselected-regions)
  - [Color Selection Guide](#color-selection-guide)
  - [Example: Professional Theme](#example-professional-theme)
- [Thumb Customization](#thumb-customization)
  - [Customizing Thumb Shape and Size](#customizing-thumb-shape-and-size)
  - [Available Thumb Types](#available-thumb-types)
  - [Thumb Configuration Example: Rectangle Shape](#thumb-configuration-example-rectangle-shape)
  - [Thumb Best Practices](#thumb-best-practices)
- [Border Styling](#border-styling)
  - [Customizing Control Borders](#customizing-control-borders)
  - [Border Configuration Options](#border-configuration-options)
  - [Border Width Recommendations](#border-width-recommendations)
- [Control Dimensions](#control-dimensions)
  - [Setting Width and Height](#setting-width-and-height)
  - [Responsive Dimensions](#responsive-dimensions)
  - [Height Guidelines](#height-guidelines)
- [Deferred Updates](#deferred-updates)
  - [Enabling Deferred Update Mode](#enabling-deferred-update-mode)
  - [When to Use Deferred Updates](#when-to-use-deferred-updates)
  - [Example: Performance Optimization with Deferred Updates](#example-performance-optimization-with-deferred-updates)
- [Snap Behavior](#snap-behavior)
  - [Enabling Snap to Data Points](#enabling-snap-to-data-points)
  - [Interval Types for DateTime Data](#interval-types-for-datetime-data)
- [Styling Examples](#styling-examples)
  - [Example 1: Professional Blue Theme](#example-1-professional-blue-theme)
  - [Example 2: Dark Theme](#example-2-dark-theme)
  - [Example 3: Minimal Clean Design](#example-3-minimal-clean-design)
  - [Best Practices for Styling](#best-practices-for-styling)

## Overview

The Range Navigator provides extensive customization options to modify appearance and behavior. The `NavigatorStyleSettings` property controls visual aspects, while behavior properties like `EnableDeferredUpdate` control interaction patterns.

## Navigator Appearance

### Customizing Selected and Unselected Regions

The navigator area contains two visual regions: selected (highlighted) and unselected. Customize their colors using `NavigatorStyleSettings`:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Price")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .NavigatorStyleSettings(ns =>
    {
        ns.SelectedRegionColor("#1f77b4")      // Blue for selected
          .UnselectedRegionColor("#e7e7e7");   // Light gray for unselected
    })
    .ValueType(Syncfusion.EJ2.Charts.RangeValueType.DateTime)
    .DataSource(Model)
    .Render()
)
```

### Color Selection Guide

| Purpose | Color | Use Case |
|---------|-------|----------|
| **Selected Region** | Bold, contrasting color | Primary blue, green (#1f77b4, #2ca02c) |
| **Unselected Region** | Muted, lighter color | Light gray, faded (#e7e7e7, #d3d3d3) |
| **Background** | Complement to series | White or light background (#ffffff) |

### Example: Professional Theme

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .NavigatorStyleSettings(ns =>
    {
        ns.SelectedRegionColor("rgba(31, 119, 180, 0.8)")    // Semi-transparent blue
          .UnselectedRegionColor("rgba(200, 200, 200, 0.3)"); // Semi-transparent gray
    })
    .DataSource(Model)
    .Render()
)
```

## Thumb Customization

### Customizing Thumb Shape and Size

Thumbs are the selection handles at range boundaries. Customize their appearance with the `Thumb` property:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .NavigatorStyleSettings(navigatorStyle =>
    {
        navigatorStyle.Thumb(thumb =>
            {
                thumb.Border(border =>
                {
                    border.Color("#3c78dc")      // Blue border
                          .Width(2);             // 2px border width
                })
                .Fill("#e8f0f7")                 // Light blue fill
                .Height(15)                      // 15px height
                .Width(15)                       // 15px width
                .Type(Syncfusion.EJ2.Charts.ThumbType.Circle);  // Circle shape
            });
    })
    .DataSource(Model)
    .Render()
)
```

### Available Thumb Types

| Type | Shape | Description |
|------|-------|-------------|
| **Circle** | Circular | Round selection handle |
| **Rectangle** | Rectangular | Square selection handle |

### Thumb Configuration Example: Rectangle Shape

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .NavigatorStyleSettings(navigatorStyle =>
    {
        navigatorStyle.Thumb(thumb =>
        {
            thumb.Border(border =>
            {
                border.Color("#4472c4")
                      .Width(1);
            })
            .Fill("#ffffff")
            .Height(20)
            .Width(12)
            .Type(Syncfusion.EJ2.Charts.ThumbType.Rectangle);
        });
    })
    .DataSource(Model)
    .Render()
)
```

### Thumb Best Practices
- **Visibility**: Use contrasting colors so thumbs are easily visible
- **Size**: Keep thumbs 12-20px for comfortable interaction on desktop and mobile
- **Border**: Use 1-2px border for clear definition
- **Accessibility**: Ensure sufficient contrast ratio (WCAG 2.2 AA minimum)

## Border Styling

### Customizing Control Borders

The outer border of the Range Navigator control is customized with `NavigatorBorder`:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .NavigatorBorder(border =>
    {
        border.Color("#cccccc")     // Light gray border
              .Width(2);             // 2px border width
    })
    .DataSource(Model)
    .Render()
)
```

### Border Configuration Options

```html
<!-- Example: Dark border for emphasis -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .NavigatorBorder(border =>
    {
        border.Color("#333333")     // Dark gray
              .Width(3);             // Thick border
    })
    .DataSource(Model)
    .Render()
)
```

### Border Width Recommendations
- **Subtle**: 1px (minimal visual emphasis)
- **Standard**: 2px (clear definition)
- **Prominent**: 3-4px (strong emphasis)

## Control Dimensions

### Setting Width and Height

Define the control's size within the container:

```html
<div style="width: 100%; height: 400px;">
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
        })
        .Height("100%")
        .Width("100%")
        .DataSource(Model)
        .Render()
    )
</div>
```

### Responsive Dimensions

```html
<!-- Responsive container -->
<style>
    .range-navigator-container {
        width: 100%;
        height: 350px;
        box-sizing: border-box;
    }
    
    @media (max-width: 768px) {
        .range-navigator-container {
            height: 250px;
        }
    }
</style>

<div class="range-navigator-container">
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
        })
        .Height("100%")
        .Width("100%")
        .DataSource(Model)
        .Render()
    )
</div>
```

### Height Guidelines
- **Desktop**: 300-400px for detailed visualization
- **Tablet**: 250-300px for limited space
- **Mobile**: 200-250px to fit on screen

## Deferred Updates

### Enabling Deferred Update Mode

By default, the `Changed` event fires continuously while dragging. Set `EnableDeferredUpdate(true)` to fire only when dragging completes:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .EnableDeferredUpdate(true)  // Event fires on drag release
    .Changed("onRangeChanged")
    .DataSource(Model)
    .Render()
)

<script>
function onRangeChanged(args) {
    console.log("Range selection complete: ", args.start, args.end);
    // Update connected controls here
}
</script>
```

### When to Use Deferred Updates

| Scenario | Setting | Reason |
|----------|---------|--------|
| **Real-time feedback** | false | Show instant updates while dragging |
| **Large connected data** | true | Wait for drag completion before fetching data |
| **Performance concern** | true | Reduce re-rendering during drag |
| **Instant filtering** | false | Update controls immediately |

### Example: Performance Optimization with Deferred Updates

```html
<!-- Without deferred update (continuous events during drag) -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .EnableDeferredUpdate(false)  // Fire on every drag movement
    .DataSource(Model)
    .Render()
)

<!-- With deferred update (single event on drag completion) -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .EnableDeferredUpdate(true)  // Fire only when user releases mouse
    .Changed("onSelectionComplete")
    .DataSource(Model)
    .Render()
)
```

## Snap Behavior

### Enabling Snap to Data Points

The `IntervalType` and related properties control how the range snaps to data:

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date").YName("Value").Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area).Add();
    })
    .IntervalType(Syncfusion.EJ2.Charts.RangeIntervalType.Months)
    .Interval(1)
    .DataSource(Model)
    .Render()
)
```

### Interval Types for DateTime Data

| Type | Behavior | Best For |
|------|----------|----------|
| **Years** | Snaps to year boundaries | Multi-year historical data |
| **Months** | Snaps to month boundaries | Monthly trend analysis |
| **Weeks** | Snaps to week boundaries | Weekly data review |
| **Days** | Snaps to day boundaries | Daily detailed data |
| **Hours** | Snaps to hour boundaries | High-frequency data |

## Styling Examples

### Example 1: Professional Blue Theme

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .NavigatorStyleSettings(ns =>
    {
        ns.SelectedRegionColor("#0078d4")      // Microsoft blue
          .UnselectedRegionColor("#f0f0f0");   // Light gray
    })
    .NavigatorBorder(border =>
    {
        border.Color("#e5e5e5")
              .Width(1);
    })
    .NavigatorStyleSettings(navigatorStyle =>
    {
        navigatorStyle.Thumb(thumb =>
        {
            thumb.Border(border => border.Color("#0078d4").Width(2))
                .Fill("#ffffff")
                .Height(16)
                .Width(16)
                .Type(Syncfusion.EJ2.Charts.ThumbType.Circle);
        });
    })
    .Height("300px")
    .DataSource(Model)
    .Render()
)
```

### Example 2: Dark Theme

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .NavigatorStyleSettings(ns =>
    {
        ns.SelectedRegionColor("#4CAF50")       // Green
          .UnselectedRegionColor("#424242");    // Dark gray
    })
    .NavigatorBorder(border =>
    {
        border.Color("#616161")
              .Width(2);
    })
    .NavigatorStyleSettings(navigatorStyle =>
    {
        navigatorStyle.Thumb(thumb =>
        {
            thumb.Border(border => border.Color("#4CAF50").Width(2))
                .Fill("#303030")
                .Height(14)
                .Width(14)
                .Type(Syncfusion.EJ2.Charts.ThumbType.Rectangle);
        });
    })
    .DataSource(Model)
    .Render()
)
```

### Example 3: Minimal Clean Design

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .NavigatorStyleSettings(ns =>
    {
        ns.SelectedRegionColor("rgba(100, 150, 255, 0.6)")
          .UnselectedRegionColor("rgba(200, 200, 200, 0.2)");
    })
    .NavigatorBorder(border =>
    {
        border.Color("transparent")
              .Width(0);
    })
    .NavigatorStyleSettings(navigatorStyle =>
    {
        navigatorStyle.Thumb(thumb =>
        {
            thumb.Border(border => border.Color("#666666").Width(1))
                .Fill("#f5f5f5")
                .Height(12)
                .Width(12)
                .Type(Syncfusion.EJ2.Charts.ThumbType.Circle);
        });
    })
    .Height("280px")
    .DataSource(Model)
    .Render()
)
```

### Best Practices for Styling
- Maintain good contrast for accessibility (WCAG 2.2 AA)
- Test on different browsers and devices
- Use consistent color schemes across your application
- Consider dark mode support for user experience
- Keep visual hierarchy clear (selected vs unselected distinction)
