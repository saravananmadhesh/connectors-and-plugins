# Scrolling & Virtualization API Reference

## Overview
Virtualization enables the Spreadsheet to efficiently handle large datasets (100k+ rows) by only rendering visible cells. This significantly improves performance and memory usage.

## Minimal Vue Code

```vue
<template>
  <ejs-spreadsheet
    ref="spreadsheet"
    :scrollSettings="scrollSettings"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Sheet1">
        <e-ranges>
          <e-range :dataSource="localData" />
        </e-ranges>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheets': SheetsDirective,
    'e-sheet': SheetDirective,
    'e-ranges': RangesDirective,
    'e-range': RangeDirective,
  },

  data: () => ({
    // Virtual scrolling enabled (infinite mode)
    scrollSettings: {
      isFinite: false,
      enableVirtualization: true,
    },

    // Dataset
    localData: [
      {
        Product: 'Laptop',
        Category: 'Electronics',
        Price: 1200,
        Quantity: 5,
        Total: '=C2*D2',
      },
      {
        Product: 'Mouse',
        Category: 'Accessories',
        Price: 25,
        Quantity: 20,
        Total: '=C3*D3',
      },
      {
        Product: 'Keyboard',
        Category: 'Accessories',
        Price: 80,
        Quantity: 10,
        Total: '=C4*D4',
      },
      {
        Product: 'Monitor',
        Category: 'Electronics',
        Price: 350,
        Quantity: 3,
        Total: '=C5*D5',
      },
    ],
  }),

  methods: {
    onCreated() {
      const spreadsheet = this.$refs.spreadsheet;
      // Jump to a very large row → tests virtualization
      spreadsheet.goTo('A5000');
    },
  },
};
</script>
```

## Key Methods & Properties

### scrollSettings (Object)
Configuration object for scrolling behavior.

**Properties**:

#### isFinite (boolean)
- Default: `false`
- If `false`: Render the new cells upon scrolling.
- If `true`: Render the cells based on the row and column count. Able to scroll upto the rendered cells.

**Example**:

```vue
<template>
  <ejs-spreadsheet
    ref="spreadsheet"
    :scrollSettings="scrollSettings"
  />
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent
  },

  data: () => ({
    scrollSettings: {
      isFinite: true,
      enableVirtualization: true
    }
  })
};
</script>
```

#### enableVirtualization (boolean)
- Default: `true`
- If `true`: Initially renders cells within the viewport and further rendering the data while scrolling.
- If `false`: Render all the rows and columns at once.


### goTo(cellAddress)
Navigates to and scrolls the specified cell into view.

**Parameters**:
- `cellAddress` (string): Cell address in A1 notation (e.g., 'Z10000')

**Returns**: void

**Example**:
```vue
// Jump to specific cell in large dataset
spreadsheet.goTo('A500000');
spreadsheet.goTo('AA1000000');
spreadsheet.goTo('Sheet2!B50000');

```

## Use Cases

### Jump to Specific cell
```vue
const usedRange = spreadsheet.ej2Instances.getActiveSheet().usedRange;
//Navigate to the last used row of A column.
spreadsheet.goTo(`A${usedRange.rowIndex + 1}`);
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Home | Move towards first column |
| Ctrl+End | Jump to last used cell |
| Page Up | Scroll up one page |
| Page Down | Scroll down one page |
| Ctrl+Up | Jump to top of data |
| Ctrl+Down | Jump to bottom of data |
| Ctrl+Left | Jump to leftmost data |
| Ctrl+Right | Jump to rightmost data |


## Performance Comparison

| Feature | Without Virtualization | With Virtualization |
|---------|------------------------|---------------------|
| 10k rows | 50ms load | 50ms load |
| 100k rows | 500ms load | 60ms load |
| 1M rows | Crash | 80ms load |
| Memory (1M rows) | 500MB+ | 5MB |
| Scroll smoothness (1M rows) | Choppy | Smooth 60fps |

## See Also
- [Frozen Rows/Columns](./freeze-panes) - Combine with virtualization
- [Data Binding](./data-binding) - Remote data for best performance
- [Print](./print) - Print virtualized data
