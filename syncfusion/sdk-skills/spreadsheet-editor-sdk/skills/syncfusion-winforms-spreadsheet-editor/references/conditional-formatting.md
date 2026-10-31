# Conditional Formatting in Windows Forms Spreadsheet

Conditional Formatting allows you to apply formats to a cell or range of cells depending on the value of the cells or a formula that meets specific criteria.

**Interface:** `IConditionalFormat`  
**Interface:** `IConditionalFormats`  
**Method:** `AddCondition()` on `IConditionalFormats`

```csharp
var worksheet = spreadsheet.Workbook.Worksheets[0];
IConditionalFormats condition = worksheet.Range["A1"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();
```

## Highlight Cell Rules

### Based on Cell Value

**Enum:** `ExcelCFType.CellValue`  
**Enum:** `ExcelComparisonOperator`

```csharp
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();
condition1.FormatType = ExcelCFType.CellValue;
condition1.Operator = ExcelComparisonOperator.Greater;
condition1.FirstFormula = "10";
condition1.BackColor = ExcelKnownColors.Light_orange;
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

### Based on a Formula or Cell References

**Enum:** `ExcelCFType.Formula`

```csharp
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();
condition1.FormatType = ExcelCFType.Formula;
condition1.FirstFormula = "=(B1+B2)>50";
condition1.BackColor = ExcelKnownColors.Brown;
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

### Based on Specific Text

**Enum:** `ExcelCFType.SpecificText`  
**Enum:** `ExcelComparisonOperator.ContainsText`

```csharp
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();
condition1.FormatType = ExcelCFType.SpecificText;
condition1.Text = "SYNC";
condition1.Operator = ExcelComparisonOperator.ContainsText;
condition1.BackColor = ExcelKnownColors.Light_orange;
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

### Based on Time Period

**Enum:** `ExcelCFType.TimePeriod`  
**Enum:** `CFTimePeriods`

```csharp
IConditionalFormats condition = worksheet.Range["A1:A100"].ConditionalFormats;
IConditionalFormat condition1 = condition.AddCondition();
condition1.FormatType = ExcelCFType.TimePeriod;
condition1.TimePeriodType = CFTimePeriods.Today;
condition1.BackColor = ExcelKnownColors.Light_orange;
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(1));
```

**Available `CFTimePeriods` values:** `Today`, `Yesterday`, `Tomorrow`, `Last7Days`, `LastWeek`, `ThisWeek`, `NextWeek`, `LastMonth`, `ThisMonth`, `NextMonth`

## Data Bars

**Enum:** `ExcelCFType.DataBar`  
**Class:** `IDataBar`  
**Enum:** `ConditionValueType`

```csharp
var conditionalFormats = worksheet.Range["B1:B100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();
conditionalFormat.FormatType = ExcelCFType.DataBar;
conditionalFormat.DataBar.BarColor = Color.FromArgb(255, 214, 0, 123);
conditionalFormat.DataBar.MinPoint.Type = ConditionValueType.LowestValue;
conditionalFormat.DataBar.MaxPoint.Type = ConditionValueType.HighestValue;
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(2));
```

## Color Scales

**Enum:** `ExcelCFType.ColorScale`  
**Method:** `SetConditionCount(int count)` on `IColorScale`

```csharp
var conditionalFormats = worksheet.Range["C2:C100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();
conditionalFormat.FormatType = ExcelCFType.ColorScale;
conditionalFormat.ColorScale.SetConditionCount(2);
conditionalFormat.ColorScale.Criteria[0].FormatColorRGB = Color.FromArgb(255, 99, 190, 123);
conditionalFormat.ColorScale.Criteria[1].FormatColorRGB = Color.FromArgb(255, 90, 138, 198);
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(3));
```

## Icon Sets

**Enum:** `ExcelCFType.IconSet`  
**Enum:** `ExcelIconSetType`

```csharp
var conditionalFormats = worksheet.Range["D2:D100"].ConditionalFormats;
var conditionalFormat = conditionalFormats.AddCondition();
conditionalFormat.FormatType = ExcelCFType.IconSet;
conditionalFormat.IconSet.IconSet = ExcelIconSetType.ThreeSymbols;
spreadsheet.ActiveGrid.InvalidateCell(GridRangeInfo.Col(4));
```

**Available `ExcelIconSetType` values:**

| Value | Description |
|---|---|
| `ThreeArrows` | Three colored arrows (red, yellow, green). |
| `ThreeArrowsGray` | Three gray arrows. |
| `ThreeFlags` | Three colored flags. |
| `ThreeSigns` | Three signs (circle, triangle, diamond). |
| `ThreeSymbols` | Three symbols (X, !, checkmark). |
| `ThreeTrafficLights1` | Three traffic lights without border. |
| `ThreeTrafficLights2` | Three traffic lights with border. |
| `FourArrows` | Four colored arrows. |
| `FourArrowsGray` | Four gray arrows. |
| `FourRating` | Four rating bars. |
| `FourRedToBlack` | Four red-to-black circles. |
| `FourTrafficLights` | Four traffic lights. |
| `FiveArrows` | Five colored arrows. |
| `FiveArrowsGray` | Five gray arrows. |
| `FiveBoxes` | Five boxes (empty to filled). |
| `FiveQuarters` | Five quarter-circle icons. |
| `FiveRating` | Five rating bars. |

## See Also

- [Formatting](formatting.md)
- [Data Validation](data-validation.md)
