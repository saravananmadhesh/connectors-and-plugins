# Formatting in Windows Forms Spreadsheet

The WinForms Spreadsheet control supports a wide range of cell formatting options that are Excel-compatible.

**Supported formatting attributes:**
- Cell background color
- Font settings (name, size, color, bold, italic, underline, strikethrough)
- Cell content alignment (horizontal, vertical, indent, wrap text)
- Cell borders
- Number formatting
- Merge / Unmerge cells
- Built-in cell styles
- Format as table

> **NOTE:** After applying formatting to an XlsIO range, call `InvalidateCell` or `InvalidateCells` on the `SpreadsheetGrid` to refresh and display the updated styles.

## Cell Background

### Single Cell

```csharp
IRange range = spreadsheet.ActiveSheet.Range["A5"];
range.CellStyle.ColorIndex = Syncfusion.XlsIO.ExcelKnownColors.Blue;
spreadsheet.ActiveGrid.InvalidateCell(range.Row, range.Column);
```

### Selected Range

```csharp
var selectedRanges = spreadsheet.ActiveGrid.SelectedRanges;
foreach (var range in selectedRanges)
{
    string cell = GridExcelHelper.ConvertGridRangeToExcelRange(range, spreadsheet.ActiveGrid);
    spreadsheet.ActiveSheet.Range[cell].CellStyle.ColorIndex = ExcelKnownColors.Blue;
    spreadsheet.ActiveGrid.InvalidateCell(range, true);
}
```

### Available ExcelKnownColors

The following table lists all available `ExcelKnownColors` enum values for cell backgrounds:

| Color Name | Usage | Color Name | Usage |
|---|---|---|---|
| `Black` | Black color | `Blue` | Blue color |
| `White` | White color | `Red` | Red color |
| `Yellow` | Yellow color | `Magenta` | Magenta color |
| `Cyan` | Cyan color | `Green` | Green color |
| `LightGreen` | Light green color | `Pink` | Pink color |
| `Turquoise` | Turquoise color | `Dark_red` | Dark red color |
| `Dark_blue` | Dark blue color | `Dark_yellow` | Dark yellow color |
| `Violet` | Violet color | `Teal` | Teal color |
| `Grey_25_percent` | 25% grey | `Grey_50_percent` | 50% grey |
| `Grey_80_percent` | 80% grey | `Bright_green` | Bright green color |
| `BlueCustom` | Custom blue | `YellowCustom` | Custom yellow |
| `Red2` | Red color (variant 2) | `Sky_blue` | Sky blue color |
| `Light_turquoise` | Light turquoise | `Light_green` | Light green |
| `Pale_blue` | Pale blue | `Rose` | Rose color |
| `Lavender` | Lavender color | `Tan` | Tan color |
| `Light_blue` | Light blue color | `Aqua` | Aqua color |
| `Lime` | Lime color | `Gold` | Gold color |
| `Light_orange` | Light orange | `Orange` | Orange color |
| `Blue_grey` | Blue-grey color | `Grey_40_percent` | 40% grey |
| `Dark_teal` | Dark teal color | `Sea_green` | Sea green color |
| `Olive_green` | Olive green | `Dark_green` | Dark green color |
| `Brown` | Brown color | `Plum` | Plum color |
| `Indigo` | Indigo color | `BlackCustom` | Custom black |
| `WhiteCustom` | Custom white | `None` | No color |

## Font

```csharp
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A1:B5"];
var gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(range);

range.CellStyle.Font.FontName = "Arial Black";
range.CellStyle.Font.Bold = true;
range.CellStyle.Font.Italic = true;
range.CellStyle.Font.Size = 18;
range.CellStyle.Font.Strikethrough = true;
range.CellStyle.Font.Underline = ExcelUnderline.Single;
range.CellStyle.Font.Color = ExcelKnownColors.Blue;

spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

## Cell Borders

### Single Cell

```csharp
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A5"];
range.Borders.LineStyle = ExcelLineStyle.Dash_dot;
range.Borders.Color = ExcelKnownColors.Gold;
spreadsheet.ActiveGrid.InvalidateCell(range.Row, range.Column);
```

### Range of Cells

```csharp
IRange excelRange = spreadsheet.Workbook.Worksheets[0].Range["C3:D8"];
excelRange.BorderAround(ExcelLineStyle.Double, ExcelKnownColors.Green);
excelRange.BorderInside(ExcelLineStyle.Dotted, ExcelKnownColors.Tan);
var gridRange = GridExcelHelper.ConvertExcelRangeToGridRange(excelRange);
spreadsheet.ActiveGrid.InvalidateCell(gridRange, true);
```

## Cell Alignment

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


### Text Indentation

**Method:** `FormatIndent(bool increase)` on `Spreadsheet`

```csharp
spreadsheet.FormatIndent(true);     // Increase indent
spreadsheet.FormatIndent(false);    // Decrease indent
```

**Method:** `FormatIndentLevel(int level)` on `Spreadsheet`

```csharp
spreadsheet.FormatIndentLevel(3);   // Set indent to level 3
```

## Wrap Text

```csharp
spreadsheet.ActiveSheet.Range["C4"].Text = "Wrapping the content in the cell";
spreadsheet.ActiveSheet.Range["C4"].WrapText = true;
spreadsheet.ActiveSheet.AutofitRow(4);
spreadsheet.ActiveGrid.SetRowHeight(4, 4, spreadsheet.ActiveSheet.GetRowHeightInPixels(4));
spreadsheet.ActiveGrid.InvalidateCell(4, 3);
```

## Number Format

```csharp
// Percentage:
spreadsheet.Workbook.ActiveSheet.Range["C3"].NumberFormat = "0.00%";
spreadsheet.ActiveGrid.InvalidateCell(3, 3);

// Date:
spreadsheet.Workbook.ActiveSheet.Range["D1"].NumberFormat = "m/d/yyyy";
spreadsheet.ActiveGrid.InvalidateCell(1, 4);

// Time:
spreadsheet.Workbook.ActiveSheet.Range["D4"].NumberFormat = "[$-F400]h:mm:ss AM/PM";
spreadsheet.ActiveGrid.InvalidateCell(3, 4);
```

### Number Format Reference

| Format | Notation |
|---|---|
| General | `General` |
| Number | `0.00` |
| Currency | `$* #,##0.00` |
| Accounting | `$* (#,##0.00);$* -??;@` |
| Short Date | `m/d/yyyy` |
| Long Date | `[$-F800]dddd, mmmm dd, yyyy` |
| Time | `[$-F400]h:mm:ss AM/PM` |
| Percentage | `0.00%` |
| Fraction | `#?/?` |
| Scientific | `0.00E+00` |

## Built-In Cell Styles

**Enum:** `BuiltInStyles`

```csharp
spreadsheet.Workbook.ActiveSheet.Range["A3"].BuiltInStyle = BuiltInStyles.Heading2;
spreadsheet.ActiveGrid.InvalidateCell(3, 1);
```

## Format as Table

**Enum:** `TableBuiltInStyles`  
**Interface:** `IListObject`

```csharp
IListObject table = spreadsheet.Workbook.ActiveSheet.ListObjects.Create(
    "Table1",
    spreadsheet.Workbook.ActiveSheet.Range["C1:G5"]
);
table.BuiltInTableStyle = TableBuiltInStyles.TableStyleLight6;
spreadsheet.ActiveGrid.InvalidateCells();
```

## Clear Formatting

**Enum:** `ExcelClearOptions`

```csharp
// Clear all contents and formatting:
spreadsheet.Workbook.Worksheets[0].Range[4, 5].Clear(true);

// Clear only conditional formats:
spreadsheet.Workbook.Worksheets[0].Range[4, 5].Clear(ExcelClearOptions.ClearConditionalFormats);
```

**Available `ExcelClearOptions` values:**

| Option | Description |
|---|---|
| `ClearAll` | Clears all content and formatting. |
| `ClearContents` | Clears only cell values. |
| `ClearFormat` | Clears only formatting (styles). |
| `ClearComments` | Clears only comments. |
| `ClearConditionalFormats` | Clears only conditional formatting rules. |

## See Also

- [Merge Cells](merge-cells.md)
- [Conditional Formatting](conditional-formatting.md)
- [Editing](editing.md)

## Cell Tooltips and Floating Content

### Cell Tooltips (Comments)

Tooltips for cells can come from comments or hyperlink screentips:

- To enable showing comments in the grid, set the `ShowComment` property on the grid:

```csharp
spreadsheet.ActiveGrid.ShowComment = true;
```

### Floating content (images, charts, textboxes)

Objects added via the graphic API (images, charts, textboxes) are rendered above the grid and can be positioned and sized independently of cell layout. Use the shape's `Top`, `Left`, `Height`, and `Width` properties to place floating content.

```csharp
var shape = spreadsheet.AddImage(spreadsheet.ActiveSheet, new RowColumnIndex(5,5), stream);
shape.Top = 150;
shape.Left = 80;
shape.Height = 200;
shape.Width = 300;

// Refresh graphic rendering
spreadsheet.ActiveGrid.GraphicModel.InvalidateGraphicObjects();
spreadsheet.ActiveGrid.GraphicModel.InvalidateGraphicVisual();
```

For more advanced image helpers see the Shapes reference: [Shapes, Charts, Sparklines, Pictures, and TextBoxes](shapes.md).