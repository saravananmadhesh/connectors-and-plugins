# Sorting and Filtering in Syncfusion Angular File Manager

## Table of Contents
- [Default Sorting](#default-sorting)
- [Custom Sort Comparers](#custom-sort-comparers)
- [Natural Sorting](#natural-sorting)
- [Column Sorting](#column-sorting)
- [Filtering](#filtering)

## Default Sorting

### Basic Sorting

By default, File Manager sorts files alphabetically. Users sort by clicking column headers in Details view:

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
    [view]="'Details'"
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
  
  // Users click column headers to sort
  // Default order: A-Z
  // Click again: Z-A
}
```

## Custom Sort Comparers

### Sort Comparer Function

Define custom sort logic via `sortComparer` function:

```typescript
// Built-in sortComparer from Syncfusion
import { sortComparer } from '@syncfusion/ej2-angular-filemanager';

// Or create custom comparer
function customSortComparer(a: any, b: any): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
```

### Natural Sorting (Like Windows Explorer)

Natural sorting sorts numbers numerically within filenames:

```typescript
// Without natural sort:
// File1.txt, File10.txt, File2.txt, File20.txt

// With natural sort (Windows-style):
// File1.txt, File2.txt, File10.txt, File20.txt
```

Implementation:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { sortComparer } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [sortComparer]='sortComparer'
    [detailsViewSettings]='detailsViewSettings'
    [view]="'Details'"
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public sortComparer = sortComparer;  // Use built-in natural sorting

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  public detailsViewSettings = {
    columns: [
      {
        field: 'name',
        headerText: 'File Name',
        width: '40%',
        sortComparer: sortComparer  // Apply to specific column
      },
      {
        field: 'size',
        headerText: 'File Size',
        width: '30%'
      },
      {
        field: '_fm_modified',
        headerText: 'Date Modified',
        width: '30%'
      }
    ]
  };
}
```

## Custom Sorting Functions

### Implement Custom Sort Logic

```typescript
// Sort by file type first, then by name
function customSortByType(a: any, b: any): number {
  // Compare file extensions
  const extA = a.name?.split('.').pop() || '';
  const extB = b.name?.split('.').pop() || '';

  if (extA !== extB) {
    return extA.localeCompare(extB);
  }

  // If same extension, sort by name
  return a.name.localeCompare(b.name);
}

// Sort folders first, then files
function foldersFirstSort(a: any, b: any): number {
  if (a.isFile === b.isFile) {
    // Both files or both folders - sort by name
    return a.name.localeCompare(b.name);
  }

  // Folders before files
  return a.isFile ? 1 : -1;
}

// Sort by size (largest first)
function sortBySize(a: any, b: any): number {
  return (b.size || 0) - (a.size || 0);
}

// Sort by date (newest first)
function sortByDate(a: any, b: any): number {
  return new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
}
```

### Apply Custom Sort Comparer

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [sortComparer]='foldersFirstSort'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public foldersFirstSort = (a: any, b: any) => {
    if (a.isFile === b.isFile) {
      return a.name.localeCompare(b.name);
    }
    return a.isFile ? 1 : -1;
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Column Sorting

### Sort Individual Columns

Apply different sortComparers to each column:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';
import { sortComparer } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [DetailsViewService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [view]="'Details'"
    [detailsViewSettings]='detailsViewSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  public detailsViewSettings = {
    columns: [
      {
        field: 'name',
        headerText: 'File Name',
        width: '40%',
        sortComparer: sortComparer  // Natural sort for names
      },
      {
        field: 'size',
        headerText: 'File Size',
        width: '30%',
        sortComparer: (a: any, b: any) => {
          // Numeric sort for size
          return (a - b);
        }
      },
      {
        field: '_fm_modified',
        headerText: 'Date Modified',
        width: '30%',
        sortComparer: (a: any, b: any) => {
          // Date sort (newest first)
          return new Date(b).getTime() - new Date(a).getTime();
        }
      }
    ]
  };
}
```

### Sorting in Large Icons View

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [sortComparer]='sortComparer'
    [view]="'LargeIcons'"
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public sortComparer = (a: any, b: any) => {
    // Custom logic for thumbnail view
    return a.name.localeCompare(b.name);
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Filtering

### Search Files

Search is built-in via toolbar search box:

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [toolbarSettings]='toolbarSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Download', 'Search', 'Refresh']
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  // Users click search icon and type filename
  // File Manager filters displayed items
}
```

### Custom Search Implementation

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <input type='text' 
      placeholder='Search files...'
      (input)='onSearch($event)'
      class='search-box'>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [fileSystemData]='filteredData'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .search-box {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
    }
  `]
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public allData: any[] = [];
  public filteredData: any[] = [];

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (!searchTerm) {
      this.filteredData = this.allData;
      return;
    }

    this.filteredData = this.allData.filter(item => 
      item.name.toLowerCase().includes(searchTerm)
    );
  }
}
```

### Server-Side Search

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
    args.ajaxSettings.beforeSend = (requestArgs: any) => {
      const data = JSON.parse(requestArgs.data);
      
      if (data.action === 'search') {
        // Add search parameters
        data.searchString = 'report';  // Search term
        data.searchLocation = '/';     // Search path
        requestArgs.data = JSON.stringify(data);
      }
    };
  }
}
```

## Advanced Sorting Examples

### Sort by Extension Type

```typescript
function sortByExtension(a: any, b: any): number {
  const getExt = (name: string) => name.split('.').pop() || '';
  const extA = getExt(a.name);
  const extB = getExt(b.name);

  if (extA !== extB) {
    return extA.localeCompare(extB);
  }
  return a.name.localeCompare(b.name);
}
```

### Sort Mixed (Folders, Recent Files, Old Files)

```typescript
function complexSort(a: any, b: any): number {
  // Folders first
  if (a.isFile !== b.isFile) {
    return a.isFile ? 1 : -1;
  }

  // Recent files by date
  if (!a.isFile && !b.isFile) {
    return new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
  }

  // Files by size
  if (a.isFile && b.isFile) {
    return (b.size || 0) - (a.size || 0);
  }

  return 0;
}
```

### Reverse Alphabetical Sort

```typescript
function reverseAlphabetical(a: any, b: any): number {
  return b.name.localeCompare(a.name);  // Z to A
}
```

---

**Next:** Configure toolbar and menus at [toolbar-and-context-menu.md](toolbar-and-context-menu.md) or explore advanced features at [advanced-features.md](advanced-features.md).
