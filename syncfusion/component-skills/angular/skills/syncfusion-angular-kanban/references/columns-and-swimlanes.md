# Columns and Swimlanes in Angular Kanban

## Table of Contents
- [Column Configuration](#column-configuration)
- [Single-Key Mapping](#single-key-mapping)
- [Multi-Key Mapping](#multi-key-mapping)
- [Column Headers](#column-headers)
- [Stacked Headers](#stacked-headers)
- [Swimlanes](#swimlanes)
- [Dynamic Columns](#dynamic-columns)
- [Column Templates](#column-templates)

## Column Configuration

Kanban columns represent workflow stages. Define columns using the `<e-columns>` element:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status" [dataSource]="data">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Testing" keyField="Testing"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ];
}
```

**Column properties:**
- `headerText` - Column title displayed to users
- `keyField` - Maps to data field value (must match Status values in data)
- `template` - Custom HTML template for header
- `showItemCount` - Display card count in header
- `allowToggle` - Enable column collapse/expand
- `isExpanded` - Default expanded state
- `minCount` - Minimum cards allowed (WIP limit)
- `maxCount` - Maximum cards allowed (WIP limit)

## Single-Key Mapping

Each data object has a Status field that maps to a single column:

```typescript
// Data structure
{ Id: 1, Status: 'Open', Summary: 'Design UI' }
{ Id: 2, Status: 'Open', Summary: 'Setup project' }
{ Id: 3, Status: 'InProgress', Summary: 'Implement features' }
{ Id: 4, Status: 'Close', Summary: 'Deploy app' }

// Column mapping with keyField
<ejs-kanban keyField="Status" [dataSource]="data">
  <e-columns>
    <e-column headerText="To Do" keyField="Open"></e-column>
    <e-column headerText="In Progress" keyField="InProgress"></e-column>
    <e-column headerText="Done" keyField="Close"></e-column>
  </e-columns>
</ejs-kanban>
```

**How it works:**
1. Kanban reads the `keyField="Status"` property
2. For each data item, it looks at the Status value
3. It places the item in the column with matching `keyField`
4. Example: Status='Open' → goes to column with keyField="Open"

## Multi-Key Mapping

A single column can accept multiple key values:

```typescript
// Column accepts both "Open" and "New" status values
<e-column headerText="Todo" keyField={['Open', 'New']}></e-column>

// Template syntax in Angular
<ejs-kanban keyField="Status" [dataSource]="data">
  <e-columns>
    <e-column headerText="To Do" [keyField]="['Open', 'New']"></e-column>
    <e-column headerText="In Progress" keyField="InProgress"></e-column>
    <e-column headerText="Done" keyField="Close"></e-column>
  </e-columns>
</ejs-kanban>
```

**Use cases:**
- Combine similar statuses (Open, Pending, New → "To Do")
- Group related stages (Testing, QA, Review → "Review")
- Legacy data with varied status values

## Column Headers

### Basic Header
```typescript
<e-column headerText="In Progress" keyField="InProgress"></e-column>
```

### Header with Item Count
```typescript
<e-column 
  headerText="In Progress" 
  keyField="InProgress"
  showItemCount="true">
</e-column>
```

Shows: "In Progress (3)" where 3 is the card count in that column.

### Custom Header Template

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status" [dataSource]="data">
      <e-columns>
        <e-column keyField="Open">
          <ng-template #headerTemplate>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">📋</span>
              <span>To Do</span>
            </div>
          </ng-template>
        </e-column>
        <e-column keyField="InProgress">
          <ng-template #headerTemplate>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">⚙️</span>
              <span>In Progress</span>
            </div>
          </ng-template>
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];
}
```

## Stacked Headers

Group related columns under a common parent header:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { StackedHeadersModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status" 
      [dataSource]="data"
      [stackedHeaders]="stackedHeaders">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Testing" keyField="Testing"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  stackedHeaders: StackedHeadersModel[] = [
    {
      text: 'In Development',
      keyFields: 'InProgress'  // Comma-separated string of column keyFields
    },
    {
      text: 'Verification',
      keyFields: 'Testing'
    },
    {
      text: 'Completed',
      keyFields: 'Close'
    }
  ];

  data = [{ Id: 1, Status: 'Open', Summary: 'Task 1' }];
}
```

This displays parent headers grouping related workflow stages.

## Swimlanes

Swimlanes group cards by a specific field (e.g., Assignee, Priority, Epic):

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { SwimlaneSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status" 
      [dataSource]="data"
      [swimlaneSettings]="swimlaneSettings">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  swimlaneSettings: SwimlaneSettingsModel = {
    keyField: 'Assignee'
  };

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Assignee: 'Nancy' },
    { Id: 2, Status: 'Open', Summary: 'Task 2', Assignee: 'Janet' },
    { Id: 3, Status: 'InProgress', Summary: 'Task 3', Assignee: 'Nancy' },
    { Id: 4, Status: 'Close', Summary: 'Task 4', Assignee: 'Janet' }
  ];
}
```

**Result:** Cards are grouped horizontally by Assignee:
```
Nancy  ┌─────────────────────────────────────────┐
       │ [To Do]  [In Progress]  [Done]          │
       │   Task1     Task3                        │
       └─────────────────────────────────────────┘

Janet  ┌─────────────────────────────────────────┐
       │ [To Do]  [In Progress]  [Done]          │
       │   Task2                   Task4         │
       └─────────────────────────────────────────┘
```

### Swimlane with Custom Template

```typescript
swimlaneSettings: SwimlaneSettingsModel = {
  keyField: 'Assignee',
  template: '<div style="padding: 10px; background: #f5f5f5;">{{ data.Assignee }} - Team Member</div>'
};
```

## Dynamic Columns

Add and remove columns programmatically:

```typescript
import { Component, ViewChild } from '@angular/core';
import { KanbanModule, KanbanComponent } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <button (click)="addNewColumn()">Add Column</button>
    <button (click)="removeColumn()">Remove Column</button>
    
    <ejs-kanban 
      #kanbanRef
      keyField="Status" 
      [dataSource]="data">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  @ViewChild('kanbanRef') kanban: KanbanComponent;

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ];

  addNewColumn(): void {
    this.kanban.addColumn(
      { headerText: 'Testing', keyField: 'Testing' },
      2
    );
  }

  removeColumn(): void {
    this.kanban.removeColumn(0);
  }
}
```

### Show/Hide Columns

```typescript
// Hide a column by key
hideColumn(key: string): void {
  this.kanban.hideColumn(key);
}

// Show a hidden column
showColumn(key: string): void {
  this.kanban.showColumn(key);
}
```

## Column Templates

Custom rendering for column headers and content areas:

```typescript
<ejs-kanban keyField="Status">
  <e-columns>
    <e-column keyField="Open">
      <ng-template #headerTemplate>
        <div style="color: red; font-weight: bold;">🔴 Urgent</div>
      </ng-template>
    </e-column>
  </e-columns>
</ejs-kanban>
```

**Common patterns:**
- Icons with text labels
- Status indicators with colors
- Card count badges
- Collapsible column headers
- Column action buttons
