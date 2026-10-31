# Hyperlinks in ASP.NET MVC Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable Hyperlinks](#enable-hyperlinks)
- [Hyperlink for All Cells](#hyperlink-for-all-cells)
- [Hyperlink for Specific Cell Types](#hyperlink-for-specific-cell-types)
- [Conditional Hyperlinks](#conditional-hyperlinks)
- [Styling Hyperlinks](#styling-hyperlinks)
- [Best Practices](#best-practices)

## Overview

The Pivot Table provides built-in support for displaying hyperlinks within cells, enhancing interactivity and allowing users to navigate to related information. Hyperlinks can be applied selectively to:

- Row headers
- Column headers
- Value cells
- Summary cells

**Important:** By default, hyperlinks are **disabled** for all cells in the Pivot Table.

## Enable Hyperlinks

Hyperlinks are controlled through the `HyperlinkSettings` property. The primary property to enable all hyperlinks is `ShowHyperlink`:

### Hyperlink for All Cells

Set `ShowHyperlink` to **true** to enable hyperlinks across all cell types:

```html
@using Syncfusion.EJ2.PivotView

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
        })).HyperlinkSettings(hs => hs.ShowHyperlink(true)).Width("100%").Height("450").Render()
```

## Hyperlink for Specific Cell Types

Control hyperlinks granularly using individual properties in `HyperlinkSettings`:

```html
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
        })).HyperlinkSettings(hs => hs.ShowRowHeaderHyperlink(true).ShowColumnHeaderHyperlink(true).ShowValueCellHyperlink(true).ShowSummaryCellHyperlink(true)).Width("100%").Height("450").Render()
```

### Available Hyperlink Properties

| Property | Description |
|----------|-------------|
| `ShowHyperlink` | Enables hyperlinks for all cells |
| `ShowRowHeaderHyperlink` | Enables hyperlinks only for row header cells |
| `ShowColumnHeaderHyperlink` | Enables hyperlinks only for column header cells |
| `ShowValueCellHyperlink` | Enables hyperlinks only for value cells (aggregated data) |
| `ShowSummaryCellHyperlink` | Enables hyperlinks only for summary cells (subtotals) |

## Conditional Hyperlinks

Apply hyperlinks based on specific conditions using `HeaderText` or `ConditionalSettings`:

### Hyperlinks Based on Header Text

Enable hyperlinks only for specific member names:

```html
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
        })).HyperlinkSettings(hs => hs
        .ShowRowHeaderHyperlink(true)
        .HeaderText("FY 2015.Q1.Units Sold")).Width("100%").Height("450").Render()
```

### Conditional Hyperlinks

Use `ConditionalSettings` for more advanced filtering based on cell values:

```csharp
@Html.EJS().PivotView("PivotView").DataSourceSettings(ds => ds
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
        })).HyperlinkSettings(hs => hs
        .ShowValueCellHyperlink(true)
        .ConditionalSettings(cs =>
        {
            cs.Measure("Sales")
                .Conditions(Syncfusion.EJ2.PivotView.Condition.GreaterThan)
                .Value1(5000)
                .Add();
        })).Height("450").Width("100%").Render()
```

**Condition Types:**
- `GreaterThan` - Value > threshold
- `LessThan` - Value < threshold
- `Equals` - Value equals threshold
- `Between` - Value between range
- `NotBetween` - Value outside range

## Handle Hyperlink Clicks

Respond to hyperlink clicks using the `HyperlinkCellClick` event. This event is triggered whenever a hyperlink cell is clicked, allowing you to customize the cell or retrieve information about it.

**Event Parameters:**
- `currentCell` - The clicked cell element that can be modified
- `cancel` - Set to `true` to prevent changes; set to `false` to allow interaction
- `data` - Contains detailed information about the clicked cell (value, row/column headers, position, summary status)
- `nativeEvent` - Original browser event for advanced event handling

### Basic Implementation

```csharp
@Html.EJS().PivotView("PivotView").DataSourceSettings(dataSource => dataSource.DataSource((IEnumerable<object>)ViewBag.DataSource).ExpandAll(false)
 .FormatSettings(formatsettings =>
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
 })).Height("300").HyperlinkCellClick("hyperlink").HyperlinkSettings(hyperlinksettings => hyperlinksettings.ShowRowHeaderHyperlink(true).CssClass("e-custom-class")).Render()

<style>
    .e-custom-class {
        color: #008cff;
        text-decoration: underline;
    }

        .e-custom-class:hover {
            color: red;
            text-decoration: none;
        }
</style>

<script>
    function hyperlink(args) {
        args.cancel = false;  // Allow interaction

        // Add custom data attribute for navigation
        args.currentCell.setAttribute("data-url", "https://ej2.syncfusion.com/");

        // Access cell information from data parameter
        console.log("Value: " + args.data.currentCell.value);
        console.log("Row Headers: " + args.data.rowHeaders);
        console.log("Column Headers: " + args.data.columnHeaders);
        console.log("Is Summary: " + args.data.isSummaryCell);
    }
</script>
```

### Advanced Example: Conditional Navigation

```html
<script>
    function hyperlink(args) {
        args.cancel = false;

        // Navigate based on cell type
        if (args.data.isSummaryCell) {
            var url = '/summary/' + args.data.value;
        } else if (args.data.isValueCell) {
            var url = '/detail/' + args.data.rowHeaders.join('-') + '/' + args.data.columnHeaders.join('-');
        } else {
            var url = '/member/' + args.data.currentCell.value;
        }

        // Add navigation URL
        args.currentCell.setAttribute("data-url", url);
        args.currentCell.onclick = function () {
            window.location.href = this.getAttribute("data-url");
        };
    }
</script>
```

## Styling Hyperlinks

Apply custom CSS styling to hyperlinks using the `CssClass` property:

```html
.HyperlinkSettings(hs => hs
    .ShowHyperlink(true)
    .CssClass("custom-hyperlink"))

<style>
    .custom-hyperlink {
        color: #0066cc;
        text-decoration: underline;
        font-weight: bold;
        cursor: pointer;
    }

        .custom-hyperlink:hover {
            color: #ff3300;
        }
</style>
```

## Best Practices

- **Use HyperlinkCellClick:** Always use the `HyperlinkCellClick` event (not `CellClick`) to handle hyperlink interactions
- **Event Parameters:** Access cell information via `args.data` (value, headers, position, type)
- **Set cancel to false:** Set `args.cancel = false` to enable hyperlink interaction
- **Use selectively:** Apply hyperlinks to the most important cells (value cells, specific headers)
- **Provide context:** Include meaningful cell data in the hyperlink destination
- **Visual feedback:** Style hyperlinks distinctly with CSS to indicate they are clickable
- **Default disabled:** Remember hyperlinks are disabled by default - explicitly enable them
- **Conditional availability:** Use `HeaderText` or `ConditionalSettings` to limit hyperlinks to relevant data
- **Mobile consideration:** Ensure hyperlinks are appropriately sized for touch devices
- **Performance:** Avoid enabling hyperlinks on every cell if not needed
- **Dynamic navigation:** Use cell data to construct URLs dynamically based on row/column context
