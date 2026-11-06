# Nested Blocks — Syncfusion ASP.NET MVC Block Editor

Nested block structures apply to **Collapsible**, **Quote**, and **Callout** block types. Children are configured through the `properties.children` array and share the same `BlockModel` structure as top-level blocks.

## Table of Contents
- [Collapsible Blocks](#collapsible-blocks)
- [Quote Block](#quote-block)
- [Callout Block](#callout-block)
- [Parent-Child Relationships](#parent-child-relationships)

---

## Collapsible Blocks

Collapsible blocks allow sections to be expanded or collapsed. Two variants are available:

- `CollapsibleHeading` — heading that toggles its children, supports `level` (1–4)
- `CollapsibleParagraph` — paragraph that toggles its children

### CollapsibleHeading

```csharp
public class BlockModel
{
    public string id { get; set; }
    public string blockType { get; set; }
    public string parentId { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}

// Expanded collapsible heading (H1)
new BlockModel
{
    id = "section-1",
    blockType = "CollapsibleHeading",
    content = new List<object>
    {
        new { contentType = "Text", content = "Collapsible Section" }
    },
    properties = new
    {
        level = 1,
        isExpanded = true,         // true = open on load; false = collapsed
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "This content is inside and can be collapsed." }
                }
            },
            new BlockModel
            {
                blockType = "BulletList",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Nested bullet item" }
                }
            }
        }
    }
}
```

### CollapsibleParagraph

```csharp
// Collapsed by default (isExpanded = false)
new BlockModel
{
    blockType = "CollapsibleParagraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Toggle paragraph section" }
    },
    properties = new
    {
        isExpanded = false,
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Hidden until expanded." }
                }
            }
        }
    }
}
```

### Collapsible Properties

| Property | Type | Description | Default |
|---|---|---|---|
| `level` | int | Heading level 1–4 (CollapsibleHeading only) | — |
| `isExpanded` | bool | Whether block is open on initial render | `false` |
| `children` | List\<BlockModel\> | Nested child blocks | `[]` |
| `placeholder` | string | Placeholder text when block is empty | `"Collapsible Heading{level}"` / `"Collapsible Paragraph"` |

---

## Quote Block

Quote blocks are styled containers for quotations or excerpts. Children are nested `Paragraph` blocks configured through `properties.children`.

```csharp
new BlockModel
{
    blockType = "Quote",
    properties = new
    {
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new
                    {
                        contentType = "Text",
                        content = "The greatest glory in living lies not in never falling, but in rising every time we fall."
                    }
                }
            }
        }
    }
}
```

```razor
@Html.EJS().BlockEditor("block-editor").Blocks((List<BlockModel>)ViewBag.BlocksData).Render()
```

---

## Callout Block

Callout blocks highlight important information (notes, warnings, tips). Like Quote, children are configured via `properties.children`.

```csharp
new BlockModel
{
    blockType = "Callout",
    properties = new
    {
        children = new List<BlockModel>
        {
            new BlockModel
            {
                id = "callout-content-1",
                blockType = "Paragraph",
                content = new List<object>
                {
                    new
                    {
                        id = "callout-content-1",
                        contentType = "Text",
                        content = "Important: Save your work before the scheduled maintenance window."
                    }
                }
            }
        }
    }
}
```

---

## Parent-Child Relationships

To explicitly define a parent-child relationship, set `parentId` as a **top-level property** on the child `BlockModel` to match the parent block's `id`. This is important when managing nested structures programmatically.

First, add `parentId` to the `BlockModel` class:

```csharp
public class BlockModel
{
    public string id { get; set; }
    public string blockType { get; set; }
    public string parentId { get; set; }   // Top-level parent reference
    public object properties { get; set; }
    public List<object> content { get; set; }
}
```

```csharp
new BlockModel
{
    id = "parent-block",
    blockType = "CollapsibleHeading",
    properties = new
    {
        level = 2,
        isExpanded = true,
        children = new List<BlockModel>
        {
            new BlockModel
            {
                id = "child-block-1",
                blockType = "Paragraph",
                parentId = "parent-block",   // Top-level, not inside properties
                content = new List<object>
                {
                    new { contentType = "Text", content = "Child paragraph content." }
                }
            }
        }
    }
}
```

> `parentId` is a top-level property on `BlockModel`, not nested inside `properties`. It is especially useful when using `addBlock` or `updateBlock` methods programmatically to maintain structural integrity.
