# Adaptive UI in ASP.NET MVC Grid

Render the grid optimized for small screens using adaptive dialogs and vertical row rendering.

## When to Use This

Use this reference when you need to:
- Make the grid responsive on mobile devices
- Display grids in full-screen dialogs on small screens
- Render rows vertically instead of horizontally
- Optimize the user experience for touch-enabled devices

## Table of Contents
- [Enable Adaptive UI](#enable-adaptive-ui)
- [Vertical Row Rendering](#vertical-row-rendering)
- [Adaptive Only for Mobile](#adaptive-only-for-mobile)
- [Column Menu in Adaptive](#column-menu-in-adaptive-horizontal-mode-only)
- [Adaptive Dialog Behavior](#adaptive-dialog-behavior)

## Enable Adaptive UI

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .EnableAdaptiveUI(true)
    .AllowSorting(true)
    .AllowFiltering(true)
    .FilterSettings(f => f.Type(Syncfusion.EJ2.Grids.FilterType.Excel))
    .EditSettings(edit => edit.AllowAdding(true).AllowEditing(true).AllowDeleting(true).Mode(Syncfusion.EJ2.Grids.EditMode.Dialog))
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel", "Search" })
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()
```

When `EnableAdaptiveUI` is `true`, filter, sort, and edit dialogs render **full-screen** on small devices.

## Vertical Row Rendering

Render rows vertically (each field on a separate line) instead of horizontally:

```cshtml
@Html.EJS().Grid("Grid")
    .EnableAdaptiveUI(true)
    .RowRenderingMode(Syncfusion.EJ2.Grids.RowDirection.Vertical)
    .Columns(col => { /* ... */ })
    .Render()
```

> `EnableAdaptiveUI(true)` is required for vertical row rendering.

**Supported features in vertical mode:**
- Paging (including page size dropdown)
- Sorting, Filtering, Selection
- Dialog Editing, Aggregates
- Infinite scroll
- Toolbar: Add, Filter, Sort, Edit, Delete, Search, toolbar template

**Not supported in vertical mode:** Column Menu (only available in Horizontal mode)

## Adaptive Only for Mobile

Render adaptive layout only on mobile screen sizes (not desktop):

```cshtml
@Html.EJS().Grid("Grid")
    .EnableAdaptiveUI(true)
    .AdaptiveUIMode(Syncfusion.EJ2.Grids.AdaptiveMode.Mobile)  // default: Both
    .Columns(col => { /* ... */ })
    .Render()
```

| AdaptiveUIMode | Description |
|----------------|-------------|
| `Both` (default) | Adaptive on both mobile and desktop |
| `Mobile` | Adaptive only on mobile screen sizes |

## Column Menu in Adaptive (Horizontal Mode Only)

The column menu (grouping, sorting, autofit, filter, column chooser) is only available in **Horizontal** `RowRenderingMode`.

## Adaptive Dialog Behavior

- Filter dialogs open full-screen
- Sort dialog shows all columns for sort configuration
- Edit dialog expands to full screen
- Toolbar shows a three-dot overflow menu for ColumnChooser, Print, PdfExport, ExcelExport
