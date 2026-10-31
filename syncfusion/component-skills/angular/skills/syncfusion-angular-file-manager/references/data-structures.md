# Data Structures in Syncfusion Angular File Manager

## Table of Contents
- [Overview](#overview)
- [Flat Data Structure](#flat-data-structure)
- [Nested Items](#nested-items)
- [fileData Interface](#filedata-interface)
- [Server-Based vs Local Data](#server-based-vs-local-data)
- [Hybrid Approaches](#hybrid-approaches)

## Overview

File Manager supports two data binding approaches:
1. **Server-Based** via `ajaxSettings` (backend handles file operations)
2. **Local Data** via `fileSystemData` (client-side JSON data)

## Flat Data Structure

### Flat Data Basics

Flat data uses a single-level array with parent-child relationships defined by `parentId`:

```typescript
const flatData = [
  {
    id: '0',
    name: 'Files',
    isFile: false,
    parentId: undefined,
    hasChild: true,
    size: 1779448,
    type: 'folder',
    dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
    dateModified: new Date('2024-01-08T18:16:38.4384894+05:30'),
    filterPath: ''
  },
  {
    id: '1',
    name: 'Documents',
    isFile: false,
    parentId: '0',
    hasChild: true,
    size: 680786,
    type: 'folder',
    dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
    dateModified: new Date('2024-01-08T16:55:20.9464164+05:30'),
    filterPath: '\\'
  },
  {
    id: '2',
    name: 'Work.pdf',
    isFile: true,
    parentId: '1',
    hasChild: false,
    size: 102400,
    type: 'pdf',
    dateCreated: new Date('2023-11-16T10:22:00.0000000+05:30'),
    dateModified: new Date('2024-01-10T14:30:00.0000000+05:30'),
    filterPath: '\\Files\\Documents\\'
  },
  {
    id: '3',
    name: 'Personal.txt',
    isFile: true,
    parentId: '1',
    hasChild: false,
    size: 2048,
    type: 'txt',
    dateCreated: new Date('2023-11-17T08:15:00.0000000+05:30'),
    dateModified: new Date('2024-01-11T11:45:00.0000000+05:30'),
    filterPath: '\\Files\\Documents\\'
  },
  {
    id: '4',
    name: 'Music',
    isFile: false,
    parentId: '0',
    hasChild: true,
    size: 5242880,
    type: 'folder',
    dateCreated: new Date('2023-11-18T09:00:00.0000000+05:30'),
    dateModified: new Date('2024-01-12T10:00:00.0000000+05:30'),
    filterPath: '\\'
  },
  {
    id: '5',
    name: 'Rock',
    isFile: false,
    parentId: '4',
    hasChild: false,
    size: 0,
    type: 'folder',
    dateCreated: new Date('2023-11-19T10:30:00.0000000+05:30'),
    dateModified: new Date('2024-01-13T11:30:00.0000000+05:30'),
    filterPath: '\\Files\\Music\\'
  },
  {
    id: '6',
    name: 'Song1.mp3',
    isFile: true,
    parentId: '5',
    hasChild: false,
    size: 5242880,
    type: 'audio',
    dateCreated: new Date('2023-11-20T11:00:00.0000000+05:30'),
    dateModified: new Date('2024-01-14T12:00:00.0000000+05:30'),
    filterPath: '\\Files\\Music\\Rock\\'
  }
];
```

### Implementation

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [fileSystemData]='fileSystemData'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  // Permission object for file/folder access control
  public permission = {
    copy: false,
    download: false,
    write: false,
    writeContents: false,
    read: true,
    upload: false,
    message: '',
  };

  public fileSystemData: { [key: string]: Object }[] = [
    {
      id: '0',
      name: 'Files',
      isFile: false,
      parentId: undefined,
      hasChild: true,
      size: 1779448,
      type: 'folder',
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T18:16:38.4384894+05:30'),
      filterPath: ''
    },
    {
      id: '1',
      name: 'Documents',
      isFile: false,
      parentId: '0',
      hasChild: true,
      size: 680786,
      type: 'folder',
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T16:55:20.9464164+05:30'),
      filterPath: '\\'
    },
    {
      id: '2',
      name: 'Work.pdf',
      isFile: true,
      parentId: '1',
      hasChild: false,
      size: 102400,
      type: 'pdf',
      dateCreated: new Date('2023-11-16T10:22:00.0000000+05:30'),
      dateModified: new Date('2024-01-10T14:30:00.0000000+05:30'),
      filterPath: '\\Files\\Documents\\'
    },
    {
      id: '3',
      name: 'Music',
      isFile: false,
      parentId: '0',
      hasChild: true,
      size: 5242880,
      type: 'folder',
      dateCreated: new Date('2023-11-18T09:00:00.0000000+05:30'),
      dateModified: new Date('2024-01-12T10:00:00.0000000+05:30'),
      filterPath: '\\'
    }
  ];
}
```

### Advantages
- ✅ Simple, flat array structure
- ✅ Easy to manage from API responses
- ✅ Efficient for large datasets
- ✅ Database-friendly format

### Disadvantages
- ❌ Requires mapping parent-child relationships
- ❌ More complex to visualize hierarchy

### Flat Data with Permissions (Advanced)

For controlling file access, use the `permission` property. This example shows comprehensive flat data with permission settings:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [fileSystemData]='fileSystemData'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  // Define permission object for access control
  public permission = {
    copy: false,
    download: false,
    write: false,
    writeContents: false,
    read: true,
    upload: false,
    message: '',
  };

  public fileSystemData: { [key: string]: Object }[] = [
    {
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T18:16:38.4384894+05:30'),
      filterPath: '',
      hasChild: true,
      id: '0',
      isFile: false,
      name: 'Files',
      parentId: undefined,
      size: 1779448,
      type: 'folder',
    },
    {
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T16:55:20.9464164+05:30'),
      filterPath: '\\',
      hasChild: false,
      id: '1',
      isFile: false,
      name: 'Documents',
      parentId: '0',
      size: 680786,
      type: 'folder',
      permission: this.permission,
    },
    {
      dateCreated: new Date('2023-11-16T10:22:00.0000000+05:30'),
      dateModified: new Date('2024-01-09T14:30:00.0000000+05:30'),
      filterPath: '\\Files\\',
      hasChild: false,
      id: '2',
      isFile: true,
      name: 'ProjectProposal.pdf',
      parentId: '1',
      size: 256000,
      type: 'pdf',
    },
    {
      dateCreated: new Date('2023-11-17T08:15:00.0000000+05:30'),
      dateModified: new Date('2024-01-10T11:45:00.0000000+05:30'),
      filterPath: '\\Files\\',
      hasChild: false,
      id: '3',
      isFile: true,
      name: 'Budget.xlsx',
      parentId: '1',
      size: 128000,
      type: 'xlsx',
    }
  ];
}
```

**Permission Properties:**
- `copy` - Allow copying files (boolean, default: false)
- `download` - Allow downloading files (boolean, default: false)
- `write` - Allow editing file names (boolean, default: false)
- `writeContents` - Allow editing file contents (boolean, default: false)
- `read` - Allow reading files (boolean, default: true)
- `upload` - Allow uploading files (boolean, default: false)
- `message` - Custom message for restricted access (string, default: '')

**Key Properties in Example:**
- `dateCreated` - File/folder creation date (Date)
- `dateModified` - Last modification date (Date)
- `filterPath` - Hierarchical path with separators (string)
- `hasChild` - Whether folder contains items (boolean)
- `id` - Unique identifier (string)
- `isFile` - Whether item is file (boolean)
- `name` - Display name (string)
- `parentId` - Parent folder ID (string | undefined)
- `size` - File size in bytes (number)
- `type` - File/folder type (string: 'folder', 'pdf', 'xlsx', etc.)
- `permission` - Access control object (Permission)

## Nested Items

### Nested Data Basics

Nested data embeds children directly in parent objects using `children` array:

```typescript
const nestedData = [
  {
    id: '1',
    name: 'Documents',
    isFile: false,
    hasChild: true,
    children: [
      {
        id: '2',
        name: 'Work.pdf',
        isFile: true,
        size: 102400
      },
      {
        id: '3',
        name: 'Personal.txt',
        isFile: true,
        size: 2048
      }
    ]
  },
  {
    id: '4',
    name: 'Music',
    isFile: false,
    hasChild: true,
    children: [
      {
        id: '5',
        name: 'Song1.mp3',
        isFile: true,
        size: 5242880
      }
    ]
  }
];
```

### Implementation

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [fileSystemData]='fileSystemData'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public fileSystemData: any[] = [
    {
      id: '0',
      name: 'Files',
      isFile: false,
      hasChild: true,
      size: 1779448,
      type: 'folder',
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T18:16:38.4384894+05:30'),
      filterPath: '',
      children: [
        {
          id: '1',
          name: 'Documents',
          isFile: false,
          hasChild: false,
          size: 680786,
          type: 'folder',
          parentId: '0',
          dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
          dateModified: new Date('2024-01-08T16:55:20.9464164+05:30'),
          filterPath: '\\'
        },
        {
          id: '2',
          name: 'Work.pdf',
          isFile: true,
          hasChild: false,
          size: 102400,
          type: 'pdf',
          parentId: '0',
          dateCreated: new Date('2023-11-16T10:22:00.0000000+05:30'),
          dateModified: new Date('2024-01-10T14:30:00.0000000+05:30'),
          filterPath: '\\Files\\'
        }
      ]
    }
  ];
}
```

### Advantages
- ✅ Natural hierarchy representation
- ✅ Easy to visualize folder structure
- ✅ Intuitive for nested folder exploration
- ✅ Self-contained tree structure

### Disadvantages
- ❌ Can become deeply nested and complex
- ❌ Less efficient for very large datasets
- ❌ Harder to serialize/deserialize

## fileData Interface

The FileData interface defines the structure for file and folder items in the File Manager.

### Core Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | **Required** - The name of the file or folder |
| `isFile` | `boolean` | **Required** - Indicates whether the item is a file (true) or folder (false) |
| `id` | `string` | **Required** - Unique identifier for the file or folder |
| `size` | `number` | The size of the file in bytes (not required for folders) |
| `dateModified` | `Date` | The date when the file or folder was last modified |
| `hasChild` | `boolean` | Indicates whether a folder has child items |
| `parentId` | `string \| null` | ID of the parent folder. Use null for root-level items |
| `type` | `string` | The MIME type of the file (for files only) |

### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| `dateCreated` | `Date` | Date the file or folder was created |
| `children` | `FileData[]` | For nested data: array of child items |
| `filterPath` | `string` | Path for organizing items hierarchically |
| `permission` | `Permission` | File permissions and access control |

### Interface Definition

```typescript
interface FileData {
  // Core Required Properties
  id: string;                       // Unique identifier
  name: string;                     // File or folder name
  isFile: boolean;                  // Whether item is file (true) or folder (false)
  
  // Core Optional Properties
  size?: number;                    // File size in bytes (not required for folders)
  dateModified?: Date;              // Last modification date
  hasChild?: boolean;               // Whether folder has children
  parentId?: string | null;         // Parent folder ID (null for root items)
  type?: string;                    // MIME type (for files only)
  
  // Advanced Properties
  dateCreated?: Date;               // File/folder creation date
  children?: FileData[];            // Child items (for nested structure)
  filterPath?: string;              // Hierarchical path
  permission?: Permission;          // Access control
}

interface Permission {
  read?: boolean;                   // Can read/view file
  write?: boolean;                  // Can modify file
  writeContents?: boolean;          // Can write to contents
  copy?: boolean;                   // Can copy file
  download?: boolean;               // Can download file
  upload?: boolean;                 // Can upload to folder
  message?: string;                 // Custom permission message
}
```

### Complete Example

```typescript
const completeFileData: FileData[] = [
  {
    id: '1',
    name: 'Documents',
    isFile: false,
    size: 0,
    dateModified: new Date('2024-01-15T10:30:00Z'),
    hasChild: true,
    parentId: null,
    type: null
  },
  {
    id: '2',
    name: 'Report.pdf',
    isFile: true,
    size: 204800,
    dateModified: new Date('2024-01-10T14:22:00Z'),
    hasChild: false,
    parentId: '1',
    type: 'application/pdf'
  },
  {
    id: '3',
    name: 'Notes.txt',
    isFile: true,
    size: 2048,
    dateModified: new Date('2024-01-12T09:15:00Z'),
    hasChild: false,
    parentId: '1',
    type: 'text/plain'
  }
];
```

## Server-Based vs Local Data

### Server-Based Data

**Use when:**
- Files are on a real file system
- Need dynamic file operations
- Backend handles file management
- Large, frequently changing datasets

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
}
```

### Local Data

**Use when:**
- Mock/demo data
- Data from API needs client-side formatting
- Testing UI without backend
- Small, static datasets

```typescript
@Component({
  template: `<ejs-filemanager 
    [fileSystemData]='fileSystemData'>
  </ejs-filemanager>`
})
export class AppComponent {
  public fileSystemData: FileData[] = [
    {
      id: '0',
      name: 'Files',
      isFile: false,
      parentId: undefined,
      hasChild: true,
      size: 1779448,
      type: 'folder',
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T18:16:38.4384894+05:30'),
      filterPath: ''
    },
    {
      id: '1',
      name: 'Documents',
      isFile: false,
      parentId: '0',
      hasChild: true,
      size: 680786,
      type: 'folder',
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T16:55:20.9464164+05:30'),
      filterPath: '\\'
    }
  ];
}
```

## Hybrid Approaches

### Convert Flat to Nested

Transform flat data to nested structure:

```typescript
function flatToNested(flatData: FileData[]): FileData[] {
  const map: { [key: string]: FileData } = {};
  const roots: FileData[] = [];

  // Create map for quick lookup
  flatData.forEach(item => {
    map[item.id] = { ...item, children: [] };
  });

  // Assign children and collect roots
  flatData.forEach(item => {
    if (item.parentId === null || item.parentId === undefined) {
      roots.push(map[item.id]);
    } else {
      if (!map[item.parentId].children) {
        map[item.parentId].children = [];
      }
      map[item.parentId].children!.push(map[item.id]);
    }
  });

  return roots;
}
```

### Convert Nested to Flat

Transform nested data to flat structure:

```typescript
function nestedToFlat(nestedData: FileData[]): FileData[] {
  const flat: FileData[] = [];

  function traverse(items: FileData[], parentId: string | null = null) {
    items.forEach(item => {
      flat.push({
        ...item,
        parentId: parentId,
        children: undefined
      });
      
      if (item.children && item.children.length > 0) {
        traverse(item.children, item.id);
      }
    });
  }

  traverse(nestedData);
  return flat;
}
```

### Format API Response to fileData

Transform API response to File Manager format:

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileData } from '@syncfusion/ej2-filemanager';

@Component({
  template: `<ejs-filemanager 
    [fileSystemData]='fileSystemData'>
  </ejs-filemanager>`
})
export class AppComponent implements OnInit {
  public fileSystemData: FileData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch files from API
    this.http.get<any[]>('/api/files').subscribe(apiFiles => {
      // Transform API response to fileData format
      this.fileSystemData = apiFiles.map(file => ({
        id: file.fileId,
        name: file.fileName,
        isFile: file.type === 'file',
        size: file.fileSize,
        dateModified: new Date(file.lastModified),
        hasChild: file.type === 'folder' && file.childCount > 0,
        parentId: file.parentId || null,
        type: file.mimeType
      }));
    });
  }
}
```

### Dynamic Data Loading

Load data dynamically on folder open:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [FileManagerModule],
  template: `<ejs-filemanager 
    #fileManager
    [fileSystemData]='fileSystemData'
    (beforeOpen)='onBeforeOpen($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public fileSystemData: any[] = [
    {
      id: '1',
      name: 'Folder',
      isFile: false,
      parentId: null,
      hasChild: true,
      size: 0,
      type: 'folder',
      dateCreated: new Date('2023-11-15T19:02:02.3419426+05:30'),
      dateModified: new Date('2024-01-08T18:16:38.4384894+05:30'),
      filterPath: '\\'
    }
  ];

  constructor(private http: HttpClient) {}

  onBeforeOpen(args: any) {
    // Load children when folder is opened
    const folderId = args.fileDetails.id;
    
    this.http.get<any[]>(`/api/files/${folderId}`).subscribe(children => {
      // Add children to parent
      const parent = this.findFileById(folderId, this.fileSystemData);
      if (parent) {
        parent.children = children.map(file => ({
          id: file.fileId,
          name: file.fileName,
          isFile: file.type === 'file',
          size: file.fileSize,
          dateModified: new Date(file.lastModified),
          hasChild: file.type === 'folder',
          parentId: folderId
        }));
      }
    });
  }

  private findFileById(id: string, data: any[]): any {
    for (let item of data) {
      if (item.id === id) return item;
      if (item.children) {
        const found = this.findFileById(id, item.children);
        if (found) return found;
      }
    }
    return null;
  }
}
```

---

**Next:** Learn about drag-and-drop operations at [drag-and-drop.md](drag-and-drop.md) or explore large file handling at [virtualization.md](virtualization.md).
