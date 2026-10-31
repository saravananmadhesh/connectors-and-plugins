# Editor Menus — Syncfusion ASP.NET MVC Block Editor

## Table of Contents
- [Slash Command Menu](#slash-command-menu)
- [Context Menu](#context-menu)
- [Block Action Menu](#block-action-menu)
- [Inline Toolbar](#inline-toolbar)

---

## Slash Command Menu

The slash command menu opens when a user types `/` in a block. It allows inserting or transforming blocks via keyboard.

### Built-in Commands

Headings (H1–H4), Paragraph, BulletList, NumberedList, Checklist, Image, Table, Toggle, Callout, Divider, Quote, Code.

### Customize with CommandMenuSettings

```csharp
using Syncfusion.EJ2.BlockEditor;

public CommandMenuSettings CommandMenuSettings { get; set; }

public ActionResult Index()
{
    var customCommands = new List<object>
    {
        new
        {
            id = "divider-cmd",
            type = "Divider",
            groupBy = "Utility",
            label = "Insert a Line",
            iconCss = "e-icons e-divider"
        },
        new
        {
            id = "timestamp-cmd",
            groupBy = "Actions",
            label = "Insert Timestamp",
            iconCss = "e-icons e-schedule"
        }
    };

    CommandMenuSettings = new CommandMenuSettings
    {
        PopupWidth = "350px",
        PopupHeight = "400px",
        EnableTooltip = true,      // Show tooltip on hover (default: false)
        Commands = customCommands,
        Filtering = "onFiltering",
        ItemSelect = "onItemSelect"
    };

    ViewData["CommandMenuSettings"] = CommandMenuSettings;
    return View();
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .CommandMenu((CommandMenuSettings)ViewData["CommandMenuSettings"])
    .Render()

<script>
    function onFiltering(args) {
        // args.text = current filter string; args.items = filtered result
    }

    function onItemSelect(args) {
        if (args.item.id === "timestamp-cmd") {
            // Insert timestamp logic here
        }
    }
</script>
```

### CommandMenuSettings Properties

| Property | Description |
|---|---|
| `PopupWidth` | Width of the command popup |
| `PopupHeight` | Height of the command popup |
| `EnableTooltip` | Show/hide tooltip on hover (default: `false`) |
| `Commands` | Array of custom command items |
| `Filtering` | JS function name for filter event |
| `ItemSelect` | JS function name for item select event |

### Command Item Properties

| Property | Description |
|---|---|
| `id` | Unique identifier |
| `type` | Block type to insert (built-in block type string) |
| `groupBy` | Group label in the popup |
| `label` | Display name |
| `iconCss` | CSS class for icon |
| `tooltip` | Tooltip text shown on hover |
| `shortcut` | Keyboard shortcut string (e.g., `"ctrl+alt+p"`) |
| `disabled` | Set `true` to disable this item (default: `false`) |

---

## Context Menu

-  **Undo/Redo**: Undo and redo actions.
-  **Cut/Copy/Paste**: Standard clipboard actions.
-  **Indent**: Increase or decrease the indent level of the selected block.
-  **Link**: Add or edit a hyperlink.
-  **Link**: Allows you to add or edit a hyperlink for the selected text. When a link is present, the context menu provides options such as `Open Link`, `Edit Link`, `Copy Link`, and `Remove Link`.
-  **Table**: Provides built-in table actions such as `Insert` and `Delete`. These options appear in the context menu when the cursor is focused within a table cell and the context menu is opened.

### Customize with ContextMenuSettings

```csharp
using Syncfusion.EJ2.BlockEditor;

public ContextMenuSettings ContextMenuSettings { get; set; }

public ActionResult Index()
{
    var formatSubItems = new List<object>
    {
        new { id = "bold-item",      text = "Bold",      iconCss = "e-icons e-bold" },
        new { id = "italic-item",    text = "Italic",    iconCss = "e-icons e-italic" },
        new { id = "underline-item", text = "Underline", iconCss = "e-icons e-underline" }
    };

    var exportSubItems = new List<object>
    {
        new { id = "export-json", text = "Export as JSON", iconCss = "e-icons e-file-json" },
        new { id = "export-html", text = "Export as HTML", iconCss = "e-icons e-file-html" }
    };

    var menuItems = new List<object>
    {
        new { id = "format-menu", text = "Format", iconCss = "e-icons e-format-painter", items = formatSubItems },
        new { separator = true },
        new { id = "stats-item",  text = "Block Statistics", iconCss = "e-icons e-chart" },
        new { id = "export-item", text = "Export Options",   iconCss = "e-icons e-export", items = exportSubItems }
    };

    ContextMenuSettings = new ContextMenuSettings
    {
        Enable = true,
        ShowItemOnClick = true,    // Open submenus on click, not hover
        Items = menuItems,
        Opening = "onContextOpen",
        Closing = "onContextClose",
        ItemSelect = "onContextItemClick"
    };

    ViewData["ContextMenuSettings"] = ContextMenuSettings;
    return View();
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .ContextMenu((ContextMenuSettings)ViewData["ContextMenuSettings"])
    .Render()

<script>
    function onContextOpen(args) { /* before open */ }
    function onContextClose(args) { /* before close */ }
    function onContextItemClick(args) {
        if (args.item.id === "export-json") { /* handle JSON export */ }
    }
</script>
```

### ContextMenuSettings Properties

| Property | Description |
|---|---|
| `Enable` | Show/hide the context menu |
| `ShowItemOnClick` | Open submenus on click rather than hover |
| `Items` | Array of menu items |
| `Opening` | JS function for `Opening` event |
| `Closing` | JS function for `Closing` event |
| `ItemSelect` | JS function for `ItemSelect` event |

### Context Menu Item Properties

| Property | Description |
|---|---|
| `id` | Unique identifier |
| `text` | Display text |
| `iconCss` | CSS class for icon |
| `items` | Sub-items array for nested menus |
| `separator` | Set `true` to render a separator line |
| `shortcut` | Keyboard shortcut string displayed on the right of the item |

---

## Block Action Menu

The block action menu appears when hovering over a block and clicking the drag handle icon (⋮). Built-in items: Duplicate, Delete, Move Up, Move Down.

### Customize with BlockActionsMenuSettings

```csharp
using Syncfusion.EJ2.BlockEditor;

public BlockActionMenuSettings BlockActionMenuSettings { get; set; }

public ActionResult Index()
{
    var blockItems = new List<object>
    {
        new { id = "highlight-action", label = "Highlight Block", iconCss = "e-icons e-highlight", tooltip = "Highlight this block" },
        new { id = "copy-action",      label = "Copy Content",    iconCss = "e-icons e-copy",      tooltip = "Copy block content" },
        new { id = "info-action",      label = "Block Info",      tooltip = "Show block information" }
    };

    BlockActionMenuSettings = new BlockActionMenuSettings
    {
        Enable = true,
        EnableTooltip = false,    // Hide tooltips (default: false)
        PopupHeight = "110px",
        PopupWidth = "180px",
        Opening = "onBlockActionOpen",
        Closing = "onBlockActionClose",
        ItemSelect = "onBlockActionClick",
        Items = blockItems
    };

    ViewData["BlockActionMenuSettings"] = BlockActionMenuSettings;
    return View();
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .BlockActionsMenu((BlockActionMenuSettings)ViewData["BlockActionMenuSettings"])
    .Render()

<script>
    function onBlockActionOpen(args) { /* menu opened */ }
    function onBlockActionClose(args) { /* menu closed */ }
    function onBlockActionClick(args) {
        if (args.item.id === "highlight-action") { /* apply highlight */ }
    }
</script>
```

### BlockActionsMenuSettings Properties

| Property | Description |
|---|---|
| `Enable` | Show/hide the block action menu |
| `EnableTooltip` | Show/hide item tooltips (default: `false`) |
| `PopupHeight` | Popup height |
| `PopupWidth` | Popup width |
| `Opening` | JS function for `Opening` event |
| `Closing` | JS function for `Closing` event |
| `ItemSelect` | JS function for `ItemSelect` event |
| `Items` | Array of custom action items |

---

## Inline Toolbar

The inline toolbar appears when text is selected inside a block. Built-in items: Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Uppercase, Lowercase, Color, Background Color.

### Optional Items

Pass string names in `Items` to add: `"Transform"`, `"InlineCode"`, `"Link"`.

### Customize with InlineToolbarSettings

```csharp
using Syncfusion.EJ2.BlockEditor;

public InlineToolbarSettings InlineToolbarSettings { get; set; }

public ActionResult Index()
{
    var toolbarItems = new List<object>
    {
        new { id = "format-painter", iconCss = "e-icons e-format-painter", item = "Custom", tooltip = "Format Painter" },
        new { id = "highlight",      iconCss = "e-icons e-highlight",       item = "Custom", tooltip = "Highlight" }
    };

    InlineToolbarSettings = new InlineToolbarSettings
    {
        Enable = true,
        EnableTooltip = true,
        PopupWidth = "80px",
        ItemClick = "onToolbarItemClick",
        Items = toolbarItems
    };

    ViewData["InlineToolbarSettings"] = InlineToolbarSettings;
    return View();
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .InlineToolbar((InlineToolbarSettings)ViewData["InlineToolbarSettings"])
    .Render()

<script>
    function onToolbarItemClick(args) {
        if (args.item.id === "highlight") { /* apply highlight */ }
    }
</script>
```

### Transform, InlineCode, Link Items

```csharp
// Use string array for built-in + optional items
InlineToolbarSettings = new InlineToolbarSettings
{
    Enable = true,
    PopupWidth = "180px",
    Items = new string[] { "Transform", "Bold", "InlineCode", "Link" }
};

// Configure transform options separately
public class TransformSettingsModel
{
    public string[] Items { get; set; }
    public string PopupWidth { get; set; }
    public string PopupHeight { get; set; }
    public string ItemSelect { get; set; }
}

var transform = new TransformSettingsModel
{
    Items = new string[] { "Paragraph", "Heading1", "Heading2", "BulletList" },
    PopupWidth = "auto",
    PopupHeight = "auto",
    ItemSelect = "onTransformItemSelect"
};
ViewData["TransformSettings"] = transform;
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .InlineToolbarSettings((InlineToolbarSettings)ViewData["InlineToolbarSettings"])
    .TransformSettings(ViewData["TransformSettings"])
    .Render()

<script>
    function onTransformItemSelect(args) {
        // args.command contains the selected transform item
        console.log('Transform selected:', args.command);
    }
</script>
```

### TransformSettings Properties

| Property | Description |
|---|---|
| `Items` | Array of block type strings available for transform (e.g., `"Paragraph"`, `"Heading1"`, `"BulletList"`) |
| `PopupWidth` | Width of the transform popup (default: `"auto"`) |
| `PopupHeight` | Height of the transform popup (default: `"auto"`) |
| `ItemSelect` | JS function name called when a transform command is selected |

### Font Color and Background Color Pickers

```csharp
using Syncfusion.EJ2.BlockEditor;

FontColorSettings = new FontColorSettings
{
    Mode = ColorModeType.Picker,
    ModeSwitcher = true
};
BackgroundColorSettings = new BackgroundColorSettings();

// Items:
InlineToolbarSettings = new InlineToolbarSettings
{
    Enable = true,
    PopupWidth = "140px",
    Items = new string[] { "Color", "Backgroundcolor" }
};
```

```razor
<ejs-blockeditor height="300px" id="block-editor">
    <e-blockeditor-inlinetoolbarsettings enable=true popupWidth="140px" items="@ViewBag.InlineToolbarItems"></e-blockeditor-inlinetoolbarsettings>
    <e-blockeditor-fontcolorsettings mode="Picker" modeSwitcher=true></e-blockeditor-fontcolorsettings>
    <e-blockeditor-backgroundcolorsettings></e-blockeditor-backgroundcolorsettings>
</ejs-blockeditor>
```

### FontColorSettings Properties

| Property | Description | Default |
|---|---|---|
| `Default` | Default font color applied when the color button is clicked | `"#ff0000"` |
| `Mode` | Color display mode: `ColorModeType.Palette` or `ColorModeType.Picker` | `Palette` |
| `ModeSwitcher` | Show toggle to switch between Palette and Picker modes | `false` |
| `Columns` | Number of columns in the color palette grid | `10` |
| `ColorCode` | Custom named color groups as a dictionary of string arrays | See default palette |

### BackgroundColorSettings Properties

| Property | Description | Default |
|---|---|---|
| `Default` | Default background highlight color applied when the button is clicked | `"#ffff00"` |
| `Mode` | Color display mode: `ColorModeType.Palette` or `ColorModeType.Picker` | `Palette` |
| `ModeSwitcher` | Show toggle to switch between Palette and Picker modes | `false` |
| `Columns` | Number of columns in the color palette grid | `5` |
| `ColorCode` | Custom named color groups as a dictionary of string arrays | See default palette |

### InlineToolbarSettings Properties

| Property | Description |
|---|---|
| `Enable` | Show/hide the inline toolbar |
| `EnableTooltip` | Show/hide item tooltips (default: `true`) |
| `PopupWidth` | Toolbar popup width |
| `ItemClick` | JS function for `ItemClick` event |
| `Items` | Array of item objects or string names |
