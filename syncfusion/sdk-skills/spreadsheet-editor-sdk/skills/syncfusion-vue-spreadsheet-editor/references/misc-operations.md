# Miscellaneous Sheet Operations — Syncfusion Vue Spreadsheet

This guide covers Autofill, clearing content/formatting, sheet management (insert / move / delete), navigation, and clipboard operations in the **Syncfusion Vue Spreadsheet**.

## Minimal Vue Example

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowAutoFill="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="1" />
              <e-cell value="2" />
              <e-cell value="3" />
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
    if (!spreadsheet) return;

    // === AutoFill ===
    spreadsheet.autoFill("A1:C5", "A1:C1");

    // === Clear Contents ===
    //s.clear({ type: "Clear Contents", range: "A1:D10" });

    // === Select Range ===
    spreadsheet.selectRange("A1:D10");
  }
}
};
</script>
```

## 1. Autofill

```vue
spreadsheet.autoFill("A1:C5", "A1:C1");
spreadsheet.autoFill("A1:A10", "A1:A3", "Down", "FillSeries");
spreadsheet.autoFill("A1:F1", "A1:C1", "Right", "CopyCells");
```

## 2. Clear Operations

```vue
spreadsheet.clear({ type: "Clear Contents", range: "A1:D10" });
spreadsheet.clear({ type: "Clear Formats", range: "A1:D10" });
spreadsheet.clear({ type: "Clear Hyperlinks", range: "A1:D10" });
spreadsheet.clear({ type: "Clear All", range: "A1:D10" });
```

## 3. Insert Sheet

```vue
// spreadsheet.insertSheet(startSheet?: number | SheetModel[], endSheet?: number)
spreadsheet.insertSheet([{ name: "New Sheet" }]);
spreadsheet.insertSheet([{ name: "Report" }], 1);
```

## 4. Move Sheet

```vue
// spreadsheet.moveSheet(position, sheetIndexes);
spreadsheet.moveSheet(2);
spreadsheet.moveSheet(0, [1, 2]);
```

## 5. Delete Sheet

```vue
// spreadsheet.delete(startIndex, endIndex, model => ("Row" | "Column" | "Sheet"));
spreadsheet.delete(1, 1, "Sheet");
spreadsheet.delete(0, 1, "Sheet");
```

## 6. Duplicate Sheet

```vue
spreadsheet.duplicateSheet();
spreadsheet.duplicateSheet(0);
```

## 7. Navigation: Go To Cell

```vue
// spreadsheet.goTo("range address");
spreadsheet.goTo("Z100");
spreadsheet.goTo("C5");
spreadsheet.goTo("Sheet2!A1");
```

## 8. Active Sheet Info

```vue
const activeSheetIdx = spreadsheet.ej2Instances.activeSheetIndex;
const sheet = spreadsheet.ej2Instances.getActiveSheet();
console.log(sheet.name);
```

## 9. Select Range

```vue
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

