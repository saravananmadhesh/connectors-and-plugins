# Markdown Mode

## Table of Contents
- [Overview](#overview)
- [Basic Markdown Editor Setup](#basic-markdown-editor-setup)
- [Supported Markdown Syntax](#supported-markdown-syntax)
- [Live Preview with Marked.js](#live-preview-with-markedjs)
- [Custom Markdown Syntax](#custom-markdown-syntax)
- [Mention Support in Markdown Mode](#mention-support-in-markdown-mode)

---

## Overview

When `EditorMode` is set to `Markdown`, the Rich Text Editor becomes a plain-text Markdown editor. Users type Markdown syntax and the editor stores raw Markdown. To display a rendered preview, use a third-party library like [Marked.js](https://marked.js.org/).

The Markdown Editor supports:
- **Block tags:** `h1`–`h6`, `blockquote`, `pre`, `p`, `ol`, `ul`
- **Inline selection tags:** `Bold`, `Italic`, `StrikeThrough`, `InlineCode`, `SubScript`, `SuperScript`, `UpperCase`, `LowerCase`
- **Insert commands:** `Image`, `Link`, `Table`

---

## Basic Markdown Editor Setup

```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("mdEditor")
    .EditorMode(EditorMode.Markdown)
    .ToolbarSettings(e => e.Items((object)ViewBag.items))
    .Value(ViewBag.value)
    .Render())
```

```csharp
public ActionResult Index()
{
    ViewBag.items = new[] {
        "Bold", "Italic", "StrikeThrough", "InlineCode",
        "SuperScript", "SubScript", "|",
        "Formats", "Blockquote", "|",
        "OrderedList", "UnorderedList",
        "CreateLink", "Image", "CreateTable", "|",
        "Undo", "Redo"
    };
    ViewBag.value = @"**Overview**
The Markdown Editor supports markdown editing when `editorMode` is set as `markdown`.
Using both *keyboard interaction* and *toolbar action*, you can apply formatting to text.";
    return View();
}
```

---

## Supported Markdown Syntax

| Command | Syntax | Notes |
|---------|--------|-------|
| Bold | `**text**` or `__text__` | Wraps selection |
| Italic | `*text*` or `_text_` | Wraps selection |
| Bold + Italic | `***text***` | Wraps selection |
| Heading 1 | `# Heading` | Start of line |
| Heading 2 | `## Heading` | Start of line |
| Heading 3 | `### Heading` | Start of line |
| Heading 4–6 | `####`, `#####`, `######` | Start of line |
| Blockquote | `> text` | Start of line |
| StrikeThrough | `~~text~~` | Wraps selection |
| Inline Code | `` `code` `` | Wraps selection |
| Code Block | ` ``` ` on new lines | Multi-line |
| Subscript | `<sub>text</sub>` | HTML tags |
| Superscript | `<sup>text</sup>` | HTML tags |
| Ordered List | `1. item` | Preceding line |
| Unordered List | `* item` or `- item` | Preceding line |
| Link | `[text](url)` or `[text](url "title")` | Insert dialog |
| Image | `![alt](url)` | Insert dialog |
| Table | `\| H1 \| H2 \|\n\|---\|---\|` | Insert dialog |
| Horizontal Rule | `***` or `___` on new line | |
| Escape | `\**text**` | Prefix `\` |
| HTML Entities | `&copy;`, `&trade;`, `&amp;`, etc. | Standard HTML |
| Line Break | `<br>` or two Enter presses | |

> Footnotes, definitions, math equations, and checklist syntax are **not supported** by the Syncfusion Markdown Editor.

---

## Live Preview with Marked.js

To show a real-time rendered preview alongside the Markdown editor, combine the editor with a Splitter and Marked.js.

```cshtml
@Html.EJS().Splitter("splitter")
    .Height("450px")
    .Width("100%")
    .PaneSettings(pane => {
        pane.Size("50%").Resizable(true).ContentTemplate(@<div>
            @(Html.EJS().RichTextEditor("mdPreview")
                .Height("448px")
                .EditorMode(Syncfusion.EJ2.RichTextEditor.EditorMode.Markdown)
                .ToolbarSettings(e => e.Items((object)ViewBag.items))
                .Value(ViewBag.value)
                .Created("onRteCreated")
                .Change("onRteChange")
                .ActionComplete("updatePreview")
                .Render())
        </div>).Add();
        pane.Size("50%").ContentTemplate(@<div>
            <h6><b>HTML Preview</b></h6>
            <div class="preview-pane"></div>
        </div>).Add();
    })
    .Render()

<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.19/marked.js"></script>
<script>
    var rteObj, textArea;

    function onRteCreated() {
        rteObj = this;
        textArea = rteObj.contentModule.getEditPanel();
        updatePreview();
    }

    function onRteChange() {
        updatePreview();
    }

    function updatePreview() {
        var previewEl = document.querySelector('.preview-pane');
        if (previewEl && rteObj) {
            previewEl.innerHTML = marked(rteObj.contentModule.getEditPanel().value);
        }
    }
</script>
```

```csharp
public ActionResult Index()
{
    ViewBag.items = new[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|",
        "Undo", "Redo"
    };
    ViewBag.value = "**Hello World!**\n\nStart typing Markdown here...";
    return View();
}
```

---

## Custom Markdown Syntax

Override the default Markdown symbols using the `MarkdownFormatter` in the `created` event. This lets you define custom characters for bold, italic, lists, etc.

```cshtml
@(Html.EJS().RichTextEditor("mdCustom")
    .EditorMode(EditorMode.Markdown)
    .ToolbarSettings(e => e.Items((object)ViewBag.items))
    .Value(ViewBag.value)
    .Created("onCreated")
    .Render())

<script>
    function onCreated() {
        var rteObj = this;
        // Override default Markdown symbols
        rteObj.formatter = new ej.richtexteditor.MarkdownFormatter({
            listTags: {
                'OL': '1., 2., 3.',
                'UL': '+ '            // use + instead of -
            },
            formatTags: {
                'Blockquote': '> '
            },
            selectionTags: {
                'Bold': '__',          // use __ instead of **
                'Italic': '_'          // use _ instead of *
            }
        });
        rteObj.dataBind();
    }
</script>
```

```csharp
public ActionResult Index()
{
    ViewBag.items = new[] {
        "Bold", "Italic", "StrikeThrough", "|",
        "OrderedList", "UnorderedList", "|",
        "CreateLink", "Image", "CreateTable", "|",
        "Undo", "Redo"
    };
    ViewBag.value = "Customize the markdown symbols with your preferred style.";
    return View();
}
```

---

## Mention Support in Markdown Mode

Target the Mention control to the Markdown editor's textarea using `#rteId_editable-content`:

```cshtml
@using Syncfusion.EJ2.DropDowns

@(Html.EJS().RichTextEditor("mdMention")
    .EditorMode(Syncfusion.EJ2.RichTextEditor.EditorMode.Markdown)
    .ToolbarSettings(e => e.Items((object)ViewBag.items))
    .Value(ViewBag.value)
    .Render())

@(Html.EJS().Mention("mention")
    .Target("#mdMention_editable-content")
    .DataSource((IEnumerable<object>)ViewBag.mentionData)
    .Fields(new MentionFieldSettings { Text = "Name" })
    .DisplayTemplate("[@@${Name}](mailto:${Email})")
    .PopupWidth("250px")
    .PopupHeight("200px")
    .Render())
```

The `DisplayTemplate` uses Markdown link syntax so inserted mentions render as proper links when previewed.
