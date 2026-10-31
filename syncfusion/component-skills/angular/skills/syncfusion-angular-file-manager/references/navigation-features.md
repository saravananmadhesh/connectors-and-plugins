# Navigation Features in Syncfusion Angular File Manager

## Table of Contents
- [Breadcrumb Navigation](#breadcrumb-navigation)
- [Navigation Pane](#navigation-pane)
- [Path Specification](#path-specification)
- [Folder Hierarchy](#folder-hierarchy)
- [Navigation Configuration](#navigation-configuration)

## Breadcrumb Navigation

### Overview

Breadcrumb navigation displays the current folder path hierarchy below the toolbar. It allows users to:
- Track their current location in the file system
- Click on any breadcrumb item to navigate to that folder
- Understand the folder structure at a glance

Example breadcrumb: **Root > Documents > Work > Reports**

### Implementation

Breadcrumb is included by default when initializing File Manager:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
  // Breadcrumb automatically displayed
}
```

### Breadcrumb Navigation Example

```typescript
// User is in: /Music/Rock
// Breadcrumb shows: Home > Music > Rock

// Click "Home" → Navigate to root
// Click "Music" → Navigate to /Music
// Click "Rock" → Stay at /Music/Rock

// Navigate to new folder → Breadcrumb updates automatically
```

### Styling Breadcrumb

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    cssClass='custom-filemanager'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .custom-filemanager .e-fe-breadcrumb {
      padding: 10px 15px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    
    :host ::ng-deep .custom-filemanager .e-fe-breadcrumb-item {
      color: #007bff;
      cursor: pointer;
    }
    
    :host ::ng-deep .custom-filemanager .e-fe-breadcrumb-item:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Navigation Pane

### Overview

The Navigation Pane is a left sidebar that displays the folder hierarchy as a tree view. It enables:
- Quick access to frequently used folders
- Visual representation of folder structure
- Easy folder selection and navigation
- Show/hide toggle for more screen space

### Implementation

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [navigationPaneSettings]='navigationPaneSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public navigationPaneSettings = {
    // Configuration object (empty for default behavior)
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Navigation Pane Features

- **Folder Tree**: Hierarchical display of all folders
- **Expand/Collapse**: Click arrow to expand/collapse folder contents
- **Click to Navigate**: Click any folder to navigate to it
- **Show Favorites**: Can highlight frequently accessed folders
- **Resizable**: Drag border to adjust pane width

### Navigation Pane Settings Properties

Configure the Navigation Pane behavior with these properties:

```typescript
public navigationPaneSettings = {
  // Maximum width of the Navigation Pane (default: 'auto')
  maxWidth?: string;  // e.g., '850px'
  
  // Minimum width of the Navigation Pane (default: '140px')
  minWidth?: string;  // e.g., '140px'
  
  // Show or hide the Navigation Pane (default: true)
  visible?: boolean;
  
  // Sort order for folders in the pane (default: 'Ascending')
  sortOrder?: 'Ascending' | 'Descending';
};
```

### Customizing Navigation Pane

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [navigationPaneSettings]='navigationPaneSettings'
    cssClass='custom-filemanager'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .custom-filemanager .e-navigation-pane {
      width: 250px;
      border-right: 1px solid #ddd;
      background-color: #fafafa;
    }
    
    :host ::ng-deep .custom-filemanager .e-navigation-pane-item {
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 4px;
    }
    
    :host ::ng-deep .custom-filemanager .e-navigation-pane-item:hover {
      background-color: #e8e8e8;
    }
    
    :host ::ng-deep .custom-filemanager .e-navigation-pane-item.selected {
      background-color: #007bff;
      color: white;
    }
  `]
})
export class AppComponent {
  public navigationPaneSettings = {
    maxWidth: '400px',
    minWidth: '160px',
    visible: true,
    sortOrder: 'Ascending'
  };
  
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Path Specification

### Setting Current Path

Specify the initial folder path when creating the File Manager:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [path]='currentPath'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public currentPath: string = '/Music';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Dynamic Path Navigation

Change path programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <button (click)='navigateTo("/Documents")'>Documents</button>
    <button (click)='navigateTo("/Music")'>Music</button>
    <button (click)='navigateTo("/Pictures")'>Pictures</button>
    <button (click)='navigateToRoot()'>Home</button>
    
    <ejs-filemanager 
      #fileManager
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [path]='currentPath'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public currentPath: string = '/';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  navigateTo(path: string) {
    this.currentPath = path;
    // File Manager automatically updates with new path
  }

  navigateToRoot() {
    this.currentPath = '/';
  }
}
```

### Path Events

Listen to path changes:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (pathChanged)='onPathChanged($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onPathChanged(args: any) {
    console.log('Navigated to:', args.path);
    // Update breadcrumb, sidebar, or other UI elements
  }
}
```

## Folder Hierarchy

### Understanding Hierarchy

Folder hierarchy represents the nested structure of directories:

```
Root (/)
├── Documents
│   ├── Work
│   │   └── Projects
│   └── Personal
├── Music
│   ├── Rock
│   └── Jazz
└── Pictures
    ├── Vacation
    └── Family
```

### Navigation Through Hierarchy

```typescript
// 1. Start at: /
// 2. User clicks Documents folder
//    - Current path: /Documents
//    - Breadcrumb: Home > Documents
//
// 3. User clicks Work folder inside Documents
//    - Current path: /Documents/Work
//    - Breadcrumb: Home > Documents > Work
//
// 4. User clicks on Projects
//    - Current path: /Documents/Work/Projects
//    - Breadcrumb: Home > Documents > Work > Projects
```

### Going Up in Hierarchy

Navigate to parent folder:

```typescript
@Component({
  template: `<button (click)='goToParent()'>Up</button>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public currentPath: string = '/Documents/Work/Projects';

  goToParent() {
    // Get parent path from current path
    const parts = this.currentPath.split('/').filter(p => p);
    parts.pop(); // Remove last folder
    const parentPath = '/' + parts.join('/');
    
    this.currentPath = parentPath || '/';
  }
}
```

## Navigation Configuration

### Complete Navigation Setup

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<div class='file-manager-wrapper'>
    <div class='navigation-buttons'>
      <button (click)='goHome()'>Home</button>
      <button (click)='goBack()'>Back</button>
      <button (click)='goForward()'>Forward</button>
      <input type='text' [(ngModel)]='pathInput' placeholder='Enter path'>
      <button (click)='navigateTo(pathInput)'>Go</button>
    </div>
    
    <ejs-filemanager 
      #fileManager
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [path]='currentPath'
      [navigationPaneSettings]='navigationPaneSettings'
      (pathChanged)='onPathChanged($event)'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .file-manager-wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .navigation-buttons {
      padding: 10px;
      background-color: #f5f5f5;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    
    .navigation-buttons button {
      padding: 8px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .navigation-buttons input {
      padding: 8px;
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public currentPath: string = '/';
  public pathInput: string = '/';
  public navigationHistory: string[] = ['/'];
  public historyIndex: number = 0;

  public navigationPaneSettings = {};

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  goHome() {
    this.navigateTo('/');
  }

  goBack() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.currentPath = this.navigationHistory[this.historyIndex];
    }
  }

  goForward() {
    if (this.historyIndex < this.navigationHistory.length - 1) {
      this.historyIndex++;
      this.currentPath = this.navigationHistory[this.historyIndex];
    }
  }

  navigateTo(path: string) {
    this.currentPath = path;
    this.pathInput = path;
    
    // Add to history (remove forward history if navigating to new path)
    this.navigationHistory = this.navigationHistory.slice(0, this.historyIndex + 1);
    this.navigationHistory.push(path);
    this.historyIndex = this.navigationHistory.length - 1;
  }

  onPathChanged(args: any) {
    console.log('Path changed to:', args.path);
    this.navigateTo(args.path);
  }
}
```

---

**Next:** Explore data structures at [data-structures.md](data-structures.md) or implement drag-and-drop at [drag-and-drop.md](drag-and-drop.md).
