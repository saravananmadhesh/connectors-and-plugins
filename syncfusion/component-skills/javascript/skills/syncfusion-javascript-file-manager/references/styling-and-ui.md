# Styling and UI Customization in Syncfusion TypeScript FileManager

## Table of Contents
- [CSS Classes and Selectors](#css-classes-and-selectors)
- [Adding Style Sheets](#adding-style-sheets)
- [Component Structure Customization](#component-structure-customization)
- [Toolbar Customization](#toolbar-customization)
- [Context Menu Items](#context-menu-items)
- [Navigation Pane Customization](#navigation-pane-customization)
- [Thumbnail Customization](#thumbnail-customization)
- [Advanced Toolbar Customization](#advanced-toolbar-customization)
- [Custom Thumbnail Styling](#custom-thumbnail-styling)
- [Complete Styling Example](#complete-styling-example)

## CSS Classes and Selectors

The FileManager component uses specific CSS classes for styling different elements:

### Main Component Classes

```css
/* Main FileManager container */
.e-filemanager {
    /* Root container styling */
}

/* Toolbar styling */
.e-toolbar {
    /* Toolbar container */
}

.e-toolbar-item {
    /* Individual toolbar button */
}

/* Navigation pane styling */
.e-navigation-pane {
    /* Left sidebar */
}

.e-treeview {
    /* Navigation tree view */
}

/* File list area */
.e-file-list {
    /* Main file/folder list container */
}

/* Large icons view */
.e-large-icons {
    /* Large icon item container */
}

.e-icon {
    /* Icon element */
}

.e-icon-text {
    /* File/folder name text */
}

/* Details view */
.e-grid {
    /* Details view grid */
}

.e-gridcontent {
    /* Grid content area */
}

/* Breadcrumb styling */
.e-breadcrumb {
    /* Breadcrumb navigation */
}

.e-breadcrumb-item {
    /* Individual breadcrumb item */
}
```

### Context Menu Classes

```css
/* Context menu container */
.e-contextmenu {
    /* Popup menu */
}

.e-menu-item {
    /* Menu item */
}

.e-menu-separator {
    /* Menu divider */
}
```

## Adding Style Sheets

### Import Default Styles

Install the Fluent 2 theme package to get all required dependency styles for the File Manager:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

The `index.css` file for File Manager in this package automatically loads all the required dependency styles. Add the following import to your `index.css` file:

```css
/* Fluent 2 theme (default) - auto-loads all File Manager dependency styles */
@import '../node_modules/@syncfusion/ej2-fluent2-theme/styles/file-manager/index.css';
```

Then create a basic HTML container:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion FileManager</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="index.css" rel="stylesheet" />
</head>
<body>
    <div id="filemanager"></div>
</body>
</html>
```

### Available Theme Options

Switch themes by installing the corresponding theme package and importing its `index.css`:

```bash
# Install the desired theme package
npm install @syncfusion/ej2-fluent2-theme --save      # Fluent 2 theme (default)
npm install @syncfusion/ej2-fluent-theme --save        # Fluent theme
npm install @syncfusion/ej2-tailwind3-theme --save     # Tailwind CSS 3 theme
npm install @syncfusion/ej2-bootstrap5-theme --save    # Bootstrap 5 theme
npm install @syncfusion/ej2-material3-theme --save     # Material 3 design
```

Then import the theme's File Manager index file in your stylesheet:

```css
/* Fluent 2 theme (default) */
@import '../node_modules/@syncfusion/ej2-fluent2-theme/styles/file-manager/index.css';

/* Fluent theme */
@import '../node_modules/@syncfusion/ej2-fluent-theme/styles/file-manager/index.css';

/* Tailwind CSS 3 theme */
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/file-manager/index.css';

/* Bootstrap 5 theme */
@import '../node_modules/@syncfusion/ej2-bootstrap5-theme/styles/file-manager/index.css';

/* Material 3 theme */
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/file-manager/index.css';
```

## Component Structure Customization

### Customize Large Icons Template

Create custom layout for files in Large Icons view:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    largeIconsTemplate: `<div class="e-large-icons">
                         <div class="e-icon"><img src="\${imageUrl}" /></div>
                         <div class="e-icon-text" title="\${name}">\${name}</div>
                         </div>`,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Custom CSS for Large Icons

Style the large icons with CSS:

```css
.e-large-icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.e-large-icons:hover {
    background-color: #f5f5f5;
}

.e-icon {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.e-icon img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.e-icon-text {
    text-align: center;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
}
```

## Toolbar Customization

### Add Custom Toolbar Items

Customize toolbar with specific items:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    toolbarSettings: {
        items: ['NewFolder', 'Upload', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'SortBy', 'View', 'Refresh']
    },
    height: '380px',
    toolbarClick: (args) => {
        console.log('Toolbar item clicked:', args.item);
    }
});

filemanager.appendTo('#filemanager');
```

### Enable/Disable Toolbar Items

Control toolbar item state dynamically:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    toolbarSettings: {
        items: ['NewFolder', 'Upload', 'Delete', 'Rename']
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Disable specific toolbar items
const disableItems = ['Delete'];
filemanager.disableToolbarItems(disableItems);

// Enable toolbar items
const enableItems = ['Delete'];
filemanager.enableToolbarItems(enableItems);
```

## Context Menu Items

### Customize Context Menu

Configure context menu items for different element types:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        // Context menu items for files
        file: ['Open', '|', 'Cut', 'Copy', 'Delete', 'Rename', '|', 'Download', '|', 'Details'],
        
        // Context menu items for folders
        folder: ['Open', '|', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', '|', 'Details'],
        
        // Context menu items for layout/background
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'Details', '|', 'SelectAll'],
        
        visible: true
    },
    height: '380px',
    menuClick: (args) => {
        console.log('Context menu item clicked:', args.item);
    }
});

filemanager.appendTo('#filemanager');
```

### Add Custom Context Menu Items

Extend context menu with custom options using `menuOpen` and `menuClick` events:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    contextMenuSettings: {
        file: ['Open', '|', 'Cut', 'Copy', 'Delete', 'Rename', '|', 'Details'],
        folder: ['Open', '|', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', '|', 'Details'],
        visible: true
    },
    height: '380px',
    
    // Handle menu open event to add custom items
    menuOpen: (args) => {
        console.log('Context menu opening for:', args.type);
        
        // Add custom icon to menu items
        if (args.items && args.items.length > 0) {
            args.items.forEach((item, index) => {
                // Customize existing menu items
                if (item.text === 'Open') {
                    item.iconCss = 'e-icons e-folder-open';
                }
                if (item.text === 'Delete') {
                    item.iconCss = 'e-icons e-delete';
                }
            });
        }
    },
    
    // Handle menu item click
    menuClick: (args) => {
        console.log('Menu item clicked:', args.item);
        
        if (args.item.text === 'Open') {
            console.log('Opening:', args.fileDetails);
        } else if (args.item.text === 'Delete') {
            console.log('Deleting:', args.fileDetails);
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Create Custom Toolbar Items with Template

Add custom toolbar items with HTML templates (e.g., checkbox for select all):

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    // Custom item added with template property
    toolbarItems: [
        { text: 'Create folder', name: 'NewFolder', prefixIcon: 'e-plus', tooltipText: 'Create folder' },
        { name: 'Upload' },
        { name: 'SortBy' },
        { name: 'Refresh' },
        { name: 'Cut' },
        { name: 'Copy' },
        { name: 'Paste' },
        { name: 'Delete' },
        { name: 'Download' },
        { name: 'Rename' },
        { template: '<input id="checkbox" type="checkbox"/>', name: 'Select' },
        { name: 'Selection' },
        { name: 'View' },
        { name: 'Details' }
    ],
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Render Checkbox in template
const checkbox = new CheckBox({ 
    label: 'Select All', 
    checked: false, 
    change: onChange 
}, '#checkbox');

// On checkbox change select all or clear selection
function onChange(args: ChangeEventArgs): void {
    if (args.checked) {
        filemanager.selectAll();
        checkbox.label = 'Unselect All';
    } else {
        filemanager.clearSelection();
        checkbox.label = 'Select All';
    }
}
```

## Navigation Pane Customization

### Customize Navigation Pane Template

Create custom navigation items with templates:

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
    navigationPaneTemplate: `<div class="e-nav-item">
                            <span class="e-nav-icon"></span>
                            <span class="e-nav-text">\${name}</span>
                            </div>`,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

## Thumbnail Customization

### Show and Customize Thumbnails

Display image thumbnails in large icons view:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    showThumbnail: true,  // Enable thumbnail display
    largeIconsTemplate: `<div class="e-large-icons">
                         <div class="e-icon">
                            <img src="\${imageUrl}" alt="\${name}" style="width: 100px; height: 100px; object-fit: cover;" />
                         </div>
                         <div class="e-icon-text" title="\${name}">\${name}</div>
                         </div>`,
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Custom Thumbnail CSS

Style thumbnails with custom CSS:

```css
.e-large-icons .e-icon {
    width: 120px;
    height: 120px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: #f9f9f9;
}

.e-large-icons .e-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s;
}

.e-large-icons:hover .e-icon img {
    transform: scale(1.05);
}
```

## Complete Styling Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    
    // View and display settings
    view: 'LargeIcons',
    showThumbnail: true,
    largeIconsTemplate: `<div class="e-large-icons">
                         <div class="e-icon"><img src="\${imageUrl}" /></div>
                         <div class="e-icon-text" title="\${name}">\${name}</div>
                         </div>`,
    
    // Toolbar configuration
    toolbarSettings: {
        items: ['NewFolder', 'Upload', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'SortBy', 'View']
    },
    
    // Context menu configuration
    contextMenuSettings: {
        file: ['Open', '|', 'Cut', 'Copy', 'Delete', 'Rename', '|', 'Download', '|', 'Details'],
        folder: ['Open', '|', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', '|', 'Details'],
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'SelectAll'],
        visible: true
    },
    
    // Navigation pane
    navigationPaneSettings: {
        visible: true,
        minWidth: '150px',
        maxWidth: '300px'
    },
    
    height: '600px',
    
    menuClick: (args) => {
        console.log('Menu clicked:', args.item);
    },
    
    toolbarClick: (args) => {
        console.log('Toolbar clicked:', args.item);
    }
});

filemanager.appendTo('#filemanager');
```

## Advanced Toolbar Customization

### Toolbar Item Properties

When adding toolbar items, you can configure these properties:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    toolbarSettings: {
        items: [
            {
                text: 'Download All',
                name: 'DownloadAll',
                prefixIcon: 'e-icons e-download',
                tooltipText: 'Download all selected files'
            },
            {
                text: 'Share',
                name: 'Share',
                prefixIcon: 'e-icons e-share',
                tooltipText: 'Share files with others'
            },
            {
                text: 'Custom Actions',
                name: 'CustomActions',
                template: '<button id="customBtn">Custom</button>'
            }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Handle custom button click
document.getElementById('customBtn').addEventListener('click', () => {
    console.log('Custom action triggered');
});
```

### Enable/Disable Toolbar Items (Case-Insensitive)

```typescript
// Items names are case-insensitive (e.g., 'newfolder' is same as 'NewFolder')
filemanager.disableToolbarItems(['newfolder', 'upload', 'delete']);
filemanager.enableToolbarItems(['delete', 'rename']);

// Also works with custom toolbar item names
filemanager.disableToolbarItems(['DownloadAll', 'Share']);
filemanager.enableToolbarItems(['DownloadAll']);
```

## Custom Thumbnail Styling

### File Type Icons with CSS

Style different file type thumbnails:

```css
/* Different file type icons */
.e-filemanager .e-large-icons .e-fe-pdf {
    background: url('data:image/svg+xml;base64,...') no-repeat center;
    background-size: contain;
}

.e-filemanager .e-large-icons .e-fe-docx {
    background: url('data:image/svg+xml;base64,...') no-repeat center;
    background-size: contain;
}

.e-filemanager .e-large-icons .e-fe-jpg,
.e-filemanager .e-large-icons .e-fe-png,
.e-filemanager .e-large-icons .e-fe-gif {
    background-size: cover;
    background-position: center;
}

.e-filemanager .e-large-icons .e-fe-folder {
    background: url('data:image/svg+xml;base64,...') no-repeat center;
    background-size: contain;
}
```

### Show/Hide Thumbnails

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    view: 'LargeIcons',
    showThumbnail: true,  // Show image thumbnails
    // showThumbnail: false,  // Hide thumbnails
    height: '380px'
});

filemanager.appendTo('#filemanager');
```
