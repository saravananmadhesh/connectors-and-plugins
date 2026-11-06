# Templates & Icons

## Table of Contents
- [Icon Font Libraries](#icon-font-libraries)
- [Icon Positioning](#icon-positioning)
- [Material Design Icons](#material-design-icons)
- [Font Awesome Icons](#font-awesome-icons)
- [Bootstrap Icons](#bootstrap-icons)
- [Item Templates](#item-templates)
- [Content Templates](#content-templates)
- [Image Icons](#image-icons)
- [Custom Icon Combinations](#custom-icon-combinations)

## Icon Font Libraries

### Using Material Design Icons

Material Design icons are the default in Syncfusion components:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'New', iconCss: 'e-icons e-file' },
    { text: 'Open', iconCss: 'e-icons e-folder-open' },
    { text: 'Save', iconCss: 'e-icons e-save' },
    { separator: true },
    { text: 'Print', iconCss: 'e-icons e-print' },
    { text: 'Export', iconCss: 'e-icons e-export' }
  ];
}
```

**Common Material Icons:**
- `e-icons e-file` - File icon
- `e-icons e-folder-open` - Folder open icon
- `e-icons e-save` - Save icon
- `e-icons e-print` - Print icon
- `e-icons e-export` - Export icon
- `e-icons e-download` - Download icon
- `e-icons e-delete` - Delete icon
- `e-icons e-copy` - Copy icon
- `e-icons e-cut` - Cut icon
- `e-icons e-paste` - Paste icon
- `e-icons e-edit` - Edit icon
- `e-icons e-search` - Search icon
- `e-icons e-settings` - Settings icon

### Using Font Awesome Icons

Include Font Awesome CDN:

```html
<!-- In index.html -->
<link rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

Then use Font Awesome classes:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Create', iconCss: 'fas fa-plus' },
    { text: 'Edit', iconCss: 'fas fa-edit' },
    { text: 'Delete', iconCss: 'fas fa-trash' },
    { separator: true },
    { text: 'Share', iconCss: 'fas fa-share' },
    { text: 'Download', iconCss: 'fas fa-download' }
  ];
}
```

**Font Awesome Icon Classes:**
- `fas fa-plus` - Plus icon
- `fas fa-edit` - Edit icon
- `fas fa-trash` - Trash icon
- `fas fa-save` - Save icon
- `fas fa-download` - Download icon
- `fas fa-upload` - Upload icon
- `fas fa-share` - Share icon
- `fas fa-print` - Print icon
- `fas fa-search` - Search icon
- `fas fa-gear` - Settings icon
- `fas fa-user` - User icon
- `fas fa-lock` - Lock icon

### Using Bootstrap Icons

Include Bootstrap Icons CSS:

```html
<!-- In index.html -->
<link rel="stylesheet" 
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
```

Then use Bootstrap icon classes:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Home', iconCss: 'bi bi-house' },
    { text: 'User', iconCss: 'bi bi-person' },
    { text: 'Settings', iconCss: 'bi bi-gear' },
    { separator: true },
    { text: 'Logout', iconCss: 'bi bi-box-arrow-right' }
  ];
}
```

**Bootstrap Icon Classes:**
- `bi bi-house` - Home icon
- `bi bi-person` - Person icon
- `bi bi-gear` - Settings icon
- `bi bi-file` - File icon
- `bi bi-folder` - Folder icon
- `bi bi-download` - Download icon
- `bi bi-upload` - Upload icon
- `bi bi-trash` - Trash icon
- `bi bi-pencil` - Edit/pencil icon
- `bi bi-plus` - Plus icon
- `bi bi-search` - Search icon

## Icon Positioning

### Left-Aligned Icons (Default)

Icons appear on the left side of text:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save', iconCss: 'e-icons e-save' },
    { text: 'Export', iconCss: 'e-icons e-export' }
  ];
}
```

```html
<ejs-splitbutton 
  content="Actions"
  iconCss="e-icons e-menu"
  [items]="items">
</ejs-splitbutton>
```

**Result:** Icon [space] Text

### Right-Aligned Icons

Using CSS to position icons on right:

```css
:host ::ng-deep .e-split-button.e-suffix-icon .e-icon {
  margin-left: 8px;
  margin-right: 0;
}

:host ::ng-deep .e-split-button.e-suffix-icon .e-btn {
  display: flex;
  flex-direction: row-reverse;
}
```

```html
<ejs-splitbutton 
  content="Actions"
  cssClass="e-suffix-icon"
  iconCss="e-icons e-menu"
  [items]="items">
</ejs-splitbutton>
```

### Icon Sizing

```css
/* Small icons */
:host ::ng-deep .e-split-button.e-small-icon .e-icon {
  font-size: 12px;
}

/* Medium icons (default) */
:host ::ng-deep .e-split-button .e-icon {
  font-size: 16px;
}

/* Large icons */
:host ::ng-deep .e-split-button.e-large-icon .e-icon {
  font-size: 20px;
}

/* Extra large icons */
:host ::ng-deep .e-split-button.e-xl-icon .e-icon {
  font-size: 24px;
}
```

## Material Design Icons

Complete list of available Material Design icons:

```typescript
export class AppComponent {
  public basicIcons: ItemModel[] = [
    // Navigation
    { text: 'Back', iconCss: 'e-icons e-back' },
    { text: 'Home', iconCss: 'e-icons e-home' },
    { text: 'Search', iconCss: 'e-icons e-search' },
    { separator: true },
    
    // Files
    { text: 'New File', iconCss: 'e-icons e-file' },
    { text: 'Folder', iconCss: 'e-icons e-folder' },
    { text: 'Open', iconCss: 'e-icons e-folder-open' },
    { separator: true },
    
    // Edit
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' },
    { separator: true },
    
    // Actions
    { text: 'Save', iconCss: 'e-icons e-save' },
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Download', iconCss: 'e-icons e-download' }
  ];
}
```

## Font Awesome Icons

Comprehensive Font Awesome icon examples:

```typescript
export class AppComponent {
  public fontAwesomeIcons: ItemModel[] = [
    // File operations
    { text: 'New', iconCss: 'fas fa-file' },
    { text: 'Save', iconCss: 'fas fa-save' },
    { text: 'Open', iconCss: 'fas fa-folder-open' },
    { separator: true },
    
    // Editing
    { text: 'Edit', iconCss: 'fas fa-edit' },
    { text: 'Delete', iconCss: 'fas fa-trash' },
    { text: 'Duplicate', iconCss: 'fas fa-copy' },
    { separator: true },
    
    // Sharing
    { text: 'Share', iconCss: 'fas fa-share' },
    { text: 'Download', iconCss: 'fas fa-download' },
    { text: 'Print', iconCss: 'fas fa-print' }
  ];
}
```

## Bootstrap Icons

Bootstrap icon examples:

```typescript
export class AppComponent {
  public bootstrapIcons: ItemModel[] = [
    // Navigation
    { text: 'Home', iconCss: 'bi bi-house-fill' },
    { text: 'Back', iconCss: 'bi bi-arrow-left' },
    { text: 'Next', iconCss: 'bi bi-arrow-right' },
    { separator: true },
    
    // User
    { text: 'Profile', iconCss: 'bi bi-person-circle' },
    { text: 'Settings', iconCss: 'bi bi-gear' },
    { text: 'Logout', iconCss: 'bi bi-box-arrow-right' },
    { separator: true },
    
    // Communication
    { text: 'Messages', iconCss: 'bi bi-chat-dots' },
    { text: 'Notifications', iconCss: 'bi bi-bell' },
    { text: 'Help', iconCss: 'bi bi-question-circle' }
  ];
}
```

## Item Templates

### HTML Content in Items

Use Angular's `*ngIf` and `*ngFor` with custom markup:

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { 
      id: 'profile',
      text: 'Profile',
      iconCss: 'bi bi-person'
    },
    { 
      id: 'settings',
      text: 'Settings',
      iconCss: 'bi bi-gear'
    }
  ];
}
```

```html
<ejs-splitbutton 
  content="Account"
  [items]="items">
</ejs-splitbutton>
```

### Rich Item Content

```typescript
export class AppComponent {
  public advancedItems: ItemModel[] = [
    {
      id: 'status-online',
      text: 'Online',
      iconCss: 'e-icons e-user-status-online',
      title: 'Set status to online'
    },
    {
      id: 'status-busy',
      text: 'Busy',
      iconCss: 'e-icons e-user-status-busy',
      title: 'Set status to busy'
    },
    {
      id: 'status-away',
      text: 'Away',
      iconCss: 'e-icons e-user-status-away',
      title: 'Set status to away'
    },
    {
      id: 'status-offline',
      text: 'Offline',
      iconCss: 'e-icons e-user-status-offline',
      title: 'Set status to offline'
    }
  ];
}
```

## Content Templates

### Custom Primary Button Content

```typescript
export class AppComponent {
  currentLanguage: string = 'English';
  
  public languages: ItemModel[] = [
    { id: 'en', text: 'English' },
    { id: 'es', text: 'Español' },
    { id: 'fr', text: 'Français' },
    { id: 'de', text: 'Deutsch' }
  ];
  
  onLanguageSelect(args: any): void {
    this.currentLanguage = args.item.text;
  }
}
```

```html
<ejs-splitbutton 
  [content]="currentLanguage"
  [items]="languages"
  (select)="onLanguageSelect($event)">
</ejs-splitbutton>

<p>Current Language: {{ currentLanguage }}</p>
```

## Image Icons

### Using Image as Icon

```css
/* Custom CSS for image icons */
:host ::ng-deep .e-image-icon::before {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 8px;
}

:host ::ng-deep .e-icon-user::before {
  background-image: url('/assets/icons/user.svg');
}

:host ::ng-deep .e-icon-settings::before {
  background-image: url('/assets/icons/settings.svg');
}
```

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'User Profile', iconCss: 'e-image-icon e-icon-user' },
    { text: 'Settings', iconCss: 'e-image-icon e-icon-settings' }
  ];
}
```

### Data URI Images

```css
:host ::ng-deep .e-icon-avatar::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23667eea"/></svg>');
  background-size: contain;
  margin-right: 8px;
}
```

## Custom Icon Combinations

### Icon + Badge

```typescript
export class AppComponent {
  notificationCount: number = 5;
  
  public items: ItemModel[] = [
    { text: 'Messages', iconCss: 'bi bi-chat-dots', id: 'messages' },
    { text: 'Notifications', iconCss: 'bi bi-bell', id: 'notifications' }
  ];
}
```

```html
<div style="position: relative; display: inline-block;">
  <ejs-splitbutton 
    content="Account"
    [items]="items">
  </ejs-splitbutton>
  
  <span *ngIf="notificationCount > 0" 
    style="position: absolute; top: -8px; right: -8px; 
    background-color: #dc3545; color: white; border-radius: 10px; 
    width: 20px; height: 20px; text-align: center; font-size: 12px; line-height: 20px;">
    {{ notificationCount }}
  </span>
</div>
```

### Icon + Tooltip

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { 
      text: 'Save Document',
      iconCss: 'e-icons e-save',
      title: 'Save (Ctrl+S)'
    },
    { 
      text: 'Print Document',
      iconCss: 'e-icons e-print',
      title: 'Print (Ctrl+P)'
    },
    { 
      text: 'Export PDF',
      iconCss: 'e-icons e-export',
      title: 'Export as PDF'
    }
  ];
}
```

### Multiple Icon Styles

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    // Material Design icons
    { text: 'Save', iconCss: 'e-icons e-save' },
    
    // Font Awesome icons
    { text: 'Edit', iconCss: 'fas fa-edit' },
    
    // Bootstrap icons
    { text: 'Delete', iconCss: 'bi bi-trash' }
  ];
}
```

**Note:** Mix different icon libraries carefully to ensure consistent styling.

### Icon Color Variations

```css
/* Custom icon colors */
:host ::ng-deep .e-danger-icon {
  color: #dc3545;
}

:host ::ng-deep .e-success-icon {
  color: #28a745;
}

:host ::ng-deep .e-warning-icon {
  color: #ffc107;
}

:host ::ng-deep .e-info-icon {
  color: #17a2b8;
}
```

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { 
      text: 'Delete',
      iconCss: 'e-icons e-delete e-danger-icon'
    },
    { 
      text: 'Complete',
      iconCss: 'e-icons e-check e-success-icon'
    },
    { 
      text: 'Warning',
      iconCss: 'e-icons e-warning e-warning-icon'
    }
  ];
}
```

Your templates and icons are now ready! Explore [popup-positioning.md](popup-positioning.md) for positioning options.
