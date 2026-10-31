# Cell Editing

Edit cell values, start/end edit mode, and update cells programmatically in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").AllowEditing(true).Created("onCreated").CellEdit("cellEditHandler").Sheets(sheet =>
    {
        sheet.Name("Data")
            .Rows(rows =>
            {
                // Header Row
                rows.Cells(cells =>
                {
                    cells.Value("Name").Add();
                    cells.Value("Price").Add();
                }).Add();

                // Data Row
                rows.Cells(cells =>
                {
                    cells.Value("Widget").Add();
                    cells.Value("100").Add();
                }).Add();
            }).Add();
    }).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Start Edit Mode (activate cell for editing) ===
        spreadsheet.startEdit();

        // === End Edit Mode (save changes and exit edit) ===
        spreadsheet.endEdit();

        // === Close Edit Mode (alternative method) ===
        spreadsheet.closeEdit();

        // === Update Cell Value ===
        spreadsheet.updateCell({ value: 'New Value' }, 'A2');
        spreadsheet.updateCell({ value: 150 }, 'B2');

        // === Update Cell with Formula ===
        spreadsheet.updateCell({ value: '=SUM(B2:B10)' }, 'B11');

        // === Update Multiple Cells ===
        spreadsheet.updateCell({ value: 'Updated' }, 'A2:A5');

        // === Update Cell with Formatting ===
        spreadsheet.updateCell(
            {
                value: 'Formatted',
                style: {
                    fontWeight: 'bold',
                    color: '#FF0000',
                    backgroundColor: '#FFFF00'
                }
            },
            'C2'
        );

        // === Get Active Cell Address ===
        var activeCell = spreadsheet.getActiveSheet().activeCell;
        console.log("Active Cell:", activeCell);
    }

    function cellEditHandler(args) {
        if (args.address === 'A1') {
            // Cancel editing on cell A1
            args.cancel = true;
        }
    }
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[VALUE]` | Cell value or formula | `'New Value'`, `100`, `'=SUM(A1:A5)'` |
| `[CELL]` | Target cell address | `'A1'`, `'B2'`, `'A2:A5'` |
| `[STYLE]` | Cell formatting object | `{ fontWeight: 'bold', color: '#FF0000' }` |
| `[MODE]` | Edit mode flag | `true`, `false` |

## API Methods Reference

### Start Edit Mode
```cshtml
spreadsheet.startEdit();                    // Start on active cell with current value
```

**Effect**: Activates edit mode on the current/active cell, allowing user text input.

### End Edit Mode
```cshtml
spreadsheet.endEdit();                      // Save changes and exit edit mode
```

**Effect**: Closes edit mode, validates input, applies to cell.

### Close Edit Mode
```cshtml
spreadsheet.closeEdit();                    // Close the edit cell
```

**Effect**: Closes the currently active edit cell, similar to `endEdit()`.

### Update Cell
```cshtml
spreadsheet.updateCell(
  { value: '[VALUE]', style?: {...} },
  '[CELL]'
);
```

**Effect**: Directly updates cell value and optional formatting without entering edit mode.

### Get Active Cell
```cshtml
var activeCell = spreadsheet.getActiveSheet().activeCell;
// Returns: Address of currently selected cell (e.g., 'A1')
```

### Get Cell Value
```cshtml
var value = spreadsheet.sheets[0].rows[rowIndex].cells[colIndex].value;
```
## Notes

- `startEdit()` requires active cell selection; use `goTo()` first if needed
- Formulas must start with `=`; missing `=` treats as text