# Sheet Protection & Cell Locking

Protect sheets and lock/unlock cells in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet, ProtectSettingsModel } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  sheets: [{
    name: 'Sheet1',
    isProtected: true,
    password: 'MyPassword123',
    protectSettings: {
      selectCells: true,
      formatCells: false,
      formatRows: false,
      formatColumns: false,
      insertLink: false
    },
    rows: [
      { cells: [{ value: 'Name', isLocked: false }, { value: 'John' }] },
      { cells: [{ value: 'Salary', isLocked: true }, { value: '50000' }] }
    ]
  }]
});
spreadsheet.appendTo('#spreadsheet');

// Protect sheet
const settings: ProtectSettingsModel = { selectCells: true };
spreadsheet.protectSheet('Sheet1', settings, 'MyPassword123');
spreadsheet.protectSheet(0, settings);

// Unprotect sheet
spreadsheet.unprotectSheet('Sheet1');
spreadsheet.unprotectSheet(0);

// Lock / unlock cells
spreadsheet.lockCells('B2:B10', true);
spreadsheet.lockCells('A2:A10', false);

// Check protection state
const isProtected = spreadsheet.getActiveSheet().isProtected;
```

## API

### `protectSheet(sheet?, protectSettings?, password?)`

| Parameter | Type | Description |
|---|---|---|
| `sheet` | `string \| number` | Sheet name or index |
| `protectSettings` | `ProtectSettingsModel` | Protection options |
| `password` | `string` | Optional password |

### `unprotectSheet(sheet?)`

| Parameter | Type | Description |
|---|---|---|
| `sheet` | `string \| number` | Sheet name or index |

### `lockCells(range?, isLocked?)`

| Parameter | Type | Description |
|---|---|---|
| `range` | `string` | Cell range (e.g. `'B2:B10'`) |
| `isLocked` | `boolean` | `true` to lock, `false` to unlock |

### `ProtectSettingsModel`

| Property | Type | Default | Description |
|---|---|---|---|
| `selectCells` | `boolean` | `false` | Allow selecting cells |
| `formatCells` | `boolean` | `false` | Allow formatting cells |
| `formatRows` | `boolean` | `false` | Allow resizing rows |
| `formatColumns` | `boolean` | `false` | Allow resizing columns |
| `insertLink` | `boolean` | `false` | Allow inserting hyperlinks |

## Notes

- Lock cells **before** protecting the sheet — lock state has no effect without protection
- All cells are locked by default; explicitly set `isLocked: false` to allow editing
- Incorrect password on unprotect throws an error