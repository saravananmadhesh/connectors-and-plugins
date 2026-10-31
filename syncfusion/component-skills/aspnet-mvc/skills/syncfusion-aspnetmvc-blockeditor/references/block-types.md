# Block Types & Configuration — Syncfusion ASP.NET MVC Block Editor

## Table of Contents
- [BlockModel Structure](#blockmodel-structure)
- [Supported Block Types](#supported-block-types)
- [Typography Blocks](#typography-blocks)
- [List Blocks](#list-blocks)
- [Utility Blocks](#utility-blocks)
- [Block Indent](#block-indent)
- [Block CSS Class](#block-css-class)
- [Template Blocks](#template-blocks)

---

## BlockModel Structure

Every block uses the same base model. Define `BlockModel` in your controller:

```csharp
public class BlockModel
{
    public string id { get; set; }        // Optional unique ID; auto-generated if omitted
    public string blockType { get; set; } // Required: block type name (see table below)
    public object properties { get; set; }// Type-specific config (level, isChecked, etc.)
    public List<object> content { get; set; } // Inline content items
    public int indent { get; set; }       // Indentation level (default: 0)
    public string CssClass { get; set; } // Custom CSS class applied to this block
}
```

---

## Supported Block Types

| Block Type | blockType Value | Key properties |
|---|---|---|
| Paragraph | `"Paragraph"` | placeholder |
| Heading (levels 1–4) | `"Heading"` | level (1–4), placeholder |
| Bullet List | `"BulletList"` | placeholder |
| Numbered List | `"NumberedList"` | placeholder |
| Checklist | `"Checklist"` | isChecked, placeholder |
| Code | `"Code"` | language |
| Quote | `"Quote"` | children (nested blocks) |
| Callout | `"Callout"` | children (nested blocks) |
| Divider | `"Divider"` | — |
| Collapsible Paragraph | `"CollapsibleParagraph"` | isExpanded, children, placeholder |
| Collapsible Heading | `"CollapsibleHeading"` | level (1–4), isExpanded, children, placeholder |
| Image | `"Image"` | src, altText, width, height |
| Table | `"Table"` | columns, rows, enableHeader, enableRowNumbers, readOnly, width |
| Template | `"Template"` | Template (HTML string) |

> For `Code`, `Callout`, `Table`, `Image`, and `Collapsible` blocks: the first Backspace/Delete applies an overlay selection; the second removes the block.

---

## Typography Blocks

### Paragraph

Default block for regular text. Default placeholder: `Write something or '/' for commands.`

```csharp
new BlockModel
{
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Regular paragraph text." }
    }
}
```

**Custom placeholder:**
```csharp
new BlockModel
{
    blockType = "Paragraph",
    properties = new { placeholder = "Start typing your notes..." }
}
```

### Heading

Use `level` (1–4) inside `properties`. Default placeholder: `Heading{level}`.

```csharp
// H1 — Document title
new BlockModel
{
    blockType = "Heading",
    properties = new { level = 1 },
    content = new List<object> { new { contentType = "Text", content = "Main Title" } }
}

// H2 — Section header
new BlockModel
{
    blockType = "Heading",
    properties = new { level = 2 },
    content = new List<object> { new { contentType = "Text", content = "Section Header" } }
}

// H3 and H4 follow the same pattern
```

### Divider

Inserts a horizontal separator line. No content or properties needed.

```csharp
new BlockModel { blockType = "Divider" }
```

---

## List Blocks

### Bullet List

```csharp
new BlockModel
{
    blockType = "BulletList",
    content = new List<object>
    {
        new { contentType = "Text", content = "First item" }
    }
}
```

### Numbered List

```csharp
new BlockModel
{
    blockType = "NumberedList",
    content = new List<object>
    {
        new { contentType = "Text", content = "Step one" }
    }
}
```

### Checklist

Use `isChecked` in `properties` to set initial checked state (default: `false`).

```csharp
// Checked item
new BlockModel
{
    blockType = "Checklist",
    properties = new { isChecked = true },
    content = new List<object>
    {
        new { contentType = "Text", content = "Completed task" }
    }
}

// Unchecked item
new BlockModel
{
    blockType = "Checklist",
    properties = new { isChecked = false },
    content = new List<object>
    {
        new { contentType = "Text", content = "Pending task" }
    }
}
```

---

## Utility Blocks

### Code Block

Set `language` in `properties` to enable syntax highlighting. Default language: `plainText`. Configure available languages via `CodeBlockSettings` on the editor root.

```csharp
new BlockModel
{
    blockType = "Code",
    properties = new { language = "javascript" },
    content = new List<object>
    {
        new { contentType = "Text", content = "function hello() {\n  console.log('Hello!');\n}" }
    }
}
```

**Global CodeBlockSettings on the editor:**
```csharp
public class CodeBlockSettingsModel
{
    public string defaultLanguage { get; set; }
    public List<object> languages { get; set; }
}

var codeSettings = new CodeBlockSettingsModel
{
    defaultLanguage = "javascript",
    languages = new List<object>
    {
        new { label = "JavaScript", language = "javascript" },
        new { label = "TypeScript", language = "typescript" },
        new { label = "HTML", language = "html" },
        new { label = "CSS", language = "css" }
    }
};
ViewBag.CodeBlocksData = codeSettings;
```

---

## Block Indent

Control indentation level with the `indent` property (default: `0`). Higher values nest the block further from the left margin.

```csharp
new BlockModel
{
    blockType = "Paragraph",
    indent = 0,
    content = new List<object> { new { contentType = "Text", content = "No indentation" } }
},
new BlockModel
{
    blockType = "Paragraph",
    indent = 1,
    content = new List<object> { new { contentType = "Text", content = "One level indent" } }
},
new BlockModel
{
    blockType = "Paragraph",
    indent = 2,
    content = new List<object> { new { contentType = "Text", content = "Two levels indent" } }
}
```

---

## Block CSS Class

Apply custom CSS classes to individual blocks using the `CssClass` property on `BlockModel`. Define corresponding styles in your view or stylesheet.

```csharp
public class BlockModel
{
    public string blockType { get; set; }
    public string CssClass { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}

// Usage:
new BlockModel
{
    blockType = "Paragraph",
    CssClass = "info-block",
    content = new List<object> { new { contentType = "Text", content = "Info message" } }
},
new BlockModel
{
    blockType = "Paragraph",
    CssClass = "warning-block",
    content = new List<object> { new { contentType = "Text", content = "Warning message" } }
}
```

```css
/* Target blocks with custom class using .e-block selector */
.e-block.info-block {
    background-color: #e6f3ff;
    border-left: 4px solid #007bff;
    padding: 10px;
}
.e-block.warning-block {
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 10px;
}
```

---

## Template Blocks

Use `blockType = "Template"` with a `Template` HTML string for fully custom block content.

```csharp
// Add Template property to BlockModel:
public class BlockModel
{
    public string blockType { get; set; }
    public string Template { get; set; }
    // ... other properties
}

// Usage:
new BlockModel
{
    blockType = "Template",
    Template = "<div class=\"notification-card\">" +
               "<h3>Important Announcement</h3>" +
               "<p>System maintenance on Saturday 2–4 AM.</p>" +
               "</div>"
}
```

> Template blocks render raw HTML. Ensure content is sanitized before use to prevent XSS. The `EnableHtmlSanitizer` property provides built-in protection.
