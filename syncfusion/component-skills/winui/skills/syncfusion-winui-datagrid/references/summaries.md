# Summaries in WinUI DataGrid

Complete guide to table summaries, group summaries, and caption summaries for displaying aggregate information in Syncfusion WinUI DataGrid.

## Table of Contents
- [Summary Types](#summary-types)
- [Table Summary](#table-summary)
- [Group Summary](#group-summary)
- [Caption Summary](#caption-summary)
- [Aggregate Types](#aggregate-types)
- [Custom Summaries](#custom-summaries)

## Summary Types

| Type | Location | Purpose |
|------|----------|---------|
| **Table Summary** | Top/Bottom of grid | Aggregate all records |
| **Group Summary** | Within each group | Aggregate per group |
| **Caption Summary** | Group caption row | Display in group header |

## Table Summary

Display summary at top or bottom of DataGrid.

### Summary in Columns

```xml
<dataGrid:SfDataGrid ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.TableSummaryRows>
        <dataGrid:GridTableSummaryRow Position="Bottom" ShowSummaryInRow="False">
            <dataGrid:GridSummaryRow.SummaryColumns>
                <dataGrid:GridSummaryColumn Name="TotalPrice"
                                            MappingName="UnitPrice"
                                            SummaryType="DoubleAggregate"
                                            Format="'Total: {Sum:C}'" />
                <dataGrid:GridSummaryColumn Name="OrderCount"
                                            MappingName="OrderID"
                                            SummaryType="CountAggregate"
                                            Format="'{Count} Orders'" />
            </dataGrid:GridSummaryRow.SummaryColumns>
        </dataGrid:GridTableSummaryRow>
    </dataGrid:SfDataGrid.TableSummaryRows>
</dataGrid:SfDataGrid>
```

### Summary in Row

```xml
<dataGrid:GridTableSummaryRow Position="Bottom" 
                              ShowSummaryInRow="True"
                              Title="Total: {TotalPrice} | Count: {OrderCount}">
    <dataGrid:GridSummaryRow.SummaryColumns>
        <dataGrid:GridSummaryColumn Name="TotalPrice"
                                    MappingName="UnitPrice"
                                    SummaryType="DoubleAggregate"
                                    Format="{Sum:C}" />
        <dataGrid:GridSummaryColumn Name="OrderCount"
                                    MappingName="OrderID"
                                    SummaryType="CountAggregate"
                                    Format="{Count}" />
    </dataGrid:GridSummaryRow.SummaryColumns>
</dataGrid:GridTableSummaryRow>
```

**Position:** `Top` or `Bottom`

## Group Summary

Display summaries within each group.

```xml
<dataGrid:SfDataGrid AllowGrouping="True" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.GroupSummaryRows>
        <dataGrid:GridSummaryRow ShowSummaryInRow="False">
            <dataGrid:GridSummaryRow.SummaryColumns>
                <dataGrid:GridSummaryColumn Name="GroupTotal"
                                            MappingName="UnitPrice"
                                            SummaryType="DoubleAggregate"
                                            Format="'Total: {Sum:C}'" />
                <dataGrid:GridSummaryColumn Name="GroupCount"
                                            MappingName="OrderID"
                                            SummaryType="CountAggregate"
                                            Format="'{Count} items'" />
            </dataGrid:GridSummaryRow.SummaryColumns>
        </dataGrid:GridSummaryRow>
    </dataGrid:SfDataGrid.GroupSummaryRows>
</dataGrid:SfDataGrid>
```

## Caption Summary

Display summary in group caption (header).

```xml
<dataGrid:SfDataGrid AllowGrouping="True" ItemsSource="{Binding Orders}">
    <dataGrid:SfDataGrid.CaptionSummaryRow>
        <dataGrid:GridSummaryRow Title="{Key}: {ItemsCount} Items - Total: {TotalPrice}"
                                 ShowSummaryInRow="True">
            <dataGrid:GridSummaryRow.SummaryColumns>
                <dataGrid:GridSummaryColumn Name="TotalPrice"
                                            MappingName="UnitPrice"
                                            SummaryType="DoubleAggregate"
                                            Format="{Sum:C}" />
            </dataGrid:GridSummaryRow.SummaryColumns>
        </dataGrid:GridSummaryRow>
    </dataGrid:SfDataGrid.CaptionSummaryRow>
</dataGrid:SfDataGrid>
```

**Built-in Tokens:**
- `{Key}` - Group key value
- `{ItemsCount}` - Number of items in group

## Aggregate Types

### For Numeric Types (int, double, decimal)

| Type | Function | Example |
|------|----------|---------|
| **DoubleAggregate** | Sum, Average, Max, Min | `{Sum:C}`, `{Average:N2}` |
| **Int32Aggregate** | Sum, Average, Max, Min, Count | `{Sum}`, `{Count}` |

### For All Types

| Type | Function | Example |
|------|----------|---------|
| **CountAggregate** | Count | `{Count} items` |
| **Custom** | Custom calculation | See below |

### Examples

```xml
<!-- Sum -->
<dataGrid:GridSummaryColumn SummaryType="DoubleAggregate"
                            Format="'Total: {Sum:C}'" />

<!-- Average -->
<dataGrid:GridSummaryColumn SummaryType="DoubleAggregate"
                            Format="'Avg: {Average:N2}'" />

<!-- Count -->
<dataGrid:GridSummaryColumn SummaryType="CountAggregate"
                            Format="'{Count} Records'" />

<!-- Min/Max -->
<dataGrid:GridSummaryColumn SummaryType="DoubleAggregate"
                            Format="'Range: {Min:C} - {Max:C}'" />
```

## Custom Summaries

Implement custom aggregate calculations.

### 1. Create Custom Aggregate

```csharp
public class CustomAggregate : ISummaryAggregate
{
    public CustomAggregate()
    {
    }
    
    public double StdDev { get; set; }
    
    public Action<IEnumerable, string, PropertyDescriptor> CalculateAggregateFunc()
    {
        return (items, property, pd) =>
        {
            var enumerableItems = items as IEnumerable<OrderInfo>;
            if (enumerableItems != null)
            {
                var values = enumerableItems.Select(item => Convert.ToDouble(pd.GetValue(item)));
                var count = values.Count();
                var avg = values.Average();
                var sumOfSquares = values.Select(val => (val - avg) * (val - avg)).Sum();
                this.StdDev = Math.Sqrt(sumOfSquares / count);
            }
        };
    }
}
```

### 2. Register Custom Aggregate

```csharp
sfDataGrid.TableSummaryRows.Add(new GridTableSummaryRow
{
    ShowSummaryInRow = true,
    Title = "Standard Deviation: {StdDevPrice}",
    SummaryColumns = new ObservableCollection<ISummaryColumn>
    {
        new GridSummaryColumn
        {
            Name = "StdDevPrice",
            CustomAggregate = new CustomAggregate(),
            MappingName = "UnitPrice",
            SummaryType = SummaryType.Custom,
            Format = "{StdDev:N2}"
        }
    }
});
```

## Format Strings

Use standard .NET format strings:

| Format | Example | Output |
|--------|---------|--------|
| `{Sum:C}` | Currency | $1,234.56 |
| `{Average:N2}` | Number (2 decimals) | 123.45 |
| `{Count:D}` | Decimal integer | 1234 |
| `{Max:P}` | Percentage | 75.00% |

**Custom Format:**
```xml
Format="'Total Sales: {Sum:C} (Avg: {Average:C})'"
```

## Common Scenarios

### Scenario 1: Multiple Table Summaries

```xml
<dataGrid:SfDataGrid.TableSummaryRows>
    <!-- Top summary -->
    <dataGrid:GridTableSummaryRow Position="Top" 
                                  ShowSummaryInRow="True"
                                  Title="Data Overview" />
    
    <!-- Bottom summary with totals -->
    <dataGrid:GridTableSummaryRow Position="Bottom" ShowSummaryInRow="False">
        <dataGrid:GridSummaryRow.SummaryColumns>
            <dataGrid:GridSummaryColumn Name="Total" MappingName="UnitPrice"
                                        SummaryType="DoubleAggregate"
                                        Format="'Total: {Sum:C}'" />
        </dataGrid:GridSummaryRow.SummaryColumns>
    </dataGrid:GridTableSummaryRow>
</dataGrid:SfDataGrid.TableSummaryRows>
```

### Scenario 2: Group with Caption and Group Summaries

```xml
<dataGrid:SfDataGrid AllowGrouping="True">
    <!-- Caption in group header -->
    <dataGrid:SfDataGrid.CaptionSummaryRow>
        <dataGrid:GridSummaryRow Title="{Key}: {ItemsCount} items" />
    </dataGrid:SfDataGrid.CaptionSummaryRow>
    
    <!-- Details at end of group -->
    <dataGrid:SfDataGrid.GroupSummaryRows>
        <dataGrid:GridSummaryRow ShowSummaryInRow="False">
            <dataGrid:GridSummaryRow.SummaryColumns>
                <dataGrid:GridSummaryColumn Name="Total" MappingName="UnitPrice"
                                            SummaryType="DoubleAggregate"
                                            Format="'SubTotal: {Sum:C}'" />
            </dataGrid:GridSummaryRow.SummaryColumns>
        </dataGrid:GridSummaryRow>
    </dataGrid:SfDataGrid.GroupSummaryRows>
</dataGrid:SfDataGrid>
```

## Best Practices

1. Use `ShowSummaryInRow="False"` for column-aligned summaries
2. Use `ShowSummaryInRow="True"` with `Title` for custom layouts
3. Choose appropriate `SummaryType` for data type
4. Format currency with `{Sum:C}` for proper localization
5. Use caption summaries for compact group information
6. Limit summary calculations for performance with large datasets
