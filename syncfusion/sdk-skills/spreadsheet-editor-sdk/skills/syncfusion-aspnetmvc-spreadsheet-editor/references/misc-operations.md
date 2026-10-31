# Miscellaneous Sheet Operations — Syncfusion ASP.NET MVC Spreadsheet

This guide covers Autofill, clearing content/formatting, sheet management (insert / move / delete), navigation, and clipboard operations in the **Syncfusion ASP.NET MVC Spreadsheet**.

## Minimal ASP.NET MVC Example

```cshtml
@using Syncfusion.EJ2

@Html.EJS().Spreadsheet("spreadsheet").AllowAutoFill(true).Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Sheet1")
            .Rows(rows =>
            {
                rows.Cells(cells =>
                {
                    cells.Value("1").Add();
                    cells.Value("2").Add();
                    cells.Value("3").Add();
                }).Add();
            }).Add();
    }).Render()

<script>

    function onCreated() {
        var spreadsheet = document.getElementById('spreadsheet').ej2_instances[0];

        // Autofill
        spreadsheet.autoFill("A1:C5", "A1:C1");

        // Clear contents
        spreadsheet.clear({ type: "Clear Contents", range: "A1:D10" });

        // Select range
        spreadsheet.selectRange("A1:D10");
    }
</script>
```

## 1. Autofill

```cshtml
spreadsheet.autoFill("A1:C5", "A1:C1");
spreadsheet.autoFill("A1:A10", "A1:A3", "Down", "FillSeries");
spreadsheet.autoFill("A1:F1", "A1:C1", "Right", "CopyCells");
```

## 2. Clear Operations

```cshtml
spreadsheet.clear({ type: "Clear Contents", range: "A1:D10" });
spreadsheet.clear({ type: "Clear Formats", range: "A1:D10" });
spreadsheet.clear({ type: "Clear Hyperlinks", range: "A1:D10" });
spreadsheet.clear({ type: "Clear All", range: "A1:D10" });
```

## 3. Insert Sheet

```cshtml
// spreadsheet.insertSheet(startSheet?: number | SheetModel[], endSheet?: number)
spreadsheet.insertSheet([{ name: "New Sheet" }]);
spreadsheet.insertSheet([{ name: "Report" }], 1);
```

## 4. Move Sheet

```cshtml
// spreadsheet.moveSheet(position, sheetIndexes);
spreadsheet.moveSheet(2);
spreadsheet.moveSheet(0, [1, 2]);
```

## 5. Delete Sheet

```cshtml
// spreadsheet.delete(startIndex, endIndex, model => ("Row" | "Column" | "Sheet"));
spreadsheet.delete(1, 1, "Sheet");
spreadsheet.delete(0, 1, "Sheet");
```

## 6. Duplicate Sheet

```cshtml
spreadsheet.duplicateSheet();
spreadsheet.duplicateSheet(0);
```

## 7. Navigation: Go To Cell

```cshtml
// spreadsheet.goTo("range address");
spreadsheet.goTo("Z100");
spreadsheet.goTo("C5");
spreadsheet.goTo("Sheet2!A1");
```

## 8. Active Sheet Info

```cshtml
const activeSheetIdx = spreadsheet.activeSheetIndex;
const sheet = spreadsheet.getActiveSheet();
console.log(sheet.name);
```

## 9. Select Range

```cshtml
// spreadsheet.selectRange(range address);
spreadsheet.selectRange("A1:D10");
```

## Autofill Fill Types

| Fill Type | Description |
|----------|-------------|
| CopyCells | Repeat pattern |
| FillSeries | Continue numeric/date series |
| FillFormattingOnly | Extend formatting only |
| FillWithoutFormatting | Extend data without formatting |

## Clear Types

| Clear Type | Removes |
|------------|---------|
| Clear Contents | Values |
| Clear Formats | Formatting |
| Clear Hyperlinks | Hyperlinks only |
| Clear All | Everything |

