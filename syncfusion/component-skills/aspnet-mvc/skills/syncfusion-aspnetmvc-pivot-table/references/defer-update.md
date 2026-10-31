# Defer Update in ASP.NET MVC Pivot Table

## Overview

Defer Update batches field changes (drag/drop operations) without refreshing the pivot table until explicitly applied. This significantly improves performance when making multiple configuration changes to layout, particularly with large datasets.

**Key Behavior:**
- User drags fields to different axes
- Pivot table layout does NOT refresh after each drag
- "UPDATE" button appears in Grouping Bar
- User clicks UPDATE to apply all changes at once
- Single refresh for all accumulated changes

## Enable Defer Update

Place `.AllowDeferLayoutUpdate(true)` **directly on the PivotView** (NOT inside GroupingBarSettings):

```html
@using Syncfusion.EJ2.PivotView
@model IEnumerable<dynamic>

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => {
        rows.Name("Country").Add();
    })
    .Columns(columns => {
        columns.Name("Year").Add();
    })
    .Values(values => {
        values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add();
    })).AllowDeferLayoutUpdate(true).ShowGroupingBar(true).Height("450").Width("100%").Render()
```

**IMPORTANT:** `AllowDeferLayoutUpdate()` is a PivotView-level property. It is **NOT** configured inside `GroupingBarSettings()`.

### With Additional Settings

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDeferLayoutUpdate(true).ShowGroupingBar(true).ShowFieldList(true).Height("450").Width("100%").Render()
```

## How It Works (User Workflow)

1. **User drags field** from Available Fields to Rows axis
   - Pivot table layout remains unchanged
   - No calculation or rendering

2. **User drags another field** to Columns axis
   - Layout still doesn't update
   - Changes queued

3. **UPDATE button appears** in Grouping Bar
   - User can continue making changes without delays

4. **User clicks UPDATE button**
   - All accumulated changes applied at once
   - Pivot table refreshes once with new configuration
   - Single data calculation

5. **Grouped chart updates** if PivotChart is shown

## Performance Benefits

| Scenario | Without Defer | With Defer |
|----------|---------------|-----------|
| 1 field drag | 1 refresh | 1 refresh (same) |
| 5 field drags | 5 refreshes | 1 refresh (5x faster) |
| 3 rows + 2 cols | 5 renders | 1 render |
| Large dataset | Significant lag | Responsive interaction |

## When to Enable

✅ **Enable Defer Update:**
- Large datasets (100k+ rows)
- Grouping Bar is visible (users making layout changes)
- Complex aggregations
- Field reorganization workflows

❌ **Disable Defer Update:**
- Small datasets (<1000 rows)
- Single filter/sort changes
- Simple read-only views
- When immediate feedback is critical

## Common Patterns

**Interactive Analysis Screen:**

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDeferLayoutUpdate(true).ShowGroupingBar(true).ShowFieldList(true).GroupingBarSettings(gbs => gbs.ShowValueTypeIcon(true).ShowFieldsPanel(true)).Height("600").Width("100%").Render()
```

**With Grouping Bar and Virtual Scroll:**

```html
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("pivotview").DataSourceSettings(ds => ds
    .DataSource((IEnumerable<object>)ViewBag.DataSource)
    .Rows(rows => { rows.Name("Country").Add(); })
    .Columns(columns => { columns.Name("Year").Add(); })
    .Values(values => { values.Name("Sales").Type(Syncfusion.EJ2.PivotView.SummaryTypes.Sum).Add(); })).AllowDeferLayoutUpdate(true).ShowGroupingBar(true).EnableVirtualization(true).Height("450").Width("100%").Render()
```

## Defer Update with Stand-alone Field List

The Field List can be rendered as a separate, fixed-position component in the page layout. Enable Defer Update in stand-alone Field List to batch field changes without immediate pivot table refresh.

**Setup Requirements:**
- Set `RenderMode(Mode.Fixed)` on PivotFieldList for static positioning
- Set `AllowDeferLayoutUpdate(true)` on both PivotView and PivotFieldList
- Use `EnginePopulated` events to synchronize between Field List and Pivot Table
- Use `update()` and `updateView()` methods for data source synchronization

### Stand-alone Field List with Deferred Updates

```csharp
@using Syncfusion.EJ2.PivotView

@Html.EJS().PivotView("PivotView").Height("300").AllowDeferLayoutUpdate(true).EnginePopulated("onGridEnginePopulate").Render()

<br />

@Html.EJS().PivotFieldList("Static_FieldList").RenderMode(Mode.Fixed).DataSourceSettings(dataSource => dataSource.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false).EnableSorting(true).FormatSettings(formatsettings =>
{
    formatsettings.Name("Amount").Format("C0").MaximumSignificantDigits(10).MinimumSignificantDigits(1).UseGrouping(true).Add();
}).Rows(rows =>
{
    rows.Name("Country").Add(); rows.Name("Products").Add();
}).Columns(columns =>
{
    columns.Name("Year").Caption("Year").Add(); columns.Name("Quarter").Add();
}).Values(values =>
{
    values.Name("Sold").Caption("Units Sold").Add(); values.Name("Amount").Caption("Sold Amount").Add();
})).EnginePopulated("onFieldListEnginePopulate").AllowDeferLayoutUpdate(true).Render()


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
            fieldlistObj.update(pivotObj);  // Sync field list to pivot table
        }
    }
    
    function onFieldListEnginePopulate(args) {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        fieldlistObj = document.getElementById('Static_FieldList').ej2_instances[0];
        if (fieldlistObj.isRequiredUpdate) {
            fieldlistObj.updateView(pivotObj);  // Sync pivot table to field list
        }
        pivotObj.notify('ui-update', pivotObj);
        fieldlistObj.notify('tree-view-update', fieldlistObj);
    }
</script>
```

**How It Works:**

1. **PivotFieldList with Mode.Fixed** - Field List renders in static position (typically sidebar)
2. **AllowDeferLayoutUpdate(true) on both** - Both components batch changes without refresh
3. **EnginePopulated events** - Triggered when pivot table/field list data updates
4. **update(pivotObj)** - Synchronizes field list state to match pivot table state
5. **updateView(pivotObj)** - Synchronizes pivot table state to match field list state
6. **notify() calls** - Updates UI elements (tree-view, grid) after synchronization
7. **User drags fields in Field List** - Changes queue until UPDATE button clicked
8. **Single refresh** - All changes applied simultaneously

**Key Properties:**

| Property | Location | Purpose |
|----------|----------|---------|
| `RenderMode(Mode.Fixed)` | PivotFieldList | Renders field list as static component |
| `AllowDeferLayoutUpdate(true)` | PivotView | Enables defer on pivot table |
| `AllowDeferLayoutUpdate(true)` | PivotFieldList | Enables defer on field list |
| `EnginePopulated(eventName)` | Both | Fires when data engine updates |
| `update(pivotObj)` | FieldList method | Syncs field list to pivot |
| `updateView(pivotObj)` | FieldList method | Syncs pivot to field list |

**Styling for Fixed Position:**

```css
#Static_FieldList {
    width: 400px;              /* Set width for sidebar */
    position: fixed;            /* Optional: fix to screen */
    height: 100vh;              /* Optional: full height */
    overflow-y: auto;           /* Optional: scrollable */
}
```

**When to Use Stand-alone Field List with Defer:**

✅ **Use:**
- Dashboard layouts with side panel
- Large datasets requiring intensive computation
- Multiple users analyzing different dimensions
- Long-running field reorganization workflows
- Exploratory analysis interfaces

❌ **Avoid:**
- Small, embedded field lists
- Immediate feedback required
- Simple filter-only operations

## Combining with Other Features

**Defer + Virtual Scrolling + Grouping Bar:**
- All three work together seamlessly
- For very large datasets (1M+ rows)
- Maximum performance for interactive analysis

**Defer + Field List + Grouping Bar:**
- Users have two UI options to reshape pivot
- Both respect deferred updates
- Recommended for exploratory analysis

## Best Practices

- **Enable for large datasets:** Default to enabled for 100k+ rows
- **Show with Grouping Bar:** Defer update is most useful with Grouping Bar
- **Stand-alone Field List:** Use with RenderMode.Fixed for dash boards and side panels
- **Synchronize components:** Always use EnginePopulated events when using field list
- **Event handlers:** Implement both update() and updateView() methods for bidirectional sync
- **Large value sets:** Enable when 20+ fields are available
- **Data complexity:** Enable for aggregations that require significant computation
- **User guidance:** Hint to users that changes batch until UPDATE is clicked
- **Notify UI:** Use notify() methods after synchronization to update tree-view and grid
- **Performance testing:** Test with your actual data to confirm benefits
- **Accessibility:** Ensure UPDATE button is visually distinct and accessible
- **Fixed positioning:** Use CSS to style stand-alone field list width and positioning
- **Module injection:** Ensure PivotChart module is injected if charts are used with field list
