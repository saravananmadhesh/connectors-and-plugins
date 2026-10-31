# Events Reference

Complete reference for all events available in the Syncfusion JavaScript BlockEditor control.

## Table of Contents

- [Overview](#overview)
- [Lifecycle Events](#lifecycle-events)
  - [created](#created)
- [Content Events](#content-events)
  - [blockChanged](#blockchanged)
  - [selectionChanged](#selectionchanged)
- [Drag and Drop Events](#drag-and-drop-events)
  - [blockDragStart](#blockdragstart)
  - [blockDragging](#blockdragging)
  - [blockDropped](#blockdropped)
- [Focus Events](#focus-events)
  - [focus](#focus)
  - [blur](#blur)
- [Paste Events](#paste-events)
  - [beforePasteCleanup](#beforepastecleanup)
  - [afterPasteCleanup](#afterpastecleanup)
- [File Upload Events](#file-upload-events)
  - [beforeFileUpload](#beforefileupload)
  - [fileUploading](#fileuploading)
  - [fileUploadSuccess](#fileuploadsuccess)
  - [fileUploadFailed](#fileuploadfailed)
- [Event Arguments Reference](#event-arguments-reference)
- [Code Examples](#code-examples)

## Overview

The Block Editor control provides a comprehensive set of events that allow you to monitor and respond to various user interactions and editor state changes. These events enable you to implement custom behaviors, validation, logging, and integration with other systems.

## Lifecycle Events

### created

Triggered when the Block Editor control is successfully initialized and ready for use.

**Type:** `EmitType<Object>`

**Description:**
This event is useful for performing setup operations or initializing additional features after the editor is created.

**Event Arguments:** None

**Example:**
```typescript
const editor = new BlockEditor({
    created: () => {
        console.log('Editor is ready');
        // Initialize custom plugins or features
    }
});
```

## Content Events

### blockChanged

Triggered whenever the editor blocks are changed.

**Type:** `EmitType<BlockChangedEventArgs>`

**Description:**
This includes block additions, deletions, or any structural modifications to the document. The event handler receives details about the changes.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `changes` | `BlockChange[]` | Array of block change operations performed |

**Example:**
```typescript
const editor = new BlockEditor({
    blockChanged: (args: BlockChangedEventArgs) => {
        console.log('Blocks changed:', args.changes);
        // Implement auto-save functionality
        saveContent(args.changes);
    }
});
```

**BlockChangedEventArgs Details:**
```typescript
interface BlockChangedEventArgs {
    changes: BlockChange[];
}

interface BlockChange {
    action: 'added' | 'removed' | 'moved' | 'updated';
    blockId: string;
    block?: BlockModel;
    fromIndex?: number;
    toIndex?: number;
}
```

### selectionChanged

Triggered when the user's text selection changes within the editor.

**Type:** `EmitType<SelectionChangedEventArgs>`

**Description:**
The event arguments contain details about the new selection, which can be useful for updating UI elements or showing contextual information.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `event` | `Event` | The native event that triggered the selection change |

**Example:**
```typescript
const editor = new BlockEditor({
    selectionChanged: (args: SelectionChangedEventArgs) => {
        console.log('Selection changed');
        // Update formatting toolbar based on selection
        updateToolbarState();
    }
});
```

**SelectionChangedEventArgs Details:**
```typescript
interface SelectionChangedEventArgs {
    event: Event;
}
```

## Drag and Drop Events

### blockDragStart

Triggered at the beginning of a block drag operation.

**Type:** `EmitType<BlockDragEventArgs>`

**Description:**
Provides information about the blocks being dragged and their initial position. You can cancel the drag operation by setting `args.cancel = true`.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `blocks` | `BlockModel[]` | The block models being dragged |
| `cancel` | `boolean` | Set to true to cancel the drag operation |
| `dropIndex` | `number` | The intended drop index |
| `event` | `Event` | The native event that triggered the drag |
| `fromIndex` | `number[]` | Index of blocks from which drag started |
| `target` | `HTMLElement` | The target element being dragged from |

**Example:**
```typescript
const editor = new BlockEditor({
    blockDragStart: (args: BlockDragEventArgs) => {
        console.log('Drag started for blocks:', args.blocks);
        
        // Cancel drag for certain block types
        if (args.blocks[0].blockType === 'Image') {
            args.cancel = true;
            console.log('Cannot drag image blocks');
        }
    }
});
```

**BlockDragEventArgs Details:**
```typescript
interface BlockDragEventArgs {
    blocks: BlockModel[];
    cancel: boolean;
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}
```

### blockDragging

Triggered continuously during a dragging operation.

**Type:** `EmitType<BlockDraggingEventArgs>`

**Description:**
Provides information about the blocks being dragged and their current position. This event fires multiple times during the drag operation.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `blocks` | `BlockModel[]` | The block models being dragged |
| `cancel` | `boolean` | Set to true to cancel the drag operation |
| `dropIndex` | `number` | The current potential drop index |
| `event` | `Event` | The native event during dragging |
| `fromIndex` | `number[]` | Index of blocks being dragged |
| `target` | `HTMLElement` | The current target element |

**Example:**
```typescript
const editor = new BlockEditor({
    blockDragging: (args: BlockDraggingEventArgs) => {
        // Trigger custom visual feedback during drag
        console.log('Dragging to index:', args.dropIndex);
    }
});
```

### blockDropped

Triggered when blocks are successfully dropped at their destination.

**Type:** `EmitType<BlockDroppedEventArgs>`

**Description:**
This event includes data about the drop target and position. It fires after the drag-and-drop operation is complete.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `blocks` | `BlockModel[]` | The block models that were dropped |
| `dropIndex` | `number` | The index where blocks were dropped |
| `event` | `Event` | The native event that triggered the drop |
| `fromIndex` | `number[]` | Index of blocks before the drop |
| `target` | `HTMLElement` | The target element where blocks were dropped |

**Example:**
```typescript
const editor = new BlockEditor({
    blockDropped: (args: BlockDroppedEventArgs) => {
        console.log('Blocks dropped at index:', args.dropIndex);
        // Trigger custom actions when blocks are dropped
        logBlockReorder(args.blocks, args.fromIndex, args.dropIndex);
    }
});
```

**BlockDroppedEventArgs Details:**
```typescript
interface BlockDroppedEventArgs {
    blocks: BlockModel[];
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}
```

## Focus Events

### focus

Triggered when the editor gains focus.

**Type:** `EmitType<FocusEventArgs>`

**Description:**
This is useful for updating UI states and managing editor interactions.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `blockId` | `string` | The unique identifier of the block that has focus |
| `event` | `Event` | The native event that triggered the focus |

**Example:**
```typescript
const editor = new BlockEditor({
    focus: (args: FocusEventArgs) => {
        console.log('Editor focused on block:', args.blockId);
        // Show editor toolbar or update UI
        showEditorToolbar();
    }
});
```

**FocusEventArgs Details:**
```typescript
interface FocusEventArgs {
    blockId: string;
    event: Event;
}
```

### blur

Triggered when the editor loses focus.

**Type:** `EmitType<BlurEventArgs>`

**Description:**
This is commonly used for auto-saving content or hiding UI elements that should only be visible when the editor is active.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `blockId` | `string` | The unique identifier of the block that had focus |
| `event` | `Event` | The native event that triggered the blur |

**Example:**
```typescript
const editor = new BlockEditor({
    blur: (args: BlurEventArgs) => {
        console.log('Editor lost focus from block:', args.blockId);
        // Auto-save content or hide UI elements
        autoSaveContent();
        hideEditorToolbar();
    }
});
```

**BlurEventArgs Details:**
```typescript
interface BlurEventArgs {
    blockId: string;
    event: Event;
}
```

## Paste Events

### beforePasteCleanup

Triggered before content is pasted into the editor.

**Type:** `EmitType<BeforePasteCleanupEventArgs>`

**Description:**
This event allows you to inspect, modify, or cancel the paste operation via its event arguments. You can validate content before it's inserted.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to true to cancel the paste operation |
| `content` | `string` | The content being pasted |

**Example:**
```typescript
const editor = new BlockEditor({
    beforePasteCleanup: (args: BeforePasteCleanupEventArgs) => {
        console.log('Pasting content:', args.content);
        
        // Cancel paste if content contains restricted elements
        if (args.content.includes('<script>')) {
            args.cancel = true;
            console.log('Paste cancelled: contains script tags');
        }
        
        // Modify content before paste
        args.content = args.content.replace(/<iframe[^>]*>/gi, '');
    }
});
```

**BeforePasteCleanupEventArgs Details:**
```typescript
interface BeforePasteCleanupEventArgs {
    cancel: boolean;
    content: string;
}
```

### afterPasteCleanup

Triggered after content has been successfully pasted into the editor.

**Type:** `EmitType<AfterPasteCleanupEventArgs>`

**Description:**
This is useful for post-processing pasted content or updating related UI elements.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `content` | `string` | The content that was pasted (after cleanup) |

**Example:**
```typescript
const editor = new BlockEditor({
    afterPasteCleanup: (args: AfterPasteCleanupEventArgs) => {
        console.log('Content pasted:', args.content.length, 'characters');
        // Process pasted content or update UI
        analyzeContent(args.content);
        updateWordCount();
    }
});
```

**AfterPasteCleanupEventArgs Details:**
```typescript
interface AfterPasteCleanupEventArgs {
    content: string;
}
```

## File Upload Events

### beforeFileUpload

Triggered before a file upload begins.

**Type:** `EmitType<BeforeUploadEventArgs>`

**Description:**
This event is cancelable - set `args.cancel` to true to prevent the upload. Allows host applications to validate files or add custom data to the upload request.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to true to cancel the upload |
| `customFormData` | `Object` | Custom data to send with the upload |
| `file` | `File` | The file being uploaded |

**Example:**
```typescript
const editor = new BlockEditor({
    beforeFileUpload: (args: BeforeUploadEventArgs) => {
        console.log('Uploading file:', args.file.name);
        
        // Validate file size
        if (args.file.size > 5000000) { // 5MB limit
            args.cancel = true;
            alert('File size exceeds 5MB limit');
        }
        
        // Add custom metadata
        args.customFormData = {
            userId: 'user123',
            timestamp: Date.now()
        };
    }
});
```

### fileUploading

Triggered during file upload with progress updates.

**Type:** `EmitType<UploadingEventArgs>`

**Description:**
Emits progress information at regular intervals (typically 10% increments).

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to true to cancel the upload |
| `file` | `File` | The file being uploaded |
| `progress` | `number` | Upload progress percentage (0-100) |

**Example:**
```typescript
const editor = new BlockEditor({
    fileUploading: (args: UploadingEventArgs) => {
        console.log('Upload progress:', args.progress + '%');
        // Update progress bar
        updateProgressBar(args.progress);
    }
});
```

### fileUploadSuccess

Triggered when a file upload completes successfully.

**Type:** `EmitType<FileUploadSuccessEventArgs>`

**Description:**
Provides server response containing the uploaded image URL and metadata.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `file` | `FileInfo` | Details about the uploaded file |
| `fileUrl` | `string` | The URL of the uploaded file |
| `operation` | `string` | The upload operation type |
| `response` | `ResponseEventArgs` | Server response |
| `statusText` | `string` | Upload status text |

**Example:**
```typescript
const editor = new BlockEditor({
    fileUploadSuccess: (args: FileUploadSuccessEventArgs) => {
        console.log('File uploaded successfully:', args.fileUrl);
        // Process uploaded file URL
        insertImageBlock(args.fileUrl);
    }
});
```

### fileUploadFailed

Triggered when a file upload fails or validation errors occur.

**Type:** `EmitType<FailureEventArgs>`

**Description:**
Provides error information for display to the user.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `error` | `Error` | The error object |
| `file` | `File` | The file that failed to upload |
| `statusText` | `string` | Error status text |

**Example:**
```typescript
const editor = new BlockEditor({
    fileUploadFailed: (args: FailureEventArgs) => {
        console.error('File upload failed:', args.statusText);
        // Show error message to user
        showErrorNotification('Upload failed: ' + args.statusText);
    }
});
```

## Event Arguments Reference

### Complete Event Arguments Interfaces

```typescript
// Lifecycle Events
interface CreatedEventArgs {
    // No specific properties
}

// Content Events
interface BlockChangedEventArgs {
    changes: BlockChange[];
}

interface BlockChange {
    action: 'added' | 'removed' | 'moved' | 'updated';
    blockId: string;
    block?: BlockModel;
    fromIndex?: number;
    toIndex?: number;
}

interface SelectionChangedEventArgs {
    event: Event;
}

// Drag and Drop Events
interface BlockDragEventArgs {
    blocks: BlockModel[];
    cancel: boolean;
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}

interface BlockDraggingEventArgs {
    blocks: BlockModel[];
    cancel: boolean;
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}

interface BlockDroppedEventArgs {
    blocks: BlockModel[];
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}

// Focus Events
interface FocusEventArgs {
    blockId: string;
    event: Event;
}

interface BlurEventArgs {
    blockId: string;
    event: Event;
}

// Paste Events
interface BeforePasteCleanupEventArgs {
    cancel: boolean;
    content: string;
}

interface AfterPasteCleanupEventArgs {
    content: string;
}

// File Upload Events
interface BeforeUploadEventArgs {
    cancel: boolean;
    customFormData: Object;
    file: File;
}

interface UploadingEventArgs {
    cancel: boolean;
    file: File;
    progress: number;
}

interface FileUploadSuccessEventArgs {
    chunkIndex: number;
    chunkSize: number;
    e: object;
    event: object;
    file: FileInfo;
    fileUrl: string;
    operation: string;
    response: ResponseEventArgs;
    statusText: string;
    totalChunk: number;
}

interface FailureEventArgs {
    error: Error;
    file: File;
    statusText: string;
}
```

## Code Examples

### Complete Event Handling Example

```typescript
import { 
    BlockEditor, 
    BlockChangedEventArgs,
    SelectionChangedEventArgs,
    BlockDragEventArgs,
    BlockDroppedEventArgs,
    FocusEventArgs,
    BlurEventArgs,
    BeforePasteCleanupEventArgs,
    AfterPasteCleanupEventArgs,
    ContentType
} from '@syncfusion/ej2-blockeditor';

const blockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Sample content for event demonstration.'
                }
            ]
        }
    ],
    
    // Lifecycle Events
    created: () => {
        console.log('Editor created and ready');
        initializeCustomFeatures();
    },
    
    // Content Events
    blockChanged: (args: BlockChangedEventArgs) => {
        console.log('Block changed:', args.changes);
        autoSave();
    },
    
    selectionChanged: (args: SelectionChangedEventArgs) => {
        console.log('Selection changed');
        updateToolbar();
    },
    
    // Drag and Drop Events
    blockDragStart: (args: BlockDragEventArgs) => {
        console.log('Drag started:', args.blocks.length, 'blocks');
        // Optional: Cancel drag for specific conditions
        if (args.blocks[0].blockType === 'Table') {
            args.cancel = true;
        }
    },
    
    blockDragging: (args: BlockDraggingEventArgs) => {
        console.log('Dragging to index:', args.dropIndex);
    },
    
    blockDropped: (args: BlockDroppedEventArgs) => {
        console.log('Blocks dropped at:', args.dropIndex);
        logActivity('Block reordered');
    },
    
    // Focus Events
    focus: (args: FocusEventArgs) => {
        console.log('Editor focused on block:', args.blockId);
        showToolbar();
    },
    
    blur: (args: BlurEventArgs) => {
        console.log('Editor blurred from block:', args.blockId);
        hideToolbar();
        autoSave();
    },
    
    // Paste Events
    beforePasteCleanup: (args: BeforePasteCleanupEventArgs) => {
        console.log('Before paste:', args.content.length, 'chars');
        
        // Validate and clean content
        if (args.content.includes('<script>')) {
            args.cancel = true;
            alert('Script tags not allowed');
        }
    },
    
    afterPasteCleanup: (args: AfterPasteCleanupEventArgs) => {
        console.log('After paste:', args.content.length, 'chars');
        updateWordCount();
    }
});

blockEditor.appendTo('#blockeditor');

// Helper functions
function autoSave() {
    const content = blockEditor.getDataAsJson();
    localStorage.setItem('editorContent', JSON.stringify(content));
    console.log('Content auto-saved');
}

function updateToolbar() {
    // Update toolbar state based on selection
    console.log('Toolbar updated');
}

function showToolbar() {
    document.getElementById('toolbar')?.classList.remove('hidden');
}

function hideToolbar() {
    document.getElementById('toolbar')?.classList.add('hidden');
}

function updateWordCount() {
    const html = blockEditor.getDataAsHtml();
    const text = html.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    console.log('Word count:', wordCount);
}

function logActivity(action: string) {
    console.log(`Activity logged: ${action} at ${new Date().toISOString()}`);
}

function initializeCustomFeatures() {
    console.log('Custom features initialized');
}
```

### File Upload Events Example

```typescript
import { 
    BlockEditor, 
    BeforeUploadEventArgs,
    UploadingEventArgs,
    FileUploadSuccessEventArgs,
    FailureEventArgs
} from '@syncfusion/ej2-blockeditor';

const blockEditor = new BlockEditor({
    blocks: [],
    imageBlockSettings: {
        saveUrl: 'https://example.com/upload'
    },
    
    // File Upload Events
    beforeFileUpload: (args: BeforeUploadEventArgs) => {
        console.log('Uploading:', args.file.name);
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(args.file.type)) {
            args.cancel = true;
            alert('Only JPEG, PNG, and GIF images are allowed');
            return;
        }
        
        // Validate file size (5MB limit)
        if (args.file.size > 5 * 1024 * 1024) {
            args.cancel = true;
            alert('File size must be less than 5MB');
            return;
        }
        
        // Add custom metadata
        args.customFormData = {
            userId: getCurrentUserId(),
            uploadTime: new Date().toISOString()
        };
        
        showUploadProgress();
    },
    
    fileUploading: (args: UploadingEventArgs) => {
        console.log('Upload progress:', args.progress + '%');
        updateProgressBar(args.progress);
    },
    
    fileUploadSuccess: (args: FileUploadSuccessEventArgs) => {
        console.log('Upload successful:', args.fileUrl);
        hideUploadProgress();
        showSuccessMessage('Image uploaded successfully!');
    },
    
    fileUploadFailed: (args: FailureEventArgs) => {
        console.error('Upload failed:', args.statusText);
        hideUploadProgress();
        showErrorMessage('Upload failed: ' + args.statusText);
    }
});

blockEditor.appendTo('#blockeditor');

// Helper functions
function getCurrentUserId(): string {
    return 'user-123';
}

function showUploadProgress() {
    const progressBar = document.getElementById('upload-progress');
    if (progressBar) {
        progressBar.style.display = 'block';
    }
}

function hideUploadProgress() {
    const progressBar = document.getElementById('upload-progress');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
}

function updateProgressBar(progress: number) {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
        progressBar.textContent = Math.round(progress) + '%';
    }
}

function showSuccessMessage(message: string) {
    alert(message);
}

function showErrorMessage(message: string) {
    alert(message);
}
```
---
