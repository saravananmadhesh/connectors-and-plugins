# Drag and Drop in Syncfusion Angular File Manager

## Table of Contents
- [Overview](#overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Drag and Drop Behavior](#drag-and-drop-behavior)
- [Drag and Drop Events](#drag-and-drop-events)
- [Constraints and Restrictions](#constraints-and-restrictions)
- [Advanced Scenarios](#advanced-scenarios)
- [Best Practices](#best-practices)

## Overview

Drag and drop functionality allows users to intuitively move files and folders by clicking and dragging them to new locations. This enhances user productivity and provides a familiar file management experience.

## Enabling Drag and Drop

### Basic Setup

Enable drag and drop with a simple boolean property:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [allowDragAndDrop]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Default Behavior

When enabled, users can:
- Drag individual files to any folder
- Drag multiple selected files together
- Drag folders to other locations
- Drag across views (Details view, Large Icons view)
- Get visual feedback showing valid drop targets

## Drag and Drop Behavior

### Visual Feedback

- **Hover Effect**: Drop target becomes highlighted during drag
- **Cursor Change**: Shows copy/move indicator
- **Placeholder**: Shows where item will be dropped

### Operational Details

- **Drag Source**: File or folder being moved
- **Drop Target**: Destination folder
- **Restrictions**: Cannot drop item onto itself or its children
- **Cross-folder**: Can drag between different folder levels
- **Multi-select**: All selected items move together

## Drag and Drop Events

### Event Types

The File Manager provides four drag and drop events:

| Event | Trigger Point | Use Case |
|-------|---------------|----------|
| **fileDragStart** | When dragging begins | Validate drag source |
| **fileDragging** | During drag operation | Show real-time feedback |
| **fileDragStop** | When drag ends (before drop) | Prevent invalid drops |
| **fileDropped** | After successful drop | Log operation, update UI |

### Implementation

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
    [allowDragAndDrop]='true'
    (fileDragStart)='onDragStart($event)'
    (fileDragging)='onDragging($event)'
    (fileDragStop)='onDragStop($event)'
    (fileDropped)='onDropped($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onDragStart(args: any) {
    console.log('Drag started:', args.fileDetails.name);
    // args.fileDetails - Array of dragged files
    // args.dropTarget - Target element
  }

  onDragging(args: any) {
    console.log('Dragging:', args.fileDetails.name);
    // args.event - Mouse event
  }

  onDragStop(args: any) {
    console.log('Drag stopped:', args.fileDetails.name);
    // Can set args.cancel = true to prevent drop
  }

  onDropped(args: any) {
    console.log('Dropped into:', args.dropPath);
    // args.dropPath - Target folder path
    // args.fileDetails - Dropped files
  }
}
```

## Drop Target Configuration

### Specify Valid Drop Targets

Control where items can be dropped:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [allowDragAndDrop]='true'
    (fileDragStop)='onDragStop($event)'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onDragStop(args: any) {
    const targetFolder = args.dropPath;
    const draggedItems = args.fileDetails;

    // Only allow dropping into non-hidden folders
    if (targetFolder.startsWith('.')) {
      args.cancel = true;
      alert('Cannot drop into hidden folders');
      return;
    }

    // Prevent dropping into protected folder
    if (targetFolder === '/System') {
      args.cancel = true;
      alert('This folder is protected');
      return;
    }

    // Validate file types
    for (let file of draggedItems) {
      if (file.name.endsWith('.exe')) {
        args.cancel = true;
        alert('Cannot move executable files');
        return;
      }
    }
  }
}
```

## File Move Operations

### Move via Drag and Drop

When files are dropped into a folder:

```typescript
// 1. User drags: /Documents/Work/Report.pdf
// 2. Drops into: /Archive
// 3. File Manager sends move request to server
// 4. Server moves file to /Archive/Report.pdf
// 5. UI updates to reflect new location
```

### Server Move Implementation

```csharp
[HttpPost("FileOperations")]
public IActionResult FileOperations(string path, string action, string names)
{
    if (action == "move")
    {
        var sourcePath = GetSourcePath(names);  // Parse source path
        var targetPath = path;  // Drop target path
        
        // Move file from sourcePath to targetPath
        System.IO.File.Move(sourcePath, targetPath);
        
        return Ok(new { success = true });
    }
    
    return BadRequest();
}
```

## Constraints and Restrictions

### Preventing Invalid Drops

```typescript
@Component({
  template: `<ejs-filemanager 
    [allowDragAndDrop]='true'
    (fileDragStop)='validateDrop($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  private lockedFolders = ['/System', '/Root'];
  private readOnlyUsers = ['viewer@company.com'];

  validateDrop(args: any) {
    // Prevent self-drop
    if (args.fileDetails[0].path === args.dropPath) {
      args.cancel = true;
      return;
    }

    // Prevent dropping into locked folders
    if (this.lockedFolders.includes(args.dropPath)) {
      args.cancel = true;
      alert('This folder is locked');
      return;
    }

    // Prevent dropping large files
    const totalSize = args.fileDetails.reduce((sum: number, file: any) => 
      sum + file.size, 0);
    
    if (totalSize > 100 * 1024 * 1024) {  // 100MB
      args.cancel = true;
      alert('Total size exceeds 100MB limit');
      return;
    }

    // Permission checks
    if (this.isReadOnlyUser()) {
      args.cancel = true;
      alert('You do not have permission to move files');
    }
  }

  private isReadOnlyUser(): boolean {
    // Check user permissions
    return true;  // Example
  }
}
```

## Complete Drag and Drop Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<div class='drag-drop-demo'>
    <div class='status'>{{ dragStatus }}</div>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [allowDragAndDrop]='true'
      [navigationPaneSettings]='navigationPaneSettings'
      (fileDragStart)='onDragStart($event)'
      (fileDragging)='onDragging($event)'
      (fileDragStop)='onDragStop($event)'
      (fileDropped)='onDropped($event)'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .drag-drop-demo {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .status {
      padding: 10px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public dragStatus: string = 'Ready';
  public draggedItems: any[] = [];

  public navigationPaneSettings = {};

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onDragStart(args: any) {
    this.draggedItems = args.fileDetails;
    const names = this.draggedItems.map(f => f.name).join(', ');
    this.dragStatus = `Dragging: ${names}`;
  }

  onDragging(args: any) {
    const targetName = args.dropTarget?.textContent || 'unknown';
    this.dragStatus = `Dragging over: ${targetName}`;
  }

  onDragStop(args: any) {
    const itemCount = args.fileDetails.length;
    const targetPath = args.dropPath;
    
    // Validation logic
    if (args.fileDetails.some((f: any) => f.isFile === false)) {
      // Moving folders
      if (args.dropPath.startsWith(args.fileDetails[0].path)) {
        args.cancel = true;
        this.dragStatus = '❌ Cannot move folder into itself';
        return;
      }
    }

    if (!args.cancel) {
      this.dragStatus = `Will move ${itemCount} item(s) to: ${targetPath}`;
    }
  }

  onDropped(args: any) {
    const itemCount = args.fileDetails.length;
    this.dragStatus = `✓ Moved ${itemCount} item(s) to: ${args.dropPath}`;
    
    setTimeout(() => {
      this.dragStatus = 'Ready';
    }, 3000);
  }
}
```

---

**Next:** Handle large file sets at [virtualization.md](virtualization.md) or configure sorting at [sorting-and-filtering.md](sorting-and-filtering.md).
