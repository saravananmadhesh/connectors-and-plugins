# Cell Features — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Cell Template](#cell-template)
- [QueryCellInfo Event](#querycellinfo-event)
- [Custom Cell Attributes](#custom-cell-attributes)
- [Cell Tooltip](#cell-tooltip)
- [Cell Formatting](#cell-formatting)
- [Clip Mode for Overflow Text](#clip-mode-for-overflow-text)

## When to Use This

- Customize cell content with templates
- Apply cell-level styling and formatting
- Handle cell events and interactions
- Create rich, interactive cell experiences
- Display tooltips and custom attributes

---

## Cell Template

Render custom HTML inside a column's cells using `template`:

Define the template as a script block:
```html
<script id="columnTemplate" type="text/x-template">
    <div class="status-badge ${Verified ? 'active' : 'inactive'}">
        ${Verified ? 'Active' : 'Inactive'}
    </div>
</script>
```

Reference in column:
```cshtml
<e-grid-column field="Verified" headerText="Status" template="#columnTemplate" width="120"></e-grid-column>
```

---

## QueryCellInfo Event

Customize cell rendering dynamically using the `queryCellInfo` event. It fires for every cell rendered:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" queryCellInfo="queryCellInfoFn">
```

```javascript
function queryCellInfoFn(args) {
    if (args.column.field === 'Freight' && args.data.Freight > 100) {
        args.cell.style.backgroundColor = '#ffcccc';
        args.cell.style.color = '#cc0000';
        args.cell.style.fontWeight = 'bold';
    }
}
```

---

## Custom Cell Attributes

Add HTML attributes (class, style, data attributes) to cells using `customAttributes` on `<e-grid-column>`:

```cshtml
<e-grid-column field="Freight" headerText="Freight"
               customAttributes="@(new { @class = "freight-cell" })"
               width="120"></e-grid-column>
```

```css
.e-grid .freight-cell {
    font-weight: bold;
    color: #007bff;
}
```

---

## Cell Tooltip

Show tooltip when hovering over a cell using `queryCellInfo` to set the `title` attribute:

```javascript
function queryCellInfoFn(args) {
    args.cell.setAttribute('title', args.data[args.column.field]);
}
```

Or use the `EllipsisWithTooltip` clip mode to auto-show tooltips for truncated content.

---

## Cell Formatting

Apply number/date/currency formatting via the `format` property on columns:

```cshtml
<e-grid-column field="Freight" format="C2" textAlign="Right" width="120"></e-grid-column>
<e-grid-column field="OrderDate" format="yMd" width="150"></e-grid-column>
```

Custom format using `format` object:
```cshtml
<e-grid-column field="Freight"
               format="@(new Syncfusion.EJ2.Grids.GridColumnFormat { Format = "C2", UseGrouping = true })"
               textAlign="Right" width="120">
</e-grid-column>
```

---

## Clip Mode for Overflow Text

Control how cell content behaves when it overflows the column width:

| `clipMode` | Behavior |
|---|---|
| `Clip` | Truncates text — no indicator |
| `Ellipsis` | Shows `...` when text overflows |
| `EllipsisWithTooltip` | Shows `...` + tooltip with full text on hover |

```cshtml
<e-grid-column field="ShipAddress" headerText="Address"
               clipMode="EllipsisWithTooltip" width="150"></e-grid-column>
```
