# Hyperlinks in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Hyperlinks for All Cells](#enable-hyperlinks-for-all-cells)
- [Enable Hyperlinks for Specific Cell Types](#enable-hyperlinks-for-specific-cell-types)
- [Hyperlink with Header Text](#hyperlink-with-header-text)
- [Hyperlink with Drilled Members](#hyperlink-with-drilled-members)
- [Hyperlink Click Event](#hyperlink-click-event)
- [Best Practices](#best-practices)

## Overview

The Pivot Table provides built-in support for displaying hyperlinks within cells, enhancing interactivity and allowing users to navigate to related information. Hyperlinks can be applied selectively to:

- Row headers
- Column headers
- Value cells
- Summary cells

**Important:** By default, hyperlinks are **disabled** for all cells in the Pivot Table.

## Enable Hyperlinks for All Cells

Set `showHyperlink="true"` in `<e-hyperlinkSettings>` to enable hyperlinks across all cell types:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
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
    <e-hyperlinkSettings showHyperlink="true"></e-hyperlinkSettings>
</ejs-pivotview>
```

**Properties:**
- `showHyperlink="true"` - Enable hyperlinks for all cell types

## Enable Hyperlinks for Specific Cell Types

Control hyperlinks granularly by enabling only specific cell types:

**Row Headers Only:**
```html
<ejs-pivotview id="PivotView" height="300">
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
    <e-hyperlinkSettings showRowHeaderHyperlink="true"></e-hyperlinkSettings>
</ejs-pivotview>
```

**Column Headers Only:**
```html
<e-hyperlinkSettings showColumnHeaderHyperlink="true"></e-hyperlinkSettings>
```

**Value Cells Only:**
```html
<e-hyperlinkSettings showValueCellHyperlink="true"></e-hyperlinkSettings>
```

**Summary Cells Only:**
```html
<e-hyperlinkSettings showSummaryCellHyperlink="true"></e-hyperlinkSettings>
```

**Multiple Cell Types:**
```html
<e-hyperlinkSettings showRowHeaderHyperlink="true" 
                     showValueCellHyperlink="true"
                     showSummaryCellHyperlink="true"></e-hyperlinkSettings>
```

**Available Properties:**
- `showHyperlink="true"` - Enable hyperlinks for all cells
- `showRowHeaderHyperlink="true"` - Hyperlinks on row headers
- `showColumnHeaderHyperlink="true"` - Hyperlinks on column headers
- `showValueCellHyperlink="true"` - Hyperlinks on value cells
- `showSummaryCellHyperlink="true"` - Hyperlinks on summary cells

## Hyperlink with Header Text

Enable hyperlinks only for specific header members using `headerText` property:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
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
    <e-hyperlinkSettings headerText="FY 2015.Q1.Units Sold"></e-hyperlinkSettings>
</ejs-pivotview>
```

**Usage:**
- `headerText="USA"` - Hyperlink only on "USA" header
- `headerText="FY 2015"` - Hyperlink only on "FY 2015" header
- `headerText="FY 2015.Q1"` - Hyperlink on specific hierarchy level

## Hyperlink with Drilled Members

Combine hyperlinks with specific drilled members:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-drilledmembers>
            <e-field name="Country" items="@ViewBag.countryMembers"></e-field>
            <e-field name="Year" items="@ViewBag.yearMembers"></e-field>
        </e-drilledmembers>
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
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
    <e-hyperlinkSettings showHyperlink="true"></e-hyperlinkSettings>
</ejs-pivotview>
```

**Backend Code (C#):**
```csharp
public IActionResult Index()
{
    ViewBag.countryMembers = new string[] { "USA", "Canada" };
    ViewBag.yearMembers = new string[] { "FY 2015" };
    ViewBag.DataSource = GetPivotData();
    return View();
}
```

## Hyperlink Click Event

Handle hyperlink clicks using `hyperLinkCellClick` event:

```html
<ejs-pivotview id="PivotView" height="300" hyperLinkCellClick="onHyperlinkClick">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" useGrouping="true"></e-field>
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
    <e-hyperlinkSettings showHyperlink="true"></e-hyperlinkSettings>
</ejs-pivotview>

<script>
function onHyperlinkClick(args) {
    // args.currentCell - Clicked cell element
    // args.currentTarget - Target element
    // args.rowHeaders - Array of row header values
    // args.columnHeaders - Array of column header values
    // args.value - Cell value
    
    var country = args.rowHeaders ? args.rowHeaders[0] : '';
    var year = args.columnHeaders ? args.columnHeaders[0] : '';
    var value = args.value;
    
    // Navigate to details page
    window.open('/details?country=' + country + '&year=' + year, '_blank');
}
</script>
```

**Event Arguments:**
- `currentCell` - The clicked cell DOM element
- `currentTarget` - Target element
- `rowHeaders` - Array of row header context values
- `columnHeaders` - Array of column header context values
- `value` - Aggregated cell value

## Best Practices

✓ **Enable for analysis** - Use hyperlinks to drill into supporting data
✓ **Apply to value cells** - Most common use case for detailed analysis
✓ **Use with row/column headers** - Navigate to member details
✓ **Handle click events** - Navigate to appropriate detail pages
✓ **Combine with drilling** - Expand drilled members with hyperlinks
✓ **Test all cell types** - Verify expected behavior for each type

❌ **Avoid:** Enabling hyperlinks on all cells unnecessarily
❌ **Avoid:** Hyperlinks without proper click handling
❌ **Avoid:** Complex conditions without clear user indication
❌ **Avoid:** Navigation to error-prone URLs without validation
