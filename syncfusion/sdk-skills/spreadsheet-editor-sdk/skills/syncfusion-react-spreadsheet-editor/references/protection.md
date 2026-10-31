# Sheet Protection & Cell Locking

Protect sheets, lock/unlock cells, restrict edits, and control user permissions in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const protectSettings = {
      selectCells: true,
      formatCells: false,
      formatRows: false,
      formatColumns: false,
      insertLink: false
    };
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Protect Sheet — sheet name/index is FIRST parameter ===
      const protectSettings: ProtectSettingsModel = {
        selectCells: true,
        formatCells: false,
        formatRows: false,
        formatColumns: false,
        insertLink: false
      };
      spreadsheet.protectSheet('Secure Data', protectSettings, 'MyPassword123');
      // Or by index:
      spreadsheet.protectSheet(0, protectSettings, 'MyPassword123');
      // Without password:
      spreadsheet.protectSheet('Secure Data', protectSettings);

      // === Unprotect Sheet — sheet name/index, with optional password ===
      spreadsheet.unprotectSheet('Secure Data');           // No password
      spreadsheet.unprotectSheet(0);                       // By index

      // === Lock/Unlock Cells (use lockCells — NOT cellFormat with isLocked) ===
      spreadsheet.lockCells('B2:B10', true);   // Lock salary column
      spreadsheet.lockCells('A2:A10', false);  // Unlock name column

      // === Check if Active Sheet is Protected ===
      const isProtected = spreadsheet.getActiveSheet().isProtected;
      console.log('Sheet Protected:', isProtected);
    };

    return (<SpreadsheetComponent ref={spreadsheetRef} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Secure Data" isProtected={true} password='MyPassword123' protectSettings={protectSettings}>
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="Admin Name" isLocked={false} ></CellDirective>
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
| `[PASSWORD]` | Protection password | `'MyPassword123'`, `'Secure@2024'` |
| `[CELL_RANGE]` | Cells to lock/unlock | `'B2:B10'`, `'A1:D5'` |
| `[EDIT_RANGES]` | Ranges users can edit | `['A2:A10', 'C2:C10']` |

## Protection Options Reference (`ProtectSettingsModel`)

```jsx
{
  selectCells: boolean,    // Allow users to select cells (default: false)
  formatCells: boolean,    // Allow cell formatting changes (default: false)
  formatRows: boolean,     // Allow row height changes (default: false)
  formatColumns: boolean,  // Allow column width changes (default: false)
  insertLink: boolean      // Allow inserting hyperlinks (default: false)
}
```

## Cell Locking

### Lock Cells (use `lockCells`, not `cellFormat`)
```jsx
// Lock a range
spreadsheet.lockCells('[CELL_RANGE]', true);

// Unlock a range
spreadsheet.lockCells('[CELL_RANGE]', false);
```

**Important**: Cell lock state only takes effect when the sheet is protected. All cells are locked by default.

## Sheet Protection

### Protect Sheet
```jsx
// Signature: protectSheet(sheet?, protectSettings?, password?)
spreadsheet.protectSheet(
  '[SHEET_NAME_OR_INDEX]',  // Sheet name (string) or index (number)
  {
    selectCells: true,
    formatCells: false,
    formatRows: false,
    formatColumns: false,
    insertLink: false
  },
  '[PASSWORD]'              // Optional — omit if no password
);
```

### Unprotect Sheet
```jsx
// Signature: unprotectSheet(sheet?)
spreadsheet.unprotectSheet('[SHEET_NAME_OR_INDEX]');
```

### Check Protection State
```jsx
const isActiveSheetProtected = spreadsheet.getActiveSheet().isProtected;
```

## Example: Protect Budget Sheet (Admin values only)

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RowsDirective, RowDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // Lock budget column, unlock actual column for edits
      spreadsheet.lockCells('B2:B10', true);   // Lock Budget column
      spreadsheet.lockCells('C2:C10', false);  // Unlock Actual column for input

      // Protect with password — users can select cells but not format
      spreadsheet.protectSheet('Budget', {
        selectCells: true,
        formatCells: false,
        formatRows: false,
        formatColumns: false,
        insertLink: false
      }, 'BudgetProtect2024');
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Budget">
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="Department" ></CellDirective>
                                      </CellsDirective>
                                  </RowDirective>
                              </RowsDirective>
                            </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```

