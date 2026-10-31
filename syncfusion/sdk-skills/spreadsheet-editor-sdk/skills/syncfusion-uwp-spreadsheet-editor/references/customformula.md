# Custom Formula — UWP Spreadsheet

> Add custom formulas to the Syncfusion UWP Spreadsheet (SfSpreadsheet) control and extend the built-in calculation engine with user-defined functions.

---

## Overview

The **SfSpreadsheet** control allows you to add custom formulas to its function library. These formulas can be registered at runtime and used in cells just like built-in Excel formulas. Custom formulas are added using the `FormulaEngine.AddFunction` method.

---


## Registering a Custom Formula

Custom formulas are registered when a workbook is loaded. The `WorkbookLoaded` event provides access to the active `SpreadsheetGrid` instances, where formulas can be registered.

```csharp
spreadsheet.WorkbookLoaded += spreadsheet_WorkbookLoaded;

void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
    foreach (var grid in args.GridCollection)
        AddCustomFormula(grid);

    // Computing the formula at runtime
    var range = spreadsheet.ActiveSheet.Range["B2"];
    spreadsheet.ActiveGrid.SetCellValue(range, "=FindLength(Sample)");
}
```

---

## Adding a Custom Formula to FormulaEngine

Custom formulas are added to the calculation library using the `AddFunction` method of `FormulaEngine`.

```csharp
// Namespace
using Syncfusion.UI.Xaml.CellGrid;

private void AddCustomFormula(SpreadsheetGrid grid)
{
    grid.FormulaEngine.AddFunction(
        "FindLength",
        new FormulaEngine.LibraryFunction(ComputeLength)
    );
}
```

---

## Implementing the Custom Formula

The custom formula logic is implemented as a method.

```csharp
public string ComputeLength(string range)
{
    return range.Length.ToString();
}
```

---

## Using the Custom Formula in a Cell

After registration, the custom formula can be used like a standard Excel formula.

```text
=FindLength(Sample)
```

---

## Notes

- Custom formulas must be registered before use.
- Formula names are case-sensitive.
- Returned values must be compatible with the calculation engine.

---

