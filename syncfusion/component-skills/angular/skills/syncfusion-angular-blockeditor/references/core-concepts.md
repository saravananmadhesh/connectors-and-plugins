# Core Concepts: Blocks and Content Model

## Table of Contents
- [What is a Block?](#what-is-a-block)
- [Block Types Overview](#block-types-overview)
- [Block Model Structure](#block-model-structure)
- [Content Model Structure](#content-model-structure)
- [Content Types](#content-types)
- [Block Properties](#block-properties)

## What is a Block?

Blocks are the fundamental building units of the Block Editor. Each block represents a distinct piece of content that can be independently managed, formatted, and rearranged.

The entire editor content is structured as a collection of blocks, configured through the `blocks` property of the BlockEditor component. This block-based architecture allows users to:

- Rearrange content independently
- Format discrete sections separately
- Add or remove content units easily
- Apply different styles to different sections

## Block Types Overview

The Block Editor supports 13 built-in block types:

| Block Type | Description | Editable | Use Case |
|-----------|-------------|----------|----------|
| **Paragraph** | Regular text content | Yes | Default text blocks |
| **Heading1-4** | Hierarchical headings | Yes | Document structure, titles |
| **BulletList** | Unordered lists | Yes | Feature lists, bullet points |
| **NumberedList** | Ordered lists | Yes | Steps, procedures, rankings |
| **Checklist** | Interactive to-do items | Yes | Tasks, requirements, action items |
| **Table** | Tabular data with rows/columns | Yes | Data presentation, comparisons |
| **Code** | Formatted code with syntax highlighting | Yes | Code snippets, examples |
| **Quote** | Styled quotation blocks | Yes | References, important statements |
| **Callout** | Highlighted information blocks | Yes | Notes, warnings, important info |
| **Divider** | Horizontal separator line | No | Visual separation |
| **Image** | Embedded images | Yes | Visual content, illustrations |
| **CollapsibleParagraph** | Expandable paragraph | Yes | Collapsible text sections |
| **CollapsibleHeading1-4** | Expandable headings | Yes | Expandable sections with titles |

## Block Model Structure

A block is defined using the `BlockModel` interface with the following structure:

```typescript
interface BlockModel {
  id?: string;                    // Unique identifier
  blockType: string;              // Type from the list above
  content?: ContentModel[];       // Array of content items
  properties?: object;            // Block-specific properties
  indent?: number;                // Indentation level (0+)
  cssClass?: string;              // Custom CSS classes
  children?: BlockModel[];        // For nested blocks (Quote, Callout, Collapsible)
  parentId?: string;              // Parent block ID (for nested blocks)
  isExpanded?: boolean;           // For collapsible blocks
  isChecked?: boolean;            // For checklist items
  template?: string | Function;   // For template blocks
}
```

### Example Block Definitions

```typescript
// Paragraph block
{
  blockType: 'Paragraph',
  content: [
    {
      contentType: ContentType.Text,
      content: 'This is a paragraph'
    }
  ]
}

// Heading with indent
{
  blockType: 'Heading',
  properties: { level: 2 },
  indent: 1,
  content: [
    {
      contentType: ContentType.Text,
      content: 'Section Subtitle'
    }
  ]
}

// Collapsible section with children
{
  blockType: 'CollapsibleHeading',
  properties: {
    level: 1,
    isExpanded: true,
    children: [
      {
        blockType: 'Paragraph',
        content: [{ contentType: ContentType.Text, content: 'Content inside' }]
      }
    ]
  }
}
```

## Content Model Structure

Each block contains an array of `ContentModel` items that define the actual content within the block:

```typescript
interface ContentModel {
  id?: string;                    // Unique identifier
  contentType: string;            // Type: Text, Link, Label, Mention
  content?: string;               // Text content
  properties?: object;            // Content-specific properties
}
```

### Content Properties by Type

```typescript
// Text content
{
  contentType: ContentType.Text,
  content: 'Your text here',
  properties: {
    styles: {
      bold: true,
      italic: false,
      color: '#333',
      backgroundColor: '#fff'
    }
  }
}

// Link content
{
  contentType: ContentType.Link,
  content: 'Click here',
  properties: {
    url: 'https://example.com',
    title: 'Example Site'
  }
}

// Label content
{
  contentType: ContentType.Label,
  properties: {
    labelId: 'bug'  // References a label item
  }
}

// Mention content
{
  contentType: ContentType.Mention,
  properties: {
    userId: 'user123'  // References a user
  }
}
```

## Content Types

The Block Editor supports four inline content types:

### 1. Text Content

Plain or formatted text. Supports inline styles like bold, italic, underline, colors, and more.

```typescript
{
  contentType: ContentType.Text,
  content: 'Bold and italic text',
  properties: {
    styles: {
      bold: true,
      italic: true
    }
  }
}
```

### 2. Link Content

Hyperlinks that can be clicked to navigate or open URLs.

```typescript
{
  contentType: ContentType.Link,
  content: 'Visit Documentation',
  properties: {
    url: 'https://ej2.syncfusion.com/documentation'
  }
}
```

### 3. Label Content

Tags or labels for categorizing or marking content. Supports grouping and custom colors.

```typescript
{
  contentType: ContentType.Label,
  properties: {
    labelId: 'high-priority'  // User-defined
  }
}
```

### 4. Mention Content

References to users that can be used for notifications or tagging.

```typescript
{
  contentType: ContentType.Mention,
  properties: {
    userId: 'john-doe'  // From users collection
  }
}
```

## Block Properties

Block-specific properties are configured in the `properties` object:

### Common Properties

| Property | Type | Example | Used In |
|----------|------|---------|---------|
| `level` | number | 1-4 | Heading, CollapsibleHeading |
| `placeholder` | string | "Add item" | List blocks |
| `isExpanded` | boolean | true/false | Collapsible blocks |
| `isChecked` | boolean | true/false | Checklist |
| `language` | string | 'javascript' | Code blocks |
| `children` | BlockModel[] | [...] | Quote, Callout, Collapsible |

### Example Properties Configuration

```typescript
// Heading with level
{
  blockType: 'Heading',
  properties: {
    level: 2,
    placeholder: 'Enter section title'
  }
}

// Code block with language
{
  blockType: 'Code',
  properties: {
    language: 'typescript'
  }
}

// Checklist item (checked)
{
  blockType: 'Checklist',
  properties: {
    isChecked: true,
    placeholder: 'Add a task'
  }
}

// Collapsible section
{
  blockType: 'CollapsibleParagraph',
  properties: {
    isExpanded: false,
    children: [
      {
        blockType: 'Paragraph',
        content: [{ contentType: ContentType.Text, content: 'Hidden content' }]
      }
    ]
  }
}
```

## Block Relationships

### Indentation

The `indent` property controls nesting level for list-like structures:

```typescript
// Nested list items
[
  {
    blockType: 'BulletList',
    indent: 0,
    content: [{ contentType: ContentType.Text, content: 'Item 1' }]
  },
  {
    blockType: 'BulletList',
    indent: 1,
    content: [{ contentType: ContentType.Text, content: 'Subitem 1.1' }]
  },
  {
    blockType: 'BulletList',
    indent: 1,
    content: [{ contentType: ContentType.Text, content: 'Subitem 1.2' }]
  }
]
```

### Parent-Child Relationships

For nested blocks (Quote, Callout, Collapsible), the `children` property in `properties` stores child blocks:

```typescript
{
  id: 'quote-1',
  blockType: 'Quote',
  properties: {
    children: [
      {
        parentId: 'quote-1',
        blockType: 'Paragraph',
        content: [{ contentType: ContentType.Text, content: 'Quote content' }]
      }
    ]
  }
}
```

