# Miscellaneous Sheet Operations

Clear operations and sheet management using `clear()`, `insertSheet()`, `moveSheet()`, `delete()`, and `duplicateSheet()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet>
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
      <e-sheet name="Sheet2"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Clear
  clearContents(): void  { this.spreadsheet.clear({ type: 'Clear Contents',   range: 'A1:D10' }); }
  clearFormats(): void   { this.spreadsheet.clear({ type: 'Clear Formats',    range: 'A1:D10' }); }
  clearHyperlinks(): void{ this.spreadsheet.clear({ type: 'Clear Hyperlinks', range: 'A1:D10' }); }
  clearAll(): void       { this.spreadsheet.clear({ type: 'Clear All',        range: 'A1:D10' }); }

  // Insert sheet
  insertSheet(): void {
    this.spreadsheet.insertSheet([{ name: 'Report' }]);     // at end
    this.spreadsheet.insertSheet([{ name: 'Report' }], 1);  // at index 1
    this.spreadsheet.insertSheet(2);                        // blank at index 2
    this.spreadsheet.insertSheet(1, 3);                     // blank sheets index 1–3
  }

  // Move sheet
  moveSheet(): void {
    this.spreadsheet.moveSheet(2);            // move active sheet to index 2
    this.spreadsheet.moveSheet(0, [1, 2]);    // move sheets 1 and 2 to position 0
  }

  // Delete sheet
  deleteSheet(): void {
    this.spreadsheet.delete(1, 1, 'Sheet');   // delete sheet at index 1
    this.spreadsheet.delete(0, 2, 'Sheet');   // delete sheets index 0–2
  }

  // Duplicate sheet
  duplicateSheet(): void {
    this.spreadsheet.duplicateSheet();        // duplicate active sheet
    this.spreadsheet.duplicateSheet(0);       // duplicate sheet at index 0
  }

  // Active sheet info
  getSheetInfo(): void {
    const idx   = this.spreadsheet.activeSheetIndex;
    const sheet = this.spreadsheet.getActiveSheet();
    console.log(idx, sheet.name);
  }
}
```

## API Reference

### clear(clearOptions)

| Property | Type | Description | Example |
|---|---|---|---|
| `type` | `string` | What to clear | `'Clear Contents'`, `'Clear Formats'`, `'Clear Hyperlinks'`, `'Clear All'` |
| `range` | `string` | Cell range to clear | `'A1:D10'` |

### insertSheet(startSheet?, endSheet?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `startSheet` | `number \| SheetModel[]` | SheetModel array or start index | `[{ name: 'Report' }]`, `2` |
| `endSheet` | `number` | End index for blank sheet range | `3` |

### moveSheet(position, sheetIndexes?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `position` | `number` | Target position to move to | `0`, `2` |
| `sheetIndexes` | `number[]` | Sheets to move — defaults to active | `[1, 2]` |

### delete(startIndex, endIndex, model)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `startIndex` | `number` | Start sheet index | `0` |
| `endIndex` | `number` | End sheet index (inclusive) | `2` |
| `model` | `string` | Must be `'Sheet'` for sheet deletion | `'Sheet'` |

### duplicateSheet(index?)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `index` | `number` | Sheet index to duplicate — defaults to active | `0` |

## Notes

- All sheet indices are **0-based**
- `delete()` requires `model = 'Sheet'` for sheet deletion
- `duplicateSheet()` with no argument duplicates the active sheet
- `insertSheet()` with a `SheetModel[]` lets you configure the new sheet (name, rows, etc.)