# Number Formatting

Apply numeric, currency, percentage, date, time, fraction, scientific, and custom formats to cells.

## Minimal Code
```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowNumberFormatting="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Finance">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Built-in formats using getFormatFromType ===
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('Currency'), 'B2:B20');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('Accounting'), 'C3:E10');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('Percentage'), 'D2:D20');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('ShortDate'), 'E2:E20');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('LongDate'), 'F2:F20');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('Time'), 'G2:G20');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('Fraction'), 'H2:H20');
        spreadsheet.numberFormat(ej.spreadsheet.getFormatFromType('Scientific'), 'I2:I20');

        // === Custom format strings ===
        spreadsheet.numberFormat('$#,##0.00', 'K2:K20');          // Currency
        spreadsheet.numberFormat('0%', 'L2:L20');                 // Percentage
        spreadsheet.numberFormat('dd-MMM-yyyy', 'M2:M20');        // Date
        spreadsheet.numberFormat('hh:mm AM/PM', 'N2:N20');        // Time
        spreadsheet.numberFormat('[Red][<=0]0;[Green][>0]0', 'O2:O20'); // Conditional colors
    }
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

```cshtml
'$#,##0.00'           // $1,234.56 (USD, 2 decimals)
'$#,##0'              // $1,234 (USD, no decimals)
'$ #,##0.00'          // $ 1,234.56 (space before number)
'[$$-409]#,##0.00'    // USD with currency code
'€#,##0.00'           // €1,234.56 (Euro)
'£#,##0.00'           // £1,234.56 (Pounds)
'¥#,##0'              // ¥1235 (Yen, no decimals)
```

### Percentage Formats

```cshtml
'0%'                  // 50% (multiplies value by 100)
'0.00%'               // 50.00%
'0.0"%"'              // 50.0%
```

### Decimal Places

```cshtml
'0'                   // No decimals: 1235
'0.0'                 // 1 decimal: 1234.6
'0.00'                // 2 decimals: 1234.56
'0.000'               // 3 decimals: 1234.567
'#,##0.##'            // 2 decimals max, 0 decimals min
```

### Thousands Separator

```cshtml
'#,##0'               // 1,234,567 (commas)
'#,##0.00'            // 1,234,567.89
'#, ##0'              // 1, 235 (space separator)
```

### Date Formats

```cshtml
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

```cshtml
'hh:mm AM/PM'         // 02:30 PM
'hh:mm:ss'            // 14:30:45
'h:mm'                // 2:30 (no leading zero, no AM/PM)
'h:mm:ss AM/PM'       // 2:30:45 PM
'[h]:mm:ss'           // 26:30:45 (elapsed time, hours > 24)
'mm:ss'               // 30:45 (minutes:seconds)
'[mm]:ss'             // 150:45 (elapsed minutes)
```

### Fractions

```cshtml
'# ?/?'               // 3/4 (one digit numerator/denominator)
'# ??/??' '           // 15/32 (two digit)
'# ?/2'               // 3/2 (halves)
'# ?/4'               // 3/4 (quarters)
'# ?/8'               // 5/8 (eighths)
'# ?/16'              // 11/16 (sixteenths)
```

### Scientific Notation

```cshtml
'0.00E+00'            // 1.23E+03
'0.0E+0'              // 1.2E+3
'0.00E-00'            // 1.23E+03 (alternative)
```

### Text with Numbers

```cshtml
'0" items"'           // 5 items
'0.00" kg"'           // 12.50 kg
'"Rank: "#'           // Rank: 5
'"Count: "#,##0'      // Count: 1,234
'0" out of 100"'      // 85 out of 100
```

### Conditional Formatting (Color by Value)

```cshtml
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

```cshtml
'@'                   // Text (display as-is)
'# ##0'               // Thousands separator without decimals
'0.00" EUR"'          // Append currency text
'"$"#,##0.00_);("$"#,##0.00)' // Accounting (parentheses for negative)
```

## Built-in Format Types (via getFormatFromType)

```cshtml
//import getFormatFromType from 'ej.spreadsheet' to get the format code from format type.
ej.spreadsheet.getFormatFromType('Currency')      // 'Currency' format
ej.spreadsheet.getFormatFromType('Accounting')    // Accounting format
ej.spreadsheet.getFormatFromType('Percentage')    // Percentage format
ej.spreadsheet.getFormatFromType('ShortDate')     // mm/dd/yyyy
ej.spreadsheet.getFormatFromType('LongDate')      // dddd, mmmm dd, yyyy
ej.spreadsheet.getFormatFromType('Time')          // hh:mm:ss
ej.spreadsheet.getFormatFromType('Fraction')      // # ?/?
ej.spreadsheet.getFormatFromType('Scientific')    // 0.00E+00
ej.spreadsheet.getFormatFromType('Text')          // @ (text)
```

