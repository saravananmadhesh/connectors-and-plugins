# Cell Editing

Edit cell values, start/end edit mode, and update cells programmatically in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Start Edit Mode (activate cell for editing) ===
      spreadsheet.startEdit();                    // Start edit on active cell
      // === End Edit Mode (save changes and exit edit) ===
      spreadsheet.endEdit();                      // Save and exit

      // === Close Edit Mode (alternative method) ===
      spreadsheet.closeEdit();                    // Close the edit cell

      // === Update Cell Value ===
      spreadsheet.updateCell({ value: 'New Value' }, 'A2');

      // === Update Cell with Formula ===
      spreadsheet.updateCell({ value: '=SUM(B2:B10)' }, 'B11');

      // === Update Cell with Formatting ===
      spreadsheet.updateCell(
        {
          value: 'Formatted',
          style: {
            fontWeight: 'bold',
            color: '#FF0000',
            backgroundColor: '#FFFF00'
          }
        },
        'C2'
      );

      // === Get Active Cell Address ===
      const activeCell = spreadsheet.getActiveSheet().activeCell;

      // === Edit on Double-Click (built-in behavior) ===
      // User double-clicks cell
    };

    const cellEditHandler = (args) => {
      if (args.address === 'A1') {
        //Cancel cell editing by checking cell address.
        args.cancel = true;
      }
    };
    return (<SpreadsheetComponent ref={spreadsheetRef} allowEditing={true} created={onCreated} cellEdit={cellEditHandler}>
                    <SheetsDirective>
                        <SheetDirective name="Data">
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="Name" ></CellDirective>
                                          <CellDirective value="Price" ></CellDirective>
                                      </CellsDirective>
                                  </RowDirective>
                              </RowsDirective>
                            </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[VALUE]` | Cell value or formula | `'New Value'`, `100`, `'=SUM(A1:A5)'` |
| `[CELL]` | Target cell address | `'A1'`, `'B2'`, `'A2:A5'` |
| `[STYLE]` | Cell formatting object | `{ fontWeight: 'bold', color: '#FF0000' }` |
| `[MODE]` | Edit mode flag | `true`, `false` |

## API Methods Reference

### Start Edit Mode
```jsx
spreadsheet.startEdit();                    // Start on active cell with current value
```

**Effect**: Activates edit mode on the current/active cell, allowing user text input.

### End Edit Mode
```jsx
spreadsheet.endEdit();                      // Save changes and exit edit mode
```

**Effect**: Closes edit mode, validates input, applies to cell.

### Close Edit Mode
```jsx
spreadsheet.closeEdit();                    // Close the edit cell
```

**Effect**: Closes the currently active edit cell, similar to `endEdit()`.

### Update Cell
```jsx
spreadsheet.updateCell(
  { value: '[VALUE]', style?: {...} },
  '[CELL]'
);
```

**Effect**: Directly updates cell value and optional formatting without entering edit mode.

### Get Active Cell
```jsx
const activeCell = spreadsheet.getActiveSheet().activeCell;
// Returns: Address of currently selected cell (e.g., 'A1')
```

### Get Cell Value
```jsx
const value = spreadsheet.sheets[0].rows[rowIndex].cells[colIndex].value;
```

## Notes

- `startEdit()` requires active cell selection; use `goTo()` first if needed
- Formulas must start with `=`; missing `=` treats as text

