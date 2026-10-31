# Tooltips in Pivot Table

## Overview

Tooltips display contextual information when users hover over pivot table cells, showing row headers, column headers, and values. Tooltips are **enabled by default** and display cell value along with row and column header information.

## Enable/Disable Tooltips

The `showTooltip` property controls tooltip visibility. Default is `true`.

### Enable Tooltips (Default)

```html
<ejs-pivotview id="PivotView" height="450" showTooltip="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
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

### Disable Tooltips

```html
<ejs-pivotview id="PivotView" height="450" showTooltip="false">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
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

## Default Tooltip Content

Default tooltip displays:
- **Row Headers** - Field names from row area
- **Column Headers** - Field names from column area  
- **Cell Value** - Aggregated value in the selected cell
- **Data Type Info** - Value type information

## Customize Tooltip with JavaScript

Create custom tooltips using the `dataBound` event and Syncfusion Tooltip component:

```html
<ejs-pivotview id="PivotView" height="450" dataBound="dataBound">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0"></e-field>
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
    function dataBound() {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        var headerTooltip;
        if (!headerTooltip) {
            // Create tooltip targeting all header cells
            headerTooltip = new ej.popups.Tooltip({
                target: 'td.e-rowsheader,th.e-columnsheader',
                beforeRender: beforeRender
            });
            headerTooltip.appendTo(pivotObj.element);
        }
    }

    function beforeRender(args) {
        var pivotObj = document.getElementById('PivotView').ej2_instances[0];
        
        if (args.target.parentElement.querySelector('.e-rowsheader')) {
            // Custom content for row header tooltips
            var index = Number(args.target.getAttributeNode('index').value);
            var colIndex = Number(args.target.getAttributeNode('data-colindex').value);
            var cell = pivotObj.engineModule.pivotValues[index][colIndex];
            var valueText = cell.valueSort ? cell.valueSort : '';
            
            if (cell.formattedText !== 'Grand Total') {
                this.content = '<div>' +
                    'FieldName: ' + valueText.axis + '<br/>' +
                    'Text: ' + cell.formattedText + '</div>';
            } else {
                this.content = '<div>' +
                    'FieldName: ' + valueText.uniqueName + '<br/>' +
                    'Text: ' + cell.formattedText + '</div>';
            }
        } else {
            // Custom content for column header tooltips
            if (args.target.querySelector('.e-cellvalue')) {
                this.content = args.target.querySelector('.e-cellvalue').innerText;
            } else if (args.target.querySelector('.e-headertext')) {
                this.content = args.target.querySelector('.e-headertext').innerText;
            } else if (args.target.querySelector('.e-stackedheadercelldiv')) {
                this.content = args.target.querySelector('.e-stackedheadercelldiv').innerText;
            } else {
                this.content = '';
            }
        }
    }
</script>
```

## Pivot Chart Tooltips

When displaying a Pivot Chart, tooltips are configured through `ChartSettings`:

```html
<ejs-pivotview id="PivotView" height="300">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
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
    <e-chartSettings>
        <e-chartSeries type="Column"></e-chartSeries>
        <e-tooltip enableMarker="true" fill="#FFF" opacity="1">
            <e-tooltip-textstyle color="#000"></e-tooltip-textstyle>
            <e-tooltip-border color="#000"></e-tooltip-border>
        </e-tooltip>
    </e-chartSettings>
    <e-displayOption view="Chart"></e-displayOption>
</ejs-pivotview>
```

**Chart Tooltip Configuration:**
- `<e-tooltip>` - Tooltip element within `<e-chartSettings>`
- `enableMarker="true"` - Show marker on data point
- `fill="#FFF"` - Tooltip background color (white)
- `opacity="1"` - Full opacity (not transparent)
- `<e-tooltip-textstyle color="#000">` - Text color (black)
- `<e-tooltip-border color="#000">` - Border color (black)
- `<e-displayOption view="Chart">` - Show chart only (or "Both" for table + chart)

## Tooltip Best Practices

**Do's:**
✓ Enable tooltips when field headers are truncated
✓ Use custom tooltips for complex data relationships
✓ Show additional context (units, percentages) in tooltips

**Don'ts:**
✗ Don't disable tooltips on large datasets without reason (hurts usability)
✗ Don't create excessive custom tooltips (performance impact)
✗ Don't use tooltips as the only place for critical information

## Important Notes

- Tooltips are **enabled by default** via `showTooltip="true"`
- Custom tooltips require **dataBound event** and JavaScript Tooltip component
- Chart tooltips are configured **separately** through ChartSettings
- Tooltips work on **desktop hover** and **mobile touch** (long press)
