# Frozen Rows and Columns in ASP.NET MVC Grid

Keep rows or columns always visible while scrolling horizontally or vertically.

## When to Use This

Use this reference when you need to:
- Keep header columns visible during horizontal scrolling
- Freeze specific rows at the top of the grid
- Pin important columns on the left or right side
- Support freeze direction (left, right, fixed)
- Handle frozen cell styling

## Table of Contents
- [Frozen Columns and Rows (Grid-Level)](#frozen-columns-and-rows-grid-level)
- [Freeze Particular Columns (Column-Level)](#freeze-particular-columns-column-level)
- [Freeze Direction (Left / Right / Fixed)](#freeze-direction-left--right--fixed)
- [CSS Class Selectors for Frozen Cells](#css-class-selectors-for-frozen-cells)
- [API Methods](#api-methods)
- [Limitations](#limitations)

## Frozen Columns and Rows (Grid-Level)

Freeze the first N columns and top N rows using grid-level properties:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("410")
    .FrozenColumns(2)
    .FrozenRows(3)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer ID").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
        col.Field("ShipCity").HeaderText("Ship City").Width("150").Add();
        col.Field("ShipCountry").HeaderText("Ship Country").Width("150").Add();
    })
    .Render()
```

- `FrozenColumns(2)` — left 2 columns are frozen
- `FrozenRows(3)` — top 3 rows are frozen

> Frozen rows/columns should not be set outside the grid viewport.

## Freeze Particular Columns (Column-Level)

Use `IsFrozen(true)` on individual columns to freeze them:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("410")
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").IsFrozen(true).Add();
        col.Field("CustomerID").HeaderText("Customer ID").Width("150").IsFrozen(true).Add();
        col.Field("Freight").HeaderText("Freight").Width("120").Add();
        col.Field("ShipCity").HeaderText("Ship City").Width("150").Add();
    })
    .Render()
```

> `IsFrozen` and `FrozenColumns` are not compatible with the `Freeze` direction property.

## Freeze Direction (Left / Right / Fixed)

Freeze specific columns at the **left**, **right**, or as **fixed** (visible during horizontal scroll):

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("410")
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120")
            .Freeze(Syncfusion.EJ2.Grids.FreezeDirection.Left).Add();
        col.Field("CustomerID").HeaderText("Customer ID").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Width("120").Add();
        col.Field("ShipCity").HeaderText("Ship City").Width("150")
            .Freeze(Syncfusion.EJ2.Grids.FreezeDirection.Right).Add();
        col.Field("ShipCountry").HeaderText("Country").Width("150").Add();
    })
    .Render()
```

| Freeze Direction | Description |
|-----------------|-------------|
| `Left` | Freezes column on the left side |
| `Right` | Freezes column on the right side |
| `Fixed` | Locks column at a fixed position, visible during horizontal scroll |

## CSS Class Selectors for Frozen Cells

Use these selectors for styling or querying frozen cells programmatically:

| Selector | Description |
|----------|-------------|
| `.e-leftfreeze` | Left-frozen cells |
| `.e-rightfreeze` | Right-frozen cells |
| `.e-unfreeze` | Movable (non-frozen) cells |

```javascript
// Get left-frozen cells of row at index 1
var leftCells = grid.getRowByIndex(1).querySelectorAll('.e-leftfreeze');
// Get movable cells
var movableCells = grid.getRowByIndex(1).querySelectorAll('.e-unfreeze');
// Get right-frozen cells
var rightCells = grid.getRowByIndex(1).querySelectorAll('.e-rightfreeze');
```

## API Methods

| Method | Description |
|--------|-------------|
| `grid.getRows()` | Get all rows in the grid table |
| `grid.getRowByIndex(index)` | Get a row by its index |
| `grid.getCellFromIndex(rowIndex, colIndex)` | Get a specific cell element |
| `grid.getDataRows()` | Get all viewport data rows |

## Limitations

The following features are **not supported** with frozen rows/columns:

- Detail Template
- Hierarchy Grid
- AutoFill

> Frozen Grid supports row and column virtualization for large datasets.

> When a validation message is shown in a frozen column, scrolling is blocked until the validation is cleared.
