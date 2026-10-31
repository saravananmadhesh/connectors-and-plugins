# Export to Excel in WinUI DataGrid

Complete guide to exporting DataGrid data to Excel format (.xlsx) with styling and customization options.

## Table of Contents
- [Basic Export](#basic-export)
- [Export Options](#export-options)
- [Export with Styling](#export-with-styling)
- [Export Selected Rows](#export-selected-rows)
- [Custom Export](#custom-export)

## Basic Export

### Add Package Reference

```xml
<PackageReference Include="Syncfusion.DataGridExcelExport.WinUI" Version="24.1.41" />
```

### Export to Excel

```csharp
using Syncfusion.UI.Xaml.DataGrid.Export;
using Syncfusion.XlsIO;

private async void ExportToExcel_Click(object sender, RoutedEventArgs e)
{
    var options = new DataGridExcelExportOptions
    {
        ExcelVersion = ExcelVersion.Excel2016
    };
    
    var excelEngine = sfDataGrid.ExportToExcel(options);
    var workbook = excelEngine.Excel.Workbooks[0];
    
    // Save file
    var savePicker = new Windows.Storage.Pickers.FileSavePicker
    {
        SuggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.DocumentsLibrary,
        SuggestedFileName = "DataGridExport"
    };
    savePicker.FileTypeChoices.Add("Excel Files", new List<string> { ".xlsx" });
    
    var file = await savePicker.PickSaveFileAsync();
    if (file != null)
    {
        using (var stream = await file.OpenStreamForWriteAsync())
        {
            workbook.SaveAs(stream);
        }
        
        // Launch file
        await Windows.System.Launcher.LaunchFileAsync(file);
    }
}
```

## Export Options

### Customize Export Behavior

```csharp
var options = new DataGridExcelExportOptions
{
    // Excel version
    ExcelVersion = ExcelVersion.Excel2016,
    
    // Export mode
    ExportMode = ExportMode.Value, // or Text
    
    // Export groups
    ExportGroups = true,
    ExportGroupSummary = true,
    
    // Export summaries
    ExportTableSummaries = true,
    ExportUnboundRows = true,
    
    // Column options
    ExportColumnWidth = true,
    DefaultColumnWidth = 100,
    
    // Row options
    ExportRowHeight = true,
    DefaultRowHeight = 20,
    
    // Formatting
    ExportFormat = true,
    AllowIndentColumn = true,
    
    // Header and footer
    ExportHeader = true,
    ExportFooter = true
};
```

### Export Specific Columns

```csharp
var options = new DataGridExcelExportOptions
{
    ExcludeColumns = new List<string> { "InternalID", "Password" }
};

// Or include only specific columns
var options = new DataGridExcelExportOptions
{
    ExportingEventHandler = (sender, e) =>
    {
        if (e.CellType == ExportCellType.RecordCell)
        {
            // Skip specific columns
            if (e.ColumnName == "InternalID")
                e.Cancel = true;
        }
    }
};
```

## Export with Styling

### Apply Cell Styling

```csharp
var options = new DataGridExcelExportOptions
{
    CellsExportingEventHandler = (sender, e) =>
    {
        if (e.CellType == ExportCellType.RecordCell)
        {
            // Highlight high values
            if (e.ColumnName == "UnitPrice")
            {
                var value = Convert.ToDouble(e.CellValue);
                if (value > 100)
                {
                    e.Range.CellStyle.ColorIndex = ExcelKnownColors.Light_yellow;
                    e.Range.CellStyle.Font.Color = ExcelKnownColors.Red;
                    e.Range.CellStyle.Font.Bold = true;
                }
            }
        }
        
        // Style headers
        if (e.CellType == ExportCellType.HeaderCell)
        {
            e.Range.CellStyle.Font.Bold = true;
            e.Range.CellStyle.ColorIndex = ExcelKnownColors.Blue_grey;
            e.Range.CellStyle.Font.Color = ExcelKnownColors.White;
        }
    }
};
```

### Add Borders

## Export Selected Rows

```csharp
private void ExportSelectedRows()
{
    if (sfDataGrid.SelectedItems.Count == 0)
    {
        // Show message
        return;
    }
    
    var options = new DataGridExcelExportOptions
    {
        ExportingEventHandler = (sender, e) =>
        {
            // Only export selected rows
            if (e.CellType == ExportCellType.RecordCell)
            {
                var record = e.Record;
                if (!sfDataGrid.SelectedItems.Contains(record))
                    e.Cancel = true;
            }
        }
    };
    
    var excelEngine = sfDataGrid.ExportToExcel(options);
    // Save as shown above
}
```

## Custom Export

### Export with Custom Headers

```csharp
var options = new DataGridExcelExportOptions
{
    ExportingEventHandler = (sender, e) =>
    {
        if (e.CellType == ExportCellType.HeaderCell)
        {
            // Customize header text
            if (e.ColumnName == "UnitPrice")
                e.CellValue = "Price (USD)";
        }
    }
};
```

### Export to Specific Worksheet

```csharp
var excelEngine = sfDataGrid.ExportToExcel(options);
var workbook = excelEngine.Excel.Workbooks[0];
var worksheet = workbook.Worksheets[0];

// Rename worksheet
worksheet.Name = "Orders Report";

// Add title
worksheet.Range["A1"].Text = "Sales Report - 2024";
worksheet.Range["A1"].CellStyle.Font.Bold = true;
worksheet.Range["A1"].CellStyle.Font.Size = 16;

// Move data down to make room for title
worksheet.InsertRow(1, 2);
```

### Export Multiple Grids

```csharp
var excelEngine = new ExcelEngine();
var workbook = excelEngine.Excel.Workbooks.Create(2);

// Export first grid to worksheet 1
var options1 = new DataGridExcelExportOptions
{
    StartColumnIndex = 1,
    StartRowIndex = 1
};
sfDataGrid1.ExportToExcel(options1, workbook.Worksheets[0]);
workbook.Worksheets[0].Name = "Orders";

// Export second grid to worksheet 2
var options2 = new DataGridExcelExportOptions
{
    StartColumnIndex = 1,
    StartRowIndex = 1
};
sfDataGrid2.ExportToExcel(options2, workbook.Worksheets[1]);
workbook.Worksheets[1].Name = "Customers";

// Save workbook
```

## Events

### Control Export Process

```csharp
var options = new DataGridExcelExportOptions
{
    // Before cell export
    ExportingEventHandler = (sender, e) =>
    {
        // Cancel export for specific conditions
        if (e.CellType == ExportCellType.RecordCell && e.ColumnName == "Password")
            e.Cancel = true;
    },
    
    // After cell export
    CellsExportingEventHandler = (sender, e) =>
    {
        // Apply formatting after export
        if (e.CellType == ExportCellType.RecordCell)
        {
            e.Range.CellStyle.HorizontalAlignment = ExcelHAlign.HAlignLeft;
        }
    }
};
```

## Common Scenarios

### Scenario 1: Export with Filters Applied

```csharp
// Filtering is automatically respected
// Only visible (filtered) rows are exported
var options = new DataGridExcelExportOptions();
var excelEngine = sfDataGrid.ExportToExcel(options);
```

### Scenario 2: Export with Grouped Data

```csharp
var options = new DataGridExcelExportOptions
{
    ExportGroups = true,
    ExportGroupSummary = true,
    AllowIndentColumn = true // Indent grouped rows
};
```

### Scenario 3: Export with Custom Filename

```csharp
var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
savePicker.SuggestedFileName = $"Report_{timestamp}";
```

## Best Practices

1. **Set ExcelVersion** to Excel2016 or later for best compatibility
2. **Use CellsExportingEventHandler** for styling (applied after export)
3. **Use ExportingEventHandler** to filter data (applied during export)
4. **Export filtered data** by applying filters before export
5. **Add worksheet names** for multiple exports
6. **Include summaries** for comprehensive reports
7. **Test with large datasets** to ensure performance
8. **Dispose ExcelEngine** after use
