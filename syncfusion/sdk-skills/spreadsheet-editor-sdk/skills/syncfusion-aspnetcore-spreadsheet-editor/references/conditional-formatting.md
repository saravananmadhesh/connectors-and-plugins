# Conditional Formatting

Apply rules to automatically format cells based on their values (e.g., highlight negatives in red, top 10% in green, data bars, color scales, icon sets).

## Minimal Code

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@{
    // Maintain data source in a variable
    var salesData = new List<object>()
    {
        new { Month = "Jan", Sales = 35 },
        new { Month = "Feb", Sales = 40 },
        new { Month = "Mar", Sales = 50 }
    };
}
<div class="control-section">
    <ejs-spreadsheet id="spreadsheet" allowConditionalFormat="true" created="onCreated">
        <e-spreadsheet-sheets>
            <e-spreadsheet-sheet name="Sales">
                <e-spreadsheet-ranges>
                    <e-spreadsheet-range dataSource="salesData" startCell="A1"></e-spreadsheet-range>
                </e-spreadsheet-ranges>
            </e-spreadsheet-sheet>
        </e-spreadsheet-sheets>
    </ejs-spreadsheet>
</div>

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Type 1: GreaterThan / LessThan ===
        spreadsheet.conditionalFormat({
            type: 'GreaterThan',
            value: '1000',
            cFColor: 'GreenFT',
            range: 'B2:B100'
        });
        spreadsheet.conditionalFormat({
            type: 'LessThan',
            value: '500',
            cFColor: 'RedFT',
            range: 'B2:B100'
        });

        // === Type 2: Between ===
        spreadsheet.conditionalFormat({
            type: 'Between',
            value: '100,500',
            cFColor: 'BlueFT',
            range: 'D2:D100'
        });

        // === Type 3: AboveAverage ===
        spreadsheet.conditionalFormat({
            type: 'AboveAverage',
            cFColor: 'GreenFT',
            range: 'F2:F100'
        });

        // === Type 4: Top10 ===
        spreadsheet.conditionalFormat({
            type: 'Top10Items',
            value: '10',
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

        // === Type 8: Formula-based ===
        // Highlight cells greater than the average of the range using a preset color
        spreadsheet.conditionalFormat({
            type: 'Formula',
            value: '=H2>AVG(H2:H9)',
            cFColor: 'GreenFT',
            range: 'H2:H9'
        });

        // Highlight cells in H6:H9 that exceed 5000
        spreadsheet.conditionalFormat({
            type: 'Formula',
            value: '=H6>5000',
            cFColor: 'RedT',
            range: 'H6:H9'
        });

        // Formula-based with a custom format instead of a preset cFColor
        spreadsheet.conditionalFormat({
            type: 'Formula',
            value: '=B2>700',
            format: { style: { color: '#ffffff', backgroundColor: '#009999', fontWeight: 'bold' } },
            range: 'B2:B30'
        });

        // === Clear rules ===
        spreadsheet.clearConditionalFormat('E2:E30'); // Clear specific range
        spreadsheet.clearConditionalFormat();         // Clear all rules
    }
</script>

```

## Declarative Formula-based Conditional Format (Tag Helper)

Use `<e-spreadsheet-conditionalformats>` inside the sheet tag helper to define formula-based rules declaratively at initialization:

```cshtml
<e-spreadsheet-conditionalformats>
    <e-spreadsheet-conditionalformat type="GreaterThan" cFColor="RedFT" value="700" range="B2:B9"></e-spreadsheet-conditionalformat>
    <e-spreadsheet-conditionalformat type="Bottom10Items" cFColor="YellowFT" value="4" range="C2:C9"></e-spreadsheet-conditionalformat>
    <e-spreadsheet-conditionalformat type="BlueDataBar" range="D2:D9"></e-spreadsheet-conditionalformat>
    <e-spreadsheet-conditionalformat type="Formula" cFColor="GreenFT" value="=H2>AVG(H2:H9)" range="H2:H9"></e-spreadsheet-conditionalformat>
</e-spreadsheet-conditionalformats>
```

## Placeholders for Conditional Format
 
| Placeholder  | Description                                  | Example                                                             |
|--------------|----------------------------------------------|---------------------------------------------------------------------|
| `[TYPE]`     | Specifies the conditional formatting type    | `'HighlightCell'`, `'TopBottom'`, `'DataBar'`, `'ColorScale'`, `'IconSet'`, `'Formula'` |
| `[VALUE]`    | Specifies the conditional formatting value   | `'string'`                                                          |
| `[CFCOLOR]`  | Specifies the highlight color style          | `'RedFT'`, `'GreenFT'`, `'YellowFT'`                               |
| `[FORMAT]`   | Specifies the format model                   | `'FormatModel'`                                                     |
| `[RANGE]`    | Specifies the conditional formatting range   | `'A1:A10'`, `'Sheet1!A1:A10'`                                       |


## Type Definitions
 
### HighlightCell
```cshtml
type HighlightCell = 'GreaterThan' | 'LessThan' | 'Between' | 'EqualTo' |
  'ContainsText' | 'DateOccur' | 'Duplicate' | 'Unique';
```
 
### TopBottom
```cshtml
type TopBottom = 'Top10Items' | 'Bottom10Items' | 'Top10Percentage' |
  'Bottom10Percentage' | 'BelowAverage' | 'AboveAverage';
```
 
### DataBar
```cshtml
type DataBar = 'BlueDataBar' | 'GreenDataBar' | 'RedDataBar' |
  'OrangeDataBar' | 'LightBlueDataBar' | 'PurpleDataBar';
```
 
### ColorScale
```cshtml
type ColorScale = 'GYRColorScale' | 'RYGColorScale' | 'GWRColorScale' |
  'RWGColorScale' | 'BWRColorScale' | 'RWBColorScale' | 'WRColorScale' |
  'RWColorScale' | 'GWColorScale' | 'WGColorScale' | 'GYColorScale' | 'YGColorScale';
```
 
### IconSet
```cshtml
type IconSet = 'ThreeArrows' | 'ThreeArrowsGray' | 'FourArrowsGray' |
  'FourArrows' | 'FiveArrowsGray' | 'FiveArrows' | 'ThreeTrafficLights1' |
  'ThreeTrafficLights2' | 'ThreeSigns' | 'FourTrafficLights' | 'FourRedToBlack' |
  'ThreeSymbols' | 'ThreeSymbols2' | 'ThreeFlags' | 'FourRating' | 'FiveQuarters' |
  'FiveRating' | 'ThreeTriangles' | 'ThreeStars' | 'FiveBoxes';
```

### Formula-based Conditional Format
```cshtml
type Formula = 'Formula';
```

Formula-based conditional formatting applies custom formatting rules using an Excel formula. When the formula in `value` evaluates to `TRUE` for a cell, the formatting (`cFColor` or custom `format`) is applied to that cell. This enables advanced highlighting scenarios based on values from other cells or ranges in the worksheet, beyond the built-in Highlight Cell/Top Bottom conditions.

```javascript
// Highlight cells in H6:H9 that exceed 5000, referencing the first cell of the range in the formula
spreadsheet.conditionalFormat({ type: 'Formula', value: '=H6>5000', cFColor: 'RedT', range: 'H6:H9' });
```

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
