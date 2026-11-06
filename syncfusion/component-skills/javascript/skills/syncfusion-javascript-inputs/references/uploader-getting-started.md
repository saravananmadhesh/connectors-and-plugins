# Getting Started with the Uploader Component

This guide walks you through installation, setup, and creating your first file upload in TypeScript.

## Table of Contents
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Module Import](#module-import)
- [Basic HTML Structure](#basic-html-structure)
- [CSS Imports & Themes](#css-imports--themes)
- [Component Initialization](#component-initialization)
- [First Upload Example](#first-upload-example)
- [Adding a Drop Area](#adding-a-drop-area)
- [Configuring Async Settings](#configuring-async-settings)
- [Handle Success and Failed Upload](#handle-success-and-failed-upload)
- [Configuration Options](#configuration-options)

---

## Dependencies

The following packages are required to use the Uploader component:

```
|-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-buttons
```

---

## Installation

### Via Quickstart Project (Recommended for TypeScript)

Clone the Syncfusion JavaScript quickstart project and install dependencies:

```bash
git clone https://github.com/SyncfusionExamples/ej2-quickstart-webpack- ej2-quickstart
cd ej2-quickstart
npm install
```

> This application uses `webpack.config.js` and requires Node `v14.15.0` or higher.

### Via npm Package

Install the Syncfusion inputs package (which includes the Uploader):

```bash
npm install @syncfusion/ej2-inputs --save
```

This installs the complete package with TypeScript definitions.

### Via CDN (Global Script)

Alternatively, use a CDN link in your HTML:

```html
<!-- Syncfusion Material Theme -->
<link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" type="text/css">

<!-- Syncfusion Inputs Global Script -->
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js" type="text/javascript"></script>
```

---

## Module Import

### TypeScript/ES6 Import

For module-based projects (recommended for TypeScript):

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';
```

If using a framework:

```typescript
// React
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';

// Angular
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';

// Vue
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';
```

### CDN Global Access

When using CDN, access via global namespace:

```typescript
const Uploader = (window as any).ej.inputs.Uploader;
```

---

## Basic HTML Structure

### Input Element

Create a file input element with an ID for the Uploader to target:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Syncfusion Uploader Example</title>
    <link href="styles/material.css" rel="stylesheet" type="text/css">
</head>
<body>
    <!-- File input for Uploader -->
    <input type="file" id="fileupload" name="UploadFiles" />
    
    <script src="app.ts"></script>
</body>
</html>
```

### Key Attributes
| Attribute | Purpose |
|-----------|---------|
| `id` | Target selector for Uploader initialization |
| `type="file"` | HTML5 file input (required) |
| `name` | Form submission name parameter |
| `multiple` | Allow multiple file selection (optional) |

---

## CSS Imports & Themes

### TypeScript Project (npm)

In your TypeScript main file or CSS import:

```typescript
// Import Syncfusion theme
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/uploader/index.css";

// Or other themes:
// import '@syncfusion/ej2-inputs/styles/bootstrap.css';
// import '@syncfusion/ej2-inputs/styles/bootstrap4.css';
// import '@syncfusion/ej2-inputs/styles/highcontrast.css';
// import '@syncfusion/ej2-inputs/styles/fabric.css';
```

### Available Themes
- `material.css` - Material Design (recommended)
- `bootstrap.css` - Bootstrap 3 styling
- `bootstrap4.css` - Bootstrap 4 styling
- `fabric.css` - Office Fabric design
- `highcontrast.css` - Accessibility-focused

---

## Component Initialization

### Basic Initialization

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';
import '@syncfusion/ej2-inputs/styles/material.css';

// Create Uploader instance
const uploaderObj = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  }
});

// Render to DOM element
uploaderObj.appendTo('#fileupload');
```

### asyncSettings Configuration

The `asyncSettings` object defines the server endpoints:

```typescript
asyncSettings: {
  // URL to handle file save/upload
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save', // Replace with your actual save endpoint
  
  // URL to handle file removal
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/remove', // Replace with your actual remove endpoint
  
  // Optional: chunk size in bytes for large files
  chunkSize: 5242880,
  
  // Optional: retry configuration
  retryCount: 3,
  retryAfterDelay: 500
}
```

### Server Response Format

The server should return JSON responses:

```json
// Save response
{
  "name": "document.pdf",
  "size": 1024,
  "status": "File uploaded successfully"
}

// Remove response
{
  "status": "File removed successfully"
}
```

---

## First Upload Example

Complete working example:

```typescript
import { Uploader, SelectedEventArgs, UploadingEventArgs } from '@syncfusion/ej2-inputs';
import '@syncfusion/ej2-inputs/styles/material.css';

class FileUploadApp {
  uploaderObj: Uploader;

  constructor() {
    this.uploaderObj = new Uploader({
      asyncSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
      },
      allowedExtensions: '.jpg,.jpeg,.png,.gif',
      maxFileSize: 5242880, // 5 MB
      multiple: true
    });

    this.uploaderObj.appendTo('#fileupload');
    this.attachEventHandlers();
  }

  private attachEventHandlers(): void {
    // When files are selected
    this.uploaderObj.selected = (args: SelectedEventArgs) => {
      console.log('Files selected:', args.filesData);
      
      args.filesData.forEach((file: any) => {
        console.log(`File: ${file.name}, Size: ${file.size} bytes`);
      });
    };

    // Before upload starts
    this.uploaderObj.uploading = (args: UploadingEventArgs) => {
      console.log(`Uploading: ${args.file.name}`);
    };

    // On successful upload
    this.uploaderObj.success = (args: any) => {
      console.log('Upload successful:', args.responseText);
    };

    // On upload failure
    this.uploaderObj.failure = (args: any) => {
      console.error('Upload failed:', args.file.name);
    };

    // When file is removed
    this.uploaderObj.removing = (args: any) => {
      console.log('File removing:', args.filesData);
    };
  }
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new FileUploadApp();
});
```

HTML:
```html
<!DOCTYPE html>
<html>
<head>
    <title>File Upload Example</title>
    <link href="styles/material.css" rel="stylesheet">
</head>
<body>
    <h2>Upload Files</h2>
    <input type="file" id="fileupload" name="UploadFiles" multiple />
    
    <script src="dist/app.js"></script>
</body>
</html>
```

---

## Configuration Options

### Frequently Used Properties

```typescript
new Uploader({
  // Async upload configuration (required)
  asyncSettings: {
    saveUrl: 'string',
    removeUrl: 'string'
  },
  
  // File type restrictions
  allowedExtensions: '.jpg,.png,.pdf',
  
  // Size limits
  minFileSize: 1000,          // 1 KB
  maxFileSize: 52428800,      // 50 MB
  
  // Selection
  multiple: true,             // Multiple file selection
  
  // Upload behavior
  autoUpload: true,           // Upload on selection
  sequentialUpload: false,    // Upload files simultaneously
  dropEffect: 'Copy',         // Drag-drop visual effect
  
  // Template customization
  template: '<span>${name}</span>',
  
  // Localization
  locale: 'en-US'
});
```

### Event Handlers

Key events to attach handlers:

```typescript
uploader.selected = (args: SelectedEventArgs) => { };
uploader.uploading = (args: UploadingEventArgs) => { };
uploader.success = (args: any) => { };
uploader.failure = (args: any) => { };
uploader.removing = (args: RemovingEventArgs) => { };
uploader.clearing = (args: ClearingEventArgs) => { };
```

---

## Adding a Drop Area

By default, the uploader allows drag-and-drop onto the component itself. Use the `dropArea` property to configure an external element as the drop target:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  autoUpload: false,
  dropArea: document.getElementById('droparea')
});
uploader.appendTo('#fileupload');
```

HTML:
```html
<div id="droparea" style="height: 200px; border: 2px dashed #999; text-align: center; padding: 40px;">
  Drop files here or click Browse
</div>
<input type="file" id="fileupload" name="UploadFiles" />
```

---

## Configuring Async Settings

Configure `saveUrl` and `removeUrl` to handle file uploads asynchronously:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  }
});
uploader.appendTo('#fileupload');
```

---

## Handle Success and Failed Upload

Use the `success` and `failure` events to respond to upload results:

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
  },
  success: onUploadSuccess,
  failure: onUploadFailure
});
uploader.appendTo('#fileupload');

function onUploadSuccess(args: any): void {
  if (args.operation === 'upload') {
    console.log('File uploaded successfully');
  }
}

function onUploadFailure(args: any): void {
  console.log('File failed to upload');
}
```

> You can differentiate between upload and remove operations using `args.operation` in the `success` event.

---

## Run the Application

```bash
npm run start
```

> From v16.2.41, the **Essential JS2 AJAX** library is integrated for uploader server requests. Use a third-party `promise` library like `bluebird` if targeting Internet Explorer.

---

## Next Steps

- **To validate files**: Read [file-validation.md](file-validation.md)
- **For advanced uploads**: Read [upload-modes.md](upload-modes.md)
- **To customize appearance**: Read [customization-and-styling.md](customization-and-styling.md)
- **For security/auth**: Read [advanced-features.md](advanced-features.md)
