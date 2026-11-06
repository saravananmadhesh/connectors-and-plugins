# Formulas in Windows Forms Spreadsheet

The WinForms Spreadsheet control includes a built-in calculation engine preloaded with **409 formulas** covering a broad range of business functions.

## Adding a Formula into a Cell

**Method:** `SetCellValue(IRange range, string value)` on `SpreadsheetGrid`

After setting the value, call `InvalidateCell` to refresh the cell display.

```csharp
var range = spreadsheet.ActiveSheet.Range["A2"];
spreadsheet.ActiveGrid.SetCellValue(range, "=SUM(B1:B2)");
spreadsheet.ActiveGrid.InvalidateCell(2, 1);
```

## Setting Cell Values

### Text Values
```csharp
// set the value as a string because the property does not accept numbers.
spreadsheet.ActiveSheet.Range["A1"].Value = "Product Name";
```

### Numeric Values
**Use the `.Number` property for numeric values:**

```csharp
spreadsheet.ActiveSheet.Range["B3"].Number = 25.50;
```

### Formula Values
```csharp
//Before perform the caculation must enable the worksheet calculation
 Spreadsheet.Workbook.ActiveSheet.EnableSheetCalculations();
spreadsheet.ActiveSheet.Range["C1"].Value = "=SUM(B1:B10)";
spreadsheet.ActiveGrid.InvalidateCell(1, 3);
```

### ⚠️ IMPORTANT: Valid Cell References
- **Valid ranges:** A1, B2, C3, etc. (row/column indices start at 1)
- **Invalid ranges:** A0, B0, C0, etc. (row 0 does not exist in Excel)
- Always use **1-based indexing** for cell references (A1:Z1048576)

## Named Ranges

### Define a Named Range

**Method:** `AddNamedRange(string name, string range, string sheetName)` on `Spreadsheet`

```csharp
spreadsheet.AddNamedRange("Name1", "A3:B3", "Sheet1");
spreadsheet.AddNamedRange("Name2", "A5", "Sheet1");
spreadsheet.AddNamedRange("Name3", "C1:D5", "Sheet1");
```

### Edit a Named Range

**Method:** `EditNamedRange(string name, string range, IName namedRange)` on `Spreadsheet`

```csharp
// To Edit the  2nd named ranges,
IName name = spreadsheet.Workbook.Names[1];
spreadsheet.EditNamedRange("Test", "A5", name);
```

### Delete a Named Range

**Method:** `DeleteNamedRange(IName namedRange)` on `Spreadsheet`

```csharp
//delete the 3rd named range,
IName name2 = spreadsheet.Workbook.Names[2];
spreadsheet.DeleteNamedRange(name2);
```

## Supported Functions (409 Total)

### Database Functions

| Functions |
|---|
| DCOUNT, DCOUNTA, DAVERAGE, DGET, DMAX, DMIN, DSTDEVP, DSTEV, DVARP, DVAR |

### Date and Time Functions

| Functions |
|---|
| DATE, DATEVALUE, DAY, DAYS360, HOUR, MINUTE, SECOND, MONTH, NOW, TIME, TIMEVALUE, TODAY, WEEKDAY, YEAR, DAYS, EDATE, EOMONTH, ISOWEEKNUM, NETWORKDAYS.INTL, WEEKNUM, WORKDAY, WORKDAY.INTL, YEARFRAC |

### Engineering Functions

| Functions |
|---|
| DEC2BIN, DEC2OCT, DEC2HEX, BIN2DEC, BIN2OCT, BIN2HEX, HEX2BIN, HEX2DEC, HEX2OCT, OCT2BIN, OCT2DEC, OCT2HEX, IMABS, IMAGINARY, IMREAL, COMPLEX, IMSUM, IMSUB, IMPRODUCT, IMDIV, IMCONJUGATE, IMSQRT, IMARGUMENT, IMSIN, IMCSC, IMCOS, IMSEC, IMTAN, IMCOT, IMSINH, IMCSCH, IMCOSH, IMSECH, IMLOG10, IMLOG2, IMLN, IMEXP, IMPOWER, GESTEP, DELTA, BITAND, BITOR, BITXOR, BITLSHIFT, BITRSHIFT, ERF, ERF.PRECISE, ERFC.PRECISE, BESSELI, BESSELJ, BESSELY, BESSELK, CONVERT |

### Financial Functions

| Functions |
|---|
| DB, DDB, FV, IPMT, IRR, XIRR, ISPMT, MIRR, NPER, NPV, PMT, PPMT, PV, RATE, SLN, SYD, VDB, DOLLARDE, DOLLARFR, DURATION, RRI, FVSCHEDULE, DISC, INTRATE, CUMIPMT, CUMPRINC, RECEIVED |

### Information Functions

| Functions |
|---|
| ISERROR, ISNUMBER, ISLOGICAL, ISNA, ISERR, ISBLANK, ISTEXT, ISNONTEXT, ISEVEN, CONCATENATE, DOLLAR, LEN, FIXED, ISODD, ERROR.TYPE, N, NA, CELL, INFO, TYPE, ISFORMULA |

### Logical Functions

| Functions |
|---|
| AND, OR, IF, IFERROR, FALSE, TRUE, NOT |

### Lookup & Reference Functions

| Functions |
|---|
| OFFSET, HLOOKUP, VLOOKUP, MATCH, COLUMN, ROW, INDIRECT, AREAS, COLUMNS, FORMULATEXT, HYPERLINK, ROWS, SHEET, TRANSPOSE, SHEETS |

### Math & Trigonometry Functions

| Functions |
|---|
| ABS, ACOS, ACOSH, ASIN, ASINH, ATAN, ATAN2, ATANH, SUM, PI, POWER, POW, SUBTOTAL, COS, SIN, COSH, SINH, TANH, TAN, ACOT, ACOTH, SIGN, SQRT, ROUND, LOG, LOG10, EXP, CEILING, CEILING.MATH, FLOOR, PRODUCT, MOD, TRUNC, INT, SUMPRODUCT, RAND, COMBIN, DEGREES, EVEN, FACT, LN, ODD, RADIANS, ROUNDDOWN, ROUNDUP, MROUND, MULTINOMIAL, QUOTIENT, FACTDOUBLE, GCD, LCM, SQRTPI, ROMAN, SUMSQ, SUMX2MY2, SUMX2PY2, SUMXMY2, SUMIFS, SEC, SECH, COT, COTH, CSC, CSCH, TRUNCATE, COMBINA, BASE, DECIMAL, ARABIC, MDETERM, MMULT, MINVERSE, MUNIT |

### Statistical Functions

| Functions |
|---|
| AVG, AVERAGE, MAX, MIN, MAXA, MINA, MEDIAN, CONFIDENCE.T, SKEW.P, COVARIANCE.P, COVARIANCE.S, PERCENTILE.EXC, PERCENTILE.INC, PERCENTRANK.EXC, PERCENTRANK.INC, STDEV.P, STDEV.S, PERMUTATIONA, NORM.DIST, NORM.INV, NORM.S.DIST, NORM.S.INV, WEIBULL.DIST, EXPON.DIST, GAMMA.DIST, GAMMA.INV, GAMMALN.PRECISE, T.INV, F.INV.RT, BINOM.INV, HYPGEOM.DIST, LOGNORM.DIST, LOGNORM.INV, CONFIDENCE.NORM, CHISQ.DIST.RT, F.DIST, F.DIST.RT, CHISQ.TEST, CHISQ.INV, CHISQ.INV.RT, BINOM.DIST, Z.TEST, RANK.AVG, RANK.EQ, NEGBINOM.DIST, POISSON.DIST, QUARTILE.EXC, QUARTILE.INC, AVEDEV, AVERAGEA, GAMMALN, GAMMADIST, GAMMAINV, GEOMEAN, HARMEAN, HYPGEOMDIST, INTERCEPT, BINOMDIST, CHIDIST, CHIINV, CHITEST, NORMDIST, NORMINV, NORMSINV, NORMSDIST, CONFIDENCE, CORREL, COUNT, COUNTA, COUNTBLANK, COUNTIF, COVAR, CRITBINOM, DEVSQ, EXPONDIST, FDIST, FINV, FISHER, FISHERINV, FORECAST, KURT, LARGE, LOGNORMDIST, LOGINV, MODE, NEGBINOMDIST, PEARSON, PERCENTILE, PERCENTILERANK, PERMUT, POISSON, PROB, QUARTILE, RANK, RSQ, SKEW, SLOPE, SMALL, STANDARDIZE, STDEV, STDEVA, STDEVP, STDEVPA, STEYX, TRIMMEAN, VAR, VARA, VARP, VARPA, WEIBULL, ZTEST |

### Text Functions

| Functions |
|---|
| LEFT, LEN, TRUNC, MID, RIGHT, VALUE, DOLLAR, FIXED, LOWER, UPPER, TEXT, TRIM, CONCATENATE, SUBSTITUTE, T, CODE, FINDB, LEFTB, LENB, MIDB, RIGHTB, NUMBERVALUE, PROPER, REPLACE, REPT, SEARCHB, UNICHAR, UNICODE |

### Web Functions

| Functions |
|---|
| ENCODEURL, FILTERXML, WEBSERVICE |

## Custom Formulas

Spreadsheet allows you to add custom formulas into its function library. You can add custom formulas by using the `AddFunction` method of `FormulaEngine`.

### ⚠️ CRITICAL REQUIREMENTS for Custom Formulas

1. **Method Signature:** Must accept `params string[]` OR a single `string` parameter
2. **Return Type:** Must return `string`
3. **Namespace:** Ensure `Syncfusion.Windows.Forms.CellGrid` is imported
4. **Delegate Type:** Use `FormulaEngine.LibraryFunction` (NOT `CalcEngine.LibraryFunction`)
5. **Registration:** Add formula BEFORE or AFTER workbook load (not required to wait for WorkbookLoaded event)


### Common Pitfalls to Avoid

❌ **WRONG:** Using `CalcEngine.LibraryFunction` instead of `FormulaEngine.LibraryFunction`
```csharp
// ❌ DO NOT DO THIS
grid.FormulaEngine.AddFunction("MyFunc", new CalcEngine.LibraryFunction(MyMethod));
```

❌ **WRONG:** Method signature with multiple parameters (not `params string[]` or single `string`)
```csharp
// ❌ DO NOT DO THIS
public string MyFormula(string str1, string str2)  // Wrong - parameters won't match delegate
```

✅ **CORRECT:** Always accept `string args` and parse as needed
```csharp
// ✅ DO THIS
public string MyFormula(string args)
{
    string[] parts = args.Split(',');
    // Process parts...
}
```

✅ **CORRECT:** Use `FormulaEngine.LibraryFunction` delegate
```csharp
// ✅ DO THIS
grid.FormulaEngine.AddFunction("MyFunc", 
    new FormulaEngine.LibraryFunction(MyMethod));
```
## See Also

- [Editing](editing.md)
- [Getting Started](getting-started.md)
