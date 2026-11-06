# Globalization & RTL — Syncfusion ASP.NET MVC Block Editor

## Localization

Set the `Locale` property to any supported culture code to display localized UI strings (placeholders, tooltips, button labels).

```razor
@Html.EJS().BlockEditor("block-editor").Locale("de").Render()
```

The default locale is `en` (English).

### Full Localization Key Reference

| Key | Default (English) Text |
|---|---|
| `paragraph` | `Write something or '/' for commands.` |
| `heading1` | `Heading 1` |
| `heading2` | `Heading 2` |
| `heading3` | `Heading 3` |
| `heading4` | `Heading 4` |
| `collapsibleParagraph` | `Collapsible Paragraph` |
| `collapsibleHeading1` | `Collapsible Heading 1` |
| `collapsibleHeading2` | `Collapsible Heading 2` |
| `collapsibleHeading3` | `Collapsible Heading 3` |
| `collapsibleHeading4` | `Collapsible Heading 4` |
| `bulletList` | `Add item` |
| `numberedList` | `Add item` |
| `checklist` | `Todo` |
| `callout` | `Write a callout` |
| `addIconTooltip` | `Click to insert below` |
| `dragIconTooltipActionMenu` | `Click to open` |
| `dragIconTooltip` | `(Hold to drag)` |
| `insertLink` | `Insert Link` |
| `linkText` | `Text` |
| `linkTextPlaceholder` | `Link text` |
| `linkUrl` | `URL` |
| `linkUrlPlaceholder` | `https://example.com` |
| `linkTitle` | `Title` |
| `linkTitlePlaceholder` | `Link title` |
| `linkOpenInNewWindow` | `Open in new window` |
| `linkInsert` | `Insert` |
| `linkRemove` | `Remove` |
| `linkCancel` | `Cancel` |
| `codeCopyTooltip` | `Copy code` |

### German Culture Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor")
        .Blocks((List<BlockModel>)ViewBag.BlocksData)
        .Locale("de")
        .Render()
</div>
```

```csharp
public ActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "block-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object> { new { contentType = "Text", content = "Beispiel Überschrift" } }
        },
        new BlockModel
        {
            id = "block-2",
            blockType = "Paragraph",
            content = new List<object> { new { contentType = "Text", content = "Beispiel Absatz." } }
        },
        new BlockModel
        {
            id = "block-3",
            blockType = "Paragraph"
            // Empty paragraph shows localized placeholder text
        }
    };
    ViewBag.BlocksData = blocks;
    return View();
}
```

---

## RTL (Right-to-Left) Layout

Set `EnableRtl(true)` to flip the editor layout and text direction for right-to-left languages (Arabic, Hebrew, etc.):

```razor
@Html.EJS().BlockEditor("block-editor").EnableRtl(true).Render()
```

### RTL with Locale

Combine both for a fully localized RTL experience:

```razor
@Html.EJS().BlockEditor("block-editor")
    .Blocks((List<BlockModel>)ViewBag.BlocksData)
    .EnableRtl(true)
    .Locale("ar")
    .Render()
```

> RTL affects the overall editor layout direction, drag handles, menus, and toolbar alignment. Individual block content direction follows the browser's directionality handling for the supplied text.
