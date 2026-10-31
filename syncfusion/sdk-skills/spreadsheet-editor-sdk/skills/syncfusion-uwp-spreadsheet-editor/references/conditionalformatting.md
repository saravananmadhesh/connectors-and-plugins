# Conditional Formatting — UWP Spreadsheet

> Apply conditional formatting rules to cells based on values, formulas, text, time periods, data bars, color scales, and icon sets. Enables visual highlighting and emphasis of data patterns and outliers.

---


## Adding Conditional Formats

Add conditional formatting to cells or ranges using the `AddCondition()` method on the `ConditionalFormats` collection.

### Basic Pattern
```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
IConditionalFormats condition = worksheet.Range["A1"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();

// Configure condition properties
condition1.FormatType = ExcelCFType.CellValue;
condition1.Operator = ExcelComparisonOperator.Greater;
condition1.FirstFormula = "10";
condition1.BackColor = ExcelKnownColors.Light_orange;

// Refresh view
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

---

## Highlight Cell Rules

### Based on Cell Value

Format cells based on cell values using comparison operators.

```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();

condition1.FormatType = ExcelCFType.CellValue;
condition1.Operator = ExcelComparisonOperator.Greater;
condition1.FirstFormula = "10";
condition1.BackColor = ExcelKnownColors.Light_orange;

// Invalidate to refresh view
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

### Based on Formula or Cell References

Format cells based on custom formulas or cell references.

```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();

condition1.FormatType = ExcelCFType.Formula;
condition1.FirstFormula = "=(B1+B2)>50";
condition1.BackColor = ExcelKnownColors.Brown;

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

### Based on Specific Text

Format cells containing or matching specific text.

```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();

condition1.FormatType = ExcelCFType.SpecificText;
condition1.Text = "SYNC";
condition1.Operator = ExcelComparisonOperator.ContainsText;
condition1.BackColor = ExcelKnownColors.Light_orange;

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

### Based on Time Period

Format cells based on date/time periods.

```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();

condition1.FormatType = ExcelCFType.TimePeriod;
condition1.TimePeriodType = CFTimePeriods.Today;
condition1.BackColor = ExcelKnownColors.Light_orange;

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

---

## Data Bars

Apply data bar visualization to cells to show relative values.

### Data Bar Formatting
```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
var conditionalFormats = worksheet.Range["B1:B100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();

conditionalFormat.FormatType = ExcelCFType.DataBar;
conditionalFormat.DataBar.BarColor = Color.FromArgb(255, 214, 0, 123);
conditionalFormat.DataBar.MinPoint.Type = ConditionValueType.LowestValue;
conditionalFormat.DataBar.MaxPoint.Type = ConditionValueType.HighestValue;

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(2));
```

### Data Bar Properties
| Property | Description |
|----------|-------------|
| `BarColor` | Color of the data bar |
| `MinPoint.Type` | Minimum value type (LowestValue, HighestValue, etc.) |
| `MaxPoint.Type` | Maximum value type |
| `ShowValue` | Show/hide the cell value |

---

## Color Scales

Apply color gradients to cells based on their values using color scales.

### Two-Color Scale
```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
var conditionalFormats = worksheet.Range["C2:C100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();

conditionalFormat.FormatType = ExcelCFType.ColorScale;
conditionalFormat.ColorScale.SetConditionCount(2);
conditionalFormat.ColorScale.Criteria[0].FormatColorRGB = Color.FromArgb(255, 99, 190, 123);
conditionalFormat.ColorScale.Criteria[1].FormatColorRGB = Color.FromArgb(255, 90, 138, 198);

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(3));
```

### Three-Color Scale
```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
var conditionalFormats = worksheet.Range["C2:C100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();

conditionalFormat.FormatType = ExcelCFType.ColorScale;
conditionalFormat.ColorScale.SetConditionCount(3);
conditionalFormat.ColorScale.Criteria[0].FormatColorRGB = Color.FromArgb(255, 99, 190, 123);  // Green
conditionalFormat.ColorScale.Criteria[1].FormatColorRGB = Color.FromArgb(255, 255, 255, 0);  // Yellow
conditionalFormat.ColorScale.Criteria[2].FormatColorRGB = Color.FromArgb(255, 255, 0, 0);    // Red

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(3));
```

---

## Icon Sets

Apply icons to cells to indicate values within defined ranges.

### Icon Set Formatting
```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
var conditionalFormats = worksheet.Range["D2:D100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();

conditionalFormat.FormatType = ExcelCFType.IconSet;
conditionalFormat.IconSet.IconSet = ExcelIconSetType.ThreeSymbols;

spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(4));
```

### Icon Set Types
| Icon Set Type | Description |
|---------------|-------------|
| `ThreeArrows` | Three arrows (Up, Middle, Down) |
| `ThreeSymbols` | Three symbols |
| `FourArrows` | Four arrows |
| `FiveArrows` | Five arrows |
| `ThreeTrafficLights` | Three traffic light icons |
| `FourTrafficLights` | Four traffic light icons |
| `FiveRating` | Five star rating |
| `ThreeTriangles` | Three triangles |

---

## Comparison Operators

| Operator | Description |
|----------|-------------|
| `Greater` | Value is greater than |
| `Less` | Value is less than |
| `Equal` | Value equals |
| `NotEqual` | Value does not equal |
| `GreaterOrEqual` | Value is >= |
| `LessOrEqual` | Value is <= |
| `Between` | Value is between two values |
| `NotBetween` | Value is not between two values |
| `ContainsText` | Cell contains text |
| `DoesNotContainText` | Cell does not contain text |
| `StartsWith` | Text starts with |
| `EndsWith` | Text ends with |

---

## Format Types

| Format Type | Description |
|-------------|-------------|
| `CellValue` | Based on cell value comparison |
| `Formula` | Based on formula evaluation |
| `SpecificText` | Based on text content |
| `TimePeriod` | Based on date/time period |
| `DataBar` | Data bar visualization |
| `ColorScale` | Color gradient scale |
| `IconSet` | Icon set visualization |

---

## Time Period Types

| Time Period | Description |
|-------------|-------------|
| `Today` | Today's date |
| `Yesterday` | Yesterday's date |
| `Tomorrow` | Tomorrow's date |
| `Last7Days` | Last 7 days |
| `ThisMonth` | Current month |
| `LastMonth` | Last month |
| `NextMonth` | Next month |

---

## Key Members

| Member | Type | Description |
|--------|------|-------------|
| `ConditionalFormats` | Property | Gets the collection of conditional formats |
| `AddCondition()` | Method | Adds a new conditional format |
| `FormatType` | Property | Gets/sets the format type (CellValue, Formula, etc.) |
| `Operator` | Property | Gets/sets comparison operator |
| `FirstFormula` | Property | Gets/sets first formula or value |
| `SecondFormula` | Property | Gets/sets second formula or value |
| `Text` | Property | Gets/sets text for SpecificText format |
| `TimePeriodType` | Property | Gets/sets time period type |
| `BackColor` | Property | Gets/sets background color |
| `FontColor` | Property | Gets/sets font color |
| `DataBar` | Property | Gets data bar properties |
| `ColorScale` | Property | Gets color scale properties |
| `IconSet` | Property | Gets icon set properties |

---

## Example: Sales Report Formatting

```csharp
using System;
using Syncfusion.SfSpreadsheet;
using Syncfusion.XlsIO;

public void ApplyConditionalFormatting()
{
    var sheet = spreadsheet.Workbook.Worksheets[0];
    
    // Setup headers
    sheet.Range["A1"].Text = "Product";
    sheet.Range["B1"].Text = "Sales";
    sheet.Range["C1"].Text = "Target";
    sheet.Range["D1"].Text = "Status";
    
    // Add sample data
    sheet.Range["A2"].Text = "Product A";
    sheet.Range["B2"].Value = 5000;
    sheet.Range["C2"].Value = 4000;
    
    // Highlight cell values - Sales above 4000
    var salesRange = sheet.Range["B2:B100"];
    var salesConditions = salesRange.ConditionalFormats;
    var salesCondition = salesConditions.AddCondition();
    salesCondition.FormatType = ExcelCFType.CellValue;
    salesCondition.Operator = ExcelComparisonOperator.Greater;
    salesCondition.FirstFormula = "4000";
    salesCondition.BackColor = ExcelKnownColors.Light_green;
    
    // Apply data bars to sales data
    var dataBarRange = sheet.Range["B2:B100"];
    var dataBarConditions = dataBarRange.ConditionalFormats;
    var dataBarCondition = dataBarConditions.AddCondition();
    dataBarCondition.FormatType = ExcelCFType.DataBar;
    dataBarCondition.DataBar.BarColor = Color.FromArgb(255, 0, 176, 240);
    
    // Apply color scale to target column
    var targetRange = sheet.Range["C2:C100"];
    var colorConditions = targetRange.ConditionalFormats;
    var colorCondition = colorConditions.AddCondition();
    colorCondition.FormatType = ExcelCFType.ColorScale;
    colorCondition.ColorScale.SetConditionCount(3);
    colorCondition.ColorScale.Criteria[0].FormatColorRGB = Color.FromArgb(255, 99, 190, 123);
    colorCondition.ColorScale.Criteria[1].FormatColorRGB = Color.FromArgb(255, 255, 255, 0);
    colorCondition.ColorScale.Criteria[2].FormatColorRGB = Color.FromArgb(255, 255, 0, 0);
    
    // Refresh view
    spreadsheet.ActiveGrid.InvalidateCells();
}
```
