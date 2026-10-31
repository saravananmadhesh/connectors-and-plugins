# Customization and Templates in Syncfusion Angular ListView

## Table of Contents
- [Built-in CSS Classes](#built-in-css-classes)
- [Header Template](#header-template)
- [Item Template](#item-template)
- [Group Template](#group-template)
- [Dynamic Templates](#dynamic-templates)
- [Advanced Template Patterns](#advanced-template-patterns)

---

## Built-in CSS Classes

The ListView provides predefined CSS classes to structure templates consistently:

| CSS Class | Purpose | Example Usage |
|-----------|---------|----------------|
| `e-list-template` | Mark ListView as template-enabled | Add to `<ejs-listview>` |
| `e-list-wrapper` | Container for template content | Wrap each list item |
| `e-list-content` | Align list content vertically | Wrap text content |
| `e-list-avatar` | Enable avatar styling | Use with `e-avatar` class |
| `e-list-avatar-right` | Avatar on right side | Align avatar right |
| `e-list-badge` | Enable badge styling | Use with `e-badge` class |
| `e-list-multi-line` | Multi-line item layout | Header + description |
| `e-list-item-header` | Item header text | Use with multi-line |

**Structure example:**
```html
<div class="e-list-wrapper e-list-multi-line e-list-avatar">
  <span class="e-avatar e-avatar-circle">Avatar</span>
  <span class="e-list-item-header">Header</span>
  <span class="e-list-content">Content</span>
</div>
```

---

## Header Template

Customize the ListView header with buttons, search bars, or custom content.

### Basic Header with Buttons

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='fruits-list' 
      [dataSource]='data' 
      [showHeader]='true'>
      
      <ng-template #headerTemplate>
        <div class="header-container">
          <span class="header-title">Fruits</span>
          <button ejs-button 
            iconCss='e-icons e-search-icon' 
            cssClass='e-small e-round' 
            isPrimary='true'>
          </button>
          <button ejs-button 
            iconCss='e-icons e-add-icon' 
            cssClass='e-small e-round' 
            isPrimary='true'>
          </button>
          <button ejs-button 
            iconCss='e-icons e-sort-icon' 
            cssClass='e-small e-round' 
            isPrimary='true'>
          </button>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }
    .header-title {
      font-weight: bold;
      font-size: 16px;
    }
  `]
})
export class AppComponent {
  public data = [
    { text: 'Date', id: '1' },
    { text: 'Fig', id: '2' },
    { text: 'Apple', id: '3' },
    { text: 'Apricot', id: '4' }
  ];
}
```

### Header with Search Bar

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='search-list' 
      [dataSource]='data' 
      [showHeader]='true'>
      
      <ng-template #headerTemplate>
        <div class="search-header">
          <input 
            type="text" 
            placeholder="Search items..."
            (input)="onSearch($event)"
            class="search-input">
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .search-header {
      padding: 10px;
    }
    .search-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  public data = [
    { text: 'Apple', id: '1' },
    { text: 'Apricot', id: '2' },
    { text: 'Banana', id: '3' }
  ];

  onSearch(event: any) {
    const searchValue = event.target.value.toLowerCase();
    // Filter logic here
  }
}
```

---

## Item Template

Customize individual list items with complex layouts using `ng-template`.

### Multi-line Item Template with Avatar

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='contacts-list' 
      [dataSource]='contacts' 
      cssClass='e-list-template'
      [headerTitle]='headerTitle'
      [showHeader]='true'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-multi-line e-list-avatar">
          <!-- Avatar with initials or image -->
          <span 
            class="e-avatar e-avatar-circle"
            *ngIf="data.avatar">
            {{data.avatar}}
          </span>
          <img 
            class="e-avatar e-avatar-circle" 
            *ngIf="data.imageUrl"
            [src]="data.imageUrl">
          
          <!-- Header and content -->
          <span class="e-list-item-header">{{data.name}}</span>
          <span class="e-list-content">{{data.email}}</span>
        </div>
      </ng-template>
    </ejs-listview>
  `
})
export class AppComponent {
  public contacts = [
    {
      name: 'Jennifer',
      email: '(206) 555-9854',
      id: '1',
      avatar: 'J',
      imageUrl: ''
    },
    {
      name: 'Amanda',
      email: '(206) 555-3412',
      id: '2',
      avatar: 'A',
      imageUrl: ''
    },
    {
      name: 'Isabella',
      email: '(206) 555-8122',
      id: '3',
      avatar: '',
      imageUrl: 'https://example.com/isabella.jpg'
    }
  ];

  public headerTitle: string = 'Contacts';
}
```

### Item Template with Badges

```typescript
<ejs-listview 
  id='products-list' 
  [dataSource]='products' 
  cssClass='e-list-template'>
  
  <ng-template #template let-data="">
    <div class="e-list-wrapper e-list-badge">
      <span class="e-list-content">{{data.name}}</span>
      <span class="e-badge e-badge-primary">{{data.stock}}</span>
    </div>
  </ng-template>
</ejs-listview>
```

### Complex Item Template with Conditional Content

```typescript
<ng-template #template let-data="">
  <div class="e-list-wrapper e-list-multi-line">
    <!-- Show status indicator -->
    <div class="status-indicator" 
      [ngClass]="data.status === 'active' ? 'active' : 'inactive'">
    </div>
    
    <!-- Main content -->
    <span class="e-list-item-header">{{data.title}}</span>
    <span class="e-list-content">{{data.description}}</span>
    
    <!-- Meta information -->
    <span class="e-list-content meta">{{data.date}}</span>
  </div>
</ng-template>
```

---

## Group Template

Customize group headers when items are grouped by a category field.

### Basic Group Template with Item Count

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='grouped-list' 
      [dataSource]='employees' 
      cssClass='e-list-template'
      [fields]='fields'>
      
      <!-- Item template -->
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-multi-line e-list-avatar">
          <span class="e-avatar e-avatar-circle">{{data.avatar}}</span>
          <span class="e-list-item-header">{{data.name}}</span>
          <span class="e-list-content">{{data.email}}</span>
        </div>
      </ng-template>
      
      <!-- Group template -->
      <ng-template #groupTemplate let-data="">
        <div class="group-header">
          <span class="group-title">{{data.items[0].department}}</span>
          <span class="item-count">{{data.items.length}} employees</span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .group-header {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      background: #f5f5f5;
      font-weight: bold;
    }
    .group-title {
      color: #333;
    }
    .item-count {
      color: #999;
      font-size: 12px;
    }
  `]
})
export class AppComponent {
  public employees = [
    { name: 'Nancy', email: 'nancy@example.com', department: 'Sales', avatar: 'N', id: '1' },
    { name: 'Andrew', email: 'andrew@example.com', department: 'Sales', avatar: 'A', id: '2' },
    { name: 'Janet', email: 'janet@example.com', department: 'IT', avatar: 'J', id: '3' },
    { name: 'Steven', email: 'steven@example.com', department: 'IT', avatar: 'S', id: '4' }
  ];

  public fields = {
    text: 'name',
    id: 'id',
    groupBy: 'department'
  };
}
```

### Advanced Group Template with Statistics

```typescript
<ng-template #groupTemplate let-data="">
  <div class="advanced-group-header">
    <span class="group-icon">{{getGroupIcon(data.items[0].department)}}</span>
    <div class="group-info">
      <span class="group-title">{{data.items[0].department}}</span>
      <span class="group-stats">{{data.items.length}} items • Active: {{getActiveCount(data.items)}}</span>
    </div>
    <span class="expand-icon">›</span>
  </div>
</ng-template>
```

---

## Dynamic Templates

### Template Based on Device Size

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='responsive-list' 
      [dataSource]='data' 
      cssClass='e-list-template'>
      
      <!-- Desktop template -->
      <ng-template #template let-data="" *ngIf="isMobile === false">
        <div class="e-list-wrapper desktop-item">
          <img [src]="data.image" alt="{{data.name}}" class="item-image">
          <div class="item-details">
            <span class="item-title">{{data.name}}</span>
            <span class="item-desc">{{data.description}}</span>
            <span class="item-price">\${{data.price}}</span>
          </div>
        </div>
      </ng-template>
      
      <!-- Mobile template -->
      <ng-template #template let-data="" *ngIf="isMobile === true">
        <div class="e-list-wrapper mobile-item">
          <span class="item-title">{{data.name}}</span>
          <span class="item-price">\${{data.price}}</span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .desktop-item {
      display: flex;
      gap: 15px;
      padding: 15px;
    }
    .item-image {
      width: 80px;
      height: 80px;
      border-radius: 4px;
    }
    .item-details {
      flex: 1;
    }
    
    .mobile-item {
      padding: 10px;
    }
  `]
})
export class AppComponent {
  public isMobile: boolean = window.innerWidth < 768;
  public data = [
    {
      name: 'Product 1',
      description: 'High quality product',
      price: 99.99,
      image: 'product1.jpg',
      id: '1'
    }
  ];

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }
}
```

### Conditional Content in Template

```typescript
<ng-template #template let-data="">
  <div class="e-list-wrapper">
    <!-- Show different content based on data -->
    <div *ngIf="data.type === 'image'" class="image-item">
      <img [src]="data.url" alt="image">
    </div>
    
    <div *ngIf="data.type === 'text'" class="text-item">
      {{data.content}}
    </div>
    
    <div *ngIf="data.type === 'video'" class="video-item">
      <video [src]="data.url" controls></video>
    </div>
  </div>
</ng-template>
```

---

## Advanced Template Patterns

### Template with Event Handlers

```typescript
<ng-template #template let-data="">
  <div class="e-list-wrapper">
    <span class="item-name">{{data.name}}</span>
    <button (click)="editItem(data)" class="edit-btn">Edit</button>
    <button (click)="deleteItem(data)" class="delete-btn">Delete</button>
  </div>
</ng-template>
```

```typescript
editItem(data: any) {
  console.log('Edit:', data);
}

deleteItem(data: any) {
  console.log('Delete:', data);
}
```

### Nested Component in Template

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CustomItemComponent } from './custom-item.component';

@Component({
  imports: [ListViewModule, CustomItemComponent],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='data' 
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <app-custom-item [item]="data"></app-custom-item>
      </ng-template>
    </ejs-listview>
  `
})
export class AppComponent {
  public data = [{...}];
}
```

### Template with ngFor Loop

```typescript
<ng-template #template let-data="">
  <div class="e-list-wrapper">
    <span class="item-title">{{data.name}}</span>
    <div class="tags">
      <span class="tag" *ngFor="let tag of data.tags">{{tag}}</span>
    </div>
  </div>
</ng-template>
```

---

## Checkbox Position

The ListView checkbox can be positioned on the left (default) or right side of the list item using the `checkBoxPosition` property.

### Default: Checkbox on Left

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='sample-list' 
      [dataSource]='data' 
      [showCheckBox]='true'
      checkBoxPosition='Left'>
    </ejs-listview>
  `
})
export class AppComponent {
  public data: string[] = [
    'Badminton',
    'Basketball',
    'Cricket',
    'Golf',
    'Hockey'
  ];
}
```

### Checkbox on Right

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      id='sample-list' 
      [dataSource]='data' 
      [showCheckBox]='true'
      checkBoxPosition='Right'>
    </ejs-listview>
  `
})
export class AppComponent {
  public data: string[] = [
    'Badminton',
    'Basketball',
    'Cricket',
    'Golf',
    'Hockey'
  ];
}
```

**Available positions:**
- `Left` - Default position (left side of item text)
- `Right` - Right side of item text

### Checkbox Position with Custom Template

```typescript
<ejs-listview 
  id='checklist'
  [dataSource]='data' 
  [showCheckBox]='true'
  checkBoxPosition='Right'
  [fields]='fields'
  [template]='itemTemplate'>
  
  <ng-template #itemTemplate let-data>
    <div class="list-item">
      <span class="item-icon">📝</span>
      <span class="item-text">{{data.text}}</span>
      <!-- Checkbox positioned via CSS when checkBoxPosition='Right' -->
    </div>
  </ng-template>
</ejs-listview>
```

---

## Performance Considerations

✅ **Use simple templates** when possible for better scrolling performance  
✅ **Avoid complex calculations** inside templates  
✅ **Use `OnPush` change detection** for large lists  
✅ **Leverage virtualization** with `enableVirtualization` for large datasets  
✅ **Cache template expressions** if computationally expensive  
✅ **Test template rendering** with 1000+ items  

---

## Best Practices

✅ Always add `e-list-wrapper` to template root  
✅ Use semantic CSS classes for consistency  
✅ Keep templates responsive for mobile devices  
✅ Test templates with various data states (empty, null, long text)  
✅ Provide meaningful alt text for images  
✅ Use CSS variables for theming consistency  
✅ Document custom CSS classes in your code  
✅ Match checkbox position to your design (Left for RTL, Right for LTR emphasis)  

