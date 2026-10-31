# Appearance & Read-Only — Syncfusion ASP.NET MVC Block Editor

## Setting Width and Height

Use `Width` and `Height` with any valid CSS unit (`px`, `%`, `vh`):

```razor
@Html.EJS().BlockEditor("block-editor").Width("100%").Height("80vh").Render()
```

```razor
@Html.EJS().BlockEditor("block-editor").Width("800px").Height("500px").Render()
```

---

## Read-Only Mode

Set `ReadOnly(true)` to prevent editing while preserving formatted content display. Users can view but not modify any blocks.

```razor
@Html.EJS().BlockEditor("block-editor").ReadOnly(true).Render()
```

**Toggle at runtime via JavaScript:**

```razor
@Html.EJS().BlockEditor("block-editor").Created("onCreated").Render()

<button onclick="toggleReadOnly()">Toggle Read-Only</button>

<script>
    var blockEditorObj;
    var isReadOnly = false;

    function onCreated() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'),
            ejs.blockeditor.BlockEditor
        );
    }

    function toggleReadOnly() {
        isReadOnly = !isReadOnly;
        blockEditorObj.readOnly = isReadOnly;
    }
</script>
```

> Read-only mode disables all editing interactions including keyboard input, drag-and-drop, and context menus, but keeps formatted content fully visible.

---

## Custom CSS Class

Apply `CssClass` to add your own CSS class to the editor root element for theming or layout overrides:

```razor
@Html.EJS().BlockEditor("block-editor")
    .CssClass("custom-editor-theme")
    .Width("600px")
    .Height("400px")
    .Render()
```

```css
/* Override editor background and block hover */
.custom-editor-theme {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
}

.custom-editor-theme .e-block:hover {
    transform: translateY(-2px);
    transition: all 0.3s ease;
}

.custom-editor-theme .e-block-content {
    color: #2d3748;
    font-weight: 500;
}
```

**Apply CSS class at runtime:**

```javascript
blockEditorObj.cssClass = 'custom-editor-theme';
```

---

## Persistence

Set `EnablePersistence(true)` to automatically save and restore the editor's state (content and scroll position) across page reloads using browser storage.

```razor
@Html.EJS().BlockEditor("block-editor").EnablePersistence(true).Render()
```

**Default:** `false`

> When persistence is enabled, the editor restores its last saved state on the next page load. This is useful for draft-style editors where users should not lose work on accidental refresh.

---

## Full Appearance Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    @Html.EJS().BlockEditor("block-editor")
        .Blocks((List<BlockModel>)ViewBag.BlocksData)
        .Width("100%")
        .Height("600px")
        .ReadOnly(false)
        .CssClass("my-editor")
        .Created("onCreated")
        .Render()

    <div>
        <button onclick="toggleReadOnly()">Toggle Read-Only</button>
        <button onclick="applyTheme()">Apply Custom Theme</button>
        <span id="status"></span>
    </div>
</div>

<script>
    var blockEditorObj;
    var isReadOnly = false;

    function onCreated() {
        blockEditorObj = ej.base.getInstance(
            document.getElementById('block-editor'),
            ejs.blockeditor.BlockEditor
        );
    }

    function toggleReadOnly() {
        isReadOnly = !isReadOnly;
        blockEditorObj.readOnly = isReadOnly;
        document.getElementById('status').textContent =
            isReadOnly ? 'Read-only mode enabled' : 'Editing mode enabled';
    }

    function applyTheme() {
        blockEditorObj.cssClass = 'dark-theme-editor';
    }
</script>
```

```csharp
public ActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "title-block",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object> { new { contentType = "Text", content = "Appearance Demo" } }
        },
        new BlockModel
        {
            id = "intro-block",
            blockType = "Paragraph",
            content = new List<object> { new { contentType = "Text", content = "Toggle read-only or apply a custom theme." } }
        }
    };
    ViewBag.BlocksData = blocks;
    return View();
}
```
