# Conversion

> Export workbook to PDF, HTML, Image, and CSV in WPF Spreadsheet control. Printing support in the Spreadsheet control.

---

## Overview

Supports exporting spreadsheets to various formats for sharing and reporting.

---

## Key Features
- Export to PDF, HTML, image, CSV
- Maintain formatting and layout
- Easy sharing and distribution

---

## Example

Export a worksheet as PDF for printing or sharing with others.

## Convert to Image
```csharp
// To export the worksheet to image
IWorksheet sheet = spreadsheet.Workbook.ActiveSheet;
sheet.UsedRangeIncludesFormatting = false;
int lastRow = sheet.UsedRange.LastRow + 1;
int lastColumn = sheet.UsedRange.LastColumn + 1;
System.Drawing.Image image = sheet.ConvertToImage(1, 1, lastRow, lastColumn, ImageType.Bitmap, null);
image.Save("Sample.png", ImageFormat.Png);
System.Diagnostics.Process.Start("Sample.png");
```
## Convert to PDF
```csharp
//Namespace
using Syncfusion.Pdf;
using Syncfusion.ExcelToPdfConverter;

// To export the worksheet to PDF
ExcelToPdfConverter converter = new ExcelToPdfConverter(spreadsheet.Workbook);

//Initialize the PdfDocument
PdfDocument pdfDoc = new PdfDocument();

//Initialize the ExcelToPdfConverter Settings
ExcelToPdfConverterSettings settings = new ExcelToPdfConverterSettings();
settings.LayoutOptions = LayoutOptions.NoScaling;

//Assign the PdfDocument to the templateDocument property of ExcelToPdfConverterSettings
settings.TemplateDocument = pdfDoc;
settings.DisplayGridLines = GridLinesDisplayStyle.Invisible;

//Convert Excel Document into PDF document
pdfDoc = converter.Convert(settings);

//Save the PDF file
pdfDoc.Save("Sample.pdf");
System.Diagnostics.Process.Start("Sample.pdf");
```
## Convert to HTML
```csharp
// To convert the worksheet into HTML page
spreadsheet.Workbook.SaveAsHtml("Sample.html", HtmlSaveOptions.Default);
System.Diagnostics.Process.Start("Sample.html");
```

## Printing in SfSpreadsheet

```csharp

//Namespace
using Syncfusion.Pdf;
using Syncfusion.ExcelToPdfConverter;
using Syncfusion.Windows.PdfViewer;

// To print the data in the workbook with the help of PDF Conversion

//Create the pdf viewer for load the document.
PdfViewerControl pdfViewer = new PdfViewerControl();

//Create Memory Stream to save pdf document
MemoryStream pdfStream = new MemoryStream();
ExcelToPdfConverter converter = new ExcelToPdfConverter (spreadsheet.Workbook);  

//Initialize the ExcelToPdfConverter Settings
ExcelToPdfConverterSettings settings = new ExcelToPdfConverterSettings(); 
settings.LayoutOptions = LayoutOptions.NoScaling;

//Initialize the PdfDocument
PdfDocument pdfDoc = new PdfDocument ();

//Assign the PdfDocument to the templateDocument property of ExcelToPdfConverterSettings  
settings.TemplateDocument = pdfDoc;
settings.DisplayGridLines = GridLinesDisplayStyle.Invisible;

//Convert Excel Document into PDF document
pdfDoc = converter.Convert(settings);

//Save the PDF file     
pdfDoc.Save(pdfStream);

//Load the document to pdf viewer
pdfViewer.Load(pdfStream);

//Print the doc
pdfViewer.Print(true);
```

---

## References
- [Conversion Documentation](https://help.syncfusion.com/wpf/spreadsheet/exporting)
