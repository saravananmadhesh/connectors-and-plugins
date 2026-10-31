# Printing in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Print Pivot Table](#print-pivot-table)
- [Print Pivot Chart](#print-pivot-chart)
- [Print Both Table and Chart](#print-both-table-and-chart)
- [Customize Print](#customize-print)
- [Best Practices](#best-practices)

## Overview

The print feature in ASP.NET MVC Pivot Table allows users to print the current state of the pivot table or pivot chart. The Grid and Chart components manage the print functionality, capturing all applied filters, sorting, and formatting. Print is triggered using external buttons, not toolbar items.

## Print Pivot Table

Print the rendered pivot table by invoking the `print` method from the underlying Grid component instance. The Grid control manages the print functionality and captures the current state of the pivot table, including all applied filters, sorting, and formatting.

### Print Pivot Table Programmatically

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().Button("print").Content("Print").IsPrimary(true).Render()

@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSourceSettings => dataSourceSettings.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false)
.FormatSettings(formatsettings =>
{
    formatsettings.Name("Amount").Format("C0").Add();
}).Rows(rows =>
{
    rows.Name("Country").Add(); rows.Name("Products").Add();
}).Columns(columns =>
{
    columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
}).Values(values =>
{
    values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
})).Height("300").Render()

<script>
    var pivotObj;
    document.getElementById('print').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.grid.print();
    }
</script>
```

### Print with Custom Title

```html
<script>
    function printWithTitle() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
        // Add title before print
        var title = document.createElement('div');
        title.innerHTML = '<h2>Sales Report - Q1 2024</h2>';
        title.style.pageBreakAfter = 'avoid';
        
        var printArea = pivotObj.element;
        var originalContent = printArea.innerHTML;
        
        printArea.innerHTML = title.innerHTML + originalContent;
        pivotObj.grid.print();
        printArea.innerHTML = originalContent;
    }
</script>
```

## Print Pivot Chart

To print the pivot chart, use the `print` method from the underlying Chart component instance. The Chart control manages the print functionality and preserves all visual elements, including colors, legends, and data labels, in the printed output.

**Prerequisites:**
- Inject the `PivotChart` module into the pivot table to enable chart functionality
- Set the `PivotViewDisplayOption` property to `View.Chart` or `View.Both` to display the pivot chart

### Print Chart Programmatically

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().Button("print").Content("Print").IsPrimary(true).Render()

@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSourceSettings => dataSourceSettings.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false)
.FormatSettings(formatsettings =>
{
    formatsettings.Name("Amount").Format("C0").Add();
}).Rows(rows =>
{
    rows.Name("Country").Add(); rows.Name("Products").Add();
}).Columns(columns =>
{
    columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
}).Values(values =>
{
    values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
})).DisplayOption(new PivotViewDisplayOption { View = View.Chart }).ChartSettings(chartSettings => chartSettings.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Column))).Height("300").Render()

<script>
    var pivotObj;
    document.getElementById('print').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.chart.print();
    }
</script>
```

## Print Both Table and Chart

Print both table and chart by setting the `DisplayOption` to `View.Both`. Use external buttons to trigger print for either the grid or chart.

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().Button("printTable").Content("Print Table").IsPrimary(true).Render()
@Html.EJS().Button("printChart").Content("Print Chart").IsPrimary(true).Render()

@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSourceSettings => dataSourceSettings.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false)
.FormatSettings(formatsettings =>
{
    formatsettings.Name("Amount").Format("C0").Add();
}).Rows(rows =>
{
    rows.Name("Country").Add(); rows.Name("Products").Add();
}).Columns(columns =>
{
    columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
}).Values(values =>
{
    values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
})).DisplayOption(new PivotViewDisplayOption { View = View.Both }).ChartSettings(chartSettings => chartSettings.ChartSeries(chartSeries => chartSeries.Type(ChartSeriesType.Column))).Height("300").Render()

<script>
    var pivotObj;
    
    document.getElementById('printTable').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.grid.print();
    }
    
    document.getElementById('printChart').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.chart.print();
    }
</script>
```

**DisplayOption Values:**
- `View.Grid` - Show pivot table only
- `View.Chart` - Show pivot chart only
- `View.Both` - Show both table and chart

## Customize Print

### Print with Custom Header

```html
<script>
    function printWithHeader() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
        var header = document.createElement('div');
        header.className = 'print-header';
        header.innerHTML = `
            <h2>Quarterly Sales Report</h2>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
            <hr>
        `;
        header.style.pageBreakAfter = 'avoid';
        
        var printArea = pivotObj.element;
        var originalContent = printArea.innerHTML;
        
        printArea.insertBefore(header, printArea.firstChild);
        pivotObj.grid.print();
        printArea.innerHTML = originalContent;
    }
</script>
```

### CSS for Print Styling

```css
@media print {
    /* Hide UI elements */
    .e-toolbar,
    .e-groupingbar,
    .e-fieldlist,
    .e-pivot-button,
    .e-filterbar {
        display: none !important;
    }
    
    /* Optimize table appearance */
    .e-pivot-table {
        page-break-inside: avoid;
        font-size: 10pt;
        margin: 0.5in;
    }
    
    .e-pivot-table .e-headercell {
        background-color: #2196F3 !important;
        color: white !important;
        page-break-inside: avoid;
    }
    
    .e-pivot-table .e-row {
        page-break-inside: avoid;
    }
    
    /* Optimize chart */
    .e-chart {
        page-break-inside: avoid;
        margin-top: 1in;
    }
    
    /* Custom header/footer */
    .print-header {
        page-break-after: avoid;
        text-align: center;
        margin-bottom: 0.5in;
    }
}
```

### Print Orientation and Page Setup

```html
<script>
    function printLandscape() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
        // Add landscape CSS
        var style = document.createElement('style');
        style.innerHTML = '@page { size: landscape; margin: 0.5in; }';
        document.head.appendChild(style);
        
        pivotObj.grid.print();
        
        // Remove style after print
        setTimeout(() => document.head.removeChild(style), 100);
    }
</script>
```

## Best Practices

- **External Buttons:** Always use external buttons to trigger print operations. Toolbar items do not include a built-in Print action.
- **Module Injection:** Ensure PivotChart module is injected for chart printing functionality.
- **Grid and Chart Instances:** Use `pivotObj.grid.print()` for tables and `pivotObj.chart.print()` for charts.
- **Layout Testing:** Test print preview before distributing
- **Orientation:** Use landscape for wide pivots (many columns)
- **Margins:** Set 0.5-1 inch margins for content visibility
- **Header/Footer:** Include report title and date for context
- **Hide controls:** CSS media print query hides toolbar, field list, grouping bar
- **Page breaks:** Use `page-break-inside: avoid` for table/chart integrity
- **Colors:** Ensure printer-friendly color schemes (avoid light backgrounds)
- **Testing:** Print to PDF first to verify layout before physical printing
- **Performance:** Minimize number of pages (consider filters for large datasets)
- **Accessibility:** Include descriptive titles and legend information
