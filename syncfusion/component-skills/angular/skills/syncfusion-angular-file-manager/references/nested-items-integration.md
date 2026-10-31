# Nested Items Integration in Syncfusion Angular File Manager

## Overview

The File Manager component can be seamlessly integrated inside other Syncfusion components such as Dialog, Tab, Splitter, and Accordion. This capability enables complex UI layouts where file management is nested within other container components.

## Table of Contents
- [Nesting in Dialog](#nesting-in-dialog)
- [Nesting in Tabs](#nesting-in-tabs)
- [Nesting in Splitter](#nesting-in-splitter)
- [Nesting in Accordion](#nesting-in-accordion)
- [Handling Nested State](#handling-nested-state)
- [Best Practices](#best-practices)
- [Practical Examples](#practical-examples)

---

## Nesting in Dialog

### Overview

Embed File Manager inside a Dialog component for selecting files in a modal interface.

### Basic Dialog Nesting

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-dialog-nested',
  imports: [FileManagerModule, DialogModule, ButtonModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<div class="sample-container">
    <button ejs-button (click)="openDialog()">Open File Manager</button>
    
    <ejs-dialog 
      #dialogObj 
      id='dialog' 
      [visible]='false' 
      header='File Manager'
      [width]='850'
      [height]='500'
      (close)="onDialogClose()">
      
      <ejs-filemanager 
        id='file-manager' 
        [ajaxSettings]='ajaxSettings' 
        [toolbarSettings]='toolbarSettings'
        height="450px">
      </ejs-filemanager>
      
    </ejs-dialog>
  </div>`
})
export class DialogNestedComponent {
  @ViewChild('dialogObj') dialogObj?: DialogComponent;

  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Delete', 'Download', 'Refresh']
  };

  // Open dialog
  public openDialog(): void {
    this.dialogObj?.show();
  }

  // Handle dialog close
  public onDialogClose(): void {
    console.log('Dialog closed');
  }
}
```

### Dialog + File Selection

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService, FileOpenEventArgs } from '@syncfusion/ej2-angular-filemanager';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-file-selector-dialog',
  template: `<div>
    <div id="selected-file">Selected: {{ selectedFileName }}</div>
    
    <button ejs-button (click)="selectFile()">Select File</button>
    
    <ejs-dialog 
      #dialogObj 
      id='fileSelector' 
      [visible]='false' 
      header='Select a File'
      [width]='800'
      [allowDrag]='false'>
      
      <ejs-filemanager 
        #fileManager
        id='file-manager' 
        [ajaxSettings]='ajaxSettings' 
        [allowMultiSelection]='false'
        (fileOpen)='onFileSelected($event)'>
      </ejs-filemanager>
      
    </ejs-dialog>
  </div>`
})
export class FileSelectorDialogComponent {
  @ViewChild('dialogObj') dialogObj?: DialogComponent;
  @ViewChild('fileManager') fileManager?: FileManagerComponent;
  
  public selectedFileName = 'None';

  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public selectFile(): void {
    this.dialogObj?.show();
  }

  public onFileSelected(args: FileOpenEventArgs): void {
    const file = (args as any).fileDetails;
    if (file.isFile) {
      args.cancel = true; // Prevent opening, just select
      this.selectedFileName = file.name;
      this.dialogObj?.hide();
    }
  }
}
```

---

## Nesting in Tabs

### Overview

Integrate File Manager as one or more tabs in a Tab container.

### Basic Tab Nesting

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { TabModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-tabs-nested',
  imports: [FileManagerModule, TabModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<div>
    <ejs-tab>
      <e-tabitems>
        
        <e-tabitem [header]="'Files'" [content]="fileManagerTemplate"></e-tabitem>
        
        <e-tabitem [header]="'Settings'" [content]="settingsTemplate"></e-tabitem>
        
      </e-tabitems>
    </ejs-tab>

    <!-- File Manager Tab -->
    <ng-template #fileManagerTemplate>
      <ejs-filemanager 
        id='file-manager' 
        [ajaxSettings]='ajaxSettings' 
        height="400px">
      </ejs-filemanager>
    </ng-template>

    <!-- Settings Tab -->
    <ng-template #settingsTemplate>
      <div class="settings-container">
        <p>File Manager Settings</p>
      </div>
    </ng-template>
  </div>`
})
export class TabsNestedComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

### Multiple File Managers in Tabs

```typescript
export class MultiTabFileManagerComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  template: `<div>
    <ejs-tab>
      <e-tabitems>
        
        <e-tabitem [header]="'Local Files'" [content]="localTemplate"></e-tabitem>
        
        <e-tabitem [header]="'Cloud Files'" [content]="cloudTemplate"></e-tabitem>
        
        <e-tabitem [header]="'Shared Files'" [content]="sharedTemplate"></e-tabitem>
        
      </e-tabitems>
    </ejs-tab>

    <!-- Local Files Tab -->
    <ng-template #localTemplate>
      <ejs-filemanager 
        id='local-fm' 
        [ajaxSettings]='localSettings' 
        height="400px">
      </ejs-filemanager>
    </ng-template>

    <!-- Cloud Files Tab -->
    <ng-template #cloudTemplate>
      <ejs-filemanager 
        id='cloud-fm' 
        [ajaxSettings]='cloudSettings' 
        height="400px">
      </ejs-filemanager>
    </ng-template>

    <!-- Shared Files Tab -->
    <ng-template #sharedTemplate>
      <ejs-filemanager 
        id='shared-fm' 
        [ajaxSettings]='sharedSettings' 
        height="400px">
      </ejs-filemanager>
    </ng-template>
  </div>`;

  public localSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public cloudSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public sharedSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

---

## Nesting in Splitter

### Overview

Use File Manager in a Splitter component for side-by-side view.

### Splitter Layout

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter-nested',
  imports: [FileManagerModule, SplitterModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-splitter>
    <e-panes>
      
      <e-pane [size]='400' [min]='250' [content]="sourceTemplate"></e-pane>
      
      <e-pane [size]='400' [min]='250' [content]="destinationTemplate"></e-pane>
      
    </e-panes>
  </ejs-splitter>

  <!-- Source File Manager -->
  <ng-template #sourceTemplate>
    <div class="splitter-content">
      <h3>Source</h3>
      <ejs-filemanager 
        id='source-fm' 
        [ajaxSettings]='ajaxSettings' 
        height="100%">
      </ejs-filemanager>
    </div>
  </ng-template>

  <!-- Destination File Manager -->
  <ng-template #destinationTemplate>
    <div class="splitter-content">
      <h3>Destination</h3>
      <ejs-filemanager 
        id='destination-fm' 
        [ajaxSettings]='ajaxSettings' 
        height="100%">
      </ejs-filemanager>
    </div>
  </ng-template>`
})
export class SplitterNestedComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

---

## Nesting in Accordion

### Overview

Organize File Manager sections in an Accordion component.

### Accordion Layout

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { AccordionModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-accordion-nested',
  imports: [FileManagerModule, AccordionModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-accordion>
    <e-accordionitems>
      
      <e-accordionitem [header]="'Documents'" [content]="documentsTemplate"></e-accordionitem>
      
      <e-accordionitem [header]="'Media'" [content]="mediaTemplate"></e-accordionitem>
      
      <e-accordionitem [header]="'Archives'" [content]="archivesTemplate"></e-accordionitem>
      
    </e-accordionitems>
  </ejs-accordion>

  <!-- Documents -->
  <ng-template #documentsTemplate>
    <ejs-filemanager 
      id='docs-fm' 
      [ajaxSettings]='documentSettings' 
      height="350px">
    </ejs-filemanager>
  </ng-template>

  <!-- Media -->
  <ng-template #mediaTemplate>
    <ejs-filemanager 
      id='media-fm' 
      [ajaxSettings]='mediaSettings' 
      height="350px">
    </ejs-filemanager>
  </ng-template>

  <!-- Archives -->
  <ng-template #archivesTemplate>
    <ejs-filemanager 
      id='archives-fm' 
      [ajaxSettings]='archivesSettings' 
      height="350px">
    </ejs-filemanager>
  </ng-template>`
})
export class AccordionNestedComponent {
  public documentSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public mediaSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public archivesSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

---

## Handling Nested State

### Managing Multiple File Managers

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-multi-fm-state'
})
export class MultiFileManagerStateComponent {
  @ViewChild('sourceFm') sourceFm?: FileManagerComponent;
  @ViewChild('destFm') destFm?: FileManagerComponent;

  // Sync path between file managers
  public onSourcePathChange(): void {
    if (this.sourceFm && this.destFm) {
      const currentPath = this.sourceFm.path;
      // Don't override if already in that path
      if (this.destFm.path !== currentPath) {
        this.destFm.path = currentPath;
      }
    }
  }

  // Copy files from source to destination
  public copyToDestination(): void {
    if (this.sourceFm && this.destFm) {
      const selected = this.sourceFm.selectedItems;
      console.log('Copying:', selected, 'to', this.destFm.path);
      // Implementation logic
    }
  }

  // Refresh all file managers
  public refreshAll(): void {
    this.sourceFm?.refresh();
    this.destFm?.refresh();
  }
}
```

### Nested Height Considerations

```typescript
// Calculate available height for nested components
export class NestedHeightCalculator {
  // When nesting in Dialog
  dialogHeight = 500; // px
  dialogHeaderHeight = 50; // px
  fileManagerHeight = this.dialogHeight - this.dialogHeaderHeight - 20; // ~430px

  // When nesting in Tab
  tabHeight = 600; // px
  tabHeaderHeight = 40; // px
  fileManagerHeight = this.tabHeight - this.tabHeaderHeight - 10; // ~550px

  // When nesting in Splitter
  splitterHeight = 800; // px
  fileManagerHeight = '100%'; // Fill available space
}
```

---

## Best Practices

### 1. Dimension Management

```typescript
// Always set explicit dimensions for nested File Managers
<ejs-filemanager 
  height="450px"
  width="100%"
  [ajaxSettings]='ajaxSettings'>
</ejs-filemanager>
```

### 2. Performance Optimization

```typescript
// Disable features not needed in nested context
<ejs-filemanager 
  [showThumbnail]='false'
  [allowMultiSelection]='false'
  [showFileExtension]='false'>
</ejs-filemanager>
```

### 3. Navigation Handling

```typescript
// Handle navigation carefully in nested contexts
public onNavigationItemClick(path: string): void {
  // Prevent excessive navigation
  if (this.currentPath === path) return;
  
  this.currentPath = path;
  this.fileManager?.refresh();
}
```

### 4. Memory Management

```typescript
// Clean up when destroying nested components
ngOnDestroy(): void {
  this.fileManager?.destroy();
  // Clean up event listeners
}
```

---

## Practical Examples

### Example 1: File Upload Dialog

```typescript
export class FileUploadDialogComponent {
  @ViewChild('dialogObj') dialogObj?: DialogComponent;
  @ViewChild('fileManager') fileManager?: FileManagerComponent;

  public selectedFile: any = null;

  template: `<div>
    <button ejs-button (click)="selectFile()">Select File</button>
    
    <ejs-dialog 
      #dialogObj 
      header='Select File to Upload'
      [width]='800'
      [height]='500'>
      
      <ejs-filemanager 
        #fileManager
        [ajaxSettings]='ajaxSettings' 
        [allowMultiSelection]='false'
        (fileOpen)='onFileSelected($event)'>
      </ejs-filemanager>
      
    </ejs-dialog>
  </div>`;

  public selectFile(): void {
    this.dialogObj?.show();
  }

  public onFileSelected(args: any): void {
    const file = args.fileDetails;
    if (file.isFile) {
      this.selectedFile = file;
      args.cancel = true;
      this.dialogObj?.hide();
      console.log('Selected:', file.name);
    }
  }
}
```

### Example 2: Tabbed File Management

```typescript
export class TabbedFileManagerComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  template: `<ejs-tab>
    <e-tabitems>
      <e-tabitem [header]="'Files'" [content]="filesTemplate"></e-tabitem>
      <e-tabitem [header]="'Uploads'" [content]="uploadsTemplate"></e-tabitem>
      <e-tabitem [header]="'Shared'" [content]="sharedTemplate"></e-tabitem>
    </e-tabitems>
  </ejs-tab>

  <ng-template #filesTemplate>
    <ejs-filemanager [ajaxSettings]='ajaxSettings'></ejs-filemanager>
  </ng-template>

  <ng-template #uploadsTemplate>
    <ejs-filemanager [ajaxSettings]='ajaxSettings'></ejs-filemanager>
  </ng-template>

  <ng-template #sharedTemplate>
    <ejs-filemanager [ajaxSettings]='ajaxSettings'></ejs-filemanager>
  </ng-template>`;
}
```

---

## Related Documentation

- [File Operations](file-operations.md)
- [Customization](customization-styling.md)
- [Navigation Features](navigation-features.md)
