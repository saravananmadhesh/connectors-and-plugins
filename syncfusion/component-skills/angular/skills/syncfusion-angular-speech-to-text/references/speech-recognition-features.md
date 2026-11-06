# Speech Recognition Features

## Table of Contents
- [Retrieving Transcripts](#retrieving-transcripts)
- [Setting Language](#setting-language)
- [Allowing Interim Results](#allowing-interim-results)
- [Managing Listening State](#managing-listening-state)
- [Showing or Hiding Tooltips](#showing-or-hiding-tooltips)
- [Setting Disabled State](#setting-disabled-state)
- [Enabling State Persistence](#enabling-state-persistence)

## Retrieving Transcripts

The `transcript` property contains the currently recognized text from speech input. Access it to get the transcribed content:

```typescript
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule, FormsModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button #speechtotext 
                ejs-speechtotext 
                [transcript]="transcript" 
                (transcriptChanged)="onTranscriptChanged($event)">
        </button>
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      [(value)]="transcript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechtotext!: SpeechToTextComponent;
    public transcript: string = 'Hi, hello! How are you?';
    
    constructor(private cdr: ChangeDetectorRef) {}

    onTranscriptChanged(args: TranscriptChangedEventArgs): void {
        this.transcript = this.speechtotext.transcript;
        this.cdr.detectChanges();
    }
}
```

## Setting Language

The `lang` property specifies the language for speech recognition. Set it to the appropriate locale to ensure correct transcription:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Language Selection</h3>
        
        <div class="language-selector">
            <label>Select Language:</label>
            <select [(ngModel)]="language" (change)="onLanguageChange()">
                <option value="en-US">English (US)</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="es-ES">Spanish</option>
                <option value="it-IT">Italian</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese (Simplified)</option>
            </select>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [lang]="language">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    public language: string = 'en-US';
    
    onLanguageChange(): void {
        console.log('Language changed to:', this.language);
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

**Supported Languages:**
- `'en-US'` - English (United States)
- `'en-GB'` - English (United Kingdom)
- `'fr-FR'` - French
- `'de-DE'` - German
- `'es-ES'` - Spanish
- `'it-IT'` - Italian
- `'ja-JP'` - Japanese
- `'zh-CN'` - Chinese (Simplified)
- `'zh-TW'` - Chinese (Traditional)
- `'ru-RU'` - Russian
- `'pt-BR'` - Portuguese (Brazil)

## Allowing Interim Results

The `allowInterimResults` property controls whether interim (real-time) transcription is shown as the user speaks:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <div class="option-group">
            <h4>Real-time Results</h4>
            <label>
                <input type="checkbox" [(ngModel)]="allowInterim" (change)="onInterimChange()">
                Show interim results as you speak
            </label>
        </div>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [allowInterimResults]="allowInterim">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    public allowInterim: boolean = true;  // Default: true
    
    onInterimChange(): void {
        console.log('Interim results:', this.allowInterim ? 'enabled' : 'disabled');
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

**Interim Results Explained:**
- `true` (default): Shows live transcription as the user speaks, updates continuously
- `false`: Waits until the user stops speaking, then shows only the final transcript

## Managing Listening State

The `listeningState` property indicates the component's current status:

```typescript
import { Component } from '@angular/core';
import { SpeechToTextModule, SpeechToTextState, StopListeningEventArgs, StartListeningEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div id="container">
        <div id="status-box-container" [ngClass]="'status-box ' + listeningStateClass">
            <span>Status: <strong id="status-text">{{ listeningState }}</strong></span>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                (onStart)="updateListeningState($event)" 
                (onStop)="updateListeningState($event)" 
                [listeningState]="listeningState" 
                id="speechtotext_default">
        </button>
        
        <div class="waveform-container">
            <div id="waveform-item" class="waveform" [style.display]="listeningState === 'Listening' ? 'flex' : 'none'">
                <span></span><span></span><span></span><span></span><span></span>
            </div>
            <p id="instruction-text">{{ instructionText }}</p>
        </div>
    </div>`
})
export class AppComponent {
    public listeningState: SpeechToTextState = SpeechToTextState.Inactive;
    public listeningStateClass: string = 'inactive';
    public instructionText: string = 'Click the button to start listening.';
    
    updateListeningState(args: StartListeningEventArgs | StopListeningEventArgs): void {
        const state = args.listeningState;
        this.listeningState = state as SpeechToTextState;
        
        if (state === "Listening") {
            this.listeningStateClass = "listening";
            this.instructionText = "Listening... Speak now!";
        } else if (state === "Stopped") {
            this.listeningStateClass = "stopped";
            this.instructionText = "Recognition Stopped.";
        } else {
            this.listeningStateClass = "inactive";
            this.instructionText = "Click the button to start listening.";
        }
    }
}
```

**Listening States:**
- `'Inactive'` - Component is ready but not listening
- `'Listening'` - Actively capturing and processing speech
- `'Stopped'` - Recognition has been terminated

**CSS for State Visualization:**

```css
#container {
    text-align: center;
    margin: 50px auto;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    background: #fff;
}

.status-box {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 40px;
    font-weight: bold;
}

.status-box.listening {
    background-color: #d1e7dd;
    color: #0f5132;
}

.status-box.stopped {
    background-color: #f8d7da;
    color: #842029;
}

.status-box.inactive {
    background-color: #e2e3e5;
    color: #6c757d;
}

.waveform-container {
    margin-top: 20px;
    font-weight: bold;
}

.waveform {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    gap: 5px;
}

.waveform span {
    display: block;
    width: 6px;
    height: 20px;
    background: #28a745;
    animation: wave-animation 1.2s infinite ease-in-out;
}

.waveform span:nth-child(1) { animation-delay: 0s; }
.waveform span:nth-child(2) { animation-delay: 0.2s; }
.waveform span:nth-child(3) { animation-delay: 0.4s; }
.waveform span:nth-child(4) { animation-delay: 0.6s; }
.waveform span:nth-child(5) { animation-delay: 0.8s; }

@keyframes wave-animation {
    0%, 100% { height: 10px; }
    50% { height: 30px; }
}
```

## Showing or Hiding Tooltips

The `showTooltip` property controls whether tooltips appear on hover:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <div class="option-group">
            <h4>Tooltip Settings</h4>
            <label>
                <input type="checkbox" [(ngModel)]="showTooltip" (change)="onTooltipChange()">
                Show tooltips on hover
            </label>
        </div>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [showTooltip]="showTooltip">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    public showTooltip: boolean = true;  // Default: true
    
    onTooltipChange(): void {
        console.log('Tooltips:', this.showTooltip ? 'shown' : 'hidden');
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Setting Disabled State

The `disabled` property prevents user interaction with the component:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <div class="option-group">
            <h4>Component State</h4>
            <label>
                <input type="checkbox" [(ngModel)]="isDisabled" (change)="onDisabledChange()">
                Disable speech input
            </label>
        </div>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [disabled]="isDisabled">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    public isDisabled: boolean = false;  // Default: false
    
    onDisabledChange(): void {
        console.log('Component:', this.isDisabled ? 'disabled' : 'enabled');
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Enabling State Persistence

The `enablePersistence` property allows the component to maintain its state across page reloads or browser sessions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>State Persistence Example</h3>
        <p>The transcript will be preserved even after page reload.</p>
        
        <button ejs-speechtotext 
                id="persistentSpeech"
                (transcriptChanged)="onTranscriptChange($event)" 
                [enablePersistence]="true">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
        
        <button class="e-btn" (click)="reloadPage()">
            Reload Page (State will persist)
        </button>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
    
    reloadPage(): void {
        window.location.reload();
    }
}
```

**How State Persistence Works:**
- When `enablePersistence` is `true`, the component automatically saves its state to browser's localStorage
- State includes: transcript value, listening state, and other configuration
- An `id` attribute must be provided on the component for persistence to work
- The persisted state is restored when the component is re-initialized

**Custom State Management Example:**

If you need more control over what gets persisted, you can implement custom state management:

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Custom State Persistence</h3>
        
        <button #speechtotext
                ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)">
        </button>
        
        <ejs-textarea #outputTextarea 
                      [(value)]="transcript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
        
        <div class="action-buttons">
            <button class="e-btn e-primary" (click)="saveState()">
                Save State
            </button>
            <button class="e-btn" (click)="clearState()">
                Clear Saved State
            </button>
        </div>
    </div>`
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public transcript: string = '';
    private readonly STORAGE_KEY = 'speechtotext-state';
    
    ngOnInit(): void {
        // Restore state on component initialization
        this.loadState();
    }
    
    ngOnDestroy(): void {
        // Optionally save state when component is destroyed
        this.saveState();
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.transcript = args.transcript;
        // Auto-save on every transcript change
        this.saveState();
    }
    
    saveState(): void {
        const state = {
            transcript: this.transcript,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        console.log('State saved successfully');
    }
    
    loadState(): void {
        const savedState = localStorage.getItem(this.STORAGE_KEY);
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.transcript = state.transcript || '';
                console.log('State restored from:', state.timestamp);
            } catch (error) {
                console.error('Failed to restore state:', error);
            }
        }
    }
    
    clearState(): void {
        localStorage.removeItem(this.STORAGE_KEY);
        this.transcript = '';
        console.log('State cleared');
    }
}
```

**Best Practices for State Persistence:**

1. **Always Provide an ID**: The component needs a unique `id` attribute for built-in persistence
2. **Consider Data Size**: Don't persist large amounts of data; localStorage has size limits
3. **Privacy Concerns**: Inform users if transcripts are being saved locally
4. **Session vs Persistent Storage**: Use sessionStorage for temporary persistence within a browser session
5. **Clear Old Data**: Implement cleanup logic to remove stale persisted data
6. **Error Handling**: Always wrap persistence operations in try-catch blocks

## Practical Example: Complete Feature Configuration

```typescript
import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechToTextModule, SpeechToTextComponent, TextAreaModule, TranscriptChangedEventArgs, SpeechToTextState } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule, FormsModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Advanced Speech Recognition Features</h3>
        
        <div class="settings-panel">
            <div class="setting-group">
                <label>Language:</label>
                <select [(ngModel)]="language">
                    <option value="en-US">English</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                </select>
            </div>
            
            <div class="setting-group checkbox">
                <label>
                    <input type="checkbox" [(ngModel)]="allowInterim">
                    Show interim results
                </label>
            </div>
            
            <div class="setting-group checkbox">
                <label>
                    <input type="checkbox" [(ngModel)]="showTooltip">
                    Show tooltips
                </label>
            </div>
        </div>
        
        <div class="status-display">
            <p>Status: <strong>{{ listeningState }}</strong></p>
            <p>Language: <strong>{{ language }}</strong></p>
        </div>
        
        <button #speechtotext 
                ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)"
                [lang]="language"
                [allowInterimResults]="allowInterim"
                [showTooltip]="showTooltip"
                [listeningState]="listeningState">
        </button>
        
        <ejs-textarea [(value)]="transcript"
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('speechtotext') speechToText!: SpeechToTextComponent;
    
    public language: string = 'en-US';
    public allowInterim: boolean = true;
    public showTooltip: boolean = true;
    public transcript: string = '';
    public listeningState: SpeechToTextState = SpeechToTextState.Inactive;
    
    constructor(private cdr: ChangeDetectorRef) {}
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.transcript = this.speechToText.transcript;
        this.cdr.detectChanges();
    }
}
```

## Best Practices

1. **Language Selection**: Allow users to choose their preferred language
2. **Interim Results**: Enable for real-time feedback; disable for cleaner final output
3. **Tooltip Clarity**: Provide helpful tooltips for first-time users
4. **State Monitoring**: Track listening state for UI updates
5. **Transcript Handling**: Process transcripts carefully, check for empty strings
6. **Disable When Inappropriate**: Disable during processing or when microphone unavailable
