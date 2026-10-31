# Toolbar in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Toolbar](#enable-toolbar)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Toolbar Item Configuration](#toolbar-item-configuration)
- [Show Desired Chart Types](#show-desired-chart-types)
- [Add Custom Toolbar Items](#add-custom-toolbar-items)
- [Export from Toolbar](#export-from-toolbar)
- [Report Management](#report-management)
- [Best Practices](#best-practices)

## Overview

The Toolbar provides quick access to common pivot table operations like switching views, exporting data, managing reports, and customizing display options. Use toolbar items to let users interact with the pivot table without custom coding.

## Enable Toolbar

Use `.ShowToolbar(true)` and `.Toolbar()` to display built-in items:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .Toolbar(new List<string> 
    { 
        "New", "Save", "SaveAs", "Rename", "Remove", "Load",
        "Grid", "Chart",
        "Export",
        "SubTotal", "GrandTotal",
        "ConditionalFormatting", "NumberFormatting",
        "FieldList"
    })
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Height("450")
    .Width("100%")
    .Render()
```

## Built-in Toolbar Items

Available toolbar items (PascalCase strings):

| Item | Description |
|------|-------------|
| **New** | Create new report and reset pivot configuration |
| **Save** | Save/update current report |
| **SaveAs** | Save current report with new name |
| **Rename** | Rename existing saved report |
| **Remove** | Delete current saved report |
| **Load** | Open saved report from dropdown |
| **Grid** | Switch to grid/table view |
| **Chart** | Switch to chart/visualization view |
| **Export** | Export to Excel/PDF (with dropdown menu) |
| **SubTotal** | Show/hide subtotals in rows |
| **GrandTotal** | Show/hide grand totals |
| **ConditionalFormatting** | Open conditional formatting dialog |
| **NumberFormatting** | Open number formatting dialog |
| **FieldList** | Open/close field list panel |

## Toolbar Item Configuration

Specify which items to display by adding them to the Toolbar list. Items display in the order specified:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .Toolbar(new List<string> 
    { 
        "Grid",
        "Chart",
        "Export",
        "SubTotal",
        "GrandTotal"
    })
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Height("450")
    .Width("100%")
    .Render()
```

**Report Management Toolbar:**

```html
.Toolbar(new List<string> 
{ 
    "New",
    "Save",
    "SaveAs",
    "Rename",
    "Remove",
    "Load"
})
```

**Analysis Toolbar:**

```html
.Toolbar(new List<string> 
{ 
    "Grid",
    "Chart",
    "SubTotal",
    "GrandTotal",
    "Export"
})
.AllowExcelExport(true)
.AllowPdfExport(true)
```

## Show Desired Chart Types

Use the `ChartTypes` property to filter which chart types appear in the Chart view dropdown menu:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .DisplayOption(new PivotViewDisplayOption { View = View.Both })
    .ShowToolbar(true)
    .Toolbar(new List<string> { "Grid", "Chart" })
    .ChartTypes(new List<string> { "Column", "Bar", "Line", "Area" })
    .Height("450")
    .Width("100%")
    .Render()
```

**Available Chart Types:**
Column, Bar, Line, Area, Stacked Column, Stacked Bar, Stacked Line, Percent Stacked Column, Percent Stacked Bar, Percent Stacked Line, Spline, Spline Area, Scatter, Bubble, Pie, Doughnut, Pyramid, Funnel

**Example - Show Only Comparison Charts:**

```html
.ChartTypes(new List<string> { "Column", "Bar", "Stacked Column", "Line" })
```

**Example - Show Only Accumulation Charts:**

```html
.ChartTypes(new List<string> { "Pie", "Doughnut", "Pyramid", "Funnel" })
```

When `ChartTypes` is specified, users can only select from those types in the Chart dropdown menu.

## Add Custom Toolbar Items

### Method 1: Add Custom Item Using ToolbarRender Event

Add new toolbar buttons using the `ToolbarRender` event to inject custom items into the toolbar:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .Toolbar(new List<string> { "Grid", "Chart" })
    .ToolbarRender("onToolbarRender")
    .DisplayOption(new PivotViewDisplayOption { View = View.Both })
    .Height("450")
    .Width("100%")
    .Render()

<script>
    function onToolbarRender(args) {
        // Add custom "Expand All" button at position 0
        args.customToolbar.splice(0, 0, {
            prefixIcon: 'e-icons e-expand',
            tooltipText: 'Expand All',
            click: function (args) {
                var pivotObj = document.getElementById('pivotview').ej2_instances[0];
                pivotObj.dataSourceSettings.expandAll = true;
            }
        });
    }
</script>
```

**Custom Item Properties:**
- `prefixIcon` - CSS class for icon (e-icons e-icon-name)
- `tooltipText` - Text shown on hover
- `click` - Function executed when clicked
- `text` - Optional label text

### Method 2: Create Custom Toolbar Using ToolbarTemplate

Design a complete custom toolbar with HTML elements:

```html
<div id="toolbar-template">
    @Html.EJS().Button("expandbtn").Content("Expand All").CssClass("e-flat").IsPrimary(true).Render()
    @Html.EJS().Button("collapsebtn").Content("Collapse All").CssClass("e-flat").IsPrimary(true).Render()
    @Html.EJS().Button("exportbtn").Content("Export").CssClass("e-flat").Render()
</div>

@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .ToolbarTemplate("#toolbar-template")
    .AllowExcelExport(true)
    .Height("450")
    .Width("100%")
    .Render()

<script>
    document.getElementById("expandbtn").addEventListener('click', function () {
        var pivotObj = document.getElementById("pivotview").ej2_instances[0];
        pivotObj.dataSourceSettings.expandAll = true;
    });
    
    document.getElementById("collapsebtn").addEventListener('click', function () {
        var pivotObj = document.getElementById("pivotview").ej2_instances[0];
        pivotObj.dataSourceSettings.expandAll = false;
    });
    
    document.getElementById("exportbtn").addEventListener('click', function () {
        var pivotObj = document.getElementById("pivotview").ej2_instances[0];
        pivotObj.csvExport();
    });
</script>
```

## Export from Toolbar

### Enable Export

Use the "Export" toolbar item with export permissions:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .Toolbar(new List<string> { "Grid", "Chart", "Export" })
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Height("450")
    .Width("100%")
    .Render()
```

**Export Permissions:**
- `.AllowExcelExport(true)` - Enable Excel export
- `.AllowPdfExport(true)` - Enable PDF export

When enabled, clicking "Export" shows dropdown with Excel and PDF options.

### Customize Export Behavior

Use `BeforeExport` event to modify export settings:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .Toolbar(new List<string> { "Export" })
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .BeforeExport("beforeExport")
    .Height("450")
    .Width("100%")
    .Render()

<script>
    function beforeExport(args) {
        // args.exportType: 'Excel' or 'PDF'
        if (args.exportType === 'Excel') {
            // Custom Excel export logic
            args.fileName = 'pivot-report-' + new Date().toISOString().split('T')[0] + '.xlsx';
        } else if (args.exportType === 'PDF') {
            // Custom PDF export logic
            args.fileName = 'pivot-report-' + new Date().toISOString().split('T')[0] + '.pdf';
        }
    }
</script>
```

## Report Management

### Save and Load Reports

Use report management toolbar items to persist pivot configurations:

```html
@Html.EJS().PivotView("pivotview")
    .DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
    .ShowToolbar(true)
    .Toolbar(new List<string> 
    { 
        "New", "Save", "SaveAs", "Rename", "Remove", "Load"
    })
    .SaveReport("saveReport")
    .LoadReport("loadReport")
    .RenameReport("renameReport")
    .RemoveReport("removeReport")
    .FetchReport("fetchReport")
    .NewReport("newReport")
    .Height("450")
    .Width("100%")
    .Render()

<script>
    function saveReport(args) {
        // Save to localStorage or server API
        var reports = localStorage.getItem('pivotReports') ? 
            JSON.parse(localStorage.getItem('pivotReports')) : [];
        
        if (args.reportName) {
            reports.push({ reportName: args.reportName, report: args.report });
            localStorage.setItem('pivotReports', JSON.stringify(reports));
        }
    }
    
    function loadReport(args) {
        // Load from localStorage or server API
        var reports = localStorage.getItem('pivotReports') ? 
            JSON.parse(localStorage.getItem('pivotReports')) : [];
        
        var selectedReport = reports.find(r => r.reportName === args.reportName);
        if (selectedReport) {
            var pivotObj = document.getElementById('pivotview').ej2_instances[0];
            pivotObj.dataSourceSettings = JSON.parse(selectedReport.report);
        }
    }
    
    function fetchReport(args) {
        // Populate report list dropdown
        var reports = localStorage.getItem('pivotReports') ? 
            JSON.parse(localStorage.getItem('pivotReports')) : [];
        args.reportName = reports.map(r => r.reportName);
    }
</script>
```

## Best Practices

- **Logical ordering:** Arrange toolbar items left-to-right by frequency of use
- **Report tools first:** Place Save/Load before viewing options
- **Export near end:** Position Export items toward toolbar end
- **Chart types:** Always specify `ChartTypes` when showing many chart options - improves UX
- **Custom items:** Use `ToolbarRender` for small additions; use `ToolbarTemplate` for major customizations
- **Export requirements:** Always enable both `AllowExcelExport()` and `AllowPdfExport()` if "Export" item is shown
- **Report events:** Implement all report event handlers (Save, Load, Fetch, Rename, Remove) for full functionality
- **User permission:** Consider hiding advanced items (ConditionalFormatting, FieldList) for read-only users
