# Sorting & Filtering

Sort and filter data ranges in the Spreadsheet Editor.

## Minimal Vue Code

```vue
<template>
<ejs-spreadsheet
  ref="spreadsheet"
  :allowSorting="true"
  :allowFiltering="true"
  :created="onCreated"
>
  <e-sheets>
    <e-sheet name="SalesData">
      <e-ranges>
        <e-range :dataSource="salesData" startCell="A1" />
      </e-ranges>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RangesDirective,
RangeDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-ranges": RangesDirective,
  "e-range": RangeDirective
},

data() {
  return {
    // === Sales DataSource (12 records) ===
    salesData: [
      { Product: "Laptop", Category: "Electronics", Price: 1200, Quantity: 5 },
      { Product: "Mouse", Category: "Accessories", Price: 25, Quantity: 20 },
      { Product: "Keyboard", Category: "Accessories", Price: 80, Quantity: 10 },
      { Product: "Monitor", Category: "Electronics", Price: 350, Quantity: 3 },
      { Product: "Tablet", Category: "Electronics", Price: 700, Quantity: 8 },
      { Product: "Chair", Category: "Furniture", Price: 150, Quantity: 12 },
      { Product: "Desk", Category: "Furniture", Price: 300, Quantity: 7 },
      { Product: "Phone", Category: "Electronics", Price: 999, Quantity: 6 },
      { Product: "Printer", Category: "Office", Price: 200, Quantity: 4 },
      { Product: "Scanner", Category: "Office", Price: 250, Quantity: 2 },
      { Product: "USB Cable", Category: "Accessories", Price: 10, Quantity: 40 },
      { Product: "Webcam", Category: "Electronics", Price: 85, Quantity: 9 }
    ]
  };
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;

    // === Sorting Examples ===

    // Sort ascending by Price
    spreadsheet.sort(
      { sortDescriptors: [{ field: "Price", order: "Ascending" }] },
      "A1:D100"
    );

    // Sort descending by Quantity
    spreadsheet.sort(
      { sortDescriptors: [{ field: "Quantity", order: "Descending" }] },
      "A1:D100"
    );

    // Multi-column sorting
    spreadsheet.sort(
      {
        sortDescriptors: [
          { field: "Category", order: "Ascending" },
          { field: "Price", order: "Descending" }
        ]
      },
      "A1:D100"
    );

    // === Filtering Examples ===

    // Case-insensitive filter by Category
    spreadsheet.applyFilter(
      [{ field: "Category", operator: "equal", value: "Electronics", matchCase: false }],
      "A1:D100"
    );

    // Case-sensitive filter (Product contains Laptop)
    spreadsheet.applyFilter(
      [{ field: "Product", operator: "contains", value: "Laptop", matchCase: true }],
      "A1:D100"
    );

    // Clear filters applied in range
    spreadsheet.clearFilter("A1:D100");
    
  }
}
};
</script>
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

- **Best Practice**: Always include header row in range (first row with column names)
- **Requirement**: Data must have headers matching field names for sorting/filtering to work
- **Sort Order**: Use `'Ascending'` (A→Z) or `'Descending'` (Z→A)
- **Filter Operators**: `'equal'`, `'notequal'`, `'contains'`, `'startswith'`, `'endswith'`, `'greaterthan'`, `'lessthan'`, `'greaterthanorequal'`, `'lessthanorequal'`
- **Multiple Filters**: Pass array of predicates to `applyFilter()` for AND logic
- **Clear vs Remove**: 
  - `clearFilter()` with range removes filter UI from that range
  - `removeFilter()` removes all filters from active sheet
- **Performance**: Filtering happens client-side; for large datasets (100k+ rows), consider server-side filtering
- **See Also**: For search operations, use [find-replace.md](./find-replace.md)

Note: Placeholders table already included in Minimal Code section above.
