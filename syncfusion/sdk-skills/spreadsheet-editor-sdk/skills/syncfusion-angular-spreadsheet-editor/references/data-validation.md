# Data Validation

Apply rules to restrict or validate the type of data entered into cells (e.g., whole numbers, lists, dates, custom formulas).

## Table of Contents

- [Setup](#setup)
- [Minimal Code](#minimal-code)
  - [Component Template](#component-template)
  - [Component Class](#component-class)
- [Validation Examples](#validation-examples)
  - [Example 1: Whole Number Range](#example-1-whole-number-range)
  - [Example 2: List of Allowed Values](#example-2-list-of-allowed-values)
  - [Example 3: Date Constraint](#example-3-date-constraint)
  - [Example 4: Custom Formula](#example-4-custom-formula)
  - [Example 5: Remove Data Validation](#example-5-remove-data-validation)
  - [Example 6: Add Invalid Highlight](#example-6-add-invalid-highlight)
  - [Example 7: Remove Invalid Highlight](#example-7-remove-invalid-highlight)
- [Configuration Properties](#configuration-properties)
- [Placeholders](#placeholders)
- [Notes](#notes)

---

## Setup

Install the Syncfusion Spreadsheet package:

```bash
npm install @syncfusion/ej2-angular-spreadsheet
```
---

## Minimal Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet
    #spreadsheet
    [allowDataValidation]="true"
    (created)="onCreated()">
    <e-sheets>
      <e-sheet name="Orders"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet')
  spreadsheet!: SpreadsheetComponent;

  onCreated(): void {
    // Whole number between 1 and 100
    this.spreadsheet.addDataValidation(
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

    // List dropdown
    this.spreadsheet.addDataValidation(
      {
        type: 'List',
        value1: 'Pending,Shipped,Delivered',
        inCellDropDown: true
      },
      'C2:C50'
    );
  }
}
```

---

## Validation Examples

### Example 1: Whole Number Range

```typescript
this.spreadsheet.addDataValidation(
  {
    type: 'WholeNumber',
    operator: 'Between',
    value1: '[MIN_VALUE]',   // e.g., '1'
    value2: '[MAX_VALUE]',   // e.g., '100'
    ignoreBlank: true,
    inCellDropDown: false
  },
  '[RANGE]'                  // e.g., 'B2:B50'
);
```

---

### Example 2: List of Allowed Values

```typescript
this.spreadsheet.addDataValidation(
  {
    type: 'List',
    value1: '[LIST_VALUES]',  // e.g., 'Pending,Shipped,Delivered'
    inCellDropDown: true
  },
  '[RANGE]'                   // e.g., 'C2:C50'
);
```

---

### Example 3: Date Constraint

```typescript
this.spreadsheet.addDataValidation(
  {
    type: 'Date',
    operator: 'GreaterThan',
    value1: '[DATE_VALUE]'    // e.g., '01/01/2024'
  },
  '[RANGE]'                   // e.g., 'D2:D50'
);
```

---

### Example 4: Custom Formula

```typescript
this.spreadsheet.addDataValidation(
  {
    type: 'Formula',
    value1: '[FORMULA]'       // e.g., '=AND(ISNUMBER(A2),A2>0)'
  },
  '[RANGE]'                   // e.g., 'A2:A50'
);
```

---

### Example 5: Remove Data Validation

```typescript

// Remove validation from a specific range
this.spreadsheet.removeDataValidation('[RANGE]');   // e.g., 'B2:B50'

// Remove validation from entire sheet (omit range)
this.spreadsheet.removeDataValidation();
```

---

### Example 6: Add Invalid Highlight

```typescript

// Highlight invalid cells in a specific range
this.spreadsheet.addInvalidHighlight('[RANGE]');    // e.g., 'B2:B50'

// Highlight invalid cells in entire sheet (omit range)
this.spreadsheet.addInvalidHighlight();
```

---

### Example 7: Remove Invalid Highlight

```typescript

// Remove highlight from a specific range
this.spreadsheet.removeInvalidHighlight('[RANGE]'); // e.g., 'B2:B50'

// Remove highlight from entire sheet (omit range)
this.spreadsheet.removeInvalidHighlight();
```

---

## Configuration Properties

| Property | Type | Description | Example |
|---|---|---|---|
| `allowDataValidation` | `boolean` | Enable/disable data validation on the spreadsheet | `true`, `false` |
| `type` | `ValidationValueType` | Validation rule type | `'List'`, `'WholeNumber'`, `'Decimal'`, `'Date'`, `'Time'`, `'TextLength'`, `'Formula'` |
| `operator` | `OperatorType` | Comparison operator for the rule | `'Between'`, `'NotBetween'`, `'EqualTo'`, `'NotEqualTo'`, `'GreaterThan'`, `'LessThan'`, `'GreaterThanOrEqualTo'`, `'LessThanOrEqualTo'` |
| `value1` | `string` | First constraint value | `'100'`, `'Pending,Shipped,Delivered'`, `'01/01/2024'` |
| `value2` | `string` | Second constraint value (used with `Between`) | `'500'` |
| `ignoreBlank` | `boolean` | Skip validation for blank cells | `true`, `false` |
| `inCellDropDown` | `boolean` | Show dropdown in cell (for `List` type only) | `true`, `false` |
| `isHighlighted` | `boolean` | Highlight invalid cells automatically | `true`, `false` |

---

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[RANGE]` | Cell range for validation rule | `'B2:B100'`, `'A1:D50'` |
| `[MIN_VALUE]` | Minimum allowed value | `'1'`, `'0'`, `'100'` |
| `[MAX_VALUE]` | Maximum allowed value | `'100'`, `'500'`, `'1000'` |
| `[LIST_VALUES]` | Comma-separated list of allowed values | `'Pending,Shipped,Delivered'` |
| `[DATE_VALUE]` | Date constraint value (MM/DD/YYYY) | `'01/01/2024'`, `'12/31/2025'` |
| `[FORMULA]` | Custom formula for validation | `'=AND(ISNUMBER(A2),A2>0)'` |

---

## Notes

- **Enable validation** — Set `[allowDataValidation]="true"` on `<ejs-spreadsheet>` before calling any validation methods
- **Use `@ViewChild`** — Access the `SpreadsheetComponent` instance via `@ViewChild` to call validation methods
- **Register in `(created)`** — Always add validation rules inside the `(created)` event to ensure the spreadsheet is fully initialized
- **Client-side only** — Validation is client-side and does not prevent pasting invalid data
- **List limit** — Lists with 256+ items may not display correctly in the dropdown
- **Criteria types** — Supported types: `List`, `WholeNumber`, `Decimal`, `Date`, `Time`, `TextLength`, `Formula`