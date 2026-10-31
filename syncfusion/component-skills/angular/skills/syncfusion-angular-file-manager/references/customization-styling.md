# Customization and Styling in Syncfusion Angular File Manager

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Theme Customization](#theme-customization)
- [Custom Icons and Thumbnails](#custom-icons-and-thumbnails)
- [Responsive Design](#responsive-design)
- [Advanced Styling](#advanced-styling)

## CSS Class Customization

### Apply Custom CSS Class

Add custom CSS class to the root element for theming:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    cssClass='custom-theme'
    height="500px">
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .custom-theme {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    :host ::ng-deep .custom-theme .e-fe-toolbar {
      background-color: #2c3e50;
      color: white;
    }
    
    :host ::ng-deep .custom-theme .e-fe-list {
      background-color: #ecf0f1;
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Key CSS Classes

```css
/* Main container */
.e-file-manager

/* Toolbar */
.e-fe-toolbar

/* Navigation pane */
.e-fe-navigation
.e-navigation-pane

/* Content area */
.e-fe-list

/* Details view */
.e-fe-list.e-details-view

/* Large icons view */
.e-fe-list.e-large-icons-view

/* Breadcrumb */
.e-fe-breadcrumb

/* Items */
.e-fe-item
.e-fe-item.selected
.e-fe-item.focused

/* Dialogs */
.e-dialog
.e-dialog-content
```

## Theme Customization

### Available Themes

Install the theme package of your choice and import the corresponding `file-manager/index.css` file in your `src/styles.css`:

```bash
# Material Design 3 (Recommended)
npm i @syncfusion/ej2-material3-theme

# Material Design
npm i @syncfusion/ej2-material-theme

# Bootstrap 5
npm i @syncfusion/ej2-bootstrap5-theme

# Tailwind CSS
npm i @syncfusion/ej2-tailwind-theme
```

```css
/* In src/styles.css */

/* Material Design 3 (Recommended) */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/file-manager/index.css";

/* Material Design */
@import "../node_modules/@syncfusion/ej2-material-theme/styles/file-manager/index.css";

/* Bootstrap 5 */
@import "../node_modules/@syncfusion/ej2-bootstrap5-theme/styles/file-manager/index.css";

/* Tailwind CSS */
@import "../node_modules/@syncfusion/ej2-tailwind-theme/styles/file-manager/index.css";
```

### Switch Themes at Runtime

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <select (change)='switchTheme($event)' class='theme-selector'>
      <option value='material3'>Material 3</option>
      <option value='bootstrap5'>Bootstrap 5</option>
      <option value='tailwind'>Tailwind</option>
      <option value='fluent'>Fluent</option>
    </select>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      [cssClass]='currentTheme'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .theme-selector {
      padding: 10px;
      margin: 10px;
      font-size: 16px;
    }
  `]
})
export class AppComponent {
  public currentTheme: string = 'material3';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  switchTheme(event: any) {
    this.currentTheme = event.target.value;
    // Theme CSS should be dynamically loaded
  }
}
```

## Custom Icons and Thumbnails

### Enable Thumbnails

Display file thumbnails or custom icons:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [view]="'LargeIcons'"
    [showThumbnail]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    getImageUrl: '/api/FileManager/GetImage'  // Required for thumbnails
  };
}
```

### Custom Icon Classes

```typescript
@Component({
  template: `<ejs-filemanager 
    [detailsViewSettings]='detailsViewSettings'
    height="500px">
  </ejs-filemanager>`,
  styles: [`
    /* Custom icon styles */
    :host ::ng-deep .e-fe-icon.pdf {
      color: #e74c3c;
    }
    
    :host ::ng-deep .e-fe-icon.image {
      color: #3498db;
    }
    
    :host ::ng-deep .e-fe-icon.audio {
      color: #9b59b6;
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
        template: `<span class="e-fe-icon" [ngClass]="getIconClass(name)"></span> \${name}`
      }
    ]
  };

  getIconClass(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (['jpg', 'png', 'gif'].includes(ext || '')) return 'image';
    if (['mp3', 'wav'].includes(ext || '')) return 'audio';
    return '';
  }
}
```

## Responsive Design

### Mobile-Friendly File Manager

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class='file-manager-responsive'>
    <ejs-filemanager 
      id='file-manager'
      [ajaxSettings]='ajaxSettings'
      [view]="'Details'"
      [navigationPaneSettings]='navigationPaneSettings'
      height="100%">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .file-manager-responsive {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    
    /* Desktop */
    @media (min-width: 1024px) {
      :host ::ng-deep .e-navigation-pane {
        width: 250px;
      }
    }
    
    /* Tablet */
    @media (min-width: 768px) and (max-width: 1023px) {
      :host ::ng-deep .e-navigation-pane {
        width: 200px;
        font-size: 14px;
      }
      
      :host ::ng-deep .e-fe-toolbar {
        overflow-x: auto;
      }
    }
    
    /* Mobile */
    @media (max-width: 767px) {
      :host ::ng-deep .e-navigation-pane {
        display: none;  /* Hide nav pane on mobile */
      }
      
      :host ::ng-deep .e-fe-list {
        font-size: 13px;
      }
      
      :host ::ng-deep .e-fe-toolbar button {
        padding: 6px 8px;
        font-size: 12px;
      }
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

## Advanced Styling

### Complete Custom Theme

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    cssClass='dark-theme'
    [ajaxSettings]='ajaxSettings'
    height="500px">
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .dark-theme {
      background-color: #1e1e1e;
      color: #e0e0e0;
    }
    
    /* Toolbar */
    :host ::ng-deep .dark-theme .e-fe-toolbar {
      background-color: #252526;
      border-bottom: 1px solid #3e3e42;
    }
    
    :host ::ng-deep .dark-theme .e-fe-toolbar button {
      color: #e0e0e0;
      background-color: transparent;
    }
    
    :host ::ng-deep .dark-theme .e-fe-toolbar button:hover {
      background-color: #3e3e42;
    }
    
    /* Navigation Pane */
    :host ::ng-deep .dark-theme .e-navigation-pane {
      background-color: #252526;
      border-right: 1px solid #3e3e42;
    }
    
    :host ::ng-deep .dark-theme .e-navigation-pane-item {
      color: #cccccc;
    }
    
    :host ::ng-deep .dark-theme .e-navigation-pane-item:hover {
      background-color: #3e3e42;
    }
    
    /* File List */
    :host ::ng-deep .dark-theme .e-fe-list {
      background-color: #1e1e1e;
    }
    
    :host ::ng-deep .dark-theme .e-fe-item {
      color: #e0e0e0;
    }
    
    :host ::ng-deep .dark-theme .e-fe-item:hover {
      background-color: #2d2d30;
    }
    
    :host ::ng-deep .dark-theme .e-fe-item.selected {
      background-color: #094771;
    }
    
    /* Grid/Table */
    :host ::ng-deep .dark-theme .e-grid {
      border-color: #3e3e42;
    }
    
    :host ::ng-deep .dark-theme .e-headercell {
      background-color: #2d2d30;
      color: #e0e0e0;
    }
    
    :host ::ng-deep .dark-theme .e-gridcontent tr {
      border-color: #3e3e42;
    }
    
    /* Dialog */
    :host ::ng-deep .dark-theme .e-dialog {
      background-color: #252526;
      color: #e0e0e0;
    }
    
    :host ::ng-deep .dark-theme .e-dialog-header {
      background-color: #2d2d30;
    }
    
    /* Input */
    :host ::ng-deep .dark-theme .e-input {
      background-color: #3e3e42;
      color: #e0e0e0;
      border-color: #555555;
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Custom Animations

```typescript
@Component({
  template: `<ejs-filemanager 
    cssClass='animated-theme'
    [ajaxSettings]='ajaxSettings'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .animated-theme .e-fe-item {
      transition: all 0.3s ease;
    }
    
    :host ::ng-deep .animated-theme .e-fe-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    :host ::ng-deep .animated-theme .e-fe-item.selected {
      animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    :host ::ng-deep .animated-theme .e-fe-toolbar button {
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    
    :host ::ng-deep .animated-theme .e-fe-toolbar button:active {
      animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.95);
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

### Brand Customization

```typescript
@Component({
  template: `<ejs-filemanager 
    cssClass='brand-theme'
    [ajaxSettings]='ajaxSettings'>
  </ejs-filemanager>`,
  styles: [`
    :host ::ng-deep .brand-theme {
      --primary-color: #ff6b6b;
      --secondary-color: #4ecdc4;
      --background: #f7f7f7;
    }
    
    :host ::ng-deep .brand-theme .e-fe-toolbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    :host ::ng-deep .brand-theme .e-fe-toolbar button {
      color: white;
    }
    
    :host ::ng-deep .brand-theme .e-fe-item.selected {
      background-color: #667eea;
      color: white;
    }
    
    :host ::ng-deep .brand-theme .e-navigation-pane {
      border-right: 3px solid #667eea;
    }
  `]
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

---

**Next:** Add localization and RTL support at [localization-and-rtl.md](localization-and-rtl.md).
