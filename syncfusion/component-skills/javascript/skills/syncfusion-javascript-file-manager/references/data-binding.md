# Data Binding and Providers in Syncfusion TypeScript FileManager

## Table of Contents
- [File System Provider Integration](#file-system-provider-integration)
- [Custom File Provider Implementation](#custom-file-provider-implementation)
- [Flat Data Structure](#flat-data-structure)
- [Nested Data Structure](#nested-data-structure)
- [Server-Side File Operations](#server-side-file-operations)
- [AJAX Settings and Configuration](#ajax-settings-and-configuration)
- [Passing Custom Values to Server](#passing-custom-values-to-server)

## File System Provider Integration

### Connect to Physical File System

The FileManager communicates with a server that provides access to physical files and folders:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        // Primary endpoint for file system operations
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        
        // Endpoint for retrieving image thumbnails
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        
        // Endpoint for file uploads
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        
        // Endpoint for file downloads
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

**Server Response Format:**

The server returns file/folder data in this format:

```json
{
    "cwd": "/Documents/",
    "files": [
        {
            "name": "folder1",
            "size": 0,
            "dateModified": "2024-03-20T10:30:00Z",
            "type": "folder",
            "isFile": false,
            "filterPath": "/Documents/folder1/"
        },
        {
            "name": "document.pdf",
            "size": 1024000,
            "dateModified": "2024-03-15T14:20:00Z",
            "type": "pdf",
            "isFile": true,
            "filterPath": "/Documents/document.pdf"
        }
    ]
}
```

### Supported File System Providers

- **Physical File Service** - Direct file system access
- **Azure Blob Storage** - Cloud storage integration
- **Amazon S3** - AWS cloud storage
- **NodeJS Provider** - Node.js backend implementation
- **Custom Providers** - Build your own provider

## Custom File Provider Implementation

### Create Custom File Provider

Implement a custom provider for non-standard data sources:

```typescript
// Custom file provider that connects to a custom backend
const filemanager = new FileManager({
    ajaxSettings: {
        // Your custom backend endpoint
        url: 'https://your-api.com/v1/files/operations',
        getImageUrl: 'https://your-api.com/v1/files/image',
        uploadUrl: 'https://your-api.com/v1/files/upload',
        downloadUrl: 'https://your-api.com/v1/files/download'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add custom authentication headers
        args.ajaxSettings.headers = {
            'Authorization': `Bearer ${getAuthToken()}`,
            'X-API-Key': 'your-api-key'
        };
    }
});

filemanager.appendTo('#filemanager');

function getAuthToken(): string {
    // Retrieve authentication token
    return localStorage.getItem('authToken') || '';
}
```

### Handle Custom Provider Responses

Process custom response formats:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files/operations'
    },
    height: '380px',
    success: (args) => {
        // Transform custom response to FileManager format
        if (args.response && args.response.data) {
            const customData = args.response.data;
            
            // Map custom properties to FileManager format
            const mappedFiles = customData.items.map((item: any) => ({
                name: item.filename,
                size: item.filesize,
                dateModified: item.lastModified,
                type: item.fileExtension,
                isFile: !item.isDirectory,
                filterPath: item.path
            }));
            
            console.log('Mapped files:', mappedFiles);
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Error Handling for Custom Providers

Handle provider-specific errors:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files/operations'
    },
    height: '380px',
    failure: (args) => {
        console.error('Provider error:', args.error);
        
        // Handle different error types
        if (args.errorCode === 401) {
            console.log('Authentication failed - redirect to login');
            // Redirect to login page
        } else if (args.errorCode === 403) {
            console.log('Access denied');
        } else if (args.errorCode === 404) {
            console.log('Path not found');
        } else if (args.errorCode === 500) {
            console.log('Server error');
        }
    }
});

filemanager.appendTo('#filemanager');
```

## Flat Data Structure

### Using Flat File List

Provide files and folders in a flat list format:

```typescript
// Flat data structure example
const flatFileData = [
    {
        name: 'document1.pdf',
        size: 2048576,
        dateModified: new Date(2024, 2, 15),
        type: 'pdf',
        isFile: true,
        filterPath: '/Documents/document1.pdf'
    },
    {
        name: 'document2.docx',
        size: 1024000,
        dateModified: new Date(2024, 2, 18),
        type: 'docx',
        isFile: true,
        filterPath: '/Documents/document2.docx'
    },
    {
        name: 'Archive',
        size: 0,
        dateModified: new Date(2024, 2, 10),
        type: 'folder',
        isFile: false,
        filterPath: '/Documents/Archive/'
    }
];

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files',
        // Data is provided directly, not fetched from server
        dataSource: flatFileData
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Benefits of Flat Structure

- Simple data format easy to parse
- All data returned in single response
- Suitable for smaller file sets (< 1000 items)
- Easy to implement on client side

### Limitations

- Not efficient for large file hierarchies
- Requires filtering on client side
- More data transferred per request

## Nested Data Structure

### Using Hierarchical File Tree

Organize files and folders in nested structure:

```typescript
// Nested data structure example
const nestedFileData = {
    name: 'root',
    type: 'folder',
    isFile: false,
    children: [
        {
            name: 'Documents',
            type: 'folder',
            isFile: false,
            children: [
                {
                    name: 'Report.pdf',
                    size: 2048576,
                    type: 'pdf',
                    isFile: true
                },
                {
                    name: 'Archive',
                    type: 'folder',
                    isFile: false,
                    children: [
                        {
                            name: 'OldFile.pdf',
                            size: 1024000,
                            type: 'pdf',
                            isFile: true
                        }
                    ]
                }
            ]
        },
        {
            name: 'Pictures',
            type: 'folder',
            isFile: false,
            children: [
                {
                    name: 'photo1.jpg',
                    size: 4096000,
                    type: 'jpg',
                    isFile: true
                }
            ]
        }
    ]
};

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Benefits of Nested Structure

- Efficient for large hierarchies
- Better organization representation
- Supports deep folder nesting
- Natural file system representation

### Lazy Loading with Nested Data

Load nested data on demand:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files',
        // Load children only when folder is opened
        loadOnDemand: true
    },
    height: '380px',
    beforeSend: (args) => {
        if (args.action === 'read') {
            // Server loads only immediate children of folder
            args.data.depth = 1;
        }
    }
});

filemanager.appendTo('#filemanager');
```

## Server-Side File Operations

### Request Format for Operations

FileManager sends requests to server with action and data:

```typescript
// Example: Create folder
{
    "action": "create",
    "path": "/Documents/",
    "name": "NewFolder"
}

// Example: Delete item
{
    "action": "delete",
    "path": "/Documents/",
    "names": ["file.pdf", "folder"]
}

// Example: Rename item
{
    "action": "rename",
    "path": "/Documents/",
    "name": "old-name.pdf",
    "newName": "new-name.pdf"
}

// Example: Search
{
    "action": "search",
    "path": "/",
    "searchString": "report"
}

// Example: Copy
{
    "action": "copy",
    "path": "/Source/",
    "names": ["file.pdf"],
    "targetPath": "/Destination/"
}
```

### Server Response Format

Server returns success/error response:

```typescript
// Success response
{
    "success": true,
    "name": "NewFolder",
    "path": "/Documents/NewFolder/"
}

// Error response
{
    "success": false,
    "error": "Permission denied",
    "errorCode": 403
}

// File list response (for read operations)
{
    "cwd": "/Documents/",
    "files": [
        {
            "name": "file1.pdf",
            "size": 1024000,
            "dateModified": "2024-03-20T10:30:00Z",
            "type": "pdf",
            "isFile": true,
            "filterPath": "/Documents/file1.pdf"
        }
    ]
}
```

## AJAX Settings and Configuration

### Basic AJAX Configuration

Configure all server communication endpoints:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        // Main operations endpoint
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        
        // Image retrieval endpoint
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        
        // Upload endpoint
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        
        // Download endpoint
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Add Custom Headers

Include authentication and metadata headers:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add custom headers to all requests
        args.ajaxSettings.headers = {
            'Authorization': `Bearer ${getToken()}`,
            'X-Custom-Header': 'value',
            'X-Request-ID': generateRequestId()
        };
    }
});

filemanager.appendTo('#filemanager');

function getToken(): string {
    return localStorage.getItem('token') || '';
}

function generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

### Handle CORS Issues

Configure CORS settings if accessing cross-domain:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    height: '380px',
    beforeSend: (args) => {
        // CORS headers (handled by browser, but can be configured on server)
        args.ajaxSettings.headers = {
            'Access-Control-Allow-Credentials': 'true'
        };
    }
});

filemanager.appendTo('#filemanager');
```

## Passing Custom Values to Server

### Send User Context Data

Include user information with each request:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add custom data to request
        if (args.data) {
            args.data.userId = getCurrentUserId();
            args.data.department = getCurrentDepartment();
            args.data.permissions = getUserPermissions();
        }
    }
});

filemanager.appendTo('#filemanager');

function getCurrentUserId(): string {
    return localStorage.getItem('userId') || 'unknown';
}

function getCurrentDepartment(): string {
    return localStorage.getItem('dept') || 'general';
}

function getUserPermissions(): string[] {
    return ['read', 'write', 'delete'];
}
```

### Pass Filter and Search Criteria

Send custom parameters for filtering:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    beforeSend: (args) => {
        if (args.action === 'search') {
            // Add custom search parameters
            args.data.searchScope = 'all';
            args.data.maxResults = 100;
            args.data.includeDeleted = false;
        }
        
        if (args.action === 'read') {
            // Add filter parameters
            args.data.fileTypeFilter = ['pdf', 'docx'];
            args.data.maxFileSize = 100000000;  // 100 MB
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Custom Request Data

Include metadata in file operations:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add metadata to upload operations
        if (args.action === 'upload') {
            args.customData = {
                projectId: 'proj-123',
                version: '1.0',
                tags: ['important', 'archived']
            };
        }
    }
});

filemanager.appendTo('#filemanager');
```

## Complete Data Binding Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add authentication and custom data
        args.ajaxSettings.headers = {
            'Authorization': `Bearer ${getToken()}`
        };
        
        if (args.data) {
            args.data.userId = getCurrentUser().id;
            args.data.department = getCurrentUser().department;
        }
    },
    success: (args) => {
        console.log('Operation successful:', args.details);
    },
    failure: (args) => {
        console.error('Operation failed:', args.error);
    }
});

filemanager.appendTo('#filemanager');

function getToken(): string {
    return localStorage.getItem('authToken') || '';
}

function getCurrentUser(): { id: string; department: string } {
    return {
        id: 'user-123',
        department: 'Engineering'
    };
}
```
