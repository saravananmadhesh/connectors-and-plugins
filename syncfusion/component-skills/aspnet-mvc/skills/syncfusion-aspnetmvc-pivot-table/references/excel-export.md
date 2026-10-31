# Excel Export in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Export to Excel](#export-to-excel)
- [Export to CSV](#export-to-csv)
- [Multiple Pivot Tables](#multiple-pivot-tables)
- [Customize During Export](#customize-during-export)
- [Style and Theme](#style-and-theme)
- [Best Practices](#best-practices)

## Overview

Export functionality enables saving pivot table data to Excel (.xlsx) or CSV (.csv) formats for offline analysis, sharing, and further processing.

## Export to Excel

### Enable Excel Export

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowExcelExport(true).ShowToolbar(true).Toolbar(new List<string> { "ExcelExport" }).Height("450").Width("100%").Render()
```

**Key Properties:**
- `AllowExcelExport(true)` - Enables export capability
- `ShowToolbar(true)` - Displays toolbar
- Toolbar includes "ExcelExport" button

### Export Programmatically

```html
<button onclick="exportToExcel()">Export to Excel</button>

<script>
    function exportToExcel() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.excelExport();
    }
</script>
```

### Export with Custom Filename

```html
<script>
    function exportWithName() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        var excelExportProperties = { fileName: 'sales-report.xlsx' };
        pivotObj.excelExport(excelExportProperties);
    }
</script>
```

## Export to CSV

Export as comma-separated values for data interoperability:

```html
<button onclick="exportToCSV()">Export to CSV</button>

<script>
    function exportToCSV() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        pivotObj.csvExport();
    }
</script>
```

**When to use CSV:**
- Import into other systems
- Data without complex formatting
- Text editor compatibility
- Smaller file size

## Multiple Pivot Tables

Export multiple pivot tables to a single Excel file with options to organize them on the same sheet or separate sheets.

### Append to Same Sheet

Organize multiple pivot tables in a single worksheet with automatic row spacing:

```html
<button onclick="exportToSameSheet()">Export to Same Sheet</button>

<div id="pivot1"></div>
<div id="pivot2"></div>

<script>
    function exportToSameSheet() {
        var pivot1 = document.getElementById('pivot1').ej2_instances[0];
        var pivot2 = document.getElementById('pivot2').ej2_instances[0];
        
        var excelExportProperties = {
            pivotTableIds: ['pivot1', 'pivot2'],
            fileName: 'combined-report.xlsx',
            multipleExport: {
                type: 'AppendToSheet',
                blankRows: 5  // 5 blank rows between tables
            }
        };
        
        // Export is triggered with isMultipleExport flag
        pivot1.excelExport(excelExportProperties, true);
    }
</script>
```

**AppendToSheet Configuration:**
- `pivotTableIds` - Array of pivot table element IDs to export
- `multipleExport.type: 'AppendToSheet'` - Same worksheet, stacked vertically
- `multipleExport.blankRows` - Number of empty rows between tables (default: 5)
- `isMultipleExport: true` - Second parameter enables multi-table export

### Export to Separate Sheets

Organize multiple pivot tables into separate worksheets within a single Excel file:

```html
<button onclick="exportToNewSheets()">Export to New Sheets</button>

<div id="pivot1"></div>
<div id="pivot2"></div>

<script>
    function exportToNewSheets() {
        var pivot1 = document.getElementById('pivot1').ej2_instances[0];
        var pivot2 = document.getElementById('pivot2').ej2_instances[0];
        
        var excelExportProperties = {
            pivotTableIds: ['pivot1', 'pivot2'],
            fileName: 'multi-sheet-report.xlsx',
            multipleExport: {
                type: 'NewSheet'  // Each table on its own sheet
            }
        };
        
        pivot1.excelExport(excelExportProperties, true);
    }
</script>
```

**NewSheet Configuration:**
- `pivotTableIds` - Array of pivot table element IDs to export
- `multipleExport.type: 'NewSheet'` - Dedicated worksheet for each table
- `isMultipleExport: true` - Enable multi-table export
- Each pivot table becomes a separate sheet in the workbook

## Customize During Export

### BeforeExport Event

Modify export data before file generation:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowExcelExport(true).BeforeExport("onBeforeExport").Height("450").Width("100%").Render()

<script>
    function onBeforeExport(args) {
        // Customize before export
        // args.dataSource - Export data
        // args.fileName - Output filename
        // args.isCollapsedStateMaintained - Hierarchy state
    }
</script>
```

### Expand All Rows Before Export

```csharp
public void ExportWithExpansion()
{
    var pivotView = (PivotViewProperties)ViewData["PivotView"];
    
    // Enable expansion and set flag
    var properties = new PivotExcelExportProperties
    {
        ExpandAll = true,  // Expand all grouped rows
        FileName = "expanded-report.xlsx"
    };
    
    pivotView.excelExport(properties);
}
```

### Access Export Data

```javascript
function onBeforeExport(args) {
    // Get pivot state
    var pivotObj = args.element;
    var data = pivotObj.engineModule.generateGridData();
    
    console.log("Exporting rows:", data.rowCount);
    console.log("Exporting columns:", data.columnCount);
    
    // Modify args.dataSource if needed
    args.fileName = 'custom-' + new Date().getTime() + '.xlsx';
}
```

## Style and Theme

### Changing the Pivot Table Style While Exporting

Apply custom themes to the exported Excel file to change colors for headers, captions, and records:

```html
<button onclick="exportWithTheme()">Export with Theme</button>

<script>
    function exportWithTheme() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        
        var excelExportProperties = {
            fileName: 'styled-report.xlsx',
            theme: {
                // Material theme (default)
                header: { fontName: 'Calibri', fontSize: 12, fontColor: '#FFFFFF', bold: true, borders: { color: '#4472C4' }, backgroundColor: '#4472C4' },
                record: { fontName: 'Calibri', fontSize: 11 },
                caption: { fontName: 'Calibri', fontSize: 12, fontColor: '#FFFFFF', bold: true, backgroundColor: '#70AD47' }
            }
        };
        
        pivotObj.excelExport(excelExportProperties);
    }
</script>
```

**Theme Properties:**
- `header` - Column header styling (fontName, fontSize, fontColor, bold, backgroundColor, borders)
- `record` - Data cell styling (fontName, fontSize, fontColor)
- `caption` - Grand total and subtotal styling (fontName, fontSize, fontColor, backgroundColor)

**Available Theme Presets:**
- Material (default) - Blue and green color scheme
- Office - Professional office colors
- Bootstrap - Navy blue theme
- Fabric - Fabric design patterns

### Add Header and Footer While Exporting

Include custom header and footer content in the exported Excel document:

```html
<button onclick="exportWithHeaderFooter()">Export with Header/Footer</button>

<script>
    function exportWithHeaderFooter() {
        var pivotObj = document.getElementById('pivotview').ej2_instances[0];
        
        var excelExportProperties = {
            fileName: 'report-with-header-footer.xlsx',
            header: {
                headerRows: 2,
                rows: [
                    {
                        cells: [{
                            value: 'Sales Report',
                            style: { fontName: 'Calibri', fontSize: 20, bold: true }
                        }]
                    },
                    {
                        cells: [{
                            value: 'Generated: ' + new Date().toLocaleDateString(),
                            style: { fontName: 'Calibri', fontSize: 11, italic: true }
                        }]
                    }
                ]
            },
            footer: {
                footerRows: 1,
                rows: [{
                    cells: [{
                        value: 'Confidential - Property of XYZ Company',
                        style: { fontName: 'Calibri', fontSize: 10 }
                    }]
                }]
            }
        };
        
        pivotObj.excelExport(excelExportProperties);
    }
</script>
```

**Header Configuration:**
- `headerRows` - Number of header rows to add
- `rows` - Array of row objects with `cells` containing value and style
- Appears at the top of the Excel document before the pivot table data

**Footer Configuration:**
- `footerRows` - Number of footer rows to add
- `rows` - Array of row objects with `cells` containing value and style
- Appears at the bottom of the Excel document after all data

**Style Properties Available:**
- `fontName`, `fontSize`, `fontColor`, `bold`, `italic`, `backgroundColor`, `borders`, `alignment`

### Export Only the Current Page

By default, the Pivot Table exports all data records. To improve performance with large datasets, export only the data visible in the current viewport by setting the `ExportAllPages` property to **false**.

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().Button("pdf").Content("Pdf Export").IsPrimary(true).Render()

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .AllowExcelExport(true)
    .ExportAllPages(false)
    .EnableVirtualization(true)
    .PageSettings(settings => settings.RowPageSize(10).ColumnPageSize(5))
    .Height("450")
    .Width("100%").Render()

<script>
    var pivotObj;
    document.getElementById('pdf').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.pdfExport();
    }
</script>
```

**Key Configuration:**
- `ExportAllPages(false)` - Export only visible viewport data
- `EnableVirtualization(true)` - Enable virtual scrolling
- `PageSettings` - Configure page size for data

**When to Use:**
- Large datasets with virtualization enabled
- Performance optimization for exports
- Exporting sample data subsets
- Quick preview exports

**Note:** This option only works when virtualization or paging is enabled.

## Best Practices

- **Filename:** Use descriptive names with timestamps: `sales-report-2024-03-13.xlsx`
- **Multiple Tables:** Use `pivotTableIds` with `multipleExport` configuration for organized exports
- **Hierarchy:** Set `ExpandAll(true)` for complete data export
- **Spacing:** Use `multipleExport.blankRows: 3-5` for readable sheet layouts with multiple tables
- **Theme:** Apply consistent theme across exports for professional appearance
- **Header/Footer:** Use for reports with dates, classifications, or disclaimers
- **Testing:** Verify Excel opens correctly and displays properly before distribution
- **Permissions:** Implement access control for sensitive data exports
- **Performance:** Export in current filtered/sorted state (don't re-fetch)
- **File size:** Monitor with large datasets; consider CSV for raw data
- **Customization:** Use `BeforeExport` event for dynamic content modification
