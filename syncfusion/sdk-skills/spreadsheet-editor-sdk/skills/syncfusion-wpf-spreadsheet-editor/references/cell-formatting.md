# Complete Guide to Cell Formatting, Styling & Manipulation in Syncfusion XlsIO

> Comprehensive reference covering all cell operations — setting (text, numbers, formulas, dates), number formatting, text styling (fonts, colors, effects), cell borders, backgrounds, alignments, text wrapping, built-in styles, table formatting, and clearing formatting using Syncfusion XlsIO for WPF Spreadsheet. To add sample datas into the spreadsheet.

---

## Set Text

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].Text = "Hello World";
}
```

### With Range Notation
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
// By cell name
sheet["B2"].Text = "Sample Text";

// By row/column index (1-based)
sheet[1, 1].Text = "Hello World";
}
```

---

## Set Number

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].Number = 1234.56;
}
```

### With Range Notation
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// Integer value
sheet["B2"].Number = 100;

// Decimal value
sheet[2, 3].Number = 99.99;
}
```

---

## Set Formula

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["C1"].Formula = "=A1+B1";
}
```

### Common Formulas
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// To set formulas to the worksheet
// SUM
sheet["C1"].Formula = "=SUM(A1:A10)";

// AVERAGE
sheet["C2"].Formula = "=AVERAGE(B1:B10)";

// IF condition
sheet["C3"].Formula = "=IF(A1>100,\"High\",\"Low\")";

// VLOOKUP
sheet["C4"].Formula = "=VLOOKUP(A1,D1:E10,2,FALSE)";

// Arithmetic
sheet["C5"].Formula = "=A1*B1-D1";
}
```

### Read Calculated Value
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// Enable calculation before reading
spreadsheet.Workbook.Worksheets[0].EnableSheetCalculations();
double result = sheet["C1"].CalculatedValue != null
    ? double.Parse(sheet["C1"].CalculatedValue)
    : 0;
}
```
---

## Set DateTime

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].DateTime = new DateTime(2026, 3, 9);
}
```

### Date, Time, and DateTime
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
// Date only
sheet["A1"].DateTime = DateTime.Today;

// Date and time
sheet["A2"].DateTime = DateTime.Now;

// Specific date
sheet["A3"].DateTime = new DateTime(2026, 1, 1, 9, 30, 0);

// Apply a display format so Excel renders it correctly
sheet["A1"].NumberFormat = "dd/MM/yyyy";
sheet["A2"].NumberFormat = "dd/MM/yyyy HH:mm:ss";
sheet["A3"].NumberFormat = "MM/dd/yyyy h:mm AM/PM";
}
```

---

## Number Format

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].NumberFormat = "#,##0.00";
}
```

### Common Format Strings
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
// Integer with thousand separator
sheet["A1"].NumberFormat = "#,##0";

// Two decimal places
sheet["A2"].NumberFormat = "#,##0.00";

// Currency (dollar)
sheet["A3"].NumberFormat = "$#,##0.00";

// Percentage
sheet["A4"].NumberFormat = "0.00%";

// Scientific notation
sheet["A5"].NumberFormat = "0.00E+00";

// Date formats
sheet["A6"].NumberFormat = "dd/MM/yyyy";
sheet["A7"].NumberFormat = "MM/dd/yyyy";
sheet["A8"].NumberFormat = "yyyy-MM-dd";

// Time formats
sheet["A9"].NumberFormat = "HH:mm:ss";
sheet["A10"].NumberFormat = "h:mm AM/PM";

// Text (force cell to display as text)
sheet["A11"].NumberFormat = "@";
}
```

### Apply to a Range
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
IRange range = sheet["B1:B20"];
range.NumberFormat = "#,##0.00";
}
```

---

## Cell Borders

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].BorderAround();
}
```

### All Border Options
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
IRange range = sheet["A1:C3"];

// Border around the entire range
range.BorderAround(ExcelLineStyle.Thin, ExcelKnownColors.Black);

// All inner and outer borders
range.BorderInside(ExcelLineStyle.Thin, ExcelKnownColors.Grey_25_percent);
range.BorderAround(ExcelLineStyle.Medium, ExcelKnownColors.Black);

// Individual cell borders
IRange cell = sheet["B2"];
cell.CellStyle.Borders[ExcelBordersIndex.EdgeTop].LineStyle    = ExcelLineStyle.Thin;
cell.CellStyle.Borders[ExcelBordersIndex.EdgeBottom].LineStyle = ExcelLineStyle.Thin;
cell.CellStyle.Borders[ExcelBordersIndex.EdgeLeft].LineStyle   = ExcelLineStyle.Thin;
cell.CellStyle.Borders[ExcelBordersIndex.EdgeRight].LineStyle  = ExcelLineStyle.Thin;

// Set border color
cell.CellStyle.Borders[ExcelBordersIndex.EdgeTop].Color    = ExcelKnownColors.Dark_blue;
cell.CellStyle.Borders[ExcelBordersIndex.EdgeBottom].Color = ExcelKnownColors.Dark_blue;
}
```

### Line Style Options
```csharp
ExcelLineStyle.Thin
ExcelLineStyle.Medium
ExcelLineStyle.Thick
ExcelLineStyle.Dashed
ExcelLineStyle.Dotted
ExcelLineStyle.Double
ExcelLineStyle.Dash_dot
ExcelLineStyle.Medium_dash_dot
ExcelLineStyle.MediumDashed
```

---

## Font Color

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].CellStyle.Font.Color = ExcelKnownColors.Red;
}
```

### Known Colors & Custom RGB
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
// Known color
sheet["A1"].CellStyle.Font.Color = ExcelKnownColors.Blue;

// Custom RGB color
sheet["A2"].CellStyle.Font.RGBColor = Color.FromArgb(255, 0, 128, 0); // Dark green

// Apply to a range
IRange range = sheet["A1:C5"];
range.CellStyle.Font.Color = ExcelKnownColors.Dark_red;
}
```

---

## Fill Color (Background)

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].CellStyle.Color = System.Drawing.Color.LightBlue;
}
```

### Solid Fill & Pattern Fill
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
// Solid background color
sheet["A1"].CellStyle.Color = System.Drawing.Color.LightYellow;

// Using ExcelKnownColors
sheet["A2"].CellStyle.PatternColor = System.Drawing.Color.LightBlue;
sheet["A2"].CellStyle.FillPattern   = ExcelPattern.Solid;

// Custom RGB background
sheet["A3"].CellStyle.Color = System.Drawing.Color.FromArgb(255, 198, 224, 180); // Light green

// Apply to a range
IRange range = sheet["A1:F1"];
range.CellStyle.Color = System.Drawing.Color.FromArgb(255, 68, 114, 196); // Header blue
}
```

---

## Font Styles

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].CellStyle.Font.Bold = true;
}
```

### All Font Style Properties
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
IRange cell = sheet["A1"];

// Bold
cell.CellStyle.Font.Bold = true;

// Italic
cell.CellStyle.Font.Italic = true;

// Underline
cell.CellStyle.Font.Underline = ExcelUnderline.Single;
// ExcelUnderline.Double, ExcelUnderline.SingleAccounting, ExcelUnderline.DoubleAccounting, ExcelUnderline.None

// Strikethrough
cell.CellStyle.Font.Strikethrough = true;

// Font name
cell.CellStyle.Font.FontName = "Calibri";

// Font size
cell.CellStyle.Font.Size = 14;

// Subscript / Superscript
cell.CellStyle.Font.Subscript   = true;
cell.CellStyle.Font.Superscript = true;

// Combined styles
IRange header = sheet["A1:F1"];
header.CellStyle.Font.Bold     = true;
header.CellStyle.Font.FontName = "Calibri";
header.CellStyle.Font.Size     = 12;
header.CellStyle.Font.Color    = ExcelKnownColors.Blue;
}
```

---

## Alignments

### Minimal Code
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["A1"].CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
}
```

### Horizontal & Vertical Alignment
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
IRange cell = sheet["B2"];

// Horizontal alignment
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignLeft;
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignRight;
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignGeneral;
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignJustify;
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignFill;
cell.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenterAcrossSelection;

// Vertical alignment
cell.CellStyle.VerticalAlignment = ExcelVAlign.VAlignTop;
cell.CellStyle.VerticalAlignment = ExcelVAlign.VAlignCenter;
cell.CellStyle.VerticalAlignment = ExcelVAlign.VAlignBottom;
cell.CellStyle.VerticalAlignment = ExcelVAlign.VAlignJustify;

// Indent level (horizontal)
cell.CellStyle.IndentLevel = 2;

// Text rotation (degrees, -90 to 90)
cell.CellStyle.Rotation = 45;
}
```

### Apply to Range
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
var sheet = spreadsheet.Workbook.Worksheets[0];
IRange range = sheet["A1:F1"];
range.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
range.CellStyle.VerticalAlignment   = ExcelVAlign.VAlignCenter;
}
```

---

## Wrap Text
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// To enable Wrap text in spreadsheet
var sheet = spreadsheet.Workbook.Worksheets[0];
sheet["B2"].WrapText = true;
}
```

---

## Built-in Styles
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// To apply build in styles in spreadsheet
var sheet = spreadsheet.Workbook.Worksheets[0];
spreadsheet.Workbook.ActiveSheet.Range["A3"].BuiltInStyle = BuiltInStyles.Heading2;
spreadsheet.ActiveGrid.InvalidateCell(3, 1);
}
```
---

## Format as Table
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
// Creating a table
IListObject table = spreadsheet.Workbook.ActiveSheet.ListObjects.Create("Table1", spreadsheet.Workbook.ActiveSheet.Range["C1:G5"]);

// Formatting table with a built-in style
table.BuiltInTableStyle = TableBuiltInStyles.TableStyleLight6;
spreadsheet.ActiveGrid.InvalidateCells();
}
```
---

## Clear formatting
```csharp
spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
void spreadsheet_WorkbookLoaded(object sender, WorkbookLoadedEventArgs args)
{
//To clear the contents along with its formatting in the range,   
spreadsheet.Workbook.Worksheets[0].Range[4, 5].Clear(true);

//To clear the range with specified ExcelClearOptions,
spreadsheet.Workbook.Worksheets[0].Range[4, 5].Clear(ExcelClearOptions.ClearConditionalFormats);

// ExcelClearOptions
ExcelClearOptions.ClearFormat
ExcelClearOptions.ClearContent
ExcelClearOptions.ClearComment
ExcelClearOptions.ClearAll
ExcelClearOptions.ClearConditionalFormats
ExcelClearOptions.ClearDataValidations
}
```
---


## References

- [Syncfusion XlsIO - Cell Formatting](https://help.syncfusion.com/file-formats/xlsio/cell-formatting)
- [WPF Spreadsheet Overview](https://help.syncfusion.com/wpf/spreadsheet/overview)

