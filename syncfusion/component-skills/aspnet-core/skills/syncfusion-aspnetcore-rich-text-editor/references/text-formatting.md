# Text Formatting

## Table of Contents
- [Basic Text Styles](#basic-text-styles)
- [Font Styling](#font-styling)
- [Headings and Paragraph Formats](#headings-and-paragraph-formats)
- [Text Alignments](#text-alignments)
- [Indent and Outdent](#indent-and-outdent)
- [Lists](#lists)
- [Blockquote and Quotation Formatting](#blockquote-and-quotation-formatting)

---

## Basic Text Styles

Add these items to the toolbar `items` array to enable each style:

| Tool | Output Tag | Description |
|------|-----------|-------------|
| `Bold` | `<b>` | Bold text |
| `Italic` | `<em>` | Italic text |
| `Underline` | `<u>` | Underlined text |
| `StrikeThrough` | `<strike>` | Strikethrough text |
| `InlineCode` | `<code>` | Inline code formatting |
| `SubScript` | `<sub>` | Subscript |
| `SuperScript` | `<sup>` | Superscript |
| `LowerCase` | — | Convert selection to lowercase |
| `UpperCase` | — | Convert selection to uppercase |

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "Underline", "StrikeThrough",
    "InlineCode", "SubScript", "SuperScript",
    "LowerCase", "UpperCase"
};
```

---

## Font Styling

Font controls let users choose typeface, size, color, and background color:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] {
    "Bold", "Italic", "|",
    "FontName", "FontSize", "FontColor", "BackgroundColor"
};
```

> `FontName`, `FontSize`, `FontColor`, and `BackgroundColor` are only valid in HTML mode. Do not include them in Markdown mode toolbars.

---

## Headings and Paragraph Formats

The `Formats` dropdown lets users apply heading levels (H1–H6), paragraph, preformatted, and blockquote styles.

```csharp
ViewBag.items = new[] { "Formats" };
```

This renders a dropdown showing: Paragraph, Code, Quotation, H1, H2, H3, H4, H5, H6.

---

## Text Alignments

The `Alignments` dropdown provides left, center, right, and justify alignment.

```csharp
ViewBag.items = new[] { "Formats", "Alignments" };
```

> `Alignments` applies inline `text-align` style to the paragraph. In Markdown mode, alignment is not supported.

---

## Indent and Outdent

Use `Indent` and `Outdent` to increase or decrease indentation of selected paragraphs:

```csharp
ViewBag.items = new[] {
    "OrderedList", "UnorderedList", "Outdent", "Indent"
};
```

---

## Lists

Create ordered and unordered lists:

| Tool | Output | Use when |
|------|--------|----------|
| `OrderedList` | `<ol>` | Numbered lists |
| `UnorderedList` | `<ul>` | Bullet lists |

```csharp
ViewBag.items = new[] { "OrderedList", "UnorderedList" };
```

Both work in HTML and Markdown modes.

---

## Blockquote and Quotation Formatting

### Blockquote

The `Blockquote` toolbar item wraps selected content in a `<blockquote>` element:

```csharp
ViewBag.items = new[] { "Formats", "Blockquote" };
```

Alternatively, use the `Formats` dropdown and select "Quotation".

### Headings via Formats Dropdown

Use the `Formats` dropdown to apply H1–H6. This is the standard way to apply heading levels — there are no separate `H1`, `H2`, etc. toolbar items.

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items">
    </e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
public ActionResult Index()
{
    ViewBag.value = "<p>Use the Formats dropdown to apply heading levels.</p>";
    ViewBag.items = new[] {
        "Bold", "Italic", "Underline", "StrikeThrough", "|",
        "FontName", "FontSize", "FontColor", "BackgroundColor", "|",
        "Formats", "Alignments", "Blockquote", "|",
        "OrderedList", "UnorderedList", "Outdent", "Indent"
    };
    return View();
}
```
