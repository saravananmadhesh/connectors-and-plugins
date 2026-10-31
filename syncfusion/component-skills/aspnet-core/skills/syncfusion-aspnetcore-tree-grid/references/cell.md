# Cell Customization — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [queryCellInfo — Per-Cell Customization](#querycellinfo--per-cell-customization)
- [Custom Cell Attributes](#custom-cell-attributes)
- [Auto Text Wrap](#auto-text-wrap)
- [Clip Mode](#clip-mode)
- [Grid Lines](#grid-lines)
- [HTML Encoding](#html-encoding)

---

## When to Use This Skill

Use this reference when you need to:
- Apply conditional formatting to individual cells
- Set custom CSS classes or styles per cell
- Handle cell overflow with clipping, ellipsis, or tooltips
- Enable text wrapping for long cell content
- Configure grid border/line display
- Safely render HTML content in cells
- Add custom attributes or metadata to cells

---

## Overview

Customize individual cells using the `queryCellInfo` event, custom CSS attributes, text wrapping, and clip mode settings.

---

## queryCellInfo — Per-Cell Customization

The `queryCellInfo` event fires for every cell during rendering. Use it to apply conditional CSS classes, styles, or inject HTML:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" queryCellInfo="onQueryCellInfo">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onQueryCellInfo(args) {
        // Highlight cells where Duration > 5
        if (args.column.field === 'Duration' && args.data['Duration'] > 5) {
            args.cell.style.color = 'red';
            args.cell.style.fontWeight = 'bold';
        }
        // Add a CSS class for High priority
        if (args.column.field === 'Priority' && args.data['Priority'] === 'High') {
            args.cell.classList.add('high-priority');
        }
    }
</script>
```

```css
.high-priority {
    background-color: #ffd6d6;
}
```

---

## Custom Cell Attributes

Set static CSS classes or styles on all cells in a column using `customAttributes`:

```cshtml
<e-treegrid-column field="Priority" headerText="Priority" width="120"
    customAttributes="@(new { class = "priority-cell" })">
</e-treegrid-column>
```

---

## Auto Text Wrap

Enable automatic text wrapping so long cell content wraps to multiple lines:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" allowTextWrap="true">
    <e-treegrid-textwrapsettings wrapMode="Header"></e-treegrid-textwrapsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="150"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

`wrapMode` values:
- `Both` — Wrap both header and content
- `Header` — Wrap header only
- `Content` — Wrap content only

> Text wrapping is NOT compatible with row virtual scrolling (row heights must be uniform for virtualization).

---

## Clip Mode

Control how overflow text is handled in a cell:

| Clip Mode | Behavior |
|-----------|----------|
| `Clip` | Clips overflowing text |
| `Ellipsis` | Shows `...` for overflow |
| `EllipsisWithTooltip` | Shows `...` and a tooltip with full content |

```cshtml
<e-treegrid-column field="TaskName" headerText="Task Name" width="150"
    clipMode="EllipsisWithTooltip"></e-treegrid-column>
```

---

## Grid Lines

Control which borders are shown:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" gridLines="Both">
    ...
</ejs-treegrid>
```

`gridLines` values: `Default`, `Both`, `None`, `Horizontal`, `Vertical`

