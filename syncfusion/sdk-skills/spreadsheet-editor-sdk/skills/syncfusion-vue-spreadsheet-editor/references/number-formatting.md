# Number Formatting

Apply numeric, currency, percentage, date, time, fraction, scientific, and custom formats to cells.

## Minimal Code
```vue
<template>
<ejs-spreadsheet ref="spreadsheet" :allowNumberFormatting="true" :created="onCreated">
  <e-sheets>
    <e-sheet name="Finance">
      <e-ranges><e-range :dataSource="data" startCell="A1" /></e-ranges>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent, SheetsDirective, SheetDirective,
RangesDirective, RangeDirective, getFormatFromType
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent, "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective, "e-ranges": RangesDirective, "e-range": RangeDirective
},

data: () => ({
  data: [
    {Item:"Laptop",Cur:1200,Acc:1200,Pct:0.15,SD:"1/12/2025",LD:"January 12, 2025",Time:"10:30 AM",Frac:0.75,Sci:4523000,CC:1200,CP:0.15,CD:"12-Jan-2025",CT:"10:30 AM",Cond:-5},
    {Item:"Mouse",Cur:25,Acc:25,Pct:0.3,SD:"2/14/2025",LD:"February 14, 2025",Time:"2:45 PM",Frac:0.5,Sci:980000,CC:25,CP:0.3,CD:"14-Feb-2025",CT:"2:45 PM",Cond:10},
    {Item:"Keyboard",Cur:80,Acc:80,Pct:0.22,SD:"3/1/2025",LD:"March 1, 2025",Time:"11:00 AM",Frac:0.33,Sci:1520000,CC:80,CP:0.22,CD:"1-Mar-2025",CT:"11:00 AM",Cond:-2},
    {Item:"Chair",Cur:150,Acc:150,Pct:0.12,SD:"4/05/2025",LD:"April 5, 2025",Time:"3:15 PM",Frac:0.66,Sci:200000,CC:150,CP:0.12,CD:"05-Apr-2025",CT:"3:15 PM",Cond:5},
    {Item:"Desk",Cur:300,Acc:300,Pct:0.09,SD:"5/20/2025",LD:"May 20, 2025",Time:"9:30 AM",Frac:0.5,Sci:1000000,CC:300,CP:0.09,CD:"20-May-2025",CT:"9:30 AM",Cond:8},
    {Item:"Monitor",Cur:450,Acc:450,Pct:0.25,SD:"6/15/2025",LD:"June 15, 2025",Time:"4:00 PM",Frac:0.25,Sci:2500000,CC:450,CP:0.25,CD:"15-Jun-2025",CT:"4:00 PM",Cond:-1},
    {Item:"Tablet",Cur:220,Acc:220,Pct:0.18,SD:"7/10/2025",LD:"July 10, 2025",Time:"12:45 PM",Frac:0.8,Sci:4900000,CC:220,CP:0.18,CD:"10-Jul-2025",CT:"12:45 PM",Cond:3},
    {Item:"Phone",Cur:700,Acc:700,Pct:0.27,SD:"8/02/2025",LD:"August 2, 2025",Time:"6:25 PM",Frac:0.9,Sci:530000,CC:700,CP:0.27,CD:"02-Aug-2025",CT:"6:25 PM",Cond:-3},
    {Item:"Printer",Cur:180,Acc:180,Pct:0.14,SD:"9/22/2025",LD:"September 22, 2025",Time:"1:05 PM",Frac:0.4,Sci:120000,CC:180,CP:0.14,CD:"22-Sep-2025",CT:"1:05 PM",Cond:6},
    {Item:"Scanner",Cur:350,Acc:350,Pct:0.19,SD:"10/12/2025",LD:"October 12, 2025",Time:"8:20 AM",Frac:0.55,Sci:7800000,CC:350,CP:0.19,CD:"12-Oct-2025",CT:"8:20 AM",Cond:-4}
  ]
}),

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;

    // Built‑in formats
    spreadsheet.numberFormat(getFormatFromType("Currency"), "B2:B20");
    spreadsheet.numberFormat(getFormatFromType("Accounting"), "C2:C20");
    spreadsheet.numberFormat(getFormatFromType("Percentage"), "D2:D20");
    spreadsheet.numberFormat(getFormatFromType("ShortDate"), "E2:E20");
    spreadsheet.numberFormat(getFormatFromType("LongDate"), "F2:F20");
    spreadsheet.numberFormat(getFormatFromType("Time"), "G2:G20");
    spreadsheet.numberFormat(getFormatFromType("Fraction"), "H2:H20");
    spreadsheet.numberFormat(getFormatFromType("Scientific"), "I2:I20");

    // Custom formats
    spreadsheet.numberFormat("$#,##0.00", "J2:J20");
    spreadsheet.numberFormat("0%", "K2:K20");
    spreadsheet.numberFormat("dd-MMM-yyyy", "L2:L20");
    spreadsheet.numberFormat("hh:mm AM/PM", "M2:M20");
    spreadsheet.numberFormat("[Red][<=0]0;[Green][>0]0", "N2:N20");
  }
}
};
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[FORMAT_TYPE]` | Built-in format type | `'Currency'`, `'Percentage'`, `'ShortDate'`, `'Time'` |
| `[FORMAT_STRING]` | Custom format code | `'$#,##0.00'`, `'dd-MMM-yyyy'`, `'0%'` |
| `[RANGE]` | Cell range to format | `'B2:B20'`, `'A1:Z100'` |
| `[WIDTH]` | Decimal places or width | `0`, `00`, `000` |
| `[SYMBOL]` | Currency or text symbol | `'$'`, `'€'`, `'£'` |

## Format String Syntax

Number format codes use Excel-style format strings. Here's the complete reference:

### Currency Formats

```vue
'$#,##0.00'           // $1,234.56 (USD, 2 decimals)
'$#,##0'              // $1,234 (USD, no decimals)
'$ #,##0.00'          // $ 1,234.56 (space before number)
'[$$-409]#,##0.00'    // USD with currency code
'€#,##0.00'           // €1,234.56 (Euro)
'£#,##0.00'           // £1,234.56 (Pounds)
'¥#,##0'              // ¥1235 (Yen, no decimals)
```

### Percentage Formats

```vue
'0%'                  // 50% (multiplies value by 100)
'0.00%'               // 50.00%
'0.0"%"'              // 50.0%
```

### Decimal Places

```vue
'0'                   // No decimals: 1235
'0.0'                 // 1 decimal: 1234.6
'0.00'                // 2 decimals: 1234.56
'0.000'               // 3 decimals: 1234.567
'#,##0.##'            // 2 decimals max, 0 decimals min
```

### Thousands Separator

```vue
'#,##0'               // 1,234,567 (commas)
'#,##0.00'            // 1,234,567.89
'#, ##0'              // 1, 235 (space separator)
```

### Date Formats

```vue
'mm/dd/yyyy'          // 03/15/2026
'MM/dd/yyyy'          // 03/15/2026 (same)
'dd-MMM-yyyy'         // 15-Mar-2026
'dd-mmmm-yy'          // 15-March-26
'mmmm dd, yyyy'       // March 15, 2026
'dddd, mmmm dd, yyyy' // Monday, March 15, 2026
'yyyy-mm-dd'          // 2026-03-15 (ISO format)
'm/d'                 // 3/15 (short, no year)
```

### Time Formats

```vue
'hh:mm AM/PM'         // 02:30 PM
'hh:mm:ss'            // 14:30:45
'h:mm'                // 2:30 (no leading zero, no AM/PM)
'h:mm:ss AM/PM'       // 2:30:45 PM
'[h]:mm:ss'           // 26:30:45 (elapsed time, hours > 24)
'mm:ss'               // 30:45 (minutes:seconds)
'[mm]:ss'             // 150:45 (elapsed minutes)
```

### Fractions

```vue
'# ?/?'               // 3/4 (one digit numerator/denominator)
'# ??/??' '           // 15/32 (two digit)
'# ?/2'               // 3/2 (halves)
'# ?/4'               // 3/4 (quarters)
'# ?/8'               // 5/8 (eighths)
'# ?/16'              // 11/16 (sixteenths)
```

### Scientific Notation

```vue
'0.00E+00'            // 1.23E+03
'0.0E+0'              // 1.2E+3
'0.00E-00'            // 1.23E+03 (alternative)
```

### Text with Numbers

```vue
'0" items"'           // 5 items
'0.00" kg"'           // 12.50 kg
'"Rank: "#'           // Rank: 5
'"Count: "#,##0'      // Count: 1,234
'0" out of 100"'      // 85 out of 100
```

### Conditional Formatting (Color by Value)

```vue
'[Red][<0]0;[Green][>0]0;[Blue]0'
// Conditions separated by semicolon
// [Color][Condition]Format;...
// Red if <0, Green if >0, Blue if =0

'[Red]#,##0.00;[Black]-#,##0.00'
// Red for positive numbers
// Black for negative numbers

'[Green][>100]0;[Red][<0]0;0'
// Green if >100, Red if <0, default for rest
```

### Special Formats

```vue
'@'                   // Text (display as-is)
'# ##0'               // Thousands separator without decimals
'0.00" EUR"'          // Append currency text
'"$"#,##0.00_);("$"#,##0.00)' // Accounting (parentheses for negative)
```

## Built-in Format Types (via getFormatFromType)

```vue
//import getFormatFromType from '@syncfusion/ej2-vue-spreadsheet' to get the format code from format type.
getFormatFromType('Currency')      // 'Currency' format
getFormatFromType('Accounting')    // Accounting format
getFormatFromType('Percentage')    // Percentage format
getFormatFromType('ShortDate')     // mm/dd/yyyy
getFormatFromType('LongDate')      // dddd, mmmm dd, yyyy
getFormatFromType('Time')          // hh:mm:ss
getFormatFromType('Fraction')      // # ?/?
getFormatFromType('Scientific')    // 0.00E+00
getFormatFromType('Text')          // @ (text)
```

## Notes

- **Date Codes**: 
  - `d` = day (1-31), `dd` = day (01-31)
  - `m` = month (1-12), `mm` = month (01-12), `mmm` = abbreviation (Jan), `mmmm` = full (January)
  - `y` = year (1-digit), `yy` = year (2-digit), `yyyy` = year (4-digit)

- **Time Codes**:
  - `h` = hour (0-23), `hh` = hour with leading zero
  - `m` = minute, `mm` = minute with leading zero
  - `s` = second, `ss` = second with leading zero
  - `AM/PM` displays 12-hour format (without it = 24-hour)

- **Best Practice**: Use built-in types (`getFormatFromType`) for common formats
- **Best Practice**: Use custom strings for locale-specific or non-standard formats


Note: Placeholders already included in Format String Syntax section above.
