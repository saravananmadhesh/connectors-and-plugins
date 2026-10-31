# Sorting in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Sorting](#enable-sorting)
- [Member Sorting](#member-sorting)
- [Sort at Design-Time](#sort-at-design-time)
- [Multiple Sort Fields](#multiple-sort-fields)
- [Alphanumeric Sorting](#alphanumeric-sorting)
- [Custom Sort Order](#custom-sort-order)
- [Value Sorting](#value-sorting)
- [Multiple Axis Sorting](#multiple-axis-sorting)
- [Best Practices](#best-practices)

## Overview

Member sorting arranges field members (in rows and columns) in ascending or descending order. By default, sorting is enabled and field members are sorted in ascending order (A-Z, 0-9). Users can also change sort order through the Grouping Bar or Field List UI.

## Enable Sorting

Sorting is enabled by default through the `enableSorting` property in `<e-datasourcesettings>`. By default, `enableSorting` is **true**, allowing users to sort by clicking sort icons in the Grouping Bar or Field List.

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Important:** 
- By default, `enableSorting` is **true**, allowing users to sort by clicking sort icons
- If `enableSorting` is set to **false**, field members display in data source order and sort icons are removed from UI
- When `enableSorting` is true, you can programmatically configure initial sort order using `<e-sortsettings>`

## Member Sorting

Sort field members in rows and columns in ascending or descending order.

## Sort at Design-Time

Use `<e-sortsettings>` with individual `<e-field>` elements to configure sort order:

**Ascending Order (Default):**

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" enableSorting="true">
        <e-sortsettings>
            <e-field name="Country" order="Ascending"></e-field>
        </e-sortsettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Descending Order:**

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" enableSorting="true">
        <e-sortsettings>
            <e-field name="Year" order="Descending"></e-field>
        </e-sortsettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Multiple Sort Fields

Apply different sort orders to multiple fields:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" enableSorting="true" expandAll="false">
        <e-sortsettings>
            <e-field name="Country" order="Ascending"></e-field>
            <e-field name="Year" order="Descending"></e-field>
            <e-field name="Products" order="Ascending"></e-field>
        </e-sortsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Results:**
- Country sorted A-Z
- Year sorted Z-A (newest first)  
- Products sorted A-Z

## Alphanumeric Sorting

Sort numeric-prefixed members correctly using `dataType="number"`:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" enableSorting="true">
        <e-rows>
            <e-field name="ProductID" dataType="number"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Country"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Use Case:** Members like '71-AJ', '209-FB', '36-SW' should sort numerically:
- With `dataType="number"`: 36-SW, 71-AJ, 209-FB ✓
- Without: 209-FB, 36-SW, 71-AJ (alphabetical)

**Key Points:**
- `dataType="number"` enables numeric sorting on member names
- Sorts numbers at the beginning of strings in numerical order
- Applies to dimension fields in rows or columns
- Default is alphabetical sorting (not specified or set to "string")

## Custom Sort Order

Arrange members in a specific order independent of alphabet/numeric order using `membersOrder`:

**Use Case:** Quarters (Q1, Q2, Q3, Q4) or fiscal periods with non-alphabetic sequence

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-sortsettings>
            <e-field name="Country" order="Ascending" membersOrder="@ViewBag.countryOrder"></e-field>
            <e-field name="Year" order="Descending" membersOrder="@ViewBag.yearOrder"></e-field>
        </e-sortsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Production Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Backend Code (C#):**
```csharp
public IActionResult Index()
{
    // Custom country order
    ViewBag.countryOrder = new string[] { "USA", "Canada", "Germany", "France" };
    
    // Custom year order
    ViewBag.yearOrder = new string[] { "FY 2016", "FY 2015", "FY 2014" };
    
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

**Important:** All members that appear in data must be included in the `membersOrder` array. Missing members may not display.

## Value Sorting

Sort aggregated values (not dimension members) by clicking value field headers. Enable using `enableValueSorting` property:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" enableValueSorting="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**When Enabled:**
- Users can click value field headers to sort by column values
- Shows sort indicator (↑ ↓) on clickable headers
- Click header to toggle sort direction (Ascending → Descending)
- Applies to values axis (typically columns by default)

## Multiple Axis Sorting

Sort value fields simultaneously in both row and column axes for flexible data analysis:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" enableValueSorting="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-valuesortsettings columnHeaderText="FY 2015##Sold Amount" headerDelimiter="##" columnSortOrder="Descending" rowHeaderText="France" rowSortOrder="Ascending"></e-valuesortsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Amount" caption="Sold Amount"></e-field>
            <e-field name="Quantity" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Multiple Axis Configuration:**
- `columnHeaderText` - Column header hierarchy to sort (e.g., "FY 2015##Sold Amount")
- `headerDelimiter` - Separator between hierarchy levels (e.g., "##", "~", "-")
- `columnSortOrder` - Sort direction for column axis (Descending/Ascending)
- `rowHeaderText` - Specific row header to sort by (e.g., "France")
- `rowSortOrder` - Sort direction for row axis (Ascending/Descending)

## Best Practices

✓ **Alphabetic fields:** Use ascending (A-Z) for country, product names
✓ **Numeric fields:** Use descending for sales, quantity to show top values first
✓ **Date fields:** Use descending to show newest dates first
✓ **Alphanumeric members:** Apply `dataType="number"` for fields like "71-AJ", "209-FB"
✓ **Custom order:** Use for non-standard sequences (fiscal quarters, priority regions)
✓ **Value sorting:** Click headers to sort aggregated values; enable with `enableValueSorting="true"`
✓ **Multiple axis:** Use `columnHeaderText` and `rowHeaderText` for independent axis sorting
✓ **Performance:** Sorting is applied on client-side; enable Grouping Bar for user control
✓ **Field names:** Names in `<e-sortsettings>` must match data field names exactly (case-sensitive)
✓ **Consistency:** Apply consistent sort order across same field in different table sections
✓ **Delimiters:** Use clear delimiters ("~", "-", "|") for multi-level header hierarchies

❌ **Avoid:** Large datasets (100k+ records) with sorting enabled on load
❌ **Avoid:** Incomplete `membersOrder` arrays - include all data members
❌ **Avoid:** Mixing custom order with automatic ascending/descending
❌ **Avoid:** Complex multi-level sorting without clear user indication
