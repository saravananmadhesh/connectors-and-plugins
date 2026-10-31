# Sorting in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Enable Sorting](#enable-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [Initial Sorting](#initial-sorting)
- [Prevent Sorting](#prevent-sorting)
- [Custom Sort Comparer](#custom-sort-comparer)
- [Sort Null Values](#sort-null-values)
- [Sort Columns Externally](#sort-columns-externally)
- [Sorting Events](#sorting-events)

## When to Use This

- Enable sorting by clicking column headers
- Implement multi-column sorting
- Set initial sort order
- Create custom sort comparers
- Handle sort events

## Overview

Sorting enables users to arrange data in ascending or descending order by clicking column headers. It supports single-column and multi-column sorting with custom sort logic.

## Enable Sorting

Set `allowSorting="true"` on the grid. Click a column header to toggle Ascending → Descending → None:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> To disable sorting for a specific column, set `allowSorting="false"` on `<e-grid-column>`.

## Multi-Column Sorting

Hold **Ctrl** and click multiple column headers to sort by more than one column. Enable with `allowMultiSorting="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true" allowMultiSorting="true">
    <e-grid-columns>
        <e-grid-column field="ShipCountry" headerText="Ship Country" width="150"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> Clear multi-column sort on a single column: **Shift + left click** the column header.

## Initial Sorting

Apply sorting on first render via `<e-grid-sortsettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true" allowMultiSorting="true">
    <e-grid-sortsettings>
        <e-sort-columns>
            <e-sort-column field="OrderDate" direction="Descending"></e-sort-column>
            <e-sort-column field="CustomerID" direction="Ascending"></e-sort-column>
        </e-sort-columns>
    </e-grid-sortsettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" format="yMd" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

## Prevent Sorting

To prevent sorting for a specific column, set `allowSorting="false"`:

```cshtml
<e-grid-column field="OrderID" headerText="Order ID" allowSorting="false" width="120"></e-grid-column>
```

## Custom Sort Comparer

Define a `sortComparer` JavaScript function on the column for custom sort logic:

```html
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true">
    <e-grid-columns>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150" sortComparer="customSort"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    function customSort(a, b) {
        // Return: positive (ascending), negative (descending), 0 (equal)
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
</script>
```

## Sort Null Values

To sort null values at the bottom regardless of sort direction:

```html
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true">
    <e-grid-columns>
        <e-grid-column field="Freight" headerText="Freight" sortComparer="sortNullValues"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    function sortNullValues(a, b) {
        if (a == null || a === '') return 1;
        if (b == null || b === '') return -1;
        return a < b ? -1 : a > b ? 1 : 0;
    }
</script>
```

## Sort Columns Externally

Use JavaScript methods to programmatically control sorting:

```html
<button onclick="addSort()">Sort by OrderID</button>
<button onclick="removeSort()">Remove Sort</button>
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true"></ejs-grid>

<script>
    var grid = document.getElementById('Grid').ej2_instances[0];
    
    function addSort() {
        grid.sortColumn('OrderID', 'Ascending', true);  // columnName, direction, isMultiSort
    }
    
    function removeSort() {
        grid.clearSorting();
    }
</script>
```

## Sorting Events

Use `actionBegin` and `actionComplete` events for sorting:

```html
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowSorting="true" actionBegin="onActionBegin" actionComplete="onActionComplete"></ejs-grid>

<script>
    function onActionBegin(args) {
        if (args.requestType === 'sorting') {
            console.log('Before sorting:', args.data);
        }
    }
    
    function onActionComplete(args) {
        if (args.requestType === 'sorting') {
            console.log('Sorting complete');
        }
    }
</script>
```

```

**Clear all sorts:**
```javascript
grid.clearSorting();
```

---

## Sorting Events

`actionBegin` fires before sorting; `actionComplete` fires after. Use `args.requestType === 'sorting'` to detect:

Cancel sorting in `actionBegin`:
```javascript
function actionBegin(args) {
    if (args.requestType === 'sorting' && args.columnName === 'OrderID') {
        args.cancel = true;
    }
}
```

---

## Customize Sort Icon

Override default CSS classes `.e-icon-ascending` and `.e-icon-descending`:

```css
.e-grid .e-icon-ascending::before {
    content: '\e306';
}
.e-grid .e-icon-descending::before {
    content: '\e304';
}
```
