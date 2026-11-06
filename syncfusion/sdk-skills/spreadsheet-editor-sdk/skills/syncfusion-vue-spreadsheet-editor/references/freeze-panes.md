
# Freeze Panes — Syncfusion Vue Spreadsheet

Freeze Panes keeps specific rows and columns visible while scrolling. Vue Spreadsheet supports freezing through:

- Sheet properties → `frozenRows`, `frozenColumns`
- Programmatic API → `freezePanes(row, column)`

Vue Spreadsheet **does not support** freezing by sheet name or index (only active sheet can be frozen).

## Minimal Vue Example

```vue
<template>
  <ejs-spreadsheet ref="spreadsheet" :created="onCreated">
    <e-sheets>
      <e-sheet
        name="SalesData"
        :frozenRows="2"
        :frozenColumns="2"
      >
        <e-columns>
          <e-column :width="180" />
          <e-column :width="180" />
          <e-column :width="180" />
          <e-column :width="180" />
        </e-columns>
      </e-sheet>
    </e-sheets>
  </ejs-spreadsheet>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
  components: {
    "ejs-spreadsheet": SpreadsheetComponent,
    "e-sheets": SheetsDirective,
    "e-sheet": SheetDirective,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  methods: {
    onCreated() {
      const spreadsheet = this.$refs.spreadsheet;
      // Freeze first 2 rows & 2 columns
      spreadsheet.freezePanes(2, 2);
    }
  }
};
</script>
```

## 1. Freezing During Initialization

```vue
<e-sheet name="Data" :frozenRows="2" :frozenColumns="1" />
```

## 2. Programmatic Freeze (Active Sheet Only)

```vue
spreadsheet.freezePanes(2, 2);   // Freeze 2 rows & 2 columns
spreadsheet.freezePanes(1, 1);   // Default Excel-like freeze
spreadsheet.freezePanes(0, 0);   // Unfreeze all
```

## 3. Update Freeze After Initialization

```vue
const sheet = spreadsheet.ej2Instances.sheets[0];
sheet.frozenRows = 1;
sheet.frozenColumns = 2;
spreadsheet.dataBind();
spreadsheet.refresh();
```

## 4. Get Freeze Settings

```vue
const sheet = spreadsheet.ej2Instances.sheets[0];
console.log(sheet.frozenRows, sheet.frozenColumns);
```

## 5. Common Freeze Scenarios

### Freeze Header Row Only
```vue
<e-sheet :frozenRows="1" :frozenColumns="0" />
```

### Freeze First Column Only
```vue
<e-sheet :frozenRows="0" :frozenColumns="1" />
```

### Freeze Header + First Column
```vue
<e-sheet :frozenRows="1" :frozenColumns="1" />
```

### Freeze Multiple Rows (Reports)
```vue
spreadsheet.freezePanes(3, 1);    // 3 rows, 1 column
```

### Freeze First Two Columns
```vue
spreadsheet.freezePanes(1, 2);
```

## 6. Unfreeze panes

```vue
// spreadsheet.unfreezePanes(sheetIndex or sheetname);
spreadsheet.unfreezePanes(1); // Unfreeze the rows and columns in second sheet
spreadsheet.unfreezePanes(); // Unfreeze the rows and columns in active sheet
```

Or:
```vue
spreadsheet.ej2Instances.sheets[0].frozenRows = 0;
spreadsheet.ej2Instances.sheets[0].frozenColumns = 0;
spreadsheet.dataBind();
spreadsheet.refresh();
```

## 7. UI Ribbon Freeze

Vue Spreadsheet UI includes:
- Freeze Panes
- Freeze Rows
- Freeze Columns


## 8. Limitations

- Freeze applies **only to active sheet** programmatically.
- Cannot freeze across merged cells.
- Must unfreeze fully before applying new freeze.
- Images/charts in frozen area may overlap when scrolling.

## 9. Use Cases

### Financial Reports
```vue
spreadsheet.freezePanes(3, 2);
```

### Large Data Scrolling
```vue
<e-sheet :frozenRows="1" :frozenColumns="1" />
```

### Matrix/Grid Data
```vue
spreadsheet.freezePanes(1, 1);
```

## Best Practices

- Freeze only necessary rows/columns.
- Set freeze during initialization for better layout stability.
- Provide adequate width for frozen columns.
- Validate both horizontal & vertical scrolling experience.
- With virtualization, keep frozen area small.

