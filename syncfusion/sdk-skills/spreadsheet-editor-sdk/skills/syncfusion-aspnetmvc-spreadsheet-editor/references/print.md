# Print

## Overview
The printing functionality allows end-users to print all contents, such as tables, charts, images, and formatted contents, available in the active worksheet or entire workbook in the Spreadsheet. You can enable or disable print functionality by using the `allowPrint` property, which defaults to true.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").AllowPrint(true).Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Report")
        .Rows(rows =>
        {
            rows.Cells(cells =>
            {
                cells.Value("Product").Add();
                cells.Value("Price").Add();
            }).Add();

            rows.Cells(cells =>
            {
                cells.Value("Widget").Add();
                cells.Value("100").Add();
            }).Add();
        }).Add();
    }).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Open Print Dialog ===
        spreadsheet.print();
    }
</script>

```

## API Methods Reference

### Print
Used to print the active sheet or the entire workbook based on the printOptions based in it.

**Parameters**:
- No parameters

**Returns**: void

**Example**:
```cshtml
//Without any printOptions, it will print the activesheet without grid lines and row/column headers.
spreadsheet.print();

//Used to print whole workbook with gridlines and row/column headers.
spreadsheet.print({ type: 'Workbook', allowRowColumnHeader: true, allowGridLines: true });

//Used to print active sheet with gridlines and row/column headers.
spreadsheet.print({ type: 'ActiveSheet', allowRowColumnHeader: true, allowGridLines: true });

```

