# Grouping and Nested Lists in Syncfusion Angular ListView

## Table of Contents
- [Grouping Basics](#grouping-basics)
- [Customizing Group Headers](#customizing-group-headers)
- [Nested Lists](#nested-lists)
- [Multi-Level Hierarchies](#multi-level-hierarchies)
- [Group Operations](#group-operations)

---

## Grouping Basics

Group items by a category field to organize related data.

### Basic Grouping

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='cars-list' 
      [dataSource]='carsData' 
      [fields]='fields'>
    </ejs-listview>
  `
})
export class AppComponent {
  public carsData = [
    { text: 'Audi A4', category: 'Audi', id: '1' },
    { text: 'Audi A5', category: 'Audi', id: '2' },
    { text: 'Audi A6', category: 'Audi', id: '3' },
    { text: 'BMW 501', category: 'BMW', id: '4' },
    { text: 'BMW 502', category: 'BMW', id: '5' },
    { text: 'BMW 503', category: 'BMW', id: '6' }
  ];

  public fields = {
    text: 'text',
    id: 'id',
    groupBy: 'category'  // Group by category field
  };
}
```

**Output:**
```
Audi
├── Audi A4
├── Audi A5
└── Audi A6

BMW
├── BMW 501
├── BMW 502
└── BMW 503
```

### With Header and Sorting

```typescript
<ejs-listview 
  [dataSource]='data' 
  [fields]='fields'
  [showHeader]='true'
  [headerTitle]='headerTitle'
  sortOrder='Ascending'>
</ejs-listview>
```

---

## Customizing Group Headers

### Group Template with Item Count

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='employeeData' 
      [fields]='fields'
      cssClass='e-list-template'>
      
      <!-- Item template -->
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-multi-line">
          <span class="e-list-item-header">{{data.name}}</span>
          <span class="e-list-content">{{data.email}}</span>
        </div>
      </ng-template>
      
      <!-- Group template with count -->
      <ng-template #groupTemplate let-data="">
        <div class="group-header">
          <span class="department">{{data.items[0].department}}</span>
          <span class="count">{{data.items.length}} employee(s)</span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .group-header {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      background: #f5f5f5;
      border-left: 4px solid #007bff;
      font-weight: 600;
    }
    .department {
      color: #333;
    }
    .count {
      color: #999;
      font-size: 12px;
      font-weight: normal;
    }
  `]
})
export class AppComponent {
  public employeeData = [
    { name: 'Nancy', email: 'nancy@example.com', department: 'Sales', id: '1' },
    { name: 'Andrew', email: 'andrew@example.com', department: 'Sales', id: '2' },
    { name: 'Janet', email: 'janet@example.com', department: 'IT', id: '3' },
    { name: 'Steven', email: 'steven@example.com', department: 'IT', id: '4' },
    { name: 'Robert', email: 'robert@example.com', department: 'HR', id: '5' }
  ];

  public fields = {
    text: 'name',
    id: 'id',
    groupBy: 'department'
  };
}
```

### Advanced Group Template with Icons

```typescript
<ng-template #groupTemplate let-data="">
  <div class="advanced-group">
    <span class="group-icon" [ngClass]="getDeptIcon(data.items[0].department)"></span>
    <div class="group-info">
      <span class="group-name">{{data.items[0].department}}</span>
      <span class="group-stats">{{data.items.length}} members</span>
    </div>
  </div>
</ng-template>
```

```typescript
getDeptIcon(dept: string): string {
  const icons: { [key: string]: string } = {
    'Sales': 'icon-sales',
    'IT': 'icon-it',
    'HR': 'icon-hr'
  };
  return icons[dept] || 'icon-default';
}
```

---

## Nested Lists

### Basic Nested List Structure

Create hierarchical data with child items:

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='nested-list' 
      [dataSource]='nestedData' 
      [fields]='fields'>
    </ejs-listview>
  `
})
export class AppComponent {
  public nestedData = [
    {
      text: 'Electronics',
      id: '1',
      children: [
        { text: 'Mobile Phones', id: '1-1' },
        { text: 'Laptops', id: '1-2' },
        { text: 'Tablets', id: '1-3' }
      ]
    },
    {
      text: 'Furniture',
      id: '2',
      children: [
        { text: 'Chairs', id: '2-1' },
        { text: 'Tables', id: '2-2' },
        { text: 'Cabinets', id: '2-3' }
      ]
    }
  ];

  public fields = {
    dataSource: 'children',  // Field containing child data
    text: 'text',
    id: 'id'
  };
}
```

**Output:**
```
Electronics
├── Mobile Phones
├── Laptops
└── Tablets

Furniture
├── Chairs
├── Tables
└── Cabinets
```

### Nested List with Custom Template

```typescript
<ejs-listview 
  [dataSource]='nestedData' 
  [fields]='fields'
  cssClass='e-list-template'>
  
  <ng-template #template let-data="">
    <div class="e-list-wrapper">
      <span class="item-icon" [ngClass]="getIcon(data)"></span>
      <span class="item-text">{{data.text}}</span>
      <span class="item-badge" *ngIf="data.badge">{{data.badge}}</span>
    </div>
  </ng-template>
</ejs-listview>
```

---

## Multi-Level Hierarchies

### Three-Level Nested Structure

```typescript
public hierarchicalData = [
  {
    text: 'Groceries',
    id: '1',
    children: [
      {
        text: 'Fruits',
        id: '1-1',
        children: [
          { text: 'Apples', id: '1-1-1' },
          { text: 'Oranges', id: '1-1-2' },
          { text: 'Bananas', id: '1-1-3' }
        ]
      },
      {
        text: 'Vegetables',
        id: '1-2',
        children: [
          { text: 'Carrots', id: '1-2-1' },
          { text: 'Tomatoes', id: '1-2-2' },
          { text: 'Lettuce', id: '1-2-3' }
        ]
      }
    ]
  }
];

public fields = {
  dataSource: 'children',
  text: 'text',
  id: 'id'
};
```

### Dynamic Nested List Expansion

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="expandAll()">Expand All</button>
    <button (click)="collapseAll()">Collapse All</button>
    
    <ejs-listview 
      #listview
      [dataSource]='nestedData' 
      [fields]='fields'>
    </ejs-listview>
  `
})
export class AppComponent {
  @ViewChild('listview') 
  listViewInstance!: ListViewComponent;

  public nestedData = [...];
  public fields = { dataSource: 'children', text: 'text' };

  expandAll() {
    // Get all parent items and expand them
    const parentItems = document.querySelectorAll('.e-list-parent');
    parentItems.forEach((item: any) => {
      if (item.querySelector('.e-icon-expandable')) {
        item.click();
      }
    });
  }

  collapseAll() {
    const parentItems = document.querySelectorAll('.e-list-parent');
    parentItems.forEach((item: any) => {
      if (item.querySelector('.e-icon-collapsible')) {
        item.click();
      }
    });
  }
}
```

---

## Group Operations

### Get Selected Group Items

```typescript
getSelectedGroup() {
  const selected = this.listViewInstance.getSelectedItems();
  console.log('Selected items:', selected.data);
}
```

### Add Item to Specific Group

```typescript
addItemToGroup(groupName: string, newItem: any) {
  const groupData = this.employeeData.find(
    emp => emp.department === groupName
  );
  if (groupData) {
    this.employeeData.push({
      ...newItem,
      department: groupName
    });
    this.listViewInstance.refresh();
  }
}
```

### Remove Items from Group

```typescript
removeGroupItems(groupName: string) {
  this.employeeData = this.employeeData.filter(
    emp => emp.department !== groupName
  );
  this.listViewInstance.refresh();
}
```

### Reorder Items Between Groups

```typescript
moveItemToGroup(itemId: string, fromGroup: string, toGroup: string) {
  const item = this.employeeData.find(
    emp => emp.id === itemId && emp.department === fromGroup
  );
  if (item) {
    item.department = toGroup;
    this.listViewInstance.refresh();
  }
}
```

---

## Dynamically Load Child Items

### Load Children on Parent Selection

Dynamically populate child list items when a parent item is selected using the `select` event.

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { SelectEventArgs } from '@syncfusion/ej2-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-dynamic-children',
  template: `
    <ejs-listview 
      #listview
      id='file-list'
      [dataSource]='dataSource' 
      [template]='itemTemplate'
      headerTitle='Folders'
      [showHeader]='true'
      [showIcon]='true'
      [fields]='fields'
      (select)="onSelect($event)">
      
      <ng-template #itemTemplate let-data="">
        <span class="file-icon" [ngClass]="data.icon"></span>
        <span>{{data.text}}</span>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .file-icon {
      margin-right: 10px;
      font-size: 18px;
    }
  `]
})
export class DynamicChildrenComponent {
  @ViewChild('listview') listViewInstance?: ListViewComponent;

  public dataSource = [
    {
      id: '01',
      text: 'Music',
      icon: '📁',
      child: [
        { id: '01-01', text: 'Gouttes.mp3', icon: '🎵' }
      ]
    },
    {
      id: '02',
      text: 'Videos',
      icon: '📁',
      child: [
        { id: '02-01', text: 'Naturals.mp4', icon: '🎬' },
        { id: '02-02', text: 'Wild.mpeg', icon: '🎬' }
      ]
    },
    {
      id: '03',
      text: 'Documents',
      icon: '📁',
      child: [
        { id: '03-01', text: 'Environment.docx', icon: '📄' },
        { id: '03-02', text: 'Global Warming.ppt', icon: '📊' }
      ]
    }
  ];

  public fields = {
    text: 'text',
    id: 'id',
    child: 'child',
    iconCss: 'icon'
  };

  onSelect(args: SelectEventArgs) {
    // Add new item to child list when folder selected
    const selectedIndex = args.index;
    
    if (this.dataSource[selectedIndex] && 
        this.dataSource[selectedIndex]['child']) {
      
      // Dynamically push new child item
      (this.dataSource[selectedIndex]['child'] as any).push({
        id: `${selectedIndex}-new`,
        text: 'Newly Added File',
        icon: '✨'
      });
      
      // Refresh ListView to show updated children
      if (this.listViewInstance) {
        this.listViewInstance.refresh();
      }
    }
  }
}
```

### Lazy Load from Remote Source

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { SelectEventArgs } from '@syncfusion/ej2-lists';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-lazy-load-children',
  template: `
    <ejs-listview 
      #listview
      [dataSource]='dataSource' 
      [fields]='fields'
      headerTitle='Categories'
      [showHeader]='true'
      (select)="onSelect($event)">
    </ejs-listview>
  `
})
export class LazyLoadChildrenComponent {
  @ViewChild('listview') listViewInstance?: ListViewComponent;

  public dataSource: any[] = [];
  public fields = { 
    text: 'name',
    id: 'id',
    child: 'items'
  };
  
  private loadedCategories = new Set<string>();

  constructor(private http: HttpClient) {
    this.initializeCategories();
  }

  initializeCategories() {
    // Load parent categories only (no children)
    this.dataSource = [
      { id: '1', name: 'Electronics', items: [] },
      { id: '2', name: 'Clothing', items: [] },
      { id: '3', name: 'Books', items: [] }
    ];
  }

  onSelect(args: SelectEventArgs) {
    const selectedItem = this.dataSource[args.index];
    
    // Only load children if not already loaded
    if (selectedItem && !this.loadedCategories.has(selectedItem.id)) {
      this.loadChildItems(selectedItem);
    }
  }

  loadChildItems(parentItem: any) {
    // Simulate API call to fetch children
    this.http.get(`/api/category/${parentItem.id}/items`)
      .subscribe({
        next: (items: any) => {
          parentItem.items = items;
          this.loadedCategories.add(parentItem.id);
          
          // Refresh to show loaded children
          if (this.listViewInstance) {
            this.listViewInstance.refresh();
          }
        },
        error: (error) => {
          console.error('Failed to load children:', error);
          parentItem.items = [
            { id: 'error', name: 'Failed to load' }
          ];
        }
      });
  }
}
```

---

## Common Patterns

### Pattern 1: Department-based Grouping

```typescript
public fields = {
  text: 'name',
  id: 'id',
  groupBy: 'department'
};
```

### Pattern 2: Category + Subcategory

```typescript
public nestedData = [
  {
    text: 'Books',
    children: [
      { text: 'Fiction' },
      { text: 'Non-Fiction' }
    ]
  }
];

public fields = {
  dataSource: 'children',
  text: 'text'
};
```

### Pattern 3: Grouped with Count Badge

```typescript
<ng-template #groupTemplate let-data="">
  <div class="group-row">
    <span>{{data.items[0].category}}</span>
    <span class="badge">{{data.items.length}}</span>
  </div>
</ng-template>
```

---

## Best Practices

✅ Always provide unique IDs for all items  
✅ Keep group hierarchies 2-3 levels deep for usability  
✅ Use meaningful group names from domain data  
✅ Cache group calculations for performance  
✅ Test with uneven group distributions  
✅ Provide visual indicators for expandable items  
✅ Make nested navigation intuitive  
✅ Consider sorting within groups for better UX  

