# Attachments and File Handling

## Table of Contents
- [Enable File Attachments](#enable-file-attachments)
- [Attachment Settings](#attachment-settings)
- [File Type Restrictions](#file-type-restrictions)
- [File Size Configuration](#file-size-configuration)
- [Save Format Options](#save-format-options)
- [Drag and Drop](#drag-and-drop)
- [Upload Events](#upload-events)
- [Preview and Attachment Templates](#preview-and-attachment-templates)

## Enable File Attachments

### Basic File Attachment Setup

Enable file attachment support:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, FileAttachmentSettingsModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings">
      <e-messages>
        <e-message text="Welcome to Chat!" [author]="botUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public botUserModel: UserModel = { user: 'Bot', id: 'bot' };
  
  public enableAttachments: boolean = true;
  
  public attachmentSettings: FileAttachmentSettingsModel = {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  };
}
```

**Key Requirements:**
- `enableAttachments: true` - Enables file picker
- `saveUrl` - Server endpoint to handle file uploads
- `removeUrl` - Server endpoint to handle file deletion

## Attachment Settings

### Core Settings Configuration

```typescript
public attachmentSettings: FileAttachmentSettingsModel = {
  // Upload endpoints
  saveUrl: 'https://your-domain.com/api/files/upload',
  removeUrl: 'https://your-domain.com/api/files/delete',
  
  // File restrictions
  allowedFileTypes: '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.png,.gif',
  
  // Size limits
  maxFileSize: 5 * 1024 * 1024,  // 5MB
  maximumCount: 5,                // Max 5 files per message
  
  // Upload format
  saveFormat: 'Base64'  // or 'Blob'
};
```

## File Type Restrictions

### Allowed File Types

Restrict uploads to specific file extensions:

```typescript
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  
  // Allow documents only
  allowedFileTypes: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'
};

// Images only
allowedFileTypes: '.jpg,.jpeg,.png,.gif,.bmp,.webp'

// Audio files
allowedFileTypes: '.mp3,.wav,.flac,.m4a'

// Videos
allowedFileTypes: '.mp4,.webm,.mov,.avi'

// All files (no restriction)
allowedFileTypes: ''
```

### MIME Type Restrictions

Use MIME types for more specific control:

```typescript
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  
  // MIME types (browser-level, not enforced server-side)
  allowedFileTypes: 'image/jpeg,image/png,application/pdf'
};
```

## File Size Configuration

### Maximum File Size

Set maximum file size in bytes:

```typescript
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  
  // 5MB limit
  maxFileSize: 5 * 1024 * 1024,
  
  // 10MB limit
  maxFileSize: 10 * 1024 * 1024,
  
  // 1MB limit
  maxFileSize: 1024 * 1024
};
```

**Default:** 30MB (30,000,000 bytes)

### File Size Validation Example

```typescript
public onBeforeAttachmentUpload = (args: UploadingEventArgs) => {
  const file = args.filesData[0];
  
  // Check file size
  if (file.size > 5 * 1024 * 1024) {
    args.cancel = true;
    alert('File size exceeds 5MB limit');
  }
  
  // Check file type
  const allowedTypes = ['pdf', 'doc', 'docx'];
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(extension!)) {
    args.cancel = true;
    alert('File type not allowed');
  }
};
```

## Save Format Options

### SaveFormat Enum

The `saveFormat` property accepts two enum values that determine how file data is serialized:

```typescript
import { SaveFormat } from '@syncfusion/ej2-interactive-chat';

enum SaveFormat {
  Blob = 'Blob',      // Binary file format (default)
  Base64 = 'Base64'   // Base64-encoded string format
}
```

### Blob Format (Default)

Default format for efficient binary handling:

```typescript
import { SaveFormat } from '@syncfusion/ej2-interactive-chat';

attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  saveFormat: SaveFormat.Blob  // or simply 'Blob'
};
```

**Advantages:**
- ✅ Efficient for large files (no Base64 overhead)
- ✅ Native browser support for FormData uploads
- ✅ Better performance and memory usage
- ✅ Suitable for streaming and chunked uploads

**Use cases:**
- Direct binary upload to cloud storage (AWS S3, Azure Blob)
- File previews with `URL.createObjectURL()`
- Local storage with IndexedDB
- RESTful API multipart/form-data uploads

### Base64 Format

Encode files as Base64 strings:

```typescript
import { SaveFormat } from '@syncfusion/ej2-interactive-chat';

attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  saveFormat: SaveFormat.Base64  // or simply 'Base64'
};
```

**Advantages:**
- ✅ Embeddable in JSON payloads
- ✅ Easy to store in relational databases (TEXT column)
- ✅ Direct display in <img> src attribute
- ✅ Compatible with older APIs expecting string data

**Disadvantages:**
- ⚠️ File size increases by ~33% due to encoding
- ⚠️ Higher memory consumption
- ⚠️ Slower for large files

**Use cases:**
- Embedding images in JSON API responses
- Storing small files in SQL databases
- Displaying images without server storage: `<img src="data:image/png;base64,...">`
- GraphQL APIs (typically use Base64 for binary data)

**Choosing Between Blob and Base64:**

```typescript
// ✅ Use Blob for:
// - Files > 1MB
// - Production file upload systems
// - Cloud storage integration
// - Performance-critical applications
saveFormat: 'Blob'

// ✅ Use Base64 for:
// - Small images (< 100KB, like avatars)
// - JSON-only APIs
// - Database-embedded files
// - Backward compatibility
saveFormat: 'Base64'
```

**Example: Base64 for Small Avatars, Blob for Documents**

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings"
         (beforeAttachmentUpload)="onBeforeUpload($event)">
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  public attachmentSettings: FileAttachmentSettingsModel = {
    saveUrl: 'https://your-api.com/upload',
    removeUrl: 'https://your-api.com/remove',
    saveFormat: 'Blob',  // Default to Blob
    maxFileSize: 10485760  // 10MB
  };
  
  // Dynamic format selection based on file type/size
  onBeforeUpload(args: any) {
    const file = args.filesData[0];
    const isSmallImage = file.type.startsWith('image/') && file.size < 102400; // < 100KB
    
    if (isSmallImage) {
      // Use Base64 for small images (avatars, icons)
      this.attachmentSettings.saveFormat = SaveFormat.Base64;
    } else {
      // Use Blob for documents and large files
      this.attachmentSettings.saveFormat = SaveFormat.Blob;
    }
  }
}
```

## Drag and Drop

### Enable Drag-and-Drop

Allow users to drag files to the chat:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings">
      <e-messages>
        <!-- Drag files here to upload -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  public attachmentSettings: FileAttachmentSettingsModel = {
    saveUrl: 'https://your-api.com/upload',
    removeUrl: 'https://your-api.com/remove',
    enableDragAndDrop: true  // Enable drag-and-drop
  };
}
```

**Default:** `true` - Drag-and-drop enabled by default

## Attachment Click Event

### Handle Attachment Clicks

Use the `attachmentClick` event to handle clicks on attachment items:

```typescript
import { Component } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, FileAttachmentSettingsModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings">
      <e-messages>
        <e-message 
          text="Check out this document" 
          [author]="michaleUserModel"
          [attachedFile]="documentFile">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  
  public attachmentSettings: FileAttachmentSettingsModel = {
    saveUrl: 'https://your-api.com/upload',
    removeUrl: 'https://your-api.com/remove',
    attachmentClick: this.onAttachmentClick
  };
  
  public documentFile: any = {
    name: 'project-plan.pdf',
    size: 2048000,
    type: 'application/pdf',
    url: 'https://example.com/files/project-plan.pdf'
  };
  
  private onAttachmentClick = (args: any) => {
    const { file, isBeforeSend } = args;
    
    console.log('Attachment clicked:', file.name);
    console.log('Before send:', isBeforeSend);
    
    if (isBeforeSend) {
      // Attachment clicked before sending (in footer preview)
      this.showAttachmentPreview(file);
    } else {
      // Attachment clicked in sent message
      this.downloadOrPreviewAttachment(file);
    }
  };
  
  private showAttachmentPreview = (file: any) => {
    // Show preview modal for attachment about to be sent
    console.log('Showing preview for:', file.name);
    // Implement preview logic
  };
  
  private downloadOrPreviewAttachment = (file: any) => {
    // Download or preview sent attachment
    if (file.type.includes('image')) {
      this.previewImage(file);
    } else if (file.type.includes('pdf')) {
      this.previewPDF(file);
    } else {
      this.downloadFile(file);
    }
  };
  
  private previewImage = (file: any) => {
    window.open(file.url, '_blank');
  };
  
  private previewPDF = (file: any) => {
    window.open(file.url, '_blank');
  };
  
  private downloadFile = (file: any) => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name;
    link.click();
  };
}
```

### Attachment Click Use Cases

**1. Image Preview Modal**

```typescript
private onAttachmentClick = (args: any) => {
  const { file } = args;
  
  if (file.type.startsWith('image/')) {
    this.openImagePreviewModal(file);
  }
};

private openImagePreviewModal = (file: any) => {
  this.selectedImage = file.url;
  this.showImageModal = true;
};
```

**2. Download with Progress Tracking**

```typescript
private onAttachmentClick = async (args: any) => {
  const { file } = args;
  
  this.downloadProgress = 0;
  this.isDownloading = true;
  
  try {
    await this.downloadWithProgress(file.url, file.name);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed');
  } finally {
    this.isDownloading = false;
  }
};
```

**3. File Metadata Display**

```typescript
private onAttachmentClick = (args: any) => {
  const { file } = args;
  
  this.showFileMetadata({
    name: file.name,
    size: this.formatFileSize(file.size),
    type: file.type,
    uploadedBy: file.uploadedBy,
    uploadDate: file.uploadDate
  });
};
```

## Pre-Populated Message Attachments

### Display Messages with Existing Attachments

Use the `attachedFile` property to show messages with pre-existing file attachments:

```typescript
import { Component } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings">
      <e-messages>
        <e-message 
          text="Here's the project proposal" 
          [author]="michaleUserModel"
          [attachedFile]="proposalFile">
        </e-message>
        
        <e-message 
          text="And here are the design mockups" 
          [author]="michaleUserModel"
          [attachedFile]="mockupFiles">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  
  public attachmentSettings: any = {
    saveUrl: 'https://your-api.com/upload',
    removeUrl: 'https://your-api.com/remove'
  };
  
  // Single file attachment
  public proposalFile: any = {
    name: 'project-proposal.pdf',
    size: 2048000,
    type: 'application/pdf',
    url: 'https://example.com/files/proposal.pdf'
  };
  
  // Multiple file attachments
  public mockupFiles: any[] = [
    {
      name: 'homepage-mockup.png',
      size: 1024000,
      type: 'image/png',
      url: 'https://example.com/files/homepage.png'
    },
    {
      name: 'dashboard-mockup.png',
      size: 1536000,
      type: 'image/png',
      url: 'https://example.com/files/dashboard.png'
    }
  ];
}
```

### Load Conversation History with Attachments

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { MessageModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         #chatui_instance
         [user]="currentUserModel"
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings">
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public attachmentSettings: any = {
    saveUrl: 'https://your-api.com/upload',
    removeUrl: 'https://your-api.com/remove'
  };
  
  async ngOnInit() {
    // Load message history from server
    await this.loadMessageHistory();
  }
  
  private loadMessageHistory = async () => {
    try {
      const response = await fetch('https://your-api.com/messages/history');
      const historyData = await response.json();
      
      // Add each message with attachments
      historyData.messages.forEach((msg: any) => {
        const message: MessageModel = {
          text: msg.text,
          author: msg.author,
          timeStamp: new Date(msg.timestamp),
          attachedFile: msg.attachments  // Include file attachments
        };
        
        this.chatUIInstance.addMessage(message);
      });
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };
}
```

### FileInfo Interface Structure

```typescript
interface FileInfo {
  name: string;        // File name
  size: number;        // File size in bytes
  type: string;        // MIME type (e.g., 'image/png', 'application/pdf')
  url?: string;        // URL to access the file
  rawFile?: File;      // Raw File object (for uploads)
  statusCode?: number; // Upload status code
}
```

**Example with complete FileInfo:**

```typescript
public attachedFile: FileInfo = {
  name: 'annual-report.pdf',
  size: 5242880,  // 5MB in bytes
  type: 'application/pdf',
  url: 'https://cdn.example.com/files/annual-report.pdf',
  statusCode: 200
};
```

## Path Property Configuration

### Configure Custom Storage Path

Use the `path` property to specify a custom storage path for attachments:

```typescript
public attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  path: 'https://cdn.example.com/chat-attachments/'  // Custom CDN path
};
```

**Priority:** If both `path` and `saveFormat` are configured, the `path` property takes priority.

### Use Cases for Path Property

**1. CDN Storage**

```typescript
// Store and serve files from CDN
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  path: 'https://cdn.yourdomain.com/uploads/'
};
```

**2. User-Specific Paths**

```typescript
// Organize files by user
const userId = this.currentUserModel.id;
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  path: `https://storage.example.com/users/${userId}/attachments/`
};
```

**3. Date-Based Organization**

```typescript
// Organize by date
const today = new Date();
const datePath = `${today.getFullYear()}/${today.getMonth() + 1}`;
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  path: `https://storage.example.com/chat/${datePath}/`
};
```

## Upload Events

### Before Upload Event

Fired before file upload begins:

```typescript
import { UploadingEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings"
         (beforeAttachmentUpload)="onBeforeAttachmentUpload($event)">
      <e-messages></e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public attachmentSettings: FileAttachmentSettingsModel = {
    saveUrl: 'https://your-api.com/upload',
    removeUrl: 'https://your-api.com/remove'
  };
  
  public onBeforeAttachmentUpload = (args: UploadingEventArgs) => {
    const file = args.filesData[0];
    console.log('Uploading:', file.name);
    
    // Validate file
    if (!this.isValidFile(file)) {
      args.cancel = true;
      alert('Invalid file');
    }
  };
  
  private isValidFile = (file: any): boolean => {
    // Custom validation logic
    return file.size < 5 * 1024 * 1024;
  };
}
```

### Upload Success Event

Fired when upload completes successfully:

```typescript
import { SuccessEventArgs } from '@syncfusion/ej2-angular-inputs';

public onAttachmentUploadSuccess = (args: SuccessEventArgs) => {
  console.log('Upload successful:', args);
  // Handle successful upload
  this.showNotification('File uploaded successfully');
};
```

### Upload Failure Event

Fired when upload fails:

```typescript
import { FailureEventArgs } from '@syncfusion/ej2-angular-inputs';

public onAttachmentUploadFailure = (args: FailureEventArgs) => {
  console.error('Upload failed:', args.error);
  this.showNotification('Upload failed: ' + args.error);
};
```

### Attachment Removed Event

Fired when user removes an attachment:

```typescript
import { RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';

public onAttachmentRemoved = (args: RemovingEventArgs) => {
  console.log('Removed:', args);
  this.showNotification('File removed');
};
```

## Preview and Attachment Templates

### File Preview Template

Customize file preview before upload:

```typescript
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  previewTemplate: (file: any) => {
    return `
      <div class="file-preview">
        <span class="file-icon">📄</span>
        <span class="file-name">${file.name}</span>
        <span class="file-size">${(file.size / 1024).toFixed(2)} KB</span>
      </div>
    `;
  }
};
```

### Attachment Display Template

Customize how attachments appear in messages:

```typescript
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  attachmentTemplate: (attachment: any) => {
    const isImage = /image/.test(attachment.type);
    return `
      <div class="attachment">
        ${isImage ? `<img src="${attachment.url}" alt="image">` : 
          `<a href="${attachment.url}" target="_blank">${attachment.name}</a>`}
      </div>
    `;
  }
};
```

## Maximum File Count

### Restrict Number of Files

Limit simultaneous file uploads:

```typescript
attachmentSettings: FileAttachmentSettingsModel = {
  saveUrl: 'https://your-api.com/upload',
  removeUrl: 'https://your-api.com/remove',
  maximumCount: 5  // Max 5 files at once
};
```

**Default:** 10 files

## Complete Attachment Example

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableAttachments]="true"
         [attachmentSettings]="attachmentSettings"
         (beforeAttachmentUpload)="onBeforeAttachmentUpload($event)"
         (attachmentUploadSuccess)="onAttachmentUploadSuccess($event)"
         (attachmentUploadFailure)="onAttachmentUploadFailure($event)"
         (attachmentRemoved)="onAttachmentRemoved($event)">
      <e-messages></e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  public attachmentSettings: FileAttachmentSettingsModel = {
    saveUrl: 'https://your-api.com/api/files/upload',
    removeUrl: 'https://your-api.com/api/files/delete',
    allowedFileTypes: '.pdf,.doc,.docx,.jpg,.png',
    maxFileSize: 5 * 1024 * 1024,  // 5MB
    maximumCount: 3,
    saveFormat: 'Base64',
    enableDragAndDrop: true
  };
  
  public onBeforeAttachmentUpload = (args: any) => {
    console.log('Starting upload:', args.filesData[0].name);
  };
  
  public onAttachmentUploadSuccess = (args: any) => {
    console.log('Upload success:', args);
  };
  
  public onAttachmentUploadFailure = (args: any) => {
    console.error('Upload failed:', args.error);
  };
  
  public onAttachmentRemoved = (args: any) => {
    console.log('Attachment removed:', args);
  };
}
```

---
