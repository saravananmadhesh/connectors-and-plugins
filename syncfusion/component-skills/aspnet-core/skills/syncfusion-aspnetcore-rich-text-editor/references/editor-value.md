# Editor Value & Content Management

## Table of Contents
- [Setting and Getting Values](#setting-and-getting-values)
- [Placeholder Text](#placeholder-text)
- [Character Count and Max Length](#character-count-and-max-length)
- [Auto-Save](#auto-save)
- [HTML-Encoded Value](#html-encoded-value)
- [Source Code / Code View Editing](#source-code--code-view-editing)
- [Paste and Clipboard Cleanup](#paste-and-clipboard-cleanup)
- [Import and Export](#import-and-export)
- [Undo and Redo](#undo-and-redo)

---

## Setting and Getting Values

### Setting the Initial Value

**Via `value` property (most common):**

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
</ejs-richtexteditor>
```

```csharp
ViewBag.value = "<p>Hello <b>World</b></p>";
```

**Via content template (for longer HTML):**

```razor
<ejs-richtexteditor id="editor">
    <e-content-template>
        <p>This is <b>initial content</b> via template.</p>
    </e-content-template>
</ejs-richtexteditor>
```

### Getting the Value

**Via JavaScript (`getHtml()` and `getText()`):**

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value"></ejs-richtexteditor>
<button onclick="getValue()">Get HTML</button>
<script>
    function getValue() {
        var rte = document.getElementById('editor').ej2_instances[0];
        var html = rte.getHtml();    // returns HTML string
        var text = rte.getText();    // returns plain text (no tags)
        console.log(html);
    }
</script>
```

**Via `change` event (fires on blur when content has changed):**

```razor
<ejs-richtexteditor id="editor" change="onChange" value="@ViewBag.value">
</ejs-richtexteditor>
<script>
    function onChange(args) {
        console.log('Value changed:', args.value);
    }
</script>
```

**Via form submission:** The editor writes its value to a hidden input named after the `name` attribute. Use `name` for standard form binding:

```razor
<form method="post">
    <ejs-richtexteditor id="rte" name="content" value="@ViewBag.value">
    </ejs-richtexteditor>
    <button type="submit">Save</button>
</form>
```

### Styling Editor Content Outside the Editor

When displaying saved HTML content outside the editor, wrap it with the `e-rte-content` CSS class to preserve formatting:

```html
<div class="e-rte-content">
    @Html.Raw(Model.Content)
</div>
```

Include the editor's CSS styles in the page to apply correct rendering for paragraphs, lists, tables, and images.

---

## Placeholder Text

Show placeholder text when the editor is empty:

```razor
<ejs-richtexteditor id="editor" placeholder="Start typing here...">
</ejs-richtexteditor>
```

Customise the placeholder appearance:

```css
.e-richtexteditor .e-rte-placeholder {
    font-family: monospace;
    color: #aaa;
    font-style: italic;
}
```

---

## Character Count and Max Length

### Enable Character Count Display

```razor
<ejs-richtexteditor id="editor" showCharCount="true" value="@ViewBag.value">
</ejs-richtexteditor>
```

The count appears at the bottom-right corner of the editor.

### Set Maximum Length

```razor
<ejs-richtexteditor id="editor" showCharCount="true" maxLength="500" value="@ViewBag.value">
</ejs-richtexteditor>
```

**Character count colour indicators:**

| State | Threshold | Colour |
|-------|-----------|--------|
| Normal | 0–70% of `maxLength` | Black |
| Warning | 70–90% of `maxLength` | Orange |
| Error | 90–100% of `maxLength` | Red |

### Get Character Count Programmatically

```javascript
var count = document.getElementById('editor').ej2_instances[0].getCharCount();
```

---

## Auto-Save

Trigger the `change` event periodically while the user types using `saveInterval` (milliseconds). Useful for auto-saving drafts:

```razor
<ejs-richtexteditor id="editor"
    saveInterval="2000"
    change="onAutoSave"
    value="@ViewBag.value">
</ejs-richtexteditor>
<script>
    function onAutoSave(args) {
        // args.value contains current HTML
        fetch('/api/drafts/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: args.value })
        });
    }
</script>
```

> `change` only fires if the content has been modified since the last save. `saveInterval` controls the idle timeout before firing.

---

## HTML-Encoded Value

When you need the `value` property to return HTML-encoded strings (e.g., for safe server-side storage):

```razor
<ejs-richtexteditor id="editor" enableHtmlEncode="true" value="@ViewBag.value">
</ejs-richtexteditor>
```

```csharp
// Set encoded value
ViewBag.value = "&lt;p&gt;Encoded &lt;b&gt;content&lt;/b&gt;&lt;/p&gt;";
```

With `enableHtmlEncode="true"`, the `value` property and `args.value` return encoded HTML rather than raw HTML.

---

## Source Code / Code View Editing

Add `SourceCode` to the toolbar to let users toggle between the WYSIWYG view and raw HTML source:

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "Underline", "|",
    "SourceCode", "|", "Undo", "Redo"
};
```

Toggle programmatically:

```javascript
document.getElementById('editor').ej2_instances[0].showSourceCode();
```

### Enhanced Source View with CodeMirror

For syntax-highlighted HTML source editing, integrate CodeMirror (see `references/customization.md`).

---

## Paste and Clipboard Cleanup

### Paste Cleanup

Control how pasted content is sanitised. By default, MS Word formatting attributes are stripped:

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-pasteCleanupSettings
        prompt="true"
        plainText="false"
        keepFormat="false"
        deniedAttrs="@(new string[] {"class", "style"})">
    </e-richtexteditor-pasteCleanupSettings>
</ejs-richtexteditor>
```

| Option | Description |
|--------|-------------|
| `prompt` | Show a dialog asking which paste mode to use |
| `plainText` | Strip all HTML and paste as plain text |
| `keepFormat` | Preserve original formatting |
| `deniedAttrs` | Array of HTML attributes to strip on paste |

---

## Import and Export

The Rich Text Editor supports importing from Word documents and exporting to Word/PDF formats.

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
    <e-richtexteditor-importWord serviceUrl="/api/Import/Word">
    </e-richtexteditor-importWord>
    <e-richtexteditor-exportWord serviceUrl="/api/Export/Word">
    </e-richtexteditor-exportWord>
    <e-richtexteditor-exportPdf serviceUrl="/api/Export/Pdf">
    </e-richtexteditor-exportPdf>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "|",
    "ImportWord", "ExportWord", "ExportPdf", "|",
    "Undo", "Redo"
};
```

Import/Export toolbar items trigger the configured service URLs.

---

## Undo and Redo

Add `Undo` and `Redo` to the toolbar:

```csharp
ViewBag.items = new[] { "Bold", "Italic", "|", "Undo", "Redo" };
```

**Keyboard shortcuts:** `Ctrl+Z` / `Ctrl+Y` (Windows), `⌘+Z` / `⌘+Y` (Mac)

The undo stack tracks all editor changes. Use `saveData()` and `getUndoRedoStack()` via the formatter module for programmatic undo management.
