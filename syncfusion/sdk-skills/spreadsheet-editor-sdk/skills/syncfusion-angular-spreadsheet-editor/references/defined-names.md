# Defined Names (Named Ranges)

Create and manage named ranges in the Spreadsheet component in Angular — use them in formulas for readability and maintainability.

## Table of Contents

- [Minimal Code](#minimal-code)
- [Key Methods](#key-methods)
  - [addDefinedName](#adddefinednamedefinedname)
  - [removeDefinedName](#removedefinednamenamescope)
  - [definedNames Property](#definednames-property)
- [DefineNameModel Structure](#definenamemodel-structure)
- [Usage Examples](#usage-examples)
  - [Simple Named Range (Single Cell)](#simple-named-range-single-cell)
  - [Named Range for Table Data](#named-range-for-table-data)
  - [Cross-Sheet Named Range](#cross-sheet-named-range)
  - [Named Range with Comment](#named-range-with-comment)
  - [Sheet-Scoped Named Range](#sheet-scoped-named-range)
  - [List All Named Ranges](#list-all-named-ranges)
  - [Find and Remove Named Range](#find-and-remove-named-range)
  - [Replace Named Range](#replace-named-range)
- [Reference Format Rules](#reference-format-rules)
- [Name Rules](#name-rules)
- [Placeholders](#placeholders)
- [Notes](#notes)
- [Error Handling](#error-handling)

---

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent, DefineNameModel } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: `
    <ejs-spreadsheet #spreadsheet
      [definedNames]="definedNames"
      (created)="onCreated()">
      <e-sheets>
        <e-sheet name="Sheet1"></e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  `
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Initialize with pre-defined named ranges
  definedNames: DefineNameModel[] = [
    {
      name: 'SalesData',
      refersTo: '=Sheet1!B2:B10'     // Must include '=' prefix
    },
    {
      name: 'Targets',
      refersTo: '=Sheet1!C2:C10'
    }
  ];

  onCreated(): void {
    // Add a named range programmatically
    const success = this.spreadsheet.addDefinedName({
      name: 'TotalSales',
      refersTo: '=Sheet1!D11'
    });

    if (success) {
      console.log('Named range added successfully');
    } else {
      console.log('Failed — name may already exist');
    }

    // Use named range in a formula
    this.spreadsheet.updateCell(
      { value: '=SUM(SalesData)' },
      'B12'
    );
  }
}
```

---

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
const added = this.spreadsheet.addDefinedName({
  name: 'HeaderRow',
  refersTo: '=Sheet1!A1:D1',
  comment: 'Table column headers'
});
```

---

### `removeDefinedName(name, scope)`

Removes a named range from the workbook or sheet.

**Parameters**:
- `name` (string) — range name to remove
- `scope` (string, optional) — `'Workbook'` or sheet name; defaults to `'Workbook'`

**Returns**: `boolean` — `true` if removed, `false` if not found

```typescript
const removed = this.spreadsheet.removeDefinedName('SalesTotal', 'Workbook');
```

---

### `definedNames` Property

Array of all defined names in the workbook.

```typescript
const allRanges = this.spreadsheet.definedNames;
allRanges.forEach((range: DefineNameModel) => {
  console.log(`${range.name} → ${range.refersTo}`);
});
```

---

## DefineNameModel Structure

```typescript
interface DefineNameModel {
  name: string;          // Unique range name
  refersTo: string;      // Reference (must start with '=')
  comment?: string;      // Optional description
  scope?: string;        // 'Workbook' (default) or sheet name
}
```

---

## Usage Examples

### Simple Named Range (Single Cell)

```typescript
this.spreadsheet.addDefinedName({
  name: 'ReportDate',
  refersTo: '=Sheet1!A1'
});

// Use in formula
this.spreadsheet.updateCell({ value: '=ReportDate' }, 'B2');
```

---

### Named Range for Table Data

```typescript
this.spreadsheet.addDefinedName({
  name: 'SalesTable',
  refersTo: '=Sheet1!A1:D100'
});

this.spreadsheet.addDefinedName({
  name: 'SalesAmount',
  refersTo: '=Sheet1!D2:D100'
});

this.spreadsheet.addDefinedName({
  name: 'SalesDate',
  refersTo: '=Sheet1!A2:A100'
});

// Use in summary calculation
this.spreadsheet.updateCell(
  { value: '=SUM(SalesAmount)' },
  'F2'
);
```

---

### Cross-Sheet Named Range

```typescript
this.spreadsheet.addDefinedName({
  name: 'GlobalTargets',
  refersTo: '=Summary!B1:B12'   // Reference 'Summary' sheet
});

// Use in current sheet
this.spreadsheet.updateCell(
  { value: '=AVERAGE(GlobalTargets)' },
  'E5'
);
```

---

### Named Range with Comment

```typescript
this.spreadsheet.addDefinedName({
  name: 'Q4Revenue',
  refersTo: '=Sheet1!C1:C13',
  comment: 'Fourth quarter revenue totals by month'
});
```

---

### Sheet-Scoped Named Range

```typescript
// Only visible/usable in Sheet1
this.spreadsheet.addDefinedName({
  name: 'LocalData',
  refersTo: '=Sheet1!A1:A50',
  scope: 'Sheet1'
});
```

---

### List All Named Ranges

```typescript
const allRanges = this.spreadsheet.definedNames;

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

---

### Find and Remove Named Range

```typescript
const rangeName = 'OldData';
const found = this.spreadsheet.definedNames.find(
  (r: DefineNameModel) => r.name === rangeName
);

if (found) {
  const removed = this.spreadsheet.removeDefinedName(rangeName, 'Workbook');
  console.log(removed ? 'Removed' : 'Failed to remove');
} else {
  console.log('Range not found');
}
```

---

### Replace Named Range

```typescript
const rangeName = 'SalesData';

// Remove old reference
this.spreadsheet.removeDefinedName(rangeName, 'Workbook');

// Add updated reference
this.spreadsheet.addDefinedName({
  name: rangeName,
  refersTo: '=Sheet1!B1:B25'   // Updated range
});
```

---

## Reference Format Rules

| Format | Example | Valid |
|---|---|---|
| Must include `=` prefix | `'=Sheet1!A1:A10'` | ✅ |
| Without `=` prefix | `'Sheet1!A1:A10'` | ❌ |
| Sheet name with spaces | `'=\'Sales Data\'!A1:A10'` | ✅ |
| Single cell | `'=Sheet1!A1'` | ✅ |
| Range | `'=Sheet1!A1:D100'` | ✅ |
| Entire column | `'=Sheet1!A:A'` | ✅ |
| Entire row | `'=Sheet1!1:1'` | ✅ |

---

## Name Rules

| Rule | Valid | Invalid |
|---|---|---|
| Alphanumeric and underscore | `'Sales_Q1'`, `'Total2024'` | `'Sales Q1'` |
| No leading numbers | `'Q1_2024'` | `'1stQuarter'` |
| No reserved words | `'MySUM'` | `'SUM'`, `'AVERAGE'` |
| Case-insensitive | `'SalesData'` = `'salesdata'` | — |
| Max 255 characters | `'Q4_Revenue_2024'` | — |

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[NAME]` | Named range identifier | `'SalesTotal'`, `'Q4Revenue'`, `'TargetCells'` |
| `[CELL_OR_RANGE]` | Cell or range reference | `'Sheet1!A1'`, `'Sheet1!B2:B10'` |
| `[SHEET_NAME]` | Sheet name for cross-sheet reference | `'Sheet1'`, `'Reports'`, `'Summary'` |
| `[SCOPE]` | Scope of named range | `'Workbook'` or sheet name for sheet-level scope |

---

## Notes

- **Use `@ViewChild`** — Access the `SpreadsheetComponent` instance via `@ViewChild` to call defined name methods
- **Register in `(created)`** — Always add named ranges inside the `(created)` event to ensure the spreadsheet is fully initialized
- **Pre-define via property** — Use `[definedNames]` binding on `<ejs-spreadsheet>` to declare ranges at initialization
- **Best Practice** — Use descriptive names (`'Q4Sales'` not `'d1'`)
- **Best Practice** — Use UPPERCASE for constants, camelCase for ranges (`'PI'` vs `'salesData'`)
- **Best Practice** — Prefix sheet-scoped names with sheet name (`'Sheet1_Summary'`)
- **Gotcha** — Name must be unique within scope (workbook or sheet)
- **Gotcha** — `addDefinedName` returns `false` silently if name exists — always check return value
- **Gotcha** — References must include sheet name (`'=Sheet1!A1'` not `'=A1'`)
- **Gotcha** — Renaming sheets breaks existing defined range references

---

## Error Handling

```typescript
safeAddDefinedName(name: string, reference: string): boolean {
  // Check if already exists
  const exists = this.spreadsheet.definedNames.some(
    (r: DefineNameModel) => r.name === name
  );

  if (exists) {
    console.warn(`Named range "${name}" already exists`);
    return false;
  }

  // Try to add
  const added = this.spreadsheet.addDefinedName({
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
this.safeAddDefinedName('TotalRevenue', '=Sheet1!D1:D100');
```