# Interactions and Events

## Table of Contents
- [Tooltip](#tooltip)
  - [Basic Toolip](#basic-toolip)
  - [Tooltip format](#tooltip-format)
  - [Tooltip Template](#tooltip-template)
  - [Customize the appearance of the tooltip](#customize-the-appearance-of-the-tooltip)
  - [Positioning the tooltip](#positioning-the-tooltip)
- [Event Overview](#event-overview)
- [Pointer Drag Events](#pointer-drag-events)
  - [DragStart Event](#dragstart-event)
  - [DragMove Event](#dragmove-event)
  - [DragEnd Event](#dragend-event)
- [Value Change Events](#value-change-events)
  - [ValueChange Event](#valuechange-event)
- [Lifecycle Events](#lifecycle-events)
  - [Load Event](#load-event)
  - [Loaded Event](#loaded-event)
- [Mouse Events](#mouse-events)
  - [GaugeMouseDown](#gaugemousedown)
  - [GaugeMouseMove](#gaugemousemove)
  - [GaugeMouseUp](#gaugemouseup)
  - [GaugeMouseLeave](#gaugemouseleave)
- [Animation Events](#animation-events)
  - [AnimationComplete](#animationcomplete)
- [Event Handler Patterns](#event-handler-patterns)
  - [Pattern 1: Real-Time Value Display](#pattern-1-real-time-value-display)
  - [Pattern 2: Value Validation](#pattern-2-value-validation)
  - [Pattern 3: Data Synchronization](#pattern-3-data-synchronization)
  - [Pattern 4: Multi-Gauge Coordination](#pattern-4-multi-gauge-coordination)
  - [Pattern 5: Event Logging](#pattern-5-event-logging)
- [Common Use Cases](#common-use-cases)
  - [Use Case 1: Meter with Thresholds](#use-case-1-meter-with-thresholds)
  - [Use Case 2: Auto-Updating Gauge](#use-case-2-auto-updating-gauge)
  - [Use Case 3: Undo/Redo Functionality](#use-case-3-undoredo-functionality)


## Tooltip

### Basic Toolip

Linear Gauge displays the details about a pointer value through `e-lineargauge-tooltip`, when the mouse hovers over the pointer. To enable the tooltip, set `Enable` property as `true`.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-tooltip Enable="true"></e-lineargauge-tooltip>
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer Value="80"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Tooltip format

Tooltip in the Linear Gauge control can be formatted using the `Format` property in `e-lineargauge-tooltip`. It is used to render the tooltip in certain format or to add a user-defined unit in the tooltip. 

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-tooltip Enable="true" Format="{value}km"></e-lineargauge-tooltip>
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer Value="80"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Tooltip Template

The HTML element can be rendered in the tooltip of the Linear Gauge using the `Template` property in `e-lineargauge-tooltip`.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-tooltip Enable="true" Template="<div>Pointer: 80 </div>"></e-lineargauge-tooltip>
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer Value="80"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Customize the appearance of the tooltip

The tooltip can be customized using the following properties in `e-lineargauge-tooltip`.

- `Fill` - To fill the color for tooltip.
- `EnableAnimtion` - To enable or disable the tooltip animation.
- `Border` - To set the border color and width of the tooltip.
- `TextStyle` - To customize the style of the text in tooltip.
- `ShowAtMousePosition` - To show the tooltip at the mouse position.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-tooltip Enable="true" Fill="#e5bcbc">
        <e-tooltipsettings-border Width="2" Color="#d80000"></e-tooltipsettings-border>
    </e-lineargauge-tooltip>
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer Value="80"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

### Positioning the tooltip

The tooltip is positioned at the `End` of the pointer. To change the position of the tooltip at the start, or center of the pointer, set the `Position` property to `Start` or `Center`.

```cshtml
<ejs-lineargauge id="gauge">
    <e-lineargauge-tooltip Enable="true" Position="Center">
    </e-lineargauge-tooltip>
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer Value="50" Type="Bar" Color="blue"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Event Overview

The Linear Gauge fires events at various lifecycle stages and user interactions. Events allow you to:
- Respond to user actions (drag, click)
- Update external UI when gauge values change
- Track component lifecycle (load, resize)
- Customize behavior with validation

**Key Events:**

- `Load` - Before gauge initializes
- `Loaded` - After gauge initializes
- `DragStart/DragMove/DragEnd` - Pointer drag operations
- `ValueChange` - When pointer value changes
- `AnimationComplete` - After pointer animation
- `GaugeMouseDown/Up/Move/Leave` - Mouse interactions
- `Resized` - Window or container resize
- `TooltipRender` - Before tooltip display

## Pointer Drag Events

### DragStart Event

Fired when user begins dragging a pointer.

```cshtml
<ejs-lineargauge id="gauge" DragStart="dragStart">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar" EnableDrag="true"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    function dragStart(args) {
        console.log('Drag started at value: ' + args.currentValue);
        // Disable other UI elements during drag
        // Show visual feedback
    };
</script>
```

**Event Arguments (IPointerDragEventArgs):**
- `currentValue` - Current pointer value
- `previousValue` - Previous pointer value
- `axis` - Specifies the axis instance in linear gauge
- `axisIndex` - Specifies the index value of the axis on which the pointer is dragged
- `pointer` - Specifies the pointer instance in linear gauge
- `pointerValue` - Specifies the value of the pointer before dragging the pointer

### DragMove Event

Fired continuously while user drags the pointer.

```cshtml
<ejs-lineargauge id="linear" DragMove="dragMove">
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer EnableDrag="true"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    function dragMove(args) {
        console.log('Dragging... current value: ' + args.currentValue);
        // Update real-time display
        // Show live preview
    };
</script>
```

### DragEnd Event

Fired when user releases the pointer.

```cshtml
<ejs-lineargauge id="linear" DragEnd="dragEnd">
    <e-lineargauge-axes>
        <e-lineargauge-axis>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer EnableDrag="true"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    function dragEnd(args) {
        console.log('Drag ended at value: ' + args.currentValue);
        // Save final value
        // Enable other UI elements
        // Trigger updates
    };
</script>
```

## Value Change Events

### ValueChange Event

Fired when pointer value changes (via drag or programmatic update).

```cshtml
<ejs-lineargauge id="gauge" ValueChange="valueChange">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer EnableDrag="true" value="50" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    function valueChange(args) {
        console.log('Value changed to: ' + args.value);
        // Update external display
        // Trigger downstream actions
    };
</script>
```

**Event Arguments (IValueChangeEventArgs):**
- `value` - New pointer value
- `pointerIndex` - Index of changed pointer

## Lifecycle Events

### Load Event

Fired before gauge initializes - use for pre-setup.

```cshtml
<ejs-lineargauge id="gauge" load="load">
</ejs-lineargauge>
<script>
    function load(args) {
        console.log('Gauge loading...');
        // Set initial configuration
        // Load data from server
    };
</script>
```

### Loaded Event

Fired after gauge fully initializes - use for post-setup.

```cshtml
<ejs-lineargauge id="gauge" loaded="loaded">
</ejs-lineargauge>
<script>
   function loaded(args) {
        console.log('Gauge loaded and ready');
        // Update pointer values
        // Refresh data
        // Start polling
    };
</script>
```

## Mouse Events

### GaugeMouseDown

Fired when mouse button pressed on gauge.

```cshtml
<ejs-lineargauge id="gauge" gaugeMouseDown="gaugeMouseDown">
</ejs-lineargauge>

<script>
    function gaugeMouseDown(args) {
        console.log('Mouse down at: (' + args.x + ', ' + args.y + ')');
    }
</script>
```

### GaugeMouseMove

Fired when mouse moves over gauge.

```cshtml
<ejs-lineargauge id="gauge" gaugeMouseMove="gaugeMouseMove">
</ejs-lineargauge>

<script>
    function gaugeMouseMove(args) {
        console.log('Mouse moving over gauge');
        // Show tooltip preview
        // Highlight hover region
    }
</script>
```

### GaugeMouseUp

Fired when mouse button released on gauge.

```cshtml
<ejs-lineargauge id="gauge" gaugeMouseUp="gaugeMouseUp">
</ejs-lineargauge>

<script>
    function gaugeMouseUp(args) {
        console.log('Mouse up at: (' + args.x + ', ' + args.y + ')');
    }
</script>
```

### GaugeMouseLeave

Fired when mouse leaves gauge area.

```cshtml
<ejs-lineargauge id="gauge" gaugeMouseLeave="gaugeMouseLeave">
</ejs-lineargauge>

<script>
    function gaugeMouseLeave(args) {
        console.log('Mouse left gauge');
        // Hide tooltip
        // Remove highlighting
    }
</script>
```

## Animation Events

### AnimationComplete

Fired after pointer animation completes.

```cshtml
<ejs-lineargauge id="gauge" animationComplete="animationComplete">
</ejs-lineargauge>

<script>
    function animationComplete(args) {
        console.log('Animation complete for pointer: ' + args.pointer);
        // Trigger next action
        // Log analytics
    }
</script>
```

**Event Arguments (IAnimationCompleteEventArgs):**
- `pointer` - Specifies the instance of pointer in linear gauge.

## Event Handler Patterns

### Pattern 1: Real-Time Value Display

```cshtml
<div>
    <ejs-lineargauge id="gauge" 
                     title="Real-Time Value"
                     dragMove="dragMove"
                     valueChange="valueChange">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="50" type="Bar" EnableDrag="true"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>

    <p>Current Value: <span id="value-display">50</span></p>
</div>

<script>
    function dragMove(args) {
        document.getElementById('value-display').textContent =
            Math.round(args.currentValue);
    }

    function valueChange(args) {
        document.getElementById('value-display').textContent =
            Math.round(args.value);
    }
</script>
```

### Pattern 2: Value Validation

```cshtml
<ejs-lineargauge id="gauge"
                 title="Validation Gauge"
                 dragEnd="dragEnd">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar" EnableDrag="true"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    var MIN_VALUE = 10;
    var MAX_VALUE = 90;

    function dragEnd(args) {
        var gauge = document.getElementById('gauge').ej2_instances[0];

        if (args.currentValue < MIN_VALUE) {
            gauge.setPointerValue(0,0, MIN_VALUE);
            alert('Value too low. Set to minimum: ' + MIN_VALUE);
        } else if (args.currentValue > MAX_VALUE) {
            gauge.setPointerValue(0,0, MAX_VALUE);
            alert('Value too high. Set to maximum: ' + MAX_VALUE);
        }
    }
</script>
```

### Pattern 3: Data Synchronization

```cshtml
<ejs-lineargauge id="gauge"
                 title="Server Sync Gauge"
                 valueChange="valueChange">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    function valueChange(args) {
        // Send updated value to server
        fetch('/api/gauge/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: args.value })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server acknowledged:', data);
        })
        .catch(error => console.error('Error:', error));
    }
</script>
```

### Pattern 4: Multi-Gauge Coordination

```cshtml
<div>
    <ejs-lineargauge id="gauge1" valueChange="valueChangeGauge1">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="50" type="Bar"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>

    <ejs-lineargauge id="gauge2" valueChange="valueChangeGauge2">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="50" type="Bar"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>

<script>
    function valueChangeGauge1(args) {
        var gauge2 = document.getElementById('gauge2').ej2_instances[0];

        // Mirror value to gauge2
        gauge2.setPointerValue(0, 0, args.value);
    }

    function valueChangeGauge2(args) {
        var gauge1 = document.getElementById('gauge1').ej2_instances[0];

        // Mirror value to gauge1
        gauge1.setPointerValue(0, 0, args.value);
    }
</script>
```

### Pattern 5: Event Logging

```cshtml
<ejs-lineargauge id="gauge"
                 dragStart="dragStart"
                 dragMove="dragMove"
                 dragEnd="dragEnd"
                 valueChange="valueChange">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar" EnableDrag="true"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    var eventLog = [];

    function logEvent(eventName, eventArgs) {
        eventLog.push({
            timestamp: new Date(),
            event: eventName,
            details: eventArgs
        });
        console.log('Event logged:', eventName, eventArgs);
    }

    function dragStart(args) {
        logEvent('dragStart', args);
    }

    function dragMove(args) {
        logEvent('dragMove', args);
    }

    function dragEnd(args) {
        logEvent('dragEnd', args);
    }

    function valueChange(args) {
        logEvent('valueChange', args);
    }

    // Export event log
    function exportEventLog() {
        console.table(eventLog);
        return JSON.stringify(eventLog, null, 2);
    }
</script>
```

## Common Use Cases

### Use Case 1: Meter with Thresholds

```cshtml
<ejs-lineargauge id="threshold-gauge"
                 title="Power Usage"
                 valueChange="valueChange">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="500">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="200" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="200" end="400" color="#FFC107"></e-lineargauge-range>
                <e-lineargauge-range start="400" end="500" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="250" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<p id="threshold-message"></p>

<script>
    function valueChange(args) {
        var msg = '';

        if (args.value <= 200) {
            msg = '✓ Normal usage';
        } else if (args.value <= 400) {
            msg = '⚠ Warning: Elevated usage';
        } else {
            msg = '✕ Critical: Usage too high';
        }

        document.getElementById('threshold-message').textContent = msg;
    }
</script>
```

### Use Case 2: Auto-Updating Gauge

```cshtml
<ejs-lineargauge id="gauge"
                 loaded="loaded">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="50" type="Bar"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>

<script>
    function loaded(args) {
        var gauge = args.gauge;

        // Start polling for updates
        setInterval(function () {
            fetch('/api/gauge-value')
                .then(response => response.json())
                .then(data => {
                    gauge.setPointerValue(0, 0, data.value);
                })
                .catch(error => console.error(error));
        }, 1000); // Poll every 1 second
    }
</script>
```

### Use Case 3: Undo/Redo Functionality

```cshtml
<div>
    <ejs-lineargauge id="gauge"
                     dragEnd="dragEnd">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="50" type="Bar" EnableDrag="true"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>

    <button onclick="undo()">↶ Undo</button>
    <button onclick="redo()">↷ Redo</button>
</div>

<script>
    var valueHistory = [50]; // Initial value
    var historyIndex = 0;

    function dragEnd(args) {
        historyIndex++;
        valueHistory.splice(historyIndex);
        valueHistory.push(args.currentValue);
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            var gauge = document.getElementById('gauge').ej2_instances[0];
            gauge.setPointerValue(0, 0, valueHistory[historyIndex]);
        }
    }

    function redo() {
        if (historyIndex < valueHistory.length - 1) {
            historyIndex++;
            var gauge = document.getElementById('gauge').ej2_instances[0];
            gauge.setPointerValue(0, 0, valueHistory[historyIndex]);
        }
    }
</script>
```
