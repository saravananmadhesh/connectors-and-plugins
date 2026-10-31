# File Operations in Syncfusion TypeScript FileManager

## Table of Contents
- [Core File Operations](#core-file-operations)
- [Upload Functionality](#upload-functionality)
- [Download Operations](#download-operations)
- [Copy and Move Operations](#copy-and-move-operations)
- [Delete and Rename](#delete-and-rename)
- [Directory Upload Support](#directory-upload-support)
- [Error Handling](#error-handling)

## Core File Operations

The FileManager supports essential file operations through server communication. Each operation follows a standard request/response format:

| Operation | Function | HTTP Method | Response |
|-----------|----------|-------------|----------|
| **read** | Read folder contents and file details | POST | File/folder list with metadata |
| **create** | Create new folder | POST | Success/error confirmation |
| **delete** | Remove file or folder | POST | Deletion confirmation |
| **rename** | Rename file or folder | POST | Rename confirmation |
| **search** | Search for items in directory | POST | Search results |
| **details** | Get detailed info for selected items | POST | Detailed file/folder info |
| **copy** | Copy selected files/folders | POST | Copy operation confirmation |
| **move** | Move (cut) selected files/folders | POST | Move operation confirmation |

### Server Request Format

Standard operations send POST requests with this format:

```typescript
// Example: Read folder contents
{
    "action": "read",
    "path": "/Documents/",
    "showHiddenItems": false
}

// Example: Create new folder
{
    "action": "create",
    "path": "/Documents/",
    "name": "NewFolder"
}

// Example: Delete item
{
    "action": "delete",
    "path": "/Documents/",
    "names": ["file.txt", "folder"]
}
```

## Upload Functionality

### Basic Upload Configuration

Configure upload settings in the FileManager initialization:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    uploadSettings: {
        maxFileSize: 10000000,  // 10 MB
        minFileSize: 1024       // 1 KB
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Upload Events

Track upload progress and handle completion:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    height: '380px',
    uploading: (args) => {
        // Triggered when upload starts
        console.log('Upload started:', args.fileData);
        console.log('File name:', args.fileData.name);
        console.log('File size:', args.fileData.size);
    },
    uploadSuccess: (args) => {
        // Triggered when upload completes successfully
        console.log('Upload completed:', args.fileData);
        console.log('Response:', args.response);
    },
    uploadFailed: (args) => {
        // Triggered when upload fails
        console.error('Upload failed:', args.error);
        console.error('Status code:', args.statusCode);
    }
});

filemanager.appendTo('#filemanager');
```

### Sequential Upload

Enable sequential file uploads (one file at a time):

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    uploadSettings: {
        maxFileSize: 10000000,
        sequentialUpload: true  // Upload files one by one
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Chunk Upload

Enable chunked uploads for large files:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    uploadSettings: {
        maxFileSize: 100000000,  // 100 MB
        chunkSize: 5000000,      // 5 MB chunks
        autoRetryCount: 3        // Retry failed chunks 3 times
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Auto-Upload and Auto-Close

Configure automatic upload behavior:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    uploadSettings: {
        autoUpload: true,        // Automatically upload when file is selected
        autoClose: true          // Close upload dialog after successful upload
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Download Operations

### Basic Download

Download files through the FileManager interface:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
// Users can download by selecting files and clicking the download toolbar button
```

### Multiple File Download

Multiple files are automatically compressed into a ZIP archive:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    allowMultiSelection: true,
    height: '380px'
});

filemanager.appendTo('#filemanager');
// Users can select multiple files and download as ZIP
```

## Copy and Move Operations

### Copy Files or Folders

Copy selected items to a new location:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        file: ['Copy', 'Paste'],
        folder: ['Copy', 'Paste']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Programmatic copy operation
const copyOperation = {
    action: 'copy',
    path: '/Source/',
    names: ['file.txt', 'folder'],
    targetPath: '/Destination/'
};
```

### Move (Cut) Files or Folders

Move items to a different location:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        file: ['Cut', 'Paste'],
        folder: ['Cut', 'Paste']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Programmatic move operation
const moveOperation = {
    action: 'move',
    path: '/Source/',
    names: ['file.txt', 'folder'],
    targetPath: '/Destination/'
};
```

## Delete and Rename

### Delete Files or Folders

Remove items from the file system:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        file: ['Delete'],
        folder: ['Delete']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Rename Files or Folders

Change the name of files or folders:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        file: ['Rename'],
        folder: ['Rename']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Rename operation details sent to server
const renameOperation = {
    action: 'rename',
    path: '/Documents/',
    name: 'old-name.txt',
    newName: 'new-name.txt'
};
```

## Directory Upload Support

### Enable Folder Upload

Allow users to upload entire folders:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    uploadSettings: {
        directoryUpload: true  // Enable folder upload
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Toggle Between Folder and File Upload

Dynamically switch between folder and file upload modes:

```typescript
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Create dropdown to toggle upload mode
const items: ItemModel[] = [{ text: 'Folder' }, { text: 'Files' }];
const drpDownBtn = new DropDownButton({
    items: items,
    select: (args) => {
        if (args.item.text === 'Folder') {
            filemanager.uploadSettings.directoryUpload = true;
        } else {
            filemanager.uploadSettings.directoryUpload = false;
        }
        // Trigger upload dialog
        setTimeout(function () {
            const uploadBtn = document.querySelector('.e-file-select-wrap button') as HTMLElement;
            uploadBtn.click();
        }, 100);
    }
}, '#uploadMode');
```

**Supported Providers:**
- Physical file service provider
- Azure file service provider
- NodeJS file service provider
- Amazon file service provider

## Error Handling

### Failure Event

Track operation failures:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    failure: (args) => {
        console.error('Operation failed');
        console.error('Error code:', args.errorCode);
        console.error('Error message:', args.error);
        console.error('Status code:', args.statusCode);
    }
});

filemanager.appendTo('#filemanager');
```

### BeforeSend Event

Modify request before sending to server:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add custom headers or modify request
        args.ajaxSettings.headers = {
            'Authorization': 'Bearer your-token'
        };
    }
});

filemanager.appendTo('#filemanager');
```

### Handling Download Failures

Handle download errors gracefully:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    beforeDownload: (args) => {
        console.log('Download starting:', args.fileDetails);
    },
    failure: (args) => {
        if (args.errorCode === 'DOWNLOAD_ERROR') {
            console.error('Download failed for:', args.fileDetails);
        }
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Complete File Operations Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    uploadSettings: {
        maxFileSize: 10000000,
        autoUpload: true,
        autoClose: true
    },
    contextMenuSettings: {
        file: ['Copy', 'Cut', 'Delete', 'Rename', '|', 'Download', '|', 'Details'],
        folder: ['Copy', 'Cut', 'Delete', 'Rename', 'Paste', '|', 'Details'],
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'Details', '|', 'SelectAll']
    },
    height: '380px',
    uploading: (args) => {
        console.log('Uploading:', args.fileData.name);
    },
    uploadSuccess: (args) => {
        console.log('Upload success:', args.fileData.name);
    },
    uploadFailed: (args) => {
        console.error('Upload failed:', args.error);
    },
    failure: (args) => {
        console.error('Operation error:', args.error);
    }
});

filemanager.appendTo('#filemanager');
```
