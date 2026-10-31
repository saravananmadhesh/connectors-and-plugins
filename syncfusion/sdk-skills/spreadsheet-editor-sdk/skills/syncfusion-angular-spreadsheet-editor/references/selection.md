# Selection

Programmatically select cells or ranges, respond to selection events, and read active cell state.

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent, SelectEventArgs, BeforeSelectEventArgs } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet
    [selectionSettings]="selectionSettings"
    (select)="onSelect($event)"
    (beforeSelect)="onBeforeSelect($event)">
    <e-sheets>
      <e-sheet name="Sheet1"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  selectionSettings = { mode: 'Multiple' }; // 'None' | 'Single' | 'Multiple'

  // Select single cell
  selectCell(): void {
    this.spreadsheet.selectRange('B2');
  }

  // Select a range
  selectRange(): void {
    this.spreadsheet.selectRange('A1:D10');
  }

  // Select range on specific sheet
  selectSheetRange(): void {
    this.spreadsheet.selectRange('Sheet2!B5');
  }

  // Read active cell and selected range
  readSelection(): void {
    const sheet = this.spreadsheet.getActiveSheet();
    console.log('Active cell:',   sheet.activeCell);    // e.g. 'B2'
    console.log('Selected range:', sheet.selectedRange); // e.g. 'A1:D10'
  }

  // Fires after selection changes
  onSelect(args: SelectEventArgs): void {
    console.log('Selected range:', args.range);
  }

  // Fires before selection — cancel to block
  onBeforeSelect(args: BeforeSelectEventArgs): void {
    if (args.range === 'A1') {
      args.cancel = true;
    }
  }
}
```

## API Reference

### selectRange(address)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `address` | `string` | Cell or range address | `'B2'`, `'A1:D10'`, `'Sheet2!B5'` |

### selectionSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `mode` | `string` | `'Multiple'` | `'Multiple'` multi-range; `'Single'` one cell; `'None'` disables selection |

### getActiveSheet()

| Property | Type | Description |
|---|---|---|
| `activeCell` | `string` | Last focused cell e.g. `'B2'` |
| `selectedRange` | `string` | Full selected range e.g. `'A1:D10'` |

### Events

| Event | Argument | Description |
|---|---|---|
| `(select)` | `args.range` | Fires after selection changes |
| `(beforeSelect)` | `args.range`, `args.cancel` | Fires before selection — set `args.cancel = true` to block |

## Notes

- `selectRange()` accepts a **single string** only
- No `getSelectedRange()` method — use `getActiveSheet().selectedRange` instead
- Cross-sheet selection `'Sheet2!A1:D10'` navigates to that sheet and selects the range
- `mode: 'None'` disables all UI selection — useful for display-only views