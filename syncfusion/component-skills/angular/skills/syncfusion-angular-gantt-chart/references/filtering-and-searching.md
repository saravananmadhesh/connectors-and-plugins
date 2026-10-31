# Filtering and Searching in Angular Gantt Chart

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Initial Filter on Load](#initial-filter-on-load)
- [Filter Operators](#filter-operators)
- [Hierarchy Filtering Modes](#hierarchy-filtering-modes)
- [Excel-Like Filter](#excel-like-filter)
- [Filter Menu Customization](#filter-menu-customization)
- [Searching via Toolbar](#searching-via-toolbar)
- [Programmatic Filter and Clear](#programmatic-filter-and-clear)

---

## Enable Filtering

Set `allowFiltering: true` and inject `FilterService`:

```typescript
@Component({
  providers: [FilterService],
  template: `<ejs-gantt [allowFiltering]="true"></ejs-gantt>`
})
```

Filtering icons appear in column headers. Clicking opens a filter dropdown for each column. To disable filtering for a specific column:

```typescript
{ field: 'TaskID', allowFiltering: false }
```

---

## Initial Filter on Load

Pre-apply filters when the Gantt loads using `filterSettings.columns`:

```typescript
public filterSettings: object = {
  columns: [
    {
      field: 'TaskName',
      operator: 'startswith',
      value: 'Design',
      predicate: 'and'    // 'and' | 'or'
    },
    {
      field: 'Progress',
      operator: 'greaterthan',
      value: 50,
      predicate: 'and'
    }
  ]
};
```

```html
<ejs-gantt [filterSettings]="filterSettings"></ejs-gantt>
```

---

## Filter Operators

| Operator | Applies To |
|----------|-----------|
| `startswith` | String |
| `endswith` | String |
| `contains` | String |
| `equal` | String, Number, Boolean, Date |
| `notequal` | String, Number, Boolean, Date |
| `greaterthan` | Number, Date |
| `greaterthanorequal` | Number, Date |
| `lessthan` | Number, Date |
| `lessthanorequal` | Number, Date |

Default operator is `equal`.

---

## Hierarchy Filtering Modes

Control how parent/child tasks are shown when filtering:

```typescript
public filterSettings: object = {
  hierarchyMode: 'Parent'   // 'Parent' | 'Child' | 'Both' | 'None'
};
```

| Mode | Behavior |
|------|----------|
| `'Parent'` | Shows matching rows AND their parent ancestors |
| `'Child'` | Shows matching rows AND all their children |
| `'Both'` | Shows matching rows, their parents, and their children |
| `'None'` | Shows only exact matching rows (no hierarchy context) |

---

## Excel-Like Filter

Enable Excel-style filter UI with checkboxes for each unique value:

```typescript
public filterSettings: object = {
  type: 'Excel'   // 'Menu' (default) | 'Excel'
};
```

```html
<ejs-gantt [filterSettings]="filterSettings"></ejs-gantt>
```

Excel filter shows a checklist of unique values per column plus a search box for quick filtering, similar to Microsoft Excel's auto-filter.

---

## Filter Menu Customization

Configure what appears in the filter dropdown per column type:

```typescript
public filterSettings: object = {
  type: 'Menu',
  operators: {
    stringOperator: [
      { value: 'startswith', text: 'Starts With' },
      { value: 'contains', text: 'Contains' }
    ],
    numberOperator: [
      { value: 'equal', text: 'Equal' },
      { value: 'greaterthan', text: 'Greater Than' }
    ]
  }
};
```

---

## Searching via Toolbar

Add `'Search'` to the toolbar to show a search input:

```typescript
public toolbar: string[] = ['Search'];
public searchSettings: object = {
  fields: ['TaskName', 'TaskID'],  // Columns to search in (default: all)
  operator: 'contains',            // Search operator
  key: '',                         // Initial search value
  ignoreCase: true                 // Case-insensitive search
};
```

```html
<ejs-gantt [toolbar]="toolbar" [searchSettings]="searchSettings"></ejs-gantt>
```

Search filters across all visible rows including children of collapsed parents.

---

## Programmatic Filter and Clear

```typescript
// Filter by field
this.ganttObj.filterByColumn('TaskName', 'startswith', 'Design');

// Filter multiple columns
this.ganttObj.filterByColumn('Progress', 'greaterthan', 50);

// Clear all filters
this.ganttObj.clearFiltering();

// Clear filter for one column
this.ganttObj.clearFiltering(['TaskName']);

// Trigger search programmatically
this.ganttObj.search('Design');
```

Access the Gantt instance via `@ViewChild('gantt') ganttObj: GanttComponent`.
