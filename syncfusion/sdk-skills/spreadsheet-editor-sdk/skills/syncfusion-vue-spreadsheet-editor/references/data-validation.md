# Data Validation in Spreadsheet Editor

Apply rules to restrict or validate the type of data entered into cells (e.g., whole numbers, lists, dates, custom formulas).

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowDataValidation="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet :name="Orders">
        <e-ranges>
          <e-range :dataSource="ordersData" />
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
    ordersData: [
      { OrderID: 101, Quantity: 15, Status: "Pending", OrderDate: "01/10/2024" },
      { OrderID: 102, Quantity: 87, Status: "Shipped", OrderDate: "02/15/2024" },
      { OrderID: 103, Quantity: 42, Status: "Delivered", OrderDate: "03/05/2024" },
      { OrderID: 104, Quantity: 5,  Status: "Pending", OrderDate: "04/18/2024" },
      { OrderID: 105, Quantity: 99, Status: "Shipped", OrderDate: "05/22/2024" },
      { OrderID: 106, Quantity: 18, Status: "Delivered", OrderDate: "06/12/2024" },
      { OrderID: 107, Quantity: 74, Status: "Pending", OrderDate: "07/01/2024" },
      { OrderID: 108, Quantity: 33, Status: "Shipped", OrderDate: "08/09/2024" },
      { OrderID: 109, Quantity: 12, Status: "Delivered", OrderDate: "09/14/2024" },
      { OrderID: 110, Quantity: 68, Status: "Pending", OrderDate: "10/03/2024" },
      { OrderID: 111, Quantity: 25, Status: "Delivered", OrderDate: "11/18/2024" },
      { OrderID: 112, Quantity: 55, Status: "Shipped", OrderDate: "12/29/2024" },
      { OrderID: 113, Quantity: 30, Status: "Pending", OrderDate: "01/08/2025" },
      { OrderID: 114, Quantity: 44, Status: "Shipped", OrderDate: "02/14/2025" },
      { OrderID: 115, Quantity: 90, Status: "Delivered", OrderDate: "03/21/2025" },
      { OrderID: 116, Quantity: 63, Status: "Pending", OrderDate: "04/05/2025" },
      { OrderID: 117, Quantity: 27, Status: "Shipped", OrderDate: "05/20/2025" },
      { OrderID: 118, Quantity: 80, Status: "Delivered", OrderDate: "06/27/2025" },
      { OrderID: 119, Quantity: 48, Status: "Pending", OrderDate: "07/13/2025" },
      { OrderID: 120, Quantity: 10, Status: "Delivered", OrderDate: "08/01/2025" }
    ]
  };
},

methods: {
  onCreated() {
    const s = this.$refs.spreadsheet;

    // Whole number validation
    s.addDataValidation(
      { type:"WholeNumber", operator:"Between", value1:"1", value2:"100", ignoreBlank:true },
      "B2:B50"
    );

    // List dropdown
    s.addDataValidation(
      { type:"List", value1:"Pending,Shipped,Delivered", inCellDropDown:true },
      "C2:C50"
    );

    // Date validation
    s.addDataValidation(
      { type:"Date", operator:"GreaterThan", value1:"01/01/2024" },
      "D2:D50"
    );

    // Custom formula
    s.addDataValidation(
      { type:"Custom", value1:"=AND(ISNUMBER(A2),A2>0)" },
      "A2:A50"
    );
  }
}
};
</script>
```

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [RANGE] | Cell range to validate | 'B2:B100' |
| [CRITERIA] | Validation rule type | 'List', 'Whole', 'Decimal' |
| [VALUE1] | First constraint | 100 or ['A','B','C'] |
| [VALUE2] | Second constraint | 500 |
| [METHOD] | Data validation method | 'addDataValidation', 'removeDataValidation' |
| [HIGHLIGHT_METHOD] | Highlight method | 'addInvalidHighlight', 'removeInvalidHighlight' |

## Valid Properties for addDataValidation() method
 
The `addDataValidation()` method supports only these properties:
 
| Property | Type | Description | Example |
|---|---|---|---|
| `type` | ValidationType | Validation type | 'WholeNumber', 'Decimal', 'TextLength', 'Time',  'List', 'Date', 'Custom' |
| `operator` | ValidationOperator | Comparison operator | 'Between', 'GreaterThan', 'LessThan', 'Equal' |
| `value1` | string | Primary constraint value | '1' or 'Pending,Shipped,Delivered' |
| `value2` | string | Secondary constraint (for ranges) | '100' |
| `ignoreBlank` | boolean | Skip validation for empty cells | true, false |
| `inCellDropDown` | boolean | Show dropdown for List type | true, false |
| `isHighlighted ` | boolean | Specifies to allow Highlight Invalid Data | true, false |
| `range ` | string | Specifies the range that needs to be add validation | 'A2:A10' |

## Notes
- Criteria Types: List, WholeNumber, TextLength, Decimal, Date, Time, Custom
- Validation: Client-side, does not prevent paste
- List with 256+ items may not display in dropdown
