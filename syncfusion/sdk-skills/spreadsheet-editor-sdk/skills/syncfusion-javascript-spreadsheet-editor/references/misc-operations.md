# Miscellaneous Sheet Operations

Clear operations and sheet management (insert/move/delete/duplicate) in the Spreadsheet.

## Table of Contents

- [Minimal Code](#minimal-code)
- [Placeholders](#placeholders)
- [API Reference](#api-reference)
  - [Clear](#clear)
  - [Insert Sheet](#insert-sheet)
  - [Move Sheet](#move-sheet)
  - [Delete Sheet](#delete-sheet)
  - [Duplicate Sheet](#duplicate-sheet)
- [Notes](#notes)

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }, { name: 'Sheet2' }]
});
spreadsheet.appendTo('#spreadsheet');

// Clear
spreadsheet.clear({ type: 'Clear Contents', range: 'A1:D10' });
spreadsheet.clear({ type: 'Clear Formats', range: 'A1:D10' });
spreadsheet.clear({ type: 'Clear Hyperlinks', range: 'A1:D10' });
spreadsheet.clear({ type: 'Clear All', range: 'A1:D10' });

// Insert sheet
spreadsheet.insertSheet([{ name: 'Report' }]);       // insert SheetModel at end
spreadsheet.insertSheet([{ name: 'Report' }], 1);    // insert SheetModel at index 1
spreadsheet.insertSheet(2);                          // insert blank sheet at index 2
spreadsheet.insertSheet(1, 3);                       // insert blank sheets index 1..3

// Move sheets
spreadsheet.moveSheet(2);               // move active sheet to index 2
spreadsheet.moveSheet(0, [1, 2]);       // move sheets 1 and 2 to position 0

// Delete sheets
spreadsheet.delete(1, 1, 'Sheet');      // delete sheet at index 1
spreadsheet.delete(0, 2, 'Sheet');      // delete sheets index 0..2

// Duplicate sheet
spreadsheet.duplicateSheet();           // duplicate active sheet
spreadsheet.duplicateSheet(0);          // duplicate sheet at index 0

// Active sheet info
const idx = spreadsheet.activeSheetIndex;
const sheet = spreadsheet.getActiveSheet();

// Select range
spreadsheet.selectRange('A1:D10');
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[RANGE]` | Cells to clear or select | `'A1:D10'`, `'B2:E20'` |
| `[CLEAR_TYPE]` | What to clear | `'Clear Contents'`, `'Clear Formats'`, `'Clear Hyperlinks'`, `'Clear All'` |
| `[SHEET_MODELS]` | SheetModel array for insertSheet | `[{ name: 'Report' }]` |
| `[START_INDEX]` | Start sheet index (0-based) | `0`, `1`, `2` |
| `[END_INDEX]` | End sheet index (0-based) | `1`, `2`, `3` |
| `[POSITION]` | Target position for moveSheet | `0`, `2` |

## API Reference

### Clear
```typescript
// clear(clearOptions: ClearOptions): void
spreadsheet.clear({ type: '[CLEAR_TYPE]', range: '[RANGE]' });
```

| Type | Effect |
|---|---|
| `'Clear Contents'` | Removes values only |
| `'Clear Formats'` | Removes formatting only |
| `'Clear Hyperlinks'` | Removes hyperlinks only |
| `'Clear All'` | Removes everything |

### Insert Sheet
```typescript
// insertSheet(startSheet?: number | SheetModel[], endSheet?: number): void
spreadsheet.insertSheet([SHEET_MODELS]);                      // insert with model at end
spreadsheet.insertSheet([SHEET_MODELS], [INDEX]);             // insert with model at index
spreadsheet.insertSheet([START_INDEX], [END_INDEX]);          // insert blank by index range
```

### Move Sheet
```typescript
// moveSheet(position: number, sheetIndexes?: number[]): void
spreadsheet.moveSheet([POSITION]);                    // move active sheet
spreadsheet.moveSheet([POSITION], [INDEX1, INDEX2]);  // move specific sheets
```

### Delete Sheet
```typescript
// delete(startIndex?: number, endIndex?: number, model?: string): void
spreadsheet.delete([START_INDEX], [END_INDEX], 'Sheet');
```

### Duplicate Sheet
```typescript
// duplicateSheet(index?: number): void
spreadsheet.duplicateSheet();        // duplicate active sheet
spreadsheet.duplicateSheet([INDEX]); // duplicate sheet at index
```

## Notes

- Sheet indices are 0-based
- `delete()` requires model = `'Sheet'` for sheet deletion
- `duplicateSheet()` with no argument duplicates the active sheet