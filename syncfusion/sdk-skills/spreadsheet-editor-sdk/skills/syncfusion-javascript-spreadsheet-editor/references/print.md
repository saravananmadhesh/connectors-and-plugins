# Print

Print the active sheet or entire workbook using the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  sheets: [{ name: 'Sheet1' }]
});
spreadsheet.appendTo('#spreadsheet');

// Print active sheet (default)
spreadsheet.print();

// Print with options
spreadsheet.print({
  type: 'Workbook',
  allowRowColumnHeader: true,
  allowGridLines: true
});
```

## API

### `print(printOptions?)`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `type` | `PrintType` | `'ActiveSheet'` | `'ActiveSheet'` prints active sheet; `'Workbook'` prints all sheets |
| `allowRowColumnHeader` | `boolean` | `false` | Include row/column headers (A, B, C / 1, 2, 3) |
| `allowGridLines` | `boolean` | `false` | Include cell gridlines |

## Examples

```typescript
// Print active sheet only
spreadsheet.print({ type: 'ActiveSheet' });

// Print entire workbook
spreadsheet.print({ type: 'Workbook' });

// Print with headers and gridlines
spreadsheet.print({ type: 'ActiveSheet', allowRowColumnHeader: true, allowGridLines: true });
```

## Notes

- Calling `print()` with no arguments defaults to `{ type: 'ActiveSheet', allowRowColumnHeader: false, allowGridLines: false }`
- Print behavior is browser-dependent; test in the target environment