# Data Validation in Spreadsheet Editor (TypeScript)

Apply rules to restrict or validate the type of data entered into cells (e.g., whole numbers, lists, dates, custom formulas).

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

// Initialize spreadsheet with validation enabled
const spreadsheet: Spreadsheet = new Spreadsheet({
  allowDataValidation: true,
  sheets: [{ name: 'Orders' }]
});

spreadsheet.appendTo('#spreadsheet');

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
    type: 'Formula',
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

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| `range` | Cell range parameter in `addDataValidation(rules, range)` | `'B2:B100'` |
| `type` | `ValidationModel.type` — validation rule type (`ValidationValueType`) | `'List'`, `'WholeNumber'`, `'Decimal'`, `'Date'`, `'Time'`, `'TextLength'`, `'Formula'` |
| `operator` | `ValidationModel.operator` — comparison operator (`OperatorType`) | `'Between'`, `'NotBetween'`, `'EqualTo'`, `'NotEqualTo'`, `'GreaterThan'`, `'LessThan'`, `'GreaterThanOrEqualTo'`, `'LessThanOrEqualTo'` |
| `value1` | `ValidationModel.value1` — first constraint value | `'100'`, `'Pending,Shipped,Delivered'`, `'01/01/2024'` |
| `value2` | `ValidationModel.value2` — second constraint value (used with `Between`) | `'500'` |
| `ignoreBlank` | `ValidationModel.ignoreBlank` — skip validation for blank cells | `true`, `false` |
| `inCellDropDown` | `ValidationModel.inCellDropDown` — show dropdown in cell (for `List` type) | `true`, `false` |
| `isHighlighted` | `ValidationModel.isHighlighted` — highlight invalid cells automatically | `true`, `false` |
| `removeDataValidation range` | Optional range parameter in `removeDataValidation(range?)` — omit to remove from entire sheet | `'B2:B50'`, `'A1:D100'` |
| `addInvalidHighlight range` | Optional range parameter in `addInvalidHighlight(range?)` — omit to highlight entire sheet | `'B2:B50'`, `'A1:D100'` |
| `removeInvalidHighlight range` | Optional range parameter in `removeInvalidHighlight(range?)` — omit to remove highlight from entire sheet | `'B2:B50'`, `'A1:D100'` |

## Notes
- Criteria Types: List, WholeNumber, TextLength, Decimal, Date, Time, Custom
- Validation: Client-side, does not prevent paste
- List with 256+ items may not display in dropdown
