# Scrolling in ASP.NET MVC Grid

Configure horizontal/vertical scrolling, virtual scrolling, and infinite scrolling for large datasets.

## When to Use This

Use this reference when you need to:
- Enable scrolling for large datasets
- Implement virtual scrolling for performance
- Use infinite scrolling with lazy loading
- Freeze headers while scrolling
- Configure scroll events

## Table of Contents
- [Basic Scrolling](#basic-scrolling)
- [Freeze Rows/Columns with Scrolling](#freeze-rowscolumns-with-scrolling)
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)
- [Scroll to Specific Row/Column](#scroll-to-specific-rowcolumn)
- [Sticky Header](#sticky-header)
- [Scroll Events](#scroll-events)

## Basic Scrolling

Set `Height` and `Width` to enable scrollbars when content overflows:

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("400")
    .Width("100%")
    .Columns(col => { /* ... */ })
    .Render()
```

Use `"auto"` for height to fit the viewport.

## Freeze Rows/Columns with Scrolling

Freeze header while scrolling vertically (default behavior when `Height` is set). For frozen columns see [columns.md](columns.md).

## Virtual Scrolling

Render only visible rows for high-performance rendering of large datasets. Rows are rendered on-demand as the user scrolls.

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("400")
    .EnableVirtualization(true)   // virtual row scrolling
    .EnableColumnVirtualization(true)  // optional: virtual column scrolling
    .PageSettings(page => page.PageSize(50))
    .Columns(col => { /* ... */ })
    .Render()
```

> `PageSize` in virtual scrolling determines how many rows are loaded per batch. Set it to a reasonably large number (e.g., 40–100).

**Supported features in virtual scrolling:** Sorting, filtering, grouping (with limitations), editing, selection, Excel/PDF export.

**Limitations:**
- Row template and detail template are not supported
- Frozen rows not supported with column virtualization
- `rowHeight` must be set for accurate virtual scroll calculation

## Infinite Scrolling

Load data in chunks as the user scrolls to the bottom. Unlike virtual scrolling, already-rendered rows stay in DOM.

```cshtml
@Html.EJS().Grid("Grid").DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Height("400")
    .EnableInfiniteScrolling(true)
    .PageSettings(page => page.PageSize(30))
    .Columns(col => { /* ... */ })
    .Render()
```

**Cache mode** — keep rendered rows instead of removing them:
```cshtml
.InfiniteScrollSettings(inf => inf.EnableCache(true))
```

**Initial preloaded pages:**
```cshtml
.InfiniteScrollSettings(inf => inf.InitialBlocks(3))
```

**Limitations:**
- Grouping not supported
- Row drag-and-drop not supported
- Row template not supported
- Batch editing not supported

## Scroll to Specific Row/Column

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.getContent().firstElementChild.scrollTop = 500;  // scroll vertically by px
grid.getContent().firstElementChild.scrollLeft = 200; // scroll horizontally
```

## Sticky Header

The header remains visible when scrolling vertically — this is the default when `Height` is set.

## Scroll Events

No dedicated scroll event, but use native scroll event:

```javascript
document.querySelector('#Grid .e-content').addEventListener('scroll', function(e) {
    console.log('Scrolled to:', e.target.scrollTop);
});
```
