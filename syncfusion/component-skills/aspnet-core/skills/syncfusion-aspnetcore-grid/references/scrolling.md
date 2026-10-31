# Scrolling — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Set Width and Height](#set-width-and-height)
- [Sticky Header](#sticky-header)
- [Virtual Scrolling](#virtual-scrolling)
- [Infinite Scrolling](#infinite-scrolling)

## When to Use This

- Enable horizontal and vertical scrolling
- Implement virtual scrolling for performance
- Use sticky/frozen headers
- Enable infinite scroll for continuous loading
- Handle large datasets efficiently

---

## Set Width and Height

Set `height` and `width` on the grid to enable scrollbars when content overflows:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" height="315" width="400">
```

- Use pixel values (`315`) or `"100%"` for responsive width
- Vertical scrollbar appears when rows exceed height
- Horizontal scrollbar appears when column widths exceed grid width
- Default for both is `auto`

---

## Sticky Header

Keep the column header fixed at the top while scrolling vertically with `enableStickyHeader="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" height="400" enableStickyHeader="true">
```

---

## Virtual Scrolling

Render only visible rows in the DOM for large datasets — significantly improves performance. Enable with `enableVirtualization="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" height="400" enableVirtualization="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

**Column Virtual Scrolling** — for many columns, enable with `enableColumnVirtualization="true"`:
```cshtml
<ejs-grid id="Grid" height="400" enableVirtualization="true" enableColumnVirtualization="true">
```

> Virtual scrolling requires `height` to be set. Works best when `pageSize` in `pageSettings` is large enough to fill the visible area.

---

## Infinite Scrolling

Load more records as the user scrolls down (append mode, no jump in scroll position). Enable with `enableInfiniteScrolling="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" height="400" enableInfiniteScrolling="true">
    <e-grid-pagesettings pageSize="50"></e-grid-pagesettings>
</ejs-grid>
```

**Key differences vs virtual scrolling:**
| Feature | Virtual Scrolling | Infinite Scrolling |
|---|---|---|
| DOM rows | Only visible | Accumulates all loaded rows |
| Scroll position | Can jump | Smooth continuous |
| Best for | Very large static data | Incremental data loading |

> Set `pageSize` large enough in `pageSettings` to control how many records load per scroll batch.
