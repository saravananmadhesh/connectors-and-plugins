# Aggregates in ASP.NET MVC Grid

Aggregates display summary values (Sum, Average, Min, Max, Count) in footer, group footer, and group caption rows. Configure using the `Aggregates` builder with `Field` and `Type` as minimum required properties.

## When to Use This

Use this reference when you need to:
- Display sum, average, min, or max values in grid footers
- Show aggregate values for grouped data
- Add custom aggregate functions
- Enable reactive aggregates in batch editing mode

## Table of Contents
- [Enable Aggregates](#enable-aggregates)
- [Built-in Aggregate Types](#built-in-aggregate-types)
- [Footer Aggregate](#footer-aggregate)
- [Group Footer Aggregate](#group-footer-aggregate)
- [Group Caption Aggregate](#group-caption-aggregate)
- [Multiple Aggregates for a Column](#multiple-aggregates-for-a-column)
- [Custom Aggregate](#custom-aggregate)
- [Reactive Aggregates (Batch Editing)](#reactive-aggregates-batch-editing)

## Enable Aggregates

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Columns(col => {
        col.Field("OrderID").HeaderText("Order ID").Width("120").Add();
        col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
        col.Field("ShipCountry").HeaderText("Ship Country").Width("150").Add();
    })
    .Aggregates(gridAggregation => {
        gridAggregation.Columns(new List<Syncfusion.EJ2.Grids.GridAggregateColumn>() {
            new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = "Sum", FooterTemplate = "Sum: ${Sum}" }
        }).Add();
    })
    .Render()
```

## Built-in Aggregate Types

| Type | Description |
|------|-------------|
| `Sum` | Total of all values in the column |
| `Average` | Average of all values |
| `Min` | Minimum value |
| `Max` | Maximum value |
| `Count` | Count of all values |
| `TrueCount` | Count of `true` boolean values |
| `FalseCount` | Count of `false` boolean values |

## Footer Aggregate

Displayed in the grid footer row. Uses `FooterTemplate`. Access value via `${Sum}`, `${Average}`, etc.

```cshtml
gridAggregation.Columns(new List<Syncfusion.EJ2.Grids.GridAggregateColumn>() {
    new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = "Sum", FooterTemplate = "Sum: ${Sum}" },
    new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = "Average", FooterTemplate = "Avg: ${Average}" }
}).Add();
```

**Format the aggregate value** using the `Format` property on `AggregateColumn`:

```cshtml
new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = "Sum", Format = "C2", FooterTemplate = "Sum: ${Sum}" }
```

**Place aggregate on top of grid** using the `DataBound` event with `getHeaderContent()` and `getFooterContent()` methods.

## Group Footer Aggregate

Displayed at the bottom of each group. Uses `GroupFooterTemplate`. Requires `AllowGrouping(true)`.

```cshtml
gridAggregation.Columns(new List<Syncfusion.EJ2.Grids.GridAggregateColumn>() {
    new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = "Sum", GroupFooterTemplate = "Sum: ${Sum}" }
}).Add();
```

> Access the value inside template using the `Type` name: e.g., `${Sum}`, `${Average}`.
> To show aggregates for all data (not just current page), set `GroupSettings.DisablePageWiseAggregates(true)`.

## Group Caption Aggregate

Displayed in the group caption row. Uses `GroupCaptionTemplate`.

```cshtml
gridAggregation.Columns(new List<Syncfusion.EJ2.Grids.GridAggregateColumn>() {
    new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = "Average", GroupCaptionTemplate = "Avg: ${Average}" }
}).Add();
```

## Multiple Aggregates for a Column

Specify `Type` as an array to show multiple aggregate values for the same column:

```cshtml
new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "Freight", Type = new string[]{"Sum","Average"}, FooterTemplate = "Sum: ${Sum}, Avg: ${Average}" }
```

## Custom Aggregate

Set `Type` to `"Custom"` and provide a JavaScript function name in `CustomAggregate`:

```cshtml
new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "ShipCountry", Type = "Custom", CustomAggregate = "customAggregateFn", FooterTemplate = "Distinct: ${Custom}" }
```

```javascript
function customAggregateFn(data, column) {
    // data = entire dataset for footer, group data for group aggregates
    var distinct = [...new Set(data.result.map(r => r[column.field]))];
    return distinct.length;
}
```

> Access custom value in template using `${Custom}`.

## Reactive Aggregates (Batch Editing)

In batch editing mode, aggregate values auto-refresh on every cell save. For inline/dialog mode, manually call `grid.aggregates[0].refresh(data)` inside the editor's input event.

```javascript
document.getElementById('Freight').addEventListener('input', function(e) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    var val = parseFloat(e.target.value) || 0;
    grid.aggregates[0].refresh(val);
});
```
