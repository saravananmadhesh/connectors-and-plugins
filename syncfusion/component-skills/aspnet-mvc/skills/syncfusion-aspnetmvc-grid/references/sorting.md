# Sorting in ASP.NET MVC Grid

Sort grid records by clicking column headers or programmatically via API.

## When to Use This

Use this reference when you need to:
- Enable sorting on grid columns
- Configure multi-column sorting
- Set initial sort order
- Implement custom sort comparers
- Handle sort events
- Remove sorting programmatically

## Table of Contents
- [Enable Sorting](#enable-sorting)
- [Initial Sorting](#initial-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Disable Sorting for a Column](#disable-sorting-for-a-column)
- [Programmatic Sorting](#programmatic-sorting)
- [Custom Sort Comparer](#custom-sort-comparer)
- [Customize Sort Icon](#customize-sort-icon)
- [Sort Order](#sort-order)
- [Sort Events](#sort-events)

## Enable Sorting

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowSorting(true)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("OrderDate").HeaderText("Order Date").Format("yMd").Width("130").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .Render()
```

- Click a column header to sort ascending
- Click again to sort descending
- Third click removes the sort

## Initial Sorting

Apply sorting on first render using `SortSettings.Columns`:

```cshtml
@Html.EJS().Grid("Grid").AllowSorting(true)
    .SortSettings(sort => sort
        .Columns(cols => {
            cols.Field("OrderID").Direction(Syncfusion.EJ2.Grids.SortDirection.Ascending).Add();
            cols.Field("CustomerID").Direction(Syncfusion.EJ2.Grids.SortDirection.Descending).Add();
        })
    )
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
    })
    .Render()
```

## Multi-Column Sorting

Enable multi-column sorting (Ctrl+Click):

```cshtml
@Html.EJS().Grid("Grid")
    .AllowSorting(true)
    .AllowMultiSorting(true)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("ShipCity").HeaderText("Ship City").Width("150").Add();
    })
    .Render()
```

- Hold **Ctrl** + click column headers to sort multiple columns
- **Shift + left click** removes sort for a specific column

## Disable Sorting for a Column

```cshtml
col.Field("CustomerID").HeaderText("Customer").Width("150").AllowSorting(false).Add();
```

## Programmatic Sorting

```javascript
var grid = document.getElementById("Grid").ej2_instances[0];

// Sort a single column
grid.sortColumn('OrderID', 'Ascending');

// Sort multiple columns
grid.sortColumn('CustomerID', 'Descending', true);  // 3rd param = isMultiSort

// Clear all sorting
grid.clearSorting();

// Remove sort for a specific column
grid.removeSortColumn('OrderID');
```

## Custom Sort Comparer

Define a custom sort function for a column (works like `Array.sort` comparer):

```cshtml
col.Field("CustomerID").HeaderText("Customer").Width("150")
    .SortComparer("customSortComparer").Add();
```

```javascript
function customSortComparer(reference, comparer) {
    // Custom alphabetical comparison
    if (reference < comparer) return -1;
    if (reference > comparer) return 1;
    return 0;
}
```

**Always put nulls at the bottom:**

```javascript
function nullAlwaysAtBottomComparer(reference, comparer) {
    var sortDirection = this.sortDirection;
    if (reference === null || reference === undefined) {
        return sortDirection === 'Ascending' ? 1 : 1;
    }
    if (comparer === null || comparer === undefined) {
        return sortDirection === 'Ascending' ? -1 : -1;
    }
    if (reference < comparer) return -1;
    if (reference > comparer) return 1;
    return 0;
}
```

## Customize Sort Icon

Override the sort icons via CSS:

```css
.e-grid .e-icon-ascending::before {
    content: '\e306';  /* custom ascending icon */
}
.e-grid .e-icon-descending::before {
    content: '\e304';  /* custom descending icon */
}
```

## Sort Order

Default sort cycle: **Ascending → Descending → None** (3rd click clears sort)

## Sort Events

| Event | Description |
|-------|-------------|
| `ActionBegin` | Fires before sorting (requestType: "sorting") |
| `ActionComplete` | Fires after sort is applied |

```javascript
function actionBegin(args) {
    if (args.requestType === 'sorting') {
        console.log('Sort field:', args.columnName);
        console.log('Direction:', args.direction);
        // Cancel sort: args.cancel = true;
    }
}
```
