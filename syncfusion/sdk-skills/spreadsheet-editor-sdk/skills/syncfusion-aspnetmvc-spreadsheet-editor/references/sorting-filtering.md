# Sorting & Filtering

Sort and filter data ranges in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    var salesData = new[] {
        new { Product = "Laptop", Category = "Electronics", Price = 1200, Quantity = 5, Supplier = "TechWorld" },
        new { Product = "Mouse", Category = "Electronics", Price = 25, Quantity = 20, Supplier = "GadgetHub" },
        new { Product = "Keyboard", Category = "Electronics", Price = 80, Quantity = 10, Supplier = "KeyMasters" },
        new { Product = "Chair", Category = "Furniture", Price = 150, Quantity = 7, Supplier = "FurniCo" },
        new { Product = "Desk", Category = "Furniture", Price = 300, Quantity = 3, Supplier = "OfficeLine" }
    };
}

@Html.EJS().Spreadsheet("spreadsheet").AllowSorting(true).AllowFiltering(true).Created("onCreated").Sheets(sheet =>
{
    sheet.Name("SalesData").Ranges(ranges =>
    {
        ranges.DataSource(salesData).Add();
    }).Add();
}).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

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
            { field: 'Your column index reference(A)', operator: 'contains', value: 'Laptop', matchCase: true }
        ], 'A1:E100');

        // Clear filters in a range
        spreadsheet.clearFilter('A1:E100');

        // Remove all filters in active sheet
        spreadsheet.removeFilter();
    }
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

- **Sort Order**: Use `'Ascending'` (A→Z) or `'Descending'` (Z→A)
- **Filter Operators**: `'equal'`, `'notequal'`, `'contains'`, `'startswith'`, `'endswith'`, `'greaterthan'`, `'lessthan'`, `'greaterthanorequal'`, `'lessthanorequal'`
- **Clear vs Remove**: 
  - `clearFilter()` with range removes filter collections.
  - `applyFilter()` removes all filters from active sheet if the sheet have filters. It will apply the filter, if there are no filters applied already.
- **See Also**: For search operations, use [find-replace.md](./find-replace.md)

Note: Placeholders table already included in Minimal Code section above.
