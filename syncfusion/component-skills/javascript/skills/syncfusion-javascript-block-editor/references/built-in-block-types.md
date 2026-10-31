# Built-in Block Types

The BlockEditor provides 15+ built-in block types for creating rich, structured content. This document covers all available block types with examples and use cases.

## Table of Contents

- [Typography Blocks](#typography-blocks)
- [Text Formatting](#text-formatting)
- [List Blocks](#list-blocks)
- [Table Blocks](#table-blocks)
- [Media Blocks](#media-blocks)
- [Code Blocks](#code-blocks)
- [Advanced Blocks](#advanced-blocks)
- [Utility Blocks](#utility-blocks)

## Typography Blocks

### Paragraph Block

Standard text block for body content.

**BlockType:** `BlockType.Paragraph`

**Properties:**
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
{
    id: 'para-1',
    blockType: BlockType.Paragraph,
    properties: { placeholder: 'Start typing...' },
    content: [
        {
            contentType: ContentType.Text,
            content: 'This is a paragraph with regular text.'
        }
    ]
}
```

### Heading Blocks

Heading blocks with levels 1-4 for document structure.

**BlockType:** `BlockType.Heading`

**Properties:**
- `level` (number, required): Heading level (1, 2, 3, or 4)
- `placeholder` (string, optional): Placeholder text when empty

**Examples:**
```typescript
// Heading Level 1 (Title)
{
    id: 'h1',
    blockType: BlockType.Heading,
    properties: { level: 1 },
    content: [{
        contentType: ContentType.Text,
        content: 'Document Title'
    }]
}

// Heading Level 2 (Section)
{
    id: 'h2',
    blockType: BlockType.Heading,
    properties: { level: 2, placeholder: 'Section title...' },
    content: [{
        contentType: ContentType.Text,
        content: 'Introduction'
    }]
}

// Heading Level 3 (Subsection)
{
    id: 'h3',
    blockType: BlockType.Heading,
    properties: { level: 3 },
    content: [{
        contentType: ContentType.Text,
        content: 'Background'
    }]
}

// Heading Level 4 (Minor heading)
{
    id: 'h4',
    blockType: BlockType.Heading,
    properties: { level: 4 },
    content: [{
        contentType: ContentType.Text,
        content: 'Details'
    }]
}
```

### Quote Block

Block quote for citations and excerpts.

**BlockType:** `BlockType.Quote`

**Properties:**
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
{
    id: 'quote-1',
    blockType: BlockType.Quote,
    content: [{
        contentType: ContentType.Text,
        content: 'To be, or not to be, that is the question.'
    }]
}
```

### Callout Block

Highlighted information box for important notes.

**BlockType:** `BlockType.Callout`

**Properties:**
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
{
    id: 'callout-1',
    blockType: BlockType.Callout,
    properties: { placeholder: 'Enter important note...' },
    content: [{
        contentType: ContentType.Text,
        content: '⚠️ Important: Always backup your data before proceeding.'
    }]
}
```

## Text Formatting

Text within blocks can be formatted using the `StyleModel` properties.

### Available Formatting Options

- **Bold**: `bold: true`
- **Italic**: `italic: true`
- **Underline**: `underline: true`
- **Strikethrough**: `strikethrough: true`
- **Subscript**: `subscript: true`
- **Superscript**: `superscript: true`
- **Uppercase**: `uppercase: true`
- **Lowercase**: `lowercase: true`
- **Inline Code**: `inlineCode: true`
- **Font Color**: `color: '#ff0000'`
- **Background Color**: `backgroundColor: '#ffff00'`

### Formatting Examples

```typescript
// Bold text
{
    contentType: ContentType.Text,
    content: 'Bold text',
    properties: {
        styles: { bold: true }
    }
}

// Italic text
{
    contentType: ContentType.Text,
    content: 'Italic text',
    properties: {
        styles: { italic: true }
    }
}

// Bold + Italic + Colored
{
    contentType: ContentType.Text,
    content: 'Important text',
    properties: {
        styles: {
            bold: true,
            italic: true,
            color: '#ff0000'
        }
    }
}

// Underlined link style
{
    contentType: ContentType.Text,
    content: 'Underlined text',
    properties: {
        styles: {
            underline: true,
            color: '#0066cc'
        }
    }
}

// Strikethrough (completed task)
{
    contentType: ContentType.Text,
    content: 'Completed task',
    properties: {
        styles: { strikethrough: true }
    }
}

// Highlighted text
{
    contentType: ContentType.Text,
    content: 'Highlighted',
    properties: {
        styles: {
            backgroundColor: '#ffff00',
            bold: true
        }
    }
}

// Inline code
{
    contentType: ContentType.Text,
    content: 'const x = 10;',
    properties: {
        styles: { inlineCode: true }
    }
}

// Subscript (H₂O)
{
    contentType: ContentType.Text,
    content: '2',
    properties: {
        styles: { subscript: true }
    }
}

// Superscript (E=mc²)
{
    contentType: ContentType.Text,
    content: '2',
    properties: {
        styles: { superscript: true }
    }
}

// Uppercase transformation
{
    contentType: ContentType.Text,
    content: 'uppercase text',
    properties: {
        styles: { uppercase: true }  // Displays as: UPPERCASE TEXT
    }
}

// Lowercase transformation
{
    contentType: ContentType.Text,
    content: 'LOWERCASE TEXT',
    properties: {
        styles: { lowercase: true }  // Displays as: lowercase text
    }
}
```

### Mixed Formatting in a Paragraph

```typescript
{
    blockType: BlockType.Paragraph,
    content: [
        {
            contentType: ContentType.Text,
            content: 'This text has '
        },
        {
            contentType: ContentType.Text,
            content: 'bold',
            properties: { styles: { bold: true } }
        },
        {
            contentType: ContentType.Text,
            content: ', '
        },
        {
            contentType: ContentType.Text,
            content: 'italic',
            properties: { styles: { italic: true } }
        },
        {
            contentType: ContentType.Text,
            content: ', and '
        },
        {
            contentType: ContentType.Text,
            content: 'colored',
            properties: { styles: { color: '#ff0000', bold: true } }
        },
        {
            contentType: ContentType.Text,
            content: ' formatting.'
        }
    ]
}
```

## List Blocks

### Bullet List (Unordered List)

**BlockType:** `BlockType.BulletList`

**Properties:**
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
[
    {
        id: 'bullet-1',
        blockType: BlockType.BulletList,
        content: [{
            contentType: ContentType.Text,
            content: 'First bullet point'
        }]
    },
    {
        id: 'bullet-2',
        blockType: BlockType.BulletList,
        content: [{
            contentType: ContentType.Text,
            content: 'Second bullet point'
        }]
    },
    {
        id: 'bullet-3',
        blockType: BlockType.BulletList,
        indent: 1,  // Nested list item
        content: [{
            contentType: ContentType.Text,
            content: 'Nested bullet point'
        }]
    }
]
```

### Numbered List (Ordered List)

**BlockType:** `BlockType.NumberedList`

**Properties:**
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
[
    {
        id: 'num-1',
        blockType: BlockType.NumberedList,
        content: [{
            contentType: ContentType.Text,
            content: 'First step'
        }]
    },
    {
        id: 'num-2',
        blockType: BlockType.NumberedList,
        content: [{
            contentType: ContentType.Text,
            content: 'Second step'
        }]
    },
    {
        id: 'num-3',
        blockType: BlockType.NumberedList,
        indent: 1,  // Nested numbered item
        content: [{
            contentType: ContentType.Text,
            content: 'Sub-step 2.1'
        }]
    },
    {
        id: 'num-4',
        blockType: BlockType.NumberedList,
        content: [{
            contentType: ContentType.Text,
            content: 'Third step'
        }]
    }
]
```

### Checklist (To-Do List)

Interactive checklist with checkbox state.

**BlockType:** `BlockType.Checklist`

**Properties:**
- `isChecked` (boolean, required): Checkbox checked state
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
[
    {
        id: 'task-1',
        blockType: BlockType.Checklist,
        properties: { isChecked: true },
        content: [{
            contentType: ContentType.Text,
            content: 'Completed task'
        }]
    },
    {
        id: 'task-2',
        blockType: BlockType.Checklist,
        properties: { isChecked: false },
        content: [{
            contentType: ContentType.Text,
            content: 'Pending task'
        }]
    },
    {
        id: 'task-3',
        blockType: BlockType.Checklist,
        properties: { isChecked: false, placeholder: 'Add new task...' },
        content: []
    }
]
```

### Nested Lists

Use the `indent` property for nested list structures:

```typescript
[
    {
        id: 'list-1',
        blockType: BlockType.BulletList,
        indent: 0,
        content: [{ contentType: ContentType.Text, content: 'Parent item' }]
    },
    {
        id: 'list-2',
        blockType: BlockType.BulletList,
        indent: 1,  // Level 1 nesting
        content: [{ contentType: ContentType.Text, content: 'Child item' }]
    },
    {
        id: 'list-3',
        blockType: BlockType.BulletList,
        indent: 2,  // Level 2 nesting
        content: [{ contentType: ContentType.Text, content: 'Grandchild item' }]
    },
    {
        id: 'list-4',
        blockType: BlockType.BulletList,
        indent: 1,  // Back to level 1
        content: [{ contentType: ContentType.Text, content: 'Another child item' }]
    }
]
```

## Table Blocks

**BlockType:** `BlockType.Table`

Tables allow structured data presentation.

**Example:**
```typescript
{
    id: 'table-1',
    blockType: BlockType.Table,
    properties: {
        // Table-specific configuration (if available)
    },
    content: [
        // Table content structure
    ]
}
```

*Note: Refer to the specific table block documentation in docs/built-in-blocks/table-block.md for detailed table configuration and cell management.*

## Media Blocks

### Image Block

Display images with upload support and constraints.

**BlockType:** `BlockType.Image`

**Properties:**
- `src` (string, required): Image URL or blob data
- `altText` (string, optional): Alternative text for accessibility
- `width` (string, optional): Display width
- `height` (string, optional): Display height
- `maxWidth` (string|number, optional): Maximum width constraint
- `maxHeight` (string|number, optional): Maximum height constraint
- `minWidth` (string|number, optional): Minimum width constraint
- `minHeight` (string|number, optional): Minimum height constraint
- `cssClass` (string, optional): Custom CSS classes
- `readOnly` (boolean, optional): Prevent editing
- `saveFormat` ('Blob'|'Base64', optional): Save format for uploads
**Example:**
```typescript
{
    id: 'img-1',
    blockType: BlockType.Image,
    properties: {
        src: 'https://example.com/image.jpg',
        altText: 'Sample image description',
        width: '100%',
        maxWidth: 800,
        cssClass: 'custom-image'
    }
}
```

### Image Upload Configuration

Configure image upload using the editor's `imageBlockSettings` property:

```typescript
const editor = new BlockEditor({
    imageBlockSettings: {
        saveUrl: 'https://your-api.com/upload',
        path: '/images/',
        allowedTypes: ['.jpg', '.jpeg', '.png', '.gif'],
        maxFileSize: 5000000,  // 5MB
        maxWidth: 1200,
        maxHeight: 800,
        minWidth: 100,
        minHeight: 100,
        enableResize: true,
        width: '100%',
        height: 'auto',
        saveFormat: 'Blob'  // or 'Base64'
    },
    fileUploadSuccess: (args) => {
        console.log('Image uploaded:', args.fileUrl);
    },
    fileUploadFailed: (args) => {
        console.error('Upload failed:', args);
    }
});
```

## Code Blocks

Code blocks with syntax highlighting.

**BlockType:** `BlockType.Code`

**Properties:**
- `defaultLanguage` (string, optional): Default language for syntax highlighting
- `languages` (CodeLanguageModel[], optional): Available language options

**Example:**
```typescript
{
    id: 'code-1',
    blockType: BlockType.Code,
    properties: {
        defaultLanguage: 'javascript',
        languages: [
            { language: 'javascript', label: 'JavaScript' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'python', label: 'Python' },
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' }
        ]
    },
    content: [{
        contentType: ContentType.Text,
        content: `function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet('World'));`
    }]
}
```

### Code Block Configuration

Configure code blocks globally using `codeBlockSettings`:

```typescript
const editor = new BlockEditor({
    codeBlockSettings: {
        defaultLanguage: 'typescript',
        languages: [
            { language: 'javascript', label: 'JavaScript' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'python', label: 'Python' },
            { language: 'java', label: 'Java' },
            { language: 'csharp', label: 'C#' },
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' },
            { language: 'sql', label: 'SQL' },
            { language: 'json', label: 'JSON' },
            { language: 'xml', label: 'XML' }
        ]
    }
});
```

## Advanced Blocks

### Collapsible Paragraph

Paragraph that can be collapsed/expanded.

**BlockType:** `BlockType.CollapsibleParagraph`

**Properties:**
- `isExpanded` (boolean, required): Expanded (true) or collapsed (false)
- `children` (BlockModel[], optional): Child blocks shown when expanded
- `placeholder` (string, optional): Placeholder text when empty

**Example:**
```typescript
{
    id: 'collapse-para-1',
    blockType: BlockType.CollapsibleParagraph,
    properties: {
        isExpanded: true,
        placeholder: 'Click to expand/collapse',
        children: [
            {
                id: 'child-para-1',
                blockType: BlockType.Paragraph,
                content: [{
                    contentType: ContentType.Text,
                    content: 'This content is hidden when collapsed.'
                }]
            }
        ]
    },
    content: [{
        contentType: ContentType.Text,
        content: 'Click the arrow to toggle'
    }]
}
```

### Collapsible Heading

Heading with collapsible child content.

**BlockType:** `BlockType.CollapsibleHeading`

**Properties:**
- `level` (number, required): Heading level (1-4)
- `isExpanded` (boolean, required): Expanded or collapsed
- `children` (BlockModel[], optional): Child blocks
- `placeholder` (string, optional): Placeholder text

**Example:**
```typescript
{
    id: 'collapse-h-1',
    blockType: BlockType.CollapsibleHeading,
    properties: {
        level: 2,
        isExpanded: false,
        children: [
            {
                id: 'child-1',
                blockType: BlockType.Paragraph,
                content: [{
                    contentType: ContentType.Text,
                    content: 'Nested paragraph content.'
                }]
            },
            {
                id: 'child-2',
                blockType: BlockType.BulletList,
                content: [{
                    contentType: ContentType.Text,
                    content: 'Nested list item'
                }]
            }
        ]
    },
    content: [{
        contentType: ContentType.Text,
        content: 'Section Title (Click to Expand)'
    }]
}
```

### Template Block

Custom template block for specialized content.

**BlockType:** `BlockType.Template`

**Properties:**
- Custom properties defined by your template

**Example:**
```typescript
{
    id: 'template-1',
    blockType: BlockType.Template,
    template: '<div class="custom-template">{{content}}</div>',
    properties: {
        // Custom template properties
    },
    content: [{
        contentType: ContentType.Text,
        content: 'Custom template content'
    }]
}
```

## Utility Blocks

### Divider Block

Horizontal divider line for separating content sections.

**BlockType:** `BlockType.Divider`

**Properties:** None (divider has no content or specific properties)

**Example:**
```typescript
{
    id: 'divider-1',
    blockType: BlockType.Divider
}
```

**Usage in Document:**
```typescript
const blocks = [
    {
        blockType: BlockType.Heading,
        properties: { level: 2 },
        content: [{ contentType: ContentType.Text, content: 'Section 1' }]
    },
    {
        blockType: BlockType.Paragraph,
        content: [{ contentType: ContentType.Text, content: 'Section 1 content.' }]
    },
    {
        blockType: BlockType.Divider  // Separator
    },
    {
        blockType: BlockType.Heading,
        properties: { level: 2 },
        content: [{ contentType: ContentType.Text, content: 'Section 2' }]
    },
    {
        blockType: BlockType.Paragraph,
        content: [{ contentType: ContentType.Text, content: 'Section 2 content.' }]
    }
];
```

## Complete Document Example

```typescript
const completeDocument: BlockModel[] = [
    // Title
    {
        id: 'title',
        blockType: BlockType.Heading,
        properties: { level: 1 },
        content: [{ contentType: ContentType.Text, content: 'Project Documentation' }]
    },
    
    // Introduction
    {
        id: 'intro',
        blockType: BlockType.Paragraph,
        content: [{
            contentType: ContentType.Text,
            content: 'This document provides comprehensive project information.'
        }]
    },
    
    // Divider
    { id: 'div-1', blockType: BlockType.Divider },
    
    // Section heading
    {
        id: 'section-1',
        blockType: BlockType.Heading,
        properties: { level: 2 },
        content: [{ contentType: ContentType.Text, content: 'Requirements' }]
    },
    
    // Checklist
    {
        id: 'req-1',
        blockType: BlockType.Checklist,
        properties: { isChecked: true },
        content: [{ contentType: ContentType.Text, content: 'Define requirements' }]
    },
    {
        id: 'req-2',
        blockType: BlockType.Checklist,
        properties: { isChecked: false },
        content: [{ contentType: ContentType.Text, content: 'Review with team' }]
    },
    
    // Important callout
    {
        id: 'callout-1',
        blockType: BlockType.Callout,
        content: [{ contentType: ContentType.Text, content: '⚠️ Review deadline: End of week' }]
    },
    
    // Code example
    {
        id: 'code-1',
        blockType: BlockType.Code,
        properties: { defaultLanguage: 'typescript' },
        content: [{
            contentType: ContentType.Text,
            content: 'const editor = new BlockEditor({ width: "100%", height: "600px" });'
        }]
    },
    
    // Quote
    {
        id: 'quote-1',
        blockType: BlockType.Quote,
        content: [{
            contentType: ContentType.Text,
            content: 'Quality is not an act, it is a habit. - Aristotle'
        }]
    },
    
    // Image
    {
        id: 'img-1',
        blockType: BlockType.Image,
        properties: {
            src: 'https://example.com/diagram.png',
            altText: 'System architecture diagram',
            width: '100%'
        }
    },
    
    // Collapsible section
    {
        id: 'collapse-1',
        blockType: BlockType.CollapsibleHeading,
        properties: {
            level: 3,
            isExpanded: false,
            children: [
                {
                    blockType: BlockType.Paragraph,
                    content: [{ contentType: ContentType.Text, content: 'Additional technical details...' }]
                }
            ]
        },
        content: [{ contentType: ContentType.Text, content: 'Technical Details (Click to Expand)' }]
    }
];

const editor = new BlockEditor({
    blocks: completeDocument,
    width: '100%',
    height: '90vh'
});
editor.appendTo('#blockeditor');
```

## Best Practices

1. **Use appropriate block types** for semantic structure (headings for titles, paragraphs for body text)
2. **Leverage text formatting** for emphasis rather than creating new blocks
3. **Use checklists** for actionable items and to-do lists
4. **Nest lists properly** using the `indent` property
5. **Add alt text** to all images for accessibility
6. **Use collapsible blocks** for long content that can be hidden
7. **Separate sections** with dividers for visual clarity
8. **Combine block types** to create rich, structured documents
9. **Use code blocks** with appropriate language settings for code samples
10. **Set placeholders** to guide users on what content to add

## Notes

- All blocks require a unique `id`
- Content array can be empty for blocks with placeholders
- Multiple content items within a block allow mixed formatting
- Nested structures use `indent` (lists) or `children` (collapsible blocks)
- Image blocks support both URL sources and blob-encoded images
- Code blocks support syntax highlighting when language is specified
