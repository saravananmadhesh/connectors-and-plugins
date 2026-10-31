# Conversion in Windows Forms Spreadsheet

The WinForms Spreadsheet control supports exporting the workbook to Image, PDF, and HTML formats.

## Convert to Image

**Method:** `ConvertToImage(int firstRow, int firstColumn, int lastRow, int lastColumn, ImageType imageType, object stream)` on `IWorksheet`

```csharp
IWorksheet sheet = spreadsheet.Workbook.ActiveSheet;
sheet.UsedRangeIncludesFormatting = false;
int lastRow = sheet.UsedRange.LastRow + 1;
int lastColumn = sheet.UsedRange.LastColumn + 1;

System.Drawing.Image image = sheet.ConvertToImage(
    1, 1, lastRow, lastColumn,
    ImageType.Bitmap,
    null
);
image.Save("Sample.png", ImageFormat.Png);
System.Diagnostics.Process.Start("Sample.png");
```

**`ImageType` enum values:**

| Value | Description |
|---|---|
| `Bitmap` | Converts the worksheet to a Bitmap image. |
| `Metafile` | Converts the worksheet to a Windows Metafile (WMF/EMF). |

## Convert to PDF

### Required Assemblies

| Assembly | Description |
|---|---|
| `Syncfusion.ExcelToPDFConverter.Base.dll` | Contains base classes for Excel to PDF conversion. |
| `Syncfusion.Pdf.Base.dll` | Contains base classes for creating PDF documents. |

**Namespace:** `Syncfusion.ExcelToPdfConverter`  
**Class:** `ExcelToPdfConverter`  
**Method:** `Convert(ExcelToPdfConverterSettings settings)`

```csharp
using Syncfusion.ExcelToPdfConverter;
using Syncfusion.Pdf;

ExcelToPdfConverter converter = new ExcelToPdfConverter(spreadsheet.Workbook);
PdfDocument pdfDoc = new PdfDocument();
ExcelToPdfConverterSettings settings = new ExcelToPdfConverterSettings();
settings.LayoutOptions = LayoutOptions.NoScaling;
settings.TemplateDocument = pdfDoc;
settings.DisplayGridLines = GridLinesDisplayStyle.Invisible;

pdfDoc = converter.Convert(settings);
pdfDoc.Save("Sample.pdf");
System.Diagnostics.Process.Start("Sample.pdf");
```

### ExcelToPdfConverterSettings Properties

| Property | Description |
|---|---|
| `LayoutOptions` | Specifies the layout scaling option when converting to PDF. |
| `TemplateDocument` | Gets or sets the `PdfDocument` template to use. |
| `DisplayGridLines` | Gets or sets whether grid lines are visible in the PDF output. |

**`LayoutOptions` enum values:**

| Value | Description |
|---|---|
| `NoScaling` | No scaling is applied during conversion. |
| `FitAllColumnsOnOnePage` | Fits all columns to a single page width. |
| `FitAllRowsOnOnePage` | Fits all rows to a single page height. |
| `FitSheetOnOnePage` | Fits the entire sheet on a single page. |

**`GridLinesDisplayStyle` enum values:**

| Value | Description |
|---|---|
| `Default` | Uses the default grid lines setting from the Excel file. |
| `Visible` | Shows grid lines in the PDF output. |
| `Invisible` | Hides grid lines in the PDF output. |

## Convert to HTML

**Method:** `SaveAsHtml(string fileName, HtmlSaveOptions options)` on `IWorkbook`

**Parameters:**
- `fileName` - The output file name or file path where the HTML will be saved (e.g., "Sample.html")
- `options` - HTML export options (typically `HtmlSaveOptions.Default`)

```csharp
// Using file name only (saves to current directory):
spreadsheet.Workbook.SaveAsHtml("Sample.html", HtmlSaveOptions.Default);

System.Diagnostics.Process.Start("Sample.html");
```

## See Also

- [Getting Started](getting-started.md)
- [Overview](overview.md)
