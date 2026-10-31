---
name: syncfusion-aspnetmvc-blockeditor
description: Implement Syncfusion ASP.NET MVC Block Editor control. Use when building block-based rich content editors, configuring block types (Paragraph, Heading, List, Code, Table, Image, Callout, Collapsible), handling drag-and-drop, editor menus (slash command, context, block action, inline toolbar), events, methods, paste cleanup, undo/redo, globalization, appearance, collaborative editing with real-time synchronization, version history, and user presence features in ASP.NET MVC Razor views.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Block Editor

The Block Editor control provides a block-based rich content editing experience in ASP.NET MVC applications. Content is structured as a collection of typed blocks (Paragraph, Heading, List, Code, Table, Image, etc.), each independently configurable with content, properties, and inline styles.

## Quick Start Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").Render()
</div>

<style>
    #blockeditor-container { margin: 20px auto; }
</style>
```

```csharp
public ActionResult Index()
{
    return View();
}
```

**With initial blocks:**

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor").Blocks((List<BlockModel>)ViewBag.BlocksData).Render()
</div>
```

```csharp
public class BlockModel
{
    public string id { get; set; }
    public string blockType { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}

public ActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "heading-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "My Document" }
            }
        },
        new BlockModel
        {
            id = "para-1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "Start writing here." }
            }
        }
    };
    ViewBag.BlocksData = blocks;
    return View();
}
```

---

## Documentation and Navigation Guide

### Getting Started & Installation
📄 **Read:** [references/getting-started.md](references/getting-started.md)

When user needs to:
- Install `Syncfusion.EJ2.MVC5` NuGet package
- Add namespace reference in `Web.config`
- Link CDN stylesheet and script in `_Layout.cshtml`
- Register the Syncfusion script manager
- Render a minimal Block Editor on a page

### Block Types & Configuration
📄 **Read:** [references/block-types.md](references/block-types.md)

When user needs to:
- Understand all supported block types (Paragraph, Heading, List, Code, Quote, Callout, Divider, Image, Table, Collapsible, Template)
- Configure `blockType`, `content`, `properties`, `indent`, `cssClass` on individual blocks
- Set heading levels (1–4), list types (BulletList, NumberedList, Checklist), checklist `isChecked` state
- Add placeholder text to blocks
- Apply per-block CSS classes for custom styling
- Use Template blocks for custom HTML content

### Inline Content & Styles
📄 **Read:** [references/inline-content.md](references/inline-content.md)

When user needs to:
- Configure `contentType` (Text, Link, Code, Mention, Label)
- Set hyperlink properties (`url`, `openInNewWindow`) on Link content
- Configure Label content with `labelId`, trigger character (`TriggerChar` default: `"$"`), and `LabelSettings`
- Configure the `Users` collection and `UserModel` for Mention content
- Configure Mention content with `userId`
- Apply inline text styles: bold, italic, underline, strikethrough, color, backgroundColor, superscript, subscript, uppercase, lowercase, inlineCode

### Nested Blocks (Collapsible, Quote, Callout)
📄 **Read:** [references/nested-blocks.md](references/nested-blocks.md)

When user needs to:
- Configure CollapsibleHeading or CollapsibleParagraph with `children`, `isExpanded`, `level`
- Configure Quote blocks with nested child Paragraph blocks
- Configure Callout blocks with nested children
- Set `parentId` (top-level on BlockModel) to establish parent-child relationships

### Embed Blocks (Image & Code)
📄 **Read:** [references/embed-blocks.md](references/embed-blocks.md)

When user needs to:
- Render an Image block with `src`, `altText`, `width`, `height`
- Configure global `ImageBlockSettings` (saveUrl, path, saveFormat, allowedTypes, maxFileSize, enableResize)
- Upload images to a server via controller action
- Handle image upload lifecycle: `BeforeFileUpload` (validate/cancel), `FileUploading` (add auth headers), `FileUploadSuccess` (read saved URL), `FileUploadFailed` (error feedback)
- Configure Code blocks with syntax highlighting and language selection
- Set global `CodeBlockSettings` (defaultLanguage default: `"javascript"`, languages array)

### Table Blocks
📄 **Read:** [references/table-block.md](references/table-block.md)

When user needs to:
- Render a Table block with columns, rows, and cells
- Configure `enableHeader`, `enableRowNumbers`, `readOnly`, `width` on a table
- Define column headers (`headerText`) and row cells with `columnId` and nested blocks
- Understand table resizing and multi-row/column selection/deletion

### Editor Menus
📄 **Read:** [references/editor-menus.md](references/editor-menus.md)

When user needs to:
- Customize the Slash Command menu (`CommandMenuSettings`): popup size, custom commands, tooltip, Filtering/ItemSelect events
- Customize the Context menu (`ContextMenuSettings`): enable, custom items, submenus, ShowItemOnClick, Opening/Closing/ItemSelect events
- Customize the Block Action menu (`BlockActionsMenuSettings`): custom items, tooltip, popup size, Opening/Closing/ItemSelect events
- Customize the Inline Toolbar (`InlineToolbarSettings`): enable, items, popup width, tooltip, ItemClick event
- Add Transform, InlineCode, Link items to the Inline Toolbar
- Configure font color and background color pickers (`FontColorSettings`, `BackgroundColorSettings`)

### Events
📄 **Read:** [references/events.md](references/events.md)

When user needs to:
- Handle editor lifecycle: `Created`, `Focus`, `Blur`
- Respond to content changes: `BlockChanged`, `SelectionChanged`
- Handle drag operations: `BlockDragStart`, `BlockDragging`, `BlockDropped`
- Intercept paste operations: `BeforePasteCleanup`, `AfterPasteCleanup`
- Handle image upload lifecycle: `BeforeFileUpload`, `FileUploading`, `FileUploadSuccess`, `FileUploadFailed`

### Methods
📄 **Read:** [references/methods.md](references/methods.md)

When user needs to:
- Add, remove, move, update, or get blocks programmatically (`addBlock`, `removeBlock`, `moveBlock`, `updateBlock`, `getBlock`, `getBlockCount`)
- Manage selection and cursor: `setSelection`, `setCursorPosition`, `getSelectedBlocks`, `getRange`, `selectRange`, `selectBlock`, `selectAllBlocks`
- Manage focus: `focusIn`, `focusOut`
- Apply formatting: `executeToolbarAction`, `enableToolbarItems`, `disableToolbarItems`
- Export content: `getDataAsJson`, `getDataAsHtml`, `renderBlocksFromJson`, `parseHtmlToBlocks`, `print`
- Always retrieve the component instance via `ej.base.getInstance` in the `Created` event

### Appearance & Read-Only
📄 **Read:** [references/appearance.md](references/appearance.md)

When user needs to:
- Set editor `Width` and `Height`
- Enable `ReadOnly` mode (view-only, no edits)
- Apply a custom `CssClass` to the editor container
- Persist editor state across page reloads with `EnablePersistence`

### Paste Cleanup
📄 **Read:** [references/paste-cleanup.md](references/paste-cleanup.md)

When user needs to:
- Configure `PasteCleanupSettings`: `DeniedTags`, `KeepFormat`, `PlainText`
- Strip unwanted tags (script, iframe) from pasted content
- Paste as plain text stripping all formatting

### Undo/Redo & Keyboard Shortcuts
📄 **Read:** [references/undo-redo-keyboard.md](references/undo-redo-keyboard.md)

When user needs to:
- Configure `UndoRedoStack` size (default: 30)
- Know all built-in keyboard shortcuts for formatting, block creation, block management
- Customize shortcuts via `KeyConfig` property

### Globalization & Accessibility
📄 **Read:** [references/globalization.md](references/globalization.md)

When user needs to:
- Set `Locale` for localized UI strings (e.g., `de` for German)
- Enable RTL layout with `EnableRtl`
- Know the full localization key table

### Drag & Drop
📄 **Read:** [references/drag-drop.md](references/drag-drop.md)

When user needs to:
- Enable or disable drag and drop with `EnableDragAndDrop`
- Understand single vs. multiple block dragging behavior

### Security (XSS Prevention)
📄 **Read:** [references/security.md](references/security.md)

When user needs to:
- Understand the built-in `EnableHtmlSanitizer` protection (default: `true`)
- Know which elements are automatically removed
- Escape HTML characters in output using `EnableHtmlEncode` (default: `false`)

### Collaborative Editing
📄 **Read:** [references/collaborative-editing.md](references/collaborative-editing.md)

When user needs to:
- Set up real-time collaborative editing using Yjs and providers (y-websocket, y-webrtc, Hocuspocus, Liveblocks, PartyKit)
- Configure `CollaborationSettings` with adapter and provider
- Enable user presence and remote cursors with `EnableAwareness`
- Track active collaborators with `Users` and `CurrentUserId`
- Implement version history with snapshots (create, restore, compare, export, import)
- Configure custom snapshot storage using `IVersionStorage` interface (IndexedDB, database, cloud)
- Handle collaboration events: `SnapshotCreated`, `SnapshotRestored`
- Resolve synchronization issues and optimize performance for multiple users

---

## Key Properties at a Glance

| Property | Type | Purpose |
|---|---|---|
| `Blocks` | List\<BlockModel\> | Initial block content |
| `Width` | string | Editor width (e.g., `"100%"`, `"800px"`) |
| `Height` | string | Editor height (e.g., `"80vh"`, `"500px"`) |
| `ReadOnly` | bool | Enable view-only mode (default: `false`) |
| `CssClass` | string | Custom CSS class on editor container |
| `EnableDragAndDrop` | bool | Allow block reordering (default: `true`) |
| `UndoRedoStack` | int | Max undo/redo steps (default: `30`) |
| `Locale` | string | Culture code for localization (default: `"en-US"`) |
| `EnableRtl` | bool | Right-to-left layout (default: `false`) |
| `EnableHtmlSanitizer` | bool | XSS protection — strips dangerous tags/attrs (default: `true`) |
| `EnableHtmlEncode` | bool | Escape special HTML characters in output (default: `false`) |
| `EnablePersistence` | bool | Persist editor state across page reloads (default: `false`) |
| `KeyConfig` | object | Custom keyboard shortcut overrides |
| `CommandMenuSettings` | object | Slash command menu config (`/` key) |
| `ContextMenuSettings` | object | Right-click context menu config |
| `BlockActionsMenu` | object | Block action menu config (hover drag handle) |
| `InlineToolbarSettings` | object | Inline formatting toolbar config (text selection) |
| `TransformSettings` | object | Block transform options in the inline toolbar |
| `FontColorSettings` | object | Font color palette/picker config |
| `BackgroundColorSettings` | object | Background highlight color palette/picker config |
| `PasteCleanupSettings` | object | Paste content cleanup rules |
| `ImageBlockSettings` | object | Global image block configuration |
| `CodeBlockSettings` | object | Global code block configuration (defaultLanguage: `"javascript"`) |
| `LabelSettings` | object | Label item definitions and trigger character (default: `"$"`) |
| `Users` | List\<UserModel\> | User list for `@` mention resolution |

---

## Common Patterns

### Pattern 1 — Get Component Instance
Always capture the instance in `Created`; all method calls require this reference:
```javascript
var blockEditorObj;
function onCreated() {
    blockEditorObj = ej.base.getInstance(
        document.getElementById('block-editor'),
        ejs.blockeditor.BlockEditor
    );
}
```
```razor
@Html.EJS().BlockEditor("block-editor").Created("onCreated").Render()
```

### Pattern 2 — Export Content as JSON
```javascript
var jsonData = blockEditorObj.getDataAsJson();
// Send to server or store in state
```

### Pattern 3 — Programmatically Add a Block
```javascript
var newBlock = {
    id: 'new-para',
    blockType: 'Paragraph',
    content: [{ contentType: 'Text', content: 'Added programmatically' }]
};
blockEditorObj.addBlock(newBlock, 'existing-block-id', true); // true = insert after
```

### Pattern 4 — Toggle Read-Only at Runtime
```javascript
blockEditorObj.readOnly = true;  // enable read-only
blockEditorObj.readOnly = false; // re-enable editing
```
