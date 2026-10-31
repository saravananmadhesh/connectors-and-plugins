# Grouping & Templates

## Table of Contents
- [Grouping Basics](#grouping-basics)
- [Item Templates](#item-templates)
- [Group Header Templates](#group-header-templates)
- [Footer Templates](#footer-templates)
- [Header Templates](#header-templates)
- [Complex Templating](#complex-templating)
- [Performance Considerations](#performance-considerations)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Grouping Basics

### Group by Field

**Use when:** You want to organize items into categories

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-grouped',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="vegetables"
      fields="{ text: 'name', value: 'id', groupBy: 'category' }"
      placeholder="Select a vegetable">
    </ejs-combobox>
  `
})
export class GroupedComponent {
  vegetables = [
    { id: 1, name: 'Carrot', category: 'Root Vegetables' },
    { id: 2, name: 'Potato', category: 'Root Vegetables' },
    { id: 3, name: 'Tomato', category: 'Fruits' },
    { id: 4, name: 'Bell Pepper', category: 'Fruits' },
    { id: 5, name: 'Spinach', category: 'Leafy' },
    { id: 6, name: 'Lettuce', category: 'Leafy' }
  ];
}
```

**Dropdown display:**
```
▼ Root Vegetables
  - Carrot
  - Potato
▼ Fruits
  - Tomato
  - Bell Pepper
▼ Leafy
  - Spinach
  - Lettuce
```

---

### Group Display Types

**Inline Groups (Default):**
```
Group Header: Root Vegetables
  ├─ Carrot
  └─ Potato
```

**Fixed Groups (Sticky Headers):**
- Header stays at top while scrolling
- Updates to show current group
- Better for large lists

```typescript
// Note: Fixed headers are the default behavior
// Header scrolls with items to show current category
```

---

## Item Templates

### Basic Item Template

**Use when:** You want custom display for each item

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="employees"
      fields="{ text: 'name', value: 'id' }"
      itemTemplate="itemTemplate"
      placeholder="Select employee">
      
      <ng-template #itemTemplate let-data>
        <div style="padding: 8px;">
          <strong>{{ data.name }}</strong>
          <div style="font-size: 12px; color: #999;">
            {{ data.department }}
          </div>
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class ItemTemplateComponent {
  employees = [
    { id: 1, name: 'Alice Johnson', department: 'Engineering' },
    { id: 2, name: 'Bob Smith', department: 'Sales' },
    { id: 3, name: 'Carol White', department: 'HR' }
  ];
}
```

**Dropdown display:**
```
Alice Johnson
Engineering

Bob Smith
Sales

Carol White
HR
```

---

### Item Template with Icons & Images

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="countries"
      fields="{ text: 'name', value: 'code' }"
      itemTemplate="countryTemplate"
      placeholder="Select country">
      
      <ng-template #countryTemplate let-data>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img [src]="'assets/flags/' + data.code.toLowerCase() + '.png'"
               style="width: 24px; height: 16px;">
          <span>{{ data.name }}</span>
          <small style="color: #aaa;">({{ data.code }})</small>
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class CountryTemplateComponent {
  countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'DE', name: 'Germany' }
  ];
}
```

---

### Item Template with Status Badge

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="tasks"
      fields="{ text: 'title', value: 'id' }"
      itemTemplate="taskTemplate"
      placeholder="Select task">
      
      <ng-template #taskTemplate let-data>
        <div style="display: flex; justify-content: space-between; padding: 8px;">
          <span>{{ data.title }}</span>
          <span [ngClass]="'badge badge-' + data.status">
            {{ data.status }}
          </span>
        </div>
      </ng-template>
    </ejs-combobox>
  `,
  styles: [`
    .badge {
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: bold;
    }
    .badge-pending { background: #ffc107; color: #000; }
    .badge-done { background: #28a745; color: #fff; }
    .badge-blocked { background: #dc3545; color: #fff; }
  `]
})
export class TaskTemplateComponent {
  tasks = [
    { id: 1, title: 'Update documentation', status: 'done' },
    { id: 2, title: 'Fix bug #123', status: 'pending' },
    { id: 3, title: 'Review PR', status: 'blocked' }
  ];
}
```

---

## Group Header Templates

### Customize Group Header Display

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="products"
      fields="{ 
        text: 'name', 
        value: 'id', 
        groupBy: 'category'
      }"
      groupTemplate="groupTemplate"
      placeholder="Select product">
      
      <ng-template #groupTemplate let-data>
        <div style="padding: 8px; background: #f5f5f5; font-weight: bold;">
          📦 {{ data.category }} ({{ getCategoryCount(data.category) }} items)
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class GroupTemplateComponent {
  products = [
    { id: 1, name: 'Laptop', category: 'Electronics' },
    { id: 2, name: 'Monitor', category: 'Electronics' },
    { id: 3, name: 'Desk', category: 'Furniture' },
    { id: 4, name: 'Chair', category: 'Furniture' }
  ];

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }
}
```

**Display:**
```
📦 Electronics (2 items)
  ├─ Laptop
  └─ Monitor
📦 Furniture (2 items)
  ├─ Desk
  └─ Chair
```

---

### Group Header with Icons

```typescript
<ng-template #groupTemplate let-data>
  <div style="display: flex; align-items: center; gap: 10px;">
    <span [ngSwitch]="data.category">
      <span *ngSwitchCase="'Electronics'">⚡</span>
      <span *ngSwitchCase="'Furniture'">🪑</span>
      <span *ngSwitchDefault>📦</span>
    </span>
    <strong>{{ data.category }}</strong>
    <span style="color: #999; font-size: 12px;">
      ({{ getCategoryCount(data.category) }})
    </span>
  </div>
</ng-template>
```

---

## Footer Templates

### Add Footer to Dropdown

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      footerTemplate="footerTemplate"
      placeholder="Select item">
      
      <ng-template #footerTemplate>
        <div style="padding: 10px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
          Showing {{ items.length }} items
          <a href="/view-all" style="margin-left: 10px;">View All →</a>
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class FooterComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

**Display:**
```
─────────────────────────
Item 1
Item 2
Item 3
─────────────────────────
Showing 3 items  View All →
```

---

### Footer with Action Buttons

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      footerTemplate="footerTemplate"
      placeholder="Select">
      
      <ng-template #footerTemplate>
        <div style="padding: 10px; display: flex; gap: 5px; justify-content: center;">
          <button (click)="addNew()" style="padding: 5px 10px; cursor: pointer;">
            + Add New
          </button>
          <button (click)="refresh()" style="padding: 5px 10px; cursor: pointer;">
            🔄 Refresh
          </button>
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class ActionFooterComponent {
  items = ['Item 1', 'Item 2'];

  addNew() {
    this.items.push('New Item');
  }

  refresh() {
    console.log('Refreshing...');
  }
}
```

---

## Header Templates

### Add Header to Dropdown

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      headerTemplate="headerTemplate"
      placeholder="Select">
      
      <ng-template #headerTemplate>
        <div style="padding: 10px; background: #007bff; color: white;">
          <strong>Select an Option</strong>
          <p style="margin: 5px 0; font-size: 12px;">
            Click to filter or type to search
          </p>
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class HeaderComponent {
  items = ['Option 1', 'Option 2', 'Option 3'];
}
```

---

## Complex Templating

### Combine Multiple Templates

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="employees"
      fields="{ text: 'name', value: 'id', groupBy: 'department' }"
      itemTemplate="itemTemplate"
      groupTemplate="groupTemplate"
      headerTemplate="headerTemplate"
      footerTemplate="footerTemplate"
      placeholder="Select employee">
      
      <!-- Header -->
      <ng-template #headerTemplate>
        <div style="padding: 10px; background: #f8f9fa; border-bottom: 1px solid #dee2e6;">
          <strong>Company Directory</strong>
        </div>
      </ng-template>

      <!-- Group Header -->
      <ng-template #groupTemplate let-data>
        <strong style="color: #007bff;">{{ data.department }}</strong>
      </ng-template>

      <!-- Item -->
      <ng-template #itemTemplate let-data>
        <div style="display: flex; justify-content: space-between; padding: 5px;">
          <span>👤 {{ data.name }}</span>
          <small style="color: #999;">{{ data.title }}</small>
        </div>
      </ng-template>

      <!-- Footer -->
      <ng-template #footerTemplate>
        <div style="padding: 10px; text-align: center; font-size: 12px; color: #999;">
          {{ employees.length }} employees
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class ComplexTemplateComponent {
  employees = [
    { id: 1, name: 'Alice', title: 'Lead Engineer', department: 'Engineering' },
    { id: 2, name: 'Bob', title: 'Senior Engineer', department: 'Engineering' },
    { id: 3, name: 'Carol', title: 'Sales Director', department: 'Sales' },
    { id: 4, name: 'David', title: 'HR Manager', department: 'HR' }
  ];
}
```

---

## Performance Considerations

### Template Performance for Large Lists

**Problem:** Templates slow down rendering with 10,000+ items

**Solution 1: Virtual Scrolling**

```typescript
template: `
  <ejs-combobox
    [dataSource]="largeList"
    itemTemplate="itemTemplate"
    [enableVirtualization]="true"
    placeholder="Select from 10000 items">
    
    <ng-template #itemTemplate let-data>
      <div>{{ data.name }}</div>
    </ng-template>
  </ejs-combobox>
`

// Virtual scrolling: Only renders visible items (~50)
// Result: Smooth scrolling even with complex templates
```

---

**Solution 2: Simple Templates**

```typescript
// ❌ Slow - Complex nested templates
<ng-template #itemTemplate let-data>
  <div>
    <div *ngIf="data.type === 'A'">Type A layout</div>
    <div *ngIf="data.type === 'B'">Type B layout</div>
    <div *ngIf="data.type === 'C'">Type C layout</div>
    {{ calculateDynamicValue(data) }}
  </div>
</ng-template>

// ✅ Fast - Simple, static templates
<ng-template #itemTemplate let-data>
  <div>{{ data.name }} - {{ data.value }}</div>
</ng-template>
```

---

### Lazy Load Template Content

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      itemTemplate="itemTemplate"
      placeholder="Select">
      
      <ng-template #itemTemplate let-data>
        <!-- Only show icon, not full details -->
        <span>{{ data.icon }} {{ data.name }}</span>
      </ng-template>
    </ejs-combobox>
  `
})
export class LazyTemplateComponent {
  items = [
    { icon: '📄', name: 'Document' },
    { icon: '📁', name: 'Folder' },
    { icon: '🖼️', name: 'Image' }
  ];
}
```

---

## Common Patterns

### Pattern 1: Icons with Text

```typescript
items = [
  { id: 1, name: 'JavaScript', icon: '⚙️' },
  { id: 2, name: 'Python', icon: '🐍' },
  { id: 3, name: 'Java', icon: '☕' }
];

template: `
  <ng-template #itemTemplate let-data>
    <span style="font-size: 18px; margin-right: 8px;">{{ data.icon }}</span>
    {{ data.name }}
  </ng-template>
`
```

---

### Pattern 2: Category Badge

```typescript
products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'Electronics' },
  { id: 2, name: 'Chair', price: 150, category: 'Furniture' }
];

template: `
  <ng-template #itemTemplate let-data>
    <div style="display: flex; justify-content: space-between;">
      <span>{{ data.name }} - ${{ data.price }}</span>
      <span style="background: #e3f2fd; padding: 2px 6px; border-radius: 3px; font-size: 11px;">
        {{ data.category }}
      </span>
    </div>
  </ng-template>
`
```

---

### Pattern 3: Checkbox in Template

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      itemTemplate="checkboxTemplate"
      placeholder="Select items">
      
      <ng-template #checkboxTemplate let-data>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" [checked]="isSelected(data.id)">
          {{ data.name }}
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class CheckboxTemplateComponent {
  items = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' }
  ];
  selectedIds = new Set<number>();

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }
}
```

---

## Troubleshooting

### Issue: Template not rendering / shows as text

**Cause:** Missing `<ng-template>` or incorrect reference

**Fix:**
```typescript
// ❌ Wrong
template: `
  <ejs-combobox
    itemTemplate="<span>{{ data.name }}</span>"
  >
  </ejs-combobox>
`

// ✅ Correct
template: `
  <ejs-combobox
    itemTemplate="itemTemplate"
  >
    <ng-template #itemTemplate let-data>
      <span>{{ data.name }}</span>
    </ng-template>
  </ejs-combobox>
`
```

---

### Issue: Grouping doesn't work with template

**Cause:** Need both `groupBy` field AND `groupTemplate`

**Fix:**
```typescript
// ✅ Both required
<ejs-combobox
  fields="{ text: 'name', value: 'id', groupBy: 'category' }"
  groupTemplate="groupTemplate"
>
  <ng-template #groupTemplate let-data>
    {{ data.category }}
  </ng-template>
</ejs-combobox>
```

---

### Issue: Performance degradation with templates

**Cause:** Complex template logic with large datasets

**Fix:**
```typescript
// Enable virtual scrolling
[enableVirtualization]="true"

// Simplify template
// Move heavy computation to component class
getCategoryIcon(category: string): string {
  // Pre-compute instead of in template
  return this.categoryIconMap[category];
}
```

---

Your display is now customized! Move to [Feature Configuration](../feature-configuration.md) to add advanced features.
