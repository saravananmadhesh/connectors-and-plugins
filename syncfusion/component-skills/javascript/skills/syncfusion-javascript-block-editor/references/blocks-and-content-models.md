# Blocks and Content Models

This document provides complete information about the BlockModel and ContentModel structures that form the foundation of the BlockEditor's content architecture.

## Table of Contents

- [BlockModel Interface](#blockmodel-interface)
- [BlockType Enum](#blocktype-enum)
- [ContentModel Interface](#contentmodel-interface)
- [ContentType Enum](#contenttype-enum)
- [Block-Specific Properties](#block-specific-properties)
- [Content-Specific Properties](#content-specific-properties)
- [StyleModel](#stylemodel)
- [UserModel](#usermodel)
- [BlockFactory Utility](#blockfactory-utility)
- [Complete Examples](#complete-examples)

## BlockModel Interface

The `BlockModel` interface defines the structure of a block in the editor.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| **id** | `string` | Unique identifier for the block. Used to reference and manipulate blocks programmatically. |
| **blockType** | `BlockType \| string` | The type of block (Paragraph, Heading, BulletList, etc.). Can use BlockType enum or string. |
| **content** | `ContentModel[]` | Array of content models that make up the block's content. |
| **properties** | `BlockProperties \| object` | Type-specific properties for the block (e.g., heading level, image source, code language). |
| **cssClass** | `string` (optional) | Custom CSS class(es) to apply to the block for styling. |
| **indent** | `number` (optional) | Indentation level for the block (used for nested structures). Default: 0. |
| **parentId** | `string` (optional) | ID of the parent block for hierarchical relationships. |
| **template** | `string \| HTMLElement \| Function` (optional) | Custom template for rendering the block. |

### Example

```typescript
const paragraphBlock: BlockModel = {
    id: 'para-1',
    blockType: BlockType.Paragraph,
    content: [
        {
            contentType: ContentType.Text,
            content: 'This is a paragraph block.'
        }
    ],
    cssClass: 'custom-para',
    indent: 0
};
```

## BlockType Enum

The `BlockType` enum defines all available block types in the BlockEditor.

```typescript
enum BlockType {
    Paragraph = 'Paragraph',
    Heading = 'Heading',
    BulletList = 'BulletList',
    NumberedList = 'NumberedList',
    Checklist = 'Checklist',
    Table = 'Table',
    Image = 'Image',
    Code = 'Code',
    Quote = 'Quote',
    Callout = 'Callout',
    Divider = 'Divider',
    CollapsibleParagraph = 'CollapsibleParagraph',
    CollapsibleHeading = 'CollapsibleHeading',
    Template = 'Template'
}
```

### Block Type Descriptions

- **Paragraph**: Standard text block for body content
- **Heading**: Heading block with level 1-4
- **BulletList**: Unordered list with bullet points
- **NumberedList**: Ordered list with numbers
- **Checklist**: Interactive to-do list with checkboxes
- **Table**: Tabular data block
- **Image**: Image/media block with upload support
- **Code**: Code block with syntax highlighting
- **Quote**: Block quote for citations
- **Callout**: Highlighted information box
- **Divider**: Horizontal divider line
- **CollapsibleParagraph**: Paragraph that can be collapsed/expanded
- **CollapsibleHeading**: Heading that can be collapsed/expanded with child blocks
- **Template**: Custom template block

## ContentModel Interface

The `ContentModel` interface defines the structure of content within a block.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| **contentType** | `ContentType \| string` | Type of content (Text, Link, Mention, Label). |
| **content** | `string` | The actual text/data content. |
| **properties** | `ContentProperties` (optional) | Type-specific properties (e.g., link URL, styling). |

### Example

```typescript
const textContent: ContentModel = {
    contentType: ContentType.Text,
    content: 'Hello World',
    properties: {
        styles: {
            bold: true,
            color: '#ff0000'
        }
    }
};
```

## ContentType Enum

The `ContentType` enum defines types of content that can exist within blocks.

```typescript
enum ContentType {
    Text = 'Text',
    Link = 'Link',
    Mention = 'Mention',
    Label = 'Label'
}
```

### Content Type Descriptions

- **Text**: Plain or formatted text content
- **Link**: Hyperlink with URL
- **Mention**: User mention (@user)
- **Label**: Tag/label ($label)

## Block-Specific Properties

Each block type has specific properties available through the `properties` field.

### HeadingProps

Properties for Heading blocks.

```typescript
interface HeadingProps {
    level: number;           // Heading level: 1, 2, 3, or 4
    placeholder?: string;    // Placeholder text when empty
}
```

**Example:**
```typescript
{
    blockType: BlockType.Heading,
    properties: { level: 2, placeholder: 'Enter heading...' },
    content: [{ contentType: ContentType.Text, content: 'Chapter 1' }]
}
```

### ParagraphProps (BasePlaceholderProp)

Properties for Paragraph blocks.

```typescript
interface ParagraphProps {
    placeholder?: string;    // Placeholder text when empty
}
```

**Example:**
```typescript
{
    blockType: BlockType.Paragraph,
    properties: { placeholder: 'Start typing...' },
    content: []
}
```

### ChecklistProps

Properties for Checklist blocks.

```typescript
interface ChecklistProps {
    isChecked: boolean;      // Checked state of the checklist item
    placeholder?: string;    // Placeholder text when empty
}
```

**Example:**
```typescript
{
    blockType: BlockType.Checklist,
    properties: { isChecked: true, placeholder: 'Add task...' },
    content: [{ contentType: ContentType.Text, content: 'Complete documentation' }]
}
```

### ImageProps

Properties for Image blocks.

```typescript
interface ImageProps {
    src: string;                      // Image source URL or blob data
    altText?: string;                 // Alternative text for accessibility
    width?: string;                   // Display width (e.g., '100%', '500px')
    height?: string;                  // Display height
    maxWidth?: string | number;       // Maximum width constraint
    maxHeight?: string | number;      // Maximum height constraint
    minWidth?: string | number;       // Minimum width constraint
    minHeight?: string | number;      // Minimum height constraint
    cssClass?: string;                // Custom CSS classes
    readOnly?: boolean;               // Prevent editing/removal
    allowedTypes?: string[];          // Allowed file types ['.jpg', '.png']
    saveFormat?: 'Blob' | 'Base64';   // Save format for uploaded images
}
```

**Example:**
```typescript
{
    blockType: BlockType.Image,
    properties: {
        src: 'https://example.com/image.jpg',
        altText: 'Sample image',
        width: '100%',
        maxWidth: 800
    }
}
```

### CodeProps

Properties for Code blocks.

```typescript
interface CodeProps {
    defaultLanguage?: string;         // Default language for syntax highlighting
    languages?: CodeLanguageModel[];  // Available languages
}

interface CodeLanguageModel {
    language: string;   // Language identifier (e.g., 'javascript', 'python')
    label: string;      // Display label (e.g., 'JavaScript', 'Python')
}
```

**Example:**
```typescript
{
    blockType: BlockType.Code,
    properties: {
        defaultLanguage: 'javascript',
        languages: [
            { language: 'javascript', label: 'JavaScript' },
            { language: 'python', label: 'Python' },
            { language: 'typescript', label: 'TypeScript' }
        ]
    },
    content: [{ 
        contentType: ContentType.Text, 
        content: 'const editor = new BlockEditor();' 
    }]
}
```

### CollapsibleProps

Properties for CollapsibleParagraph and CollapsibleHeading blocks.

```typescript
interface CollapsibleProps {
    isExpanded: boolean;     // Whether block is expanded (true) or collapsed (false)
    children?: BlockModel[]; // Child blocks shown when expanded
    placeholder?: string;    // Placeholder text when empty
}
```

**Example:**
```typescript
{
    blockType: BlockType.CollapsibleHeading,
    properties: {
        level: 2,
        isExpanded: true,
        children: [
            {
                blockType: BlockType.Paragraph,
                content: [{ contentType: ContentType.Text, content: 'This is nested content.' }]
            }
        ]
    },
    content: [{ contentType: ContentType.Text, content: 'Click to collapse' }]
}
```

### TableProps

Properties for Table blocks (refer to built-in-block-types.md for detailed table configuration).

### CalloutProps

Properties for Callout blocks.

```typescript
interface CalloutProps {
    placeholder?: string;    // Placeholder text when empty
}
```

## Content-Specific Properties

Content within blocks can have type-specific properties.

### BaseStylesProp / StyleModel

Text styling properties available for Text and Link content.

```typescript
interface StyleModel {
    bold?: boolean;                 // Bold text
    italic?: boolean;               // Italic text
    underline?: boolean;            // Underlined text
    strikethrough?: boolean;        // Strikethrough text
    subscript?: boolean;            // Subscript text
    superscript?: boolean;          // Superscript text
    uppercase?: boolean;            // Convert to uppercase
    lowercase?: boolean;            // Convert to lowercase
    inlineCode?: boolean;           // Inline code styling
    color?: string;                 // Text color (hex or rgba)
    backgroundColor?: string;       // Background/highlight color
}
```

**Example:**
```typescript
{
    contentType: ContentType.Text,
    content: 'Important text',
    properties: {
        styles: {
            bold: true,
            color: '#ff0000',
            backgroundColor: '#ffff00'
        }
    }
}
```

### LinkContentProps

Properties for Link content.

```typescript
interface LinkContentProps {
    url: string;                    // Link destination URL
    openInNewWindow?: boolean;      // Open in new tab/window
    styles?: Partial<StyleModel>;   // Text styling for the link
}
```

**Example:**
```typescript
{
    contentType: ContentType.Link,
    content: 'Visit our site',
    properties: {
        url: 'https://example.com',
        openInNewWindow: true,
        styles: {
            color: '#0066cc',
            underline: true
        }
    }
}
```

### MentionContentProps

Properties for Mention content.

```typescript
interface MentionContentProps {
    userId: string;     // ID of the mentioned user (matches UserModel.id)
}
```

**Example:**
```typescript
{
    contentType: ContentType.Mention,
    content: '@john',
    properties: {
        userId: 'user-123'
    }
}
```

### LabelContentProps

Properties for Label content.

```typescript
interface LabelContentProps {
    labelId: string;    // ID of the label (matches LabelItemModel.id)
}
```

**Example:**
```typescript
{
    contentType: ContentType.Label,
    content: '$bug',
    properties: {
        labelId: 'bug-label'
    }
}
```

## StyleModel

Complete StyleModel interface for text formatting:

```typescript
interface StyleModel {
    bold?: boolean;                 // Bold: true/false
    italic?: boolean;               // Italic: true/false
    underline?: boolean;            // Underline: true/false
    strikethrough?: boolean;        // Strikethrough: true/false
    subscript?: boolean;            // Subscript: true/false
    superscript?: boolean;          // Superscript: true/false
    uppercase?: boolean;            // Convert to UPPERCASE
    lowercase?: boolean;            // Convert to lowercase
    inlineCode?: boolean;           // Monospace code style
    color?: string;                 // Text color (e.g., '#ff0000', 'rgba(255,0,0,1)')
    backgroundColor?: string;       // Highlight/background color
}
```

## UserModel

The `UserModel` interface defines user information for mentions and collaboration.

```typescript
interface UserModel {
    id: string;              // Unique user identifier
    user: string;            // User's display name
    avatarUrl?: string;      // URL to user's avatar image
    avatarBgColor?: string;  // Background color for avatar (also used as cursor color)
    cssClass?: string;       // Custom CSS class for the user
}
```

**Example:**
```typescript
const users: UserModel[] = [
    {
        id: 'user-1',
        user: 'John Doe',
        avatarUrl: 'https://example.com/john.jpg',
        avatarBgColor: '#3498db'
    },
    {
        id: 'user-2',
        user: 'Jane Smith',
        avatarBgColor: '#e74c3c'
    }
];

const editor = new BlockEditor({
    users: users
});
```

## BlockFactory Utility

The `BlockFactory` class provides static helper methods for creating blocks programmatically.

### Creating Blocks

```typescript
// Paragraph
const para = BlockFactory.createParagraphBlock(
    { id: 'para-1', cssClass: 'intro' },
    { placeholder: 'Start typing...' }
);

// Heading
const heading = BlockFactory.createHeadingBlock(
    { id: 'h1' },
    { level: 1, placeholder: 'Enter title' }
);

// Bullet List
const bulletList = BlockFactory.createBulletListBlock(
    { id: 'list-1' },
    { placeholder: 'List item' }
);

// Numbered List
const numberedList = BlockFactory.createNumberedListBlock(
    { id: 'list-2' },
    { placeholder: 'List item' }
);

// Checklist
const checklist = BlockFactory.createChecklistBlock(
    { id: 'task-1' },
    { isChecked: false, placeholder: 'Add task' }
);

// Image
const image = BlockFactory.createImageBlock(
    { id: 'img-1' },
    { src: 'image.jpg', alt: 'Sample', width: '100%' }
);

// Code
const code = BlockFactory.createCodeBlock(
    { id: 'code-1' },
    { defaultLanguage: 'javascript' }
);

// Quote
const quote = BlockFactory.createQuoteBlock(
    { id: 'quote-1' },
    { placeholder: 'Enter quote' }
);

// Callout
const callout = BlockFactory.createCalloutBlock(
    { id: 'callout-1' },
    { placeholder: 'Important note' }
);

// Divider
const divider = BlockFactory.createDividerBlock({ id: 'divider-1' });

// Collapsible Paragraph
const collapsible = BlockFactory.createCollapsibleParagraphBlock(
    { id: 'collapse-1' },
    { isExpanded: true, placeholder: 'Collapsible content' }
);

// Collapsible Heading
const collapsibleHeading = BlockFactory.createCollapsibleHeadingBlock(
    { id: 'collapse-h-1' },
    { level: 2, isExpanded: false }
);

// Template
const template = BlockFactory.createTemplateBlock(
    { id: 'template-1' },
    customTemplateData
);
```

### Creating Content

```typescript
// Text Content
const text = BlockFactory.createTextContent(
    { id: 'text-1' },
    {
        styles: {
            bold: true,
            color: '#ff0000'
        }
    }
);

// Link Content
const link = BlockFactory.createLinkContent(
    { id: 'link-1', content: 'Click here' },
    {
        url: 'https://example.com',
        openInNewWindow: true
    }
);

// Mention Content
const mention = BlockFactory.createMentionContent(
    { id: 'user-123', content: '@john' },
    { userId: 'user-123' }
);

// Label Content
const label = BlockFactory.createLabelContent(
    { id: 'bug-label', content: '$bug' },
    { labelId: 'bug-label' }
);

// Code Content
const codeContent = BlockFactory.createCodeContent(
    { id: 'code-content-1', content: 'console.log("Hello");' },
    { /* code-specific props */ }
);
```

## Complete Examples

### Rich Paragraph with Multiple Content Types

```typescript
const richParagraph: BlockModel = {
    id: 'rich-para',
    blockType: BlockType.Paragraph,
    content: [
        {
            contentType: ContentType.Text,
            content: 'This is '
        },
        {
            contentType: ContentType.Text,
            content: 'bold',
            properties: {
                styles: { bold: true }
            }
        },
        {
            contentType: ContentType.Text,
            content: ' and '
        },
        {
            contentType: ContentType.Link,
            content: 'this is a link',
            properties: {
                url: 'https://example.com',
                styles: { color: '#0066cc', underline: true }
            }
        },
        {
            contentType: ContentType.Text,
            content: '. Mentioning '
        },
        {
            contentType: ContentType.Mention,
            content: '@john',
            properties: {
                userId: 'user-1'
            }
        },
        {
            contentType: ContentType.Text,
            content: ' with label '
        },
        {
            contentType: ContentType.Label,
            content: '$urgent',
            properties: {
                labelId: 'urgent-label'
            }
        }
    ]
};
```

### Nested Collapsible Structure

```typescript
const collapsibleWithChildren: BlockModel = {
    id: 'collapsible-main',
    blockType: BlockType.CollapsibleHeading,
    properties: {
        level: 2,
        isExpanded: true,
        children: [
            {
                id: 'child-para-1',
                blockType: BlockType.Paragraph,
                content: [{
                    contentType: ContentType.Text,
                    content: 'This is nested inside the collapsible heading.'
                }]
            },
            {
                id: 'child-list',
                blockType: BlockType.BulletList,
                content: [{
                    contentType: ContentType.Text,
                    content: 'Nested bullet point'
                }]
            }
        ]
    },
    content: [{
        contentType: ContentType.Text,
        content: 'Click to Toggle Content'
    }]
};
```

### Complete Document Structure

```typescript
const documentBlocks: BlockModel[] = [
    {
        id: 'title',
        blockType: BlockType.Heading,
        properties: { level: 1 },
        content: [{
            contentType: ContentType.Text,
            content: 'Project Documentation'
        }]
    },
    {
        id: 'intro',
        blockType: BlockType.Paragraph,
        content: [{
            contentType: ContentType.Text,
            content: 'This document describes the project requirements.'
        }]
    },
    {
        id: 'divider-1',
        blockType: BlockType.Divider
    },
    {
        id: 'section-1',
        blockType: BlockType.Heading,
        properties: { level: 2 },
        content: [{
            contentType: ContentType.Text,
            content: 'Requirements'
        }]
    },
    {
        id: 'req-list',
        blockType: BlockType.Checklist,
        properties: { isChecked: false },
        content: [{
            contentType: ContentType.Text,
            content: 'Define user stories'
        }]
    },
    {
        id: 'code-sample',
        blockType: BlockType.Code,
        properties: { defaultLanguage: 'typescript' },
        content: [{
            contentType: ContentType.Text,
            content: 'const editor = new BlockEditor();'
        }]
    }
];

const editor = new BlockEditor({
    blocks: documentBlocks
});
```

## Notes

- **Block IDs must be unique** across the entire document
- **Content IDs must be unique** within their parent block
- Use **BlockFactory** methods for type-safe block creation
- **Nested structures** use the `children` property in CollapsibleProps
- **Mentions and Labels** require corresponding entries in `users` and `labelSettings.items` arrays
- **StyleModel** properties can be combined (e.g., bold + italic + color)
- **blockType** can be string or enum value, but enum is recommended for type safety
