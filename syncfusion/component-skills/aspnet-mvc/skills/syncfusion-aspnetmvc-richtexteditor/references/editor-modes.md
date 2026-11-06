# Editor Modes

## Table of Contents
- [HTML Mode (Default WYSIWYG)](#html-mode-default-wysiwyg)
- [Markdown Mode](#markdown-mode)
- [Choosing HTML vs Markdown](#choosing-html-vs-markdown)
- [IFrame Mode](#iframe-mode)
- [Inline Editing Mode](#inline-editing-mode)
- [Resizable Editor](#resizable-editor)

---

## HTML Mode (Default WYSIWYG)

The default mode. Users format content visually; the editor returns valid HTML markup. No `EditorMode` property is needed since `HTML` is the default.

```cshtml
@(Html.EJS().RichTextEditor("htmlEditor").Value(ViewBag.value).Render())
```

```csharp
public ActionResult Index()
{
    ViewBag.value = @"<p>The Syncfusion Rich Text Editor is a <b>WYSIWYG</b> editor.</p>
    <ul><li>Bulleted lists</li><li>Images, links, tables</li><li>Undo/redo manager</li></ul>";
    return View();
}
```

To explicitly set HTML mode:

```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("htmlEditor")
    .EditorMode(EditorMode.HTML)
    .Value(ViewBag.value)
    .Render())
```

---

## Markdown Mode

Set `EditorMode` to `Markdown` to enable a plain-text Markdown editor. Users write Markdown syntax and the editor stores raw Markdown text. A third-party library (e.g., [Marked.js](https://marked.js.org/)) is used separately if you want to render a live HTML preview.

```cshtml
@using Syncfusion.EJ2.RichTextEditor

@(Html.EJS().RichTextEditor("mdEditor")
    .EditorMode(EditorMode.Markdown)
    .Value(ViewBag.value)
    .Render())
```

```csharp
public ActionResult Index()
{
    ViewBag.value = @"***Overview***
The Rich Text Editor supports markdown editing when **editorMode** is set as `markdown`.
Using both *keyboard interaction* and *toolbar action*, you can apply formatting to text.

***Key features***
- *Mode*: IFRAME and DIV mode.
- *Toolbar*: Fully customizable toolbar.
- *Preview*: Preview the modified content before saving.";
    return View();
}
```

**Markdown-specific toolbar items:**

```csharp
ViewBag.tools = new[] {
    "Bold", "Italic", "StrikeThrough", "InlineCode",
    "SuperScript", "SubScript", "|",
    "Formats", "Blockquote", "|",
    "OrderedList", "UnorderedList",
    "CreateLink", "Image", "CreateTable", "|",
    "Undo", "Redo"
};
```

> For live preview, see `references/markdown-mode.md` — it covers Splitter integration with Marked.js.

---

## Choosing HTML vs Markdown

| Situation | Recommended Mode |
|-----------|-----------------|
| Content displayed as HTML in the browser | `EditorMode.HTML` |
| Content stored as plain Markdown in DB | `EditorMode.Markdown` |
| Non-technical users who want WYSIWYG | `EditorMode.HTML` |
| Developer-facing content (docs, README) | `EditorMode.Markdown` |
| Need live split-pane preview | `EditorMode.Markdown` + Marked.js |
| Need images, tables, rich media embedding | Either mode (both support it) |

---

## IFrame Mode

IFrame mode renders the editor content inside an `<iframe>` element, creating an isolated document. Useful when you need the editor styles to be completely separated from the parent page.

```cshtml
@(Html.EJS().RichTextEditor("iframeEditor")
    .IframeSettings(s => s.Enable(true))
    .Value(ViewBag.value)
    .Render())
```

**Adding custom attributes to the iframe body:**

```cshtml
@(Html.EJS().RichTextEditor("iframeEditor")
    .IframeSettings(s => s.Enable(true).Attributes((object)ViewBag.iframeAttr))
    .Value(ViewBag.value)
    .Render())
```

```csharp
ViewBag.iframeAttr = new { style = "background-color: #f9f9f9; padding: 10px;" };
```

**Adding external stylesheets inside the iframe:**

```cshtml
.IframeSettings(s => s
    .Enable(true)
    .Resources(r => r.Styles(new[] { "/Content/custom-rte.css" }))
)
```

> IFrame mode does NOT support the `InlineMode`. Use one or the other.

---

## Inline Editing Mode

Inline editing lets users click directly on content to edit it in-place without a fixed toolbar at the top. The toolbar appears as a floating popup.

```cshtml
@(Html.EJS().RichTextEditor("inlineEditor")
    .InlineMode(e => e.Enable(true).OnSelection(true))
    .ToolbarSettings(e => e.Items((object)ViewBag.items))
    .Value(ViewBag.value)
    .Render())
```

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "Underline", "StrikeThrough", "-",
    "Formats", "Alignments", "OrderedList", "UnorderedList"
};
```

**`OnSelection` behavior:**

| `OnSelection` | Toolbar appears when... |
|---------------|------------------------|
| `true` (default) | User selects text |
| `false` | Editable area receives focus |

> Inline mode is ideal for "edit in place" UX — e.g., editing a blog post body without navigating to a separate edit page.

---

## Resizable Editor

Allow users to drag-resize the editor height by enabling `EnableResize`:

```cshtml
@(Html.EJS().RichTextEditor("resizableEditor")
    .EnableResize(true)
    .Value(ViewBag.value)
    .Render())
```

Set a minimum and maximum height to constrain resizing:

```cshtml
@(Html.EJS().RichTextEditor("resizableEditor")
    .EnableResize(true)
    .MinLength(200)
    .Height("300px")
    .Value(ViewBag.value)
    .Render())
```
