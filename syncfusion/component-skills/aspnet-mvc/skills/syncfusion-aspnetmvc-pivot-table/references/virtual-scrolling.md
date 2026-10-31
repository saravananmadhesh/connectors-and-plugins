# Virtual Scrolling in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Virtual Scrolling](#enable-virtual-scrolling)
- [Single Page Mode](#single-page-mode)
- [Virtual Scrolling with Static Field List](#virtual-scrolling-with-static-field-list)
- [Limitations](#limitations)
- [Comparison with Paging](#comparison-with-paging)
- [Best Practices](#best-practices)

## Overview

Virtual scrolling enables efficient handling of large datasets by rendering only the visible rows and columns in the current viewport. Content refreshes dynamically during vertical or horizontal scrolling, preventing performance degradation with substantial amounts of data. This feature is ideal for datasets with 1000+ rows/columns where rendering everything would cause UI lag.

**When to use:**
- Large datasets (10,000+ rows or 100+ columns)
- Need smooth scrolling without pagination
- Performance is critical
- Users need continuous data exploration

## Enable Virtual Scrolling

Enable virtual scrolling by setting `EnableVirtualization(true)`:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .EnableVirtualization(true)  // Enable virtual scrolling
    .Height("600")  // CRITICAL: Height must be set
    .Width("100%")  // Width should be set
    .GridSettings(gs => gs.ColumnWidth(100))  // CRITICAL: Must be in pixels, not percentage
    .Render()
```

**Critical Properties:**
- `EnableVirtualization(true)` - Activates virtual scrolling
- `Height("600")` - REQUIRED for virtualization to work
- `Width("100%")` - Should be defined
- `ColumnWidth(100)` - MUST be in pixels (not percentage values)

**Default Behavior:**
- Renders current viewport data
- Also loads adjacent previous and next pages
- Smooth transition when scrolling to pre-loaded pages
- Can increase load with large heights/widths

**Important Note:** Virtual scrolling and Paging features **CANNOT** be enabled simultaneously. Choose one or the other based on your requirements.

## Single Page Mode

By default, virtual scrolling renders the current page plus adjacent previous and next pages. While this enables smooth navigation, it increases computational load on large datasets.

To optimize performance, enable single page mode by setting `AllowSinglePage(true)` in `VirtualScrollSettings`:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .EnableVirtualization(true)
    .VirtualScrollSettings(vss => vss.AllowSinglePage(true))  // Only render current page
    .Height("600")
    .Width("100%")
    .GridSettings(gs => gs.ColumnWidth(100))
    .Render()
```

**Single Page Mode Benefits:**
- **Performance:** Faster rendering and initial load
- **Memory:** Less data in memory
- **Operations:** Faster user actions (drill-up, drill-down, sort, filter)

**Performance Impact:**
- 5-10x faster for operations with 10,000+ rows
- Recommended for slow networks or low-end devices
- Slight delay when scrolling to unloaded pages (acceptable trade-off)

**When to Use Single Page Mode:**
- Large datasets (50,000+ rows)
- Low-bandwidth environments
- Mobile devices
- Complex calculations/aggregations

## Virtual Scrolling with Static Field List

Virtual scrolling works automatically with popup Field Lists. However, static (fixed) Field Lists require manual configuration to synchronize with the virtual-scrolling-enabled Pivot Table.

### Setup Steps:

```html
@Html.EJS().PivotFieldList("pivotfieldlist")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Add(); }))
    .RenderMode(Syncfusion.EJ2.PivotView.Mode.Fixed)  // Static Field List
    .Render()

@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Add(); }))
    .EnableVirtualization(true)  // Enable virtualization
    .Height("600")
    .Width("100%")
    .GridSettings(gs => gs.ColumnWidth(100))
    .Render()

<script>
    // Connect Field List to Pivot Table on load
    document.addEventListener('DOMContentLoaded', function() {
        var fieldListObj = document.getElementById('pivotfieldlist').ej2_instances[0];
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        
        if (fieldListObj) {
            fieldListObj.addEventListener('load', function() {
                // Update pivot table with field list report
                pivotObj.dataSourceSettings = fieldListObj.dataSourceSettings;
            });
        }
    });
</script>
```

**Key Points:**
- Set Field List mode to `Fixed` (static display)
- Enable virtualization on Pivot Table
- Synchronize via load event
- Both components share same data source

## Limitations

Virtual scrolling has the following limitations that should be considered:

### 1. Column Width Restrictions
- **Limitation:** `ColumnWidth` in `GridSettings` MUST be in pixels
- **Why:** Percentage values cannot be accurately calculated for virtualization
- **Solution:** Use fixed pixel values (e.g., 100px, 150px)

```html
// CORRECT
.GridSettings(gs => gs.ColumnWidth(100))  // 100 pixels

// INCORRECT - Will not work
.GridSettings(gs => gs.ColumnWidth("50%"))  // Percentage not supported
```

### 2. Layout Features Not Recommended
These features can cause performance issues with virtual scrolling:
- Auto fit column width
- Column resizing
- Text wrapping
- Setting specific column widths via events
- Dynamic row height and column width changes

**Impact:** UI functionality issues and scrolling problems with large datasets

### 3. Grouping Performance
- Grouping takes additional time to split raw items into groups
- Not recommended with virtualization on large datasets
- Can significantly slow down initial rendering

### 4. Date Formatting Performance
- Date formatting takes extra time for conversion
- Date formatting + sorting requires framing full datetime format
- Performance degrades with 10,000+ rows

### 5. OLAP Data Specifics
- Subtotals and grand totals **only display** when measures are in last position of Row or Column axis
- Without measures at end, OLAP data shows without summary totals
- Classic layout has different requirements

### 6. Data Loading Behavior
- Even with virtualization enabled, current + adjacent pages are loaded
- Slightly larger pivots (high width/height) increase data count
- Can affect performance with very large datasets

**Workaround:** Use `AllowSinglePage(true)` to load only current viewport

### 7. Module Requirement
- Requires `VirtualScroll` module injection
- Without module, EnableVirtualization(true) has no effect

## Comparison with Paging

| Feature | Virtual Scrolling | Paging |
|---------|-------------------|--------|
| **User Interaction** | Continuous scroll | Click pagination buttons |
| **Load Time** | All data in memory (current+adjacent) | One page at a time |
| **Performance** | Better for exploration | Better for large datasets |
| **Column Width** | Pixels only | Flexible |
| **Data Limits** | 100,000+ rows | 10,000+ rows per page |
| **Features** | Limited (no auto-fit) | Full featured |
| **Network** | Higher bandwidth | Lower bandwidth |
| **UI Complexity** | ScrollBar Only | Pager UI + ScrollBar |
| **Best For** | Exploration, Analysis | Reports, Tables |

**Choose Virtual Scrolling if:**
- Users need continuous data exploration
- Dataset fits in memory
- Column widths are fixed
- Performance is critical

**Choose Paging if:**
- Users navigate page-by-page
- Need full-featured editing
- Memory is limited
- Column resizing required

## Best Practices

- **Always set Height:** Virtual scrolling requires explicit height property
- **Use Pixel Widths:** Never use percentage for column widths with virtualization
- **Single Page Mode:** Enable for 50,000+ row datasets
- **Avoid Feature Combinations:** Don't use auto-fit, resizing, or text wrapping
- **Test Performance:** Profile with actual data volume before deployment
- **Memory Monitoring:** Watch memory usage with very large datasets
- **Module Injection:** Ensure VirtualScroll module is properly loaded
- **Field List:** Manually synchronize static Field Lists with pivot table
- **OLAP Specifics:** Place measures at end axis for subtotals/grand totals
- **Alternatives:** Use Paging if virtualization limitations are blockers
- **Mobile:** Test thoroughly on mobile devices; consider single-page mode
- **Grouping:** Avoid complex grouping; test before production
