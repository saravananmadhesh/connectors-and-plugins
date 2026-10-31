
# Wrap Text API Reference (Vue)

## Overview

The `wrap()` method is used to wrap or unwrap the text content of cells in the Spreadsheet. When text wrapping is enabled, long text content will display as multiple lines within a single cell without expanding the column width.

**API Documentation**: https://ej2.syncfusion.com/vue/documentation/api/spreadsheet/#wrap

## Method Signature

```vue
spreadsheet.wrap(address: string, wrap: boolean): void
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `address` | string | Address of the cell to be wrapped. Supports single cell references (e.g., 'B5') or ranges (e.g., 'A1:D10', 'C:C') |
| `wrap` | boolean | Set `true` to enable text wrapping; set `false` to disable text wrapping |

## Return Value

`void` - This method does not return a value.

## Basic Examples

### Wrap a Single Cell

```vue
<template>
<ejs-spreadsheet
  ref="spreadsheet"
  :allowWrap="true"
  :created="onCreated"
>
  <e-sheets>
    <e-sheet></e-sheet>
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
  onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // Add long text value to B5
    spreadsheet.updateCell(
      {
        value:
          "This is a long descriptive text that should automatically wrap inside the cell when wrapping is enabled."
      },
      "B5"
    );
    // Enable wrap on B5
    spreadsheet.wrap("B5", true);

    
  }
}
};
</script>
```

### Wrap a Range of Cells

```vue
// Enable wrapping on range A1:D10
spreadsheet.wrap('A1:D10', true);

// Disable wrapping on range C1:C10
spreadsheet.wrap('C1:C10', false);
```

### Wrap an Entire Column

```vue
// Enable wrapping on entire column C
spreadsheet.wrap('C:C', true);

// Enable wrapping on entire column A
spreadsheet.wrap('A:A', true);
```

## Interactive Example

```vue
<template>
  <div class="control-section spreadsheet-control">
    <button class="e-btn" @click="applyWrap">Apply wrap</button>
    <button class="e-btn" @click="removeWrap">Remove wrap</button>
    <ejs-spreadsheet
      ref="spreadsheet"
      :allowWrap="true"
    >
      <e-sheets>
        <e-sheet></e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  </div>
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
    applyWrap() {
      // To wrap the cell's text content with the specified address
      this.$refs.spreadsheet.wrap('[CELL_ADDRESS]', true);
    },
    removeWrap() {
      // To unwrap the cell's text content with the specified address
      this.$refs.spreadsheet.wrap('[CELL_ADDRESS]', false);
    }
  }
};
</script>
```

## Common Use Cases

### Enable Wrapping on Multiple Addresses

```vue
// Wrap different ranges at once
this.$refs.spreadsheet.wrap('A1:D1', true);      // Headers
this.$refs.spreadsheet.wrap('B2:B100', true);    // Description column
this.$refs.spreadsheet.wrap('D2:D100', true);    // Notes column
```

### Dynamic Wrapping with Selection

```vue
// Get selected range and apply wrapping
const selectedRange = spreadsheet.ej2Instances.getActiveSheet().selectedRange;
if (selectedRange) {
  spreadsheet.wrap(selectedRange, true);
}
```

## Practical Example: Product Catalog

```vue
<template>
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowWrap="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet>
        <e-ranges>
          <e-range :dataSource="productData"></e-range>
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
  RangeDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent,
    "e-sheets": SheetsDirective,
    "e-sheet": SheetDirective,
    "e-ranges": RangesDirective,
    "e-range": RangeDirective
  },
  data() {
    return {
      productData: [
        {
          productId: 'P001',
          name: 'Product A',
          description: 'This is a long product description that contains detailed information about the product features and benefits.'
        },
        {
          productId: 'P002',
          name: 'Product B',
          description: 'Another product with comprehensive description covering all important aspects and use cases.'
        }
      ]
    };
  },
  methods: {
    onCreated() {
      const spreadsheet = this.$refs.spreadsheet;
      // Apply wrapping to description column (column C)
      spreadsheet.wrap('C:C100', true);

      // Adjust row heights for better readability
      for (let i = 1; i <= this.productData.length; i++) {
        spreadsheet.setRowHeight(50, i);
      }
    }
  }
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CELL_ADDRESS]` | Address of the cell to wrap | `'B5'`, `'A1:D10'`, `'C:C'` |
| `[ENABLE]` | Wrap boolean value | `true`, `false` |

## Related Methods

- `setRowHeight(height, rowIndex)` - Adjust row height for wrapped content
- `setColWidth(width, colIndex)` - Set column width to control wrapping
- `getRowHeight(rowIndex, sheetIndex?)` - Get current row height
- `getSelectedRange()` - Get currently selected cell range

## Best Practices

1. **Pair with Adequate Column Width**
   ```vue
   // Set column width first, then wrap
   spreadsheet.setColWidth(200, 2); // Column C: 200px
   spreadsheet.wrap('C:C', true);
   ```

2. **Adjust Row Height After Wrapping**
   ```vue
   // Enable wrapping
   spreadsheet.wrap('[CELL_ADDRESS]', true);
   
   // Increase row height for wrapped content
   spreadsheet.setRowHeight(50, 1); // Row 2: 50px
   ```

3. **Apply to Specific Columns Only**
   ```vue
   // Wrap text columns only
   spreadsheet.wrap('C:C', true);  // Description
   spreadsheet.wrap('D:D', true);  // Notes
   
   // Don't wrap numeric/ID columns
   spreadsheet.wrap('A:A', false); // ID
   spreadsheet.wrap('B:B', false); // Code
   ```

4. **Use Range Selection for Flexibility**
   ```vue
   // Wrap data rows but not headers
   spreadsheet.wrap('A2:D100', true);
   ```

## Common Pitfalls to Avoid

- **Don't wrap very narrow columns** - Text becomes difficult to read
- **Combine wrapping with row height adjustment** - Wrapped text may be cut off without adequate row height
- **Performance consideration** - Wrapping large datasets may impact performance

## Notes

- Text wrapping preserves formatting when copying cells
- Wrapped content expands automatically during print
- Works with all cell alignments and formatting
- The method applies immediately without requiring refresh
- Address parameter is case-insensitive (e.g., 'b5' and 'B5' are equivalent)
