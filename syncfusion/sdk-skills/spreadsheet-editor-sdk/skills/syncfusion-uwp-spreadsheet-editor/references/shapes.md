# Shapes — UWP Spreadsheet

> Learn how to work with shapes such as charts, sparklines, pictures, and text boxes in the Syncfusion UWP Spreadsheet (SfSpreadsheet) control.

---

## Overview

The **Shapes** feature in SfSpreadsheet allows you to import and manage graphical objects like charts, sparklines, pictures, and rich text boxes in a worksheet. These shapes can be added at runtime and repositioned or resized programmatically.

---

## Charts

SfSpreadsheet supports importing charts from Excel files and adding charts dynamically at runtime. Charts help represent numeric data visually for better analysis. 

### Register Chart Renderer

To enable chart rendering support, place the following code **in the page constructor**:

```csharp
this.spreadsheet.AddGraphicChartCellRenderer(new GraphicChartCellRenderer());
```

**Required Namespaces:**
```csharp
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;
using Syncfusion.UI.Xaml.SpreadsheetHelper;
```

**Complete Constructor Example:**
```csharp
public MainPage()
{
    InitializeComponent();
    this.spreadsheet.AddGraphicChartCellRenderer(new GraphicChartCellRenderer());
}
```

### Add Chart at Runtime

```csharp
// Namespace
using Syncfusion.UI.Xaml.SpreadsheetHelper;
using Syncfusion.XlsIO.Implementation.Shapes;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;
using Syncfusion.XlsIO;

var chart = spreadsheet.AddChart(spreadsheet.ActiveSheet);

object[] yValues = new object[] { 200, 100, 100 };
object[] xValues = new object[] { "Total Income", "Expenses", "Profit" };

IChartSerie series = chart.Series.Add(ExcelChartType.Pie);
series.EnteredDirectlyValues = yValues;
series.EnteredDirectlyCategoryLabels = xValues;

var shape = chart as ShapeImpl;

// Reposition chart
shape.Top = 200;
shape.Left = 200;

// Resize chart
shape.Height = 300;
shape.Width = 300;
```

---

## Sparklines

Sparklines provide small inline charts to visualize data trends. SfSpreadsheet supports importing sparklines from Excel files.

### Register Sparkline Renderer

```csharp
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;
using Syncfusion.UI.Xaml.SpreadsheetHelper;

public MainWindow()
{
    InitializeComponent();
    // Enable sparkline rendering support
    this.spreadsheet.AddSparklineCellRenderer(new SparklineCellRenderer());
}
```

---

## Pictures

SfSpreadsheet allows importing images into the worksheet and manipulating them programmatically.

### Add Image at Runtime

```csharp
// Namespace
using Syncfusion.UI.Xaml.Grid.ScrollAxis;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;

var worksheet = spreadsheet.ActiveSheet;
var stream = typeof(MainPage).Assembly.GetManifestResourceStream("GraphicCellDemo.Data.Sample.jpg");
var shape = spreadsheet.AddImage(worksheet, new RowColumnIndex(5, 5), stream);

// Re-Positioning Picture
shape.Top = 200;
shape.Left = 200;

 //Re-sizing a Picture
shape.Height = 200;
shape.Width = 200;
```

---

## Text Boxes

Rich text boxes can be added to the spreadsheet for displaying formatted text.

### Add Text Box

```csharp
//Namespace
using Syncfusion.UI.Xaml.Grid.ScrollAxis;
using Syncfusion.UI.Xaml.Spreadsheet.GraphicCells;
using Syncfusion.XlsIO.Implementation.Shapes;

var rtfText = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset1 Calibri;}{\\f1\\fnil\\fcharset1 Calibri;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green0\\blue0;}{\\f0\\fs22\\b\\cf1\\u83*\\u121*\\u110*\\u99*\\u102*\\u117*\\u115*\\u105*\\u111*\\u110*\\u32*\\b0}                           {\\f1\\fs22\\cf2\\u83*\\u111*\\u102*\\u116*\\u119*\\u97*\\u114*\\u101*\\u32*}{\\f1\\fs22\\cf1\\u80*\\u118*\\u116*\\u46*\\u32*\\u76*\\u116*\\u100*}}";
var textBox = spreadsheet.AddTextBox(spreadsheet.ActiveSheet, new RowColumnIndex(5, 5), new Size(200, 200), rtfText) as TextBoxShapeImpl;

// Re-positioning RichTextBox
textBox.Left = 200;
textBox.Top = 200;
```

---

## Accessing Selected Shapes

Selected shapes in the spreadsheet grid can be accessed and modified through the `GraphicModel`.

```csharp
// Namespace
using Syncfusion.XlsIO;
using Syncfusion.XlsIO.Implementation.Shapes;

var selectedShapes = spreadsheet.ActiveGrid.GraphicModel.SelectedShapes;

for (int i = 0; i < selectedShapes.Count; i++)
{
    if (selectedShapes[i].ShapeType == ExcelShapeType.Chart)
    {
        var chart = selectedShapes[i] as IChart;
        chart.ChartArea.Fill.FillType = ExcelFillType.Gradient;
        chart.ChartArea.Fill.ForeColor = Colors.Blue;
    }
    else if (selectedShapes[i].ShapeType == ExcelShapeType.Picture)
    {
        var picture = selectedShapes[i] as ShapeImpl;
        picture.Height = 100;
        picture.Width = 100;
    }
}

spreadsheet.ActiveGrid.GraphicModel.InvalidateGraphicObjects();
spreadsheet.ActiveGrid.GraphicModel.InvalidateGraphicVisual();
```

---

## Selecting Shapes Programmatically

Shapes can be selected programmatically using the `AddSelectedShapes` method. citeturn5search14

```csharp
// Namespace
using Syncfusion.XlsIO.Implementation.Shapes;

var shape = spreadsheet.ActiveSheet.Shapes[2] as ShapeImpl;
spreadsheet.ActiveGrid.GraphicModel.AddSelectedShapes(shape);
```

---

## Clearing Shape Selection

Clear shape selections and return focus to the grid using the `ClearSelection` method.

```csharp
spreadsheet.ActiveGrid.GraphicModel.ClearSelection();
```

---


