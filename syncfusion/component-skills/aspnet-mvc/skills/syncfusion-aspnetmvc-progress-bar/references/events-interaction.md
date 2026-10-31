# Events and Interaction

Events allow you to respond to progress bar changes and completion, enabling dynamic updates, notifications, and workflow automation.

## Table of Contents
- [ValueChanged Event](#valuechanged-event)
  - [Basic ValueChanged Event](#basic-valuechanged-event)
  - [Monitoring Progress Updates](#monitoring-progress-updates)
  - [Conditional Logic Based on Value](#conditional-logic-based-on-value)
  - [Validation During Progress](#validation-during-progress)
- [ProgressCompleted Event](#progresscompleted-event)
  - [Basic ProgressCompleted Event](#basic-progresscompleted-event)
  - [Completion Workflow](#completion-workflow)
  - [Chained Operations](#chained-operations)
- [Real-Time Value Updates](#real-time-value-updates)
  - [Simulated Download Progress](#simulated-download-progress)
  - [Server-Triggered Progress](#server-triggered-progress)
  - [File Upload with Event Tracking](#file-upload-with-event-tracking)
- [Indeterminate to Determinate Transition](#indeterminate-to-determinate-transition)
- [Event Integration with UI Updates](#event-integration-with-ui-updates)
  - [Multi-Step Process Display](#multi-step-process-display)
  - [Dashboard with Event Notifications](#dashboard-with-event-notifications)
- [Best Practices for Event Handling](#best-practices-for-event-handling)
  - [1. Avoid Heavy Operations in Event Handlers](#1-avoid-heavy-operations-in-event-handlers)
  - [2. Handle Errors Gracefully](#2-handle-errors-gracefully)
  - [3. Clean Up Resources](#3-clean-up-resources)
  - [4. Use Debouncing for Frequent Updates](#4-use-debouncing-for-frequent-updates)
  - [5. Log Important Events](#5-log-important-events)

## ValueChanged Event

The `ValueChanged` event fires whenever the progress value changes. Use this to trigger actions when progress updates.

### Basic ValueChanged Event

```csharp
@(Html.EJS().ProgressBar("valueChangeProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onValueChanged")  // Event handler name
    .Render()
)

<script>
    function onValueChanged(args) {
        console.log('Progress value changed to: ' + args.value);
    }
</script>
```

The event argument `args` contains:
- `args.value` - The new progress value
- `args.previousValue` - The previous progress value
- `args.isInteraction` - Boolean indicating if change was from user interaction

### Monitoring Progress Updates

```html
@(Html.EJS().ProgressBar("monitorProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onProgressUpdate")
    .Render()
)

<div id="status">Current: 0%</div>

<script>
    function onProgressUpdate(args) {
        document.getElementById('status').innerHTML = 'Current: ' + args.value + '%';
        
        // Show different messages based on progress
        if (args.value >= 100) {
            console.log('Process complete!');
        } else if (args.value >= 75) {
            console.log('Nearly done...');
        } else if (args.value >= 50) {
            console.log('Halfway there...');
        }
    }
</script>
```

### Conditional Logic Based on Value

```html
@(Html.EJS().ProgressBar("conditionalProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onValueCheck")
    .Render()
)

<div id="progressStatus"></div>

<script>
    function onValueCheck(args) {
        var statusDiv = document.getElementById('progressStatus');
        
        if (args.value < 25) {
            statusDiv.innerHTML = '<span style="color: red;">Just started...</span>';
        } else if (args.value < 50) {
            statusDiv.innerHTML = '<span style="color: orange;">In progress...</span>';
        } else if (args.value < 75) {
            statusDiv.innerHTML = '<span style="color: blue;">More than halfway done</span>';
        } else if (args.value < 100) {
            statusDiv.innerHTML = '<span style="color: green;">Almost done!</span>';
        } else {
            statusDiv.innerHTML = '<span style="color: darkgreen;">✓ Complete!</span>';
        }
    }
</script>
```

### Validation During Progress

```html
@(Html.EJS().ProgressBar("validationProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onValidateProgress")
    .Render()
)

<script>
    function onValidateProgress(args) {
        // Prevent progress from going backwards
        if (args.value < args.previousValue) {
            console.warn('Progress cannot go backwards');
            // Reset to previous value (in real app, you'd restore it)
        }
        
        // Ensure value stays within bounds
        if (args.value > 100) {
            console.warn('Progress exceeds 100%');
        }
    }
</script>
```

## ProgressCompleted Event

The `ProgressCompleted` event fires when the progress value reaches the maximum value (100%). Use this to execute completion tasks.

### Basic ProgressCompleted Event

```csharp
@(Html.EJS().ProgressBar("completionProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ProgressCompleted("onProgressComplete")  // Event handler
    .Render()
)

<script>
    function onProgressComplete(args) {
        console.log('Progress completed!');
        alert('Task finished!');
    }
</script>
```

### Completion Workflow

```html
@(Html.EJS().ProgressBar("workflowProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ProgressCompleted("onWorkflowComplete")
    .Render()
)

<div id="result" style="margin-top: 20px;"></div>

<script>
    function onWorkflowComplete(args) {
        var resultDiv = document.getElementById('result');
        
        // Show completion message
        resultDiv.innerHTML = '<div style="color: #4caf50; font-weight: bold;">✓ Process Complete!</div>';
        
        // Enable next step button
        document.getElementById('nextStepBtn').disabled = false;
        
        // Log completion
        console.log('Workflow step completed at ' + new Date().toLocaleTimeString());
    }
</script>
```

### Chained Operations

```html
@(Html.EJS().ProgressBar("chainedProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ProgressCompleted("onStepComplete")
    .Render()
)

<div id="steps">
    <p>Step 1: <span id="step1">Pending</span></p>
    <p>Step 2: <span id="step2">Waiting...</span></p>
    <p>Step 3: <span id="step3">Waiting...</span></p>
</div>

<script>
    var currentStep = 1;
    
    function onStepComplete(args) {
        // Mark current step complete
        document.getElementById('step' + currentStep).innerHTML = '✓ Complete';
        
        // Move to next step
        currentStep++;
        
        if (currentStep <= 3) {
            document.getElementById('step' + currentStep).innerHTML = 'In Progress';
            startNextStep();
        } else {
            document.getElementById('step' + currentStep).innerHTML = 'All steps complete!';
        }
    }
    
    function startNextStep() {
        var progressBar = document.getElementById('chainedProgress').ej2_instances[0];
        progressBar.value = 0;  // Reset for next step
        // Simulate progress
        simulateProgress();
    }
</script>
```

## Real-Time Value Updates

Update progress bar values in response to real-world events:

### Simulated Download Progress

```html
@(Html.EJS().ProgressBar("simulatedDownload")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onDownloadProgress")
    .Render()
)

<button id="startBtn">Start Download</button>
<div id="downloadInfo">Ready to download</div>

<script>
    var isDownloading = false;
    
    document.getElementById('startBtn').addEventListener('click', function() {
        if (!isDownloading) {
            isDownloading = true;
            startDownload();
        }
    });
    
    function startDownload() {
        var progressBar = document.getElementById('simulatedDownload').ej2_instances[0];
        var currentValue = 0;
        
        var interval = setInterval(function() {
            // Simulate variable download speed
            currentValue += Math.random() * 15;
            
            if (currentValue >= 100) {
                currentValue = 100;
                clearInterval(interval);
                isDownloading = false;
                document.getElementById('downloadInfo').innerHTML = 'Download complete!';
            }
            
            progressBar.value = currentValue;
        }, 500);
    }
    
    function onDownloadProgress(args) {
        var speed = Math.random() * 50 + 25;  // 25-75 MB/s
        var remaining = ((100 - args.value) / (args.value / 10)) || 0;
        
        document.getElementById('downloadInfo').innerHTML = 
            Math.round(args.value) + '% - ' + 
            speed.toFixed(1) + ' MB/s - ' + 
            remaining.toFixed(1) + 's remaining';
    }
</script>
```

### Server-Triggered Progress

```html
@(Html.EJS().ProgressBar("serverProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onServerUpdate")
    .Render()
)

<button id="processBtn">Start Server Process</button>

<script>
    document.getElementById('processBtn').addEventListener('click', function() {
        startServerProcess();
    });
    
    function startServerProcess() {
        var progressBar = document.getElementById('serverProgress').ej2_instances[0];
        
        // Fetch progress from server every 500ms
        var interval = setInterval(function() {
            fetch('/api/progress')
                .then(response => response.json())
                .then(data => {
                    progressBar.value = data.progressValue;
                    
                    if (data.progressValue >= 100 || data.complete) {
                        clearInterval(interval);
                    }
                })
                .catch(error => console.error('Error:', error));
        }, 500);
    }
    
    function onServerUpdate(args) {
        console.log('Server progress update: ' + args.value + '%');
    }
</script>
```

### File Upload with Event Tracking

```html
<input type="file" id="fileInput" />
<button id="uploadBtn">Upload</button>

@(Html.EJS().ProgressBar("uploadProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .ValueChanged("onUploadProgress")
    .ProgressCompleted("onUploadComplete")
    .Render()
)

<div id="uploadStatus"></div>

<script>
    document.getElementById('uploadBtn').addEventListener('click', function() {
        var file = document.getElementById('fileInput').files[0];
        if (!file) {
            alert('Please select a file');
            return;
        }
        
        var progressBar = document.getElementById('uploadProgress').ej2_instances[0];
        var formData = new FormData();
        formData.append('file', file);
        
        var xhr = new XMLHttpRequest();
        
        // Track upload progress
        xhr.upload.addEventListener('progress', function(e) {
            if (e.lengthComputable) {
                progressBar.value = (e.loaded / e.total) * 100;
            }
        });
        
        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                progressBar.value = 100;
            }
        });
        
        xhr.open('POST', '/api/upload');
        xhr.send(formData);
    });
    
    function onUploadProgress(args) {
        document.getElementById('uploadStatus').innerHTML = 
            'Uploading: ' + Math.round(args.value) + '%';
    }
    
    function onUploadComplete(args) {
        document.getElementById('uploadStatus').innerHTML = 
            '<span style="color: #4caf50; font-weight: bold;">✓ Upload complete!</span>';
    }
</script>
```

## Indeterminate to Determinate Transition

Transition from indeterminate (unknown progress) to determinate (known progress) states:

```html
@(Html.EJS().ProgressBar("transitionProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .IsIndeterminate(true)
    .Height("30")
    .ProgressCompleted("onTransitionComplete")
    .Render()
)

<div id="transitionStatus">Calculating progress...</div>

<script>
    var progressBar = document.getElementById('transitionProgress').ej2_instances[0];
    
    // After 3 seconds, determine progress
    setTimeout(function() {
        progressBar.isIndeterminate = false;
        progressBar.value = 0;
        document.getElementById('transitionStatus').innerHTML = 'Progress determined, now processing...';
        
        // Start incremental progress
        var interval = setInterval(function() {
            progressBar.value += 10;
            
            if (progressBar.value >= 100) {
                clearInterval(interval);
            }
        }, 500);
    }, 3000);
    
    function onTransitionComplete(args) {
        document.getElementById('transitionStatus').innerHTML = 'Process complete!';
    }
</script>
```

## Event Integration with UI Updates

Combine events with UI updates for interactive progress tracking:

### Multi-Step Process Display

```html
<div style="margin: 20px;">
    <h3>Multi-Step Process</h3>
    
    @(Html.EJS().ProgressBar("multiStepProgress")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
        .Value(0)
        .Height("250")
        .Width("250")
        .ValueChanged("onMultiStepUpdate")
        .ProgressCompleted("onMultiStepComplete")
        .Render()
    )
    
    <div id="stepDetails" style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
        <h4>Current Step: <span id="currentStep">Initializing</span></h4>
        <p>Progress: <span id="stepProgress">0%</span></p>
        <div id="stepDescription"></div>
    </div>
</div>

<script>
    var steps = [
        { name: 'Validating Data', desc: 'Checking input data for errors' },
        { name: 'Processing', desc: 'Processing files and records' },
        { name: 'Generating Report', desc: 'Creating output report' },
        { name: 'Finalizing', desc: 'Saving results and cleanup' }
    ];
    
    function onMultiStepUpdate(args) {
        var stepIndex = Math.floor((args.value / 100) * steps.length);
        stepIndex = Math.min(stepIndex, steps.length - 1);
        
        document.getElementById('currentStep').innerHTML = steps[stepIndex].name;
        document.getElementById('stepProgress').innerHTML = Math.round(args.value) + '%';
        document.getElementById('stepDescription').innerHTML = steps[stepIndex].desc;
    }
    
    function onMultiStepComplete(args) {
        document.getElementById('currentStep').innerHTML = 'All Steps Complete';
        document.getElementById('stepDescription').innerHTML = 
            '<span style="color: #4caf50; font-weight: bold;">✓ Process finished successfully!</span>';
    }
</script>
```

### Dashboard with Event Notifications

```html
<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin: 20px;">
    
    <div>
        <h3>Data Processing</h3>
        @(Html.EJS().ProgressBar("dashboardProgress")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
            .Value(0)
            .Height("30")
            .ValueChanged("onDashboardUpdate")
            .ProgressCompleted("onDashboardComplete")
            .Render()
        )
    </div>
    
    <div id="notifications" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; max-height: 300px; overflow-y: auto;">
        <h4>Events</h4>
        <div id="eventLog"></div>
    </div>
</div>

<script>
    var eventLog = [];
    
    function addEvent(message) {
        eventLog.push(new Date().toLocaleTimeString() + ' - ' + message);
        updateEventLog();
    }
    
    function updateEventLog() {
        var logDiv = document.getElementById('eventLog');
        logDiv.innerHTML = eventLog.map(e => '<p style="font-size: 12px; margin: 5px 0;">' + e + '</p>').join('');
        logDiv.scrollTop = logDiv.scrollHeight;
    }
    
    function onDashboardUpdate(args) {
        if (args.value % 25 === 0 && args.value > 0) {
            addEvent('Progress milestone: ' + args.value + '%');
        }
    }
    
    function onDashboardComplete(args) {
        addEvent('✓ Processing complete!');
    }
    
    // Start processing
    var progressBar = document.getElementById('dashboardProgress').ej2_instances[0];
    var interval = setInterval(function() {
        progressBar.value += Math.random() * 10;
        if (progressBar.value >= 100) {
            progressBar.value = 100;
            clearInterval(interval);
        }
    }, 500);
</script>
```

## Best Practices for Event Handling

### 1. Avoid Heavy Operations in Event Handlers
```javascript
// ❌ Bad - Heavy operation in event
function onValueChanged(args) {
    // Don't do complex calculations here
    complexCalculation();
}

// ✅ Good - Defer heavy work
function onValueChanged(args) {
    setTimeout(function() {
        complexCalculation();
    }, 0);
}
```

### 2. Handle Errors Gracefully
```javascript
function onProgressComplete(args) {
    try {
        // Perform completion actions
        sendCompletionNotification();
    } catch (error) {
        console.error('Error on completion:', error);
    }
}
```

### 3. Clean Up Resources
```javascript
function startProgressTracking() {
    var interval = setInterval(function() {
        // Update progress
    }, 500);
}

// Remember to clear interval when done
clearInterval(interval);
```

### 4. Use Debouncing for Frequent Updates
```javascript
var debounceTimeout;

function onValueChanged(args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(function() {
        // Execute less frequently
        updateUI(args.value);
    }, 100);
}
```

### 5. Log Important Events
```javascript
function onProgressComplete(args) {
    console.log('Progress completed', {
        timestamp: new Date(),
        finalValue: args.value,
        sessionId: getCurrentSessionId()
    });
}
```
