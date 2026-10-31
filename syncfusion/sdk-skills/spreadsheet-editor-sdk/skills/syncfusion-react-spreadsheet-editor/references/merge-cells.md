# Merge & Unmerge Cells

Merge cells into a single larger cell and unmerge them back in the Spreadsheet Editor.

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
      // === Merge Cells ===
      spreadsheet.merge('A1:C1');// Merge cells A1 to C1

      // === Merge with Alignment ===
      spreadsheet.merge('A1:C1');
      spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A1:C1');

      // === Unmerge Cells ===
      spreadsheet.unMerge('A1');// Unmerge cell A1 (or any cell in merged range)

      // === Check if Cell is Merged ===
      const isMerged = spreadsheet.sheets[0].rows[0].cells[0].colSpan > 1 || 
                        spreadsheet.sheets[0].rows[0].cells[0].rowSpan > 1;
      console.log('Cell merged:', isMerged);

      // === Get Merge Info ===
      const cell = spreadsheet.sheets[0].rows[0].cells[0];
      console.log('Row span:', cell.rowSpan, 'Col span:', cell.colSpan);
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowMerge={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Report">
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="Project" ></CellDirective>
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
| `[RANGE]` | Cell range to merge | `'A1:C1'`, `'A1:C3'`, `'B2:D5'` |
| `[CELL]` | Cell address (any in merged range) | `'A1'`, `'B2'`, `'C1'` |

## API Methods Reference

### Merge Cells
```jsx
spreadsheet.merge('[RANGE]');
// Combines cells in the range into a single cell
// Only value from first cell (top-left) is retained
// Other cell values are discarded
```

### Unmerge Cells
```jsx
spreadsheet.unMerge('[CELL]');
// Breaks merged cell back into individual cells
// Can reference any cell within the merged range
```


## Merged Cell Behavior

### Value Retention
- Only the value of the **first cell (top-left)** in the range is kept
- Other cell values are **discarded**
- Use a placeholder or space if needed

### Selection Behavior
- Clicking anywhere in merged cell **selects entire merged range**
- Editing affects only the merged cell content

### Unmerge Behavior
- Call `unMerge()` with **any cell address** in the merged range
- Value returns to **top-left cell only**
- Other cells remain empty

## Notes

- Set `allowMerge: false` in initialization to restrict merge action.
- Only the top-left cell value is preserved; other values are lost
- Merged cells count as single cell for copy/paste operations
- Formulas referencing merged cells use top-left address

## Example: Create Merged Header

```jsx

function Default() {
    const spreadsheetRef = React.useRef(null);
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // Merge header cells
      spreadsheet.merge('A1:C1');

      // Center and bold the header
      spreadsheet.cellFormat(
        { textAlign: 'center', fontWeight: 'bold', fontSize: '14pt' },
        'A1'
      );
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowMerge={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Report">
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="Monthly Sales" ></CellDirective>
                                      </CellsDirective>
                                  </RowDirective>
                              </RowsDirective>
                            </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```
