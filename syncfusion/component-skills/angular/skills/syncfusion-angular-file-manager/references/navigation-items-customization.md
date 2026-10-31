# Navigation Items Customization in Syncfusion Angular File Manager

## Overview

The File Manager's navigation pane displays the folder hierarchy in a tree-like structure. You can customize the appearance and behavior of navigation items using templates, custom rendering, and styling.

## Table of Contents
- [Navigation Pane Template](#navigation-pane-template)
- [Custom Item Rendering](#custom-item-rendering)
- [Styling Navigation Items](#styling-navigation-items)
- [Dynamic Navigation Items](#dynamic-navigation-items)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

---

## Navigation Pane Template

### Overview

Customize the layout of each folder node in the navigation pane using the `navigationPaneTemplate` property.

### Basic Navigation Template

```typescript
import { Component } from '@angular/core';
import { FileManagerModule, NavigationPaneService, ToolbarService, DetailsViewService } from '@syncfusion/ej2-angular-filemanager';

@Component({
  selector: 'app-nav-template',
  imports: [FileManagerModule],
  providers: [NavigationPaneService, ToolbarService, DetailsViewService],
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="e-nav-item-content">
        <span class="folder-icon">📁</span>
        <span class="folder-name">{{ data?.name }}</span>
        <span class="item-count">({{ data?.count || 0 }})</span>
      </div>
    </ng-template>
    
  </ejs-filemanager>`,
  styles: [`
    .e-nav-item-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .folder-icon {
      font-size: 16px;
    }
    
    .folder-name {
      flex: 1;
    }
    
    .item-count {
      color: #999;
      font-size: 12px;
    }
  `]
})
export class NavTemplateComponent {
  public ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    getImageUrl: 'url'
  };
}
```

### Advanced Navigation Template

```typescript
export class AdvancedNavTemplateComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'
    (created)='onFileManagerCreated()'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="custom-nav-item" 
        [ngClass]="{'recent': data?.isRecent, 'favorite': data?.isFavorite}">
        
        <div class="nav-item-icon">
          <span *ngIf="data?.isFavorite" class="star">★</span>
          <span *ngIf="!data?.isFolder" class="file-type">
            {{ getFileType(data?.name) }}
          </span>
        </div>
        
        <div class="nav-item-info">
          <span class="nav-item-name">{{ data?.name }}</span>
          <span class="nav-item-meta">
            {{ data?.modified | date:'short' }}
          </span>
        </div>
        
        <div class="nav-item-actions">
          <button (click)="addToFavorites(data)" class="action-btn">
            {{ data?.isFavorite ? '❤️' : '🤍' }}
          </button>
        </div>
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    .custom-nav-item {
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .custom-nav-item:hover {
      background-color: #f5f5f5;
    }
    
    .custom-nav-item.favorite {
      background-color: #fff9e6;
    }
    
    .nav-item-icon {
      width: 24px;
      text-align: center;
      margin-right: 8px;
    }
    
    .nav-item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    
    .nav-item-name {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .nav-item-meta {
      font-size: 12px;
      color: #999;
    }
    
    .nav-item-actions {
      margin-left: 8px;
    }
    
    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
    }
  `;

  private favorites: Set<string> = new Set();

  public getFileType(fileName: string): string {
    const ext = fileName?.substring(fileName.lastIndexOf('.')).toLowerCase() || '';
    const typeMap: { [key: string]: string } = {
      '.pdf': '📄',
      '.doc': '📋',
      '.docx': '📋',
      '.xls': '📊',
      '.xlsx': '📊',
      '.ppt': '🎨',
      '.pptx': '🎨',
      '.jpg': '🖼️',
      '.png': '🖼️',
      '.zip': '📦',
      '.txt': '📝'
    };
    return typeMap[ext] || '📄';
  }

  public addToFavorites(item: any): void {
    if (this.favorites.has(item.name)) {
      this.favorites.delete(item.name);
      item.isFavorite = false;
    } else {
      this.favorites.add(item.name);
      item.isFavorite = true;
    }
  }

  public onFileManagerCreated(): void {
    console.log('File Manager created');
  }
}
```

---

## Custom Item Rendering

### Custom Navigation Item Styles

```typescript
export class StyledNavItemComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="styled-nav-item">
        <div class="nav-item-level" [style.marginLeft.px]="getItemLevel(data) * 16">
          <span class="nav-item-icon">
            {{ data?.isFolder ? '📁' : '📄' }}
          </span>
          <span class="nav-item-label">{{ data?.name }}</span>
          <span *ngIf="data?.unreadCount" class="badge">
            {{ data?.unreadCount }}
          </span>
        </div>
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    .styled-nav-item {
      padding: 4px 0;
    }
    
    .nav-item-level {
      display: flex;
      align-items: center;
      padding: 6px 8px;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
    }
    
    .nav-item-level:hover {
      background-color: #e8e8e8;
    }
    
    .nav-item-icon {
      margin-right: 8px;
      font-size: 16px;
    }
    
    .nav-item-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .badge {
      background-color: #ff4444;
      color: white;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 12px;
      margin-left: 8px;
    }
  `;

  private getItemLevel(data: any): number {
    // Calculate nesting level based on path
    return data?.path?.split('/').length - 2 || 0;
  }
}
```

### Icon and Badge Integration

```typescript
export class IconBadgeNavComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="nav-item-with-badge">
        <span class="nav-icon" [innerHTML]="getIconHTML(data)"></span>
        <span class="nav-label">{{ data?.name }}</span>
        <span *ngIf="data?.newItems" class="new-badge">NEW</span>
        <span *ngIf="data?.unreadCount > 0" class="count-badge">
          {{ data?.unreadCount }}
        </span>
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    .nav-item-with-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 4px;
    }
    
    .nav-icon {
      font-size: 18px;
      flex-shrink: 0;
    }
    
    .nav-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .new-badge {
      background: #ff6b6b;
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    .count-badge {
      background: #4c6ef5;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: bold;
      min-width: 20px;
      text-align: center;
      flex-shrink: 0;
    }
  `;

  private getIconHTML(data: any): string {
    const iconMap: { [key: string]: string } = {
      'Desktop': '🖥️',
      'Documents': '📂',
      'Downloads': '⬇️',
      'Pictures': '🖼️',
      'Videos': '🎬',
      'Music': '🎵',
      'Favorites': '⭐'
    };
    return iconMap[data?.name] || '📁';
  }
}
```

---

## Styling Navigation Items

### CSS Styling Approach

```typescript
export class StyledNavigationComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings' 
    class='themed-nav'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="nav-item" [ngClass]="data?.category">
        {{ data?.name }}
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    /* Navigation pane styling */
    .e-navigation-pane {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .e-list-item {
      border-left: 3px solid transparent;
      transition: all 0.3s ease;
    }
    
    .e-list-item:hover {
      border-left-color: #667eea;
      background-color: rgba(102, 126, 234, 0.1);
    }
    
    .e-list-item.e-active {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.2) 0%, transparent 100%);
      border-left-color: #667eea;
      font-weight: 600;
    }
    
    /* Navigation item styling */
    .nav-item {
      padding: 8px 12px;
      border-radius: 4px;
      transition: background-color 0.2s;
    }
    
    .nav-item.folder {
      color: #4c5fd5;
      font-weight: 500;
    }
    
    .nav-item.recent {
      color: #e74c3c;
    }
    
    .nav-item.shared {
      color: #27ae60;
    }
  `;
}
```

### Dynamic Theme Application

```typescript
export class ThemableNavigationComponent {
  template: `<div [ngClass]="'theme-' + currentTheme">
    <ejs-filemanager 
      id='file-manager' 
      [ajaxSettings]='ajaxSettings'>
      
      <ng-template #navigationPaneTemplate let-data>
        <div class="themed-nav-item">
          <span class="theme-icon">{{ getThemeIcon(data) }}</span>
          <span class="theme-label">{{ data?.name }}</span>
        </div>
      </ng-template>
      
    </ejs-filemanager>
  </div>`;

  public currentTheme = 'light';

  private themeStyles = {
    light: `
      .theme-light .themed-nav-item {
        color: #333;
      }
      .theme-light .e-navigation-pane {
        background: #ffffff;
        border-right: 1px solid #ddd;
      }
    `,
    dark: `
      .theme-dark .themed-nav-item {
        color: #eee;
      }
      .theme-dark .e-navigation-pane {
        background: #2a2a2a;
        border-right: 1px solid #444;
      }
    `
  };

  public switchTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
  }

  private applyTheme(theme: string): void {
    const styleId = 'nav-theme-style';
    let styleElement = document.getElementById(styleId);
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = this.themeStyles[theme as keyof typeof this.themeStyles];
  }

  private getThemeIcon(data: any): string {
    return data?.isFolder ? '📁' : '📄';
  }
}
```

---

## Dynamic Navigation Items

### Customize Based on Path

```typescript
export class DynamicNavItemComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="dynamic-nav-item">
        <span class="dynamic-icon" [innerHTML]="getIconForPath(data?.path)"></span>
        <span class="dynamic-label">{{ getDisplayName(data?.name, data?.path) }}</span>
        <span *ngIf="isNew(data?.path)" class="new-indicator">●</span>
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    .dynamic-nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
    }
    
    .dynamic-icon {
      font-size: 16px;
      flex-shrink: 0;
    }
    
    .dynamic-label {
      flex: 1;
    }
    
    .new-indicator {
      color: #ff6b6b;
      font-size: 12px;
      flex-shrink: 0;
    }
  `;

  private recentPaths: Set<string> = new Set();

  private getIconForPath(path: string): string {
    const iconMap: { [key: string]: string } = {
      '/desktop': '🖥️',
      '/documents': '📂',
      '/downloads': '⬇️',
      '/pictures': '🖼️',
      '/videos': '🎬',
      '/music': '🎵',
      '/favorite': '⭐'
    };
    return iconMap[path] || '📁';
  }

  private getDisplayName(name: string, path: string): string {
    // Customize display names based on path
    if (path?.includes('/favorite')) {
      return `★ ${name}`;
    }
    if (path?.includes('/recent')) {
      return `↻ ${name}`;
    }
    return name;
  }

  private isNew(path: string): boolean {
    return path?.includes('/new') || false;
  }
}
```

---

## Practical Examples

### Example 1: Professional Navigation Pane

```typescript
export class ProfessionalNavComponent {
  template: `<ejs-filemanager 
    id='file-manager' 
    [ajaxSettings]='ajaxSettings'>
    
    <ng-template #navigationPaneTemplate let-data>
      <div class="professional-nav">
        <div class="nav-content">
          <span class="nav-icon" [class]="'icon-' + getCategory(data?.path)">
            {{ getIcon(data) }}
          </span>
          <div class="nav-text">
            <div class="nav-primary">{{ data?.name }}</div>
            <div *ngIf="data?.itemCount > 0" class="nav-secondary">
              {{ data?.itemCount }} items
            </div>
          </div>
        </div>
        <div class="nav-meta">
          <span *ngIf="data?.hasAccess" class="access-badge">
            ✓
          </span>
        </div>
      </div>
    </ng-template>
    
  </ejs-filemanager>`;

  styles: `
    .professional-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 8px;
    }
    
    .nav-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
    }
    
    .nav-icon {
      font-size: 18px;
      flex-shrink: 0;
    }
    
    .nav-text {
      flex: 1;
      min-width: 0;
    }
    
    .nav-primary {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .nav-secondary {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
    }
    
    .nav-meta {
      font-size: 12px;
      color: #27ae60;
    }
  `;

  getIcon(data: any): string {
    return data?.isFolder ? '📁' : '📄';
  }

  getCategory(path: string): string {
    if (path?.includes('shared')) return 'shared';
    if (path?.includes('recent')) return 'recent';
    return 'folder';
  }
}
```

---

## Best Practices

1. **Performance** - Keep template rendering simple to maintain performance
2. **Accessibility** - Ensure proper semantic HTML and ARIA labels
3. **Responsiveness** - Design templates that work on different screen sizes
4. **Consistency** - Match styling with overall application design
5. **Usability** - Provide clear visual feedback for interactive elements

---

**Related Documentation:**
- [Navigation Features](navigation-features.md)
- [UI Customizations](ui-customizations.md)
- [Customization](customization-styling.md)
