# Labels and Annotations

## Table of Contents
- [Understanding Labels and Annotations](#understanding-labels-and-annotations)
  - [When to Use](#when-to-use)
- [Progress Value Display](#progress-value-display)
  - [Showing Progress Percentage](#showing-progress-percentage)
  - [Custom Value Format](#custom-value-format)
- [Text Labels](#text-labels)
  - [Label Below Linear Progress](#label-below-linear-progress)
  - [Dynamic Label Text](#dynamic-label-text)
  - [Multi-Line Labels](#multi-line-labels)
- [Annotations for Circular Progress](#annotations-for-circular-progress)
  - [Basic Annotation with Text](#basic-annotation-with-text)
  - [Multi-Line Annotations](#multi-line-annotations)
  - [Annotations with Images](#annotations-with-images)
  - [Annotations with Buttons](#annotations-with-buttons)
  - [Status-Based Annotations](#status-based-annotations)
- [Dynamic Label Updates](#dynamic-label-updates)
  - [Real-Time Status Updates](#real-time-status-updates)
  - [Milestone Announcements](#milestone-announcements)
- [Label Positioning and Styling](#label-positioning-and-styling)
  - [CSS-Based Label Positioning](#css-based-label-positioning)
  - [Styled Labels](#styled-labels)
- [Common Patterns](#common-patterns)
  - [Pattern 1: File Upload with Size and Percentage](#pattern-1-file-upload-with-size-and-percentage)
  - [Pattern 2: Multi-Step Process](#pattern-2-multi-step-process)
  - [Pattern 3: Download with Time Remaining](#pattern-3-download-with-time-remaining)


## Understanding Labels and Annotations

Progress bars can display additional information through labels and annotations:

- **Labels** - Simple text showing progress value or status
- **Annotations** - Rich content (HTML, images, buttons) typically in circular progress centers
- **Value Display** - Automatic percentage or custom numeric display

### When to Use

- **Labels** - When you need quick percentage display or simple text
- **Annotations** - When you need complex content with images, buttons, or custom HTML
- **Value Display** - For quick visual reference of current progress

## Progress Value Display

The simplest way to show progress is the automatic value display.

### Showing Progress Percentage

```cshtml
<ejs-progressbar id="percentProgress" 
                  type="Circular" 
                  value="65"
                  showProgressValue="true"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

With `showProgressValue="true"`:
- Circular bars display percentage in the center (65%)
- Linear bars display percentage at the end

`showProgressValue="true"` displays the progress value as a label in the ProgressBar.

### Custom Value Format

Override the default percentage display with custom formatting:

```cshtml
<style>
    .e-progressbar .e-progress-value {
        font-size: 18px;
        font-weight: bold;
        color: #2196F3;
    }
</style>

<ejs-progressbar id="customValue" 
                  type="Circular" 
                  value="45"
                  showProgressValue="true"
                  textRender="onTextRender"
                  cssClass="custom-format"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
    // EJ2 fires this BEFORE rendering the label text, so it's the right place to customize it.
    function onTextRender(args) {
        args.text = args.text + ' Complete';
    }
</script>
```

## Text Labels

Add simple text labels to progress bars for status or context information.

### Label Below Linear Progress

```cshtml
<div>
    <ejs-progressbar id="labeledProgress" 
                      type="Linear" 
                      value="50"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <p style="margin-top: 5px; color: #666;">50% Complete - Uploading...</p>
</div>
```

### Dynamic Label Text

```cshtml
<div>
    <ejs-progressbar id="dynamicProgress" 
                      type="Linear" 
                      value="30"
                      minimum="0" 
                      maximum="100"
                      valueChanged="onProgressChange">
    </ejs-progressbar>
    <p id="statusLabel">0% - Starting...</p>
    <p id="detailLabel">Estimating time remaining...</p>
</div>

<script>
var startTime = Date.now();
function getProgressValue() {
        var pb = document.getElementById('dynamicProgress').ej2_instances[0];
        console.log(pb)
        return pb.value; // ✅ always available
}

function onProgressChange(args) {
    var percentage = getProgressValue();
    var elapsed = (Date.now() - startTime) / 1000;
    var rate = percentage / elapsed;
    var estimated = ((100 - percentage) / rate);
    
    document.getElementById('statusLabel').textContent = 
        percentage + '% - ' + Math.round(estimated) + 's remaining';
    
    document.getElementById('detailLabel').textContent = 
        'Elapsed: ' + Math.round(elapsed) + 's';
}
</script>
```

### Multi-Line Labels

```cshtml
<style>
    .label-container {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 14px;
    }
    
    .label-left { color: #666; }
    .label-right { 
        color: #2196F3; 
        font-weight: bold;
    }
</style>

<div>
    <ejs-progressbar id="multiProgress" 
                      type="Linear" 
                      value="65"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <div class="label-container">
        <span class="label-left">Processing Data</span>
        <span class="label-right">65 of 100 items</span>
    </div>
</div>
```

## Annotations for Circular Progress

Annotations allow rich content (HTML, images, buttons) in the center of circular progress bars.

### Basic Annotation with Text

```cshtml
<ejs-progressbar id="annotatedProgress" 
                  type="Circular" 
                  value="70"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-progressbarannotations>
        <e-progressbar-progressbarannotation content="<span>70%</span>"></e-progressbar-progressbarannotation>
    </e-progressbar-progressbarannotations>
</ejs-progressbar>
```

The `content` property accepts any HTML string.

### Multi-Line Annotations

```cshtml
<ejs-progressbar id="multilineAnnotation" 
                  type="Circular" 
                  value="55"
                  height="170px"
                  radius="80px"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-progressbarannotations>
        <e-progressbar-progressbarannotation content="<div style='text-align:center'><p style='margin:0;font-size:24px;font-weight:bold'>55%</p><p style='margin:5px 0 0 0;font-size:12px;color:#999'>Downloaded</p></div>"></e-progressbar-progressbarannotation>
    </e-progressbar-progressbarannotations>
</ejs-progressbar>
```

### Annotations with Images

```cshtml
<ejs-progressbar id="imageAnnotation" 
                  type="Circular" 
                  value="80"
                  height="200px"
                  radius="90px"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-progressbarannotations>
        <e-progressbar-progressbarannotation content="<img src='https://upload.wikimedia.org/wikipedia/commons/b/bd/Checkmark_green.svg' style='width:40px;height:40px;'/>"></e-progressbar-progressbarannotation>
    </e-progressbar-progressbarannotations>
</ejs-progressbar>
```

Useful for:
- Success/error icons on completion
- Status badges
- Visual indicators

### Annotations with Buttons

Add interactive buttons in the annotation:

```cshtml
<ejs-progressbar id="buttonAnnotation" 
                  type="Circular" 
                  value="0"
                  height="150px"
                  radius="85px"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-progressbarannotations>
        <e-progressbar-progressbarannotation content="<div style='text-align:center'><p id='percentText'>0%</p><button onclick='startTask()' style='padding:8px 16px;background:#2196F3;color:white;border:none;border-radius:4px;cursor:pointer'>Start</button></div>"></e-progressbar-progressbarannotation>
    </e-progressbar-progressbarannotations>
</ejs-progressbar>

<script>
var isRunning = false;

function startTask() {
    if (isRunning) return;
    
    isRunning = true;
    var pb = document.getElementById('buttonAnnotation').ej2_instances[0];
    var interval = setInterval(function() {
        pb.value += 5;
        document.getElementById('percentText').textContent = pb.value + '%';
        
        if (pb.value >= 100) {
            clearInterval(interval);
            updateAnnotation('<p>Complete!</p>');
            isRunning = false;
        }
    }, 300);
}

function updateAnnotation(content) {
    // Update annotation dynamically
    var pb = document.getElementById('buttonAnnotation').ej2_instances[0];
    // Note: Dynamic annotation updates require custom implementation
}
</script>
```

### Status-Based Annotations

```cshtml
<ejs-progressbar id="statusAnnotation" 
                  type="Circular" 
                  value="100"
                  height="150px"
                  radius="80px"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-progressbarannotations>
        <e-progressbar-progressbarannotation content="<div style='text-align:center;color:#4CAF50'><p style='margin:0;font-size:28px'>✓</p><p style='margin:5px 0 0 0'>Complete</p></div>"></e-progressbar-progressbarannotation>
    </e-progressbar-progressbarannotations>
</ejs-progressbar>
```

## Dynamic Label Updates

Update labels and annotations as progress changes.

### Real-Time Status Updates

```cshtml
<div>
    <ejs-progressbar id="realtimeProgress" 
                      type="Linear" 
                      value="50"
                      valueChanged="updateStatus"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <p id="speedLabel">Speed: -- MB/s</p>
    <p id="timeLabel">Time: -- seconds</p>
</div>

<script>
var lastValue = 0;
var lastTime = Date.now();
var totalBytes = 1000; // Example: 1000 MB

function updateStatus(args) {
    var currentTime = Date.now();
    var timeDelta = (currentTime - lastTime) / 1000;
    var valueDelta = args.value - lastValue;
    
    if (timeDelta > 0) {
        var speed = (valueDelta / 100 * totalBytes) / timeDelta;
        var remaining = ((100 - args.value) / 100 * totalBytes) / speed;
        
        document.getElementById('speedLabel').textContent = 
            'Speed: ' + speed.toFixed(2) + ' MB/s';
        document.getElementById('timeLabel').textContent = 
            'Time: ' + Math.ceil(remaining) + 's remaining';
    }
    
    lastValue = args.value;
    lastTime = currentTime;
}
</script>
```

### Milestone Announcements

```cshtml
<div>
    <ejs-progressbar id="milestoneProgress" 
                      type="Circular" 
                      value="25"
                      valueChanged="checkMilestone"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <p id="milestoneMessage" style="height:24px;color:#FF9800;font-weight:bold;"></p>
</div>

<script>
var milestones = [
    {value: 25, message: '✓ Quarter Complete'},
    {value: 50, message: '✓ Halfway There'},
    {value: 75, message: '✓ Almost Done'},
    {value: 100, message: '✓ Complete!'}
];

var announcedMilestones = new Set();

function checkMilestone(args) {
    milestones.forEach(milestone => {
        if (args.value >= milestone.value && !announcedMilestones.has(milestone.value)) {
            document.getElementById('milestoneMessage').textContent = milestone.message;
            announcedMilestones.add(milestone.value);
        }
    });
}
</script>
```

## Label Positioning and Styling

### CSS-Based Label Positioning

```cshtml
<style>
    .label-top {
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        text-align: center;
    }
    
    .label-bottom {
        position: absolute;
        bottom: -30px;
        left: 0;
        right: 0;
        text-align: center;
    }
    
    .label-right {
        position: absolute;
        right: -50px;
        top: 50%;
        transform: translateY(-50%);
    }
</style>

<div style="position:relative;margin:50px 0;padding:30px 0;">
    <div class="label-top">Uploading File...</div>
    <ejs-progressbar id="positionedProgress" 
                      type="Linear" 
                      value="60"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <div class="label-bottom">60 of 100 MB</div>
</div>
```

### Styled Labels

```cshtml
<style>
    .styled-label {
        font-size: 13px;
        color: #666;
        margin-top: 8px;
        padding: 4px 8px;
        background: #f5f5f5;
        border-radius: 4px;
        border-left: 3px solid #2196F3;
    }
    
    .styled-label.complete {
        color: #4CAF50;
        background: #f1f8e9;
        border-left-color: #4CAF50;
    }
</style>

<div>
    <ejs-progressbar id="styledProgress" 
                      type="Linear" 
                      value="75"
                      valueChanged="updateLabel"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <div id="styledLabel" class="styled-label">Processing: 75%</div>
</div>

<script>
function updateLabel(args) {
    var label = document.getElementById('styledLabel');
    label.textContent = 'Processing: ' + args.value + '%';
    
    if (args.value === 100) {
        label.classList.add('complete');
        label.textContent = 'Complete!';
    }
}
</script>
```

## Common Patterns

### Pattern 1: File Upload with Size and Percentage

```cshtml
<div>
    <ejs-progressbar id="uploadProgress" 
                      type="Linear" 
                      value="35"
                      animated="true"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;">
        <span>Uploading file.zip</span>
        <span><strong>35 MB</strong> / 100 MB (35%)</span>
    </div>
</div>
```

### Pattern 2: Multi-Step Process

```cshtml
<div>
    <ejs-progressbar id="processProgress" 
                      type="Circular" 
                      value="66"
                      showProgressValue="true"
                      radius="70px"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <div style="text-align:center;margin-top:16px;font-size:13px;">
        <p><strong>Step 2 of 3</strong></p>
        <p style="color:#999;margin:4px 0;">Validating data...</p>
    </div>
</div>
```

### Pattern 3: Download with Time Remaining

```cshtml
<div>
    <ejs-progressbar id="downloadProgress" 
                      type="Linear" 
                      value="45"
                      minimum="0" 
                      maximum="100">
    </ejs-progressbar>
    <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;color:#666;">
        <span>Downloading...</span>
        <span>45% | 2:15 remaining</span>
    </div>
</div>
```

---

Use labels and annotations to provide context and clarity about progress. Clear communication helps users understand what's happening and how long it might take.
