# Document

The `documentExtension` registers the root `document` node of the editor schema. Every Headless Editor instance requires exactly one `document` node, which acts as the top-level container that wraps all block-level content, such as paragraphs, headings, lists, and tables.

This page combines the **document node registration**, the **document-structure content model** (block layers, inline content, marks, schema stability, examples), and the **document-related public API types** (`DocumentRoot`, `EditorNode`, `TextNode`, `EditorState`, `Position`, `Mark`).

## Table of Contents

- [Register the extension](#register-the-extension)
- [Document tree architecture](#document-tree-architecture)
- [Document root identity](#document-root-identity)
- [Content layers](#content-layers)
- [Block-level nodes](#block-level-nodes)
  - [Common block structure](#common-block-structure)
  - [Block node types](#block-node-types)
- [Inline content](#inline-content)
  - [Text nodes](#text-nodes)
  - [Example with marks](#example-with-marks)
  - [Inline nodes](#inline-nodes)
  - [Inline vs block composition](#inline-vs-block-composition)
- [Marks system](#marks-system)
  - [Mark attributes](#mark-attributes)
  - [Common built-in marks](#common-built-in-marks)
  - [Multiple marks on text](#multiple-marks-on-text)
- [Schema stability](#schema-stability)
- [Document examples](#document-examples)
  - [Simple paragraph](#simple-paragraph)
  - [Formatted text (mixing bold and plain)](#formatted-text-mixing-bold-and-plain)
  - [Heading with text](#heading-with-text)
  - [Link](#link)
  - [Bullet list](#bullet-list)
- [API references](#api-references)
  - [DocumentRoot](#documentroot)
  - [EditorNode](#editornode)
  - [TextNode](#textnode)
  - [EditorState](#editorstate)
  - [Position](#position)
  - [Mark](#mark)

## Register the extension

The `document` extension has no configurable options. Add it to the `extensions` array when initializing the editor.

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, documentExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [documentExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

> The Headless Editor automatically adds the required `document` and `text` extensions if they are not registered. Explicit registration is supported but not required for a valid schema.

## Document tree architecture

A Headless Editor document is a tree of nodes. The root is always a single `document` node. Inside the root are blocks such as paragraphs, headings, lists, tables, images, and code blocks. Each block can contain inline content, including text and inline nodes, and text can carry inline formatting marks.

```
document
└── paragraph
│   └── text "Hello "
│   │   └── marks: [bold]
│   └── text "world"
└── heading (level: 1)
│   └── text "Welcome"
└── bulletList
    └── listItem
        └── paragraph
            └── text "First item"
```

## Document root identity

The document root has the following fields:

| Field | Type | Purpose |
|-------|------|---------|
| `type` | string | Always `'document'`. |
| `schemaVersion` | number | Version of the schema the document was authored against. |
| `attrs` | object | Reserved for future root-level attributes. Typically empty. |
| `marks` | array | Root-level marks. |
| `children` | array | The top-level block nodes. |

```ts
import { DocumentRoot } from '@syncfusion/ej2-headless-editor';

const document: DocumentRoot = {
    type: 'document',
    schemaVersion: 1,
    attrs: {},
    marks: [],
    children: [
        {
            type: 'paragraph',
            attrs: {},
            marks: [],
            children: [
                {
                    type: 'text',
                    attrs: {},
                    marks: [],
                    text: 'Hello world'
                }
            ]
        }
    ]
};
```

The `type` is always the string `'document'`, and `schemaVersion` identifies the schema version associated with the document.

## Content layers

A document contains two layers of content:

- **Block-level nodes** paragraphs, headings, blockquotes, code blocks, lists, list items, tables, table rows, table cells, images, horizontal rules, and any custom block types you add through extensions.
- **Inline content** text, marks, and inline nodes such as images. Inline content lives inside block-level nodes.

Blocks are the top-level children of the document root. A text node is always inside a block and never appears directly under the document root.

```ts
{
    type: 'paragraph',
    attrs: { align: 'left', indent: 0 },
    marks: [],
    children: [
        {
            type: 'text',
            attrs: {},
            marks: [
                { type: 'bold', attrs: {} }
            ],
            text: 'Bold text'
        },
        {
            type: 'text',
            attrs: {},
            marks: [],
            text: ' followed by plain text.'
        }
    ]
}
```

## Block-level nodes

A node's `type` decides whether it is a block, an inline node, a leaf, or a container. These categories describe the role a node plays in the tree and are not separate classes.

- **Block nodes** appear as top-level children of the document and group other content. Examples: `paragraph`, `heading`, `blockquote`, `listItem`, `tableRow`, `tableCell`.
- **Inline nodes** live inside blocks. Examples: `text`, `hardBreak`, and inline-level extensions.
- **Leaf nodes** are nodes without children/content. Examples: `image`, `horizontalRule`.
- **Container nodes** are blocks that hold other blocks. Examples: `bulletList`, `orderedList`, `table`.

The `group` field on a node's `NodeDefinition` (`'block'`, `'inline'`, `'container'`, `'root'`, `'block list'`, `'list'`) decides which category a node belongs to. You do not need to set this directly when reading a document, because the category is implied by the `type` and the position of the node in the tree.

### Common block structure

All block nodes share this basic shape:

```ts
{
    type: 'paragraph',           // Node type identifier
    attrs: {},                   // Node-specific attributes
    marks: [],                   // Marks applied to the block
    children: [...]              // Child content (text, inline nodes, or nested blocks)
}
```

### Block node types

| Type | Role |
|------|------|
| `paragraph` | Block — basic text container |
| `heading` | Block — title (level 1-6) |
| `blockquote` | Block — quoted content |
| `codeBlock` | Block — monospace code |
| `bulletList` | Container — unordered list |
| `orderedList` | Container — numbered list |
| `taskList` | Container — checklist |
| `listItem` | Block — list entry |
| `table` | Container — data grid |
| `tableRow` | Block — row in table |
| `tableCell` | Block — cell in row |
| `callout` | Block — highlighted info box |
| `collapsible` | Block — expandable content |
| `image` | Leaf — embedded image |
| `horizontalRule` | Leaf — visual separator |
| `hardBreak` | Inline — line break within a paragraph |

## Inline content

Inline content lives inside block nodes and represents the actual content and formatting.

### Text nodes

Every part of a Headless Editor document is a node. A text node has a `text` string and no `children`.

```ts
import { EditorNode, TextNode } from '@syncfusion/ej2-headless-editor';

// A block node — has children.
const heading: EditorNode = {
    type: 'heading',
    attrs: { level: 2 },
    marks: [],
    children: [
        {
            type: 'text',
            attrs: {},
            marks: [],
            text: 'Section title'
        } as TextNode
    ]
};

// A text node — has a text string, no children.
const text: TextNode = {
    type: 'text',
    attrs: {},
    marks: [],
    text: 'Hello world'
};
```

### Example with marks

```ts
{
    type: 'text',
    attrs: {},
    marks: [
        { type: 'bold', attrs: {} },
        { type: 'italic', attrs: {} }
    ],
    text: 'Bold and italic text'
}
```

### Inline nodes

Special inline elements that are not simple text:

```ts
{
    type: 'hardBreak',
    attrs: {},
    marks: []
}
```

Inline nodes include `hardBreak` (line break within a paragraph), and custom inline nodes from extensions.

### Inline vs block composition

A document is composed in two layers:

- **Block layer**: the document root holds one or more block-level children. Block-level children can themselves contain other blocks when the schema allows it (for example, a `listItem` contains a `paragraph`).
- **Inline layer**: a block that accepts inline content holds text nodes and inline nodes. Text nodes carry marks.

Most blocks (paragraphs, headings) accept only inline content. A few blocks (list items, table cells, callouts) accept other blocks inside them. The schema's content rule is what determines this.

## Marks system

A mark is inline formatting attached to text — `bold`, `italic`, `link`, and so on. Marks always live on text nodes (and on block-level nodes that support block marks). They never appear as their own nodes in the tree.

A mark has:

- `type`: The mark's name.
- `attrs`: Mark-specific values such as an `href` for a link or a `color` for text color.

```ts
import { Mark } from '@syncfusion/ej2-headless-editor';

const link: Mark = {
    type: 'link',
    attrs: {
        href: 'https://example.com',
        target: '_blank'
    }
};
```

A text node carries its marks in the `marks` array. Adjacent text nodes can carry different marks, so a single line of text may switch between formatted and unformatted runs.

### Mark attributes

Marks have the same shape as node attributes: a `type` and an `attrs` property. The mark's `type` selects the formatting (`'bold'`, `'italic'`, `'link'`, `'underline'`, …), and the `attrs` carry the values the mark needs.

```ts
const textColor: Mark = {
    type: 'textColor',
    attrs: { color: '#ff0000' }
};

const highlight: Mark = {
    type: 'highlight',
    attrs: { color: '#fff176' }
};
```

A single text node can carry several marks at once. Marks stack in the order they appear in the `marks` array.

### Common built-in marks

The following marks are available through the built-in extensions in `basicExtensions` and the individual mark extensions. Some require their own extension to be registered (see [Extensions & Plugin System](./extensions.md)):

| Mark | Purpose | Attributes |
|------|---------|------------|
| `bold` | Bold text | None |
| `italic` | Italic text | None |
| `underline` | Underlined text | None |
| `strikethrough` | Strikethrough text | None |
| `inlineCode` | Monospace text | None |
| `link` | Hyperlink | `href`, `title`, `target`, `rel` |
| `textColor` | Text color | `color` |
| `backgroundColor` | Background color | `color` |
| `fontSize` | Font size | `size` |
| `fontFamily` | Font family | `family` |
| `subscript` | Subscript text | None |
| `superscript` | Superscript text | None |
| `upperCase` | UPPERCASE text | None |
| `lowerCase` | lowercase text | None |

### Multiple marks on text

A single text node can have multiple marks:

```ts
{
    type: 'text',
    attrs: {},
    marks: [
        { type: 'bold', attrs: {} },
        { type: 'textColor', attrs: { color: '#ff0000' } },
        { type: 'link', attrs: { href: '/docs' } }
    ],
    text: 'Red bold link'
}
```

## Schema stability

The schema defines which node types and which mark types are valid in the document. As long as the editor is configured with the same schema, the document you read out of it has the same shape as the document you wrote in.

This means a document saved as JSON today can be loaded back tomorrow and produce the same tree assuming the schema is unchanged.

```ts
// Save document as JSON
const savedDoc = editor.getDocument();
console.log(JSON.stringify(savedDoc, null, 2));

// Later, in a new session with same schema
const restoredEditor = HeadlessEditor.create({
    extensions: [basicExtensions],
    document: savedDoc
});

// Document structure is identical
console.log(JSON.stringify(restoredEditor.getDocument()) === JSON.stringify(savedDoc));
```

The `schemaVersion` field in the document root tracks which version of the schema created the document.

## Document examples

### Simple paragraph

```ts
const doc: DocumentRoot = {
    type: 'document',
    schemaVersion: 1,
    attrs: {},
    marks: [],
    children: [
        {
            type: 'paragraph',
            attrs: { align: 'left', indent: 0 },
            marks: [],
            children: [
                {
                    type: 'text',
                    attrs: {},
                    marks: [],
                    text: 'Hello world'
                }
            ]
        }
    ]
};
```

### Formatted text (mixing bold and plain)

```ts
{
    type: 'paragraph',
    attrs: { align: 'left', indent: 0 },
    marks: [],
    children: [
        {
            type: 'text',
            attrs: {},
            marks: [{ type: 'bold', attrs: {} }],
            text: 'Bold '
        },
        {
            type: 'text',
            attrs: {},
            marks: [],
            text: 'and plain text.'
        }
    ]
}
```

### Heading with text

```ts
{
    type: 'heading',
    attrs: { level: 1 },
    marks: [],
    children: [
        {
            type: 'text',
            attrs: {},
            marks: [],
            text: 'Welcome to the Editor'
        }
    ]
}
```

### Link

```ts
{
    type: 'paragraph',
    attrs: {},
    marks: [],
    children: [
        {
            type: 'text',
            attrs: {},
            marks: [
                {
                    type: 'link',
                    attrs: {
                        href: 'https://example.com',
                        target: '_blank'
                    }
                }
            ],
            text: 'Click here'
        }
    ]
}
```

### Bullet list

```ts
{
    type: 'bulletList',
    attrs: {},
    marks: [],
    children: [
        {
            type: 'listItem',
            attrs: {},
            marks: [],
            children: [
                {
                    type: 'paragraph',
                    attrs: {},
                    marks: [],
                    children: [
                        {
                            type: 'text',
                            attrs: {},
                            marks: [],
                            text: 'First item'
                        }
                    ]
                }
            ]
        },
        {
            type: 'listItem',
            attrs: {},
            marks: [],
            children: [
                {
                    type: 'paragraph',
                    attrs: {},
                    marks: [],
                    children: [
                        {
                            type: 'text',
                            attrs: {},
                            marks: [],
                            text: 'Second item'
                        }
                    ]
                }
            ]
        }
    ]
}
```

## API references

This section documents the document-related public API surface — the `DocumentRoot`, `EditorNode`, `TextNode`, and related types used in the document model.

### DocumentRoot

`DocumentRoot` — the top-level container for the entire document. Always has `type: 'document'`.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `Record` | Node attributes (alignment, indent, color, etc.). |
| `children` | `EditorNode[]` | Child nodes — empty array for leaf nodes. |
| `marks` | `Mark[]` | Marks applied to this node (for block-level mark support). |
| `schemaVersion` | `number` | Schema version — used for future migration handling. |

### EditorNode

`EditorNode` — base interface for all document nodes. Represents block and container nodes (paragraphs, headings, tables, etc.). Identity is position-based within the document tree; no persistent node IDs are stored on the model.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `Record` | Node attributes (alignment, indent, color, etc.). |
| `children` | `EditorNode[]` | Child nodes — empty array for leaf nodes. |
| `marks` | `Mark[]` | Marks applied to this node (for block-level mark support). |
| `type` | `string` | The node type name, matching a registered `NodeDefinition`. |

### TextNode

`TextNode` — a leaf node carrying inline text content. Extends `EditorNode` with a text string and inline marks.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `Record` | Node attributes (alignment, indent, color, etc.). |
| `children` | `never[]` | `TextNode` has no children. |
| `marks` | `Mark[]` | Inline marks applied to this text (bold, italic, link, etc.). |
| `text` | `string` | The raw text string. |
| `type` | `string` | The node type name, matching a registered `NodeDefinition`. |

### EditorState

`EditorState` — a pure Syncfusion-owned view of the current editor snapshot. Passed to every command via `CommandContext`. Built internally by `ImmediateExecutor` and `ChainExecutor` from PM state — PM types never escape this boundary.

| Property | Type | Description |
|----------|------|-------------|
| `document` | `DocumentRoot` | The current document root. |
| `isMounted` | `boolean` | Whether the editor is currently mounted to the DOM. |
| `selection` | `Selection` | The current selection (cursor / range). |

### Position

`Position` — Position relative to the document tree. A path is the sequence of child indices from the root down to the target node; an empty path points at the document root itself. `offset` carries any character offset inside the resolved node. Together they uniquely identify a cursor location without requiring persistent node IDs.

| Property | Type | Description |
|----------|------|-------------|
| `offset` | `number` | Zero-based character offset within the resolved node. |
| `path` | `number[]` | Path from document root to target: each element is a child index. |

### Mark

`Mark` — represents inline formatting applied to text.

| Property | Type | Description |
|----------|------|-------------|
| `attrs` | `Record` | Mark attributes — type-safe values only, no PM types. |
| `type` | `string` | The mark type name (e.g. `'bold'`, `'italic'`, `'link'`). |
