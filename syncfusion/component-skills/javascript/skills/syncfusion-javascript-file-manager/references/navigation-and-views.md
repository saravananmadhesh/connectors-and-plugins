# Navigation and Views in Syncfusion TypeScript FileManager

## Table of Contents
- [View Modes](#view-modes)
- [Large Icons View Customization](#large-icons-view-customization)
- [Details View Customization](#details-view-customization)
- [Navigation Pane Configuration](#navigation-pane-configuration)
- [Breadcrumb Navigation](#breadcrumb-navigation)
- [Virtualization for Performance](#virtualization-for-performance)
- [Custom View Templates](#custom-view-templates)

## View Modes

The FileManager supports two main view modes for displaying files and folders:

### Large Icons View

Display files and folders as large icons with labels - the default view optimized for visual browsing:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',  // Set to Large Icons view
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Details View

Display files and folders in a detailed table format with columns for size, date, type:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'Details',  // Set to Details view
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Switching Between Views

Allow users to switch view modes dynamically:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'LargeIcons',
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Switch to Details view
document.getElementById('detailsViewBtn').addEventListener('click', () => {
    filemanager.view = 'Details';
});

// Switch to Large Icons view
document.getElementById('iconsViewBtn').addEventListener('click', () => {
    filemanager.view = 'LargeIcons';
});
```

## Large Icons View Customization

### Default Large Icons View

The default layout displays folder/file icons with names below:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    showThumbnail: true,  // Show thumbnails for images
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Custom Large Icons Template

Create custom HTML layout for each file/folder:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    largeIconsTemplate: `<div class="e-large-icons">
                         <div class="e-icon"><img style="width: 100px; height: 100px;" src="\${imageUrl}" /></div>
                         <div class="e-icon-text" title="\${name}">\${name}</div>
                         <div class="e-icon-details">\${size} bytes - \${type}</div>
                         </div>`,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Customize Icon Size

Adjust thumbnail and icon dimensions:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    largeIconsTemplate: `<div class="e-large-icons">
                         <div class="e-icon"><img style="width: 150px; height: 150px;" src="\${imageUrl}" /></div>
                         <div class="e-icon-text" title="\${name}">\${name}</div>
                         </div>`,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Details View Customization

### Configure Display Columns

Define which columns appear in Details view:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'Details',
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'File Name', width: '250px' },
            { field: 'size', headerText: 'Size (bytes)', width: '100px' },
            { field: 'type', headerText: 'File Type', width: '100px' },
            { field: 'dateModified', headerText: 'Modified', width: '150px' }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Column Width and Alignment

Set column widths and text alignment:

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
                width: '300px',
                textAlign: 'Left'
            },
            {
                field: 'size',
                headerText: 'Size',
                width: '120px',
                textAlign: 'Right'
            },
            {
                field: 'dateModified',
                headerText: 'Last Modified',
                width: '180px',
                textAlign: 'Center'
            }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Column Visibility Toggle

Show/hide columns dynamically:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'Details',
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'size', headerText: 'Size', width: '100px', visible: true },
            { field: 'dateModified', headerText: 'Modified', width: '150px', visible: true }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Toggle size column visibility
document.getElementById('toggleSizeCol').addEventListener('click', () => {
    const sizeCol = filemanager.detailsViewSettings.columns[1];
    sizeCol.visible = !sizeCol.visible;
    filemanager.refresh();
});
```

## Navigation Pane Configuration

### Enable Navigation Pane

Display the sidebar with quick access to folders:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    navigationPaneSettings: {
        visible: true
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Configure Navigation Pane Width

Set minimum and maximum sidebar width:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    navigationPaneSettings: {
        visible: true,
        minWidth: '100px',
        maxWidth: '400px'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Hide Navigation Pane

Remove sidebar for full-width file viewing:

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

### Custom Navigation Items

Add custom shortcuts to navigation pane:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    navigationPaneSettings: {
        visible: true,
        items: [
            { id: 'recents', text: 'Recent Files', icon: 'e-icons e-recent' },
            { id: 'documents', text: 'Documents', icon: 'e-icons e-folder', path: '/Documents/' },
            { id: 'downloads', text: 'Downloads', icon: 'e-icons e-download', path: '/Downloads/' },
            { id: 'pictures', text: 'Pictures', icon: 'e-icons e-image', path: '/Pictures/' }
        ]
    },
    height: '380px',
    navigationPaneItemSelect: (args) => {
        console.log('Navigation item selected:', args.item);
    }
});

filemanager.appendTo('#filemanager');
```

## Breadcrumb Navigation

### Display and Interact with Breadcrumb

The breadcrumb shows the current path and allows quick navigation:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Breadcrumb is displayed by default above file list
// Users can click breadcrumb items to navigate up
```

### Custom Breadcrumb Handling

Track and customize breadcrumb interactions:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    success: (args) => {
        // After navigation, update any custom breadcrumb
        console.log('Current path:', filemanager.path);
        console.log('Breadcrumb items:', args.breadcrumbPath);
    }
});

filemanager.appendTo('#filemanager');
```

## Virtualization for Performance

### Enable Virtualization

For folders with thousands of files, virtualization improves performance by rendering only visible items:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    enableVirtualization: true,  // Enable virtual scrolling
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Virtual Scrolling Configuration

Customize virtualization behavior:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    enableVirtualization: true,
    view: 'Details',  // Works best with Details view
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'size', headerText: 'Size', width: '100px' },
            { field: 'dateModified', headerText: 'Modified', width: '150px' }
        ]
    },
    height: '600px'  // Larger viewport for virtualization to be effective
});

filemanager.appendTo('#filemanager');
```

**Performance Impact:**
- Without virtualization: May lag with 1000+ files
- With virtualization: Smooth scrolling even with 10,000+ files
- Trade-off: Advanced filtering/sorting may be slightly slower

## Custom View Templates

### Large Icon with Extended Information

Create custom template showing additional metadata:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    largeIconsTemplate: `<div class="custom-icon-container">
                         <div class="icon-box">
                             <img src="\${imageUrl}" alt="\${name}" />
                         </div>
                         <div class="icon-details">
                             <h3>\${name}</h3>
                             <p>Type: \${type}</p>
                             <p>Size: \${(size / 1024).toFixed(2)} KB</p>
                         </div>
                         </div>`,
    height: '380px'
});

filemanager.appendTo('#filemanager');

// CSS for custom template
const style = document.createElement('style');
style.textContent = `
.custom-icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    background: #f9f9f9;
}

.icon-box {
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 10px;
}

.icon-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.icon-details {
    text-align: center;
    font-size: 12px;
}

.icon-details h3 {
    margin: 5px 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;
document.head.appendChild(style);
```

### Navigation Pane with Custom Icons

Customize sidebar with branded icons and styling:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    navigationPaneSettings: {
        visible: true,
        items: [
            { id: 'doc', text: 'My Documents', icon: 'custom-doc-icon', path: '/Documents/' },
            { id: 'pics', text: 'My Pictures', icon: 'custom-pic-icon', path: '/Pictures/' }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Complete Navigation and Views Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    
    // View configuration
    view: 'LargeIcons',
    enableVirtualization: true,
    showThumbnail: true,
    
    // Large Icons view
    largeIconsTemplate: `<div class="e-large-icons">
                         <div class="e-icon"><img style="width: 100px;" src="\${imageUrl}" /></div>
                         <div class="e-icon-text" title="\${name}">\${name}</div>
                         </div>`,
    
    // Details view columns
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '300px' },
            { field: 'size', headerText: 'Size', width: '100px', textAlign: 'Right' },
            { field: 'dateModified', headerText: 'Modified', width: '150px' }
        ]
    },
    
    // Navigation pane
    navigationPaneSettings: {
        visible: true,
        minWidth: '150px',
        maxWidth: '300px'
    },
    
    height: '600px',
    
    success: (args) => {
        console.log('Navigation success:', filemanager.path);
    }
});

filemanager.appendTo('#filemanager');

// View switcher
document.getElementById('viewToggle').addEventListener('change', (e) => {
    filemanager.view = (e.target as HTMLSelectElement).value as any;
});
```
