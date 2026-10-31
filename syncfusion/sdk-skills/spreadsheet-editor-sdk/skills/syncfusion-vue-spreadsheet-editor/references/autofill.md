# Autofill

Automatically fill cell ranges with patterns, series, or copied values using the autofill feature.

## Minimal Code

```vue
<template>
  <div class="control-section">
    <div id="spreadsheet-default-section">
      <ejs-spreadsheet ref="spreadsheet" :created="created" :allowAutoFill="true" :autoFillSettings="autoFillSettings">
      <e-sheets>
      <e-sheet :name="Sheet1">
        <e-rows>
                <e-row>
                    <e-cells>
                        <e-cell :value="1" ></e-cell>
                        <e-cell :value="2" ></e-cell>
                        <e-cell :value="3" ></e-cell>
                    </e-cells>
                </e-row>
                <e-row>
                    <e-cells>
                        <e-cell :value="" ></e-cell>
                        <e-cell :value="" ></e-cell>
                        <e-cell :value="" ></e-cell>
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
import { SpreadsheetComponent, SheetDirective, RowsDirective, RowDirective, SheetsDirective, CellsDirective, CellDirective } from '@syncfusion/ej2-vue-spreadsheet';

export default {
    components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheet': SheetDirective,
    'e-sheets': SheetsDirective,
    'e-row': RowDirective,
    'e-rows': RowsDirective,
    'e-cell': CellDirective,
    'e-cells': CellsDirective
   },  
   data: () => {
    return {
      autoFillSettings: {fillType: 'FillSeries', showFillOptions: true}
    }
  },
  methods: {
    created: function() {
      var spreadsheet = this.$refs.spreadsheet;
       // Fill down (copy first row to second row)
       spreadsheet.autoFill('A2:C2', 'A1:C1', 'Down', 'CopyCells');

       // Fill series (extend 1,2,3 pattern to 1,2,3,4,5)
       spreadsheet.autoFill('D1:F1', 'A1:C1', 'Right', 'FillSeries');
 
       // Fill right (copy A column pattern to B, C columns)
       spreadsheet.autoFill('B1:C5', 'A1:A5', 'Right', 'FillSeries');
    }
  }
}
</script>

```

## Type Definitions

### AutoFillDirection
```ts
type AutoFillDirection = 'Down' | 'Right' | 'Up' | 'Left';
```

### AutoFillType
```ts
type AutoFillType = 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting';
```

## Autofill Settings

### `autoFillSettings` Configuration

Configure autofill behavior using the `autoFillSettings` property.

**Type:** `AutoFillSettingsModel`

**Properties:**
```vue
autoFillSettings: {
  fillType: 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting',
  showFillOptions: boolean
}
```

**Parameters:**
- `fillType` — Type of fill to use by default (see Fill Types below)
- `showFillOptions` — Show/hide fill options menu when user drags fill handle

## Autofill Method

### `autoFill()`

Automatically fill a range with pattern, series, or copied content.

**Signature:**
```vue
autoFill(
  fillRange: string,              // Range to fill INTO
  dataRange?: string,             // Source data range (optional, defaults to adjacent cells)
  direction?: AutoFillDirection,  // Direction: 'Down', 'Right', 'Up', 'Left' (optional)
  fillType?: AutoFillType         // Fill type (optional)
): void
```

**Parameters:**
- `fillRange` — Target range that gets filled
- `dataRange` — Source range with pattern/data (if not provided, uses adjacent cells)
- `direction` — Direction of fill (`'Down'` default for vertical, `'Right'` for horizontal)
- `fillType` — Type of fill (see Fill Types below)

**Example:**
```vue
// Fill A2:A10 using series pattern from A1
spreadsheet.autoFill('A2:A10', 'A1', 'Down', 'FillSeries');

// Fill B1:E1 using series pattern from A1
spreadsheet.autoFill('B1:E1', 'A1', 'Right', 'FillSeries');

// Copy A1:C1 to A2:C2 (duplicate row with values and formatting)
spreadsheet.autoFill('A2:C2', 'A1:C1', 'Down', 'CopyCells');

// Copy values only without formatting
spreadsheet.autoFill('A3:C3', 'A1:C1', 'Down', 'FillWithoutFormatting');

// Copy formatting only
spreadsheet.autoFill('A4:C4', 'A1:C1', 'Down', 'FillFormattingOnly');
```

## Fill Types

### `CopyCells`
Copy cells exactly (both values and formatting).

```vue
// Copy formula/value and formatting
spreadsheet.autoFill('A2:A5', 'A1:A1', 'Down', 'CopyCells');
// Result: A2, A3, A4, A5 contain same value and formatting as A1
```

### `FillSeries`
Continue numeric or date patterns (smart series extension).

```vue
// Numeric series: 1, 2, 3 → continue to 4, 5, 6...
// Setup A1:C1 with 1, 2, 3
spreadsheet.autoFill('D1:F1', 'A1:C1', 'Right', 'FillSeries');
// Result: D1=4, E1=5, F1=6

// Date series: Mon, Tue, Wed → continue to Thu, Fri...
// Setup A1:C1 with dates incrementing by 1 day
spreadsheet.autoFill('D1:F1', 'A1:C1', 'Right', 'FillSeries');
// Result: Dates continue in pattern
```

**Smart Pattern Recognition:**
- **Linear series**: 10, 20, 30 → extends to 40, 50, 60...
- **Date series**: 1/1/2024, 1/2/2024 → extends by 1 day
- **Custom increment**: 5, 10, 15 → recognizes +5 increment
- **Text with numbers**: Jan1, Jan2, Jan3 → Jan4, Jan5...

### `FillFormattingOnly`
Copy formatting but NOT values.

```vue
// Copy formatting (colors, fonts, borders) but keep original values
spreadsheet.autoFill('B1:B5', 'A1:A1', 'Right', 'FillFormattingOnly');
// A1 has red background → B1:B5 get red background, but keep their own values
```

### `FillWithoutFormatting`
Copy values/formulas but NOT formatting.

```vue
// Copy values but not formatting
spreadsheet.autoFill('A2:A5', 'A1:A1', 'Down', 'FillWithoutFormatting');
// A2:A5 contain same value as A1, but with default formatting
```

## Direction Options

### `Down`
Fill vertically downward (from top row to rows below).

```vue
// Extend A1:A3 pattern down to A10
spreadsheet.autoFill('A4:A10', 'A1:A3', 'Down', 'FillSeries');
// Recognizes pattern in A1:A3 and continues it
```

### `Up`
Fill vertically upward (from bottom row to rows above).

```vue
// Fill A1:A3 using pattern from A5:A7
spreadsheet.autoFill('A1:A3', 'A5:A7', 'Up', 'FillSeries');
```

### `Right`
Fill horizontally right (from left column to columns right).

```vue
// Extend A1:C1 pattern to the right (D1:F1)
spreadsheet.autoFill('D1:F1', 'A1:C1', 'Right', 'FillSeries');
```

### `Left`
Fill horizontally left (from right column to columns left).

```vue
// Fill A1:C1 using pattern from D1:F1
spreadsheet.autoFill('A1:C1', 'D1:F1', 'Left', 'FillSeries');
```

## Common Patterns

### Numeric Sequence
Fill cells with incrementing numbers.

```vue
// Setup: A1 = 1
spreadsheet.autoFill('B1:E1', 'A1:A1', 'Right', 'FillSeries');
// Result: A1=1, B1=2, C1=3, D1=4, E1=5

// OR setup with two values to establish pattern
// A1 = 1, B1 = 3 (pattern: +2 increment)
spreadsheet.autoFill('C1:F1', 'A1:B1', 'Right', 'FillSeries');
// Result: A=1, B=3, C=5, D=7, E=9, F=11 (increment by 2)
```

### Date Sequence
Fill cells with incrementing dates.

```vue
// Setup: A1 = 1/1/2024
spreadsheet.autoFill('B1:E1', 'A1:A1', 'Right', 'FillSeries');
// Result: Each cell increments by 1 day

// Setup: A1 = 1/1/2024 (Mon), B1 = 1/2/2024 (Tue)
spreadsheet.autoFill('C1:E1', 'A1:B1', 'Right', 'FillSeries');
// Result: C1 = Wed, D1 = Thu, E1 = Fri
```

### Day/Month Names
Fill cells with day or month names.

```vue
// Setup: A1 = 'Monday'
spreadsheet.autoFill('B1:E1', 'A1:A1', 'Right', 'FillSeries');
// Result: Monday, Tuesday, Wednesday, Thursday, Friday

// Setup: A1 = 'January'
spreadsheet.autoFill('B1:E1', 'A1:A1', 'Right', 'FillSeries');
// Result: January, February, March, April, May
```

### Repeat Pattern
Copy the same values repeatedly.

```vue
// Setup: A1 = 'Q1', B1 = 'Q2', C1 = 'Q3', D1 = 'Q4'
spreadsheet.autoFill('E1:H1', 'A1:D1', 'Right', 'CopyCells');
// Result repeats pattern: Q1, Q2, Q3, Q4, Q1, Q2, Q3, Q4
```

### Copy with Formatting
Extend cell formatting across a range.

```vue
// A1 has formula =SUM(A2:A10) with blue background
spreadsheet.autoFill('B1:C1', 'A1:A1', 'Right', 'CopyCells');
// Result: B1 and C1 have same formula (adjusted: =SUM(B2:B10), =SUM(C2:C10))
//         Plus blue background formatting
```

## Autofill from User Interaction

Users can autofill by dragging the fill handle (small square at cell corner) in the spreadsheet UI.

### Handling Autofill Events

```vue
<template>
  <div class="control-section">
    <div id="spreadsheet-default-section">
      <ejs-spreadsheet
        ref="spreadsheet"
        :actionBegin="actionBeginHandler"
        :actionComplete="actionCompleteHandler"
      >
        <e-sheets>
          <e-sheet :name="Sheet1"> </e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>
  </div>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetDirective,
  RowsDirective,
  RowDirective,
  SheetsDirective,
  CellsDirective,
  CellDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheet': SheetDirective,
    'e-sheets': SheetsDirective
  },
  methods: {
    actionBeginHandler: function (args) {
      if (args.action === 'autofill') {
        console.log('User autofilling...');
        args.cancel = false; // Allow autofill
      }
    },
    actionCompleteHandler: function (args) {
      if (args.action === 'autofill') {
        console.log('Autofill completed');
      }
    }
  }
};
</script>
```

## Advanced Examples

### Series with Custom Increment

```vue
// Setup: A1 = 10, B1 = 15 (increment is +5)
spreadsheet.autoFill('C1:F1', 'A1:B1', 'Right', 'FillSeries');
// Result: 10, 15, 20, 25, 30, 35 (pattern continues with +5)
```

### Formula Autofill

```vue
// A1 has formula =B1*2
// Fill down to copy formula with relative references
spreadsheet.autoFill('A2:A5', 'A1:A1', 'Down', 'CopyCells');
// Result:
// A1: =B1*2
// A2: =B2*2
// A3: =B3*2
// A4: =B4*2
// A5: =B5*2
// (References adjust automatically)
```

### Conditional Autofill

```vue
<template>
  <div class="control-section">
    <div id="spreadsheet-default-section">
      <ejs-spreadsheet
        ref="spreadsheet"
        :created="created"
      >
        <e-sheets>
          <e-sheet :name="Sheet1">
          <e-rows>
          <e-cells><e-cell :value="1"><e-cells></e-cells></e-rows></e-sheet>
        </e-sheets>
      </ejs-spreadsheet>
    </div>
  </div>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetDirective,
  RowsDirective,
  RowDirective,
  SheetsDirective,
  CellsDirective,
  CellDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheet': SheetDirective,
    'e-sheets': SheetsDirective,
    'e-row': RowDirective,
    'e-rows': RowsDirective,
    'e-cell': CellDirective,
    'e-cells': CellsDirective
  },
  methods: {
    created: function () {
      // Only autofill if source has data
      var spreadsheet = this.$refs.spreadsheet;
      var sourceCell = spreadsheet.ej2Instances.sheets[0].rows[0].cells[0].value;
      if (sourceCell) {
        spreadsheet.autoFill('A2:A10', 'A1:A1', 'Down', 'FillSeries');
      }
    }
  }
};
</script>

```

### Autofill Multiple Ranges

```vue
spreadsheet.created = function () {
  // Fill down column A
  spreadsheet.autoFill('A2:A10', 'A1:A1', 'Down', 'FillSeries');

  // Fill right row 1
  spreadsheet.autoFill('B1:D1', 'A1:A1', 'Right', 'FillSeries');

  // Fill a 2D range
  spreadsheet.autoFill('B2:D10', 'A1:A10', 'Right', 'CopyCells');
};
```

## Limitations

- **Autofill requires pattern**: FillSeries needs at least 1-2 cells to detect pattern
- **Complex patterns**: Very complex custom patterns may not be recognized; use CopyCells instead
- **Performance**: Autofilling 10,000+ cells may cause lag; consider batching
- **Circular references**: Autofilling formulas that create circular references will fail

## Notes

- **Best Practice**: Use FillSeries for numeric/date patterns
- **Best Practice**: Use CopyCells for exact duplication
- **Best Practice**: Preview autofill result before applying to large ranges
