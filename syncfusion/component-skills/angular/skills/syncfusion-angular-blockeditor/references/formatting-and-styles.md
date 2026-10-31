# Formatting and Inline Styles

## Table of Contents
- [Inline Content Types](#inline-content-types)
- [Text Formatting](#text-formatting)
- [Typography Blocks](#typography-blocks)
- [Inline Code and Links](#inline-code-and-links)
- [Colors and Styling](#colors-and-styling)
- [Practical Examples](#practical-examples)

## Inline Content Types

The Block Editor supports four primary inline content types that can be mixed within any block:

### 1. Text Content

Plain or formatted text with support for inline styles.

```typescript
{
  contentType: ContentType.Text,
  content: 'Your text here',
  properties: {
    styles: {
      bold: true,
      italic: false,
      color: '#333'
    }
  }
}
```

### 2. Link Content

Clickable hyperlinks with URL and optional title.

```typescript
{
  contentType: ContentType.Link,
  content: 'Click here',
  properties: {
    url: 'https://example.com',
    title: 'Link Title'
  }
}
```

### 3. Label Content

Tags for categorization and marking content.

```typescript
{
  contentType: ContentType.Label,
  properties: {
    labelId: 'high-priority'
  }
}
```

### 4. Mention Content

User references for tagging and notifications.

```typescript
{
  contentType: ContentType.Mention,
  properties: {
    userId: 'john-doe'
  }
}
```

## Text Formatting

Inline styles can be applied to text content for rich formatting.

### Supported Styles

| Style Property | Type | Description | Default |
|---|---|---|---|
| `bold` | boolean | Make text bold | false |
| `italic` | boolean | Italicize text | false |
| `underline` | boolean | Underline text | false |
| `strikethrough` | boolean | Strike through text | false |
| `color` | string | Text color (HEX or RGBA) | '' |
| `backgroundColor` | string | Background color | '' |
| `superscript` | boolean | Render as superscript | false |
| `subscript` | boolean | Render as subscript | false |
| `uppercase` | boolean | Convert to uppercase | false |
| `lowercase` | boolean | Convert to lowercase | false |
| `inlineCode` | boolean | Render as inline code | false |

### Examples

```typescript
// Bold text
{
  contentType: ContentType.Text,
  content: 'Bold text',
  properties: { styles: { bold: true } }
}

// Italic and underline
{
  contentType: ContentType.Text,
  content: 'Formatted text',
  properties: { 
    styles: { 
      italic: true,
      underline: true 
    } 
  }
}

// Colored text with background
{
  contentType: ContentType.Text,
  content: 'Highlighted',
  properties: { 
    styles: { 
      color: '#ffffff',
      backgroundColor: '#ff0000'
    } 
  }
}

// Superscript
{
  contentType: ContentType.Text,
  content: 'x',
  properties: { styles: { superscript: true } }
}

// Inline code
{
  contentType: ContentType.Text,
  content: 'const x = 10;',
  properties: { styles: { inlineCode: true } }
}

// Multiple styles combined
{
  contentType: ContentType.Text,
  content: 'Important',
  properties: { 
    styles: { 
      bold: true,
      italic: true,
      color: '#d32f2f',
      backgroundColor: '#fff9c4'
    } 
  }
}
```

## Typography Blocks

Typography blocks provide structural organization for text content.

### Paragraph Block

The default block type for regular text.

```typescript
{
  blockType: 'Paragraph',
  properties: { 
    placeholder: 'Write something or "/" for commands' 
  },
  content: [
    { 
      contentType: ContentType.Text, 
      content: 'This is a paragraph' 
    }
  ]
}
```

### Heading Blocks

Hierarchical headings from level 1 to 4.

```typescript
// Heading Level 1 (Title)
{
  blockType: 'Heading',
  properties: { 
    level: 1,
    placeholder: 'Heading 1'
  },
  content: [
    { contentType: ContentType.Text, content: 'Main Title' }
  ]
}

// Heading Level 2 (Section)
{
  blockType: 'Heading',
  properties: { 
    level: 2,
    placeholder: 'Heading 2'
  },
  content: [
    { contentType: ContentType.Text, content: 'Section Title' }
  ]
}

// Heading Level 3
{
  blockType: 'Heading',
  properties: { 
    level: 3,
    placeholder: 'Heading 3'
  },
  content: [...]
}

// Heading Level 4
{
  blockType: 'Heading',
  properties: { 
    level: 4,
    placeholder: 'Heading 4'
  },
  content: [...]
}
```

### Divider Block

Horizontal separator line for visual separation.

```typescript
{
  blockType: 'Divider'
  // No content needed
}
```

### Quote Block

Styled block for quotations with nested content.

```typescript
{
  blockType: 'Quote',
  properties: {
    children: [
      {
        parentId: 'quote-1',
        blockType: 'Paragraph',
        content: [
          { 
            contentType: ContentType.Text, 
            content: 'This is a quotation' 
          }
        ]
      }
    ]
  }
}
```

### Callout Block

Highlighted block for important information, notes, or warnings.

```typescript
{
  blockType: 'Callout',
  properties: {
    children: [
      {
        parentId: 'callout-1',
        blockType: 'Paragraph',
        content: [
          { 
            contentType: ContentType.Text, 
            content: 'Important information' 
          }
        ]
      }
    ]
  }
}
```

## Inline Code and Links

### Inline Code

Display code inline with monospace formatting.

```typescript
{
  contentType: ContentType.Text,
  content: 'const value = 42;',
  properties: {
    styles: { inlineCode: true }
  }
}
```

### Inline Links

Create clickable hyperlinks within text.

```typescript
{
  contentType: ContentType.Link,
  content: 'Visit Documentation',
  properties: {
    url: 'https://ej2.syncfusion.com/documentation'
  }
}
```

### Link in Paragraph

Mixing text and links in a single paragraph:

```typescript
{
  blockType: 'Paragraph',
  content: [
    { 
      contentType: ContentType.Text, 
      content: 'For more info, see the ' 
    },
    {
      contentType: ContentType.Link,
      content: 'documentation',
      properties: { url: 'https://docs.example.com' }
    },
    { 
      contentType: ContentType.Text, 
      content: '.' 
    }
  ]
}
```

## Colors and Styling

### Text Color

Set the color of text using HEX or RGBA format.

```typescript
// HEX color
{
  contentType: ContentType.Text,
  content: 'Red text',
  properties: { 
    styles: { color: '#ff0000' } 
  }
}

// RGBA color
{
  contentType: ContentType.Text,
  content: 'Semi-transparent blue',
  properties: { 
    styles: { color: 'rgba(0, 0, 255, 0.7)' } 
  }
}
```

### Background Color

Highlight text with background color.

```typescript
{
  contentType: ContentType.Text,
  content: 'Highlighted text',
  properties: { 
    styles: { backgroundColor: '#ffff00' } 
  }
}
```

### Custom CSS Classes

Apply custom styling to blocks using CSS classes.

```typescript
{
  blockType: 'Paragraph',
  cssClass: 'important-note',
  content: [
    { 
      contentType: ContentType.Text, 
      content: 'Important note' 
    }
  ]
}
```

With CSS:
```css
.important-note {
  border-left: 4px solid #d32f2f;
  padding-left: 12px;
  background-color: #ffebee;
  font-weight: 500;
}
```

## Practical Examples

### Example 1: Technical Documentation

```typescript
const docBlock = {
  blockType: 'Paragraph',
  content: [
    { 
      contentType: ContentType.Text, 
      content: 'To initialize, use: ' 
    },
    {
      contentType: ContentType.Text,
      content: 'new BlockEditor(options)',
      properties: { styles: { inlineCode: true } }
    },
    { 
      contentType: ContentType.Text, 
      content: '. For details, see the ' 
    },
    {
      contentType: ContentType.Link,
      content: 'API documentation',
      properties: { url: 'https://api.example.com' }
    }
  ]
};
```

### Example 2: Emphasis and Hierarchy

```typescript
const emphasizedBlocks = [
  {
    blockType: 'Heading',
    properties: { level: 1 },
    content: [
      { 
        contentType: ContentType.Text, 
        content: 'Important Update' 
      }
    ]
  },
  {
    blockType: 'Callout',
    properties: {
      children: [
        {
          parentId: 'callout-1',
          blockType: 'Paragraph',
          content: [
            { 
              contentType: ContentType.Text, 
              content: 'Critical change required',
              properties: { 
                styles: { 
                  bold: true,
                  color: '#d32f2f'
                } 
              }
            }
          ]
        }
      ]
    }
  }
];
```

### Example 3: Mixed Formatting

```typescript
{
  blockType: 'Paragraph',
  content: [
    { 
      contentType: ContentType.Text, 
      content: 'This is ',
      properties: { styles: { bold: true } }
    },
    { 
      contentType: ContentType.Text, 
      content: 'a mix of ',
      properties: { styles: { italic: true } }
    },
    { 
      contentType: ContentType.Text, 
      content: 'different ',
      properties: { 
        styles: { 
          bold: true,
          italic: true,
          color: '#1976d2'
        } 
      }
    },
    { 
      contentType: ContentType.Text, 
      content: 'styles' 
    }
  ]
}
```

### Example 4: Code Documentation

```typescript
[
  {
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { 
        contentType: ContentType.Text, 
        content: 'Usage Example' 
      }
    ]
  },
  {
    blockType: 'Paragraph',
    content: [
      { 
        contentType: ContentType.Text, 
        content: 'Initialize with ' 
      },
      {
        contentType: ContentType.Text,
        content: 'new Editor()',
        properties: { styles: { inlineCode: true } }
      }
    ]
  },
  {
    blockType: 'Code',
    properties: { language: 'typescript' },
    content: [
      { 
        contentType: ContentType.Text, 
        content: 'const editor = new BlockEditor({\n  element: "#container"\n});' 
      }
    ]
  }
]
```

