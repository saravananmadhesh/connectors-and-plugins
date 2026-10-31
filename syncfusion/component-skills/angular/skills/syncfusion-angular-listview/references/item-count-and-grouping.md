# Item Count and Grouping Headers in Syncfusion Angular ListView

## Table of Contents
- [Displaying Item Count](#displaying-item-count)
- [Dynamic Count Updates](#dynamic-count-updates)
- [Group Statistics](#group-statistics)
- [Conditional Count Display](#conditional-count-display)
- [Advanced Templates](#advanced-templates)

---

## Displaying Item Count

### Basic Item Count in Group Header

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-item-count',
  template: `
    <ejs-listview 
      id='grouped-list'
      [dataSource]='employees' 
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
          <span class="group-title">{{data.items[0].department}}</span>
          <span class="item-count">({{data.items.length}})</span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .group-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: #f5f5f5;
      font-weight: 600;
    }
    .group-title {
      flex: 1;
      color: #333;
    }
    .item-count {
      color: #999;
      font-size: 12px;
      font-weight: normal;
    }
  `]
})
export class ItemCountComponent {
  public employees = [
    { name: 'Nancy', email: 'nancy@example.com', department: 'Sales', id: '1' },
    { name: 'Andrew', email: 'andrew@example.com', department: 'Sales', id: '2' },
    { name: 'Janet', email: 'janet@example.com', department: 'IT', id: '3' },
    { name: 'Steven', email: 'steven@example.com', department: 'IT', id: '4' },
    { name: 'Robert', email: 'robert@example.com', department: 'IT', id: '5' }
  ];

  public fields = {
    text: 'name',
    id: 'id',
    groupBy: 'department'
  };
}
```

### Item Count with Badge

```typescript
<ng-template #groupTemplate let-data="">
  <div class="group-header-badge">
    <span class="group-name">{{data.items[0].category}}</span>
    <span class="badge">{{data.items.length}}</span>
  </div>
</ng-template>
```

```css
.group-header-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
}

.badge {
  background: #007bff;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}
```

---

## Dynamic Count Updates

### Recalculate Count on Item Add/Remove

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-dynamic-count',
  template: `
    <button (click)="addItem()">Add Item</button>
    <button (click)="removeItem()">Remove Item</button>
    
    <ejs-listview 
      #listview
      [dataSource]='items' 
      [fields]='fields'
      (actionComplete)="onActionComplete($event)">
    </ejs-listview>
  `
})
export class DynamicCountComponent {
  @ViewChild('listview') listViewInstance!: ListViewComponent;

  public items = [
    { text: 'John', department: 'Sales', id: '1' },
    { text: 'Jane', department: 'Sales', id: '2' },
    { text: 'Bob', department: 'IT', id: '3' }
  ];

  public fields = {
    text: 'text',
    id: 'id',
    groupBy: 'department'
  };

  addItem() {
    const newItem = {
      text: `User ${Date.now()}`,
      department: 'Sales',
      id: Date.now().toString()
    };
    this.listViewInstance.addItem([newItem]);
  }

  removeItem() {
    const selected = this.listViewInstance.getSelectedItems();
    if (selected.item && selected.item.length > 0) {
      this.listViewInstance.removeItem(selected.item[0]);
    }
  }

  onActionComplete(event: any) {
    // Re-render will automatically update group counts
    console.log('Action completed, counts updated');
  }
}
```

---

## Group Statistics

### Display Multiple Statistics in Group Header

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-group-stats',
  template: `
    <ejs-listview 
      [dataSource]='salesData' 
      [fields]='fields'
      cssClass='e-list-template'>
      
      <!-- Item template -->
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-multi-line">
          <span class="e-list-item-header">{{data.productName}}</span>
          <span class="e-list-content">\${{data.price}} x {{data.quantity}}</span>
        </div>
      </ng-template>
      
      <!-- Group template with statistics -->
      <ng-template #groupTemplate let-data="">
        <div class="stats-group-header">
          <div class="group-name">{{data.items[0].category}}</div>
          <div class="group-stats">
            <span class="stat-item">
              <span class="stat-label">Items:</span>
              <span class="stat-value">{{data.items.length}}</span>
            </span>
            <span class="stat-item">
              <span class="stat-label">Total:</span>
              <span class="stat-value">\${{getGroupTotal(data.items)}}</span>
            </span>
            <span class="stat-item">
              <span class="stat-label">Avg:</span>
              <span class="stat-value">\${{getGroupAverage(data.items)}}</span>
            </span>
          </div>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .stats-group-header {
      padding: 12px 16px;
      background: #f9f9f9;
    }
    
    .group-name {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 8px;
      color: #333;
    }
    
    .group-stats {
      display: flex;
      gap: 20px;
      font-size: 12px;
    }
    
    .stat-item {
      display: flex;
      gap: 5px;
    }
    
    .stat-label {
      color: #999;
    }
    
    .stat-value {
      font-weight: bold;
      color: #007bff;
    }
  `]
})
export class GroupStatsComponent {
  public salesData = [
    { productName: 'Laptop', price: 999, quantity: 2, category: 'Electronics', id: '1' },
    { productName: 'Mouse', price: 25, quantity: 5, category: 'Electronics', id: '2' },
    { productName: 'Keyboard', price: 75, quantity: 3, category: 'Electronics', id: '3' },
    { productName: 'Desk', price: 299, quantity: 1, category: 'Furniture', id: '4' },
    { productName: 'Chair', price: 199, quantity: 2, category: 'Furniture', id: '5' }
  ];

  public fields = {
    text: 'productName',
    id: 'id',
    groupBy: 'category'
  };

  getGroupTotal(items: any[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  }

  getGroupAverage(items: any[]): number {
    const total = this.getGroupTotal(items) as any;
    return (total / items.length).toFixed(2);
  }
}
```

---

## Conditional Count Display

### Show Count Only if Greater Than Threshold

```typescript
<ng-template #groupTemplate let-data="">
  <div class="conditional-group">
    <span>{{data.items[0].category}}</span>
    
    <!-- Show count only if > 2 items -->
    <span *ngIf="data.items.length > 2" class="count-badge">
      {{data.items.length}} items
    </span>
    
    <!-- Show "Few items" if exactly 2 -->
    <span *ngIf="data.items.length === 2" class="count-badge small">
      Few items
    </span>
  </div>
</ng-template>
```

### Conditional Colors Based on Count

```typescript
<ng-template #groupTemplate let-data="">
  <div class="conditional-color-group">
    <span>{{data.items[0].category}}</span>
    
    <!-- Green badge for many items -->
    <span *ngIf="data.items.length >= 5" class="badge badge-success">
      {{data.items.length}}
    </span>
    
    <!-- Yellow badge for some items -->
    <span *ngIf="data.items.length === 3 || data.items.length === 4" class="badge badge-warning">
      {{data.items.length}}
    </span>
    
    <!-- Red badge for few items -->
    <span *ngIf="data.items.length < 3" class="badge badge-danger">
      {{data.items.length}}
    </span>
  </div>
</ng-template>
```

```css
.badge-success {
  background: #4caf50;
}

.badge-warning {
  background: #ff9800;
}

.badge-danger {
  background: #f44336;
}
```

---

## Advanced Templates

### Group Header with Icons and Metrics

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-advanced-group',
  template: `
    <ejs-listview 
      [dataSource]='employeeData' 
      [fields]='fields'
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper">
          <span class="e-list-content">{{data.name}}</span>
        </div>
      </ng-template>
      
      <!-- Advanced group header with icons -->
      <ng-template #groupTemplate let-data="">
        <div class="advanced-group">
          <div class="group-left">
            <span [ngClass]="'dept-icon ' + data.items[0].department.toLowerCase()">
              {{ getDeptIcon(data.items[0].department) }}
            </span>
            <div class="group-info">
              <span class="dept-name">{{data.items[0].department}}</span>
              <span class="dept-subtitle">Department</span>
            </div>
          </div>
          
          <div class="group-right">
            <span class="count-metric">
              <span class="count-number">{{data.items.length}}</span>
              <span class="count-label">People</span>
            </span>
            <span class="performance-metric">
              <span class="metric-value">{{getPerformance(data.items)}}%</span>
              <span class="metric-label">Active</span>
            </span>
          </div>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .advanced-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: linear-gradient(to right, #f5f5f5, #ffffff);
      border-left: 4px solid #007bff;
    }
    
    .group-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .dept-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
    }
    
    .dept-icon.sales {
      background: #f44336;
    }
    
    .dept-icon.it {
      background: #2196f3;
    }
    
    .dept-icon.hr {
      background: #4caf50;
    }
    
    .group-info {
      display: flex;
      flex-direction: column;
    }
    
    .dept-name {
      font-weight: 600;
      color: #333;
    }
    
    .dept-subtitle {
      font-size: 12px;
      color: #999;
    }
    
    .group-right {
      display: flex;
      gap: 30px;
    }
    
    .count-metric, .performance-metric {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .count-number, .metric-value {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
    }
    
    .count-label, .metric-label {
      font-size: 11px;
      color: #999;
      margin-top: 2px;
    }
  `]
})
export class AdvancedGroupComponent {
  public employeeData = [
    { name: 'Nancy', department: 'Sales', active: true, id: '1' },
    { name: 'Andrew', department: 'Sales', active: true, id: '2' },
    { name: 'Janet', department: 'IT', active: true, id: '3' },
    { name: 'Steven', department: 'IT', active: false, id: '4' },
    { name: 'Robert', department: 'HR', active: true, id: '5' }
  ];

  public fields = {
    text: 'name',
    id: 'id',
    groupBy: 'department'
  };

  getDeptIcon(dept: string): string {
    const icons: { [key: string]: string } = {
      'Sales': '💼',
      'IT': '💻',
      'HR': '👥'
    };
    return icons[dept] || '•';
  }

  getPerformance(items: any[]): number {
    const active = items.filter(i => i.active).length;
    return Math.round((active / items.length) * 100);
  }
}
```

---

## Best Practices

✅ Always access `data.items[0]` for group property values  
✅ Cache group calculations for performance  
✅ Use meaningful metrics relevant to your domain  
✅ Keep group headers visually distinct from items  
✅ Test counts with uneven group distributions  
✅ Update counts reactively when items change  
✅ Use colors to communicate group status  
✅ Provide tooltips for count explanations  

