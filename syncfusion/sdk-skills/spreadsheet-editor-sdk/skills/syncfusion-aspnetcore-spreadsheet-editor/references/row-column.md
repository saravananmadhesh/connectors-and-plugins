# Row & Column Operations

Insert, delete, resize rows and columns, and manage row/column properties in the Spreadsheet Editor.

## 1. Minimal ASP.NET Core Example

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Data"></e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        if (!spreadsheet) return;

        spreadsheet.setRowHeight(30, 1);       // Row 2
        spreadsheet.setColWidth(120, 0);       // Column A

        spreadsheet.setRowsHeight(40, ['1:4']);    // Rows 1-4
        spreadsheet.setColumnsWidth(150, ['C:G']); // Columns C-G

        // Hide rows
        spreadsheet.hideRow(3, 5, true);
        // Show rows
        spreadsheet.hideRow(3, 5, false);
        // Hide columns
        spreadsheet.hideColumn(1, 4, true);
        // Show columns
        spreadsheet.hideColumn(1, 4, false);

        // Auto fit columns content
        spreadsheet.autoFit('D:F');
        // Auto fit rows content
        spreadsheet.autoFit('5:10');
    }
</script>
```

## 2. Insert & Delete Rows and Columns

ASP.NET Core Spreadsheet uses the **insertRow()**, **insertColumn** and **delete()** methods.

### Insert Rows
```cshtml
spreadsheet.insertRow(4, 6);
```

### Delete Rows
```cshtml
spreadsheet.delete(4, 1, "Row");
```

### Insert Columns
```cshtml
spreadsheet.insertColumn(2, 1);
```

### Delete Columns
```cshtml
spreadsheet.delete(1, 2, "Column");
```

## 3. Row Height API

### Set single row height
```cshtml
spreadsheet.setRowHeight(25, 0);   // Row 1
```

### Set multiple row heights
```cshtml
spreadsheet.setRowsHeight(35, [`3:6`]); // Rows 3-7
```

## 4. Column Width API

### Set single column width
```cshtml
spreadsheet.setColWidth(100, 0);
```

### Set multiple columns width
```cshtml
spreadsheet.setColumnsWidth(150, [`B:F`]);  // B-D
```

## 5. Hide / Show Rows
```cshtml
//Hide rows
spreadsheet.hideRow(3, 6, true);
spreadsheet.hideRow(3, 5, true);

//Show rows
spreadsheet.hideRow(3, 6, false);
spreadsheet.hideRow(3, 5, false);
```

## 6. Hide / Show Columns
```cshtml
//Hide columns
spreadsheet.hideColumn(1, 5, true);
spreadsheet.hideColumn(1, 3, true);

//Show columns
spreadsheet.hideColumn(1, 5, false);
spreadsheet.hideColumn(1, 3, false);
```

## 7. Auto-Fit Rows & Columns

```cshtml
spreadsheet.autofit("A:A");        // Autofit column A
spreadsheet.autofit("1:1");        // Autofit row 1
spreadsheet.autofit("A1:D20");
```

## 8. Select Range
```cshtml
spreadsheet.selectRange("A1:D10");
```

## 9. Indexing Notes
- Row indices → **0-based**
- Column indices → **0-based**

Example:
```cshtml
spreadsheet.setRowHeight(20, 0);    // First row
spreadsheet.setColWidth(140, 0); // Column A
```

## 10. Valid Spreadsheet APIs Summary for Rows and Columns

| Operation | API |
|----------|------|
| Insert rows | `insertRow(startRow (optional), endRow (optional), sheet (optional))` |
| Insert columns | `insertColumn(startColumn (optional), endColumn (optional), sheet (optional))` |
| Delete rows | `delete(startIdx, endIdx, "Row"/"Column")` |
| Delete rows | `delete(startIdx, endIdx, "Row"/"Column")` |
| Set row height | `setRowHeight(height, rowIdx, sheetIdx)` |
| Set rows height | `setRowsHeight(height, ranges (i.e., [`2`], [`2:4`]))` |
| Set column width | `setColWidth(width, colIdx (optional), sheetIdx (optional))` |
| Set columns width | `setColumnsWidth(width, ranges (i.e., [`F`], [`E:H`]))` |
| Hide rows | `hideRow(startIdx, endIdx, true)` |
| Show rows | `hideRow(startIdx, endIdx, false)` |
| Hide columns | `hideColumn(startIdx, endIdx, true)` |
| Show columns | `hideColumn(startIdx, endIdx, false)` |
| AutoFit | `autoFit(range) e.g., autoFit('4:8'), autoFit('C:H')` |
| Range selection | `selectRange(range)` |

## 11. Best Practices
- Call row/column resizing inside `created` event after spreadsheet creation.
- Use `autofit()` for content-driven sizing.
- Prefer hiding instead of deleting when formulas rely on structure.
- Avoid resizing large ranges for performance.
