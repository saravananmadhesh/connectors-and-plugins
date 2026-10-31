# Print

## Overview
The printing functionality allows end-users to print all contents, such as tables, charts, images, and formatted contents, available in the active worksheet or entire workbook in the Spreadsheet. You can enable or disable print functionality by using the `allowPrint` property, which defaults to true.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowPrint="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Report">
                    <e-spreadsheet-rows>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Product"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="Price"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Widget"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="100"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                    </e-spreadsheet-rows>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

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

