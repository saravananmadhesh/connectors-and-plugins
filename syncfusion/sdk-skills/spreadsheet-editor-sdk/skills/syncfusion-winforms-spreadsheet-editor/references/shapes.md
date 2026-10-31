# Shapes, Charts, Sparklines, Pictures, and TextBoxes

This section explains how to import charts, sparklines, pictures, and textboxes in Spreadsheet.

## Charts

Spreadsheet provides support to import charts from Excel which are used to represent numeric data in graphical format to make it easier to understand large quantities of data.

### Setup

For importing charts in Spreadsheet, add the following assembly as reference into the application.

**Assembly:** `Syncfusion.SpreadsheetHelper.Windows.dll`

Create an instance of `Syncfusion.Windows.Forms.SpreadsheetHelper.GraphicChartCellRenderer` and add that renderer into GraphicCellRenderers collection by using the helper method `AddGraphicChartCellRenderer` which is available under the namespace `Syncfusion.Windows.Forms.Spreadsheet.GraphicCells`.

**C#**

```csharp
public Form1()
{
    InitializeComponent();
  
    //For importing charts
    this.spreadsheet.AddGraphicChartCellRenderer(new GraphicChartCellRenderer());
}
```

### Adding Charts at Runtime

For adding Charts in Spreadsheet at runtime, use the `AddChart` method. You can also resize and reposition the chart.

**C#**

```csharp
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
```

## Sparklines

For importing sparklines in Spreadsheet, add the following assembly as reference into the application.

**Assembly:** `Syncfusion.SpreadsheetHelper.Windows.dll`

Create an instance of `Syncfusion.Windows.Forms.SpreadsheetHelper.SparklineCellRenderer` and add that renderer into Spreadsheet by using the helper method `AddSparklineCellRenderer` which is available under the namespace `Syncfusion.Windows.Forms.Spreadsheet.GraphicCells`.

**C#**

```csharp
public Form1()
{
    InitializeComponent();
      
    //For importing sparklines
    this.spreadsheet.AddSparklineCellRenderer(new SparklineCellRenderer());
}
```

## Pictures

Spreadsheet provides support to import images in SpreadsheetGrid. To add an image at runtime, use the `AddImage` method. You can also resize and reposition the image.

**C#**

```csharp
var worksheet = spreadsheet.ActiveSheet;
var stream = typeof(MainWindow).Assembly.GetManifestResourceStream("GraphicCellDemo.Data.Sample.jpg");
var shape = spreadsheet.AddImage(worksheet, new RowColumnIndex(5, 5), stream);

// Re-Positioning Picture
shape.Top = 200;
shape.Left = 200;

// Re-sizing a Picture
shape.Height = 200;
shape.Width = 200;
```

## TextBoxes

Spreadsheet provides support to import RichText Box in SpreadsheetGrid. To add a rich text box at runtime, use the `AddTextBox` method.

**C#**

```csharp
var rtfText = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset1 Calibri;}{\\f1\\fnil\\fcharset1 Calibri;}}{\\colortbl;\\red0\\green0\\blue0;\\red255\\green0\\blue0;}{\\f0\\fs22\\b\\cf1\\u83*\\u121*\\u110*\\u99*\\u102*\\u117*\\u115*\\u105*\\u111*\\u110*\\u32*\\b0}                           {\\f1\\fs22\\cf2\\u83*\\u111*\\u102*\\u116*\\u119*\\u97*\\u114*\\u101*\\u32*}{\\f1\\fs22\\cf1\\u80*\\u118*\\u116*\\u46*\\u32*\\u76*\\u116*\\u100*}}";
var textBox = spreadsheet.AddTextBox(spreadsheet.ActiveSheet, new RowColumnIndex(5, 5), new Size(200, 200), rtfText) as TextBoxShapeImpl;

// Re-positioning RichTextBox
textBox.Left = 200;
textBox.Top = 200;
```

## Accessing Selected Shapes

Spreadsheet allows the user to access the selected shapes and modify the properties associated with it in SpreadsheetGrid.

**C#**

```csharp
var selectedShape = spreadsheet.ActiveGrid.GraphicModel.SelectedShapes;

for(int i = 0; i < selectedShape.Count ; i++)
{
    if(ExcelShapeType.Chart == selectedShape[i].ShapeType)
    {
        var chart = selectedShape[i] as IChart;
        chart.ChartArea.Fill.FillType = ExcelFillType.Gradient;
        chart.ChartArea.Fill.ForeColor = Color.Blue;
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
```

## Selecting a Shape Programmatically

Users can select a shape programmatically by using the `AddSelectedShapes` method of the `GraphicModel` class.

**C#**

```csharp
var shape = spreadsheet.ActiveSheet.Shapes[2] as ShapeImpl;          
spreadsheet.ActiveGrid.GraphicModel.AddSelectedShapes(shape);
```

## Clearing Selection

Users can clear the selection from the shapes and move the selection to the grid using the `ClearSelection` method of the `GraphicModel` class.

**C#**

```csharp
spreadsheet.ActiveGrid.GraphicModel.ClearSelection();
```

## Related APIs

| API | Description |
|-----|-------------|
| `AddChart()` | Adds a chart to the active sheet |
| `AddImage()` | Adds an image to the active sheet |
| `AddTextBox()` | Adds a rich text box to the active sheet |
| `AddGraphicChartCellRenderer()` | Registers chart renderer for importing charts |
| `AddSparklineCellRenderer()` | Registers sparkline renderer for importing sparklines |
| `GraphicModel.SelectedShapes` | Gets the collection of selected shapes |
| `GraphicModel.AddSelectedShapes()` | Selects a shape programmatically |
| `GraphicModel.ClearSelection()` | Clears shape selection |
| `ShapeImpl` | Represents a shape object with positioning and sizing properties |
| `IChart` | Interface representing a chart object |
| `ExcelShapeType` | Enum for shape types (Chart, Picture, TextBox, etc.) |

## Advanced image APIs

In addition to `spreadsheet.AddImage(...)`, the `Syncfusion.Windows.Forms.Spreadsheet.GraphicCells.GraphicCellHelper` class exposes helper APIs for adding images programmatically at a lower level. This can be useful when you need to target a specific worksheet or provide a Stream directly.

Example signature (from the WinForms API):

`public static ShapeImpl AddImage(Spreadsheet spreadsheet, IWorksheet worksheet, RowColumnIndex location, Stream imageStream)`

Example usage:

```csharp
            string resourceName = "WindowsFormsApp1.Data.WF_25298.png";
            using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                {
                    MessageBox.Show("Embedded resource not found:\n" + resourceName);
                    return;
                }
                var worksheet = spreadsheet.Workbook.Worksheets[0];
                var shape = GraphicCellHelper.AddImage(
                    spreadsheet,
                    worksheet,
                    new RowColumnIndex(5, 5), // Row 5, Column 5
                    stream
                );
                shape.Height = 200;
                shape.Width = 200;
            }
```

This API bypasses some higher-level renderer registration and inserts the image directly into the target worksheet's graphic model.