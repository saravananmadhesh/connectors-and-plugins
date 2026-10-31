# Toolbar Customization in Syncfusion Angular File Manager

## Overview

The FileManager toolbar can be customized to include custom items, modify default items, or create completely custom layouts. You can add buttons, dropdowns, checkboxes, or any Angular component as toolbar items.

## Table of Contents
- [Basic Toolbar Configuration](#basic-toolbar-configuration)
- [Default Toolbar Items](#default-toolbar-items)
- [Adding Custom Toolbar Items](#adding-custom-toolbar-items)
- [Modifying Toolbar Item Properties](#modifying-toolbar-item-properties)
- [Template-Based Toolbar Items](#template-based-toolbar-items)
- [Toolbar Item Icons](#toolbar-item-icons)
- [Event Handling](#event-handling)
- [Examples](#examples)

---

## Basic Toolbar Configuration

### Enable/Disable Toolbar

```typescript
@Component({
  template: `<ejs-filemanager 
    [toolbarSettings]='toolbarSettings'>
  </ejs-filemanager>`
})
export class AppComponent {
  toolbarSettings = {
    // Show toolbar
    visible: true,
    
    // Standard items
    items: ['NewFolder', 'Upload', 'Delete', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection']
  };
}
```

---

## Default Toolbar Items

The FileManager provides these built-in toolbar items:

| Item | Icon | Function |
|------|------|----------|
| `NewFolder` | Folder icon | Create new folder |
| `Upload` | Upload icon | Upload files |
| `Delete` | Delete icon | Delete selected files |
| `Download` | Download icon | Download selected files |
| `Rename` | Edit icon | Rename selected file |
| `SortBy` | Sort icon | Open sort options dropdown |
| `Refresh` | Refresh icon | Refresh file list |
| `Selection` | Checkbox icon | Select/Deselect all |
| `View` | View icon | Change view type |
| `Details` | Details icon | Show file details |

---

## Adding Custom Toolbar Items

### Using e-toolbaritems Element

```typescript
@Component({
  selector: 'app-file-manager',
  template: `<ejs-filemanager #fileManager>
    <e-toolbaritems>
      <e-toolbaritem text="New Folder" tooltipText="Create folder" iconCss="e-icons e-folder-new"></e-toolbaritem>
      <e-toolbaritem text="Upload" tooltipText="Upload files" iconCss="e-icons e-upload"></e-toolbaritem>
      <e-toolbaritem text="Delete" tooltipText="Delete file" iconCss="e-icons e-delete"></e-toolbaritem>
      <e-toolbaritem text="Custom Action" tooltipText="Custom tool" iconCss="e-icons e-star"></e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
}
```

---

## Modifying Toolbar Item Properties

### Customize Built-in Items

```typescript
@Component({
  template: `<ejs-filemanager 
    [toolbarSettings]='toolbarSettings'
    (toolbarCreate)='onToolbarCreate($event)'>
  </ejs-filemanager>`
})
export class AppComponent implements AfterViewInit {
  toolbarSettings = {
    items: ['NewFolder', 'Upload', 'CustomExport', 'CustomReport']
  };
  
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    // Modify toolbar item properties
    const toolbar = args.toolbarElement;
    
    // Change Upload button tooltip
    const uploadBtn = toolbar.querySelector('[title="Upload"]') as HTMLElement;
    if(uploadBtn) {
      uploadBtn.title = 'Upload your files here';
    }
    
    // Add custom CSS class
    const deleteBtn = toolbar.querySelector('[title="Delete"]') as HTMLElement;
    if(deleteBtn) {
      deleteBtn.classList.add('custom-delete-btn');
    }
  }
}
```

### Style Toolbar Items

```css
/* Custom Delete Button */
.custom-delete-btn {
  background-color: #ff4757 !important;
  color: white !important;
}

.custom-delete-btn:hover {
  background-color: #ee5a6f !important;
}

/* Custom Toolbar Container */
.e-toolbar.e-filemanager-toolbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 12px;
}

.e-toolbar.e-filemanager-toolbar .e-toolbar-item {
  margin: 0 5px;
}
```

---

## Template-Based Toolbar Items

### Creating a Custom Checkbox Toolbar Item

```typescript
@Component({
  selector: 'app-file-manager',
  template: `<ejs-filemanager 
    #fileManager
    [toolbarSettings]='toolbarSettings'
    (toolbarCreate)='onToolbarCreate($event)'>
    
    <e-toolbaritems>
      <!-- Built-in items -->
      <e-toolbaritem text="New Folder" iconCss="e-icons e-folder-new"></e-toolbaritem>
      <e-toolbaritem text="Upload" iconCss="e-icons e-upload"></e-toolbaritem>
      
      <!-- Custom checkbox item with template -->
      <e-toolbaritem [template]='checkboxTemplate'></e-toolbaritem>
      
      <!-- Separator -->
      <e-toolbaritem type="Separator"></e-toolbaritem>
      
      <e-toolbaritem text="Delete" iconCss="e-icons e-delete"></e-toolbaritem>
    </e-toolbaritems>
    
    <!-- Template definition -->
    <ng-template #checkboxTemplate>
      <div class="e-checkbox-wrapper">
        <input type="checkbox" 
          [checked]='selectAll'
          (change)='onSelectAllChange($event)' 
          id="select-all-checkbox"
          class="e-checkbox">
        <label for="select-all-checkbox" class="e-label">Select All</label>
      </div>
    </ng-template>
  </ejs-filemanager>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  selectAll = false;
  
  toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Delete', 'Download']
  };
  
  onSelectAllChange(event: any) {
    this.selectAll = event.target.checked;
    
    if(this.selectAll) {
      this.fileManager?.selectAll();
    } else {
      this.fileManager?.clearSelection();
    }
  }
  
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    // Initialize checkbox styling
    this.initializeCheckboxStyle();
  }
  
  private initializeCheckboxStyle() {
    const checkboxWrapper = document.querySelector('.e-checkbox-wrapper');
    if(checkboxWrapper) {
      checkboxWrapper.classList.add('custom-select-all');
    }
  }
}
```

### Custom Button with Dropdown Menu

```typescript
@Component({
  template: `<ejs-filemanager 
    #fileManager
    (toolbarCreate)='onToolbarCreate($event)'>
    
    <e-toolbaritems>
      <e-toolbaritem 
        text="Export"
        iconCss="e-icons e-export"
        [template]='exportTemplate'>
      </e-toolbaritem>
    </e-toolbaritems>
    
    <ng-template #exportTemplate>
      <button class="e-btn" (click)='onExportClick()'>
        <span class="e-btn-icon e-icons e-export"></span>
        Export
      </button>
      <div class="e-menu-dropdown" [hidden]='!showExportMenu'>
        <ul class="e-menu-items">
          <li class="e-menu-item" (click)='exportAs("csv")'>Export as CSV</li>
          <li class="e-menu-item" (click)='exportAs("json")'>Export as JSON</li>
          <li class="e-menu-item" (click)='exportAs("pdf")'>Export as PDF</li>
        </ul>
      </div>
    </ng-template>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  showExportMenu = false;
  
  onExportClick() {
    this.showExportMenu = !this.showExportMenu;
  }
  
  exportAs(format: string) {
    const selectedItems = this.fileManager?.selectedItems;
    console.log(`Exporting ${selectedItems?.length} items as ${format}`);
    // Implement export logic
    this.showExportMenu = false;
  }
}
```

---

## Toolbar Item Icons

### Using Syncfusion Icons

```typescript
@Component({
  template: `<ejs-filemanager>
    <e-toolbaritems>
      <!-- Built-in Syncfusion icons -->
      <e-toolbaritem 
        text="Favorite"
        iconCss="e-icons e-star-fill"
        tooltipText="Add to favorites">
      </e-toolbaritem>
      
      <e-toolbaritem 
        text="Share"
        iconCss="e-icons e-share"
        tooltipText="Share file">
      </e-toolbaritem>
      
      <e-toolbaritem 
        text="Archive"
        iconCss="e-icons e-archive"
        tooltipText="Archive file">
      </e-toolbaritem>
      
      <e-toolbaritem 
        text="Settings"
        iconCss="e-icons e-settings"
        tooltipText="File settings">
      </e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {}
```

### Using Custom Icons (Font Awesome)

```typescript
@Component({
  template: `<ejs-filemanager>
    <e-toolbaritems>
      <!-- Font Awesome icons -->
      <e-toolbaritem 
        text="Print"
        iconCss="fa fa-print"
        tooltipText="Print files">
      </e-toolbaritem>
      
      <e-toolbaritem 
        text="Zip"
        iconCss="fa fa-file-archive"
        tooltipText="Create archive">
      </e-toolbaritem>
      
      <e-toolbaritem 
        text="Lock"
        iconCss="fa fa-lock"
        tooltipText="Encrypt file">
      </e-toolbaritem>
    </e-toolbaritems>
  </ejs-filemanager>`
})
export class AppComponent {}
```

### Custom SVG Icons

```typescript
@Component({
  template: `<ejs-filemanager>
    <e-toolbaritems>
      <e-toolbaritem [template]='customIconTemplate'></e-toolbaritem>
    </e-toolbaritems>
    
    <ng-template #customIconTemplate>
      <button class="e-btn">
        <svg class="custom-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
        Custom Action
      </button>
    </ng-template>
  </ejs-filemanager>`
})
export class AppComponent {}
```

---

## Event Handling

### Toolbar Click Event

```typescript
@Component({
  template: `<ejs-filemanager 
    (toolbarClick)='onToolbarClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  onToolbarClick(args: ToolbarClickEventArgs) {
    console.log('Toolbar item clicked:', args.item);
    
    switch(args.item.text) {
      case 'NewFolder':
        console.log('Create new folder');
        break;
      case 'Upload':
        console.log('Upload files');
        break;
      case 'Delete':
        console.log('Delete selected files');
        break;
      case 'Custom Action':
        this.handleCustomAction();
        break;
    }
  }
  
  private handleCustomAction() {
    alert('Custom action executed!');
  }
}
```

### Toolbar Create Event

```typescript
@Component({
  template: `<ejs-filemanager 
    (toolbarCreate)='onToolbarCreate($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    // Get toolbar reference
    const toolbar = args.toolbarElement;
    
    // Add custom event listeners
    const customBtn = toolbar.querySelector('.custom-btn') as HTMLElement;
    if(customBtn) {
      customBtn.addEventListener('click', () => {
        console.log('Custom button clicked');
      });
    }
    
    // Modify toolbar appearance
    toolbar.style.backgroundColor = '#f5f5f5';
    toolbar.style.borderBottom = '2px solid #2196F3';
  }
}
```

---

## Examples

### Example 1: Complete Custom Toolbar with Actions

```typescript
@Component({
  selector: 'app-advanced-filemanager',
  template: `<div class="filemanager-container">
    <h3>Advanced File Manager</h3>
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [toolbarSettings]='toolbarSettings'
      (toolbarClick)='onToolbarClick($event)'
      (toolbarCreate)='onToolbarCreate($event)'
      height="500px">
      
      <e-toolbaritems>
        <e-toolbaritem text="New Folder" iconCss="e-icons e-folder-new"></e-toolbaritem>
        <e-toolbaritem text="Upload" iconCss="e-icons e-upload"></e-toolbaritem>
        <e-toolbaritem type="Separator"></e-toolbaritem>
        
        <e-toolbaritem 
          text="Favorite"
          iconCss="e-icons e-star-fill"
          [template]='favoriteTemplate'>
        </e-toolbaritem>
        
        <e-toolbaritem 
          text="Share"
          iconCss="e-icons e-share"
          [template]='shareTemplate'>
        </e-toolbaritem>
        
        <e-toolbaritem type="Separator"></e-toolbaritem>
        <e-toolbaritem text="Delete" iconCss="e-icons e-delete"></e-toolbaritem>
        <e-toolbaritem text="Download" iconCss="e-icons e-download"></e-toolbaritem>
      </e-toolbaritems>
      
      <ng-template #favoriteTemplate>
        <button class="e-btn e-flat e-icon-btn" 
          title="Add to favorites"
          [disabled]='!hasSelection'
          (click)='addToFavorites()'>
          <span class="e-icons e-star-fill"></span>
        </button>
      </ng-template>
      
      <ng-template #shareTemplate>
        <button class="e-btn e-flat e-icon-btn" 
          title="Share selected files"
          [disabled]='!hasSelection'
          (click)='shareFiles()'>
          <span class="e-icons e-share"></span>
        </button>
      </ng-template>
    </ejs-filemanager>
  </div>`
})
export class AdvancedFileManagerComponent implements AfterViewInit {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  hasSelection = false;
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Delete', 'Download']
  };
  
  ngAfterViewInit() {
    this.fileManager?.fileSelect.subscribe((args: any) => {
      this.hasSelection = args.fileDetails.length > 0;
    });
  }
  
  onToolbarClick(args: ToolbarClickEventArgs) {
    console.log('Toolbar action:', args.item.text);
  }
  
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    const toolbar = args.toolbarElement;
    toolbar.classList.add('custom-toolbar');
  }
  
  addToFavorites() {
    const selected = this.fileManager?.selectedItems;
    console.log('Added to favorites:', selected);
  }
  
  shareFiles() {
    const selected = this.fileManager?.selectedItems;
    console.log('Sharing:', selected);
  }
}
```

### Example 2: Search and Filter in Toolbar

```typescript
@Component({
  template: `<ejs-filemanager 
    #fileManager
    (toolbarCreate)='onToolbarCreate($event)'>
    
    <e-toolbaritems>
      <e-toolbaritem [template]='searchTemplate'></e-toolbaritem>
      <e-toolbaritem type="Separator"></e-toolbaritem>
      <e-toolbaritem text="Delete" iconCss="e-icons e-delete"></e-toolbaritem>
    </e-toolbaritems>
    
    <ng-template #searchTemplate>
      <div class="search-input-group">
        <input type="text" 
          class="e-field" 
          placeholder="Search files..."
          [(ngModel)]='searchText'
          (keyup)='onSearchChange($event)'>
        <button class="e-btn e-icon-btn" (click)='clearSearch()'>
          <span class="e-icons e-close"></span>
        </button>
      </div>
    </ng-template>
  </ejs-filemanager>`
})
export class SearchFileManagerComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  searchText = '';
  
  onSearchChange(event: any) {
    const searchValue = this.searchText.toLowerCase();
    console.log('Searching for:', searchValue);
    // Implement search logic
  }
  
  clearSearch() {
    this.searchText = '';
  }
  
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    const toolbar = args.toolbarElement;
    const searchInput = toolbar.querySelector('.search-input-group') as HTMLElement;
    if(searchInput) {
      searchInput.style.flex = '1';
      searchInput.style.marginRight = '10px';
    }
  }
}
```

### Example 3: Conditional Toolbar Items Based on Selection

```typescript
@Component({
  template: `<ejs-filemanager 
    #fileManager
    (toolbarCreate)='onToolbarCreate($event)'
    (fileSelect)='onFileSelect($event)'>
    
    <e-toolbaritems>
      <e-toolbaritem 
        text="Edit"
        iconCss="e-icons e-edit"
        [template]='editTemplate'>
      </e-toolbaritem>
      
      <e-toolbaritem 
        text="Preview"
        iconCss="e-icons e-play"
        [template]='previewTemplate'>
      </e-toolbaritem>
    </e-toolbaritems>
    
    <ng-template #editTemplate>
      <button class="e-btn" 
        [disabled]='!canEdit' 
        (click)='editFile()'>
        Edit
      </button>
    </ng-template>
    
    <ng-template #previewTemplate>
      <button class="e-btn" 
        [disabled]='!canPreview' 
        (click)='previewFile()'>
        Preview
      </button>
    </ng-template>
  </ejs-filemanager>`
})
export class ConditionalToolbarComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  canEdit = false;
  canPreview = false;
  
  onFileSelect(args: FileSelectEventArgs) {
    const selectedFile = args.fileDetails[0];
    
    // Enable/disable based on file type
    const editableExtensions = ['.txt', '.md', '.json', '.xml'];
    const previewableExtensions = ['.pdf', '.jpg', '.png', '.txt'];
    
    this.canEdit = editableExtensions.some(ext => 
      selectedFile.name.endsWith(ext)
    );
    
    this.canPreview = previewableExtensions.some(ext => 
      selectedFile.name.endsWith(ext)
    );
  }
  
  editFile() {
    const selected = this.fileManager?.selectedItems[0];
    console.log('Opening editor for:', selected);
  }
  
  previewFile() {
    const selected = this.fileManager?.selectedItems[0];
    console.log('Opening preview for:', selected);
  }
  
  onToolbarCreate(args: ToolbarCreateEventArgs) {
    args.toolbarElement.classList.add('conditional-toolbar');
  }
}
```

---

## Best Practices

1. **Keep toolbar items relevant** - Only show tools users actually need
2. **Provide tooltips** - Always add descriptive tooltips for custom items
3. **Show/hide dynamically** - Enable/disable items based on selection
4. **Group related items** - Use separators to organize toolbar logically
5. **Use consistent icons** - Match icon style to FileManager defaults
6. **Handle permissions** - Disable items users don't have permission to use
7. **Test responsive behavior** - Ensure toolbar works on mobile devices
8. **Add visual feedback** - Highlight active items or loading states

---

**Next:** Learn about context menu customization at [context-menu-customization.md](context-menu-customization.md) or explore file operations at [file-operations.md](file-operations.md).
