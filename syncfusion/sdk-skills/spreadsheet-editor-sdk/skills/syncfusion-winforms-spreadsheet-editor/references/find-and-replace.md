# Find and Replace in Windows Forms Spreadsheet

This section explains about Find and Replace operations in Spreadsheet.

## Find

Searches for specific data such as particular number or text according to specified options and returns an IRange representing the cell or null if no cell is found. The various options in Find operation are:

- FindAll
- FindNext
- FindConditionalFormatting
- FindConstants
- FindFormulas
- FindDataValidation

## Find All

Searches every occurrence of specific data based on the criteria that you are searching for and returns an IRange list representing the cells in Spreadsheet.

C#

```csharp
//Search the entire workbook
var list = spreadsheet.SearchManager.FindAll(spreadsheet.Workbook, "sample", SearchBy.ByRows, ExcelFindType.Text, false, true);

// To select the matched cell content ranges,
foreach (var cell in list)
{  
    spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}

//Search the particular worksheet
var list = spreadsheet.SearchManager.FindAll(spreadsheet.Workbook.Worksheets[0], "sample", SearchBy.ByRows, ExcelFindType.Text, false, true);

// To select the matched cell content ranges,
foreach (var cell in list)
{
    spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

## Find Next

Searches the first occurrence of specific data which matches the conditions and returns the matched IRange from the current range that represents the cell.

C#

```csharp
//Search the text in entire workbook in column wise,
var cell = spreadsheet.SearchManager.FindNext(spreadsheet.Workbook, "sample", SearchBy.ByColumns, ExcelFindType.Text, false, true);

// To move the current cell to matched cell content range,
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(cell.Row, cell.Column);          

//Search the formula in particular worksheet in row wise,
var cell = spreadsheet.SearchManager.FindNext(spreadsheet.Workbook.Worksheets[0], "sum", SearchBy.ByRows, ExcelFindType.Text, false, false);

// To move the current cell to matched cell content range,
spreadsheet.ActiveGrid.CurrentCell.MoveCurrentCell(cell.Row, cell.Column);
```

## Finding Conditional Formatting

Searches and returns the IRange list which have conditional formatting within the specified worksheet.

C#

```csharp
//Searches the conditional formatting within the worksheet,
var list = spreadsheet.SearchManager.FindConditionalFormatting(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,
foreach (var cell in list)
{
    spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

## Finding Constants

Searches and returns the IRange list which have constants within the specified worksheet.

C#

```csharp
//Searches the constants within the worksheet,
var list = spreadsheet.SearchManager.FindConstants(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,
foreach (var cell in list)
{
    spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));         
}
```

## Finding Formulas

Searches and returns the IRange list which have formulas within the specified worksheet.

C#

```csharp
//Searches the formulas within the worksheet,
var list = spreadsheet.SearchManager.FindFormulas(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,
foreach (var cell in list)
{
    spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));          
}
```

## Finding Data Validation

Searches and returns the IRange list which have data validation within the specified worksheet.

C#

```csharp
//Searches the data validation within the worksheet,
var list = spreadsheet.SearchManager.FindDataValidation(spreadsheet.Workbook.Worksheets[0]);

// To select the matched cell content ranges,
foreach (var cell in list)
{
    spreadsheet.ActiveGrid.SelectionController.AddSelection(GridRangeInfo.Cell(cell.Row, cell.Column));        
}
```

## Replace All

Searches and replaces all the texts either in the workbook or worksheet based on the given option.


C#

```csharp
//Replaces the text in the entire workbook
spreadsheet.SearchManager.ReplaceAll(spreadsheet.Workbook, "sample", "Sync", false, false);

//Replaces the text in the particular worksheet
spreadsheet.SearchManager.ReplaceAll(spreadsheet.Workbook.Worksheets[0], "sample", "sync", false, true);
```

## Replace

Searches for the text or numbers that you want to change using FindNext method and once the immediate matched cell has been found, use SetCellValue method to replace it with specified text or numbers in Spreadsheet.

C#

```csharp
//Searches the given text and replaces it with specified text
var cell = spreadsheet.SearchManager.FindNext(spreadsheet.Workbook, "sample", SearchBy.ByColumns, ExcelFindType.Text, false, true);
spreadsheet.ActiveGrid.SetCellValue(cell, "sync");
```
