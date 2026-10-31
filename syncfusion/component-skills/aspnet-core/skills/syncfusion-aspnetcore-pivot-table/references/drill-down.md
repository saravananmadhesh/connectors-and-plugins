# Drill Down in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Drill Down Basics](#drill-down-basics)
- [Drill Position](#drill-position)
- [Expand All](#expand-all)
- [Expand Specific Members](#expand-specific-members)
- [Best Practices](#best-practices)

## Overview

The drill-down and drill-up features allow users to expand or collapse hierarchical data for detailed or summarized views. When a field member contains child items, expand (+) and collapse (-) icons automatically appear in row or column headers. Clicking these icons expands the member to show children or collapses to show summarized view.

**Key Characteristics:**
- Expand/collapse at specific position (affects only that instance)
- Expand all headers with one setting
- Selective expansion/collapse via drilled members
- Hierarchical navigation without affecting other positions
- Works automatically with hierarchical data

## Drill Down Basics

Drill down is automatic with hierarchical data. Expand icons appear when a field has child members:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Drill Behavior:**
- Expand icons (+) appear in relevant headers
- Click (+) to expand member and show children
- Click (-) to collapse member and hide children
- Values recalculate based on drill state

## Drill Position

Drill-down/drill-up affects only specific member position, not all instances:

```
Example Structure:
├─ FY 2015
│  ├─ Q1     ← Drill down here (expands)
│  ├─ Q2
│  └─ Q3
└─ FY 2016
   ├─ Q1     ← Remains collapsed (independent position)
   ├─ Q2
   └─ Q3
```

**Benefits:**
- Faster rendering with position-specific drilling
- More efficient memory usage
- Each position controlled independently

## Expand All

Expand all members in rows and columns at initialization using `expandAll="true"`:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="true">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Properties:**
- `expandAll="true"` - Expand all members initially
- `expandAll="false"` (default) - Show only top level

**Results:**
- All hierarchies expanded at load
- Shows complete drill-down view
- Useful for comprehensive analysis
- Performance consideration for large datasets

## Expand Specific Members

Expand only certain members using `<e-drilledmembers>`:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-drilledmembers>
            <e-field name="Country" items="@ViewBag.countryMembers"></e-field>
            <e-field name="Year" items="@ViewBag.yearMembers"></e-field>
        </e-drilledmembers>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Backend Code (C#):**
```csharp
public IActionResult Index()
{
    // Members to keep expanded
    ViewBag.countryMembers = new string[] { "USA", "Canada" };
    ViewBag.yearMembers = new string[] { "FY 2015", "FY 2016" };
    
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

**Features:**
- `<e-drilledmembers>` - Container for drilled member configuration
- `<e-field name="Country" items="array">` - Specific members to expand
- Works with rows and columns independently
- Selective expansion for focused analysis

## Best Practices

✓ **Use expandAll for complete overview** - Load all expanded for initial analysis
✓ **Use drilled members for filtered view** - Expand specific members for focused data
✓ **Consider large datasets** - expandAll="true" on 100k+ records increases load time
✓ **Combine with filtering** - Drill into filtered subset of data
✓ **Test performance** - Monitor rendering speed with drill operations
✓ **Enable state persistence** - Save drill state across sessions if needed

❌ **Avoid:** expandAll="true" on mobile with large datasets
❌ **Avoid:** Drilling too many levels without collapsing (memory impact)
❌ **Avoid:** Rapid expand/collapse clicks without defer-update enabled
