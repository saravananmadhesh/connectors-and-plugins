---
name: filter-operators
description: 'Filter operators and conditions in Syncfusion Grid: operators, LIKE, case sensitivity, diacritics.'
---

# Filter Operators and Conditions

## Table of Contents
- [Filter Operators](#filter-operators)
- [Initial Filters](#initial-filters)
- [Wildcard and LIKE Filters](#wildcard-and-like-filters)
- [Case Sensitivity](#case-sensitivity)
- [Diacritics Filter](#diacritics-filter)

## When to Use This Reference

- Reference all available filter operators and syntax
- Implement custom filter logic for different data types
- Configure operator-specific filter behavior
- Filter by text, numbers, dates, or custom conditions
- Create advanced filter predicates and expressions

---

## Filter Operators

Grid supports 21+ operators for different data types. Set via `operator` property in `filterSettings.columns` or `filterByColumn()` method.

### Complete Operators Table

| Operator | Type | Example | Data Types |
|----------|------|---------|-----------|
| `startsWith` | String | Field starts with "A" | String |
| `endsWith` | String | Field ends with ".com" | String |
| `contains` | String | Field contains "test" | String |
| `doesnotstartwith` | String | NOT starts with | String |
| `doesnotendwith` | String | NOT ends with | String |
| `doesnotcontain` | String | NOT contains | String |
| `equal` | All | Exactly equals value | String, Number, Boolean, Date |
| `notequal` | All | Does NOT equal value | String, Number, Boolean, Date |
| `greaterthan` | Number/Date | Value > specified | Number, Date |
| `greaterthanorequal` | Number/Date | Value ≥ specified | Number, Date |
| `lessthan` | Number/Date | Value < specified | Number, Date |
| `lessthanorequal` | Number/Date | Value ≤ specified | Number, Date |
| `isnull` | All | Value IS null | String, Number, Date |
| `isnotnull` | All | Value IS NOT null | String, Number, Date |
| `isempty` | String | Value IS empty string | String |
| `isnotempty` | String | Value IS NOT empty | String |
| `between` | Number/Date | Within range start-end | Number, Date |
| `in` | All | Matches any in list | String, Number, Date |
| `notin` | All | NOT in list | String, Number, Date |

**Default Operators by Type:**
- String columns: `startswith`
- Numeric columns: `equal`
- Boolean columns: `equal`
- Date columns: `equal`

### Using Filter Operators

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
    { field: 'OrderDate', headerText: 'Order Date', width: 100 }
  ],
  allowFiltering: true
});

grid.appendTo('#grid');

// Method 1: Via filterByColumn (programmatic)
grid.filterByColumn('Freight', 'greaterthan', 100);
grid.filterByColumn('CustomerID', 'startswith', 'VIN');
grid.filterByColumn('OrderDate', 'between', [new Date(2023, 0, 1), new Date(2023, 11, 31)]);

// Method 2: Via filterSettings (initial)
grid.filterSettings = {
  columns: [
    { field: 'Freight', operator: 'greaterthan', value: 100 },
    { field: 'CustomerID', operator: 'startswith', value: 'VIN', matchCase: false }
  ]
};
```

---

## Initial Filters

Apply filters automatically when Grid loads using `filterSettings.columns` array.

### Single Column with Multiple Values (OR logic)

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    type: 'Excel',
    columns: [
      {
        field: 'CustomerID',
        matchCase: false,
        operator: 'startswith',
        predicate: 'or',
        value: 'VINET'
      },
      {
        field: 'CustomerID',
        matchCase: false,
        operator: 'startswith',
        predicate: 'or',
        value: 'HANAR'
      }
    ]
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
  ]
});

grid.appendTo('#grid');
```

Shows only records where CustomerID starts with "VINET" OR "HANAR".

### Multiple Columns (AND logic)

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    columns: [
      {
        field: 'ShipCity',
        matchCase: false,
        operator: 'startswith',
        predicate: 'and',
        value: 'reims'
      },
      {
        field: 'ShipName',
        matchCase: false,
        operator: 'startswith',
        predicate: 'and',
        value: 'Vins et alcools'
      }
    ]
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'ShipCity', headerText: 'Ship City', width: 120 },
    { field: 'ShipName', headerText: 'Ship Name', width: 120 }
  ]
});

grid.appendTo('#grid');
```

Shows only records where ShipCity starts with "reims" AND ShipName starts with "Vins et alcools".

---

## Wildcard and LIKE Filters

### Wildcard Filter (asterisk *)

Pattern matching on string columns using `*` symbol.

| Pattern | Matches |
|---------|---------|
| `a*b` | Starts with "a", ends with "b" |
| `a*` | Starts with "a" |
| `*b` | Ends with "b" |
| `*a*` | Contains "a" anywhere |
| `ab*` | Starts with "ab", followed by anything |

### LIKE Filter (percent %)

Similar to SQL LIKE operator, works in Filter Menu and Filter Bar.

| Pattern | Matches |
|---------|---------|
| `%ab%` | Contains "ab" |
| `ab%` | Ends with "ab" |
| `%ab` | Starts with "ab" |

```ts
const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    type: 'FilterBar',
    columns: [
      { field: 'CustomerID', operator: 'like', value: '%VIN%' }
    ]
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
  ]
});

grid.appendTo('#grid');
```

---

## Case Sensitivity

Control whether filtering considers letter case via `enableCaseSensitivity` property in `filterSettings`.

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    enableCaseSensitivity: false  // Case-insensitive (default)
  },
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
    { field: 'CustomerID', headerText: 'Customer ID', width: 100 },
    { field: 'ShipCountry', headerText: 'Ship Country', width: 100 }
  ]
});

grid.appendTo('#grid');

// Toggle case sensitivity programmatically
const button = document.getElementById('caseSensitiveToggle');
button.addEventListener('click', (e: any) => {
  grid.filterSettings.enableCaseSensitivity = e.target.checked;
});
```

---

## Diacritics Filter

Handle accented characters (é, ñ, ü, ç) in filtering. Enable via `ignoreAccent: true` to treat accented and non-accented versions as equivalent.

```ts
import { Grid, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Filter);

const grid = new Grid({
  dataSource: data,
  allowFiltering: true,
  filterSettings: {
    ignoreAccent: true  // "José" matches "Jose"
  },
  columns: [
    { field: 'EmployeeID', headerText: 'Employee ID', width: 140, textAlign: 'Right' },
    { field: 'Name', headerText: 'Name', width: 140 },
    { field: 'ShipName', headerText: 'Ship Name', width: 170, textAlign: 'Right' }
  ]
});

grid.appendTo('#grid');
```

**Use Cases:**
- International names (José, François, Müller)
- Search should match with/without accents
- User enters "Jose" but data has "José"
