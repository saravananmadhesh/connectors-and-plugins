# Merge & UnMerge Cells

Merge cells into a single larger cell and unMerge them back in the Spreadsheet Editor.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowMerge="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Report">
                    <e-spreadsheet-rows>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Project"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value=""></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="Budget"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Widget A"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="10000"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value=""></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Widget B"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="15000"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value=""></e-spreadsheet-cell>
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

        // === Merge Cells ===
        spreadsheet.merge('A1:C1'); // Merge cells A1 to C1

        // === Merge with Alignment ===
        spreadsheet.merge('A1:C1');
        spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A1:C1');

        // === Unmerge Cells ===
        spreadsheet.unMerge('A1:C1'); // Unmerge cell A1 (or any cell in merged range)

        // === Check if Cell is Merged ===
        var cell = spreadsheet.sheets[0].rows[0].cells[0];
        var isMerged = cell.colSpan > 1 || cell.rowSpan > 1;
        console.log('Cell merged:', isMerged);

        // === Get Merge Info ===
        console.log('Row span:', cell.rowSpan, 'Col span:', cell.colSpan);
    }
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[RANGE]` | Cell range to merge | `'A1:C1'`, `'A1:C3'`, `'B2:D5'` |
| `[CELL]` | Cell address (any in merged range) | `'A1'`, `'B2'`, `'C1'` |

## API Methods Reference

### Merge Cells
```cshtml
spreadsheet.merge('[RANGE]');
// Combines cells in the range into a single cell
// Only value from first cell (top-left) is retained
// Other cell values are discarded
```

**Effect**: Cells span across rows/columns; displays as one large cell.

### Unmerge Cells
```cshtml
spreadsheet.unmerge('[CELL]');
// Breaks merged cell back into individual cells
// Can reference any cell within the merged range
```

**Effect**: Merged cells separate back into individual cells; value copies to top-left only.

## Merge Patterns

### Merge Columns (Header Row)
```cshtml
spreadsheet.merge('A1:C1');
spreadsheet.cellFormat({ textAlign: 'center' }, 'A1:C1');
// Creates wide header spanning columns A-C
```

### Merge Rows (Vertical)
```cshtml
spreadsheet.merge('A2:A5');
// Creates tall cell spanning rows 2-5
// Common for category labels
```

### Merge Matrix (2D)
```cshtml
spreadsheet.merge('A2:C4');
// Creates 3x3 merged cell
// Spans columns A-C and rows 2-4
```

### Multiple Merges in One Sheet
```cshtml
spreadsheet.merge('A1:D1');      // Merge header row
spreadsheet.merge('A2:A5');      // Merge first column
spreadsheet.merge('B2:D5');      // Merge data area
```

## Merged Cell Behavior

### Value Retention
- Only the value of the **first cell (top-left)** in the range is kept
- Other cell values are **discarded**
- Use a placeholder or space if needed

```typescript
// Before merge:
// A1: 'Region'  B1: ''  C1: ''
// After merge:
// A1:C1: 'Region' (spanning 3 columns)
```

### Selection Behavior
- Clicking anywhere in merged cell **selects entire merged range**
- Editing affects only the merged cell content

### UnMerge Behavior
- Call `unMerge()` with **any cell address** in the merged range
- Value returns to **top-left cell only**
- Other cells remain empty

```typescript
// After unMerge:
// A1: 'Region'  B1: ''  C1: ''
```

## Notes

- Set `allowMerge: false` in initialization to restrict merge action.
- Only the top-left cell value is preserved; other values are lost
- Merged cells count as single cell for copy/paste operations
- Formulas referencing merged cells use top-left address

## Example: Create Merged Header

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowMerge="true" created="onCreated">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Report">
                    <e-spreadsheet-rows>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Monthly Sales"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value=""></e-spreadsheet-cell>
                                <e-spreadsheet-cell value=""></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Product"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="Q1"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="Q2"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="Widget"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="5000"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="6000"></e-spreadsheet-cell>
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
        // Merge header cells
        spreadsheet.merge('A1:C1');

        // Center and bold the header
        spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold', fontSize: '14pt' }, 'A1');
    }
</script>

```
