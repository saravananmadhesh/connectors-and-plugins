# Formulas

> Built-in calculation engine with support for 400+ formulas in WPF Spreadsheet control. To add the formulas into the cell , To add or define named ranges, edit and remove the named ranges, Excel lik Computations and to define custom formulas in the spreadsheet.

---

## Overview

Supports entering, editing, and calculating formulas in cells, similar to Excel. Includes a wide range of mathematical, logical, text, date, and financial functions.

---

## Key Features
- 400+ Excel-compatible formulas
- Formula bar for editing
- Real-time calculation
- Multi-threaded calculation for performance

---

## Example

Enter a formula in a cell (e.g., `=SUM(A1:A10)`) to calculate the sum of a range. The result updates automatically when referenced cells change.

## Adding Formula into cell

```csharp
// To add formulas into cell programmatically in the spreadsheet
var range = spreadsheet.ActiveSheet.Range["A2"];
spreadsheet.ActiveGrid.SetCellValue(range, "=SUM(B1:B2)");
spreadsheet.ActiveGrid.InvalidateCell(2,1);
```

## Named Ranges

### Define named ranges at runtime

```csharp
// To add named range in the spreadsheet 
spreadsheet.AddNamedRange("SampleName", "A3:B3", "Sheet1");
```

### Edit or remove named ranges at runtime

```csharp
//To Edit the named ranges,
IName name = spreadsheet.Workbook.Names["Sample"];
spreadsheet.EditNamedRange("Test", "A3:B3", name);

//To remove the named ranges,
IName name = spreadsheet.Workbook.Names["Sample"];
spreadsheet.DeleteNamedRange(name);
```

## ExcelLikeComputations

```csharp
//Event subscription
spreadsheet.WorkbookLoaded += OnWorkbookLoaded; 

//Event customization
private void OnWorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    //Enable Excel-like computation
    spreadsheet.ActiveGrid.FormulaEngine.ExcelLikeComputations = true;
}
```

## Custom Formula 

```csharp
// To add custom Formulas into the spreadsheet
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;

void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{

    foreach (var grid in args.GridCollection)
        AddCustomFormula(grid); 
  
  //Computing the formula at runtime

   var range = spreadsheet.ActiveSheet.Range["B2"];
   spreadsheet.ActiveGrid.SetCellValue(range,"=Find(sample)");
}  

private void AddCustomFormula(SpreadsheetGrid grid)
{

  // Add a formula named Find to the Library.
   grid.FormulaEngine.AddFunction("Find", new FormulaEngine.LibraryFunction(ComputeLength));      
}    

//Implementation of formula
    
public string ComputeLength(string range)
{
  //Used to calculate the length of the string
    return range.Length.ToString();
}
```

---

## Advanced Formula Operations

### Get Calculated Value from Formula

```csharp
void Spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    var sheet = spreadsheet.ActiveSheet;
    sheet.EnableSheetCalculations();
    // Set a formula
    sheet["A1"].Formula = "=10+20";
    
    // Get the calculated value
    var calculatedValue = sheet["A1"].CalculatedValue;
}
```

### Recalculate Formulas

```csharp
void RecalculateAllFormulas()
{
    var sheet = spreadsheet.ActiveSheet;
    
    // Enable calculations on the sheet
    sheet.EnableSheetCalculations();
    
    // Force refresh and recalculation of all cells
    spreadsheet.ActiveGrid.InvalidateCells();
}
```

### Formula in Named Ranges

```csharp
void CreateFormulaWithNamedRange()
{
    var sheet = spreadsheet.ActiveSheet;
    
    // Create a named range for data
    spreadsheet.AddNamedRange("SalesData", "A1:A10", "Sheet1");
    
    // Use the named range in a formula
    sheet["B1"].Formula = "=SUM(SalesData)";
    sheet["B2"].Formula = "=AVERAGE(SalesData)";
    sheet["B3"].Formula = "=COUNT(SalesData)";
}
```
---

## References
- [Formulas Documentation](https://help.syncfusion.com/wpf/spreadsheet/formulas)
