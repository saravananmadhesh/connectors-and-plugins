# Modes and States

## Table of Contents
- [Understanding Progress Modes](#understanding-progress-modes)
- [Determinate Mode](#determinate-mode)
  - [Basic Determinate Progress](#basic-determinate-progress)
  - [Determinate with Different Shapes](#determinate-with-different-shapes)
  - [Updating Determinate Progress Programmatically](#updating-determinate-progress-programmatically)
  - [Use Cases for Determinate Mode](#use-cases-for-determinate-mode)
  - [Determinate Event Handling](#determinate-event-handling)
- [Indeterminate Mode](#indeterminate-mode)
  - [Basic Indeterminate Progress](#basic-indeterminate-progress)
  - [Indeterminate with Different Shapes](#indeterminate-with-different-shapes)
  - [Switching from Indeterminate to Determinate](#switching-from-indeterminate-to-determinate)
  - [Use Cases for Indeterminate Mode](#use-cases-for-indeterminate-mode)
  - [Indeterminate with Custom Message](#indeterminate-with-custom-message)
- [Buffer Mode](#buffer-mode)
  - [Basic Buffer Mode](#basic-buffer-mode)
  - [Buffer Progress Update Simulation](#buffer-progress-update-simulation)
  - [Buffer Mode with Circular Progress](#buffer-mode-with-circular-progress)
  - [Use Cases for Buffer Mode](#use-cases-for-buffer-mode)
  - [Buffer Progress Styling](#buffer-progress-styling)
- [Transitioning Between States](#transitioning-between-states)
  - [Dynamic Mode Switching](#dynamic-mode-switching)
  - [Determinate to Buffer Transition](#determinate-to-buffer-transition)
- [Common State Patterns](#common-state-patterns)
  - [Pattern 1: Three-Phase Progress](#pattern-1-three-phase-progress)
  - [Pattern 2: Buffer with Fallback](#pattern-2-buffer-with-fallback)
  - [Pattern 3: Timeout Recovery](#pattern-3-timeout-recovery)


## Understanding Progress Modes

Progress Bar supports three distinct modes to represent different types of progress scenarios. The mode you choose depends on whether you know the total duration of the task and need to communicate that information to users.

Progress modes affect both the visual representation and the user experience:
- **Determinate**: Shows known, measurable progress
- **Indeterminate**: Shows activity without progress indication
- **Buffer**: Shows two-layer progress for buffered operations

These modes can be combined and switched dynamically based on application state.

## Determinate Mode

Determinate mode displays progress for tasks where the total duration is known or can be estimated. This is the default mode and the most common progress representation.

### Basic Determinate Progress

```cshtml
<ejs-progressbar id="determinate" 
                  type="Linear" 
                  value="50" 
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Key characteristics:
- Shows specific value (50% in example)
- Fills from minimum to maximum
- User understands completion percentage
- Bar remains at set value until updated

### Determinate with Different Shapes

Determinate mode works with all progress bar shapes:

```cshtml
<!-- Linear determinate -->
<ejs-progressbar id="detLinear" 
                  type="Linear" 
                  value="60">
</ejs-progressbar>

<!-- Circular determinate -->
<ejs-progressbar id="detCircular" 
                  type="Circular" 
                  value="75"
                  showProgressValue="true">
</ejs-progressbar>
```

### Updating Determinate Progress Programmatically

Update progress values in response to real operations:

```cshtml
<ejs-progressbar id="uploadProgress" 
                  type="Linear" 
                  value="0" 
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<button onclick="simulateUpload()">Start Upload</button>

<script>
function simulateUpload() {
    var progressBar = document.getElementById('uploadProgress').ej2_instances[0];
    var currentValue = 0;
    
    var uploadInterval = setInterval(function() {
        currentValue += Math.random() * 25;
        
        if (currentValue >= 100) {
            progressBar.value = 100;
            clearInterval(uploadInterval);
        } else {
            progressBar.value = currentValue;
        }
    }, 500);
}
</script>
```

This example:
- Starts at 0% (not started)
- Increments progress randomly (simulating actual upload)
- Continues until reaching 100% (complete)
- Updates the progress bar value during operation

### Use Cases for Determinate Mode

- **File uploads** - Show % of bytes transferred
- **File downloads** - Display completion percentage
- **Database queries** - Show % of records processed
- **Video encoding** - Display % frames encoded
- **Batch operations** - Show items completed
- **Page load** - Display % resources loaded
- **Data processing** - Show % of data processed
- **Installation progress** - Display % installation complete

### Determinate Event Handling

Handle progress events to trigger actions when milestones or completion reached:

```cshtml
<ejs-progressbar id="eventProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="onValueChange"
                  progressCompleted="onComplete">
</ejs-progressbar>

<script>
function onValueChange(args) {
    console.log('Progress updated to: ' + args.value + '%');
    
    // Trigger actions at milestones
    if (args.value === 50) {
        console.log('Halfway there!');
    }
}

function onComplete(args) {
    console.log('Task completed successfully!');
    // Show success message, enable next button, etc.
}
</script>
```

## Indeterminate Mode

Indeterminate mode displays activity when the progress duration is unknown or cannot be reliably estimated. The bar shows continuous animation indicating ongoing work without claiming knowledge of completion time.

### Basic Indeterminate Progress

```cshtml
<ejs-progressbar id="indeterminate" 
                  type="Linear"
                  value="20" 
                  isIndeterminate="true">
</ejs-progressbar>
```

Key characteristics:
- No specific value displayed
- Continuously animated bar
- No end value defined
- Communicates "something is happening"
- Duration is unknown to the application

### Indeterminate with Different Shapes

```cshtml
<!-- Linear indeterminate -->
<ejs-progressbar id="indLinear" 
                  type="Linear"
                  value="30" 
                  isIndeterminate="true">
</ejs-progressbar>

<!-- Circular indeterminate (spinning indicator) -->
<ejs-progressbar id="indCircular" 
                  type="Circular"
                  value="30" 
                  isIndeterminate="true">
</ejs-progressbar>
```

### Switching from Indeterminate to Determinate

Transition from indeterminate (estimating) to determinate (measuring) when progress becomes known:

```cshtml
<ejs-progressbar id="hybridProgress"
                 type="Linear"
                 height="20px"
                 minimum="0"
                 maximum="100"
                 value="20"
                 isIndeterminate="true"
                 loaded="onHybridLoaded">
</ejs-progressbar>

<button type="button" id="btnSwitch" style="margin-top:12px;">
    Switch to determinate
</button>

<script>
    let pb;
    function onHybridLoaded() {
        pb = document.getElementById('hybridProgress').ej2_instances[0];
        console.log('ProgressBar loaded:', pb);
    }
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('btnSwitch').addEventListener('click', function () {
            if (!pb) {
                console.error('ProgressBar not ready yet. Loaded event did not fire.');
                return;
            }
            pb.isIndeterminate = false;     
            pb.minimum = 0;                 
            pb.maximum = 100;               
            pb.value = 10;                  
            pb.dataBind();                 
            pb.refresh();                   
            let v = 10;
            const timer = setInterval(function () {
                v += 10;
                pb.value = v;
                pb.dataBind();             

                if (v >= 100) clearInterval(timer);
            }, 500);
        });
    });
</script>
```

Common workflow:
1. Start operation with indeterminate mode (don't know size)
2. Server responds with total size
3. Switch to determinate mode
4. Track actual progress toward the known total

### Use Cases for Indeterminate Mode

- **Initial data loading** - Before size is known
- **API calls** - Duration is unpredictable
- **Search operations** - Duration varies
- **Authentication** - Variable server response time
- **Background processing** - Asynchronous tasks
- **System checks** - Antivirus scanning, disk checking
- **Initial connection establishment** - Before progress tracking begins
- **Page transitions** - Between navigation events

### Indeterminate with Custom Message

Combine indeterminate progress with explanatory text:

```cshtml
<div style="text-align: center;">
    <ejs-progressbar id="fetchingProgress" 
                      type="Linear"
                      value="20" 
                      isIndeterminate="true">
    </ejs-progressbar>
    <p id="statusMessage">Fetching data from server...</p>
</div>

<script>
function updateStatus(message) {
    document.getElementById('statusMessage').textContent = message;
}

// Example usage
updateStatus('Connecting to database...');
// ... later ...
updateStatus('Processing results...');
</script>
```

Provides user feedback about what's happening during indeterminate operations.

## Buffer Mode

Buffer mode displays two progress layers simultaneously:
1. **Primary progress** - Main task completion
2. **Secondary progress** - Buffered or pre-loaded content

This is essential for streaming applications where buffering happens ahead of actual playback or downloading.

### Basic Buffer Mode

```cshtml
<ejs-progressbar id="bufferProgress" 
                  type="Linear" 
                  value="30" 
                  secondaryProgress="60"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Visual interpretation:
- Primary progress shows 30% (actual position - darker color)
- Secondary progress shows 60% (buffered content - lighter shade)
- 30% gap between them represents upcoming buffered content

### Buffer Progress Update Simulation

Simulate a streaming scenario:

```cshtml
<ejs-progressbar id="streamProgress" 
                  type="Linear" 
                  value="0" 
                  secondaryProgress="0"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<button onclick="startStream()">Start Streaming</button>

<script>
function startStream() {
    var progressBar = document.getElementById('streamProgress').ej2_instances[0];
    
    // Simulate playback advancing at normal speed
    var playbackInterval = setInterval(function() {
        if (progressBar.value < 100) {
            progressBar.value += 2;
        } else {
            clearInterval(playbackInterval);
        }
    }, 200);
    
    // Simulate buffering ahead at faster speed
    var bufferInterval = setInterval(function() {
        if (progressBar.secondaryProgress < 100) {
            progressBar.secondaryProgress += 3;
        } else {
            clearInterval(bufferInterval);
        }
    }, 150);
}
</script>
```

The buffer advances faster than playback, providing a buffer of upcoming content.

### Buffer Mode with Circular Progress

Buffer mode works with all progress bar types:

```cshtml
<ejs-progressbar id="bufferCircular" 
                  type="Circular" 
                  value="40" 
                  secondaryProgress="70"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### Use Cases for Buffer Mode

- **Video/audio streaming** - Playback vs. buffered content
- **Media playback** - Downloaded vs. playing portion
- **Partial downloads** - Downloaded vs. total file size
- **Background sync** - Synced vs. total items
- **Data transfer** - Transferred vs. total with buffer ahead
- **Cache loading** - Cached vs. total resources
- **Progressive loading** - Loaded vs. available content

### Buffer Progress Styling

Control the appearance of both progress layers:

```cshtml
<ejs-progressbar id="styledBuffer" 
                  type="Linear" 
                  value="40" 
                  secondaryProgress="70"
                  trackThickness="6"
                  progressThickness="6"
                  secondaryProgressThickness="6"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Properties:
- `progressThickness` - Primary progress bar thickness
- `secondaryProgressThickness` - Secondary progress bar thickness
- `trackThickness` - Background track thickness

## Transitioning Between States

### Dynamic Mode Switching

Change modes based on application state:

```cshtml
<input type="file" id="fileInput" />
<button type="button" id="uploadBtn">Upload</button>
<div id="statusText" style="margin-top:8px;font-weight:600;"></div>

<ejs-progressbar id="dynamicProgress"
                 type="Linear"
                 height="20px"
                 trackThickness="20"
                 progressThickness="20"
                 minimum="0"
                 maximum="100"
                 value="0"
                 isIndeterminate="true"
                 showProgressValue="true"
                 trackColor="#E0E0E0"
                 progressColor="#0D6EFD"
                 loaded="onPbLoaded">
</ejs-progressbar>

<script>
let pb = null;
let pendingPercent = 0;
let rafScheduled = false;
function onPbLoaded() {
  pb = document.getElementById('dynamicProgress').ej2_instances[0];
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('uploadBtn').addEventListener('click', function () {
    const file = document.getElementById('fileInput').files[0];
    if (!file) return;
    if (!pb) {
      console.error('ProgressBar not initialized. Check <ejs-scripts> in layout.');
      return;
    }
    startUpload(file);
  });
});

function startUpload(file) {
  document.getElementById('statusText').textContent = 'Preparing…';

  // Phase 1: Indeterminate
  pb.isIndeterminate = true;
  pb.value = 20;
  pb.dataBind(); 

  // Phase 2: Determinate (0..100 percent scale)
  pb.isIndeterminate = false;
  pb.minimum = 0;
  pb.maximum = 100;
  pb.value = 0;
  pb.progressColor = '#0D6EFD'; 
  pb.dataBind();                

  document.getElementById('statusText').textContent = 'Uploading…';
  uploadFileXHR(file);
}

function uploadFileXHR(file) {
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  fd.append('file', file);

  xhr.upload.onprogress = function (e) {
    if (!e.lengthComputable) return;
    pendingPercent = Math.min(100, Math.round((e.loaded / e.total) * 100));
    if (!rafScheduled) {
      rafScheduled = true;
      requestAnimationFrame(applyProgressFrame);
    }
  };
  xhr.onload = function () {
    pendingPercent = 100;
    applyProgressFrame(); // apply immediately
    pb.progressColor = '#22C55E';  // supported property [1](https://deepwiki.com/dotnet/core/7.1-.net-core-3.x-and-earlier)
    setTimeout(() => pb.refresh(), 0); // safe refresh (not inside loaded) 
    document.getElementById('statusText').textContent = 'Completed ✅';
  };
  xhr.onerror = function () {
    pb.progressColor = '#EF4444';
    setTimeout(() => pb.refresh(), 0); // apply error color 
    document.getElementById('statusText').textContent = 'Upload failed ❌';
  };

  xhr.open('POST', '/api/upload');
  xhr.send(fd);
}

function applyProgressFrame() {
  rafScheduled = false;
  pb.value = pendingPercent;
  pb.dataBind(); // fast apply for value updates 
}
</script>
```

### Determinate to Buffer Transition

Switch from determinate to buffer mode when buffering becomes relevant:

```cshtml
<ejs-progressbar id="switchProgress"
                 type="Linear"
                 value="50"
                 secondaryProgress="0"
                 minimum="0"
                 maximum="100"
                 height="20px"
                 trackThickness="20"
                 progressThickness="20"
                 showProgressValue="true"
                 trackColor="#E0E0E0"
                 progressColor="#0D6EFD"
                 secondaryProgressColor="#9CCC65">
    <e-progressbar-animation enable="true" duration="600" delay="0"></e-progressbar-animation>
</ejs-progressbar>

<script>
function switchToBuffer() {
    var pb = document.getElementById('switchProgress').ej2_instances[0];
    var buffer = pb.value + 20;
    if (buffer > pb.maximum) buffer = pb.maximum;
    pb.secondaryProgress = buffer; 
    pb.dataBind();   
    pb.refresh();     
}
</script>
```

## Common State Patterns

### Pattern 1: Three-Phase Progress

1. Indeterminate: Initial connection
2. Determinate: Progress tracking
3. Complete: Success or failure

```cshtml
<ejs-progressbar id="phaseProgress" 
                  type="Linear" 
                  value="20"
                  isIndeterminate="true">
</ejs-progressbar>

<script>
// Phase 1: Indeterminate
setTimeout(() => {
    var pb = document.getElementById('phaseProgress').ej2_instances[0];
    
    // Phase 2: Determinate
    pb.isIndeterminate = false;
    pb.value = 0;
    
    var interval = setInterval(() => {
        pb.value += 10;
        if (pb.value >= 100) {
            clearInterval(interval);
            // Phase 3: Complete - update UI
        }
    }, 500);
    pb.refresh();
}, 2000);
</script>
```

### Pattern 2: Buffer with Fallback

Switch to buffer only if buffering data is available:

```cshtml
<button type="button" onclick="updateProgress(20, 40)">Set 20 / buffer 40</button>
<button type="button" onclick="updateProgress(60, 80)">Set 60 / buffer 80</button>
<button type="button" onclick="updateProgress(70)">Set 70 / no buffer</button>

<ejs-progressbar id="fallbackProgress"
                 type="Linear"
                 value="20"
                 secondaryProgress="0"
                 minimum="0"
                 maximum="100">
</ejs-progressbar>

<script>
function updateProgress(primary, secondary = null) {
    var pb = document.getElementById('fallbackProgress').ej2_instances[0];
    pb.value = primary;
    // Only set secondaryProgress when available
    if (secondary !== null && secondary !== undefined) {
        pb.secondaryProgress = secondary;
    } else {
        pb.secondaryProgress = 0; // fallback: hide/reset buffer
    }
    pb.dataBind();  
    pb.refresh();
}
</script>
```

### Pattern 3: Timeout Recovery

Transition from indeterminate if operation takes too long:

```cshtml
<ejs-progressbar id="timeoutProgress"
                 type="Linear"
                 value="20"
                 minimum="0"
                 maximum="100"
                 isIndeterminate="true">
</ejs-progressbar>

<script>
let timeoutHandle;
document.addEventListener('DOMContentLoaded', function () {
    const pb = document.getElementById('timeoutProgress').ej2_instances[0];
    // After 30s: fallback to determinate 50%
    timeoutHandle = setTimeout(function () {
        pb.isIndeterminate = false;  // valid property 
        pb.value = 50;               // show fallback progress 
        pb.dataBind();               // apply changes immediately 
        pb.refresh();
    }, 30000);
});
// Call this whenever you receive real progress (0..100)
function onRealProgress(value) {
    clearTimeout(timeoutHandle);
    const pb = document.getElementById('timeoutProgress').ej2_instances[0];
    pb.isIndeterminate = false;                      
    pb.value = Math.max(0, Math.min(100, value));    
    pb.dataBind();
    pb.refresh();                                   
}
</script>
```

---

Choose the appropriate mode for your use case: determinate for known-duration tasks, indeterminate for unknown-duration tasks, and buffer for streaming scenarios. You can dynamically switch between modes as your application's state changes.
