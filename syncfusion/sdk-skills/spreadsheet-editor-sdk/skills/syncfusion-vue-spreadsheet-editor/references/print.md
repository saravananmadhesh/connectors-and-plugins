# Print

## Overview
The printing functionality allows end-users to print all contents, such as tables, charts, images, and formatted contents, available in the active worksheet or entire workbook in the Spreadsheet. You can enable or disable print functionality by using the `allowPrint` property, which defaults to true.

## Minimal Vue Code

```vue
<template>
<div class="control-section">
  <button class='e-btn' @click="printSheet">Print Spreadsheet</button>

  <ejs-spreadsheet
    ref="spreadsheet"
    :allowPrint="true"
  >
    <e-sheets>
      <e-sheet name="Report">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Product" />
              <e-cell value="Price" />
            </e-cells>
          </e-row>

          <e-row>
            <e-cells>
              <e-cell value="Widget" />
              <e-cell value="100" />
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
  printSheet() {
    const spreadsheet = this.$refs.spreadsheet;
    spreadsheet.print();   // Opens browser print dialog
  }
}
};
</script>
```

## API Methods Reference

### Print
Used to print the active sheet or the entire workbook based on the printOptions based in it.

**Parameters**:
- No parameters

**Returns**: void

**Example**:
```vue
//Without any printOptions, it will print the activesheet without grid lines and row/column headers.
spreadsheet.print();

//Used to print whole workbook with gridlines and row/column headers.
spreadsheet.print({ type: 'Workbook', allowRowColumnHeader: true, allowGridLines: true });

//Used to print active sheet with gridlines and row/column headers.
spreadsheet.print({ type: 'ActiveSheet', allowRowColumnHeader: true, allowGridLines: true });

```

## Notes

- **Best Practice**: Test print preview before final printing
- **Performance**: Print operations are browser-dependent; large sheets may take time
- **Compatibility**: PDF export may not respect all print settings; use dedicated export feature
