# Sorting & Filtering

Sort and filter data ranges in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current;
      // === Sorting ===
      // Sort ascending by a column
      spreadsheet.sort({ sortDescriptors: [{ field: 'Price', order: 'Ascending' }] }, 'A1:E100');

      // Sort descending by a column
      spreadsheet.sort({ sortDescriptors: [{ field: 'Quantity', order: 'Descending' }] }, 'A1:E100');

      // Multi-column sort
      spreadsheet.sort({
        sortDescriptors: [
          { field: 'Category', order: 'Ascending' },
          { field: 'Price', order: 'Descending' }
        ]
      }, 'A1:E100');

      // === Filtering ===
      // Apply filter with case-insensitive match
      spreadsheet.applyFilter([
        { field: 'Category', operator: 'equal', value: 'Electronics', matchCase: false }
      ], 'A1:E100');

      // Apply filter with case-sensitive match
      spreadsheet.applyFilter([
        { field: 'Product', operator: 'contains', value: 'Laptop', matchCase: true }
      ], 'A1:E100');

      // Clear filters in a range
      spreadsheet.clearFilter('A1:E100');

      // Calling the applyFilter method will apply the filter if it was not applied already. Otherwise, it will remove the filter if applied already.
      spreadsheet.applyFilter();
    };

    return (<SpreadsheetComponent ref={spreadsheetRef} allowSorting={true} allowFiltering={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="SalesData">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FIELD]` | Column name from data source | `'Price'`, `'Category'`, `'Product'` |
| `[ORDER]` | Sort direction | `'Ascending'` or `'Descending'` |
| `[OPERATOR]` | Filter condition | `'equal'`, `'contains'`, `'startswith'`, `'endswith'`, `'greaterthan'`, `'lessthan'` |
| `[VALUE]` | Filter value to match | `'Electronics'`, `'Laptop'`, `100` |
| `[RANGE]` | Cell range with headers | `'A1:E100'` (include header row) |
| `[MATCH_CASE]` | Case sensitivity flag | `true` or `false` |

## Notes

- **Sort Order**: Use `'Ascending'` (A→Z) or `'Descending'` (Z→A)
- **Filter Operators**: `'equal'`, `'notequal'`, `'contains'`, `'startswith'`, `'endswith'`, `'greaterthan'`, `'lessthan'`, `'greaterthanorequal'`, `'lessthanorequal'`
- **Clear vs Remove**: 
  - `clearFilter()` with range removes filter collections.
  - `applyFilter()` removes all filters from active sheet if the sheet have filters. It will apply the filter, if there are no filters applied already.
- **See Also**: For search operations, use [find-replace.md](./find-replace.md)

Note: Placeholders table already included in Minimal Code section above.
