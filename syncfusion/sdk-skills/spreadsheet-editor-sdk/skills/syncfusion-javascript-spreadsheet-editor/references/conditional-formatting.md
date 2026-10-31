# Conditional Formatting

Apply rules to automatically format cells based on their values (e.g., highlight negatives in red, top 10% in green, data bars, color scales, icon sets).

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

// Initialize spreadsheet with conditional formatting enabled
const spreadsheet: Spreadsheet = new Spreadsheet({
  allowConditionalFormat: true,
  sheets: [{
    name: 'Sales',
    // Rules can also be predefined declaratively via `conditionalFormats` on the sheet model
    conditionalFormats: [
      { type: 'GreaterThan', cFColor: 'RedFT', value: '700', range: 'B2:B9' },
      { type: 'Bottom10Items', cFColor: 'YellowFT', value: '4', range: 'C2:C9' },
      { type: 'BlueDataBar', range: 'D2:D9' },
      { type: 'Formula', cFColor: 'GreenFT', value: '=H2>AVG(H2:H9)', range: 'H2:H9' }
    ]
  }]
});

spreadsheet.appendTo('#spreadsheet');

// Apply blue data bar to the specified range
spreadsheet.conditionalFormat({ type: 'BlueDataBar', range: 'D3:D18' });

// Apply three stars icon set to the specified range
spreadsheet.conditionalFormat({ type: 'ThreeStars', range: 'F3:F18' });

// Highlight cells with a value greater than the specified value
spreadsheet.conditionalFormat({ type: 'GreaterThan', cFColor: 'RedFT', value: '10/15/2023', range: 'E2:E30' });

// Highlight cells with a value between specified range
spreadsheet.conditionalFormat({ type: 'Between', cFColor: 'GreenFT', value: '03/04/2023,06/26/2023', range: 'E2:E30' });

// Highlight cells with a value above average of the specified range
spreadsheet.conditionalFormat({ type: 'AboveAverage', cFColor: 'RedFT', range: 'F2:F30' });

// Apply RYG (Red-Yellow-Green) color scale to the specified range
spreadsheet.conditionalFormat({ type: 'RYGColorScale', range: 'F2:F30' });

// Apply formula-based conditional format: highlight cells greater than the average of the range
spreadsheet.conditionalFormat({ type: 'Formula', cFColor: 'GreenFT', value: '=H2>AVG(H2:H9)', range: 'H2:H9' });

// Apply formula-based conditional format with a custom format instead of a preset cFColor
spreadsheet.conditionalFormat({
  type: 'Formula',
  value: '=B2>700',
  format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold' } },
  range: 'B2:B30'
});

// Clear rules from a specific range
spreadsheet.clearConditionalFormat('E2:E30');

// Clear rules using sheet name in the range
spreadsheet.clearConditionalFormat('Sheet1!F2:F30');

// Clear all rules from the active sheet
spreadsheet.clearConditionalFormat();
```

## Placeholders for Conditional Format

| Placeholder  | Description                                  | Example                                                             |
|--------------|----------------------------------------------|---------------------------------------------------------------------|
| `[TYPE]`     | Specifies the conditional formatting type    | `'HighlightCell'`, `'TopBottom'`, `'DataBar'`, `'ColorScale'`, `'IconSet'`, `'Formula'` |
| `[VALUE]`    | Specifies the conditional formatting value   | `'string'`, `'=H2>AVG(H2:H9)'` (formula expression for `'Formula'` type) |
| `[CFCOLOR]`  | Specifies the highlight color style          | `'RedFT'`, `'GreenFT'`, `'YellowFT'`                               |
| `[FORMAT]`   | Specifies the format model                   | `'FormatModel'`                                                     |
| `[RANGE]`    | Specifies the conditional formatting range   | `'A1:A10'`, `'Sheet1!A1:A10'`                                       |

## Type Definitions

### HighlightCell
```typescript
type HighlightCell = 'GreaterThan' | 'LessThan' | 'Between' | 'EqualTo' |
  'ContainsText' | 'DateOccur' | 'Duplicate' | 'Unique';
```

### TopBottom
```typescript
type TopBottom = 'Top10Items' | 'Bottom10Items' | 'Top10Percentage' |
  'Bottom10Percentage' | 'BelowAverage' | 'AboveAverage';
```

### DataBar
```typescript
type DataBar = 'BlueDataBar' | 'GreenDataBar' | 'RedDataBar' |
  'OrangeDataBar' | 'LightBlueDataBar' | 'PurpleDataBar';
```

### ColorScale
```typescript
type ColorScale = 'GYRColorScale' | 'RYGColorScale' | 'GWRColorScale' |
  'RWGColorScale' | 'BWRColorScale' | 'RWBColorScale' | 'WRColorScale' |
  'RWColorScale' | 'GWColorScale' | 'WGColorScale' | 'GYColorScale' | 'YGColorScale';
```

### IconSet
```typescript
type IconSet = 'ThreeArrows' | 'ThreeArrowsGray' | 'FourArrowsGray' |
  'FourArrows' | 'FiveArrowsGray' | 'FiveArrows' | 'ThreeTrafficLights1' |
  'ThreeTrafficLights2' | 'ThreeSigns' | 'FourTrafficLights' | 'FourRedToBlack' |
  'ThreeSymbols' | 'ThreeSymbols2' | 'ThreeFlags' | 'FourRating' | 'FiveQuarters' |
  'FiveRating' | 'ThreeTriangles' | 'ThreeStars' | 'FiveBoxes';
```

### Formula-based Conditional Format
```typescript
type Formula = 'Formula';
```

Formula-based conditional formatting applies custom formatting rules using an Excel formula. When the formula in `value` evaluates to `TRUE` for a cell, the formatting (`cFColor` or custom `format`) is applied to that cell. This enables advanced highlighting scenarios based on values from other cells or ranges in the worksheet, beyond the built-in Highlight Cell/Top Bottom conditions.

```typescript
// Highlight cells in B2:B30 whose value exceeds a fixed threshold
spreadsheet.conditionalFormat({ type: 'Formula', value: '=B2>700', cFColor: 'RedT', range: 'B2:B30' });

// Highlight cells in H6:H9 that exceed 5000, referencing the first cell of the range in the formula
spreadsheet.conditionalFormat({ type: 'Formula', value: '=H6>5000', cFColor: 'RedT', range: 'H6:H9' });
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