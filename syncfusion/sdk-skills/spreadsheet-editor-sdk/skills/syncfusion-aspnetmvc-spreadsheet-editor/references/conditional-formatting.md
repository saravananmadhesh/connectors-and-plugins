# Conditional Formatting

Apply rules to automatically format cells based on their values (e.g., highlight negatives in red, top 10% in green, data bars, color scales, icon sets).

## Minimal Code

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@{
    var salesData = new List<object>()
    {
        new { Month = "Jan", Sales = 35 },
        new { Month = "Feb", Sales = 40 },
        new { Month = "Mar", Sales = 50 }
    };
}

@Html.EJS().Spreadsheet("spreadsheet")
    .AllowConditionalFormat(true)
    .Created("onCreated")
    .Sheets(sheet =>
    {
        sheet.Name("Sales")
            .Ranges(ranges =>
            {
                ranges.DataSource(salesData)
                      .StartCell("A1")
                      .Add();
            })
            .ConditionalFormats(cf =>
            {
                cf.Type("GreaterThan")
                  .CFColor("RedFT")
                  .Value("700")
                  .Range("B2:B9")
                  .Add();

                cf.Type("Bottom10Items")
                  .CFColor("YellowFT")
                  .Value("4")
                  .Range("C2:C9")
                  .Add();

                cf.Type("BlueDataBar")
                  .Range("D2:D9")
                  .Add();

                cf.Type("Formula")
                  .CFColor("GreenFT")
                  .Value("=H2>AVG(H2:H9)")
                  .Range("H2:H9")
                  .Add();
            })
            .Add();
    })
    .Render()

<script>

    function onCreated() {

        var spreadsheet =
            document.getElementById("spreadsheet")
                .ej2_instances[0];

        // Highlight Cells

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

        spreadsheet.conditionalFormat({
            type: 'Between',
            value: '100,500',
            cFColor: 'GreenFT',
            range: 'D2:D100'
        });

        // Top / Bottom

        spreadsheet.conditionalFormat({
            type: 'AboveAverage',
            cFColor: 'GreenFT',
            range: 'F2:F100'
        });

        spreadsheet.conditionalFormat({
            type: 'Top10Items',
            value: '10',
            cFColor: 'GreenFT',
            range: 'G2:G100'
        });

        // Color Scale

        spreadsheet.conditionalFormat({
            type: 'RYGColorScale',
            range: 'H2:H100'
        });

        // Icon Set

        spreadsheet.conditionalFormat({
            type: 'ThreeTrafficLights1',
            range: 'I2:I100'
        });

        // Data Bar

        spreadsheet.conditionalFormat({
            type: 'BlueDataBar',
            range: 'J2:J100'
        });

        // Formula-based Conditional Formatting

        spreadsheet.conditionalFormat({
            type: 'Formula',
            cFColor: 'GreenFT',
            value: '=H2>AVG(H2:H9)',
            range: 'H2:H9'
        });

        // Formula rule with custom format

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

        // Clear rules from a specific range

        spreadsheet.clearConditionalFormat(
            'E2:E30'
        );

        // Clear rules using sheet name in range

        spreadsheet.clearConditionalFormat(
            'Sheet1!F2:F30'
        );

        // Clear all rules

        spreadsheet.clearConditionalFormat();
    }

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

Formula-based conditional formatting applies custom formatting rules using an Excel formula. When the formula in `value` evaluates to `TRUE` for a cell, the formatting (`cFColor` or custom `format`) is applied to that cell.

This enables advanced highlighting scenarios based on values from other cells or ranges in the worksheet, beyond the built-in Highlight Cell and Top Bottom conditions.

```cshtml
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
