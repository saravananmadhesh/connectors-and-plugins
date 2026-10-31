# Find & Replace

Search and replace text in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);

    //Bind created event to perform the action during initial load.
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Find ===
      spreadsheet.find({
        value: 'Jenna Schoolfield',
        sheetIndex: 0,
        findOpt: 'next',
        mode: 'Sheet',
        isCSen: false,
        isEMatch: false,
        searchBy: 'By Row'
      });

      // === Replace ===
      spreadsheet.replace({
        value: 'Jenna Schoolfield',
        replaceValue: 'Jenna S.',
        sheetIndex: 0,
        findOpt: 'next',
        mode: 'Sheet',
        isCSen: false,
        isEMatch: true,
        searchBy: 'By Row'
      });
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowFindAndReplace={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Sheet1">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FIND_VALUE]` | Text to search for | `'Laptop'`, `'2024'` |
| `[REPLACE_VALUE]` | Text to replace with | `'Notebook'`, `'2025'` |
| `[RANGE]` | Search scope | `'A1:E100'` or empty for all |
| `[MODE]` | Search scope (Sheet/Workbook) | `'Sheet'`, `'Workbook'` |
| `[MATCH_CASE]` | Case-sensitive search | `true`, `false` |
| `[MATCH_ENTIRE_CELL]` | Must match entire cell | `true`, `false` |
| `[SEARCH_BY]` | Search by row or column | `'ByRow'`, `'ByColumn'` |


## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [FIND_VALUE] | Text to search for | 'Laptop' |
| [REPLACE_VALUE] | Text to replace with | 'Notebook' |
| [RANGE] | Search scope | 'A1:E100' |
| [MODE] | Search mode | 'Sheet', 'Workbook' |
| [MATCH_CASE] | Case-sensitive | true, false |

## Notes
- Best Practice: Use Find first to preview matches
- Case Sensitivity: Default false
