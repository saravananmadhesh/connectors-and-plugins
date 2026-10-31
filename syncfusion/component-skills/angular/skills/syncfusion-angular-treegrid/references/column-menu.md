---
name: Column Menu
description: 'Column Menu in Syncfusion Angular TreeGrid - column header context menu, filter/sort options, custom menu items, and menu event handling for column operations.'
---

# Column Menu

Column Menu provides a context menu for column headers enabling sorting, filtering, and custom operations on columns.

## When to Use

Use column menu when you need to:
- **Sort from header** — Right-click column header to sort
- **Filter from header** — Quick filtering from column menu
- **Column grouping** — Group columns from menu
- **Custom operations** — Add domain-specific column actions
- **Column visibility** — Show/hide columns from menu
- **Column ordering** — Reorder columns via menu
- **Conditional menu items** — Show different options per column

## Table of Contents
- [Enable Column Menu](#enable-column-menu)
- [Built-in Menu Items](#built-in-menu-items)
- [Custom Menu Items](#custom-menu-items)
- [Menu Events](#menu-events)
- [Dynamic Menu Control](#dynamic-menu-control)

## Enable Column Menu

### Basic Column Menu

```typescript
import { Component } from '@angular/core';
import { ColumnMenuService, FilterService, SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [showColumnMenu]='true'
      [allowFiltering]='true'
      [allowSorting]='true'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID'></e-column>
        <e-column field='TaskName' headerText='Task Name'></e-column>
        <e-column field='Duration' headerText='Duration'></e-column>
        <e-column field='Priorty' headerText='Priority'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ColumnMenuService, FilterService, SortService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## Built-in Menu Items

### Auto-available Menu Items

```typescript
// When enabled, column menu shows:
- Sort Ascending
- Sort Descending
- Filter
- Filter bar (if filtering enabled)
- Column chooser (if column menu service injected)
- Autofit (resize column to content)
- Autofit All Columns
```

## Custom Menu Items

### Add Custom Menu Items

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [showColumnMenu]='true'
      [columnMenuItems]='menuItems'
      (columnMenuClick)='onColumnMenuClick($event)'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID'></e-column>
        <e-column field='TaskName' headerText='Task Name'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [ColumnMenuService, FilterService, SortService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];

  public menuItems = [
    'SortAscending',
    'SortDescending',
    { text: 'Export Column', id: 'exportcolumn' },
    { text: 'Copy Column', id: 'copycolumn' },
    'Filter'
  ];

  onColumnMenuClick(args: any): void {
    if (args.item.id === 'exportcolumn') {
      const fieldName = args.column.field;
      console.log('Exporting column:', fieldName);
      this.exportColumn(fieldName);
    } else if (args.item.id === 'copycolumn') {
      const fieldName = args.column.field;
      this.copyColumnData(fieldName);
    }
  }

  private exportColumn(fieldName: string): void {
    // Export logic
  }

  private copyColumnData(fieldName: string): void {
    // Copy logic
  }
}
```

## Menu Events

### Handle Column Menu Operations

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { ColumnMenuService, FilterService, SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [showColumnMenu]='true'
      [allowFiltering]='true'
      [allowSorting]='true'
      (columnMenuClick)='onMenuClick($event)'>
    </ejs-treegrid>
  `,
  providers: [ColumnMenuService, FilterService, SortService]
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  public data: Object[] = [];

  onMenuClick(args: any): void {
    const columnName = args.column.field;
    const menuItem = args.item.text;

    if (menuItem === 'Sort Ascending') {
      console.log(`Sorting ${columnName} ascending`);
    } else if (menuItem === 'Sort Descending') {
      console.log(`Sorting ${columnName} descending`);
    } else if (menuItem === 'Filter') {
      console.log(`Opening filter for ${columnName}`);
    }
  }
}
```

## Dynamic Menu Control

### Conditionally Show/Hide Menu Items

```typescript
import { Component } from '@angular/core';
import { ColumnMenuService, FilterService, SortService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [showColumnMenu]='true'
      [columnMenuItems]='getMenuItems.bind(this)'>
    </ejs-treegrid>
  `,
  providers: [ColumnMenuService, FilterService, SortService]
})
export class AppComponent {
  public data: Object[] = [];
  public userRole: string = 'viewer';  // admin, editor, viewer

  getMenuItems(column: any): string[] {
    const defaultItems = ['SortAscending', 'SortDescending', 'Filter'];
    
    if (this.userRole === 'admin') {
      return [...defaultItems, 'ColumnChooser'];
    } else if (this.userRole === 'editor') {
      return defaultItems;
    } else {
      return ['SortAscending', 'SortDescending'];  // Viewers can only sort
    }
  }
}
```

### Column-specific Menu Items

```typescript
public getMenuItems(column: any): string[] {
  const defaultItems = ['SortAscending', 'SortDescending'];
  
  // Only show filter for text columns
  if (column.type === 'text' || column.type === 'string') {
    defaultItems.push('Filter');
  }

  // Numbers can use numeric filters
  if (column.type === 'number') {
    defaultItems.push('Filter', { text: 'Statistical', id: 'stats' });
  }

  return defaultItems;
}
```
