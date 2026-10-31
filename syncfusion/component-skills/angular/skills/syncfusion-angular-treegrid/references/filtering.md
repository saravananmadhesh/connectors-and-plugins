---
name: Filtering
description: 'Filtering in Syncfusion Angular TreeGrid - filter bar mode, filter menu mode, excel-like filtering, custom filters, and filter predicates.'
---

# Filtering

Filtering enables users to find specific records based on column values using multiple filter modes.

## When to Use

Use filtering when you need to:
- **Enable data search** — Allow users to find records matching specific criteria
- **Filter by column values** — Provide filter UI for individual columns
- **Excel-like filtering** — Show checkboxes for filtering by multiple values
- **Custom filter expressions** — Create complex filters combining multiple conditions
- **Server-side filtering** — Filter data on the backend for large datasets
- **Dynamic filtering** — Apply filters programmatically based on user interactions
- **Hierarchical filtering** — Filter parent and child records simultaneously

## Table of Contents
- [Basic Filtering](#basic-filtering)
- [Filter Modes](#filter-modes)
- [Custom Filters](#custom-filters)
- [Filter Events](#filter-events)

## Basic Filtering

### Enable Filtering

```typescript
import { Component } from '@angular/core';
import { FilterService } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [allowFiltering]='true'
      [filterSettings]='filterSettings'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90' type='number'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
        <e-column field='Status' headerText='Status' width='100'></e-column>
      </e-columns>
    </ejs-treegrid>
  `,
  providers: [FilterService]
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
  
  public filterSettings = {
    type: 'FilterBar'
  };
}
```

## Filter Modes

### Filter Bar

Users type in the filter row:

```typescript
public filterSettings = {
  type: 'FilterBar'
};
```

### Filter Menu

Dropdown with filter options:

```typescript
public filterSettings = {
  type: 'Menu'
};
```

### Excel-like Filter

Excel-style filtering interface:

```typescript
public filterSettings = {
  type: 'Excel'
};
```

### Checkbox Filter

Checkbox filtering interface:

```typescript
public filterSettings = {
  type: 'Checkbox'
};
```

## Custom Filters

### Programmatic Filtering

```typescript
  this.treegrid.filterByColumn('Progress', 'greaterthan', 50);
```

### Clear Filters

```typescript
  this.treegrid.clearFiltering();
```

### Custom Filter Template

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [allowFiltering]='true'>
  <e-columns>
    <e-column field='Status' 
      headerText='Status' 
      width='120'>
        <ng-template #filterTemplate let-data>
          <select style="width: 100%;">
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="InProgress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </ng-template>
    </e-column>
  </e-columns>
</ejs-treegrid>


```

### Predicate-based Filtering

```typescript
import { Predicate } from '@syncfusion/ej2-data';

filterWithPredicates() {
  const predicate1 = new Predicate('Status', 'equal', 'Completed');
  const predicate2 = new Predicate('Priority', 'equal', 'High');
  const finalPredicate = predicate1.or(predicate2);
  
  this.treegrid.filterByColumn(finalPredicate);
}
```

### Date Range Filter

```typescript
let startDate: string = new Date('2026-01-01');
let endDate: string = new Date('2026-01-05');

const predicate1 = new Predicate('TaskDate', 'greaterthanorequal', this.startDate);
const predicate2 = new Predicate('TaskDate', 'lessthanorequal', this.endDate);
const finalPredicate = predicate1.and(predicate2);

this.treegrid.filterByColumn(finalPredicate);

```

## Filter Events

### Before Filter

```typescript
<ejs-treegrid 
  (actionBegin)='onActionBegin($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onActionBegin(args: any) {
  if (args.requestType === 'filtering') {
    console.log('Filtering started:', args.filterModel);
  }
}
```

### After Filter

```typescript
<ejs-treegrid 
  (actionComplete)='onActionComplete($event)'>
  <!-- columns -->
</ejs-treegrid>
```

```typescript
onActionComplete(args: any) {
  if (args.requestType === 'filtering') {
    console.log('Records Filtered');
  }
}
```

### Prevent Filter

```typescript
onActionBegin(args: any) {
  if (args.requestType === 'filtering' && args.column?.field === 'SecureField') {
    args.cancel = true;  // Prevent filtering on secure field
  }
}
```S