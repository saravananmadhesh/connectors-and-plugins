# Cell Formatting — UWP Spreadsheet

> Apply cell formatting options including fonts, backgrounds, borders, alignment, number formats, styles, and table formatting. Ensures professional presentation of spreadsheet data with various formatting attributes.

## Cell Background

Apply background color to cells or ranges at runtime. Set the color index for the XlsIO range and invalidate the range to update the view.

### Single Cell Background
```csharp
IRange range = spreadsheet.ActiveSheet.Range["A5"];
range.CellStyle.ColorIndex = ExcelKnownColors.Blue;
spreadsheet.ActiveGrid.InvalidateCell(range.Row, range.Column);
```
---

## Font Formatting

Apply font settings such as font family, size, color, and styles (bold, italic, underline) to cells.

### Font Settings
```csharp
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A1:B5"];
var gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(range);

// Font family name
range.CellStyle.Font.FontName = "Arial Black";

// Font styles
range.CellStyle.Font.Bold = true;
range.CellStyle.Font.Italic = true;

// Font size
range.CellStyle.Font.Size = 18;

// Font effects
range.CellStyle.Font.Strikethrough = true;

// Underline types
range.CellStyle.Font.Underline = ExcelUnderline.Single;

// Font color
range.CellStyle.Font.Color = ExcelKnownColors.Blue;

// Invalidate the range to update the view
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

---

## Cell Borders

Apply borders to cells or ranges with different line styles and colors.

### Single Cell Border
```csharp
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A5"];
range.Borders.LineStyle = ExcelLineStyle.Dash_dot;
range.Borders.Color = ExcelKnownColors.Gold;
spreadsheet.ActiveGrid.InvalidateCell(range.Row, range.Column);
```

### Range Borders
```csharp
IRange excelRange = spreadsheet.Workbook.Worksheets[0].Range["C3:D8"];

// Apply border around the range
excelRange.BorderAround(ExcelLineStyle.Double, ExcelKnownColors.Green);

// Apply border inside the range
excelRange.BorderInside(ExcelLineStyle.Dotted, ExcelKnownColors.Tan);

var gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(excelRange);
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

---

## Cell Alignment

Align cell content horizontally, vertically, and apply indentation or text rotation.

### Horizontal Alignment
```csharp
spreadsheet.Workbook.Worksheets[0].Range["A2"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
spreadsheet.ActiveGrid.InvalidateCell(2, 1);
```

### Vertical Alignment
```csharp
spreadsheet.Workbook.Worksheets[0].Range["B2"].CellStyle.VerticalAlignment = ExcelVAlign.VAlignBottom;
spreadsheet.ActiveGrid.InvalidateCell(2, 2);
```

### Text Orientation
```csharp
// Apply orientation for selected cells (in degrees)
spreadsheet.FormatOrientation(90);
```

### Text Indentation
```csharp
// Increase indent for selected ranges or cells
spreadsheet.FormatIndent(true);

// Decrease indent for selected ranges or cells
spreadsheet.FormatIndent(false);

// Set specific indent level
spreadsheet.FormatIndentLevel(3);
```

---

## Wrap Text

Enable text wrapping for cells where content exceeds cell width.

### Enable Text Wrapping
```csharp
spreadsheet.ActiveSheet.Range["C4"].Text = "Wrapping the content in the cell";
spreadsheet.ActiveSheet.Range["C4"].WrapText = true;

// Auto-fit row height to content
spreadsheet.ActiveSheet.AutofitRow(4);
spreadsheet.ActiveGrid.SetRowHeight(4, 4, spreadsheet.ActiveSheet.GetRowHeightInPixels(4));

// Invalidate cell to update view
spreadsheet.ActiveGrid.InvalidateCell(4, 3);
```

---

## Merge Cells

Combine adjacent cells into a single cell.

### Merge Cells
```csharp
var gridRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
var excelRange = gridRange.ConvertGridRangeToExcelRange(spreadsheet.ActiveGrid);

var coverCell = new CoveredCellInfo(gridRange.Top, gridRange.Left, gridRange.Bottom, gridRange.Right);

spreadsheet.ActiveGrid.CoveredCells.Add(coverCell);
spreadsheet.ActiveSheet.Range[excelRange].Merge();
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

### Unmerge Cells
```csharp
var gridRange = spreadsheet.ActiveGrid.SelectedRanges.ActiveRange;
var excelRange = gridRange.ConvertGridRangeToExcelRange(spreadsheet.ActiveGrid);

spreadsheet.ActiveGrid.CoveredCells.Clear(gridRange);
spreadsheet.ActiveSheet.Range[excelRange].UnMerge();
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

---

## Number Formatting

Apply number formats to display values as currency, percentage, date, time, scientific notation, etc.

### Percentage Format
```csharp
spreadsheet.Workbook.ActiveSheet.Range["C3"].NumberFormat = "0.00%";
spreadsheet.ActiveGrid.InvalidateCell(3, 3);
```

### Date Format
```csharp
spreadsheet.Workbook.ActiveSheet.Range["D1"].NumberFormat = "m/d/yyyy";
spreadsheet.ActiveGrid.InvalidateCell(1, 4);
```

### Time Format
```csharp
spreadsheet.Workbook.ActiveSheet.Range["D4"].NumberFormat = "[$-F400]h:mm:ss AM/PM";
spreadsheet.ActiveGrid.InvalidateCell(3, 4);
```

### Number Format Notations
| Format Type | Notation |
|------------|----------|
| General | General |
| Number | 0.00 |
| Currency | $* #,##0.00 |
| Accounting | $* (#,##0.00);$* -??;@ |
| Short Date | m/d/yyyy |
| Long Date | [$-F800]dddd, mmmm dd, yyyy |
| Time | [$-F400]h:mm:ss AM/PM |
| Percentage | 0.00% |
| Fraction | #?/? |
| Scientific | 0.00E+00 |

---

## Built-in Styles

Apply predefined built-in styles to cells or ranges for consistent formatting.

### Apply Built-in Style
```csharp
spreadsheet.Workbook.ActiveSheet.Range["A3"].BuiltInStyle = BuiltInStyles.Heading2;
spreadsheet.ActiveGrid.InvalidateCell(3, 1);
```

---

## Format as Table

Format a range of cells as a table with built-in table styles.

### Create and Format Table
```csharp
// Create a table
IListObject table = spreadsheet.Workbook.ActiveSheet.ListObjects.Create("Table1", 
    spreadsheet.Workbook.ActiveSheet.Range["C1:G5"]);

// Apply built-in table style
table.BuiltInTableStyle = TableBuiltInStyles.TableStyleLight6;

// Invalidate cells to refresh view
spreadsheet.ActiveGrid.InvalidateCells();
```

---

## Clear Formatting

Remove formatting from cells while optionally preserving content.

### Clear All Content and Formatting
```csharp
// Clear contents along with formatting
spreadsheet.Workbook.Worksheets[0].Range[4, 5].Clear(true);
```

### Clear Specific Format Types
```csharp
// Clear with specified ExcelClearOptions
spreadsheet.Workbook.Worksheets[0].Range[4, 5].Clear(ExcelClearOptions.ClearConditionalFormats);

// ExcelClearOptions
ExcelClearOptions.ClearFormat
ExcelClearOptions.ClearContent
ExcelClearOptions.ClearComment
ExcelClearOptions.ClearAll
ExcelClearOptions.ClearConditionalFormats
ExcelClearOptions.ClearDataValidations
```

### Clear Options
| Option | Description |
|--------|-------------|
| `ClearConditionalFormats` | Clear only conditional formatting |
| `ClearComments` | Clear only comments |
| `ClearDataValidation` | Clear only data validation |
| `ClearFormats` | Clear only cell formats |
| `ClearContents` | Clear only cell contents |
| `ClearAll` | Clear everything |

---

## Horizontal Alignment Values

| Value | Description |
|-------|-------------|
| `HAlignLeft` | Align left |
| `HAlignCenter` | Center alignment |
| `HAlignRight` | Align right |
| `HAlignJustify` | Justify |
| `HAlignDistributed` | Distributed |

---

## Vertical Alignment Values

| Value | Description |
|-------|-------------|
| `VAlignTop` | Align top |
| `VAlignCenter` | Center alignment |
| `VAlignBottom` | Align bottom |
| `VAlignJustify` | Justify |
| `VAlignDistributed` | Distributed |

---

## Key Members

| Member | Type | Description |
|--------|------|-------------|
| `CellStyle` | Property | Gets/sets the cell style properties |
| `Font` | Property | Gets/sets font properties |
| `BackColor` | Property | Gets/sets background color |
| `ColorIndex` | Property | Gets/sets color index |
| `Borders` | Property | Gets/sets border properties |
| `HorizontalAlignment` | Property | Gets/sets horizontal alignment |
| `VerticalAlignment` | Property | Gets/sets vertical alignment |
| `NumberFormat` | Property | Gets/sets number format |
| `BuiltInStyle` | Property | Gets/sets built-in style |
| `WrapText` | Property | Gets/sets text wrapping |
| `Merge()` | Method | Merges cells in range |
| `UnMerge()` | Method | Unmerges cells in range |
| `InvalidateCell()` | Method | Refreshes cell view |
| `AutofitRow()` | Method | Auto-fits row height |

---

## Example: Complete Formatting

```csharp
using System;
using Syncfusion.SfSpreadsheet;
using Syncfusion.XlsIO;

public void ApplyCellFormatting()
{
    var sheet = spreadsheet.ActiveSheet;
    
    // Setup headers with formatting
    sheet.Range["A1"].Text = "Product Name";
    sheet.Range["B1"].Text = "Price";
    sheet.Range["C1"].Text = "Quantity";
    
    // Header formatting
    var headerRange = sheet.Range["A1:C1"];
    headerRange.CellStyle.Font.Bold = true;
    headerRange.CellStyle.Font.Color = ExcelKnownColors.White;
    headerRange.CellStyle.ColorIndex = ExcelKnownColors.DarkBlue;
    headerRange.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
    
    // Data row formatting
    sheet.Range["A2"].Text = "Product A";
    sheet.Range["B2"].Number = 1000;
    sheet.Range["C2"].Number = 50;
    
    // Format price column as currency
    sheet.Range["B2:B100"].NumberFormat = "$#,##0.00";
    
    // Format quantity column
    sheet.Range["C2:C100"].NumberFormat = "0";
    sheet.Range["C2:C100"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
    
    // Apply borders
    var dataRange = sheet.Range["A1:C100"];
    dataRange.BorderAround(ExcelLineStyle.Medium, ExcelKnownColors.Black);
    dataRange.BorderInside(ExcelLineStyle.Thin, ExcelKnownColors.Gray);
    
    // Refresh view
    spreadsheet.ActiveGrid.InvalidateCells();
}
```
