# File Attachments Configuration

## Table of Contents
- [Overview](#overview)
- [Enable File Attachments](#enable-file-attachments)
- [Attachment Settings Configuration](#attachment-settings-configuration)
- [FileAttachmentSettingsModel Interface](#fileattachmentsettingsmodel-interface)
- [Upload Configuration](#upload-configuration)
- [File Restrictions](#file-restrictions)
- [Attachment Templates](#attachment-templates)
- [Attachment Events](#attachment-events)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

---

## Overview

The Chat UI control supports message attachments, enabling users to upload and send files (images, documents, and more) alongside messages for richer, more contextual conversations. File attachment functionality is configured through the `enableAttachments` property and customized via `attachmentSettings`.

**Key Features**:
- Upload files to server endpoints
- Restrict file types and sizes
- Drag-and-drop support
- Custom preview and display templates
- Comprehensive event handling
- Multiple file uploads

---

## Enable File Attachments

### enableAttachments Property

Enable file attachment support by setting the `enableAttachments` property to `true`.

**Property**: `enableAttachments: boolean`  
**Default**: `false`

### Basic Example

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true
});

// Render initialized Chat UI.
chatUI.appendTo('#enableAttachments');
```

When enabled:
- An attachment button appears in the footer
- Users can click to browse files or drag-and-drop
- Selected files are uploaded to the configured server
- Attachments display in message bubbles

---

## Attachment Settings Configuration

### attachmentSettings Property

Use the `attachmentSettings` property to configure file attachment behavior, including upload endpoints, file restrictions, and templates.

**Property**: `attachmentSettings: FileAttachmentSettingsModel`

---

## FileAttachmentSettingsModel Interface

Complete interface definition:

```typescript
interface FileAttachmentSettingsModel {
    // Upload endpoints
    saveUrl?: string;
    removeUrl?: string;
    path?: string;
    
    // File format
    saveFormat?: 'Blob' | 'Base64';
    
    // File restrictions
    allowedFileTypes?: string;
    maxFileSize?: number;
    maximumCount?: number;
    
    // User interaction
    enableDragAndDrop?: boolean;
    
    // Templates
    attachmentTemplate?: string | Function;
    previewTemplate?: string | Function;
}
```

---

## Upload Configuration

### saveUrl and removeUrl

Set server endpoints for handling file uploads and removals.

**Properties**:
- `saveUrl: string` - Endpoint for file upload processing
- `removeUrl: string` - Endpoint for file deletion requests

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    }
});

chatUI.appendTo('#saveRemoveUrl');
```

### Server Requirements

**Save Endpoint**:
- Receives: Multipart form data with file
- Returns: File metadata (name, size, path)
- HTTP Method: POST

**Remove Endpoint**:
- Receives: File name or identifier
- Returns: Success/failure status
- HTTP Method: POST

### path Property

Specify the public base URL where uploaded files are hosted. This overrides `saveFormat`.

**Property**: `path: string`

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        path: 'D:/CustomPathLocation'
    }
});
```

When `path` is set:
- File URLs are constructed using this base path
- Overrides `saveFormat` configuration
- Used for generating download links

### saveFormat Property

Control the format used to send files to the server when `path` is not set.

**Property**: `saveFormat: 'Blob' | 'Base64'`  
**Default**: `'Blob'`

**Options**:
- `Blob`: Fast, memory-efficient format for local previews
- `Base64`: Inline data URL format, useful for embedding files

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        saveFormat: 'Base64'
    }
});
```

**When to Use**:
- **Blob**: Default choice, best performance
- **Base64**: When you need inline data URLs or working with APIs that require Base64

---

## File Restrictions

### allowedFileTypes Property

Specify which file types users can upload using file extensions or MIME types.

**Property**: `allowedFileTypes: string`  
**Format**: Comma-separated extensions or MIME types

```typescript
// Allow only PDF files
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: '.pdf'
    }
});
```

### Common File Type Patterns

**Images**:
```typescript
allowedFileTypes: '.jpg,.jpeg,.png,.gif,.bmp,.webp'
// or
allowedFileTypes: 'image/*'
```

**Documents**:
```typescript
allowedFileTypes: '.pdf,.doc,.docx,.txt,.rtf'
```

**Spreadsheets**:
```typescript
allowedFileTypes: '.xls,.xlsx,.csv'
```

**Multiple Types**:
```typescript
allowedFileTypes: '.pdf,.doc,.docx,.jpg,.png'
```

**MIME Types**:
```typescript
allowedFileTypes: 'application/pdf,image/*'
```

### maxFileSize Property

Define the maximum file size allowed for uploads in bytes.

**Property**: `maxFileSize: number`  
**Default**: `30000000` (30 MB)

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        maxFileSize: 40000000  // 40 MB
    }
});
```

### Size Reference

| Size | Bytes |
|------|-------|
| 1 KB | 1,024 |
| 1 MB | 1,048,576 |
| 5 MB | 5,242,880 |
| 10 MB | 10,485,760 |
| 25 MB | 26,214,400 |
| 50 MB | 52,428,800 |
| 100 MB | 104,857,600 |

### maximumCount Property

Restrict how many files can be attached at once.

**Property**: `maximumCount: number`  
**Default**: `10`

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        maximumCount: 2  // Allow only 2 files per message
    }
});
```

Behavior:
- If users select more files than allowed, an error is displayed
- "Maximum count reached" message appears
- Upload is prevented until count is within limit

### enableDragAndDrop Property

Toggle drag-and-drop support for file attachments.

**Property**: `enableDragAndDrop: boolean`  
**Default**: `true`

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        enableDragAndDrop: true
    }
});
```

When enabled:
- Users can drag files from desktop
- Drop zone highlights on drag-over
- Multiple files can be dropped at once

---

## Attachment Templates

### previewTemplate Property

Customize the preview UI for files before they're sent. This template appears in the upload area prior to sending the message.

**Property**: `previewTemplate: string | Function`

**Template Context**:
- `selectedFile`: File object with properties (name, size, type, fileSource)

### attachmentTemplate Property

Control how attachments appear inside message bubbles after sending.

**Property**: `attachmentTemplate: string | Function`

**Template Context**:
- `selectedFile`: File object with properties (name, size, type, fileSource)

### Template Example

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

// Helper functions
function getMime(file: any): string {
    return ((file?.rawFile?.type) || file?.type || '').toLowerCase();
}

function getType(file: any): string {
    const t = getMime(file);
    if (!t) return '';
    const parts = t.split('/');
    return parts.length > 1 ? parts[1].toUpperCase() : t.toUpperCase();
}

function getExt(file: any): string {
    const name = file?.name || '';
    const parts = name.split('.');
    return parts.length > 1 ? parts.pop()?.toUpperCase() || '' : '';
}

function isImage(file: any): boolean {
    return getMime(file).startsWith('image/');
}

function isVideo(file: any): boolean {
    return getMime(file).startsWith('video/');
}

function getHumanSize(file: any): string {
    const sizeBytes = file?.size || 0;
    if (sizeBytes < 1024) return sizeBytes + ' B';
    if (sizeBytes < 1024 * 1024) return (sizeBytes / 1024).toFixed(1) + ' KB';
    return (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Attachment template - displays in message bubble
function attachmentTemplate(context: any): string {
    const file = context?.selectedFile || context;
    const isImg = isImage(file);
    const isVid = isVideo(file);
    
    const iconHtml = isImg
        ? `<img class="c-attach-img" src="${file.fileSource || ''}" alt="${file.name || ''}">`
        : isVid
        ? '<span class="e-icons e-video"></span>'
        : '<span class="e-icons e-chat-file-icon"></span>';
    
    const typeText = file?.type || file?.rawFile?.type || '';

    return `
        <div class="c-attach">
            <div class="c-attach-thumb">${iconHtml}</div>
            <div class="c-attach-body">
                <div class="c-attach-name" title="${file.name || ''}">${file.name || ''}</div>
                <div class="c-attach-meta">${typeText}</div>
            </div>
        </div>
    `;
}

// Preview template - displays before sending
function previewTemplate(context: any): string {
    const file = context.selectedFile || context;
    const badge = getExt(file) || getType(file) || 'FILE';
    const size = getHumanSize(file);
    
    const mediaHtml = isImage(file)
        ? `<img class="c-media-img" src="${file.fileSource || ''}" alt="${file.name || ''}">`
        : isVideo(file)
        ? `<video class="c-media-video" controls disablePictureInPicture playsInline preload="metadata" title="${file.name || ''}">
            <source src="${file.fileSource || ''}" type="${getMime(file)}">
        </video>`
        : '<div>No media content to display</div>';

    return `
        <div>
            <div class="c-preview--card">
                <div class="c-preview-card">
                    <div class="c-badge-row">
                        <span class="c-badge">${badge}</span>
                        <span>${size}</span>
                    </div>
                    <div class="c-media-frame">${mediaHtml}</div>
                    <div class="c-caption">
                        <span class="c-name" title="${file.name || ''}">${file.name || ''}</span>
                        <a class="c-btn-link" href="${file.fileSource || '#'}" target="_blank" rel="noopener noreferrer" download="${file.name || ''}">Download</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    cssClass: 'chat-attachment-template',
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        attachmentTemplate: attachmentTemplate,
        previewTemplate: previewTemplate
    }
});

chatUI.appendTo('#template');
```

---

## Attachment Events

The Chat UI provides comprehensive events for handling attachment lifecycle.

### Event List

| Event | Description | Event Args |
|-------|-------------|------------|
| `attachmentClick` | Triggered when user clicks an attachment | `ChatAttachmentClickEventArgs` |
| `beforeAttachmentUpload` | Triggered before file upload starts | `BeforeUploadEventArgs` |
| `attachmentUploadSuccess` | Triggered when upload succeeds | `SuccessEventArgs` |
| `attachmentUploadFailure` | Triggered when upload fails | `FailureEventArgs` |
| `attachmentRemoved` | Triggered when attachment is removed | `RemovingEventArgs` |

### attachmentClick Event

Triggered when a user clicks on an attachment in a message.

```typescript
import { ChatUI, ChatAttachmentClickEventArgs } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentClick: (args: ChatAttachmentClickEventArgs) => {
        console.log('Attachment clicked:', args.file);
        // Open in new window, preview, or download
        window.open(args.file.fileSource, '_blank');
    }
});
```

**ChatAttachmentClickEventArgs**:
```typescript
interface ChatAttachmentClickEventArgs {
    cancel: boolean;       // Set true to prevent default action
    event: Event;          // Native click event
    file: FileInfo;        // Clicked file information
    name: string;          // Event name
}
```

### beforeAttachmentUpload Event

Triggered before a file upload begins. Use this to validate files or add custom headers.

```typescript
import { ChatUI, BeforeUploadEventArgs } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    beforeAttachmentUpload: (args: BeforeUploadEventArgs) => {
        console.log('Uploading file:', args.filesData[0].name);
        
        // Add custom headers
        args.customHeaders = {
            'Authorization': 'Bearer your-token-here',
            'X-User-ID': 'user123'
        };
        
        // Cancel upload conditionally
        if (args.filesData[0].size > 10485760) {  // 10 MB
            args.cancel = true;
            console.error('File too large!');
        }
    }
});
```

**BeforeUploadEventArgs**:
```typescript
interface BeforeUploadEventArgs {
    cancel: boolean;                 // Set true to cancel upload
    customHeaders: { [key: string]: string };  // Custom HTTP headers
    filesData: FileInfo[];           // Files being uploaded
}
```

### attachmentUploadSuccess Event

Triggered when a file upload completes successfully.

```typescript
import { ChatUI, SuccessEventArgs } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentUploadSuccess: (args: SuccessEventArgs) => {
        console.log('Upload successful:', args.file.name);
        console.log('Server response:', args.response);
        
        // Show success notification
        alert(`${args.file.name} uploaded successfully!`);
    }
});
```

**SuccessEventArgs**:
```typescript
interface SuccessEventArgs {
    file: FileInfo;        // Uploaded file information
    response: any;         // Server response
    statusText: string;    // HTTP status text
}
```

### attachmentUploadFailure Event

Triggered when a file upload fails.

```typescript
import { ChatUI, FailureEventArgs } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentUploadFailure: (args: FailureEventArgs) => {
        console.error('Upload failed:', args.file.name);
        console.error('Error:', args.response);
        
        // Show error notification
        alert(`Failed to upload ${args.file.name}: ${args.statusText}`);
    }
});
```

**FailureEventArgs**:
```typescript
interface FailureEventArgs {
    file: FileInfo;        // Failed file information
    response: any;         // Server error response
    statusText: string;    // HTTP status text
}
```

### attachmentRemoved Event

Triggered when an attachment is removed from the preview area (before sending).

```typescript
import { ChatUI, RemovingEventArgs } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentRemoved: (args: RemovingEventArgs) => {
        console.log('File removed:', args.filesData[0].name);
        
        // Clean up resources
        // Notify server if needed
    }
});
```

**RemovingEventArgs**:
```typescript
interface RemovingEventArgs {
    cancel: boolean;           // Set true to prevent removal
    filesData: FileInfo[];     // Removed files
}
```

---

## Complete Examples

### Example 1: Image Attachments Only

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: 'image/*',
        maxFileSize: 5242880,  // 5 MB
        maximumCount: 5,
        enableDragAndDrop: true
    },
    uploadSuccess: (args) => {
        console.log(`Image ${args.file.name} uploaded successfully`);
    },
    uploadFailure: (args) => {
        console.error(`Failed to upload ${args.file.name}`);
    }
});

chatUI.appendTo('#imageChat');
```

### Example 2: Document Attachments with Validation

```typescript
import { ChatUI, UserModel, BeforeAttachmentUploadEventArgs } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: '.pdf,.doc,.docx,.txt',
        maxFileSize: 10485760,  // 10 MB
        maximumCount: 3
    },
    beforeAttachmentUpload: (args: BeforeAttachmentUploadEventArgs) => {
        // Add authentication
        args.customHeaders = {
            'Authorization': 'Bearer token123',
            'X-User-ID': currentUserModel.id
        };
        
        // Additional validation
        const file = args.filesData[0];
        if (file.name.includes('confidential')) {
            args.cancel = true;
            alert('Cannot upload confidential files');
        }
    },
    uploadSuccess: (args) => {
        console.log(`Document uploaded: ${args.file.name}`);
    }
});

chatUI.appendTo('#documentChat');
```

### Example 3: Full Configuration with All Events

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: '.pdf,.doc,.docx,.jpg,.png,.gif',
        maxFileSize: 25 * 1024 * 1024,  // 25 MB
        maximumCount: 10,
        enableDragAndDrop: true,
        saveFormat: 'Blob'
    },
    
    // All attachment events
    attachmentClick: (args) => {
        console.log('Clicked:', args.file.name);
        // Custom preview or download
    },
    
    beforeAttachmentUpload: (args) => {
        console.log('Starting upload:', args.filesData.length, 'files');
        args.customHeaders = {
            'Authorization': 'Bearer token',
            'X-Session-ID': 'session123'
        };
    },
    
    uploadSuccess: (args) => {
        console.log('✓ Uploaded:', args.file.name);
        // Update UI, send notification, etc.
    },
    
    uploadFailure: (args) => {
        console.error('✗ Failed:', args.file.name, args.statusText);
        // Show error message, retry option
    },
    
    removed: (args) => {
        console.log('Removed:', args.filesData[0].name);
        // Clean up, notify server
    }
});

chatUI.appendTo('#fullChat');
```

---

## Best Practices

### Security

1. **Validate on server**: Always validate file types and sizes server-side
2. **Scan for malware**: Implement virus scanning for uploaded files
3. **Sanitize filenames**: Remove special characters and path traversal attempts
4. **Use HTTPS**: Always use secure connections for file uploads
5. **Implement authentication**: Require valid tokens in `beforeAttachmentUpload`

### Performance

1. **Set reasonable limits**: Balance usability with server capacity
   ```typescript
   maxFileSize: 10485760,  // 10 MB is reasonable for most use cases
   maximumCount: 5          // Limit simultaneous uploads
   ```

2. **Use appropriate format**: Choose `Blob` for better performance
   ```typescript
   saveFormat: 'Blob'  // Faster than Base64
   ```

3. **Optimize images**: Consider resizing images client-side before upload

4. **Implement progress indicators**: Show upload progress for large files

### User Experience

1. **Provide clear feedback**: Use all events to inform users
   ```typescript
   uploadSuccess: (args) => {
       alert(`${args.file.name} uploaded successfully!`);
   },
   uploadFailure: (args) => {
       alert(`Failed to upload: ${args.statusText}`);
   }
   ```

2. **Set appropriate restrictions**: Match user expectations
   ```typescript
   // For image sharing
   allowedFileTypes: 'image/*',
   maxFileSize: 5242880  // 5 MB
   
   // For document sharing
   allowedFileTypes: '.pdf,.doc,.docx',
   maxFileSize: 10485760  // 10 MB
   ```

3. **Enable drag-and-drop**: Improves convenience
   ```typescript
   enableDragAndDrop: true
   ```

4. **Show previews**: Use templates to display file information clearly

### Error Handling

1. **Handle network errors**: Implement retry logic
2. **Validate before upload**: Check file types client-side
3. **Show meaningful errors**: Explain why upload failed
4. **Provide alternatives**: Offer retry or different upload methods

### Accessibility

1. **Keyboard support**: Ensure attachment button is keyboard-accessible
2. **Screen reader support**: Add appropriate ARIA labels
3. **Visual indicators**: Show clear upload status
4. **Error announcements**: Use ARIA live regions for status updates
