# Tables and Links

## Table of Contents
- [Insert Tables](#insert-tables)
- [Table Quick Toolbar](#table-quick-toolbar)
- [Table Styling and Properties](#table-styling-and-properties)
- [Insert Links](#insert-links)
- [Link Quick Toolbar](#link-quick-toolbar)

---

## Insert Tables

Add `CreateTable` to the toolbar to enable table insertion:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] {
        "Bold", "Italic", "|", "CreateTable", "|", "Undo", "Redo"
    }))
    .Value(ViewBag.value)
    .Render())
```

Users can insert a table by:
1. Clicking the **Table** toolbar button
2. Dragging across the grid to select row × column count

The inserted table is a standard HTML `<table>` element inside the editor content.

---

## Table Quick Toolbar

The quick toolbar appears when a user clicks inside a table. Customize it via `QuickToolbarSettings`:

### Using ViewBag Configuration (Recommended)

Configure table toolbar items in the Controller and pass to the view:

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    ViewBag.items = new[] { "CreateTable" };
    ViewBag.Table = new[] {
        "TableHeader", "TableRemove", "|", 
        "TableRows", "TableColumns", "TableCell", "|", 
        "TableEditProperties", "TableCellProperties", "Styles", 
        "BackgroundColor", "Alignments", "TableCellVerticalAlign"
    };
    ViewBag.value = @"<h2>Discover the Table's Powerful Features</h2><p>Your content here...</p>";
    return View();
}
```

**View (Index.cshtml):**
```cshtml
@(Html.EJS().RichTextEditor("table")
    .QuickToolbarSettings(e => { e.Table((object)ViewBag.Table); })
    .ToolbarSettings(e => { e.Items((object)ViewBag.items); })
    .Value(ViewBag.value)
    .Render())
```

### Inline Configuration

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .QuickToolbarSettings(q => q.Table(new[] {
        "TableHeader",
        "TableRemove",
        "|",
        "TableRows",
        "TableColumns",
        "TableCell",
        "|",
        "TableEditProperties",
        "TableCellProperties",
        "Styles",
        "BackgroundColor",
        "Alignments",
        "TableCellVerticalAlign"
    }))
    .ToolbarSettings(e => e.Items((object)new[] { "CreateTable" }))
    .Render()
```

**Available table quick toolbar items:**

| Item | Description |
|------|-------------|
| `TableHeader` | Toggle header row |
| `TableRemove` | Delete the entire table |
| `TableRows` | Insert/delete rows |
| `TableColumns` | Insert/delete columns |
| `TableCell` | Merge/split cells |
| `TableEditProperties` | Edit table properties (width, height, border, etc.) |
| `TableCellProperties` | Edit cell properties (padding, background, etc.) |
| `Styles` | Apply border and cell styles |
| `BackgroundColor` | Set cell background color |
| `Alignments` | Align content (left, center, right, justify) |
| `TableCellVerticalAlign` | Vertical alignment (top, middle, bottom) |
| `\|` | Separator/divider for grouping items |

---

## Table Styling and Properties

**Set default table width:**

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .TableSettings(t => t.Width("100%").MinWidth(0).MaxWidth(null).AllowResize(true))
    .Render())
```

**Enable table cell selection highlighting:**

```cshtml
.TableSettings(t => t.EnableCellBackground(true))
```

---

## Insert Links

Add `CreateLink` to the toolbar:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] {
        "Bold", "Italic", "|", "CreateLink", "|", "Undo", "Redo"
    }))
    .Render())
```

Users insert a link by:
1. Selecting text (or placing cursor)
2. Clicking **Link** in the toolbar
3. Entering URL, display text, and optional title in the dialog

The link dialog also has a checkbox to open the link in a new tab (`target="_blank"`).

---

## Link Quick Toolbar

A quick toolbar appears when the user clicks on a link. Customize it via `QuickToolbarSettings`.

### Using ViewBag Configuration (Recommended)

Configure link toolbar items in the Controller and pass to the view:

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    ViewBag.items = new[] { "CreateLink" };
    ViewBag.Link = new[] {
        "Open", "Edit", "UnLink"
    };
    ViewBag.value = @"<p><a href='https://example.com'>Example Link</a></p>";
    return View();
}
```

**View (Index.cshtml):**
```cshtml
@(Html.EJS().RichTextEditor("link")
    .QuickToolbarSettings(e => { e.Link((object)ViewBag.Link); })
    .ToolbarSettings(e => { e.Items((object)ViewBag.items); })
    .Value(ViewBag.value)
    .Render())
```

### Inline Configuration

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .QuickToolbarSettings(q => q.Link(new[] { "Open", "Edit", "UnLink" }))
    .ToolbarSettings(e => e.Items((object)new[] { "CreateLink" }))
    .Render())
```

**Available link quick toolbar items:**

| Item | Description |
|------|-------------|
| `Open` | Open the URL in a new tab |
| `Edit` | Reopen link edit dialog |
| `UnLink` | Remove the hyperlink (keep text) |
