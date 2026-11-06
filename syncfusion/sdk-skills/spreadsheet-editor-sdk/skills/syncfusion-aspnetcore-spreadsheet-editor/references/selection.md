# Selection API Reference

## Overview
The Selection API allows you to programmatically select cells or ranges, respond to selection changes via events, and retrieve the active cell address.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    // Use the strongly typed class instead of anonymous type
    var selectionSettings = new SpreadsheetSelectionSettings { Mode = Syncfusion.EJ2.Spreadsheet.SelectionMode.Multiple };
}

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" selectionSettings="selectionSettings" beforeSelect="beforeSelect" select="onSelect" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Select single cell ===
        spreadsheet.selectRange('B2');

        // === Select a range ===
        spreadsheet.selectRange('A1:D10');

        // === Select range on a specific sheet ===
        spreadsheet.selectRange('Sheet2!B5');

        // === Get the active cell address ===
        var activeCell = spreadsheet.getActiveSheet().activeCell;
        console.log('Active cell:', activeCell);

        // === Get the active sheet's selected range ===
        var sheet = spreadsheet.getActiveSheet();
        console.log('Selected range:', sheet.selectedRange);
    }

    // Triggered after cell selection
    function onSelect(args) {
        console.log('Selected range:', args.range);
    }

    // Triggered before cell selection — cancel to restrict selection
    function beforeSelect(args) {
        if (args.range === 'A1') {
            args.cancel = true;   // Block selection of A1
        }
    }
</script>

```

## Key Methods & Properties

### `selectRange(address)`
Selects the specified cell or range. Accepts a single string address only.

**Parameters**:
- `address` (string): Range address — `'A1'`, `'A1:D10'`, or `'SheetName!A1:D10'`

**Returns**: void

```cshtml
// Single cell
spreadsheet.selectRange('C5');

// Range
spreadsheet.selectRange('B2:F10');

// Cross-sheet (navigates to sheet + selects)
spreadsheet.selectRange('Sheet2!A1');
```

### `getActiveSheet()`
Returns the active `SheetModel`. Use `sheet.activeCell` and `sheet.selectedRange` to read selection.

```cshtml
const sheet = spreadsheet.getActiveSheet();
console.log('Active cell:', sheet.activeCell);       // e.g. "C5"
console.log('Selected range:', sheet.selectedRange); // e.g. "B2:F10"
```

### `selectionSettings.mode`
Controls selection behaviour.

| Value | Behaviour |
|---|---|
| `'Multiple'` | Default — multi-cell/range selection |
| `'Single'` | Only one cell at a time |
| `'None'` | Selection disabled (read-only appearance) |

## Selection Events

### `select` Event
Fires **after** a cell or range is selected.

**Args** (`SelectEventArgs`):
- `range` (string) — the newly selected range address

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" select="onSelect">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    // Triggered after cell selection
    function onSelect(args) {
        console.log('Selected:', args.range); // e.g. "B2:D5"
        // Apply highlighting, update a status label, etc.
    }
</script>

```

### `beforeSelect` Event
Fires **before** a cell or range is selected. Can be cancelled.

**Args** (`BeforeSelectEventArgs`):
- `range` (string) — range about to be selected
- `cancel` (boolean) — set `true` to block the selection

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" beforeSelect="beforeSelect">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    // Triggered before cell selection
    function beforeSelect(args) {
        if (args.range === 'A1') {
            args.cancel = true;  // Block selecting A1
        }
    }
</script>

```

## Advanced Patterns

### Read Active Cell After Selection

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" select="onSelect">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    // Triggered after cell selection
    function onSelect(args) {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        var sheet = spreadsheet.getActiveSheet();
        console.log('Active cell:', sheet.activeCell);       // e.g. "D5"
        console.log('Full range:', sheet.selectedRange);     // e.g. "D5:F10"
    }
</script>

```

### Navigate and Format Selection
```cshtml
spreadsheet.selectRange('A1:D10');
spreadsheet.cellFormat({ backgroundColor: '#FFFFCC', border: '1px solid #FF0000' }, 'A1:D10');
```

### Build Formula from Active Cell
```cshtml
const sheet = spreadsheet.getActiveSheet();
const activeCell = sheet.activeCell;       // e.g. "B5"
const selectedRange = sheet.selectedRange; // e.g. "B5:B20"
spreadsheet.updateCell({ formula: `=SUM(${selectedRange})` }, activeCell);
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click cell | Select single cell |
| Shift+Click | Extend selection |
| Ctrl+Click | Add to selection (multi-range) |
| Ctrl+A | Select all cells |
| Shift+Space | Select entire row |
| Ctrl+Space | Select entire column |
| Arrow Keys | Move selection |
| Ctrl+Shift+End | Select to last used cell |
| Ctrl+Shift+Home | Select to first cell |

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Click | Select single cell |
| Shift + Click | Extend selection |
| Ctrl + Click | Add to multi-selection |
| Ctrl + A | Select all |
| Shift + Space | Select entire row |
| Ctrl + Space | Select entire column |
| Arrow Keys | Move active cell |
| Ctrl + Shift + End | Select to last used cell |

## Notes

- **`selectRange()`** accepts only a **single string** — not an array, not an options object
- **No `getSelectedRange()` method** — use `spreadsheet.getActiveSheet().selectedRange` instead
- **No `getCellAddress()` method on Spreadsheet** — use the helper `getCellAddress(rowIndex, colIndex)` from `ej.spreadsheet` utilities if needed
- **Active Cell**: `sheet.activeCell` holds the last focused cell in the selection

## See Also
- [Cell Formatting](./formatting.md) — Apply styles to selected cells
- [Edit Cell](./edit-cell.md) — Edit selected cells
- [Clipboard](./clipboard.md) — Copy/cut/paste selected range
