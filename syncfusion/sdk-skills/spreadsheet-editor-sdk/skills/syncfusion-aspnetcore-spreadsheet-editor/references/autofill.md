# Autofill

Automatically fill cell ranges with patterns, series, or copied values using the autofill feature.

## Minimal Code

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet


<div class="control-pane">
    <div class="control-section spreadsheet-control">
        <ejs-spreadsheet id="spreadsheet" allowAutoFill="true" created="createdHandler">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Sheet1">
                    <e-spreadsheet-rows>
                        <e-spreadsheet-row>
                            <e-spreadsheet-cells>
                                <e-spreadsheet-cell value="1"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="2"></e-spreadsheet-cell>
                                <e-spreadsheet-cell value="3"></e-spreadsheet-cell>
                            </e-spreadsheet-cells>
                        </e-spreadsheet-row>
                    </e-spreadsheet-rows>
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

<script>
    function createdHandler() {
        var spreadsheet = this;
        
        // Fill down (copy first row to second row)
        spreadsheet.autoFill('A2:C2', 'A1:C1', 'Down', 'CopyCells');

        // Fill series (extend 1,2,3 pattern to 1,2,3,4,5)
        spreadsheet.autoFill('D1:F1', 'A1:C1', 'Right', 'FillSeries');

        // Fill right (copy A column pattern to B, C columns)
        spreadsheet.autoFill('B1:C5', 'A1:A5', 'Right', 'FillSeries');
    }
</script>
```

## Type Definitions

### AutoFillDirection
```cshtml
type AutoFillDirection = 'Down' | 'Right' | 'Up' | 'Left';
```

### AutoFillType
```cshtml
type AutoFillType = 'FillSeries' | 'CopyCells' | 'FillFormattingOnly' | 'FillWithoutFormatting';
```

## Autofill Settings

### `autoFillSettings` Configuration

Configure autofill behavior using the `autoFillSettings` property.

**Type:** `AutoFillSettingsModel`

**Properties:**
```javascript
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
```javascript
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

## Autofill from User Interaction

Users can autofill by dragging the fill handle (small square at cell corner) in the spreadsheet UI.

### Handling Autofill Events

```cshtml
@using Syncfusion.EJ2

<div class="control-section">
    <ejs-spreadsheet id="spreadsheet" actionBegin="actionBeginHandler" actionComplete="actionCompleteHandler">
        <e-spreadsheet-sheets>
            <e-spreadsheet-sheet name="Sheet1">
            </e-spreadsheet-sheet>
        </e-spreadsheet-sheets>
    </ejs-spreadsheet>
</div>

<script>
    function actionBeginHandler(args) {
        if (args.action === 'autofill') {
            console.log('User autofilling...');
            args.cancel = false;  // Allow autofill
        }
    }
    
    function actionCompleteHandler(args) {
        if (args.action === 'autofill') {
            console.log('Autofill completed');
        }
    }
</script>
```
## Notes

- Use FillSeries for numeric/date patterns
- Use CopyCells for exact duplication
- Preview autofill result before applying to large ranges
- CopyCells with formulas adjusts relative references automatically
- Absolute references (e.g., $A$1) do NOT adjust when autofilled
