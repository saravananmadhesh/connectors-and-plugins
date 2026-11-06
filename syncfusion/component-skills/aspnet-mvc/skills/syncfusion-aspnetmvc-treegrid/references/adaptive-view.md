# Adaptive View in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Responsive Design](#responsive-design)
- [Detail Template](#detail-template)
- [Responsive CSS](#responsive-css)
- [Touch Interaction](#touch-interaction)
- [Responsive Toolbar](#responsive-toolbar)

## When to Use This

Use adaptive view features when you need to:
- Create mobile-friendly tree grid layouts
- Optimize grid display for tablets and smartphones
- Enable touch gestures for expand/collapse operations
- Adapt column visibility based on screen size
- Provide detail templates for mobile devices

## Responsive Design

### Enable Responsive Layout

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableAdaptiveUI(true)         // Responsive for mobile
    .EnableRtl(false)
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").MinWidth("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("150").MinWidth("80").Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").MinWidth("80").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").MinWidth("80").Add();
    })
    .Render()
```

Tree Grid automatically adapts columns based on screen size.

### Mobile Optimization

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableAdaptiveUI(true)
    .AllowPaging(true)
    .PageSettings(ps => ps.PageSize(10))
    .AllowFiltering(true)
    .AllowSorting(true)
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("100").MinWidth("50").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").MinWidth("100").Add();
        col.Field("Status").HeaderText("Status").Width("120").MinWidth("80").Add();
    })
    .Render()
```

**Mobile Behaviors:**
- Columns wrap to next line if space limited
- Touch scrolling enabled
- Paging optimized for tap interaction
- Collapsible rows for better readability

## Responsive CSS

### Media Queries

```html
<style>
/* Desktop */
@media (min-width: 1200px) {
    #TreeGrid {
        font-size: 14px;
    }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) {
    #TreeGrid {
        font-size: 13px;
    }
}

/* Mobile */
@media (max-width: 767px) {
    #TreeGrid {
        font-size: 12px;
    }
    
    .e-grid .e-headercell,
    .e-grid .e-rowcell {
        padding: 8px 4px;
    }
    
    .e-grid .e-detailcell {
        padding: 15px;
    }
}
</style>
```

## Responsive Toolbar

### Responsive Toolbar Items

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .EnableAdaptiveUI(true)
    .Toolbar(new List<object> {
        new { text = "Add", prefixIcon = "e-icons e-add", id = "grid_add" },
        new { text = "Edit", prefixIcon = "e-icons e-edit", id = "grid_edit" },
        new { type = "Separator" },
        new { text = "Search", prefixIcon = "e-icons e-search", id = "grid_search" },
        new { type = "Separator" },
        new { text = "Export", prefixIcon = "e-icons e-export-excel", id = "grid_export" }
    })
    .Render()
```

On mobile, toolbar items automatically collapse into a menu.
