# User Interactions

## Table of Contents
- [Tooltips](#tooltips)
- [Pointer Drag and Drop](#pointer-drag-and-drop)
- [Events](#events)

---

## Tooltips

Display information when users hover over pointers:

### Basic Tooltip

**Controller Code**:
```csharp
public ActionResult BasicTooltip()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Tooltips";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Basic Tooltip</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("tooltipGauge")
        .Title("Hover over Pointer for Tooltip")
        .TooltipSettings(tooltip =>
        {
            tooltip.Enable(true)                     // Enable tooltip
                .Format("{value} Units");           // Tooltip format
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(40).Color("#4CAF50").Add();
                    ranges.Start(40).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(55).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<p style="color: #666;">Move your mouse over the pointer to see the tooltip.</p>
```

**Result**: When hovering over the pointer, a tooltip shows "55 Units".

### Formatted Tooltip with Units

**Controller Code**:
```csharp
public ActionResult FormattedTooltip()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Formatted Tooltip";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Tooltip with Custom Format</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("formattedTooltipGauge")
        .Title("Temperature Sensor")
        .Format("{value}°C")
        .TooltipSettings(tooltip =>
        {
            tooltip.Enable(true)
                .Format("<b>Temperature:</b><br/>{value}°C")  // HTML format
                .Fill("#1976D2")                    // Tooltip background
                .TextStyle(font =>
                {
                    font.Color("white")
                        .Size("12px");
                });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#2196F3").Add();
                    ranges.Start(30).End(70).Color("#4CAF50").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(35).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Tooltip with blue background showing "Temperature: 35°C" with white text.

### Custom Tooltip with Multiple Pointers

**Controller Code**:
```csharp
public ActionResult MultiPointerTooltip()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Multi-Pointer Tooltip";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Tooltips with Multiple Pointers</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("multiPointerTooltipGauge")
        .Title("Actual vs Target Sales")
        .Format("{value}K")
        .TooltipSettings(tooltip =>
        {
            tooltip.Enable(true)
                .Format("<b>Value:</b> {value}K units")
                .Fill("#FFF3E0")
                .TextStyle(font =>
                {
                    font.Color("#E65100")
                        .Size("12px");
                });
        })
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(1000)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(500).Color("#FFEBEE").Add();
                    ranges.Start(500).End(750).Color("#FFF3E0").Add();
                    ranges.Start(750).End(1000).Color("#E8F5E9").Add();
                })
                .Pointers(pointers =>
                {
                    // Actual sales
                    pointers.Value(680)
                        .Type(PointerType.Bar)
                        .Width(12)
                        .Color("#2196F3")
                        .Add();
                    
                    // Target sales
                    pointers.Value(850)
                        .Type(PointerType.Marker)
                        .MarkerType(MarkerType.Triangle)
                        .Width(18)
                        .Color("#F44336")
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>
```

**Result**: Two pointers with separate tooltips showing their respective values.

---

## Pointer Drag and Drop

Allow users to manually adjust pointer values by dragging:

**Controller Code**:
```csharp
public ActionResult DragDropPointer()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Drag and Drop";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Draggable Pointer</h2>

<div style="padding: 20px;">
    @Html.EJS().LinearGauge("dragPointerGauge")
        .Title("Adjust Pointer by Dragging")
        .AllowInteraction(true)                      // Enable interaction
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(30).Color("#4CAF50").Add();
                    ranges.Start(30).End(70).Color("#FFC107").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(50).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<p style="color: #666;">Try clicking and dragging the pointer to change its value.</p>
```

**Result**: Pointer can be clicked and dragged to change its value interactively.

### Drag with Tooltip and Event Handling

**Controller Code**:
```csharp
public ActionResult DragWithEvents()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Drag with Events";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Draggable Pointer with Event Handling</h2>

<div style="padding: 20px;">
    <div id="valueDisplay" style="margin-bottom: 20px; font-size: 16px; color: #1976D2; font-weight: bold;">
        Current Value: 45
    </div>
    
    @Html.EJS().LinearGauge("dragEventGauge")
        .Title("Drag to Adjust - Value Updates Below")
        .AllowInteraction(true)
        .TooltipSettings(tooltip =>
        {
            tooltip.Enable(true)
                .Format("Value: {value}");
        })
        .DragStart("onDragStart")
        .DragMove("onDragMove")
        .DragEnd("onDragEnd")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Ranges(ranges =>
                {
                    ranges.Start(0).End(35).Color("#4CAF50").Add();
                    ranges.Start(35).End(70).Color("#FFC107").Add();
                    ranges.Start(70).End(100).Color("#F44336").Add();
                })
                .Pointers(pointers =>
                {
                    pointers.Value(45).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
function onDragStart(args) {
    console.log("Drag started at value: " + args.currentValue);
}

function onDragMove(args) {
    // Update the display as user drags
    document.getElementById("valueDisplay").innerText = 
        "Current Value: " + Math.round(args.currentValue);
}

function onDragEnd(args) {
    console.log("Drag ended at value: " + args.currentValue);
    document.getElementById("valueDisplay").innerText = 
        "Final Value: " + Math.round(args.currentValue);
}
</script>
```

**Result**: Pointer can be dragged and the value updates in real-time below the gauge.

---

## Events

Respond to gauge interactions and state changes:

### Load Event

**Controller Code**:
```csharp
public ActionResult LoadEvent()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Load Event";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Gauge Load Event</h2>

<div style="padding: 20px;">
    <div id="eventLog" style="background: #F5F5F5; padding: 10px; margin-bottom: 20px; border-radius: 3px; font-size: 12px;">
        <strong>Event Log:</strong><br/>
        <span id="logContent">Waiting for gauge to load...</span>
    </div>
    
    @Html.EJS().LinearGauge("loadEventGauge")
        .Title("Gauge Events")
        .Loaded("onLoaded")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
function onLoaded(args) {
    var log = document.getElementById("logContent");
    log.innerText = "✓ Gauge loaded successfully at " + new Date().toLocaleTimeString();
}
</script>
```

**Result**: Displays "Gauge loaded successfully" when the component finishes rendering.

### Animation Complete Event

**Controller Code**:
```csharp
public ActionResult AnimationCompleteEvent()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Animation Complete Event";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Animation Complete Event</h2>

<div style="padding: 20px;">
    <div id="animationStatus" style="background: #E8F5E9; padding: 10px; margin-bottom: 20px; border-radius: 3px;">
        <strong>Animation Status:</strong> <span id="status">Animating...</span>
    </div>
    
    @Html.EJS().LinearGauge("animationEventGauge")
        .Title("Watch for Animation Completion")
        .AnimationDuration(2000)                     // 2 second animation
        .AnimationComplete("onAnimationComplete")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(75)
                        .Type(PointerType.Bar)
                        .Width(15)
                        .Color("#2196F3")
                        .Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
function onAnimationComplete(args) {
    var status = document.getElementById("status");
    status.innerText = "✓ Animation completed!";
    status.style.color = "#2E7D32";
}
</script>
```

**Result**: Shows "Animation completed!" when the gauge finishes animating.

### Value Change Events

**Controller Code**:
```csharp
public ActionResult ValueChangeEvent()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Value Change Event";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Drag Events - Track Value Changes</h2>

<style>
    .event-panel {
        display: inline-block;
        width: 30%;
        vertical-align: top;
        margin-right: 3%;
        background: #F5F5F5;
        padding: 15px;
        border-radius: 5px;
    }
    
    .event-item {
        font-size: 12px;
        margin: 5px 0;
        padding: 5px;
        background: white;
        border-left: 3px solid #1976D2;
        padding-left: 10px;
    }
</style>

<div style="padding: 20px;">
    <div class="event-panel">
        <strong>DragStart Events:</strong>
        <div id="dragStartLog" style="height: 150px; overflow-y: auto;">
            <div class="event-item">Waiting...</div>
        </div>
    </div>
    
    <div class="event-panel">
        <strong>DragMove Events:</strong>
        <div id="dragMoveLog" style="height: 150px; overflow-y: auto;">
            <div class="event-item">Waiting...</div>
        </div>
    </div>
    
    <div class="event-panel">
        <strong>DragEnd Events:</strong>
        <div id="dragEndLog" style="height: 150px; overflow-y: auto;">
            <div class="event-item">Waiting...</div>
        </div>
    </div>
    
    @Html.EJS().LinearGauge("eventLogGauge")
        .Title("Drag Events")
        .AllowInteraction(true)
        .DragStart("onDragStart")
        .DragMove("onDragMove")
        .DragEnd("onDragEnd")
        .Axes(axes =>
        {
            axes.Minimum(0)
                .Maximum(100)
                .Pointers(pointers =>
                {
                    pointers.Value(50).Add();
                })
                .Add();
        })
        .Height("400px")
        .Width("100%")
        .Render();
</div>

<script>
function addEvent(logElementId, eventName, value) {
    var log = document.getElementById(logElementId);
    var newItem = document.createElement("div");
    newItem.className = "event-item";
    newItem.innerText = eventName + ": " + Math.round(value) + " @ " + new Date().toLocaleTimeString();
    log.insertBefore(newItem, log.firstChild);
    
    // Keep only last 10 events
    while (log.children.length > 10) {
        log.removeChild(log.lastChild);
    }
}

function onDragStart(args) {
    addEvent("dragStartLog", "Started", args.currentValue);
}

function onDragMove(args) {
    addEvent("dragMoveLog", "Moving", args.currentValue);
}

function onDragEnd(args) {
    addEvent("dragEndLog", "Ended", args.currentValue);
}
</script>
```

**Result**: Real-time event log showing DragStart, DragMove, and DragEnd events as you interact.

---

## Complete Interactive Example

**Controller Code**:
```csharp
public ActionResult FullyInteractive()
{
    return View();
}
```

**View Code**:
```html
@{
    ViewBag.Title = "Fully Interactive";
    Layout = "~/Views/Shared/_Layout.cshtml";
}

<h2>Fully Interactive Gauge Dashboard</h2>

<style>
    .dashboard {
        background: #F5F5F5;
        padding: 20px;
        border-radius: 5px;
    }
    
    .gauge-section {
        background: white;
        padding: 20px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    
    .stats {
        display: flex;
        gap: 20px;
        margin-top: 15px;
    }
    
    .stat-item {
        background: #E3F2FD;
        padding: 10px;
        border-radius: 3px;
        flex: 1;
        text-align: center;
    }
</style>

<div class="dashboard">
    <div class="gauge-section">
        <h3>Interactive System Monitor</h3>
        
        @Html.EJS().LinearGauge("interactiveGauge")
            .Title("System Load - Drag to Adjust")
            .AllowInteraction(true)
            .TooltipSettings(tooltip =>
            {
                tooltip.Enable(true)
                    .Format("Load: {value}%");
            })
            .DragEnd("onValueChanged")
            .Axes(axes =>
            {
                axes.Minimum(0)
                    .Maximum(100)
                    .Ranges(ranges =>
                    {
                        ranges.Start(0).End(30).Color("#4CAF50").Add();
                        ranges.Start(30).End(70).Color("#FFC107").Add();
                        ranges.Start(70).End(100).Color("#F44336").Add();
                    })
                    .Pointers(pointers =>
                    {
                        pointers.Value(45)
                            .Type(PointerType.Bar)
                            .Width(15)
                            .Color("#2196F3)
                            .Add();
                    })
                    .Add();
            })
            .Height("350px")
            .Width("100%")
            .Render();
        
        <div class="stats">
            <div class="stat-item">
                <strong>Current:</strong><br/>
                <span id="currentValue" style="font-size: 18px; color: #1976D2;">45%</span>
            </div>
            <div class="stat-item">
                <strong>Status:</strong><br/>
                <span id="statusBadge" style="font-size: 14px; color: #FFC107;">Normal</span>
            </div>
        </div>
    </div>
</div>

<script>
function onValueChanged(args) {
    var value = Math.round(args.currentValue);
    document.getElementById("currentValue").innerText = value + "%";
    
    var status = "Normal";
    var color = "#FFC107";
    if (value < 30) {
        status = "Good";
        color = "#4CAF50";
    } else if (value >= 70) {
        status = "Warning";
        color = "#F44336";
    }
    
    var badge = document.getElementById("statusBadge");
    badge.innerText = status;
    badge.style.color = color;
}
</script>
```

**Result**: A fully interactive gauge where dragging updates both the value and status in real-time.
