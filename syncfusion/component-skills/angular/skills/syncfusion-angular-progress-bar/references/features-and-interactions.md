# Features and Interactions in Angular Progress Bar

## Table of Contents

- [Annotations and Labels](#annotations-and-labels)
  - [Adding Text Annotations](#adding-text-annotations)
  - [Label with Progress Percentage](#label-with-progress-percentage)
  - [Custom Annotations for Milestones](#custom-annotations-for-milestones)
- [Animation Configuration](#animation-configuration)
  - [Enabling Animation](#enabling-animation)
  - [Animation Properties](#animation-properties)
  - [Indeterminate Animation](#indeterminate-animation)
- [Tooltips](#tooltips)
  - [Basic Tooltip](#basic-tooltip)
  - [Custom Tooltip Content](#custom-tooltip-content)
- [Event Handling](#event-handling)
  - [Progress Value Changed Event](#progress-value-changed-event)
  - [Progress Complete Event](#progress-complete-event)
  - [Multiple Event Handling](#multiple-event-handling)
- [Range Indicators](#range-indicators)
  - [Color-Coded Ranges](#color-coded-ranges)
  - [Critical Threshold Visualization](#critical-threshold-visualization)
- [Reactive Data Binding](#reactive-data-binding)
  - [Two-Way Data Binding](#two-way-data-binding)
  - [Observable-Based Progress Updates](#observable-based-progress-updates)
  - [Form-Controlled Progress](#form-controlled-progress)
- [Combined Example: Upload with All Features](#combined-example-upload-with-all-features)


## Annotations and Labels

### Adding Text Annotations

```typescript
import { Component, ViewChild } from '@angular/core';
import { ProgressBarModule, ProgressBarComponent, ProgressAnnotationService } from '@syncfusion/ej2-angular-progressbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-annotations',
  standalone: true,
  imports: [ProgressBarModule],
  providers: [ProgressAnnotationService],
  template: `
    <ejs-progressbar 
      [value]="65"
      type="Linear">
     <e-progressbar-annotations>
        <e-progressbar-annotation
          content='<div id="point1" style="font-size:20px;margin-top:30px;font-weight:bold;color:red;fill:#ffffff"><span>65%</span></div>'>
        </e-progressbar-annotation>
       </e-progressbar-annotations>
    </ejs-progressbar>
  `
})
export class AnnotationsComponent {
}
```

### Label with Progress Percentage

You can show the progress value in both linear and circular progress bar using showProgressValue property.

```typescript
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule, ProgressAnnotationService } from '@syncfusion/ej2-angular-progressbar'
import { FontModel, AnimationModel, ITextRenderEventArgs } from '@syncfusion/ej2-progressbar';
@Component({
imports: [ ProgressBarModule ],
providers: [ProgressAnnotationService],
standalone: true,
    selector: 'my-app',
    template:
    `<ejs-progressbar  id='percentage' type='Linear' [trackThickness]='trackThickness' [progressThickness]='progressThickness'  [value]='value'   [labelStyle]='labelStyle'  (textRender)='textRender2($event)'   [showProgressValue]='showProgressValue' [animation]='animation'>
    </ejs-progressbar>`
})
export class AppComponent implements OnInit {
    public animation?: AnimationModel;
    public value?: number;
    public trackThickness?: number;
    public progressThickness?: number;
    public labelStyle?: FontModel;
    public showProgressValue?: boolean;
    public textRender2(args: ITextRenderEventArgs): void {
        args.text = '50';
     }
    ngOnInit(): void {
        this.trackThickness = 24;
        this.progressThickness = 24;
        this.value = 50;
        this.animation = { enable: true, duration: 2000, delay: 0 };
        this.labelStyle = { color: '#FFFFFF' };
        this.showProgressValue = true;
    }
}
```

### Custom Annotations for Milestones

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule, ProgressAnnotationService } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [ProgressBarModule],
  providers: [ProgressAnnotationService],
  template: `
    <div style="margin:30px; max-width:650px;">
      <h4>Project Milestones</h4>

      <ejs-progressbar
        type="Linear"
        height="20"
        [value]="projectProgress">

        <e-progressbar-annotations>
          <e-progressbar-annotation
            y="35"
            content="
              <div style='
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 11px;
                color: #666;
                text-align: center;
                white-space: nowrap;
              '>
                <div>Start<br/>0%</div>
                <div style='margin-left:70px'>Phase 1<br/>25%</div>
                <div style='margin-left:70px'>Phase 2<br/>50%</div>
                <div style='margin-left:65px'>Phase 3<br/>75%</div>
                <div style='margin-left:60px'>Complete<br/>100%</div>
              </div>
            ">
          </e-progressbar-annotation>
        </e-progressbar-annotations>

      </ejs-progressbar>
    </div>
  `
})
export class AppComponent {
  projectProgress = 60;
}

```

## Animation Configuration

### Enabling Animation

```typescript
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { AnimationModel } from '@syncfusion/ej2-progressbar';
@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h4>Animated Progress</h4>
      
      <ejs-progressbar 
        [value]="value"
        type="Linear"
        height="20"
        [animation]="animation">
      </ejs-progressbar>

      <button (click)="startAnimation()" style="margin-top: 20px; padding: 8px 16px;">
        Animate to 100%
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
export class AnimationComponent implements OnInit {
  public value = 0;
  public animation!: AnimationModel;

  ngOnInit(): void {
    this.animation = {
      enable: true,
      duration: 2000,
      delay: 0
    };
  }

  startAnimation(): void {
    // Reset first to retrigger animation
    this.value = 0;

    // Allow reset to render
    setTimeout(() => {
      this.value = 100;
    });
  }
}
```

### Animation Properties

```typescript
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { AnimationModel } from '@syncfusion/ej2-progressbar';

@Component({
  selector: 'app-animation-config',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- Fast animation -->
      <div style="margin-bottom: 20px;">
        <label>Fast (500ms)</label>
        <ejs-progressbar
          id="pb-fast" 
          [value]="50"
          type="Linear"
          [animation]="fastAnimation">
        </ejs-progressbar>
      </div>

      <!-- Normal animation -->
      <div style="margin-bottom: 20px;">
        <label>Normal (2000ms)</label>
        <ejs-progressbar
          id="pb-normal" 
          [value]="50"
          type="Linear"
          [animation]="normalAnimation">
        </ejs-progressbar>
      </div>

      <!-- Slow animation -->
      <div style="margin-bottom: 20px;">
        <label>Slow (4000ms)</label>
        <ejs-progressbar
          id="pb-slow" 
          [value]="50"
          type="Linear"
          [animation]="slowAnimation">
        </ejs-progressbar>
      </div>

      <!-- With delay -->
      <div style="margin-bottom: 20px;">
        <label>With Delay (1000ms delay)</label>
        <ejs-progressbar
          id="pb-delay" 
          [value]="50"
          type="Linear"
          [animation]="delayAnimation">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class AnimationConfigComponent implements OnInit {
  public fastAnimation!: AnimationModel;
  public normalAnimation!: AnimationModel;
  public slowAnimation!: AnimationModel;
  public delayAnimation!: AnimationModel;

  ngOnInit(): void {
    this.fastAnimation = {
      enable: true,
      duration: 500
    };

    this.normalAnimation = {
      enable: true,
      duration: 2000
    };

    this.slowAnimation = {
      enable: true,
      duration: 4000
    };

    this.delayAnimation = {
      enable: true,
      duration: 2000,
      delay: 1000
    };
  }
}
```

### Indeterminate Animation

```html
<ejs-progressbar 
  [isIndeterminate]="true"
  type="Linear"
  value=30
  height="4"
  [animation]="{ enable: true, duration: 3000 }">
</ejs-progressbar>
```

## Tooltips

### Basic Tooltip

```typescript
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="progressValue"
      type="Circular"
      [tooltip]="tooltip">
    </ejs-progressbar>
  `
})
export class TooltipComponent {
  progressValue = 65;
  public tooltip: Object = {
    enable: true,
        format: "Progress: ${value}"
  }
}
```

### Custom Tooltip Content

```typescript
@Component({
  selector: 'app-custom-tooltip',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h4>Custom Tooltip Content</h4>
      
      <ejs-progressbar 
        [value]="fileProgress"
        type="Linear"
        height="25"
        [tooltip]="{ enable: true, textStyle: { fontWeight: '900', size: '15px', color:'red', fontFamily: 'Roboto', fontStyle: 'Italic' } }">
      </ejs-progressbar>
    </div>
  `
})
export class CustomTooltipComponent {
  fileProgress = 50;
}
```

## Event Handling

### Text Render Event

Customize the label/text displayed in the progress bar:

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule, ProgressAnnotationService } from '@syncfusion/ej2-angular-progressbar';
import { ITextRenderEventArgs, FontModel, AnimationModel } from '@syncfusion/ej2-progressbar';

@Component({
  selector: 'app-text-render',
  standalone: true,
  imports: [ProgressBarModule],
  providers: [ProgressAnnotationService],
  template: `
    <div style="margin: 20px;">
      <!-- Custom text format -->
      <div style="margin: 15px 0;">
        <label>Custom Progress Text</label>
        <ejs-progressbar
          id="custom-text"
          [value]="65"
          type="Linear"
          height="30"
          [trackThickness]="24"
          [progressThickness]="24"
          [showProgressValue]="true"
          [labelStyle]="labelStyle"
          (textRender)="onTextRender($event)"
          [animation]="animation"
          style="width: 400px;">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class TextRenderComponent {
  public animation?: AnimationModel;
  public labelStyle?: FontModel;

  ngOnInit() {
    this.animation = { enable: true, duration: 2000, delay: 0 };
    this.labelStyle = { color: '#FFFFFF', fontWeight: 'bold' };
  }

  onTextRender(args: ITextRenderEventArgs): void {
    // Customize text display
    args.text = args.value + '%'; // Default format
    // Or use custom format
    if (args.value && args.value >= 75) {
      args.text = '✓ ' + args.value + '%';
    } else if (args.value && args.value >= 50) {
      args.text = '◐ ' + args.value + '%';
    } else {
      args.text = '◑ ' + args.value + '%';
    }
  }
}
```

### Advanced Text Rendering

```typescript
@Component({
  selector: 'app-advanced-text-render',
  standalone: true,
  imports: [ProgressBarModule],
  providers: [ProgressAnnotationService],
  template: `
    <div style="margin: 20px;">
      <!-- Download with MB display -->
      <ejs-progressbar
        id="download-text"
        [value]="downloadPercent"
        type="Linear"
        height="25"
        [trackThickness]="20"
        [progressThickness]="20"
        [showProgressValue]="true"
        [labelStyle]="labelStyle"
        (textRender)="formatDownloadText($event)"
        style="width: 400px;">
      </ejs-progressbar>
      <p>Downloading: {{ downloadedMB }} MB / {{ totalMB }} MB</p>
    </div>
  `
})
export class AdvancedTextRenderComponent {
  downloadPercent = 45;
  downloadedMB = 450;
  totalMB = 1000;
  public labelStyle = { color: '#FFFFFF', fontWeight: 'bold', size: '14px' };

  formatDownloadText(args: ITextRenderEventArgs): void {
    args.text = `${this.downloadedMB}/${this.totalMB} MB`;
  }
}
```

### Progress Value Changed Event

```typescript
import { Component, ViewChild } from '@angular/core';
import { ProgressBarModule, ProgressBarComponent } from '@syncfusion/ej2-angular-progressbar'
import { IProgressValueEventArgs } from '@syncfusion/ej2-progressbar';
@Component({
  selector: 'app-value-change',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <ejs-progressbar 
        #progress
        [value]="currentValue"
        type="Linear"
        height="20"
        (valueChanged)="onValueChange($event)">
      </ejs-progressbar>

      <button style="margin-top: 10px;" (click)="changeValue()">
        Change Value
      </button>
      <p>Current Value: {{ currentValue }}%</p>
      <p>Last Changed: {{ lastChanged }}</p>
    </div>
  `
})
export class ValueChangeComponent {
  @ViewChild('progress', { static: false })
  public progressBar?: ProgressBarComponent;

  currentValue = 30;
  lastChanged = 'Never';
  public onValueChange(args: IProgressValueEventArgs): void {
    this.lastChanged = new Date().toLocaleTimeString();
    args.progressColor = '#2BB20E'; // optional visual change
  }
  public changeValue(): void {
    if (this.progressBar) {
      this.currentValue += 10;
      if (this.currentValue > 100) {
        this.currentValue = 20;
      }
      this.progressBar.value = this.currentValue;
    }
  }
}
```

### Progress Complete Event

```typescript
@Component({
  selector: 'app-complete-event',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
    <div style="margin: 20px;">
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="20"
        (progressCompleted)="onComplete()">
      </ejs-progressbar>

      <button (click)="startProgress()" style="margin-top: 20px; padding: 8px 16px;">
        Start Progress
      </button>

      <div *ngIf="completed" style="margin-top: 20px; padding: 15px; 
                                     background-color: #e8f5e9; color: #2e7d32;
                                     border-radius: 4px;">
        ✓ Progress Complete!
      </div>
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
export class CompleteEventComponent {
  progress = 0;
  completed = false;

  startProgress() {
    this.progress = 0;
    this.completed = false;
    const interval = setInterval(() => {
      this.progress += Math.random() * 25;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
      }
    }, 200);
  }

  onComplete() {
    this.completed = true;
  }
}
```

### Multiple Event Handling

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar'
import { IProgressValueEventArgs } from '@syncfusion/ej2-progressbar';

@Component({
  selector: 'app-multi-events',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="20"
        (valueChanged)="onValueChanged($event)"
        (progressCompleted)="onComplete($event)">
      </ejs-progressbar>

      <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5;
                  border-radius: 4px; font-family: monospace; font-size: 12px;">
        <p>{{ eventLog }}</p>
      </div>
    </div>
  `,
  styles: [`
    p {
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
    }
  `]
})
export class MultiEventsComponent {
  progress = 0;
  eventLog = 'Waiting for events...\n';

  onValueChanged(args: IProgressValueEventArgs) {
    this.eventLog += `[${new Date().toLocaleTimeString()}] Value changed to ${args.value}%\n`;
  }

  onComplete(args: IProgressValueEventArgs) {
    this.eventLog += `[${new Date().toLocaleTimeString()}] Completed!\n`;
  }

  ngOnInit() {
    const interval = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(interval);
      }
    }, 300);
  }
}
```

## Range Indicators

### Color-Coded Ranges

```typescript
@Component({
  selector: 'app-range-indicators',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h4>Progress Ranges</h4>

      <!-- Low (0-33%) -->
      <div style="margin: 15px 0;">
        <label>Low Priority: {{ lowRange }}%</label>
        <ejs-progressbar
          id="lowProgress" 
          [value]="lowRange"
          minimum="0"
          maximum="100"
          type="Linear"
          height="20"
          [progressColor]="'#FF9800'"
          [trackColor]="'#FFE8D6'">
        </ejs-progressbar>
      </div>

      <!-- Medium (33-66%) -->
      <div style="margin: 15px 0;">
        <label>Medium Priority: {{ mediumRange }}%</label>
        <ejs-progressbar
          id="mediumProgress" 
          [value]="mediumRange"
          type="Linear"
          minimum="0"
          maximum="100"
          height="20"
          [progressColor]="'#FFC107'"
          [trackColor]="'#FFF3E0'">
        </ejs-progressbar>
      </div>

      <!-- High (66-100%) -->
      <div style="margin: 15px 0;">
        <label>High Priority: {{ highRange }}%</label>
        <ejs-progressbar
          id="highProgress" 
          [value]="highRange"
          minimum="0"
          maximum="100"
          type="Linear"
          height="20"
          [progressColor]="'#4CAF50'"
          [trackColor]="'#E8F5E9'">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class RangeIndicatorsComponent {
  lowRange = 25;
  mediumRange = 50;
  highRange = 85;
}
```

### Critical Threshold Visualization

```typescript
@Component({
  selector: 'app-threshold-warning',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
    <div style="margin: 20px;">
      <h4>Storage Usage</h4>
      
      <ejs-progressbar 
        [value]="storageUsage"
        type="Linear"
        height="25"
        [progressColor]="getStorageColor()"
        [trackColor]="'#e0e0e0'">
      </ejs-progressbar>

      <div style="margin-top: 10px; display: flex; justify-content: space-between;
                  font-size: 12px; color: #666;">
        <span>0%</span>
        <span>50%</span>
        <span style="color: #F44336;">90% (Critical)</span>
        <span>100%</span>
      </div>

      <p style="margin-top: 15px;">
        Usage: {{ storageUsage }}GB / 100GB
        <span *ngIf="storageUsage >= 90" style="color: #F44336;">
          ⚠️ Storage critical
        </span>
      </p>
    </div>
  `
})
export class ThresholdWarningComponent {
  storageUsage = 85;

  getStorageColor(): string {
    if (this.storageUsage >= 90) return '#F44336'; // Red
    if (this.storageUsage >= 70) return '#FF9800'; // Orange
    return '#4CAF50'; // Green
  }
}
```

## Reactive Data Binding

### Two-Way Data Binding

```typescript
import { Component, ViewChild } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-binding',
  standalone: true,
  imports: [ProgressBarModule, FormsModule],
  template: `
    <div style="margin: 20px;">
      <h4>Real-time Progress Control</h4>
      
      <div style="margin-bottom: 20px;">
        <label>Progress Value:</label>
        <input 
          type="number" 
          min="0" 
          max="100" 
          [(ngModel)]="progressValue"
          style="padding: 5px; margin-left: 10px;">
      </div>

      <ejs-progressbar 
        [value]="progressValue"
        type="Linear"
        height="25">
      </ejs-progressbar>

      <p style="margin-top: 10px;">{{ progressValue }}%</p>
    </div>
  `
})
export class ReactiveBindingComponent {
  progressValue = 50;
}
```

### Observable-Based Progress Updates

```typescript
import { Observable, interval } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-observable-progress',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
    <div style="margin: 20px;">
      <h4>Observable-Based Progress</h4>
      <ng-container *ngIf="currentProgress$ | async as progress">
        <ejs-progressbar 
          [value]="progress"
          type="Linear"
          height="20">
        </ejs-progressbar>

        <p style="margin-top: 10px;">{{ (currentProgress$ | async) }}%</p>
      </ng-container>
    </div>
  `
})
export class ObservableProgressComponent implements OnInit {
  currentProgress$!: Observable<number>;

  ngOnInit() {
    this.currentProgress$ = interval(100).pipe(
      map(x => (x * 5) % 101),
      takeWhile(x => x <= 100 || x === 0)
    );
  }
}
```

### Form-Controlled Progress

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-progress',
  standalone: true,
  imports: [ProgressBarModule, ReactiveFormsModule],
  template: `
    <div style="margin: 20px;">
      <h4>Form-Controlled Progress</h4>
      
      <div style="margin-bottom: 20px;">
        <label>Set Progress:</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          [formControl]="progressControl"
          style="margin-left: 10px; width: 300px;">
      </div>

      <ejs-progressbar 
        [value]="progressControl.value"
        type="Linear"
        [height]="25">
      </ejs-progressbar>

      <p>{{ progressControl.value }}%</p>
    </div>
  `,
  styles: [`
    input[type="range"] {
      cursor: pointer;
    }
  `]
})
export class FormProgressComponent {
  progressControl = new FormControl(50);
}
```

## Combined Example: Upload with All Features

```typescript
@Component({
  selector: 'app-full-featured',
  standalone: true,
  imports: [ProgressBarModule, CommonModule],
  template: `
    <div style="padding: 30px; max-width: 500px;">
      <h3>Advanced File Upload</h3>

      <ejs-progressbar 
        [value]="uploadProgress"
        type="Linear"
        height="30"
        [animation]="{ enable: true, duration: 500 }"
        (valueChanged)="onProgressChange($event)"
        (progressCompleted)="onUploadComplete()">
      </ejs-progressbar>

      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
        <span>{{ uploadedSize }} MB / {{ totalSize }} MB</span>
        <span [style.color]="getStatusColor()">{{ uploadStatus }}</span>
      </div>

      <button 
        (click)="startUpload()" 
        [disabled]="isUploading"
        style="margin-top: 20px; padding: 10px 20px; cursor: pointer;
               background-color: #0078d4; color: white; border: none;
               border-radius: 4px;">
        {{ isUploading ? 'Uploading...' : 'Start Upload' }}
      </button>

      <div *ngIf="uploadComplete" style="margin-top: 20px; padding: 15px;
                                         background-color: #e8f5e9; color: #2e7d32;
                                         border-radius: 4px;">
        ✓ Upload complete!
      </div>
    </div>
  `
})
export class FullFeaturedComponent {
  uploadProgress = 0;
  uploadedSize = 0;
  totalSize = 500;
  uploadStatus = 'Ready';
  isUploading = false;
  uploadComplete = false;

  startUpload() {
    this.isUploading = true;
    this.uploadComplete = false;
    this.uploadProgress = 0;
    this.uploadedSize = 0;

    const interval = setInterval(() => {
      this.uploadProgress += Math.random() * 20;
      this.uploadedSize = Math.floor((this.uploadProgress / 100) * this.totalSize);
      
      if (this.uploadProgress >= 100) {
        this.uploadProgress = 100;
        this.uploadedSize = this.totalSize;
        clearInterval(interval);
        this.isUploading = false;
      }
    }, 300);
  }

  onProgressChange(event: IProgressValueEventArgs) {
    if (event.value < 30) {
      this.uploadStatus = 'Initializing...';
    } else if (event.value < 70) {
      this.uploadStatus = 'Uploading...';
    } else {
      this.uploadStatus = 'Finalizing...';
    }
  }

  onUploadComplete() {
    this.uploadComplete = true;
    this.uploadStatus = 'Complete!';
  }

  getStatusColor(): string {
    if (this.uploadComplete) return '#4CAF50';
    if (this.isUploading) return '#0078d4';
    return '#666';
  }
}
```


