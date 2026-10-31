# Selection API Reference

## Overview
The Selection API allows you to programmatically select cells or ranges, respond to selection changes via events, and retrieve the active cell address.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const selectionSettings = {
      mode: 'Multiple'    // 'None' | 'Single' | 'Multiple'
    };
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current;
      // === Select single cell ===
      spreadsheet.selectRange('B2');

      // === Select a range ===
      spreadsheet.selectRange('A1:D10');

      // === Select range on a specific sheet ===
      spreadsheet.selectRange('Sheet2!B5');

      // === Get the active cell address ===
      const activeCell = spreadsheet.getActiveSheet().activeCell;
      console.log('Active cell:', activeCell); // e.g. "B2"

      // === Get the active sheet's selected range ===
      const sheet = spreadsheet.getActiveSheet();
      console.log('Selected range:', sheet.selectedRange); // e.g. "A1:D10"
    };
    // Triggered after cell selection
    const select = (args) => {
      console.log('Selected range:', args.range);
    };

    // Triggered before cell selection — cancel to restrict selection
    const beforeSelect = (args) => {
      if (args.range === 'A1') {
        args.cancel = true;   // Block selection of A1
      }
    };
    return (<SpreadsheetComponent ref={spreadsheetRef} selectionSettings={selectionSettings} beforeSelect={beforeSelect} select={select} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

```

## Key Methods & Properties

### `selectRange(address)`
Selects the specified cell or range. Accepts a single string address only.

**Parameters**:
- `address` (string): Range address — `'A1'`, `'A1:D10'`, or `'SheetName!A1:D10'`

**Returns**: void

```jsx
// Single cell
spreadsheet.selectRange('C5');

// Range
spreadsheet.selectRange('B2:F10');

// Cross-sheet (navigates to sheet + selects)
spreadsheet.selectRange('Sheet2!A1');
```

### `getActiveSheet()`
Returns the active `SheetModel`. Use `sheet.activeCell` and `sheet.selectedRange` to read selection.

```jsx
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

### `beforeSelect` Event
Fires **before** a cell or range is selected. Can be cancelled.

**Args** (`BeforeSelectEventArgs`):
- `range` (string) — range about to be selected
- `cancel` (boolean) — set `true` to block the selection


## Advanced Patterns

### Read Active Cell After Selection

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);

    // Triggered after cell selection
    const select = (args) => {
      const spreadsheet = spreadsheetRef.current;
      const sheet = spreadsheet.getActiveSheet();
      console.log('Active cell:', sheet.activeCell);       // "D5"
      console.log('Full range:', sheet.selectedRange);     // "D5:F10"
    };

    return (<SpreadsheetComponent ref={spreadsheetRef} select={select}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

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
- **No `getCellAddress()` method on Spreadsheet** — use the helper `getCellAddress(rowIndex, colIndex)` from `'@syncfusion/ej2-react-spreadsheet'` utilities if needed
- **Active Cell**: `sheet.activeCell` holds the last focused cell in the selection

## See Also
- [Cell Formatting](./formatting.md) — Apply styles to selected cells
- [Edit Cell](./edit-cell.md) — Edit selected cells
- [Clipboard](./clipboard.md) — Copy/cut/paste selected range
