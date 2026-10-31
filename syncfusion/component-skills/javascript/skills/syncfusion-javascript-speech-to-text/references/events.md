# Events

## Table of Contents
- [Overview](#overview)
- [created Event](#created-event)
- [onStart Event](#onstart-event)
- [onStop Event](#onstop-event)
- [onError Event](#onerror-event)
- [transcriptChanged Event](#transcriptchanged-event)
- [Complete Event Configuration Example](#complete-event-configuration-example)
- [Event Handling Patterns](#event-handling-patterns)

This guide describes the events available in the SpeechToText component for handling various stages of the speech recognition lifecycle.

## Overview

The SpeechToText component provides five key events that fire during different stages of speech recognition:

| Event | Arguments | Description |
|-------|-----------|-------------|
| `created` | - | Triggers when the component's rendering is fully completed |
| `onStart` | StartListeningEventArgs | Triggers when speech recognition begins |
| `onStop` | StopListeningEventArgs | Triggers when speech recognition stops |
| `onError` | ErrorEventArgs | Triggers when an error occurs during recognition |
| `transcriptChanged` | TranscriptChangedEventArgs | Triggers when transcription changes occur |

All events are optional but recommended for building robust speech recognition features.

## created Event

The `created` event fires once when the SpeechToText component's rendering is fully completed and the component is ready for use.

### Event Signature

```typescript
created: () => void
```

### Usage Example

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    created: () => {
        console.log('SpeechToText component initialized successfully');
        // Perform initialization tasks
        checkMicrophonePermissions();
        loadUserPreferences();
    }
});

speechToText.appendTo('#speechtotext_default');
```

### Common Use Cases

- **Logging initialization** - Track when components are ready
- **Loading preferences** - Restore user settings after component loads
- **Checking permissions** - Verify microphone access on startup
- **UI updates** - Enable related controls after component is ready
- **Analytics tracking** - Record component usage metrics

## onStart Event

The `onStart` event triggers when speech recognition begins, providing information about the listening state.

### Event Signature

```typescript
onStart: (args: StartListeningEventArgs) => void
```

### StartListeningEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `listeningState` | string | Current state ('Listening') |

### Usage Example

```typescript
import { SpeechToText, StartListeningEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    onStart: (args: StartListeningEventArgs) => {
        console.log('Speech recognition started');
        console.log('Listening state:', args.listeningState);
        
        // Update UI to show listening indicator
        showListeningIndicator();
        
        // Disable other controls
        disableFormInputs();
        
        // Start visual feedback
        startMicrophoneAnimation();
    }
});

speechToText.appendTo('#speechtotext_default');

function showListeningIndicator() {
    const indicator = document.getElementById('listening-indicator');
    if (indicator) {
        indicator.style.display = 'block';
        indicator.textContent = 'Listening...';
        indicator.className = 'indicator active';
    }
}

function disableFormInputs() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.disabled = true);
}

function startMicrophoneAnimation() {
    const micIcon = document.getElementById('mic-icon');
    if (micIcon) {
        micIcon.classList.add('pulsing');
    }
}
```

### Common Use Cases

- **Visual feedback** - Show listening indicator or animation
- **UI state management** - Disable conflicting controls during recording
- **Analytics** - Track when users start speech recognition
- **Audio feedback** - Play sound to indicate recording started
- **Accessibility** - Announce to screen readers that listening started

## onStop Event

The `onStop` event triggers when speech recognition stops, either by user action or automatically.

### Event Signature

```typescript
onStop: (args: StopListeningEventArgs) => void
```

### StopListeningEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `listeningState` | string | Current state ('Stopped') |

### Usage Example

```typescript
import { SpeechToText, StopListeningEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    onStop: (args: StopListeningEventArgs) => {
        console.log('Speech recognition stopped');
        console.log('Listening state:', args.listeningState);
        
        // Hide listening indicator
        hideListeningIndicator();
        
        // Re-enable other controls
        enableFormInputs();
        
        // Stop visual feedback
        stopMicrophoneAnimation();
        
        // Process final transcript
        processFinalTranscript();
    }
});

speechToText.appendTo('#speechtotext_default');

function hideListeningIndicator() {
    const indicator = document.getElementById('listening-indicator');
    if (indicator) {
        indicator.style.display = 'none';
        indicator.className = 'indicator inactive';
    }
}

function enableFormInputs() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.disabled = false);
}

function stopMicrophoneAnimation() {
    const micIcon = document.getElementById('mic-icon');
    if (micIcon) {
        micIcon.classList.remove('pulsing');
    }
}

function processFinalTranscript() {
    const transcript = speechToText.transcript;
    // Send to server, validate, or process further
    saveTranscriptToDatabase(transcript);
}
```

### Common Use Cases

- **Cleanup operations** - Reset UI state after recording
- **Final processing** - Handle complete transcript after recognition ends
- **Re-enabling controls** - Allow other interactions after speech stops
- **Analytics** - Track speech recognition duration
- **Auto-save** - Save transcript to storage when user stops speaking

## onError Event

The `onError` event triggers when an error occurs during speech recognition or microphone listening.

### Event Signature

```typescript
onError: (args: ErrorEventArgs) => void
```

### ErrorEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `error` | string | Error type identifier |

### Error Types

- `no-speech` - No speech detected
- `aborted` - Recognition aborted
- `audio-capture` - No microphone detected
- `not-allowed` - Microphone access denied
- `service-not-allowed` - Service not allowed in context
- `network` - Network error
- `unsupported-browser` - Browser doesn't support API
- `default` - Unknown error

### Usage Example

```typescript
import { SpeechToText, ErrorEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    onError: (args: ErrorEventArgs) => {
        console.error('Speech recognition error:', args.error);
        
        // Display user-friendly error message
        displayErrorMessage(args.error);
        
        // Log error for debugging
        logErrorToServer(args.error);
        
        // Attempt recovery if possible
        attemptErrorRecovery(args.error);
    }
});

speechToText.appendTo('#speechtotext_default');

function displayErrorMessage(error: string) {
    const errorContainer = document.getElementById('error-container');
    if (!errorContainer) return;
    
    let message = '';
    let actionButton = '';
    
    switch(error) {
        case 'no-speech':
            message = 'No speech detected. Please try again and speak clearly.';
            actionButton = '<button onclick="retry()">Retry</button>';
            break;
        case 'audio-capture':
            message = 'No microphone detected. Please connect a microphone.';
            actionButton = '<button onclick="checkSettings()">Check Settings</button>';
            break;
        case 'not-allowed':
            message = 'Microphone access denied. Please allow microphone permissions.';
            actionButton = '<button onclick="requestPermissions()">Allow Access</button>';
            break;
        case 'network':
            message = 'Network error. Please check your internet connection.';
            actionButton = '<button onclick="retry()">Retry</button>';
            break;
        case 'unsupported-browser':
            message = 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.';
            actionButton = '';
            break;
        default:
            message = 'An error occurred. Please try again.';
            actionButton = '<button onclick="retry()">Retry</button>';
    }
    
    errorContainer.innerHTML = `
        <div class="error-message">
            <span class="error-icon">⚠️</span>
            <p>${message}</p>
            ${actionButton}
        </div>
    `;
    errorContainer.style.display = 'block';
}

function logErrorToServer(error: string) {
    fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            error: error,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        })
    });
}

function attemptErrorRecovery(error: string) {
    if (error === 'no-speech') {
        // Automatically retry once for no-speech errors
        setTimeout(() => {
            speechToText.startListening();
        }, 2000);
    }
}
```

### Common Use Cases

- **Error notifications** - Display user-friendly error messages
- **Permission requests** - Guide users to grant microphone access
- **Fallback mechanisms** - Switch to text input when speech fails
- **Error logging** - Track error patterns for debugging
- **Retry logic** - Automatically retry transient errors

## transcriptChanged Event

The `transcriptChanged` event triggers whenever the transcription changes during speech recognition. This can fire multiple times for interim results or once for final results depending on the `allowInterimResults` setting.

### Event Signature

```typescript
transcriptChanged: (args: TranscriptChangedEventArgs) => void
```

### TranscriptChangedEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `transcript` | string | Current transcript text |

### Usage Example

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    allowInterimResults: true,
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Update textarea with new transcript
        textareaObj.value = args.transcript;
        
        // Update character count
        updateCharacterCount(args.transcript.length);
        
        // Auto-save draft
        autoSaveDraft(args.transcript);
        
        // Process commands if detected
        processVoiceCommands(args.transcript);
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');

function updateCharacterCount(count: number) {
    const counterElement = document.getElementById('char-count');
    if (counterElement) {
        counterElement.textContent = `${count} characters`;
    }
}

let autoSaveTimer: number;
function autoSaveDraft(text: string) {
    // Debounce auto-save to avoid excessive saves
    clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(() => {
        localStorage.setItem('draft_transcript', text);
        console.log('Draft saved');
    }, 2000);
}

function processVoiceCommands(transcript: string) {
    const lowerTranscript = transcript.toLowerCase();
    
    if (lowerTranscript.includes('clear all')) {
        textareaObj.value = '';
        speechToText.transcript = '';
    } else if (lowerTranscript.includes('new paragraph')) {
        textareaObj.value += '\n\n';
    }
}
```

### Common Use Cases

- **Real-time display** - Show transcript as user speaks
- **Auto-save** - Periodically save transcript to prevent data loss
- **Character counting** - Track transcript length for limits
- **Voice commands** - Process commands embedded in transcript
- **Live captioning** - Display captions in real-time
- **Form population** - Fill form fields as user speaks

## Complete Event Configuration Example

Here's a comprehensive example showing all events configured together:

```typescript
import { 
    SpeechToText, 
    TextArea, 
    TranscriptChangedEventArgs, 
    StopListeningEventArgs, 
    StartListeningEventArgs, 
    ErrorEventArgs 
} from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    created: () => {
        console.log('SpeechToText component created');
        checkBrowserSupport();
    },
    
    onStart: (args: StartListeningEventArgs) => {
        console.log('Started listening, state:', args.listeningState);
        document.getElementById('status').textContent = 'Listening...';
        document.getElementById('status').className = 'status listening';
    },
    
    onStop: (args: StopListeningEventArgs) => {
        console.log('Stopped listening, state:', args.listeningState);
        document.getElementById('status').textContent = 'Stopped';
        document.getElementById('status').className = 'status stopped';
    },
    
    onError: (args: ErrorEventArgs) => {
        console.error('Error occurred:', args.error);
        document.getElementById('status').textContent = `Error: ${args.error}`;
        document.getElementById('status').className = 'status error';
        showErrorDialog(args.error);
    },
    
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        console.log('Transcript updated:', args.transcript);
        textareaObj.value = args.transcript;
        updateWordCount(args.transcript);
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');

function checkBrowserSupport() {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in your browser.');
    }
}

function showErrorDialog(error: string) {
    // Show modal or toast with error message
    const errorMessages = {
        'no-speech': 'No speech detected. Please try again.',
        'not-allowed': 'Microphone access denied.',
        'network': 'Network error occurred.'
    };
    alert(errorMessages[error] || 'An error occurred.');
}

function updateWordCount(text: string) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    document.getElementById('word-count').textContent = `${words.length} words`;
}
```

## Event Handling Patterns

### Pattern 1: State Machine Approach

```typescript
enum RecognitionState {
    Idle,
    Listening,
    Processing,
    Complete,
    Error
}

let currentState: RecognitionState = RecognitionState.Idle;

const speechToText = new SpeechToText({
    onStart: () => {
        currentState = RecognitionState.Listening;
        updateUIForState();
    },
    onStop: () => {
        currentState = RecognitionState.Complete;
        updateUIForState();
    },
    onError: () => {
        currentState = RecognitionState.Error;
        updateUIForState();
    }
});

function updateUIForState() {
    // Update UI based on current state
}
```

### Pattern 2: Event Aggregation

```typescript
class SpeechEventLogger {
    private events: Array<{type: string, timestamp: Date, data: any}> = [];
    
    log(type: string, data: any) {
        this.events.push({ type, timestamp: new Date(), data });
    }
    
    getEvents() {
        return this.events;
    }
}

const logger = new SpeechEventLogger();

const speechToText = new SpeechToText({
    created: () => logger.log('created', {}),
    onStart: (args) => logger.log('onStart', args),
    onStop: (args) => logger.log('onStop', args),
    onError: (args) => logger.log('onError', args),
    transcriptChanged: (args) => logger.log('transcriptChanged', args)
});
```

### Pattern 3: Promise-based Workflow

```typescript
function recognizeSpeech(): Promise<string> {
    return new Promise((resolve, reject) => {
        const speechToText = new SpeechToText({
            onStop: () => {
                resolve(speechToText.transcript);
            },
            onError: (args) => {
                reject(new Error(args.error));
            }
        });
        speechToText.appendTo('#speechtotext');
        speechToText.startListening();
    });
}

// Usage
recognizeSpeech()
    .then(transcript => {
        console.log('Recognized:', transcript);
    })
    .catch(error => {
        console.error('Recognition failed:', error);
    });
```
