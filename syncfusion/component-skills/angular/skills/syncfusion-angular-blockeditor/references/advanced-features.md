# Advanced Features

## Table of Contents
- [Undo/Redo Configuration](#undoredo-configuration)
- [Drag and Drop Customization](#drag-and-drop-customization)
- [Image Blocks](#image-blocks)
- [Code Blocks with Syntax Highlighting](#code-blocks-with-syntax-highlighting)
- [Template Blocks](#template-blocks)
- [Advanced Examples](#advanced-examples)

## Undo/Redo Configuration

The Block Editor maintains a history of actions, allowing users to undo and redo changes.

### Default Behavior

By default, the editor stores up to 30 actions in the undo/redo stack.

### Customizing Stack Size

Use the `undoRedoStack` property to control the history limit:

```typescript
<ejs-blockeditor [undoRedoStack]="20" />
```

In component:
```typescript
public undoRedoStack = 20;  // Limit to 20 actions
```

### Keyboard Shortcuts

| Action | Windows | Mac |
|--------|---------|-----|
| Undo | Ctrl + Z | ⌘ + Z |
| Redo | Ctrl + Y | ⌘ + Y |

### Example Configuration

```typescript
@Component({
  selector: 'app-root',
  template: `<ejs-blockeditor [undoRedoStack]="30" />`
})
export class AppComponent {
  public undoRedoStack = 30;
}
```

### Undo/Redo Events

Track undo/redo operations with events:

```typescript
public onBlockChanged(args: BlockChangedEventArgs): void {
  if (args.action === 'undo') {
    console.log('User pressed undo');
  } else if (args.action === 'redo') {
    console.log('User pressed redo');
  }
}
```

## Drag and Drop Customization

Block dragging is enabled by default, allowing users to reorder content.

### Enable/Disable

```typescript
<ejs-blockeditor [enableDragAndDrop]="true" />
```

Or:
```typescript
public enableDragAndDrop = true;
```

### Single Block Dragging

Drag a single block by its handle:

```typescript
// Hover over block → Grab drag handle → Drag to new position
```

### Multiple Block Dragging

Select multiple blocks and drag together:

1. Select desired blocks (Ctrl+Click or Shift+Click)
2. Drag the selection to a new position
3. Release to place

### Drag Events

Handle drag operations with events:

```typescript
public onBlockDragStart(args: BlockDragStartEventArgs): void {
  // Validate if blocks can be dragged
  console.log('Dragging blocks:', args.blocks.length);
}

public onBlockDragging(args: BlockDraggingEventArgs): void {
  // Update visual feedback
  console.log('Target position:', args.targetPosition);
}

public onBlockDropped(args: BlockDroppedEventArgs): void {
  // Confirm drop and perform actions
  if (args.success) {
    console.log('Dropped successfully');
    this.updateReferences();
  }
}
```

### Example: Prevent Dragging Certain Blocks

```typescript
public onBlockDragStart(args: BlockDragStartEventArgs): void {
  // Don't allow dragging headings
  if (args.blocks.some(b => b.blockType === 'Heading')) {
    args.canDrop = false;
  }
}
```

## Image Blocks

Insert and manage images with upload, resize, and display options.

### Global Image Settings

Configure global image behavior:

```typescript
public imageBlockSettings = {
  saveUrl: '/api/upload/image',           // Server endpoint
  path: '/uploads/',                       // Server path
  maxFileSize: 10000000,                   // 10MB max
  allowedTypes: ['.jpg', '.jpeg', '.png'], // Allowed formats
  width: '100%',                           // Default width
  height: 'auto',                          // Default height
  enableResize: true,                      // Allow resizing
  minWidth: '200px',                       // Minimum width
  maxWidth: '800px'                        // Maximum width
};
```

### Image Block Configuration

```typescript
{
  blockType: 'Image',
  properties: {
    src: 'https://example.com/image.jpg',
    width: '400px',
    height: '300px',
    altText: 'Image description'
  }
}
```

### Image Upload Handler

```typescript
@Component({
  imports: [BlockEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-blockeditor [imageBlockSettings]="imageBlockSettings" (fileUploading)="onFileUploading($event)" />`
})
export class AppComponent {
  public imageBlockSettings = {
    saveUrl: 'https://api.example.com/upload',
    path: 'https://cdn.example.com/images/'
  };

  public onFileUploading(args: UploadingEventArgs): void {
    // Add authentication
    args.currentRequest.setRequestHeader('Authorization', 'Bearer token');
  }
}
```

### Image Resizing

Users can resize images by dragging corners:

- Drag corners to resize with aspect ratio maintained
- Double-click to fit to content
- Use auto-fit for responsive sizing

## Code Blocks with Syntax Highlighting

Display code with language-specific syntax highlighting.

### Global Code Settings

Configure available languages and default:

```typescript
public codeBlockSettings: CodeBlockSettingsModel = {
  defaultLanguage: 'javascript',
  languages: [
    { language: 'javascript', label: 'JavaScript' },
    { language: 'typescript', label: 'TypeScript' },
    { language: 'html', label: 'HTML' },
    { language: 'css', label: 'CSS' },
    { language: 'python', label: 'Python' },
    { language: 'java', label: 'Java' },
    { language: 'csharp', label: 'C#' },
    { language: 'php', label: 'PHP' }
  ]
};
```

### Code Block Configuration

```typescript
{
  blockType: 'Code',
  properties: {
    language: 'typescript'
  },
  content: [
    {
      contentType: ContentType.Text,
      content: 'interface User {\n  name: string;\n  age: number;\n}'
    }
  ]
}
```

### Example: Multiple Code Blocks

```typescript
[
  {
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { contentType: ContentType.Text, content: 'Code Examples' }
    ]
  },
  {
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'JavaScript:' }
    ]
  },
  {
    blockType: 'Code',
    properties: { language: 'javascript' },
    content: [
      {
        contentType: ContentType.Text,
        content: 'const x = 10;\nconsole.log(x);'
      }
    ]
  },
  {
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'TypeScript:' }
    ]
  },
  {
    blockType: 'Code',
    properties: { language: 'typescript' },
    content: [
      {
        contentType: ContentType.Text,
        content: 'const x: number = 10;\nconsole.log(x);'
      }
    ]
  }
]
```

### Copy Code Feature

Users can copy code blocks using the built-in copy button.

## Template Blocks

Create custom block types using templates for specialized content.

### Basic Template

```typescript
{
  blockType: 'Template',
  template: '<div class="custom-block">Custom Content</div>'
}
```

### Template with Dynamic Content

```typescript
{
  blockType: 'Template',
  template: `<div class="notification-card">
    <span class="icon">📢</span>
    <h3>Announcement</h3>
    <p>Important message</p>
  </div>`
}
```

### Template as Function

```typescript
{
  blockType: 'Template',
  template: (data: any) => {
    return `<div class="dynamic-block">
      <h4>${data.title}</h4>
      <p>${data.content}</p>
    </div>`;
  },
  properties: {
    title: 'Dynamic Block',
    content: 'This content is dynamic'
  }
}
```

### Template with Styling

```typescript
{
  blockType: 'Template',
  template: `<div class="alert alert-info">
    <strong>Note:</strong> This is a template block with custom styling.
  </div>`
}
```

CSS:
```css
.alert {
  padding: 12px 16px;
  border-radius: 4px;
  border-left: 4px solid;
}

.alert-info {
  border-left-color: #2196F3;
  background-color: #E3F2FD;
  color: #1976D2;
}
```

## Advanced Examples

### Example 1: Complete Documentation Setup

```typescript
public blocksData: BlockModel[] = [
  {
    blockType: 'Heading',
    properties: { level: 1 },
    content: [
      { contentType: ContentType.Text, content: 'API Documentation' }
    ]
  },
  {
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'Learn how to use our API' }
    ]
  },
  {
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { contentType: ContentType.Text, content: 'Authentication' }
    ]
  },
  {
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'Use Bearer token:' }
    ]
  },
  {
    blockType: 'Code',
    properties: { language: 'bash' },
    content: [
      {
        contentType: ContentType.Text,
        content: 'Authorization: Bearer YOUR_TOKEN'
      }
    ]
  }
];

public codeBlockSettings = {
  defaultLanguage: 'javascript',
  languages: [
    { language: 'bash', label: 'Bash' },
    { language: 'javascript', label: 'JavaScript' },
    { language: 'typescript', label: 'TypeScript' }
  ]
};

public imageBlockSettings = {
  maxFileSize: 5000000,
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif']
};

public undoRedoStack = 30;
```

### Example 2: Tutorial with Code and Images

```typescript
public blocksData: BlockModel[] = [
  {
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { contentType: ContentType.Text, content: 'Getting Started Tutorial' }
    ]
  },
  {
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'Follow these steps to begin' }
    ]
  },
  {
    blockType: 'Image',
    properties: {
      src: 'https://example.com/step1.jpg',
      altText: 'Step 1 illustration',
      width: '100%'
    }
  },
  {
    blockType: 'NumberedList',
    content: [
      { contentType: ContentType.Text, content: 'View the diagram above' }
    ]
  },
  {
    blockType: 'NumberedList',
    content: [
      { contentType: ContentType.Text, content: 'Run this code:' }
    ]
  },
  {
    blockType: 'Code',
    properties: { language: 'bash' },
    content: [
      { contentType: ContentType.Text, content: 'npm install' }
    ]
  }
];
```

### Example 3: Blog Post with Collapsible Sections

```typescript
public blocksData: BlockModel[] = [
  {
    blockType: 'Heading',
    properties: { level: 1 },
    content: [
      { contentType: ContentType.Text, content: 'Blog Post' }
    ]
  },
  {
    id: 'intro',
    blockType: 'CollapsibleHeading',
    properties: {
      level: 2,
      isExpanded: true,
      children: [
        {
          parentId: 'intro',
          blockType: 'Paragraph',
          content: [
            { contentType: ContentType.Text, content: 'Introduction text' }
          ]
        }
      ]
    }
  },
  {
    id: 'details',
    blockType: 'CollapsibleHeading',
    properties: {
      level: 2,
      isExpanded: false,
      children: [
        {
          parentId: 'details',
          blockType: 'Paragraph',
          content: [
            { contentType: ContentType.Text, content: 'Detailed content' }
          ]
        }
      ]
    }
  }
];
```

