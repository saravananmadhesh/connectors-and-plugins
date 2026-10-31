# Freeze Panes — Syncfusion ASP.NET MVC Spreadsheet

Freeze Panes keeps specific rows and columns visible while scrolling. ASP.NET MVC Spreadsheet supports freezing through:

- Sheet properties → `frozenRows`, `frozenColumns`  
- Programmatic API → `freezePanes(row, column)`

ASP.NET MVC Spreadsheet **does not support** freezing by sheet name or index (only active sheet can be frozen).

## Minimal ASP.NET MVC Example

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").Created("onCreated").Sheets(sheet =>
{
    sheet.Name("SalesData").FrozenRows(2).FrozenColumns(2).Ranges(ranges =>
    {
        ranges.DataSource((IEnumerable<object>)ViewData["SalesData"]).Add();
    }).Columns(column =>
    {
        column.Width(180).Add();
        column.Width(180).Add();
        column.Width(180).Add();
        column.Width(180).Add();
    }).Add();
}).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        // Freeze first 2 rows & 2 columns
        spreadsheet.freezePanes(2, 2);
    }
</script>
```

## 1. Freezing During Initialization

```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
            .Sheets(sheet =>
            {
                sheet.Name("Sheet1")
                    .FrozenRows(2)
                    .FrozenColumns(1)
                    .Add();
            })
            .Render() // Freeze first 2 rows and Freeze first column

```

## 2. Programmatic Freeze (Active Sheet Only)

```cshtml
spreadsheet.freezePanes(2, 2);   // Freeze 2 rows & 2 columns
spreadsheet.freezePanes(1, 1);   // Default Excel-like freeze
spreadsheet.freezePanes(0, 0);   // Unfreeze all
```

## 3. Update Freeze After Initialization

```cshtml
const sheet = spreadsheet.sheets[0];
sheet.frozenRows = 1;
sheet.frozenColumns = 2;
spreadsheet.dataBind();
spreadsheet.refresh();
```

## 4. Get Freeze Settings

```cshtml
const sheet = spreadsheet.sheets[0];
console.log(sheet.frozenRows, sheet.frozenColumns);
```

## 5. Common Freeze Scenarios

### Freeze Header Row Only
```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
            .Sheets(sheet =>
            {
                sheet.Name("Sheet1")
                    .FrozenRows(1)
                    .FrozenColumns(0)
                    .Add();
            })
            .Render()
```

### Freeze First Column Only
```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
            .Sheets(sheet =>
            {
                sheet.Name("Sheet1")
                    .FrozenRows(0)
                    .FrozenColumns(1)
                    .Add();
            })
            .Render()
```

### Freeze Header + First Column
```cshtml
@Html.EJS().Spreadsheet("spreadsheet")
            .Sheets(sheet =>
            {
                sheet.Name("Sheet1")
                    .FrozenRows(1)
                    .FrozenColumns(1)
                    .Add();
            })
            .Render()
```

### Freeze Multiple Rows (Reports)
```cshtml
spreadsheet.freezePanes(3, 1);    // 3 rows, 1 column
```

### Freeze First Two Columns
```cshtml
spreadsheet.freezePanes(1, 2);
```

## 6. Unfreeze panes

```cshtml
// spreadsheet.unfreezePanes(sheetIndex or sheetname);
spreadsheet.unfreezePanes(1); //Unfreeze the rows and columns in second sheet
spreadsheet.unfreezePanes(); //Unfreeze the rows and columns in active sheet
```

Or:
```cshtml
spreadsheet.sheets[0].frozenRows = 0;
spreadsheet.sheets[0].frozenColumns = 0;
spreadsheet.dataBind();
spreadsheet.refresh();
```

## 7. UI Ribbon Freeze

ASP.NET MVC Spreadsheet UI includes:
- Freeze Panes
- Freeze Rows
- Freeze Columns


## 8. Limitations (ASP.NET MVC Specific)

- Freeze applies **only to active sheet** programmatically.
- Cannot freeze across merged cells.
- Must unfreeze fully before applying new freeze.
- Images/charts in frozen area may overlap when scrolling.

