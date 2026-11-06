# Conditional Formatting

Apply rules to automatically format cells based on their values (e.g., highlight negatives in red, top 10% in green, data bars, color scales, icon sets).

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    const dataSource = [
      { Month: 'Jan', Sales: 35 },
      { Month: 'Feb', Sales: 40 },
      { Month: 'Mar', Sales: 50 }
    ];
    //Bind created event to perform the action during initial load.
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Type 1: GreaterThan / LessThan / EqualTo ===
      spreadsheet.conditionalFormat({
        type: 'GreaterThan',
        value: '1000',
        cFColor: 'GreenFT', // built-in color style
        range: 'B2:B100'
      });

      spreadsheet.conditionalFormat({
        type: 'LessThan',
        value: '500',
        cFColor: 'RedFT',
        range: 'B2:B100'
      });

      // === Type 2: Between / NotEqualTo ===
      spreadsheet.conditionalFormat({
        type: 'Between',
        value: '100,500', // comma-separated min,max
        cFColor: 'GreenFT',
        range: 'D2:D100'
      });

      // === Type 3: AboveAverage / BelowAverage ===
      spreadsheet.conditionalFormat({
        type: 'AboveAverage',
        cFColor: 'GreenFT',
        range: 'F2:F100'
      });

      // === Type 4: Top10 / Bottom10 ===
      spreadsheet.conditionalFormat({
        type: 'Top10Items',
        value: '10', // number of items
        cFColor: 'GreenFT',
        range: 'G2:G100'
      });

      // === Type 5: Color Scale ===
      spreadsheet.conditionalFormat({
        type: 'RYGColorScale',
        range: 'H2:H100'
      });

      // === Type 6: Icon Sets ===
      spreadsheet.conditionalFormat({
        type: 'ThreeTrafficLights1',
        range: 'I2:I100'
      });

      // === Type 7: Data Bars ===
      spreadsheet.conditionalFormat({
        type: 'BlueDataBar',
        range: 'J2:J100'
      });

      // === Type 8: Formula-based Conditional Formatting ===
      spreadsheet.conditionalFormat({
        type: 'Formula',
        cFColor: 'GreenFT',
        value: '=H2>AVG(H2:H9)',
        range: 'H2:H9'
      });

      // Formula rule with custom formatting
      spreadsheet.conditionalFormat({
        type: 'Formula',
        value: '=B2>700',
        format: {
          style: {
            color: '#ffffff',
            backgroundColor: '#009999',
            fontWeight: 'bold'
          }
        },
        range: 'B2:B30'
      });

      // Clear rules using sheet name in range
      spreadsheet.clearConditionalFormat(
        'Sheet1!F2:F30'
      );

      // Clear rules from a specific range
      spreadsheet.clearConditionalFormat('E2:E30');

      // Clear all rules from the active sheet
      spreadsheet.clearConditionalFormat();
    }
    return (<SpreadsheetComponent ref={spreadsheetRef} allowConditionalFormat={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Sales">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

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
```tsx
type HighlightCell = 'GreaterThan' | 'LessThan' | 'Between' | 'EqualTo' |
  'ContainsText' | 'DateOccur' | 'Duplicate' | 'Unique';
```
 
### TopBottom
```tsx
type TopBottom = 'Top10Items' | 'Bottom10Items' | 'Top10Percentage' |
  'Bottom10Percentage' | 'BelowAverage' | 'AboveAverage';
```
 
### DataBar
```tsx
type DataBar = 'BlueDataBar' | 'GreenDataBar' | 'RedDataBar' |
  'OrangeDataBar' | 'LightBlueDataBar' | 'PurpleDataBar';
```
 
### ColorScale
```tsx
type ColorScale = 'GYRColorScale' | 'RYGColorScale' | 'GWRColorScale' |
  'RWGColorScale' | 'BWRColorScale' | 'RWBColorScale' | 'WRColorScale' |
  'RWColorScale' | 'GWColorScale' | 'WGColorScale' | 'GYColorScale' | 'YGColorScale';
```
 
### IconSet
```tsx
type IconSet = 'ThreeArrows' | 'ThreeArrowsGray' | 'FourArrowsGray' |
  'FourArrows' | 'FiveArrowsGray' | 'FiveArrows' | 'ThreeTrafficLights1' |
  'ThreeTrafficLights2' | 'ThreeSigns' | 'FourTrafficLights' | 'FourRedToBlack' |
  'ThreeSymbols' | 'ThreeSymbols2' | 'ThreeFlags' | 'FourRating' | 'FiveQuarters' |
  'FiveRating' | 'ThreeTriangles' | 'ThreeStars' | 'FiveBoxes';
```

### Formula-based Conditional Format
```tsx
type Formula = 'Formula';
```

Formula-based conditional formatting applies custom formatting rules using an Excel formula. When the formula in value evaluates to TRUE for a cell, the formatting (cFColor or custom format) is applied to that cell.

This enables advanced highlighting scenarios based on values from other cells or ranges in the worksheet, beyond the built-in Highlight Cell and Top Bottom conditions.

```tsx
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