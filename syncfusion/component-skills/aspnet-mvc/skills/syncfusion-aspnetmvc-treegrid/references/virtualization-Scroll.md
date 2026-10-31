# Virtualization in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Row Virtualization](#row-virtualization)
- [Column Virtualization](#column-virtualization)
- [Configuration Examples](#configuration-examples)
- [Lazy Loading](#lazy-loading)
- [Limitations](#limitations)
- [Notes & References](#notes--references)

## When to Use This

Use virtualization when you need to:
- Render and interact with very large data sets efficiently
- Reduce DOM size and improve scrolling/render performance
- Load rows or columns on demand while keeping UI responsive
- Preserve expand/collapse state while rendering subsets of data

## Row Virtualization

Row virtualization renders only rows visible in the viewport and appends rows while scrolling. Enable it with `EnableVirtualization(true)` and set a fixed `Height` for the grid container.

```cshtml
@Html.EJS().TreeGrid("DefaultFunctionalities")
    .DataSource((IEnumerable<object>)ViewBag.datasource)
    .Columns(col => { /* columns */ })
    .Height(400)
    .ChildMapping("Children")
    .TreeColumnIndex(1)
    .EnableVirtualization(true)
    .Render()
```

Key points:
- Buffer rows are maintained beyond the visible viewport.
- Expand/collapse state for child records is persisted.

## Column Virtualization

Column virtualization renders only the columns visible in the horizontal viewport and loads others on demand. Enable with `EnableVirtualization(true)` and `EnableColumnVirtualization(true)`. Column widths must be specified (pixel values preferred).

```cshtml
@Html.EJS().TreeGrid("DefaultFunctionalities")
    .EnableVirtualization(true)
    .EnableColumnVirtualization(true)
    .Columns(col => { /* many columns each with Width(px) */ })
    .Render()
```

## Configuration Examples

- Ensure column `Width` is defined for column virtualization; unspecified widths default to 200px.
- Set a static height for the grid or its parent when using row virtualization.
- For varied row heights (templates), virtualization may not work reliably; prefer fixed row height.

## Lazy Loading

### Load Rows On Demand

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(50))
    .Height("500px")
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
    })
    .Render()
```

With paging, rows load only when navigating to a new page.

### Lazy Load Child Data

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ChildMapping("Children")
    .ExpandStateMapping("Expanded")
    .Expanding("onRowExpanding")
    .ChildMapping("Children")
    .Render()

<script>
function onRowExpanding(args) {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Load child data from server when expanding
    if (!args.data.Children || args.data.Children.length === 0) {
        // Fetch from API
        fetch('/api/tasks/' + args.data.TaskID + '/children')
            .then(r => r.json())
            .then(data => {
                args.data.Children = data;
                grid.refresh();
            });
    }
}
</script>
```

## Limitations

Row virtualization is not compatible with:
- Batch editing
- Checkbox selection
- Detail template
- Row template
- Rowspan
- Autofill
- Cell-based selection is not supported

Column virtualization limitations:
- Column widths must be pixel values (percentage not accepted)
- Selected column details and selection only persist within the viewport
- Ctrl+Home / Ctrl+End not supported
- Not compatible with: Colspan, Batch editing, Checkbox selection, Infinite scrolling, Stacked headers, Row template, Detail template, Autofill, Column chooser

## Notes & References
- Use virtualization for large datasets (10k+ rows) to improve performance.
- When increasing row height, set a uniform row height via CSS (e.g., `.e-treegrid .e-row { height: 2em; }`).
