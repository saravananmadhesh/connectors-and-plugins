# Markdown Features

## Table of Contents
- [Supported Markdown Syntax](#supported-markdown-syntax)
- [Custom Markdown Format](#custom-markdown-format)
- [Live Markdown Preview with Marked.js](#live-markdown-preview-with-markedjs)
- [Table Support in Markdown Mode](#table-support-in-markdown-mode)
- [Image Insertion in Markdown Mode](#image-insertion-in-markdown-mode)
- [Mention Support in Markdown Mode](#mention-support-in-markdown-mode)

---

## Supported Markdown Syntax

The Markdown editor supports the following syntax natively:

| Command | Syntax | Description |
|---------|--------|-------------|
| Bold | `**text**` or `__text__` | Bold text |
| Italic | `*text*` or `_text_` | Italic text |
| Bold + Italic | `***text***` | Combined bold and italic |
| Heading 1–6 | `# H1` through `###### H6` | Heading levels |
| Blockquote | `> text` | Block quotation |
| Strikethrough | `~~text~~` | Strikethrough |
| Inline code | `` `code` `` | Inline code |
| Code block | ` ```multi-line``` ` | Multi-line code block |
| Subscript | `<sub>text</sub>` | Subscript |
| Superscript | `<sup>text</sup>` | Superscript |
| Ordered list | `1. item` | Numbered list |
| Unordered list | `* item` | Bullet list |
| Link | `[text](url)` or `[text](url "title")` | Hyperlink |
| Image | `![alt](image.png)` | Inline image |
| Table | `| H1 | H2 |\n|---|---|\n| v1 | v2 |` | Table |
| Horizontal line | `***` or `___` on a new line | Horizontal rule |
| Line break | Two newlines or `<br>` | Paragraph break |
| HTML entities | `&copy;`, `&trade;`, `&amp;` etc. | HTML character entities |
| Escape character | `\*` | Escape markdown syntax |

> Footnotes, definitions, math notation, and task list checkboxes are **not** supported. Use raw HTML tags within the Markdown editor for unsupported syntax.

---

## Custom Markdown Format

You can define custom markdown syntax mappings beyond the defaults using the `formatter` configuration. This allows assigning different characters or patterns to formatting commands.

Refer to the Syncfusion documentation for the `MarkdownFormatter` class and its `listStyle` and other options when customizing the output.

---

## Live Markdown Preview with Marked.js

The editor does not render a preview natively. Integrate the third-party [Marked.js](https://marked.js.org/) library to show a live HTML preview alongside the Markdown editor.

Use a Splitter to show both panes side-by-side:

```razor
<ejs-splitter id="markdown-splitter" height="450px" width="100%">
    <e-splitter-panes>
        <e-splitter-pane size="50%" resizable="true" min="40%">
            <e-content-template>
                <ejs-richtexteditor id="md-editor" editorMode="Markdown"
                    value="@ViewBag.value"
                    saveInterval="1"
                    change="onMarkdownChange"
                    created="onEditorCreated">
                    <e-richtexteditor-toolbarsettings items="@ViewBag.tools">
                    </e-richtexteditor-toolbarsettings>
                </ejs-richtexteditor>
            </e-content-template>
        </e-splitter-pane>
        <e-splitter-pane min="40%">
            <e-content-template>
                <div id="md-preview" style="padding: 20px; overflow: auto;"></div>
            </e-content-template>
        </e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<!-- Load Marked.js from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.19/marked.js"></script>
<script>
    var rteObj;
    function onEditorCreated() {
        rteObj = this;
        renderPreview();
    }
    function onMarkdownChange() {
        renderPreview();
    }
    function renderPreview() {
        var mdContent = rteObj.contentModule.getEditPanel().value;
        document.getElementById('md-preview').innerHTML = marked(mdContent);
    }
</script>
```

```csharp
public ActionResult Index()
{
    ViewBag.value = @"# Welcome
Write **markdown** here and see the preview on the right.";
    ViewBag.tools = new[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "Formats", "Blockquote", "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|", "Undo", "Redo"
    };
    return View();
}
```

**Key points:**
- `saveInterval="1"` ensures the `change` event fires frequently while typing
- `rteObj.contentModule.getEditPanel().value` retrieves the raw Markdown text
- `marked(mdContent)` converts Markdown to HTML for display

---

## Table Support in Markdown Mode

Tables are supported in Markdown mode using the `CreateTable` toolbar item. The editor inserts a Markdown-formatted table:

```markdown
| Heading 1 | Heading 2 |
|-----------|-----------|
| Cell A1   | Cell A2   |
| Cell B1   | Cell B2   |
```

Add `CreateTable` to the toolbar items array to enable this:

```csharp
ViewBag.tools = new[] {
    "Bold", "Italic", "|",
    "OrderedList", "UnorderedList", "|",
    "CreateLink", "Image", "CreateTable", "|",
    "Undo", "Redo"
};
```

---

## Image Insertion in Markdown Mode

The `Image` toolbar item in Markdown mode inserts the standard Markdown image syntax:

```markdown
![alt text](image-url)
```

When an image is selected from the local machine or a URL is entered, the editor generates this syntax automatically.

```csharp
ViewBag.tools = new[] {
    "Bold", "Italic", "|",
    "CreateLink", "Image", "|",
    "Undo", "Redo"
};
```

---

## Mention Support in Markdown Mode

Mentions work the same way in Markdown mode as in HTML mode. Target the `_rte-edit-view` element with the Mention component:

```razor
<ejs-richtexteditor id="md-mention" editorMode="Markdown" placeholder="Type @ to mention">
</ejs-richtexteditor>

<ejs-mention id="mention"
    target="#md-mention_rte-edit-view"
    dataSource="@data"
    suggestionCount="8">
    <e-mention-fields text="Name" Value="EmailId"></e-mention-fields>
</ejs-mention>
```

```csharp
@{
    List<EmployeeData> data = new EmployeeData().EmployeeList();
}
```

> The target ID format is always: `{editor-id}_rte-edit-view`. If the editor `id` is `md-mention`, the target is `#md-mention_rte-edit-view`.
