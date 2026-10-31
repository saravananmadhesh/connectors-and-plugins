# Features and Interactions (TypeScript & JavaScript)

- [purpose](#purpose)
- [annotations-and-labels](#annotations-and-labels)
  - [basic-annotations](#basic-annotations)
  - [progress-percentage-display](#progress-percentage-display)
  - [custom-milestone-markers](#custom-milestone-markers)
- [animation-configuration](#animation-configuration)
  - [enabling-animation](#enabling-animation)
  - [animation-timing](#animation-timing)
  - [indeterminate-animation](#indeterminate-animation)
- [tooltips](#tooltips)
  - [basic-tooltip](#basic-tooltip)
  - [custom-tooltip-content](#custom-tooltip-content)
- [event-handling](#event-handling)
  - [value-changed-events](#value-changed-events)
  - [completion-events](#completion-events)
  - [text-render-events](#text-render-events)
  - [multiple-event-handling](#multiple-event-handling)
- [range-indicators](#range-indicators)
  - [color-coded-ranges](#color-coded-ranges)
  - [threshold-warnings](#threshold-warnings)
- [data-binding](#data-binding)
  - [two-way-binding](#two-way-binding)
  - [interval-based-updates](#interval-based-updates)
  - [slider-controlled-progress](#slider-controlled-progress)
- [real-world-examples](#real-world-examples)
  - [file-upload-with-features](#file-upload-with-features)
- [runtime-validation-checklist](#runtime-validation-checklist)
- [combined-mistakes-and-future-references](#combined-mistakes-and-future-references)


## Purpose

Features and interactions enhance progress bar functionality with labels, animations, events, and dynamic updates. Use these to create rich user experiences with progress tracking, status updates, and real-time feedback.

## Annotations and Labels

### Basic Annotations

Display text labels and annotations on progress bars:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Basic Annotation (65%)</h4>
    <div id="basicAnnotation"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const progressBar: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 65,
    height: '40px',
    width: '100%',
    showProgressValue: true,
    labelStyle: { color: '#FFFFFF', fontWeight: 'bold' }
});
progressBar.appendTo('#basicAnnotation');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Basic Annotation (65%)</h4>
    <div id="basicAnnotation"></div>
</div>

<script>
var progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 65,
    height: '40px',
    width: '100%',
    showProgressValue: true,
    labelStyle: { color: '#FFFFFF', fontWeight: 'bold' }
});
progressBar.appendTo('#basicAnnotation');
</script>
```

### Progress Percentage Display

Show progress value as percentage:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Progress Display</h4>
    <div id="percentDisplay" style="height: 30px;"></div>
    <p>Display: <span id="displayValue">50</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const progressBar: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '30px',
    width: '100%',
    trackThickness: 24,
    progressThickness: 24,
    showProgressValue: true,
    labelStyle: { color: '#FFFFFF' }
});
progressBar.appendTo('#percentDisplay');

// Update the display
const span = document.getElementById('displayValue') as HTMLSpanElement;
if (span) span.textContent = '50';
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Progress Display</h4>
    <div id="percentDisplay" style="height: 30px;"></div>
    <p>Display: <span id="displayValue">50</span>%</p>
</div>

<script>
var progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '30px',
    width: '100%',
    trackThickness: 24,
    progressThickness: 24,
    showProgressValue: true,
    labelStyle: { color: '#FFFFFF' }
});
progressBar.appendTo('#percentDisplay');

var span = document.getElementById('displayValue');
if (span) span.textContent = '50';
</script>
```

### Custom Milestone Markers

Display milestone markers at specific progress points:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px; max-width: 650px;">
    <h4>Project Milestones</h4>
    <div id="milestonesBar" style="height: 20px; margin-bottom: 20px;"></div>
    <div id="milestoneLabels" style="display: flex; justify-content: space-between; font-size: 11px; color: #666; text-align: center;">
        <div>Start<br/>0%</div>
        <div>Phase 1<br/>25%</div>
        <div>Phase 2<br/>50%</div>
        <div>Phase 3<br/>75%</div>
        <div>Complete<br/>100%</div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const projectProgress = 60;
const progressBar: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: projectProgress,
    height: '20px',
    width: '100%'
});
progressBar.appendTo('#milestonesBar');
```

#### JavaScript

```html
<div style="margin: 20px; max-width: 650px;">
    <h4>Project Milestones</h4>
    <div id="milestonesBar" style="height: 20px; margin-bottom: 20px;"></div>
    <div id="milestoneLabels" style="display: flex; justify-content: space-between; font-size: 11px; color: #666; text-align: center;">
        <div>Start<br/>0%</div>
        <div>Phase 1<br/>25%</div>
        <div>Phase 2<br/>50%</div>
        <div>Phase 3<br/>75%</div>
        <div>Complete<br/>100%</div>
    </div>
</div>

<script>
var projectProgress = 60;
var progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: projectProgress,
    height: '20px',
    width: '100%'
});
progressBar.appendTo('#milestonesBar');
</script>
```

```

## Animation Configuration

### Enabling Animation

Animate progress bar value changes smoothly:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Animated Progress</h4>
    <div id="animatedBar"></div>
    <button id="animateBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Animate to 100%
    </button>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let animatedBar: ProgressBar;

function initAnimatedBar(): void {
    animatedBar = new ProgressBar({
        type: 'Linear',
        value: 0,
        height: '20px',
        width: '100%',
        animation: { enable: true, duration: 2000, delay: 0 }
    });
    animatedBar.appendTo('#animatedBar');
}

const animateBtn = document.getElementById('animateBtn');
if (animateBtn) {
    animateBtn.addEventListener('click', () => {
        animatedBar.value = 0;
        setTimeout(() => {
            animatedBar.value = 100;
        }, 100);
    });
}

initAnimatedBar();
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Animated Progress</h4>
    <div id="animatedBar"></div>
    <button id="animateBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Animate to 100%
    </button>
</div>

<script>
var animatedBar;

function initAnimatedBar() {
    animatedBar = new ej.progressbar.ProgressBar({
        type: 'Linear',
        value: 0,
        height: '20px',
        width: '100%',
        animation: { enable: true, duration: 2000, delay: 0 }
    });
    animatedBar.appendTo('#animatedBar');
}

var animateBtn = document.getElementById('animateBtn');
if (animateBtn) {
    animateBtn.addEventListener('click', function() {
        animatedBar.value = 0;
        setTimeout(function() {
            animatedBar.value = 100;
        }, 100);
    });
}

initAnimatedBar();
</script>
```

### Animation Timing

Control animation speed with duration and delay:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Fast Animation (500ms)</h4>
    <div id="fastAnim"></div>
    
    <h4 style="margin-top: 20px;">Normal Animation (2000ms)</h4>
    <div id="normalAnim"></div>
    
    <h4 style="margin-top: 20px;">Slow Animation (4000ms)</h4>
    <div id="slowAnim"></div>
    
    <h4 style="margin-top: 20px;">With Delay (1000ms delay)</h4>
    <div id="delayAnim"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Fast animation
new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 500 }
}).appendTo('#fastAnim');

// Normal animation
new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 2000 }
}).appendTo('#normalAnim');

// Slow animation
new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 4000 }
}).appendTo('#slowAnim');

// With delay
new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 2000, delay: 1000 }
}).appendTo('#delayAnim');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Fast Animation (500ms)</h4>
    <div id="fastAnim"></div>
    
    <h4 style="margin-top: 20px;">Normal Animation (2000ms)</h4>
    <div id="normalAnim"></div>
    
    <h4 style="margin-top: 20px;">Slow Animation (4000ms)</h4>
    <div id="slowAnim"></div>
    
    <h4 style="margin-top: 20px;">With Delay (1000ms delay)</h4>
    <div id="delayAnim"></div>
</div>

<script>
// Fast animation
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 500 }
}).appendTo('#fastAnim');

// Normal animation
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 2000 }
}).appendTo('#normalAnim');

// Slow animation
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 4000 }
}).appendTo('#slowAnim');

// With delay
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px',
    width: '100%',
    animation: { enable: true, duration: 2000, delay: 1000 }
}).appendTo('#delayAnim');
</script>
```

### Indeterminate Animation

Show continuous animation for indeterminate progress:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

new ProgressBar({
    type: 'Linear',
    isIndeterminate: true,
    height: '4px',
    width: '100%',
    animation: { enable: true, duration: 3000 }
}).appendTo('#indeterminateAnim');
```

#### JavaScript

```javascript
var progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    isIndeterminate: true,
    height: '4px',
    width: '100%',
    animation: { enable: true, duration: 3000 }
});
progressBar.appendTo('#indeterminateAnim');
```

## Tooltips

### Basic Tooltip

Display tooltips on hover to show progress value:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Hover to see tooltip</h4>
    <div id="tooltipBar" style="height: 200px; width: 200px;"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

new ProgressBar({
    type: 'Circular',
    value: 65,
    height: '200px',
    width: '200px',
    tooltip: { enable: true, format: 'Progress: ${value}%' }
}).appendTo('#tooltipBar');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Hover to see tooltip</h4>
    <div id="tooltipBar" style="height: 200px; width: 200px;"></div>
</div>

<script>
new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 65,
    height: '200px',
    width: '200px',
    tooltip: { enable: true, format: 'Progress: ${value}%' }
}).appendTo('#tooltipBar');
</script>
```

### Custom Tooltip Content

Customize tooltip appearance and styling:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Custom Tooltip</h4>
    <div id="customTooltip"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '25px',
    width: '100%',
    tooltip: {
        enable: true,
        format: '${value}% Complete',
        textStyle: {
            fontWeight: 'bold',
            size: '14px',
            color: '#FFFFFF',
            fontFamily: 'Roboto'
        }
    }
}).appendTo('#customTooltip');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Custom Tooltip</h4>
    <div id="customTooltip"></div>
</div>

<script>
new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '25px',
    width: '100%',
    tooltip: {
        enable: true,
        format: '${value}% Complete',
        textStyle: {
            fontWeight: 'bold',
            size: '14px',
            color: '#FFFFFF',
            fontFamily: 'Roboto'
        }
    }
}).appendTo('#customTooltip');
</script>
```

## Event Handling

### Value Changed Events

Handle value change events to react to progress updates:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <div id="eventProgress"></div>
    <button id="changeBtn" style="margin-top: 10px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Change Value
    </button>
    <p>Current: <span id="currentVal">30</span>%</p>
    <p>Last Changed: <span id="lastChanged">Never</span></p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progressBar: ProgressBar;
let currentValue = 30;

function onValueChange(args: any): void {
    const lastChangedSpan = document.getElementById('lastChanged') as HTMLSpanElement;
    if (lastChangedSpan) {
        lastChangedSpan.textContent = new Date().toLocaleTimeString();
    }
}

function changeValue(): void {
    currentValue += 10;
    if (currentValue > 100) {
        currentValue = 20;
    }
    progressBar.value = currentValue;
    const span = document.getElementById('currentVal') as HTMLSpanElement;
    if (span) span.textContent = currentValue.toString();
}

progressBar = new ProgressBar({
    type: 'Linear',
    value: currentValue,
    height: '20px',
    width: '100%',
    valueChanged: onValueChange
});
progressBar.appendTo('#eventProgress');

const btn = document.getElementById('changeBtn');
if (btn) btn.addEventListener('click', changeValue);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <div id="eventProgress"></div>
    <button id="changeBtn" style="margin-top: 10px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Change Value
    </button>
    <p>Current: <span id="currentVal">30</span>%</p>
    <p>Last Changed: <span id="lastChanged">Never</span></p>
</div>

<script>
var progressBar;
var currentValue = 30;

function onValueChange(args) {
    var span = document.getElementById('lastChanged');
    if (span) {
        span.textContent = new Date().toLocaleTimeString();
    }
}

function changeValue() {
    currentValue += 10;
    if (currentValue > 100) {
        currentValue = 20;
    }
    progressBar.value = currentValue;
    var span = document.getElementById('currentVal');
    if (span) span.textContent = currentValue;
}

progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: currentValue,
    height: '20px',
    width: '100%',
    valueChanged: onValueChange
});
progressBar.appendTo('#eventProgress');

var btn = document.getElementById('changeBtn');
if (btn) btn.addEventListener('click', changeValue);
</script>
```

### Completion Events

Trigger actions when progress completes:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <div id="completeProgress"></div>
    <button id="startBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Start Progress
    </button>
    <div id="completeMsg" style="display: none; margin-top: 20px; padding: 15px; background-color: #e8f5e9; color: #2e7d32; border-radius: 4px;">
        ✓ Progress Complete!
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progressBar: ProgressBar;
let progress = 0;

function onComplete(): void {
    const msg = document.getElementById('completeMsg') as HTMLDivElement;
    if (msg) msg.style.display = 'block';
}

function startProgress(): void {
    const msg = document.getElementById('completeMsg') as HTMLDivElement;
    if (msg) msg.style.display = 'none';
    
    progress = 0;
    progressBar.value = progress;
    
    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            progressBar.value = 100;
            clearInterval(interval);
        } else {
            progressBar.value = progress;
        }
    }, 200);
}

progressBar = new ProgressBar({
    type: 'Linear',
    value: 0,
    height: '20px',
    width: '100%',
    progressCompleted: onComplete
});
progressBar.appendTo('#completeProgress');

const btn = document.getElementById('startBtn');
if (btn) btn.addEventListener('click', startProgress);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <div id="completeProgress"></div>
    <button id="startBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Start Progress
    </button>
    <div id="completeMsg" style="display: none; margin-top: 20px; padding: 15px; background-color: #e8f5e9; color: #2e7d32; border-radius: 4px;">
        ✓ Progress Complete!
    </div>
</div>

<script>
var progressBar;
var progress = 0;

function onComplete() {
    var msg = document.getElementById('completeMsg');
    if (msg) msg.style.display = 'block';
}

function startProgress() {
    var msg = document.getElementById('completeMsg');
    if (msg) msg.style.display = 'none';
    
    progress = 0;
    progressBar.value = progress;
    
    var interval = setInterval(function() {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            progressBar.value = 100;
            clearInterval(interval);
        } else {
            progressBar.value = progress;
        }
    }, 200);
}

progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 0,
    height: '20px',
    width: '100%',
    progressCompleted: onComplete
});
progressBar.appendTo('#completeProgress');

var btn = document.getElementById('startBtn');
if (btn) btn.addEventListener('click', startProgress);
</script>
```

### Text Render Events

Customize displayed text with text render events:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

function onTextRender(args: any): void {
    // Customize text based on value
    if (args.value && args.value >= 75) {
        args.text = '✓ ' + args.value + '%';
    } else if (args.value && args.value >= 50) {
        args.text = '◐ ' + args.value + '%';
    } else {
        args.text = '◑ ' + args.value + '%';
    }
}

new ProgressBar({
    type: 'Linear',
    value: 65,
    height: '30px',
    width: '100%',
    trackThickness: 24,
    progressThickness: 24,
    showProgressValue: true,
    labelStyle: { color: '#FFFFFF', fontWeight: 'bold' },
    textRender: onTextRender
}).appendTo('#customTextProgress');
```

#### JavaScript

```javascript
function onTextRender(args) {
    if (args.value >= 75) {
        args.text = '✓ ' + args.value + '%';
    } else if (args.value >= 50) {
        args.text = '◐ ' + args.value + '%';
    } else {
        args.text = '◑ ' + args.value + '%';
    }
}

new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 65,
    height: '30px',
    width: '100%',
    trackThickness: 24,
    progressThickness: 24,
    showProgressValue: true,
    labelStyle: { color: '#FFFFFF', fontWeight: 'bold' },
    textRender: onTextRender
}).appendTo('#customTextProgress');
```

### Multiple Event Handling

Handle multiple events simultaneously:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <div id="multiEventBar"></div>
    <div id="eventLog" style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;">
        <p id="logText" style="margin: 0; white-space: pre-wrap;">Waiting for events...</p>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let eventLog = 'Waiting for events...\n';

function onValueChanged(args: any): void {
    eventLog += `[${new Date().toLocaleTimeString()}] Value changed to ${args.value}%\n`;
    const logText = document.getElementById('logText') as HTMLParagraphElement;
    if (logText) logText.textContent = eventLog;
}

function onComplete(args: any): void {
    eventLog += `[${new Date().toLocaleTimeString()}] Completed!\n`;
    const logText = document.getElementById('logText') as HTMLParagraphElement;
    if (logText) logText.textContent = eventLog;
}

const progressBar = new ProgressBar({
    type: 'Linear',
    value: 0,
    height: '20px',
    width: '100%',
    valueChanged: onValueChanged,
    progressCompleted: onComplete
});
progressBar.appendTo('#multiEventBar');

// Simulate progress
let progress = 0;
const interval = setInterval(() => {
    progress += 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
    }
    progressBar.value = progress;
}, 300);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <div id="multiEventBar"></div>
    <div id="eventLog" style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;">
        <p id="logText" style="margin: 0; white-space: pre-wrap;">Waiting for events...</p>
    </div>
</div>

<script>
var eventLog = 'Waiting for events...\n';

function onValueChanged(args) {
    eventLog += '[' + new Date().toLocaleTimeString() + '] Value changed to ' + args.value + '%\n';
    var logText = document.getElementById('logText');
    if (logText) logText.textContent = eventLog;
}

function onComplete(args) {
    eventLog += '[' + new Date().toLocaleTimeString() + '] Completed!\n';
    var logText = document.getElementById('logText');
    if (logText) logText.textContent = eventLog;
}

var progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 0,
    height: '20px',
    width: '100%',
    valueChanged: onValueChanged,
    progressCompleted: onComplete
});
progressBar.appendTo('#multiEventBar');

var progress = 0;
var interval = setInterval(function() {
    progress += 5;
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
    }
    progressBar.value = progress;
}, 300);
</script>
```

## Range Indicators

Visualize different progress ranges with color-coded indicators:

### Color-Coded Progress Ranges

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <div id="lowRange">
        <label>Low Priority (0-33%)</label>
        <div id="lowRangeBar"></div>
    </div>
    <div id="mediumRange" style="margin-top: 20px;">
        <label>Medium Priority (33-66%)</label>
        <div id="mediumRangeBar"></div>
    </div>
    <div id="highRange" style="margin-top: 20px;">
        <label>High Priority (66-100%)</label>
        <div id="highRangeBar"></div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const progressData = [
    { label: 'Low Priority (0-33%)', value: 15, color: '#FF6B6B', containerId: 'lowRangeBar' },
    { label: 'Medium Priority (33-66%)', value: 50, color: '#FFA500', containerId: 'mediumRangeBar' },
    { label: 'High Priority (66-100%)', value: 85, color: '#4CAF50', containerId: 'highRangeBar' }
];

progressData.forEach(item => {
    new ProgressBar({
        type: 'Linear',
        value: item.value,
        height: '25px',
        width: '100%',
        progressColor: item.color,
        maximum: 100
    }).appendTo('#' + item.containerId);
});
```

#### JavaScript

```html
<div style="margin: 20px;">
    <div id="lowRange">
        <label>Low Priority (0-33%)</label>
        <div id="lowRangeBar"></div>
    </div>
    <div id="mediumRange" style="margin-top: 20px;">
        <label>Medium Priority (33-66%)</label>
        <div id="mediumRangeBar"></div>
    </div>
    <div id="highRange" style="margin-top: 20px;">
        <label>High Priority (66-100%)</label>
        <div id="highRangeBar"></div>
    </div>
</div>

<script>
var progressData = [
    { label: 'Low Priority (0-33%)', value: 15, color: '#FF6B6B', containerId: 'lowRangeBar' },
    { label: 'Medium Priority (33-66%)', value: 50, color: '#FFA500', containerId: 'mediumRangeBar' },
    { label: 'High Priority (66-100%)', value: 85, color: '#4CAF50', containerId: 'highRangeBar' }
];

progressData.forEach(function(item) {
    new ej.progressbar.ProgressBar({
        type: 'Linear',
        value: item.value,
        height: '25px',
        width: '100%',
        progressColor: item.color,
        maximum: 100
    }).appendTo('#' + item.containerId);
});
</script>
```

### Storage Threshold Visualization

Dynamically change colors based on value thresholds:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <label>Storage Usage</label>
    <div id="storageProgress"></div>
    <div style="margin-top: 10px; display: flex; justify-content: space-between; font-size: 12px; color: #666;">
        <span>0%</span>
        <span>50%</span>
        <span style="color: #F44336;">90% (Critical)</span>
        <span>100%</span>
    </div>
    <p style="margin-top: 15px;">
        Usage: <span id="storageUsage">85</span>GB / 100GB
        <span id="criticalWarning" style="color: #F44336; display: none;">⚠️ Storage critical</span>
    </p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let storagePercent = 85;
let progressBar: ProgressBar;

function getStorageColor(): string {
    if (storagePercent >= 90) return '#F44336'; // Red
    if (storagePercent >= 70) return '#FF9800'; // Orange
    return '#4CAF50'; // Green
}

function updateStorageDisplay(): void {
    const usageSpan = document.getElementById('storageUsage') as HTMLSpanElement;
    const warning = document.getElementById('criticalWarning') as HTMLDivElement;
    
    if (usageSpan) usageSpan.textContent = Math.round(storagePercent).toString();
    if (warning) warning.style.display = (storagePercent >= 90) ? 'inline' : 'none';
    
    progressBar.progressColor = getStorageColor();
}

progressBar = new ProgressBar({
    type: 'Linear',
    value: storagePercent,
    height: '25px',
    width: '100%',
    progressColor: getStorageColor(),
    trackColor: '#e0e0e0'
});
progressBar.appendTo('#storageProgress');

updateStorageDisplay();

// Simulate storage changes
setInterval(() => {
    storagePercent += Math.random() * 3;
    if (storagePercent > 100) storagePercent = 100;
    progressBar.value = storagePercent;
    updateStorageDisplay();
}, 2000);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <label>Storage Usage</label>
    <div id="storageProgress"></div>
    <div style="margin-top: 10px; display: flex; justify-content: space-between; font-size: 12px; color: #666;">
        <span>0%</span>
        <span>50%</span>
        <span style="color: #F44336;">90% (Critical)</span>
        <span>100%</span>
    </div>
    <p style="margin-top: 15px;">
        Usage: <span id="storageUsage">85</span>GB / 100GB
        <span id="criticalWarning" style="color: #F44336; display: none;">⚠️ Storage critical</span>
    </p>
</div>

<script>
var storagePercent = 85;
var progressBar;

function getStorageColor() {
    if (storagePercent >= 90) return '#F44336';
    if (storagePercent >= 70) return '#FF9800';
    return '#4CAF50';
}

function updateStorageDisplay() {
    var usageSpan = document.getElementById('storageUsage');
    var warning = document.getElementById('criticalWarning');
    
    if (usageSpan) usageSpan.textContent = Math.round(storagePercent);
    if (warning) warning.style.display = (storagePercent >= 90) ? 'inline' : 'none';
    
    progressBar.progressColor = getStorageColor();
}

progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: storagePercent,
    height: '25px',
    width: '100%',
    progressColor: getStorageColor(),
    trackColor: '#e0e0e0'
});
progressBar.appendTo('#storageProgress');

updateStorageDisplay();

setInterval(function() {
    storagePercent += Math.random() * 3;
    if (storagePercent > 100) storagePercent = 100;
    progressBar.value = storagePercent;
    updateStorageDisplay();
}, 2000);
</script>
```

## Reactive Data Binding

Control progress bar with user input and dynamic updates:

### Manual Input Control

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Real-time Progress Control</h4>
    <div style="margin-bottom: 20px;">
        <label>Progress Value:</label>
        <input 
            id="progressInput" 
            type="number" 
            min="0" 
            max="100" 
            value="50"
            style="padding: 5px; margin-left: 10px;">
    </div>
    <div id="progressBar"></div>
    <p style="margin-top: 10px;">Value: <span id="displayValue">50</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progressBar: ProgressBar;
let currentValue = 50;

function onInputChange(): void {
    const input = document.getElementById('progressInput') as HTMLInputElement;
    if (input) {
        currentValue = parseInt(input.value, 10);
        progressBar.value = currentValue;
        const display = document.getElementById('displayValue') as HTMLSpanElement;
        if (display) display.textContent = currentValue.toString();
    }
}

progressBar = new ProgressBar({
    type: 'Linear',
    value: currentValue,
    height: '25px',
    width: '100%'
});
progressBar.appendTo('#progressBar');

const input = document.getElementById('progressInput');
if (input) input.addEventListener('change', onInputChange);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Real-time Progress Control</h4>
    <div style="margin-bottom: 20px;">
        <label>Progress Value:</label>
        <input 
            id="progressInput" 
            type="number" 
            min="0" 
            max="100" 
            value="50"
            style="padding: 5px; margin-left: 10px;">
    </div>
    <div id="progressBar"></div>
    <p style="margin-top: 10px;">Value: <span id="displayValue">50</span>%</p>
</div>

<script>
var progressBar;
var currentValue = 50;

function onInputChange() {
    var input = document.getElementById('progressInput');
    if (input) {
        currentValue = parseInt(input.value, 10);
        progressBar.value = currentValue;
        var display = document.getElementById('displayValue');
        if (display) display.textContent = currentValue;
    }
}

progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: currentValue,
    height: '25px',
    width: '100%'
});
progressBar.appendTo('#progressBar');

var input = document.getElementById('progressInput');
if (input) input.addEventListener('change', onInputChange);
</script>
```

### Slider-Based Progress Control

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Slider-Controlled Progress</h4>
    <div style="margin-bottom: 20px;">
        <label>Set Progress:</label>
        <input 
            id="sliderControl" 
            type="range" 
            min="0" 
            max="100" 
            value="50"
            style="margin-left: 10px; width: 300px; cursor: pointer;">
    </div>
    <div id="sliderProgressBar"></div>
    <p style="margin-top: 10px;">Progress: <span id="sliderValue">50</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let sliderProgressBar: ProgressBar;
let sliderValue = 50;

function onSliderChange(): void {
    const slider = document.getElementById('sliderControl') as HTMLInputElement;
    if (slider) {
        sliderValue = parseInt(slider.value, 10);
        sliderProgressBar.value = sliderValue;
        const display = document.getElementById('sliderValue') as HTMLSpanElement;
        if (display) display.textContent = sliderValue.toString();
    }
}

sliderProgressBar = new ProgressBar({
    type: 'Linear',
    value: sliderValue,
    height: '25px',
    width: '100%'
});
sliderProgressBar.appendTo('#sliderProgressBar');

const slider = document.getElementById('sliderControl');
if (slider) slider.addEventListener('input', onSliderChange);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Slider-Controlled Progress</h4>
    <div style="margin-bottom: 20px;">
        <label>Set Progress:</label>
        <input 
            id="sliderControl" 
            type="range" 
            min="0" 
            max="100" 
            value="50"
            style="margin-left: 10px; width: 300px; cursor: pointer;">
    </div>
    <div id="sliderProgressBar"></div>
    <p style="margin-top: 10px;">Progress: <span id="sliderValue">50</span>%</p>
</div>

<script>
var sliderProgressBar;
var sliderValue = 50;

function onSliderChange() {
    var slider = document.getElementById('sliderControl');
    if (slider) {
        sliderValue = parseInt(slider.value, 10);
        sliderProgressBar.value = sliderValue;
        var display = document.getElementById('sliderValue');
        if (display) display.textContent = sliderValue;
    }
}

sliderProgressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: sliderValue,
    height: '25px',
    width: '100%'
});
sliderProgressBar.appendTo('#sliderProgressBar');

var slider = document.getElementById('sliderControl');
if (slider) slider.addEventListener('input', onSliderChange);
</script>
```

### Interval-Based Automatic Updates

Automatically update progress using timers:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Interval-Based Progress</h4>
    <div id="intervalProgressBar"></div>
    <button id="startIntervalBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Start Interval Progress
    </button>
    <p style="margin-top: 10px;">Progress: <span id="intervalValue">0</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let intervalProgressBar: ProgressBar;
let intervalValue = 0;
let currentInterval: NodeJS.Timeout | null = null;

function startIntervalProgress(): void {
    if (currentInterval) clearInterval(currentInterval);
    
    intervalValue = 0;
    intervalProgressBar.value = 0;
    
    currentInterval = setInterval(() => {
        intervalValue += Math.random() * 15;
        if (intervalValue >= 100) {
            intervalValue = 100;
            if (currentInterval) clearInterval(currentInterval);
        }
        intervalProgressBar.value = intervalValue;
        const display = document.getElementById('intervalValue') as HTMLSpanElement;
        if (display) display.textContent = Math.round(intervalValue).toString();
    }, 500);
}

intervalProgressBar = new ProgressBar({
    type: 'Linear',
    value: 0,
    height: '25px',
    width: '100%'
});
intervalProgressBar.appendTo('#intervalProgressBar');

const btn = document.getElementById('startIntervalBtn');
if (btn) btn.addEventListener('click', startIntervalProgress);
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Interval-Based Progress</h4>
    <div id="intervalProgressBar"></div>
    <button id="startIntervalBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Start Interval Progress
    </button>
    <p style="margin-top: 10px;">Progress: <span id="intervalValue">0</span>%</p>
</div>

<script>
var intervalProgressBar;
var intervalValue = 0;
var currentInterval = null;

function startIntervalProgress() {
    if (currentInterval) clearInterval(currentInterval);
    
    intervalValue = 0;
    intervalProgressBar.value = 0;
    
    currentInterval = setInterval(function() {
        intervalValue += Math.random() * 15;
        if (intervalValue >= 100) {
            intervalValue = 100;
            if (currentInterval) clearInterval(currentInterval);
        }
        intervalProgressBar.value = intervalValue;
        var display = document.getElementById('intervalValue');
        if (display) display.textContent = Math.round(intervalValue);
    }, 500);
}

intervalProgressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 0,
    height: '25px',
    width: '100%'
});
intervalProgressBar.appendTo('#intervalProgressBar');

var btn = document.getElementById('startIntervalBtn');
if (btn) btn.addEventListener('click', startIntervalProgress);
</script>
```

## Runtime Validation Checklist

Test and validate features implementation:

- [ ] Animations trigger correctly with proper duration and delay
- [ ] Tooltips display on hover and format correctly
- [ ] All event handlers (valueChanged, progressCompleted, textRender) fire in expected sequence
- [ ] Text render customizations display correct labels and formatting
- [ ] Progress value changes propagate to UI immediately
- [ ] Multiple event listeners attach without conflicts
- [ ] Range indicators update colors dynamically based on thresholds
- [ ] User input (sliders, inputs) updates progress bidirectionally
- [ ] Interval timers function correctly and clean up properly
- [ ] Combined example integrates all features without side effects

## Combined Mistakes and Future References

### Common Mistakes and Corrections

**Mistake 1: Event Handler Memory Leaks**
- ❌ **Problem:** Not removing event listeners causes memory leaks
  ```typescript
  // BAD - listener never removed
  document.getElementById('btn').addEventListener('click', startProgress);
  ```
- ✅ **Solution:** Store reference and remove listener when done
  ```typescript
  // GOOD - listener can be managed
  const handleClick = () => startProgress();
  document.getElementById('btn').addEventListener('click', handleClick);
  // Later: element.removeEventListener('click', handleClick);
  ```

**Mistake 2: Interval/Timeout Cleanup**
- ❌ **Problem:** Intervals continue running after component cleanup
  ```typescript
  // BAD - interval keeps running forever
  let interval = setInterval(() => { progress += 5; }, 100);
  ```
- ✅ **Solution:** Store and clear intervals properly
  ```typescript
  // GOOD - interval can be stopped
  let interval = setInterval(() => { progress += 5; }, 100);
  if (progress >= 100) clearInterval(interval);
  ```

**Mistake 3: Missing Animation Configuration**
- ❌ **Problem:** Animation events don't fire without proper configuration
  ```typescript
  // BAD - animation not configured
  new ProgressBar({ value: 50, type: 'Linear' }).appendTo('#id');
  ```
- ✅ **Solution:** Include animation configuration when needed
  ```typescript
  // GOOD - animation configured
  new ProgressBar({ 
      value: 50, 
      type: 'Linear',
      animation: { enable: true, duration: 2000 }
  }).appendTo('#id');
  ```

**Mistake 4: Tooltip Format String Syntax**
- ❌ **Problem:** Tooltip templates don't interpolate values
  ```typescript
  // BAD - text not formatted
  tooltip: { enable: true, template: 'Progress: {value}%' }
  ```
- ✅ **Solution:** Use proper format patterns
  ```typescript
  // GOOD - proper tooltip configuration
  tooltip: { enable: true, format: '{value}%' }
  ```

**Mistake 5: Uncontrolled Observable Subscriptions**
- ❌ **Problem:** Observable subscriptions leak memory
  ```typescript
  // BAD - never unsubscribes
  this.progress$ = interval(100).pipe(map(x => x * 5));
  this.progress$.subscribe(val => this.progress = val);
  ```
- ✅ **Solution:** Use takeWhile or unsubscribe properly
  ```typescript
  // GOOD - subscription cleaned up
  this.progress$ = interval(100).pipe(
      map(x => x * 5),
      takeWhile(x => x <= 100)
  );
  ```

### See Also

- [Getting Started Guide](getting-started.md) - Basic setup and installation
- [Progress Modes Reference](progress-modes.md) - Determinate, Indeterminate, Buffer modes
- [Customization Guide](customization.md) - Styling and appearance options
- [API Reference](api-reference.md) - Complete method and property documentation
- [Accessibility Guide](accessibility.md) - WCAG compliance and keyboard navigation
    <h4>Interval-Based Progress</h4>
    <div id="intervalProgressBar"></div>
    <button id="startIntervalBtn" style="margin-top: 20px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Start Interval Progress
    </button>
    <p style="margin-top: 10px;">Progress: <span id="intervalValue">0</span>%</p>
</div>

<script>
var intervalProgressBar;
var intervalValue = 0;
var currentInterval = null;

function startIntervalProgress() {
    if (currentInterval) clearInterval(currentInterval);
    
    intervalValue = 0;
    intervalProgressBar.value = 0;
    
    currentInterval = setInterval(function() {
        intervalValue += Math.random() * 15;
        if (intervalValue >= 100) {
            intervalValue = 100;
            if (currentInterval) clearInterval(currentInterval);
        }
        intervalProgressBar.value = intervalValue;
        var display = document.getElementById('intervalValue');
        if (display) display.textContent = Math.round(intervalValue);
    }, 500);
}

intervalProgressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 0,
    height: '25px',
    width: '100%'
});
intervalProgressBar.appendTo('#intervalProgressBar');

var btn = document.getElementById('startIntervalBtn');
if (btn) btn.addEventListener('click', startIntervalProgress);
</script>
```

## Real-World Example: Advanced File Upload

Combine all features into a comprehensive file upload experience:

### TypeScript

**HTML:**

```html
<div style="padding: 30px; max-width: 500px; border: 1px solid #ddd; border-radius: 8px;">
    <h3>Advanced File Upload</h3>
    <div id="advancedProgressBar"></div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <span><span id="uploadedSize">0</span> MB / 500 MB</span>
        <span id="uploadStatus" style="color: #666;">Ready</span>
    </div>
    <button 
        id="uploadBtn"
        style="margin-top: 20px; padding: 10px 20px; cursor: pointer; background-color: #0078d4; color: white; border: none; border-radius: 4px;">
        Start Upload
    </button>
    <div id="completeMessage" style="display: none; margin-top: 20px; padding: 15px; background-color: #e8f5e9; color: #2e7d32; border-radius: 4px;">
        ✓ Upload complete!
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let uploadProgressBar: ProgressBar;
let uploadProgress = 0;
let uploadedSize = 0;
const totalSize = 500;
let isUploading = false;
let uploadInterval: NodeJS.Timeout | null = null;

function getStatusColor(): string {
    const status = document.getElementById('uploadStatus') as HTMLSpanElement;
    const complete = document.getElementById('completeMessage') as HTMLDivElement;
    if (complete && complete.style.display !== 'none') return '#4CAF50';
    if (isUploading) return '#0078d4';
    return '#666';
}

function onProgressChange(args: any): void {
    const value = args.value;
    if (value < 30) {
        updateStatus('Initializing...');
    } else if (value < 70) {
        updateStatus('Uploading...');
    } else {
        updateStatus('Finalizing...');
    }
}

function updateStatus(status: string): void {
    const statusSpan = document.getElementById('uploadStatus') as HTMLSpanElement;
    if (statusSpan) {
        statusSpan.textContent = status;
        statusSpan.style.color = getStatusColor();
    }
}

function onUploadComplete(): void {
    const completeMsg = document.getElementById('completeMessage') as HTMLDivElement;
    if (completeMsg) completeMsg.style.display = 'block';
    
    const btn = document.getElementById('uploadBtn') as HTMLButtonElement;
    if (btn) btn.disabled = false;
    
    updateStatus('Complete!');
    isUploading = false;
}

function startUpload(): void {
    isUploading = true;
    uploadProgress = 0;
    uploadedSize = 0;
    
    const completeMsg = document.getElementById('completeMessage') as HTMLDivElement;
    if (completeMsg) completeMsg.style.display = 'none';
    
    const btn = document.getElementById('uploadBtn') as HTMLButtonElement;
    if (btn) btn.disabled = true;
    
    uploadProgressBar.value = 0;
    updateStatus('Initializing...');
    
    if (uploadInterval) clearInterval(uploadInterval);
    
    uploadInterval = setInterval(() => {
        uploadProgress += Math.random() * 20;
        uploadedSize = Math.floor((uploadProgress / 100) * totalSize);
        
        const sizeSpan = document.getElementById('uploadedSize') as HTMLSpanElement;
        if (sizeSpan) sizeSpan.textContent = uploadedSize.toString();
        
        if (uploadProgress >= 100) {
            uploadProgress = 100;
            uploadedSize = totalSize;
            uploadProgressBar.value = 100;
            if (uploadInterval) clearInterval(uploadInterval);
            onUploadComplete();
        } else {
            uploadProgressBar.value = uploadProgress;
        }
    }, 300);
}

uploadProgressBar = new ProgressBar({
    type: 'Linear',
    value: 0,
    height: '30px',
    width: '100%',
    animation: { enable: true, duration: 500 },
    valueChanged: onProgressChange
});
uploadProgressBar.appendTo('#advancedProgressBar');

const startBtn = document.getElementById('uploadBtn');
if (startBtn) startBtn.addEventListener('click', startUpload);
```

### JavaScript

```html
<div style="padding: 30px; max-width: 500px; border: 1px solid #ddd; border-radius: 8px;">
    <h3>Advanced File Upload</h3>
    <div id="advancedProgressBar"></div>
    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <span><span id="uploadedSize">0</span> MB / 500 MB</span>
        <span id="uploadStatus" style="color: #666;">Ready</span>
    </div>
    <button 
        id="uploadBtn"
        style="margin-top: 20px; padding: 10px 20px; cursor: pointer; background-color: #0078d4; color: white; border: none; border-radius: 4px;">
        Start Upload
    </button>
    <div id="completeMessage" style="display: none; margin-top: 20px; padding: 15px; background-color: #e8f5e9; color: #2e7d32; border-radius: 4px;">
        ✓ Upload complete!
    </div>
</div>

<script>
var uploadProgressBar;
var uploadProgress = 0;
var uploadedSize = 0;
var totalSize = 500;
var isUploading = false;
var uploadInterval = null;

function getStatusColor() {
    var complete = document.getElementById('completeMessage');
    if (complete && complete.style.display !== 'none') return '#4CAF50';
    if (isUploading) return '#0078d4';
    return '#666';
}

function onProgressChange(args) {
    var value = args.value;
    if (value < 30) {
        updateStatus('Initializing...');
    } else if (value < 70) {
        updateStatus('Uploading...');
    } else {
        updateStatus('Finalizing...');
    }
}

function updateStatus(status) {
    var statusSpan = document.getElementById('uploadStatus');
    if (statusSpan) {
        statusSpan.textContent = status;
        statusSpan.style.color = getStatusColor();
    }
}

function onUploadComplete() {
    var completeMsg = document.getElementById('completeMessage');
    if (completeMsg) completeMsg.style.display = 'block';
    
    var btn = document.getElementById('uploadBtn');
    if (btn) btn.disabled = false;
    
    updateStatus('Complete!');
    isUploading = false;
}

function startUpload() {
    isUploading = true;
    uploadProgress = 0;
    uploadedSize = 0;
    
    var completeMsg = document.getElementById('completeMessage');
    if (completeMsg) completeMsg.style.display = 'none';
    
    var btn = document.getElementById('uploadBtn');
    if (btn) btn.disabled = true;
    
    uploadProgressBar.value = 0;
    updateStatus('Initializing...');
    
    if (uploadInterval) clearInterval(uploadInterval);
    
    uploadInterval = setInterval(function() {
        uploadProgress += Math.random() * 20;
        uploadedSize = Math.floor((uploadProgress / 100) * totalSize);
        
        var sizeSpan = document.getElementById('uploadedSize');
        if (sizeSpan) sizeSpan.textContent = uploadedSize;
        
        if (uploadProgress >= 100) {
            uploadProgress = 100;
            uploadedSize = totalSize;
            uploadProgressBar.value = 100;
            if (uploadInterval) clearInterval(uploadInterval);
            onUploadComplete();
        } else {
            uploadProgressBar.value = uploadProgress;
        }
    }, 300);
}

uploadProgressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 0,
    height: '30px',
    width: '100%',
    animation: { enable: true, duration: 500 },
    valueChanged: onProgressChange
});
uploadProgressBar.appendTo('#advancedProgressBar');

var startBtn = document.getElementById('uploadBtn');
if (startBtn) startBtn.addEventListener('click', startUpload);
</script>
```


