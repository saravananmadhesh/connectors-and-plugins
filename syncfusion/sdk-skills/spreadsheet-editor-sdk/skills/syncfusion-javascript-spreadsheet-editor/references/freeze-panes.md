# Freeze Panes

Freeze rows and columns in place during scrolling via `frozenRows` and `frozenColumns` sheet properties, or programmatically using the `freezePanes()` method.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  sheets: [{
    name: 'Sales',
    ranges: [{ dataSource: data }],
    frozenRows: 1,       // Freeze first row (header)
    frozenColumns: 1     // Freeze first column (ID)
  }]
});

spreadsheet.appendTo('#spreadsheet');

// === Freeze programmatically ===
spreadsheet.freezePanes(2, 2);              // Freeze 2 rows, 2 columns on active sheet
spreadsheet.freezePanes(1, 1, 'Sales');     // By sheet name
spreadsheet.freezePanes(1, 1, 0);           // By sheet index

// === Unfreeze ===
spreadsheet.freezePanes(0, 0);
```

## Placeholders

### Sheet Initialization Properties

| Placeholder | Description | Example |
|---|---|---|
| `frozenRows` | `SheetModel.frozenRows` — number of rows to freeze from top | `1`, `2`, `3` |
| `frozenColumns` | `SheetModel.frozenColumns` — number of columns to freeze from left | `1`, `2` |

### freezePanes(row?, column?, sheet?)

| Placeholder | Description | Example |
|---|---|---|
| `row` | Number of rows to freeze — defaults to `1` if omitted | `0`, `1`, `2` |
| `column` | Number of columns to freeze — defaults to `1` if omitted | `0`, `1`, `2` |
| `sheet` | Sheet name or zero-based index — defaults to active sheet if omitted | `'Sales'`, `0`, `1` |

## Notes

- Set `row` and `column` to `0` to unfreeze all panes
- `frozenRows` / `frozenColumns` set at initialization; use `freezePanes()` for programmatic changes after load
- Freeze does not affect data export or programmatic cell access