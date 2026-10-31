# Grouping in ASP.NET MVC Grid

Group records by one or more columns. Grouped rows are expandable/collapsible. Enable with `AllowGrouping(true)`.

## When to Use This

Use this reference when you need to:
- Group grid data by one or more columns
- Customize group caption templates
- Show group aggregates
- Enable lazy loading for large group datasets
- Manage group expand/collapse events

## Table of Contents
- [Enable Grouping](#enable-grouping)
- [Initial Grouped Columns](#initial-grouped-columns)
- [GroupSettings Properties](#groupsettings-properties)
- [Group Programmatically](#group-programmatically)
- [Caption Template](#caption-template)
- [Disable Grouping for Specific Column](#disable-grouping-for-specific-column)
- [Lazy Load Grouping](#lazy-load-grouping)
- [Group with Aggregates](#group-with-aggregates)
- [Group Expand/Collapse Events](#group-expandcollapse-events)

## Enable Grouping

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        col.Field("ShipCity").HeaderText("Ship City").Width("150").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
    })
    .AllowGrouping(true)
    .Render()
```

## Initial Grouped Columns

Pre-group by columns on load:

```cshtml
.AllowGrouping(true)
.GroupSettings(group => group.Columns(new List<string> { "CustomerID" }))
```

## GroupSettings Properties

| Property | Description |
|----------|-------------|
| `Columns` | Array of column fields to group on load |
| `ShowGroupedColumn` | Keep grouped column visible (default: false) |
| `ShowToggleButton` | Show group toggle button in column headers |
| `ShowUngroupButton` | Show ungroup button in group header (default: true) |
| `ShowDropArea` | Show group drop area at top (default: true) |
| `EnableLazyLoadGroup` | Enable lazy loading for groups |
| `DisablePageWiseAggregates` | Calculate aggregates for all pages |

```cshtml
.GroupSettings(group => group
    .ShowGroupedColumn(true)
    .ShowToggleButton(true)
    .Columns(new List<string> { "ShipCity" })
)
```

## Group Programmatically

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.groupColumn('CustomerID');    // group by a column
grid.ungroupColumn('CustomerID'); // ungroup
grid.clearGrouping();             // clear all groups
```

## Caption Template

Customize the group caption row using `CaptionTemplate`:

```cshtml
.GroupSettings(group => group
    .CaptionTemplate("#captiontemplate")
)

<script id="captiontemplate" type="text/x-template">
    <span class="groupItems">
        ${field} - ${key}: ${count} items
    </span>
</script>
```

Available template variables: `${field}`, `${key}`, `${count}`, `${headerText}`, `${foreignKey}`.

## Disable Grouping for Specific Column

```cshtml
col.Field("OrderID").AllowGrouping(false).Add();
```

## Lazy Load Grouping

For large datasets, load group child data on demand (expand action):

```cshtml
.AllowGrouping(true)
.GroupSettings(group => group.EnableLazyLoadGroup(true))
.DataSource(ds => ds.Url("/Home/DataSource").Adaptor("UrlAdaptor"))
```

The server must handle `isLazyLoad` in the request and return group data with child items.

## Group with Aggregates

Combine grouping with footer/caption aggregates. See [aggregates.md](aggregates.md) for configuration.

```cshtml
.AllowGrouping(true)
.GroupSettings(group => group.DisablePageWiseAggregates(true)) // aggregates across all pages
.Aggregates(gridAggregation => { gridAggregation.Columns(new List<Syncfusion.EJ2.Grids.GridAggregateColumn>() { new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Format = "C2", Type = "Sum", GroupFooterTemplate = "Sum: ${Sum}" } }).Add(); })
```

## Group Expand/Collapse Events

```cshtml
.ActionBegin("onActionBegin")
```

```javascript
function onActionBegin(args) {
    if (args.requestType === 'grouping') {
        console.log('Grouping by:', args.columnName);
    }
    if (args.requestType === 'ungrouping') {
        console.log('Ungrouping:', args.columnName);
    }
}
```
