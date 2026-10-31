# Rows and Columns — UWP Spreadsheet

> Manipulate rows and columns including insertion, deletion, hiding, freezing, resizing, and formatting. Manage row heights and column widths for optimal data presentation.

## Insert Rows

Insert new rows into the worksheet at specified positions.

### Insert Single Row
```csharp
var sheet = spreadsheet.ActiveSheet;

// Insert row at position 5
sheet.InsertRow(5, 1);

```

### Insert Multiple Rows
```csharp
var sheet = spreadsheet.ActiveSheet;

// Insert 5 rows starting at row 3
sheet.InsertRow(3, 5);


```

---

## Insert Columns

Insert new columns into the worksheet at specified positions.

### Insert Single Column
```csharp
var sheet = spreadsheet.ActiveSheet;

// Insert column at position 3
sheet.InsertColumn(3, 1);

```

### Insert Multiple Columns
```csharp
var sheet = spreadsheet.ActiveSheet;

// Insert 3 columns starting at column B
sheet.InsertColumn(2, 3);
```

---

## Delete Rows

Remove rows from the worksheet.

### Delete Single Row
```csharp
var sheet = spreadsheet.ActiveSheet;

// Delete row 5
sheet.DeleteRow(5, 1);


```

### Delete Multiple Rows
```csharp
var sheet = spreadsheet.ActiveSheet;

// Delete 3 rows starting at row 2
sheet.DeleteRow(2, 3);

```

---

## Delete Columns

Remove columns from the worksheet.

### Delete Single Column
```csharp
var sheet = spreadsheet.ActiveSheet;

// Delete column C (column 3)
sheet.DeleteColumn(3, 1);


```

### Delete Multiple Columns
```csharp
var sheet = spreadsheet.ActiveSheet;

// Delete 2 columns starting at column B
sheet.DeleteColumn(2, 2);

```

---

## Row Height

set RowHeight
```csharp
//For setting RowHeight for 4th Row
spreadsheet.ActiveGrid.SetRowHeight(4, 4, 30);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Row(4), true);
```

## Column Width

set column widths for optimal data display.

```csharp
//For setting ColumnWidth for 5th Column
spreadsheet.ActiveGrid.SetColumnWidth(5, 5, 22);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(5), true);
```

### Auto-fit Column Width
```csharp
var sheet = spreadsheet.ActiveSheet;

// Auto-fit column C
sheet.AutofitColumn(3);

// Refresh view
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(3));
```

---

## Hide/Show Rows

Hide or show rows to control visibility without deleting data.

### Hide Row
```csharp
var sheet = spreadsheet.ActiveSheet;

// Hide row 5
spreadsheet.ActiveSheet.HideRow(5);
spreadsheet.ActiveGrid.RowHeights.SetHidden(5, 5, true);

```

### Show Row
```csharp
spreadsheet.ActiveSheet.ShowRow(5, true);
spreadsheet.ActiveGrid.RowHeights.SetHidden(5, 5, false);
```
---

## Hide/Show Columns

Hide or show columns to control visibility.

### Hide Column
```csharp
var sheet = spreadsheet.ActiveSheet;

spreadsheet.ActiveSheet.HideColumn(4);
spreadsheet.ActiveGrid.ColumnWidths.SetHidden(4, 4, true);
```

### Show Column
```csharp
spreadsheet.ActiveSheet.ShowColumn(4,true);
spreadsheet.ActiveGrid.ColumnWidths.SetHidden(4, 4, false);
```

---

## Freeze Rows and Columns
SfSpreadsheet provides support for Freeze panes to keep an area of a worksheet visible while you scroll to another area of the worksheet.

```csharp
//To Freeze 4 rows and 4 columns
spreadsheet.Workbook.ActiveSheet.Range[4, 4].FreezePanes();
spreadsheet.ActiveGrid.FrozenRows = 5;
spreadsheet.ActiveGrid.FrozenColumns = 5;
```
## Unfreeze Rows and Columns
SfSpreadsheet provides support to unfreeze the freeze panes in the worksheet of SfSpreadsheet.

```csharp
//To Unfreeze 4 rows and 4 columns
spreadsheet.Workbook.ActiveSheet.RemovePanes();
spreadsheet.ActiveGrid.FrozenRows = 1;
spreadsheet.ActiveGrid.FrozenColumns = 1;
```
## Auto Fit Rows and Columns

SfSpreadsheet provides support to fit the rows or columns based on its content at run time.

You can fit the rows/columns by calling AutoFitRows and AutoFitColumns methods of XlsIO’s IRange. Also set the adjusted row height and column width into the grid by using SetRowHeight and SetColumnWidth methods of SpreadsheetGrid.

```csharp
//To AutoFit a single column,
spreadsheet.ActiveSheet.AutofitColumn(2);
spreadsheet.ActiveGrid.SetColumnWidth(2,2,spreadsheet.ActiveSheet.GetColumnWidthInPixels(2)); 

//To AutoFit multiple columns,
spreadsheet.ActiveSheet["A1:D100"].AutofitColumns();

for(int i = 1; i <= 4 ; i++)
{
   spreadsheet.ActiveGrid.SetColumnWidth(i,i,spreadsheet.ActiveSheet.GetColumnWidthInPixels(i));
}

//To AutoFit a single row,
spreadsheet.ActiveSheet.AutofitRow(3);
spreadsheet.ActiveGrid.SetRowHeight(3,3,spreadsheet.ActiveSheet.GetRowHeightInPixels(3)); 

//To AutoFit multiple rows,
spreadsheet.ActiveSheet["B1:B5"].AutofitRows();

for(int i = 1; i <= 5 ; i++)
{
   spreadsheet.ActiveGrid.SetRowHeight(i,i,spreadsheet.ActiveSheet.GetRowHeightInPixels(i));
}
```
---
## Query Row and Column Dimensions

Retrieve the current height and width of rows and columns for layout information.

### Get Row Height

```csharp
var sheet = spreadsheet.ActiveSheet;

// Get row height in pixels
double rowHeightInPixels = sheet.GetRowHeightInPixels(3);

// Get row height in twips (1/20th of a point)
double rowHeightInTwips = sheet.GetRowHeight(3);
```

### Get Column Width

```csharp
var sheet = spreadsheet.ActiveSheet;

// Get column width in pixels
double columnWidthInPixels = sheet.GetColumnWidthInPixels(2);

// Get column width in twips
double columnWidthInTwips = sheet.GetColumnWidth(2);
```
---
