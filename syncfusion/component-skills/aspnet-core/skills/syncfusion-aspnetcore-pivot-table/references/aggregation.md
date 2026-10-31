# Aggregation in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Aggregation Types Summary](#aggregation-types-summary)
- [Configuring Aggregation via Code](#configuring-aggregation-via-code)
- [Complex Aggregations](#complex-aggregations)
- [Limiting Aggregation Types](#limiting-aggregation-types)
- [Hiding Aggregation Type from Button Text](#hiding-aggregation-type-from-button-text)
- [Hiding Aggregation Type Icon from UI](#hiding-aggregation-type-icon-from-ui)
- [Dynamic Aggregation Changes](#dynamic-aggregation-changes)
- [Events](#events)
- [Important Notes](#important-notes)
- [Performance Considerations](#performance-considerations)

## Overview

End users can perform calculations on groups of values (specifically for value fields placed in the value axis) by using different aggregation types. By default, values are combined by summing them. The Pivot Table provides 20+ built-in aggregation types to analyze data in different ways.

> **Important**: Numeric fields support all aggregation types listed below. Fields of type string, date, datetime, boolean support only **Count** and **DistinctCount** aggregation.

## Aggregation Types Summary

The Pivot Table supports the following aggregation types for value fields:

| Type | Description |
|------|-------------|
| Sum | Displays the total sum for the selected field values |
| Product | Displays the product of the selected field values |
| Count | Displays the number of records for the selected field |
| DistinctCount | Displays the number of unique records for the selected field |
| Min | Displays the minimum value for the selected field |
| Max | Displays the maximum value for the selected field |
| Avg | Displays the average (mean) of the selected field values |
| Median | Displays the median value for the selected field |
| Index | Displays the index value for the selected field data |
| PopulationStDev | Displays the standard deviation of the population for the selected field |
| SampleStDev | Displays the sample standard deviation for the selected field |
| PopulationVar | Displays the variance of the population for the selected field |
| SampleVar | Displays the sample variance for the selected field |
| RunningTotals | Displays the running total for the selected field values |
| PercentageOfRunningTotals | Cumulative percentage of running totals (client-side engine only) |
| DifferenceFrom | Displays the pivot table values with difference from the value of the base item in the base field |
| PercentageOfDifferenceFrom | Displays the pivot table values with percentage difference from the value of the base item in the base field |
| PercentageOfGrandTotal | Displays the pivot table values with percentage of grand total of all values |
| PercentageOfColumnTotal | Displays the pivot table values in each column with percentage of total values for the column |
| PercentageOfRowTotal | Displays the pivot table values in each row with percentage of total values for the row |
| PercentageOfParentTotal | Displays the pivot table values with percentage of total of all values based on selected field |
| PercentageOfParentColumnTotal | Displays the pivot table values with percentage of its parent total in each column |
| PercentageOfParentRowTotal | Displays the pivot table values with percentage of its parent total in each row |
| CalculatedField | Displays the pivot table with calculated field values. Allows user to create a new calculated field alone |

## Configuring Aggregation via Code

For each value field, the aggregation type can be set using the `type` property in the `e-values` section of `e-datasourcesettings`. By default, the aggregation type is **Sum** for numeric fields and **Count** for non-numeric fields.

```html
<ejs-pivotview id="pivotview">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
            <e-field name="Quantity" type="Avg"></e-field>
            <e-field name="Orders" type="Count"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Complex Aggregations

Aggregation types like **DifferenceFrom**, **PercentageOfDifferenceFrom**, and **PercentageOfParentTotal** require additional properties to specify the base field and item for comparison.

### Properties for Complex Aggregations

- **`type`**: Sets the aggregate type of the field
- **`baseField`**: Specifies the field to aggregate the values against
- **`baseItem`**: Specifies the member within the base field to aggregate the values against (used with DifferenceFrom and PercentageOfDifferenceFrom)

### DifferenceFrom

Compare each value against a base field member. The aggregation type **DifferenceFrom** compares the specified field and its corresponding member as input, and its value is compared across other members in the same field and across different fields to formulate an appropriate output value.

```html
<ejs-pivotview id="pivotview">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales" type="DifferenceFrom" 
                baseField="Year" baseItem="FY 2021"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Example**: If you set `baseField="Year"` and `baseItem="FY 2021"`, each sales value will show the difference compared to the sales in FY 2021.

### PercentageOfDifferenceFrom

Shows percentage difference from a base item:

```html
<e-field name="Sales" type="PercentageOfDifferenceFrom" 
    baseField="Year" baseItem="FY 2021"></e-field>
```

### PercentageOfParentTotal

Calculate percentage relative to parent group total. This aggregation type requires only the `baseField` property.

```html
<ejs-pivotview id="pivotview">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales" type="PercentageOfParentTotal" 
                baseField="Country"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Dynamic Aggregation Changes at Runtime

Users can dynamically modify the aggregation type for value fields through the UI at runtime. Value fields displayed in the grouping bar and field list include a dropdown icon that allows selection from various aggregation types (e.g., Sum, Average, Count). Once a new aggregation type is selected, the pivot table updates instantly to reflect the change.

To enable this functionality:
1. Enable field list with `showFieldList="true"`
2. Enable grouping bar with `showGroupingBar="true"`
3. Users will see dropdown icons next to value fields
4. Click the dropdown to select a different aggregation type

## Limiting Aggregation Types

By default, the dropdown menu for value fields includes all available aggregation types. However, you can customize this menu to display only specific aggregation types relevant to your application using the `aggregateTypes` property. This allows you to tailor the user experience by limiting the options to those that best fit your use case.

```html
<ejs-pivotview id="pivotview" aggregateTypes="@(new[] { "Sum", "Avg", "Count" })">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Controller Code:**
```csharp
public ActionResult Index()
{
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

**Result**: Users will only see "Sum", "Avg", and "Count" options in the aggregation type dropdown menu.

## Hiding Aggregation Type from Button Text

Hide the aggregation type prefix (e.g., show "Sales" instead of "Sum of Sales"):

```html
<ejs-pivotview id="pivotview">
    <e-datasourcesettings showAggregationOnValueField="false">
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Hiding Aggregation Type Icon from UI

By default, the dropdown icon to change the aggregation type is visible in the grouping bar. To hide this icon, set the `showValueTypeIcon` property within `e-groupingBarSettings` to **false**.

```html
<ejs-pivotview id="pivotview" showGroupingBar="true">
    <e-groupingbarsettings showValueTypeIcon="false">
    </e-groupingbarsettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows><e-field name="Country"></e-field></e-rows>
        <e-columns><e-field name="Year"></e-field></e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Note:** The aggregation type icon can only be hidden in the Grouping Bar, not in the Field List.

## Events

### AggregateCellInfo

The `aggregateCellInfo` event triggers each time a value cell is rendered. This allows users to override the cell's value or skip formatting. The event provides the following parameters:

- **`fieldName`**: Holds current cell's field name
- **`row`**: Holds current cell's row value
- **`column`**: Holds current cell's column value
- **`value`**: Holds value of current cell
- **`cellSets`**: Holds raw data for the aggregated value cell
- **`rowCellType`**: Holds row cell type value
- **`columnCellType`**: Holds column cell type value
- **`aggregateType`**: Holds aggregate type of the cell
- **`skipFormatting`**: Boolean property, allows to skip formatting if applied

### ActionBegin

The `actionBegin` event triggers when clicking and selecting the aggregate type via the dropdown icon in the value field button. This allows identification of the current action being performed at runtime. Parameters include:

- **`dataSourceSettings`**: Contains the current data source settings
- **`actionName`**: Provides the name of the current action (e.g., "Aggregate field")
- **`fieldInfo`**: Contains information regarding the selected value field
- **`cancel`**: Allows restricting the current action by setting to `true`

### ActionComplete

The `actionComplete` event is triggered when a UI action is completed, such as changing the aggregation type. Parameters include:

- **`dataSourceSettings`**: The current data source settings
- **`actionName`**: Specifies the completed action name (e.g., "Field aggregated")
- **`fieldInfo`**: Contains information about the selected value field
- **`actionInfo`**: Defines the unique information about the current UI action

### ActionFailure

The `actionFailure` event is triggered when a UI action fails to produce the expected result. Parameters include:

- **`actionName`**: Specifies the name of the failed action
- **`errorInfo`**: Contains detailed error information related to the failed UI action

## Important Notes

- **String/Date fields** support only Count and DistinctCount aggregation types
- **Numeric fields** support all aggregation types listed in the table above
- **Data compression**: When enabled, disables Avg, PopulationStDev, SampleStDev, PopulationVar, and SampleVar (these are converted to Sum aggregation)
- **Calculated fields** can use existing fields with any aggregation type
- **Default aggregation**: Numeric fields default to **Sum**, non-numeric fields default to **Count**
- When all members are unavailable or inappropriate in the include/exclude filter items, they will be ignored
- Complex aggregations (DifferenceFrom, PercentageOfDifferenceFrom, PercentageOfParentTotal) require baseField and sometimes baseItem properties

## Performance Considerations

- Aggregation computation is automatic during sorting, filtering, and drilling operations
- For **large datasets** (>1M rows), use **server-side aggregation** for better performance
- **Data compression** can improve aggregation performance by reducing unique records, but limits available aggregation types
- Complex aggregations (Variance, StDev, Median) take longer on large datasets
- Use `aggregateTypes` property to limit dropdown options and improve UI performance
- Server-side pivot engine is recommended for datasets exceeding 500,000 records

## Best Practices

1. **Choose appropriate aggregation types**: Use Sum for totals, Avg for averages, Count for record counts
2. **Use DifferenceFrom for variance analysis**: Compare values against a baseline period (e.g., prior year, prior month)
3. **Use percentage aggregations for proportional analysis**: PercentageOfGrandTotal, PercentageOfRowTotal, PercentageOfColumnTotal
4. **Limit aggregation types in dropdown**: Use `aggregateTypes` to show only relevant options to users
5. **Enable data compression for large datasets**: Improves performance but limits aggregation options
6. **Use server-side pivot engine**: For datasets > 500K records, offload aggregation to the server
7. **Hide aggregation type from button text**: Use `showAggregationOnValueField="false"` for cleaner UI
8. **Consider calculated fields**: Create custom calculations using multiple fields with different aggregations
