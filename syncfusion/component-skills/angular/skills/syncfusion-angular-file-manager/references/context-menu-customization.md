# Context Menu Customization in Syncfusion Angular File Manager

## Overview

The FileManager context menu appears when users right-click on files, folders, or empty space. You can customize which items appear in the menu, add custom items, and handle menu events for custom actions.

## Table of Contents
- [Context Menu Configuration](#context-menu-configuration)
- [Default Context Menu Items](#default-context-menu-items)
- [Adding Custom Menu Items](#adding-custom-menu-items)
- [Menu Events](#menu-events)
- [Dynamic Menu Modification](#dynamic-menu-modification)
- [Custom Menu Actions](#custom-menu-actions)
- [Examples](#examples)

---

## Context Menu Configuration

### Basic Setup

```typescript
@Component({
  selector: 'app-file-manager',
  template: `<ejs-filemanager 
    [contextMenuSettings]='contextMenuSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  contextMenuSettings = {
    // Show context menu for files
    file: ['Open', 'Cut', 'Copy', 'Delete', 'Download', 'Rename'],
    
    // Show context menu for folders
    folder: ['Open', 'Cut', 'Copy', 'Delete', 'Paste', 'Rename', 'NewFolder'],
    
    // Show context menu for empty layout
    layout: ['Paste', 'Refresh', 'NewFolder']
  };
}
```

### Hide Entire Context Menu

```typescript
export class AppComponent {
  contextMenuSettings = {
    visible: false  // Disable context menu completely
  };
}
```

---

## Default Context Menu Items

### Available Built-in Items

| Item | Context | Function |
|------|---------|----------|
| `Open` | File/Folder | Open file or navigate to folder |
| `Cut` | File/Folder | Cut file/folder to clipboard |
| `Copy` | File/Folder | Copy file/folder to clipboard |
| `Paste` | Layout | Paste from clipboard |
| `Delete` | File/Folder | Delete file/folder |
| `Rename` | File/Folder | Rename file/folder |
| `Download` | File/Folder | Download file/folder |
| `NewFolder` | Folder/Layout | Create new folder |
| `Details` | File/Folder | Show file details |

### Customize Built-in Items

```typescript
export class AppComponent {
  contextMenuSettings = {
    // Minimal file operations
    file: ['Copy', 'Download'],
    
    // Basic folder operations
    folder: ['NewFolder', 'Delete', 'Rename'],
    
    // Layout operations
    layout: ['Refresh']
  };
}
```

---

## Adding Custom Menu Items

### Define Custom Menu Items

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent } from '@syncfusion/ej2-angular-filemanager';
import { MenuOpenEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-file-manager',
  template: `<ejs-filemanager 
    #fileManager
    [contextMenuSettings]='contextMenuSettings'
    (menuOpen)='onMenuOpen($event)'
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  contextMenuSettings = {
    file: ['Copy', 'Download', 'Favorite', 'Share', 'Lock'],
    folder: ['NewFolder', 'Delete', 'Favorite', 'Share'],
    layout: ['Paste', 'Refresh']
  };
  
  onMenuOpen(args: MenuOpenEventArgs) {
    // Set icons for custom menu items
    args.items.forEach((item: any) => {
      switch(item.text) {
        case 'Favorite':
          item.iconCss = 'e-icons e-star-fill';
          break;
        case 'Share':
          item.iconCss = 'e-icons e-share';
          break;
        case 'Lock':
          item.iconCss = 'e-icons e-lock';
          break;
      }
    });
  }
  
  onMenuClick(args: MenuClickEventArgs) {
    // Handle custom menu item clicks
    const selectedFile = this.fileManager?.selectedItems[0];
    
    switch(args.itemText) {
      case 'Favorite':
        this.addToFavorites(selectedFile);
        break;
      case 'Share':
        this.shareFile(selectedFile);
        break;
      case 'Lock':
        this.lockFile(selectedFile);
        break;
    }
  }
  
  private addToFavorites(file: any) {
    console.log('Added to favorites:', file?.name);
  }
  
  private shareFile(file: any) {
    console.log('Sharing file:', file?.name);
  }
  
  private lockFile(file: any) {
    console.log('Locked file:', file?.name);
  }
}
```

---

## Menu Events

### menuOpen Event

The `menuOpen` event fires when context menu is about to open. Use it to:
- Add/remove menu items dynamically
- Set icons for menu items
- Show/hide items based on conditions
- Update menu item properties

```typescript
@Component({
  template: `<ejs-filemanager 
    (menuOpen)='onMenuOpen($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  onMenuOpen(args: MenuOpenEventArgs) {
    // Add custom menu items
    const customItems = [
      { text: 'Open With', iconCss: 'e-icons e-open' },
      { text: 'Properties', iconCss: 'e-icons e-info' }
    ];
    
    // Append custom items to menu
    args.items = [...args.items, ...customItems];
    
    // Set icons for all items
    args.items.forEach((item: any) => {
      if(!item.iconCss) {
        item.iconCss = 'e-icons e-file'; // Default icon
      }
    });
  }
}
```

### menuClose Event

The `menuClose` event fires when context menu is closing:

```typescript
@Component({
  template: `<ejs-filemanager 
    (menuClose)='onMenuClose($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  onMenuClose(args: MenuCloseEventArgs) {
    console.log('Context menu closed');
    // Cleanup or reset state if needed
  }
}
```

### menuClick Event

The `menuClick` event fires when user clicks a menu item:

```typescript
@Component({
  template: `<ejs-filemanager 
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  onMenuClick(args: MenuClickEventArgs) {
    console.log('Menu item clicked:', args.itemText);
    console.log('Menu type:', args.menuType); // 'file', 'folder', 'layout'
    console.log('Target element:', args.element);
    
    // Prevent default action if needed
    args.cancel = true;
  }
}
```

---

## Dynamic Menu Modification

### Show/Hide Items Based on Conditions

```typescript
@Component({
  template: `<ejs-filemanager 
    (menuOpen)='onMenuOpen($event)'
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  userRole = 'Editor';
  
  contextMenuSettings = {
    file: ['Copy', 'Download', 'Delete', 'Edit', 'Archive'],
    folder: ['NewFolder', 'Delete', 'Archive'],
    layout: ['Paste', 'Refresh']
  };
  
  onMenuOpen(args: MenuOpenEventArgs) {
    // Show/hide items based on user role
    if(this.userRole === 'Viewer') {
      // Remove edit/delete options for viewers
      args.items = args.items.filter((item: any) => 
        !['Delete', 'Edit', 'Archive'].includes(item.text)
      );
    }
    
    // Show/hide based on file type
    if(args.menuType === 'file') {
      const selectedFile = args.fileDetails[0];
      const isPDF = selectedFile.name.endsWith('.pdf');
      
      // Only show print for PDFs
      if(!isPDF) {
        args.items = args.items.filter((item: any) => item.text !== 'Print');
      }
    }
    
    // Show/hide based on file existence
    if(args.menuType === 'layout') {
      const hasClipboard = this.hasClipboardContent();
      if(!hasClipboard) {
        args.items = args.items.filter((item: any) => item.text !== 'Paste');
      }
    }
  }
  
  private hasClipboardContent(): boolean {
    // Check if clipboard has valid content
    return true;
  }
  
  onMenuClick(args: MenuClickEventArgs) {
    // Check permissions before executing action
    if(this.userRole === 'Viewer' && 
       ['Delete', 'Edit'].includes(args.itemText)) {
      args.cancel = true;
      alert('You do not have permission to perform this action');
    }
  }
}
```

### Add Icons to Menu Items

```typescript
@Component({
  template: `<ejs-filemanager 
    (menuOpen)='onMenuOpen($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  onMenuOpen(args: MenuOpenEventArgs) {
    const iconMap: { [key: string]: string } = {
      'Open': 'e-icons e-open',
      'Cut': 'e-icons e-cut',
      'Copy': 'e-icons e-copy',
      'Paste': 'e-icons e-paste',
      'Delete': 'e-icons e-delete',
      'Rename': 'e-icons e-rename',
      'Download': 'e-icons e-download',
      'NewFolder': 'e-icons e-folder-new',
      'Details': 'e-icons e-details',
      'Favorite': 'e-icons e-star-fill',
      'Share': 'e-icons e-share',
      'Lock': 'e-icons e-lock',
      'Archive': 'e-icons e-zip',
      'Edit': 'e-icons e-edit',
      'Print': 'e-icons e-print'
    };
    
    // Apply icons to all menu items
    args.items.forEach((item: any) => {
      if(iconMap[item.text]) {
        item.iconCss = iconMap[item.text];
      }
    });
  }
}
```

---

## Custom Menu Actions

### Implement Custom Actions

```typescript
@Component({
  selector: 'app-custom-menu-filemanager',
  template: `<ejs-filemanager 
    #fileManager
    [contextMenuSettings]='contextMenuSettings'
    (menuOpen)='onMenuOpen($event)'
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>`
})
export class CustomMenuFileManagerComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  contextMenuSettings = {
    file: ['Copy', 'Download', 'Favorite', 'Share', 'GetInfo'],
    folder: ['NewFolder', 'Delete', 'Favorite', 'Share', 'Compress'],
    layout: ['Paste', 'Refresh', 'CreateFolder']
  };
  
  onMenuOpen(args: MenuOpenEventArgs) {
    // Add icons
    const iconMap: { [key: string]: string } = {
      'Favorite': 'e-icons e-star-fill',
      'Share': 'e-icons e-share',
      'GetInfo': 'e-icons e-info',
      'Compress': 'e-icons e-zip',
      'CreateFolder': 'e-icons e-folder-new'
    };
    
    args.items.forEach((item: any) => {
      item.iconCss = iconMap[item.text] || 'e-icons e-file';
    });
  }
  
  onMenuClick(args: MenuClickEventArgs) {
    const selectedFiles = this.fileManager?.selectedItems || [];
    
    switch(args.itemText) {
      case 'Favorite':
        this.addToFavorites(selectedFiles);
        break;
      case 'Share':
        this.shareFiles(selectedFiles);
        break;
      case 'GetInfo':
        this.showFileInfo(selectedFiles);
        break;
      case 'Compress':
        this.compressFile(selectedFiles);
        break;
      case 'CreateFolder':
        this.createNewFolder();
        break;
    }
  }
  
  private addToFavorites(files: any[]) {
    files.forEach(file => {
      console.log(`Added "${file.name}" to favorites`);
    });
    alert(`Added ${files.length} item(s) to favorites`);
  }
  
  private shareFiles(files: any[]) {
    console.log('Sharing files:', files.map(f => f.name));
    alert(`Sharing ${files.length} item(s)`);
  }
  
  private showFileInfo(files: any[]) {
    if(files.length > 0) {
      const file = files[0];
      const info = `
        Name: ${file.name}
        Size: ${file.size} bytes
        Modified: ${new Date(file.dateModified).toLocaleString()}
      `;
      alert(info);
    }
  }
  
  private compressFile(files: any[]) {
    console.log('Compressing:', files.map(f => f.name));
    alert(`Compressing ${files.length} item(s) to archive`);
  }
  
  private createNewFolder() {
    alert('Creating new folder...');
  }
}
```

---

## Examples

### Example 1: Complete Custom Context Menu

```typescript
@Component({
  selector: 'app-advanced-context-menu',
  template: `<div class="filemanager-container">
    <h3>Advanced File Manager with Custom Context Menu</h3>
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [contextMenuSettings]='contextMenuSettings'
      (menuOpen)='onMenuOpen($event)'
      (menuClick)='onMenuClick($event)'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AdvancedContextMenuComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload'
  };
  
  contextMenuSettings = {
    file: [
      'Copy',
      'Download',
      'Favorite',
      'Tag',
      'Share',
      'GetProperties',
      'Delete'
    ],
    folder: [
      'NewFolder',
      'Copy',
      'Favorite',
      'Share',
      'Compress',
      'Delete'
    ],
    layout: [
      'Paste',
      'Refresh',
      'NewFolder'
    ]
  };
  
  onMenuOpen(args: MenuOpenEventArgs) {
    // Set comprehensive icon mapping
    const iconMap: { [key: string]: string } = {
      'Open': 'e-icons e-open',
      'Cut': 'e-icons e-cut',
      'Copy': 'e-icons e-copy',
      'Paste': 'e-icons e-paste',
      'Delete': 'e-icons e-delete',
      'Rename': 'e-icons e-rename',
      'Download': 'e-icons e-download',
      'NewFolder': 'e-icons e-folder-new',
      'Details': 'e-icons e-details',
      'Favorite': 'e-icons e-star-fill',
      'Tag': 'e-icons e-tag',
      'Share': 'e-icons e-share',
      'GetProperties': 'e-icons e-info',
      'Compress': 'e-icons e-zip',
      'Refresh': 'e-icons e-refresh'
    };
    
    // Apply icons
    args.items.forEach((item: any) => {
      item.iconCss = iconMap[item.text] || 'e-icons e-file';
    });
  }
  
  onMenuClick(args: MenuClickEventArgs) {
    const selectedFiles = this.fileManager?.selectedItems || [];
    
    switch(args.itemText) {
      case 'Favorite':
        this.toggleFavorite(selectedFiles);
        break;
      case 'Tag':
        this.assignTag(selectedFiles);
        break;
      case 'Share':
        this.openShareDialog(selectedFiles);
        break;
      case 'GetProperties':
        this.showProperties(selectedFiles);
        break;
      case 'Compress':
        this.compressFiles(selectedFiles);
        break;
      case 'Refresh':
        this.fileManager?.refresh();
        break;
    }
  }
  
  private toggleFavorite(files: any[]) {
    console.log('Toggling favorite for:', files.map(f => f.name));
  }
  
  private assignTag(files: any[]) {
    const tag = prompt('Enter tag name:');
    if(tag) {
      console.log(`Tagged ${files.length} item(s) with "${tag}"`);
    }
  }
  
  private openShareDialog(files: any[]) {
    console.log('Opening share dialog for:', files.map(f => f.name));
  }
  
  private showProperties(files: any[]) {
    if(files.length > 0) {
      const file = files[0];
      console.log('Properties:', file);
    }
  }
  
  private compressFiles(files: any[]) {
    console.log('Compressing:', files.map(f => f.name));
  }
}
```

### Example 2: Context Menu with Confirmation Dialog

```typescript
@Component({
  template: `<ejs-filemanager 
    #fileManager
    [contextMenuSettings]='contextMenuSettings'
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>
  
  <ejs-dialog 
    #confirmDialog
    [header]="'Confirm Action'"
    [animationSettings]="animationSettings"
    [width]="'400px'"
    [showCloseIcon]="true"
    (overlayClick)="closeDialog()">
    
    <p>{{ confirmMessage }}</p>
    
    <ng-template #footerTemplate>
      <button class="e-btn e-primary" (click)="confirmAction()">Yes</button>
      <button class="e-btn" (click)="closeDialog()">Cancel</button>
    </ng-template>
  </ejs-dialog>`
})
export class ContextMenuWithDialogComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  @ViewChild('confirmDialog')
  confirmDialog?: DialogComponent;
  
  contextMenuSettings = {
    file: ['Delete', 'Archive'],
    folder: ['Delete', 'Archive']
  };
  
  confirmMessage = '';
  pendingAction = { type: '', files: [] as any[] };
  
  onMenuClick(args: MenuClickEventArgs) {
    const selectedFiles = this.fileManager?.selectedItems || [];
    
    if(args.itemText === 'Delete') {
      this.confirmMessage = `Delete ${selectedFiles.length} item(s)? This cannot be undone.`;
      this.pendingAction = { type: 'delete', files: selectedFiles };
      this.confirmDialog?.show();
      args.cancel = true;
    } else if(args.itemText === 'Archive') {
      this.confirmMessage = `Archive ${selectedFiles.length} item(s)?`;
      this.pendingAction = { type: 'archive', files: selectedFiles };
      this.confirmDialog?.show();
      args.cancel = true;
    }
  }
  
  confirmAction() {
    if(this.pendingAction.type === 'delete') {
      console.log('Deleting:', this.pendingAction.files.map(f => f.name));
    } else if(this.pendingAction.type === 'archive') {
      console.log('Archiving:', this.pendingAction.files.map(f => f.name));
    }
    this.closeDialog();
  }
  
  closeDialog() {
    this.confirmDialog?.hide();
  }
}
```

### Example 3: Context Menu with Submenu

```typescript
@Component({
  template: `<ejs-filemanager 
    (menuOpen)='onMenuOpen($event)'
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>`
})
export class ContextMenuWithSubmenuComponent {
  contextMenuSettings = {
    file: ['OpenWith', 'SendTo', 'Delete'],
    folder: ['NewFolder', 'Copy', 'Delete']
  };
  
  onMenuOpen(args: MenuOpenEventArgs) {
    // Add submenu structure
    args.items.forEach((item: any) => {
      if(item.text === 'OpenWith') {
        item.items = [
          { text: 'Text Editor', iconCss: 'e-icons e-edit' },
          { text: 'Notepad', iconCss: 'e-icons e-edit' },
          { text: 'Visual Studio Code', iconCss: 'e-icons e-edit' }
        ];
      } else if(item.text === 'SendTo') {
        item.items = [
          { text: 'Email', iconCss: 'e-icons e-mail' },
          { text: 'OneDrive', iconCss: 'e-icons e-cloud' },
          { text: 'USB Drive', iconCss: 'e-icons e-export' }
        ];
      }
    });
  }
  
  onMenuClick(args: MenuClickEventArgs) {
    console.log('Menu item clicked:', args.itemText);
  }
}
```

---

## Best Practices

1. **Always set icons** - Use `menuOpen` event to assign icons to all menu items
2. **Provide context** - Show different items for files vs folders vs empty space
3. **Validate before action** - Check permissions in `menuClick` before executing
4. **Use confirmation** - Ask for confirmation for destructive actions (delete, archive)
5. **Handle errors gracefully** - Catch and display user-friendly error messages
6. **Limit items** - Don't overcrowd context menu with too many items
7. **Group logically** - Use similar menu items together
8. **Test on mobile** - Context menu behavior differs on touch devices

---

**Next:** Learn about file operations at [file-operations.md](file-operations.md) or explore advanced features at [advanced-features.md](advanced-features.md).
