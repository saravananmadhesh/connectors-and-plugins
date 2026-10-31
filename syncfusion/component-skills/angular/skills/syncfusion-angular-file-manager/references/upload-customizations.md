# Upload Customizations in Syncfusion Angular File Manager

## Overview

The FileManager component provides comprehensive upload customization options through the `uploadSettings` property, allowing you to control file size limits, file types, chunk uploads, directory uploads, and sequential uploads.

## Table of Contents
- [Upload Settings Configuration](#upload-settings-configuration)
- [Directory Upload](#directory-upload)
- [Sequential Upload](#sequential-upload)
- [Chunk Upload](#chunk-upload)
- [Auto Upload](#auto-upload)
- [File Size Validation](#file-size-validation)
- [File Type Restrictions](#file-type-restrictions)
- [Upload Events](#upload-events)
- [Practical Examples](#practical-examples)

---

## Upload Settings Configuration

### Upload Settings Interface

```typescript
// uploadSettings property defines upload behavior
uploadSettings: {
  directoryUpload?: boolean;          // Enable folder upload
  sequentialUpload?: boolean;         // Upload files one by one
  chunkSize?: number;                 // Size per chunk in bytes
  autoUpload?: boolean;               // Auto upload on file selection
  minFileSize?: number;               // Minimum file size in bytes
  maxFileSize?: number;               // Maximum file size in bytes
  allowedExtensions?: string[];       // Allowed file extensions
}
```

---

## Directory Upload

### Overview

The `directoryUpload` property enables users to upload entire folders (directories) in addition to individual files.

### Enable Directory Upload

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Enable directory upload
  public uploadSettings = {
    directoryUpload: true
  };
}
```

### Key Points

- When `directoryUpload: true`, entire folder hierarchies can be uploaded
- When `directoryUpload: false`, only individual files can be uploaded
- Cannot upload both files and folders simultaneously in single operation
- Directory structure is preserved on upload

---

## Sequential Upload

### Overview

The `sequentialUpload` property controls whether files are uploaded one after another (sequentially) or all at once (parallel).

### Enable Sequential Upload

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Enable sequential upload
  public uploadSettings = {
    sequentialUpload: true
  };
}
```

### Benefits of Sequential Upload

- Reduces upload traffic
- Prevents server overload with multiple simultaneous uploads
- Easier error handling (one file fails, others continue)
- Better for bandwidth-limited connections
- Predictable upload order

---

## Chunk Upload

### Overview

The `chunkSize` property enables uploading large files in smaller chunks, improving reliability and allowing resume capability.

### Enable Chunk Upload

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Enable chunk upload (512 KB per chunk)
  public uploadSettings = {
    chunkSize: 512 * 1024  // 512 KB
  };
}
```

### Chunk Size Recommendations

| File Size | Recommended Chunk Size |
|-----------|----------------------|
| < 10 MB | 512 KB - 1 MB |
| 10 MB - 100 MB | 1 MB - 5 MB |
| 100 MB - 500 MB | 5 MB - 10 MB |
| > 500 MB | 10 MB - 20 MB |

### Benefits

- Upload large files reliably
- Resume interrupted uploads
- Better progress tracking
- Reduced memory usage
- Automatic retry on chunk failure

---

## Auto Upload

### Overview

The `autoUpload` property determines whether files are automatically uploaded when selected or require explicit upload action.

### Enable Auto Upload

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Auto upload files on selection
  public uploadSettings = {
    autoUpload: true
  };
}
```

### Default Behavior

- When `autoUpload: true`, files upload immediately after selection
- When `autoUpload: false`, users must click upload button
- Default is `true`

### Auto Close Upload Dialog

Control whether the upload dialog automatically closes after successful upload:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Auto close upload dialog after upload completes
  public uploadSettings = {
    autoClose: false  // Set to true to auto-close the upload dialog
  };
}
```

### Default Behavior

- When `autoClose: true`, upload dialog closes automatically after successful upload
- When `autoClose: false`, upload dialog remains open
- Default is `false`

---

## File Size Validation

### Overview

Control minimum and maximum file sizes allowed for upload.

### File Size Configuration

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // File size validation
  public uploadSettings = {
    minFileSize: 1024,              // Minimum 1 KB
    maxFileSize: 100 * 1024 * 1024  // Maximum 100 MB
  };
}
```

### Size Constants

```typescript
const SIZES = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024
};

// Examples
uploadSettings = {
  minFileSize: 1 * SIZES.KB,        // 1 KB minimum
  maxFileSize: 500 * SIZES.MB       // 500 MB maximum
};
```

### Error Handling

```typescript
import { FileSelectEventArgs } from '@syncfusion/ej2-angular-filemanager';

export class AppComponent {
  // Handle upload errors
  public onFileSelect(args: FileSelectEventArgs): void {
    for (let file of args.filesData) {
      if (file.size < 1024) {
        console.log(`File ${file.name} is too small`);
        args.cancel = true;
      }
    }
  }
}
```

---

## File Type Restrictions

### Overview

Control which file types are allowed for upload using `allowedExtensions`.

### Allow Specific File Types

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Allow only images and documents
  public uploadSettings = {
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.txt']
  };
}
```

### Common File Type Configurations

```typescript
// Images only
allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']

// Documents only
allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt']

// Archives only
allowedExtensions: ['.zip', '.rar', '.7z', '.tar', '.gz']

// Media files
allowedExtensions: ['.mp4', '.avi', '.mov', '.mkv', '.mp3', '.wav', '.flac']

// All files (empty array means no restriction)
allowedExtensions: []
```

---

## Upload Events

### BeforeUpload Event

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService, BeforeSendEventArgs } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-root',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  public uploadSettings = {
    autoUpload: true
  };

  // Handle before upload event
  public onBeforeSend(args: BeforeSendEventArgs): void {
    // Add custom headers or data
    if (args.action === 'upload') {
      args.data.push({ name: 'custom', value: 'data' });
      console.log('Uploading:', args);
    }
  }
}
```

### OnSuccess Event

```typescript
import { SuccessEventArgs } from '@syncfusion/ej2-angular-filemanager';

export class AppComponent {
  // Handle upload success
  public onUploadSuccess(args: SuccessEventArgs): void {
    console.log('File uploaded successfully:', args);
    // Refresh file list or show notification
  }
}
```

### OnFailure Event

```typescript
import { FailureEventArgs } from '@syncfusion/ej2-angular-filemanager';

export class AppComponent {
  // Handle upload failure
  public onUploadFailure(args: FailureEventArgs): void {
    console.error('Upload failed:', args);
    // Show error notification
  }
}
```

---

## Practical Examples

### Example 1: Complete Upload Configuration

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService, BeforeSendEventArgs, SuccessEventArgs, FailureEventArgs } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-complete-upload',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [uploadSettings]='uploadSettings'
    (beforeSend)='onBeforeSend($event)'
    (success)='onUploadSuccess($event)'
    (failure)='onUploadFailure($event)'>
  </ejs-filemanager>`
})
export class CompleteUploadComponent {
  public ajaxSettings = {
    url: 'https://your-server.com/api/FileManager/FileOperations',
    uploadUrl: 'https://your-server.com/api/FileManager/Upload',
    downloadUrl: 'https://your-server.com/api/FileManager/Download',
    getImageUrl: 'https://your-server.com/api/FileManager/GetImage'
  };

  // Complete upload settings
  public uploadSettings = {
    directoryUpload: true,                              // Allow folder upload
    sequentialUpload: true,                             // One file at a time
    autoUpload: false,                                  // Manual upload
    chunkSize: 1024 * 1024,                            // 1 MB chunks
    minFileSize: 1024,                                  // 1 KB minimum
    maxFileSize: 500 * 1024 * 1024,                    // 500 MB maximum
    allowedExtensions: ['.jpg', '.png', '.pdf', '.doc', '.docx', '.xls', '.xlsx']
  };

  // Add custom headers before upload
  public onBeforeSend(args: BeforeSendEventArgs): void {
    if (args.action === 'upload') {
      // Add authentication token
      args.data.push({ name: 'token', value: 'auth-token-here' });
    }
  }

  // Handle successful upload
  public onUploadSuccess(args: SuccessEventArgs): void {
    console.log('Upload completed:', args);
    // Refresh file list or show success message
  }

  // Handle upload failure
  public onUploadFailure(args: FailureEventArgs): void {
    console.error('Upload failed:', args);
    // Show error message to user
  }
}
```

### Example 2: Image-Only Upload

```typescript
export class ImageUploadComponent {
  public uploadSettings = {
    directoryUpload: false,
    sequentialUpload: false,
    autoUpload: true,
    maxFileSize: 10 * 1024 * 1024,                     // 10 MB max
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  };
}
```

### Example 3: Document Upload with Chunk Size

```typescript
export class DocumentUploadComponent {
  public uploadSettings = {
    directoryUpload: true,
    sequentialUpload: true,
    autoUpload: false,
    chunkSize: 2 * 1024 * 1024,                        // 2 MB chunks
    maxFileSize: 1024 * 1024 * 1024,                   // 1 GB max
    allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
  };
}
```

---

## Backend Upload Handler

### ASP.NET Core Example

```csharp
[HttpPost("Upload")]
public IActionResult Upload(string path)
{
    try
    {
        var uploadedFile = Request.Form.Files[0];
        
        // Validate file size
        if (uploadedFile.Length > 500 * 1024 * 1024) // 500 MB
        {
            return BadRequest(new { error = "File size exceeds limit" });
        }
        
        // Validate file extension
        var allowedExtensions = new[] { ".jpg", ".png", ".pdf", ".doc", ".docx" };
        var fileExtension = Path.GetExtension(uploadedFile.FileName).ToLower();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest(new { error = "File type not allowed" });
        }
        
        // Save file
        var fileName = Path.GetFileName(uploadedFile.FileName);
        var savePath = Path.Combine(path, fileName);
        
        using (var stream = new FileStream(savePath, FileMode.Create))
        {
            uploadedFile.CopyTo(stream);
        }
        
        return Ok(new { success = true, message = "File uploaded successfully" });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { error = ex.Message });
    }
}
```

---

## Best Practices

1. **Set Realistic Chunk Sizes** - Balance between memory and network performance
2. **Enable Sequential Upload for Large Files** - Reduces server load
3. **Validate on Both Client and Server** - Never trust client-side validation alone
4. **Handle Upload Failures Gracefully** - Show user-friendly error messages
5. **Monitor Upload Progress** - Keep users informed about large uploads
6. **Clean Up Failed Uploads** - Implement temporary file cleanup
7. **Set Reasonable File Size Limits** - Consider server storage capacity
8. **Restrict File Types** - Reduce security vulnerabilities

---

**Related Documentation:**
- [File Operations](file-operations.md)
- [Nested Items Integration](nested-items-integration.md)
- [Authentication and Custom Values](authentication-and-custom-values.md)
