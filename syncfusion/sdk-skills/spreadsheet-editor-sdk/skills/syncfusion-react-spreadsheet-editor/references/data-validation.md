# Data Validation in Spreadsheet Editor

Apply rules to restrict or validate the type of data entered into cells (e.g., whole numbers, lists, dates, custom formulas).

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
      // === Example 1: Whole number between 1 and 100 ===
      spreadsheet.addDataValidation(
        {
          type: 'WholeNumber',
          operator: 'Between',
          value1: '1',
          value2: '100',
          ignoreBlank: true,
          inCellDropDown: false
        },
        'B2:B50'
      );

      // === Example 2: List of allowed values ===
      spreadsheet.addDataValidation(
        {
          type: 'List',
          value1: 'Pending,Shipped,Delivered',
          inCellDropDown: true
        },
        'C2:C50'
      );

      // === Example 3: Date after 01-Jan-2024 ===
      spreadsheet.addDataValidation(
        {
          type: 'Date',
          operator: 'GreaterThan',
          value1: '01/01/2024'
        },
        'D2:D50'
      );

      // === Example 4: Custom formula ===
      spreadsheet.addDataValidation(
        {
          type: 'Custom',
          value1: '=AND(ISNUMBER(A2),A2>0)'
        },
        'A2:A50'
      );

      // === Example 5: Remove data validation ===
      spreadsheet.removeDataValidation('B2:B50');

      // === Example 6: Add invalid highlight ===
      spreadsheet.addInvalidHighlight('B2:B50');

      // === Example 7: Remove invalid highlight ===
      spreadsheet.removeInvalidHighlight('B2:B50');
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowDataValidation={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Orders">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [RANGE] | Cell range to validate | 'B2:B100' |
| [CRITERIA] | Validation rule type | 'List', 'Whole', 'Decimal' |
| [VALUE1] | First constraint | 100 or ['A','B','C'] |
| [VALUE2] | Second constraint | 500 |
| [METHOD] | Data validation method | 'addDataValidation', 'removeDataValidation' |
| [HIGHLIGHT_METHOD] | Highlight method | 'addInvalidHighlight', 'removeInvalidHighlight' |

## Valid Properties for addDataValidation() method
 
The `addDataValidation()` method supports only these properties:
 
| Property | Type | Description | Example |
|---|---|---|---|
| `type` | ValidationType | Validation type | 'WholeNumber', 'Decimal', 'TextLength', 'Time',  'List', 'Date', 'Custom' |
| `operator` | ValidationOperator | Comparison operator | 'Between', 'GreaterThan', 'LessThan', 'Equal' |
| `value1` | string | Primary constraint value | '1' or 'Pending,Shipped,Delivered' |
| `value2` | string | Secondary constraint (for ranges) | '100' |
| `ignoreBlank` | boolean | Skip validation for empty cells | true, false |
| `inCellDropDown` | boolean | Show dropdown for List type | true, false |
| `isHighlighted ` | boolean | Specifies to allow Highlight Invalid Data | true, false |
| `range ` | string | Specifies the range that needs to be add validation | 'A2:A10' |

## Notes
- Criteria Types: List, WholeNumber, TextLength, Decimal, Date, Time, Custom
- Validation: Client-side, does not prevent paste
- List with 256+ items may not display in dropdown
