# Frozen Columns (Column Pinning) — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Freeze Left Columns](#freeze-left-columns)
- [Freeze Specific Column](#freeze-specific-column)
- [Freeze Right Columns](#freeze-right-columns)
- [Frozen Rows](#frozen-rows)
- [Frozen with Virtual Scrolling](#frozen-with-virtual-scrolling)

## When to Use This

- Keep header rows visible while scrolling
- Freeze left or right columns
- Maintain context during horizontal scrolling
- Pin important columns for easy reference
- Combine frozen columns with virtual scrolling

---

## Freeze Left Columns

Freeze the first N columns from the left using `frozenColumns`. These columns remain fixed while the rest scroll horizontally:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" frozenColumns="2" height="400">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
        <e-grid-column field="ShipCity" headerText="Ship City" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="120"></e-grid-column>
        <e-grid-column field="ShipCountry" headerText="Ship Country" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

> Frozen columns should not exceed the visible grid viewport count.

## Freeze Specific Column

Freeze a specific column at any index (not just the leftmost) using `isFrozen="true"` on `<e-grid-column>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" height="400">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" isFrozen="true" width="150"></e-grid-column>
        <e-grid-column field="ShipCity" headerText="Ship City" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

Toggle `isFrozen` dynamically:
```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
var col = grid.getColumnByField('CustomerID');
col.isFrozen = true;
grid.refreshColumns();
```

## Freeze Right Columns

Pin columns to the right side using `freeze="Right"` on a column:

```cshtml
<e-grid-column field="Freight" headerText="Freight" freeze="Right" width="120"></e-grid-column>
```

`freeze` property values:
- `Left` — pin to the left (default frozen behavior)
- `Right` — pin to the right
- `Fixed` — fixed in place, not scrollable with either direction

## Frozen Rows

Keep the first N rows fixed at the top using `frozenRows`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" frozenRows="2" height="400">
```

Combine with frozen columns:
```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" frozenColumns="2" frozenRows="3" height="400">
```

## Frozen with Virtual Scrolling

Frozen columns are compatible with column virtualization. Enable both:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          frozenColumns="2" height="400" enableVirtualization="true"
          enableColumnVirtualization="true">
```

> When both frozen columns and touchpad horizontal scroll are active, use the scrollbar instead of two-finger swipe gestures.
