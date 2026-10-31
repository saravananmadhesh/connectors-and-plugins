# Clipboard Operations

Copy, cut, and paste cells with values, formatting, and formulas in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
  <div class="control-section">
    <div id="spreadsheet-clipboard-section">
      <ejs-spreadsheet
        ref="spreadsheet"
        :created="created"
        :enableClipboard="true"
      >
        <e-sheets>
          <e-sheet :name="Data">
            <e-rows>
              <e-row>
                <e-cells>
                  <e-cell :value="'Source'"></e-cell>
                  <e-cell :value="'100'"></e-cell>
                </e-cells>
              </e-row>
              <e-row>
                <e-cells>
                  <e-cell :value="'Data'"></e-cell>
                  <e-cell :value="'200'"></e-cell>
                </e-cells>
              </e-row>
              <e-row>
                <e-cells>
                  <e-cell :value="''"></e-cell>
                  <e-cell :value="''"></e-cell>
                </e-cells>
              </e-row>
            </e-rows>
          </e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>
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
  CellDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheets': SheetsDirective,
    'e-sheet': SheetDirective,
    'e-rows': RowsDirective,
    'e-row': RowDirective,
    'e-cells': CellsDirective,
    'e-cell': CellDirective,
  },

  methods: {
    created() {
      const spreadsheet = this.$refs.spreadsheet;

      // === Copy Selected Cell ===
      spreadsheet.selectRange('A1:B2');
      spreadsheet.copy().then(function () {
        // === Paste to Active Cell ===
        spreadsheet.selectRange('D1');
        spreadsheet.paste('D1', 'All');
      });

      // === Copy Specific Cell ===
      /*spreadsheet.copy("A1");
      spreadsheet.copy("A1:B2");

      // === Cut Selected Cell ===
      spreadsheet.selectRange("A1:B2");
      spreadsheet.cut();

      // === Cut Specific Cell ===
      spreadsheet.cut("A1");
      spreadsheet.cut("A1:B2");*/

      // === Paste With Specific Type ===
      /*spreadsheet.paste("D1", "Values");
      spreadsheet.paste("D1", "Formats");
      spreadsheet.paste("D1", "Formulas");*/
    },
  },
};
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[SOURCE_RANGE]` | Cell or range to copy/cut | `'A1'`, `'A1:D10'`, `'Sheet1!B2'` |
| `[DEST_CELL]` | Paste destination | `'D1'`, `'E5'` |
| `[PASTE_TYPE]` | Type of paste operation | `'All'`, `'Values'`, `'Formats'`, `'Formulas'` |

## API Methods Reference

### Copy Cell/Range
```vue
spreadsheet.copy();                     // Copy currently selected cell/range
spreadsheet.copy('[SOURCE_RANGE]');     // Copy specific cell or range
// Returns: Promise
```

**Effect**: Copies cell(s) to clipboard buffer. Moving marching ants border around source.

### Cut Cell/Range
```vue
spreadsheet.cut();                      // Cut currently selected cell/range
spreadsheet.cut('[SOURCE_RANGE]');      // Cut specific cell or range
// Returns: Promise
```

**Effect**: Cuts cell(s) to clipboard buffer. Source cells remain until paste completes (dashed border). After paste, source cells are cleared.

### Paste to Cell
```vue
spreadsheet.paste();                    // Paste to active cell (default: 'All' type)
spreadsheet.paste('[DEST_CELL]');       // Paste to specific cell
spreadsheet.paste('[DEST_CELL]', '[PASTE_TYPE]');
// Returns: void
```

**Parameters:**
- `[DEST_CELL]` (optional): Target cell address; if omitted, uses active cell
- `[PASTE_TYPE]` (optional): 'All' | 'Values' | 'Formats' | 'Formulas' (default: 'All')

## Paste Types

| Paste Type | Content Pasted | Example |
|---|---|---|
| `'All'` | Values + formatting + formulas | Font, colors, cell values, formulas |
| `'Values'` | Cell values only | Numbers, text; formulas become values |
| `'Formats'` | Formatting only | Font, colors, borders; no data |
| `'Formulas'` | Formulas only | `=SUM(A1:A5)`; overwrites values |

## Copy/Paste Behavior

### Copy Behavior
- Copies cell(s) to internal clipboard buffer
- Marching ants (moving border) shows source range
- Source cells remain unchanged
- Can paste multiple times from same copy

### Cut Behavior
- Cuts cell(s) to clipboard buffer
- Dashed border shows cut range
- Source cells become empty after paste
- Only one cut operation at a time

### Paste Behavior
- Pastes content to destination starting at specified cell
- Range expansion: if source is `A1:C3` and paste at `F1`, result is `F1:H3` (same dimensions)
- Formulas adjust automatically (relative references update)
- Absolute references (`$A$1`) remain fixed

## Clipboard State

| State | Indicator | Behavior |
|---|---|---|
| Nothing copied | None | Paste does nothing |
| Cell copied | Marching ants | Can paste multiple times |
| Cell cut | Dashed border | Paste clears source |
| After paste | Border cleared | Clipboard buffer remains (can paste again) |
| Escape pressed | Borders cleared | Copy/cut canceled |

## Notes

- **Best Practice**: Use `enableClipboard: true` during initialization (it's default)
- **Best Practice**: `copy()` for non-destructive duplication; `cut()` for move operations
- **Best Practice**: Use `'Values'` paste type to break formula dependencies
- **Best Practice**: Use `'Formats'` paste type to apply styling without overwriting data

- **Performance**: Copying/cutting large ranges (10,000+ cells) may be slow; show spinner
- **Keyboard Shortcut**: Ctrl+C (copy), Ctrl+X (cut), Ctrl+V (paste), Esc (cancel)

## Example: Copy and Paste Values Only

```vue
// Copy a range
spreadsheet.selectRange('A1:D10');
spreadsheet.copy();

// Paste only values (breaks formulas)
spreadsheet.selectRange('F1');
spreadsheet.paste('F1', 'Values');
```

## Example: Cut and Move Cells

```vue
// Cut source range
spreadsheet.selectRange('A1:C5');
spreadsheet.cut();

// Paste to new location (source becomes empty)
spreadsheet.selectRange('G1');
spreadsheet.paste();
```

## Example: Paste Formatting Only

```vue
// Copy formatted cells
spreadsheet.selectRange('A1:D1');
spreadsheet.copy();

// Paste only formatting to data range
spreadsheet.selectRange('A2:D10');
spreadsheet.paste('A2', 'Formats');
// Result: Data in A2:D10 unchanged; formatting from A1:D1 applied
```

## Example: Copy with Error Handling

```vue
methods: {
  safeCopy: function(range) {
    const spreadsheet = this.$refs.spreadsheet;

    try {
      spreadsheet.copy(range).then(() => {
        console.log(`Copied ${range} successfully`);
      });
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }
}

safeCopy('A1:B5');
```

## Example: Batch Copy-Paste Operations

```vue
methods: {
  batchCopyPaste: function() {
    const spreadsheet = this.$refs.spreadsheet;

    const copyRanges = [
      { source: "A1:C5", dest: "F1" },
      { source: "D1:E5", dest: "H1" },
      { source: "G1:G5", dest: "J1" }
    ];

    copyRanges.forEach(op => {
      spreadsheet.copy(op.source).then(() => {
        spreadsheet.paste(op.dest, "All");
      });
    });
  }
}
```

