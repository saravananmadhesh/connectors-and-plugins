# Event Handling in HeatMap

## Table of Contents
- [Events Overview](#events-overview)
- [Cell Events](#cell-events)
- [Data and Render Events](#data-and-render-events)
- [Tooltip Events](#tooltip-events)
- [Selection Events](#selection-events)
- [Event Parameters](#event-parameters)
- [Common Scenarios](#common-scenarios)

## Events Overview

HeatMap events enable integration with other components and custom logic. Events allow you to:
- Respond to user interactions
- Customize cell rendering
- Handle data loading
- Integrate with business logic
- Create dynamic dashboards

### Available Events

| Event | Trigger | Use Case |
|-------|---------|----------|
| CellClick | Cell clicked | Drill-down analysis |
| CellRender | Cell rendering | Custom formatting |
| PointRender | Point rendering | Dynamic styling |
| Select | Cell selection | Multi-select operations |
| TooltipRender | Tooltip rendering | Custom tooltip content |
| Rendered | Chart rendered | Post-render actions |
| Load | Data loading | Pre-processing |

## Cell Events

### Cell Click Event

Triggered when user clicks a cell:

```csharp
@Html.EJS().HeatMap("container")
    .CellClick("onCellClick")
    .Render()

<script>
function onCellClick(args) {
    console.log("Cell clicked");
    console.log("X Label: " + args.xLabel);
    console.log("Y Label: " + args.yLabel);
    console.log("Value: " + args.value);
    console.log("Cell Index: X=" + args.cellIndex.x + ", Y=" + args.cellIndex.y);
}
</script>
```

### Cell Click Parameters

```javascript
{
    xLabel: "Jan",              // Column label
    yLabel: "Q1",              // Row label
    value: 150,                // Cell value
    cellIndex: { x: 0, y: 0 }, // Array indices
    percentage: 45.5,          // Percentage value
    eventData: {},             // Native event data
    data: { /*original data*/ } // Source data object
}
```

### Cell Double Click

Detect double-click interactions:

```csharp
@Html.EJS().HeatMap("container")
    .DoubleClick("onDoubleCellClick")
    .Render()

<script>
function onDoubleCellClick(args) {
    console.log("Double-clicked: " + args.xLabel + " - " + args.yLabel);
    // Edit mode or detailed view
}
</script>
```

### Cell Hover Interaction

```csharp
.MouseMove("onMouseMove")
.MouseLeave("onMouseLeave")
.Render()

<script>
var hoveredCell = null;

function onMouseMove(args) {
    hoveredCell = args;
    console.log("Hovering: " + args.xLabel + " - " + args.yLabel);
    updateHoverIndicator(args);
}

function onMouseLeave(args) {
    hoveredCell = null;
    clearHoverIndicator();
}

function updateHoverIndicator(cell) {
    document.getElementById("hover-info").textContent = 
        cell.xLabel + " - " + cell.yLabel + ": " + cell.value;
}

function clearHoverIndicator() {
    document.getElementById("hover-info").textContent = "";
}
</script>
```

## Data and Render Events

### Cell Render Event

Called when each cell is rendered, allowing customization:

```csharp
@Html.EJS().HeatMap("container")
    .CellRender("onCellRender")
    .Render()

<script>
function onCellRender(args) {
    if (args.value > 500) {
        args.displayText = "High: " + args.value;
        args.textStyle = { color: "#ffffff", fontWeight: "bold" };
    } else if (args.value < 50) {
        args.displayText = "Low: " + args.value;
        args.textStyle = { color: "#333333" };
    }
}
</script>
```

### Point Render Event

Customize individual data points:

```csharp
.PointRender("onPointRender")
.Render()

<script>
function onPointRender(args) {
    if (args.value > 1000) {
        args.fill = "#ff0000";  // Red for high values
    } else if (args.value < 100) {
        args.fill = "#00ff00";  // Green for low values
    }
}
</script>
```

### Load Event

Triggered before data loading:

```csharp
.Load("onLoad")
.Render()

<script>
function onLoad(args) {
    console.log("HeatMap loading...");
    // Pre-processing, authentication, etc.
    args.cancel = false;  // Set true to cancel loading
}
</script>
```

### Rendered Event

Triggered after chart fully renders:

```csharp
.Rendered("onRendered")
.Render()

<script>
function onRendered(args) {
    console.log("HeatMap rendered successfully");
    // Post-render operations
    highlightMaxValue();
    updateDashboard();
}

function highlightMaxValue() {
    // Find and highlight maximum value
}

function updateDashboard() {
    // Update related UI elements
}
</script>
```

## Tooltip Events

### Before Tooltip Render

Customize tooltip before display:

```csharp
@Html.EJS().HeatMap("container")
    .TooltipRender("onTooltipRender")
    .Render()

<script>
function onTooltipRender(args) {
    if (args.value > 1000) {
        args.text = "<b>High Value</b><br/>" + args.value;
        args.textStyle = { color: "#ffffff" };
        args.fill = "#ff6f00";
    }
}
</script>
```

### Tooltip Render Parameters

```javascript
{
    xLabel: "Jan",
    yLabel: "Q1",
    value: 150,
    text: "Default tooltip text",
    textStyle: {},  // Style object
    fill: "#ffffff", // Background color
    data: {}  // Raw data
}
```

## Selection Events

### Select Event

Triggered when cell selection changes:

```csharp
@Html.EJS().HeatMap("container")
    .SelectionSettings(selection =>
    {
        selection.Mode(Syncfusion.EJ2.HeatMap.SelectionMode.Cell);
    })
    .Select("onSelect")
    .Render()

<script>
function onSelect(args) {
    console.log("Selection changed");
    console.log("Selected cells: " + args.data.length);
    
    args.data.forEach(function(cell) {
        console.log(cell.xLabel + " - " + cell.yLabel + ": " + cell.value);
    });
    
    updateSelectionUI(args.data);
}

function updateSelectionUI(data) {
    var count = document.getElementById("count");
    count.textContent = "Selected: " + data.length + " cells";
}
</script>
```

### Selection Event Parameters

```javascript
{
    data: [  // Array of selected cells
        {
            xLabel: "Jan",
            yLabel: "Q1",
            value: 150,
            cellIndex: { x: 0, y: 0 }
        }
        // ... more cells
    ],
    currentCell: {},  // Currently selected
    eventData: {}     // Native event
}
```

## Event Parameters

### Common Event Properties

| Property | Type | Value | Usage |
|----------|------|-------|-------|
| xLabel | String | Column header | Identify column |
| yLabel | String | Row header | Identify row |
| value | Number | Cell value | Data value |
| percentage | Number | Percentage | Relative size |
| cellIndex | Object | {x, y} | Array coordinates |
| data | Object | Raw object | Source data |

### Event Cancellation

```csharp
<script>
function onLoad(args) {
    if (someCondition) {
        args.cancel = true;  // Cancel the operation
    }
}
</script>
```

## Common Scenarios

### Scenario 1: Track User Interactions

Log all user interactions:

```csharp
@Html.EJS().HeatMap("container")
    .CellClick("trackClick")
    .Select("trackSelection")
    .Render()

<script>
var interactions = [];

function trackClick(args) {
    interactions.push({
        type: "click",
        timestamp: new Date(),
        cell: args.xLabel + " - " + args.yLabel,
        value: args.value
    });
    
    sendAnalytics(interactions);
}

function trackSelection(args) {
    interactions.push({
        type: "selection",
        timestamp: new Date(),
        count: args.data.length
    });
}

function sendAnalytics(data) {
    // Send to server for analysis
}
</script>
```

### Scenario 2: Conditional Formatting

Apply dynamic styling based on values:

```csharp
.CellRender("applyCellFormatting")
.PointRender("applyPointFormatting")
.Render()

<script>
function applyCellFormatting(args) {
    if (args.value > 1000) {
        args.displayText = "⬆ " + args.value;  // Trending up
        args.textStyle = { fontSize: "14px", fontWeight: "bold" };
    } else if (args.value < 100) {
        args.displayText = "⬇ " + args.value;  // Trending down
        args.textStyle = { fontSize: "10px" };
    }
}

function applyPointFormatting(args) {
    var ratio = args.value / 1000;
    args.opacity = ratio > 0.5 ? 1 : 0.5;
}
</script>
```

### Scenario 3: Drill-Down Navigation

Navigate to detailed views on click:

```csharp
.CellClick("navigateToDrillDown")
.Render()

<script>
function navigateToDrillDown(args) {
    var category = args.xLabel;
    var period = args.yLabel;
    var value = args.value;
    
    // Load detail view
    $.ajax({
        url: '/Data/GetDrillDown',
        data: {
            category: category,
            period: period
        },
        success: function(response) {
            showDetailModal(category, period, response);
        }
    });
}

function showDetailModal(category, period, data) {
    var modal = document.getElementById("detail-modal");
    document.getElementById("modal-title").textContent = 
        category + " - " + period;
    document.getElementById("modal-content").innerHTML = 
        formatDetailView(data);
    $(modal).modal('show');
}
</script>
```

### Scenario 4: Real-Time Data Updates

Refresh on cell interaction:

```csharp
.CellClick("fetchLatestData")
.Render()

<script>
function fetchLatestData(args) {
    console.log("Fetching latest data for " + args.xLabel);
    
    $.ajax({
        url: '/Data/GetLatest',
        data: { category: args.xLabel },
        success: function(response) {
            var heatmap = document.getElementById("container").ej2_instances[0];
            heatmap.dataSource = response;
            heatmap.refresh();
        }
    });
}
</script>
```

### Scenario 5: Multi-Cell Operations

Perform batch operations on selection:

```csharp
@Html.EJS().HeatMap("container")
    .Select("onMultiSelect")
    .Render()

<button onclick="processBatch()">Process Selected</button>

<script>
var selectedCells = [];

function onMultiSelect(args) {
    selectedCells = args.data;
    console.log("Selected: " + selectedCells.length + " cells");
    updateActionButtons();
}

function updateActionButtons() {
    if (selectedCells.length > 0) {
        document.getElementById("process-btn").disabled = false;
    } else {
        document.getElementById("process-btn").disabled = true;
    }
}

function processBatch() {
    var operations = selectedCells.map(function(cell) {
        return {
            x: cell.xLabel,
            y: cell.yLabel,
            value: cell.value
        };
    });
    
    $.ajax({
        url: '/Data/ProcessBatch',
        type: 'POST',
        data: JSON.stringify(operations),
        contentType: 'application/json',
        success: function() {
            alert("Processing complete!");
        }
    });
}
</script>
```

### Scenario 6: Export with Events

Export data triggered by events:

```csharp
.Rendered("onChartRendered")
.Render()

<button onclick="exportData()">Export</button>

<script>
var chartReady = false;

function onChartRendered(args) {
    chartReady = true;
    console.log("Chart is ready for export");
}

function exportData() {
    if (!chartReady) {
        alert("Chart not ready yet");
        return;
    }
    
    var heatmap = document.getElementById("container").ej2_instances[0];
    
    // Export as CSV
    var csv = "X,Y,Value\n";
    // Iterate through data and build CSV
    
    downloadFile(csv, "heatmap-data.csv");
}

function downloadFile(content, filename) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + 
        encodeURIComponent(content));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
</script>
```

## Event Best Practices

1. **Performance**: Keep event handlers lightweight
2. **Error Handling**: Always include try-catch in complex handlers
3. **Async Operations**: Use AJAX for server calls
4. **Memory**: Clean up event handlers when removing charts
5. **Testing**: Test event handling thoroughly
6. **Logging**: Log important events for debugging
7. **Documentation**: Document custom event handlers

Events enable HeatMap to be fully integrated into complex applications, responding to user actions and triggering business logic.
