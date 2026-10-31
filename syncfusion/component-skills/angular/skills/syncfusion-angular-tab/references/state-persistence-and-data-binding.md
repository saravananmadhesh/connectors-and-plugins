# State Persistence and Data Binding in Angular Tab Component

## Table of Contents
1. [State Persistence](#state-persistence)
2. [Enable Persistence](#enable-persistence)
3. [Persisted State Values](#persisted-state-values)
4. [DataSource Binding](#datasource-binding)
5. [Loading Tabs from Remote Data](#loading-tabs-from-remote-data)
6. [Combined: Persistence with Dynamic Binding](#combined-persistence-with-dynamic-binding)

---

## State Persistence

State persistence allows the Tab component to automatically save and restore its state across browser sessions. This is useful for maintaining user preferences like which tab was active before navigating away or refreshing the page.

**Property:** `enablePersistence`
- **Type:** boolean
- **Default:** false
- **Description:** When true, Tab component state is saved to localStorage and restored on page load

### Persisted Properties

When `enablePersistence` is enabled, the following Tab properties are saved:
- `selectedIndex` - Currently active tab index

---

## Enable Persistence

### Basic Persistence Example

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Try selecting a different tab, then refresh the page.</p>
      <p>The selected tab will be restored automatically.</p>
      <ejs-tab 
        id="element" 
        enablePersistence="true">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]">
            <ng-template #content>
              Tab 1 content - selected tab is remembered
            </ng-template>
          </e-tabitem>
          <e-tabitem [header]="headerText[1]">
            <ng-template #content>
              Tab 2 content - select this and refresh page
            </ng-template>
          </e-tabitem>
          <e-tabitem [header]="headerText[2]">
            <ng-template #content>
              Tab 3 content - refresh will restore this if selected
            </ng-template>
          </e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Twitter' },
    { text: 'Facebook' },
    { text: 'WhatsApp' }
  ];
}
```

**Behavior:**
1. User selects Tab 2
2. User refreshes page (F5)
3. Component initializes and restores Tab 2 as active
4. `selectedIndex` is set to 1 automatically

### Storage Information

**Storage Location:** Browser's localStorage
**Storage Key Format:** `element_Tab` (where 'element' is the Tab ID)
**Storage Content:** JSON with saved properties

```json
{
  "element_Tab": {
    "selectedIndex": 1
  }
}
```

### Clear Persistence Data

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="clearPersistence()">Clear Saved State</button>
      <button (click)="resetToDefault()">Reset to Tab 1</button>
      <hr />
      <ejs-tab 
        id="tabControl" 
        enablePersistence="true">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  public headerText: object[] = [
    { text: 'Settings' },
    { text: 'Profile' }
  ];

  public content0 = 'Application settings';
  public content1 = 'User profile';

  clearPersistence(): void {
    // Remove from localStorage
    localStorage.removeItem('tabControl_Tab');
    alert('Persistence data cleared. Refresh page to see default Tab 1.');
  }

  resetToDefault(): void {
    // Clear and set default
    localStorage.removeItem('tabControl_Tab');
    location.reload();
  }
}
```

---

## Persisted State Values

### Understanding What Gets Saved

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="showStoredState()">Show Stored State</button>
      <p>{{ storedStateInfo }}</p>
      <hr />
      <ejs-tab 
        #tabObj
        id="myTabs" 
        enablePersistence="true">
        <e-tabitems>
          <e-tabitem [header]="headerText[0]" [content]="content0"></e-tabitem>
          <e-tabitem [header]="headerText[1]" [content]="content1"></e-tabitem>
          <e-tabitem [header]="headerText[2]" [content]="content2"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public headerText: object[] = [
    { text: 'Home' },
    { text: 'Settings' },
    { text: 'About' }
  ];

  public content0 = 'Home';
  public content1 = 'Settings';
  public content2 = 'About';
  public storedStateInfo = '';

  showStoredState(): void {
    const storageKey = 'myTabs_Tab';
    const storedData = localStorage.getItem(storageKey);
    
    if (storedData) {
      this.storedStateInfo = `Stored State: ${storedData}`;
      console.log('Full localStorage state:', JSON.parse(storedData));
    } else {
      this.storedStateInfo = 'No state saved yet. Select a tab and check again.';
    }
  }
}
```

---

## DataSource Binding

Bind Tab items to a data source array using the `items` property. Each item must follow the `TabItemModel` structure.

**Interface:** `TabItemModel`

```typescript
interface TabItemModel {
  header?: HeaderModel | string;      // Tab header text/config
  content?: string;                   // Tab content text
  disabled?: boolean;                 // Enable/disable tab
  visible?: boolean;                  // Show/hide tab
}

interface HeaderModel {
  text?: string;                      // Header text
  iconCss?: string;                   // Icon CSS classes
  iconPosition?: string;              // Icon position
}
```

### Binding Simple Array

```typescript
import { Component, OnInit } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TabModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="element" [items]="tabItems"></ejs-tab>
  `
})
export class AppComponent implements OnInit {
  public tabItems: any[] = [];

  ngOnInit(): void {
    // Create tab items from data
    this.tabItems = [
      {
        header: { text: 'HTML' },
        content: 'HyperText Markup Language is the standard markup language...'
      },
      {
        header: { text: 'CSS' },
        content: 'Cascading Style Sheets is used for styling web pages...'
      },
      {
        header: { text: 'JavaScript' },
        content: 'JavaScript is a programming language for web browsers...'
      }
    ];
  }
}
```

### Dynamic Tab Creation from Array

```typescript
import { Component, OnInit } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

interface TabData {
  title: string;
  description: string;
}

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="element" [items]="tabItems"></ejs-tab>
  `
})
export class AppComponent implements OnInit {
  public tabItems: any[] = [];
  private data: TabData[] = [
    { title: 'Project 1', description: 'E-commerce platform' },
    { title: 'Project 2', description: 'Social media app' },
    { title: 'Project 3', description: 'Task manager' }
  ];

  ngOnInit(): void {
    this.tabItems = this.data.map(item => ({
      header: { text: item.title },
      content: item.description
    }));
  }
}
```

---

## Loading Tabs from Remote Data

Use DataManager to load tab data from a remote server or API endpoint.

### Using DataManager with OData Service

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DataManager, Query, ODataV4Adaptor, ReturnOption } from '@syncfusion/ej2-data';

const SERVICE_URI = 'https://services.odata.org/V4/Northwind/Northwind.svc/Employees';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Loading employee data from OData service...</p>
      <ejs-tab 
        #tabObj
        id="element">
      </ejs-tab>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private itemsData: any[] = [];

  ngOnInit(): void {
    // Create DataManager and fetch data
    new DataManager({
      url: SERVICE_URI,
      adaptor: new ODataV4Adaptor()
    })
      .executeQuery(new Query().range(1, 4))
      .then((e: ReturnOption) => {
        let result: any = e.result;

        // Map server data to Tab items
        this.itemsData = result.map((employee: any) => ({
          header: { text: employee.FirstName },
          content: employee.Notes || 'No notes available'
        }));

        // Bind to Tab
        if (this.tabObj) {
          this.tabObj.items = this.itemsData;
          this.tabObj.dataBind();
        }
      });
  }
}
```

### Using HttpClient with Custom API

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

interface ApiResponse {
  id: number;
  name: string;
  description: string;
}

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p *ngIf="loading">Loading tabs...</p>
      <p *ngIf="error" style="color: red;">{{ error }}</p>
      <ejs-tab 
        #tabObj
        id="element"
        [items]="tabItems">
      </ejs-tab>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public tabItems: any[] = [];
  public loading = true;
  public error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch from custom API
    this.http.get<ApiResponse[]>('/api/tabs')
      .subscribe({
        next: (data) => {
          this.tabItems = data.map(item => ({
            header: { text: item.name },
            content: item.description
          }));
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load tabs: ' + err.message;
          this.loading = false;
        }
      });
  }
}
```

### Load Tabs Through POST Request

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { Ajax } from '@syncfusion/ej2-base';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tab_html_markup>
      <e-tabitems>
        <e-tabitem [header]="headerText[0]">
          <ng-template #content>
            Static content for Tab 1
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="headerText[1]">
          <ng-template #content>
            Static content for Tab 2
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="headerText[2]">
          <ng-template #content>
            Content loaded from server via POST
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('tab_html_markup') tabObj?: TabComponent;

  public headerText: object[] = [
    { text: 'Local Content 1' },
    { text: 'Local Content 2' },
    { text: 'Remote Content' }
  ];

  ngOnInit(): void {
    this.loadRemoteContent();
  }

  private loadRemoteContent(): void {
    // Use Ajax to load content via GET (POST would be similar)
    const ajax = new Ajax('./api/content', 'GET', true);
    
    ajax.onSuccess = (data: string): void => {
      // Set content for third tab
      if (this.tabObj) {
        this.tabObj.items[2].content = data;
        this.tabObj.refresh();
      }
    };

    ajax.onFailure = (): void => {
      if (this.tabObj) {
        this.tabObj.items[2].content = 'Failed to load content';
        this.tabObj.refresh();
      }
    };

    ajax.send();
  }
}
```

---

## Combined: Persistence with Dynamic Binding

Use persistence with dynamically loaded data to maintain user state across sessions.

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="reloadData()">Reload Data</button>
      <button (click)="clearSettings()">Clear Settings</button>
      <p>Active Tab: {{ activeTabInfo }}</p>
      <hr />
      <ejs-tab 
        #tabObj
        id="userSettings"
        enablePersistence="true"
        [items]="tabItems"
        (selected)="onTabSelected($event)">
      </ejs-tab>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public tabItems: any[] = [];
  public activeTabInfo = 'None';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTabsFromServer();
  }

  private loadTabsFromServer(): void {
    // Simulate API call
    const mockData = [
      { name: 'Profile', description: 'User profile settings' },
      { name: 'Privacy', description: 'Privacy and security settings' },
      { name: 'Notifications', description: 'Notification preferences' },
      { name: 'Appearance', description: 'Theme and UI settings' }
    ];

    this.tabItems = mockData.map(item => ({
      header: { text: item.name },
      content: item.description
    }));

    // Persistence will restore the previously selected tab
    setTimeout(() => {
      if (this.tabObj && this.tabObj.selectedIndex !== undefined) {
        this.activeTabInfo = `Tab ${this.tabObj.selectedIndex} (persisted from previous session)`;
      }
    }, 100);
  }

  reloadData(): void {
    this.loadTabsFromServer();
  }

  clearSettings(): void {
    localStorage.removeItem('userSettings_Tab');
    alert('Settings cleared. Refresh page to reset to first tab.');
  }

  onTabSelected(event: any): void {
    this.activeTabInfo = `Tab ${event.selectedIndex} selected`;
  }
}
```

---

## Best Practices

✅ **Do:**
- Use `enablePersistence` for settings/preferences pages
- Map backend data to `TabItemModel` structure correctly
- Handle errors when loading remote data
- Combine persistence with dynamic binding for better UX
- Use DataManager for complex queries

❌ **Don't:**
- Trust localStorage persistence for critical state (no server backup)
- Load large datasets without pagination
- Store sensitive data in localStorage (use only for non-sensitive state)
- Forget to check for null/undefined when accessing remote data
- Mix multiple data binding approaches in same Tab

---

## Related Properties

| Property | Type | Purpose |
|----------|------|---------|
| `enablePersistence` | boolean | Save/restore state |
| `items` | TabItemModel[] | Tab collection |
| `selectedIndex` | number | Active tab index |

## Related Methods

| Method | Purpose |
|--------|---------|
| `.dataBind()` | Refresh data binding |
| `.refresh()` | Refresh Tab layout |

## Storage Information

**Property Saved:** `selectedIndex`
**Storage Type:** Browser localStorage
**Key Format:** `{tabId}_Tab`
**Expiration:** Never (persists until manually cleared)
