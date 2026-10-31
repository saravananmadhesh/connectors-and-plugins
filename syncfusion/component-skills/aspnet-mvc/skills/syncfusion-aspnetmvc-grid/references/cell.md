# Cell in ASP.NET MVC Grid

Customize the appearance and behavior of individual grid cells.

## When to Use This

Use this reference when you need to:
- Render HTML or custom content in cells
- Apply conditional cell styling based on data values
- Wrap long text in cells
- Handle cell overflow with tooltips
- Add custom CSS classes to specific columns

## Table of Contents
- [Display HTML Content](#display-html-content)
- [AutoWrap Cell Content](#autowrap-cell-content)
- [Clip Mode](#clip-mode)
- [Customize Cell Styles](#customize-cell-styles)
- [Custom Tooltip for Cells](#custom-tooltip-for-cells)
- [Key Cell Properties on Columns](#key-cell-properties-on-columns)
- [Events](#events)

## Display HTML Content

By default, HTML tags are encoded (displayed as text) to prevent XSS. Set `DisableHtmlEncode(false)` on a column to render HTML markup:

```cshtml
col.Field("Description").HeaderText("Description").DisableHtmlEncode(false).Width("200").Add();
```

To toggle at runtime:
```javascript
function toggleHtml(enable) {
    var grid = document.getElementById("Grid").ej2_instances[0];
    grid.getColumns()[1].disableHtmlEncode = !enable;
    grid.refreshColumns();
}
```

> Set `EnableHtmlSanitizer(true)` on the grid to sanitize content even when HTML encoding is disabled.

## AutoWrap Cell Content

Wrap long cell text to the next line when it exceeds column width:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .AllowTextWrap(true)
    .TextWrapSettings(tw => tw.WrapMode(Syncfusion.EJ2.Grids.WrapMode.Content))
    .Columns(col => {
        col.Field("CustomerID").HeaderText("Customer").Width("120").Add();
        col.Field("ShipAddress").HeaderText("Address").Width("150").Add();
    })
    .Render()
```

| WrapMode | Description |
|----------|-------------|
| `Both` (default) | Wraps both header and content cells |
| `Header` | Wraps only header cells |
| `Content` | Wraps only content cells |

## Clip Mode

Control how overflowing cell content is displayed:

```cshtml
col.Field("Invention").HeaderText("Invention").Width("150")
    .ClipMode(Syncfusion.EJ2.Grids.ClipMode.EllipsisWithTooltip).Add();
```

| ClipMode | Description |
|----------|-------------|
| `Clip` | Truncates overflowing content |
| `Ellipsis` (default) | Shows `...` when content overflows |
| `EllipsisWithTooltip` | Shows `...` and a tooltip with full content on hover |

## Customize Cell Styles

### Using QueryCellInfo Event

Apply conditional styles to cells based on data values:

```cshtml
@Html.EJS().Grid("Grid").QueryCellInfo("queryCellInfo").Columns(col => {
    col.Field("Freight").HeaderText("Freight").Format("C2").Width("120").Add();
}).Render()

<script>
function queryCellInfo(args) {
    if (args.column.field === 'Freight') {
        if (args.data['Freight'] < 30) {
            args.cell.classList.add('below-30');
        } else if (args.data['Freight'] < 80) {
            args.cell.classList.add('below-80');
        } else {
            args.cell.classList.add('above-80');
        }
    }
}
</script>

<style>
.below-30 { background-color: #e6f4ea; }
.below-80 { background-color: #fff3cd; }
.above-80 { background-color: #fde8e8; }
</style>
```

### Using CSS Classes

Apply styles globally using built-in CSS selectors:

```css
/* Style all row cells */
.e-grid td.e-rowcell {
    font-family: 'Segoe UI';
}

/* Style selected cell background */
.e-grid td.e-cellselectionbackground {
    background: #9ac5ee;
    font-style: italic;
}
```

### Using CustomAttributes Property

Apply a CSS class to all cells in a specific column:

```cshtml
col.Field("ShipCity").HeaderText("Ship City").Width("120")
    .CustomAttributes(new { @class = "custom-css" }).Add();
```

```css
.custom-css {
    background: #d7f0f4;
    font-style: italic;
    color: navy;
}
```

### Using Methods

Customize cells programmatically using grid methods:

```javascript
function dataBound() {
    var grid = document.getElementById("Grid").ej2_instances[0];

    // Customize a header cell
    var header = grid.getHeaderContent().querySelector('[e-mappinguid]');
    // Apply style to specific cell at row 1, column 2
    var cell = grid.getCellFromIndex(1, 2);
    if (cell) {
        cell.style.background = '#fffde7';
    }
}
```

## Custom Tooltip for Cells

Wrap the grid in a Syncfusion Tooltip and target `.e-rowcell`:

```cshtml
@Html.EJS().Tooltip("Tooltip").Target(".e-rowcell").ContentTemplate(@<div>
    @Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Columns(col => {
            col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
            col.Field("CustomerID").HeaderText("Customer").Width("150").Add();
        })
        .Render();
</div>).BeforeRender("beforeRender").Render()
```

```javascript
function beforeRender(args) {
    var tooltip = document.getElementById("Tooltip").ej2_instances[0]
    if (args.target.classList.contains('e-rowcell')) {
        // event triggered before render the tooltip on target element.
        tooltip.content = 'The value is "' + args.target.innerText + '" ';
    }
}
```

## Key Cell Properties on Columns

| Property | Description |
|----------|-------------|
| `DisableHtmlEncode(bool)` | Render or encode HTML in cell content |
| `CustomAttributes(object)` | Apply CSS class or inline styles |
| `ClipMode(ClipMode)` | Control text overflow behavior |
| `AllowTextWrap(bool)` | Enable text wrapping (grid-level) |
| `WrapMode` | `Both` / `Header` / `Content` |
| `EnableHtmlSanitizer(bool)` | Sanitize HTML even when encoding is off (grid-level) |

## Events

| Event | Trigger |
|-------|---------|
| `QueryCellInfo` | Fired for each content cell when rendered |
| `HeaderCellInfo` | Fired for each header cell when rendered |
| `DataBound` | Fired after grid data is bound |
