# Aggregates — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Built-in Aggregate Types](#built-in-aggregate-types)
- [Footer Aggregate](#footer-aggregate)
- [Child Aggregate](#child-aggregate)
- [Custom Aggregate](#custom-aggregate)
- [Multiple Aggregate Types](#multiple-aggregate-types-on-one-column)
- [Aggregate in Export](#aggregate-in-excelexport-export)

## When to Use This Skill

Use this reference when you need to:
- Display summary values (Sum, Average, Min, Max, Count) for columns
- Show aggregate results in grid footers
- Display aggregates for child rows in parent row footers
- Create custom aggregate calculations with custom functions
- Show multiple aggregate types on one column
- Include aggregates in Excel/PDF export
- Use built-in or custom aggregate types
- Format aggregate display with templates

## Overview

Aggregates display summary values (Sum, Average, etc.) in the TreeGrid footer and optionally in parent row footers for child data. Configure with `<e-treegrid-aggregates>`.

---

## Built-in Aggregate Types

| Type | Description |
|------|-------------|
| `Sum` | Sum of all values |
| `Average` | Average of all values |
| `Min` | Minimum value |
| `Max` | Maximum value |
| `Count` | Count of records |
| `TrueCount` | Count of `true` values in a boolean column |
| `FalseCount` | Count of `false` values in a boolean column |

Multiple types can be set on a single column as an array.

---

## Footer Aggregate

Display aggregate values in the TreeGrid footer row:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-aggregates>
        <e-treegrid-aggregate>
            <e-treegrid-aggregate-columns>
                <e-treegrid-aggregate-column field="Duration" type="Sum"
                    footerTemplate="Total: ${Sum}"></e-treegrid-aggregate-column>
                <e-treegrid-aggregate-column field="Duration" type="Average"
                    footerTemplate="Avg: ${Average}"></e-treegrid-aggregate-column>
            </e-treegrid-aggregate-columns>
        </e-treegrid-aggregate>
    </e-treegrid-aggregates>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Child Aggregate

Show aggregate values for child rows in the parent row footer using `showChildSummary="true"`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" height="260"
              childMapping="Children" treeColumnIndex="1">
    <e-treegrid-aggregates>
        <e-treegrid-aggregate showChildSummary="true">
            <e-treegrid-aggregate-columns>
                <e-treegrid-aggregate-column field="Approved" type="TrueCount" columnName="Approved"
                    footerTemplate="Approved: ${TrueCount}"></e-treegrid-aggregate-column>
            </e-treegrid-aggregate-columns>
        </e-treegrid-aggregate>
    </e-treegrid-aggregates>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   textAlign="Right" width="80"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="100"></e-treegrid-column>
        <e-treegrid-column field="Approved" headerText="Approved" type="boolean"
                           textAlign="Center" displayAsCheckBox="true" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

- `showChildSummary="true"` → aggregate shows in each parent row's footer
- `showChildSummary="false"` (default) → aggregate shows only in the global footer

---

## Custom Aggregate

Provide a custom function to calculate the aggregate value. Use the `customAggregate` property and set `type="Custom"`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.datasource" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-aggregates>
        <e-treegrid-aggregate>
            <e-treegrid-aggregate-columns>
                <e-treegrid-aggregate-column field="Priority" type="Custom"
                    customAggregate="customAggFn"
                    footerTemplate="High Priority: ${Custom}"></e-treegrid-aggregate-column>
            </e-treegrid-aggregate-columns>
        </e-treegrid-aggregate>
    </e-treegrid-aggregates>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function customAggFn(data, column) {
        return data.result.filter(function(item) {
            return item['Priority'] === 'High';
        }).length;
    }
</script>
```

---

## Multiple Aggregate Types on One Column

```cshtml
<e-treegrid-aggregate-column field="Duration" type="Sum,Average"
    footerTemplate="Sum: ${Sum} | Avg: ${Average}"></e-treegrid-aggregate-column>
```

> Multiple types on a single column require using a template to display them.

---

## Aggregate in Excel/PDF Export

To include custom aggregates in export, use the `excelAggregateQueryCellInfo` or `pdfAggregateQueryCellInfo` event to customize the exported cells.

```cshtml
<ejs-treegrid id="TreeGrid" ... excelAggregateQueryCellInfo="onExcelAggCell">
    ...
</ejs-treegrid>

<script>
    function onExcelAggCell(args) {
        if (args.column.field === 'Priority') {
            args.value = 'High Priority Count: ' + customAggFn(args.data, args.column);
        }
    }
</script>
```
