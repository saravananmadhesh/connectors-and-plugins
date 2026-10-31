# Clipboard Operations

Copy, cut, and paste cells with values, formatting, and formulas in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet


@Html.EJS().Spreadsheet("spreadsheet").EnableClipboard(true).Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Data")
            .Rows(rows =>
            {
                rows.Cells(cells =>
                {
                    cells.Value("Source").Add();
                    cells.Value("100").Add();
                }).Add(); // end first row
            }).Add(); // end row collection
    }).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Copy Selected Cell ===
        spreadsheet.selectRange('A1:B2');
        spreadsheet.copy();

        // === Copy Specific Cell ===
        spreadsheet.copy('A1');       
        spreadsheet.copy('A1:B2');    
        spreadsheet.copy('Sheet1!C3');

        // === Cut Selected Cell ===
        spreadsheet.selectRange('A1:B2');
        spreadsheet.cut();

        // === Cut Specific Cell ===
        spreadsheet.cut('A1');
        spreadsheet.cut('A1:B2');
        spreadsheet.cut('Sheet1!C3');

        // === Paste to Active Cell ===
        spreadsheet.selectRange('D1');
        spreadsheet.paste();

        // === Paste with Specific Type ===
        spreadsheet.paste('D1', 'All');      
        spreadsheet.paste('D1', 'Values');   
        spreadsheet.paste('D1', 'Formats');  
        spreadsheet.paste('D1', 'Formulas'); 
    }
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[SOURCE_RANGE]` | Cell or range to copy/cut | `'A1'`, `'A1:D10'`, `'Sheet1!B2'` |
| `[DEST_CELL]` | Paste destination | `'D1'`, `'E5'` |
| `[PASTE_TYPE]` | Type of paste operation | `'All'`, `'Values'`, `'Formats'`, `'Formulas'` |

## API Methods Reference

### Copy Cell/Range
```cshtml
spreadsheet.copy();                     // Copy currently selected cell/range
spreadsheet.copy('[SOURCE_RANGE]');     // Copy specific cell or range
// Returns: Promise
```

**Effect**: Copies cell(s) to clipboard buffer. Moving marching ants border around source.

### Cut Cell/Range
```cshtml
spreadsheet.cut();                      // Cut currently selected cell/range
spreadsheet.cut('[SOURCE_RANGE]');      // Cut specific cell or range
// Returns: Promise
```

**Effect**: Cuts cell(s) to clipboard buffer. Source cells remain until paste completes (dashed border). After paste, source cells are cleared.

### Paste to Cell
```cshtml
spreadsheet.paste();                    // Paste to active cell (default: 'All' type)
spreadsheet.paste('[DEST_CELL]');       // Paste to specific cell
spreadsheet.paste('[DEST_CELL]', '[PASTE_TYPE]');
// Returns: void
```

**Parameters:**
- `[DEST_CELL]` (optional): Target cell address; if omitted, uses active cell
- `[PASTE_TYPE]` (optional): 'All' | 'Values' | 'Formats' | 'Formulas' (default: 'All')

## Paste Types

| Paste Type | Content Pasted | Example |
|---|---|---|
| `'All'` | Values + formatting + formulas | Font, colors, cell values, formulas |
| `'Values'` | Cell values only | Numbers, text; formulas become values |
| `'Formats'` | Formatting only | Font, colors, borders; no data |
| `'Formulas'` | Formulas only | `=SUM(A1:A5)`; overwrites values |

## Cut/Copy/Paste Behavior

### Copy Behavior
- Copies cell(s) to internal clipboard buffer
- Marching ants (moving border) shows source range
- Source cells remain unchanged
- Can paste multiple times from same copy

### Cut Behavior
- Cuts cell(s) to clipboard buffer
- Dashed border shows cut range
- Source cells become empty after paste
- Only one cut operation at a time

### Paste Behavior
- Pastes content to destination starting at specified cell
- Range expansion: if source is `A1:C3` and paste at `F1`, result is `F1:H3` (same dimensions)
- Formulas adjust automatically (relative references update)
- Absolute references (`$A$1`) remain fixed

## Clipboard State

| State | Indicator | Behavior |
|---|---|---|
| Nothing copied | None | Paste does nothing |
| Cell copied | Marching ants | Can paste multiple times |
| Cell cut | Dashed border | Paste clears source |
| After paste | Border cleared | Clipboard buffer remains (can paste again) |
| Escape pressed | Borders cleared | Copy/cut canceled |

## Notes

- Use `'Values'` paste type to update only values with existing format
- Use `'Formats'` paste type to apply styling without overwriting data
- **Keyboard Shortcut**: Ctrl+C (copy), Ctrl+X (cut), Ctrl+V (paste), Esc (cancel)
