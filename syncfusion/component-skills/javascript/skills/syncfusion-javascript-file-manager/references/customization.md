# Customization in Syncfusion TypeScript FileManager

## Table of Contents
- [Context Menu Customization](#context-menu-customization)
- [Toolbar Customization](#toolbar-customization)
- [Details View Customization](#details-view-customization)
- [File Extension Visibility](#file-extension-visibility)
- [Hidden Items Display](#hidden-items-display)
- [Thumbnail Display Control](#thumbnail-display-control)
- [Tooltip Customization](#tooltip-customization)
- [Navigation Pane Customization](#navigation-pane-customization)

## Context Menu Customization

### Configure Menu Items for Files and Folders

Customize which items appear in context menus for different element types:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        // Menu items for files
        file: ['Open', '|', 'Cut', 'Copy', 'Delete', '|', 'Download', 'Rename', '|', 'Details'],
        
        // Menu items for folders
        folder: ['Open', '|', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', '|', 'Details'],
        
        // Menu items for layout/background
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'Details', '|', 'SelectAll'],
        
        // Toggle visibility
        visible: true
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

**Available Menu Items:**
- `Open` - Open file or folder
- `Cut` - Cut item
- `Copy` - Copy item
- `Paste` - Paste items
- `Delete` - Delete item
- `Download` - Download file(s)
- `Rename` - Rename item
- `Details` - View item details
- `SortBy` - Sort options
- `View` - View mode options
- `Refresh` - Refresh view
- `SelectAll` - Select all items
- `|` - Menu separator

### Handle Context Menu Item Clicks

Track and respond to menu selections:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        file: ['Copy', 'Paste', 'Delete'],
        visible: true
    },
    height: '380px',
    menuClick: (args) => {
        console.log('Menu item clicked:', args.item);
        console.log('File details:', args.fileDetails);
        
        if (args.item === 'Copy') {
            console.log('User copied:', args.fileDetails.name);
        } else if (args.item === 'Delete') {
            console.log('User deleted:', args.fileDetails.name);
        }
    }
});

filemanager.appendTo('#filemanager');
```

## Toolbar Customization

### Customize Toolbar Items

Configure which buttons appear in the toolbar:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    toolbarSettings: {
        items: [
            'NewFolder',      // Create new folder
            'Upload',         // Upload files
            '|',              // Separator
            'Cut',            // Cut items
            'Copy',           // Copy items
            'Paste',          // Paste items
            '|',
            'Delete',         // Delete items
            'Rename',         // Rename items
            '|',
            'SortBy',         // Sort menu
            'View',           // View mode
            'Refresh'         // Refresh
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Handle Toolbar Item Clicks

Respond to toolbar button interactions:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    toolbarClick: (args) => {
        console.log('Toolbar item clicked:', args.item);
        
        if (args.item === 'NewFolder') {
            console.log('Create folder action triggered');
        } else if (args.item === 'Upload') {
            console.log('Upload dialog opened');
        } else if (args.item === 'Delete') {
            console.log('Delete action on selected items');
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Hide and Show Toolbar Items

Enable or disable specific toolbar items dynamically:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    toolbarSettings: {
        items: ['NewFolder', 'Upload', 'Delete']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Disable upload button after some condition
setTimeout(() => {
    const uploadBtn = document.querySelector('.e-toolbar-item[title="Upload"]') as HTMLElement;
    if (uploadBtn) {
        uploadBtn.style.display = 'none';  // Hide upload button
    }
}, 2000);
```

## Details View Customization

### Configure Details View Columns

Customize which columns appear in Details view:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'dateModified', headerText: 'Modified', width: '150px' },
            { field: 'size', headerText: 'Size', width: '100px' },
            { field: 'type', headerText: 'Type', width: '100px' }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Set Column Width and Alignment

Customize column properties for better layout:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    detailsViewSettings: {
        columns: [
            { 
                field: 'name', 
                headerText: 'File Name', 
                width: '400px',
                textAlign: 'Left'
            },
            { 
                field: 'size', 
                headerText: 'File Size', 
                width: '150px',
                textAlign: 'Right'
            },
            { 
                field: 'dateModified', 
                headerText: 'Date Modified', 
                width: '200px',
                textAlign: 'Center'
            }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## File Extension Visibility

### Show File Extensions

Display file extensions by default:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showFileExtension: true,  // Show .txt, .pdf, etc.
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Hide File Extensions

Hide file extensions for cleaner interface:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showFileExtension: false,  // Hide extensions
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Toggle Extension Visibility Dynamically

Switch extension visibility at runtime:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showFileExtension: true,
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Add toggle button
const toggleBtn = document.getElementById('toggleExt');
toggleBtn.addEventListener('click', () => {
    filemanager.showFileExtension = !filemanager.showFileExtension;
    filemanager.refresh();
});
```

## Hidden Items Display

### Show Hidden Files and Folders

Display hidden items (files starting with dot or with hidden attribute):

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showHiddenItems: true,  // Display .hidden files and folders
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Hide Hidden Files and Folders

Keep hidden items out of view:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showHiddenItems: false,  // Don't display hidden items
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Toggle Hidden Items Display

Allow users to toggle visibility:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showHiddenItems: false,
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Toggle button functionality
const showHiddenBtn = document.getElementById('showHidden');
showHiddenBtn.addEventListener('click', () => {
    filemanager.showHiddenItems = !filemanager.showHiddenItems;
    filemanager.refresh();
});
```

## Thumbnail Display Control

### Show Thumbnails in Large Icons View

Display image thumbnails for visual preview:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    showThumbnail: true,  // Display image thumbnails
    view: 'LargeIcons',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Hide Thumbnails for Performance

Disable thumbnails to improve performance with many files:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    showThumbnail: false,  // Don't load thumbnails
    view: 'LargeIcons',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Customize Thumbnail Size

Set custom thumbnail dimensions:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    showThumbnail: true,
    view: 'LargeIcons',
    largeIconsTemplate: '<div class="e-large-icons"><div class="e-icon"><img style="width: 100px; height: 100px;" src="${imageUrl}" />' +
                        '</div><div class="e-icon-text" title="${name}">${name}</div></div>',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Customize Column Templates

Apply custom templates to display data in details view columns:

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
                headerText: 'Name', 
                width: '250px',
                template: '<div class="e-file-name">${name}</div>'
            },
            { 
                field: 'size', 
                headerText: 'Size', 
                width: '100px',
                template: '<div class="e-file-size">${(size/1024).toFixed(2)} KB</div>'
            }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Hide Columns in Details View

Control column visibility:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'Details',
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'size', headerText: 'Size', width: '100px', visible: false },
            { field: 'dateModified', headerText: 'Modified', width: '150px' }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Navigation Pane Customization

### Configure Navigation Pane Items

Customize sidebar navigation shortcuts:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    navigationPaneSettings: {
        visible: true,
        minWidth: '150px',
        maxWidth: '300px'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Hide Navigation Pane

Disable the sidebar for full-width file browsing:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    navigationPaneSettings: {
        visible: false  // Hide sidebar
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Styling and Appearance

### Apply Custom CSS Classes

Style elements with custom CSS:

```css
/* Custom FileManager styling */
.e-filemanager {
    border: 2px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.e-large-icons {
    padding: 15px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.e-large-icons:hover {
    background-color: #f5f5f5;
}

.e-toolbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Customize Large Icons Template

Create custom layout for file/folder display:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    largeIconsTemplate: '<div class="e-large-icons"><div class="e-icon-bg"><img class="e-icon" src="${imageUrl}" />' +
                        '</div><div class="e-icon-text">${name}</div><div class="e-icon-details">${size} bytes</div></div>',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Complete Customization Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    // UI Customization
    showFileExtension: true,
    showHiddenItems: false,
    showThumbnail: true,
    
    // Context Menu Customization
    contextMenuSettings: {
        file: ['Open', '|', 'Cut', 'Copy', 'Delete', 'Rename', '|', 'Details'],
        folder: ['Open', '|', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', '|', 'Details'],
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'SelectAll'],
        visible: true
    },
    
    // Toolbar Customization
    toolbarSettings: {
        items: ['NewFolder', 'Upload', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'SortBy', 'View']
    },
    
    // Navigation Pane
    navigationPaneSettings: {
        visible: true,
        minWidth: '150px'
    },
    
    // Details View
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'size', headerText: 'Size', width: '100px' },
            { field: 'dateModified', headerText: 'Modified', width: '150px' }
        ]
    },
    
    height: '380px',
    
    menuClick: (args) => {
        console.log('Menu clicked:', args.item);
    },
    
    toolbarClick: (args) => {
        console.log('Toolbar clicked:', args.item);
    }
});

filemanager.appendTo('#filemanager');
```
