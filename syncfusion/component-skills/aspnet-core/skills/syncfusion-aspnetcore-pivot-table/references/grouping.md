# Grouping in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Grouping](#enable-grouping)
- [Number Grouping](#number-grouping)
- [Date Grouping](#date-grouping)
- [Custom Grouping](#custom-grouping)
- [Runtime Grouping](#runtime-grouping)
- [Ungrouping](#ungrouping)
- [Best Practices](#best-practices)

## Overview

Grouping automatically organizes date, time, number, and string data into meaningful categories. For example, date fields can be formatted by year, quarter, month, and other time periods. Number fields can be grouped into ranges such as 1-5, 6-10, and so on. These grouped fields function as individual fields, allowing users to drag them between different axes (rows, columns, values, filters) to create dynamic pivot tables.

> **Note:** This feature is applicable only for relational data sources (not OLAP). Only one type of grouping can be applied to a field at a time.

## Enable Grouping

Enable grouping by setting `allowGrouping="true"` in the PivotView:

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" width="100%" height="350" showGroupingBar="true" allowGrouping="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C"></e-field>
            <e-field name="Product_ID" format="N0"></e-field>
            <e-field name="Date" type="date" format="dd/MM/yyyy-hh:mm a"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Date"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Product_ID" caption="Product ID"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Unit Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Key Properties:**
- `allowGrouping="true"` - Enable grouping feature
- `showGroupingBar="true"` - Display grouping bar for UI operations
- `expandAll="false"` - Control initial expansion state

## Number Grouping

Number grouping organizes numerical data into different ranges, such as 1-5, 6-10, and so on.

### Enable Number Grouping Programmatically

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" width="100%" height="350" showGroupingBar="true" allowGrouping="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C"></e-field>
            <e-field name="Product_ID" format="N0"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Product_ID" caption="Product ID"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Products"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Unit Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
        <e-groupsettings>
            <e-field name="Product_ID" type="Number" rangeInterval="2" startingAt="1004" endingAt="1008"></e-field>
        </e-groupsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Configuration Properties:**
- `name` - Field name to group (must match data field)
- `type="Number"` - Specify number grouping
- `rangeInterval` - Interval between groups (e.g., 2, 5, 10)
- `startingAt` - Starting number for range
- `endingAt` - Ending number for range

**Example Results:**
- rangeInterval=2 with startingAt=1004, endingAt=1008: 1004-1005, 1006-1007, 1008, Out of Range

### Runtime Number Grouping

Users can group via UI:
1. Right-click on number field header in pivot table
2. Select **Group** from context menu
3. Configure range settings in dialog
4. Select **Interval by** value
5. Click OK to apply grouping

## Date Grouping

Date grouping organizes date and time data into hierarchical segments such as years, quarters, months, days, hours, minutes, or seconds.

### Enable Date Grouping Programmatically

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" width="100%" height="350" showGroupingBar="true" allowGrouping="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C"></e-field>
            <e-field name="Date" type="date" format="dd/MM/yyyy-hh:mm a"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Date"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Product_Categories" caption="Product Categories"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Unit Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
        <e-groupsettings>
            <e-field name="Date" type="Date" groupInterval="@(new string[]{ "Years", "Months"})" startingAt="2015-07-01" endingAt="2017-07-31"></e-field>
        </e-groupsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Configuration Properties:**
- `name` - Date field name to group
- `type="Date"` - Specify date grouping
- `groupInterval` - Array of grouping levels (Years, Quarters, Months, Days, Hours, Minutes, Seconds)
- `startingAt` - Start date (format: YYYY-MM-DD)
- `endingAt` - End date (format: YYYY-MM-DD)

**Supported Group Intervals:**
- Years - Group by year (2021, 2022, 2023, etc.)
- Quarters - Group by quarter (Q1 2021, Q2 2021, etc.)
- Months - Group by month (Jan 2021, Feb 2021, etc.)
- Days - Group by day (Jan 1 2021, Jan 2 2021, etc.)
- Hours - Group by hour (12:00 PM, 1:00 PM, etc.)
- Minutes - Group by minute (12:00, 12:01, etc.)
- Seconds - Group by second (12:00:00, 12:00:01, etc.)

### Result Fields Created

When grouping by Years and Months, two new fields are created:
- **Years (Date)** - Contains year values
- **Months (Date)** - Contains month values

These grouped fields can be used like regular fields in row/column/value areas.

### Runtime Date Grouping

Users can group via UI:
1. Right-click on date field header in pivot table
2. Select **Group** from context menu
3. Configure date range (Starting at, Ending at)
4. Select **Interval by** options (Years, Months, etc.)
5. Click OK to apply grouping

## Custom Grouping

Custom grouping allows you to group existing field values under custom category names using the tag helper approach. This is configured programmatically without requiring pre-processed data.

### Enable Custom Grouping Programmatically

```html
@using Syncfusion.EJ2.PivotView

<ejs-pivotview id="PivotView" width="100%" height="350" showGroupingBar="true" allowGrouping="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C"></e-field>
            <e-field name="Product_ID" format="N0"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Product_ID" caption="Product ID"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Unit Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
        <e-groupsettings>
            <e-field name="Products" type="Custom" caption="Product Category">
                <e-customgroups>
                    <e-group groupName="Clothings" items="@(new string[] { "Gloves", "Jerseys", "Shorts" })"></e-group>
                    <e-group groupName="Accessories" items="@(new string[] { "Caps", "Hats" })"></e-group>
                </e-customgroups>
            </e-field>
        </e-groupsettings>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Configuration Properties:**
- `name` - Field name to apply custom grouping (must match data field)
- `type="Custom"` - Specify custom grouping type
- `caption` - Display name for the custom grouped field
- `e-customgroups` - Container for custom group definitions
  - `groupName` - Name/title for the custom group (e.g., "Clothings")
  - `items` - Array of field values to group under this name (e.g., "Gloves", "Jerseys", "Shorts")

**How It Works:**
- Headers listed in `items` are grouped under the specified `groupName`
- Headers NOT included in any items array are displayed under their original names
- New custom grouped field appears in the pivot table and Field List

**Example Result:**
- Original values: Gloves, Jerseys, Shorts → Grouped as "Clothings"
- Original values: Caps, Hats → Grouped as "Accessories"
- Other products remain under their original names

## Runtime Grouping

Users can apply grouping through the UI without code:

**Steps:**
1. Right-click on row or column header in pivot table
2. Select **Group** from the context menu
3. Configure grouping options in dialog (range, interval, type)
4. Click OK to apply grouping
5. New grouped field appears in Field List

## Ungrouping

Remove applied grouping by:

1. Right-click on grouped header (e.g., "Years (Date)")
2. Select **Ungroup** from context menu
3. Grouped field is removed
4. Original ungrouped values appear

**Result:** All records show original values instead of grouped ranges.

## Grouping Keywords

**Number Grouping Results:**
- Range format: 1001-1005, 1006-1010, etc.
- Out of Range: Records outside specified range
- Example: 1001-1005, 1006-1010, Out of Range

**Date Grouping Results:**
- Years: 2021, 2022, 2023
- Quarters: Q1 2021, Q2 2021, Q3 2021, Q4 2021
- Months: Jan 2021, Feb 2021, Mar 2021, etc.
- Days: 2021-01-01, 2021-01-02, 2021-01-03, etc.
- Hours: 12:00 AM, 1:00 AM, 2:00 AM, etc.

**String Grouping:**
- First letter groups: A, B, C, D, ... Z
- Custom groups: Budget, Premium (requires pre-processing)

## Best Practices

✓ **Enable on load:** Use programmatic grouping for consistent initial state
✓ **User control:** Show Grouping Bar for runtime grouping operations
✓ **Pre-process large data:** Group server-side for datasets >100k rows
✓ **Avoid multiple groupings:** Apply one grouping type per field
✓ **Test performance:** Measure impact on large datasets before production
✓ **Clear naming:** Use descriptive field names for grouped results
✓ **Date ranges:** Set appropriate startingAt/endingAt for date grouping
✓ **Interval selection:** Choose meaningful intervals (Years+Months, not all 7 levels)
✓ **Deferred update:** Use when grouping with other configuration changes
✓ **Documentation:** Explain grouping behavior to users (especially Out of Range)

❌ **Avoid:** Grouping on initial load without Grouping Bar (no ungrouping option)
❌ **Avoid:** Very small intervals on large datasets (performance impact)
❌ **Avoid:** Multiple grouping types on same field
❌ **Avoid:** Grouping >10 fields simultaneously (UI clutter)
❌ **Avoid:** Not documenting custom grouping logic to users
