# Virtualization in Syncfusion Angular File Manager

## Overview

UI virtualization optimizes performance when displaying large numbers of files. Only visible items in the viewport are rendered, dynamically loading others as users scroll. This dramatically improves performance for folders containing hundreds or thousands of files.

## When to Use Virtualization

Virtualization is particularly beneficial in the following scenarios:

- **File systems with hundreds or thousands of files** in a single directory
- **Applications where File Manager needs to load quickly** without performance degradation
- **Environments with limited memory resources** where rendering large collections could impact performance
- **Slow network connections** where only rendering visible items saves bandwidth

**Enable virtualization when:**
- Displaying 500+ files in a single folder
- Scrolling performance is slow
- Memory usage is high
- Working with large directories
- Performance optimization is critical

**Skip virtualization when:**
- Fewer than 100 files
- Using flat data structure without backend
- Performance is already acceptable
- Custom templates are complex and heavy

## Module Injection

### Service Registration

```typescript
import { NgModule } from '@angular/core';
import { FileManagerComponent, VirtualizationService } from '@syncfusion/ej2-angular-filemanager';

@NgModule({
  providers: [VirtualizationService]
})
export class AppModule { }
```

### Standalone Component

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, VirtualizationService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [VirtualizationService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [enableVirtualization]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent { }
```

## Enable Virtualization

### Basic Implementation

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    id='file-manager'
    [ajaxSettings]='ajaxSettings'
    [enableVirtualization]='true'
    [view]="'Details'"
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
}
```

### With Large Icons View

```typescript
@Component({
  template: `<ejs-filemanager 
    [enableVirtualization]='true'
    [view]="'LargeIcons'"
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent { }
```

## Performance Benefits

### Before Virtualization
- Renders all 1000+ items at once
- ~5-10 second load time for folder
- High memory usage (100+ MB)
- Sluggish scrolling
- Excessive DOM nodes

### After Virtualization
- Renders only visible items (10-20)
- ~500ms load time for folder
- Low memory usage (10-20 MB)
- Smooth scrolling
- Minimal DOM nodes

## Implementation Example

```typescript
import { Component, OnInit } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService } from '@syncfusion/ej2-angular-filemanager';
import { FileData } from '@syncfusion/ej2-filemanager';

@Component({
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService, VirtualizationService],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <div class='performance-stats'>
      <span>Total Files: {{ totalFiles }}</span>
      <span>Virtualization: {{ virtualizationEnabled ? 'ON' : 'OFF' }}</span>
    </div>
    
    <ejs-filemanager 
      id='file-manager'
      [fileSystemData]='fileSystemData'
      [enableVirtualization]='virtualizationEnabled'
      [view]="'Details'"
      [detailsViewSettings]='detailsViewSettings'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .performance-stats {
      padding: 10px;
      background-color: #f5f5f5;
      display: flex;
      gap: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  public fileSystemData: FileData[] = [];
  public virtualizationEnabled: boolean = true;
  public totalFiles: number = 0;

  public detailsViewSettings = {
    columns: [
      { field: 'name', headerText: 'File Name', width: '40%' },
      { field: 'size', headerText: 'File Size', width: '30%' },
      { field: '_fm_modified', headerText: 'Date Modified', width: '30%' }
    ]
  };

  ngOnInit() {
    this.generateLargeDataset();
  }

  private generateLargeDataset() {
    const files: FileData[] = [];
    
    // Create 5000 mock files
    for (let i = 1; i <= 5000; i++) {
      files.push({
        id: `file-${i}`,
        name: `File_${String(i).padStart(5, '0')}.txt`,
        isFile: true,
        size: Math.floor(Math.random() * 10000000),
        dateModified: new Date(2024, 0, Math.floor(Math.random() * 28) + 1),
        hasChild: false,
        parentId: null,
        type: 'text/plain'
      });
    }

    this.fileSystemData = files;
    this.totalFiles = files.length;
  }
}
```

## Virtualization in Different Views

### Details View Virtualization

Renders only visible rows in the data grid:

```typescript
@Component({
  template: `<ejs-filemanager 
    [enableVirtualization]='true'
    [view]="'Details'"
    [detailsViewSettings]='detailsViewSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  public detailsViewSettings = {
    columns: [
      { field: 'name', headerText: 'Name', width: '40%' },
      { field: 'size', headerText: 'Size', width: '30%' },
      { field: '_fm_modified', headerText: 'Modified', width: '30%' }
    ]
  };
}
```

**Performance:** Excellent for large lists, smooth scrolling

### Large Icons View Virtualization

Renders only visible grid items:

```typescript
@Component({
  template: `<ejs-filemanager 
    [enableVirtualization]='true'
    [view]="'LargeIcons'">
  </ejs-filemanager>`
})
export class AppComponent { }
```

**Performance:** Good for visual browsing of large collections

## Scrolling Performance

### Smooth Scrolling with Virtualization

- **Viewport Rendering**: Only items in visible area rendered
- **Buffer Zone**: Pre-renders items near viewport edge
- **Progressive Loading**: Items load as user scrolls
- **Memory Efficient**: Minimal DOM footprint

### Virtualization with Events

Monitor file operations while using virtualization:

```typescript
@Component({
  template: `<ejs-filemanager 
    [enableVirtualization]='true'
    (fileLoad)='onFileLoad($event)'
    (fileOpen)='onFileOpen($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  onFileLoad(args: any) {
    console.log('Files loaded:', args.fileDetails?.length);
  }

  onFileOpen(args: any) {
    console.log('File opened:', args.fileDetails[0]?.name);
  }
}
```

## Memory Optimization

### Comparison

| Scenario | Without Virtualization | With Virtualization |
|----------|----------------------|---------------------|
| 1000 Files | 100+ MB | 10-15 MB |
| 5000 Files | 400+ MB | 15-25 MB |
| 10000 Files | Crash | 25-40 MB |
| Scroll Speed | Slow/Janky | Smooth |
| Initial Load | 10+ seconds | 1-2 seconds |

### Memory Usage Monitoring

```typescript
@Component({
  template: `<div>
    <div class='memory-info'>
      <span>Used Memory: {{ usedMemory | number }}MB</span>
      <span>Items Loaded: {{ renderedCount }}</span>
    </div>
    
    <ejs-filemanager 
      [enableVirtualization]='true'
      (created)='onCreated($event)'>
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  public usedMemory: number = 0;
  public renderedCount: number = 0;

  onCreated(args: any) {
    this.updateMemoryInfo();
  }

  private updateMemoryInfo() {
    if (performance.memory) {
      this.usedMemory = performance.memory.usedJSHeapSize / (1024 * 1024);
      this.renderedCount = document.querySelectorAll('.e-fe-item').length;
    }
  }
}
```

## Limitations for Virtualization

When implementing virtualization in the File Manager, be aware of these limitations:

### 1. Programmatic Selection
❌ **Programmatic selection using the selectAll method is not supported with virtual scrolling.**

The `selectAll()` method cannot select all files when virtualization is enabled because only visible items are rendered in the DOM.

```typescript
// This will NOT work properly with virtualization enabled
onSelectAll() {
  this.fileManager.selectAll();  // Only selects visible items
}
```

### 2. Keyboard Shortcut (Ctrl+A)
❌ **The keyboard shortcut CTRL+A will only select the files and directories that are currently visible within the viewport, rather than selecting all files and directories in the entire directory tree.**

When users press Ctrl+A with virtualization enabled, only the visible items in the current viewport are selected, not the entire directory contents.

**Workaround:**
```typescript
// Implement custom selection logic for all items
selectAllItems() {
  // Disable virtualization temporarily
  this.fileManager.enableVirtualization = false;
  this.fileManager.selectAll();
  // Re-enable virtualization
  this.fileManager.enableVirtualization = true;
}
```

### 3. Selection State During Scrolling
❌ **Selected file items are not maintained while scrolling to optimize component performance.**

When virtualization is enabled, the selection state may be lost when scrolling to items that are not currently visible, as the component unmounts and remounts items to optimize rendering.

**Workaround:**
```typescript
// Store selected items manually
private selectedItems: string[] = [];

onFileSelect(args: any) {
  this.selectedItems.push(args.fileDetails.id);
}

onFileUnselect(args: any) {
  this.selectedItems = this.selectedItems.filter(id => id !== args.fileDetails.id);
}
```

## Best Practices

### ✅ Do's

- Enable for folders with 500+ files
- Use with server-based data for best results
- Combine with Details view for large datasets
- Test performance with expected data volume
- Implement custom selection tracking for critical workflows
- Monitor memory usage in production

### ❌ Don'ts

- Don't enable for small datasets (< 100 items)
- Don't combine with complex custom templates
- Don't enable if scrolling performance is already good
- Don't use without proper backend pagination
- Don't rely on programmatic selectAll() with virtualization
- Don't expect multi-select with Ctrl+A to work on all items

## Troubleshooting

### Virtualization Not Working

```typescript
// Ensure VirtualizationService is provided
providers: [VirtualizationService]

// Check that enableVirtualization is true
[enableVirtualization]='true'

// Verify data is actually large
console.log(fileSystemData.length);  // Should be > 500
```

### Slow Scrolling Despite Virtualization

```typescript
// Check for complex templates that cause lag
// Simplify column templates if needed
// Ensure no heavy computations in item rendering
// Verify browser hardware acceleration is enabled
```

---

**Next:** Configure sorting at [sorting-and-filtering.md](sorting-and-filtering.md) or customize UI at [toolbar-and-context-menu.md](toolbar-and-context-menu.md).
