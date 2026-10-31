# Views and Layout in Syncfusion Angular File Manager

## Table of Contents
- [View Types](#view-types)
- [Details View](#details-view)
- [Details View Settings](#details-view-settings)
- [Large Icons View](#large-icons-view)
- [Large Icons View Template](#large-icons-view-template)
- [Switching Views](#switching-views)
- [View Configuration](#view-configuration)
- [Customization](#customization)

## View Types

The File Manager supports two main view modes for displaying files and folders:

### Details View
Displays files in a sortable list format with columns showing name, size, date modified, and file type.

### Large Icons View
Displays files as thumbnail icons in a grid layout, ideal for visual browsing and preview.

## Details View

### Overview

Details view presents files in a structured table format with multiple columns:
- **File Name** - Name of the file or folder
- **Size** - File size (not shown for folders)
- **Date Modified** - Last modification date
- **Type** - File type/extension

Files can be sorted by clicking column headers.

### Implementation

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [view]="'Details'"
    [detailsViewSettings]='detailsViewSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    getImageUrl: '/api/FileManager/GetImage',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };

  // Configure details view columns
  public detailsViewSettings = {
    columns: [
      { field: 'name', headerText: 'File Name', width: '40%' },
      { field: 'size', headerText: 'File Size', width: '20%' },
      { field: '_fm_modified', headerText: 'Date Modified', width: '40%' }
    ]
  };
}
```

### Details View Settings

```typescript
detailsViewSettings = {
  columns: [
    {
      field: 'name',                    // Column field name
      headerText: 'File Name',          // Header display text
      width: '40%',                     // Column width
      minWidth: 120,                    // Minimum width
      template: '${name}',              // Custom template
      sortComparer: sortComparer,       // Custom sort function
      customAttributes: { 
        class: 'e-fe-grid-name'        // CSS class
      }
    },
    {
      field: 'size',
      headerText: 'File Size',
      width: '20%',
      template: '${size}'
    },
    {
      field: '_fm_modified',            // Built-in date field
      headerText: 'Date Modified',
      width: '40%'
    }
  ]
};
```

## Large Icons View

### Overview

Large Icons view displays files as visual thumbnails in a grid layout. Each item shows:
- File thumbnail or icon
- File name below the icon
- Optional file size indicator

Ideal for browsing image files, document previews, and visual organization.

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
    [view]="'LargeIcons'"
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    getImageUrl: '/api/FileManager/GetImage'
  };
}
```

### Large Icons View Template

Customize the layout of file and folder items in the Large Icons view using the `largeIconsTemplate` property.

#### Basic Large Icons Template

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-large-icons-template',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'
    [view]="'LargeIcons'">
    
    <ng-template #largeIconsTemplate let-data>
      <div class="e-large-icon-item">
        <div class="icon-container">
          <span class="file-icon">{{ getFileIcon(data) }}</span>
        </div>
        <div class="file-info">
          <span class="file-name" [title]="data?.name">{{ data?.name }}</span>
          <span class="file-size">{{ formatFileSize(data?.size) }}</span>
        </div>
      </div>
    </ng-template>
    
  </ejs-filemanager>`,
  styles: [`
    .e-large-icon-item {
      text-align: center;
      padding: 12px;
    }
    
    .icon-container {
      font-size: 48px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
    }
    
    .file-icon {
      line-height: 1;
    }
    
    .file-info {
      display: flex;
      flex-direction: column;
    }
    
    .file-name {
      font-weight: 500;
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 4px;
    }
    
    .file-size {
      font-size: 11px;
      color: #999;
    }
  `]
})
export class LargeIconsTemplateComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };

  public getFileIcon(data: any): string {
    if (data?.isFile === false) {
      return '📁';
    }
    
    const ext = data?.name?.substring(data.name.lastIndexOf('.')).toLowerCase() || '';
    const iconMap: { [key: string]: string } = {
      '.pdf': '📄',
      '.doc': '📋',
      '.docx': '📋',
      '.xls': '📊',
      '.xlsx': '📊',
      '.ppt': '🎨',
      '.pptx': '🎨',
      '.jpg': '🖼️',
      '.jpeg': '🖼️',
      '.png': '🖼️',
      '.gif': '🖼️',
      '.zip': '📦',
      '.rar': '📦',
      '.txt': '📝',
      '.mp4': '🎬',
      '.mp3': '🎵'
    };
    return iconMap[ext] || '📄';
  }

  public formatFileSize(bytes: number): string {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
```

#### Advanced Large Icons Template with Metadata

```typescript
export class AdvancedLargeIconsTemplateComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'
    [view]="'LargeIcons'">
    
    <ng-template #largeIconsTemplate let-data>
      <div class="advanced-large-icon">
        <div class="icon-overlay">
          <span class="main-icon">{{ getFileIcon(data) }}</span>
          <span *ngIf="data?.hasChild && !data?.isFile" class="folder-badge">
            📂
          </span>
          <span *ngIf="isRecent(data?.dateModified)" class="new-badge">
            NEW
          </span>
        </div>
        
        <div class="item-details">
          <span class="item-name" [title]="data?.name">{{ data?.name }}</span>
          <div class="item-meta">
            <span *ngIf="data?.isFile" class="item-size">
              {{ formatFileSize(data?.size) }}
            </span>
            <span class="item-date">
              {{ data?.dateModified | date:'short' }}
            </span>
          </div>
        </div>
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    .advanced-large-icon {
      padding: 8px;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    
    .advanced-large-icon:hover {
      background-color: #f0f0f0;
    }
    
    .icon-overlay {
      position: relative;
      font-size: 48px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
    }
    
    .main-icon {
      line-height: 1;
    }
    
    .folder-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 18px;
      background: white;
      border-radius: 50%;
      padding: 2px;
    }
    
    .new-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: #ff6b6b;
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: bold;
    }
    
    .item-details {
      text-align: center;
    }
    
    .item-name {
      display: block;
      font-weight: 500;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 4px;
    }
    
    .item-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    
    .item-size {
      font-size: 11px;
      color: #666;
    }
    
    .item-date {
      font-size: 10px;
      color: #999;
    }
  `;

  private isRecent(date: Date): boolean {
    if (!date) return false;
    const daysDiff = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff < 7;
  }

  private formatFileSize(bytes: number): string {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  private getFileIcon(data: any): string {
    if (data?.isFile === false) return '📁';
    const ext = data?.name?.substring(data.name.lastIndexOf('.')).toLowerCase() || '';
    const iconMap: { [key: string]: string } = {
      '.pdf': '📄', '.doc': '📋', '.docx': '📋', '.xls': '📊',
      '.xlsx': '📊', '.ppt': '🎨', '.pptx': '🎨', '.jpg': '🖼️',
      '.png': '🖼️', '.zip': '📦', '.txt': '📝', '.mp4': '🎬'
    };
    return iconMap[ext] || '📄';
  }
}
```

## Switching Views

### Dynamic View Switching

Switch between view modes programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <button (click)='switchToDetails()'>Details View</button>
    <button (click)='switchToLargeIcons()'>Large Icons View</button>
    
    <ejs-filemanager 
      #fileManager
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [view]='currentView'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public currentView: string = 'Details';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    getImageUrl: '/api/FileManager/GetImage'
  };

  switchToDetails() {
    this.currentView = 'Details';
  }

  switchToLargeIcons() {
    this.currentView = 'LargeIcons';
  }
}
```

### View Button in Toolbar

The toolbar automatically includes a View button that toggles between Details and Large Icons views:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [toolbarSettings]='toolbarSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Download', 'Delete', 'View', 'Refresh']
  };
  // Click "View" button in toolbar to switch views
}
```

## View Configuration

### Initial View and Path

Set default view and starting directory:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [view]='initialView'
    [path]='currentPath'>
  </ejs-filemanager>`
})
export class AppComponent {
  public initialView: string = 'Details';
  public currentPath: string = '/Documents';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Height and Width

Configure container dimensions:

```typescript
@Component({
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    width='100%'
    height='500px'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### CSS Class for Styling

Apply custom CSS classes for theming:

```typescript
@Component({
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    cssClass='custom-file-manager'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .custom-file-manager {
      font-family: 'Custom Font', sans-serif;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    :host ::ng-deep .custom-file-manager .e-fe-list {
      background-color: #f9f9f9;
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Customization

### Custom Column Templates

Add custom templates for Details view columns:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [view]="'Details'"
    [detailsViewSettings]='detailsViewSettings'>
  </ejs-filemanager>`,
  styles: [`
    .file-icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  `]
})
export class AppComponent {
  public detailsViewSettings = {
    columns: [
      {
        field: 'name',
        headerText: 'File Name',
        width: '50%',
        template: `<span class="file-icon"></span>\${name}`
      },
      {
        field: 'size',
        headerText: 'File Size',
        width: '25%',
        template: `\${Math.round(size / 1024)}KB`
      },
      {
        field: '_fm_modified',
        headerText: 'Date Modified',
        width: '25%'
      }
    ]
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Custom Icons and Thumbnails

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [view]="'LargeIcons'"
    [showThumbnail]='true'>
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    getImageUrl: '/api/FileManager/GetImage'  // For thumbnails
  };
}
```

### Responsive View

Make File Manager responsive:

```typescript
@Component({
  selector: 'app-root',
  template: `<div class='file-manager-container'>
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      width='100%'
      height='100%'>
    </ejs-filemanager>
  </div>`,
  styles: [`
    .file-manager-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    }
    
    ejs-filemanager {
      flex: 1;
      min-height: 400px;
    }
    
    @media (max-width: 768px) {
      ejs-filemanager {
        font-size: 14px;
      }
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### View with Navigation Pane

Combine with navigation pane for folder tree:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [view]="'Details'"
    [navigationPaneSettings]='navigationPaneSettings'
    height="500px">
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .e-fe-navigation {
      width: 200px;
      border-right: 1px solid #ddd;
    }
  `]
})
export class AppComponent {
  public navigationPaneSettings = {};

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

---

**Next:** Configure navigation at [navigation-features.md](navigation-features.md) or work with data at [data-structures.md](data-structures.md).
