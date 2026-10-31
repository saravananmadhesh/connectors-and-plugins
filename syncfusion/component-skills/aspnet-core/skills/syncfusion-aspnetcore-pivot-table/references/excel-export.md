# Excel Export in Pivot Table

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

<ejs-button id="excel" content="Export To Excel" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowExcelExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('excel').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.excelExport();
    }
</script>
```

**Key Properties:**
- `allowExcelExport="true"` - Enables export capability
- `excelExport()` - Exports pivot table to Excel
- Uses default filename "Pivot Table.xlsx"

### Export with Custom Filename

```html
<ejs-button id="excel" content="Export To Excel" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowExcelExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('excel').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var excelExportProperties = { 
            fileName: 'sales-report.xlsx' 
        };
        pivotObj.excelExport(excelExportProperties);
    }
</script>
```

## Export to CSV

Export as comma-separated values for data interoperability:

```html
<ejs-button id="csv" content="Export To CSV" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('csv').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.csvExport();
    }
</script>
```

**When to use CSV:**
- Import into other systems
- Data without complex formatting
- Text editor compatibility
- Smaller file size (~50% smaller than Excel)

## Multiple Pivot Tables

Export multiple pivot tables to a single Excel file with options to organize them on the same sheet or separate sheets.

### Append to Same Sheet

Organize multiple pivot tables in a single worksheet with automatic row spacing:

```html
@using Syncfusion.EJ2.PivotView

<ejs-button id="excel" content="Export To Excel" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotTable1" height="300" allowExcelExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<br />

<ejs-pivotview id="PivotTable2" height="300" allowExcelExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-columns>
            <e-field name="Country"></e-field>
        </e-columns>
        <e-rows>
            <e-field name="Year" caption="Year"></e-field>
        </e-rows>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('excel').onclick = function () {
        pivotObj = document.getElementById('PivotTable1').ej2_instances[0];
        var excelExportProperties = {
            multipleExport: { type: 'AppendToSheet', blankRows: 2 },
            pivotTableIds: ['PivotTable1', 'PivotTable2']
        };
        pivotObj.excelExport(excelExportProperties, true);
    }
</script>
```

**AppendToSheet Configuration:**
- `pivotTableIds` - Array of pivot table element IDs to export
- `multipleExport.type: 'AppendToSheet'` - Same worksheet, stacked vertically
- `multipleExport.blankRows` - Number of empty rows between tables (default: 5)
- `true` parameter - Second parameter enables multi-table export

### Export to Separate Sheets

Organize multiple pivot tables into separate worksheets within a single Excel file:

```html
<script>
    var pivotObj;
    document.getElementById('excel').onclick = function () {
        pivotObj = document.getElementById('PivotTable1').ej2_instances[0];
        var excelExportProperties = {
            multipleExport: { type: 'NewSheet' },
            pivotTableIds: ['PivotTable1', 'PivotTable2']
        };
        pivotObj.excelExport(excelExportProperties, true);
    }
</script>
```

**NewSheet Configuration:**
- `pivotTableIds` - Array of pivot table element IDs to export
- `multipleExport.type: 'NewSheet'` - Dedicated worksheet for each table
- `true` parameter - Enable multi-table export
- Each pivot table becomes a separate sheet in the workbook

## Customize During Export

### BeforeExport Event

Modify export data before file generation:

```html
@using Syncfusion.EJ2.PivotView

<ejs-button id="excel" content="Export To Excel" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowExcelExport="true" beforeExport="onBeforeExport">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    function onBeforeExport(args) {
        // Customize before export
        // args.dataSource - Export data
        // args.fileName - Output filename
        // Modify as needed
        args.fileName = 'custom-' + new Date().getTime() + '.xlsx';
    }

    document.getElementById('excel').onclick = function () {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.excelExport();
    }
</script>
```

## Style and Theme

### Export with Header and Footer

Include custom header and footer content in the exported Excel document:

```html
@using Syncfusion.EJ2.PivotView

<ejs-button id="excel" content="Export To Excel" isPrimary="true"></ejs-button>

<ejs-pivotview id="PivotView" height="300" allowExcelExport="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    document.getElementById('excel').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
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
                        value: 'Confidential - Property of Company',
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

### Export with Themes

Apply custom themes to the exported Excel file:

```html
<script>
    var pivotObj;
    document.getElementById('excel').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
        var excelExportProperties = {
            fileName: 'styled-report.xlsx',
            theme: {
                header: { fontName: 'Calibri', fontSize: 12, fontColor: '#FFFFFF', bold: true, backgroundColor: '#4472C4' },
                record: { fontName: 'Calibri', fontSize: 11 },
                caption: { fontName: 'Calibri', fontSize: 12, fontColor: '#FFFFFF', backgroundColor: '#70AD47' }
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

## Best Practices

✓ **Filename:** Use descriptive names with timestamps: 'SalesReport_2024_03_13.xlsx'
✓ **Hierarchy:** Always configure rows/columns with meaningful structure
✓ **Formatting:** Include number formatting for currency/percentage fields via `formatSettings`
✓ **Size limits:** Test with actual data volume before production
✓ **Multiple tables:** Use `pivotTableIds` with `multipleExport` for organized exports
✓ **Spacing:** Use `multipleExport.blankRows: 2-5` for readable sheet layouts
✓ **Header/Footer:** Use for reports with dates, classifications, or disclaimers
✓ **Themes:** Apply consistent theme across exports for professional appearance
✓ **Error handling:** Implement try-catch in export event handlers
✓ **Performance:** Export in current filtered/sorted state (don't re-fetch)
✓ **Testing:** Verify Excel opens correctly and displays properly before distribution

❌ **Avoid:** Exporting without row/column structure (data interpretation difficult)
❌ **Avoid:** Very large datasets (1M+ rows) for client-side export
❌ **Avoid:** Exporting unformatted raw numbers (1000000 instead of $1,000,000.00)
❌ **Avoid:** Creating multiple export buttons without rate limiting
❌ **Avoid:** Storing exported files in application root directory
- Browser compatibility: All modern browsers supported
