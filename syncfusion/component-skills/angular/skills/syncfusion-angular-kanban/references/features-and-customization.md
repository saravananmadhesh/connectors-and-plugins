# Features and Customization in Angular Kanban

## Table of Contents
- [Sorting](#sorting)
- [Filtering](#filtering)
- [Search](#search)
- [Validation and WIP](#validation-and-wip)
- [Dialog Customization](#dialog-customization)
- [Tooltip Customization](#tooltip-customization)
- [Responsive Design](#responsive-design)
- [Color and Status Indicators](#color-and-status-indicators)

## Sorting

Sort cards within columns by field or custom function:

```typescript
import { Component, ViewChild } from '@angular/core';
import { KanbanComponent, KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <button (click)="sortByPriority()">Sort by Priority</button>
    <button (click)="sortByAssignee()">Sort by Assignee</button>
    <ejs-kanban #kanban keyField="Status" [dataSource]="data"></ejs-kanban>
  `
})
export class KanbanComponent {
  @ViewChild('kanban') kanban: KanbanComponent;

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Priority: 'High' },
    { Id: 2, Status: 'Open', Summary: 'Task 2', Priority: 'Low' }
  ];

  sortByPriority(): void {
    this.kanban.sort('Priority', 'Descending');
  }

  sortByAssignee(): void {
    this.kanban.sort('Assignee', 'Ascending');
  }

  // Custom sort function
  sortByEstimate(): void {
    this.kanban.sort((a, b) => {
      return b.Estimate - a.Estimate;  // Highest estimate first
    });
  }
}
```

## Filtering

Filter cards to show only specific items:

```typescript
filterByStatus(): void {
  // Show only high priority items
  this.kanban.filter('Priority', 'High');
}

filterByAssignee(): void {
  // Show only Nancy's tasks
  this.kanban.filter('Assignee', 'Nancy');
}

// Advanced filtering with predicate
filterCustom(): void {
  this.kanban.filter((card) => {
    return card.Priority === 'High' && card.Assignee === 'Nancy';
  });
}

// Clear filter
clearFilter(): void {
  this.kanban.filter('', '');
}
```

## Search

Find cards containing specific text:

```typescript
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule, FormsModule],
  template: `
    <input 
      [(ngModel)]="searchText" 
      placeholder="Search cards..."
      (keyup)="performSearch()">
    <ejs-kanban #kanban keyField="Status" [dataSource]="data"></ejs-kanban>
  `
})
export class KanbanComponent {
  @ViewChild('kanban') kanban: KanbanComponent;
  searchText: string = '';

  data = [
    { Id: 1, Status: 'Open', Summary: 'Design authentication module' },
    { Id: 2, Status: 'Open', Summary: 'Setup database schema' }
  ];

  performSearch(): void {
    if (this.searchText) {
      this.kanban.search(this.searchText);
    } else {
      this.kanban.search('');  // Clear search
    }
  }
}
```

**Search behavior:**
- Searches all searchable fields (Summary, Tags, etc.)
- Case-insensitive
- Real-time filtering as user types
- Clears with empty string

## Validation and WIP

### Card Validation Dialog

Validate card data before saving:

```typescript
import { Component } from '@angular/core';
import { DialogEventArgs } from '@syncfusion/ej2-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <ejs-kanban
      (dialogOpen)="onDialogOpen($event)"
      (actionBegin)="onActionBegin($event)">
    </ejs-kanban>
  `
})
export class KanbanComponent {
  onDialogOpen(args: DialogEventArgs): void {
    // Validate required fields
    if (!args.data.Summary || args.data.Summary.trim() === '') {
      console.warn('Summary is required');
    }
  }

  onActionBegin(args: any): void {
    // Validate before save
    if (args.requestType === 'Save') {
      if (!this.isValidCard(args.data)) {
        args.cancel = true;
        alert('Please fill all required fields');
      }
    }
  }

  isValidCard(card: any): boolean {
    return card.Summary && 
           card.Status && 
           card.Priority;
  }
}
```

### WIP Limits (Work In Progress)

Restrict maximum cards per column:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban keyField="Status">
      <e-columns>
        <e-column 
          headerText="To Do" 
          keyField="Open"
          minCount="1"
          maxCount="5">
        </e-column>
        <e-column 
          headerText="In Progress" 
          keyField="InProgress"
          minCount="0"
          maxCount="3">
        </e-column>
        <e-column 
          headerText="Done" 
          keyField="Close"
          maxCount="10">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {}
```

**WIP Violation Handling:**
- User cannot drop card if max reached
- Warning indicator if min not met
- `actionFailure` event fires on violation

## Dialog Customization

### Custom Dialog Template

```typescript
import { Component } from '@angular/core';
import { DialogSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <ejs-kanban
      keyField="Status"
      [dialogSettings]="dialogSettings">
    </ejs-kanban>
  `
})
export class KanbanComponent {
  dialogSettings: DialogSettingsModel = {
    template: `
      <div style="padding: 15px;">
        <div>
          <label>Task ID</label>
          <input id="Id" value="\${data.Id}" />
        </div>
        <div style="margin-top: 10px;">
          <label>Summary</label>
          <textarea id="Summary">\${data.Summary}</textarea>
        </div>
        <div style="margin-top: 10px;">
          <label>Priority</label>
          <select id="Priority">
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
    `
  };
}
```

### Custom Dialog Fields

```typescript
dialogSettings: DialogSettingsModel = {
  fields: [
    { text: 'ID', key: 'Id', type: 'TextBox' },
    { text: 'Summary', key: 'Summary', type: 'TextArea' },
    { text: 'Status', key: 'Status', type: 'Dropdown', dataSource: ['Open', 'InProgress', 'Close'] },
    { text: 'Priority', key: 'Priority', type: 'Dropdown', dataSource: ['High', 'Medium', 'Low'] },
    { text: 'Assignee', key: 'Assignee', type: 'TextBox' }
  ]
};
```

## Tooltip Customization

### Tooltip Template

```typescript
import { Component } from '@angular/core';
import { TooltipSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <ejs-kanban
      [tooltipSettings]="tooltipSettings">
    </ejs-kanban>
  `
})
export class KanbanComponent {
  tooltipSettings: TooltipSettingsModel = {
    template: `
      <div style="padding: 10px; background: white; border-radius: 4px;">
        <h4>\${data.Id}</h4>
        <p><strong>Summary:</strong> \${data.Summary}</p>
        <p><strong>Assignee:</strong> \${data.Assignee}</p>
        <p><strong>Priority:</strong> \${data.Priority}</p>
        <p><strong>Tags:</strong> \${data.Tags}</p>
      </div>
    `
  };
}
```

### HTML Tooltip

```typescript
tooltipSettings: TooltipSettingsModel = {
  template: `
    <div class="e-tooltip-content">
      <div class="e-card-header" style="font-weight: bold; margin-bottom: 8px;">
        \${data.Id} - \${data.Summary}
      </div>
      <div style="display: grid; gap: 6px; font-size: 12px;">
        <div><strong>Assigned to:</strong> \${data.Assignee}</div>
        <div><strong>Priority:</strong> <span style="color: \${getPriorityColor(data.Priority)};">\${data.Priority}</span></div>
        <div><strong>Estimate:</strong> \${data.Estimate} hrs</div>
      </div>
    </div>
  `
};
```

## Responsive Design

### Mobile-Optimized Kanban

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
      [dataSource]="data"
      height="100%"
      width="100%"
      [allowKeyboard]="true">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
    }
  `]
})
export class KanbanComponent {
  data = [];
}
```

### Responsive Breakpoints

```typescript
@HostListener('window:resize', ['$event'])
onResize(): void {
  const width = window.innerWidth;
  
  if (width < 768) {
    // Mobile: Show fewer columns or scroll
    this.kanbanHeight = window.innerHeight;
    this.cardHeight = '80px';
  } else if (width < 1024) {
    // Tablet: Normal layout
    this.kanbanHeight = window.innerHeight - 60;
    this.cardHeight = '100px';
  } else {
    // Desktop: Full layout
    this.kanbanHeight = window.innerHeight - 60;
    this.cardHeight = '120px';
  }
}
```

## Color and Status Indicators

### Priority Color Grabber

```typescript
import { Component } from '@angular/core';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <ejs-kanban
      keyField="Status"
      [cardSettings]="cardSettings"
      [dataSource]="data">
    </ejs-kanban>
  `,
  styles: [`
    ::ng-deep .e-card.e-high-priority {
      border-left: 4px solid #d32f2f;
    }
    ::ng-deep .e-card.e-medium-priority {
      border-left: 4px solid #f57c00;
    }
    ::ng-deep .e-card.e-low-priority {
      border-left: 4px solid #388e3c;
    }
  `]
})
export class KanbanComponent {
  cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary',
    grabberField: 'Priority'
  };

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Priority: 'High' },
    { Id: 2, Status: 'Open', Summary: 'Task 2', Priority: 'Low' }
  ];
}
```

### Custom Status Badge

```typescript
cardSettings: CardSettingsModel = {
  template: `
    <div style="padding: 10px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <strong>\${data.Id}</strong>
        <span style="
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          background: \${getStatusColor(data.Priority)};
          color: white;">
          \${data.Priority}
        </span>
      </div>
      <p style="margin: 0; font-size: 14px;">\${data.Summary}</p>
    </div>
  `
};

getStatusColor(priority: string): string {
  const colors: { [key: string]: string } = {
    'High': '#d32f2f',
    'Medium': '#f57c00',
    'Low': '#388e3c',
    'Critical': '#6a1b9a'
  };
  return colors[priority] || '#333';
}
```

## Advanced Features

### Multi-Level Filtering

```typescript
advancedFilter(): void {
  this.kanban.filter((card) => {
    return (
      card.Priority === 'High' &&
      card.Status === 'Open' &&
      card.Assignee === this.currentUser &&
      card.Tags?.includes('urgent')
    );
  });
}
```

### Bulk Operations

```typescript
bulkUpdatePriority(): void {
  const selectedCards = this.kanban.getSelectedCards();
  selectedCards.forEach(cardElement => {
    const cardId = cardElement.id;
    this.kanban.updateCard({
      Id: cardId,
      Priority: 'High'
    });
  });
}
```

### Export Functionality

```typescript
exportToCSV(): void {
  // Get all data
  const data = this.kanban.getCardCount() > 0 
    ? this.kanban.getDataManager().dataSource.json
    : [];
  
  // Convert to CSV
  const csv = this.convertToCSV(data);
  this.downloadCSV(csv);
}

private convertToCSV(data: any[]): string {
  const headers = ['ID', 'Summary', 'Status', 'Priority'];
  const rows = data.map(item => [item.Id, item.Summary, item.Status, item.Priority]);
  
  return [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');
}

private downloadCSV(csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanban-export.csv';
  a.click();
}
```
