# Freeze Panes in Windows Forms Spreadsheet

Spreadsheet provides support for Freeze panes to keep an area of a worksheet visible while you scroll to another area of the worksheet.

```csharp
//Freeze panes

//To Freeze 4 rows and 4 columns
spreadsheet.Workbook.ActiveSheet.Range[4, 4].FreezePanes();
spreadsheet.ActiveGrid.FrozenRows = 5;
spreadsheet.ActiveGrid.FrozenColumns = 5;

```

## See Also

- [Worksheet](worksheet.md)
- [Resizing](resizing.md)
- [Zooming](zooming.md)
