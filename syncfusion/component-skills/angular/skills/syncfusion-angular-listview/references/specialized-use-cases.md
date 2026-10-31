# Specialized Use Cases in Syncfusion Angular ListView

## Table of Contents
- [Chat Window Layout](#chat-window-layout)
- [Checklist Interface](#checklist-interface)
- [Dual-List Transfer](#dual-list-transfer)
- [Grid-Based Layout](#grid-based-layout)
- [Navigation with Hyperlinks](#navigation-with-hyperlinks)
- [Dynamic Tags and Badges](#dynamic-tags-and-badges)
- [Mobile Contact Layout](#mobile-contact-layout)

---

## Chat Window Layout

### Creating a Chat-Style ListView

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-chat',
  template: `
    <ejs-listview 
      id='chat-list'
      [dataSource]='messages' 
      cssClass='e-list-template chat-window'
      [headerTitle]='headerTitle'
      [showHeader]='true'>
      
      <ng-template #template let-data="">
        <div class="chat-item" [ngClass]="data.sender === 'me' ? 'sent' : 'received'">
          <div class="message-container">
            <span class="sender-name">{{data.sender}}</span>
            <div class="message-bubble">
              {{data.message}}
            </div>
            <span class="timestamp">{{data.time}}</span>
          </div>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .chat-window {
      height: 500px;
      overflow-y: auto;
    }
    .chat-item {
      margin: 10px 0;
      display: flex;
    }
    .chat-item.sent {
      justify-content: flex-end;
    }
    .chat-item.received {
      justify-content: flex-start;
    }
    .message-container {
      max-width: 70%;
    }
    .sender-name {
      font-weight: bold;
      font-size: 12px;
      color: #666;
    }
    .message-bubble {
      background: #e3f2fd;
      padding: 10px 15px;
      border-radius: 12px;
      margin: 5px 0;
      word-wrap: break-word;
    }
    .chat-item.sent .message-bubble {
      background: #c8e6c9;
    }
    .timestamp {
      font-size: 11px;
      color: #999;
    }
  `]
})
export class ChatComponent {
  public messages = [
    { sender: 'Other', message: 'Hello! How are you?', time: '10:30 AM', id: '1' },
    { sender: 'me', message: 'I am fine, thanks!', time: '10:31 AM', id: '2' },
    { sender: 'Other', message: 'Great! Let\'s chat', time: '10:32 AM', id: '3' },
    { sender: 'me', message: 'Sure, what\'s up?', time: '10:33 AM', id: '4' }
  ];

  public headerTitle: string = 'Chat with John';
}
```

---

## Checklist Interface

### Checklist with Item Count

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-checklist',
  template: `
    <ejs-listview 
      #checklist
      id='checklist'
      [dataSource]='tasks' 
      [showCheckBox]='true'
      [fields]='fields'
      (change)="onCheckChange($event)">
    </ejs-listview>
    <div class="checklist-stats">
      <span>Completed: {{completedCount}}</span>
      <span>Total: {{tasks.length}}</span>
      <span>Progress: {{(completedCount / tasks.length * 100).toFixed(0)}}%</span>
    </div>
  `,
  styles: [`
    .checklist-stats {
      padding: 15px;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
  `]
})
export class ChecklistComponent {
  @ViewChild('checklist') checklistInstance!: ListViewComponent;

  public tasks = [
    { text: 'Review project requirements', id: '1', isChecked: true },
    { text: 'Design system architecture', id: '2', isChecked: true },
    { text: 'Implement core features', id: '3', isChecked: false },
    { text: 'Write unit tests', id: '4', isChecked: false },
    { text: 'Deploy to production', id: '5', isChecked: false }
  ];

  public fields = { id: 'id', isChecked: 'isChecked' };
  public completedCount: number = 2;

  onCheckChange(event: any) {
    this.completedCount = this.tasks.filter(t => t.isChecked).length;
  }
}
```

---

## Dual-List Transfer

### Transfer Items Between Two Lists

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule, ButtonModule],
  standalone: true,
  selector: 'app-dual-list',
  template: `
    <div class="dual-list-container">
      <div class="list-section">
        <h3>Available</h3>
        <ejs-listview 
          #availableList
          [dataSource]='availableItems' 
          [showCheckBox]='true'
          [fields]='fields'
          cssClass='list-control'>
        </ejs-listview>
      </div>

      <div class="button-section">
        <button ejs-button (click)="moveRight()">
          Move Right →
        </button>
        <button ejs-button (click)="moveLeft()">
          ← Move Left
        </button>
      </div>

      <div class="list-section">
        <h3>Selected</h3>
        <ejs-listview 
          #selectedList
          [dataSource]='selectedItems' 
          [showCheckBox]='true'
          [fields]='fields'
          cssClass='list-control'>
        </ejs-listview>
      </div>
    </div>
  `,
  styles: [`
    .dual-list-container {
      display: flex;
      gap: 20px;
      padding: 20px;
    }
    .list-section {
      flex: 1;
    }
    .list-section h3 {
      margin-bottom: 10px;
    }
    .list-control {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 300px;
    }
    .button-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
    }
  `]
})
export class DualListComponent {
  @ViewChild('availableList') availableList!: ListViewComponent;
  @ViewChild('selectedList') selectedList!: ListViewComponent;

  public availableItems = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' },
    { text: 'Item 3', id: '3' },
    { text: 'Item 4', id: '4' }
  ];

  public selectedItems: any[] = [];
  public fields = { id: 'id', isChecked: 'isChecked' };

  moveRight() {
    const checked = this.availableList.getSelectedItems();
    if (checked.data && checked.data.length > 0) {
      this.selectedItems.push(...checked.data);
      this.availableItems = this.availableItems.filter(
        item => !checked.data.includes(item)
      );
    }
  }

  moveLeft() {
    const checked = this.selectedList.getSelectedItems();
    if (checked.data && checked.data.length > 0) {
      this.availableItems.push(...checked.data);
      this.selectedItems = this.selectedItems.filter(
        item => !checked.data.includes(item)
      );
    }
  }
}
```

---

## Grid-Based Layout

### Display ListView in Grid Format

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-grid-layout',
  template: `
    <div class="grid-container">
      <div class="grid-item" *ngFor="let item of products">
        <img [src]="item.image" [alt]="item.name" class="item-image">
        <div class="item-info">
          <h4>{{item.name}}</h4>
          <p class="price">\${{item.price}}</p>
          <p class="description">{{item.description}}</p>
          <button class="add-btn" (click)="addToCart(item)">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .grid-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    .grid-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .item-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .item-info {
      padding: 15px;
    }
    .item-info h4 {
      margin: 0 0 10px 0;
    }
    .price {
      font-size: 18px;
      font-weight: bold;
      color: #007bff;
      margin: 5px 0;
    }
    .description {
      font-size: 12px;
      color: #666;
      margin: 10px 0;
    }
    .add-btn {
      width: 100%;
      padding: 8px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class GridLayoutComponent {
  public products = [
    { id: '1', name: 'Product 1', price: 99.99, image: 'prod1.jpg', description: 'Quality item' },
    { id: '2', name: 'Product 2', price: 149.99, image: 'prod2.jpg', description: 'Premium item' },
    { id: '3', name: 'Product 3', price: 79.99, image: 'prod3.jpg', description: 'Budget item' }
  ];

  addToCart(item: any) {
    console.log('Added to cart:', item);
  }
}
```

---

## Navigation with Hyperlinks

### List with Hyperlink Navigation

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [ListViewModule, RouterModule],
  standalone: true,
  selector: 'app-nav-list',
  template: `
    <ejs-listview 
      id='nav-list'
      [dataSource]='menuItems' 
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-avatar">
          <span [ngClass]="data.icon" class="nav-icon"></span>
          <a [routerLink]="data.route" class="nav-link">
            {{data.text}}
          </a>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .nav-icon {
      margin-right: 10px;
    }
    .nav-link {
      text-decoration: none;
      color: #333;
      cursor: pointer;
    }
    .nav-link:hover {
      color: #007bff;
    }
  `]
})
export class NavigationListComponent {
  public menuItems = [
    { text: 'Dashboard', route: '/dashboard', icon: 'e-icons e-home', id: '1' },
    { text: 'Products', route: '/products', icon: 'e-icons e-shopping-cart', id: '2' },
    { text: 'Orders', route: '/orders', icon: 'e-icons e-receipt', id: '3' },
    { text: 'Settings', route: '/settings', icon: 'e-icons e-settings', id: '4' }
  ];
}
```

---

## Dynamic Tags and Badges

### Display Tags and Badges in ListView

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-tags-badges',
  template: `
    <ejs-listview 
      [dataSource]='items' 
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-multi-line">
          <span class="e-list-item-header">{{data.title}}</span>
          <div class="tags-container">
            <span class="tag" *ngFor="let tag of data.tags">{{tag}}</span>
          </div>
          <span class="badge-container">
            <span class="badge" [ngClass]="'badge-' + data.status">
              {{data.status}}
            </span>
          </span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .tags-container {
      margin: 8px 0;
    }
    .tag {
      display: inline-block;
      background: #f0f0f0;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-right: 5px;
    }
    .badge-container {
      margin-top: 8px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
    .badge-active {
      background: #4caf50;
    }
    .badge-pending {
      background: #ff9800;
    }
    .badge-inactive {
      background: #f44336;
    }
  `]
})
export class TagsBadgesComponent {
  public items = [
    {
      id: '1',
      title: 'Angular Project',
      tags: ['Frontend', 'TypeScript', 'Material'],
      status: 'active'
    },
    {
      id: '2',
      title: 'Node.js API',
      tags: ['Backend', 'REST', 'Express'],
      status: 'pending'
    },
    {
      id: '3',
      title: 'Database',
      tags: ['MongoDB', 'NoSQL'],
      status: 'active'
    }
  ];
}
```

---

## Mobile Contact Layout

### Contact List with Avatar and Multiple Info Lines

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-contacts',
  template: `
    <ejs-listview 
      [dataSource]='contacts' 
      cssClass='e-list-template'
      [headerTitle]='headerTitle'
      [showHeader]='true'
      sortOrder='Ascending'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper e-list-multi-line e-list-avatar">
          <span class="e-avatar e-avatar-circle">{{data.initial}}</span>
          <span class="e-list-item-header">{{data.name}}</span>
          <span class="e-list-content">{{data.phone}}</span>
          <span class="e-list-content email">{{data.email}}</span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .e-list-content.email {
      font-size: 12px;
      color: #999;
    }
  `]
})
export class ContactsComponent {
  public contacts = [
    {
      id: '1',
      name: 'Jennifer',
      phone: '(206) 555-9854',
      email: 'jennifer@example.com',
      initial: 'J'
    },
    {
      id: '2',
      name: 'Amanda',
      phone: '(206) 555-3412',
      email: 'amanda@example.com',
      initial: 'A'
    },
    {
      id: '3',
      name: 'William',
      phone: '(206) 555-9482',
      email: 'william@example.com',
      initial: 'W'
    }
  ];

  public headerTitle: string = 'My Contacts';
}
```

---

## Best Practices for Specialized Use Cases

✅ Choose appropriate template layouts for your use case  
✅ Test on mobile devices for responsive behavior  
✅ Optimize performance for large specialized lists  
✅ Provide clear visual feedback for user interactions  
✅ Use consistent styling across similar components  
✅ Document custom styles and layouts for team members  
✅ Handle edge cases (empty lists, loading states)  
✅ Consider accessibility in custom layouts  

