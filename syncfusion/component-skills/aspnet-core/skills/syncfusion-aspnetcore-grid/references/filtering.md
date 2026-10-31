# Filtering — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Filter Bar (Default)](#filter-bar-default)
- [Filter Menu](#filter-menu)
- [Excel-Like Filter](#excel-like-filter)
- [Initial Filter](#initial-filter)
- [Filter by Column Programmatically](#filter-by-column-programmatically)
- [Custom Filter Operators](#custom-filter-operators)
- [Prevent Filtering for a Column](#prevent-filtering-for-a-column)
- [Filtering Events](#filtering-events)

## When to Use This

- Enable filter bar for column filtering
- Use filter menu or Excel-like filter dialogs
- Apply initial filters on grid load
- Filter data programmatically
- Create custom filter operators
- Handle filter-related events

---

## Enable Filtering

Set `allowFiltering="true"`. Configure behavior with `<e-grid-filtersettings>`:

```cshtml
<ejs-grid id="grid" dataSource="@ViewBag.dataSource" allowFiltering="true" height='273px'>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" textAlign="Right" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer Name" width="120"></e-grid-column>       
        <e-grid-column field="Freight" headerText="Freight" format="C2" textAlign="Right" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> To disable filtering for a specific column, set `allowFiltering="false"` on `<e-grid-column>`.

## Filter Bar (Default)

The default filter type is `FilterBar` — a row of input boxes appears below column headers:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filtersettings type="FilterBar"></e-grid-filtersettings>
</ejs-grid>
```

## Filter Menu

Displays a dropdown/popup filter menu on column header click. Set `type="Menu"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filtersettings type="Menu"></e-grid-filtersettings>
</ejs-grid>
```

## Excel-Like Filter

Renders a checkbox list and condition builder, similar to Excel's filter. Set `type="Excel"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filtersettings type="Excel"></e-grid-filtersettings>
</ejs-grid>
```

## Initial Filter

Apply filters on initial render using `<e-filter-columns>` inside `<e-grid-filtersettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filtersettings>
        <e-filter-columns>
            <e-filter-column field="ShipCity" matchCase="false" operator="startswith" predicate="and" value="reims"></e-filter-column>
        </e-filter-columns>
    </e-grid-filtersettings>
</ejs-grid>
```

## Filter by Column Programmatically

Use `filterByColumn()` and `clearFiltering()` JavaScript methods:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];

// Apply filter
grid.filterByColumn('CustomerID', 'startswith', 'A');

// Clear all filters
grid.clearFiltering();

// Clear filter on specific column
grid.clearFiltering(['CustomerID']);
```

## Custom Filter Operators

Override the default filter operator per column using `filterSettings.operators`:

```cshtml
var booleanOperator = new[] {
    new { value = "equal", text = "Equal" },
    new { value = "notEqual", text = "Not Equal" }
};
<e-grid-filterSettings type="Menu" operators="@(new { booleanOperator = booleanOperator })"></e-grid-filterSettings>
```

Available operators: `startswith`, `endswith`, `contains`, `equal`, `notequal`, `greaterthan`, `greaterthanorequal`, `lessthan`, `lessthanorequal`.

## Prevent Filtering for a Column

Set `allowFiltering="false"` on the specific `<e-grid-column>`:

```cshtml
<e-grid-column field="OrderID" headerText="Order ID" allowFiltering="false" width="120"></e-grid-column>
```

## Filtering Events

`actionBegin` and `actionComplete` fire before/after filtering. Detect with `args.requestType === 'filtering'`:

```javascript
function actionBegin(args) {
    if (args.requestType === 'filtering') {
        console.log('Filtering started for:', args.currentFilterObject);
    }
}

function actionComplete(args) {
    if (args.requestType === 'filtering') {
        console.log('Filtering done. Filtered rows:', args.rows.length);
    }
}
```

Assign events on `<ejs-grid>`:
```cshtml
<ejs-grid id="Grid" actionBegin="actionBegin" actionComplete="actionComplete">
```
