# Request and Response Parameters Reference

Complete reference documentation for all File Manager request and response parameters across all file operations.

## Table of Contents

- [Overview](#overview)
- [Read Operation](#read-operation)
- [Create Operation](#create-operation)
- [Rename Operation](#rename-operation)
- [Delete Operation](#delete-operation)
- [Details Operation](#details-operation)
- [Search Operation](#search-operation)
- [Copy Operation](#copy-operation)
- [Move Operation](#move-operation)
- [Upload Operation](#upload-operation)
- [Download Operation](#download-operation)
- [GetImage Operation](#getimage-operation)
- [Common Data Structures](#common-data-structures)
- [Error Handling](#error-handling)

---

## Overview

The File Manager communicates with the server through structured request-response contracts. Each file operation follows a consistent pattern:
- **Requests** are sent via POST/GET to configured endpoints
- **Responses** must match expected data structures
- **Errors** follow a standardized error response format

All requests and responses use JSON format by default.

---

## Read Operation

Retrieves file and folder details from a specified path.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"read"` |
| path | string | Yes | Relative path from which data should be read (e.g., `/` or `/Documents`) |
| showHiddenItems | boolean | No | Include hidden files/folders in response (default: false) |
| data | FileManagerDirectoryContent[] | No | Current directory context data |

### Request Example

```json
{
    "action": "read",
    "path": "/",
    "showHiddenItems": false,
    "data": []
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | FileManagerDirectoryContent | Current Working Directory details |
| files | FileManagerDirectoryContent[] | Array of files and folders in the path |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for read operations) |

### Response Example

```json
{
    "cwd": {
        "name": "Download",
        "size": 0,
        "dateModified": "2019-02-28T03:48:19.8319708+00:00",
        "dateCreated": "2019-02-27T17:36:15.812193+00:00",
        "hasChild": false,
        "isFile": false,
        "type": "",
        "filterPath": "\\Download\\"
    },
    "files": [
        {
            "name": "Sample Work Sheet.xlsx",
            "size": 6172,
            "dateModified": "2019-02-27T17:23:50.9651206+00:00",
            "dateCreated": "2019-02-27T17:36:15.8151955+00:00",
            "hasChild": false,
            "isFile": true,
            "type": ".xlsx",
            "filterPath": "\\Download\\"
        },
        {
            "name": "Documents Folder",
            "size": 0,
            "dateModified": "2019-03-01T10:30:00.0000000+00:00",
            "dateCreated": "2019-02-28T09:15:00.0000000+00:00",
            "hasChild": true,
            "isFile": false,
            "type": "",
            "filterPath": "\\Download\\Documents Folder\\"
        }
    ],
    "error": null,
    "details": null
}
```

---

## Create Operation

Creates a new folder in the specified path.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"create"` |
| path | string | Yes | Relative path where folder should be created |
| name | string | Yes | Name of the new folder |
| data | FileManagerDirectoryContent[] | No | Current directory context |

### Request Example

```json
{
    "action": "create",
    "path": "/",
    "name": "NewFolder",
    "data": [
        {
            "dateCreated": "2019-02-27T17:36:15.6571949+00:00",
            "dateModified": "2019-03-12T10:17:31.8505975+00:00",
            "filterPath": "\\",
            "hasChild": true,
            "isFile": false,
            "name": "files",
            "nodeId": "fe_tree",
            "size": 0,
            "type": ""
        }
    ]
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | object | Current working directory (null for create) |
| files | FileManagerDirectoryContent[] | Details of the newly created folder |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for create operations) |

### Response Example

```json
{
    "cwd": null,
    "files": [
        {
            "dateCreated": "2019-03-15T10:25:05.3596171+00:00",
            "dateModified": "2019-03-15T10:25:05.3596171+00:00",
            "filterPath": "\\NewFolder\\",
            "hasChild": false,
            "isFile": false,
            "name": "NewFolder",
            "size": 0,
            "type": ""
        }
    ],
    "error": null,
    "details": null
}
```

---

## Rename Operation

Renames a file or folder.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"rename"` |
| path | string | Yes | Relative path containing the item to rename |
| name | string | Yes | Current name of the item |
| newname | string | Yes | New name for the item |
| data | FileManagerDirectoryContent[] | No | Current item data |

### Request Example

```json
{
    "action": "rename",
    "path": "/Pictures/Nature/",
    "name": "seaviews.jpg",
    "newname": "seaview.jpg",
    "data": [
        {
            "dateCreated": "2019-03-20T05:22:34.621Z",
            "dateModified": "2019-03-20T08:45:56.000Z",
            "filterPath": "\\Pictures\\Nature\\",
            "hasChild": false,
            "iconClass": "e-fe-image",
            "isFile": true,
            "name": "seaviews.jpg",
            "size": 95866,
            "type": ".jpg"
        }
    ]
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | object | Current working directory (null for rename) |
| files | FileManagerDirectoryContent[] | Details of the renamed item |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for rename operations) |

### Response Example

```json
{
    "cwd": null,
    "files": [
        {
            "name": "seaview.jpg",
            "size": 95866,
            "dateModified": "2019-03-20T08:45:56+00:00",
            "dateCreated": "2019-03-20T05:22:34.6214847+00:00",
            "hasChild": false,
            "isFile": true,
            "type": ".jpg",
            "filterPath": "\\Pictures\\Nature\\seaview.jpg"
        }
    ],
    "error": null,
    "details": null
}
```

---

## Delete Operation

Removes files or folders.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"delete"` |
| path | string | Yes | Relative path containing items to delete |
| names | string[] | Yes | Array of file/folder names to delete |
| data | FileManagerDirectoryContent[] | No | Current directory data |

### Request Example

```json
{
    "action": "delete",
    "path": "/Hello/",
    "names": ["OldFolder", "oldfile.txt"],
    "data": []
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | object | Current working directory (null for delete) |
| files | FileManagerDirectoryContent[] | Details of deleted items |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for delete operations) |

### Response Example

```json
{
    "cwd": null,
    "files": [
        {
            "dateCreated": "2019-03-15T10:13:30.346309+00:00",
            "dateModified": "2019-03-15T10:13:30.346309+00:00",
            "filterPath": "\\Hello\\folder",
            "hasChild": true,
            "isFile": false,
            "name": "folder",
            "size": 0,
            "type": ""
        }
    ],
    "error": null,
    "details": null
}
```

---

## Details Operation

Retrieves detailed information about selected items.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"details"` |
| path | string | Yes | Relative path containing items |
| names | string[] | Yes | Array of file/folder names to get details for |
| data | FileManagerDirectoryContent[] | No | Current item data |

### Request Example

```json
{
    "action": "details",
    "path": "/FileContents/",
    "names": ["All Files", "Folder1"],
    "data": []
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | object | Current working directory (null for details) |
| files | object | Files array (null for details operations) |
| error | ErrorDetails | Error object (null if successful) |
| details | DetailsObject | Detailed information about selected items |

### Response Example

```json
{
    "cwd": null,
    "files": null,
    "error": null,
    "details": {
        "name": "All Files",
        "location": "\\Files\\FileContents\\All Files",
        "isFile": false,
        "size": "679.8 KB",
        "created": "3/8/2019 10:18:37 AM",
        "modified": "3/8/2019 10:18:39 AM",
        "multipleFiles": false
    }
}
```

---

## Search Operation

Searches for files/folders matching specified criteria.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"search"` |
| path | string | Yes | Starting path for search |
| searchString | string | Yes | Search term or pattern (supports wildcards: `*`) |
| showHiddenItems | boolean | No | Include hidden items (default: false) |
| caseSensitive | boolean | No | Case-sensitive search (default: false) |
| data | FileManagerDirectoryContent[] | No | Current directory data |

### Request Example

```json
{
    "action": "search",
    "path": "/",
    "searchString": "*nature*",
    "showHiddenItems": false,
    "caseSensitive": false,
    "data": []
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | FileManagerDirectoryContent | Current working directory details |
| files | FileManagerDirectoryContent[] | Search results matching criteria |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for search operations) |

### Response Example

```json
{
    "cwd": {
        "name": "files",
        "size": 0,
        "dateModified": "2019-03-15T10:07:00.8658158+00:00",
        "dateCreated": "2019-02-27T17:36:15.6571949+00:00",
        "hasChild": true,
        "isFile": false,
        "type": "",
        "filterPath": "\\"
    },
    "files": [
        {
            "name": "Nature",
            "size": 0,
            "dateModified": "2019-03-08T10:18:42.9937708+00:00",
            "dateCreated": "2019-03-08T10:18:42.5907729+00:00",
            "hasChild": true,
            "isFile": false,
            "type": "",
            "filterPath": "\\FileContents\\Nature"
        },
        {
            "name": "nature-image.jpg",
            "size": 102400,
            "dateModified": "2019-03-10T14:22:15.0000000+00:00",
            "dateCreated": "2019-03-08T09:30:00.0000000+00:00",
            "hasChild": false,
            "isFile": true,
            "type": ".jpg",
            "filterPath": "\\FileContents\\nature-image.jpg"
        }
    ],
    "error": null,
    "details": null
}
```

---

## Copy Operation

Copies files or folders to a destination path.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"copy"` |
| path | string | Yes | Source path where items are located |
| names | string[] | Yes | Array of items to copy |
| targetPath | string | Yes | Destination path for copied items |
| renameFiles | string[] | No | New names for copied items (if renaming) |
| data | FileManagerDirectoryContent[] | No | Source item data |

### Request Example

```json
{
    "action": "copy",
    "path": "/",
    "names": ["image.png", "document.pdf"],
    "targetPath": "/Archive/",
    "renameFiles": ["image.png", "document.pdf"]
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | object | Current working directory (null for copy) |
| files | FileManagerDirectoryContent[] | Details of copied items |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for copy operations) |

### Response Example

```json
{
    "cwd": null,
    "files": [
        {
            "name": "image.png",
            "size": 49792,
            "previousName": "image.png",
            "dateModified": "2019-06-21T06:58:32+00:00",
            "dateCreated": "2019-06-24T04:22:14.6245618+00:00",
            "hasChild": false,
            "isFile": true,
            "type": ".png",
            "filterPath": "\\Archive\\"
        },
        {
            "name": "document.pdf",
            "size": 204800,
            "previousName": "document.pdf",
            "dateModified": "2019-06-20T10:15:45+00:00",
            "dateCreated": "2019-06-24T04:22:14.6245618+00:00",
            "hasChild": false,
            "isFile": true,
            "type": ".pdf",
            "filterPath": "\\Archive\\"
        }
    ],
    "error": null,
    "details": null
}
```

---

## Move Operation

Moves (cuts and pastes) files or folders to a destination path.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"move"` |
| path | string | Yes | Source path where items are located |
| names | string[] | Yes | Array of items to move |
| targetPath | string | Yes | Destination path for moved items |
| renameFiles | string[] | No | New names for moved items (if renaming) |
| data | FileManagerDirectoryContent[] | No | Source item data |

### Request Example

```json
{
    "action": "move",
    "path": "/Downloads/",
    "names": ["video.mp4"],
    "targetPath": "/Videos/",
    "renameFiles": ["video.mp4"]
}
```

### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| cwd | object | Current working directory (null for move) |
| files | FileManagerDirectoryContent[] | Details of moved items |
| error | ErrorDetails | Error object (null if successful) |
| details | object | Additional details (null for move operations) |

### Response Example

```json
{
    "cwd": null,
    "files": [
        {
            "name": "video.mp4",
            "size": 5242880,
            "previousName": "video.mp4",
            "dateModified": "2019-06-21T06:58:32+00:00",
            "dateCreated": "2019-06-24T04:26:49.2690476+00:00",
            "hasChild": false,
            "isFile": true,
            "type": ".mp4",
            "filterPath": "\\Videos\\"
        }
    ],
    "error": null,
    "details": null
}
```

---

## Upload Operation

Uploads files to the specified path.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"Save"` |
| path | string | Yes | Target path where files should be uploaded |
| uploadFiles | IFormFile[] | Yes | Binary file data being uploaded |
| data | FileManagerDirectoryContent | No | Current directory context |

### Request Example

```
POST /api/FileManager/Upload
Content-Type: multipart/form-data

action=Save
path=/
uploadFiles=<binary-file-data>
data={}
```

### Response

Upload returns an **empty string** `""` on success. The File Manager updates the current folder view after receiving the empty response.

### Error Response Example

```json
{
    "error": {
        "code": "413",
        "message": "File size exceeds maximum allowed size"
    }
}
```

---

## Download Operation

Downloads selected files (multiple files are downloaded as ZIP).

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| action | string | Yes | Value: `"download"` |
| path | string | Yes | Path containing files to download |
| names | string[] | Yes | Array of file names to download |
| data | FileManagerDirectoryContent[] | No | File details |

### Request Example

```json
{
    "action": "download",
    "path": "/",
    "names": ["document.pdf", "image.jpg"],
    "data": []
}
```

### Response

The download response sends the file(s) as a **file stream**:
- **Single file**: Returns file directly with original filename
- **Multiple files**: Returns ZIP archive containing all selected files
- **Folders**: Returns ZIP archive with folder structure preserved

### Response Headers

```
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="document.pdf"
```

---

## GetImage Operation

Retrieves thumbnail images for files.

### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| path | string | Yes | Relative path to image file |

### Request Example

```
GET /api/FileManager/GetImage?path=/Pictures/thumbnail.jpg
```

### Response

Returns the **image file as a stream**:
- MIME type matches file extension (image/jpeg, image/png, etc.)
- Used by File Manager for thumbnail display
- Supports custom image processing before returning

### Response Headers

```
Content-Type: image/jpeg
Content-Length: 49792
```

---

## Common Data Structures

### FileManagerDirectoryContent

Used in request/response to represent a file or folder.

```typescript
interface FileManagerDirectoryContent {
    // Identity
    id?: string | number;                    // Unique identifier
    name: string;                             // File or folder name
    
    // File Properties
    isFile: boolean;                         // true if file, false if folder
    size?: number;                           // File size in bytes
    type?: string;                           // File extension (e.g., ".jpg")
    
    // Hierarchy
    parentId?: string | number;              // Parent folder ID (flat data)
    hasChild?: boolean;                      // Indicates if folder has children
    
    // Dates
    dateCreated?: string;                    // UTC ISO date string
    dateModified?: string;                   // UTC ISO date string
    
    // Paths
    filterPath?: string;                     // Full relative path
    
    // UI Properties
    iconClass?: string;                      // CSS class for icon
    _fm_imageUrl?: string;                   // Thumbnail URL
    _fm_htmlAttr?: object;                   // HTML attributes
    _fm_imageAttr?: object;                  // Image attributes
}
```

### FileData Interface

Used for client-side (`fileSystemData`) binding.

```typescript
interface FileData {
    id?: string | number;
    name: string;
    isFile: boolean;
    size?: number;
    dateModified?: Date;
    dateCreated?: Date;
    type?: string;
    parentId?: string | number;  // For flat data
    children?: FileData[];        // For nested data
    hasChild?: boolean;
    permission?: object;
}
```

### DetailsObject

Detailed information about a file or folder.

```typescript
interface DetailsObject {
    name: string;                    // Item name
    location: string;                // Full path location
    isFile: boolean;                 // File or folder indicator
    size: string;                    // Formatted size (e.g., "679.8 KB")
    created: string;                 // Creation date (formatted)
    modified: string;                // Modification date (formatted)
    multipleFiles: boolean;          // True if details for multiple items
}
```

---

## Error Handling

### Error Response Format

All operations return errors in this standardized format:

```json
{
    "cwd": null,
    "files": null,
    "error": {
        "code": "403",
        "message": "Access denied - insufficient permissions",
        "fileExists": ["document.pdf"]
    },
    "details": null
}
```

### ErrorDetails Interface

```typescript
interface ErrorDetails {
    code: string;                           // HTTP error code
    message: string;                        // Error message
    fileExists?: string[];                  // Duplicate file names
}
```

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| 401 | Unauthorized | Authentication failed or missing |
| 403 | Forbidden | Access denied - insufficient permissions |
| 404 | Not Found | File or folder not found |
| 409 | Conflict | File already exists at destination |
| 413 | Payload Too Large | File exceeds size limit |
| 417 | Expectation Failed | Invalid directory traversal attempt |
| 500 | Server Error | Internal server error |

### Error Handling in Angular

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (failure)='onFailure($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onFailure(args: any) {
    const error = args.error;
    
    switch (error.code) {
      case '401':
        console.error('Authentication required');
        break;
      case '403':
        console.error('Access denied');
        break;
      case '404':
        console.error('File not found');
        break;
      case '409':
        console.error('File already exists');
        break;
      case '413':
        console.error('File too large');
        break;
      default:
        console.error('Operation failed:', error.message);
    }
  }
}
```

---

**Next:** Configure backend implementation at [custom-file-provider.md](custom-file-provider.md) or handle AJAX events at [methods-and-events.md](methods-and-events.md).
