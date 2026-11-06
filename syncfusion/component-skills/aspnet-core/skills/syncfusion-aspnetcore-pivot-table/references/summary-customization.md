# Summary Customization in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Show/Hide Grand Totals](#showhide-grand-totals)
- [Grand Totals Position](#grand-totals-position)
- [Show/Hide Sub-Totals](#showhide-sub-totals)
- [Sub-Totals for Specific Fields](#sub-totals-for-specific-fields)
- [Sub-Totals Position](#sub-totals-position)
- [Toolbar Controls](#toolbar-controls)
- [Best Practices](#best-practices)

## Overview

Summary customization controls visibility and positioning of grand totals and subtotals, allowing clean data visualization and focused analysis. This feature helps reduce visual clutter, improve readability, and highlight specific data patterns.

## Show/Hide Grand Totals

Control grand total row and column display using `showGrandTotals` property:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true" showGrandTotals="false">
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

### Grand Total Properties

| Property | Values | Effect |
|----------|--------|--------|
| `showGrandTotals` | true \| false | Show/hide all grand totals |
| `showRowGrandTotals` | true \| false | Show/hide row grand total column |
| `showColumnGrandTotals` | true \| false | Show/hide column grand total row |

### Use Cases

✓ Hide grand totals for **focused field analysis**
✓ Hide row grand totals when **column totals sufficient**  
✓ Hide column grand totals when **row totals sufficient**

## Grand Totals Position

Control whether grand totals appear at top or bottom of the pivot:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" grandTotalsPosition="Top">
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

### Position Options

| Position | Description | Best For |
|----------|-------------|----------|
| **Top** | Grand totals at row/column beginning | Quick overview, summary-first reports |
| **Bottom** (Default) | Grand totals at row/column end | Standard reporting, standard layouts |

**Example - Top Position:**
```
Total       150K
USA         100K
Canada      50K
```

## Show/Hide Sub-Totals

Control subtotal display for detailed breakdowns:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true" showSubTotals="false">
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

### Sub-Total Properties

| Property | Values | Effect |
|----------|--------|--------|
| `showSubTotals` | true \| false | Show/hide all subtotals |
| `showRowSubTotals` | true \| false | Show/hide row subtotals |
| `showColumnSubTotals` | true \| false | Show/hide column subtotals |

### Use Cases

✓ Show all subtotals for **hierarchical analysis**
✓ Hide row subtotals to **focus on grand totals**
✓ Hide column subtotals to **reduce visual clutter** in wide pivots

## Sub-Totals for Specific Fields

Hide subtotals for individual fields while keeping others visible:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products" showSubTotals="false"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year" showSubTotals="false"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**Result:** 
- Products subtotals hidden 
- Year subtotals hidden
- Country and Quarter subtotals remain visible

**Use Case:** Hide subtotals for **low-level details**, keep subtotals for **high-level summaries**

## Sub-Totals Position

Control where subtotals appear within groups:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true" subTotalsPosition="Top">
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

**Position Options:**

| Position | Description | Layout |
|----------|-------------|--------|
| **Top** | Subtotals at group beginning | Summary first, then details |
| **Bottom** (Default) | Subtotals at group end | Details first, then summary |

**Example - Top Position:**
```
USA Subtotal    100K
  New York      50K
  California    50K
Canada Subtotal 80K
  Toronto       50K
  Vancouver     30K
```

## Toolbar Controls

Add toolbar buttons to dynamically toggle subtotals and grand totals:

```html
<ejs-pivotview id="pivotview" 
    showToolbar="true" 
    width="100%" 
    height="300" 
    toolbar="@(new List<string>() {"SubTotal", "GrandTotal" })">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
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

**Toolbar Items for Summary:**
- `SubTotal` - Toggle subtotal visibility
- `GrandTotal` - Toggle grand total visibility

**Use Case:** Allow **users to dynamically control** summary display without page reload.

## Advanced: Editing with Custom Edit Types

Combine summary customization with editing and custom column types:

```html
<ejs-pivotview id="PivotView" height="300" drillThrough="drillThrough">
    <e-editSettings allowAdding="true" allowDeleting="true" allowEditing="true" allowCommandColumns="true"></e-editSettings>
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

<script>
    function drillThrough(args) {
        for (var i = 0; i < args.gridColumns.length; i++) {
            if (args.gridColumns[i].field === 'Country') {
                args.gridColumns[i].editType = 'dropdownedit';
            }
        }
    }
</script>
```

**Features:**
- Edit source data in place
- Add/delete records
- Customize column edit types dynamically
- Drill-through event for customization

## Auto-Open Field List When Empty

Display field list automatically when no fields are configured:

```html
<ejs-pivotview id="PivotView" height="300" showFieldList="true" dataBound="ondataBound">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false" enableSorting="true" allowLabelFilter="true" allowValueFilter="true">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
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

<script>
    function ondataBound(args) {
        var pivotTableObj = document.getElementById('PivotView').ej2_instances[0];
        if (pivotTableObj) {
            if (pivotTableObj.dataSourceSettings.rows.length === 0 && 
                pivotTableObj.dataSourceSettings.columns.length === 0 &&
                pivotTableObj.dataSourceSettings.values.length === 0 && 
                pivotTableObj.dataSourceSettings.filters.length === 0) {
                pivotTableObj.pivotFieldListModule.dialogRenderer.onShowFieldList();
            }            
        }
    }
</script>
```

**Use Case:** Guide new users to configure pivot by **opening field list automatically** when pivot is empty.

## Best Practices

✓ **Readability:** Show grand totals for context, hide subtotals if too many fields
✓ **Performance:** Hide subtotals with 100+ rows to improve rendering speed
✓ **Consistency:** Maintain standard position (Top or Bottom) across reports
✓ **Print:** Verify total visibility before printing
✓ **Mobile:** Consider hiding subtotals on small screens to reduce scrolling
✓ **Analysis:** Use field-level `showSubTotals="false"` for focused hierarchical views
✓ **Drill-down:** Keep subtotals visible to show data hierarchy during drill operations

## Combination Examples

**Financial Summary - Hide Details:**
```html
<e-datasourcesettings showGrandTotals="true" showSubTotals="false">
    <!-- Only grand totals for executive summary -->
</e-datasourcesettings>
```

**Detailed Analysis - Keep All Summaries:**
```html
<e-datasourcesettings showGrandTotals="true" showSubTotals="true" subTotalsPosition="Top">
    <!-- All summaries for detailed analysis -->
</e-datasourcesettings>
```

**Minimum Clutter - Selective Summaries:**
```html
<e-rows>
    <e-field name="Country"></e-field>
    <e-field name="Region" showSubTotals="false"></e-field>
</e-rows>
<e-datasourcesettings showGrandTotals="true">
    <!-- Row grand totals, Country subtotals only -->
</e-datasourcesettings>
```

## Important Notes

- All summary properties are set on `<e-datasourcesettings>` element
- Field-level `showSubTotals` property overrides datasource setting
- Toolbar buttons provide **runtime toggle** (doesn't require page reload)
- Position settings apply to **both row and column** summaries
- Summary settings **combine with all other features** (filtering, sorting, drill-down)
- Grand totals calculated from **subtotal values**, not raw data
