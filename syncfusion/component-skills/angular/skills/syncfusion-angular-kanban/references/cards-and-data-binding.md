# Cards and Data Binding in Angular Kanban

## Table of Contents
- [Card Structure](#card-structure)
- [Card Fields Configuration](#card-fields-configuration)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [DataManager Integration](#datamanager-integration)
- [Card Templates](#card-templates)
- [Card Selection](#card-selection)
- [OData Support](#odata-support)

## Card Structure

Each Kanban card displays task information with:
- **Header** - Usually the task ID
- **Content** - Task description/summary
- **Grabber** - Colored indicator on left
- **Custom fields** - Tags, priority, assignee, etc.

```
┌──────────────────────────┐
│ [Purple▌] ID-123         │ ← Grabber + Header
├──────────────────────────┤
│ Implement authentication │ ← Content
│                          │
│ Tags: Auth, Security     │ ← Custom fields
└──────────────────────────┘
```

## Card Fields Configuration

Define which data fields appear in cards using `cardSettings`:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="data"
      [cardSettings]="cardSettings">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  cardSettings: CardSettingsModel = {
    headerField: 'Id',              // Card header
    contentField: 'Summary',         // Card content
    grabberField: 'Priority',        // Color indicator
    tagsField: 'Tags',               // Tags display
    footerCssField: 'StatusIcon',    // Footer styling
    selectionType: 'Single',         // Single or Multiple
    showHeader: true                 // Show/hide header
  };

  data = [
    {
      Id: 'TASK-1',
      Status: 'Open',
      Summary: 'Design homepage mockup',
      Priority: 'High',
      Tags: 'Design,UI',
      StatusIcon: 'e-card-critical'
    }
  ];
}
```

### CardSettingsModel Properties

| Property | Type | Purpose |
|----------|------|---------|
| `headerField` | string | Data field for card header (usually ID) |
| `contentField` | string | Data field for card content (usually Summary) |
| `tagsField` | string | Data field for tags display |
| `grabberField` | string | Data field for color indicator |
| `footerCssField` | string | CSS class for card footer |
| `template` | string \| Function | Custom card template |
| `selectionType` | 'Single' \| 'Multiple' | Card selection mode |
| `showHeader` | boolean | Show/hide card header |

## Local Data Binding

Bind an array of objects directly to the Kanban:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="tasks"
      [cardSettings]="{headerField: 'Id', contentField: 'Summary'}">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  tasks = [
    { Id: 1, Status: 'Open', Summary: 'Design UI mockup' },
    { Id: 2, Status: 'Open', Summary: 'Setup database' },
    { Id: 3, Status: 'InProgress', Summary: 'API development' },
    { Id: 4, Status: 'InProgress', Summary: 'Frontend components' },
    { Id: 5, Status: 'Close', Summary: 'Testing complete' },
    { Id: 6, Status: 'Close', Summary: 'Deployment done' }
  ];
}
```

**When to use:**
- Small datasets (<100 items)
- In-memory data or local cache
- Quick prototyping

## Remote Data Binding

Fetch data from a server and update Kanban dynamically:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule, HttpClientModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="remoteData"
      [cardSettings]="{headerField: 'Id', contentField: 'Summary'}">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent implements OnInit {
  remoteData: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadKanbanData();
  }

  loadKanbanData(): void {
    this.http.get('/api/tasks').subscribe((data: any) => {
      this.remoteData = data;
    });
  }
}
```

**API endpoint response format:**
```json
[
  { "Id": 1, "Status": "Open", "Summary": "Task 1" },
  { "Id": 2, "Status": "InProgress", "Summary": "Task 2" }
]
```

## DataManager Integration

Use DataManager for advanced data operations (filtering, sorting, paging):

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="dataManager"
      [cardSettings]="{headerField: 'Id', contentField: 'Summary'}">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  dataManager: DataManager = new DataManager({
    url: 'https://api.example.com/tasks',
    adaptor: new UrlAdaptor()
  });
}
```

### DataManager with Local Data

```typescript
import { DataManager } from '@syncfusion/ej2-data';

dataManager: DataManager = new DataManager({
  json: [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ]
});
```

## Card Templates

Create custom card layouts:

### Basic Template with ng-template (RECOMMENDED)

**This is the correct and recommended approach for Angular Kanban card templates.**

```typescript
import { Component } from '@angular/core';
import { KanbanModule, CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status" 
      [dataSource]="data"
      [cardSettings]="cardSettings">
      
      <ng-template #cardSettingsTemplate let-data>
        <div class="e-card-content">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <strong>{{ data.Id }}</strong>
            <span [style.backgroundColor]="getPriorityColor(data.Priority)" 
                  style="padding: 2px 8px; color: white; border-radius: 4px; font-size: 12px;">
              {{ data.Priority }}
            </span>
          </div>
          <p>{{ data.Summary }}</p>
          <div style="margin-top: 8px; font-size: 12px; color: #666;">
            <strong>Assignee:</strong> {{ data.Assignee }}
          </div>
        </div>
      </ng-template>

      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Priority: 'High', Assignee: 'Nancy' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2', Priority: 'Low', Assignee: 'Janet' }
  ];

  // IMPORTANT: Reference the ng-template in cardSettings
  cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary',
    template: '#cardSettingsTemplate'  // Must reference the ng-template
  };

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'High': '#d32f2f',
      'Medium': '#f57c00',
      'Low': '#388e3c'
    };
    return colors[priority] || '#333';
  }
}
```

**Key Points:**
1. Use `<ng-template #cardSettingsTemplate let-data>` inside `<ejs-kanban>`
2. Reference it in cardSettings: `template: '#cardSettingsTemplate'`
3. Use Angular interpolation: `{{ data.Field }}`
4. Component methods are accessible: `getPriorityColor(data.Priority)`
5. Use `let-data` (NOT `let-data="data"`) to bind the card data context

### Template with String Literal (ALTERNATIVE - Less Recommended)

**Use this approach only when ng-template is not suitable. String templates are harder to maintain.**

```typescript
cardSettings: CardSettingsModel = {
  headerField: 'Id',
  contentField: 'Summary',
  template: `
    <div class="e-card-custom">
      <div class="e-card-header">
        <span class="e-card-header-title" style="font-weight: bold;">${ data.Id }</span>
        <span class="e-card-header-icon">🏷️</span>
      </div>
      <div class="e-card-content">
        <p>${ data.Summary }</p>
        <div class="e-card-footer">
          <span>${ data.Tags }</span>
        </div>
      </div>
    </div>
  `
};
```

## Card Selection

Configure how users select cards:

```typescript
cardSettings: CardSettingsModel = {
  headerField: 'Id',
  contentField: 'Summary',
  selectionType: 'Multiple'  // Allow selecting multiple cards
};
```

### Get Selected Cards

```typescript
import { Component, ViewChild } from '@angular/core';
import { KanbanComponent } from '@syncfusion/ej2-angular-kanban';

export class MyKanbanComponent {
  @ViewChild('kanban') kanban: KanbanComponent;

  getSelectedCards(): void {
    const selectedCards = this.kanban.getSelectedCards();
    console.log('Selected:', selectedCards);
  }
}
```

## OData Support

Bind Kanban to OData v4 services:

```typescript
import { Component } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `<ejs-kanban [dataSource]="dataManager" keyField="Status"></ejs-kanban>`
})
export class KanbanComponent {
  dataManager: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders',
    adaptor: new ODataV4Adaptor(),
    pageSettings: { pageSize: 50 }
  });
}
```

**OData URL format:**
```
https://odata-service/api/tasks?$select=Id,Status,Summary&$filter=Status eq 'Open'
```

## Data Updates

### Adding Cards
```typescript
@ViewChild('kanban') kanban: KanbanComponent;

addCard(): void {
  this.kanban.addCard({
    Id: 7,
    Status: 'Open',
    Summary: 'New task'
  });
}
```

### Updating Cards
```typescript
updateCard(): void {
  this.kanban.updateCard({
    Id: 1,
    Status: 'InProgress',
    Summary: 'Updated task'
  });
}
```

### Deleting Cards
```typescript
deleteCard(): void {
  this.kanban.deleteCard(1);  // Delete by ID
}
```
