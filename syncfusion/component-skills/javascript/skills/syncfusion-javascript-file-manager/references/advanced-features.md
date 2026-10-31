# Advanced Features in Syncfusion TypeScript FileManager

## Table of Contents
- [Drag-and-Drop Functionality](#drag-and-drop-functionality)
- [Multiple File Selection](#multiple-file-selection)
- [Custom Sorting and Filtering](#custom-sorting-and-filtering)
- [Localization and Internationalization](#localization-and-internationalization)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Access Control and Permissions](#access-control-and-permissions)
- [State Persistence](#state-persistence)

## Drag-and-Drop Functionality

### Enable Drag-and-Drop

Allow users to drag files and folders between locations:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowDragAndDrop: true,  // Enable drag-and-drop
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Handle Drag Events

Track and respond to drag operations with proper event names:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowDragAndDrop: true,
    height: '380px',
    fileDragStart: (args) => {
        // Triggers when file/folder dragging starts
        console.log('Drag started:', args.fileDetails);
        console.log('Source path:', args.path);
    },
    fileDragging: (args) => {
        // Triggers while dragging the file/folder
        console.log('Currently dragging');
    },
    fileDragStop: (args) => {
        // Triggers when file/folder is about to be dropped
        console.log('Drag stopping, target:', args.target);
    },
    fileDropped: (args) => {
        // Triggers when file/folder is dropped
        console.log('Drop completed:', args.fileDetails);
    }
});

filemanager.appendTo('#filemanager');
```

### Drag-and-Drop with Validation

Validate drag operations before allowing drop:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowDragAndDrop: true,
    height: '380px',
    fileDragStop: (args) => {
        // Validate before drop - check if target is folder
        if (args.target && !args.target.isFile) {
            console.log('Valid drop target (folder)');
        } else {
            args.cancel = true;
            console.log('Cannot drop on files');
        }
        
        // Prevent dropping in specific folders
        if (args.target && args.target.name && args.target.name.includes('Protected')) {
            args.cancel = true;
            console.log('Cannot drop in protected folder');
        }
    }
});

filemanager.appendTo('#filemanager');
```

## Multiple File Selection

### Enable Multiple Selection

Allow users to select multiple files at once:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowMultiSelection: true,  // Enable multi-select
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Disable Multiple Selection

Restrict to single-file selection only:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowMultiSelection: false,  // Only single selection
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Handle File Selection

Track selected files using fileSelect and fileSelection events:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowMultiSelection: true,
    height: '380px',
    fileSelect: (args) => {
        // Triggered when files are selected
        console.log('Files selected:');
        args.fileDetails.forEach((file: any) => {
            console.log(`Name: ${file.name}, Size: ${file.size}, Type: ${file.type}`);
        });
    },
    fileSelection: (args) => {
        // Triggered during file selection process
        console.log('File selection triggered');
    }
});

filemanager.appendTo('#filemanager');
```

### Enabling Range Selection

Select multiple files using Shift+Click for range selection:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowMultiSelection: true,
    enableRangeSelection: true,  // Enable range selection with Shift+Click
    height: '380px',
    fileSelect: (args) => {
        // Shift+Click selects range, Ctrl+Click adds to selection
        console.log('Total selected:', args.fileDetails.length);
        console.log('Selection complete');
    }
});

filemanager.appendTo('#filemanager');
```

### Disable Multi-Selection

Restrict to single-file selection with checkbox disabled:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    allowMultiSelection: false,  // Only single selection
    showItemCheckBoxes: false,   // Hide selection checkboxes
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Custom Sorting and Filtering

### Perform Custom Sorting

Sort files by custom criteria:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    beforeSend: (args) => {
        // Add custom sorting parameters
        if (args.data) {
            args.data.sortBy = 'name';      // Sort by name
            args.data.sortOrder = 'ascending';  // Ascending order
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Sort by File Properties

Implement custom sorting logic:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    success: (args) => {
        if (args.details) {
            // Custom sort implementation
            const files = args.details.files;
            
            // Sort by size (largest first)
            files.sort((a, b) => b.size - a.size);
            
            console.log('Sorted by size:', files);
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Filter Files by Type

Display only specific file types:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    beforeSend: (args) => {
        // Send filter parameters to server
        if (args.data) {
            args.data.filterType = 'images';  // Filter to images only
        }
    },
    success: (args) => {
        // Filter locally if needed
        if (args.details) {
            const imageFiles = args.details.files.filter((f: any) => 
                ['jpg', 'png', 'gif', 'bmp'].includes(f.type.toLowerCase())
            );
            console.log('Image files:', imageFiles);
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Search Functionality

Search for files within the FileManager:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Trigger search
document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    filemanager.search(searchTerm);
});
```

## Localization and Internationalization

### Set Locale for Multi-Language Support

Configure the FileManager to use specific languages:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { setCulture } from '@syncfusion/ej2-base';

// Set culture before initialization
setCulture('es');  // Spanish

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'es',  // Use Spanish locale
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Available Locales

Supported languages include:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Japanese (ja)
- Chinese - Simplified (zh)
- Chinese - Traditional (zh-TW)
- Arabic (ar)
- Russian (ru)

### Custom Localization

Provide custom translations:

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define custom translations
L10n.load({
    'es': {
        'filemanager': {
            'NewFolder': 'Nueva Carpeta',
            'Upload': 'Subir',
            'Delete': 'Eliminar',
            'Download': 'Descargar',
            'Rename': 'Renombrar'
        }
    }
});

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'es',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Dynamic Locale Switching

Change language at runtime:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'en',
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Switch language
document.getElementById('langSelector').addEventListener('change', (e) => {
    const selectedLang = (e.target as HTMLSelectElement).value;
    setCulture(selectedLang);
    filemanager.locale = selectedLang;
    filemanager.refresh();
});
```

## RTL (Right-to-Left) Support

### Enable RTL Mode

Activate RTL layout for languages like Arabic and Hebrew:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'ar',      // Arabic locale
    enableRtl: true,   // Enable RTL
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### RTL with Arabic Localization

Complete setup for Arabic interface:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { setCulture } from '@syncfusion/ej2-base';

setCulture('ar');

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'ar',
    enableRtl: true,
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Add RTL CSS
document.documentElement.setAttribute('dir', 'rtl');
```

## Access Control and Permissions

### Set File Access Rules

Control which files/folders users can access:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    beforeSend: (args) => {
        // Send user permissions to server
        if (args.data) {
            args.data.userRole = 'editor';
            args.data.permissions = ['read', 'write', 'delete'];
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Read-Only Mode

Prevent modifications to files:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    toolbarSettings: {
        items: ['View', 'Refresh']  // Only view operations
    },
    contextMenuSettings: {
        file: ['Open', 'Download', '|', 'Details'],  // Read-only options
        folder: ['Open', '|', 'Details'],
        layout: ['View', 'Refresh']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Role-Based Access Control

Different operations based on user role:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Apply role-based restrictions
const userRole = 'viewer';  // Could be 'viewer', 'editor', 'admin'

if (userRole === 'viewer') {
    // Hide edit/delete operations
    const toolbar = document.querySelector('.e-toolbar') as HTMLElement;
    toolbar.querySelectorAll('[title="Delete"], [title="Rename"], [title="Cut"]')
        .forEach(btn => (btn as HTMLElement).style.display = 'none');
}
```

## State Persistence

### Enable State Persistence

Save user's browsing state (current path, view mode, selections):

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    enablePersistence: true,  // Save state in local storage
    height: '380px'
});

filemanager.appendTo('#filemanager');

// State automatically persists to localStorage
// Next time user loads, previous path/view is restored
```

### Custom State Management

Manually save and restore state:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Save state on navigation
document.getElementById('saveStateBtn').addEventListener('click', () => {
    const state = {
        path: filemanager.path,
        view: filemanager.view,
        selectedItems: filemanager.getSelectedFiles()
    };
    localStorage.setItem('filemanagerState', JSON.stringify(state));
    console.log('State saved:', state);
});

// Restore state
document.getElementById('restoreStateBtn').addEventListener('click', () => {
    const savedState = localStorage.getItem('filemanagerState');
    if (savedState) {
        const state = JSON.parse(savedState);
        filemanager.path = state.path;
        filemanager.view = state.view;
        filemanager.refresh();
        console.log('State restored:', state);
    }
});
```

## Complete Advanced Features Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { setCulture } from '@syncfusion/ej2-base';

setCulture('en');

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    
    // Advanced features
    allowDragAndDrop: true,
    allowMultiSelection: true,
    enableVirtualization: true,
    enablePersistence: true,
    
    // Localization and RTL
    locale: 'en',
    enableRtl: false,
    
    // Context menu
    contextMenuSettings: {
        file: ['Copy', 'Cut', 'Delete', 'Download', 'Rename', '|', 'Details'],
        folder: ['Copy', 'Cut', 'Delete', 'Rename', 'Paste', '|', 'Details'],
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'SelectAll']
    },
    
    height: '500px',
    
    // Event handlers
    fileDrag: (args) => {
        console.log('Drag started:', args.fileDetails);
    },
    fileDrop: (args) => {
        console.log('Drop completed:', args.fileDetails);
    },
    fileSelect: (args) => {
        console.log('Selected:', args.fileDetails);
    }
});

filemanager.appendTo('#filemanager');
```
