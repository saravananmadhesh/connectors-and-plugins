# Data Operations in WinUI TreeGrid

## Table of Contents
- [Clipboard Operations](#clipboard-operations)
- [Export to Excel](#export-to-excel)

## Clipboard Operations

Copy grid data to clipboard for pasting into other applications.

### Enable Clipboard Operations

```csharp
sfTreeGrid.ClipboardCopyOption = GridCopyOption.IncludeHeaders;
```

| CopyOption | Description |
|------------|-------------|
| **None** | Clipboard copy disabled |
| **CopyData** | Copy cell data only |
| **IncludeHeaders** | Copy with column headers |
| **IncludeFormat** | Copy with formatting |
| **IncludeHiddenColumn** | Copy hidden columns |

### Copy Selected Rows

Default keyboard shortcut: **Ctrl+C**

```csharp
// Users can copy selected rows with Ctrl+C
sfTreeGrid.SelectionMode = GridSelectionMode.Multiple;
sfTreeGrid.ClipboardCopyOption = GridCopyOption.IncludeHeaders;
```

### Programmatic Copy

```csharp
if (sfTreeGrid.SelectedItems.Count > 0)
{
    sfTreeGrid.ClipboardController.Copy();   
}
```

### Paste Operations

```csharp
// Enable paste
sfTreeGrid.PasteOption = GridPasteOptions.PasteData;

// Paste with Ctrl+V
// User must select target cell first
```

| PasteOption | Description |
|-------------|-------------|
| **None** | Paste disabled |
| **PasteData** | Paste cell values |
| **ExcludeFirstLine** | Skip first line (header) |
| **IncludeHiddenColumn** | Paste hidden columns 

### CopyCellContent Event

Customize copied content:

```csharp
sfTreeGrid.CopyCellContent  += (sender, e) =>
{
    // Customize cell content for clipboard
    if (e.Column.MappingName == "Salary")
    {
        var salary = Convert.ToDouble(e.ClipBoardValue);
        e.ClipBoardValue = $"${salary:N2}";  // Format as currency
        e.Handled = true;
    }
    
    if (e.Column.MappingName == "Status")
    {
        // Translate status codes
        var status = e.ClipBoardValue.ToString();
        e.ClipBoardValue = TranslateStatus(status);
        e.Handled = true;
    }
};
```

### PasteCellContent Event

Validate or transform pasted data:

```csharp
sfTreeGrid.PasteCellContent  += (sender, e) =>
{
    // Validate pasted data
    if (e.Column.MappingName == "Salary")
    {
        if (double.TryParse(e.ClipBoardValue.ToString(), out double salary))
        {
            if (salary < 0)
            {
                e.Handled = true;  // Reject negative values
                ShowMessage("Salary cannot be negative");
            }
        }
    }
};
```

### Copy to Different Formats

```csharp
private void CopyToCSV()
{
    var data = new StringBuilder();
    
    // Headers
    data.AppendLine(string.Join(",", 
        sfTreeGrid.Columns.Select(c => c.HeaderText)));
    
    // Rows
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        var employee = node.Item as Employee;
        data.AppendLine($"{employee.ID},{employee.FirstName},{employee.LastName},{employee.Salary}");
    }
    
    // Copy to clipboard
    DataPackage package = new DataPackage();
    package.SetText(data.ToString());
    Clipboard.SetContent(package);
}
```

### Copy Selected Cells Only

```csharp
private void CopySelectedCells()
{
    var selectedCells = sfTreeGrid.GetSelectedCells();
    var data = new StringBuilder();
    
    foreach (var cellInfo in selectedCells)
    {
        var value = cellInfo.GridColumn.GetCellValue(cellInfo.Node);
        data.Append(value + "\t");
    }
    
    DataPackage package = new DataPackage();
    package.SetText(data.ToString());
    Clipboard.SetContent(package);
}
```

## Export to Excel

Export TreeGrid data to Excel files.

### Install Export NuGet Package

```powershell
Install-Package Syncfusion.GridExport.WinUI
```

### Basic Excel Export

```csharp
using Syncfusion.UI.Xaml.TreeGrid;
using Syncfusion.XlsIO;
using Syncfusion.UI.Xaml.TreeGrid.Export; 

private async void ExportToExcel()
{
    var options = new TreeGridExcelExportOptions();
    options.ExcelVersion = ExcelVersion.Excel2016;
    
    var excelEngine = sfTreeGrid.ExportToExcel(options);
    var workbook = excelEngine.Excel.Workbooks[0];
    
    // Save file
    var savePicker = new FileSavePicker();
    savePicker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;
    savePicker.FileTypeChoices.Add("Excel Files", new List<string> { ".xlsx" });
    savePicker.SuggestedFileName = "TreeGridExport";
    
    var file = await savePicker.PickSaveFileAsync();
    if (file != null)
    {
        using (var stream = await file.OpenStreamForWriteAsync())
        {
            workbook.SaveAs(stream);
        }
        
        ShowMessage("Export completed successfully");
    }
    
    workbook.Close();
    excelEngine.Dispose();
}
```

### TreeGridExcelExportingOptions

Configure export settings:

```csharp
var options = new TreeGridExcelExportOptions
{
    // Excel version
    ExcelVersion = ExcelVersion.Excel2016,
    
    // Export mode
    ExportMode = ExportMode.Value,  // or ExportMode.Text
    
    // Include/exclude elements
    ExcludeColumns = new List<string> { "InternalID", "Notes" },
    CanExportHyperlink = true,
    AllowOutlining = true,  // Group by tree hierarchy
    
    // Styling
    CellsExportingEventHandler = OnCellsExporting,
    ColumnHeaderStyle = GetHeaderStyle()
};
```

### Export Modes

| Mode | Description |
|------|-------------|
| **Value** | Export actual values |
| **Text** | Export display text (formatted) |

### Export Selected Items Only

```csharp
private void ExportSelectedRows()
{
    var options = new TreeGridExcelExportingOptions();
    
    // Export only selected items
    var selectedEmployees = sfTreeGrid.SelectedItems.Cast<Employee>().ToList();
    
    var excelEngine = sfTreeGrid.ExportToExcel(
        sfTreeGrid.View, 
        options,
        selectedEmployees
    );
    
    // Save...
}
```

### Customize Cell Export

```csharp
options.CellsExportHandler  = (sender, e) =>
{
    // Customize cell format
    if (e.ColumnName == "Salary")
    {
        e.Range.CellStyle.NumberFormat = "$#,##0.00";
        e.Range.CellStyle.Font.Bold = true;
    }
    
    // Conditional formatting
    if (e.ColumnName == "Status")
    {
        var status = e.CellValue?.ToString();
        if (status == "Active")
        {
            e.Range.CellStyle.ColorIndex = ExcelKnownColors.Light_green;
        }
        else if (status == "Inactive")
        {
            e.Range.CellStyle.ColorIndex = ExcelKnownColors.Light_red;
        }
    }
    
    // Add formulas
    if (e.ColumnName == "Total" && e.RowIndex > 0)
    {
        e.Range.Formula = $"=B{e.RowIndex}*C{e.RowIndex}";
    }
};
```

### Header Styling

```csharp
private ExcelStyle GetHeaderStyle()
{
    var headerStyle = workbook.Styles.Add("HeaderStyle");
    headerStyle.BeginUpdate();
    headerStyle.Color = Color.FromArgb(0, 112, 192);
    headerStyle.Font.Bold = true;
    headerStyle.Font.Color = ExcelKnownColors.White;
    headerStyle.HorizontalAlignment = ExcelHAlign.HAlignCenter;
    headerStyle.EndUpdate();
    return headerStyle;
}

options.ColumnHeaderStyle = GetHeaderStyle();
```

### Export with Tree Structure

```csharp
var options = new TreeGridExcelExportingOptions
{
    AllowOutlining = true  // Enable Excel grouping for tree structure
};

var excelEngine = sfTreeGrid.ExportToExcel(sfTreeGrid.View, options);
```

**Result:** Excel file has collapsible groups matching tree hierarchy.

### Exclude Columns from Export

```csharp
var options = new TreeGridExcelExportingOptions
{
    ExcludeColumns = new List<string> { "InternalID", "Password", "Notes" }
};
```

### Export Event Handlers

```csharp
options.TreeGridExportingEventHandler = (sender, e) =>
{
    // Before export starts
    ShowProgress(true);
};

options.TreeGridExportedEventHandler = (sender, e) =>
{
    // After export completes
    ShowProgress(false);
    ShowMessage("Export completed");
};
```

## Common Patterns

### Copy with Custom Delimiter

```csharp
private void CopyAsTabDelimited()
{
    var data = new StringBuilder();
    
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        var employee = node.Item as Employee;
        var row = $"{employee.ID}\t{employee.FirstName}\t{employee.LastName}\t{employee.Salary}";
        data.AppendLine(row);
    }
    
    DataPackage package = new DataPackage();
    package.SetText(data.ToString());
    Clipboard.SetContent(package);
}
```

### Export with Progress Indicator

```xaml
<ProgressBar x:Name="ExportProgress" 
             Visibility="Collapsed"
             IsIndeterminate="True" />
```

```csharp
private async void ExportWithProgress()
{
    ExportProgress.Visibility = Visibility.Visible;
    
    try
    {
        await Task.Run(() =>
        {
            var options = new TreeGridExcelExportingOptions();
            var excelEngine = sfTreeGrid.ExportToExcel(options);
            // Save...
        });
    }
    finally
    {
        ExportProgress.Visibility = Visibility.Collapsed;
    }
}
```

### Export Filtered Data

```csharp
private void ExportFilteredData()
{
    // TreeGrid automatically exports only visible (filtered) rows
    var options = new TreeGridExcelExportingOptions();
    var excelEngine = sfTreeGrid.ExportToExcel(options);
    // Save...
}
```

### Export to Multiple Sheets

```csharp
private void ExportByDepartment()
{
    var excelEngine = new ExcelEngine();
    var workbook = excelEngine.Excel.Workbooks.Create();
    
    var departments = GetUniqueDepartments();
    
    foreach (var dept in departments)
    {
        var worksheet = workbook.Worksheets.Create(dept);
        var deptEmployees = GetEmployeesByDepartment(dept);
        
        // Export to worksheet
        ExportToWorksheet(worksheet, deptEmployees);
    }
    
    // Save workbook...
}
```

### Copy with HTML Format

```csharp
private void CopyAsHTML()
{
    var html = new StringBuilder();
    html.AppendLine("<table border='1'>");
    
    // Headers
    html.AppendLine("<tr>");
    foreach (var column in sfTreeGrid.Columns)
    {
        html.AppendLine($"<th>{column.HeaderText}</th>");
    }
    html.AppendLine("</tr>");
    
    // Rows
    foreach (var node in sfTreeGrid.View.Nodes)
    {
        html.AppendLine("<tr>");
        var employee = node.Item as Employee;
        html.AppendLine($"<td>{employee.ID}</td>");
        html.AppendLine($"<td>{employee.FirstName}</td>");
        html.AppendLine($"<td>{employee.LastName}</td>");
        html.AppendLine("</tr>");
    }
    
    html.AppendLine("</table>");
    
    DataPackage package = new DataPackage();
    package.SetHtmlFormat(html.ToString());
    Clipboard.SetContent(package);
}
```

## Troubleshooting

**Copy not working:**
- Check `ClipboardCopyOption` is not `None`
- Ensure rows are selected
- Verify Ctrl+C keyboard shortcut is not blocked

**Paste not working:**
- Set `ClipboardPasteOption` to enable paste
- Ensure target cells are editable (`AllowEditing = True`)
- Check if `PastingGridCellContent` event cancels paste

**Export to Excel fails:**
- Verify `Syncfusion.GridExport.WinUI` NuGet is installed
- Check file save permissions
- Ensure workbook is disposed after save

**Export missing columns:**
- Check if columns are in `ExcludeColumns` list
- Verify columns are visible (`IsHidden = False`)
- Ensure columns have valid `MappingName`
