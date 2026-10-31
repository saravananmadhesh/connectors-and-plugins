# Interactions and Export

## Table of Contents
- [Tooltip Configuration](#tooltip-configuration)
- [User Interactions](#user-interactions)
- [Event Handling](#event-handling)
- [Exporting Gauges](#exporting-gauges)
- [Printing Gauges](#printing-gauges)

## Tooltip Configuration

### Enable Tooltips

Show helpful information on hover:

```csharp
@Html.EJS().CircularGauge("gauge")
    .Tooltip(tooltip => tooltip
        .Enable = true
    )
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange { Start = 0, End = 50, Color = "#FF0000" },
                new CircularGaugeRange { Start = 50, End = 100, Color = "#00AA00" }
            }
        });
    })
    .Render();
```

### Tooltip for Ranges

```csharp
new CircularGaugeRange
{
    Start = 0,
    End = 50,
    Color = "#FF0000",
    TooltipText = "Critical Zone (0-50)"
},
new CircularGaugeRange
{
    Start = 50,
    End = 100,
    Color = "#00AA00",
    TooltipText = "Normal Zone (50-100)"
}
```

### Tooltip Styling

```csharp
.Tooltip(tooltip => tooltip
    .Enable = true
    .TooltipStyle(ts => ts
        .TextStyle(text => text
            .Color = "#FFFFFF"
            .FontSize = "13px"
            .FontFamily = "Segoe UI"
        )
    )
    .Background = "#333333"
    .BorderWidth = 1
    .BorderColor = "#666666"
)
```

### Pointer Tooltip

```csharp
.Pointers(pointers =>
{
    pointers.Add(new CircularGaugePointer
    {
        Value = 65,
        Type = GaugePointerType.Needle,
        TooltipText = "Current Value: 65"
    });
})
```

### Custom Tooltip Template

```csharp
.Tooltip(tooltip => tooltip
    .Enable = true
    .Template = "TooltipTemplate"
)
```

```javascript
<script type="text/html" id="TooltipTemplate">
    <div style="padding: 5px;">
        <span>Value: ${value}</span>
        <br/>
        <span>Range: ${rangeName}</span>
    </div>
</script>
```

## User Interactions

### Drag Pointer

Allow users to adjust values interactively:

```csharp
@Html.EJS().CircularGauge("interactiveGauge")
    .EnablePointerDrag = true
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 50,
            Type = GaugePointerType.Needle
        });
    })
    .PointerDrag("onPointerDrag")
    .Render();
```

```javascript
<script>
    function onPointerDrag(args) {
        console.log("New value: " + args.currentValue);
        updateDisplay(args.currentValue);
    }
</script>
```

### Drag Ranges

Allow range boundaries to be adjusted:

```csharp
@Html.EJS().CircularGauge("gauge")
    .EnableRangeDrag = true
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange
                {
                    Start = 20,
                    End = 80,
                    Color = "#FF6B35"
                }
            }
        });
    })
    .RangeDrag("onRangeDrag")
    .Render();
```

```javascript
<script>
    function onRangeDrag(args) {
        console.log("New range: " + args.start + " to " + args.end);
    }
</script>
```

## Event Handling

### Gauge Events

Handle various gauge lifecycle events:

```csharp
@Html.EJS().CircularGauge("gauge")
    .Load("onGaugeLoad")
    .Loaded("onGaugeLoaded")
    .PointerDrag("onPointerDrag")
    .RangeDrag("onRangeDrag")
    .TooltipRender("onTooltipRender")
    .AxisLabelRender("onAxisLabelRender")
    .Render();
```

### Load Event

Triggered when gauge component initializes:

```javascript
<script>
    function onGaugeLoad(args) {
        console.log("Gauge loading...");
        // Initialize data or perform setup
    }
</script>
```

### Loaded Event

Triggered when gauge completes rendering:

```javascript
<script>
    function onGaugeLoaded(args) {
        console.log("Gauge loaded and ready!");
        // Update UI, fetch data, or trigger animations
    }
</script>
```

### Pointer Drag Event

```javascript
<script>
    function onPointerDrag(args) {
        console.log("Pointer dragging: " + args.currentValue);
        // Real-time value updates
    }
</script>
```

### Range Drag Event

```javascript
<script>
    function onRangeDrag(args) {
        console.log("Range start: " + args.start);
        console.log("Range end: " + args.end);
        // Update thresholds
    }
</script>
```

### Tooltip Render Event

```javascript
<script>
    function onTooltipRender(args) {
        // Customize tooltip before display
        args.tooltip.content = "Custom: " + args.value;
    }
</script>
```

### Axis Label Render Event

```javascript
<script>
    function onAxisLabelRender(args) {
        // Format labels dynamically
        if (args.value > 80) {
            args.text = "HIGH: " + args.value;
        }
    }
</script>
```

## Exporting Gauges

### Export to Image Formats

```csharp
@Html.EJS().CircularGauge("gauge")
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis { Minimum = 0, Maximum = 100 });
    })
    .Render();

<button onclick="exportGauge()">Export as PNG</button>

<script>
    function exportGauge() {
        let gaugeInstance = document.getElementById("gauge").ej2_instances[0];
        gaugeInstance.export("PNG", "gauge.png");
    }
</script>
```

### Export Formats

```javascript
// PNG format (recommended for web)
gaugeInstance.export("PNG", "gauge.png");

// JPEG format (smaller file size)
gaugeInstance.export("JPEG", "gauge.jpg");

// SVG format (vector, scalable)
gaugeInstance.export("SVG", "gauge.svg");

// PDF format (for documents)
gaugeInstance.export("PDF", "gauge.pdf");
```

### Export with Custom Filename

```javascript
<script>
    function exportWithTimestamp() {
        let gaugeInstance = document.getElementById("gauge").ej2_instances[0];
        let timestamp = new Date().toISOString().slice(0, 10);
        let filename = `gauge-${timestamp}.png`;
        gaugeInstance.export("PNG", filename);
    }
</script>
```

### Batch Export

```javascript
<script>
    function exportAllGauges() {
        // Export multiple gauges
        let gauge1 = document.getElementById("gauge1").ej2_instances[0];
        let gauge2 = document.getElementById("gauge2").ej2_instances[0];
        let gauge3 = document.getElementById("gauge3").ej2_instances[0];
        
        gauge1.export("PNG", "gauge1.png");
        gauge2.export("PNG", "gauge2.png");
        gauge3.export("PNG", "gauge3.png");
    }
</script>
```

## Printing Gauges

### Print Single Gauge

```javascript
<button onclick="printGauge()">Print</button>

<script>
    function printGauge() {
        let gaugeInstance = document.getElementById("gauge").ej2_instances[0];
        gaugeInstance.print();
    }
</script>
```

### Print Multiple Gauges

```html
<div id="gaugeContainer">
    <div id="gauge1"></div>
    <div id="gauge2"></div>
    <div id="gauge3"></div>
</div>

<button onclick="printAll()">Print All</button>

<script>
    function printAll() {
        let printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write(document.getElementById("gaugeContainer").innerHTML);
        printWindow.print();
    }
</script>
```

### Custom Print Layout

```javascript
<script>
    function customPrint() {
        let gaugeInstance = document.getElementById("gauge").ej2_instances[0];
        
        let printWindow = window.open("", "", "height=800,width=1000");
        let title = "<h2>Performance Report</h2>";
        let date = "<p>Date: " + new Date().toLocaleDateString() + "</p>";
        let gaugeHtml = gaugeInstance.export("SVG").then(data => {
            printWindow.document.write(title + date + data);
            printWindow.print();
        });
    }
</script>
```

## Complete Interactive Example

```csharp
@Html.EJS().CircularGauge("performanceGauge")
    .Title("System Performance")
    .EnablePointerDrag = true
    .Tooltip(tooltip => tooltip
        .Enable = true
        .Background = "#333333"
    )
    .Axes(axes =>
    {
        axes.Add(new CircularGaugeAxis
        {
            Minimum = 0,
            Maximum = 100,
            Ranges = new List<CircularGaugeRange>
            {
                new CircularGaugeRange
                {
                    Start = 0,
                    End = 30,
                    Color = "#FF0000",
                    TooltipText = "Critical Performance"
                },
                new CircularGaugeRange
                {
                    Start = 30,
                    End = 70,
                    Color = "#FFAA00",
                    TooltipText = "Acceptable Performance"
                },
                new CircularGaugeRange
                {
                    Start = 70,
                    End = 100,
                    Color = "#00AA00",
                    TooltipText = "Excellent Performance"
                }
            }
        });
    })
    .Pointers(pointers =>
    {
        pointers.Add(new CircularGaugePointer
        {
            Value = 75,
            Type = GaugePointerType.Needle,
            Color = "#333333",
            TooltipText = "Current: 75%"
        });
    })
    .PointerDrag("onPointerDrag")
    .Loaded("onGaugeLoaded")
    .Render();

<div style="margin-top: 20px;">
    <button onclick="exportGauge()">Export as PNG</button>
    <button onclick="printGauge()">Print Gauge</button>
    <button onclick="resetGauge()">Reset</button>
</div>

<script>
    function onPointerDrag(args) {
        document.getElementById("valueDisplay").innerText = Math.round(args.currentValue);
    }
    
    function onGaugeLoaded(args) {
        console.log("Dashboard ready for interaction");
    }
    
    function exportGauge() {
        let gauge = document.getElementById("performanceGauge").ej2_instances[0];
        gauge.export("PNG", "performance.png");
    }
    
    function printGauge() {
        let gauge = document.getElementById("performanceGauge").ej2_instances[0];
        gauge.print();
    }
    
    function resetGauge() {
        let gauge = document.getElementById("performanceGauge").ej2_instances[0];
        gauge.setPointerValue(0, 50);  // Reset to 50%
    }
</script>

<p>Current Value: <span id="valueDisplay">75</span>%</p>
```

This creates an interactive, exportable gauge that users can:
- Drag pointers to adjust values
- See helpful tooltips on hover
- Export for reports
- Print for documentation
- Reset to initial state
