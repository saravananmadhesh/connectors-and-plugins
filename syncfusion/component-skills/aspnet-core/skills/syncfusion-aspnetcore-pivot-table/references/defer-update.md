# Defer Update in Pivot Table

## Overview

Defer Update batches field changes (drag/drop operations) without refreshing the pivot table until explicitly applied. This significantly improves performance when making multiple configuration changes to layout, particularly with large datasets.

**Key Behavior:**
- User drags fields to different axes
- Pivot table layout does NOT refresh after each drag
- "UPDATE" button appears in Field List or Grouping Bar
- User clicks UPDATE to apply all changes at once
- Single refresh for all accumulated changes

## Enable Defer Update

Set `allowDeferLayoutUpdate="true"` **directly on the ejs-pivotview element**:

```html
<ejs-pivotview id="PivotView" height="450" allowDeferLayoutUpdate="true" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**IMPORTANT:** `allowDeferLayoutUpdate="true"` is set on `ejs-pivotview`, NOT as a sub-element.

## How It Works (User Workflow)

1. **User drags field** from Available Fields to Rows axis
   - Pivot table layout remains unchanged
   - No calculation or rendering

2. **User drags another field** to Columns axis
   - Layout still doesn't update
   - Changes queued

3. **UPDATE button appears** in Field List panel
   - User can continue making changes without delays
   - Multiple field reordering without waits

4. **User clicks UPDATE button**
   - All accumulated changes applied at once
   - Pivot table refreshes once with new configuration
   - Single data calculation

5. **Pivot Chart updates** if display option includes chart

## Performance Benefits

| Scenario | Without Defer | With Defer |
|----------|---------------|-----------|
| 1 field drag | 1 refresh | 1 refresh (same) |
| 5 field drags | 5 refreshes | 1 refresh (5x faster) |
| 3 rows + 2 cols | 5 renders | 1 render |
| Large dataset (1M rows) | Significant lag | Responsive interaction |

## When to Enable

✅ **Enable Defer Update:**
- Large datasets (100k+ rows)
- Field List or Grouping Bar is visible
- Complex aggregations requiring significant calculation
- Interactive analysis workflows with multiple field reordering

❌ **Disable Defer Update:**
- Small datasets (<1000 rows)
- Single filter/sort changes
- Simple read-only pivot tables
- When immediate feedback is critical

## With Field List (Popup)

```html
<ejs-pivotview id="PivotView" height="450" 
    allowDeferLayoutUpdate="true" 
    showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

Field List shows the UPDATE button when defer is enabled. Users drag fields in the list and click UPDATE when ready.

## With Grouping Bar

```html
<ejs-pivotview id="PivotView" height="450" 
    allowDeferLayoutUpdate="true" 
    showGroupingBar="true"
    enableVirtualization="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

The Grouping Bar also respects defer update. Drag fields in the grouping bar, click UPDATE button.

## With Static Field List

For stand-alone Field List positioned separately from the pivot table:

```html
<ejs-pivotview id="PivotView" height="450" 
    allowDeferLayoutUpdate="true"
    enginePopulated="onGridEnginePopulate">
</ejs-pivotview>

<ejs-pivotfieldlist id="Static_FieldList" 
    renderMode="Fixed" 
    allowDeferLayoutUpdate="true"
    enginePopulated="onFieldListEnginePopulate">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-fieldlist-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-fieldlist-rows>
        <e-fieldlist-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-fieldlist-columns>
        <e-fieldlist-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-fieldlist-values>
    </e-datasourcesettings>
</ejs-pivotfieldlist>

<style>
    #Static_FieldList {
        width: 400px;
    }
</style>

<script>
    var pivotObj; var fieldlistObj;
    
    function onGridEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('Static_FieldList').ej2_instances[0];
        if (fieldlistObj) {
            fieldlistObj.update(pivotObj);
        }
    }
    
    function onFieldListEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('Static_FieldList').ej2_instances[0];
        if (fieldlistObj.isRequiredUpdate) {
            fieldlistObj.updateView(pivotObj);
        }
        pivotObj.notify('ui-update', pivotObj);
        fieldlistObj.notify('tree-view-update', fieldlistObj);
    }
</script>
```

**Key elements:**
- `<ejs-pivotfieldlist>` - Separate field list component
- `renderMode="Fixed"` - Static positioning (not popup)
- `enginePopulated="onFieldListEnginePopulate"` - Event to synchronize
- `fieldlistObj.update()` - Sync field list with pivot data
- `fieldlistObj.updateView()` - Update pivot with field list changes

## Common Patterns

**Interactive Analysis with Large Dataset:**

```html
<ejs-pivotview id="PivotView" height="600"
    allowDeferLayoutUpdate="true"
    showGroupingBar="true"
    showFieldList="true"
    enableVirtualization="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

- Defer reduces layout rendering from 5+ redraws to 1
- Virtual scrolling handles large data
- Users can comfortably reorganize layout

## Defer Update Restrictions

✗ Does **NOT** defer:
- Programmatic field changes via JavaScript
- Filter/sort changes made through buttons
- Aggregation type changes via buttons
- Only affects UI drag/drop operations

## Important Notes

- `allowDeferLayoutUpdate="true"` placed **directly on ejs-pivotview element**
- UPDATE button appears automatically when defer is enabled
- Works with **Field List**, **Grouping Bar**, and **Static Field List**
- Significantly improves performance with **large datasets** and **multiple field operations**
- Requires proper event binding for **static field list** synchronization
