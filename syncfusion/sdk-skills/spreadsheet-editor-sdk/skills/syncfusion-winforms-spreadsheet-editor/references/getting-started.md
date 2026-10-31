# Getting Started with Windows Forms Spreadsheet

This section describes how to add and configure the WinForms Spreadsheet control in a Windows Forms application.

## Prerequisites and Setup Requirements

Before using the Windows Forms Spreadsheet component, ensure the following setup is complete:

### 1. NuGet Package Installation

Required packages in your `.csproj` file:

```
dotnet add package Syncfusion.Spreadsheet.Windows
dotnet add package Syncfusion.SpreadsheetHelper.Windows
dotnet add package Syncfusion.ExcelToPdfConverter.WinForms
```

### 2. Form.cs Configuration

For add **Spreadsheet**:

```csharp
using Syncfusion.Windows.Forms.Spreadsheet;
using Syncfusion.Windows.Forms.Spreadsheet.Helpers;
```

For add  **Chart OR Sparkline**:

```csharp
using Syncfusion.Windows.Forms.Spreadsheet.GraphicCells;
```

For CellGrid-related tasks such as while using the grid range
```csharp
using Syncfusion.Windows.Forms.CellGrid;
```

For Excel‑related tasks such as converting GridRange to Excel range and Excel range to GridRange.

```csharp
using Syncfusion.Windows.Forms.Spreadsheet.Helpers;
```

For add shapes like chart apark lines at run time
```csharp
using Syncfusion.XlsIO.Implementation.Shapes;
```

For RowColumnIndex indexs
```csharp
using Syncfusion.Windows.Forms.CellGrid.ScrollAxis;
```

For XlSIO API's like IWorksheet
```csharp
using Syncfusion.XlsIO;
using Syncfusion.XlsIO.Implementation;
```
### Basic spreadsheet code

### Minimal code
```csharp
private Spreadsheet spreadsheet;
spreadsheet = new Spreadsheet();
SpreadsheetRibbon ribbon = new SpreadsheetRibbon() { Spreadsheet = spreadsheet };
spreadsheet.Dock = DockStyle.Fill;
spreadsheet.Anchor = AnchorStyles.Left | AnchorStyles.Top;
          
this.Controls.Add(spreadsheet);
this.Controls.Add(ribbon);
```

## Creating a New Excel Workbook

**Method:** `Create(int worksheetCount)`

```csharp
spreadsheet.Create(2);
```

## Opening an Existing Excel Workbook

**Method overloads:** `Open(Stream file)` / `Open(string file)` / `Open(IWorkbook workbook)`

```csharp
// Using Stream:
spreadsheet.Open(Stream file);

// Using String (file path):
spreadsheet.Open(string file);

// Using IWorkbook:
spreadsheet.Open(IWorkbook workbook);

// Example:
spreadsheet.Open(@"..\..\Data\Outline.xlsx");
```

## Saving the Excel Workbook

**Methods:** `Save()` / `SaveAs()`

```csharp
// Save to existing file:
spreadsheet.Save();

// Save to stream:
spreadsheet.SaveAs(Stream file);

// Save to file path:
spreadsheet.SaveAs(string file);

// Save with dialog:
spreadsheet.SaveAs();
```

## Displaying Charts

To display charts in Spreadsheet, add the optional assembly `Syncfusion.SpreadsheetHelper.Windows.dll` and register the chart renderer.

**Class:** `Syncfusion.Windows.Forms.SpreadsheetHelper.GraphicChartCellRenderer`  
**Method:** `AddGraphicChartCellRenderer` (namespace: `Syncfusion.Windows.Forms.Spreadsheet.GraphicCells`)

```csharp
using Syncfusion.Windows.Forms.Spreadsheet.GraphicCells;
using Syncfusion.Windows.Forms.SpreadsheetHelper;

public Form1()
{
    InitializeComponent();
    this.spreadsheet.AddGraphicChartCellRenderer(new GraphicChartCellRenderer());
}
```

## Displaying Sparklines

To display sparklines in Spreadsheet, register the sparkline renderer.

**Class:** `Syncfusion.Windows.Forms.SpreadsheetHelper.SparklineCellRenderer`  
**Method:** `AddSparklineCellRenderer` (namespace: `Syncfusion.Windows.Forms.Spreadsheet.GraphicCells`)

```csharp
using Syncfusion.Windows.Forms.Spreadsheet.GraphicCells;
using Syncfusion.Windows.Forms.SpreadsheetHelper;

public Form1()
{
    InitializeComponent();
    this.spreadsheet.AddSparklineCellRenderer(new SparklineCellRenderer());
}
```
## See Also

- [Overview](overview.md)
- [Editing](editing.md)
- [Formulas](formulas.md)
- [WinForms Spreadsheet Demo](https://github.com/syncfusion/winforms-demos/tree/master/spreadsheet)