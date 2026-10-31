# Tooltips and Cell Selection

- [Tooltip Configuration](#tooltip-configuration)
  - [Enable Default Tooltip](#enable-default-tooltip)
  - [Tooltip Content](#tooltip-content)
  - [Disable Tooltips](#disable-tooltips)
- [Tooltip Templates](#tooltip-templates)
  - [Basic Template](#basic-template)
  - [Template Variables](#template-variables)
  - [Rich Text Templates](#rich-text-templates)
  - [Conditional Tooltips](#conditional-tooltips)
  - [Custom Data in Tooltips](#custom-data-in-tooltips)
- [Tooltip Appearance](#tooltip-appearance)
  - [Appearance Configuration](#appearance-configuration)
  - [Appearance Properties](#appearance-properties)
  - [Tooltip Style Examples](#tooltip-style-examples)
- [Cell Selection Modes](#cell-selection-modes)
  - [Enable Cell Selection](#enable-cell-selection)
  - [Single Cell Selection](#single-cell-selection)
  - [Multiple Cell Selection](#multiple-cell-selection)
  - [Selection Methods](#selection-methods)
- [Selection Events](#selection-events)
  - [Cell Selected Event](#cell-selected-event)
  - [Capture Selection Details](#capture-selection-details)
  - [Multiple Selection Handling](#multiple-selection-handling)
  - [Clear Selection](#clear-selection)
- [Advanced Selection](#advanced-selection)
  - [Selection Example: Capture Values](#selection-example-capture-values)
  - [Export Selected Data](#export-selected-data)
  - [Send to Server](#send-to-server)
  - [Complete Interactive Example](#complete-interactive-example)

## Tooltip Configuration

Tooltips display additional information when users hover over or tap HeatMap cells. In ASP.NET Core Razor Pages, keep the HeatMap markup in `Index.cshtml` and keep data, labels, palettes, and reusable styles in `Index.cshtml.cs`.

### Enable Default Tooltip

Use `showTooltip="true"` on the root HeatMap Tag Helper to enable tooltip display.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="heatmap"
    dataSource="@Model.SalesData"
    showTooltip="true">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

Default tooltip behavior:

- Displays information for the hovered cell.
- Shows contextual X-axis, Y-axis, and value details.
- Automatically positions the tooltip near the pointer.
- Works with mouse hover and touch interaction.

### Tooltip Content

The default tooltip usually represents the axis labels and cell value. For example:

```text
Month: Jan
Region: North
Value: 72
```

For custom tooltip content, use the `tooltipRender` event.

### Disable Tooltips

For very large datasets, disable tooltips to improve performance.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.LargeData"
    renderingMode="Canvas"
    showTooltip="false">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="XValue"
        yDataMapping="YValue"
        valueMapping="Value">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="false">
    </e-heatmap-cellsettings>
</ejs-heatmap>
```

Disable tooltips when:

- The dataset has thousands of cells.
- Tooltip interaction is not required.
- The HeatMap is used only for visual trend detection.
- Rendering performance is more important than cell-level details.

## Tooltip Templates

### Basic Template

Use the `tooltipRender` event to replace the default tooltip content.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="tooltipHeatmap"
    dataSource="@Model.SalesData"
    showTooltip="true"
    tooltipRender="onTooltipRender">

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onTooltipRender(args) {
        args.content = [
            args.xLabel + ' - ' + args.yLabel,
            'Sales: $' + args.value
        ];
    }
</script>
```

### Template Variables

Common tooltip event argument values include:

| Variable | Description | Example |
|----------|-------------|---------|
| `args.xLabel` | X-axis label of the hovered cell. | `Jan` |
| `args.yLabel` | Y-axis label of the hovered cell. | `North` |
| `args.value` | Cell value. | `1500` |
| `args.content` | Tooltip content collection that can be customized. | `Sales: 1500` |
| `args.data` | Original data item when available in the event argument. | Source row object |

### Rich Text Templates

Use HTML content when the tooltip needs rich formatting.

```cshtml
<ejs-heatmap
    id="richTooltipHeatmap"
    dataSource="@Model.SalesData"
    showTooltip="true"
    tooltipRender="onRichTooltipRender">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onRichTooltipRender(args) {
        var content = '<div style="padding:10px;">';
        content += '<strong>' + args.xLabel + ' - ' + args.yLabel + '</strong><br>';
        content += '<span>Sales: </span>';
        content += '<strong>$' + args.value + '</strong>';
        content += '</div>';

        args.content = [content];
    }
</script>
```

### Conditional Tooltips

Use conditional logic to show different tooltip content based on the cell value.

```javascript
function onTooltipRender(args) {
    if (args.value > 80) {
        args.content = [
            args.xLabel + ' - ' + args.yLabel,
            'Status: Excellent',
            'Value: ' + args.value
        ];
    } else if (args.value > 60) {
        args.content = [
            args.xLabel + ' - ' + args.yLabel,
            'Status: Good',
            'Value: ' + args.value
        ];
    } else {
        args.content = [
            args.xLabel + ' - ' + args.yLabel,
            'Status: Needs Attention',
            'Value: ' + args.value
        ];
    }
}
```

### Custom Data in Tooltips

Include additional properties in the C# model and access them in the tooltip event if the event argument exposes the original data item.

#### Pages/Index.cshtml.cs

```csharp
public class SalesHeatMapData
{
    public string Month { get; set; } = string.Empty;

    public string Region { get; set; } = string.Empty;

    public double Sales { get; set; }

    public double Margin { get; set; }

    public string Status { get; set; } = string.Empty;
}
```

#### Tooltip Script

```javascript
function onTooltipRender(args) {
    var dataItem = args.data || {};

    args.content = [
        'Month: ' + args.xLabel,
        'Region: ' + args.yLabel,
        'Sales: $' + args.value,
        'Margin: ' + (dataItem.Margin !== undefined ? dataItem.Margin + '%' : 'N/A'),
        'Status: ' + (dataItem.Status || 'Unknown')
    ];
}
```

## Tooltip Appearance

### Appearance Configuration

Use `e-heatmap-tooltipsettings` to customize tooltip appearance. For text style, use a strongly typed `HeatMapFont` object from `Index.cshtml.cs`.

#### Pages/Index.cshtml

```cshtml
<ejs-heatmap
    id="styledTooltipHeatmap"
    dataSource="@Model.SalesData"
    showTooltip="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-tooltipsettings
        fill="#2C3E50"
        textStyle="@Model.TooltipTextStyle">
    </e-heatmap-tooltipsettings>
</ejs-heatmap>
```

#### Pages/Index.cshtml.cs

```csharp
using Syncfusion.EJ2.HeatMap;

public HeatMapFont TooltipTextStyle { get; set; } = new HeatMapFont
{
    Color = "#FFFFFF",
    FontFamily = "Segoe UI",
    FontStyle = "Normal",
    FontWeight = "400",
    Size = "12px"
};
```

### Appearance Properties

| Property | Purpose |
|----------|---------|
| `fill` | Defines the tooltip background color. |
| `textStyle` | Defines tooltip text font, size, weight, and color. |
| `border` | Defines tooltip border customization when supported by the installed package version. |

### Tooltip Style Examples

#### Dark Tooltip

```cshtml
<e-heatmap-tooltipsettings
    fill="#1A1A1A"
    textStyle="@Model.DarkTooltipTextStyle">
</e-heatmap-tooltipsettings>
```

```csharp
public HeatMapFont DarkTooltipTextStyle { get; set; } = new HeatMapFont
{
    Color = "#FFFFFF",
    FontFamily = "Segoe UI",
    Size = "12px"
};
```

#### Light Tooltip

```cshtml
<e-heatmap-tooltipsettings
    fill="#F5F5F5"
    textStyle="@Model.LightTooltipTextStyle">
</e-heatmap-tooltipsettings>
```

```csharp
public HeatMapFont LightTooltipTextStyle { get; set; } = new HeatMapFont
{
    Color = "#333333",
    FontFamily = "Segoe UI",
    Size = "12px"
};
```

#### Transparent-Style Tooltip

```cshtml
<e-heatmap-tooltipsettings
    fill="rgba(44, 62, 80, 0.9)"
    textStyle="@Model.TooltipTextStyle">
</e-heatmap-tooltipsettings>
```

## Cell Selection Modes

### Enable Cell Selection

Use `allowSelection="true"` to enable selection.

```cshtml
<ejs-heatmap
    id="selectionHeatmap"
    dataSource="@Model.SalesData"
    allowSelection="true">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

Selection behavior:

- Clicking a cell selects it.
- Selected cells receive visual selection styling.
- Use `cellSelected` to handle selection details.

### Single Cell Selection

Set `enableMultiSelect="false"` to allow only one selected cell at a time.

```cshtml
<ejs-heatmap
    id="singleSelectionHeatmap"
    dataSource="@Model.SalesData"
    allowSelection="true"
    enableMultiSelect="false"
    cellSelected="onCellSelected">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Multiple Cell Selection

Set `enableMultiSelect="true"` to allow multiple cell selection.

```cshtml
<ejs-heatmap
    id="multiSelectionHeatmap"
    dataSource="@Model.SalesData"
    allowSelection="true"
    enableMultiSelect="true"
    cellSelected="onCellSelected">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>
```

### Selection Methods

Mouse interaction:

```text
Click: Select a cell.
Ctrl + Click: Add or remove cells when multi-selection is enabled.
Click another cell: Replaces selection when multi-selection is disabled.
```

Touch interaction:

```text
Tap: Select a cell.
Multi-selection behavior can vary by browser and device.
```

## Selection Events

### Cell Selected Event

Use `cellSelected` to capture selected cell information.

```cshtml
<ejs-heatmap
    id="heatmap"
    dataSource="@Model.SalesData"
    allowSelection="true"
    enableMultiSelect="true"
    cellSelected="onCellSelected">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>
</ejs-heatmap>

<script>
    function onCellSelected(args) {
        console.log('Selected Cell:', args);
        console.log('X Label:', args.xLabel);
        console.log('Y Label:', args.yLabel);
        console.log('Value:', args.value);
    }
</script>
```

### Capture Selection Details

```javascript
function onCellSelected(args) {
    var selectedInfo = {
        xLabel: args.xLabel,
        yLabel: args.yLabel,
        value: args.value,
        isMultiSelect: args.multiSelect
    };

    updateSelectedCellInfo(selectedInfo);
}

function updateSelectedCellInfo(selectedInfo) {
    console.log(selectedInfo);
}
```

### Multiple Selection Handling

```javascript
function onCellSelected(args) {
    if (args.multiSelect) {
        console.log('Multi-selection action:', args);
    } else {
        console.log('Single selection action:', args.xLabel, args.yLabel, args.value);
    }
}
```

### Clear Selection

Use the HeatMap instance to clear the current selection.

```cshtml
<button type="button" onclick="clearSelection()">Clear Selection</button>

<script>
    function clearSelection() {
        var heatmap = document.getElementById('heatmap').ej2_instances[0];

        if (heatmap && typeof heatmap.clearSelection === 'function') {
            heatmap.clearSelection();
        }
    }
</script>
```

## Advanced Selection

### Selection Example: Capture Values

This example stores selected cell details in a JavaScript array and displays them below the HeatMap.

```cshtml
<ejs-heatmap
    id="captureSelectionHeatmap"
    dataSource="@Model.SalesData"
    allowSelection="true"
    enableMultiSelect="true"
    cellSelected="onCellSelected">

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true">
    </e-heatmap-cellsettings>
</ejs-heatmap>

<div id="selectedCells"></div>

<script>
    var selectedCells = [];

    function onCellSelected(args) {
        var cellId = args.xLabel + '-' + args.yLabel;
        var index = selectedCells.findIndex(function (cell) {
            return cell.id === cellId;
        });

        if (index === -1) {
            selectedCells.push({
                id: cellId,
                xLabel: args.xLabel,
                yLabel: args.yLabel,
                value: args.value
            });
        }

        displaySelectedCells();
    }

    function displaySelectedCells() {
        var html = '<h3>Selected Cells (' + selectedCells.length + ')</h3>';
        html += '<ul>';

        selectedCells.forEach(function (cell) {
            html += '<li>' + cell.xLabel + ' - ' + cell.yLabel + ': ' + cell.value + '</li>';
        });

        html += '</ul>';

        document.getElementById('selectedCells').innerHTML = html;
    }
</script>
```

### Export Selected Data

Export selected cells to a CSV file on the client side.

```javascript
function exportSelectedCells() {
    if (selectedCells.length === 0) {
        alert('Please select at least one cell.');
        return;
    }

    var csvContent = 'X Label,Y Label,Value\n';

    selectedCells.forEach(function (cell) {
        csvContent += cell.xLabel + ',' + cell.yLabel + ',' + cell.value + '\n';
    });

    var link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.download = 'selected-cells.csv';
    link.click();
}
```

### Send to Server

For Razor Pages, send selected data to a page handler.

#### Pages/Index.cshtml

```cshtml
<button type="button" onclick="submitSelectedCells()">Send Selected Cells</button>

<script>
    function submitSelectedCells() {
        fetch('?handler=SelectedCells', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]')?.value || ''
            },
            body: JSON.stringify(selectedCells)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Server response:', data);
        });
    }
</script>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public JsonResult OnPostSelectedCells([FromBody] List<SelectedHeatMapCell> selectedCells)
        {
            int count = selectedCells == null ? 0 : selectedCells.Count;

            return new JsonResult(new
            {
                success = true,
                selectedCount = count
            });
        }
    }

    public class SelectedHeatMapCell
    {
        public string Id { get; set; } = string.Empty;

        public string XLabel { get; set; } = string.Empty;

        public string YLabel { get; set; } = string.Empty;

        public double Value { get; set; }
    }
}
```

### Complete Interactive Example

This complete example includes tooltip customization, cell selection, multiple selection, clear selection, and CSV export.

#### Pages/Index.cshtml

```cshtml
@page
@model YourApplication.Pages.IndexModel

<ejs-heatmap
    id="heatmap"
    dataSource="@Model.SalesData"
    allowSelection="true"
    enableMultiSelect="true"
    showTooltip="true"
    cellSelected="onCellSelected"
    tooltipRender="onTooltipRender"
    width="100%"
    height="500px">

    <e-heatmap-titlesettings
        text="Interactive Sales HeatMap"
        textStyle="@Model.TitleTextStyle">
    </e-heatmap-titlesettings>

    <e-heatmap-xaxis
        valueType="Category"
        labels="@Model.MonthLabels">
    </e-heatmap-xaxis>

    <e-heatmap-yaxis
        valueType="Category"
        labels="@Model.RegionLabels">
    </e-heatmap-yaxis>

    <e-heatmap-datasourcesettings
        isJsonData="true"
        adaptorType="Cell"
        xDataMapping="Month"
        yDataMapping="Region"
        valueMapping="Sales">
    </e-heatmap-datasourcesettings>

    <e-heatmap-cellsettings
        showLabel="true"
        format="{value}"
        textStyle="@Model.CellTextStyle">
    </e-heatmap-cellsettings>

    <e-heatmap-palettesettings
        type="Gradient"
        palette="@Model.Palette">
    </e-heatmap-palettesettings>

    <e-heatmap-tooltipsettings
        fill="#2C3E50"
        textStyle="@Model.TooltipTextStyle">
    </e-heatmap-tooltipsettings>

    <e-heatmap-legendsettings
        visible="true"
        position="Right"
        showLabel="true">
    </e-heatmap-legendsettings>
</ejs-heatmap>

<div style="margin-top: 20px;">
    <button type="button" onclick="clearSelection()">Clear Selection</button>
    <button type="button" onclick="exportSelectedCells()">Export Selected</button>
</div>

<div id="selectedInfo" style="margin-top: 12px;"></div>

<script>
    var selectedCells = [];

    function onCellSelected(args) {
        var cellId = args.xLabel + '-' + args.yLabel;
        var index = selectedCells.findIndex(function (cell) {
            return cell.id === cellId;
        });

        if (index === -1) {
            selectedCells.push({
                id: cellId,
                xLabel: args.xLabel,
                yLabel: args.yLabel,
                value: args.value
            });
        }

        updateSelectedInfo();
    }

    function onTooltipRender(args) {
        args.content = [
            args.xLabel + ' - ' + args.yLabel,
            'Sales: $' + args.value
        ];
    }

    function clearSelection() {
        var heatmap = document.getElementById('heatmap').ej2_instances[0];

        if (heatmap && typeof heatmap.clearSelection === 'function') {
            heatmap.clearSelection();
        }

        selectedCells = [];
        updateSelectedInfo();
    }

    function updateSelectedInfo() {
        var html = '<strong>Selected: ' + selectedCells.length + ' cells</strong>';

        if (selectedCells.length > 0) {
            html += '<ul>';

            selectedCells.forEach(function (cell) {
                html += '<li>' + cell.xLabel + ' - ' + cell.yLabel + ': $' + cell.value + '</li>';
            });

            html += '</ul>';
        }

        document.getElementById('selectedInfo').innerHTML = html;
    }

    function exportSelectedCells() {
        if (selectedCells.length === 0) {
            alert('Please select cells first.');
            return;
        }

        var csv = 'X Label,Y Label,Sales\n';

        selectedCells.forEach(function (cell) {
            csv += cell.xLabel + ',' + cell.yLabel + ',' + cell.value + '\n';
        });

        var link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = 'heatmap-selection.csv';
        link.click();
    }
</script>
```

#### Pages/Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.HeatMap;
using System.Collections.Generic;

namespace YourApplication.Pages
{
    public class IndexModel : PageModel
    {
        public List<SalesHeatMapData> SalesData { get; set; } = new List<SalesHeatMapData>();

        public string[] MonthLabels { get; set; } =
        {
            "Jan", "Feb", "Mar", "Apr"
        };

        public string[] RegionLabels { get; set; } =
        {
            "North", "South", "East", "West"
        };

        public HeatMapFont TitleTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "Bold",
            Size = "18px",
            Color = "#222222"
        };

        public HeatMapFont CellTextStyle { get; set; } = new HeatMapFont
        {
            FontFamily = "Segoe UI",
            FontWeight = "500",
            Size = "12px",
            Color = "#111111"
        };

        public HeatMapFont TooltipTextStyle { get; set; } = new HeatMapFont
        {
            Color = "#FFFFFF",
            FontFamily = "Segoe UI",
            FontStyle = "Normal",
            FontWeight = "400",
            Size = "12px"
        };

        public List<HeatMapPalette> Palette { get; set; } = new List<HeatMapPalette>
        {
            new HeatMapPalette { Value = 0, Color = "#E3F2FD", Label = "Low" },
            new HeatMapPalette { Value = 50, Color = "#64B5F6", Label = "Medium" },
            new HeatMapPalette { Value = 100, Color = "#0D47A1", Label = "High" }
        };

        public void OnGet()
        {
            SalesData = new List<SalesHeatMapData>
            {
                new SalesHeatMapData { Month = "Jan", Region = "North", Sales = 72, Margin = 35, Status = "On Track" },
                new SalesHeatMapData { Month = "Feb", Region = "North", Sales = 84, Margin = 38, Status = "On Track" },
                new SalesHeatMapData { Month = "Mar", Region = "North", Sales = 46, Margin = 22, Status = "Review" },
                new SalesHeatMapData { Month = "Apr", Region = "North", Sales = 91, Margin = 41, Status = "Excellent" },

                new SalesHeatMapData { Month = "Jan", Region = "South", Sales = 63, Margin = 30, Status = "Good" },
                new SalesHeatMapData { Month = "Feb", Region = "South", Sales = 58, Margin = 28, Status = "Good" },
                new SalesHeatMapData { Month = "Mar", Region = "South", Sales = 39, Margin = 18, Status = "Review" },
                new SalesHeatMapData { Month = "Apr", Region = "South", Sales = 96, Margin = 45, Status = "Excellent" },

                new SalesHeatMapData { Month = "Jan", Region = "East", Sales = 52, Margin = 26, Status = "Good" },
                new SalesHeatMapData { Month = "Feb", Region = "East", Sales = 68, Margin = 32, Status = "Good" },
                new SalesHeatMapData { Month = "Mar", Region = "East", Sales = 76, Margin = 36, Status = "On Track" },
                new SalesHeatMapData { Month = "Apr", Region = "East", Sales = 88, Margin = 40, Status = "Excellent" },

                new SalesHeatMapData { Month = "Jan", Region = "West", Sales = 34, Margin = 15, Status = "Review" },
                new SalesHeatMapData { Month = "Feb", Region = "West", Sales = 47, Margin = 21, Status = "Review" },
                new SalesHeatMapData { Month = "Mar", Region = "West", Sales = 59, Margin = 27, Status = "Good" },
                new SalesHeatMapData { Month = "Apr", Region = "West", Sales = 73, Margin = 34, Status = "On Track" }
            };
        }
    }

    public class SalesHeatMapData
    {
        public string Month { get; set; } = string.Empty;

        public string Region { get; set; } = string.Empty;

        public double Sales { get; set; }

        public double Margin { get; set; }

        public string Status { get; set; } = string.Empty;
    }
}
```
