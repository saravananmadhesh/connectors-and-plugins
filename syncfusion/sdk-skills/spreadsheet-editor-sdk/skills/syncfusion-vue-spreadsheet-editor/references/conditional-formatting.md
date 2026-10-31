# Conditional Formatting

Apply rules to automatically format cells based on their values (e.g., highlight negatives in red, top 10% in green, data bars, color scales, icon sets).

## Minimal Code

```vue
<template>
<div class="control-section">
  <ejs-spreadsheet
    ref="spreadsheet"
    :allowConditionalFormat="true"
    :created="onCreated"
  >
    <e-sheets>
      <e-sheet name="Sales">
        <e-ranges>
          <e-range :dataSource="salesData" />
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
      salesData: [
        { Month:"Jan", Sales:1200, Profit:450, Expenses:300, Growth:12, Region:"North", UnitsSold:150, AvgPrice:8, Target:1000, Status:"Achieved" },
        { Month:"Feb", Sales:950, Profit:380, Expenses:280, Growth:8, Region:"South", UnitsSold:130, AvgPrice:7, Target:1100, Status:"Pending" },
        { Month:"Mar", Sales:1600, Profit:600, Expenses:350, Growth:15, Region:"East", UnitsSold:200, AvgPrice:8, Target:1500, Status:"Achieved" },
        { Month:"Apr", Sales:780, Profit:240, Expenses:300, Growth:-5, Region:"West", UnitsSold:90, AvgPrice:9, Target:900, Status:"Not Met" },
        { Month:"May", Sales:2100, Profit:820, Expenses:400, Growth:22, Region:"North", UnitsSold:230, AvgPrice:9, Target:1800, Status:"Achieved" },
        { Month:"Jun", Sales:1300, Profit:480, Expenses:330, Growth:10, Region:"South", UnitsSold:140, AvgPrice:9, Target:1200, Status:"Achieved" },
        { Month:"Jul", Sales:1750, Profit:690, Expenses:360, Growth:18, Region:"East", UnitsSold:210, AvgPrice:8, Target:1600, Status:"Achieved" },
        { Month:"Aug", Sales:1450, Profit:550, Expenses:320, Growth:14, Region:"West", UnitsSold:165, AvgPrice:8, Target:1400, Status:"Achieved" },
        { Month:"Sep", Sales:900, Profit:310, Expenses:260, Growth:-2, Region:"North", UnitsSold:115, AvgPrice:7, Target:1000, Status:"Not Met" },
        { Month:"Oct", Sales:2250, Profit:900, Expenses:420, Growth:25, Region:"South", UnitsSold:260, AvgPrice:9, Target:2000, Status:"Achieved" },
        { Month:"Nov", Sales:1650, Profit:720, Expenses:350, Growth:17, Region:"East", UnitsSold:195, AvgPrice:8, Target:1500, Status:"Achieved" },
        { Month:"Dec", Sales:1400, Profit:500, Expenses:300, Growth:9, Region:"West", UnitsSold:160, AvgPrice:9, Target:1300, Status:"Achieved" },
        { Month:"Extra1", Sales:3000, Profit:1200, Expenses:600, Growth:35, Region:"North", UnitsSold:320, AvgPrice:10, Target:2500, Status:"Achieved" },
        { Month:"Extra2", Sales:600, Profit:180, Expenses:250, Growth:-12, Region:"South", UnitsSold:75, AvgPrice:8, Target:900, Status:"Not Met" },
        { Month:"Extra3", Sales:4200, Profit:1800, Expenses:700, Growth:42, Region:"East", UnitsSold:400, AvgPrice:10, Target:3500, Status:"Achieved" },
        { Month:"Extra4", Sales:350, Profit:90, Expenses:180, Growth:-22, Region:"West", UnitsSold:45, AvgPrice:7, Target:800, Status:"Not Met" },
        { Month:"Extra5", Sales:2600, Profit:950, Expenses:500, Growth:28, Region:"North", UnitsSold:280, AvgPrice:9, Target:2200, Status:"Achieved" },
        { Month:"Extra6", Sales:800, Profit:250, Expenses:270, Growth:-8, Region:"South", UnitsSold:95, AvgPrice:8, Target:1000, Status:"Pending" },
        { Month:"Extra7", Sales:3100, Profit:1100, Expenses:590, Growth:33, Region:"East", UnitsSold:330, AvgPrice:9, Target:2700, Status:"Achieved" },
        { Month:"Extra8", Sales:500, Profit:150, Expenses:220, Growth:-15, Region:"West", UnitsSold:60, AvgPrice:8, Target:900, Status:"Not Met" }
      ]
    };
  },

  methods: {
    onCreated() {

      const spreadsheet = this.$refs.spreadsheet;

      // Highlight Cells
      spreadsheet.conditionalFormat({
        type: "GreaterThan",
        value: "1000",
        cFColor: "GreenFT",
        range: "B2:B21"
      });

      spreadsheet.conditionalFormat({
        type: "LessThan",
        value: "500",
        cFColor: "RedFT",
        range: "C2:C21"
      });

      // Top / Bottom
      spreadsheet.conditionalFormat({
        type: "Top10Items",
        value: "10",
        cFColor: "GreenFT",
        range: "G2:G21"
      });

      spreadsheet.conditionalFormat({
        type: "AboveAverage",
        cFColor: "GreenFT",
        range: "F2:F21"
      });

      // Color Scale
      spreadsheet.conditionalFormat({
        type: "RYGColorScale",
        range: "H2:H21"
      });

      // Icon Set
      spreadsheet.conditionalFormat({
        type: "ThreeArrows",
        range: "I2:I21"
      });

      // Data Bar
      spreadsheet.conditionalFormat({
        type: "BlueDataBar",
        range: "D2:D21"
      });

      // Formula-based Conditional Formatting
      spreadsheet.conditionalFormat({
        type: "Formula",
        cFColor: "GreenFT",
        value: "=H2>AVG(H2:H9)",
        range: "H2:H9"
      });

      // Formula rule with custom formatting
      spreadsheet.conditionalFormat({
        type: "Formula",
        value: "=B2>700",
        format: {
          style: {
            color: "#ffffff",
            backgroundColor: "#009999",
            fontWeight: "bold"
          }
        },
        range: "B2:B30"
      });

      // Clear rules from a specific range
      spreadsheet.clearConditionalFormat("E2:E30");

      // Clear rules using sheet name in range
      spreadsheet.clearConditionalFormat(
        "Sheet1!F2:F30"
      );

      // Clear all conditional formatting
      spreadsheet.clearConditionalFormat();
    }
  }
};
</script>
```

## Placeholders for Conditional Format
 
| Placeholder  | Description                                  | Example                                                             |
|--------------|----------------------------------------------|---------------------------------------------------------------------|
| `[TYPE]` | Specifies the conditional formatting type | `'HighlightCell'`, `'TopBottom'`, `'DataBar'`, `'ColorScale'`, `'IconSet'`, `'Formula'` |
| `[VALUE]` | Specifies the conditional formatting value | `'string'`, `'=H2>AVG(H2:H9)'` (formula expression for `'Formula'` type) |
| `[CFCOLOR]`  | Specifies the highlight color style          | `'RedFT'`, `'GreenFT'`, `'YellowFT'`                               |
| `[FORMAT]`   | Specifies the format model                   | `'FormatModel'`                                                     |
| `[RANGE]`    | Specifies the conditional formatting range   | `'A1:A10'`, `'Sheet1!A1:A10'`                                       |


## Type Definitions
 
### HighlightCell
```ts
type HighlightCell = 'GreaterThan' | 'LessThan' | 'Between' | 'EqualTo' |
  'ContainsText' | 'DateOccur' | 'Duplicate' | 'Unique';
```
 
### TopBottom
```ts
type TopBottom = 'Top10Items' | 'Bottom10Items' | 'Top10Percentage' |
  'Bottom10Percentage' | 'BelowAverage' | 'AboveAverage';
```
 
### DataBar
```ts
type DataBar = 'BlueDataBar' | 'GreenDataBar' | 'RedDataBar' |
  'OrangeDataBar' | 'LightBlueDataBar' | 'PurpleDataBar';
```
 
### ColorScale
```ts
type ColorScale = 'GYRColorScale' | 'RYGColorScale' | 'GWRColorScale' |
  'RWGColorScale' | 'BWRColorScale' | 'RWBColorScale' | 'WRColorScale' |
  'RWColorScale' | 'GWColorScale' | 'WGColorScale' | 'GYColorScale' | 'YGColorScale';
```
 
### IconSet
```ts
type IconSet = 'ThreeArrows' | 'ThreeArrowsGray' | 'FourArrowsGray' |
  'FourArrows' | 'FiveArrowsGray' | 'FiveArrows' | 'ThreeTrafficLights1' |
  'ThreeTrafficLights2' | 'ThreeSigns' | 'FourTrafficLights' | 'FourRedToBlack' |
  'ThreeSymbols' | 'ThreeSymbols2' | 'ThreeFlags' | 'FourRating' | 'FiveQuarters' |
  'FiveRating' | 'ThreeTriangles' | 'ThreeStars' | 'FiveBoxes';
```

### Formula-based Conditional Format
```ts
type Formula = 'Formula';
```

Formula-based conditional formatting applies custom formatting rules using an Excel formula. When the formula in `value` evaluates to `TRUE` for a cell, the formatting (`cFColor` or custom `format`) is applied to that cell.

This enables advanced highlighting scenarios based on values from other cells or ranges in the worksheet, beyond the built-in Highlight Cell and Top Bottom conditions.

```vue
// Highlight cells in B2:B30 whose value exceeds a fixed threshold
spreadsheet.conditionalFormat({
  type: 'Formula',
  value: '=B2>700',
  cFColor: 'RedT',
  range: 'B2:B30'
});

// Highlight cells in H6:H9 that exceed 5000
spreadsheet.conditionalFormat({
  type: 'Formula',
  value: '=H6>5000',
  cFColor: 'RedT',
  range: 'H6:H9'
});
```

> The formula should reference the top-left cell of the applied `range` (similar to Excel), and the relative reference is evaluated for each cell within the range.

## Color Format Values (`cFColor`)
 
The `cFColor` property specifies the fill and text color using built-in Syncfusion styles.
 
| Value         | Description              |
|---------------|--------------------------|
| `'RedFT'`     | Red fill, text           |
| `'YellowFT'`  | Yellow fill, text        |
| `'GreenFT'`   | Green fill, text         |
| `'RedF'`      | Red fill only            |
| `'RedT'`      | Red text only            |
 
## FormatModel
 
Interface for a class Format used in conditional formatting.
 
| Property    | Description                        | Example        |
|-------------|------------------------------------|----------------|
| `format`    | Specifies the number format        | `'$#,##0.00'`  |
| `isLocked`  | Specifies if the cell is locked    | `true`/`false` |
| `style`     | Specifies the cell style           | `StyleModel`   |

## Notes

- Formula-based rules support both the preset `cFColor` styles and a custom `format` (cell style) object.
- Insert/delete of rows or columns within a conditionally formatted range is not supported.
- Copy/paste of cells that have conditional formatting applied is not supported.