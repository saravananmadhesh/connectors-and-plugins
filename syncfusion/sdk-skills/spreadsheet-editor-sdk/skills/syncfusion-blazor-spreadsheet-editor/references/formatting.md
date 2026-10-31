## Cell Formatting

> Apply cell styles including fonts, colors, alignment, and text decoration. Control cell formatting permissions and programmatically format cells.

### Number formatting

> Display numeric, date, and time values with built-in Excel-style formats or custom patterns. Control number formatting permissions and programmatically apply formats to cells.

### Borders

> Apply borders to cells with customizable styles, colors, and regions. Visually separate cells and define table boundaries. Control border permissions and programmatically apply borders to cell ranges.

### Conditional Formatting

> Apply automatic visual formatting to cells based on specified conditions. Highlight data patterns using color scales, data bars, icon sets, highlightcells, and top/bottom formatting rules. Control conditional formatting permissions and programmatically apply conditional formatting rules.

### PROPERTIES
```csharp
AllowCellFormatting="true(Default)/false"
AllowNumberFormatting="true(Default)/false"
AllowConditionalFormat="true(Default)/false"
AllowTextWrap="true(Default)/false"
```

### EVENTS
```csharp
CellFormatting="OnCellFormatting"
ConditionalFormatting="OnConditionalFormatting"
```

```csharp
private void OnCellFormatting(CellFormattingEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**CellFormatting Event Arguments**
| Event Arguments | Description |
|---|---|
| `Range` | The target cell range to which the formatting will be applied (e.g., "A1:B5", "Sheet2!C2:D10"). |
| `FormatType` | The type of formatting being applied. Supported values are `CellStyle` and `NumberFormat`. |
| `Format` | The current formatting details of the target cell or range (CellStyle object containing style attributes such as font, fill, border, alignment) before the new formatting is applied. |
| `NumberFormat` | The current number format pattern of the target cell or range (e.g., `"0.00%"`, `"mm/dd/yyyy"`). |
| `Cancel` | Set to `true` to cancel the formatting operation. |

```csharp
private void OnConditionalFormatting(ConditionalFormattingEventArgs args)
{
    // customize your code based on the requirements and check below table for event argument details
}
```
**ConditionalFormatting Event Arguments**
| Event Arguments | Description |
|---|---|
| `Range` | The target cell range to which the conditional formatting rule will be applied (e.g., "A1:A10", "Sheet2!B2:D4"). |
| `ConditionalFormatType` | The type of conditional formatting rule being applied (e.g., `GreaterThan`, `LessThan`, `Between`, `EqualTo`, `Top10Items`, `BlueDataBar`, `GreenYellowRedColorScale`, `FiveRating`). |
| `Cancel` | Set to `true` to cancel the conditional formatting operation. |

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Apply custom format to range
await SpreadsheetInstance.NumberFormatAsync(FORMAT, CELLADDRESS);

// Apply custom cell styles to specific range
await SpreadsheetInstance.CellFormatAsync(new CellFormat
{
    BackgroundColor = "#FFEB3B",
    FontStyle = FontStyle.Italic
}, CELLADDRESS);

/// <summary>
/// Applies cell borders programmatically to a cell or range.
/// </summary>
/// <param name="borderType">
/// The border region to apply (e.g., <see cref="BorderType.OutsideBorders"/>,
/// <see cref="BorderType.AllBorders"/>, <see cref="BorderType.TopBorder"/>).
/// </param>
/// <param name="lineStyle">
/// Border line style (e.g., <c>ExcelLineStyle.Thin</c>, <c>ExcelLineStyle.Medium</c>,
/// <c>ExcelLineStyle.Dashed</c>, <c>ExcelLineStyle.Dotted</c>, <c>ExcelLineStyle.Double</c>).
/// </param>
/// <param name="borderColor">
/// Border color in CSS/hex format (e.g., "#000000", "red", "#2196F3").
/// </param>
/// <param name="cellAddress">
/// (Optional) Target cell or range in A1 notation (e.g., "A1", "A1:C5", "Sheet2!B2:D4").
/// If omitted, applies to the current selection.
/// </param>
/// <remarks>
/// Requires <c>AllowCellFormatting = true</c>. Supports common border presets
/// (Top/Left/Right/Bottom/No/All/Horizontal/Vertical/Outside/Inside) with
/// customizable style and color. Use named ranges or A1 addresses for scope.
/// </remarks>
SpreadsheetRef.SetBordersAsync(BorderType.AllBorders, ExcelLineStyle.Dashed, "#0000FF", "B2:D4");

// Apply conditional formatting rule
await SpreadsheetInstance.ConditionalFormatAsync(new ConditionalFormatRule
{
    ConditionalFormatType = ConditionalFormatType.GreaterThan,
    PrimaryValue = "80",
    Range = "B2:B50",
    ConditionalFormatColor = ConditionalFormatColor.GreenFillWithDarkGreenText
});

await SpreadsheetInstance.ClearConditionalFormatsAsync(RANGE);
```

### ConditionalFormatRule Class Properties

| Property | Type | Description |
|---|---|---|
| `ConditionalFormatType` | ConditionalFormatType enum | The type of conditional formatting rule (e.g., `GreaterThan`, `LessThan`, `Between`, `EqualTo`, `ContainsText`, `DateOccur`, `Duplicate`, `Unique`, `Top10Items`, `Bottom10Items`, `Top10Percentage`, `Bottom10Percentage`, `AboveAverage`, `BelowAverage`, `BlueDataBar`, `GreenDataBar`, `RedDataBar`, `OrangeDataBar`, `LightBlueDataBar`, `PurpleDataBar`, `GreenYellowRedColorScale`, `RedYellowGreenColorScale`, `GreenWhiteRedColorScale`, `BlueWhiteRedColorScale`, `RedWhiteBlueColorScale`, `WhiteRedColorScale`, `RedWhiteColorScale`, `GreenWhiteColorScale`, `WhiteGreenColorScale`, `GreenYellowColorScale`, `YellowGreenColorScale`, `ThreeArrows`, `ThreeArrowsGray`, `FourArrows`, `FourArrowsGray`, `FiveArrows`, `FiveArrowsGray`, `ThreeTrafficLights1`, `ThreeTrafficLights2`, `ThreeSigns`, `FourTrafficLights`, `FourRedToBlack`, `ThreeSymbols`, `ThreeSymbols2`, `ThreeFlags`, `FourRating`, `FiveQuarters`, `FiveRating`, `ThreeTriangles`, `ThreeStars`, `FiveBoxes`) |
| `Range` | string | (Optional) The cell range where the rule is applied. If omitted or empty, the current selection is used (e.g., `"A1:A10"`, `"Sheet2!B2:D4"`) |
| `PrimaryValue` | string | The threshold or comparison value for the rule (e.g., `"80"`, `"50000"`) |
| `SecondaryValue` | string | (Optional) The upper limit for `Between` rule type (e.g., `"100"`) |
| `ConditionalFormatColor` | ConditionalFormatColor enum (nullable) | Preset color style for highlight and top/bottom rules. Supported values: `GreenFillWithDarkGreenText` (Green fill, Dark Green text), `YellowFillWithDarkYellowText` (Yellow fill, Dark Yellow text), `RedFillWithDarkRedText` (Red fill, Dark Red text), `RedFill` (Red fill only), `RedText` (Red text only) |
| `Format` | CellFormat object | A CellFormat object defining custom visual styles (background color, text color, font, bold, italic, underline) applied when the rule matches |

### Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaning full name to button which binds to API method | - |
| `FORMAT` | The built-in format or a supported custom pattern. | `"0.00%"`, `"mm/dd/yyyy"` |
| `CELLADDRESS` | The address of the target range where the format is applied (e.g., "Sheet1!A2:A5" or "A2:A5"). If the sheet name is not specified, the format is applied to the specified range in the active sheet. When cellAddress is omitted, the current selection is formatted. For column or row selection, use full range like "A1:A1000" instead of "C:C" or "1:1". | `"Sheet1!A2:A5"`, `"A2:A5"`, `"D1"` |
| `RANGE` | (Optional) The address of the target range for clearing conditional formatting (e.g., "Sheet1!A2:A5" or "A2:A5"). If null or empty, all conditional formatting rules on the active worksheet are cleared. | `"A1:A10"`, `"Sheet2!B2:D4"`, or omit for clearing all |
| `ConditionalFormatType` | The type of conditional formatting rule to apply (e.g., `GreaterThan`, `LessThan`, `Top10Items`, `BlueDataBar`, `GreenYellowRedColorScale`, `FiveRating`) | `ConditionalFormatType.GreaterThan` |
| `PrimaryValue` | The threshold or comparison value for conditional format rules | `"80"`, `"50000"`, `"10"` |
| `SecondaryValue` | The upper limit for `Between` rule type in conditional formatting | `"100"`, `"5000"` |
| `ConditionalFormatColor` | Preset color style for highlight rules. Supported values: `GreenFillWithDarkGreenText`, `YellowFillWithDarkYellowText`, `RedFillWithDarkRedText`, `RedFill`, `RedText` | `ConditionalFormatColor.GreenFillWithDarkGreenText` |

### CellFormat Class Properties

| Property | Type | Description |
|---|---|---|
| `BackgroundColor` | string | Cell background color in hex or named CSS format (e.g., "#4B5366", "red") |
| `Color` | string | Font color in hex or named CSS format (e.g., "#FFFFFF", "blue") |
| `FontFamily` | FontFamily enum | Font family (e.g., FontFamily.Arial, FontFamily.TimesNewRoman) |
| `FontSize` | string | Font size with unit (e.g., "14pt", "12px") |
| `FontWeight` | FontWeight enum | Font weight (e.g., FontWeight.Bold, FontWeight.Normal) |
| `FontStyle` | FontStyle enum | Font style (e.g., FontStyle.Italic, FontStyle.Normal) |
| `TextDecoration` | TextDecoration enum | Text decoration (e.g., TextDecoration.Underline, TextDecoration.LineThrough) |
| `TextAlign` | TextAlign enum | Horizontal alignment (e.g., TextAlign.Center, TextAlign.Left, TextAlign.Right) |
| `VerticalAlign` | VerticalAlign enum | Vertical alignment (e.g., VerticalAlign.Middle, VerticalAlign.Top, VerticalAlign.Bottom) |

### Notes
- **AllowCellFormatting** is enabled by default; include `AllowCellFormatting="false"` only when you want to **disable** cell formatting for spreadsheet.
- **AllowNumberFormatting** is enabled by default; include `AllowNumberFormatting="false"` only when you want to **disable** number format for spreadsheet.
- **AllowConditionalFormat** is enabled by default; include `AllowConditionalFormat="false"` only when you want to **disable** conditional formatting for spreadsheet.
- **AllowTextWrap**: default `true`; set `AllowTextWrap="false"` to disable text wrapping in cells (content will stay on a single line).
- **CellFormatting** event fires *before* a cell style or number format is applied to a cell or range and can be used to inspect the target range, the current style/number format, and the formatting type, or to cancel the operation.
- **ConditionalFormatting** event fires *before* a conditional formatting rule is applied to a cell range and can be used to inspect the rule type and target range, or to cancel the operation.
- **ExcelLineStyle for borders**: When using `ExcelLineStyle` for borders, you must add `@using Syncfusion.XlsIO` directive at the top of your Razor component file.
- **Wrap Text**: Wrap text is not supported through API methods. It can only be applied through UI actions in the spreadsheet(Ribbon > Home tab > Wrap Text button).
- **Conditional Formatting Limitation**: Formula-based conditional formatting rules are not currently supported; rules must be based on static values or built-in rule types.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.

### Documentation link
[Blazor Spreadsheet formatting](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/formatting)