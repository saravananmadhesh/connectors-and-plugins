# Toolbar in ASP.NET Core Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Toolbar](#enable-toolbar)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Select Specific Toolbar Items](#select-specific-toolbar-items)
- [Show Desired Chart Types](#show-desired-chart-types)
- [Add Custom Toolbar Items](#add-custom-toolbar-items)
- [Toolbar Position](#toolbar-position)
- [Toolbar Events](#toolbar-events)
- [Report Management](#report-management)
- [Best Practices](#best-practices)

## Overview

The toolbar in ASP.NET Core Pivot Table provides quick access to common operations like exporting, importing, and applying features such as conditional formatting. The toolbar appears at the top of the pivot table by default with customizable toolbar items defined via the `toolbar` attribute.

**Key Features:**
- Built-in export buttons (Excel, PDF, CSV)
- Feature toggles (Field List, Grouping Bar)
- Conditional and number formatting
- Save/Load states for report management
- Report management (New, Save, Load, Rename, Remove)
- Display options (Grid, Chart)
- Responsive button layout

## Enable Toolbar

Enable the toolbar by setting `showToolbar="true"` on the `ejs-pivotview` tag. All built-in toolbar items display by default:

```html
<ejs-pivotview id="PivotView" height="300" width="100%" showToolbar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Properties:**
- `showToolbar="true"` - Displays toolbar above pivot table (default shows all built-in items)
- `toolbarPosition="Top"` - Position (Top or Bottom)

## Built-in Toolbar Items

Available toolbar items (display as string in toolbar attribute or in List<string>):

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
| **Export** | Export to Excel/PDF/CSV (with dropdown menu) |
| **SubTotal** | Show/hide subtotals in rows |
| **GrandTotal** | Show/hide grand totals |
| **ConditionalFormatting** | Open conditional formatting dialog |
| **NumberFormatting** | Open number formatting dialog |
| **FieldList** | Open/close field list panel |
| **GroupingBar** | Toggle grouping bar visibility |
| **MDX** | Display MDX query (OLAP only) |

## Select Specific Toolbar Items

Specify which toolbar items to display using the `toolbar` attribute with a `List<string>`:

```html
<ejs-pivotview id="PivotView" height="300" width="100%" showToolbar="true"
    toolbar="@(new List<string> { "New", "Save", "SaveAs", "Rename", "Remove", "Load",
              "Grid", "Chart", "Export", "SubTotal", "GrandTotal", 
              "ConditionalFormatting", "NumberFormatting", "FieldList" })">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Items display in the order specified in the List<string>. Use separators to add visual spacing between groups (separators are handled automatically in toolbar layout).**

### Report Management Toolbar

Enable state management features:

```html
toolbar="@(new List<string> { "New", "Save", "SaveAs", "Rename", "Remove", "Load" })"
```

### Analysis Toolbar

Enable data exploration features:

```html
toolbar="@(new List<string> { "Grid", "Chart", "Export", "SubTotal", "GrandTotal", 
                              "ConditionalFormatting", "NumberFormatting" })"
```

## Show Desired Chart Types

Use the `chartTypes` attribute to filter which chart types appear in the chart type dropdown:

```html
<ejs-pivotview id="PivotView" height="450" width="100%" showToolbar="true" 
    chartTypes="@(new List<string> { "Column", "Bar", "Line", "Area" })"
    toolbar="@(new List<string> { "Grid", "Chart" })">
    
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Both"></e-displayOption>
</ejs-pivotview>
```

**Available Chart Types:**
Column, Bar, Line, Area, StackingColumn, StackingBar, StackingLine, StackingArea100, Spline, SplineArea, Scatter, Bubble, Pie, Doughnut, Pyramid, Funnel, Pareto, Polar, Radar, Waterfall

**Example - Show Only Comparison Charts:**

```html
chartTypes="@(new List<string> { "Column", "Bar", "StackingColumn", "StackingBar", "Line", "Area" })"
```

**Example - Show Only Accumulation Charts:**

```html
chartTypes="@(new List<string> { "Pie", "Doughnut", "Pyramid", "Funnel" })"
```

## Add Custom Toolbar Items

### Add Custom Toolbar Item via ToolbarRender Event

Add new toolbar buttons using the `toolbarRender` event:

```html
<ejs-pivotview id="PivotView" height="300" width="100%" showToolbar="true"
    toolbar="@(new List<string> { "Grid", "Chart", "Export" })"
    toolbarRender="onToolbarRender">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    function onToolbarRender(args) {
        // Add custom "Refresh Data" button
        args.customToolbar.push({
            prefixIcon: 'e-icons e-refresh',
            tooltipText: 'Refresh Data',
            text: 'Refresh',
            id: 'refreshBtn',
            click: function() {
                var pivotObj = document.getElementById('PivotView').ej2_instances[0];
                pivotObj.refresh();
            }
        });
    }
</script>
```

**Custom Item Properties:**
- `text` - Button label
- `tooltipText` - Hover tooltip text
- `prefixIcon` - Icon CSS class (e-icons e-icon-name from Syncfusion icon library)
- `id` - Unique identifier for identifying the button in click events
- `click` - Function executed when button clicked

### Toolbar Click Events

Handle toolbar item clicks:

```html
<ejs-pivotview id="PivotView" height="300" width="100%" showToolbar="true"
    toolbar="@(new List<string> { "Export", "FieldList" })"
    toolbarClick="onToolbarClick">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values><e-field name="Sales"></e-field></e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    function onToolbarClick(args) {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
        // args.item - Toolbar item properties
        // args.item.text - Item label text
        // args.item.name - Built-in item name (Export, FieldList, etc.)
        
        if (args.item.name === 'Export') {
            console.log('Export clicked');
        }
        else if (args.item.name === 'FieldList') {
            console.log('FieldList clicked');
        }
    }
</script>
```

### Common Icon Classes

```
e-icons e-refresh      - Refresh icon
e-icons e-pdf-export   - PDF export icon
e-icons e-xlsx-export  - Excel export icon
e-icons e-csv-export   - CSV export icon
e-icons e-save         - Save icon
e-icons e-print        - Print icon
e-icons e-download     - Download icon
e-icons e-data         - Data icon
e-icons e-settings     - Settings icon
e-icons e-mail         - Email icon
```

## Report Management

Enable save/load report functionality:

```html
<ejs-pivotview id="PivotView" height="450" width="100%" 
    showToolbar="true"
    allowExcelExport="true"
    allowPdfExport="true"
    saveReport="saveReport"
    loadReport="loadReport"
    fetchReport="fetchReport"
    renameReport="renameReport"
    removeReport="removeReport"
    newReport="newReport"
    toolbar="@(new List<string> { "New", "Save", "SaveAs", "Rename", "Remove", "Load",
              "Grid", "Chart", "Export", "SubTotal", "GrandTotal", 
              "ConditionalFormatting", "NumberFormatting", "FieldList" })">
    
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
    
    <e-displayOption view="Both"></e-displayOption>
</ejs-pivotview>

<script>
    function saveReport(args) {
        // Handle report save
        var reports = localStorage.pivotReports ? JSON.parse(localStorage.pivotReports) : [];
        var isSaved = false;
        
        if (args.report && args.reportName) {
            reports.forEach(function(item) {
                if (args.reportName === item.reportName) {
                    item.report = args.report;
                    isSaved = true;
                }
            });
            
            if (!isSaved) {
                reports.push(args);
            }
            localStorage.pivotReports = JSON.stringify(reports);
        }
    }
    
    function fetchReport(args) {
        // Return list of saved report names
        var reports = localStorage.pivotReports ? JSON.parse(localStorage.pivotReports) : [];
        var reportNames = [];
        
        reports.forEach(function(item) {
            reportNames.push(item.reportName);
        });
        
        args.reportName = reportNames;
    }
    
    function loadReport(args) {
        // Load a previously saved report
        var reports = localStorage.pivotReports ? JSON.parse(localStorage.pivotReports) : [];
        
        reports.forEach(function(item) {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
    }
    
    function renameReport(args) {
        // Rename a saved report
        var reports = localStorage.pivotReports ? JSON.parse(localStorage.pivotReports) : [];
        
        reports.forEach(function(item) {
            if (args.reportName === item.reportName) {
                item.reportName = args.newName;
            }
        });
        
        localStorage.pivotReports = JSON.stringify(reports);
    }
    
    function removeReport(args) {
        // Delete a saved report
        var reports = localStorage.pivotReports ? JSON.parse(localStorage.pivotReports) : [];
        reports = reports.filter(function(item) {
            return item.reportName !== args.reportName;
        });
        localStorage.pivotReports = JSON.stringify(reports);
    }
    
    function newReport(args) {
        // Clear all settings to start fresh
        console.log('New report created');
    }
</script>
```

**Report Event Handlers:**
- `saveReport` - Called when "Save" or "SaveAs" is clicked
- `loadReport` - Called when user selects a report to load
- `fetchReport` - Called to get list of available reports
- `renameReport` - Called to rename a saved report
- `removeReport` - Called to delete a saved report
- `newReport` - Called when "New" is clicked to reset

### Save/Load Programmatically

```html
<button id="saveBtn">Save State</button>
<button id="loadBtn">Load State</button>

<script>
    document.getElementById('saveBtn').onclick = function() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var state = pivotObj.getPersistData();
        localStorage.setItem('pivotState', JSON.stringify(state));
        alert('State saved');
    };
    
    document.getElementById('loadBtn').onclick = function() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var savedState = localStorage.getItem('pivotState');
        if (savedState) {
            pivotObj.setProperties(JSON.parse(savedState), false);
            alert('State loaded');
        }
    };
</script>
```

## Best Practices

✓ **Limit toolbar items** to only necessary items to reduce clutter
✓ **Group ExcelExport with other export** options in sequence
✓ **Use chartTypes** to show only relevant chart types for your domain
✓ **Enable all report events** if using Save/Load functionality
✓ **Test Export** to ensure all required modules (ExcelExport, PdfExport) are injected
✓ **Save report handlers** before users need to save states
✓ **Keep toolbar at Top** for standard UX (Bottom less common)
✓ **Provide clear labels** in custom toolbar items for user guidance

## Important Notes

- Toolbar syntax in ASP.NET Core uses `toolbar` attribute with `List<string>`
- `<e-toolbarItems>` **does not exist** in ASP.NET Core (that's ASP.NET MVC syntax)
- Built-in toolbar items must be specified as **string names** in the List
- Custom toolbar items can be added via the **toolbarRender** event
- Save/Load uses **localStorage** by default (can be customized server-side)
- Toolbar position must be `"Top"` or `"Bottom"` (string with quotes)
- chartTypes also uses `List<string>` for specifying allowed chart types
