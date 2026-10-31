# Toolbar

This document covers toolbar configuration, types, and customization for the Rich Text Editor.

> **Related Documentation:**
> - For complete toolbar properties including `ToolbarSettings`, `QuickToolbarSettings`, `ShowTooltip`, see [properties.md](properties.md)
> - For toolbar manipulation methods including `enableToolbarItem()`, `disableToolbarItem()`, `removeToolbarItem()`, see [methods.md](methods.md)
> - For toolbar-related events including `ActionBegin`, `ActionComplete`, `BeforeQuickToolbarOpen`, see [events.md](events.md)

## Table of Contents
- [Toolbar Types](#toolbar-types)
- [Built-in Toolbar Items Reference](#built-in-toolbar-items-reference)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Position](#toolbar-position)
- [Quick Toolbars](#quick-toolbars)
- [Enable / Disable Toolbar Items Programmatically](#enable--disable-toolbar-items-programmatically)

---

## Toolbar Types

Configure the toolbar type using the `Type` field in `ToolbarSettings`. The default type is `Expand`.

### Expand (Default)

Overflowing toolbar items are hidden behind an expand arrow:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Type(ToolbarType.Expand).Items((object)ViewBag.items))
    .Value(ViewBag.value)
    .Render())
```

### MultiRow

All toolbar items are shown across multiple rows — nothing is hidden:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Type(ToolbarType.MultiRow).Items((object)ViewBag.items))
    .Render())
```

### Scrollable

Toolbar items overflow horizontally with a scroll; all items remain accessible:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Type(ToolbarType.Scrollable).Items((object)ViewBag.items))
    .Render())
```

### Popup (Balloon)

Overflowing items appear in a popup dropdown:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Type(ToolbarType.Popup).Items((object)ViewBag.items))
    .Render())
```

---

## Configuring Toolbar Items

> **IMPORTANT:** Always configure toolbar items in the **Controller via ViewBag**, not hardcoded in the View. Pass the list using `(object)ViewBag.items` cast:

**Controller (Correct Pattern):**
```csharp
public ActionResult Index()
{
    ViewBag.tools = new object[] {
        "Bold", "Italic", "Underline", "|",
        "FontColor", "BackgroundColor", "|",
        "OrderedList", "UnorderedList", "Image", "Blockquote", "|",
        "Undo", "Redo"
    };
    ViewBag.value = "<p>Your content</p>";
    return View();
}
```

**View (Correct Pattern):**
```cshtml
@(Html.EJS().RichTextEditor("editor")
    .ToolbarSettings(e => e.Items((object)ViewBag.tools))
    .Value(ViewBag.value)
    .Render())
```

❌ **Incorrect Pattern (Do NOT do this):**
```cshtml
<!-- WRONG - Don't hardcode items in View -->
.ToolbarSettings(e => e.Items(new object[] { "Bold", "Italic" }))
```

---

## Built-in Toolbar Items Reference

### Text Formatting
| Item Name | Description |
|-----------|-------------|
| `Bold` | Bold text |
| `Italic` | Italic text |
| `Underline` | Underline text |
| `StrikeThrough` | Strikethrough text |
| `InlineCode` | Inline code (Markdown mode) |
| `SuperScript` | Superscript |
| `SubScript` | Subscript |
| `UpperCase` | Convert to uppercase |
| `LowerCase` | Convert to lowercase |
| `FontName` | Font family picker |
| `FontSize` | Font size picker |
| `FontColor` | Font color picker |
| `BackgroundColor` | Background color picker |

### Paragraph / Structure
| Item Name | Description |
|-----------|-------------|
| `Formats` | Paragraph format (Heading 1–6, Normal, etc.) |
| `Alignments` | Text alignment (left, center, right, justify) |
| `OrderedList` | Numbered list |
| `UnorderedList` | Bullet list |
| `Outdent` | Decrease indent |
| `Indent` | Increase indent |
| `Blockquote` | Blockquote |

### Insert
| Item Name | Description |
|-----------|-------------|
| `CreateLink` | Insert hyperlink |
| `Image` | Insert image |
| `Video` | Insert video |
| `Audio` | Insert audio |
| `CreateTable` | Insert table |
| `FileManager` | Open file browser |
| `EmojiPicker` | Insert emoji |

### Tools
| Item Name | Description |
|-----------|-------------|
| `ClearFormat` | Remove all formatting |
| `FormatPainter` | Copy formatting |
| `Print` | Print content |
| `SourceCode` | Toggle HTML source view |
| `FullScreen` | Toggle full screen |
| `Undo` | Undo |
| `Redo` | Redo |

### AI Assistant
| Item Name | Description |
|-----------|-------------|
| `AICommands` | Predefined AI prompt menu |
| `AIQuery` | Custom AI query popup (also Alt+Enter) |

### Separators
| Value | Description |
|-------|-------------|
| `"|"` | Vertical separator line |
| `"-"` | Horizontal separator (MultiRow) |

---

## Custom Toolbar Items

Add a custom button to the toolbar using the `template` field:

```csharp
// In controller
object previewBtn = new {
    tooltipText = "Preview",
    template = "<button id='preview-code' class='e-tbar-btn e-control e-btn e-icon-btn'>" +
               "<span class='e-btn-icon e-md-preview e-icons'></span></button>"
};

ViewBag.items = new object[] {
    "Bold", "Italic", "|", previewBtn, "Undo", "Redo"
};
```

**Handling click on a custom button in JavaScript:**

```javascript
document.getElementById('preview-code').addEventListener('click', function (e) {
    // your custom logic
});
```

---

## Toolbar Position

Display the toolbar at the bottom of the editor instead of the top:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.EnableFloating(false).Position(ToolbarPosition.Bottom).Items((object)ViewBag.items))
    .Render())
```

**Floating toolbar** (sticks to the top of the viewport while scrolling):

```cshtml
.ToolbarSettings(e => e.EnableFloating(true).Items((object)ViewBag.items))
```

---

## Quick Toolbars

Quick toolbars are context-sensitive mini-toolbars that appear when a user clicks on an image, link, or table. They are configured via `QuickToolbarSettings`.

### Best Practice: Using ViewBag Configuration

Always configure quick toolbar items in the **Controller via ViewBag**, then pass them to the View. This follows the same pattern as main toolbar items.

**Controller Pattern (Recommended):**

```csharp
public ActionResult Index()
{
    ViewBag.items = new[] { "Image", "CreateLink", "CreateTable", "Undo", "Redo" };
    
    // Image quick toolbar
    ViewBag.Image = new[] {
        "Replace", "Align", "Caption", "Remove", "|",
        "InsertLink", "OpenImageLink", "EditImageLink", "RemoveImageLink", "|",
        "Display", "AltText", "Dimension"
    };
    
    // Link quick toolbar
    ViewBag.Link = new[] {
        "Open", "Edit", "UnLink"
    };
    
    // Table quick toolbar
    ViewBag.Table = new[] {
        "TableHeader", "TableRemove", "|",
        "TableRows", "TableColumns", "TableCell", "|", 
        "TableEditProperties", "TableCellProperties", "Styles", 
        "BackgroundColor", "Alignments", "TableCellVerticalAlign"
    };
    
    return View();
}
```

**View Pattern (Recommended):**

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .QuickToolbarSettings(q => q
        .Image((object)ViewBag.Image)
        .Link((object)ViewBag.Link)
        .Table((object)ViewBag.Table)
    )
    .ToolbarSettings(e => e.Items((object)ViewBag.items))
    .Render())
```

### Inline Configuration (Alternative)

If you prefer to configure inline without ViewBag:

**Image quick toolbar:**

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .QuickToolbarSettings(q => q.Image(new[] { 
        "Replace", "Align", "Caption", "Remove", "|",
        "InsertLink", "OpenImageLink", "EditImageLink", "RemoveImageLink", "|", 
        "Display", "AltText", "Dimension" 
    }))
    .Render())
```

**Link quick toolbar:**

```cshtml
.QuickToolbarSettings(q => q.Link(new[] { "Open", "Edit", "UnLink" }))
```

**Table quick toolbar:**

```cshtml
.QuickToolbarSettings(q => q.Table(new[] { 
    "TableHeader", "TableRemove", "|", 
    "TableRows", "TableColumns", "TableCell", "|", 
    "TableEditProperties", "TableCellProperties", "Styles", 
    "BackgroundColor", "Alignments", "TableCellVerticalAlign" 
}))
```

### Quick Toolbar Item Reference

**Image toolbar items:** Replace, Align, Caption, Remove, InsertLink, OpenImageLink, EditImageLink, RemoveImageLink, Display, AltText, Dimension

**Link toolbar items:** Open, Edit, UnLink

**Table toolbar items:** TableHeader, TableRemove, TableRows, TableColumns, TableCell, TableEditProperties, TableCellProperties, Styles, BackgroundColor, Alignments, TableCellVerticalAlign

> For detailed quick toolbar configuration and available items, see [tables-links.md](tables-links.md) and [insert-media.md](insert-media.md).



---

## Enable / Disable Toolbar Items Programmatically

```javascript
var rteObj;

// Get RTE instance after render
document.addEventListener('DOMContentLoaded', function() {
    rteObj = document.getElementById('rte').ej2_instances[0];
});

// Disable specific items
rteObj.disableToolbarItem(["Bold", "Italic", "Image"]);

// Re-enable them
rteObj.enableToolbarItem(["Bold", "Italic", "Image"]);
```

> This is commonly used in Markdown mode when toggling between edit view and preview view — disable all formatting items when preview is active.
