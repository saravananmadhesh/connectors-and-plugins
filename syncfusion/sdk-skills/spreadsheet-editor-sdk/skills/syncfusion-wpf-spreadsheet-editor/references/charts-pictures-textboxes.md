# Charts, Pictures, and Textboxes

> Import and display charts, pictures, and textboxes in WPF Spreadsheet control, select shapes ,Access the selected shapes and clear the selected shapes in the Spreadsheet. 
Import Chart excel files in the spreadsheet.

---

## ⚠️ PREREQUISITES - IMPORTANT

**Before using Charts, ensure all required DLLs are added to your project:**
- Install `Syncfusion.SfSpreadsheetHelper.WPF` NuGet package
- Or manually add DLL references via **Right-click Project > Add Reference**
- Verify DLLs appear in **Solution Explorer > Dependencies > Assemblies**

**Required Assemblies:**
```xml
Syncfusion.SfSpreadsheetHelper.WPF.dll
Syncfusion.ExcelChartToImageConverter.WPF.dll
Syncfusion.SfChart.WPF.dll
```

---

## Overview

Supports adding and editing charts, images, and textboxes to enhance data visualization and presentation.

---

## Key Features
- Insert and edit Excel-compatible charts
- Add pictures and images
- Insert and format textboxes

---

## Charts
SfSpreadsheet provides support to import charts from excel which are used to represent numeric data in graphical format to make it easier to understand large quantities of data.

## Assembly Reference & Namespaces
```csharp
// Namespaces
using Syncfusion.UI.Xaml.SpreadsheetHelper;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;
```

```csharp
public MainWindow()
{
    InitializeComponent();

    // Register chart renderer
    this.spreadsheet.AddGraphicChartCellRenderer(new GraphicChartCellRenderer());
}
```
## Adding the Charts at Runtime

```csharp
// Namespaces
using Syncfusion.XlsIO.Implementation.Shapes;
using Syncfusion.UI.Xaml.SpreadsheetHelper;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;

public MainWindow()
{
    this.Loaded += MainWindow_Loaded;
}
private void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    // To render chart into the spreadsheet
    var chart = spreadsheet.AddChart(spreadsheet.ActiveSheet);
    object[] Y_values = new object[] { 200, 100, 100 };
    object[] X_values = new object[] { "Total Income", "Expenses", "Profit" };
    IChartSerie series = chart.Series.Add(ExcelChartType.Pie);

    // Enters the X and Y values directly
    series.EnteredDirectlyValues = Y_values;
    series.EnteredDirectlyCategoryLabels = X_values;
    var shape = chart as ShapeImpl;

    // Re-Positioning Chart
    shape.Top = 200;
    shape.Left = 200;

    //Re-sizing a Chart
    shape.Height = 300;
    shape.Width = 300;
}
```
---

## Pictures

```csharp
// Namespaces
using Syncfusion.UI.Xaml.Grid.ScrollAxis;
using Syncfusion.UI.Xaml.Spreadsheet.Helpers;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;

private void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    // To insert the image to the spreadsheet ActiveGrid
    var worksheet = spreadsheet.ActiveSheet;
    string imagePath = "user input path";

    // Check if file exists
    if (File.Exists(imagePath))
    {
        // Open the image file as a stream
        using (FileStream stream = new FileStream(imagePath, FileMode.Open, FileAccess.Read))
        {
            // Insert image at cell position A1 (RowColumnIndex(1,1) represents A1)
            var shape = spreadsheet.AddImage(worksheet, new RowColumnIndex(1, 1), stream);
            
            // Optional: Resize the image
        

            shape.Height = 200;
            shape.Width = 200;

            // Re-Positioning Picture
            shape.Top = 200;
            shape.Left = 200;
        }
    }
}
```

---

## TextBox

```csharp
//Namespaces
using Syncfusion.XlsIO.Implementation.Shapes;

// To insert the RichTextBox to the spreadsheet ActiveGrid
var rtfText = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset1 Calibri;}{\\f1\\fnil\\fcharset1 Calibri;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green0\\blue0;}{\\f0\\fs22\\b\\cf1\\u83*\\u121*\\u110*\\u99*\\u102*\\u117*\\u115*\\u105*\\u111*\\u110*\\u32*\\b0}                           {\\f1\\fs22\\cf2\\u83*\\u111*\\u102*\\u116*\\u119*\\u97*\\u114*\\u101*\\u32*}{\\f1\\fs22\\cf1\\u80*\\u118*\\u116*\\u46*\\u32*\\u76*\\u116*\\u100*}}";
var textBox = spreadsheet.AddTextBox(spreadsheet.ActiveSheet, new RowColumnIndex(5, 5), new Size(200, 200), rtfText) as TextBoxShapeImpl;

// Re-positioning RichTextBox
textBox.Left = 200;
textBox.Top = 200;
```

## Selecting a shape programmatically

```csharp
using Syncfusion.XlsIO.Implementation.Shapes;
 
// To select a shape programmatically in the spreadsheet
private void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    var shape = spreadsheet.ActiveSheet.Shapes[0] as ShapeImpl;          
    spreadsheet.ActiveGrid.GraphicModel.AddSelectedShapes(shape);
}
```

## Accessing the selected shapes
```csharp
// To access the selected shape 
private void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    var selectedShape = spreadsheet.ActiveGrid.GraphicModel.SelectedShapes;

    for(int i = 0; i < selectedShape.Count ; i++)
    {

        if(ExcelShapeType.Chart == selectedShape[i].ShapeType)
        {
            var chart = selectedShape[i] as IChart;
            chart.ChartArea.Fill.FillType = ExcelFillType.Gradient;
            chart.ChartArea.Fill.ForeColor = System.Drawing.Color.Blue;
        }

        else if(ExcelShapeType.Picture == selectedShape[i].ShapeType)
        {
            var picture = selectedShape[i] as ShapeImpl;
            picture.Height = 100;
            picture.Width = 100;
        }
    }
    spreadsheet.ActiveGrid.GraphicModel.InvalidateGraphicObjects();
    spreadsheet.ActiveGrid.GraphicModel.InvalidateGraphicVisual();
}
```

## Clearing Shape selection

```csharp
// To clear the selcted shapes in the spreadsheet
private void MainWindow_Loaded(object sender, RoutedEventArgs e)
{
    spreadsheet.ActiveGrid.GraphicModel.ClearSelection();
}
```
---




## Example

Insert a chart to visualize data trends, or add an image for branding.



---

## References
- [Charts, Pictures, and Textboxes Documentation](https://help.syncfusion.com/document-processing/excel/spreadsheet/wpf/shapes)
