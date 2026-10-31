# Formulas — UWP Spreadsheet

> Work with formulas and named ranges in UWP Spreadsheet. Includes 409+ built-in functions covering database, date/time, engineering, financial, logical, statistical, and text operations.

---


## Adding Formulas to Cells

Add formulas programmatically using the `SetCellValue()` method and invalidate the cell to update the view.

### Basic Formula
```csharp
var range = spreadsheet.ActiveSheet.Range["A2"];
spreadsheet.ActiveGrid.SetCellValue(range, "=SUM(B1:B2)");
spreadsheet.ActiveGrid.InvalidateCell(2, 1);
```

### Formula with Cell References
```csharp
var range = spreadsheet.ActiveSheet.Range["D5"];
spreadsheet.ActiveGrid.SetCellValue(range, "=A1*B1+C1");
spreadsheet.ActiveGrid.InvalidateCell(5, 4);
```

---

## Named Ranges

Named ranges represent cell, range of cells, formula, or constant value with defined scope.

### Define Named Ranges at Runtime
```csharp
// To add or define named range in the spreadsheet
spreadsheet.AddNamedRange("SampleName", "A3:B3", "Sheet1");
```

### Edit Named Ranges at Runtime
```csharp
// NameSpace
using Syncfusion.XlsIO;

IName name = spreadsheet.Workbook.Names["Sample"];
spreadsheet.EditNamedRange("Test", "A3:B3", name);
```

### Remove Named Ranges at Runtime
```csharp
// NameSpace
using Syncfusion.XlsIO;

IName name = spreadsheet.Workbook.Names["Sample"];
spreadsheet.DeleteNamedRange(name);
```

### Using Named Ranges in Formulas
```csharp
var range = spreadsheet.ActiveSheet.Range["C5"];
spreadsheet.ActiveGrid.SetCellValue(range, "=SUM(SampleName)");
spreadsheet.ActiveGrid.InvalidateCell(5, 3);
```

---

## Supported Functions - By Category

### Database Functions

| Function | Description |
|----------|-------------|
| `DCOUNT` | Returns count of numeric cells matching criteria |
| `DCOUNTA` | Returns count of non-blank cells matching criteria |
| `DAVERAGE` | Calculates average of values matching criteria |
| `DGET` | Returns single value from database matching criteria |
| `DMAX` | Returns maximum value matching criteria |
| `DMIN` | Returns minimum value matching criteria |
| `DSTDEVP` | Returns standard deviation (population) matching criteria |
| `DSTDEV` | Returns standard deviation (sample) matching criteria |
| `DVARP` | Returns variance (population) matching criteria |
| `DVAR` | Returns variance (sample) matching criteria |

### Date and Time Functions

| Function | Description |
|----------|-------------|
| `DATE` | Returns date from year, month, day |
| `DATEVALUE` | Converts date text to serial number |
| `DAY` | Returns day of month from date |
| `DAYS360` | Returns days between dates (360-day year) |
| `DAYS` | Returns days between two dates |
| `HOUR` | Returns hour from time |
| `MINUTE` | Returns minute from time |
| `SECOND` | Returns seconds from time |
| `MONTH` | Returns month from date |
| `NOW` | Returns current date and time |
| `TIME` | Returns time from hour, minute, second |
| `TIMEVALUE` | Converts time text to decimal |
| `TODAY` | Returns today's date |
| `WEEKDAY` | Returns day of week as number |
| `WEEKNUM` | Returns week number of year |
| `YEAR` | Returns year from date |
| `EDATE` | Returns date months before/after |
| `EOMONTH` | Returns last day of month |
| `WORKDAY` | Returns date n working days away |
| `WORKDAY.INTL` | Returns working days excluding weekends/holidays |

### Math and Trigonometry Functions

| Function | Description |
|----------|-------------|
| `ABS` | Returns absolute value |
| `ACOS` | Returns arccosine |
| `ASIN` | Returns arcsine |
| `ATAN` | Returns arctangent |
| `ATAN2` | Returns arctangent from x,y coordinates |
| `COS` | Returns cosine |
| `SIN` | Returns sine |
| `TAN` | Returns tangent |
| `CEILING` | Rounds up to nearest multiple |
| `FLOOR` | Rounds down toward zero |
| `ROUND` | Rounds to specified digits |
| `ROUNDUP` | Rounds up away from zero |
| `ROUNDDOWN` | Rounds down toward zero |
| `INT` | Rounds down to nearest integer |
| `TRUNC` | Truncates to integer |
| `SQRT` | Returns positive square root |
| `POWER` | Returns number raised to power |
| `EXP` | Returns e raised to power |
| `LOG` | Returns logarithm to specified base |
| `LOG10` | Returns base-10 logarithm |
| `LN` | Returns natural logarithm |
| `MOD` | Returns remainder from division |
| `SIGN` | Returns sign of number |
| `SUM` | Adds arguments |
| `SUMPRODUCT` | Returns sum of products |
| `PRODUCT` | Multiplies arguments |
| `RAND` | Returns random number >= 0 and < 1 |
| `COMBIN` | Returns combinations count |
| `FACT` | Returns factorial |
| `GCD` | Returns greatest common divisor |
| `LCM` | Returns least common multiple |

### Text Functions

| Function | Description |
|----------|-------------|
| `CONCATENATE` | Joins text strings |
| `LEFT` | Returns leftmost characters |
| `RIGHT` | Returns rightmost characters |
| `MID` | Returns middle characters |
| `LEN` | Returns string length |
| `LOWER` | Converts to lowercase |
| `UPPER` | Converts to uppercase |
| `PROPER` | Converts to proper case |
| `TRIM` | Removes leading/trailing spaces |
| `SUBSTITUTE` | Replaces text |
| `FIND` | Finds text position |
| `SEARCH` | Finds text (case-insensitive) |
| `REPLACE` | Replaces characters |
| `REPT` | Repeats text n times |
| `VALUE` | Converts text to number |
| `TEXT` | Formats value as text |
| `CODE` | Returns character code |
| `CHAR` | Returns character from code |

### Logical Functions

| Function | Description |
|----------|-------------|
| `AND` | Returns TRUE if all conditions TRUE |
| `OR` | Returns TRUE if any condition TRUE |
| `NOT` | Reverses logical value |
| `IF` | Returns value based on condition |
| `IFERROR` | Returns value if error, else result |
| `TRUE` | Returns logical TRUE |
| `FALSE` | Returns logical FALSE |

### Lookup and Reference Functions

| Function | Description |
|----------|-------------|
| `VLOOKUP` | Looks up value in column |
| `HLOOKUP` | Looks up value in row |
| `MATCH` | Returns relative position |
| `INDEX` | Returns value at specified position |
| `OFFSET` | Returns range offset |
| `INDIRECT` | Returns reference from text |
| `ROW` | Returns row number |
| `COLUMN` | Returns column number |
| `ROWS` | Returns rows count |
| `COLUMNS` | Returns columns count |
| `TRANSPOSE` | Transposes range |

### Statistical Functions

| Function | Description |
|----------|-------------|
| `AVERAGE` | Returns average |
| `AVERAGEA` | Returns average (including text) |
| `COUNT` | Returns count of numeric values |
| `COUNTA` | Returns count of non-blank cells |
| `COUNTBLANK` | Returns count of blank cells |
| `COUNTIF` | Returns count matching criteria |
| `MAX` | Returns maximum value |
| `MAXA` | Returns maximum (including text) |
| `MIN` | Returns minimum value |
| `MINA` | Returns minimum (including text) |
| `MEDIAN` | Returns median |
| `MODE` | Returns mode (most frequent) |
| `STDEV` | Returns sample standard deviation |
| `STDEVP` | Returns population standard deviation |
| `VAR` | Returns sample variance |
| `VARP` | Returns population variance |
| `PERCENTILE` | Returns percentile value |
| `QUARTILE` | Returns quartile |
| `RANK` | Returns rank |
| `LARGE` | Returns kth largest |
| `SMALL` | Returns kth smallest |

### Financial Functions

| Function | Description |
|----------|-------------|
| `FV` | Returns future value |
| `PV` | Returns present value |
| `PMT` | Returns payment amount |
| `RATE` | Returns interest rate |
| `NPER` | Returns number of periods |
| `NPV` | Returns net present value |
| `IRR` | Returns internal rate of return |
| `XIRR` | Returns internal rate for schedule |
| `SLN` | Returns straight-line depreciation |
| `DB` | Returns declining balance depreciation |
| `DDB` | Returns double declining balance |

### Information Functions

| Function | Description |
|----------|-------------|
| `ISBLANK` | Checks if blank |
| `ISERROR` | Checks if error |
| `ISLOGICAL` | Checks if logical |
| `ISNA` | Checks if #N/A |
| `ISNUMBER` | Checks if number |
| `ISTEXT` | Checks if text |
| `ISEVEN` | Checks if even |
| `ISODD` | Checks if odd |
| `TYPE` | Returns value type |
| `ERROR.TYPE` | Returns error type number |

---

## Example: Using Formulas and Named Ranges

```csharp
using System;
using Syncfusion.SfSpreadsheet;
using Syncfusion.XlsIO;

public void WorkWithFormulas()
{
    var sheet = spreadsheet.ActiveSheet;
    
    // Setup headers
    sheet.Range["A1"].Text = "Product";
    sheet.Range["B1"].Text = "Unit Price";
    sheet.Range["C1"].Text = "Quantity";
    sheet.Range["D1"].Text = "Total";
    
    // Add data
    sheet.Range["A2"].Text = "Product A";
    sheet.Range["B2"].Value = 100;
    sheet.Range["C2"].Value = 5;
    
    sheet.Range["A3"].Text = "Product B";
    sheet.Range["B3"].Value = 200;
    sheet.Range["C3"].Value = 3;
    
    // Add formula for Total column
    var totalRange = sheet.Range["D2"];
    spreadsheet.ActiveGrid.SetCellValue(totalRange, "=B2*C2");
    
    // Copy formula down
    sheet.Range["D2"].Copy();
    sheet.Range["D3"].Paste();
    
    // Create named range for Unit Price
    spreadsheet.AddNamedRange("UnitPrices", "B2:B100", "Sheet1");
    
    // Create named range for Quantities
    spreadsheet.AddNamedRange("Quantities", "C2:C100", "Sheet1");
    
    // Add formula using named ranges
    sheet.Range["E1"].Text = "Grand Total";
    spreadsheet.ActiveGrid.SetCellValue(sheet.Range["E2"], "=SUMPRODUCT(UnitPrices,Quantities)");
    
    // Refresh view
    spreadsheet.ActiveGrid.InvalidateCells();
}
```

---

## Formula Calculation Engine

UWP Spreadsheet includes a built-in calculation engine that:

- Supports 409+ Excel functions
- Handles cell references and ranges
- Supports named ranges
- Performs automatic recalculation
- Handles circular reference detection
- Supports cross-sheet references



## Key Members

| Member | Type | Description |
|--------|------|-------------|
| `SetCellValue()` | Method | Sets cell value with formula |
| `AddNamedRange()` | Method | Creates named range |
| `EditNamedRange()` | Method | Edits existing named range |
| `DeleteNamedRange()` | Method | Deletes named range |
| `ConditionalFormats` | Property | Gets conditional formats |
| `EnabledCalculations` | Property | Gets/sets auto-calculation |
| `CalculateFormulas()` | Method | Manually calculates formulas |
