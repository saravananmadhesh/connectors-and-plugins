# Layout Patterns and Recipes

## Table of Contents
- [Two-Pane Sidebar Layout](#two-pane-sidebar-layout)
- [Three-Pane Editor Layout](#three-pane-editor-layout)
- [Nested Complex Layouts](#nested-complex-layouts)
- [Responsive Dashboard](#responsive-dashboard)

---

## Two-Pane Sidebar Layout

Classic sidebar + content pattern, ideal for navigation and dashboards.

### Basic Sidebar Layout

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='100vh' width='100%'>
      <e-panes>
        <!-- Sidebar Navigation -->
        <e-pane size='250px'>
          <ng-template #content>
            <div class='sidebar'>
              <h2>Navigation</h2>
              <ul class='nav-menu'>
                <li>Dashboard</li>
                <li>Analytics</li>
                <li>Reports</li>
                <li>Settings</li>
              </ul>
            </div>
          </ng-template>
        </e-pane>

        <!-- Main Content Area -->
        <e-pane>
          <ng-template #content>
            <div class='content'>
              <h1>Dashboard</h1>
              <p>Main content area with dynamic content</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .sidebar {
      background-color: #f5f5f5;
      padding: 20px;
      height: 100%;
      overflow: auto;
      border-right: 1px solid #ddd;
    }

    .nav-menu {
      list-style: none;
      padding: 0;
    }

    .nav-menu li {
      padding: 10px 15px;
      cursor: pointer;
      border-radius: 4px;
    }

    .nav-menu li:hover {
      background-color: #e0e0e0;
    }

    .content {
      padding: 30px;
    }
  `]
})
export class SidebarLayoutComponent {}
```

### Collapsible Sidebar

```typescript
<ejs-splitter height='100vh' width='100%'>
  <e-panes>
    <!-- Collapsible sidebar -->
    <e-pane size='250px' [collapsible]='true'>
      <ng-template #content>
        <div class='sidebar'>
          <h2>Menu</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </ng-template>
    </e-pane>

    <!-- Content -->
    <e-pane>
      <ng-template #content>
        <div class='content'>Main Area</div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Resizable Sidebar with Constraints

```typescript
<e-panes>
  <!-- Sidebar: min 150px, max 400px, default 250px -->
  <e-pane size='250px' min='150px' max='400px'>
    <ng-template #content>
      <div class='sidebar'>Navigation</div>
    </ng-template>
  </e-pane>

  <!-- Content: flexible -->
  <e-pane>
    <ng-template #content>
      <div class='content'>Main Content</div>
    </ng-template>
  </e-pane>
</e-panes>
```

---

## Three-Pane Editor Layout

IDE/Editor-style layout with left explorer, center editor, and right inspector.

### Complete Editor Layout

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-editor-layout',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='100vh' width='100%'>
      <e-panes>
        <!-- Left: File Explorer (200px) -->
        <e-pane size='200px' min='150px' max='350px'>
          <ng-template #content>
            <div class='explorer'>
              <h3>Explorer</h3>
              <ul class='file-tree'>
                <li>📁 src/
                  <ul>
                    <li>📄 app.component.ts</li>
                    <li>📄 app.component.html</li>
                  </ul>
                </li>
                <li>📁 node_modules/</li>
                <li>📄 package.json</li>
              </ul>
            </div>
          </ng-template>
        </e-pane>

        <!-- Center: Code Editor (flexible) -->
        <e-pane>
          <ng-template #content>
            <div class='editor'>
              <div class='editor-tabs'>
                <span class='tab active'>app.component.ts</span>
                <span class='tab'>app.component.html</span>
              </div>
              <div class='editor-content'>
                <pre><code>export class AppComponent {{
  title = 'My App';
}}</code></pre>
              </div>
            </div>
          </ng-template>
        </e-pane>

        <!-- Right: Properties/Inspector (250px) -->
        <e-pane size='250px' min='150px' max='350px'>
          <ng-template #content>
            <div class='inspector'>
              <h3>Properties</h3>
              <div class='property-group'>
                <label>Title:</label>
                <input type='text' value='My App' />
              </div>
              <div class='property-group'>
                <label>Version:</label>
                <input type='text' value='1.0.0' />
              </div>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .explorer, .editor, .inspector {
      height: 100%;
      overflow: auto;
      border-right: 1px solid #ddd;
    }

    .explorer {
      background-color: #f5f5f5;
      padding: 15px;
    }

    .file-tree {
      list-style: none;
      padding: 0;
      font-family: monospace;
    }

    .file-tree li {
      padding: 5px 0;
    }

    .editor-tabs {
      display: flex;
      border-bottom: 1px solid #ddd;
      padding: 10px;
    }

    .tab {
      padding: 8px 15px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }

    .tab.active {
      border-bottom-color: #007bff;
      color: #007bff;
    }

    .editor-content {
      padding: 20px;
      font-family: 'Courier New', monospace;
      background-color: #f8f8f8;
    }

    .inspector {
      background-color: #fafafa;
      padding: 15px;
    }

    .property-group {
      margin-bottom: 15px;
    }

    .property-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .property-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class EditorLayoutComponent {}
```

---

## Nested Complex Layouts

### IDE with Nested Vertical Split

Bottom panel contains logs and debug info:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-nested-ide',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <!-- Main horizontal split: sidebar | editor area -->
    <ejs-splitter height='100vh' width='100%'>
      <e-panes>
        <!-- Left: Sidebar -->
        <e-pane size='200px'>
          <ng-template #content>
            <div class='sidebar'>
              <h3>Project</h3>
              <p>File tree here</p>
            </div>
          </ng-template>
        </e-pane>

        <!-- Right: Editor area with nested vertical split -->
        <e-pane>
          <ng-template #content>
            <!-- Nested vertical split: editor | output -->
            <ejs-splitter orientation='Vertical' height='100%'>
              <e-panes>
                <!-- Top: Code editor -->
                <e-pane size='70%'>
                  <ng-template #content>
                    <div class='editor'>
                      <h3>Editor</h3>
                      <pre><code>// Code here</code></pre>
                    </div>
                  </ng-template>
                </e-pane>

                <!-- Bottom: Output/Logs (resizable) -->
                <e-pane size='30%' min='100px'>
                  <ng-template #content>
                    <div class='output'>
                      <h3>Output</h3>
                      <p>Build logs and output...</p>
                    </div>
                  </ng-template>
                </e-pane>
              </e-panes>
            </ejs-splitter>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .sidebar, .editor, .output {
      padding: 15px;
      height: 100%;
      overflow: auto;
    }

    .sidebar {
      background-color: #f5f5f5;
      border-right: 1px solid #ddd;
    }

    .editor {
      background-color: #fafafa;
      border-bottom: 1px solid #ddd;
    }

    .output {
      background-color: #1e1e1e;
      color: #d4d4d4;
      font-family: monospace;
    }
  `]
})
export class NestedIDEComponent {}
```

---

## Responsive Dashboard

### Dashboard with Collapsible Panels

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SplitterModule, CommonModule],
  template: `
    <div class='toolbar'>
      <h1>Analytics Dashboard</h1>
      <div class='actions'>
        <button class='e-btn' (click)='toggleFilters()'>
          {{ showFilters ? 'Hide' : 'Show' }} Filters
        </button>
        <button class='e-btn' (click)='toggleDetails()'>
          {{ showDetails ? 'Hide' : 'Show' }} Details
        </button>
      </div>
    </div>

    <ejs-splitter #dashboard height='calc(100vh - 80px)' width='100%'>
      <e-panes>
        <!-- Left: Filters Panel (collapsible) -->
        <e-pane 
          size='250px' 
          [collapsible]='true' 
          [collapsed]='!showFilters'>
          <ng-template #content>
            <div class='filters-panel'>
              <h3>Filters</h3>
              <div class='filter-item'>
                <label>Date Range:</label>
                <input type='date' />
              </div>
              <div class='filter-item'>
                <label>Category:</label>
                <select>
                  <option>All</option>
                  <option>Category A</option>
                  <option>Category B</option>
                </select>
              </div>
              <button class='e-btn'>Apply</button>
            </div>
          </ng-template>
        </e-pane>

        <!-- Center: Dashboard Content (flexible) -->
        <e-pane>
          <ng-template #content>
            <div class='dashboard-content'>
              <div class='metric-card'>
                <h4>Total Revenue</h4>
                <p class='metric-value'>$125,430</p>
              </div>
              <div class='metric-card'>
                <h4>Users</h4>
                <p class='metric-value'>12,547</p>
              </div>
              <div class='metric-card'>
                <h4>Conversion</h4>
                <p class='metric-value'>3.42%</p>
              </div>
            </div>
          </ng-template>
        </e-pane>

        <!-- Right: Details Panel (collapsible) -->
        <e-pane 
          size='300px' 
          [collapsible]='true' 
          [collapsed]='!showDetails'>
          <ng-template #content>
            <div class='details-panel'>
              <h3>Recent Activity</h3>
              <ul class='activity-list'>
                <li>Order #1234 - Completed</li>
                <li>User registration - 23 new users</li>
                <li>System update - 2.1 deployed</li>
              </ul>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }

    .actions {
      display: flex;
      gap: 10px;
    }

    .filters-panel, .details-panel {
      padding: 20px;
      height: 100%;
      overflow: auto;
    }

    .filters-panel {
      background-color: #fafafa;
      border-right: 1px solid #ddd;
    }

    .filter-item {
      margin-bottom: 15px;
    }

    .filter-item label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .filter-item input,
    .filter-item select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .metric-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }

    .metric-value {
      font-size: 28px;
      font-weight: bold;
      color: #007bff;
      margin: 10px 0 0 0;
    }

    .details-panel {
      background-color: #fafafa;
      border-left: 1px solid #ddd;
    }

    .activity-list {
      list-style: none;
      padding: 0;
    }

    .activity-list li {
      padding: 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
    }
  `]
})
export class ResponsiveDashboardComponent implements OnInit {
  @ViewChild('dashboard') splitterObj?: SplitterComponent;
  showFilters = true;
  showDetails = true;

  ngOnInit(): void {
    // Collapse panels on mobile
    if (window.innerWidth < 1200) {
      this.showFilters = false;
      this.showDetails = false;
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    if (this.showFilters) {
      this.splitterObj!.expand(0);
    } else {
      this.splitterObj!.collapse(0);
    }
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
    if (this.showDetails) {
      this.splitterObj!.expand(2);
    } else {
      this.splitterObj!.collapse(2);
    }
  }
}
```

---

## Pattern Selection Guide

| Pattern | Use Case | Complexity |
|---------|----------|-----------|
| **Two-Pane Sidebar** | Navigation + content | Simple |
| **Three-Pane Editor** | IDE-like interfaces | Medium |
| **Nested Complex** | Advanced dashboards | Advanced |
| **Responsive Dashboard** | Mobile-friendly UI | Medium |

Choose based on your application needs and user interaction requirements.

