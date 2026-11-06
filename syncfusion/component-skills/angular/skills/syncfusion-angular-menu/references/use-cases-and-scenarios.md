# Use Cases and Real-World Patterns

## Table of Contents
- [Sidebar Navigation Menu](#sidebar-navigation-menu)
- [Application Menu Bar](#application-menu-bar)
- [Toolbar Menu](#toolbar-menu)
- [Context Menu Integration](#context-menu-integration)
- [ListView Integration](#listview-integration)
- [Mobile Navigation](#mobile-navigation)
- [Admin Dashboard Menu](#admin-dashboard-menu)

## Sidebar Navigation Menu

Vertical menu used in administrative dashboards and web applications:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <div class="logo">
        <h2>Dashboard</h2>
      </div>
      <ejs-menu 
        [items]="sidebarItems"
        orientation="Vertical"
        cssClass="sidebar-menu">
      </ejs-menu>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background-color: #2c3e50;
      height: 100vh;
      padding: 20px;
      box-shadow: 2px 0 8px rgba(0,0,0,0.1);
    }

    .logo {
      color: white;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid #34495e;
    }

    .sidebar-menu {
      background: transparent;
    }

    .sidebar-menu .e-menu-item {
      color: #ecf0f1;
      padding: 12px 16px;
      border-radius: 4px;
      margin: 4px 0;
      transition: all 0.3s ease;
    }

    .sidebar-menu .e-menu-item:hover {
      background-color: #34495e;
      color: #3498db;
      padding-left: 20px;
    }

    .sidebar-menu .e-ul {
      background-color: #34495e;
      margin-top: 8px;
      border-radius: 4px;
    }
  `]
})
export class SidebarComponent {
  public sidebarItems: MenuItemModel[] = [
    {
      text: 'Dashboard',
      iconCss: 'e-icons e-dashboard',
      url: '/dashboard'
    },
    {
      text: 'Management',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'Users', iconCss: 'e-icons e-user', url: '/users' },
        { text: 'Roles', iconCss: 'e-icons e-lock', url: '/roles' },
        { text: 'Permissions', iconCss: 'e-icons e-check', url: '/permissions' }
      ]
    },
    {
      text: 'Reports',
      iconCss: 'e-icons e-report',
      items: [
        { text: 'Analytics', url: '/reports/analytics' },
        { text: 'Revenue', url: '/reports/revenue' },
        { text: 'Performance', url: '/reports/performance' }
      ]
    },
    {
      text: 'Settings',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'General', url: '/settings/general' },
        { text: 'Security', url: '/settings/security' },
        { text: 'Notifications', url: '/settings/notifications' }
      ]
    },
    {
      text: 'Logout',
      iconCss: 'e-icons e-logout'
    }
  ];
}
```

### Responsive Sidebar

```typescript
@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-responsive-sidebar',
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed">
      <button class="toggle" (click)="toggleSidebar()">☰</button>
      <ejs-menu 
        [items]="sidebarItems"
        orientation="Vertical"
        cssClass="sidebar-menu">
      </ejs-menu>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      transition: width 0.3s ease;
    }

    .sidebar.collapsed {
      width: 60px;
    }

    .sidebar.collapsed .sidebar-menu .e-menu-item {
      padding: 12px 8px;
      font-size: 0;
    }

    .toggle {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        z-index: 1000;
      }
    }
  `]
})
export class ResponsiveSidebarComponent {
  public isCollapsed: boolean = false;

  public sidebarItems: MenuItemModel[] = [
    // ... sidebar items
  ];

  public toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
```

## Application Menu Bar

Traditional file/edit menu bar at the top of applications:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-menu-bar',
  template: `
    <header class="menu-bar">
      <div class="app-title">My Application</div>
      <ejs-menu 
        [items]="appMenuItems"
        orientation="Horizontal"
        cssClass="app-menu"
        (select)="onMenuSelect($event)">
      </ejs-menu>
    </header>
  `,
  styles: [`
    .menu-bar {
      background-color: #f8f9fa;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      align-items: center;
      padding: 0 20px;
    }

    .app-title {
      font-size: 18px;
      font-weight: bold;
      margin-right: auto;
      color: #333;
    }

    .app-menu {
      background: transparent;
    }

    .app-menu .e-menu-item {
      padding: 12px 16px;
      color: #333;
      border-radius: 4px;
    }

    .app-menu .e-menu-item:hover {
      background-color: #e9ecef;
    }
  `]
})
export class MenuBarComponent {
  public appMenuItems: MenuItemModel[] = [
    {
      text: 'File',
      items: [
        { text: 'New', keyCode: 'Ctrl+N' },
        { text: 'Open', keyCode: 'Ctrl+O' },
        { text: 'Recent', items: [
          { text: 'Document 1' },
          { text: 'Document 2' }
        ]},
        { separator: true },
        { text: 'Save', keyCode: 'Ctrl+S' },
        { text: 'Save As' },
        { separator: true },
        { text: 'Exit' }
      ]
    },
    {
      text: 'Edit',
      items: [
        { text: 'Undo', keyCode: 'Ctrl+Z' },
        { text: 'Redo', keyCode: 'Ctrl+Y' },
        { separator: true },
        { text: 'Cut', keyCode: 'Ctrl+X' },
        { text: 'Copy', keyCode: 'Ctrl+C' },
        { text: 'Paste', keyCode: 'Ctrl+V' }
      ]
    },
    {
      text: 'View',
      items: [
        { text: 'Zoom In' },
        { text: 'Zoom Out' },
        { text: 'Fit to Width' },
        { separator: true },
        { text: 'Full Screen' }
      ]
    },
    {
      text: 'Help',
      items: [
        { text: 'About' },
        { text: 'Documentation' },
        { text: 'Support' }
      ]
    }
  ];

  public onMenuSelect(args: MenuEventArgs): void {
    console.log('Selected:', args.item?.text);
    // Handle menu selection
  }
}
```

## Toolbar Menu

Horizontal toolbar with icon-based menus and commands:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <toolbar class="app-toolbar">
      <ejs-menu 
        [items]="toolbarItems"
        orientation="Horizontal"
        cssClass="toolbar-menu"
        showItemOnClick="true">
      </ejs-menu>
    </toolbar>
  `,
  styles: [`
    .app-toolbar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .toolbar-menu {
      background: transparent;
    }

    .toolbar-menu .e-menu-item {
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-weight: 500;
    }

    .toolbar-menu .e-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .toolbar-menu .e-icon {
      font-size: 18px;
      margin-right: 6px;
    }

    .toolbar-menu .e-ul {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
  `]
})
export class ToolbarComponent {
  public toolbarItems: MenuItemModel[] = [
    {
      text: '✎ Edit',
      iconCss: 'e-icons e-edit',
      items: [
        { text: 'Cut', iconCss: 'e-icons e-cut' },
        { text: 'Copy', iconCss: 'e-icons e-copy' },
        { text: 'Paste', iconCss: 'e-icons e-paste' }
      ]
    },
    {
      text: '⚙ Format',
      iconCss: 'e-icons e-settings',
      items: [
        { text: 'Bold' },
        { text: 'Italic' },
        { text: 'Underline' }
      ]
    },
    {
      text: '📊 View',
      iconCss: 'e-icons e-chart',
      items: [
        { text: 'Zoom In' },
        { text: 'Zoom Out' }
      ]
    }
  ];
}
```

## Context Menu Integration

Right-click context menu for UI elements:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-context-menu',
  template: `
    <div class="content-area" (contextmenu)="onContextMenu($event)">
      <p>Right-click to open context menu</p>
    </div>

    <div class="context-menu-wrapper" *ngIf="showContextMenu" 
      [style.left.px]="contextMenuX" 
      [style.top.px]="contextMenuY">
      <ejs-menu 
        [items]="contextMenuItems"
        cssClass="context-menu"
        (select)="onContextMenuSelect($event)">
      </ejs-menu>
    </div>
  `,
  styles: [`
    .content-area {
      width: 100%;
      height: 400px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: context-menu;
    }

    .context-menu-wrapper {
      position: fixed;
      z-index: 10000;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .context-menu {
      min-width: 150px;
    }

    .context-menu .e-menu-item {
      padding: 10px 16px;
    }
  `]
})
export class ContextMenuComponent {
  public showContextMenu: boolean = false;
  public contextMenuX: number = 0;
  public contextMenuY: number = 0;

  public contextMenuItems: MenuItemModel[] = [
    { text: 'Cut', iconCss: 'e-icons e-cut' },
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste' },
    { separator: true },
    { text: 'Delete', iconCss: 'e-icons e-delete' },
    { text: 'Rename', iconCss: 'e-icons e-rename' }
  ];

  public onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.showContextMenu = true;
  }

  public onContextMenuSelect(args: MenuEventArgs): void {
    console.log('Context menu item selected:', args.item?.text);
    this.showContextMenu = false;
  }
}
```

## ListView Integration

Combining Menu with ListView for hierarchical data display:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-menu-listview',
  template: `
    <div class="container">
      <div class="menu-panel">
        <h4>Categories</h4>
        <ejs-menu 
          [items]="categoryMenuItems"
          orientation="Vertical"
          (select)="onCategorySelect($event)">
        </ejs-menu>
      </div>
      <div class="content-panel">
        <h4>{{ selectedCategory }}</h4>
        <ul>
          <li *ngFor="let item of contentItems">{{ item }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      height: 100vh;
    }

    .menu-panel {
      width: 250px;
      border-right: 1px solid #ddd;
      padding: 20px;
      background-color: #f8f9fa;
    }

    .content-panel {
      flex: 1;
      padding: 20px;
    }

    h4 {
      margin-top: 0;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class MenuListviewComponent {
  public selectedCategory: string = 'Select a category';
  public contentItems: string[] = [];

  public categoryMenuItems: MenuItemModel[] = [
    {
      text: 'Fruits',
      items: [
        { text: 'Apple' },
        { text: 'Banana' },
        { text: 'Orange' }
      ]
    },
    {
      text: 'Vegetables',
      items: [
        { text: 'Carrot' },
        { text: 'Broccoli' },
        { text: 'Spinach' }
      ]
    },
    {
      text: 'Dairy',
      items: [
        { text: 'Milk' },
        { text: 'Cheese' },
        { text: 'Yogurt' }
      ]
    }
  ];

  public onCategorySelect(args: any): void {
    this.selectedCategory = args.item?.text || 'Select a category';
    // Load content items based on selection
  }
}
```

## Mobile Navigation

Responsive menu for mobile devices with hamburger menu pattern:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-mobile-nav',
  template: `
    <header class="mobile-header">
      <button class="menu-toggle" (click)="toggleMenu()">☰</button>
      <h1>MyApp</h1>
    </header>

    <nav class="mobile-menu" [class.open]="isMenuOpen">
      <ejs-menu 
        [items]="mobileMenuItems"
        orientation="Vertical"
        cssClass="mobile-nav-menu">
      </ejs-menu>
    </nav>
  `,
  styles: [`
    .mobile-header {
      background-color: #2c3e50;
      color: white;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .menu-toggle {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      margin-right: 12px;
      cursor: pointer;
    }

    .mobile-menu {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      z-index: 99;
    }

    .mobile-menu.open {
      transform: translateX(0);
    }

    .mobile-nav-menu {
      position: absolute;
      left: 0;
      top: 0;
      width: 250px;
      height: 100%;
      background-color: white;
    }

    @media (min-width: 768px) {
      .menu-toggle {
        display: none;
      }

      .mobile-menu {
        position: static;
        transform: none;
        background: transparent;
        width: auto;
        height: auto;
      }
    }
  `]
})
export class MobileNavComponent {
  public isMenuOpen: boolean = false;

  public mobileMenuItems: MenuItemModel[] = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    {
      text: 'Services',
      items: [
        { text: 'Web Design' },
        { text: 'Mobile Apps' },
        { text: 'Consulting' }
      ]
    },
    { text: 'Contact', url: '/contact' }
  ];

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
```

## Admin Dashboard Menu

Complete admin panel navigation with role-based items:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-admin-menu',
  template: `
    <nav class="admin-nav">
      <ejs-menu 
        [items]="adminMenuItems"
        orientation="Vertical"
        cssClass="admin-menu">
      </ejs-menu>
    </nav>
  `,
  styles: [`
    .admin-nav {
      background-color: #1a1a1a;
      min-height: 100vh;
      padding: 20px 0;
      box-shadow: inset -1px 0 0 rgba(255,255,255,.1);
    }

    .admin-menu .e-menu-item {
      color: #d0d0d0;
      padding: 12px 16px;
    }

    .admin-menu .e-menu-item:hover {
      background-color: #2a2a2a;
      color: #fff;
    }

    .admin-menu .e-ul {
      background-color: #252525;
    }
  `]
})
export class AdminMenuComponent {
  public userRole: string = 'admin'; // or 'moderator', 'viewer'

  public adminMenuItems: MenuItemModel[] = [
    {
      text: '📊 Dashboard',
      url: '/admin/dashboard'
    },
    {
      text: '👥 Users',
      items: [
        { text: 'All Users', url: '/admin/users' },
        { text: 'Add User', url: '/admin/users/new' },
        { text: 'Roles & Permissions', url: '/admin/roles' }
      ]
    },
    {
      text: '📄 Content',
      items: [
        { text: 'Pages', url: '/admin/pages' },
        { text: 'Posts', url: '/admin/posts' },
        { text: 'Media', url: '/admin/media' }
      ]
    },
    {
      text: '🔧 Settings',
      items: [
        { text: 'General', url: '/admin/settings/general' },
        { text: 'Security', url: '/admin/settings/security' },
        { text: 'Email', url: '/admin/settings/email' }
      ]
    },
    { separator: true },
    {
      text: '🚪 Logout',
      url: '/logout'
    }
  ];
}
```

---

These patterns cover the most common real-world implementations. Adapt them to your specific requirements and combine multiple patterns as needed for your application.
