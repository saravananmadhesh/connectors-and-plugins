# Progress Modes (TypeScript & JavaScript)

- [purpose](#purpose)
- [determinate-mode](#determinate-mode)
  - [basic-determinate-progress](#basic-determinate-progress)
  - [user-controlled-progress](#user-controlled-progress)
  - [custom-value-ranges](#custom-value-ranges)
- [indeterminate-mode](#indeterminate-mode)
  - [basic-indeterminate-progress](#basic-indeterminate-progress)
  - [indeterminate-with-custom-height](#indeterminate-with-custom-height)
  - [circular-indeterminate](#circular-indeterminate)
- [buffer-mode](#buffer-mode)
  - [basic-buffer-progress](#basic-buffer-progress)
  - [video-buffering-simulation](#video-buffering-simulation)
  - [download-with-verification](#download-with-verification)
- [transitioning-between-modes](#transitioning-between-modes)
- [mode-selection-guidelines](#mode-selection-guidelines)
- [real-world-scenarios](#real-world-scenarios)
  - [file-upload-determinate](#file-upload-determinate)
  - [data-fetching-indeterminate](#data-fetching-indeterminate)
  - [multi-step-process-buffer](#multi-step-process-buffer)
- [runtime-validation-checklist](#runtime-validation-checklist)
- [combined-mistakes-and-future-references](#combined-mistakes-and-future-references)

## Purpose

Progress modes determine how the progress bar behaves: determinate for known duration, indeterminate for unknown duration, and buffer for multi-stage loading (like video playback).

**Mode Selection:**

```text
Determinate  -> When you know task progress (e.g., 45 of 100 files uploaded)
Indeterminate -> When duration is unknown (e.g., server request processing)
Buffer       -> When showing two progress levels (e.g., playing vs. buffered)
```

## Determinate Mode

### Purpose

Determinate mode displays explicit progress from 0 to 100% when you know the task duration or completion percentage. Use for file uploads, file downloads, or any process where progress can be measured.

### Basic Determinate Progress

Display progress with known completion percentage:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <div id="determinate"></div>
    <p>Progress: <span id="progressValue">45</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const determinate: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 45,
    height: '20px',
    width: '100%'
});

determinate.appendTo('#determinate');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <div id="determinate"></div>
    <p>Progress: <span id="progressValue">45</span>%</p>
</div>

<script>
var determinate = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 45,
    height: '20px',
    width: '100%'
});

determinate.appendTo('#determinate');
</script>
```

### User-Controlled Progress

Allow users to adjust progress with a slider:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <label for="progressSlider">Adjust Progress: </label>
    <input type="range" id="progressSlider" min="0" max="100" value="50" style="width: 100%;">
    <div id="userProgress" style="margin-top: 15px;"></div>
    <p>Progress: <span id="sliderValue">50</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let userProgress: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '25px',
    width: '100%'
});

userProgress.appendTo('#userProgress');

const slider = document.getElementById('progressSlider') as HTMLInputElement;
const valueSpan = document.getElementById('sliderValue') as HTMLSpanElement;

slider.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = parseInt(target.value);
    userProgress.value = newValue;
    valueSpan.textContent = newValue.toString();
});
```

#### JavaScript

```html
<div style="margin: 20px;">
    <label for="progressSlider">Adjust Progress: </label>
    <input type="range" id="progressSlider" min="0" max="100" value="50" style="width: 100%;">
    <div id="userProgress" style="margin-top: 15px;"></div>
    <p>Progress: <span id="sliderValue">50</span>%</p>
</div>

<script>
var userProgress = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '25px',
    width: '100%'
});

userProgress.appendTo('#userProgress');

var slider = document.getElementById('progressSlider');
var valueSpan = document.getElementById('sliderValue');

slider.addEventListener('input', function(event) {
    var newValue = parseInt(event.target.value);
    userProgress.value = newValue;
    valueSpan.textContent = newValue;
});
</script>
```

### Custom Value Ranges

Create progress bars with custom minimum and maximum values:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h4>Progress from 10 to 90</h4>
    <div id="customRange"></div>
    <p>Value: 50 (range: 10–90)</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const customRange: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    minimum: 10,
    maximum: 90,
    height: '20px',
    width: '100%'
});

customRange.appendTo('#customRange');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h4>Progress from 10 to 90</h4>
    <div id="customRange"></div>
    <p>Value: 50 (range: 10–90)</p>
</div>

<script>
var customRange = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    minimum: 10,
    maximum: 90,
    height: '20px',
    width: '100%'
});

customRange.appendTo('#customRange');
</script>
```

## Indeterminate Mode

### Purpose

Indeterminate mode shows continuous animation without specific progress value, used when task duration is unknown. Ideal for API requests, data processing, or background operations.

### Basic Indeterminate Progress

Display animated indeterminate progress without knowing completion time:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <p>Loading...</p>
    <div id="indeterminate"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const indeterminate: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 20,
    isIndeterminate: true,
    height: '20px',
    width: '100%'
});

indeterminate.appendTo('#indeterminate');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <p>Loading...</p>
    <div id="indeterminate"></div>
</div>

<script>
var indeterminate = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 20,
    isIndeterminate: true,
    height: '20px',
    width: '100%'
});

indeterminate.appendTo('#indeterminate');
</script>
```

### Indeterminate with Custom Height

Create thin or thick indeterminate progress bars:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <p>Thin Loading Bar:</p>
    <div id="thinIndeterminate"></div>
    
    <p style="margin-top: 30px;">Thick Loading Bar:</p>
    <div id="thickIndeterminate"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const thinIndeterminate: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 20,
    isIndeterminate: true,
    height: '4px',
    width: '100%'
});

thinIndeterminate.appendTo('#thinIndeterminate');

const thickIndeterminate: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 20,
    isIndeterminate: true,
    height: '30px',
    width: '100%'
});

thickIndeterminate.appendTo('#thickIndeterminate');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <p>Thin Loading Bar:</p>
    <div id="thinIndeterminate"></div>
    
    <p style="margin-top: 30px;">Thick Loading Bar:</p>
    <div id="thickIndeterminate"></div>
</div>

<script>
var thinIndeterminate = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 20,
    isIndeterminate: true,
    height: '4px',
    width: '100%'
});

thinIndeterminate.appendTo('#thinIndeterminate');

var thickIndeterminate = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 20,
    isIndeterminate: true,
    height: '30px',
    width: '100%'
});

thickIndeterminate.appendTo('#thickIndeterminate');
</script>
```

### Circular Indeterminate

Display circular indeterminate progress:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <p>Processing...</p>
    <div id="circularIndeterminate"></div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const circularIndeterminate: ProgressBar = new ProgressBar({
    type: 'Circular',
    value: 30,
    isIndeterminate: true,
    height: '200px',
    width: '200px'
});

circularIndeterminate.appendTo('#circularIndeterminate');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <p>Processing...</p>
    <div id="circularIndeterminate"></div>
</div>

<script>
var circularIndeterminate = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 30,
    isIndeterminate: true,
    height: '200px',
    width: '200px'
});

circularIndeterminate.appendTo('#circularIndeterminate');
</script>
```

## Buffer Mode

### Purpose

Buffer mode displays both primary progress and secondary progress simultaneously. Used for video playback (playing position vs. buffered content), downloads with verification, or multi-stage processes.

### Basic Buffer Progress

Display primary and secondary progress:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <div id="basicBuffer"></div>
    <p>Playing: <span id="playingPercent">35</span>% | Buffered: <span id="bufferedPercent">65</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const basicBuffer: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 35,
    secondaryProgress: 65,
    height: '20px',
    width: '100%',
    progressColor: '#4472C4',
    secondaryProgressColor: '#D0D0D0'
});

basicBuffer.appendTo('#basicBuffer');
```

#### JavaScript

```html
<div style="margin: 20px;">
    <div id="basicBuffer"></div>
    <p>Playing: <span id="playingPercent">35</span>% | Buffered: <span id="bufferedPercent">65</span>%</p>
</div>

<script>
var basicBuffer = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 35,
    secondaryProgress: 65,
    height: '20px',
    width: '100%',
    progressColor: '#4472C4',
    secondaryProgressColor: '#D0D0D0'
});

basicBuffer.appendTo('#basicBuffer');
</script>
```

### Video Buffering Simulation

Simulate video playback with progressive buffering:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h3>Video Playback</h3>
    <div id="videobuffer"></div>
    <div style="font-size: 12px; margin-top: 5px;">
        Playing: <span id="playTime">0:00</span> | 
        Buffered: <span id="bufferTime">0:00</span> | 
        Total: 5:00
    </div>
    <button id="playBtn" style="margin-top: 10px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Play
    </button>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let videoProgress: ProgressBar;
let playbackProgress = 0;
let bufferProgress = 0;
let isPlaying = false;
let playbackInterval: any;
let bufferInterval: any;

function formatTime(percent: number): string {
    const seconds = Math.floor((percent / 100) * 300);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function initVideoBuffer(): void {
    videoProgress = new ProgressBar({
        type: 'Linear',
        value: playbackProgress,
        secondaryProgress: bufferProgress,
        height: '8px',
        width: '100%'
    });

    videoProgress.appendTo('#videobuffer');
}

function play(): void {
    isPlaying = !isPlaying;
    const button = document.getElementById('playBtn') as HTMLButtonElement;
    
    if (isPlaying) {
        button.textContent = 'Pause';
        
        playbackInterval = setInterval(() => {
            playbackProgress += 0.5;
            if (playbackProgress >= 100) {
                clearInterval(playbackInterval);
                isPlaying = false;
                button.textContent = 'Play';
            }
            videoProgress.value = playbackProgress;
            (document.getElementById('playTime') as HTMLSpanElement).textContent = formatTime(playbackProgress);
        }, 100);

        bufferInterval = setInterval(() => {
            if (bufferProgress < 100) {
                bufferProgress += Math.random() * 2;
            }
            videoProgress.secondaryProgress = bufferProgress;
            (document.getElementById('bufferTime') as HTMLSpanElement).textContent = formatTime(bufferProgress);
        }, 200);
    } else {
        button.textContent = 'Play';
        clearInterval(playbackInterval);
        clearInterval(bufferInterval);
    }
}

document.getElementById('playBtn')!.addEventListener('click', play);
initVideoBuffer();
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h3>Video Playback</h3>
    <div id="videobuffer"></div>
    <div style="font-size: 12px; margin-top: 5px;">
        Playing: <span id="playTime">0:00</span> | 
        Buffered: <span id="bufferTime">0:00</span> | 
        Total: 5:00
    </div>
    <button id="playBtn" style="margin-top: 10px; padding: 8px 16px; background-color: #0078d4; color: white; border: none; cursor: pointer; border-radius: 4px;">
        Play
    </button>
</div>

<script>
var videoProgress;
var playbackProgress = 0;
var bufferProgress = 0;
var isPlaying = false;
var playbackInterval;
var bufferInterval;

function formatTime(percent) {
    var seconds = Math.floor((percent / 100) * 300);
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function initVideoBuffer() {
    videoProgress = new ej.progressbar.ProgressBar({
        type: 'Linear',
        value: playbackProgress,
        secondaryProgress: bufferProgress,
        height: '8px',
        width: '100%'
    });

    videoProgress.appendTo('#videobuffer');
}

function play() {
    isPlaying = !isPlaying;
    var button = document.getElementById('playBtn');
    
    if (isPlaying) {
        button.textContent = 'Pause';
        
        playbackInterval = setInterval(function() {
            playbackProgress += 0.5;
            if (playbackProgress >= 100) {
                clearInterval(playbackInterval);
                isPlaying = false;
                button.textContent = 'Play';
            }
            videoProgress.value = playbackProgress;
            document.getElementById('playTime').textContent = formatTime(playbackProgress);
        }, 100);

        bufferInterval = setInterval(function() {
            if (bufferProgress < 100) {
                bufferProgress += Math.random() * 2;
            }
            videoProgress.secondaryProgress = bufferProgress;
            document.getElementById('bufferTime').textContent = formatTime(bufferProgress);
        }, 200);
    } else {
        button.textContent = 'Play';
        clearInterval(playbackInterval);
        clearInterval(bufferInterval);
    }
}

document.getElementById('playBtn').addEventListener('click', play);
initVideoBuffer();
</script>
```

### Download with Verification

Show download progress with verification happening simultaneously:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <h3>File Download</h3>
    <div id="downloadBuffer"></div>
    <div style="margin-top: 10px; font-size: 14px;">
        <div>Downloaded: <span id="downloadPercent">0</span>%</div>
        <div>Verified: <span id="verifyPercent">0</span>%</div>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let downloadProgress: ProgressBar;
let downloadValue = 0;
let verifyValue = 0;

function initDownloadBuffer(): void {
    downloadProgress = new ProgressBar({
        type: 'Linear',
        value: downloadValue,
        secondaryProgress: verifyValue,
        height: '20px',
        width: '100%'
    });

    downloadProgress.appendTo('#downloadBuffer');

    // Download phase
    const downloadInterval = setInterval(() => {
        downloadValue += Math.random() * 15;
        if (downloadValue >= 100) {
            downloadValue = 100;
            clearInterval(downloadInterval);
        }
        downloadProgress.value = downloadValue;
        (document.getElementById('downloadPercent') as HTMLSpanElement).textContent = Math.floor(downloadValue).toString();
    }, 300);

    // Verification phase (lags behind)
    const verifyInterval = setInterval(() => {
        if (verifyValue < downloadValue - 10) {
            verifyValue += Math.random() * 10;
        }
        downloadProgress.secondaryProgress = verifyValue;
        (document.getElementById('verifyPercent') as HTMLSpanElement).textContent = Math.floor(verifyValue).toString();
    }, 400);
}

initDownloadBuffer();
```

#### JavaScript

```html
<div style="margin: 20px;">
    <h3>File Download</h3>
    <div id="downloadBuffer"></div>
    <div style="margin-top: 10px; font-size: 14px;">
        <div>Downloaded: <span id="downloadPercent">0</span>%</div>
        <div>Verified: <span id="verifyPercent">0</span>%</div>
    </div>
</div>

<script>
var downloadProgress;
var downloadValue = 0;
var verifyValue = 0;

function initDownloadBuffer() {
    downloadProgress = new ej.progressbar.ProgressBar({
        type: 'Linear',
        value: downloadValue,
        secondaryProgress: verifyValue,
        height: '20px',
        width: '100%'
    });

    downloadProgress.appendTo('#downloadBuffer');

    // Download phase
    var downloadInterval = setInterval(function() {
        downloadValue += Math.random() * 15;
        if (downloadValue >= 100) {
            downloadValue = 100;
            clearInterval(downloadInterval);
        }
        downloadProgress.value = downloadValue;
        document.getElementById('downloadPercent').textContent = Math.floor(downloadValue);
    }, 300);

    // Verification phase (lags behind)
    var verifyInterval = setInterval(function() {
        if (verifyValue < downloadValue - 10) {
            verifyValue += Math.random() * 10;
        }
        downloadProgress.secondaryProgress = verifyValue;
        document.getElementById('verifyPercent').textContent = Math.floor(verifyValue);
    }, 400);
}

initDownloadBuffer();
</script>
```

## Mode Selection Guidelines

```text
┌─────────────────┬──────────────────────────────┬──────────────────────┐
│ Mode            │ When to Use                  │ Known Progress Value │
├─────────────────┼──────────────────────────────┼──────────────────────┤
│ Determinate     │ Progress is measurable       │ Yes (50 of 100 files)│
│ Indeterminate   │ Duration unknown            │ No (API request)     │
│ Buffer          │ Multi-stage/buffered progress│ Yes (primary + secondary)
└─────────────────┴──────────────────────────────┴──────────────────────┘
```

## Real-World Scenarios

### File Upload (Determinate)

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const uploadedSize = 50;
const totalSize = 100;

const fileUpload: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: (uploadedSize / totalSize) * 100,
    height: '20px',
    width: '100%'
});

fileUpload.appendTo('#fileUploadProgress');
```

#### JavaScript

```javascript
var uploadedSize = 50;
var totalSize = 100;

var fileUpload = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: (uploadedSize / totalSize) * 100,
    height: '20px',
    width: '100%'
});

fileUpload.appendTo('#fileUploadProgress');
```

### Data Fetching (Indeterminate)

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const dataLoading: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 30,
    isIndeterminate: true,
    height: '4px',
    width: '100%'
});

dataLoading.appendTo('#dataLoadingProgress');

// Simulate API loading
setTimeout(() => {
    dataLoading.destroy();
    console.log('✅ Data Loaded');
}, 2000);
```

#### JavaScript

```javascript
var dataLoading = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 30,
    isIndeterminate: true,
    height: '4px',
    width: '100%'
});

dataLoading.appendTo('#dataLoadingProgress');

// Simulate API loading
setTimeout(function() {
    dataLoading.destroy();
    console.log('✅ Data Loaded');
}, 2000);
```

### Multi-Step Process (Buffer)

#### TypeScript

**HTML:**

```html
<div style="max-width: 500px; margin: 20px;">
    <h4>Processing: Download → Process → Upload</h4>
    <div id="multiStep"></div>
    <p>Current: <span id="stepName">Downloading</span> | Progress: <span id="stepPercent">0</span>%</p>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let multiStepProgress: ProgressBar;
let currentProgress = 0;
let bufferProgress = 0;
let currentStepName = 'Downloading';

function initMultiStep(): void {
    multiStepProgress = new ProgressBar({
        type: 'Linear',
        value: currentProgress,
        secondaryProgress: bufferProgress,
        height: '20px',
        width: '100%'
    });

    multiStepProgress.appendTo('#multiStep');

    const interval = setInterval(() => {
        if (currentProgress < 33) {
            currentStepName = 'Downloading';
            currentProgress += 2;
            bufferProgress = Math.min(currentProgress + 10, 33);
        } else if (currentProgress < 66) {
            currentStepName = 'Processing';
            currentProgress += 2;
            bufferProgress = Math.min(currentProgress + 10, 66);
        } else if (currentProgress < 100) {
            currentStepName = 'Uploading';
            currentProgress += 2;
            bufferProgress = Math.min(currentProgress + 10, 100);
        } else {
            currentStepName = 'Completed ✅';
            currentProgress = 100;
            bufferProgress = 100;
            clearInterval(interval);
        }

        multiStepProgress.value = currentProgress;
        multiStepProgress.secondaryProgress = bufferProgress;
        (document.getElementById('stepName') as HTMLSpanElement).textContent = currentStepName;
        (document.getElementById('stepPercent') as HTMLSpanElement).textContent = Math.floor(currentProgress).toString();
    }, 300);
}

initMultiStep();
```

#### JavaScript

```html
<div style="max-width: 500px; margin: 20px;">
    <h4>Processing: Download → Process → Upload</h4>
    <div id="multiStep"></div>
    <p>Current: <span id="stepName">Downloading</span> | Progress: <span id="stepPercent">0</span>%</p>
</div>

<script>
var multiStepProgress;
var currentProgress = 0;
var bufferProgress = 0;
var currentStepName = 'Downloading';

function initMultiStep() {
    multiStepProgress = new ej.progressbar.ProgressBar({
        type: 'Linear',
        value: currentProgress,
        secondaryProgress: bufferProgress,
        height: '20px',
        width: '100%'
    });

    multiStepProgress.appendTo('#multiStep');

    var interval = setInterval(function() {
        if (currentProgress < 33) {
            currentStepName = 'Downloading';
            currentProgress += 2;
            bufferProgress = Math.min(currentProgress + 10, 33);
        } else if (currentProgress < 66) {
            currentStepName = 'Processing';
            currentProgress += 2;
            bufferProgress = Math.min(currentProgress + 10, 66);
        } else if (currentProgress < 100) {
            currentStepName = 'Uploading';
            currentProgress += 2;
            bufferProgress = Math.min(currentProgress + 10, 100);
        } else {
            currentStepName = 'Completed ✅';
            currentProgress = 100;
            bufferProgress = 100;
            clearInterval(interval);
        }

        multiStepProgress.value = currentProgress;
        multiStepProgress.secondaryProgress = bufferProgress;
        document.getElementById('stepName').textContent = currentStepName;
        document.getElementById('stepPercent').textContent = Math.floor(currentProgress);
    }, 300);
}

initMultiStep();
</script>
```

## Transitioning Between Modes

Switch modes dynamically based on user interaction or application state:

#### TypeScript

**HTML:**

```html
<div style="margin: 20px;">
    <p>Mode: <span id="modeDisplay">Determinate</span> | Progress: <span id="progressDisplay">0</span>%</p>
    
    <div id="progressContainer"></div>

    <div style="margin-top: 20px;">
        <button onclick="switchMode('determinate')" style="margin: 5px; padding: 8px 16px;">Determinate</button>
        <button onclick="switchMode('indeterminate')" style="margin: 5px; padding: 8px 16px;">Indeterminate</button>
        <button onclick="switchMode('buffer')" style="margin: 5px; padding: 8px 16px;">Buffer</button>
    </div>
</div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let currentMode: 'determinate' | 'indeterminate' | 'buffer' = 'determinate';
let progress = 0;
let secondaryValue = 0;
let modeProgressBar: ProgressBar;
let intervalId: any;

function initModeProgress(): void {
    if (modeProgressBar) {
        modeProgressBar.destroy();
    }

    modeProgressBar = new ProgressBar({
        type: 'Linear',
        value: progress,
        secondaryProgress: currentMode === 'buffer' ? secondaryValue : undefined,
        isIndeterminate: currentMode === 'indeterminate',
        height: '20px',
        width: '100%'
    });

    modeProgressBar.appendTo('#progressContainer');
}

function switchMode(newMode: string): void {
    if (intervalId) {
        clearInterval(intervalId);
    }

    currentMode = newMode as any;
    progress = 0;
    secondaryValue = 0;

    (document.getElementById('modeDisplay') as HTMLSpanElement).textContent = newMode;

    if (newMode === 'indeterminate') {
        progress = 20;
        initModeProgress();
        return;
    }

    initModeProgress();

    intervalId = setInterval(() => {
        progress += 10;
        if (currentMode === 'buffer') {
            secondaryValue = Math.min(100, progress + 20);
            modeProgressBar.secondaryProgress = secondaryValue;
        }

        modeProgressBar.value = progress;
        (document.getElementById('progressDisplay') as HTMLSpanElement).textContent = progress.toString();

        if (progress >= 100) {
            clearInterval(intervalId);
        }
    }, 300);
}

initModeProgress();
```

#### JavaScript

```html
<div style="margin: 20px;">
    <p>Mode: <span id="modeDisplay">Determinate</span> | Progress: <span id="progressDisplay">0</span>%</p>
    
    <div id="progressContainer"></div>

    <div style="margin-top: 20px;">
        <button onclick="switchMode('determinate')" style="margin: 5px; padding: 8px 16px;">Determinate</button>
        <button onclick="switchMode('indeterminate')" style="margin: 5px; padding: 8px 16px;">Indeterminate</button>
        <button onclick="switchMode('buffer')" style="margin: 5px; padding: 8px 16px;">Buffer</button>
    </div>
</div>

<script>
var currentMode = 'determinate';
var progress = 0;
var secondaryValue = 0;
var modeProgressBar;
var intervalId;

function initModeProgress() {
    if (modeProgressBar) {
        modeProgressBar.destroy();
    }

    var config = {
        type: 'Linear',
        value: progress,
        height: '20px',
        width: '100%'
    };

    if (currentMode === 'buffer') {
        config.secondaryProgress = secondaryValue;
    } else if (currentMode === 'indeterminate') {
        config.isIndeterminate = true;
    }

    modeProgressBar = new ej.progressbar.ProgressBar(config);
    modeProgressBar.appendTo('#progressContainer');
}

function switchMode(newMode) {
    if (intervalId) {
        clearInterval(intervalId);
    }

    currentMode = newMode;
    progress = 0;
    secondaryValue = 0;

    document.getElementById('modeDisplay').textContent = newMode;

    if (newMode === 'indeterminate') {
        progress = 20;
        initModeProgress();
        return;
    }

    initModeProgress();

    intervalId = setInterval(function() {
        progress += 10;
        if (currentMode === 'buffer') {
            secondaryValue = Math.min(100, progress + 20);
            modeProgressBar.secondaryProgress = secondaryValue;
        }

        modeProgressBar.value = progress;
        document.getElementById('progressDisplay').textContent = progress;

        if (progress >= 100) {
            clearInterval(intervalId);
        }
    }, 300);
}

initModeProgress();
</script>
```

## Runtime Validation Checklist

Before deploying progress bar modes:

- **Mode Value:** Mode is `'determinate'`, `'indeterminate'`, or `'buffer'`.
- **Value Range:** Progress value is between 0–100 (for determinate mode).
- **Indeterminate Animation:** isIndeterminate is true when duration is unknown.
- **Buffer Consistency:** SecondaryProgress is greater than or equal to primary progress.
- **Container Sizing:** Progress bar container has defined dimensions.
- **Interval Cleanup:** SetInterval timers are cleared when mode changes or component destroys.
- **CSS Styling:** Progress bar has sufficient visual contrast for accessibility.
- **Performance:** Rapid mode switching doesn't cause memory leaks or excessive rerenders.
- **Responsive Behavior:** Progress bar adapts to mobile and desktop screen sizes.
- **Accessibility:** Progress value is announced for screen readers or provided as text.

## Combined Mistakes and Future References

### Incorrect: Missing Cleanup on Mode Switch

```typescript
// WRONG - Interval leaks when switching modes
function switchMode(newMode: string): void {
    currentMode = newMode;
    progress = 0;
    // No clearInterval() call - causes memory leak!
    intervalId = setInterval(() => {
        progress += 10;
        modeProgressBar.value = progress;
    }, 300);
}
```

**Correction:**

Always clear previous intervals before creating new ones:

```typescript
function switchMode(newMode: string): void {
    if (intervalId) {
        clearInterval(intervalId);  // Clear old interval
    }
    currentMode = newMode;
    progress = 0;
    intervalId = setInterval(() => {
        progress += 10;
        modeProgressBar.value = progress;
    }, 300);
}
```

### Incorrect: Outdated Progress Bar Instance

```typescript
// WRONG - Using destroyed progress bar reference
function switchMode(newMode: string): void {
    currentMode = newMode;
    // Previous modeProgressBar was destroyed but not recreated
    modeProgressBar.value = 50;  // Error: object is destroyed
}
```

**Correction:**

Recreate the progress bar instance for each mode:

```typescript
function switchMode(newMode: string): void {
    if (modeProgressBar) {
        modeProgressBar.destroy();  // Clean up old instance
    }
    
    currentMode = newMode;
    
    // Recreate with new configuration
    modeProgressBar = new ProgressBar({
        type: 'Linear',
        value: 0,
        isIndeterminate: currentMode === 'indeterminate',
        height: '20px'
    });
    
    modeProgressBar.appendTo('#progressContainer');
}
```

### Incorrect: Invalid Buffer Relationship

```typescript
// WRONG - Secondary progress less than primary
const bufferProgress = new ProgressBar({
    type: 'Linear',
    value: 70,
    secondaryProgress: 40,  // Should be >= 70
    height: '20px'
});
```

**Correction:**

Ensure secondary progress is always greater than or equal to primary:

```typescript
const bufferProgress = new ProgressBar({
    type: 'Linear',
    value: 40,
    secondaryProgress: 70,  // Greater than primary value
    height: '20px'
});
```

### Incorrect: Using value with Indeterminate

```typescript
// WRONG - value is ignored in indeterminate mode
const indeterminate = new ProgressBar({
    type: 'Linear',
    value: 50,  // This is ignored
    isIndeterminate: true,
    height: '20px'
});
```

**Correction:**

For indeterminate, the value is optional and doesn't affect animation:

```typescript
const indeterminate = new ProgressBar({
    type: 'Linear',
    isIndeterminate: true,  // Animation runs regardless of value
    height: '20px'
});
```

### Incorrect: Forgetting to Destroy Before Switching

```typescript
// WRONG - Multiple progress bars created without cleanup
const container = document.getElementById('progressContainer');

function switchMode(newMode: string) {
    // Just appending without destroying previous instance
    const newProgress = new ProgressBar({ type: 'Linear', value: 0 });
    newProgress.appendTo('#progressContainer');  // Stacking instances!
}
```

**Correction:**

Always destroy the previous instance before creating a new one:

```typescript
let currentProgress: ProgressBar;

function switchMode(newMode: string) {
    if (currentProgress) {
        currentProgress.destroy();  // Remove old instance
    }
    
    currentProgress = new ProgressBar({
        type: 'Linear',
        value: 0,
        isIndeterminate: newMode === 'indeterminate'
    });
    
    currentProgress.appendTo('#progressContainer');
}


