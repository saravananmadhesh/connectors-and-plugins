# Defined Names (Named Ranges)

Create and manage named ranges in the Spreadsheet Editor — use them in formulas for readability and maintainability.

## Minimal Code

```vue
<template>
  <div class="control-section">
    <ejs-spreadsheet
      ref="spreadsheet"
      :definedNames="definedNames"
      :created="onCreated"
    >
      <e-sheets>
        <e-sheet :name="Sheet1">
          <e-ranges>
            <e-range :dataSource="sheetData" />
          </e-ranges>
        </e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  </div>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheets': SheetsDirective,
    'e-sheet': SheetDirective,
    'e-ranges': RangesDirective,
    'e-range': RangeDirective,
  },

  data() {
    return {
      // Predefined named ranges
      definedNames: [
        { name: 'SalesData', refersTo: '=Sheet1!B2:B10' },
        { name: 'Targets', refersTo: '=Sheet1!C2:C10' },
      ],

      // Sample data for named ranges
      sheetData: [
        { Product: 'Laptop', Sales: 1200, Target: 1500, TotalSales: '=B2' },
        { Product: 'Mouse', Sales: 450, Target: 500, TotalSales: '=B3' },
        { Product: 'Keyboard', Sales: 800, Target: 900, TotalSales: '=B4' },
        { Product: 'Monitor', Sales: 1500, Target: 1400, TotalSales: '=B5' },
        { Product: 'Printer', Sales: 700, Target: 750, TotalSales: '=B6' },
        { Product: 'Tablet', Sales: 950, Target: 1100, TotalSales: '=B7' },
        { Product: 'Speaker', Sales: 300, Target: 400, TotalSales: '=B8' },
        { Product: 'Camera', Sales: 1250, Target: 1300, TotalSales: '=B9' },
        { Product: 'Router', Sales: 480, Target: 550, TotalSales: '=B10' },
      ],
    };
  },

  methods: {
    onCreated() {
      const s = this.$refs.spreadsheet;

      // Add programmatic named range
      s.addDefinedName({
        name: 'TotalSales',
        refersTo: '=Sheet1!D2:D10',
      });

      // Add cross-sheet named range
      s.addDefinedName({
        name: 'ReportData',
        refersTo: '=Sheet!A1:Z100',
      });

      // Use defined names in formulas
      s.updateCell({ formula: '=SUM(SalesData)' }, 'B12');
      s.updateCell({ formula: '=SUM(Targets)' }, 'C12');
      s.updateCell({ formula: '=SUM(TotalSales)' }, 'D11');

      // Log all named ranges
      console.log('Defined names:', s.definedNames);

      // Remove a named range
      s.removeDefinedName('SalesData', 'Workbook');
    },
  },
};
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

```vue
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

```vue
const removed = spreadsheet.removeDefinedName('SalesTotal', 'Workbook');
```

### `definedNames` Property
Array of all defined names in the workbook.

```vue
const allRanges = spreadsheet.ej2Instances.definedNames;
allRanges.forEach((range) => {
  console.log(`${range.name} → ${range.refersTo}`);
});
```

## DefineNameModel Structure

```vue
interface DefineNameModel {
  name: string;          // Unique range name
  refersTo: string;      // Reference (must start with '=')
  comment?: string;      // Optional description
  scope?: string;        // 'Workbook' (default) or sheet name
}
```

## Usage Examples

### Simple Named Range (Single Cell)
```vue
spreadsheet.addDefinedName({
  name: 'ReportDate',
  refersTo: '=Sheet1!A1'
});

// Use in formula:
spreadsheet.updateCell({ value: 'Report Date: ' }, 'A2');
spreadsheet.updateCell({ value: `=ReportDate` }, 'B2');
```

### Named Range for Table Data
```vue
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
```vue
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
```vue
spreadsheet.addDefinedName({
  name: 'Q4Revenue',
  refersTo: '=Sheet1!C1:C13',
  comment: 'Fourth quarter revenue totals by month'
});
```

### Sheet-Scoped Named Range
```vue
// Add range scoped to a specific sheet (not workbook-wide)
const added = spreadsheet.addDefinedName({
  name: 'LocalData',
  refersTo: '=Sheet1!A1:A50',
  scope: 'Sheet1'  // Only visible/usable in Sheet1
});
```

### List All Named Ranges
```vue
methods: {
  listAllDefinedNames() {
    const s = this.$refs.spreadsheet;

    const allRanges = s.ej2Instances.definedNames;

    if (!allRanges.length) {
      console.log("No named ranges defined");
      return;
    }

    allRanges.forEach(range => {
      console.log(`Name: ${range.name}`);
      console.log(`Reference: ${range.refersTo}`);
      console.log(`Scope: ${range.scope || "Workbook"}`);
      console.log(`Comment: ${range.comment || "(none)"}`);
      console.log("---");
    });
  }
}
```

### Find and Remove Named Range
```vue
methods: {
  safeRemoveDefinedName(rangeName) {
    const s = this.$refs.spreadsheet;

    const found = s.ej2Instances.definedNames.find(r => r.name === rangeName);

    if (found) {
      const removed = s.removeDefinedName(rangeName, "Workbook");
      console.log(removed ? "Removed" : "Failed to remove");
      return removed;
    } else {
      console.log("Range not found");
      return false;
    }
  }
}
```

### Replace Named Range (Remove and Re-add)
```vue
methods: {
  updateDefinedName(name, newRef) {
    const s = this.$refs.spreadsheet;

    // Remove existing definition (if exists)
    s.removeDefinedName(name, "Workbook");

    // Add new definition
    s.addDefinedName({
      name: name,
      refersTo: newRef
    });

    console.log(`Updated "${name}" → ${newRef}`);
  }
}
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
- **Performance**: Named ranges have minimal performance impact; no rendering overhead

## Error Handling

```vue
methods: {
  safeAddDefinedName(name, reference) {
    const s = this.$refs.spreadsheet;

    // Check if already exists
    const exists = s.definedNames.some(r => r.name === name);

    if (exists) {
      console.warn(`Named range "${name}" already exists`);
      return false;
    }

    // Try adding
    const added = s.addDefinedName({ name, refersTo: reference });

    if (!added) {
      console.error(`Failed to add named range "${name}"`);
      return false;
    }

    console.log(`Successfully added "${name}"`);
    return true;
  }
}

// Usage
safeAddDefinedName('TotalRevenue', '=Sheet1!D1:D100');
```
