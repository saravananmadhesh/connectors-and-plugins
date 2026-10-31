# Toolbar and Context Menu in Syncfusion Angular File Manager

## Table of Contents
- [Toolbar Overview](#toolbar-overview)
- [Default Toolbar Items](#default-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Context Menu](#context-menu)
- [Show/Hide Items](#showhide-items)
- [Disable Items](#disable-items)
- [Complete Example](#complete-example)

## Toolbar Overview

The toolbar contains buttons for file operations and view controls. It's displayed at the top of the File Manager.

### Default Toolbar

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, ToolbarService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [ToolbarService],
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
  
  // Default toolbar items automatically displayed:
  // NewFolder, Upload, Download, Delete, Refresh, View, Details
}
```

## Default Toolbar Items

| Item Name | Function | Icon |
|-----------|----------|------|
| **NewFolder** | Create new folder | + icon |
| **Upload** | Upload files | Upload icon |
| **Download** | Download selected files | Download icon |
| **Delete** | Delete selected files | Trash icon |
| **Refresh** | Refresh folder contents | Refresh icon |
| **View** | Toggle view mode | View icon |
| **Details** | Show file details | Details icon |
| **Cut** | Cut files for moving | Cut icon |
| **Copy** | Copy files | Copy icon |
| **Paste** | Paste cut/copied files | Paste icon |
| **Rename** | Rename selected item | Rename icon |
| **SortBy** | Sort options menu | Sort icon |
| **Selection** | Multi-select options | Select icon |

## Custom Toolbar Items

### Add Custom Button

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    #fileManager
    [ajaxSettings]='ajaxSettings'
    [toolbarSettings]='toolbarSettings'
    height="500px">
    <e-toolbaritems>
      <!-- Default items -->
      <e-toolbaritem name="NewFolder"></e-toolbaritem>
      <e-toolbaritem name="Upload"></e-toolbaritem>
      <e-toolbaritem name="Download"></e-toolbaritem>
      
      <!-- Custom separator -->
      <e-toolbaritem name="separator"></e-toolbaritem>
      
      <!-- Custom button -->
      <e-toolbaritem 
        name="CustomRefresh"
        text="Full Refresh"
        prefixIcon="e-icons e-refresh"
        tooltipText="Full Refresh">
      </e-toolbaritem>
      
      <!-- Custom with template -->
      <e-toolbaritem name="CustomAction">
        <ng-template #template>
          <button (click)='customAction()' class='custom-btn'>
            Custom Action
          </button>
        </ng-template>
      </e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  public toolbarSettings = {};

  customAction() {
    console.log('Custom action executed');
    // Perform custom logic
  }
}
```

### Modify Default Item Properties

```typescript
@Component({
  template: `<ejs-filemanager 
    [toolbarSettings]='toolbarSettings'
    height="500px">
    <e-toolbaritems>
      <!-- Customize NewFolder item -->
      <e-toolbaritem 
        name="NewFolder"
        text="Create Folder"
        prefixIcon="e-icons e-folder-new"
        tooltipText="Create a new folder">
      </e-toolbaritem>
      
      <!-- Customize Upload -->
      <e-toolbaritem 
        name="Upload"
        text="Add Files"
        tooltipText="Upload files to current folder">
      </e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {
  public toolbarSettings = {};
}
```

## Context Menu

### Default Context Menu

The context menu appears on right-click with options based on selection:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
  
  // Default context menu items:
  // Folder: Open, Cut, Copy, Paste, Delete, Rename, Details
  // File: Open, Cut, Copy, Delete, Rename, Details
}
```

### Customize Context Menu

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [contextMenuSettings]='contextMenuSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  public contextMenuSettings = {
    // Show only specific items
    file: [
      { text: 'Open', iconCss: 'e-icons e-folder-open' },
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { text: 'Delete', iconCss: 'e-icons e-delete' }
    ],
    folder: [
      { text: 'Open', iconCss: 'e-icons e-folder-open' },
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', iconCss: 'e-icons e-paste' },
      { text: 'Delete', iconCss: 'e-icons e-delete' }
    ]
  };
}
```

### Custom Context Menu Items

```typescript
@Component({
  template: `<ejs-filemanager 
    [contextMenuSettings]='contextMenuSettings'
    (beforeContextMenuOpen)='onContextMenuOpen($event)'
    (contextMenuClick)='onContextMenuClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public contextMenuSettings = {
    file: [
      { text: 'Open', iconCss: 'e-icons e-folder-open' },
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { separator: true },
      { text: 'Share', iconCss: 'e-icons e-share' },  // Custom item
      { text: 'Archive', iconCss: 'e-icons e-zip' }   // Custom item
    ]
  };

  onContextMenuOpen(args: any) {
    // Customize menu based on selection
    if (args.fileDetails.size > 10 * 1024 * 1024) {
      // Large file - show archive option
    }
  }

  onContextMenuClick(args: any) {
    if (args.item.text === 'Share') {
      console.log('Share clicked for:', args.fileDetails.name);
      // Handle custom action
    } else if (args.item.text === 'Archive') {
      console.log('Archive clicked');
      // Handle custom action
    }
  }
}
```

## Show/Hide Items

### Conditionally Display Items

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    #fileManager
    [toolbarSettings]='toolbarSettings'
    height="500px">
    <e-toolbaritems>
      <e-toolbaritem name="NewFolder"></e-toolbaritem>
      <e-toolbaritem name="Upload" [visible]="allowUpload"></e-toolbaritem>
      <e-toolbaritem name="Download" [visible]="allowDownload"></e-toolbaritem>
      <e-toolbaritem name="Delete" [visible]="allowDelete"></e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  // Control visibility based on permissions
  public allowUpload: boolean = true;
  public allowDownload: boolean = true;
  public allowDelete: boolean = false;  // Admins only

  public toolbarSettings = {};

  setPermissions(isAdmin: boolean) {
    this.allowDelete = isAdmin;
  }
}
```

## Disable Items

### Disable Toolbar Items

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [toolbarSettings]='toolbarSettings'
    (toolbarItemClick)='onToolbarClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public toolbarSettings = {
    items: [
      'NewFolder',
      { name: 'Upload', disabled: true },  // Disable upload
      'Download',
      { name: 'Delete', disabled: false }   // Enable delete
    ]
  };

  onToolbarClick(args: any) {
    // Handle toolbar action
  }
}
```

### Dynamic Enable/Disable Based on Selection

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  template: `<ejs-filemanager 
    #fileManager
    (fileSelect)='onFileSelection($event)'
    height="500px">
    <e-toolbaritems>
      <e-toolbaritem name="Download" [disabled]="!hasSelection"></e-toolbaritem>
      <e-toolbaritem name="Delete" [disabled]="!hasSelection"></e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public hasSelection: boolean = false;

  onFileSelection(args: any) {
    // Enable/disable buttons based on selection
    this.hasSelection = args.fileDetails && args.fileDetails.length > 0;
  }
}
```

## Complete Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule, ToolbarService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [ToolbarService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    #fileManager
    [ajaxSettings]='ajaxSettings'
    [toolbarSettings]='toolbarSettings'
    [contextMenuSettings]='contextMenuSettings'
    (beforeSend)='onBeforeSend($event)'
    (toolbarItemClick)='onToolbarClick($event)'
    (contextMenuClick)='onContextMenuClick($event)'
    height="500px">
    <e-toolbaritems>
      <e-toolbaritem name="NewFolder"></e-toolbaritem>
      <e-toolbaritem name="Upload"></e-toolbaritem>
      <e-toolbaritem name="Download"></e-toolbaritem>
      <e-toolbaritem name="separator"></e-toolbaritem>
      <e-toolbaritem name="Delete"></e-toolbaritem>
      <e-toolbaritem name="separator"></e-toolbaritem>
      <e-toolbaritem name="View"></e-toolbaritem>
      <e-toolbaritem name="Details"></e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };

  public toolbarSettings = {};

  public contextMenuSettings = {
    file: [
      { text: 'Open', iconCss: 'e-icons e-folder-open' },
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { text: 'Delete', iconCss: 'e-icons e-delete' }
    ],
    folder: [
      { text: 'Open', iconCss: 'e-icons e-folder-open' },
      { text: 'Cut', iconCss: 'e-icons e-cut' },
      { text: 'Copy', iconCss: 'e-icons e-copy' },
      { text: 'Paste', iconCss: 'e-icons e-paste' },
      { text: 'Delete', iconCss: 'e-icons e-delete' },
      { text: 'Rename', iconCss: 'e-icons e-rename' }
    ]
  };

  onBeforeSend(args: any) {
    console.log('File operation:', args.action);
  }

  onToolbarClick(args: any) {
    console.log('Toolbar item clicked:', args.item.text);
  }

  onContextMenuClick(args: any) {
    console.log('Context menu item:', args.item.text, 'File:', args.fileDetails.name);
  }
}
```

---

**Next:** Explore advanced features at [advanced-features.md](advanced-features.md) or customize styling at [customization-styling.md](customization-styling.md).
