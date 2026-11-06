# Templates — Syncfusion Angular MultiSelect Dropdown

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Group Template](#group-template)
- [Header and Footer Templates](#header-and-footer-templates)
- [No Records and Action Failure Templates](#no-records-and-action-failure-templates)
- [Template Context and Data Binding](#template-context-and-data-binding)

---

## Overview

The MultiSelect component lets you replace any part of its default rendering with custom Angular templates using `ng-template`. Templates receive the current item's data as context, so you can render rich layouts, images, badges, or any HTML alongside text.

| Template | Property | Customizes |
|---|---|---|
| Item template | `itemTemplate` | Each row in the popup list |
| Value template | `valueTemplate` | Each selected chip/tag |
| Group template | `groupTemplate` | Group headers inside the list |
| Header template | `headerTemplate` | Fixed content above the list |
| Footer template | `footerTemplate` | Fixed content below the list |
| No records template | `noRecordsTemplate` | Shown when list is empty |
| Action failure template | `actionFailureTemplate` | Shown on data fetch error |

---

## Item Template

Customize how each list item renders in the popup. The template receives the full data object as implicit context.

```typescript
import { Component, OnInit } from '@angular/core';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';

interface Employee {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
}

@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="employees"
      [fields]="fields"
      placeholder="Select team members">
      <!-- ng-template selector matches the property name exactly -->
      <ng-template #itemTemplate let-data>
        <div class="employee-item">
          <img [src]="data.avatarUrl" class="avatar" alt="" />
          <div class="info">
            <span class="name">{{ data.name }}</span>
            <span class="role">{{ data.role }}</span>
          </div>
        </div>
      </ng-template>
    </ejs-multiselect>
  `,
  styles: [`
    .employee-item { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
    .avatar        { width: 32px; height: 32px; border-radius: 50%; }
    .info          { display: flex; flex-direction: column; }
    .name          { font-weight: 600; font-size: 14px; }
    .role          { font-size: 12px; color: #666; }
  `]
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public fields = { text: 'name', value: 'id' };

  ngOnInit(): void {
    this.employees = [
      { id: 1, name: 'Alice Johnson', role: 'Lead Engineer',    avatarUrl: 'assets/alice.png' },
      { id: 2, name: 'Bob Smith',     role: 'Product Manager',  avatarUrl: 'assets/bob.png'   },
      { id: 3, name: 'Carol White',   role: 'UX Designer',      avatarUrl: 'assets/carol.png' },
    ];
  }
}
```

**Two-column layout example:**

```html
<ng-template #itemTemplate let-data>
  <table class="item-table">
    <tr>
      <td style="width:100px; font-weight:600">{{ data.name }}</td>
      <td style="color:#888">{{ data.location }}</td>
    </tr>
  </table>
</ng-template>
```

---

## Value Template

Customize the chip appearance for each selected item. This template renders inside each chip/tag in the input area.

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="skills"
      [fields]="fields"
      placeholder="Select skills">
      <ng-template #valueTemplate let-data>
        <span class="skill-chip">
          <i class="{{ data.icon }}"></i>
          {{ data.name }}
        </span>
      </ng-template>
    </ejs-multiselect>
  `,
  styles: [`
    .skill-chip { display: flex; align-items: center; gap: 4px; }
  `]
})
export class AppComponent {
  public skills = [
    { id: 1, name: 'Angular',    icon: 'e-icons e-angular'    },
    { id: 2, name: 'React',      icon: 'e-icons e-react'      },
    { id: 3, name: 'TypeScript', icon: 'e-icons e-typescript' },
  ];
  public fields = { text: 'name', value: 'id' };
}
```

---

## Group Template

When items are grouped via `fields.groupBy`, customize group headers with `groupTemplate`:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="foods"
      [fields]="fields"
      placeholder="Select food items">
      <!-- Receives the group category value as context -->
      <ng-template #groupTemplate let-data>
        <div class="group-header">
          <span class="category-badge">{{ data.category }}</span>
        </div>
      </ng-template>
    </ejs-multiselect>
  `,
  styles: [`
    .group-header       { padding: 4px 8px; background: #f0f4ff; }
    .category-badge     { font-weight: 700; color: #3f51b5; font-size: 12px; text-transform: uppercase; }
  `]
})
export class AppComponent {
  public foods = [
    { id: 1, name: 'Pizza',  category: 'Italian' },
    { id: 2, name: 'Pasta',  category: 'Italian' },
    { id: 3, name: 'Sushi',  category: 'Japanese' },
    { id: 4, name: 'Ramen',  category: 'Japanese' },
  ];
  public fields = { text: 'name', value: 'id', groupBy: 'category' };
}
```

---

## Header and Footer Templates

Add fixed content at the top or bottom of the popup — useful for action buttons, search hints, or item counts:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="countries"
      placeholder="Select countries">
      <ng-template #headerTemplate>
        <div class="popup-header">
          <strong>Available Countries</strong>
          <span class="hint">Type to search</span>
        </div>
      </ng-template>

      <ng-template #footerTemplate>
        <div class="popup-footer">
          <button (click)="clearAll()">Clear All</button>
        </div>
      </ng-template>
    </ejs-multiselect>
  `,
  styles: [`
    .popup-header { display: flex; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid #ddd; }
    .popup-footer { padding: 8px 12px; border-top: 1px solid #ddd; text-align: right; }
    .hint         { font-size: 11px; color: #999; }
  `]
})
export class AppComponent {
  public countries: string[] = ['United States', 'Canada', 'Germany', 'Japan', 'Brazil'];

  clearAll(): void {
    // access component via ViewChild to clear programmatically
  }
}
```

---

## No Records and Action Failure Templates

Override the default "No records found" message and the error state display:

```typescript
@Component({
  standalone: true,
  imports: [MultiSelectModule],
  template: `
    <ejs-multiselect
      [dataSource]="remoteData"
      [allowFiltering]="true"
      (filtering)="onFilter($event)">
      <ng-template #noRecordsTemplate>
        <div class="empty-state">
          <span>🔍 No matches found</span>
          <small>Try a different search term</small>
        </div>
      </ng-template>

      <ng-template #actionFailureTemplate>
        <div class="error-state">
          ⚠️ Could not load data. Check your connection.
        </div>
      </ng-template>
    </ejs-multiselect>
  `
})
```

---

## Template Context and Data Binding

- Templates receive the **full data object** as their implicit context variable (`let-data`)
- All properties of the data item are accessible: `data.id`, `data.name`, `data.anyProperty`
- You can use Angular pipes, conditional rendering (`*ngIf`), and event bindings inside templates
- For `groupTemplate`, the context is the **group category value** object, not an individual item

```html
<!-- Access any data property -->
<ng-template #itemTemplate let-data>
  <span [class.vip]="data.isPremium">{{ data.name }}</span>
  <span *ngIf="data.isNew" class="badge">NEW</span>
</ng-template>
```

> **Gotcha:** Template variable names must match the Syncfusion property name exactly (e.g., `#itemTemplate`, `#valueTemplate`, `#groupTemplate`). Mismatched names silently fall back to default rendering.
