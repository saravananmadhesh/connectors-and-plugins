# Adaptive Layout — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Adaptive UI](#enable-adaptive-ui)
- [Adaptive Dialog Mode](#adaptive-dialog-mode)
- [Pager Position](#pager-position)
- [Column Chooser in Adaptive Mode](#column-chooser-in-adaptive-mode)

## When to Use This

- Create responsive grids for mobile, tablet, and desktop devices
- Automatically adapt layout based on screen size
- Optimize user experience across different device types
- Enable touch-friendly interfaces for mobile users

---

## Enable Adaptive UI

Enable adaptive/responsive rendering for mobile and small screens with `enableAdaptiveUI="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          allowSorting="true" allowFiltering="true" allowPaging="true"
          enableAdaptiveUI="true">
    <e-grid-pagesettings pageSize="5"></e-grid-pagesettings>
    <e-grid-filtersettings type="Excel"></e-grid-filtersettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

When adaptive UI is active:
- Columns not visible in the viewport are hidden
- A filter icon appears in the header to open filter dialogs
- Sorting is handled via column header tap/click
- Editing opens in a full-screen dialog

---

## Adaptive Dialog Mode

In adaptive mode, filtering and editing open as dialog popups (full screen on mobile):

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          enableAdaptiveUI="true" allowFiltering="true">
    <e-grid-filtersettings type="Excel"></e-grid-filtersettings>
    <e-grid-editSettings allowEditing="true" allowAdding="true" allowDeleting="true" mode="Dialog"></e-grid-editSettings>
</ejs-grid>
```

> Excel-like filter type is recommended for adaptive mode as it renders better on small screens.

---

## Pager Position

In adaptive mode, move the pager to the top of the grid with `rowRenderingMode`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          enableAdaptiveUI="true" allowPaging="true"
          rowRenderingMode="Vertical">
    <e-grid-pagesettings pageSize="5"></e-grid-pagesettings>
</ejs-grid>
```

`rowRenderingMode` options:
- `Horizontal` (default) — normal row layout
- `Vertical` — each row renders as a card-style vertical list, ideal for mobile

---

## Column Chooser in Adaptive Mode

The Column Chooser also adapts to a dialog in adaptive mode:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          enableAdaptiveUI="true"
          showColumnChooser="true"
          toolbar="@(new List<string>() { "ColumnChooser" })">
</ejs-grid>
```

> Use adaptive UI when the grid is embedded in a responsive layout or displayed on mobile devices. It automatically adjusts interactions (filtering, editing, sorting) to touch-friendly dialogs.
