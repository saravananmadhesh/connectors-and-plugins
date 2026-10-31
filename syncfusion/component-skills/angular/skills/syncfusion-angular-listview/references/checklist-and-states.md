# Checklist and Item States in Syncfusion Angular ListView

## Table of Contents
- [Basic Checklist](#basic-checklist)
- [Checkbox Styling](#checkbox-styling)
- [Item State Management](#item-state-management)
- [Multi-State Checkboxes](#multi-state-checkboxes)
- [Checklist Patterns](#checklist-patterns)
- [Progress Tracking](#progress-tracking)

---

## Basic Checklist

### Simple Checklist with Checkboxes

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-basic-checklist',
  template: `
    <ejs-listview 
      id='basic-checklist'
      [dataSource]='tasks' 
      [showCheckBox]='true'
      [fields]='fields'
      headerTitle='My Tasks'
      [showHeader]='true'>
    </ejs-listview>
  `
})
export class BasicChecklistComponent {
  public tasks = [
    { text: 'Buy groceries', id: '1', isChecked: false },
    { text: 'Prepare dinner', id: '2', isChecked: true },
    { text: 'Clean house', id: '3', isChecked: false },
    { text: 'Review code', id: '4', isChecked: true },
    { text: 'Write documentation', id: '5', isChecked: false }
  ];

  public fields = {
    id: 'id',
    isChecked: 'isChecked'
  };
}
```

### Checklist with Icons and Styling

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-styled-checklist',
  template: `
    <ejs-listview 
      id='styled-checklist'
      [dataSource]='tasks' 
      [showCheckBox]='true'
      [fields]='fields'
      cssClass='e-list-template'
      (change)="onCheckChange($event)">
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper" [class.completed]="data.isChecked">
          <span class="task-icon" [ngClass]="data.icon"></span>
          <span class="task-text" [class.strikethrough]="data.isChecked">
            {{data.text}}
          </span>
          <span class="priority-badge" [ngClass]="'priority-' + data.priority">
            {{data.priority}}
          </span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .completed {
      opacity: 0.6;
    }
    
    .task-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    
    .task-text {
      flex: 1;
    }
    
    .strikethrough {
      text-decoration: line-through;
      color: #999;
    }
    
    .priority-badge {
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: bold;
      color: white;
    }
    
    .priority-high {
      background: #f44336;
    }
    
    .priority-medium {
      background: #ff9800;
    }
    
    .priority-low {
      background: #4caf50;
    }
  `]
})
export class StyledChecklistComponent {
  public tasks = [
    { text: 'Buy groceries', id: '1', isChecked: false, icon: 'e-icons e-shopping-cart', priority: 'high' },
    { text: 'Prepare dinner', id: '2', isChecked: true, icon: 'e-icons e-utensils', priority: 'high' },
    { text: 'Clean house', id: '3', isChecked: false, icon: 'e-icons e-broom', priority: 'medium' },
    { text: 'Review code', id: '4', isChecked: true, icon: 'e-icons e-code', priority: 'high' },
    { text: 'Write docs', id: '5', isChecked: false, icon: 'e-icons e-document', priority: 'low' }
  ];

  public fields = {
    id: 'id',
    isChecked: 'isChecked'
  };

  onCheckChange(event: any) {
    console.log('Task toggled:', event);
  }
}
```

---

## Checkbox Styling

### Custom Checkbox Appearance

```css
/* Style checkboxes */
.e-listview .e-list-item .e-checkbox-wrapper {
  margin-right: 15px;
}

.e-listview .e-list-item .e-checkbox-wrapper input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.e-listview .e-list-item .e-checkbox-wrapper label {
  cursor: pointer;
  user-select: none;
}

/* Checked state styling */
.e-listview .e-list-item .e-checkbox-wrapper input:checked + label::before {
  background: #007bff;
  border-color: #007bff;
}

/* Hover state */
.e-listview .e-list-item .e-checkbox-wrapper:hover input + label::before {
  border-color: #007bff;
}

/* Focus state (accessibility) */
.e-listview .e-list-item .e-checkbox-wrapper input:focus + label::before {
  outline: 2px solid #007bff;
}
```

### Large Checkboxes for Accessibility

```css
.e-listview.large-checkboxes .e-checkbox-wrapper {
  transform: scale(1.5);
  transform-origin: left;
}

.e-listview.large-checkboxes .e-list-item {
  padding: 20px 15px;
}
```

---

## Item State Management

### Managing Enabled/Disabled States

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ListViewModule, CommonModule],
  standalone: true,
  selector: 'app-item-states',
  template: `
    <ejs-listview 
      id='state-list'
      [dataSource]='items' 
      [showCheckBox]='true'
      [fields]='fields'
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper" [class.disabled]="!data.enabled">
          <span class="state-indicator" [ngClass]="data.state">
            {{getStateIcon(data.state)}}
          </span>
          <span class="item-name">{{data.name}}</span>
          <span class="state-label" [ngClass]="'state-' + data.state">
            {{data.state | uppercase}}
          </span>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .disabled {
      opacity: 0.5;
      pointer-events: none;
      background-color: #f5f5f5;
    }
    
    .state-indicator {
      margin-right: 10px;
      font-size: 18px;
    }
    
    .state-indicator.active {
      color: #4caf50;
    }
    
    .state-indicator.pending {
      color: #ff9800;
    }
    
    .state-indicator.inactive {
      color: #999;
    }
    
    .state-label {
      margin-left: auto;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: bold;
      color: white;
    }
    
    .state-active {
      background: #4caf50;
    }
    
    .state-pending {
      background: #ff9800;
    }
    
    .state-inactive {
      background: #999;
    }
  `]
})
export class ItemStatesComponent {
  public items = [
    { name: 'Active Task', id: '1', state: 'active', enabled: true, isChecked: true },
    { name: 'Pending Task', id: '2', state: 'pending', enabled: true, isChecked: false },
    { name: 'Inactive Task', id: '3', state: 'inactive', enabled: false, isChecked: false },
    { name: 'Active Task 2', id: '4', state: 'active', enabled: true, isChecked: true }
  ];

  public fields = {
    id: 'id',
    isChecked: 'isChecked',
    enabled: 'enabled'
  };

  getStateIcon(state: string): string {
    const icons: { [key: string]: string } = {
      'active': '✓',
      'pending': '⏳',
      'inactive': '○'
    };
    return icons[state] || '';
  }
}
```

---

## Multi-State Checkboxes

### Tri-State Checkbox (Indeterminate State)

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-tri-state-checkbox',
  template: `
    <div>
      <button (click)="selectAll()">Select All</button>
      <button (click)="deselectAll()">Deselect All</button>
    </div>
    
    <ejs-listview 
      #listview
      id='tri-state-list'
      [dataSource]='items' 
      [showCheckBox]='true'
      [fields]='fields'
      (change)="updateTriState()">
    </ejs-listview>
    
    <div class="state-info">
      <span>Selected: {{selectedCount}}</span>
      <span>Total: {{items.length}}</span>
    </div>
  `,
  styles: [`
    .state-info {
      padding: 15px;
      background: #f5f5f5;
      display: flex;
      gap: 20px;
      font-size: 14px;
    }
  `]
})
export class TriStateCheckboxComponent {
  @ViewChild('listview') listViewInstance!: ListViewComponent;

  public items = [
    { text: 'Item 1', id: '1', isChecked: true },
    { text: 'Item 2', id: '2', isChecked: false },
    { text: 'Item 3', id: '3', isChecked: true },
    { text: 'Item 4', id: '4', isChecked: false }
  ];

  public fields = { id: 'id', isChecked: 'isChecked' };
  public selectedCount: number = 2;

  selectAll() {
    this.items.forEach(item => item.isChecked = true);
    this.listViewInstance.refresh();
    this.updateTriState();
  }

  deselectAll() {
    this.items.forEach(item => item.isChecked = false);
    this.listViewInstance.refresh();
    this.updateTriState();
  }

  updateTriState() {
    this.selectedCount = this.items.filter(i => i.isChecked).length;
    this.updateIndeterminateState();
  }

  updateIndeterminateState() {
    const checkboxes = document.querySelectorAll('.e-checkbox-wrapper input');
    const allChecked = this.selectedCount === this.items.length;
    const noneChecked = this.selectedCount === 0;

    if (!allChecked && !noneChecked) {
      // Set indeterminate state
      checkboxes.forEach((cb: any) => {
        cb.indeterminate = true;
      });
    } else {
      checkboxes.forEach((cb: any) => {
        cb.indeterminate = false;
      });
    }
  }
}
```

---

## Checklist Patterns

### Todo List with Categories

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <input 
      type="text" 
      placeholder="Add new task..."
      (keyup.enter)="addTask($event)"
      class="task-input">
    
    <ejs-listview 
      #todolist
      id='todo-list'
      [dataSource]='todos' 
      [showCheckBox]='true'
      [fields]='fields'
      [groupBy]='groupBy'
      cssClass='e-list-template'>
      
      <ng-template #template let-data="">
        <div class="e-list-wrapper" [class.completed]="data.isChecked">
          <span class="todo-text">{{data.text}}</span>
          <span class="due-date">{{data.dueDate}}</span>
          <button (click)="deleteTask(data.id)" class="delete-btn">×</button>
        </div>
      </ng-template>
    </ejs-listview>
  `,
  styles: [`
    .task-input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .completed {
      opacity: 0.6;
      text-decoration: line-through;
    }
    
    .todo-text {
      flex: 1;
    }
    
    .due-date {
      font-size: 12px;
      color: #999;
      margin-right: 10px;
    }
    
    .delete-btn {
      background: #f44336;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  `]
})
export class TodoListComponent {
  @ViewChild('todolist') todoListInstance!: ListViewComponent;

  public todos = [
    { text: 'Buy milk', id: '1', isChecked: false, dueDate: 'Today', category: 'Shopping' },
    { text: 'Complete project', id: '2', isChecked: true, dueDate: 'Tomorrow', category: 'Work' },
    { text: 'Call Mom', id: '3', isChecked: false, dueDate: 'This Week', category: 'Personal' },
    { text: 'Finish report', id: '4', isChecked: false, dueDate: 'Friday', category: 'Work' }
  ];

  public fields = {
    id: 'id',
    isChecked: 'isChecked',
    groupBy: 'category'
  };

  public groupBy: string = 'category';

  addTask(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      const newTask = {
        text: input.value,
        id: Date.now().toString(),
        isChecked: false,
        dueDate: 'Today',
        category: 'General'
      };
      this.todos.push(newTask);
      this.todoListInstance.refresh();
      input.value = '';
    }
  }

  deleteTask(taskId: string) {
    this.todos = this.todos.filter(t => t.id !== taskId);
    this.todoListInstance.refresh();
  }
}
```

---

## Progress Tracking

### Visual Progress Indicator

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-progress-checklist',
  template: `
    <div class="progress-container">
      <div class="progress-label">
        Progress: {{completedCount}}/{{tasks.length}} completed
      </div>
      <div class="progress-bar">
        <div class="progress-fill" [style.width]="progressPercent + '%'"></div>
      </div>
    </div>
    
    <ejs-listview 
      #tasklist
      id='progress-list'
      [dataSource]='tasks' 
      [showCheckBox]='true'
      [fields]='fields'
      (change)="updateProgress()">
    </ejs-listview>
  `,
  styles: [`
    .progress-container {
      margin-bottom: 20px;
    }
    
    .progress-label {
      font-size: 14px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    .progress-bar {
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4caf50, #45a049);
      transition: width 0.3s ease;
    }
  `]
})
export class ProgressChecklistComponent {
  @ViewChild('tasklist') taskListInstance!: ListViewComponent;

  public tasks = [
    { text: 'Task 1', id: '1', isChecked: true },
    { text: 'Task 2', id: '2', isChecked: true },
    { text: 'Task 3', id: '3', isChecked: false },
    { text: 'Task 4', id: '4', isChecked: false },
    { text: 'Task 5', id: '5', isChecked: false }
  ];

  public fields = { id: 'id', isChecked: 'isChecked' };
  public completedCount: number = 2;
  public progressPercent: number = 40;

  updateProgress() {
    this.completedCount = this.tasks.filter(t => t.isChecked).length;
    this.progressPercent = (this.completedCount / this.tasks.length) * 100;
  }
}
```

---

## Best Practices

✅ Provide clear visual feedback for checked/unchecked states  
✅ Use appropriate colors for different states  
✅ Make checkboxes large enough for easy clicking  
✅ Include progress indicators for multi-step checklists  
✅ Support keyboard navigation (Space to toggle)  
✅ Persist checklist state to storage (localStorage, database)  
✅ Group related items for better organization  
✅ Provide undo functionality for important actions  
✅ Test on mobile devices for touch usability  
✅ Use meaningful labels for checkbox items  
✅ Hide checkboxes for leaf nodes in nested lists when appropriate

---

## Hide Checkboxes for Specific Items

The checkbox visibility can be controlled per item using the `htmlAttributes` property with a custom CSS class.

### Basic Hide Checkbox Example

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-mixed-checkbox',
  template: `
    <ejs-listview 
      #list
      id='mixed-checkbox-list' 
      [dataSource]='dataSource' 
      [showCheckBox]='true'
      [fields]='fields'
      [sortOrder]='Ascending'
      headerTitle='Mixed Checkbox List'
      [showHeader]='true'
      (select)="onSelect($event)">
    </ejs-listview>
  `,
  styles: [`
    /* Hide checkbox for items with e-checkbox-hidden class */
    :host ::ng-deep .e-checkbox-hidden .e-checkbox-wrapper {
      display: none;
    }
    
    /* Keep item selectable but without visible checkbox */
    :host ::ng-deep .e-checkbox-hidden {
      padding-left: 8px;
    }
  `]
})
export class MixedCheckboxComponent {
  @ViewChild('list') listViewInstance?: ListViewComponent;
  
  public dataSource: any[] = [
    {
      'text': 'Asia',
      'id': '01',
      'child': [
        {
          'text': 'India',
          'id': '1',
          'child': [
            {
              'text': 'Delhi',
              'id': '1001',
              'htmlAttributes': { 'class': 'e-file e-checkbox-hidden' }
            },
            {
              'text': 'Kashmir',
              'id': '1002',
              'htmlAttributes': { 'class': 'e-file e-checkbox-hidden' }
            },
            {
              'text': 'Goa',
              'id': '1003',
              'htmlAttributes': { 'class': 'e-file' }
            }
          ]
        },
        {
          'text': 'China',
          'id': '2',
          'child': [
            {
              'text': 'Zhejiang',
              'id': '2001',
              'htmlAttributes': { 'class': 'e-file' }
            },
            {
              'text': 'Hunan',
              'id': '2002',
              'htmlAttributes': { 'class': 'e-file e-checkbox-hidden' }
            }
          ]
        }
      ]
    }
  ];

  public fields = { 
    tooltip: 'text',
    id: 'id'
  };
  
  Ascending: any;

  onSelect(args: any) {
    // Handle selection for items with hidden checkboxes
    if (this.listViewInstance && this.listViewInstance.element) {
      const hiddenCheckboxElements = 
        this.listViewInstance.element.querySelectorAll('.e-checkbox-hidden');

      // Remove 'e-active' class from all hidden-checkbox elements
      hiddenCheckboxElements.forEach((element: Element) => {
        (element as HTMLElement).classList.remove('e-active');
      });

      // Add 'e-active' class to currently selected item if it has hidden checkbox
      if (args.item && args.item.classList.contains('e-checkbox-hidden')) {
        args.item.classList.add('e-active');
      }
    }
  }
}
```

### Use Cases for Hidden Checkboxes

**Scenario: Leaf nodes only in nested list**
- Parent items (folders/categories) can be checked
- Leaf items (files/specific items) hide checkboxes
- User manually selects what they need without checkbox UI

**Scenario: Mixed selection interface**
- Some items are always selectable (no checkbox needed)
- Other items are multi-select with visible checkboxes
- Reduces visual complexity in mixed-purpose lists

### Styling Hidden Checkbox Items

```css
/* Align items with hidden checkboxes properly */
.e-checkbox-hidden {
  margin-left: 0;
  padding-left: 8px;
}

/* Alternative: show a different icon instead of checkbox */
.e-checkbox-hidden::before {
  content: "●";  /* Bullet point instead of checkbox */
  margin-right: 8px;
  color: #999;
}

/* Highlight hidden-checkbox items differently */
.e-checkbox-hidden {
  background-color: #f9f9f9;
  color: #666;
}

.e-checkbox-hidden:hover {
  background-color: #f0f0f0;
}
```  

