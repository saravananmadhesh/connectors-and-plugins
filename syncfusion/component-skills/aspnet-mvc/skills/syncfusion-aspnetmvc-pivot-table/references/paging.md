# Paging in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Paging](#enable-paging)
- [Page Settings](#page-settings)
- [Pager UI](#pager-ui)
- [Pager Position](#pager-position)
- [Inverse Pager](#inverse-pager)
- [Compact View](#compact-view)
- [Show/Hide Pagers](#showhide-pagers)
- [Comparison with Virtual Scrolling](#comparison-with-virtual-scrolling)
- [Best Practices](#best-practices)

## Overview

Paging divides large pivot tables into manageable pages, improving navigation and performance while reducing initial load time. This feature is designed to handle large datasets efficiently by displaying data page-by-page instead of all at once.

**When to use:**
- Large datasets (10,000+ rows)
- Page-by-page navigation preferred
- Memory-constrained environments
- Full-featured editing required
- Report-style presentation

**Important Note:** Paging and Virtual Scrolling features **CANNOT** be enabled simultaneously. Choose one or the other based on your requirements.

## Enable Paging

Enable paging by setting `EnablePaging(true)` and configure page sizes:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePaging(true).PageSettings(ps => ps.RowPageSize(10).ColumnPageSize(5)).Height("450").Width("100%").Render()
```

**Key Properties:**
- `EnablePaging(true)` - Activates paging feature
- `RowPageSize(10)` - Rows displayed per page
- `ColumnPageSize(5)` - Columns displayed per page

**Default Behavior:**
- Pager UI appears at bottom by default
- Shows Previous/Next navigation buttons
- Displays page size dropdown
- Enters page number input box

## Page Settings

Configure paging behavior with detailed settings:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePaging(true).PageSettings(ps => ps.CurrentRowPage(1).CurrentColumnPage(1).RowPageSize(20).ColumnPageSize(10)).Height("450").Width("100%").Render()
```

**Page Settings Properties:**
- `CurrentRowPage(1)` - Initial row page number
- `CurrentColumnPage(1)` - Initial column page number
- `RowPageSize(20)` - Total records per row page
- `ColumnPageSize(10)` - Total records per column page

## Pager UI

The pager UI appears by default at the bottom of the pivot table:

```html
[Row Pager Controls] | [Column Pager Controls]
```

**UI Components:**
- Previous/Next buttons (navigate pages)
- Page size dropdown (select 5, 10, 20, 50)
- Current page input (jump to page)
- Pager info (showing X of Y pages)

**Note:** Pager module must be injected for UI to appear:
```csharp
// Ensure Pager service is available in your project
```

## Pager Position

Control where the pager UI appears using `Position` property in `PagerSettings`:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePaging(true).PageSettings(ps => ps.RowPageSize(10).ColumnPageSize(5)).PagerSettings(prs => prs.Position(PagerPosition.Top)).Height("450").Width("100%").Render()
```

**Position Options:**
- `PagerPosition.Bottom` (default) - Pager appears below pivot table
- `PagerPosition.Top` - Pager appears above pivot table

**Use Case:**
- Top position for mobile layouts
- Top position for better visibility
- Bottom position for traditional reports

## Inverse Pager

Swap the positions of row and column pagers using `IsInversed` property:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePaging(true).PageSettings(ps => ps.RowPageSize(10).ColumnPageSize(5)).PagerSettings(prs => prs.IsInversed(true)).Height("450").Width("100%").Render()
```

**Default Layout:**
```
[Row Pager] ... [Column Pager]
```

**Inverse Layout:**
```
[Column Pager] ... [Row Pager]
```

## Compact View

Display pager in compact mode showing only navigation buttons:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePaging(true).PageSettings(ps => ps.RowPageSize(10).ColumnPageSize(5)).PagerSettings(prs => prs.EnableCompactView(true)).Height("450").Width("100%").Render()
```

**Compact View Features:**
- Shows only Previous/Next buttons
- Hides page dropdown and input box
- Minimal interface for space-constrained layouts
- Cleaner appearance

**Use Cases:**
- Mobile devices
- Embedded dashboards
- Limited screen space
- Simplified interfaces

## Show/Hide Pagers

Control visibility of row and column pagers independently:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).EnablePaging(true).PageSettings(ps => ps.RowPageSize(10).ColumnPageSize(5)).PagerSettings(prs => prs.ShowRowPager(true).ShowColumnPager(false)).Height("450").Width("100%").Render()
```

**Hide Row Pager Only:**
```csharp
.ShowRowPager(false).ShowColumnPager(true)
```

**Hide Both Pagers:**
```csharp
.ShowRowPager(false).ShowColumnPager(false)
```

**Use Cases:**
- Hide row pager if only columns are large
- Hide column pager if only rows are large
- Hide both to show pager programmatically

## Comparison with Virtual Scrolling

| Feature | Paging | Virtual Scrolling |
|---------|--------|-------------------|
| **Navigation** | Page-by-page (click buttons) | Continuous scrolling |
| **Initial Load** | Fast (one page) | Depends on dataset size |
| **Memory Usage** | Lower (one page in memory) | Higher (current+adjacent pages) |
| **Column Width** | Flexible (pixels/percentage) | Pixels only |
| **Column Resizing** | Supported | Not recommended |
| **Ideal Dataset** | 10,000+ rows | 100,000+ rows |
| **UI Features** | Full featured | Limited |
| **Network Bandwidth** | Lower | Higher |
| **User Experience** | Discrete pages | Smooth scrolling |

**Choose Paging if:**
- Dataset fits well in pages
- Full editing features needed
- Memory is constrained
- Column resizing required
- Network bandwidth limited

**Choose Virtual Scrolling if:**
- Continuous exploration preferred
- Column widths are fixed
- Performance is critical
- Smooth scrolling required

## Best Practices

- **Page Size:** Set between 10-50 rows (balance performance/usability)
- **Position:** Use Bottom for most cases, Top for mobile layouts
- **Compact View:** Enable for mobile and space-constrained interfaces
- **Testing:** Test page navigation with various dataset sizes
- **Performance:** Monitor performance with 100,000+ row datasets
- **Accessibility:** Ensure pager controls are keyboard accessible
- **Consistency:** Use same page size across related pivot tables
- **Initial Page:** Set appropriate starting page based on user context
- **Documentation:** Inform users about pagination requirements
- **Alternatives:** Use Virtual Scrolling if continuous scrolling preferred
- **Combinations:** Cannot use with Virtual Scrolling simultaneously
- **Module:** Ensure Pager module is injected for UI to display
