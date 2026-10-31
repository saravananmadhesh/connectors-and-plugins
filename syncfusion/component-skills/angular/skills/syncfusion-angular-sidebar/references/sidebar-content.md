# Sidebar Content and Components

## Table of Contents
- [Sidebar Content Overview](#sidebar-content-overview)
- [ListView Integration](#listview-integration)
- [TreeView Integration](#treeview-integration)
- [Custom HTML Content](#custom-html-content)
- [Target Element Configuration](#target-element-configuration)

## Sidebar Content Overview

> ℹ️ **Targeting Mode:** Unless otherwise noted, examples in this section use **implicit targeting** (sidebar automatically targets the next sibling div). Some advanced examples show **explicit targeting** with the `[target]` property.

The Sidebar is a flexible container that supports any HTML content or Angular components. Common content patterns include:
- Simple text and links
- ListView for list-based navigation
- TreeView for hierarchical menus
- Custom HTML with icons
- Component instances

## ListView Integration

Use ListView component inside Sidebar for structured list navigation:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule, ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              [width]="'260px'"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="sidebar-header">
                <span>Navigation</span>
              </div>
              <ejs-listview #listView
                [dataSource]="listData"
                (select)="onSelect($event)">
              </ejs-listview>
            </ejs-sidebar>
            <div>
              <div class="toolbar">
                <button (click)="toggleSidebar()">☰ Menu</button>
              </div>
              <div class="content">
                <h2>{{ selectedItem }}</h2>
                <p>Selected item content</p>
              </div>
            </div>`,
  styles: [`
    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid #e0e0e0;
      font-weight: bold;
    }
  `]
})
export class ListViewSidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  listData = [
    { id: '1', text: 'Home', icon: 'e-icons e-home' },
    { id: '2', text: 'Profile', icon: 'e-icons e-user' },
    { id: '3', text: 'Settings', icon: 'e-icons e-settings' },
    { id: '4', text: 'About', icon: 'e-icons e-info' }
  ];

  selectedItem = 'Select an item';

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  onSelect(args: any) {
    this.selectedItem = args.text;
    this.sidebar?.hide(); // Auto-close after selection
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### ListView with Icons

Display icons alongside list items:

```typescript
template: `<ejs-listview #listView
            [dataSource]="listData"
            [headerTitle]="'Menu'"
            [showIcon]="true"
            (select)="onSelect($event)"
            template="<span class='{{icon}}'></span><span class='text'>{{text}}</span>">
          </ejs-listview>`,
```

## TreeView Integration

Use TreeView for hierarchical navigation structure:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule, TreeViewModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              [width]="'280px'"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="sidebar-header">
                <span>Explore</span>
              </div>
              <ejs-treeview #treeView
                [fields]="treeFields"
                [dataSource]="treeData"
                (nodeSelected)="onNodeSelect($event)">
              </ejs-treeview>
            </ejs-sidebar>
            <div>
              <div class="toolbar">
                <button (click)="toggleSidebar()">☰ Menu</button>
              </div>
              <div class="content">
                <h2>{{ selectedNode }}</h2>
              </div>
            </div>`,
  styles: [`
    .sidebar-header {
      padding: 15px;
      border-bottom: 1px solid #e0e0e0;
      font-weight: bold;
    }
  `]
})
export class TreeViewSidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  treeFields: any = { dataSource: this.treeData, id: 'id', text: 'text', child: 'child' };

  treeData = [
    {
      id: '1', text: 'Documents',
      child: [
        { id: '1-1', text: 'Reports' },
        { id: '1-2', text: 'Proposals' }
      ]
    },
    {
      id: '2', text: 'Media',
      child: [
        { id: '2-1', text: 'Images' },
        { id: '2-2', text: 'Videos' }
      ]
    },
    {
      id: '3', text: 'Downloads'
    }
  ];

  selectedNode = 'Select an item';

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  onNodeSelect(args: any) {
    this.selectedNode = args.node.innerText;
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

## Custom HTML Content

Create custom sidebar content with HTML structure:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              [width]="'280px'"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <!-- Sidebar Header -->
              <div class="sidebar-header">
                <img src="assets/profile.jpg" alt="Profile" class="profile-pic">
                <h3>John Doe</h3>
                <p>john@example.com</p>
              </div>

              <!-- Navigation Menu -->
              <nav class="sidebar-nav">
                <div class="nav-section">
                  <h4>Main</h4>
                  <ul>
                    <li><a href="#"><span class="icon home-icon"></span>Home</a></li>
                    <li><a href="#"><span class="icon search-icon"></span>Search</a></li>
                    <li><a href="#"><span class="icon heart-icon"></span>Favorites</a></li>
                  </ul>
                </div>

                <div class="nav-section">
                  <h4>Library</h4>
                  <ul>
                    <li><a href="#"><span class="icon folder-icon"></span>Your Uploads</a></li>
                    <li><a href="#"><span class="icon history-icon"></span>History</a></li>
                    <li><a href="#"><span class="icon watch-icon"></span>Watch Later</a></li>
                  </ul>
                </div>
              </nav>

              <!-- Sidebar Footer -->
              <div class="sidebar-footer">
                <button (click)="logout()">Logout</button>
              </div>
            </ejs-sidebar>

            <div class="main-content">
              <div class="toolbar">
                <button (click)="toggleSidebar()">☰</button>
                <h1>Dashboard</h1>
              </div>
            </div>`,
  styles: [`
    .sidebar-header {
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid #e0e0e0;
    }
    .profile-pic {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .sidebar-nav {
      padding: 15px 0;
    }
    .nav-section {
      padding: 10px 0;
    }
    .nav-section h4 {
      padding-left: 15px;
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      margin: 5px 0;
    }
    .nav-section ul {
      list-style: none;
      padding: 0;
    }
    .nav-section li {
      padding: 0;
    }
    .nav-section a {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      text-decoration: none;
      color: #333;
      transition: background 0.3s;
    }
    .nav-section a:hover {
      background: #f5f5f5;
    }
    .icon {
      display: inline-block;
      width: 20px;
      margin-right: 10px;
    }
    .sidebar-footer {
      position: absolute;
      bottom: 20px;
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
    }
    .sidebar-footer button {
      width: 100%;
      padding: 10px;
      background: #ddd;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class CustomContentComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }

  logout() {
    console.log('Logging out...');
    this.sidebar?.hide();
  }
}
```

## Target Element Configuration

The `target` property specifies which element to affect when sidebar opens/closes. **Important:** Inside the target container, you must have a wrapper div for the actual content:

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  template: `<ejs-sidebar id="sidebar" #sidebar 
              [target]="'#wrapper'"
              type="Push"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </ejs-sidebar>

            <!-- Target container with inner wrapper -->
            <div id="wrapper">
              <div>
                <div class="toolbar">
                  <button (click)="toggleSidebar()">☰ Menu</button>
                </div>
                <div class="content">
                  <h1>Main Content</h1>
                  <p>Content that moves with sidebar</p>
                </div>
              </div>
            </div>`
})
export class TargetElementComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### Best Practices for Target

1. **Target container** (`id="wrapper"`) - Defines the area to be affected
2. **Inner wrapper div** - Contains actual content that moves/resizes
3. **Prevents unwanted shifts** - Header/footer outside target unaffected
4. **Proper structure:**
   ```html
   <ejs-sidebar [target]="'#wrapper'"></ejs-sidebar>
   <div id="wrapper">              <!-- Target container -->
     <div>                         <!-- Inner wrapper (REQUIRED) -->
       <div class="content">Content</div>
     </div>
   </div>
   ```

## Complete Example: Email Application

Combine ListView with sidebar for email-like navigation. **Note the target wrapper structure:**

```typescript
@Component({
  imports: [SidebarModule, ListViewModule],
  standalone: true,
  selector: 'app-mail',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              [width]="'280px'"
              type="Push"
              [target]="'#wrapper'"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="mail-header">
                <h3>Gmail</h3>
              </div>
              <ejs-listview [dataSource]="folders"
                (select)="onFolderSelect($event)">
              </ejs-listview>
            </ejs-sidebar>

            <!-- Target container with inner wrapper -->
            <div id="wrapper">
              <div>
                <div class="mail-toolbar">
                  <button (click)="toggleSidebar()">☰</button>
                  <input type="text" placeholder="Search emails">
                </div>
                <div class="mail-list">
                  <div class="email-item" *ngFor="let email of emails">
                    <strong>{{ email.from }}</strong>
                    <p>{{ email.subject }}</p>
                  </div>
                </div>
              </div>
            </div>`
})
export class MailApplicationComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  folders = [
    { text: 'Inbox', icon: 'e-icon-inbox' },
    { text: 'Starred', icon: 'e-icon-star' },
    { text: 'Sent', icon: 'e-icon-sent' },
    { text: 'Drafts', icon: 'e-icon-draft' },
    { text: 'Spam', icon: 'e-icon-spam' }
  ];

  emails = [
    { from: 'John Smith', subject: 'Meeting Tomorrow' },
    { from: 'Jane Doe', subject: 'Project Update' }
  ];

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }

  onFolderSelect(args: any) {
    console.log('Selected folder:', args.text);
    // Load emails for selected folder
  }
}
```
