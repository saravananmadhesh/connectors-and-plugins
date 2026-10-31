# Getting Started with Syncfusion Angular File Manager

## Table of Contents
- [Prerequisites](#prerequisites)
- [Angular Project Setup](#angular-project-setup)
- [Package Installation](#package-installation)
- [CSS Theme Imports](#css-theme-imports)
- [Basic Component Initialization](#basic-component-initialization)
- [AJAX Settings Configuration](#ajax-settings-configuration)
- [Initial View and Rendering](#initial-view-and-rendering)
- [Complete Example](#complete-example)

## Prerequisites

Ensure you have the following installed:
- **Angular:** Version 4 or higher
- **TypeScript:** Version 2.6 or higher
- **Node.js:** Latest LTS version
- **npm:** Latest version

## Angular Project Setup

### Install Angular CLI

Install the Angular CLI globally to create and manage Angular projects:

```sh
npm install -g @angular/cli
```

### Create a New Angular Project

Create a new Angular application:

```sh
ng new syncfusion-file-manager-app
cd syncfusion-file-manager-app
```

The CLI will set up the project structure with all necessary dependencies and configuration files.

## Package Installation

### Install Syncfusion File Manager Package

Syncfusion packages are distributed as scoped npm packages under the `@syncfusion` namespace. Install the File Manager component:

```bash
npm install @syncfusion/ej2-angular-filemanager --save
```

### Package Compatibility: Ivy vs ngcc

Syncfusion provides two package structures for Angular components:

#### Ivy Library Distribution (Recommended for Angular 12+)

For Angular 12 and above, use the Ivy library distribution:

```bash
npm install @syncfusion/ej2-angular-filemanager --save
```

#### Angular Compatibility Compiler (ngcc) for Angular < 12

For Angular versions below 12, use the ngcc package:

```bash
npm install @syncfusion/ej2-angular-filemanager@ngcc --save
```

Update your `package.json` to include the ngcc suffix:

```json
"@syncfusion/ej2-angular-filemanager": "32.1.19-ngcc"
```
## CSS Theme Imports

### Install the Theme Package

To install the [Material3](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) theme package, use the following command:

```bash
npm i @syncfusion/ej2-material3-theme
```

In this package, the File Manager component includes an `index.css` file that automatically loads all the required dependency styles. Add the following import to the **src/styles.css** file.

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/file-manager/index.css";
```

> Ensure that the import order aligns with the component's dependency sequence.

For using SCSS styles, refer to [this guide](https://ej2.syncfusion.com/angular/documentation/common/how-to/sass).

### Available Themes

Syncfusion provides multiple themes:
- `ej2-material3-theme` - Material Design 3 (recommended)
- `ej2-material-theme` - Material Design
- `ej2-bootstrap5-theme` - Bootstrap 5
- `ej2-bootstrap4-theme` - Bootstrap 4
- `ej2-tailwind-theme` - Tailwind CSS
- `ej2-fluent-theme` - Microsoft Fluent Design

### Alternative: CRG (Custom Resource Generator)

For combined component styles, use Syncfusion CRG:
1. Select File Manager and required components
2. Generate a combined CSS file
3. Import the generated file in your project

## Basic Component Initialization

### Module Selection

Choose the appropriate module based on your needs:

- **`FileManagerModule`**: Basic File Manager with toolbar, navigation pane, and details view enabled
- **`FileManagerAllModule`**: Includes all modules and pre-configured services (recommended for complex features)

### Minimal Component Setup

Add the File Manager component to your `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager id='default-filemanager' [ajaxSettings]='ajaxSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public hostUrl: string = 'url';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations'
  };
}
```

### With Feature Modules

To use advanced features (Navigation Pane, Toolbar, Details View), inject their service providers:

```typescript
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService } from '@syncfusion/ej2-angular-filemanager';
import { Component } from '@angular/core';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager id='file-manager' [ajaxSettings]='ajaxSettings' height="375px">
  </ejs-filemanager>`
})
export class AppComponent {
  public hostUrl: string = 'url';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations'
  };
}
```

**Available Services:**
| Service | Description |
|---------|-------------|
| `DetailsViewService` | Grid view with sortable columns (Name, Date Modified, Type, Size) |
| `NavigationPaneService` | Left sidebar with folder hierarchy tree |
| `ToolbarService` | Top toolbar with action buttons (New Folder, Upload, Delete, etc.) |
| `VirtualizationService ` | Virtual scrolling for large file lists (use with ` [enableVirtualization]='true'`) |

> **Important:** At least `DetailsViewService`, `NavigationPaneService`, and `ToolbarService` are required for full functionality. `VirtualizationService` is optional for performance optimization with large datasets.

## AJAX Settings Configuration

### Basic AJAX Configuration

The `ajaxSettings` property defines server endpoints for file operations:

```typescript
public ajaxSettings: object = {
  url: 'url'
};
```

### Complete AJAX Configuration

Configure all available endpoints:

```typescript
public ajaxSettings: object = {
  // Main file operations endpoint (read, create, delete, rename, move, copy)
  url: 'url',
  
  // Download endpoint (for file downloads and multi-file ZIP downloads)
  downloadUrl: 'url',
  
  // Upload endpoint (for file uploads)
  uploadUrl: 'url',
  
  // Image preview endpoint (for displaying image thumbnails)
  getImageUrl: 'url'
};
```

### URL Scheme

For local development, use relative paths:

```typescript
public ajaxSettings: object = {
  url: '/api/FileManager/FileOperations',
  downloadUrl: '/api/FileManager/Download',
  uploadUrl: '/api/FileManager/Upload',
  getImageUrl: '/api/FileManager/GetImage'
};
```

## Initial View and Rendering

### Set Initial View Mode

The File Manager can start in either Details view or Large Icons view:

```typescript
@Component({
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [view]='view'
    (created)='onCreate($event)'
    height="375px">
  </ejs-filemanager>`
})
export class AppComponent {
  public view: string = 'LargeIcons';  // Default: 'LargeIcons' or 'Details'
  
  public ajaxSettings: object = {
    url: '/api/FileManager/FileOperations',
    getImageUrl: '/api/FileManager/GetImage',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  // Triggered when component is successfully created
  onCreate(args: any) {
    console.log('File Manager has been created successfully');
  }
}
```

### Starting Path

Specify the initial directory path:

```typescript
@Component({
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [path]='currentPath'>
  </ejs-filemanager>`
})
export class AppComponent {
  public currentPath: string = '/Music';
  public ajaxSettings: object = {...};
}
```

## Complete Example

### Full Working Setup

```typescript
// app.component.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { Component } from '@angular/core';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [view]='view' 
    [navigationPaneSettings]='navigationPaneSettings'
    [toolbarSettings]='toolbarSettings'
    (created)='onCreate($event)'
    height="375px">
  </ejs-filemanager>`
})
export class AppComponent {
  public view?: string;
  public ajaxSettings?: object;
  public navigationPaneSettings?: object;
  public toolbarSettings?: object;
  public hostUrl: string = 'url';

  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
    this.view = 'Details';
    this.navigationPaneSettings = {};
    this.toolbarSettings = {};
  }

  onCreate(args: any) {
    console.log('File Manager has been created successfully');
  }
}
```

```typescript
// app.component.css
ejs-filemanager {
  display: block;
}
```

### Run the Application

Start your development server:

```sh
npm start
```

The application will be available at `http://localhost:4200`

---

**Next:** After initialization, proceed to [file-operations.md](file-operations.md) to implement core file operations.
