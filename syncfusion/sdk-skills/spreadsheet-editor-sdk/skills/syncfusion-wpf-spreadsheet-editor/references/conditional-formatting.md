# Conditional Formatting

> Apply formatting to cells based on their values or formulas in WPF Spreadsheet control.

---

## Overview

Supports Excel-compatible conditional formatting, including data bars, icon sets, and color scales, to visualize data trends and patterns.

---

## Key Features
- Format cells based on value or formula
- Data bars, icon sets, color scales
- Import and define rules

---

## Example

Apply a rule to highlight cells greater than 100 in green. Use data bars to visualize values in a range.

## Setup - Constructor

Wire up the `WorkbookLoaded` event and create a workbook in the window constructor:

```csharp
    public MainWindow()
    {
        InitializeComponent();
        // Wire up the WorkbookLoaded event handler
        spreadsheet.WorkbookLoaded += Spreadsheet_WorkbookLoaded;
    }
```

## Workbook Loaded Event

The `WorkbookLoaded` event fires after a workbook is created or opened. All code samples should be placed inside this single event handler:

```csharp
private void Spreadsheet_WorkbookLoaded(object sender, EventArgs e)
{
    var worksheet = spreadsheet.Workbook.Worksheets[0];

    // Conditional Formatting - Basic Setup
    IConditionalFormats condition = worksheet.Range["A1"].ConditionalFormats;
    IConditionalFormat condition1 = condition.AddCondition();

    // Highlight Cell Rules - Based on CellValue
    IConditionalFormats cellValueCondition = worksheet.Range["A1:A100"].ConditionalFormats;
    IConditionalFormat cellValueFormat = cellValueCondition.AddCondition();
    cellValueFormat.FormatType = ExcelCFType.CellValue;
    cellValueFormat.Operator = ExcelComparisonOperator.Greater;
    cellValueFormat.FirstFormula = "10";
    cellValueFormat.BackColor = ExcelKnownColors.Light_orange;
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));

    // Based on Formula or Cell References
    IConditionalFormats formulaCondition = worksheet.Range["A1:A100"].ConditionalFormats;
    IConditionalFormat formulaFormat = formulaCondition.AddCondition();
    formulaFormat.FormatType = ExcelCFType.Formula;
    formulaFormat.FirstFormula = "=(B1+B2)>50";
    formulaFormat.BackColor = ExcelKnownColors.Brown;
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));

    // Based on SpecificText
    IConditionalFormats textCondition = worksheet.Range["A1:A100"].ConditionalFormats;
    IConditionalFormat textFormat = textCondition.AddCondition();
    textFormat.FormatType = ExcelCFType.SpecificText;
    textFormat.Text = "SYNC";
    textFormat.Operator = ExcelComparisonOperator.ContainsText;
    textFormat.BackColor = ExcelKnownColors.Light_orange;
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));

    // Based on TimePeriod
    IConditionalFormats timeCondition = worksheet.Range["A1:A100"].ConditionalFormats;
    IConditionalFormat timeFormat = timeCondition.AddCondition();
    timeFormat.FormatType = ExcelCFType.TimePeriod;
    timeFormat.TimePeriodType = CFTimePeriods.Today;
    timeFormat.BackColor = ExcelKnownColors.Light_orange;
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));

    // Data Bars
    var dataBarFormats = worksheet.Range["B1:B100"].ConditionalFormats;
    var dataBarFormat = dataBarFormats.AddCondition();
    dataBarFormat.FormatType = ExcelCFType.DataBar;
    dataBarFormat.DataBar.BarColor = Color.FromArgb(255, 214, 0, 123);
    dataBarFormat.DataBar.MinPoint.Type = ConditionValueType.LowestValue;
    dataBarFormat.DataBar.MaxPoint.Type = ConditionValueType.HighestValue;
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(2));

    // Color Scales
    var colorScaleFormats = worksheet.Range["C2:C100"].ConditionalFormats;
    var colorScaleFormat = colorScaleFormats.AddCondition();
    colorScaleFormat.FormatType = ExcelCFType.ColorScale;
    colorScaleFormat.ColorScale.SetConditionCount(2);
    colorScaleFormat.ColorScale.Criteria[0].FormatColorRGB = Color.FromArgb(255, 99, 190, 123);
    colorScaleFormat.ColorScale.Criteria[1].FormatColorRGB = Color.FromArgb(255, 90, 138, 198);
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(3));

    // Icon Sets
    var iconSetFormats = worksheet.Range["D2:D100"].ConditionalFormats;
    var iconSetFormat = iconSetFormats.AddCondition();
    iconSetFormat.FormatType = ExcelCFType.IconSet;
    iconSetFormat.IconSet.IconSet = ExcelIconSetType.ThreeSymbols;
    spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(4));
}
```

## Code Examples by Type

The following sections show each conditional formatting type individually for reference:

## Highlight Cell Rules

### Based on CellValue

Highlights cells with values greater than 10 with a light orange background.

### Based on Formula or Cell References

Applies formatting when the formula `(B1+B2)>50` evaluates to true.

### Based on SpecificText

Highlights cells containing the text "SYNC" with a light orange background.

### Based on TimePeriod

Highlights cells with today's date with a light orange background.

## Data Bars

Visualizes values in range B1:B100 using data bars with a pink color gradient.

## Color Scales

Displays a two-color scale gradient from green to blue for range C2:C100.

## Icon Sets

Applies three-symbol icon sets to range D2:D100 based on cell values.
---

## References
- [Conditional Formatting Documentation](https://help.syncfusion.com/wpf/spreadsheet/conditional-formatting)
