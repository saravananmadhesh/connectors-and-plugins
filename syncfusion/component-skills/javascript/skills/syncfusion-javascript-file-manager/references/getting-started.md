# Getting Started with Syncfusion TypeScript FileManager

## Table of Contents
- [Installation and Dependencies](#installation-and-dependencies)
- [Setup Development Environment](#setup-development-environment)
- [Add Syncfusion Packages](#add-syncfusion-packages)
- [Import CSS Styles](#import-css-styles)
- [Initialize FileManager](#initialize-filemanager)
- [Configure Ajax Settings](#configure-ajax-settings)
- [Basic Event Handling](#basic-event-handling)

## Installation and Dependencies

The FileManager component requires several Syncfusion packages and their dependencies. The main dependency tree includes:

**Core Dependencies:**
```
@syncfusion/ej2-filemanager
├── @syncfusion/ej2-base
├── @syncfusion/ej2-layouts
├── @syncfusion/ej2-popups
├── @syncfusion/ej2-data
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-lists
├── @syncfusion/ej2-buttons
├── @syncfusion/ej2-splitbuttons
├── @syncfusion/ej2-navigations
└── @syncfusion/ej2-grids
```

All these packages work together to provide the complete FileManager functionality, from file browsing to custom UI components.

## Setup Development Environment

### Clone the Quickstart Project

Clone the Syncfusion JavaScript quickstart repository from GitHub:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
```

After cloning, navigate to the project folder:

```bash
cd ej2-quickstart
```

**Environment Requirements:**
- Node.js v14.15.0 or higher
- npm 6.0 or higher
- Webpack CLI (latest version)

Verify your environment:

```bash
node --version   # Should show v14.15.0 or higher
npm --version    # Should show 6.0 or higher
```

## Add Syncfusion Packages

The quickstart project comes pre-configured with Syncfusion packages. Install all dependencies using npm:

```bash
npm install
```

This command installs:
- All Syncfusion packages listed in `package.json`
- All peer dependencies
- Development tools required for building and serving the application

If you need to install specific packages individually:

```bash
npm install @syncfusion/ej2-filemanager
npm install @syncfusion/ej2-base
npm install @syncfusion/ej2-layouts
```

## Import CSS Styles

Install the Fluent 2 theme package to get all the required dependency styles for the File Manager:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

The `index.css` file for File Manager in this package automatically loads all the required dependency styles. Import the following in your `index.css` file:

```css
/* Fluent 2 theme (default) - auto-loads all File Manager dependency styles */
@import '../node_modules/@syncfusion/ej2-fluent2-theme/styles/file-manager/index.css';
```

**Theme Options:**
Replace `fluent2-theme` with your preferred theme package:
- `ej2-fluent2-theme` - Fluent 2 design (default)
- `ej2-fluent-theme` - Fluent design
- `ej2-tailwind3-theme` - Tailwind CSS 3 theme
- `ej2-bootstrap5-theme` - Bootstrap 5 theme
- `ej2-material3-theme` - Material 3 design

## Initialize FileManager

### Create HTML Container

Add a `div` element with a unique ID in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion FileManager</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Syncfusion TypeScript FileManager" />
    <link href="index.css" rel="stylesheet" />
</head>
<body>
    <!-- Container for FileManager -->
    <div id="filemanager"></div>
    <script src="index.js"></script>
</body>
</html>
```

### Import and Initialize

Create your TypeScript file (`src/index.ts`) and initialize the FileManager:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

// Inject required modules for FileManager functionality
FileManager.Inject(Toolbar, NavigationPane, DetailsView);

// Create FileManager instance
const filemanager: FileManager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px'
});

// Render the FileManager
filemanager.appendTo('#filemanager');
```

## Configure Ajax Settings

The `ajaxSettings` property is critical for server communication. It specifies endpoints for all file operations:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        // Primary endpoint for file operations (read, create, delete, rename, search, copy, move)
        url: 'https://your-server.com/api/FileManager/FileOperations',
        
        // Endpoint for retrieving images and thumbnails
        getImageUrl: 'https://your-server.com/api/FileManager/GetImage',
        
        // Endpoint for file uploads
        uploadUrl: 'https://your-server.com/api/FileManager/Upload',
        
        // Endpoint for file downloads
        downloadUrl: 'https://your-server.com/api/FileManager/Download'
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

**Configuration Details:**
- **url**: Handles all standard file operations (read folder contents, create folders, delete items, etc.)
- **getImageUrl**: Used for loading image thumbnails and previews
- **uploadUrl**: Dedicated endpoint for file uploads (can be same as main url)
- **downloadUrl**: Dedicated endpoint for file downloads

## Basic Event Handling

FileManager provides several events for tracking user interactions:

### File Selection Event

Track when users select files:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    fileSelect: (args) => {
        console.log('Files selected:');
        args.fileDetails.forEach(file => {
            console.log(`Name: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}`);
        });
    }
});

filemanager.appendTo('#filemanager');
```

### Toolbar Click Event

Handle toolbar item interactions:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    toolbarClick: (args) => {
        console.log('Toolbar item clicked:', args.item);
        if (args.item === 'Upload') {
            console.log('User clicked upload button');
        }
    }
});

filemanager.appendTo('#filemanager');
```

### Success and Error Events

Track operation completion and failures:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    height: '380px',
    success: (args) => {
        console.log('Operation completed:', args.details);
    },
    failure: (args) => {
        console.error('Operation failed:', args.error);
    }
});

filemanager.appendTo('#filemanager');
```

## Complete Example

Here's a complete, working example combining all elements:

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion FileManager Getting Started</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="index.css" rel="stylesheet" />
</head>
<body>
    <div id='loader'>Loading....</div>
    <div id="filemanager"></div>
</body>
</html>
```

**index.css:**
```css
/* Fluent 2 theme (default) - auto-loads all File Manager dependency styles */
@import '../node_modules/@syncfusion/ej2-fluent2-theme/styles/file-manager/index.css';
```

**index.ts:**
```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager: FileManager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
        uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
        downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
    },
    height: '380px',
    fileSelect: (args) => {
        console.log('Selected files:', args.fileDetails);
    }
});

filemanager.appendTo('#filemanager');
```

Run the application:

```bash
npm start
```

The FileManager will be accessible at `http://localhost:3000/` with full functionality for browsing, uploading, and managing files through your configured server endpoints.
