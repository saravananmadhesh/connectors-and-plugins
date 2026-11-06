# Wrap Text API Reference

## Overview

The `wrap()` method is used to wrap or unwrap the text content of cells in the Spreadsheet. When text wrapping is enabled, long text content will display as multiple lines within a single cell without expanding the column width.

**API Documentation**: https://ej2.syncfusion.com/javascript/documentation/api/spreadsheet/index-default#wrap

## Method Signature

```typescript
wrap(address: string, wrap: boolean): void
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `address` | string | Address of the cell to be wrapped. Supports single cell references (e.g., 'B5') or ranges (e.g., 'A1:D10', 'C:C') |
| `wrap` | boolean | Set `true` to enable text wrapping; set `false` to disable text wrapping |

## Return Value

`void` - This method does not return a value.

## Basic Examples

### Wrap a Single Cell

```cshtml
@using Syncfusion.EJ2.Spreadsheet

@Html.EJS().Spreadsheet("spreadsheet").AllowWrap(true).Created("onCreated").Sheets(sheet =>
{
    sheet.Add();
}).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // Enable text wrapping on cell B5
        spreadsheet.wrap('B5', true);

        // Disable text wrapping on cell B5
        spreadsheet.wrap('B5', false);
    }
</script>

```

### Wrap a Range of Cells

```cshtml
// Enable wrapping on range A1:D10
spreadsheet.wrap('A1:D10', true);

// Disable wrapping on range C1:C10
spreadsheet.wrap('C1:C10', false);
```

### Wrap an Entire Column

```cshtml
// Enable wrapping on entire column C
spreadsheet.wrap('C:C', true);

// Enable wrapping on entire column A
spreadsheet.wrap('A:A', true);
```

## Interactive Example

```cshtml
@using Syncfusion.EJ2.Spreadsheet

<!-- Buttons to apply/remove wrap -->
<button class="e-btn" type="button" onclick="applyWrap()">Apply wrap</button>
<button class="e-btn" type="button" onclick="removeWrap()">Remove wrap</button>

<!-- Spreadsheet instance -->
@Html.EJS().Spreadsheet("spreadsheet").AllowWrap(true).Sheets(sheet =>
{
    sheet.Add();
}).Render()

<script>
    function applyWrap() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        // To wrap the cell's text content with the specified address
        spreadsheet.wrap('[CELL_ADDRESS]', true);
    }

    function removeWrap() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];
        // To unwrap the cell's text content with the specified address
        spreadsheet.wrap('[CELL_ADDRESS]', false);
    }
</script>


```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[CELL_ADDRESS]` | Address of the cell to wrap | `'B5'`, `'A1:D10'`, `'C:C'` |
| `[ENABLE]` | Wrap boolean value | `true`, `false` |


## Common Pitfalls to Avoid

- **Don't wrap very narrow columns** - Text becomes difficult to read
- **Combine wrapping with row height adjustment** - Wrapped text may be cut off without adequate row height

## Notes

- Text wrapping preserves formatting when copying cells
- Wrapped content expands automatically during print
- Works with all cell alignments and formatting
