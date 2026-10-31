# Editor Modes & Display Options

## Table of Contents
- [HTML Mode vs Markdown Mode](#html-mode-vs-markdown-mode)
- [IFrame Mode](#iframe-mode)
- [Inline Editing Mode](#inline-editing-mode)
- [Resizable Editor](#resizable-editor)
- [Editor Height and Width](#editor-height-and-width)

---

## HTML Mode vs Markdown Mode

The `editorMode` property controls which editing format the component uses.

| Mode | Value | Output | Use when |
|------|-------|--------|----------|
| HTML (default) | `HTML` or omitted | Valid HTML markup | Storing/displaying formatted content as HTML |
| Markdown | `Markdown` | Plain Markdown text | Writing/storing content in Markdown syntax |

### HTML Mode (default)

No configuration needed — HTML mode is the default:

```razor
<ejs-richtexteditor id="html-editor" value="@ViewBag.value">
</ejs-richtexteditor>
```

```csharp
ViewBag.value = @"<p>WYSIWYG <b>HTML</b> editor</p>";
```

### Markdown Mode

```razor
<ejs-richtexteditor id="markdown-editor" editorMode="Markdown" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.value = "**Bold**, *italic*, and `code` are all supported.";
ViewBag.tools = new[] {
    "Bold", "Italic", "StrikeThrough", "InlineCode", "|",
    "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
    "CreateLink", "Image", "CreateTable", "|", "Undo", "Redo"
};
```

> In Markdown mode, the value property always holds the raw Markdown string. Use a library like Marked.js to render it as HTML for display.

---

## IFrame Mode

By default the editor uses a DIV element. Switch to IFrame mode for isolated editing — the editor creates a separate `<iframe>` document, keeping the parent page's styles from leaking in.

Use IFrame mode when:
- Page CSS is interfering with editor content appearance
- You need to apply a custom stylesheet only to the editor body
- You need strict style isolation between editor and page

```razor
<ejs-richtexteditor id="iframe-editor" value="@ViewBag.value">
    <e-richtexteditor-iframesettings enable="true"></e-richtexteditor-iframesettings>
</ejs-richtexteditor>
```

### Inject External CSS/Scripts into IFrame

```razor
<ejs-richtexteditor id="iframe-editor" value="@ViewBag.value">
    <e-richtexteditor-iframesettings enable="true" resources="@ViewBag.resources">
    </e-richtexteditor-iframesettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.resources = new
{
    styles = new[] { "/css/editor-content.css" }
};
```

### Set Custom Attributes on IFrame Body

```razor
<ejs-richtexteditor id="iframe-editor" created="onCreated">
    <e-richtexteditor-iframesettings enable="true"></e-richtexteditor-iframesettings>
</ejs-richtexteditor>
<script>
    function onCreated() {
        this.setProperties({
            iframeSettings: {
                attributes: { readonly: 'readonly' }
            }
        }, false);
    }
</script>
```

---

## Inline Editing Mode

Inline mode hides the toolbar until the user interacts with content. The toolbar appears as a floating popup above selected text or on focus — no separate toolbar bar is shown.

Use inline mode for:
- Blog/article editors where the toolbar should appear contextually
- Editing content directly within its display context (e.g., in-place editing)

```razor
<ejs-richtexteditor id="inline-editor" value="@ViewBag.value">
    <e-richtexteditor-inlinemode enable="true" onSelection="true">
    </e-richtexteditor-inlinemode>
    <e-richtexteditor-toolbarsettings items="@ViewBag.tools"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.value = "<p>Select this text to see the inline toolbar appear.</p>";
ViewBag.tools = new[] {
    "Bold", "Italic", "Underline", "StrikeThrough", "-",
    "Formats", "Alignments", "OrderedList", "UnorderedList"
};
```

**`onSelection` behaviour:**
- `true` (default) — toolbar appears only when text is selected
- `false` — toolbar appears whenever the editor area is focused

---

## Resizable Editor

Enable a drag handle at the bottom-right corner to let users resize the editor vertically and/or horizontally.

```razor
<ejs-richtexteditor id="resizable-editor" enableResize="true" value="@ViewBag.value">
</ejs-richtexteditor>
```

### Setting Resize Limits

Use the `.e-richtexteditor` CSS class to constrain resize boundaries:

```razor
<ejs-richtexteditor id="resizable-editor" enableResize="true" value="@ViewBag.value">
</ejs-richtexteditor>
<style>
    .e-richtexteditor {
        min-width: 300px;
        max-width: 900px;
        min-height: 150px;
        max-height: 500px;
    }
</style>
```

---

## Editor Height and Width

Set fixed dimensions directly on the tag:

```razor
<ejs-richtexteditor id="editor" height="400px" width="800px" value="@ViewBag.value">
</ejs-richtexteditor>
```

Or use `100%` width for responsive layouts:

```razor
<div style="max-width: 900px;">
    <ejs-richtexteditor id="editor" height="350px" value="@ViewBag.value">
    </ejs-richtexteditor>
</div>
```
