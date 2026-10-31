# Cell Editing

Edit cell values, start/end edit mode, and update cells programmatically in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  sheets: [{
    name: 'Data',
    rows: [
      { cells: [{ value: 'Name' }, { value: 'Price' }] },
      { cells: [{ value: 'Widget' }, { value: '100' }] }
    ]
  }]
});

spreadsheet.appendTo('#spreadsheet');

// === Start Edit Mode ===
spreadsheet.startEdit();                    // Activate edit on active cell

// === End Edit Mode ===
spreadsheet.endEdit();                      // Save and exit edit

// === Close Edit Mode ===
spreadsheet.closeEdit();                    // Close edit cell

// === Update Cell Value ===
spreadsheet.updateCell({ value: 'New Value' }, 'A2');
spreadsheet.updateCell({ value: '150' }, 'B2');

// === Update Cell with Formula ===
spreadsheet.updateCell({ value: '=SUM(B2:B10)' }, 'B11');

// === Get Active Cell ===
const activeCell = spreadsheet.getActiveCell();
console.log('Active Cell:', activeCell);
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `value` | Cell value or formula | `'Text'`, `100`, `'=SUM(A1:A5)'` |
| `range` | Target cell address or range | `'A1'`, `'B2'`, `'A2:A5'` |

## API Methods Reference

### startEdit()
```typescript
spreadsheet.startEdit();
```
**Description**: Activates edit mode on the current/active cell, allowing user text input.

### endEdit()
```typescript
spreadsheet.endEdit();
```
**Description**: Closes edit mode, validates input, and applies changes to the cell.

### closeEdit()
```typescript
spreadsheet.closeEdit();
```
**Description**: Closes the currently active edit cell without applying changes.

### updateCell()
```typescript
spreadsheet.updateCell(
  { value: 'New Value' },
  'A1'
);
```
**Description**: Directly updates cell value without entering edit mode.

### getActiveCell()
```typescript
const activeCell = spreadsheet.getActiveCell();
```
**Description**: Returns the address of the currently selected cell (e.g., `'A1'`).

## Notes

- **Best Practice**: Use `updateCell()` for direct value changes; use `startEdit()` for user-interactive editing
- **Best Practice**: Always call `endEdit()` before programmatically changing cells
- **Gotcha**: Formulas must start with `=`; missing `=` treats as text
- **Gotcha**: Edit mode changes don't apply until `endEdit()` is called or user confirms
- **Gotcha**: `closeEdit()` discards changes; use `endEdit()` to save

