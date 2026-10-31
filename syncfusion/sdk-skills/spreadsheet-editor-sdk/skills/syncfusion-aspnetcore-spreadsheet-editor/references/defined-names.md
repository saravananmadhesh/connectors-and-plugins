````markdown
# Defined Names (Named Ranges)

Create and manage named ranges in the Spreadsheet Editor — use them in formulas for readability and maintainability.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@{
    // Use the proper DefinedName type with correct property names
    var definedNames = new List<DefinedName>
    {
        new DefinedName { Name = "SalesData", RefersTo = "=Sheet1!B2:B10" },
        new DefinedName { Name = "Targets", RefersTo = "=Sheet1!C2:C10" }
    };
}

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" definedNames="definedNames" allowConditionalFormat="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

  <script>
      function onCreated() {
          var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

          // === Add a named range programmatically ===
          spreadsheet.addDefinedName({
              name: 'TotalSales',
              refersTo: '=Sheet1!D11'
          });

          // === Add named range with sheet name (cross-sheet) ===
          spreadsheet.addDefinedName({
              name: 'ReportData',
              refersTo: '=Reports!A1:Z100'
          });

          // === Use namedRange/definedName in Formula ===
          spreadsheet.updateCell(
              { formula: '=SUM(SalesData)' },
              'B12'
          );

          // === Get all defined names ===
          var allNames = spreadsheet.definedNames;
          console.log('Defined names:', allNames);

          // === Remove a named range ===
          spreadsheet.removeDefinedName('SalesData', 'Workbook');
      }
  </script>

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

```typescript
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

```typescript
const removed = spreadsheet.removeDefinedName('SalesTotal', 'Workbook');
```

### `definedNames` Property
Array of all defined names in the workbook.

```typescript
const allRanges = spreadsheet.definedNames;
allRanges.forEach((range: DefineNameModel) => {
  console.log(`${range.name} → ${range.refersTo}`);
});
```

## DefineNameModel Structure

```typescript
interface DefineNameModel {
  name: string;          // Unique range name
  refersTo: string;      // Reference (must start with '=')
  comment?: string;      // Optional description
  scope?: string;        // 'Workbook' (default) or sheet name
}
```

## Usage Examples

### Simple Named Range (Single Cell)
```typescript
spreadsheet.addDefinedName({
  name: 'ReportDate',
  refersTo: '=Sheet1!A1'
});

// Use in formula:
spreadsheet.updateCell({ value: 'Report Date: ' }, 'A2');
spreadsheet.updateCell({ value: `=ReportDate` }, 'B2');
```

### Named Range for Table Data
```typescript
// Define table ranges
spreadsheet.addDefinedName({
  name: 'SalesTable',
  refersTo: '=Sheet1!A1:D100'
});

spreadsheet.addDefinedName({
  name: 'SalesAmount',
  refersTo: '=Sheet1!D2:D100'
});

spreadsheet.addDefinedName({
  name: 'SalesDate',
  refersTo: '=Sheet1!A2:A100'
});

// Use in summary calculations
spreadsheet.updateCell(
  { value: '=SUM(SalesAmount)' },
  'F2'
);
```

### Cross-Sheet Named Range
```typescript
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

### Named Range with Comment
```typescript
spreadsheet.addDefinedName({
  name: 'Q4Revenue',
  refersTo: '=Sheet1!C1:C13',
  comment: 'Fourth quarter revenue totals by month'
});
```

### Sheet-Scoped Named Range
```typescript
// Add range scoped to a specific sheet (not workbook-wide)
const added = spreadsheet.addDefinedName({
  name: 'LocalData',
  refersTo: '=Sheet1!A1:A50',
  scope: 'Sheet1'  // Only visible/usable in Sheet1
});
```

### List All Named Ranges
```typescript
const allRanges = spreadsheet.definedNames;

if (allRanges.length === 0) {
  console.log('No named ranges defined');
} else {
  allRanges.forEach((range: DefineNameModel) => {
    console.log(`Name: ${range.name}`);
    console.log(`Reference: ${range.refersTo}`);
    console.log(`Scope: ${range.scope || 'Workbook'}`);
    console.log(`Comment: ${range.comment || '(none)'}`);
    console.log('---');
  });
}
```

### Find and Remove Named Range
```typescript
const rangeName = 'OldData';
const found = spreadsheet.definedNames.find((r: DefineNameModel) => r.name === rangeName);

if (found) {
  const removed = spreadsheet.removeDefinedName(rangeName, 'Workbook');
  console.log(removed ? 'Removed' : 'Failed to remove');
} else {
  console.log('Range not found');
}
```

### Replace Named Range (Remove and Re-add)
```typescript
const rangeName = 'SalesData';

// Remove old reference
spreadsheet.removeDefinedName(rangeName, 'Workbook');

// Add new reference
spreadsheet.addDefinedName({
  name: rangeName,
  refersTo: '=Sheet1!B1:B25'  // Updated range
});
```

## Reference Format Rules

- **Must include `=` prefix**: `'=Sheet1!A1:A10'` ✓ | `'Sheet1!A1:A10'` ✗
- **Sheet name with spaces**: Use quotes if needed: `'=\'Sales Data\'!A1:A10'`
- **Single cell**: `'=Sheet1!A1'`
- **Range**: `'=Sheet1!A1:D100'`
- **Entire column**: `'=Sheet1!A:A'`
- **Entire row**: `'=Sheet1!1:1'`

## Name Rules

- **Alphanumeric and underscore**: `'Sales_Q1'`, `'Total2024'` ✓
- **No spaces**: `'Sales Q1'` ✗
- **No leading numbers**: `'1stQuarter'` ✗ | `'Q1_2024'` ✓
- **Reserved words**: Avoid Excel function names (`'SUM'`, `'AVERAGE'`) ✗
- **Case-insensitive**: `'SalesData'` and `'salesdata'` refer to same range
- **Max length**: Typically 255 characters

## Notes

- **Best Practice**: Use descriptive names (`'Q4Sales'` not `'d1'`)
- **Best Practice**: Use UPPERCASE for constants, lowercase for ranges (`'PI'` vs `'salesData'`)
- **Best Practice**: Prefix sheet-scoped names with sheet (`'Sheet1_Summary'`)
- **Gotcha**: Name must be unique within scope (workbook or sheet)
- **Gotcha**: `addDefinedName` returns `false` silently if name exists — check return value
- **Gotcha**: References must include sheet name (`'=Sheet1!A1'` not just `'=A1'`)
- **Gotcha**: Changing sheet names breaks existing defined range references
- **Performance**: Named ranges have minimal performance impact; no rendering overhead

## Error Handling

```typescript
function safeAddDefinedName(name: string, reference: string): boolean {
  // Check if already exists
  const exists = spreadsheet.definedNames.some((r: DefineNameModel) => r.name === name);
  
  if (exists) {
    console.warn(`Named range "${name}" already exists`);
    return false;
  }

  // Try to add
  const added = spreadsheet.addDefinedName({
    name: name,
    refersTo: reference
  });

  if (!added) {
    console.error(`Failed to add named range "${name}"`);
    return false;
  }

  console.log(`Successfully added "${name}"`);
  return true;
}

// Usage
safeAddDefinedName('TotalRevenue', '=Sheet1!D1:D100');
```
