# Getting Started with WPF Spreadsheet (SfSpreadsheet)

> Setting up, configuring, and displaying the SfSpreadsheet control in a WPF application — assemblies, XAML setup, creating/opening/saving workbooks, importing/exporting DataTables.

---

## Prerequisites and Setup Requirements
 
Before using the WPF Spreadsheet component, ensure the following setup is complete:
 
### 1. NuGet Package Installation
 
Required packages in your `.csproj` file:
 
```
dotnet add package Syncfusion.SfSpreadsheet.WPF
dotnet add package Syncfusion.SfSpreadsheetHelper.WPF
dotnet add package Syncfusion.ExcelToPDFConverter.WPF
dotnet add package Syncfusion.PDFViewer.WPF
```
 
### 2. MainWindow.xaml.cs Configuration
 
 ### For add spreadhseet
 
```csharp
using Syncfusion.UI.Xaml.Spreadsheet;
```

### For CellGrid related task such as while using GridRangeInfo
```csharp
using Syncfusion.UI.Xaml.CellGrid;
```
### For Excel‑related tasks such as converting GridRange to Excel range and Excel range to GridRange and Workbookloaded event trigger
```csharp
using Syncfusion.UI.Xaml.Spreadsheet.Helpers;
```

### For Xlsio API's like IRange, ExcelLineStyle, ExcelKnownColors
```csharp
using Syncfusion.XlsIO;
```
### For add WorksheetImpl class 
```csharp

using Syncfusion.XlsIO.Implementation;
```

### For add or accessing shapes
```csharp
using Syncfusion.XlsIO.Implementation.Shapes;
```

 
### MainWindow.xaml Configuration
```xaml
xmlns:syncfusion="http://schemas.syncfusion.com/wpf"
```
---

## Basic Spreadsheet Code

### Minimal Code
```xml
<syncfusion:SfSpreadsheet x:Name="spreadsheet" FormulaBarVisibility="Visible"/>
```

### With Ribbon (RibbonWindow required)
```xml
<syncfusion:RibbonWindow
    x:Class="SpreadsheetDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:syncfusion="http://schemas.syncfusion.com/wpf"
    syncfusion:SkinStorage.VisualStyle="Office2013">

    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <syncfusion:SfSpreadsheetRibbon
            DataContext="{Binding ElementName=spreadsheet}"
            Grid.Row="0"/>

        <syncfusion:SfSpreadsheet
            
- if Xaml contains the spreadheet++t contro l and x:Name="spreadsheet"
            Grid.Row="1"/>
    </Grid>
</syncfusion:RibbonWindow>
```

## ✅ CORRECT ALTERNATIVES

### Alternative 1: Use StackPanel Without Padding

**❌ INCORRECT:**
```xaml
<StackPanel Padding="10,10,10,10">
    <TextBlock Text="Content"/>
</StackPanel>
```

**✅ CORRECT:**
```xaml
<StackPanel>
    <TextBlock Text="Content"/>
</StackPanel>
```

### Alternative 2: Use `.Number` Property Instead of `.Value`

For setting numeric and date values in cell ranges, use the **`.Number`** property instead of `.Value`:

**❌ INCORRECT:**
```csharp
spreadsheet.Workbook.Worksheets[0].Range["A2"].Value = 12345;
spreadsheet.Workbook.Worksheets[0].Range["A3"].Value = DateTime.Now;
```

**✅ CORRECT:**
```csharp
spreadsheet.Workbook.Worksheets[0].Range["A2"].Number = 1234;
spreadsheet.Workbook.Worksheets[0].Range["A3"].Number = DateTime.Now.ToString();
```

### Alternative 3: Use `.SetColumnWidth()` Method Instead of `.Width` Property

For setting column width in a range, use the **`.SetColumnWidth()`** method from `ActiveGrid` instead of accessing `.Columns[].Width`:

**❌ INCORRECT:**
```csharp
spreadsheet.Workbook.Worksheets[0].Columns[0].Width = 2000;
```

**✅ CORRECT:**
```csharp
spreadsheet.ActiveGrid.SetColumnWidth(1, 1, 30);
```

### Alternative 4: Use `GridRange` for Selection Instead of `IRange`/Excel Range

For making cell selections and range operations, use **`GridRange`** (from `ActiveGrid`) instead of `IRange` or Excel range objects:

**❌ INCORRECT:**
```csharp
IRange range = spreadsheet.Workbook.Worksheets[0].Range["A1:D10"];
spreadsheet.Workbook.Worksheets[0].Range["A1:D10"].Select();
```

**✅ CORRECT:**
```csharp
GridRangeInfo gridRange = GridRangeInfo.Cells(1, 1, 10, 4); // Row 1-10, Column 1-4 (A1:D10)
spreadsheet.ActiveGrid.SelectionController.SelectRange(gridRange);
```
---

## Create a New Workbook

### Minimal Code
```csharp
// To create a new workbook with specified number of worksheets
public MainWindow()
{
  InitializeComponent();
  spreadsheet.Create(1);
}
```

### With Multiple Sheets
```csharp
// To Create a new workbook with 3 worksheets 
public MainWindow()
{
  InitializeComponent();
  spreadsheet.Create(3);
}
```

### ⚠️ IMPORTANT: When to Call Create()

**DO:**
- Call `Create()` in the **constructor** only (BEFORE workbook is loaded)
- Use `Create()` when explicitly creating a new empty workbook for the first time
- 

**DO NOT:**
- ❌ Call `Create()` inside the `WorkbookLoaded` or `WindowLoaded` event — this creates a circular/recursive situation
- ❌ Call `Create()` after opening an existing file — this will overwrite loaded data

### Example: CORRECT Usage Pattern
```csharp
public MainWindow()
{
  InitializeComponent();
  
  // Create workbook FIRST (in constructor)
  spreadsheet.Create(1);
  
  // Then subscribe to events
  spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
}
```

---

## Open an Existing Workbook

### Minimal Code
```csharp
// To open existing excel workbook into spreadsheet
public MainWindow()
{
spreadsheet.Open(@"C:\Data\Sample.xlsx");
}
```

### All Overloads
```csharp
public MainWindow()
{
// Using file path string
spreadsheet.Open(@"C:\Data\Sample.xlsx");

// Using a Stream
spreadsheet.Open(fileStream);

// Using an IWorkbook (XlsIO)
spreadsheet.Open(workbook);
}
```

---

## Save a Workbook

### Minimal Code
```csharp
// To save the excel workbook
spreadsheet.Save();
```

### Save As
```csharp
// Save with dialog
spreadsheet.SaveAs();

// Save to specific path
spreadsheet.SaveAs(@"C:\Data\Output.xlsx");

// Save to stream
spreadsheet.SaveAs(Stream outputStream);
```
---

## Import from DataTable
```csharp
// To import the data from existing datatable in the spreadsheet
spreadsheet.ActiveSheet.ImportDataTable(data_table, true, 1, 1);
spreadsheet.ActiveGrid.InvalidateCells();
```

## Export to DataTable
```csharp
// To export the data to the data table
IWorksheet sheet = spreadsheet.Workbook.Worksheets[0];
IRange range = sheet.Range["A1:K50"];
DataTable data_table = sheet.ExportDataTable(range, ExcelExportDataTableOptions.ColumnNames);
```
## Namespaces

For GridRangeInfo related codes



---

## References
- [Getting Started Documentation](https://help.syncfusion.com/wpf/spreadsheet/getting-started)
- [WPF Spreadsheet Overview](https://help.syncfusion.com/wpf/spreadsheet/overview)
