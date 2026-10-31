# Data Structures and Lists

## Table of Contents
- [List Block Types](#list-block-types)
- [Bullet Lists](#bullet-lists)
- [Numbered Lists](#numbered-lists)
- [Checklists](#checklists)
- [Tables](#tables)
- [Nested Blocks](#nested-blocks)
- [Examples](#examples)

## List Block Types

The Block Editor supports three primary list types for organizing content:

| List Type | Use Case | Interactive | Default Placeholder |
|-----------|----------|-------------|---------------------|
| BulletList | Unordered items | No | "Add item" |
| NumberedList | Ordered items | No | "Add item" |
| Checklist | Toggleable tasks | Yes | "Todo" |

## Bullet Lists

Unordered lists with bullet points. Perfect for feature lists, requirements, or non-sequential items.

### Basic Configuration

```typescript
{
  blockType: 'BulletList',
  content: [
    {
      contentType: ContentType.Text,
      content: 'First item'
    }
  ]
}
```

### With Custom Placeholder

```typescript
{
  blockType: 'BulletList',
  properties: { placeholder: 'Add feature' },
  content: [
    {
      contentType: ContentType.Text,
      content: 'Item with custom placeholder'
    }
  ]
}
```

### Multiple Items

```typescript
{
  blockType: 'Paragraph',
  content: [
    { contentType: ContentType.Text, content: 'Features:' }
  ]
},
{
  blockType: 'BulletList',
  content: [
    { contentType: ContentType.Text, content: 'Feature 1' }
  ]
},
{
  blockType: 'BulletList',
  content: [
    { contentType: ContentType.Text, content: 'Feature 2' }
  ]
},
{
  blockType: 'BulletList',
  content: [
    { contentType: ContentType.Text, content: 'Feature 3' }
  ]
}
```

### Nested Bullet Lists

Use indentation to create nested lists:

```typescript
[
  {
    blockType: 'BulletList',
    indent: 0,
    content: [
      { contentType: ContentType.Text, content: 'Main topic' }
    ]
  },
  {
    blockType: 'BulletList',
    indent: 1,
    content: [
      { contentType: ContentType.Text, content: 'Subtopic 1' }
    ]
  },
  {
    blockType: 'BulletList',
    indent: 1,
    content: [
      { contentType: ContentType.Text, content: 'Subtopic 2' }
    ]
  },
  {
    blockType: 'BulletList',
    indent: 2,
    content: [
      { contentType: ContentType.Text, content: 'Sub-subtopic' }
    ]
  }
]
```

## Numbered Lists

Ordered lists with sequential numbering. Ideal for steps, procedures, or ranked items.

### Basic Configuration

```typescript
{
  blockType: 'NumberedList',
  content: [
    {
      contentType: ContentType.Text,
      content: 'First step'
    }
  ]
}
```

### Step-by-Step Example

```typescript
[
  {
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { contentType: ContentType.Text, content: 'Installation Steps' }
    ]
  },
  {
    blockType: 'NumberedList',
    content: [
      { contentType: ContentType.Text, content: 'Install Node.js' }
    ]
  },
  {
    blockType: 'NumberedList',
    content: [
      { contentType: ContentType.Text, content: 'Install Angular CLI' }
    ]
  },
  {
    blockType: 'NumberedList',
    content: [
      { contentType: ContentType.Text, content: 'Create new project' }
    ]
  },
  {
    blockType: 'NumberedList',
    content: [
      { contentType: ContentType.Text, content: 'Install dependencies' }
    ]
  }
]
```

### Nested Numbered Lists

```typescript
[
  {
    blockType: 'NumberedList',
    indent: 0,
    content: [
      { contentType: ContentType.Text, content: 'Main step' }
    ]
  },
  {
    blockType: 'NumberedList',
    indent: 1,
    content: [
      { contentType: ContentType.Text, content: 'Sub-step a' }
    ]
  },
  {
    blockType: 'NumberedList',
    indent: 1,
    content: [
      { contentType: ContentType.Text, content: 'Sub-step b' }
    ]
  }
]
```

## Checklists

Interactive to-do lists with toggleable checkboxes.

### Basic Configuration

```typescript
{
  blockType: 'Checklist',
  content: [
    {
      contentType: ContentType.Text,
      content: 'Task 1'
    }
  ]
}
```

### With Checked State

```typescript
{
  blockType: 'Checklist',
  properties: { isChecked: true },
  content: [
    {
      contentType: ContentType.Text,
      content: 'Completed task'
    }
  ]
}
```

### Task List Example

```typescript
[
  {
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { contentType: ContentType.Text, content: 'Project Tasks' }
    ]
  },
  {
    blockType: 'Checklist',
    properties: { isChecked: true },
    content: [
      { contentType: ContentType.Text, content: 'Design mockups' }
    ]
  },
  {
    blockType: 'Checklist',
    properties: { isChecked: true },
    content: [
      { contentType: ContentType.Text, content: 'Create API' }
    ]
  },
  {
    blockType: 'Checklist',
    properties: { isChecked: false },
    content: [
      { contentType: ContentType.Text, content: 'Implement frontend' }
    ]
  },
  {
    blockType: 'Checklist',
    properties: { isChecked: false },
    content: [
      { contentType: ContentType.Text, content: 'Write tests' }
    ]
  }
]
```

## Tables

Tables display data in rows and columns with full configuration options.

### Basic Table

```typescript
{
  blockType: 'Table',
  properties: {
    columns: [
      { id: 'col1', headerText: 'Name' },
      { id: 'col2', headerText: 'Value' }
    ],
    rows: [
      {
        cells: [
          {
            columnId: 'col1',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [
                  { contentType: ContentType.Text, content: 'Item 1' }
                ]
              }
            ]
          },
          {
            columnId: 'col2',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [
                  { contentType: ContentType.Text, content: 'Value 1' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### Table Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `width` | string | Display width | "100%" |
| `enableHeader` | boolean | Show header row | true |
| `enableRowNumbers` | boolean | Show row indices | true |
| `readOnly` | boolean | Prevent edits | false |
| `columns` | array | Column definitions | [] |
| `rows` | array | Row data | [] |

### Multi-Column Table

```typescript
{
  blockType: 'Table',
  properties: {
    columns: [
      { id: 'col1', headerText: 'Feature' },
      { id: 'col2', headerText: 'Status' },
      { id: 'col3', headerText: 'Progress' }
    ],
    rows: [
      {
        cells: [
          {
            columnId: 'col1',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [
                  { contentType: ContentType.Text, content: 'Authentication' }
                ]
              }
            ]
          },
          {
            columnId: 'col2',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [
                  { contentType: ContentType.Text, content: 'In Progress' }
                ]
              }
            ]
          },
          {
            columnId: 'col3',
            blocks: [
              {
                blockType: 'Paragraph',
                content: [
                  { contentType: ContentType.Text, content: '75%' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

## Nested Blocks

Certain blocks can contain nested child blocks: Quote, Callout, and Collapsible blocks.

### Quote Block with Children

```typescript
{
  id: 'quote-1',
  blockType: 'Quote',
  properties: {
    children: [
      {
        parentId: 'quote-1',
        blockType: 'Heading',
        properties: { level: 3 },
        content: [
          { contentType: ContentType.Text, content: 'Famous Quote' }
        ]
      },
      {
        parentId: 'quote-1',
        blockType: 'Paragraph',
        content: [
          { contentType: ContentType.Text, content: 'Quote text here...' }
        ]
      }
    ]
  }
}
```

### Callout Block with Children

```typescript
{
  id: 'callout-1',
  blockType: 'Callout',
  properties: {
    children: [
      {
        parentId: 'callout-1',
        blockType: 'Heading',
        properties: { level: 3 },
        content: [
          { contentType: ContentType.Text, content: 'Important Notice' }
        ]
      },
      {
        parentId: 'callout-1',
        blockType: 'BulletList',
        content: [
          { contentType: ContentType.Text, content: 'Point 1' }
        ]
      },
      {
        parentId: 'callout-1',
        blockType: 'BulletList',
        content: [
          { contentType: ContentType.Text, content: 'Point 2' }
        ]
      }
    ]
  }
}
```

### Collapsible Paragraph

```typescript
{
  id: 'collapsible-1',
  blockType: 'CollapsibleParagraph',
  properties: {
    isExpanded: false,
    children: [
      {
        parentId: 'collapsible-1',
        blockType: 'Paragraph',
        content: [
          {
            contentType: ContentType.Text,
            content: 'Hidden content shown on expand'
          }
        ]
      }
    ]
  }
}
```

### Collapsible Heading

```typescript
{
  id: 'collapsible-heading-1',
  blockType: 'CollapsibleHeading',
  properties: {
    level: 2,
    isExpanded: true,
    children: [
      {
        parentId: 'collapsible-heading-1',
        blockType: 'Paragraph',
        content: [
          { contentType: ContentType.Text, content: 'Section content' }
        ]
      }
    ]
  }
}
```

## Examples

### Example 1: Feature Comparison Table

```typescript
{
  blockType: 'Table',
  properties: {
    columns: [
      { id: 'feature', headerText: 'Feature' },
      { id: 'basic', headerText: 'Basic' },
      { id: 'pro', headerText: 'Pro' }
    ],
    rows: [
      { cells: [
        { columnId: 'feature', blocks: [...] },
        { columnId: 'basic', blocks: [...] },
        { columnId: 'pro', blocks: [...] }
      ]},
      // More rows...
    ]
  }
}
```

### Example 2: Documentation Structure

```typescript
[
  { blockType: 'Heading', properties: { level: 1 }, content: [...] },
  {
    blockType: 'CollapsibleHeading',
    properties: {
      level: 2,
      isExpanded: true,
      children: [
        { blockType: 'Paragraph', content: [...] },
        { blockType: 'NumberedList', content: [...] }
      ]
    }
  },
  {
    blockType: 'CollapsibleHeading',
    properties: {
      level: 2,
      isExpanded: false,
      children: [
        { blockType: 'Code', content: [...] }
      ]
    }
  }
]
```

### Example 3: Requirement Checklist

```typescript
[
  { blockType: 'Heading', properties: { level: 2 }, content: [...] },
  { blockType: 'Checklist', properties: { isChecked: true }, content: [...] },
  { blockType: 'Checklist', properties: { isChecked: false }, content: [...] },
  // More checklist items...
]
```

