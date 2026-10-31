# Cell Editing

Edit cell values, start/end edit mode, and update cells programmatically in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowEditing="true"
    :created="onCreated"
    :cellEdit="onCellEdit"
  >
    <e-sheets>
      <e-sheet :name="Data">
        <e-rows>
          <e-row>
            <e-cells>
              <e-cell value="Name" />
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
  onCreated() {
    const s = this.$refs.spreadsheet;

    // === Start Edit Mode ===
    s.startEdit();        // Edit active cell
    // === End Edit Mode ===
    s.endEdit();          // Save and exit
    // === Update Cell Values ===
    s.updateCell({ value: "New Value" }, "A2");
    s.updateCell({ value: "150" }, "B2");
    // === Update Cell with Formula ===
    s.updateCell({ value: "=SUM(B2:B10)" }, "B11");
    // === Update Multiple Cells (range) ===
    s.updateCell({ value: "Updated" }, "A2:A5");
    // === Update Cell with Format ===
    s.updateCell(
      {
        value: "Formatted",
        style: {
          fontWeight: "bold",
          color: "#FF0000",
          backgroundColor: "#FFFF00"
        }
      },
      "C2"
    );

    // === Check active cell ===
    const activeCell = s.ej2Instances.getActiveSheet().activeCell;
    console.log("Active cell:", activeCell);
  },

  onCellEdit(args) {
    // Cancel editing A1
    if (args.address === "A1") {
      args.cancel = true;
    }
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[VALUE]` | Cell value or formula | `'New Value'`, `100`, `'=SUM(A1:A5)'` |
| `[CELL]` | Target cell address | `'A1'`, `'B2'`, `'A2:A5'` |
| `[STYLE]` | Cell formatting object | `{ fontWeight: 'bold', color: '#FF0000' }` |
| `[MODE]` | Edit mode flag | `true`, `false` |

## API Methods Reference

### Start Edit Mode
```vue
spreadsheet.startEdit();
```

**Effect**: Activates edit mode on the current/active cell, allowing user text input.

### End Edit Mode
```vue
spreadsheet.endEdit();                      // Save changes and exit edit mode
```

**Effect**: Closes edit mode, validates input, applies to cell.

### Close Edit Mode
```vue
spreadsheet.closeEdit();                    // Close the edit cell
```

**Effect**: Closes the currently active edit cell, similar to `endEdit()`.

### Update Cell
```vue
spreadsheet.updateCell(
  { value: '[VALUE]', style?: {...} },
  '[CELL]'
);
```

**Effect**: Directly updates cell value and optional formatting without entering edit mode.

### Get Active Cell
```vue
const activeCell = spreadsheet.ej2Instances.getActiveSheet().activeCell;
// Returns: Address of currently selected cell (e.g., 'A1')
```

### Get Cell Value
```vue
const value = spreadsheet.ej2Instances.sheets[0].rows[rowIndex].cells[colIndex].value;
```

## Editing Modes

### User-Initiated Edit (Double-Click)
User double-clicks cell → `startEdit()` fires → cell enters edit mode with cursor → user types → presses Enter/Tab/Escape

### Programmatic Edit Start
```vue
spreadsheet.startEdit();    // Start edit on current active cell
// User can now type in the cell editor
```

### Programmatic Update (No Edit Mode)
```vue
spreadsheet.updateCell({ value: 'Direct Update' }, 'A1');
// Cell value changes immediately; no edit mode activated
```

## Update Cell Options

### Simple Value
```vue
spreadsheet.updateCell({ value: 'Text' }, 'A1');
```

### Numeric Value
```vue
spreadsheet.updateCell({ value: 12345 }, 'B1');
```

### Formula
```vue
spreadsheet.updateCell({ formula: '=SUM(A1:A10)' }, 'A11');
```

### With Formatting
```vue
spreadsheet.updateCell(
  {
    value: 'Important',
    style: {
      fontWeight: 'bold',
      color: '#FFFFFF',
      backgroundColor: '#FF0000'
    }
  },
  'A1'
);
```

### Range Update (all cells same value)
```vue
spreadsheet.updateCell({ value: 'Default' }, 'A1:A10');
```

## Notes

- **Best Practice**: Use `updateCell()` for direct value changes; use `startEdit()` for user-interactive editing
- **Best Practice**: Always call `endEdit()` before programmatically changing cells to avoid merge conflicts
- **Best Practice**: Validate cell values before `updateCell()` to prevent invalid data
- **Performance**: Updating many cells (1000+) should be batched to avoid UI lag

## Example: Edit Cell with Validation

```vue
methods: {
  isValidPrice(value) {
    return !isNaN(value) && value >= 0;
  },

  updatePrice(cell, newPrice) {
    const s = this.$refs.spreadsheet;

    if (this.isValidPrice(newPrice)) {
      s.updateCell({ value: newPrice }, cell);
    } else {
      console.error("Invalid price:", newPrice);
    }
  }
}
```

## Example: Batch Edit Multiple Cells

```vue
methods: {
  batchUpdateCells() {
    const s = this.$refs.spreadsheet;

    const updates = [
      { cell: "A1", value: "New" },
      { cell: "B1", value: "100" },
      { cell: "C1", value: "=A1+B1" }
    ];

    updates.forEach(u => {
      s.updateCell({ value: u.value }, u.cell);
    });
  }
}
```

