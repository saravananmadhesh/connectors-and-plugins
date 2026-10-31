# Scrolling in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Scroll Configuration](#scroll-configuration)

## When to Use This

Use scrolling features when you need to:
- Display large datasets with thousands of rows efficiently
- Implement on-demand data loading for better performance
- Create infinite scroll experiences
- Set fixed grid heights with scrollable content
- Optimize memory usage for hierarchical data

## Scroll Configuration

### Set Grid Height

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Height("400px")                    // Fixed height with scrollbar
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()
```

### Horizontal Scrolling

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Height("500px")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("150").Add();
        col.Field("TaskName").HeaderText("Task Name").Width("250").Add();
        col.Field("StartDate").HeaderText("Start Date").Width("150").Add();
        col.Field("EndDate").HeaderText("End Date").Width("150").Add();
        col.Field("Duration").HeaderText("Duration").Width("150").Add();
        col.Field("Status").HeaderText("Status").Width("150").Add();
        col.Field("Priority").HeaderText("Priority").Width("150").Add();
    })
    .Render()
```

Horizontal scrollbar appears when total column width exceeds grid width.
