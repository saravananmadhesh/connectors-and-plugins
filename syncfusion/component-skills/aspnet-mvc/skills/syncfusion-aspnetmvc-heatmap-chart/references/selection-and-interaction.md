# Selection and Interaction in HeatMap

## Table of Contents
- [Selection Overview](#selection-overview)
- [Selection Modes](#selection-modes)
- [Implementing Cell Selection](#implementing-cell-selection)
- [Selection Styling](#selection-styling)
- [Event Handling](#event-handling)
- [Programmatic Selection](#programmatic-selection)
- [Common Use Cases](#common-use-cases)

## Selection Overview

Selection enables users to interact with specific cells or regions, providing:
- Detailed cell analysis
- Data drilling capabilities
- User feedback visual indicators
- Integration with other UI elements
- Interactive data exploration

### Basic Selection

Enable single cell selection:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .Render()
```

## Selection Modes

### No Selection

Disable all selection:

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.None);
})
```

### Cell Selection

Select individual cells:

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
})
```

### Series Selection

Select entire rows or columns:

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Series);
})
```

### Difference Between Modes

| Mode | Selection | Behavior |
|------|-----------|----------|
| None | None | No interaction |
| Cell | Single cell | Click individual cells |
| Series | Row/Column | Click header selects row/column |

## Implementing Cell Selection

### Single Cell Selection

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .CellSettings(cellSettings =>
    {
        cellSettings.ShowLabel(true);
    })
    .Render()
```

### Multiple Cell Selection

Allow selecting multiple cells with Ctrl+Click:

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
})
```

Users hold Ctrl (Cmd on Mac) and click multiple cells to select them.

### Clear Selection

Remove all selections:

```csharp
<script>
function clearSelection() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    heatmap.clearSelection();
}
</script>

<button onclick="clearSelection()">Clear Selection</button>
```

### Get Selected Cells

Retrieve selected cells programmatically:

```csharp
<script>
function getSelectedCells() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    var selectedCells = heatmap.getSelectedCellsAsArray();
    console.log("Selected cells:", selectedCells);
    
    selectedCells.forEach(function(cell) {
        console.log("Row: " + cell.x + ", Column: " + cell.y + ", Value: " + cell.value);
    });
}
</script>
```

## Selection Styling

### Default Selection Styling

HeatMap applies default highlighting to selected cells.

### Custom Selection Style

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    selection.Fill("#ff6f00");  // Orange highlight
    selection.Border(border =>
    {
        border.Color("#ff0000");
        border.Width(2);
    });
})
```

### Selection Color Options

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    selection.Fill("#1976d2");  // Blue
    selection.Opacity(0.8);
})
```

### Highlighting Without Selection

Highlight cells on hover:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
        selection.Fill("rgba(0, 122, 212, 0.1)");  // Subtle highlight
    })
    .Render()
```

### Custom Selection Template

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    selection.Fill("#ffeb3b");
    selection.Border(border =>
    {
        border.Color("#ff9800");
        border.Width(3);
        border.DashArray("5,5");
    });
})
```

## Event Handling

### Cell Click Event

Handle cell click interactions:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .CellClick("onCellClick")
    .Render()

<script>
function onCellClick(args) {
    console.log("Cell clicked");
    console.log("X Label: " + args.xLabel);
    console.log("Y Label: " + args.yLabel);
    console.log("Value: " + args.value);
}
</script>
```

### Selection Event

Triggered when cell selection changes:

```csharp
.SelectionSettings(selection =>
{
    selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
})
.Select("onSelectionChange")
.Render()

<script>
function onSelectionChange(args) {
    console.log("Selection changed");
    console.log("Current selection:", args.data);
}
</script>
```

### Cell Render Event

Customize cell appearance during rendering:

```csharp
.CellRender("onCellRender")
.Render()

<script>
function onCellRender(args) {
    if (args.value > 500) {
        args.displayText = "High: " + args.value;
    }
}
</script>
```

### Cell Mouse Over

```csharp
.MouseMove("onMouseMove")
.Render()

<script>
function onMouseMove(args) {
    console.log("Hovering over: " + args.xLabel + " - " + args.yLabel);
}
</script>
```

### Complete Event Binding

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .CellClick("onCellClick")
    .Select("onSelectionChange")
    .CellRender("onCellRender")
    .Render()

<script>
function onCellClick(args) {
    console.log("Clicked cell value: " + args.value);
    updateDetailsPanel(args);
}

function onSelectionChange(args) {
    console.log("Selection count: " + args.data.length);
}

function onCellRender(args) {
    if (args.value < 50) {
        args.fill = "#ff6f00";  // Highlight low values
    }
}

function updateDetailsPanel(cell) {
    document.getElementById("details").innerHTML = 
        "X: " + cell.xLabel + 
        "<br/>Y: " + cell.yLabel + 
        "<br/>Value: " + cell.value;
}
</script>
```

## Programmatic Selection

### Select Cell by Index

```csharp
<script>
function selectCell(xIndex, yIndex) {
    var heatmap = document.getElementById("container").ej2_instances[0];
    heatmap.selectCell(xIndex, yIndex);
}
</script>

<button onclick="selectCell(0, 0)">Select First Cell</button>
```

### Select Multiple Cells

```csharp
<script>
function selectMultiple() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    
    heatmap.selectCell(0, 0);
    heatmap.selectCell(0, 1);
    heatmap.selectCell(1, 0);
}
</script>

<button onclick="selectMultiple()">Select Multiple</button>
```

### Select All Cells

```csharp
<script>
function selectAll() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    
    // Get dimensions and select all
    for (var i = 0; i < heatmap.yAxis.labels.length; i++) {
        for (var j = 0; j < heatmap.xAxis.labels.length; j++) {
            heatmap.selectCell(j, i);
        }
    }
}
</script>

<button onclick="selectAll()">Select All</button>
```

### Deselect Specific Cell

```csharp
<script>
function deselectCell(xIndex, yIndex) {
    var heatmap = document.getElementById("container").ej2_instances[0];
    heatmap.clearSelection();  // Clear all, then reselect others
}
</script>
```

## Common Use Cases

### Use Case 1: Data Analysis Dashboard

Enable cell selection with detailed information display:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
        selection.Fill("#0078d4");
    })
    .CellClick("showDetails")
    .Render()

<div id="details" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
    <h4>Selected Cell Details</h4>
    <p id="cellInfo">Click a cell to see details</p>
</div>

<script>
function showDetails(args) {
    document.getElementById("cellInfo").innerHTML = 
        "<strong>" + args.xLabel + " - " + args.yLabel + "</strong><br/>" +
        "Value: " + args.value + "<br/>" +
        "Percentage: " + args.percentage + "%";
}
</script>
```

### Use Case 2: Report Generation

Select cells to generate custom reports:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .Select("updateReport")
    .Render()

<button onclick="generateReport()">Generate Report from Selection</button>

<script>
var selectedData = [];

function updateReport(args) {
    selectedData = args.data;
    console.log("Selected data updated: " + selectedData.length + " cells");
}

function generateReport() {
    var report = "Selected Cells Report\n";
    report += "Date: " + new Date() + "\n\n";
    selectedData.forEach(function(cell) {
        report += "Cell: " + cell.xLabel + " - " + cell.yLabel + 
                  " Value: " + cell.value + "\n";
    });
    
    console.log(report);
    // Send to server or download
}
</script>
```

### Use Case 3: Drill-Down Analysis

Click cells to drill down into details:

```csharp
.CellClick("drillDown")
.Render()

<script>
function drillDown(args) {
    var category = args.xLabel;
    var period = args.yLabel;
    
    // Load detailed data for this cell
    $.ajax({
        url: '/Data/GetDetails',
        data: { category: category, period: period },
        success: function(response) {
            displayDetailedChart(response);
        }
    });
}

function displayDetailedChart(data) {
    // Display more detailed visualization
    console.log("Showing drill-down data:", data);
}
</script>
```

### Use Case 4: Comparative Analysis

Select multiple cells for comparison:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .Select("compareSelection")
    .Render()

<script>
function compareSelection(args) {
    if (args.data.length < 2) {
        console.log("Select at least 2 cells to compare");
        return;
    }
    
    var comparison = {};
    args.data.forEach(function(cell) {
        comparison[cell.xLabel + "-" + cell.yLabel] = cell.value;
    });
    
    console.log("Comparison:", comparison);
    displayComparison(comparison);
}

function displayComparison(data) {
    // Show comparison results
}
</script>
```

### Use Case 5: Batch Operations

Perform actions on selected cells:

```csharp
<button onclick="deleteSelected()">Delete Selected</button>
<button onclick="exportSelected()">Export Selected</button>

<script>
function deleteSelected() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    var selected = heatmap.getSelectedCellsAsArray();
    
    if (confirm("Delete " + selected.length + " cells?")) {
        $.ajax({
            url: '/Data/DeleteCells',
            type: 'POST',
            data: JSON.stringify(selected),
            contentType: 'application/json',
            success: function() {
                heatmap.refresh();
            }
        });
    }
}

function exportSelected() {
    var heatmap = document.getElementById("container").ej2_instances[0];
    var selected = heatmap.getSelectedCellsAsArray();
    
    var csv = "X,Y,Value\n";
    selected.forEach(function(cell) {
        csv += cell.xLabel + "," + cell.yLabel + "," + cell.value + "\n";
    });
    
    downloadCSV(csv);
}
</script>
```

Selection and interaction capabilities transform HeatMaps from static visualizations into interactive analytical tools supporting data exploration and analysis.
