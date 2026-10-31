# Field List in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Field List](#enable-field-list)
- [Field List Modes](#field-list-modes)
- [Field List Features](#field-list-features)
- [Standalone PivotFieldList](#standalone-pivotfieldlist)
- [Search Desired Field](#search-desired-field)
- [Group Fields Under Desired Folder Name](#group-fields-under-desired-folder-name)
- [Remove Specific Field(s) from Displaying](#remove-specific-fields-from-displaying)
- [Changing Aggregation Type of Value Fields at Runtime](#changing-aggregation-type-of-value-fields-at-runtime)
- [Set Caption to Fields Which Isn't Bound to the Report](#set-caption-to-fields-which-isnt-bound-to-the-report)
- [Show Values Button](#show-values-button)
- [Best Practices](#best-practices)

## Overview

The Field List UI component enables dynamic field management without requiring code changes. Users can:
- Drag/drop fields between rows, columns, values, and filters
- Modify aggregation types
- Apply filtering and sorting
- Rearrange field order for various analyses

## Enable Field List

Use `.ShowFieldList(true)` to display the field list panel:

```html
@using Syncfusion.EJ2.PivotView
@model IEnumerable<dynamic>

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows =>
        {
            rows.Name("Country").Add();
        })
        .Columns(columns =>
        {
            columns.Name("Year").Add();
        })
        .Values(values =>
        {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
        })).ShowFieldList(true).Height("450").Width("100%").Render()
```

## Field List Modes

### Popup Mode (Default)

Field list appears in a popup/modal dialog:

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowFieldList(true).Height("450").Width("100%").Render()
```

**User Experience:**
- Click "Field List" button to open panel
- Drag fields to reshape pivot
- Close panel to see full table

### Fixed Mode (Always Visible)

**IMPORTANT:** To have a fixed/always-visible field list, you MUST use a standalone `PivotFieldList` **component**, not `ShowFieldList` on the Pivot Table.

- `ShowFieldList(true)` on PivotView = Popup field list (built-in, modal)
- Standalone `PivotFieldList` = Fixed field list (always visible, sidebar)

See the [Standalone PivotFieldList](#standalone-pivotfieldlist) section below for the correct implementation.

## Field List Features

### Drag Fields to Axes

Users can:
- **Drag to Rows:** Adds hierarchical row grouping
- **Drag to Columns:** Adds column grouping
- **Drag to Values:** Adds numerical aggregation
- **Drag to Filters:** Adds filtering dimension

**Available Fields → Rows/Columns/Values/Filters:**

- Click field and drag to target area
- Reorder fields within same area
- Drag out to remove field
- Drop between fields to insert

### Modify Aggregation Types

Click dropdown on value fields to change aggregation:

```
Values Section:
  [ Sales ▼ ]  ← Click for Sum, Avg, Count, Min, Max, etc.
```

Available options depend on field data type:
- Numeric: Sum, Avg, Count, Min, Max, DistinctCount, etc.
- String/Date: Count, DistinctCount only

### Filter Members

Click filter icon next to dimension field:

```
Rows Section:
  [ Country 🔍 ]  ← Click to filter
```

Opens filter dialog to:
- Include/exclude specific members
- Search member list
- Filter by patterns

### Sort Fields

Click sort icon to toggle sort direction:

```
Columns Section:
  [ Year ↑ ]  ← Click to change sort order
```

Toggles: Ascending → Descending → None

## Standalone PivotFieldList (Fixed/Always-Visible Mode)

Use the `PivotFieldList` component as a **separate control** to have a permanently visible field list panel. This is the ONLY way to achieve fixed/always-visible field list mode.

**Separate Panel Layout with Fixed Field List:**

```html
@using Syncfusion.EJ2.PivotView

<!-- Pivot table synchronized with field list -->
@Html.EJS().PivotView("PivotView").Height("300").EnginePopulated("onGridEnginePopulate").Render()

<br />

<!-- Fixed field list panel -->
@Html.EJS().PivotFieldList("PivotFieldList").RenderMode(Mode.Fixed).DataSourceSettings(dataSource => dataSource
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .ExpandAll(false)
        .EnableSorting(true)
        .Rows(rows =>
        {
            rows.Name("Country").Add();
            rows.Name("Products").Add();
        })
        .Columns(columns =>
        {
            columns.Name("Year").Add();
            columns.Name("Quarter").Add();
        })
        .Values(values =>
        {
            values.Name("Sales").Caption("Units Sold").Add();
            values.Name("Amount").Caption("Sold Amount").Add();
        })).EnginePopulated("onFieldListEnginePopulate").AllowCalculatedField(true).Render()

<style>
    #PivotFieldList {
        width: 400px;
    }
</style>

<script>
    var pivotObj; var fieldlistObj;
    function onGridEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        if (fieldlistObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function onFieldListEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        fieldlistObj.updateView(pivotObj);
    }
</script>
```

**Key Points:**
- PivotView uses `EnginePopulated` event to synchronize with field list
- PivotFieldList uses `EnginePopulated` event to update pivot table
- Field list **width** is set via CSS, not component properties
- JavaScript functions handle bidirectional synchronization using `update()` and `updateView()` methods
- Fixed layout keeps field list **permanently visible** on the page
- When user drags fields in the field list, Pivot Table updates instantly via event handlers
- Use this approach for exploratory data analysis where users frequently reorganize fields

**Benefits:**
- More space for pivot table
- Field list always visible
- Better for large datasets
- Improved UX for frequent field changes

## Common Patterns

**Fixed Field List + Pivot (Side-by-Side):**

```html
@using Syncfusion.EJ2.PivotView

<div style="display: flex;">
    <div style="width: 25%; border-right: 1px solid #ccc;">
        <!-- Field List here -->
        @Html.EJS().PivotFieldList("PivotFieldList").RenderMode(Mode.Fixed).DataSourceSettings(ds => ds
                .DataSource((IEnumerable<object>)ViewBag.DataSource)
                .Rows(rows => { rows.Name("Country").Add(); })
                .Columns(columns => { columns.Name("Year").Add(); })
                .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); }))
        .EnginePopulated("onFieldListEnginePopulate").Render()
    </div>
    <div style="flex: 1;">
        <!-- Pivot Table here -->
        @Html.EJS().PivotView("PivotView").Height("600").EnginePopulated("onGridEnginePopulate").Render()
    </div>
</div>

<style>
    #PivotFieldList {
        width: 100%;
        height: 600px;
    }
</style>

<script>
    var pivotObj; var fieldlistObj;
    function onGridEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        if (fieldlistObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function onFieldListEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        fieldlistObj.updateView(pivotObj);
    }
</script>
```

**Popup Field List + Grouping Bar:**

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowFieldList(true).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

## Search Desired Field

Enable field search to help users quickly find specific fields:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).ShowFieldList(true).EnableFieldSearching(true).Height("450").Width("100%").Render()
```

Search box appears at top of field list panel - users type field name to filter available fields instantly.

## Group Fields Under Desired Folder Name

Organize related fields into custom folder groups using `GroupName`:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .FieldMapping(fieldMapping =>
        {
            fieldMapping.Name("Quarter").GroupName("Time Period").Add();
            fieldMapping.Name("Products").GroupName("Product Information").Add();
            fieldMapping.Name("Amount").GroupName("Metrics").Caption("Sold Amount").Add();
        })).ShowFieldList(true).Height("450").Width("100%").Render()
```

Fields appear grouped in folders (Time Period, Product Information, Metrics) in the field list UI.

## Remove Specific Field(s) from Displaying

Hide fields from field list using `ExcludeFields` property:
using Syncfusion.EJ2.PivotView

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .ExcludeFields(new string[] { "InternalID", "RowNumber", "Status" })).ShowFieldList(true).Height("450").Width("100%").Render()
```

Excluded fields don't appear in field list but data is still available from data source.

## Changing Aggregation Type of Value Fields at Runtime

Users can change aggregation types directly in the field list UI by clicking the dropdown on value fields:
using Syncfusion.EJ2.PivotView

```html
@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values =>
        {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Avg).Add();
        })).ShowFieldList(true).Height("450").Width("100%").Render()
```

In field list, users see dropdown on value fields:
- Click dropdown on "Sales" to change Sum → Average, Count, Min, Max, etc.
- Selection updates pivot table instantly
- Different aggregations available based on field data type

## Set Caption to Fields Which Isn't Bound to the Report

Add custom display names to fields that are not yet added to the pivot using `FieldMapping`:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })
        .FieldMapping(fieldMapping =>
        {
            fieldMapping.Name("Quarter").Caption("Quarter of Year").Add();
            fieldMapping.Name("Products").Caption("Product Name").Add();
        })).ShowFieldList(true).Height("450").Width("100%").Render()
```

In field list, these fields display with custom captions instead of original field names.

## Show Values Button

Display a "Show Values" button in field list to add multiple value fields to rows/columns:

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("PivotView").Height("300").EnginePopulated("onGridEnginePopulate").Render()

<br />

@Html.EJS().PivotFieldList("PivotFieldList").RenderMode(Mode.Fixed).DataSourceSettings(ds => ds
        .DataSource((IEnumerable<object>)ViewBag.DataSource)
        .Rows(rows => { rows.Name("Country").Add(); })
        .Columns(columns => { columns.Name("Year").Add(); })
        .Values(values =>
        {
            values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
            values.Name("Quantity").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Count).Add();
        })).ShowValuesButton(true).EnginePopulated("onFieldListEnginePopulate").Render()

<style>
    #PivotFieldList {
        width: 400px;
    }
</style>

<script>
    var pivotObj; var fieldlistObj;
    function onGridEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        if (fieldlistObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    function onFieldListEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('PivotFieldList').ej2_instances[0];
        fieldlistObj.updateView(pivotObj);
    }
</script>
```

"Show Values" button appears at bottom of field list - click to add measure names field to rows/columns axis for side-by-side comparison of multiple values.

## Best Practices

- **Popup mode:** Default; use for standard dashboards
- **Fixed mode:** Use for exploratory analysis and "what-if" scenarios
- **Search fields:** Enable for 10+ field collections to improve UX
- **Group fields:** Organize by department, category, or time period
- **Exclude fields:** Hide internal/system fields from user view
- **Captions:** Use friendly names instead of database field names
- **Combination:** Use Field List + Grouping Bar for maximum flexibility
- **Performance:** Test with actual field count on target browsers
- **Standalone list:** For specialized layouts with separate field management
- **Accessibility:** Ensure drag/drop is keyboard accessible
