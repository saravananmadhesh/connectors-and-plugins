# Advanced Configuration in Syncfusion TypeScript FileManager

## Table of Contents
- [Custom File Providers](#custom-file-providers)
- [Nested and Flat Data Structures](#nested-and-flat-data-structures)
- [Custom Sorting](#custom-sorting)
- [Passing Custom Values to Server](#passing-custom-values-to-server)
- [Upload Restrictions](#upload-restrictions)
- [Access Control and Permissions](#access-control-and-permissions)
- [Component State Persistence](#component-state-persistence)
- [FileManager in Dialog/Tab Components](#filemanager-in-dialogtab-components)

## Custom File Providers

### Implement Custom File Provider

Create a custom provider for non-standard data sources:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/v1/files/operations',
        getImageUrl: 'https://your-api.com/v1/files/image',
        uploadUrl: 'https://your-api.com/v1/files/upload',
        downloadUrl: 'https://your-api.com/v1/files/download'
    },
    height: '380px',
    beforeSend: (args: BeforeSendEventArgs) => {
        // Add authentication headers
        args.ajaxSettings.headers = {
            'Authorization': `Bearer ${getAuthToken()}`,
            'X-Custom-Header': 'value'
        };
    },
    success: (args: any) => {
        console.log('Custom provider response:', args.details);
    },
    failure: (args: any) => {
        console.error('Provider error:', args.error);
    }
});

filemanager.appendTo('#filemanager');

function getAuthToken(): string {
    return localStorage.getItem('token') || '';
}
```

### Server Endpoints Required

Your backend must implement these endpoints for file operations:

```typescript
// POST /api/fileManager/FileOperations
// Handles: read, create, rename, delete, copy, move, details, search
// Request includes 'action' parameter to determine operation
// Response must include FileManagerDirectoryContent array

// GET /api/fileManager/GetImage
// Returns image for thumbnail display
// Query params: path (file path)

// POST /api/fileManager/Download
// Returns file for download as stream
// Request body contains file paths

// POST /api/fileManager/Upload
// Handles file upload to server
// Multipart form data with file content
```

### FileManagerDirectoryContent Interface

Your response objects must match this structure:

```typescript
interface FileManagerDirectoryContent {
    name: string;                    // File/folder name
    size: number;                    // Size in bytes
    dateModified: Date;              // Last modified date
    dateCreated: Date;               // Created date
    hasChild: boolean;               // Has child folders (for nested)
    isFile: boolean;                 // true for files, false for folders
    type: string;                    // File type/extension
    filterPath: string;              // Full path from root
    permission?: AccessRules;        // Optional access permissions
}

interface AccessRules {
    Copy: boolean;
    Read: boolean;
    Write: boolean;
    WriteContents: boolean;
    Download: boolean;
    Upload: boolean;
    Path: string;
    Role?: string;
    IsFile?: boolean;
}
```

### Azure Blob Storage Integration

Connect FileManager to Azure Blob Storage:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-azure-function.azurewebsites.net/api/blob/operations',
        getImageUrl: 'https://your-azure-function.azurewebsites.net/api/blob/image',
        uploadUrl: 'https://your-azure-function.azurewebsites.net/api/blob/upload',
        downloadUrl: 'https://your-azure-function.azurewebsites.net/api/blob/download'
    },
    height: '380px',
    beforeSend: (args: BeforeSendEventArgs) => {
        // Add Azure authentication
        if (args.data) {
            args.data.container = 'files';  // Blob container name
            args.data.sasToken = getSasToken();
        }
    }
});

filemanager.appendTo('#filemanager');

function getSasToken(): string {
    // Retrieve SAS token from your backend
    return localStorage.getItem('azureSasToken') || '';
}
```

## Nested and Flat Data Structures

### Using Nested Data Structure

Organize files hierarchically:

```typescript
interface FileData {
    dateCreated?: Date;           // File/folder creation date
    dateModified?: Date;          // Last modified date
    filterPath: string;           // Full path from root
    hasChild?: boolean;           // Has child folders (for nested)
    id: string;                   // Unique identifier
    isFile: boolean;              // true for files, false for folders
    name: string;                 // File/folder name
    parentId?: string | null;     // Parent folder ID (null for root)
    size?: number;                // Size in bytes
    type?: string;                // File type/extension
    children?: FileData[];        // Child items (for nested structure)
}

const nestedData: FileData[] = [
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
        filterPath: "",
        hasChild: true,
        id: '0',
        isFile: false,
        name: "Files",
        parentId: null,
        size: 1779448,
        type: "folder",
        children: [
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
                filterPath: "Files/",
                hasChild: true,
                id: '1',
                isFile: false,
                name: "Documents",
                parentId: "0",
                size: 524288,
                type: "folder",
                children: [
                    {
                        dateCreated: new Date("2023-12-01T10:30:00.0000000+05:30"),
                        dateModified: new Date("2024-01-05T14:22:15.5555555+05:30"),
                        filterPath: "Files/Documents/",
                        hasChild: false,
                        id: '2',
                        isFile: true,
                        name: "Report.pdf",
                        parentId: "1",
                        size: 2048576,
                        type: "pdf"
                    },
                    {
                        dateCreated: new Date("2023-11-20T15:45:30.1234567+05:30"),
                        dateModified: new Date("2024-01-02T09:15:45.6789012+05:30"),
                        filterPath: "Files/Documents/",
                        hasChild: true,
                        id: '3',
                        isFile: false,
                        name: "Archive",
                        parentId: "1",
                        size: 1024000,
                        type: "folder",
                        children: [
                            {
                                dateCreated: new Date("2023-10-15T08:20:10.1111111+05:30"),
                                dateModified: new Date("2023-12-30T16:45:20.2222222+05:30"),
                                filterPath: "Files/Documents/Archive/",
                                hasChild: false,
                                id: '4',
                                isFile: true,
                                name: "OldReport.pdf",
                                parentId: "3",
                                size: 1048576,
                                type: "pdf"
                            }
                        ]
                    }
                ]
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
                filterPath: "Files/",
                hasChild: true,
                id: '5',
                isFile: false,
                name: "Pictures",
                parentId: "0",
                size: 3145728,
                type: "folder",
                children: [
                    {
                        dateCreated: new Date("2024-01-05T11:30:00.3333333+05:30"),
                        dateModified: new Date("2024-01-05T11:30:00.3333333+05:30"),
                        filterPath: "Files/Pictures/",
                        hasChild: false,
                        id: '6',
                        isFile: true,
                        name: "photo1.jpg",
                        parentId: "5",
                        size: 2097152,
                        type: "jpg"
                    }
                ]
            }
        ]
    }
];

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files'
    },
    fileSystemData: nestedData,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Using Flat Data Structure

Use flat file list with parent-child references:

```typescript
interface FileData {
    dateCreated?: Date;           // File/folder creation date
    dateModified?: Date;          // Last modified date
    filterPath: string;           // Full path from root
    hasChild?: boolean;           // Has child folders
    id: string;                   // Unique identifier
    isFile: boolean;              // true for files, false for folders
    name: string;                 // File/folder name
    parentId?: string | null;     // Parent folder ID (null for root)
    size?: number;                // Size in bytes
    type?: string;                // File type/extension
}

const flatData: FileData[] = [
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
        filterPath: "",
        hasChild: true,
        id: '0',
        isFile: false,
        name: "Files",
        parentId: null,
        size: 1779448,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
        filterPath: "Files/",
        hasChild: true,
        id: '1',
        isFile: false,
        name: "Documents",
        parentId: "0",
        size: 524288,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-12-01T10:30:00.0000000+05:30"),
        dateModified: new Date("2024-01-05T14:22:15.5555555+05:30"),
        filterPath: "Files/Documents/",
        hasChild: false,
        id: '2',
        isFile: true,
        name: "Report.pdf",
        parentId: "1",
        size: 2048576,
        type: "pdf"
    },
    {
        dateCreated: new Date("2023-11-20T15:45:30.1234567+05:30"),
        dateModified: new Date("2024-01-02T09:15:45.6789012+05:30"),
        filterPath: "Files/Documents/",
        hasChild: true,
        id: '3',
        isFile: false,
        name: "Archive",
        parentId: "1",
        size: 1024000,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-10-15T08:20:10.1111111+05:30"),
        dateModified: new Date("2023-12-30T16:45:20.2222222+05:30"),
        filterPath: "Files/Documents/Archive/",
        hasChild: false,
        id: '4',
        isFile: true,
        name: "OldReport.pdf",
        parentId: "3",
        size: 1048576,
        type: "pdf"
    }
];

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files'
    },
    fileSystemData: flatData,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

**Important:** Use `hasChild` property (not `children`) to indicate folder has contents.

### Complete Real-World File System Example

Complete example with multiple levels of hierarchy, various file types, and additional properties:

```typescript
interface FileData {
    dateCreated?: Date;
    dateModified?: Date;
    filterPath: string;
    hasChild?: boolean;
    id: string;
    isFile: boolean;
    name: string;
    parentId?: string | null;
    size?: number;
    type?: string;
    permission?: AccessRules;  // Optional access control
    imageUrl?: string;         // Optional image URL for preview
}

const resultData: FileData[] = [
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
        filterPath: "",
        hasChild: true,
        id: '0',
        isFile: false,
        name: "Files",
        parentId: null,
        size: 1779448,
        type: "folder",
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\",
        hasChild: false,
        id: '1',
        isFile: false,
        name: "Documents",
        parentId: '0',
        size: 680786,
        type: "folder",
        permission: permission  // Optional: access control rules
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\",
        hasChild: false,
        id: "2",
        isFile: false,
        name: "Downloads",
        parentId: "0",
        size: 6172,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\",
        hasChild: false,
        id: "3",
        isFile: false,
        name: "Music",
        parentId: "0",
        size: 20,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\",
        hasChild: true,
        id: "4",
        isFile: false,
        name: "Pictures",
        parentId: "0",
        size: 228465,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\",
        hasChild: false,
        id: "5",
        isFile: false,
        name: "Videos",
        parentId: "0",
        size: 20,
        type: "folder"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Documents\\",
        hasChild: false,
        id: "6",
        isFile: true,
        name: "EJ2_File_Manager",
        parentId: "1",
        size: 12403,
        type: "docx"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Documents\\",
        hasChild: false,
        id: "7",
        isFile: true,
        name: "EJ2_File_Manager",
        parentId: "1",
        size: 90099,
        type: "pdf"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Documents\\",
        hasChild: false,
        id: "8",
        isFile: true,
        name: "File_Manager_PPT",
        parentId: "1",
        size: 578010,
        type: "pptx"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Documents\\",
        hasChild: false,
        id: "9",
        isFile: true,
        name: "File_Manager",
        parentId: "1",
        size: 274,
        type: "txt"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Downloads\\",
        hasChild: false,
        id: "10",
        isFile: true,
        name: "Sample_Work_Sheet",
        parentId: "2",
        size: 6172,
        type: "xlsx"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Music\\",
        hasChild: false,
        id: "11",
        isFile: true,
        name: "Music",
        parentId: "3",
        size: 10,
        type: "mp3"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Music\\",
        hasChild: false,
        id: "12",
        isFile: true,
        name: "Sample_Music",
        parentId: "3",
        size: 10,
        type: "mp3"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Videos\\",
        hasChild: false,
        id: "13",
        isFile: true,
        name: "Demo_Video",
        parentId: "5",
        size: 10,
        type: "mp4"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Videos\\",
        hasChild: false,
        id: "14",
        isFile: true,
        name: "Sample_Video",
        parentId: "5",
        size: 10,
        type: "mp4"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Pictures\\",
        hasChild: false,
        id: '15',
        isFile: false,
        name: "Employees",
        parentId: '4',
        size: 237568,
        type: "folder",
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Pictures\\Employees\\",
        hasChild: false,
        id: '16',
        isFile: true,
        name: "Albert",
        parentId: '15',
        size: 53248,
        type: "png",
        imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic01.png"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Pictures\\Employees\\",
        hasChild: false,
        id: '17',
        isFile: true,
        name: "Nancy",
        parentId: '15',
        size: 65536,
        type: "png",
        imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic02.png"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Pictures\\Employees\\",
        hasChild: false,
        id: '18',
        isFile: true,
        name: "Michael",
        parentId: '15',
        size: 69632,
        type: "png",
        imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic03.png"
    },
    {
        dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
        dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
        filterPath: "\\Pictures\\Employees\\",
        hasChild: false,
        id: '19',
        isFile: true,
        name: "Robert",
        parentId: '15',
        size: 48951,
        type: "png",
        imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic04.png"
    }
];

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://your-api.com/files'
    },
    fileSystemData: resultData,
    height: '100%',
    width: '100%'
});

filemanager.appendTo('#filemanager');
```

**Key Features Demonstrated:**
- Root folder with 5 subfolders
- Multiple file types: `.docx`, `.pdf`, `.pptx`, `.txt`, `.xlsx`, `.mp3`, `.mp4`, `.png`
- Nested folder structure (Employees folder within Pictures)
- Image URLs for thumbnail display
- Optional access control permissions
- 19 items showing complete hierarchy
- Proper filterPath with Windows-style backslash paths
- Parent-child relationships via IDs

## Custom Sorting

### Implement Custom Sorting

Use `sortComparer` property for custom sort logic:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    sortComparer: (a: FileData, b: FileData) => {
        // Sort by type first, then by name
        if (a.isFile === b.isFile) {
            // Both files or both folders - sort by name
            return a.name.localeCompare(b.name);
        }
        // Folders first, files second
        return a.isFile ? 1 : -1;
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Sort by Multiple Criteria

Complex sorting with multiple fields:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    sortComparer: (a: FileData, b: FileData) => {
        // Priority 1: Folders before files
        if (a.isFile !== b.isFile) {
            return a.isFile ? 1 : -1;
        }
        
        // Priority 2: Within folders/files, sort by size (largest first)
        if (a.size && b.size && a.size !== b.size) {
            return b.size - a.size;
        }
        
        // Priority 3: Sort by name alphabetically
        return a.name.localeCompare(b.name);
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Natural Sorting (Windows Explorer Style)

Implement natural sorting for file names:

```typescript
// Natural sorting: File1.txt, File2.txt, File10.txt (not File10.txt, File1.txt, File2.txt)
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    sortComparer: (a: FileData, b: FileData) => {
        return naturalSort(a.name, b.name);
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

function naturalSort(a: string, b: string): number {
    const reA = /[^0-9]+|\d+/g;
    const reN = /[^0-9]+|\d+/g;
    const aA = a.match(reA);
    const bA = b.match(reN);
    
    for (let i = 0; i < Math.min(aA?.length || 0, bA?.length || 0); i++) {
        const aa = aA?.[i];
        const bb = bA?.[i];
        
        if (!aa || !bb) break;
        
        const isNumA = !isNaN(parseInt(aa));
        const isNumB = !isNaN(parseInt(bb));
        
        if (isNumA && isNumB) {
            const cmp = parseInt(aa) - parseInt(bb);
            if (cmp !== 0) return cmp;
        } else if (isNumA || isNumB) {
            return isNumA ? 1 : -1;
        } else {
            const cmp = aa.localeCompare(bb);
            if (cmp !== 0) return cmp;
        }
    }
    
    return (aA?.length || 0) - (bA?.length || 0);
}
```

### Per-Column Custom Sorting

Implement sorting for specific columns in Details View:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'Details',
    detailsViewSettings: {
        columns: [
            {
                field: 'name',
                headerText: 'File Name',
                width: '250px',
                sortComparer: (a: FileData, b: FileData) => {
                    // Custom sorting for name column
                    return a.name.localeCompare(b.name);
                }
            },
            {
                field: 'size',
                headerText: 'Size',
                width: '100px',
                sortComparer: (a: FileData, b: FileData) => {
                    // Numeric sorting for size
                    return (a.size || 0) - (b.size || 0);
                }
            },
            {
                field: 'dateModified',
                headerText: 'Modified',
                width: '150px',
                sortComparer: (a: FileData, b: FileData) => {
                    // Date sorting
                    return new Date(a.dateModified).getTime() - new Date(b.dateModified).getTime();
                }
            }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Passing Custom Values to Server

### Send Custom Headers and Metadata

Include custom data in every request:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    beforeSend: (args: BeforeSendEventArgs) => {
        // Add custom headers
        args.ajaxSettings.headers = {
            'Authorization': `Bearer ${getToken()}`,
            'X-User-ID': getUserId(),
            'X-Department': getDepartment(),
            'X-Request-ID': generateRequestId()
        };
        
        // Add custom data to request body
        if (args.data) {
            args.data.userId = getUserId();
            args.data.department = getDepartment();
            args.data.permissions = getUserPermissions();
        }
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

function getToken(): string {
    return sessionStorage.getItem('authToken') || '';
}

function getUserId(): string {
    return sessionStorage.getItem('userId') || 'unknown';
}

function getDepartment(): string {
    return sessionStorage.getItem('department') || 'general';
}

function getUserPermissions(): string[] {
    return ['read', 'write', 'delete'];
}

function generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

### Custom File Download Handler

Add custom logic before downloading files:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    beforeDownload: (args: BeforeDownloadEventArgs) => {
        // Add download logging
        console.log('Download initiated:', args.fileDetails);
        
        // Add custom parameters
        args.ajaxSettings.headers = {
            'X-Download-ID': generateDownloadId(),
            'X-Timestamp': new Date().toISOString()
        };
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

function generateDownloadId(): string {
    return `dl-${Date.now()}`;
}
```

### Custom Image Loading

Add custom logic for image retrieval:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    showThumbnail: true,
    beforeImageLoad: (args: BeforeImageLoadEventArgs) => {
        // Add custom headers for image loading
        args.ajaxSettings.headers = {
            'X-User-ID': getUserId(),
            'Authorization': `Bearer ${getToken()}`
        };
        
        // Log image loading
        console.log('Loading image:', args.imageUrl);
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Event-based Request Customization

Different events for different operations:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    
    // Before ANY operation (read, create, delete, etc.)
    beforeSend: (args: BeforeSendEventArgs) => {
        const action = args.data?.action;
        
        // Add headers based on action type
        args.ajaxSettings.headers = {
            'X-Action': action,
            'X-Timestamp': new Date().toISOString(),
            'Authorization': `Bearer ${getToken()}`
        };
        
        // Add different data based on action
        if (action === 'delete') {
            args.data.deletedBy = getCurrentUser();
            args.data.deleteReason = 'User initiated';
        }
        
        if (action === 'copy' || action === 'move') {
            args.data.movedBy = getCurrentUser();
            args.data.timestamp = new Date().toISOString();
        }
    },
    
    // Before download operation
    beforeDownload: (args: BeforeDownloadEventArgs) => {
        console.log('Downloading files:', args.fileDetails);
        
        // Use fetch API instead of FormPost
        args.useFormPost = false;
        
        // Add custom headers
        args.fetchRequest.headers.append('X-Download-Session', generateSession());
        args.fetchRequest.headers.append('Authorization', `Bearer ${getToken()}`);
    },
    
    // Before image load operation
    beforeImageLoad: (args: BeforeImageLoadEventArgs) => {
        // Use fetch API for images
        args.useImageAsUrl = false;
        
        // Add authentication
        args.fetchRequest.headers.append('Authorization', `Bearer ${getToken()}`);
    },
    
    height: '380px'
});

filemanager.appendTo('#filemanager');

function getToken(): string {
    return sessionStorage.getItem('authToken') || '';
}

function getCurrentUser(): string {
    return sessionStorage.getItem('userId') || 'system';
}

function generateSession(): string {
    return `session-${Date.now()}`;
}
```

### Access-Controlled File Operations

Apply role-based access rules to files:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    beforeSend: (args: BeforeSendEventArgs) => {
        // Include user role for permission checking
        const userRole = getUserRole();
        
        args.ajaxSettings.headers = {
            'X-User-Role': userRole,
            'X-User-ID': getUserId()
        };
        
        // Add access rules to request
        args.data.userRole = userRole;
        args.data.userPermissions = getPermissionsForRole(userRole);
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

function getUserRole(): string {
    return sessionStorage.getItem('userRole') || 'guest';
}

function getUserId(): string {
    return sessionStorage.getItem('userId') || 'unknown';
}

function getPermissionsForRole(role: string): string[] {
    const permissions: { [key: string]: string[] } = {
        'admin': ['copy', 'read', 'write', 'writeContents', 'download', 'upload'],
        'editor': ['copy', 'read', 'write', 'download', 'upload'],
        'viewer': ['read', 'download'],
        'guest': ['read']
    };
    return permissions[role] || [];
}

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    beforeImageLoad: (args: BeforeImageLoadEventArgs) => {
        // Add custom image parameters
        console.log('Loading image:', args.fileDetails);
        
        // Add version or thumbnail size parameters
        args.ajaxSettings.url += `?size=small&version=${getImageVersion()}`;
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

function getImageVersion(): string {
    return `v${Date.now()}`;
}
```

## Upload Restrictions

### Prevent Upload Based on File Extensions

Restrict allowed file types:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    uploadSettings: {
        maxFileSize: 10000000,  // 10 MB
        minFileSize: 1024       // 1 KB
    },
    height: '380px',
    uploading: (args: any) => {
        // Blocked file extensions
        const blockedExtensions = ['exe', 'bat', 'cmd', 'sh', 'scr'];
        
        const fileExtension = args.fileData.name.split('.').pop()?.toLowerCase();
        
        if (blockedExtensions.includes(fileExtension)) {
            args.cancel = true;
            console.error(`File type .${fileExtension} is not allowed`);
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Restrict Drag-and-Drop Upload

Disable drag-and-drop upload while allowing regular upload:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload'
    },
    allowDragAndDrop: false,  // Disable drag-and-drop
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Or allow drag-and-drop but disable drop-to-upload
const filemanagerWithDragDisabled = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowDragAndDrop: true,
    height: '380px',
    fileDragStop: (args) => {
        // Prevent upload via drag-drop
        if (args.action === 'upload') {
            args.cancel = true;
            console.log('Drag-and-drop upload disabled');
        }
    }
});

filemanagerWithDragDisabled.appendTo('#filemanager2');
```

## Access Control and Permissions

### Implement Role-Based Access

Control operations based on user role:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    beforeSend: (args: BeforeSendEventArgs) => {
        const userRole = getCurrentUserRole();
        
        if (args.data) {
            args.data.userRole = userRole;
        }
        
        // Add role-specific permissions
        if (userRole === 'viewer') {
            args.data.permissions = ['read'];
        } else if (userRole === 'editor') {
            args.data.permissions = ['read', 'write', 'upload'];
        } else if (userRole === 'admin') {
            args.data.permissions = ['read', 'write', 'delete', 'upload', 'download'];
        }
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

function getCurrentUserRole(): string {
    return localStorage.getItem('userRole') || 'viewer';
}
```

### Hide Restricted Operations

Remove UI elements for operations user cannot perform:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

const userRole = getCurrentUserRole();

// Disable toolbar items based on role
if (userRole === 'viewer') {
    const disabledItems = ['NewFolder', 'Upload', 'Delete', 'Rename', 'Cut', 'Paste'];
    filemanager.disableToolbarItems(disabledItems);
}
```

## Component State Persistence

### Maintain Component State

Save and restore user's navigation and settings:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    enablePersistence: true,  // Auto-save state to localStorage
    height: '380px'
});

filemanager.appendTo('#filemanager');

// State automatically persists:
// - Current path
// - Selected view mode
// - Sidebar state
// - Column widths
```

### Manual State Management

Manually save and restore component state:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Save state on navigation
function saveFileManagerState() {
    const state = {
        path: filemanager.path,
        view: filemanager.view,
        selectedFiles: filemanager.getSelectedFiles(),
        timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('filemanagerState', JSON.stringify(state));
    console.log('State saved:', state);
}

// Restore state on page load
function restoreFileManagerState() {
    const savedState = sessionStorage.getItem('filemanagerState');
    
    if (savedState) {
        const state = JSON.parse(savedState);
        filemanager.path = state.path;
        filemanager.view = state.view;
        filemanager.refresh();
        console.log('State restored:', state);
    }
}

// Listen to navigation changes
filemanager.success = () => {
    saveFileManagerState();
};
```

## Complete Advanced Configuration Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { BeforeSendEventArgs, BeforeDownloadEventArgs, BeforeImageLoadEventArgs } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    
    // State persistence
    enablePersistence: true,
    
    // Upload restrictions
    uploadSettings: {
        maxFileSize: 100000000,
        autoUpload: false
    },
    
    // Custom sorting
    sortComparer: (a: any, b: any) => {
        if (a.isFile !== b.isFile) {
            return a.isFile ? 1 : -1;
        }
        return a.name.localeCompare(b.name);
    },
    
    height: '600px',
    
    // Event handlers
    beforeSend: (args: BeforeSendEventArgs) => {
        args.ajaxSettings.headers = {
            'Authorization': `Bearer ${getToken()}`
        };
    },
    
    beforeDownload: (args: BeforeDownloadEventArgs) => {
        console.log('Download:', args.fileDetails);
    },
    
    beforeImageLoad: (args: BeforeImageLoadEventArgs) => {
        console.log('Loading image:', args.fileDetails);
    },
    
    uploading: (args: any) => {
        console.log('Upload started:', args.fileData);
    }
});

filemanager.appendTo('#filemanager');

function getToken(): string {
    return localStorage.getItem('token') || '';
}
```

## FileManager in Dialog/Tab Components

### Embed FileManager in Dialog

Use FileManager inside a Dialog component for file selection:

```typescript
import { FileManager, NavigationPane, DetailsView, Toolbar } from '@syncfusion/ej2-filemanager';
import { Dialog } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

FileManager.Inject(NavigationPane, DetailsView, Toolbar);

let fileManagerInstance: FileManager;

const dialog = new Dialog({
    header: 'Select Files',
    content: '<div id="filemanager"></div>',
    buttons: [
        {
            click: () => {
                const selectedFiles = fileManagerInstance.getSelectedFiles();
                console.log('Selected:', selectedFiles);
                dialog.hide();
            },
            buttonModel: { content: 'Select', isPrimary: true }
        },
        {
            click: () => dialog.hide(),
            buttonModel: { content: 'Cancel' }
        }
    ],
    width: '600px',
    open: () => {
        if (!fileManagerInstance) {
            fileManagerInstance = new FileManager({
                ajaxSettings: {
                    url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
                },
                allowMultiSelection: true,
                height: '400px'
            });
            fileManagerInstance.appendTo('#filemanager');
        }
    },
    close: () => {
        if (fileManagerInstance) {
            fileManagerInstance.destroy();
            fileManagerInstance = null;
        }
    }
});

dialog.appendTo('body');
```

### FileManager in Tab Component

Use FileManager across multiple tabs with proper cleanup:

```typescript
import { FileManager, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { Tab } from '@syncfusion/ej2-navigations';

FileManager.Inject(NavigationPane, DetailsView);

const tabComponent = new Tab({
    heightAdjustMode: 'Content',
    height: '500px',
    items: [
        {
            header: { text: 'All Files' },
            content: '<div id="filemanager1"></div>'
        },
        {
            header: { text: 'Images' },
            content: '<div id="filemanager2"></div>'
        },
        {
            header: { text: 'Documents' },
            content: '<div id="filemanager3"></div>'
        }
    ],
    selected: (args) => {
        tabComponent.refreshLayout();
        
        const tabIndex = args.selectedIndex;
        const fileManagerId = `filemanager${tabIndex + 1}`;
        const container = document.getElementById(fileManagerId);
        
        if (container && !container.querySelector('.e-filemanager')) {
            let path = '/';
            if (tabIndex === 1) path = '/Images/';
            if (tabIndex === 2) path = '/Documents/';
            
            const fm = new FileManager({
                ajaxSettings: {
                    url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
                },
                initialPath: path,
                height: '400px'
            });
            fm.appendTo(`#${fileManagerId}`);
        }
    }
});

tabComponent.appendTo('#tab');
```
