# Selection

Programmatically select cells or ranges, respond to selection events, and read active cell state in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet, SelectEventArgs, BeforeSelectEventArgs } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  selectionSettings: {
    mode: 'Multiple'    // 'None' | 'Single' | 'Multiple'
  },
  sheets: [{ name: 'Sheet1' }],

  // Fires after selection changes
  select: (args: SelectEventArgs): void => {
    console.log('Selected range:', args.range);
  },

  // Fires before selection — cancel to block
  beforeSelect: (args: BeforeSelectEventArgs): void => {
    if (args.range === 'A1') {
      args.cancel = true;
    }
  }
});
spreadsheet.appendTo('#spreadsheet');

// Select single cell
spreadsheet.selectRange('B2');

// Select a range
spreadsheet.selectRange('A1:D10');

// Select range on a specific sheet
spreadsheet.selectRange('Sheet2!B5');

// Get active cell address
const sheet = spreadsheet.getActiveSheet();
console.log('Active cell:', sheet.activeCell);       // e.g. "B2"
console.log('Selected range:', sheet.selectedRange); // e.g. "A1:D10"
```

## API

### `selectRange(address)`

| Parameter | Type | Description |
|---|---|---|
| `address` | `string` | Range address e.g. `'A1'`, `'A1:D10'`, `'Sheet2!A1:D10'` |

### `getActiveSheet()`

Returns the active `SheetModel`. Use `sheet.activeCell` and `sheet.selectedRange` to read selection state.

| Property | Type | Description |
|---|---|---|
| `activeCell` | `string` | Last focused cell e.g. `'B2'` |
| `selectedRange` | `string` | Full selected range e.g. `'A1:D10'` |

### `selectionSettings`

| Property | Type | Default | Description |
|---|---|---|---|
| `mode` | `string` | `'Multiple'` | `'Multiple'` allows multi-range; `'Single'` one cell only; `'None'` disables selection |

## Events

### `select` Event

Fires **after** selection changes.

| Argument | Type | Description |
|---|---|---|
| `range` | `string` | Newly selected range address |

### `beforeSelect` Event

Fires **before** selection changes. Set `args.cancel = true` to block.

| Argument | Type | Description |
|---|---|---|
| `range` | `string` | Range about to be selected |
| `cancel` | `boolean` | Set `true` to block the selection |

## Notes

- `selectRange()` accepts only a **single string** — not an array or options object
- No `getSelectedRange()` method — use `spreadsheet.getActiveSheet().selectedRange` instead
- Cross-sheet selection `'Sheet2!A1:D10'` navigates to that sheet and selects the range
- `mode: 'None'` disables all UI selection — useful for display-only views
- `activeCell` holds the last focused cell within the selected range