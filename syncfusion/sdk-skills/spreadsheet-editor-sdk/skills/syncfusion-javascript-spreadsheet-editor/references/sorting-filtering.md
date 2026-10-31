# Sorting & Filtering

Sort and filter data ranges in the Spreadsheet Editor.

## Table of Contents

- [Minimal Code](#minimal-code)
- [API](#api)
  - [sort](#sortsortoptions-range)
  - [SortOptions](#sortoptions-1)
  - [SortDescriptor](#sortdescriptor)
  - [applyFilter](#applyfilterpredicates-range)
  - [clearFilter](#clearfilterfield)
  - [PredicateModel](#predicatemodel)
- [Events](#events)
  - [beforeSort](#beforesort-event)
  - [sortComplete](#sortcomplete-event)
- [Notes](#notes)

## Minimal Code

```typescript
import { Spreadsheet, SortOptions, PredicateModel, BeforeSortEventArgs, SortEventArgs } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  allowSorting: true,
  allowFiltering: true,
  sheets: [{ name: 'SalesData' }],

  // Fires before sort — cancel to block
  beforeSort: (args: BeforeSortEventArgs): void => {
    console.log('Sort range:', args.range);
    // args.cancel = true; // block sort
  },

  // Fires after sort completes
  sortComplete: (args: SortEventArgs): void => {
    console.log('Sort done:', args.sortOptions);
  }
});
spreadsheet.appendTo('#spreadsheet');

// === Sorting ===

// Sort ascending by column
spreadsheet.sort({ sortDescriptors: [{ field: 'Price', order: 'Ascending' }] }, 'A1:E100');

// Sort descending by column
spreadsheet.sort({ sortDescriptors: [{ field: 'Quantity', order: 'Descending' }] }, 'A1:E100');

// Sort case-sensitive
spreadsheet.sort({
  sortDescriptors: [{ field: 'Product', order: 'Ascending', caseSensitive: true }]
}, 'A1:E100');

// Multi-column sort
spreadsheet.sort({
  containsHeader: true,
  sortDescriptors: [
    { field: 'Category', order: 'Ascending' },
    { field: 'Price', order: 'Descending' }
  ]
}, 'A1:E100');

// === Filtering ===

// Apply single filter
spreadsheet.applyFilter([
  { field: 'Category', operator: 'equal', value: 'Electronics', matchCase: false }
], 'A1:E100');

// Apply filter — contains operator
spreadsheet.applyFilter([
  { field: 'Product', operator: 'contains', value: 'Laptop', matchCase: true }
], 'A1:E100');

// Apply multiple filters (AND logic)
spreadsheet.applyFilter([
  { field: 'Category', operator: 'equal', value: 'Electronics' },
  { field: 'Price', operator: 'lessthan', value: '1000' }
], 'A1:E100');

// Clear filter on a specific field
spreadsheet.clearFilter('Category');

// Clear all filters
spreadsheet.clearFilter();
```

## API

### `sort(sortOptions?, range?)`

| Parameter | Type | Description |
|---|---|---|
| `sortOptions` | `SortOptions` | Sort configuration |
| `range` | `string` | Cell range to sort e.g. `'A1:E100'` |

### `SortOptions`

| Property | Type | Default | Description |
|---|---|---|---|
| `sortDescriptors` | `SortDescriptor[]` | `[]` | Array of sort conditions |
| `containsHeader` | `boolean` | `true` | Whether the range includes a header row |

### `SortDescriptor`

| Property | Type | Default | Description |
|---|---|---|---|
| `field` | `string` | — | Column name to sort by |
| `order` | `'Ascending' \| 'Descending'` | `'Ascending'` | Sort direction |
| `caseSensitive` | `boolean` | `false` | Case-sensitive string comparison |

### `applyFilter(predicates?, range?)`

| Parameter | Type | Description |
|---|---|---|
| `predicates` | `PredicateModel[]` | Array of filter conditions |
| `range` | `string` | Cell range to filter e.g. `'A1:E100'` |

### `clearFilter(field?)`

| Parameter | Type | Description |
|---|---|---|
| `field` | `string` | Column name to clear; omit to clear all filters |

### `PredicateModel`

| Property | Type | Default | Description |
|---|---|---|---|
| `field` | `string` | — | Column name to filter |
| `operator` | `string` | — | Filter condition — see operators below |
| `value` | `string` | — | Value to match |
| `matchCase` | `boolean` | `false` | Case-sensitive match |

**Supported operators:**

| Operator | Description |
|---|---|
| `equal` | Exact match |
| `notequal` | Not equal |
| `contains` | Contains value |
| `startswith` | Starts with value |
| `endswith` | Ends with value |
| `greaterthan` | Greater than value |
| `lessthan` | Less than value |
| `greaterthanorequal` | Greater than or equal |
| `lessthanorequal` | Less than or equal |

## Events

### `beforeSort` Event

Fires **before** sort starts. Set `args.cancel = true` to block.

| Argument | Type | Description |
|---|---|---|
| `range` | `string` | Range about to be sorted |
| `sortOptions` | `SortOptions` | Sort configuration |
| `cancel` | `boolean` | Set `true` to block the sort |

### `sortComplete` Event

Fires **after** sort completes.

| Argument | Type | Description |
|---|---|---|
| `range` | `string` | Range that was sorted |
| `sortOptions` | `SortOptions` | Sort configuration applied |

## Notes

- `allowSorting: true` must be set on the Spreadsheet to enable sorting
- `allowFiltering: true` must be set on the Spreadsheet to enable filtering
- Range must include the header row when `containsHeader: true`
- Multi-column sort applies descriptors in array order — first descriptor has highest priority
- Multiple predicates in `applyFilter()` apply as **AND** logic
- `clearFilter()` with no argument removes all filters from the active sheet