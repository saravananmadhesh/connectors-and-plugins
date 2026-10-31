# Number Formatting

Apply numeric, currency, percentage, date, time, and custom formats using `numberFormat()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { getFormatFromType } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template: 
  `<ejs-spreadsheet #spreadsheet [allowNumberFormatting]="true">
    <e-sheets>
      <e-sheet name="Finance"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  applyFormats(): void {
    // Built-in types
    this.spreadsheet.numberFormat(getFormatFromType('Currency'),   'B2');
    this.spreadsheet.numberFormat(getFormatFromType('Accounting'), 'C2');
    this.spreadsheet.numberFormat(getFormatFromType('Percentage'), 'D2');
    this.spreadsheet.numberFormat(getFormatFromType('ShortDate'),  'E2');
    this.spreadsheet.numberFormat(getFormatFromType('LongDate'),   'F2');
    this.spreadsheet.numberFormat(getFormatFromType('Time'),       'G2');
    this.spreadsheet.numberFormat(getFormatFromType('Fraction'),   'H2');
    this.spreadsheet.numberFormat(getFormatFromType('Scientific'), 'I2');
    this.spreadsheet.numberFormat(getFormatFromType('Text'),       'J2');

    // Custom format strings
    this.spreadsheet.numberFormat('$#,##0.00',              'B3'); // Currency
    this.spreadsheet.numberFormat('0.00%',                  'D3'); // Percentage
    this.spreadsheet.numberFormat('mm/dd/yyyy',             'E3'); // ShortDate
    this.spreadsheet.numberFormat('dddd, mmmm dd, yyyy',   'F3'); // LongDate
    this.spreadsheet.numberFormat('hh:mm:ss AM/PM',         'G3'); // Time
    this.spreadsheet.numberFormat('0.00E+00',               'I3'); // Scientific
    this.spreadsheet.numberFormat('@',                      'J3'); // Text

    // Conditional color format
    this.spreadsheet.numberFormat('[Red][<0]0;[Green][>0]0', 'K2');
  }
}
```

## API Reference

### numberFormat(format, range)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `format` | `string` | Format string or result of `getFormatFromType()` | `'$#,##0.00'`, `getFormatFromType('Currency')` |
| `range` | `string` | Target cell or range | `'B2'`, `'B2:B10'` |

### Built-in Format Types

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

- `[allowNumberFormatting]="true"` must be set at initialization
- Percentage format multiplies value by 100 — store `0.5` to display `50%`
- `m` = month in date context, minutes in time context — use `mm` to avoid ambiguity
- Negative accounting values show in parentheses, not with minus sign