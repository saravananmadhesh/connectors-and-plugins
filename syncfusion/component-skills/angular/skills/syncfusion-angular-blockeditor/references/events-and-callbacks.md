# Events and Callbacks

## Table of Contents
- [Overview](#overview)
- [Component Lifecycle Events](#component-lifecycle-events)
- [Content Modification Events](#content-modification-events)
- [Selection Events](#selection-events)
- [Drag and Drop Events](#drag-and-drop-events)
- [Focus Events](#focus-events)
- [Paste Events](#paste-events)
- [File Upload Events](#file-upload-events)
- [Complete Example](#complete-example)

## Overview

The Block Editor emits events that allow you to monitor and respond to user interactions and editor state changes. Events enable custom behaviors including:

- Validation and sanitization
- Auto-saving
- Analytics and logging
- Custom UI updates
- Content manipulation
- Third-party integrations

## Component Lifecycle Events

### created Event

Triggered when the Block Editor is successfully initialized and ready for use.

**Syntax:**
```typescript
(created)="onCreated()"
```

**Use Cases:**
- Initialize external features after editor loads
- Load saved content
- Set up event listeners
- Configure initial state

**Example:**
```typescript
public onCreated(): void {
  console.log('Block Editor initialized');
  this.loadSavedContent();
  this.initializeToolbars();
}
```

## Content Modification Events

### blockChanged Event

Triggered whenever blocks are modified (added, deleted, or restructured).

**Syntax:**
```typescript
(blockChanged)="onBlockChanged($event)"
```

**Event Args:**
```typescript
interface BlockChangedEventArgs {
  changes: BlockChange[];  // Array of block change operations
}

interface BlockChange {
  action: BlockAction;  // Type of action performed
  data: BlockData;      // Data associated with the change
}

enum BlockAction {
  Insertion = 'Insertion',  // Block insertion action
  Deletion = 'Deletion',    // Block deletion action
  Moved = 'Moved',          // Block moved action
  Update = 'Update'         // Block update action
}

interface BlockData {
  block: BlockModel;          // Current block model after the change
  currentParent?: BlockModel; // Current parent block (if nested)
  prevBlock?: BlockModel;     // Previous block model before change
  prevParent?: BlockModel;    // Previous parent block (if parent changed)
}
```

**Use Cases:**
- Auto-save functionality
- Validation on changes
- Analytics tracking
- Update related UI
- Undo/redo custom logic

**Example:**
```typescript
public onBlockChanged(args: BlockChangedEventArgs): void {
  console.log(`${args.changes.length} change(s) detected`);
  
  args.changes.forEach(change => {
    console.log(`Action: ${change.action}`);
    console.log(`Block ID: ${change.data.block.id}`);
    
    // Auto-save on specific actions
    if (change.action === BlockAction.Update || change.action === BlockAction.Insertion) {
      this.autoSave();
    }
    
    // Track changes for analytics
    this.analytics.trackBlockChange(change.action, change.data.block.type);
  });
}
```

## Selection Events

### selectionChanged Event

Triggered when the user's text selection changes within the editor.

**Syntax:**
```typescript
(selectionChanged)="onSelectionChanged($event)"
```

**Event Args:**
```typescript
interface SelectionChangedEventArgs {
  event: Event;  // Native event that triggered the selection change
}
```

**Use Cases:**
- Update formatting toolbar based on selection
- Enable/disable formatting buttons
- Show selection-based options
- Implement find functionality
- Track user selection behavior

**Example:**
```typescript
public onSelectionChanged(args: SelectionChangedEventArgs): void {
  console.log('Selection changed:', args.event.type);
  
  // Get current selection details using getRange() method
  const range = this.blockEditor.getRange();
  
  if (range && !range.collapsed) {
    // Enable formatting buttons when text is selected
    this.enableFormattingButtons();
    
    // Get selected blocks for additional context
    const selectedBlocks = this.blockEditor.getSelectedBlocks();
    console.log(`Selected text in ${selectedBlocks?.length || 0} block(s)`);
    
    // Show selection-based toolbar
    this.showContextualToolbar();
  } else {
    // Disable formatting buttons when no selection
    this.disableFormattingButtons();
    this.hideContextualToolbar();
  }
  
  // Track selection analytics
  this.analytics.trackSelectionChange(args.event);
}
```

**Note:** To get detailed selection information, use the `getRange()` and `getSelectedBlocks()` methods in combination with this event.

## Drag and Drop Events

### blockDragStart Event

Triggered at the beginning of a block drag operation.

**Syntax:**
```typescript
(blockDragStart)="onBlockDragStart($event)"
```

**Event Args:**
```typescript
interface BlockDragEventArgs {
  blocks: BlockModel[];   // Block models being dragged
  cancel: boolean;        // Set to true to cancel the drag action
  dropIndex: number;      // Index where block is intended to be dropped
  event: Event;           // Native event (mouse or drag event)
  fromIndex: number[];    // Index of blocks from which drag started
  target: HTMLElement;    // Target HTML element where block is dragged from
}
```

**Use Cases:**
- Validate if blocks can be dragged
- Cancel drag for read-only blocks
- Show drag indicators
- Track drag start analytics

**Example:**
```typescript
public onBlockDragStart(args: BlockDragEventArgs): void {
  console.log(`Dragging ${args.blocks.length} block(s) from index:`, args.fromIndex);
  
  // Prevent dragging read-only blocks
  const hasReadOnlyBlock = args.blocks.some(b => b.readOnly);
  if (hasReadOnlyBlock) {
    args.cancel = true;
    console.log('Cannot drag read-only blocks');
    return;
  }
  
  // Show drag preview
  this.showDragPreview(args.target);
  
  // Track analytics
  this.analytics.trackEvent('drag_start', { blockCount: args.blocks.length });
}
```

### blockDragging Event

Triggered continuously during a drag operation.

**Syntax:**
```typescript
(blockDragging)="onBlockDragging($event)"
```

**Event Args:**
```typescript
interface BlockDragEventArgs {
  blocks: BlockModel[];   // Block models being dragged
  cancel: boolean;        // Set to true to cancel the drag action
  dropIndex: number;      // Current drop index position
  event: Event;           // Native event (mouse or drag event)
  fromIndex: number[];    // Original index of dragged blocks
  target: HTMLElement;    // Current target HTML element
}
```

**Use Cases:**
- Update drag preview position
- Show drop zone indicators
- Provide visual feedback
- Validate drop target dynamically

**Example:**
```typescript
public onBlockDragging(args: BlockDragEventArgs): void {
  console.log('Drop index:', args.dropIndex);
  
  // Update drop zone indicator
  this.updateDropZoneIndicator(args.dropIndex);
  
  // Prevent dropping in certain areas
  if (this.isRestrictedArea(args.dropIndex)) {
    args.cancel = true;
    this.showRestrictedMessage();
  }
  
  // Update drag preview position based on mouse event
  this.updateDragPreview(args.event as DragEvent);
}
```

### blockDropped Event

Triggered when blocks are successfully dropped at a new location.

**Syntax:**
```typescript
(blockDropped)="onBlockDropped($event)"
```

**Event Args:**
```typescript
interface BlockDropEventArgs {
  blocks: BlockModel[];   // Block models that were dropped
  dropIndex: number;      // Index where drop occurred
  event: Event;           // Native event that triggered the drop
  fromIndex: number[];    // Original index from where blocks were dragged
  target: HTMLElement;    // Target HTML element where block was dropped
}
```

**Use Cases:**
- Confirm block reordering
- Update parent references
- Log changes for analytics
- Trigger validations
- Update UI after drop

**Example:**
```typescript
public onBlockDropped(args: BlockDropEventArgs): void {
  console.log(`Dropped ${args.blocks.length} block(s)`);
  console.log(`From index: ${args.fromIndex} → To index: ${args.dropIndex}`);
  
  // Update block references after reordering
  this.updateBlockReferences();
  
  // Track analytics
  this.analytics.trackEvent('block_dropped', {
    blockCount: args.blocks.length,
    fromIndex: args.fromIndex,
    toIndex: args.dropIndex
  });
  
  // Auto-save after successful drop
  this.autoSave();
  
  // Show success message
  this.showNotification('Blocks reordered successfully');
}
```

## Focus Events

### focus Event

Triggered when the editor gains focus.

**Syntax:**
```typescript
(focus)="onFocus($event)"
```

**Event Args:**
```typescript
interface FocusEventArgs {
  blockId: string;  // Unique identifier of the block that has focus
  event: Event;     // Native event (mouse, keyboard) that triggered the focus
}
```

**Use Cases:**
- Show editing UI for specific block
- Enable keyboard shortcuts
- Update status display with current block info
- Initialize input handling
- Track focus analytics

**Example:**
```typescript
public onFocus(args: FocusEventArgs): void {
  console.log('Editor focused on block:', args.blockId);
  console.log('Focus event type:', args.event.type);
  
  // Show toolbars
  this.showToolbars();
  
  // Enable keyboard shortcuts
  this.enableKeyboardShortcuts();
  
  // Highlight the focused block in outline view
  this.highlightBlockInOutline(args.blockId);
  
  // Update status bar with block information
  const block = this.blockEditor.getBlock(args.blockId);
  this.updateStatusBar(`Editing: ${block?.type || 'Unknown'}`);
  
  // Track focus analytics
  this.analytics.trackEvent('editor_focus', { blockId: args.blockId });
}
```

### blur Event

Triggered when the editor loses focus.

**Syntax:**
```typescript
(blur)="onBlur($event)"
```

**Event Args:**
```typescript
interface BlurEventArgs {
  blockId: string;  // Unique identifier of the block that had focus
  event: Event;     // Native event (mouse, keyboard) that triggered the blur
}
```

**Use Cases:**
- Auto-save content
- Hide editing UI
- Disable temporary features
- Validate content in specific block
- Clean up resources
- Track focus duration

**Example:**
```typescript
public onBlur(args: BlurEventArgs): void {
  console.log('Editor blurred from block:', args.blockId);
  console.log('Blur event type:', args.event.type);
  
  // Auto-save content
  this.autoSaveContent();
  
  // Hide toolbars
  this.hideToolbars();
  
  // Validate content in the block that lost focus
  const block = this.blockEditor.getBlock(args.blockId);
  if (block) {
    this.validateBlock(block);
  }
  
  // Clear status bar
  this.updateStatusBar('');
  
  // Track blur analytics
  this.analytics.trackEvent('editor_blur', { blockId: args.blockId });
}
```

## Paste Events

### beforePasteCleanup Event

Triggered before content is pasted into the editor.

**Syntax:**
```typescript
(beforePasteCleanup)="onBeforePasteCleanup($event)"
```

**Event Args:**
```typescript
interface BeforePasteCleanupEventArgs {
  content: string;  // Content being pasted
  canPaste: boolean;  // Whether to allow paste
  sanitize: boolean;  // Whether to sanitize
}
```

**Use Cases:**
- Validate paste content
- Prevent certain content types
- Pre-process pasted data
- Implement custom sanitization

**Example:**
```typescript
public onBeforePasteCleanup(args: BeforePasteCleanupEventArgs): void {
  // Check content size
  if (args.content.length > 10000) {
    args.canPaste = false;
    alert('Content too large');
  }
  
  // Enable sanitization
  args.sanitize = true;
}
```

### afterPasteCleanup Event

Triggered after content has been successfully pasted.

**Syntax:**
```typescript
(afterPasteCleanup)="onAfterPasteCleanup($event)"
```

**Event Args:**
```typescript
interface AfterPasteCleanupEventArgs {
  content: string;  // Cleaned content
  blocks: BlockModel[];  // Inserted blocks
}
```

**Use Cases:**
- Post-process pasted content
- Update UI after paste
- Notify user of changes
- Trigger validations

**Example:**
```typescript
public onAfterPasteCleanup(args: AfterPasteCleanupEventArgs): void {
  console.log('Pasted', args.blocks.length, 'blocks');
  this.formatNewContent(args.blocks);
  this.analytics.trackPaste();
}
```

## File Upload Events

The Block Editor provides three events for handling image/file uploads when users insert images into the editor.

### beforeFileUpload Event

Triggered before a file upload begins. This event is cancelable and allows validation before upload starts.

**Syntax:**
```typescript
(beforeFileUpload)="onBeforeFileUpload($event)"
```

**Event Args:**
```typescript
interface BeforeUploadEventArgs {
  cancel: boolean;                        // Set to true to prevent the upload
  currentRequest: { [key: string]: string }[];  // XMLHttpRequest instance
  customFormData: { [key: string]: Object }[];  // Additional data for upload request
}
```

**Use Cases:**
- Validate file type and size before upload
- Add authentication headers to upload request
- Add custom metadata to upload
- Prevent uploads based on user permissions
- Show pre-upload confirmation dialog

**Example:**
```typescript
public onBeforeFileUpload(args: BeforeUploadEventArgs): void {
  console.log('File upload starting...');
  
  // Add authentication token
  if (args.customFormData) {
    args.customFormData.push({
      key: 'authToken',
      value: this.authService.getToken()
    });
  }
  
  // Add custom headers
  if (args.currentRequest) {
    args.currentRequest.forEach(req => {
      req['Authorization'] = `Bearer ${this.authService.getToken()}`;
      req['X-Upload-Source'] = 'block-editor';
    });
  }
  
  // Cancel upload if user doesn't have permission
  if (!this.userHasUploadPermission()) {
    args.cancel = true;
    this.showNotification('You do not have permission to upload files', 'error');
  }
}
```

### fileUploading Event

Triggered during the file upload process. Useful for showing progress or modifying the upload request.

**Syntax:**
```typescript
(fileUploading)="onFileUploading($event)"
```

**Event Args:**
```typescript
interface UploadingEventArgs {
  cancel: boolean;                              // Set to true to cancel upload
  chunkSize: number;                            // Chunk size in bytes (if chunking enabled)
  currentChunkIndex: number;                    // Current chunk index (if chunking)
  currentRequest: XMLHttpRequest;               // XMLHttpRequest instance
  customFormData: { [key: string]: Object }[];  // Additional data for upload
  fileData: FileInfo;                           // Details about the file being uploaded
}

interface FileInfo {
  name: string;      // File name
  size: number;      // File size in bytes
  type: string;      // MIME type
  rawFile: File;     // Original File object
  status: string;    // Upload status
  statusCode: string; // HTTP status code
}
```

**Use Cases:**
- Show upload progress
- Add request headers dynamically
- Cancel upload based on conditions
- Track upload metrics
- Handle chunk uploads

**Example:**
```typescript
public onFileUploading(args: UploadingEventArgs): void {
  console.log('Uploading:', args.fileData.name);
  console.log('Size:', args.fileData.size, 'bytes');
  
  // Add authorization header
  if (args.currentRequest) {
    args.currentRequest.setRequestHeader(
      'Authorization', 
      `Bearer ${this.authService.getToken()}`
    );
  }
  
  // Show upload progress
  if (args.chunkSize > 0) {
    const progress = (args.currentChunkIndex / Math.ceil(args.fileData.size / args.chunkSize)) * 100;
    this.updateUploadProgress(progress);
  }
  
  // Cancel upload if file is too large
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (args.fileData.size > maxSize) {
    args.cancel = true;
    this.showNotification('File size exceeds 10MB limit', 'error');
  }
}
```

### fileUploadSuccess Event

Triggered when a file upload completes successfully. Provides the uploaded file URL.

**Syntax:**
```typescript
(fileUploadSuccess)="onFileUploadSuccess($event)"
```

**Event Args:**
```typescript
interface FileUploadSuccessEventArgs {
  chunkIndex: number;           // Upload chunk index
  chunkSize: number;            // Chunk size in bytes
  e: object;                    // Original event arguments
  event: object;                // Original event arguments
  file: FileInfo;               // Details about the uploaded file
  fileUrl: string;              // URL of the uploaded file (IMPORTANT)
  operation: string;            // Upload operation type
  response: ResponseEventArgs;  // Server response
  statusText: string;           // HTTP status text
  totalChunk?: number;          // Total chunks (if chunking)
}
```

**Use Cases:**
- Get uploaded file URL for display
- Update database with file metadata
- Show success notification
- Track upload analytics
- Insert uploaded file into editor

**Example:**
```typescript
public onFileUploadSuccess(args: FileUploadSuccessEventArgs): void {
  console.log('Upload successful!');
  console.log('File URL:', args.fileUrl);
  console.log('File name:', args.file.name);
  console.log('Status:', args.statusText);
  
  // Save file metadata to database
  this.fileService.saveFileMetadata({
    name: args.file.name,
    url: args.fileUrl,
    size: args.file.size,
    uploadedAt: new Date()
  });
  
  // Show success notification
  this.showNotification(`${args.file.name} uploaded successfully`, 'success');
  
  // Track analytics
  this.analytics.trackEvent('file_upload_success', {
    fileName: args.file.name,
    fileSize: args.file.size,
    fileType: args.file.type
  });
  
  // Log server response
  console.log('Server response:', args.response);
}
```

### fileUploadFailed Event

Triggered when a file upload fails or validation errors occur.

**Syntax:**
```typescript
(fileUploadFailed)="onFileUploadFailed($event)"
```

**Event Args:**
```typescript
interface FailureEventArgs {
  chunkIndex: number;           // Upload chunk index
  chunkSize: number;            // Chunk size in bytes
  e: object;                    // Original error event
  event: object;                // Original error event
  file: FileInfo;               // Details about the file
  operation: string;            // Upload operation type
  response: ResponseEventArgs;  // Server error response
  statusText: string;           // HTTP status text
  totalChunk?: number;          // Total chunks (if chunking)
}
```

**Use Cases:**
- Handle upload errors gracefully
- Show error messages to user
- Retry failed uploads
- Log errors for debugging
- Track failed upload analytics

**Example:**
```typescript
public onFileUploadFailed(args: FailureEventArgs): void {
  console.error('Upload failed!');
  console.error('File:', args.file.name);
  console.error('Status:', args.statusText);
  console.error('Error:', args.e);
  
  // Parse error message from server response
  let errorMessage = 'File upload failed';
  if (args.response) {
    try {
      const response = JSON.parse(args.response as any);
      errorMessage = response.message || errorMessage;
    } catch (e) {
      console.error('Could not parse error response');
    }
  }
  
  // Show error notification
  this.showNotification(errorMessage, 'error');
  
  // Offer retry option
  this.showRetryDialog(args.file);
  
  // Track error analytics
  this.analytics.trackEvent('file_upload_failed', {
    fileName: args.file.name,
    statusText: args.statusText,
    errorMessage: errorMessage
  });
  
  // Log to error monitoring service
  this.errorService.logError('File upload failed', {
    file: args.file.name,
    status: args.statusText
  });
}
```

**Complete File Upload Configuration Example:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-editor',
  template: `
    <ejs-blockeditor 
      #blockEditor
      [imageBlockSettings]="imageSettings"
      (beforeFileUpload)="onBeforeFileUpload($event)"
      (fileUploading)="onFileUploading($event)"
      (fileUploadSuccess)="onFileUploadSuccess($event)"
      (fileUploadFailed)="onFileUploadFailed($event)">
    </ejs-blockeditor>
  `
})
export class EditorComponent {
  @ViewChild('blockEditor') blockEditor!: BlockEditorComponent;
  
  public imageSettings = {
    upload: {
      saveUrl: 'https://api.example.com/upload',
      removeUrl: 'https://api.example.com/delete'
    },
    maxFileSize: 5242880, // 5MB
    allowedExtensions: '.jpg,.jpeg,.png,.gif'
  };
  
  // Event handlers shown in examples above
}
```

## Complete Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent } from '@syncfusion/ej2-angular-blockeditor';
import { BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';

@Component({
  imports: [BlockEditorModule],
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;

  public blocksData: BlockModel[] = [
    {
      blockType: 'Heading',
      properties: { level: 1 },
      content: [
        { contentType: ContentType.Text, content: 'Document' }
      ]
    }
  ];

  public onCreated(): void {
    console.log('✓ Editor created and ready');
  }

  public onBlockChanged(args: any): void {
    console.log('Block changed:', args.action);
    this.autoSave();
  }

  public onSelectionChanged(args: any): void {
    console.log('Selection changed');
    this.updateToolbarState();
  }

  public onBlockDragStart(args: any): void {
    console.log('Drag started');
  }

  public onBlockDragging(args: any): void {
    console.log('Dragging...');
  }

  public onBlockDropped(args: any): void {
    console.log('Drop completed');
  }

  public onFocus(): void {
    console.log('Editor focused');
  }

  public onBlur(): void {
    console.log('Editor blurred');
    this.autoSave();
  }

  public onBeforePasteCleanup(args: any): void {
    console.log('Before paste');
  }

  public onAfterPasteCleanup(args: any): void {
    console.log('After paste');
  }

  private autoSave(): void {
    console.log('Auto-saving...');
  }

  private updateToolbarState(): void {
    console.log('Updating toolbar');
  }
}
```

**Template:**
```html
<ejs-blockeditor 
  #blockEditor
  [blocks]="blocksData"
  (created)="onCreated()"
  (blockChanged)="onBlockChanged($event)"
  (selectionChanged)="onSelectionChanged($event)"
  (blockDragStart)="onBlockDragStart($event)"
  (blockDragging)="onBlockDragging($event)"
  (blockDropped)="onBlockDropped($event)"
  (focus)="onFocus()"
  (blur)="onBlur()"
  (beforePasteCleanup)="onBeforePasteCleanup($event)"
  (afterPasteCleanup)="onAfterPasteCleanup($event)">
</ejs-blockeditor>
```

