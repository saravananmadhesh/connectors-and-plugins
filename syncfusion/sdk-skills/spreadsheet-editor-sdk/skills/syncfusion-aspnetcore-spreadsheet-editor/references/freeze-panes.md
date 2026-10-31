# Freeze Panes — Syncfusion ASP.NET Core Spreadsheet

Freeze Panes keeps specific rows and columns visible while scrolling. ASP.NET Core Spreadsheet supports freezing through:

- Sheet properties → `frozenRows`, `frozenColumns`  
- Programmatic API → `freezePanes(row, column)`

ASP.NET Core Spreadsheet **does not support** freezing by sheet name or index (only active sheet can be frozen).

## Minimal ASP.NET Core Example

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="SalesData" frozenRows="2" frozenColumns="2">
                    <e-spreadsheet-columns>
                        <e-spreadsheet-column width="180"></e-spreadsheet-column>
                        <e-spreadsheet-column width="180"></e-spreadsheet-column>
                        <e-spreadsheet-column width="180"></e-spreadsheet-column>
                        <e-spreadsheet-column width="180"></e-spreadsheet-column>
                    </e-spreadsheet-columns>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

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
<e-spreadsheet-sheet name="Data" frozenRows="2" frozenColumns="1"></e-spreadsheet-sheet> // Freeze first 2 rows and Freeze first column

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
<e-spreadsheet-sheet frozenRows="1" frozenColumns="0"></e-spreadsheet-sheet>
```

### Freeze First Column Only
```cshtml
<e-spreadsheet-sheet frozenRows="0" frozenColumns="1"></e-spreadsheet-sheet>
```

### Freeze Header + First Column
```cshtml
<e-spreadsheet-sheet frozenRows="1" frozenColumns="1"></e-spreadsheet-sheet>
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

ASP.NET Core Spreadsheet UI includes:
- Freeze Panes
- Freeze Rows
- Freeze Columns


## 8. Limitations (ASP.NET Core Specific)

- Freeze applies **only to active sheet** programmatically.
- Cannot freeze across merged cells.
- Must unfreeze fully before applying new freeze.
- Images/charts in frozen area may overlap when scrolling.

