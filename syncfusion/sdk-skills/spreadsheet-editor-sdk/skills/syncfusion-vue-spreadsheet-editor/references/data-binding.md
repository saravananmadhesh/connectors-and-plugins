# Data Binding

Bind local or remote data to the Spreadsheet Editor — load data into sheets/ranges after initialization.

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet ref="spreadsheet" :created="onCreated">
    <e-sheets>
      <e-sheet :name="Sheet1">
       <e-ranges>
          <e-range :dataSource="salesData"></e-range>
        </e-ranges>
      </e-sheet>
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

import { DataManager, Query, WebApiAdaptor } from "@syncfusion/ej2-data";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective
},

data() {
  return {
    //Bind the data directly in the sheet range's datasource (use this by default);
    salesData: [
      { Month:"Jan", Sales:1200, Profit:450, Expenses:300, Growth:12, Region:"North", UnitsSold:150, AvgPrice:8, Target:1000, Status:"Achieved" },
      { Month:"Feb", Sales:950, Profit:380, Expenses:280, Growth:8, Region:"South", UnitsSold:130, AvgPrice:7, Target:1100, Status:"Pending" },
      { Month:"Mar", Sales:1600, Profit:600, Expenses:350, Growth:15, Region:"East", UnitsSold:200, AvgPrice:8, Target:1500, Status:"Achieved" },
      { Month:"Apr", Sales:780, Profit:240, Expenses:300, Growth:-5, Region:"West", UnitsSold:90, AvgPrice:9, Target:900, Status:"Not Met" },
      { Month:"May", Sales:2100, Profit:820, Expenses:400, Growth:22, Region:"North", UnitsSold:230, AvgPrice:9, Target:1800, Status:"Achieved" }
    ]
  };
},

methods: {
  onCreated() {
    const s = this.$refs.spreadsheet;

    /* === Option 1: Local array of objects === */
    const localData = [
      { Product: "Laptop", Category: "Electronics", Price: 1200, Quantity: 5, Total: "=C2*D2" },
      { Product: "Mouse", Category: "Accessories", Price: 25, Quantity: 20, Total: "=C3*D3" },
      { Product: "Keyboard", Category: "Accessories", Price: 80, Quantity: 10, Total: "=C4*D4" },
      { Product: "Monitor", Category: "Electronics", Price: 350, Quantity: 3, Total: "=C5*D5" }
    ];

    s.ej2Instances.sheets[0].ranges = [{
      dataSource: localData,
      startCell: "A1",
      showFieldAsHeader: true
    }];

    // === Option 2: Remote DataManager (REST API) === 
    const dataManager = new DataManager({
      // SECURITY: Validate URL against allowlist of trusted domains before use
      url: 'url',  // You can utilize your own API endpoint
      adaptor: new WebApiAdaptor()
    });

    const query = new Query()
      .take(50)
      .select(["Product", "Category", "Price", "Quantity"]);

      s.ej2Instances.sheets[0].ranges = [{
      dataSource: dataManager,
      query: query,
      startCell: "A1",
      showFieldAsHeader: true
    }];

    /* === Option 3: 2D Array === */
    const gridData = [
      ["Product", "Price", "Quantity", "Total"],
      ["Laptop", 1200, 5, "=B2*C2"],
      ["Mouse", 25, 20, "=B3*C3"]
    ];

    s.ej2Instances.sheets[0].ranges = [{
      dataSource: gridData,
      startCell: "A1",
      showFieldAsHeader: false
    }];

    //While updating the sheet ranges, we need to invoke the dataBind method and refresh method to refresh the UI with the updated dataSource.
    s.dataBind();
    s.refresh();
  }
}
};
</script>
```
## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[DATA_SOURCE]` | Array of objects or DataManager instance | `[{Name: 'John', Age: 30}]` |
| `[RANGE]` | Cell range where data binds | `'A1:D100'` |
| `[KEY_FIELD]` | Primary key field name | `'id'`, `'productId'` |
| `[FIELDS]` | Column mappings | `{name: 'A', age: 'B', salary: 'C'}` |
| `[START_CELL]` | Starting cell for data | `'A1'`, `'A2'` |

## Notes

- **Best Practice**: Include headers in first row before binding data
- **Best Practice**: Use key field to track records for updates
- **Data Format**: Arrays of objects preferred (column names from object keys)
- **Performance**: Large datasets (100k+ rows) should use virtual scrolling
- **Updates**: Changes in bound data auto-sync to spreadsheet UI

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [DATA_SOURCE] | Array of objects | [{ Name: 'John'}] |
| [RANGE] | Cell range | 'A1:D100' |
| [KEY_FIELD] | Primary key | 'id' |

## Notes
- Best Practice: Include headers
- Data Format: Arrays of objects
