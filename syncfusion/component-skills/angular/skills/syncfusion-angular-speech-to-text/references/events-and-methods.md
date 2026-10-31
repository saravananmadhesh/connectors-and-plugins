# Events and Methods

## Table of Contents
- [Events Overview](#events-overview)
- [Event Types](#event-types)
- [Event Handling](#event-handling)
- [Methods](#methods)
- [Programmatic Control Example](#programmatic-control-example)
- [Canceling Listening with StartListeningEventArgs](#canceling-listening-with-startlisteningeventargs)
- [Distinguishing User vs Programmatic Actions](#distinguishing-user-vs-programmatic-actions)
- [Distinguishing Interim vs Final Results](#distinguishing-interim-vs-final-results)
- [Controlling Component State with listeningState](#controlling-component-state-with-listeningstate)

## Events Overview

The SpeechToText component emits five events during the speech recognition lifecycle. These events allow you to respond to user interactions and state changes.

| Event | Args | Description |
|-------|------|-------------|
| `created` | - | Triggers when the component is fully rendered |
| `onStart` | StartListeningEventArgs | Triggers when speech recognition begins |
| `onStop` | StopListeningEventArgs | Triggers when speech recognition stops |
| `onError` | ErrorEventArgs | Triggers when an error occurs |
| `transcriptChanged` | TranscriptChangedEventArgs | Triggers when transcription updates |

## Event Types

### created Event

Fires when the SpeechToText component completes rendering:

```typescript
onCreated(): void {
    console.log('SpeechToText component is ready to use');
}
```

### onStart Event

Fires when the user clicks the button and speech recognition begins. Provides `StartListeningEventArgs`:

```typescript
onListeningStart(args: StartListeningEventArgs): void {
    console.log('Listening started');
    console.log('Listening state:', args.listeningState);
    console.log('User interaction:', args.isInteracted);
    console.log('Event name:', args.name);
    
    // Cancel listening based on a condition
    if (someCondition) {
        args.cancel = true;  // Prevents listening from starting
    }
}
```

**StartListeningEventArgs Properties:**
- `listeningState` (SpeechToTextState): Current component state
- `isInteracted` (boolean): `true` if triggered by user click, `false` if programmatic
- `cancel` (boolean): Set to `true` to prevent listening from starting
- `event` (Event): The browser's native event object
- `name` (string): The event name ('onStart')

### onStop Event

Fires when speech recognition stops. Provides `StopListeningEventArgs`:

```typescript
onListeningStop(args: StopListeningEventArgs): void {
    console.log('Listening stopped');
    console.log('Listening state:', args.listeningState);
    console.log('User interaction:', args.isInteracted);
    console.log('Event name:', args.name);
}
```

**StopListeningEventArgs Properties:**
- `listeningState` (SpeechToTextState): Current component state
- `isInteracted` (boolean): `true` if triggered by user click, `false` if programmatic
- `event` (Event): The browser's native event object
- `name` (string): The event name ('onStop')

### onError Event

Fires when an error occurs during speech recognition. Provides `ErrorEventArgs`:

```typescript
onErrorHandler(args: ErrorEventArgs): void {
    console.log('Error occurred:', args.error);
    console.log('Error message:', args.errorMessage);
    console.log('Event name:', args.name);
    console.log('Native event:', args.event);
    
    // Access browser's native error event for advanced debugging
    if (args.event) {
        console.log('Event timestamp:', args.event.timeStamp);
        console.log('Event type:', args.event.type);
    }
}
```

**ErrorEventArgs Properties:**
- `error` (string): Error type code (e.g., 'no-speech', 'not-allowed')
- `errorMessage` (string): Human-readable error description
- `event` (Event): The browser's native error event object
- `name` (string): The event name ('onError')

### transcriptChanged Event

Fires each time the transcript updates (continuously during listening). Provides `TranscriptChangedEventArgs`:

```typescript
onTranscriptChange(args: TranscriptChangedEventArgs): void {
    console.log('Transcript:', args.transcript);
    console.log('Is interim result:', args.isInterimResult);
    
    if (args.isInterimResult) {
        console.log('Interim (partial) result:', args.transcript);
    } else {
        console.log('Final result:', args.transcript);
    }
}
```

**TranscriptChangedEventArgs Properties:**
- `transcript` (string): The recognized text
- `isInterimResult` (boolean): `true` if result is partial/interim, `false` if final
- `event` (Event): The browser's native speech recognition event
- `name` (string): The event name ('transcriptChanged')

## Event Handling

### Basic Event Handler Setup

```typescript
import { Component } from '@angular/core';
import { SpeechToTextModule, TranscriptChangedEventArgs, ErrorEventArgs, StartListeningEventArgs, StopListeningEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button ejs-speechtotext 
                (created)="onCreated()" 
                (transcriptChanged)="onTranscriptChange($event)" 
                (onStart)="onListeningStart($event)" 
                (onStop)="onListeningStop($event)" 
                (onError)="onErrorHandler($event)">
        </button>
    </div>`
})
export class AppComponent {
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        console.log('Transcript:', args.transcript);
    }
    
    onListeningStart(args: StartListeningEventArgs): void {
        console.log('Listening started');
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        console.log('Listening stopped');
    }
    
    onErrorHandler(args: ErrorEventArgs): void {
        console.log('Error:', args.error);
    }
    
    onCreated(): void {
        console.log('Component created');
    }
}
```

### Event Handlers with State Management

```typescript
import { Component } from '@angular/core';
import { SpeechToTextModule, TranscriptChangedEventArgs, ErrorEventArgs, StartListeningEventArgs, StopListeningEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <div class="status">
            <p>Status: <strong>{{ status }}</strong></p>
            <p>Last Transcript: {{ lastTranscript }}</p>
        </div>
        
        <button ejs-speechtotext 
                (created)="onCreated()" 
                (transcriptChanged)="onTranscriptChange($event)" 
                (onStart)="onListeningStart($event)" 
                (onStop)="onListeningStop($event)" 
                (onError)="onErrorHandler($event)">
        </button>
    </div>`
})
export class AppComponent {
    public status: string = 'Idle';
    public lastTranscript: string = '';
    
    onCreated(): void {
        this.status = 'Ready';
    }
    
    onListeningStart(args: StartListeningEventArgs): void {
        this.status = 'Listening...';
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        this.status = 'Stopped';
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.lastTranscript = args.transcript;
    }
    
    onErrorHandler(args: ErrorEventArgs): void {
        this.status = `Error: ${args.error}`;
    }
}
```

## Methods

### startListening() Method

Programmatically initiates speech recognition:

```typescript
public startListening(): void {
    this.speechToText.startListening();
}
```

### stopListening() Method

Programmatically stops speech recognition:

```typescript
public stopListening(): void {
    this.speechToText.stopListening();
}
```

### destroy() Method

Destroys the SpeechToText component instance and cleans up resources:

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button #speechtotext ejs-speechtotext></button>
    </div>`
})
export class AppComponent implements OnDestroy {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    
    ngOnDestroy(): void {
        // Clean up the component before destroying
        if (this.speechToText) {
            this.speechToText.destroy();
        }
    }
}
```

**When to Use destroy():**

1. **Component Cleanup**: Call in `ngOnDestroy()` lifecycle hook
2. **Dynamic Components**: When removing components dynamically
3. **Memory Management**: To prevent memory leaks in single-page applications
4. **Route Changes**: Clean up before navigating away
5. **Conditional Rendering**: When toggling component visibility

**Complete Cleanup Example:**

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container" *ngIf="isComponentVisible">
        <h3>SpeechToText with Proper Cleanup</h3>
        
        <button #speechtotext 
                ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)">
        </button>
        
        <ejs-textarea #outputTextarea 
                      [(value)]="transcript"
                      rows="5" 
                      cols="50">
        </ejs-textarea>
        
        <button class="e-btn e-danger" (click)="destroyComponent()">
            Destroy Component
        </button>
    </div>
    
    <div *ngIf="!isComponentVisible">
        <p>Component has been destroyed.</p>
        <button class="e-btn e-primary" (click)="recreateComponent()">
            Recreate Component
        </button>
    </div>`
})
export class AppComponent implements OnDestroy {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public isComponentVisible: boolean = true;
    public transcript: string = '';
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.transcript = args.transcript;
    }
    
    destroyComponent(): void {
        // Stop listening if active
        if (this.speechToText) {
            try {
                this.speechToText.stopListening();
            } catch (e) {
                console.log('Already stopped or not listening');
            }
            
            // Destroy the component
            this.speechToText.destroy();
            console.log('Component destroyed successfully');
        }
        
        // Hide the component
        this.isComponentVisible = false;
    }
    
    recreateComponent(): void {
        this.isComponentVisible = true;
        console.log('Component recreated');
    }
    
    ngOnDestroy(): void {
        // Always clean up when the parent component is destroyed
        if (this.speechToText) {
            try {
                this.speechToText.stopListening();
                this.speechToText.destroy();
                console.log('Cleanup completed in ngOnDestroy');
            } catch (error) {
                console.error('Error during cleanup:', error);
            }
        }
    }
}
```

**Best Practices for destroy():**

1. **Always Call in ngOnDestroy**: Ensure cleanup when component is removed
2. **Stop Listening First**: Call `stopListening()` before `destroy()`
3. **Error Handling**: Wrap in try-catch to handle edge cases
4. **Check Instance**: Verify component exists before calling destroy
5. **Clean Related Resources**: Clear any timers, subscriptions, or event listeners
6. **Avoid Memory Leaks**: Essential in SPAs with frequent route changes

## Programmatic Control Example

Here's a complete example with programmatic control of speech recognition:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, StartListeningEventArgs, StopListeningEventArgs, ErrorEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Programmatic Speech Control</h3>
        
        <div class="status-panel">
            <p>Status: <strong [ngClass]="statusClass">{{ status }}</strong></p>
            <p>Transcript: {{ currentTranscript }}</p>
            <p>Error: {{ lastError }}</p>
        </div>
        
        <div class="button-group">
            <button class="e-btn e-primary" (click)="startListening()">
                Start Listening
            </button>
            <button class="e-btn e-danger" (click)="stopListening()">
                Stop Listening
            </button>
            <button class="e-btn" (click)="clearTranscript()">
                Clear
            </button>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)"
                (onStart)="onListeningStart($event)"
                (onStop)="onListeningStop($event)"
                (onError)="onErrorHandler($event)"
                style="display: none;">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      [(value)]="currentTranscript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public status: string = 'Idle';
    public statusClass: string = 'status-idle';
    public currentTranscript: string = '';
    public lastError: string = '';
    
    onCreated(): void {
        this.status = 'Ready';
        this.statusClass = 'status-ready';
    }
    
    onListeningStart(args: StartListeningEventArgs): void {
        this.status = 'Listening...';
        this.statusClass = 'status-listening';
        this.lastError = '';
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        this.status = 'Stopped';
        this.statusClass = 'status-stopped';
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.currentTranscript = args.transcript;
    }
    
    onErrorHandler(args: ErrorEventArgs): void {
        this.status = 'Error';
        this.statusClass = 'status-error';
        this.lastError = `${args.error}: ${args.errorMessage}`;
    }
    
    public startListening(): void {
        this.speechToText.startListening();
    }
    
    public stopListening(): void {
        this.speechToText.stopListening();
    }
    
    public clearTranscript(): void {
        this.currentTranscript = '';
        this.lastError = '';
    }
}
```

**CSS Styling:**

```css
.speechText-container {
    margin: 50px auto;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    padding: 30px;
}

.status-panel {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 6px;
    border-left: 4px solid #ccc;
    width: 100%;
    box-sizing: border-box;
}

.status-panel p {
    margin: 8px 0;
    font-size: 14px;
}

.status-panel strong {
    font-size: 16px;
}

.status-idle { color: #666; }
.status-ready { color: #28a745; }
.status-listening { color: #007bff; font-weight: bold; }
.status-stopped { color: #ffc107; }
.status-error { color: #dc3545; }

.button-group {
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: center;
}

.button-group button {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
}
```

## Canceling Listening with StartListeningEventArgs

Use the `cancel` property to prevent listening from starting based on conditions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaComponent, TextAreaModule, StartListeningEventArgs, StopListeningEventArgs, TranscriptChangedEventArgs, ErrorEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Conditional Listening Control</h3>
        
        <div class="permission-panel">
            <label>
                <input type="checkbox" [(ngModel)]="hasPermission">
                Grant microphone permission
            </label>
            <p class="info">Listening will be canceled if permission is not granted.</p>
        </div>
        
        <div class="status-panel">
            <p>Status: <strong>{{ statusMessage }}</strong></p>
        </div>
        
        <button #speechtotext
                ejs-speechtotext 
                (onStart)="onListeningStart($event)"
                (onStop)="onListeningStop($event)"
                (transcriptChanged)="onTranscriptChange($event)"
                (onError)="onErrorHandler($event)">
        </button>
        
        <ejs-textarea #outputTextarea 
                      [(value)]="transcript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public hasPermission: boolean = false;
    public statusMessage: string = 'Ready';
    public transcript: string = '';
    
    onListeningStart(args: StartListeningEventArgs): void {
        // Check permission before allowing listening to start
        if (!this.hasPermission) {
            args.cancel = true;  // Cancel the listening action
            this.statusMessage = 'Listening canceled - Permission required';
            alert('Please grant microphone permission before listening.');
            return;
        }
        
        // Check if triggered by user or programmatically
        if (args.isInteracted) {
            this.statusMessage = 'User clicked - Listening started';
        } else {
            this.statusMessage = 'Programmatically triggered - Listening started';
        }
        
        console.log('Event name:', args.name);
        console.log('Listening state:', args.listeningState);
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        this.statusMessage = 'Listening stopped';
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.transcript = args.transcript;
    }
    
    onErrorHandler(args: ErrorEventArgs): void {
        this.statusMessage = `Error: ${args.error}`;
    }
}
```

**Common Use Cases for cancel:**

1. **Permission Checks**: Cancel if microphone permission is not granted
2. **Validation**: Cancel if required fields are not filled
3. **Rate Limiting**: Cancel if user has exceeded usage limits
4. **Business Logic**: Cancel based on application state or user role
5. **Network Check**: Cancel if offline and speech service requires internet

**Advanced Example with Multiple Conditions:**

```typescript
onListeningStart(args: StartListeningEventArgs): void {
    // Multiple validation checks
    const validationResult = this.validateListeningConditions();
    
    if (!validationResult.isValid) {
        args.cancel = true;
        this.showValidationError(validationResult.message);
        return;
    }
    
    // Log interaction type for analytics
    if (args.isInteracted) {
        this.logUserAction('speech_listening_started_manual');
    } else {
        this.logUserAction('speech_listening_started_auto');
    }
    
    this.statusMessage = 'Listening...';
}

private validateListeningConditions(): { isValid: boolean; message: string } {
    // Check microphone permission
    if (!this.hasMicrophoneAccess()) {
        return { isValid: false, message: 'Microphone access required' };
    }
    
    // Check network connectivity
    if (!navigator.onLine) {
        return { isValid: false, message: 'Internet connection required' };
    }
    
    // Check if user is authenticated
    if (!this.isUserAuthenticated()) {
        return { isValid: false, message: 'Please login to use speech recognition' };
    }
    
    // Check rate limits
    if (this.hasExceededRateLimit()) {
        return { isValid: false, message: 'Usage limit exceeded. Please try later.' };
    }
    
    return { isValid: true, message: '' };
}

private showValidationError(message: string): void {
    this.statusMessage = message;
    // Show toast notification or modal
    alert(message);
}
```

## Distinguishing User vs Programmatic Actions

Use the `isInteracted` property to determine how listening was triggered:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaModule, StartListeningEventArgs, StopListeningEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>User Interaction Tracking</h3>
        
        <div class="stats-panel">
            <p>Manual starts: <strong>{{ manualStarts }}</strong></p>
            <p>Auto starts: <strong>{{ autoStarts }}</strong></p>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                (onStart)="onListeningStart($event)"
                (onStop)="onListeningStop($event)">
        </button>
        
        <div class="control-buttons">
            <button class="e-btn e-primary" (click)="startProgrammatically()">
                Start Programmatically
            </button>
        </div>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    
    public manualStarts: number = 0;
    public autoStarts: number = 0;
    
    onListeningStart(args: StartListeningEventArgs): void {
        if (args.isInteracted) {
            // User clicked the button
            this.manualStarts++;
            console.log('User initiated listening');
            this.trackAnalytics('speech_button_clicked');
        } else {
            // Started programmatically via API
            this.autoStarts++;
            console.log('Programmatically initiated listening');
            this.trackAnalytics('speech_auto_started');
        }
        
        console.log('Event details:', {
            name: args.name,
            state: args.listeningState,
            isUserAction: args.isInteracted
        });
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        if (args.isInteracted) {
            console.log('User stopped listening');
            this.trackAnalytics('speech_button_stopped');
        } else {
            console.log('Programmatically stopped listening');
            this.trackAnalytics('speech_auto_stopped');
        }
    }
    
    startProgrammatically(): void {
        // This will trigger onStart with isInteracted = false
        this.speechToText.startListening();
    }
    
    private trackAnalytics(eventName: string): void {
        // Send to analytics service
        console.log('Analytics:', eventName, new Date().toISOString());
    }
}
```

**Use Cases for isInteracted:**

1. **Analytics Tracking**: Differentiate user actions from automated actions
2. **Conditional Logic**: Apply different business rules based on trigger source
3. **UI Updates**: Show different messages for manual vs automatic starts
4. **Rate Limiting**: Apply different limits for user vs system actions
5. **Logging**: Track user behavior patterns vs system-initiated actions

## Distinguishing Interim vs Final Results

Use the `isInterimResult` property to handle interim and final transcripts differently:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Interim vs Final Results</h3>
        
        <div class="result-display">
            <div class="interim-result">
                <h4>Interim (Live):</h4>
                <p>{{ interimTranscript || 'Waiting for speech...' }}</p>
            </div>
            
            <div class="final-result">
                <h4>Final:</h4>
                <p>{{ finalTranscript || 'No final result yet' }}</p>
            </div>
        </div>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)"
                [allowInterimResults]="true">
        </button>
        
        <ejs-textarea #outputTextarea 
                      [(value)]="fullTranscript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="All transcripts...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public interimTranscript: string = '';
    public finalTranscript: string = '';
    public fullTranscript: string = '';
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        if (args.isInterimResult) {
            // Handle interim (partial) results - updates in real-time
            this.interimTranscript = args.transcript;
            console.log('Interim:', args.transcript);
        } else {
            // Handle final results - stable recognized text
            this.finalTranscript = args.transcript;
            this.fullTranscript += args.transcript + ' ';
            this.interimTranscript = '';  // Clear interim when final arrives
            console.log('Final:', args.transcript);
        }
    }
}
```

**Use Cases for isInterimResult:**

1. **Live Display**: Show interim results for real-time feedback
2. **Auto-save**: Save only final results to avoid saving incomplete text
3. **Analytics**: Track how long users take to finalize speech
4. **UI Indicators**: Show different styling for interim vs final text

**CSS for Visual Distinction:**

```css
.result-display {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.interim-result, .final-result {
    flex: 1;
    padding: 15px;
    border-radius: 6px;
    min-height: 80px;
}

.interim-result {
    background-color: #fff3cd;
    border: 2px dashed #ffc107;
}

.interim-result h4 {
    color: #856404;
}

.final-result {
    background-color: #d1e7dd;
    border: 2px solid #28a745;
}

.final-result h4 {
    color: #0f5132;
}
```

## Controlling Component State with listeningState

The `listeningState` property represents the current operational state of the component and can be used to both **monitor** and **control** the component's behavior. This property helps manage transitions between different states.

**Property Details:**
- **Type:** `SpeechToTextState`
- **Default:** `'Inactive'`
- **Possible Values:**
  - `'Inactive'`: Component is idle and ready to start listening
  - `'Listening'`: Component is actively listening for speech input
  - `'Stopped'`: Listening has been stopped

### Reading the Current State

Monitor the component's state through event arguments:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, StartListeningEventArgs, StopListeningEventArgs, SpeechToTextState } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Monitoring Component State</h3>
        
        <div class="state-indicator">
            <p>Current State: <strong [ngClass]="getStateClass()">{{ currentState }}</strong></p>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                (onStart)="onListeningStart($event)"
                (onStop)="onListeningStop($event)">
        </button>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    
    public currentState: string = 'Inactive';
    
    onListeningStart(args: StartListeningEventArgs): void {
        this.currentState = args.listeningState;
        console.log('State changed to:', args.listeningState);
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        this.currentState = args.listeningState;
        console.log('State changed to:', args.listeningState);
    }
    
    getStateClass(): string {
        switch (this.currentState) {
            case 'Listening': return 'state-active';
            case 'Stopped': return 'state-stopped';
            default: return 'state-inactive';
        }
    }
}
```

### Setting the Component State Programmatically

Control the component's state by setting the `listeningState` property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaModule, TranscriptChangedEventArgs, SpeechToTextState } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Programmatic State Control</h3>
        
        <div class="state-controls">
            <button class="e-btn e-success" (click)="setStateToListening()">
                Set to Listening
            </button>
            <button class="e-btn e-warning" (click)="setStateToStopped()">
                Set to Stopped
            </button>
            <button class="e-btn e-info" (click)="setStateToInactive()">
                Set to Inactive
            </button>
        </div>
        
        <div class="state-display">
            <p>Current State: <strong>{{ currentState }}</strong></p>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                [listeningState]="currentState"
                (transcriptChanged)="onTranscriptChange($event)">
        </button>
        
        <ejs-textarea [(value)]="transcript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    
    public currentState: SpeechToTextState = SpeechToTextState.Inactive;
    public transcript: string = '';
    
    setStateToListening(): void {
        this.currentState = SpeechToTextState.Listening;
        console.log('State set to: Listening');
    }
    
    setStateToStopped(): void {
        this.currentState = SpeechToTextState.Stopped;
        console.log('State set to: Stopped');
    }
    
    setStateToInactive(): void {
        this.currentState = SpeechToTextState.Inactive;
        console.log('State set to: Inactive');
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.transcript = args.transcript;
    }
}
```

### Managing State Transitions

Use state management to control workflow and user interactions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaModule, TranscriptChangedEventArgs, SpeechToTextState, StartListeningEventArgs, StopListeningEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>State Transition Management</h3>
        
        <div class="workflow-controls">
            <button class="e-btn e-primary" 
                    (click)="startWorkflow()"
                    [disabled]="!canStartWorkflow()">
                Start Speech Workflow
            </button>
            <button class="e-btn e-danger" 
                    (click)="stopWorkflow()"
                    [disabled]="!canStopWorkflow()">
                Stop Workflow
            </button>
            <button class="e-btn" (click)="resetWorkflow()">
                Reset
            </button>
        </div>
        
        <div class="workflow-status">
            <p>Workflow State: <strong [ngClass]="getWorkflowClass()">{{ workflowState }}</strong></p>
            <p>Listening State: <strong>{{ listeningState }}</strong></p>
            <p>Steps Completed: <strong>{{ stepsCompleted }}</strong></p>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                [listeningState]="listeningState"
                (onStart)="onListeningStart($event)"
                (onStop)="onListeningStop($event)"
                (transcriptChanged)="onTranscriptChange($event)">
        </button>
        
        <ejs-textarea [(value)]="transcript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    
    public listeningState: SpeechToTextState = SpeechToTextState.Inactive;
    public workflowState: string = 'Not Started';
    public stepsCompleted: number = 0;
    public transcript: string = '';
    
    startWorkflow(): void {
        // Set component to listening state
        this.listeningState = SpeechToTextState.Listening;
        this.workflowState = 'Active';
        this.speechToText.startListening();
        console.log('Workflow started - State:', this.listeningState);
    }
    
    stopWorkflow(): void {
        // Set component to stopped state
        this.listeningState = SpeechToTextState.Stopped;
        this.workflowState = 'Stopped';
        this.speechToText.stopListening();
        console.log('Workflow stopped - State:', this.listeningState);
    }
    
    resetWorkflow(): void {
        // Reset to inactive state
        this.listeningState = SpeechToTextState.Inactive;
        this.workflowState = 'Not Started';
        this.stepsCompleted = 0;
        this.transcript = '';
        console.log('Workflow reset - State:', this.listeningState);
    }
    
    canStartWorkflow(): boolean {
        return this.listeningState === SpeechToTextState.Inactive;
    }
    
    canStopWorkflow(): boolean {
        return this.listeningState === SpeechToTextState.Listening;
    }
    
    onListeningStart(args: StartListeningEventArgs): void {
        this.listeningState = args.listeningState;
        console.log('Component state changed:', args.listeningState);
    }
    
    onListeningStop(args: StopListeningEventArgs): void {
        this.listeningState = args.listeningState;
        this.stepsCompleted++;
        console.log('Component state changed:', args.listeningState);
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.transcript = args.transcript;
    }
    
    getWorkflowClass(): string {
        switch (this.workflowState) {
            case 'Active': return 'workflow-active';
            case 'Stopped': return 'workflow-stopped';
            default: return 'workflow-idle';
        }
    }
}
```

**CSS for State Visualization:**

```css
.state-indicator, .state-display, .workflow-status {
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 6px;
    margin-bottom: 15px;
}

.state-active, .workflow-active {
    color: #28a745;
    font-weight: bold;
}

.state-stopped, .workflow-stopped {
    color: #ffc107;
    font-weight: bold;
}

.state-inactive, .workflow-idle {
    color: #6c757d;
}

.state-controls, .workflow-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}
```

### Use Cases for State Control:

1. **Workflow Management**: Control multi-step processes with speech input
2. **Conditional Logic**: Enable/disable features based on listening state
3. **UI Synchronization**: Keep UI in sync with component state
4. **State Persistence**: Save and restore listening state
5. **Automated Testing**: Set specific states for testing scenarios
6. **User Onboarding**: Guide users through state transitions

### State Transition Best Practices:

1. **Always Check Current State**: Verify state before transitions
2. **Use Enum Values**: Use `SpeechToTextState` enum for type safety
3. **Handle Events**: Listen to onStart/onStop to track state changes
4. **Validate Transitions**: Ensure valid state transitions (Inactive → Listening → Stopped)
5. **Update UI**: Provide visual feedback for state changes
6. **Error Handling**: Handle invalid state transitions gracefully

## Best Practices

1. **Always Handle Errors**: Implement error handlers to gracefully handle failures
2. **Provide User Feedback**: Update UI to show listening status and transcript changes
3. **Validate Transcript**: Check if transcript is empty before processing
4. **Use isInterimResult**: Distinguish between interim and final results for better UX
5. **Control Component State**: Use listeningState to manage component behavior programmatically
6. **Debounce Updates**: For frequent interim updates, consider debouncing non-critical operations
7. **Cleanup Resources**: Stop listening when component is destroyed
8. **Test Permissions**: Verify microphone permissions before enabling the feature

## Edge Cases

**Rapid Start/Stop:**
Avoid calling startListening() immediately after stopListening():

```typescript
// Wait for stop event before starting again
onListeningStop(args: StopListeningEventArgs): void {
    setTimeout(() => {
        // Safe to start again
    }, 100);
}
```

**Error During Listening:**
Handle errors that may occur while actively listening:

```typescript
onErrorHandler(args: ErrorEventArgs): void {
    if (args.error === 'network') {
        // Network connection lost
        this.stopListening();
    }
}
```
