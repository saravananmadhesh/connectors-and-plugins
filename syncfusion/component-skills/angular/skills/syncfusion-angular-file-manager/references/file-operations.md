# File Operations in Syncfusion Angular File Manager

## Table of Contents
- [Overview of File Operations](#overview-of-file-operations)
- [Core Operations](#core-operations)
- [Implementation Patterns](#implementation-patterns)
- [Server Integration](#server-integration)
- [Custom File Providers](#custom-file-providers)
- [Directory Upload](#directory-upload)
- [Error Handling](#error-handling)
- [Ajax Events](#ajax-events)

## Overview of File Operations

The File Manager component provides a complete set of file operations for managing files and folders. All operations communicate with a server backend through configured AJAX endpoints or can be handled programmatically through events.

### Supported Operations

| Operation | Function | Backend Endpoint |
|-----------|----------|------------------|
| **read** | Retrieves files and folders from a path | /FileOperations |
| **create** | Creates a new folder | /FileOperations |
| **delete** | Removes files or folders | /FileOperations |
| **rename** | Renames a file or folder | /FileOperations |
| **upload** | Uploads files to directory | /Upload |
| **download** | Downloads files (ZIP for multiple) | /Download |
| **copy** | Copies files or folders | /FileOperations |
| **move** | Moves files or folders | /FileOperations |
| **search** | Searches files by criteria | /FileOperations |
| **details** | Gets detailed file information | /FileOperations |

> **Note:** File operations are routed through dedicated endpoints:
> - **Main Operations:** `/FileOperations` handles read, create, delete, rename, copy, move, search, and details
> - **Upload:** `/Upload` endpoint is required for file upload operations
> - **Download:** `/Download` endpoint is required for file download operations  
> - **Images:** `/GetImage` endpoint is for thumbnail/image retrieval (optional, uses `/FileOperations` if not specified)

## Core Operations

### Read (Browse Files)

Reading is automatically triggered when navigating folders. To programmatically refresh file list:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent } from '@syncfusion/ej2-angular-filemanager';

@Component({
  template: `<ejs-filemanager #fileManager [ajaxSettings]='ajaxSettings'></ejs-filemanager>
             <button (click)='refresh()'>Refresh</button>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public refresh() {
    // Refresh the current folder's contents
    this.fileManager?.refresh();
  }
}
```

### Create (New Folder)

Users create folders via toolbar button. To create programmatically:

```typescript
// Users click "New Folder" in toolbar or right-click context menu
// Server creates folder at current path
// File Manager UI automatically updates

// No direct API - use toolbar or event handlers
```

### Delete (Remove Files/Folders)

Files are deleted via toolbar, context menu, or keyboard (Delete key):

```typescript
@Component({
  template: `<button (click)='deleteSelected()'>Delete Selected</button>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public deleteSelected() {
    const selected = this.fileManager?.selectedItems || [];
    // Server removes selected items
    // UI updates automatically after server response
  }
}
```

### Rename (Rename File/Folder)

Rename via toolbar, context menu, or double-click inline edit:

```typescript
// Right-click on file → Select "Rename" → Edit name → Press Enter
// Or: Toolbar Rename button → Edit → Enter

// No direct API needed - UI handles this
```

### Upload Files

Upload via toolbar button or drag-and-drop:

```typescript
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload'  // Required for uploads
  };

  public uploadSettings = {
    minFileSize: 1000,           // Minimum file size in bytes
    maxFileSize: 52428800,       // Maximum 50MB
    autoUpload: true,            // Upload on selection
    allowedExtensions: ['.txt', '.pdf', '.doc']  // Optional filter
  };
}
```

### Download Files

Download via toolbar button or context menu:

```typescript
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    downloadUrl: '/api/FileManager/Download'  // Required for downloads
  };
  
  // Users select files and click Download button
  // Multiple files downloaded as ZIP
  // Single files downloaded directly
}
```

### Copy and Move

Copy/move via toolbar buttons or context menu:

```typescript
// 1. Right-click file → Select "Cut" or "Copy"
// 2. Navigate to destination folder
// 3. Right-click → Select "Paste"
// 4. Server handles copy/move operation
// 5. UI updates automatically

// No direct API - UI-driven workflow
```

## Implementation Patterns

### Pattern 1: Standard Server Integration

Configure all endpoints for full file operations support:

```typescript
@Component({
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [uploadSettings]='uploadSettings'
    (success)='onSuccess($event)'
    (failure)='onFailure($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download',
    getImageUrl: '/api/FileManager/GetImage'
  };

  public uploadSettings = {
    autoUpload: true,
    minFileSize: 0,
    maxFileSize: 104857600  // 100MB
  };

  onSuccess(args: any) {
    console.log('Operation successful:', args);
  }

  onFailure(args: any) {
    console.log('Operation failed:', args);
  }
}
```

### Pattern 2: Custom Value Passing to Server

Pass additional data with file operation requests:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onBeforeSend(args: any) {
    // Add custom headers or data
    args.ajaxSettings.beforeSend = function (requestArgs: any) {
      // Add authentication token
      requestArgs.httpRequest.setRequestHeader('Authorization', 'Bearer token123');
      
      // Add custom parameters
      const data = JSON.parse(requestArgs.data);
      data.userId = '12345';
      requestArgs.data = JSON.stringify(data);
    };
  }
}
```

## Server Integration

### Request/Response Format

The File Manager sends structured requests and expects structured responses:

**Request Structure:**
```json
{
  "action": "read",
  "path": "/Documents",
  "showHiddenItems": false
}
```

**Response Structure (for read action):**
```json
[
  {
    "name": "Report.pdf",
    "isFile": true,
    "size": 204800,
    "dateModified": "2024-01-15T10:30:00Z",
    "hasChild": false,
    "type": "application/pdf"
  },
  {
    "name": "Folder",
    "isFile": false,
    "size": 0,
    "dateModified": "2024-01-15T10:30:00Z",
    "hasChild": true,
    "type": null
  }
]
```

### Backend Controller Example (ASP.NET Core)

```csharp
[ApiController]
[Route("api/[controller]")]
public class FileManagerController : ControllerBase
{
    [HttpPost("FileOperations")]
    public IActionResult FileOperations(string path, string action, IList<IFormFile>? uploadFiles = null)
    {
        try
        {
            // Handle different actions
            switch (action.ToLower())
            {
                case "read":
                    // Return files and folders at path
                    return Ok(GetDirectoryContents(path));
                    
                case "create":
                    // Create new folder
                    return Ok(CreateFolder(path));
                    
                case "delete":
                    // Delete files
                    return Ok(DeleteItems(path));
                    
                default:
                    return BadRequest("Invalid action");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost("Upload")]
    public IActionResult Upload(string path, IList<IFormFile> uploadFiles)
    {
        // Handle file uploads
        // Return upload status
        return Ok();
    }

    [HttpGet("Download")]
    public IActionResult Download(string path, string names)
    {
        // Download files or ZIP multiple files
        return File(fileStream, "application/octet-stream", fileName);
    }
}
```

## Custom File Providers

### Using Custom File Providers

The File Manager can integrate with cloud storage providers:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  // Use custom service provider endpoints
  // Example: Google Drive, Amazon S3, Azure Blob Storage
  
  public ajaxSettings = {
    url: '/api/CloudProvider/FileOperations',
    uploadUrl: '/api/CloudProvider/Upload',
    downloadUrl: '/api/CloudProvider/Download'
  };

  onBeforeSend(args: any) {
    // Add provider-specific authentication
    args.ajaxSettings.beforeSend = function (requestArgs: any) {
      requestArgs.httpRequest.setRequestHeader('X-Provider-Key', 'your-api-key');
    };
  }
}
```

## Directory Upload

### Enable Folder Upload

Allow users to upload entire folders:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [uploadSettings]='uploadSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload'
  };

  public uploadSettings = {
    directoryUpload: true  // Enable folder upload
  };
}
```

### Server-Side Directory Upload Handling

```csharp
[HttpPost("Upload")]
public IActionResult Upload(string path, IList<IFormFile> uploadFiles, string action)
{
    foreach (var file in uploadFiles)
    {
        var folders = file.FileName.Split('/');
        
        // Handle folder structure in file path
        if (folders.Length > 1)
        {
            for (var i = 0; i < folders.Length - 1; i++)
            {
                string newDirectoryPath = Path.Combine(basePath + path, folders[i]);
                
                // Security check - prevent directory traversal
                if (Path.GetFullPath(newDirectoryPath) != 
                    (Path.GetDirectoryName(newDirectoryPath) + 
                     Path.DirectorySeparatorChar + folders[i]))
                {
                    throw new UnauthorizedAccessException("Access denied");
                }
                
                // Create folder if not exists
                if (!Directory.Exists(newDirectoryPath))
                {
                    Directory.CreateDirectory(newDirectoryPath);
                }
                
                path += folders[i] + "/";
            }
        }
    }
    
    return Ok();
}
```

## Error Handling

### Handling Operation Failures

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (failure)='onFailure($event)'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onFailure(args: any) {
    const error = args.error;
    
    // Handle different error scenarios
    if (error.status === 401) {
      console.log('Authentication failed');
    } else if (error.status === 403) {
      console.log('Permission denied');
    } else if (error.status === 404) {
      console.log('File not found');
    } else if (error.status === 413) {
      console.log('File too large');
    } else {
      console.log('Operation failed:', error.message);
    }
    
    // Show error to user
    alert('Operation failed: ' + error.message);
  }

  onBeforeSend(args: any) {
    // Validate before sending
    args.ajaxSettings.beforeSend = function (requestArgs: any) {
      const data = JSON.parse(requestArgs.data);
      
      // Example: Validate file size before upload
      if (data.action === 'upload') {
        // Validation logic
      }
    };
  }
}
```

## Ajax Events

### Available Events

- **beforeSend**: Triggered before sending request to server
- **success**: Triggered when server operation succeeds
- **failure**: Triggered when server operation fails
- **beforeUpload**: Triggered before file upload begins
- **beforeDownload**: Triggered before file download begins
- **beforeImageLoad**: Triggered before image thumbnail is loaded (used for customizing image URLs)

### Event Implementation Example

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'
    (success)='onSuccess($event)'
    (failure)='onFailure($event)'
    (beforeUpload)='onBeforeUpload($event)'
    (beforeImageLoad)='beforeImageLoad($event)'
    (beforeDownload)='beforeDownload($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download',
    getImageUrl: '/api/FileManager/GetImage'
  };

  onBeforeSend(args: any) {
    console.log('Sending request for action:', args.action);
    args.ajaxSettings.beforeSend = (requestArgs: any) => {
      // Modify request before sending
      requestArgs.httpRequest.setRequestHeader('X-Custom-Header', 'value');
    };
  }

  onSuccess(args: any) {
    console.log('Operation succeeded:', args.action);
    // Update UI, refresh data, etc.
  }

  onFailure(args: any) {
    console.error('Operation failed:', args.error);
    // Handle error, show notification
  }

  onBeforeUpload(args: any) {
    console.log('Upload starting for:', args.fileDetails.name);
    // Validate file before upload
  }

  beforeImageLoad(args: any) {
    // Customize image URL before loading thumbnail
    args.imageUrl = args.imageUrl + '&customParam=value';
  }

  beforeDownload(args: any) {
    // Add custom data before download
    args.data.customField = 'customValue';
  }
}
```

---

**Next:** Configure views at [views-and-layout.md](views-and-layout.md) or handle file movement at [drag-and-drop.md](drag-and-drop.md).
