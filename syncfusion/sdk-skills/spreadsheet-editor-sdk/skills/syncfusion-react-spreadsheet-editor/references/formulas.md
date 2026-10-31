# Formulas & Calculations

Use the built-in formula engine to perform calculations, aggregates, and references in cells.

---

## Minimal Code

```tsx
import React, { useRef } from 'react';
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective
} from '@syncfusion/ej2-react-spreadsheet';

function App() {
  const spreadsheetRef = useRef<SpreadsheetComponent>(null);

  const onCreated = (): void => {
    const spreadsheet = spreadsheetRef.current!;

    // === Option 1: Enter formula in a cell programmatically ===
    spreadsheet.updateCell(
      { formula: '=SUM(B2:B10)' },
      'B11'
    );

    // === Option 2: Enter formula in multiple cells ===
    const salesData = [
      { Product: 'Laptop', Price: 1200, Quantity: 5 },
      { Product: 'Mouse', Price: 25, Quantity: 20 },
      { Product: 'Keyboard', Price: 80, Quantity: 10 }
    ];

    spreadsheet.sheets[0].ranges = [
      {
        dataSource: salesData,
        startCell: 'A2'
      }
    ];

    for (let i = 0; i < salesData.length; i++) {
      const row = i + 2;

      spreadsheet.updateCell(
        { formula: '=B' + row + '*C' + row },
        'D' + row
      );
    }

    spreadsheet.updateCell(
      { formula: '=SUM(D2:D4)' },
      'D5'
    );

    // === Option 3: Add Named range example ===
    spreadsheet.addDefinedName({
      name: 'SalesRange',
      refersTo: '=Sheet1!B2:B4'
    });

    spreadsheet.updateCell(
      { formula: '=SUM(SalesRange)' },
      'E2'
    );

    // === Option 4: Aggregate display ===
    // showAggregate displays aggregates
    // in the status bar when cells are selected.

    // === Option 5: Custom Functions ===
    function calculatePercentage(firstValue: number, secondValue: number): number {
      return firstValue / secondValue;
    }

    spreadsheet.addCustomFunction(
      calculatePercentage,
      'PERCENTAGE'
    );

    spreadsheet.updateCell(
      { formula: '=PERCENTAGE(C2,D2)' },
      'E2'
    );

    // === Option 6: Compute Expression ===
    const result = spreadsheet.computeExpression(
      '=SUM(A1:A10)'
    );

    spreadsheet.updateCell(
      { value: result.toString() },
      'B12'
    );
  };

  return (
    <SpreadsheetComponent
      ref={spreadsheetRef}
      showAggregate={true}
      created={onCreated}
    >
      <SheetsDirective>
        <SheetDirective name="Sheet1" />
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}

export default App;
```

---

## Placeholders

| Placeholder | Description | Example |
|------------|-------------|----------|
| `[FORMULA]` | Excel formula string | `'=SUM(A1:A10)'` |
| `[RANGE]` | Cell range | `'A1:D100'` |
| `[NAMED_RANGE]` | User-defined range name | `'SalesData'` |
| `[FUNCTION_NAME]` | Formula name | `'SUM'`, `'AVERAGE'` |
| `[ARGUMENTS]` | Formula arguments | `'A1:A10'` |

## Custom Functions

Register custom formulas using:

```tsx
spreadsheet.addCustomFunction(
  functionName,
  customFormulaName
);
```

Custom functions can be used like built-in formulas and are supported by `computeExpression()`.

## Compute Expression

Use `computeExpression()` to evaluate formulas without storing them in worksheet cells.

```tsx
spreadsheet.computeExpression(
  '=SUM(A1:A10)'
);
```

## Calculation Mode

### Automatic

```tsx
<SpreadsheetComponent calculationMode="Automatic"></SpreadsheetComponent>
```

### Manual

```tsx
<SpreadsheetComponent calculationMode="Manual"></SpreadsheetComponent>
```

---

## Supported Formula Categories

### Math & Trigonometry

```tsx
'=SUM(A1:A10)'              // Sum of a range
'=SUMIF(A1:A10,">5")'       // Conditional sum
'=ROUND(A1,2)'              // Round to 2 decimal places
'=ABS(A1)'                  // Absolute value
'=MOD(A1,3)'                // Remainder
'=POWER(A1,2)'              // A1 squared
'=SQRT(A1)'                 // Square root
```

### Statistical

```tsx
'=AVERAGE(A1:A10)'          // Average of range
'=AVERAGEIF(A1:A10,">5")'   // Conditional average
'=COUNT(A1:A10)'            // Count numeric cells
'=COUNTA(A1:A10)'           // Count non-empty cells
'=MAX(A1:A10)'              // Maximum value
'=MIN(A1:A10)'              // Minimum value
'=MEDIAN(A1:A10)'           // Median value
```

### Logical

```tsx
'=IF(A1>0,"Positive","Negative")'   // Conditional
'=AND(A1>0,B1>0)'                   // Logical AND
'=OR(A1>0,B1>0)'                    // Logical OR
'=NOT(A1>0)'                        // Logical NOT
'=IFERROR(A1/B1,0)'                 // Error handling
'=IFS(A1>90,"A",A1>80,"B")'         // Multiple conditions
'=SWITCH(A1,1,"One",2,"Two")'       // Match value
'=XOR(A1>0,B1>0)'                   // Exclusive OR
'=IFNA(A1/B1,0)'                    // Handle #N/A errors
```

### Lookup & Reference

```tsx
'=VLOOKUP(A1,B1:D10,2,FALSE)'      // Vertical lookup
'=HLOOKUP(A1,B1:D10,2,FALSE)'      // Horizontal lookup
'=INDEX(A1:D10,2,3)'              // Index lookup
'=MATCH(A1,B1:B10,0)'             // Match position
'=OFFSET(A1,1,0,3,1)'             // Offset reference
'=XLOOKUP(A1,B1:B10,C1:C10)'      // Modern lookup
'=XMATCH(A1,B1:B10)'              // Match position
'=SORT(A1:D10)'                   // Sort range
'=UNIQUE(A1:A10)'                 // Unique values
'=FORMULATEXT(A1)'                // Return formula text
```

### Text

```tsx
'=CONCATENATE(A1," ",B1)'         // Join text
'=LEFT(A1,3)'                    // Left characters
'=RIGHT(A1,3)'                   // Right characters
'=MID(A1,2,4)'                   // Middle characters
'=LEN(A1)'                       // String length
'=UPPER(A1)'                     // Uppercase
'=LOWER(A1)'                     // Lowercase
'=TRIM(A1)'                      // Remove spaces
'=CONCAT(A1:A5)'                 // Concatenate range
'=TEXTJOIN(",",TRUE,A1:A10)'     // Join text with separator
'=TEXTBEFORE(A1,"-")'            // Text before delimiter
'=ARRAYTOTEXT(A1:C3)'            // Convert array to text
'=VALUETOTEXT(A1)'               // Convert value to text
```

### Date & Time

```tsx
'=TODAY()'                         // Current date
'=NOW()'                           // Current date and time
'=DATE(2025,1,1)'                  // Create a specific date
'=YEAR(A1)'                        // Extract year from date
'=MONTH(A1)'                       // Extract month from date
'=DAY(A1)'                         // Extract day from date
'=DATEDIF(A1,B1,"D")'              // Days between two dates
'=NETWORKDAYS(A1,B1)'              // Working days between two dates
'=NETWORKDAYS.INTL(A1,B1)'         // Working days with custom weekend settings
'=WORKDAY(A1,10)'                  // Date after specified working days
'=WORKDAY.INTL(A1,10)'             // Date after working days with custom weekend settings
'=YEARFRAC(A1,B1)'                 // Fractional years between two dates
'=EDATE(A1,3)'                     // Date shifted by specified number of months
'=EOMONTH(A1,1)'                   // Last day of a future or previous month
```

### Financial

```tsx
'=PMT(5%/12,60,-10000)'            // Loan payment calculation
'=FV(5%/12,60,-100)'               // Future value of investment
'=PV(5%/12,60,-100)'               // Present value of investment
'=NPV(10%,A1:A10)'                 // Net present value
'=IRR(A1:A10)'                     // Internal rate of return
'=RATE(60,-200,10000)'             // Interest rate calculation
'=XIRR(A1:A10,B1:B10)'             // Internal rate of return for irregular cash flows
'=XNPV(10%,A1:A10,B1:B10)'         // Net present value for irregular cash flows
```

### Engineering

```tsx
'=CONVERT(100,"F","C")'            // Unit conversion
'=DEC2HEX(255)'                    // Decimal to hexadecimal
'=HEX2DEC("FF")'                   // Hexadecimal to decimal
'=BIN2DEC("1010")'                 // Binary to decimal
'=COMPLEX(3,4)'                    // Create complex number
```

### Database

```tsx
'=DSUM(A1:F20,"Sales",H1:I2)'      // Sum database records
'=DCOUNT(A1:F20,"Sales",H1:I2)'    // Count database records
'=DCOUNTA(A1:F20,"Sales",H1:I2)'   // Count non-blank database records
'=DMAX(A1:F20,"Sales",H1:I2)'      // Maximum value in database
'=DMIN(A1:F20,"Sales",H1:I2)'      // Minimum value in database
```

### Information

```tsx
'=ISBLANK(A1)'                     // Check if cell is blank
'=ISNUMBER(A1)'                    // Check if cell contains number
'=ISTEXT(A1)'                      // Check if cell contains text
'=ISERROR(A1)'                     // Check if cell contains error
'=ISNA(A1)'                        // Check if cell contains #N/A error
'=TYPE(A1)'                        // Return type of value
'=CELL("address",A1)'              // Return cell address
```

## Cell Reference Types

```tsx
// Relative reference — shifts when copied
'=A1+B1'

// Absolute reference — stays fixed when copied
'=$A$1+$B$1'

// Mixed reference — one part fixed
'=$A1'    // Column fixed, row shifts
'=A$1'    // Row fixed, column shifts

// Cross-sheet reference
'=Sheet2!A1'
'=Sheet2!A1:B10'
```

### Documentation Link

Refer to the following documentation link for more information about formulas and calculations in Spreadsheet:
https://helpstaging.syncfusion.com/document-processing/excel/spreadsheet/react/formulas-and-calculations

## Culture-Based Formula Separators

Use the `listSeparator` property through the configured Spreadsheet locale to support culture-specific formula separators.

```tsx
<SpreadsheetComponent locale="de"></SpreadsheetComponent>
```

## Notes

- Use named ranges for frequently referenced ranges.
- Named ranges must include the `=` prefix in `refersTo`.
- Named ranges should be defined before they are used in formulas.
- Custom functions can be registered using `addCustomFunction()`.
- `computeExpression()` evaluates formulas without storing them in cells.
- `showAggregate` displays aggregates in the status bar when cells are selected.
- Cross-sheet references use `SheetName!CellAddress` syntax.
- Calculation modes supported: `Automatic` and `Manual`.
- Supports built-in Excel-compatible formula categories.