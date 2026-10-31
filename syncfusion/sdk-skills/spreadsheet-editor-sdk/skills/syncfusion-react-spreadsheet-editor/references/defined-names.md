# Defined Names (Named Ranges)

Create and manage named ranges in the Spreadsheet Editor — use them in formulas for readability and maintainability.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const definedNames = [
        {
          name: 'SalesData',
          refersTo: '=Sheet1!B2:B10'     // Must include '=' prefix
        },
        {
          name: 'Targets',
          refersTo: '=Sheet1!C2:C10'
        }
    ];
    //Bind created event to perform the action during initial load.
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Add a named range programmatically ===
      spreadsheet.addDefinedName({
        name: '[NAME]',
        refersTo: '[CELL_OR_RANGE]'     // Single cell reference
      });

      // === Add named range with sheet name (cross-sheet) ===
      spreadsheet.addDefinedName({
        name: 'ReportData',
        refersTo: '=Reports!A1:Z100'
      });

      // === Use namedRange/definedName in Formula ===
      spreadsheet.updateCell(
        { formula: '=SUM(SalesData)' },
        'B12'    // Total cell uses the named range
      );

      // === Get all defined names ===
      const allNames = spreadsheet.definedNames;
      console.log('Defined names:', allNames);

      // === Remove a named range ===
      spreadsheet.removeDefinedName('SalesData', 'Workbook');
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} definedNames={definedNames} allowConditionalFormat={true} created={onCreated}>
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
| `[NAME]` | Named range identifier | `'SalesTotal'`, `'Q4Revenue'`, `'TargetCells'` |
| `[CELL_OR_RANGE]` | Cell or range reference | `'Sheet1!A1'`, `'Sheet1!B2:B10'` |
| `[SHEET_NAME]` | Sheet name for cross-sheet reference | `'Sheet1'`, `'Reports'`, `'Summary'` |
| `[SCOPE]` | Scope of named range | `'Workbook'`, or sheet name for sheet-level scope |

## Key Methods

### `addDefinedName(definedName)`
Adds a new named range to the workbook.

**Parameters**:
- `definedName` (`DefineNameModel`):
  - `name` (string) — range name (must be unique)
  - `refersTo` (string) — cell reference in format `'=SheetName!A1:A10'` (requires `=` prefix)
  - `comment` (string, optional) — description
  - `scope` (string, optional) — `'Workbook'` or sheet name (default: `'Workbook'`)

**Returns**: `boolean` — `true` if added, `false` if name already exists

```jsx
const added = spreadsheet.addDefinedName({
  name: 'HeaderRow',
  refersTo: '=Sheet1!A1:D1',
  comment: 'Table column headers'
});
```

### `removeDefinedName(name, scope)`
Removes a named range from the workbook or sheet.

**Parameters**:
- `name` (string) — range name to remove
- `scope` (string, optional) — `'Workbook'` or sheet name; defaults to `'Workbook'`

**Returns**: `boolean` — `true` if removed, `false` if not found

```jsx
const removed = spreadsheet.removeDefinedName('SalesTotal', 'Workbook');
```
## DefineNameModel Structure

```tsx
interface DefineNameModel {
  name: string;          // Unique range name
  refersTo: string;      // Reference (must start with '=')
  comment?: string;      // Optional description
  scope?: string;        // 'Workbook' (default) or sheet name
}
```

## Usage Examples

### Cross-Sheet Named Range
```jsx
// Define range on another sheet
spreadsheet.addDefinedName({
  name: 'GlobalTargets',
  refersTo: '=Summary!B1:B12'  // Reference 'Summary' sheet
});

// Use in current sheet
spreadsheet.updateCell(
  { value: '=AVERAGE(GlobalTargets)' },
  'E5'
);
```

### Sheet-Scoped Named Range
```jsx
// Add range scoped to a specific sheet (not workbook-wide)
const added = spreadsheet.addDefinedName({
  name: 'LocalData',
  refersTo: '=Sheet1!A1:A50',
  scope: 'Sheet1'  // Only visible/usable in Sheet1
});
```

### Find and Remove Named Range
```tsx
const rangeName = 'OldData';
const found = spreadsheet.definedNames.find((r: DefineNameModel) => r.name === rangeName);

if (found) {
  const removed = spreadsheet.removeDefinedName(rangeName, 'Workbook');
  console.log(removed ? 'Removed' : 'Failed to remove');
} else {
  console.log('Range not found');
}
```

### Replace Named Range (Remove and Add)
```jsx
const rangeName = 'SalesData';

// Remove old reference
spreadsheet.removeDefinedName(rangeName, 'Workbook');

// Add new reference
spreadsheet.addDefinedName({
  name: rangeName,
  refersTo: '=Sheet1!B1:B25'  // Updated range
});
```
