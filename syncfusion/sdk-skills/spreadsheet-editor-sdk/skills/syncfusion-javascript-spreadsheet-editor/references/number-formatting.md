# Number Formatting

Apply numeric, currency, percentage, date, time, and custom formats to cells.

## Minimal Code

```typescript
import { Spreadsheet, getFormatFromType } from '@syncfusion/ej2-spreadsheet';

const spreadsheet = new Spreadsheet({
  allowNumberFormatting: true,
  sheets: [{ name: 'Finance' }]
});

spreadsheet.appendTo('#spreadsheet');
```

## Apply Format

```typescript
// Built-in types
spreadsheet.numberFormat(getFormatFromType('Currency'), 'B2');
spreadsheet.numberFormat(getFormatFromType('Accounting'), 'C2');
spreadsheet.numberFormat(getFormatFromType('Percentage'), 'D2');
spreadsheet.numberFormat(getFormatFromType('ShortDate'), 'E2');
spreadsheet.numberFormat(getFormatFromType('LongDate'), 'F2');
spreadsheet.numberFormat(getFormatFromType('Time'), 'G2');
spreadsheet.numberFormat(getFormatFromType('Fraction'), 'H2');
spreadsheet.numberFormat(getFormatFromType('Scientific'), 'I2');
spreadsheet.numberFormat(getFormatFromType('Text'), 'J2');

// Equivalent custom format strings
spreadsheet.numberFormat('$#,##0.00', 'B2');           // Currency
spreadsheet.numberFormat('$ #,##0.00', 'C2');          // Accounting
spreadsheet.numberFormat('0.00%', 'D2');               // Percentage
spreadsheet.numberFormat('mm/dd/yyyy', 'E2');          // ShortDate
spreadsheet.numberFormat('dddd, mmmm dd, yyyy', 'F2'); // LongDate
spreadsheet.numberFormat('hh:mm:ss AM/PM', 'G2');      // Time
spreadsheet.numberFormat('# ?/?', 'H2');               // Fraction
spreadsheet.numberFormat('0.00E+00', 'I2');            // Scientific
spreadsheet.numberFormat('@', 'J2');                   // Text

// Conditional color format
spreadsheet.numberFormat('[Red][<0]0;[Green][>0]0', 'K2');
```

## Built-in Format Types

| Type | Custom Equivalent | Output Example |
|---|---|---|
| `Currency` | `$#,##0.00` | $1,234.56 |
| `Accounting` | `$ #,##0.00` | $ 1,234.56 |
| `Percentage` | `0.00%` | 50.00% |
| `ShortDate` | `mm/dd/yyyy` | 03/15/2026 |
| `LongDate` | `dddd, mmmm dd, yyyy` | Monday, March 15, 2026 |
| `Time` | `hh:mm:ss AM/PM` | 02:30:45 PM |
| `Fraction` | `# ?/?` | 3/4 |
| `Scientific` | `0.00E+00` | 1.23E+03 |
| `Text` | `@` | as-is |

## Notes
- `m` = month in date context, minutes in time context — use `mm` to avoid ambiguity
- Percentage format multiplies value by 100 — store `0.5` to display `50%`
- Negative accounting values show in parentheses, not with minus sign