# EJ1 to EJ2 Migration Guide

## Table of Contents
- [Overview](#overview)
  - [Key Migration Changes](#key-migration-changes)
- [Migration Checklist](#migration-checklist)
- [Property Migration Reference](#property-migration-reference)
  - [Sparkline Type](#sparkline-type)
  - [Data Binding](#data-binding)
  - [Marker Configuration](#marker-configuration)
  - [Data Labels](#data-labels)
  - [Range Bands](#range-bands)
  - [Appearance Customization](#appearance-customization)
  - [Tooltip Configuration](#tooltip-configuration)
  - [Track Line (NEW in EJ2)](#track-line-new-in-ej2)
  - [Sizing](#sizing)
- [Complete Migration Example](#complete-migration-example)
  - [EJ1 Implementation](#ej1-implementation)
  - [EJ2 Implementation](#ej2-implementation)
- [Breaking Changes Summary](#breaking-changes-summary)
- [Feature Additions in EJ2](#feature-additions-in-ej2)
  - [Leverage New Features](#leverage-new-features)
- [Gradual Migration Strategy](#gradual-migration-strategy)
  - [Phase 1: Update Package and Setup](#phase-1-update-package-and-setup)
  - [Phase 2: Migrate Critical Components](#phase-2-migrate-critical-components)
  - [Phase 3: Migrate Remaining Components](#phase-3-migrate-remaining-components)
  - [Phase 4: Optimize with New Features](#phase-4-optimize-with-new-features)
- [Troubleshooting Migration Issues](#troubleshooting-migration-issues)
  - [Issue: "Syncfusion.EJ2 namespace not recognized"](#issue-syncfusionej2-namespace-not-recognized)
  - [Issue: "Type 'Syncfusion.EJ2.Charts.SparklineType' not found"](#issue-type-syncfusionej2chartssparklinetype-not-found)
  - [Issue: Sparkline not rendering](#issue-sparkline-not-rendering)
  - [Issue: Markers not showing](#issue-markers-not-showing)
  - [Issue: Old property names still in code](#issue-old-property-names-still-in-code)
- [Performance Considerations](#performance-considerations)
- [Support and Resources](#support-and-resources)
- [Migration Completion Checklist](#migration-completion-checklist)

## Overview

Essential JS 1 (EJ1) Sparkline component has evolved significantly in Essential JS 2 (EJ2). This guide helps developers upgrade existing EJ1 sparkline implementations to EJ2.

### Key Migration Changes

- **Namespace**: Changed to `Syncfusion.EJ2`
- **Syntax**: HTML helper syntax updated
- **Property Names**: Many properties remain similar but some have changed
- **New Features**: EJ2 introduces markers, range bands, and data labels
- **Method Names**: Some methods have been renamed or replaced

## Migration Checklist

Before starting migration, review this checklist:

- [ ] Identify all EJ1 sparkline components in your project
- [ ] Note current sparkline types and configurations
- [ ] Test existing functionality thoroughly
- [ ] Plan migration scope (all at once vs. incremental)
- [ ] Update NuGet package to Syncfusion.EJ2.MVC5
- [ ] Update Web.config namespace reference
- [ ] Update script CDN link
- [ ] Test in development environment
- [ ] Verify functionality against EJ1 behavior
- [ ] Deploy and monitor in production

## Property Migration Reference

### Sparkline Type

| Aspect | EJ1 | EJ2 | Notes |
|--------|-----|-----|-------|
| **Type Property** | `Type(SparklineType.Column)` | `Type(Syncfusion.EJ2.Charts.SparklineType.Column)` | Enum namespace changed |
| **Syntax** | `@Html.EJ().Sparkline()` | `@Html.EJS().Sparkline()` | Helper method changed |

**EJ1 Implementation:**
```csharp
@(Html.EJ().Sparkline("container")
    .Type(SparklineType.Column)
)
```

**EJ2 Implementation:**
```csharp
@Html.EJS().Sparkline("container")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Column)
    .Render()
```

### Data Binding

| Aspect | EJ1 | EJ2 | Notes |
|--------|-----|-----|-------|
| **DataSource** | `DataSource(ViewBag.SparklineData)` | `DataSource(ViewBag.datasource)` | Same property name |
| **XName** | `XName("Month")` | `XName("Month")` | Unchanged |
| **YName** | `YName("Sales")` | `YName("Sales")` | Unchanged |

**EJ1:**
```csharp
@(Html.EJ().Sparkline("container")
    .DataSource(ViewBag.data)
    .XName("Month")
    .YName("Sales")
)
```

**EJ2:**
```csharp
@Html.EJS().Sparkline("container")
    .DataSource(ViewBag.data)
    .XName("Month")
    .YName("Sales")
    .Render()
```

### Marker Configuration

**EJ1 Markers:**
```csharp
.MarkerSettings(mr => mr
    .Visible(true)
    .Fill("red")
    .Width(10)              // Width in EJ1
)
```

**EJ2 Markers:**
```csharp
.MarkerSettings(ms => ms
    .Visible(new string[] { "All" })  // NEW: specify which points
    .Fill("red")
    .Size(10)               // Changed from Width to Size
    .Opacity(0.5)           // NEW property
)
```

**Breaking Changes:**
- `Visible` now accepts array of marker types (All, Start, End, High, Low, Negative)
- `Width` renamed to `Size`
- Added `Opacity` property
- Added `Border` property for marker borders

### Data Labels

**EJ1:** Data labels not supported as a separate feature

**EJ2:** Full data label support added

```csharp
// NEW in EJ2
.DataLabelSettings(dl => dl
    .Visible(new string[] { "All" })
    .Format("${yval}")
    .Fill("yellow")
    .Border(br => br.Color("gray").Width(1))
    .TextStyle(ts => ts.Color("black").Size("10px"))
)
```

### Range Bands

**EJ1:** Not available as a feature

**EJ2:** Full range band support added

```csharp
// NEW in EJ2
.RangeBandSettings(rbs => rbs
    .StartRange(30)
    .EndRange(60)
    .Color("rgba(0, 255, 0, 0.2)")
    .Opacity(0.2)
)
```

### Appearance Customization

| Aspect | EJ1 | EJ2 | Notes |
|--------|-----|-----|-------|
| **Background** | `Background("gray")` | `ContainerArea(ca => ca.Background("red"))` | Now under ContainerArea |
| **Border** | `Border(br => br.Color("black"))` | `ContainerArea(ca => ca.Border(...))` | Now under ContainerArea |
| **Series Fill** | `Fill("gray")` | `Fill("green")` | Unchanged |
| **Opacity** | `Opacity(0.5)` | `Opacity(0.5)` | Unchanged |

**EJ1:**
```csharp
@(Html.EJ().Sparkline("container")
    .Background("gray")
    .Border(br => br.Color("black").Width(1))
    .Fill("blue")
)
```

**EJ2:**
```csharp
@Html.EJS().Sparkline("container")
    .ContainerArea(ca => ca
        .Background("gray")
        .Border(br => br.Color("black").Width(1))
    )
    .Fill("blue")
    .Render()
```

### Tooltip Configuration

| Aspect | EJ1 | EJ2 | Notes |
|--------|-----|-----|-------|
| **Show Tooltip** | `Tooltip(tooltip => tooltip.Visible(true))` | `TooltipSettings(ts => ts.Visible(true))` | Property renamed |
| **Tooltip Format** | Limited | `Format("${xval}: ${yval}")` | NEW: Enhanced formatting |
| **Tooltip Template** | `Template("tooltipId")` | `Template("tooltipId")` | Syntax similar but different structure |

**EJ1:**
```csharp
.Tooltip(tooltip => tooltip
    .Visible(true)
    .Fill("red")
)
```

**EJ2:**
```csharp
.TooltipSettings(ts => ts
    .Visible(true)
    .Fill("red")
    .Format("${xval}: ${yval}")
)
```

### Track Line (NEW in EJ2)

Track line feature is new in EJ2:

```csharp
// NEW - Not available in EJ1
.TooltipSettings(ts => ts
    .Visible(true)
    .TrackLineSettings(tls => tls
        .Visible(true)
        .Color("red")
        .Width(2)
    )
)
```

### Sizing

| Aspect | EJ1 | EJ2 | Notes |
|--------|-----|-----|-------|
| **Width** | `Width("300px")` | `Width("300px")` | Unchanged |
| **Height** | `Height("300px")` | `Height("300px")` | Unchanged |

## Complete Migration Example

### EJ1 Implementation

```csharp
// EJ1 - Old approach
@(Html.EJ().Sparkline("container")
    .Type(SparklineType.Line)
    .DataSource(ViewBag.data)
    .XName("Month")
    .YName("Sales")
    .Width("200px")
    .Height("100px")
    .Fill("steelblue")
    .MarkerSettings(mr => mr
        .Visible(true)
        .Fill("red")
    )
    .Tooltip(tooltip => tooltip
        .Visible(true)
        .Fill("white")
    )
)
```

### EJ2 Implementation

```csharp
// EJ2 - New approach
@Html.EJS().Sparkline("container")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Line)
    .DataSource(ViewBag.data)
    .XName("Month")
    .YName("Sales")
    .Width("200px")
    .Height("100px")
    .Fill("steelblue")
    .MarkerSettings(ms => ms
        .Visible(new string[] { "All" })
        .Fill("red")
        .Size(3)
        .Border(br => br.Color("darkred").Width(1))
    )
    .TooltipSettings(ts => ts
        .Visible(true)
        .Fill("white")
        .Format("${xval}: $${yval}K")
        .Border(br => br.Color("gray").Width(1))
    )
    .Render()
```

## Breaking Changes Summary

| Change | Impact | Migration |
|--------|--------|-----------|
| **Namespace** | Compiler errors | Update Web.config |
| **Helper Method** | `@Html.EJ()` → `@Html.EJS()` | Update all sparkline declarations |
| **Marker Width → Size** | Different property name | Rename property |
| **Background Property** | Moved to ContainerArea | Restructure property access |
| **Border Property** | Moved to ContainerArea | Restructure property access |
| **Tooltip → TooltipSettings** | Renamed property | Update property name |
| **Render() Method** | Now required | Add to end of all sparkline declarations |

## Feature Additions in EJ2

EJ2 introduces several new features not available in EJ1:

1. **Data Labels**: Display values directly on sparklines
2. **Range Bands**: Highlight value ranges on Y-axis
3. **Track Line**: Vertical line following cursor
4. **Enhanced Markers**: New marker types and styling options
5. **Custom Tooltips**: More formatting flexibility
6. **Axis Settings**: NEW control over axis lines
7. **Responsive Sizing**: Better percentage-based sizing
8. **Localization**: Full locale support
9. **Accessibility**: WCAG compliance

### Leverage New Features

After migration, consider adding EJ2-exclusive features:

```csharp
@Html.EJS().Sparkline("enhancedChart")
    .DataSource(Model)
    .XName("Month")
    .YName("Revenue")
    .Type(Syncfusion.EJ2.Charts.SparklineType.Area)
    
    // NEW: Data Labels
    .DataLabelSettings(dl => dl
        .Visible(new string[] { "High", "Low" })
        .Format("$${yval}K")
    )
    
    // NEW: Range Bands
    .RangeBandSettings(rbs => rbs
        .StartRange(50000)
        .EndRange(75000)
        .Color("rgba(0, 255, 0, 0.2)")
    )
    
    // NEW: Track Line
    .TooltipSettings(ts => ts
        .Visible(true)
        .TrackLineSettings(tls => tls.Visible(true))
    )
    
    // Existing feature: Markers (enhanced)
    .MarkerSettings(ms => ms
        .Visible(new string[] { "Start", "End", "High", "Low" })
        .Size(4)
        .Border(br => br.Width(1))
    )
    
    .Render()
```

## Gradual Migration Strategy

For large projects, consider gradual migration:

### Phase 1: Update Package and Setup
- Update NuGet to Syncfusion.EJ2.MVC5
- Update Web.config namespace
- Update script CDN links

### Phase 2: Migrate Critical Components
- Migrate highest-visibility sparklines first
- Test thoroughly before moving to production
- Document any customizations needed

### Phase 3: Migrate Remaining Components
- Migrate remaining sparklines systematically
- Run comprehensive testing
- Monitor for any behavioral differences

### Phase 4: Optimize with New Features
- Add new EJ2 features where beneficial
- Improve UX with enhanced markers and labels
- Leverage accessibility improvements

## Troubleshooting Migration Issues

### Issue: "Syncfusion.EJ2 namespace not recognized"
**Solution**: Verify Web.config in Views folder has correct namespace entry

### Issue: "Type 'Syncfusion.EJ2.Charts.SparklineType' not found"
**Solution**: Ensure Syncfusion.EJ2.MVC5 NuGet package is installed

### Issue: Sparkline not rendering
**Solution**: Add `.Render()` at end of sparkline declaration

### Issue: Markers not showing
**Solution**: Set `Visible` to array of marker types: `new string[] { "All" }` instead of `true`

### Issue: Old property names still in code
**Solution**: Check migration reference for property name changes (Width → Size, etc.)

## Performance Considerations

EJ2 offers better performance in several areas:

- **Rendering**: Optimized canvas/SVG rendering
- **Data Handling**: More efficient data binding
- **Memory**: Reduced memory footprint for large datasets
- **Responsive**: Better responsive design support

## Support and Resources

- **Official Migration Guide**: Check Syncfusion documentation
- **Sample Projects**: Review Syncfusion GitHub examples
- **Release Notes**: Reference EJ2 release notes for details
- **Community Forum**: Ask questions in Syncfusion forum

## Migration Completion Checklist

After migration, verify:

- [ ] All sparklines render without errors
- [ ] Data displays correctly
- [ ] Tooltips work as expected
- [ ] Markers display properly
- [ ] Styling matches application design
- [ ] Performance is acceptable
- [ ] No console errors in browser DevTools
- [ ] Mobile/responsive behavior is correct
- [ ] Accessibility features work
- [ ] Localization (if applicable) functions correctly
