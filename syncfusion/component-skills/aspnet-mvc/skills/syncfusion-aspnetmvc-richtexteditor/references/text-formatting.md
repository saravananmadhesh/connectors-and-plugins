# Text Formatting

## Table of Contents
- [Basic Text Styles](#basic-text-styles)
- [Font Name, Size, and Color](#font-name-size-and-color)
- [Headings and Paragraph Formats](#headings-and-paragraph-formats)
- [Text Alignments](#text-alignments)
- [Lists: Ordered, Unordered, Indent](#lists-ordered-unordered-indent)
- [Blockquote and Code Block](#blockquote-and-code-block)
- [Remove Formatting](#remove-formatting)
- [Format Painter](#format-painter)

---

## Basic Text Styles

Add these items to `ToolbarSettings` to enable standard inline text formatting:

```csharp
ViewBag.tools = new[] {
    "Bold", "Italic", "Underline", "StrikeThrough",
    "SuperScript", "SubScript", "UpperCase", "LowerCase"
};
```

Users can also apply these with standard keyboard shortcuts: **Ctrl+B**, **Ctrl+I**, **Ctrl+U**.

---

## Font Name, Size, and Color

Font controls let users change typeface, size, text color, and background highlight:

```csharp
ViewBag.tools = new[] {
    "FontName", "FontSize", "FontColor", "BackgroundColor"
};
```

**Custom font list:** Override the default font names by providing your own list:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .FontFamily(e => e.Items((object)ViewBag.fontItems))
    .ToolbarSettings(e => e.Items((object)ViewBag.tools))
    .Render())
```

```csharp
ViewBag.fontItems = new[] {
    new { text = "Segoe UI", value = "Segoe UI" },
    new { text = "Roboto", value = "Roboto" },
    new { text = "Georgia", value = "Georgia" },
    new { text = "Impact", value = "Impact, Charcoal, sans-serif" }
};
```

**Custom font size list:**

```cshtml
.FontSize(e => e.Items((object)ViewBag.fontSizes))
```

```csharp
ViewBag.fontSizes = new[] {
    new { text = "8", value = "8pt" },
    new { text = "10", value = "10pt" },
    new { text = "12", value = "12pt" },
    new { text = "14", value = "14pt" },
    new { text = "18", value = "18pt" },
    new { text = "24", value = "24pt" }
};
```

---

## Headings and Paragraph Formats

The `Formats` toolbar item provides a dropdown with paragraph and heading styles. Users can apply Heading 1–6, Normal, Preformatted, etc.

```csharp
ViewBag.tools = new[] { "Formats" };
```

**Custom format tags:** Override with only the formats you need:

```cshtml
.Format(e => e.Types((object)ViewBag.formatTypes))
```

```csharp
ViewBag.formatTypes = new[] {
    new { text = "Normal", value = "P" },
    new { text = "Heading 1", value = "H1" },
    new { text = "Heading 2", value = "H2" },
    new { text = "Heading 3", value = "H3" },
    new { text = "Code", value = "Pre" }
};
```

---

## Text Alignments

The `Alignments` item provides left, center, right, and justify alignment:

```csharp
ViewBag.tools = new[] { "Alignments" };
```

This sets the `text-align` CSS property on the selected block element.

---

## Lists: Ordered, Unordered, Indent

```csharp
ViewBag.tools = new[] {
    "OrderedList", "UnorderedList", "Outdent", "Indent"
};
```

- **OrderedList** → `<ol>` with numbered items
- **UnorderedList** → `<ul>` with bullet items
- **Outdent / Indent** → decrease/increase nesting level of a list item

---

## Blockquote and Code Block

### Blockquote

Add `Blockquote` to the toolbar to wrap selected text in a `<blockquote>`:

```csharp
ViewBag.tools = new[] { "Formats", "Blockquote" };
```

### Code Block

Enable syntax-highlighted code blocks with the `InsertCode` toolbar item or via the `Formats` → `Preformatted` option:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Formats", "SourceCode" }))
    .Render())
```

For formatted code block insertion with language selection, use the dedicated code block feature:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "InsertCode" }))
    .Render())
```

---

## Remove Formatting

The `ClearFormat` toolbar item strips all inline formatting (bold, italic, color, etc.) from the selection, leaving plain text:

```csharp
ViewBag.tools = new[] { "Bold", "Italic", "FontColor", "|", "ClearFormat" };
```

---

## Format Painter

The `FormatPainter` item copies formatting from one text selection and applies it to another — like "copy format" in Word:

```csharp
ViewBag.tools = new[] { "Bold", "FontColor", "|", "FormatPainter" };
```

**How it works:**
1. Select formatted text
2. Click **FormatPainter** (cursor changes to a paintbrush)
3. Select the target text — formatting is applied immediately

> Single-click FormatPainter applies once. Double-click locks it — click FormatPainter again or press **Escape** to exit paint mode.
