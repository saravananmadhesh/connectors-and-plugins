# Filtering & Searching in Syncfusion Gantt Chart

## Table of Contents
- [Basic Filtering](#basic-filtering)
- [Filter Hierarchy Modes](#filter-hierarchy-modes)
- [Filter Menu](#filter-menu)
- [Excel-Like Filter](#excel-like-filter)
- [Initial Filter](#initial-filter)
- [Filter Operators](#filter-operators)
- [Programmatic Filtering](#programmatic-filtering)
- [Searching](#searching)

## Basic Filtering

**Module required**: `Filter`

```typescript
import { Gantt, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Filter);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: { id: 'TaskID', name: 'TaskName', startDate: 'StartDate', duration: 'Duration', progress: 'Progress', parentID: 'ParentID' },
    allowFiltering: true
});
gantt.appendTo('#Gantt');
```

> Disable filtering for a specific column by setting `columns.allowFiltering: false`.

---

## Filter Hierarchy Modes

Control which related records display alongside filtered results:

| Mode | Description |
|------|-------------|
| `'Parent'` | Show filtered records + their parents (default) |
| `'Child'` | Show filtered records + their children |
| `'Both'` | Show filtered records + parents + children |
| `'None'` | Show only filtered records |

```typescript
filterSettings: {
    hierarchyMode: 'Both'   // 'Parent' | 'Child' | 'Both' | 'None'
}

// Change hierarchy mode dynamically:
gantt.filterSettings.hierarchyMode = 'None';
gantt.clearFiltering();
```

---

## Filter Menu

Show a filter menu popup on each column header:

```typescript
import { Gantt, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Filter);

let gantt: Gantt = new Gantt({
    allowFiltering: true,
    filterSettings: {
        type: 'Menu'    // renders filter menu
    }
});
```

### Custom Filter Component

Use `column.filter.ui` to replace the default filter input:

```typescript
columns: [{
    field: 'TaskName',
    filter: {
        ui: {
            create: (args) => {
                // create custom element
                let elem = document.createElement('input');
                args.target.appendChild(elem);
            },
            write: (args) => {
                // wire events and set current value
            },
            read: (args) => {
                // return filter value
                args.fltrObj.filterByColumn(args.column.field, args.operator, currentValue);
            }
        }
    }
}]
```

---

## Excel-Like Filter

The Excel-like filter provides a checklist and condition-based UI per column. Requires `filterSettings.type: 'Excel'`:

```typescript
import { Gantt, Filter } from '@syncfusion/ej2-gantt';

Gantt.Inject(Filter);

let gantt: Gantt = new Gantt({
    allowFiltering: true,
    filterSettings: {
        type: 'Excel'
    }
});
```

---

## Initial Filter

Apply filter conditions on render using `filterSettings.columns` predicates:

```typescript
filterSettings: {
    columns: [
        { field: 'TaskName', matchCase: false, operator: 'startswith', predicate: 'and', value: 'Identify' },
        { field: 'TaskID', matchCase: false, operator: 'equal', predicate: 'and', value: 2 }
    ]
}
```

---

## Filter Operators

| Operator | Types |
|----------|-------|
| `startswith` | String |
| `endswith` | String |
| `contains` | String |
| `equal` | String, Number, Boolean, Date |
| `notequal` | String, Number, Boolean, Date |
| `greaterthan` | Number, Date |
| `greaterthanorequal` | Number, Date |
| `lessthan` | Number, Date |
| `lessthanorequal` | Number, Date |

> Default operator is `equal`.

**Diacritics support**: Set `filterSettings.ignoreAccent: true` to include accent characters in string matching.

---

## Programmatic Filtering

```typescript
// Filter a column
gantt.filterByColumn('TaskName', 'startswith', 'Iden');

// Clear all filters
gantt.clearFiltering();
```

---

## Searching

Toolbar search box filters across all or specified columns.

**Modules required**: `Filter`, `Toolbar`

```typescript
import { Gantt, Filter, Toolbar } from '@syncfusion/ej2-gantt';

Gantt.Inject(Filter, Toolbar);

let gantt: Gantt = new Gantt({
    toolbar: ['Search'],    // show search box in toolbar
    searchSettings: {
        fields: ['TaskName'],       // search in specific fields (default: all)
        operator: 'contains',       // search operator
        key: 'List',                // initial search value
        ignoreCase: true            // case-insensitive
    }
});

// Programmatic search
gantt.search('Identify');
```

**Search operators**: Same as filter operators — `contains`, `startswith`, `endswith`, `equal`, `notequal`.
