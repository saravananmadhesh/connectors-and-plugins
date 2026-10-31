# Scrolling & Virtualization API Reference

## Overview
Virtualization enables the Spreadsheet to efficiently handle large datasets (100k+ rows) by only rendering visible cells. This significantly improves performance and memory usage.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{

    var localData = new[] {
        new { Product = "Laptop", Category = "Electronics", Price = 1200, Quantity = 5, Total = "=C2*D2" },
        new { Product = "Mouse", Category = "Accessories", Price = 25, Quantity = 20, Total = "=C3*D3" },
        new { Product = "Keyboard", Category = "Accessories", Price = 80, Quantity = 10, Total = "=C4*D4" },
        new { Product = "Monitor", Category = "Electronics", Price = 350, Quantity = 3, Total = "=C5*D5" }
    };

    // enableVirtualization will be true and isFinite will be false by default.
    var scrollSettings = new Syncfusion.EJ2.Spreadsheet.SpreadsheetScrollSettings {
        IsFinite = false,
        EnableVirtualization = true
    };
}

@Html.EJS().Spreadsheet("spreadsheet").ScrollSettings(scrollSettings).Created("onCreated").Sheets(sheet =>
{
    sheet.Name("Sheet1").Ranges(ranges =>
    {
        ranges.DataSource(localData).Add();
    }).Add();
}).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        // To go to specific cell.
        spreadsheet.goTo('A5000');
    }
</script>
```

## Key Methods & Properties

### scrollSettings (Object)
Configuration object for scrolling behavior.

**Properties**:

#### isFinite (boolean)
- Default: `false`
- If `false`: Render the new cells upon scrolling.
- If `true`: Render the cells based on the row and column count. Able to scroll upto the rendered cells.

**Example**:

```cshtml
@{
    var scrollSettings = new Syncfusion.EJ2.Spreadsheet.SpreadsheetScrollSettings {
        IsFinite = true,
        EnableVirtualization = true
    };
}
@Html.EJS().Spreadsheet("spreadsheet")
    .ScrollSettings(scrollSettings)
    .Render()
```

#### enableVirtualization (boolean)
- Default: `true`
- If `true`: Initially renders cells within the viewport and further rendering the data while scrolling.
- If `false`: Render all the rows and columns at once.


### goTo(cellAddress)
Navigates to and scrolls the specified cell into view.

**Parameters**:
- `cellAddress` (string): Cell address in A1 notation (e.g., 'Z10000')

**Returns**: void

**Example**:
```cshtml
// Jump to specific cell in large dataset
spreadsheet.goTo('A500000');
spreadsheet.goTo('AA1000000');
spreadsheet.goTo('Sheet2!B50000');

```

## Use Cases

### Jump to Specific cell
```cshtml
const usedRange = spreadsheet.getActiveSheet().usedRange;
//Navigate to the last used row of A column.
spreadsheet.goTo(`A${usedRange.rowIndex + 1}`);
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Home | Move towards first column |
| Ctrl+End | Jump to last used cell |
| Page Up | Scroll up one page |
| Page Down | Scroll down one page |
| Ctrl+Up | Jump to top of data |
| Ctrl+Down | Jump to bottom of data |
| Ctrl+Left | Jump to leftmost data |
| Ctrl+Right | Jump to rightmost data |


## See Also
- [Frozen Rows/Columns](./freeze-panes.md) - Combine with virtualization
- [Data Binding](./data-binding.md) - Remote data for best performance
- [Print](./print.md) - Print virtualized data
