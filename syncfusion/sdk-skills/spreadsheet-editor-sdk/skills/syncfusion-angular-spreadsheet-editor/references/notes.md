# Notes

Add notes to cells using `enableNotes` and `updateCell()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [enableNotes]="true">
    <e-sheets>
      <e-sheet>
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Sports Shoes" [notes]="cellNote"></e-cell>
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Init-time note
  cellNote = { text: 'Highest sales this month.', isVisible: false };

  // Add or edit note
  addNote(): void {
    this.spreadsheet.updateCell(
      { notes: { text: 'Review this item.', isVisible: false } }, 'A1'
    );
  }

  // Show note
  showNote(): void {
    this.spreadsheet.updateCell(
      { notes: { text: 'Review this item.', isVisible: true } }, 'A1'
    );
  }

  // Hide note
  hideNote(): void {
    this.spreadsheet.updateCell(
      { notes: { text: 'Review this item.', isVisible: false } }, 'A1'
    );
  }

  // Delete note
  deleteNote(): void {
    this.spreadsheet.updateCell({ notes: undefined }, 'A1');
  }
}
```

## API Reference

### NoteModel

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | — | Note content (plain text only) |
| `isVisible` | `boolean` | `false` | `true` = sticky note always visible, `false` = red triangle indicator |

### updateCell(cell, address)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `notes` | `NoteModel \| undefined` | Note to add/edit; `undefined` to delete | `{ text: 'Note', isVisible: false }` |
| `address` | `string` | Target cell address | `'A1'`, `'B2'` |

## Export Support

| Format | Notes Preserved |
|---|---|
| XLSX / XLS | ✅ Yes |
| CSV / PDF | ❌ No |

## Notes

- `[enableNotes]="true"` must be set at initialization
- Plain text only — no rich formatting
- Notes and Comments **cannot coexist** on the same cell
- Use `Shift + F2` to add or edit a note via keyboard