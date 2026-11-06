# Merge & Unmerge Cells

Merge cells into a single larger cell and unmerge them back in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowMerge="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Report">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Project" />
              <e-cell value="" />
              <e-cell value="Budget" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Widget A" />
              <e-cell value="10000" />
              <e-cell value="" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Widget B" />
              <e-cell value="15000" />
              <e-cell value="" />
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RowsDirective,
RowDirective,
CellsDirective,
CellDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-rows": RowsDirective,
  "e-row": RowDirective,
  "e-cells": CellsDirective,
  "e-cell": CellDirective
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // === Merge Cells ===
    spreadsheet.merge("A1:C1");
    // === Merge + Format ===
    spreadsheet.merge("A1:C1");
    spreadsheet.cellFormat(
      { fontWeight: 'bold', textAlign: "center", verticalAlign: "middle" },
      "A1:C1"
    );
    // === Unmerge ===
    //s.unMerge("A1");
    // === Check if a cell is merged ===
    const cell = spreadsheet.ej2Instances.sheets[0].rows[0].cells[0];
    const isMerged = (cell.colSpan > 1 || cell.rowSpan > 1);
    console.log("Cell merged:", isMerged);
    // === Get Merge Info ===
    console.log("Row span:", cell.rowSpan, "Col span:", cell.colSpan);
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[RANGE]` | Cell range to merge | `'A1:C1'`, `'A1:C3'`, `'B2:D5'` |
| `[CELL]` | Cell address (any in merged range) | `'A1'`, `'B2'`, `'C1'` |

## API Methods Reference

### Merge Cells
```vue
spreadsheet.merge('[RANGE]');
// Combines cells in the range into a single cell
// Only value from first cell (top-left) is retained
// Other cell values are discarded
```

**Effect**: Cells span across rows/columns; displays as one large cell.

### Unmerge Cells
```vue
spreadsheet.unMerge('[CELL]');
// Breaks merged cell back into individual cells
// Can reference any cell within the merged range
```

**Effect**: Merged cells separate back into individual cells; value copies to top-left only.

## Merge Patterns

### Merge Columns (Header Row)
```vue
spreadsheet.merge('A1:C1');
spreadsheet.cellFormat({ textAlign: 'center' }, 'A1:C1');
// Creates wide header spanning columns A-C
```

### Merge Rows (Vertical)
```vue
spreadsheet.merge('A2:A5');
// Creates tall cell spanning rows 2-5
// Common for category labels
```

### Merge Matrix (2D)
```vue
spreadsheet.merge('A2:C4');
// Creates 3x3 merged cell
// Spans columns A-C and rows 2-4
```

### Multiple Merges in One Sheet
```vue
spreadsheet.merge('A1:D1');      // Merge header row
spreadsheet.merge('A2:A5');      // Merge first column
spreadsheet.merge('B2:D5');      // Merge data area
```

## Merged Cell Behavior

### Value Retention
- Only the value of the **first cell (top-left)** in the range is kept
- Other cell values are **discarded**
- Use a placeholder or space if needed

```vue
// Before merge:
// A1: 'Region'  B1: ''  C1: ''
// After merge:
// A1:C1: 'Region' (spanning 3 columns)
```

### Selection Behavior
- Clicking anywhere in merged cell **selects entire merged range**
- Editing affects only the merged cell content

### Unmerge Behavior
- Call `unMerge()` with **any cell address** in the merged range
- Value returns to **top-left cell only**
- Other cells remain empty

```vue
// After unmerge:
// A1: 'Region'  B1: ''  C1: ''
```

## Notes

- **Best Practice**: Always set `allowMerge: true` in initialization
- **Best Practice**: Use merge for headers and labels, not data cells
- **Best Practice**: Merge before applying formatting for consistent alignment
- **Best Practice**: Unmerge before adding data to prevent value loss
- **Printing**: Merged cells typically export to Excel/PDF as merged
- **Performance**: No performance impact; merge is UI-only

## Example: Create Merged Header

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowMerge="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Report">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Monthly Sales" />
              <e-cell value="" />
              <e-cell value="" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Product" />
              <e-cell value="Q1" />
              <e-cell value="Q2" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Widget" />
              <e-cell value="5000" />
              <e-cell value="6000" />
            </e-cells>
          </e-row>
        </e-rows>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</div>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RowsDirective,
RowDirective,
CellsDirective,
CellDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-rows": RowsDirective,
  "e-row": RowDirective,
  "e-cells": CellsDirective,
  "e-cell": CellDirective
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // Merge header A1:C1
    spreadsheet.merge("A1:C1");
    // Apply styling
    spreadsheet.cellFormat(
      { textAlign: "center", fontWeight: "bold", fontSize: "14pt" },
      "A1"
    );
  }
}
};
</script>

```

## Example: Unmerge and Populate

```vue
// Unmerge first
spreadsheet.unMerge('A1');

// Then fill with individual data
spreadsheet.updateCell({ value: 'Jan' }, 'A1');
spreadsheet.updateCell({ value: 'Feb' }, 'B1');
spreadsheet.updateCell({ value: 'Mar' }, 'C1');
```

## Example: Merge with Formatting

```vue
methods: {
  mergeAndFormat(range, options = {}) {
    const s = this.$refs.spreadsheet;

    // Merge the given range
    spreadsheet.merge(range);

    // Apply formatting
    spreadsheet.cellFormat(
      {
        textAlign: options.align || "center",
        verticalAlign: options.vAlign || "middle",
        fontWeight: options.bold ? "bold" : "normal",
        backgroundColor: options.bgColor || "#FFFFFF"
      },
      range
    );
  }
}
```