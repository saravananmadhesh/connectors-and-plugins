# Filter Operators in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Filter Operators Reference](#filter-operators-reference)
- [Using Filter Operators](#using-filter-operators)
- [Operator Examples](#operator-examples)

---

## Overview

The Grid supports 20+ filter operators for different data types. Set operators via `<e-grid-filterSettings>` columns configuration or the `filterByColumn()` method.

---

## Filter Operators Reference

### Complete Operators Table

| Operator | Type | Description | Data Types |
|----------|------|-------------|-----------|
| `startswith` | String | Field starts with value | String |
| `endswith` | String | Field ends with value | String |
| `contains` | String | Field contains value | String |
| `doesnotstartwith` | String | NOT starts with value | String |
| `doesnotendwith` | String | NOT ends with value | String |
| `doesnotcontain` | String | NOT contains value | String |
| `equal` | All | Exactly equals value | String, Number, Boolean, Date |
| `notequal` | All | Does NOT equal value | String, Number, Boolean, Date |
| `greaterthan` | Number/Date | Value > specified | Number, Date |
| `greaterthanorequal` | Number/Date | Value ≥ specified | Number, Date |
| `lessthan` | Number/Date | Value < specified | Number, Date |
| `lessthanorequal` | Number/Date | Value ≤ specified | Number, Date |
| `isnull` | All | Value IS null | String, Number, Date |
| `isnotnull` | All | Value IS NOT null | String, Number, Date |
| `isempty` | String | Value IS empty string | String |
| `isnotempty` | String | Value IS NOT empty | String |
| `between` | Number/Date | Within range (inclusive) | Number, Date |
| `notbetween` | Number/Date | Outside range | Number, Date |
| `in` | All | Matches any in list | String, Number, Date |
| `notin` | All | NOT in list | String, Number, Date |

### Default Operators by Column Type

| Column Type | Default Operator |
|-------------|-----------------|
| String | `startswith` |
| Number | `equal` |
| Boolean | `equal` |
| Date | `equal` |

---

## Using Filter Operators

### Via filterSettings (Initial Filters)

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-filterSettings type="Menu">
        <e-grid-filtercolumns>
            <!-- Freight > 100 -->
            <e-grid-filtercolumn field="Freight" 
                               operatorValue="greaterthan" 
                               value="100"></e-grid-filtercolumn>
            
            <!-- CustomerID starts with 'VIN' -->
            <e-grid-filtercolumn field="CustomerID" 
                               operatorValue="startswith" 
                               value="VIN" 
                               matchCase="false"></e-grid-filtercolumn>
            
            <!-- OrderDate between two dates -->
            <e-grid-filtercolumn field="OrderDate" 
                               operatorValue="between" 
                               value="2023-01-01" 
                               value2="2023-12-31"></e-grid-filtercolumn>
        </e-grid-filtercolumns>
    </e-grid-filterSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100" type="number"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120" type="string"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="100" type="number"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" width="130" type="date" format="yMd"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Via filterByColumn() (Programmatic)

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowFiltering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" type="number" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" type="string" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" type="number" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
var grid = document.getElementById('Grid').ej2_instances[0];

// Single filter
grid.filterByColumn('Freight', 'greaterthan', 100);

// Multiple independent filters (OR within column, AND between columns)
grid.filterByColumn('CustomerID', 'startswith', 'VIN');
grid.filterByColumn('OrderDate', 'greaterthanorequal', new Date(2023, 0, 1));
</script>
```

---

## Operator Examples

### String Operators

```cshtml
<script>
var grid = document.getElementById('Grid').ej2_instances[0];

// Starts with 'V'
grid.filterByColumn('CustomerID', 'startswith', 'V', 'and', false);

// Ends with 'ET'
grid.filterByColumn('CustomerID', 'endswith', 'ET', 'and', false);

// Contains 'NE'
grid.filterByColumn('CustomerID', 'contains', 'NE', 'and', false);

// Does not start with 'V'
grid.filterByColumn('CustomerID', 'doesnotstartwith', 'V', 'and', false);

// Does not contain 'T'
grid.filterByColumn('CustomerID', 'doesnotcontain', 'T', 'and', false);

// Equals exactly 'VINET'
grid.filterByColumn('CustomerID', 'equal', 'VINET', 'and', false);

// Not equal 'VINET'
grid.filterByColumn('CustomerID', 'notequal', 'VINET', 'and', false);

// Is empty
grid.filterByColumn('CustomerID', 'isempty', null, 'and', false);

// Is not empty
grid.filterByColumn('CustomerID', 'isnotempty', null, 'and', false);

// In list
grid.filterByColumn('CustomerID', 'in', ['VINET', 'TOMSP', 'HANAR'], 'and', false);

// Not in list
grid.filterByColumn('CustomerID', 'notin', ['VINET', 'TOMSP'], 'and', false);
</script>
```

### Number Operators

```cshtml
<script>
var grid = document.getElementById('Grid').ej2_instances[0];

// Equal to 100
grid.filterByColumn('Freight', 'equal', 100);

// Not equal
grid.filterByColumn('Freight', 'notequal', 100);

// Greater than 100
grid.filterByColumn('Freight', 'greaterthan', 100);

// Greater than or equal 100
grid.filterByColumn('Freight', 'greaterthanorequal', 100);

// Less than 50
grid.filterByColumn('Freight', 'lessthan', 50);

// Less than or equal 50
grid.filterByColumn('Freight', 'lessthanorequal', 50);

// Between 50 and 200
grid.filterByColumn('Freight', 'between', 50, 200);

// Not between 50 and 200
grid.filterByColumn('Freight', 'notbetween', 50, 200);

// Is null
grid.filterByColumn('Freight', 'isnull', null);

// Is not null
grid.filterByColumn('Freight', 'isnotnull', null);

// In list
grid.filterByColumn('Freight', 'in', [50, 100, 150, 200]);

// Not in list
grid.filterByColumn('Freight', 'notin', [50, 100]);
</script>
```

### Date Operators

```cshtml
<script>
var grid = document.getElementById('Grid').ej2_instances[0];

var startDate = new Date(2023, 0, 1);   // Jan 1, 2023
var endDate = new Date(2023, 11, 31);  // Dec 31, 2023
var filterDate = new Date(2023, 5, 15); // June 15, 2023

// Equal to date
grid.filterByColumn('OrderDate', 'equal', filterDate);

// Greater than date
grid.filterByColumn('OrderDate', 'greaterthan', filterDate);

// Less than date
grid.filterByColumn('OrderDate', 'lessthan', filterDate);

// Between two dates
grid.filterByColumn('OrderDate', 'between', startDate, endDate);

// Not between two dates
grid.filterByColumn('OrderDate', 'notbetween', startDate, endDate);

// Is null
grid.filterByColumn('OrderDate', 'isnull', null);

// Is not null
grid.filterByColumn('OrderDate', 'isnotnull', null);
</script>
```

### Boolean Operators

```cshtml
<script>
var grid = document.getElementById('Grid').ej2_instances[0];

// Equal to true
grid.filterByColumn('IsActive', 'equal', true);

// Equal to false
grid.filterByColumn('IsActive', 'equal', false);

// Not equal to true
grid.filterByColumn('IsActive', 'notequal', true);
</script>
```

---

## Key Points

1. **Operator names are lowercase**: Use `'greaterthan'`, not `'GreaterThan'`
2. **Between requires two values**: Use `between` with both start and end values
3. **Case sensitivity**: `matchCase` parameter controls case-sensitive string matching
4. **Logical operators**: Multiple filters use AND logic between columns, OR within same column
5. **Null/Empty checks**: Use `isnull`/`isnotnull` for null checks, `isempty`/`isnotempty` for empty strings
6. **Default operators**: If no operator specified, uses column type's default
