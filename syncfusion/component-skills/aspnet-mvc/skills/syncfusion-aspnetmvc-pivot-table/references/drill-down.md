# Drill Down in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Drill Down Basics](#drill-down-basics)
- [Drill Position](#drill-position)
- [Expand All](#expand-all)
- [Expand All for Specific Fields](#expand-all-for-specific-fields)
- [Expand All Except Members](#expand-all-except-members)
- [Expand Specific Members](#expand-specific-members)
- [Drilled Members Configuration](#drilled-members-configuration)
- [Best Practices](#best-practices)

## Overview

The drill-down and drill-up features allow users to expand or collapse hierarchical data for detailed or summarized views. When a field member contains child items, expand and collapse icons automatically appear in row or column headers. Clicking these icons expands the member to show children or collapses to show summarized view. If no child members exist, icons don't appear.

**Key Characteristics:**
- Expand/collapse at specific position (affects only that instance)
- Expand all headers with one setting
- Selective expansion/collapse via drilled members
- Hierarchical navigation without affecting other positions
- Built-in; works automatically every time you expand/collapse

## Drill Down Basics

Drill down is automatic with hierarchical data:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
        rows.Name("State").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
        columns.Name("Quarter").Add();
    })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).Height("450").Width("100%").Render()
```

**Drill Behavior:**
- Expand icons appear in relevant headers
- Click (+) to expand member and show children
- Click (-) to collapse member and hide children
- Values recalculate based on drill state

## Drill Position

Drill-down/drill-up affects only specific member position, not all instances:

```html
// If both FY 2015 and FY 2016 have Q1 as child:
// - Drilling Q1 under FY 2015 expands only that Q1
// - Q1 under FY 2016 remains unchanged (not affected)

Example:
├─ FY 2015
│  ├─ Q1     ← Drill down here
│  ├─ Q2
│  └─ Q3
└─ FY 2016
   ├─ Q1     ← Remains collapsed (independent)
   ├─ Q2
   └─ Q3
```

**Benefits:**
- Pivot table faster with position-specific drilling
- More efficient rendering
- Each position controlled independently

## Expand All

Expand all members in rows and columns at initialization:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
        rows.Name("State").Add();
    })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
    .ExpandAll(true)).Height("450").Width("100%").Render()
```

**Properties:**
- `ExpandAll(true)` - Expand all members initially
- `ExpandAll(false)` (default) - Show only top level

**Results:**
- All hierarchies expanded at load
- Shows complete drill-down view
- Useful for analysis views
- Performance consideration for large datasets

## Expand All for Specific Fields

Expand only certain fields while keeping others collapsed:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").ExpandAll(true).Add();
        rows.Name("State").ExpandAll(false).Add();
    })
    .Columns(columns => {
        columns.Name("Year").ExpandAll(true).Add();
        columns.Name("Quarter").ExpandAll(false).Add();
    })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).Height("450").Width("100%").Render()
```

**Field-Level Control:**
- `.ExpandAll(true)` on specific Row/Column field
- Expands only that field's members
- Other fields unaffected
- Flexible hierarchy expansion

## Expand All Except Members

Expand all except specific members you want collapsed:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
    .ExpandAll(true)
    .DrilledMembers(dm => {
        dm.Name("Country")
            .Items(new[] { "France" })  // Keep France collapsed
            .Add();
    })).Height("450").Width("100%").Render()
```

**Result:**
- All countries expanded except France
- France remains collapsed
- Using `PivotViewDrilledMember` with ExpandAll

## Expand Specific Members

Expand only certain members while keeping others collapsed:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Year").Add(); rows.Name("Quarter").Add(); })
    .Columns(columns => { columns.Name("Country").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
    .DrilledMembers(dm => {
        dm.Name("Year")
            .Items(new[] { "FY 2015", "FY 2016" })  // Expand only these
            .Add();
            
        dm.Name("Quarter")
            .Items(new[] { "Q1" })
            .Delimiter("~~")  // Hierarchical separator for Quarter
            .Add();
    })).Height("450").Width("100%").Render()
```

**Configuration:**
- `DrilledMembers` array specifies members to expand
- Only listed members are expanded
- Others remain collapsed
- Allows fine-grained control

## Drilled Members Configuration

### Properties

**PivotViewDrilledMember Properties:**

```csharp
public class PivotViewDrilledMember
{
    // Field name containing the members
    public string Name { get; set; }
    
    // Array of member names to expand/collapse
    public string[] Items { get; set; }
    
    // Character separating hierarchical members
    public string Delimiter { get; set; }  // Default: "_"
}
```

### Hierarchical Members with Delimiter

For multi-level hierarchies, use delimiter between parent and child:

```html
.DrilledMembers(dm => {
    dm.Name("Country")
        .Items(new[] { "USA", "USA~~California" })  // USA and USA sub-member California
        .Delimiter("~~")
        .Add();
})
```

**Scenario:**
```
Country (Level 1)
  └─ State (Level 2)
      └─ City (Level 3)

// Expand USA and California under USA:
dm.Items(new[] { "USA", "USA~~California" })
```

### Multiple Drilled Members

```html
.DrilledMembers(dm => {
    dm.Name("Year")
        .Items(new[] { "2015", "2016" })
        .Add();
    
    dm.Name("Country")
        .Items(new[] { "USA", "UK" })
        .Add();
})
// Results: Years 2015/2016 expanded, Countries USA/UK expanded
```

## Best Practices

- **Hierarchies:** Organize data in meaningful hierarchies (Country→State→City)
- **Expand All:** Use only for analysis views; impacts performance
- **Position-Based:** Leverage position-based drilling for better performance
- **Granualar Control:** Use DrilledMembers for specific expansion needs
- **Performance:** Limit drill depth on large datasets
- **User Experience:** Start collapsed; let users drill as needed
- **Defaults:** Set sensible defaults per use case (reports vs analysis)
- **Testing:** Test drill behavior with different hierarchy depths
- **Hierarchy Depth:** Avoid more than 4 levels; usability decreases
- **Drill Operations:** Works with filtering, sorting, and other features
- **Hierarchies:** Only works with relational data (not OLAP)
- **Charts:** Drill-down works with pivot charts on row members only
