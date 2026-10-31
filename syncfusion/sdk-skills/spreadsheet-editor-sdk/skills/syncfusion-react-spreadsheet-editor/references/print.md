# Print

## Overview
The printing functionality allows end-users to print all contents, such as tables, charts, images, and formatted contents, available in the active worksheet or entire workbook in the Spreadsheet. You can enable or disable print functionality by using the `allowPrint` property, which defaults to true.

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
      // === Open Print Dialog ===
      spreadsheet.print();
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowPrint={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Report">
                          <RowsDirective>
                                  <RowDirective>
                                      <CellsDirective>
                                          <CellDirective value="Product" ></CellDirective>
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

## API Methods Reference

### Print
Used to print the active sheet or the entire workbook based on the printOptions based in it.

**Parameters**:
- No parameters

**Returns**: void

**Example**:
```jsx
//Without any printOptions, it will print the activesheet without grid lines and row/column headers.
spreadsheet.print();

//Used to print whole workbook with gridlines and row/column headers.
spreadsheet.print({ type: 'Workbook', allowRowColumnHeader: true, allowGridLines: true });

//Used to print active sheet with gridlines and row/column headers.
spreadsheet.print({ type: 'ActiveSheet', allowRowColumnHeader: true, allowGridLines: true });

```
