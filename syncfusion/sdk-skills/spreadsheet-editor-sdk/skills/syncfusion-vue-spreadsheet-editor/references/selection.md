# Selection API Reference

## Overview
The Selection API allows you to programmatically select cells or ranges, respond to selection changes via events, and retrieve the active cell address.

## Minimal Vue Code

```vue
<template>
<ejs-spreadsheet
  ref="spreadsheet"
  :selectionSettings="selectionSettings"
  :beforeSelect="beforeSelect"
  :select="onSelect"
  :created="onCreated"
>
  <e-sheets>
    <e-sheet name="Sheet1" />
    <e-sheet name="Sheet2" />
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

data() {
  return {
    // Multiple selection allowed
    selectionSettings: { mode: "Multiple" }
  };
},

methods: {
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;

    // === Select a single cell ===
    spreadsheet.selectRange("B2");

    // === Select a range ===
    spreadsheet.selectRange("A1:D10");

    // === Select cell on another sheet ===
    spreadsheet.selectRange("Sheet2!B5");

    // === Get active cell ===
    console.log("Active cell:", spreadsheet.ej2Instances.getActiveSheet().activeCell);

    // === Get selected range ===
    console.log("Selected range:", spreadsheet.ej2Instances.getActiveSheet().selectedRange);
  },

  // Fired after selection occurs
  onSelect(args) {
    console.log("Selected range:", args.range);
  },

  // Fired before selection; can cancel selection
  beforeSelect(args) {
    if (args.range === "A1") args.cancel = true; // Block selecting A1
  }
}
};
</script>
```

## Key Methods & Properties

### `selectRange(address)`
Selects the specified cell or range. Accepts a single string address only.

**Parameters**:
- `address` (string): Range address — `'A1'`, `'A1:D10'`, or `'SheetName!A1:D10'`

**Returns**: void

```vue
// Single cell
spreadsheet.selectRange('C5');

// Range
spreadsheet.selectRange('B2:F10');

// Cross-sheet (navigates to sheet + selects)
spreadsheet.selectRange('Sheet2!A1');
```

### `getActiveSheet()`
Returns the active `SheetModel`. Use `sheet.activeCell` and `sheet.selectedRange` to read selection.

```vue
const sheet = spreadsheet.getActiveSheet();
console.log('Active cell:', sheet.activeCell);       // e.g. "C5"
console.log('Selected range:', sheet.selectedRange); // e.g. "B2:F10"
```

### `selectionSettings.mode`
Controls selection behaviour.

| Value | Behaviour |
|---|---|
| `'Multiple'` | Default — multi-cell/range selection |
| `'Single'` | Only one cell at a time |
| `'None'` | Selection disabled (read-only appearance) |

## Selection Events

### `select` Event
Fires **after** a cell or range is selected.

**Args** (`SelectEventArgs`):
- `range` (string) — the newly selected range address

```vue
<template>
<ejs-spreadsheet ref="spreadsheet" :select="onSelect">
  <e-sheets>
    <e-sheet name="Sheet1" />
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  // Fires after the user selects a cell or range
  onSelect(args) {
    console.log("Selected:", args.range); // ex: "B2:D5"
    // You can highlight, update UI labels, etc.
  }
}
}
}
</script>
```

### `beforeSelect` Event
Fires **before** a cell or range is selected. Can be cancelled.

**Args** (`BeforeSelectEventArgs`):
- `range` (string) — range about to be selected
- `cancel` (boolean) — set `true` to block the selection

```vue
<template>
  <ejs-spreadsheet
    ref="spreadsheet"
    :beforeSelect="beforeSelect"
  >
    <e-sheets>
      <e-sheet name="Sheet1" />
    </e-sheets>
  </ejs-spreadsheet>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent,
    "e-sheets": SheetsDirective,
    "e-sheet": SheetDirective
  },

  methods: {
    // Fires BEFORE selection happens — can block selection
    beforeSelect(args) {
      if (args.range === "A1") {
        args.cancel = true;  // Prevent selecting A1
      }
    }
  }
};
</script>
```

## Advanced Patterns

### Read Active Cell After Selection

```vue
<template>
<ejs-spreadsheet ref="spreadsheet" :select="onSelect">
  <e-sheets>
    <e-sheet name="Sheet1" />
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

methods: {
  onSelect(args) {
    const spreadsheet = this.$refs.spreadsheet;
    const sheet = spreadsheet.ej2Instances.getActiveSheet();

    console.log("Active cell:", sheet.activeCell);      // ex: "D5"
    console.log("Full range:", sheet.selectedRange);    // ex: "D5:F10"
  }
}
};
</script>

```

### Navigate and Format Selection
```vue
spreadsheet.selectRange('A1:D10');
spreadsheet.cellFormat({ backgroundColor: '#FFFFCC', border: '1px solid #FF0000' }, 'A1:D10');
```

### Build Formula from Active Cell
```vue
const sheet = spreadsheet.ej2Instances.getActiveSheet();
const activeCell = sheet.activeCell;       // e.g. "B5"
const selectedRange = sheet.selectedRange; // e.g. "B5:B20"
spreadsheet.updateCell({ formula: `=SUM(${selectedRange})` }, activeCell);
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click cell | Select single cell |
| Shift+Click | Extend selection |
| Ctrl+Click | Add to selection (multi-range) |
| Ctrl+A | Select all cells |
| Shift+Space | Select entire row |
| Ctrl+Space | Select entire column |
| Arrow Keys | Move selection |
| Ctrl+Shift+End | Select to last used cell |
| Ctrl+Shift+Home | Select to first cell |

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Click | Select single cell |
| Shift + Click | Extend selection |
| Ctrl + Click | Add to multi-selection |
| Ctrl + A | Select all |
| Shift + Space | Select entire row |
| Ctrl + Space | Select entire column |
| Arrow Keys | Move active cell |
| Ctrl + Shift + End | Select to last used cell |

## Notes

- **`selectRange()`** accepts only a **single string** — not an array, not an options object
- **No `getSelectedRange()` method** — use `spreadsheet.getActiveSheet().selectedRange` instead
- **No `getCellAddress()` method on Spreadsheet** — use the helper `getCellAddress(rowIndex, colIndex)` from `'@syncfusion/ej2-spreadsheet'` utilities if needed
- **Cross-sheet selection**: use `'SheetName!A1:D10'` format; this navigates to that sheet and selects the range
- **`selectionSettings.mode: 'None'`** disables all UI selection — useful for display-only views
- **Active Cell**: `sheet.activeCell` holds the last focused cell in the selection

## See Also
- [Cell Formatting](./formatting.md) — Apply styles to selected cells
- [Edit Cell](./edit-cell.md) — Edit selected cells
- [Clipboard](./clipboard.md) — Copy/cut/paste selected range
