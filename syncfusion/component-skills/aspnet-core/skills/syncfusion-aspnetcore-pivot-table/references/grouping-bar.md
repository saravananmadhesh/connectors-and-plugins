# Grouping Bar in ASP.NET Core Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Grouping Bar](#enable-grouping-bar)
- [Show or Hide Fields Panel](#show-or-hide-fields-panel)
- [Show or Hide All Filter Icon](#show-or-hide-all-filter-icon)
- [Show or Hide Specific Filter Icon](#show-or-hide-specific-filter-icon)
- [Show or Hide All Sort Icon](#show-or-hide-all-sort-icon)
- [Show or Hide Specific Sort Icon](#show-or-hide-specific-sort-icon)
- [Show or Hide All Remove Icon](#show-or-hide-all-remove-icon)
- [Show or Hide Specific Remove Icon](#show-or-hide-specific-remove-icon)
- [Disable All Fields from Dragging](#disable-all-fields-from-dragging)
- [Disable Specific Field from Dragging](#disable-specific-field-from-dragging)
- [Change Aggregation Type at Runtime](#change-aggregation-type-at-runtime)
- [Show Values Button](#show-values-button)
- [Best Practices](#best-practices)

## Overview

The Grouping Bar provides an interactive UI for users to reshape the Pivot Table by dragging and dropping fields between Row, Column, Value, and Filter axes at runtime. Users can arrange fields directly in the grouping bar without opening additional dialogs.

**Key capabilities:**
- Drag/drop fields between axes for real-time reshaping
- Quick field sorting and filtering
- Remove fields from layout
- Change aggregation types
- Filter field members on-the-fly

## Enable Grouping Bar

Use `showGroupingBar="true"` to display the grouping bar above the pivot table:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Show or Hide Fields Panel

The fields panel displays all available fields from the data source that aren't currently used in the report. Use `<e-groupingBarSettings>` to show or hide it:

**Show Fields Panel (Default):**
```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-groupingBarSettings showFieldsPanel="true"></e-groupingBarSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Hide Fields Panel:**
```html
<e-groupingBarSettings showFieldsPanel="false"></e-groupingBarSettings>
```

Users can drag unused fields from the panel to any axis to add them to the report.

## Show or Hide All Filter Icon

Control the visibility of filter icons for all fields in the grouping bar:

**Hide All Filter Icons:**
```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-groupingBarSettings showFilterIcon="false"></e-groupingBarSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

When visible, clicking the filter icon lets users select/deselect field members to filter the data.

## Show or Hide Specific Filter Icon

Hide the filter icon for individual fields:

```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products" showFilterIcon="false"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

This allows fine-grained control over which fields can be filtered.

## Show or Hide All Sort Icon

Control the visibility of sort icons for all fields:

**Hide All Sort Icons:**
```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-groupingBarSettings showSortIcon="false"></e-groupingBarSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

When visible, clicking the sort icon cycles through ascending, descending, and no sort.

## Show or Hide Specific Sort Icon

Hide the sort icon for individual fields:

```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Quarter" showSortIcon="false"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Show or Hide All Remove Icon

Control the visibility of remove icons for all fields:

**Hide All Remove Icons:**
```html
<e-groupingBarSettings showRemoveIcon="false"></e-groupingBarSettings>
```

When hidden, users cannot remove fields using the icon (but can still drag them out).

## Show or Hide Specific Remove Icon

Hide the remove icon for individual fields to prevent accidental deletion:

```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country" showRemoveIcon="false"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" showRemoveIcon="false"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Disable All Fields from Dragging

Lock the entire pivot layout by preventing all drag-and-drop operations:

```html
<e-groupingBarSettings allowDragAndDrop="false"></e-groupingBarSettings>
```

This freezes the current report structure so users cannot rearrange fields.

## Disable Specific Field from Dragging

Prevent dragging for individual fields while allowing others to be moved:

```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country" allowDragAndDrop="false"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" allowDragAndDrop="false"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Change Aggregation Type at Runtime

Value fields show a dropdown icon that lets users change how values are calculated:

```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true">
    <e-groupingBarSettings showValueTypeIcon="true"></e-groupingBarSettings>
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Total Sales" type="Sum"></e-field>
            <e-field name="Quantity" caption="Total Quantity" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

Users can select from Sum, Avg, Count, Min, Max, DistinctCount, and other aggregation types.

## Show Values Button

Enable the Values button in the grouping bar to let users reposition the "Values" field:

```html
<ejs-pivotview id="PivotView" height="300" showGroupingBar="true" showValuesButton="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" caption="Total Sales" type="Sum"></e-field>
            <e-field name="Profit" caption="Total Profit" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Important:** The Values button only appears when:
- Using relational data sources
- Multiple value fields exist in the report
- Set `showValuesButton="true"`

## Best Practices

- **Always enable for interactive analysis:** Grouping bar is the primary UI for users to explore data dynamically
- **Use field panel:** Enable `showFieldsPanel="true"` (default) to let users add available fields
- **Clear visual feedback:** Keep default icons visible (`showFilterIcon`, `showSortIcon`, etc.) for user clarity
- **Prevent accidental actions:** Hide remove icon for critical fields using `showRemoveIcon="false"`
- **Lock sensitive layouts:** Disable drag-and-drop for key fields using `allowDragAndDrop="false"`
- **Simplify UI:** Use field-level properties to control visibility for specific fields
- **Consistent behavior:** Use global settings in `<e-groupingBarSettings>` before field-specific settings
- **Testing:** Test field dragging, filtering, and sorting with actual data
- **Field naming:** Use clear, user-friendly captions in field definitions
