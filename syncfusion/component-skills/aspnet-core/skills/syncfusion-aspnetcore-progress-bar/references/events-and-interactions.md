# Events and Interactions

## Table of Contents
- [Understanding Progress Bar Events](#understanding-progress-bar-events)
  - [Available Events](#available-events)
- [ValueChanged Event](#valuechanged-event)
  - [Basic ValueChanged Handling](#basic-valuechanged-handling)
  - [Event Arguments](#event-arguments)
  - [Detecting Value Ranges](#detecting-value-ranges)
  - [Tracking Value Velocity](#tracking-value-velocity)
  - [Conditional Logic on Value Changes](#conditional-logic-on-value-changes)
- [ProgressCompleted Event](#progresscompleted-event)
  - [Basic ProgressCompleted Handling](#basic-progresscompleted-handling)
  - [Show Completion Message](#show-completion-message)
  - [Trigger Next Action on Completion](#trigger-next-action-on-completion)
  - [Completion with Metrics](#completion-with-metrics)
- [Event Binding Approaches](#event-binding-approaches)
  - [Attribute-Based Binding (Recommended for Tag Helpers)](#attribute-based-binding-recommended-for-tag-helpers)
  - [Programmatic Binding](#programmatic-binding)
  - [Event Listener Approach](#event-listener-approach)
- [Common Event Patterns](#common-event-patterns)
  - [Pattern 1: Debounced Value Change Handler](#pattern-1-debounced-value-change-handler)
  - [Pattern 2: Milestone-Based Actions](#pattern-2-milestone-based-actions)
  - [Pattern 3: Real-Time Progress Display](#pattern-3-real-time-progress-display)
- [Error Handling](#error-handling)
  - [Handle Errors During Progress](#handle-errors-during-progress)
  - [Network Request Progress with Error Handling](#network-request-progress-with-error-handling)
- [Integration with Application Workflows](#integration-with-application-workflows)
  - [Multi-Step Workflow with Progress Tracking](#multi-step-workflow-with-progress-tracking)

## Understanding Progress Bar Events

The Progress Bar component triggers events at key moments during its lifecycle. These events allow your application to respond to progress changes and completion.

### Available Events

1. **ValueChanged** - Fires when the progress value changes
2. **ProgressCompleted** - Fires when progress reaches the maximum value

Both events provide access to event data containing useful information about the progress state.

## ValueChanged Event

The `ValueChanged` event fires whenever the progress value changes, whether programmatically or through user interaction.

### Basic ValueChanged Handling

```cshtml
<ejs-progressbar id="basicProgress" 
                  type="Linear" 
                  value="50"
                  valueChanged="onValueChanged"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="output">Value: 0%</p>

<script>
function onValueChanged(args) {
    console.log('Progress changed to: ' + args.value);
    document.getElementById('output').textContent = 'Value: ' + args.value + '%';
}
</script>
```

### Event Arguments

The event handler receives arguments containing:

```javascript
function onValueChanged(args) {
    args.value          // Current progress value
}
```

### Detecting Value Ranges

```cshtml
<ejs-progressbar id="rangeProgress" 
                  type="Linear" 
                  value="30"
                  valueChanged="onRangeCheck"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
function onRangeCheck(args) {
    if (args.value < 25) {
        console.log('Early stage');
        updateUI('Just started...');
    } else if (args.value < 50) {
        console.log('First quarter complete');
        updateUI('Making progress...');
    } else if (args.value < 75) {
        console.log('Halfway done');
        updateUI('Halfway there!');
    } else if (args.value < 100) {
        console.log('Final stretch');
        updateUI('Almost done!');
    }
}

function updateUI(message) {
    // Update UI based on progress stage
}
</script>
```

### Tracking Value Velocity

```cshtml
<ejs-progressbar id="velocityProgress" 
                  type="Linear" 
                  value="30"
                  valueChanged="trackVelocity"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="velocityOutput">Velocity: 0% per second</p>

<script>
var lastValue = 0;
var lastTime = Date.now();

function trackVelocity(args) {
    var currentTime = Date.now();
    var timeDelta = (currentTime - lastTime) / 1000;
    var valueDelta = args.value - lastValue;
    var velocity = timeDelta > 0 ? valueDelta / timeDelta : 0;
    
    document.getElementById('velocityOutput').textContent = 
        'Velocity: ' + velocity.toFixed(2) + '% per second';
    
    lastValue = args.value;
    lastTime = currentTime;
}
</script>
```

### Conditional Logic on Value Changes

```cshtml
<ejs-progressbar id="conditionalProgress" 
                  type="Linear" 
                  value="20"
                  valueChanged="onConditionalChange"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<div id="warningMessage" style="display:none;color:red;margin-top:8px;">
    Performance Warning: Progress is slow
</div>

<script>
var expectedProgression = [];
var actualTime = [];

function onConditionalChange(args) {
    var currentTime = Date.now();
    
    // Check if progress is on schedule
    if (args.value > 0) {
        var elapsedSeconds = actualTime.length * 0.1; // 100ms intervals
        var expectedValue = (elapsedSeconds / 10) * 100; // Expect 10% per second
        
        if (args.value < (expectedValue * 0.8)) {
            // Progress is 20% slower than expected
            document.getElementById('warningMessage').style.display = 'block';
        } else {
            document.getElementById('warningMessage').style.display = 'none';
        }
    }
    
    actualTime.push(currentTime);
}
</script>
```

## ProgressCompleted Event

The `ProgressCompleted` event fires when the progress value reaches the maximum value (100 by default), indicating task completion.

### Basic ProgressCompleted Handling

```cshtml
<ejs-progressbar id="completeProgress" 
                  type="Linear" 
                  value="100"
                  progressCompleted="onComplete"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="status">Status: In Progress</p>

<script>
function onComplete(args) {
    console.log('Task completed!');
    document.getElementById('status').textContent = 'Status: Complete!';
    document.getElementById('status').style.color = '#4CAF50';
}
</script>
```

### Show Completion Message

```cshtml
<ejs-progressbar id="messageProgress" 
                  type="Circular" 
                  value="100"
                  progressCompleted="showCompletion"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<div id="completionDialog" style="display:none;text-align:center;margin-top:16px;">
    <h3 style="color:#4CAF50;">✓ Task Completed Successfully!</h3>
    <p>Your operation finished in 45 seconds.</p>
    <button onclick="reset()">Start New Task</button>
</div>

<script>
function showCompletion(args) {
    document.getElementById('completionDialog').style.display = 'block';
}

function reset() {
    var pb = document.getElementById('messageProgress').ej2_instances[0];
    pb.value = 0;
    document.getElementById('completionDialog').style.display = 'none';
}
</script>
```

### Trigger Next Action on Completion

```cshtml
<ejs-progressbar id="workflowProgress" 
                  type="Linear" 
                  value="100"
                  progressCompleted="startNextPhase"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="phase">Phase: 1</p>

<script>
var currentPhase = 1;
const MAX_PHASES = 3;

function startNextPhase(args) {
    if (currentPhase < MAX_PHASES) {
        currentPhase++;
        document.getElementById('phase').textContent = 'Phase: ' + currentPhase;
        
        // Reset progress for next phase
        var pb = document.getElementById('workflowProgress').ej2_instances[0];
        pb.value = 0;
        
        // Start next phase operation
        executePhase(currentPhase);
    } else {
        showFinalCompletion();
    }
}

function executePhase(phase) {
    console.log('Executing phase ' + phase);
    // Implement phase-specific logic
}

function showFinalCompletion() {
    console.log('All phases complete!');
}
</script>
```

### Completion with Metrics

```cshtml
<ejs-progressbar id="metricsProgress" 
                  type="Linear" 
                  value="100"
                  valueChanged="updateMetrics"
                  progressCompleted="showMetrics"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<div id="metrics" style="display:none;margin-top:16px;padding:12px;background:#f5f5f5;border-radius:4px;">
    <h4>Completion Metrics</h4>
    <p id="totalTime">Total Time: --</p>
    <p id="averageRate">Average Rate: --</p>
    <p id="peakRate">Peak Rate: --</p>
</div>

<script>
var startTime = Date.now();
var rates = [];
var maxRate = 0;

function updateMetrics(args) {
    var elapsed = (Date.now() - startTime) / 1000;
    var rate = args.value / elapsed;
    rates.push(rate);
    maxRate = Math.max(maxRate, rate);
}

function showMetrics(args) {
    var totalTime = (Date.now() - startTime) / 1000;
    var avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;
    
    document.getElementById('metrics').style.display = 'block';
    document.getElementById('totalTime').textContent = 
        'Total Time: ' + totalTime.toFixed(2) + ' seconds';
    document.getElementById('averageRate').textContent = 
        'Average Rate: ' + avgRate.toFixed(2) + '% per second';
    document.getElementById('peakRate').textContent = 
        'Peak Rate: ' + maxRate.toFixed(2) + '% per second';
}
</script>
```

## Event Binding Approaches

### Attribute-Based Binding (Recommended for Tag Helpers)

```cshtml
<ejs-progressbar id="attrProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="onValueChange"
                  progressCompleted="onComplete"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
function onValueChange(args) {
    console.log('Value changed to: ' + args.value);
}

function onComplete(args) {
    console.log('Progress completed');
}
</script>
```

### Programmatic Binding

```cshtml
<ejs-progressbar 
    id="progProgress" 
    type="Linear" 
    value="0" 
    minimum="0" 
    maximum="100">
</ejs-progressbar>

<button type="button" id="btnSet100">Set to 100</button>
<button type="button" id="btnSet50">Set to 50</button>

<script>
    let pb = null;
    function bindProgressEvents() {
        const el = document.getElementById('progProgress');
        pb = el && el.ej2_instances && el.ej2_instances[0];
        // Wait until Syncfusion creates the instance
        if (!pb) {
            requestAnimationFrame(bindProgressEvents);
            return;
        }
        // Bind event handlers programmatically
        pb.valueChanged = function (args) {
            console.log('Value changed to:', args.value);
        };
        pb.progressCompleted = function () {
            console.log('Progress completed');
        };
        console.log('Handlers bound successfully');
    }

    document.addEventListener('DOMContentLoaded', function () {
        bindProgressEvents();

        document.getElementById('btnSet100').addEventListener('click', function () {
            if (!pb) return;
            pb.value = 100;
            pb.dataBind();
        });

        document.getElementById('btnSet50').addEventListener('click', function () {
            if (!pb) return;
            pb.value = 50;
            pb.dataBind();
        });
    });
</script>
```

### Event Listener Approach

```cshtml
<ejs-progressbar id="listenerProgress"
                 type="Linear" 
                 value="0"
                 minimum="0" 
                 maximum="100">
</ejs-progressbar>

<button type="button" id="btnSet100">Set to 100</button>
<button type="button" id="btnSet50">Set to 50</button>

<script>
document.addEventListener('DOMContentLoaded', function () {

  function bind() {
    const el = document.getElementById('listenerProgress');
    const pb = el && el.ej2_instances && el.ej2_instances[0];

    if (!pb) {
      requestAnimationFrame(bind);
      return;
    }

    pb.addEventListener('valueChanged', function (args) {
      console.log('Progress changed:', args.value);
    });

    pb.addEventListener('progressCompleted', function () {
      console.log('Progress completed');
    });

    document.getElementById('btnSet100').addEventListener('click', function () {
      pb.value = 100;
      pb.dataBind(); 
    });

    document.getElementById('btnSet50').addEventListener('click', function () {
      pb.value = 50;
      pb.dataBind(); 
    });
  }
  bind();
});
</script>
```

## Common Event Patterns

### Pattern 1: Debounced Value Change Handler

Avoid processing every value change; instead, wait for a pause:

```cshtml
<ejs-progressbar id="debouncedProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="onValueWithDebounce"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
var debounceTimer;
const DEBOUNCE_DELAY = 500;

function onValueWithDebounce(args) {
    clearTimeout(debounceTimer);
    
    debounceTimer = setTimeout(function() {
        console.log('Processing value after pause: ' + args.value);
        // Heavy computation here
    }, DEBOUNCE_DELAY);
}
</script>
```

### Pattern 2: Milestone-Based Actions

```cshtml
<ejs-progressbar id="milestoneProgress" 
                  type="Linear" 
                  value="80"
                  valueChanged="checkMilestones"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" 
                              duration="1000" 
                              delay="0">
    </e-progressbar-animation>
</ejs-progressbar>

<script>
var processedMilestones = new Set();

function checkMilestones(args) {
    const milestones = [25, 50, 75, 100];
    
    milestones.forEach(milestone => {
        if (args.value >= milestone && !processedMilestones.has(milestone)) {
            console.log('Milestone reached: ' + milestone + '%');
            triggerMilestoneAction(milestone);
            processedMilestones.add(milestone);
        }
    });
}

function triggerMilestoneAction(milestone) {
    // Different actions for different milestones
    if (milestone === 50) {
        // Half complete - save progress
        console.log("Half way Completed...");
    } else if (milestone === 100) {
        // Complete - cleanup
        console.log("Completed...");
    }
}
</script>
```

### Pattern 3: Real-Time Progress Display

```cshtml
<ejs-progressbar id="realtimeProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="updateDisplay"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<div id="display">
    <p>Progress: <strong id="percent">0%</strong></p>
    <p>Speed: <strong id="speed">0 items/s</strong></p>
    <p>ETA: <strong id="eta">--</strong></p>
</div>

<script>
var startTime = Date.now();
var lastUpdate = 0;
var lastValue = 0;

function updateDisplay(args) {
    var now = Date.now();
    var elapsed = (now - startTime) / 1000;
    
    // Percent
    document.getElementById('percent').textContent = args.value + '%';
    
    // Speed
    if (now - lastUpdate > 100) {
        var itemsDelta = args.value - lastValue;
        var timeDelta = (now - lastUpdate) / 1000;
        var speed = itemsDelta / timeDelta;
        
        document.getElementById('speed').textContent = speed.toFixed(2) + ' items/s';
        
        // ETA
        if (speed > 0) {
            var remaining = (100 - args.value) / speed;
            var eta = remaining < 60 ? 
                Math.round(remaining) + 's' : 
                Math.round(remaining / 60) + 'm';
            document.getElementById('eta').textContent = eta;
        }
        
        lastUpdate = now;
        lastValue = args.value;
    }
}
</script>
```

## Error Handling

### Handle Errors During Progress

```cshtml
<ejs-progressbar id="errorProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="onProgress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="status">Status: Running</p>

<script>
function onProgress(args) {
    try {
        // Simulate work that might fail
        if (args.value === 50) {
            throw new Error('Processing failed at 50%');
        }
    } catch (error) {
        console.error('Error during progress:', error);
        document.getElementById('status').textContent = 'Status: Error - ' + error.message;
        document.getElementById('status').style.color = 'red';
        
        // Handle error recovery
        recoverFromError();
    }
}

function recoverFromError() {
    // Reset and retry logic
    var pb = document.getElementById('errorProgress').ej2_instances[0];
    pb.value = 0;
}
</script>
```

### Network Request Progress with Error Handling

```cshtml
<ejs-progressbar id="networkProgress" 
                  type="Linear" 
                  value="0"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="networkStatus">Status: Ready</p>

<script>
function uploadWithProgress(file) {
    var progressBar = document.getElementById('networkProgress').ej2_instances[0];
    progressBar.value = 0;
    
    var xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
        }
    });
    
    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            progressBar.value = 100;
            document.getElementById('networkStatus').textContent = 'Status: Complete';
            document.getElementById('networkStatus').style.color = '#4CAF50';
        }
    });
    
    xhr.addEventListener('error', function() {
        document.getElementById('networkStatus').textContent = 'Status: Upload failed';
        document.getElementById('networkStatus').style.color = 'red';
    });
    
    xhr.addEventListener('abort', function() {
        document.getElementById('networkStatus').textContent = 'Status: Upload cancelled';
        document.getElementById('networkStatus').style.color = '#FF9800';
    });
    
    xhr.open('POST', '/api/upload');
    xhr.send(file);
}
</script>
```

## Integration with Application Workflows

### Multi-Step Workflow with Progress Tracking

```cshtml
<ejs-progressbar id="workflowProgress" 
                  type="Linear" 
                  value="0"
                  progressCompleted="onStepComplete"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<p id="stepInfo">Step 1: Validation</p>

<script>
var workflow = [
    {step: 1, name: 'Validation', duration: 2000},
    {step: 2, name: 'Processing', duration: 3000},
    {step: 3, name: 'Saving', duration: 2000}
];

var currentStep = 0;

function onStepComplete(args) {
    currentStep++;
    
    if (currentStep < workflow.length) {
        executeStep(workflow[currentStep]);
    } else {
        document.getElementById('stepInfo').textContent = 'All steps complete!';
    }
}

function executeStep(step) {
    var progressBar = document.getElementById('workflowProgress').ej2_instances[0];
    progressBar.value = 0;
    progressBar.maximum = 100;
    
    document.getElementById('stepInfo').textContent = 
        'Step ' + step.step + ': ' + step.name;
    
    var interval = setInterval(function() {
        progressBar.value += 5;
        
        if (progressBar.value >= 100) {
            clearInterval(interval);
        }
    }, step.duration / 20);
}

// Start first step
executeStep(workflow[0]);
</script>
```

---

Use events to integrate progress bars seamlessly into your application workflows, providing feedback and triggering actions based on progress state changes.
