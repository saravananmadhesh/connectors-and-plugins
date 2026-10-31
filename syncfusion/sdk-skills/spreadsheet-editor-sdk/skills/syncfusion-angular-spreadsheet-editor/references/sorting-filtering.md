# Sorting & Filtering

Sort and filter data ranges using `sort()`, `applyFilter()`, and `clearFilter()`.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent, SortOptions, BeforeSortEventArgs, SortEventArgs, PredicateModel } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet
    [allowSorting]="true"
    [allowFiltering]="true"
    (beforeSort)="onBeforeSort($event)"
    (sortComplete)="onSortComplete($event)">
    <e-sheets>
      <e-sheet name="SalesData">
        <e-ranges>
          <e-range [dataSource]="data"></e-range>
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  data: object[] = [
    { Product: 'Laptop',   Category: 'Electronics', Price: 1200, Quantity: 5  },
    { Product: 'Mouse',    Category: 'Electronics', Price: 25,   Quantity: 20 },
    { Product: 'Keyboard', Category: 'Accessories', Price: 80,   Quantity: 10 }
  ];

  // Sort ascending
  sortAscending(): void {
    this.spreadsheet.sort(
      { sortDescriptors: [{ field: 'Price', order: 'Ascending' }] },
      'A1:D4'
    );
  }

  // Sort descending
  sortDescending(): void {
    this.spreadsheet.sort(
      { sortDescriptors: [{ field: 'Quantity', order: 'Descending' }] },
      'A1:D4'
    );
  }

  // Multi-column sort
  sortMulti(): void {
    this.spreadsheet.sort({
      containsHeader: true,
      sortDescriptors: [
        { field: 'Category', order: 'Ascending'  },
        { field: 'Price',    order: 'Descending' }
      ]
    }, 'A1:D4');
  }

  // Apply single filter
  filterSingle(): void {
    this.spreadsheet.applyFilter([
      { field: 'Category', operator: 'equal', value: 'Electronics', matchCase: false }
    ], 'A1:D4');
  }

  // Apply multiple filters (AND logic)
  filterMultiple(): void {
    this.spreadsheet.applyFilter([
      { field: 'Category', operator: 'equal',     value: 'Electronics' },
      { field: 'Price',    operator: 'lessthan',  value: '1000'        }
    ], 'A1:D4');
  }

  // Clear filter on specific field
  clearField(): void {
    this.spreadsheet.clearFilter('Category');
  }

  // Clear all filters
  clearAll(): void {
    this.spreadsheet.clearFilter();
  }

  // Fires before sort — cancel to block
  onBeforeSort(args: BeforeSortEventArgs): void {
    console.log('Sort range:', args.range);
    // args.cancel = true;
  }

  // Fires after sort completes
  onSortComplete(args: SortEventArgs): void {
    console.log('Sort done:', args.sortOptions);
  }
}
```

## API Reference

### sort(sortOptions?, range?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `sortOptions` | `SortOptions` | Sort configuration | `{ sortDescriptors: [...] }` |
| `range` | `string` | Cell range to sort | `'A1:D100'` |

### SortOptions

| Property | Type | Default | Description |
|---|---|---|---|
| `sortDescriptors` | `SortDescriptor[]` | `[]` | Array of sort conditions |
| `containsHeader` | `boolean` | `true` | Whether range includes a header row |

### SortDescriptor

| Property | Type | Default | Description |
|---|---|---|---|
| `field` | `string` | — | Column name to sort by |
| `order` | `'Ascending' \| 'Descending'` | `'Ascending'` | Sort direction |
| `caseSensitive` | `boolean` | `false` | Case-sensitive string comparison |

### applyFilter(predicates?, range?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `predicates` | `PredicateModel[]` | Array of filter conditions | `[{ field: 'Price', operator: 'lessthan', value: '1000' }]` |
| `range` | `string` | Cell range to filter | `'A1:D100'` |

### PredicateModel

| Property | Type | Default | Description |
|---|---|---|---|
| `field` | `string` | — | Column name to filter |
| `operator` | `string` | — | Filter condition |
| `value` | `string` | — | Value to match |
| `matchCase` | `boolean` | `false` | Case-sensitive match |

### Supported Operators

| Operator | Description |
|---|---|
| `equal` | Exact match |
| `notequal` | Not equal |
| `contains` | Contains value |
| `startswith` | Starts with value |
| `endswith` | Ends with value |
| `greaterthan` | Greater than |
| `lessthan` | Less than |
| `greaterthanorequal` | Greater than or equal |
| `lessthanorequal` | Less than or equal |

### clearFilter(field?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `field` | `string` | Column name; omit to clear all | `'Category'` |

### Events

| Event | Argument | Description |
|---|---|---|
| `(beforeSort)` | `args.range`, `args.sortOptions`, `args.cancel` | Fires before sort — set `args.cancel = true` to block |
| `(sortComplete)` | `args.range`, `args.sortOptions` | Fires after sort completes |

## Notes

- `[allowSorting]="true"` and `[allowFiltering]="true"` must be set at initialization
- Range must include the header row when `containsHeader: true`
- Multi-column sort — first descriptor has highest priority
- Multiple predicates in `applyFilter()` apply as **AND** logic
- `clearFilter()` with no argument removes all filters from the active sheet