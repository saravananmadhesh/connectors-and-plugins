# Block Types in Vue BlockEditor

Complete guide to all 14 block types available in the Syncfusion Vue BlockEditor component.

## Table of Contents

- [Block Model Structure](#block-model-structure)
- [Block Type Overview](#block-type-overview)
- [Typography Blocks](#typography-blocks)
- [List Blocks](#list-blocks)
- [Content Blocks](#content-blocks)
- [Structural Blocks](#structural-blocks)
- [Special Blocks](#special-blocks)
- [Block Properties](#block-properties)
- [Block Selection Guide](#block-selection-guide)

## Block Model Structure

Every block in the BlockEditor follows the `BlockModel` structure:

```typescript
{
  id: string,                      // Required: Unique identifier
  blockType: BlockType | string,   // Required: Type of block
  content: ContentModel[],         // Array of content items
  properties?: object,             // Block-specific properties
  indent?: number,                 // Indentation level (default: 0)
  parentId?: string,               // Parent block ID for nested blocks
  cssClass?: string,               // Custom CSS classes
  template?: string | function | HTMLElement  // For Template blocks
}
```

### Example Block Definition

```vue
<script setup>
const block = {
  id: 'para-1',
  blockType: 'Paragraph',
  content: [
    {
      contentType: 'Text',
      content: 'This is a paragraph block'
    }
  ],
  indent: 0,
  cssClass: 'custom-paragraph'
};
</script>
```

## Block Type Overview

The BlockEditor supports 14 built-in block types:

| Block Type | Purpose | Nesting | Properties |
|------------|---------|---------|------------|
| **Paragraph** | Standard text | No | placeholder |
| **Heading** | Document structure (1-4) | No | level, placeholder |
| **BulletList** | Unordered lists | No | placeholder |
| **NumberedList** | Ordered lists | No | placeholder |
| **Checklist** | To-do lists | No | isChecked, placeholder |
| **Code** | Syntax-highlighted code | No | language, languages |
| **Image** | Visual content | No | src, width, height, altText |
| **Table** | Tabular data | No | columns, rows, cells |
| **Quote** | Quotations | Yes | children |
| **Callout** | Important info | Yes | children |
| **Divider** | Section separator | No | None |
| **CollapsibleHeading** | Expandable sections | Yes | level, isExpanded, children |
| **CollapsibleParagraph** | Expandable paragraphs | Yes | isExpanded, children |
| **Template** | Custom HTML | No | template |

## Typography Blocks

### Paragraph Block

**Purpose:** Standard text content, most common block type.

**BlockType:** `'Paragraph'`

**Properties:**
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```vue
<script setup>
const paragraphBlock = {
  id: 'para-1',
  blockType: 'Paragraph',
  properties: {
    placeholder: 'Start typing...'
  },
  content: [
    {
      contentType: 'Text',
      content: 'This is a paragraph with custom placeholder.'
    }
  ]
};
</script>
```

### Heading Block

**Purpose:** Document titles and section headers (4 levels).

**BlockType:** `'Heading'`

**Properties:**
- `level` (number, required): Heading level from 1 to 4
- `placeholder` (string, optional): Placeholder text

**Example:**
```vue
<script setup>
import { ContentType } from '@syncfusion/ej2-vue-blockeditor';

const headingBlocks = [
  {
    id: 'h1',
    blockType: 'Heading',
    properties: { level: 1 },
    content: [{ contentType: ContentType.Text, content: 'Main Title' }]
  },
  {
    id: 'h2',
    blockType: 'Heading',
    properties: { level: 2 },
    content: [{ contentType: ContentType.Text, content: 'Section Heading' }]
  },
  {
    id: 'h3',
    blockType: 'Heading',
    properties: { level: 3 },
    content: [{ contentType: ContentType.Text, content: 'Sub-section' }]
  },
  {
    id: 'h4',
    blockType: 'Heading',
    properties: { level: 4 },
    content: [{ contentType: ContentType.Text, content: 'Sub-sub-section' }]
  }
];
</script>
```

### Divider Block

**Purpose:** Horizontal line to separate content sections.

**BlockType:** `'Divider'`

**Properties:** None

**Example:**
```vue
<script setup>
const blocks = [
  {
    id: 'para-1',
    blockType: 'Paragraph',
    content: [{ contentType: 'Text', content: 'Content before divider' }]
  },
  {
    id: 'divider-1',
    blockType: 'Divider'
  },
  {
    id: 'para-2',
    blockType: 'Paragraph',
    content: [{ contentType: 'Text', content: 'Content after divider' }]
  }
];
</script>
```

## List Blocks

### BulletList Block

**Purpose:** Unordered lists with bullet points.

**BlockType:** `'BulletList'`

**Properties:**
- `placeholder` (string, optional): Default is "Add item"

**Example:**
```vue
<script setup>
const bulletLists = [
  {
    id: 'bullet-1',
    blockType: 'BulletList',
    content: [{ contentType: 'Text', content: 'First bullet item' }]
  },
  {
    id: 'bullet-2',
    blockType: 'BulletList',
    content: [{ contentType: 'Text', content: 'Second bullet item' }],
    indent: 1  // Nested bullet
  },
  {
    id: 'bullet-3',
    blockType: 'BulletList',
    content: [{ contentType: 'Text', content: 'Third bullet item' }]
  }
];
</script>
```

### NumberedList Block

**Purpose:** Ordered lists with sequential numbering.

**BlockType:** `'NumberedList'`

**Properties:**
- `placeholder` (string, optional): Default is "Add item"

**Example:**
```vue
<script setup>
const numberedLists = [
  {
    id: 'num-1',
    blockType: 'NumberedList',
    content: [{ contentType: 'Text', content: 'Step 1: Initialize' }]
  },
  {
    id: 'num-2',
    blockType: 'NumberedList',
    content: [{ contentType: 'Text', content: 'Step 2: Configure' }]
  },
  {
    id: 'num-3',
    blockType: 'NumberedList',
    content: [{ contentType: 'Text', content: 'Step 3: Execute' }]
  }
];
</script>
```

### Checklist Block

**Purpose:** Interactive to-do lists with checkable items.

**BlockType:** `'Checklist'`

**Properties:**
- `isChecked` (boolean, optional): Check state, default is `false`
- `placeholder` (string, optional): Default is "Todo"

**Example:**
```vue
<script setup>
const checklistBlocks = [
  {
    id: 'task-1',
    blockType: 'Checklist',
    properties: { isChecked: true },
    content: [{ contentType: 'Text', content: 'Completed task' }]
  },
  {
    id: 'task-2',
    blockType: 'Checklist',
    properties: { isChecked: false },
    content: [{ contentType: 'Text', content: 'Pending task' }]
  },
  {
    id: 'task-3',
    blockType: 'Checklist',
    properties: { isChecked: false },
    content: [{ contentType: 'Text', content: 'Another pending task' }]
  }
];
</script>
```

## Content Blocks

### Code Block

**Purpose:** Display code with syntax highlighting.

**BlockType:** `'Code'`

**Properties:**
- `language` (string, optional): Programming language for syntax highlighting
- `languages` (array, optional): Available language options
- `defaultLanguage` (string, optional): Default language selection

**Example:**
```vue
<script setup>
const codeBlock = {
  id: 'code-1',
  blockType: 'Code',
  properties: {
    language: 'javascript'
  },
  content: [
    {
      contentType: 'Text',
      content: 'function greet(name) {\n  return `Hello, ${name}!`;\n}'
    }
  ]
};
</script>
```

**Global Configuration:**
```vue
<template>
  <ejs-blockeditor :codeBlockSettings="codeSettings" />
</template>

<script setup>
const codeSettings = {
  defaultLanguage: 'javascript',
  languages: [
    { language: 'javascript', label: 'JavaScript' },
    { language: 'typescript', label: 'TypeScript' },
    { language: 'python', label: 'Python' },
    { language: 'html', label: 'HTML' },
    { language: 'css', label: 'CSS' }
  ]
};
</script>
```

### Image Block

**Purpose:** Display and upload images.

**BlockType:** `'Image'`

**Properties:**
- `src` (string, required): Image URL or blob
- `width` (string | number, optional): Display width
- `height` (string | number, optional): Display height
- `altText` (string, optional): Alternative text

**Example:**
```vue
<script setup>
const imageBlock = {
  id: 'img-1',
  blockType: 'Image',
  properties: {
    src: 'https://example.com/image.jpg',
    width: '600px',
    height: '400px',
    altText: 'Sample image description'
  }
};
</script>
```

### Table Block

**Purpose:** Display structured tabular data.

**BlockType:** `'Table'`

**Properties:**
- `columns` (array, required): Column definitions
- `rows` (array, required): Row data with cells
- `width` (string, optional): Table width (default: '100%')
- `enableHeader` (boolean, optional): Show header row (default: true)
- `enableRowNumbers` (boolean, optional): Show row numbers (default: true)
- `readOnly` (boolean, optional): Disable editing (default: false)

**Example:**
```vue
<script setup>
import { BlockType, ContentType } from '@syncfusion/ej2-vue-blockeditor';

const tableBlock = {
  id: 'table-1',
  blockType: BlockType.Table,
  properties: {
    width: '100%',
    enableHeader: true,
    enableRowNumbers: true,
    columns: [
      { id: 'col1', headerText: 'Name' },
      { id: 'col2', headerText: 'Age' },
      { id: 'col3', headerText: 'City' }
    ],
    rows: [
      {
        cells: [
          {
            columnId: 'col1',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [{ contentType: ContentType.Text, content: 'John' }]
              }
            ]
          },
          {
            columnId: 'col2',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [{ contentType: ContentType.Text, content: '30' }]
              }
            ]
          },
          {
            columnId: 'col3',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [{ contentType: ContentType.Text, content: 'New York' }]
              }
            ]
          }
        ]
      },
      {
        cells: [
          {
            columnId: 'col1',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [{ contentType: ContentType.Text, content: 'Jane' }]
              }
            ]
          },
          {
            columnId: 'col2',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [{ contentType: ContentType.Text, content: '25' }]
              }
            ]
          },
          {
            columnId: 'col3',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [{ contentType: ContentType.Text, content: 'London' }]
              }
            ]
          }
        ]
      }
    ]
  }
};
</script>
```

## Structural Blocks

### Quote Block

**Purpose:** Display quotations or excerpts with nested content.

**BlockType:** `'Quote'`

**Properties:**
- `children` (BlockModel[], required): Nested blocks inside quote

**Example:**
```vue
<script setup>
const quoteBlock = {
  id: 'quote-1',
  blockType: 'Quote',
  properties: {
    children: [
      {
        id: 'quote-heading',
        parentId: 'quote-1',
        blockType: 'Heading',
        properties: { level: 3 },
        content: [{ contentType: 'Text', content: 'Important Note' }]
      },
      {
        id: 'quote-para',
        parentId: 'quote-1',
        blockType: 'Paragraph',
        content: [
          {
            contentType: 'Text',
            content: 'This is a quoted block with nested content.'
          }
        ]
      }
    ]
  }
};
</script>
```

### Callout Block

**Purpose:** Highlight important information with nested content.

**BlockType:** `'Callout'`

**Properties:**
- `children` (BlockModel[], required): Nested blocks inside callout

**Example:**
```vue
<script setup>
const calloutBlock = {
  id: 'callout-1',
  blockType: 'Callout',
  properties: {
    children: [
      {
        id: 'callout-para',
        parentId: 'callout-1',
        blockType: 'Paragraph',
        content: [
          {
            contentType: 'Text',
            content: '⚠️ Warning: Always validate user input before processing.'
          }
        ]
      }
    ]
  }
};
</script>
```

### CollapsibleHeading Block

**Purpose:** Create expandable sections with headings.

**BlockType:** `'CollapsibleHeading'`

**Properties:**
- `level` (number, required): Heading level from 1 to 4
- `isExpanded` (boolean, optional): Expanded state (default: false)
- `children` (BlockModel[], required): Nested blocks
- `placeholder` (string, optional): Placeholder text

**Example:**
```vue
<script setup>
const collapsibleHeading = {
  id: 'collapse-h1',
  blockType: 'CollapsibleHeading',
  content: [{ contentType: 'Text', content: 'Expandable Section' }],
  properties: {
    level: 2,
    isExpanded: true,
    children: [
      {
        id: 'nested-para',
        parentId: 'collapse-h1',
        blockType: 'Paragraph',
        content: [
          {
            contentType: 'Text',
            content: 'This content can be collapsed or expanded.'
          }
        ]
      }
    ]
  }
};
</script>
```

### CollapsibleParagraph Block

**Purpose:** Create expandable paragraphs.

**BlockType:** `'CollapsibleParagraph'`

**Properties:**
- `isExpanded` (boolean, optional): Expanded state (default: false)
- `children` (BlockModel[], required): Nested blocks
- `placeholder` (string, optional): Placeholder text

**Example:**
```vue
<script setup>
const collapsiblePara = {
  id: 'collapse-p1',
  blockType: 'CollapsibleParagraph',
  content: [{ contentType: 'Text', content: 'Click to expand details' }],
  properties: {
    isExpanded: false,
    children: [
      {
        id: 'nested-content',
        parentId: 'collapse-p1',
        blockType: 'Paragraph',
        content: [
          {
            contentType: 'Text',
            content: 'Hidden details appear when expanded.'
          }
        ]
      }
    ]
  }
};
</script>
```

### Template Block

**Purpose:** Render custom HTML content or components.

**BlockType:** `'Template'`

**Properties:**
- `template` (string | function | HTMLElement, required): Custom template

**Example:**
```vue
<script setup>
const templateBlock = {
  id: 'template-1',
  blockType: 'Template',
  template: `
    <div class="custom-card" style="border: 2px solid #4CAF50; padding: 20px; border-radius: 8px;">
      <h3 style="margin: 0 0 10px 0; color: #4CAF50;">Custom Template</h3>
      <p style="margin: 0;">This is a custom HTML template block with inline styling.</p>
    </div>
  `
};
</script>
```

## Block Properties

### Common Properties

All blocks support these common properties:

#### 1. Indent

**Purpose:** Set indentation level for hierarchical content.

**Type:** `number`

**Default:** `0`

**Example:**
```vue
<script setup>
const indentedBlocks = [
  {
    id: 'para-1',
    blockType: 'Paragraph',
    indent: 0,
    content: [{ contentType: 'Text', content: 'Level 0' }]
  },
  {
    id: 'para-2',
    blockType: 'Paragraph',
    indent: 1,
    content: [{ contentType: 'Text', content: 'Level 1 (indented)' }]
  },
  {
    id: 'para-3',
    blockType: 'Paragraph',
    indent: 2,
    content: [{ contentType: 'Text', content: 'Level 2 (double indented)' }]
  }
];
</script>
```

#### 2. CSS Class

**Purpose:** Apply custom styling to specific blocks.

**Type:** `string`

**Example:**
```vue
<template>
  <ejs-blockeditor :blocks="blocks" />
</template>

<script setup>
const blocks = [
  {
    id: 'styled-para',
    blockType: 'Paragraph',
    cssClass: 'highlight-block important',
    content: [{ contentType: 'Text', content: 'Styled paragraph' }]
  }
];
</script>

<style>
.highlight-block {
  background-color: #fffbea;
  border-left: 4px solid #fbbf24;
  padding-left: 12px;
}

.important {
  font-weight: 600;
}
</style>
```

#### 3. Parent ID

**Purpose:** Establish parent-child relationships for nested blocks.

**Type:** `string`

**Usage:** Set `parentId` in child blocks to match parent block's `id`.

**Example:**
```vue
<script setup>
const nestedBlocks = [
  {
    id: 'parent-quote',
    blockType: 'Quote',
    properties: {
      children: [
        {
          id: 'child-para',
          parentId: 'parent-quote',  // Links to parent
          blockType: 'Paragraph',
          content: [{ contentType: 'Text', content: 'Nested paragraph' }]
        }
      ]
    }
  }
];
</script>
```

## Block Selection Guide

### When to Use Each Block Type

| Scenario | Recommended Block Type |
|----------|----------------------|
| Standard text content | **Paragraph** |
| Document titles and sections | **Heading** (1-4) |
| Unordered lists | **BulletList** |
| Step-by-step instructions | **NumberedList** |
| Task management | **Checklist** |
| Code snippets | **Code** |
| Images and photos | **Image** |
| Data tables | **Table** |
| Quotations | **Quote** |
| Warnings, tips, notes | **Callout** |
| Section separators | **Divider** |
| FAQ sections | **CollapsibleHeading/Paragraph** |
| Custom widgets | **Template** |

### Decision Tree

```
Need text content?
├─ Yes → Is it structured?
│  ├─ Yes → Need hierarchy?
│  │  ├─ Yes → Use Heading (level 1-4)
│  │  └─ No → Use Paragraph
│  └─ No → Need items?
│     ├─ Ordered → Use NumberedList
│     ├─ Unordered → Use BulletList
│     └─ Checkable → Use Checklist
│
└─ No → Need media?
   ├─ Images → Use Image
   ├─ Code → Use Code
   ├─ Tables → Use Table
   └─ Custom HTML → Use Template
```

---

**Next:** Explore inline content types and formatting in `inline-content.md`.
