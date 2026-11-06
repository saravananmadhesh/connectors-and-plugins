# UI Customizations in Syncfusion Angular File Manager

## Overview

The FileManager component provides extensive UI customization options including icon customization, showing/hiding file extensions, managing hidden items, tooltip customization, and multi-selection control.

## Table of Contents
- [Customize Large Icons](#customize-large-icons)
- [Show/Hide File Extensions](#showhide-file-extensions)
- [Show/Hide Hidden Items](#showhide-hidden-items)
- [Tooltip Customization](#tooltip-customization)
- [Disable Multi-Selection](#disable-multi-selection)
- [Display Properties](#display-properties)
  - [showThumbnail](#showthumbnail-property)
  - [showItemCheckBoxes](#showitemcheckboxes-property)
  - [enableHtmlSanitizer](#enablehtmlsanitizer-property)
  - [popupTarget](#popuptarget-property)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

---

## Customize Large Icons

### Overview

Customize large icon view display in the File Manager component by modifying icons, sizes, and layouts.

### Custom Large Icon Setup

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-custom-icons',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [view]='view'
    (created)='onCreated()'>
  </ejs-filemanager>`,
  styles: [`
    .e-lg-icon .e-list-item {
      height: 180px;
      width: 150px;
    }
    
    .e-lg-icon .e-list-icon {
      font-size: 60px;
      height: 80px;
    }
    
    .e-lg-icon .e-list-text {
      font-size: 14px;
    }
  `]
})
export class CustomIconsComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public view: string = 'LargeIcons';

  public onCreated(): void {
    // Customize icon appearance after creation
    const lgIcon = document.querySelector('.e-lg-icon');
    if (lgIcon) {
      // Apply custom styling
      console.log('Large icon view ready');
    }
  }
}
```

### Customize Icon Size and Layout

```typescript
export class CustomIconLayoutComponent {
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings' 
    [view]='view'>
  </ejs-filemanager>`;

  styles: `
    /* Small icons */
    .e-lg-icon.small .e-list-item {
      height: 100px;
      width: 100px;
    }
    
    /* Medium icons */
    .e-lg-icon.medium .e-list-item {
      height: 150px;
      width: 150px;
    }
    
    /* Large icons */
    .e-lg-icon.large .e-list-item {
      height: 200px;
      width: 200px;
    }
    
    /* Icon styling */
    .e-lg-icon .e-list-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 8px;
    }
    
    .e-lg-icon .e-list-text {
      text-align: center;
      word-wrap: break-word;
      padding: 8px;
    }
  `;
}
```

### Custom File Type Icons

```typescript
export class CustomFileTypeIconsComponent {
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings' 
    (beforeSend)='customizeIcons($event)'>
  </ejs-filemanager>`;

  private iconMap = {
    '.pdf': '📄',
    '.doc': '📋',
    '.xls': '📊',
    '.ppt': '🎨',
    '.jpg': '🖼️',
    '.png': '🖼️',
    '.zip': '📦',
    '.txt': '📝'
  };

  public customizeIcons(args: any): void {
    if (args.action === 'read') {
      const files = args.data;
      if (Array.isArray(files)) {
        files.forEach(file => {
          const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
          if (this.iconMap[ext]) {
            file.icon = this.iconMap[ext];
          }
        });
      }
    }
  }
}
```

---

## Show/Hide File Extensions

### Overview

Control whether file extensions are displayed in the File Manager.

### Configure File Extension Display

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-extension-display',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<div>
    <button ejs-button (click)="toggleExtensions()">
      {{ showExtensions ? 'Hide' : 'Show' }} Extensions
    </button>
    
    <ejs-filemanager 
      id='file-manager' 
      [ajaxSettings]='ajaxSettings' 
      [showFileExtension]='showExtensions'>
    </ejs-filemanager>
  </div>`
})
export class ExtensionDisplayComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public showExtensions: boolean = true;

  public toggleExtensions(): void {
    this.showExtensions = !this.showExtensions;
  }
}
```

### Default Settings

| Property | Default | Purpose |
|----------|---------|---------|
| `showFileExtension` | true | Show file extension (.pdf, .doc, etc.) |

### Dynamic Extension Control

```typescript
export class DynamicExtensionControlComponent {
  public fileExtensionSettings = {
    byDefault: true,
    hiddenExtensions: ['.tmp', '.log', '.bak'],
    alwaysShowExtensions: ['.exe', '.zip', '.dmg']
  };

  public shouldShowExtension(fileName: string): boolean {
    const ext = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    
    // Always show for critical extensions
    if (this.fileExtensionSettings.alwaysShowExtensions.includes(ext)) {
      return true;
    }
    
    // Never show for hidden extensions
    if (this.fileExtensionSettings.hiddenExtensions.includes(ext)) {
      return false;
    }
    
    return this.fileExtensionSettings.byDefault;
  }
}
```

---

## Show/Hide Hidden Items

### Overview

Control whether hidden files and folders are displayed.

### Configure Hidden Item Display

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-hidden-items',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<div>
    <button ejs-button (click)="toggleHidden()">
      {{ showHidden ? 'Hide' : 'Show' }} Hidden Items
    </button>
    
    <ejs-filemanager 
      id='file-manager' 
      [ajaxSettings]='ajaxSettings' 
      [showHiddenItems]='showHidden'>
    </ejs-filemanager>
  </div>`
})
export class HiddenItemsComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public showHidden: boolean = false;

  public toggleHidden(): void {
    this.showHidden = !this.showHidden;
  }
}
```

### Server-Side Hidden Item Handling

```csharp
// ASP.NET Core Backend
[HttpPost("FileOperations")]
public IActionResult FileOperations(string action, string path, bool showHiddenItems = false)
{
    var directoryInfo = new DirectoryInfo(path);
    
    // Get all files
    var files = directoryInfo.GetFiles();
    
    if (!showHiddenItems)
    {
        // Filter out hidden files
        files = files.Where(f => (f.Attributes & FileAttributes.Hidden) == 0).ToArray();
    }
    
    // Get all directories
    var directories = directoryInfo.GetDirectories();
    
    if (!showHiddenItems)
    {
        // Filter out hidden directories
        directories = directories.Where(d => (d.Attributes & FileAttributes.Hidden) == 0).ToArray();
    }
    
    return Ok(new { files, directories });
}
```

---

## Tooltip Customization

### Overview

Customize and control tooltips shown in the File Manager using the fileLoad event to add custom tooltip content.

### Basic Tooltip Configuration with fileLoad Event

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService, FileLoadEventArgs } from '@syncfusion/ej2-angular-filemanager';
import { FileManagerComponent } from '@syncfusion/ej2-angular-filemanager';
import { select, getValue } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-tooltip-custom',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  template: `<ejs-filemanager 
    #fileManager
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    (fileLoad)='onFileLoad($event)'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .file-tooltip {
      background: #333;
      color: #fff;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      line-height: 1.4;
    }
  `]
})
export class TooltipCustomComponent {
  @ViewChild('fileManager') fileManager?: FileManagerComponent;

  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public onFileLoad(args: FileLoadEventArgs): void {
    // Add custom tooltip to file elements
    let target: Element = args.element as Element;
    
    if (args.module === 'DetailsView') {
      // For Details View: use title attribute on the name column
      let element: Element = select('[title]', args.element);
      if (element) {
        let title: string = getValue('name', args.fileDetails) + 
                           '\n' + this.formatFileSize(getValue('size', args.fileDetails)) +
                           '\n' + this.formatDate(getValue('dateModified', args.fileDetails));
        element.setAttribute('title', title);
      }
    } else if (args.module === 'LargeIconsView') {
      // For Large Icons View: add tooltip to the item
      let title: string = getValue('name', args.fileDetails) + 
                         '\n' + this.formatFileSize(getValue('size', args.fileDetails)) +
                         '\n' + this.formatDate(getValue('dateModified', args.fileDetails));
      target.setAttribute('title', title);
    }
  }

  private formatFileSize(bytes: number): string {
    if (!bytes) return '—';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  private formatDate(date: Date): string {
    if (!date) return '—';
    return new Date(date).toLocaleDateString();
  }
}
```

### Advanced Tooltip with File Type Information

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, FileLoadEventArgs } from '@syncfusion/ej2-angular-filemanager';
import { select, getValue } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-advanced-tooltip',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    (fileLoad)='onFileLoad($event)'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .e-list-item[title] {
      cursor: help;
    }
  `]
})
export class AdvancedTooltipComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public onFileLoad(args: FileLoadEventArgs): void {
    const fileDetails = args.fileDetails;
    const name = getValue('name', fileDetails);
    const size = getValue('size', fileDetails);
    const date = getValue('dateModified', fileDetails);
    const isFile = getValue('isFile', fileDetails);
    
    let tooltipText = '';
    
    if (isFile) {
      const ext = name.substring(name.lastIndexOf('.')).toLowerCase();
      const fileType = this.getFileType(ext);
      tooltipText = `Name: ${name}\nType: ${fileType}\nSize: ${this.formatFileSize(size)}\nModified: ${this.formatDate(date)}`;
    } else {
      tooltipText = `Folder: ${name}\nModified: ${this.formatDate(date)}`;
    }
    
    const target = args.element as Element;
    target.setAttribute('title', tooltipText);
  }

  private getFileType(extension: string): string {
    const typeMap: { [key: string]: string } = {
      '.pdf': 'PDF Document',
      '.doc': 'Word Document',
      '.docx': 'Word Document',
      '.xls': 'Excel Spreadsheet',
      '.xlsx': 'Excel Spreadsheet',
      '.ppt': 'PowerPoint Presentation',
      '.pptx': 'PowerPoint Presentation',
      '.jpg': 'JPEG Image',
      '.png': 'PNG Image',
      '.gif': 'GIF Image',
      '.zip': 'ZIP Archive',
      '.rar': 'RAR Archive',
      '.txt': 'Text File',
      '.mp3': 'Audio File',
      '.mp4': 'Video File'
    };
    return typeMap[extension] || 'File';
  }

  private formatFileSize(bytes: number): string {
    if (!bytes) return '—';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  private formatDate(date: Date): string {
    if (!date) return '—';
    return new Date(date).toLocaleString();
  }
}
```

---

## Disable Multi-Selection

### Overview

Control whether users can select multiple files or folders.

### Disable Multi-Selection

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-single-selection',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    [allowMultiSelection]='false'>
  </ejs-filemanager>`
})
export class SingleSelectionComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

### Toggle Multi-Selection

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-toggle-selection',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<div>
    <div class="selection-controls">
      <label>
        <input type="radio" name="selection" 
          [checked]="allowMultiple === false"
          (change)="allowMultiple = false"> 
        Single Selection
      </label>
      <label>
        <input type="radio" name="selection" 
          [checked]="allowMultiple === true"
          (change)="allowMultiple = true"> 
        Multi Selection
      </label>
    </div>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings' 
      [allowMultiSelection]='allowMultiple'>
    </ejs-filemanager>
    
    <div class="selected-info">
      <p>Selected: {{ getSelectedCount() }} item(s)</p>
    </div>
  </div>`
})
export class ToggleSelectionComponent {
  @ViewChild('fileManager') fileManager?: FileManagerComponent;

  public allowMultiple: boolean = true;

  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public getSelectedCount(): number {
    return this.fileManager?.selectedItems?.length || 0;
  }
}
```

### Multi-Selection Limitations

```typescript
export class LimitedMultiSelectionComponent {
  template: `<ejs-filemanager 
    #fileManager
    [ajaxSettings]='ajaxSettings' 
    [allowMultiSelection]='true'
    (fileSelect)='onFileSelected($event)'>
  </ejs-filemanager>`;

  private maxSelections = 5;

  public onFileSelected(args: any): void {
    if ((this.fileManager as FileManagerComponent).selectedItems.length > this.maxSelections) {
      // Limit selection to 5 items
      args.cancel = true;
      alert(`Maximum ${this.maxSelections} items can be selected`);
    }
  }
}
```

---

## Display Properties

### showThumbnail Property

**Purpose**: Control whether thumbnail images are displayed in the Large Icons view.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showThumbnail` | boolean | `true` | Display thumbnail images for image files |

**Use Cases:**
- Performance optimization for large file collections
- Reducing memory usage
- Focusing on file names over visual previews
- Consistent icon display across all file types

**Basic Example:**

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="controls">
      <button (click)="toggleThumbnail()">
        {{ showThumbnail ? 'Hide' : 'Show' }} Thumbnails
      </button>
    </div>
    
    <ejs-filemanager 
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [showThumbnail]='showThumbnail'
      [view]="'LargeIcons'"
      height="400px">
    </ejs-filemanager>
  `,
  styles: [`
    .controls { margin-bottom: 15px; }
    button {
      padding: 8px 16px;
      background-color: #0078d4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public showThumbnail = true;

  toggleThumbnail(): void {
    this.showThumbnail = !this.showThumbnail;
  }
}
```

---

### showItemCheckBoxes Property

**Purpose**: Display checkboxes next to files and folders for selection.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showItemCheckBoxes` | boolean | `false` | Display checkboxes for selecting items |

**Use Cases:**
- Touch-friendly interfaces (mobile/tablet)
- Accessibility compliance (WCAG)
- Visual multi-selection indicators
- Better UX for users unfamiliar with keyboard shortcuts

**Basic Example - Enable Checkboxes:**

```typescript
@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-filemanager 
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [showItemCheckBoxes]='true'
      [allowMultiSelection]='true'
      height="400px">
    </ejs-filemanager>
  `
})
export class AppComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

**Advanced Example - Selection Mode Toggle:**

```typescript
@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="selection-modes">
      <label>
        <input type="radio" name="mode" value="single" (change)="setSelectionMode('single')" checked>
        Single Selection Only
      </label>
      <label>
        <input type="radio" name="mode" value="multiple" (change)="setSelectionMode('multiple')">
        Multiple with Checkboxes
      </label>
      <label>
        <input type="radio" name="mode" value="keyboard" (change)="setSelectionMode('keyboard')">
        Keyboard-Based Multiple
      </label>
    </div>
    
    <p class="mode-info">{{ modeDescription }}</p>
    
    <ejs-filemanager 
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [showItemCheckBoxes]='showCheckboxes'
      [allowMultiSelection]='allowMultiSelection'
      height="400px">
    </ejs-filemanager>
  `,
  styles: [`
    .selection-modes { padding: 15px; background-color: #f5f5f5; margin-bottom: 15px; border-radius: 4px; }
    label { display: block; margin-bottom: 8px; cursor: pointer; }
    input[type="radio"] { margin-right: 8px; cursor: pointer; }
    .mode-info { padding: 10px; background-color: #e7f3ff; border-left: 4px solid #0078d4; margin-bottom: 15px; }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public showCheckboxes = false;
  public allowMultiSelection = true;
  public modeDescription = 'Users can select only one item at a time.';

  setSelectionMode(mode: string): void {
    switch (mode) {
      case 'single':
        this.showCheckboxes = false;
        this.allowMultiSelection = false;
        this.modeDescription = 'Single selection only. Users cannot select multiple items.';
        break;
      case 'multiple':
        this.showCheckboxes = true;
        this.allowMultiSelection = true;
        this.modeDescription = 'Multiple selection via checkboxes. Users can click checkboxes to select items.';
        break;
      case 'keyboard':
        this.showCheckboxes = false;
        this.allowMultiSelection = true;
        this.modeDescription = 'Multiple selection via keyboard (Ctrl+Click, Shift+Click, Ctrl+A).';
        break;
    }
  }
}
```

---

### enableHtmlSanitizer Property

**Purpose**: Sanitize HTML content to prevent XSS (Cross-Site Scripting) attacks.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableHtmlSanitizer` | boolean | `true` | Sanitize HTML to prevent XSS attacks |

**⚠️ SECURITY CRITICAL**: Keep this enabled in production environments!

**Use Cases:**
- Security protection against malicious scripts
- Untrusted data sources
- Multi-tenant applications

**Recommended Example (Security Enabled):**

```typescript
@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="security-notice">
      <strong>✓ HTML Sanitization: ENABLED</strong>
      <p>All HTML content is sanitized for security. This prevents XSS attacks.</p>
    </div>
    
    <ejs-filemanager 
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [enableHtmlSanitizer]='true'
      height="400px">
    </ejs-filemanager>
  `,
  styles: [`
    .security-notice {
      padding: 12px;
      background-color: #d4edda;
      border: 1px solid #28a745;
      border-radius: 4px;
      margin-bottom: 15px;
      color: #155724;
    }
    .security-notice strong { display: block; margin-bottom: 5px; }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

---

### popupTarget Property

**Purpose**: Specify a custom container element where dialogs and popups should be rendered.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `popupTarget` | string | `null` | CSS selector for popup container (null = document body) |

**Use Cases:**
- Nested File Managers (within modals or dialogs)
- Shadow DOM scenarios
- Custom layout requirements
- Scoped styling

**Basic Example - Custom Popup Container:**

```typescript
@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <h3>File Manager with Custom Popup Container</h3>
      
      <!-- This div will contain all File Manager dialogs -->
      <div id="fm-popup-container" class="popup-container"></div>
      
      <ejs-filemanager 
        id='file-manager'
        [ajaxSettings]='ajaxSettings'
        popupTarget='#fm-popup-container'
        height="400px">
      </ejs-filemanager>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .popup-container { position: relative; z-index: 1000; }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

**Advanced Example - Nested File Manager in Modal:**

```typescript
@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="app-container">
      <h2>File Selection Modal</h2>
      
      <button (click)="openModal()" class="open-btn">
        Open File Manager Modal
      </button>
      
      <!-- Modal Backdrop -->
      <div *ngIf="isModalOpen" class="modal-backdrop" (click)="closeModal()"></div>
      
      <!-- Modal Dialog -->
      <div *ngIf="isModalOpen" class="modal">
        <div class="modal-header">
          <h3>Select a File</h3>
          <button (click)="closeModal()" class="close-btn">✕</button>
        </div>
        
        <!-- Popup container for File Manager dialogs -->
        <div id="nested-fm-popup" class="nested-popup-container"></div>
        
        <div class="modal-body">
          <ejs-filemanager 
            id='nested-file-manager'
            [ajaxSettings]='ajaxSettings'
            popupTarget='#nested-fm-popup'
            height="350px">
          </ejs-filemanager>
        </div>
        
        <div class="modal-footer">
          <button (click)="closeModal()" class="btn-secondary">Cancel</button>
          <button class="btn-primary">Select</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container { padding: 20px; }
    .open-btn { padding: 10px 20px; background-color: #0078d4; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1000; }
    .modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; border-radius: 8px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); z-index: 1001; width: 80%; max-width: 700px; max-height: 80vh; display: flex; flex-direction: column; }
    .modal-header { padding: 16px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
    .modal-body { flex: 1; overflow: hidden; }
    .modal-footer { padding: 16px; border-top: 1px solid #e0e0e0; display: flex; justify-content: flex-end; gap: 10px; }
    .btn-secondary { padding: 8px 16px; background-color: #e0e0e0; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { padding: 8px 16px; background-color: #0078d4; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .nested-popup-container { position: relative; z-index: 1002; }
  `]
})
export class AppComponent {
  public isModalOpen = false;
  
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
```

---

## Practical Examples

### Example 1: Complete UI Customization

```typescript
export class CompleteUICustomComponent {
  template: `<div>
    <div class="ui-controls">
      <button ejs-button (click)="toggleExtensions()">
        {{ showExt ? 'Hide' : 'Show' }} Ext
      </button>
      <button ejs-button (click)="toggleHidden()">
        {{ showHidden ? 'Hide' : 'Show' }} Hidden
      </button>
      <button ejs-button (click)="toggleMultiSelect()">
        {{ allowMulti ? 'Single' : 'Multi' }} Select
      </button>
    </div>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings' 
      [view]='view'
      [showFileExtension]='showExt'
      [navigationPaneSettings]='{ showHiddenItems: showHidden }'
      [allowMultiSelection]='allowMulti'>
    </ejs-filemanager>
  </div>`;

  public showExt = true;
  public showHidden = false;
  public allowMulti = true;
  public view = 'LargeIcons';

  toggleExtensions(): void { this.showExt = !this.showExt; }
  toggleHidden(): void { this.showHidden = !this.showHidden; }
  toggleMultiSelect(): void { this.allowMulti = !this.allowMulti; }
}
```

### Example 2: File Selector with Custom UI

```typescript
export class FileSelectorUIComponent {
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings' 
    [allowMultiSelection]='false'
    [showFileExtension]='false'
    [view]='view'
    (fileOpen)='onFileSelected($event)'>
  </ejs-filemanager>`;

  public view = 'LargeIcons';

  public onFileSelected(args: any): void {
    if (args.fileDetails.isFile) {
      console.log('Selected:', args.fileDetails.name);
    }
  }
}
```

---

## Best Practices

1. **Consistency** - Keep UI settings consistent throughout the application
2. **Performance** - Limit tooltip updates to improve performance
3. **Accessibility** - Ensure proper contrast and sizes for icons
4. **User Preference** - Allow users to customize their view preferences
5. **Responsive Design** - Adjust icon sizes for different screen sizes

---

**Related Documentation:**
- [Customization](customization-styling.md)
- [Navigation Features](navigation-features.md)
- [Views and Layout](views-and-layout.md)
- [Toolbar Customization](toolbar-customization.md)
