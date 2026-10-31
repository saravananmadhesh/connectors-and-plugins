# Grouping — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Grouping](#enable-grouping)
- [Initial Grouping](#initial-grouping)
- [Group by Column Programmatically](#group-by-column-programmatically)
- [Caption Template](#caption-template)
- [Lazy Load Grouping](#lazy-load-grouping)
- [Aggregate Values in Group Rows](#aggregate-values-in-group-rows)
- [Grouping Events](#grouping-events)

## When to Use This

- Group data by one or multiple columns
- Create expandable/collapsible group rows
- Display aggregate values in groups
- Customize group caption templates
- Implement lazy loading for group data

---

## Enable Grouping

Set `allowGrouping="true"`. Users drag a column header to the grouping drop area above the grid:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowGrouping="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="ShipCity" headerText="Ship City" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Initial Grouping

Pre-group columns on load using `<e-grid-groupsettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowGrouping="true">
    <e-grid-groupsettings columns="@(new string[] {"CustomerID","Freight"})"></e-grid-groupsettings>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

---

## Group by Column Programmatically

Use `groupColumn()` and `ungroupColumn()` methods:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.groupColumn('CustomerID');
grid.ungroupColumn('CustomerID');
```

---

## Caption Template

Customize the group caption row using `captionTemplate` in `groupSettings`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowGrouping="true">
    <e-grid-groupsettings captionTemplate="#captiontemplate"></e-grid-groupsettings>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>

<script id="captiontemplate" type="text/x-template">
    <span class="groupItems">
        ${field} - ${key}: ${count} items
    </span>
</script>
```

Template receives: `field`, `key`, `count`, `headerText`, `foreignKey`, `data`.

---

## Lazy Load Grouping

Load grouped child records on demand (expand) to improve performance with large datasets. Set `enableLazyLoading="true"` in `groupSettings`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowGrouping="true">
    <e-grid-groupsettings enableLazyLoading="true" columns="@(new string[] {"ProductName", "CustomerName"})"></e-grid-groupsettings>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

---

## Aggregate Values in Group Rows

Show aggregate (sum, count, etc.) in the group caption or footer rows. Define inside `<e-grid-aggregates>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowGrouping="true">
    <e-grid-aggregates>
        <e-grid-aggregate>
            <e-aggregate-columns>
                <e-aggregate-column field="Freight" type="Sum" groupFooterTemplate="Sum: ${Sum}"></e-aggregate-column>                        
            </e-aggregate-columns>
        </e-grid-aggregate>
    </e-grid-aggregates>
    <e-grid-groupsettings showDropArea="false" columns="@(new string[] {"ShipCountry"})"></e-grid-groupsettings>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

---

## Grouping Events

Detect grouping/ungrouping actions:

```javascript
function actionBegin(args) {
    if (args.requestType === 'grouping') {
        console.log('Grouping by:', args.columnName);
    }
    if (args.requestType === 'ungrouping') {
        console.log('Ungrouping:', args.columnName);
    }
}
```
