# Progress Modes in Angular Progress Bar

## Table of Contents

- [Determinate Mode](#determinate-mode)
  - [Basic Determinate Progress](#basic-determinate-progress)
  - [User-Controlled Progress](#user-controlled-progress)
  - [Minimum and Maximum Values](#minimum-and-maximum-values)
- [Indeterminate Mode](#indeterminate-mode)
  - [Basic Indeterminate Progress](#basic-indeterminate-progress)
  - [Indeterminate with Custom Height](#indeterminate-with-custom-height)
  - [Circular Indeterminate](#circular-indeterminate)
  - [Switching from Indeterminate to Determinate](#switching-from-indeterminate-to-determinate)
- [Buffer Mode](#buffer-mode)
  - [Basic Buffer Progress](#basic-buffer-progress)
  - [Video Buffering Simulation](#video-buffering-simulation)
  - [Download with Speed Visualization](#download-with-speed-visualization)
- [Mode Selection Guidelines](#mode-selection-guidelines)
- [Real-World Scenarios](#real-world-scenarios)
  - [Scenario 1: File Upload (Determinate)](#scenario-1-file-upload-determinate)
  - [Scenario 2: Data Fetching (Indeterminate)](#scenario-2-data-fetching-indeterminate)
  - [Scenario 3: Multi-Step Process (Buffer)](#scenario-3-multi-step-process-buffer)
- [Combining Modes](#combining-modes)
  - [Transitioning Modes in One Component](#transitioning-modes-in-one-component)

## Determinate Mode

Determinate mode shows explicit progress from 0 to 100%, used when you know the task duration or completion percentage.

### Basic Determinate Progress

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-determinate',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="progressValue"
      type="Linear">
    </ejs-progressbar>
    <p>{{ progressValue }}% Complete</p>
  `
})
export class DeterminateComponent {
  progressValue = 45;
}
```

### User-Controlled Progress

```typescript
@Component({
  selector: 'app-user-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          [value]="progress"
          (input)="onSliderChange($event)"
          style="width: 100%;">
      </div>
      
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="25">
      </ejs-progressbar>
      
      <p>{{ progress }}% Complete</p>
    </div>
  `,
  styles: [`
    input[type="range"] {
      margin-top: 10px;
    }
  `]
})
export class UserProgressComponent {
  progress = 50;

  onSliderChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.progress = parseInt(input.value);
  }
}
```

### Minimum and Maximum Values

Customize the progress range:

```typescript
@Component({
  selector: 'app-custom-range',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <!-- Progress from 10 to 90 with current value 50 -->
    <ejs-progressbar 
      [minimum]="10"
      [maximum]="90"
      [value]="50"
      type="Linear">
    </ejs-progressbar>
  `
})
export class CustomRangeComponent {
}
```

## Indeterminate Mode

Indeterminate mode shows animation without specific progress value, used when duration is unknown.

### Basic Indeterminate Progress

```typescript
@Component({
  selector: 'app-indeterminate',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [isIndeterminate]="true"
      type="Linear" value=20>
    </ejs-progressbar>
  `
})
export class IndeterminateComponent {
}
```

### Indeterminate with Custom Height

```html
<ejs-progressbar 
  [isIndeterminate]="true"
  type="Linear"
  height="8"
  value=30>
</ejs-progressbar>
```

### Circular Indeterminate

```html
<ejs-progressbar 
  [isIndeterminate]="true"
  type="Circular"
  value=30>
</ejs-progressbar>
```

### Switching from Indeterminate to Determinate

Transition from indeterminate to determinate when progress becomes known:

```typescript
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    <div style="margin: 20px; width: 400px;">
      <ejs-progressbar
        #progressBar
        [value]="progress"
        [isIndeterminate]="isIndeterminate"
        type="Linear"
        height="20px"
        width="100%">
      </ejs-progressbar>

      <p *ngIf="isIndeterminate">Loading...</p>
      <p *ngIf="!isIndeterminate">
        {{ progress | number:'1.0-0' }}% Complete
      </p>
    </div>
  `
})
export class AppComponent {

  @ViewChild('progressBar')
  progressBar!: ProgressBarComponent;

  progress = 0;
  isIndeterminate = true;

  ngOnInit() {
    setTimeout(() => {
      this.isIndeterminate = false;
      setTimeout(() => {
        this.progressBar.refresh();
        this.startProgressUpdate();
      });
    }, 2000);
  }

  startProgressUpdate() {
    const interval = setInterval(() => {
      this.progress += Math.random() * 20;

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
      }
    }, 500);
  }
}
```

## Buffer Mode

Buffer mode displays both primary progress and secondary progress (buffer). Used when content is being loaded ahead of playback.

### Basic Buffer Progress

```typescript
@Component({
  selector: 'app-buffer-mode',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="primaryProgress"
      [secondaryProgress]="bufferProgress"
      type="Linear"
      height="20">
    </ejs-progressbar>
    <p>Playing: {{ primaryProgress }}% | Buffered: {{ bufferProgress }}%</p>
  `
})
export class BufferModeComponent {
  primaryProgress = 35;
  bufferProgress = 65;
}
```

### Video Buffering Simulation

```typescript
@Component({
  selector: 'app-video-buffering',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
    <div style="margin: 20px;">
      <h3>Video Playback</h3>
      
      <ejs-progressbar 
        [value]="playbackProgress"
        [secondaryProgress]="bufferProgress"
        type="Linear"
        height="8">
      </ejs-progressbar>
      
      <div style="font-size: 12px; margin-top: 5px;">
        Playing: {{ formatTime(playbackProgress) }} | 
        Buffered: {{ formatTime(bufferProgress) }} | 
        Total: {{ formatTime(100) }}
      </div>

      <button (click)="play()" style="margin-top: 10px; padding: 8px 16px;">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
    </div>
  `,
  styles: [`
    button {
      background-color: #0078d4;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }
  `]
})
export class VideoBufferingComponent {
  playbackProgress = 0;
  bufferProgress = 0;
  isPlaying = false;
  playbackInterval: any;
  bufferInterval: any;

  play() {
    this.isPlaying = !this.isPlaying;
    
    if (this.isPlaying) {
      // Playback moves slower
      this.playbackInterval = setInterval(() => {
        this.playbackProgress += 0.5;
        if (this.playbackProgress >= 100) {
          clearInterval(this.playbackInterval);
          this.isPlaying = false;
        }
      }, 100);

      // Buffer advances faster
      this.bufferInterval = setInterval(() => {
        if (this.bufferProgress < 100) {
          this.bufferProgress += Math.random() * 2;
        }
      }, 200);
    } else {
      clearInterval(this.playbackInterval);
      clearInterval(this.bufferInterval);
    }
  }

  formatTime(percent: number): string {
    const seconds = Math.floor((percent / 100) * 300);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    clearInterval(this.playbackInterval);
    clearInterval(this.bufferInterval);
  }
}
```

### Download with Speed Visualization

```typescript
@Component({
  selector: 'app-download-buffer',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h3>File Download</h3>
      
      <ejs-progressbar 
        [value]="downloadProgress"
        [secondaryProgress]="verifyProgress"
        type="Linear"
        height="20">
      </ejs-progressbar>

      <div style="margin-top: 10px; font-size: 14px;">
        <div>Downloaded: {{ downloadProgress }}%</div>
        <div>Verified: {{ verifyProgress }}%</div>
      </div>
    </div>
  `
})
export class DownloadBufferComponent implements OnInit {
  downloadProgress = 0;
  verifyProgress = 0;

  ngOnInit() {
    // Download phase
    const downloadInterval = setInterval(() => {
      this.downloadProgress += Math.random() * 15;
      if (this.downloadProgress >= 100) {
        this.downloadProgress = 100;
        clearInterval(downloadInterval);
      }
    }, 300);

    // Verification phase (lags behind)
    const verifyInterval = setInterval(() => {
      if (this.verifyProgress < this.downloadProgress - 10) {
        this.verifyProgress += Math.random() * 10;
      }
    }, 400);
  }
}
```

## Mode Selection Guidelines

| Mode | When to Use | Example | Known % |
|------|-------------|---------|----------|
| **Determinate** | Progress is measurable | File upload (50/100 MB) | ✓ Yes |
| **Indeterminate** | Duration unknown | API request loading | ✗ No |
| **Buffer** | Multi-stage progress | Video playback (play vs buffer) | ✓ Primary + Secondary |

## Real-World Scenarios

### Scenario 1: File Upload (Determinate)

```typescript
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="uploadProgress"
      type="Linear"
      height="20">
    </ejs-progressbar>
    <p>{{ uploadedSize }} MB / {{ totalSize }} MB</p>
  `
})
export class FileUploadComponent {
  uploadedSize = 50;
  totalSize = 100;
  get uploadProgress(): number {
    return (this.uploadedSize / this.totalSize) * 100;
  }

}
```

### Scenario 2: Data Fetching (Indeterminate)

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    <ejs-progressbar
      *ngIf="isLoading"
      [isIndeterminate]="true"
      value=30
      type="Linear"
      height="4"
      width="100%">
    </ejs-progressbar>

    <p *ngIf="isLoading">Loading...</p>

    <p *ngIf="!isLoading">✅ Data Loaded</p>
  `
})
export class AppComponent {
  isLoading = true;

  // Simulate API loading
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
```

### Scenario 3: Multi-Step Process (Buffer)

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    <div style="max-width: 500px;">
      <h4>Processing: Download → Process → Upload</h4>

      <!-- Buffer progress bar -->
      <ejs-progressbar
        [value]="currentProgress"
        [secondaryProgress]="bufferProgress"
        type="Linear"
        height="20"
        width="100%">
      </ejs-progressbar>

      <p>
        Current: {{ currentStepName }} |
        Progress: {{ currentProgress | number:'1.0-0' }}%
      </p>
    </div>
  `
})
export class AppComponent implements OnInit {

  currentProgress = 0;     // primary progress
  bufferProgress = 0;      // secondary (buffer) progress
  currentStepName = 'Downloading';

  ngOnInit() {

    const interval = setInterval(() => {

      // ---- Step 1: Download (0–33%) ----
      if (this.currentProgress < 33) {
        this.currentStepName = 'Downloading';
        this.currentProgress += 2;
        this.bufferProgress = Math.min(this.currentProgress + 10, 33);
      }

      // ---- Step 2: Process (33–66%) ----
      else if (this.currentProgress < 66) {
        this.currentStepName = 'Processing';
        this.currentProgress += 2;
        this.bufferProgress = Math.min(this.currentProgress + 10, 66);
      }

      // ---- Step 3: Upload (66–100%) ----
      else if (this.currentProgress < 100) {
        this.currentStepName = 'Uploading';
        this.currentProgress += 2;
        this.bufferProgress = Math.min(this.currentProgress + 10, 100);
      }

      // ---- Done ----
      else {
        this.currentStepName = 'Completed ✅';
        this.currentProgress = 100;
        this.bufferProgress = 100;
        clearInterval(interval);
      }

    }, 300);
  }
}
``
```

## Combining Modes

### Transitioning Modes in One Component

```typescript
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ProgressBarModule],
  template: `
    <ejs-progressbar
      *ngIf="mode !== 'indeterminate'"
      type="Linear"
      height="20"
      [value]="progress"
      [secondaryProgress]="mode === 'buffer' ? secondaryValue : null">
    </ejs-progressbar>

    <ejs-progressbar
      *ngIf="mode === 'indeterminate'"
      type="Linear"
      height="20"
      [value]="progress"
      [isIndeterminate]="true">
    </ejs-progressbar>

    <p>Mode: {{ mode }} | Progress: {{ progress }}%</p>

    <div>
      <button (click)="setMode('determinate')">Determinate</button>
      <button (click)="setMode('indeterminate')">Indeterminate</button>
      <button (click)="setMode('buffer')">Buffer</button>
    </div>
  `
})
export class AppComponent {
  mode: 'determinate' | 'indeterminate' | 'buffer' = 'determinate';
  progress = 0;
  secondaryValue = 0;
  private intervalId: any;
  setMode(newMode: typeof this.mode) {
    this.clearInterval();
    this.mode = newMode;
    if (newMode === 'indeterminate') {
      this.progress = 20;   // logical value only
      return;
    }
    this.progress = 0;
    this.secondaryValue = 0;
    this.intervalId = setInterval(() => {
      this.progress += 10;
      if (this.mode === 'buffer') {
        this.secondaryValue = Math.min(100, this.progress + 20);
      }
      if (this.progress >= 100) {
        this.clearInterval();
      }
    }, 300);
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
```


