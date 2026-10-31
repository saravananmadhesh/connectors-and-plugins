# Advanced Features in Syncfusion Angular File Manager

## Table of Contents
- [Multi-Selection](#multi-selection)
- [Range Selection](#range-selection)
- [State Persistence](#state-persistence)
- [Component Lifecycle](#component-lifecycle)
- [Event Handling](#event-handling)
- [File Operation Events](#file-operation-events)
- [Drag and Drop Events](#drag-and-drop-events)
- [Dialog and Menu Events](#dialog-and-menu-events)
- [Ajax Events](#ajax-events)
- [Programmatic Methods](#programmatic-methods)
- [Complete Advanced Example](#complete-advanced-example)

## Multi-Selection

### Enable Multi-Selection

Allow users to select multiple files at once:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [allowMultiSelection]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
  
  // Users can:
  // - Click files to select
  // - Ctrl+Click to select additional files
  // - Shift+Click to select range
}
```

### Work with Selected Items

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <div class='selection-info'>
      <span>Selected: {{ selectedCount }}</span>
      <span>Total Size: {{ totalSize | number }}</span>
      <button (click)='downloadSelected()' [disabled]='selectedCount === 0'>
        Download Selected
      </button>
    </div>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [allowMultiSelection]='true'
      (fileSelect)='onFileSelect($event)'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public selectedCount: number = 0;
  public totalSize: number = 0;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onFileSelect(args: any) {
    const selected = this.fileManager?.selectedItems || [];
    this.selectedCount = selected.length;
    
    // Calculate total size of selected files
    this.totalSize = selected.reduce((sum, file) => 
      sum + (file.size || 0), 0);
  }

  downloadSelected() {
    const selected = this.fileManager?.selectedItems || [];
    if (selected.length > 0) {
      console.log('Downloading:', selected.map(f => f.name));
      // Download will be triggered automatically by toolbar
    }
  }
}
```

### Select/Clear All

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  template: `<div>
    <button (click)='selectAll()'>Select All</button>
    <button (click)='clearSelection()'>Clear Selection</button>
    <button (click)='invertSelection()'>Invert Selection</button>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  selectAll() {
    this.fileManager?.selectAll();
  }

  clearSelection() {
    this.fileManager?.clearSelection();
  }

  invertSelection() {
    const all = this.fileManager?.getFiles() || [];
    const selected = new Set(
      (this.fileManager?.selectedItems || []).map(f => f.id)
    );
    
    const toSelect = all
      .filter(f => !selected.has(f.id))
      .map(f => f.id);
    
    this.fileManager?.clearSelection();
    this.fileManager?.selectedItems = toSelect as any;
  }
}
```

## Range Selection

### Enable Range Selection (Mouse Drag)

Enable Windows Explorer-style drag-based selection:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [enableRangeSelection]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  // Users can now:
  // - Drag over multiple files to select them
  // - Works like Windows Explorer range selection
}
```

## State Persistence

### Enable Persistence

Maintain view, path, and selected items across page reload:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [enablePersistence]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  // File Manager will save and restore:
  // - Current view (Details or LargeIcons)
  // - Current path
  // - Selected items
  // Using localStorage
}
```

### What Gets Persisted

| Property | Persisted | Example |
|----------|-----------|---------|
| **View** | Yes | Details view preference |
| **Path** | Yes | /Music/Rock |
| **SelectedItems** | Yes | [file1.txt, file2.txt] |
| **Scroll Position** | No | Not restored |

## Component Lifecycle

### Initialization Event

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (created)='onCreate($event)'
    (destroyed)='onDestroy($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onCreate(args: any) {
    console.log('File Manager created successfully');
    // Initialize custom features
  }

  onDestroy(args: any) {
    console.log('File Manager destroyed');
    // Clean up resources
  }
}
```

## Event Handling

### Understanding File Manager Events

The File Manager provides comprehensive events at different lifecycle stages:

- **Selection Events**: `fileSelect`, `fileSelection` (before selection)
- **File Operation Events**: `beforeDelete`, `delete`, `beforeRename`, `beforeFolderCreate`, `folderCreate`, `beforeMove`
- **Opening Events**: `fileOpen`, `fileLoad` (before rendering)
- **Drag & Drop Events**: `fileDragStart`, `fileDragging`, `fileDragStop`, `fileDropped`
- **Dialog Events**: `beforePopupOpen`, `beforePopupClose`
- **Menu Events**: `menuOpen`, `menuClose`, `menuClick`
- **Server Events**: `beforeSend`, `success`, `failure`, `beforeDownload`, `beforeImageLoad`
- **Lifecycle Events**: `created`, `destroyed`

## File Operation Events

### Prevent Operations with beforeDelete

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { DeleteEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeDelete)='onBeforeDelete($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onBeforeDelete(args: DeleteEventArgs) {
    const fileNames = args.fileDetails.map(f => f.name);
    
    // Prevent deletion of system files
    if (fileNames.some(name => name.startsWith('.'))) {
      args.cancel = true;
      alert('Cannot delete system files');
    }
    
    // Prevent deletion of folders with special names
    if (fileNames.includes('System') || fileNames.includes('Program Files')) {
      args.cancel = true;
      alert('Cannot delete protected folders');
    }
  }
}
```

### React After Delete

```typescript
export class AppComponent {
  onDelete(args: DeleteEventArgs) {
    const deletedItems = args.fileDetails.map(f => f.name);
    console.log('Deleted items:', deletedItems);
    
    // Log to server
    fetch('/api/audit-log', {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        items: deletedItems,
        timestamp: new Date()
      })
    });
  }
}
```

### Handle Rename Events

```typescript
export class AppComponent {
  onBeforeRename(args: RenameEventArgs) {
    // Validate new name
    const invalidChars = /[<>:"|?*]/;
    if (invalidChars.test(args.newName)) {
      args.cancel = true;
      alert('Invalid characters in filename');
    }
    
    // Prevent renaming system files
    if (args.fileDetails.name.startsWith('.')) {
      args.cancel = true;
      alert('Cannot rename system files');
    }
  }
}
```

### Handle Folder Creation

```typescript
export class AppComponent {
  onBeforeFolderCreate(args: FolderCreateEventArgs) {
    // Validate folder name
    if (args.folderName.length === 0) {
      args.cancel = true;
      alert('Folder name cannot be empty');
    }
    
    // Limit folder creation in certain directories
    if (this.fileManager?.path === '/System') {
      args.cancel = true;
      alert('Cannot create folders in System directory');
    }
  }
  
  onFolderCreate(args: FolderCreateEventArgs) {
    console.log('Folder created:', args.folderName);
    // Update UI or trigger other actions
  }
}
```

## Drag and Drop Events

### Prevent Specific Drops

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { FileDragEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [allowDragAndDrop]='true'
    (fileDragStop)='onBeforeDrop($event)'
    (fileDropped)='onAfterDrop($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onBeforeDrop(args: FileDragEventArgs) {
    // Prevent dropping into read-only folders
    if (args.targetData?.permission?.write === false) {
      args.cancel = true;
      alert('Cannot drop into read-only folder');
    }
    
    // Prevent dropping large files
    const totalSize = args.fileDetails.reduce((sum, f) => sum + (f.size || 0), 0);
    if (totalSize > 500 * 1024 * 1024) {  // 500MB
      args.cancel = true;
      alert('Total drop size exceeds 500MB limit');
    }
  }

  onAfterDrop(args: FileDragEventArgs) {
    console.log('Files dropped:', args.fileDetails.map(f => f.name));
    console.log('Target folder:', args.targetData.name);
  }
}
```

### Track Drag Progress

```typescript
export class AppComponent {
  isDragging: boolean = false;

  onDragStart(args: FileDragEventArgs) {
    this.isDragging = true;
    console.log('Dragging started:', args.fileDetails);
  }

  onDragging(args: FileDragEventArgs) {
    // Visual feedback during drag
    console.log('Dragging over:', args.targetData);
  }

  onDragStop(args: FileDragEventArgs) {
    this.isDragging = false;
    console.log('Drag stopped');
  }
}
```

## Dialog and Menu Events

### Customize Dialog Behavior

```typescript
import { Component } from '@angular/core';
import { BeforePopupOpenCloseEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforePopupOpen)='onBeforePopupOpen($event)'
    (beforePopupClose)='onBeforePopupClose($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  onBeforePopupOpen(args: BeforePopupOpenCloseEventArgs) {
    // Modify dialog content
    console.log('Dialog type:', args.popupType);
    
    // Prevent certain dialogs
    if (args.popupType === 'Delete' && this.isRestrictedMode) {
      args.cancel = true;
    }
  }

  onBeforePopupClose(args: BeforePopupOpenCloseEventArgs) {
    console.log('Dialog closing:', args.popupType);
  }

  isRestrictedMode: boolean = false;
}
```

### Handle Context Menu

```typescript
import { Component } from '@angular/core';
import { MenuClickEventArgs, MenuOpenEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (menuOpen)='onMenuOpen($event)'
    (menuClick)='onMenuClick($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  onMenuOpen(args: MenuOpenEventArgs) {
    // Customize menu items based on selection
    const selectedFiles = args.fileDetails;
    
    // Hide items for certain file types
    if (selectedFiles[0]?.type === '.exe') {
      args.fileContextMenu?.disableItems(['Execute']);
    }
  }

  onMenuClick(args: MenuClickEventArgs) {
    console.log('Menu item clicked:', args.itemText);
    
    // Custom actions for menu items
    if (args.itemText === 'Custom Action') {
      this.performCustomAction();
    }
  }

  performCustomAction() {
    console.log('Custom action performed');
  }
}
```

### Customize Toolbar

```typescript
import { Component } from '@angular/core';
import { ToolbarClickEventArgs, ToolbarCreateEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (toolbarCreate)='onToolbarCreate($event)'
    (toolbarClick)='onToolbarClick($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    // Modify toolbar at creation time
    console.log('Toolbar items:', args.items);
    
    // Add custom button or remove items
    args.items?.push({
      prefixIcon: 'e-icons e-print',
      text: 'Print',
      id: 'print'
    });
  }

  onToolbarClick(args: ToolbarClickEventArgs) {
    if (args.item?.id === 'print') {
      this.printFiles();
    }
  }

  printFiles() {
    console.log('Printing selected files');
  }
}
```

## Ajax Events

### Success and Failure Events

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <div class='status-bar'>{{ statusMessage }}</div>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      (success)='onSuccess($event)'
      (failure)='onFailure($event)'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .status-bar {
      padding: 10px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
  `]
})
export class AppComponent {
  public statusMessage: string = 'Ready';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onSuccess(args: any) {
    this.statusMessage = `✓ ${args.action} completed successfully`;
    
    // Log different operation types
    switch(args.action) {
      case 'read':
        console.log('Files loaded:', args.result.length);
        break;
      case 'create':
        console.log('Folder created:', args.result.name);
        break;
      case 'delete':
        console.log('Items deleted');
        break;
    }
  }

  onFailure(args: any) {
    this.statusMessage = `✗ ${args.action} failed: ${args.error?.statusText}`;
    console.error('Operation failed:', args);
  }
}
```

### Before Send Event

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onBeforeSend(args: any) {
    // Modify request before sending
    args.ajaxSettings.beforeSend = (requestArgs: any) => {
      // Add authentication
      requestArgs.httpRequest.setRequestHeader('Authorization', 'Bearer token123');
      
      // Add custom headers
      requestArgs.httpRequest.setRequestHeader('X-Custom-Header', 'value');
      
      // Modify request data
      const data = JSON.parse(requestArgs.data);
      data.userId = '12345';
      data.timestamp = new Date().toISOString();
      requestArgs.data = JSON.stringify(data);
    };
  }
}
```

### Event Properties

```typescript
// success/failure event args
{
  action: string,           // Operation: read, create, delete, etc.
  result?: any,            // Server response data
  error?: {
    statusCode: number,
    statusText: string,
    message: string
  }
}

// beforeSend event args
{
  ajaxSettings: {
    beforeSend: Function   // Modify HTTP request
  }
}
```

## Programmatic Methods

### File and Folder Operations Methods

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <div class='operations'>
      <button (click)='createNewFolder()'>Create Folder</button>
      <button (click)='renameSelected()'>Rename</button>
      <button (click)='deleteSelected()'>Delete</button>
      <button (click)='downloadSelected()'>Download</button>
    </div>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  // Create a new folder
  createNewFolder() {
    // With name - creates directly
    this.fileManager?.createFolder('NewFolder');
    
    // Without name - opens dialog
    // this.fileManager?.createFolder();
  }

  // Rename selected file/folder
  renameSelected() {
    const selected = this.fileManager?.selectedItems;
    if (selected && selected.length === 1) {
      this.fileManager?.renameFile(selected[0] as any);
    }
  }

  // Delete selected items
  deleteSelected() {
    if (confirm('Delete selected items?')) {
      this.fileManager?.deleteFiles();
    }
  }

  // Download selected items
  downloadSelected() {
    this.fileManager?.downloadFiles();
  }
}
```

### Navigate and Refresh Methods

```typescript
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  // Open a specific file/folder by ID
  openFile(fileId: string) {
    this.fileManager?.openFile(fileId);
  }

  // Go back one level
  goBack() {
    this.fileManager?.traverseBackward();
  }

  // Refresh current folder
  refreshCurrentFolder() {
    this.fileManager?.refreshFiles();
  }

  // Refresh entire layout
  refreshLayout() {
    this.fileManager?.refreshLayout();
  }

  // Get selected files details
  getSelectedFilesDetails() {
    const files = this.fileManager?.getSelectedFiles();
    console.log('Selected files:', files);
    return files;
  }
}
```

### Selection Methods

```typescript
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  // Select all files in current folder
  selectAllFiles() {
    this.fileManager?.selectAll();
  }

  // Deselect all
  deselectAll() {
    this.fileManager?.clearSelection();
  }

  // Select files by name
  selectByName(names: string[]) {
    this.fileManager?.clearSelection();
    const nameSet = new Set(names);
    const files = this.fileManager?.getFiles() || [];
    
    files.forEach(file => {
      if (nameSet.has(file.name)) {
        // File manager handles selection internally
      }
    });
  }
}
```

### Toolbar and Menu Methods

```typescript
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  // Enable specific toolbar items
  enableToolbarItems(items: string[]) {
    this.fileManager?.enableToolbarItems(items);
  }

  // Disable specific toolbar items
  disableToolbarItems(items: string[]) {
    this.fileManager?.disableToolbarItems(items);
  }

  // Get toolbar item index
  getToolbarIndex(itemName: string) {
    return this.fileManager?.getToolbarItemIndex(itemName);
  }

  // Enable context menu items
  enableMenuItems(items: string[]) {
    this.fileManager?.enableMenuItems(items);
  }

  // Disable context menu items
  disableMenuItems(items: string[]) {
    this.fileManager?.disableMenuItems(items);
  }

  // Get menu item index
  getMenuIndex(itemName: string) {
    return this.fileManager?.getMenuItemIndex(itemName);
  }
}
```

### Dialog and Filter Methods

```typescript
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  // Close any open dialogs
  closeDialogs() {
    this.fileManager?.closeDialog();
  }

  // Open upload dialog
  openUploadDialog() {
    this.fileManager?.uploadFiles();
  }

  // Apply custom filtering
  applyFilter(filterCriteria: any) {
    this.fileManager?.filterFiles(filterCriteria);
  }

  // Filter by file type
  filterByType(extension: string) {
    this.fileManager?.filterFiles({
      action: 'filter',
      filterData: {
        type: extension
      }
    });
  }
}
```

### Component Lifecycle Methods

```typescript
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  // Destroy the component
  destroy() {
    this.fileManager?.destroy();
  }

  // The created and destroyed events are handled through event bindings
  onCreate() {
    console.log('File Manager initialized');
  }

  onDestroy() {
    console.log('File Manager destroyed');
  }
}
```

## Refresh File List

Refresh the current folder contents programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <button (click)='refresh()'>Refresh Files</button>
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  refresh() {
    // Reload the current folder's files from server
    this.fileManager?.refresh();
  }
}
```

### Get All Files

```typescript
getFiles() {
  const allFiles = this.fileManager?.getFiles();
  console.log('All files:', allFiles);
}
```

## Programmatic Refresh (Continued)

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <button (click)='refresh()'>Refresh Folder</button>
    <button (click)='refreshAll()'>Refresh All</button>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  refresh() {
    // Refresh current folder
    this.fileManager?.refresh();
  }

  refreshAll() {
    // Full refresh - go to root and reload
    this.fileManager?.path = '/';
    this.fileManager?.refresh();
  }
}
```

## Complete Advanced Example with All Features

### Full-Featured File Manager Component

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class='advanced-demo'>
    <div class='header'>
      <h2>Advanced File Manager</h2>
      <div class='actions'>
        <button (click)='selectAll()'>Select All</button>
        <button (click)='clearSelection()'>Clear</button>
        <span class='selection-stats'>
          {{ selectedCount }} selected ({{ formattedSize }})
        </span>
      </div>
    </div>
    
    <div class='status-bar' [ngClass]='statusClass'>
      {{ statusMessage }}
    </div>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [enablePersistence]='true'
      [allowMultiSelection]='true'
      (created)='onCreate($event)'
      (fileSelection)='onSelection($event)'
      (success)='onSuccess($event)'
      (failure)='onFailure($event)'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .advanced-demo {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .header {
      padding: 15px;
      background-color: #f8f9fa;
      border-bottom: 1px solid #ddd;
    }
    
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      align-items: center;
    }
    
    .status-bar {
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      font-weight: 500;
    }
    
    .status-bar.success {
      background-color: #d4edda;
      color: #155724;
    }
    
    .status-bar.error {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .selection-stats {
      margin-left: auto;
      font-size: 0.9em;
      color: #666;
    }
  `]
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public selectedCount: number = 0;
  public totalSize: number = 0;
  public statusMessage: string = 'Ready';
  public statusClass: string = '';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  get formattedSize(): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = this.totalSize;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  onCreate(args: any) {
    this.statusMessage = 'File Manager ready';
  }

  onSelection(args: any) {
    const selected = this.fileManager?.selectedItems || [];
    this.selectedCount = selected.length;
    this.totalSize = selected.reduce((sum, file) => 
      sum + (file.size || 0), 0);
  }

  onSuccess(args: any) {
    this.statusClass = 'success';
    this.statusMessage = `✓ ${args.action} completed`;
    setTimeout(() => this.statusClass = '', 3000);
  }

  onFailure(args: any) {
    this.statusClass = 'error';
    this.statusMessage = `✗ ${args.action} failed`;
    setTimeout(() => this.statusClass = '', 3000);
  }

  selectAll() {
    this.fileManager?.selectAll();
  }

  clearSelection() {
    this.fileManager?.clearSelection();
  }
}
```

---

**Next:** Customize appearance at [customization-styling.md](customization-styling.md) or add localization at [localization-and-rtl.md](localization-and-rtl.md).
